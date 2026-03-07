function getAllocationsFromMessage(m, maxPrb) {
    let areas = [[], [], [], [], [], [], [], []]

    const name = packetPropToStrMap['l2l1.message'][m.l2l1.message];
    if (name === 'DlData::PdschSendReq') {
        for (let l = 0; l < m.l2l1.grants.length; l += 1) {
            let g = m.l2l1.grants[l]
            areas[0].push([g.startSymbol, g.numOfPdschSymbols, g.startPrb, g.numOfPrb])
        }
        return areas
    }
    if (name === 'DlData::PdcchSendReq') {
        for (let l = 0; l < m.l2l1.dciInfo.length; l += 1) {
            let g = m.l2l1.dciInfo[l]
            areas[0].push([g.startSymbolNumber, g.numOfSymbols, g.startCce * 6, g.aggregationLevel * 6])
        }
        return areas
    }
    if (name === 'DlData::SsBlockSendReq') {
        return areas
    }
    if (name === 'DlData::CsiRsSendReq') {
        return areas
    }

    if (!m.hasOwnProperty('subcells'))
        return areas

    for (let k = 0; k < m.l2l1.subcells.length; k += 1) {
        let id = m.l2l1.subcells[k].subcellId

        if (name === 'UlData::PuschReceiveReq') {
            for (let l = 0; l < m.l2l1.subcells[k].grants.length; l += 1) {
                let g = m.l2l1.subcells[k].grants[l]
                areas[id].push([g.startSymbol, g.numOfPuschSymbols, g.startPrb, g.numOfPrb])
            }
        }
        if (name === 'UlData::PucchReceiveReq') {
            for (let l = 0; l < m.l2l1.subcells[k].pucchResources.length; l += 1) {
                let g = m.l2l1.subcells[k].pucchResources[l]
                areas[id].push([g.firstSymbol, g.numOfSymbols, g.startPrb, g.numOfPrb])
            }
        }
        if (name === 'UlData::SrsReceiveReq') {
            areas[id].push([m.l2l1.subcells[k].srsSuMimoStruct.symbolPosition, 1, 0, maxPrb])
        }
        if (name === 'UlData::PrachReceiveReq') {
        }
    }
    return areas
}

function prepare_areas(messages, maxPrb) {
    const areas = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    for (const message of messages) {
        const allocations = getAllocationsFromMessage(message, maxPrb);
        for (let i = 0; i < areas.length; ++i) {
            const allocation = allocations[i];
            const area = areas[i];
            area.push(...allocation);
        }
    }

    for (let i = 0; i < areas.length; ) {
        const area = areas[i];
        if (area.length === 0) {
            areas.splice(i, 1);
        } else {
            ++i;
        }
    }

    return areas;
}


function check_l1_allocations(packets, nprb) {
    const ulTypes = ['UlData::PuschReceiveReq', 'UlData::PucchReceiveReq', 'UlData::SrsReceiveReq', 'UlData::PrachReceiveReq'];
    const dlTypes = ['DlData::PdschSendReq', 'DlData::PdcchSendReq', 'DlData::SsBlockSendReq', 'DlData::CsiRsSendReq'];

    const dlRequestsMap = new Map();
    const ulRequestsMap = new Map();

    const L = 0;
    const H = 1;
    const dlCurrentBin = [0, 0];
    const ulCurrentBin = [0, 0];

    for (let i = 0; i < packets.length; ++i) {
        const r = packets[i];
        if (r.ethertype !== 35153) {
            continue;
        }

        const l2l1MessageStr = packetPropToStrMap["l2l1.message"][r.l2l1.message];

        let currentBin;
        let requests;
        if (ulTypes.includes(l2l1MessageStr)) {
            requests = ulRequestsMap;
            currentBin = ulCurrentBin;
        } else if (dlTypes.includes(l2l1MessageStr)) {
            requests = dlRequestsMap;
            currentBin = dlCurrentBin;
        } else {
            continue;
        }

        if (r.l2l1.sfn > 255 && r.l2l1.sfn < 512)
            currentBin[H] = currentBin[L]
        if (r.l2l1.sfn > 767)
            currentBin[L] = currentBin[H] + 1
        let bin = r.l2l1.sfn > 511 ? currentBin[H] : currentBin[L]

        const rrKey = [bin, r.l2l1.sfn, r.l2l1.slot].toString();
        const rr = requests.get(rrKey);
        if (rr !== undefined) {
            rr.push(r);
        } else {
            requests.set(rrKey, [r]);
        }
    }

    const ulRequests = [...ulRequestsMap.entries()];
    const dlRequests = [...dlRequestsMap.entries()];

    function checkAllocationsForDirection(requestsPerSlot, maxPrb) {
        const errors = new Set();

        for (let i = 0; i < requestsPerSlot.length; i += 1) {
            const areas = prepare_areas(requestsPerSlot[i][1], maxPrb)
            const frameSlot = requestsPerSlot[i][0];

            for (const area of areas) {
                let errorsFound = false
                for (const subarea of area) {
                    if (subarea[0] + subarea[1] > 14) {
                        errors.add("Error in frame/slot " + frameSlot.split(',').slice(1).join(',') + ": allocation too long")
                        errorsFound = true
                        continue
                    }
                    if (subarea[2] + subarea[3] > maxPrb) {
                        errors.add("Error in frame/slot " + frameSlot.split(',').slice(1).join(',') + ": allocation too wide");
                        errorsFound = true
                    }
                }

                if (errorsFound) continue

                let bitmap = new Array(14).fill(0).map(_ => new Array(maxPrb).fill(0))
                for (const subarea of area) {

                    for (let k = 0; k < subarea[1]; k += 1) {
                        for (let l = 0; l < subarea[3]; l += 1) {
                            let current = bitmap[k + subarea[0]][l + subarea[2]]
                            if (current > 0) {
                                errors.add("Error in frame/slot " + frameSlot.split(',').slice(1).join(',') + ": allocations overlap")
                                continue
                            }
                            bitmap[k + subarea[0]][l + subarea[2]] = current + 1
                        }
                    }
                }
            }
        }
        return errors;
    }

    const dlErrors = checkAllocationsForDirection(dlRequests, nprb);
    const ulErrors = checkAllocationsForDirection(ulRequests, nprb);

    return {DL: dlErrors, UL: ulErrors};
}

