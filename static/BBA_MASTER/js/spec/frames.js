// Frame classes for transforming logical structure into bytes.

const DEFAULT_ENDIANNESS = 'BIG';

function mask(bits, shift=0){
    return (2**bits-1) << shift;
}

class Frame {
    /*
        # Generic frame class for keeping logical structure and conversion to bits.
        # Acting as an object allows for easy access to logical fields and
        # straightforward saving to JSON.
    */

    constructor(endian = DEFAULT_ENDIANNESS) {
        this._content = [];
        this._endian = endian;  //TODO: should not be a string
        this._pos = 0;
        //this.logical = {};
        this._readonly = false;
    }

    add_field(name, value, bits, parent) {
        // Adds field of size specified in bits and fills it with content.
        this.check_readonly();
        this.add_logical(name, value, parent);

        if (typeof (value) === "object") {
            // convert list to integer
            let array = value.slice();
            if (this._endian === 'BIG') array = array.reverse();

            let int_value = 0;
            for (let i = 0; i < array.length; ++i) {
                int_value += value[i] << 8 * i;
            }

            value = int_value;
        }

        if (bits > 0) {
            value &= mask(bits);
            while (bits > 0) {
                if (this._pos === this._content.length * 8) {
                    this._content.push(0);
                }
                const shift = 8 - (this._pos % 8);
                const written = Math.min(bits, shift);
                this._content[this._content.length - 1] |= ((value >> (bits - written))
                    << (shift - written));
                this._pos += written;
                bits -= written;
                value &= mask(bits);
            }
        } else {
            this._pos += bits;
        }
    }

    add_word(name, word, size, parent) {
        // Adds word of size specified in bytes to the frame.
        this.check_readonly();
        this.check_full_byte();
        this.add_logical(name, word, parent);

        let order = [...Array(size).keys()];
        if (this._endian === 'BIG') order = order.reverse();
        for (const i of order) {
            this._content.push((word >> 8 * i) & 0xFF);
        }

        this._pos = this._content.length * 8
    }


    add_content(name, new_content, parent) {
        // Adds stream of bytes to the frame and a logical field.
        this.check_readonly();
        this.check_full_byte();
        this.add_logical(name, new_content, parent);

        if (new_content instanceof Frame) {
            this._content = this._content.concat(new_content._content);
        } else {
            this._content = this._content.concat(new_content);
        }
        this._pos = this._content.length * 8;
    }

    add_content_physical(new_content) {
        // Adds stream of bytes to the frame without a logical field.
        this.check_readonly();
        this.check_full_byte();

        if (new_content instanceof Frame) {
            this._content = this._content.concat(new_content._content);
        } else {
            this._content = this._content.concat(new_content);
        }
        this._pos = this._content.length * 8;
    }

    add_logical(name, value, parent) {
        // Adds logical field to frame.
        // default parent of field is top level of frame
        if (parent === undefined) {
            parent = this;  //TODO: used to be this.logical
        }

        // if some field share the same name (e.g. 'reserved'), add _ at the end
        while (name in parent) {
            name += '_';
        }
        parent[name] = value;
    }


    add_group(group, values, parent) {
        // adds fields with names and bitwidths defined in dictionary `group`,
        // assigning them values specifed in corresponding dictionary `values`
        this.check_full_byte();
        for (const [name, bits] of Object.entries(group)) {
            // if the field name is absent in `values`, set it to 0
            const value = values[name] ?? 0;
            if (bits === undefined) {
                if (typeof (value) === 'number') {
                    // default size of word
                    this.add_word(name, value, 4, parent);
                } else {
                    this.add_content(name, value, parent)
                }
            } else {
                this.add_field(name, value, bits, parent)
            }
        }
    }

    check_readonly() {
        if (this._readonly) {
            throw new Error("Frame already closed.");
        }
    }

    check_full_byte() {
        // useful for checking if the last byte was filled with bits,
        // when new byte is added
        if (this._pos % 8 !== 0) {
            throw new Error("Fields in last word are not aligned to full byte.");
        }
    }

    print() {
        for (const byte of this._content) {
            console.log(byte);
        }
    }
}

//TODO: resolve data access and JSON io

class ethernetFrame extends Frame{
    // O-RAN Fronthaul Working Group
    // Control, User and Synchronization Plane Specification
    // 3.1.1 Ethernet Encapsulation
    static ETHERNET_PREAMBLE = [0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x0D];

    constructor(src_mac, dst_mac, ethType,
                VLAN_tag = undefined, payload = undefined, preamble=false){
        super();

        // preamble
        if(preamble){
            this.add_content('preamble', ethernetFrame.ETHERNET_PREAMBLE);
        }

        this.add_content('dst_mac', dst_mac);
        this.add_content('src_mac', src_mac);

        if(VLAN_tag !== undefined){
            this.add_word('VLAN_tag', VLAN_tag, 4)
        }
        this.add_word('ethType', ethType, 2)
        if(payload){
            this.add_payload(payload)
        }
    }

