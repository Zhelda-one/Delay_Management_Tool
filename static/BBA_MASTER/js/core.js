'use strict';

const version = 'local';
const updatedAt = formatUpdateAt( Date.now() );
const commitsMessages = '';

const default_frame_structure = {
    'FR1': [ 2, 22, 22, 22, 21, 22, 22, 22, 21, 0,
        22, 22, 22, 22, 21, 22, 22, 22, 21, 0,
        2, 22, 22, 22, 21, 22, 22, 22, 21, 0,
        22, 22, 22, 22, 21, 22, 22, 22, 21, 0 ],
    'FR2': [ 2, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28,  0,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29,
        27, 27, 27, 28, 29, 27, 27, 27, 28, 29 ]
};

const default_beta_factor_re_mask = [ 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF,
                                      0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF,
                                      0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF,
                                      0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF, 0xFFF ];

const configPropToStrMap = {
    'iqCompMethod': {
        0: "No compression",
        1: "Block floating point (BFP)",
        2: "Block scaling",
        3: "u-law",
        4: "Modulation compression",
        5: "BFP + selective RE",
        6: "Mod. comp. + selective RE"
    }
}

const packetPropToStrMap = {
    'ethertype': {
        0x0800: 'IPv4',
        0x0806: 'ARP',
        0x8100: 'VLAN',
        0x86DD: 'IPv6',
        0x88A8: 'QinQ',
        0x88B5: 'eGen',
        0x88F7: 'PTP',
        0x8951: 'BIP',
        0xAEFE: 'eCPRI',
        0xFC3D: 'RoE'
    },
    'ip.proto': {
        1: 'ICMP',
        2: 'IGMP',
        6: 'TCP',
        17: 'UDP',
        132: 'SCTP'
    },
    'bip.type': {
        0: 'Extended header',
        1: 'Streaming traffic',
        2: 'Event Chaining',
        3: 'BICMP',
        4: 'RMWA 22-bit',
        5: 'RMWA 12-bit'
    },
    'ptp.messageType': {
        0x0: 'Sync',
        0x1: 'DelayReq',
        0x2: 'PathDelayReq',
        0x3: 'PathDelayResp',
        0x8: 'FollowUp',
        0x9: 'DelayResp',
        0xA: 'PathDelayFollowUp',
        0xB: 'Announce',
        0xC: 'Signaling',
        0xD: 'Management'
    },
    'roe.target_mem': {
        0: 'SMEM',
        1: 'LLC/DRAM'
    },
    'ecpri.message' : {
        0: 'IQ Data',
        1: 'Bit Sequence',
        2: 'Real-time control data',
        3: 'Generic Data Transfer',
        4: 'Remote Memory Access',
        5: 'Network delay msg',
        6: 'Remote Reset',
        7: 'Event Indication',
        8: 'DL Control',
        9: 'UL Control',
        /*
        8: 'IWF Start-Up',
        9: 'IWF Operation',
        */
        10: 'IWF Mapping',
        11: 'IWF Delay Control',

        64: '7-2e DL',
        65: '7-2e UL'
    },
    'ecpri.dataDir': {
        0: 'UL',
        1: 'DL'
    },
    'rachStatus': {
        0: 'OTHER',
        2: 'MSG2',
        3: 'MSG3',
        4: 'MSG4',
        5: 'MSG5'
    },
    'ecpri.readWrite': {
        0: 'Read',
        1: 'Write',
        2: 'Write_No_Resp',
    },
    'ecpri.requestResponse': {
        0: 'Request',
        1: 'Response',
        2: 'Failure',
    },
    'ecpri.resetCodeOp': {
      1: 'Remote reset request',
      2: 'Remote reset response',
    },
    'ecpri.eventType': {
        0: 'Fault(s) Indication',
        1: 'Fault(s) Indication Acknowledge',
        2: 'Notification(s) Indication',
        3: 'Synchronization Request',
        4: 'Synchronization Acknowledge',
        5: 'Synchronization End Indication',
    },
    'ecpri.faults[0].faultNotification': {
        3072: 'bcn_timestamp',
        3080: 'START',
        3081: 'END',
    },
    'hacrx.severity': {
        0: 'verbose',
        1: 'info',
        2: 'error',
        3: 'fatal error',
    },
    'hacrx.sourceId': {
        0: 'Hac_rx_ctl',
        1: 'Hac_rx_ifi_rdd',
        2: 'Hac_rx_rdd_cd',
        3: 'Hac_rx_rdd_inv',
        4: 'Hac_rx_ifi_ce',
        5: 'Hac_rx_dce_foc',
        6: 'Hac_rx_dce_whi',
        7: 'Hac_rx_dce_fdi',
        8: 'Hac_rx_dce_tdi',
        9: 'Hac_rx_ifi_dat',
        10: 'Hac_rx_dat_whi',
        11: 'Hac_rx_dce_rhh',
        12: 'Hac_rx_dat_cyh',
        13: 'Hac_rx_dce_cd',
        14: 'Hac_rx_dce_inv',
        15: 'Hac_rx_dat_equ',
        16: 'Hac_rx_dat_ftc',
        17: 'Hac_rx_ofi',
        18: 'Hac_rx_rdr_ce',
        19: 'Hac_rx_rdr_dat',
    }
};

