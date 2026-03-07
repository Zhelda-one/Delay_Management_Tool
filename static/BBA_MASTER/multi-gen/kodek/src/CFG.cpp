#include "CFG.hpp"

#include <algorithm>
#include <iomanip>

#include "Set.hpp"

template <typename T>
void bubble_up(List<T>* list, size_t el) {
    for (; el > 0; el--) {
        if (list->items[el] < list->items[el - 1]) {
            std::swap(list->items[el], list->items[el - 1]);
        } else if (list->items[el] == list->items[el - 1]) {
            list->remove_at(el);
            break;
        } else {
            break;
        }
    }
}

List<size_t> find_leaders(Arena* a, List<Instruction> instructions) {
    auto leaders = List<size_t>::alloc(a, instructions.count >> 1);
    leaders.push(0);

    for (size_t i = 0; i < instructions.count; i++) {
        Instruction inst = instructions[i];

        switch (inst.type) {
        case Instruction::Type::BRANCH: {
            auto* op = static_cast<const InstructionOperandLabel*>(inst.op1);
            leaders.push(op->ip);
            bubble_up(&leaders, leaders.count - 1);

            if (i + 1 < instructions.count) {
                leaders.push(i + 1);
                bubble_up(&leaders, leaders.count - 1);
            }

            break;
        }
        case Instruction::Type::COND_BRANCH: {
            auto* op = static_cast<const InstructionOperandLabel*>(inst.op1);
            leaders.push(op->ip);
            bubble_up(&leaders, leaders.count - 1);

            if (i + 1 < instructions.count) {
                leaders.push(i + 1);
                bubble_up(&leaders, leaders.count - 1);
            }

            break;
        }
        default: break;
        }
    }

    return leaders;
}

using SymbolTable = Table<HashPtr<InstructionOperand>, SymbolInfo>;

// static inline void symbol_follow_mem(Arena* a, InstructionOperand* op, size_t idx, SymbolTable* syms) {
//     if (op->type != InstructionOperand::Type::MEM) {
//         return;
//     }

//     auto* mem = static_cast<const InstructionOperandMem*>(op);

//     auto* base = InstructionOperand::alloc(a, mem->base);

//     syms->put(base, SymbolInfo {
//         .symbol = base,
//         .liveness = SymbolInfo::LIVE,
//         .next_use = (ssize_t)idx,
//     });

//     if (mem->scale != 0) {
//         auto* index = InstructionOperand::alloc(a, mem->index);

//         syms->put(index, SymbolInfo {
//             .symbol = index,
//             .liveness = SymbolInfo::LIVE,
//             .next_use = (ssize_t)idx,
//         });
//     }
// }

