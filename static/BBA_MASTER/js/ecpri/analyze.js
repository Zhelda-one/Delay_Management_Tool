function isInfoForEcpriPatternAvailable(packet) {
    return packet.ecpri &&
        packet.ecpri.message === 2 &&
        packet.ecpri.sections.length !== 0;
}

function check_ecpri_pattern(packets){
    let frameMax = 0; /* frames */
    let frameMin = Infinity;
    const numSlots = 16;

    let smap = [];
    const packetsLen = packets.length;
    for(let i = 0; i < packetsLen; ++i){
        const packet = packets[i];

        if (!isInfoForEcpriPatternAvailable(packet))
            continue;

        const ecpri = packet.ecpri;
        const data = {
            frameId: ecpri.frameId, subframeId: ecpri.subframeId, slotId: ecpri.slotId, startSymbolId: ecpri.startSymbolId,
            numSymbol: ecpri.sections[0].numSymbol, dataDir: ecpri.dataDir, sectionType: ecpri.sectionType
        };

        frameMax = Math.max(frameMax, data.frameId);
        frameMin = Math.min(frameMin, data.frameId);

        smap.push(data);
    }

    if(smap.length === 0) return {error: "No eCPRI Real-time control data packets found (with at least a singe section)."};

    const patternLength = frameMax - frameMin + 1;
    const pmap = zeros( patternLength*10*numSlots*14 );
    for( let i= 0; i < smap.length; ++i) {
        const elem = smap[i];
        const frame    = elem.frameId - frameMin;
        const subframe = elem.subframeId;
        const slot     = elem.slotId;
        const symbol   = elem.startSymbolId;
        const symbol_no= elem.numSymbol;
        const dataDir  = elem.dataDir;
        const sectType = elem.sectionType;

        const index    = ((frame*NUM_OF_SF_IN_FRAME+subframe)*numSlots+slot)*NUM_OF_SYM_IN_SLOT + symbol;

        for( let j=0; j<symbol_no; ++j){
            pmap[index+j] |= ( (dataDir === 0) ? 1 : 2) *(sectType === 1 ? 1 : 4);
        }
    }

    const slotEnable= Array(numSlots).fill(false);
    for( let frame= 0; frame < patternLength; ++frame) {
        for( let subframe= 0; subframe < 10; ++subframe) {
            for( let slot= 0; slot < numSlots; ++slot) {
                for( let symbol= 0; symbol < 14; ++symbol) {
                    const index= ((frame*10+subframe)*numSlots+slot)*14 + symbol;
                    if (pmap[index]){
                        slotEnable[slot] = true;
                    }
                }
            }
        }
    }

    return {pmap, slotEnable, numSlots, frameMin, frameMax}
}

const PPAAS_JOB_DETECTION_OPTIONS = {
    JOB_TOTAL_TIME: 0,
    FIFO_CONFIG: 1,
    RX_STREAMS: 2,
    TX_STREAMS: 3,
};

let jobsData = [];
let lastInFifoEnable = new Array(16).fill(0);
let lastOutFifoEnable = new Array(16).fill(0);
let lastInAckWindowLength = new Array(16).fill(0);
let lastInPacketPerAck = new Array(16).fill(0);
let lastInDataAmount = new Array(16).fill(0);
let lastOutAckWindowLength = new Array(16).fill(0);
let lastOutPacketPerAck = new Array(16).fill(0);
let lastOutPacketLength = new Array(16).fill(0);
let lastOutDataAmount = new Array(16).fill(0);

let usedConfigIds = [];

