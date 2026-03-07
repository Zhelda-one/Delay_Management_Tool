const PCAP_RECORD_HEADER_LEN = 16;  // does not apply to pcapNG
const PCAP_HEADER_LEN = 24; // does not apply to pcapNG

let pcap_isLittleEndian = true;
let pcap_logCntTruncatedPkts = 10;
const pcap_macAddMap = {};

function packet_preload( buff, pktOff ) {
    let ptr = new Uint8Array( buff, pktOff );
    let off = 14;
    let ethertype = ptr[12] << 8 | ptr[13];
    while( ethertype === 0x8100 || ethertype === 0x88A8 ) {
        ethertype = ptr[off + 2] << 8 | ptr[off + 3];
        off += 4;
    }
    if( ethertype === 0xAEFE ) ecpri_discoverPayload( buff, pktOff + off );
    switch( ethertype ) {
        case 0xAEFE: break;
        case 0x8951: break;
        case 0xFC3D: break;
        case 0x88F7: break;
    }
}

function pcap_preload( buf ) {
    let ptr = new Uint8Array( buf );

    pcap_isLittleEndian = true;
    const magicNumber = pcap_getU32( ptr, 0 );
    switch( magicNumber ) {
        case 0xA1B2C3D4: pcap_isLittleEndian = true; break;
        case 0xA1B23C4D: pcap_isLittleEndian = true; break;
        case 0xD4C3B2A1: pcap_isLittleEndian = false; break;
        case 0x4D3CB2A1: pcap_isLittleEndian = false; break;
        default: return false;
    }
    
    const bufferLength = buf.byteLength;

    ecpri_discoveryStart();

    let pktOff = 24;
    while( ( pktOff + 16 ) < bufferLength ) {
        ptr = new Uint8Array( buf, pktOff );
        pktOff += 16;
        const captPktLen = pcap_getU32( ptr, 8 );
        const origPktLen = pcap_getU32( ptr, 12 );
        if( ( pktOff + captPktLen ) > bufferLength ) break;
        if( captPktLen === origPktLen ) packet_preload( buf, pktOff );
        pktOff += captPktLen;
    }

    ecpri_discoveryFinish();

    return true;
}

