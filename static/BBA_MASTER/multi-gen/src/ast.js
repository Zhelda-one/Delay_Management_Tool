/**
 * This module contains definitions for data structures used as the output of
 * the 'syntax analysis' stage of the pipeline, and the input to the
 * 'semantic analysis' stage of the pipeline.
 */

import Token from "./token.js";

/**
 * A base class for all definitions.
 */
export class Definition {
    /** @type {string} */
    name;

    /**
     * The token that indicates the start of this definition in the file.
     *
     * For most composite definitions it is the token that defines the keyword
     * which is used to define such a definition. I.e. `structure` for each
     * instance of the `StructureDefinition` class, `enumeration` for each
     * instance of the `EnumerationDefinition` class.
     *
     * @type {Token}
     */
    token;

    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
        // @ts-ignore
        this.token = undefined;
    }
}

/**
 * The root definition class.
 *
 * This class serves as the root of the definition tree in any file. Each
 * definition file can contain at most one root definition.
 *
 * Note that such definition does not physically appear in the file.
 */
export class RootDefinition extends Definition {
    /** @type {Map<string, Definition>} */
    children;

    /**
     * @param {Map<string, Definition>} children
     */
    constructor(children) {
        super("");

        this.children = children;
    }
}

export class StructureDefinition extends Definition {
    /** @type {StructureField[]}*/
    fields;
    /** @type {Map<string, StructureConstant>} */
    consts;
    /**
     * True if the structure definition was `tagged` with the `@versioned`
     * keyword, false otherwise.
     *
     * Versioned structures require special handling and act more as a union,
     * see the MuLTI language reference and documentation for details.
     *
     * @type {boolean}
     */
    isVersioned;

    /**
     * @param {string} name
     * @param {StructureField[]} fields
     * @param {Map<string, StructureConstant>} consts
     * @param {boolean} isVersioned
     */
    constructor(name, fields, consts, isVersioned) {
        super(name);
        this.fields = fields;
        this.consts = consts;
        this.isVersioned = isVersioned;
    }
}

export class StructureConstant {
    /** @type {string} */
    name;
    /** @type {Type} */
    type;
    /** @type {Expression} */
    value;

    /**
     * The version of the constant.
     *
     * Similarly to he structure field, present only in the structure with this
     * version. The default is 0.
     *
     * @type {number}
     */
    version;
    /** @type {Token} */
    token;

    /**
     * @param {string} name
     * @param {Type} type
     * @param {Expression} value
     * @param {number} version
     * @param {Token} token
     */
    constructor(name, type, value, version, token) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.version = version;
        this.token = token;
    }
}

export class StructureFieldAttributes {
    /** @type {Set<string>} */
    string;

    /** @type {boolean} */
    sameVersionForAllElements;

    constructor() {
        this.string = new Set();
        this.sameVersionForAllElements = false;
    }
}

export class StructureField {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {Type}
     */
    type;
    /**
     * The version of the field.
     *
     * Present in the versioned struct only if this version is less than or
     * equal to the struct version. The default is 0, meaning that if a field
     * does not specify it's version, it's always present in the versioned
     * struct.
     *
     * @type {number}
     */
    version;
    /**
     * @type {StructureFieldAttributes}
     */
    attributes;

    /**
     * @param {string} name
     * @param {Type} type
     * @param {StructureFieldAttributes} attributes
     * @param {number} version
     */
    constructor(name, type, attributes, version) {
        this.name = name;
        this.type = type;
        this.attributes = attributes;
        this.version = version;
    }
}

export class ProtocolDefinition extends Definition {
    /**
     * @param {string} name
     * @param {Map<string, ProtocolField>} fields
     */
    constructor(name, fields) {
        super(name);
        this.fields = fields;
    }
}

export class ProtocolField {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {Identifier}
     */
    type;
    /**
     * @type {string}
     */
    id;

    /**
     * @param {string} name
     * @param {Identifier} type
     * @param {string} id
     */
    constructor(name, type, id) {
        this.name = name;
        this.type = type;
        this.id = id;
    }
}

export class EnumerationDefinition extends Definition {
    /** @type {Map<string, number>} */
    values;
    /**
     * The underlying type of an enum, always one of the following:
     * (uint8, uint16, uint32, uint64).
     *
     * The definition site can manually specify the underlying type, otherwise
     * the smallest type fitting all of the enum values is chosen automatically.
     *
     * @type {string}
     */
    underlying;

    /**
     * @param {string} name
     * @param {Map<string, number>} values
     * @param {string | undefined} underlying
     */
    constructor(name, values, underlying) {
        super(name);
        this.values = values;
        if (underlying) {
            this.underlying = underlying;
            return;
        }

        // FIXME: this does not work for 64-bit values and should probably be
        // done at the semantic analysis step instead of here
        const maxValue = Math.max(...values.values());
        const bits = 32 - Math.clz32(maxValue | 1);
        // NOTE: this works assuming there are no negative values in the enum
        const actualBits = 2 ** (Math.ceil(bits / 8) + 2);
        this.underlying = `uint${actualBits > 64 ? 64 : actualBits}`;
    }
}

export class ConstantDefinition extends Definition {
    /**
     * @type {Expression}
     */
    value;
    /**
     * @type {Type}
     */
    type;

    /**
     * @param {string} name
     * @param {Type} type
     * @param {Expression} value
     */
    constructor(name, type, value) {
        super(name);
        this.type = type;
        this.value = value;
    }
}

export class TypedefDefinition extends Definition {
    /**
     * @type {Type}
     */
    underlying;

    /**
     * @param {string} name
     * @param {Type} underlying
     */
    constructor(name, underlying) {
        super(name);
        this.underlying = underlying;
    }
}