const packetPropToValue = {
    'ethertype': numToHex4Upper,
    'l2l1.message': numToHex4Upper,
    'time': convertTimeFormat
};

// In case of add new or change order of names:
//   1. nr_fillIqTypes: Check if index of channel is correct
//   2. channelGroups: add to some group?
function Chn(name, color){
    return {name: name, color: color};
}

// Colors represent 0xBLUE|GREEN|RED channels
const channels = [
    new Chn('ZERO', 0x808080), // 0: Unused or zero

    new Chn('PBCH', 0x00FFFF), // 1: PBCH - Physical Broadcast Channel
    new Chn('PDCCH', 0x00FF00), // 2: PDCCH - Physical Downlink Control Channel
    new Chn('PDSCH', 0xFF0000), // 3: PDSCH - Physical Downlink Shared Channel
    new Chn('PSS', 0xFFFF00), // 4: PSS - Primary synchronization signal
    new Chn('SSS', 0xFF00FF), // 5: SSS - Secondary synchronization signal
    new Chn('PBCH DMRS', 0x0000C6), // 6:  PBCH DM-RS - Demodulation reference signal
    new Chn('PDCCH DMRS', 0x004DFF), // 7: PDCCH DM-RS - Demodulation reference signal
    new Chn('PDSCH DMRS', 0x0000FF), // 8: PDSCH DM-RS - Demodulation reference signal
    new Chn('PDSCH PT-RS', 0x00A5FF), // 9: PDSCH PT-RS - Phase-tracking reference signal
    new Chn('PRS', 0xFFFFFF), // 10: PRS - Positioning reference signal
    new Chn('CSI-RS', 0x336600), // 11: CSI-RS - Channel-state information reference signal
    new Chn('RIM-RS', 0xFFFFFF), // 12: RIM-RS - Remote interference management reference signal

    new Chn('PRACH', 0xFFFFFF), // 13: PRACH - Physical Random Access Channel
    new Chn('PUCCH', 0x00FF00), // 14: PUCCH - Physical Uplink Control Channel
    new Chn('PUSCH', 0xFF0000), // 15: PUSCH - Physical Uplink Shared Channel
    new Chn('PUCCH DM-RS', 0x004DFF), // 16: PUCCH DM-RS - Demodulation reference signal
    new Chn('PUSCH DM-RS', 0x0000FF), // 17: PUSCH DM-RS - Demodulation reference signal
    new Chn('PUSCH PT-RS', 0x00A5FF), // 18: PUSCH PT-RS - Phase-tracking reference signal
    new Chn('SRS', 0x02F4E4), // 19: SRS - Sounding reference signal

    new Chn('PSBCH', 0xFFFFFF), // 20: PSBCH - Physical Sidelink Broadcast Channel
    new Chn('PSCCH', 0xFFFFFF), // 21: PSCCH - Physical Sidelink Control Channel
    new Chn('PSSCH', 0xFFFFFF), // 22: PSSCH - Physical Sidelink Shared Channel
    new Chn('PSFCH', 0xFFFFFF), // 23: PSFCH - Physical Sidelink Feedback Channel
    new Chn('S-PSS', 0xFFFFFF), // 24: S-PSS - Sidelink primary synchronization signal
    new Chn('S-SSS', 0xFFFFFF), // 25: S-SSS - Sidelink secondary synchronization signal
    new Chn('PSBCH DM-RS', 0xFFFFFF), // 26: PSBCH DM-RS - Demodulation reference signal
    new Chn('PSCCH DM-RS', 0xFFFFFF), // 27: PSCCH DM-RS - Demodulation reference signal
    new Chn('PSSCH DM-RS', 0xFFFFFF), // 28: PSSCH DM-RS - Demodulation reference signal
    new Chn('PSSCH PT-RS', 0xFFFFFF),  // 29: PT-RS - Phase-tracking reference signal
    new Chn('S-CSI-RS', 0xFFFFFF), // 30: CSI-RS - Channel-state information reference signal

    new Chn('Hraw', 0x00FF00), // 31: Hraw - complex signed int16 Q1.1.14 Symbol[2] Layer[2] Beam[4] PRB[16] SC[12] - 3 pkts / struct
    new Chn('RxData', 0xFF0000), // 32: RxData - complex signed int16 Q1.1.14 Beam[4] Symbol[14] PRB[16] SC[12] - 11 pkts / struct
    new Chn('TxPilot', 0x0000FF), // 33: TxPilot - complex signed int16 Q1.1.14 Symbol[2] Layer[2] PRB[16] SC[12] - 1 pkt / struct
];

