// Loki & Thor snapshot

const MAX_ECPRI_PACKET_SIZE = 1500;
const ECPRI_PACKET_PADDING = 4;
const ECPRI_COMMON_HEADER_LEN = 4;
const EXTRA_ECPRI_PACKET_PADDING_ALIGN128 = 96;
const MAX_ECPRI_PACKET_SIZE_RU = 5952;
const CELL_HEADER_LEN = 16
const EXTENDED_DL_HEADER_LEN = 32;
const DL_OR_FCP_PACKET_TIME_HEADER = 16
const ETHERNET_HEADER_LEN = 24;

const LOKI_HEADER_LEN = 32;
const THOR_HEADER_LEN = 64;

const LOKI_FORMAT_TYPE = {
    LOKI: 0,
    THOR: 1,
    RFSRM7_THOR: 2
}

/** @param {LOKI_FORMAT_TYPE} target */
function GetTargetSpecificConsts(target){
    const pswHdrLen = target === LOKI_FORMAT_TYPE.LOKI ? LOKI_HEADER_LEN : THOR_HEADER_LEN;

    const ecpriBufSize = target === LOKI_FORMAT_TYPE.RFSRM7_THOR ?
        pswHdrLen + MAX_ECPRI_PACKET_SIZE_RU:
        pswHdrLen + MAX_ECPRI_PACKET_SIZE + ECPRI_PACKET_PADDING;

    return {pswHdrLen, ecpriBufSize};
}

function ConvertBcnToNanoseconds(bcnRegisterValue){
    /* BCN register is uint64 and consist of two counters:
        N1 - last 40 bits: one tick == 10 ms
        N2 - first 24 bits: one tick ~~ 1.2288 GHz
        BCN register use GPS epoch (since 6.1.1980)
     */
    const bcnN1 = bcnRegisterValue >> BigInt(24);
    const bcnN2 = bcnRegisterValue & BigInt(0xFFFFFF);

    const bcnN1_ns = bcnN1 * 10n * BigInt(1e6);
    const bcnN2_ns = BigInt(new Decimal(bcnN2.toString()).div(1.2288).trunc().toString()) ;

    return bcnN1_ns + bcnN2_ns;
}

function ConvertNanosecondsFromGpsToUnixEpoch(numberOfNanosecondsSinceGpsEpoch){
    const SECONDS_BETWEEN_1970_AND_1980 = 315532800n;
    return numberOfNanosecondsSinceGpsEpoch + SECONDS_BETWEEN_1970_AND_1980 * BigInt(1e9);
}

function LokiUlGetTimestamp(pswHeader, offsetBetweenPtpAndUtcInNanoseconds, ratioPtpTickToNanoseconds){
    /* Return timestamp from PSW Header + convert it to nanoseconds in Unix Epoch (since 1.1.1970)
    @pswHeader is RFOE_ECPRI_PSW0_S + RFOE_ECPRI_PSW1_S structures (32 bytes totally) */
    const ptpTimestamp = le_getU64(pswHeader, 16); // PTP Timestamp (BigInt)
    const result = new Decimal(ptpTimestamp.toString()).div(ratioPtpTickToNanoseconds);
    const timestampNs = BigInt(result.trunc().toString()) + offsetBetweenPtpAndUtcInNanoseconds;
    return timestampNs;
}
function ThorUlGetTimestamp(pswHeader){
    /* Return timestamp from PSW Header + convert it to nanoseconds in Unix Epoch (since 1.1.1970)
    @pswHeader is RFOE_PSW_S structure (64 bytes)

    Note: timestamp is not unique among received eCPRI packets; for example packets with the same frameId,
    subframeId, slotId, symbolId and with different eaxcid could have the same @rfoeTimeStamp */
    const bcnRegisterValue = be_getU64(pswHeader, 24); // BCN register
    const timeInNsGps = ConvertBcnToNanoseconds(bcnRegisterValue);
    return ConvertNanosecondsFromGpsToUnixEpoch(timeInNsGps);
}

