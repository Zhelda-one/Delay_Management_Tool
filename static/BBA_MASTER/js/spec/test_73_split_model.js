// Testing script for eCPRI 7-3 fronthaul message flow reference model.

function test_73_split_model(l2l1_stream){

    const config = configSpec;
    const u = config.numerology;
    // init processing units
    const split72 = new L1unit(config,
        config['mac_split72'],
        config['mac_proxy73_72'])
    const proxy73_72 = new L1unit(config,
        config['mac_proxy73_72'],
        config['mac_split73'])

    //random fill split 7-2
    split72.ingress.random_fill(1234, MAX_PRB_COUNT, 4);    // TODO: can't seed in vanilla JS

    const split72ethFrames = [];
    const proxy73_72ethFrames = [];

    const split72Timestamps = [];
    const proxy73_72Timestamps = [];

    const fcpCache72 = {};

    for(const l2l1 of l2l1_stream){
        const isPuschMsg = packetPropToStrMap['l2l1.message'][l2l1.l2l1.message] === 'UlData::PuschReceiveReq';
        const isPucchMsg = packetPropToStrMap['l2l1.message'][l2l1.l2l1.message] === 'UlData::PucchReceiveReq';

        if(isPuschMsg === false && isPucchMsg === false){
            logInfo('RefModel', `Unhandled message ${packetPropToStrMap['l2l1.message'][l2l1.l2l1.message]} (${l2l1.l2l1.message})`);
            continue;
        }

        const fcpOutput = isPuschMsg ? generate_pusch_FCP(l2l1.l2l1, u, config.staticLongPucch)
                        : isPucchMsg ? generate_pucch_FCP(l2l1.l2l1, u, config.staticLongPucch)
                        : [];

        for(const elem of fcpOutput){
            if(isPucchMsg){
                const eAxCProxy73_72 = config.subcells[elem.subcell].ceAxCIdPucch73[elem.ceAxCIndex];
                proxy73_72.L2L1proc.ecpri_sequence.add(eAxCProxy73_72, elem.fcp);
            }

            const eAxCsplit72 = config.subcells[elem.subcell].ceAxCId72[elem.ceAxCIndex];
            const fcpSlotId = elem.fcp.slotId + (elem.fcp.subframeId << 6) + (elem.fcp.frameId << 10) + (eAxCsplit72 << 18);

            const nonconflictingFcp = fcpCache72[fcpSlotId] === undefined
                || (l2l1.time - fcpCache72[fcpSlotId].time) > (config.timing_window/2); // TODO: assumes time is linear
            if(nonconflictingFcp){
                fcpCache72[fcpSlotId] = {id: split72ethFrames.length, time: l2l1.time};
                const ecpri = split72.L2L1proc.ecpri_sequence.generate(eAxCsplit72, elem.fcp);
                const eth = new ethernetFrame(split72.L2L1proc.src_addr, split72.L2L1proc.dst_addr, config['eth_type'], undefined, ecpri);
                split72ethFrames.push(eth);
                split72Timestamps.push(...generateTimestampsEth([eth], l2l1.time, config));
            }
            else{
                const mergedFcp = fcp_merge(elem.fcp, split72ethFrames[fcpCache72[fcpSlotId].id].payload.payload, config.staticLongPucch);
                const mergedEcpri = copy_ecpriHead(split72ethFrames[fcpCache72[fcpSlotId].id].payload, mergedFcp);
                split72ethFrames[fcpCache72[fcpSlotId].id] = new ethernetFrame(split72.L2L1proc.src_addr, split72.L2L1proc.dst_addr, config['eth_type'], undefined, mergedEcpri);
            }
        }

        const ethSeqProxy73_72 = eth_sequence(proxy73_72.L2L1proc.src_addr, proxy73_72.L2L1proc.dst_addr, config['eth_type'], proxy73_72.L2L1proc.ecpri_sequence.frames);
        proxy73_72.L2L1proc.ecpri_sequence.clean();
        proxy73_72ethFrames.push(...ethSeqProxy73_72);
        proxy73_72Timestamps.push(...generateTimestampsEth(ethSeqProxy73_72, l2l1.time, config, true));

        // PUSCH IQ data and eCPRI forwarding
        if(isPuschMsg){
            // --split 7-2--
            const split72up_output = split72.process_L2L1(l2l1.l2l1);
            split72ethFrames.push(...split72up_output);
            split72Timestamps.push(...generateTimestampsEth(split72up_output, l2l1.time, config));

            // --init proxy73 ingress with processed frames--
            for(const frame of split72up_output){
                proxy73_72.ingress.process_ecpri(frame);
            }

            // --split 7-3--
            // forward L2L1 messages as eCPRI Raw   // TODO: is Raw a valid name?
            const ecpriL2l1 = proxy73_72.L2L1proc.l2l1OverEcpri(l2l1.l2l1, l2l1.contentView, u, config.ceAxCIdcPlane);
            proxy73_72ethFrames.push(...ecpriL2l1);
            proxy73_72Timestamps.push(...generateTimestampsEth(ecpriL2l1, l2l1.time, config, true));

            const proxy73_72up_output = proxy73_72.process_L2L1(l2l1.l2l1);
            proxy73_72ethFrames.push(...proxy73_72up_output);
            proxy73_72Timestamps.push(...generateTimestampsEth(proxy73_72up_output, l2l1.time, config, true));
        }
    }

    // Save pcap files
    if(config.generate_split72){
        const split72pcap = new PcapWriter();
        if(split72ethFrames.length !== split72Timestamps.length)
            logError('[RefModel]', `Split72 Frames length (${split72ethFrames.length}) different from Timestamps length (${split72Timestamps.length})`);
        split72pcap.put_stream(split72ethFrames, split72Timestamps);
        split72pcap.downloadPcap('split72.pcap');
    }

    if(config.generate_proxy73_72){
        const proxy73_72pcap = new PcapWriter();
        if(proxy73_72ethFrames.length !== proxy73_72Timestamps.length)
            logError('[RefModel]', `Porxy73_72 Frames length (${proxy73_72ethFrames.length}) different from Timestamps length (${proxy73_72Timestamps.length})`);
        proxy73_72pcap.put_stream(proxy73_72ethFrames, proxy73_72Timestamps);
        proxy73_72pcap.downloadPcap('proxy73_72.pcap');
    }
}

