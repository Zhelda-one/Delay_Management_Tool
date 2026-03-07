/**
 * This module defines data structures partially corresponding to the ones
 * defined in the `ast.js` module. They serve a similar purpose: to represent
 * definitions found in files. The ones in this module, however, have more
 * refined information available in them.
 */

import { Definition } from "../ast.js";
import { alignTo, clone } from "../util.js";

/*
 * A base class for types - both primitive and user-defined.
 */
export class Type {
    /** @type {number} */
    size;
    /** @type {number} */
    alignment;
    /** @type {string} */
    name;
    /** @type {string} */
    namespace;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {number} size
     * @param {number} alignment
     */
    constructor(namespace, name, size, alignment) {
        this.namespace = namespace;
        this.name = name;
        this.size = size;
        this.alignment = alignment;
    }
}

export class PrimitiveType extends Type {
    static u8 = new PrimitiveType("uint8", 1, 1, "u8");
    static u16 = new PrimitiveType("uint16", 2, 2, "u16");
    static u32 = new PrimitiveType("uint32", 4, 4, "u32");
    static u64 = new PrimitiveType("uint64", 8, 8, "u64");
    static i8 = new PrimitiveType("int8", 1, 1, "i8");
    static i16 = new PrimitiveType("int16", 2, 2, "i16");
    static i32 = new PrimitiveType("int32", 4, 4, "i32");
    static i64 = new PrimitiveType("int64", 8, 8, "i64");
    static f32 = new PrimitiveType("float32", 4, 4, "f32");
    static f64 = new PrimitiveType("float64", 8, 8, "f64");
    static bool = new PrimitiveType("boolean", 1, 1, "u8");

    /**
     * A canonical name of the primitive type.
     *
     * Basically, a shorter name for it.
     *
     * @type {string}
     */
    canonicalName;

    /**
     * @param {string} name
     * @param {number} size
     * @param {number} alignment
     * @param {string} canonicalName
     */
    constructor(name, size, alignment, canonicalName) {
        super("", name, size, alignment);

        this.canonicalName = canonicalName;
    }
}

/**
 * A base class for all types representing array types.
 *
 * This is needed because MuLTI defines multiple array types, which have some
 * subtle differences and require special handling.
 *
 * @abstract
 */
export class ArrayType extends PrimitiveType {
    /** @type {Type} */
    elementType;
    /** @type {number} */
    length;

    /**
     * @param {string} name
     * @param {number} size
     * @param {number} alignment
     * @param {Type} elementType
     * @param {number} length
     */
    constructor(name, size, alignment, elementType, length) {
        super(name, size, alignment, `${elementType.name}[${length}]`);

        this.elementType = elementType;
        this.length = length;
    }
}

/**
 * A type representing a regular array without any attributes.
 *
 * Such arrays have both fixed size allocations in the static part of the
 * message buffer and are prefixed with their length.
 */
export class StaticVariableSizedArray extends ArrayType {
    /** @type {number} */
    static #lengthFieldSize = PrimitiveType.u32.size;

    /**
     * @param {Type} elementType
     * @param {number} length
     */
    constructor(elementType, length) {
        const alignment = Math.max(
            StaticVariableSizedArray.#lengthFieldSize,
            elementType.alignment,
        );

        super(
            `StaticVariableSizedArray<${elementType.name}>`,
            StaticVariableSizedArray.#lengthFieldSize +
                length * elementType.size,
            alignment,
            elementType,
            length,
        );
    }
}

/**
 * A type representing all arrays with a `no_length_field` attribute.
 *
 * Such arrays have a fixed size allocation in the static part of the message
 * buffer, but, contrary to `StaticVariableSizedArray`s, are not prefixed with
 * their length.
 */
export class StaticFixedSizedArray extends ArrayType {
    /**
     * @param {Type} elementType
     * @param {number} length
     */
    constructor(elementType, length) {
        const alignment = Math.max(elementType.alignment, 4);
        super(
            `StaticFixedSizedArray<${elementType.name}>`,
            length * elementType.size,
            alignment,
            elementType,
            length,
        );
    }
}

/**
 * A type representing all arrays with a `dynamic_alloc` attribute.
 *
 * Such arrays have a dynamic size allocation in the dynamic part of the
 * message, but have the offset and the length of their data buffer stored in
 * the static part of the message.
 */
