function decodePackets(u, rtcId, frame, subframe, slot, symbol, rb, re){
    if(!iqOffsets[u][rtcId] || !iqTypeBuffers[u][rtcId] || !iqOffsets[u][rtcId][frame*10+subframe]) return;
    const place = iqOffsets[u][rtcId][frame*10+subframe][slot*14+symbol]/2 + (rb - iqStartPrb[u][rtcId][frame*10+subframe][slot*14+symbol])*12 + re;
    if(iqTypeBuffers[u][rtcId][place] === null) return;
    const clickedChannel = iqTypeBuffers[u][rtcId][place];
    if(!clickedChannel) return;

    if( ["PBCH", "PSS","PBCH DMRS", "SSS"].includes(channels[clickedChannel].name) ){
        decode_SS_block(u, rtcId, symbol, frame, subframe, slot);
    }
    else if( ["PRACH"].includes(channels[clickedChannel].name) ){
        find_and_decode_PRACH(u, rtcId, frame, subframe, slot, symbol,rb,re);
    }
    else if( ["PDSCH DMRS"].includes(channels[clickedChannel].name)){
        decode_PDSCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PDSCH"].includes(channels[clickedChannel].name)){
        decode_PDSCH(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PUSCH DM-RS"].includes(channels[clickedChannel].name)){
        decode_PUSCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PUSCH PT-RS"].includes(channels[clickedChannel].name)){
        decode_PUSCH_PTRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PDSCH PT-RS"].includes(channels[clickedChannel].name)){
        decode_PDSCH_PTRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["CSI-RS"].includes(channels[clickedChannel].name)){
        decode_CSIRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PDCCH"].includes(channels[clickedChannel].name) ){
        decode_PDCCH(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PDCCH DMRS"].includes(channels[clickedChannel].name)){
        decode_PDCCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["PUCCH DM-RS"].includes(channels[clickedChannel].name)){
        decode_PUCCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
    else if( ["SRS"].includes(channels[clickedChannel].name)){
        // decode_SRS(u,rtcId,symbol,frame,subframe,slot,rb,re);
    }
}

function find_PRACH(u,rtcId,frame,subframe,slot,symbol,isLongPrach){
    const PRACH_channel_index = 13;
    const PRACH = superselect_and_get(PRACH_channel_index, u, rtcId, symbol, symbol+1, frame, subframe, slot, 0, guess_ecpri_nPRB(u)*12);
    if(![144, 840].includes(PRACH.v_i.length)){
        const amplitudes = new Array(PRACH.v_i.length)
        for(let i = 0; i < PRACH.v_i.length; i++) amplitudes[i] = PRACH.v_i[i]**2 + PRACH.v_q[i]**2;
        let prachLength = isLongPrach ? 839 : 139;
        let combinedSum = 0;
        for (let i = 0; i < prachLength; i++) {
            combinedSum += amplitudes[i];
        }
        let bestPrachSum = combinedSum,  bestPrach = 0;

        for (let i = 1; i < PRACH.v_i.length-prachLength; i++) {
            combinedSum = combinedSum - amplitudes[i - 1] + amplitudes[i + prachLength - 1];
            if(combinedSum > bestPrachSum){
                bestPrach = i;
                bestPrachSum = combinedSum;
            }
        }
        return new M(PRACH.v_i.slice(bestPrach, bestPrach + prachLength), PRACH.v_q.slice(bestPrach, bestPrach + prachLength))

    }
    else{
        if(PRACH.v_i.length === 840) return new M(PRACH.v_i.slice(1,840), PRACH.v_q.slice(1,840));
        return new M(PRACH.v_i.slice(2,141), PRACH.v_q.slice(2,141));
    }
}

function find_and_decode_PRACH(u, rtcId, frame, subframe, slot, symbol,rb,re){
    const PRACH_channel_index = 13;
    let prachConf, isLongPrach; //prachConf is used only when coherent-combining is used
    if(config.load.prachTD){
        const confIdx = config.load.prachConfigurationIndex;
        prachConf = u === 0 ? t38_211_6_3_3_2_2[confIdx] : (u === 1 ? t38_211_6_3_3_2_3[confIdx]:t38_211_6_3_3_2_4[confIdx]);
        isLongPrach = t38_211_6_3_3_1_2[prachConf.format].Lra === 839;
    }
    else{ //ecpri
        const confIdx = config.cell.prach_cfgIdx;
        if(config.cell.prachTable === "FR1_FDD") prachConf = t38_211_6_3_3_2_2[confIdx];
        else if(config.cell.prachTable === "FR1_TDD") prachConf = t38_211_6_3_3_2_3[confIdx];
        else prachConf = t38_211_6_3_3_2_4[confIdx];
        isLongPrach = u==6 ? true : false;//t38_211_6_3_3_1_2[prachConf.format].Lra === 839;
    }

    if(!prachConf){
        getElementById("prachDialog_info").innerHTML = createInfoTable({"Error" : "Invalid cfg index, check CONFIGURE tab"}, `PRACH`).outerHTML;
        const prachDialog_amp_graph = getElementById('prachDialog_amp_graph');
        const prachDialog_code_graph = getElementById('prachDialog_code_graph');
        prachDialog_amp_graph.graph2d.draw([], []);
        prachDialog_code_graph.graph2d.draw([], []);
        prachDialog.open();
        return;
    } 

    let currentOccasionStart = -1; //first symbol of clicked prach occasion. If Coherent-Combining is turned of - ignore it
    if(!isLongPrach && config.cell.prachRepetitions){
        //This code below finds the start of the occasion that clicked prach belongs to
        let currentOccasionLen = 0;
        for(let sym = prachConf.start; sym < 14; sym++){
            const iqBuffersOffset = iqOffsets[u][rtcId][frame*10+subframe][slot*14+sym]/2;
            let iqTypeSlot =  new Uint8Array( iqTypeBuffers[u][rtcId].buffer, iqBuffersOffset, iqNumPrb[u][rtcId][frame*10+subframe][slot*14+sym]*12);
            if(iqTypeSlot[12*rb + re ] === PRACH_channel_index){
                if(currentOccasionLen === 0) currentOccasionStart = sym;
                currentOccasionLen++;
            }
            
            currentOccasionLen %= prachConf.duration;
            if(sym === symbol) break; 
        }
    }

    let antennasToProcess = [];
    if(!isLongPrach && config.cell.prachAntennaCombining) antennasToProcess = config.cell.prachAntennasToCombine.split(",");
    else antennasToProcess = ["(" + u + ":" + rtcId +")"]; //Only the antenna of clicked iq

    let IQ = new M();
    let otherAntennasIQ = []; //ignore when non-coh combining is off
    for(let u_AntennaStr of antennasToProcess){
        const tempStr = u_AntennaStr.replace(/[()]/g, ''); //(3:7) -> 3:7
        const u_Antenna = tempStr.split(":");
        if(u_Antenna.length !== 2) continue; //Parse Error
        const [local_u,local_rtcId] = u_Antenna;
        if(!iqBuffers[local_u] || !iqBuffers[local_u][local_rtcId]) continue; //Wrong user input

        let PRACH_IQ;
        if(!isLongPrach && config.cell.prachRepetitions){ //In this mode IQ is the average of IQs in all symbols within prach occasion
            let symbolsSummed = 1; //might help when cfgIndex is incorrect
            PRACH_IQ = find_PRACH(local_u,local_rtcId,frame,subframe,slot,currentOccasionStart,false);
            for(let i = 1; i < prachConf.duration; i++){
                const PRACH_REPETITION = find_PRACH(local_u,local_rtcId,frame,subframe,slot,currentOccasionStart+i, false);
                if(PRACH_REPETITION.v_i.length === 0) break; //Wrong cfgIndex, or multiple prach confs exist              
                v_add_v_real_inplace(PRACH_IQ.v_i,PRACH_REPETITION.v_i);
                v_add_v_real_inplace(PRACH_IQ.v_q,PRACH_REPETITION.v_q);
                symbolsSummed++;
            }
            for(let i = 0; i < PRACH_IQ.v_i.length; i++){
                PRACH_IQ.v_i[i] /= symbolsSummed
                PRACH_IQ.v_q[i] /= symbolsSummed;
            }
        }
        else PRACH_IQ = find_PRACH(local_u,local_rtcId,frame,subframe,slot,symbol,isLongPrach);

        if(local_u == u && local_rtcId == rtcId) IQ = PRACH_IQ;
        else otherAntennasIQ.push(PRACH_IQ);
    }

    ecpri_decodePrach(IQ,otherAntennasIQ);

    prachDialog.open();
}

function decode_PDSCH(u,rtcId,symbol,frame,subframe,slot,rb,re){
    const PDSCH = 3
    const l2l1_packets = nr_l2l1_packets;
    const params_PDSCH_arr = pdsch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PDSCH,l2l1_packets);
    
    const params_PDSCH = nr_GetParametersFromParametersArr(params_PDSCH_arr,rb,re,null);
    if(!params_PDSCH) return;

    decode_PDSCH_packet_payload(params_PDSCH);
}

function decode_PDSCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re,showResult = true){
    const PDSCH = 3
    const params_PDSCH_arr = pdsch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PDSCH,nr_l2l1_packets);
    const params_PDSCH = nr_GetParametersFromParametersArr(params_PDSCH_arr,rb,re,null);
    if(!params_PDSCH) return;


    let n = -1,k = rb*12 + re - params_PDSCH["re_ref_dmrs"], k_prim = -1, l_prim = -1, l = symbol - params_PDSCH["sym_ref_dmrs"], delta = params_PDSCH["delta"];  
    
    if(params_PDSCH["dmrs_ConfigType"] === 1){
        delta = k % 2;
        n = Math.floor( (k - delta) / 4);
        k_prim = Math.floor( (k - delta - 4*n)/2 );
    } 
    else{
        k_prim = k % 2;
        n = Math.floor( (k - k_prim) / 6 );
        delta = k - k_prim - 6*n;
    }   

    for(l_bar of params_PDSCH["dmrs_sym_positions"]){ //Calculation of l_prim
        if(l - l_bar < 2){
            l_prim = l - l_bar;
            break;
        }
    }
    
    let params_to_show = {
        "n" : n,
        "k" : k,
        "k_prim" : k_prim,
        "l" : l,
        "l_prim" : l_prim,
        'N_ID' : params_PDSCH["N_ID"],
        "beta":params_PDSCH["beta_pdsch_dmrs"],

        "rank" : params_PDSCH["rank"],
        "numStreamIndex" : params_PDSCH["numStreamIndex"],
        "streamIndex" : params_PDSCH["streamIndex"],

        "spatialMode" : params_PDSCH["spatialMode"],
        "isLowPaprOptimizedPrecoding": params_PDSCH["isLowPaprOptimizedPrecoding"],
        "openLoopScheme" : params_PDSCH["openLoopScheme"],
        "pdschBundleSize" : params_PDSCH["pdschBundleSize"],

        "closedLoop3gppCodebook" : params_PDSCH["closedLoop3gppCodebook"],
        "codebookIndex" : params_PDSCH["codebookIndex"],
        "pdschPrecodingOption4x4": params_PDSCH["pdschPrecodingOption4x4"],    
    }
    if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`PDSCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML;  

    let a_tilde = {"rel" : [], "img" : []}; //for storing calculated a_tilde
    let r = {"rel" : [], "img" : []};
    for(let i = 0; i < params_PDSCH["rank"]; i++){ //In this 'for loop' dmrs for each antenna port is calculated for further precoding
        if(params_PDSCH["delta"][i] !== delta){
            a_tilde["rel"].push(0);
            a_tilde["img"].push(0);
            continue;
        }

        const n_scid = params_PDSCH["n_scid"];
        const N_ID = params_PDSCH["N_ID"];  //According to Gates
        const lambda_bar = 0; //According to Gates
        const c_init = ( 2**17 * (14*(slot + subframe*NUM_OF_SLOTS_PER_U[u]) + l + 1) * (2*N_ID + 1) + 2**17 * ( Math.floor(lambda_bar/2) ) + 2*N_ID + n_scid) % 2**31;
        const wf = params_PDSCH["dmrs_ConfigType"] === 1 ? t38_211_7_4_1_1_2_1[ params_PDSCH["dmrs_AntPorts"][i]]["wf"][k_prim] : t38_211_7_4_1_1_2_2[ params_PDSCH["dmrs_AntPorts"] ]["wf"][k_prim];
        const wt = params_PDSCH["dmrs_ConfigType"] === 1 ? t38_211_7_4_1_1_2_1[ params_PDSCH["dmrs_AntPorts"][i]]["wf"][l_prim] : t38_211_7_4_1_1_2_2[ params_PDSCH["dmrs_AntPorts"] ]["wf"][l_prim];
        
        const r_arg = 2*n + k_prim;
        const r_i = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg)[ 2 * r_arg ]);
        const r_q = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg + 1)[ 2 * r_arg + 1 ]);

        a_tilde["rel"].push( params_PDSCH["beta_pdsch_dmrs"] * wf * wt * r_i );
        a_tilde["img"].push( params_PDSCH["beta_pdsch_dmrs"] * wf * wt * r_q );

        params_to_show = {
            "c_init" : c_init,
            "r_i" : r_i,
            "r_q" : r_q,
            "a_tilde_i" : a_tilde["rel"][i],
            "a_tilde_q" : a_tilde["img"][i],
        }    
        if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`Port: ${params_PDSCH["dmrs_AntPorts"][i] + 1000}`).outerHTML;  

        r["rel"].push(r_i);
        r["img"].push(r_q);
    }    
    
    //Precoding step (Calculated a_tilde values are multiplied by precoding matrix W to map logical ports into physical eAxCs)
    //This part is based on Gates ,,5G_L1_Entity_Level" and not on 3gpp
    const bundleId = Math.floor(k / (12 * params_PDSCH["pdschBundleSize"]));
    const subcarrierForPrecoding = 12 * bundleId * params_PDSCH["pdschBundleSize"];
    
    const W = pdsch_getPrecodingMatrix(params_PDSCH,subcarrierForPrecoding,false);

    const A_tilde = new M(a_tilde["rel"], a_tilde["img"],params_PDSCH["rank"],1);
 
    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]};
    
    for(let i = 0; i < params_PDSCH["numStreamIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expected a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC ${params_PDSCH["streamIndex"][i]}`).outerHTML;  
    }         

    return r; //PDSCH PT-RS uses this
}

