#include <iostream>

#include "ok.hpp"
#include "Instruction.hpp"

bool operator ==(const InstructionOperand& lhs, const InstructionOperand& rhs) {
    if (lhs.type != rhs.type) {
        return false;
    }

    switch (lhs.type) {
    case InstructionOperand::VAR: {
        return lhs.var == rhs.var;
    }
    case InstructionOperand::IMM: {
        return lhs.imm == rhs.imm;
    }
    case InstructionOperand::COND: {
        InstructionOperandCond *l_cond = lhs.cond;
        InstructionOperandCond *r_cond = rhs.cond;

        return l_cond->cond_type == r_cond->cond_type && l_cond->lhs == r_cond->lhs && l_cond->rhs == r_cond->rhs;
    }
    case InstructionOperand::LABEL: {
        return lhs.label == rhs.label;
    }
    default:
        OK_UNREACHABLE();
    }
}

static void print(InstructionOperandCond::Type type) {
    switch (type) {
    case InstructionOperandCond::Type::GTE: printf(">="); break;
    case InstructionOperandCond::Type::EQ:  printf("=="); break;
    case InstructionOperandCond::Type::NOT: printf("!");  break;
    }
}

StringView decoder_name(const Decoder *);

void print(const InstructionOperand& op) {
    switch (op.type) {
    case InstructionOperand::VAR: {
        printf("%%" OK_SV_FMT, OK_SV_ARG(op.var));
        break;
    }
    case InstructionOperand::IMM: {
        printf("$%llu", op.imm);
        break;
    }
    case InstructionOperand::COND: {
        InstructionOperandCond *cond = op.cond;

        printf("{");
        print(cond->lhs);
        printf(" ");
        print(cond->cond_type);
        printf(" ");
        print(cond->rhs);
        printf("}");
        break;
    }
    case InstructionOperand::LABEL: {
        printf("@%llu", *op.label);
        break;
    }
    case InstructionOperand::STRING: {
        printf("\"%s\"", op.string.cstr());
        break;
    }
    case InstructionOperand::FIELD_REF: {
        printf("[%s.%s]", op.field_ref->structure->name.cstr(), op.field_ref->field->name.cstr());
        break;
    }
    case InstructionOperand::CALL_ARGS: {
        InstructionOperandCallArgs *call_args = op.call_args;

        printf("(");
        print(call_args->input);
        printf(", ");
        print(call_args->output);
        printf(", ");
        print(call_args->decoder_params);

        for (UZ i = 0; i < call_args->extra_args.count; ++i) {
            printf(", ");
            print(call_args->extra_args[i]);
        }

        break;
    }
    case InstructionOperand::DECODER: {
        StringView name = decoder_name(op.decoder);
        printf("<" OK_SV_FMT ">", OK_SV_ARG(name));
        break;
    }
    }
}

static void print(const Instruction::Type& inst_type) {
    switch (inst_type) {
#define X(t, _) case Instruction::Type::t: printf(#t); break;
ENUM_INSTRUCTIONS
#undef X
    }
}

void print(const Instruction& inst) {
    print(inst.type);
    printf(" ");

    switch (inst.args_count()) {
    case 0: break;
    case 1: {
        print(inst.op1);
        break;
    }
    case 2: {
        print(inst.op1);
        printf(", ");
        print(inst.op2);
        break;
    }
    case 3: {
        print(inst.op1);
        printf(", ");
        print(inst.op2);
        printf(", ");
        print(inst.op3);
        break;
    }
    }
}

U64 InstructionOperand::ok_hash_value() const {
    // TODO: Provide a reasonable hash implementation.
    return type;
}
