const C_BYTE_ORDER = {
    NETWORK: false,
    BIG_ENDIAN: false,
    LITTLE_ENDIAN: true,
}

class BufferReader{
    /**
     * @param {ArrayBuffer} buffer
     * @param {number} offset
     * @param {number} length
     * @param {boolean | undefined} isLittleEndian
     */
    constructor(buffer, offset, length, isLittleEndian){
        this.buffer = buffer;
        this.isLittleEndian = isLittleEndian;

        this.dataView = new DataView(this.buffer, offset, length);
        this.u8Array = new Uint8Array(this.buffer, offset, length);
        this.offset = 0;

        this.macMap = new Map();
    }

    get length(){
        return this.dataView.byteLength;
    }
    /**
     * Returns the current offset relative to view window
     * @returns {number}
     */
    getLocalOffset(){
        return this.offset;
    }

    /**
     * Returns the current offset relative to buffer start
     * @returns {number}
     */
    getGlobalOffset(){
        return this.dataView.byteOffset + this.offset;
    }

    /**
     * Creates a new view into the data. If length is not provided, the view's length will be shortened by the current offset.
     * @param {number | undefined} length
     * @returns {BufferReader}
     */
    createView(length = undefined){
        const newLength = length || this.dataView.byteLength - this.offset;
        const view = new BufferReader(this.buffer, this.dataView.byteOffset + this.offset, newLength, this.isLittleEndian);
        view.macMap = this.macMap;
        return view;
    }

    /**
     * Checks if the buffer has capacity for specified number of bytes
     * @param length {number} length in bytes
     * @returns {boolean}
     */
    hasCapacity(length){
        return this.offset + length <= this.dataView.byteLength;
    }

    /**
     * @param {boolean | undefined} isLittleEndian
     */
    setByteOrder(isLittleEndian){
        this.isLittleEndian = isLittleEndian;
    }

    /** @returns {number} */
    getU8(){
        const value = this.dataView.getUint8(this.offset);
        this.offset+=1;
        return value;
    }

    /** @returns {number} */
    peekU8(offset=0){
        return this.dataView.getUint8(this.offset + offset);
    }

    /** @returns {number} */
    getI8(){
        const value = this.dataView.getInt8(this.offset);
        this.offset+=1;
        return value;
    }

    /** @returns {number} */
    getU16(){
        const value = this.dataView.getUint16(this.offset, this.isLittleEndian);
        this.offset+=2;
        return value;
    }
    /** @returns {number} */
    getI16(){
        const value = this.dataView.getInt16(this.offset, this.isLittleEndian);
        this.offset+=2;
        return value;
    }

    /** @returns {number} */
    getU32(){
        const value = this.dataView.getUint32(this.offset, this.isLittleEndian);
        this.offset+=4;
        return value;
    }
    /** @returns {number} */
    getI32(){
        const value = this.dataView.getInt32(this.offset, this.isLittleEndian);
        this.offset+=4;
        return value;
    }

    /** @returns {number} */
    getF32(){
        const value = this.dataView.getFloat32(this.offset, this.isLittleEndian);
        this.offset+=4;
        return value;
    }
    /** @returns {number} */
    getF64(){
        const value = this.dataView.getFloat64(this.offset, this.isLittleEndian);
        this.offset+=8;
        return value;
    }

    /** @returns {BigInt} */
    getBI64(){
        const value = this.dataView.getBigInt64(this.offset, this.isLittleEndian);
        this.offset+=8;
        return value;
    }
    /** @returns {BigInt} */
    getBU64(){
        const value = this.dataView.getBigUint64(this.offset, this.isLittleEndian);
        this.offset+=8;
        return value;
    }

