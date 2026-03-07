const fs = require('fs');

const resultDir = `${node_params.outDir}/custom`;
if(fs.existsSync(resultDir) === false){
    fs.mkdirSync(resultDir);
}

logInfo('Timing', 'Calculating Timing Statistics');
logInfo('Timing', `Using NTA Offset: ${config.load.ntaOffset_tc} Tc`);
logInfo('Timing', `Ignoring first ${noPacketsIgnore} packets for eCPRI Streams`);

let {X, Y, Ds, Dt, errors } = generateTimingValues_data();
const lr = generateTimingValues_linReg_dec(X, Y, Dt);
let message = generateTimingValues_linRegMsg(config.load.sync, Ds, lr.error.toNumber(), lr.coefs) + '\n';

errors.forEach(error => {
    message += `PTP vs PCAP: ${error}\n`
})
fs.writeFileSync(`${resultDir}/LinReg.txt`, message);

const noPacketsIgnore = config.analyze.timingAnalysis.noPacketsIgnore;

const data = generateTimingStats(TIMING_OPTIONS.ECPRI_STREAMS, noPacketsIgnore);
const csvString = new TableBuilder().ColumnsFromObject(data[0]).SetData(data).BuildCsv();
fs.writeFileSync(`${resultDir}/ecpriStreams.csv`, csvString);

logInfo('Results', `Results of timing analysis have been saved to ./${resultDir} directory`);