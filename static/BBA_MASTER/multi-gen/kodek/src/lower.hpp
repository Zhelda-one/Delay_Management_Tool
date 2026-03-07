#pragma once

#include "Type.hpp"
#include "Struct.hpp"
#include "util.hpp"

using namespace ok::literals;

#define TYPEDEF_KEY_CSTR ("typedef")
#define TYPEDEF_KEY (StringView{TYPEDEF_KEY_CSTR})

static inline bool is_reserved_key(StringView key) {
    return key == TYPEDEF_KEY;
}

static inline bool is_reserved_key(const char* key) {
    StringView key_sv{key};
    return is_reserved_key(key_sv);
}

struct TypeStorage {
    TypeStorage() {
        type_ids = ok::Table<StringView, U32>::alloc(&arena);
    }

    Type* create_type(Type t) {
        auto* type = arena.alloc<Type>();
        *type = t;

        if (arena.head != last_arena_head) {
            last_arena_head = arena.head;
            ++region_id_counter;
        }

        return type;
    }

    Type* get_by_id(U32 id) {
        U16 region_id = id >> 16;
        U16 offset = id & 0xFFFF;

        ArenaAllocator::Region* reg = arena.head;
        OK_ASSERT(reg);

        for (; region_id > 1; --region_id) {
            OK_ASSERT(reg->next);
            reg = reg->next;
        }

        OK_ASSERT(offset < reg->size);

        void* ptr = (void*)((U8*)reg->data + offset);
        return (Type*)ptr;
    }

    ok::Optional<Type*> get(StringView input) {
        Optional<U32> type_id = type_ids.get(input);
        if (!type_id.has_value()) return {};

        return get_by_id(type_id.value);
    }

    void add_type(StringView name, Type type) {
        Type *type_in_storage = create_type(type);
        U32 type_id = id_for(type_in_storage);
        type_ids.put(name, type_id);
    }

    // NOTE: The generated id will be valid only if this method is called immediately after
    // getting the type pointer from the `create_type` method call.
    U32 id_for(Type* type) {
        uintptr_t off = (uintptr_t)type - (uintptr_t)last_arena_head->data;
        OK_ASSERT(off <= UINT16_MAX);
        return ((U32)region_id_counter << 16) | (U32)off;
    }

    ok::Optional<Type*> parse_type(ok::StringView input) {
        if (input.count == 0) return {};

        ok::Optional<Type*> existing = get(input);
        if (existing.has_value()) return existing;

#define X(t, _sz) if (#t ""_sv == input) return &t;
KODEK_ENUM_PRIMITIVE_TYPES
#undef X

        if (input[0] == '[') {
            if (input[input.count - 1] != ']') return {};

            StringView elem_view = input.view(1, input.count - 1);
            Optional<Type*> elem_type = parse_type(elem_view);
            if (!elem_type.has_value()) return {};

            Type array_type_input = Type::make_array(elem_type.value);

            Type* array_type = create_type(array_type_input);
            U32 type_id = id_for(array_type);

            type_ids.put(input, type_id);

            return array_type;
        }

        int flags = 0;
        if (input[0] == 's') flags |= Type::F_SIGNED;
        else if (input[0] != 'u') return {};

        S64 bit_width;
        if (!ok::parse_int64(input.view(1), &bit_width)) return {};
        if (bit_width <= 0) return {};

        OK_ASSERT((U64)bit_width <= UINT32_MAX);

        TypeSize input_type_size{TypeSize::Kind::BIT, (U32)bit_width};

        Type input_type{.flags = flags, .size = input_type_size};

        Type* type = create_type(input_type);
        U32 type_id = id_for(type);
        type_ids.put(input, type_id);

        return type;
    }

    U16 region_id_counter = 0;
    ArenaAllocator arena{};
    ArenaAllocator::Region* last_arena_head{};
    ok::Table<StringView, U32> type_ids{};
};

struct RawFieldSpec {
    Type* type;
    U32 offset;
    FieldFlags flags;
    Optional<ComputeValue> value;
    Optional<DecoderParam> decoder_param;
    Optional<EnsureCheck> ensure;
    Optional<ComputeValue> length;
    Optional<StringView> follow;
    Optional<ComputeValue> optional;
};

