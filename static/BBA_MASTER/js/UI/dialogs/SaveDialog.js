const saveDialog = /** @type {SaveDialog} */ getElementById('saveDialog');

const saveDialog_filename = getElementById('saveDialog_filename');
const saveDialog_packetsFileType = getElementById('saveDialog_packetsFileType');
const saveDialog_packetsRange = document.getElementsByName('saveDialog_packetsRange');
const saveDialog_pcapEndian = document.getElementsByName('saveDialog_pcapEndian');
const saveDialog_pcapTsPrecision = document.getElementsByName('saveDialog_pcapTsPrecision');
const saveDialog_iqFileType = getElementById('saveDialog_iqFileType');
const saveDialog_iqMode = document.getElementsByName('saveDialog_iqMode');
const saveDialog_iqAntenna = getElementById('saveDialog_iqAntenna');
const saveDialog_pcapTsColumn = document.getElementsByName('saveDialog_pcapTsColumn');
const saveDialog_csvAddExcelSeparator_row = getElementById('saveDialog_csvAddExcelSeparator_row');
const saveDialog_csvAddExcelSeparator = getElementById('saveDialog_csvAddExcelSeparator');


class SaveDialog extends Dialog {

    constructor(){
        super("Save");

    }

    getFromUI() {
        config.save.filename = saveDialog_filename.value;
        config.save.packetsFileType = saveDialog_packetsFileType.options[saveDialog_packetsFileType.selectedIndex].value;
        config.save.packetsRange = get_param_radio( saveDialog_packetsRange );
        config.save.pcapEndian = get_param_radio( saveDialog_pcapEndian );
        config.save.pcapTsPrecision = get_param_radio( saveDialog_pcapTsPrecision );
        config.save.iqFileType = saveDialog_iqFileType.options[saveDialog_iqFileType.selectedIndex].value;
        config.save.timestampColumn = get_param_radio(saveDialog_pcapTsColumn);
        config.save.csvAddExcelSeparator = saveDialog_csvAddExcelSeparator.checked;
    }
    setToUI() {
        saveDialog_filename.value = config.save.filename;
        ui_setSelectOptionByValue( saveDialog_packetsFileType, config.save.packetsFileType );
        set_param_radio( saveDialog_packetsRange, config.save.packetsRange );
        set_param_radio( saveDialog_pcapEndian, config.save.pcapEndian );
        set_param_radio( saveDialog_pcapTsPrecision, config.save.pcapTsPrecision );
        ui_setSelectOptionByValue( saveDialog_iqFileType, config.save.iqFileType );
        set_param_radio(saveDialog_pcapTsColumn, config.save.timestampColumn);
        saveDialog_csvAddExcelSeparator.checked = config.save.csvAddExcelSeparator;

        saveDialog_csvAddExcelSeparator_row.hidden = config.save.packetsFileType !== 'csv';
    }

    onLoad(){
        this.setToUI();
    }
}
customElements.define('bba-save-dialog', SaveDialog);

function saveDialog_packetsFileType_onChange(){
    saveDialog.getFromUI();
    saveDialog.setToUI();
}

function saveDialog_savePackets() {
    saveDialog.getFromUI();
    switch( config.save.packetsFileType ) {
        case 'pcap': pcap_encode(); break;
        case 'pcapng': pcapng_encode(); break;
        case 'csv': csv_encode(config.save.filename); break;
        // TODO case 'json': json_encode(); break;
    }
}

function adjustSaveDialog(){
    if(getElementById('saveDialog_iqData_0').checked){ //IQ
        getElementById("saveDialog_iqAntenna_tr").hidden = false;
        getElementById("saveDialog_iqSelected_tr").hidden = false;
        getElementById("saveDialog_excluded_packets_tr").hidden = false;
    }
    else if(getElementById('saveDialog_iqData_1').checked){ //Time IQ
        getElementById("saveDialog_iqAntenna_tr").hidden = true;
        getElementById("saveDialog_iqSelected_tr").hidden = true;
        getElementById("saveDialog_excluded_packets_tr").hidden = true;

    }
}

