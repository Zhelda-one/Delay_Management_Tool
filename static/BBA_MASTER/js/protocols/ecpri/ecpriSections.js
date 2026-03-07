// ecpri_decodeSection* functions return the offset, the number of bytes they've processed
// the first argument is the output parameter section (ecpri for 255) with decoded fields and values

function ecpri_decodeSection240(section, buf, off, pktEnd){
    const ptr = new Uint8Array(buf, off);

    section.sectionId =  (ptr[0]<<4) | (ptr[1]>>4);
    section.historyNumOfSlots = (ptr[1] >> 2) & 0x03;
    section.historyFrameId = (ptr[1] & 0x03) << 8 | ptr[2];
    section.historySlotId = ptr[3];

    section.eventTrigger = 0;
    for(let j = 0; j < 8; ++j){
        section.eventTrigger <<= 8;     // TODO: 64-bit number?
        section.eventTrigger += ptr[4 + j];
    }

    return 12;
}

function ecpri_encodeSection240(section,buf,off){
    const ptr = new Uint8Array(buf,off);

    ptr[0] = section.sectionId >> 4;
    ptr[1] = ((section.sectionId & 0xF) << 4) | (section.historyNumOfSlots << 2) | (section.historyFrameId >> 8);
    ptr[2] = section.historyFrameId & 0xFF;
    ptr[3] = section.historySlotId;

    for(let j = 7; j >= 0; j--){
        ptr[4 + 7 - j] = (section.eventTrigger >> 8 * j) & 0xFF;        
    }

    return 12;
}

function ecpri_decodeSection255( ecpri, ptr  ) {
    // 255 is a little different to other sections
    // it has only one section, instead of an array
    ecpri.rxTimeOffsetRelBtsAif30p72M = U2ToInt(ptr[14] << 8 | ptr[15], 16);
    ecpri.txTimeOffsetRelBtsAif30p72M = U2ToInt(ptr[16] << 8 | ptr[17], 16);
    ecpri.rxTimeOffsetRelPrevUpdate30p72M = U2ToInt(ptr[18] << 8 | ptr[19], 16);
    ecpri.txTimeOffsetRelPrevUpdate30p72M = U2ToInt(ptr[20] << 8 | ptr[21], 16);

    return 8;
}
function ecpri_encodeSection255( ecpri, buf, off ) {
    const ptr = new Uint8Array(buf, off);


    ptr[0] = (IntToU2(ecpri.rxTimeOffsetRelBtsAif30p72M, 16) >> 8) & 0xFF;
    ptr[1] =  IntToU2(ecpri.rxTimeOffsetRelBtsAif30p72M, 16)       & 0xFF;
    ptr[2] = (IntToU2(ecpri.txTimeOffsetRelBtsAif30p72M, 16) >> 8) & 0xFF;
    ptr[3] =  IntToU2(ecpri.txTimeOffsetRelBtsAif30p72M, 16)       & 0xFF;

    ptr[4] = (IntToU2(ecpri.rxTimeOffsetRelPrevUpdate30p72M, 16) >> 8) & 0xFF;
    ptr[5] = IntToU2(ecpri.rxTimeOffsetRelPrevUpdate30p72M, 16) & 0xFF;
    ptr[6] = (IntToU2(ecpri.txTimeOffsetRelPrevUpdate30p72M, 16) >> 8) & 0xFF;
    ptr[7] = IntToU2(ecpri.txTimeOffsetRelPrevUpdate30p72M, 16) & 0xFF;

    return 8;
}