const channelGroups = {
    'DL': [ 'PBCH', 'PDCCH', 'PDSCH', 'PSS', 'SSS', 'PBCH DMRS', 'PDCCH DMRS', 'PDSCH DMRS', 'PDSCH PT-RS', 'PRS', 'CSI-RS', 'RIM-RS' ],
    'UL': [ 'PRACH', 'PUCCH', 'PUSCH', 'PUCCH DM-RS', 'PUSCH DM-RS', 'PUSCH PT-RS', 'SRS' ],
    'SL': [ 'PSBCH', 'PSCCH', 'PSSCH', 'PSFCH', 'S-PSS', 'S-SSS', 'PSBCH DM-RS', 'PSCCH DM-RS', 'PSSCH DM-RS', 'PSSCH PT-RS', 'S-CSI-RS' ],
    'DeepRX': [ 'Hraw', 'RxData', 'TxPilot' ],
};

const bitMask = [ 0, 0x1, 0x3, 0x7, 0xF, 0x1F, 0x3F, 0x7F, 0xFF, 0x1FF, 0x3FF, 0x7FF, 0xFFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF ];

let packets = [];
let packetsLength = 0;
let packetsLengthOld = 0; // old packets length, allow to track packets added by aggregate mode
let totalPayloadSize = 0; // payload size of currently loaded packets

let packetsPayloadBuffer = null; // Single ArrayBuffer for all packets with appropriate offset in packetsPayloadOffset
let packetsPayloadOffset = [];

// let currentPacketsFilter = '';
let filteredPacketsIds = [];
let filteredPacketsIds_set = new Set();
let filteredPacketsIdsLength = 0;

let sortColumn = 'id';
let sortMode = 0; // 0 - ascending; 1 - descending
let sortedPacketsIds = [];
let sortedPacketsIdsLength = 0;

/* IQ Structure:
    numerology: 0 - 15kHz, 1 - 30kHz, 2 - 60 kHz, 3 - 120kHz, 4 - 240kHz, 5 - 480kHz
                6 - 1.25kHz, 7 - 3.75kHz, 8 - 5kHz, 9 - 7.5kHz
    antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId; // map
    finalSubframe = hfn * 2560 + frame * 10 + subframe // TODO: ? hfn -> 10240
    finalSymbol = slot * 14 + symbol

    // All samples saved in buffers per antId per numerology in order I, Q, I, Q, I, Q
    iqBuffers[u][antId] = new Float32Array()
    // Offsets saved in number of samples
    iqOffsets[u][antId][finalSubframe] = new Uint32Array( NUM_OF_SYM_IN_SF_PER_U[u] )
    iqNumPrb[u][antId][finalSubframe] = new Uint16Array( NUM_OF_SYM_IN_SF_PER_U[u] )

    const iqBuf = iqBuffers[u][antId];
    const iqBufOff = iqOffsets[u][antId][finalSubframe][finalSymbol];
    const iq = new Float32Array( iqBuf.buffer, iqBufOff * 4, iqNumPrb[u][antId][finalSubframe][finalSymbol] * 24 );
 */
