/**
 * A token class, instances of which are used as the input to the parser.
 *
 * Each token signifies the smallest unit of syntax, i.e. a keyword, a dot,
 * an identifier, a number, a string literal.
 */
export default class Token {
    /** @type {TokenType} */
    type;
    /** @type {string} */
    value;
    /** @type {Location} */
    location;

    /**
     * @param {TokenType} type
     * @param {string} value
     * @param {Location} location
     */
    constructor(type, value, location) {
        this.type = type;
        this.value = value;
        this.location = location;
    }

    /**
     * @returns {Token}
     */
    clone() {
        return new Token(this.type, this.value, this.location.clone());
    }
}

/**
 * This is an object that serves like a typical `enum` type present in other
 * languages, representing the type of a particular token.
 *
 * Note the naming of the fields of this object. Fields starting from character
 * 'k' signify a keyword, and the ones starting from character sequence 'at'
 * signify a special 'at' keyword of form `@<keyword>`, and a special case of
 * such keyword, `atIntegerVersion`, which identifies tokens of form
 * `@<integer literal>`. This is important, since there are multiple lookup
 * tables that are generated later on based on the names of those fields.
 */
export const tokenType = /** @type {const} */ ({
    minus: "-",
    equals: "=",
    colon: ":",
    doubleColon: "::",
    add: "+",
    multiply: "*",
    divide: "/",
    atVersioned: "@versioned",
    atIntegerVersion: "@<int>",
    atArray_compatible: "@array_compatible",
    atNo_length_field: "@no_length_field",
    atDynamic: "@dynamic",
    atSame_version_for_all_elements: "@same_version_for_all_elements",
    lParen: "(",
    rParen: ")",
    lBracket: "[",
    rBracket: "]",
    lBrace: "{",
    rBrace: "}",
    identifier: "<identifier>",
    kStructure: "structure",
    kEnd: "end",
    illegal: "ILLEGAL",
    int: "<int>",
    kEnumeration: "enumeration",
    kConst: "const",
    kTypedef: "typedef",
    kNamespace: "namespace",
    kRange: "range",
    comma: ",",
    kAttributes: "attributes",
    kProtocol: "protocol",
    kId: "id",
    kMessage: "message",
    float: "<float>",
    kInclude: "include",
    string: "<string>",
    kEmbedded_protocol: "embedded_protocol",
    kShortdescr: "shortdescr", // why
    kExtension_point: "extension_point",
    atDefault_discriminator: "@default_discriminator",
    atDiscriminator: "@discriminator",
});

/**
 * @typedef {typeof tokenType[keyof typeof tokenType]} TokenType
 */

export class Location {
    /** @type {number} */
    row;
    /** @type {number} */
    column;

    /**
     * @param {number} row
     * @param {number} column
     */
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    /**
     * @returns {Location}
     */
    clone() {
        return new Location(this.row, this.column);
    }
}
