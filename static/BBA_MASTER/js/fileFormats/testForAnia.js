/**
 * @param {BufferReader} bufferReader
 */
function testFormat_decode(bufferReader){
    const perfNow = performance.now();

    const ECPRI_BUFFER_SIZE = 6016;

    ecpri_prePcapDecode();
    l2l1_prePcapDecode();

    let timestamp = 0;

    let pktIdx = 0; // tracks only loaded packets
    let filePktIdx = 0; // tracks all packets inside the file

    const lastPktIdx = config.load.loadLimit
        ? packetsLength + config.load.loadLimit
        : 0xffffffff;
    const loadFrom = config.load.loadLimitFrom || 0;

    while (true) {
        if(bufferReader.peekU8(0) !== 0xAB || bufferReader.peekU8(1) !== 0xAB){
            if(bufferReader.hasCapacity(32)){
                bufferReader.offset += 16;
                continue;
            }
            break;
        }
        bufferReader.offset += 16;

        if (filePktIdx++ < loadFrom) {
            bufferReader.offset += 16;
            continue;
        }

        const sizeView = bufferReader.createView(4);
        sizeView.offset += 2;
        const packetSize = sizeView.getU16();

        if (packetSize > 0) {
            const pkt = {
                id: pktIdx,
                time: new Time(0, timestamp),
                length: packetSize + ECPRI_COMMON_HEADER_LEN,
                destmac: "11:22:33:44:55:66",
                srcmac: "aa:bb:cc:dd:ee:ff",
                ethertype: 0xaefe,
            };

            ++timestamp;

            ecpri_decode(pkt, bufferReader.createView(ECPRI_BUFFER_SIZE));
            packets_push(pkt, bufferReader.offset, pkt.length);

            if (++pktIdx >= lastPktIdx) break;
        }
        bufferReader.offset += 16;
    }

    fillPacketsPayloadBuffer(bufferReader.buffer);

    l2l1_decode(false);
    ecpri_postPcapDecode(false);
}