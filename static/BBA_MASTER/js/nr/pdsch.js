const t38_214_4_1_1 = {
    "1" : {"0" : 0, "1" : 0},
    "2" : {"0" : -3, "1" : -3},
    "3" : {"0" : NaN, "1" : -4.77},
}
const t38_214_4_1_2 = {
    "0" : [null, 0, 3, 4.77, 6, 7, 7.76],
    "1" : [null, 0, 0, 0, 0, 0, 0],
    "2" : [null, null, null, null, null, null, null],
    "3" : [null, null, null, null, null, null, null],
}

const t38_211_7_4_1_1_2_1 = [ 
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,+1]}, //p === 1000
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,+1,+1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,+1,-1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,+1,-1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,+1,+1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,+1,-1], "wt": [+1,-1]}, //p === 1007
    {"cdm": 0, "delta": 0, "wf": [+1,+1,-1,-1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,-1,+1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,-1,-1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,-1,+1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,+1,-1,-1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,-1,+1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,+1,-1,-1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 1, "wf": [+1,-1,-1,+1], "wt": [+1,-1]}, //p === 1015
]

const t38_211_7_4_1_1_2_2 = [ 
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
    {"cdm": 2, "delta": 4, "wf": [+1,-1,+1,-1], "wt": [+1,-1]}, //p === 1011
    {"cdm": 0, "delta": 0, "wf": [+1,+1,-1,-1], "wt": [+1,+1]}, 
    {"cdm": 0, "delta": 0, "wf": [+1,-1,-1,+1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,+1,-1,-1], "wt": [+1,+1]},
    {"cdm": 1, "delta": 2, "wf": [+1,-1,-1,+1], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,+1,-1,-1], "wt": [+1,+1]},
    {"cdm": 2, "delta": 4, "wf": [+1,-1,-1,+1], "wt": [+1,+1]},
    {"cdm": 0, "delta": 0, "wf": [+1,+1,-1,-1], "wt": [+1,-1]},
    {"cdm": 0, "delta": 0, "wf": [+1,-1,-1,+1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,+1,-1,-1], "wt": [+1,-1]},
    {"cdm": 1, "delta": 2, "wf": [+1,-1,-1,+1], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,+1,-1,-1], "wt": [+1,-1]},
    {"cdm": 2, "delta": 4, "wf": [+1,-1,-1,+1], "wt": [+1,-1]}, //p === 1023
]

