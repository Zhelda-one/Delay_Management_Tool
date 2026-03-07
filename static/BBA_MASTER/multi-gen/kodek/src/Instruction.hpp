#pragma once

#include <iostream>

#include "ok.hpp"
#include "Struct.hpp"

#define ENUM_INSTR_OPERANDS \
    X(VAR) \
    X(IMM) \
    X(COND) \
    X(LABEL) \
    X(STRING) \
    X(FIELD_REF) \
    X(CALL_ARGS) \
    X(DECODER)

struct Decoder;
struct InstructionOperandCond;
struct InstructionOperandCallArgs;

struct InstructionOperand {
    enum Type {
#define X(t) t,
ENUM_INSTR_OPERANDS
#undef X
    };

    static InstructionOperand make_imm(U64 value) {
        return InstructionOperand{ .type = IMM, .imm = value };
    }

    static InstructionOperand make_label(U64 *ip) {
        return InstructionOperand{ .type = LABEL, .label = ip };
    }

    static InstructionOperand make_var(ok::StringView name) {
        return InstructionOperand{ .type = VAR, .var = name };
    }

    static InstructionOperand make_string(ok::String value) {
        return InstructionOperand{ .type = STRING, .string = value };
    }

    static InstructionOperand make_field_ref(FieldReference *ref) {
        return InstructionOperand{ .type = FIELD_REF, .field_ref = ref };
    }

    static InstructionOperand make_cond(InstructionOperandCond *value) {
        return InstructionOperand{ .type = COND, .cond = value };
    }

    static InstructionOperand make_call_args(InstructionOperandCallArgs *args) {
        return InstructionOperand{ .type = CALL_ARGS, .call_args = args };
    }

    static InstructionOperand make_decoder(Decoder *value) {
        return InstructionOperand{ .type = DECODER, .decoder = value };
    }

    U64 ok_hash_value() const;

    Type type;

    union {
        U64 imm;
        U64 *label;
        ok::StringView var;
        ok::String string;
        FieldReference *field_ref;
        InstructionOperandCond *cond;
        InstructionOperandCallArgs *call_args;
        Decoder *decoder;
    };
};

bool operator ==(const InstructionOperand& lhs, const InstructionOperand& rhs);

void print(const InstructionOperand &);

struct InstructionOperandCond {
    enum class Type {
        GTE,
        EQ,
        NOT,
    };

    static InstructionOperandCond *alloc(ok::Allocator *a, Type type, InstructionOperand lhs, InstructionOperand rhs) {
        auto* ptr = a->alloc<InstructionOperandCond>();
        ptr->cond_type = type;
        ptr->lhs = lhs;
        ptr->rhs = rhs;
        return ptr;
    }

    Type cond_type;
    InstructionOperand lhs;
    InstructionOperand rhs;
};

struct InstructionOperandCallArgs {
    static InstructionOperandCallArgs *alloc(ok::Allocator *a,
                                             InstructionOperand input,
                                             InstructionOperand output,
                                             InstructionOperand decoder_params,
                                             ok::Slice<InstructionOperand> extra_args) {
        OK_ASSERT(input.type == InstructionOperand::VAR);
        OK_ASSERT(output.type == InstructionOperand::VAR);
        OK_ASSERT(decoder_params.type == InstructionOperand::VAR);

        InstructionOperandCallArgs *args = a->alloc<InstructionOperandCallArgs>();
        args->input = input;
        args->output = output;
        args->decoder_params = decoder_params;
        args->extra_args = extra_args;
        return args;
    }

    InstructionOperand input;
    InstructionOperand output;
    InstructionOperand decoder_params;
    ok::Slice<InstructionOperand> extra_args;
};

#define ENUM_LOAD_INSTRUCTIONS \
    X(LOAD8, 3) \
    X(LOAD16, 3) \
    X(LOAD32, 3) \
    X(LOAD64, 3)

#define ENUM_STORE_INSTRUCTIONS \
    X(STORE8, 3) \
    X(STORE16, 3) \
    X(STORE32, 3) \
    X(STORE64, 3)

#define ENUM_INSTRUCTIONS \
    ENUM_LOAD_INSTRUCTIONS \
    ENUM_STORE_INSTRUCTIONS \
    X(DECLARE, 1) \
    X(ADD, 2) \
    X(ADD_PTR, 2) \
    X(SUB, 2) \
    X(MUL, 2) \
    X(DIV, 2) \
    X(MOD, 2) \
    X(SHR, 2) \
    X(AND, 2) \
    X(BRANCH, 1) \
    X(COND_BRANCH, 2) \
    X(EQ, 3) \
    X(NEQ, 3) \
    X(TRAP, 1) \
    X(CAPTURE_FIELD, 2) \
    X(ALLOC_MEM, 2) \
    X(CALL, 2) \
    X(ARRAY_LENGTH, 2) \
    X(ALLOC_DECODER_PARAMS, 1) \
    X(JS_IF_END_STUB_PLEASE_NUKE_IT, 0)

struct Instruction {
    enum Type {
#define X(t, _) t,
ENUM_INSTRUCTIONS
#undef X
    };

    inline U8 args_count() const {
        switch (type) {
#define X(i, c) case i: return c;
ENUM_INSTRUCTIONS
#undef X
        }

        OK_UNREACHABLE();
    }

    Type type;
    InstructionOperand op1;
    InstructionOperand op2;
    InstructionOperand op3;
};

void print(const Instruction &);
