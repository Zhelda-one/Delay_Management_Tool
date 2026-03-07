const t38_214_6_2_2_1 = {
    "1" : { 1 : 0,      2 : 0},
    "2" : { 1 : -3,     2 : -3},
    "3" : { 1 : null,   2 : -4.77}
}

const t38_211_6_4_1_1_3_1 = [ 
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,+1]}, //p === 1000
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,+1,+1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,+1,-1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,"+j",-1,"-j"], "wt": [+1,+1]}, // p === 1008
    {"cdm": 0, "delta": 0, "wf": [+1,"-j",-1,"+j"], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,"+j",-1,"-j"], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,"-j",-1,"+j"], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,"+j",-1,"-j"], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,"-j",-1,"+j"], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,"+j",-1,"-j"], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,"-j",-1,"+j"], "wt": [+1,-1]}, //p === 1015
]

const t38_211_6_4_1_1_3_2 = [ 
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,+1]}, //p === 1000
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,+1,+1,+1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,+1,+1,+1], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,-1,+1,-1], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,-1,+1,-1], "wt": [+1,-1]}, 
    {"cdm": 0, "delta": 0, "wf": [+1,"+j",-1,"-j"], "wt": [+1,+1]}, //p === 1012 
    {"cdm": 0, "delta": 0, "wf": [+1,"-j",-1,"+j"], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,"+j",-1,"-j"], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,"-j",-1,"+j"], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,"+j",-1,"-j"], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,"-j",-1,"+j"], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,"+j",-1,"-j"], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,"-j",-1,"+j"], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,"+j",-1,"-j"], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,"-j",-1,"+j"], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,"+j",-1,"-j"], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,"-j",-1,"+j"], "wt": [+1,-1]}, //p === 1023
]

