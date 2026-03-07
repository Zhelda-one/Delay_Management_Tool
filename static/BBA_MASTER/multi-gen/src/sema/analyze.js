import path, { basename } from "path";
import {
    ArrayType,
    binaryOp,
    BinaryOpExpression,
    ConstantDefinition,
    Definition,
    EmbeddedProtocolDefinition,
    EnumerationDefinition,
    Expression,
    ExtensionPointDefinition,
    FloatExpression,
    Identifier,
    IdentifierExpression,
    IncludeDefinition,
    IntExpression,
    NamespaceDefinition,
    NamespacedIdentifier,
    ProtocolDefinition,
    StructureConstant,
    StructureDefinition,
    TypedefDefinition,
    StructureFieldAttributes,
} from "../ast.js";
import Token from "../token.js";
import { ParsedFile, parseFile } from "../util.js";
import {
    ArrayType as SemaArrayType,
    ConstantNode,
    DynamicPackedArray,
    DynamicVariableSizedArray,
    EnumerationNode,
    EnumerationVariant,
    IncludeNode,
    NamespaceNode,
    Node,
    RootNode,
    StaticFixedSizedArray,
    StaticVariableSizedArray,
    StructureField,
    StructureNode,
    Type,
    TypeDefinitionNode,
    TypedefNode,
    ProtocolNode,
    ProtocolMessage,
    PrimitiveTypeDefinitionNode,
    PrimitiveType,
    ExtensionPointNode,
    ExtensionPointVariant,
    SameVersionArray,
    VersionedStructureType,
    EmbeddedProtocolNode,
} from "./tree.js";
import { inspect } from "util";
import { existsSync, readdirSync, readFileSync } from "fs";

/**
 * A context in which semantic analysis is done.
 */
export class Context {
    /**
     * A mapping from each checked namespace's name to it's representation.
     *
     * This is used for merging of different namespace nodes with the same name,
     * since they are representing a single physical namespace.
     *
     * @type {Map<string, Namespace>}
     */
    visitedNamespaces = new Map();

    /**
     * A path to the root directory in which analysis is performed.
     *
     * Unfortunately, the statement that all 'include paths' in the definition
     * files are relative is simply false in practice, so we need to keep track
     * of the root directory if someone tries to 'include' a file with an
     * absolute path.
     *
     * @type {string}
     */
    #rootDirectory;

    /**
     * The name of the currently checked file.
     *
     * This can be changed during the analysis of the `include` definitions, and
     * primarly used for error reporting.
     *
     * @type {string}
     */
    #currentFilename;
    /** @type {RootNode} */
    #asRoot = new RootNode();

    /**
     * A mapping from file path to the already checked `IncludeNode`
     * representing each included file.
     *
     * This is used as a cache to not check the same file twice. However, this
     * does not account for the confusion of relative/absolute file paths
     * described above.
     *
     * @type {Map<string, IncludeNode>}
     */
    #visitedFiles = new Map();
    /** @type {Map<string, Definition>} */
    #definitions = new Map();
    /** @type {Namespace[]} */
    #namespaceStack = [];

    /**
     * @param {string} rootDirectory
     * @param {string} definitionFilename
     * @param {Map<string, Definition>} definitions
     */
    constructor(rootDirectory, definitionFilename, definitions) {
        this.#rootDirectory = rootDirectory;
        this.#currentFilename = definitionFilename;
        this.#definitions = definitions;
    }

    /**
     * @param {string} name
     * @returns {IncludeNode | undefined}
     */
    getVisitedFile(name) {
        return this.#visitedFiles.get(name);
    }

    /**
     * @param {Token} token
     * @param {string} message
     * @returns {Error}
     */
    errorWithLocation(token, message) {
        const loc = token.location;
        return new Error(
            `${this.#currentFilename}:${loc.row}:${loc.column - token.value.length}: ${message}`,
        );
    }

