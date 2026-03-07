#pragma once

#include "ok.hpp"
#include "Type.hpp"

using namespace ok;

struct FieldOffset {
    enum class Type {
        PLAIN,
        COMPUTED,
    };

    Type type;
};

struct FieldOffsetPlain : public FieldOffset {
    static FieldOffsetPlain* alloc(ok::Allocator* a, U32 offset) {
        auto* res = a->alloc<FieldOffsetPlain>();
        res->off = offset;
        res->type = FieldOffset::Type::PLAIN;
        return res;
    }

    U32 off;
};

struct Field;

struct FieldOffsetComputed : public FieldOffset {
    static FieldOffsetComputed* alloc(ok::Allocator* a, Field* base, U32 offset) {
        auto* res = a->alloc<FieldOffsetComputed>();
        res->base = base;
        res->off = offset;
        res->type = FieldOffset::Type::COMPUTED;
        return res;
    }

    Field* base;
    U32 off;
};

enum class ComputeOperator {
    EQ,
    NEQ,
    ID,
};

enum class ComputeOperandType {
    FIELD,
    IMM,
    SELF,
    FILL,
};

struct FieldReference {
    Structure *structure;
    Field *field;
};

struct ComputeOperand {
    ComputeOperandType type;

    union {
        U64 imm;
        FieldReference *field;
    } u;
};

struct ComputeValue {
    ComputeOperator op;
    ComputeOperand lhs;
    ComputeOperand rhs;
};

using FieldFlags = U16;

enum {
    FIELD_SYNTHETIC = 1 << 0,
    FIELD_SKIP      = 1 << 1,
    FIELD_RESERVED  = 1 << 2,
    FIELD_SAVE      = 1 << 3,
};

struct DecoderParam {
    StringView name;
    ComputeValue value;
    bool propagate;
};

enum class EnsureCheck {
    ZEROED,
};

struct Field {
    String name;
    Type type;
    U32 fulfilled_deps_count;
    FieldOffset *offset;
    List<FieldOffset *> dependencies;
    Optional<StringView> var_name;
    Optional<StringView> offset_var_name;
    FieldFlags flags;
    Optional<ComputeValue> value;
    Optional<DecoderParam> decoder_param;
    Optional<EnsureCheck> ensure;
    Optional<ComputeValue> length;
    Optional<ComputeValue> optional;

    static Field* plain(ok::Allocator* a, StringView name, Type type, U32 offset) {
        auto* f = a->alloc<Field>();
        f->name = name.to_string(a);
        f->type = type;
        f->offset = FieldOffsetPlain::alloc(a, offset);
        return f;
    }

    static Field* computed(ok::Allocator* a, StringView name, Type type, Field* base, U32 offset) {
        auto* f = a->alloc<Field>();
        f->name = name.to_string(a);
        f->type = type;
        f->offset = FieldOffsetComputed::alloc(a, base, offset);

        if (base->dependencies.items == nullptr) {
            base->dependencies = List<FieldOffset*>::alloc(a);
        }

        base->dependencies.push(f->offset);
        return f;
    }
};

struct Structure {
    String name;
    List<Field*> fields;
};