function generatePpaasJobDetectionData(packets, option, jobId) {
    let data = [];

    if (PPAAS_JOB_DETECTION_OPTIONS.JOB_TOTAL_TIME === option) {
        for (let i = 0; i < packets.length; i++) {
            if ((packets[i].ecpri) && (packets[i].ecpri.message === 7) && (packets[i].ecpri.eventType === 2)) {

                if (packets[i].ecpri.faults[0].faultNotification === 3080) {
                    data.push({
                        peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                        jobId: packets[i].ecpri.jobId,
                        start: new Decimal(packets[i].time.toString())
                    });
                }
                if (packets[i].ecpri.faults[0].faultNotification === 3081) {
                    let jobEnded = false;

                    if (data.length === 0) {
                        data.push({
                            peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                            jobId: packets[i].ecpri.jobId,
                            start: '---',
                            end: new Decimal(packets[i].time.toString()),
                            'totalTime[us]': '---'
                        });
                    } else {
                        for (let j = 0; j < data.length; j++) {
                            if ((data[j].end === undefined) && (data[j].peId === parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)))
                                && (data[j].jobId === packets[i].ecpri.jobId)) {
                                data[j].end = new Decimal(packets[i].time.toString());
                                data[j]['totalTime[us]'] = new Decimal(packets[i].time.toString()).sub(data[j].start).mul(1000000).toFixed(3);
                                jobEnded = true;
                                break;
                            }
                        }
                        if (!jobEnded) {
                            data.push({
                                peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                                jobId: packets[i].ecpri.jobId,
                                start: '---',
                                end: new Decimal(packets[i].time.toString()),
                                'totalTime[us]': '---'
                            });
                        }
                    }
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].end === undefined) {
                data[i].end = '---';
                data[i]['totalTime[us]'] = '---';
            }
        }

        data.sort((a, b) => {
            if ((a.start !== '---') && (b.start !== '---')) {
                return parseFloat(a.start) - parseFloat(b.start)
            } else if ((a.end !== '---') && (b.end !== '---')) {
                return parseFloat(a.end) - parseFloat(b.end)
            }
        });
        jobsData = data;
    }

    if (PPAAS_JOB_DETECTION_OPTIONS.FIFO_CONFIG === option) {
        for (let i = 0; i < jobsData.length; i++) {
            if (isTxStreamRoe) jobsData[i].roe = [];
        }

        let fifoConfigPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.pmfile !== undefined)
            && (pkt.ecpri.pmfile !== null) && (pkt.ecpri.message === 4));

        let dataIn = [];
        let dataOut = [];
        let isConfValidInput = false;
        let isConfValidOutput = false;

        for (let i = 0; i < pmFileRegistersPerPacket.length; i++) {

            if (usedConfigIds.includes(i)) continue;

            if (fifoConfigPackets[i].ecpri.readWrite === 0) {
                usedConfigIds.push(i);
                continue;
            }

            if (jobsData[jobId].start === '---') throw new Error('[FIFO config] Job has no start');
            if (new Decimal(fifoConfigPackets[i].time.toString()).greaterThan(jobsData[jobId].start)) break;

            let peId = parseInt(fifoConfigPackets[i].ecpri.elementId.charAt(3));

            if (peId === jobsData[jobId].peId) {
                for (let j = 0; j < pmFileRegistersPerPacket[i].length; j++) {

                    if (pmFileRegistersPerPacket[i][j].name === 'pe_wrapper_' + peId + '.PE_WRAPPER_FIFO_CFG.FIFO_ENABLE') {

                        pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                            if (field.name === 'INPUT_ENABLE') {
                                const value = field.value.toString(2);
                                for (let k = 0; k < value.length; k++) {
                                    lastInFifoEnable[k] = parseInt(value.charAt(value.length - 1 - k));
                                }
                            } else if (field.name === 'OUTPUT_ENABLE') {
                                const value = field.value.toString(2);
                                for (let k = 0; k < value.length; k++) {
                                    lastOutFifoEnable[k] = parseInt(value.charAt(value.length - 1 - k));
                                }
                            }
                        })
                    }

                    if ((pmFileRegistersPerPacket[i][j].name.startsWith('pe_wrapper_' + peId + '.PE_WRAPPER_FIFO_CFG.'))
                        && (pmFileRegistersPerPacket[i][j].name.endsWith('FIFO_CONFIG'))) {

                        const ifId = parseInt(/\[(.*?)\]/.exec(pmFileRegistersPerPacket[i][j].name)[1]);

                        if (pmFileRegistersPerPacket[i][j].name.includes('INPUT')) {
                            pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                                if (field.name === 'ACK_WINDOW_LENGTH') lastInAckWindowLength[ifId] = parseInt(field.value);
                                if (field.name === 'PACKET_PER_ACK') lastInPacketPerAck[ifId] = parseInt(field.value);
                                if (field.name === 'DATA_AMOUNT') lastInDataAmount[ifId] = parseInt(field.value);
                            })
                            if ((lastInFifoEnable[ifId]) || (lastInDataAmount[ifId] !== 0)) {
                                dataIn.push({
                                    ifId: ifId,
                                    fifoEnable: lastInFifoEnable[ifId],
                                    ackWindowLength: lastInAckWindowLength[ifId],
                                    packetPerAck: lastInPacketPerAck[ifId],
                                    dataAmount: lastInDataAmount[ifId]
                                });
                            }
                        } else if (pmFileRegistersPerPacket[i][j].name.includes('OUTPUT')) {
                            pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                                if (field.name === 'ACK_WINDOW_LENGTH') lastOutAckWindowLength[ifId] = parseInt(field.value);
                                if (field.name === 'PACKET_PER_ACK') lastOutPacketPerAck[ifId] = parseInt(field.value);
                                if (field.name === 'PACKET_LENGTH') lastOutPacketLength[ifId] = parseInt(field.value);
                                if (field.name === 'DATA_AMOUNT') lastOutDataAmount[ifId] = parseInt(field.value);
                            })
                            if ((lastOutFifoEnable[ifId]) || (lastOutDataAmount[ifId] !== 0)) {
                                dataOut.push({
                                    ifId: ifId,
                                    fifoEnable: lastOutFifoEnable[ifId],
                                    ackWindowLength: lastOutAckWindowLength[ifId],
                                    packetPerAck: lastOutPacketPerAck[ifId],
                                    packetLength: lastOutPacketLength[ifId],
                                    dataAmount: lastOutDataAmount[ifId]
                                });
                            }
                        }
                    }

                    if ((pmFileRegistersPerPacket[i][j].name.startsWith('pe_wrapper_' + peId + '.PE_WRAPPER_FIFO_CFG.'))
                        && (pmFileRegistersPerPacket[i][j].name.endsWith('_CONF_VALID'))) {

                        if (pmFileRegistersPerPacket[i][j].name.includes('INPUT')) {
                            pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                                if (field.name === 'VALID') {
                                    if (parseInt(field.value) === 1) data[0] = dataIn;
                                    isConfValidInput = true;
                                }
                            })
                        } else if (pmFileRegistersPerPacket[i][j].name.includes('OUTPUT')) {
                            pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                                if (field.name === 'VALID') {
                                    if (parseInt(field.value) === 1) data[1] = dataOut;
                                    isConfValidOutput = true;
                                }
                            })
                        }
                    }

                    if (pmFileRegistersPerPacket[i][j].name.startsWith('pe_wrapper_' + peId + '.ROE_CUSTOM_HEADER.ROE_CUSTOM_HEADER_STREAM')) {
                        let roeData = {};
                        roeData.ifId = parseInt(pmFileRegistersPerPacket[i][j].name.slice(-1));
                        roeData.dataAmount = lastOutDataAmount[roeData.ifId];
                        pmFileRegistersPerPacket[i][j].fields.forEach(field => {
                            if (field.name === 'START_ADDR') {
                                roeData.startAddr = parseInt(field.value);
                            }
                        })
                        jobsData[jobId].roe.push(roeData);
                    }
                }

                usedConfigIds.push(i);
                if (isConfValidInput && isConfValidOutput) break;
            }
        }
        lastInFifoEnable.forEach((fifo, index) => {
            if (fifo) {
                let fifoExists = false;
                dataIn.forEach(row => {
                    if (row.ifId === index) fifoExists = true;
                })
                if (!fifoExists) {
                    dataIn.push({
                        ifId: index,
                        fifoEnable: fifo,
                        ackWindowLength: 0,
                        packetPerAck: 0,
                        dataAmount: 0
                    })
                }
            }
        })
        lastOutFifoEnable.forEach((fifo, index) => {
            if (fifo) {
                let fifoExists = false;
                dataOut.forEach(row => {
                    if (row.ifId === index) fifoExists = true;
                })
                if (!fifoExists) {
                    dataOut.push({
                        ifId: index,
                        fifoEnable: fifo,
                        ackWindowLength: 0,
                        packetPerAck: 0,
                        dataAmount: 0
                    })
                }
            }
        })
    }

    if ([PPAAS_JOB_DETECTION_OPTIONS.RX_STREAMS, PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS].includes(option)) {
        let streamPackets =
            option === PPAAS_JOB_DETECTION_OPTIONS.RX_STREAMS ?
                packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4) && (pkt.ecpri.readWrite !== 0)
                    && (pkt.ecpri.requestResponse === 0) && (parseInt(pkt.ecpri.elementId.charAt(4)) === 2)) :
                (isTxStreamRoe ? packets.filter(pkt => (pkt.roe !== undefined)) :
                    packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4) && (pkt.ecpri.readWrite !== 0)
                        && (pkt.ecpri.requestResponse === 0) && (parseInt(pkt.ecpri.elementId.charAt(4)) === 1)))

        if (streamPackets.length === 0) throw new Error('There are no stream packets');

        let streamsArray = [];
        let streamJobIdBreakpoint = jobId;

        mainLoop:
            for (let i = 0; i < streamPackets.length; i++) {
                if (new Decimal(streamPackets[i].time.toString()).lessThan(jobsData[jobId].start)) {
                    if (isTxStreamRoe && (option === PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS)) {
                        continue;
                    } else {
                        if (parseInt(streamPackets[i].ecpri.elementId.charAt(3)) !== jobsData[jobId].peId) continue;
                    }

                    let streamBeforeJobStartChecker = null;
                    for (let j = jobId - 1; j >= 0; j--) {
                        if (jobsData[j].peId === jobsData[jobId].peId) {
                            streamBeforeJobStartChecker = j;
                            break;
                        }
                    }
                    if (streamBeforeJobStartChecker !== null) {
                        if (jobsData[streamBeforeJobStartChecker].end === '---') throw new Error('Job with the same PE_ID before the current job has no end, so I cannot properly assign stream packet to a job');
                        if (new Decimal(streamPackets[i].time.toString()).greaterThan(jobsData[streamBeforeJobStartChecker].end)) throw new Error('Stream packet is before the job start');
                        continue;
                    } else {
                        throw new Error('Stream packet is before the job start');
                    }
                }

                if (option === PPAAS_JOB_DETECTION_OPTIONS.RX_STREAMS) {
                    if (jobId < (jobsData.length - 1)) {
                        for (let j = jobId + 1; j < jobsData.length; j++) {
                            if (jobsData[jobId].peId === jobsData[j].peId) {
                                streamJobIdBreakpoint = j;
                                break;
                            }
                        }
                        if (streamJobIdBreakpoint !== jobId) {
                            if (jobsData[streamJobIdBreakpoint].start === '---') throw new Error('[RX stream] Next job with the same PE_ID has no start');
                            if (new Decimal(streamPackets[i].time.toString()).greaterThan(jobsData[streamJobIdBreakpoint].start)) break;
                        } else {
                            if (jobsData[jobId].end === '---') throw new Error('[RX stream] Job has no end, while not being the last job in file');
                            if (new Decimal(streamPackets[i].time.toString()).greaterThan(jobsData[jobId].end)) break;
                        }
                    }
                } else if (option === PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS) {
                    if (jobId > 0) {
                        for (let j = jobId - 1; j >= 0; j--) {
                            if (jobsData[jobId].peId === jobsData[j].peId) {
                                streamJobIdBreakpoint = j;
                                break;
                            }
                        }
                        if (streamJobIdBreakpoint !== jobId) {
                            if (jobsData[streamJobIdBreakpoint].end === '---') throw new Error('[TX stream] Previous job with the same PE_ID has no end');
                            if (new Decimal(streamPackets[i].time.toString()).lessThan(jobsData[streamJobIdBreakpoint].end)) continue;
                        }
                    }
                    if (jobsData[jobId].end === '---') throw new Error('[TX stream] Job has no end, while being the first job in file');
                    if (new Decimal(streamPackets[i].time.toString()).greaterThan(jobsData[jobId].end)) break;
                }

                if (isTxStreamRoe && (option === PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS)) {
                    let ifId;
                    let address = streamPackets[i].roe.start_addr;
                    let streamFound = false;
                    let roeStreamId;

                    for (let j = 0; j < jobsData[jobId].roe.length; j++) {
                        if ((address >= jobsData[jobId].roe[j].startAddr) && (address < (jobsData[jobId].roe[j].startAddr + jobsData[jobId].roe[j].dataAmount))) {
                            ifId = jobsData[jobId].roe[j].ifId;
                            roeStreamId = j;
                            break;
                        }
                    }

                    if (streamsArray.length) {
                        for (let k = 0; k < streamsArray.length; k++) {
                            if (streamsArray[k].ifId === ifId) {
                                streamsArray[k].packets.push(streamPackets[i]);
                                streamFound = true;
                                break;
                            }
                        }
                        if (!streamFound) {
                            streamsArray.push({
                                ifId: ifId,
                                packets: []
                            });
                            if (address === jobsData[jobId].roe[roeStreamId].startAddr) streamsArray[streamsArray.length - 1].packets.push(streamPackets[i]);
                        }
                    } else {
                        streamsArray.push({
                            ifId: ifId,
                            packets: []
                        });
                        if (address === jobsData[jobId].roe[roeStreamId].startAddr) streamsArray[streamsArray.length - 1].packets.push(streamPackets[i]);
                    }
                } else {
                    let peId = parseInt(streamPackets[i].ecpri.elementId.charAt(3));
                    let ifId = parseInt(streamPackets[i].ecpri.elementId.charAt(5));
                    let address = streamPackets[i].ecpri.address.substring(6);
                    let streamFound = false;

                    if (peId === jobsData[jobId].peId) {
                        if (streamsArray.length) {
                            for (let j = 0; j < streamsArray.length; j++) {
                                if (streamsArray[j].ifId === ifId) {
                                    if (address === '00:00:00:00') break mainLoop;
                                    streamsArray[j].packets.push(streamPackets[i]);
                                    streamFound = true;
                                    break;
                                }
                            }
                            if (!streamFound) {
                                streamsArray.push({
                                    ifId: ifId,
                                    packets: []
                                });
                                if (address === '00:00:00:00') streamsArray[streamsArray.length - 1].packets.push(streamPackets[i]);
                            }
                        } else {
                            streamsArray.push({
                                ifId: ifId,
                                packets: []
                            });
                            if (address === '00:00:00:00') streamsArray[streamsArray.length - 1].packets.push(streamPackets[i]);
                        }
                    }
                }
            }

        if (option === PPAAS_JOB_DETECTION_OPTIONS.RX_STREAMS) {
            jobsData[jobId].rxStreamPkts = streamsArray
        } else if (option === PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS) {
            jobsData[jobId].txStreamPkts = streamsArray
        }
        for (let i = 0; i < streamsArray.length; i++) {
            let totalDataLength = 0;

            for (let j = 0; j < streamsArray[i].packets.length; j++) {
                totalDataLength += (isTxStreamRoe && (option === PPAAS_JOB_DETECTION_OPTIONS.TX_STREAMS)) ?
                    (streamsArray[i].packets[j].roe.len - 24) : streamsArray[i].packets[j].ecpri.dataLength;
            }

            data.push({
                ifId: streamsArray[i].ifId,
                firstPacketTime: new Decimal(streamsArray[i].packets[0].time.toString()),
                lastPacketTime: new Decimal(streamsArray[i].packets[streamsArray[i].packets.length - 1].time.toString()),
                totalDataLength: totalDataLength
            });
        }
    }
    return data
}