function generateTimestampsEth(ethArray, baseOffset = 0, config, isSplit73 = false){

    const timestamps = [];
    const symTimeOffset = [0, 141312, 281600, 421888, 562176, 702464, 842752, 983040, 1124352, 1264640, 1404928, 1545216, 1685504, 1825792];

    const u = config.numerology;

    const cplane_ul_advance = isSplit73 ? config.cplane_ul_advance72 : config.cplane_ul_advance73;
    const cplane_dl_advance = isSplit73 ? config.cplane_dl_advance72 : config.cplane_dl_advance73;
    const uplane_ul_advance = isSplit73 ? config.uplane_ul_advance72 : config.uplane_ul_advance73;
    const uplane_dl_advance = isSplit73 ? config.uplane_dl_advance72 : config.uplane_dl_advance73;
    const cplane_time_correction = [-cplane_ul_advance / 1000000, -cplane_dl_advance / 1000000];
    const uplane_time_correction = [uplane_ul_advance / 1000000, -uplane_dl_advance / 1000000];

    for(let i = 0; i < ethArray.length; ++i){
        const ecpriMessageType = ethArray[i].payload.ecpriMessageType;
        const ecpriRtcid = ethArray[i].payload.ecpriPcid;
        const ecpri = ethArray[i].payload.payload;
        const dynamicDelay = 0.000001 * ecpriRtcid;

        const slotTime = config.useBaseTimestamps ? baseOffset :
            ecpri.frameId * 0.01 + ecpri.subframeId * 0.001 + ( ( 1966080 * ecpri.slotId ) >> u ) / 1966080000;

        let time = 0;
        if(ecpriMessageType === 0){
            const sym = ecpri.symbolId;
            const dataDir = ecpri.dataDir;
            const uplane_time = slotTime + ( symTimeOffset[sym] >> u ) / 1966080000 + uplane_time_correction[dataDir];

            time = uplane_time;
        }
        else if(ecpriMessageType === 2 || ecpriMessageType === 8 || ecpriMessageType === 9){
            const sym = ecpri.startSymbolId;
            const dataDir = ecpri.dataDir;
            const cplane_time = slotTime + ( symTimeOffset[sym] >> u ) / 1966080000 + cplane_time_correction[dataDir];

            time = cplane_time;
        }
        else{
            time = slotTime;
        }

        timestamps.push(time + dynamicDelay);
    }

    return timestamps;
}

