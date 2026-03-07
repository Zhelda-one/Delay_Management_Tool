#include <cstdlib>
#include <ctime>

#include "util.hpp"
#include "kodek.hpp"

#define KILOS 1024
#define MEGS (KILOS * 1024)

int main(int argc, char* argv[]) {
    if (argc < 3) {
        dief("Usage:\n\t%s <input file> <output file", argv[0]);
    }

    ++argv;
    --argc;

    srand((U32)time(nullptr));

    const char* input_file_path_cstr = argv[0];
    const char* output_file_path_cstr = argv[1];

    ok::StringView input_file_path{input_file_path_cstr};
    ok::StringView output_file_path{output_file_path_cstr};

    ok::ArenaAllocator arena{};
    arena.reserve(256 * MEGS);
    generate_js_from_input_file_and_write_to_output_file(&arena,
                                                         input_file_path,
                                                         output_file_path);
    return 0;
}
