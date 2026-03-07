const analyzeDialog = /** @type {AnalyzeDialog} */ getElementById('analyzeDialog');

const analyze_filtered_packets_checkbox = getElementById('analyze_filtered_packets_checkbox');

const analyzeDialog_view_description = getElementById('analyzeDialog_view_description');
const analyzeDialog_view_description_box = getElementById('analyzeDialog_view_description_box');

const analyzeDialog_view_bip_completeness_table_body = getElementById('analyzeDialog_view_bip_completeness_table_body');

const analyzeDialog_view_l1_allocations_nprb = getElementById("analyzeDialog_view_l1_allocations_nprb");
const analyzeDialog_view_l1_allocations_dl = getElementById('analyzeDialog_view_l1_allocations_dl');
const analyzeDialog_view_l1_allocations_ul = getElementById('analyzeDialog_view_l1_allocations_ul');

const analyzeDialog_view_antenna_info = getElementById('analyzeDialog_view_antenna_info');
const analyzeDialog_view_antenna_info_table_body = getElementById('analyzeDialog_view_antenna_info_table_body');

const analyzeDialog_view_packet_errors = getElementById('analyzeDialog_view_packet_errors_list');

const analyzeDialog_check_bip_callGraphs = getElementById('analyzeDialog_check_bip_callGraphs');
const analyzeDialog_check_bip_callTables = getElementById('analyzeDialog_check_bip_callTables');
const analyzeDialog_check_bip_call_emptyPlotInfo = getElementById('analyzeDialog_check_bip_call_emptyPlotInfo');
const analyzeDialog_check_bip_call_constants = getElementById('analyzeDialog_check_bip_call_constants');
const analyzeDialog_check_bip_call_selectRnti = getElementById('analyzeDialog_check_bip_call_selectRnti');

const analyzeDialog_view_timing_analysis = getElementById('analyzeDialog_view_timing_analysis');
const analyzeDialog_view_timing_analysis_noPacketsIgnore = getElementById('analyzeDialog_view_timing_analysis_noPacketsIgnore');
const analyzeDialog_view_timing_analysis_results = getElementById('analyzeDialog_view_timing_analysis_results');

const analyzeDialog_view_check_ecpri_pattern = getElementById('analyzeDialog_check_ecpri_pattern');

const analyzeDialog_view_ppaas_job_detection = getElementById('analyzeDialog_ppaas_job_detection');

const analyzeDialog_find_best_shift = getElementById( 'analyzeDialog_find_best_shift' );
const analyzeDialog_find_best_shift_select = getElementById("analyzeDialog_find_best_shift_select");
const analyzeDialog_find_best_shift_table_body = getElementById('analyzeDialog_find_best_shift_table_body');

const analyzeDialog_deep_checker_result = getElementById('analyzeDialog_deep_checker_result');
const analyzeDialog_deep_checker_table_body = getElementById('analyzeDialog_deep_checker_table_body');

const analyzeDialog_view_pdp_prach_graph = getElementById('analyzeDialog_pdp_graph');
const analyzeDialog_pdp_message = getElementById('analyzeDialog_pdp_message');

const analyzeDialog_view_hac_rx = getElementById('analyzeDialog_hac_rx');

class AnalyzeDialog extends Dialog {

    constructor(){
        super("Analyze");

    }

    getFromUI() {
        analyzeDialog_timingAnalysis_getFromUI();
    }
    setToUI() {
        analyzeDialog_timingAnalysis_setToUI();
    }

    onLoad(){
        this.setToUI();
    }

    onOpen(){
        greyOutUnimportantTab();
    }
}
customElements.define('bba-analyze-dialog', AnalyzeDialog);

function analyzeDialog_hideAll(){
    const views = document.getElementsByClassName("analyzeDialog_view");
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none";
    }

    analyzeDialog_view_description.innerHTML = '';
}
function analyzeDialog_getPackets() {
    const analyzeOnlyFilteredCheckbox = analyze_filtered_packets_checkbox;
    let filteredPackets = [];

    if (analyzeOnlyFilteredCheckbox.checked) {
        for (const packetId of filteredPacketsIds) {
            filteredPackets.push(packets[packetId]);
        }
    } else {
        filteredPackets = packets;
    }
    return filteredPackets
}
function analyzeDialog_open( name ) {
    analyzeDialog_hideAll();
    analyzeDialog.setToUI();    // we discard unsaved changes, so there's no mismatch between UI and config

    const elem = getElementById(name);
    if(elem === undefined) return;

    elem.style.display = "inherit";

    analyzeDialog_view_description.innerHTML = '';

    highlightActiveButton(name);

    const filteredPackets = analyzeDialog_getPackets();

    switch(name){
        case 'analyzeDialog_view_bip_completeness':
            analyzeDialog_bip_completeness(filteredPackets);
            analyzeDialog_view_description.innerHTML = 'Algorithm checks whether BIP Event Sequence Number is continuous per BIP StreamId, per MAC Source'
            break;
        case 'analyzeDialog_view_l1_allocations':
            analyzeDialog_l1_allocations(filteredPackets);
            analyzeDialog_view_description.innerHTML =
                `Algorithm checks if L1 allocations overlap or extend outside max PRB limit<br>
                UlData:: PuschReceiveReq, PucchReceiveReq, SrsReceiveReq, PrachReceiveReq<br>
                DlData:: PdschSendReq, PdcchSendReq, SsBlockSendReq, CsiRsSendReq`
            break;
        case 'analyzeDialog_view_antenna_info':
            analyzeDialog_show_antenna_info(filteredPackets);
            break;
        case 'analyzeDialog_view_packet_errors':
            analyzeDialog_show_packet_errors(filteredPackets);
            break;
        case 'analyzeDialog_check_bip_call':
            analyzeDialog_check_bip_call_prepare(filteredPackets);
            break;
        case 'analyzeDialog_view_timing_analysis':
            analyzeDialog_timing_analysis(filteredPackets);
            break;
        case 'analyzeDialog_check_ecpri_pattern':
            analyzeDialog_view_description.innerHTML =
                'Detects overlapping eCPRI C-Plane section types in symbols.<br>' +
                '<span style="background-color: #7070FF">U</span> - UpLink SectionType 1, <span style="background-color: #70FF70">D</span> - DownLink SectionType 1<br>' +
                '<span style="background-color: #C0C0FF">R</span> - UpLink SectionType =/= 1, <span style="background-color: #C0FFC0">B</span> - DownLink SectionType =/= 1<br>' +
                '<span style="background-color: red"><a style="text-decoration: underline; cursor: pointer;">!<a/></span> - Collision (click to apply filter)';
            analyzeDialog_check_ecpri_pattern(filteredPackets);
            break;
        case 'analyzeDialog_ppaas_job_detection':
            analyzeDialog_view_description.innerHTML =
                'Click on specific row to instantly open data related to this job.'
            analyzeDialog_ppaas_job_detection(filteredPackets);
            break;
        case 'analyzeDialog_find_best_shift':
            analyzeDialog_view_description.innerHTML =
                'Analyze cyclic prefixes in order to find the best sample shift (it may take a while).';
            analyzeDialog_find_best_sample_shift_setUI(filteredPackets);
            break;
        case 'analyzeDialog_find_numerology_sampling':
            analyzeDialog_view_description.innerHTML =
                'Analyze cyclic prefixes in order to find correct numerology, sampling and sample shift. <br>(Warning - this is a experimental function. It will work best on perfect downlink signal)';
            analyzeDialog_find_numerology_and_sampling_setUI();
            break;
        case 'analyzeDialog_deep_checker':
            analyzeDialog_view_description.innerHTML =
                'Deeply verify L2L1+eCPRI correctness. It adds column \"deep_checker\" at the end of the \"Packets\" table';
            analyzeDialog_deepChecker(filteredPackets);
            break;
        case 'analyzeDialog_pdp_prach':
            analyzeDialog_view_description.innerHTML =
                'Draw PDP PRACH root plots per job';
            analyzeDialog_pdp_prach(filteredPackets);
            break;
        case 'analyzeDialog_hac_rx':
            analyzeDialog_view_description.innerHTML =
                'HAC-RX: download different types of payload per job ';
            analyzeDialog_hac_rx(filteredPackets);
            break;
    }

    if(analyzeDialog_view_description.innerHTML.length)
        analyzeDialog_view_description_box.style.display = 'block';
    else
        analyzeDialog_view_description_box.style.display = 'none';
}