const t38_211_7_4_1_1_2_3 = [ 
    [ [],[],[],[],                                       [],[],[],[] ],
    [ [],[],[],[],                                       [],[],[],[] ], //PDSCH duration == 1
    [ [],[],[],[],                                       ["l0"],["l0"],["l0"],["l0"] ], 
    [ ["l0"],["l0"],["l0"],["l0"],                       ["l0"],["l0"],["l0"],["l0"] ],
    [ ["l0"],["l0"],["l0"],["l0"],                       ["l0"],["l0"],["l0"],["l0"] ], 
    [ ["l0"],["l0"],["l0"],["l0"],                       ["l0"],["l0",4],["l0",4],["l0",4] ], //dur == 5
    [ ["l0"],["l0"],["l0"],["l0"],                       ["l0"],["l0",4],["l0",4],["l0",4] ], //dur == 6
    [ ["l0"],["l0"],["l0"],["l0"],                       ["l0"],["l0",4],["l0",4],["l0",4] ],
    [ ["l0"],["l0",7],["l0",7],["l0",7],                 ["l0"],["l0",6], ["l0",3,6],["l0",3,6] ],
    [ ["l0"],["l0",7],["l0",7],["l0",7],                 ["l0"],["l0",7],["l0",4,7],["l0",4,7] ],
    [ ["l0"],["l0",9],["l0",6,9],["l0",6,9],             ["l0"],["l0",7],["l0",4,7],["l0",4,7] ], //dur == 10
    [ ["l0"],["l0",9],["l0",6,9],["l0",6,9],             ["l0"],["l0",8],["l0",4,8],["l0",3,6,9] ],
    [ ["l0"],["l0",9],["l0",6,9],["l0",5,8,11],          ["l0"],["l0",9],["l0",5,9],["l0",3,6,9] ], //dur == 12
    [ ["l0"],["l0","l1"],["l0",7,11],["l0",5,8,11],      ["l0"],["l0",9],["l0",5,9],["l0",3,6,9] ],
    [ ["l0"],["l0","l1"],["l0",7,11],["l0",5,8,11],      [],[],[],[] ],    
 ]

 const t38_211_7_4_1_1_2_4 = [
    [ [],[],[],[],                          [],[],[],[] ], //PDSCH duration == 0
    [ [],[],[],[],                          [],[],[],[] ], //PDSCH duration == 1
    [ [],[],[],[],                          [],[],[],[] ], 
    [ [],[],[],[],                          [],[],[],[] ],
    [ ["l0"],["l0"],[],[],                  [],[],[],[] ], 
    [ ["l0"],["l0"],[],[],                  ["l0"],["l0"],[],[] ],
    [ ["l0"],["l0"],[],[],                  ["l0"],["l0"],[],[] ], 
    [ ["l0"],["l0"],[],[],                  ["l0"],["l0"],[],[] ], //dur == 7
    [ ["l0"],["l0"],[],[],                  ["l0"],["l0",5],[],[] ], //dur == 8
    [ ["l0"],["l0"],[],[],                  ["l0"],["l0",5],[],[] ],
    [ ["l0"],["l0",8],[],[],                ["l0"],["l0",7],[],[] ],
    [ ["l0"],["l0",8],[],[],                ["l0"],["l0",7],[],[] ],
    [ ["l0"],["l0",8],[],[],                ["l0"],["l0",8],[],[] ], //dur == 12
    [ ["l0"],["l0",10],[],[],               ["l0"],["l0",8],[],[] ],
    [ ["l0"],["l0",10],[],[],               [],[],[],[] ],    
 ]

 const t38_211_7_4_1_2_2_1 = [
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

//Below precoding matrixes specified in Gates: 5G_L1_Entity_Level for some of the spatial multiplexings
//col0 comes first, then whole col1 etc...
const t_CL_2x2_rank1 = [ //closed loop scheme, rank 1, numOfPorts = 2
    [ [ 1,1 ],[ 0,0 ] ],
    [ [ 1,0 ],[ 0,1] ],
    [ [ 1,-1 ],[ 0, 0 ] ],
    [ [ 1,0 ],[ 0,-1] ],
]

const t_CL_2x2_rank2 = [ //closed loop scheme, rank 2, numOfPorts = 2
    [ [1/Math.sqrt(2),1/Math.sqrt(2),1/Math.sqrt(2),-1/Math.sqrt(2)],[0,0,0,0] ],
    [ [1/Math.sqrt(2),0,1/Math.sqrt(2),0],[0,1/Math.sqrt(2),0,-1/Math.sqrt(2)] ],
    [ [1,0,0,1],[0,0,0,0] ],
]

const t_OL_2X2_NoPrecoding = [ //Matrix W for open loop scheme spatial multiplexing, numOfPorts = 2,
    [ [1,1],[0,0] ], //rank 1
    [ [1,0,0,1],[0,0,0,0] ], //rank 2
]

const t_OL_4X4_NoPrecoding_NoPortSelection = [ //Matrix W for open loop scheme spatial multiplexing
    [[1,1,1,1], [0,0,0,0]], //rank = 1
    [[1,1,0,0, 0,0,1,1], [0,0,0,0, 0,0,0,0]], //rank = 2
    [[1,0,0,0, 0,1,0,0, 0,0,1,1], [0,0,0,0, 0,0,0,0, 0,0,0,0]], //rank = 3
    [[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]] //rank = 4    
]

const t_OL_4X4_NoPrecoding_PortSelectionUpToRank2 = [
    [[1,0,1,0], [0,0,0,0]], //rank = 1
    [[1,0,0,0, 0,0,1,0], [0,0,0,0, 0,0,0,0]], //rank = 2  
]

//z1 = a + bi = [a,b], z2 = c + di = [c,d]
function mulComplexNumbers(z1,z2){
    return [ z1[0] * z2[0] - z1[1] * z2[1], z1[0]*z2[1] + z1[1] * z2[0]];
}

function mulArrByScal(scalar, arr){
    for(let i = 0; i < arr.length; i++) arr[i] *= scalar;
    return arr;
}


//returns matrix W for precoding
//When numStreamIndex == 2, then following fields are used: rank, codebookIndex
//When numStreamIndex == 4, then following fields are used: rank, pdschPrecodingOption4x4, i2Codebook4AntPorts
function pdsch_getPrecodingMatrix_CL(params_PDSCH,forPTRS){ //9.3.7.5.5, of 5G_L1_Entity_Level (Gates)
    const rank = forPTRS ? params_PDSCH["ptrs_numOfPorts"] : params_PDSCH["rank"]; // "rank" is for DM-RS, ptrs_numOfPorts is for PT-RS

    if(params_PDSCH["closedLoop3gppCodebook"] === "IdentityCodebook_254"){ //9.3.7.5.4.3 Precoding for DL OL transmission scheme with IdentityCodebook
        if(rank === 1) return new M([1,0,0,0],[0,0,0,0],4,1);
        else if(rank === 2) return new M([1,0,0,0, 0,1,0,0], [0,0,0,0, 0,0,0,0],4,2);
        else if(rank === 3){
            const W = new M([1,0,0,0, 0,1,0,0, 0,0,1,0], [0,0,0,0, 0,0,0,0, 0,0,0,0],4,3);
            return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
        }
        else if(rank === 4){
            const W = new M([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],4,4);
            return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
        }
    }

    if( params_PDSCH["numStreamIndex"] === 2 ){ //CL 2x2 (9.3.7.5.5.1)
        const index = params_PDSCH["codebookIndex"];  
        if(rank === 1) return new M( t_CL_2x2_rank1[ index ][0], t_CL_2x2_rank1[ index ][1], 2, 1);
        else if(rank === 2) return new M( t_CL_2x2_rank2[ index ][0], t_CL_2x2_rank2[ index ][1] , 2, 2);
    }
    else if( params_PDSCH["numStreamIndex"] === 4){ //CL 4x4 (9.3.7.5.5.2)

        let W_csirs;
        if([0,1,2].includes(params_PDSCH["pdschPrecodingOption4x4"])){
            W_csirs = new M([1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1],[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],4,4);
        }
        else if([4,5,6].includes(params_PDSCH["pdschPrecodingOption4x4"])){
            W_csirs = new M([1,1,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,0], [0,0,0,0, 1,-1,0,0, 0,0,0,0, 0,0,1,-1],4,4);
        }

        if(rank === 1){ //9.3.7.5.5.2.2.1 (DL CL 4x4 transmission rank 1)
            const phi_values = [[1,0], [0,1], [-1,0], [0,-1]];
            const phi = phi_values[params_PDSCH["i2Codebook4AntPorts"]]; //complex number [real,img]

            if([0,4].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const i1_1 = params_PDSCH["i2Codebook4AntPorts"]
                const m4_1 = mulComplexNumbers(phi, [Math.cos(i1_1 * Math.PI / 4), Math.sin(i1_1 * Math.PI / 4)]) //W[3][0] = m4_1
                return new M([1,Math.cos(i1_1 * Math.PI / 4), phi[0], m4_1[0]], [0,Math.sin(i1_1 * Math.PI / 4), phi[1],m4_1[1],4,1])
            }           
            else if([1,2].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                return new M([1,0,phi[0],0], [0,0,phi[1],0], 4, 1);
            }
            else if(["PortSelectionUpToRank2WcsirsPrecoding","PortSelectionUpToRank4WcsirsPrecoding",]){
                const i1_1 = params_PDSCH["i2Codebook4AntPorts"]
                if(i1_1 === 2){
                    const m4_1 = mulComplexNumbers(phi, [Math.cos(i1_1 * Math.PI / 4), Math.sin(i1_1 * Math.PI / 4)]) //W[3][0] = m4_1
                    const matrix = new M([1,Math.cos(i1_1 * Math.PI / 4), phi[0], m4_1[0]], [0,Math.sin(i1_1 * Math.PI / 4), phi[1],m4_1[1],4,1]);
                    return W_csirs.mul(matrix);
                }
                else{
                    //W is missing the scaling by SF2_NPS
                    const e_q = [Math.cos( (i1_1 * Math.PI * + 2*Math.PI)/4 ), Math.sin( (i1_1 * Math.PI * + 2*Math.PI)/4 )];
                    const phi_mul_e = mulComplexNumbers(phi,[e_q,e_i]);

                    return new M([1 + e[0], 0, phi[0] + phi_mul_e[0],0], [e[1], 0, phi[1] + phi_mul_e[1],0], 4,1);
                }                
            }
        }
        else if(rank === 2){ //9.3.7.5.5.2.2.2 (DL CL 4x4 transmission rank 2)
            const phi_values = [[1,0], [0,1]]; //[1,j]
            const phi = phi_values[params_PDSCH["i2Codebook4AntPorts"]];
            const i1_1 = params_PDSCH["i1Codebook4AntPorts"][0];
            const i1_3 = params_PDSCH["i1Codebook4AntPorts"][2];
            const alpha = [i1_1, i1_1+4 ][i1_3];

            if([0].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const e1 = [Math.cos( i1_1*Math.PI / 4), Math.sin( i1_1*Math.PI / 4)];
                const e2 = [Math.cos( alpha*Math.PI / 4), Math.sin( alpha*Math.PI / 4)];
                const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

                return new M(
                    mulArrByScal(1/Math.sqrt(2), [1, e1[0], phi[0], phi_mul_e1[0],  1, e2[0], -phi[0], -phi_mul_e2[0]]),
                    mulArrByScal(1/Math.sqrt(2), [0, e1[1], phi[1], phi_mul_e1[1],  0, e2[1], -phi[1], -phi_mul_e2[1]]),
                    4,
                    2
                ) ;
            }
            else if([4].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const e1 = [Math.cos((i1_1*Math.PI + 2*Math.PI) / 4), Math.sin((i1_1*Math.PI + 2*Math.PI) / 4)];
                const e2 = [Math.cos((alpha*Math.PI + 2*Math.PI) / 4), Math.sin((alpha*Math.PI + 2*Math.PI) / 4)];
                const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);
            
                return new M(
                    [1 + e1[0], 1 - e1[0], phi[0] + phi_mul_e1[0], phi[0] - phi_mul_e1[0], 1 + e2[0], 1 - e2[0], -phi[0]-phi_mul_e2[0], -phi[0]+phi_mul_e2[0]],
                    [0 + e1[1], 0 - e1[1], phi[1] + phi_mul_e1[1], phi[1] - phi_mul_e1[1], 0 + e2[1], 0 - e2[1], -phi[1]-phi_mul_e2[1], -phi[1]+phi_mul_e2[1]],
                    4,
                    2
                );
                //W is missing the scaling by SF2_NPS
            }
            else if([1,2].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                return new M(
                    mulArrByScal(1/Math.sqrt(2), [1,0,phi[0],0,  1,0,-phi[0],0]),
                    mulArrByScal(1/Math.sqrt(2), [0,0,phi[1],0,  0,0,-phi[1],0]),
                    4,
                    2
                );
            }
            else if([5,6].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                //W is missing the scaling by SF2_NPS or SF2_PS

                if( (i1_1 === 2 && [0,1].includes(i1_3)) || (i1_1===6 && i1_3===1)){ //Matrix for pdschPrecodingOption4x4 === 4 shall be used
                    const e1 = [Math.cos((i1_1*Math.PI + 2*Math.PI) / 4), Math.sin((i1_1*Math.PI + 2*Math.PI) / 4)];
                    const e2 = [Math.cos((alpha*Math.PI + 2*Math.PI) / 4), Math.sin((alpha*Math.PI + 2*Math.PI) / 4) ];
                    const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);
                
                    return new M(
                        [1 + e1[0], 1 - e1[0], phi[0] + phi_mul_e1[0], phi[0] - phi_mul_e1[0],  1 + e2[0], 1 - e2[0], -phi[0]-phi_mul_e2[0], -phi[0]+phi_mul_e2[0]],
                        [0 + e1[1], 0 - e1[1], phi[1] + phi_mul_e1[1], phi[1] - phi_mul_e1[1],  0 + e2[1], 0 - e2[1], -phi[1]-phi_mul_e2[1], -phi[1]+phi_mul_e2[1]],
                        4,
                        2
                    );
                }
                else{
                    const e1 = [Math.cos((i1_1*Math.PI + 2*Math.PI) / 4) , Math.sin((i1_1*Math.PI + 2*Math.PI) / 4)];
                    const e2 = [Math.cos((alpha*Math.PI + 2*Math.PI) / 4) , Math.sin((alpha*Math.PI + 2*Math.PI) / 4)];
                    const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);
                
                    return new M(
                        [1 + e1[0], 0, phi[0] + phi_mul_e1[0], 0,    1 + e2[0], 0, -phi[0]-phi_mul_e2[0], 0],
                        [0 + e1[1], 0, phi[1] + phi_mul_e1[1], 0,    0 + e2[1], 0, -phi[1]-phi_mul_e2[1], 0],
                        4,
                        2
                    );
                }
            }
        }//end rank 2
        if( rank === 3 ){ //9.3.7.5.5.2.2.3 (DL CL 4x4 transmission rank 3)
            const phi_values = [[1,0], [0,1]]; //[1,j]
            const phi = phi_values[params_PDSCH["i2Codebook4AntPorts"]];
            const i1_1 = params_PDSCH["i1Codebook4AntPorts"][0];
            const i1_3 = params_PDSCH["i1Codebook4AntPorts"][2]; //should be zero
            const alpha = i1_1 + 4;
            // const rotationMatrix = new M([1,0,0, 0,1,0, 0,0,-1], [0,0,0, 0,0,0, 0,0,0], 3,3);

            if([0].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const e1 = [Math.cos( i1_1*Math.PI / 4), Math.sin( i1_1*Math.PI / 4) ]
                const e2 = [Math.cos( alpha*Math.PI / 4), Math.sin( alpha*Math.PI / 4) ]
                const phi_mul_e1 = mulComplexNumbers(phi, e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

                const W =  new M(
                    mulArrByScal(1/Math.sqrt(3), [1, 1*e1[0], phi[0], phi_mul_e1[0],   1, e2[0], phi[0], phi_mul_e2[0],   1, e1[0], -phi[0], -phi_mul_e1[0]]),
                    mulArrByScal(1/Math.sqrt(3), [0, e1[1], phi[1], phi_mul_e1[1],     0, e2[1], phi[1], phi_mul_e2[1],   0, e1[1], -phi[1], -phi_mul_e1[1]]),
                    4,
                    3
                ) ;
                return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
            }
            else if( [4,5].includes(params_PDSCH["pdschPrecodingOption4x4"]) ){
                const e1 = [Math.cos( (i1_1*Math.PI + 2*Math.PI) / 4 ), Math.sin( (i1_1*Math.PI + 2*Math.PI) / 4 ) ];
                const e2 = [Math.cos( (alpha*Math.PI + 2*Math.PI) / 4), Math.sin( (alpha*Math.PI + 2*Math.PI) / 4 ) ];
                const phi_mul_e1 = mulComplexNumbers(phi, e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

                const W = new M(
                    [1 + e1[0], 1 - e1[0], phi[0] + phi_mul_e1[0], phi[0]-phi_mul_e1[0],   1+e2[0],1-e2[0],phi[0]+phi_mul_e2[0], phi[0]-phi_mul_e2[0],   1 + e1[0], 1 - e1[0], -phi[0] - phi_mul_e1[0], -phi[0]+phi_mul_e1[0]],
                    [0 + e1[1], 0 - e1[1], phi[1] + phi_mul_e1[1], phi[1]-phi_mul_e1[1],   0+e2[1],0-e2[1],phi[1]+phi_mul_e2[1], phi[1]-phi_mul_e2[1],   0 + e1[1], 0 - e1[1], -phi[1] - phi_mul_e1[1], -phi[1]+phi_mul_e1[1]],
                    4,
                    3
                ) ;
                return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
                //W misses scaling by SF !!!!!!!!
            }
            else if( [2].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const e = [Math.cos( alpha*Math.PI / 4), Math.sin( alpha*Math.PI / 4) ];
                const phi_mul_e = mulComplexNumbers(phi,e);
                return new M(
                    mulArrByScal(1/Math.sqrt(2), [1,0,phi[0],0,  0,e[0],0,phi_mul_e[0],   1,0,-phi[0],0]),
                    mulArrByScal(1/Math.sqrt(2), [0,0,phi[1],0,  0,e[1],0,phi_mul_e[1],   0,0,-phi[1],0]),
                    4,
                    3
                ) ;
            }
            else if( [6].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                //W misses scaling by SF
                if(i1_1 === 2){
                    const e1 = [Math.cos( (i1_1*Math.PI + 2*Math.PI) / 4 ), Math.sin( (i1_1*Math.PI + 2*Math.PI) / 4 ) ];
                    const e2 = [Math.cos( (alpha*Math.PI + 2*Math.PI) / 4), Math.sin( (alpha*Math.PI + 2*Math.PI) / 4 ) ];
                    const phi_mul_e1 = mulComplexNumbers(phi, e1), phi_mul_e2 = mulComplexNumbers(phi, e2);
    
                    const W = new M(
                        [1 + e1[0], 1 - e1[0], phi[0] + phi_mul_e1[0], phi[0]-phi_mul_e1[0],   1+e2[0],1-e2[0],phi[0]+phi_mul_e2[0], phi[0]-phi_mul_e2[0],   1 + e1[0], 1 - e1[0], -phi[0] - phi_mul_e1[0], -phi[0]+phi_mul_e1[0]],
                        [0 + e1[1], 0 - e1[1], phi[1] + phi_mul_e1[1], phi[1]-phi_mul_e1[1],   0+e2[1],0-e2[1],phi[1]+phi_mul_e2[1], phi[1]-phi_mul_e2[1],   0 + e1[1], 0 - e1[1], -phi[1] - phi_mul_e1[1], -phi[1]+phi_mul_e1[1]],
                        4,
                        3
                    ) ;
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
                }
                else{
                    const e1 = [Math.cos( (i1_1*Math.PI + 2*Math.PI) / 4 ), Math.sin( (i1_1*Math.PI + 2*Math.PI) / 4 ) ];
                    const e2 = [Math.cos( (alpha*Math.PI + 2*Math.PI) / 4), Math.sin( (alpha*Math.PI + 2*Math.PI) / 4 ) ];
                    const phi_mul_e1 = mulComplexNumbers(phi, e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

                    const W = new M(
                        [1 + e1[0], 0, phi[0] + phi_mul_e1[0],0,  0, 1 - e2[0], 0, phi[0]-phi_mul_e2[0],  1 + e1[0], 0, -phi[0] - phi_mul_e1[0],0],
                        [0 + e1[1], 0, phi[1] + phi_mul_e1[1],1,  0, 0 - e2[1], 0, phi[1]-phi_mul_e2[1],  0 + e1[1], 0, -phi[1] - phi_mul_e1[1],0],
                        4,
                        3
                    ) ;
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank) : W;
                }
            }

        } //end rank 3
        else if( rank === 4 ){ //9.3.7.5.5.2.2.4 (DL CL 4x4 transmission rank 4)
            return null; //Not yet supported
        }
    }

    return null;
}

