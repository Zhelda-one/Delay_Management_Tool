function cpri_preload( buf ){
    const buffer = new Uint8Array(buf);

    return buffer[0] == 0xBC && buffer[1] == 0x50;
}

//Based on 4.2.1 of CPRI spec (Line Bit Rate)
//BytesPerWord => linkrate
const CPRI_LINKRATES = {
    1 : {"linkrate" : 614.4, "coding" : "8B/10B" },
    2 : {"linkrate" : 1228.9, "coding" : "8B/10B" },
    4 : {"linkrate" : 2457.6, "coding" : "8B/10B" },
    5 : {"linkrate" : 3072.0, "coding" : "8B/10B" },
    8 : {"linkrate" : 4915.2, "coding" : "8B/10B" },
    10 : {"linkrate" : 6144.0, "coding" : "8B/10B" },
    16 : {"linkrate" : 9830.4, "coding" : "8B/10B" },
    20 : {"linkrate" : 10137.6, "coding" : "64B/66B" },
    24 : {"linkrate" : 12165.12, "coding" : "64B/66B" },
    48 : {"linkrate" : 24330.24, "coding" : "64B/66B" }
}

function cpri_getValueBytes(ptr,bytes,offset){
    let result = new Uint8Array(bytes);
    for(let i = 0; i<bytes; i++){
        result[i] = ptr[offset + i]
    }
    return result;
}

function cpri_getValue(ptr,bytes,offset){ 
    let result = 0;
    for(let i =0; i<bytes; i++){
        result += ptr[offset + i] << 8* (bytes - 1 -i) ;
    }
}

function cpri_discover_bytes_per_word(ptr,buffSize){
    const BYTES_PER_WORD_OPTIONS = [1, 2, 4, 5, 8, 10, 16, 20, 24];
    const WORDS_PER_BF = 16;
    const BFS_PER_HF = 256;

    for(const bytes_per_word of BYTES_PER_WORD_OPTIONS){

        const bytes_per_bf = (WORDS_PER_BF-1) * bytes_per_word + Math.min(bytes_per_word,16);
        const bytes_per_hf = bytes_per_bf * BFS_PER_HF;
        for (let i = 0; i < 1; i++){ //buffSize
            if (ptr[i] === 0xBC && ptr[i + bytes_per_hf] === 0xBC){
                let good = true;
                for(let j=0; j < 6; j++){
                    if(ptr[i+1+j] !== 0x50 || ptr[i+1 + bytes_per_hf + j] !== 0x50){ //after 0xBC there should be at least 6 filling bytes (0x50)
                        good = false;
                        break;
                    }
                }
                if(good) return bytes_per_word;
            } 
        }  
    }
    return -1;  
}

function cpri_get_linkrate(bytes_per_word){
    switch(bytes_per_word){
        case 1: return 614.4;
        case 2: return 1228.8;
        case 4: return 2457.6;
        case 5: return 3072.0;
        case 8: return 4915.2;
        case 10: return 6144.0;
        case 16: return 9830.4;
        case 20: return 12165.12;
        case 24: return 24330.24;
    }
}

function cpri_get_HDLC_bit_rate(bits,linkrate){
    switch(bits){
        case 0b000: return 0;
        case 0b001: return 240;
        case 0b010: return 480;
        case 0b011: return 960;
        case 0b100: return 1920;
        case 0b101: return 2400;
        case 0b110: //Highest possible
            if(linkrate === 4915.2) return 3840.0;
            else if(linkrate === 6144.0) return 4800.0;
            else return 7680.0;
        case 0b111: return -1; //Negotiated at higher layer
        default:
            console.log("Invalid HDLC_bit_rate")
            return 0; 
    }
}

//Z.X.W = HFN,BFN,WORD