function analyzeDialog_bip_completeness(packets) {
    analyzeDialog_view_bip_completeness_table_body.innerHTML = '';

    const result = bip_completeness(packets);

    if (Object.entries(result).length === 0) {
        analyzeDialog_view_bip_completeness_table_body.innerHTML = "<h2>No BIP packets found</h2>";
    } else {
        for (const stream in result) {
            for (const macSrc in result[stream]) {
                const row = analyzeDialog_view_bip_completeness_table_body.insertRow();

                const streamCell = row.insertCell();
                streamCell.appendChild(document.createTextNode(`${stream}`));

                const macCell = row.insertCell();
                macCell.appendChild(document.createTextNode(`${macSrc}`));

                const statusCell = row.insertCell();
                statusCell.appendChild(document.createTextNode(result[stream][macSrc].ok ? "Ok" : `Failed on Packet ${result[stream][macSrc].failedPacket}`));
            }
        }
    }
}

function analyzeDialog_l1_allocations(packets){
    analyzeDialog_view_l1_allocations_nprb.innerHTML = '';
    analyzeDialog_view_l1_allocations_dl.innerHTML = '';
    analyzeDialog_view_l1_allocations_ul.innerHTML = '';

    const nprb = config.load.nprb;

    analyzeDialog_view_l1_allocations_nprb.innerHTML = nprb.toString();
    const errors = check_l1_allocations(packets, nprb);

    if(errors.DL.size === 0){
        const status = document.createElement('b');
        status.innerHTML = "OK";
        analyzeDialog_view_l1_allocations_dl.appendChild(status);
    }
    else{
        errors.DL.forEach(error => {
            const row = document.createElement('div');
            row.appendChild(document.createTextNode(error));
            analyzeDialog_view_l1_allocations_dl.appendChild(row);
        });
    }

    if(errors.UL.size === 0){
        const status = document.createElement('b');
        status.innerHTML = "OK";
        analyzeDialog_view_l1_allocations_ul.appendChild(status);
    }
    else{
        errors.UL.forEach(error => {
            const row = document.createElement('div');
            row.appendChild(document.createTextNode(error));
            analyzeDialog_view_l1_allocations_ul.appendChild(row);
        });
    }
}

const FREQUENCY_U_kHz = [15, 30, 60, 120, 240, "Reserved", 1.25, "3.75 (LTE-specific)", 5, "7.5 (LTE-specific)"];

function analyzeDialog_show_antenna_info(packets){
    analyzeDialog_view_antenna_info_table_body.innerHTML = "";

    if (Object.entries(ecpri_defaultU).length === 0) {
        analyzeDialog_view_antenna_info_table_body.innerHTML = "<h2>No eCPRI antennas found</h2>";
    } else {
        for (const [antIdStr, u] of Object.entries(ecpri_defaultU)) {
            const andId = parseInt(antIdStr);

            const tr = document.createElement("tr");

            const td_1 = document.createElement("td");
            const td_2 = document.createElement("td");
            const td_3 = document.createElement("td");
            const td_4 = document.createElement("td");

            td_1.innerText = AntIdToRtcid(andId).toString();
            td_2.innerText = u.toString();
            td_3.innerHTML = FREQUENCY_U_kHz[u];

            td_4.innerHTML = (AntIdToDir(andId) === 0) ? "UL" : "DL";

            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);

            analyzeDialog_view_antenna_info_table_body.appendChild(tr);
        }
    }
}

function analyzeDialog_show_packet_errors(packets) {
    analyzeDialog_view_packet_errors.innerHTML = '';

    const label = document.createElement("label");
    label.innerText = "Show errors from packet: ";
    const fromI = document.createElement("input");
    fromI.value = "0";
    const toI = document.createElement("input");
    toI.value = "100";
    const label2 = document.createElement("label");
    label2.innerText = " to: ";

    const button = document.createElement("button");
    button.innerText = "Show errors!";
    analyzeDialog_view_packet_errors.appendChild(label);
    analyzeDialog_view_packet_errors.appendChild(fromI);
    analyzeDialog_view_packet_errors.appendChild(label2);
    analyzeDialog_view_packet_errors.appendChild(toI);
    analyzeDialog_view_packet_errors.appendChild(button);

    button.addEventListener("click", () => {
        const packets = analyzeDialog_getPackets();
        const from = isNaN(parseInt(fromI.value)) || parseInt(fromI.value) < 0 ? 0 : parseInt(fromI.value);
        const to = isNaN(parseInt(toI.value)) || parseInt(toI.value) >= packets.length ? packets.length - 1 : parseInt(toI.value);
        for (let i = from; i <= to; i++) {
            validate_packet(i);
            if (packet_errors_list[i]) {
                for (let j in packet_errors_list[i]) {
                    const p = document.createElement("p");
                    p.innerText = packet_errors_list[i][j].toString()
                    analyzeDialog_view_packet_errors.appendChild(p)
                }
            }
        }
        if (analyzeDialog_view_packet_errors.children.length === 5) analyzeDialog_view_packet_errors.innerHTML += "<h2>No errors found</h2>";
    })
}

function analyzeDialog_check_bip_callDestroyGraphs() {
    analyzeDialog_check_bip_callGraphs.replaceChildren();
}

function analyzeDialog_check_bip_call_prepare(packets){
    const u = ecpri_maxU;
    const cfoFactor = l2l1Utils_getCfoFactor(u);
    analyzeDialog_check_bip_call_constants.innerHTML = '';
    analyzeDialog_check_bip_call_constants.innerHTML +=
        `<p style="display: inline">Using: u = maxU = ${u};
            <div class="tooltip">cfoFactor<span class="tooltip_text">${l2l1Utils_getCfoFactorDescription()}</span></div>
         = ${cfoFactor};
        </p>`;

    analyzeDialog_check_bip_call_selectRnti.innerHTML = '';
    const rntis = l2l1Utils_getAllRnti();

    analyzeDialog_check_bip_call_selectRnti.innerHTML +=
        `<option value="0">0 (All)</option>`;

    rntis.filter(rnti => rnti !== 0).forEach(rnti => {
        analyzeDialog_check_bip_call_selectRnti.innerHTML +=
            `<option value="${rnti}">${rnti}</option>`;
    })
}

function analyzeDialog_check_bip_call_button() {
    const packets = analyzeDialog_getPackets();
    analyzeDialog_check_bip_call(packets);
}