export class DynamicVariableSizedArray extends ArrayType {
    /** @type {number} */
    static #offsetFieldSize = PrimitiveType.u32.size;
    /** @type {number} */
    static #lengthFieldSize = PrimitiveType.u32.size;

    /**
     * @param {Type} elementType
     * @param {number} length
     */
    constructor(elementType, length) {
        super(
            `DynamicVariableSizedArray<${elementType.name}>`,
            DynamicVariableSizedArray.#offsetFieldSize +
                DynamicVariableSizedArray.#lengthFieldSize,
            // the alignment is the same as size of length/offset fields
            DynamicVariableSizedArray.#lengthFieldSize,
            elementType,
            length,
        );
    }
}

/**
 * A type representing all arays with a `dynamic_packed` attribute, which is
 * deprecated in MuLti.
 *
 * Such arrays have have a dynamic size allocation in the dynamic part of the
 * message, and have their offset and length placed in the static part of the
 * message, similarly to the `DynamicVariableSizedArray`s, but, the size of the
 * offset and length field is reduced to a single byte each, thus saving space
 * in the static size of message.
 */
export class DynamicPackedArray extends ArrayType {
    /** @type {number} */
    static #offsetFieldSize = PrimitiveType.u8.size;
    /** @type {number} */
    static #lengthFieldSize = PrimitiveType.u8.size;

    /**
     * @param {Type} elementType
     * @param {number} length
     */
    constructor(elementType, length) {
        super(
            `DynamicPackedSizedArray<${elementType.name}>`,
            DynamicPackedArray.#offsetFieldSize +
                DynamicPackedArray.#lengthFieldSize,
            // the alignment is the same as size of length/offset fields
            DynamicPackedArray.#lengthFieldSize,
            elementType,
            length,
        );
    }
}

export class SameVersionArray extends ArrayType {
    /** @type {StructureType} */
    elementType;

    /**
     * @param {StructureType} elementType
     * @param {number} length
     */
    constructor(elementType, length) {
        super(
            `SameVersionArray<${elementType.name}>`,
            16,
            4,
            elementType,
            length,
        );
        this.elementType = elementType;
    }
}

/**
 * A base class for all nodes encountered in definition files.
 *
 * @abstract
 */
export class Node {
    /** @type {undefined} */
    #__unused; // since js/ts is duck-typed, this ensures more type safety
}

/**
 * A base class for all nodes which define a type.
 *
 * @abstract
 */
export class TypeDefinitionNode extends Node {
    /** @type {string} */
    name;
    /** @type {Type} */
    type;

    /**
     * @param {string} name
     * @param {Type} type
     */
    constructor(name, type) {
        super();

        this.name = name;
        this.type = type;
    }
}

/**
 * A type representing nodes which define primitive types.
 *
 * Unlike other nodes, such nodes cannot appear in the definition files, since a
 * user cannot define a primitive type. They are used at the 'semantic analysis'
 * stage to provide primitive types (i.e. uint8, float32) to the default
 * environment using an existing model of using `TypeDefinitionNode`s.
 */
export class PrimitiveTypeDefinitionNode extends TypeDefinitionNode {
    /**
     * @param {string} name
     * @param {PrimitiveType} type
     */
    constructor(name, type) {
        super(name, type);
    }
}

/**
 * A type representing the root of the definition tree.
 *
 * This is analagous to the `RootDefinition` type defined in the 'ast.js'
 * module, thus following the same rules: each file can have only one `RootNode`
 * in it, which physically does not appear there by itself.
 */
export class RootNode extends Node {
    /** @type {Node[]} */
    children;

    constructor() {
        super();

        this.children = [];
    }
}

export class StructureType extends Type {
    /** @type {StructureField[]} */
    fields;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {StructureField[]} fields
     */
    constructor(namespace, name, fields) {
        const { size, alignment } =
            calculateStructSizeAndAlignmentAndSetFieldOffsets(fields);
        super(namespace, name, size, alignment);

        this.fields = fields;
    }
}

export class VersionedStructureType extends StructureType {
    /** @type {Map<number, StructureNode>} */
    versions;

    static #tagType = PrimitiveType.u32;
    static #offType = PrimitiveType.u32;

    /**
     * @param {StructureType} struct
     */
    constructor(struct) {
        super(struct.namespace, struct.name, struct.fields);

        const versions = generateStructVersions(struct);

        this.versions = versions;

        this.size =
            VersionedStructureType.#tagType.size +
            VersionedStructureType.#offType.size;
        this.alignment = Math.max(
            VersionedStructureType.#tagType.alignment,
            VersionedStructureType.#offType.alignment,
        );
    }
}

