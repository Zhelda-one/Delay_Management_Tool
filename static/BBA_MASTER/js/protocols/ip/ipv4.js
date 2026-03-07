function ipv4_formatAdr( ptr, off ) {
    return `${ ptr[off] }.${ ptr[off + 1] }.${ ptr[off + 2] }.${ ptr[off + 3] }`;
}

function ipv4_decode( pkt, bufferView ) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    const pktEnd = off + bufferView.dataView.byteLength;

    let ptr = new Uint8Array( buf, off );

    let ip = pkt.ip = {};
    let ihl = ptr[0] & 0xF;
    ip.ttl = ptr[8];
    ip.proto = ptr[9];
    ip.checksum = ptr[10] << 8 | ptr[11];
    ip.srcIp = ipv4_formatAdr( ptr, 12 );
    ip.destIp = ipv4_formatAdr( ptr, 16 );

    off += 4 * ihl;

    ptr = new Uint8Array( buf, off );

    switch( ip.proto ) {
        case 6:
            let tcp = pkt.tcp = {};
            tcp.srcPort = ptr[0] << 8 | ptr[1];
            tcp.destPort = ptr[2] << 8 | ptr[3];
            tcp.seqNum = ptr[4] << 24 | ptr[5] << 16 | ptr[6] << 8 | ptr[7];
            break;
        case 17:
            let udp = pkt.udp = {};
            udp.srcPort = ptr[0] << 8 | ptr[1];
            udp.destPort = ptr[2] << 8 | ptr[3];
            udp.length = ptr[4] << 8 | ptr[5];
            udp.checksum = ptr[6] << 8 | ptr[7];
            break;
    }
}