const t38_211_6_4_1_1_3_3 = [
    [ [],[],[],[],                                  [],[],[],[] ], //PUSCH duration == 0
    [ [],[],[],[],                                  ["l0"],["l0"],["l0"],["l0"] ], //PUSCH duration == 1
    [ [],[],[],[],                                  ["l0"],["l0"],["l0"],["l0"] ], 
    [ [],[],[],[],                                  ["l0"],["l0"],["l0"],["l0"] ],
    [ ["l0"],["l0"],["l0"],["l0"],                  ["l0"],["l0"],["l0"],["l0"] ], 
    [ ["l0"],["l0"],["l0"],["l0"],                  ["l0"],["l0",4],["l0",4],["l0",4] ], 
    [ ["l0"],["l0"],["l0"],["l0"],                  ["l0"],["l0",4],["l0",4],["l0",4] ], 
    [ ["l0"],["l0"],["l0"],["l0"],                  ["l0"],["l0",4],["l0",4],["l0",4] ], //dur == 7
    [ ["l0"],["l0",7],["l0",7],["l0",7],            ["l0"],["l0",6],["l0",3,6],["l0",3,6] ], //dur == 8
    [ ["l0"],["l0",7],["l0",7],["l0",7],            ["l0"],["l0",6],["l0",3,6],["l0",3,6] ],
    [ ["l0"],["l0",9],["l0",6,9],["l0",6,9],        ["l0"],["l0",8],["l0",4,8],["l0",3,6,9] ],
    [ ["l0"],["l0",9],["l0",6,9],["l0",6,9],        ["l0"],["l0",8],["l0",4,8],["l0",3,6,9] ],
    [ ["l0"],["l0",9],["l0",6,9],["l0",5,8,11],     ["l0"],["l0",10],["l0",5,10],["l0",3,6,9] ], //dur == 12
    [ ["l0"],["l0",11],["l0",7,11],["l0",5,8,11],   ["l0"],["l0",10],["l0",5,10],["l0",3,6,9] ], 
    [ ["l0"],["l0",11],["l0",7,11],["l0",5,8,11],   ["l0"],["l0",10],["l0",5,10],["l0",3,6,9] ], 
 ]

 const t38_211_6_4_1_1_3_4 = [ 
    [ [],[],[],[],                         [],[],[],[] ], //PUSCH duration == 0
    [ [],[],[],[],                         [],[],[],[] ], //PUSCH duration == 1
    [ [],[],[],[],                         [],[],[],[] ], 
    [ [],[],[],[],                         [],[],[],[] ],
    [ ["l0"],[],[],[],                     [],[],[],[] ], 
    [ ["l0"],[],[],[],                     ["l0"],["l0"],[],[] ], 
    [ ["l0"],[],[],[],                     ["l0"],["l0"],[],[] ], 
    [ ["l0"],[],[],[],                     ["l0"],["l0"],[],[] ], //dur == 7
    [ ["l0"],[],[],[],                     ["l0"],["l0",5],[],[] ], //dur == 8
    [ ["l0"],[],[],[],                     ["l0"],["l0",5],[],[] ],
    [ ["l0"],["l0",8],[],[],               ["l0"],["l0",7],[],[] ],
    [ ["l0"],["l0",8],[],[],               ["l0"],["l0",7],[],[] ],
    [ ["l0"],["l0",8],[],[],               ["l0"],["l0",9],[],[] ], //dur == 12
    [ ["l0"],["l0",10],[],[],              ["l0"],["l0",9],[],[] ], 
    [ ["l0"],["l0",10],[],[],              ["l0"],["l0",9],[],[] ], 
 ]

 const t38_211_6_4_1_1_3_6 = [ 
    [ [],[],[],[],              [],[],[],[],                 [0],[0],[0],[0] ], //PUSCH duration == 1
    [ [],[],[],[],              [],[],[],[],                 [0],[0],[0],[0] ], 
    [ [],[],[],[],              [],[],[],[],                 [0],[0],[0],[0] ],
    [ [2],[0],[2],[0],          [3],[0],[3],[0],             [0],[0],[0],[0] ], 
    [ [2],[0],[2],[0,4],        [3],[0],[3],[0,4],           [0],[0],[0,4],[0,4] ], 
    [ [2],[0],[2],[0,4],        [3],[0],[3],[0,4],           [0],[0],[0,4],[0,4] ], 
    [ [2],[0],[2,6],[0,4],      [3],[0],[3],[0,4],           [0],[0],[0,4],[0,4] ], //dur == 7
 ]

 const t38_211_6_4_1_2_2_1_1 = [
    [ 0, 2, 6, 8,          0, 1, 6, 7 ], //p === 1000
    [ 2, 4, 8, 10,         1, 6, 7, 0 ],
    [ 1, 3, 7, 9,          2, 3, 8, 9 ],
    [ 3, 5, 9, 11,         3, 8, 9, 2 ],
    [-1, -1, -1, -1,       4, 5, 10, 11 ],
    [-1, -1, -1, -1,       5, 10, 11, 4 ],
    [-1, -1, -1, -1,       -1, -1, -1, -1],
    [-1, -1, -1, -1,       -1, -1, -1, -1],
    [4, 6, 10, 0,          -1, -1, -1, -1],
    [6, 8, 0, 2,           -1, -1, -1, -1],
    [5, 7, 11, 1,          -1, -1, -1, -1],
    [7, 9, 1, 3,           -1, -1, -1, -1],
    [-1, -1, -1, -1,       6, 7, 0, 1],
    [-1, -1, -1, -1,       7, 0, 1, 6],
    [-1, -1, -1, -1,       8, 9, 2, 3],
    [-1, -1, -1, -1,       9, 2, 3, 8],
    [-1, -1, -1, -1,       10, 11, 4, 5],
    [-1, -1, -1, -1,       11, 4, 5, 10] //p == 1017
]


//Below precoding matrix corresponding to codebookIndex, in the form of (v_rel,v_im), j in specification translates to 1 in the second matrix
const t38_211_6_3_1_5_1 = [ //1 layer, 2 physical antenna ports (This table is supported by Gates)
    [ [ 1/Math.sqrt(2), 0],[ 0,0 ] ],
    [ [0,1/Math.sqrt(2)],[0,0] ],
    [ [ 1/Math.sqrt(2), 1/Math.sqrt(2) ],[ 0, 0 ] ],
    [ [1/Math.sqrt(2),-1/Math.sqrt(2)],[0,0] ],
    [ [ 1/Math.sqrt(2), 0],[0,1/Math.sqrt(2)] ],
    [ [1/Math.sqrt(2),0],[0,-1/Math.sqrt(2)] ]
]