function checkAssertions(packets) {
    let lastPacketsIdsInStreams = []
    for (let i = 0; i < jobsData.length; i++) {
        if (jobsData[i].rxStreamPkts) {
            jobsData[i].rxStreamPkts.forEach(element => {
                lastPacketsIdsInStreams.push(element.packets[element.packets.length - 1].id)
            })
        }
        if (jobsData[i].txStreamPkts) {
            jobsData[i].txStreamPkts.forEach(element => {
                lastPacketsIdsInStreams.push(element.packets[element.packets.length - 1].id)
            })
        }
    }
    for (let i = 0; i < packets.length; i++) {
        let pkt = packets[i]

        if ((pkt.ecpri !== undefined) && (pkt.ecpri.message === 4) && (pkt.ecpri.requestResponse !== 1)
            && (((pkt.ecpri.elementId & 0xF0F0) === 0x3020) || ((pkt.ecpri.elementId & 0xF0F0) === 0x3010))) {
            if (pkt.ecpri.dataLength % 32 === 0) {
                continue;
            } else {
                if (lastPacketsIdsInStreams.includes(pkt.id)) {
                    continue;
                } else {
                    add_packet_malfunction(pkt.id, '[Msg4][Pkt #' + pkt.id + " data length is not divisible by 32B]", 'ecpri.dataLength')
                }
            }
        }

        if ((pkt.ecpri !== undefined) && (pkt.ecpri.message === 4) && (pkt.ecpri.requestResponse !== 1)
            && ((pkt.ecpri.elementId & 0xF0F0) === 0x0030)) {
            if (![0, 8].includes(parseInt(pkt.ecpri.address.substring(16)))) {
                add_packet_malfunction(pkt.id, '[Msg4][Pkt #' + pkt.id + " address must be multiply of 8B]", 'ecpri.address')
            }
        }
    }
    packetTable_renderPackets();
}

