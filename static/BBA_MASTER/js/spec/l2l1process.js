// L2L1 messages processing block for split 7-3 proxy to split 7-2.

class L2L1process{

    constructor(atm, config, src_addr=[], dst_addr=[]){
        this.atm = atm;
        this.config = config;
        this.ecpri_sequence = new ecpriSequence(1, 0, 2);
        this.rawEcpri_sequence = new ecpriSequence(1, 0, 9);
        this.src_addr = src_addr;
        this.dst_addr = dst_addr;
    }

    eCPRIforward(uprr){

    }

    fill_ATM(uprr){
        const [symbols, skipped] = get_symbols_eAxCs(this.config, uprr);
        // distribute sections to streams with target eAxC
        for(const [symbol, sections] of symbols.entries()){
            for(const [eAxC, stream] of this.atm.streams){
                const secs = [];
                for(const [eAxCs, section] of sections){
                    if(eAxCs.includes(eAxC)) secs.push(section);
                }
                stream.add_symbol(symbol, secs);
            }
        }

        return skipped
    }

    l2l1OverEcpri(message, content, u, eAxCId){
        if(content === null) return;

        this.rawEcpri_sequence.clean();

        const maxPayload = this.config.transportMaxSize;
        const chunks = [];
        for(let i = 0; i * maxPayload < content.length; ++i){
            const typedChunk = content.slice(i * maxPayload, i*maxPayload + maxPayload);
            chunks.push(Array.from(typedChunk));
        }

        const startSymbolId = 0;
        const interfaceRevision = 0;

        for(const [id, chunk] of chunks.entries()){
            const ecpriRaw = new L2l1Control(
                0,  // TODO: don't hardcode dataDir
                1,
                message.sfn & 0xFF,
                Math.floor(message.slot * 2**(-u) ),
                message.slot & (2**u-1),
                startSymbolId,
                interfaceRevision,
                200,
                message.message
            );

            ecpriRaw.add_content('payload', chunk);
            const lastChunk = (id === chunks.length - 1) ? 1 : 0;
            this.rawEcpri_sequence.add(eAxCId, ecpriRaw, lastChunk, id);
        }

        return eth_sequence(
            this.src_addr,
            this.dst_addr,
            this.config['eth_type'],
            this.rawEcpri_sequence.frames)
    }
}

// TODO: move FCP gen functions somewhere else
function generate_pusch_FCP(uprr, u, useExtType6 = true){
    // Based on eCPRI User Plane Protocols (gNB) 5G21A
    // By default, sections containing extType: 6 are generated,
    // but when PUCCH msgs are generated based on resource elements,
    // extType: 12 is used

    const fcps = [];
    for(const subcell of uprr['subcells']){
        // 6.2.2.3	Handling of FCP message fields
        // common to all SendReq and ReceiveReq messages

        for(const grant of subcell['grants']){

            const numCeAxCIndex = grant.eCpriConfigStruct.numCeAxCIndex;
            for(let i = 0; i < numCeAxCIndex; ++i){

                let startPrb = grant['startPrb'];
                let numOfPrb = grant['numOfPrb'];

                // 6.2.2.5.1	Handling of UlData_PuschReceiveReq
                const FCP = new FastControlPlane(
                    0,
                    1,
                    0,
                    uprr['sfn'] & 0xFF,
                    Math.floor(uprr['slot']*2**(-u)),
                    uprr['slot'] & (2**u-1),
                    Math.min(...subcell['grants'].map(grant=>grant['startSymbol'])),
                    numOfPrb <= 255 ? 1 : 2,    //TODO: was grants.length
                    0x01,
                    0x91);

                const symbolMask = mask(grant['numOfPuschSymbols'], grant['startSymbol']);

                while(numOfPrb > 0){
                    // allow fragmentation with no more than 255 PRB per section
                    const numOfPrbToSave = numOfPrb % 255;  //TODO: was 256, correct?
                    const section = new FastControlPlaneSection(
                        grant['eCpriSectionId'],
                        0,
                        startPrb,
                        numOfPrbToSave,
                        0xFFF,
                        0,
                        1,
                        grant['eCpriConfigStruct']['patternId'][i/2]);
                    const ext = useExtType6 ? new SectionExtension6(
                            0,
                            6,
                            2,
                            0,
                            7,
                            0xFFFFFFF,
                            0,
                            symbolMask)
                        : new SectionExtension12(
                            0,
                            12,
                            1,
                            0,
                            symbolMask);
                    section.add_extension(ext);
                    FCP.add_section(section);

                    startPrb += numOfPrbToSave;
                    numOfPrb -= numOfPrbToSave;
                }

                fcps.push({
                    fcp: FCP,
                    subcell: subcell.subcellId,
                    ceAxCIndex: grant.eCpriConfigStruct.ceAxCIndex[i]
                });
            }
        }
    }

    return fcps;
}