function pcap_decode( bufferReader ) {
    const perfNow = performance.now();

    bufferReader.setByteOrder(C_BYTE_ORDER.LITTLE_ENDIAN);

    pcap_logCntTruncatedPkts = 10;
    pcap_isLittleEndian = true;
    pmFileRegistersPerPacket = [];
    let isNsTimestamp = false;
    const magicNumber = bufferReader.getU32();
    switch( magicNumber ) {
        case 0xA1B2C3D4: pcap_isLittleEndian = true; isNsTimestamp = false; break;
        case 0xA1B23C4D: pcap_isLittleEndian = true; isNsTimestamp = true; break;
        case 0xD4C3B2A1: pcap_isLittleEndian = false; isNsTimestamp = false; break;
        case 0x4D3CB2A1: pcap_isLittleEndian = false; isNsTimestamp = true; break;
        default:
            logError( 'PCAP', `Wrong magic number: 0x${ magicNumber.toString( 16 ) }` );
            return false;
    }

    bufferReader.setByteOrder(pcap_isLittleEndian);

    let filterFunc = null;
    if( config.load.pcapFilter ) {
        const finalFilter = config.load.pcapFilter.replaceAll( '@', 'p.' );
        try {
            filterFunc = Function( 'p', `if( ${ finalFilter } ) { return true; } return false;` );
        } catch( e ) {
            logError( 'PCAP', `Wrong PCAP filter '${ finalFilter }'` );
            return false;
        }
    }

    ecpri_prePcapDecode();
    l2l1_prePcapDecode();

    const usec_scale = isNsTimestamp ? 0.000000001 : 0.000001;
    const timeFixedDigits = isNsTimestamp ? 9 : 6;
    const firstPktIdx = config.load.loadLimitFrom ? ( config.load.loadLimitFrom ) : 0;
    const lastPktIdx = config.load.loadLimit ? ( packetsLength + config.load.loadLimit ) : 0xFFFFFFFF;

    const fileLength = bufferReader.dataView.byteLength;

    let pktIdx = packetsLength;
    let pktCount = 0;
    bufferReader.offset += 20; // skip Version, Reserved, FCS, LinkType

    for (let i = 0; i < firstPktIdx; i++) {
        const packetView = bufferReader.createView(12);
        packetView.offset += 8;
        const captPktLen = packetView.getU32();

        if( (bufferReader.offset + PCAP_RECORD_HEADER_LEN + captPktLen) > fileLength) {
            logError( 'PCAP', `File corrupted: pktStart(${ bufferReader.offset + + PCAP_RECORD_HEADER_LEN }) + pktLength(${ captPktLen }) = ${ bufferReader.offset + PCAP_RECORD_HEADER_LEN + captPktLen } > fileLength(${ fileLength })` );
            break;
        }
        bufferReader.offset += PCAP_RECORD_HEADER_LEN + captPktLen;
    }

    while( ( bufferReader.offset + PCAP_RECORD_HEADER_LEN ) < fileLength ) {
        const timeSec = bufferReader.getI32();
        const timeNsec = bufferReader.getI32();
        const captPktLen = bufferReader.getU32();
        const origPktLen = bufferReader.getU32();

        const pktEnd = bufferReader.offset + captPktLen;
        if( pktEnd > fileLength ) {
            logError( 'PCAP', `File corrupted: pktStart(${ bufferReader.offset }) + pktLength(${ captPktLen }) = ${ pktEnd } > fileLength(${ fileLength })` );
            break;
        }

        let pkt = {
            'id': pktIdx,
            'time': new Time(timeSec, timeNsec * 10 ** (9 - timeFixedDigits)),
            'length': Math.min(captPktLen, origPktLen)
        };
        if( captPktLen !== origPktLen ) {
            pkt["origLength/captPktLen"] = origPktLen+'/'+captPktLen;
            add_packet_malfunction(pktIdx, '[ValidateError][Pkt #' + pktIdx + " original length of the packet is not equal to captured packet length", 'origLength/captPktLen')
            logWarningCnt( --pcap_logCntTruncatedPkts, 'PCAP', `Packet ${ makeLikeHrefOnClick( pktIdx, `packetDetailsDialog_showPacketWithId( ${ pktIdx } )` ) }: truncated captPktLen(${ captPktLen }) !== origPktLen(${ origPktLen })` );
        }

        ethernetV2_decode( pkt, bufferReader.createView(captPktLen) );
        ++pktCount;

        if( filterFunc === null || filterFunc( pkt ) ) {
            packets_push(pkt, bufferReader.getGlobalOffset(), pkt.length);
            if( ++pktIdx >= lastPktIdx ) break;
        }

        bufferReader.offset += captPktLen;
    }

    fillPacketsPayloadBuffer(bufferReader.buffer);

    fragmentation_postPcapDecode();
    l2l1_decode();
    ecpri_postPcapDecode();

    const loadedPackets = packetsLength - packetsLengthOld;
    logInfo( 'PCAP', `Decoded ${ loadedPackets }/${ pktCount }(${ calcPercentFixed2( loadedPackets, pktCount ) }) packets. Took ${ perfToMsFrom( perfNow ) }` );

    return true;
}

