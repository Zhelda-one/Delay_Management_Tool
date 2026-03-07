import { describe, test, expect } from "vitest";
import { ctx } from "./lib";
import { analyzeDefinition } from "../src/sema/analyze";
import {
    ArrayType,
    binaryOp,
    BinaryOpExpression,
    ConstantDefinition,
    EnumerationDefinition,
    ExtensionPointDefinition,
    ExtensionPointField,
    EmbeddedProtocolDefinition,
    Identifier,
    IdentifierExpression,
    IntExpression,
    NamespaceDefinition,
    NamespacedIdentifier,
    ProtocolDefinition,
    ProtocolField,
    StructureConstant,
    StructureDefinition,
    StructureField,
    StructureFieldAttributes,
    Type,
    TypedefDefinition,
} from "../src/ast";
import {
    PrimitiveType,
    StructureNode,
    StructureType,
    StructureField as S_StructureField,
    Type as S_Type,
    StaticFixedSizedArray,
    StaticVariableSizedArray,
    DynamicVariableSizedArray,
    DynamicPackedArray,
    VersionedStructureType,
    SameVersionArray,
    EnumerationNode,
    EnumerationType,
    EnumerationVariant,
    EmbeddedProtocolNode,
    TypedefNode,
    ConstantNode,
    NamespaceNode,
    ExtensionPointNode,
    ExtensionPointVariant,
    ProtocolNode,
    ProtocolMessage,
} from "../src/sema/tree";

