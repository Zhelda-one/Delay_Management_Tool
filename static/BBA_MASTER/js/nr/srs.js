
const t38_211_6_4_1_4_2_1 = { //n_SRS_CS_max = t38_211_6_4_1_4_2_1(K_TC)
    2 : 8,
    4 : 12,
    8 : 6
}
const t38_211_6_4_1_4_3_1 = { //SRS-Bandwidth Configuration
    0: [4,1,    4,1,4,1,4,1],
    1: [8,1,    4,2,4,1,4,1],
    2: [12,1,   4,3,4,1,4,1],
    3: [16,1,   4,4,4,1,4,1],
    4: [16,1,   8,2,4,2,4,1],
    5: [20,1,   4,5,4,1,4,1],
    6: [24,1,   4,6,4,1,4,1],
    7: [24,1,   12,2,4,3,4,1],
    8: [28,1,   4,7,4,1,4,1],
    9: [32,1,   16,2,8,2,2],
    10: [36,1,  12,3,4,3,4,1],
    11: [40,1   ,20,2,4,5,4,1],
    12: [48,1,  16,3,8,2,4,2],
    13: [48,1,  24,2, 12,2,4,3],
    14: [52,1,  4 ,13,4,1,4,1],
    15: [56,1,  28,2,4,7,4,1],
    16: [60,1,  20,3,4,5,4,1],
    17: [64,1,  32,2, 16,2,4,4],
    18: [72,1,  24,3, 12,2,4,3],
    19: [72,1,  36,2, 12,3,4,3],
    20: [76,1,  4, 19,4,1,4,1],
    21: [80,1,  40,2, 20,2,4,5],
    22: [88,1,  44,2,4, 11,4,1],
    23: [96,1,  32,3, 16,2,4,4],
    24: [96,1,  48,2, 24,2,4,6],
    25: [104,1, 52,2,4, 13,4,1],
    26: [112,1, 56,2, 28,2,4,7],
    27: [120,1, 60,2, 20,3,4,5],
    28: [120,1, 40,3,8,5,4,2],
    29: [120,1 ,24,5, 12,2,4,3],
    30: [128,1, 64,2 ,32,2,4,8],
    31: [128,1, 64,2, 16,4,4,4],
    32: [128,1, 16,8,8,2,4,2],
    33: [132,1, 44,3,4, 11,4,1],
    34: [136,1, 68,2,4 ,17,4,1],
    35: [144,1 ,72,2, 36,2,4,9],
    36: [144,1, 48,3 ,24,2 ,12,2],
    37: [144,1 ,48,3, 16,3,4,4],
    38: [144,1 ,16,9,8,2,4,2],
    39: [152,1 ,76,2,4, 19,4,1],
    40: [160,1, 80,2 ,40,2,4 ,10],
    41: [160,1 ,80,2 ,20,4,4,5],
    42: [160,1 ,325, 16,2,4,4],
    43: [168,1 ,84,2 ,28,3,4,7],
    44: [176,1, 882 ,44,2,4 ,11],
    45: [184,1, 92,2,4 ,23,4,1],
    46: [192,1, 96,2 ,48,2,4, 12],
    47: [192,1, 96,2 ,24,4,4,6],
    48: [192,1 ,64,3 ,16,4,4,4],
    49: [192,1, 24,8,8,3,4,2],
    50: [208,1 ,104,2, 52,2,4 ,13],
    51: [216,1, 108,2, 36,3,4,9],
    52: [224,1, 112,2, 56,2,4, 14],
    53: [2401,  1202, 602,4, 15],
    54: [240,1, 80,3, 20,4,4,5],
    55: [240,1, 48,5,16,3,8,2],
    56: [240,1, 24, 10, 12,2,4,3],
    57: [256,1, 128,2, 64,2,4, 16],
    58: [256,1, 128,2, 32,4,4,8],
    59: [256,1, 16, 16,8,2,4,2],
    60: [264,1, 132,2, 44,3,4, 11],
    61: [272,1, 136,2, 68,2,4, 17],
    62: [272,1, 68,4,4, 17,4,1],
    63: [272,1, 16,17,8,2,4,2]
}

function srs_calculate_n_SRS_cs_i(N_ap_SRS,n_SRS_cs_max,n_SRS_cs,p){
    if( N_ap_SRS === 8 && n_SRS_cs_max === 6){
        return (n_SRS_cs + ( n_SRS_cs_max * Math.floor(p - 1000)/4 ) / N_ap_SRS / 4 ) % n_SRS_cs_max;
    }
    else if( (N_ap_SRS === 4 && n_SRS_cs_max === 6) || (N_ap_SRS === 8 && n_SRS_cs_max === 12)){
        return (n_SRS_cs + ( n_SRS_cs_max * Math.floor(p - 1000)/2 ) / N_ap_SRS / 2 ) % n_SRS_cs_max;
    }
    else return (n_SRS_cs + ( n_SRS_cs_max * (p - 1000) ) / N_ap_SRS ) % n_SRS_cs_max;
}

