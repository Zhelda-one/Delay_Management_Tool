import Token, { tokenType, Location } from "./token.js";

/**
 * A class used for the lexical analysis stage of the pipeline.
 */
export default class Scanner {
    /** @type {string} */
    #contents;
    /** @type {number} */
    #position;
    /** @type {Location} */
    #tokenLocation;

    /**
     * @param {string} contents
     */
    constructor(contents) {
        this.#contents = contents;
        this.#position = 0;
        this.#tokenLocation = new Location(1, 1);
    }

    /**
     * This method returns:
     *   - the next token if available,
     *   - null otherwise.
     *
     * This method does not throw on illegal input, but instead returns a token
     * with it's `type` field set to `tokenType.illegal`.
     *
     * @returns {Token | null}
     */
    next() {
        if (this.#isAtEnd()) {
            return null;
        }

        const location = this.#tokenLocation;
        const cur = this.#contents[this.#position];

        switch (cur) {
            case "\t":
            case " ":
                this.#advance();
                return this.next();
            case "\n":
                this.#advance();
                return this.next();
            case "\r":
                this.#advance();
                if (
                    !this.#isAtEnd() &&
                    this.#contents[this.#position] === "\n"
                ) {
                    this.#advance();
                    return this.next();
                }
                return new Token(
                    tokenType.illegal,
                    "<carriage return>",
                    location,
                );
            case "-":
                this.#advance();
                if (
                    !this.#isAtEnd() &&
                    isValidIntChar(this.#contents[this.#position])
                ) {
                    const number = this.#readWhile(isValidIntChar);
                    return new Token(tokenType.int, "-" + number, location);
                }
                return new Token(tokenType.minus, "-", location);
            case "+":
                this.#advance();
                return new Token(tokenType.add, "+", location);
            case "=":
                this.#advance();
                return new Token(tokenType.equals, "=", location);
            case ":":
                this.#advance();
                if (
                    !this.#isAtEnd() &&
                    this.#contents[this.#position] === ":"
                ) {
                    this.#advance();
                    return new Token(tokenType.doubleColon, "::", location);
                }
                return new Token(tokenType.colon, ":", location);
            case "*":
                this.#advance();
                return new Token(tokenType.multiply, "*", location);
            case "/":
                this.#advance();
                return new Token(tokenType.divide, "/", location);
            case "@":
                this.#advance();
                const vv = this.#readWhile(isValidIdentChar);
                return new Token(lookupAtTokenType(vv), vv, location);
            case "(":
                this.#advance();
                return new Token(tokenType.lParen, "(", location);
            case ")":
                this.#advance();
                return new Token(tokenType.rParen, ")", location);
            case "[":
                this.#advance();
                return new Token(tokenType.lBracket, "[", location);
            case "]":
                this.#advance();
                return new Token(tokenType.rBracket, "]", location);
            case "{":
                this.#advance();
                return new Token(tokenType.lBrace, "{", location);
            case "}":
                this.#advance();
                return new Token(tokenType.rBrace, "}", location);
            case ",":
                this.#advance();
                return new Token(tokenType.comma, ",", location);
            case "'":
            case '"':
                this.#advance();
                const value = this.#readWhile((char) => char !== cur);
                this.#advance();

                return new Token(tokenType.string, value, location);
            case "#":
                this.#advance();
                while (
                    !this.#isAtEnd() &&
                    this.#contents[this.#position] !== "\n"
                ) {
                    this.#advance();
                }
                return this.next();
            case "0":
                if (
                    this.#position + 1 < this.#contents.length &&
                    this.#contents[this.#position + 1] === "x"
                ) {
                    this.#advance();
                    this.#advance();
                    const number = this.#readWhile(isValidHexChar);
                    return new Token(tokenType.int, "0x" + number, location);
                }

                return this.#readNumber(location);
            default:
                if (isValidIntChar(cur)) {
                    return this.#readNumber(location);
                }

                if (isValidIdentChar(cur)) {
                    const identifier = this.#readWhile(isValidIdentChar);
                    return new Token(
                        lookupIdentTokenType(identifier),
                        identifier,
                        location,
                    );
                }

                this.#advance();
                return new Token(tokenType.illegal, cur, location);
        }
    }

    /**
     * @param {Location} location
     */
    #readNumber(location) {
        const number = this.#readWhile(isValidIntChar);
        if (!this.#isAtEnd() && this.#contents[this.#position] === ".") {
            this.#advance();
            const aboba = this.#readWhile(isValidIntChar);
            return new Token(tokenType.float, `${number}.${aboba}`, location);
        }

        return new Token(tokenType.int, number, location);
    }

