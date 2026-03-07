import { describe, it, expect } from "vitest";
import Scanner from "../src/scanner.js";
import { tokenType } from "../src/token.js";

describe("Scanner class", () => {
    it("Should create a new scanner object", () => {
        const scanner = new Scanner("name");
        expect(scanner).toBeDefined();
    });

    it("Should move to next token", () => {
        const scanner = new Scanner("name name2");
        scanner.next();
        const result = scanner.next();
        expect(result).toBeDefined();
        expect(result?.value).toBe("name2");
    });

    it("Should return null when no more tokens", () => {
        const scanner = new Scanner("name");
        scanner.next();
        const result = scanner.next();
        expect(result).toBeNull();
    });

    it("Should skip whitespace", () => {
        const scanner = new Scanner("  name");
        const result = scanner.next();
        expect(result?.value).toBe("name");
    });

    it("Should return key word identifier", () => {
        const scanner = new Scanner("typedef");
        const result = scanner.next();
        expect(result?.type).toBe(tokenType.kTypedef);
        expect(result?.value).toBe("typedef");
    });
});
