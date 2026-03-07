const ecpri_dBFS_interfaceResolution = { // ecpri_dBFS_interfaceResolution[iqScalingMode][iqCompMethod][iqBitWidth]
    1: {
        0: [0, 0, -6.02, -12.04, -18.06, -24.08, -30.1, -36.12, -42.14, -48.16, -54.19, -60.21, -66.23, -72.25, -78.27, -84.29, -90.31],
        1: [0, -90.31, -96.33, -102.35, -108.37, -114.39, -120.41, -126.43, -132.45, -138.47, -144.49, -150.51, -156.54, -162.56, -168.58, -174.6, -180.62],
        5: [0, -90.31, -96.33, -102.35, -108.37, -114.39, -120.41, -126.43, -132.45, -138.47, -144.49, -150.51, -156.54, -162.56, -168.58, -174.6, -180.62]
    },
    2: {
        0: [0, 0, -6.02, -12.04, -18.06, -24.08, -30.1, -36.12, -42.14, -48.16, -54.19, -60.21, -66.23, -72.25, -78.27, -84.29, -90.31],
        1: [0, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31],
        5: [0, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31, -90.31]
    }
};

const ecpri_ulGain = { // ecpri_ulGain[iqScalingMode][u]
    1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [-10.8, -13.8, -16.8, -19,8, -22.8, 0, 0, 0, 0, 0],
};

let ecpri_logCntUnsupportedMsg;
let ecpri_logCntUnsupportedSectType;
let ecpri_logCntUnsupportedExtType;
let ecpri_logCntUnsupportedBfwCompMeth;

let ecpri_hfn0Time = -1;
let ecpri_maxFinalSubframe = -1;
let ecpri_defaultU = {};
let ecpri_maxU = -1;
let ecpri_pktLinks = [];
let ecpri_uInPkt = [];
let ecpri_numSlotsPerFrame = [10, 20, 40, 80, 160]

let ecpri_isUPlanePresent;
let ecpri_discoveredConfigs;
let iq_maxAmplitude = 0;

let ecpri_msgType4Data = [];

let ecpri_hacRx_varsPerJob = [];

let ecpri_msgType7JobsCounterPerPe = new Array(16).fill(0);

let Hraw_IQ = [];
let RxData_IQ = [];
let TxPilot_IQ = [];
let Llr_IQ = [];
const numOfHrawAnts = 8;
const numOfHrawSymbolsPerStruct = 2;
const numOfRxDataAnts = 4;
const numOfRxDataSymbolsPerStruct = 14;
const numOfTxPilotAnts = 2;
const numOfTxPilotSymbolsPerStruct = 2;

const ECPRI_SECTION_TYPES = {
    Idle_Guard_Periods:         0,
    DL_UL_Control_Msgs:         1,
    Reserved_2:                 2,
    PRACH_And_Mixed_Numerology: 3,
    Reserved_4:                 4,
    UE_Scheduling_Information:  5,
    Channel_Information:        6,
    LAA_Request:                7
}

function ecpri_discoveryStart() {
    ecpri_isUPlanePresent = false;
    ecpri_discoveredConfigs = [{ 'dynamicIqComp': true, 'iqBitWidth': 16, 'iqCompMethod': 0 }];
    for( let i = 1; i <= 16; ++i ) {
        ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 0 } );
        ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 1 } );
        // ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 2 } );
        ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 3 } );
        if( i <= 5 ) ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 4 } );
        ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 5 } );
        if( i <= 5 ) ecpri_discoveredConfigs.push( { 'dynamicIqComp': false, 'iqBitWidth': i, 'iqCompMethod': 6 } );
    }
}

function ecpri_discoverPayload( buff, off ) {
    let ptr = new Uint8Array( buff, off );

    if( ptr[1] === 0 ) { // ecpriMessage
        const payloadVer =  ( ptr[8] >> 4 ) & 0x7;
        if(payloadVer === 7) return;    // Not IQ Data, 7-2e

        ecpri_isUPlanePresent = true;
        const ecpriPayload = ptr[2] << 8 | ptr[3];
        const sectsLen = ecpriPayload - 4 - 4;
        off += 12;

        ptr = new Uint8Array( buff, off );

        for( let cfgIdx = 0; cfgIdx < ecpri_discoveredConfigs.length; ) {
            const cfg = ecpri_discoveredConfigs[cfgIdx];

            let iqBitWidth = cfg.iqBitWidth;
            let iqCompMeth = cfg.iqCompMethod;

            let sectOff = 0;

            while( sectOff < sectsLen ) {
                ptr = new Uint8Array( buff, off + sectOff );
                const numPrb = ptr[3];
                if( numPrb === 0 ) { sectOff = 9999; break; }
                let sectLen = 4;
                if( cfg.dynamicIqComp ) {
                    sectLen += 2;
                    let udIqWidth = ptr[4] >> 4;
                    iqBitWidth = ( udIqWidth === 0 ) ? 16 : udIqWidth;
                    iqCompMeth = ptr[4] & 0xF;
                }

                if( [0, 4].includes( iqCompMeth ) ) {
                    sectLen += iqBitWidth * 3 * numPrb;
                } else if( [1, 2, 3].includes( iqCompMeth ) ) {
                    for( let i = 0; i < numPrb; ++i ) {
                        const udCompParam = ptr[sectLen];
                        if( iqCompMeth === 1 && ( udCompParam & 0xF0 ) !== 0 ) {
                            sectOff = 9999;
                            break;
                        }
                        if( iqCompMeth === 3 ) iqBitWidth = udCompParam >> 4;
                        sectLen += iqBitWidth * 3 + 1;
                    }
                } else if( [5, 6].includes( iqCompMeth ) ) {
                    sectLen += 2; // udCompLen
                    for( let i = 0; i < numPrb; ++i ) {
                        const udCompParam = ptr[sectLen] & 0xF;
                        if( iqCompMeth === 6 && udCompParam !== 0 ) {
                            sectOff = 9999;
                            break;
                        }
                        const sReSMask = ( ptr[sectLen] & 0xF0 ) << 4 | ptr[sectLen + 1];
                        let iqDataLen = 0;
                        for( let i = 0; i < 12; ++i ) {
                            if( sReSMask & ( 1 << i ) )
                                iqDataLen += 2;
                        }
                        sectLen += 2 + Math.ceil( iqDataLen * iqBitWidth / 8 );
                    }
                } else {
                    sectOff = 9999;
                    break;
                }

                sectOff += sectLen;
            }

            if( sectOff !== sectsLen ) {
                ecpri_discoveredConfigs.splice( cfgIdx, 1 );
            } else {
                ++cfgIdx;
            }
        }
    }
}

function ecpri_discoveryFinish() {
    if( ecpri_isUPlanePresent ) {
        if( ecpri_discoveredConfigs.length === 0 ) {
            logWarning( 'eCPRI', "Autodetection: can't detect iqBitWidth/iqCompMeth. All combinations excluded" );
        } else if( ecpri_discoveredConfigs.length === 1 ) {
            config.load.dynamicIqComp = ecpri_discoveredConfigs[0].dynamicIqComp;
            config.load.iqBitWidth = ecpri_discoveredConfigs[0].iqBitWidth;
            config.load.iqCompMethod = ecpri_discoveredConfigs[0].iqCompMethod;
        } else {
            logInfo( 'eCPRI', `Autodetection: found ${ecpri_discoveredConfigs.length} possible configs. Choose one or input manually` );
        }
        for( const cfg of ecpri_discoveredConfigs ) {
            if( cfg.dynamicIqComp ) {
                logInfo( 'eCPRI', `Autodetection: <span class="like_href" onclick="loadDialog_setToUI_ecpri( ${ cfg.dynamicIqComp } )">dynamicIqComp: ${ cfg.dynamicIqComp }</span>` );
            } else {
                logInfo( 'eCPRI', `Autodetection: <span class="like_href" onclick="loadDialog_setToUI_ecpri( ${ cfg.dynamicIqComp }, ${ cfg.iqBitWidth }, ${ cfg.iqCompMethod } )">` +
                    `dynamicIqComp: ${ cfg.dynamicIqComp }, iqBitWidth: ${ cfg.iqBitWidth }, iqCompMeth: ${ cfg.iqCompMethod }</span>` );
            }
        }
    }
}

function ecpri_prePcapDecode() {
    ecpri_logCntUnsupportedMsg = 10;
    ecpri_logCntUnsupportedSectType = 10;
    ecpri_logCntUnsupportedExtType = 10;
    ecpri_logCntUnsupportedBfwCompMeth = 10;

    ecpri_hfn0Time = -1;

    if( !config.load.aggregateMode ) {
        ecpri_maxFinalSubframe = -1;
        ecpri_defaultU = {};
        ecpri_maxU = -1;
        ecpri_pktLinks = [];
        ecpri_uInPkt = [];
    }
}