    /**
     * @param {string} name
     * @param {Token} where
     * @returns {NamespaceNode}
     */
    getOrAnalyzeNamespace(name, where) {
        const visitedNamespace = this.visitedNamespaces.get(name);
        if (visitedNamespace) {
            return visitedNamespace.asNamespaceNode();
        }

        const namespaceDef = this.#definitions.get(name);
        if (!namespaceDef) {
            throw this.errorWithLocation(where, `Undefined namespace ${name}`);
        }

        if (!(namespaceDef instanceof NamespaceDefinition)) {
            throw this.errorWithLocation(
                where,
                `Definition ${name} is not a namespace`,
            );
        }

        const freshlyCheckedNode = analyzeNamespace(namespaceDef, this);
        this.addNamespaceNode(freshlyCheckedNode);
        return freshlyCheckedNode;
    }

    /**
     * @param {NamespaceNode} namespaceNode
     */
    addNamespaceNode(namespaceNode) {
        this.addNamespace(
            new Namespace({
                ctx: this,
                init: namespaceNode,
            }),
        );
    }

    /**
     * @param {Namespace} namespace
     */
    addNamespace(namespace) {
        this.visitedNamespaces.set(namespace.name, namespace);
        mergeDefinitions(this.#definitions, namespace.definitions);
    }

    /**
     * @param {Namespace} namespace
     * @returns {boolean}
     */
    enterNamespace(namespace) {
        const newEntry =
            this.#namespaceStack.length === 0 ||
            this.currentNamespace.name !== namespace.name;

        if (newEntry) {
            this.#namespaceStack.push(namespace);
        }

        // If we have an entry in 'visitedNamespaces', it should be equal to
        // the one we are entering.
        if (!this.visitedNamespaces.has(namespace.name)) {
            this.visitedNamespaces.set(namespace.name, namespace);
        }

        return newEntry;
    }

    leaveNamespace() {
        this.#namespaceStack.pop();
    }

    /**
     * @returns {RootNode}
     */
    toRootNode() {
        return this.#asRoot;
    }

    /**
     * @param {Node} node
     */
    addNode(node) {
        this.#asRoot.children.push(node);
    }

    /** @returns {string} */
    get rootDir() {
        return this.#rootDirectory;
    }

    /** @returns {string} */
    get currentFilename() {
        return this.#currentFilename;
    }

    /** @returns {Namespace} */
    get currentNamespace() {
        const namespace = this.#namespaceStack.at(-1);
        if (!namespace) {
            throw new Error(
                "Tried to get the current namespace of the context, but it is undefined",
            );
        }

        return namespace;
    }
}

/**
 * A class representing a checked namespace.
 *
 * If `Context` serves to define a general environment in which the semantic
 * analysis is performed, `Namespace` serves as a more local environment for the
 * analysis of each individual node, providing available definitions but not
 * access to other namespaces. Only the `Context` knows about other namespaces.
 */
export class Namespace {
    /**
     * The parent context.
     *
     * @type {Context}
     */
    #ctx;

    /** @type {NamespaceNode} */
    #asNode;

    /**
     * @typedef {{
     *     name: string;
     *     definitions: Map<string, Definition>;
     * }} NamespaceParams
     */

    /**
     * @param {{ init: NamespaceParams | NamespaceNode; ctx: Context; }} init
     */
    constructor({ init, ctx }) {
        this.#ctx = ctx;

        if (init instanceof NamespaceNode) {
            this.#asNode = init;
            return;
        }

        this.#asNode = new NamespaceNode(init.name, init.definitions);

        addDefaultTypes(this.#asNode);
    }

    /**
     * @param {string} name
     * @returns {Definition | undefined}
     */
    getDefinition(name) {
        return this.#asNode.definitions.get(name);
    }

    /**
     * @param {import("../ast.js").Identifier | string} name
     * @param {Token} where
     * @returns {ConstantNode}
     */
    getOrAnalyzeConstant(name, where) {
        return this.#getOrAnalyzeNode(
            name,
            where,
            (ns, name) => ns.getConstant(name),
            ConstantNode,
        );
    }

