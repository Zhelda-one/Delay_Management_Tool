.code
        PUBLIC get_clock_cycles
get_clock_cycles:
        rdtsc
        shl rdx, 32
        or rax, rdx
        mov rcx, rax
        ret

END