function pcapng_preload( buffer ) {
    let ptr = new Uint8Array( buffer );
    if( pcap_getU32( ptr, 0 ) !== 0x0A0D0D0A ) return false;

    ecpri_discoveryStart();

    const buffLen = buffer.byteLength;
    let off = 0;
    let intLinkTypes = [];
    while( ( off + 12 ) < buffLen ) {
        ptr = new Uint8Array( buffer, off );

        const blockType = pcap_getU32( ptr, 0 );
        let blockLen = pcap_getU32( ptr, 4 );

        if( blockType === 0x0A0D0D0A ) { // Section Header Block
            pcap_isLittleEndian = true;
            const byteOrderMagic = pcap_getU32( ptr, 8 );
            switch( byteOrderMagic ) {
                case 0x1A2B3C4D: break; // pcap_isLittleEndian = true;
                case 0x4D3C2B1A: pcap_isLittleEndian = false; break;
                default:
                    logError( 'PCAPNG', `Unknown byteOrderMagic: 0x${ byteOrderMagic.toString( 16 ) }. Offset: ${ off }` );
                    return false;
            }
            blockLen = pcap_getU32( ptr, 4 );
            intLinkTypes = [];
            off += blockLen;
            continue;
        }

        if( ( off + blockLen ) > buffLen ) break;

        switch( blockType ) {
            case 0x00000001: // Interface Description Block
                intLinkTypes.push( pcap_getU16( ptr, 8 ) );
                break;
            case 0x00000003: // Simple Packet Block
            case 0x00000006: // Enhanced Packet Block
                const isEnh = blockType === 0x00000006;
                const intId = isEnh ? pcap_getU32( ptr, 8 ) : 0;
                const captPktLen = isEnh ? pcap_getU32( ptr, 20 ) : ( blockLen - 16 );
                const origPktLen = pcap_getU32( ptr, isEnh ? 24 : 8 );
                if( intLinkTypes.length <= intId ) {
                    logError( 'PCAPNG', `Interface ${ intId } not defined` );
                    return false;
                }
                if( intLinkTypes[intId] === 1 && captPktLen === origPktLen ) packet_preload( buffer, off + ( isEnh ? 28 : 12 ) );
                break;
            default:
                break;
        }

        off += blockLen;
    }

    ecpri_discoveryFinish();

    return true;
}

