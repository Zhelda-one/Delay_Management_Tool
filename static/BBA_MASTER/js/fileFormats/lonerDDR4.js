function lonerDDR4_preload( buf ){
    const buffer = new Uint8Array(buf);

    return buffer[0] == 0x01 && buffer[1] == 0x23 && buffer[2] == 0x45 && buffer[3] == 0x67 && buffer[4] == 0xDE
        && buffer[5] == 0xAD && buffer[6] == 0xBE && buffer[7] == 0xEF;
}

function lonerDDR4_decode( bufferReader)
{
    const type = config.load.lonerType;
    const frame_align = config.load.lonerAlignToFrame;
    const data = new Uint8Array( bufferReader.buffer );

    // 4 ant max
    let time_i_ant = [[],[],[],[]];
    let time_q_ant = [[],[],[],[]];

    const AXI_WORD_SIZE = 16;  // bytes
    const CPRI_FRAME_SIZE = 512;  // bytes
    const MAGIC_HEADER = [0x01, 0x23, 0x45, 0x67, 0xDE, 0xAD, 0xBE, 0xEF,
        0xDE, 0xAD, 0xBE, 0xEF, 0x76, 0x54, 0x32, 0x10];
    const CAPTURE_STREAMS = {
        0x04: {'name': 'leka_tx_0', 'dir': 'dl'},
        0x15: {'name': 'leka_tx_1', 'dir': 'dl'},
        0x26: {'name': 'leka_tx_2', 'dir': 'dl'},
        0x37: {'name': 'leka_tx_3', 'dir': 'dl'},
        0xF8: {'name': 'leka_rx_0', 'dir': 'ul'},
        0xF9: {'name': 'leka_rx_1', 'dir': 'ul'},
        0xFA: {'name': 'leka_rx_2', 'dir': 'ul'},
        0xFB: {'name': 'leka_rx_3', 'dir': 'ul'}};


    let bytesRead = 0;
    function* get_word(bytes, size = AXI_WORD_SIZE, chunk_size = 1024){
        while(true){
            const chunk = bytes.slice(bytesRead, bytesRead+chunk_size);
            bytesRead += chunk_size;
            if(chunk.length < chunk_size)
                break;
            for(let i = 0; i < chunk.length; i+=size)// in range(0, len(chunk), size):
                yield chunk.slice(i, i+size);
        }
    }

    function take_sample(bytes, offset){
        const bitOffset = bytes.length * 8 - 15 * (offset + 1);
        const val = bits_from_bytes(bytes, bitOffset, 15);

        return itoi_15bit_signed(val);
    }

    const byteArrayToLongLE = function(/*byte[]*/byteArray) {
        let value = 0;
        for ( let i = byteArray.length - 1; i >= 0; --i) {
            value = (value * 256) + byteArray[i];
        }
        return value;
    };

    function dissect_leka_axi_word(axi_word){
        // AXI WORD BITS
        //  0.....14 AxC 0 Q
        // 15.....29 AxC 0 I
        // 30.....44 AxC 4 Q
        // 45.....59 AxC 4 I
        // 60.....61 zeros
        // 62        CA
        // 63        CT
        // UL word ends here
        // Rest of the word for DL only
        // 64.....78 AxC 1 Q
        // 79.....93 AxC 1 I
        // 94....108 AxC 5 Q
        // 109...123 AxC 5 I
        // 124...125 zeros
        // 126       CA
        // 127       CT

        const lo = axi_word.slice(0, 8).reverse();  // reverse to get LE order
        const hi = axi_word.slice(8, 16).reverse();
        const samples = [];
        let ct_ca_bits = 0;

        for(const sample of range(4)){
            samples.push(take_sample(lo, sample));
        }
        ct_ca_bits = (ct_ca_bits << 2) | (axi_word[7] >> 6);

        for(const sample of range(4)){
            samples.push(take_sample(hi, sample));
        }
        ct_ca_bits = (ct_ca_bits << 2) | (axi_word[15] >> 6);

        return [samples, ct_ca_bits]
    }

    function report_invalid_ct_ca_bits(ct_ca_bits, num_axi_word){
        if([0b0000, 0b0101, 0b1111].includes(ct_ca_bits) === false){
            const ca0 = (ct_ca_bits & 0b0100) >> 2
            const ca1 = (ct_ca_bits & 0b0001)
            const ct0 = (ct_ca_bits & 0b1000) >> 3
            const ct1 = (ct_ca_bits & 0b0010) >> 1
            logInfo("Loner",`Axi word number: ${num_axi_word}, Invalid CT/CA with CA: ${ca0} and ${ca1}, CT:${ct0} and ${ct1}`);
            return true;
        }
        return false;
    }

    function is_magic_header_word(axi_word){
        return axi_word.slice(0, MAGIC_HEADER.length).every((elem, id)=> elem === MAGIC_HEADER[id] );
    }

    function parse_metadata_word_1(data){
        if(data[0] !== 16){
            return null;
        }

        const meta = {};
        meta['stream_id'] = data[1];
        if(data[2] < 60)
            meta['start_m'] = data[2];
        else
            meta['end_m'] = data[2] & 0x3f;

        if(data[3] < 60)
            meta['start_s'] = data[3];
        else
            meta['end_s'] = data[3] & 0x3f;

        meta['n2'] = byteArrayToLongLE(data.slice(4, 8));
        meta['n1'] = byteArrayToLongLE(data.slice(8, 12));

        return meta;
    }

    // Args
    let uplink = false; // Uplink format with 2 AxCs
    /* FDD uplink format with 4 AxCs
    Numerical argument for interval between AxC pairs:
    2 for 4 x 5 MHz, 4 for 4 x 10 MHz, 6 for 4 x 15 MHz or 8 for 4 x 20 MHz */
    let fdd_uplink_n = 0;

    if(type === 0){
        uplink = true;
    } else if(type === 1){
        // downlink, default args remain
    } else {
        fdd_uplink_n = type;
    }

    // Main
    const metadata_out = {'frame_start_sample': []};

    let is_ct_found = false;
    let is_header = false;

    let is_output_on = !frame_align;

    let first_axc_pair_set = null;
    let chunk_size = 0;

    if(fdd_uplink_n !== 0){
        is_output_on = false;
        first_axc_pair_set = null;
        chunk_size = AXI_WORD_SIZE;
    } else {
        chunk_size = 1024;
    }

    let num_axi_word = 0;
    for(let axi_word of get_word(data, AXI_WORD_SIZE, chunk_size)) {
        if(is_magic_header_word(axi_word)){
            is_header = true;
            continue
        }

        if(is_header){ // header word 1
            const metadata = parse_metadata_word_1(axi_word);
            if(metadata === null){
                logInfo("LONER", "Invalid header size, do you need a newer dissector?");
                return 0;
            }

            const stream_info = CAPTURE_STREAMS[metadata['stream_id']];
            logInfo("Loner", `Capture stream: '${stream_info['name']}' ${stream_info['dir']}.`);


            if(stream_info['dir'] === 'ul' && (uplink === false && fdd_uplink_n === 0)){
                logInfo("Loner", `Uplink capture detected, please use type "uplink" (or type for FDD 4 AxC uplink).`);
                return 0;
            }

            if(stream_info['dir'] === 'dl' && (uplink || fdd_uplink_n !== 0)){
                logInfo("Loner", `Downlink capture detected, please use type "downlink".`);
                return 0;
            }

            metadata_out['direction'] = stream_info['dir'];
            if( 'start_m' in metadata)
                metadata_out['start_minutes'] = metadata['start_m'];
            if('start_s' in metadata)
                metadata_out['start_seconds'] = metadata['start_s'];
            if('end_m' in metadata)
                metadata_out['end_minutes'] = metadata['end_m'];
            if('end_s' in metadata)
                metadata_out['end_seconds'] = metadata['end_s'];
            metadata_out['n2'] = metadata['n2'];
            metadata_out['n1'] = metadata['n1'];

            if('start_m' in metadata)
                logInfo("Loner", `Capture start moment: minutes=${metadata['start_m']}, seconds=${metadata['start_s']}`);
            else
                logInfo("Loner", `Capture end moment: minutes=${ metadata['end_m']}, seconds=${metadata['end_s']}`);

            logInfo("Loner",`Capture end BCN N2: 0x${metadata['n2'].toString(16)}, N1: 0x${metadata['n1'].toString(16)}.`);
            is_header = false;  // the last header word
            continue;
        }

        let axc_pair_interval = 0;
        let is_32_bit_shift_in_axi_words = false;
        const [samples, ct_ca_bits] = dissect_leka_axi_word(axi_word);
        if(uplink){
            if(ct_ca_bits === 0b1000){
                is_output_on = true;
                metadata_out['frame_start_sample'].push(num_axi_word);
            }

            if(ct_ca_bits === 0b10){
                is_32_bit_shift_in_axi_words = true;
                is_output_on = true
                metadata_out['frame_start_sample'].push(num_axi_word + 1);
            }
            num_axi_word += 2;
        }
        else if(fdd_uplink_n){
            axc_pair_interval = fdd_uplink_n;
            if([0b1000, 0b10].includes(ct_ca_bits)){
                is_output_on = true;
                if(ct_ca_bits === 0b10){
                    is_32_bit_shift_in_axi_words = true;
                    metadata_out['frame_start_sample'].push(num_axi_word + 1);
                }
                else{
                    is_32_bit_shift_in_axi_words = false;
                    metadata_out['frame_start_sample'].push(num_axi_word);
                }

                if(first_axc_pair_set === null){
                    first_axc_pair_set = num_axi_word % axc_pair_interval;
                    chunk_size = 1024;
                    if(frame_align === false){
                        num_axi_word = 0;
                        bytesRead = 0;
                        continue;
                    }
                }
            }
            num_axi_word += 1;
        }
        else{
            report_invalid_ct_ca_bits(ct_ca_bits, num_axi_word);
            if(ct_ca_bits === 0b1111){
                is_output_on = true;
                metadata_out['frame_start_sample'].push(num_axi_word);
            }
            num_axi_word += 1;
        }

        if(is_output_on){

            // axc0, axc4, axc1, axc5
            if(uplink) {
                time_i_ant[0].push(samples[1]); time_q_ant[0].push(samples[0]);
                time_i_ant[1].push(samples[3]); time_q_ant[1].push(samples[2]);
                time_i_ant[0].push(samples[5]); time_q_ant[0].push(samples[4]);
                time_i_ant[1].push(samples[7]); time_q_ant[1].push(samples[6]);
            }
            else if(fdd_uplink_n) {
                const axc_pair_set = (num_axi_word - 1 - first_axc_pair_set) % axc_pair_interval;
                const axc_pair_change_point = axc_pair_interval / 2;
                if (axc_pair_set < axc_pair_change_point) {
                    if (is_32_bit_shift_in_axi_words && axc_pair_set === 0) {
                        time_i_ant[2].push(samples[1]); time_q_ant[2].push(samples[0]);
                        time_i_ant[3].push(samples[3]); time_q_ant[3].push(samples[2]);
                        time_i_ant[0].push(samples[5]); time_q_ant[0].push(samples[4]);
                        time_i_ant[1].push(samples[7]); time_q_ant[1].push(samples[6]);
                    } else {
                        time_i_ant[0].push(samples[1]); time_q_ant[0].push(samples[0]);
                        time_i_ant[1].push(samples[3]); time_q_ant[1].push(samples[2]);
                        time_i_ant[0].push(samples[5]); time_q_ant[0].push(samples[4]);
                        time_i_ant[1].push(samples[7]); time_q_ant[1].push(samples[6]);
                    }
                } else {
                    if (is_32_bit_shift_in_axi_words && axc_pair_set === axc_pair_change_point) {
                        time_i_ant[0].push(samples[1]); time_q_ant[0].push(samples[0]);
                        time_i_ant[1].push(samples[3]); time_q_ant[1].push(samples[2]);
                        time_i_ant[2].push(samples[5]); time_q_ant[2].push(samples[4]);
                        time_i_ant[3].push(samples[7]); time_q_ant[3].push(samples[6]);
                    } else {
                        time_i_ant[2].push(samples[1]); time_q_ant[2].push(samples[0]);
                        time_i_ant[3].push(samples[3]); time_q_ant[3].push(samples[2]);
                        time_i_ant[2].push(samples[5]); time_q_ant[2].push(samples[4]);
                        time_i_ant[3].push(samples[7]); time_q_ant[3].push(samples[6]);
                    }
                }
            } else{
                time_i_ant[0].push(samples[1]); time_q_ant[0].push(samples[0]);
                time_i_ant[1].push(samples[3]); time_q_ant[1].push(samples[2]);
                time_i_ant[2].push(samples[5]); time_q_ant[2].push(samples[4]);
                time_i_ant[3].push(samples[7]); time_q_ant[3].push(samples[6]);
            }
        }
    }

    for(let i = 0; i < 4; i++){
        let antennaIdOffset = uplink || fdd_uplink_n > 0 ? 0 : 65536;
        if( time_i_ant[i].length > 0 ){
            bindTimeBuffers(i + antennaIdOffset, {i: time_i_ant[i], q: time_q_ant[i]});
            parseTimeIQtoIQ(i + antennaIdOffset);
        }
    }

    return true;
}