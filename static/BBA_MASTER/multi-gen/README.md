# Multi-gen CLI tool

Multi-gen allows you to generate javascript decoders/encoders for [MuLTI][1] message definitions.

## Example usage

### Generating a single file

```sh
node <path-to-multi-gen-directory>/index.js -s <path-to-multi-definition-file> <output path>
```

### Generating a specific MuLTI version

```sh
node <path-to-multi-gen-directory>/index.js <path-to-3gpp-definitions-dir> <version>
```

### Generating all MuLTI versions

```sh
node <path-to-multi-gen-directory>/index.js --all <path-to-3gpp-definitions-dir>
```

### Getting help about flags and positional arguments

```sh
node <path-to-multi-gen-directory>/index.js --help
```

## Important notes

### Project structure

-   `index.js` - the main javascript file, the one that should be ran with `node`.
-   `src/token.js` - MuLTI token class definition.
-   `src/scanner.js` - definition of the `Scanner` class, used for lexical analysis of the input.
-   `src/parser.js` - definition of the `Parser` class, used for syntax analysis of the input.
-   `src/gen.js` - definition of functions and classes used for code generation
-   `src/cli.js` - the command-line interface of the program
-   `src/logging.js` - definitions of classes and function used for structured logging
-   `src/util.js` - utility functions
-   `src/sema` - semantic analysis modules

### Generating all MuLTI versions

The generator reads all the git tags in the local [3gpp spec repo][2] and tries to process all of them, saving output files to the [dedicated output directory](#where-is-the-output-saved).

### Generation modes

The generator currently supports 2 modes codenamed `smart` and `dumb`. The default is `smart`, but you can use the `dumb` mode by passing the `--dumb` flag to the CLI:

```sh
node <path-to-cli> --dumb <your-flags-and-arguments>
```

For the most part the two modes are identical, except for one major difference: generator in `dumb` mode does not process `include`s at all - the input files are preprocessed beforehand, collecting the `include` definitions and creating a dependency array. They are all parsed and combined into one big blob. Then the generator processes that AST blob in one go.


Here are the pros and cons of that approach:
* Pros:
    * Much faster in some cases
    * Can successfully generate code for some revisions that are otherwise impossible to generate in the current implementation of the `smart` mode. This may be because of bugs in the semantic analysis routines.
* Cons:
    * Much worse error messages
    * Not spec-compliant, because a file can only have one namespace, and the concatenated "blob" of AST that the preprocessor spits out will most certainly have more than one namespace definition.

### Current generation pipeline

Lexical analysis -> syntax analysis -> semantic analysis -> code generation

### Where is the output saved

The output of the generator is saved to the `js` directory of the BBA project. It works regardless of whether ran in the root directory, or one directory deeper. However, it will not work if the depth is greater. For example:

```sh
pwd
.../bba
node multi-gen/index.js <input params>
```

and

```sh
pwd
.../bba/multi-gen
node index.js <input params>
```

will work, but

```sh
pwd
.../bba/js/l2l1
node ../../multi-gen/index.js <input params>
```

will not.

## Known bugs and limitations

* File `include`s often don't work correctly. This is either due to the MuLTI spec not listing all possible cases, or the actual users writing non-spec-conforming code, which we need to handle in some way, which produces confusion.
* There are some issues with symbol resolution. This is partially due to the incorrect handling of `include`s described above.
* There are some syntactic constructs of the MuLTI language that are new and not defined by the spec, which we don't handle.

## Resources

-   [MuLTI language reference](https://confluence.ext.net.nokia.com/display/MuLTI/MuLTI+Grammar+Reference)
-   [3gpp 5g interfaces repo containing MuLTI definition files][2] _note that the repo is not accessible from the browser, but you can clone it locally using this url._

[1]: https://confluence.ext.net.nokia.com/display/MuLTI
[2]: https://gerrit.ext.net.nokia.com/gerrit/MN/HIGHFIVE/3gpp-interfaces-5g-layer-1
[3]: https://confluence.ext.net.nokia.com/display/MuLTI/Embedded+Protocols
[4]: https://confluence.ext.net.nokia.com/display/MuLTI/Extension+Point
