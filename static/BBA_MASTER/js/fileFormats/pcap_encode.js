
function packet_encode( pkt, buf, off ) {
    let ptr = new Uint8Array( buf, off );

    ptr.set( new Uint8Array( packetsPayloadBuffer, packetsPayloadOffset[pkt.id], pkt.length ) );
    if( packetsPayloadOffset[pkt.id] !== -1 && ['pcap', 'pcapng'].includes(config.load.fileType) && !modifiedPackets.has(pkt.id)) {
    }
    else {
        pcap_setMac( ptr, 0, pkt.destmac );
        pcap_setMac( ptr, 6, pkt.srcmac );
        let curOff = 12;

        if( pkt.hasOwnProperty( 'vlan' ) ) {
            for( let i = 0; i < pkt.vlan.length; ++i ) {
                const vlan = pkt.vlan[i];
                ptr[curOff] = (parseInt(vlan.tpidStr) & 0xFF00) >> 8;
                ptr[curOff + 1] = parseInt(vlan.tpidStr);
                ptr[curOff + 2] = (vlan.priority & 0x7) << 5 |  (vlan.dei & 0x1)  << 4 |  (vlan.vid & 0xF00)  >> 8;
                ptr[curOff + 3] = vlan.vid;
                curOff += 4;
            }
        }

        ptr[curOff] = pkt.ethertype >> 8;
        ptr[curOff + 1] = pkt.ethertype;

        off += curOff + 2;

        switch( pkt.ethertype ) {
            case 0xAEFE: ecpri_encode( pkt, buf, off ); break;
            case 0x8951: bip_encode( pkt, buf, off ); break;
        }
    }
}
function pcap_encode() {
    const perfNow = performance.now();

    let packetsIds;
    if( config.save.packetsRange === 'all' ) {
        packetsIds = new Array( packetsLength );
        for( let i = 0; i < packetsLength; ++i ) packetsIds[i] = i;
    } else if( config.save.packetsRange === 'filtered' ) {
        packetsIds = [...filteredPacketsIds];
    } else if ( config.save.packetsRange === 'filtered_sorted' ) {
        packetsIds = [...sortedPacketsIds];
    }

    const packetsIdsLength = packetsIds.length;

    let bufSize = 24 + 16 * packetsIdsLength;
    for( let i = 0; i < packetsIdsLength; ++i ) {
        bufSize += packets[packetsIds[i]].length;
    }

    pcap_isLittleEndian = config.save.pcapEndian === 'little';
    const tsUsecMult = config.save.pcapTsPrecision === 'ms' ? 1000000 : 1000000000;

    let buf = new ArrayBuffer( bufSize );
    let ptr = new Uint8Array( buf );
    let off = 24;

    pcap_setU32( ptr, 0, config.save.pcapTsPrecision === 'ms' ? 0xA1B2C3D4 : 0xA1B23C4D ); // magic number
    pcap_setU16( ptr, 4, 2 ); // version major
    pcap_setU16( ptr, 6, 4 ); // version minor
    pcap_setU32( ptr, 8, 0 ); // reserved
    pcap_setU32( ptr, 12, 0 ); // reserved
    pcap_setU32( ptr, 16, 65535 ); // snaplen
    pcap_setU32( ptr, 20, 1 ); // network: 1 - Ethernet

    for( let pktIdx = 0; pktIdx < packetsIdsLength; ++pktIdx ) {
        ptr = new Uint8Array( buf, off );
        off += 16;

        const pktId = packetsIds[pktIdx];
        const pkt = packets[pktId];
        const pktLen = pkt.length;
        const time = config.save.timestampColumn === "time" ? pkt.time : packets[pktId].PtpTime.toString(); //tracedPackets[pktId].PtpTime;

        pcap_setU32( ptr, 0, parseFloat(time) | 0 ); // ts_sec
        pcap_setU32( ptr, 4, ( ( parseFloat(time) % 1 ) * tsUsecMult ) | 0 ); // ts_usec
        pcap_setU32( ptr, 8, pktLen ); // incl_len
        pcap_setU32( ptr, 12, pktLen ); // orig_len

        packet_encode( pkt, buf, off );

        off += pktLen;
    }

    logInfo( 'PCAP', `Encoded ${ packetsIdsLength }/${ packetsLength }(${ calcPercentFixed2( packetsIdsLength, packetsLength ) }) packets. Size: ${ formatBytes( bufSize ) }. Took ${ perfToMsFrom( perfNow ) }` );

    let filename = config.save.filename;
    if( !filename.includes( '.pcap' ) ) filename += '.pcap';
    downloadFile( filename, buf );
}

