#include <iomanip>

#include "compile.hpp"

void print(const Decoder& block) {
    printf("Block %s:\n", block.name.cstr());

    UZ count = block.code.count;
    UZ maxl = 1;
    while (count /= 10) {
        maxl++;
    }

    for (UZ i = 0; i < block.code.count; ++i) {
        Instruction instruction = block.code[i];

        printf("\t<%*zu> ", (int)maxl, i);
        print(instruction);
        printf("\n");
    }
}

static Field gen_synthetic_field_for_type(Allocator *allocator, Type type) {
    Field f{};
    f.name = String::alloc(allocator, "synthetic");
    f.type = type;
    return f;
}

static List<InstructionOperand> resolve_extra_args(Allocator *allocator, Decoder *decoder, BBCompilerContext *ctx) {
    List<InstructionOperand> args = List<InstructionOperand>::alloc(allocator, decoder->captured_fields.count);

    for (UZ i = 0; i < decoder->captured_fields.count; ++i) {
        FieldReference *field_ref = decoder->captured_fields[i];
        OK_ASSERT(field_ref->structure == ctx->current_struct);

        InstructionOperand saved_field_var = InstructionOperand::make_var(field_ref->field->var_name.get());
        args.push(saved_field_var);
    }

    return args;
}

InstructionOperand compile_field_decoder(Allocator* a,
                                          Field *field,
                                          InstructionOperand offset,
                                          BBCompilerContext* ctx,
                                          StringView field_name) {
    Type *type = &field->type;

    InstructionOperand input_var = ctx->input_var();
    InstructionOperand output_var = ctx->output_var();

    if (type->is_primitive()) {
        U32 type_size = type->size.in_bits();

        InstructionOperand var = ctx->create_var(field_name);

        Instruction::Type load_type = select_load(type_size);
        ctx->load(load_type, var, input_var, offset);

        Instruction::Type store_type = select_store(type_size);
        InstructionOperand store_off = InstructionOperand::make_imm(0);
        ctx->store(store_type, output_var, var, store_off);
        ctx->annotate_field(field_name);

        return var;
    }

    if (type->is_array()) {
        Type *elem_type = type->element_type;

        InstructionOperand count_var = ctx->random_var("count"_sv, 0u);
        InstructionOperand array_length = ctx->compile_compute_value(field, field->length.get());

        InstructionOperand allocation_size = InstructionOperand::make_imm(0);

        InstructionOperand array_output_var = ctx->random_var("array_output"_sv);
        ctx->alloc_mem(array_output_var, allocation_size);
        ctx->annotate_alloc_array();

        InstructionOperand temp_offset_input_var = ctx->random_var("array_input"_sv, input_var);
        ctx->add_ptr(temp_offset_input_var, offset);

        input_var = temp_offset_input_var;

        U64 *start_label = ctx->label();
        ctx->link(start_label);

        U64 *end_label = ctx->label();

        // FIXME: use a recursive call in case we encountered a nested array or whatever
        if (elem_type->is_primitive()) {
            InstructionOperandCond *end_cond = InstructionOperandCond::alloc(a,
                                                                             InstructionOperandCond::Type::GTE,
                                                                             count_var,
                                                                             array_length);
            ctx->cond_branch(end_label, end_cond);
            ctx->annotate_loop();

            U32 elem_size_bits = elem_type->size.in_bits();
            U32 elem_size_bytes = elem_type->size.in_bytes();

            Instruction::Type load_instruction_type = select_load(elem_size_bits);
            Instruction::Type store_instruction_type = select_store(elem_size_bits);

            InstructionOperand element_offset_var = ctx->random_var("elem_off"_sv, (U32)elem_size_bytes);
            ctx->mul(element_offset_var, count_var);

            InstructionOperand element_var = ctx->random_var("elem"_sv);
            ctx->load(load_instruction_type, element_var, input_var, element_offset_var);
            ctx->store(store_instruction_type, array_output_var, element_var, count_var);

            ctx->add(count_var, 1);
        } else if (elem_type->is_struct()) {
            InstructionOperand total_offset_var = ctx->random_var("total_offset"_sv, 0);

            InstructionOperandCond *end_cond = InstructionOperandCond::alloc(a,
                                                                             InstructionOperandCond::Type::GTE,
                                                                             total_offset_var,
                                                                             array_length);
            ctx->cond_branch(end_label, end_cond);
            ctx->annotate_loop();

            InstructionOperand element_var = ctx->random_var("elem"_sv);

            // FIXME(oleh): This is very wrong, but we can't use the `size_of` method before we annotate
            // the structure decoder call, so we will use the fact that our only backend right now
            // is JavaScript and we don't actually need to know the size of any allocation
            // at compile time.
            InstructionOperand alloc_size = InstructionOperand::make_imm(0);
            ctx->alloc_mem(element_var, alloc_size);

            Structure *element_structure = elem_type->structure;
            Decoder *element_decoder = nullptr;

            for (UZ i = 0; i < ctx->structure_decoders.count; ++i) {
                Pair<Structure *, Decoder *> pair = ctx->structure_decoders[i];
                if (pair.a == element_structure) {
                    element_decoder = pair.b;
                    break;
                }
            }

            OK_ASSERT(element_decoder != nullptr);

            InstructionOperand element_decoder_input = ctx->random_var("decoder_input"_sv, input_var);
            ctx->add_ptr(element_decoder_input, total_offset_var);

            InstructionOperand decoder_params_var = ctx->random_var("decoder_params"_sv);
            ctx->alloc_decoder_params(decoder_params_var);

            List<InstructionOperand> extra_args = resolve_extra_args(a, element_decoder, ctx);
            ctx->call(element_decoder, element_decoder_input, element_var, decoder_params_var, extra_args.slice());
            ctx->annotate_struct(element_structure);

            ctx->store(ctx->ptr_store_type, array_output_var, element_var, count_var);

            Field synthetic_element_field = gen_synthetic_field_for_type(a, *elem_type);
            InstructionOperand element_size = ctx->size_of(&synthetic_element_field);

            if (element_size.type == InstructionOperand::IMM) {
                OK_ASSERT((element_size.imm & 7) == 0);
                element_size.imm /= 8;
            } else {
                OK_ASSERT(element_size.type == InstructionOperand::VAR);
                ctx->div(element_size, 8);
            }

            ctx->add(count_var, 1);
            ctx->add(total_offset_var, element_size);
        } else {
            // ???
            OK_TODO();
        }

        ctx->branch(start_label);

        ctx->link(end_label);

        ctx->store(ctx->ptr_store_type, output_var, array_output_var, offset);
        ctx->annotate_field(field_name);

        // FIXME(?): not sure if this is right, brain ooga booga
        return offset;
    }

    // bitfield
    UZ bitlen = type->size.in_bits();

    OK_ASSERT(bitlen % 8 != 0);

    U8 smallest_octet_size;
    if      (bitlen < 8)  smallest_octet_size = 8;
    else if (bitlen < 16) smallest_octet_size = 16;
    else if (bitlen < 32) smallest_octet_size = 32;
    else if (bitlen < 64) smallest_octet_size = 64;
    else OK_PANIC_FMT("got a bitfield of size %zu, which is too big", bitlen);

    InstructionOperand byte_offset_var = ctx->random_var("byte_offset"_sv, offset);
    ctx->align_down(byte_offset_var, 8);
    ctx->div(byte_offset_var, 8);

    InstructionOperand bits_offset_var = ctx->random_var("bits_offset"_sv, offset);
    ctx->mod(bits_offset_var, 8);

    U64 bit_mask = 0;
    for (U8 i = 0; i < bitlen; ++i) {
        bit_mask |= (U64)1 << i;
    }

    bit_mask <<= smallest_octet_size - bitlen;

    InstructionOperand bit_mask_var = ctx->random_var("bit_mask"_sv, bit_mask);
    ctx->shr(bit_mask_var, bits_offset_var);

    InstructionOperand temp_var = ctx->random_var("temp"_sv);

    Instruction::Type load_type = select_load(smallest_octet_size);
    ctx->load(load_type, temp_var, input_var, byte_offset_var);
    ctx->bit_and(temp_var, bit_mask_var);

    Instruction::Type store_type = select_store(smallest_octet_size);
    ctx->store(store_type, output_var, temp_var, offset);
    ctx->annotate_field(field_name);

    return temp_var;
}

