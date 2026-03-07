/**
 * This module defines classes and routines for code generation, which is the
 * last stage of the pipeline. The input to this stage should be checked prior
 * and ensured that it's semantically correct.
 */

import { parseFile } from "./util.js";
import { inspect } from "node:util";
import { log, logLevel } from "./logging.js";
import {
    Node,
    ArrayType,
    EnumerationNode,
    EnumerationType,
    NamespaceNode,
    StaticVariableSizedArray,
    StructureField,
    StructureNode,
    StructureType,
    Type,
    TypeDefinitionNode,
    TypedefNode,
    ProtocolNode,
    ConstantNode,
    IncludeNode,
    ExtensionPointNode,
    PrimitiveTypeDefinitionNode,
    DynamicVariableSizedArray,
    StaticFixedSizedArray,
    DynamicPackedArray,
    PrimitiveType,
    SameVersionArray,
    VersionedStructureType,
    EmbeddedProtocolNode,
} from "./sema/tree.js";
import { analyzeParsedFile, analyzeRoot } from "./sema/analyze.js";
import { Definition, RootDefinition } from "./ast.js";

/**
 * A type representing either a decoder or an encoder for a particular type.
 */
class Codec {
    /** @type {string} */
    name;
    /** @type {string | undefined} */
    body;

    /**
     * @param {string} name
     * @param {string | undefined} body
     */
    constructor(name, body) {
        this.name = name;
        this.body = body;
    }

    /**
     * @param {string} name
     * @returns {Codec}
     */
    static mkBuiltin(name) {
        return new Codec(name, undefined);
    }
}

/**
 * A type used to represent MuLTI types, with additional information.
 */
class GenType {
    /** @type {TypeDefinitionNode} */
    node;
    /** @type {Codec} */
    decoder;
    /** @type {Codec} */
    encoder;

    /**
     * @param {TypeDefinitionNode} typeNode
     * @param {Codec} decoder
     * @param {Codec} encoder
     */
    constructor(typeNode, decoder, encoder) {
        this.node = typeNode;
        this.decoder = decoder;
        this.encoder = encoder;
    }

    /** @returns {string} */
    get namespace() {
        return this.node.type.namespace;
    }

    /** @returns {string} */
    get name() {
        return this.node.type.name;
    }

    /** @returns {number} */
    get size() {
        return this.node.type.size;
    }

    /** @returns {number} */
    get alignment() {
        return this.node.type.alignment;
    }
}

class ProtocolMessageData {
    /** @type {GenType} */
    type;
    /** @type {string} */
    namespace;

    /**
     * @param {GenType} type
     * @param {string} namespace
     */
    constructor(type, namespace) {
        this.type = type;
        this.namespace = namespace;
    }

    /** @returns {string} */
    get qualifiedName() {
        return `${this.namespace}::${this.type.name}`;
    }
}

/**
 * A cache for array types.
 *
 * Since array types are monomorphized using both element types and length, it's
 * important to cache them, otherwise the resulting code size will blow up.
 */
class ArrayTypesCache {
    /**
     * A map from the element type to map from the length to `GenType`
     * representing an array parametrized by such element type and length
     * respectively.
     *
     * @typedef {Map<Type, Map<number, GenType>>} ArrayMap
     */

    /** @type {ArrayMap} */
    #staticFixed = new Map();
    /** @type {ArrayMap} */
    #staticVariable = new Map();
    /** @type {ArrayMap} */
    #dynamicVariable = new Map();
    /** @type {ArrayMap} */
    #dynamicPacked = new Map();
    /** @type {ArrayMap} */
    #sameVersion = new Map();
    /** @type {GenerationContext} */
    #ctx;

