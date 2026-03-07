import { configure, flush, log, logLevel } from "./src/logging.js";
import { run } from "./src/cli.js";

configure({
    logLevel: logLevel.debug,
    file: ".multi-gen.log",
});

(async () => {
    try {
        await run();
    } catch (e) {
        log(logLevel.error, "%s", e);
        process.exit(1);
    } finally {
        flush();
    }
})();