static void compile_ensure_check_zero(InstructionOperand value, BBCompilerContext *ctx) {
    InstructionOperand var = ctx->random_var("zero_check"_sv, value);
    ctx->bit_and(var, ~0llu);

    InstructionOperand zero_imm = InstructionOperand::make_imm(0);

    InstructionOperandCond *cond = InstructionOperandCond::alloc(ctx->arena,
                                                                 InstructionOperandCond::Type::EQ,
                                                                 var,
                                                                 zero_imm);
    U64 *succ_label = ctx->label();

    String trap_message = String::format(ctx->arena,
                                         "zero check failed: expected '" OK_SV_FMT "' to be zero",
                                         OK_SV_ARG(var.var));
    ctx->cond_branch(succ_label, cond);
    ctx->trap(trap_message);
    ctx->link(succ_label);
}

Decoder compile_decoder(Allocator *a, Structure *structure, BBCompilerContext* ctx) {
    InstructionOperand output_var = ctx->output_var();

    ctx->current_struct = structure;

    Decoder *decoder = ctx->start_decoder();

    for (UZ i = 0; i < structure->fields.count; i++) {
        Field* field = structure->fields.items[i];

        InstructionOperand field_offset = ctx->compile_offset(field);

        if (field->flags & FIELD_SKIP) {
            if (!field->ensure.has_value()) continue;

            if (field->type.is_array()) dief("ensure checks are not supported for arrays");

            InstructionOperand field_value = compile_field_decoder(a,
                                                                   field,
                                                                   field_offset,
                                                                   ctx,
                                                                   field->name.view());

            EnsureCheck ensure_check = field->ensure.value;
            switch (ensure_check) {
            case EnsureCheck::ZEROED: {
                compile_ensure_check_zero(field_value, ctx);
                break;
            }
            }
        }

        U64 *optional_label = nullptr;

        if (field->optional.has_value()) {
            optional_label = ctx->label();
            InstructionOperand optional_value = ctx->compile_compute_value(field, field->optional.value);
            InstructionOperandCond *cond = InstructionOperandCond::alloc(a,
                                                                         InstructionOperandCond::Type::NOT,
                                                                         optional_value,
                                                                         {});
            ctx->cond_branch(optional_label, cond);
        }

        if (field->value.has_value()) {
            OK_ASSERT(field->flags & FIELD_SYNTHETIC);
            OK_ASSERT(field->type.is_scalar());

            U32 type_size = field->type.size.in_bits();

            InstructionOperand compiled_value = ctx->compile_compute_value(field, field->value.value);
            Instruction::Type store_type = select_store(type_size);
            ctx->store(store_type, output_var, compiled_value, field_offset);
            ctx->annotate_field(field->name.view());

            if (field->flags & FIELD_SAVE) {
                InstructionOperand saved_var = ctx->random_var("saved"_sv, compiled_value);
                field->var_name = saved_var.var;
            }
        } else {
            InstructionOperand output_location = compile_field_decoder(a,
                                                                       field,
                                                                       field_offset,
                                                                       ctx,
                                                                       field->name.view());

            if ((field->flags & FIELD_SAVE) != 0 || field->dependencies.count != 0) {
                String var_name = String::format(a, "%s_dependency", field->name.cstr());
                InstructionOperand field_var = ctx->create_var(var_name.view(), output_location);
                field->var_name = field_var.var;
            }

            // if (field->type.is_array()) {
            //     Type* elem_type = (Type*)field->type.size_or_payload;

            //     InstructionOperandVar* output_var = ctx->output_var();

            //     Instruction::Type store_type = select_store(elem_type->size_or_payload);
            //     ctx->store(store_type, output_var, output_location, field_offset);
            //     ctx->annotate_field(field->name.view());
            // }
        }

        if (field->decoder_param.has_value()) {
            DecoderParam decoder_param = field->decoder_param.value;

            InstructionOperand decoder_param_value = ctx->compile_compute_value(field, decoder_param.value);
            DecoderParamName decoder_param_name = parse_decoder_param_name(decoder_param.name);
            ctx->set_decoder_param(decoder_param_name, decoder_param_value);

            if (decoder_param.propagate) {
                ctx->propagated_decoder_params.push({decoder_param_name, decoder_param_value});
            }
        }

        if (field->optional.has_value()) {
            ctx->link(optional_label);
            Instruction *instr = ctx->alloc_instruction();
            instr->type = Instruction::JS_IF_END_STUB_PLEASE_NUKE_IT;
        }
    }

    ctx->finish_decoder(decoder);

    return *decoder;
}