    add_payload(payload){
        // Add payload and CRC
        this.add_content('payload', payload);
        if(payload._content instanceof Frame){
            payload = payload._content
        }
        //const crc = /*zlib.crc32(bytes(payload)) & 0xFFFF_FFFF*/ 0; //TODO: crc
        //this.add_word('crc', crc, 4)
        this._readonly = true;
    }
}



class ecpriFrame extends Frame{
    // O-RAN Fronthaul Working Group
    // Control, User and Synchronization Plane Specification
    // 3.1.3.1 eCPRI Transport Header

    // Bit structure of frame header
    static HEADER = {
        'ecpriVersion': 4,
        'reserved': 3,
        'ecpriConcat': 1,
        'ecpriMessageType': 8,
        'ecpriPayloadSize': 16,
        'ecpriPcid': 16,
        'ecpriSeqId': 8,
        'ecpriSeqE': 1,
        'ecpriSubseqId': 7
    }

    constructor(ecpriVersion, ecpriConcat, ecpriMessageType,
    ecpriPayloadSize, ecpriPcid, ecpriSeqId, ecpriSeqE,
    ecpriSubseqId){
        super();
        this.add_group(ecpriFrame.HEADER, {'ecpriVersion': ecpriVersion,
        'ecpriConcat': ecpriConcat, 'ecpriMessageType': ecpriMessageType, 'ecpriPayloadSize':ecpriPayloadSize,
        'ecpriPcid': ecpriPcid, 'ecpriSeqId': ecpriSeqId, 'ecpriSeqE': ecpriSeqE, 'ecpriSubseqId': ecpriSubseqId});
    }
}



class UserPlane extends Frame{
    // eCPRI User Plane Protocols (gNB) Layer1-Level Feature Specification
    // 6.1.4.1	Message types

    // Bit structure of frame header and section
    static HEADER = {
        'dataDir': 1,
        'payloadVer': 3,
        'filterIndex': 4,
        'frameId': 8,
        'subframeId': 4,
        'slotId': 6,
        'symbolId': 6
    }
    static SECTION = {
        'sectionId': 12,
        'rb': 1,
        'symInc': 1,
        'startPrbu': 10,
        'numPrbu': 8,
        'IQdata': undefined
    }

    constructor(dataDir, payloadVer, filterIndex, frameId,
    subframeId, slotId, symbolId){
        super();
        this.add_group(UserPlane.HEADER, {'dataDir': dataDir, 'payloadVer': payloadVer, 'filterIndex': filterIndex,
        'frameId': frameId, 'subframeId': subframeId, 'slotId': slotId, 'symbolId': symbolId});
        this.add_logical('sections',    []);
    }


    add_section(sectionId, startPrbu, numPrbu, IQdata, rb){
        const section = {};
        this.add_group(UserPlane.SECTION, {'sectionId': sectionId, 'startPrbu': startPrbu,
        'numPrbu': numPrbu, 'IQdata': IQdata, 'rb': rb}, section);
        this['sections'].push(section);
    }
}

class FastControlPlane extends Frame{
    // O-RAN Fronthaul Working Group
    // Control, User and Synchronization Plane Specification
    // 5.4.2 Scheduling and Beamforming Commands

    // Bit structure of frame header and section
    static HEADER = {
        'dataDir': 1,
        'payloadVer': 3,
        'filterIndex': 4,
        'frameId': 8,
        'subframeId': 4,
        'slotId': 6,
        'startSymbolId': 6,
        'numOfSections': 8,
        'sectionType': 8,
        'udCompHdr': 8,
        'reserved': 8
    };

    constructor(dataDir, payloadVer, filterIndex, frameId,
    subframeId, slotId, startSymbolId, numOfSections,
    sectionType, udCompHdr){
        super();
        this.add_group(FastControlPlane.HEADER, {'dataDir': dataDir, 'payloadVer': payloadVer, 'filterIndex': filterIndex,
        'frameId':frameId, 'subframeId':subframeId, 'slotId': slotId, 'startSymbolId': startSymbolId, 'numOfSections': numOfSections,
        'sectionType': sectionType, 'udCompHdr': udCompHdr});
        this.add_logical('sections', []);
    }

    add_section(section){
        this.add_content_physical(section);
        this['sections'].push(section);
    }
}

class FastControlPlaneSection extends Frame{

    static HEADER = {
        'sectionId': 12,
        'padding': 2,
        'startPrbc': 10,
        'numPrbc': 8,
        'reMask': 12,
        'numSymbol': 4,
        'extFlag': 1,
        'beamId': 15,
    };