function decode_PUSCH_DMRS(u,rtcId,symbol,frame,subframe,slot,rb,re,showResult = true){
    const PUSCH = 15;
    const l2l1_packets = nr_l2l1_packets;
    const params_PUSCH_arr = pusch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PUSCH,l2l1_packets);
    const params_PUSCH = nr_GetParametersFromParametersArr(params_PUSCH_arr,rb,re,null);
    if(!params_PUSCH) return;

    let n = -1,k = rb*12 + re - params_PUSCH["re_ref_dmrs"], k_prim = -1, l_prim = -1, l = symbol - params_PUSCH["sym_ref_dmrs"], delta;
    
    if(params_PUSCH["dmrs_ConfigType"] === 1){
        delta = k % 2;
        n = Math.floor( (k - delta) / 4);
        k_prim = Math.floor( (k - delta - 4*n)/2 );
    } 
    else{
        k_prim = k % 2;
        n = Math.floor( (k - k_prim) / 6 );
        delta = k - k_prim - 6*n;
    }
    

    for(l_bar of params_PUSCH["dmrs_sym_positions"]){
        if(l - l_bar < 2){
            l_prim = l - l_bar;
            break;
        }
    }
    
    let a_tilde = {"rel" : [], "img" : []}; //for storing calculated a_tilde
    let params_to_show = {
        "n" : n,
        "k" : k,
        "k_prim" : k_prim,
        "l" : l,
        "l_prim" : l_prim,
        'N_ID' : params_PUSCH["N_ID"],
        "rank" : params_PUSCH["rank"],
        "codebookIndex" : params_PUSCH["codebookIndex"],
        "numCeAxCIndex" : params_PUSCH["numCeAxCIndex"],
        "ceAxCIndex" : params_PUSCH["ceAxCIndex"]
    }
    if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`PUSCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML; 

    let r = {"rel" : [], "img" : []};
    for(let i = 0; i < params_PUSCH["rank"]; i++){
        if(params_PUSCH["delta"][i] !== delta){ //a_tilde = 0 if delta corresponds to other antenna ports (38211 6.4.1.1.3)
            a_tilde["rel"].push(0);
            a_tilde["img"].push(0);
            continue;
        }
        const r_arg = 2*n + k_prim;
        const wf = params_PUSCH["dmrs_ConfigType"] === 1 ? t38_211_6_4_1_1_3_1[ params_PUSCH["dmrs_AntPorts"][i] ]["wf"][k_prim] : t38_211_6_4_1_1_3_2[ params_PUSCH["dmrs_AntPorts"][i] ]["wf"][k_prim];
        const wt = params_PUSCH["dmrs_ConfigType"] === 1 ? t38_211_6_4_1_1_3_1[ params_PUSCH["dmrs_AntPorts"][i] ]["wf"][l_prim] : t38_211_6_4_1_1_3_2[ params_PUSCH["dmrs_AntPorts"][i] ]["wf"][l_prim];
        let r_i,r_q,c_init;

        if(params_PUSCH["transformPrecoding"] === 0){ //QPSK
            const N_ID = params_PUSCH["N_ID"];   
            c_init = ( 2**17 * (14*(params_PUSCH["slot"]) + l + 1) * (2*N_ID + 1) + 2*N_ID + params_PUSCH["n_scid"]) % 2**31;
            
            r_i = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg)[ 2 * r_arg ]);
            r_q = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg + 1)[ 2 * r_arg + 1 ]);
        }
        else{
            const seq_group = (0 + params_PUSCH["N_ID"]) % 30; //parameter u
            if(params_PUSCH["pi/2ModulationTransPrecoding"] === 1){ //PI/2 BPSK (Supported in Gates)
                const N_ID = params_PUSCH["N_ID"];  
                c_init =  ( 2**17 * (14*(slot + subframe*NUM_OF_SLOTS_PER_U[u]) + l + 1) * (2*N_ID + 1) + 2*N_ID + params_PUSCH["n_scid"]) % 2**31;

                r_i = lowPAPRSequenceGenerationType2(12 * params_PUSCH["N_RB"]/2,c_init,seq_group)[0][r_arg];
                r_q = lowPAPRSequenceGenerationType2(12 * params_PUSCH["N_RB"]/2,c_init,seq_group)[1][r_arg];
            }
            else{ //LowPaprType1
                const v = 0;
                const alpha = 0;
                c_init = "N/A";
                r_i = lowPAPRSequenceGenerationType1(12 * params_PUSCH["N_RB"]/2,seq_group,v,alpha)[0][r_arg];
                r_q = lowPAPRSequenceGenerationType1(12 * params_PUSCH["N_RB"]/2,seq_group,v,alpha)[1][r_arg];
            }        
        }
        r["rel"].push(r_i); //for PT-RS
        r["img"].push(r_q); //for PT-RS

        a_tilde["rel"].push(wf * wt * r_i );
        a_tilde["img"].push(wf * wt * r_q );

        params_to_show = {
            "c_init" : c_init,
            "r_i" : r_i,
            "r_q" : r_q,
            "a_tilde_i" : a_tilde["rel"][i] * params_PUSCH["beta_pusch_dmrs"],
            "a_tilde_q" : a_tilde["img"][i] * params_PUSCH["beta_pusch_dmrs"],
        }    
        if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`Port: ${params_PUSCH["dmrs_AntPorts"][i] + 1000}`).outerHTML;  
    }    

    //Precoding step
    const W = pusch_getPrecodingMatrix(params_PUSCH["rank"],params_PUSCH["numCeAxCIndex"],params_PUSCH["codebookIndex"]); 
    const A_tilde = new M(a_tilde["rel"], a_tilde["img"],params_PUSCH["rank"],1);

    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]}; //still not multipled by beta

    for(let i = 0; i < params_PUSCH["numCeAxCIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expedted a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        if(showResult) getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC ${i}`).outerHTML; 
    }  
    
    return r; //for PT-RS    
}

function decode_PDSCH_PTRS(u,rtcId,symbol,frame,subframe,slot,rb,re){
    const PDSCH = 3
    const l2l1_packets = nr_l2l1_packets;
    const params_PDSCH_arr = pdsch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PDSCH,l2l1_packets)
    const params_PDSCH = nr_GetParametersFromParametersArr(params_PDSCH_arr,rb,re,null);
    if(!params_PDSCH) return;

    const k = rb*12 + re - params_PDSCH["re_ref_ptrs"];  //ptrs or dmrs?

    const dmrsSeq = decode_PDSCH_DMRS(u,rtcId, params_PDSCH["l0"], frame,subframe,slot,rb,re,false);

    const r_i = dmrsSeq["rel"][0]; //!PT-RS sequence is DM-RS sequence sent on first DM-RS logical port!
    const r_q = dmrsSeq["img"][0]; //!PT-RS sequence is DM-RS sequence sent on first DM-RS logical port!

    const a_tilde_i = params_PDSCH["beta_ptrs"] * r_i;
    const a_tilde_q = params_PDSCH["beta_ptrs"] * r_q;

    params_to_show = {
        "freqDensity" : params_PDSCH["ptrs_FreqDensity"],
        "timeDensity" : params_PDSCH["ptrs_TimeDensity"],
        "ReOffset" : params_PDSCH["ptrs_ReOffset"],
        "numOfPorts" : params_PDSCH["ptrs_numOfPorts"],
        "port": params_PDSCH["dmrs_AntPorts"][0],
        "r_i" : r_i,
        "r_q" : r_q,
        "a_tilde_i" : a_tilde_i,
        "a_tilde_q" : a_tilde_q,
    }    
    getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`PDSCH_PTRS u: ${u} antId: ${rtcId}`).outerHTML;  
    
    //Precoding step (Calculated a_tilde = (a_tilde_i + j*a_tilde_q) is multiplied by precoding matrix W to map logical port into physical eAxCs)
    //This part is based on Gates ,,5G_L1_Entity_Level" and not on 3gpp
    const bundleId = Math.floor(k / (12 * params_PDSCH["pdschBundleSize"]));
    const subcarrierForPrecoding = 12 * bundleId * params_PDSCH["pdschBundleSize"];

    const W = pdsch_getPrecodingMatrix(params_PDSCH,subcarrierForPrecoding,true);

    const A_tilde = new M([a_tilde_i], [a_tilde_q],1,1); //PT-RS uses 1 port in Nokia

    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]};
    
    for(let i = 0; i < params_PDSCH["numStreamIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expected a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC ${params_PDSCH["streamIndex"][i]}`).outerHTML;  
    }         
}