String js_stringify_value(Allocator *allocator, InstructionOperand op) {
    switch (op.type) {
    case InstructionOperand::VAR: {
        return op.var.to_string(allocator);
    }
    case InstructionOperand::IMM: {
        return ok::to_string(allocator, op.imm);
    }
    case InstructionOperand::STRING: {
        return String::format(allocator, "\"%s\"", op.string.cstr());
    }
    case InstructionOperand::LABEL:     OK_PANIC("Cannot stringify a label operand to a JS value");
    case InstructionOperand::COND:      OK_PANIC("Cannot stringify a cond operand to na JS value");
    case InstructionOperand::FIELD_REF: OK_PANIC("Cannot stringify a field ref operand to a JS value");
    case InstructionOperand::DECODER:   OK_PANIC("Cannot stringify a decoder operand to a JS value");
    case InstructionOperand::CALL_ARGS: OK_PANIC("Cannot stringify a call args operand to a JS value");
    }

    OK_UNREACHABLE();
}

String js_stringify_cond(Allocator *allocator, InstructionOperandCond *cond) {
    String lhs = js_stringify_value(allocator, cond->lhs);

    switch (cond->cond_type) {
    case InstructionOperandCond::Type::GTE: {
        String rhs = js_stringify_value(ok::temp_allocator, cond->rhs);
        return String::format(allocator, "%s >= %s", lhs.cstr(), rhs.cstr());
    }
    case InstructionOperandCond::Type::EQ: {
        String rhs = js_stringify_value(ok::temp_allocator, cond->rhs);
        return String::format(allocator, "%s === %s", lhs.cstr(), rhs.cstr());
    }
    case InstructionOperandCond::Type::NOT: {
        return String::format(allocator, "!%s", lhs.cstr());
    }
    }

    OK_UNREACHABLE();
}