const t38_211_6_3_1_5_3 = [ //1 layer, 4 physical antenna ports, no transform precoding
    [ [1/2,0,0,0], [0,0,0,0] ],
    [ [0,1/2,0,0], [0,0,0,0] ],
    [ [0,0,1/2,0], [0,0,0,0] ],
    [ [0,0,0,1/2], [0,0,0,0] ],
    [ [1/2,0,1/2,0], [0,0,0,0] ],
    [ [1/2,0,-1/2,0], [0,0,0,0] ]
    //6-27 not supported for now
]   

const t38_211_6_3_1_5_4 = [ //2 layers, 2 physical antenna ports, no transform precoding (This table is supported by Gates)
    [ [ 1/Math.sqrt(2), 0, 0, 1/Math.sqrt(2) ],[ 0, 0, 0, 0 ] ],
    [ [ 1/2, 1/2, 1/2, -1/2 ],[0, 0, 0, 0 ] ],
    [ [1/2, 0, 1/2, 0 ], [0, 1/2, 0, -1/2 ] ]
]

const t38_211_6_3_1_5_5 = [ //2 layers, 4 physical ant ports, no transform precoding
    [ [1/2,0,0,0, 0,1/2,0,0], [0,0,0,0, 0,0,0,0]],
    [ [1/2,0,0,0, 0,0,1/2,0], [0,0,0,0, 0,0,0,0]],
    [ [1/2,0,0,0, 0,0,0,1/2], [0,0,0,0, 0,0,0,0]],
    [ [0,1/2,0,0, 0,0,1/2,0], [0,0,0,0, 0,0,0,0]],
    [ [0,1/2,0,0, 0,0,0,1/2], [0,0,0,0, 0,0,0,0]] //codebook index = 4
    //5-21 not supported for now
]

const t38_211_6_3_1_5_6 = [ //3 layers, 4 physical ant ports, no transform precoding
    [ [1/2,0,0,0, 0,1/2,0,0, 0,0,1/2,0], [0,0,0,0, 0,0,0,0, 0,0,0,0]],
    [ [1/2,0,1/2,0, 0,1/2,0,0, 0,0,0,1/2], [0,0,0,0, 0,0,0,0, 0,0,0,0]],
    [ [1/2,0,-1/2,0, 0,1/2,0,0, 0,0,0,1/2], [0,0,0,0, 0,0,0,0, 0,0,0,0]],
    [ [0.288,0.288,0.288,0.288, 0.288,-0.288,0.288,-0.288, 0.288,0.288,-0.288,-0.288], [0,0,0,0, 0,0,0,0, 0,0,0,0]]
    //4 - 6 not supported for now
]

