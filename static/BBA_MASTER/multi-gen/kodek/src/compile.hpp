#pragma once

#include <string>
#include <cstdint>
#include <format>
#include <functional>

#include "Struct.hpp"
#include "Instruction.hpp"
#include "util.hpp"

#include "ok.hpp"

using namespace ok;

// struct RegisterAllocator {
//     inline InstructionOperand::Type ephemeral() {
//         if (mask == UINT16_MAX) {
//             die("Ran out of registers, whoops!");
//         }

//         uint16_t head = 0;
//         while (mask & (0x8000 >> head)) {
//             head = (head + 1) % (GPR_MAX + 1);
//         }

//         taint |= 0x8000 >> head;

//         return static_cast<InstructionOperand::Type>(head);
//     }

//     inline InstructionOperand::Type permanent() {
//         if (mask == UINT16_MAX) {
//             die("Ran out of registers, whoops!");
//         }

//         uint16_t head = 0;
//         while (mask & (0x8000 >> head)) {
//             head = (head + 1) % (GPR_MAX + 1);
//         }

//         taint |= 0x8000 >> head;
//         mask |= 0x8000 >> head;
//         auto res = static_cast<InstructionOperand::Type>(head);
//         return res;
//     }

//     inline void free(InstructionOperand::Type reg) {
//         auto i = static_cast<uint16_t>(reg);
//         mask &= ~(0x8000 >> i);
//     }

//     uint16_t mask;
//     uint16_t taint;
// };

struct CompilerAnnotationField {
    static CompilerAnnotationField make(String name) {
        CompilerAnnotationField annotation;
        annotation.name = name;
        return annotation;
    }

    String name;
};

struct CompilerAnnotation {
    enum Type {
        FIELD,
        STRUCT,
        ALLOC_ARRAY,
        LOOP,
    };

    static CompilerAnnotation make_field(CompilerAnnotationField field) {
        CompilerAnnotation annotation{};
        annotation.type = FIELD;
        annotation.field = field;
        return annotation;
    }

    static CompilerAnnotation make_struct(Structure *s) {
        CompilerAnnotation annotation{};
        annotation.type = STRUCT;
        annotation.structure = s;
        return annotation;
    }

    static CompilerAnnotation make_alloc_array() {
        CompilerAnnotation annotation{};
        annotation.type = ALLOC_ARRAY;
        return annotation;
    }

    static CompilerAnnotation make_loop() {
        CompilerAnnotation annotation{};
        annotation.type = LOOP;
        return annotation;
    }

    Type type;
    union {
        CompilerAnnotationField field;
        Structure *structure;
    };
};

struct Decoder {
    String name;
    List<Instruction> code;
    Table<UZ, CompilerAnnotation> annotations;
    List<FieldReference *> captured_fields;
};

std::ostream& operator <<(std::ostream& out, const Decoder& block);

enum class DecoderParamName {
    LITTLE_ENDIAN,
    TOTAL_OFFSET,
    INPUT_LENGTH,
};

static inline DecoderParamName parse_decoder_param_name(StringView sv) {
    if (sv == "little_endian"_sv) return DecoderParamName::LITTLE_ENDIAN;
    if (sv == "total_offset"_sv)  return DecoderParamName::TOTAL_OFFSET;
    if (sv == "input_length"_sv)  return DecoderParamName::INPUT_LENGTH;

    dief("unsupported decoder param '" OK_SV_FMT "'", OK_SV_ARG(sv));
}

static inline U64 offset_of_decoder_param(DecoderParamName param_name) {
    return static_cast<U64>(param_name) * sizeof(U64);
}

static inline StringView param_name_to_string(DecoderParamName param_name) {
    switch (param_name) {
    case DecoderParamName::LITTLE_ENDIAN: return "little_endian"_sv;
    case DecoderParamName::TOTAL_OFFSET:  return "total_offset"_sv;
    case DecoderParamName::INPUT_LENGTH:  return "input_length"_sv;
    }

    OK_UNREACHABLE();
}

enum class BBCompilationTarget {
    JS,
};