void construct_symbol_table(Arena* a, Arena* tmp, BasicBlock* block) {
    auto syms = Table<HashPtr<InstructionOperand>, SymbolInfo>::alloc(tmp);

    for (size_t i = 0; i < block->instructions.count; i++) {
        Instruction inst = block->instructions[i];

        if (inst.op1->is_register()) {
            syms.put(inst.op1, SymbolInfo {
                .symbol = inst.op1,
                .liveness = SymbolInfo::LIVE_AT_EXIT,
                .next_use = -1,
            });
        } else if (inst.op1->type == InstructionOperand::Type::MEM) {
            auto* mem = static_cast<InstructionOperandMem*>(inst.op1);

            auto* base = InstructionOperand::alloc(tmp, mem->base);
            syms.put(base, SymbolInfo {
                .symbol = base,
                .liveness = SymbolInfo::LIVE_AT_EXIT,
                .next_use = -1,
            });

            if (mem->scale != 0) {
                auto* index = InstructionOperand::alloc(tmp, mem->index);
                syms.put(index, SymbolInfo {
                    .symbol = index,
                    .liveness = SymbolInfo::LIVE_AT_EXIT,
                    .next_use = -1,
                });
            }
        }

        if (inst.op2 == nullptr) continue;

        if (inst.op2->is_register()) {
            syms.put(inst.op2, SymbolInfo {
                .symbol = inst.op2,
                .liveness = SymbolInfo::LIVE_AT_EXIT,
                .next_use = -1,
            });
        } else if (inst.op2->type == InstructionOperand::Type::MEM) {
            auto* mem = static_cast<InstructionOperandMem*>(inst.op2);

            auto* base = InstructionOperand::alloc(tmp, mem->base);
            syms.put(base, SymbolInfo {
                .symbol = base,
                .liveness = SymbolInfo::LIVE_AT_EXIT,
                .next_use = -1,
            });

            if (mem->scale != 0) {
                auto* index = InstructionOperand::alloc(tmp, mem->index);
                syms.put(index, SymbolInfo {
                    .symbol = index,
                    .liveness = SymbolInfo::LIVE_AT_EXIT,
                    .next_use = -1,
                });
            }
        }
    }

    block->symbol_table = List<List<SymbolInfo>>::alloc(a, block->instructions.count);

    for (size_t i = 0; i < block->instructions.count; i++) {
        auto syms_list = List<SymbolInfo>::alloc(a, 2);
        block->symbol_table.push(syms_list);
    }

    for (ssize_t i = block->instructions.count - 1; i >= 0; i--) {
        Instruction inst = block->instructions[i];

        if (!inst.is_mov()) {
            continue;
        }

        SymbolInfo info;
        // TODO: this assertion fails, because we don't count mems as symbols now
        ZEG_ASSERT(syms.get(inst.op1, &info));

        block->symbol_table[i].push(info);

        syms.put(inst.op1, SymbolInfo {
            .symbol = inst.op1,
            .liveness = SymbolInfo::NOT_LIVE,
            .next_use = SymbolInfo::NO_NEXT_USE,
        });

        symbol_follow_mem(a, inst.op1, i, &syms);

        if (!(inst.op2 != nullptr && inst.op2->is_cell())) {
            continue;
        }

        ZEG_ASSERT(syms.get(inst.op2, &info));

        block->symbol_table[i].push(info);

        syms.put(inst.op2, SymbolInfo {
            .symbol = inst.op2,
            .liveness = SymbolInfo::LIVE,
            .next_use = i,
        });

        symbol_follow_mem(a, inst.op2, i, &syms);
    }
}

CFG construct_decoder_cfg(Arena* a, const Decoder* decoder) {
    CFG cfg = CFG::alloc(a);

    Arena tmp_arena{};

    List<size_t> leaders = find_leaders(&tmp_arena, decoder->code);

    for (size_t i = 0; i < leaders.count - 1; i++) {
        cfg.alloc_block(a, leaders[i], leaders[i + 1], decoder->code);
    }

    cfg.alloc_block(a, leaders[leaders.count - 1], decoder->code.count, decoder->code);

    // determine edges and change branch instructions to point to the blocks
    for (size_t i = 0; i < cfg.blocks.count; i++) {
        BasicBlock* block = &cfg.blocks[i];
        Instruction last_instruction = block->instructions[block->instructions.count - 1];

        switch (last_instruction.type) {
        case Instruction::Type::COND_BRANCH: {
            auto* label = static_cast<InstructionOperandLabel*>(last_instruction.op1);

            BBID id;
            ZEG_ASSERT(cfg.block_leaders.get(label->ip, &id));

            label->ip = id;
            block->edges.push(id);

            if (i != cfg.blocks.count - 1) {
                block->edges.push(i + 1);
            }

            break;

        }
        case Instruction::Type::BRANCH: {
            auto* label = static_cast<InstructionOperandLabel*>(last_instruction.op1);

            BBID id;
            ZEG_ASSERT(cfg.block_leaders.get(label->ip, &id));

            label->ip = id;
            block->edges.push(id);

            break;
        }
        default:
            if (i != cfg.blocks.count - 1) {
                block->edges.push(i + 1);
            }
        }
    }

    arena_free(&tmp_arena);

    for (size_t i = 0; i < cfg.blocks.count; i++) {
        construct_symbol_table(a, &tmp_arena, &cfg.blocks[i]);
        arena_free(&tmp_arena);
    }

    arena_destroy(&tmp_arena);

    return cfg;
}

