function pdcch_interleaverFunction(params_PDCCH,x){ //f function from 7.3.2.2 of 38.211
    if(params_PDCCH["cceRegMappingType"] === 1) return x; //No interleaving

    const r = x % params_PDCCH["R"];
    const c = Math.floor( x / params_PDCCH["R"] );
    const C = params_PDCCH["numOfPrb"] / (params_PDCCH["L"]*params_PDCCH["R"]);
    if(Math.floor(C) !== C) console.log("Error: C is not integer value");
    
    return (r*C + c + params_PDCCH["nShiftModNumOfRegBundles"]) % (params_PDCCH["numOfPrb"] / params_PDCCH["L"]);
}

function pdcch_getPrecodingMatrix(params_PDCCH,k){
    const numOfTX = params_PDCCH["numCeAxCIndex"]; //This might be incorrect as numCe.. might show 2 while 4 antennas are configured

    if(numOfTX === 1) return new M([1],[0],1,1);
    else if(numOfTX === 2){
        return new M([1,1],[0,0],2,1);
        // if(params_PDCCH["polarizationSelection"] === 0) return new M([1,0],[0,0],2,1);
        // else if( params_PDCCH["polarizationSelection"] === 1 ) return new M([0,1],[0,0],2,1);
        // else if( params_PDCCH["polarizationSelection"] === 2 ) return new M([1,1],[0,0],2,1);
    }
    else if(numOfTX === 4){
        if( params_PDCCH["pdcchPrecodingOption4x4"] === 0) return new M([1,1,1,1],[0,0,0,0],4,1);
        else if( params_PDCCH["pdcchPrecodingOption4x4"] === 1 ){
            const N = pdsch_getNForOLPrecoding(); //same function as for pdsch

            const e2 = [Math.cos(-2 * Math.PI * k / N), Math.sin(-2 * Math.PI * k / N)];
            const e4 = [Math.cos(-4 * Math.PI * k / N), Math.sin(-4 * Math.PI * k / N)];
            const e6 = [Math.cos(-6 * Math.PI * k / N), Math.sin(-6 * Math.PI * k / N)];

            return new M([1,e2[0],e4[0],e6[0]] , [0,e2[1],e4[1],e6[1]], 4,1);
        }
        else if( params_PDCCH["pdcchPrecodingOption4x4"] === 2 ) return new M([1,0,1,0],[0,0,0,0],4,1);
        else if( params_PDCCH["pdcchPrecodingOption4x4"] === 3 ) return new M([0,1,0,1],[0,0,0,0],4,1);
        else if( params_PDCCH["pdcchPrecodingOption4x4"] === 4){ //UE specific matrix
            const phi_values = [[1,0], [0,1], [-1,0], [0,-1]];
            const phi = phi_values[params_PDCCH["i2Codebook4AntPorts"]]; //complex number [real,img]
            const i1_1 = params_PDSCH["i1Codebook4AntPorts"][0];
            const alpha = i1_1 + 4;


            const e1 = [Math.cos( i1_1*Math.PI / 4), Math.sin( i1_1*Math.PI / 4)];
            const e2 = [Math.cos( alpha*Math.PI / 4), Math.sin( alpha*Math.PI / 4)];            
            const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

            if(params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 0) return new M([1,e1[0], phi[0], phi_mul_e1[0]] , [0,e1[1],phi[1],phi_mul_e1[1]], 4,1);
            else if( params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 1 ) return new M([1,e2[0], phi[0], phi_mul_e2[0]] , [0,e2[1],phi[1],phi_mul_e2[1]], 4,1);
            else if( params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 2 ) return new M([1,e1[0], -phi[0], -phi_mul_e1[0]] , [0,e1[1],-phi[1],-phi_mul_e1[1]], 4,1);
            else if( params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 3 ) return new M([1,e2[0], -phi[0], -phi_mul_e2[0]] , [0,e2[1],-phi[1],-phi_mul_e2[1]], 4,1);
        }
    }
    return null;
}