function decode_PUSCH_PTRS(u,rtcId,symbol,frame,subframe,slot,rb,re){
    const PUSCH = 15;
    const l2l1_packets = nr_l2l1_packets;
    const params_PUSCH_arr = pusch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PUSCH,l2l1_packets);
    const params_PUSCH = nr_GetParametersFromParametersArr(params_PUSCH_arr,rb,re,null);
    if(!params_PUSCH) return;

    //if na transform precoding
    const dmrsSeq = decode_PUSCH_DMRS(u,rtcId, params_PUSCH["l0"], frame,subframe,slot,rb,re,false);

    const r_i = dmrsSeq["rel"][0]; //!PT-RS sequence is DM-RS sequence sent on first DM-RS logical port!
    const r_q = dmrsSeq["img"][0]; //!PT-RS sequence is DM-RS sequence sent on first DM-RS logical port!

    const a_tilde_i = params_PUSCH["beta_ptrs"] * r_i;
    const a_tilde_q = params_PUSCH["beta_ptrs"] * r_q;

    params_to_show = {
        "freqDensity" : params_PUSCH["ptrs_FreqDensity"],
        "timeDensity" : params_PUSCH["ptrs_TimeDensity"],
        "ReOffset" : params_PUSCH["ptrs_ReOffset"],
        "numOfPorts" : params_PUSCH["ptrs_numOfPorts"],
        "port": params_PUSCH["dmrs_AntPorts"][0],
        "r_i" : r_i,
        "r_q" : r_q,
        "a_tilde_i" : a_tilde_i,
        "a_tilde_q" : a_tilde_q,
    }    
    getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`PUSCH_PTRS u: ${u} antId: ${rtcId}`).outerHTML;  


    //Precoding step
    const W = pusch_getPrecodingMatrix(1,params_PUSCH["numCeAxCIndex"],params_PUSCH["codebookIndex"]); 

    const A_tilde = new M([a_tilde_i], [a_tilde_q],1,1); //PT-RS uses 1 port in Nokia

    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]};
    
    for(let i = 0; i < params_PUSCH["numCeAxCIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expected a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC ${params_PUSCH["ceAxCIndex"][i]}`).outerHTML;  
    }    

}

function decode_CSIRS(u,rtcId,symbol,frame,subframe,slot,rb,re){
    const CSIRS = 11;
    const l2l1_packets = nr_l2l1_packets;
    const params_CSIRS_arr = csirs_GetParametersArr(u,rtcId,frame*10 + subframe,slot,CSIRS,l2l1_packets,config.configDialog_moreChannels);

    const k = rb*12 + re, l = symbol;
    const n = Math.floor( k / 12 );
    let params_CSIRS,k_prim = -1, k_bar = -1, l_bar = -1, l_prim = -1,j = -1;

    //This part finds csirsResourceSet, k_bar, k_prim, l_bar and l_prim for clicked RE
    //Unlike for DM-RS multiple csirsResourceSets can occur in the same range of subcarriers in symbol so algorithm has to determine which one has drawn this RE.
    let found = false;
    for( let params_CSIRS_loc of params_CSIRS_arr){    
        params_CSIRS = params_CSIRS_loc;

        const row = t38_211_7_4_1_5_3_1[ params_CSIRS["row_id"] ];           
        for(let i = 0; i < row["indexes"].length; i++){
            if(!row["k_prim"].includes( (k % 12) - params_CSIRS["k_bar_values"][i] )) continue;
            if(!row["k_prim"].includes( l - params_CSIRS["l_bar_values"][i] )) continue;

            k_bar = params_CSIRS["k_bar_values"][i];
            k_prim = (k % 12) - k_bar;
            l_bar = params_CSIRS["l_bar_values"][i];
            l_prim = l - l_bar;
            j = row["j"][i];
            found = true;
            break;
        }
        if(found) break;
    }
    if(!found) return; //Something went wrong    

    let params_to_show = {
        "n" : n,
        "k" : k,
        "k_prim" : k_prim,
        "k_bar" : k_bar,
        "l" : l,
        "l_prim" : l_prim,
        "l_bar" : l_bar,
        'N_ID' : params_CSIRS["n_ID"],
        "beta": params_CSIRS["beta_csirs"],
        "row_id" : params_CSIRS["row_id"],
        "cdmType" : params_CSIRS["cdmType"],
        "ports" : params_CSIRS["numOfPorts"],
        "csiRsPrecodingMatrix" : params_CSIRS["csiRsPrecodingMatrix"],
        "numCeAxCIndex": params_CSIRS["numCeAxCIndex"],
        "ceAxCIndex" : params_CSIRS["ceAxCIndex"]
    }
    getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`CSIRS u: ${u} antId: ${rtcId}`).outerHTML; 

    let a_tilde = {"rel" : [], "img" : []};
      for(let i = 0; i < params_CSIRS["numOfPorts"]; i++){
        const port = 3000 + i; //port = 3000 + s + j*params_CSIRS["cdmGroupSize"];

        const s = (port - 3000) % params_CSIRS["cdmGroupSize"];
        if(s > 1) continue; //When numOfPorts > 4, only s={0,1} ports are used and rest of them are skipped (Gates 9.5.4.2)

        if(Math.floor( (port - 3000)/params_CSIRS["cdmGroupSize"]) !== j ){ //this port doesnt operate on this RE
            a_tilde["rel"].push(0);
            a_tilde["img"].push(0);
            continue; 
        }

        const c_init = ( 2**10 * (14*(slot + subframe*NUM_OF_SLOTS_PER_U[u]) + l + 1) * (2*params_CSIRS["n_ID"] + 1) + params_CSIRS["n_ID"] ) % 2**31;
        const m_prim = Math.floor(n*params_CSIRS["alpha"]) + k_prim + Math.floor( k_bar * params_CSIRS["density"] / 12);
        const r_i = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * m_prim)[ 2 * m_prim ]);
        const r_q = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * m_prim + 1)[ 2 * m_prim + 1 ]);

        const wf = params_CSIRS["w_sequences_table"][s][0][k_prim];
        const wt = params_CSIRS["w_sequences_table"][s][1][l_prim];

        a_tilde["rel"].push(params_CSIRS["beta_csirs"] * wf * wt * r_i);
        a_tilde["img"].push(params_CSIRS["beta_csirs"] * wf * wt * r_q);

        params_to_show = {
            "c_init" : c_init,
            "r_i" : r_i,
            "r_q" : r_q,
            "a_tilde_i" : a_tilde["rel"][i],
            "a_tilde_q" : a_tilde["img"][i],
        }    
        getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`Port: ${port}`).outerHTML;  
    }

    const W = csirs_getPrecodingMatrix(params_CSIRS);
    const A_tilde = new M(a_tilde["rel"], a_tilde["img"],a_tilde["rel"].length,1);
    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]};

    for( let i = 0; i < params_CSIRS["numCeAxCIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expected a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC: ${params_CSIRS["ceAxCIndex"][i]}`).outerHTML; //?
    }
}

