const hexToAsciiTable = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70 ];
const ipv6_adrAsciiBuf = [ 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 0, 0, 0, 58, 58, 58, 58 ];

function ipv6_formatAdr( ptr, off ) {
    // IPv6 address shortening?
    for( let i = 0; i < 39; ++i ) {
        ipv6_adrAsciiBuf[i++] = hexToAsciiTable[ptr[off] >> 4];
        ipv6_adrAsciiBuf[i++] = hexToAsciiTable[ptr[off++] & 0xF];
        ipv6_adrAsciiBuf[i++] = hexToAsciiTable[ptr[off] >> 4];
        ipv6_adrAsciiBuf[i++] = hexToAsciiTable[ptr[off++] & 0xF];
    }
    return String.fromCharCode( ...ipv6_adrAsciiBuf );
}

function ipv6_decode( pkt, bufferView ) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    const pktEnd = off + bufferView.dataView.byteLength;

    let ptr = new Uint8Array( buf, off );

    let ipv6 = pkt.ipv6 = {};
    ipv6.flowLabel = ( ptr[1] & 0xF ) << 16 | ptr[2] << 8 | ptr[3];
    ipv6.payloadLength = ptr[4] << 8 | ptr[5];
    ipv6.nextHeader = ptr[6];
    ipv6.hopLimit = ptr[7];
    ipv6.srcAddr = ipv6_formatAdr( ptr, 8 );
    ipv6.destAddr = ipv6_formatAdr( ptr, 24 );
    // TODO: decode specific protocols
}