function pcapng_decode( bufferReader ) {
    const perfNow = performance.now();

    pcap_logCntTruncatedPkts = 10;

    const magicNumber = bufferReader.createView().getU32();
    if( magicNumber !== 0x0A0D0D0A ) {
        logError( 'PCAPNG', `Wrong magic number: 0x${ magicNumber.toString( 16 ) }` );
        return false;
    }

    let filterFunc = null;
    if( config.load.pcapFilter ) {
        const finalFilter = config.load.pcapFilter.replaceAll( '@', 'p.' );
        try {
            filterFunc = Function( 'p', `if( ${ finalFilter } ) { return true; } return false;` );
        } catch( e ) {
            logError( 'PCAPNG', `Wrong PCAP filter '${ finalFilter }'` );
            return false;
        }
    }

    ecpri_prePcapDecode();
    l2l1_prePcapDecode();

    const bufferLen = bufferReader.dataView.byteLength;
    const lastPktIdx = config.load.loadLimit ? ( packetsLength + config.load.loadLimit ) : 0xFFFFFFFF;
    const firstLocalPktIdx = config.load.loadLimitFrom;
    const lastLocalPktIdx = config.load.loadLimit ? ( config.load.loadLimitFrom + config.load.loadLimit ) : 0xFFFFFFFF;

    let intLinkTypes = [];
    let intTsResol = [];

    let pktIdx = packetsLength;
    let localPktIdx = 0;
    let pktCount = 0;

    while( bufferReader.hasCapacity(12) ){
        const packetView = bufferReader.createView();

        const blockType = packetView.getU32();
        let blockLen = packetView.getU32();

        if( blockType === 0x0A0D0D0A ) { // Section Header Block
            packetView.setByteOrder(C_BYTE_ORDER.LITTLE_ENDIAN);
            const byteOrderMagic = packetView.getU32();
            switch( byteOrderMagic ) {
                case 0x1A2B3C4D: packetView.setByteOrder(C_BYTE_ORDER.LITTLE_ENDIAN); break;
                case 0x4D3C2B1A: packetView.setByteOrder(C_BYTE_ORDER.BIG_ENDIAN); break;
                default:
                    logError( 'PCAPNG', `Unknown byteOrderMagic: 0x${ byteOrderMagic.toString( 16 ) }. Offset: ${ packetView.dataView.byteOffset }` );
                    return false;
            }
            bufferReader.setByteOrder(packetView.isLittleEndian);

            packetView.offset -= 8;
            const blockLen = packetView.getU32();

            intLinkTypes = [];
            intTsResol = [];
            bufferReader.offset += blockLen;
            continue;
        }

        if( packetView.dataView.byteOffset+blockLen>bufferLen ) {
            logError( 'PCAPNG', `File corrupted: blockOffset(${  packetView.dataView.byteOffset }) + blockLen(${ blockLen }) = ${ (  packetView.dataView.byteOffset + blockLen ) } > bufferLen(${ bufferLen })` );
            break;
        }

        if( blockType === 0x00000001 ) { // Interface Description Block
            intLinkTypes.push( packetView.getU16() );
            let if_tsresol = 10 ** 6;
            let optOff = 16;
            const optEnd = blockLen - 4;

            packetView.offset += 6;
            while( optOff < optEnd ) {
                const optCode = packetView.getU16();
                let optLen = packetView.getU16();
                if( optLen % 4 !== 0 ) optLen += 4 - ( optLen % 4 );

                if( optCode === 0 ) { // opt_endofopt
                    break;
                } else if( optCode === 9 ) { // if_tsresol
                    const opt = packetView.createView().getU8();
                    if_tsresol = BigInt( ( opt & 0x80 ? 2 : 10 ) ** ( opt & 0x7F ) );
                }
                packetView.offset += optLen;
            }
            intTsResol.push( if_tsresol );
        } else if( blockType === 0x00000003 || blockType === 0x00000006 ) { // Simple/Enhanced Packet Block
            let intId, ts, captPktLen, origPktLen;
            if( blockType === 0x00000003 ) {
                intId = 0;
                ts = 0;
                captPktLen = blockLen - 16;
                origPktLen = packetView.getU32();
            } else {
                intId = packetView.getU32();
                ts = BigInt( packetView.getU32() ) << 32n | BigInt( packetView.getU32() );
                captPktLen = packetView.getU32();
                origPktLen = packetView.getU32();
            }

            if( intLinkTypes.length <= intId ) {
                logError( 'PCAPNG', `Interface ${ intId } not defined. PacketIdx: ${ pktCount }` );
                return false;
            }

            const tsresol = intTsResol[intId];
            if(typeof tsresol === 'number'){
                ts = Number(ts);
            }

            localPktIdx++;
            if ( !(firstLocalPktIdx <= (localPktIdx - 1) && (localPktIdx - 1) < (lastLocalPktIdx)) ) {
                bufferReader.offset += blockLen;
                continue;
            }

            let pkt = {
                'id': pktIdx,
                'time': new Time(Number( ts / tsresol ), Number( ts % tsresol )),
                'length':  Math.min(captPktLen, origPktLen)
            };
            if( captPktLen !== origPktLen ) {
                pkt["origLength/captPktLen"] = origPktLen+'/'+captPktLen;
                add_packet_malfunction(pktIdx, '[ValidateError][Pkt #' + pktIdx + " original length of the packet is not equal to captured packet length", 'origLength/captPktLen')
                logWarningCnt( --pcap_logCntTruncatedPkts, 'PCAP', `Packet ${ makeLikeHrefOnClick( pktIdx, `packetDetailsDialog_showPacketWithId( ${ pktIdx } )` ) }: truncated captPktLen(${ captPktLen }) !== origPktLen(${ origPktLen })` );
            }
            if( intLinkTypes[intId] === 1 ) ethernetV2_decode( pkt, packetView.createView(pkt.length) );
            ++pktCount;

            if( !filterFunc || filterFunc( pkt ) ) {
                packets_push(pkt, packetView.getGlobalOffset(), pkt.length);
                if( ++pktIdx >= lastPktIdx ) break;
            }
        }

        bufferReader.offset += blockLen;
    }

    fillPacketsPayloadBuffer(bufferReader.buffer);

    fragmentation_postPcapDecode();
    l2l1_decode();
    ecpri_postPcapDecode();

    const loadedPackets = packetsLength - packetsLengthOld;

    logInfo( 'PCAPNG', `Decoded ${ loadedPackets }/${ pktCount }(${ calcPercentFixed2( loadedPackets, pktCount ) }) packets. Took ${ perfToMsFrom( perfNow ) }` );

    return true;
}

