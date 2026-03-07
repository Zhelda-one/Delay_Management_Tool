import { readFileSync } from "node:fs";
import { Definition, RootDefinition } from "./ast.js";
import Parser from "./parser.js";
import Scanner from "./scanner.js";
import Token from "./token.js";

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function clone(obj) {
    return Object.setPrototypeOf(
        structuredClone(obj),
        Object.getPrototypeOf(obj),
    );
}

/**
 * Alignment should be a power of two. If not, good luck debugging the call site.
 * @param {number} size
 * @param {number} alignment
 * @returns {number}
 */
export function alignTo(size, alignment) {
    const modulo = size & (alignment - 1); // same as 'size % alignment', but faster
    return modulo === 0 ? size : size + alignment - modulo;
}

/**
 * @param {string} filename
 * @returns {Token[]}
 */
export function tokenizeFile(filename) {
    const contents = readFileSync(filename, { encoding: "utf-8" });
    const scanner = new Scanner(contents);

    const result = [];
    let token;

    while ((token = scanner.next())) {
        result.push(token);
    }

    return result;
}

/**
 * @param {string} filename
 * @returns {ParsedFile}
 */
export function parseFile(filename) {
    const contents = readFileSync(filename, { encoding: "utf-8" });
    const scanner = new Scanner(contents);
    const root = new Parser(scanner, filename).parseWhole();
    return new ParsedFile(filename, root);
}

export class ParsedFile {
    /** @type {string} */
    path;
    /** @type {RootDefinition} */
    root;

    /**
     * @param {string} path
     * @param {RootDefinition} definitions
     */
    constructor(path, definitions) {
        this.path = path;
        this.root = definitions;
    }
}