    /**
     * @param {Identifier | string} name
     * @param {Token} where
     * @returns {TypeDefinitionNode}
     */
    getOrAnalyzeType(name, where) {
        return this.#getOrAnalyzeNode(
            name,
            where,
            (ns, name) => ns.getType(name),
            TypeDefinitionNode,
        );
    }

    /**
     * @param {Node} node
     */
    addNode(node) {
        this.#ctx.addNode(node);
        this.#asNode.addNode(node);
    }

    /**
     * @returns {NamespaceNode}
     */
    asNamespaceNode() {
        return this.#asNode;
    }

    /** @returns {string} */
    get name() {
        return this.#asNode.name;
    }

    /** @type {string} */
    set name(value) {
        this.#asNode.name = value;
    }

    /** @type {Map<string, Definition>} */
    get definitions() {
        return this.#asNode.definitions;
    }

    /**
     * @param {Identifier} identifier
     * @param {Token} where
     * @returns {NamespaceNode}
     */
    #namespaceForIdentifier(identifier, where) {
        if (identifier instanceof NamespacedIdentifier) {
            return this.#ctx.getOrAnalyzeNamespace(identifier.namespace, where);
        }

        return this.#asNode;
    }

    /**
     * @template T
     * @param {string | Identifier} name
     * @param {Token} where
     * @param {(namespace: NamespaceNode, name: string) => T | undefined} getNode
     * @param {any} expectedType
     * @returns {T}
     */
    #getOrAnalyzeNode(name, where, getNode, expectedType) {
        /** @type {string} */
        let nodeName;
        /** @type {NamespaceNode} */
        let namespace;

        if (typeof name === "string") {
            nodeName = name;
            namespace = this.#asNode;
        } else {
            nodeName = name.value;
            namespace = this.#namespaceForIdentifier(name, where);
        }

        const existingNode = getNode(namespace, nodeName);

        if (existingNode) {
            return existingNode;
        }

        let definition = this.getDefinition(nodeName);

        if (!definition) {
            throw this.#ctx.errorWithLocation(
                where,
                `Undefined symbol ${name}`,
            );
        }

        const analyzedNode = analyzeDefinition(definition, this.#ctx);

        if (!(analyzedNode instanceof expectedType)) {
            const gotTypeName =
                Object.getPrototypeOf(analyzedNode).constructor.name;
            const expectedTypeName = expectedType.prototype.constructor.name;

            throw this.#ctx.errorWithLocation(
                where,
                `Expected '${nodeName}' to be of type '${expectedTypeName}', but got '${gotTypeName}'`,
            );
        }

        // @ts-ignore we know it's alright
        return analyzedNode;
    }
}

/**
 * The rest of this file defines analysis routines. The error handling is done
 * by throwing an instance of the `Error` class with context provided by an
 * explicit `where` parameter of `Token` type and additional information such as
 * the current filename taken from the `ctx` parameter of type `Context`.
 */

/**
 * @param {ParsedFile} parsedFile
 * @param {string} rootDirectory
 * @param {Context | undefined} ctx
 * @returns {RootNode}
 */
export function analyzeParsedFile(parsedFile, rootDirectory, ctx) {
    return analyzeRoot(parsedFile.root, rootDirectory, parsedFile.path, ctx);
}

/**
 * @param {import("../ast.js").RootDefinition} root
 * @param {string} rootDirectory
 * @param {string | undefined} rootSourceFile
 * @param {Context | undefined} ctx
 * @returns {RootNode}
 */
