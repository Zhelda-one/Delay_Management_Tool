#pragma once

#include "ok.hpp"

struct TypeSize {
    enum class Kind : U32 {
        BIT = 0,
        BYTE = 1,
    };

    inline U32 in_bits() const {
        U32 mult = static_cast<U32>(kind) * 7 + 1;
        return value * mult;
    }

    inline U32 in_bytes() const {
        U32 divisor = (1 - static_cast<U32>(kind)) * 7 + 1;
        OK_ASSERT(value % divisor == 0);
        return value / divisor;
    }

    Kind kind;
    U32 value;
};

static_assert(sizeof(TypeSize) == sizeof(void *));

struct Structure;

struct Type {
    enum Flags {
        F_SIGNED    = 1 << 0,
        F_PRIMITIVE = 1 << 1,
        F_ARRAY     = 1 << 2,
        F_STRUCT    = 1 << 3,
    };

    static Type make_array(Type* elem) {
        return {.flags = F_ARRAY, .element_type = elem};
    }

    static Type make_struct(Structure *s) {
        return {.flags = F_STRUCT, .structure = s};
    }

    inline bool is_array() const {
        return flags & F_ARRAY;
    }

    inline bool is_primitive() const {
        return flags & F_PRIMITIVE;
    }

    inline bool is_signed() const {
        OK_ASSERT(is_primitive());
        return flags & F_SIGNED;
    }

    inline bool is_struct() const {
        return flags & F_STRUCT;
    }

    inline bool is_scalar() const {
        return !(is_struct() || is_array());
    }

    int flags;
    union {
        TypeSize size;
        Structure *structure;
        Type *element_type;
    };
};

static_assert(sizeof(Type) == sizeof(void *) * 2);

#define KODEK_ENUM_SIGNED_TYPES \
    X(s8, 8) \
    X(s16, 16) \
    X(s32, 32) \
    X(s64, 64)

#define KODEK_ENUM_UNSIGNED_TYPES \
    X(u8, 8) \
    X(u16, 16) \
    X(u32, 32) \
    X(u64, 64) \
    X(b8, 8)

#define KODEK_ENUM_PRIMITIVE_TYPES \
    KODEK_ENUM_UNSIGNED_TYPES \
    KODEK_ENUM_SIGNED_TYPES

#define X(t, _s) extern Type t;
    KODEK_ENUM_PRIMITIVE_TYPES
#undef X