function downloadStreamData(type, id) {
    let rxStreams = [];
    let txStreams = [];

    for (let i = 0; i < jobsData[id].rxStreamPkts.length; i++) {
        let stream = [];
        for (let j = 0; j < jobsData[id].rxStreamPkts[i].packets.length; j++) {
            stream = stream.concat(Array.from(ecpri_msgType4Data[jobsData[id].rxStreamPkts[i].packets[j].id]));
        }
        rxStreams.push(stream);
    }
    for (let i = 0; i < jobsData[id].txStreamPkts.length; i++) {
        let stream = [];
        for (let j = 0; j < jobsData[id].txStreamPkts[i].packets.length; j++) {
            stream = stream.concat(Array.from(ecpri_msgType4Data[jobsData[id].txStreamPkts[i].packets[j].id]));
        }
        txStreams.push(stream);
    }

    if (type === 'bin') {
        for (let i = 0; i < rxStreams.length; i++) {
            let strChars = '';
            let filename = `rxStream${i}.bin`;

            strChars = Int8Array.from(rxStreams[i])
            downloadFile(filename, strChars);
        }

        for (let i = 0; i < txStreams.length; i++) {
            let strChars = '';
            let filename = `txStream${i}.bin`;

            strChars = Int8Array.from(txStreams[i])
            downloadFile(filename, strChars);
        }
    }

    if (type === 'hex') {

    }
}

