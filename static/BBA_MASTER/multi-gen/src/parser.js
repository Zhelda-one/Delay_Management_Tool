import {
    ArrayType,
    binaryOp,
    BinaryOpExpression,
    ConstantDefinition,
    Definition,
    EnumerationDefinition,
    Expression,
    FloatExpression,
    Identifier,
    IdentifierExpression,
    IncludeDefinition,
    IntExpression,
    NamespaceDefinition,
    NamespacedIdentifier,
    ProtocolDefinition,
    ProtocolField,
    RangeType,
    StructureConstant,
    StructureDefinition,
    StructureField,
    Type,
    TypedefDefinition,
    EmbeddedProtocolDefinition,
    ExtensionPointDefinition,
    ExtensionPointField,
    RootDefinition,
    StructureFieldAttributes,
} from "./ast.js";
import Scanner from "./scanner.js";
import Token, { tokenType } from "./token.js";
import { inspect } from "node:util";

/**
 * A simple [recursive descent parser](https://en.wikipedia.org/wiki/Recursive_descent_parser)
 * implementation that uses [Pratt parsing](https://en.wikipedia.org/wiki/Operator-precedence_parser#Pratt_parsing)
 * to handle operator precedence.
 *
 * The approach to error handling is to simply throw a new instance of the
 * `Error` class on encounter of an unexpected or illegal token, or an EOF.
 */
export default class Parser {
    /** @type {Scanner} */
    #scanner;
    /** @type {Token | null} */
    #cur;
    /** @type {string} */
    #filename;
    /**
     * The last token that is not null, useful for reporting an EOF error.
     * @type {Token}
     */
    #lastToken;

    /**
     * @param {Scanner} scanner
     * @param {string} filename
     */
    constructor(scanner, filename) {
        this.#scanner = scanner;
        this.#filename = filename;
        this.#cur = this.#scanner.next();
        this.#lastToken = this.#cur;
    }

    /**
     * @param {string} source
     */
    static fromSource(source) {
        const scanner = new Scanner(source);
        return new Parser(scanner, "<empty>");
    }

    /**
     * This method tries to consume all of the available tokens and produces
     * a root definition.
     * @returns {RootDefinition}
     */
    parseWhole() {
        /** @type {Map<string, Definition>} */
        const defs = new Map();

        while (this.#cur) {
            const def = this.parseDefinition();
            defs.set(def.name, def);
        }

        return new RootDefinition(defs);
    }

    /**
     * This method tries to parse the next definition, consuming input tokens.
     * @returns {Definition}
     */
    parseDefinition() {
        if (!this.#cur) {
            this.#eofError();
        }

        const tok = this.#cur.clone();
        let def = undefined;

        switch (this.#cur.type) {
            case tokenType.kStructure:
                def = this.#parseStructureDefinition();
                break;
            case tokenType.kEnumeration:
                def = this.#parseEnumerationDefinition();
                break;
            case tokenType.kConst:
                def = this.#parseConst();
                break;
            case tokenType.kTypedef:
                def = this.#parseTypedef();
                break;
            case tokenType.kNamespace:
                def = this.#parseNamespaceDefinition();
                break;
            case tokenType.kProtocol:
                def = this.#parseProtocolDefinition();
                break;
            case tokenType.kInclude:
                def = this.#parseImportDefinition();
                break;
            case tokenType.kEmbedded_protocol:
                def = this.#parseEmbeddedProtocolDefinition();
                break;
            case tokenType.kExtension_point:
                def = this.#parseExtensionPointDefinition();
                break;
            default:
                throw this.#errorWithLocation(
                    tok,
                    `Expected a declaration token, got ${inspect(tok)}`,
                );
        }

