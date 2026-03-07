function time_to_freq_PRACH(antId){

    let fft_IQ = [];
    const u = config.load.defaultU;
    const sampling =config.load.sampling*1000000;

    const prachStartPrb = config.load.prachStartPrb;

    const prachConfigurationIndex = config.load.prachConfigurationIndex;

    const prachConf = u === 0 ? t38_211_6_3_3_2_2[prachConfigurationIndex] : (u === 1 ? t38_211_6_3_3_2_3[prachConfigurationIndex]:t38_211_6_3_3_2_4[prachConfigurationIndex]);
    const prach_is_long = t38_211_6_3_3_1_2[prachConf.format].Lra === 839;
    const fft_numb = t38_211_6_3_3_1_2[prachConf.format].N_numb;


    const nprb_real = 12*get_nPrb(u, sampling);

    const nprb = prach_is_long ? 100*12 : nprb_real;

    const subframes = dissect_subframes(time_i[antId], time_q[antId]);

    const symbols_to_be_parsed = subframes.v_i.length * 14 * 2**u;

    const sr_factor = Math.round( sampling/7680000 );
    let fft_size;

    const TC = 1000000/(480*4096);

    if(!prach_is_long)
        fft_size = Math.round(8192/(1<<u)* sr_factor/16);
    else
        fft_size = Math.round((sampling/1000) * (t38_211_6_3_3_1_2[prachConf.format].Nu/t38_211_6_3_3_1_2[prachConf.format].N_numb * 64 * TC * 0.000001));

    let v_i = new Float32Array( (1+symbols_to_be_parsed)*nprb );
    let v_q = new Float32Array( (1+symbols_to_be_parsed)*nprb );

    let {cp_map, sym_in_slot} = prach_framing_constants();
    const long_PRACH_offset = PRACH_offset(u, nprb_real, prachStartPrb, fft_size, sampling);

    if(prach_is_long)
        cp_map = [Math.round((sampling/1000) * (t38_211_6_3_3_1_2[prachConf.format].N_RA_CP * 64 * TC * 0.000001))];

    let symbol = 0;
    let old_pos = 0;
    let output_pos = 0;
    let fft_len = 0;

    config.iqTab.guardband_size = fft_size-nprb;
    config.iqTab.fft_size = fft_size;
    config.iqTab.nprb = nprb;

    for(let subframe = 0; subframe < subframes.v_i.length; subframe++) {

        let offset = 0;

        let time_i = subframes.v_i[subframe];
        let time_q = subframes.v_q[subframe];

        let fft_result;

        if(fft_numb === 1 && prach_is_long){
            offset = cp_map[0];
            let sig_i = time_i.slice(offset, offset+fft_size);
            let sig_q = time_q.slice(offset, offset+fft_size);

            fft_result = fft( sig_i, sig_q );
            fft_IQ.push({v_i: fft_result.v_i, v_q: fft_result.v_q});

            const half_len = parseInt((fft_result.v_i.length)/2);
            fft_result.v_i = [...fft_result.v_i.slice(half_len), ...fft_result.v_i.slice(0, half_len)];
            fft_result.v_q = [...fft_result.v_q.slice(half_len), ...fft_result.v_q.slice(0, half_len)];

            symbol+=14

            v_i.set( fft_result.v_i.slice( long_PRACH_offset, long_PRACH_offset + nprb ), output_pos );
            v_q.set( fft_result.v_q.slice( long_PRACH_offset, long_PRACH_offset + nprb ), output_pos );
            output_pos += nprb;
        }
        else if(prach_is_long){
            if(prachConf.sf.includes(subframe) && subframe + 2 < subframes.v_i.length){
                let sig_i = [...subframes.v_i[subframe], ...subframes.v_i[subframe+1], ...subframes.v_i[subframe+2]];
                let sig_q = [...subframes.v_q[subframe], ...subframes.v_q[subframe+1], ...subframes.v_q[subframe+2]];

                offset = cp_map[0];
                for(let i = 0; i < fft_numb; i++){
                    const time_i_tmp = sig_i.slice(offset, offset+fft_size);
                    const time_q_tmp = sig_q.slice(offset, offset+fft_size);
                    fft_result = fft( time_i_tmp, time_q_tmp );
                    fft_IQ.push({v_i: fft_result.v_i, v_q: fft_result.v_q});

                    const half_len = parseInt((fft_result.v_i.length)/2);
                    fft_result.v_i = [...fft_result.v_i.slice(half_len), ...fft_result.v_i.slice(0, half_len)];
                    fft_result.v_q = [...fft_result.v_q.slice(half_len), ...fft_result.v_q.slice(0, half_len)];

                    v_i.set( fft_result.v_i.slice( long_PRACH_offset, long_PRACH_offset + nprb ), output_pos );
                    v_q.set( fft_result.v_q.slice( long_PRACH_offset, long_PRACH_offset + nprb ), output_pos );

                    output_pos += nprb;
                    offset += fft_size;
                }
                subframe += 2;
            }
        }
        else{
            old_pos = output_pos;

            for(let i = 0; i < prachConf.start; i++){
                v_i.set( zeros( nprb ), output_pos );
                v_q.set( zeros( nprb ), output_pos );
                output_pos += nprb;
            }

            for(let slot = 0; slot < 2**u; slot++ ){
                for(let symbol = 0; symbol < sym_in_slot; symbol++){

                    let cplen = cp_map[(slot*sym_in_slot+symbol) % cp_map.length];
                    if ( cplen<0 ) {
                        offset +=-cplen;
                        continue; }

                    offset += cplen;

                    let sig_i = time_i.slice(offset, offset+fft_size) //[offset + (k*4+j)*this.fc.fft_size + i];
                    let sig_q = time_q.slice(offset, offset+fft_size)  //[offset + (k*4+j)*this.fc.fft_size + i];

                    let fft_result = fft( sig_i, sig_q );
                    fft_IQ.push({v_i: fft_result.v_i, v_q: fft_result.v_q});
                    fft_len += fft_result.v_i.length
                    lte_fft_shift_and_guardband_removal_set( v_i, fft_result.v_i, fft_size, nprb, output_pos);
                    lte_fft_shift_and_guardband_removal_set( v_q, fft_result.v_q, fft_size, nprb, output_pos);
                    output_pos += nprb;

                    offset+=fft_size
                }
            }
            output_pos += 2**u*14*nprb - (output_pos - old_pos);

        }
    }

    if(!iqBuffers[u]) iqBuffers[u]={};
    iqBuffers[u][antId] = new Float32Array( v_i.length*2 );
    for(let i = 0; i < v_i.length; i++){
        iqBuffers[u][antId][i*2] = v_i[i];
        iqBuffers[u][antId][i*2+1] = v_q[i];
    }

    if(!fftBuffers[u]) fftBuffers[u]={};
    fftBuffers[u][antId] = new Float32Array( fft_IQ.length*fft_size*2 );

    let k = 0;
    for(let i = 0; i < fft_IQ.length; i++){
        for(let j = 0; j < fft_size; j++){
            fftBuffers[u][antId][k++] = ((j + fft_size/2)%fft_size) / 2000;
            fftBuffers[u][antId][k++] = Math.sqrt(fft_IQ[i].v_i[j]*fft_IQ[i].v_i[j] + fft_IQ[i].v_q[j]*fft_IQ[i].v_q[j]);
        }
    }

    if(!fftTypeBuffers[u]) fftTypeBuffers[u]={};
    fftTypeBuffers[u][antId] = new Float32Array( fftBuffers[u][antId].length/2 ).fill(13);


    config.load.nprb = nprb / 12;

    return {v_i, v_q};

}