function getTimeSamplesToSave(){
    //Get 2D array of Time IQ samples and antenna name
    //This function doesn't take into account applied filters
    let samplesToDecode = [];

    const checkboxes = [...saveDialog_iqAntenna.querySelectorAll("input")];
    const selectedCheckbox = checkboxes.find((c) => c.checked);

    if (!selectedCheckbox) {
        return [ [], "0" ];
    }

    const andID = selectedCheckbox.value.split("_")[1];

    if(!time_i[andID]) {
        throw("Error! No time domain samples");
    }

    for(let i = 0; i < time_i[andID].length; i++){
        if(getElementById("saveDialog_order_0").checked){
            samplesToDecode.push(time_i[andID][i]);
            samplesToDecode.push(time_q[andID][i]);
        }
        else{
            samplesToDecode.push(time_q[andID][i]);
            samplesToDecode.push(time_i[andID][i]);
        }
    }

    return [[samplesToDecode], andID];
}

// eCPRI returns both numerical numerology and antennaID
// RoE returns default 0 numerology and antennaID as string
// TODO: might think of a more general use solution
function saveDialog_getSelectedUAndAntennaId(option) {
    const iqAntennaValue = option.value;

    if(iqAntennaValue.includes("RoE")){
        const num_ant = iqAntennaValue.split("_");
        num_ant[0] = parseInt(num_ant[0]);
        return num_ant;
    }

    return iqAntennaValue.split("_").map((x) => parseInt(x));
}

function isSampleFiltered(u, antId, frame, subframe, slot, symbol, RB, RE){
    if(getElementById("saveDialog_mode_0").checked) return true;

    //TODO: it is not clear that IQ Tab fiters are being applied here
    // when exporting IQ samples, user should be presented with an option to apply filters or not
    const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId];

    const place = iqOffsets[u][antId][frame*10+subframe][14*slot + symbol]/2 + RB*12 + RE;
    const channel = iqTypeBuffers[u][antId][place];

    if(!vf.visibleChannels[channel]) return false;

    if(packets.length > 0){ //chceck if file has packets - if not its not pcap
        const packetsId = packet_places[u][antId][(frame*10+subframe) + ':' + (slot*14 + symbol)];
        let included = false;
        if(packetsId){
            for(let packetId of packetsId){
                if(ecpri_uInPkt[packetId] !== u) continue;
                if(packets[packetId].ecpri.rtcId + (packets[packetId].ecpri.dataDir === 1 ? 2**16 : 0) !== antId) continue;
                for(let section of packets[packetId].ecpri.sections){
                    if(section.startPrb <= RB && RB < section.startPrb+section.numPrb && filteredPacketsIds_set.has(packetId)){
                        included = true;
                    }
                }
            }
        } else {
            return false;
        }

        if(!included) {
            return false;
        }
    }


    if(!(vf.ranges.frame[0] <= frame && frame <= vf.ranges.frame[1]) && vf.ranges.frame[1] !== -1) return false;
    if(!(vf.ranges.subframe[0] <= subframe && subframe <= vf.ranges.subframe[1]) && vf.ranges.subframe[1] !== -1) return false;
    if(!(vf.ranges.symbol[0] <= symbol && symbol <= vf.ranges.symbol[1]) && vf.ranges.symbol[1] !== -1) return false;
    if(!(vf.ranges.slot[0] <= slot && slot <= vf.ranges.slot[1]) && vf.ranges.slot[1] !== -1) return false;
    if(!(vf.ranges.RB[0] <= RB && RB <= vf.ranges.RB[1]) && vf.ranges.RB[1] !== -1) return false;

    return true;
}

