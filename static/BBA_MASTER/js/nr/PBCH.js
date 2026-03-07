
const t38_212_7_1_1_1 = [16,23,18,17,8,30,10,6,24,7,0,5,3,2,1,4,9,11,12,13,14,15,19,20,21,22,25,26,27,28,29,31];

//Based on ... of 38331 (MIB)
function pbch_encodeMIB(config){
    let a_bar = [];

    a_bar.push(...val2bits(config.systemFrameNumber >> 4, 6));
    a_bar.push(0); //msg-option
    a_bar.push(config.subCarrierSpacingCommon);
    a_bar.push(...val2bits(config.ssb_SubcarrierOffset, 4));
    a_bar.push(config.dmrs_TypeA_Position);
    a_bar.push(...val2bits(config.pdcch_ConfigSIB1, 8));
    a_bar.push(config.cellBarred);
    a_bar.push(config.intraFreqReselection);
    a_bar.push(0); //spare

    return a_bar;
}

//Based on 7.1.1 of 38212 (PBCH payload generation)
function pbch_generatePayload(input_a_bar,k_SSB,hf_bit,ssbIndex,L_max,sfn){
    const A_bar = input_a_bar.length;
    const a_bar = input_a_bar.concat(new Array(8));

    a_bar[A_bar] = (sfn >> 3) & 0b1;
    a_bar[A_bar + 1] = (sfn >> 2) & 0b1;
    a_bar[A_bar + 2] = (sfn >> 1) & 0b1;
    a_bar[A_bar + 3] = sfn & 0b1;

    a_bar[A_bar + 4] = hf_bit;

    if(L_max == 64){
        a_bar[A_bar + 5] = (ssbIndex >> 5) & 0b1;
        a_bar[A_bar + 6] = (ssbIndex >> 4) & 0b1;
        a_bar[A_bar + 7] = (ssbIndex >> 3) & 0b1;
    }
    else{
        a_bar[A_bar + 5] = (k_SSB >> 4) & 0b1;
        a_bar[A_bar + 6] = 0; //Reserved
        a_bar[A_bar + 7] = 0; //Reserved
    }

    const A = A_bar + 8;
    let j_SFN = 0, j_HRF = 10, j_SSB = 11, j_other = 14;

    const G = t38_212_7_1_1_1;

    let a = new Array(A);
    for(let i = 0; i < A; i++){
        if( i < 6 || (A_bar <= i && i <= A_bar + 3)){
            a[G[j_SFN]] = a_bar[i];
            j_SFN++;
        }
        else if(i == A_bar + 4){
            a[G[j_HRF]] = a_bar[i];
        }
        else if(A_bar + 5 <= i && i <= A_bar + 7){
            a[G[j_SSB]] = a_bar[i];
            j_SSB++;
        }
        else{
            a[G[j_other]] = a_bar[i];
            j_other++;
        }
    }

    return a;
}

//Based on 7.1.1 of 38212 (PBCH payload generation) and
//Based on 6.2.2 of 38331 (Message definitions) for MIB
function pbch_extractPayload(a,ssbIndexLSBs,L_max){
    const A = a.length;
    let A_bar = A - 8;
    let j_SFN = 0, j_HRF = 10, j_SSB = 11, j_other = 14;
    const G = t38_212_7_1_1_1;

    let a_bar = new Array(A); //Note that this is of size A_bar + 8 (extended with L1 info)
    for(let i = 0; i < A; i++){
        if( i < 6 || (A_bar <= i && i <= A_bar + 3)){ //SFN bit
            a_bar[i] = a[G[j_SFN]];
            j_SFN++;
        }
        else if(i == A_bar + 4) a_bar[i] = a[G[j_HRF]]; //half-frame bit
        else if(A_bar + 5 <= i && i <= A_bar + 7){
            a_bar[i] = a[G[j_SSB]];
            j_SSB++;
        }
        else{
            a_bar[i] = a[G[j_other]];
            j_other++;
        }
    }

    let offset = 0;
    let decodedMessage = {};

    decodedMessage.payload = a_bar.toString();
    decodedMessage.systemFrameNumber        =                                   bits2val( a_bar, offset, 6) << 4; offset+=6;
    offset += 1; //This bit probably indicates the BCCH payload
    decodedMessage.subCarrierSpacingCommon  =   ["scs15or60","scs30or120"][bits2val( a_bar, offset, 1 )]; offset+=1;
    decodedMessage.ssb_subcarrierOffset     =                              bits2val(a_bar, offset, 4 ); offset+=4;
    decodedMessage.dmrs_TypeA_Position      =   ["pos2","pos3"][bits2val( a_bar, offset, 1 )]; offset+=1;
    decodedMessage.controlResourceSetZero   =                   bits2val( a_bar, offset, 4 ); offset+=4;
    decodedMessage.searchSpaceZero          =                   bits2val( a_bar, offset, 4 ); offset+=4;
    decodedMessage.cellBarred               = ["barred","notBarred"][bits2val( a_bar, offset, 1 )]; offset+=1;
    decodedMessage.intraFreqReselection     = ["allowed","notAllowed"][bits2val( a_bar, offset, 1 )]; offset+=1;
    decodedMessage.spare                    =                          bits2val( a_bar, offset, 1 ); offset+=1;

    decodedMessage.systemFrameNumber +=             bits2val(a_bar,offset,4); offset += 4;
    decodedMessage.halfFrameBit =                   bits2val(a_bar,offset,1); offset+=1;

    if(L_max == 64) decodedMessage.ssbIndex =   (bits2val(a_bar,offset,3) << 3) + ssbIndexLSBs;
    else{
        decodedMessage.ssb_subcarrierOffset +=      bits2val(a_bar,offset,1) << 3;
        decodedMessage.ssbIndex = ssbIndexLSBs; //it's not part of payload when L_max < 64
    }

    return decodedMessage;
}