export function analyzeRoot(root, rootDirectory, rootSourceFile, ctx) {
    if (!ctx) {
        ctx = new Context(
            rootDirectory,
            rootSourceFile ?? "<unknown>",
            root.children,
        );
    }

    const rootNamespace = new Namespace({
        init: {
            name: root.name,
            definitions: root.children,
        },
        ctx,
    });

    ctx.enterNamespace(rootNamespace);

    for (const definition of root.children.values()) {
        analyzeDefinition(definition, ctx);
    }

    return ctx.toRootNode();
}

/**
 * @param {Definition} def
 * @param {Context} ctx
 * @returns {Node}
 */
export function analyzeDefinition(def, ctx) {
    if (def instanceof ConstantDefinition) {
        return analyzeConstant(def, ctx);
    }

    if (def instanceof TypedefDefinition) {
        return analyzeTypedef(def, ctx);
    }

    if (def instanceof EnumerationDefinition) {
        return analyzeEnumeration(def, ctx);
    }

    if (def instanceof NamespaceDefinition) {
        return analyzeNamespace(def, ctx);
    }

    if (def instanceof IncludeDefinition) {
        return analyzeIncludeDefinition(def, ctx);
    }

    if (def instanceof StructureDefinition) {
        return analyzeStructureDefinition(def, ctx);
    }

    if (def instanceof ProtocolDefinition) {
        return analyzeProtocolDefinition(def, ctx);
    }

    if (def instanceof EmbeddedProtocolDefinition) {
        return analyzeEmbeddedProtocolDefinition(def, ctx);
    }

    if (def instanceof ExtensionPointDefinition) {
        return analyzeExtensionPointDefinition(def, ctx);
    }

    throw new Error("This should be unreachable");
}

/**
 * @param {ProtocolDefinition} def
 * @param {Context} ctx
 * @returns {ProtocolNode}
 */
function analyzeProtocolDefinition(def, ctx) {
    const messages = [];

    for (const message of def.fields.values()) {
        const messageTypeNode = ctx.currentNamespace.getOrAnalyzeType(
            message.type,
            def.token,
        );
        if (!messageTypeNode) {
            throw ctx.errorWithLocation(
                def.token,
                `Undefined message type '${message.type}'`,
            );
        }

        messages.push(
            new ProtocolMessage(message.name, message.id, messageTypeNode.type),
        );
    }

    const protocolNode = new ProtocolNode(
        def.name,
        messages,
        ctx.currentNamespace.name,
    );
    ctx.currentNamespace.addNode(protocolNode);
    return protocolNode;
}

/**
 * @param {StructureDefinition} def
 * @param {Context} ctx
 * @returns {StructureNode}
 */
function analyzeStructureDefinition(def, ctx) {
    /** @type {StructureField[]} */
    const fields = [];

    for (const field of def.fields) {
        const rawType = field.type;

        const typeNode = ctx.currentNamespace.getOrAnalyzeType(
            rawType.name,
            def.token,
        );

        if (!typeNode) {
            throw ctx.errorWithLocation(
                def.token,
                `Undefined type '${field.type.name}`,
            );
        }

        let fieldType = typeNode.type;

        if (rawType instanceof ArrayType) {
            const length = evalExpression(
                rawType.length,
                ctx,
                def.token,
                def.consts,
            );
            fieldType = createArrayTypeBasedOnFieldAttributes(
                field.attributes,
                typeNode.type,
                length,
            );
        }

        fields.push(new StructureField(field.name, fieldType, field.version));
    }

    const structureNode = new StructureNode(
        ctx.currentNamespace.name,
        def.name,
        fields,
        def.isVersioned,
    );
    ctx.currentNamespace.addNode(structureNode);
    return structureNode;
}

/**
 * @param {StructureFieldAttributes} attributes
 * @param {Type} elementType
 * @param {number} length
 * @returns {SemaArrayType}
 */