function analyzeDialog_check_bip_call(packets){
    analyzeDialog_check_bip_callDestroyGraphs();
    analyzeDialog_check_bip_call_emptyPlotInfo.innerHTML = "";

    const rnti = parseInt(analyzeDialog_check_bip_call_selectRnti.value);
    const u = ecpri_maxU;
    const cfoFactor = l2l1Utils_getCfoFactor(u);

    const data = check_bip_call(packets, rnti, u, cfoFactor);
    const dataExtras = check_bip_call_extras(packets, rnti);

    const plots = [
        {name: "UlData::PucchReceiveRespPs - Sinr", x: [data.pucchRespPs.time], y: [data.pucchRespPs.sinr]},
        {name: "UlData::PuschReceiveRespPs - Sinr", x: [data.puschRespPs.time], y: [data.puschRespPs.sinr]},

        {name: "UlData::PucchReceiveRespPs - ShortTermTaMetric", x: [data.pucchRespPs.time], y: [data.pucchRespPs.shortTermTaMetric]},
        {name: "UlData::PuschReceiveRespPs - ShortTermTaMetric", x: [data.puschRespPs.time], y: [data.puschRespPs.shortTermTaMetric]},

        {name: "UlData::PuschReceiveRespPs - ShortTermCfoMetric", x: [data.puschRespPs.time], y: [data.puschRespPs.shortTermCfoMetric]},

        {name: "UlData::PuschReceiveReq - LongTermCfoMetric",   x: [data.puschReq.time],        y: [data.puschReq.longTermCfoMetric]},
        {name: "UlDataFH::PuschReceiveReq - LongTermCfoMetric", x: [data.puschReqFH.time],      y: [data.puschReqFH.longTermCfoMetric]},

        {name: "DlData::PdschSendReq - MCS", x: [data.pdschReq.time], y: [data.pdschReq.mcs]},
        {name: "UlData::PuschReceiveReq - MCS", x: [data.puschReq.time], y: [data.puschReq.mcs]},

        {name: "UlData::PucchReceiveRespHarqD - DTX", x: [data.pucchRespHarqD.time], y: [data.pucchRespHarqD.dtx]},
        {name: "UlData::PuschReceiveRespHarqU - DTX", x: [data.puschRespHarqU.time], y: [data.puschRespHarqU.dtx]},

        {name: "UlData::PucchReceiveRespHarqD - CRC", x: [data.pucchRespHarqD.time], y: [data.pucchRespHarqD.crc]},
        {name: "UlData::PuschReceiveRespHarqU - CRC", x: [data.puschRespHarqU.time], y: [data.puschRespHarqU.crc]},

        {name: "DlData::PdschSendReq - rvIndex", x: [data.pdschReq.time], y: [data.pdschReq.rvIndex]},

        {name: "UlData::PrachReceiveInd - Message Received", x: [data.prachInd.time], y: [data.prachInd.val]},

        {name: "eCPRI UL rms_dBFS", x: [data.Ulrms_dBFS.time], y: [data.Ulrms_dBFS.rms_dBFS]},
        {name: "eCPRI DL rms_dBFS", x: [data.Dlrms_dBFS.time], y: [data.Dlrms_dBFS.rms_dBFS]},

        {name: "TAC", x: [dataExtras.TAC_time], y: [dataExtras.TAC_val]},
        {name: "DlData::PdschSendReq - Throughput", x: dataExtras.pdschTputVisible ? [dataExtras.pdschTputTime] : [], y: dataExtras.pdschTputVisible ? [dataExtras.pdschTputValue] : []},
        {name: "UlData::PuschReceiveReq - Throughput", x: dataExtras.puschTputVisible ? [dataExtras.puschTputTime] : [], y: dataExtras.puschTputVisible ? [dataExtras.puschTputValue] : []},
    ];

    const emptyPlots = [];

    let figId = 1;
    plots.forEach(plotData => {
        if( plotData.x.every( setX=> (setX === undefined || setX.length === 0) ) ){
            emptyPlots.push(plotData);
            return;
        }

        const graph = document.createElement('bba-graph2d');
        graph.caption = `Fig ${figId++}. ${plotData.name}`;
        graph.width = 600;
        graph.height = 150;

        analyzeDialog_check_bip_callGraphs.appendChild(graph);

        graph.graph2d.draw(plotData.x, plotData.y);
    });

    if(emptyPlots.length !== 0) analyzeDialog_check_bip_call_emptyPlotInfo.innerHTML = "No data found for graphs:";
    emptyPlots.forEach(plot=>{
        analyzeDialog_check_bip_call_emptyPlotInfo.innerHTML += `<p>${plot.name}</p>`;
    })

    analyzeDialog_check_bip_callTables.innerHTML = "";
    analyzeDialog_puschCrcDtxStatsTable(rnti, data.puschRespPs, data.puschRespHarqU);
    analyzeDialog_puschFirstTransmisionTimeTable(rnti, data.puschReq);
}

function analyzeDialog_puschCrcDtxStatsTable(rnti, puschRespPs, puschRespHarqU){

    puschRespPs.crc = puschRespHarqU.crc;
    let tableData = {};
    if(!puschRespPs.rnti) return;
    for(let i = 0; i < puschRespPs.rnti.length; i++){

        if(puschRespPs.rnti[i] !== rnti && rnti !== 0) continue;

        if(!tableData[puschRespPs.rnti[i]])
            tableData[puschRespPs.rnti[i]] = {RNTI:puschRespPs.rnti[i], Total:0, CRC:0, DTX:0, 'Average SINR':0 };

        tableData[puschRespPs.rnti[i]].Total++;
        if(puschRespPs.dtx[i])
            tableData[puschRespPs.rnti[i]].DTX += puschRespPs.dtx[i];

        if(puschRespPs.crc[i])
            tableData[puschRespPs.rnti[i]].CRC += puschRespPs.crc[i];

        if(puschRespPs.sinr[i])
            tableData[puschRespPs.rnti[i]]['Average SINR'] += puschRespPs.sinr[i];
    }

    for(let i of Object.keys(tableData)){
        tableData[i]['Average SINR'] /= tableData[i].Total;
        tableData[i]['Average SINR'] = Math.round((tableData[i]['Average SINR']) * 100) / 100;

        const percentage = Math.round((tableData[i].DTX/tableData[i].Total) * 10000) / 100;
        tableData[i].DTX = `${tableData[i].DTX} (${percentage}%)`;

        const percentage2 = Math.round((tableData[i].CRC/tableData[i].Total) * 10000) / 100;
        tableData[i].CRC = `${tableData[i].CRC} (${percentage2}%)`;
    }

    const table = createMultipleColsInfoTable(tableData, "PUSCH DTX and CRC statistics", ['RNTI', 'Total', 'DTX', 'CRC', 'Average SINR'], Object.keys(tableData).length);
    const enclosing_div = document.createElement('div');
    enclosing_div.appendChild(table);
    analyzeDialog_check_bip_callTables.appendChild(enclosing_div);
}

function analyzeDialog_puschFirstTransmisionTimeTable(rnti, puschReq){

    let firstTimestampsForPusch = {};
    let s = '<div><table style="background-color:#ffffff">\n<tr style="background-color:#c0c0ff"><td colspan=4>PuschReceiveReq first transmission</td></tr>\n' +
        '<tr><td>RNTI</td><td>Timestamp</td></tr>'

    for(let i = 0; i < packets.length; i++){
        if(packets[i].l2l1 && packetPropToStrMap['l2l1.message'][packets[i].l2l1.message].includes("PuschReceiveReq")){
            const l2l1 = packets[i].l2l1;
            if(l2l1.subcells && l2l1.subcells.length){
                for(let j = 0; j < l2l1.subcells.length; j++){
                    if(l2l1.subcells[j].grants && l2l1.subcells[j].grants.length) {
                        for (let k = 0; k < l2l1.subcells[j].grants.length; k++) {
                            if (!firstTimestampsForPusch[l2l1.subcells[j].grants[k].rnti] && (l2l1.subcells[j].grants[k].rnti === rnti || rnti === 0)) {
                                firstTimestampsForPusch[l2l1.subcells[j].grants[k].rnti] = true;
                                s += '<tr><td>' + l2l1.subcells[j].grants[k].rnti + '</td><td>' + packets[i].time.toString() + '</td></tr>';
                            }
                        }
                    }
                }
            }
        }
    }

    s += '</div></table>';
    if(Object.keys(firstTimestampsForPusch).length !== 0){
        analyzeDialog_check_bip_callTables.innerHTML += s;
    }
}