function pcapng_encode() {
    const perfNow = performance.now();

    let packetsIds;
    if( config.save.packetsRange === 'all' ) {
        packetsIds = new Array( packetsLength );
        for( let i = 0; i < packetsLength; ++i ) packetsIds[i] = i;
    } else if( config.save.packetsRange === 'filtered' ) {
        packetsIds = [...filteredPacketsIds];
    } else if ( config.save.packetsRange === 'filtered_sorted' ) {
        packetsIds = [...sortedPacketsIds];
    }

    const packetsIdsLength = packetsIds.length;

    const isNsTimestamp = config.save.pcapTsPrecision === 'ns';
    const idbLen = ( isNsTimestamp ? 32 : 20 );
    pcap_isLittleEndian = config.save.pcapEndian === 'little';

    let bufSize = 28 + idbLen + 32 * packetsIdsLength;
    for( let i = 0; i < packetsIdsLength; ++i ) {
        let pktLen = packets[packetsIds[i]].length;
        if( pktLen % 4 ) pktLen += 4 - pktLen % 4;
        bufSize += pktLen;
    }

    let buf = new ArrayBuffer( bufSize );
    let ptr = new Uint8Array( buf );
    let off = 28 + idbLen;

    // Section Header Block( 28 bytes )
    pcap_setU32( ptr, 0, 0x0A0D0D0A ); // Block type
    pcap_setU32( ptr, 4, 28 ); // Block Total Length
    pcap_setU32( ptr, 8, 0x1A2B3C4D ); // Byte-Order Magic
    pcap_setU16( ptr, 12, 1 ); // Major Version
    pcap_setU16( ptr, 14, 0 ); // Minor Version
    pcap_setU32( ptr, 16, 0xFFFFFFFF ); // Section Length u64
    pcap_setU32( ptr, 20, 0xFFFFFFFF ); // Section Length
    pcap_setU32( ptr, 24, 28 ); // Block Total Length

    // Interface Description Block( x bytes )
    pcap_setU32( ptr, 28, 0x00000001 ); // Block type
    pcap_setU32( ptr, 32, idbLen ); // Block Total Length
    pcap_setU16( ptr, 36, 1 ); // Link Type: 1 - Ethernet
    pcap_setU32( ptr, 40, 65535 ); // Snap Length
    if( isNsTimestamp ) {
        pcap_setU16( ptr, 44, 9 ); // Option Type: 9 - if_tsresol
        pcap_setU16( ptr, 46, 1 ); // Option Length
        ptr[48] = 9;
    }
    pcap_setU32( ptr, isNsTimestamp ? 56 : 44, idbLen ); // Block Total Length

    for( let pktIdx = 0; pktIdx < packetsIdsLength; ++pktIdx ) {
        ptr = new Uint8Array( buf, off );
        off += 28;

        const pktId = packetsIds[pktIdx];
        const pkt = packets[pktId];
        const pktLen = pkt.length;
        const pktLenAligned = ( pktLen % 4 ) ? ( pktLen + 4 - pktLen % 4 ) : pktLen;

        const blockLen = 32 + pktLenAligned;

        // Enhanced Packet Block
        pcap_setU32( ptr, 0, 0x00000006 ); // Block type
        pcap_setU32( ptr, 4, blockLen ); // Block Total Length
        pcap_setU32( ptr, 8, 0 ); // Interface ID
        pcap_setU32( ptr, 12, 0 ); // Timestamp High TODO
        pcap_setU32( ptr, 16, 0 ); // Timestamp Low
        pcap_setU32( ptr, 20, pktLen ); // Captured Packet Length
        pcap_setU32( ptr, 24, pktLen ); // Original Packet Length

        packet_encode( pkt, buf, off );

        off += pktLenAligned + 4;

        pcap_setU32( ptr, 28 + pktLenAligned, blockLen );
    }

    logInfo( 'PCAPNG', `Encoded ${ packetsIdsLength }/${ packetsLength }(${ calcPercentFixed2( packetsIdsLength, packetsLength ) }) packets. Size: ${ formatBytes( bufSize ) }. Took ${ perfToMsFrom( perfNow ) }` );

    let filename = config.save.filename;
    if( !filename.includes( '.pcapng' ) ) filename += '.pcapng';
    downloadFile( filename, buf );
}

function csv_encode(filename){
    const table = new TableBuilder();
    table.columns = packetTable_filteredColumnNames.slice(1);
    table.data = [];

    if(config.save.packetsRange === 'filtered_sorted') {
        for(let i = 0; i < sortedPacketsIds.length; i++) {
            let packet = {};

            const colNamesWithVals = getPacketsColumnsWithValues(packets[sortedPacketsIds[i]]);
            for(const propName in colNamesWithVals){
                const propVal = colNamesWithVals[propName];
                if(propName !== 'id') packet[propName] = propVal;
            }
            table.data.push(packet);
        }
    } else {
        for(let i = 0; i < packets.length; i++) {
            if(config.save.packetsRange === 'all' || (config.save.packetsRange === 'filtered' && filteredPacketsIds.includes(i))) {
                let packet = {};
                const colNamesWithVals = getPacketsColumnsWithValues(packets[i]);
                for(const propName in colNamesWithVals){
                    const propVal = colNamesWithVals[propName];
                    if(propName !== 'id') packet[propName] = propVal;
                }
                table.data.push(packet);
            }
        }
    }

    if( !filename ) filename = "file";
    if( !filename.includes( '.csv' ) ) filename += '.csv';
    downloadFile( filename, table.BuildCsv(';', config.save.csvAddExcelSeparator) );

}