        def.token = tok;
        return def;
    }

    /**
     * @returns {ExtensionPointDefinition}
     */
    #parseExtensionPointDefinition() {
        const defToken = this.#expectCur(tokenType.kExtension_point);
        const name = this.#expectCur(tokenType.identifier).value;

        /** @type {number | undefined} */
        let defaultDiscriminator = undefined;
        if (this.#expectOptional(tokenType.atDefault_discriminator)) {
            this.#expectCur(tokenType.equals);
            defaultDiscriminator = parseInt(
                this.#expectCur(tokenType.int).value,
            );
        }

        this.#expectOptional(tokenType.string); // for the doc comment

        const fields = [];
        while (this.#cur?.type !== tokenType.kEnd) {
            fields.push(this.#parseExtensionPointField());
        }

        this.#expectCur(tokenType.kEnd);

        if (fields.length === 0) {
            throw this.#errorWithLocation(
                defToken,
                "expect an extension point to have at least one field",
            );
        }

        return new ExtensionPointDefinition(name, defaultDiscriminator, fields);
    }

    /**
     * @returns {ExtensionPointField}
     */
    #parseExtensionPointField() {
        const name = this.#expectCur(tokenType.identifier).value;

        this.#expectCur(tokenType.colon);

        const type = this.#parseType();

        this.#expectCur(tokenType.atDiscriminator);
        this.#expectCur(tokenType.equals);
        const discriminator = parseInt(this.#expectCur(tokenType.int).value);

        return new ExtensionPointField(name, type, discriminator);
    }

    #parseImportDefinition() {
        this.#expectCur(tokenType.kInclude);
        const name = this.#expectCur(tokenType.string).value;
        return new IncludeDefinition(name);
    }

    #parseEmbeddedProtocolDefinition() {
        let isDynamic = false;
        let hasLengthField = true;
        let arrayCompatible = false;

        this.#expectCur(tokenType.kEmbedded_protocol);
        const name = this.#expectCur(tokenType.identifier).value;

        if (this.#expectOptional(tokenType.atArray_compatible)) {
            arrayCompatible = true;
        }

        if (this.#expectOptional(tokenType.atDynamic)) {
            isDynamic = true;
        }

        if (this.#expectOptional(tokenType.atNo_length_field)) {
            hasLengthField = false;
        }

        // doc string
        this.#expectOptional(tokenType.string);

        const definitionFilename = this.#expectCur(tokenType.identifier);
        if (definitionFilename.value !== "definition_file") {
            throw this.#errorWithLocation(
                definitionFilename,
                `Expected to get 'definition_filename', got '${definitionFilename.value}' instead`,
            );
        }

        this.#expectCur(tokenType.colon);
        const filename = this.#expectCur(tokenType.identifier).value;
        this.#expectCur(tokenType.kEnd);

        return new EmbeddedProtocolDefinition(
            name,
            filename,
            isDynamic,
            hasLengthField,
            arrayCompatible,
        );
    }

    /**
     * @returns {EnumerationDefinition}
     */
    #parseEnumerationDefinition() {
        this.#expectCur(tokenType.kEnumeration);

        const name = this.#expectCur(tokenType.identifier).value;
        let underlying = undefined;

        if (this.#expectOptional(tokenType.colon)) {
            underlying = this.#expectCur(tokenType.identifier).value;
        }
        this.#expectOptional(tokenType.string);

        return new EnumerationDefinition(
            name,
            this.#parseEnumerationMap(),
            underlying,
        );
    }

    /**
     * @returns {TypedefDefinition}
     */
    #parseTypedef() {
        this.#expectCur(tokenType.kTypedef);
        const name = this.#expectCur(tokenType.identifier).value;
        this.#expectCur(tokenType.colon);
        const underlying = this.#parseType();
        this.#expectOptional(tokenType.string);

        return new TypedefDefinition(name, underlying);
    }

    /**
     * @returns {ConstantDefinition}
     */
    #parseConst() {
        this.#expectCur(tokenType.kConst);
        const identifier = this.#expectCur(tokenType.identifier).value;
        this.#expectCur(tokenType.colon);
        const type = this.#parseType();
        this.#expectCur(tokenType.equals);
        const expression = this.parseExpression();
        this.#expectOptional(tokenType.string);

        return new ConstantDefinition(identifier, type, expression);
    }

    /**
     * @returns {NamespaceDefinition}
     */
    #parseNamespaceDefinition() {
        this.#expectCur(tokenType.kNamespace);
        const name = this.#expectCur(tokenType.identifier).value;
        return new NamespaceDefinition(name, this.#parseNamespace());
    }

    /**
     * @returns {Map<string, NamespaceDefinition>}
     */
    #parseNamespace() {
        const defs = new Map();

        while (this.#cur && this.#cur.type !== tokenType.kNamespace) {
            const def = this.parseDefinition();
            defs.set(def.name, def);
        }

        return defs;
    }

    /**
     * @returns {Map<string, number>}
     */
    #parseEnumerationMap() {
        /** @type {Map<string, number>} */
        const enumMap = new Map();

        while (this.#cur?.type != tokenType.kEnd) {
            const curIdentifier = this.#expectCur(tokenType.identifier);
            this.#expectCur(tokenType.equals);
            const curValue = this.#expectCur(tokenType.int);
            this.#expectOptional(tokenType.string);

            enumMap.set(curIdentifier.value, parseInt(curValue.value));
        }

        this.#expectCur(tokenType.kEnd);
        return enumMap;
    }

    /**
     * @returns {StructureDefinition}
     */
    #parseStructureDefinition() {
        this.#expectCur(tokenType.kStructure);
        const name = this.#expectCur(tokenType.identifier).value;

        const structVersioned =
            this.#expectOptional(tokenType.atVersioned) !== null;

        this.#expectOptional(tokenType.string);

        const fields = [];
        const consts = new Map();
        while (this.#cur !== null && this.#cur.type !== tokenType.kEnd) {
            const cur = this.#cur;

            switch (cur?.type) {
                case tokenType.identifier:
                    const field = this.#parseStructureField();
                    fields.push(field);
                    break;
                case tokenType.kConst:
                    const c = this.#parseStructConst();
                    consts.set(c.name, c);
                    break;
                default:
                    throw this.#tokenMismatch(
                        [tokenType.identifier, tokenType.kConst],
                        cur,
                    );
            }
        }

        this.#expectCur(tokenType.kEnd);

        return new StructureDefinition(name, fields, consts, structVersioned);
    }

    /**
     * @returns {StructureConstant}
     */
    #parseStructConst() {
        const token = this.#expectCur(tokenType.kConst).clone();
        const name = this.#expectCur(tokenType.identifier).value;
        this.#expectCur(tokenType.colon);
        const type = this.#parseType();
        this.#expectCur(tokenType.equals);
        const value = this.parseExpression();

        let version = 0;
        const versionToken = this.#expectOptional(tokenType.atIntegerVersion);
        if (versionToken) {
            version = parseInt(versionToken.value);
        }

        this.#expectOptional(tokenType.string);

        return new StructureConstant(name, type, value, version, token);
    }

    /**
     * @returns {ProtocolDefinition}
     */
    #parseProtocolDefinition() {
        this.#expectCur(tokenType.kProtocol);
        const fields = new Map();
        const name = this.#expectCur(tokenType.identifier).value;
        while (this.#cur?.type !== tokenType.kEnd) {
            const field = this.#parseProtocolField();
            fields.set(field.name, field);
        }
        this.#expectCur(tokenType.kEnd);
        return new ProtocolDefinition(name, fields);
    }

    /**
     * @param {import("./token.js").TokenType} type
     * @returns {Token}
     */
    #expectCur(type) {
        const token = this.#cur;
        if (!token) {
            throw this.#eofError();
        }

        if (token.type !== type) {
            throw this.#tokenMismatch([type], token);
        }

        this.#advance();
        return token;
    }

    /**
     * @param {import("./token.js").TokenType} type
     */
    #expectOptional(type) {
        const cur = this.#cur;
        if (!cur || cur.type !== type) {
            return null;
        }

        this.#advance();
        return cur;
    }

    /**
     * @returns {ProtocolField}
     */
    #parseProtocolField() {
        this.#expectCur(tokenType.kMessage);
        const name = this.#expectCur(tokenType.identifier).value;
        this.#expectCur(tokenType.colon);
        const type = this.#parseIdentifier();
        this.#expectCur(tokenType.kId);
        this.#expectCur(tokenType.colon);
        const id = this.#expectCur(tokenType.int).value;
        this.#expectCur(tokenType.kEnd);
        return new ProtocolField(name, type, id);
    }

    /**
     * @returns {StructureField}
     */
    #parseStructureField() {
        const name = this.#expectCur(tokenType.identifier);
        this.#expectCur(tokenType.colon);
        const type = this.#parseType();

        let attributes = new StructureFieldAttributes();
        let version = 0;
        let sameVersionForAllElements = false;

        if (this.#cur?.type === tokenType.kAttributes) {
            this.#advance();

            this.#expectCur(tokenType.lBrace);
            const stringAttributes = this.#parseWithSeparator(
                tokenType.comma,
                () => this.#expectCur(tokenType.identifier).value,
            );
            this.#expectCur(tokenType.rBrace);

            for (const attr of stringAttributes) {
                attributes.string.add(attr);
            }
        }

        const intVersion = this.#expectOptional(tokenType.atIntegerVersion);
        if (intVersion) {
            version = parseInt(intVersion.value);
        }

        if (this.#expectOptional(tokenType.atSame_version_for_all_elements)) {
            attributes.sameVersionForAllElements = true;
        }

        if (this.#expectOptional(tokenType.kShortdescr)) {
            this.#expectCur(tokenType.equals);
            this.#expectCur(tokenType.string);
        }

        this.#expectOptional(tokenType.string);

        return new StructureField(
            name.value,
            type,
            attributes,
            version,
        );
    }

    /**
     * @returns {Identifier}
     */
    #parseIdentifier() {
        const firstPart = this.#expectCur(tokenType.identifier);
        if (this.#cur?.type !== tokenType.doubleColon) {
            return new Identifier(firstPart.value);
        }

        this.#advance();
        const secondPart = this.#expectCur(tokenType.identifier);
        return new NamespacedIdentifier(firstPart.value, secondPart.value);
    }

    /**
     * @returns {Type}
     */
    #parseType() {
        const name = this.#parseIdentifier();
        if (!this.#cur) {
            return new Type(name);
        }

        switch (this.#cur.type) {
            case tokenType.lBracket:
                this.#advance();
                const length = this.parseExpression();
                this.#expectCur(tokenType.rBracket);

                return new ArrayType(name, length);
            case tokenType.kRange:
                this.#advance();

                this.#expectCur(tokenType.lBracket);
                const lower = this.parseExpression();
                this.#expectCur(tokenType.comma);
                const higher = this.parseExpression();
                this.#expectCur(tokenType.rBracket);

                return new RangeType(name, lower, higher);
            default:
                return new Type(name);
        }
    }

    /**
     * @returns {Expression}
     */
    #parseExpressionSimple() {
        const cur = this.#cur;
        if (!cur) {
            throw this.#eofError();
        }

        switch (cur.type) {
            case tokenType.int:
                this.#advance();
                return new IntExpression(parseInt(cur.value));
            case tokenType.float:
                this.#advance();
                return new FloatExpression(parseFloat(cur.value));
            case tokenType.identifier:
                return new IdentifierExpression(this.#parseIdentifier());
            case tokenType.lParen:
                this.#advance();
                const expr = this.parseExpression();
                this.#expectCur(tokenType.rParen);
                return expr;
            default:
                throw this.#errorWithLocation(
                    cur,
                    `Undefined operator '${cur.value}'`,
                ); // :P
        }
    }

    /**
     * @returns {Expression}
     */
    parseExpression() {
        return this.#parseExpressionPrec(0);
    }

    /**
     * @param {number} precedence
     * @returns {Expression}
     */
    #parseExpressionPrec(precedence) {
        let left = this.#parseExpressionSimple();
        if (!this.#cur) {
            return left;
        }

        while (this.#cur) {
            // This is the core of the `Pratt parsing` approach used in our
            // parser implementation: we look at the current token and determine
            // it's operator precedence. If it's less that the one that we
            // are parsing currently, we proceed with an early return of an
            // accumulated expression. If it's greater or equal to our current
            // precedence, we greedily parse the expression further, thus
            // making the current `left` expression a sub-expression of a bigger
            // one we are trying to fully parse, and making the resulting tree
            // higher.
            const prec = getOperatorPrecedence(this.#cur.type);
            if (prec < precedence) {
                break;
            }
            const parseFunction = this.#getParseFunction(prec, this.#cur.type);
            this.#advance();

            left = parseFunction(left);
        }

        return left;
    }

    /**
     * @param {number} precedence
     * @param {import("./token.js").TokenType} type
     * @returns {(left: Expression) => Expression}
     */
    #getParseFunction(precedence, type) {
        switch (type) {
            case tokenType.add:
                return (left) =>
                    new BinaryOpExpression(
                        binaryOp.add,
                        left,
                        this.#parseExpressionPrec(precedence),
                    );
            case tokenType.minus:
                return (left) =>
                    new BinaryOpExpression(
                        binaryOp.sub,
                        left,
                        this.#parseExpressionPrec(precedence),
                    );
            case tokenType.divide:
                return (left) =>
                    new BinaryOpExpression(
                        binaryOp.div,
                        left,
                        this.#parseExpressionPrec(precedence),
                    );
            case tokenType.multiply:
                return (left) =>
                    new BinaryOpExpression(
                        binaryOp.mul,
                        left,
                        this.#parseExpressionPrec(precedence),
                    );
            default:
                return (x) => x;
        }
    }

    /**
     * @template T
     * @param {import("./token.js").TokenType} separator
     * @param {(this: Parser) => T} method
     * @returns {T[]}
     */
    #parseWithSeparator(separator, method) {
        const result = [];

        while (this.#cur) {
            const r = method.call(this);
            result.push(r);

            if (this.#cur.type !== separator) {
                break;
            }

            this.#advance();
        }

        return result;
    }

    #advance() {
        this.#lastToken = this.#cur;
        this.#cur = this.#scanner.next();
    }

    /**
     * @param {Token} token
     * @param {string} message
     * @returns {Error}
     */
    #errorWithLocation(token, message) {
        const location = token.location;
        return new Error(
            `${this.#filename}:${location.row}:${location.column - token.value.length}: ${message}`,
        );
    }

    /**
     * @param {import("./token.js").TokenType[]} expected
     * @param {Token} got
     * @returns {Error}
     */
    #tokenMismatch(expected, got) {
        return this.#errorWithLocation(
            got,
            `Expected a token of types ${expected}, but got ${inspect(got)}`,
        );
    }

    /**
     * @returns {Error}
     */
    #eofError() {
        return new Error(`${this.#filename}: Unexpected eof at ${inspect(this.#lastToken)}`);
    }
}

/**
 * Determine an operator precedence of a token.
 *
 * Typical arithmetic operators have precedence based on the evaluation rules
 * encountered in, well, arithmetics :). All other tokens have smaller
 * precedence, ultimately meaning that if such a token can be parsed into an
 * expression, such expression is either a leaf in an expression tree, or a root
 * of an expression tree with one node.
 *
 * @param {import("./token.js").TokenType} type
 * @returns {number}
 */
function getOperatorPrecedence(type) {
    switch (type) {
        case tokenType.add:
        case tokenType.minus:
            return 1;
        case tokenType.multiply:
        case tokenType.divide:
            return 2;
        default:
            return -1;
    }
}
