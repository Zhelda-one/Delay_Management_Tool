#include "lower_toml.hpp"
#include "lower.hpp"
#include "util.hpp"

static ComputeOperator parse_compute_operator(HeliosStringView op_string) {
    if (HeliosStringViewEqualCStr(op_string, "=")) return ComputeOperator::EQ;
    if (HeliosStringViewEqualCStr(op_string, "!=")) return ComputeOperator::NEQ;
    if (HeliosStringViewEqualCStr(op_string, "id")) return ComputeOperator::ID;

    dief("string '" HELIOS_SV_FMT "' is not recognized as a valid compute operator", HELIOS_SV_ARG(op_string));
}

static ComputeOperand parse_compute_operand(Allocator *allocator, StringView operand_str, LoweringContext *ctx) {
    OK_UNUSED(allocator);

    ComputeOperand operand;

    if (operand_str.count == 0) dief("value operands cannot be empty");

    S64 int_value;
    if (ok::is_digit(operand_str[0])) {
        HeliosStringView operand_sv = {(const U8 *)operand_str.data, operand_str.count};

        if (!HeliosParseS64DetectBase(operand_sv, &int_value)) dief("failed to parse '" OK_SV_FMT "' as a valid integer", OK_SV_ARG(operand_str));
        operand.type = ComputeOperandType::IMM;
        operand.u.imm = int_value;
        return operand;
    }

    if      (operand_str == "$self"_sv) operand.type = ComputeOperandType::SELF;
    else if (operand_str == "$fill"_sv) operand.type = ComputeOperandType::FILL;
    else {
        operand.type = ComputeOperandType::FIELD;
        operand.u.field = ctx->enqueue_field_reference(operand_str);
    }

    return operand;
}

static ComputeValue parse_compute_value(Allocator *allocator, GeTomlValue *value_spec_value, LoweringContext *ctx) {
    ComputeValue compute_value = {};

    if (value_spec_value->type == GeTomlValueType_String) {
        HeliosStringView value_sv = value_spec_value->s;
        if (value_sv.count == 0) dief("value attribute cannot be empty");

        StringView operand_str = {(const char *)value_sv.data, value_sv.count};

        compute_value.op = ComputeOperator::ID;
        compute_value.lhs = parse_compute_operand(allocator, operand_str, ctx);

        return compute_value;
    }

    if (value_spec_value->type != GeTomlValueType_Table)
        dief("expected value attribute to be either of type 'string' or 'table'");

    GeTomlTable *value_spec = value_spec_value->t;

    GeTomlValue *op_value = GeTomlTableFind(value_spec, "op");
    if (op_value == NULL) dief("an 'op' field is required in the compute value specification table");
    if (op_value->type != GeTomlValueType_String) dief("an 'op' field was expected to have type 'string'");

    HeliosStringView op_string = op_value->s;
    compute_value.op = parse_compute_operator(op_string);

    enum {
        REQ_LHS   = 1 << 0,
        REQ_RHS   = 1 << 1,
        REQ_VALUE = 1 << 2,
    };

    U8 required_mask = 0;

    switch (compute_value.op) {
    case ComputeOperator::EQ:
    case ComputeOperator::NEQ:
        required_mask = REQ_LHS | REQ_RHS;
        break;
    case ComputeOperator::ID:
        required_mask = REQ_VALUE;
        break;
    }

    if (required_mask & REQ_VALUE) {
        GeTomlValue *value = GeTomlTableFind(value_spec, "value");
        if (value == NULL) dief("a 'value' field is required for operator '" HELIOS_SV_FMT "'", HELIOS_SV_ARG(op_string));
        if (value->type != GeTomlValueType_String) dief("a 'value' field was expected to have type 'string'");

        StringView value_sv = {(const char *)value->s.data, value->s.count};
        compute_value.lhs = parse_compute_operand(allocator, value_sv, ctx);
    } else {
        if (required_mask != (REQ_LHS | REQ_RHS))
            OK_PANIC_FMT("invalid required compute value operands mask received: '%X'", required_mask);

        GeTomlValue *lhs_value = GeTomlTableFind(value_spec, "lhs");
        if (lhs_value == NULL) dief("a 'lhs' field is required for operator '" HELIOS_SV_FMT "'", HELIOS_SV_ARG(op_string));
        if (lhs_value->type != GeTomlValueType_String) dief("a 'lhs' field was expected to have type 'string'");

        StringView lhs_sv = {(const char *)lhs_value->s.data, lhs_value->s.count};
        compute_value.lhs = parse_compute_operand(allocator, lhs_sv, ctx);

        GeTomlValue *rhs_value = GeTomlTableFind(value_spec, "rhs");
        if (rhs_value == NULL) dief("a 'rhs' field is required for operator '" HELIOS_SV_FMT "'", HELIOS_SV_ARG(op_string));
        if (rhs_value->type != GeTomlValueType_String) dief("a 'rhs' field was expected to have type 'string'");

        StringView rhs_sv = {(const char *)rhs_value->s.data, rhs_value->s.count};
        compute_value.rhs = parse_compute_operand(allocator, rhs_sv, ctx);
    }

    return compute_value;
}