export class NamespaceDefinition extends Definition {
    /** @type {Map<string, Definition>} */
    definitions;

    /**
     * @param {string} name
     * @param {Map<string, Definition>} definitions
     */
    constructor(name, definitions) {
        super(name);
        this.definitions = definitions;
    }
}

export class IncludeDefinition extends Definition {
    /**
     * @param {string} name
     */
    constructor(name) {
        super(name);
    }
}

export class EmbeddedProtocolDefinition extends Definition {
    /** @type {string} */
    definitionFilename;
    /** @type {boolean} */
    isDynamic;
    /** @type {boolean} */
    hasLengthField;
    /** @type {boolean} */
    arrayCompatible;

    /**
     * @param {string} name
     * @param {string} definitionFileName
     * @param {boolean} isDynamic
     * @param {boolean} hasLengthField
     * @param {boolean} arrayCompatible
     */
    constructor(name, definitionFileName, isDynamic, hasLengthField, arrayCompatible) {
        super(name);

        this.definitionFilename = definitionFileName;
        this.isDynamic = isDynamic;
        this.hasLengthField = hasLengthField;
        this.arrayCompatible = arrayCompatible;
    }
}

export class ExtensionPointDefinition extends Definition {
    /** @type {number | undefined} */
    defaultDiscriminator;
    /** @type {ExtensionPointField[]} */
    fields;

    /**
     * @param {string} name
     * @param {number | undefined} defaultDiscriminator
     * @param {ExtensionPointField[]} fields
     */
    constructor(name, defaultDiscriminator, fields) {
        super(name);
        this.defaultDiscriminator = defaultDiscriminator;
        this.fields = fields;
    }
}

export class ExtensionPointField {
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

/**
 * A base type for all of the types that are used in definitions.
 */
export class Type {
    /**
     * @type {Identifier}
     */
    name;

    /**
     * @param {Identifier} name
     */
    constructor(name) {
        this.name = name;
    }
}

/**
 * A type representing all array types, which are parametrized by their length
 * and the underlying type.
 *
 * While this class has an explicit field for the `length` parameter, the
 * `underlying type` one is the implicit `name` field inherited from the `Type`
 * base class.
 */
export class ArrayType extends Type {
    /**
     * The length of this array type.
     *
     * This is an expression, since the length of any array can be one of the
     * following: a number, a constant, or an arithmetic expression. We keep it
     * as an expression and let the next steps of the pipeline deal with looking
     * up values of the contants and expression evaluation.
     *
     * @type {Expression}
     */
    length;

    /**
     * @param {Identifier} name
     * @param {Expression} length
     */
    constructor(name, length) {
        super(name);
        this.length = length;
    }
}

/**
 * A type representing MuLTI types that are restricted by the allowed range of
 * values, i.e. `typedef bits uint8 range[0, 64]`.
 */
export class RangeType extends Type {
    /**
     * @type {Range}
     */
    range;

    /**
     * @param {Identifier} underlying
     * @param {Expression} lower
     * @param {Expression} higher
     */
    constructor(underlying, lower, higher) {
        super(underlying);
        this.range = new Range(lower, higher);
    }
}

class Range {
    /**
     * @type {Expression}
     */
    lowerBound;
    /**
     * @type {Expression}
     */
    higherBound;

    /**
     * @param {Expression} lower
     * @param {Expression} higher
     */
    constructor(lower, higher) {
        this.lowerBound = lower;
        this.higherBound = higher;
    }
}

export class Identifier {
    /** @type {string} */
    value;

    /**
     * @param {string} value
     */
    constructor(value) {
        this.value = value;
    }

    toString() {
        return this.value;
    }
}

/**
 * A type representing an identifier contained in some namespace, or possibly an
 * associated structure constant, i.e. `ns::SOME_CONSTANT`,
 * `MyStruct::SOME_CONSTANT`.
 */
export class NamespacedIdentifier extends Identifier {
    /** @type {string} */
    namespace;

    /**
     * @param {string} namespace
     * @param {string} name
     */
    constructor(namespace, name) {
        super(name);
        this.namespace = namespace;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.namespace}::${this.value}`;
    }
}

/**
 * A base class for all expressions.
 */
export class Expression {}

export class IdentifierExpression extends Expression {
    /**
     * @type {Identifier}
     */
    value;

    /**
     * @param {Identifier} value
     */
    constructor(value) {
        super();
        this.value = value;
    }
}

export class IntExpression extends Expression {
    /**
     * @type {number}
     */
    value;

    /**
     * @param {number} value
     */
    constructor(value) {
        super();
        this.value = value;
    }
}

export class FloatExpression extends Expression {
    /**
     * @type {number}
     */
    value;

    /**
     * @param {number} value
     */
    constructor(value) {
        super();
        this.value = value;
    }
}

/**
 * An enum-like object representing an arithmetic binary operator.
 */
export const binaryOp = {
    add: "+",
    sub: "-",
    mul: "*",
    div: "/",
};

/**
 * A type representing arithmetic expressions, i.e. `ns::CONSTANT * 6 - 5`,
 * `5 - 3 + OTHER_CONSTANT / 5.6`.
 */
export class BinaryOpExpression extends Expression {
    /**
     * @type {BinaryOp}
     */
    op;
    /**
     * @type {Expression}
     */
    lhs;
    /**
     * @type {Expression}
     */
    rhs;

    /**
     * @param {string} op
     * @param {Expression} lhs
     * @param {Expression} rhs
     */
    constructor(op, lhs, rhs) {
        super();
        this.op = op;
        this.lhs = lhs;
        this.rhs = rhs;
    }
}