#define JS_MAKE_DEFAULT_PARAMS_PROC_NAME "makeDefaultDecoder"

static String js_gen_header(Allocator *allocator, BBCompilerContext *ctx) {
    InstructionOperand decoder_var = ctx->decoder_var;
    OK_UNUSED(decoder_var);
    OK_UNUSED(ctx);

    // TODO: Find a way to build this format string without it being a pain in the ass and stop
    // using hard-coded '$decoder' name for the decoder variable.
    return String::format(allocator, "function " JS_MAKE_DEFAULT_PARAMS_PROC_NAME R"fns(() {
    return {
        little_endian: false,
        total_offset: 0,
        input_length: 0,
    };
}

function LOAD8(buf, off, $decoder) {
     $decoder.total_offset += 1;
     return buf[off];
}

function LOAD16(buf, off, $decoder) {
     $decoder.total_offset += 2;
     if ($decoder.little_endian) {
         return buf[off] | buf[off + 1] << 8;
     } else {
         return buf[off] << 8 | buf[off + 1];
     }
}

function LOAD32(buf, off, $decoder) {
     $decoder.total_offset += 4;
     if ($decoder.little_endian) {
         return (buf[off] | buf[off + 1] << 8 | buf[off + 2] << 16 | buf[off + 3] << 24) >>> 0;
     } else {
         return (buf[off] << 24 | buf[off + 1] << 16 | buf[off + 2] << 8 | buf[off + 3]) >>> 0;
     }
}

function LOAD64(buf, off, $decoder) {
     $decoder.total_offset += 8;
     if ($decoder.little_endian) {
         return buf[off] | buf[off + 1] << 8 | buf[off + 2] << 16 | buf[off + 3] << 24 | buf[off + 4] << 32 | buf[off + 5] << 40 | buf[off + 6] << 48 | buf[off + 7] << 56;
     } else {
         return buf[off] << 56 | buf[off + 1] << 48 | buf[off + 2] << 40 | buf[off + 3] << 32 | buf[off + 4] << 24 | buf[off + 5] << 16 | buf[off + 6] << 8 | buf[off + 7];
     }
}
)fns");
}