    /** @returns {string} */
    getMac() {
        const id = this.dataView.getUint32(this.offset, this.isLittleEndian) + this.dataView.getUint16(this.offset + 4, this.isLittleEndian);

        let mac = '';
        if (this.macMap.has(id)){
            mac = this.macMap.get(id);
        }
        else{
            for (let i = 0; i < 6; ++i) {
                const num = this.dataView.getUint8(this.offset + i);
                if (num <= 0xF) mac += '0';
                mac += num.toString(16);
                if (i < 5) mac += ':';
            }
            this.macMap.set(id, mac);

        }

        this.offset += 6;
        return mac;
    }

    /** @returns {Uint8Array} */
    getU8Array(length){
        const array = new Uint8Array(this.buffer, this.dataView.byteOffset + this.offset, length);
        this.offset += length;
        return array;
    }

}

/**
 * @param {Uint8Array} ptr
 * @param {number} off
 * @returns {number}
 */
function pcap_getU16( ptr, off ) {
    if( pcap_isLittleEndian ) {
        return ( ptr[off] | ptr[off + 1] << 8 ) >>> 0;
    } else {
        return ( ptr[off] << 8 | ptr[off + 1] ) >>> 0;
    }
}

function pcap_getI32( ptr, off ) {
    if( pcap_isLittleEndian ) {
        return ptr[off] | ptr[off + 1] << 8 | ptr[off + 2] << 16 | ptr[off + 3] << 24;
    } else {
        return ptr[off] << 24 | ptr[off + 1] << 16 | ptr[off + 2] << 8 | ptr[off + 3];
    }
}
function pcap_getU32( ptr, off ) {
    if( pcap_isLittleEndian ) {
        return ( ptr[off] | ptr[off + 1] << 8 | ptr[off + 2] << 16 | ptr[off + 3] << 24 ) >>> 0;
    } else {
        return ( ptr[off] << 24 | ptr[off + 1] << 16 | ptr[off + 2] << 8 | ptr[off + 3] ) >>> 0;
    }
}

function pcap_setU16( ptr, off, val ) {
    if( pcap_isLittleEndian ) {
        ptr[off]     = val;
        ptr[off + 1] = val >> 8;
    } else {
        ptr[off]     = val >> 8;
        ptr[off + 1] = val;
    }
}

function pcap_setU32( ptr, off, val ) {
    if( pcap_isLittleEndian ) {
        ptr[off]     = val;
        ptr[off + 1] = val >> 8;
        ptr[off + 2] = val >> 16;
        ptr[off + 3] = val >> 24;
    } else {
        ptr[off]     = val >> 24;
        ptr[off + 1] = val >> 16;
        ptr[off + 2] = val >> 8;
        ptr[off + 3] = val;
    }
}

function pcap_getU64( ptr, off ) {
    let dv = new DataView( ptr.buffer, ptr.byteOffset + off );
    // return BigInt( dv.getUint32( ptr.byteOffset + off, true ) ) << 32n | BigInt( dv.getUint32( ptr.byteOffset + off + 4, true ) );
    return dv.getBigUint64( 0, true );
}

/** @param {Uint8Array} ptr
 *  @param {number} off */
function pcap_getMac( ptr, off ) {
    const idx = ptr[off] + ( ptr[off + 1] << 8 ) + ( ptr[off + 2] << 16 ) + ( ptr[off + 3] << 24 ) + ( ptr[off + 4] * 4294967296 ) + ( ptr[off + 5] * 1099511627776);
    let mac = pcap_macAddMap[idx];
    if( !mac ) {
        mac = '';
        for( let i = 0; i < 6; ++i ) {
            /** @type {number} */
            const num = ptr[off + i];
            if( num <= 0xF ) mac += '0';
            mac += num.toString( 16 );
            if( i < 5 ) mac += ':';
        }
        pcap_macAddMap[idx] = mac;
    }
    return mac;
}

function pcap_setMac( ptr, off, val ) {
    const str = val.split( ':' );
    for( let i = 0; i < 6; ++i ) {
        ptr[off + i] = parseInt( str[i], 16 );
    }
}