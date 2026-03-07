# Kodek CLI tool

Kodek allows you to generate javascript decoders for data structures defined with declarative TOML syntax.

## Building and running
Kodek requires CMake to build it.

Building with ninja and clang/gcc:
```shell
cmake -B build -GNinja
cmake --build build
```

Building with Visual Studio 2022 and MSVC:
```shell
cmake -B build -G "Visual Studio 17 2022"
cmake --build build
```

The built executable can be then used in the following way:
```shell
.\build\kodek.exe <input toml file> <output JS file>
```