static String js_gen_intro(Allocator* allocator, Decoder* decoder, BBCompilerContext *ctx) {
    String buf = String::alloc(allocator);

    InstructionOperand decoder_input_var = ctx->input_var();
    InstructionOperand decoder_output_var = ctx->output_var();

    buf.format_append("function %s(" OK_SV_FMT ", " OK_SV_FMT ", " OK_SV_FMT,
                      decoder->name.cstr(),
                      OK_SV_ARG(decoder_input_var.var),
                      OK_SV_ARG(decoder_output_var.var),
                      OK_SV_ARG(ctx->decoder_var.var));

    for (UZ i = 0; i < decoder->captured_fields.count; ++i) {
        FieldReference *field_reference = decoder->captured_fields[i];
        buf.format_append(", %s_%s",
                          field_reference->structure->name.cstr(),
                          field_reference->field->name.cstr());
    }

    buf.append(") {\n"_sv);

    return buf;
}

static void preprocess_decoder_for_js(Decoder* decoder) {
    for (UZ i = 0; i < decoder->code.count; ++i) {
        Instruction* instr = &decoder->code[i];

        switch (instr->type) {
        case Instruction::LOAD8:
        case Instruction::LOAD16:
        case Instruction::LOAD32:
        case Instruction::LOAD64:
        case Instruction::STORE8:
        case Instruction::STORE16:
        case Instruction::STORE32:
        case Instruction::STORE64: {
            if (instr->op3.type != InstructionOperand::IMM) break;

            if (instr->op3.imm % 8 == 0) instr->op3.imm /= 8;

            break;
        }
        case Instruction::ADD_PTR: {
            if (instr->op2.type != InstructionOperand::IMM) break;

            if (instr->op2.imm % 8 == 0) instr->op2.imm /= 8;

            break;
        }
        default: break;
        }
    }
}

constexpr StringView js_decoder_outro = "}"_sv;

String compile_to_js(Allocator* arena, Decoder* decoder, BBCompilerContext* ctx, bool with_header) {
    preprocess_decoder_for_js(decoder);

    InstructionOperand decoder_input_var = ctx->input_var();
    InstructionOperand decoder_output_var = ctx->output_var();

    String result;
    if (with_header) {
        result = js_gen_header(arena, ctx);
        String intro = js_gen_intro(ok::temp_allocator, decoder, ctx);
        result.append(intro);
    }
    else result = js_gen_intro(arena, decoder, ctx);

    int indentation = 4;

#define JS_FMT(fmt, ...) do { \
    result.format_append("%*c" fmt, indentation, ' ', __VA_ARGS__); \
    } while(0)