struct LoweringContext {
    LoweringContext(Allocator *allocator) : allocator{allocator} {
        lowered_structs = ok::LinkedList<Structure>::alloc(allocator);
        raw_field_references = ok::List<StringView>::alloc(allocator);
        field_references = ok::LinkedList<FieldReference>::alloc(allocator);

        field_references_counts = ok::List<U16>::alloc(allocator);
        field_references_counts.push(0);
    }

    FieldReference *enqueue_field_reference(StringView raw_reference) {
        OK_ASSERT(field_references_counts.count != 0);

        field_references_counts[field_references_counts.count - 1] += 1;
        raw_field_references.push(raw_reference);
        field_references.append({});

        return &field_references.tail->value;
    }

    void push_struct(Structure s) {
        lowered_structs.append(s);
        field_references_counts.push(0);
    }

    void resolve_field_reference(StringView raw, FieldReference *reference, Structure *s) {
        UZ separator_index = (UZ)-1;
        for (UZ i = 0; i < raw.count; ++i) {
            if (raw.data[i] == '.') {
                separator_index = i;
                break;
            }
        }

        StringView target_struct_name{};
        StringView target_field_name{};
        Structure *target_struct = nullptr;

        if (separator_index == (UZ)-1) {
            target_struct_name = s->name.view();
            target_field_name = raw;
            target_struct = s;
        } else {
            target_struct_name = raw.view(0, separator_index);
            target_field_name = raw.view(separator_index + 1);

            for (ok::LinkedList<Structure>::Node *current_struct = lowered_structs.head;
                 current_struct != nullptr;
                 current_struct = current_struct->next) {
                if (current_struct->value.name == target_struct_name) {
                    target_struct = &current_struct->value;
                    break;
                }
            }

            if (target_struct == nullptr)
                dief("cannot find requested structure '" OK_SV_FMT "'", OK_SV_ARG(target_struct_name));
        }

        Field *referenced_field = nullptr;

        for (UZ i = 0; i < target_struct->fields.count; ++i) {
            Field *f = target_struct->fields[i];
            if (f->name == target_field_name) {
                referenced_field = f;
                break;
            }
        }

        if (referenced_field == nullptr)
            dief("cannot find requested field '" OK_SV_FMT "' in struct '" OK_SV_FMT "'",
                 OK_SV_ARG(target_field_name),
                 OK_SV_ARG(target_struct_name));

        reference->field = referenced_field;
        reference->structure = target_struct;
    }

    void resolve_enqueued_field_references() {
        ok::LinkedList<FieldReference>::Node *current_field_reference_node = field_references.head;
        UZ field_index = 0;

        UZ i = 0;
        for (ok::LinkedList<Structure>::Node *current_struct_node = lowered_structs.head;
             current_struct_node != nullptr;
             current_struct_node = current_struct_node->next) {
            U16 fields_count = field_references_counts[i];
            UZ next_field_index = field_index + fields_count;

            for (; field_index < next_field_index; ++field_index) {
                StringView raw_field_reference = raw_field_references[field_index];
                FieldReference *field_reference = &current_field_reference_node->value;
                resolve_field_reference(raw_field_reference, field_reference, &current_struct_node->value);

                current_field_reference_node = current_field_reference_node->next;
            }

            ++i;
        }
    }

    Allocator *allocator;
    ok::LinkedList<Structure> lowered_structs;
    ok::List<U16> field_references_counts;
    ok::List<StringView> raw_field_references;
    ok::LinkedList<FieldReference> field_references;
};

Field* lower_struct_field(ok::Allocator* allocator, StringView struct_name, ok::Slice<Field *> fields, ok::StringView name, RawFieldSpec* spec);

Structure lower_struct_def(ok::Allocator* allocator, ok::StringView name, ok::Slice<ok::Pair<ok::StringView, RawFieldSpec>> fields_spec);

void check_lowered_struct(Structure *s);