    constructor(sectionId, padding, startPrbc, numPrbc, reMask,
                numSymbol, extFlag, beamId){
        super();
        this.add_group(FastControlPlaneSection.HEADER, {'sectionId': sectionId, 'padding': padding,
            'startPrbc': startPrbc, 'numPrbc': numPrbc, 'reMask': reMask, 'numSymbol': numSymbol, 'extFlag': extFlag,
            'beamId': beamId});
        this.add_logical('extensions', []);
    }

    add_extension(extension){
        this.add_content_physical(extension);
        this['extensions'].push(extension);
    }
}

class SectionExtension6 extends Frame{

    static HEADER = {
        'ef': 1,
        'extType': 7,
        'exlLen': 8,
        'repetition': 1,
        'rbgSize': 3,
        'rbgMask': 28,
        'priority': 2,
        'symbolMask': 14
    };

    constructor(ef, extType, exlLen, repetition, rbgSize,
                rbgMask, priority, symbolMask){
        super();
        this.add_group(SectionExtension6.HEADER, {'ef': ef, 'extType': extType,
            'exlLen': exlLen, 'repetition': repetition, 'rbgSize': rbgSize, 'rbgMask': rbgMask, 'priority': priority,
            'symbolMask': symbolMask});
    }
}

class SectionExtension12 extends Frame{

    static HEADER = {
        'ef': 1,
        'extType': 7,
        'exlLen': 8,
        'priority': 2,
        'symbolMask': 14
    };

    static RANGE = {
        'offStartPrb': 8,
        'numPrb': 8
    };

    constructor(ef, extType, exlLen, priority, symbolMask){
        super();
        this.add_group(SectionExtension12.HEADER, {'ef': ef, 'extType': extType,
            'exlLen': exlLen, 'priority': priority, 'symbolMask': symbolMask});
        this.add_logical('ranges', []);
    }

    add_range(offStartPrb, numPrb){
        const range = {};
        this.add_group(SectionExtension12.RANGE, {'offStartPrb': offStartPrb, 'numPrb': numPrb}, range);
        this['ranges'].push(range);
    }
}

// TODO: obsolete
class UlData_PuschReceiveReq extends Frame{
    constructor(file=""){
        super();
        this.fromJSON(file);  //TODO: json load
    }

    fromJSON(file){
        //opens and loads json
    }
}

class L2l1Control extends Frame{
    // eCPRI transport and fragmentation details for L2-L1 IF-base FH
    // L2-L1 control (Ul/DlData) application header

    // Bit structure of frame header
    static HEADER = {
        'dataDir': 1,
        'payloadVer': 3,
        'reserved': 4,
        'frameId': 8,
        'subframeId': 4,
        'slotId': 6,
        'startSymbolId': 6,
        'interfaceRevision': 8,
        'messageType': 8,
        'messageId': 16,
    };

    constructor(dataDir, payloadVer, frameId,
                subframeId, slotId, startSymbolId, interfaceRevision,
                messageType, messageId){
        super();
        this.add_group(L2l1Control.HEADER, {'dataDir': dataDir, 'payloadVer': payloadVer, 'frameId':frameId,
            'subframeId':subframeId, 'slotId': slotId, 'startSymbolId': startSymbolId, 'interfaceRevision': interfaceRevision,
            'messageType': messageType, 'messageId': messageId});
    }
}

class ecpriSequence {
    // Sequence of eCPRI frames with common header fields
    constructor(ecpriVersion=1, ecpriConcat=0, ecpriMessageType=0){
        this.ecpriVersion = ecpriVersion;
        this.ecpriConcat = ecpriConcat;
        this.ecpriMessageType = ecpriMessageType;
        this.sequenceId = {};
        this.frames = [];
    }

    add(eAxC, payload, ecpriSeqE = 1, ecpriSubseqId = 0){
        const ecpri = this.generate(eAxC, payload, ecpriSeqE, ecpriSubseqId);
        this.frames.push(ecpri);
    }

    generate(eAxC, payload, ecpriSeqE = 1, ecpriSubseqId = 0){
        const sequenceId = this.sequenceId[eAxC] ?? 0;
        //# if any section is present in the frame, add eCPRI header
        const ecpri = new ecpriFrame(this.ecpriVersion,
            this.ecpriConcat,
            this.ecpriMessageType,
            payload._content.length + 4,
            eAxC,
            sequenceId,
            ecpriSeqE,
            ecpriSubseqId)
        ecpri.add_content('payload', payload)
        this.sequenceId[eAxC] = sequenceId + ecpriSeqE; // Works on assumption that final fragmented frame is LAST
        return ecpri;
    }

    get(){
        return this.frames;
    }

    clean(){
        this.frames = []
    }
}

function eth_sequence(src_addr, dst_addr, eth_type, sequence){
    // encapsulates content of array `sequence` into Ethernet frames with given
    // header fields

    return sequence.map((elem)=> new ethernetFrame(src_addr, dst_addr, eth_type, undefined, elem));
}