function CheckIfHasEthernetHeader(ecpriData){
    /* Note:
        l1_application captures 7-2e FCP eCPRI packets (UlDataFH MessageType == 0x41, DlDataFH MessageType == 0x40)
        with Ethernet and VLAN headers. It is different than legacy C-Plane eCPRI packets capturing
        (MessageType == 0x02) */
    let ecpriVersion = ecpriData[0];
    let messageType = ecpriData[1];
    return !(ecpriVersion === 0x10 && messageType === 0x02);

}

function RemoveExtraZeroes(ecpriData, hasEthernetHeader){
    /* Remove extra zeros in the middle of FCP eCPRI packets (MessageType: 64, 65)
        Extra zeros were added by l1_application during copying data to NrUlFcpTraceCellBuffer
        (due to memory alignment) */
    const offset = hasEthernetHeader ? 18 : 0
    let ecpriVersion = ecpriData[0 + offset];
    let messageType = ecpriData[1 + offset];
    if(ecpriVersion === 0x10 && [0x40, 0x41].includes(messageType)){
        const payloadSize = be_getU16(ecpriData, 2 + offset);

        const firstPart = ecpriData.slice(0, 16 + offset);
        const secondPart = ecpriData.slice(30 + offset, 30 + offset + payloadSize + ECPRI_COMMON_HEADER_LEN - 16);
        return Uint8Array.from([...firstPart, ...secondPart]);
    }
    return ecpriData;
}



