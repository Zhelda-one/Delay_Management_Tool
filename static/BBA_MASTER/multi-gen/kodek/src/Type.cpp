#include "Type.hpp"

#define X(t, sz) Type t{.flags = Type::F_PRIMITIVE, .size = TypeSize{TypeSize::Kind::BIT, (sz)}};
    KODEK_ENUM_UNSIGNED_TYPES
#undef X

#define X(t, sz) Type t{.flags = Type::F_PRIMITIVE | Type::F_SIGNED, .size = TypeSize{TypeSize::Kind::BIT, (sz)}};
    KODEK_ENUM_SIGNED_TYPES
#undef X