uint32_t locate_first_definition_node(List<DAGNode*> nodes, InstructionOperand* op, BasicBlock* block) {
    if (!op->is_cell()) {
        return (uint32_t)-1;
    }

    for (size_t n = nodes.count; n > 0; n--) {
        auto idx = n - 1;

        if (nodes[idx]->type == DAGNode::INSTRUCTION) {
            auto* inst_node = static_cast<DAGInstructionNode*>(nodes[idx]);

            Instruction inst = block->instructions[inst_node->instruction];

            if (inst.is_mov() && *inst.op1 == *op) {
                return n - 1;
            }
        } else {
            auto* cell_node = static_cast<DAGCellNode*>(nodes[idx]);

            if (*cell_node->info.symbol == *op) {
                return idx;
            }
        }
    }

    return (uint32_t)-1;
}

void assign_child_if_found(Arena* tmp, List<DAGNode*>* nodes, InstructionOperand* op, DAGInstructionNode* node, BasicBlock* block) {
    uint32_t first_definition = locate_first_definition_node(*nodes, op, block);
    if (first_definition != (uint32_t)-1) {
        node->children.push(first_definition);
    }

    if (op->type == InstructionOperand::Type::MEM) {
        auto* mem = static_cast<InstructionOperandMem*>(op);

        auto* base = InstructionOperand::alloc(tmp, mem->base);
        assign_child_if_found(tmp, nodes, base, node, block);

        if (mem->scale != 0) {
            auto* index = InstructionOperand::alloc(tmp, mem->index);
            assign_child_if_found(tmp, nodes, index, node, block);
        }
    }
}

void assign_dag_node_children(Arena* tmp, List<DAGNode*>* nodes, DAGInstructionNode* node, BasicBlock* block) {
    Instruction inst = block->instructions[node->instruction];

    switch (inst.type) {
#define X(i) case Instruction::Type::i: { \
        assign_child_if_found(tmp, nodes, inst.op2, node, block); \
        break; \
        }
ENUM_MOV_INSTRUCTIONS
#undef X
    case Instruction::Type::COND_BRANCH: {
        auto* cond = static_cast<InstructionOperandCond*>(inst.op2);

        assign_child_if_found(tmp, nodes, cond->lhs, node, block);

        if (!cond->rhs) break;

        assign_child_if_found(tmp, nodes, cond->rhs, node, block);

        break;
    }
    case Instruction::Type::BRANCH: break;
    }
}

void add_missing_leaves(List<DAGNode*>* nodes,
                        Set<HashPtr<InstructionOperand>>* leafs,
                        InstructionOperand* leaf,
                        List<SymbolInfo> symbol_table) {
    if (leaf->type == InstructionOperand::Type::MEM) {
        ArenaAllocator* leafs_arena = leafs->arena;

        auto* mem = static_cast<InstructionOperandMem*>(leaf);

        auto* base_leaf = InstructionOperand::alloc(leafs_arena, mem->base);
        add_missing_leaves(nodes, leafs, base_leaf, symbol_table);

        if (mem->scale != 0) {
            auto* index_leaf = InstructionOperand::alloc(leafs_arena, mem->index);
            add_missing_leaves(nodes, leafs, index_leaf, symbol_table);
        }
    } else {
        if (leafs->has(leaf)) return;

        size_t sym_info_idx = symbol_table.find_index([=](SymbolInfo info) {
            return *info.symbol == *leaf;
        });
        std::cout << *leaf << std::endl;
        ZEG_ASSERT(sym_info_idx != (size_t)-1);

        ArenaAllocator* nodes_arena = nodes->arena;
        SymbolInfo symbol_info = symbol_table[sym_info_idx];
        auto* node = DAGCellNode::alloc(nodes_arena, symbol_info);
        nodes->push(node);
    }
}