class packetTable_generateColumnNames_SimilarPacketSkipper{
    constructor() {
        this.maxVlanLen = 0;
        this.ecpriCPlaneMask = 0;
        this.ecpriCPlaneSectMask = new Array( 15 ).fill( 0 );
        this.ecpriCPlaneSectExtMask = new  Array( 15 ).fill( 0 );
        this.ecpriUPlaneSectMask = new Array( 15 ).fill( 0 );
        this.l2l1Checked = false;
    }
    skip(pkt){
        // algorithm to skip column check for ecpri uplane packets with the same properties. On some files time reduced 10x(500ms vs 50ms)
        let skip = true;
        if( pkt.vlan && pkt.vlan.length > this.maxVlanLen ) {
            this.maxVlanLen = pkt.vlan.length;
            skip = false;
        } else if( pkt.ecpri ) {
            const ecpri = pkt.ecpri;

            if( ecpri.message === 0 && ecpri.payloadVer === 1 ) {
                for( let j = 0; j < ecpri.sections.length; ++j ) {
                    const sect = ecpri.sections[j];

                    let mask = 1;
                    if( ecpri.dataDir === 0 ) mask |= 0x2;
                    if( sect.hasOwnProperty( 'udCompHdr' ) ) mask |= 0x4;
                    if( sect.hasOwnProperty( 'udCompLen' ) ) mask |= 0x8;

                    if( ( this.ecpriUPlaneSectMask[j] & mask ) !== mask ) {
                        this.ecpriUPlaneSectMask[j] |= mask;
                        skip = false;
                    }
                }
            } else if( ecpri.message === 2 ) {
                const sectTypeMask = 1 << ecpri.sectionType;
                if( !( this.ecpriCPlaneMask & sectTypeMask ) ) {
                    this.ecpriCPlaneMask |= sectTypeMask;
                    skip = false;
                }
                for( let j = 0; ecpri.sections && j < ecpri.sections.length; ++j ) {
                    const sect = ecpri.sections[j];
                    let mask = sectTypeMask;

                    if( ( this.ecpriCPlaneSectMask[j] & mask ) !== mask  ) {
                        this.ecpriCPlaneSectMask[j] |= mask;
                        skip = false;
                    }

                    if( sect.ef ) {
                        //                              0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
                        const isExtStatic = [ 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ];
                        let extMask = 0;
                        for( let extIdx = 0; extIdx < Math.min( sect.exts.length, 4 ); ++extIdx ) {
                            const extType = sect.exts[extIdx];
                            if( isExtStatic[extType] ) {
                                extMask |= extType << ( 8 * extIdx );
                            } else {
                                skip = false;
                            }
                        }
                        if( ( this.ecpriCPlaneSectExtMask[j] & extMask ) !== extMask  ) {
                            this.ecpriCPlaneSectExtMask[j] |= extMask;
                            skip = false;
                        }
                    }
                }
            }
            else {
                skip = false;
            }
        }
        else if( pkt.l2l1 && pkt.l2l1.message === 0x122 ) {
            if( !this.l2l1Checked ) skip = false;
            this.l2l1Checked = true;
        } 
        else {
            skip = false;
        }

        return skip;
    }
}

