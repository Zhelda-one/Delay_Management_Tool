function CreateAntId(rtcId, dir){
    return ( dir ? 0x10000 : 0 ) + rtcId;
}
function AntIdToRtcid(antId){
    return antId < 0x10000 ? antId : antId-2**16;
}

function AntIdToDir(antId){
    return antId < 0x10000 ? 0 : 1;    // 0 - UL, 1 - DL
}