function test_73_split_model_json(){

    const l2l1_array = uprr_stream.map(uprr => {return {l2l1: uprr, contentView: null, time: null};});

    test_73_split_model(l2l1_array);
}

function test_73_split_model_bip(){

    const l2l1_array = [];
    for(let i = 0; i < packets.length; ++i){
        const packet = packets[i];

        if(packetPropToStrMap['l2l1.message'][packet.l2l1?.message] === 'UlData::PuschReceiveReq'||
           packetPropToStrMap['l2l1.message'][packet.l2l1?.message] === 'UlData::PucchReceiveReq') {
            let offset = 22; // macSrc, macDst, ethertype, l2l1 header
            if(packet.vlan) offset += 4 * packet.vlan.length;

            offset += packet.bip.rbip === 0 ? 8 : 16;

            const content = packetsPayloadOffset[i] === -1 ? [] :
                new Uint8Array(packetsPayloadBuffer, packetsPayloadOffset[i] + offset, packet.length - offset);

            l2l1_array.push({l2l1: packet.l2l1, contentView: content, time: parseFloat(packet.time)});
        }
    }

    test_73_split_model(l2l1_array);
}

function fcp_merge(fcpA, fcpB, useExtType6){

    if(fcpA.frameId !== fcpB.frameId || fcpA.subframeId !== fcpB.subframeId || fcpA.slotId !==fcpB.slotId)
        logInfo('RefModel', 'fcp_merge: Incompatible slots');

    if(useExtType6) return fcp_merge6(fcpA, fcpB);
    else return fcp_merge12(fcpA, fcpB);
}

function fcp_merge6(fcpA, fcpB){
    // merge fcps conatining extension type 6
    const fcp = new FastControlPlane(
        fcpA.dataDir,
        fcpA.payloadVer,
        fcpA.filterIndex,
        fcpA.frameId,
        fcpA.subframeId,
        fcpA.slotId,
        Math.min(fcpA.startSymbolId, fcpB.startSymbolId),
        fcpA.numOfSections + fcpB.numOfSections,
        fcpA.sectionType,
        fcpA.udCompHdr,
    );

    for(const section of fcpA.sections){
        fcp.add_section(section);   // TODO: does NOT take ownership, should it? (make copy)
    }
    for(const section of fcpB.sections){
        fcp.add_section(section)
    }

    return fcp;
}

function fcp_merge12(fcpA, fcpB){
    // merge fcps conatining extension type 12

    const sections = mergeSections([...fcpA.sections, ...fcpB.sections]);

    const fcp = new FastControlPlane(
        fcpA.dataDir,
        fcpA.payloadVer,
        fcpA.filterIndex,
        fcpA.frameId,
        fcpA.subframeId,
        fcpA.slotId,
        Math.min(fcpA.startSymbolId, fcpB.startSymbolId),
        sections.length,
        fcpA.sectionType,
        fcpA.udCompHdr,
    );
    sections.forEach(section => fcp.add_section(section));

    return fcp;
}

function mergeSections(sections){

    let sectionMap = {};
    for(let i = 0; i < sections.length; ++i){
        const section = sections[i];
        const key = section.sectionId << 16 + section.beamId;

        if(sectionMap[key] === undefined) sectionMap[key] = [];
        sectionMap[key].push(section);
    }

    let resultSections = [];
    for(const sections of Object.values(sectionMap)){
        resultSections.push(mergeSectionsSimilar(sections));
    }

    return resultSections;
}

