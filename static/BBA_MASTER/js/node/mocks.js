/* Stubs functions */
const document = {};
document.getElementById = (arg)=>{return {}};
function getElementById(arg){return {}}

const window = { performance: {memory: 0}};
function printMemoryStats() {}
const statistics = {
    numberOfSend: 0,
    data_to_send:{},
    statistics_save_new_session(){},
    add_parameters_to_session(parameters){},
    post_to_statistics_server(){},
    errors: [],
    send_error_to_server(errorMsg, errorObj){},
    sendErrorInterval: () => {}
}

function log( cat, lvl, msg, isLimitExceeded = false ) {
    const logLvlStr = [ 'Error', 'Warning', 'Info', 'Debug' ];
    console.log(`[${ cat }][${ logLvlStr[lvl] }]${ isLimitExceeded ? '[Limit exceeded]' : '' } ${ msg }`);
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
function alert(msg){logWarning("Alert", msg);}

var packetsTab_header_filterInput = {value: ""};

var l2l1_decode_msg = null;
function l2l1_loadScript( version ) {
    let fileContents = fs.readFileSync(`./js/l2l1/${ version }.js`).toString().replace('l2l1_decode_msg', 'l2l1_decode_msg_temp');
    fileContents += 'module.exports = { l2l1: l2l1_decode_msg_temp }';

    const result = eval(fileContents);
    l2l1_decode_msg = result.l2l1;

    logInfo( 'L2L1', `Loaded ${ version } version` );
}

function configDialog_setPrachCfgIdx_help(){
    logDebug('Mocked function: configDialog_setPrachCfgIdx_help()');
}
const configDialog = {
    setToUI: ()=>{logDebug('Mocked function: configDialog.setToUI()');},
    getFromUI: ()=>{logDebug('Mocked function: configDialog.getFromUI()');}
}

function makeLikeHrefOnClick( text, onClickFunc ) {
    return text;
}
function downloadFile(name, csvString){

    const resultDir = `${node_params.outDir}/save`;

    const fs = require('fs');
    if(fs.existsSync(resultDir) === false){
        fs.mkdirSync(resultDir);
    }

    fs.writeFileSync(`${resultDir}/${name}`, csvString);
}

function packetTable_renderColumns() {}

// TODO: REMOVE
var configDialog_antenna = {value: "0"};
var configureDialog_u = {value: "0"};
var configDialog_prachAntennaCombining_input = {value: ""};
var excludedColumnNames = [];