function analyzeDialog_view_timing_analysis_noPacketsIgnore_onBlur(){
    analyzeDialog_timingAnalysis_getFromUI();
    analyzeDialog_open('analyzeDialog_view_timing_analysis');
}
function analyzeDialog_timingAnalysis_getFromUI(){
    config.analyze.timingAnalysis.noPacketsIgnore = parseInt(analyzeDialog_view_timing_analysis_noPacketsIgnore.value);
}
function analyzeDialog_timingAnalysis_setToUI(){
    analyzeDialog_view_timing_analysis_noPacketsIgnore.value = config.analyze.timingAnalysis.noPacketsIgnore;
}
function analyzeDialog_timing_analysis(packets) {
    let statsDivData = '';
    analyzeDialog_view_timing_analysis_results.innerHTML = '';
    const noPacketsIgnore = config.analyze.timingAnalysis.noPacketsIgnore;

    const generateTimingStatsHelper = (mode, name) =>{
        const stats = generateTimingStats(packets, mode, noPacketsIgnore);
        statsDivData += `<h3 style="margin-top: 1rem">${name}</h3>`
        if(stats.length){
            const statsTable = new TableBuilder().ColumnsFromObject(stats[0]).SetData(stats).BuildHTML();
            statsDivData += statsTable;
        }
    }

    if (packetTable_allColumnNames.includes('dt_us')) {
        try {
            if (packetTable_allColumnNames.includes('eCpriDelayPtpUs')) {
                generateTimingStatsHelper(TIMING_OPTIONS.BIP_PTP, "BIP message timings (with PTP compensation)");
            } else {
                generateTimingStatsHelper(TIMING_OPTIONS.BIP_DT, "BIP message timings (without knowing exact time)");
            }
        } catch (e) {
            analyzeDialog_view_timing_analysis_results.innerHTML += 'BIP statistics calculation failed';
            logDebug('BIP', "BIP statistics calculation failed");
        }
    }

    if(packetTable_allColumnNames.includes('eCpriDelayPtpUs') === false){
        statsDivData += '<h3 style="margin-top: 1rem">No \'eCpriDelayPtpUs\' column exists. Try different synchronization options.</h3>';
        analyzeDialog_view_timing_analysis_results.innerHTML += statsDivData
        return;
    }

    try {
        generateTimingStatsHelper(TIMING_OPTIONS.ECPRI_STREAMS, `eCPRI streams delays (ignoring first ${noPacketsIgnore} packets)`);

        generateTimingStatsHelper(TIMING_OPTIONS.SEQ_UP, "U-plane SequenceID continue");
        generateTimingStatsHelper(TIMING_OPTIONS.SEQ_FCP_XRAN, "FCP SequenceID continuous per xRAN");
        generateTimingStatsHelper(TIMING_OPTIONS.SEQ_FCP_DCM, "FCP SequenceID continuous per DCM (obsolete)");

        analyzeDialog_view_timing_analysis_results.innerHTML += statsDivData

    } catch (e) {
        analyzeDialog_view_timing_analysis_results.innerHTML += 'eCPRI statistics calculation failed';
        logDebug('eCPRI', "eCPRI statistics calculation failed");
    }
}

function analyzeDialog_check_ecpri_pattern(packets){
    analyzeDialog_view_check_ecpri_pattern.innerHTML = "";

    const {pmap, slotEnable, numSlots, frameMin, frameMax, error} = check_ecpri_pattern(packets);
    if(error){
        analyzeDialog_view_check_ecpri_pattern.innerHTML = error;
        return 0;
    }

    let tableStr = "<TABLE cellspacing=0 cellpadding=0 border=0 style='font-family:\"Courier New\", Courier, monospace; font-size:8px'><TR><TD>Frame</TD><TD>Subframe</TD>";

    for( let slot= 0; slot < numSlots; ++slot){
        if (slotEnable[slot]){
            tableStr+="<td colspan=14> Slot "+slot+"</td>";
        }
    }

    tableStr+="</tr>";
    const patternLength = frameMax - frameMin + 1;
    for( let frame= 0; frame < patternLength; ++frame) {
        const realFrame = frame + frameMin;
        for(let subframe= 0; subframe < 10; ++subframe) {
            tableStr+=`<TR><TD>${realFrame}</TD> <TD>${subframe}</TD>`;

            let slot_indexed= 0;
            for( let slot= 0; slot < numSlots; ++slot) {
                if (slotEnable[slot] === false) continue;

                ++slot_indexed;
                const slotBgColor = (slot_indexed % 2) ? "#C0C0C0" : "#FFFFFF";
                for( let symbol= 0; symbol < 14; ++symbol) {
                    const index= ((frame*10+subframe)*numSlots+slot)*14 + symbol;
                    switch(pmap[index]) {
                        case 0:     tableStr+=`<td style="background-color: ${ slotBgColor }">_</td>`; break;
                        case 1:     tableStr+=`<td style="background-color: #7070FF">U</TD>`; break;
                        case 2:     tableStr+=`<td style="background-color: #70FF70">D</TD>`; break;
                        case 4:     tableStr+=`<td style="background-color: #C0C0FF">R</TD>`; break;
                        case 8:     tableStr+=`<td style="background-color: #C0FFC0">B</TD>`; break;
                        default:
                            const filter = `@ecpri.frameId===${realFrame} && @ecpri.subframeId===${subframe} && @ecpri.slotId===${slot} && @ecpri.startSymbolId===${symbol}`;
                            tableStr+=`<td style="background-color: red" onclick="packetsTab_filterPackets('${filter}')"><a style="text-decoration: underline; cursor: pointer;">!<a/></td>`;
                            break;

                    }
                }
            }
            tableStr+="</tr>\n";
        }
    }
    tableStr+="</table>";

    analyzeDialog_view_check_ecpri_pattern.innerHTML = tableStr;
}

function analyzeDialog_ppaas_job_detection(packets) {
    let jobDetectionDivData = '';
    usedConfigIds = [];
    const generateJobDetectionDataHelper = (mode, name, jobId) => {
        let data = generatePpaasJobDetectionData(packets, mode, jobId);

        if (mode === PPAAS_JOB_DETECTION_OPTIONS.FIFO_CONFIG) {
            data.forEach((element, index) => {
                name = index === 0 ? 'Input FIFOs Configuration' : 'Output FIFOs Configuration';

                jobDetectionDivData += `<h3 style="margin-top: 1rem">${name}</h3>`;
                if (element.length) {
                    const statsTable = new TableBuilder().ColumnsFromObject(element[0]).SetData(element).BuildHTML();
                    jobDetectionDivData += statsTable;
                }
            })
        } else {
            jobDetectionDivData += `<h3 style="margin-top: 1rem">${name}</h3>`;
            if (data.length) {
                const statsTable = new TableBuilder().ColumnsFromObject(data[0]).SetData(data).BuildHTML();
                jobDetectionDivData += statsTable;
            }
        }
    };

    if (pmFile.length === 0) {
        jobDetectionDivData += '<h3 style="margin-top: 1rem">There was no PM file loaded.</h3>';
        analyzeDialog_view_ppaas_job_detection.innerHTML = jobDetectionDivData;
        return;
    }

    try {
        generateJobDetectionDataHelper(PPAAS_JOB_DETECTION_OPTIONS.JOB_TOTAL_TIME, "Job total time");
        analyzeDialog_view_ppaas_job_detection.innerHTML = jobDetectionDivData;
        jobDetectionDivData = '';
    } catch (e) {
        analyzeDialog_view_ppaas_job_detection.innerHTML = 'Job detection failed';
        logDebug('eCPRI', "Ppaas job detection calculation failed");
        return;
    }

    jobDetectionDivData += `<input type="button" value="Expand / hide all jobs" onClick="toggleAllJobs()">`;

    try {
        for (let i = 0; i < jobsData.length; i++) {
            jobDetectionDivData += `<span><input type="button" style="width: 150px" value="Job ${jobsData[i].jobId} PE ${jobsData[i].peId}" onclick="jobToggle(${i})">` +
                `<input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadStreamData('bin', ${i})">` +
                `<input type="button" hidden style="width: 160px" value="Download [hex]" onclick="downloadStreamData('hex', ${i})"></span>` +
                `<div id="job_${i}" class="job_detection" hidden>`;

            generateJobDetectionDataHelper(PPAAS_JOB_DETECTION_OPTIONS.FIFO_CONFIG, "FIFOs Configuration", i);
            generateJobDetectionDataHelper(PPAAS_JOB_DETECTION_OPTIONS.RX_STREAMS, "RX streams", i);
            generateJobDetectionDataHelper(PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS, "TX streams", i);
            jobDetectionDivData += '</div>';
        }
        analyzeDialog_view_ppaas_job_detection.innerHTML += jobDetectionDivData;
    } catch (e) {
        jobDetectionDivData += '</div>';
        jobDetectionDivData += `<h3 style="margin-top: 1rem; color: red">${e}</h3>`;
        analyzeDialog_view_ppaas_job_detection.innerHTML += jobDetectionDivData;
        logDebug('eCPRI', "Ppaas job detection calculation failed");
    }

    for (let i = 0; i < jobsData.length; i++) {
        if (getElementById(`job_${i}`)) {
            markErrorsInJobs(i);
            checkDataAmount(i);
            makeJobRowClickable(i, 'ppaas');
        }
    }

    checkAssertions(packets);
}