function generate_pucch_FCP(pucch, u, staticLongPucch) {
    // when using StaticLongPucch, extType: 6 is used,
    // otherwise, extType: 12 is used

    const fcps = [];
    for (const subcell of pucch.subcells) {

        if (staticLongPucch) {

            const UpperCommonNumPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperCommon.numPrb;
            const LowerCommonNumPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerCommon.numPrb;

            const sections = [{}, {}, {}, {}];
            const numberOfSections = (UpperCommonNumPrbc === 0 && LowerCommonNumPrbc === 0) ? 2 : 4;

            const startSymbolId = subcell.staticLongPucchConfigEcpri.startSymbol;
            const numSymbol = subcell.staticLongPucchConfigEcpri.numSymbols;

            sections[0].sectionId = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerDedicated.eCpriSectionId;
            sections[1].sectionId = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperDedicated.eCpriSectionId
            sections[0].startPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerDedicated.startPrb;
            sections[1].startPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperDedicated.startPrb;
            sections[0].numPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerDedicated.numPrb;
            sections[1].numPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperDedicated.numPrb;

            if (numberOfSections === 4) { // in case of PRACH   // TODO: meassure cost of branch vs assignment
                sections[2].sectionId = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerCommon.eCpriSectionId;
                sections[3].sectionId = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperCommon.eCpriSectionId;
                sections[2].startPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerCommon.startPrb;
                sections[3].startPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperCommon.startPrb;
                sections[2].numPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerCommon.numPrb;
                sections[3].numPrbc = subcell.staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperCommon.numPrb;
            }

            let symbolMask = mask(numSymbol, startSymbolId);

            const numCeAxCIndex = subcell.staticLongPucchConfigEcpri.numCeAxCIndex;
            for (let i = 0; i < numCeAxCIndex; ++i) {
                const FCP = new FastControlPlane(
                    0,
                    1,
                    0,
                    pucch.sfn & 0xFF,
                    Math.floor(pucch.slot * 2 ** (-u)),
                    pucch.slot & (2 ** u - 1),
                    startSymbolId,
                    numberOfSections,
                    0x01,
                    0x91);

                const beamId = subcell.staticLongPucchConfigEcpri.patternId[i / 2];
                for (let i = 0; i < numberOfSections; ++i) {
                    const section = new FastControlPlaneSection(
                        sections[i].sectionId,
                        0,
                        sections[i].startPrbc,
                        sections[i].numPrbc,
                        0xFFF,
                        0,
                        1,
                        beamId);
                    const extType6 = new SectionExtension6(
                        0,
                        6,
                        2,
                        0,
                        7,
                        0xFFFFFFF,
                        0,
                        symbolMask);
                    section.add_extension(extType6);
                    FCP.add_section(section);
                }
                fcps.push({
                    fcp: FCP,
                    subcell: subcell.subcellId,
                    ceAxCIndex: subcell.staticLongPucchConfigEcpri.ceAxCIndex[i]
                });
            }
        } else { // Resorce based allocation
            for (const pucchResource of subcell.pucchResources) {

                const numCeAxCIndex = pucchResource.numCeAxCIndex;
                for (let i = 0; i < numCeAxCIndex; ++i) {

                    const numberOfSections =
                        (pucchResource.frequencyHopping === 0 || pucchResource.startPrb === pucchResource.secondHopPrb)
                            ? 1 : 2;
                    const startSymbolId = pucchResource.firstSymbol;
                    const numSymbol = pucchResource.numOfSymbols;   //numSymbols/numOfSymbols, inconsistent naming

                    const sections = [{}, {}];
                    sections[0].sectionId = pucchResource.eCpriSectionId[0];
                    sections[0].startPrbc = pucchResource.startPrb;
                    sections[0].numPrbc = pucchResource.numOfPrb;

                    sections[0].symbolMask = 0;
                    sections[1].symbolMask = 2;
                    if (numberOfSections === 1) {
                        sections[0].symbolMask = mask(numSymbol, startSymbolId);
                    } else {
                        sections[1].sectionId = pucchResource.eCpriSectionId[1];
                        sections[1].startPrbc = pucchResource.secondHopPrb;
                        sections[1].numPrbc = pucchResource.numOfPrb;

                        sections[0].symbolMask = mask(Math.floor(numSymbol / 2), startSymbolId);
                        sections[1].symbolMask = mask(numSymbol - Math.floor(numSymbol / 2), startSymbolId + Math.floor(numSymbol / 2));
                    }

                    const FCP = new FastControlPlane(
                        0,
                        1,
                        0,
                        pucch.sfn & 0xFF,
                        Math.floor(pucch.slot * 2 ** (-u)),
                        pucch.slot & (2 ** u - 1),
                        startSymbolId,
                        numberOfSections,
                        0x01,
                        0x91);

                    for (let secId = 0; secId < numberOfSections; ++secId) {
                        const section = new FastControlPlaneSection(
                            sections[secId].sectionId,
                            0,
                            sections[secId].startPrbc,
                            sections[secId].numPrbc,
                            0xFFF,
                            0,
                            1,
                            pucchResource.patternId[i / 2]);
                        const extType12 = new SectionExtension12(
                            0,
                            12,
                            1,
                            0,
                            sections[secId].symbolMask);
                        section.add_extension(extType12);
                        FCP.add_section(section);
                    }

                    fcps.push({fcp: FCP, subcell: subcell.subcellId, ceAxCIndex: pucchResource.ceAxCIndex[i]});
                }
            }
        }
    }

    return fcps;
}