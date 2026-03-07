function ptp_decode( pkt, bufferView ) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    const pktEnd = off + bufferView.dataView.byteLength;

    let ptr = new Uint8Array( buf, off );

    let ptp = pkt.ptp = {};
    ptp.majorSdoId = ptr[0] >> 4;
    ptp.messageType = ptr[0] & 0xF;
    ptp.versionPTP = ptr[1] & 0xF;
    ptp.messageLength = ptr[2] << 8 | ptr[3];
    ptp.domainNumber = ptr[4];
    ptp.minorSdoId = ptr[5];
    ptp.flags = ptr[6] << 8 | ptr[7];

    const correctionSign = ptr[8] & 0x80;
    ptp.correctionNs =
        ((ptr[8]<<8 ) + ptr[9] ) * (2**32) +
        ((ptr[10]<<8) + ptr[11]) * (2**16) +
        ((ptr[12]<<8) + ptr[13]);
    ptp.correctionSubNs = (ptr[14]<<8) + ptr[15];
    if(correctionSign){ // convert to signed integer
        ptp.correctionNs = ptp.correctionNs - (2**48);
    }

    ptp.messageTypeSpecific = ((ptr[16]<<8) | (ptr[17])) * (2**16) +
        ((ptr[18]<<8) | (ptr[19]) );

    let sourcePortIdentity = ptp.sourcePortIdentity =  {};
    sourcePortIdentity.clockIdentity = "0x" + Array.from(ptr.slice(20, 28))
        .map(dec=>dec.toString(16).padStart(2, '0')).join('');
    sourcePortIdentity.portNumber = (ptr[28]<<8) | ptr[29];

    ptp.sequenceId = ptr[30] << 8 | ptr[31];
    ptp.control = ptr[32];
    ptp.logMeanMessageInterval = ptr[33];

    ptp.originTimestampS =
        (ptr[34]<<8 | ptr[35]) * (2**32) +
        (ptr[36]<<8 | ptr[37]) * (2**16) +
        (ptr[38]<<8 | ptr[39]);
    ptp.originTimestampNs =
        (ptr[40]<<8 | ptr[41]) * (2**16) +
        (ptr[42]<<8 | ptr[43]);
    switch( ptp.messageType ) {
        case 0xB:
            ptp.currentUTCOffset = ptr[44] << 8 | ptr[45];
            // TODO
            break;
    }
}