function findBestShift(antId){

    const u = config.load.defaultU;
    const sampling =config.load.sampling*1000000;
    const scaling = 64/(1<<u);
    const Ncp      =  (144*scaling)/16;
    const sr_factor = Math.round( sampling/7680000 );

    const short_cp = Ncp * sr_factor/16;

    let found_correlations = [];

    for(let i = -parseInt(sampling/2000/2**u); i < (sampling/2000/2**u); i+=50) {
        const corr = analyzeCyclicPrefixCorrelation(antId, i);
        found_correlations.push({i:i, mean: corr.mean, lowest: corr.lowest});
    }

    found_correlations.sort(function(a, b) {
        return b.mean+b.lowest-a.mean-a.lowest;
    });

    for(let j = 0; j < 20; j++){
        for(let i = found_correlations[j].i - 25; i < found_correlations[j].i + 25; i++){
            const corr = analyzeCyclicPrefixCorrelation(antId, i);
            found_correlations.push({i:i, mean: corr.mean, lowest: corr.lowest});
        }
    }

    found_correlations.sort(function(a, b) {
        return b.mean+b.lowest-a.mean-a.lowest;
    });

    return found_correlations.slice(0,5);
}

function analyzeCyclicPrefixCorrelation(antId, startSample){

    const u = config.load.defaultU;
    const sampling =config.load.sampling*1000000;

    const scaling = 64/(1<<u);
    const Ncp      =  (144*scaling)/16;
    const sr_factor = Math.round( sampling/7680000 );

    const fft_size = Math.round(8192/(1<<u)* sr_factor/16);

    const cp_map = ones( 7*(1<<u), Ncp * sr_factor/16  );
    cp_map[0] = (Ncp+64) * sr_factor/16;

    const samples_i = time_i[antId];
    const samples_q = time_q[antId];

    let index = parseInt(startSample), i = 0, corrSum = 0;
    let numbOfCorr = 0;

    let cp_len = cp_map[i%cp_map.length];

    let lowestCorrelation = 1;

    while(index+fft_size+cp_len < Math.min(samples_i.length, 307200)){

        let cp_len = cp_map[i%cp_map.length];

        if(index >= 0){

            let indexCp = index;
            let indexEnd = index+fft_size;

            let sum_i = 0, sum_q = 0;
            let cp_rms = 0, end_rms = 0;

            for(let i = 0; i < cp_len; i++){

                let ii = samples_i[indexCp+i]*samples_i[indexEnd+i] - (samples_q[indexCp+i]*-1)*samples_q[indexEnd+i];
                let qq = samples_i[indexCp+i]*samples_q[indexEnd+i] + (samples_q[indexCp+i]*-1)*samples_i[indexEnd+i];

                cp_rms += samples_i[indexCp+i]**2 + samples_q[indexCp+i]**2;
                end_rms += samples_i[indexEnd+i]**2 + samples_q[indexEnd+i]**2;
                sum_i += ii;
                sum_q += qq;
            }

            cp_rms = Math.sqrt( cp_rms/cp_len );
            end_rms = Math.sqrt( end_rms/cp_len );

            const corr = Math.sqrt((sum_i*(1/cp_rms/end_rms/cp_len))**2+(sum_q*(1/cp_rms/end_rms/cp_len))**2)

            if(corr){
                numbOfCorr++;

                corrSum += corr;
                if(lowestCorrelation > corr)
                    lowestCorrelation = corr;

            }
        }

        index += cp_len + fft_size;
        cp_len = cp_map[(i++)%cp_map.length];
    }

    return {mean:corrSum / numbOfCorr, lowest:lowestCorrelation};
}