function mergeSectionsSimilar(sections){

    let prbRanges = [];
    sections.forEach(section => prbRanges.push([section.startPrbc, section.numPrbc]));

    sections.forEach(section => {
        let lastStart = section.startPrbc + section.numPrbc;
        section.extensions.forEach(ext => ext.ranges.forEach(range => {
            prbRanges.push([range.offStartPrb + lastStart, range.numPrb])
            lastStart += (range.offStartPrb + range.numPrb);
        }));
    });

    prbRanges = prbRanges
        .filter(range => range[0] !== 0 || range[1] !== 0)
        .sort((a,b)=>
        a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

    let normalized = [[prbRanges[0][0], prbRanges[0][1]]]
    for(let i = 1; i < prbRanges.length; ++i){
        if(prbRanges[i][0] === prbRanges[i-1][0] && prbRanges[i][1] === prbRanges[i-1][1]) continue;

        const normalizedStart = prbRanges[i][0] - (prbRanges[i-1][0] + prbRanges[i-1][1]);
        if(normalizedStart < 0) {
            logError('RefModel', 'ExtType12: overlapping ranges');
        }
        normalized.push([normalizedStart, prbRanges[i][1]]);
    }

    normalized = rangesForExtType12(normalized);

    const firstSection = sections[0];
    const section = new FastControlPlaneSection(
        firstSection.sectionId,
        firstSection.padding,
        normalized[0][0],
        normalized[0][1],
        firstSection.reMask,
        firstSection.numSymbol,
        firstSection.extFlag,
        firstSection.beamId
    )

    const extType12 = new SectionExtension12(
        0,
        12,
        Math.ceil(1 + ((normalized.length - 1) / 2)),
        firstSection.extensions[0].priority,
        firstSection.extensions[0].symbolMask
    )

    for(let i = 1; i < normalized.length; ++i){
        extType12.add_range(normalized[i][0], normalized[i][1]);
    }
    if(normalized.length %2 === 0){
        extType12.add_range(0, 0);  // 4-byte padding fill
    }

    section.add_extension(extType12);

    return section;
}

// currently not used, supposedly, no optimizations
function optimizeRanges(ranges){
    if(ranges.length === 0) return [];
    const sorted = ranges.sort((a,b)=>a[0] - b[0]);

    const optimized = [sorted[0]];
    for(let i = 1; i < sorted.length; ++i){
        const range = sorted[i];
        const lastRange = optimized[optimized.length - 1];

        if(range[0] > lastRange[0] + 1){    // adjacent ranges can be combined into one
            optimized.push(range);
        } else {
            lastRange[1] = range[1];
        }
    }

    return optimized;
}

function rangesForExtType12(ranges){
    // all ranges must consist of numbers not larger than one byte

   ranges = ranges.filter((range, id) => id === 0 || range[1] !== 0);

    // if numbers are larger than one byte, insert more ranges
    const adjustedRanges = [];
    for(let i = 0; i < ranges.length; ++i){
        //adjust Start (excluding startPrbc)
        if(i > 0 && ranges[i][0] > 255){
            ranges[i][0] = ranges[i][0] - 255;
            adjustedRanges.push([255, 0]);
        }
        if(ranges[i][1] > 255){
            const overflow = ranges[i][1] - 255;
            adjustedRanges.push([ranges[i][0], 255]);
            ranges[i][0] = 0;
            ranges[i][1] = overflow;
        }
        adjustedRanges.push(ranges[i]);
    }

    return adjustedRanges;
}

function copy_ecpriHead(ecpri, payload){
    const newEcpri = new ecpriFrame(
        ecpri.ecpriVersion,
        ecpri.ecpriConcat,
        ecpri.ecpriMessageType,
        payload._content.length + 4,
        ecpri.ecpriPcid,
        ecpri.ecpriSeqId,
        ecpri.ecpriSeqE,
        ecpri.ecpriSubseqId)
    newEcpri.add_content('payload', payload);

    return newEcpri;
}