static inline Instruction::Type select_load(UZ size) {
    switch (size) {
    case 8:  return Instruction::Type::LOAD8;
    case 16: return Instruction::Type::LOAD16;
    case 32: return Instruction::Type::LOAD32;
    case 64: return Instruction::Type::LOAD64;
    default: OK_PANIC_FMT("could not select a load instruction for a size %zu", size);
    }
}

static inline Instruction::Type select_store(UZ size) {
    switch (size) {
    case 8:  return Instruction::Type::STORE8;
    case 16: return Instruction::Type::STORE16;
    case 32: return Instruction::Type::STORE32;
    case 64: return Instruction::Type::STORE64;
    default: OK_PANIC_FMT("could not select a store instruction for a size %zu", size);
    }
}

struct BBCompilerContext {
    static BBCompilerContext alloc(Allocator* a, BBCompilationTarget target) {
        BBCompilerContext ctx{};
        ctx.instructions = List<Instruction>::alloc(a);
        ctx.annotations = Table<UZ, CompilerAnnotation>::alloc(a);
        ctx.captured_fields = List<FieldReference*>::alloc(a);
        ctx.structure_decoders = List<Pair<Structure *, Decoder *>>::alloc(a);
        ctx.propagated_decoder_params = List<Pair<DecoderParamName, InstructionOperand>>::alloc(a);
        ctx.arena = a;

        ctx._input_var = ctx.create_var("$input"_sv);
        ctx._output_var = ctx.create_var("$output"_sv);
        ctx.decoder_var = InstructionOperand::make_var("$decoder"_sv);

        switch (target) {
        case BBCompilationTarget::JS:
            ctx.ptr_load_type = Instruction::Type::LOAD64;
            ctx.ptr_store_type = Instruction::Type::STORE64;
            break;
        }

        return ctx;
    }

    inline Instruction* alloc_instruction() {
        instructions.push(Instruction{});
        return &instructions.items[instructions.count - 1];
    }

    inline void annotate(CompilerAnnotation annotation) {
        OK_ASSERT(instructions.count != 0);
        annotations.put(instructions.count - 1, annotation);
    }

    inline void annotate_field(StringView field_name_sv) {
        String field_name = field_name_sv.to_string(arena);
        CompilerAnnotationField field_annotation = CompilerAnnotationField::make(field_name);
        CompilerAnnotation annotation = CompilerAnnotation::make_field(field_annotation);
        annotate(annotation);
    }

    inline void annotate_struct(Structure *s) {
        CompilerAnnotation annotation = CompilerAnnotation::make_struct(s);
        annotate(annotation);
    }

    inline void annotate_alloc_array() {
        CompilerAnnotation annotation = CompilerAnnotation::make_alloc_array();
        annotate(annotation);
    }

    inline void annotate_loop() {
        CompilerAnnotation annotation = CompilerAnnotation::make_loop();
        annotate(annotation);
    }

    inline InstructionOperand create_var(StringView name, InstructionOperand initial_value) {
        InstructionOperand var = InstructionOperand::make_var(name);

        Instruction* declare_instr = alloc_instruction();
        declare_instr->type = Instruction::DECLARE;
        declare_instr->op1 = var;
        declare_instr->op2 = initial_value;

        return var;
    }

    inline InstructionOperand create_var(StringView name, U64 initial_value_imm) {
        InstructionOperand initial_value = InstructionOperand::make_imm(initial_value_imm);
        return create_var(name, initial_value);
    }

    inline InstructionOperand create_var(StringView name) {
        return create_var(name, 0);
    }

    inline InstructionOperand random_var(StringView prefix, U64 initial_value_imm) {
        InstructionOperand initial_value = InstructionOperand::make_imm(initial_value_imm);
        return random_var(prefix, initial_value);
    }

    inline InstructionOperand random_var(StringView prefix, InstructionOperand initial_value) {
        static UZ var_counter = 0;

        String var_name = String::format(arena, OK_SV_FMT "_%ld", OK_SV_ARG(prefix), var_counter++);
        return create_var(var_name.view(), initial_value);
    }

    inline InstructionOperand random_var(StringView prefix) {
        return random_var(prefix, 0);
    }

