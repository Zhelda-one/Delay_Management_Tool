import fs from "node:fs";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { execFile, execFileSync } from "node:child_process";
import path from "node:path";
import { inspect, parseArgs, promisify } from "node:util";

import {
    generateFile,
    generateFinalBoss,
    GenerationContext,
    generateAll,
} from "./gen.js";
import { parseFile, tokenizeFile } from "./util.js";
import { flush, log, logLevel } from "./logging.js";
import { Definition, IncludeDefinition, NamespaceDefinition } from "./ast.js";
import { analyzeParsedFile } from "./sema/analyze.js";

const generationParams = {
    dumb: false,
};

export async function run() {
    const { values: flags, positionals } = parseArgs({
        options: {
            ast: {
                type: "boolean",
            },
            tokens: {
                type: "boolean",
            },
            dump: {
                type: "boolean",
            },
            sema: {
                type: "boolean",
            },
            depgraph: {
                type: "string",
            },
            "depgraph-search": {
                type: "string",
            },
            stdout: {
                type: "boolean",
            },
            single: {
                type: "boolean",
                short: "s",
            },
            all: {
                type: "boolean",
                short: "a",
            },
            dumb: {
                type: "boolean",
                short: "d",
            },
            help: {
                type: "boolean",
                short: "h",
            },
        },
        allowPositionals: true,
    });

    generationParams.dumb = flags.dumb ?? false;

    if (flags.help) {
        console.log(helpMessage);
        process.exit(0);
    }

    if (flags.depgraph) {
        if (positionals.length < 2) {
            die("not enough arguments");
        }

        await selectRevision(positionals[0], positionals[1]);

        const inputDir = detectInputDir(positionals[0]);

        const roots = collectIncludeRoots(inputDir);
        const graph = buildDependencyGraph(inputDir, roots);

        const dotExecutable = await locateCommand("dot");

        if (dotExecutable) {
            await visualizeGraph(graph, dotExecutable, flags.depgraph);
        } else {
            console.log(inspect(graph, { depth: null }));
        }

        process.exit(0);
    }

    if (flags["depgraph-search"]) {
        if (positionals.length < 2) {
            die("not enough arguments");
        }

        await selectRevision(positionals[0], positionals[1]);

        const inputDir = detectInputDir(positionals[0]);

        const roots = collectIncludeRoots(inputDir);
        const graph = buildDependencyGraph(inputDir, roots);

        const nodePaths = graph.searchForNode(flags["depgraph-search"]);

        if (nodePaths.length !== 0) {
            let result = "";
            for (const path of nodePaths) {
                result += path.join(" -> ") + "\n";
            }

            console.log(result);
        } else {
            console.log("Node not found");
        }

        process.exit(0);
    }

    if (flags.sema) {
        if (positionals.length === 0) {
            die("not enough arguments");
        }

        try {
            const filename = positionals[0];
            const parsed = parseFile(filename);

            const sema = analyzeParsedFile(
                parsed,
                path.basename(filename),
                undefined,
            );

            console.log(inspect(sema, { depth: null }));

            return;
        } catch (/** @type {any} */ err) {
            die("Semantic analysis failed: %s", err.message);
        }
    }

    if (flags.ast) {
        if (positionals.length === 0) {
            die("not enough arguments");
        }

        try {
            const { root: definitions } = parseFile(positionals[0]);
            console.log(inspect(definitions, { depth: null }));
        } catch (/** @type {any} */ err) {
            die("Parsing failed: %s", err.message);
        }

        return;
    }

    if (flags.tokens) {
        if (positionals.length === 0) {
            die("not enough arguments");
        }

        const tokens = tokenizeFile(positionals[0]);
        console.log(tokens);
        return;
    }

    if (flags.dump) {
        if (positionals.length === 0) {
            die("not enough arguments");
        }

        const dir = path.dirname(positionals[0]);

        try {
            console.log(generateFile(dir, positionals[0]));
        } catch (/** @type {any} */ err) {
            die("Generation failed: %s", err.message);
        }
        return;
    }

    if (flags.single) {
        if (positionals.length < 2) {
            die("not enough arguments");
        }

        const dir = path.dirname(positionals[0]);

        try {
            const gen = generateFile(dir, positionals[0]);
            await writeFile(positionals[1], gen);
        } catch (/** @type {any} */ err) {
            die("Failed to generate file: %s", err.message);
        }

        console.log("file saved succesfully");
        return;
    }

    if (flags.all) {
        if (positionals.length < 1) {
            die("not enough arguments");
        }

        try {
            await generateAllRevisions(positionals[0]);
        } catch (/** @type {any} */ err) {
            die("Failed to generate all revisions: %s", err.message);
        }

        return;
    }

    if (positionals.length < 2) {
        die("not enough arguments");
    }

    const dir = positionals[0];
    const revision = positionals[1];

    try {
        await generateRevision(dir, revision, Boolean(flags.stdout));
    } catch (/** @type {any} */ err) {
        die(
            "Failed to generate revision %s in dir %s: %s",
            revision,
            dir,
            err.message,
        );
    }
}