//Function based on Table11 of cpri spec v7.0
function cpri_extract_HLDC_data(ctrl_words, HDLC_bit_rate,ctrl_word_used_bytes){ 
    if(HDLC_bit_rate === 0) return ["","","",""]    
    else if(HDLC_bit_rate === 240){ 
        let result = ["","","",""];
        result[0] = ( ctrl_words[1][0] ).toString(16);  
        result[2] = ( ctrl_words[129][0] ).toString(16);
        return result;      
    }

    let ctrl_word_ids = [1,65,129,193];
    let result = ["","","",""];
    for(const [idx, ctrl_word_id] of ctrl_word_ids.entries()){
        for(let byte = 0; byte < ctrl_word_used_bytes[HDLC_bit_rate]; byte++){
            result[idx] += ctrl_words[ctrl_word_id][byte].toString(16);
            if(byte %2 === 1 && byte < ctrl_word_used_bytes[HDLC_bit_rate]-1) result[idx] += " ";
        }            
    }
    return result;
}

//This might be incorrect
function cpri_extract_ethernet_data(ctrl_words, bytes_per_ctrl_word, p_pointer){
    let result = Array((64 - p_pointer)*4 ).fill("");
    for(let subchannel = p_pointer; subchannel < 64; subchannel++){
        for(let word = 0; word < 4; word++){
            for(let byte = 0; byte < bytes_per_ctrl_word; byte++){
                result[(subchannel - p_pointer)*4 + word] += ctrl_words[subchannel + word*64][byte].toString(16);
                if(byte%2 == 1 && byte < bytes_per_ctrl_word-1) result[subchannel - p_pointer + word] += " ";
            }
        }
    }
    return result;
}

let cpri_warn_about_unsupported_compression = true;
function cpri_sample_multiplier(sample,iqBitWidth){
    if(iqBitWidth === 9){
        if(cpri_warn_about_unsupported_compression){
            console.log("U-law is not yet supported")
            cpri_warn_about_unsupported_compression = false;
        }
       return itoi_9bit_signed(sample);
    }
    else{
        return itoi_15bit_signed(sample);
    }
}