function srs_GetParametersArr(u,antId,sf,slot,SRS,l2l1_packets){
    const l2l1_data_arr = nr_get_l2l1_data_from_packets(SRS,sf,slot,u,antId,l2l1_packets,false,null,null,null);
    if(!l2l1_data_arr) return null;
    let params_SRS_arr = new Array(l2l1_data_arr.length).fill([]);
    for(let i = 0; i < l2l1_data_arr.length; i++){
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;

        let params_SRS = {
            "K_TC" : 2, //l2l1_data.transmissionCombId, 2 or 4
            "B_SRS" : l2l1_data.srsBandwidth,
            "C_SRS" : l2l1_data.srsBandwidthConfig,
            "n_RRC" : l2l1_data.freqDomainPosition,
            "n_shift" : l2l1_data.freqDomainShift, //adjusts freq location
            // "numRbgPerSubband" : l2l1_data.numRbgPerSubband,
            "startPrb": l2l1_data.startPrb, //k0 parameter but in resource blocks, its here mainly for compatibility with nr_GetParametersFromParametersArr function
            "n_SRS_cs" : l2l1_data.cyclicShift,
            "N_ap_SRS" : l2l1_data.numOfSrsPorts,
            "ueType" : l2l1_data.ueType, //Bitmask to be split
            "n_ID_SRS" : 111,
            "P_F" : 1, //Frequency scaling factor
            // "k_F" : 0, //startRbIndex
            // "k_hop" : 0, //startRbHopping in not configured
            "l0" : l2l1_data.symbolPosition,
            "N_symb_SRS" : 1, //Number of symbols
            "groupOrSequenceHopping" : "neither",
            "seq_group" : -1, //for lowPAPRType1, Parameter u
            "base_seq_nr" : -1,//for lowPAPRType1, Parameter v
            "f_gh" : -1,
            "b" : -1,
            "m_SRS_b" : -1, //m_SRS_b parameter
            "M_sc_b_SRS" : -1, //Length of SRS signal sequence
            "k0" : -1,
            "beta_SRS" : 1, 
            "alpha" : [], //alpha for each port
            "n_SRS_cs_i" : [], //1 per port
            "n_SRS_cs_max": -1,
            "numOfPrb": -1, //Kept here for compatibility with nr_GetParametersFromParametersArr function
        }
        params_SRS["b"] = params_SRS["B_SRS"];
        params_SRS["k0"] = 12*params_SRS["startPrb"];

        //Group & Sequence Hopping related stuff
        if(params_SRS["groupOrSequenceHopping"] === "neither"){
            params_SRS["base_seq_nr"] = 0;
            params_SRS["f_gh"] = 0;
        }
        else{ //Not supported
            // console.log("Kont");
            continue;
        }
        params_SRS["seq_group"] = (params_SRS["f_gh"] + params_SRS["n_ID_SRS"]) % 30;

        //Cyclic shift related parameters
        console.log("Tutaj:",t38_211_6_4_1_4_2_1, t38_211_6_4_1_4_2_1[ params_SRS["K_TC"] ] )
        params_SRS["n_SRS_cs_max"]= t38_211_6_4_1_4_2_1[ params_SRS["K_TC"] ];
        params_SRS["n_SRS_cs_i"] = new Array(params_SRS["N_ap_SRS"]);
        params_SRS["alpha"] = new Array(params_SRS["N_ap_SRS"]);        
        for(let i = 0; i < params_SRS["N_ap_SRS"]; i++){
            params_SRS["n_SRS_cs_i"][i] = srs_calculate_n_SRS_cs_i(params_SRS["N_ap_SRS"], params_SRS["n_SRS_cs_max"],params_SRS["n_SRS_cs"],i + 1000);
            params_SRS["alpha"][i] = 2*Math.PI * (params_SRS["n_SRS_cs_i"][i]/params_SRS["n_SRS_cs_max"]); //cyclic shift hopping is not supported  (f_csh = 0)
        }

        //Frequency Domain related stuff
        params_SRS["m_SRS_b"] = t38_211_6_4_1_4_3_1[ params_SRS["C_SRS"] ][ 2*params_SRS["b"] ];
        params_SRS["M_sc_b_SRS"] = params_SRS["m_SRS_b"] * 12 / (params_SRS["K_TC"] * params_SRS["P_F"] ); 

        params_SRS["numOfPrb"] = Math.floor(params_SRS["M_sc_b_SRS"]/12) * params_SRS["K_TC"];
        // console.log("numOfPrb:",params_SRS["numOfPrb"], "M_sc_b",params_SRS["M_sc_b_SRS"]);
        params_SRS_arr[i] = params_SRS;
        console.log("Params:",params_SRS);
    }
    return params_SRS_arr;
}