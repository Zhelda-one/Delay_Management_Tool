// const t38_213_9_2_1_1 = [
//     {"index" : 0, "format": 0, "firstSym" : 12, "numOfSym" : 2, "prbOffset" : 0, "indexes" : [0,3]},
//     {"index" : 1, "format": 0, "firstSym" : 12, "numOfSym" : 2, "prbOffset" : 0, "indexes" : [0,4,8]},
//     {"index" : 2, "format": 0, "firstSym" : 12, "numOfSym" : 2, "prbOffset" : 3, "indexes" : [0,4,8]},
//     {"index" : 3, "format": 1, "firstSym" : 10, "numOfSym" : 4, "prbOffset" : 0, "indexes" : [0,6]},
//     {"index" : 4, "format": 1, "firstSym" : 10, "numOfSym" : 4, "prbOffset" : 0, "indexes" : [0,3,6,9]},
//     {"index" : 5, "format": 1, "firstSym" : 10, "numOfSym" : 4, "prbOffset" : 2, "indexes" : [0,3,6,9]},
//     {"index" : 6, "format": 1, "firstSym" : 10, "numOfSym" : 4, "prbOffset" : 4, "indexes" : [0,3,6,9]},
//     {"index" : 7, "format": 1, "firstSym" : 4, "numOfSym" : 10, "prbOffset" : 0, "indexes" : [0,6]},
//     {"index" : 8, "format": 1, "firstSym" : 4, "numOfSym" : 10, "prbOffset" : 0, "indexes" : [0,3,6,9]},
//     {"index" : 9, "format": 1, "firstSym" : 4, "numOfSym" : 10, "prbOffset" : 2, "indexes" : [0,3,6,9]},
//     {"index" : 10, "format": 1, "firstSym" : 4, "numOfSym" : 10, "prbOffset" : 4, "indexes" : [0,3,6,9]},
//     {"index" : 11, "format": 1, "firstSym" : 0, "numOfSym" : 14, "prbOffset" : 0, "indexes" : [0,6]},
//     {"index" : 12, "format": 1, "firstSym" : 0, "numOfSym" : 14, "prbOffset" : 0, "indexes" : [0,3,6,9]},
//     {"index" : 13, "format": 1, "firstSym" : 0, "numOfSym" : 14, "prbOffset" : 2, "indexes" : [0,3,6,9]},
//     {"index" : 14, "format": 1, "firstSym" : 0, "numOfSym" : 14, "prbOffset" : 4, "indexes" : [0,3,6,9]},
//     {"index" : 14, "format": 1, "firstSym" : 0, "numOfSym" : 14, "prbOffset" : -1, "indexes" : [0,3,6,9]},
// ]

const t38_211_6_3_2_4_1_1 = {//N_SF_PUCCH_1 for PUCCH decoding (NOT DMRS!)
    4 : [2,1,1],
    5 : [2,1,1],
    6 : [3,1,2],
    7 : [3,1,2],
    8 : [4,2,2],
    9 : [4,2,2],
    10 : [5,2,3],
    11 : [5,2,3],
    12 : [6,3,3],
    13 : [6,3,3],
    14 : [7,3,4]
}

const t38_211_6_3_2_4_1_2 = {
    1 : {
        0 : [0]
    },
    2 : {
        0 : [0,0],
        1 : [0,1]
    },
    3 : {
        0 : [0,0,0],
        1 : [0,1,2],
        2 : [0,2,1]
    },
    4 : {
        0 : [0,0,0,0],
        1 : [0,2,0,2],
        2 : [0,0,2,2],
        3 : [0,2,2,0]
    },
    5 : {
        0 : [0,0,0,0,0],
        1 : [0,1,2,3,4],
        2 : [0,2,4,1,3],
        3 : [0,3,1,4,2],
        4 : [0,4,3,2,1]
    },
    6 : {
        0 : [0,0,0,0,0,0],
        1 : [0,1,2,3,4,5],
        2 : [0,2,4,0,2,4],
        3 : [0,3,0,3,0,3],
        4 : [0,4,2,0,4,2],
        5 : [0,5,4,3,2,1]
    },
    7 : {
        0 : [0,0,0,0,0,0,0],
        1 : [0,1,2,3,4,5,6],
        2 : [0,2,4,6,1,3,5],
        3 : [0,3,6,2,5,1,4],
        4 : [0,4,1,5,2,6,3],
        5 : [0,5,3,1,6,4,2],
        6 : [0,6,5,4,3,2,1]
    }
}

