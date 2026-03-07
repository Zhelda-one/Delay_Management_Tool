// ptr already consumed extType and extLen and data starts at offset: 2 (3 for extType: 11)

function ecpri_decodeExtType1( pktId, sect, ext, ptr ) {
    ext.bfwCompHdr = ptr[2];
    let bfwIqWidth = ext.bfwCompHdr_bfwIqWidth = ptr[2] >> 4;
    if( ext.bfwCompHdr_bfwIqWidth === 0 ) bfwIqWidth = ext.bfwCompHdr_bfwIqWidth = 16;
    let bfwCompMeth = ext.bfwCompHdr_bfwCompMeth = ptr[2] & 0xF;

    let K;
    let bfwIqDataOffset = 3;
    switch( bfwCompMeth ) {
        case 0:
            K = Math.floor( ( ext.extLen * 4 - 3 ) * 8 / bfwIqWidth / 2 );
            break;
        case 1:
            ext.exponent = ptr[3] & 0xF;
            K = Math.floor( ( ext.extLen * 4 - 4 ) * 8 / bfwIqWidth / 2 );
            ++bfwIqDataOffset;
            break;
        case 2:
            ext.blockScaler = ptr[3];
            K = Math.floor( ( ext.extLen * 4 - 4 ) * 8 / bfwIqWidth / 2 );
            ++bfwIqDataOffset;
            break;
    }

    ext.bfwIQ = new Array( K * 2 );

    let signDiff = 1 << bfwIqWidth;
    let signMask = signDiff >> 1;
    let maxValue = signMask;
    if( bfwCompMeth === 1 ) maxValue = 1 << ( bfwIqWidth - 1 + 15 );

    let exponentialShift = bfwCompMeth === 1 ? ext.exponent : 0;
    let freeBits = 8;
    switch( bfwCompMeth ) {
        case 0:
        case 1:
            let beamPattern = [];
            for( let i = 0; i < K * 2; ++i ) {
                let sample = 0;
                let neededBits = bfwIqWidth;
                while( freeBits <= neededBits ) {
                    neededBits -= freeBits;
                    sample |= ( ptr[bfwIqDataOffset++] & bitMask[freeBits] ) << neededBits;
                    freeBits = 8;
                }
                if( neededBits ) {
                    freeBits -= neededBits;
                    sample |= ptr[bfwIqDataOffset] >> freeBits;
                }
                if( sample & signMask ) sample -= signDiff;
                ext.bfwIQ[i] = ( sample << exponentialShift ) / maxValue;
                if(i%2 === 1) beamPattern.push({re:ext.bfwIQ[i]-1,im:ext.bfwIQ[i]});
            }
            if(!beamPatterns[pktId]) beamPatterns[pktId] = [];
            beamPatterns[pktId].push(beamPattern);
            break;
        default:
            logErrorCnt( --ecpri_logCntUnsupportedBfwCompMeth, 'eCPRI', `Packet ${ makeLikeHrefOnClick( pktId, `packetDetailsDialog_showPacketWithId( ${ pktId } )` ) }: unsupported bfwCompMeth(${ bfwCompMeth })` );
            break;
    }
}

function ecpri_decodeExtType2( pktId, sect, ext, ptr ) {
    ext.bfaCompHdr = ptr[2] << 8 | ptr[3];
    ext.bfaCompHdr_bfAzPtWidth = ( ptr[2] >> 3 ) & 0x7;
    ext.bfaCompHdr_bfZePtWidth = ptr[2] & 0x7;
    ext.bfaCompHdr_bfAz3ddWidth = ( ptr[3] >> 3 ) & 0x7;
    ext.bfaCompHdr_bfZe3ddWidth = ptr[3] & 0x7;

    let bitWidths = [];
    if( ext.bfaCompHdr_bfAzPtWidth ) bitWidths.push( ++ext.bfaCompHdr_bfAzPtWidth );
    if( ext.bfaCompHdr_bfZePtWidth ) bitWidths.push( ++ext.bfaCompHdr_bfZePtWidth );
    if( ext.bfaCompHdr_bfAz3ddWidth ) bitWidths.push( ++ext.bfaCompHdr_bfAz3ddWidth );
    if( ext.bfaCompHdr_bfZe3ddWidth ) bitWidths.push( ++ext.bfaCompHdr_bfZe3ddWidth );

    let extOff = 4;
    let sizeBytes = Math.ceil( ( ext.bfaCompHdr_bfAzPtWidth + ext.bfaCompHdr_bfZePtWidth + ext.bfaCompHdr_bfAz3ddWidth + ext.bfaCompHdr_bfZe3ddWidth ) / 8.0 );
    let totalBits = sizeBytes * 8;
    let payload = 0;
    while( --sizeBytes >= 0 ) { payload = payload << 8 | ptr[extOff++] }

    let values = new Array( bitWidths.length );
    for( let i = 0; i < bitWidths.length; ++i ) {
        totalBits -= bitWidths[i];
        values[i] = ( payload >> totalBits ) & bitMask[bitWidths[i]];
    }
    let i = 0;
    if( ext.bfaCompHdr_bfAzPtWidth ) ext.bfAzPt = values[i++];
    if( ext.bfaCompHdr_bfZePtWidth ) ext.bfZePt = values[i++];
    if( ext.bfaCompHdr_bfAz3ddWidth ) ext.bfAz3dd = values[i++];
    if( ext.bfaCompHdr_bfZe3ddWidth ) ext.bfZe3dd = values[i++];

    ext.bfAzSl = ( ptr[extOff] >> 3 ) & 0x7;
    ext.bfZeSl = ptr[extOff] & 0x7;
}

