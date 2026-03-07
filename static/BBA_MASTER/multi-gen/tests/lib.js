import { Context, Namespace } from "../src/sema/analyze.js";
import Token from "../src/token.js";

/**
 * @param {{ [s: string]: any; }} lhs
 * @param {{ [x: string]: any; }} rhs
 * @returns {boolean}
 */
export function equalIgnoreToken(lhs, rhs) {
    if (!lhs || !rhs || typeof lhs !== "object" || typeof rhs !== "object") {
        return lhs === rhs;
    }

    for (const [key, value] of Object.entries(lhs)) {
        if (value instanceof Token || rhs[key] instanceof Token) {
            continue;
        }

        if (!equalIgnoreToken(value, rhs[key])) {
            return false;
        }
    }

    return true;
}

/**
 * @returns {Context}
 */
export function ctx() {
    const ctx =  new Context(".", "<none>", new Map());
    ctx.enterNamespace(new Namespace({
        init: {
            name: "<root>",
            definitions: new Map(),
        },
        ctx,
    }));
    return ctx;
}
