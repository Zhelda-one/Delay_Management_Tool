const SERVER_ADDR = "http://bba-multi.ans-tools.prod-nksm2.devops-fwk.dynamic.nsn-net.net";

const RUN_PATH = `${SERVER_ADDR}/run`;
const RESULTS_PATH = `${SERVER_ADDR}/results`;
const FAILED_TESTS_PATH = `${SERVER_ADDR}/failed-tests`;

const runButton = document.querySelector("#l2l1-run-button");

if (!runButton) {
    throw new Error("could not find the run button");
}

const devEndpoints = [
    {
        name: "Test results",
        components: ["results", ":requestId"],
        render: (resp) => resp
            .json()
            .then((json) => JSON.stringify(json, null, 2)),
        callbacks: {
            "Send and render": async ({ requestId }) => {
                const result = await fetchTestResults(requestId);
                testResultsState.update((r) => r.set(result.id, result));
            },
        },
    },
    {
        name: "Run request",
        components: ["run", ":l2l1Version"],
        render: (resp) => resp.text(),
        callbacks: {
            "Send full-fledged": async ({ l2l1Version }) => {
                const result = await runTestsForVersion(l2l1Version);
                testResultsState.update((r) => r.set(result.id, result));
            },
        },
    },
];

const failedTestsState = new State(null);
const selectedTestIdState = new State(null);
const testResultsState = new State(new Map());

const isDevMode = true;

setupDevMode(isDevMode);

runButton.addEventListener("click", async () => {
    const l2l1Version = document.querySelector("#l2l1-version-input").value;

    const result = await runTestsForVersion(l2l1Version);

    testResultsState.update((r) => r.set(result.id, result));
});

async function runTestsForVersion(l2l1Version) {
    const url = `${RUN_PATH}/${l2l1Version}`;
    log("debug", `Fetching url '${url}'`);
    const resp = await fetch(url);
    if (!resp.ok) {
        log("error", `Run request failed with status ${resp.status}: ${resp.statusText}`);
        return;
    }

    const requestId = await resp.text();

    const result = await fetchTestResults(requestId);

    // need this do display a pending request
    testResultsState.update((r) => r.set(result.id, result));

    return new Promise((res, rej) => {
        const timer = setInterval(async () => {
            const result = await fetchTestResults(requestId);

            if (result.status !== "pending") {
                clearInterval(timer);
                res(result);
            }
        }, 1000);
    });
}

const dashboard = document.querySelector("#test-results-dashboard");
// do we even need to keep this value bound?
const dasboardEl = elem(
    dashboard,
    [testResultsState],
    [],
    () => iterMap(testResultsState.get().entries(), ([id, result], idx) => div(
        [],
        [
            `class=grouping-flex-row result-${result.status} mono result`,
            style({
                justifyContent: "space-between",
            }),
            onClick(() => {
                selectedTestIdState.update(id);
                failedTestsState.update(null);
            }),
        ],
        div(`${idx + 1}.`),
        div(result.version),
        div(formatTimestamp(result.timestamp)),
    )),
);

function iterMap(iter, fn) {
    let idx = 0;
    const result = [];

    for (const el of iter) {
        result.push(fn(el, idx));
        idx++;
    }

    return result;
}