static DecoderParam parse_decoder_param_setter(Allocator *allocator, GeTomlTable *setter_spec, LoweringContext *ctx) {
    bool propagate = false;

    GeTomlValue *param_name_value = GeTomlTableFind(setter_spec, "param");
    if (param_name_value == nullptr) dief("'param' field is required for the 'set_decoder_param' spec");
    if (param_name_value->type != GeTomlValueType_String) dief("'param' field was expected to be of type 'string'");

    GeTomlValue *param_value_spec = GeTomlTableFind(setter_spec, "value");
    if (param_value_spec == nullptr) dief("'value' field is required for the 'set_decoder_value' spec");

    GeTomlValue *param_propagate = GeTomlTableFind(setter_spec, "propagate");
    if (param_propagate != nullptr) {
        if (param_propagate->type != GeTomlValueType_Bool) dief("'propagate' field was expected to have type 'bool'");
        propagate = param_propagate->b;
    }

    ComputeValue param_value = parse_compute_value(allocator, param_value_spec, ctx);

    StringView param_name = {(const char *)param_name_value->s.data, param_name_value->s.count};

    return DecoderParam {
        .name = param_name,
        .value = param_value,
        .propagate = propagate,
    };
}

EnsureCheck parse_ensure_check(HeliosStringView sv) {
    if (HeliosStringViewEqualCStr(sv, "zero"))
        return EnsureCheck::ZEROED;

    dief("unknown ensure check '" HELIOS_SV_FMT "'", HELIOS_SV_ARG(sv));
}

