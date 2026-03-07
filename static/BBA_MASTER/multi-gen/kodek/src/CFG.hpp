#pragma once

#include <iostream>

#include "arena.h"
#include "Instruction.hpp"
#include "List.hpp"
#include "compile.hpp"

struct SymbolInfo {
    enum Liveness {
        LIVE,
        NOT_LIVE,
        LIVE_AT_EXIT,
    };

    static constexpr ssize_t NO_NEXT_USE = -1;

    InstructionOperand* symbol;
    Liveness liveness;
    ssize_t next_use;
};

using BBID = uint32_t;

struct BasicBlock {
    static BasicBlock alloc(Arena* a, BBID id) {
        BasicBlock b;

        b.id = id;
        b.instructions = List<Instruction>::alloc(a);
        b.instruction_indices = List<size_t>::alloc(a);
        b.edges = List<BBID>::alloc(a);
        b.symbol_table = List<List<SymbolInfo>>::alloc(a);

        return b;
    }

    BBID id;
    List<Instruction> instructions;
    List<size_t> instruction_indices;
    List<BBID> edges;
    List<List<SymbolInfo>> symbol_table;
};

std::ostream& operator <<(std::ostream&, const BasicBlock&);

struct DAGNode {
    enum Type {
        INSTRUCTION,
        CELL,
    };

    Type type;
};

struct DAGInstructionNode : public DAGNode {
    static DAGInstructionNode* alloc(Arena* a, size_t instruction) {
        auto* ptr = (DAGInstructionNode*)arena_alloc(a, sizeof(DAGInstructionNode));
        ptr->type = DAGNode::INSTRUCTION;
        ptr->instruction = instruction;
        ptr->children = List<uint32_t>::alloc(a);
        return ptr;
    }

    size_t instruction;
    List<uint32_t> children;
};

struct DAGCellNode : public DAGNode {
    static DAGCellNode* alloc(Arena* a, SymbolInfo info) {
        auto* ptr = (DAGCellNode*)arena_alloc(a, sizeof(DAGCellNode));
        ptr->type = DAGNode::CELL;
        ptr->info = info;
        return ptr;
    }

    SymbolInfo info;
};

struct BasicBlockDAG {
    static BasicBlockDAG alloc(Arena* a, BasicBlock* block) {
        BasicBlockDAG dag;
        dag.nodes = List<DAGNode*>::alloc(a);
        dag.block = block;
        return dag;
    }

    BasicBlock* block;
    List<DAGNode*> nodes;
};

std::ostream& operator <<(std::ostream&, const BasicBlockDAG&);

BasicBlockDAG construct_basic_block_dag(Arena*, BasicBlock*);

struct CFG {
    static CFG alloc(Arena* a) {
        CFG cfg;
        cfg.blocks = List<BasicBlock>::alloc(a);
        cfg.block_leaders = Table<size_t, BBID>::alloc(a);
        return cfg;
    }

    inline BBID alloc_block(Arena* a, size_t start, size_t end, const List<Instruction>& src) {
        auto bb = BasicBlock::alloc(a, blocks.count);

        bb.instructions = src.copy(start, end);

        block_leaders.put(start, bb.id);

        for (; start < end; start++) {
            bb.instruction_indices.push(start);
        }

        blocks.push(bb);

        return bb.id;
    }

    List<BasicBlock> blocks;
    Table<size_t, BBID> block_leaders;
};

CFG construct_decoder_cfg(Arena*, const Decoder*);