const NUM_OF_U = 10;
const NUM_OF_SLOTS_PER_U = [1, 2, 4, 8, 16, 32, 1, 1, 1, 1];
const NUM_OF_SYM_IN_SLOT_PER_U = [14, 14, 14, 14, 14, 14, 1, 3, 4, 6];
const NUM_OF_SYM_IN_SF_PER_U = [14, 28, 56, 112, 224, 448, 1, 3, 4, 6];  // TODO: check num of symbols for 1.25 & 3.75 SCS
const MAX_RB_IN_SYM = 273;
const NUM_OF_SF_IN_FRAME = 10;
const NUM_OF_SYM_IN_SLOT = 14;
const NUM_OF_RE_IN_RB = 12; //Resource Elements in Resource Block
const MAX_RE_IN_SYM = NUM_OF_RE_IN_RB * MAX_RB_IN_SYM;
const IQ_TYPE_REPETITION_PERIOD = 160;


let iqBuffers = new Array( NUM_OF_U ).fill( null );
let iqOffsets = new Array( NUM_OF_U ).fill( null );
let iqNumPrb = new Array( NUM_OF_U ).fill( null );
let iqStartPrb = new Array( NUM_OF_U ).fill( null );
let iqTypeBuffers = new Array( NUM_OF_U ).fill( null );
let iqFirstSubframe = new Array( NUM_OF_U ).fill( null );

// TODO: moved for Node.js compatibility
let packet_places = new Array( NUM_OF_U );
let fcp_places = new Array( NUM_OF_U );

let captureFileContents;

function formatBytes( bytes ) {
    if( bytes === 0 ) return '0 Bytes';
    const k = 1000; // TODO: 1024 or 1000
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor( Math.log( bytes ) / Math.log( k ) );
    return parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( 3 ) ) + ' ' + sizes[i];
}

let fftBuffers = new Array( NUM_OF_U ).fill( null );
let fftTypeBuffers = new Array( NUM_OF_U ).fill( null );

let time_i = {};
let time_q = {};

function copyObject( obj ) { return JSON.parse( JSON.stringify( obj ) ); }
function roundTo( num, fix ) { return Number( num.toFixed( fix ) ); }
function clamp( num, min, max ) { return Math.min( Math.max( num, min ), max ); }
function iqToAngle( i, q ) {
    let angle = Math.atan2( q, i ) * 180 / Math.PI;
    if( angle < 0 ) angle += 360;
    return angle;
}
function u16ToDb( value ) {
    if( value >= 0x8000 ) value -= 0x10000;
    return value / 100.0;
}

function degToRad( deg ) { return deg * Math.PI / 180.0; }

function returnMaxIntIfUndefined( value ) {
    if( typeof value === 'undefined' ) return Number.MAX_SAFE_INTEGER;
    return value;
}

function indexOfMaxValue( arr ) {
    let idx = 0;
    let max = Number.MIN_SAFE_INTEGER;
    const len = arr.length;
    for( let i = 0; i < len; ++i ) {
        if( arr[i] > max ) {
            max = arr[i];
            idx = i;
        }
    }
    return idx;
}

function perfToMsFrom( perf ) { return ( performance.now() - perf ).toFixed( 2 ) + ' ms'; }