function packetTable_generateColumnNames_rankColumnNames(columnNamesRank, columnNamesOrderMap){
    for( const colName of [ 'l2l1', 'l2l1.subcells[*]' ] ) {
        if( columnNamesOrderMap.hasOwnProperty( colName ) ) columnNamesOrderMap[colName].sort( function( a, b ) { return ( a.includes( '[' ) ? 1 : 0 ) - ( b.includes( '[' ) ? 1 : 0 ); } );
    }

    for( const colName in columnNamesRank ) {
        const colNameSplit = colName.split('.');

        let curName = '';
        let rank = 0;
        let rankMultiplier = 1000000000000000000;

        for( let i = 0; i < colNameSplit.length; ++i ) {
            let partColName = colNameSplit[i];
            const partColIsArr = partColName.includes( '[' );
            let partColArrIdx = 0;
            if( partColIsArr ) {
                let split = partColName.split( '[' );
                partColArrIdx = parseInt( split[1].split( ']' )[0] );
                partColName = `${ split[0] }[*]`;
            }

            if( columnNamesOrderMap.hasOwnProperty( curName ) ) {
                const entry = columnNamesOrderMap[curName];
                rank += entry.indexOf( partColName ) * rankMultiplier;
                rankMultiplier /= 100;
                if( partColIsArr ) {
                    rank += partColArrIdx * rankMultiplier;
                    rankMultiplier /= 100;
                }
            } else {
                rank += rankMultiplier * 99;
            }
            curName += ( i !== 0 ? '.' : '' ) + partColName;
        }

        columnNamesRank[colName] = rank;
    }
}

function packetTable_generateColumnNames() {
    let perfNow = performance.now();
    let columnNamesOrderMap = {
        '': [ 'id', 'time', 'length', 'origLength', 'destmac', 'srcmac', 'vlan[*]', 'ethertype', 'ecpri', 'roe', 'bip', 'rachStatus', 'l2l1', 'ptp', 'ip', 'ipv6', 'tcp', 'udp' ],
        'ecpri': [ 'version', 'concat', 'message', 'payload', 'rtcId', 'seqId', 'sequenceId', 'Ebit', 'subsequenceId', 'dataDir', 'payloadVer', 'filterIndex', 'channelType', 'hfn', 'frameId',
            'subframeId', 'slotId', 'startSymbolId', 'numberOfSections', 'sectionType', 'numberOfUEs', 'timeOffset', 'frameStructure',
            'cpLength', 'udCompHdr', 'udCompHdr_iqWidth', 'udCompHdr_compMeth', 'laaMsgType', 'laaMsgLen', 'sections[*]' ],
        'ecpri.sections[*]': [ 'sectionId', 'rb', 'symInc', 'startPrb', 'numPrb', 'reMask', 'numSymbol', 'ef', 'beamId',
            'freqOffset', 'ueId', 'regularizationFactor', 'ciIsample', 'ciQsample', 'udCompHdr', 'udCompHdr_iqWidth', 'udCompHdr_compMeth',
            'exponent', 'sblockScaler', 'compBitWidth', 'compShift', 'udCompLen', 'sReSMask', 'rms', 'rms_dBFS', 'rms_dBm', 'max_amp', 'max_amp_dBFS', 'max_amp_dBm', 'exts[*]' ],
    }

    packetTable_filteredColumnNames = [];
    const packetSkipper = new packetTable_generateColumnNames_SimilarPacketSkipper();

    let columnNamesRank = {};
    const filteredColumnNamesSet = new Set();

    // First pass: gather all unique column names from filtered packets
    for (let i = 0; i < sortedPacketsIdsLength; ++i) {
        const pkt = packets[sortedPacketsIds[i]];

        if (packetSkipper.skip(pkt)) {
            continue;
        }

        const columnNames = getPacketsColumns(pkt);
        for (let j = 0; j < columnNames.length; j++) {
            filteredColumnNamesSet.add(columnNames[j]);
        }
    }

    // Second pass: process the collected column names
    for (const prop of filteredColumnNamesSet) {
        columnNamesRank[prop] = 0;
        if (!excludedColumnNames.includes(prop)) {
            packetTable_filteredColumnNames.push(prop);
        }
        const propSplit = prop.split('.');
        let curName = '';
        for (let j = 0; j < propSplit.length; ++j) {
            if (propSplit[j].includes('[')) propSplit[j] = `${propSplit[j].split('[')[0]}[*]`;
            if (!columnNamesOrderMap.hasOwnProperty(curName)) columnNamesOrderMap[curName] = [];
            if (!columnNamesOrderMap[curName].includes(propSplit[j])) columnNamesOrderMap[curName].push(propSplit[j]);
            curName += (j ? '.' : '') + propSplit[j];
        }
    }

    packetTable_generateColumnNames_rankColumnNames(columnNamesRank, columnNamesOrderMap);

    packetTable_filteredColumnNames.sort( function( a, b ) { return columnNamesRank[a] - columnNamesRank[b]; } );

    logDebug( 'UI', `packetTable_generateColumnNames took: ${ perfToMsFrom( perfNow ) }` );

    packetTable_renderColumns();
}