function createArrayTypeBasedOnFieldAttributes(
    attributes,
    elementType,
    length,
) {
    if (attributes.sameVersionForAllElements) {
        if (attributes.string.size !== 0) {
            throw new Error(
                `Don't know how to handle both '@same_version_for_all_elements and field attributes at the same time yet!`,
            );
        }

        if (elementType instanceof VersionedStructureType) {
            return new SameVersionArray(elementType, length);
        }

        // throw new Error("Element type of an array with the '@same_version_for_all_elements' is not a versioned struct type");
        return new DynamicVariableSizedArray(elementType, length);
    }

    if (attributes.string.has("no_length_field")) {
        return new StaticFixedSizedArray(elementType, length);
    } else if (attributes.string.has("dynamic_alloc")) {
        return new DynamicVariableSizedArray(elementType, length);
    } else if (attributes.string.has("dynamic_packed")) {
        return new DynamicPackedArray(elementType, length);
    }

    return new StaticVariableSizedArray(elementType, length);
}

/**
 * @param {IncludeDefinition} includeDef
 * @param {Context} ctx
 * @returns {IncludeNode}
 */
function analyzeIncludeDefinition(includeDef, ctx) {
    const visitedInclude = ctx.getVisitedFile(includeDef.name);
    if (visitedInclude) {
        return visitedInclude;
    }

    const includePath = resolveIncludePath(includeDef.name, ctx);
    if (!includePath) {
        throw ctx.errorWithLocation(
            includeDef.token,
            `Unable to resolve include '${includeDef.name}'`,
        );
    }

    const parsed = parseFile(includePath);
    // WARN: don't add any nodes returned from this call because we are passing
    // the current context there, meaning that all of the analyzed nodes are
    // already added
    analyzeParsedFile(parsed, ctx.rootDir, ctx);

    const includeNode = new IncludeNode(includePath);
    ctx.currentNamespace.addNode(includeNode);
    return includeNode;
}

/**
 * @param {string} includePath
 * @param {Context} ctx
 * @returns {string | undefined}
 */
function resolveIncludePath(includePath, ctx) {
    const currentDir = path.dirname(ctx.currentFilename);
    const relativePath = path.join(currentDir, includePath);
    if (existsSync(relativePath)) {
        return relativePath;
    }

    const absolutePath = path.join(ctx.rootDir, includePath);
    return existsSync(absolutePath) ? absolutePath : undefined;
}

/**
 * @param {NamespaceDefinition} namespaceDef
 * @param {Context} ctx
 * @returns {NamespaceNode}
 */
function analyzeNamespace(namespaceDef, ctx) {
    const existingNamespace = ctx.visitedNamespaces.get(namespaceDef.name);

    const thisNamespace =
        existingNamespace ??
        new Namespace({
            ctx,
            init: {
                name: namespaceDef.name,
                definitions: namespaceDef.definitions,
            },
        });

    const newEntry = ctx.enterNamespace(thisNamespace);

    if (existingNamespace) {
        mergeDefinitions(thisNamespace.definitions, namespaceDef.definitions);
    }

    for (const def of namespaceDef.definitions.values()) {
        analyzeDefinition(def, ctx);
    }

    const namespaceNode = thisNamespace.asNamespaceNode();
    if (!existingNamespace) {
        ctx.addNamespaceNode(namespaceNode);
    }

    if (newEntry) {
        ctx.leaveNamespace();
    }

    return namespaceNode;
}

/**
 * @param {ConstantDefinition} constantDef
 * @param {Context} ctx
 * @returns {ConstantNode}
 */
function analyzeConstant(constantDef, ctx) {
    const node = new ConstantNode(
        constantDef.name,
        evalExpression(constantDef.value, ctx, constantDef.token, undefined),
    );
    ctx.currentNamespace.addNode(node);
    return node;
}

/**
 * @param {Expression} expr
 * @param {Context} ctx
 * @param {Token} where
 * @param {Map<string, StructureConstant> | undefined} structureConstants
 * @returns {number}
 */