//Matrix to undo precoding of PDCCH iq
function pdcch_getPrecodingReversalMatrix(params_PDCCH,k,matrixRowToReverse){   
    if( params_PDCCH["pdcchPrecodingOption4x4"] === 1 ){
        const N = pdsch_getNForOLPrecoding(); //same function as for pdsch

        if(matrixRowToReverse === 0) return new M( [1], [0],1,1);
        else if(matrixRowToReverse === 1) return new M( [Math.cos(2 * Math.PI * k / N)], [Math.sin(2 * Math.PI * k / N)],1,1);
        else if(matrixRowToReverse === 2) return new M( [Math.cos(4 * Math.PI * k / N)], [Math.sin(4 * Math.PI * k / N)],1,1);
        else if(matrixRowToReverse === 3) return new M( [Math.cos(6 * Math.PI * k / N)], [Math.sin(6 * Math.PI * k / N)],1,1);
    }
    else if( params_PDCCH["pdcchPrecodingOption4x4"] === 4){ //UE specific matrix (TODO)
        const phi_values = [[1,0], [0,1], [-1,0], [0,-1]];
        const phi = phi_values[params_PDCCH["i2Codebook4AntPorts"]]; //complex number [real,img]
        const i1_1 = params_PDSCH["i1Codebook4AntPorts"][0];
        const alpha = i1_1 + 4;

        const e1 = [Math.cos( -i1_1*Math.PI / 4), Math.sin( -i1_1*Math.PI / 4)];
        const e2 = [Math.cos( -alpha*Math.PI / 4), Math.sin( -alpha*Math.PI / 4)];
        const phi_mul_e1 = mulComplexNumbers(phi,e1), phi_mul_e2 = mulComplexNumbers(phi, e2);

        if(matrixRowToReverse === 0) return new M( [1], [0],1,1);
        else if(params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 0){
            if(matrixRowToReverse === 1) return new M([e1[0]],[e1[1]],1,1);
            else if(matrixRowToReverse === 2) return new M([phi[0]], [phi[1]],1,1);
            else if(matrixRowToReverse === 3) return new M([phi_mul_e1[0]], [phi_mul_e1[1]],1,1);

        }
        else if(params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 1){
            if(matrixRowToReverse === 1) return new M([e2[0]],[e2[1]],1,1);
            else if(matrixRowToReverse === 2) return new M([phi[0]], [phi[1]],1,1);
            else if(matrixRowToReverse === 3) return new M([phi_mul_e2[0]], [phi_mul_e2[1]],1,1);
        }
        else if(params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 2){
            if(matrixRowToReverse === 1) return new M([e1[0]],[e1[1]],1,1);
            else if(matrixRowToReverse === 2) return new M([phi[0]], [phi[1]],1,1);
            else if(matrixRowToReverse === 3) return new M([-phi_mul_e1[0]], [-phi_mul_e1[1]],1,1);
        }
        else if(params_PDCCH["columnIndexOfEnhPrecodingMatrix"] === 3){
            if(matrixRowToReverse === 1) return new M([e2[0]],[e2[1]],1,1);
            else if(matrixRowToReverse === 2) return new M([-phi[0]], [-phi[1]],1,1);
            else if(matrixRowToReverse === 3) return new M([-phi_mul_e2[0]], [-phi_mul_e2[1]],1,1);
        }
    }
    else{
        return new M([1],[0],1,1)
    }

    return null;
}