/**
 * @param {string} specDir
 * @returns {string}
 */
function detectInputDir(specDir) {
    const entries = fs.readdirSync(specDir, { withFileTypes: true, encoding: "utf-8" });

    if (entries.some((e) => e.isFile() && e.name.endsWith(".pg"))) {
        return specDir;
    } else {
        return path.join(specDir, "if");
    }
}

/**
 * @param {string} dir
 * @param {string} revision
 * @param {boolean} stdout
 */
async function generateRevision(dir, revision, stdout) {
    log(logLevel.debug, "Starting generation for revision %s", revision);

    selectRevision(dir, revision);

    const inputDir = detectInputDir(dir);

    const genFunc = generationParams.dumb
        ? dumbGenerationCulmination
        : normalGenerationCulmination;

    const [contents, ctx] = await genFunc(inputDir);

    log(logLevel.debug, "Finished generation for revision %s", revision);

    if (stdout) {
        console.log(contents + generateFinalBoss(ctx));
        return;
    }

    const outputDir = locateOutputDir();
    if (!outputDir) {
        console.error(
            "Could not determine the output dir for the generated multi parser, please run this script from local bba directory",
        );
        process.exit(1);
    }

    log(logLevel.info, "Located output dir: %s", outputDir);

    await grandFinale(outputDir, revision, contents, ctx);
}

/**
 * @param {string} dir
 * @param {string} revision
 */
function selectRevision(dir, revision) {
    execFileSync("git", ["-C", dir, "checkout", `tags/${revision}`]);
    log(logLevel.info, "Checking out tags/%s in %s", revision, dir);
}

/**
 * @param {string} inputDir
 * @returns {Promise<[string, GenerationContext]>}
 */
async function normalGenerationCulmination(inputDir) {
    const requiredFiles = await collectAllDependencies(inputDir);

    if (requiredFiles.length === 0) {
        throw new Error(
            "Cannot generate any code, because there are no multi files",
        );
    }

    let contents = "";
    const ctx = new GenerationContext();

    for (const { relative, absolute } of requiredFiles) {
        const filepath = fs.existsSync(relative) ? relative : absolute;

        log(logLevel.info, "Generating file %s...", filepath);
        const gen = generateFile(inputDir, filepath, ctx, false);
        log(logLevel.info, "Done!");

        contents += gen;
    }

    return [contents, ctx];
}

/**
 * @param {string} outputDir
 * @param {string} revision
 * @param {string} contents
 * @param {GenerationContext} ctx
 */
async function grandFinale(outputDir, revision, contents, ctx) {
    const outputPath = path.join(outputDir, `${revision}.js`);

    await writeFile(outputPath, contents + generateFinalBoss(ctx));

    locateAndExtendL2L1Versions(path.join(outputDir, ".."), revision, [
        ...ctx.messageData.keys(),
    ]);
}

/**
 * @param {string} inputDir
 * @returns {Promise<[string, GenerationContext]>}
 */
async function dumbGenerationCulmination(inputDir) {
    const files = await collectEveryDefinitionFile(inputDir);
    /** @type {Map<string, Definition>} */
    const allDefinitions = files
        .map((file) => parseFile(file).root.children)
        .reduce(mergeMaps, new Map());

    eliminateIncludes(allDefinitions);

    return generateAll(allDefinitions, inputDir, "<unknown>");
}

/**
 * @param {Map<string, Definition>} defs
 */
function eliminateIncludes(defs) {
    for (const [name, def] of defs) {
        if (def instanceof IncludeDefinition) {
            defs.delete(name);
        }
    }
}

/**
 * @param {Map<string, Definition>} lhs
 * @param {Map<string, Definition>} rhs
 * @returns {Map<string, Definition>}
 */