async function loki_decode( bufferReader ){
    const perfNow = performance.now();

    const buf = bufferReader.buffer;

    const lastPktIdx = config.load.loadLimit ? ( packetsLength + config.load.loadLimit ) : 0xFFFFFFFF;
    const loadFrom = config.load.loadLimitFrom || 0;

    ecpri_prePcapDecode();
    l2l1_prePcapDecode();

    let loadedPktIdx = 0;     // tracks only loaded packets
    let filePktIdx = 0; // tracks all packets inside the file

    let bufVersion = 0;

    const isMix = config.load.loki.dir === 'Mix';
    let isDl = config.load.loki.dir === 'DL';
    const isFcp = config.load.loki.type === 'FCP';
    const target =  config.load.loki.platform === 'loki' ? LOKI_FORMAT_TYPE.LOKI :
                            config.load.loki.platform === "thor" ? LOKI_FORMAT_TYPE.THOR :
                            LOKI_FORMAT_TYPE.RFSRM7_THOR;
    let isNr = true;

    const {pswHdrLen, ecpriBufSize} = GetTargetSpecificConsts(target);

    const MAX_CELL_NUM = target === LOKI_FORMAT_TYPE.RFSRM7_THOR ? 1 : 2;

    if(buf.byteLength < 4) return false;

    let dlFreezeTimestamp = 0n;
    let maxUlTimestamp = 0n;

    const FILE_SIZE_PER_CELL = Math.floor(buf.byteLength / MAX_CELL_NUM);
    for(let cell = 0; cell < MAX_CELL_NUM; ++cell){
        let off = cell * FILE_SIZE_PER_CELL;
        let ptr = new Uint8Array(buf, off);

        if(isMix){
            const ratDir = le_getU32(ptr, 0);
            off+=4;

            if(ratDir === 0xBADEAFFE || ratDir === 0xDEADBEEF) { // skip event triggered buffer
                break;
            }
            if( (ratDir & 0xFF) === 0xFF){
                continue;
            }

            off+=4;
            isDl = !!(ratDir % 2);
            isNr = Math.floor((ratDir&0xFF)/2)
            bufVersion = (ratDir>>8) & 0xFF;

            ptr = new Uint8Array(buf, off);
        }

        let offsetBetweenPtpAndUtcInNanoseconds = BigInt(0);
        let ratioPtpTickToNanoseconds = 1.0

        let firstWord = 0;
        let isEcpri = (isNr && isDl) ? 0 : 1;
        let isNrDlEcpri = (isNr && isDl) ? 1 : 0;

        let dlFreezeTick = 0n;
        let dlFreezeSfn = 0;

        if(isFcp === false){
            off += CELL_HEADER_LEN;
            firstWord = le_getU32(ptr, 0);
            const t1 = le_getU32(ptr, 4);

            isEcpri = ptr[8];
            const t2 = ptr[9];
            const t3 = ptr[10];
            isNrDlEcpri = ptr[11];

            const t4 = le_getU32(ptr, 12);
        }

        if(firstWord === 0xBADEAFFE || firstWord === 0xDEADBEEF) { // skip event triggered buffer
            break;
        }

        if(isDl && !isFcp){
            ptr = new Uint8Array( buf, off );
            off += isMix ? 24 : EXTENDED_DL_HEADER_LEN;

            const freezeFrame = le_getU16(ptr, 0);
            const t1 = le_getU16(ptr, 2);
            const t2 = le_getU32(ptr, 4);
            const bcn = le_getU64(ptr, 8);

            const tick = le_getU16(ptr, 16);
            const sfnAndSubfr = le_getU16(ptr, 18);
            //const t3 = le_getU32(ptr, 20);
            //const t4 = le_getU64(ptr, 24);

            const bcn_n1 = bcn >> BigInt(24);
            const bcn_n2 = bcn & BigInt(0xFFFFFF);

            if(bcn_n2 !== 0n && bcn_n2 !== 0xFFFFFFn){
                const timeConstant = 315532800n; // Seconds between 1/1/1970 and 1/1/1980

                dlFreezeTimestamp =
                    BigInt( new Decimal(bcn_n1.toString()).div(100).plus(timeConstant.toString()).mul(1e9)
                    .plus( new Decimal(bcn_n2.toString()).div(1.2288).trunc() ));
                const sfn = sfnAndSubfr >> 4;
                const subfr = sfnAndSubfr & 0xF;
                dlFreezeSfn = sfn
                dlFreezeTick = BigInt( (sfn*10+subfr)*64000 + tick );
            }
        } else if(isMix){
            ptr = new Uint8Array( buf, off );
            off += 24;
            if(bufVersion >= 9){
                offsetBetweenPtpAndUtcInNanoseconds = le_getU64(ptr, 0);
                ratioPtpTickToNanoseconds = le_getF32(ptr, 8);
            }
        }

        if( isNr && isDl && !isNrDlEcpri || ((!isNr || !isDl) && !isEcpri)){
            break;
        }

        ptr = new Uint8Array(buf, off);

        let remainingSize = FILE_SIZE_PER_CELL;
        if(isFcp){
            if(isNr){
                remainingSize -= (isDl?4:16) *ETHERNET_HEADER_LEN;
            }
            const CheckFirstFcpPacket = ()=>{
                for(let i = 0; i < Math.floor(remainingSize/16); ++i){
                    //(version,_,_,_) = struct.unpack('!HHIQ', fdIn.read(16))
                    ptr = new Uint8Array(buf, off);
                    off += 16;

                    // C-Plane
                    let ecpriVersion = ptr[0];
                    let messageType = ptr[1];
                    if(ecpriVersion === 0x10 && messageType === 0x02){
                        off -= 32;
                        return remainingSize - 16*(i-1)
                    }

                    // 7-2e FCP packet: UlDataFH MessageType == 0x41 (65), DlDataFH MessageType == 0x40 (64)
                    ecpriVersion = ptr[2];
                    messageType = ptr[3];
                    if(ecpriVersion === 0x10 && [0x40, 0x41].includes(messageType)){
                        off -= 48;
                        return remainingSize - 16*(i-2)
                    }
                }
                return 0;
            }
            remainingSize = CheckFirstFcpPacket();
        }

        const isEcpriBufAlign128 = (target === LOKI_FORMAT_TYPE.THOR) && (!isDl) && (bufVersion >= 7);
        const realEcpriBufSize = isEcpriBufAlign128 ? (ecpriBufSize + EXTRA_ECPRI_PACKET_PADDING_ALIGN128) : ecpriBufSize;

        while(remainingSize >= realEcpriBufSize){
            ptr = new Uint8Array(buf, off);

            const hollowSpace = ptr.slice(0, 16);
            if( hollowSpace.every(v=>v===0xFF) || hollowSpace.every(v=>v===0x00) ) {
                remainingSize -= 16;
                off += 16;
                continue;
            }

            remainingSize -= realEcpriBufSize;

            let timestamp = null;
            if(isDl || isFcp){
                ptr = new Uint8Array( buf, off );
                off += DL_OR_FCP_PACKET_TIME_HEADER;

                const t1 = le_getU32(ptr, 0);
                const tick = le_getU16(ptr, 4);
                const sfnAndSubfr = le_getU16(ptr, 6);
                const t2 = le_getU64(ptr, 8);

                const sfn = sfnAndSubfr>>4;
                const subfr = sfnAndSubfr & 0xF;
                timestamp = isMix || !isDl || (Math.abs(dlFreezeSfn - sfn)) % 4096 < 7 ?
                    BigInt( (sfn*10+subfr)*64000 + tick ):
                    0n;
            }
            else{
                ptr = new Uint8Array( buf, off );
                off += pswHdrLen;

                if(target === LOKI_FORMAT_TYPE.LOKI){
                    timestamp = LokiUlGetTimestamp(ptr, offsetBetweenPtpAndUtcInNanoseconds, ratioPtpTickToNanoseconds);
                } else{
                    timestamp = ThorUlGetTimestamp(ptr);
                }
                if(timestamp > maxUlTimestamp) maxUlTimestamp = timestamp;
            }


            const packetOffset = off;
            let ecpriData;
            let hasEthernetHeader = false;
            if(target === LOKI_FORMAT_TYPE.RFSRM7_THOR){
                ecpriData = new Uint8Array( buf, off, MAX_ECPRI_PACKET_SIZE_RU );
                off += MAX_ECPRI_PACKET_SIZE_RU;
            } else{
                ecpriData = new Uint8Array( buf, off, MAX_ECPRI_PACKET_SIZE );
                off += MAX_ECPRI_PACKET_SIZE;
                if(isFcp){
                    hasEthernetHeader = CheckIfHasEthernetHeader(ecpriData);
                    ecpriData = RemoveExtraZeroes(ecpriData, hasEthernetHeader);
                }
                off += ECPRI_PACKET_PADDING;
                if(isEcpriBufAlign128) off += EXTRA_ECPRI_PACKET_PADDING_ALIGN128;
            }

            if(isDl || isFcp){
                off += pswHdrLen - DL_OR_FCP_PACKET_TIME_HEADER;    // skip for DL
            }

            const packetSize = GetEcpriPacketLen(target, ecpriData, isFcp, hasEthernetHeader);
            if(packetSize && timestamp){

                ++filePktIdx;
                if((filePktIdx-1) < loadFrom){
                    continue;
                }

                if(dlFreezeTimestamp && (isDl || isFcp) ){
                    const deltaTick = dlFreezeTick - timestamp;
                    timestamp = BigInt( new Decimal(dlFreezeTimestamp.toString()).minus(new Decimal(deltaTick.toString()).mul(1e6).div(64000)).trunc().toString() );
                }
                const pkt = {
                    id: loadedPktIdx,
                    time: new Time(timestamp/BigInt(1e9), timestamp % BigInt(1e9)),
                    length: packetSize + 18, // 14 bytes header + 4 bytes FCS
                    destmac: "11:22:33:44:55:66",
                    srcmac:  "aa:bb:cc:dd:ee:ff",
                    ethertype: 0xAEFE};

                const packetBufferReader = new BufferReader(buf, packetOffset, packetSize, C_BYTE_ORDER.NETWORK);
                if(hasEthernetHeader)
                    ethernetV2_decode( pkt, packetBufferReader );
                else
                    ecpri_decode( pkt, packetBufferReader );
                packets_push(pkt, packetOffset, pkt.length);

                if( ++loadedPktIdx >= lastPktIdx ) break;
            }
        }
    }
    const firstTimestamp = dlFreezeTimestamp - maxUlTimestamp;
    let minHFN = 0;
    // Shift UL timestamps
    for(let i = packetsLengthOld; i < packetsLength; ++i){
        const packet = packets[i];
        if(!packet.ecpri) continue;
        minHFN = Math.min(packet.ecpri.hfn,minHFN);
        if(packet.ecpri.dataDir !== 0) continue;

        packet.time.t_sec += firstTimestamp/BigInt(1e9);
        packet.time.t_nsec += firstTimestamp % BigInt(1e9);
    }

    if(minHFN < 0){
        for(let i = 0; i < packets.length; i++){
            packets[i].ecpri.hfn += Math.abs(minHFN);
        }
    }

    fillPacketsPayloadBuffer(buf);

    l2l1_decode(false);
    ecpri_postPcapDecode(false);

    const loadedPackets = packetsLength - packetsLengthOld;
    logInfo( 'Loki', `Decoded ${ loadedPackets }/${ loadedPktIdx }(${ calcPercentFixed2( loadedPackets, loadedPktIdx ) }) packets. Took ${ perfToMsFrom( perfNow ) }` );

    return true;
}