function pdsch_getNForOLPrecoding(){
    const bwpSize = nr_N_BWP_size_DL[0];

    if(bwpSize === 1) return 16;
    else if(bwpSize === 2) return 32;
    else if(bwpSize < 6) return 64;
    else if(bwpSize < 11) return 128;
    else if(bwpSize < 22) return 256;
    else if(bwpSize < 43) return 512;
    else if(bwpSize < 86) return 1024;
    else if(bwpSize < 171) return 2048;
    else return 4096;
}

//Should be called when isLowPaprOptimisedPrecoding is set to true
function pdsch_mulByRotationMatrix(params_PDSCH,W,k,rank){
    const prg = Math.floor( k / 12 ); //k is first subcarrier within prg!

    if(rank < 3) return W; //no rotation matrix
    if(rank === 3){
        if(prg % 2 === 0) return W; //W' = W, no rotation matrix
        const R = new M([1,0,0, 0,1,0, 0,0,-1], [0,0,0, 0,0,0, 0,0,0],3,3);
        return W.mul(R); //W' = WR
    }
    else if(rank === 4){
        if(prg % 2 === 0) return W; //W' = W, no rotation matrix
        const R = new M([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], 4,4);
        return W.mul(R);
    }
}

function pdsch_getPrecodingMatrix_OL(params_PDSCH,k,forPTRS){ //9.3.7.5.4 (Open Loop transmission scheme) of 5G_L1_Entity_Level (Gates) 
    const rank = forPTRS ? params_PDSCH["ptrs_numOfPorts"] : params_PDSCH["rank"];

    if(params_PDSCH["openLoopScheme"] === "IdentityCodebook_247"){ //9.3.7.5.4.3 Precoding for DL OL transmission scheme with IdentityCodebook
        if(rank === 1) return new M([1,0,0,0],[0,0,0,0],4,1);
        else if(rank === 2) return new M([1,0,0,0, 0,1,0,0], [0,0,0,0, 0,0,0,0],4,2);
        else if(rank === 3){
            const W = new M([1,0,0,0, 0,1,0,0, 0,0,1,0], [0,0,0,0, 0,0,0,0, 0,0,0,0],4,3);
            return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
        }
        else if(rank === 4){
            const W = new M([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],4,4);
            return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
        }
    }

    if( params_PDSCH["numStreamIndex"] === 2 ){ //9.3.7.5.4.1 (Precoding for DL OL 2x2 transmission scheme)
        if(params_PDSCH["openLoopScheme"] === "NO_PRECODING_0"){ //9.3.7.5.4.1.2.1 (No precoding)
            // const rank = rank;
            return new M(t_OL_2X2_NoPrecoding[rank - 1][0],t_OL_2X2_NoPrecoding[rank - 1][1], 2, rank);
        }
        else if(params_PDSCH["openLoopScheme"] === "SCDD_1"){ //9.3.7.5.4.1.2.2 (Small Cyclic Delay Diversity)
            const N = pdsch_getNForOLPrecoding(k);
            const e = [Math.cos(-4 * Math.PI * k/N), Math.sin(-4 * Math.PI * k / N)] //e^(-j4PI*k/N)

            if(rank === 1) return new M([1, e[0]], [0, e[1]],2,1);
            else if(rank === 2) return new M([1 , e[0], 1 , -e[0]], [0, e[1] , 0 , -e[1]],2,2);
        }
        else if(params_PDSCH["openLoopScheme"] === "LCDD_2"){ //9.3.7.5.4.1.2.3 (Large Cyclic Delay Diversity)
            if(rank === 1) return new M([1,1],[0,0],2,1);
            else if(rank === 2){
                const e_k = [Math.cos(2 * Math.PI * k / 2), Math.sin(-2 * Math.PI * k / 2)]; //e^(-j2PI*k/2)
                const e_kplus1 = [Math.cos(2 * Math.PI * (k+1) / 2), Math.sin(- 2 * Math.PI * (k+1) / 2)];

                return new M(
                    mulArrByScal(1/Math.sqrt(2), [1, e_k[0], 1, e_kplus1[0]]),
                    mulArrByScal(1/Math.sqrt(2), [0, e_k[1], 0, e_kplus1[1]]),
                    2,2);
            }
        }
    }
    else if( params_PDSCH["numStreamIndex"] === 4){ // 9.3.7.5.4.2 (Precoding for DL OL 4x4 transmission scheme)
        if(params_PDSCH["openLoopScheme"] === "NO_PRECODING_0"){ //9.3.7.5.4.1.2.1 (No precoding)
            // const rank = params_PDSCH["rank"];
            if([0,4].includes(params_PDSCH["pdschPrecodingOption4x4"])){
                const W = new M(t_OL_4X4_NoPrecoding_NoPortSelection[rank - 1][0],t_OL_4X4_NoPrecoding_NoPortSelection[rank - 1][1], 4 , rank );
                return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
            }
            else{
                const W =  new M(t_OL_4X4_NoPrecoding_PortSelectionUpToRank2[rank - 1][0],t_OL_4X4_NoPrecoding_PortSelectionUpToRank2[rank - 1][1], 4 , rank );
                return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
            }           
        } //end No Precoding
        else if(params_PDSCH["openLoopScheme"] === "SCDD_1"){ //9.3.7.5.4.2.2.2 (Small Cyclic Delay Diversity)
            const N = pdsch_getNForOLPrecoding(k);
            const e2 = [Math.cos(-2 * Math.PI * k / N), Math.sin(-2 * Math.PI * k / N)];
            const e4 = [Math.cos(-4 * Math.PI * k / N), Math.sin(-4 * Math.PI * k / N)];
            const e6 = [Math.cos(-6 * Math.PI * k / N), Math.sin(-6 * Math.PI * k / N)];
            const e2_v2 = [Math.cos(-2 * Math.PI * (k / N + 1/4)), Math.sin(-2 * Math.PI * (k / N + 1/4))];
            const e6_v2 = [Math.cos(-6 * Math.PI * (k / N - 1/12)), Math.sin(-6 * Math.PI * (k / N - 1/12))];
            const e2_v3 = [Math.cos(-2 * Math.PI * (k / N + 1/4)), Math.sin(-2 * Math.PI * (k / N - 1/4))];
            const e6_v3 = [Math.cos(-6 * Math.PI * (k / N - 1/12)), Math.sin(-6 * Math.PI * (k / N + 1/12))];

            if([0,4].includes(params_PDSCH["pdschPrecodingOption4x4"]) || (![0,4].includes(params_PDSCH["pdschPrecodingOption4x4"]) && rank > 2)){     

                if(rank === 1){
                    const W = new M(
                        [1, e2[0], e4[0], e6[0]],
                        [0, e2[1], e4[1], e6[1]],
                        4,
                        1
                    );
                    return W; //No rotation mat for rank 1
                }
                else if(rank === 2){     
                    const W = new M(
                        mulArrByScal(1/Math.sqrt(2), [ 1,e2[0], e4[0], e6[0],   1,e2_v2[0],-e4[0],e6_v2[0]]),
                        mulArrByScal(1/Math.sqrt(2), [ 0,e2[1], e4[1], e6[1],   0,e2_v2[1],-e4[1],e6_v2[1]]),
                        4,
                        2
                    );                 
                    return W; //No rotation for rank 2
                }
                else if(rank === 3){
                    const W = new M(
                        mulArrByScal(1/Math.sqrt(3), [ 1,e2[0], e4[0], e6[0],   1,e2_v2[0],-e4[0],e6_v2[0],  1,-e2[0],e4[0],-e6[0]]),
                        mulArrByScal(1/Math.sqrt(3), [ 0,e2[1], e4[1], e6[1],   0,e2_v2[1],-e4[1],e6_v2[1],  0,-e2[1],e4[1],-e6[1]]),
                        4,
                        3
                    );
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
                }
                else if(rank === 4){
                    const W = new M(
                        mulArrByScal(1/2, [ 1,e2[0], e4[0], e6[0],   1,e2_v2[0],-e4[0],e6_v2[0],  1,-e2[0],e4[0],-e6[0], 1,e2_v3[0],-e4[0],e6_v3[0]]),
                        mulArrByScal(1/2, [ 0,e2[1], e4[1], e6[1],   0,e2_v2[1],-e4[1],e6_v2[1],  0,-e2[1],e4[1],-e6[1], 0,e2_v3[1],-e4[1],e6_v3[1]]),
                        4,
                        4
                    );
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
                }
            }
            else{ //[1,2,5,6].includes(params_PDSCH["pdschPrecodingOption4x4"])
                if(rank === 1){
                    const W = new M(
                        [1, 0, e4[0], 0],
                        [0, 0, e4[1], 0],
                        4,
                        1
                    );
                    return W; //No rotation mat for rank 1
                }
                else if(rank === 2){
                    const W = new M(
                        mulArrByScal(1/Math.sqrt(2), [ 1,0, e4[0], 0,   1,0,-e4[0],0]),
                        mulArrByScal(1/Math.sqrt(2), [ 0,0, e4[1], 0,   0,0,-e4[1],0]),
                        4,
                        2
                    );                 
                    return W; //No rotation for rank 2
                }
            }
        } //end SCDD
        else if(params_PDSCH["openLoopScheme"] === "LCDD_2"){ //9.3.7.5.4.2.2.3 (Large Cyclic Delay Diversity)

            if([0,4].includes(params_PDSCH["pdschPrecodingOption4x4"]) || (![0,4].includes(params_PDSCH["pdschPrecodingOption4x4"]) && rank > 2)){
                
                if(rank === 1) return new M([1,1,1,1],[0,0,0,0], 4,1);
                else if(rank === 2){
                    const e_k = [Math.cos(2 * Math.PI * k / 2), Math.sin(-2 * Math.PI * k / 2)]; //e^(-j2PI*k/2)
                    const e_kplus1 = [Math.cos(2 * Math.PI * (k+1) / 2), Math.sin(-2 * Math.PI * (k+1) / 2)];                    
                    
                    return new M(
                        mulArrByScal(1/2, [1 + e_k[0],1 + e_k[0],1 - e_k[0],1 - e_k[0],   1 + e_kplus1[0],1 + e_kplus1[0],1 - e_kplus1[0],1 - e_kplus1[0]]),
                        mulArrByScal(1/2, [0 + e_k[1],0 + e_k[1],0 - e_k[1],0 - e_k[1],   0 + e_kplus1[1],0 + e_kplus1[1],0 - e_kplus1[1],0 - e_kplus1[1]]),
                        4,
                        2
                    )
                }
                else if(rank === 3){
                    const e_2_k = [Math.cos(2 * Math.PI * k / 3), Math.sin(-2 * Math.PI * k / 3)];
                    const e_4_k = [Math.cos(4 * Math.PI * k / 3), Math.sin(-4 * Math.PI * k / 3)];
                    const e_2_kplus1 = [Math.cos(2 * Math.PI * (k+1) / 3), Math.sin(-2 * Math.PI * (k+1) / 3)];
                    const e_4_kplus1 = [Math.cos(4 * Math.PI * (k+1) / 3), Math.sin(-4 * Math.PI * (k+1) / 3)];
                    const e_2_kplus2 = [Math.cos(2 * Math.PI * (k+2) / 3), Math.sin(-2 * Math.PI * (k+2) / 3)];
                    const e_4_kplus2 = [Math.cos(4 * Math.PI * (k+2) / 3), Math.sin(-4 * Math.PI * (k+2) / 3)];

                    const W =  new M(
                        mulArrByScal(1/3,
                             [1+e_2_k[0]+e_4_k[0], 1-e_2_k[0]+e_4_k[0], 1+e_2_k[0]-e_4_k[0], 1-e_2_k[0]-e_4_k[0],  
                              1+e_2_kplus1[0]+e_4_kplus1[0], 1-e_2_kplus1[0]+e_4_kplus1[0], 1+e_2_kplus1[0]-e_4_kplus1[0], 1-e_2_kplus1[0]-e_4_kplus1[0],
                              1+e_2_kplus2[0]+e_4_kplus2[0], 1-e_2_kplus2[0]+e_4_kplus2[0], 1+e_2_kplus2[0]-e_4_kplus2[0], 1-e_2_kplus2[0]-e_4_kplus2[0]]),
                        mulArrByScal(1/3,
                            [0+e_2_k[1]+e_4_k[1], 0-e_2_k[1]+e_4_k[1], 0+e_2_k[1]-e_4_k[1], 0-e_2_k[1]-e_4_k[1],  
                             0+e_2_kplus1[1]+e_4_kplus1[1], 0-e_2_kplus1[1]+e_4_kplus1[1], 0+e_2_kplus1[1]-e_4_kplus1[1], 0-e_2_kplus1[1]-e_4_kplus1[1],
                             0+e_2_kplus2[1]+e_4_kplus2[1], 0-e_2_kplus2[1]+e_4_kplus2[1], 0+e_2_kplus2[1]-e_4_kplus2[1], 0-e_2_kplus2[1]-e_4_kplus2[1]]),
                        4,
                        3                    
                    );
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;
                }
                else if(rank === 4){
                    const e_2_k = [Math.cos(2 * Math.PI * k / 4), Math.sin(-2 * Math.PI * k / 4)];
                    const e_4_k = [Math.cos(4 * Math.PI * k / 4), Math.sin(-4 * Math.PI * k / 4)];
                    const e_6_k = [Math.cos(6 * Math.PI * k / 4), Math.sin(-6 * Math.PI * k / 4)];
                    const e_2_kplus1 = [Math.cos(2 * Math.PI * (k+1) / 4), Math.sin(-2 * Math.PI * (k+1) / 4)];
                    const e_4_kplus1 = [Math.cos(4 * Math.PI * (k+1) / 4), Math.sin(-4 * Math.PI * (k+1) / 4)];
                    const e_6_kplus1 = [Math.cos(6 * Math.PI * (k+1) / 4), Math.sin(-6 * Math.PI * (k+1) / 4)];
                    const e_2_kplus2 = [Math.cos(2 * Math.PI * (k+2) / 4), Math.sin(-2 * Math.PI * (k+2) / 4)];
                    const e_4_kplus2 = [Math.cos(4 * Math.PI * (k+2) / 4), Math.sin(-4 * Math.PI * (k+2) / 4)];
                    const e_6_kplus2 = [Math.cos(6 * Math.PI * (k+2) / 4), Math.sin(-6 * Math.PI * (k+2) / 4)];
                    const e_2_kplus3 = [Math.cos(2 * Math.PI * (k+3) / 4), Math.sin(-2 * Math.PI * (k+3) / 4)];
                    const e_4_kplus3 = [Math.cos(4 * Math.PI * (k+3) / 4), Math.sin(-4 * Math.PI * (k+3) / 4)];
                    const e_6_kplus3 = [Math.cos(6 * Math.PI * (k+3) / 4), Math.sin(-6 * Math.PI * (k+3) / 4)];

                    const W = new M(
                        mulArrByScal(1/4,
                            [1+e_2_k[0]+e_4_k[0]+e_6_k[0],  1-e_2_k[0]+e_4_k[0]-e_6_k[0],  1+e_2_k[0]-e_4_k[0]-e_6_k[0],   1-e_2_k[0]-e_4_k[0]+e_6_k[0],
                            1+e_2_kplus1[0]+e_4_kplus1[0]+e_6_kplus1[0], 1-e_2_kplus1[0]+e_4_kplus1[0]-e_6_kplus1[0], 1+e_2_kplus1[0]-e_4_kplus1[0]-e_6_kplus1[0], 1-e_2_kplus1[0]-e_4_kplus1[0]+e_6_kplus1[0],
                            1+e_2_kplus2[0]+e_4_kplus2[0]+e_6_kplus2[0], 1-e_2_kplus2[0]+e_4_kplus2[0]-e_6_kplus2[0], 1+e_2_kplus2[0]-e_4_kplus2[0]-e_6_kplus2[0], 1-e_2_kplus2[0]-e_4_kplus2[0]+e_6_kplus2[0],
                            1+e_2_kplus3[0]+e_4_kplus3[0]+e_6_kplus3[0], 1-e_2_kplus3[0]+e_4_kplus3[0]-e_6_kplus3[0], 1+e_2_kplus3[0]-e_4_kplus3[0]-e_6_kplus3[0], 1-e_2_kplus3[0]-e_4_kplus3[0]+e_6_kplus3[0]]),
                        mulArrByScal(1/4,
                            [0+e_2_k[1]+e_4_k[1]+e_6_k[1],  0-e_2_k[1]+e_4_k[1]-e_6_k[1],  0+e_2_k[1]-e_4_k[1]-e_6_k[1],   0-e_2_k[1]-e_4_k[1]+e_6_k[1],
                            0+e_2_kplus1[1]+e_4_kplus1[1]+e_6_kplus1[1], 0-e_2_kplus1[1]+e_4_kplus1[1]-e_6_kplus1[1], 0+e_2_kplus1[1]-e_4_kplus1[1]-e_6_kplus1[1], 0-e_2_kplus1[1]-e_4_kplus1[1]+e_6_kplus1[1],
                            0+e_2_kplus2[1]+e_4_kplus2[1]+e_6_kplus2[1], 0-e_2_kplus2[1]+e_4_kplus2[1]-e_6_kplus2[1], 0+e_2_kplus2[1]-e_4_kplus2[1]-e_6_kplus2[1], 0-e_2_kplus2[1]-e_4_kplus2[1]+e_6_kplus2[1],
                            0+e_2_kplus3[1]+e_4_kplus3[1]+e_6_kplus3[1], 0-e_2_kplus3[1]+e_4_kplus3[1]-e_6_kplus3[1], 0+e_2_kplus3[1]-e_4_kplus3[1]-e_6_kplus3[1], 0-e_2_kplus3[1]-e_4_kplus3[1]+e_6_kplus3[1]]),
                        4,
                        4
                    ); 
                    return params_PDSCH["isLowPaprOptimizedPrecoding"] ?  pdsch_mulByRotationMatrix(params_PDSCH,W,k) : W;                   
                }
            }
            else{ ////[1,2,5,6].includes(params_PDSCH["pdschPrecodingOption4x4"])
                if(rank === 1) return new M([1,0,1,0],[0,0,0,0], 4,1);
                else if(rank === 2){
                    const e_k = [Math.cos(2 * Math.PI * k / 2), Math.sin(-2 * Math.PI * k / 2)]; //e^(-j2PI*k/2)
                    const e_kplus1 = [Math.cos(2 * Math.PI * (k+1) / 2), Math.sin(-2 * Math.PI * (k+1) / 2)];                    
                    
                    return new M(
                        mulArrByScal(1/2, [1 + e_k[0],0,1 - e_k[0],0,   1 + e_kplus1[0],0,1 - e_kplus1[0],0]),
                        mulArrByScal(1/2, [0 + e_k[1],0,0 - e_k[1],0,   0 + e_kplus1[1],0,0 - e_kplus1[1],0]),
                        4,
                        2
                    )
                }
            }
        }//end LCDD
        else if(params_PDSCH["openLoopScheme"] === "EnhCtrlChannelTransPrecoding_3"){ // 9.3.7.5.4.2.2.4 2 TX cell specific precoding matrix OL 4x4
            if(rank === 1){
                return new M(
                    mulArrByScal(1/2, [1,0,1,0]),
                    mulArrByScal(1/2, [0,0,0,0]),
                    4,
                    1
                );
            }
        }
    }//end OL4X4
}