export class StructureNode extends TypeDefinitionNode {
    /** @type {StructureType} */
    type;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {StructureField[]} fields
     * @param {boolean} isVersioned
     */
    constructor(namespace, name, fields, isVersioned) {
        let type = new StructureType(namespace, name, fields);
        if (isVersioned) {
            type = new VersionedStructureType(type);
        }

        super(name, type);

        this.type = type;
        this.namespace = namespace;
    }
}

export class StructureField {
    /** @type {string} */
    name;
    /** @type {Type} */
    type;
    /** @type {number} */
    version;
    /** @type {number} */
    offset = 0; // this value is calculated in the `StructureType` constructor

    /**
     * @param {string} name
     * @param {Type} type
     * @param {number} version
     */
    constructor(name, type, version) {
        this.name = name;
        this.type = type;
        this.version = version;
    }
}

export class EnumerationVariant {
    /** @type {string} */
    name;
    /** @type {number} */
    value;

    /**
     * @param {string} name
     * @param {number} value
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export class EnumerationType extends Type {
    /** @type {Type} */
    underlyingType; // uint8 | uint16 | uint32 | uint64
    /** @type {EnumerationVariant[]} */
    variants;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {Type} underlyingType
     * @param {EnumerationVariant[]} variants
     */
    constructor(namespace, name, underlyingType, variants) {
        super(namespace, name, underlyingType.size, underlyingType.alignment);

        this.underlyingType = underlyingType;
        this.variants = variants;
    }
}

export class EnumerationNode extends TypeDefinitionNode {
    /** @type {EnumerationType} */
    type;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {Type} underlyingType
     * @param {EnumerationVariant[]} variants
     */
    constructor(namespace, name, underlyingType, variants) {
        const type = new EnumerationType(
            namespace,
            name,
            underlyingType,
            variants,
        );
        super(name, type);
        this.type = type;
    }

    /** @returns {Type} */
    get underlyingType() {
        return this.type.underlyingType;
    }

    /** @type {string} */
    get namespace() {
        return this.type.namespace;
    }
}

export class ConstantNode extends Node {
    /** @type {string} */
    name;
    /** @type {number} */
    value;

    /**
     * @param {string} name
     * @param {number} value
     */
    constructor(name, value) {
        super();

        this.name = name;
        this.value = value;
    }
}

export class ProtocolType extends Type {
    /** @type {ProtocolMessage[]} */
    messages;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {ProtocolMessage[]} messages
     */
    constructor(namespace, name, messages) {
        const { size, alignment } = calculateProtocolSizeAndAlignment(messages);
        super(namespace, name, size, alignment);

        this.messages = messages;
    }
}

export class ProtocolNode extends TypeDefinitionNode {
    /**
     * The namespace in which this protocol was defined.
     *
     * This information is useful for the later 'generation' stage of the
     * pipeline, and is easier to track at the 'semantic analysis' stage.
     *
     * @type {string}
     */
    definingNamespace;
    /** @type {ProtocolType} */
    type;

    /**
     * @param {string} name
     * @param {ProtocolMessage[]} messages
     * @param {string} definingNamespace
     */
    constructor(name, messages, definingNamespace) {
        const type = new ProtocolType(definingNamespace, name, messages);
        super(name, type);

        this.type = type;
        this.definingNamespace = definingNamespace;
    }
}

export class ProtocolMessage {
    /** @type {string} */
    name;
    // NOTE: this is actually always a number, but we keep it as a string,
    // because most of the times it is written in hexadecimal in the source
    // code, that way we don't need any hex -> decimal and decimal -> hex
    // conversions when generating the code.
    /** @type {string} */
    id;
    /** @type {Type} */
    type;

    /**
     * @param {string} name
     * @param {string} id
     * @param {Type} type
     */
    constructor(name, id, type) {
        this.name = name;
        this.id = id;
        this.type = type;
    }
}

// WARNING: Do not confuse with the `TypeDefinitionNode`, or you will get fired!
export class TypedefNode extends TypeDefinitionNode {
    /**
     * The namespace which defines this type alias.
     *
     * This is needed because the type alias and the underlying type
     * can be defined in different namespaces.
     *
     * @type {string}
     */
    namespace;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {Type} underlyingType
     */
    constructor(namespace, name, underlyingType) {
        super(name, underlyingType);
        this.namespace = namespace;
    }