function calculateCyclicPrefixCorrelation(antId, startSample, cyclicPrefixLength){
    const u = config.load.defaultU;
    const sampling =config.load.sampling*1000000;

    const scaling = 64/(1<<u);
    const Ncp      =  (144*scaling)/16;
    const sr_factor = Math.round( sampling/7680000 );

    const fft_size = Math.round(8192/(1<<u)* sr_factor/16);

    const samples_i = time_i[antId];
    const samples_q = time_q[antId];

    let sum_i = 0, sum_q = 0;
    let cp_rms = 0, end_rms = 0, symbol_rms = 0;
    let maxAmplitude = 0, maxAmplitudePos = 0;
    let cp_amplitudes = [], end_amplitudes = [], abs_error = [], amplitudes_sorted = [];

    for(let i = startSample; i < startSample+cyclicPrefixLength; i++) {
        let ii = samples_i[i] * samples_i[i+fft_size] - (samples_q[i] * -1) * samples_q[i+fft_size];
        let qq = samples_i[i] * samples_q[i+fft_size] + (samples_q[i] * -1) * samples_i[i+fft_size];

        cp_rms += samples_i[i]**2 + samples_q[i]**2;
        end_rms += samples_i[i+fft_size]**2 + samples_q[i+fft_size]**2;

        cp_amplitudes.push(Math.sqrt(samples_i[i]**2 + samples_q[i]**2));
        end_amplitudes.push(Math.sqrt(samples_i[i+fft_size]**2 + samples_q[i+fft_size]**2));
        abs_error.push(Math.sqrt(samples_i[i]**2 + samples_q[i]**2) - Math.sqrt(samples_i[i+fft_size]**2 + samples_q[i+fft_size]**2));

        sum_i += ii;
        sum_q += qq;
    }

    for(let i = startSample+cyclicPrefixLength; i < startSample+cyclicPrefixLength+fft_size; i++){
        amplitudes_sorted.push(Math.sqrt(samples_i[i]**2 + samples_q[i]**2));
        symbol_rms += samples_i[i]**2 + samples_q[i]**2;
        if(maxAmplitude < samples_i[i]**2 + samples_q[i]**2) {
            maxAmplitude = samples_i[i]**2 + samples_q[i]**2;
            maxAmplitudePos = i - (startSample+cyclicPrefixLength);
        }
    }

    cp_rms = Math.sqrt( cp_rms/cyclicPrefixLength );
    end_rms = Math.sqrt( end_rms/cyclicPrefixLength );
    symbol_rms = Math.sqrt( symbol_rms/fft_size );
    maxAmplitude = Math.sqrt( maxAmplitude);
    amplitudes_sorted.sort((a,b) => a-b);

    let corr = Math.sqrt((sum_i*(1/cp_rms/end_rms/cyclicPrefixLength))**2+(sum_q*(1/cp_rms/end_rms/cyclicPrefixLength))**2);
    corr = corr ? corr.toFixed(3) : 0;
    cp_rms = cp_rms.toFixed(3);
    symbol_rms = symbol_rms.toFixed(3);
    maxAmplitude = maxAmplitude.toFixed(3);

    return {amplitudes_sorted:amplitudes_sorted, abs_error: abs_error, cp_amplitudes:cp_amplitudes, end_amplitudes:end_amplitudes, corr: corr, samples: cyclicPrefixLength, cp_rms:cp_rms, symbol_rms:symbol_rms, maxAmplitude:maxAmplitude, maxAmplitudePos:maxAmplitudePos};
}