//Returns the precoding matrix "W" for spatial multiplexing. k is subcarrier index, uses params from the //'Precoding Params'section of params_PDSCH
function pdsch_getPrecodingMatrix(params_PDSCH,k,forPTRS = false){
    if(params_PDSCH["spatialMode"] === "SINGLE_ANTENNA") return new M([1],[0],1,1);
    else if(params_PDSCH["spatialMode"] === "TX_DIVERSITY") return null; //Not yet supported
    else if(params_PDSCH["spatialMode"] === "CL_SPATIAL_MUX"){ //CLOSED LOOP       
        return pdsch_getPrecodingMatrix_CL(params_PDSCH,forPTRS);
    }
    else if(params_PDSCH["spatialMode"] === "OL_SPATIAL_MUX"){ //OPEN LOOP
       return pdsch_getPrecodingMatrix_OL(params_PDSCH,k,forPTRS);
    }

}

const pdsch_closedLoop3gppCodebookEnum = {
    0 : "2portTypeICodebook_0",
    1 : "4portTypeICodebook_1",
    2: "8portTypeICodebook_2",
    3: "EnhCtrlChannelTransPrecoding_3",
    254: "IdentityCodebook_254",
    255: "Invalid_255",

}

const pdsch_OpenLoopSchemeEnum = {
    0 : "NO_PRECODING_0",
    1 : "SCDD_1",
    2 : "LCDD_2",
    3 : "EnhCtrlChannelTransPrecoding_3",
    247 : "IdentityCodebook_247",
    255 : "INVALID_255",
}