function ecpri_decodeExtType3( pktId, sect, ext, ptr ) {
    ext.codebookIndex = ptr[2];
    ext.layerId = ptr[3] >> 4;
    ext.numLayers = ptr[3] & 0xF;
    if( ext.extLen > 1 ) {
        ext.txScheme = ptr[4] >> 4;
        ext.crsReMask = ( ptr[4] & 0xF ) << 8 | ptr[5];
        ext.crsShift = ptr[6] >> 7;
        ext.crsSymNum = ptr[6] & 0xF;
        ext.beamIdAP1 = ptr[10] << 8 | ptr[11];
        if( ext.extLen > 3 ) {
            ext.beamIdAP2 = ptr[12] << 8 | ptr[13];
            ext.beamIdAP3 = ptr[14] << 8 | ptr[15];
        }
    }
}
function ecpri_decodeExtType4( pktId, sect, ext, ptr ){
    ext.csf = ptr[2] >> 7;
    const modCompScaler = ( ptr[2] & 0x7F ) << 8 | ptr[3];
    ext.modCompScaler = ( ( modCompScaler & 0xFFF ) * ( 2 ** -11 ) ) * ( 2 ** -( modCompScaler >> 12 ) );
}

function ecpri_decodeExtType5( pktId, sect, ext, ptr ){
    const numOfScalerBlocks = Math.floor( ( ext.extLen * 4 - 2 ) * 8 / 28 );
    ext.mcScaleReMask = new Array( numOfScalerBlocks );
    ext.csf = new Array( numOfScalerBlocks );
    ext.mcScaleOffset = new Array( numOfScalerBlocks );
    let extOff = 2;
    for( let i = 0; i < numOfScalerBlocks; ++i ) {
        let mcScaleOffset;
        if( i % 2 === 0 ) {
            ext.mcScaleReMask[i] = ptr[extOff++] << 4 | ptr[extOff] >> 4;
            ext.csf[i] = ( ptr[extOff] >> 3 ) & 0x1;
            mcScaleOffset = ( ptr[extOff++] & 0x7 ) << 12 | ptr[extOff++] | ptr[extOff] >> 4;
        } else {
            ext.mcScaleReMask[i] = ( ptr[extOff++] & 0xF ) << 8 | ptr[extOff++];
            ext.csf[i] = ptr[extOff] >> 7;
            mcScaleOffset = ( ptr[extOff++] & 0x7F ) << 8 | ptr[extOff++];
        }
        ext.mcScaleOffset[i] = ( ( mcScaleOffset & 0xFFF ) * ( 2 ** -11 ) ) * ( 2 ** -( mcScaleOffset >> 12 ) );
    }
}

