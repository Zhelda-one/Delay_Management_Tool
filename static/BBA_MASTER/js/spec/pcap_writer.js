// Writer of ethernet frames stream into Pcap format.

const PCAP_MAGIC_BIG =        0xa1b2c3d4;
const PCAP_MAGIC_LITTLE =     0xd4c3b2a1;

const PCAP_VERSION_MAJOR =    0x0002;
const PCAP_VERSION_MINOR =    0x0004;
const PCAP_THISZONE =         0x0000_0000;
const PCAP_SIGFIGS =          0x0000_0000;
const PCAP_SNAPLEN =          0x0000_FFFF;
const PCAP_NETWORK =          0x0000_0001;

const PCAP_ENDIANNESS =        'BIG';


class PcapWriter{

    //TODO: use boolean/enum endianness
    constructor(endian=PCAP_ENDIANNESS){
        this.stream = [];
        this.endian = endian;
        this.add_header();
    }

    downloadPcap(filename){
        downloadFile(filename, new Uint8Array(this.stream).buffer);
    }

    put_packet(pkt, tstamp){
        const ts_sec = Math.floor(tstamp);
        const ts_usec = Math.round(tstamp * 1000000) % 1000000;
        const length = Math.max(pkt.length, 60);
        const incl_len = length;
        const orig_len = length;
        this.put(ts_sec, 4);
        this.put(ts_usec, 4);
        this.put(incl_len, 4);
        this.put(orig_len, 4);

        pkt.push(...Array(length - pkt.length).fill(0));
        for(const byte of pkt){
            this.put(byte, 1);
        }
    }

    put_stream(frames, timestamps=undefined){
        if(timestamps === undefined){
            timestamps = frames.map((_,i)=>i);
        }

        for(let i = 0; i < frames.length; ++i){
            this.put_packet(frames[i]._content, timestamps[i]);
        }
    }

    add_header(){
        this.put(this.endian === 'BIG' ?  PCAP_MAGIC_BIG : PCAP_MAGIC_LITTLE, 4);
        this.put(PCAP_VERSION_MAJOR, 2)
        this.put(PCAP_VERSION_MINOR, 2)
        this.put(PCAP_THISZONE, 4)
        this.put(PCAP_SIGFIGS, 4)
        this.put(PCAP_SNAPLEN, 4)
        this.put(PCAP_NETWORK, 4)
    }

    put(word, size=1){
        let order = [...Array(size).keys()];
        if(this.endian === 'BIG') order = order.reverse();

        for(const i of order){
            this.stream.push((word >> 8*i) & 0xFF);
        }
    }
}