function jobToggle(id, isHacRx = false) {
    if (isHacRx) {
        getElementById(`hac_job_${id}`).hidden = !getElementById(`hac_job_${id}`).hidden;
    } else {
        getElementById(`job_${id}`).hidden = !getElementById(`job_${id}`).hidden;
    }
}

function toggleAllJobs(isHacRx = false) {
    if (isHacRx) {
        if (getElementById(`hac_job_0`).hidden) {
            for (let i = 0; i < jobsData.length; i++) {
                if (getElementById(`hac_job_${i}`)) {
                    getElementById(`hac_job_${i}`).hidden = false;
                }
            }
        } else {
            for (let i = 0; i < jobsData.length; i++) {
                if (getElementById(`hac_job_${i}`)) {
                    getElementById(`hac_job_${i}`).hidden = true;
                }
            }
        }
    } else {
        if (getElementById(`job_0`).hidden) {
            for (let i = 0; i < jobsData.length; i++) {
                if (getElementById(`job_${i}`)) {
                    getElementById(`job_${i}`).hidden = false;
                }
            }
        } else {
            for (let i = 0; i < jobsData.length; i++) {
                if (getElementById(`job_${i}`)) {
                    getElementById(`job_${i}`).hidden = true;
                }
            }
        }
    }
}

function markErrorsInJobs(id) {
    if (getElementById(`job_${id}`).children.length !== 8) analyzeDialog_view_ppaas_job_detection.children[1].children[1].children[id].classList.add('malformed');
}

function checkDataAmount(id) {
    if (getElementById(`job_${id}`).children[1] && getElementById(`job_${id}`).children[5]) {
        for (let i = 0; i < getElementById(`job_${id}`).children[1].children[1].children.length; i++) {
            for (let j = 0; j < getElementById(`job_${id}`).children[5].children[1].children.length; j++) {
                if (parseInt(getElementById(`job_${id}`).children[1].children[1].children[i].children[0].innerHTML)
                    === parseInt(getElementById(`job_${id}`).children[5].children[1].children[j].children[0].innerHTML)) {
                    if (parseInt(getElementById(`job_${id}`).children[1].children[1].children[i].children[4].innerHTML)
                        !== parseInt(getElementById(`job_${id}`).children[5].children[1].children[j].children[3].innerHTML)) {
                        getElementById(`job_${id}`).children[1].children[1].children[i].classList.add('malformed');
                        getElementById(`job_${id}`).children[5].children[1].children[j].classList.add('malformed');
                        analyzeDialog_view_ppaas_job_detection.children[1].children[1].children[id].classList.add('malformed');
                    }
                    break;
                }
            }

        }
    }
    if (getElementById(`job_${id}`).children[3] && getElementById(`job_${id}`).children[7]) {
        for (let i = 0; i < getElementById(`job_${id}`).children[3].children[1].children.length; i++) {
            for (let j = 0; j < getElementById(`job_${id}`).children[7].children[1].children.length; j++) {
                if (parseInt(getElementById(`job_${id}`).children[3].children[1].children[i].children[0].innerHTML)
                    === parseInt(getElementById(`job_${id}`).children[7].children[1].children[j].children[0].innerHTML)) {
                    if (parseInt(getElementById(`job_${id}`).children[3].children[1].children[i].children[5].innerHTML)
                        !== parseInt(getElementById(`job_${id}`).children[7].children[1].children[j].children[3].innerHTML)) {
                        getElementById(`job_${id}`).children[3].children[1].children[i].classList.add('malformed');
                        getElementById(`job_${id}`).children[7].children[1].children[j].classList.add('malformed');
                        analyzeDialog_view_ppaas_job_detection.children[1].children[1].children[id].classList.add('malformed');
                    }
                    break;
                }
            }
        }
    }
}

function makeJobRowClickable(id, mode) {
    if (mode === 'ppaas') {
        analyzeDialog_view_ppaas_job_detection.children[1].children[1].children[id].style.cursor = 'pointer';
        analyzeDialog_view_ppaas_job_detection.children[1].children[1].children[id].onclick = function () {
            getElementById(`job_${id}`).hidden = false;
            getElementById(`job_${id}`).scrollIntoView(true);
        }
    } else if (mode === 'hacrx') {
        analyzeDialog_view_hac_rx.children[1].children[1].children[id].style.cursor = 'pointer';
        analyzeDialog_view_hac_rx.children[1].children[1].children[id].onclick = function () {
            getElementById(`hac_job_${id}`).hidden = false;
            getElementById(`hac_job_${id}`).scrollIntoView(true);
        }
    }
}

function analyzeDialog_find_best_sample_shift_setUI(packets) {

    const select = analyzeDialog_find_best_shift_select;

    if (Object.keys(time_i).length) {
        Object.keys(time_i).forEach(antId => {
            select.innerHTML +=
                `<option value="${antId}">${antId > 65535 ? String(antId - 65536) + " DL" : String(antId) + " UL"}</option>`;
        });
    } else {
        analyzeDialog_find_best_shift_table_body.innerHTML = '<h2>File has no time domain</h2>';
    }
}

function analyzeDialog_find_best_sample_shift(){

    const antId = analyzeDialog_find_best_shift_select.value;
    const bestShift = findBestShift(antId);

    analyzeDialog_find_best_shift_table_body.innerHTML = "";

    for(let i = 0; i < bestShift.length; i++){
        analyzeDialog_find_best_shift_table_body.innerHTML +=
            '<tr><td>'+bestShift[i].i+'</td><td>'+bestShift[i].mean.toFixed(4)+'</td><td>'+bestShift[i].lowest.toFixed(4)+'</td></tr>'
    }
}

function analyzeDialog_find_numerology_and_sampling_setUI(){

    const select = getElementById("analyzeDialog_numerology_sampling_select");

    if (Object.keys(time_i).length) {
        Object.keys(time_i).forEach(antId => {
            select.innerHTML +=
                `<option value="${antId}">${antId > 65535 ? String(antId - 65536) + " DL" : String(antId) + " UL"}</option>`;
        });
    } else {
        getElementById("analyzeDialog_numerology_sampling_select").innerHTML = '<h2>File has no time domain</h2>';
    }

    // const results = analyzeDialog_find_numerology_and_sampling();

}

function analyzeDialog_find_numerology_and_sampling_setTable(){
    const key = parseInt(getElementById('analyzeDialog_numerology_sampling_select').value);
    const results = analyzeDialog_find_numerology_and_sampling(key);


    getElementById("analyzeDialog_find_numerology_sampling_table_body").innerHTML = "";

    for(let i = 0; i < results.length; i++){
        getElementById("analyzeDialog_find_numerology_sampling_table_body").innerHTML +=
            '<tr><td>'+results[i].u+'</td><td>'+results[i].sampling+'</td><td>'+results[i].shift+'</td><td>'+results[i].corr.toFixed(2)+'</td></tr>'
    }

}