function GetEcpriPacketLen(target, ecpriData, isFcp = false, hasEthernetHeader = false){
    let off = 0;

    off += ECPRI_COMMON_HEADER_LEN;

    const ecpriByteOffset = hasEthernetHeader ? 18 : 0;

    const max_ecpri_packet_size_target =
            target === LOKI_FORMAT_TYPE.RFSRM7_THOR ?
            MAX_ECPRI_PACKET_SIZE_RU :
            MAX_ECPRI_PACKET_SIZE

    const ecpriVersion = ecpriData[0 + ecpriByteOffset];
    const messageType = ecpriData[1 + ecpriByteOffset];
    const payloadSize = be_getU16(ecpriData, 2 + ecpriByteOffset);

    if( ecpriVersion !== 0x10 || [0, 2, 64, 65].includes(messageType) === false || (isFcp && ![2, 64, 65].includes(messageType))){
        return 0;
    }
    if( payloadSize === 0 || payloadSize > (max_ecpri_packet_size_target - ECPRI_COMMON_HEADER_LEN)){
        return 0;
    }

    return Math.max(ECPRI_COMMON_HEADER_LEN + payloadSize, 46);
}

function DetectLokiFileType(filename){
    return {isDl: true, isNr: true, isFcp: false};
}

function le_getU16( ptr, off ) {
    return ( ptr[off] | ptr[off + 1] << 8 ) >>> 0;
}