describe("Semantic analysis", () => {
    test("Empty structure", () => {
        const c = ctx();
        const struct = new StructureDefinition("STRUCT", [], new Map(), false);
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.name).toBe(struct.name);
        expect(node.namespace).toBe(c.currentNamespace.name);

        expect(node.type).toBeInstanceOf(StructureType);

        expect(node.type.name).toBe(node.name);
        expect(node.type.namespace).toBe(node.namespace);

        expect(node.type.fields).toStrictEqual([]);
        expect(node.type.size).toBe(0);
        expect(node.type.alignment).toBe(4);
    });

    test("Basic structure", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new Type(new Identifier("uint8")),
                    new StructureFieldAttributes(),
                    0,
                ),
                new StructureField(
                    "field2",
                    new Type(new Identifier("float64")),
                    new StructureFieldAttributes(),
                    0,
                ),
            ],
            new Map(),
            false,
        );
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(node.type.fields[0].name, PrimitiveType.u8, 0, 0),
            field(node.type.fields[1].name, PrimitiveType.f64, 0, 8),
        ]);

        expect(node.type.size).toBe(PrimitiveType.f64.size * 2);
        expect(node.type.alignment).toBe(PrimitiveType.f64.alignment);
    });

    test("Structure 'StaticVariableSizedArray' fields", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new ArrayType(
                        new Identifier("uint8"),
                        new IntExpression(10),
                    ),
                    new StructureFieldAttributes(),
                    0,
                ),
            ],
            new Map(),
            false,
        );
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new StaticVariableSizedArray(PrimitiveType.u8, 10),
                0,
                0,
            ),
        ]);

        expect(node.type.size).toBe(16);
        expect(node.type.alignment).toBe(4);
    });

    test("Structure 'StaticFixedSizedArray' fields", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new ArrayType(
                        new Identifier("uint8"),
                        new IntExpression(10),
                    ),
                    attrs(false, ["no_length_field"]),
                    0,
                ),
            ],
            new Map(),
            false,
        );
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new StaticFixedSizedArray(PrimitiveType.u8, 10),
                0,
                0,
            ),
        ]);

        expect(node.type.size).toBe(12);
        expect(node.type.alignment).toBe(4);
    });

    test("Structure 'DynamicVariableSizedArray' fields", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new ArrayType(
                        new Identifier("uint8"),
                        new IntExpression(10),
                    ),
                    attrs(false, ["dynamic_alloc"]),
                    0,
                ),
            ],
            new Map(),
            false,
        );
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new DynamicVariableSizedArray(PrimitiveType.u8, 10),
                0,
                0,
            ),
        ]);

        expect(node.type.size).toBe(PrimitiveType.u32.size * 2);
        expect(node.type.alignment).toBe(4);
    });

    test("Structure 'DynamicPackedArray' fields", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new ArrayType(
                        new Identifier("uint8"),
                        new IntExpression(10),
                    ),
                    attrs(false, ["dynamic_packed"]),
                    0,
                ),
            ],
            new Map(),
            false,
        );
        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new DynamicPackedArray(PrimitiveType.u8, 10),
                0,
                0,
            ),
        ]);

        expect(node.type.size).toBe(4);
        expect(node.type.alignment).toBe(4);
    });

    test("Structure constants", () => {
        const arrayLength = 10;

        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new ArrayType(
                        new Identifier("uint8"),
                        new IdentifierExpression(
                            new NamespacedIdentifier("STRUCT", "c1"),
                        ),
                    ),
                    new StructureFieldAttributes(),
                    0,
                ),
            ],
            new Map([
                [
                    "c1",
                    new StructureConstant(
                        "c1",
                        new Type(new Identifier("int32")),
                        new IntExpression(arrayLength),
                        0,
                        // @ts-ignore
                        undefined,
                    ),
                ],
            ]),
            false,
        );

        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new StaticVariableSizedArray(PrimitiveType.u8, arrayLength),
                0,
                0,
            ),
        ]);
    });

    test("Versioned structure", () => {
        const c = ctx();
        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field1",
                    new Type(new Identifier("uint8")),
                    new StructureFieldAttributes(),
                    0,
                ),
                new StructureField(
                    "field2",
                    new Type(new Identifier("uint16")),
                    new StructureFieldAttributes(),
                    1,
                ),
                new StructureField(
                    "field3",
                    new Type(new Identifier("float32")),
                    new StructureFieldAttributes(),
                    2,
                ),
            ],
            new Map(),
            true,
        );

        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type).toBeInstanceOf(VersionedStructureType);

        expect(node.type.size).toBe(PrimitiveType.u32.size * 2);
        expect(node.type.alignment).toBe(4);

        const vType = /** @type {VersionedStructureType} */ (node.type);
        expect(vType.versions).toStrictEqual(
            new Map([
                [
                    0,
                    new StructureNode(
                        struct.name,
                        `${struct.name}_version0`,
                        [field("field1", PrimitiveType.u8, 0, 0)],
                        false,
                    ),
                ],
                [
                    1,
                    new StructureNode(
                        struct.name,
                        `${struct.name}_version1`,
                        [
                            field("field1", PrimitiveType.u8, 0, 0),
                            field("field2", PrimitiveType.u16, 1, 0),
                        ],
                        false,
                    ),
                ],
                [
                    2,
                    new StructureNode(
                        struct.name,
                        `${struct.name}_version2`,
                        [
                            field("field1", PrimitiveType.u8, 0, 0),
                            field("field2", PrimitiveType.u16, 1, 0),
                            field("field3", PrimitiveType.f32, 2, 0),
                        ],
                        false,
                    ),
                ],
            ]),
        );
    });

    test("Structure 'SameVersionArray' fields", () => {
        const c = ctx();

        const elemTypeName = "ELEM";

        const elemTypeDef = new StructureDefinition(
            elemTypeName,
            [
                new StructureField(
                    "elem_field1",
                    new Type(new Identifier("uint32")),
                    new StructureFieldAttributes(),
                    1,
                ),

                new StructureField(
                    "elem_field2",
                    new Type(new Identifier("uint32")),
                    new StructureFieldAttributes(),
                    2,
                ),
            ],
            new Map(),
            true,
        );

        const elemType = /** @type {StructureNode} */ (
            analyzeDefinition(elemTypeDef, c)
        );

        const struct = new StructureDefinition(
            "STRUCT",
            [
                new StructureField(
                    "field",
                    new ArrayType(
                        new Identifier(elemTypeName),
                        new IntExpression(10),
                    ),
                    attrs(true, []),
                    0,
                ),
            ],
            new Map(),
            false,
        );

        const node = /** @type {StructureNode} */ (
            analyzeDefinition(struct, c)
        );

        expect(node).toBeInstanceOf(StructureNode);

        expect(node.type.size).toBe(PrimitiveType.u32.size * 4);
        expect(node.type.alignment).toBe(PrimitiveType.u32.alignment);

        expect(node.type.fields).toStrictEqual([
            field(
                node.type.fields[0].name,
                new SameVersionArray(elemType.type, 10),
                0,
                0,
            ),
        ]);
    });

    test("Basic enumeration", () => {
        const c = ctx();

        const def = new EnumerationDefinition(
            "ENUM",
            new Map([
                ["A", 1],
                ["B", 2],
            ]),
            "uint32",
        );

        const node = /** @type {EnumerationNode} */ (analyzeDefinition(def, c));

        expect(node).toBeInstanceOf(EnumerationNode);

        expect(node.underlyingType).toBe(PrimitiveType.u32);

        const t = /** @type {EnumerationType} */ (node.type);

        expect(t).toBeInstanceOf(EnumerationType);

        expect(t.size).toBe(PrimitiveType.u32.size);
        expect(t.alignment).toBe(PrimitiveType.u32.alignment);

        expect(t.variants).toStrictEqual([
            new EnumerationVariant("A", 1),
            new EnumerationVariant("B", 2),
        ]);
    });

    test("Enumeration underlying type selection", () => {
        const c = ctx();

        let def = new EnumerationDefinition(
            "ENUM",
            new Map([["A", 1]]),
            undefined,
        );

        let node = /** @type {EnumerationNode} */ (analyzeDefinition(def, c));
        expect(node.underlyingType).toBe(PrimitiveType.u8);

        def = new EnumerationDefinition(
            "ENUM",
            new Map([["A", 256]]),
            undefined,
        );

        node = /** @type {EnumerationNode} */ (analyzeDefinition(def, c));
        expect(node.underlyingType).toBe(PrimitiveType.u16);

        def = new EnumerationDefinition(
            "ENUM",
            new Map([["A", 100_000]]),
            undefined,
        );

        node = /** @type {EnumerationNode} */ (analyzeDefinition(def, c));
        expect(node.underlyingType).toBe(PrimitiveType.u32);
    });

    test("Typedef", () => {
        const c = ctx();

        const def = new TypedefDefinition(
            "INTEGER",
            new Type(new Identifier("uint32")),
        );

        const typedef = /** @type {TypedefNode} */ (analyzeDefinition(def, c));

        expect(typedef).toBeInstanceOf(TypedefNode);

        expect(typedef.type).toStrictEqual(typedef.underlyingType);
    });

    test("Constants", () => {
        const c = ctx();

        const consts = [
            new ConstantDefinition(
                "C1",
                new Type(new Identifier("uint32")),
                new IntExpression(1),
            ),
            new ConstantDefinition(
                "C2",
                new Type(new Identifier("uint32")),
                new IntExpression(2),
            ),
            new ConstantDefinition(
                "C3",
                new Type(new Identifier("uint32")),
                new BinaryOpExpression(
                    binaryOp.add,
                    new IdentifierExpression(new Identifier("C1")),
                    new IdentifierExpression(new Identifier("C2")),
                ),
            ),
        ];

        const cs = consts.map(
            (constant) =>
                /** @type {ConstantNode} */ (analyzeDefinition(constant, c)),
        );

        expect(cs.map((c) => c.name)).toStrictEqual(["C1", "C2", "C3"]);
        expect(cs.map((c) => c.value)).toStrictEqual([1, 2, 3]);
    });

    test("Namespaces", () => {
        const c = ctx();

        const nName = "NS";
        const tName = "TD";

        const def = new NamespaceDefinition(
            nName,
            new Map([
                [
                    tName,
                    new TypedefDefinition(
                        tName,
                        new Type(new Identifier("boolean")),
                    ),
                ],
            ]),
        );

        const ns = /** @type {NamespaceNode} */ (analyzeDefinition(def, c));

        expect(ns.name).toBe(nName);

        expect(ns.getType(tName)).toStrictEqual(
            new TypedefNode(nName, tName, PrimitiveType.bool),
        );
    });

    test("Extension points", () => {
        const c = ctx();

        const def = new ExtensionPointDefinition("EXT", 0, [
            new ExtensionPointField(
                "one",
                new Type(new Identifier("uint32")),
                1,
            ),
            new ExtensionPointField(
                "two",
                new Type(new Identifier("uint8")),
                2,
            ),
        ]);

        const ext = /** @type {ExtensionPointNode} */ (
            analyzeDefinition(def, c)
        );

        expect(ext).toBeInstanceOf(ExtensionPointNode);

        expect(ext.defaultDescriminator).toBe(0);

        expect(ext.type.size).toBe(PrimitiveType.u32.size * 2);
        expect(ext.type.alignment).toBe(PrimitiveType.u32.alignment);

        expect(ext.type.variants).toStrictEqual([
            new ExtensionPointVariant("one", PrimitiveType.u32, 1),
            new ExtensionPointVariant("two", PrimitiveType.u8, 2),
        ]);
    });

    test("Protocols", () => {
        const c = ctx();

        const def = new ProtocolDefinition(
            "PROT",
            new Map([
                ["f1", new ProtocolField("f1", new Identifier("uint32"), "1")],
                ["f2", new ProtocolField("f2", new Identifier("float64"), "2")],
            ]),
        );

        const prot = /** @type {ProtocolNode} */ (analyzeDefinition(def, c));

        expect(prot).toBeInstanceOf(ProtocolNode);

        expect(prot.type.size).toBe(16);
        expect(prot.type.alignment).toBe(PrimitiveType.f64.alignment);

        expect(prot.type.messages).toStrictEqual([
            new ProtocolMessage("f1", "1", PrimitiveType.u32),
            new ProtocolMessage("f2", "2", PrimitiveType.f64),
        ]);
    });

    // TODO: add more tests to check for correct size and alignment calculations
    test("Embedded protocols", () => {
        const c = ctx();

        const def = new EmbeddedProtocolDefinition("Proto", "Proto", false, false, false);

        const proto = /** @type {EmbeddedProtocolNode} */ (analyzeDefinition(def, c));

        expect(proto).toBeInstanceOf(EmbeddedProtocolNode);

        expect(proto.type.minMessageSize).toBe(1);
        expect(proto.type.maxMessageSize).toBe(64);

        expect(proto.type.size).toBe(64);
        expect(proto.type.alignment).toBe(1);
    });
});

/**
 * @param {string} name
 * @param {S_Type} type
 * @param {number} version
 * @param {number} offset
 * @returns {S_StructureField}
 */
function field(name, type, version, offset) {
    const f = new S_StructureField(name, type, version);
    f.offset = offset;
    return f;
}

/**
 * @param {boolean} svfae
 * @param {string[]} string
 * @returns {StructureFieldAttributes}
 */
function attrs(svfae, string) {
    const attrs = new StructureFieldAttributes();
    attrs.sameVersionForAllElements = svfae;
    for (const s of string) {
        attrs.string.add(s);
    }

    return attrs;
}