function decode_PDCCH(u, rtcId, symbol, frame, subframe, slot,rb,re){
    const PDCCH_channel_index = 2;
    const manualDecoding = !config.configDialog_moreChannels;

    const l2l1_packets = nr_l2l1_packets;
    const params_PDCCH_arr = pdcch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PDCCH_channel_index,l2l1_packets); //Ignore when manualDecoding == true
    const params_PDCCH = nr_GetParametersFromParametersArr(params_PDCCH_arr,rb,re,null); //Ignore when manualDecoding == true
    if(!params_PDCCH && !manualDecoding){
        const infoToShow = {"Error" : "Switch to MANUAL PDCCH decoding or enable ,Channels from BIP packets' in CONFIGURE panel"};
        getElementById("decode_information").innerHTML += createInfoTable(infoToShow,`PDCCH u: ${u} ant: ${rtcId}`).outerHTML;
        return;
    }

    const startPrbCORESET = manualDecoding ? -1 : params_PDCCH["startPrb"];
    const numOfPrbCORESET = manualDecoding ? -1 :params_PDCCH["numOfPrb"]; 
    const startSymbolCORESET = manualDecoding ? symbol :params_PDCCH["symbolOffset"];
    const dciSize = manualDecoding ? config.cell.pdcch_dciSize :params_PDCCH["dciSize"];
    const n_ID = manualDecoding ? config.cell.pdcch_nID :params_PDCCH["N_ID"];
    const n_RNTI = manualDecoding ? config.cell.pdcch_nRNTI :params_PDCCH["rnti"];

    const scramblingRnti = n_ID < 1007 ? 0 : n_RNTI;


    let PDCCH_IQ_v_i = [],PDCCH_IQ_v_q = [];
    if(!manualDecoding){ //IQ is taken based on L2L1 messages, supports unprecoding and interleaved PDCCH allocations,multisymbol pdcch is not yet supported!
        let pdcchAllocations = pdcch_getPdcchFreqAllocations(params_PDCCH).sort((a, b) => a[0] - b[0]);

        //This part finds the value that was used to precode PDCCH, most likely it's 1 (No precoding)
        let usedPrecodingMatrixRow = 0;
        if( [1,4].includes(params_PDCCH["pdcchPrecodingOption4x4"]) ){
            const [pdcchStartPrb,pdcchNumOfPrb] = pdcchAllocations[0];
            const finalFirstRE = 12*(startPrbCORESET + pdcchStartPrb); //re on regrid
            const finalLastRE = finalFirstRE + 12*pdcchNumOfPrb; 
            const PDCCH_PARTIAL_IQ = superselect_and_get(PDCCH_channel_index, u, rtcId, startSymbolCORESET, startSymbolCORESET+1, frame, subframe, slot, finalFirstRE, finalLastRE);
            const PDCCH_PARTIAL_IQ_MATRIX = new M(PDCCH_PARTIAL_IQ.v_i,PDCCH_PARTIAL_IQ.v_q,PDCCH_PARTIAL_IQ.v_i.length,1);

            let qpskPerPrecodingMatrix = [0,0,0,0]; //(score,index)
            let mostQpskPerPrecodingMatrix = 0;
            for(let i = 0; i < 4; i++){
                const subcarrierForPrecoding = pdcch_getSubcarrierForPrecoding(params_PDCCH,finalFirstRE/12);
                const W_inv = pdcch_getPrecodingReversalMatrix(params_PDCCH,subcarrierForPrecoding,i);
                const PDCCH_PARTIAL_IQ_UNPRECODED = PDCCH_PARTIAL_IQ_MATRIX.mul(W_inv);

                for(let j = 0; j < PDCCH_PARTIAL_IQ_UNPRECODED.v_i.length; j++){
                    const angle = iqToAngle(PDCCH_PARTIAL_IQ_UNPRECODED.v_i[j],PDCCH_PARTIAL_IQ_UNPRECODED.v_q[j]) | 0;
                    if([44,45,46,134,135,136,224,225,226,314,315,316].includes(angle) ) qpskPerPrecodingMatrix[i]++;
                }

                if(qpskPerPrecodingMatrix[i] > mostQpskPerPrecodingMatrix){
                    mostQpskPerPrecodingMatrix = qpskPerPrecodingMatrix[i];
                    usedPrecodingMatrixRow = i;
                }
            }
        }

        //This part unprecodes the IQ
        for(const [pdcchStartPrb,pdcchNumOfPrb] of pdcchAllocations){ //startPrb relative to start of CORESET not subcarrier 0 of regrid
            const finalFirstRE = 12*(startPrbCORESET + pdcchStartPrb); //re on regrid
            const finalLastRE = finalFirstRE + 12*pdcchNumOfPrb;
            const PDCCH_PARTIAL_IQ = superselect_and_get(PDCCH_channel_index, u, rtcId, startSymbolCORESET, startSymbolCORESET+1, frame, subframe, slot, finalFirstRE, finalLastRE);
            const PDCCH_PARTIAL_IQ_MATRIX = new M(PDCCH_PARTIAL_IQ.v_i,PDCCH_PARTIAL_IQ.v_q,PDCCH_PARTIAL_IQ.v_i.length,1);

            const subcarrierForPrecoding = pdcch_getSubcarrierForPrecoding(params_PDCCH,finalFirstRE/12);
            const W_inv = pdcch_getPrecodingReversalMatrix(params_PDCCH,subcarrierForPrecoding,usedPrecodingMatrixRow);

            const PDCCH_PARTIAL_IQ_UNPRECODED = PDCCH_PARTIAL_IQ_MATRIX.mul(W_inv);

            PDCCH_IQ_v_i = PDCCH_IQ_v_i.concat(PDCCH_PARTIAL_IQ_UNPRECODED.v_i);
            PDCCH_IQ_v_q = PDCCH_IQ_v_q.concat(PDCCH_PARTIAL_IQ_UNPRECODED.v_q);
        }
    }
    else{ //Manual IQ decoding, simple, just grabs the IQ marked as PDCCH from clicked symbol.
        const numRE = 12*iqNumPrb[u][rtcId][frame*10+subframe][slot*14 + symbol];
        const startRE = 12*iqStartPrb[u][rtcId][frame*10+subframe][slot*14 + symbol];
        const PDCCH_IQ = superselect_and_get(PDCCH_channel_index, u, rtcId, symbol, symbol + 1, frame, subframe, slot, 0, startRE + numRE);

        PDCCH_IQ_v_i = PDCCH_IQ.v_i.filter(x => Math.abs(x) >= 0.0001);
        PDCCH_IQ_v_q = PDCCH_IQ.v_q.filter(x => Math.abs(x) >= 0.0001);
    }

    const K = dciSize + 24;
    const E = 2*PDCCH_IQ_v_i.length;
    const n_max = 9, I_IL = 1, n_PC = 0, n_PC_wm = 0; //7.3.3 of 38212

    //1.deModulation
    const b_tilde_seq = algo_demodulateQPSK(PDCCH_IQ_v_i,PDCCH_IQ_v_q);

    // 2.deScrambling
    const f_seq = pdcch_deScramble(b_tilde_seq,scramblingRnti,n_ID);

    //3.Rate deMatching
    const d_seq = pdcch_deMatchRate(f_seq,K,n_max);

    //4.Channel deCoding
    const c_seq = pdcch_decodeChannel(d_seq,K,n_max,I_IL,n_PC,n_PC_wm,E);

    //5.CRC detachment
    const [a_seq,error] = pdcch_detachCRC(c_seq,n_RNTI);

    const dciPayloadStr = a_seq.join("");
    const errorStr = error.join("").slice(-24);

    let infoToShow;
    if(!manualDecoding){
        infoToShow = {"strtPrbCORESET" : startPrbCORESET, "numPrbCORESET" : numOfPrbCORESET,"cceRegMappingType" : params_PDCCH["cceRegMappingType"], "startCCE" : params_PDCCH["startCce"], "aggLevel" : params_PDCCH["aggregation"],
         "E" : E, "K" : K, "dciSize" : dciSize, "n_ID" : n_ID, "n_RNTI" : n_RNTI, "scramblingRnti" : scramblingRnti, "dciPayload (Decoded IQ)" : dciPayloadStr,"errorMask (CRC)" : errorStr, "dciPayload (L2L1 msg field)" : params_PDCCH["dciPayloadStr"]};
    }
    else{
        infoToShow = {"E" : E, "K" : K, "dciSize" : dciSize, "n_ID" : n_ID,"n_RNTI" : n_RNTI, "scramblingRnti" : scramblingRnti, "dciPayload (Decoded IQ)" : dciPayloadStr,"errorMask (CRC)" : errorStr};
    }

    getElementById("decode_information").innerHTML += createInfoTable(infoToShow,`PDCCH u: ${u} ant: ${rtcId}`).outerHTML;

    try{
        let DCI_decoded = decode_DCI( dciPayloadStr , n_RNTI,dciSize);
        if(DCI_decoded === null) return; //Maybe display error
        getElementById("decode_information").innerHTML += createInfoTable(DCI_decoded,`DCI decoding`).outerHTML;
    }
    catch (e) {
        getElementById("decode_information").innerHTML += e;
    }

}