function mergeMaps(lhs, rhs) {
    for (const [name, def] of rhs) {
        if (def instanceof NamespaceDefinition) {
            const existingNs = lhs.get(name);

            if (existingNs instanceof NamespaceDefinition) {
                mergeMaps(existingNs.definitions, def.definitions);
                continue;
            }
        }

        lhs.set(name, def);
    }

    return lhs;
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function collectIncludeRoots(dir) {
    const dirEntries = fs.readdirSync(dir, { withFileTypes: true });

    return dirEntries
        .filter((entry) => {
            return (
                entry.isFile() &&
                entry.name.endsWith(".pg") &&
                !entry.name.toUpperCase().includes("UE")
            );
        })
        .map((entry) => path.join(dir, entry.name));
}

/**
 * @typedef {{ relative: string; absolute: string }} PathChoice
 */

/**
 * @param {string} inputDir
 * @returns {Promise<PathChoice[]>}
 */
async function collectAllDependencies(inputDir) {
    const dirEntries = fs.readdirSync(inputDir, { withFileTypes: true });

    const files = dirEntries
        .filter((entry) => {
            return (
                entry.isFile() &&
                entry.name.endsWith(".pg") &&
                !entry.name.toUpperCase().includes("UE")
            );
        })
        .map((entry) => path.join(inputDir, entry.name));

    // no .pg files
    if (files.length === 0) {
        files.push(...collectProtoFiles(inputDir, dirEntries));
    }

    const requiredFiles = await collectIncludes(inputDir, files);
    return requiredFiles;
}

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectEveryDefinitionFile(dir) {
    const result = [];

    const entries = await readdir(dir, {
        withFileTypes: true,
        recursive: true,
    });

    for (const entry of entries) {
        if (
            (entry.isFile() && entry.name.endsWith(".pt")) ||
            entry.name.endsWith(".mt")
        ) {
            result.push(path.join(entry.parentPath, entry.name));
        }
    }

    return result;
}

/**
 * @param {string} dir
 * @param {string[]} files
 * @returns {Promise<PathChoice[]>}
 */
async function collectIncludes(dir, files) {
    const includes = files.map((file) =>
        readFile(file, { encoding: "utf-8" }).then((contents) => {
            const lines = contents.split("\n");
            const includes = [];

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith("include")) {
                    const parts = trimmed
                        .split(" ")
                        .filter((s) => s.length !== 0);

                    const filename = parts[1].slice(1, -1);
                    const relative = path.join(path.dirname(file), filename);
                    const absolute = path.join(dir, filename);
                    includes.push({ relative, absolute });
                }
            }

            return includes;
        }),
    );

    return (await Promise.all(includes)).flat();
}

class DepGraphNode {
    /** @type {string} */
    name;
    /** @type {DepGraphNode[]} */
    children;

    /**
     * @param {string} name
     * @param {DepGraphNode[]} children
     */
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

class DependencyGraph {
    /** @type {DepGraphNode[]} */
    roots;
    /** @type {string} */
    rootDir;

    /**
     * @param {string} rootDir
     * @param {DepGraphNode[]} roots
     */
    constructor(rootDir, roots) {
        this.rootDir = rootDir;
        this.roots = roots;
    }

    /**
     * @returns {string}
     */
    serializeToDot() {
        let result = `digraph G {
  overlap = prism
  layout = sfdp
  concentrate = true
`
        let nodes = this.roots;
        let isRoot = true;

        while (nodes.length !== 0) {
            const queue = [];

            for (const node of nodes) {
                const children = node.children.map((node) => `"${this.#nameWithoutRoot(node.name)}"`).join(" ");

                const nodeName = `"${this.#nameWithoutRoot(node.name)}"`;

                if (isRoot) {
                    result += `${nodeName} [color="red"]`
                }

                result += `  ${nodeName} -> {${children}}\n`;
                queue.push(...node.children);
            }

            nodes = queue;
            isRoot = false;
        }

        result += "}";
        return result;
    }