function getIQSamplesToSave(){
    //Get 2D array of IQ samples
    let antenaSamples = [];
    const antenaNames = [];

    const checkboxes = saveDialog_iqAntenna.getElementsByTagName("input");

    const fillEmptySamples = getElementById("saveDialog_excluded_0").checked;
    const reverseOrder = getElementById("saveDialog_order_1").checked;

    for(let checkbox of checkboxes){
        if(checkbox.checked){
            let samplesToDecode = [];
            const [u, antId] = saveDialog_getSelectedUAndAntennaId(checkbox);
            const dir = antId >= 0x10000 ? 'DL' : 'UL';
            const rtcId = antId & 0xFFFF;
            let iq = iqBuffers[u][antId];
            let offsets = iqOffsets[u][antId];
            const maxPrb = config.load.fileType.includes('pcap') ? guess_ecpri_nPRB(u) : get_nPrb(u, config.load.sampling * 1000000);

            const subframes = Object.keys(iqNumPrb[u][antId]).map((x) => parseInt(x));
            subframes.sort((a, b) => a - b);
            const firstSubframe = subframes[0];
            const lastSubframe = subframes[subframes.length - 1];

            for(let frameId = firstSubframe; frameId <= lastSubframe; ++frameId){
                let numPrbArr = iqNumPrb[u][antId][frameId];
                if(numPrbArr !== undefined){
                    for(let slotId = 0; slotId < numPrbArr.length; slotId++){
                        const numPrb = numPrbArr[slotId];
                        for(let i = 0; i < maxPrb; i++){
                            for(let j = 0; j < 12; j++){

                                if(isSampleFiltered(u, antId, parseInt(frameId/10), frameId%10, parseInt(slotId/14), slotId%14, i, j) && i < numPrb){
                                    let k = offsets[frameId][slotId] + (i*12+j)*2;
                                    const iVal = iq[k++];
                                    const qVal = iq[k++];

                                    if(iVal === Infinity || qVal === Infinity) {
                                        if(fillEmptySamples){
                                            samplesToDecode.push(0, 0);
                                        }
                                        continue;
                                    }

                                    if(reverseOrder === false)
                                        samplesToDecode.push(iVal, qVal);
                                    else
                                        samplesToDecode.push(qVal, iVal);
                                }
                                else if(fillEmptySamples){
                                    samplesToDecode.push(0, 0);
                                }
                            }
                        }
                    }
                } else if(fillEmptySamples){    // Entirely empty subframe
                    const symNum = NUM_OF_SYM_IN_SF_PER_U[u];
                    for(let sym = 0; sym < symNum; ++sym){
                        for(let rb = 0; rb < maxPrb; ++rb){
                            for(let re = 0; re < 12; ++re){
                                samplesToDecode.push(0, 0);
                            }
                        }
                    }
                }
            }
            antenaSamples.push(samplesToDecode);
            antenaNames.push(`${antId}`.includes("RoE") ? `${antId}` : `u${u}_${dir}_rtcId${rtcId}`);

        }
    }

    return [antenaSamples, antenaNames];
}

