const logDialog = /** @type {LogDialog} */ getElementById('logDialog');

const logDialog_log = getElementById( 'logDialog_log' );
const logDialog_file_dropdown = getElementById('dialog_body_file_dropdown');

const logQueue = [];
const logChildrenPool = new Array(500);
logChildrenPool.length = 0;
let logTask = null;

class LogDialog extends Dialog {

    constructor(){
        super("Log");

    }

    getFromUI() {

    }
    setToUI() {

    }

    onOpen(){
        root_header_logStats.hidden = true;
        logStats.fill( 0 );
    }
}
customElements.define('bba-log-dialog', LogDialog);

let logStats = [0, 0, 0, 0];

// let logDialog_log_copy = []
let logDialog_filtering_checkboxes = [
    getElementById("dialog_body_cb_err"),
    getElementById("dialog_body_cb_warn"),
    getElementById("dialog_body_cb_info"),
    getElementById("dialog_body_cb_debug")
]

function logDialog_onClear(e){
    e.preventDefault();
    logQueue.length = 0;
    logDialog_log.innerHTML = "";
}

function logDialog_add_current_file(){
    let current_options = logDialog_file_dropdown.children;
    for(let i=0; i<current_options.length;i++){
        if(current_options.innerHTML === loadDialog_file[loadDialog_file.length-1].name) return;
    }
    current_options.innerHTML = loadDialog_file[loadDialog_file.length-1].name;
    let new_option = document.createElement('option');
    new_option.value = loadDialog_file[loadDialog_file.length-1].name;
    new_option.textContent = loadDialog_file[loadDialog_file.length-1].name;
    logDialog_file_dropdown.appendChild(new_option);
}

function logDialog_generate_entry(entryObj, repeats) {
    const p = document.createElement("p");
    p.style.backgroundColor = entryObj.colorStr;

    let times;
    if (repeats === 1) {
        times = "";
    } else {
        times = `[x${repeats}]`;
    }

    p.innerHTML = `${entryObj.timestamp} [${ entryObj.cat }][${ entryObj.logLvlStr }]\
        ${times}${ entryObj.isLimitExceeded ? '[Limit exceeded]' : '' } ${ entryObj.msg }`;

    return p;
}

//Function pushes object representing log entry into logQueue array
function log( cat, lvl, msg, isLimitExceeded = false ) {
    if( logDialog.hidden ) {
        if( lvl === 0 ) {
            logDialog.open();
        } else {
            ++logStats[lvl];
            root_header_logStats.hidden = false;
            for( let i = 0; i < 4; ++i ) root_header_logStatsSpans[i].textContent = logStats[i].toString();
        }
    }
    const logLvlStr = [ 'Error', 'Warning', 'Info', 'Debug' ];
    const color = [ '#ff9999', '#faef8e', '#96e3fa', '#9dfab3' ];

    let file_name = ''
    if(loadDialog_file.length) file_name = loadDialog_file[loadDialog_file.length-1].name;
    else if(ui_filename.value) file_name = ecog_config.filename;

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    const new_entry = {
        colorStr: color[lvl],
        cat: cat,
        logLvlStr: logLvlStr[lvl],
        lvl: lvl,
        isLimitExceeded: isLimitExceeded,
        msg: msg,
        fileName: file_name,
        timestamp : `${hh}:${mm}:${ss}`
    };

    logQueue.push(new_entry);

    if (logTask === null) {
        logTask = setTimeout(logTaskProc);
    }
}

function logTaskProc() {
    logDialog_log.innerHTML = "";
    let lastMsg = null;
    let msgRepeats = 1;

    for (let i = 0; i < logQueue.length; i++) {
        const logMsg = logQueue[i];

        if(!logDialog_filtering_checkboxes[ logMsg.lvl ].checked) continue;
        if(logMsg.fileName !== logDialog_file_dropdown.value && logDialog_file_dropdown.value!=="ALL") continue;

        if (lastMsg?.msg === logMsg.msg) {
            msgRepeats++;
            continue;
        }

        if(lastMsg !== null){
            const pLast = logDialog_generate_entry(lastMsg, msgRepeats);
            logChildrenPool.push(pLast);
        }

        msgRepeats = 1;
        lastMsg = logMsg;
    }

    if(logQueue.length > 0 && lastMsg !== null){ //Last msg has to be added after the loop
        const pCur = logDialog_generate_entry(lastMsg, msgRepeats);
        logChildrenPool.push(pCur);
    }

    logDialog_log.append(...logChildrenPool);

    logTask = null;
    logChildrenPool.length = 0;

    logDialog_log.scrollTo( 0, logDialog_log.scrollHeight );
}

function logCnt( cnt, cat, lvl, msg ) {
    if( cnt >= 0 ) {
        log( cat, lvl, msg, cnt === 0 );
    }
}

function logError( cat, msg ) { log( cat, 0, msg ) }
function logWarning( cat, msg ) { log( cat, 1, msg ) }
function logInfo( cat, msg ) { log( cat, 2, msg ) }
function logDebug( cat, msg ) { log( cat, 3, msg ) }

function logErrorCnt( cnt, cat, msg ) { logCnt( cnt, cat, 0, msg ) }
function logWarningCnt( cnt, cat, msg ) { logCnt( cnt, cat, 1, msg ) }
function logInfoCnt( cnt, cat, msg ) { logCnt( cnt, cat, 2, msg ) }
function logDebugCnt( cnt, cat, msg ) { logCnt( cnt, cat, 3, msg ) }