    /**
     * @param {string} re
     * @returns {string[][]}
     */
    searchForNode(re) {
        const reg = new RegExp(`^${re}$`);

        let nodes = this.roots;
        let ptr = 0;

        if (nodes.length === 0) {
            return [];
        }

        /** @type {{ nodes: DepGraphNode[]; ptr: number }[]} */
        const nodeStack = [];
        const result = [];

        outer: while (true) {
            const node = nodes[ptr];

            const nodeName = this.#nameWithoutRoot(node.name);
            if (reg.test(nodeName)) {
                const names = nodeStack.map(({ nodes, ptr }) => this.#nameWithoutRoot(nodes[ptr - 1].name));
                names.push(this.#nameWithoutRoot(node.name));

                result.push(names);
            }

            if (node.children.length !== 0) {
                nodeStack.push({ nodes, ptr: ptr + 1 });
                nodes = node.children;
                ptr = 0;
                continue;
            } else {
                if (ptr < nodes.length - 1) {
                    ptr++;
                    continue;
                }

                do {
                    const stackTop = nodeStack.pop();

                    if (!stackTop) {
                        break outer;
                    }

                    nodes = stackTop.nodes;
                    ptr = stackTop.ptr;
                } while (ptr >= nodes.length);
            }
        }

        return result;
    }

    /**
     * @param {string} name
     * @returns {string}
     */
    #nameWithoutRoot(name) {
        return name.replace(this.rootDir, "");
    }
}

/**
 * @param {string} dir
 * @param {string[]} files
 * @returns {DependencyGraph}
 */
function buildDependencyGraph(dir, files) {
    const graph = new DependencyGraph(dir, []);
    graph.roots = files.map((file) =>
        resolveNode({ relative: file, absolute: file }),
    );

    let nodes = graph.roots;

    while (nodes.length !== 0) {
        const queue = [];

        for (const node of nodes) {
            const includes = collectIncludesSync(dir, node.name);
            node.children = includes.map(resolveNode);
            queue.push(...node.children);
        }

        nodes = queue;
    }

    return graph;
}

/**
 * @param {PathChoice} include
 * @returns {DepGraphNode}
 */
function resolveNode(include) {
    return new DepGraphNode(resolveInclude(include), []);
}

/**
 * @param {PathChoice} include
 * @returns {string}
 */
function resolveInclude({ relative, absolute }) {
    if (fs.existsSync(relative)) {
        return relative;
    }

    if (fs.existsSync(absolute)) {
        return absolute;
    }

    return `[MISSING] ${relative} | ${absolute}`;
}

/**
 * @param {string} dir
 * @param {string} filename
 * @returns {PathChoice[]}
 */
function collectIncludesSync(dir, filename) {
    if (filename.startsWith("[MISSING]")) {
        return [];
    }

    const contents = fs.readFileSync(filename, { encoding: "utf-8" });

    const lines = contents.split("\n");
    const includes = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("include")) {
            const parts = trimmed.split(" ").filter((s) => s.length !== 0);

            const includeFile = parts[1].slice(1, -1);
            const relative = path.join(path.dirname(filename), includeFile);
            const absolute = path.join(dir, includeFile);
            includes.push({ relative, absolute });
        }
    }

    return includes;
}

/**
 * @param {DependencyGraph} graph
 * @param {string} dotExe
 * @param {string} format
 * @returns {Promise<string>}
 */
function visualizeGraph(graph, dotExe, format) {
    const dotSource = graph.serializeToDot();

    log(logLevel.debug, "Dot source for the dependency graph: %s", dotSource);

    const dotCmd = dotExe.split(path.sep).at(-1);
    if (dotCmd === undefined) {
        throw new Error(`Invalid 'dotExe' argument with value ${dotExe}`);
    }

    return new Promise((res, rej) => {
        log(logLevel.info, "Generating the output image...");

        const child = execFile(dotCmd, [`-T${format}`, `-omulti-depgraph.${format}`], (err, result) => {
            if (err) {
                return rej(err);
            }

            return res(result);
        });

        child.stdin?.write(dotSource);
        child.stdin?.end();
    });
}

/**
 * @param {string} command
 * @returns {string | undefined}
 */
function locateCommand(command) {
    const os = process.env.OS || process.env.OS_TYPE;
    const whichCmd = os === "Windows_NT"
        ? "where.exe"
        : "which";

    try {
        const stdout = execFileSync(whichCmd, [command], { encoding: "utf-8" }).trim();

        return stdout.length !== 0 ? stdout : undefined;
    } catch {
        return undefined;
    }
}

/**
 * @param {string} rootDir
 * @param {fs.Dirent[]} dirEntries
 * @returns {string[]}
 */
function collectProtoFiles(rootDir, dirEntries) {
    const result = [];

    for (const entry of dirEntries) {
        if (entry.isFile() && entry.name.endsWith(".pt")) {
            const fullPath = path.join(rootDir, entry.name);
            result.push(fullPath);
            continue;
        }

        if (entry.isDirectory()) {
            const fullPath = path.join(rootDir, entry.name);
            result.push(
                ...collectProtoFiles(
                    fullPath,
                    fs.readdirSync(fullPath, { withFileTypes: true }),
                ),
            );
            continue;
        }
    }

    return result;
}

