// const roe_cache = new Map();  //Commented out as old roe packets were being shown upon loading second roe file without reloading bba

function roe_decode(pkt, bufferView) {
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    const buf = bufferView.buffer;
    let off = bufferView.dataView.byteOffset;
    const pktEnd = off + bufferView.dataView.byteLength;

    const srcmac = pkt.srcmac;
    let roe = (pkt.roe = {});
    let ptr = new Uint8Array(buf, off);

    roe.subtype = ptr[0];
    // const cur_roe = roe_cache.get(pkt.id);
    // if (cur_roe) {
    //     pkt.roe = cur_roe; // WARNING: this is a reference, not a copy
    //     return;
    // }
    roe.flow_id = ptr[1];

    const flow_mac = roe.flow_id + "." + srcmac + ", RoE";
    Object.defineProperty(roe, "flow_mac", {
        value: flow_mac,
        enumerable: false,
    });

    roe.len = ptr[2] * 2 ** 8 + ptr[3];
    roe.q_counter = ptr[4] * 2 ** 8 + ptr[5];
    roe.p_counter = ptr[6] * 2 ** 8 + ptr[7];

    // RoE for PPaaS
    if (roe.subtype === 252) {
        roe.target_mem = ptr[8] >> 7;
        roe.cmd_type = (ptr[8] >> 4) & 0x3;
        roe.dswap = ptr[8] & 0x7;
        roe.start_addr = numToHex4Upper(((ptr[15] & 0x1) + (ptr[14] * 2 ** 8) + (ptr[13] * 2 ** 16) + (ptr[12] * 2 ** 24) + (ptr[11] * 2 ** 32) + (ptr[10] * 2 ** 40) + (ptr[9] * 2 ** 48)));
        roe.psm_cmd_w1 = ptr[23] + (ptr[22] * 2 ** 8) + (ptr[21] * 2 ** 16) + (ptr[20] * 2 ** 24) + (ptr[19] * 2 ** 32) + (ptr[18] * 2 ** 40) + (ptr[17] * 2 ** 48) + (ptr[16] * 2 ** 56);
        roe.psm_cmd_w0 = ptr[31] + (ptr[30] * 2 ** 8) + (ptr[29] * 2 ** 16) + (ptr[28] * 2 ** 24) + (ptr[27] * 2 ** 32) + (ptr[26] * 2 ** 40) + (ptr[25] * 2 ** 48) + (ptr[24] * 2 ** 56);

        ecpri_msgType4Data[pkt.id] = new Uint8Array(buf, off + 32, roe.len - 24);
    } else {
        const antId = flow_mac;
        if (!time_i[antId]) {
            let toFill = 0;
            if (roe.p_counter !== 0) {
                if (config.load.sampling === 7.68) toFill = (roe.p_counter / 32) * 64;
                else if (config.load.sampling === 15.36)
                    toFill = (roe.p_counter / 32) * 128;
                else if (config.load.sampling === 23.04)
                    toFill = (roe.p_counter / 16) * 96;
                else if (config.load.sampling === 30.72)
                    toFill = (roe.p_counter / 16) * 128;
            }

            time_i[antId] = new Array(toFill).fill(0);
            time_q[antId] = new Array(toFill).fill(0);
        }

        Object.defineProperty(roe, "start", {
            value: (roe.start = time_i[antId].length),
            enumerable: false,
        });

        const ampSq_samples = [];
        for (let i = 8; i < 8 + roe.len; i += 4) {
            const _i = itoi_16bit_signed((ptr[i] << 8) | ptr[i + 1]);
            const _q = itoi_16bit_signed((ptr[i + 2] << 8) | ptr[i + 3]);
            time_i[antId].push(_i);
            time_q[antId].push(_q);

            ampSq_samples.push( _i*_i + _q*_q);
        }

        Object.defineProperty(roe, "end", {
            value: (roe.end = time_i[antId].length),
            enumerable: false,
        });

        Object.defineProperty(roe, "time_q", {
            value: time_q,
            enumerable: false,
        });

        Object.defineProperty(roe, "time_i", {
            value: time_i,
            enumerable: false,
        });

        let max_ampSq = 0;
        roe.rms = 0;
        for (let i = 0; i < ampSq_samples.length; ++i) {
            roe.rms += ampSq_samples[i];

            if (ampSq_samples[i] > max_ampSq) max_ampSq = ampSq_samples[i];
        }
        roe.rms = Math.sqrt(roe.rms / ampSq_samples.length);
        roe.rms = Math.round(roe.rms * 100) / 100;

        roe.max_amp = Math.sqrt(max_ampSq);

        const log10rms = 20 * (roe.rms ? Math.log10(roe.rms) : 0);
        roe.dBm = Math.round(log10rms * 100) / 100;
        roe.dBFS = Math.round((log10rms - 105) * 100) / 100;

        // roe_cache.set(pkt.id, roe);
    }
}