#define JS_APPEND(str)  do { \
    result.format_append("%*c" str, indentation, ' '); \
    } while(0)

    for (size_t i = 0; i < decoder->code.count; ++i) {
        Instruction instr = decoder->code[i];
        switch (instr.type) {
        case Instruction::DECLARE: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            if (var_name == decoder_input_var.var || var_name == decoder_output_var.var) continue;

            String value = js_stringify_value(temp_allocator, instr.op2);
            JS_FMT("let " OK_SV_FMT " = %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::ADD: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " += %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::ADD_PTR: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " = " OK_SV_FMT ".slice(%s);\n", OK_SV_ARG(var_name), OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::MUL: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " *= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::SUB: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " -= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::MOD: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " %%= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::DIV: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " /= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::AND: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " &= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::SHR: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String value = js_stringify_value(temp_allocator, instr.op2);

            JS_FMT(OK_SV_FMT " >>= %s;\n", OK_SV_ARG(var_name), value.cstr());

            break;
        }
        case Instruction::BRANCH: {
            // FIXME: this is 99% wrong, but works as a temporary hack
            indentation -= 4;

            JS_APPEND("}\n");

            break;
        }
        // NOTE(oleh): I hate myself for this, but we cannot properly generate something like `if`s
        // in JS, until the Basic Block compilation is implemented and we can represent the control
        // flow correctly in the IR.
        case Instruction::JS_IF_END_STUB_PLEASE_NUKE_IT: {
            indentation -= 4;

            JS_APPEND("}\n");

            break;
        }
        case Instruction::COND_BRANCH: {
            // FIXME: this is 99% wrong also, but works as a temporary hack
            OK_ASSERT(instr.op2.type == InstructionOperand::COND);

            InstructionOperandCond *cond = instr.op2.cond;

            String cond_string = js_stringify_cond(temp_allocator, cond);

            Optional<CompilerAnnotation> annotation = decoder->annotations.get(i);
            if (annotation && annotation.value.type == CompilerAnnotation::LOOP) {
                JS_FMT("while (!(%s)) {\n", cond_string.cstr());
            } else {
                JS_FMT("if (!(%s)) {\n", cond_string.cstr());
            }

            indentation += 4;

            break;
        }
        case Instruction::EQ: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String op2 = js_stringify_value(temp_allocator, instr.op2);
            String op3 = js_stringify_value(temp_allocator, instr.op3);

            JS_FMT(OK_SV_FMT " = %s === %s;\n", OK_SV_ARG(var_name), op2.cstr(), op3.cstr());

            break;
        }
        case Instruction::NEQ: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            String op2 = js_stringify_value(temp_allocator, instr.op2);
            String op3 = js_stringify_value(temp_allocator, instr.op3);

            JS_FMT(OK_SV_FMT " = %s !== %s;\n", OK_SV_ARG(var_name), op2.cstr(), op3.cstr());

            break;
        }
        case Instruction::TRAP: {
            OK_ASSERT(instr.op1.type == InstructionOperand::STRING);

            String trap_message = instr.op1.string;

            JS_FMT("throw new Error(\"%s\");\n", trap_message.cstr());

            break;
        }
        case Instruction::CAPTURE_FIELD: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            OK_ASSERT(instr.op2.type == InstructionOperand::FIELD_REF);

            StringView var_name = instr.op1.var;
            FieldReference *field_ref = instr.op2.field_ref;

            JS_FMT(OK_SV_FMT " = %s_%s;\n",
                   OK_SV_ARG(var_name),
                   field_ref->structure->name.cstr(),
                   field_ref->field->name.cstr());

            break;
        }
        case Instruction::ALLOC_MEM: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            StringView var_name = instr.op1.var;

            Optional<CompilerAnnotation> annotation = decoder->annotations.get(i);
            if (annotation && annotation.value.type == CompilerAnnotation::ALLOC_ARRAY) {
                String capacity = js_stringify_value(ok::temp_allocator, instr.op2);
                JS_FMT(OK_SV_FMT " = new Array(%s);\n", OK_SV_ARG(var_name), capacity.cstr());
            } else {
                JS_FMT(OK_SV_FMT " = {};\n", OK_SV_ARG(var_name));
            }

            break;
        }
        case Instruction::CALL: {
            OK_ASSERT(instr.op1.type == InstructionOperand::DECODER);
            OK_ASSERT(instr.op2.type == InstructionOperand::CALL_ARGS);

            Decoder *decoder_to_call = instr.op1.decoder;
            InstructionOperandCallArgs *call_args = instr.op2.call_args;

            JS_FMT("%s(" OK_SV_FMT ", " OK_SV_FMT ", " OK_SV_FMT,
                   decoder_to_call->name.cstr(),
                   OK_SV_ARG(call_args->input.var),
                   OK_SV_ARG(call_args->output.var),
                   OK_SV_ARG(call_args->decoder_params.var));

            for (UZ argument_index = 0; argument_index < call_args->extra_args.count; ++argument_index) {
                InstructionOperand arg = call_args->extra_args[argument_index];
                String js_arg = js_stringify_value(ok::temp_allocator, arg);
                result.format_append(", %s", js_arg.cstr());
            }

            result.append(");\n"_sv);

            break;
        }
        case Instruction::ARRAY_LENGTH: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);
            OK_ASSERT(instr.op2.type == InstructionOperand::VAR);

            JS_FMT(OK_SV_FMT " = " OK_SV_FMT ".length;\n",
                   OK_SV_ARG(instr.op1.var),
                   OK_SV_ARG(instr.op2.var));

            break;
        }
        case Instruction::ALLOC_DECODER_PARAMS: {
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR);

            JS_FMT(OK_SV_FMT " = " JS_MAKE_DEFAULT_PARAMS_PROC_NAME "();\n", instr.op1.var);

            break;
        }