function getPdpPrachRootSamples(pdpOutPackets) {
    let pdpPrachStream = [];
    for (let i = 0; i < pdpOutPackets.length; i++) {
        pdpPrachStream = pdpPrachStream.concat(Array.from(ecpri_msgType4Data[pdpOutPackets[i].id]));
    }

    let pdpSamplesArray = [];
    for (let i = 0; i < pdpNumOfRoots; i++) {
        pdpSamplesArray.push([]);
        for (let j = 0; j < pdpNumOfSamples; j++) {
            pdpSamplesArray[i].push((pdpPrachStream[0] | pdpPrachStream[1] << 8));
            pdpPrachStream = pdpPrachStream.slice(2);
        }
    }

    let pdpRootsArray = [];
    for (let i = 0; i < pdpNumOfRoots; i++) {
        pdpRootsArray.push(ToSigned_8Bit(pdpPrachStream[0]));
        pdpPrachStream = pdpPrachStream.slice(1);
    }

    const minShift = Math.min(...pdpRootsArray);
    for (let i = 0; i < pdpNumOfRoots; i++) {
        if (pdpRootsArray[i] !== minShift) {
            for (let j = 0; j < pdpNumOfSamples; j++) {
                if (pdpRootsArray[i] - minShift > 0) {
                    pdpSamplesArray[i][j] = pdpSamplesArray[i][j] << (pdpRootsArray[i] - minShift);
                } else {
                    pdpSamplesArray[i][j] = pdpSamplesArray[i][j] >> (pdpRootsArray[i] - minShift);
                }
            }
        }
    }

    return pdpSamplesArray;
}