//(u,antId,sf,slot) or (subcell,sfn) might be used to specify target slot
function pdsch_GetParametersArr(u,antId,sf,bba_slot,PDSCH,l2l1_packets,subcell,sfn,l2l1_slot){ //Based on 7.4.1.1 of 38.211-i30
    const l2l1_data_arr = nr_get_l2l1_data_from_packets(PDSCH,sf,bba_slot,u,antId,l2l1_packets,false,subcell,sfn,l2l1_slot); //This returns L2L1 params
    if(!l2l1_data_arr) return null;

    const pdsch_data_arr = nr_get_l2l1_data_from_packets(PDSCH,sf,bba_slot,u,antId,l2l1_packets,true,subcell,sfn,l2l1_slot); //This returns payload within this slot
    // const pdsch_data = pdsch_data_arr && pdsch_data_arr.length > 0 ? nr_GetParametersFromParametersArr() : null; 

    let params_PDSCH_arr = new Array(l2l1_data_arr.length).fill(null);
    for(let i = 0; i < l2l1_data_arr.length; i++){ //There might be multiple grants
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;
        const pdsch_data = nr_GetParametersFromParametersArr(pdsch_data_arr,null,null,l2l1_data.rnti);

        let params_PDSCH = {
            //Allocation params
            "pdsch_StartSymbol" : l2l1_data.startSymbol,
            "pdsch_NumOfSymbols" : l2l1_data.numOfPdschSymbols,
            "startPrb": l2l1_data.startPrb, 
            'numOfPrb': l2l1_data.numOfPrb, 
            "rbgSize" : l2l1_data.rbgSize, //Denoted as P in 38214 (5.1.2.2.1)
            "firstRbgSize" : l2l1_data.rbgSizeFirst,
            "resAllocType0Bitmap" : l2l1_data.rat0Bitmap,

            //Precoding params
            "codebookIndex" : l2l1_data.codebookIndex, //Applicable only for 2 antPorts, ignored when spatialMode==OL_SPA TX_DIVERSITYTIAL_MUX
            "spatialMode" : ["SINGLE_ANTENNA", "TX_DIVERSITY", "CL_SPATIAL_MUX", "OL_SPATIAL_MUX"][l2l1_data.spatialMode],
            "rank" : l2l1_data.numOfLayers, //“numOfLayers” in the DlData_PdschSendReq message: indicates the rank (5G_L1_7908)
            "numStreamIndex" : l2l1_data.numStreamIndex !== undefined ? l2l1_data.numStreamIndex : l2l1_data.numCeAxCIndex, //Number of Phys antennas (eAxC)
            "streamIndex" : l2l1_data.streamIndex !== undefined ? l2l1_data.streamIndex : l2l1_data.ceAxCIndex, //Order of phys antennas (eAxC)
            "openLoopScheme" : pdsch_OpenLoopSchemeEnum[l2l1_data.openLoopScheme], //Type of OL scheme, used only when spatialMode==OL_SPA TX_DIVERSITYTIAL_MUX
            "closedLoop3gppCodebook": l2l1_data.closedLoop3gppCodebook !== undefined ? pdsch_closedLoop3gppCodebookEnum[l2l1_data.closedLoop3gppCodebook] : pdsch_closedLoop3gppCodebookEnum[255],
            "pdschBundleSize" : l2l1_data.pdschBundleSize, //Range in Prbs where same precoding matrix is used,aplicable only when spatialMode==OL_SPA TX_DIVERSITYTIAL_MUX

            "pdschPrecodingOption4x4" : l2l1_data.pdschPrecodingOption4x4, //pdsch_PrecodingOption4x4Enum[
            "i2Codebook4AntPorts" : l2l1_data.i2Codebook4AntPorts,
            "i1Codebook4AntPorts" : l2l1_data.i1Codebook4AntPorts,
            "isLowPaprOptimizedPrecoding" : l2l1_data.isLowPaprOptimizedPrecoding !== undefined ? l2l1_data.isLowPaprOptimizedPrecoding : false,

            //Other params
            "Mcs" : l2l1_data.mcs,
            "RedundancyVersion" : l2l1_data.rvIndex.toString(2).padStart(2,"0"),
            "rachStatus" : l2l1_data.rachStatus,

            //DMRS RELATED 
            "dmrs_MappingType" : l2l1_data.dlDmrsMappingType,
            "dmrs_ConfigType" : l2l1_data.dlDmrsConfigType,
            "dmrs_TypeAPos":  l2l1_data.dlDmrsTypeAPos,
            "dmrs_AdditionalPos": l2l1_data.dlDmrsAddPos,
            "dmrs_MaxLen" : l2l1_data.dlDmrsLen,
            "dmrs_AntPortBitmap" : l2l1_data.antPort.toString(2).padStart(16,"0"),
            "n_scid": l2l1_data.nscId !== undefined ? l2l1_data.nscId : 0,
            "N_ID" : l2l1_data.dmrsScramblingSequenceInt,
            "n_rnti": l2l1_data.rnti,
            "re_ref_dmrs": l2l1_data.offsetRbDmrs,
            "numOfCdmGroupsWithoutData" : l2l1_data.numOfDmrsCdmGroupWithoutData,

            //PTRS RELATED
            "ptrs_present" : l2l1_data.dlPtrsFlag,
            "ptrs_FreqDensity" : l2l1_data.dlPtrsFrequencyDensity,
            "ptrs_TimeDensity" : l2l1_data.dlPtrsTimeDensity,
            "ptrs_ReOffset" : l2l1_data.dlPtrsResElemOffset,
            "re_ref_ptrs" : 12*l2l1_data.startPrb, //ptrs is relative to start of alloc
            "sym_ref_ptrs" : l2l1_data.startSymbol, //ptrs is relative to start of alloc
            "ptrs_numOfPorts" : l2l1_data.dlPtrsNumOfPorts ? l2l1_data.dlPtrsNumOfPorts : 1, //[1,4], not always present

            "epre_ratio" : 0, //0 if not provided (4.1 of 38.214 )
            "rnti" : pdsch_data ? pdsch_data["rnti"] : null, //Its this same as n_rnti so those fields could be combined
            "payload" : pdsch_data ? pdsch_data["payload"] : null,

            //PARAMS THAT ARE CALCULATED FROM THE ONES ABOVE
            "pdsch_duration" : -1, //depends on mapping type, pdsch_StartSymbol and pdsch_NumOfSymbols 
            "sc_increment": -1, //every sc_increment subcarriers PDSCH-DMRS is marked        
            "dmrs_AntPorts": [], //Array holding actual ports based on dmrs_AntPortBitmap, this field is set in pdsch_SetAntennaPortsRelatedParams
            "dciField_AntennaPorts" : "", //Bitmap exact like AntPorts field in dci 1_1 should look like
            "dciField_freqDomainResAssignment" : "", //Bitmap exact like Frequency Domain Resource Assignment in dci 1_1 should look like. (Ignore for 1_0)
            "delta": [], //corresponds to antPorts
            "lambda" : [], //corresponds to antPorts
            "l0" : -1,
            "l1" : 11,
            "dmrs_sym_positions": [],  //possible values of l_bar. They are relative to true symbols based on sym_ref_dmrs
            "sym_ref_dmrs" : -1, //dmrs relativity is based on mapping type
            "k_ref_RB" : -1,
            "k_ref_RE" : [], //corresponds to antPorts
            // "W" : null, //precoding matrix, set by pdsch_SetPrecodingMatrix()

            //POWER RELATED
            "beta_pdsch" : 10**(l2l1_data.pdschTbTransmitPower/200),
            "beta_dmrs" : -1,
            "beta_pdsch_dmrs" : -1,
            "rho_ptrs" : -1,
            "beta_ptrs" : 1,
        }

        params_PDSCH["beta_dmrs"] = t38_214_4_1_1[ params_PDSCH["numOfCdmGroupsWithoutData"] ][params_PDSCH["dmrs_ConfigType"]]; //38.214 Power Alloc
        params_PDSCH["beta_pdsch_dmrs"] = params_PDSCH["beta_pdsch"] * 10**(-params_PDSCH["beta_dmrs"]/20);

        params_PDSCH["rho_ptrs"] = t38_214_4_1_2[ params_PDSCH["epre_ratio"] ][ params_PDSCH["rank"]];
        params_PDSCH["beta_ptrs"] = params_PDSCH["beta_pdsch"] * 10**( params_PDSCH["rho_ptrs"]/20 );

        if(params_PDSCH["numOfPrb"] % params_PDSCH["ptrs_FreqDensity"] === 0) params_PDSCH["k_ref_RB"] = params_PDSCH["n_rnti"] % params_PDSCH["ptrs_FreqDensity"];
        else params_PDSCH["k_ref_RB"] =  params_PDSCH["n_rnti"] % (params_PDSCH["numOfPrb"] % params_PDSCH["ptrs_FreqDensity"] );   

        if(params_PDSCH["dmrs_MappingType"] === 0){ //'A'
            params_PDSCH["pdsch_duration"] = params_PDSCH["pdsch_StartSymbol"] + params_PDSCH["pdsch_NumOfSymbols"];
            params_PDSCH["l0"] = params_PDSCH["dmrs_TypeAPos"];
            params_PDSCH["sym_ref_dmrs"] = 0;
        }
        else{ //'B'
            params_PDSCH["pdsch_duration"]  = params_PDSCH["pdsch_NumOfSymbols"];
            params_PDSCH["l0"] = 0;
            params_PDSCH["sym_ref_dmrs"] = params_PDSCH["pdsch_StartSymbol"];
        }

        //Antports Bitmap to array
        for(let i = 0; i < 16; i++){
            if(params_PDSCH["dmrs_AntPortBitmap"][i] === "1"){
                params_PDSCH["dmrs_AntPorts"].push( i );
            }
        }

        if(params_PDSCH["dmrs_ConfigType"] === 1){
            for(let j = 0; j < params_PDSCH["dmrs_AntPorts"].length; j++){
                params_PDSCH["delta"].push( t38_211_7_4_1_1_2_1[ params_PDSCH["dmrs_AntPorts"][j] ]["delta"] );
                params_PDSCH["lambda"].push( t38_211_7_4_1_1_2_1[ params_PDSCH["dmrs_AntPorts"][j] ]["cdm"] );
            }
            params_PDSCH["sc_increment"] = 2;
        }
        else{
            for(let j = 0; j < params_PDSCH["dmrs_AntPorts"].length; j++){
                params_PDSCH["delta"].push( t38_211_7_4_1_1_2_2[ params_PDSCH["dmrs_AntPorts"][j] ]["delta"] );
                params_PDSCH["lambda"].push( t38_211_7_4_1_1_2_2[ params_PDSCH["dmrs_AntPorts"][j] ]["cdm"] );
            }
            params_PDSCH["sc_increment"] = 6;
        }

        const table_offset = params_PDSCH["dmrs_MappingType"] === 0 ? 0 : 4; 
        if(params_PDSCH["dmrs_MaxLen"] === 1) params_PDSCH["dmrs_sym_positions"] = [ ...t38_211_7_4_1_1_2_3[ params_PDSCH["pdsch_duration"] ][table_offset + params_PDSCH["dmrs_AdditionalPos"]] ];
        else params_PDSCH["dmrs_sym_positions"] = [ ...t38_211_7_4_1_1_2_4[ params_PDSCH["pdsch_duration"] ][table_offset + params_PDSCH["dmrs_AdditionalPos"]] ];

        if(params_PDSCH["ptrs_present"]){
            for(let j = 0; j < params_PDSCH["dmrs_AntPorts"].length; j++){
                params_PDSCH["k_ref_RE"].push( t38_211_7_4_1_2_2_1[ params_PDSCH["dmrs_AntPorts"][j] ][table_offset + params_PDSCH["ptrs_ReOffset"]] );
            }
        }

        if(params_PDSCH["dmrs_sym_positions"][0] === "l0") params_PDSCH["dmrs_sym_positions"][0] = params_PDSCH["l0"];
        if(params_PDSCH["dmrs_sym_positions"][0] === "l1") params_PDSCH["dmrs_sym_positions"][0] = params_PDSCH["l1"];

        if(subcell == undefined || subcell == null || subcell == -1) subcell = nr_get_subcell_from_antenna(u,antId);

        [_,params_PDSCH["dciField_freqDomainResAssignment"] ] = dci_getFreqDomainResAssignmentFieldAndSize(params_PDSCH["resAllocType0Bitmap"] != 0 ? "resourceAllocationType0" : "resourceAllocationType1",
            params_PDSCH["startPrb"],params_PDSCH["numOfPrb"],nr_N_BWP_size_DL[subcell],nr_N_BWP_start_DL[subcell],params_PDSCH["rbgSize"],params_PDSCH["resAllocType0Bitmap"],false);

        [_,params_PDSCH["dciField_AntennaPorts"]] = dci_1_1_getAntennaPortsFieldAndSize(params_PDSCH["dmrs_ConfigType"],params_PDSCH["dmrs_MaxLen"],
            params_PDSCH["numOfCdmGroupsWithoutData"], params_PDSCH["dmrs_AntPorts"]);

        params_PDSCH_arr[i] = params_PDSCH;
    }

    return params_PDSCH_arr;
}

