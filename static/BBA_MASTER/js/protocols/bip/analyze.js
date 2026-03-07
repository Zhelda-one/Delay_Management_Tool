function isInfoForBipCompletenessAvailable(packet) {
    return packet.srcmac && packet.bip;
}

function bip_completeness(packets){

    const results = {};

    for(let i = 0; i < packets.length; ++i){
        const packet = packets[i];

        if(packet.srcmac === undefined || packet.bip === undefined) continue;

        const macSrc = packet.srcmac;
        const bipStream = packet.bip.streamId;
        const eventNum = packet.bip.eventSeqNum;

        if(results[bipStream] === undefined) results[bipStream] = {};
        if(results[bipStream][macSrc] === undefined) results[bipStream][macSrc] = {lastValue: eventNum - 1, ok: true};

        if(results[bipStream][macSrc].ok === false) continue;

        let diff = eventNum - results[bipStream][macSrc].lastValue;
        diff = (diff + 256) % 256;  // 255 -> 0 is also continuous

        if(diff !== 1){
            results[bipStream][macSrc].ok = false;
            results[bipStream][macSrc].failedPacket = i;
        }

        results[bipStream][macSrc].lastValue = eventNum;
    }

    return results;
}

function transposeArray(data){
    if(data.length === 0) return [];

    const results = {};
    Object.keys(data[0]).forEach(key=>{
        results[key] = data.map(entry => entry[key]);
    });

    return results;
}

function check_bip_call(packets, rnti, u, cfoFactor){
    function Extractor(name, callback){
        this.name = name;
        this.callback = callback;
    }
    const extractorMap = {
        'DlData::PdschSendReq': [
            new Extractor('pdschReq', (packet) => packet.l2l1.grants.map(grant => ( {rnti: grant.rnti, mcs: grant.mcs, rvIndex: grant.rvIndex})) )
        ],
        'UlData::PuschReceiveReq': [
            new Extractor('puschReq', (packet) => packet.l2l1.subcells.flatMap(sc => sc.grants.map(grant => ( {rnti: grant.rnti, longTermCfoMetric: Math.atan2(grant.longTermCfoMetric.Im, grant.longTermCfoMetric.Re)*cfoFactor , mcs: grant.mcs }))) )
        ],
        'UlData::PucchReceiveRespPs': [
            new Extractor('pucchRespPs', (packet) => packet.l2l1.subcells.flatMap(sc => sc.pucchResources.map(res => ( {rnti: res.rnti, shortTermTaMetric: res.shortTermTaMetric, dtx: res.dtx, sinr: res.sinr[0] }))) )
        ],
        'UlData::PuschReceiveRespPs': [
            new Extractor('puschRespPs', (packet) => packet.l2l1.subcells.flatMap(sc => sc.grants.map(grant => ( {rnti: grant.rnti, shortTermTaMetric: grant.shortTermTaMetric, shortTermCfoMetric: Math.atan2(grant.shortTermCfoMetric.Q, grant.shortTermCfoMetric.I)*cfoFactor, dtx: grant.dtx, crc: grant.crc, sinr: grant.sinr[0]}))) )
        ],
        'UlData::PuschReceiveRespHarqU': [
            new Extractor('puschRespHarqU', (packet) => packet.l2l1.subcells.flatMap(sc => sc.grants.map(grant => ( {rnti: grant.rnti, dtx: grant.dtx, crc: grant.crc}))) )
        ],
        'UlData::PucchReceiveRespHarqD': [
            new Extractor('pucchRespHarqD', (packet) => packet.l2l1.subcells.flatMap(sc => sc.pucchResources.map(res => ( {rnti: res.rnti, dtx: res.dtx, crc: res.crc}))) )
        ],
        'UlData::PrachReceiveInd': [
            new Extractor('prachInd', (packet) => [ {val: 1} ] )
        ],
        'UlDataFH::PuschReceiveReq': [
            new Extractor('puschReqFH', (packet) => packet.l2l1.grants.map(grant => ( {rnti: grant.rnti, longTermCfoMetric: Math.atan2(grant.longTermCfoMetricImag, grant.longTermCfoMetricReal)*cfoFactor })) )
        ],
        "UL": [
            new Extractor('Ulrms_dBFS', (packet) => [ {rms_dBFS: packet.ecpri.sections.length === 0 ? 0 : packet.ecpri.sections[0].rms_dBFS} ] ) //TODO: how to handle multiple sections?
        ],
        "DL": [
            new Extractor('Dlrms_dBFS', (packet) => [ {rms_dBFS: packet.ecpri.sections.length === 0 ? 0 : packet.ecpri.sections[0].rms_dBFS} ] )
        ]
    };

    const data = {};
    Object.values(extractorMap).forEach(array => array.forEach(extractor => data[extractor.name] = []));

    const time0 = parseFloat(packets[0].time);
    for(let i = 0; i < packets.length; ++i){
        const packet = packets[i];

        const types = [];
        if(packet.ecpri?.dataDir !== undefined){
            types.push(packetPropToStrMap['ecpri.dataDir'][packet.ecpri.dataDir]);
        }
        if(packet.l2l1?.message !== undefined){
            types.push(packetPropToStrMap['l2l1.message'][packet.l2l1.message]);
        }

        for (const type of types) {
            const extractorArray = extractorMap[type];
            if( extractorArray === undefined ) {
                return;
            }

            const isEcpri = type === 'UL' || type === 'DL';

            for (const extractor of extractorArray) {
                const extractedData = extractor.callback(packet);
                if (rnti === 0 || isEcpri) {
                    for (const d of extractedData) {
                        d.time = parseFloat(packet.time) - time0;
                        data[extractor.name].push(d);
                    }
                } else {
                    for (const d of extractedData) {
                        if (ext.rnti === rnti) {
                            d.time = parseFloat(packet.time) - time0;
                            data[extractor.name].push(d);
                        }
                    }
                }
            }
        }
    }

    const transposed = {};
    Object.keys(data).forEach( key => {
        transposed[key] = transposeArray(data[key]);
    });

    return transposed;
}

