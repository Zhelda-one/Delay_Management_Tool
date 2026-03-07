let packet_errors_list = {};
let packet_warnings_list = {};

function canPacketContainIqData(packet){
    return packet.hasOwnProperty('ecpri')
        && packet.ecpri.hasOwnProperty('payloadVer')
        && packet.ecpri.payloadVer === 1
        && packet.ecpri.hasOwnProperty('message')
        && packet.ecpri.message === 0;
}

function getComparableValue(val) {
    if (val === undefined) return Number.MAX_SAFE_INTEGER;
    if (val instanceof Time) return val.toNanocesonds(); // returns BigInt
    if (val instanceof Decimal) return val.toNumber();
    if (Array.isArray(val)) return val.length;
    // if (typeof val === "string") return val;
    // if (typeof val === "bigint") return val;
    return val;
}

function sortPackets( column, mode ) {
    const perfNow = performance.now();

    sortedPacketsIds = [...filteredPacketsIds];

    const path = getPathFromFullColName(column);

    sortedPacketsIds.sort((a, b) => {
        const va = getComparableValue(getPacketValue(packets[a], null, path));
        const vb = getComparableValue(getPacketValue(packets[b], null, path));

        // BigInt comparison
        if (typeof va === "bigint" && typeof vb === "bigint") {
            return mode === 0 ? (va > vb ? 1 : va < vb ? -1 : 0) : (va < vb ? 1 : va > vb ? -1 : 0);
        }
        // String comparison
        if (typeof va === "string" && typeof vb === "string") {
            return mode === 0 ? va.localeCompare(vb) : vb.localeCompare(va);
        }
        // Default numeric comparison
        return mode === 0 ? va - vb : vb - va;
    });

    sortColumn = column;
    sortMode = mode;
    sortedPacketsIdsLength = sortedPacketsIds.length;

    logDebug( 'Core', `Packets ${ ( mode ? 'desc.' : 'asc.' ) } sorting by '${ column }' took ${ perfToMsFrom( perfNow ) }` );
}

function getPathFromFullColName(fullColumnName){
    const parts = [];
    let partStart = 0;

    for (let i = 0; i < fullColumnName.length; ) {
        const char = fullColumnName[i];
        if (char === ".") {
            const part = fullColumnName.substr(partStart, i - partStart);
            if (part.length !== 0) parts.push(part);
            ++i;
            partStart = i;
        } else if (char === "[") {
            const beforeIndex = fullColumnName.substr(partStart, i - partStart);
            if (beforeIndex.length === 0) {
                throw new Error("Should be unreachable");
            }

            parts.push(beforeIndex);

            const indexStart = i + 1;
            for (i = indexStart; i < fullColumnName.length; ++i) {
                const char = fullColumnName[i];
                if (char === "]") {
                    break;
                }
            }

            const part = fullColumnName.substr(indexStart, i - indexStart);
            if (part.length !== 0) parts.push(part);
            // NOTE(oleh): Just assume that the closing bracket character is either the last one,
            // or the one following it is a dot, because only these two cases form a valid column path.
            i += 2;
            partStart = i;
        } else {
            ++i;
        }
    }

    const lastPart = fullColumnName.substr(partStart);
    if (lastPart.length !== 0) parts.push(lastPart);

    return parts;
}

function getPacketValue(pkt,fullColumnName, path = ""){
    if(path === "") path = getPathFromFullColName(fullColumnName);

    try{
        let current = pkt;
        for (const key of path) {
            if (current == null || !(key in current)) {
                return undefined;
            }
            current = current[key];
        }
        return current;
        // return path.reduce((acc, key) => acc[key], pkt); (This will throw lots of exceptions)
    }
    catch(e){
        console.log("Throwing happens");
        return undefined;
    }
}

function setPacketValue(pkt, fullColumnName, value) {
    const path = getPathFromFullColName(fullColumnName);

    path.reduce((acc, key, index) => {
        if (index === path.length - 1) {
            acc[key] = value;
        } else {
            if (!acc[key]) acc[key] = {};
            return acc[key];
        }
    }, pkt);
}

function getPacketsColumnsWithValues(packet){
    let result = {};
    dfsPacket(packet,"",result);
    return result;
}

function getPacketsColumns(packet){
    let result = [];
    dfsPacket2(packet,"",result);

    return result;
}

function dfsPacket(obj,baseName,result){
    for(const propName in obj){
        const prop = obj[propName];
        const fullPropname = baseName + propName;

        if(['number','string','boolean','bigint'].includes(typeof prop)){
            result[fullPropname] = prop;
        }
        else if(prop instanceof Time || prop instanceof Decimal){
            result[fullPropname] = prop.toString();
        }
        else if(Array.isArray(prop)){
            if(typeof prop[0] !== 'object'){
                result[fullPropname] = prop;
            }
            else{
                for( let i = 0; i < prop.length; ++i ){
                    dfsPacket(prop[i], `${fullPropname}[${i}].`,result)
                }
            }
        }
        else{
            dfsPacket(prop, fullPropname + ".",result)
        }
    }
}

function dfsPacket2(obj,baseName,result){
    for(const propName in obj){
        const prop = obj[propName];
        const fullPropname = baseName + propName;

        if(['number','string','boolean','bigint'].includes(typeof prop)){
            result.push( fullPropname );
        }
        else if(prop instanceof Time || prop instanceof Decimal){
            result.push( fullPropname );
        }
        else if(Array.isArray(prop)){
            if(typeof prop[0] !== 'object'){
                result.push( fullPropname );
            }
            else{
                for( let i = 0; i < prop.length; ++i ){
                    dfsPacket2(prop[i], `${fullPropname}[${i}].`,result)
                }
            }
        }
        else{
            dfsPacket2(prop, fullPropname + ".",result)
        }
    }
}

function validate_existence( pktId, pkt, propName ) {
    if (packet_errors_list[pktId]) delete packet_errors_list[pktId][propName];
    return getPacketValue(pkt,propName) !== undefined;
}

function validate_array_length( pktId, pkt, propName, minLen, maxLen ) {
    if (packet_errors_list[pktId]) delete packet_errors_list[pktId][propName];
    if (validate_existence(pktId, pkt, propName)) {
        const propVal = getPacketValue(pkt,propName);
        if (!Array.isArray( propVal )) {
            packet_error = true
            add_packet_malfunction(pktId, '[ValidateError][Pkt #' + pktId + " property '" + propName + "' should be an array", propName)
        } else if (propVal.length < minLen || propVal.length > maxLen) {
            packet_error = true
            add_packet_malfunction(pktId, '[ValidateError][Pkt #' + pktId + " property '" + propName + "' array length should be in range [" + minLen + ', ' + maxLen + '] but given ' + pkt[propName].length, propName)
        }
    }
}

