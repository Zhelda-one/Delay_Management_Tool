#include "util.hpp"
#include "lower.hpp"

Field* lower_struct_field(Allocator* allocator, StringView struct_name, Slice<Field *> fields, StringView name, RawFieldSpec* spec) {
    // TODO: Check if the type is array, return an array field, and probably do something for
    // fields with dependent offsets.
    Field *f;
    if (!spec->follow.has_value()) {
        f = Field::plain(allocator, name, *spec->type, spec->offset);
    } else {
        Field *base = nullptr;

        for (UZ i = 0; i < fields.count; ++i) {
            if (fields[i]->name == spec->follow.value) {
                base = fields[i];
                break;
            }
        }

        if (base == nullptr)
            dief("struct '" OK_SV_FMT "' does not contain field '" OK_SV_FMT "' required by the 'follow' attribute",
                 OK_SV_ARG(struct_name),
                 OK_SV_ARG(spec->follow.value));

        f = Field::computed(allocator, name, *spec->type, base, 0);
    }

    f->flags = spec->flags;
    f->value = spec->value;
    f->decoder_param = spec->decoder_param;
    f->ensure = spec->ensure;
    f->length = spec->length;
    f->optional = spec->optional;
    return f;
}

Structure lower_struct_def(Allocator* allocator, StringView name, Slice<Pair<StringView, RawFieldSpec>> fields_spec) {
    auto fields = ok::List<Field*>::alloc(allocator);

    for (size_t i = 0; i < fields_spec.count; ++i) {
        RawFieldSpec field_spec = fields_spec[i].b;

        StringView field_name = fields_spec[i].a;
        Field* field = lower_struct_field(allocator, name, fields.slice(), field_name, &field_spec);

        // if ((field_spec.flags & (FIELD_RESERVED | FIELD_SKIP)) == 0)
        fields.push(field);
    }

    String struct_name = name.to_string(allocator);

    return Structure{struct_name, fields};
}

static void check_field_reference(Field *f, ComputeValue *value, ComputeOperand operand) {
    switch (operand.type) {
    case ComputeOperandType::FIELD: {
        Field *target_field = operand.u.field->field;
        if (target_field == f) dief("a field cannot refer to itself inside the compute value, please use '$self' instead");
        target_field->flags |= FIELD_SAVE;
        break;
    }
    case ComputeOperandType::SELF: {
        if (value == &f->value.value) dief("cannot to refer to 'self' inside the 'value' clause of a field");
        OK_ASSERT(value == &f->decoder_param.value.value);

        f->flags |= FIELD_SAVE;
        break;
    }
    case ComputeOperandType::IMM:
    case ComputeOperandType::FILL:
        break;
    }
}

static void check_field_references(Structure *s, Field *f, ComputeValue *value) {
    OK_UNUSED(s);

    switch (value->op) {
    case ComputeOperator::EQ:
    case ComputeOperator::NEQ: {
        check_field_reference(f, value, value->lhs);
        check_field_reference(f, value, value->rhs);
        break;
    }
    case ComputeOperator::ID: {
        check_field_reference(f, value, value->lhs);
        break;
    }
    }
}

// FIXME: Find a way to enforce that we handle *all* possible fields containing compute values
// at compile time. Maybe some enum class and a union?
void check_lowered_struct(Structure *s) {
    for (UZ i = 0; i < s->fields.count; ++i) {
        Field *f = s->fields[i];
        if (f->value.has_value())         check_field_references(s, f, &f->value.value);
        if (f->decoder_param.has_value()) check_field_references(s, f, &f->decoder_param.value.value);
        if (f->length.has_value())        check_field_references(s, f, &f->length.value);
        if (f->optional.has_value())      check_field_references(s, f, &f->optional.value);
        else continue;
    }
}