function evalExpression(expr, ctx, where, structureConstants) {
    if (expr instanceof IntExpression || expr instanceof FloatExpression) {
        return expr.value;
    }

    if (expr instanceof IdentifierExpression) {
        const structConstant = structureConstants?.get(expr.value.value);
        if (structConstant) {
            return evalExpression(
                structConstant.value,
                ctx,
                where,
                structureConstants,
            );
        }

        const constantNode = ctx.currentNamespace.getOrAnalyzeConstant(
            expr.value,
            where,
        );
        if (constantNode) {
            return constantNode.value;
        }

        throw ctx.errorWithLocation(where, `Undefined constant ${expr.value}`);
    }

    if (expr instanceof BinaryOpExpression) {
        const lhs = evalExpression(expr.lhs, ctx, where, structureConstants);
        const rhs = evalExpression(expr.rhs, ctx, where, structureConstants);

        return evalOp(lhs, rhs, expr.op);
    }

    throw ctx.errorWithLocation(
        where,
        `Cannot evaluate expression ${inspect(expr)}`,
    );
}

/**
 * @param {number} lhs
 * @param {number} rhs
 * @param {string} op
 * @returns {number}
 */
function evalOp(lhs, rhs, op) {
    switch (op) {
        case binaryOp.add:
            return lhs + rhs;
        case binaryOp.sub:
            return lhs - rhs;
        case binaryOp.mul:
            return lhs * rhs;
        case binaryOp.div:
            return lhs / rhs;
        default:
            throw new Error(`Unsupported binary operation '${op}'`);
    }
}

/**
 * @param {TypedefDefinition} def
 * @param {Context} ctx
 * @returns {TypedefNode}
 */
function analyzeTypedef(def, ctx) {
    const underlyingType = ctx.currentNamespace.getOrAnalyzeType(
        def.underlying.name,
        def.token,
    );
    if (!underlyingType) {
        throw ctx.errorWithLocation(
            def.token,
            `Undefined type ${def.underlying.name}`,
        );
    }

    const node = new TypedefNode(
        ctx.currentNamespace.name,
        def.name,
        underlyingType.type,
    );
    ctx.currentNamespace.addNode(node);
    return node;
}

/**
 * @param {EnumerationDefinition} def
 * @param {Context} ctx
 * @returns {TypedefNode}
 */
function analyzeEnumeration(def, ctx) {
    const underlyingType = ctx.currentNamespace.getOrAnalyzeType(
        def.underlying,
        def.token,
    );
    if (!underlyingType) {
        throw ctx.errorWithLocation(
            def.token,
            `Undefined type ${def.underlying}`,
        );
    }

    const variants = [...def.values].map(
        ([name, value]) => new EnumerationVariant(name, value),
    );

    const node = new EnumerationNode(
        ctx.currentNamespace.name,
        def.name,
        underlyingType.type,
        variants,
    );
    ctx.currentNamespace.addNode(node);
    return node;
}

/**
 * @param {EmbeddedProtocolDefinition} def
 * @param {Context} ctx
 * @returns {EmbeddedProtocolNode}
 */
function analyzeEmbeddedProtocolDefinition(def, ctx) {
    const definitionFile = locateEmbeddedProtocolDefinitionFile(def, ctx);
    if (definitionFile === undefined) {
        throw ctx.errorWithLocation(
            def.token,
            `Could not find the definition file '${def.definitionFilename}' for embedded protocol '${def.name}'.`,
        );
    }

    const contents = readFileSync(definitionFile, { encoding: "utf-8" });
    // can't use JSON.parse, because some very intelligent people don't know
    // that having trailing commas in your JSON is not spec-compliant, so we
    // have to resort to this stupid eval trick
    const json = eval(`(${contents})`);

    if (!isEmbeddedProtocolFileValid(json)) {
        throw ctx.errorWithLocation(
            def.token,
            `The embedded protocol file '${path.join(ctx.rootDir, definitionFile)}' is not in a valid format.`,
        );
    }

    const node = new EmbeddedProtocolNode(
        ctx.currentNamespace.name,
        def.name,
        json.general["size_unit"],
        json.general["minimum_message_size"],
        json.general["maximum_message_size"],
        json.general["endianness"],
        {
            isDynamic: def.isDynamic,
            hasLengthField: def.hasLengthField,
            arrayCompatible: def.arrayCompatible,
        },
    );
    ctx.currentNamespace.addNode(node);
    return node;
}