function decode_RAR_PDSCH(bits){
    let decoded_PDU = {}, offset = 0;

    let i = 0;
    while(true){
        let decoded_subPDU = {};

        //6.2.2 of 38321, MAC subheader for Random Access Response
        let decoded_subheader = {};
        [decoded_subheader["E"],offset] = parseStringBitsToVal(bits,offset,1);
        [decoded_subheader["T"],offset] = parseStringBitsToVal(bits,offset,1);
        if(decoded_subheader["T"] === 0){
            decoded_subheader["R"] = parseStringBitsToVal(bits,offset,2);
            decoded_subheader["BI"] = parseStringBitsToVal(bits,offset,4);

            const enum_BI = [5,10,20,30,40,60,80,120,160,240,320,480,960,1920,-1,-1];
            decoded_subheader["BI"] = enum_BI[decoded_subheader["BI"]];
        } 
        else [decoded_subheader["RAPID"],offset] = parseStringBitsToVal(bits,offset,6)
        decoded_subPDU["subheader"] = decoded_subheader;

        //6.2.3 of 38321, MAC payload for Random Access Response
        let decoded_payload= {};
        [decoded_payload["R"],offset] = parseStringBitsToVal(bits,offset,1);
        [decoded_payload["TAC"],offset] = parseStringBitsToVal(bits,offset,12);
        
        let decoded_grant = {};
        [decoded_grant["FreqHopping"],offset] = parseStringBitsToVal(bits,offset,1);
        [decoded_grant["Msg3PUSCH_FreqResAlloc"],offset] = getStringBits(bits,offset,14);
        [decoded_grant["Msg3PUSCH_TimeResAlloc"],offset] = getStringBits(bits,offset,4);
        [decoded_grant["Mcs"],offset] = parseStringBitsToVal(bits,offset,4);
        [decoded_grant["TPC_CmdForMsg3PUSCH"],offset] = parseStringBitsToVal(bits,offset,3);
        [decoded_grant["CsiRequest"],offset] = parseStringBitsToVal(bits,offset,1);
        decoded_payload["ULGrant"] = decoded_grant;
    
        [decoded_payload["TC_RNTI"],offset] = parseStringBitsToVal(bits,offset,16);
        decoded_subPDU["payload"] = decoded_payload;

        decoded_PDU["subPDU#" + i] = decoded_subPDU;
        if(decoded_subheader["E"] === 0) break;
        i+=1;
    }  

    return decoded_PDU;
}


