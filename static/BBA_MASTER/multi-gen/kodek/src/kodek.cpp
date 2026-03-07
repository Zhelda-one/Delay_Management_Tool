#include "kodek.hpp"

#include "toml.hpp"
#include "lower.hpp"
#include "lower_toml.hpp"
#include "util.hpp"
#include "compile.hpp"
#include "Struct.hpp"

template <typename TError>
static void report_file_error_and_die(StringView filename, const char *message, TError error) {
    String error_message = ok::File::error_string(ok::temp_allocator, error);
    dief(OK_SV_FMT ": %s: %s",
         OK_SV_ARG(filename),
         message,
         error_message.cstr());
}

static HeliosAllocator ok_allocator_to_helios(ok::Allocator *allocator) {
    return HeliosAllocator {
        .vtable = HeliosAllocatorVTable {
            .alloc = [](void *allocator_p, UZ size) -> void * {
                ok::Allocator *allocator = static_cast<ok::Allocator *>(allocator_p);
                return allocator->raw_alloc(size);
            },
            .free = [](void *allocator_p, void *ptr, UZ size) -> void {
                ok::Allocator *allocator = static_cast<ok::Allocator *>(allocator_p);
                return allocator->raw_dealloc(ptr, size);
            },
            .realloc = [](void *allocator_p, void *ptr, UZ old_size, UZ new_size) -> void * {
                ok::Allocator *allocator = static_cast<ok::Allocator *>(allocator_p);
                return allocator->raw_resize(ptr, old_size, new_size);
            },
        },
        .data = (void *)allocator,
    };
}

static ok::List<U8> read_file_or_die_miserably(ok::Allocator *allocator, ok::StringView file_path) {
    ok::File input_file;
    ok::Optional<ok::File::OpenError> file_open_error = ok::File::open(&input_file, file_path);
    if (file_open_error.has_value()) {
        report_file_error_and_die(file_path, "could not open file", file_open_error.value);
    }

    ok::List<uint8_t> file_contents_buf;
    Optional<ok::File::ReadError> file_read_error = input_file.read_full(allocator, &file_contents_buf);
    if (file_read_error.has_value()) {
        report_file_error_and_die(file_path, "could not read file", file_read_error.value);
    }

    return file_contents_buf;
}

void generate_js_from_input_file_and_write_to_output_file(ok::ArenaAllocator *allocator,
                                                          ok::StringView input_file_path,
                                                          ok::StringView output_file_path) {
    if (input_file_path.ends_with(".toml")) {
        F64 file_read_start = ok::millis_timestamp();
        U64 file_read_start_cycles = get_clock_cycles();

        ok::List<U8> file_contents_buf = read_file_or_die_miserably(allocator, input_file_path);

        F64 file_read_duration = ok::millis_timestamp() - file_read_start;
        U64 file_read_cycles = get_clock_cycles() - file_read_start_cycles;

        HeliosAllocator helios_allocator = ok_allocator_to_helios(allocator);

        F64 parsing_start = ok::millis_timestamp();
        U64 parsing_start_cycles = get_clock_cycles();

        char err_buf[512];
        GeTomlTable *kodek_spec = GeTomlParseBuffer(helios_allocator,
                                                    (const char *)file_contents_buf.items,
                                                    file_contents_buf.count,
                                                    err_buf,
                                                    sizeof(err_buf));

        if (kodek_spec == nullptr) {
            dief("ERROR: could not parse the input toml file: %s\n", err_buf);
        }

        LoweringContext lowering_ctx{allocator};

        LinkedList<Structure> structs = parse_structs_from_toml_table(allocator, kodek_spec, &lowering_ctx);
        OK_ASSERT(structs.head != nullptr);

        F64 parsing_duration = ok::millis_timestamp() - parsing_start;
        U64 parsing_cycles = get_clock_cycles() - parsing_start_cycles;

        F64 compiling_start = ok::millis_timestamp();
        U64 compiling_start_cycles = get_clock_cycles();

        auto bb_ctx = BBCompilerContext::alloc(allocator, BBCompilationTarget::JS);

        U64 total_instructions_count = 0;

        String js = String::alloc(allocator, 4 * 1024);

        for (ok::LinkedList<Structure>::Node *struct_node = structs.head;
             struct_node != nullptr;
             struct_node = struct_node->next) {
            Structure *s = &struct_node->value;
            check_lowered_struct(s);

            Decoder d = compile_decoder(allocator, s, &bb_ctx);
            String compiled_decoder_js = compile_to_js(ok::temp_allocator, &d, &bb_ctx, false);
            js.append(compiled_decoder_js);
            js.push('\n');

            total_instructions_count += d.code.count;
        }

        F64 compiling_duration = ok::millis_timestamp() - compiling_start;
        U64 compiling_cycles = get_clock_cycles() - compiling_start_cycles;

        F64 file_write_start = ok::millis_timestamp();
        U64 file_write_start_cycles = get_clock_cycles();

        ok::File output_file{};
        ok::Optional<ok::File::OpenError> output_file_open_error = ok::File::open(&output_file, output_file_path);
        if (output_file_open_error) {
            report_file_error_and_die(output_file_path, "could not open the output file", output_file_open_error.value);
        }

        Slice<U8> js_slice = js.slice().cast<U8>();

        ok::Optional<ok::File::WriteError> output_file_write_error = output_file.write(js_slice);
        if (output_file_write_error) {
            report_file_error_and_die(output_file_path, "could not write to the output file", output_file_write_error.value);
        }

        F64 file_write_duration = ok::millis_timestamp() - file_write_start;
        U64 file_write_cycles = get_clock_cycles() - file_write_start_cycles;

        F64 io_operations_duration = file_write_duration + file_read_duration;
        U64 io_operations_cycles = file_write_cycles + file_read_cycles;

        F64 ipm = (F64)total_instructions_count / compiling_duration;
        F64 cpi = (F64)compiling_cycles / (F64)total_instructions_count;

        UZ available_memory = allocator->avail();
        UZ total_memory = allocator->capacity();
        UZ used_memory = total_memory - available_memory;

        printf("Memory usage: %llu out of %llu reserved bytes.\n", used_memory, available_memory);
        printf("IO operations took %f ms (%llu cycles).\n", io_operations_duration, io_operations_cycles);
        printf("Parsing took %f ms (%llu cycles).\n", parsing_duration, parsing_cycles);
        printf("Compilation took %f ms (%llu cycles).\n", compiling_duration, compiling_cycles);
        printf("Compiled %llu instructions in total (%f instructions per ms; %f cycles per instruction).\n", total_instructions_count, ipm, cpi);
    } else {
        dief("Could not determine the file type of '" OK_SV_FMT "' as a supported type", OK_SV_ARG(input_file_path));
    }
}