function analyzeDialog_find_numerology_and_sampling(rtcId){

    let results = [];

    const v_i = time_i[rtcId];
    const v_q = time_q[rtcId];

    let places = [0];
    let width = 12;

    for(let i = width; i < v_i.length; i++){

        let isAllZeros = true;

        for(let j = i-width; j < i; j++ ){
            if(v_i[j]**2+v_q[j]**2 > 0) isAllZeros = false;
        }
        if(isAllZeros && v_i[i]**2+v_q[i]**2 > 0) places.push(i);
    }

    for(let u of [0,1]){
        for(let sampling of [7.68, 15.36, 23.04, 30.72, 46.08, 61.44, 122.88]){

            sampling =sampling*1000000;
            const scaling = 64/(1<<u);
            const Ncp      =  (144*scaling)/16;
            const sr_factor = Math.round( sampling/7680000 );

            const fft_size = Math.round(8192/(1<<u)* sr_factor/16);
            const cp_map = ones( 7*(1<<u), Ncp * sr_factor/16  );
            cp_map[0] = (Ncp+64) * sr_factor/16;


            for(let place of places){
                let index = place;

                let corrSum = 0;
                let divide = 0;

                for(let j = 0; j < 60; j++){
                    let cp_len = cp_map[j%cp_map.length];

                    let indexCp = index;
                    let indexEnd = index+fft_size;

                    let sum_i = 0, sum_q = 0;
                    let cp_rms = 0, end_rms = 0;

                    if(indexEnd+cp_len >= v_i.length) break;

                    for(let i = 0; i < cp_len; i++){

                        let ii = v_i[indexCp+i]*v_i[indexEnd+i] - (v_q[indexCp+i]*-1)*v_q[indexEnd+i];
                        let qq = v_i[indexCp+i]*v_q[indexEnd+i] + (v_q[indexCp+i]*-1)*v_i[indexEnd+i];

                        cp_rms += v_i[indexCp+i]**2 + v_q[indexCp+i]**2;
                        end_rms += v_i[indexEnd+i]**2 + v_q[indexEnd+i]**2;
                        sum_i += ii;
                        sum_q += qq;
                    }

                    index += fft_size+cp_len;
                    cp_rms = Math.sqrt( cp_rms/cp_len );
                    end_rms = Math.sqrt( end_rms/cp_len );

                    if(end_rms === 0 && cp_rms === 0){
                        corrSum += 1;
                        divide++;
                        continue;
                    }
                    else if(end_rms === 0 || cp_rms === 0){
                        divide++;
                        continue;
                    }
                    else{
                        corrSum += Math.sqrt((sum_i*(1/cp_rms/end_rms/cp_len))**2+(sum_q*(1/cp_rms/end_rms/cp_len))**2);
                        divide++;
                    }
                }
                results.push({u: u, sampling: sampling/1000000, corr: corrSum/divide, shift: place%(sampling/1000), fft_size:fft_size, cp_map:cp_map});
            }
        }
    }
    results.sort((a,b) => b.corr - a.corr);

    return results.slice(0, 10);


}

function analyzeDialog_deepChecker(packets){
    analyzeDialog_deep_checker_result.innerHTML = '';

    const addRow = (i, channel, message) => {
        analyzeDialog_deep_checker_table_body.innerHTML +=
            '<tr>' +
            '<td>' +i+ '</td>' +
            '<td>' +channel+ '</td>' +
            '<td>' +message+ '</td>' +
            '</tr>'
    }

    let columnVal = [];

    let nfailed_fcp = 0, nfailed_uplane_pdcch = 0, nfailed_uplane_pdsch = 0, nfailed_pucch_fcp = 0, nfailed_uplane_pucch = 0,
        nfailed_pusch_fcp = 0, nfailed_uplane_pusch = 0, nfailed_uplane_prach = 0, nfound_Pdcch = 0, nfound_Pucch = 0,
        nfound_Pusch = 0, nfound_Prach = 0, nfound_Pdsch = 0;

    const packetsCheckLen = 1500;

    let fcp_failures_per_cell=zeros(8);

    for( let pktIdx = 0; pktIdx < packets.length; ++pktIdx ) {

        const pkt = packets[pktIdx];
        if(pkt.l2l1 && pkt.l2l1.message){

            const subcellId = pkt.l2l1.subcellId;
            const sfn = pkt.l2l1.sfn;
            const slot = pkt.l2l1.slot;

            if(packetPropToStrMap['l2l1.message'][pkt.l2l1.message].includes("PdcchSendReq") && pkt.l2l1.dciInfo){

                for(let dci = 0; dci < pkt.l2l1.dciInfo.length; dci++){
                    let symbol = pkt.l2l1.dciInfo[dci].startSymbolNumber;

                    let r1 = findFcp(packets, sfn % 256, slot, symbol, 1, pktIdx + 1, packetsCheckLen);
                    if (!r1.length) {
                        addRow(pktIdx, "PDCCH", "Cannot find FCP packet in subcell " + subcellId);
                        if ((packets.length - pktIdx > 1000) || (nfailed_fcp > 0)) {
                            nfailed_fcp++;
                            fcp_failures_per_cell[subcellId]++;
                        }
                        columnVal[pktIdx] ? columnVal[pktIdx] += " NoFCP" : columnVal[pktIdx] = "NoFCP";
                    }
                    for (let j = 0; j < r1.length; j++) columnVal[r1[j]] ? columnVal[r1[j]] += " " + pktIdx : columnVal[r1[j]] = pktIdx;

                    let r2 = findUplaneWithRms(packets, sfn % 256, slot, symbol, 1, pkt.l2l1.rms,pktIdx + 1, packetsCheckLen);

                    if (!r2.length) {
                        addRow(pktIdx, "PDCCH", "Cannot find UPlane packet");
                        if ((packets.length - pktIdx > 1000) || (nfailed_uplane_pdcch > 0))
                            nfailed_uplane_pdcch++;
                        columnVal[pktIdx] ? columnVal[pktIdx] += " NoUP" : columnVal[pktIdx] = "NoUP";
                    }
                    nfound_Pdcch++;
                }
            }
            else if(packetPropToStrMap['l2l1.message'][pkt.l2l1.message].includes("PdschSendReq") && pkt.l2l1.grants){

                for (let grant = 0; grant < pkt.l2l1.grants.length; grant +=1) {
                    let r2=[];
                    let symbol = pkt.l2l1.grants[grant].startSymbol;
                    let no_symbol = pkt.l2l1.grants[grant].numOfPdschSymbols;

                    for (let sym = 0; sym < no_symbol; sym++) {
                        r2 = r2.concat(findUplaneWithRms(packets, sfn % 256, slot, symbol + sym, 1, pktIdx + 1, packetsCheckLen));
                    }

                    if (!r2.length) {
                        addRow(pktIdx, "PDSCH", "Cannot find UPlane packet, grant: " + grant);
                        columnVal[pktIdx] ? columnVal[pktIdx] += " NoUP" : columnVal[pktIdx] = "NoUP";
                        if ((packets.length - pktIdx > 1000) || (nfailed_uplane_pdsch > 0))
                            nfailed_uplane_pdsch++;
                    }
                    nfound_Pdsch++;
                }

            }
            else if (packetPropToStrMap['l2l1.message'][pkt.l2l1.message].includes('PrachReceiveReq')) {
                let r2=[];
                for (let sym = 0; sym < 14; sym++) {
                    r2 = r2.concat(findUplaneWithRms(packets, sfn % 256, slot, sym, 0, pktIdx + 1, packetsCheckLen));
                }
                if (!r2.length) {
                    addRow(pktIdx, "PRACH", "Cannot find UPlane packet");
                    columnVal[pktIdx] ? columnVal[pktIdx] += " NoUP" : columnVal[pktIdx] = "NoUP";
                    if ((packets.length - pktIdx > 1000) || (nfailed_uplane_prach > 0))
                        nfailed_uplane_prach++;
                }
                nfound_Prach++;
            }
            else if (packetPropToStrMap['l2l1.message'][pkt.l2l1.message].includes('PucchReceiveReq') && pkt.l2l1.subcells) {

                for (let subcell = 0; subcell < pkt.l2l1.subcells.length; subcell += 1) {
                    for (let resource = 0; resource < pkt.l2l1.subcells[subcell].pucchResources.length; resource += 1) {
                        let symbol = pkt.l2l1.subcells[subcell].pucchResources[resource].firstSymbol
                        let r1 = findFcp(packets, sfn % 256, slot, symbol, 0, pktIdx + 1, packetsCheckLen);
                        if (!r1.length) {
                            addRow(pktIdx, "PUCCH", "Cannot find FCP packet in row, subcellId:" + pkt.l2l1.subcells[subcell].subcellId);
                            if ((packets.length - pktIdx > 1000) || (nfailed_pucch_fcp > 0)) {
                                nfailed_pucch_fcp++;
                            }
                            columnVal[pktIdx] ? columnVal[pktIdx] += " NoFCP" : columnVal[pktIdx] = "NoFCP";
                        }
                        for (let j = 0; j < r1.length; j++) columnVal[r1[j]] ? columnVal[r1[j]] += " " + pktIdx : columnVal[r1[j]] = pktIdx;

                        let r2 = findUplaneWithRms(packets, sfn % 256, slot, symbol, 0, pktIdx + 1, packetsCheckLen);
                        if (!r2.length) {
                            addRow(pktIdx, "PUCCH", "Cannot find FCP packet");
                            if ((packets.length - pktIdx > 1000) || (nfailed_uplane_pucch > 0))
                                nfailed_uplane_pucch++;

                            columnVal[pktIdx] ? columnVal[pktIdx] += " NoUP" : columnVal[pktIdx] = "NoUP";
                        }
                        nfound_Pucch++;
                    }
                }
            }
            else if (packetPropToStrMap['l2l1.message'][pkt.l2l1.message].includes('PuschReceiveReq') && pkt.l2l1.subcells) {
                for (let subcell = 0; subcell < pkt.l2l1.subcells.length; subcell += 1) {
                    for (let grant = 0; grant < pkt.l2l1.subcells[subcell].grants.length; grant += 1) {

                        let symbol = pkt.l2l1.subcells[subcell].grants[grant].startSymbol
                        let r1 = findFcp(packets, sfn % 256, slot, symbol, 0, pktIdx + 1, packetsCheckLen);

                        if (!r1.length) {
                            addRow(pktIdx, "PUSCH", "Cannot find FCP packet, subcellid: " + pkt.l2l1.subcells[subcell].subcellId);
                            if ((packets.length - pktIdx > 1000) || (nfailed_pusch_fcp > 0)) {
                                nfailed_pusch_fcp++;
                            }
                            columnVal[pktIdx] ? columnVal[pktIdx] += " NoFCP" : columnVal[pktIdx] = "NoFCP";
                        }
                        for (let j = 0; j < r1.length; j++) columnVal[r1[j]] ? columnVal[r1[j]] += " " + pktIdx : columnVal[r1[j]] = pktIdx;

                        let r2 = [];
                        let no_symbol = pkt.l2l1.subcells[subcell].grants[grant].numOfPuschSymbols;
                        for (let sym = 0; sym < no_symbol; sym++) {
                            r2 = r2.concat(findUplaneWithRms(packets, sfn % 256, slot, symbol + sym, 0, pktIdx + 1, packetsCheckLen));
                        }
                        if (!r2.length) {
                            addRow(pktIdx, "PUSCH", "Cannot find UPlane packet");
                            if ((packets.length - pktIdx > 1000) || (nfailed_uplane_pusch > 0))
                                nfailed_uplane_pusch++;

                            columnVal[pktIdx] ? columnVal[pktIdx] += " NoUP" : columnVal[pktIdx] = "NoUP";
                        }
                        nfound_Pusch++;
                    }
                }
            }
            const rntis = getPacket_rntis(pktIdx);
            deep_check_responses(packets, packetPropToStrMap['l2l1.message'][pkt.l2l1.message].split('::')[1], sfn, slot, rntis, pktIdx, packetsCheckLen, columnVal);
        }
    }
    packetTable_addColumn("deep_checker", columnVal);


    analyzeDialog_deep_checker_result.innerHTML = ("PDCCH:" +nfound_Pdcch+
        "<br/>PDCCH without FCP: "+nfailed_fcp+ ", per cell:"+fcp_failures_per_cell+
        "<br/>PDCCH without RMS: "+nfailed_uplane_pdcch+
        "<br/>PDSCH:" +nfound_Pdsch+
        "<br/>PDSCH without RMS: "+nfailed_uplane_pdsch+
        "<br/>PUCCH: "+nfound_Pucch+
        "<br/>PUCCH without FCP: "+nfailed_pucch_fcp+", PUCCH without RMS: "+nfailed_uplane_pucch+
        "<br/>PUSCH: "+nfound_Pusch+
        "<br/>PUSCH without FCP: "+nfailed_pusch_fcp+", PUSCH without RMS: "+nfailed_uplane_pusch+
        "<br/>PRACH: "+nfound_Prach+
        "<br/>PRACH without RMS: "+nfailed_uplane_prach) + analyzeDialog_deep_checker_result.innerHTML;

}

