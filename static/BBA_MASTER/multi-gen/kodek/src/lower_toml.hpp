#pragma once

#include "Struct.hpp"
#include "toml.hpp"
#include "lower.hpp"

LinkedList<Structure> parse_structs_from_toml_table(ok::Allocator* allocator, GeTomlTable *table, LoweringContext *ctx);
