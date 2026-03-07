function nodeAnalysis_timingStatistics(selection){

    if([undefined, 'all', 'ecpri', 'bip', 'seq'].includes(selection) === false){
        logError('Node', `Timing selection of ${selection} is unknown`);
        return;
    }

    const perfNow = performance.now();

    const noPacketsIgnore = config.analyze.timingAnalysis.noPacketsIgnore;
    const useFilteredPkts = config.analyze.useFilteredPkts;

    logInfo('Timing', 'Calculating Timing Statistics');
    logInfo('Timing', `Using NTA Offset: ${config.load.ntaOffset_tc} Tc`);
    logInfo('Timing', `Ignoring first ${noPacketsIgnore} packets for eCPRI Streams`);

    const resultDir = `${node_params.outDir}/timing`;

    const fs = require('fs');
    if(fs.existsSync(resultDir) === false){
        fs.mkdirSync(resultDir);
    }
    const genAndSave = (option, name) => {
        const data = generateTimingStats(option, noPacketsIgnore, useFilteredPkts);
        if(data.length === 0) return;
        const csvString = new TableBuilder().ColumnsFromObject(data[0]).SetData(data).BuildCsv();
        fs.writeFileSync(`${resultDir}/${name}.csv`, csvString);
    }

    let {X, Y, Ds, Dt, errors } = generateTimingValues_data();
    const lr = generateTimingValues_linReg_dec(X, Y, Dt);
    let message = generateTimingValues_linRegMsg(config.load.sync, Ds, lr.error.toNumber(), lr.coefs) + '\n';

    errors.forEach(error => {
        message += `PTP vs PCAP: ${error}\n`
    })
    fs.writeFileSync(`${resultDir}/LinReg.txt`, message);

    const genBip = ()=>{
        genAndSave(TIMING_OPTIONS.BIP_PTP, 'bip_ptp');
        genAndSave(TIMING_OPTIONS.BIP_DT, 'bip_dt');
    }
    const genEcpri = ()=>{
        genAndSave(TIMING_OPTIONS.ECPRI_STREAMS, 'ecpri_streams');
    }
    const genSeq = ()=>{
        genAndSave(TIMING_OPTIONS.SEQ_UP, 'seq_up');
        genAndSave(TIMING_OPTIONS.SEQ_FCP_XRAN, 'seq_fcp_xran');
        genAndSave(TIMING_OPTIONS.SEQ_FCP_DCM, 'seq_fcp_dcm');
    }

    if(selection === undefined || selection === "all"){
        genBip();
        genEcpri();
        genSeq();
    } else if(selection === 'bip'){
        genBip();
    } else if(selection === 'ecpri'){
        genEcpri();
    } else if(selection === 'seq'){
        genSeq();
    }

    logInfo('Results', `Results of timing analysis have been saved to ./${resultDir} directory`);

    logInfo( 'Node', `Timing statistics analysis finished. Took: ${ perfToMsFrom( perfNow ) }` +
        ( window.performance.memory ? ( `. Memory usage: ${ formatBytes( window.performance.memory.totalJSHeapSize ) }` ) : '' ) );
}