function check_bip_call_extras(packets, rnti){

    const data = {
        TAC_time: [], TAC_val: [],
        pdschTputVisible: false, pdschTputTime: [], pdschTputValue: [],
        puschTputVisible: false, puschTputTime: [], puschTputValue: []
    }

    if(packets.length === 0) return data;

    const pcapTimeLength = parseFloat(packets[packets.length - 1].time) - parseFloat(packets[0].time);
    const numOfMs = pcapTimeLength > 10 ? 100 : pcapTimeLength > 1 ? 10 : 1;
    const numOfPoints = Math.floor(pcapTimeLength * 1000/ numOfMs);
    for( let i = 0; i <= numOfPoints; ++i ) {
        let timestamp = (i * numOfMs) / 1000;
        data.pdschTputTime.push(timestamp);
        data.puschTputTime.push(timestamp);
        data.pdschTputValue.push(0);
        data.puschTputValue.push(0);
    }

    let t0 = parseFloat(packets[0].time);

    for( let id=0; id<packets.length; id++) {
        const packet = packets[id];
        let timestamp = parseFloat(packet.time) - t0
        let arrIdx = Math.floor(timestamp * 1000 / numOfMs);

        if(packet.l2l1 === undefined) continue;
        if (packetPropToStrMap['l2l1.message'][packet.l2l1.message] === "PdschPayloadTbSendReq_t") {
            //let desc = flexi_ttitrace__get_mac_desc_for_packet( row );
            //let index = desc.indexOf("Timing Advance Command");
            //if (index!=-1 && s.tbFragmentOffset_bits=="0")
            //{
            //    let z=desc.substring(index);
            //    let TAC = z.substring(z.indexOf(":")+1,z.indexOf("<BR>"));
            //    ret+="packet:"+row+"  time:"+timestamp+" TAC:"+TAC+"<BR>\n";
            //    TAC_val .push( parseInt(TAC) );
            //    TAC_time.push( (timestamp) );
            //}
        }
        else if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes("DlData::PdschSendReq")
                && (packet.l2l1?.grants?.length ?? 0) !== 0) {
            if(rnti !== 0 && packet.l2l1.grants[0].rnti !== rnti) continue;

            data.pdschTputVisible = true;
            data.pdschTputValue[arrIdx] += ( packet.l2l1.grants[0].tbSize_bits / 8 ) / numOfMs;
        }
        else if (packetPropToStrMap['l2l1.message'][packet.l2l1.message].includes("UlData::PuschReceiveReq")
                && packet.l2l1?.subcells[0]?.grants[0]?.rvIndex === 0) {
            if(rnti !== 0 && packet.l2l1.subcells[0].grants[0].rnti !== rnti) continue;

            data.puschTputVisible = true;
            data.puschTputValue[arrIdx] += ( packet.l2l1.subcells[0].grants[0].tbSize_bits / 8 ) / numOfMs;
        }
    }

    return data;
}