function findMaxAmplitude() {
    let maxAmplitude = 0;
    for(let u in iqBuffers){
        if(iqBuffers[u]){
            for(let antId in iqBuffers[u]){
                const iq = iqBuffers[u][antId];
                if(iq) {
                    for (let i = 0; i < iq.length; i+=2) {
                        if (iq[i] === Infinity || iq[i+1] === Infinity) continue;
                        const amplitude =  iq[i]*iq[i] + iq[i+1]*iq[i+1];
                        if(maxAmplitude < amplitude) maxAmplitude = amplitude;
                    }
                }
            }
        }
    }
    return Math.sqrt(maxAmplitude);
}

function getPacket_rntis(pktIdx){
    return packetTable_allColumnNames.filter((x) => x.endsWith('rnti') && getPacketValue(packets[pktIdx],x) !== undefined).map((x) => getPacketValue(packets[pktIdx],x));
}
function deep_find_response(packets, message, sfn, slot, rntiArr, index, len ){
    let result=[];

    for( let i=index; (i<packets.length)&&(i-index<len); i++) {
        if(!packets[i].l2l1) continue;
        if (packetPropToStrMap['l2l1.message'][packets[i].l2l1.message].split('::')[1] !== message) continue;
        if (packets[i].l2l1.sfn !== sfn) continue;
        if (packets[i].l2l1.slot !== slot) continue;

        const rntis = getPacket_rntis(i);
        const intersect = rntis.some(rnti=>rntiArr.includes(rnti));
        if(intersect){
            result.push(i);
        }
    }

    return result;
}

function deep_check_responses(packets, name, sfn, slot, rntiArr, index, len, colErr){

    const mappings = {
        PuschReceiveReq: {availResponses: [
                {full: "PuschReceiveRespPs",    short: "RespPs"},    {full: "PuschReceiveRespHarqU", short: "RespHarqU"},
                {full: "PuschReceiveRespHarqD", short: "RespHarqD"}, {full: "PuschReceiveRespLo",      short: "RespLo"}]},
        PucchReceiveReq: {availResponses: [{full: "PucchReceiveRespPs", short: "RespPs"}, {full: "PucchReceiveRespHarqD", short: "RespHarqD"}]},
        PrachReceiveReq: {availResponses: [{full: "PrachReceiveInd", short: "Ind"}]}
    }

    const mapping = mappings[name];
    if(mapping === undefined) return;

    mapping.availResponses.map(response=>{
        let responses = deep_find_response(packets, response.full, sfn, slot, rntiArr, index + 1, len);
        if(!responses.length){
            const str = `Cannot find Response for ${name} in row ${index}. No${response.short}`
            colErr[index] ? colErr[index] += str : colErr[index] = str;
        }
    })
}

function findFcp(packets, frameId, slotId, symbolId, dataDir, index, len){
    let result = [];

    for(let i = index; i < packets.length && i-index < len; i++){

        const u = ecpri_uInPkt[i];
        const slots_in_subframe = (1 << (u || 1));
        let subframeId = Math.floor(slotId/slots_in_subframe);

        if(!packets[i].ecpri) continue;
        if(packets[i].ecpri.message !== 2) continue;
        if(packets[i].ecpri.frameId !== frameId) continue;
        if(packets[i].ecpri.subframeId !== subframeId) continue;
        if(packets[i].ecpri.slotId !== slotId) continue;
        if(packets[i].ecpri.dataDir !== dataDir) continue;

        const sym_start = packets[i].ecpri.startSymbolId;
        const sym_max = Math.max(...packets[i].ecpri.sections.map(s => s.numSymbol));
        if(!(sym_start <= symbolId && symbolId<sym_start+sym_max)) continue;

        result.push(i);
    }

    return result;
}

function findUplaneWithRms(packets, frameId, slotId, symbolId, dataDir, rms, index, len){
    let result = [];
    for(let i = index; i < packets.length && i-index < len; i++){

        const u = ecpri_uInPkt[i];
        const slots_in_subframe = (1 << (u || 1));
        let subframeId = Math.floor(slotId/slots_in_subframe);

        if(!packets[i].ecpri) continue;
        if(packets[i].ecpri.message !== 2) continue;
        if(packets[i].ecpri.frameId !== frameId) continue;
        if(packets[i].ecpri.subframeId !== subframeId) continue;
        if(packets[i].ecpri.slotId !== slotId) continue;
        if(packets[i].ecpri.dataDir !== dataDir) continue;

        if(packets[0].ecpri.sections.map((x) => x.rms).reduce((x,y) => x+y) <= 0.0001) continue;

        result.push(i);
    }

    return result;
}
