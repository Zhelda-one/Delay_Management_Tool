function bip_decode( pkt, bufferView ) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    const pktEnd = off + bufferView.dataView.byteLength;

    let ptr = new Uint8Array( buf, off );

    let bip = pkt.bip = {};
    bip.rbip = ptr[0] >> 7;
    bip.type = ( ptr[0] >> 4 ) & 0x7;

    if( !bip.rbip ) {
        off += 8;

        bip.streamId = ( ptr[0] & 0xF ) << 8 | ptr[1];
        bip.payloadSize = ptr[2] << 8 | ptr[3];
        // ptr 4 byte
        if( bip.type === 2 ) {
            bip.eventSeqNum = ptr[4];
            bip.fragmentIndex = ptr[5];
            bip.localQueueId = ptr[6] | ptr[7] << 8;
        }
    } else {
        off += 16;

        bip.ver = ptr[0] & 0xF;
        bip.protocolSpecific = ptr[1];
        bip.payloadSize = ptr[2] << 8 | ptr[3];
        bip.destDevId = ptr[4] << 8 | ptr[5];
        bip.srcDevId = ptr[6] << 8 | ptr[7];
        // ptr 8 byte

        if( bip.type === 2 ) {
            bip.localQueueId = ptr[8] << 8 | ptr[9]; // TODO: specification figure and text misleading
            bip.eventSeqNum = ptr[10];
        }
    }

    // if( !bip.rbip ) {
    //
    //     switch( bip.type ) {
    //         case 4: // RMWA 22-bit
    //         case 5:
    //             bip.mode = ptr[4] >> 4;
    //             bip.buf = ( ptr[4] & 0xF ) << 2 | ptr[5] >> 6;
    //             bip.off = ( ptr[5] & 0x3F ) << 16 | ptr[6] << 8 | ptr[7];
    //             break;
    //     }
    // } else {
    //     // bip.
    // }

    switch( bip.type ) {
        case 1: // Streaming traffic
        case 2: // Event Chaining
            if(!bip.fragmentIndex)
                l2l1_detectMessage( pkt, buf, off, pktEnd );
            // ptr = new Uint8Array( buf, off );
            // l2l1_ptr = ptr;
            // let multi = pkt.multi = {};
            // multi.message = ptr[2] << 8 | ptr[3];
            // off += 8;
            // l2l1_decode_msg( pkt, buf, off, pktEnd );
            break;
        case 3: // BICMP
            break;
    }
}

function bip_encode( pkt, buf, off ) {
    const bip = pkt.bip;
    let ptr = new Uint8Array( buf, off );

    ptr[0] = bip.rbip << 7 | ptr[0] << 4;

    // TODO:
    if( !bip.rbip ) {
        off += 12;
        ptr[0] = bip.type << 4;
        ptr[1] = bip.streamId;
        ptr[2] = bip.payloadSize >> 8;
        ptr[3] = bip.payloadSize;
        //console.log({ buf, ptr, off, bip, payloadBuf: new Uint8Array(buf, off) });
    } else {
        off += 16;
        ptr[0] |= bip.ver;
    }

    switch( bip.type ) {
        case 2:
            l2l1_encode( pkt, buf, off );
            break;
    }
}