    inline InstructionOperand random_var() {
        U16 seed_upper_bits = (U16)rand();
        U16 seed_lower_bits = (U16)rand();

        U32 seed = ((U32)seed_upper_bits << 16) | (U32)seed_lower_bits;

        constexpr UZ random_seed_bit_length = 32;
        constexpr UZ random_seed_chunk_size = 4;
        constexpr UZ random_var_length = random_seed_bit_length / random_seed_chunk_size;

        String random_var_name = String::alloc(arena, random_var_length);

        for (U8 i = 0; i < random_var_length; ++i) {
            U8 mask_shift_count = i * random_seed_chunk_size;
            U8 char_bits = (seed & (0x0F << mask_shift_count)) >> mask_shift_count;
            char random_char = 'a' + char_bits;
            random_var_name.push(random_char);
        }

        return create_var(random_var_name.view());
    }

    inline InstructionOperand input_var() {
        return _input_var;
    }

    inline InstructionOperand output_var() {
        return _output_var;
    }

    inline void reset() {
        instructions.count = 0;
        captured_fields.count = 0;
        propagated_decoder_params.count = 0;
        annotations.clear();
        current_struct = nullptr;
    }

    inline Decoder *start_decoder() {
        Decoder *decoder = arena->alloc<Decoder>();
        decoder->name = String::format(arena, "decode_%s", current_struct->name.cstr());
        decoder->captured_fields = captured_fields.copy(arena);

        InstructionOperand total_offset = InstructionOperand::make_imm(0);
        set_decoder_param(DecoderParamName::TOTAL_OFFSET, total_offset);

        InstructionOperand input_length_var = random_var("input_length"_sv);
        array_length(input_length_var, _input_var);
        set_decoder_param(DecoderParamName::INPUT_LENGTH, input_length_var);

        return decoder;
    }

    inline void finish_decoder(Decoder *decoder) {
        decoder->code = instructions.copy(arena);
        decoder->annotations = annotations.copy(arena);
        decoder->captured_fields = captured_fields.copy(arena);

        structure_decoders.push({current_struct, decoder});

        reset();
    }

    inline InstructionOperand compile_offset(Field* field) {
        if (field->offset->type == FieldOffset::Type::PLAIN) {
            FieldOffsetPlain *plain_field_offset = static_cast<FieldOffsetPlain*>(field->offset);
            return InstructionOperand::make_imm(plain_field_offset->off);
        }

        FieldOffsetComputed *computed = static_cast<FieldOffsetComputed*>(field->offset);
        Field* base = computed->base;

        String field_offset_var_name = String::format(arena, "%s_offset", field->name.cstr());
        InstructionOperand offset_var = create_var(field_offset_var_name.view());
        field->offset_var_name = offset_var.var;

        if (base->offset->type == FieldOffset::Type::PLAIN) {
            FieldOffsetPlain *plain_field_offset = static_cast<FieldOffsetPlain *>(field->offset);
            InstructionOperand offset = InstructionOperand::make_imm(plain_field_offset->off);

            add(offset_var, offset);
        } else {
            InstructionOperand base_size = size_of(base);
            add(offset_var, base_size);
            add(offset_var, offset_var);
        }

        return offset_var;
    }

    inline InstructionOperand compile_value_operand(Field *f, ComputeOperand operand) {
        switch (operand.type) {
        case ComputeOperandType::SELF: {
            return InstructionOperand::make_var(f->var_name.get());
        }
        case ComputeOperandType::IMM: {
            InstructionOperand var = random_var("imm"_sv, operand.u.imm);
            return var;
        }
        case ComputeOperandType::FIELD: {
            Structure *target_struct = operand.u.field->structure;
            if (target_struct != current_struct) {
                InstructionOperand capture_var = random_var("capture"_sv);
                capture_field(capture_var, operand.u.field);
                return capture_var;
            }

            Field *target_field = operand.u.field->field;
            return InstructionOperand::make_var(target_field->var_name.get());
        }
        case ComputeOperandType::FILL: {
            InstructionOperand total_offset_var = random_var("total_offset"_sv);
            get_decoder_param(total_offset_var, DecoderParamName::TOTAL_OFFSET);

            InstructionOperand input_length_var = random_var("input_length"_sv);
            get_decoder_param(input_length_var, DecoderParamName::INPUT_LENGTH);

            sub(input_length_var, total_offset_var);
            return input_length_var;
        }
        }

        OK_UNREACHABLE();
    }

