import { format } from "util";
import "node:stream/promises";
import { Writable } from "node:stream";
import * as fs from "node:fs";
import os from "node:os";

export const logLevel = /** @type {const} */ ({
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
});

/** @typedef {typeof logLevel[keyof typeof logLevel]} LogLevel */

const logLevelString = ["trace", "debug", "info", "warn", "error"];

class Logger {
    /** @type {Writable} */
    outputStream;
    /** @type {LogLevel} */
    logLevel;

    /**
     * @param {LogLevel} logLevel
     * @param {Writable} outputStream
     */
    constructor(logLevel, outputStream) {
        this.logLevel = logLevel;
        this.outputStream = outputStream;
    }

    /**
     * @param {LogLevel} level
     * @param {string} template
     * @param {any[]} args
     */
    log(level, template, ...args) {
        if (this.logLevel > level) {
            return;
        }

        template = `%s [%s] ${template}\n`;
        const date = new Date();
        const message = format(
            template,
            date.toISOString(),
            logLevelString[level],
            ...args,
        );
        // ignore errors for now :)
        this.outputStream.write(message);
    }

    /**
     * @abstract
     */
    flush() {
        throw new Error("This method is abstract!");
    }

    close() {
        this.outputStream.end();
    }
}

class FileLogger extends Logger {
    /**
     * @param {LogLevel} logLevel
     * @param {fs.PathLike} filepath
     */
    constructor(logLevel, filepath) {
        super(logLevel, fs.createWriteStream(filepath, { flags: "a" }));
        this.outputStream.cork();
    }

    flush() {
        process.nextTick(() => this.outputStream.uncork());
    }
}

class StdoutLogger extends Logger {
    /**
     * @param {LogLevel} logLevel
     */
    constructor(logLevel) {
        super(logLevel, process.stdout);
    }

    // no need to flush since the stdout is buffer itself on human operating systems
    flush() {}
}

/** @type {Logger} */
let loggerImpl = new FileLogger(logLevel.error, os.devNull);

/**
 * @param {LogLevel} logLevel
 * @param {string} template
 * @param {any[]} args
 */
export function log(logLevel, template, ...args) {
    loggerImpl.log(logLevel, template, ...args);
}

export function flush() {
    loggerImpl.flush();
}

/** @typedef {{ logLevel?: LogLevel; file?: fs.PathLike; stdout?: boolean; }} LoggerConfig */

/**
 * @param {LoggerConfig} config
 */
export function configure(config) {
    if (config.logLevel) {
        loggerImpl.logLevel = config.logLevel;
    }

    if (config.file && config.stdout) {
        // although we 100% can, i don't see a reason for it right now
        throw new Error("Cannot log to both stdout and file at the same time");
    }

    if (config.file) {
        loggerImpl.close();
        loggerImpl = new FileLogger(loggerImpl.logLevel, config.file);

        return;
    }

    if (config.stdout) {
        loggerImpl.close();
        loggerImpl = new StdoutLogger(loggerImpl.logLevel);

        return;
    }
}