function le_getI32( ptr, off ) {
    return ptr[off] | ptr[off + 1] << 8 | ptr[off + 2] << 16 | ptr[off + 3] << 24;
}

function le_getU32( ptr, off ) {
    return ( ptr[off] | ptr[off + 1] << 8 | ptr[off + 2] << 16 | ptr[off + 3] << 24 ) >>> 0;
}

function le_getU64( ptr, off ) {
    let dv = new DataView( ptr.buffer, ptr.byteOffset + off );

    return dv.getBigUint64( 0, true );
}

function le_getF32( ptr, off ) {
    let dv = new DataView( ptr.buffer, ptr.byteOffset + off );

    return dv.getFloat32( 0, true );
}

function be_getU16( ptr, off ) {
    return ( ptr[off] << 8 | ptr[off + 1] ) >>> 0;
}

function be_getI32( ptr, off ) {
    return ptr[off] << 24 | ptr[off + 1] << 16 | ptr[off + 2] << 8 | ptr[off + 3];
}

function be_getU32( ptr, off ) {
    return ( ptr[off] << 24 | ptr[off + 1] << 16 | ptr[off + 2] << 8 | ptr[off + 3] ) >>> 0;
}

function be_getU64( ptr, off ) {
    let dv = new DataView( ptr.buffer, ptr.byteOffset + off );

    return dv.getBigUint64( ptr.byteOffset + off, false );
}