    inline InstructionOperand compile_compute_value(Field *f, ComputeValue value) {
        switch (value.op) {
        case ComputeOperator::EQ: {
            InstructionOperand var = random_var("compute"_sv);
            InstructionOperand lhs = compile_value_operand(f, value.lhs);
            InstructionOperand rhs = compile_value_operand(f, value.rhs);
            eq(var, lhs, rhs);
            return var;
        }
        case ComputeOperator::NEQ: {
            InstructionOperand var = random_var("compute"_sv);
            InstructionOperand lhs = compile_value_operand(f, value.lhs);
            InstructionOperand rhs = compile_value_operand(f, value.rhs);
            neq(var, lhs, rhs);
            return var;
        }
        case ComputeOperator::ID: {
            InstructionOperand compiled_value = compile_value_operand(f, value.lhs);
            return random_var("id"_sv, compiled_value);
        }
        }

        OK_UNREACHABLE();
    }

    // Following methods directly map to IR instructions.
    inline void add(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::ADD;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void add(InstructionOperand dest, uint32_t x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return add(dest, x);
    }

    inline void add_ptr(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::ADD_PTR;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void add_ptr(InstructionOperand dest, U64 x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return add_ptr(dest, x);
    }

    inline void mul(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::MUL;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void mul(InstructionOperand dest, uint32_t x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return mul(dest, x);
    }

    inline void div(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::DIV;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void div(InstructionOperand dest, U64 x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return div(dest, x);
    }

    inline void mod(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::MOD;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void mod(InstructionOperand dest, U64 x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return mod(dest, x);
    }

    inline void sub(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::SUB;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void sub(InstructionOperand dest, uint32_t x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return sub(dest, x);
    }

    inline void bit_and(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::AND;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void bit_and(InstructionOperand dest, U64 x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return bit_and(dest, x);
    }

    inline void shr(InstructionOperand dest, InstructionOperand x) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::SHR;
        instr->op1 = dest;
        instr->op2 = x;
    }

    inline void shr(InstructionOperand dest, U64 x_imm) {
        InstructionOperand x = InstructionOperand::make_imm(x_imm);
        return shr(dest, x);
    }

    inline void branch(U64 *label) {
        InstructionOperand label_op = InstructionOperand::make_label(label);

        Instruction* instr = alloc_instruction();
        instr->type = Instruction::BRANCH;
        instr->op1 = label_op;
    }

    inline void cond_branch(U64 *label, InstructionOperandCond* cond) {
        InstructionOperand label_op = InstructionOperand::make_label(label);
        InstructionOperand cond_op = InstructionOperand::make_cond(cond);

        Instruction* instr = alloc_instruction();
        instr->type = Instruction::COND_BRANCH;
        instr->op1 = label_op;
        instr->op2 = cond_op;
    }

    inline void eq(InstructionOperand var, InstructionOperand lhs, InstructionOperand rhs) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::EQ;
        instr->op1 = var;
        instr->op2 = lhs;
        instr->op3 = rhs;
    }

    inline void neq(InstructionOperand var, InstructionOperand lhs, InstructionOperand rhs) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::NEQ;
        instr->op1 = var;
        instr->op2 = lhs;
        instr->op3 = rhs;
    }

    inline void trap(String message) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::TRAP;
        instr->op1 = InstructionOperand::make_string(message);
    }

    inline void load(Instruction::Type load_type, InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        switch (load_type) {
        case Instruction::LOAD8:
            return load8(dest, src, off);
        case Instruction::LOAD16:
            return load16(dest, src, off);
        case Instruction::LOAD32:
            return load32(dest, src, off);
        case Instruction::LOAD64:
            return load64(dest, src, off);
        default:
            OK_UNREACHABLE();
        }
    }

    inline void load8(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::LOAD8;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void load16(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::LOAD16;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void load32(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::LOAD32;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void load64(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::LOAD64;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void load32(InstructionOperand dest, InstructionOperand src, uint32_t off_imm) {
        InstructionOperand off = InstructionOperand::make_imm(off_imm);
        load32(dest, src, off);
    }

    inline void store(Instruction::Type store_type, InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        switch (store_type) {
        case Instruction::STORE8:
            return store8(dest, src, off);
        case Instruction::STORE16:
            return store16(dest, src, off);
        case Instruction::STORE32:
            return store32(dest, src, off);
        case Instruction::STORE64:
            return store64(dest, src, off);
        default:
            OK_UNREACHABLE();
        }
    }

    inline void store8(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::STORE8;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void store16(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::STORE16;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void store32(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::STORE32;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    inline void store64(InstructionOperand dest, InstructionOperand src, InstructionOperand off) {
        Instruction* instr = alloc_instruction();
        instr->type = Instruction::STORE64;
        instr->op1 = dest;
        instr->op2 = src;
        instr->op3 = off;
    }

    // NOTE: This method *might* map to the instruction with the same name, but in some cases
    // it will not, so maybe it should be moved to the other method "section" below.
    inline void capture_field(InstructionOperand dest, FieldReference *reference) {
        OK_ASSERT(reference->structure != current_struct);
        OK_ASSERT(dest.type == InstructionOperand::VAR);

        Optional<Instruction> structure_instruction_opt{};
        Optional<Structure *> structure_annotation_opt{};

        for (SZ i = (SZ)instructions.count - 1; i > 0; --i) {
            Optional<CompilerAnnotation> annotation = annotations.get((UZ)i);
            if (annotation && annotation.value.type == CompilerAnnotation::STRUCT) {
                structure_instruction_opt = instructions[i];
                structure_annotation_opt = annotation.value.structure;
                break;
            }
        }

        if (structure_annotation_opt) {
            Instruction structure_instruction = structure_instruction_opt.get();
            OK_ASSERT(structure_instruction.type == Instruction::CALL);

            OK_ASSERT(structure_instruction.op2.type == InstructionOperand::CALL_ARGS);
            InstructionOperandCallArgs *structure_instruction_call_args = structure_instruction.op2.call_args;

            InstructionOperand field_size = size_of(reference->field);
            OK_ASSERT(field_size.type == InstructionOperand::IMM);

            Instruction::Type field_load_type = select_load(field_size.imm);
            InstructionOperand captured_field_var = structure_instruction_call_args->output;
            InstructionOperand captured_field_offset = compile_offset(reference->field);

            load(field_load_type, dest, captured_field_var, captured_field_offset);
            annotate_field(reference->field->name.view());
        } else {
            Instruction *instr = alloc_instruction();

            captured_fields.push(reference);

            instr->type = Instruction::CAPTURE_FIELD;
            instr->op1 = dest;
            instr->op2 = InstructionOperand::make_field_ref(reference);
        }
    }

    inline void alloc_mem(InstructionOperand var, InstructionOperand size) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::ALLOC_MEM;
        instr->op1 = var;
        instr->op2 = size;
    }

    inline void call(Decoder *decoder,
                     InstructionOperand input,
                     InstructionOperand output,
                     InstructionOperand decoder_params,
                     Slice<InstructionOperand> extra_args) {
        InstructionOperand decoder_op = InstructionOperand::make_decoder(decoder);
        InstructionOperandCallArgs *call_args = InstructionOperandCallArgs::alloc(arena,
                                                                                  input,
                                                                                  output,
                                                                                  decoder_params,
                                                                                  extra_args);
        InstructionOperand call_args_op = InstructionOperand::make_call_args(call_args);

        Instruction *instr = alloc_instruction();
        instr->type = Instruction::CALL;
        instr->op1 = decoder_op;
        instr->op2 = call_args_op;
    }

    inline void array_length(InstructionOperand output_var, InstructionOperand input_var) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::ARRAY_LENGTH;
        instr->op1 = output_var;
        instr->op2 = input_var;
    }

    inline void alloc_decoder_params(InstructionOperand var) {
        Instruction *instr = alloc_instruction();
        instr->type = Instruction::ALLOC_DECODER_PARAMS;
        instr->op1 = var;

        for (UZ i = 0; i < propagated_decoder_params.count; ++i) {
            Pair<DecoderParamName, InstructionOperand> decoder_param = propagated_decoder_params[i];
            set_decoder_param(var, decoder_param.a, decoder_param.b);
        }
    }

    // The following methods do not map directly to instructions, but look like they do.
    inline void align_down(InstructionOperand value, InstructionOperand alignment) {
        InstructionOperand value_copy_var = random_var("value_copy"_sv, value);
        InstructionOperand alignment_mask_var = random_var("alignment_mask"_sv, alignment);
        sub(alignment_mask_var, 1);

        bit_and(value_copy_var, alignment_mask_var);
        sub(value, value_copy_var);
    }

    inline void align_down(InstructionOperand value, U64 alignment_imm) {
        InstructionOperand alignment = InstructionOperand::make_imm(alignment_imm);
        return align_down(value, alignment);
    }

    inline void set_decoder_param(DecoderParamName param, InstructionOperand value) {
        set_decoder_param(decoder_var, param, value);
    }

    inline void set_decoder_param(InstructionOperand target_decoder_var, DecoderParamName param, InstructionOperand value) {
        U64 param_offset = offset_of_decoder_param(param);
        InstructionOperand param_offset_op = InstructionOperand::make_imm(param_offset);
        store64(target_decoder_var, value, param_offset_op);

        StringView param_name = param_name_to_string(param);
        annotate_field(param_name);
    }


    inline void get_decoder_param(InstructionOperand var, DecoderParamName param) {
        StringView param_sv = param_name_to_string(param);
        U64 param_offset = offset_of_decoder_param(param);
        InstructionOperand param_offset_op = InstructionOperand::make_imm(param_offset);
        load64(var, decoder_var, param_offset_op);
        annotate_field(param_sv);
    }

    /// Calculates size of a structure field in bits.
    inline InstructionOperand size_of(Field *f) {
        if (f->type.is_scalar()) {
            U32 field_size = f->type.size.in_bits();
            return InstructionOperand::make_imm(field_size);
        }

        if (f->type.is_array()) {
            InstructionOperand array_length = compile_compute_value(f, f->length.get());
            InstructionOperand array_size_var = random_var("array_size"_sv, array_length);

            Type *elem_type = f->type.element_type;
            OK_ASSERT(elem_type->is_scalar());

            U32 elem_size = elem_type->size.in_bits();
            mul(array_size_var, elem_size);

            return array_size_var;
        }

        if (f->type.is_struct()) {
            InstructionOperand accumulator = InstructionOperand::make_imm(0);

            Structure *s = f->type.structure;

            for (UZ i = 0; i < s->fields.count; ++i) {
                Field *struct_field = s->fields[i];
                InstructionOperand field_size = size_of(struct_field);

                if (accumulator.type == InstructionOperand::IMM) {
                    if (field_size.type != InstructionOperand::IMM) {
                        OK_ASSERT(field_size.type == InstructionOperand::VAR);
                        InstructionOperand new_accumulator_var = random_var("size_of"_sv, accumulator);
                        accumulator = new_accumulator_var;
                        add(accumulator, field_size);
                    } else {
                        accumulator.imm += field_size.imm;
                    }
                } else {
                    OK_ASSERT(accumulator.type == InstructionOperand::VAR);
                    add(accumulator, field_size);
                }
            }

            return accumulator;
        }

        OK_TODO();
    }

    // The following methods don't map to instructions.
    inline U64 *label() {
        return arena->alloc<U64>();
    }

    inline void link(U64 *label) {
        *label = instructions.count;
    }

    Allocator *arena;
    List<Instruction> instructions;
    Table<UZ, CompilerAnnotation> annotations;
    InstructionOperand _input_var;
    InstructionOperand _output_var;
    InstructionOperand decoder_var;
    Structure *current_struct;
    List<FieldReference *> captured_fields;
    Instruction::Type ptr_load_type;
    Instruction::Type ptr_store_type;
    List<Pair<Structure *, Decoder *>> structure_decoders;
    List<Pair<DecoderParamName, InstructionOperand>> propagated_decoder_params;
};

Decoder compile_decoder(Allocator*, Structure*, BBCompilerContext*);
String compile_to_js(Allocator*, Decoder*, BBCompilerContext*, bool);