function decode_PDCCH_DMRS(u, rtcId, symbol, frame, subframe, slot,rb,re){
    const PDCCH = 2;
    const l2l1_packets = nr_l2l1_packets;
    const params_PDCCH_arr = pdcch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PDCCH,l2l1_packets);
    const params_PDCCH = nr_GetParametersFromParametersArr(params_PDCCH_arr,rb,re,null);
    if(!params_PDCCH) return;

    const k = rb*12 + re - params_PDCCH["re_ref_dmrs"], l = symbol;
    const n = Math.floor( (k - 1) / 12 );
    const k_prim = Math.floor( ( k - 12*n - 1 ) / 4 );

    const N_ID = params_PDCCH["N_ID"];
    const c_init = ( 2**17 * (14*(slot + subframe*NUM_OF_SLOTS_PER_U[u]) + l + 1) * (2*N_ID + 1) + 2*N_ID ) % 2**31;
    const r_arg = 3 * n + k_prim;
    const r_i = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg)[ 2 * r_arg ]);
    const r_q = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * r_arg + 1)[ 2 * r_arg + 1 ]);

    const a_i = params_PDCCH["beta_pdcch_dmrs"] * r_i;
    const a_q = params_PDCCH["beta_pdcch_dmrs"] * r_q;

    let params_to_show = {"n" : n, "k" : k, "k_prim" : k_prim, "l": l, "N_ID" : N_ID,"beta":params_PDCCH["beta_pdcch_dmrs"], "c_init" : c_init,
         "numCeAxCIndex": params_PDCCH["numCeAxCIndex"], "ceAxCIndex" : params_PDCCH["ceAxCIndex"],
         "pdcchPrecodingOption4x4" : params_PDCCH["pdcchPrecodingOption4x4"] , "precoderGranularity" : params_PDCCH["precoderGranularity"], 
         "port":2000, "r_i" : r_i, "r_q" : r_q, "a_tilde_i" : a_i, "a_tilde_q": a_q};
    getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`PDCCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML;

    
    let subcarrierForPrecoding = pdcch_getSubcarrierForPrecoding(params_PDCCH,rb);

    const W = pdcch_getPrecodingMatrix(params_PDCCH,subcarrierForPrecoding);
    const A_tilde = new M([a_i], [a_q],1,1);
    const result = W.mul(A_tilde);
    const a = {"rel" : result["v_i"], "img" : result["v_q"]};

    for( let i = 0; i < params_PDCCH["numCeAxCIndex"]; i++){
        params_to_show = {"Expected a_i" : a["rel"][i], "Expected a_q" : a["img"][i], "Expected angle" : iqToAngle(a["rel"][i],a["img"][i] ) | 0}
        getElementById("decode_information").innerHTML += createInfoTable(params_to_show,`eAxC: ${params_PDCCH["ceAxCIndex"][i]}`).outerHTML; 
    }    
}

function decode_PUCCH_DMRS(u, rtcId, symbol, frame, subframe, slot,rb,re){
    const PUCCH = 14;
    const l2l1_packets = nr_l2l1_packets;
    const params_PUCCH_arr = pucch_GetParametersArr(u,rtcId,frame*10 + subframe,slot,PUCCH,l2l1_packets);
    const params_PUCCH = nr_GetParametersFromParametersArr(params_PUCCH_arr,rb,re,null);
    if(!params_PUCCH) return;

    const n_s_f = slot + subframe*NUM_OF_SLOTS_PER_U[u]; //slot within radio frame
    const m_0 = params_PUCCH["format"] === 1 ? params_PUCCH["initialCyclicShift"] : 0; // no interlaced mapping (F3 & F4)
    const m_cs = 0; //except F0 which is determined by HARQ
    const m_init = 0; //no interlaced mapping
    let n_cs = 0;
    for(let i = 0; i <= 7; i++){
        const l = symbol; //l + l_prim is passed to n_cs function in 3gpp!
        const c_arg = 8 * NUM_OF_SYM_IN_SLOT_PER_U[u]*n_s_f + 8*l + i;
        n_cs += 2**i * pseudoRandomSequenceGeneration(params_PUCCH["hoppingId"], 1 + c_arg)[c_arg];
    }    
    const alpha = Math.PI/6 * ( (m_0 + m_cs + m_init + n_cs) % 12 );

    if(params_PUCCH["format"] === 1){ //1PRB, 4-14 symbols, Assumes no intra-slot hopping (m_prim = 0)
        const N_SF_PUCCH_1 = t38_211_6_4_1_3_1_1_1[params_PUCCH["numOfSymbols"]][0], M_RB_PUCCH_1 = 1;
        const l = symbol - params_PUCCH["firstSymbol"]; //ofdm sym idx relative to start of PUCCH alloc

        let firstPrbWithPUCCH;
        if(params_PUCCH["frequencyHopping"] === 0 || symbol-params_PUCCH["firstSymbol"] <= Math.floor(params_PUCCH["numOfSymbols"]/2) ){
            firstPrbWithPUCCH = params_PUCCH["startPrb"];
        }
        else firstPrbWithPUCCH = params_PUCCH["secondHopPrb"];

        const z_arg = 12 * ( (rb - firstPrbWithPUCCH) * Math.ceil(params_PUCCH["numOfSymbols"]/2) + Math.ceil(l/2) ) + re;
        const m = Math.floor( z_arg / (12*M_RB_PUCCH_1) );
        const n = z_arg % (12 * M_RB_PUCCH_1);

        const r_sequence = lowPAPRSequenceGenerationType1( 12,params_PUCCH["u"], params_PUCCH["v"],alpha); 
        const r_i = r_sequence[0][n], r_q = r_sequence[1][n];

        const phi = t38_211_6_3_2_4_1_2[ N_SF_PUCCH_1 ][params_PUCCH["timeDomainOcc"]]; //phi is an array
        const w_i = Math.cos(2 * Math.PI * phi[m] / N_SF_PUCCH_1), w_q = Math.sin(2 * Math.PI * phi[m] / N_SF_PUCCH_1)

        const z_i = w_i * r_i - w_q*r_q, z_q = w_i * r_q + w_q * r_i;
        const angle = iqToAngle(z_q,z_i) | 0;

        const PUCCH_DMRS_decoded = {"m" : m, "n" : n, "l" : l, "port":2000, "freqHopping" : params_PUCCH["frequencyHopping"] ,"hoppingId" : params_PUCCH["hoppingId"],"N_SF_PUCCH_1" : N_SF_PUCCH_1,"r_i" : r_i, "r_q" : r_q,
             "Expected z_i" : z_i, "Expected z_q" : z_q, "Expected angle" : angle};
        getElementById("decode_information").innerHTML += createInfoTable(PUCCH_DMRS_decoded,`PUCCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML;
    }
    else if( params_PUCCH["format"] === 2){ //<1,16> PRB, 1 or 2 symbols
        const k = 12*rb + re; //relative to crb0 
        const z_arg = Math.floor(k/3);
        const i = z_arg % params_PUCCH["N_sf_PUCCH_2"];
        const m = Math.floor(z_arg / params_PUCCH["N_sf_PUCCH_2"]);

        const l = symbol; //ofdm sym within slot
        const N_ID = params_PUCCH["N_ID"]; 
        const c_init = ( 2**17 * (14 * n_s_f + l + 1) * (2*N_ID + 1) + 2*N_ID ) % 2**31;        
        const r_i = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * m)[ 2 * m ]);
        const r_q = 1/Math.sqrt(2) * (1 - 2*pseudoRandomSequenceGeneration(c_init,1 + 2 * m + 1)[ 2 * m + 1 ]);
        const w = 1; //occLength is not configured (in Nokia)
        
        const z_i = w * r_i, z_q = w * r_q;
        const angle = iqToAngle(z_q,z_i) | 0;

        const PUCCH_DMRS_decoded = {"m":m,"i" : i, "port":2000, "N_ID" : N_ID,"c_init":c_init,"N_SF_PUCCH_2":params_PUCCH["N_sf_PUCCH_2"], "r_i" : r_i, "r_q" : r_q,
             "Expected z_i": z_i, "Expected z_q":z_q,"Expected angle": angle
        };
        getElementById("decode_information").innerHTML += createInfoTable(PUCCH_DMRS_decoded,`PUCCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML;
    }
    else if(params_PUCCH["format"] === 3){ // <1,16> PRB and <4,14> symbols 
        let l = symbol - params_PUCCH["firstSymbol"]; //l is relative to start of PUCCH alloc
        const M_sc_PUCCH_s = 12*params_PUCCH["numOfPrb"]; //?

        let firstPrbWithPUCCH;
        if(params_PUCCH["frequencyHopping"] === 0 || symbol-params_PUCCH["firstSymbol"] <= Math.floor(params_PUCCH["numOfSymbols"]/2) ){
            firstPrbWithPUCCH = params_PUCCH["startPrb"];
        }
        else firstPrbWithPUCCH = params_PUCCH["secondHopPrb"];

        let k = 12*rb + re - 12*firstPrbWithPUCCH; //subcarrier relative to start of PUCCH allocation        

        let r_i,r_q;
        if(params_PUCCH["dmrsSequenceType"] === 0){//params_PUCCH["modulation"] should be set to QPSK
            const r_sequence = lowPAPRSequenceGenerationType1( M_sc_PUCCH_s,params_PUCCH["u"], params_PUCCH["v"],alpha);
            r_i = r_sequence[0][k], r_q = r_sequence[1][k];
        }
        else{ //params_PUCCH["modulation"] should be pi/2-BPSK
            const c_init = ( 2**17 * (14 * n_s_f + l + 1) * (2*params_PUCCH["N_ID"] + 1) + 2*params_PUCCH["N_ID"] ) % 2**31;   //same as for Format 2
            const r_sequence = lowPAPRSequenceGenerationType2(M_sc_PUCCH_s,c_init,params_PUCCH["u"]);
            r_i = r_sequence[0][k], r_q = r_sequence[1][k];
        }

        const angle = iqToAngle(r_q,r_i) | 0;

        const PUCCH_DMRS_decoded = {"k":k,"l" : l,"port":2000, "M_sc_PUCCH_s" : M_sc_PUCCH_s, "Expected r_i" : r_i, "Expected r_q" : r_q, "Expected angle": angle};
        getElementById("decode_information").innerHTML += createInfoTable(PUCCH_DMRS_decoded,`PUCCH_DMRS u: ${u} antId: ${rtcId}`).outerHTML;
    }    
}

function decode_SRS(u,rtcId,symbol,frame,subframe,slot,rb,re){
    // console.log("Dekoduje SRS");
    const SRS = 19;
    const l2l1_packets = nr_l2l1_packets;

    let params_SRS = null;
    // let source_subframe = frame*10 + subframe;
    for(let i = 0; i < 50; i++){ //Searches back up to 50 slots to find L2L1 packet that scheduled this periodic SRS
        let source_slot_absolute = slot - i + (frame*10+subframe)*NUM_OF_SLOTS_PER_U[u]; 
        let source_slot = source_slot_absolute % NUM_OF_SLOTS_PER_U[u]; //slot in subframe
        let source_subframe_absolute = Math.floor(source_slot_absolute / NUM_OF_SLOTS_PER_U[u]);
        const params_SRS_arr = srs_GetParametersArr(u,rtcId,source_subframe_absolute,source_slot,SRS,l2l1_packets);
        // console.log("source_slot:",source_slot,"source_sf:",source_subframe_absolute);
        if(!params_SRS_arr) continue;
      
        params_SRS = nr_GetParametersFromParametersArr(params_SRS_arr,rb,re,null);
        // console.log("params_SRS",params_SRS)
        if(params_SRS) break;
    }
    if(!params_SRS) return; //Maybe show an error?

    const k = rb*12 + re;
    const k_prim  = (k - params_SRS["k0"]) / params_SRS["K_TC"];

    const delta = Math.log2(params_SRS["K_TC"]); //I think we dont need it really
    for(let i = 0; i < 1; i++){ //params_SRS["N_ap_SRS"]
        const alpha = params_SRS["alpha"][i];
        const r_i = lowPAPRSequenceGenerationType1(params_SRS["M_sc_b_SRS"],params_SRS["seq_group"],params_SRS["base_seq_nr"],alpha)[0][k_prim];
        const r_q = lowPAPRSequenceGenerationType1(params_SRS["M_sc_b_SRS"],params_SRS["seq_group"],params_SRS["base_seq_nr"],alpha)[1][k_prim];
    
        const a_i = 1/Math.sqrt(params_SRS["N_ap_SRS"]) * params_SRS["beta_SRS"] * r_i;
        const a_q = 1/Math.sqrt(params_SRS["N_ap_SRS"]) * params_SRS["beta_SRS"] * r_q;
        const angle = iqToAngle(a_i,a_q ) | 0;

        const SRS_decoded = {"n_ID_SRS" : params_SRS["n_ID_SRS"], "K_TC": params_SRS["K_TC"], "k" : k, "k_prim":k_prim,"r_i":r_i,"r_q":r_q, "a_i" : a_i, "a_q" : a_q, "angle" : angle};
        getElementById("decode_information").innerHTML += createInfoTable(SRS_decoded,`SRS u: ${u} antId: ${rtcId}`).outerHTML;
    }

    let res_i = [];
    for(let i_sample of lowPAPRSequenceGenerationType1(48,21,0,0.785)[0]) res_i.push(i_sample);

    let res_q = []
    for(let q_sample of lowPAPRSequenceGenerationType1(48,21,0,0.785)[1]) res_q.push(q_sample);

    console.log(res_i.slice(0,20));
    console.log(res_q.slice(0,20));

   
}

function decode_SS_block(u, rtcId, symbol, frame, subframe, slot){
    const PBCH_channel_index = 1;
    const PSS_channel_index = 4;
    const SSS_channel_index = 5;
    const DMRS_channel_index = 6;

    let L_max;
    if ( config.cell.carrierFrequency === "<3" ) L_max =  4;
    else if ( config.cell.carrierFrequency === "3_6" ) L_max =  8;
    else if ( config.cell.carrierFrequency === "6<" ) L_max = 64;

    //Step 1 -> Find and decode PSS & SSS to aquire PCI and mark proper resource elements as DM-RS
    let i = 0;
    for(i = 0; i < 4; i++){
        const PSS = superselect_and_get(PSS_channel_index, u, rtcId, symbol - i, symbol+1 - i, frame, subframe, slot, 0, 273*12);
        const SSS = superselect_and_get(SSS_channel_index, u, rtcId, symbol+2 - i, symbol+2+1 - i, frame, subframe, slot, 0, 273*12);

        if(PSS.v_i.length === 127 && SSS.v_i.length === 127){
            const PSS_decoded = decode_PSS(PSS);
            const N_ID_2 = PSS_decoded.N_ID_2;

            const SSS_decoded = decode_SSS(SSS, N_ID_2 );

            const N_ID_cell = SSS_decoded.PCI;
            if(N_ID_cell != config.cell.pci){
                config.cell.pci = N_ID_cell;
                config.cell.pdcch_nID = config.cell.pci;
                config.cell.csirs_scramblingID = config.cell.pci;
                configDialog.setToUI();
                configDialog_apply(); //DM-RS must be re-drawn as it's pos depends on PCI
            }

            getElementById("decode_information").innerHTML += createInfoTable(PSS_decoded, `PSS u: ${u} ant: ${rtcId}`).outerHTML;
            getElementById("decode_information").innerHTML += createInfoTable(SSS_decoded, `SSS u: ${u} ant: ${rtcId}`).outerHTML;

            if(SSS_decoded.correlation < 0.8){
                getElementById("decode_information").innerHTML += "The SSS correlation is very low. Is the file loaded correctly? Check the constellation";
                return;
            }
            break;
        }
    }

    const DMRS_IQ = superselect_and_get(DMRS_channel_index, u, rtcId, symbol+1 - i, symbol+4 - i, frame, subframe, slot, 0, 273*12);
    const PBCH_IQ = superselect_and_get(PBCH_channel_index, u, rtcId, symbol+1 - i , symbol+4 - i, frame, subframe, slot, 0, 273*12);

    if(i === 4 || PBCH_IQ.v_i.length !== 432 || DMRS_IQ.v_i.length !== 144 ){
        getElementById("decode_information").innerHTML += "Could not decode SS block. Is the SSB position correct?";
        return;
    }

    //Step 2 -> Decode DM-RS to aquire LSB of ssbIndex and half-frame index.
    const DMRS_decoded = decode_PBCH_DMRS(DMRS_IQ,config.cell.pci,L_max);
    const ssbIndexLSBs = DMRS_decoded.ssbIndexLSBs;
    getElementById("decode_information").innerHTML += createInfoTable(DMRS_decoded, `PBCH DM-RS u: ${u} ant: ${rtcId}`).outerHTML;

    //Step 3 -> Decode PBCH
    const PBCH_decoded = decode_PBCH(PBCH_IQ,config.cell.pci,ssbIndexLSBs,L_max);
    if(PBCH_decoded === null){
        getElementById("decode_information").innerHTML += "Could not decode SS block (Wrong number of samples)";
        return;
    }
    getElementById("decode_information").innerHTML += createInfoTable(PBCH_decoded, `PBCH u: ${u} ant: ${rtcId}`).outerHTML;
}

//Based on 7.4.2.2 of 38211 (Primary synchronization signal)
function decode_PSS(iq){
    let bestNID_id = 0, bestNID = 0;
    let correlations = [];
    for(let N_ID_2 = 0; N_ID_2 <= 2; N_ID_2 ++){
        const idealIQ = pss_encode(N_ID_2);
        const corr = iqCorrelation(iq, idealIQ);
        correlations.push(corr);
        if(corr > bestNID) {
            bestNID_id = N_ID_2;
            bestNID = corr;
        }

    }
    return {"N_ID_2":bestNID_id,"N_ID_2_corr":correlations.toString()};
}

//Based on 7.4.2.3 of 38211 (Secondary synchronization signal)
function decode_SSS(iq, N_ID_2){
    let bestNID1_id = 0, bestCorr = 0;

    let x0 = [ 1,0,0,0,0,0,0 ];
    let x1 = [ 1,0,0,0,0,0,0 ];

    for( let i = 0; i<120; i++){
        x0[i+7] = x0[i+4]^x0[i];
        x1[i+7] = x1[i+1]^x1[i];
    }

    for(let N_ID_1 = 0; N_ID_1 <= 335; N_ID_1++){
            const idealIQ = sss_encode(N_ID_1, N_ID_2, x0, x1);
            const corr = iqCorrelation(iq, idealIQ);

            if(corr > bestCorr){
                bestNID1_id = N_ID_1;
                bestCorr = corr;
            }
    }
    
    return {"N_ID_1":bestNID1_id, "PCI":bestNID1_id*3+N_ID_2, "correlation" : bestCorr};
}

//Based on 7.4.1.4 of 38211 (Demodulation reference signals for PBCH)
function decode_PBCH_DMRS(DMRS_IQ, N_ID_cell, L_max){

    let result = {"n_hf" : -1, "ssbIndexLSBs" : -1, "correlation" : 0};
    for(let n_hf = 0; n_hf < (L_max == 4 ? 2 : 1); n_hf++){ //for L_max > 4 second iteration can be ommited
        for(let ssbIndexLSBs = 0; ssbIndexLSBs < (L_max == 4 ? 4 : 8); ssbIndexLSBs++){
            const PERFECT_DMRS = pbch_encode_dmrs(N_ID_cell,n_hf,L_max,ssbIndexLSBs);
            const correlation = iqCorrelation(DMRS_IQ,PERFECT_DMRS);

            if(correlation > result.correlation){
                result.correlation = correlation;

                if( L_max == 4 ){
                    result.n_hf = n_hf;
                    result.ssbIndexLSBs = ssbIndexLSBs & 0b11;
                }
                else{
                    result.n_hf = 0;
                    result.ssbIndexLSBs = ssbIndexLSBs & 0b111;
                }
            }
        }
    }

    return result;
}

//ssbIndexLSB is obtained from associated DM-RS
//N_ID_cell is obtained from SSS
//L_max depends on selected frequency range
//Returns object on success or null
function decode_PBCH(PBCH_IQ,N_ID_cell,ssbIndexLSBs,L_max){

    const b_tilde = pbch_demodulate(PBCH_IQ);

    const f = pbch_deScramble(b_tilde,N_ID_cell,L_max,ssbIndexLSBs);

    const K = 56; //23(MIB) + 1(BCH) + 8(L1) + 24 (CRC)
    const E = f.length;
    const n_max = 9, I_IL = 1, n_PC = 0, n_PC_wm = 0; //Given by 7.1.4 of 38212
    const d = pbch_deMatchRate(f,K,n_max);

    const c = pbch_decodeChannel(d,K,n_max,I_IL,n_PC,n_PC_wm,E);

    const [a_prim,error] = pbch_detachCRC(c);
    if(error.filter(x => x > 0).length > 0) return {"Error" : "CRC indicates problem with decoding", "CRC" : error, "Possible fix" : "Apply Phase Compensation in CONFIGURE panel" };

    const a = pbch_deScrambleTB(a_prim,N_ID_cell,L_max);

    const decodedMessage = pbch_extractPayload(a,ssbIndexLSBs,L_max);
    return decodedMessage;
}

function superselect_and_get(sel_chan, u, rtcId, symb_min, symb_max, frame, subframe, slot, sc_min, sc_max){
    let v_i = [], v_q = [];

    try{
        for(let i = symb_min; i < symb_max; i++){
            const iqBuffersOffset = iqOffsets[u][rtcId][frame*10+subframe][slot*14+i];
            const typeOffset = iqBuffersOffset/2;
            const startPrb = iqStartPrb[u][rtcId][frame*10+subframe][slot*14+i];
            const numPrb = iqNumPrb[u][rtcId][frame*10+subframe][slot*14+i];

            for(let j = Math.max(0,sc_min - 12*startPrb); j < Math.min(sc_max - 12*startPrb, 12*(numPrb)); j++){ //Buffers are not indexed from 0 but iqStartPrb

                if(iqTypeBuffers[u][rtcId][typeOffset + j] === sel_chan || sel_chan === -1){
                    v_i.push(iqBuffers[u][rtcId][iqBuffersOffset + j*2]);
                    v_q.push(iqBuffers[u][rtcId][iqBuffersOffset + j*2 + 1]);
                }
            }
        }
    }
    catch (e) {}
    return {"v_i": v_i, "v_q": v_q};
}

//Cosine similarity
function iqCorrelation(a,b){
    let sum = {"re" : 0, "im" : 0};
    let normA = 0, normB = 0;

    for(let k = 0; k < a.v_i.length; k++){
        sum["re"] += b.v_i[k]*a.v_i[k] + b.v_q[k]*a.v_q[k];  //⟨a,b⟩=∑ak​bk∗​
        sum["im"] += b.v_i[k]*a.v_q[k] - b.v_q[k]*a.v_i[k]; //⟨a,b⟩=∑ak​bk∗​

        normA += a.v_i[k] ** 2 + a.v_q[k] ** 2;
        normB += b.v_i[k] ** 2 + b.v_q[k] ** 2;
    }

    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    if(denom === 0) return 0;

    const magnitude = Math.hypot(sum.re / denom, sum.im / denom);

    const corr = magnitude;

    return Math.round(corr * 1000) / 1000;
}

function largest_prime_less_than(n){
    let isPrime = new Array(n+1).fill(true);
    
    let sqrt = Math.floor(Math.sqrt(n));
    for(let i = 2; i < sqrt + 1; i++){
        if(isPrime[i]){
            for(let j = i*i; j <= n; j+=i){
                isPrime[j] = false;
            }
        }
    }

    for(let i = n-1; i>=0 ; i--) if(isPrime[i]) return i;
    return -1;
}

function baseSequenceGeneration(M_ZC, u, v){ //Based on 5.2.2.2 of 38.211, u is seq_group nr, v is base seq nr
    const t38_211_5_2_2_2_1 = [
        [-3, -1, 3, 3, -1, -3],
        [-3, 3, -1, -1, 3, -3],
        [-3, -3, -3, 3, 1, -3],
        [1, 1, 1, 3, -1, -3],
        [1, 1, 1, -3, -1, 3],
        [-3, 1, -1, -3, -3, -3],
        [-3, 1, 3, -3, -3, -3],
        [-3, -1, 1, -3, 1, -1],
        [-3, -1, -3, 1, -3, -3],
        [-3, -3, 1, -3, 3, -3],
        [-3, 1, 3, 1, -3, -3],
        [-3, -1, -3, 1, 1, -3],
        [1, 1, 3, -1, -3, 3],
        [1, 1, 3, 3, -1, 3],
        [1, 1, 1, -3, 3, -1],
        [1, 1, 1, -1, 3, -3],
        [-3, -1, -1, -1, 3, -1],
        [-3, -3, -1, 1, -1, -3],
        [-3, -3, -3, 1, -3, -1],
        [-3, 1, 1, -3, -1, -3],
        [-3, 3, -3, 1, 1, -3],
        [-3, 1, -3, -3, -3, -1],
        [1, 1, -3, 3, 1, 3],
        [1, 1, -3, -3, 1, -3],
        [1, 1, 3, -1, 3, 3],
        [1, 1, -3, 1, 3, 3],
        [1, 1, -1, -1, 3, -1],
        [1, 1, -1, 3, -1, -1],
        [1, 1, -1, 3, -3, -1],
        [1, 1, -3, 1, -1, -1],
    ]

    const t38_211_5_2_2_2_2 = [
        [-3, 1, -3, -3, -3, 3, -3, -1, 1, 1, 1, -3],
        [-3, 3, 1, -3, 1, 3, -1, -1, 1, 3, 3, 3],
        [-3, 3, 3, 1, -3, 3, -1, 1, 3, -3, 3, -3],
        [-3, -3, -1, 3, 3, 3, -3, 3, -3, 1, -1, -3],
        [-3, -1, -1, 1, 3, 1, 1, -1, 1, -1, -3, 1],
        [-3, -3, 3, 1, -3, -3, -3, -1, 3, -1, 1, 3],
        [1, -1, 3, -1, -1, -1, -3, -1, 1, 1, 1, -3],
        [-1, -3, 3, -1, -3, -3, -3, -1, 1, -1, 1, -3],
        [-3, -1, 3, 1, -3, -1, -3, 3, 1, 3, 3, 1],
        [-3, -1, -1, -3, -3, -1, -3, 3, 1, 3, -1, -3],
        [-3, 3, -3, 3, 3, -3, -1, -1, 3, 3, 1, -3],
        [-3, -1, -3, -1, -1, -3, 3, 3, -1, -1, 1, -3],
        [-3, -1, 3, -3, -3, -1, -3, 1, -1, -3, 3, 3],
        [-3, 1, -1, -1, 3, 3, -3, -1, -1, -3, -1, -3],
        [1, 3, -3, 1, 3, 3, 3, 1, -1, 1, -1, 3],
        [-3, 1, 3, -1, -1, -3, -3, -1, -1, 3, 1, -3],
        [-1, -1, -1, -1, 1, -3, -1, 3, 3, -1, -3, 1],
        [-1, 1, 1, -1, 1, 3, 3, -1, -1, -3, 1, -3],
        [-3, 1, 3, 3, -1, -1, -3, 3, 3, -3, 3, -3],
        [-3, -3, 3, -3, -1, 3, 3, 3, -1, -3, 1, -3],
        [3, 1, 3, 1, 3, -3, -1, 1, 3, 1, -1, -3],
        [-3, 3, 1, 3, -3, 1, 1, 1, 1, 3, -3, 3],
        [-3, 3, 3, 3, -1, -3, -3, -1, -3, 1, 3, -3],
        [3, -1, -3, 3, -3, -1, 3, 3, 3, -3, -1, -3],
        [-3, -1, 1, -3, 1, 3, 3, 3, -1, -3, 3, 3],
        [-3, 3, 1, -1, 3, 3, -3, 1, -1, 1, -1, 1],
        [-1, 1, 3, -3, 1, -1, 1, -1, -1, -3, 1, -1],
        [-3, -3, 3, 3, 3, -3, -1, 1, -3, 3, 1, -3],
        [1, -1, 3, 1, 1, -1, -1, -1, 1, 3, -3, 1],
        [-3, 3, -3, 3, -3, -3, 3, -1, -1, 1, 3, -3]
    ]
    
    const t38_211_5_2_2_2_3 = [
        [-1, 3, -1, -3, 3, 1, -3, -1, 3, -3, -1, -1, 1, 1, 1, -1, -1, -1],
        [3, -3, 3, -1, 1, 3, -3, -1, -3, -3, -1, -3, 3, 1, -1, 3, -3, 3],
        [-3, 3, 1, -1, -1, 3, -3, -1, 1, 1, 1, 1, 1, -1, 3, -1, -3, -1],
        [-3, -3, 3, 3, 3, 1, -3, 1, 3, 3, 1, -3, -3, 3, -1, -3, -1, 1],
        [1, 1, -1, -1, -3, -1, 1, -3, -3, -3, 1, -3, -1, -1, 1, -1, 3, 1],
        [3, -3, 1, 1, 3, -1, 1, -1, -1, -3, 1, 1, -1, 3, 3, -3, 3, -1],
        [-3, 3, -1, 1, 3, 1, -3, -1, 1, 1, -3, 1, 3, 3, -1, -3, -3, -3],
        [1, 1, -3, 3, 3, 1, 3, -3, 3, -1, 1, 1, -1, 1, -3, -3, -1, 3],
        [-3, 1, -3, -3, 1, -3, -3, 3, 1, -3, -1, -3, -3, -3, -1, 1, 1, 3],
        [3, -1, 3, 1, -3, -3, -1, 1, -3, -3, 3, 3, 3, 1, 3, -3, 3, -3],
        [-3, -3, -3, 1, -3, 3, 1, 1, 3, -3, -3, 1, 3, -1, 3, -3, -3, 3],
        [-3, -3, 3, 3, 3, -1, -1, -3, -1, -1, -1, 3, 1, -3, -3, -1, 3, -1],
        [-3, -1, -3, -3, 1, 1, -1, -3, -1, -3, -1, -1, 3, 3, -1, 3, 1, 3],
        [1, 1, -3, -3, -3, -3, 1, 3, -3, 3, 3, 1, -3, -1, 3, -1, -3, 1],
        [-3, 3, -1, -3, -1, -3, 1, 1, -3, -3, -1, -1, 3, -3, 1, 3, 1, 1],
        [3, 1, -3, 1, -3, 3, 3, -1, -3, -3, -1, -3, -3, 3, -3, -1, 1, 3],
        [-3, -1, -3, -1, -3, 1, 3, -3, -1, 3, 3, 3, 1, -1, -3, 3, -1, -3],
        [-3, -1, 3, 3, -1, 3, -1, -3, -1, 1, -1, -3, -1, -1, -1, 3, 3, 1],
        [-3, 1, -3, -1, -1, 3, 1, -3, -3, -3, -1, -3, -3, 1, 1, 1, -1, -1],
        [3, 3, 3, -3, -1, -3, -1, 3, -1, 1, -1, -3, 1, -3, -3, -1, 3, 3],
        [-3, 1, 1, -3, 1, 1, 3, -3, -1, -3, -1, 3, -3, 3, -1, -1, -1, -3],
        [1, -3, -1, -3, 3, 3, -1, -3, 1, -3, -3, -1, -3, -1, 1, 3, 3, 3],
        [-3, -3, 1, -1, -1, 1, 1, -3, -1, 3, 3, 3, 3, -1, 3, 1, 3, 1],
        [3, -1, -3, 1, -3, -3, -3, 3, 3, -1, 1, -3, -1, 3, 1, 1, 3, 3],
        [3, -1, -1, 1, -3, -1, -3, -1, -3, -3, -1, -3, 1, 1, 1, -3, -3, 3],
        [-3, -3, 1, -3, 3, 3, 3, -1, 3, 1, 1, -3, -3, -3, 3, -3, -1, -1],
        [-3, -1, -1, -3, 1, -3, 3, -1, -1, -3, 3, 3, -3, -1, 3, -1, -1, -1],
        [-3, -3, 3, 3, -3, 1, 3, -1, -3, 1, -1, -3, 3, -3, -1, -1, -1, 3],
        [-1, -3, 1, -3, -3, -3, 1, 1, 3, 3, -3, 3, 3, -3, -1, 3, -3, 1],
        [-3, 3, 1, -1, -1, -1, -1, 1, -1, 3, 3, -3, -1, 1, 3, -1, 3, -1],
    ]
    
    const t38_211_5_2_2_2_4 = [
        [-1, -3, 3, -1, 3, 1, 3, -1, 1, -3, -1, -3, -1, 1, 3, -3, -1, -3, 3, 3, 3, -3, -3, -3],
        [-1, -3, 3, 1, 1, -3, 1, -3, -3, 1, -3, -1, -1, 3, -3, 3, 3, 3, -3, 1, 3, 3, -3, -3],
        [-1, -3, -3, 1, -1, -1, -3, 1, 3, -1, -3, -1, -1, -3, 1, 1, 3, 1, -3, -1, -1, 3, -3, -3],
        [1, -3, 3, -1, -3, -1, 3, 3, 1, -1, 1, 1, 3, -3, -1, -3, -3, -3, -1, 3, -3, -1, -3, -3],
        [-1, 3, -3, -3, -1, 3, -1, -1, 1, 3, 1, 3, -1, -1, -3, 1, 3, 1, -1, -3, 1, -1, -3, -3],
        [-3, -1, 1, -3, -3, 1, 1, -3, 3, -1, -1, -3, 1, 3, 1, -1, -3, -1, -3, 1, -3, -3, -3, -3],
        [-3, 3, 1, 3, -1, 1, -3, 1, -3, 1, -1, -3, -1, -3, -3, -3, -3, -1, -1, -1, 1, 1, -3, -3],
        [-3, 1, 3, -1, 1, -1, 3, -3, 3, -1, -3, -1, -3, 3, -1, -1, -1, -3, -1, -1, -3, 3, 3, -3],
        [-3, 1, -3, 3, -1, -1, -1, -3, 3, 1, -1, -3, -1, 1, 3, -1, 1, -1, 1, -3, -3, -3, -3, -3],
        [1, 1, -1, -3, -1, 1, 1, -3, 1, -1, 1, -3, 3, -3, -3, 3, -1, -3, 1, 3, -3, 1, -3, -3],
        [-3, -3, -3, -1, 3, -3, 3, 1, 3, 1, -3, -1, -1, -3, 1, 1, 3, 1, -1, -3, 3, 1, 3, -3],
        [-3, 3, -1, 3, 1, -1, -1, -1, 3, 3, 1, 1, 1, 3, 3, 1, -3, -3, -1, 1, -3, 1, 3, -3],
        [3, -3, 3, -1, -3, 1, 3, 1, -1, -1, -3, -1, 3, -3, 3, -1, -1, 3, 3, -3, -3, 3, -3, -3],
        [-3, 3, -1, 3, -1, 3, 3, 1, 1, -3, 1, 3, -3, 3, -3, -3, -1, 1, 3, -3, -1, -1, -3, -3],
        [-3, 1, -3, -1, -1, 3, 1, 3, -3, 1, -1, 3, 3, -1, -3, 3, -3, -1, -1, -3, -3, -3, 3, -3],
        [-3, -1, -1, -3, 1, -3, -3, -1, -1, 3, -1, 1, -1, 3, 1, -3, -1, 3, 1, 1, -1, -1, -3, -3],
        [-3, -3, 1, -1, 3, 3, -3, -1, 1, -1, -1, 1, 1, -1, -1, 3, -3, 1, -3, 1, -1, -1, -1, -3],
        [3, -1, 3, -1, 1, -3, 1, 1, -3, -3, 3, -3, -1, -1, -1, -1, -1, -3, -3, -1, 1, 1, -3, -3],
        [-3, 1, -3, 1, -3, -3, 1, -3, 1, -3, -3, -3, -3, -3, 1, -3, -3, 1, 1, -3, 1, 1, -3, -3],
        [-3, -3, 3, 3, 1, -1, -1, -1, 1, -3, -1, 1, -1, 3, -3, -1, -3, -1, -1, 1, -3, 3, -1, -3],
        [-3, -3, -1, -1, -1, -3, 1, -1, -3, -1, 3, -3, 1, -3, 3, -3, 3, 3, 1, -1, -1, 1, -3, -3],
        [3, -1, 1, -1, 3, -3, 1, 1, 3, -1, -3, 3, 1, -3, 3, -1, -1, -1, -1, 1, -3, -3, -3, -3],
        [-3, 1, -3, 3, -3, 1, -3, 3, 1, -1, -3, -1, -3, -3, -3, -3, 1, 3, -1, 1, 3, 3, 3, -3],
        [-3, -1, 1, -3, -1, -1, 1, 1, 1, 3, 3, -1, 1, -1, 1, -1, -1, -3, -3, -3, 3, 1, -1, -3],
        [-3, 3, -1, -3, -1, -1, -1, 3, -1, -1, 3, -3, -1, 3, -3, 3, -3, -1, 3, 1, 1, -1, -3, -3],
        [-3, 1, -1, -3, -3, -1, 1, -3, -1, -3, 1, 1, -1, 1, 1, 3, 3, 3, -1, 1, -1, 1, -1, -3],
        [-1, 3, -1, -1, 3, 3, -1, -1, -1, 3, -1, -3, 1, 3, 1, 1, -3, -3, -3, -1, -3, -1, -3, -3],
        [3, -3, -3, -1, 3, 3, -3, -1, 3, 1, 1, 1, 3, -1, 3, -3, -1, 3, -1, 3, 1, -1, -3, -3],
        [-3, 1, -3, 1, -3, 1, 1, 3, 1, -3, -3, -1, 1, 3, -1, -3, 3, 1, -1, -3, -3, -3, -3, -3],
        [3, -3, -1, 1, 3, -1, -1, -3, -1, 3, -1, -3, -1, -3, 3, -1, 3, 1, 1, -3, 3, -3, -3, -3],
    ]

    const N_ZC = largest_prime_less_than(M_ZC);
    const q_bar = N_ZC * (u + 1) / 31;
    const q = Math.floor(q_bar + 0.5) + v * (-1) ** Math.floor(2*q_bar);
    
    let r_bar_i = new Array( M_ZC ), r_bar_q = new Array( M_ZC );
    if(M_ZC >= 36){
        let x_i = new Array( N_ZC ), x_q = new Array( N_ZC );
        for(let m = 0; m < N_ZC; m++){
            x_i[m] = Math.cos( Math.PI * q * m * (m + 1) / N_ZC); //e**(j*phi) = cos(phi) + jsin(phi)
            x_q[m] = Math.sin( -Math.PI * q * m * (m + 1) / N_ZC);
        }
        // console.log(x_i,x_q);
        
        for(let n = 0; n < M_ZC; n++){
            r_bar_i[n] = x_i[n % N_ZC];
            r_bar_q[n] = x_q[n % N_ZC];
        }
    }
    else{
        if(![6,12,18,24,30].includes(M_ZC)) return [[],[]]//error 
        if([6,12,18,24].includes(M_ZC)){
            let table;
            switch(M_ZC){
                case 6: table = t38_211_5_2_2_2_1; break;
                case 12: table = t38_211_5_2_2_2_2; break;
                case 18: table = t38_211_5_2_2_2_3; break;
                case 24: table = t38_211_5_2_2_2_4; break;
            }

            for(let n = 0; n < M_ZC; n++){
                const phi = table[u][n];
                r_bar_i[n] = Math.cos( phi * Math.PI / 4 );
                r_bar_q[n] = Math.sin( phi * Math.PI / 4 );
            }
        }
        else{
            for( let n = 0; n < 30; n++){
                r_bar_i[n] = Math.cos( Math.PI * (u + 1) * (n + 1) * (n + 2) / 31 );
                r_bar_q[n] = Math.sin(  -Math.PI * (u + 1) * (n + 1) * (n + 2) / 31 );
            }
        }
    }
   
    return [r_bar_i,r_bar_q];
}

function lowPAPRSequenceGenerationType1(M_ZC,u,v,alpha){ //Based on 5.2.2 of 38.211
    const [r_bar_i, r_bar_q] = baseSequenceGeneration(M_ZC, u,v);

    let r_i = new Array( M_ZC ), r_q = new Array( M_ZC );
    for(let n = 0; n < M_ZC; n++){
        const e_x = Math.cos(alpha * n), e_y = Math.sin(alpha * n);
        r_i[n] = e_x * r_bar_i[n] - e_y*r_bar_q[n];
        r_q[n] = e_x * r_bar_q[n] + r_bar_i[n] * e_y;
    }
    
    return [r_i,r_q];
}

function lowPAPRSequenceGenerationType2(M,c_init,u){ //Based on 5.2.3 of 38.211
    const [r_tilde_i, r_tilde_q] = r_tildeSequenceGeneration(M,c_init,u);

    if(r_tilde_i === null || r_tilde_q === null) return [null,null];
    let r_i = new Array( M ).fill(0), r_q = new Array( M ).fill(0);
    for(let n = 0; n < M; n++){
        for(let i = 0; i < M; i++){
            const e_x = Math.cos(2 * Math.PI * i * n / M), e_y = Math.sin(- 2 * Math.PI * i * n / M);
            r_i[n] += r_tilde_i[i] * e_x - r_tilde_q[i] * e_y;
            r_q[n] += r_tilde_i[i] * e_y + e_x * r_tilde_q[i];
        }
        r_i[n] /= Math.sqrt(M), r_q[n] /= Math.sqrt(M);
    }
    
    return [r_i,r_q];
}

function r_tildeSequenceGeneration(M,c_init,u){
    const t38_211_5_2_3_2_1 = [
        [-1, -7, -3, -5, -1, 3],
        [-1, 3, 7, -3, 7, 3],
        [-1, 3, 1, 5, -1, -5],
        [-7, -3, -7, 5, -7, -3],
        [7, 5, -1, -7, -3, 1],
        [3, -3, 1, 5, -1, -1],
        [-7, -3, -7, -3, 7, -5],
        [-7, -3, 1, -5, -1, -5],
        [-7, -3, 3, -3, -7, -3],
        [-7, -7, -1, 1, -5, 1],
        [-7, -3, -7, 5, -1, 5],
        [-7, -7, -3, 1, 5, -1],
        [5, 7, -3, -5, 5, -5],
        [-3, 7, -5, -1, -5, -1],
        [5, -7, 7, 1, 5, 1],
        [-7, 3, 1, 5, -1, 3],
        [-7, -5, -1, -7, -5, 5],
        [-7, 1, -3, 3, 7, 5],
        [-7, -7, 3, 5, 1, 5],
        [-7, -3, 3, -1, 3, -5],
        [-7, -5, 5, 3, -7, -1],
        [1, 5, 1, 5, 3, 7],
        [1, -3, 1, -5, -1, 3],
        [1, 7, 1, -5, -7, -1],
        [1, -1, 3, -1, -7, -3],
        [1, -1, -5, -1, 3, -3],
        [1, -1, 3, -1, 3, 7],
        [-5, 3, 7, 5, 3, 7],
        [-7, 1, -3, 1, 5, 1],
        [1, 5, 3, -7, 5, -3]
    ]

    const t38_211_5_2_3_2_2 = [
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1]       
    ]

    const t38_211_5_2_3_2_3 = [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
        [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
       
    ]
    
    const t38_211_5_2_3_2_4 = [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
        [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
    ]
    
    if(M >= 30){ //5.2.3.1 of 38.211
        const bits = pseudoRandomSequenceGeneration(c_init,M);
        let d_i = new Array(M), d_q = new Array(M);
        for(let i = 0; i < M; i++){
            const z1_x = Math.cos(Math.PI/2 * (i % 2))/Math.sqrt(2), z1_y = Math.sin(Math.PI/2 * (i % 2))/Math.sqrt(2);
            const z2_x = z2_y = (1 - 2*bits[i]);
            d_i[i] = z1_x * z2_x - z1_y*z2_y; //(x1 + jy1 ) * (x2 + jy2) = (x1x2 -y1y2 + j(x1y2 + x2y1)) 
            d_q[i] = z1_x * z2_y + z2_x*z1_y;
        }
        return [d_i,d_q]
    }
    else{ //5.2.3.2 of 38.211
        let r_tilde_i = new Array(M), r_tilde_q = new Array(M);
        if(M === 6){
            for(let i = 0; i < 6; i++){
                const phi = t38_211_5_2_3_2_1[u][i]; 
                r_tilde_i[i] = Math.cos(phi * Math.PI / 8);
                r_tilde_q[i] = Math.sin(phi * Math.PI / 8);
            }
            return [r_tilde_i,r_tilde_q];
        }
        else if([12,18,24].includes(M)){
            let bits = new Array(M);
            let table;
            switch(M){
                case 12: table = t38_211_5_2_3_2_2; break;
                case 18: table = t38_211_5_2_3_2_3; break;
                case 24: table = t38_211_5_2_3_2_4; break;
            }
            for(let i = 0; i < M; i++){
                bits[i] = table[u][i];

                const z1_x = Math.cos(Math.PI/2 * (i % 2))/Math.sqrt(2), z1_y = Math.sin(Math.PI/2 * (i % 2))/Math.sqrt(2);
                const z2_x = z2_y = (1 - 2*bits[i]);
                r_tilde_i[i] = z1_x * z2_x - z1_y*z2_y; //(x1 + jy1 ) * (x2 + jy2) = (x1x2 -y1y2 + j(x1y2 + x2y1)) 
                r_tilde_q[i] = z1_x * z2_y + z2_x*z1_y;
            } 
            return [r_tilde_i,r_tilde_q];
        }
        else return [null,null];
    }   
}

function pseudoRandomSequenceGeneration(c_init, seqLength) {
    //38.211 5.2.1 Generic pseudo-random sequences are defined by a length-31 Gold sequence.
    const N_c = 1600
    let x_1 = new Array(seqLength + N_c);
    let x_2 = new Array(seqLength + N_c);

    let c = new Array(seqLength);

    x_1[0] = 1;

    for(let i = 1; i <= 30; i++) x_1[i] = 0;

    const c_init_bin = c_init.toString(2);
    for(let i = 0; i <= 30; i++) {
        const index = c_init_bin.length - i - 1;
        if(index >= 0)
            x_2[i] = (c_init_bin[index] === '0') ? 0 : 1;
        else
            x_2[i] = 0;
    }

    for(let n = 0; n < x_1.length - 31; n++){
        x_1[n + 31] = (x_1[n+3] + x_1[n]) % 2;
        x_2[n + 31] = (x_2[n+3] + x_2[n+2] + x_2[n+1] + x_2[n]) % 2;
    }

    for(let n = 0; n < seqLength; n++){
        c[n] = (x_1[n + N_c] + x_2[n + N_c]) % 2;
    }
    return c;
}

function bits2val( v, off, len ) {
/* Convert binary vector to integer */
    let r = 0;

    for( let i = 0; i < len; i++)
        r = (r<<1)|v[i+off];

    return r;
}

function createMultipleColsInfoTable(object, title, keys, rows){
    const table = document.createElement("table");
    table.style.backgroundColor = "#ffffff";
    const thead = document.createElement("thead");
    thead.style.backgroundColor = "#e0e0ff"

    const thTitle = document.createElement("th");
    const trTitle = document.createElement("tr");
    thTitle.colSpan = Object.keys(object).length;
    trTitle.innerText = title;
    thTitle.appendChild(trTitle);
    thead.appendChild(thTitle);

    const trTitles = document.createElement("tr");

    for(let i = 0; i < keys.length; i++){
        const thTitle = document.createElement("th");
        thTitle.innerText = keys[i];
        trTitles.appendChild(thTitle);
    }

    thead.appendChild(trTitles);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for(let i of Object.keys(object)){
        const tr = document.createElement("tr");

        for( const key of keys) {
            const td = document.createElement("td");
            td.innerText = object[i][key]
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    return table;
}
function createInfoTable(object, title){
    const table = document.createElement("table");
    table.style.backgroundColor = "#ffffff";
    const thead = document.createElement("thead");
    thead.style.backgroundColor = "#e0e0ff"

    const trTitle = document.createElement("tr");
    const thTitle = document.createElement("th");
    thTitle.colSpan = "2";
    thTitle.innerText = title;

    trTitle.appendChild(thTitle);
    thead.appendChild(trTitle);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for( const key of Object.keys(object) ) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.innerText = key + ': ';
        td2.innerText = object[key];

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    return table;
}