function saveDialog_saveIQ() {
    loader_toggle();
    setTimeout(function () {

        saveDialog.getFromUI();
        let samplesToDecode, antennas_names;

        try{
            [samplesToDecode, antennas_names] = (getElementById('saveDialog_iqData_0').checked) ? getIQSamplesToSave() : getTimeSamplesToSave();
        }
        catch (e) {
            alert(e);
            return;
        }



        const filename_base = config.save.filename;

        for (let s = 0; s < samplesToDecode.length; s++) {
            const samples = samplesToDecode[s];
            let filename = filename_base + "_" + antennas_names[s];
            let buf;
            if(saveDialog_iqFileType.value === "binary_16_bit_IQ"){
                if( !filename.includes( '.bin' ) ) filename += '.bin';
                const bufSize = samples.length * 2;
                buf = new ArrayBuffer( bufSize );
                let ptr = new Uint8Array( buf );

                for(let j = 0; j < samples.length; j++){
                    let sample = parseInt(samples[j]*32768);
                    if(sample-65536 > 32767) sample += 65536;
                    ptr[j*2 + 0] = (sample >> 8) & 255;
                    ptr[j*2 + 1] = sample & 255;
                }
            }
            else if(saveDialog_iqFileType.value === "binary_32_bit_IQ"){
                if( !filename.includes( '.bin' ) ) filename += '.bin';
                const bufSize = samples.length * 4;
                buf = new ArrayBuffer( bufSize );
                let ptr = new Uint8Array( buf );

                for(let j = 0; j < samples.length; j++){
                    let sample = parseInt(samples[j]*2147483648);
                    if(sample-4294967296 > 2147483647) sample += 4294967296;
                    ptr[j*2 + 0] = (sample / 2**24) & 255;
                    ptr[j*2 + 1] = (sample / 2**16) & 255;
                    ptr[j*2 + 2] = (sample / 2**8) & 255;
                    ptr[j*2 + 3] = sample & 255;
                }

            }
            else if(saveDialog_iqFileType.value === "IQFP"){
                if( !filename.includes( '.bin' ) ) filename += '.bin';
                const bufSize = samples.length * 2;
                buf = new ArrayBuffer( bufSize );
                let ptr = new Uint8Array( buf );

                for(let j = 0; j < samples.length; j+=2) {
                    let i = samples[j];
                    let q = samples[j+1];

                    const data = iq_to_IQFP(i, q);

                    ptr[j*2 + 0] = (data / 2**24) & 255;
                    ptr[j*2 + 1] = (data / 2**16) & 255;
                    ptr[j*2 + 2] = (data / 2**8) & 255;
                    ptr[j*2 + 3] = data & 255;
                }
            }
            else if(saveDialog_iqFileType.value === "hex"){
                if( !filename.includes( '.txt' ) ) filename += '.txt';
                buf = "";
                for(let j = 0; j < samples.length; j+=2) {
                    let i = samples[j];
                    let q = samples[j + 1];
                    buf += "0x"+itoc_16bit_signed(i) +  itoc_16bit_signed(q)+"\r\n" ;
                }
            }
            else if(saveDialog_iqFileType.value === "textual_raw"){
                if( !filename.includes( '.txt' ) ) filename += '.txt';
                buf = "[\t\n";

                for(let j = 0; j < samples.length; j+=2) {
                    let i = String(samples[j]);
                    let q = (samples[j + 1] >= 0 ? '+' + samples[j + 1] : + samples[j + 1]) + 'i';
                    buf += String(i)+String(q) + "\r\n";
                }
                buf += "\r\n]"
            }
            else if(saveDialog_iqFileType.value === "textual_fxp"){
                if( !filename.includes( '.txt' ) ) filename += '.txt';
                buf = "[\t\n";

                // TODO: MaxIqValue Present should be abstracted into it's own function
                const signDiff = 1 << config.load.iqBitWidth;
                let maxValue = signDiff >> 1;
                if( config.load.iqCompMethod === IQ_COMPRESSION_METHODS.BLOCK_FLOATING_POINT || config.load.iqCompMethod === IQ_COMPRESSION_METHODS.BFP_SELECTIVE_RE )
                    maxValue =
                        1 << ( config.load.iqBitWidth - 1 + ( config.load.iqScalingMode === 1 ? 15 : 16 - config.load.iqBitWidth ) );
                for(let i = 0; i < samples.length; ++i){
                    samples[i] *= maxValue;
                }

                for(let j = 0; j < samples.length; j+=2) {
                    let i = String(samples[j]);
                    let q = (samples[j + 1] >= 0 ? '+' + samples[j + 1] : + samples[j + 1]) + 'i';
                    buf += String(i)+String(q) + "\r\n";
                }
                buf += "\r\n]"

            }
            else if(saveDialog_iqFileType.value === "c_table"){
                if( !filename.includes( '.c' ) ) filename += '.c';
                buf = "uint32_t array[] = {\n";
                for(let j = 0; j < samples.length; j+=2) {
                    let i = samples[j];
                    let q = samples[j + 1];
                    buf += "0x"+itoc_16bit_signed(i) + itoc_16bit_signed(q) + (j%16 === 14 && j > 0 ? "\n" : ",");

                }
                buf += "}";
            }
            else if(saveDialog_iqFileType.value === "vsa"){
                if( !filename.includes( '.txt' ) ) filename += '.txt';
                buf = "";
                for(let j = 0; j < samples.length; j+=2) {
                    let i = Math.round(ctoi_16bit_signed(itoc_16bit_signed( samples[j] )) * 32768)
                    let q = Math.round(ctoi_16bit_signed(itoc_16bit_signed( samples[j + 1] )) * 32768)
                    buf += i + "\t" + q + "\t" + "0\t0\r\n";

                }
            }
            else if(saveDialog_iqFileType.value === "lmts"){
                if( !filename.includes( '.bin' ) ) filename += '.bin';
                const bufSize = samples.length * 2;
                buf = new ArrayBuffer( bufSize );
                let ptr = new Uint8Array( buf );

                for(let j = 0; j < samples.length; j+=2) {
                    let i = itoc_16bit_signed(samples[j]);
                    let q = itoc_16bit_signed(samples[j+1]);

                    ptr[2*j + 0] = parseInt(i.substr(0, 2), 16);
                    ptr[2*j + 1] = parseInt(i.substr(2, 2), 16);
                    ptr[2*j + 2] = parseInt(q.substr(0, 2), 16);
                    ptr[2*j + 3] = parseInt(q.substr(2, 2), 16);

                }
            }
            else if(saveDialog_iqFileType.value === "5gmax_ecpri_dec_export"){
                if( !filename.includes( '.txt' ) ) filename += '.txt';
                buf = "";
                for(let j = 0; j < samples.length; j+=2) {
                    let i = samples[j];
                    let q = samples[j + 1];
                    buf += i + " " + q + "\r\n";

                }
            }

            downloadFile(filename, buf);
        }
        loader_toggle();

    }, 100);

}