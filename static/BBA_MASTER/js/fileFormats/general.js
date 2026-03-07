// Format parsing guidelines
// Use packets_push(pkt, pktOffset, pktLength)
// When packets are fully loaded, use fill
// Don't touch packetsLength or packetsLengthOld
// TODO: IQ Buffers

/**
 * @param {ArrayBuffer} buffer
 * @returns {string|null}
 */
function filePreload( buffer ) {
    for(const format of g_filePreloadList){
        if(format.preloadFn && format.preloadFn(buffer)){
            return format.id;
        }
    }
    return null;
}

function packets_push(pkt, pktOffset, pktLength){
    packets.push(pkt);
    ++packetsLength;
    packetsPayloadOffset.push( pktOffset );
    totalPayloadSize += pktLength;
}

function fillPacketsPayloadBuffer(sourceBuf){
    totalPayloadSize += packetsPayloadBuffer ? packetsPayloadBuffer.byteLength : 0;
    let currentOffset = packetsPayloadBuffer ? packetsPayloadBuffer.byteLength : 0;
    if( totalPayloadSize % 4 ) totalPayloadSize += 4 - totalPayloadSize % 4; // align to 4 bytes, needed for iq decoding

    const oldPacketsPayloadBuffer = packetsPayloadBuffer;
    packetsPayloadBuffer = new ArrayBuffer( totalPayloadSize );
    let packetsPayloadPtr = new Uint8Array( packetsPayloadBuffer );
    if( oldPacketsPayloadBuffer ) packetsPayloadPtr.set( new Uint8Array( oldPacketsPayloadBuffer ) );

    for( let i = packetsLengthOld; i < packetsLength; ++i ) {
        const pktLen = packets[i].length;
        const pktPayload = new Uint8Array( sourceBuf, packetsPayloadOffset[i], pktLen );
        packetsPayloadPtr.set( pktPayload, currentOffset );
        packetsPayloadOffset[i] = currentOffset;
        currentOffset += pktLen;
    }
}