/**
 * @param {number} timestamp unix timestamp (in seconds)
 * @returns {string}
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let s = "";
    if (hours < 10) {
        s += `0${hours}`;
    } else {
        s += hours.toString();
    }

    s += ":";

    if (minutes < 10) {
        s += `0${minutes}`;
    } else {
        s += minutes.toString();
    }

    s += ":";

    if (seconds < 10) {
        s += `0${seconds}`;
    } else {
        s += seconds.toString();
    }

    return s;
}

const testResultDetails = document.querySelector("#test-result-details-contents");

const testResultDetailsEl = elem(
    testResultDetails,
    [selectedTestIdState, failedTestsState],
    [],
    () => {
        if (selectedTestIdState.get() === null) {
            return [];
        }

        const result = testResultsState.get().get(selectedTestIdState.get());
        const children = [renderTestResult(result)];

        if (result.status === "succeeded" && result.success.failedTests !== 0) {
            children.push(
                button(
                    [],
                    [
                        "class=mono block m-bot",
                        onClick(async () => {
                            const url = `${FAILED_TESTS_PATH}/${result.id}`;
                            const resp = await fetch(url);
                            if (!resp.ok) {
                                log("error", `Fetching url '${url}' failed with status code ${resp.status}: ${resp.statusText}`);
                                return;
                            }

                            const failedTests = await resp.json();

                            const renderedFails = renderFailedTests(failedTests);

                            failedTestsState.update(failedTests);
                        }),
                    ],
                    "Fetch failed test cases",
                ),
                () => {
                    if (!failedTestsState.get()?.length) {
                        return [];
                    }

                    return section(
                        [],
                        ["class=grouping grouping-flex-col gapped expand"],
                        h1(
                            [],
                            ["class=mono"],
                            "Failed test cases",
                        ),
                        div(
                            [],
                            [
                                "class=grouping-flex-col",
                                style({
                                    height: "calc(100% - 4.2rem)",
                                    overflowY: "auto",
                                }),
                            ],
                            renderFailedTests(failedTestsState.get()),
                        ),
                    );
                }
            );
        }

        return children;
    }
);

function renderFailedTests(tests) {
    const h = (text) => th(
        [],
        ["class=center-text"],
        text,
    );

    return table(
        [],
        ["class=mono"],
        tr(
            [],
            [],
            h("Fail Id"),
            h("Test Number"),
            h("Reason"),
            h("Packet Id"),
            h("Message"),
        ),
        ...tests.map(renderFailedTest),
    );
}

function renderFailedTest({ testNumber, reason, packetFailure }, n) {
    const d = (text) => td(
        [],
        ["class=center-text"],
        text,
    );

    return tr(
        [],
        [],
        d(n),
        d(testNumber),
        d(reason),
        () => {
            if (packetFailure) {
                return [
                    d(packetFailure.packetId),
                    d(packetFailure.message),
                ];
            } else {
                return [
                    d("N/A"),
                    d("N/A"),
                ];
            }
        },
    );
}

function renderTestResult(result) {
    return table(
        [],
        ["class=m-bot"],
        tr(
            [],
            [],
            td("Id"),
            td(result.id),
        ),
        tr(
            [],
            [],
            td("L2L1 version"),
            td(result.version),
        ),
        tr(
            [],
            [],
            td("Status"),
            td(
                [],
                [`class=result-${result.status}`],
                result.status,
            ),
        ),
        () => {
            if (result.status === "failed") {
                return tr(
                    [],
                    [],
                    td("Fail reason"),
                    td(result.failure.reason),
                );
            } else if (result.status === "succeeded") {
                return renderResultSuccess(result.success);
            } else {
                // TODO: replace this by null when rib is updated
                return [];
            }
        },
    );
}

function renderResultSuccess(success) {
    return [
        tr(
            [],
            [],
            td("No. of failed tests"),
            td(success.failedTests),
        ),
        tr(
            [],
            [],
            td("No. of total tests"),
            td(success.totalTests),
        ),
        tr(
            [],
            [],
            td("Success ratio"),
            td(formatSuccessRatio(success)),
        ),
    ];
}

function formatSuccessRatio(success) {
    const successfullTests = success.totalTests - success.failedTests;
    let successPercentage;

    if (success.totalTests !== 0) {
        successPercentage = (successfullTests / success.totalTests) * 100;
    } else if (success.failedTests !== 0 && success.totalTests ===  0) {
        successPercentage = "What?";
    } else { // Both are zero here
        successPercentage = "Kinda 100";
    }

    return `${successfullTests}/${success.totalTests} (${successPercentage}%)`;
}

/**
 * @param {string} requestId
 * @returns {Promise<object>}
 */
async function fetchTestResults(requestId) {
    return await fetch(`${RESULTS_PATH}/${requestId}`).then((res) => res.json());
}