    /** @returns {Type} */
    get underlyingType() {
        return this.type;
    }
}

export class NamespaceNode extends Node {
    /** @type {string} */
    name;
    /** @type {Node[]} */
    children;
    /** @type {Map<string, Definition>} */
    definitions;

    /**
     * A mapping from the name of the type to it's index in the `children` node
     * array field of this instance.
     *
     * @type {Map<string, number>}
     */
    #types;
    /**
     * A mapping from the name of the constant to it's index in the `children`
     * node array field of this instance.
     *
     * @type {Map<string, number>}
     */
    #constants;

    /**
     * @param {string} name
     * @param {Map<string, Definition>} definitions
     */
    constructor(name, definitions) {
        super();

        this.name = name;
        this.definitions = definitions;
        this.children = [];
        this.#types = new Map();
        this.#constants = new Map();
    }

    /**
     * @param {TypeDefinitionNode} type
     */
    addType(type) {
        this.#addNode(type, type.name, this.#types);
    }

    /**
     * @param {ConstantNode} constant
     */
    addConstant(constant) {
        this.#addNode(constant, constant.name, this.#constants);
    }

    /**
     * @param {Node} node
     */
    addNode(node) {
        if (node instanceof ConstantNode) {
            this.addConstant(node);
        } else if (node instanceof TypeDefinitionNode) {
            this.addType(node);
        } else {
            this.children.push(node);
        }
    }

    /**
     * @param {string} name
     * @returns {TypeDefinitionNode | undefined}
     */
    getType(name) {
        const node = this.#getNode(name, this.#types);
        if (node && !(node instanceof TypeDefinitionNode)) {
            throw new Error("Expected the node to be a type def node");
        }

        return node;
    }

    /**
     * @param {string} name
     * @returns {ConstantNode | undefined}
     */
    getConstant(name) {
        const node = this.#getNode(name, this.#constants);
        if (node && !(node instanceof ConstantNode)) {
            throw new Error("Expected the node to be namespace");
        }

        return node;
    }

    /**
     * @param {Node} node
     * @param {string} name
     * @param {Map<string, number>} where
     */
    #addNode(node, name, where) {
        if (where.has(name)) {
            return;
        }

        const length = this.children.push(node);
        where.set(name, length - 1);
    }

    /**
     * @param {string} name
     * @param {Map<string, number>} where
     * @returns {Node | undefined}
     */
    #getNode(name, where) {
        const idx = where.get(name);

        if (idx === undefined) {
            return undefined;
        }

        return this.children[idx];
    }
}

export class IncludeNode extends Node {
    // NOTE: MuLTI docs say this path is always relative, however, in practice,
    // it may be either relative or absolute to the root directory :)
    /** @type {string} */
    path;

    /**
     * @param {string} path
     */
    constructor(path) {
        super();

        this.path = path;
    }
}

export class ExtensionPointNode extends TypeDefinitionNode {
    /** @type {number | undefined} */
    defaultDescriminator;
    /** @type {ExtensionPointType} */
    type;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {number | undefined} defaultDescriminator
     * @param {ExtensionPointVariant[]} variants
     */
    constructor(namespace, name, defaultDescriminator, variants) {
        const t = new ExtensionPointType(namespace, name, variants);
        super(name, t);

        this.defaultDescriminator = defaultDescriminator;
        this.type = t;
    }
}

export class ExtensionPointType extends Type {
    /** @type {ExtensionPointVariant[]} */
    variants;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {ExtensionPointVariant[]} variants
     */
    constructor(namespace, name, variants) {
        super(
            namespace,
            name,
            PrimitiveType.u32.size * 2,
            PrimitiveType.u32.alignment,
        );

        this.variants = variants;
    }
}

export class ExtensionPointVariant {
    /** @type {string} */
    name;
    /** @type {Type} */
    type;
    /** @type {number} */
    discriminator;

    /**
     * @param {string} name
     * @param {Type} type
     * @param {number} discriminator
     */
    constructor(name, type, discriminator) {
        this.name = name;
        this.type = type;
        this.discriminator = discriminator;
    }
}

export class EmbeddedProtocolNode extends TypeDefinitionNode {
    /** @type {EmbeddedProtocolType} */
    type;