function formatUpdateAt( time ) {
    const d = new Date( time );
    let month = d.getMonth() + 1;
    if( month < 10 ) month = '0' + month;
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

    let elapsed = ( Date.now() - time ) / 1000 ;
    let elapsedUnit = '';
    if( elapsed < 60 ) {
        elapsed = Math.round( elapsed );
        elapsedUnit = ( elapsed <= 1 ? 'second' : 'seconds' );
    } else if( elapsed < 60 * 60 ) {
        elapsed = Math.round( elapsed / 60 );
        elapsedUnit = ( elapsed <= 1 ? 'minute' : 'minutes' );
    } else if( elapsed < 60 * 60 * 24 ) {
        elapsed = Math.round( elapsed / ( 60 * 60 ) );
        elapsedUnit = ( elapsed <= 1 ? 'hour' : 'hours' );
    } else {
        elapsed = Math.round( elapsed / ( 60 * 60 * 24 ) );
        elapsedUnit = ( elapsed <= 1 ? 'day' : 'days' );
    }

    return `${ d.getFullYear() }-${ month }-${ day } ${ hour }:${ minutes } (${ elapsed } ${ elapsedUnit } ago)`;
}

function numToHex4( num ) {
    const numStr = num.toString( 16 );
    if( num <= 0xF ) return `0x000${ numStr }`;
    else if( num <= 0xFF ) return `0x00${ numStr }`;
    else if( num <= 0xFFF ) return `0x0${ numStr }`;
    else return `0x${ numStr }`;
}

function numToHex4Upper( num ) {
    const numStr = num.toString( 16 ).toUpperCase();
    if( num <= 0xF ) return `0x000${ numStr }`;
    else if( num <= 0xFF ) return `0x00${ numStr }`;
    else if( num <= 0xFFF ) return `0x0${ numStr }`;
    else return `0x${ numStr }`;
}

function convertTimeFormat(num, isTrace, packetNum){
    if(!isTrace) return num;
    if(time_format_display === 0) return num;
    if(time_format_display === 1) { //Start
        return packets[packetNum].time.diff(packets[0].time).toString();
    }
    if(time_format_display === 2) { //Time
        const tmp = packets[packetNum].time.toTimeFormat().split(':');
        return tmp[tmp.length-1];
    }
    if(time_format_display === 3) { //Date
        return packets[packetNum].time.toTimeFormat();
    }
    if(time_format_display === 4) { //Delay
        return packetNum === 0 ? packets[packetNum].time : packets[packetNum].time.diff(packets[packetNum - 1].time).toString();
    }

}

function secondsToDateFormat(seconds){
    let d = new Date(seconds * 1000);
    let str = d.toISOString().replace('T', ' ').replace('Z', '');
    const microseconds = seconds%1*1000 % 1 * 1000;
    if(microseconds > 0){
        str += 'm' + parseInt(microseconds);
        const nanoseconds = microseconds % 1 * 1000;
        if(nanoseconds > 0){
            str += 'u' + parseInt(nanoseconds) + 'n';
        }
    }
    return str;
}

/**
 * @param {FileFormatInfo} fileFormat
 * @returns {boolean}
 */
function isPacketFileType( fileFormat ) {
    return fileFormat.fileContents === Enum_FileContents.PACKETS
        || fileFormat.fileContents === Enum_FileContents.SAMPLES_AND_PACKETS; }

function printMemoryStats() {
    if( window.performance.memory ) {
        console.log( `-- Memory stats: used ${ formatBytes( window.performance.memory.usedJSHeapSize ) }, total ${ formatBytes( window.performance.memory.totalJSHeapSize ) }` );
    }
}

function resetGlobals() {
    packets = [];
    packetsLength = 0;
    packetsLengthOld = 0;
    packetsPayloadBuffer = null;
    packetsPayloadOffset = [];
    // currentPacketsFilter = '';
    filteredPacketsIds = [];
    filteredPacketsIdsLength = 0;
    sortColumn = 'id';
    sortMode = 0;
    sortedPacketsIds = [];
    sortedPacketsIdsLength = 0;
    fragmentedPkts = {};
    packet_errors_list = {};
    packet_warnings_list = {};
    packetTable_columnTypes = {};

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            for( const antId in iqBuffers[u] ) {
                const iqOffsets_ant = iqOffsets[u][antId];
                const iqNumPrb_ant = iqNumPrb[u][antId];
                for( const sfStr in iqOffsets_ant ) {
                    const sf = Number(sfStr);

                    const iqOffsets_sf = iqOffsets_ant[sf];
                    const iqNumPrb_sf = iqNumPrb_ant[sf];
                    if( iqOffsets_sf ) {
                        iqOffsets_sf[sf] = null;
                        iqNumPrb_sf[sf] = null;
                    }
                }
                iqBuffers[u][antId] = null;
                iqOffsets[u][antId] = null;
                iqNumPrb[u][antId] = null;
                iqStartPrb[u][antId] = null;
            }
            iqBuffers[u] = null;
            iqOffsets[u] = null;
            iqNumPrb[u] = null;
            iqStartPrb[u] = null;
            iqFirstSubframe[u] = null;
        }
    }

    iqTypeBuffers = new Array( NUM_OF_U ).fill( null );
    iqFirstSubframe = new Array( NUM_OF_U ).fill( null );

    for( const antId in time_i ) {
        time_i[antId] = null;
        time_q[antId] = null;
    }
    time_i = {};
    time_q = {};

    printMemoryStats();
}