function packetTable_generateColumnNames_all() {
    let perfNow = performance.now();
    let columnNamesOrderMap = {
        '': [ 'id', 'time', 'length', 'origLength', 'destmac', 'srcmac', 'vlan[*]', 'ethertype', 'ecpri', 'roe', 'bip', 'rachStatus', 'l2l1', 'ptp', 'ip', 'ipv6', 'tcp', 'udp' ],
        'ecpri': [ 'version', 'concat', 'message', 'payload', 'rtcId', 'seqId', 'sequenceId', 'Ebit', 'subsequenceId', 'dataDir', 'payloadVer', 'filterIndex', 'channelType', 'hfn', 'frameId',
            'subframeId', 'slotId', 'startSymbolId', 'numberOfSections', 'sectionType', 'numberOfUEs', 'timeOffset', 'frameStructure',
            'cpLength', 'udCompHdr', 'udCompHdr_iqWidth', 'udCompHdr_compMeth', 'laaMsgType', 'laaMsgLen', 'sections[*]' ],
        'ecpri.sections[*]': [ 'sectionId', 'rb', 'symInc', 'startPrb', 'numPrb', 'reMask', 'numSymbol', 'ef', 'beamId',
            'freqOffset', 'ueId', 'regularizationFactor', 'ciIsample', 'ciQsample', 'udCompHdr', 'udCompHdr_iqWidth', 'udCompHdr_compMeth',
            'exponent', 'sblockScaler', 'compBitWidth', 'compShift', 'udCompLen', 'sReSMask', 'rms', 'rms_dBFS', 'rms_dBm', 'max_amp', 'max_amp_dBFS', 'max_amp_dBm', 'exts[*]' ],
    }

    packetTable_allColumnNames = [];
    const packetSkipper = new packetTable_generateColumnNames_SimilarPacketSkipper();

    let columnNamesRank = {};
    const allColumnNamesSet = new Set();

    // First pass: gather all unique column names
    for (let pktId = 0; pktId < packetsLength; ++pktId) {
        const pkt = packets[pktId];

        if (packetSkipper.skip(pkt)) {
            continue;
        }

        const columnNames = getPacketsColumns(pkt);
        for (let j = 0; j < columnNames.length; j++) {
            const prop = columnNames[j];
            allColumnNamesSet.add(prop);
        }
    }

    // Second pass: process the collected column names
    for (const prop of allColumnNamesSet) {
        columnNamesRank[prop] = 0;
        if (!excludedColumnNames.includes(prop)) {
            packetTable_allColumnNames.push(prop);
        }
        const propSplit = prop.split('.');
        let curName = '';
        for (let j = 0; j < propSplit.length; ++j) {
            if (propSplit[j].includes('[')) propSplit[j] = `${propSplit[j].split('[')[0]}[*]`;
            if (!columnNamesOrderMap.hasOwnProperty(curName)) columnNamesOrderMap[curName] = [];
            if (!columnNamesOrderMap[curName].includes(propSplit[j])) columnNamesOrderMap[curName].push(propSplit[j]);
            curName += (j ? '.' : '') + propSplit[j];
        }
    }

    packetTable_generateColumnNames_rankColumnNames(columnNamesRank, columnNamesOrderMap);

    packetTable_allColumnNames.sort( function( a, b ) { return columnNamesRank[a] - columnNamesRank[b]; } );

    logDebug( 'UI', `packetTable_generateColumnNamesAll took: ${ perfToMsFrom( perfNow ) }` );
}