function raw_cpri_decode( bufferReader ){
    const buf = bufferReader.buffer;

    let ptr = new Uint8Array(buf);
    ptr = ptr.slice(config.load.loadLimitFrom * 4); //?
    const BUFF_SIZE = ptr.length;

    // const iqCompression = config.load.iqCompMethod; //0 or 3
    // if(iqCompression !== 0 && iqCompression !== 3) logError("cpri","Select compression method: uncompressed or u-law")
    const f_s = config.load.sampling;
    const f_c = 3.84; //chip rate
    const iqBitWidth = 15; //in Nokia only 9(u-law) or 15(uncompressed)
    const HFS_PER_RF = 150;
    const BFS_PER_HF = 256;
    const WORDS_PER_BF = 16;
    const bytes_per_word = cpri_discover_bytes_per_word(ptr,BUFF_SIZE);
    if(bytes_per_word === -1){
        logError("cpri","Cant find bytes per word");
        return;
    } 
    
    const bytes_per_ctrl_word = Math.min(bytes_per_word,16); //According to cpri spec paragraph 4.2.7.1.1

    const linkrate = CPRI_LINKRATES[bytes_per_word]["linkrate"];  
    const samples_per_AxC = f_s/f_c; //amount of IQ pairs for antenna container within 1 BF
    const bf_iq_bitsize = (16 - 1) * bytes_per_word * 8; //bits per BF excluding bits for controlWord
    const AxC_bitsize = 2 * iqBitWidth * samples_per_AxC; //size of a single AxC container within BF
    const AxC_per_bf = bf_iq_bitsize / AxC_bitsize; //number of AxC containers that can be fit into single BF
   
    const samples_per_BF_per_AxC = samples_per_AxC; 
    const samples_per_HF_per_AxC = samples_per_BF_per_AxC * BFS_PER_HF;
    const samples_per_RF_per_AxC = samples_per_HF_per_AxC * HFS_PER_RF;

    const bytes_per_bf = (WORDS_PER_BF-1) * bytes_per_word + bytes_per_ctrl_word;   
    const bytes_per_hf = bytes_per_bf * BFS_PER_HF;        
    const bytes_per_rf = bytes_per_hf * HFS_PER_RF;  
    const rfs_in_buffer = Math.ceil(BUFF_SIZE/bytes_per_rf); //!!

    let showDebug = 0;
    if(showDebug){
        console.log(`Bytes per word:${bytes_per_word}`);
        console.log(`Bytes per BF:${bytes_per_bf}`);
        console.log(`Linkrate:${linkrate}`);
        console.log(`Samples per AxC:${samples_per_AxC}`);
        console.log(`Samples per BF:${samples_per_BF_per_AxC}`);
        console.log(`Samples per HF:${samples_per_HF_per_AxC}`);
        console.log(`Samples per RF:${samples_per_RF_per_AxC}`);
        console.log(`BF IQbitsize:${bf_iq_bitsize}`);
        console.log(`AxC bitsize:${AxC_bitsize}`);
        console.log(`AxC per bf:${AxC_per_bf}`);
        console.log(`rfs_in_buffer:${rfs_in_buffer}`);
    } 

    let samples = {}
    for(let i = 0; i < AxC_per_bf; i++){
        samples[i] = {i: new Array( samples_per_RF_per_AxC * rfs_in_buffer ), q: new Array( samples_per_RF_per_AxC * rfs_in_buffer )};
    } 

    for(let rf_nr = 0; rf_nr < rfs_in_buffer ; rf_nr++){ 
        const RF_offset = rf_nr * bytes_per_rf;

        for(let hf_nr = 0 ; hf_nr < HFS_PER_RF ; hf_nr++){ 
            let HF_offset = RF_offset + hf_nr * bytes_per_hf;
        
            let ctrl_words = Array(BFS_PER_HF); //Arr[Ctr_word_idx][byte_within_ctrl_word]
            for(let i = 0; i < BFS_PER_HF; i++) ctrl_words[i] = new Array(bytes_per_ctrl_word).fill(0);

            for(let ctrl_word_id = 0; ctrl_word_id < BFS_PER_HF; ctrl_word_id++){
                for(let i = 0; i<bytes_per_ctrl_word; i++){
                    ctrl_words[ctrl_word_id] = cpri_getValueBytes(ptr,bytes_per_ctrl_word,HF_offset + ctrl_word_id*bytes_per_bf);  
                }                
            }


            //4.2.7.5 of cpri spec (Sync and timing)
            const syncByte = numToHex4Upper(ctrl_words[0][0]);
            // const Terminal_ctrl_char = bytes_per_ctrl_word > 7 ? ctrl_words[0][7] : null;
            // const Start_ctrl_char = bytes_per_ctrl_word > 8 ? ctrl_words[0][8] : null;
            const HFN = ctrl_words[64][0]
            const RFN = (ctrl_words[192][0] & 0x7) << 8 + ctrl_words[128][0] & 0xFF;


            //4.2.7.6 of cpri spec (L1 Inband protocol)
            const version = ctrl_words[2][0];
            const HDLC_bit_rate = cpri_get_HDLC_bit_rate(ctrl_words[66][0] & 0x7,linkrate);
            const reset = ctrl_words[130][0] & 0x1;
            const RAI = (ctrl_words[130][0] >> 1 ) & 0x1;
            const SDI = (ctrl_words[130][0] >> 2 ) & 0x1;
            const LOS = (ctrl_words[130][0] >> 3 ) & 0x1;
            const LOF = (ctrl_words[130][0] >> 4 ) & 0x1;
            const p_pointer = ctrl_words[194][0] & 0x3F;
            if((p_pointer < 0x14 && p_pointer !== 0x0) ) logError("cpri","Invalid p_pointer field");
            
            //4.2.7.7.1 of cpri spec (Slow C&M Channel)
            const HDLC_USED_BYTES_OF_CTRL_WORD = {0: 0, 240: 1, 480: 1, 960: 2, 1920: 4, 2400: 5, 3840: bytes_per_ctrl_word ,
                4800: bytes_per_ctrl_word, 7680: bytes_per_ctrl_word }
            const HDLC_data = cpri_extract_HLDC_data(ctrl_words,HDLC_bit_rate,HDLC_USED_BYTES_OF_CTRL_WORD);


            //4.2.7.7.2 of cpri spec (Fast C&M Channel)
            const Ethernet_data = cpri_extract_ethernet_data(ctrl_words,bytes_per_ctrl_word,p_pointer)

            let hf = {
                'id': hf_nr + rf_nr*HFS_PER_RF,
                'time': 0,
                'syncByte' : syncByte,
                // 'terminal_ctrl_char': Terminal_ctrl_char,
                // 'start_ctrl_char': Start_ctrl_char,
                'RFN': RFN,
                'HFN': HFN,                
                'protocolVersion': version,
                'hdlc_bit_rate': HDLC_bit_rate,
                'reset': reset,
                'RAI': RAI,
                'SDI': SDI,
                'LOS': LOS,
                'LOF': LOF,
                'p_pointer': p_pointer,
                'hdlc_data[0]': HDLC_data[0],
                'hdlc_data[1]': HDLC_data[1],
                'hdlc_data[2]': HDLC_data[2],
                'hdlc_data[3]': HDLC_data[3]
            }
            for(let i=0; i<Ethernet_data.length;i++) hf[`ethernet_data[${i}]`] = Ethernet_data[i];
            packets_push(hf,0,0);

           
            //Sample decoding
            for(let bf_nr = 0; bf_nr < BFS_PER_HF; bf_nr++){
                const bf_offset = HF_offset + bf_nr*bytes_per_bf;
                const data_offset = bf_offset + bytes_per_ctrl_word; //points to the first word with actual data

                for(let AxC_id = 0; AxC_id < AxC_per_bf; AxC_id++){ //Antenna container
                    
                    const AxC_bitOffset = data_offset*8 + AxC_id * AxC_bitsize;

                    for(let sample_id = 0; sample_id < samples_per_AxC; sample_id++){ 
                        const sample_bitOffset = AxC_bitOffset + sample_id * iqBitWidth * 2; 
                        let i_sample = 0;
                        let q_sample = 0;

                        for(let bit = 0; bit < iqBitWidth; bit++){ //<0-15) or <0-9) 
                            const i_ByteInBuff = Math.floor( (sample_bitOffset + 2*bit) / 8 );
                            const q_ByteInBuff = Math.floor( (sample_bitOffset + 2*bit + 1) / 8 );

                            const i_BitInByte = sample_bitOffset + 2*bit - i_ByteInBuff*8;
                            const q_BitInByte = sample_bitOffset + 2*bit+1 - q_ByteInBuff*8;

                            const i_bit_raw_val = (ptr[i_ByteInBuff] >> i_BitInByte) & 0x1;
                            const q_bit_raw_val = (ptr[q_ByteInBuff] >> q_BitInByte) & 0x1;
                          
                            i_sample += (i_bit_raw_val <<  (bit % 8) ) << ( 8 * Math.floor( bit / 8 ) )
                            q_sample += (q_bit_raw_val <<  (bit % 8) ) << ( 8 * Math.floor( bit / 8 ) )
                        }

                        const index = Math.floor(sample_id + bf_nr*samples_per_BF_per_AxC + hf_nr * samples_per_HF_per_AxC + rf_nr * samples_per_RF_per_AxC);
                    
                        samples[AxC_id].i[index] = cpri_sample_multiplier(i_sample,iqBitWidth);
                        samples[AxC_id].q[index] = cpri_sample_multiplier(q_sample,iqBitWidth);
                    } 

                }
            }
            
        }
        
    }
    
    const DL_antenna_offset = config.load.dir === "UL" ? 0 : 0x10000;
    const start_sample = 0;//config.load.loadLimitFrom;
    const n_samples = samples[0].i.length; //config.load.loadLimit !== 0 ? config.load.loadLimit : samples[0].i.length;
    for(let AxC_id = 0; AxC_id < AxC_per_bf; AxC_id++){    
        if(start_sample !== 0 || config.load.loadLimit !== 0 ){
            samples[AxC_id].i = samples[AxC_id].i.filter((_, index) => index >= start_sample && index - start_sample < n_samples);
            samples[AxC_id].q = samples[AxC_id].q.filter((_, index) => index >= start_sample && index - start_sample < n_samples);
        }                    

        bindTimeBuffers(AxC_id + DL_antenna_offset, {i: samples[AxC_id].i, q: samples[AxC_id].q});
        parseTimeIQtoIQ(AxC_id + DL_antenna_offset);   
    } 
   
    return true;
}