function ecpri_decodeExtType6( pktId, sect, ext, ptr ){
    ext.repetition = ptr[2] >> 7;
    ext.rbgSize = ( ptr[2] >> 4 ) & 0x7;
    ext.rbgMask = ( ptr[2] & 0xF ) << 24 | ptr[3] << 16 | ptr[4] << 8 | ptr[5];
    ext.priority = U2ToInt(ptr[6]>>6, 2);
    ext.symbolMask = ( ptr[6] & 0x3F ) << 8 | ptr[7];
}
function ecpri_decodeExtType7( pktId, sect, ext, ptr ){
    ext.eAxCmask = ptr[2] << 8 | ptr[3];
}
function ecpri_decodeExtType8( pktId, sect, ext, ptr ){
    ext.regularizationFactor = ptr[2] << 8 | ptr[3];
}
function ecpri_decodeExtType9( pktId, sect, ext, ptr ){
    ext.technology = ptr[2];
}
function ecpri_decodeExtType11( pktId, sect, ext, ptr ) {
    ext.disableBFWs = ptr[3] >> 7;
    ext.RAD = (ptr[3] >> 6) & 0x01;
    ext.bundleOffset = ptr[3] & 0x3F;
    ext.numBundPrb = ptr[4];
    const maxOffset = ext.extLen*4;

    let bfwBundleDataOffset = 5;
    if(ext.disableBFWs === 0){
        ext.bfwCompHdr = ptr[5];
        ext.bfwIqWidth = (ext.bfwCompHdr >> 4) & 0x0F;
        ext.bfwCompMeth = ext.bfwCompHdr & 0x0F;
        ++bfwBundleDataOffset;
    }

    const numPrbs = sect.numPrb === 0 ? config.load.nprb - sect.startPrb : sect.numPrb;
    const numWeights = config.load.advanced.ext11bundleWeights;

    const prbsPerBundle = GetAllocationsPerBundle(sect.startPrb, numPrbs, ext.numBundPrb);
    const weightsPerPrb = numWeights / ext.numBundPrb;

    ext.bundles = [];
    for(let bundleId = 0; bundleId < prbsPerBundle.length; ++bundleId){
        const bundle = {};
        if(ext.disableBFWs === 0){
            if((bfwBundleDataOffset + 1) > maxOffset) break;

            switch(ext.bfwCompMeth){
                case 0: // No compression
                    break;
                case 1: // Block floaitng point
                case 2: // Block scaling
                case 3: // u-law
                    bundle.bfwCompParam = ptr[bfwBundleDataOffset++];
                    break;
                case 4: // Beamspace
                    logError("eCPRI", `SectExt11, Beamspace compression (${ext.bfwCompMeth}) unsupported`);
                    break;
            }
        }

        if((bfwBundleDataOffset + 2) > maxOffset) break;
        // bundle.reserved = (ptr[bfwBundleDataOffset] >> 7) & 0x01;
        bundle.beamId = (ptr[bfwBundleDataOffset] & 0x7F) << 8 | ptr[bfwBundleDataOffset+1];
        bfwBundleDataOffset+=2;

        if(ext.disableBFWs === 0){
            //Read Weights
            const iqBitWidth = ext.bfwIqWidth === 0 ? 16 : ext.bfwIqWidth;

            const prbsInBundle = prbsPerBundle[bundleId][1] - prbsPerBundle[bundleId][0];
            let pattern = [];

            const TRXs = [];
            let startOffset = 0;
            for(let trxId = 0; trxId < (weightsPerPrb * prbsInBundle); ++trxId) {
                let sampleSizeBits = 2*iqBitWidth;
                if(ext.bfwCompMeth === IQ_COMPRESSION_METHODS.MADE1_RADIO) sampleSizeBits += 4;
                if( (bfwBundleDataOffset*8 + sampleSizeBits) > maxOffset*8) break;

                let exponent = 0;
                let I = 0, Q = 0
                if(ext.bfwCompMeth === IQ_COMPRESSION_METHODS.MADE1_RADIO) { //Nokia custom messages
                    // Order is swapped, first is exponent, then Q, then I
                    exponent = getNumberFromByteArray(ptr, bfwBundleDataOffset, startOffset, 4);
                    if(exponent > 10)
                        logError('eCPRI', `Section extension 11 exponent in packet ${pktId} is higher than 10. Try changing 'extType11: Weights per bundle' value in Load options`);
                    startOffset += 4;

                    Q = getNumberFromByteArray(ptr, bfwBundleDataOffset, startOffset, iqBitWidth);
                    startOffset += iqBitWidth;
                    I = getNumberFromByteArray(ptr, bfwBundleDataOffset, startOffset, iqBitWidth);
                    startOffset += iqBitWidth;
                } else{
                    I = getNumberFromByteArray(ptr, bfwBundleDataOffset, startOffset, iqBitWidth);
                    startOffset += iqBitWidth;
                    Q = getNumberFromByteArray(ptr, bfwBundleDataOffset, startOffset, iqBitWidth);
                    startOffset += iqBitWidth;
                }

                if(ext.bfwCompMeth === 0){
                    I = roundTo(U2ToInt(I, iqBitWidth) / 2**(iqBitWidth-1),6);
                    Q = roundTo(U2ToInt(Q, iqBitWidth) / 2**(iqBitWidth-1),6);
                }
                else if(ext.bfwCompMeth === IQ_COMPRESSION_METHODS.MADE1_RADIO) { //Nokia custom messages
                    I = U2ToInt(I, iqBitWidth) / 2**4;
                    Q = U2ToInt(Q, iqBitWidth) / 2**4;

                    if((I < -2 || I > 1.9375) || (Q < -2 || Q > 1.9375))
                        logError('eCPRI', `Section extension 11 mantissa in packet ${pktId} is not in range [-2, 1.9375]. Try changing 'extType11: Weights per bundle' value in Load options`);

                    I = I * 2**(exponent-10);
                    Q = Q * 2**(exponent-10);
                }

                TRXs.push(`(${I}, ${Q})`);
                pattern.push({re:I,im:Q});
            }
            bundle.TRXs = TRXs.join(',');
            bfwBundleDataOffset += Math.ceil(startOffset/8);
            if(!beamPatterns[pktId]) beamPatterns[pktId] = [];
            beamPatterns[pktId].push(pattern);
        }
        ext.bundles.push(bundle);
    }
}
function ecpri_decodeExtType12( pktId, sect, ext, ptr ){
    ext.priority = U2ToInt(ptr[2]>>6, 2);
    ext.symbolMask = ( ptr[2] & 0x3F ) << 8 | ptr[3];
    const len = ( ext.extLen - 1 ) * 2;
    ext.offStartPrb = new Array( len );
    ext.numPrb = new Array( len );
    for( let i = 0; i < len; ++i ) {
        ext.offStartPrb[i] = ptr[4 + i * 2];
        ext.numPrb[i] = ptr[5 + i * 2];
    }
}
function ecpri_decodeExtType14( pktId, sect, ext, ptr ){
    ext.nullLayerInd = ptr[2];
}
function ecpri_decodeExtType15( pktId, sect, ext, ptr ){
    ext.frameStructure = ptr[2];
    ext.freqOffset = ptr[3] << 16 | ptr[4] << 8 | ptr[5];
    ext.cpLength = ptr[6] << 8 | ptr[7];
}
function ecpri_decodeExtType18( pktId, sect, ext, ptr ){
    ext.ueId = ptr[2] << 8 | ptr[3];
    ext.layerIndex = ptr[4] >> 4;
    ext.numLayers = ptr[4] & 0xF;
    ext.nscid = ptr[5] >> 7;
    ext.ptrsEn = ( ptr[5] >> 6 ) & 0x1;
    ext.dmrsCdmGroup = ( ptr[5] >> 4 ) & 0x3;
    ext.dmrsPortMask = ( ptr[5] & 0xF ) << 8 | ptr[6];
    ext.combineConfigId = ptr[7];
    ext.scramblingId = ptr[8] << 8 | ptr[9];
    ext.codebookSubset = ( ptr[10] >> 5 ) & 0x3;
    ext.codebookIndex = ptr[10] & 0x1F;
    if( ext.ptrsEn ) {
        ext.ptrsPortMask = ptr[11] << 4 | ptr[12] >> 4;
        ext.ptrsL = ( ptr[12] >> 2 ) & 0x3;
    }
    let ltCfoMode = 0;
    // TODO: add possibility to config ltCfoMode from UI
    let numOfCAPbeamId = 0, numOfLtCfoValue = 0;
    if( ltCfoMode === 0 ) {
        numOfCAPbeamId = Math.floor( ( ext.extLen * 4 - ( ext.ptrsEn ? 13 : 11 ) ) / 2 );
        numOfLtCfoValue = 0;
    } else if( ltCfoMode === 1 ) {
        numOfCAPbeamId = Math.floor( ( ext.extLen * 4 - ( ext.ptrsEn ? 15 : 13 ) ) / 2 );
        numOfLtCfoValue = 1;
    } else {
        numOfCAPbeamId = numOfLtCfoValue = Math.floor( ( ext.extLen * 4 - ( ext.ptrsEn ? 13 : 11 ) ) / 4 );
    }
    ext.CAPbeamId = new Array( numOfCAPbeamId );
    if( numOfLtCfoValue ) ext.ltCfoValue = new Array( numOfLtCfoValue );

    let extOff = 13;
    for( let i = 0; i < numOfCAPbeamId; ++i ) {
        ext.CAPbeamId[i] = ( ptr[extOff++] & 0x7F ) << 8 | ptr[extOff++];
        if( i < numOfLtCfoValue ) ext.ltCfoValue[i] = ptr[extOff++] << 8 | ptr[extOff++];
    }
}
function ecpri_decodeExtType19( pktId, sect, ext, ptr ){
    ext.ueId = ptr[2] << 8 | ptr[3];
    ext.numSrsPorts = ( ptr[4] >> 4 ) & 0x3;
    ext.cyclicShift = ptr[4] & 0xF;
    ext.combOffset = ( ptr[5] >> 2 ) & 0x7;
    ext.transmissionComb = ptr[5] & 0x3;
    ext.srsPurpose = ptr[6] >> 4;
    ext.codebookSubset = ( ptr[6] >> 2 ) & 0x3;
    ext.groupSeqHopping = ptr[6] & 0x3;
    ext.sequenceId = ptr[7] << 8 | ptr[8];
    ext.puschPowerOffset = ptr[9] << 8 | ptr[10];
    ext.numSrsBeams = ptr[11];
    ext.srsBeamId = new Array( ext.numSrsBeams );
    for( let i = 0; i < ext.numSrsBeams; ++i ) {
        ext.srsBeamId[i] = ( ptr[12 + 2 * i] & 0x7F ) << 8 | ptr[13 + 2 * i];
    }
}