function dissect_subframes(v_i, v_q){
    const numberOfSamplesPerSubframe = config.load.sampling * 1000;
    let subframes_i = [], subframes_q = [];

    let counter = 0;

    for(; counter+numberOfSamplesPerSubframe < v_i.length; counter+= numberOfSamplesPerSubframe){
        subframes_i.push(v_i.slice(counter, counter+numberOfSamplesPerSubframe));
        subframes_q.push(v_q.slice(counter, counter+numberOfSamplesPerSubframe));
    }

    return {v_i: subframes_i, v_q: subframes_q};
}
//yuv is freq-domain zadoff-chu
function prach_getPDP(IQ,yuv){
    const Lra = IQ.v_i.length;
    const combined = IQ.dotmul(yuv);
    const correlation = combined.ifft();
    const pdp_temp = correlation.abs().v_i.map(x => x**2);
    let pdp = new Array(Lra);
    for(let i = 0; i < Lra; i++) pdp[i] = pdp_temp[Lra - i - 1]; //Our fft operations reverse the result so it has to be readjusted
    return pdp;
}

// TODO: this needs to be reworked without runtime getElementById calls and put in PrachDialog.js
function ecpri_decodePrach(IQ,otherAntennasIQ) { //Based on 5GMax-5G New Radio Algorithm Specification
    // getElementById("prachDialog_pdp_graph").hide();
    let pdpGraphsPlaceholder = getElementById('prachDialog_code_graph_placeholder');
    pdpGraphsPlaceholder.innerHTML = "";

    const prachDialog_amp_graph = getElementById('prachDialog_amp_graph');
    prachDialog_amp_graph.graph2d.setModeLine();

    const prachDialog_code_graph = getElementById('prachDialog_code_graph');
    prachDialog_code_graph.graph2d.setModeLine();

    if(!IQ){
        prachDialog_amp_graph.graph2d.draw([], []);
        prachDialog_code_graph.graph2d.draw([], []);
        return;
    }

    const Lra = IQ.v_i.length;
    const amp_samples = IQ.abs().v_i;
    prachDialog_amp_graph.graph2d.draw([], [amp_samples]);

    let max_corr_per_u = new Array(Lra);
    max_corr_per_u[0] = 0.0; //u > 0
    const n_detections = Lra**2;
    const pfalse = 1 / 100;
    const threshold = -Math.log(pfalse / n_detections) * 1.2;
    let bestPeak_value = -900;
    const PRACH_bestPeak_info = {"Highest peak u" : -1, "Highest peak Cv" : -1, "Highest peak i" : -1},PRACH_peaks = {};
    for(let u = 1; u < Lra; u++){
        let xuv = generate_zadoff_chu(Lra,u);
        let yuv = xuv.fft();

        let pdp = prach_getPDP(IQ,yuv);
        if(configDialog_prachAntennaCombining_cb.checked && otherAntennasIQ){ //Non-coherent combining
            for(let otherIQ of otherAntennasIQ){
                let otherPDP = prach_getPDP(otherIQ,yuv);
                for(let i = 0; i < Lra; i++) pdp[i] += otherPDP[i];
            }
            for(let i = 0; i < Lra; i++) pdp[i] /= (otherAntennasIQ.length+1);
        }

        const true_u = Lra - u; //For prach with u = u1, highest correlation will be for u = Lra - u1 because of fft operations!!!
        max_corr_per_u[true_u] = Math.max(...pdp); 

        const energy_av = estimate_exponential_mean([...pdp], 0.2)

        if(max_corr_per_u[true_u] > energy_av * threshold){
            const logical_index = Lra === 139 ? t38_211_6_3_3_1_4.indexOf(true_u) : t38_211_6_3_3_1_3.indexOf(true_u);
            const [peak_value,Cv] = v_max(pdp);
            if(peak_value > bestPeak_value){
                bestPeak_value = peak_value;
                PRACH_bestPeak_info["Highest peak u"] = true_u;
                PRACH_bestPeak_info["Highest peak Cv"] = Cv;
                PRACH_bestPeak_info["Highest peak i"] = logical_index;
            }
            
            const graph = document.createElement("bba-graph2d"); //getElementById("prachDialog_pdp_graph");
            graph.caption = `PDP code for u=${(true_u)} (peak at Cv=${Cv})`;
            graph.width = 350;
            graph.height = 150;
            pdpGraphsPlaceholder.appendChild(graph);
            // graph.show();
            const nrof_peaks_already_found = Object.keys(PRACH_peaks).length;
            PRACH_peaks["Peak#" + nrof_peaks_already_found] = "u = " + true_u + ", Cv = " + Cv + ", i = " + logical_index;

            graph.graph2d.setModeLine();
            graph.graph2d.draw([], [pdp]);
        }
    }

    prachDialog_code_graph.graph2d.draw([], [max_corr_per_u]);

    getElementById("prachDialog_info").innerHTML = createInfoTable(PRACH_bestPeak_info, `PRACH`).outerHTML;
    getElementById("prachDialog_info").innerHTML += createInfoTable(PRACH_peaks, `PRACH peaks`).outerHTML;
}