/**
 * @param {ArrayBuffer | string} fileBuffer
 * @param {FileFormatInfo} fileFormat
 * @returns {boolean}
 */
function loadFile( fileBuffer, fileFormat ) {
    const perfNow = performance.now();
    if( !config.load.aggregateMode ) resetGlobals();

    reGrid_invalidateCache();   //TODO; need a second resetGlobals() function, one for normal loads and one for aggregate mode

    statistics.add_parameters_to_session({
        type: config.load.fileType,
        size: fileBuffer.byteLength,
        loading_start_time: (new Date()).getTime(),
    })

    packetsLengthOld = packetsLength;
    totalPayloadSize = 0;

    // Decode file
    if(fileFormat.dataFormat === Enum_DataFormat.BINARY){
        const bufferReader = new BufferReader( fileBuffer, 0, fileBuffer.byteLength, C_BYTE_ORDER.NETWORK );
        const decodeSuccess = fileFormat.decodeFn(bufferReader);
        if(decodeSuccess === false) return false;
    } else if(fileFormat.dataFormat === Enum_DataFormat.TEXT){
        const decodeSuccess = fileFormat.decodeFn(fileBuffer);
        if(decodeSuccess === false) return false;
    } else {
        throw new Error("Unknown file data format");
    }

    processData();

    logInfo( 'Core', `File loaded. Took: ${ perfToMsFrom( perfNow ) }` +
        ( window.performance.memory ? ( `. Memory usage: ${ formatBytes( window.performance.memory.totalJSHeapSize ) }` ) : '' ) );
    statistics.add_parameters_to_session({loading_end_time: (new Date()).getTime()});
    statistics.post_to_statistics_server();
    return true;
}

function processData(){
    const perfNow2 = performance.now();

    if(!config.load.skipTimingGeneration && !config.load.fileType.includes('cpri')) generateTimingValues();

    if( packetsLength !== packetsLengthOld ) {

        if( packetsPayloadOffset.length !== packetsLength ) {
            const oldLength = packetsPayloadOffset.length;
            packetsPayloadOffset.length = packetsLength;
            packetsPayloadOffset.fill( -1, oldLength );
        }

        const currentFilter = packetsTab_header_filterInput.value
        if(currentFilter === ''){ //To skip sorting when no filter is used
            filteredPacketsIds = [...Array(packetsLength).keys()];
            sortedPacketsIds = [...filteredPacketsIds];

            filteredPacketsIdsLength = filteredPacketsIds.length;
            sortedPacketsIdsLength = sortedPacketsIds.length;
        }
        else filterPackets( packetsTab_header_filterInput.value );
    }

    calculateMsg4Timings(packets.filter((packet) => (packet.ecpri !== undefined) && (packet.ecpri.message === 4)))

    packetTable_generateColumnNames_all();

    if(config.load.swapIq && !config.load.timeDomain)
        swapIq();

    logDebug( 'Core', `processData took ${ perfToMsFrom( perfNow2 ) }` );
}

function sleep( ms ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
}

const byteToAsciiWeb = [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    ' ', '!', '&quot;', '#', '$', '%', '&amp;', '&apos;', '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '&lt;', '=', '&gt;', '?',
    '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
    '@', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '' ];