const t38_211_6_4_1_3_1_1_1 = { //N_SF_PUCCH_1 for DMRS decoding
    4 : [2,1,1],
    5 : [3,1,2],
    6 : [3,2,1],
    7 : [4,2,2],
    8 : [4,2,2],
    9 : [5,2,2],
    10 : [5,3,2],
    11 : [6,3,3],
    12 : [6,3,3],
    13 : [7,3,4],
    14 : [7,4,3]
}

const t38_211_6_4_1_3_3_2_1 = { //table[pucch_len][IsadditionalDmrsEnabled][IsfreqHoppingEnabled]
    4 : [ [ [1] , [0,2] ], [ [1] , [0,2] ]],
    5 : [ [ [0,3] , [0,3] ], [ [0,3] , [0,3] ]],
    6 : [ [ [1,4] , [1,4] ], [ [1,4] , [1,4] ]],
    7 : [ [ [1,4] , [1,4] ], [ [1,4] , [1,4] ]],
    8 : [ [ [1,5] , [1,5] ], [ [1,5] , [1,5] ]],
    9 : [ [ [1,6] , [1,6] ], [ [1,6] , [1,6] ]],
    10 : [ [ [2,7] , [2,7] ], [ [1,3,6,8] , [1,3,6,8] ]],
    11 : [ [ [2,7] , [2,7] ], [ [1,3,6,9] , [1,3,6,9] ]],
    12 : [ [ [2,8] , [2,8] ], [ [1,4,7,10] , [1,4,7,10] ]],
    13 : [ [ [2,9] , [2,9] ], [ [1,4,7,11] , [1,4,7,11] ]],
    14 : [ [ [3,10] , [3,10] ], [ [1,5,8,12] , [1,5,8,12] ]],
}

//Nokia restrictions based on Gates:
//pucch-GroupHopping = "neither"
//hopping-Id === 0
//Format 4 is not used
function pucch_GetParametersArr(u,antId,sf,slot,PUCCH,l2l1_packets){
    const l2l1_data_arr = nr_get_l2l1_data_from_packets(PUCCH,sf,slot,u,antId,l2l1_packets,false,null,null,null);
    if(!l2l1_data_arr) return null;
    let params_PUCCH_arr = new Array(1); //l2l1_data_arr.length
    for(let i = 0; i < 1; i++){ //l2l1_data_arr.length
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;
 
        let params_PUCCH = {
            "format": l2l1_data.pucchFormat,
            "hoppingId": l2l1_data.dmrsScramblingSequenceInt, //hoppingId if configured (setupReq) or cellId
            "N_ID": l2l1_data.dmrsScramblingSequenceInt, //scramblingId if configured or cellId
            "frequencyHopping" : l2l1_data.frequencyHopping !== undefined ? l2l1_data.frequencyHopping : 0,
            "secondHopPrb" : l2l1_data.secondHopPrb !== undefined ? l2l1_data.secondHopPrb : 0,
            "initialCyclicShift" : l2l1_data.initialCyclicShift !== undefined ? l2l1_data.initialCyclicShift : 0,
            "firstSymbol": l2l1_data.firstSymbol,
            "numOfSymbols": l2l1_data.numOfSymbols, //N_symb_PUCCH
            "startPrb": l2l1_data.startPrb,
            "numOfPrb": l2l1_data.numOfPrb, //M_RB
            "timeDomainOcc": l2l1_data.timeDomainOcc, // 'i' for Format1, ignore for other formats
            "additionalDmrs" : l2l1_data.additionalDmrs,
            "dmrsSequenceType" : l2l1_data.dmrsSequenceType, //0=Rel15, 1=Rel16 lowPAPR, applies only to Format3 
            "port": 2000,
            "N_sf_PUCCH_2" : -1,
            "additionalDmrs": l2l1_data.additionalDmrs, //applies only to formats 3
            "modulationType" : l2l1_data.modulationType, //0=PI/2 BPSK, 1=QPSK, applies to Formats 1 and 3
            "u" : -1,
            "v": -1,
            "channelId" : PUCCH
        }

        params_PUCCH["u"] = ( 0 + params_PUCCH["hoppingId"] % 30 ) % 30; //groupHopping = "neither" in Nokia
        params_PUCCH["v"] = 0; //groupHopping = "neither" in Nokia

        params_PUCCH["N_sf_PUCCH_2"] = 1; //l2l1 occLength if configured, but its not present in multi so 1

      
        params_PUCCH_arr[i] = params_PUCCH;
    }

    return params_PUCCH_arr;
}