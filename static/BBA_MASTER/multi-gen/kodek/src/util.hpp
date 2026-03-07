#pragma once

#include <cstdarg>
#include <cstdio>
#include <cstdlib>

#include "ok.hpp"

[[noreturn]] static inline void dief(const char* fmt, ...) OK_ATTRIBUTE_PRINTF(1, 2);

[[noreturn]] static inline void dief(const char* fmt, ...) {
    va_list vargs;
    va_start(vargs, fmt);
    {
        vfprintf(stderr, fmt, vargs);
    }
    va_end(vargs);
    exit(1);
}

// NOTE(oleh): This has to be defined in assembly, and we could use inline assembler for it, but
// MSVC does not support inline assembly on x86_64, so we have to do it in a separate assembly file
// and link it later. This is ABI specific, so if other platforms need to be supported, separate
// files with the implementation should be supplied and linked with the binary.
extern "C" U64 get_clock_cycles();