BasicBlockDAG construct_basic_block_dag(Arena* a, BasicBlock* block) {
    auto dag = BasicBlockDAG::alloc(a, block);

    Arena tmp{};

    auto leaf_nodes = Set<HashPtr<InstructionOperand>>::alloc(&tmp);

    // FIXME: not even a temporary hack, consider adding something like this to the symbol table first
    auto* gpr0 = InstructionOperand::alloc(&tmp, InstructionOperand::Type::GPR0);
    auto* gpr1 = InstructionOperand::alloc(&tmp, InstructionOperand::Type::GPR1);
    leaf_nodes.put(gpr0);
    leaf_nodes.put(gpr1);

    for (size_t i = 0; i < block->instructions.count; i++) {
        Instruction inst = block->instructions[i];

        if (inst.is_mov()) {
            add_missing_leaves(&dag.nodes, &leaf_nodes, inst.op1, block->symbol_table[i]);
            add_missing_leaves(&dag.nodes, &leaf_nodes, inst.op2, block->symbol_table[i]);
        }

        auto* node = DAGInstructionNode::alloc(a, i);

        assign_dag_node_children(&tmp, &dag.nodes, node, block);

        dag.nodes.push(node);
    }

    arena_destroy(&tmp);

    std::cout << dag << std::endl;

    ZEG_TODO();
}

std::ostream& operator <<(std::ostream& out, const SymbolInfo& info) {
    if (info.next_use == SymbolInfo::NO_NEXT_USE) {
        out << "no next use, ";
    } else {
        out << "next used at " << info.next_use << ", ";
    }

    switch (info.liveness) {
    case SymbolInfo::LIVE:         return out << "live";
    case SymbolInfo::NOT_LIVE:     return out << "not live";
    case SymbolInfo::LIVE_AT_EXIT: return out << "live at exit";
    }

    ZEG_UNREACHABLE();
}

std::ostream& operator <<(std::ostream& out, const BasicBlock& bb) {
    out << bb.id << ":" << std::endl;

    for (size_t i = 0; i < bb.instructions.count; i++) {
        out << "\t[" << std::setw(4) << bb.instruction_indices[i] << "] " << bb.instructions[i] << std::endl;
    }

    out << "edges: [";
    for (size_t i = 0; i < bb.edges.count; i++) {
        out << bb.edges[i];
        if (i != bb.edges.count - 1) {
            out << ", ";
        }
    }

    out << "]" << std::endl;

    out << "symbol table:" << std::endl;

    for (size_t i = 0; i < bb.symbol_table.count; i++) {
        for (size_t j = 0; j < bb.symbol_table[i].count; j++) {
            SymbolInfo symbol_info = bb.symbol_table[i][j];
            out << "\t[" << std::setw(4) << bb.instruction_indices[i] << "] " << *symbol_info.symbol << " : " << symbol_info << std::endl;
        }
    }

    return out;
}

std::ostream& operator <<(std::ostream& out, const BasicBlockDAG& dag) {
    for (size_t i = 0; i < dag.nodes.count; i++) {
        DAGNode* node = dag.nodes[i];

        out << "\t[" << std::setw(4) << i << "] ";

        switch (node->type) {
        case DAGNode::CELL: {
            out << "leaf " << *static_cast<DAGCellNode*>(node)->info.symbol;
            break;
        }

        case DAGNode::INSTRUCTION: {
            auto* inst_node = static_cast<DAGInstructionNode*>(node);
            out << "instruction '" << dag.block->instructions[inst_node->instruction] << "', with children [" << std::endl;

            for (size_t i = 0; i < inst_node->children.count; i++) {
                out << "\t\t       " << inst_node->children[i];

                if (i != inst_node->children.count - 1) {
                    out << ",";
                }

                out << std::endl;
            }

            out << "\t       ]";

            break;
        }
        }

        out << std::endl;
    }

    return out;
}