#define X(t, _) case Instruction::t: {                                  \
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR); \
            StringView dst_var_name = instr.op1.var; \
            OK_ASSERT(instr.op2.type == InstructionOperand::VAR); \
            StringView src_var_name = instr.op2.var; \
            String offset = js_stringify_value(temp_allocator, instr.op3);         \
            Optional<CompilerAnnotation> annotation = decoder->annotations.get(i); \
            if (annotation.has_value() && annotation.value.type == CompilerAnnotation::FIELD) { \
            CompilerAnnotationField field_annotation = annotation.value.field; \
            JS_FMT(OK_SV_FMT " = " OK_SV_FMT ".%s;\n", OK_SV_ARG(dst_var_name), OK_SV_ARG(src_var_name), field_annotation.name.cstr()); \
            } else { \
            JS_FMT(OK_SV_FMT " = %s(" OK_SV_FMT ", %s, " OK_SV_FMT ");\n", OK_SV_ARG(dst_var_name), #t, OK_SV_ARG(src_var_name), offset.cstr(), OK_SV_ARG(ctx->decoder_var.var)); \
            } \
            break; \
            }
ENUM_LOAD_INSTRUCTIONS
#undef X

#define X(t, _) case Instruction::t: {                                  \
            OK_ASSERT(instr.op1.type == InstructionOperand::VAR); \
            StringView dst_var_name = instr.op1.var; \
            String input_value = js_stringify_value(temp_allocator, instr.op2); \
            String offset = js_stringify_value(temp_allocator, instr.op3);         \
            Optional<CompilerAnnotation> annotation = decoder->annotations.get(i); \
            if (annotation.has_value() && annotation.value.type == CompilerAnnotation::FIELD) { \
            CompilerAnnotationField field_annotation = annotation.value.field; \
            JS_FMT(OK_SV_FMT ".%s = %s;\n", OK_SV_ARG(dst_var_name), field_annotation.name.cstr(), input_value.cstr()); \
            } else { \
            JS_FMT(OK_SV_FMT "[%s] = %s;\n", OK_SV_ARG(dst_var_name), offset.cstr(), input_value.cstr()); \
            } \
            break; \
            }
ENUM_STORE_INSTRUCTIONS
#undef X
        }

        // ok::println("------------------------------");
        // ok::println(result);
        // ok::println("------------------------------");
    }

#undef JS_FMT
#undef JS_APPEND

    result.append(js_decoder_outro);

    return result;
}

// FIXME(oleh): I hate this. This is so stupid. Need this currently because of the forward
// declaration of the 'Decoder' type.
ok::StringView decoder_name(const Decoder *decoder) {
    return decoder->name.view();
}
