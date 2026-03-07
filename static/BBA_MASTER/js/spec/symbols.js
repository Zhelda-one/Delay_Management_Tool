// Decoding data structure in symbols from L2L1 UlData_PuschReceiveReq message.

function get_symbols_eAxCs(config, uprr){
    // returns content of each symbol in the slot, consisting of section id,
    // PRB range and target eAxC
    const symbols_in_slot = config['symbols_in_slot'];
    const skipped = [];
    const symbols = [];
    for(const subcell of uprr['subcells']){
        const alloc_symbols_cnt = Array(subcell['grants'].length).fill(-1);
        for(let symbol = 0; symbol < symbols_in_slot; ++symbol){
            const sections = new Map();
            // determine which sections have content in the given symbol
            for(const [i, grant] of subcell['grants'].entries()){
                const symbol_in_section =
                    (0 <= symbol - grant['startSymbol']
                        && symbol - grant['startSymbol'] < grant['numOfPuschSymbols'])
                if(symbol_in_section){
                    // check for the presence of DM-RS
                    const data_present = !only_dmrs_pusch(grant, symbol);
                    // for SINR (time_density > 1), location of data depends
                    // on time_density and DM-RS presence
                    if(data_present){
                        alloc_symbols_cnt[i] += 1;
                        const SINR = (alloc_symbols_cnt[i] % config['time_density']) === 0;
                        if(SINR === false){
                            skipped.push([symbol, i, 'sinr']);
                        }
                        const eAxCs = eAxC_from_eAxCid(config,
                            subcell['subcellId'],
                            grant, SINR)
                        sections.set(eAxCs, [grant['eCpriSectionId'], //TODO: is this key valid?
                            grant['startPrb'],
                            grant['numOfPrb']]);
                    }
                    else{
                        skipped.push([symbol, i, 'dmrs']);
                    }
                }
            }
            symbols.push(sections);
        }
    }

    return [symbols, skipped];
}

function eAxC_from_eAxCid(config, subcellId, grant, SINR){
    const eCpriConfig = grant['eCpriConfigStruct'];
    const numeAxC = eCpriConfig['numCeAxCIndex'];

    let eAxC = eCpriConfig['ceAxCIndex'].slice(0, numeAxC)
        .map(idx=>config['subcells'][subcellId]['ceAxCIdPuschIq'][idx]);

    if(SINR){
        eAxC = eAxC.concat(eCpriConfig['ceAxCIndex'].slice(0, numeAxC)
            .map(idx=>config['subcells'][subcellId]['ceAxCIdPuschSINR'][idx]));
    }

    return eAxC;    //TODO: resolve return statement (tuple(eAxC))
}

function only_dmrs_pusch(grant, symbol){
    // Checks whether DM-RS channel is present in the given symbol
    // Based on 3GPP TS 38.211 version 16.2.0 Release 16, Section 6.4.1.1.3
    let L0, Ld;
    if(grant['ulDmrsMappingType'] === 0) {  // TODO: check if coding TypeA=0, TypeB=1
        // TypeA: DMRS is mapped relative to the slot
        L0 = grant['ulDmrsTypeAPos'];
        Ld = grant['startSymbol'] + grant['numOfPuschSymbols'];
    }
    else{
        // TypeB: DMRS is mapped relative to the PUSCH location
        L0 = 0;
        Ld = grant['numOfPuschSymbols'];
    }
    // read proper value from the Table 6.4.1.1.3-3
    const Lbar = Spec38_211_Table6_4_1_1_3__3(L0, Ld,
        grant['ulDmrsAddPos'], grant['ulDmrsMappingType']);
    const L = {
        1: Lbar,
        2:  // not supported according to 5G_L1_5G21A_191
        Lbar.concat(Lbar.map(elem=>elem+1))
    }[grant['ulDmrsLen']];

    let dmrs_present = false;
    if(grant['ulDmrsMappingType'] === 0){
        // TypeA: DMRS is mapped relative to the slot
        dmrs_present = L.includes(symbol);
    }
    else{
        // TypeB: DMRS is mapped relative to the PUSCH location
        dmrs_present = L.includes(symbol - grant['startSymbol']);
    }
    // Since only value ulDmrsConfigType == 1 is supported (5G_L1_IF_192),
    // DM-RS uses full symbol space only for numOfDmrsCdmGroupWithoutData == 2
    return dmrs_present && (grant['numOfDmrsCdmGroupWithoutData'] === 2);
}

function Spec38_211_Table6_4_1_1_3__3(L0, Ld, ulDmrsAddPos, ulDmrsMappingType){
    let Lbar = [];
    if(ulDmrsMappingType === 0){
        // DM-RS mapping TypeA
        if(4 <= Ld){
            Lbar.push(L0);
        }
        if([1, 2, 3].includes(ulDmrsAddPos)){
            if([8, 9].includes(Ld)){
                Lbar.push(7);
            }
            else if([10, 11, 12].includes(Ld)){
                if(ulDmrsAddPos === 1){
                    Lbar.push(9);
                }
                else if(ulDmrsAddPos === 2){
                    Lbar.push(6, 9);
                }
                else if(ulDmrsAddPos === 3){
                    if([10, 11].includes(Ld)){
                        Lbar.push(6, 9);
                    }
                    else{
                        Lbar.push(5, 8, 11);
                    }
                }
            }
            else if([13, 14].includes(Ld)){
                if(ulDmrsAddPos === 2){
                    Lbar.push(7);
                }
                else if(ulDmrsAddPos === 3){
                    Lbar.push(5, 8);
                }
                Lbar.push(11);
            }
        }
    }
    else{
        // DM-RS mapping TypeB
        Lbar.push(L0);
        if([5, 6, 7].includes(Ld)){
            Lbar.push(4);
        }
        else if([8, 9].includes(Ld)){
            if([2, 3].includes(ulDmrsAddPos)){
                Lbar.push(3);
            }
            Lbar.push(6);
        }
        else if([10, 11].includes(Ld)){
            Lbar = Lbar.concat({1: [8],
                2: [4, 8],
                3: [3, 6, 9]}[ulDmrsAddPos]);
        }
        else if(Ld >= 12){
            Lbar = Lbar.concat({1: [10],
                2: [5, 10],
                3: [3, 6, 9]}[ulDmrsAddPos]);
        }
    }

    return Lbar
}