function setupDevMode(enabled) {
    const btn = document.querySelector("#dev-panel-button");
    if (!enabled) {
        btn.addEventListener("click", () => alert("Hey! The dev mode is disabled!"));
        return;
    }

    const diag = dialog(
        [],
        ["class=modal grouping gapped"],
        div(
            [],
            [],
            h1(
                [],
                ["class= mono inline"],
                "Development panel",
            ),
            button(
                [],
                [
                    "class=close-button mono",
                    onClick(() => diag.get().close()),
                ],
                "Close",
            ),
        ),
        section(
            [],
            ["class=grouping grouping-flex-column gapped"],
            h1(
                [],
                ["class=mono"],
                "Endpoints",
            ),
            () => devEndpoints.map(renderEndpoint),
        ),
    );

    btn.addEventListener("click", () => diag.get().showModal());

    document.body.appendChild(diag.get());
}

function renderEndpoint({ name, components, callbacks, render }) {
    const paramsId = `${name.replaceAll(" ", "-")}-params`;
    const resultValue = new State("");
    const url = `${SERVER_ADDR}/${components.join("/")}`;

    return section(
        [],
        ["class=grouping gapped"],
        h1(
            [],
            ["class=mono"],
            name,
        ),
        p(
            [],
            [
                "class=mono",
                onClick((e) => copyTextToClipboard(url)),
            ],
            "URL: ",
            span(
                [],
                ["class=copy hover-pointer"],
                url,
            ),
        ),
        div(
            [],
            [
                "class=grouping-flex-row",
                style({
                    justifyContent: "space-between",
                }),
            ],
            table(
                [],
                [
                    "class=mono half-f",
                    `id=${paramsId}`
                ],
                tr(
                    [],
                    [],
                    th("Param"),
                    th("Value"),
                ),
                ...components.filter((c) => c[0] === ":").map((c) => {
                    const name = c.substring(1);

                    return tr(
                        [],
                        [],
                        td(
                            [],
                            [],
                            p(
                                [],
                                ["class=center-text"],
                                name,
                            ),
                        ),
                        td(
                            [],
                            [],
                            input(
                                [],
                                [
                                    "class=mono block center",
                                    `name=${name}`,
                                    "type=text",
                                ],
                            ),
                        ),
                    );
                }),
            ),
            textarea(
                [resultValue],
                [
                    "class=mono half-f",
                    "rows=20",
                    "cols=40",
                    "spellcheck=false",
                    "placeholder=Response",
                    attr("value", resultValue),
                ],
            ),
        ),
        div(
            [],
            [
                "class=grouping-flex-row",
                style({
                    columnGap: "1rem",
                }),
            ],
            button(
                [],
                [
                    "class=mono",
                    onClick(async () => {
                        const json = await fetchRouteComponents(document.querySelector(`#${paramsId}`), components);
                        resultValue.update(await render(json));
                    }),
                ],
                "Send",
            ),
            ...Object.entries(callbacks).map(([callbackName, callback]) => {
                return button(
                    [],
                    [
                        "class=mono",
                        onClick(async () => {
                            const callbackParams = {};

                            const inputs = document.querySelectorAll(`#${paramsId} input`);
                            for (const input of inputs) {
                                callbackParams[input.name] = input.value
                            }

                            await callback(callbackParams);
                        }),
                    ],
                    callbackName,
                );
            }),
        ),
    );
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        log("error", "Could not copy text: your browser does not support the clipboard API!")
    }
}

async function fetchRouteComponents(params, components) {
    let url = SERVER_ADDR;

    for (const component of components) {
        if (component[0] !== ":") {
            url += `/${component}`;
        } else {
            const name = component.substring(1);
            const value = params.querySelector(`input[name=${name}]`).value;
            url += `/${value}`;
        }
    }

    log("debug", `Built a URL for dev request: '${url}'`);

    return await fetch(url);
}

const logDestination = document.querySelector("#log-destination");

const logState = new State([]);

const logElem = div(
    [logState],
    [],
    () => logState.get().map(({ prefix, message }) => p([], [`class=mono log-msg log-msg-${prefix}`], `[${prefix}] ${message}`)),
);

logDestination.appendChild(logElem.get());

const MAX_LOG_PREFIX_LENGTH = "error".length;

function log(level, message) {
    let prefix = level;
    while (prefix.length < MAX_LOG_PREFIX_LENGTH) {
        prefix += " ";
    }

    logState.modify((logs) => logs.push({ prefix, message }));
}