/**
 * @returns {string | null}
 */
function locateOutputDir() {
    const cwd = process.cwd();
    const cwdRel = path.join(cwd, "js", "l2l1");
    if (fs.existsSync(cwdRel)) {
        return cwdRel;
    }

    const parentRel = path.join(path.dirname(cwd), "js", "l2l1");
    return fs.existsSync(parentRel) ? parentRel : null;
}

/**
 * @param {string} jsDir
 * @param {string} newRevision
 * @param {string[]} ids
 */
function locateAndExtendL2L1Versions(jsDir, newRevision, ids) {
    const filepath = path.join(jsDir, "l2l1.js");
    const contents = fs.readFileSync(filepath, { encoding: "utf-8" });
    const lines = contents.split("\n").map((line) => line.trimEnd());
    const startLine = lines.findIndex((line) =>
        line.startsWith("const l2l1_versions ="),
    );

    if (startLine === -1) {
        throw new Error(
            `Could not find the 'l2l1_versions' definition in '${filepath}'`,
        );
    }

    const endLine = lines.findIndex((line) => line === "};");

    if (endLine === -1) {
        throw new Error(
            `Could not find the 'l2l1_versions' object literal matching brace in '${filepath}'`,
        );
    }

    const versionLines = lines.splice(startLine + 1, endLine - startLine - 1);

    for (const line of versionLines) {
        if (line.startsWith(`    '${newRevision}'`)) {
            log(
                logLevel.debug,
                `MuLTI revision '${newRevision}' is already located in the '${filepath}' file`,
            );
            return;
        }
    }

    versionLines.push(`    '${newRevision}': [ ${ids.join(", ")} ],`);
    versionLines.sort();

    lines.splice(startLine + 1, 0, ...versionLines);

    fs.writeFileSync(filepath, lines.join("\n"));
}

/**
 * @param {string} dir
 */
async function generateAllRevisions(dir) {
    const multiVersions = await getL2L1Versions(dir);
    const successfull = [];
    const failed = [];

    for (const version of multiVersions) {
        console.log("Generating %s...", version);

        try {
            await generateRevision(dir, version, false);

            console.log("Done");

            successfull.push(version);
        } catch (e) {
            console.error("Failed to generate version %s, continuing", version);
            log(logLevel.error, "%s", e);
            flush();

            failed.push(version);
        }
    }

    log(
        logLevel.debug,
        "Generated successfully: %s, failed: %s",
        successfull,
        failed,
    );

    log(
        logLevel.info,
        "Generated %d revisions successfully and failed to generate %d",
        successfull.length,
        failed.length,
    );
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function getL2L1Versions(dir) {
    const stdout = execFileSync("git", ["-C", dir, "tag"], {
        encoding: "utf-8",
        timeout: 10000,
    });

    return stdout
        .split("\n")
        .filter((s) => !s.toLowerCase().includes("dev"))
        .map((s) => s.trim())
        .filter((s) => s.length !== 0);
}

const helpMessage = `Usage: node ${process.argv[1]} [options] (filepath | 3gpp repo path) [git tag] [output path]

General options:
    -h, --help   - print this help message and exit

    -a, --all    - invoke generator for every git tag in the repo
    -s, --single - generate js for a single file, requires an output path to be provided
    -d, --dumb   - invoke generator in a 'dumb' mode, meaning that includes are not resolved, instead all
                   definition files in the repo are concatenated together into a single blob; all other
                   flags related to generation apply

Debugging options:
        --stdout - instead of saving the output to a file, just write it to STDOUT
        --ast    - print the abstract syntax tree of a single file
        --tokens - print the tokens of a single file
        --dump   - generate js for a single file and dump it to stdout
        --sema   - print the syntax tree after the semantic analysis has been done

Dependency related options:
        --depgraph <format>       - builds a dependency graph for a given multi version, and calls to an exernal
                                    'dot' executable and visualizes the dependency graph with the given format,
                                    if present. Otherwise, dumps the graph to stdout
        --depgraph-search <regex> - searches for all paths to a node in the dependency graph, whose name
                                    matches given regex
`;

/**
 * @param {string} template
 * @param {any[]} args
 * @returns {never}
 */
function die(template, ...args) {
    console.log(helpMessage);
    console.error(template, ...args);
    process.exit(1);
}