function generateHacRxJobDetectionData(packets) {
    let data = [];

    for (let i = 0; i < packets.length; i++) {
        if ((packets[i].ecpri) && (packets[i].ecpri.message === 7) && (packets[i].ecpri.eventType === 2)) {

            if (packets[i].ecpri.faults[0].faultNotification === 3080) {
                data.push({
                    peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                    jobId: packets[i].ecpri.jobId,
                    taskId: '',
                    start: new Decimal(packets[i].time.toString())
                });
            }
            if (packets[i].ecpri.faults[0].faultNotification === 3081) {
                let jobEnded = false;

                if (data.length === 0) {
                    data.push({
                        peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                        jobId: packets[i].ecpri.jobId,
                        taskId: '',
                        start: '---',
                        end: new Decimal(packets[i].time.toString()),
                        'totalTime[us]': '---'
                    });
                } else {
                    for (let j = 0; j < data.length; j++) {
                        if ((data[j].end === undefined) && (data[j].peId === parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)))
                            && (data[j].jobId === packets[i].ecpri.jobId)) {
                            data[j].end = new Decimal(packets[i].time.toString());
                            data[j]['totalTime[us]'] = new Decimal(packets[i].time.toString()).sub(data[j].start).mul(1000000).toFixed(3);
                            jobEnded = true;
                            break;
                        }
                    }
                    if (!jobEnded) {
                        data.push({
                            peId: parseInt(packets[i].ecpri.faults[0].elementId.charAt(3)),
                            jobId: packets[i].ecpri.jobId,
                            taskId: '',
                            start: '---',
                            end: new Decimal(packets[i].time.toString()),
                            'totalTime[us]': '---'
                        });
                    }
                }
            }
        }

        if ((packets[i].ecpri) && (packets[i].ecpri.message === 4) && (packets[i].ecpri.elementId === '0x3020')
            && (((packets[i].ecpri.readWrite === 1) || (packets[i].ecpri.readWrite === 2)) && (packets[i].ecpri.requestResponse === 0))
            && (data.length > 0)) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].taskId === '') {
                    data[j].taskId = packets[i].hacrx.taskId;
                    break;
                }
            }
        }
    }
    for (let i = 0; i < data.length; i++) {
        delete data[i].jobId;
        if (data[i].end === undefined) {
            data[i].end = '---';
            data[i]['totalTime[us]'] = '---';
        }
    }

    data.sort((a, b) => {
        if ((a.start !== '---') && (b.start !== '---')) {
            return parseFloat(a.start) - parseFloat(b.start)
        } else if ((a.end !== '---') && (b.end !== '---')) {
            return parseFloat(a.end) - parseFloat(b.end)
        }
    });
    jobsData = data;
    return data
}

function downloadHacRxPayload(type, jobId) {
    let hacRxfilteredPackets = [];

    let stream = [];
    let strChars = '';
    let filename = '';
    switch (type) {
        case 'yb':
            hacRxfilteredPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4)
                && (pkt.ecpri.elementId === '0x3021') && (((pkt.ecpri.readWrite === 1) || (pkt.ecpri.readWrite === 2)) && (pkt.ecpri.requestResponse === 0)))

            filename = `yB_jobId_${jobsData[jobId].taskId}.bin`
            break;
        case 'dmrs':
            hacRxfilteredPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4)
                && (pkt.ecpri.elementId === '0x3022') && (((pkt.ecpri.readWrite === 1) || (pkt.ecpri.readWrite === 2)) && (pkt.ecpri.requestResponse === 0)))

            filename = `dmrs_jobId_${jobsData[jobId].taskId}.bin`
            break;
        case 'rdd':
            hacRxfilteredPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4)
                && (pkt.ecpri.elementId === '0x3023') && (((pkt.ecpri.readWrite === 1) || (pkt.ecpri.readWrite === 2)) && (pkt.ecpri.requestResponse === 0)))

            filename = `rdd_jobId_${jobsData[jobId].taskId}.bin`
            break;
        case 'xsoft':
            hacRxfilteredPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4)
                && (pkt.ecpri.elementId === '0x3010') && (((pkt.ecpri.readWrite === 1) || (pkt.ecpri.readWrite === 2)) && (pkt.ecpri.requestResponse === 0)))

            filename = `xSoft_jobId_${jobsData[jobId].taskId}.bin`
            break;
        case 'beta':
            hacRxfilteredPackets = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 4)
                && (pkt.ecpri.elementId === '0x3011') && (((pkt.ecpri.readWrite === 1) || (pkt.ecpri.readWrite === 2)) && (pkt.ecpri.requestResponse === 0)))

            filename = `beta_jobId_${jobsData[jobId].taskId}.bin`
            break;
    }

    for (let i = 0; i < hacRxfilteredPackets.length; i++) {
        if (new Decimal(hacRxfilteredPackets[i].time.toString()).lessThan(jobsData[jobId].start)) continue;
        if (new Decimal(hacRxfilteredPackets[i].time.toString()).greaterThan(jobsData[jobId].end)) break;
        stream = stream.concat(Array.from(ecpri_msgType4Data[hacRxfilteredPackets[i].id]));
    }

    strChars = Int8Array.from(stream)
    downloadFile(filename, strChars);
}

function downloadHacRxPayloadAll(jobId) {
    downloadHacRxPayload('yb', jobId);
    downloadHacRxPayload('dmrs', jobId);
    downloadHacRxPayload('rdd', jobId);
    downloadHacRxPayload('xsoft', jobId);
    downloadHacRxPayload('beta', jobId);
}