function analyzeDialog_pdp_prach(packets) {
    analyzeDialog_pdp_message.innerHTML = '';
    analyzeDialog_view_pdp_prach_graph.hide();

    if (jobsData.length === 0) generatePpaasJobDetectionData(packets, PPAAS_JOB_DETECTION_OPTIONS.JOB_TOTAL_TIME);

    let allPdpOutPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4) && (pkt.ecpri.readWrite !== 0)
        && (pkt.ecpri.requestResponse === 0) && (pkt.ecpri.elementId === '0x3010'));

    if (allPdpOutPackets.length !== 0) {
        analyzeDialog_view_pdp_prach_graph.show();

        for (let i = 0; i < jobsData.length; i++) {
            let pdpOutPacketsPerJob = [];

            for (let j = 0; j < allPdpOutPackets.length; j++) {
                if (new Decimal(allPdpOutPackets[j].time.toString()).lessThan(jobsData[i].start)) continue;
                if (new Decimal(allPdpOutPackets[j].time.toString()).greaterThan(jobsData[i].end)) break;

                pdpOutPacketsPerJob.push(allPdpOutPackets[j]);
            }

            let pdpSamplesArray = getPdpPrachRootSamples(pdpOutPacketsPerJob);
            analyzeDialog_view_pdp_prach_graph.caption = `PDP roots for jobId ${jobsData[i].jobId}`;
            analyzeDialog_view_pdp_prach_graph.graph2d.setModePdplines();
            analyzeDialog_view_pdp_prach_graph.graph2d.draw([], pdpSamplesArray);

            const pdpToggleAll = document.createElement("div");
            pdpToggleAll.id = 'pdpToggleAll' + i;
            pdpToggleAll.className = 'pdpToggleAll';

            const pdpLabels = document.createElement("div");
            pdpLabels.id = 'pdpLabels' + i;
            pdpLabels.className = 'pdpLabels';

            analyzeDialog_view_pdp_prach_graph.appendChild(pdpToggleAll);
            analyzeDialog_view_pdp_prach_graph.appendChild(pdpLabels);

            analyzeDialog_view_pdp_prach_graph.graph2d.createClickableLabels(pdpToggleAll.id, pdpLabels.id);
        }
    } else {
        analyzeDialog_pdp_message.innerHTML = '<h2>No PDP PRACH packets in this file</h2>'
    }
}