LinkedList<Structure> parse_structs_from_toml_table(ok::Allocator* allocator, GeTomlTable *table, LoweringContext *ctx) {
    TypeStorage type_storage{};

    for (; table != nullptr; table = table->next) {
        OK_ASSERT(table->key.data != nullptr);
        GeTomlValue spec_value = table->value;
        OK_ASSERT(spec_value.type == GeTomlValueType_Table);

        GeTomlTable *spec_table = spec_value.t;

        GeTomlValue *typedef_kind_value = GeTomlTableFind(spec_table, TYPEDEF_KEY_CSTR);
        OK_ASSERT(typedef_kind_value != nullptr);
        OK_ASSERT(typedef_kind_value->type == GeTomlValueType_String);

        HeliosStringView typedef_kind = typedef_kind_value->s;

        if (!HeliosStringViewEqualCStr(typedef_kind, "struct"))
            OK_PANIC_FMT("Unknown typedef kind: '" HELIOS_SV_FMT "'", HELIOS_SV_ARG(typedef_kind));

        auto struct_fields = List<Pair<StringView, RawFieldSpec>>::alloc(allocator);

        U32 total_bit_offset = 0;

        for (; spec_table != nullptr; spec_table = spec_table->next) {
            HeliosStringView field_name = spec_table->key;
            StringView field_name_sv = {(const char *)field_name.data, field_name.count};

            if (is_reserved_key(field_name_sv)) continue;

            OK_ASSERT(spec_table->value.type == GeTomlValueType_Table);
            GeTomlTable *field_spec_table = spec_table->value.t;

            if (GeTomlTableHas(field_spec_table, TYPEDEF_KEY_CSTR)) {
                println("WARNING: encountered a nested type, skipping for now");
                continue;
            }

            U32 field_offset = 0;

            GeTomlValue *field_offset_value = GeTomlTableFind(field_spec_table, "offset");
            if (field_offset_value == nullptr) {
                GeTomlValue *field_bit_offset_value = GeTomlTableFind(field_spec_table, "bit_offset");

                if (field_bit_offset_value == nullptr) field_offset = total_bit_offset;
                else {
                    OK_ASSERT(field_bit_offset_value->type == GeTomlValueType_Int);
                    field_offset = (U32)field_bit_offset_value->i;
                }
            } else {
                OK_ASSERT(field_offset_value->type == GeTomlValueType_Int);
                field_offset = (U32)field_offset_value->i * 8;
            }

            FieldFlags field_flags = 0;

            GeTomlValue *field_synthetic_flag_value = GeTomlTableFind(field_spec_table, "synthetic");
            if (field_synthetic_flag_value &&
                field_synthetic_flag_value->type == GeTomlValueType_Bool &&
                field_synthetic_flag_value->b) field_flags |= FIELD_SYNTHETIC;

            GeTomlValue *field_reserved_flag_value = GeTomlTableFind(field_spec_table, "reserved");
            if (field_reserved_flag_value &&
                field_reserved_flag_value->type == GeTomlValueType_Bool &&
                field_reserved_flag_value->b) field_flags |= FIELD_RESERVED;

            GeTomlValue *field_skip_flag_value = GeTomlTableFind(field_spec_table, "skip");
            if (field_skip_flag_value &&
                field_skip_flag_value->type == GeTomlValueType_Bool &&
                field_skip_flag_value->b) field_flags |= FIELD_SKIP;
            GeTomlValue *field_type_value = GeTomlTableFind(field_spec_table, "type");
            if (field_type_value == nullptr)
                dief("the 'type' field is required for each field");
            if (field_type_value->type != GeTomlValueType_String)
                dief("expected field 'type' to be of type 'string'");

            HeliosStringView field_type_sv = field_type_value->s;

            StringView field_type_str{(const char *)field_type_sv.data, field_type_sv.count};

            Optional<Type*> field_type_opt = type_storage.parse_type(field_type_str);
            if (!field_type_opt.has_value())
                dief("ERROR: could not parse '" OK_SV_FMT "' as a valid type of field '" OK_SV_FMT "'", OK_SV_ARG(field_type_str), OK_SV_ARG(field_name_sv));

            Type *field_type = field_type_opt.value;

            if (field_type->is_scalar())
                total_bit_offset = field_offset + field_type->size.in_bits();

            Optional<ComputeValue> field_value = {};
            Optional<DecoderParam> field_decoder_param = {};
            Optional<EnsureCheck> field_ensure = {};
            Optional<ComputeValue> field_length = {};
            Optional<StringView> field_follow = {};
            Optional<ComputeValue> field_optional = {};

            GeTomlValue *value_spec_value = GeTomlTableFind(field_spec_table, "value");
            if (field_flags & FIELD_SYNTHETIC) {
                if (value_spec_value == nullptr)
                    dief("a synthetic field is required to have a 'value' field");

                field_value = parse_compute_value(allocator, value_spec_value, ctx);
            }

            GeTomlValue *decoder_param_setter_spec_value = GeTomlTableFind(field_spec_table, "set_decoder_param");
            if (decoder_param_setter_spec_value) {
                if (decoder_param_setter_spec_value->type != GeTomlValueType_Table)
                    dief("expected field 'set_decoder_param' to be of type 'table'");

                GeTomlTable *decoder_param_setter_spec = decoder_param_setter_spec_value->t;
                field_decoder_param = parse_decoder_param_setter(allocator, decoder_param_setter_spec, ctx);
            }

            GeTomlValue *ensure_value = GeTomlTableFind(field_spec_table, "ensure");
            if (ensure_value != nullptr) {
                if (ensure_value->type != GeTomlValueType_String)
                    dief("expected field 'ensure' to be of type 'string'");

                field_ensure = parse_ensure_check(ensure_value->s);
            }

            GeTomlValue *follow_field = GeTomlTableFind(field_spec_table, "follow");
            if (follow_field != nullptr) {
                if (follow_field->type != GeTomlValueType_String)
                    dief("expected 'follow' attribute to be of type 'string'");

                StringView follow_sv = {(const char *)follow_field->s.data, follow_field->s.count};
                field_follow = follow_sv;
            }

            GeTomlValue *optional_spec = GeTomlTableFind(field_spec_table, "optional");
            if (optional_spec != nullptr) {
                field_optional = parse_compute_value(allocator, optional_spec, ctx);
            }

            if (field_type->is_array()) {
                GeTomlValue *field_length_value = GeTomlTableFind(field_spec_table, "length");
                if (field_length_value == nullptr)
                    dief("the 'length' attribute is required for a field with an array type");

                field_length = parse_compute_value(allocator, field_length_value, ctx);
            }

            RawFieldSpec field_spec = {
                .type = field_type,
                .offset = field_offset,
                .flags = field_flags,
                .value = field_value,
                .decoder_param = field_decoder_param,
                .ensure = field_ensure,
                .length = field_length,
                .follow = field_follow,
                .optional = field_optional,
            };

            struct_fields.push({field_name_sv, field_spec});
        }

        StringView spec_key = {(const char *)table->key.data, table->key.count};

        Structure struct_def = lower_struct_def(allocator, spec_key, struct_fields.slice());
        ctx->push_struct(struct_def);

        Structure *struct_def_pointer = &ctx->lowered_structs.tail->value;
        Type struct_type = Type::make_struct(struct_def_pointer);
        type_storage.add_type(spec_key, struct_type);
    }

    ctx->resolve_enqueued_field_references();

    return ctx->lowered_structs;
}