/**
 * TODO: add more checks here, like the type of field, or allowed values
 * @param {object} json
 * @returns {boolean}
 */
function isEmbeddedProtocolFileValid(json) {
    const fields = [
        "size_unit",
        "maximum_message_size",
        "minimum_message_size",
        "endianness",
    ];

    if (
        !(
            "general" in json &&
            json.general !== null &&
            typeof json.general === "object"
        )
    ) {
        return false;
    }

    for (const field of fields) {
        if (!Object.hasOwn(json.general, field)) {
            return false;
        }
    }

    return true;
}

const PROTOCOL_DESCRIPTION_FILENAME = "protocol-description.json";

/**
 * @param {EmbeddedProtocolDefinition} def
 * @param {Context} ctx
 * @returns {string | undefined}
 */
function locateEmbeddedProtocolDefinitionFile(def, ctx) {
    const f = readdirSync(ctx.rootDir, {
        recursive: true,
        encoding: "utf-8",
    }).find((f) => basename(f) === def.definitionFilename);

    return f
        ? path.join(ctx.rootDir, f, PROTOCOL_DESCRIPTION_FILENAME)
        : undefined;
}

/**
 * @param {ExtensionPointDefinition} def
 * @param {Context} ctx
 * @returns {ExtensionPointNode}
 */
function analyzeExtensionPointDefinition(def, ctx) {
    const variants = [];

    for (const field of def.fields) {
        const variantTypeNode = ctx.currentNamespace.getOrAnalyzeType(
            field.type.name,
            def.token,
        );

        variants.push(
            new ExtensionPointVariant(
                field.name,
                variantTypeNode.type,
                field.discriminator,
            ),
        );
    }

    const node = new ExtensionPointNode(
        ctx.currentNamespace.name,
        def.name,
        def.defaultDiscriminator,
        variants,
    );
    ctx.currentNamespace.addNode(node);
    return node;
}

/**
 * @param {NamespaceNode} namespaceNode
 */
function addDefaultTypes(namespaceNode) {
    /**
     * @param {PrimitiveType} type
     */
    const node = (type) => new PrimitiveTypeDefinitionNode(type.name, type);

    namespaceNode.addType(node(PrimitiveType.bool));
    namespaceNode.addType(node(PrimitiveType.u8));
    namespaceNode.addType(node(PrimitiveType.u16));
    namespaceNode.addType(node(PrimitiveType.u32));
    namespaceNode.addType(node(PrimitiveType.u64));
    namespaceNode.addType(node(PrimitiveType.i8));
    namespaceNode.addType(node(PrimitiveType.i16));
    namespaceNode.addType(node(PrimitiveType.i32));
    namespaceNode.addType(node(PrimitiveType.i64));
    namespaceNode.addType(node(PrimitiveType.f32));
    namespaceNode.addType(node(PrimitiveType.f64));
}

/**
 * Merge the definition maps, recursing for each `NamespaceDefinition` of the
 * `destination` map with a match in the `source` map.
 *
 * @param {Map<string, Definition>} destination
 * @param {Map<string, Definition>} source
 */
function mergeDefinitions(destination, source) {
    for (const [name, def] of source) {
        if (def instanceof NamespaceDefinition) {
            const existing = destination.get(name);
            if (existing instanceof NamespaceDefinition) {
                mergeDefinitions(existing.definitions, def.definitions);
                continue;
            }
        }

        destination.set(name, def);
    }
}