//Based on 7.1.2 of 38212 (Scrambling)
function pbch_scrambleTB(a,N_ID_cell, L_max, sfn){

    const A = a.length;
    const M = [4,8].includes(L_max) ? A - 3 : A - 6;
    const v = (sfn >> 1) & 0b11;
    const c_init = N_ID_cell;
    const c = pseudoRandomSequenceGeneration(c_init,A+3*M + 1);

    const G = t38_212_7_1_1_1;

    //bits belonging to SS/PBCH block, hf index, 2nd and 3rd LSBs of SFN
    let j_SFN = 0, j_HRF = 10, j_SSB = 11;
    const specialIndexes = {
        4 : [G[j_SFN + 7],G[j_SFN + 8],G[j_HRF]],
        8 : [G[j_SFN + 7],G[j_SFN + 8],G[j_HRF]],
        64 : [G[j_SFN + 7],G[j_SFN + 8],G[j_HRF], G[j_SSB],G[j_SSB+1],G[j_SSB+2]],
    }

    let i = 0;
    let j = 0;
    let s = new Array(A);
    while(i < A){
        if(specialIndexes[L_max].includes(i)) s[i] = 0;
        else{
            s[i] = c[j + v*M];
            j++;
        }
        i++;
    }

    let a_prim = new Array(A);
    for(let i = 0; i < A; i++){
        a_prim[i] = (a[i] + s[i] ) % 2;
    }

    return a_prim;
}

//Reverses the effect of pbch_scrambleTB
function pbch_deScrambleTB(a_prim,N_ID_cell,L_max){
    //3rd and 2nd LSBs of SFN do not get interleaved in 7.1.2 of 38212, we can obtain them from positions G[j_SFN + 7], G[j_SFN + 8] in a_prim sequence.
    const sfn = (a_prim[6] << 2) + (a_prim[24] << 1) + 0
    return pbch_scrambleTB(a_prim,N_ID_cell,L_max,sfn);
}

//Based on 7.1.3 of 38212 (Transport block CRC attachment)
function pbch_attachCRC(a_prim){
    const g_CRC24C = [1,1,0,1, 1,0,0,1, 0,1,0,1, 1,0,0,0, 1,0,0,0, 1,0,1,1, 1];
    
    const p = algo_attachCRC(a_prim,g_CRC24C);

    const b = a_prim.concat(p);
    const c = b;

    return c;
}

//Reverses the effect of pbch_attachCRC
function pbch_detachCRC(c){
    const g_CRC24C = [1,1,0,1, 1,0,0,1, 0,1,0,1, 1,0,0,0, 1,0,0,0, 1,0,1,1, 1];

    const b = c;
    const [a_prim,error] = algo_detachCRC(b,g_CRC24C);

    return [a_prim,error];
}

//Based on 7.1.4 of 38212 (Channel coding)
function pbch_encodeChannel(c,E){
    const n_max = 9, I_IL = 1, n_PC = 0, n_PC_wm = 0;
    const d = algo_polarCoding(c,E,n_max,I_IL,n_PC,n_PC_wm);
    return d;
}