function generate_zadoff_chu(Lra, u) {
    const zc = new Array(Lra);
    for (let i = 0; i < Lra; ++i)
        zc[i] = (-Math.PI * u * ((i * (i + 1)) % (2 * Lra)) / Lra);
    const rv = new M(zeros(Lra), zc);
    return rv.exp();
}

function prach_framing_constants()
{
    const u = config.load.defaultU;
    const prach_configuration_index = config.load.prachConfigurationIndex;
    // const prachConfig = prach_configs[config.cell.frequencyRange][prach_configuration_index];
    const prachConfig = u === 0 ? t38_211_6_3_3_2_2[prach_configuration_index] : (u === 1 ? t38_211_6_3_3_2_3[prach_configuration_index]:t38_211_6_3_3_2_4[prach_configuration_index]);
    const sampling_rate = config.load.sampling * 1000000;


    const prach_preamble        = prach_preamble_formats[ prachConfig.format ];
    const prach_cp              = prach_preamble.N_RA_CP*4 / (1<<u);
    const cp_map=[];

    let cur_sample = 0;
    for( let slot = 0; slot < 1<<u; slot++)
    {
        const isFirstCpLonger = !(slot&( (1<<(u-1))-1 ));
        let symbol  = prachConfig.start;

        for( let occasion= 0; occasion<prachConfig.occasions; occasion++) {

            const timing_start = get_nr_symbol_start_in_sf( slot, symbol, u) + ((isFirstCpLonger&&symbol === 0) ? 64 : 0);

            if (cur_sample !== timing_start) { cp_map.push( -Math.abs(timing_start-cur_sample ) ); cur_sample=timing_start; }
            cp_map.push(prach_cp);
            cur_sample+=prach_cp;
            cur_sample+= 8192>>u;
            symbol++;
            for( let j= 0; j < prachConfig.duration-1; j++) {
                cp_map.push(0);
                cur_sample+= 8192>>u; //fft_size
                symbol++;
            }
        }
    }
    cp_map.push(cur_sample-122880);
    for( let i=0; i<cp_map.length; i++) cp_map[i]*=sampling_rate/122880000;

    const sym_in_slot =  prachConfig.duration*prachConfig.occasions;

    return {cp_map, sym_in_slot};
}

function lte_fft_shift_and_guardband_removal_set( out, v, fft_size, num_sc, out_pos)
/* Float32Array implementation */
{
    var d = fft_size- num_sc/2;

    out.set( v.subarray( d, fft_size ), out_pos );
    out.set( v.subarray( 0, num_sc/2) , out_pos+fft_size-d );
}

function PRACH_offset(u, num_sc, startPRB, fft_size, sampling_rate){
    const subcarrier_spacing = 15000*(1<<u);
    const K = (subcarrier_spacing/1000) / 1.25;

    const k_dash = 7; //from 6.3.3.2-1

    const L_RA = 839;

    const k1 = -num_sc/2 + startPRB*12;
    const f0 = (L_RA-1)/2 + K*k1 + k_dash;
    const f0_hz = f0 * 1.25;


    let FTW = f0_hz*fft_size / (sampling_rate/1000);
    if(FTW < 0) FTW = Math.abs(FTW);
    else FTW = fft_size - FTW;

    return FTW;
}