function pdcch_getPdcchFreqAllocations(params_PDCCH){
    let pdcchAllocations = []; //holds pairs (offset,numOfPrb) pointing REs within CORESET that contain PDCCH
    if(params_PDCCH["cceRegMappingType"] === 1){ //Non-interleaved
        const numOfPrbPerCCE = 6;
        const pdcchOffset =  numOfPrbPerCCE * params_PDCCH["startCce"];
        const pdcchNumOfPrb = params_PDCCH["aggregation"] * numOfPrbPerCCE;
        pdcchAllocations.push( [pdcchOffset,pdcchNumOfPrb] );
    }
    else{ //interleaved
        for(let cceId = params_PDCCH["startCce"]; cceId < params_PDCCH["startCce"] + params_PDCCH["aggregation"]; cceId++){
            for(let i = 0; i < 6/params_PDCCH["L"]; i++){
                const regBundleId = pdcch_interleaverFunction(params_PDCCH,6*cceId/params_PDCCH["L"] + i);
                const firstREGInRegBundleId = regBundleId * params_PDCCH["L"];
                const regBundleSizePrb = params_PDCCH["L"];
                pdcchAllocations.push( [firstREGInRegBundleId,regBundleSizePrb] );
            }
        }
    }
    return pdcchAllocations;
}

//Gates (9.4.5.4.14 of 5G_L1_Entity_Level):
//"k is fixed within one REG bundle as follows:
//inside an REG bundle with even index, k is fixed to the lowest even subcarrier index k0 of the lowest REG in the REG bundle.
//inside an REG bundle with odd index, k is fixed to the lowest odd subcarrier index k1 of the lowest REG in the REG bundle".
//,subcarrierForPrecoding' is what Gates calls k
function pdcch_getSubcarrierForPrecoding(params_PDCCH,rb){
    const regBundleId = (rb - params_PDCCH["startPrb"]) / (params_PDCCH["L"] * params_PDCCH["numOfSymbols"]);
    const firstRegInRegBundle = regBundleId * params_PDCCH["L"];

    let firstReOfFirstRegInRegBundle = 12*(firstRegInRegBundle + params_PDCCH["startPrb"]);

    return regBundleId % 2 === 0 ? firstReOfFirstRegInRegBundle : firstReOfFirstRegInRegBundle + 1;
}

function pdcch_GetParametersArr(u,antId,sf,bba_slot,PDCCH,l2l1_packets,subcell,sfn,l2l1_slot){
    const l2l1_data_arr = nr_get_l2l1_data_from_packets(PDCCH,sf,bba_slot,u,antId,l2l1_packets,false, subcell,sfn,l2l1_slot);
    if(!l2l1_data_arr) return null;
    let params_PDCCH_arr = new Array(l2l1_data_arr.length).fill(null);
    for(let i = 0; i < l2l1_data_arr.length; i++){
        const l2l1_data = l2l1_data_arr[i];
        if(!l2l1_data) continue;

        let params_PDCCH = {
            //CORESET ALLOC
            "startPrb": 0, //Starting Prb of the CORESET
            "numOfPrb" : 0, //Size of CORESET in Prbs (PDCCH is located somewhere within). Fields name 'numOfPrb' is maintained for consistency with other channels
            "freqDomainAlloc" : l2l1_data.coresetFreqDomain.toString(2).padStart(64,"0"),
            "symbolOffset": l2l1_data.startSymbolNumber,
            "numOfSymbols": l2l1_data.numOfSymbols, //Number of symbols of CORESET
            "cceRegMappingType": l2l1_data.cceRegMappingType, //0 - interleaved, 1-non-interleaved !!!!
            "L": l2l1_data.regBundleSize ? l2l1_data.regBundleSize : 6,
            "R": l2l1_data.interleaverRows,
            "nShiftModNumOfRegBundles": l2l1_data.nShiftModNumOfRegBundles,

            //PRECODING
            "precoderGranularity" : l2l1_data.precoderGranularity,
            // "polarizationSelection" : l2l1_data.polarizationSelection, (should be ignored when conformanceMode = false)
            "pdcchPrecodingOption4x4" : l2l1_data.pdcchPrecodingOption4x4,
            "columnIndexOfEnhPrecodingMatrix" : l2l1_data.columnIndexOfEnhPrecodingMatrix,
            "i1Codebook4AntPorts" : l2l1_data.i1Codebook4AntPorts,
            "i2Codebook4AntPorts" : l2l1_data.i2Codebook4AntPorts,
            "numCeAxCIndex" : l2l1_data.numCeAxCIndex,
            "ceAxCIndex" : l2l1_data.ceAxCIndex,

            //PDCCH ALLOC
            "aggregation": l2l1_data.aggregationLevel, //Number of CCEs of PDDCH
            "startCce" : l2l1_data.startCce,

            //PAYLOAD
            "dciPayloadStr": l2l1_data.dciPayload.map(val => val.toString(2).padStart(8,"0")).join("").slice(0,l2l1_data.dciSize),
            "dciSize": l2l1_data.dciSize,

            //DMRS
            "dmrsReferencePoint": l2l1_data.dmrsReferencePoint, //enum {coresetStartRb, pointA}
            "re_ref_dmrs" : -1, //reference point for RE numbering, set based on dmrsReferencePoints parameter
            "N_ID" : l2l1_data.dmrsScramblingSequenceInt,  //In newer versions of Gates, there is also dciScramblingSequenceInit which i believe is equal to it.

            //OTHER
            "beta_pdcch_dmrs" : 10**(l2l1_data.pdcchDciTransmitPower/200), //???
            "rnti" : l2l1_data.rnti, //rnti for everything except scrambling the dci

            "rachStatus" : l2l1_data.rachStatus,
        }

        for(let i = 0; i < params_PDCCH["freqDomainAlloc"].length; i++){
            if(params_PDCCH["freqDomainAlloc"][i]==="0" && params_PDCCH["numOfPrb"] === 0) params_PDCCH["startPrb"] += 6;
            if(params_PDCCH["freqDomainAlloc"][i]==="1") params_PDCCH["numOfPrb"]+=6;
        }
        params_PDCCH["startPrb"] += l2l1_data.coresetFreqDomainRbShift; 
        params_PDCCH["re_ref_dmrs"] = params_PDCCH["dmrsReferencePoint"] === 0 ? params_PDCCH["startPrb"]*12 : 0,

        params_PDCCH_arr[i] = params_PDCCH;
    }
    return params_PDCCH_arr;
}

