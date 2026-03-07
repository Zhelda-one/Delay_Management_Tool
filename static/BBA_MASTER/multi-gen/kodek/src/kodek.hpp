#pragma once

#include "ok.hpp"

void generate_js_from_input_file_and_write_to_output_file(ok::ArenaAllocator *allocator,
                                                          ok::StringView input_file,
                                                          ok::StringView output_file);