    /**
     * @param {GenerationContext} ctx
     */
    constructor(ctx) {
        this.#ctx = ctx;
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {GenType}
     */
    getOrCreate(arrayType) {
        const arrayMap = this.#getArrayMapForType(arrayType);

        let lengths = arrayMap.get(arrayType.elementType);
        if (!lengths) {
            lengths = new Map();
            arrayMap.set(arrayType.elementType, lengths);
        }

        const genType = lengths.get(arrayType.length);

        if (genType) {
            return genType;
        }

        const decoder = this.#generateArrayDecoder(arrayType);
        const encoder = this.#generateArrayEncoder(arrayType);

        const arrayGenType = new GenType(
            new TypeDefinitionNode(arrayType.name, arrayType),
            decoder,
            encoder,
        );
        lengths.set(arrayType.length, arrayGenType);
        return arrayGenType;
    }

    /**
     * @returns {GenType[]}
     */
    getAllTypes() {
        const types = [];

        for (const lengths of this.#staticFixed.values()) {
            for (const genType of lengths.values()) {
                types.push(genType);
            }
        }

        for (const lengths of this.#staticVariable.values()) {
            for (const genType of lengths.values()) {
                types.push(genType);
            }
        }

        for (const lengths of this.#dynamicVariable.values()) {
            for (const genType of lengths.values()) {
                types.push(genType);
            }
        }

        for (const lengths of this.#dynamicPacked.values()) {
            for (const genType of lengths.values()) {
                types.push(genType);
            }
        }

        for (const lengths of this.#sameVersion.values()) {
            for (const genType of lengths.values()) {
                types.push(genType);
            }
        }

        return types;
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {ArrayMap}
     */
    #getArrayMapForType(arrayType) {
        if (arrayType instanceof StaticFixedSizedArray) {
            return this.#staticFixed;
        }

        if (arrayType instanceof StaticVariableSizedArray) {
            return this.#staticVariable;
        }

        if (arrayType instanceof DynamicVariableSizedArray) {
            return this.#dynamicVariable;
        }

        if (arrayType instanceof DynamicPackedArray) {
            return this.#dynamicPacked;
        }

        if (arrayType instanceof SameVersionArray) {
            return this.#sameVersion;
        }

        throw new Error(`Unknown array type ${inspect(arrayType)}`);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateArrayDecoder(arrayType) {
        if (arrayType instanceof DynamicVariableSizedArray) {
            return this.#generateDynamicVariableSizedArrayDecoder(arrayType);
        }

        if (arrayType instanceof StaticFixedSizedArray) {
            return this.#generateStaticFixedSizedArrayDecoder(arrayType);
        }

        if (arrayType instanceof DynamicPackedArray) {
            return this.#generateDynamicPackedArrayDecoder(arrayType);
        }

        if (arrayType instanceof StaticVariableSizedArray) {
            return this.#generateStaticVariableSizedArrayDecoder(arrayType);
        }

        if (arrayType instanceof SameVersionArray) {
            return this.#generateSameVersionArrayDecoder(arrayType);
        }

        throw new Error(
            `Encountered unknown array type: ${inspect(arrayType)}`,
        );
    }

    /**
     * @param {StaticVariableSizedArray} arrayType
     * @returns {Codec}
     */
    #generateStaticVariableSizedArrayDecoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u32 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u32);

        const name = `decodeStaticVariableSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(offset) {
    const result = [];
    const length = ${u32.decoder.name}(offset);
    for (let i = 0; i < length && i < ${arrayType.length}; i++)
        result.push(${elementType.decoder.name}(offset + ${u32.size} + i * ${elementType.size}));
    return result;
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {DynamicPackedArray} arrayType
     * @returns {Codec}
     */
    #generateDynamicPackedArrayDecoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u8 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u8);

        const name = `decodeDynamicPackedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(offset) {
    const length = ${u8.decoder.name}(offset);
    const arrOffset = ${u8.decoder.name}(offset + 1);
    const result = []
    for (let i = 0; i < length; i++)
        result.push(${elementType.decoder.name}(offset + 1 + arrOffset + i * ${elementType.size}));
    return result;
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {StaticFixedSizedArray} arrayType
     * @returns {Codec}
     */
    #generateStaticFixedSizedArrayDecoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const name = `decodeStaticFixedSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(offset) {
    const result = [];
    for (let i = 0; i < ${arrayType.length}; i++)
        result.push(${elementType.decoder.name}(offset + i * ${elementType.size}));
    return result;
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {DynamicVariableSizedArray} arrayType
     * @returns {Codec}
     */
    #generateDynamicVariableSizedArrayDecoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u32 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u32);

        const name = `decodeDynamicVariableSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(offset) {
    const arrayOff = ${u32.decoder.name}(offset);
    const len = ${u32.decoder.name}(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(${elementType.decoder.name}(offset));
        offset += ${elementType.size};
    }

    return result;
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {SameVersionArray} arrayType
     * @returns {Codec}
     */
    #generateSameVersionArrayDecoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u32 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u32);

        let versionSwitchBody = "";

        const variants = this.#ctx.versionedStructs.get(elementType.name);
        if (!variants) {
            throw new Error(`No variants for struct ${elementType.name}`);
        }

        for (const [version, variant] of variants) {
            versionSwitchBody += `    case ${version}: versionDecoder = ${variant.decoder.name}; break;\n`;
        }

        versionSwitchBody += `    default: throw new Error(\`Unknown version \${version} for struct '${elementType.name}'\`);\n`;

        const name = `decodeSameVersionArray_${arrayType.length}_${elementType.name}`;
        const body = `function ${name}(offset) {
    const version = ${u32.decoder.name}(offset);
    offset += ${u32.size};

    const dataOffset = offset + ${u32.decoder.name}(offset);
    offset += ${u32.size};

    const len = ${u32.decoder.name}(offset);
    offset += ${u32.size};

    const elemSize = ${u32.decoder.name}(offset);
    offset += ${u32.size};

    let versionDecoder;

    switch (version) {
${versionSwitchBody}
    }

    const result = new Array(len);

    offset = dataOffset;

    for (let i = 0; i < len; i++) {
        result[i] = versionDecoder(offset);
        offset += elemSize;
    }

    return result;
}`;

        // console.log(body);
        return new Codec(name, body);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateArrayEncoder(arrayType) {
        if (arrayType instanceof DynamicVariableSizedArray) {
            return this.#generateDynamicVariableSizedArrayEncoder(arrayType);
        }

        if (arrayType instanceof DynamicPackedArray) {
            return this.#generateDynamicPackedArrayEncoder(arrayType);
        }

        if (arrayType instanceof StaticFixedSizedArray) {
            return this.#generateStaticFixedSizedArrayEncoder(arrayType);
        }

        if (arrayType instanceof StaticVariableSizedArray) {
            return this.#generateStaticVariableSizedArrayEncoder(arrayType);
        }

        if (arrayType instanceof SameVersionArray) {
            console.warn(
                "Encountered a 'SameVersionArray', generating an encoder as it was a 'DynamicVariableArray'",
            );
            return this.#generateDynamicVariableSizedArrayEncoder(arrayType);
        }

        throw new Error(`Unknown array type ${inspect(arrayType)}`);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateStaticVariableSizedArrayEncoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u32 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u32);

        const name = `encodeStaticVariableSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(arr, buf, off) {
    ${u32.encoder.name}(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < ${arrayType.length}; i++)
        ${elementType.encoder.name}(arr[i], buf, off + i * ${elementType.size});
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateStaticFixedSizedArrayEncoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);

        const name = `encodeStaticFixedSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(arr, buf, off) {
    for (let i = 0; i < ${arrayType.length}; i++)
        ${elementType.encoder.name}(arr[i], buf, off + i * ${elementType.size});
}\n`;
        return new Codec(name, body);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateDynamicPackedArrayEncoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u8 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u8);

        const name = `encodeDynamicPackedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(arr, buf, off) {
    ${u8.encoder.name}(arr.length, buf, off);
    off += ${u8.size};
    ${u8.encoder.name}(buf.static.length - off + buf.dynamic.getLength(), buf, off);

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        ${elementType.encoder.name}(elem, dynamic, dynamic.getLength());
    }
}\n`;

        return new Codec(name, body);
    }

    /**
     * @param {ArrayType} arrayType
     * @returns {Codec}
     */
    #generateDynamicVariableSizedArrayEncoder(arrayType) {
        const elementType = this.#ctx.getOrCreateTypeFor(arrayType.elementType);
        const u32 = this.#ctx.getOrCreateTypeFor(PrimitiveType.u32);

        const name = `encodeDynamicVariableSizedArray_${elementType.name}_${arrayType.length}`;
        const body = `function ${name}(arr, buf, off) {
    ${u32.encoder.name}(arr.length, buf, off); // length
    off += ${u32.size};
    ${u32.encoder.name}(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        ${elementType.encoder.name}(elem, dynamic, dynamic.length);
    }
}\n`;

        return new Codec(name, body);
    }
}

/**
 * A type representing the context in which code generation is done.
 */
export class GenerationContext {
    /**
     * A map from the protocol type name to it's message data.
     *
     * This is used for the generation of glue code as an optional last stage.
     *
     * @type {Map<string, ProtocolMessageData>}
     */
    messageData = new Map();

    /**
     * A mapping from a fully qualified enum name to it's node.
     *
     * This is used for the generation of glue code as an optional last stage.
     *
     * @type {Map<string, EnumerationNode>}
     */
    enums = new Map();

    /**
     * A mapping from type's namespace to a mapping from type's name to itself.
     *
     * @type {Map<string, Map<string, GenType>>}
     */
    #genTypes = new Map();

    /**
     * @type {Map<string, Map<number, GenType>>}
     */
    versionedStructs = new Map();

    /** @type {ArrayTypesCache} */
    #arrayTypesCache;

    constructor() {
        const topLevelTypes = new Map();

        addBuiltinGenType(topLevelTypes, PrimitiveType.bool);

        addBuiltinGenType(topLevelTypes, PrimitiveType.u8);
        addBuiltinGenType(topLevelTypes, PrimitiveType.u16);
        addBuiltinGenType(topLevelTypes, PrimitiveType.u32);
        addBuiltinGenType(topLevelTypes, PrimitiveType.u64);
        addBuiltinGenType(topLevelTypes, PrimitiveType.i8);
        addBuiltinGenType(topLevelTypes, PrimitiveType.i16);
        addBuiltinGenType(topLevelTypes, PrimitiveType.i32);
        addBuiltinGenType(topLevelTypes, PrimitiveType.i64);

        addBuiltinGenType(topLevelTypes, PrimitiveType.f32);
        addBuiltinGenType(topLevelTypes, PrimitiveType.f64);

        this.#genTypes.set("", topLevelTypes);

        this.#arrayTypesCache = new ArrayTypesCache(this);

        /**
         * @param {Map<string, GenType>} genTypes
         * @param {PrimitiveType} type
         */
        function addBuiltinGenType(genTypes, type) {
            genTypes.set(
                type.name,
                new GenType(
                    new TypeDefinitionNode(type.name, type),
                    Codec.mkBuiltin(
                        `l2l1_get${type.canonicalName.toUpperCase()}`,
                    ),
                    Codec.mkBuiltin(
                        `l2l1_put${type.canonicalName.toUpperCase()}`,
                    ),
                ),
            );
        }
    }

    /**
     * @param {Type} type
     * @returns {GenType}
     */
    getOrCreateTypeFor(type) {
        if (type instanceof ArrayType) {
            return this.#arrayTypesCache.getOrCreate(type);
        }

        const namespaceTypes = this.#genTypes.get(type.namespace);
        if (!namespaceTypes) {
            throw new Error(`Could not find namespace ${type.namespace}`);
        }

        const presentType = namespaceTypes.get(type.name);
        if (presentType) {
            return presentType;
        }

        throw new Error(`Could not find type ${type.name} :(`);
    }

    /**
     * @param {GenType} type
     */
    addType(type) {
        let namespace = this.#getOrCreateTypeNamespace(type.namespace);
        namespace.set(type.name, type);
    }

    /**
     * @param {TypedefNode | EnumerationNode} typeAliasNode
     */
    addTypedef(typeAliasNode) {
        const underlying = this.getOrCreateTypeFor(
            typeAliasNode.underlyingType,
        );

        const namespace = this.#getOrCreateTypeNamespace(
            typeAliasNode.namespace,
        );
        namespace.set(typeAliasNode.name, underlying);
    }

    /**
     * @param {EnumerationNode} enumNode
     */
    addEnum(enumNode) {
        this.addTypedef(enumNode);
        this.enums.set(`${enumNode.namespace}::${enumNode.name}`, enumNode);
    }

    /**
     * @param {ProtocolNode} protocolNode
     */
    collectProtocolIds(protocolNode) {
        for (const message of protocolNode.type.messages) {
            const genType = this.getOrCreateTypeFor(message.type);
            this.messageData.set(
                message.id,
                new ProtocolMessageData(
                    genType,
                    protocolNode.definingNamespace,
                ),
            );
        }
    }

    /**
     * @returns {GenType[]}
     */
    getArrayTypes() {
        return this.#arrayTypesCache.getAllTypes();
    }

    /**
     * @param {string} name
     * @returns {Map<string, GenType>}
     */
    #getOrCreateTypeNamespace(name) {
        let namespace = this.#genTypes.get(name);
        if (!namespace) {
            namespace = new Map();
            this.#genTypes.set(name, namespace);
        }

        return namespace;
    }
}

/**
 * @param {StructureType} struct
 * @param {GenerationContext} ctx
 * @returns {Codec}
 */
function generateStructDecoder(struct, ctx) {
    const core = generateStructDecoderCore(struct, ctx);

    const name = `${struct.namespace}decode${struct.name}`;
    let body = `function ${name}(offset) {
    let result = {};

${core}
    return result;
}\n`;

    if (struct instanceof VersionedStructureType) {
        const variants = ctx.versionedStructs.get(struct.name);
        if (!variants) {
            throw new Error("this should be unreachable");
        }

        for (const type of variants.values()) {
            body += type.decoder.body ?? "";
        }
    }

    return new Codec(name, body);
}

/**
 * @param {StructureNode} structNode
 * @param {GenerationContext} ctx
 * @returns {{ decoder: Codec; encoder: Codec }}
 */
export function generateCodecsForStructure(structNode, ctx) {
    if (structNode.type instanceof VersionedStructureType) {
        generateVersionedStructCodecs(structNode.type, ctx);
    }

    const decoder = generateStructDecoder(structNode.type, ctx);
    const encoder = generateStructEncoder(structNode.type, ctx);

    ctx.addType(new GenType(structNode, decoder, encoder));

    return { decoder, encoder };
}

/**
 * @param {StructureType} structDef
 * @param {GenerationContext} ctx
 * @returns {Codec}
 */
function generateStructEncoder(structDef, ctx) {
    const core = generateStructEncoderCore(structDef, ctx);

    const name = `${structDef.namespace}encode${structDef.name}`;
    let body = `function ${name}(msg, buf, off) {
${core}}\n`;

    if (structDef instanceof VersionedStructureType) {
        const variants = ctx.versionedStructs.get(structDef.name);
        if (!variants) {
            throw new Error("this should be unreachable");
        }

        for (const type of variants.values()) {
            body += type.encoder.body ?? "";
        }
    }

    return new Codec(name, body);
}

/**
 * @param {StructureType} struct
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateStructEncoderCore(struct, ctx) {
    if (struct instanceof VersionedStructureType) {
        return generateVersionedStructEncoderCore(struct, ctx);
    }

    let body = "";

    for (const field of struct.fields) {
        const genType = ctx.getOrCreateTypeFor(field.type);

        body += `    ${genType.encoder.name}(msg.${field.name}, buf, off + ${field.offset});\n`;
    }

    return body;
}

/**
 * @param {StructureType} struct
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateVersionedStructEncoderCore(struct, ctx) {
    const u32 = ctx.getOrCreateTypeFor(PrimitiveType.u32);

    let body = `    ${u32.encoder.name}(msg.__tag, buf, offset);
    switch (msg.__tag) {
`;

    const variants = ctx.versionedStructs.get(struct.name);
    if (!variants) {
        throw new Error(`No variants for struct ${struct.name}`);
    }

    for (const [version, variant] of variants) {
        body += `    case ${version}: ${variant.encoder.name}(msg, buf, off + ${u32.size}); break;\n`;
    }

    body += `
    default: throw new Error(\`Unknown message tag \${msg.__tag} for struct '${struct.name}'\`);
    }\n`;

    return body;
}

/**
 * @param {StructureType} struct
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateStructDecoderCore(struct, ctx) {
    if (struct instanceof VersionedStructureType) {
        return generateVersionedStructDecoderCore(struct, ctx);
    }

    let body = "";

    for (const field of struct.fields) {
        const genType = ctx.getOrCreateTypeFor(field.type);
        body += `    result.${field.name} = ${genType.decoder.name}(offset + ${field.offset});\n`;

        if (field.type instanceof EnumerationType) {
            body += generateEnumDecoder(field.type, field);
        }
    }

    return body;
}

/**
 * @param {EnumerationType} type
 * @param {StructureField} field
 * @returns {string}
 */
function generateEnumDecoder(type, field) {
    let isValidEnumCheck = "";
    let idx = 0;

    for (const value of type.variants.values()) {
        isValidEnumCheck += `result.${field.name} === ${value}`;
        if (idx !== type.variants.length - 1) {
            isValidEnumCheck += " || ";
        }
        idx++;
    }

    const fullEnumName =
        type.namespace.length !== 0
            ? `${type.namespace}_${type.name}`
            : type.name;

    return `/*    if (!(${isValidEnumCheck}))
        throw new Error(\`Value \${result.${field.name}} is out of range for enum '${type.name}'\`); */
    Object.defineProperty(result, "__enum_${field.name}", {
        enumerable: false,
        writable: false,
        value: "${fullEnumName}",
    });
`;
}

/**
 * @param {VersionedStructureType} structDef
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateVersionedStructDecoderCore(structDef, ctx) {
    const u32 = ctx.getOrCreateTypeFor(PrimitiveType.u32);

    let code = "";

    const offsetName = `${structDef.name}Offset`;
    code += `    const ${offsetName} = ${u32.decoder.name}(offset);\n`;
    const tagName = `${structDef.name}Tag`;
    code += `    const ${tagName} = ${u32.decoder.name}(offset + ${u32.size});
    offset += ${offsetName};`;

    code += `\n    switch (${tagName}) {\n`;
    let maxVersion = -1;
    let maxDecoder = null;

    const variants = ctx.versionedStructs.get(structDef.name);
    if (!variants) {
        throw new Error(`No variants avaiable for struct ${structDef.name}`);
    }

    for (const [version, variant] of variants) {
        code += `    case ${version}: result = ${variant.decoder.name}(offset); break;\n`;
    }

    code += `    default: throw new Error(\`Invalid tag \${${tagName}} for versioned struct '${structDef.name}'\`);
    }
    Object.defineProperty(result, "__tag", {
        enumerable: false,
        writable: false,
        value: ${tagName},
    });\n`;

    return code;
}

/**
 * @param {ExtensionPointNode} def
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateExtensionPointCodecs(def, ctx) {
    const decoderName = `decode_${def.type.namespace}_${def.name}`;

    const u32 = ctx.getOrCreateTypeFor(PrimitiveType.u32);
    const u32d = u32.decoder.name;

    let switchBody = "";

    for (const variant of def.type.variants) {
        const elem = ctx.getOrCreateTypeFor(variant.type);
        switchBody += `        case ${variant.discriminator}: elem = ${elem.decoder.name}(elemOffset); break;`;
    }

    const decoderBody = `function ${decoderName}(offset) {
    const arrOff = ${u32d}(offset);
    const arrLen = ${u32d}(offset + ${u32.size});
    offset += arrOff;

    const result = new Array(arrLen);

    for (let i = 0; i < arrLen; i++) {
        const elemOffset = offset + ${u32d}(offset);
        const discriminator = ${u32d}(offset + ${u32.size});

        let elem;
        switch (discriminator) {
${switchBody}
        }

        result[i] = elem;
        offset += ${u32.size * 2};
    }

    return result;
}`;

    const encoderName = `encode_${def.type.namespace}_${def.name}`;

    const encoderBody = `function ${encoderName}(extensionPoint, buf, off) {
    throw new Error("Encoding of extension points is not implemented yet!");
}`;

    ctx.addType(
        new GenType(
            def,
            new Codec(decoderName, decoderBody),
            new Codec(encoderName, encoderBody),
        ),
    );

    return decoderBody + "\n" + encoderBody;
}

/**
 * @param {EmbeddedProtocolNode} def
 * @param {GenerationContext} ctx
 * @returns {string}
 */
function generateEmbeddedProtocolCodecs(def, ctx) {
    const u8 = ctx.getOrCreateTypeFor(PrimitiveType.u8);

    const encoderName = `encode_${def.type.namespace}_${def.name}`;

    const encoderBody = `function ${encoderName}(proto, buf, off) {
    for (let i = 0; i < proto.length; i++) {
        ${u8.encoder.name}(proto[i], buf, off + i);
    }
}`;

    const decoder = generateEmbeddedProtocolDecoder(def, ctx);

    ctx.addType(
        new GenType(
            def,
            decoder,
            new Codec(encoderName, encoderBody),
        ),
    );

    return `${decoder.body}\n${encoderBody}`;
}
/**
 * @param {EmbeddedProtocolNode} def
 * @param {GenerationContext} ctx
 * @returns {Codec}
 */
function generateEmbeddedProtocolDecoder(def, ctx) {
    const u8 = ctx.getOrCreateTypeFor(PrimitiveType.u8);

    const decoderName = `decode_${def.type.namespace}_${def.name}`;
    let decoderBody;

    if (def.type.attributes.arrayCompatible || !def.type.attributes.hasLengthField) {
        decoderBody = `function ${decoderName}(off) {
    const result = new Array(${def.type.maxMessageSize});

    for (let i = 0; i < ${def.type.maxMessageSize}; i++) {
        result[i] = ${u8.decoder.name}(off + i);
    }

    return result;
}`;
    } else if (def.type.attributes.isDynamic) {
        const u32 = ctx.getOrCreateTypeFor(PrimitiveType.u32);
        decoderBody = `function ${decoderName}(off) {
    const protoOff = ${u32.decoder.name}(off);
    const protoLen = ${u32.decoder.name}(off + 4);

    if (protoLen < ${def.type.minMessageSize} || protoLen > ${def.type.maxMessageSize}) {
        throw new Error(\`Length $\{protoLen\} is out of bounds for embedded protocol '${def.name}' (expected between ${def.type.minMessageSize} and ${def.type.maxMessageSize} bytes)\`);
    }
    off += protoOff;
    const result = new Array(protoLen);

    for (let i = 0; i < protoLen; i++) {
        result[i] = ${u8.decoder.name}(off + i);
    }

    return result;
}`;
    } else {
        const u32 = ctx.getOrCreateTypeFor(PrimitiveType.u32);
        decoderBody = `function ${decoderName}(off) {
    const protoLen = ${u32.decoder.name}(off);
    if (protoLen < ${def.type.minMessageSize} || protoLen > ${def.type.maxMessageSize}) {
            throw new Error(\`Length $\{protoLen\} is out of bounds for embedded protocol '${def.name}' (expected between ${def.type.minMessageSize} and ${def.type.maxMessageSize} bytes)\`);
    }

    const result = new Array(protoLen);
    for (let i = 0; i < protoLen; i++) {
        result[i] = ${u8.decoder.name}(off + i);
    }

    return result;
}`;
    }

    return new Codec(decoderName, decoderBody);
}

/**
 * @param {Node} node
 * @param {GenerationContext} ctx
 * @returns {string}
 */
export function generateNode(node, ctx) {
    if (node instanceof StructureNode) {
        const { decoder, encoder } = generateCodecsForStructure(node, ctx);
        // @ts-ignore because we know it's aight B)
        return decoder.body + encoder.body;
    }

    if (node instanceof TypedefNode) {
        ctx.addTypedef(node);
        return "";
    }

    if (node instanceof EnumerationNode) {
        ctx.addEnum(node);
        return "";
    }

    if (node instanceof NamespaceNode) {
        let result = "";

        for (const child of node.children) {
            result += generateNode(child, ctx);
        }

        return result;
    }

    // don't need to generate anything here
    if (node instanceof ProtocolNode) {
        ctx.collectProtocolIds(node);
        return "";
    }

    // we do not care 8)
    if (node instanceof ConstantNode) {
        return "";
    }

    if (node instanceof IncludeNode) {
        log(logLevel.debug, "Generating include for file %s", node.path);
        return "";
    }

    if (node instanceof ExtensionPointNode) {
        return generateExtensionPointCodecs(node, ctx);
    }

    if (node instanceof EmbeddedProtocolNode) {
        return generateEmbeddedProtocolCodecs(node, ctx);
    }

    if (node instanceof PrimitiveTypeDefinitionNode) {
        return "";
    }

    throw new Error(`Cannot generate parser for ${inspect(node)} yet!`);
}

/**
 * @param {Map<string, Definition>} defs
 * @param {string} rootDirectory
 * @param {string} sourceFilepath
 * @returns {[string, GenerationContext]}
 */
export function generateAll(defs, rootDirectory, sourceFilepath) {
    let result = "";
    const ctx = new GenerationContext();

    const rootNode = analyzeRoot(
        new RootDefinition(defs),
        rootDirectory,
        sourceFilepath,
        undefined,
    );

    for (const node of rootNode.children) {
        result += generateNode(node, ctx);
    }

    return [result, ctx];
}

/**
 * @param {string} rootDir
 * @param {string} filename
 * @param {GenerationContext | undefined} [ctx]
 * @param {boolean} [generateGlueCode=true]
 * @returns {string}
 */
export function generateFile(rootDir, filename, ctx, generateGlueCode = true) {
    const parsed = parseFile(filename);

    let result = "";
    if (!ctx) {
        ctx = new GenerationContext();
    }

    const analyzed = analyzeParsedFile(parsed, rootDir, undefined);

    for (const def of analyzed.children) {
        result += generateNode(def, ctx);
    }

    if (generateGlueCode) {
        result += generateFinalBoss(ctx);
    }

    return result;
}

/**
 * @param {GenerationContext} ctx
 * @returns {string}
 */
export function generateFinalBoss(ctx) {
    let decodeBody = "";
    let encodeBody = "";
    for (const [id, msgData] of ctx.messageData) {
        decodeBody += `    case ${id}: // ${msgData.qualifiedName}
        result = ${msgData.type.decoder.name}(0);
        break;
`;

        encodeBody += `    case ${id}: // ${msgData.qualifiedName}
        buf.static = new Uint8Array(${msgData.type.size});
        ${msgData.type.encoder.name}(l2l1, buf, 0);
        break;
`;
    }

    const arrayTypes = generateArrayTypesCodecsBodies(ctx.getArrayTypes());
    const packetMap = generatePacketMap(ctx.messageData);
    const packetEnumMap = generatePacketEnumMap(ctx.enums.values());

    return (
        // TODO: probably move this to l2l1.js
        `function l2l1_decode_msg(l2l1) {
    let result;
    switch (l2l1.message) {
${decodeBody}
    default: throw new Error(\`Unknown message type \${l2l1.message}\`);
    }

    for (const [key, value] of Object.entries(result)) {
        l2l1[key] = value;
    }
}

function l2l1_encode_msg(l2l1) {
    const proxyHandler = {
        get(target, key) {
            if (key in target) {
                return target[key];
            }

            return target.isDynamic ? target.dynamic[key] : target.static[key];
        },

        set(obj, prop, value) {
            if (prop in obj) {
                obj[prop] = value;
                return true;
            }

            const target = obj.isDynamic ? obj.dynamic : obj.static;
            target[prop] = value;
            return true;
        }
    };

    const buf = new Proxy({
        isDynamic: false,
        dynamic: new Proxy({
            buf: new Uint8Array(30),
            length: 0,

            getBuf() {
                return this.buf.slice(0, this.length);
            },

            getLength() {
                return this.length;
            },
        }, {
            get(target, key) {
                if (typeof target[key] === "function") {
                    return target[key].bind(target);
                }

                return target.buf[key];
            },

            set(obj, prop, value) {
                const idx = parseInt(prop);
                if (Number.isNaN(prop)) {
                    obj[prop] = value;
                    return true;
                }

                if (idx >= obj.buf.length) {
                    const biggerBuf = new Uint8Array(obj.buf.length * 2);
                    biggerBuf.set(obj.buf);
                    obj.buf = biggerBuf;
                }

                obj.buf[idx] = value;
                obj.length = idx + 1;
                return true;
            }
        }),
        static: null,

        asDynamic() {
            return new Proxy({
                ...this,
                isDynamic: true,
            }, proxyHandler);
        },
    }, proxyHandler);

    switch (l2l1.message) {
${encodeBody}
    default: throw new Error(\`Unknown message type \${l2l1.message}\`);
    }

    const result = new Uint8Array(buf.static.length + buf.dynamic.getLength());
    result.set(buf.static);
    result.set(buf.dynamic.getBuf(), buf.static.length);

    return result
}

// array types encoders/decoders
${arrayTypes}

packetPropToStrMap["l2l1.message"] = ${packetMap};

packetEnumMap = ${packetEnumMap};
`
    );
}

/**
 * @param {GenType[]} types
 * @returns {string}
 */
function generateArrayTypesCodecsBodies(types) {
    let result = "";

    for (const type of types) {
        result += type.encoder.body;
        result += type.decoder.body;
    }

    return result;
}

/**
 * @param {Map<string, ProtocolMessageData>} messageData
 * @returns {string}
 */
function generatePacketMap(messageData) {
    let result = "{\n";
    for (const [id, data] of messageData) {
        const name = truncateTypeSuffix(data.qualifiedName);
        result += `    ${id}: "${name}",\n`;
    }
    result += "}";

    return result;
}

/**
 * @param {Iterable<EnumerationNode>} enums
 * @returns {string}
 */
function generatePacketEnumMap(enums) {
    let result = "{\n";
    for (const def of enums) {
        const enumName = truncateTypeSuffix(def.name);

        let single = "{\n";
        for (const variant of def.type.variants) {
            single += `        ${variant.value}: "${enumName}::${variant.name}",\n`;
        }
        single += "    }";

        const fullEnumName =
            def.namespace.length !== 0
                ? `${def.namespace}_${def.name}`
                : def.name;

        result += `    ${fullEnumName}: ${single},\n`;
    }
    result += "}";

    return result;
}

/**
 * @param {VersionedStructureType} struct
 * @param {GenerationContext} ctx
 */
function generateVersionedStructCodecs(struct, ctx) {
    /** @type {Map<number, GenType>} */
    const variants = new Map();

    for (const [version, subStruct] of struct.versions) {
        const decoder = generateStructDecoder(subStruct.type, ctx);
        const encoder = generateStructEncoder(subStruct.type, ctx);

        const gen = new GenType(subStruct, decoder, encoder);

        variants.set(version, gen);
        ctx.addType(gen);
    }

    ctx.versionedStructs.set(struct.name, variants);
}

/**
 * @param {string} name
 * @returns {string}
 */
function truncateTypeSuffix(name) {
    const idx = name.indexOf("_t");
    if (idx === -1) {
        return name;
    }

    return name.substring(0, idx);
}
