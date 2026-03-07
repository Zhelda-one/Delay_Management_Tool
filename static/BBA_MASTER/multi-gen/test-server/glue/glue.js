// START GLUE CODE

const { inspect } = require("node:util");

let packetPropToStrMap = {};
let packetEnumMap = null;

let l2l1_ptr = null;
let l2l1_dv = null;

function runTests() {
    const errors = [];
    let i = 0;

    for (const message of messages) {
        l2l1_ptr = message.payload;
        l2l1_dv = new DataView(message.payload.buffer);

        try {
            l2l1_decode_msg(message);
        } catch (e) {
            const Reason = typeof e === "string" ? e : e.message;
            errors.push({ Reason, Message: message.message, PacketId: i });
        }

        i++;
    }

    console.log(JSON.stringify({
        TotalTests: i,
        FailedTests: errors,
    }));
}

function l2l1_getU8( offset ) {
    if(l2l1_ptr.length <= offset) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return l2l1_ptr[offset];
}

function l2l1_getU16( offset ) {
    if(l2l1_ptr.length <= offset + 1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8;
}

function l2l1_getU32( offset ) {
    if(l2l1_ptr.length <= offset + 3) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 3) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return ( l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8 | l2l1_ptr[offset + 2] << 16 | l2l1_ptr[offset + 3] << 24 ) >>> 0;
}

function l2l1_getU64( offset ) {
    if(l2l1_dv.length <= offset + 7) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 7) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return l2l1_dv.getBigUint64( offset, true );
}

function l2l1_getI8( offset ) {
    if(l2l1_ptr.length <= offset) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let num = l2l1_ptr[offset];
    return ( num & 0x80 ) ? num - 0x100 : num;
}

function l2l1_getI16( offset ) {
    if(l2l1_ptr.length <= offset + 1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let num = l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8;
    return ( num & 0x8000 ) ? num - 0x10000 : num;
}

function l2l1_getI32( offset ) {
    if(l2l1_ptr.length <= offset + 3) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 3) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8 | l2l1_ptr[offset + 2] << 16 | l2l1_ptr[offset + 3] << 24;
}

function l2l1_getI64( offset ) {
    if(l2l1_dv.byteLength <= offset + 8-1) throw new Error("Offset is out of bounds!");
    return l2l1_dv.getBigInt64( offset, true );
}

function l2l1_getF32( offset ) {
    if(l2l1_dv.byteLength <= offset + 3) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + 3) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    return l2l1_dv.getFloat32( offset, true );
}

function l2l1_getU8Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( l2l1_ptr[offset + i] );
    }
    return arr;
}

function l2l1_getU16Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count*2-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count*2-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8 );
        offset += 2;
    }
    return arr;
}

function l2l1_getU32Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count*4-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count*4-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( ( l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8 | l2l1_ptr[offset + 2] << 16 | l2l1_ptr[offset + 3] << 24 ) >>> 0 );
        offset += 4;
    }
    return arr;
}

// TODO: implement
function l2l1_getU64Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count*4-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count*4-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( ( l2l1_ptr[offset] | l2l1_ptr[offset + 1] << 8 | l2l1_ptr[offset + 2] << 16 | l2l1_ptr[offset + 3] << 24 ) >>> 0 );
        offset += 4;
    }
    return arr;
}

function l2l1_getI16Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count*2-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count*2-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( l2l1_getI16( offset ) );
        offset += 2;
    }
    return arr;
}

function l2l1_getF32Array( offset, count ) {
    if(l2l1_ptr.length <= offset + count*4-1) throw new Error("Offset is out of bounds!");
    // if(l2l1_ptr.length <= offset + count*4-1) {
    //     l2l1_error_flag = true;
    //     return NaN;
    // }
    let arr = [];
    for( let i = 0; i < count; ++i ) {
        arr.push( l2l1_dv.getFloat32( offset, true ) );
        offset += 4;
    }
    return arr;
}

function l2l1_putU8(num, buf, off) {
    buf[off] = num & 0xFF;
}

function l2l1_putI8(num, buf, off) {
    buf[off] = num & 0xFF;
}

function l2l1_putU16(num, buf, off) {
    buf[off] = num & 0xFF;
    buf[off + 1] = num >> 8 & 0xFF;
}

function l2l1_putI16(num, buf, off) {
    buf[off] = num & 0xFF;
    buf[off + 1] = num >> 8 & 0xFF;
}

function l2l1_putU32(num, buf, off) {
    buf[off] = num & 0xFF;
    buf[off + 1] = num >> 8 & 0xFF;
    buf[off + 2] = num >> 16 & 0xFF;
    buf[off + 3] = num >> 24 & 0xFF;
}

function l2l1_putI32(num, buf, off) {
    buf[off] = num & 0xFF;
    buf[off + 1] = num >> 8 & 0xFF;
    buf[off + 2] = num >> 16 & 0xFF;
    buf[off + 3] = num >> 24 & 0xFF;
}

function l2l1_putU64(num, buf, off) {
    const mask = 255n; // 0xFF
    buf[off] = Number(num & mask);
    buf[off + 1] = Number(num >> 8n & mask);
    buf[off + 2] = Number(num >> 16n & mask);
    buf[off + 3] = Number(num >> 24n & mask);
    buf[off + 4] = Number(num >> 32n & mask);
    buf[off + 5] = Number(num >> 40n & mask);
    buf[off + 6] = Number(num >> 48n & mask);
    buf[off + 7] = Number(num >> 56n & mask);
}

function l2l1_putI64(num, buf, off) {
    const mask = 255n; // 0xFF
    buf[off] = Number(num & mask);
    buf[off + 1] = Number(num >> 8n & mask);
    buf[off + 2] = Number(num >> 16n & mask);
    buf[off + 3] = Number(num >> 24n & mask);
    buf[off + 4] = Number(num >> 32n & mask);
    buf[off + 5] = Number(num >> 40n & mask);
    buf[off + 6] = Number(num >> 48n & mask);
    buf[off + 7] = Number(num >> 56n & mask);
}

function l2l1_putF32(num, buf, off) {
    const view = new DataView(buf.buffer, off);
    view.setFloat32(0, num, true);
}

function l2l1_putF64(num, buf, off) {
    const view = new DataView(buf.buffer, off);
    view.setFloat64(0, num, true);
}

runTests();

// END GLUE CODE