    /**
     * @param {string} name
     * @param {string} namespace
     * @param {"octet" | "bit"} sizeUnit
     * @param {number} minMessageSize
     * @param {number} maxMessageSize
     * @param {"little" | "big"} endianness
     * @param {EmbeddedProtocolAttributes} attributes
     */
    constructor(
        namespace,
        name,
        sizeUnit,
        minMessageSize,
        maxMessageSize,
        endianness,
        attributes,
    ) {
        const type = new EmbeddedProtocolType(
            namespace,
            name,
            sizeUnit,
            minMessageSize,
            maxMessageSize,
            endianness,
            attributes,
        );

        super(
            name,
            type,
        );

        this.type = type;
    }
}

/**
 * @typedef {{ isDynamic: boolean; hasLengthField: boolean; arrayCompatible: boolean }} EmbeddedProtocolAttributes
 */

export class EmbeddedProtocolType extends Type {
    /** @type {"octet" | "bit"} */
    sizeUnit;
    /** @type {number} */
    minMessageSize;
    /** @type {number} */
    maxMessageSize;
    /** @type {"little" | "big"} */
    endianness;
    /** @type {EmbeddedProtocolAttributes} */
    attributes;

    /**
     * @param {string} namespace
     * @param {string} name
     * @param {"octet" | "bit"} sizeUnit
     * @param {number} minMessageSize
     * @param {number} maxMessageSize
     * @param {"little" | "big"} endianness
     * @param {EmbeddedProtocolAttributes} attributes
     */
    constructor(
        namespace,
        name,
        sizeUnit,
        minMessageSize,
        maxMessageSize,
        endianness,
        attributes,
    ) {
        const coef = sizeUnit === "octet" ? 1 : (1 / 8);
        const minSize = coef * minMessageSize;
        const maxSize = coef * maxMessageSize;

        let typeSize;
        let typeAlign;

        if (!attributes.hasLengthField || attributes.arrayCompatible) {
            typeSize = maxSize;
            typeAlign = 1;
        } else if (attributes.isDynamic) {
            typeSize = PrimitiveType.u32.size * 2;
            typeAlign = PrimitiveType.u32.alignment;
        } else {
            typeAlign = PrimitiveType.u32.alignment;
            typeSize = alignTo(PrimitiveType.u32.size + maxSize, typeAlign);
        }

        super(namespace, name, typeSize, typeAlign);

        this.sizeUnit = sizeUnit;
        this.minMessageSize = minSize;
        this.maxMessageSize = maxSize;
        this.endianness = endianness;
        this.attributes = attributes;
    }
}

/**
 * @param {StructureField[]} fields
 * @returns {{size: number, alignment: number}}
 */
function calculateStructSizeAndAlignmentAndSetFieldOffsets(fields) {
    let size = 0;
    let alignment = 4;

    for (const field of fields) {
        field.offset = alignTo(size, field.type.alignment);
        size = alignTo(size + field.type.size, field.type.alignment);
        alignment = Math.max(alignment, field.type.alignment);
    }

    size = alignTo(size, alignment);

    return { size, alignment };
}

const PROTOCOL_TAG_TYPE = PrimitiveType.u16;

/**
 * @param {ProtocolMessage[]} protocolMessages
 * @returns {{ size: number; alignment: number }}
 */
function calculateProtocolSizeAndAlignment(protocolMessages) {
    const biggestSizeVariant = protocolMessages.reduce((acc, cur) =>
        cur.type.size > acc.type.size ? cur : acc,
    );
    const biggestAlignmentVariant = protocolMessages.reduce((acc, cur) =>
        cur.type.alignment > acc.type.alignment ? cur : acc,
    );

    const size = PROTOCOL_TAG_TYPE.size + biggestSizeVariant.type.size;
    const alignment = Math.max(
        PROTOCOL_TAG_TYPE.alignment,
        biggestAlignmentVariant.type.alignment,
    );

    return { size: alignTo(size, alignment), alignment };
}

/**
 * @param {StructureType} struct
 * @returns {Map<number, StructureNode>}
 */
function generateStructVersions(struct) {
    const maxVersion = struct.fields.reduce(
        (acc, field) => Math.max(field.version, acc),
        0,
    );

    const versions = new Map();

    for (let version = maxVersion; version >= 0; version--) {
        const fields = [];
        for (const field of struct.fields) {
            if (field.version <= version) {
                fields.push(
                    new StructureField(field.name, field.type, field.version),
                ); // have to clone because we mutate it later
            }
        }

        versions.set(
            version,
            new StructureNode(
                struct.name,
                `${struct.name}_version${version}`,
                fields,
                false,
            ),
        );
    }

    return versions;
}
