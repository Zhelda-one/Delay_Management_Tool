cmake_minimum_required(VERSION 3.10)
project(kodek LANGUAGES CXX C ASM_MASM)

set(CMAKE_CXX_STANDARD 20)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_subdirectory(third_party)

set(KODEK_SOURCES
  src/ok.cpp
  src/Instruction.cpp
  src/Type.cpp
  src/compile.cpp
  src/main.cpp
  src/lower.cpp
  src/lower_toml.cpp
  src/kodek.cpp)

set(KODEK_INTRINSICS_SOURCES
  src/intrinsics_windows.asm)

add_executable(kodek ${KODEK_SOURCES})

add_library(kodek_intrinsics STATIC ${KODEK_INTRINSICS_SOURCES})

if("${CMAKE_CXX_COMPILER_ID}" STREQUAL "MSVC")
    message(STATUS "Detected MSVC")
    set(KODEK_COMPILE_OPTS /DEBUG /W4 /WX)
else()
    set(KODEK_COMPILE_OPTS -Wall -Wextra -Werror -pedantic)
endif()

target_compile_options(kodek PRIVATE ${KODEK_COMPILE_OPTS})
target_include_directories(kodek SYSTEM PRIVATE third_party)
target_link_libraries(kodek PRIVATE astron kodek_intrinsics)