const t38_211_6_3_1_5_7 = [ //4 layers, 4 physical ant ports, no transform precoding
    [ [1/2,0,0,0, 0,1/2,0,0, 0,0,1/2, 0,0,0,1/2], [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
    [ [1/2,0,0,0, 0,1/2,0,0, 0,0,1/2, 0,0,0,1/2], [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
    //2 - 4 not supported for now
]


//Returns precoding matrix W, don't confuse numCeAxCIndex (number of physical ports) with rank (num of logical ports prior to precoding)
function pusch_getPrecodingMatrix(rank,numCeAxCIndex,codebookIndex){
    if(numCeAxCIndex === 1) return new M([1], [0] , 1, 1); //W = identity matrix
    else if(numCeAxCIndex === 2){
        const index = codebookIndex;
        if(rank === 1) return new M(t38_211_6_3_1_5_1[index][0], t38_211_6_3_1_5_1[index][1] , 2, 1);
        else if(rank === 2){
            return new M(t38_211_6_3_1_5_4[index][0], t38_211_6_3_1_5_4[index][1], 2, 2);      
        }   
    }
    else if(numCeAxCIndex === 4){
        const index = codebookIndex;
        if(rank === 1) return new M(t38_211_6_3_1_5_3[index][0], t38_211_6_3_1_5_3[index][1], 4, 1);   
        else if(rank === 2) return new M(t38_211_6_3_1_5_5[index][0], t38_211_6_3_1_5_5[index][1], 4, 2);   
        else if(rank === 3) return new M(t38_211_6_3_1_5_6[index][0], t38_211_6_3_1_5_6[index][1], 4, 3); 
        else if(rank === 4) return new M(t38_211_6_3_1_5_7[index][0], t38_211_6_3_1_5_7[index][1], 4, 4); 
    }
    else{
        return null;
    }
}

//(u,antId,sf,slot) or (subcell,sfn,slot) might be used to specify target slot
//Important notes:
//-The number of PUSCH antenna ports (now after Precoding block) is equal to the numofSRSPorts
//-UlData_PuschReceiveReq message indicates the DMRS PUSCH ports (not PUSCH)
function pusch_GetParametersArr(u,antId,sf,bba_slot,PUSCH,l2l1_packets,subcell,sfn,l2l1_slot){ //Based on 6.4.1.1 of 38.211 i-30
    const l2l1_data_arr = nr_get_l2l1_data_from_packets(PUSCH,sf,bba_slot,u,antId,l2l1_packets,false,subcell,sfn,l2l1_slot);
    if(!l2l1_data_arr) return null;
    let params_PUSCH_arr = new Array(l2l1_data_arr.length).fill(null);
    for(let i = 0; i < l2l1_data_arr.length; i++){    
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;    

        let params_PUSCH = {
            //ALLOCATION PARAMS            
            "pusch_StartSymbol" : l2l1_data.startSymbol,
            "pusch_NumOfSymbols" : l2l1_data.numOfPuschSymbols,
            "startPrb": l2l1_data.startPrb,
            'numOfPrb': l2l1_data.numOfPrb,

            //PRECODING PARAMS
            "codebookIndex" : l2l1_data.codebookIndex,
            "spatialMode" : ["SINGLE_ANTENNA", "TX_DIVERSITY", "CL_SPATIAL_MUX", "OL_SPA TX_DIVERSITYTIAL_MUX"][l2l1_data.spatialMode],
            "rank" : l2l1_data.numOfLayers,
            "numCeAxCIndex" : l2l1_data.eCpriConfigStruct ? l2l1_data.eCpriConfigStruct.numCeAxCIndex : 2,
            "ceAxCIndex" : l2l1_data.eCpriConfigStruct ? l2l1_data.eCpriConfigStruct.ceAxCIndex : [0,1], //Size of output after precoding


            "transformPrecoding" : l2l1_data.puschTransformPrecoderFlag ? l2l1_data.puschTransformPrecoderFlag : 0, //?
            "pi/2ModulationTransPrecoding" : 0,
            // "freq_hopping": 0, //Not used in Nokia
            // "multiPanelScheme" : "NOTsfnScheme", //Only this mode is used, based on (determining bitfield size of Antenna Ports for 0_1 in 38212)       
            // "txConfig" : "codebook", //Only this mode is used, based on (determining bitfield size of Antenna Ports for 0_1 in 38212)
            
            
            "codebookSubset" : ["nonCoherent", "partialNonCoherent", "fullCoherent"][l2l1_data.puschTransCoherence],
            "HarqProcessNr": l2l1_data.harqProcessIndex,
            
            //OTHER PARAMS
            "RedundancyVersion" : l2l1_data.rvIndex !== undefined ? l2l1_data.rvIndex.toString(2).padStart(2,"0") : null,
            "Mcs" : l2l1_data.mcs !== undefined ? l2l1_data.mcs : null,
            "fakeUe" : l2l1_data.fakeUe, //those with fakeUe = 1 should probably be avoided
            "slot" : l2l1_data.slot,
            "csiReportStruct" : l2l1_data.csiReportStruct ? l2l1_data.csiReportStruct : [],

            //DMRS RELATED
            "dmrs_MappingType" : l2l1_data.ulDmrsMappingType,
            "dmrs_ConfigType" : l2l1_data.ulDmrsConfigType, 
            "dmrs_TypeAPos": l2l1_data.ulDmrsTypeAPos, 
            "dmrs_AdditionalPos": l2l1_data.ulDmrsAddPos, 
            // "dmrs_TypeEnh" : 0, //not used by nokia
            "dmrs_MaxLen" : l2l1_data.ulDmrsLen,
            "dmrs_AntPortBitmap" : l2l1_data.antPort.toString(2).padStart(16,"0"),
            "n_scid": l2l1_data.nscId,
            "N_RB" : l2l1_data.numOfPrb, //Number of scheduled RBs, same as numOfPrb
            "N_ID" : l2l1_data.dmrsScramblingSequenceInt,
            // "N_id_1" : l2l1_data.dmrsScramblingSequenceInt, //?
            // "n_ID_RS" : l2l1_data.dmrsScramblingSequenceInt, //! 
            "n_rnti": l2l1_data.rnti,            
            "numOfCdmGroupsWithoutData" : l2l1_data.numOfDmrsCdmGroupWithoutData ? l2l1_data.numOfDmrsCdmGroupWithoutData : 2, //?

            //PTRS RELATED
            "ptrs_present" : l2l1_data.ulPtrsFlag !== undefined ? l2l1_data.ulPtrsFlag : 0,
            "ptrs_FreqDensity" : l2l1_data.ulPtrsFrequencyDensity, 
            "ptrs_TimeDensity" : l2l1_data.ulPtrsTimeDensity, 
            "ptrs_ReOffset" : l2l1_data.ulPtrsResElemOffset, 
            "re_ref_ptrs": 12*l2l1_data.startPrb, //ptrs is relative to start of alloc
            "sym_ref_ptrs" : l2l1_data.startSymbol, //ptrs is relative to start of alloc
            //ptrs_numOfPorts


            "pusch_duration" : -1, //depends on MappingType
            "sc_increment": -1,
            "dmrs_AntPorts": [], //logical ports
            "dciField_PrecInfoAndNumOfLayers" : "",
            "dciField_AntennaPorts" : "",
            "dciField_freqDomainResAssignment" : "", //Bitmap exact like Frequency Domain Resource Assignment in dci 0_1 should look like. (Ignore for 0_0) 

            "lambda" : [],
            "delta": [], 
            "l0" : -1,
            "l1" : 11,
            "dmrs_sym_positions": [],
            "sym_ref_dmrs" : -1, //ref point for l for dmrs, depends on mapping type
            "re_ref_dmrs": -1, //ref point for k (dmrs)
            "k_ref_RB" : -1, //for ptrs
            "k_ref_RE" : [], //corresponds to antPorts, used for ptrs 

            "beta_pusch" : 1, //dont know how to obtain it
            "beta_dmrs" : -1,
            "beta_pusch_dmrs" : -1,
            "beta_ptrs" : 1,
        }

        if(params_PUSCH["numOfCdmGroupsWithoutData"] > 3 || params_PUSCH["rank"] > 8) return null; //Prevents faulty packets from throwing exceptions

        params_PUSCH["beta_dmrs"] = t38_214_6_2_2_1[ params_PUSCH["numOfCdmGroupsWithoutData"] ][params_PUSCH["dmrs_ConfigType"]]; //38.214
        params_PUSCH["beta_pusch_dmrs"] = params_PUSCH["beta_pusch"] * 10**(-params_PUSCH["beta_dmrs"]/20);

        params_PUSCH["re_ref_dmrs"] = params_PUSCH["transformPrecoding"] ? 12*params_PUSCH["startPrb"] : 0;

        if(params_PUSCH["N_RB"] % params_PUSCH["ptrs_FreqDensity"] === 0) params_PUSCH["k_ref_RB"] = params_PUSCH["n_rnti"] % params_PUSCH["ptrs_FreqDensity"];
        else params_PUSCH["k_ref_RB"] =  params_PUSCH["n_rnti"] % (params_PUSCH["N_RB"] % params_PUSCH["ptrs_FreqDensity"] );  

        if(subcell == undefined || subcell == null || subcell == -1) subcell = nr_get_subcell_from_antenna(u,antId);

        //ANTENNA PORTS bitmap to array
        for(let i = 0; i < 16; i++){
            if(params_PUSCH["dmrs_AntPortBitmap"][i] === "1"){
                params_PUSCH["dmrs_AntPorts"].push( i );
            }
        }

        if(params_PUSCH["dmrs_MappingType"] === 0){
            params_PUSCH["pusch_duration"] = params_PUSCH["pusch_StartSymbol"] + params_PUSCH["pusch_NumOfSymbols"];
            params_PUSCH["l0"] = params_PUSCH["dmrs_TypeAPos"];
            params_PUSCH["sym_ref_dmrs"] = 0;
        }
        else{
            params_PUSCH["pusch_duration"]  = params_PUSCH["pusch_NumOfSymbols"];
            params_PUSCH["l0"] = 0;
            params_PUSCH["sym_ref_dmrs"] = params_PUSCH["pusch_StartSymbol"];
        }

        // if(params_PUSCH["dmrs_AdditionalPos"] !== 0 && params_PUSCH["freq_hopping"]) params_PUSCH["dmrs_AdditionalPos"] = 1;

        if(params_PUSCH["dmrs_ConfigType"] === 1){
            for(let j = 0; j < params_PUSCH["dmrs_AntPorts"].length; j++){
                params_PUSCH["delta"].push( t38_211_6_4_1_1_3_1[ params_PUSCH["dmrs_AntPorts"][j] ]["delta"] );
                params_PUSCH["lambda"].push( t38_211_6_4_1_1_3_1[ params_PUSCH["dmrs_AntPorts"][j] ]["cdm"] );
            }
            params_PUSCH["sc_increment"] = 2;
        }
        else{
            for(let j = 0; j < params_PUSCH["dmrs_AntPorts"].length; j++){
                params_PUSCH["delta"].push( t38_211_6_4_1_1_3_2[ params_PUSCH["dmrs_AntPorts"][j] ]["delta"] );
                params_PUSCH["lambda"].push( t38_211_6_4_1_1_3_2[ params_PUSCH["dmrs_AntPorts"][j] ]["cdm"] );
            }
            params_PUSCH["sc_increment"] = 6;
        }

        const table_offset = params_PUSCH["dmrs_MappingType"] === 0 ? 0 : 4; 
        if(params_PUSCH["dmrs_MaxLen"] === 1){
            params_PUSCH["dmrs_sym_positions"] = [ ...t38_211_6_4_1_1_3_3[ params_PUSCH["pusch_duration"] ][table_offset + params_PUSCH["dmrs_AdditionalPos"]] ];
        }
        else{
            params_PUSCH["dmrs_sym_positions"] = [ ...t38_211_6_4_1_1_3_4[ params_PUSCH["pusch_duration"] ][table_offset + params_PUSCH["dmrs_AdditionalPos"]] ];
        } 

        if(params_PUSCH["ptrs_present"]){
            for(let j = 0; j < params_PUSCH["dmrs_AntPorts"].length; j++){
                params_PUSCH["k_ref_RE"].push( t38_211_6_4_1_2_2_1_1[ params_PUSCH["dmrs_AntPorts"][j] ][table_offset + params_PUSCH["ptrs_ReOffset"]] );
            }
        }

        if(params_PUSCH["dmrs_sym_positions"][0] === "l0") params_PUSCH["dmrs_sym_positions"][0] = params_PUSCH["l0"];
        if(params_PUSCH["dmrs_sym_positions"][0] === "l1") params_PUSCH["dmrs_sym_positions"][0] = params_PUSCH["l1"];

        [_,params_PUSCH["dciField_freqDomainResAssignment"] ] = dci_getFreqDomainResAssignmentFieldAndSize("resourceAllocationType1",
            params_PUSCH["startPrb"],params_PUSCH["numOfPrb"],nr_N_BWP_size_UL[subcell],null,null,null,false);

        [_,params_PUSCH["dciField_PrecInfoAndNumOfLayers"] ] = dci_0_1_getPrecodingInfoAndNumOfLayersFieldAndSize(params_PUSCH["transformPrecoding"],params_PUSCH["rank"],params_PUSCH["rank"],
            params_PUSCH["codebookSubset"],params_PUSCH["codebookIndex"],params_PUSCH["rank"]);

        [_,params_PUSCH["dciField_AntennaPorts"]] = dci_0_1_getAntennaPortsFieldAndSize(params_PUSCH["dmrs_ConfigType"],params_PUSCH["dmrs_MaxLen"],
            params_PUSCH["numOfCdmGroupsWithoutData"], params_PUSCH["dmrs_AntPorts"],params_PUSCH["rank"],params_PUSCH["transformPrecoding"]);

        params_PUSCH_arr[i] = params_PUSCH;
    }

    return params_PUSCH_arr;
}