//Based on 7.3.2 of 38212 (CRC attachment)
function pdcch_detachCRC(c,rnti){
    const L = 24;
    const A = c.length - 24;

    //deScrambling of parity bits
    let b = c.slice(0,A+8).concat( new Array(L - 8).fill(-1));
    for(let k = A+8; k < A + L; k++) b[k] = (c[k] + (rnti >> (15 - (k - A - 8) )) ) % 2;  //rnti is 16bit value

    const g_CRC24C = [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1]; //(5.1 of 38212)
    const b_padded = new Array(L).fill(1).concat(b); //b_padded == a'b == 111...1111b == 111...111(a+p)
    const [a_prim,error] = algo_detachCRC(b_padded,g_CRC24C);

    const a = a_prim.slice(L,a_prim.length);
    return [a,error];
}

//Based on 7.3.3 of 38212 (Channel coding)
function pdcch_decodeChannel(d,K,n_max,I_IL,n_PC,n_PC_wm,E){
    const c = algo_polarDecoding(d,K,E,n_max,I_IL,n_PC,n_PC_wm);
    return c;
}

//Based on 7.3.4 of 38212 (Rate matching)
function pdcch_deMatchRate(f,K,n_max){
    const I_BIL = 0;
    const d = algo_deMatchRateForPolarCode(f,K,n_max,I_BIL);
    return d;
}

//Based on 7.3.2.3 of 38212 (Scrambling)
function pdcch_deScramble(b_tilde,rnti,n_ID){
    const M_bit = b_tilde.length;

    const c_init = (rnti * 2**16 + n_ID ) % 2**31;
    const c = pseudoRandomSequenceGeneration(c_init,M_bit+1);
    let b = new Array(M_bit);
    for(let i = 0; i < M_bit; i++) b[i] = (c[i] + b_tilde[i]) % 2;

    return b;
}