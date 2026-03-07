//   The calculator for the constants below
// let ecpri_decompressMove = [ [] ];
// let ecpri_decompressShift = [ [] ];
// let ecpri_decompressMask = [ 0 ];
// for( let iqBitWidth = 1; iqBitWidth <= 16; ++iqBitWidth ) {
//     let curSize = 32;
//     let move = [];
//     let shift = [];
//     for (let i = 0; i < 24; ++i) {
//         let m = 0;
//         if (curSize < iqBitWidth) {
//             m = 1;
//             curSize += 16;
//         }
//         curSize -= iqBitWidth;
//         move.push(m);
//         shift.push(curSize);
//     }
//     ecpri_decompressMove.push( move );
//     ecpri_decompressShift.push( shift );
//     ecpri_decompressMask.push( ( 1 << iqBitWidth ) - 1 );
// }
// console.log( ecpri_decompressMove );
// console.log( ecpri_decompressShift );
// console.log( ecpri_decompressMask );

const ecpri_decompressMove = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const ecpri_decompressShift = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
    [30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 14, 12, 10, 8, 6, 4, 2, 0],
    [29, 26, 23, 20, 17, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3, 0, 13, 10, 7, 4, 1, 14, 11, 8],
    [28, 24, 20, 16, 12, 8, 4, 0, 12, 8, 4, 0, 12, 8, 4, 0, 12, 8, 4, 0, 12, 8, 4, 0],
    [27, 22, 17, 12, 7, 2, 13, 8, 3, 14, 9, 4, 15, 10, 5, 0, 11, 6, 1, 12, 7, 2, 13, 8],
    [26, 20, 14, 8, 2, 12, 6, 0, 10, 4, 14, 8, 2, 12, 6, 0, 10, 4, 14, 8, 2, 12, 6, 0],
    [25, 18, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8],
    [24, 16, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0],
    [23, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9, 0, 7, 14, 5, 12, 3, 10, 1, 8],
    [22, 12, 2, 8, 14, 4, 10, 0, 6, 12, 2, 8, 14, 4, 10, 0, 6, 12, 2, 8, 14, 4, 10, 0],
    [21, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8],
    [20, 8, 12, 0, 4, 8, 12, 0, 4, 8, 12, 0, 4, 8, 12, 0, 4, 8, 12, 0, 4, 8, 12, 0],
    [19, 6, 9, 12, 15, 2, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2, 5, 8],
    [18, 4, 6, 8, 10, 12, 14, 0, 2, 4, 6, 8, 10, 12, 14, 0, 2, 4, 6, 8, 10, 12, 14, 0],
    [17, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ecpri_decompressMask = [ 0, 0x1, 0x3, 0x7, 0xF, 0x1F, 0x3F, 0x7F, 0xFF, 0x1FF, 0x3FF, 0x7FF, 0xFFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF ];

const IQ_COMPRESSION_METHODS = {
    NO_COMPRESSION: 0,
    BLOCK_FLOATING_POINT: 1,
    BLOCK_SCALING: 2,
    U_LAW: 3,
    MODULATION_COMPRESSION: 4,
    BFP_SELECTIVE_RE: 5,
    MOD_COMP_SELECTIVE_RE: 6,
    MADE1_RADIO: 15 // Nokia Proprietary
};

function iq_getMaxValue(iqCompMethod, iqBitWidth, iqScalingMode) {
    let maxValue = ( 1 << ( iqBitWidth - 1 ) ) - 1;
    if( iqCompMethod === IQ_COMPRESSION_METHODS.BLOCK_FLOATING_POINT || iqCompMethod === IQ_COMPRESSION_METHODS.BFP_SELECTIVE_RE )
        maxValue =
            1 << ( iqBitWidth - 1 + ( iqScalingMode === 1 ? 15 : 16 - iqBitWidth ) );
    return maxValue;
}

class IqDecoder{

    iqU16 = new Uint16Array( 2 * NUM_OF_RE_IN_RB );
    iqF32 = new Float32Array( 2 * MAX_RE_IN_SYM );
    modCompCsf = new Uint8Array( MAX_RE_IN_SYM ).fill( 1 );
    modCompScaler = new Float32Array( MAX_RE_IN_SYM ).fill( 1.0 );

    constructor(iqScalingMode) {
        this.iqScalingMode = iqScalingMode;

        this.setCompression(IQ_COMPRESSION_METHODS.NO_COMPRESSION, 0)
    }

    setCompression(iqCompMethod, iqBitWidth){
        this.iqCompMethod = iqCompMethod;
        this.iqBitWidth = iqBitWidth

        this.updateParameters();
    }

    updateParameters(){
        this.modCompShift = 2 ** -this.iqBitWidth;

        this.signDiff = 1 << this.iqBitWidth;
        this.signMask = this.signDiff >> 1;
        this.maxValue = iq_getMaxValue(this.iqCompMethod, this.iqBitWidth, this.iqScalingMode);


        this.decompressMove = ecpri_decompressMove[this.iqBitWidth];
        this.decompressShift = ecpri_decompressShift[this.iqBitWidth];
        this.decompressMask = ecpri_decompressMask[this.iqBitWidth];
    }

    decode(inU8, outF32, outIqOff, bitWidthOverride, compShiftIn, prb){
        const initialIqDataOff = [0, 1, 1, 1, 0, 2, 2][this.iqCompMethod];
        let iqDataOffset = initialIqDataOff;

        let sReSMask = null;
        let squared_amplitude_sum = 0;

        let u32 = ( inU8[initialIqDataOff] << 24 | inU8[initialIqDataOff + 1] << 16 | inU8[initialIqDataOff + 2] << 8 | inU8[initialIqDataOff + 3] ) >>> 0;
        let u32off = initialIqDataOff + 4;
        if( this.iqCompMethod === IQ_COMPRESSION_METHODS.BFP_SELECTIVE_RE || this.iqCompMethod === IQ_COMPRESSION_METHODS.MOD_COMP_SELECTIVE_RE ) {
            sReSMask = ( inU8[0] & 0xF0 ) << 4 | inU8[1];
            const sReSMaskArr = [ 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x100, 0x200, 0x400, 0x800 ];
            let j = 0;
            for( let r = 0, i = 0; r < 12; ++r ) {
                if( sReSMask & sReSMaskArr[r] ) {
                    if( this.decompressMove[j] ) { u32 = u32 << 16 | inU8[u32off++] << 8 | inU8[u32off++]; }
                    this.iqU16[i++] = ( u32 >> this.decompressShift[j++] ) & this.decompressMask;
                    if( this.decompressMove[j] ) { u32 = u32 << 16 | inU8[u32off++] << 8 | inU8[u32off++]; }
                    this.iqU16[i++] = ( u32 >> this.decompressShift[j++] ) & this.decompressMask;
                } else {
                    this.iqU16[i++] = 0;
                    this.iqU16[i++] = 0;
                }
            }
            iqDataOffset += Math.ceil( ( j * this.iqBitWidth ) / 8 );
        } else {
            if( this.iqCompMethod === IQ_COMPRESSION_METHODS.U_LAW ) {
                this.setCompression(this.iqCompMethod, bitWidthOverride);
            }
            for( let i = 0; i < 24; ) {
                if( this.decompressMove[i] ) { u32 = u32 << 16 | inU8[u32off++] << 8 | inU8[u32off++]; }
                this.iqU16[i] = ( u32 >> this.decompressShift[i++] ) & this.decompressMask;
                if( this.decompressMove[i] ) { u32 = u32 << 16 | inU8[u32off++] << 8 | inU8[u32off++]; }
                this.iqU16[i] = ( u32 >> this.decompressShift[i++] ) & this.decompressMask;
            }
            iqDataOffset += this.iqBitWidth * 3;
        }

        let udCompParam = 0;
        let amp = 0;
        let sblockScaler = null;
        let exponent = null;

        switch( this.iqCompMethod ) {
            case IQ_COMPRESSION_METHODS.NO_COMPRESSION:
                for( let i = 0; i < 24; ) {
                    let sampleI = this.iqU16[i++];
                    if( sampleI & this.signMask ) sampleI -= this.signDiff;
                    let sampleQ = this.iqU16[i++];
                    if( sampleQ & this.signMask ) sampleQ -= this.signDiff;
                    amp = sampleI * sampleI + sampleQ * sampleQ;
                    squared_amplitude_sum += amp;
                    outF32[outIqOff++] = sampleI / this.maxValue;
                    outF32[outIqOff++] = sampleQ / this.maxValue;
                }
                break;
            case IQ_COMPRESSION_METHODS.BLOCK_FLOATING_POINT:
            case IQ_COMPRESSION_METHODS.BFP_SELECTIVE_RE:
                exponent = udCompParam = inU8[0];
                for( let i = 0; i < 24; ) {
                    let sampleI = this.iqU16[i++];
                    if( sampleI & this.signMask ) sampleI -= this.signDiff;
                    sampleI <<= udCompParam;
                    let sampleQ = this.iqU16[i++];
                    if( sampleQ & this.signMask ) sampleQ -= this.signDiff;
                    sampleQ <<= udCompParam;
                    amp = sampleI * sampleI + sampleQ * sampleQ;
                    squared_amplitude_sum += amp;
                    outF32[outIqOff++] = sampleI / this.maxValue;
                    outF32[outIqOff++] = sampleQ / this.maxValue;
                }
                break;
            case IQ_COMPRESSION_METHODS.BLOCK_SCALING:
                sblockScaler = udCompParam = inU8[0];
                const div = 2 ** ( this.iqBitWidth - 9 );
                for( let i = 0; i < 24; ) {
                    let sampleI = this.iqU16[i++];
                    if( sampleI & this.signMask ) sampleI -= this.signDiff;
                    sampleI = Math.round( udCompParam * sampleI / div );
                    let sampleQ = this.iqU16[i++];
                    if( sampleQ & this.signMask ) sampleQ -= this.signDiff;
                    sampleQ = Math.round( udCompParam * sampleQ / div );
                    amp = sampleI * sampleI + sampleQ * sampleQ;
                    squared_amplitude_sum += amp;
                    outF32[outIqOff++] = sampleI / this.maxValue;
                    outF32[outIqOff++] = sampleQ / this.maxValue;
                }
                break;
            case IQ_COMPRESSION_METHODS.U_LAW:
                const compShift = compShiftIn;
                const absMask = this.signMask - 1;
                const comp1 = 1 << ( this.iqBitWidth - 2 );
                const comp2 = comp1 + 1 << ( this.iqBitWidth - 3 );
                const absBitWidth = 15;
                const m1 = 1 << ( absBitWidth - this.iqBitWidth );
                const m2 = m1 << 1;
                const m3 = m2 << 1;
                for( let i = 0; i < 24; ) {
                    let sampleI = this.iqU16[i++];
                    const signI = sampleI & this.signMask;
                    const absI = sampleI & absMask;
                    if( absI <= comp1 ) sampleI = absI * m1;
                    else if( absI <= comp2 ) sampleI = absI * m2 - 8192;
                    else sampleI = absI * m3 - 32768;
                    if( signI ) sampleI -= this.signDiff;
                    sampleI >>= compShift;

                    let sampleQ = this.iqU16[i++];
                    const signQ = sampleQ & this.signMask;
                    const absQ = sampleQ & absMask;
                    if( absQ <= comp1 ) sampleQ = absQ * m1;
                    else if( absQ <= comp2 ) sampleQ = absQ * m2 - 8192;
                    else sampleQ = absQ * m3 - 32768;
                    if( signQ ) sampleQ -= this.signDiff;
                    sampleQ >>= compShift;

                    amp = sampleI * sampleI + sampleQ * sampleQ;
                    squared_amplitude_sum += amp;
                    outF32[outIqOff++] = sampleI / this.maxValue;
                    outF32[outIqOff++] = sampleQ / this.maxValue;
                }
                break;
            case IQ_COMPRESSION_METHODS.MODULATION_COMPRESSION:
            case IQ_COMPRESSION_METHODS.MOD_COMP_SELECTIVE_RE:
                // const lnkPktIdx = ecpri_pktLinks[pktIdx]; // linked c-plane packet
                // if( lnkPktIdx !== -1 ) {
                //     for( const cSect of lnkPktIdx.ecpri.sections ) {
                //         if( sect.sectionId === cSect.sectionId ) {
//
                //             break;
                //         }
                //     }
                // }
                // TODO: modulation compression

                const prbToRe = prb * 12;
                let i = 0;
                for( let reIdx = 0; reIdx < 12; ++reIdx ) {
                    let sampleI = this.iqU16[i++];
                    if( sampleI & this.signMask ) sampleI -= this.signDiff;
                    let sampleQ = this.iqU16[i++];
                    if( sampleQ & this.signMask ) sampleQ -= this.signDiff;
                    const gRe = prbToRe + reIdx;
                    sampleI /= this.maxValue;
                    sampleQ /= this.maxValue;
                    if( this.modCompCsf[gRe] ) {
                        sampleI += this.modCompShift;
                        sampleQ += this.modCompShift;
                    }
                    sampleI *= this.modCompScaler[gRe];
                    sampleQ *= this.modCompScaler[gRe];

                    amp = sampleI * sampleI + sampleQ * sampleQ;
                    squared_amplitude_sum += amp;
                    outF32[outIqOff++] = sampleI;
                    outF32[outIqOff++] = sampleQ;
                }

                break;
        }
        return {amp, offset: iqDataOffset, sReSMask, exponent, sblockScaler, squared_amplitude_sum};
    }

}