//6 of 38321 Protocol Data Units, formats and parameter
//This function can't be used for transparent MAC messages (those with SIB1) and MSG2 message (rachStatus = 2) !
function decode_MAC_PDU(bits){
    let decoded_PDU = {}, offset = 0;

    let i = 0;
    while(true){
        if(offset >= bits.length) break;
        let decoded_subPDU = {}, decoded_subheader = {}, decoded_payload = {};

        [decoded_subheader["R"],offset ] = parseStringBitsToVal(bits,offset,1);
        [decoded_subheader["F"],offset ] = parseStringBitsToVal(bits,offset,1);
        [decoded_subheader["LCID"],offset] = parseStringBitsToVal(bits,offset,6);
        
        if(![62].includes(decoded_subheader["LCID"])){
            [decoded_subheader["L"],offset] = parseStringBitsToVal(bits,offset,8 * (decoded_subheader["F"]+1));
        }

        if(decoded_subheader["LCID"] === 0){ //CCCH
            [decoded_payload["CCCH"],offset] = decode_DL_CCCH_Message(bits,offset);
        }
        // else if(decoded_subheader["LCID"] === 4){
        //     [decoded_payload["DCCH_Message"],offset] = getStringBitsHEX(bits,offset, 8 * decoded_subheader["L"]);
        // }
        else if(decoded_subheader["LCID"] < 33){
            [decoded_payload["L3_Msg"],offset] = getStringBitsHEX(bits,offset, 8 * decoded_subheader["L"]);
        }
        else if(decoded_subheader["LCID"] === 62){
            [decoded_payload["UE_Contention_Resolution_Identity"],offset] = getStringBits(bits,offset,48);
            decoded_subheader["R"] = decoded_subheader["R"]*2 + decoded_subheader["F"];
            delete decoded_subheader["F"];
        }
        else if(decoded_subheader["LCID"] === 63) [decoded_payload["Padding"],offset] = getStringBits(bits,offset,bits.length - offset);
        else [decoded_payload["Reserved"],offset] = getStringBits(bits,offset,8 * decoded_subheader["L"]); 

        decoded_subPDU["subheader"] = decoded_subheader;
        decoded_subPDU["payload"] = decoded_payload;
        decoded_PDU["subPDU#" + i] = decoded_subPDU;
        i+=1;
    }

    return decoded_PDU;
}