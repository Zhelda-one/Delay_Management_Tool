import { expect, describe, it } from "vitest";
import Parser from "../src/parser";
import {
    ArrayType,
    binaryOp,
    BinaryOpExpression,
    ConstantDefinition,
    EnumerationDefinition,
    Expression,
    FloatExpression,
    Identifier,
    IdentifierExpression,
    IntExpression,
    NamespaceDefinition,
    ProtocolDefinition,
    ProtocolField,
    StructureConstant,
    EmbeddedProtocolDefinition,
    StructureDefinition,
    StructureField,
    Type,
    RangeType,
    TypedefDefinition,
    StructureFieldAttributes,
} from "../src/ast";
import { equalIgnoreToken } from "./lib";

describe("Parser", () => {
    it("Should parse integers", () => {
        const e = parseExpression("123");
        expect(e).toBeInstanceOf(IntExpression);
        expect(e).toStrictEqual(new IntExpression(123));
    });

    it("Should parse floats", () => {
        const e = parseExpression("1.23");
        expect(e).toBeInstanceOf(FloatExpression);
        expect(e).toStrictEqual(new FloatExpression(1.23));
    });

    it("Should parse identifiers", () => {
        const e = parseExpression("identifier");
        expect(e).toBeInstanceOf(IdentifierExpression);
        expect(e).toStrictEqual(
            new IdentifierExpression(new Identifier("identifier")),
        );
    });

    it("Should parse binary operations", () => {
        const e = parseExpression("1 + 2");
        expect(e).toBeInstanceOf(BinaryOpExpression);
        expect(e).toStrictEqual(
            new BinaryOpExpression(
                binaryOp.add,
                new IntExpression(1),
                new IntExpression(2),
            ),
        );
    });

    it("Should parse binary operations with correct precedence", () => {
        const e = parseExpression("5 * 3.14 + 2 - num / 9");
        expect(e).toBeInstanceOf(BinaryOpExpression);
        expect(e).toStrictEqual(
            new BinaryOpExpression(
                binaryOp.add,
                new BinaryOpExpression(
                    binaryOp.mul,
                    new IntExpression(5),
                    new FloatExpression(3.14),
                ),
                new BinaryOpExpression(
                    binaryOp.sub,
                    new IntExpression(2),
                    new BinaryOpExpression(
                        binaryOp.div,
                        new IdentifierExpression(new Identifier("num")),
                        new IntExpression(9),
                    ),
                ),
            ),
        );
    });

    it("Should parse a structure definition", () => {
        const d = Parser.fromSource(
            `structure Struct
            a: int32
            b: boolean
            c: uint8[16]
        end`,
        ).parseDefinition();
        // @ts-ignore
        d.token = undefined;

        expect(d).toBeInstanceOf(StructureDefinition);
        expect(d).toStrictEqual(
            new StructureDefinition(
                "Struct",
                [
                    field("a", "int32"),
                    field("b", "boolean"),
                    new StructureField(
                        "c",
                        new ArrayType(
                            new Identifier("uint8"),
                            new IntExpression(16),
                        ),
                        new StructureFieldAttributes(),
                        0,
                    ),
                ],
                new Map(),
                false,
            ),
        );
    });

    it("Should parse a structure definition with associated consts", () => {
        const d = Parser.fromSource(
            `structure Struct
                 const C1: int16 = -2137
                 const C2: uint8 = 0xFF

                 f: uint8
                 b: boolean
             end`,
        ).parseDefinition();

        // @ts-ignore
        d.token = undefined;

        expect(d).toBeInstanceOf(StructureDefinition);
        expect(
            equalIgnoreToken(
                d,
                new StructureDefinition(
                    "Struct",
                    [field("f", "uint8"), field("b", "boolean")],
                    new Map(
                        [
                            ["C1", const_("C1", "int16", -2137)],
                            ["C2", const_("C2", "uint8", 0xff)]
                        ]
                    ),
                    false,
                ),
            ),
        ).toBe(true);
    });

    it("Should parse an enum definition", () => {
        const d = Parser.fromSource(
            `enumeration Enum
            A = 1
            B = 1024
        end`,
        ).parseDefinition();
        // @ts-ignore
        d.token = undefined;

        expect(d).toBeInstanceOf(EnumerationDefinition);
        expect(d).toStrictEqual(
            new EnumerationDefinition(
                "Enum",
                new Map([
                    ["A", 1],
                    ["B", 1024],
                ]),
                "uint16",
            ),
        );
    });

    it("Should parse a protocol definition", () => {
        const d = Parser.fromSource(
            `protocol Proto
                message M1: message_t         id:0x01 end
                message M2: another_message_t id:0x02 end
             end`,
        ).parseDefinition();
        // @ts-ignore
        d.token = undefined;

        expect(d).toBeInstanceOf(ProtocolDefinition);
        expect(d).toStrictEqual(
            new ProtocolDefinition(
                "Proto",
                new Map([
                    [
                        "M1",
                        new ProtocolField(
                            "M1",
                            new Identifier("message_t"),
                            "0x01",
                        ),
                    ],
                    [
                        "M2",
                        new ProtocolField(
                            "M2",
                            new Identifier("another_message_t"),
                            "0x02",
                        ),
                    ],
                ]),
            ),
        );
    });

    it("Should parse a constant definition", () => {
        const d = Parser.fromSource(
            `const CONST: int8 = 0x1F`,
        ).parseDefinition();
        // @ts-ignore
        d.token = undefined;

        expect(d).toBeInstanceOf(ConstantDefinition);
        expect(d).toStrictEqual(
            new ConstantDefinition(
                "CONST",
                new Type(new Identifier("int8")),
                new IntExpression(0x1f),
            ),
        );
    });

    it("Should parse embedded_protocol", () => {
        const e = Parser.fromSource(
            `embedded_protocol mib @array_compatible "MIB is stored in this embedded protocol"
            definition_file: mib
            end`,
        ).parseDefinition();
        expect(e).toBeInstanceOf(EmbeddedProtocolDefinition);
        expect(e.name).toBe("mib");
        // @ts-ignore
        expect(e.definitionFilename).toBe("mib");
    });

    it("Should parse RangeType", () => {
        const e = Parser.fromSource(
            `typedef numOfItems_t: uint32 range[1, 16]`,
        ).parseDefinition();
        expect(e).toBeInstanceOf(TypedefDefinition);
        expect(e.name).toBe("numOfItems_t");
        // @ts-ignore
        expect(e.underlying.name.value).toBe("uint32");
        // @ts-ignore
        expect(e.underlying.range.lowerBound.value).toBe(1);
        // @ts-ignore
        expect(e.underlying.range.higherBound.value).toBe(16);
    });

    it("Should parse a namespace definition", () => {
        const d = Parser.fromSource(
            `namespace ns
             const C: int8 = 1
             structure S
                 f1: boolean
             end
        `,
        ).parseDefinition();
        // @ts-ignore
        d.token = undefined;
        // @ts-ignore
        for (const def of d.definitions.values()) {
            def.token = undefined;
        }

        expect(d).toBeInstanceOf(NamespaceDefinition);
        expect(
            equalIgnoreToken(
                d,
                new NamespaceDefinition(
                    "ns",
                    // @ts-ignore
                    new Map([
                        ["C", const_("C", "int8", 1)],
                        [
                            "S",
                            new StructureDefinition(
                                "S",
                                [field("f1", "boolean")],
                                new Map(),
                                false,
                            ),
                        ],
                    ]),
                ),
            ),
        ).toBe(true);
    });
});

/**
 * @param {string} name
 * @param {string} type
 */
function field(name, type) {
    return new StructureField(
        name,
        new Type(new Identifier(type)),
        new StructureFieldAttributes(),
        0,
    );
}

/**
 * @param {string} name
 * @param {string} type
 * @param {number} value
 * @returns {StructureConstant}
 */
function const_(name, type, value) {
    return new StructureConstant(
        name,
        new Type(new Identifier(type)),
        new IntExpression(value),
        0,
        // @ts-ignore
        undefined,
    );
}

/**
 * @param {string} source
 * @returns {Expression}
 */
function parseExpression(source) {
    return Parser.fromSource(source).parseExpression();
}