function validate_value( pktId, pkt, propName, val ) {
    if (packet_errors_list[pktId]) delete packet_errors_list[pktId][propName];
    if (validate_existence(pktId, pkt, propName)) {
        if (getPacketValue(pkt,propName) !== val) {
            packet_error = true
            add_packet_malfunction(pktId, '[ValidateError][Pkt #' + pktId + " property '" + propName + "' should be equal to '" + val + "', but given " + pkt[propName], propName)
        }
    }
}

function validate_value_array( pktId, pkt, propName, arr ) {
    if (packet_errors_list[pktId]) delete packet_errors_list[pktId][propName];
    if (validate_existence(pktId, pkt, propName)) {
        if (!arr.includes( getPacketValue(pkt,propName) )) {
            packet_error = true
            add_packet_malfunction(pktId,'[ValidateError][Pkt #' + pktId + " property '" + propName + "' should be one of [" + arr + '] but given ' + pkt[propName], propName)
        }
    }
}

function validate_value_range( pktId, pkt, propName, min, max ) {
    if (packet_errors_list[pktId]) delete packet_errors_list[pktId][propName];
    if (validate_existence(pktId, pkt, propName)) {
        const propVal = getPacketValue(pkt,propName);
        if (propVal < min || propVal > max) {
            packet_error = true
            add_packet_malfunction(pktId, '[ValidateError][Pkt #' + pktId + " property '" + propName + "' should be in range [" + min + ', ' + max + '] but given ' + pkt[propName], propName)
        }
    }
}