function ecpri_decode( pkt, bufferView ) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    let ptr = new Uint8Array( buf, off );
    off += 4;

    let ecpri = pkt.ecpri = {};
    ecpri.version = ptr[0] >> 4;
    ecpri.concat = ptr[0] & 0x1;
    ecpri.message = ptr[1];
    ecpri.payload = ptr[2] << 8 | ptr[3];

    const pktEnd = off + ecpri.payload;

    if( [0, 2, 8, 9, 64, 65].includes(ecpri.message) ) {
        off += 8;

        if( ecpri_hfn0Time === -1 ) {
            ecpri_hfn0Time = parseFloat(pkt.time) - ptr[9] * 0.01 - ( ptr[10] >> 4 ) * 0.001;
        }

        ecpri.rtcId = ptr[4] << 8 | ptr[5];
        ecpri.seqId = ptr[6] << 8 | ptr[7];
        ecpri.sequenceId    = (ecpri.seqId >> 8) & 0xFF;
        ecpri.Ebit          = (ecpri.seqId >> 7) & 0x01;
        ecpri.subsequenceId = (ecpri.seqId)      & 0x7F;
        ecpri.dataDir = ptr[8] >> 7;
        ecpri.payloadVer = ( ptr[8] >> 4 ) & 0x7;

        if(ecpri.message === 64 || ecpri.message === 65)
            ecpri.channelType = ptr[8] & 0xF;
        else ecpri.filterIndex = ptr[8] & 0xF;

        const timeDiff = ( parseFloat(pkt.time) - ecpri_hfn0Time );
        ecpri.hfn = Math.floor( timeDiff / 2.56 );
        ecpri.frameId = ptr[9];
        const timeDiffMod = timeDiff % 2.56;
        if( timeDiffMod < 0.2 && ecpri.frameId > 160 ) --ecpri.hfn;
        if( timeDiffMod > 2.4 && ecpri.frameId < 100 ) ++ecpri.hfn;

        ecpri.subframeId = ptr[10] >> 4;
        ecpri.slotId        =  (ptr[10]&0xF)<<2 | (ptr[11]>>6)
        ecpri.startSymbolId = ptr[11] & 0x3F;



        if(ecpri.payloadVer === 7){
            ptr = new Uint8Array( buf, off );
            off += 4;

            ecpri.channelType = ecpri.filterIndex;
            delete ecpri.filterIndex;

            if(ecpri.channelType === 1){ // PDSCH TB payload message
                ecpri.rnti = ptr[0] << 8 | ptr[1];
                ecpri.symbolSize = ptr[2] << 8 | ptr[3];

                off += 4;
                const isFrag = ecpri_appTransportDefrag(pkt);

                if(isFrag === false)
                    ecpri_decodePdschTb(pkt, buf, off, pktEnd);
            }
            else if(ecpri.channelType === 2){ // PDCCH DCI payload message
                ecpri.numOfDci = ptr[0];
                const numOfDci = Math.min(ecpri.numOfDci, 32);  // DciInfo has length of 64 bytes
                // Reserved - Bytes 1,2,3
                const DCIinfo = ecpri.DCIinfo = [];
                for(let i = 0; i < numOfDci; ++i){
                    const dciIndex = ptr[4 + i*2];
                    const offset = ptr[5 + i*2];
                    DCIinfo.push({dciIndex, offset});
                }
                const isFrag = ecpri_appTransportDefrag(pkt);

                off += 68;
                if(isFrag === false)
                    ecpri_decodePdcchDci(pkt, buf, off, pktEnd);
            }
        }
        else if( ecpri.message === 0 ) { // IQ data message
            ecpri.sections = [];

            let iqBitWidth = config.load.iqBitWidth;
            let iqCompMeth = config.load.iqCompMethod;

            while( off < pktEnd ) {
                ptr = new Uint8Array( buf, off );
                off += 4;

                let sect = {};
                sect.sectionId = ptr[0] << 4 | ptr[1] >> 4;
                sect.rb = ( ptr[1] >> 3 ) & 0x1;
                sect.symInc = ( ptr[1] >> 2 ) & 0x1;
                sect.startPrb = ( ptr[1] & 0x3 ) << 8 | ptr[2];
                sect.numPrb = ptr[3];

                if( config.load.dynamicIqComp ) {
                    off += 2;
                    sect.udCompHdr = ptr[4];
                    const udIqWidth = ptr[4] >> 4;
                    sect.udCompHdr_iqWidth = iqBitWidth = ( udIqWidth === 0 ) ? 16 : udIqWidth;
                    sect.udCompHdr_compMeth = iqCompMeth = ptr[4] & 0xF;
                }

                switch( iqCompMeth ) {
                    case 0:
                    case 4:
                        off += iqBitWidth * 3 * sect.numPrb;
                        break;
                    case 1:
                        sect.exponent = new Array( sect.numPrb );
                        off += ( iqBitWidth * 3 + 1 ) * sect.numPrb;
                        break;
                    case 2:
                        sect.sblockScaler = new Array( sect.numPrb );
                        off += ( iqBitWidth * 3 + 1 ) * sect.numPrb;
                        break;
                    case 3:
                        sect.compBitWidth = new Array( sect.numPrb );
                        sect.compShift = new Array( sect.numPrb );
                        for( let prb = 0; prb < sect.numPrb; ++prb ) {
                            ptr = new Uint8Array( buf, off );
                            const compBitWidth = sect.compBitWidth[prb] = ptr[0] >> 4;
                            sect.compShift[prb] = ptr[0] & 0xF;
                            off += 1 + compBitWidth * 3;
                        }
                        break;
                    case 5:
                    case 6:
                        off += 2;
                        const udCompLenOff = config.load.dynamicIqComp ? 6 : 4;
                        sect.udCompLen = ptr[udCompLenOff] << 8 | ptr[udCompLenOff + 1];
                        sect.sReSMask = new Array( sect.numPrb );
                        if( iqCompMeth === 5 ) sect.exponent = new Array( sect.numPrb );
                        off += sect.udCompLen;
                        break;
                }

                ecpri.sections.push( sect );
            }
        } else if(ecpri.message === 2) { // Real-time control data message
            off += 4;
            ecpri.numberOfSections = ptr[12];
            ecpri.sectionType = ptr[13];

            if( ecpri.sectionType === 0 || ecpri.sectionType === 3 ) {
                off += 4;
                ecpri.timeOffset = ptr[14] << 8 | ptr[15];
                ecpri.frameStructure = ptr[16];
                ecpri.cpLength = ptr[17] << 8 | ptr[18];
                if( ecpri.sectionType === 3 ) {
                    ecpri.udCompHdr = ptr[19];
                    let udIqWidth = ptr[19] >> 4;
                    ecpri.udCompHdr_iqWidth = ( udIqWidth === 0 ) ? 16 : udIqWidth;
                    ecpri.udCompHdr_compMeth = ptr[19] & 0xF;
                }
            } else if( ecpri.sectionType === 1 || ecpri.sectionType === 5 ) {
                ecpri.udCompHdr = ptr[14];
                let udIqWidth = ptr[14] >> 4;
                ecpri.udCompHdr_iqWidth = ( udIqWidth === 0 ) ? 16 : udIqWidth;
                ecpri.udCompHdr_compMeth = ptr[14] & 0xF;
                ecpri.reserved = ptr[15];
            } else if( ecpri.sectionType === 6 ) {
                ecpri.numberOfUEs = ptr[14];
            } else if(ecpri.sectionType === 240){
                //ptr[14], ptr[15] // Reserved
            }
            else if(ecpri.sectionType === 4){

                delete ecpri.numberOfSections;
                // ecpri.reserved = ptr[12] >> 4;
                ecpri.cmdScope = ptr[12] & 0b1111;
                ecpri.numberOfST4Cmds = ptr[14];
                // ecpri.reserved = ptr[15];
                ecpri.ST4Cmds = []
                let index = 16;
                for(let i = 0; i < ecpri.numberOfST4Cmds; i++){
                    let ST4Cmd = {}
                    ST4Cmd.st4CmdType = ptr[index];
                    ST4Cmd.st4CmdLen = ptr[index+1] << 8 | ptr[index+2];
                    ST4Cmd.numSlots = ptr[index+3];
                    ST4Cmd.ackNackReqId = ptr[index+4] << 8 | ptr[index+5];
                    // ecpri.reserved = ptr[22] << 8 | ptr[23];
                    if(ST4Cmd.st4CmdType === 1){
                        ST4Cmd.symbolMask = (ptr[index+8] & 0b00111111) << 8 | ptr[index+9];
                        ST4Cmd.disableTDBFNs = ptr[index+10] >> 7;
                        ST4Cmd.tdBeamGrp = (ptr[index+10] & 0b01111111) << 8 | ptr[index+11];
                        // ST4Cmd.bfwCompHdr = ptr[index+13];

                        ST4Cmd.bfwIqWidth = ptr[index+12] >> 4;
                        if(ST4Cmd.bfwIqWidth === 0) ST4Cmd.bfwIqWidth = 16;
                        ST4Cmd.bfwCompMeth = ptr[index+12] & 0b1111;

                        if(ST4Cmd.disableTDBFNs === 0){
                            ST4Cmd.disableTDBFWs = ptr[index+16] >> 7;
                            ST4Cmd.tdBeamNum = ((ptr[index+16] & 0b01111111) << 8) | ptr[index+17];
                            index += 18;

                            if(ST4Cmd.disableTDBFWs === 0){
                                switch (ST4Cmd.bfwCompMeth) {
                                    case 0: break;
                                    case 1:
                                        ST4Cmd.exponent = (ptr[index] & 0b1111)// / 2**3;
                                        index++;
                                        break;
                                    case 2:
                                        ST4Cmd.blockScaler = ptr[index] / 2**7;
                                        index++;
                                        break;
                                    case 3:
                                        ST4Cmd.compShift = ptr[index] & 0b1111;
                                        ST4Cmd.compBitWidth = (ptr[index]>>4) & 0b1111;
                                        index++;
                                    case 4:
                                        //todo add beamspace 1
                                    case 5:
                                        //todo add beamspace 2
                                }

                                ST4Cmd.bfwI = [];
                                ST4Cmd.bfwQ = [];

                                let bitStart = 0;

                                for(let i = 0; i < ST4Cmd.tdBeamNum; i++){
                                    let iVal = getNumberFromByteArray(ptr, index, bitStart, ST4Cmd.bfwIqWidth);
                                    let qVal = getNumberFromByteArray(ptr, index, bitStart + ST4Cmd.bfwIqWidth, ST4Cmd.bfwIqWidth);

                                    switch (ST4Cmd.bfwCompMeth) {
                                        case 0:
                                            ST4Cmd.bfwI.push(U2ToInt(iVal, ST4Cmd.bfwIqWidth) / 2**(ST4Cmd.bfwIqWidth-1));
                                            ST4Cmd.bfwQ.push(U2ToInt(qVal, ST4Cmd.bfwIqWidth) / 2**(ST4Cmd.bfwIqWidth-1));
                                            break;
                                        case 1:
                                            ST4Cmd.bfwI.push(iVal**(-ST4Cmd.exponent));
                                            ST4Cmd.bfwQ.push(qVal**(-ST4Cmd.exponent));
                                            break;
                                        case 2:
                                            ST4Cmd.bfwI.push(iVal**ST4Cmd.blockScaler);
                                            ST4Cmd.bfwQ.push(qVal**ST4Cmd.blockScaler);
                                            break;
                                        default:
                                            ST4Cmd.bfwI.push(iVal);
                                            ST4Cmd.bfwQ.push(qVal);
                                            break;
                                    }

                                    index += Math.ceil(ST4Cmd.bfwIqWidth*2/4);

                                }
                            }
                        }
                        else if(ST4Cmd.disableTDBFNs === 1){
                            index += 16;
                        }
                    }
                    else if(ST4Cmd.st4CmdType === 2){
                        ST4Cmd.dirPattern = (ptr[index+8] & 0b00111111) << 8 | ptr[index+9];
                        ST4Cmd.guardPattern = (ptr[index+10] & 0b00111111) << 8 | ptr[index+11];
                    }
                    else if(ST4Cmd.st4CmdType === 3){
                        ST4Cmd.log2MaskBits = (ptr[index+8] >> 2) & 0b1111;
                        ST4Cmd.sleepMode = (ptr[index+8] & 0b11);

                        ST4Cmd.numSlotsExt = ((ptr[index+9]&0b1111) * 2**16) + (ptr[index+10] * 2**8) + ptr[index+11];
                        ST4Cmd.symbolMask = (ptr[index+12] & 0b00111111) << 8 | ptr[index+13];

                        let antMaskSize = Math.min(2**ST4Cmd.log2MaskBits, 16);
                        ST4Cmd.antMask = 0;
                        for(let i = 0; i < antMaskSize; i++){
                            ST4Cmd.antMask *= 2;
                            ST4Cmd.antMask += getBit(ptr, index+14, i);
                        }
                    }
                    else if(ST4Cmd.st4CmdType === 4){
                        ST4Cmd.sleepMode = ptr[index+7] & 0b11;
                        ST4Cmd.numSlotsExt = (ptr[index+8]&0b1111) * 2**16 + ptr[index+9] * 2**8 + ptr[index+10];
                        ST4Cmd.symbolMask = ((ptr[index+11]&0b111111) << 8) + ptr[index+12];
                    }

                    ecpri.ST4Cmds.push(ST4Cmd);
                    index += ST4Cmd.st4CmdLen*4;
                }
                return;
            }
            else if(ecpri.sectionType === 255){
                off -= 2;   // Different to otehr sections, only contains one section
                off += ecpri_decodeSection255(ecpri, ptr);
                return;
            }
            ecpri.sections = [];
            for( let sectIdx = 0; sectIdx < ecpri.numberOfSections; ++sectIdx ) {
                let sect = {};
                ptr = new Uint8Array( buf, off );

                if( ecpri.sectionType === 0 || ecpri.sectionType === 1 || ecpri.sectionType === 3 || ecpri.sectionType === 5 ) {
                    off += 8;
                    sect.sectionId = ptr[0] << 4 | ptr[1] >> 4;
                    sect.rb = ( ptr[1] >> 3 ) & 0x1;
                    sect.symInc = ( ptr[1] >> 2 ) & 0x1;
                    sect.startPrb = ( ptr[1] & 0x3 ) << 8 | ptr[2];
                    sect.numPrb = ptr[3];
                    sect.reMask = ptr[4] << 4 | ptr[5] >> 4;
                    sect.numSymbol = ptr[5] & 0xF;
                    sect.ef = ptr[6] >> 7;

                    if( ecpri.sectionType === 1 || ecpri.sectionType === 3 ) {
                        sect.beamId = ( ptr[6] & 0x7F ) << 8 | ptr[7];
                        if( ecpri.sectionType === 3 ) {
                            off += 4;
                            const freqOffsetRaw = ptr[8] << 16 | ptr[9] << 8 | ptr[10];
                            sect.freqOffset = ToSigned_24Bit(freqOffsetRaw);
                        }
                    } else if( ecpri.sectionType === 5 ) {
                        sect.ueId = ( ptr[6] & 0x7F ) << 8 | ptr[7];
                    }
                } else if( ecpri.sectionType === 6 ) {
                    sect.ef = ptr[0] >> 7;
                    sect.ueId = ( ptr[0] & 0x7F ) << 8 | ptr[1];
                    sect.regularizationFactor = ptr[2] << 8 | ptr[3];
                    sect.rb = ( ptr[4] >> 3 ) & 0x1;
                    sect.symInc = ( ptr[4] >> 2 ) & 0x1;
                    sect.startPrb = ( ptr[4] & 0x3 ) << 8 | ptr[5];
                    sect.numPrb = ptr[6];

                    // TODO: ciI/Qsample
                    off += 6;
                } else if( ecpri.sectionType === 7 ) {
                    sect.laaMsgType = ptr[0] >> 4;
                    sect.laaMsgLen = ptr[0] & 0xF;
                    sect.lbtHandle = ptr[1] << 8 | ptr[2];

                    off += 4 * sect.laaMsgLen;

                    switch( sect.laaMsgType ) {
                        case 0: // LBT_PDSCH_REQ
                            sect.lbtOffset = ptr[3] << 2 | ptr[4] >> 6;
                            sect.lbtMode = ( ptr[4] >> 4 ) & 0x3;
                            sect.lbtDeferFactor = ptr[4] & 0x7;
                            sect.lbtBckoffCounter = ptr[5] << 2 | ptr[6] >> 6;
                            sect.MCOT = ( ptr[6] >> 2 ) & 0xF;
                            break;
                        case 1: // LBT_DRS_REQ
                            sect.lbtOffset = ptr[3] << 2 | ptr[4] >> 6;
                            sect.lbtMode = ( ptr[4] >> 4 ) & 0x3;
                            break;
                        case 2: // LBT_PDSCH_RSP
                            sect.lbtPdschRes = ptr[3] >> 6;
                            sect.inParSF = ( ptr[3] >> 5 ) & 0x1;
                            sect.sfStatus = ( ptr[3] >> 4 ) & 0x1;
                            sect.sfnSf = ( ptr[3] & 0xF ) << 8 | ptr[4];
                            break;
                        case 3: // LBT_DRS_RSP
                            sect.lbtDrsRes = ptr[3] >> 7;
                            break;
                        case 4: // LBT_Buffer_Error
                            sect.lbtBufErr = ptr[3] >> 7;
                            break;
                        case 5: // LBT_CWCONFIG_REQ
                            sect.lbtCWConfig_H = ptr[3];
                            sect.lbtCWConfig_T = ptr[4];
                            sect.lbtMode = ptr[5] >> 6;
                            sect.lbtTrafficClass = ( ptr[5] >> 3 ) & 0x7;
                            break;
                        case 6: // LBT_CWCONFIG_RSP
                            sect.lbtCWR_Rst = ptr[3] >> 7;
                            break;
                    }
                } else if( ecpri.sectionType === 8 ) {
                    sect.UE_ID = ptr[0] << 8 | ptr[1];
                    sect.measurementDataLen = ptr[2] << 8 | ptr[3];
                    sect.ef = ptr[4] >> 7;
                    sect.numberOfMeasurementTypes = ptr[4] & 0x7F;
                    sect.meas = [];
                    let dv = new DataView( buf, off );
                    let localOff = 5;
                    for( let measIdx = 0; measIdx < sect.numberOfMeasurementTypes; ++measIdx ) {
                        let meas = {};
                        meas.typeId = ptr[localOff++];
                        switch( meas.typeId ) {
                            case 1: // mPushPrio
                                meas.measNumBeams = ptr[localOff++];
                                meas.measCfoMetric = new Array( 2 * meas.measNumBeams );
                                for( let i = 0; i < 2 * meas.measNumBeams; ++i, localOff += 4 ) meas.measCfoMetric[i] = dv.getFloat32( localOff, true );
                                break;
                            case 2: // mPushPerUE
                                meas.measDtx = ptr[localOff++];
                                meas.measNoisePower = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measRank = ptr[localOff++];
                                meas.measPmiRank1 = ptr[localOff++];
                                meas.measPmiRank1Sinr = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measPmiRank2 = ptr[localOff++];
                                meas.measPmiRank2Sinr = new Array( 2 );
                                meas.measPmiRank2Sinr[0] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measPmiRank2Sinr[1] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                break;
                            case 3: // mPushPerLayer
                                meas.measNumLayers = ptr[localOff++];
                                meas.measSinr = new Array( meas.measNumLayers );
                                for( let i = 0; i < meas.measNumLayers; ++i ) meas.measSinr[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                break;
                            case 4: // mPushPerBeam
                                meas.measNumBeams = ptr[localOff++];
                                meas.measTaMetric = new Array( meas.measNumBeams );
                                meas.measTaPeakAmp = new Array( meas.measNumBeams );
                                meas.measRxPower = new Array( meas.measNumBeams );
                                meas.measSinr = new Array( meas.measNumBeams );
                                meas.measRssi = new Array( meas.measNumBeams );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measTaMetric[i] = ptr[localOff++];
                                for( let i = 0; i < meas.measNumBeams; ++i, localOff += 4 ) meas.measTaPeakAmp[i] = dv.getFloat32( localOff, true );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measRxPower[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measSinr[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measRssi[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                break;
                            case 5: // mSrsSuMimo
                                meas.measDtx = ptr[localOff++];
                                meas.measSinr = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measRank = ptr[localOff++];
                                meas.measPmiRank1 = ptr[localOff++];
                                meas.measPmiRank1Sinr = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measPmiRank2 = ptr[localOff++];
                                meas.measPmiRank2Sinr = new Array( 2 );
                                meas.measPmiRank2Sinr[0] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                meas.measPmiRank2Sinr[1] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                break;
                            case 6: // mSrsSuMimoPerBeam
                                meas.measNumBeams = ptr[localOff++];
                                meas.measTaMetric = new Array( meas.measNumBeams );
                                meas.measTaPeakAmp = new Array( meas.measNumBeams );
                                meas.measRxPower = new Array( meas.measNumBeams );
                                meas.measSinr = new Array( meas.measNumBeams );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measTaMetric[i] = ptr[localOff++];
                                for( let i = 0; i < meas.measNumBeams; ++i, localOff += 4 ) meas.measTaPeakAmp[i] = dv.getFloat32( localOff, true );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measRxPower[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                for( let i = 0; i < meas.measNumBeams; ++i ) meas.measSinr[i] = u16ToDb( ptr[localOff++] << 8 | ptr[localOff++] );
                                break;
                        }
                    }
                    off += sect.measurementDataLen * 4;
                } else if( ecpri.sectionType === 240 ) {
                    off += ecpri_decodeSection240(sect, buf, off, pktEnd);
                } else {
                    logWarningCnt( --ecpri_logCntUnsupportedSectType, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported sectionType(${ ecpri.sectionType })` );
                }

                if( sect.ef ) {
                    sect.exts = [];

                    while( true ) {
                        ptr = new Uint8Array( buf, off );

                        let ext = {};
                        ext.ef = ptr[0] >> 7;
                        ext.extType = ptr[0] & 0x7F;
                        ext.extLen = ( ext.extType === 11 ) ? ptr[1] << 8 | ptr[2] : ptr[1];

                        off += 4 * ext.extLen;  // extLen contains number of 4-bytes

                        let unknownExtension = false;

                        switch( ext.extType ) {
                            case 1: // Beamforming Weights Extension Type
                                ecpri_decodeExtType1( pkt.id, sect, ext, ptr );
                                break;
                            case 2: // Beamforming Attributes Extension Type
                                ecpri_decodeExtType2( pkt.id, sect, ext, ptr );
                                break;
                            case 3: // DL Precoding Extension Type
                                ecpri_decodeExtType3( pkt.id, sect, ext, ptr );
                                break;
                            case 4: // Modulation Compression Parameters Extension Type
                                ecpri_decodeExtType4( pkt.id, sect, ext, ptr );
                                break;
                            case 5: // Modulation Compression Additional Parameters Extension Type
                                ecpri_decodeExtType5(pkt.id, sect, ext, ptr);
                                break;
                            case 6: // Non-contiguous PRB allocation in time and frequency domain
                                ecpri_decodeExtType6(pkt.id, sect, ext, ptr);
                                break;
                            case 7: // eAxC Mask Section Extension
                                ecpri_decodeExtType7(pkt.id, sect, ext, ptr);
                                break;
                            case 8: // Regularization factor
                                ecpri_decodeExtType8(pkt.id, sect, ext, ptr);
                                break;
                            case 9: // Dynamic Spectrum Sharing parameters
                                ecpri_decodeExtType9(pkt.id, sect, ext, ptr);
                                break;
                            case 10:
                                // Unimplemented
                                break;
                            case 11:
                                ecpri_decodeExtType11( pkt.id, sect, ext, ptr );
                                break;
                            case 12: // Non-Contiguous PRB Allocation with Frequency Ranges
                                ecpri_decodeExtType12( pkt.id, sect, ext, ptr );
                                break;
                            case 13:
                                // Unimplemented
                                break;
                            case 14: // Nulling-layer Info. for ueId-based beamforming
                                ecpri_decodeExtType14( pkt.id, sect, ext, ptr );
                                break;
                            case 15: // Mixed-numerology Info. for ueId-based beamforming
                                ecpri_decodeExtType15( pkt.id, sect, ext, ptr );
                                break;
                            case 16:
                                // Unimplemented
                                break;
                            case 17:
                                // Unimplemented
                                break;
                            case 18: // Uplink combining
                                ecpri_decodeExtType18( pkt.id, sect, ext, ptr );
                                break;
                            case 19: // Uplink sounding channel estimation
                                ecpri_decodeExtType19( pkt.id, sect, ext, ptr );
                                break;
                            default:
                                logWarningCnt( --ecpri_logCntUnsupportedExtType, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported extType(${ ext.extType })` );
                                unknownExtension = true;
                                break;
                        }

                        sect.exts.push( ext );
                        if( !ext.ef || unknownExtension ) break;
                    }
                }

                ecpri.sections.push( sect );
            }
        } else if(ecpri.message === 8 || ecpri.message === 9){ // eCPRI Raw, 8 - UL Control, 9 - DL Control
            ecpri_decodeRaw( pkt, buf, off, pktEnd);
        } else if( ecpri.message === 64 || ecpri.message === 65) { // eCPRI split 7-2e
            const ptr = new Uint8Array( buf, off );
            off+=4;

            pkt.ecpri.messageId = (ptr[0] << 8) | ptr [1];
            // ptr[2] - reserved
            // ptr[3] - reserved

            l2l1_addMessage( pkt, pkt.ecpri.messageId );
        }
    } else if( ecpri.message === 4 ) {
        off += 12;

        ecpri.remoteMemoryAccessId = ptr[4];
        ecpri.readWrite = ptr[5] >> 4;
        if (![0,1,2].includes(ecpri.readWrite)) ecpri.readWrite = 'Reserved'
        ecpri.requestResponse = ptr[5] & 0xF;
        if (![0,1,2].includes(ecpri.requestResponse)) ecpri.requestResponse = 'Reserved'
        ecpri.elementId = numToHex4Upper(ptr[6] << 8 | ptr[7]);
        ecpri.peId = ( ecpri.elementId >> 8 ) & 0xF;
        ecpri.ifId = ecpri.elementId & 0xF;
        ecpri.ifType = ( ecpri.elementId >> 4 ) & 0xF;
        ecpri.address = pcap_getMac( ptr, 8 );
        ecpri.dataLength = ptr[14] << 8 | ptr[15];

        if (ecpri.ifType === 3) {
            ecpri.jobId = (ptr[9] | ptr[8] << 8) & 0x7FFF;
        } else {
            ecpri.jobId = (ptr[9] | ptr[8] << 8) & 0xFFFF;
        }

        // export data for RX / TX streams only
        if ((isPmFileLoaded) && ((ecpri.readWrite !== 0) && (ecpri.requestResponse === 0) && ([1,2].includes(parseInt(pkt.ecpri.elementId.charAt(4)))))) {
            ecpri_msgType4Data[pkt.id] = new Uint8Array(buf, off, ecpri.dataLength)
        }

        // decode PM file per packet
        if ((isPmFileLoaded) && (((ecpri.readWrite === 0) && (ecpri.requestResponse === 1)) ||
            (((ecpri.readWrite === 1) || (ecpri.readWrite === 2)) && (ecpri.requestResponse === 0)))) {
            let baseAddress = '0x' + (ptr[6] << 8 | ptr[7]).toString(16);
            for (let i = 0; i < 6; i++) {
                let num = ptr[8 + i];

                // JobId in MM transactions - ignore bits 46-32 from address
                if(i === 0) num = num & 0x80;
                else if(i === 1) num = 0;

                if (num <= 0xF) baseAddress += '0';
                baseAddress += num.toString(16);
            }
            ecpri.pmfile = pm_file_packet_decode(buf, off, baseAddress, ecpri.dataLength);
        }

        // HAC-RX Task Descriptor decoding (0x3020)
        if ((ecpri.elementId !== undefined) && (ecpri.elementId === '0x3020')
            && (parseInt(peCodes[parseInt(ecpri.elementId.charAt(3))]) === parseInt('0x0301')) &&
            (((ecpri.readWrite === 1) || (ecpri.readWrite === 2)) && (ecpri.requestResponse === 0))) ecpri_decodeHacRxTaskDescriptor(pkt, buf, off)

        // DeepRX pure IQ data decoding (0x3020 - Hraw, 0x3021 - RxData, 0x3022 - TxPilots, 0x3010 - LLRs)
        if ((ecpri.elementId !== undefined) && (['0x3020','0x3021','0x3022','0x3010'].includes(ecpri.elementId))
            && (parseInt(peCodes[parseInt(ecpri.elementId.charAt(3))]) === parseInt('0x0700')) &&
            (((ecpri.readWrite === 1) || (ecpri.readWrite === 2)) && (ecpri.requestResponse === 0))) ecpri_decodeDeepRxIqData(pkt, buf, off)

    } else if( ecpri.message === 5 ) {
        // One-Way Delay Measuremen
        // off += 20;
        ecpri.measurementId = ptr[4];
        ecpri.actionType = ptr[5];
        // TODO: change to ptr_get...
        ecpri.timestampSec = ptr[6] * 0x10000000000 + ptr[7] * 0x100000000 + ptr[8] * 0x1000000 + ptr[9] * 0x10000 + ptr[10] * 0x100 + ptr[11];
        ecpri.timestampNs = (ptr[12] * 2**24) + (ptr[13] * 2**16) + (ptr[14] * 2**8) + ptr[15];
        ecpri.compensation = ptr[16] * 0x100000000000000 + ptr[17] * 0x1000000000000 + ptr[18] * 0x10000000000 + ptr[19] * 0x100000000 +
            ptr[20] * 0x1000000 + ptr[21] * 0x10000 + ptr[22] * 0x100 + ptr[23];
    } else if( ecpri.message === 6 ) {
        // off +=3;
        ecpri.resetId = ptr[4] << 8 | ptr[5];
        ecpri.resetCodeOp = ptr[6];
        if (![1,2].includes(ecpri.resetCodeOp)) ecpri.resetCodeOp = 'Reserved'
    } else if( ecpri.message === 7 ) {
        off += 4;
        ecpri.eventId = ptr[4];
        ecpri.eventType = ptr[5];
        if (![0,1,2,3,4,5].includes(ecpri.eventType)) ecpri.eventType = 'Reserved'
        ecpri.seqNumber = ptr[6];
        ecpri.numOfFaults = ptr[7];

        ecpri.faults = [];
        for( let faultIdx = 0; faultIdx < ecpri.numOfFaults; ++faultIdx ) {
            let fault = {};

            ptr = new Uint8Array( buf, off );
            off += 8;

            fault.elementId = numToHex4Upper(ptr[0] << 8 | ptr[1]);
            fault.raiseCease = ptr[2] >> 4;
            fault.faultNotification = (ptr[2] & 0xF) << 8 | ptr[3];
            fault.additionalInfo = (ptr[4] * (2 ** 24)) + (ptr[5] * (2 ** 16)) + (ptr[6] * (2 ** 8)) + ptr[7];

            ecpri.faults.push( fault );

            if (fault.faultNotification === 3080) {
                ecpri_msgType7JobsCounterPerPe[parseInt(numToHex4(fault.elementId.charAt(3)))]++;
                ecpri.jobCounter = ecpri_msgType7JobsCounterPerPe[parseInt(numToHex4(fault.elementId.charAt(3)))];
            } else if (fault.faultNotification === 3081) {
                ecpri_msgType7JobsCounterPerPe[parseInt(numToHex4(fault.elementId.charAt(3)))]--;
                ecpri.jobCounter = ecpri_msgType7JobsCounterPerPe[parseInt(numToHex4(fault.elementId.charAt(3)))];
            }
            if (ecpri.faults[0].faultNotification === 3080 || ecpri.faults[0].faultNotification === 3081) {
                ecpri.peId = ( ecpri.faults[0].elementId >> 8 ) & 0xF;
                ecpri.jobId = ecpri.faults[0].additionalInfo;
            }
        }
    } else {
        logWarningCnt( --ecpri_logCntUnsupportedMsg, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported ecpriMessage(${ ecpri.message })` );
    }
}

function ecpri_decodeRaw(pkt, buf, off, pktEnd) {
    const ptr = new Uint8Array( buf, off );

    pkt.ecpri.interfaceRevision = ptr[0];
    pkt.ecpri.messageType = ptr[1];
    pkt.ecpri.messageId = ptr[2] | ptr [3];

    const isFrag = ecpri_appTransportDefrag(pkt);

    if(isFrag === false)
        l2l1_detectMessage(pkt, buf, off, pktEnd);
}

function ecpri_decodePdcchDci(pkt, buf, off, pktEnd){
    const ptr = new Uint8Array( buf, off );
}

function ecpri_decodePdschTb(pkt, buf, off, pktEnd){
    const ptr = new Uint8Array( buf, off );
}

function ecpri_decodeHacRxTaskDescriptor(pkt, buf, off) {
    let ptr = new Uint8Array(buf, off);
    let hacrx = pkt.hacrx = {};

    // TASK_HEADER
    off += 16;
    hacrx.headerPattern = numToHex4Upper((ptr[0] | ptr[1] << 8 | ptr[2] << 16 | ptr[3] << 24) >>> 0);
    hacrx.taskId = numToHex4Upper((ptr[4] | ptr[5] << 8 | ptr[6] << 16 | ptr[7] << 24) >>> 0);
    hacrx.nRb = ptr[8] | ptr[9] << 8;
    hacrx.rbg = ptr[10];
    hacrx.nL = ptr[11];
    hacrx.nRxPair = ptr[12];
    hacrx.nDmrsPos = ptr[13];
    hacrx.dmrsType = ptr[14];
    hacrx.nDataS = ptr[15];
    ecpri_hacRx_varsPerJob.push({
        'id': pkt.id,
        'taskId': (ptr[4] | ptr[5] << 8 | ptr[6] << 16 | ptr[7] << 24) >>> 0,
        'nRb': hacrx.nRb,
        'rbg': hacrx.rbg,
        'nL': hacrx.nL,
        'nRx': hacrx.nRxPair * 2,
        'nDmrs': hacrx.nDmrsPos,
        'nDs': hacrx.nDataS,
    });
    // TASK_CONFIG2
    ptr = new Uint8Array(buf, off);
    off += 16;
    hacrx.betaPerNoise = ptr[0] | ptr[1] << 8;
    hacrx.betaPerNoiseExp = ToSigned_8Bit(ptr[2]);
    hacrx.tdiCfgIndex = ptr[3];
    hacrx.cdmGroupLayerMap = numToHex4Upper((ptr[4] | ptr[5] << 8 | ptr[6] << 16 | ptr[7] << 24) >>> 0);
    hacrx.nReservedCdmGroups = ptr[8];
    hacrx.hExpOffset = ToSigned_8Bit(ptr[9]);
    hacrx.rddExpOffset = ToSigned_8Bit(ptr[10]);
    hacrx.xExpOffset = ToSigned_8Bit(ptr[11]);
    // hacrx.reserved = (ptr[12] | ptr[13] << 8 | ptr[14] << 16 | ptr[15] << 24) >>> 0;

    // N_TA
    ptr = new Uint8Array(buf, off);
    off += 16;
    hacrx.taLayer = new Array(16);
    for (let i = 0; i < 16; ++i) hacrx.taLayer[i] = ptr[i];
    // hacrx.taLayer0 = ptr[0];
    // hacrx.taLayer1 = ptr[1];
    // hacrx.taLayer2 = ptr[2];
    // hacrx.taLayer3 = ptr[3];
    // hacrx.taLayer4 = ptr[4];
    // hacrx.taLayer5 = ptr[5];
    // hacrx.taLayer6 = ptr[6];
    // hacrx.taLayer7 = ptr[7];
    // hacrx.taLayer8 = ptr[8];
    // hacrx.taLayer9 = ptr[9];
    // hacrx.taLayer10 = ptr[10];
    // hacrx.taLayer11 = ptr[11];
    // hacrx.taLayer12 = ptr[12];
    // hacrx.taLayer13 = ptr[13];
    // hacrx.taLayer14 = ptr[14];
    // hacrx.taLayer15 = ptr[15];

    // Phi_RSj_minus_Phi_RS0
    ptr = new Uint8Array(buf, off);
    let localOff = 0;
    for (let i = 0; i < (8 * Math.ceil(hacrx.nL / 8)); i += 8) {
        for (let j = 1; j < hacrx.nDmrsPos; j++) {
            hacrx['phiRsjMinusPhiRs0_' + i + '_' + j] = new Array(8);
            for (let k = 0; k < 8; k++) hacrx['phiRsjMinusPhiRs0_' + i + '_' + j][k] = ptr[(k * 2) + localOff] | ptr[(k * 2) + 1 + localOff] << 8;
            localOff += 16;
            off += 16;
        }
    }

    // Phi_DSj_minus_Phi_RS0
    ptr = new Uint8Array(buf, off);
    localOff = 0;
    for (let j = 0; j < hacrx.nDataS; j++) {
        for (let i = 0; i < (8 * Math.ceil(hacrx.nL / 8)); i += 8) {
            hacrx['phiDsjMinusPhiRs0_' + j + '_' + i] = new Array(8);
            for (let k = 0; k < 8; k++) hacrx['phiDsjMinusPhiRs0_' + j + '_' + i][k] = ptr[(k * 2) + localOff] | ptr[(k * 2) + 1 + localOff] << 8;
            localOff += 16;
            off += 16;
        }
    }
}

function ecpri_decodeDeepRxIqData(pkt, buf, off) {
    let ptr = new Uint8Array(buf, off);
    let localOff = 0;
    switch (pkt.ecpri.elementId) {
        case '0x3020':
            for (let i = 0; i < (pkt.ecpri.dataLength / 2); i++) {
                let val = interpretQ1_1_14(ptr[localOff] | (ptr[localOff + 1] << 8)) / 2
                Hraw_IQ.push(val);
                localOff += 2;
            }
            break;
        case '0x3021':
            for (let i = 0; i < (pkt.ecpri.dataLength / 2); i++) {
                let val = interpretQ1_1_14(ptr[localOff] | (ptr[localOff + 1] << 8)) / 2
                RxData_IQ.push(val);
                localOff += 2;
            }
            break;
        case '0x3022':
            for (let i = 0; i < (pkt.ecpri.dataLength / 2); i++) {
                let val = interpretQ1_1_14(ptr[localOff] | (ptr[localOff + 1] << 8)) / 2
                TxPilot_IQ.push(val);
                localOff += 2;
            }
            break;
        case '0x3010':
            for (let i = 0; i < pkt.ecpri.dataLength; i++) {
                let val = interpretQ1_5_2(ptr[localOff]);
                Llr_IQ.push(val);
                localOff += 1;
            }
            break;
    }
}

function estimate_exponential_mean(x, frac) {
    const n = x.length;
    x.sort(function (a, b) {
        return a - b;
    });
    const m = Math.floor(n * (1 - frac));
    const mu = 1 / m * v_sum(x.slice(0, m - 1)) + (n - m + 1) / m * x[m - 1];
    return mu;
}

const defragmentationHelper = {raw: {}};
let fragmentedPkts = {};    // TODO: move

function ecpri_appTransportDefrag(pkt){
    // returns true if packet is a fragment, false otherwise
    if(pkt.ecpri.Ebit === 1 && pkt.ecpri.subsequenceId === 0) return false;

    // packet is fragmented
    pkt.transportation = {};
    pkt.transportation.fragment = 1;
    const perRtcId = defragmentationHelper.raw[pkt.ecpri.rtcId];
    if(perRtcId === undefined) defragmentationHelper.raw[pkt.ecpri.rtcId] = {};

    const perSeq = defragmentationHelper.raw[pkt.ecpri.rtcId][pkt.ecpri.sequenceId];
    if(perSeq === undefined) defragmentationHelper.raw[pkt.ecpri.rtcId][pkt.ecpri.sequenceId] = {pktIds: [], pktCount: null, pktsFound: 0};

    const fragStruct = defragmentationHelper.raw[pkt.ecpri.rtcId][pkt.ecpri.sequenceId];    // TODO: clear this structure after decoding

    if(fragStruct.pktIds[pkt.ecpri.subsequenceId] === undefined){
        ++fragStruct.pktsFound;
    } else{
        logDebug('eCPRI Fragmentation', `Packet ${pkt.id} has overlapping subsequenceId ${pkt.ecpri.subsequenceId}`);
    }
    fragStruct.pktIds[pkt.ecpri.subsequenceId] = pkt.id;

    if(pkt.ecpri.Ebit === 1) {
        fragStruct.pktCount = pkt.ecpri.subsequenceId + 1;
        pkt.transportation.lastDelivered = 1;
    }

    if(fragStruct.pktCount === fragStruct.pktsFound){
        // found all packets
        if(fragStruct.pktIds.length > fragStruct.pktCount){
            logDebug('eCPRI Fragmentation', `Packet ${pkt.id} subsequenceId is too large`);
        }

        const fragInfo = {pktIds: fragStruct.pktIds, lastPkt: pkt.id};
        fragInfo.pktIds.forEach(pktId =>{
            fragmentedPkts[pktId] = fragInfo;
        });

        delete defragmentationHelper.raw[pkt.ecpri.rtcId][pkt.ecpri.sequenceId];
    }

    return true;
}

function GetAllocationsPerBundle(startPrb, numPrb, numBundPrb){
    // Returns PRB Ranges of size numBundPrb, limited by startPrb and numPrb.
    // Range start is inclusive, end is exclusive
    if(numBundPrb === 0) {
        logError("extType11", "GetAllocationsPerBundle(), numBundPrb cannot be 0");
        return [];
    }

    let start = Math.floor(startPrb / numBundPrb) * numBundPrb;
    let end = start + numBundPrb;

    const firstPrb = startPrb;
    const lastPrb = startPrb + numPrb;

    const ranges = [];
    while(start < lastPrb){
        ranges.push([Math.max(start, firstPrb), Math.min(end, lastPrb)]);
        start += numBundPrb;
        end += numBundPrb;
    }

    return ranges;
}

function ecpri_detectDefaultU() {
    const perfNow = performance.now();
    let maxSlotId = {};
    let maxSlotIdPktId = {};
    let lastPktIdx = {}; // [rtcId][UL-U, UL-C, DL-U, DL-C]
    let avgTimeCnt = {}, avgTimeDiff = {}; // [( ecpri.dataDir ? 0x10000 : 0 ) + rtcId]
    const ecpri_maxFinalSubframeOld = ecpri_maxFinalSubframe;
    for( let i = packetsLengthOld; i < packetsLength; ++i ) {
        const pkt = packets[i];
        if (pkt.ecpri &&
            (pkt.ecpri.message === 0 || pkt.ecpri.message === 2) &&
            (pkt.ecpri.filterIndex === 0 || pkt.ecpri.filterIndex === 3)) {
            const ecpri = pkt.ecpri;
            const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;
            const idd = ( ecpri.dataDir ? 2 : 0 ) + ( ecpri.message ? 1 : 0 );
            const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10;
            if( finalSubframe > ecpri_maxFinalSubframe ) ecpri_maxFinalSubframe = finalSubframe;
            if( !maxSlotId[antId] || ecpri.slotId > maxSlotId[antId] ) {
                maxSlotId[antId] = ecpri.slotId;
                maxSlotIdPktId[antId] = i;
            }
            if( lastPktIdx.hasOwnProperty( ecpri.rtcId ) ) {
                const j = lastPktIdx[ecpri.rtcId][idd];
                if( j !== -1 ) {
                    const pkt2 = packets[j];
                    const ecpri2 = pkt2.ecpri;
                    if( ecpri.hfn === ecpri2.hfn && ecpri.frameId === ecpri2.frameId && ecpri.subframeId === ecpri2.subframeId && ecpri.slotId === ecpri2.slotId && ecpri.startSymbolId !== ecpri2.startSymbolId ) {
                        const timeDiff = ( parseFloat(pkt.time) - parseFloat(pkt2.time) ) / ( ecpri.startSymbolId - ecpri2.startSymbolId );
                        if( !avgTimeCnt.hasOwnProperty( antId ) ) {
                            avgTimeCnt[antId] = 1;
                            avgTimeDiff[antId] = timeDiff;
                        } else {
                            ++avgTimeCnt[antId];
                            avgTimeDiff[antId] += timeDiff;
                        }
                    }
                    if( !( ecpri.hfn === ecpri2.hfn && ecpri.frameId === ecpri2.frameId && ecpri.subframeId === ecpri2.subframeId && ecpri.slotId === ecpri2.slotId && ecpri.startSymbolId === ecpri2.startSymbolId ) ) {
                        lastPktIdx[ecpri.rtcId][idd] = i;
                    }
                } else {
                    lastPktIdx[ecpri.rtcId][idd] = i;
                }
            } else {
                lastPktIdx[ecpri.rtcId] = [-1, -1, -1, -1];
                lastPktIdx[ecpri.rtcId][idd] = i;
            }
        }
        else if( pkt.ecpri && pkt.ecpri.subframeId !== undefined) {
            const finalSubframe = pkt.ecpri.hfn * 2560 + pkt.ecpri.frameId * 10 + pkt.ecpri.subframeId;
            if( finalSubframe > ecpri_maxFinalSubframe ) ecpri_maxFinalSubframe = finalSubframe;
        }
    }
    if( ecpri_maxFinalSubframe !== ecpri_maxFinalSubframeOld ) ecpri_maxFinalSubframe += 10;

    const uSymDiff = [ 1000 / 14, 1000 / 14 / 2, 1000 / 14 / 4, 1000 / 14 / 8, 1000 / 14 / 16, 1000 / 14 / 32 ];

    for( const antId in avgTimeCnt ) {
        const avgTimeD = avgTimeDiff[antId] * 1000000 / avgTimeCnt[antId];
        let defU = 0;
        for( let u = 1; u <= 5; ++u ) {
            if( Math.abs( uSymDiff[u] - avgTimeD ) <= Math.abs( uSymDiff[defU] - avgTimeD ) ) defU = u;
        }
        if( config.load.numerologyAutodetection ) {
            if( ecpri_defaultU[antId] && ecpri_defaultU[antId] !== defU ) {
                logWarning( 'eCPRI', `Numerology detected( overridden ): dir ${ ( ( antId >> 16 ) ? 'DL' : 'UL' ) }, rtcId ${ ( antId & 0xFFFF ) }, u ${ defU }( prev. ${ ecpri_defaultU[antId] } ), avg. time between symbols ${ avgTimeD.toFixed( 2 ) }us` );
            } else {
                logInfo( 'eCPRI', `Numerology ${ ecpri_defaultU[antId] ? 're-' : '' }detected: dir ${ ( ( antId >> 16 ) ? 'DL' : 'UL' ) }, rtcId ${ ( antId & 0xFFFF ) }, u ${ defU }, avg. time between symbols ${ avgTimeD.toFixed( 2 ) }us` );
            }
            ecpri_defaultU[antId] = defU;
        } else {
            if( ecpri_defaultU[antId] && ecpri_defaultU[antId] !== config.load.defaultU ) {
                logWarning( 'eCPRI', `Numerology detected( overridden ): dir ${ ( ( antId >> 16 ) ? 'DL' : 'UL' ) }, rtcId ${ ( antId & 0xFFFF ) }, u ${ defU }( prev. ${ ecpri_defaultU[antId] } ), using default u ${ config.load.defaultU }` );
            } else {
                logInfo( 'eCPRI', `Numerology detected: dir ${ ( ( antId >> 16 ) ? 'DL' : 'UL' ) }, rtcId ${ ( antId & 0xFFFF ) }, u ${ defU }, using default u ${ config.load.defaultU }` );
            }
            ecpri_defaultU[antId] = config.load.defaultU;
        }
    }

    for( const rtcIdStr in lastPktIdx ) {
        const rtcId = parseInt( rtcIdStr );
        if( lastPktIdx[rtcId][0] !== -1 && !ecpri_defaultU.hasOwnProperty( rtcId ) ) {
            ecpri_defaultU[rtcId] = config.load.defaultU;
            logInfo( 'eCPRI', `Numerology not detected: dir UL, rtcId ${ rtcId }, using default u ${ config.load.defaultU }.` );
        }
        if( lastPktIdx[rtcId][2] !== -1 && !ecpri_defaultU.hasOwnProperty( 0x10000 + rtcId ) ) {
            ecpri_defaultU[0x10000 + rtcId] = config.load.defaultU;
            logInfo( 'eCPRI', `Numerology not detected: dir DL, rtcId ${ 0x10000 + rtcId }, using default u ${ config.load.defaultU }.` );
        }
    }

    let maxU = 0;
    for( const antId in ecpri_defaultU ) {
        const u = ecpri_defaultU[antId];
        if( u > maxU ) maxU = u;
        while( ( maxSlotId[antId] >> ( maxU - u ) ) >= NUM_OF_SLOTS_PER_U[u] ) {
            if( maxU === 5 ) {
                logError( 'eCPRI', `Max u detection error: maxSlotId(${ maxSlotId[antId] }) >> ( maxU(5) - u(${ u }) ) == ${ ( maxSlotId[antId] >> ( maxU - u ) ) } >= NUM_OF_SLOTS_PER_U[${ u }](${ NUM_OF_SLOTS_PER_U[u] }). Max slotId packet: ${ makeLikeHrefOnClick( maxSlotIdPktId[antId], `packetDetailsDialog_showPacketWithId( ${ maxSlotIdPktId[antId] } )` ) }` );
                break;
            } else {
                ++maxU;
            }
        }
    }

    const oldMaxU = ecpri_maxU;
    ecpri_maxU = maxU;
    if( config.load.numerologyAutodetection === false && config.load.maxU !== -1 ) {
        if( config.load.maxU < ecpri_maxU ) logWarning( 'eCPRI', `Selected max u(${ config.load.maxU }) can't be lower than the highest u(${ ecpri_maxU } )` );
        ecpri_maxU = config.load.maxU;
    }
    else if( config.load.maxU !== -1 ) {
        if( config.load.maxU < ecpri_maxU ) logWarning( 'eCPRI', `Selected max u(${ config.load.maxU }) can't be lower than the highest u(${ ecpri_maxU } )` );
        else ecpri_maxU = config.load.maxU;
    }
    if( oldMaxU !== -1 && ecpri_maxU !== oldMaxU ) {
        logWarning( 'eCPRI', `Detected max u( overridden ): ${ maxU }, using max u: ${ ecpri_maxU }( prev. ${ oldMaxU })` );
    } else {
        logInfo( 'eCPRI', `Detected max u: ${ maxU }, using max u: ${ ecpri_maxU }` );
    }

    logDebug( 'eCPRI', `Numerology detection took: ${ perfToMsFrom( perfNow ) }` );
}

function ecpri_isPacketsCoupled( cEcpri, uEcpri ) {
    if( cEcpri.slotId === uEcpri.slotId && cEcpri.startSymbolId <= uEcpri.startSymbolId ) {
        const cSectLen = cEcpri.sections.length;
        const uSectLen = uEcpri.sections.length;
        for( let uSectIdx = 0; uSectIdx < uSectLen; ++uSectIdx ) {
            const uSect = uEcpri.sections[uSectIdx];
            const uPrbEnd = uSect.startPrb + uSect.numPrb;
            for( let cSectIdx = 0; cSectIdx < cSectLen; ++cSectIdx ) {
                const cSect = cEcpri.sections[cSectIdx];
                if( cSect.sectionId === uSect.sectionId || cSect.sectionId === 4095 ) {
                    let isExtType6or12Present = false;
                    if( cSect.ef ) {
                        for( const ext of cSect.exts ) {
                            if( ext.extType === 6 ) {
                                isExtType6or12Present = true;
                                if( ext.symbolMask & ( 1 << uSect.startSymbolId ) ) {

                                }

                                // TODO: check multiple extType6 per section
                                break;
                            } else if( ext.extType === 12 ) {
                                isExtType6or12Present = true;
                                if( ext.symbolMask & ( 1 << uEcpri.startSymbolId ) ) {
                                    if( ext.offStartPrb.length === 0 ) return true;

                                    for( let i = 0; i < ext.offStartPrb.length; ++i ) {
                                        if( ext.numPrb[i] !== 0 ) {
                                            if( !( ( ext.offStartPrb[i] + ext.numPrb[i] ) < uSect.startPrb ) || !( ext.offStartPrb[i] > uPrbEnd ) ) {
                                            //if( ext.offStartPrb[i] < uPrbEnd || !( ext.offStartPrb[i] > uPrbEnd ) ) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if( !isExtType6or12Present ) {
                        if( ( cEcpri.startSymbolId + cSect.numSymbol ) > uEcpri.startSymbolId &&
                            ( ( cSect.startPrb === 0 && cSect.numPrb === 0 ) ||
                              ( cSect.startPrb <= uSect.startPrb && ( cSect.startPrb + cSect.numPrb ) >= (uSect.startPrb+uSect.numPrb) ) ) ) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function ecpri_linkPkts() {
    let perfNow = performance.now();
    let ecpri_cPkts = new Map(), ecpri_uPkts = new Map();
    for( let pktIdx = packetsLengthOld; pktIdx < packetsLength; ++pktIdx ) {
        const pkt = packets[pktIdx];
        if( pkt.ecpri && ( pkt.ecpri.message === 0 || pkt.ecpri.message === 2 ) ) {
            const ecpri = pkt.ecpri;
            const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;
            const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10 + ecpri.subframeId;

            const plane_ant = ecpri.message === 0 ? ecpri_uPkts : ecpri_cPkts;

            if(plane_ant.has(antId) === false) plane_ant.set(antId, new Map());
            const ecpri_pkts_ant = plane_ant.get(antId);

            if( ecpri_pkts_ant.has(finalSubframe) === false ) ecpri_pkts_ant.set(finalSubframe, []);
            const ecpri_pkts_sf = ecpri_pkts_ant.get(finalSubframe);

            ecpri_pkts_sf.push( pktIdx );
        }
    }
    logDebug( 'eCPRI', `Split packets by antId&subframe took: ${ perfToMsFrom( perfNow ) }` );

    let logCntPktAlreadyLinked = 10;
    perfNow = performance.now();
    ecpri_pktLinks.length = packetsLength;
    ecpri_pktLinks.fill( -1, packetsLengthOld );

    for( const [antId, _] of ecpri_uPkts ) {
        const ecpri_cPkts_ant = ecpri_cPkts.get(antId);
        if( !ecpri_cPkts_ant ) continue;
        const ecpri_uPkts_ant = ecpri_uPkts.get(antId);
        for( const [subframe, pkts] of ecpri_cPkts_ant ) {
            const ecpri_cPkts_sf = ecpri_cPkts_ant.get(subframe);
            const ecpri_uPkts_sf = ecpri_uPkts_ant.get(subframe);
            if( ecpri_cPkts_sf && ecpri_uPkts_sf ) {
                const cLen = ecpri_cPkts_sf.length;
                const uLen = ecpri_uPkts_sf.length;
                for( let uIdx = 0; uIdx < uLen; ++uIdx ) {
                    const uPktIdx = ecpri_uPkts_sf[uIdx];
                    const uEcpri = packets[uPktIdx].ecpri;
                    for( let cIdx = 0; cIdx < cLen; ++cIdx ) {
                        const cPktIdx = ecpri_cPkts_sf[cIdx];
                        const cEcpri = packets[cPktIdx].ecpri;
                        if( ecpri_isPacketsCoupled( cEcpri, uEcpri ) ) {
                            if( ecpri_pktLinks[uPktIdx] === -1 ) {
                                ecpri_pktLinks[uPktIdx] = cPktIdx;
                            } else {
                                logWarningCnt( --logCntPktAlreadyLinked, 'eCPRI', 'U-Plane pkt already linked with C-Plane. Multiple C-Plane pkts per one U-Plane?' );
                            }
                        }
                    }
                }
            }
        }
    }
    logDebug( 'eCPRI', `Link packets took: ${ perfToMsFrom( perfNow ) }` );
}

function ecpri_detectNumPrbAndU() {
    const perfNow = performance.now();

    let logCntUnknownFrameStructure = 10;
    let logCntUnknownFilterIndex = 10;
    let logCntFinalSym = 10;

    // DeepRx utilities
    let hrawIterator = 0;
    let hrawSubframe = 0;
    let rxdataIterator = 0;
    let rxdataSubframe = 0;
    let txpilotIterator = 0;
    let txpilotSubframe = 0;

    ecpri_uInPkt.length = packetsLength;
    ecpri_uInPkt.fill( -1, packetsLengthOld );

    for( let pktIdx = packetsLengthOld; pktIdx < packetsLength; ++pktIdx ) {
        const pkt = packets[pktIdx];
        if( pkt.ecpri ) {
            const ecpri = pkt.ecpri;
            const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;

            let u = -1;
            const lnkPktIdx = ecpri_pktLinks[pktIdx];
            if( lnkPktIdx !== -1 && packets[lnkPktIdx].ecpri.sectionType === 3 ) {
                const frameStructureMap = [0, 1, 2, 3, 4, 5, -1, -1, -1, -1, -1, -1, 6, 7, 8, 9];
                u = frameStructureMap[packets[lnkPktIdx].ecpri.frameStructure & 0xF];
                if( u === -1 ) {
                    u = ecpri_defaultU[antId] ? ecpri_defaultU[antId] : config.load.defaultU;
                    logWarningCnt( --logCntUnknownFrameStructure, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unknown frameStructure(${ packets[lnkPktIdx].ecpri.frameStructure }). Using default u(${ u })` );
                }
            } else {
                switch( ecpri.filterIndex ) {
                    case 0: u = ecpri_defaultU[antId]; break;
                    case 1: u = 6; break; // 1.25kHz
                    case 2: u = 8; break; // 5kHz
                    case 3: u = ecpri_defaultU[antId]; break;
                    case 4: u = 7; break; // 3.75kHz
                    case 5: u = 9; break; // 7.5kHz
                    default:
                        u = ecpri_defaultU[antId] ? ecpri_defaultU[antId] : config.load.defaultU;
                        logWarningCnt( --logCntUnknownFilterIndex, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unknown filterIndex(${ ecpri.filterIndex }). Using default u(${ u })` );
                        break;
                }
            }
            if (Hraw_IQ.length > 0 || RxData_IQ.length > 0 || TxPilot_IQ.length > 0) u = 1

            ecpri_uInPkt[pktIdx] = u;

            if( config.load.skipIqDecoding ) continue;

            const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10 + ecpri.subframeId;
            const finalSymbol = ( ecpri.slotId >> ( u <= 5 ? ecpri_maxU - u : 0 ) ) * 14 + ecpri.startSymbolId;
            if( finalSymbol >= NUM_OF_SYM_IN_SF_PER_U[u] ) {
                logErrorCnt( --logCntFinalSym, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: finalSymbol(${ finalSymbol }) is >= than num of symbols(${ NUM_OF_SYM_IN_SF_PER_U[u] }) in detected u(${ u }), max u(${ ecpri_maxU })` );
                continue;
            }

            if( !iqBuffers[u] ) {
                iqBuffers[u] = {};
                iqOffsets[u] = {};
                iqNumPrb[u] = {};
                iqStartPrb[u] = {};
                iqTypeBuffers[u] = {};
                iqFirstSubframe[u] = {};
                packet_places[u] = {};
            }
            if (!fcp_places[u]) fcp_places[u] = {};
            if (!fcp_places[u][antId]) fcp_places[u][antId] = {};

            if(pkt.ecpri.message === 0) {

                let iqOffsets_sf = iqOffsets[u][antId];
                let iqNumPrb_sf = iqNumPrb[u][antId];
                let iqStartPrb_sf = iqStartPrb[u][antId];

                if( !iqOffsets_sf ) {
                    iqOffsets[u][antId] = iqOffsets_sf = new Array( ecpri_maxFinalSubframe );
                    iqNumPrb[u][antId] = iqNumPrb_sf = new Array( ecpri_maxFinalSubframe );
                    iqStartPrb[u][antId] = iqStartPrb_sf = new Array( ecpri_maxFinalSubframe );
                    iqFirstSubframe[u][antId] = finalSubframe;
                } else if( iqOffsets_sf.length < ecpri_maxFinalSubframe ) {
                    const oldLen = iqOffsets_sf.length;
                    iqOffsets_sf.length = ecpri_maxFinalSubframe;
                    iqNumPrb_sf.length = ecpri_maxFinalSubframe;
                    iqStartPrb_sf.length = ecpri_maxFinalSubframe;

                    for( let i = oldLen; i < ecpri_maxFinalSubframe; ++i ) {
                        iqOffsets_sf[i] = null;
                        iqNumPrb_sf[i] = null;
                        iqStartPrb_sf[i] = null;
                    }
                }

                if( finalSubframe < iqFirstSubframe[u][antId] ) iqFirstSubframe[u][antId] = finalSubframe;

                let iqNumPrb_sym = iqNumPrb_sf[finalSubframe];
                let iqStartPrb_sym = iqStartPrb_sf[finalSubframe];

                if( !iqNumPrb_sym ) {
                    iqOffsets_sf[finalSubframe] = new Uint32Array( NUM_OF_SYM_IN_SF_PER_U[u] );
                    iqNumPrb_sf[finalSubframe] = iqNumPrb_sym = new Uint16Array( NUM_OF_SYM_IN_SF_PER_U[u] );
                    iqStartPrb_sf[finalSubframe] = iqStartPrb_sym = new Uint16Array( NUM_OF_SYM_IN_SF_PER_U[u] ).fill( 65535 );
                }

                if(!packet_places[u][antId]) packet_places[u][antId] = {};
                for( const sect of ecpri.sections ?? [] ) {
                    const finalPrb = sect.startPrb + sect.numPrb;
                    const startPrb = sect.startPrb;

                    if( iqStartPrb_sym[finalSymbol] > startPrb ) {
                        iqStartPrb_sym[finalSymbol] = startPrb;
                    }

                    if( iqNumPrb_sym[finalSymbol] < finalPrb - iqStartPrb_sym[finalSymbol] ) {
                        iqNumPrb_sym[finalSymbol] = finalPrb - iqStartPrb_sym[finalSymbol];
                    }

                        const id = finalSubframe + ":" + finalSymbol;

                        if (!packet_places[u][antId][id]) packet_places[u][antId][id] = [];
                        packet_places[u][antId][id].push(pktIdx);

                }
            }
            else if(pkt.ecpri && pkt.ecpri.message === 2) {

                if (!fcp_places[u][antId][finalSubframe]) fcp_places[u][antId][finalSubframe] = [];

                for(let i = 0; i < pkt.ecpri.numberOfSections; i++){
                    const places = sectionToFigures(pkt.ecpri, i, 14*(ecpri.slotId >> (u <= 5 ? ecpri_maxU - u : 0)), pktIdx);
                    fcp_places[u][antId][finalSubframe].push( ...places );
                }
            }
            else if ((pkt.ecpri) && (pkt.ecpri.message === 4) && (ecpri.elementId !== undefined) && (['0x3020','0x3021','0x3022'].includes(ecpri.elementId))
                && isDeepRx && (((ecpri.readWrite === 1) || (ecpri.readWrite === 2)) && (ecpri.requestResponse === 0))) {
                switch (pkt.ecpri.elementId) {
                    case '0x3020':
                        if (hrawIterator > 5) {
                            hrawIterator = 0;
                            hrawSubframe += 1;
                        }
                        for (let ant = 0; ant < numOfHrawAnts; ant++) {
                            if(!packet_places[u][ant]) packet_places[u][ant] = {};
                            for (let sym = 0; sym < numOfHrawSymbolsPerStruct; sym++) {
                                let symbol = sym % numOfHrawSymbolsPerStruct ? 11 : 2;
                                if (hrawIterator > 2) symbol += 14;

                                const id = hrawSubframe + ":" + symbol;

                                if (!packet_places[u][ant][id]) packet_places[u][ant][id] = [];
                                packet_places[u][ant][id].push(pktIdx);
                            }
                        }
                        hrawIterator += 1;
                        break;
                    case '0x3021':
                        if (rxdataIterator > 21) {
                            rxdataIterator = 0;
                            rxdataSubframe += 1;
                        }
                        for (let ant = 8; ant < (8 + numOfRxDataAnts); ant++) {
                            if(!packet_places[u][ant]) packet_places[u][ant] = {};
                            for (let sym = 0; sym < numOfRxDataSymbolsPerStruct; sym++) {
                                let symbol = sym;
                                if (rxdataIterator > 10) symbol += 14;

                                const id = rxdataSubframe + ":" + symbol;

                                if (!packet_places[u][ant][id]) packet_places[u][ant][id] = [];
                                packet_places[u][ant][id].push(pktIdx);
                            }
                        }
                        rxdataIterator += 1;
                        break;
                    case '0x3022':
                        if (txpilotIterator > 1) {
                            txpilotIterator = 0;
                            txpilotSubframe += 1;
                        }
                        for (let ant = 12; ant < (12 + numOfTxPilotAnts); ant++) {
                            if(!packet_places[u][ant]) packet_places[u][ant] = {};
                            for (let sym = 0; sym < numOfTxPilotSymbolsPerStruct; sym++) {
                                let symbol = sym % numOfTxPilotSymbolsPerStruct ? 11 : 2;
                                if (txpilotIterator > 0) symbol += 14;

                                const id = txpilotSubframe + ":" + symbol;

                                if (!packet_places[u][ant][id]) packet_places[u][ant][id] = [];
                                packet_places[u][ant][id].push(pktIdx);
                            }
                        }
                        txpilotIterator += 1;
                        break;
                }
            }
        }
    }
    logDebug( 'eCPRI', `Detecting numPrb and numerology per pkt took: ${ perfToMsFrom( perfNow ) }` );
}

function sectionToFigures(ecpri, sectionNumber, slotStartOffset, packetIndex) {
    /*Function from old BBA*/
    if(!ecpri.sections) return [];
    const section = ecpri.sections[sectionNumber];
    let {regions, rbGroups} = findFcpRegions(section, ecpri.startSymbolId);
    const ranges = rbGroups.length > 0;

    let ret = [];
    for (let rbgIdx = 0; rbgIdx < (rbGroups.length || 1); rbgIdx += 1) {
        let startPrb = ranges && rbGroups[rbgIdx][0] ? rbGroups[rbgIdx][0] : section.startPrb;
        let endPrb   = ranges && rbGroups[rbgIdx][1] ? rbGroups[rbgIdx][1] : section.startPrb + section.numPrb;
        if(endPrb === startPrb) endPrb = 273;

        for (let regionIdx = 0; regionIdx < regions.length; regionIdx += 1)
            ret.push({
                x0: slotStartOffset + regions[regionIdx][0],
                x1: slotStartOffset + regions[regionIdx][1],
                y0: startPrb,
                y1: endPrb,
                packet: packetIndex,
                sect: sectionNumber
            })
    }
    return ret;
}

function findFcpRegions(section, startSymbolId) {
    /*Function from old BBA*/
    let regions = []
    let rbGroups = []
    if (section.ef)
        for (let i = 0; i < section.exts.length; i += 1) {
            let ext = section.exts[i];
            if (ext.extType === 6) {
                regions.push(...bitmapToRanges(ext.symbolMask.toString(16)))

                let startPrbc = section.numPrb ? section.startPrb : 0;
                let numPrbc   = section.numPrb ? section.numPrb   : 273;

                const rbgSize = [-1, 1, 2, 3, 4, 6, 8, 16][ext.rbgSize]
                const lastRbgid = Math.ceil((numPrbc + (startPrbc % rbgSize))/rbgSize) -1;

                let ranges = bitmapToRanges(ext.rbgMask.toString(16), lastRbgid);
                const f0 = rbgSize - (startPrbc % rbgSize);
                ranges = ranges.map(range=>[startPrbc + f0 + (range[0]-1)*rbgSize, startPrbc + f0 + (range[1]-1)*rbgSize]);
                if(ranges.length === 0) continue;
                ranges[0][0] = startPrbc;
                ranges[ranges.length-1][1] = Math.min(ranges[ranges.length-1][1], startPrbc + numPrbc);

                rbGroups.push(...ranges);
            }
            else if( ext.extType === 12){
                regions.push(...bitmapToRanges(ext.symbolMask.toString(16)))

                if(ext.offStartPrb === undefined) continue;

                let startPrb = [section.startPrb, ...ext.offStartPrb];
                let numPrb = [section.numPrb, ...ext.numPrb];

                for(let j = 0; j < startPrb.length; ++j){
                    startPrb[j] += ( (startPrb[j-1] ?? 0) + (numPrb[j-1] ?? 0) );
                    if(numPrb[j] === 0) continue;
                    rbGroups.push([startPrb[j], startPrb[j] + numPrb[j]]);
                }
                rbGroups = optimizeRanges(rbGroups);
            }
        }
    rbGroups = rbGroups.map(range=>{
        if(range[0] === 0 && range[1] === optimizeRanges)
            return [-1/6, -1/12];
        return range;
    })
    return {regions: regions.length ? regions : [[startSymbolId || 0, (startSymbolId + section.numSymbol) || 14]],
        rbGroups: rbGroups}
}

function bitmapToRanges(field, limit) {
    /*Function from old BBA*/
    let ranges = []
    let bitmap = parseInt(field, 16)
    limit = Math.min(Math.ceil(Math.log2(bitmap)), limit ?? 256)
    for (let idx = 0; idx <= limit; idx += 1) {
        let startRange = idx
        while (bitmap & (1 << idx) && idx<=limit) idx += 1
        if (idx > startRange) ranges.push([startRange, idx])
    }
    return ranges
}

function optimizeRanges(range){
    /*Function from old BBA*/
    if(!range.length || range.length === 0 ) return range;

    let rangeStart = range[0][0];
    let prevEnd = range[0][1];
    let result = [];
    for(let i = 1; i < range.length; ++i){
        if(range[i][0] === prevEnd){
            prevEnd = range[i][1];
            continue;
        }
        result.push([rangeStart, prevEnd]);
        rangeStart = range[i][0];
        prevEnd = range[i][1];
    }
    result.push([rangeStart, range[range.length-1][1]]);
    return result;
}

function ecpri_createIqStructure() {
    const perfNow = performance.now();
    let usedMemory = 0;

    if (isDeepRx) ecpri_deepRxCreateIqStructure();

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqNumPrb[u] ) {
            const maxSym = NUM_OF_SYM_IN_SF_PER_U[u];
            for( const antId in iqNumPrb[u] ) {
                let iqOffsets_ant = iqOffsets[u][antId];
                let iqNumPrb_ant = iqNumPrb[u][antId];
                let prbSum = 0;
                for( const sfStr in iqNumPrb_ant ) {
                    const sf = Number(sfStr);
                    let iqOffsets_sf = iqOffsets_ant[sf];
                    let iqNumPrb_sf = iqNumPrb_ant[sf];
                    if( iqNumPrb_sf ) {
                        for( let sym = 0; sym < maxSym; ++sym ) {
                            const numPrb = iqNumPrb_sf[sym];
                            if( numPrb ) {
                                // TODO: detect if iqOffset is already set and if wrong -> recreate iqBuffers, define offset and sizes to copy
                                const oldOff = iqOffsets_sf[sym];
                                const curOff = prbSum * 24;

                                iqOffsets_sf[sym] = prbSum * 24;
                                prbSum += numPrb
                            }
                        }
                    }
                }
                const numOfSamples = prbSum * 24;
                // if( !iqBuffers[u][antId] ) {
                    iqBuffers[u][antId] = new Float32Array( numOfSamples );
                // }
                usedMemory += numOfSamples * 4;
                // console.log( formatBytes( prbSum * 24 * 4 ) );
            }
        }
    }
    logDebug( 'eCPRI', `Creating IQ structure took: ${ perfToMsFrom( perfNow ) }. IQ buffers memory size: ${ formatBytes( usedMemory ) }` );
}

function ecpri_decodeIq(ethPresent) {
    const perfNow = performance.now();

    let iqF32 = new Float32Array( 2 * MAX_RE_IN_SYM );
    const iqDecoder = new IqDecoder(config.load.iqScalingMode);

    for( let pktIdx = packetsLengthOld; pktIdx < packetsLength; ++pktIdx ) {
        const pkt = packets[pktIdx];
        if( canPacketContainIqData(pkt) ) {
            let off = packetsPayloadOffset[pktIdx] + 12 + (ethPresent?14:0); // eth: 14, ecpri: 8, oran: 4
            if( pkt.hasOwnProperty( 'vlan' ) ) off += 4 * pkt.vlan.length;
            // if( pkt.hasOwnProperty( 'qinq' ) ) off += 4 * pkt.qinq.length;
            const u = ecpri_uInPkt[pktIdx];
            const ecpri = pkt.ecpri;
            const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;
            const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10 + ecpri.subframeId;
            const finalSymbol = ( ecpri.slotId >> ( u <= 5 ? ecpri_maxU - u : 0 ) ) * 14 + ecpri.startSymbolId;

            let iq;
            if( config.load.skipIqDecoding || finalSymbol >= NUM_OF_SYM_IN_SF_PER_U[u] ) {
                iq = iqF32;
            } else {
                iq = new Float32Array( iqBuffers[u][antId].buffer, iqOffsets[u][antId][finalSubframe][finalSymbol] * 4, iqNumPrb[u][antId][finalSubframe][finalSymbol] * 24 );
            }

            let iqBitWidth = config.load.iqBitWidth;
            let iqCompMeth = config.load.iqCompMethod;
            iqDecoder.setCompression(iqCompMeth, iqBitWidth);

            for( const sect of ecpri.sections ) {
                off += 4;
                if( config.load.dynamicIqComp ) {
                    off += 2;
                    iqBitWidth = sect.udCompHdr_iqWidth;
                    iqCompMeth = sect.udCompHdr_compMeth;
                    iqDecoder.setCompression(iqCompMeth, iqBitWidth);
                }

                if( iqCompMeth === 5 || iqCompMeth === 6 ) off += 2; // udCompLen

                //let cSect = null;
                //if( iqCompMeth === 4 || iqCompMeth === 6 ) {
                //    const lnkPktIdx = ecpri_pktLinks[pktIdx]; // linked c-plane packet
                //    if( lnkPktIdx !== -1 ) {
                //        for( const cSect of lnkPktIdx.ecpri.sections ) {
                //            if( sect.sectionId === cSect.sectionId ) {

                //                break;
                //            }
                //        }
                //    }
                //}

                let startPrb;
                if(iqStartPrb[u] && iqStartPrb[u][antId] && iqStartPrb[u][antId][finalSubframe])
                    startPrb = iqStartPrb[u][antId][finalSubframe][finalSymbol];
                else
                    startPrb = 0;

                let iqOff = sect.startPrb * 24;
                let max_amp = 0, rms = 0;

                for( let prb = sect.startPrb; prb < sect.startPrb+sect.numPrb; ++prb ) {
                    try{
                        let ptr = new Uint8Array( packetsPayloadBuffer, off );

                        const {amp, offset, sReSMask, exponent, sblockScaler, squared_amplitude_sum} =
                            iqDecoder.decode(ptr, iq, (prb-startPrb)*24, sect.compBitWidth !== undefined ? sect.compBitWidth[prb] : undefined,
                                sect.compShift!== undefined ? sect.compShift[prb] : undefined, prb);
                        off += offset;
                        rms += squared_amplitude_sum;

                        if(exponent !== null)
                            sect.exponent[prb-sect.startPrb] = exponent;
                        if(sReSMask !== null)
                            sect.sReSMask[prb-sect.startPrb] = sReSMask;
                        if(sblockScaler !== null)
                            sect.sblockScaler[prb-sect.startPrb] = sblockScaler;

                        if( amp > max_amp ) max_amp = amp;
                    } catch (e) {
                        console.error(e);
                    }
                }
                if(sect.numPrb !== 0){
                    rms = roundTo( Math.sqrt( rms / ( sect.numPrb * 12 ) ), 2 );
                    sect.rms = rms;
                    const log10rms = 20 * ( rms ? Math.log10( rms ) : 0 );
                    if( iqCompMeth === 0 || iqCompMeth === 1 ) sect.rms_dBFS = roundTo( log10rms + ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][iqCompMeth][iqBitWidth], 2 );
                    if( ecpri.dataDir === 0 ) sect.rms_dBm = roundTo( log10rms - 152 - ecpri_ulGain[config.load.iqScalingMode][u] + 10 * Math.log10( 12 ), 2 );

                    sect.max_amp = max_amp = roundTo( Math.sqrt( max_amp ), 2 );
                    const log10maxAmp = 20 * ( max_amp ? Math.log10( max_amp ) : 0 );
                    if( iqCompMeth === 0 || iqCompMeth === 1 ) sect.max_amp_dBFS = roundTo( log10maxAmp + ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][iqCompMeth][iqBitWidth], 2 );
                    if( ecpri.dataDir === 0 ) sect.max_amp_dBm = roundTo( log10maxAmp - 152, 2 );
                }

            }
        }
    }
    iq_maxAmplitude = findMaxAmplitude();

    if(time_i){
        for(let antId in time_i){
            bindTimeBuffers(antId, {i: time_i[antId], q: time_q[antId]});
            parseTimeIQtoIQ(antId);
        }
    }

    if (isDeepRx) ecpri_deepRxFillIqBuffer();

    logDebug( 'eCPRI', `IQ decoding took: ${ perfToMsFrom( perfNow ) }` );
}

function ecpri_postPcapDecode(ethPresent = true) {
    const perfNow = performance.now();
    // printMemoryStats();

    ecpri_detectDefaultU();
    ecpri_linkPkts();
    ecpri_detectNumPrbAndU();
    if( !config.load.skipIqDecoding ) ecpri_createIqStructure();
    if( !config.load.skipIqDecoding ) ecpri_decodeIq(ethPresent);
    if( !config.load.skipIqDecoding ) nr_fillIqTypes();
    ecpri_validateMsgType6();
    ecpri_hacrxDecodeSfnAndSlot();
    ecpri_dissect_eAxc_values();
    // printMemoryStats();
    logDebug( 'eCPRI', `Post ecpri_postPcapDecode took: ${ perfToMsFrom( perfNow ) }` );
}

function ecpri_encode( pkt, buf, off ) {
    const ecpri = pkt.ecpri;
    let ptr = new Uint8Array( buf, off );

    off += 4;
    ptr[0] = ecpri.version << 4 | ( ecpri.concat & 0x1 );
    ptr[1] = ecpri.message;
    ptr[2] = ecpri.payload >> 8;
    ptr[3] = ecpri.payload;

    if( ecpri.message === 0 || ecpri.message === 2 ) {
        off += 8;
        ptr[4] = ecpri.rtcId >> 8;
        ptr[5] = ecpri.rtcId;
        ptr[6] = ecpri.seqId >> 8;
        ptr[7] = ecpri.seqId;
        ptr[8] = ecpri.dataDir << 7 | ( ecpri.payloadVer & 0x7 ) << 4 | ( ecpri.filterIndex & 0xF );
        ptr[9]  = ecpri.frameId;
        ptr[10] = ecpri.subframeId << 4 | ( ecpri.slotId & 0x3F ) >> 2;
        ptr[11] = ecpri.slotId << 6 | ( ecpri.startSymbolId & 0x3F );

        if( ecpri.message === 0 ) { // IQ data message
            for( let sectIdx = 0; sectIdx < ecpri.sections.length; ++sectIdx ) {
                const sect = ecpri.sections[sectIdx];
                ptr = new Uint8Array( buf, off );

                off += 4;
                ptr[0] = sect.sectionId >> 4;
                ptr[1] = sect.sectionId << 4 | ( sect.rb & 0x1 ) << 3 | ( sect.symInc & 0x1 ) << 2 | ( sect.startPrb & 0x3FF ) >> 8;
                ptr[2] = sect.startPrb;
                ptr[3] = sect.numPrb;

                if( config.load.dynamicIqComp ) {
                    off += 2;
                    ptr[4] = sect.udCompHdr;
                }
            }
        } else { // Real-time control data message
            off += 4;
            ptr[12] = ecpri.numberOfSections;
            ptr[13] = ecpri.sectionType;

            if( ecpri.sectionType === 0 || ecpri.sectionType === 3 ) {
                off += 4;
                ptr[14] = ecpri.timeOffset >> 8;
                ptr[15] = ecpri.timeOffset;
                ptr[16] = ecpri.frameStructure;
                ptr[17] = ecpri.cpLength >> 8;
                ptr[18] = ecpri.cpLength;
                if( ecpri.sectionType === 3 ) ptr[19] = ecpri.udCompHdr;
            } else if( ecpri.sectionType === 1 || ecpri.sectionType === 5 ) {
                ptr[14] = ecpri.udCompHdr;
                ptr[15] = ecpri.reserved;
            } else if( ecpri.sectionType === 6 ) {
                ptr[14] = ecpri.numberOfUEs;
            } else if(ecpri.sectionType === 255){
                off -= 2;
                off += ecpri_encodeSection255(ecpri, buf, off);
                return;
            }

            for( let sectIdx = 0; sectIdx < ecpri.numberOfSections; ++sectIdx ) {
                const sect = ecpri.sections[sectIdx];
                ptr = new Uint8Array( buf, off );

                if( ecpri.sectionType === 0 || ecpri.sectionType === 1 || ecpri.sectionType === 3 || ecpri.sectionType === 5 ) {
                    off += 8;
                    ptr[0] = sect.sectionId >> 4;
                    ptr[1] = sect.sectionId << 4 | ( sect.rb & 0x1 ) << 3 | ( sect.symInc & 0x1 ) << 2 | ( sect.startPrb & 0x3FF ) >> 8;
                    ptr[2] = sect.startPrb;
                    ptr[3] = sect.numPrb;
                    ptr[4] = sect.reMask >> 4;
                    ptr[5] = sect.reMask << 4 | ( sect.numSymbol & 0xF );
                    ptr[6] = sect.ef << 7;

                    if( ecpri.sectionType === 1 || ecpri.sectionType === 3 ) {
                        ptr[6] |= ( sect.beamId & 0x7FFF ) >> 8;
                        ptr[7] = sect.beamId;
                        if( ecpri.sectionType === 3 ) {
                            off += 4;
                            const freqOffsetRaw = ToUnsigned_24Bit(sect.freqOffset);
                            ptr[8]  = freqOffsetRaw >> 16;
                            ptr[9]  = freqOffsetRaw >> 8;
                            ptr[10] = freqOffsetRaw;
                        }
                    } else if( ecpri.sectionType === 5 ) {
                        ptr[6] |= ( sect.ueId & 0x7FFF ) >> 8;
                        ptr[7] = sect.ueId;
                    }
                } else if( ecpri.sectionType === 6 ) {
                    off += 8;
                    ptr[0] = sect.ef << 7 | ( sect.ueId & 0x7FFF ) >> 8;
                    ptr[1] = sect.ueId;
                    ptr[2] = sect.regularizationFactor >> 8;
                    ptr[3] = sect.regularizationFactor;
                    ptr[4] = ( sect.rb & 0x1 ) << 3 | ( sect.symInc & 0x1 ) << 2 | ( sect.startPrb & 0x3FF ) >> 8;
                    ptr[5] = sect.startPrb;
                    ptr[6] = sect.numPrb;
                    // TODO: calc off and encode ci I/Q samples
                } else if( ecpri.sectionType === 7 ) {
                    off += 4 * sect.laaMsgLen;
                    ptr[0] = sect.laaMsgType << 4 | ( sect.laaMsgLen & 0xF );
                    ptr[1] = sect.lbtHandle >> 8;
                    ptr[2] = sect.lbtHandle;

                    switch( sect.laaMsgType ) {
                        case 0: // LBT_PDSCH_REQ
                            ptr[3] = sect.lbtOffset >> 2;
                            ptr[4] = sect.lbtOffset << 6 | ( sect.lbtMode & 0x3 ) << 4 | ( sect.lbtDeferFactor & 0x7 );
                            ptr[5] = sect.lbtBckoffCounter >> 2;
                            ptr[6] = sect.lbtBckoffCounter << 6 | ( sect.MCOT & 0xF ) << 2;
                            break;
                        case 1: // LBT_DRS_REQ
                            ptr[3] = sect.lbtOffset >> 2;
                            ptr[4] = sect.lbtOffset << 6 | ( sect.lbtMode & 0x3 ) << 4;
                            break;
                        case 2: // LBT_PDSCH_RSP
                            ptr[3] = sect.lbtPdschRes << 6 | ( sect.inParSF & 0x1 ) << 5 | ( sect.sfStatus & 0x1 ) << 4 | ( sect.sfnSf & 0xFFF ) >> 8;
                            ptr[4] = sect.sfnSf;
                            break;
                        case 3: // LBT_DRS_RSP
                            ptr[3] = sect.lbtDrsRes << 7;
                            break;
                        case 4: // LBT_Buffer_Error
                            ptr[3] = sect.lbtBufErr << 7;
                            break;
                        case 5: // LBT_CWCONFIG_REQ
                            ptr[3] = sect.lbtCWConfig_H;
                            ptr[4] = sect.lbtCWConfig_T;
                            ptr[5] = sect.lbtMode << 6 | ( sect.lbtTrafficClass & 0x7 ) << 3;
                            break;
                        case 6: // LBT_CWCONFIG_RSP
                            ptr[3] = sect.lbtCWR_Rst << 7;
                            break;
                    }
                } else if( ecpri.sectionType === 8 ) {
                    // TODO: ...
                }
                else if( ecpri.sectionType === 240){
                    off += ecpri_encodeSection240(sect,buf,off);
                }
                else {
                    logWarningCnt( --ecpri_logCntUnsupportedSectType, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported sectionType(${ ecpri.sectionType })` );
                }

                if( sect.ef ) {
                    for( let sectExtIdx = 0; sectExtIdx < sect.exts.length; ++sectExtIdx ) {
                        const ext = sect.exts[sectExtIdx];
                        ptr = new Uint8Array( buf, off );
                        off += 4 * ext.extLen;

                        ptr[0] = ext.ef << 7 | ( ext.extType & 0x7F );
                        if( ext.extType === 11 ) {
                            ptr[1] = ext.extLen >> 8;
                            ptr[2] = ext.extLen;
                        } else {
                            ptr[1] = ext.extLen;
                        }

                        switch( ext.extType ) {
                            case 4: // Modulation Compression Parameters Extension Type
                                ptr[2] = ext.csf << 7 | ( ext.modCompScaler & 0x7FFF ) >> 8;
                                ptr[3] = ext.modCompScaler;
                                break;
                            case 6: // Non-contiguous PRB allocation in time and frequency domain
                                ptr[2] = ext.repetition << 7 | ( ext.rbgSize & 0x7 ) << 4 | ( ext.rbgMask & 0xFFFFFFF ) >> 24;
                                ptr[3] = ext.rbgMask >> 16;
                                ptr[4] = ext.rbgMask >> 8;
                                ptr[5] = ext.rbgMask;
                                ptr[6] = IntToU2(ext.priority,2) << 6 | ( ext.symbolMask & 0x3FFF ) >> 8;
                                ptr[7] = ext.symbolMask;
                                break;
                            case 7: // eAxC Mask Section Extension
                                ptr[2] = ext.eAxCmask >> 8;
                                ptr[3] = ext.eAxCmask;
                                break;
                            case 8: // Regularization factor
                                ptr[2] = ext.regularizationFactor >> 8;
                                ptr[3] = ext.regularizationFactor;
                                break;
                            case 9: // Dynamic Spectrum Sharing parameters
                                ptr[2] = ext.technology;
                                break;
                            case 14: // Nulling-layer Info. for ueId-based beamforming
                                ptr[2] = ext.nullLayerInd;
                                break;
                            case 15: // Mixed-numerology Info. for ueId-based beamforming
                                ptr[2] = ext.frameStructure;
                                ptr[3] = ext.freqOffset >> 16;
                                ptr[4] = ext.freqOffset >> 8;
                                ptr[5] = ext.freqOffset;
                                ptr[6] = ext.cpLength >> 8;
                                ptr[7] = ext.cpLength;
                                break;
                            default:
                                logWarningCnt( --ecpri_logCntUnsupportedExtType, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported extType(${ ext.extType })` );
                                break;
                        }
                    }
                }
            }
        }
    } else {
        logWarningCnt( --ecpri_logCntUnsupportedMsg, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pkt.id, `packetDetailsDialog_showPacketWithId( ${ pkt.id } )` ) }: unsupported ecpriMessage(${ ecpri.message })` );
    }
}

function ecpri_analyzeSeqIds() {
    let result = true;
    let seqIdMap = {};
    for( let pktIdx = 0; pktIdx < packetsLength; ++pktIdx ) {
        const pkt = packets[pktIdx];
        if( pkt.ecpri ) {
            const ecpri = pkt.ecpri;
            let antId = ecpri.rtcId;
            const seqId = ecpri.seqId >> 8;
            if( ecpri.message === 0 ) antId += ( 1 << 16 ) * ecpri.dataDir;
            else if( ecpri.message === 2 ) antId += ( 1 << 17 );

            if( !seqIdMap.hasOwnProperty( antId ) ) {
                seqIdMap[antId] = seqId;
            } else {
                const oldSeqId = seqIdMap[antId];
                if( oldSeqId + 1 < seqId ) {
                    console.log( `Missing pkt ${ oldSeqId } ${ seqId }` );
                    result = false;
                }
                seqIdMap[antId] = seqId;
            }

        }
    }
    logInfo( 'eCPRI', 'seq ids' );
    return result;
}

function ecpri_validateMsgType6() {
    let msgType6PacketsReq = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 6) && (pkt.ecpri.resetCodeOp === 1))
    let msgType6PacketsRes = packets.filter(pkt => (pkt.ecpri !== undefined) && (pkt.ecpri.message === 6) && (pkt.ecpri.resetCodeOp === 2))

    if (msgType6PacketsReq.length > msgType6PacketsRes.length) {
        for (let i = 0; i < (msgType6PacketsReq.length - msgType6PacketsRes.length); i++) {
            add_packet_malfunction(msgType6PacketsReq[i].id, '[Msg6][Pkt #' + msgType6PacketsReq[i].id + " response is not existing]", 'ecpri.resetCodeOp')
        }
    } else if (msgType6PacketsReq.length < msgType6PacketsRes.length){
        for (let i = 0; i < (msgType6PacketsRes.length - msgType6PacketsReq.length); i++) {
            add_packet_malfunction(msgType6PacketsRes[i].id, '[Msg6][Pkt #' + msgType6PacketsRes[i].id + " request is not existing]", 'ecpri.resetCodeOp')
        }
    }
}

function ecpri_hacrxDecodeSfnAndSlot() {
    for (let i = 0; i < ecpri_hacRx_varsPerJob.length; i++) {
        ecpri_hacRx_varsPerJob[i].sfn = Math.floor((ecpri_hacRx_varsPerJob[i].taskId >> 16) / ecpri_numSlotsPerFrame[ecpri_maxU]);
        ecpri_hacRx_varsPerJob[i].slot = (ecpri_hacRx_varsPerJob[i].taskId >> 16) % ecpri_numSlotsPerFrame[ecpri_maxU];
        packets[ecpri_hacRx_varsPerJob[i].id].hacrx.sfn = ecpri_hacRx_varsPerJob[i].sfn
        packets[ecpri_hacRx_varsPerJob[i].id].hacrx.slot = ecpri_hacRx_varsPerJob[i].slot
    }
}

function ecpri_dissect_eAxc_values(){

    for( let pktIdx = packetsLengthOld; pktIdx < packetsLength; ++pktIdx ) {
        const ecpri = packets[pktIdx].ecpri;
        if(ecpri){
            ecpri.DU_Port_ID = (ecpri.rtcId >> (config.load.RU_Port_ID+config.load.CC_ID+config.load.BandSector_ID)) & (2**config.load.DU_Port_ID-1);
            ecpri.BandSector_ID = (ecpri.rtcId >> (config.load.RU_Port_ID+config.load.CC_ID)) & (2**config.load.BandSector_ID-1);
            ecpri.CC_ID = (ecpri.rtcId >> (config.load.RU_Port_ID)) & (2**config.load.CC_ID-1);
            ecpri.RU_Port_ID = ecpri.rtcId & (2**config.load.RU_Port_ID-1);
            ecpri.Pol_ID = (ecpri.rtcId >> (config.load.BWP+config.load.AxC+config.load.PRACH)) & (2**config.load.Pol_ID-1); // po = chat
            ecpri.PRACH = (ecpri.rtcId >> (config.load.BWP+config.load.AxC)) & (2**config.load.PRACH-1);
            ecpri.AxC = (ecpri.rtcId >> (config.load.BWP)) & (2**config.load.AxC-1);
            ecpri.BWP = (ecpri.rtcId & (2**config.load.BWP-1)); 
        }
    }
}

function ecpri_deepRxCreateIqStructure() {
    // ant:
    // 0 - H_L1_B1 - 2 symbole
    // 1 - H_L1_B2
    // 2 - H_L1_B3
    // 3 - H_L1_B4
    // 4 - H_L2_B1
    // 5 - H_L2_B2
    // 6 - H_L2_B3
    // 7 - H_L2_B4
    // 8 - R_B1 - 14 symboli
    // 9 - R_B2
    // 10 - R_B3
    // 11 - R_B4
    // 12 - T_L1 - 2 symbole
    // 13 - T_L2

    let u = 1
    let numOfHrawStructs = Hraw_IQ.length / 2 / 12 / 16 / 4 / 2 / 2 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 4 - beams, 2 - layers, 2 - symbols
    let numOfRxDataStructs = RxData_IQ.length / 2 / 12 / 16 / 14 / 4 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 14 - symbols, 4 - beams
    let numOfTxPilotStructs = TxPilot_IQ.length / 2 / 12 / 16 / 2 / 2 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 2 - layers, 2 - symbols
    ecpri_maxFinalSubframe = Math.max(numOfHrawStructs,numOfRxDataStructs,numOfTxPilotStructs) / NUM_OF_SLOTS_PER_U[u];

    // create IQ structures
    for (let ant = 0; ant < 14; ant++) {
        iqOffsets[u][ant] = new Array( ecpri_maxFinalSubframe );
        iqNumPrb[u][ant] = new Array( ecpri_maxFinalSubframe );
        iqStartPrb[u][ant] = new Array( ecpri_maxFinalSubframe );
        iqFirstSubframe[u][ant] = 0;
        for (let subframe = 0; subframe < ecpri_maxFinalSubframe; subframe++) {
            iqOffsets[u][ant][subframe] = new Uint32Array( NUM_OF_SYM_IN_SF_PER_U[u] );
            iqNumPrb[u][ant][subframe] = new Uint16Array( NUM_OF_SYM_IN_SF_PER_U[u] );
            iqStartPrb[u][ant][subframe] = new Uint16Array( NUM_OF_SYM_IN_SF_PER_U[u] ).fill( 0 );
            for (let sym = 0; sym < NUM_OF_SYM_IN_SF_PER_U[u]; sym++) {
                if (8 <= ant && ant < 12) { // R_B1 - R_B4
                    iqNumPrb[u][ant][subframe][sym] = 16;
                } else { // H_L1_B1 - H_L2_B4, T_L1, T_L2
                    if (sym === 2 || sym === 11 || sym === 16 || sym === 25) { // Hraw and TxPilot symbols DMRS configuration
                        iqNumPrb[u][ant][subframe][sym] = 16;
                    }
                }
            }
        }
    }
}

function ecpri_deepRxFillIqBuffer() {
    let u = 1
    // Hraw
    let numOfHrawStructs = Hraw_IQ.length / 2 / 12 / 16 / 4 / 2 / 2 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 4 - beams, 2 - layers, 2 - symbols
    let numOfHrawSamplesPerStruct = 2 * 12 * 16 * numOfHrawSymbolsPerStruct; // 768 = 2 - complex val (I,Q), 12 - SC, 16 - PRB, 2 - symbols
    let numOfHrawSamplesPerStructPerSymbol = numOfHrawSamplesPerStruct / numOfHrawSymbolsPerStruct; // 384
    for (let ant = 0; ant < numOfHrawAnts; ant++) {
        let bufferLocalOff = 0;
        let hrawLocalOff = ant * numOfHrawSamplesPerStructPerSymbol;
        for (let i = 0; i < (numOfHrawStructs * numOfHrawSymbolsPerStruct); i++) {
            for (let j = 0; j < numOfHrawSamplesPerStructPerSymbol; j++) {
                iqBuffers[u][ant][j+bufferLocalOff] = Hraw_IQ[j+hrawLocalOff]
            }
            bufferLocalOff += numOfHrawSamplesPerStructPerSymbol;
            hrawLocalOff += numOfHrawSamplesPerStructPerSymbol * numOfHrawAnts;
        }
    }
    // RxData
    let numOfRxDataStructs = RxData_IQ.length / 2 / 12 / 16 / 14 / 4 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 14 - symbols, 4 - beams
    let numOfRxDataSamplesPerStruct = 2 * 12 * 16 * numOfRxDataSymbolsPerStruct; // 5376 = 2 - complex val (I,Q), 12 - SC, 16 - PRB, 14 - symbols
    let numOfRxDataSamplesPerStructPerSymbol = numOfRxDataSamplesPerStruct / numOfRxDataSymbolsPerStruct; // 384
    for (let ant = 8; ant < (8 + numOfRxDataAnts); ant++) {
        let bufferLocalOff = 0;
        let rxdataLocalOff = ant * numOfRxDataSamplesPerStructPerSymbol;
        for (let i = 0; i < (numOfRxDataStructs * numOfRxDataSymbolsPerStruct); i++) {
            for (let j = 0; j < numOfRxDataSamplesPerStructPerSymbol; j++) {
                iqBuffers[u][ant][j+bufferLocalOff] = RxData_IQ[j+rxdataLocalOff]
            }
            bufferLocalOff += numOfRxDataSamplesPerStructPerSymbol;
            rxdataLocalOff += numOfRxDataSamplesPerStructPerSymbol * numOfRxDataAnts;
        }
    }
    // TxPilot
    let numOfTxPilotStructs = TxPilot_IQ.length / 2 / 12 / 16 / 2 / 2 // 2 - complex val (I,Q), 12 - SC, 16 - PRB, 2 - layers, 2 - symbols
    let numOfTxPilotSamplesPerStruct = 2 * 12 * 16 * numOfTxPilotSymbolsPerStruct; // 768 = 2 - complex val (I,Q), 12 - SC, 16 - PRB, 2 - symbols
    let numOfTxPilotSamplesPerStructPerSymbol = numOfTxPilotSamplesPerStruct / numOfTxPilotSymbolsPerStruct; // 384
    for (let ant = 12; ant < (12 + numOfTxPilotAnts); ant++) {
        let bufferLocalOff = 0;
        let txpilotLocalOff = ant * numOfTxPilotSamplesPerStructPerSymbol;
        for (let i = 0; i < (numOfTxPilotStructs * numOfTxPilotSymbolsPerStruct); i++) {
            for (let j = 0; j < numOfTxPilotSamplesPerStructPerSymbol; j++) {
                iqBuffers[u][ant][j+bufferLocalOff] = TxPilot_IQ[j+txpilotLocalOff]
            }
            bufferLocalOff += numOfTxPilotSamplesPerStructPerSymbol;
            txpilotLocalOff += numOfTxPilotSamplesPerStructPerSymbol * numOfTxPilotAnts;
        }
    }
}