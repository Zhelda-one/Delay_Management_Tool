//Nokia only uses 1,2,3 (Gates)
const t38_211_7_4_1_5_3_1 = { //Dont modify anything in "indexes" column or else parser in nr_mark_csirs might fail!
    1 : {"ports": 1, "density": [3], "cdmType": "noCDM", "indexes": [ ["k0","l0"], ["k0 + 4", "l0"], ["k0 + 8","l0"] ],                                   "j": [0,0,0], "k_prim": [0], "l_prim": [0]},
    2 : {"ports": 1, "density": [1,0.5], "cdmType": "noCDM", "indexes": [ ["k0","l0"] ],                                                                  "j": [0], "k_prim": [0], "l_prim": [0]},
    3 : {"ports": 2, "density": [1,0.5], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"] ],                                                                "j": [0], "k_prim": [0,1], "l_prim": [0]},
    4 : {"ports": 4, "density": [1], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k0 + 2", "l0"] ],                                                  "j": [0,1], "k_prim": [0,1], "l_prim": [0]},
    5 : {"ports": 4, "density": [1], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k0", "l0 + 1"] ],                                                  "j": [0,1], "k_prim": [0,1], "l_prim": [0]},
    6 : {"ports": 8, "density": [1], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"] ],                            "j": [0,1,2,3], "k_prim": [0,1], "l_prim": [0]},
    7 : {"ports": 8, "density": [1], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k0", "l0 + 1"], ["k1", "l0 + 1"] ],                  "j": [0,1,2,3], "k_prim": [0,1], "l_prim": [0]},
    8 : {"ports": 8, "density": [1], "cdmType": "cdm4-FD2-TD2", "indexes": [ ["k0","l0"], ["k1", "l0"] ],                                                 "j": [0,1], "k_prim": [0,1], "l_prim": [0,1]},
    9 : {"ports": 12, "density": [1], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"], ["k4","l0"], ["k5","l0"] ], "j": [0,1,2,3,4,5], "k_prim": [0,1], "l_prim": [0]},
    10 : {"ports": 12, "density": [1], "cdmType": "cdm4-FD2-TD2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"] ],                                  "j": [0,1,2], "k_prim": [0,1], "l_prim": [0,1]},
    11 : {"ports": 16, "density": [1,0.5], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"], ["k0","l0 + 1"], ["k1","l0 + 1"], ["k2", "l0 + 1"], ["k3", "l0 + 1"] ],        "j": [0,1,2,3,4,5,6,7], "k_prim": [0,1], "l_prim": [0]},
    12 : {"ports": 16, "density": [1,0.5], "cdmType": "cdm4-FD2-TD2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"] ],                                                                         "j": [0,1,2,3], "k_prim": [0,1], "l_prim": [0,1]},
    13 : {"ports": 24, "density": [1,0.5], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k0","l0 + 1"], ["k1","l0 + 1"], ["k2","l0 + 1"], ["k0","l1"],["k1","l1"],["k2","l1"],["k0","l1 + 1"], ["k1", "l1 + 1"], ["k2","l1 + 1"] ], "j": [0,1,2,3,4,5,6,7,8,9,10,11],  "k_prim": [0,1], "l_prim": [0]},
    14 : {"ports": 24, "density": [1,0.5], "cdmType": "cdm4-FD2-TD2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k0","l1"], ["k1","l1"], ["k2","l1"] ],                                               "j": [0,1,2,3,4,5], "k_prim": [0,1], "l_prim": [0,1]},
    15 : {"ports": 24, "density": [1,0.5], "cdmType": "cdm8-FD2-TD4", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"] ],                                                                                      "j": [0,1,2], "k_prim": [0,1], "l_prim": [0,1,2,3]},
    16 : {"ports": 32, "density": [1,0.5], "cdmType": "fd-CDM2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"], ["k0","l0 + 1"], ["k1","l0 + 1"], ["k2","l0 + 1"],["k3","l0 + 1"],["k0","l1"], ["k1","l1"], ["k2","l1"], ["k3","l1"], ["k0","l1 + 1"], ["k1","l1 + 1"], ["k2","l1 + 1"], ["k3","l1 + 1"] ], "j": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "k_prim": [0,1], "l_prim": [0]},
    17 : {"ports": 32, "density": [1,0.5], "cdmType": "cdm4-FD2-TD2", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"], ["k0","l1"], ["k1","l1"], ["k2","l1"], ["k3","l1"] ],                     "j": [0,1,2,3,4,5,6,7], "k_prim": [0,1], "l_prim": [0,1]},
    18 : {"ports": 32, "density": [1,0.5], "cdmType": "cdm8-FD2-TD4", "indexes": [ ["k0","l0"], ["k1", "l0"], ["k2","l0"], ["k3","l0"] ],                                                                         "j": [0,1,2,3], "k_prim": [0,1], "l_prim": [0,1,2,3]},
}

const t38_211_7_4_1_5_3_2 = [
    [[1],   [1]],
]

const t38_211_7_4_1_5_3_3 = [
    [[1, 1],   [1]],
    [[1, -1],  [1]],
]

const t38_211_7_4_1_5_3_4 = [
    [[1, 1],   [1, 1]],
    [[1, -1],  [1, 1]],
    [[1, 1],   [1, -1]],
    [[1, -1],  [1, -1]],
]

const t38_211_7_4_1_5_3_5 = [
    [[1,  1],   [1, 1, 1, 1]],
    [[1, -1],   [1, 1, 1, 1]],
    [[1,  1],   [1, -1, 1, -1]],
    [[1, -1],   [1, -1, 1, -1]],
    [[1,  1],   [1, 1, -1, -1]],
    [[1, -1],   [1, 1, -1, -1]],
    [[1,  1],   [1, -1, -1, 1]],
    [[1, -1],   [1, -1, -1, 1]],
]

function csirs_getPrecodingMatrix(params_CSIRS){
    let numRows = params_CSIRS["numCeAxCIndex"];
    let numCols = params_CSIRS["numOfPorts"];

    if(numCols === 1){
        if(numRows === 1) return new M([1], [0] , numRows, numCols); 
        if(numRows === 2) return new M([1,1], [0,0] , numRows, numCols); 
    }
    else if(numCols === 2){
        if(numRows === 2) return new M([1,0,0,1], [0,0,0,0] , numRows, numCols); 
    }
    else if(params_CSIRS["numCeAxCIndex"] === 4){
        if(params_CSIRS["csiRsPrecodingMatrix"] === 0) return new M([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],4,4);
        else if( params_CSIRS["csiRsPrecodingMatrix"] === 1 ) return new M([1,1,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,0], [0,0,0,0, 1,-1,0,0, 0,0,0,0, 0,0,1,-1],4,4);
        else if( params_CSIRS["csiRsPrecodingMatrix"] === 2 ) return new M([1,1,0,0, 1,-1,0,0, 0,0,1,1, 0,0,1,-1],4,4);
        else return new M([1,1,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,0], [0,0,0,0, -1,1,0,0, 0,0,0,0, 0,0,-1,1],4,4);
    }
}

//channelsFromL2L1Packets (boolean) -> should l2l1_packets or config.cell be used for parameter calculations
function csirs_GetParametersArr(u,antId,sf,slot,CSIRS,l2l1_packets,channelsFromL2L1Packets){ //Based on 7.4.1.5 of 38.211 i-30
    const l2l1_data_arr = channelsFromL2L1Packets ? nr_get_l2l1_data_from_packets(CSIRS,sf,slot,u,antId,l2l1_packets,false,null,null,null) :
        [{
            "startPrb" : config.cell.csirs_startPrb,
            "numOfPrb" : config.cell.csirs_numOfPrb,
            "startSymbol" : config.cell.csirs_startSymbol,
            "csiRsConfig" : config.cell.csirs_config,
            "density" : config.cell.csirs_density,
            "densityDot5PrbLocation" : config.cell.csirs_densityDot5,
            "csiRsScramblingSequenceInt" : config.cell.csirs_scramblingID,
            "freqDomainAllocationKi" : config.cell.csirs_frequencyDomainAllocation,
        }];

    if(!l2l1_data_arr) return null;
    let params_CSIRS_arr = new Array(l2l1_data_arr.length).fill([]);
    for(let i = 0; i < l2l1_data_arr.length; i++){
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;

        //Most of those params are given by structure from 6.3.2 of 38-331 ,,NZP-CSI-RS-Resource"
        let params_CSIRS = {
            "density": l2l1_data.density === 0 ? 0.5 : l2l1_data.density ,                          //L2L1 param ,,density"
            "densityDot5PrbLocation" : l2l1_data.densityDot5PrbLocation,                            //Obtainable from L2L1 param ,,density" (if density=0.5 otherwise ignored)
            "startPrb": l2l1_data.startPrb,                                                         //Obtainable from L2L1 param ,,freqBand"
            "numOfPrb": l2l1_data.numOfPrb,                                                         //Obtainable from L2L1 param ,,freqBand"
            "freqAllocation": l2l1_data.freqDomainAllocationKi,                                     //L2L1 param ,,frequencyDomainAllocation"
            "l0" : l2l1_data.startSymbol,                                                           //L2L1 param ,,firstOFDMSymbolInTimeDomain"
            "n_ID" : l2l1_data.csiRsScramblingSequenceInt,                                          //L2L1 param ,,scramblingID"

            "beta_csirs" : l2l1_data.csiTransmitPower ? 10**(l2l1_data.csiTransmitPower/200) : 1,
            "row_id" : l2l1_data.csiRsConfig, //row in t38_211_7_4_1_5_3_1, range <1,18>
            "csiRsPrecodingMatrix" : l2l1_data.csiRsPrecodingMatrix,

            "numCeAxCIndex" : l2l1_data.numCeAxCIndex ? l2l1_data.numCeAxCIndex : 2, //Number of ceAxcIndex that are valid for this transmission request. (src: Gates)
            "ceAxCIndex" : l2l1_data.ceAxCIndex ? l2l1_data.ceAxCIndex : [0,1], //Set of eAxC indices to be used for the transmission on eCPRI Fronthaul. (src: Gates)
            // "pwrReductionPerCsiRsResourc" : l2l1_data.pwrReductionPerCsiRsResourc, //might be useful in the future
            // "trsInfo" : l2l1_data.trsInfo, //might be useful in the future

            //These params are calculated later
            "numOfPorts": -1,                                                                       //L2L1 param ,,nrofPorts", can be obtained based on BIP field ,,csiRsConfig"
            "cdmType": -1,                                                                          //L2L1 param ,,cdm-Type", can be obtained based on BIP field ,,csiRsConfig"
            "cdmGroupSize" : -1, //calculated from ,,cdmType"
            "w_sequences_table" : -1, //depends on cdm group, its a pointer to the adequate t38_211_7_4_1_5_3_x table
            "alpha" : -1,
            "k_values" : [-1,-1,-1,-1,-1], //k0, k1, k2, k3.... mentioned in table 7_4_1_5_3_1:
            "k_bar_values" : [], //k_bar values from (k_bar,l_bar) column in table 7_4_1_5_3_1
            "l_bar_values" : [], 
        }

        params_CSIRS["numOfPorts"] = t38_211_7_4_1_5_3_1[ params_CSIRS["row_id"] ]["ports"];
        params_CSIRS["cdmType"] =  t38_211_7_4_1_5_3_1[ params_CSIRS["row_id"] ]["cdmType"];
        params_CSIRS["alpha"] = params_CSIRS["numOfPorts"] === 1 ? params_CSIRS["density"] : 2 * params_CSIRS["density"];
        // params_CSIRS["l1"] = params_CSIRS["l0"] + 4; //?

        switch(params_CSIRS["cdmType"]){
            case "noCDM" : 
                params_CSIRS["w_sequences_table"] = t38_211_7_4_1_5_3_2;
                params_CSIRS["cdmGroupSize"] = 1;
                break;
            case "fd-CDM2" : 
                params_CSIRS["w_sequences_table"] = t38_211_7_4_1_5_3_3;
                params_CSIRS["cdmGroupSize"] = 2;
                break;
            case "cdm4-FD2-TD2" :
                params_CSIRS["w_sequences_table"] = t38_211_7_4_1_5_3_4;
                params_CSIRS["cdmGroupSize"] = 4;
                break;
            case "cdm8-FD2-TD4" :
                params_CSIRS["w_sequences_table"] = t38_211_7_4_1_5_3_5;
                params_CSIRS["cdmGroupSize"] = 8;
                break;
        }

        //Below calculation of "k_values" parameter
        let found_ones = 0;
        for(let i = 0; i<NUM_OF_RE_IN_RB; i++){
            let bit = typeof(params_CSIRS["freqAllocation"]) === 'number' ? (params_CSIRS["freqAllocation"] >> i) & 0x1 : parseInt(params_CSIRS["freqAllocation"][params_CSIRS["freqAllocation"].length - 1 - i]);
            if(!bit) continue;

            if([1,2].includes( params_CSIRS["row_id"]) ) params_CSIRS["k_values"][found_ones] = i;
            else if([4].includes( params_CSIRS["row_id"])) params_CSIRS["k_values"][found_ones] = 4*i; //𝑘𝑖−1 = 4𝑓(𝑖) for row 4 of Table 7.4.1.5.3-1 (3GPP)
            else params_CSIRS["k_values"][found_ones] = 2*i; //𝑘𝑖−1 = 2𝑓(𝑖) for all other cases (3GPP)

            found_ones++;
        }

        if(params_CSIRS["density"] == 0.5 && params_CSIRS["startPrb"] % 2 != params_CSIRS["densityDot5PrbLocation"]) params_CSIRS["startPrb"]++;

        //Below calculation of "k_bar_values" and "l_bar_values"
        const row = t38_211_7_4_1_5_3_1[ params_CSIRS["row_id"] ];
        const indexes = row["indexes"];
        for(let i = 0; i < indexes.length; i++){
            const index = indexes[i];
            let k_bar = params_CSIRS["k_values"][ index[0][1] ];
            if( index[0].length === 6) k_bar += parseInt( index[0][5] );
            params_CSIRS["k_bar_values"].push(k_bar);

            let l_bar = params_CSIRS["l0"]; //Nokia doesn't use l1
            if( index[1].length === 6) l_bar += parseInt( index[1][5] );
            params_CSIRS["l_bar_values"].push(l_bar);
        }

        // csirs_SetPrecodingMatrix(params_CSIRS);

        params_CSIRS_arr[i] = params_CSIRS;
    }
    return params_CSIRS_arr;
}