function validate_packet(pktId) {
    packet_error = false;
    const pkt = packets[pktId];

    if (pkt.hasOwnProperty('ecpri')) {
        const pktEcpri = pkt.ecpri;

        validate_value(pktId, pktEcpri, 'version', 1);
        validate_value(pktId, pktEcpri, 'concat', 0);
        validate_value_array(pktId, pktEcpri, 'message', [0, 2, 4, 5, 6, 7, 8, 9, 64, 65]);
        validate_value_range(pktId, pktEcpri, 'payload', 0, 9000); // 1500 default, extend to 9000 to support jumbo frames (eCPRI msg type 4)
        validate_value_range(pktId, pktEcpri, 'rtcId', 0, 0xFFFF);
        validate_value_range(pktId, pktEcpri, 'seqId', 0, 0xFFFF);
        validate_value_range(pktId, pktEcpri, 'dataDir', 0, 1);
        validate_value_array(pktId, pktEcpri, 'payloadVer', [1, 7]);
        validate_value_range(pktId, pktEcpri, 'filterIndex', 0, 5);
        validate_value_range(pktId, pktEcpri, 'frameId', 0, 255);
        validate_value_range(pktId, pktEcpri, 'subframeId', 0, 9);
        validate_value_range(pktId, pktEcpri, 'slotId', 0, 15);
        validate_value_range(pktId, pktEcpri, 'startSymbolId', 0, 13);
        validate_array_length(pktId, pktEcpri, 'sections', 1, 255);

        if (pktEcpri.hasOwnProperty('message') && pktEcpri.hasOwnProperty('payload') && pktEcpri.hasOwnProperty('sections')) {
            if (pktEcpri.message === 0) // IQ data message
            {
                for (let sectIdx = 0; sectIdx < pktEcpri.sections.length; ++sectIdx) {
                    const pktSect = pktEcpri.sections[sectIdx];
                    // const sectStart = "ecpri.sections[" + sectIdx + "]."

                    validate_value_range(pktId, pktSect, 'sectionId', 0, 4095);
                    validate_value_range(pktId, pktSect, 'rb', 0, 1);
                    validate_value_range(pktId, pktSect, 'symInc', 0, 1);
                    validate_value_range(pktId, pktSect, 'startPrb', 0, 1023);
                    validate_value_range(pktId, pktSect, 'numPrb', 0, 273);

                    if (pktSect.hasOwnProperty('startPrb') && pktSect.hasOwnProperty('numPrb')) {
                        let iq_bit_width = config.load.iqBitWidth;
                        let iq_comp_method = config.load.iqCompMethod
                        let prbNum = pktSect.numPrb;

                        validate_array_length(pktId, pktSect, 'iSample', prbNum * 12, prbNum * 12);
                        validate_array_length(pktId, pktSect, 'qSample', prbNum * 12, prbNum * 12);

                        if (config.load.dynamicIqComp) {
                            validate_value_range(pktId, pktSect, 'udCompHdr', 0, 255);
                            if (pktSect.hasOwnProperty('udCompHdr')) {
                                iq_bit_width = pktSect.udCompHdr >> 4;
                                if (iq_bit_width === 0) iq_bit_width = 16;
                                iq_comp_method = pktSect.udCompHdr & 0xF;
                            }
                        }

                        switch (iq_comp_method) {
                            case 0:
                            case 1:
                            case 2:
                                break;
                            // TODO
                        }
                    }
                }
            } else if (pktEcpri.message === 2) // Real-time control data message
            {
                validate_value_range(pktId, pktEcpri, 'numberOfSections', 1, 255);
                validate_value_array(pktId, pktEcpri, 'sectionType', [0, 1, 3, 4, 5, 6, 7, 240]);

                if (pktEcpri.hasOwnProperty('numberOfSections') && pktEcpri.hasOwnProperty('sectionType')) {
                    if (pktEcpri.sectionType === 0 || pktEcpri.sectionType === 3) {
                        validate_value_range(pktId, pktEcpri, 'timeOffset', 0, 65535);
                        validate_value_range(pktId, pktEcpri, 'frameStructure', 0, 255);
                        validate_value_range(pktId, pktEcpri, 'cpLength', 0, 65535);
                        if (pktEcpri.sectionType === 3) validate_value_range(pktId, pktEcpri, 'udCompHdr', 0, 255);
                    } else if (pktEcpri.sectionType === 1 || pktEcpri.sectionType === 5) {
                        validate_value_range(pktId, pktEcpri, 'udCompHdr', 0, 255);
                    } else if (pktEcpri.sectionType === 6) {
                        validate_value_range(pktId, pktEcpri, 'numberOfUEs', 0, 255);
                    } else if (pktEcpri.sectionType === 240) {
                        validate_value(pktId, pktEcpri, 'numberOfSections', 1);
                    }

                    for (let sectIdx = 0; sectIdx < pktEcpri.sections.length; ++sectIdx) {
                        const pktSect = pktEcpri.sections[sectIdx];
                        // const sectStart = "ecpri.sections[" + sectIdx + "]."

                        if ([0, 1, 3, 5].includes(pktEcpri.sectionType)) {
                            validate_value_range(pktId, pktSect, 'sectionId', 0, 4095);
                            validate_value_range(pktId, pktSect, 'rb', 0, 1);
                            validate_value_range(pktId, pktSect, 'symInc', 0, 1);
                            validate_value_range(pktId, pktSect, 'startPrbc', 0, 1023);
                            validate_value_range(pktId, pktSect, 'numPrbc', 0, 255);
                            validate_value_range(pktId, pktSect, 'reMask', 0, 4095);
                            validate_value_range(pktId, pktSect, 'numSymbol', 0, 15);
                            validate_value_range(pktId, pktSect, 'ef', 0, 1);

                            if (pktEcpri.sectionType === 1 || pktEcpri.sectionType === 3) {
                                validate_value_range(pktId, pktSect, 'beamId', 0, 32767);
                                if (pktEcpri.sectionType === 3) {
                                    validate_value_range(pktId, pktSect, 'freqOffset', -8388608, 8388607);
                                }
                            } else if (pktEcpri.sectionType === 5) {
                                validate_value_range(pktId, pktSect, 'ueId', 0, 0x7FFF);
                            }
                        } else if (pktEcpri.sectionType === 6) {
                            validate_value_range(pktId, pktSect, 'ef', 0, 1);
                            validate_value_range(pktId, pktSect, 'ueId', 0, 0x7FFF);
                            validate_value_range(pktId, pktSect, 'regularizationFactor', 0, 0xFFFF);
                            validate_value_range(pktId, pktSect, 'rb', 0, 1);
                            validate_value_range(pktId, pktSect, 'symInc', 0, 1);
                            validate_value_range(pktId, pktSect, 'startPrbc', 0, 1023);
                            validate_value_range(pktId, pktSect, 'numPrbc', 0, 255);
                            validate_array_length(pktId, pktSect, 'ciIsample', 0,);
                            validate_array_length(pktId, pktSect, 'ciQsample');
                            if (pktSect.hasOwnProperty('ciIsample') && pktSect.hasOwnProperty('ciQsample') && pktSect.ciIsample.length !== pktSect.ciQsample.length) {
                                packet_error = true
                            }
                            // TODO: ci(I/Q)sample
                        } else if (pktEcpri.sectionType === 7) {
                            validate_value_range(pktId, pktSect, 'laaMsgType', 0, 6);
                            validate_value_range(pktId, pktSect, 'lbtHandle', 0, 0xFFFF);

                            if (pktSect.hasOwnProperty('laaMsgType') && pktSect.laaMsgType >= 0 && pktSect.laaMsgType <= 6) {
                                const laaMsgLenArr = [2, 2, 2, 1, 1, 2, 1];
                                validate_value(pktId, pktSect, 'laaMsgLen', laaMsgLenArr[pktSect.laaMsgType]);
                                switch (pktSect.laaMsgType) {
                                    case 0: // LBT_PDSCH_REQ
                                        validate_value_range(pktId, pktSect, 'lbtOffset', 0, 999);
                                        validate_value_range(pktId, pktSect, 'lbtMode', 0, 3);
                                        validate_value_array(pktId, pktSect, 'lbtDeferFactor', [1, 3, 74]);
                                        validate_value_range(pktId, pktSect, 'lbtBckoffCounter', 0, 1023);
                                        validate_value_range(pktId, pktSect, 'MCOT', 0, 10);
                                        break;
                                    case 1: // LBT_DRS_REQ
                                        validate_value_range(pktId, pktSect, 'lbtOffset', 0, 999);
                                        validate_value_range(pktId, pktSect, 'lbtMode', 0, 3);
                                        break;
                                    case 2: // LBT_PDSCH_RSP
                                        validate_value_range(pktId, pktSect, 'lbtPdschRes', 0, 3);
                                        validate_value_range(pktId, pktSect, 'inParSF', 0, 1);
                                        validate_value_range(pktId, pktSect, 'sfStatus', 0, 1);
                                        validate_value_range(pktId, pktSect, 'sfnSf', 0, 255);
                                        break;
                                    case 3: // LBT_DRS_RSP
                                        validate_value_range(pktId, pktSect, 'lbtDrsRes', 0, 1);
                                        break;
                                    case 4: // LBT_Buffer_Error
                                        validate_value_range(pktId, pktSect, 'lbtBufErr', 0, 1);
                                        break;
                                    case 5: // LBT_CWCONFIG_REQ
                                        validate_value_range(pktId, pktSect, 'lbtCWConfig_H', 0, 255);
                                        validate_value_range(pktId, pktSect, 'lbtCWConfig_T', 0, 255);
                                        validate_value_range(pktId, pktSect, 'lbtMode', 0, 3);
                                        validate_value_range(pktId, pktSect, 'lbtTrafficClass', 0, 7);
                                        break;
                                    case 6: // LBT_CWCONFIG_RSP
                                        validate_value_range(pktId,pktSect, 'lbtCWR_Rst', 0, 1);
                                        break;
                                }
                            }
                        } else if (pktEcpri.sectionType === 240) {
                            validate_value_range(pktId, pktSect, 'sectionId', 0, 4095);
                            validate_value_range(pktId, pktSect, 'historyNumOfSlots', 0, 2);
                            validate_value_range(pktId, pktSect, 'historyFrameId', 0, 1023);
                            validate_value_range(pktId, pktSect, 'historySlotId', 0, 79);
                            validate_value_range(pktId, pktSect, 'eventTrigger', 0, 0xFFFFFFFFFFFFFFFF);
                        }

                        // isExtTypeAllowed[sectionType][extType]
                        const isExtTypeAllowed = {
                            //  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17
                            0: [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                            1: [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                            3: [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                            5: [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                            6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]
                        };

                        if (pktSect.hasOwnProperty('ef') && pktSect.ef === 1 && [0, 1, 3, 5, 6].includes(pkt.sectionType)) {
                            if (pktSect.hasOwnProperty('extensions')) {
                                for (let sectExtIdx = 0; sectExtIdx < pktSect.extensions.length; ++sectExtIdx) {
                                    const sectExt = pktSect.extensions[sectExtIdx];
                                    // const sectStart = "ecpri.sections[" + sectIdx + "]."

                                    // validate_value_range(pktId, tracedPacket, sectStart+'ef', 0, 1);
                                    validate_value_range(pktId, sectExt, 'extType', 1, 17);

                                    if (sectExt.hasOwnProperty('extType') && sectExt.extType >= 1 || sectExt.extType <= 17) {
                                        if (!isExtTypeAllowed[pkt.sectionType][sectExt.extType]) {
                                            packet_error = true
                                            ++validate_error_counter;
                                            continue;
                                        }

                                        validate_value_range(pktId, sectExt, 'extLen', 1, sectExt.extType === 11 ? 65535 : 255);

                                        switch (sectExt.extType) {
                                            case 1:
                                                validate_value_range(pktId, sectExt, 'bfwCompHdr', 0, 1);
                                                if (sectExt.hasOwnProperty('bfwCompHdr')) {
                                                    let bfwIqWidth = sectExt.bfwCompHdr >> 4;
                                                    let bfwCompMeth = sectExt.bfwCompHdr & 0xF;

                                                    if (bfwCompMeth !== 0) {
                                                        validate_value_range(pktId, sectExt, 'bfwCompParam', 0, 1);
                                                    }

                                                    if (sectExt.hasOwnProperty('bfwI') && Array.isArray(sectExt['bfwI'])) {
                                                        let totalLength = 3 + (bfwCompMeth === 0 ? 0 : 1) + Math.trunc((bfwIqWidth * sectExt.bfwI.length + 7) / 8);
                                                        let extLen = Math.trunc((totalLength + 3) / 4);
                                                        validate_value(pktId, sectExt, 'extLen', extLen);
                                                    }
                                                }
                                                validate_array_length(pktId, sectExt, 'bfwI', 1, 64);
                                                validate_array_length(pktId, sectExt, 'bfwQ', 1, 64);

                                                break;
                                            case 2:
                                                validate_value_range(pktId, sectExt, 'bfaCompHdr', 0, 0xFFFF);
                                                if (sectExt.hasOwnProperty('bfaCompHdr')) {
                                                    let bfAzPtWidth = (sectExt.bfaCompHdr >> 11) & 0x7;
                                                    let bfZePtWidth = (sectExt.bfaCompHdr >> 8) & 0x7;
                                                    let bfAz3ddWidth = (sectExt.bfaCompHdr >> 3) & 0x7;
                                                    let bfZe3ddWidth = sectExt.bfaCompHdr & 0x7;

                                                    if (bfAzPtWidth) validate_value_range(pktId, sectExt, 'bfAzPt', 0, (1 << (++bfAzPtWidth)) - 1);
                                                    if (bfZePtWidth) validate_value_range(pktId, sectExt, 'bfZePt', 0, (1 << (++bfZePtWidth)) - 1);
                                                    if (bfAz3ddWidth) validate_value_range(pktId, sectExt, 'bfAz3dd', 0, (1 << (++bfAz3ddWidth)) - 1);
                                                    if (bfZe3ddWidth) validate_value_range(pktId, sectExt, 'bfZe3dd', 0, (1 << (++bfZe3ddWidth)) - 1);

                                                    let bfSumWidth = bfAzPtWidth + bfZePtWidth + bfAz3ddWidth + bfZe3ddWidth;
                                                    if (bfSumWidth > 24) {
                                                        validate_value(pktId, sectExt, 'extLen', 3);
                                                    } else {
                                                        validate_value(pktId, sectExt, 'extLen', 2);
                                                    }
                                                }
                                                validate_value_range(pktId, sectExt, 'bfAzSl', 0, 7);
                                                validate_value_range(pktId, sectExt, 'bfZeSl', 0, 7);
                                                break;
                                            case 3:
                                                validate_value_array(pktId, sectExt, 'extLen', [1, 4]);
                                                validate_value_range(pktId, sectExt, 'codebookIndex', 0, 0xFF);
                                                validate_value_range(pktId, sectExt, 'layerId', 0, 15);
                                                validate_value_range(pktId, sectExt, 'numLayers', 0, 15);
                                                if (sectExt.hasOwnProperty('extLen') && sectExt.extLen === 4) {
                                                    validate_value(pktId, sectExt, 'extLen', 4);
                                                    validate_value_range(pktId, sectExt, 'txScheme', 0, 2);
                                                    validate_value_range(pktId, sectExt, 'crsReMask', 0, 0xFFF);
                                                    validate_value_range(pktId, sectExt, 'crsShift', 0, 1);
                                                    validate_value_range(pktId, sectExt, 'crsSymNum', 0, 13);
                                                    validate_value_range(pktId, sectExt, 'beamIdAP1', 0, 0xFFFF);
                                                    validate_value_range(pktId, sectExt, 'beamIdAP2', 0, 0xFFFF);
                                                    validate_value_range(pktId, sectExt, 'beamIdAP3', 0, 0xFFFF);
                                                } else {
                                                    validate_value(pktId, sectExt, 'extLen', 1);
                                                }
                                                break;
                                            case 4:
                                                validate_value(pktId, sectExt, 'extLen', 1);
                                                validate_value_range(pktId, sectExt, 'csf', 0, 1);
                                                validate_value_range(pktId, sectExt, 'modCompScaler', 0, 0x7FFF);
                                                break;
                                            case 5:
                                                //TODO:
                                                //validate_value( sectExt, 'extLen', 2 );
                                                // validate_value( sectExt, 'mcScaleReMask', 2 );
                                                // validate_value( sectExt, 'csf' );
                                                // validate_value( sectExt, 'mcScaleOffset' );
                                                break;
                                            case 6:
                                                validate_value(pktId, sectExt, 'extLen', 2);
                                                validate_value_range(pktId, sectExt, 'repetition', 0, 1);
                                                validate_value_range(pktId, sectExt, 'rbgSize', 1, 7);
                                                validate_value_range(pktId, sectExt, 'rbgMask', 0, 0xFFFFFFF);
                                                validate_value_range(pktId, sectExt, 'priority', 0, 3);
                                                validate_value_range(pktId, sectExt, 'symbolMask', 0, 0x3FFF);
                                                break;
                                            case 7:
                                                validate_value(pktId, sectExt, 'extLen', 1);
                                                validate_value_range(pktId, sectExt, 'eAxCmask', 0, 0xFFFF);
                                                break;
                                            case 8:
                                                validate_value(pktId, sectExt, 'extLen', 1);
                                                validate_value_range(pktId, sectExt, 'regularizationFactor', 0, 0xFFFF);
                                                break;
                                            case 9:
                                                validate_value(pktId, sectExt, 'extLen', 1);
                                                validate_value_range(pktId, sectExt, 'technology', 0, 1);
                                                break;
                                            case 10:
                                                validate_value_range(pktId, sectExt, 'beamGroupType', 0, 2);
                                                validate_value_range(pktId, sectExt, 'numPortc', 0, 63);
                                                if (sectExt.hasOwnProperty('beamGroupType')) {
                                                    if (sectExt.beamGroupType === 2) {
                                                        validate_value(pktId, sectExt, 'extLen', 3);
                                                        if (sectExt.hasOwnProperty('beamID')) {
                                                            validate_array_length(pktId, sectExt, 'beamID', 3, 3);
                                                        } else if (sectExt.hasOwnProperty('ueID')) {
                                                            validate_array_length(pktId, sectExt, 'ueID', 3, 3);
                                                        } else {
                                                            packet_error = true
                                                        }
                                                    } else {
                                                        validate_value(pktId, sectExt, 'extLen', 1);
                                                    }
                                                }
                                                break;
                                            case 12:
                                                let offStartPrbLen = sectExt.offStartPrb.length * 2;
                                                break;
                                            case 14:
                                                validate_value(pktId, sectExt, 'extLen', 1);
                                                validate_value_range(pktId, sectExt, 'nullLayerInd', 0, 1);
                                                break;
                                            case 15:
                                                validate_value(pktId, sectExt, 'extLen', 2);
                                                validate_value_range(pktId, sectExt, 'frameStructure', 0, 0xFF);
                                                validate_value_range(pktId, sectExt, 'freqOffset', 0, 0xFFFFFF);
                                                validate_value_range(pktId, sectExt, 'cpLength', 0, 0xFFFF);
                                                break;
                                            // TODO:
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(packet_errors_list[pktId] && Object.keys(packet_errors_list[pktId]).length > 0) packet_error = true;

    return packet_error;
}
function check_for_errors_in_packets(){
    for(let i = 0; i < packets.length; i++){
        validate_packet(i);
    }
}

function add_packet_malfunction(idx, error, propName){
    if(!packet_errors_list[idx])
        packet_errors_list[idx] = {};

    packet_errors_list[idx][propName] = error;
}

function add_packet_warning(idx, warning, propName){
    if(!packet_warnings_list[idx])
        packet_warnings_list[idx] = {};

    packet_warnings_list[idx][propName] = "Warning: " + warning;
}

// Funcion returns a pair of data pointer and data view
function getPacketPayload(id, offset = 0){

    const pkt = packets[id];
    const fragInfo = fragmentedPkts[id];

    if(fragInfo === undefined){
        const globalOffset = packetsPayloadOffset[id] + offset;
        const length = pkt.length - offset;
        return {ptr: new Uint8Array( packetsPayloadBuffer, globalOffset, length ),
            dataView: new DataView( packetsPayloadBuffer, globalOffset, length ),
            buffer: packetsPayloadBuffer};
    }

    // splice fragmented payloads
    const fragmentInfo = fragmentedPkts[id];

    let dataOffset = 30; // eth: 14, [(bip: 8, l2l1: 8) OR (ecpri: 8, APP: 8)]
    if( pkt.hasOwnProperty( 'vlan' ) ) dataOffset += 4 * pkt.vlan.length;
    // if( pkt.hasOwnProperty( 'qinq' ) ) dataOffset += 4 * pkt.qinq.length;
    if( pkt.bip?.rbip ) dataOffset += 8;

    const crcSize = 0;
    let payloadSize = dataOffset;
    fragmentInfo.pktIds.forEach(pktId =>{
        payloadSize += packets[pktId].length - dataOffset - crcSize;
    })

    const dataBuffer = new ArrayBuffer(payloadSize);
    const dataBufferPtr = new Uint8Array(dataBuffer);

    //copy finals pkts header
    dataBufferPtr.set(new Uint8Array(packetsPayloadBuffer, packetsPayloadOffset[fragmentInfo.lastPkt], dataOffset));

    let dataRead = dataOffset;
    fragmentInfo.pktIds.forEach(pktId =>{
        const payloadOffset = packetsPayloadOffset[pktId];
        const dataToRead = packets[pktId].length - dataOffset - crcSize;
        dataBufferPtr.set(new Uint8Array(packetsPayloadBuffer, payloadOffset + dataOffset, dataToRead), dataRead);
        dataRead += dataToRead;
    })
    // return pointer and view
    return {ptr: new Uint8Array(dataBuffer, offset), dataView: new DataView(dataBuffer, offset), buffer: dataBuffer};
}

function fragmentation_postPcapDecode(){
    // goes through all fragmented packets and decodes them
    let defragmentedPackets = 0;
    for(const [pktId, info] of Object.entries(fragmentedPkts)){
        packets[pktId].transportation.finished = 1;
        if(pktId !== `${info.lastPkt}`) continue;
        ++defragmentedPackets;

        const pkt = packets[pktId];

        let dataOffset = 30; // eth: 14, [(bip: 8, l2l1: 8) OR (ecpri: 8, APP: 8)]
        if( pkt.hasOwnProperty( 'vlan' ) ) dataOffset += 4 * pkt.vlan.length;
        // if( pkt.hasOwnProperty( 'qinq' ) ) dataOffset += 4 * pkt.qinq.length;
        if( pkt.bip?.rbip ) dataOffset += 8;

        const payloadInfo = getPacketPayload(pktId, 0);

        switch(pkt.ecpri.message){
            case 8:
            case 9:
                l2l1_detectMessage(pkt, payloadInfo.buffer, dataOffset - 4, payloadInfo.buffer.byteLength); // offset - 4, to get messageId
                break;
            case 0:
                if(pkt.ecpri.channelType === 1) ecpri_decodePdschTb(pkt, payloadInfo.buffer, dataOffset, payloadInfo.buffer.byteLength);
                else if(pkt.ecpri.channelType === 2) ecpri_decodePdcchDci(pkt, payloadInfo.buffer, dataOffset, payloadInfo.buffer.byteLength);
        }
    }

    let notDefragmented = 0;
    for(const [messageType, rtcids] of Object.entries(defragmentationHelper)){
        for(const subseqs of Object.values(rtcids)) {
            for (const subsequenceId of Object.keys(subseqs)) {
                ++notDefragmented;
            }
        }
        defragmentationHelper[messageType] = {};
    }

    if(defragmentedPackets > 0)
        logInfo("TransportFrag", `Successfuly defragmented ${defragmentedPackets} packets`);
    if(notDefragmented > 0)
        logInfo("TransportFrag", `Failed to defragment ${notDefragmented} subsequenceIds`);
}

function generateTimingValues_data(){
    const perfNow = performance.now();
    //  TAI-UTC=37[s], GPS-UTC=19[s]. PTP and our BBU is using TAI, Unix is using UTC.  TAI-GPS=18[s]
    const tai2gps = 315964819; //PTP epoch is 01.01.1970 00:00:00 according to 7.2.3 of IEEE 1588-2019 standard (spec can be found on sharepoint)
    const unix2gps = 315964800 - 18; //18 leap seconds were added since 1980

    const time_per_p_counter_tick_in_frames = 3200 / (config.load.sampling * 1000000);

    const data = {
        X: [], Y: [],
        Dt: 0, Ds: 0,
        time2gps: tai2gps,
        X_index: [], Delay: [],
        message: "", errors: []
    }

    let auto_found = false;
    if((config.load.sync === 'PTP') || ( (config.load.sync === 'auto') && (auto_found === false) )){

        let sync_i = 0;
        let last_delay_request = 0;

        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i]

            if (packet?.ptp?.originTimestampS !== undefined) {
                if (packet.ptp.originTimestampS === 0) {
                    sync_i = i;
                    continue;
                }

                if (packet.ptp.messageType === 1) {  // delay req
                    last_delay_request = packet.ptp.originTimestampNs;
                }
                else if (packet.ptp.messageType === 9) { // delay resp
                    const delay = new Decimal(packet.ptp.originTimestampNs).sub(last_delay_request).div(1e9);
                    data.Delay.push(delay);
                }
                /* Single step */
                else if (packet.ptp.messageType === 0) {
                    sync_i = i;
                }

                /* Two-step: only follow-up message is interesting */
                if ( (packet.ptp.messageType !== 0) && (packet.ptp.messageType !== 8)) {
                    continue;
                }

                const _x = new Decimal(`${packets[sync_i].time.t_sec}`).add( new Decimal(`${packets[sync_i].time.t_nsec}`).div(1e9) );
                const _y = new Decimal(packet.ptp.originTimestampS)
                        .add(new Decimal(packet.ptp.originTimestampNs).div(1e9))
                        .add(new Decimal(packet.ptp.correctionNs).div(1e9));

                const error = _x.sub(_y);
                data.errors.push(error);

                data.X.push(_x);
                data.Y.push(_y);
                data.X_index.push(sync_i);
                data.Dt += error.toNumber();
                data.Ds++;
            }
        }

        if (data.Ds) {
            config.load.sync = "PTP";
            auto_found = true;
        }
    }

    if ((config.load.sync === 'eCPRI') || ( (config.load.sync === 'auto') && (auto_found === false) )) /* No timestamps */{
        let max_efd = -1;

        for (let i = 0; i < packets.length; i++) {
            let ecpri = packets[i].ecpri;
            if (ecpri?.rtcId === undefined) continue;
            if (max_efd === -1) max_efd = ecpri.frameId;

            if (ecpri.version !== 1) continue;
            let efd = ecpri.frameId;

            if (efd > max_efd) max_efd = efd;
            while (efd < max_efd - 128) {
                efd += 256;
                if (efd > max_efd) max_efd = efd;
            }

            let frame = efd + ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(ecpri.slotId >> 1, ecpri.startSymbolId, ecpri_maxU) / 1228800;
            if (((ecpri.rtcId === 7) || (ecpri.rtcId === 15)) && (ecpri.dataDir === 1) && (ecpri.message === 0)) // Uplane SS/PBCH, FR2
                frame = efd + ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(ecpri.slotId, ecpri.startSymbolId, ecpri_maxU + 1) / 1228800;
            if ((ecpri.message === 2) && (ecpri.sectionType === 3)) {  // FCP type 3
                frame = efd + ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(ecpri.slotId, 0, ecpri_maxU + 1) / 1228800 + ecpri.timeOffset / 307200;
            }

            data.X.push(new Decimal(`${packets[i].time.t_sec}`).add( new Decimal(`${packets[i].time.t_nsec}`).div(1e9) ));
            data.Y.push(new Decimal(frame).div(100).add(tai2gps));
            data.Ds++;
        }

        if (data.Ds) {
            config.load.sync = "eCPRI";
            auto_found = true;
        }
    }

    if ((config.load.sync === 'L2L1') || ( (config.load.sync === 'auto') && (auto_found === false) )) {
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const l2l1 = packets[i].l2l1;
            if (l2l1 !== undefined && l2l1.sfn !== undefined) {
                let error = new Decimal(`${packet.time.t_sec}`).add( new Decimal(`${packet.time.t_nsec}`).div(1e9) )
                        .sub(data.time2gps).sub(l2l1.sfn  * 0.01).sub(l2l1.slot / (1 << ecpri_maxU) * 0.001).mod(10.24);
                data.Ds++;
                data.X.push(new Decimal(`${packet.time.t_sec}`).add( new Decimal(`${packet.time.t_nsec}`).div(1e9) ));
                data.Y.push(new Decimal(`${packet.time.t_sec}`).add( new Decimal(`${packet.time.t_nsec}`).div(1e9) ).sub(error));
            }
        }

        if (data.Ds) {
            config.load.sync = "L2L1";
            auto_found = true;
        }
    }

    if ((config.load.sync === 'RoE') || ( (config.load.sync === 'auto') && (auto_found === false) )) {
        for (let i = 0; i < packets.length; i++) {
            let packet = packets[i].roe;
            if (packet?.roe?.p_counter === undefined) continue;
            if (("p_counter" in packet) && (packet.p_counter === 0)) {
                let error = new Decimal(`${packets[i].time.t_sec}`).add( new Decimal(`${packets[i].time.t_nsec}`).div(1e9) )
                        .sub(data.time2gps)
                        .sub(0.01*(packet.q_counter + packet.p_counter * time_per_p_counter_tick_in_frames))
                        .mod(2.56);
                data.Ds++;
                data.X.push(new Decimal(`${packets[i].time.t_sec}`).add( new Decimal(`${packets[i].time.t_nsec}`).div(1e9) ));
                data.Y.push(new Decimal(`${packets[i].time.t_sec}`).add( new Decimal(`${packets[i].time.t_nsec}`).div(1e9) ).sub(error));
            }
        }

        if (data.Ds) {
            config.load.sync = "RoE";
            auto_found = true;
            data.Dt = 1;
        }
    }

    if ( (data.Ds === 0) && ((config.load.sync === 'auto') || (config.load.sync === 'pcap')) ) {
        data.X = [new Decimal(0), new Decimal(1)];
        data.Y = [new Decimal(0), new Decimal(1)];
        data.Ds = 2;
        data.time2gps = unix2gps;

        config.load.sync = "pcap";
        auto_found = true;
    }

    logInfo( 'Packets', `Timing statistics generation finished. Took: ${ perfToMsFrom( perfNow ) }` +
        ( window.performance.memory ? ( `. Memory usage: ${ formatBytes( window.performance.memory.totalJSHeapSize ) }` ) : '' ) );

    return data;
}
function generateTimingValues_linReg (X, Y, Dt) {
    let coefs = [-Dt / X.length, 1];
    let error = null;

    if (X.length > 1) {
        const lr = v_lin_reg(X, Y);
        coefs = lr.coefs;
        error = lr.error / X.length;
    }
    return {coefs, error};
}
function generateTimingValues_linReg_dec (X, Y, Dt) {
    let coefs = [new Decimal(-Dt).div(X.length), new Decimal(1)];
    let error = new Decimal(0);

    if (X.length > 1) {
        const lr = v_lin_reg_dec(X, Y);
        coefs = lr.coefs;
        error = lr.error.div(X.length);
    }
    return {coefs, error};
}
function generateTimingValues_linRegMsg(sync, count, error, coefs){
    if(count === 0){
        if((sync === 'auto') || (sync === 'pcap')){
            return "Using pcap timestamps as reliable source of time";
        } else{
            return "";
        }
    }
    let msg = "";
    switch(sync){
        case 'PTP': msg += `Linear regression on ${count} PTP packets.`; break;
        case 'eCPRI': msg += `Linear regression on ${count} eCPRI packets. Values are only relative.`; break;
        case 'L2L1': msg += `Linear regression on ${count} L2L1 packets. Values are only relative.`; break;
        case 'RoE': msg += `Linear regression on ${count} RoE packets. Values are only relative.`; break;
        default: msg += "Unknown sync option"; break;
    }

    if(error !== 0){
        if (error < 0.000001)
            msg += (`\nLinreg mean error: ${error * 1000000} us`);
        else
            msg += (`\nLinreg mean error: ${error}`);
    }

    msg += `  (a+bx):${coefs}  `;

    return msg;
}
function generateTimingValues() {
    const time_per_p_counter_tick_in_frames = 3200 / (config.load.sampling * 1000000);

    let {X, Y, Ds, Dt, X_index, time2gps, errors} = generateTimingValues_data();

    const maxErrorsToShow = 4;
    errors.slice(0,maxErrorsToShow).forEach(error => {
        logInfo('Sync', `PTP vs PCAP: ${error}`);
    })

    if (Ds) {
        const framePeriodInSeconds = 0.01;
        const maxFrameNumber = 256;
        const max_u = ecpri_maxU + ((ecpri_maxU === 3) ? 1 : 0);

        const lr = generateTimingValues_linReg_dec(X, Y, Dt);
        let message = generateTimingValues_linRegMsg(config.load.sync, Ds, lr.error.toNumber(), lr.coefs);

        message = message.replaceAll('\n', "<BR>");
        logInfo('Sync', message);

        /* Doing correction based on recovered timing. */
        const n_rb = [270, 273, 135, 132, 66, 0][ecpri_maxU];
        let correction = config.load.timeShift_beta * 10000 +
            config.load.timeShift_alfa / 1228.8;

        let i;
        try {
            for (i = 0; i < packets.length; i++) {
                let packet = packets[i];
                if (packet?.ptp?.originTimestampS !== undefined) continue;

                const fn = ()=>{
                    let time = new Decimal(`${packet.time.t_sec}`).add(new Decimal(`${packet.time.t_nsec}`).div(1e9));
                    time = time.mul(lr.coefs[1]);
                    time = time.add(lr.coefs[0]);

                    return time;
                };
                const ptpTime = fn();
                if (Ds) packet.PtpTime = ptpTime;

                let gps = ptpTime.sub(time2gps);
                let t = gps.div(framePeriodInSeconds);

                let frame = 0;
                if (packet?.l2l1?.sfn !== undefined) /* L2L1 */{
                    t = t.mod(1024);
                    frame = parseInt(packet.l2l1.sfn) + parseInt(packet.l2l1.slot) / (1 << ecpri_maxU) * 0.1;
                    if ((config.load.sync === "eCPRI") || (config.load.sync === "RoE") || (config.load.sync === "pcap")) {
                        t = t.mod(256);
                        frame %= 256;
                    }
                }
                else if (packet?.ecpri?.rtcId !== undefined) {
                    t = t.mod(maxFrameNumber);
                    frame = packet.ecpri.frameId + packet.ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(packet.ecpri.slotId >> (max_u - ecpri_maxU), packet.ecpri.startSymbolId, ecpri_maxU) / 1228800;
                    if (((packet.ecpri.rtcId % 8) === 7) && (packet.ecpri.dataDir === 1) /*&& ( packet.ecpriMessage == 0 )*/) // Uplane SS/PBCH, FR2
                        frame = packet.ecpri.frameId + packet.ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(packet.ecpri.slotId, packet.ecpri.startSymbolId, max_u) / 1228800;
                    if ((packet.ecpri.message === 2) && (packet.ecpri.sectionType === 3)) {  // FCP type 3
                        frame = packet.ecpri.frameId + packet.ecpri.subframeId / 10 + get_nr_symbol_start_in_sf(packet.ecpri.slotId, 0, max_u) / 1228800 + packet.ecpri.timeOffset / 307200;
                    }
                }  else if (packet?.roe?.q_counter !== undefined) {
                    t = t.mod(1024);
                    if ((config.load.sync === "eCPRI") || (config.load.sync === "RoE"))
                        t = t.mod(256);
                    frame = parseInt(packet.roe.q_counter) + parseInt(packet.roe.p_counter) * time_per_p_counter_tick_in_frames;
                } else
                    continue;

                let dt = t.sub(frame);
                if ( (packet?.ecpri?.rtcId !== undefined) || (packet?.l2l1?.sfn !== undefined) &&  config.load.ignoreFrameId) {
                    dt = dt.mod(2);
                    if (dt.greaterThan(1)) dt = dt.sub(2);
                    if (dt.lessThan(-1)) dt = dt.add(2);
                    correction = correction % 20000
                    if (correction > 10000) correction -= 20000
                    if (correction < -10000) correction += 20000
                }

                // ORAN table 9-10
                let Ttaoffset = config.load.ntaOffset_tc / 1966.08;

                if (Dt)
                    packet.PtpFrame = t.toFixed(4);

                if (packet?.ecpri?.rtcId !== undefined || packet?.roe?.q_counter!== undefined )/* eCPRI/RoE */{
                    let delta = dt.greaterThan(128) ? dt.sub(256):
                        dt.lessThan(-128) ? dt.add(256) : dt;

                    delta = delta.mul(1e6); // from seconds to useconds
                    delta = delta.div(100); // leave 'Frame' space ( earlier time was multiplied by 1/framePeriodInSeconds)

                    delta = delta.sub(correction); // correction is in Usecs

                    if (packet?.ecpri?.dataDir !== undefined && packet.ecpri.dataDir === 0) {
                        delta = delta.add(Ttaoffset);
                    }

                    packet.eCpriDelayPtpUs = delta.toNumber();
                } else if (packet?.l2l1?.sfn !== undefined) /* L2L1  */{
                    let delta = dt.greaterThan(512) ? dt.sub(1024):
                        dt.lessThan(-512) ? dt.add(1024) : dt;

                    delta = delta.mul(1e6); // from seconds to useconds
                    delta = delta.div(100); // leave 'Frame' space ( earlier time was multiplied by 1/framePeriodInSeconds)

                    delta = delta.sub(correction); // correction is in Usecs

                    packet.eCpriDelayPtpUs = delta.toNumber();
                }
                if (packet?.ecpri?.rtcId !== undefined && packet.ecpri.sections) {
                    if (packet.ecpri.message === 2) packet.PRB_AREA = ((packet.ecpri.sections[0].numPrb === 0) ? n_rb : packet.ecpri.sections[0].numPrb) * packet.ecpri.sections[0].numSymbol;
                    if (packet.ecpri.message === 0) packet.PRB_AREA = packet.ecpri.sections[0].numPrb;
                }
                if (packet?.l2l1?.sfn !== undefined) packet.dt_us = packet.eCpriDelayPtpUs;
            }
        } catch (err) {
            console.log(err);
            alert("Packet " + i + " (" + (i + 1) + " wireshark) have some problems with decoding");
        }

        for (let i = 0; i < X_index.length; i++) {
            const packet = packets[X_index[i]];

            let temp = new Decimal(X[i]);
            temp = temp.mul(lr.coefs[1]);
            temp = temp.add(lr.coefs[0]);

            packet.PtpTime = temp;
            packet.eCpriDelayPtpUs = temp.sub(Y[i]).mul(1e6).toNumber();
        }
    }
}

function get_nr_symbol_start_in_sf(slot, symbol, u) {
    const symbol_length = (576 + 8192) >> u;
    const symbol_in_sf = slot * 14 + symbol;
    const symbols_in_sf = 14 * (1 << u);
    const num_longer_cp_before = (symbol_in_sf ? 1 : 0) + (2 * symbol_in_sf > symbols_in_sf ? 1 : 0);

    return symbol_in_sf * symbol_length + 64 * num_longer_cp_before;
}

const TIMING_OPTIONS = {
    BIP_PTP: 0,
    BIP_DT: 1,
    ECPRI_STREAMS: 2,
    SEQ_UP: 3,
    SEQ_FCP_XRAN: 4,
    SEQ_FCP_DCM: 5,
}
function generateTimingStats(packets, option, noPacketsIgnore) {
    const stats = [];

    if([TIMING_OPTIONS.BIP_PTP, TIMING_OPTIONS.BIP_DT].includes(option)){
        const message_codes = {};
        const syncCol = option === TIMING_OPTIONS.BIP_PTP ? "eCpriDelayPtpUs" : "dt_us";

        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            if(packet.hasOwnProperty(syncCol) === false) continue;

            const messageName =
                packet.ecpri?.message !== undefined ? packetPropToStrMap['ecpri.message'][packet.ecpri.message] :
                    packet.l2l1?.message !== undefined ? packetPropToStrMap['l2l1.message'][packet.l2l1.message] :
                null;
            (message_codes[messageName] = message_codes[messageName] || []).push(packet[syncCol]);
        }

        for (const [key, value] of Object.entries(message_codes)) {
            const stats_row = {};
            stats_row.name = key;
            stats_row.packets = value.length;

            const sum = value.reduce((partialSum, v) => partialSum + v, 0);
            stats_row.delay = (sum / value.length).toFixed(3);

            const dev = value.reduce((partialSum, v) => partialSum + (v - stats_row.delay) * (v - stats_row.delay), 1);
            stats_row.stddev = (Math.sqrt(dev / value.length)).toFixed(3);

            stats_row.min = value.min().toFixed(3);
            stats_row.max = value.max().toFixed(3);
            stats_row.delta = (stats_row.max - stats_row.min).toFixed(3);

            stats.push(stats_row);
        }
    }

    if(TIMING_OPTIONS.ECPRI_STREAMS === option){
        let trimmedPackets = packets.slice(noPacketsIgnore);
        trimmedPackets = trimmedPackets.filter(packet=>packet.ecpri?.message !== undefined && packet.eCpriDelayPtpUs !== undefined);  // Ignore a thousand first, TODO: order, filter first?

        const columns = ["srcmac", "destmac", "ecpri.message", "ecpri.rtcId", "ecpri.dataDir"];
        const unique_rows = trimmedPackets.groupBy(columns);

        for (const value of Object.values(unique_rows)) {
            const stats_row = {};

            stats_row.srcmac    = value[0].srcmac;
            stats_row.destmac   = value[0].destmac;

            stats_row.mtype     = value[0].ecpri.message;
            stats_row.rtcid     = value[0].ecpri.rtcId;
            stats_row.dir       = value[0].ecpri.dataDir;
            stats_row.packets   = value.length;

            let sum = 0;
            let delays = [];
            for (let j = 0; j < value.length; j++) {
                delays.push(value[j].eCpriDelayPtpUs);
                sum += value[j].eCpriDelayPtpUs;
            }
            stats_row.delay = (sum / value.length).toFixed(3);

            const dev = value.reduce((partialSum, v) => partialSum + (v.eCpriDelayPtpUs - stats_row.delay) * (v.eCpriDelayPtpUs - stats_row.delay), 1);
            stats_row.stddev = (Math.sqrt(dev / value.length)).toFixed(3);

            stats_row.min = delays.min().toFixed(3);
            stats_row.max = delays.max().toFixed(3);
            stats_row.delta = (stats_row.max - stats_row.min).toFixed(3);

            stats_row.prbArea = 0;
            for (let j = 0; j < value.length; j++) {
                stats_row.prbArea += value[j].PRB_AREA || 0;
            }

            stats.push(stats_row);
        }
    }

    if([TIMING_OPTIONS.SEQ_UP, TIMING_OPTIONS.SEQ_FCP_XRAN, TIMING_OPTIONS.SEQ_FCP_DCM].includes(option)){
        const obj = {};
        const prev_sequenceId = {};

        let filteredPackets = packets;

        filteredPackets =
            option === TIMING_OPTIONS.SEQ_UP ?
                filteredPackets.filter(packet => packet.ecpri?.message === 0 && packet.ecpri?.seqId !== undefined) :
                filteredPackets.filter(packet => packet.ecpri?.message === 2);

        for (let i = 0; i < filteredPackets.length; i++) {
            const key = option === TIMING_OPTIONS.SEQ_FCP_DCM ?
                `${filteredPackets[i].ecpri.rtcId}` :
                `${filteredPackets[i].ecpri.rtcId},${filteredPackets[i].ecpri.dataDir}`

            if (key in prev_sequenceId) {
                obj[key].push((filteredPackets[i].ecpri.sequenceId - prev_sequenceId[key] + 256) % 256);
            } else {
                obj[key] = [];
            }
            prev_sequenceId[key] = filteredPackets[i].ecpri.sequenceId;
        }

        for (const [property, value] of Object.entries(obj)) {
            const stats_row = {};
            stats_row.rtcid = parseInt(property.split(',')[0]);
            if(option !== TIMING_OPTIONS.SEQ_FCP_DCM)
                stats_row.dir = parseInt(property.split(',')[1]);

            for (let j = 0; j < value.length; j++) {
                if (value[j] === 1) {
                    stats_row.status = "OK";
                } else {
                    stats_row.status = "FAIL";
                    break;
                }
            }
            stats.push(stats_row);
        }
    }

    return stats;
}