    #advance() {
        if (this.#isAtEnd()) {
            return;
        }

        switch (this.#contents[this.#position]) {
            case "\n":
                this.#tokenLocation.column = 1;
                this.#tokenLocation.row++;
                break;
            case "\t":
                this.#tokenLocation.column += 4;
                break;
            default:
                this.#tokenLocation.column++;
        }

        this.#position++;
    }

    /**
     * @returns {boolean}
     */
    #isAtEnd() {
        return this.#position >= this.#contents.length;
    }

    /**
     * @param {(char: string) => boolean} pred
     * @returns
     */
    #readWhile(pred) {
        const start = this.#position;

        while (!this.#isAtEnd() && pred(this.#contents[this.#position])) {
            this.#advance();
        }

        return this.#contents.slice(start, this.#position);
    }
}

/**
 * @param {string} c
 * @returns {boolean}
 */
function isWhitespace(c) {
    return c === " " || c === "\t" || c === "\r" || c === "\n";
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isValidHexChar(char) {
    return char.match(/[a-fA-F]|\d/) !== null;
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isValidIntChar(char) {
    return (
        char === "0" ||
        char === "1" ||
        char === "2" ||
        char === "3" ||
        char === "4" ||
        char === "5" ||
        char === "6" ||
        char === "7" ||
        char === "8" ||
        char === "9"
    );
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isValidIdentChar(char) {
    // We could use a regex here, however, manually checking if a character is
    // valid like this, is significantly faster.
    return (
        char === "_" ||
        char === "a" ||
        char === "b" ||
        char === "c" ||
        char === "d" ||
        char === "e" ||
        char === "f" ||
        char === "g" ||
        char === "h" ||
        char === "i" ||
        char === "j" ||
        char === "k" ||
        char === "l" ||
        char === "m" ||
        char === "n" ||
        char === "o" ||
        char === "p" ||
        char === "q" ||
        char === "r" ||
        char === "s" ||
        char === "t" ||
        char === "u" ||
        char === "v" ||
        char === "w" ||
        char === "x" ||
        char === "y" ||
        char === "z" ||
        char === "A" ||
        char === "B" ||
        char === "C" ||
        char === "D" ||
        char === "E" ||
        char === "F" ||
        char === "G" ||
        char === "H" ||
        char === "I" ||
        char === "J" ||
        char === "K" ||
        char === "L" ||
        char === "M" ||
        char === "N" ||
        char === "O" ||
        char === "P" ||
        char === "Q" ||
        char === "R" ||
        char === "S" ||
        char === "T" ||
        char === "U" ||
        char === "V" ||
        char === "W" ||
        char === "X" ||
        char === "Y" ||
        char === "Z" ||
        isValidIntChar(char)
    );
}

/**
 * A lookup table used for determining the type of tokens starting with the
 * character `@`.
 *
 * This table is built automatically based on the token names. See the
 * documentation of the `tokenType` object for details.
 *
 * @type {{[key: string]: import("./token.js").TokenType }}
 */
const tokenAtMap = Object.entries(tokenType).reduce((acc, [key, value]) => {
    if (!key.startsWith("at")) {
        return acc;
    }

    acc[key.slice(2).toLowerCase()] = value;
    return acc;
}, {});

/**
 * @param {string} value
 * @returns {import("./token.js").TokenType}
 */
function lookupAtTokenType(value) {
    // TODO: rewrite this, it's weird :/
    const isValidInt = (() => {
        for (const char of value) {
            if (!isValidIntChar(char)) {
                return false;
            }
        }

        return true;
    })();

    if (isValidInt) {
        return tokenType.atIntegerVersion;
    }

    return tokenAtMap[value] ?? tokenType.illegal;
}

/**
 * A lookup table used for determining the type of tokens that are valid
 * identifiers.
 *
 * The problem arises because all keywords are valid identifiers, producing an
 * ambiguity in the token types. We use this lookup table to simplify the
 * solution of this problem.
 *
 * This table is built automatically based on the token names. See the
 * documentation of the `tokenType` object for details.
 *
 * @type {{[key: string]: import("./token.js").TokenType }}
 */
const tokenKeywordMap = Object.entries(tokenType).reduce(
    (acc, [key, value]) => {
        if (!key.startsWith("k")) {
            return acc;
        }

        acc[key.slice(1).toLowerCase()] = value;
        return acc;
    },
    {},
);

/**
 * @param {string} identifier
 * @returns {import("./token.js").TokenType}
 */
function lookupIdentTokenType(identifier) {
    return tokenKeywordMap[identifier] ?? tokenType.identifier;
}
