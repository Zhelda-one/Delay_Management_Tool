function strToMac(str){
    const split = str.split(':');

    if(split.length > 6){
        logError("strToMac", `Input MAC "${str}" has too many elements`);
    }

    const mac = [0, 0, 0, 0, 0, 0];
    for(let i = 0; i < split.length; ++i){
        const num = parseInt(split[i]);

        if(isNaN(num)){
            logError("strToMac", `Element "${num}" is not a number`);
        }
        mac[i] = num;
    }
    return mac;
}

// Input in a form of array
function macToStr(mac){
    if(mac.length > 6){
        logError("macToStr", `Input MAC "${mac}" has too many elements`);
    }

    while(mac.length < 6){
        mac.push(0);
    }

    const strArr = mac.map(num => num.toString().padStart(2, '0'));
    const str = strArr.join(':');

    return str;
}

function ToSigned_8Bit(unsigned){
    if (unsigned >= 0x80) unsigned = 0x80 - unsigned;
    return unsigned;
}

function ToSigned_24Bit(unsigned){
    if (unsigned >= 0x800000) unsigned = 0x800000 - unsigned;
    return unsigned;
}

function ToUnsigned_24Bit(signed){
    if (signed < 0) signed = 0x800000 - signed;
    return signed;
}

function IntToU2(numb, bits){
    if(numb >= 0) return numb;
    return (2**bits - 1) - Math.abs(numb) + 1;
}
function U2ToInt(numb, bits){
    if((numb & (2**(bits-1))) === 0) return numb;
    return (numb - 1) - (2**bits - 1);
}

function IQFP_to_iq(iqfp){
    const exponent = ((iqfp /(2**14)) & 0b1100) | iqfp & 0b11;
    let i = (iqfp / 2**2) & 0b11111111111111;
    let q = (iqfp / 2**18) & 0b11111111111111;
    i = U2ToInt(i, 14);
    q = U2ToInt(q, 14);
    // if(i<2**14) i -= 2**14;
    // if(q<2**14) q -= 2**14;

    i = (i * 2**exponent);
    q = (q * 2**exponent);
    return {i: i / 2**27, q: q / 2**27};

}

function iq_to_IQFP(i, q){
    const MaxExp = 15;
    const IntMantissa = 13;

    i = parseInt(i * 2**27);
    q = parseInt(q * 2**27);


    const maxV = Math.max(i, q);
    const minV = Math.min(i, q);

    const maxValue = Math.max(maxV, Math.abs(minV)-1);
    const raw_exp = Math.floor(log2(maxValue) +1);
    const exponent = Math.min(Math.max(raw_exp - IntMantissa + 1, 0), MaxExp);


    let iScaled = Math.round( i / 2**exponent );
    let qScaled = Math.round( q / 2**exponent );

    iScaled = IntToU2(iScaled, 14);
    qScaled = IntToU2(qScaled, 14);

    const bits_q = (exponent>>2 & 0b11) | (0b1111111111111100 & (qScaled << 2));
    const bits_i = (exponent & 0b11) | (0b1111111111111100 & (iScaled << 2));

    return (bits_q * (2**16)) + bits_i;
}

function getNumberFromByteArray(arr, byteStart, bitStart, amountOfBits){
    let num = 0;
    for(let i = 0; i < amountOfBits; i++){
        num *= 2;
        num += getBit(arr, byteStart, bitStart + i);
    }
    return num;
}

function getBit(arr, byte, bit) {
    return (arr[parseInt(bit / 8) + byte] >> (7 - (bit%8))) & 1;
}

function interpretQ1_1_14(value) {
    const sign = (value && 0x8000) ? -1 : 1; // Extract sign bit
    const integerPart = (value & 0x4000) >> 14; // Extract 1 integer bit
    const fractionalPart = value & 0x3FFF; // Extract 14 fractional bits
    return sign * (integerPart + fractionalPart / (1 << 14));
}

function interpretQ1_5_2(value) {
    const sign = (value && 0x80) ? -1 : 1; // Extract sign bit
    const integerPart = (value & 0x7C) >> 2; // Extract 5 integer bits
    const fractionalPart = value & 0x03; // Extract 2 fractional bits
    return sign * (integerPart + fractionalPart / (1 << 2));
}