//Reverses the effect of pbch_encodeChannel
function pbch_decodeChannel(d,K,n_max,I_IL,n_PC,n_PC_wm,E){
    const c = algo_polarDecoding(d,K,E,n_max,I_IL,n_PC,n_PC_wm);
    return c;
}

//Based on 7.1.5 of 38212 (Rate Matching)
function pbch_matchRate(d,K,E){
    // const E = 864;
    const I_BIL = 0;

    const f = algo_matchRateForPolarCode(d,K,E,I_BIL);
    return f;
}

//Reverses the effect of pbch_matchRate
function pbch_deMatchRate(f,K,n_max){
    const I_BIL = 0;
    const d = algo_deMatchRateForPolarCode(f,K,n_max,I_BIL);
    return d;
}

//Based on 7.3.3.1 of 38211 (Scrambling)
function pbch_scramble(b,N_ID_cell,L_max, ssbIndexLSBs){
    const c_init = N_ID_cell;
    const v = L_max == 4 ? ssbIndexLSBs & 0b11 : ssbIndexLSBs & 0b111;
    const M_bit = b.length;

    const c = pseudoRandomSequenceGeneration(c_init,(v+1)*M_bit);
    let b_tilde = new Array(M_bit);
    for(let i = 0; i < M_bit; i++){
        b_tilde[i] = (b[i] + c[i + v*M_bit] ) % 2;
    }

    return b_tilde;
}

//Reverses the effect of pbch_scramble
function pbch_deScramble(b_tilde,N_ID_cell,L_max, ssbIndexLSBs){
   return pbch_scramble(b_tilde,N_ID_cell,L_max,ssbIndexLSBs);
}

//Based on 7.3.3.2 of 38211 (Modulation)
function pbch_modulate(b_tilde){
    const d_PBCH = algo_modulateQPSK(b_tilde);
    return d_PBCH;
}

//Reverses the effect of pbch_modulate
function pbch_demodulate(d_PBCH){
    const b_tilde = algo_demodulateQPSK(d_PBCH.v_i, d_PBCH.v_q);
    return b_tilde;
}


//Based on 7.4.1.4 of 38211 (Demodulation reference signals for PBCH)
//ssbIndexLSBs is a number representing at least 2 or 3 LSBs of ssbIndex depending on L_max
function pbch_encode_dmrs(N_ID_cell,n_hf,L_max,ssbIndexLSBs){

    let i_bar_ssb = L_max == 4 ? ssbIndexLSBs & 0b11 + 4*n_hf : ssbIndexLSBs & 0b111;

    const c_init = 2**11 * (i_bar_ssb + 1) * (Math.floor(N_ID_cell/4) + 1) + 2**6 * (i_bar_ssb + 1) + (N_ID_cell % 4);

    const PBCH_DMRS_LENGTH = 144;
    const c = pseudoRandomSequenceGeneration(c_init,2 * PBCH_DMRS_LENGTH);

    let r_i = new Array(PBCH_DMRS_LENGTH), r_q = new Array(PBCH_DMRS_LENGTH);
    for(let m =  0; m < PBCH_DMRS_LENGTH; m++){
        r_i[m] = 1/(2**0.5) * (1 - 2*c[2*m]);
        r_q[m] = 1/(2**0.5) * (1 - 2*c[2*m+1]);
    }

    return {"v_i" : r_i, "v_q" : r_q};
}

function pbch_encode(config){
    const N_ID_cell = config.PCI;
    const L_max = config.L_max;
    const k_SSB = config.ssb_SubcarrierOffset;
    const sfn = config.systemFrameNumber;

    const E = 864;

    const a_bar = pbch_encodeMIB(config);
    const a = pbch_generatePayload(a_bar,k_SSB,config.half_frame_bit,config.ssbIndex,L_max,sfn);
    const a_prim = pbch_scrambleTB(a,N_ID_cell,L_max,sfn);
    const c = pbch_attachCRC(a_prim);
    const K = c.length;
    const d = pbch_encodeChannel(c,E);
    const f = pbch_matchRate(d,K,E);
    const b_tilde = pbch_scramble(f,N_ID_cell,L_max,config.ssbIndex);
    const d_PBCH = pbch_modulate(b_tilde);

    return d_PBCH;
}