function analyzeDialog_hac_rx(packets) {
    let hacRxDivData = '';
    const generateJobDetectionDataHelper = (name) => {
        let data = generateHacRxJobDetectionData(packets);

        hacRxDivData += `<h3 style="margin-top: 1rem">${name}</h3>`;
        if (data.length) {
            const statsTable = new TableBuilder().ColumnsFromObject(data[0]).SetData(data).BuildHTML();
            hacRxDivData += statsTable;
        }
    };

    if (pmFile.length === 0) {
        hacRxDivData += '<h3 style="margin-top: 1rem">There was no PM file loaded.</h3>';
        analyzeDialog_view_hac_rx.innerHTML = hacRxDivData;
        return;
    }

    try {
        generateJobDetectionDataHelper("Job total time");
        analyzeDialog_view_hac_rx.innerHTML = hacRxDivData;
        hacRxDivData = '';
    } catch (e) {
        analyzeDialog_view_hac_rx.innerHTML = 'Job detection failed';
        logDebug('eCPRI', "HAC-RX job detection calculation failed");
        return;
    }

    hacRxDivData += `<input type="button" value="Expand / hide all jobs" onClick="toggleAllJobs(true)">`;

    try {
        for (let i = 0; i < jobsData.length; i++) {
            hacRxDivData += `<span><input type="button" style="width: 200px" value="Job ${jobsData[i].taskId} PE ${jobsData[i].peId}" onclick="jobToggle(${i}, true)">` +
                `<input type="button" style="width: 200px" value="Download all [.bin]" onclick="downloadHacRxPayloadAll(${i})"></span>` +
                `<div id="hac_job_${i}" style="display: grid; grid-template-columns: 200px 1fr" hidden>` +
                `<span style="grid-column: 1 / 3; font-weight: bold; align-self: center">Task descriptor parameters:</span>` +
                `<span style="align-self: center">SFN:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].sfn}</span>` +
                `<span style="align-self: center">Slot:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].slot}</span>` +
                `<span style="align-self: center">nRb:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].nRb}</span>` +
                `<span style="align-self: center">RBG:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].rbg}</span>` +
                `<span style="align-self: center">nL:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].nL}</span>` +
                `<span style="align-self: center">nRx:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].nRx}</span>` +
                `<span style="align-self: center">nDMRS:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].nDmrs}</span>` +
                `<span style="align-self: center">nDataS:</span><span style="align-self: center">${ecpri_hacRx_varsPerJob[i].nDs}</span>` +
                `<span style="width: 200px; font-weight: bold; align-self: center">yB Payload - 0x3021</span><input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadHacRxPayload('yb', ${i})">` +
                `<span style="width: 200px; font-weight: bold; align-self: center">DMRS Payload - 0x3022</span><input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadHacRxPayload('dmrs', ${i})">` +
                `<span style="width: 200px; font-weight: bold; align-self: center">Rdd Payload - 0x3023</span><input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadHacRxPayload('rdd', ${i})">` +
                `<span style="width: 200px; font-weight: bold; align-self: center">X_soft - 0x3010</span><input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadHacRxPayload('xsoft', ${i})">` +
                `<span style="width: 200px; font-weight: bold; align-self: center">Beta - 0x3011</span><input type="button" style="width: 160px" value="Download [.bin]" onclick="downloadHacRxPayload('beta', ${i})">` +
                '</div>';
        }
        analyzeDialog_view_hac_rx.innerHTML += hacRxDivData;
    } catch (e) {
        hacRxDivData += '</div>';
        hacRxDivData += `<h3 style="margin-top: 1rem; color: red">${e}</h3>`;
        analyzeDialog_view_hac_rx.innerHTML += hacRxDivData;
        logDebug('eCPRI', "HAC-RX job detection calculation failed");
    }

    for (let i = 0; i < jobsData.length; i++) {
        if (getElementById(`hac_job_${i}`)) {
            makeJobRowClickable(i, 'hacrx');
        }
    }
}

function isPdpInfoAvailable(packet) {
    return (packet.ecpri !== undefined) && (packet.ecpri.message === 4) && (packet.ecpri.readWrite !== 0)
        && (packet.ecpri.requestResponse === 0) && (packet.ecpri.elementId === '0x3010');
}

function isDeepInspectorInfoAvailable(packet) {
    if (!packet.l2l1?.message) return false;

    if (packetPropToStrMap["l2l1.message"][packet.l2l1.message].includes("PdcchSendReq") && packet.l2l1.dciInfo) {
        return true;
    }
    if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes("PdschSendReq") && packet.l2l1.grants) {
        return true;
    }
    if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes('PrachReceiveReq')) {
        return true;
    }
    if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes('PucchReceiveReq') && packet.l2l1.subcells) {
        return true;
    }
    if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes('PuschReceiveReq') && packet.l2l1.subcells) {
        return true;
    }

    return false;
}

function checkAvailableAnalyses(packets) {
    let bipCompleteness = false;
    let ecpriPattern = false;
    let pdp = false;
    let deepInspector = false;

    for (const packet of packets) {
        // TODO: Check for bip completeness and ecpri pattern.
        if (isInfoForBipCompletenessAvailable(packet)) {
            bipCompleteness = true;
        }

        if (isInfoForEcpriPatternAvailable(packet)) {
            ecpriPattern = true;
        }

        if (isPdpInfoAvailable(packet)) {
            pdp = true;
        }

        if (isDeepInspectorInfoAvailable(packet)) {
            deepInspector = true;
        }

        if (bipCompleteness && ecpriPattern && pdp && deepInspector) {
            break;
        }
    }

    return {
        bipCompleteness,
        ecpriPattern,
        pdp,
    };
}

let analyzeDialogElements = [];
function greyOutUnimportantTab() {
    if(analyzeDialogElements.length === 0) {
        let analyzeDialog = document.getElementById('analyze-buttons-div');
        analyzeDialog.querySelectorAll("input.analyzeDialog_option").forEach((element) => {
            analyzeDialogElements.push(element);
            element.style.backgroundColor = "#30629C";
        });
    }

    const { bipCompleteness, ecpriPattern, pdp, deepInspector } = checkAvailableAnalyses(packets);

    //BIP COMPLETENESS
    if (!bipCompleteness) {
        changeElementBackgroundColor(0, "grey");
    }

    //ANTENNA INFO
    if(Object.entries(ecpri_defaultU).length === 0){
        changeElementBackgroundColor(2, "grey");
    }

    //PACKET ERRORS
    if(packets.length === 0){
        changeElementBackgroundColor(3, "grey");
    }

    // CHECK BIP CALL
    // const rnti = parseInt(analyzeDialog_check_bip_call_selectRnti.value);
    // const data = check_bip_call(packets, rnti, ecpri_maxU, l2l1Utils_getCfoFactor(ecpri_maxU));
    // if(isObjectWithOnlyEmptyArrays(data)){
    //     changeElementBackgroundColor(4, "grey");
    // }

    //TIMING ANALYSIS
    if(packetTable_allColumnNames.includes('eCpriDelayPtpUs') === false){
        changeElementBackgroundColor(5, "grey");
    }

    // CHECK ECPRI PATERN
    if (!ecpriPattern) {
        changeElementBackgroundColor(6, "grey");
    }

    // PROTO PLAT JOB DETECTION & HAC-RX
    if (pmFile.length === 0) {
        changeElementBackgroundColor(7, "grey");
        changeElementBackgroundColor(12, "grey");
    }

    // FIND BEST SAMPLE SHIFT
    if (!Object.keys(time_i).length) {
        changeElementBackgroundColor(8, "grey");
        changeElementBackgroundColor(9, "grey");
    }

    // DEEP L2L1+ECPRI INSPECTOR
    if (!deepInspector) {
        changeElementBackgroundColor(10, "grey");
    }

    // PDP PRACH
    if (pmFile.length === 0 && !pdp) {
        changeElementBackgroundColor(11, "grey");
    }
}

function changeElementBackgroundColor(index, color) {
    if (index >= 0 && index < analyzeDialogElements.length) {
        analyzeDialogElements[index].style.backgroundColor = color;
    } else {
        console.error('Index out of bounds');
    }
}

function isObjectWithOnlyEmptyArrays(obj) {
    return Object.values(obj).every(value => Array.isArray(value) && value.length === 0);
}

function highlightActiveButton(name) {

    document.querySelectorAll("input.analyzeDialog_option").forEach(button => {
        button.classList.remove("highlighted_button");
    });

    const buttonToHighlight = document.getElementById(`${name}_button`);
    if (buttonToHighlight) {
        buttonToHighlight.classList.add("highlighted_button");
    }
}
