function UlDataUe_decodeAddressReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlDataUe_encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function UlDataUe_decodeAddressResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.puschSendReqAddress = l2l1_getU32(offset + 4);
    result.puschPayloadTbSendReqAddress = l2l1_getU32(offset + 8);
    result.slotTypeReqAddress = l2l1_getU32(offset + 12);
    result.pucchSendReqAddress = l2l1_getU32(offset + 16);
    result.prachSendReqAddress = l2l1_getU32(offset + 20);
    result.srsSendReqAddress = l2l1_getU32(offset + 24);
    result.patternConfigReqAddress = l2l1_getU32(offset + 28);

    return result;
}
function UlDataUe_encodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU32(msg.puschSendReqAddress, buf, off + 4);
    l2l1_putU32(msg.puschPayloadTbSendReqAddress, buf, off + 8);
    l2l1_putU32(msg.slotTypeReqAddress, buf, off + 12);
    l2l1_putU32(msg.pucchSendReqAddress, buf, off + 16);
    l2l1_putU32(msg.prachSendReqAddress, buf, off + 20);
    l2l1_putU32(msg.srsSendReqAddress, buf, off + 24);
    l2l1_putU32(msg.patternConfigReqAddress, buf, off + 28);
}

function UlDataUe_decodePatternConfigReq_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.txRxBitmapPol = l2l1_getU16(offset + 4);
    result.numOfPatternIdPol = l2l1_getU8(offset + 6);
    result.patternIdPol0List = [];
    for (let i = 0; i < 112; i++)
        result.patternIdPol0List.push(l2l1_getU16(offset + 8 + i * 2));
    result.patternIdPol1List = [];
    for (let i = 0; i < 112; i++)
        result.patternIdPol1List.push(l2l1_getU16(offset + 232 + i * 2));
    result.numOfXpolBeams = l2l1_getU8(offset + 455);
    result.calibrationBitmap = l2l1_getU16(offset + 456);

    return result;
}
function UlDataUe_encodePatternConfigReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU16(msg.txRxBitmapPol, buf, off + 4);
    l2l1_putU8(msg.numOfPatternIdPol, buf, off + 6);
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.patternIdPol0List[i], buf, off + 8 + i * 2);
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.patternIdPol1List[i], buf, off + 232 + i * 2);
    l2l1_putU8(msg.numOfXpolBeams, buf, off + 456);
    l2l1_putU16(msg.calibrationBitmap, buf, off + 458);
}

function UlDataUe_decodePrachSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.prachPrbOffset = l2l1_getU16(offset + 6);
    result.preambles = _decodeArray(offset + 8, UlDataUe_decodeprachSendReqPreamble_t, 8);

    return result;
}
function UlDataUe_encodePrachSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 6);
    _encodeArray(msg.preambles, buf, off + 8, UlDataUe_encodeprachSendReqPreamble_t, 8);
}

function UlDataUe_decodeprachSendReqPreamble_t(offset) {
    const result = {};

    result.prachPreambleIndex = l2l1_getU8(offset + 0);
    result.prachPreambleFreqOccasion = l2l1_getU8(offset + 1);
    result.prachPreambleTimeOccasion = l2l1_getU8(offset + 2);
    result.prachTransmitPower = l2l1_getI16(offset + 4);
    result.prachTransmitterTimingDelay = l2l1_getU16(offset + 6);

    return result;
}
function UlDataUe_encodeprachSendReqPreamble_t(msg, buf, off) {
    l2l1_putU8(msg.prachPreambleIndex, buf, off + 0);
    l2l1_putU8(msg.prachPreambleFreqOccasion, buf, off + 1);
    l2l1_putU8(msg.prachPreambleTimeOccasion, buf, off + 2);
    l2l1_putI16(msg.prachTransmitPower, buf, off + 4);
    l2l1_putU16(msg.prachTransmitterTimingDelay, buf, off + 6);
}

function UlDataUe_decodePucchSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.pucchResources = _decodeArray(offset + 8, UlDataUe_decodepucchSendReqPucchResource_t, 32);

    return result;
}
function UlDataUe_encodePucchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    _encodeArray(msg.pucchResources, buf, off + 8, UlDataUe_encodepucchSendReqPucchResource_t, 32);
}

function UlDataUe_decodepucchSendReqPucchResource_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.startPrb = l2l1_getU16(offset + 2);
    result.numOfPrb = l2l1_getU8(offset + 4);
    result.pucchFormat = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.numOfSymbols = l2l1_getU8(offset + 6);
    result.firstSymbol = l2l1_getU8(offset + 7);
    result.frequencyHopping = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 10);
    result.initialCyclicShift = l2l1_getU8(offset + 12);
    result.numOfLayers = l2l1_getU8(offset + 13);
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "numOfPucchTxAntennaPorts_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 16);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 18);
    result.uciBits = [];
    for (let i = 0; i < 7; i++)
        result.uciBits.push(l2l1_getU8(offset + 19 + i * 1));
    result.srBit = l2l1_getU8(offset + 26);
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "bitValue_t",
    });
    result.pucchTransmitPower = l2l1_getI16(offset + 28);
    result.ulTransmitterTimingDelay = l2l1_getU16(offset + 30);

    return result;
}
function UlDataUe_encodepucchSendReqPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU16(msg.startPrb, buf, off + 2);
    l2l1_putU8(msg.numOfPrb, buf, off + 4);
    l2l1_putU8(msg.pucchFormat, buf, off + 5);
    l2l1_putU8(msg.numOfSymbols, buf, off + 6);
    l2l1_putU8(msg.firstSymbol, buf, off + 7);
    l2l1_putU8(msg.frequencyHopping, buf, off + 8);
    l2l1_putU16(msg.secondHopPrb, buf, off + 10);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 12);
    l2l1_putU8(msg.numOfLayers, buf, off + 13);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 14);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 16);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 18);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciBits[i], buf, off + 19 + i * 1);
    l2l1_putU8(msg.srBit, buf, off + 26);
    l2l1_putI16(msg.pucchTransmitPower, buf, off + 28);
    l2l1_putU16(msg.ulTransmitterTimingDelay, buf, off + 30);
}

function UlDataUe_decodePuschPayloadTbSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.tbIndex = l2l1_getU32(offset + 8);
    result.tbFragmentOffset_bits = l2l1_getU32(offset + 12);
    result.payload = _decodeArray(offset + 16, l2l1_getU8, 1);

    return result;
}
function UlDataUe_encodePuschPayloadTbSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU32(msg.tbIndex, buf, off + 8);
    l2l1_putU32(msg.tbFragmentOffset_bits, buf, off + 12);
    _encodeArray(msg.payload, buf, off + 16, l2l1_putU8, 1);
}

function UlDataUe_decodePuschSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.ulDmrsConfigType = l2l1_getU8(offset + 10);
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 13);
    result.padding_dlDmrsTypeAPos = l2l1_getU8(offset + 14);
    result.nscId = l2l1_getU8(offset + 15);
    result.startSymbol = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 17);
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "numOfPuschSymbols_t",
    });
    result.antPort = l2l1_getU16(offset + 18);
    result.mcs = l2l1_getU8(offset + 20);
    result.ulMcsTable = l2l1_getU8(offset + 21);
    Object.defineProperty(result, "__enum_ulMcsTable", {
        enumerable: false,
        writable: false,
        value: "mcsTable_t",
    });
    result.spatialMode = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 23);
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "ulCodebookIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 24);
    result.numOfPrb = l2l1_getU16(offset + 26);
    result.ulPtrsFlag = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_ulPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.ulPtrsTimeDensity = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_ulPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.ulPtrsFrequencyDensity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_ulPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.ulPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.ulPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.padding_offsetRbDmrs = l2l1_getU8(offset + 33);
    result.puschTbTransmitPower = l2l1_getI16(offset + 34);
    result.padding_pdschBundleSize = l2l1_getU16(offset + 36);
    result.baseGraph = l2l1_getU8(offset + 38);
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 39);
    result.codeBlockSize = l2l1_getU16(offset + 40);
    result.numOfFillerBits = l2l1_getU16(offset + 42);
    result.liftSize = l2l1_getU16(offset + 44);
    result.liftSizeSetIndex = l2l1_getU8(offset + 46);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 47);
    result.modulationOrder = l2l1_getU8(offset + 48);
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 49);
    result.ncb = l2l1_getU16(offset + 50);
    result.k0divZ = l2l1_getU8(offset + 52);
    result.numOfLayers = l2l1_getU8(offset + 53);
    result.tbIndex = l2l1_getU32(offset + 56);
    result.tbStartOffset_bits = l2l1_getU32(offset + 60);
    result.tbSize_bits = l2l1_getU32(offset + 64);
    result.ulTransmitterTimingDelay = l2l1_getU16(offset + 68);
    result.numOfUciCsiPart1Bits = l2l1_getU8(offset + 70);
    result.uciCsiPart1Bits = [];
    for (let i = 0; i < 7; i++)
        result.uciCsiPart1Bits.push(l2l1_getU8(offset + 71 + i * 1));
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 78);
    result.uciCsiPart2Bits = [];
    for (let i = 0; i < 7; i++)
        result.uciCsiPart2Bits.push(l2l1_getU8(offset + 79 + i * 1));
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 86);
    result.numOfUciCsiPart2Symbols = l2l1_getU16(offset + 88);

    return result;
}
function UlDataUe_encodePuschSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 8);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 10);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 11);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 12);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 13);
    l2l1_putU8(msg.padding_dlDmrsTypeAPos, buf, off + 14);
    l2l1_putU8(msg.nscId, buf, off + 15);
    l2l1_putU8(msg.startSymbol, buf, off + 16);
    l2l1_putU8(msg.numOfPuschSymbols, buf, off + 17);
    l2l1_putU16(msg.antPort, buf, off + 18);
    l2l1_putU8(msg.mcs, buf, off + 20);
    l2l1_putU8(msg.ulMcsTable, buf, off + 21);
    l2l1_putU8(msg.spatialMode, buf, off + 22);
    l2l1_putU8(msg.codebookIndex, buf, off + 23);
    l2l1_putU16(msg.startPrb, buf, off + 24);
    l2l1_putU16(msg.numOfPrb, buf, off + 26);
    l2l1_putU8(msg.ulPtrsFlag, buf, off + 28);
    l2l1_putU8(msg.ulPtrsTimeDensity, buf, off + 29);
    l2l1_putU8(msg.ulPtrsFrequencyDensity, buf, off + 30);
    l2l1_putU8(msg.ulPtrsNumOfPorts, buf, off + 31);
    l2l1_putU8(msg.ulPtrsResElemOffset, buf, off + 32);
    l2l1_putU8(msg.padding_offsetRbDmrs, buf, off + 33);
    l2l1_putI16(msg.puschTbTransmitPower, buf, off + 34);
    l2l1_putU16(msg.padding_pdschBundleSize, buf, off + 36);
    l2l1_putU8(msg.baseGraph, buf, off + 38);
    l2l1_putU8(msg.numOfCodeBlocks, buf, off + 39);
    l2l1_putU16(msg.codeBlockSize, buf, off + 40);
    l2l1_putU16(msg.numOfFillerBits, buf, off + 42);
    l2l1_putU16(msg.liftSize, buf, off + 44);
    l2l1_putU8(msg.liftSizeSetIndex, buf, off + 46);
    l2l1_putU8(msg.liftSizeColumnIndex, buf, off + 47);
    l2l1_putU8(msg.modulationOrder, buf, off + 48);
    l2l1_putU8(msg.rvIndex, buf, off + 49);
    l2l1_putU16(msg.ncb, buf, off + 50);
    l2l1_putU8(msg.k0divZ, buf, off + 52);
    l2l1_putU8(msg.numOfLayers, buf, off + 53);
    l2l1_putU32(msg.tbIndex, buf, off + 56);
    l2l1_putU32(msg.tbStartOffset_bits, buf, off + 60);
    l2l1_putU32(msg.tbSize_bits, buf, off + 64);
    l2l1_putU16(msg.ulTransmitterTimingDelay, buf, off + 68);
    l2l1_putU8(msg.numOfUciCsiPart1Bits, buf, off + 70);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciCsiPart1Bits[i], buf, off + 71 + i * 1);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 78);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciCsiPart2Bits[i], buf, off + 79 + i * 1);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 86);
    l2l1_putU16(msg.numOfUciCsiPart2Symbols, buf, off + 88);
}

function UlDataUe_decodeSlotTypeReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.slotType = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_slotType", {
        enumerable: false,
        writable: false,
        value: "slotType_t",
    });
    result.pwrReductionPerSymb_dB = [];
    for (let i = 0; i < 14; i++)
        result.pwrReductionPerSymb_dB.push(l2l1_getU8(offset + 6 + i * 1));

    return result;
}
function UlDataUe_encodeSlotTypeReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.slotType, buf, off + 5);
    for (let i = 0; i < 14; i++)
        l2l1_putU8(msg.pwrReductionPerSymb_dB[i], buf, off + 6 + i * 1);
}

function UlDataUe_decodeSrsSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.symbolPosition = l2l1_getU8(offset + 8);
    result.transmissionComb = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 10);
    result.srsBandwidth = l2l1_getU8(offset + 11);
    result.srsBandwidthConfig = l2l1_getU8(offset + 12);
    result.freqDomainPosition = l2l1_getU8(offset + 13);
    result.freqDomainShift = l2l1_getU16(offset + 14);
    result.sequenceId = l2l1_getU16(offset + 16);
    result.cyclicShift = l2l1_getU8(offset + 18);
    result.numOfSrsPorts = l2l1_getU8(offset + 19);
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "numOfSrsTxAntennaPorts_t",
    });
    result.srsTransmitPower = l2l1_getI16(offset + 20);
    result.srsTransmitterTimingDelay = l2l1_getU16(offset + 22);

    return result;
}
function UlDataUe_encodeSrsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU8(msg.symbolPosition, buf, off + 8);
    l2l1_putU8(msg.transmissionComb, buf, off + 9);
    l2l1_putU8(msg.transmissionCombId, buf, off + 10);
    l2l1_putU8(msg.srsBandwidth, buf, off + 11);
    l2l1_putU8(msg.srsBandwidthConfig, buf, off + 12);
    l2l1_putU8(msg.freqDomainPosition, buf, off + 13);
    l2l1_putU16(msg.freqDomainShift, buf, off + 14);
    l2l1_putU16(msg.sequenceId, buf, off + 16);
    l2l1_putU8(msg.cyclicShift, buf, off + 18);
    l2l1_putU8(msg.numOfSrsPorts, buf, off + 19);
    l2l1_putI16(msg.srsTransmitPower, buf, off + 20);
    l2l1_putU16(msg.srsTransmitterTimingDelay, buf, off + 22);
}

function UlData_decodeAddressReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2Addresses = l1_common_decodeL2Addresses(offset + 4);

    return result;
}
function UlData_encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_common_encodeL2Addresses(msg.l2Addresses, buf, off + 4);
}

function UlData_decodeAddressResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l1UlAddresses = l1_common_decodeL1UlAddresses(offset + 4);

    return result;
}
function UlData_encodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_common_encodeL1UlAddresses(msg.l1UlAddresses, buf, off + 4);
}

function UlData_decodeEmptyReceiveReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);

    return result;
}
function UlData_encodeEmptyReceiveReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
}

function UlData_decodeFastAntennaSnapshotReq_t(offset) {
    const result = {};

    result.addrUlFastAntennaSnapshotResp = l2l1_getU32(offset + 0);
    result.ulSubCellId = l2l1_getU8(offset + 4);
    result.sfn = l2l1_getU16(offset + 6);
    result.slot = l2l1_getU8(offset + 8);
    result.numOfEvents = l2l1_getU8(offset + 9);
    result.eventsList = [];
    for (let i = 0; i < 8; i++)
        result.eventsList.push(l1_common_decodeFastAntennaSnapshotEventsList_t(offset + 10 + i * 4));

    return result;
}
function UlData_encodeFastAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrUlFastAntennaSnapshotResp, buf, off + 0);
    l2l1_putU8(msg.ulSubCellId, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 8);
    l2l1_putU8(msg.numOfEvents, buf, off + 9);
    for (let i = 0; i < 8; i++)
        l1_common_encodeFastAntennaSnapshotEventsList_t(msg.eventsList[i], buf, off + 10 + i * 4);
}

function UlData_decodeFastAntennaSnapshotResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "statusFastAntennaSnapshotResp_t",
    });

    return result;
}
function UlData_encodeFastAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function UlData_decodePrachReceiveInd_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodeprachReceiveIndSubcell_t, 16);

    return result;
}
function UlData_encodePrachReceiveInd_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodeprachReceiveIndSubcell_t, 16);
}

function UlData_decodeprachReceiveIndSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.detectedPrachPreambles = _decodeArray(offset + 8, UlData_decodedetectedPrachPreambles_t, 12);

    return result;
}
function UlData_encodeprachReceiveIndSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    _encodeArray(msg.detectedPrachPreambles, buf, off + 8, UlData_encodedetectedPrachPreambles_t, 12);
}

function UlData_decodedetectedPrachPreambles_t(offset) {
    const result = {};

    result.prachPreambleIndex = l2l1_getU8(offset + 0);
    result.prachPreambleTimeOccasion = l2l1_getU8(offset + 1);
    result.prachPreambleFreqOccasion = l2l1_getU8(offset + 2);
    result.initialTa = l2l1_getU16(offset + 4);
    result.peakMetric = l2l1_getF32(offset + 8);

    return result;
}
function UlData_encodedetectedPrachPreambles_t(msg, buf, off) {
    l2l1_putU8(msg.prachPreambleIndex, buf, off + 0);
    l2l1_putU8(msg.prachPreambleTimeOccasion, buf, off + 1);
    l2l1_putU8(msg.prachPreambleFreqOccasion, buf, off + 2);
    l2l1_putU16(msg.initialTa, buf, off + 4);
    l2l1_putF32(msg.peakMetric, buf, off + 8);
}

function UlData_decodePrachReceiveReq_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodeprachReceiveReqSubcell_t, 32);

    return result;
}
function UlData_encodePrachReceiveReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodeprachReceiveReqSubcell_t, 32);
}

function UlData_decodeprachReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.prachPrbOffset = l2l1_getU16(offset + 6);
    result.prachOccasions = [];
    for (let i = 0; i < 8; i++)
        result.prachOccasions.push(l2l1_getU16(offset + 8 + i * 2));
    result.occasions = _decodeArray(offset + 24, UlData_decodeprachReceiveReqOccasion_t, 12);

    return result;
}
function UlData_encodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 6);
    for (let i = 0; i < 8; i++)
        l2l1_putU16(msg.prachOccasions[i], buf, off + 8 + i * 2);
    _encodeArray(msg.occasions, buf, off + 24, UlData_encodeprachReceiveReqOccasion_t, 12);
}

function UlData_decodeprachReceiveReqOccasion_t(offset) {
    const result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 1 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 6 + i * 2));
    result.eCpriSectionId = l2l1_getU16(offset + 10);

    return result;
}
function UlData_encodeprachReceiveReqOccasion_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 1 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 6 + i * 2);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 10);
}

function UlData_decodepucchReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.staticLongPucchConfigEcpri = UlData_decodestaticLongPucchConfigEcpri_t(offset + 6);
    result.pucchResources = _decodeArray(offset + 44, UlData_decodepucchReceiveReqPucchResource_t, 88);

    return result;
}
function UlData_encodepucchReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    UlData_encodestaticLongPucchConfigEcpri_t(msg.staticLongPucchConfigEcpri, buf, off + 6);
    _encodeArray(msg.pucchResources, buf, off + 44, UlData_encodepucchReceiveReqPucchResource_t, 88);
}

function UlData_decodepucchReceiveReqPucchResource_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU8(offset + 8);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 10);
    result.dataScramblingInt = l2l1_getU16(offset + 12);
    result.srBitDetection = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_srBitDetection", {
        enumerable: false,
        writable: false,
        value: "srBitDetection_t",
    });
    result.nANPucch = l2l1_getU8(offset + 15);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 16);
    result.numOfSymbols = l2l1_getU8(offset + 17);
    result.firstSymbol = l2l1_getU8(offset + 18);
    result.frequencyHopping = l2l1_getU8(offset + 19);
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 20);
    result.initialCyclicShift = l2l1_getU8(offset + 22);
    result.additionalDmrs = l2l1_getU8(offset + 23);
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 24);
    result.numCeAxCIndex = l2l1_getU8(offset + 25);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 26 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 30 + i * 2));
    result.modulationType = l2l1_getU8(offset + 34);
    Object.defineProperty(result, "__enum_modulationType", {
        enumerable: false,
        writable: false,
        value: "pucchModulationType_t",
    });
    result.longTermCfoMetric = l1_common_decodelongTermCfoMetric_t(offset + 36);
    result.l2CtxtAnMgt = [];
    for (let i = 0; i < 8; i++)
        result.l2CtxtAnMgt.push(l2l1_getU8(offset + 44 + i * 1));
    result.eCpriSectionId = [];
    for (let i = 0; i < 2; i++)
        result.eCpriSectionId.push(l2l1_getU16(offset + 52 + i * 2));
    result.longTermCfoMetricOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.longTermCfoMetricOfAnt.push(l1_common_decodelongTermCfoMetric_t(offset + 56 + i * 8));

    return result;
}
function UlData_encodepucchReceiveReqPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.numOfLayers, buf, off + 3);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 5);
    l2l1_putU16(msg.startPrb, buf, off + 6);
    l2l1_putU8(msg.numOfPrb, buf, off + 8);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 10);
    l2l1_putU16(msg.dataScramblingInt, buf, off + 12);
    l2l1_putU8(msg.srBitDetection, buf, off + 14);
    l2l1_putU8(msg.nANPucch, buf, off + 15);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 16);
    l2l1_putU8(msg.numOfSymbols, buf, off + 17);
    l2l1_putU8(msg.firstSymbol, buf, off + 18);
    l2l1_putU8(msg.frequencyHopping, buf, off + 19);
    l2l1_putU16(msg.secondHopPrb, buf, off + 20);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 22);
    l2l1_putU8(msg.additionalDmrs, buf, off + 23);
    l2l1_putU8(msg.timeDomainOcc, buf, off + 24);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 25);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 26 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 30 + i * 2);
    l2l1_putU8(msg.modulationType, buf, off + 34);
    l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 36);
    for (let i = 0; i < 8; i++)
        l2l1_putU8(msg.l2CtxtAnMgt[i], buf, off + 44 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.eCpriSectionId[i], buf, off + 52 + i * 2);
    for (let i = 0; i < 4; i++)
        l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetricOfAnt[i], buf, off + 56 + i * 8);
}

function UlData_decodestaticLongPucchConfigEcpri_t(offset) {
    const result = {};

    result.eCpriPucchResourceAllocationLowerDedicated = UlData_decodeeCpriPucchResourceAllocationStructure_t(offset + 0);
    result.eCpriPucchResourceAllocationUpperDedicated = UlData_decodeeCpriPucchResourceAllocationStructure_t(offset + 6);
    result.eCpriPucchResourceAllocationLowerCommon = UlData_decodeeCpriPucchResourceAllocationStructure_t(offset + 12);
    result.eCpriPucchResourceAllocationUpperCommon = UlData_decodeeCpriPucchResourceAllocationStructure_t(offset + 18);
    result.numCeAxCIndex = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 25 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 30 + i * 2));
    result.startSymbol = l2l1_getU8(offset + 33);
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "longPucchStartSymbol_t",
    });
    result.numSymbols = l2l1_getU8(offset + 34);
    Object.defineProperty(result, "__enum_numSymbols", {
        enumerable: false,
        writable: false,
        value: "numOfLongPucchSymbols_t",
    });

    return result;
}
function UlData_encodestaticLongPucchConfigEcpri_t(msg, buf, off) {
    UlData_encodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerDedicated, buf, off + 0);
    UlData_encodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperDedicated, buf, off + 6);
    UlData_encodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerCommon, buf, off + 12);
    UlData_encodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperCommon, buf, off + 18);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 24);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 25 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 30 + i * 2);
    l2l1_putU8(msg.startSymbol, buf, off + 34);
    l2l1_putU8(msg.numSymbols, buf, off + 35);
}

function UlData_decodeeCpriPucchResourceAllocationStructure_t(offset) {
    const result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numPrb = l2l1_getU16(offset + 2);
    result.eCpriSectionId = l2l1_getU16(offset + 4);

    return result;
}
function UlData_encodeeCpriPucchResourceAllocationStructure_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numPrb, buf, off + 2);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 4);
}

function UlData_decodePucchReceiveReq_t(offset) {
    const result = {};

    result.addrPucchReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPucchReceiveRespHarqD = l2l1_getU32(offset + 4);
    result.sfn = l2l1_getU16(offset + 8);
    result.slot = l2l1_getU8(offset + 10);
    result.subcells = _decodeArray(offset + 12, UlData_decodepucchReceiveReqSubcell_t, 52);

    return result;
}
function UlData_encodePucchReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPucchReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPucchReceiveRespHarqD, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 8);
    l2l1_putU8(msg.slot, buf, off + 10);
    _encodeArray(msg.subcells, buf, off + 12, UlData_encodepucchReceiveReqSubcell_t, 52);
}

function UlData_decodepucchReceiveRespHarqDSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = _decodeArray(offset + 4, UlData_decodepucchReceiveRespHarqDPucchResource_t, 28);

    return result;
}
function UlData_encodepucchReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pucchResources, buf, off + 4, UlData_encodepucchReceiveRespHarqDPucchResource_t, 28);
}

function UlData_decodepucchReceiveRespHarqDPucchResource_t(offset) {
    const result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.dtx = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.ackNack = [];
    for (let i = 0; i < 7; i++)
        result.ackNack.push(l2l1_getU8(offset + 5 + i * 1));
    result.dtxMetric = l2l1_getU16(offset + 12);
    result.dtxThreshold = l2l1_getU16(offset + 14);
    result.rnti = l2l1_getU16(offset + 16);
    result.crc = l2l1_getU8(offset + 18);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.l2CtxtAnMgt = [];
    for (let i = 0; i < 8; i++)
        result.l2CtxtAnMgt.push(l2l1_getU8(offset + 19 + i * 1));

    return result;
}
function UlData_encodepucchReceiveRespHarqDPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 3);
    l2l1_putU8(msg.dtx, buf, off + 4);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.ackNack[i], buf, off + 5 + i * 1);
    l2l1_putU16(msg.dtxMetric, buf, off + 12);
    l2l1_putU16(msg.dtxThreshold, buf, off + 14);
    l2l1_putU16(msg.rnti, buf, off + 16);
    l2l1_putU8(msg.crc, buf, off + 18);
    for (let i = 0; i < 8; i++)
        l2l1_putU8(msg.l2CtxtAnMgt[i], buf, off + 19 + i * 1);
}

function UlData_decodePucchReceiveRespHarqD_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodepucchReceiveRespHarqDSubcell_t, 10);

    return result;
}
function UlData_encodePucchReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodepucchReceiveRespHarqDSubcell_t, 10);
}

function UlData_decodepucchReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = _decodeArray(offset + 4, UlData_decodepucchReceiveRespPsPucchResource_t, 64);

    return result;
}
function UlData_encodepucchReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pucchResources, buf, off + 4, UlData_encodepucchReceiveRespPsPucchResource_t, 64);
}

function UlData_decodepucchReceiveRespPsPucchResource_t(offset) {
    const result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.secondHopPrb = l2l1_getU16(offset + 2);
    result.initialCyclicShift = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.crc = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.dtx = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 10);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 12);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 16);
    result.rxPower = l2l1_getF32(offset + 20);
    result.sinr = [];
    for (let i = 0; i < 2; i++)
        result.sinr.push(l2l1_getF32(offset + 24 + i * 4));
    result.uciBits = [];
    for (let i = 0; i < 7; i++)
        result.uciBits.push(l2l1_getU8(offset + 32 + i * 1));
    result.srBit = l2l1_getU8(offset + 39);
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 40);
    result.rssi = l2l1_getF32(offset + 44);
    result.dtxMetric = l2l1_getU32(offset + 48);
    result.dtxThreshold = l2l1_getU32(offset + 52);
    result.shortTermCfoMetric = l1_common_decodeshortTermCfoMetric_t(offset + 56);

    return result;
}
function UlData_encodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.secondHopPrb, buf, off + 2);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU8(msg.crc, buf, off + 8);
    l2l1_putU8(msg.dtx, buf, off + 9);
    l2l1_putU8(msg.pucchFormat, buf, off + 10);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 11);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 12);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 16);
    l2l1_putF32(msg.rxPower, buf, off + 20);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.sinr[i], buf, off + 24 + i * 4);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciBits[i], buf, off + 32 + i * 1);
    l2l1_putU8(msg.srBit, buf, off + 39);
    l2l1_putF32(msg.noisePower, buf, off + 40);
    l2l1_putF32(msg.rssi, buf, off + 44);
    l2l1_putU32(msg.dtxMetric, buf, off + 48);
    l2l1_putU32(msg.dtxThreshold, buf, off + 52);
    l1_common_encodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 56);
}

function UlData_decodePucchReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.bcn_reservation_for_debug = l2l1_getU8(offset + 7);
    result.subcells = _decodeArray(offset + 8, UlData_decodepucchReceiveRespPsSubcell_t, 12);

    return result;
}
function UlData_encodePucchReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    l2l1_putU8(msg.bcn_reservation_for_debug, buf, off + 7);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodepucchReceiveRespPsSubcell_t, 12);
}

function UlData_decodepuschReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.grants = _decodeArray(offset + 8, UlData_decodepuschReceiveReqGrant_t, 172);

    return result;
}
function UlData_encodepuschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    _encodeArray(msg.grants, buf, off + 8, UlData_encodepuschReceiveReqGrant_t, 172);
}

function UlData_decodepuschReceiveReqGrant_t(offset) {
    const result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.ulDmrsConfigType = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 9);
    result.ulDmrsTypeAPos = l2l1_getU8(offset + 10);
    result.startSymbol = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "numOfPuschSymbols_t",
    });
    result.startPrb = l2l1_getU16(offset + 14);
    result.numOfPrb = l2l1_getU16(offset + 16);
    result.mcs = l2l1_getU8(offset + 18);
    result.mcsTable = l2l1_getU8(offset + 19);
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "mcsTable_t",
    });
    result.antPort = l2l1_getU16(offset + 20);
    result.spatialMode = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 23);
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "ulCodebookIndex_t",
    });
    result.nscId = l2l1_getU8(offset + 24);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 26);
    result.ulPtrsFlag = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_ulPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.ulPtrsTimeDensity = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_ulPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.ulPtrsFrequencyDensity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_ulPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.ulPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.ulPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.ulPtrsNumOfGroups = l2l1_getU8(offset + 33);
    Object.defineProperty(result, "__enum_ulPtrsNumOfGroups", {
        enumerable: false,
        writable: false,
        value: "ulPtrsNumOfGroups_t",
    });
    result.ulPtrsNumOfSamplesPerGroup = l2l1_getU8(offset + 34);
    Object.defineProperty(result, "__enum_ulPtrsNumOfSamplesPerGroup", {
        enumerable: false,
        writable: false,
        value: "ulPtrsNumOfSamplesPerGroup_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 35);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 36);
    result.freshHarqTrans = l2l1_getU8(offset + 38);
    result.numOfUciCsiPart1Bits = l2l1_getU8(offset + 39);
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 40);
    result.maxNumOfUciCsiPart2Symbols = l2l1_getU16(offset + 42);
    result.maxNumOfUciCsiPart2BitsPlusCrcUpTo11Bits = l2l1_getU16(offset + 44);
    result.maxNumOfUciCsiPart2BitsPlusCrcMoreThan11Bits = l2l1_getU16(offset + 46);
    result.numOfUciAckBits = l2l1_getU8(offset + 48);
    result.numOfUciAckSymbols = l2l1_getU16(offset + 50);
    result.numOfUciAckSymbols1bit = l2l1_getU16(offset + 52);
    result.uciOnly = l2l1_getU8(offset + 54);
    result.csiPart2CodeRateUpTo11Bits = l2l1_getF32(offset + 56);
    result.csiPart2CodeRateMoreThan11Bits = l2l1_getF32(offset + 60);
    result.csiPart2BetaOffsetUpTo11Bits = l2l1_getU8(offset + 64);
    result.csiPart2BetaOffsetMoreThan11Bits = l2l1_getU8(offset + 65);
    result.numOfUciRes = l2l1_getU16(offset + 66);
    result.csiReportStruct = _decodeArray(offset + 68, UlData_decodecsiReportStruct_t, 12);
    result.longTermCfoMetric = l1_common_decodelongTermCfoMetric_t(offset + 76);
    result.foeValid = l2l1_getU8(offset + 84);
    result.baseGraph = l2l1_getU8(offset + 85);
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 86);
    result.codeBlockSize = l2l1_getU16(offset + 88);
    result.numOfFillerBits = l2l1_getU16(offset + 90);
    result.liftSize = l2l1_getU16(offset + 92);
    result.liftSizeSetIndex = l2l1_getU8(offset + 94);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 95);
    result.modulationOrder = l2l1_getU8(offset + 96);
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 97);
    result.ncb = l2l1_getU16(offset + 98);
    result.k0divZ = l2l1_getU8(offset + 100);
    result.numOfLayers = l2l1_getU8(offset + 101);
    result.puschTransCoherence = l2l1_getU8(offset + 102);
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "puschTransCoherence_t",
    });
    result.puschTransformPrecoderFlag = l2l1_getU8(offset + 103);
    Object.defineProperty(result, "__enum_puschTransformPrecoderFlag", {
        enumerable: false,
        writable: false,
        value: "puschTransformPrecoderFlag_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 104);
    result.eCpriConfigStruct = UlData_decodeeCpriConfigStruct_t(offset + 106);
    result.numOfDmrsCdmGroupWithoutData = l2l1_getU8(offset + 116);
    result.l2CtxtAnMgt = [];
    for (let i = 0; i < 8; i++)
        result.l2CtxtAnMgt.push(l2l1_getU8(offset + 117 + i * 1));
    result.eCpriSectionId = l2l1_getU16(offset + 126);
    result.longTermCfoMetricOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.longTermCfoMetricOfAnt.push(l1_common_decodelongTermCfoMetric_t(offset + 128 + i * 8));
    result.ext = [];
    const extLength = l2l1_getU32(offset + 160);
    for (let i = 0; i < extLength && i < 2; i++)
        result.ext.push(l2l1_getU32(offset + 164 + i * 4));

    return result;
}
function UlData_encodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 6);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 7);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 8);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 9);
    l2l1_putU8(msg.ulDmrsTypeAPos, buf, off + 10);
    l2l1_putU8(msg.startSymbol, buf, off + 11);
    l2l1_putU8(msg.numOfPuschSymbols, buf, off + 12);
    l2l1_putU16(msg.startPrb, buf, off + 14);
    l2l1_putU16(msg.numOfPrb, buf, off + 16);
    l2l1_putU8(msg.mcs, buf, off + 18);
    l2l1_putU8(msg.mcsTable, buf, off + 19);
    l2l1_putU16(msg.antPort, buf, off + 20);
    l2l1_putU8(msg.spatialMode, buf, off + 22);
    l2l1_putU8(msg.codebookIndex, buf, off + 23);
    l2l1_putU8(msg.nscId, buf, off + 24);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 26);
    l2l1_putU8(msg.ulPtrsFlag, buf, off + 28);
    l2l1_putU8(msg.ulPtrsTimeDensity, buf, off + 29);
    l2l1_putU8(msg.ulPtrsFrequencyDensity, buf, off + 30);
    l2l1_putU8(msg.ulPtrsNumOfPorts, buf, off + 31);
    l2l1_putU8(msg.ulPtrsResElemOffset, buf, off + 32);
    l2l1_putU8(msg.ulPtrsNumOfGroups, buf, off + 33);
    l2l1_putU8(msg.ulPtrsNumOfSamplesPerGroup, buf, off + 34);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 35);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 36);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 38);
    l2l1_putU8(msg.numOfUciCsiPart1Bits, buf, off + 39);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 40);
    l2l1_putU16(msg.maxNumOfUciCsiPart2Symbols, buf, off + 42);
    l2l1_putU16(msg.maxNumOfUciCsiPart2BitsPlusCrcUpTo11Bits, buf, off + 44);
    l2l1_putU16(msg.maxNumOfUciCsiPart2BitsPlusCrcMoreThan11Bits, buf, off + 46);
    l2l1_putU8(msg.numOfUciAckBits, buf, off + 48);
    l2l1_putU16(msg.numOfUciAckSymbols, buf, off + 50);
    l2l1_putU16(msg.numOfUciAckSymbols1bit, buf, off + 52);
    l2l1_putU8(msg.uciOnly, buf, off + 54);
    l2l1_putF32(msg.csiPart2CodeRateUpTo11Bits, buf, off + 56);
    l2l1_putF32(msg.csiPart2CodeRateMoreThan11Bits, buf, off + 60);
    l2l1_putU8(msg.csiPart2BetaOffsetUpTo11Bits, buf, off + 64);
    l2l1_putU8(msg.csiPart2BetaOffsetMoreThan11Bits, buf, off + 65);
    l2l1_putU16(msg.numOfUciRes, buf, off + 66);
    _encodeArray(msg.csiReportStruct, buf, off + 68, UlData_encodecsiReportStruct_t, 12);
    l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 76);
    l2l1_putU8(msg.foeValid, buf, off + 84);
    l2l1_putU8(msg.baseGraph, buf, off + 85);
    l2l1_putU8(msg.numOfCodeBlocks, buf, off + 86);
    l2l1_putU16(msg.codeBlockSize, buf, off + 88);
    l2l1_putU16(msg.numOfFillerBits, buf, off + 90);
    l2l1_putU16(msg.liftSize, buf, off + 92);
    l2l1_putU8(msg.liftSizeSetIndex, buf, off + 94);
    l2l1_putU8(msg.liftSizeColumnIndex, buf, off + 95);
    l2l1_putU8(msg.modulationOrder, buf, off + 96);
    l2l1_putU8(msg.rvIndex, buf, off + 97);
    l2l1_putU16(msg.ncb, buf, off + 98);
    l2l1_putU8(msg.k0divZ, buf, off + 100);
    l2l1_putU8(msg.numOfLayers, buf, off + 101);
    l2l1_putU8(msg.puschTransCoherence, buf, off + 102);
    l2l1_putU8(msg.puschTransformPrecoderFlag, buf, off + 103);
    l2l1_putU8(msg.fullPowerPuschPowerScalingRatio, buf, off + 104);
    UlData_encodeeCpriConfigStruct_t(msg.eCpriConfigStruct, buf, off + 106);
    l2l1_putU8(msg.numOfDmrsCdmGroupWithoutData, buf, off + 116);
    for (let i = 0; i < 8; i++)
        l2l1_putU8(msg.l2CtxtAnMgt[i], buf, off + 117 + i * 1);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 126);
    for (let i = 0; i < 4; i++)
        l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetricOfAnt[i], buf, off + 128 + i * 8);
    l2l1_putU32(msg.ext.length, buf, off + 160);
    for (let i = 0; i < msg.ext.length && i < 2; i++)
        l2l1_putU32(msg.ext[i], buf, off + 160 + i * 4);
}

function UlData_decodecsiReportStruct_t(offset) {
    const result = {};

    result.riStartPos = l2l1_getU8(offset + 0);
    result.numOfRiBits = l2l1_getU8(offset + 1);
    result.csiPart1Only = l2l1_getU8(offset + 2);
    result.numOfWidebandCsiPart2BitsRi0 = l2l1_getU8(offset + 3);
    result.numOfWidebandCsiPart2BitsRi1 = l2l1_getU8(offset + 4);
    result.numOfWidebandCsiPart2BitsRi2 = l2l1_getU8(offset + 5);
    result.numOfWidebandCsiPart2BitsRi3 = l2l1_getU8(offset + 6);
    result.numOfCsiPart2Subbands = l2l1_getU8(offset + 7);
    result.numOfBitsPerSubbandRi1 = l2l1_getU8(offset + 8);
    result.numOfBitsPerSubbandRi2 = l2l1_getU8(offset + 9);
    result.numOfBitsPerSubbandRi3 = l2l1_getU8(offset + 10);
    result.numOfBitsPerSubbandRi4 = l2l1_getU8(offset + 11);

    return result;
}
function UlData_encodecsiReportStruct_t(msg, buf, off) {
    l2l1_putU8(msg.riStartPos, buf, off + 0);
    l2l1_putU8(msg.numOfRiBits, buf, off + 1);
    l2l1_putU8(msg.csiPart1Only, buf, off + 2);
    l2l1_putU8(msg.numOfWidebandCsiPart2BitsRi0, buf, off + 3);
    l2l1_putU8(msg.numOfWidebandCsiPart2BitsRi1, buf, off + 4);
    l2l1_putU8(msg.numOfWidebandCsiPart2BitsRi2, buf, off + 5);
    l2l1_putU8(msg.numOfWidebandCsiPart2BitsRi3, buf, off + 6);
    l2l1_putU8(msg.numOfCsiPart2Subbands, buf, off + 7);
    l2l1_putU8(msg.numOfBitsPerSubbandRi1, buf, off + 8);
    l2l1_putU8(msg.numOfBitsPerSubbandRi2, buf, off + 9);
    l2l1_putU8(msg.numOfBitsPerSubbandRi3, buf, off + 10);
    l2l1_putU8(msg.numOfBitsPerSubbandRi4, buf, off + 11);
}

function UlData_decodeeCpriConfigStruct_t(offset) {
    const result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 1 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 6 + i * 2));

    return result;
}
function UlData_encodeeCpriConfigStruct_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 1 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 6 + i * 2);
}

function UlData_decodePuschReceiveReq_t(offset) {
    const result = {};

    result.addrPuschReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPuschReceiveRespLo = l2l1_getU32(offset + 4);
    result.addrPuschReceiveRespHarqU = l2l1_getU32(offset + 8);
    result.addrPuschReceiveRespHarqD = l2l1_getU32(offset + 12);
    result.sfn = l2l1_getU16(offset + 16);
    result.slot = l2l1_getU8(offset + 18);
    result.subcells = _decodeArray(offset + 20, UlData_decodepuschReceiveReqSubcell_t, 16);

    return result;
}
function UlData_encodePuschReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPuschReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPuschReceiveRespLo, buf, off + 4);
    l2l1_putU32(msg.addrPuschReceiveRespHarqU, buf, off + 8);
    l2l1_putU32(msg.addrPuschReceiveRespHarqD, buf, off + 12);
    l2l1_putU16(msg.sfn, buf, off + 16);
    l2l1_putU8(msg.slot, buf, off + 18);
    _encodeArray(msg.subcells, buf, off + 20, UlData_encodepuschReceiveReqSubcell_t, 16);
}

function UlData_decodePuschReceiveRespHarqD_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodepuschReceiveRespHarqDSubcell_t, 10);

    return result;
}
function UlData_encodePuschReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodepuschReceiveRespHarqDSubcell_t, 10);
}

function UlData_decodepuschReceiveRespHarqDSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = _decodeArray(offset + 4, UlData_decodepuschReceiveRespHarqDGrants_t, 30);

    return result;
}
function UlData_encodepuschReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, UlData_encodepuschReceiveRespHarqDGrants_t, 30);
}

function UlData_decodepuschReceiveRespHarqDGrants_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ackNack1BitUci = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_ackNack1BitUci", {
        enumerable: false,
        writable: false,
        value: "ackNackUci_t",
    });
    result.dtxAck1Bit = l2l1_getU8(offset + 3);
    result.dtxMetricAck1Bit = l2l1_getU16(offset + 4);
    result.dtxThresholdAck1Bit = l2l1_getU16(offset + 6);
    result.ackNackUciMoreThan1Bit = [];
    for (let i = 0; i < 7; i++)
        result.ackNackUciMoreThan1Bit.push(l2l1_getU8(offset + 8 + i * 1));
    result.dtxAckMoreThan1Bit = l2l1_getU8(offset + 15);
    result.dtxMetricAckMoreThan1Bit = l2l1_getU16(offset + 16);
    result.dtxThresholdAckMoreThan1Bit = l2l1_getU16(offset + 18);
    result.ackCrcCheck = l2l1_getU8(offset + 20);
    Object.defineProperty(result, "__enum_ackCrcCheck", {
        enumerable: false,
        writable: false,
        value: "ackCrcCheck_t",
    });
    result.l2CtxtAnMgt = [];
    for (let i = 0; i < 8; i++)
        result.l2CtxtAnMgt.push(l2l1_getU8(offset + 21 + i * 1));

    return result;
}
function UlData_encodepuschReceiveRespHarqDGrants_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ackNack1BitUci, buf, off + 2);
    l2l1_putU8(msg.dtxAck1Bit, buf, off + 3);
    l2l1_putU16(msg.dtxMetricAck1Bit, buf, off + 4);
    l2l1_putU16(msg.dtxThresholdAck1Bit, buf, off + 6);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.ackNackUciMoreThan1Bit[i], buf, off + 8 + i * 1);
    l2l1_putU8(msg.dtxAckMoreThan1Bit, buf, off + 15);
    l2l1_putU16(msg.dtxMetricAckMoreThan1Bit, buf, off + 16);
    l2l1_putU16(msg.dtxThresholdAckMoreThan1Bit, buf, off + 18);
    l2l1_putU8(msg.ackCrcCheck, buf, off + 20);
    for (let i = 0; i < 8; i++)
        l2l1_putU8(msg.l2CtxtAnMgt[i], buf, off + 21 + i * 1);
}

function UlData_decodepuschReceiveRespHarqUSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = _decodeArray(offset + 4, UlData_decodeUePuschReceiveRespHarqU_t, 8);

    return result;
}
function UlData_encodepuschReceiveRespHarqUSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, UlData_encodeUePuschReceiveRespHarqU_t, 8);
}

function UlData_decodeUePuschReceiveRespHarqU_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 6);

    return result;
}
function UlData_encodeUePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.crc, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 3);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 4);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 6);
}

function UlData_decodePuschReceiveRespHarqU_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodepuschReceiveRespHarqUSubcell_t, 10);

    return result;
}
function UlData_encodePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodepuschReceiveRespHarqUSubcell_t, 10);
}

function UlData_decodePuschReceiveRespLo_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.processInRealTime = l2l1_getU8(offset + 4);
    result.tbStatus = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_tbStatus", {
        enumerable: false,
        writable: false,
        value: "tbStatus_t",
    });
    result.sfnForProcessing = l2l1_getU16(offset + 6);
    result.slotForProcessing = l2l1_getU8(offset + 8);
    result.totalFragmentNum = l2l1_getU8(offset + 9);
    result.rnti = l2l1_getU16(offset + 10);
    result.harqProcessIndex = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.fragmentIndex = l2l1_getU8(offset + 13);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 14);
    result.totalTbSizeBytes = l2l1_getU32(offset + 16);
    result.paddingByte = l2l1_getU8(offset + 20);
    result.data = _decodeArray(offset + 24, l2l1_getU8, 1);

    return result;
}
function UlData_encodePuschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU8(msg.processInRealTime, buf, off + 4);
    l2l1_putU8(msg.tbStatus, buf, off + 5);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 6);
    l2l1_putU8(msg.slotForProcessing, buf, off + 8);
    l2l1_putU8(msg.totalFragmentNum, buf, off + 9);
    l2l1_putU16(msg.rnti, buf, off + 10);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 12);
    l2l1_putU8(msg.fragmentIndex, buf, off + 13);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 14);
    l2l1_putU32(msg.totalTbSizeBytes, buf, off + 16);
    l2l1_putU8(msg.paddingByte, buf, off + 20);
    _encodeArray(msg.data, buf, off + 24, l2l1_putU8, 1);
}

function UlData_decodepuschReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.rtwpOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.rtwpOfAnt.push(l2l1_getF32(offset + 8 + i * 4));
    result.grants = _decodeArray(offset + 24, UlData_decodeUePuschReceiveRespPs_t, 204);

    return result;
}
function UlData_encodepuschReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.rtwpOfAnt[i], buf, off + 8 + i * 4);
    _encodeArray(msg.grants, buf, off + 24, UlData_encodeUePuschReceiveRespPs_t, 204);
}

function UlData_decodeUePuschReceiveRespPs_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.harqProcessIndex = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.shortTermCfoMetric = l1_common_decodeshortTermCfoMetric_t(offset + 8);
    result.shortTermTaMetric = l2l1_getI16(offset + 16);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 20);
    result.rxPower = l2l1_getF32(offset + 24);
    result.sinr = [];
    for (let i = 0; i < 2; i++)
        result.sinr.push(l2l1_getF32(offset + 28 + i * 4));
    result.rssi = l2l1_getF32(offset + 36);
    result.ulPmiRank1 = l2l1_getU8(offset + 40);
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 44);
    result.ulPmiRank2 = l2l1_getU8(offset + 48);
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = [];
    for (let i = 0; i < 2; i++)
        result.ulPmiRank2Sinr.push(l2l1_getF32(offset + 52 + i * 4));
    result.channelCorrMetric = [];
    for (let i = 0; i < 2; i++)
        result.channelCorrMetric.push(l2l1_getF32(offset + 60 + i * 4));
    result.ulRank = l2l1_getU8(offset + 65);
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "ulRank_t",
    });
    result.uciCsiPart1Bits = [];
    for (let i = 0; i < 7; i++)
        result.uciCsiPart1Bits.push(l2l1_getU8(offset + 66 + i * 1));
    result.csiPart1CrcCheck = l2l1_getU8(offset + 73);
    Object.defineProperty(result, "__enum_csiPart1CrcCheck", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 74);
    result.uciCsiPart2Bits = [];
    for (let i = 0; i < 7; i++)
        result.uciCsiPart2Bits.push(l2l1_getU8(offset + 75 + i * 1));
    result.csiPart2CrcCheck = l2l1_getU8(offset + 82);
    Object.defineProperty(result, "__enum_csiPart2CrcCheck", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.dtxCsiPart1 = l2l1_getU8(offset + 83);
    result.dtxMetricCsiPart1 = l2l1_getU16(offset + 84);
    result.dtxThresholdCsiPart1 = l2l1_getU16(offset + 86);
    result.dtxCsiPart2 = l2l1_getU8(offset + 88);
    result.dtxMetricCsiPart2 = l2l1_getU16(offset + 90);
    result.dtxThresholdCsiPart2 = l2l1_getU16(offset + 92);
    result.rssiOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.rssiOfAnt.push(l2l1_getF32(offset + 96 + i * 4));
    result.rxPowerOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.rxPowerOfAnt.push(l2l1_getF32(offset + 112 + i * 4));
    result.sinrOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.sinrOfAnt.push(l2l1_getF32(offset + 128 + i * 4));
    result.shortTermTaMetricOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.shortTermTaMetricOfAnt.push(l2l1_getI16(offset + 142 + i * 2));
    result.shortTermTaPeakAmpOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.shortTermTaPeakAmpOfAnt.push(l2l1_getF32(offset + 152 + i * 4));
    result.shortTermCfoMetricOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.shortTermCfoMetricOfAnt.push(l1_common_decodeshortTermCfoMetric_t(offset + 168 + i * 8));

    return result;
}
function UlData_encodeUePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
    l1_common_encodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 8);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 16);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 20);
    l2l1_putF32(msg.rxPower, buf, off + 24);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.sinr[i], buf, off + 28 + i * 4);
    l2l1_putF32(msg.rssi, buf, off + 36);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 40);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 44);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 48);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.ulPmiRank2Sinr[i], buf, off + 52 + i * 4);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.channelCorrMetric[i], buf, off + 60 + i * 4);
    l2l1_putU8(msg.ulRank, buf, off + 68);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciCsiPart1Bits[i], buf, off + 69 + i * 1);
    l2l1_putU8(msg.csiPart1CrcCheck, buf, off + 76);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 77);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciCsiPart2Bits[i], buf, off + 78 + i * 1);
    l2l1_putU8(msg.csiPart2CrcCheck, buf, off + 85);
    l2l1_putU8(msg.dtxCsiPart1, buf, off + 86);
    l2l1_putU16(msg.dtxMetricCsiPart1, buf, off + 88);
    l2l1_putU16(msg.dtxThresholdCsiPart1, buf, off + 90);
    l2l1_putU8(msg.dtxCsiPart2, buf, off + 92);
    l2l1_putU16(msg.dtxMetricCsiPart2, buf, off + 94);
    l2l1_putU16(msg.dtxThresholdCsiPart2, buf, off + 96);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.rssiOfAnt[i], buf, off + 100 + i * 4);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.rxPowerOfAnt[i], buf, off + 116 + i * 4);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.sinrOfAnt[i], buf, off + 132 + i * 4);
    for (let i = 0; i < 4; i++)
        l2l1_putI16(msg.shortTermTaMetricOfAnt[i], buf, off + 148 + i * 2);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.shortTermTaPeakAmpOfAnt[i], buf, off + 156 + i * 4);
    for (let i = 0; i < 4; i++)
        l1_common_encodeshortTermCfoMetric_t(msg.shortTermCfoMetricOfAnt[i], buf, off + 172 + i * 8);
}

function UlData_decodePuschReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.bcn_reservation_for_debug = l2l1_getU8(offset + 7);
    result.subcells = _decodeArray(offset + 8, UlData_decodepuschReceiveRespPsSubcell_t, 32);

    return result;
}
function UlData_encodePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    l2l1_putU8(msg.bcn_reservation_for_debug, buf, off + 7);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodepuschReceiveRespPsSubcell_t, 32);
}

function UlData_decodeSrsReceiveReq_t(offset) {
    const result = {};

    result.addrSrsReceiveResp = l2l1_getU32(offset + 0);
    result.addrSrsReceiveRespBm = l2l1_getU32(offset + 4);
    result.sfn = l2l1_getU16(offset + 8);
    result.slot = l2l1_getU8(offset + 10);
    result.subcells = _decodeArray(offset + 12, UlData_decodesrsReceiveReqSubcell_t, 36);

    return result;
}
function UlData_encodeSrsReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrSrsReceiveResp, buf, off + 0);
    l2l1_putU32(msg.addrSrsReceiveRespBm, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 8);
    l2l1_putU8(msg.slot, buf, off + 10);
    _encodeArray(msg.subcells, buf, off + 12, UlData_encodesrsReceiveReqSubcell_t, 36);
}

function UlData_decodesrsReceiveReqSubcell_t(offset) {
    const result = {};

    result.msgCountCtrl = l2l1_getU8(offset + 0);
    result.subcellId = l2l1_getU8(offset + 1);
    result.srsSuMimoEnable = l2l1_getU8(offset + 2);
    result.srsBmEnable = l2l1_getU8(offset + 3);
    result.srsSuMimoStruct = UlData_decodesrsSuMimoStruct_t(offset + 4);
    result.srsBmStruct = UlData_decodesrsBmStruct_t(offset + 20);

    return result;
}
function UlData_encodesrsReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.msgCountCtrl, buf, off + 0);
    l2l1_putU8(msg.subcellId, buf, off + 1);
    l2l1_putU8(msg.srsSuMimoEnable, buf, off + 2);
    l2l1_putU8(msg.srsBmEnable, buf, off + 3);
    UlData_encodesrsSuMimoStruct_t(msg.srsSuMimoStruct, buf, off + 4);
    UlData_encodesrsBmStruct_t(msg.srsBmStruct, buf, off + 20);
}

function UlData_decodesrsSuMimoStruct_t(offset) {
    const result = {};

    result.processInRealTime = l2l1_getU8(offset + 0);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.sequenceId = l2l1_getU16(offset + 6);
    result.srsReceiveReqUes = _decodeArray(offset + 8, UlData_decodesrsReceiveReqUes_t, 36);

    return result;
}
function UlData_encodesrsSuMimoStruct_t(msg, buf, off) {
    l2l1_putU8(msg.processInRealTime, buf, off + 0);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU16(msg.sequenceId, buf, off + 6);
    _encodeArray(msg.srsReceiveReqUes, buf, off + 8, UlData_encodesrsReceiveReqUes_t, 36);
}

function UlData_decodesrsReceiveReqUes_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 2);
    result.transmissionComb = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 4);
    result.srsBandwidth = l2l1_getU8(offset + 5);
    result.srsBandwidthConfig = l2l1_getU8(offset + 6);
    result.freqDomainPosition = l2l1_getU8(offset + 7);
    result.freqDomainShift = l2l1_getU16(offset + 8);
    result.cyclicShift = l2l1_getU8(offset + 10);
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 12 + i * 2));
    result.eCpriSectionId = l2l1_getU16(offset + 16);
    result.numRbgPerSubband = l2l1_getU8(offset + 18);
    result.numOfSrsPorts = l2l1_getU8(offset + 19);
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "numOfSrsTxAntennaPorts_t",
    });
    result.startPrb = l2l1_getU16(offset + 20);
    result.puschTransCoherence = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "puschTransCoherence_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 23);
    result.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32(offset + 24);
    result.legacySRS = l2l1_getU8(offset + 28);
    result.numCeAxCIndex = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 30 + i * 1));

    return result;
}
function UlData_encodesrsReceiveReqUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 2);
    l2l1_putU8(msg.transmissionComb, buf, off + 3);
    l2l1_putU8(msg.transmissionCombId, buf, off + 4);
    l2l1_putU8(msg.srsBandwidth, buf, off + 5);
    l2l1_putU8(msg.srsBandwidthConfig, buf, off + 6);
    l2l1_putU8(msg.freqDomainPosition, buf, off + 7);
    l2l1_putU16(msg.freqDomainShift, buf, off + 8);
    l2l1_putU8(msg.cyclicShift, buf, off + 10);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 12 + i * 2);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 16);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 18);
    l2l1_putU8(msg.numOfSrsPorts, buf, off + 19);
    l2l1_putU16(msg.startPrb, buf, off + 20);
    l2l1_putU8(msg.puschTransCoherence, buf, off + 22);
    l2l1_putU8(msg.fullPowerPuschPowerScalingRatio, buf, off + 23);
    l2l1_putF32(msg.powerOffsetSrsToPuschPerAllocatedRe, buf, off + 24);
    l2l1_putU8(msg.legacySRS, buf, off + 28);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 29);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 30 + i * 1);
}

function UlData_decodesrsBmStruct_t(offset) {
    const result = {};

    result.symbolPosition = l2l1_getU8(offset + 0);
    result.transmissionComb = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "srsTransmissionComb_t",
    });
    result.sequenceId = l2l1_getU16(offset + 2);
    result.numRbgPerSubband = l2l1_getU8(offset + 4);
    result.bmSubbands = _decodeArray(offset + 8, UlData_decodesrsBmSubbands_t, 12);

    return result;
}
function UlData_encodesrsBmStruct_t(msg, buf, off) {
    l2l1_putU8(msg.symbolPosition, buf, off + 0);
    l2l1_putU8(msg.transmissionComb, buf, off + 1);
    l2l1_putU16(msg.sequenceId, buf, off + 2);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 4);
    _encodeArray(msg.bmSubbands, buf, off + 8, UlData_encodesrsBmSubbands_t, 12);
}

function UlData_decodesrsBmSubbands_t(offset) {
    const result = {};

    result.srsBmCombsShifts = _decodeArray(offset + 0, UlData_decodesrsBmCombShiftPairs_t, 18);
    result.srsBmSubbandId = l2l1_getU8(offset + 8);
    result.startPrb = l2l1_getU16(offset + 10);

    return result;
}
function UlData_encodesrsBmSubbands_t(msg, buf, off) {
    _encodeArray(msg.srsBmCombsShifts, buf, off + 0, UlData_encodesrsBmCombShiftPairs_t, 18);
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 8);
    l2l1_putU16(msg.startPrb, buf, off + 10);
}

function UlData_decodesrsBmCombShiftPairs_t(offset) {
    const result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShift = _decodeArray(offset + 4, l2l1_getU8, 1);
    result.rnti = _decodeArray(offset + 12, l2l1_getU16, 2);

    return result;
}
function UlData_encodesrsBmCombShiftPairs_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    _encodeArray(msg.bmCyclicShift, buf, off + 4, l2l1_putU8, 1);
    _encodeArray(msg.rnti, buf, off + 12, l2l1_putU16, 2);
}

function UlData_decodeSrsReceiveRespBmPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.fragmentIndex = l2l1_getU8(offset + 3);
    result.totalFragmentNum = l2l1_getU8(offset + 4);
    result.polarization = l2l1_getU8(offset + 5);
    result.subcellId = l2l1_getU8(offset + 6);
    result.symbolPosition = l2l1_getU8(offset + 7);
    result.srsRespBmPsSubbands = _decodeArray(offset + 8, UlData_decodesrsRespBmPsSubbands_t, 18);

    return result;
}
function UlData_encodeSrsReceiveRespBmPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.fragmentIndex, buf, off + 3);
    l2l1_putU8(msg.totalFragmentNum, buf, off + 4);
    l2l1_putU8(msg.polarization, buf, off + 5);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.symbolPosition, buf, off + 7);
    _encodeArray(msg.srsRespBmPsSubbands, buf, off + 8, UlData_encodesrsRespBmPsSubbands_t, 18);
}

function UlData_decodesrsRespBmPsSubbands_t(offset) {
    const result = {};

    result.srsBmSubbandId = l2l1_getU8(offset + 0);
    result.data = _decodeArray(offset + 4, UlData_decodedata_t, 22);
    result.PaddingBytes = [];
    for (let i = 0; i < 8; i++)
        result.PaddingBytes.push(l2l1_getU8(offset + 9 + i * 1));

    return result;
}
function UlData_encodesrsRespBmPsSubbands_t(msg, buf, off) {
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 0);
    _encodeArray(msg.data, buf, off + 4, UlData_encodedata_t, 22);
    for (let i = 0; i < 8; i++)
        l2l1_putU8(msg.PaddingBytes[i], buf, off + 12 + i * 1);
}

function UlData_decodedata_t(offset) {
    const result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShift = l2l1_getU8(offset + 1);
    result.rnti = l2l1_getU16(offset + 2);
    result.scalingHorizontal = l2l1_getI8(offset + 4);
    result.scalingVertical = l2l1_getI8(offset + 5);
    result.covarianceMatrixHorizontal = _decodeArray(offset + 8, UlData_decodecovarianceMatrixSrs_t, 4);
    result.covarianceMatrixVertical = _decodeArray(offset + 16, UlData_decodecovarianceMatrixSrs_t, 4);

    return result;
}
function UlData_encodedata_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    l2l1_putU8(msg.bmCyclicShift, buf, off + 1);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putI8(msg.scalingHorizontal, buf, off + 4);
    l2l1_putI8(msg.scalingVertical, buf, off + 5);
    _encodeArray(msg.covarianceMatrixHorizontal, buf, off + 8, UlData_encodecovarianceMatrixSrs_t, 4);
    _encodeArray(msg.covarianceMatrixVertical, buf, off + 16, UlData_encodecovarianceMatrixSrs_t, 4);
}

function UlData_decodecovarianceMatrixSrs_t(offset) {
    const result = {};

    result.covMatrixReal = l2l1_getI16(offset + 0);
    result.covMatrixImag = l2l1_getI16(offset + 2);

    return result;
}
function UlData_encodecovarianceMatrixSrs_t(msg, buf, off) {
    l2l1_putI16(msg.covMatrixReal, buf, off + 0);
    l2l1_putI16(msg.covMatrixImag, buf, off + 2);
}

function UlData_decodeSrsReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodesrsReceiveRespPsSubcell_t, 12);

    return result;
}
function UlData_encodeSrsReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodesrsReceiveRespPsSubcell_t, 12);
}

function UlData_decodesrsReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 1);
    result.srsReceiveRespPsUes = _decodeArray(offset + 4, UlData_decodesrsReceiveRespPsUes_t, 92);

    return result;
}
function UlData_encodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 1);
    _encodeArray(msg.srsReceiveRespPsUes, buf, off + 4, UlData_encodesrsReceiveRespPsUes_t, 92);
}

function UlData_decodesrsReceiveRespPsUes_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ulRank = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 4);
    result.ulPmiRank2 = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = [];
    for (let i = 0; i < 2; i++)
        result.ulPmiRank2Sinr.push(l2l1_getF32(offset + 12 + i * 4));
    result.snr = l2l1_getF32(offset + 20);
    result.dtx = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 26);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 28);
    result.numOfSrsTxPorts = l2l1_getU8(offset + 32);
    result.rxPowerOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.rxPowerOfAnt.push(l2l1_getF32(offset + 36 + i * 4));
    result.sinrOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.sinrOfAnt.push(l2l1_getF32(offset + 52 + i * 4));
    result.shortTermTaMetricOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.shortTermTaMetricOfAnt.push(l2l1_getI16(offset + 66 + i * 2));
    result.shortTermTaPeakAmpOfAnt = [];
    for (let i = 0; i < 4; i++)
        result.shortTermTaPeakAmpOfAnt.push(l2l1_getF32(offset + 76 + i * 4));

    return result;
}
function UlData_encodesrsReceiveRespPsUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ulRank, buf, off + 2);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 3);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 8);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.ulPmiRank2Sinr[i], buf, off + 12 + i * 4);
    l2l1_putF32(msg.snr, buf, off + 20);
    l2l1_putU8(msg.dtx, buf, off + 24);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 26);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 28);
    l2l1_putU8(msg.numOfSrsTxPorts, buf, off + 32);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.rxPowerOfAnt[i], buf, off + 36 + i * 4);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.sinrOfAnt[i], buf, off + 52 + i * 4);
    for (let i = 0; i < 4; i++)
        l2l1_putI16(msg.shortTermTaMetricOfAnt[i], buf, off + 68 + i * 2);
    for (let i = 0; i < 4; i++)
        l2l1_putF32(msg.shortTermTaPeakAmpOfAnt[i], buf, off + 76 + i * 4);
}

function UlCellUe_decodeDeleteReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCellUe_encodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function UlCellUe_decodeDeleteResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cellDeleteStatus_t",
    });

    return result;
}
function UlCellUe_encodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}

function UlCellUe_decodeSetupReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
    Object.defineProperty(result, "__enum_ulBandwidth", {
        enumerable: false,
        writable: false,
        value: "EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.ulSubcellPosition = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });
    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 8 + i * 2));
    result.prachFormat = l2l1_getU8(offset + 232);
    Object.defineProperty(result, "__enum_prachFormat", {
        enumerable: false,
        writable: false,
        value: "prachFormat_t",
    });
    result.prachScs = l2l1_getU8(offset + 233);
    Object.defineProperty(result, "__enum_prachScs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.firstPrachRootSeqIndex = l2l1_getU16(offset + 234);
    result.prachStartSymbol = l2l1_getU8(offset + 236);
    Object.defineProperty(result, "__enum_prachStartSymbol", {
        enumerable: false,
        writable: false,
        value: "prachStartSymbol_t",
    });
    result.prachSequenceType = l2l1_getU8(offset + 237);
    Object.defineProperty(result, "__enum_prachSequenceType", {
        enumerable: false,
        writable: false,
        value: "prachSequenceType_t",
    });
    result.prachZeroCorrelationZoneConfig = l2l1_getU8(offset + 238);
    result.frequencyShift7pt5khz = l2l1_getU8(offset + 239);

    return result;
}
function UlCellUe_encodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.ulSubcellType, buf, off + 1);
    l2l1_putU16(msg.physCellId, buf, off + 2);
    l2l1_putU16(msg.ulBandwidth, buf, off + 4);
    l2l1_putU8(msg.scs, buf, off + 6);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 7);
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 8 + i * 2);
    l2l1_putU8(msg.prachFormat, buf, off + 232);
    l2l1_putU8(msg.prachScs, buf, off + 233);
    l2l1_putU16(msg.firstPrachRootSeqIndex, buf, off + 234);
    l2l1_putU8(msg.prachStartSymbol, buf, off + 236);
    l2l1_putU8(msg.prachSequenceType, buf, off + 237);
    l2l1_putU8(msg.prachZeroCorrelationZoneConfig, buf, off + 238);
    l2l1_putU8(msg.frequencyShift7pt5khz, buf, off + 239);
}

function UlCellUe_decodeSetupResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCellUe_encodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function UlCell_decodeDeleteReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCell_encodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function UlCell_decodeDeleteResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cellDeleteStatus_t",
    });

    return result;
}
function UlCell_encodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}

function UlCell_decodeSetupReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
    Object.defineProperty(result, "__enum_ulBandwidth", {
        enumerable: false,
        writable: false,
        value: "EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.prachFormat = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_prachFormat", {
        enumerable: false,
        writable: false,
        value: "prachFormat_t",
    });
    result.prachStartSymbol = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_prachStartSymbol", {
        enumerable: false,
        writable: false,
        value: "prachStartSymbol_t",
    });
    result.prachScs = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_prachScs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.firstPrachRootSeqIndex = l2l1_getU16(offset + 10);
    result.prachZeroCorrelationZoneConfig = l2l1_getU8(offset + 12);
    result.prachSequenceType = l2l1_getU8(offset + 13);
    Object.defineProperty(result, "__enum_prachSequenceType", {
        enumerable: false,
        writable: false,
        value: "prachSequenceType_t",
    });
    result.prachCohCombLen = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 15);
    result.rxScalingFactor = l2l1_getI16(offset + 16);
    result.pucchHoppingId = l2l1_getU16(offset + 18);
    result.phaseCompensationLutIndex = _decodeArray(offset + 20, UlCell_decodephaseCompensationLutIndex_t, 224);
    result.ulSubcellPosition = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_UlCell_Setup_t",
    });
    result.ceAxCId = [];
    for (let i = 0; i < 8; i++)
        result.ceAxCId.push(l2l1_getU16(offset + 32 + i * 2));
    result.digitalOutputEnabled = l2l1_getU8(offset + 47);
    result.digitalOutputType = l2l1_getU8(offset + 48);
    Object.defineProperty(result, "__enum_digitalOutputType", {
        enumerable: false,
        writable: false,
        value: "digitalOutputType_t",
    });
    result.digitalOutputRate = l2l1_getU8(offset + 49);
    Object.defineProperty(result, "__enum_digitalOutputRate", {
        enumerable: false,
        writable: false,
        value: "digitalOutputRate_t",
    });
    result.bbSelector = l2l1_getU8(offset + 50);
    result.harqFeedbackQueueID = l2l1_getU32(offset + 52);
    result.frequencyShift7pt5khz = l2l1_getU8(offset + 56);
    result.pfaTargetPrachId = l2l1_getU8(offset + 57);
    result.cellExtension = l2l1_getU8(offset + 58);
    Object.defineProperty(result, "__enum_cellExtension", {
        enumerable: false,
        writable: false,
        value: "cellExtension_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 59);
    result.cpriDialectIndication = l2l1_getU8(offset + 60);
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "cpriDialectIndication_t",
    });
    result.axcPosition = [];
    const axcPositionLength = l2l1_getU32(offset + 64);
    for (let i = 0; i < axcPositionLength && i < 16; i++)
        result.axcPosition.push(l2l1_getU32(offset + 68 + i * 4));
    result.prachConfigurationIndex = l2l1_getU8(offset + 129);
    result.prachPrbOffset = l2l1_getU16(offset + 130);
    result.adjustPrachThresholdOffsetDb = l2l1_getU16(offset + 132);
    result.ulDlDataSlotRatio = l2l1_getU8(offset + 134);
    Object.defineProperty(result, "__enum_ulDlDataSlotRatio", {
        enumerable: false,
        writable: false,
        value: "ulDlDataSlotRatio_t",
    });
    result.l1SubpoolId = l2l1_getU16(offset + 136);
    result.firstCellSlotId = l2l1_getU16(offset + 138);
    result.cellSlotLength = l2l1_getU16(offset + 140);
    result.ulEcpriFdBeamforming = l2l1_getU8(offset + 142);
    result.actUlEcpriExtType12 = l2l1_getU8(offset + 143);
    result.ulSubcellPoolId = l2l1_getU8(offset + 144);
    result.gainCorrection = l2l1_getI16(offset + 146);
    result.gainCorrectionForPrach = l2l1_getI16(offset + 148);
    result.ulScPerCarrierPart = _decodeArray(offset + 152, l2l1_getU16, 2);
    result.actUlEcpriPhase4 = l2l1_getU8(offset + 158);
    result.prachDtxThresholdSelection = l2l1_getU8(offset + 159);
    Object.defineProperty(result, "__enum_prachDtxThresholdSelection", {
        enumerable: false,
        writable: false,
        value: "prachDtxThresholdSelection_t",
    });
    result.actORANstep1 = l2l1_getU8(offset + 160);
    result.numberOfColTRX = l2l1_getU8(offset + 161);
    Object.defineProperty(result, "__enum_numberOfColTRX", {
        enumerable: false,
        writable: false,
        value: "numberOfColTRX_t",
    });
    result.numberOfRowTRX = l2l1_getU8(offset + 162);
    Object.defineProperty(result, "__enum_numberOfRowTRX", {
        enumerable: false,
        writable: false,
        value: "numberOfRowTRX_t",
    });
    result.ORANprachNumerology = l2l1_getU8(offset + 163);
    result.ulIqCompression = l2l1_getU8(offset + 164);
    result.ulActDownSampling = l2l1_getU8(offset + 165);
    result.mantissaSize = l2l1_getU8(offset + 166);
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "mantissaSize_t",
    });
    result.staticLongPucch = l2l1_getU8(offset + 167);
    result.localCellResId = l2l1_getU32(offset + 168);
    result.pSRSact = l2l1_getU8(offset + 172);
    result.pSRSnumCeAxCId = l2l1_getU8(offset + 173);
    Object.defineProperty(result, "__enum_pSRSnumCeAxCId", {
        enumerable: false,
        writable: false,
        value: "pSRSnumCeAxCId_t",
    });
    result.realPartOfPrecombinerRows = _decodeArray(offset + 176, l2l1_getI16, 2);
    result.imagPartOfPrecombinerRows = _decodeArray(offset + 184, l2l1_getI16, 2);
    result.realPartOfPrecombinerColumns = _decodeArray(offset + 192, l2l1_getI16, 2);
    result.imagPartOfPrecombinerColumns = _decodeArray(offset + 200, l2l1_getI16, 2);
    result.beamWeight = _decodeArray(offset + 208, UlCell_decodebeamWeight_t, 18);
    result.actHighSpeedCell = l2l1_getU8(offset + 214);

    return result;
}
function UlCell_encodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.ulSubcellType, buf, off + 1);
    l2l1_putU16(msg.physCellId, buf, off + 2);
    l2l1_putU16(msg.ulBandwidth, buf, off + 4);
    l2l1_putU8(msg.scs, buf, off + 6);
    l2l1_putU8(msg.prachFormat, buf, off + 7);
    l2l1_putU8(msg.prachStartSymbol, buf, off + 8);
    l2l1_putU8(msg.prachScs, buf, off + 9);
    l2l1_putU16(msg.firstPrachRootSeqIndex, buf, off + 10);
    l2l1_putU8(msg.prachZeroCorrelationZoneConfig, buf, off + 12);
    l2l1_putU8(msg.prachSequenceType, buf, off + 13);
    l2l1_putU8(msg.prachCohCombLen, buf, off + 14);
    l2l1_putU8(msg.totalNumberOfRAPreambles, buf, off + 15);
    l2l1_putI16(msg.rxScalingFactor, buf, off + 16);
    l2l1_putU16(msg.pucchHoppingId, buf, off + 18);
    _encodeArray(msg.phaseCompensationLutIndex, buf, off + 20, UlCell_encodephaseCompensationLutIndex_t, 224);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 28);
    l2l1_putU8(msg.eCpriLink, buf, off + 29);
    l2l1_putU8(msg.numCeAxCId, buf, off + 30);
    for (let i = 0; i < 8; i++)
        l2l1_putU16(msg.ceAxCId[i], buf, off + 32 + i * 2);
    l2l1_putU8(msg.digitalOutputEnabled, buf, off + 48);
    l2l1_putU8(msg.digitalOutputType, buf, off + 49);
    l2l1_putU8(msg.digitalOutputRate, buf, off + 50);
    l2l1_putU8(msg.bbSelector, buf, off + 51);
    l2l1_putU32(msg.harqFeedbackQueueID, buf, off + 52);
    l2l1_putU8(msg.frequencyShift7pt5khz, buf, off + 56);
    l2l1_putU8(msg.pfaTargetPrachId, buf, off + 57);
    l2l1_putU8(msg.cellExtension, buf, off + 58);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 59);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 60);
    l2l1_putU32(msg.axcPosition.length, buf, off + 64);
    for (let i = 0; i < msg.axcPosition.length && i < 16; i++)
        l2l1_putU32(msg.axcPosition[i], buf, off + 64 + i * 4);
    l2l1_putU8(msg.prachConfigurationIndex, buf, off + 128);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 130);
    l2l1_putU16(msg.adjustPrachThresholdOffsetDb, buf, off + 132);
    l2l1_putU8(msg.ulDlDataSlotRatio, buf, off + 134);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 136);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 138);
    l2l1_putU16(msg.cellSlotLength, buf, off + 140);
    l2l1_putU8(msg.ulEcpriFdBeamforming, buf, off + 142);
    l2l1_putU8(msg.actUlEcpriExtType12, buf, off + 143);
    l2l1_putU8(msg.ulSubcellPoolId, buf, off + 144);
    l2l1_putI16(msg.gainCorrection, buf, off + 146);
    l2l1_putI16(msg.gainCorrectionForPrach, buf, off + 148);
    _encodeArray(msg.ulScPerCarrierPart, buf, off + 152, l2l1_putU16, 2);
    l2l1_putU8(msg.actUlEcpriPhase4, buf, off + 160);
    l2l1_putU8(msg.prachDtxThresholdSelection, buf, off + 161);
    l2l1_putU8(msg.actORANstep1, buf, off + 162);
    l2l1_putU8(msg.numberOfColTRX, buf, off + 163);
    l2l1_putU8(msg.numberOfRowTRX, buf, off + 164);
    l2l1_putU8(msg.ORANprachNumerology, buf, off + 165);
    l2l1_putU8(msg.ulIqCompression, buf, off + 166);
    l2l1_putU8(msg.ulActDownSampling, buf, off + 167);
    l2l1_putU8(msg.mantissaSize, buf, off + 168);
    l2l1_putU8(msg.staticLongPucch, buf, off + 169);
    l2l1_putU32(msg.localCellResId, buf, off + 172);
    l2l1_putU8(msg.pSRSact, buf, off + 176);
    l2l1_putU8(msg.pSRSnumCeAxCId, buf, off + 177);
    _encodeArray(msg.realPartOfPrecombinerRows, buf, off + 180, l2l1_putI16, 2);
    _encodeArray(msg.imagPartOfPrecombinerRows, buf, off + 188, l2l1_putI16, 2);
    _encodeArray(msg.realPartOfPrecombinerColumns, buf, off + 196, l2l1_putI16, 2);
    _encodeArray(msg.imagPartOfPrecombinerColumns, buf, off + 204, l2l1_putI16, 2);
    _encodeArray(msg.beamWeight, buf, off + 212, UlCell_encodebeamWeight_t, 18);
    l2l1_putU8(msg.actHighSpeedCell, buf, off + 220);
}

function UlCell_decodebeamWeight_t(offset) {
    const result = {};

    result.patternId = l2l1_getU16(offset + 0);
    result.realPartOfWeight = _decodeArray(offset + 4, l2l1_getI16, 2);
    result.imagPartOfWeight = _decodeArray(offset + 12, l2l1_getI16, 2);

    return result;
}
function UlCell_encodebeamWeight_t(msg, buf, off) {
    l2l1_putU16(msg.patternId, buf, off + 0);
    _encodeArray(msg.realPartOfWeight, buf, off + 4, l2l1_putI16, 2);
    _encodeArray(msg.imagPartOfWeight, buf, off + 12, l2l1_putI16, 2);
}

function UlCell_decodephaseCompensationLutIndex_t(offset) {
    const result = {};

    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 0 + i * 2));

    return result;
}
function UlCell_encodephaseCompensationLutIndex_t(msg, buf, off) {
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 0 + i * 2);
}

function UlCell_decodeSetupResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCell_encodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function SyncM_decodegetPtpStatusReq_t(offset) {
    const result = {};

    result.resetCounters = l2l1_getU8(offset + 0);

    return result;
}
function SyncM_encodegetPtpStatusReq_t(msg, buf, off) {
    l2l1_putU8(msg.resetCounters, buf, off + 0);
}

function SyncM_decodegetPtpStatusResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });
    result.ptpECpriPort = [];
    const ptpECpriPortLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ptpECpriPortLength && i < 10; i++)
        result.ptpECpriPort.push(SyncM_decodePtpStatus(offset + 8 + i * 16));

    return result;
}
function SyncM_encodegetPtpStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.ptpECpriPort.length, buf, off + 4);
    for (let i = 0; i < msg.ptpECpriPort.length && i < 10; i++)
        SyncM_encodePtpStatus(msg.ptpECpriPort[i], buf, off + 4 + i * 16);
}

function SyncM_decodegetSyncEStatusReq_t(offset) {
    const result = {};

    result.resetCounters = l2l1_getU8(offset + 0);

    return result;
}
function SyncM_encodegetSyncEStatusReq_t(msg, buf, off) {
    l2l1_putU8(msg.resetCounters, buf, off + 0);
}

function SyncM_decodegetSyncEStatusResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });
    result.ssmSendingECpriPort = [];
    const ssmSendingECpriPortLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ssmSendingECpriPortLength && i < 10; i++)
        result.ssmSendingECpriPort.push(SyncM_decodeSyncEStatus(offset + 8 + i * 4));

    return result;
}
function SyncM_encodegetSyncEStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.ssmSendingECpriPort.length, buf, off + 4);
    for (let i = 0; i < msg.ssmSendingECpriPort.length && i < 10; i++)
        SyncM_encodeSyncEStatus(msg.ssmSendingECpriPort[i], buf, off + 4 + i * 4);
}

function SyncM_decodePtpStatus(offset) {
    const result = {};

    result.transmittedAnnouncePackets = l2l1_getU32(offset + 0);
    result.transmittedSyncPackets = l2l1_getU32(offset + 4);
    result.transmittedDelayRespPackets = l2l1_getU32(offset + 8);
    result.receivedDelayReqPackets = l2l1_getU32(offset + 12);

    return result;
}
function SyncM_encodePtpStatus(msg, buf, off) {
    l2l1_putU32(msg.transmittedAnnouncePackets, buf, off + 0);
    l2l1_putU32(msg.transmittedSyncPackets, buf, off + 4);
    l2l1_putU32(msg.transmittedDelayRespPackets, buf, off + 8);
    l2l1_putU32(msg.receivedDelayReqPackets, buf, off + 12);
}

function SyncM_decodestartPtpReq_t(offset) {
    const result = {};

    result.defaultDsPriority1 = l2l1_getU8(offset + 0);
    result.defaultDsPriority2 = l2l1_getU8(offset + 1);
    result.defaultDsDomainNumber = l2l1_getU8(offset + 2);
    result.stepsRemoved = l2l1_getU8(offset + 3);
    result.logMinDelayReqInterval = l2l1_getI32(offset + 4);
    result.logSyncInterval = l2l1_getI32(offset + 8);
    result.logAnnounceInterval = l2l1_getI32(offset + 12);
    result.transportMode = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_transportMode", {
        enumerable: false,
        writable: false,
        value: "transportMode_t",
    });
    result.castMode = l2l1_getU8(offset + 17);
    Object.defineProperty(result, "__enum_castMode", {
        enumerable: false,
        writable: false,
        value: "castMode_t",
    });
    result.ptpEthMulticastAddress = l2l1_getU64(offset + 24);
    Object.defineProperty(result, "__enum_ptpEthMulticastAddress", {
        enumerable: false,
        writable: false,
        value: "ptpEthMulticastAddress_t",
    });
    result.clockIdentity = l2l1_getU64(offset + 32);
    result.portNumberOffset = l2l1_getU8(offset + 40);
    result.secondaryBcnOffset = l2l1_getI32(offset + 44);
    result.clockClass = l2l1_getU8(offset + 48);
    Object.defineProperty(result, "__enum_clockClass", {
        enumerable: false,
        writable: false,
        value: "clockClass_t",
    });
    result.clockAccuracy = l2l1_getU8(offset + 49);
    result.offsetScaledLogVariance = l2l1_getU16(offset + 50);
    result.currentUtcOffset = l2l1_getI32(offset + 52);
    result.currentUtcOffsetValid = l2l1_getU8(offset + 56);
    result.leap59 = l2l1_getU8(offset + 57);
    result.leap61 = l2l1_getU8(offset + 58);
    result.timeTraceable = l2l1_getU8(offset + 59);
    result.frequencyTraceable = l2l1_getU8(offset + 60);
    result.ptpTimescale = l2l1_getU8(offset + 61);
    result.timeSource = l2l1_getU8(offset + 62);
    result.ptpECpriPort = [];
    const ptpECpriPortLength = l2l1_getU32(offset + 64);
    for (let i = 0; i < ptpECpriPortLength && i < 10; i++)
        result.ptpECpriPort.push(l2l1_getU8(offset + 68 + i * 1));

    return result;
}
function SyncM_encodestartPtpReq_t(msg, buf, off) {
    l2l1_putU8(msg.defaultDsPriority1, buf, off + 0);
    l2l1_putU8(msg.defaultDsPriority2, buf, off + 1);
    l2l1_putU8(msg.defaultDsDomainNumber, buf, off + 2);
    l2l1_putU8(msg.stepsRemoved, buf, off + 3);
    l2l1_putI32(msg.logMinDelayReqInterval, buf, off + 4);
    l2l1_putI32(msg.logSyncInterval, buf, off + 8);
    l2l1_putI32(msg.logAnnounceInterval, buf, off + 12);
    l2l1_putU8(msg.transportMode, buf, off + 16);
    l2l1_putU8(msg.castMode, buf, off + 17);
    l2l1_putU64(msg.ptpEthMulticastAddress, buf, off + 24);
    l2l1_putU64(msg.clockIdentity, buf, off + 32);
    l2l1_putU8(msg.portNumberOffset, buf, off + 40);
    l2l1_putI32(msg.secondaryBcnOffset, buf, off + 44);
    l2l1_putU8(msg.clockClass, buf, off + 48);
    l2l1_putU8(msg.clockAccuracy, buf, off + 49);
    l2l1_putU16(msg.offsetScaledLogVariance, buf, off + 50);
    l2l1_putI32(msg.currentUtcOffset, buf, off + 52);
    l2l1_putU8(msg.currentUtcOffsetValid, buf, off + 56);
    l2l1_putU8(msg.leap59, buf, off + 57);
    l2l1_putU8(msg.leap61, buf, off + 58);
    l2l1_putU8(msg.timeTraceable, buf, off + 59);
    l2l1_putU8(msg.frequencyTraceable, buf, off + 60);
    l2l1_putU8(msg.ptpTimescale, buf, off + 61);
    l2l1_putU8(msg.timeSource, buf, off + 62);
    l2l1_putU32(msg.ptpECpriPort.length, buf, off + 64);
    for (let i = 0; i < msg.ptpECpriPort.length && i < 10; i++)
        l2l1_putU8(msg.ptpECpriPort[i], buf, off + 64 + i * 1);
}

function SyncM_decodestartPtpResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodestartPtpResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SyncM_decodestartSyncEReq_t(offset) {
    const result = {};

    result.g781NetworkOption = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_g781NetworkOption", {
        enumerable: false,
        writable: false,
        value: "g781NetworkOption_t",
    });
    result.ssmQl = l2l1_getU8(offset + 1);
    result.ssmSendingECpriPort = [];
    const ssmSendingECpriPortLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ssmSendingECpriPortLength && i < 10; i++)
        result.ssmSendingECpriPort.push(l2l1_getU8(offset + 8 + i * 1));

    return result;
}
function SyncM_encodestartSyncEReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    l2l1_putU32(msg.ssmSendingECpriPort.length, buf, off + 4);
    for (let i = 0; i < msg.ssmSendingECpriPort.length && i < 10; i++)
        l2l1_putU8(msg.ssmSendingECpriPort[i], buf, off + 4 + i * 1);
}

function SyncM_decodestartSyncEResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodestartSyncEResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SyncM_decodestatusInd_t(offset) {
    const result = {};

    result.syncmasterStatus = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_syncmasterStatus", {
        enumerable: false,
        writable: false,
        value: "syncmasterStatus_t",
    });

    return result;
}
function SyncM_encodestatusInd_t(msg, buf, off) {
    l2l1_putU8(msg.syncmasterStatus, buf, off + 0);
}

function SyncM_decodestopPtpReq_t(offset) {
    const result = {};

    result.dummy = l2l1_getI8(offset + 0);

    return result;
}
function SyncM_encodestopPtpReq_t(msg, buf, off) {
    l2l1_putI8(msg.dummy, buf, off + 0);
}

function SyncM_decodestopPtpResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodestopPtpResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SyncM_decodestopSyncEReq_t(offset) {
    const result = {};

    result.dummy = l2l1_getI8(offset + 0);

    return result;
}
function SyncM_encodestopSyncEReq_t(msg, buf, off) {
    l2l1_putI8(msg.dummy, buf, off + 0);
}

function SyncM_decodestopSyncEResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodestopSyncEResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SyncM_decodeSyncEStatus(offset) {
    const result = {};

    result.transmittedEsmcPackets = l2l1_getU32(offset + 0);

    return result;
}
function SyncM_encodeSyncEStatus(msg, buf, off) {
    l2l1_putU32(msg.transmittedEsmcPackets, buf, off + 0);
}

function SyncM_decodeupdatePtpConfigReq_t(offset) {
    const result = {};

    result.defaultDsDomainNumber = l2l1_getU8(offset + 0);
    result.ptpEthMulticastAddress = l2l1_getU64(offset + 8);
    Object.defineProperty(result, "__enum_ptpEthMulticastAddress", {
        enumerable: false,
        writable: false,
        value: "ptpEthMulticastAddress_t",
    });
    result.clockClass = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_clockClass", {
        enumerable: false,
        writable: false,
        value: "clockClass_t",
    });
    result.clockAccuracy = l2l1_getU8(offset + 17);
    result.offsetScaledLogVariance = l2l1_getU16(offset + 18);
    result.currentUtcOffset = l2l1_getU32(offset + 20);
    result.currentUtcOffsetValid = l2l1_getU8(offset + 24);
    result.leap59 = l2l1_getU8(offset + 25);
    result.leap61 = l2l1_getU8(offset + 26);
    result.timeTraceable = l2l1_getU8(offset + 27);
    result.frequencyTraceable = l2l1_getU8(offset + 28);
    result.ptpTimescale = l2l1_getU8(offset + 29);
    result.timeSource = l2l1_getU8(offset + 30);
    result.ptpECpriPort = [];
    const ptpECpriPortLength = l2l1_getU32(offset + 32);
    for (let i = 0; i < ptpECpriPortLength && i < 10; i++)
        result.ptpECpriPort.push(l2l1_getU8(offset + 36 + i * 1));

    return result;
}
function SyncM_encodeupdatePtpConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.defaultDsDomainNumber, buf, off + 0);
    l2l1_putU64(msg.ptpEthMulticastAddress, buf, off + 8);
    l2l1_putU8(msg.clockClass, buf, off + 16);
    l2l1_putU8(msg.clockAccuracy, buf, off + 17);
    l2l1_putU16(msg.offsetScaledLogVariance, buf, off + 18);
    l2l1_putU32(msg.currentUtcOffset, buf, off + 20);
    l2l1_putU8(msg.currentUtcOffsetValid, buf, off + 24);
    l2l1_putU8(msg.leap59, buf, off + 25);
    l2l1_putU8(msg.leap61, buf, off + 26);
    l2l1_putU8(msg.timeTraceable, buf, off + 27);
    l2l1_putU8(msg.frequencyTraceable, buf, off + 28);
    l2l1_putU8(msg.ptpTimescale, buf, off + 29);
    l2l1_putU8(msg.timeSource, buf, off + 30);
    l2l1_putU32(msg.ptpECpriPort.length, buf, off + 32);
    for (let i = 0; i < msg.ptpECpriPort.length && i < 10; i++)
        l2l1_putU8(msg.ptpECpriPort[i], buf, off + 32 + i * 1);
}

function SyncM_decodeupdatePtpConfigResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodeupdatePtpConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SyncM_decodeupdateSyncEConfigReq_t(offset) {
    const result = {};

    result.g781NetworkOption = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_g781NetworkOption", {
        enumerable: false,
        writable: false,
        value: "g781NetworkOption_t",
    });
    result.ssmQl = l2l1_getU8(offset + 1);
    result.ssmSendingECpriPort = [];
    const ssmSendingECpriPortLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ssmSendingECpriPortLength && i < 10; i++)
        result.ssmSendingECpriPort.push(l2l1_getU8(offset + 8 + i * 1));

    return result;
}
function SyncM_encodeupdateSyncEConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    l2l1_putU32(msg.ssmSendingECpriPort.length, buf, off + 4);
    for (let i = 0; i < msg.ssmSendingECpriPort.length && i < 10; i++)
        l2l1_putU8(msg.ssmSendingECpriPort[i], buf, off + 4 + i * 1);
}

function SyncM_decodeupdateSyncEConfigResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function SyncM_encodeupdateSyncEConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function SmDataUe_decodePdcchInd_t(offset) {
    const result = {};

    result.pdcchSendReq = _decodeArray(offset + 0, DlData_decodePdcchSendReq_t, 16);

    return result;
}
function SmDataUe_encodePdcchInd_t(msg, buf, off) {
    _encodeArray(msg.pdcchSendReq, buf, off + 0, DlData_encodePdcchSendReq_t, 16);
}

function l1_common_decodeFastAntennaSnapshotEventsList_t(offset) {
    const result = {};

    result.crnti = l2l1_getU16(offset + 0);
    result.eventNb = l2l1_getU8(offset + 2);
    result.eventType = l2l1_getU8(offset + 3);

    return result;
}
function l1_common_encodeFastAntennaSnapshotEventsList_t(msg, buf, off) {
    l2l1_putU16(msg.crnti, buf, off + 0);
    l2l1_putU8(msg.eventNb, buf, off + 2);
    l2l1_putU8(msg.eventType, buf, off + 3);
}

function l1_common_decodeL1Addresses(offset) {
    const result = {};

    result.dl = l1_common_decodeL1DlAddresses(offset + 0);
    result.ul = l1_common_decodeL1UlAddresses(offset + 36);

    return result;
}
function l1_common_encodeL1Addresses(msg, buf, off) {
    l1_common_encodeL1DlAddresses(msg.dl, buf, off + 0);
    l1_common_encodeL1UlAddresses(msg.ul, buf, off + 36);
}

function l1_common_decodeL1DlAddresses(offset) {
    const result = {};

    result.ssBlockSendReq = l2l1_getU32(offset + 0);
    result.slotTypeReq = l2l1_getU32(offset + 4);
    result.pdschSendReq = l2l1_getU32(offset + 8);
    result.pdschPayloadTbSendReq = l2l1_getU32(offset + 12);
    result.patternConfigReq = l2l1_getU32(offset + 16);
    result.pdcchSendReq = l2l1_getU32(offset + 20);
    result.csiRsSendReq = l2l1_getU32(offset + 24);
    result.fastAntennaSnapshotReqAddress = l2l1_getU32(offset + 28);
    result.emptySendReqAddress = l2l1_getU32(offset + 32);

    return result;
}
function l1_common_encodeL1DlAddresses(msg, buf, off) {
    l2l1_putU32(msg.ssBlockSendReq, buf, off + 0);
    l2l1_putU32(msg.slotTypeReq, buf, off + 4);
    l2l1_putU32(msg.pdschSendReq, buf, off + 8);
    l2l1_putU32(msg.pdschPayloadTbSendReq, buf, off + 12);
    l2l1_putU32(msg.patternConfigReq, buf, off + 16);
    l2l1_putU32(msg.pdcchSendReq, buf, off + 20);
    l2l1_putU32(msg.csiRsSendReq, buf, off + 24);
    l2l1_putU32(msg.fastAntennaSnapshotReqAddress, buf, off + 28);
    l2l1_putU32(msg.emptySendReqAddress, buf, off + 32);
}

function l1_common_decodeL1UlAddresses(offset) {
    const result = {};

    result.puschReceiveReq = l2l1_getU32(offset + 0);
    result.pucchReceiveReq = l2l1_getU32(offset + 4);
    result.srsReceiveReq = l2l1_getU32(offset + 8);
    result.prachReceiveReq = l2l1_getU32(offset + 12);
    result.fastAntennaSnapshotReqAddress = l2l1_getU32(offset + 16);
    result.emptyReceiveReqAddress = l2l1_getU32(offset + 20);

    return result;
}
function l1_common_encodeL1UlAddresses(msg, buf, off) {
    l2l1_putU32(msg.puschReceiveReq, buf, off + 0);
    l2l1_putU32(msg.pucchReceiveReq, buf, off + 4);
    l2l1_putU32(msg.srsReceiveReq, buf, off + 8);
    l2l1_putU32(msg.prachReceiveReq, buf, off + 12);
    l2l1_putU32(msg.fastAntennaSnapshotReqAddress, buf, off + 16);
    l2l1_putU32(msg.emptyReceiveReqAddress, buf, off + 20);
}

function l1_common_decodeL2Addresses(offset) {
    const result = {};

    result.prachReceiveInd = l2l1_getU32(offset + 0);

    return result;
}
function l1_common_encodeL2Addresses(msg, buf, off) {
    l2l1_putU32(msg.prachReceiveInd, buf, off + 0);
}

function l1_common_decodelongTermCfoMetric_t(offset) {
    const result = {};

    result.Re = l2l1_getF32(offset + 0);
    result.Im = l2l1_getF32(offset + 4);

    return result;
}
function l1_common_encodelongTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.Re, buf, off + 0);
    l2l1_putF32(msg.Im, buf, off + 4);
}

function l1_common_decodeshortTermCfoMetric_t(offset) {
    const result = {};

    result.I = l2l1_getF32(offset + 0);
    result.Q = l2l1_getF32(offset + 4);

    return result;
}
function l1_common_encodeshortTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.I, buf, off + 0);
    l2l1_putF32(msg.Q, buf, off + 4);
}

function L1Log_decodeAntennaSnapshotConfigurationReq_t(offset) {
    const result = {};

    result.numDlCellId = l2l1_getU8(offset + 0);
    result.dlCellId = [];
    for (let i = 0; i < 4; i++)
        result.dlCellId.push(l2l1_getU32(offset + 4 + i * 4));
    result.numUlCellId = l2l1_getU8(offset + 17);
    result.ulCellId = [];
    for (let i = 0; i < 4; i++)
        result.ulCellId.push(l2l1_getU32(offset + 20 + i * 4));
    result.numUlSubCellId = l2l1_getU8(offset + 34);
    result.ulSubcellId = [];
    for (let i = 0; i < 4; i++)
        result.ulSubcellId.push(l2l1_getU8(offset + 35 + i * 1));
    result.numDlSubCellId = l2l1_getU8(offset + 39);
    result.dlSubcellId = [];
    for (let i = 0; i < 4; i++)
        result.dlSubcellId.push(l2l1_getU8(offset + 40 + i * 1));
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 44);
    Object.defineProperty(result, "__enum_antSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotL1EventEnableType",
    });

    return result;
}
function L1Log_encodeAntennaSnapshotConfigurationReq_t(msg, buf, off) {
    l2l1_putU8(msg.numDlCellId, buf, off + 0);
    for (let i = 0; i < 4; i++)
        l2l1_putU32(msg.dlCellId[i], buf, off + 4 + i * 4);
    l2l1_putU8(msg.numUlCellId, buf, off + 20);
    for (let i = 0; i < 4; i++)
        l2l1_putU32(msg.ulCellId[i], buf, off + 24 + i * 4);
    l2l1_putU8(msg.numUlSubCellId, buf, off + 40);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ulSubcellId[i], buf, off + 41 + i * 1);
    l2l1_putU8(msg.numDlSubCellId, buf, off + 45);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.dlSubcellId[i], buf, off + 46 + i * 1);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 50);
}

function L1Log_decodeAntennaSnapshotConfigurationResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotConfigurationStatusType",
    });

    return result;
}
function L1Log_encodeAntennaSnapshotConfigurationResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function L1Log_decodeAntennaSnapshotInd_t(offset) {
    const result = {};

    result.bcnN = l2l1_getU64(offset + 0);
    result.reportType = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_reportType", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotRequestType",
    });
    result.numberOfFiles = l2l1_getU8(offset + 9);
    result.fileList = [];
    const fileListLength = l2l1_getU32(offset + 12);
    for (let i = 0; i < fileListLength && i < 32; i++)
        result.fileList.push(L1Log_decodeantennaSnapshotFile_t(offset + 16 + i * 92));

    return result;
}
function L1Log_encodeAntennaSnapshotInd_t(msg, buf, off) {
    l2l1_putU64(msg.bcnN, buf, off + 0);
    l2l1_putU8(msg.reportType, buf, off + 8);
    l2l1_putU8(msg.numberOfFiles, buf, off + 9);
    l2l1_putU32(msg.fileList.length, buf, off + 12);
    for (let i = 0; i < msg.fileList.length && i < 32; i++)
        L1Log_encodeantennaSnapshotFile_t(msg.fileList[i], buf, off + 12 + i * 92);
}

function L1Log_decodeantennaSnapshotFile_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });
    result.fileSize = l2l1_getU32(offset + 4);
    result.fileName = [];
    const fileNameLength = l2l1_getU32(offset + 8);
    for (let i = 0; i < fileNameLength && i < 80; i++)
        result.fileName.push(l2l1_getU8(offset + 12 + i * 1));

    return result;
}
function L1Log_encodeantennaSnapshotFile_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.fileSize, buf, off + 4);
    l2l1_putU32(msg.fileName.length, buf, off + 8);
    for (let i = 0; i < msg.fileName.length && i < 80; i++)
        l2l1_putU8(msg.fileName[i], buf, off + 8 + i * 1);
}

function L1Log_decodeAntennaSnapshotReq_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.requestType = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_requestType", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotRequestType",
    });
    result.captureMode = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_captureMode", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotCaptureModeType",
    });
    result.oneFilePerPath = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_oneFilePerPath", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotFileFormatType",
    });
    result.responseAck = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_responseAck", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotSendAckType",
    });

    return result;
}
function L1Log_encodeAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.requestType, buf, off + 3);
    l2l1_putU8(msg.captureMode, buf, off + 4);
    l2l1_putU8(msg.oneFilePerPath, buf, off + 5);
    l2l1_putU8(msg.responseAck, buf, off + 6);
}

function L1Log_decodeAntennaSnapshotResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });

    return result;
}
function L1Log_encodeAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function L1Log_decodeShowTraceListReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.physCellId = l2l1_getU16(offset + 4);
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_antSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "EAntSnapshotL1Enabled",
    });

    return result;
}
function L1Log_encodeShowTraceListReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 6);
}

function L1Log_decodeShowTraceListResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });
    result.traceList = [];
    const traceListLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < traceListLength && i < 100; i++)
        result.traceList.push(l2l1_getU8(offset + 8 + i * 1));

    return result;
}
function L1Log_encodeShowTraceListResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.traceList.length, buf, off + 4);
    for (let i = 0; i < msg.traceList.length && i < 100; i++)
        l2l1_putU8(msg.traceList[i], buf, off + 4 + i * 1);
}

function L1Log_decodeTraceInd_t(offset) {
    const result = {};

    result.bcn = l2l1_getU64(offset + 0);
    result.msgSeqNum = l2l1_getU16(offset + 8);
    result.tracePayload = [];
    const tracePayloadLength = l2l1_getU32(offset + 12);
    for (let i = 0; i < tracePayloadLength && i < 1400; i++)
        result.tracePayload.push(l2l1_getU8(offset + 16 + i * 1));

    return result;
}
function L1Log_encodeTraceInd_t(msg, buf, off) {
    l2l1_putU64(msg.bcn, buf, off + 0);
    l2l1_putU16(msg.msgSeqNum, buf, off + 8);
    l2l1_putU32(msg.tracePayload.length, buf, off + 12);
    for (let i = 0; i < msg.tracePayload.length && i < 1400; i++)
        l2l1_putU8(msg.tracePayload[i], buf, off + 12 + i * 1);
}

function L1Log_decodeTraceReqHeader_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.physCellId = l2l1_getU16(offset + 4);
    result.trswEQID = l2l1_getU32(offset + 8);
    result.startStopReport = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_startStopReport", {
        enumerable: false,
        writable: false,
        value: "EReportType",
    });
    result.outputMode = l2l1_getU8(offset + 13);
    Object.defineProperty(result, "__enum_outputMode", {
        enumerable: false,
        writable: false,
        value: "EOutputMode",
    });

    return result;
}
function L1Log_encodeTraceReqHeader_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU32(msg.trswEQID, buf, off + 8);
    l2l1_putU8(msg.startStopReport, buf, off + 12);
    l2l1_putU8(msg.outputMode, buf, off + 13);
}

function L1Log_decodeTraceReqEntry_t(offset) {
    const result = {};

    result.subtype = l2l1_getU16(offset + 0);
    result.traceId = l2l1_getU16(offset + 2);
    result.nbReports = l2l1_getU16(offset + 4);

    return result;
}
function L1Log_encodeTraceReqEntry_t(msg, buf, off) {
    l2l1_putU16(msg.subtype, buf, off + 0);
    l2l1_putU16(msg.traceId, buf, off + 2);
    l2l1_putU16(msg.nbReports, buf, off + 4);
}

function L1Log_decodeTraceReq_t(offset) {
    const result = {};

    result.header = L1Log_decodeTraceReqHeader_t(offset + 0);
    result.traces = [];
    const tracesLength = l2l1_getU32(offset + 16);
    for (let i = 0; i < tracesLength && i < 10; i++)
        result.traces.push(L1Log_decodeTraceReqEntry_t(offset + 20 + i * 6));

    return result;
}
function L1Log_encodeTraceReq_t(msg, buf, off) {
    L1Log_encodeTraceReqHeader_t(msg.header, buf, off + 0);
    l2l1_putU32(msg.traces.length, buf, off + 16);
    for (let i = 0; i < msg.traces.length && i < 10; i++)
        L1Log_encodeTraceReqEntry_t(msg.traces[i], buf, off + 16 + i * 6);
}

function L1Log_decodeTraceResp_t(offset) {
    const result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.status = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });

    return result;
}
function L1Log_encodeTraceResp_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 2);
}

function L1Fcp_decodebfwWeights_t(offset) {
    const result = {};

    result.bfwI = l2l1_getU16(offset + 0);
    result.bfwQ = l2l1_getU16(offset + 2);

    return result;
}
function L1Fcp_encodebfwWeights_t(msg, buf, off) {
    l2l1_putU16(msg.bfwI, buf, off + 0);
    l2l1_putU16(msg.bfwQ, buf, off + 2);
}

function L1Fcp_decodeDlUlChannelsReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.eNbId = l2l1_getU32(offset + 4);
    result.eAxcId = l2l1_getU16(offset + 8);
    result.dataDirection = l2l1_getU8(offset + 10);
    Object.defineProperty(result, "__enum_dataDirection", {
        enumerable: false,
        writable: false,
        value: "dataDirection_t",
    });
    result.filterIndex = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_filterIndex", {
        enumerable: false,
        writable: false,
        value: "filterIndex_t",
    });
    result.frameId = l2l1_getU8(offset + 12);
    result.subFrameId = l2l1_getU8(offset + 13);
    result.slotId = l2l1_getU8(offset + 14);
    result.startSymbolId = l2l1_getU8(offset + 15);
    result.section = _decodeArray(offset + 16, L1Fcp_decodesection_t, 32);

    return result;
}
function L1Fcp_encodeDlUlChannelsReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.eNbId, buf, off + 4);
    l2l1_putU16(msg.eAxcId, buf, off + 8);
    l2l1_putU8(msg.dataDirection, buf, off + 10);
    l2l1_putU8(msg.filterIndex, buf, off + 11);
    l2l1_putU8(msg.frameId, buf, off + 12);
    l2l1_putU8(msg.subFrameId, buf, off + 13);
    l2l1_putU8(msg.slotId, buf, off + 14);
    l2l1_putU8(msg.startSymbolId, buf, off + 15);
    _encodeArray(msg.section, buf, off + 16, L1Fcp_encodesection_t, 32);
}

function L1Fcp_decodesection_t(offset) {
    const result = {};

    result.sectionId = l2l1_getU16(offset + 0);
    result.rb = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_rb", {
        enumerable: false,
        writable: false,
        value: "rb_t",
    });
    result.symInc = l2l1_getU8(offset + 3);
    result.startPrbc = l2l1_getU16(offset + 4);
    result.numPrbc = l2l1_getU8(offset + 6);
    result.numSymbol = l2l1_getU16(offset + 8);
    result.reMask = l2l1_getU16(offset + 10);
    result.beamId = l2l1_getU16(offset + 12);
    result.bfwSectionExtensions = _decodeArray(offset + 16, L1Fcp_decodebfwSectionExtensions_t, 10);
    result.nonContPrbAllocSectionExtensions = _decodeArray(offset + 24, L1Fcp_decodenonContPrbAllocSectionExtensions_t, 12);

    return result;
}
function L1Fcp_encodesection_t(msg, buf, off) {
    l2l1_putU16(msg.sectionId, buf, off + 0);
    l2l1_putU8(msg.rb, buf, off + 2);
    l2l1_putU8(msg.symInc, buf, off + 3);
    l2l1_putU16(msg.startPrbc, buf, off + 4);
    l2l1_putU8(msg.numPrbc, buf, off + 6);
    l2l1_putU16(msg.numSymbol, buf, off + 8);
    l2l1_putU16(msg.reMask, buf, off + 10);
    l2l1_putU16(msg.beamId, buf, off + 12);
    _encodeArray(msg.bfwSectionExtensions, buf, off + 16, L1Fcp_encodebfwSectionExtensions_t, 10);
    _encodeArray(msg.nonContPrbAllocSectionExtensions, buf, off + 24, L1Fcp_encodenonContPrbAllocSectionExtensions_t, 12);
}

function L1Fcp_decodebfwSectionExtensions_t(offset) {
    const result = {};

    result.bfwCompHdr = l2l1_getU8(offset + 0);
    result.bfwCompParam = l2l1_getU8(offset + 1);
    result.bfwWeights = _decodeArray(offset + 4, L1Fcp_decodebfwWeights_t, 4);

    return result;
}
function L1Fcp_encodebfwSectionExtensions_t(msg, buf, off) {
    l2l1_putU8(msg.bfwCompHdr, buf, off + 0);
    l2l1_putU8(msg.bfwCompParam, buf, off + 1);
    _encodeArray(msg.bfwWeights, buf, off + 4, L1Fcp_encodebfwWeights_t, 4);
}

function L1Fcp_decodenonContPrbAllocSectionExtensions_t(offset) {
    const result = {};

    result.rbgMask = l2l1_getU32(offset + 0);
    result.rbgSize = l2l1_getU16(offset + 4);
    result.symbolMask = l2l1_getU16(offset + 6);
    result.priority = l2l1_getI8(offset + 8);

    return result;
}
function L1Fcp_encodenonContPrbAllocSectionExtensions_t(msg, buf, off) {
    l2l1_putU32(msg.rbgMask, buf, off + 0);
    l2l1_putU16(msg.rbgSize, buf, off + 4);
    l2l1_putU16(msg.symbolMask, buf, off + 6);
    l2l1_putI8(msg.priority, buf, off + 8);
}

function L1ECpri_decodeAPI2ConfigureTransportReq_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "Direction_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.ceAxCinfo = [];
    const ceAxCinfoLength = l2l1_getU32(offset + 8);
    for (let i = 0; i < ceAxCinfoLength && i < 64; i++)
        result.ceAxCinfo.push(L1ECpri_decodeAPI2ceAxCconfig_t(offset + 12 + i * 14));

    return result;
}
function L1ECpri_encodeAPI2ConfigureTransportReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.eCpriLink, buf, off + 5);
    l2l1_putU32(msg.ceAxCinfo.length, buf, off + 8);
    for (let i = 0; i < msg.ceAxCinfo.length && i < 64; i++)
        L1ECpri_encodeAPI2ceAxCconfig_t(msg.ceAxCinfo[i], buf, off + 8 + i * 14);
}

function L1ECpri_decodeAPI2ceAxCconfig_t(offset) {
    const result = {};

    result.ceAxCId = l2l1_getU16(offset + 0);
    result.ruMacAddress = [];
    const ruMacAddressLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ruMacAddressLength && i < 6; i++)
        result.ruMacAddress.push(l2l1_getU8(offset + 8 + i * 1));
    result.vlanId = l2l1_getU16(offset + 12);

    return result;
}
function L1ECpri_encodeAPI2ceAxCconfig_t(msg, buf, off) {
    l2l1_putU16(msg.ceAxCId, buf, off + 0);
    l2l1_putU32(msg.ruMacAddress.length, buf, off + 4);
    for (let i = 0; i < msg.ruMacAddress.length && i < 6; i++)
        l2l1_putU8(msg.ruMacAddress[i], buf, off + 4 + i * 1);
    l2l1_putU16(msg.vlanId, buf, off + 10);
}

function L1ECpri_decodeAPI2ConfigureTransportResp_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.eCpriLink = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.direction = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "Direction_t",
    });
    result.state = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeAPI2ConfigureTransportResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.eCpriLink, buf, off + 4);
    l2l1_putU8(msg.direction, buf, off + 5);
    l2l1_putU8(msg.state, buf, off + 6);
}

function L1ECpri_decodeConfigureLinksReq_t(offset) {
    const result = {};

    result.numOfItems = l2l1_getU32(offset + 0);
    result.eCpriLink = [];
    const eCpriLinkLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < eCpriLinkLength && i < 16; i++)
        result.eCpriLink.push(L1ECpri_decodeSECpriLinkItem_t(offset + 8 + i * 1));
    result.scs = l2l1_getU8(offset + 24);

    return result;
}
function L1ECpri_encodeConfigureLinksReq_t(msg, buf, off) {
    l2l1_putU32(msg.numOfItems, buf, off + 0);
    l2l1_putU32(msg.eCpriLink.length, buf, off + 4);
    for (let i = 0; i < msg.eCpriLink.length && i < 16; i++)
        L1ECpri_encodeSECpriLinkItem_t(msg.eCpriLink[i], buf, off + 4 + i * 1);
    l2l1_putU8(msg.scs, buf, off + 20);
}

function L1ECpri_decodeSECpriLinkItem_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });

    return result;
}
function L1ECpri_encodeSECpriLinkItem_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
}

function L1ECpri_decodeConfigureLinksResp_t(offset) {
    const result = {};

    result.state = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeConfigureLinksResp_t(msg, buf, off) {
    l2l1_putU8(msg.state, buf, off + 0);
}

function L1ECpri_decodeConfigureMeasurementsReq_t(offset) {
    const result = {};

    result.sicad = l2l1_getU32(offset + 0);
    result.measIntervalMsgRcv = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_measIntervalMsgRcv", {
        enumerable: false,
        writable: false,
        value: "EPerfMeasInterval",
    });

    return result;
}
function L1ECpri_encodeConfigureMeasurementsReq_t(msg, buf, off) {
    l2l1_putU32(msg.sicad, buf, off + 0);
    l2l1_putU8(msg.measIntervalMsgRcv, buf, off + 4);
}

function L1ECpri_decodeConfigureMeasurementsResp_t(offset) {
    const result = {};

    result.state = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeConfigureMeasurementsResp_t(msg, buf, off) {
    l2l1_putU8(msg.state, buf, off + 0);
}

function L1ECpri_decodeConfigureTransportReq_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.ruMacAddress = [];
    const ruMacAddressLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ruMacAddressLength && i < 6; i++)
        result.ruMacAddress.push(l2l1_getU8(offset + 8 + i * 1));
    result.vlanId = l2l1_getU16(offset + 12);

    return result;
}
function L1ECpri_encodeConfigureTransportReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.ruMacAddress.length, buf, off + 4);
    for (let i = 0; i < msg.ruMacAddress.length && i < 6; i++)
        l2l1_putU8(msg.ruMacAddress[i], buf, off + 4 + i * 1);
    l2l1_putU16(msg.vlanId, buf, off + 10);
}

function L1ECpri_decodeConfigureTransportResp_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeConfigureTransportResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}

function L1ECpri_decodeDelayConfigReq_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.tDlAdvanceUp = l2l1_getU32(offset + 4);
    result.tDlAdvanceCp = l2l1_getU32(offset + 8);
    result.tUlAdvanceCp = l2l1_getU32(offset + 12);
    result.receiveWindowOpen = l2l1_getU32(offset + 16);
    result.receiveWindowClose = l2l1_getU32(offset + 20);
    result.nTaOffset = l2l1_getU16(offset + 24);
    result.receiveWindowOpen_prach = l2l1_getU32(offset + 28);
    result.receiveWindowClose_prach = l2l1_getU32(offset + 32);
    result.frameStartSub10ms = l2l1_getU32(offset + 36);
    result.frameStartSFN = l2l1_getI32(offset + 40);

    return result;
}
function L1ECpri_encodeDelayConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.tDlAdvanceUp, buf, off + 4);
    l2l1_putU32(msg.tDlAdvanceCp, buf, off + 8);
    l2l1_putU32(msg.tUlAdvanceCp, buf, off + 12);
    l2l1_putU32(msg.receiveWindowOpen, buf, off + 16);
    l2l1_putU32(msg.receiveWindowClose, buf, off + 20);
    l2l1_putU16(msg.nTaOffset, buf, off + 24);
    l2l1_putU32(msg.receiveWindowOpen_prach, buf, off + 28);
    l2l1_putU32(msg.receiveWindowClose_prach, buf, off + 32);
    l2l1_putU32(msg.frameStartSub10ms, buf, off + 36);
    l2l1_putI32(msg.frameStartSFN, buf, off + 40);
}

function L1ECpri_decodeDelayConfigResp_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeDelayConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}

function L1ECpri_decodeDelayMeasInd_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.tdOneWayMin = l2l1_getU32(offset + 4);
    result.tdOneWayMax = l2l1_getU32(offset + 8);

    return result;
}
function L1ECpri_encodeDelayMeasInd_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.tdOneWayMin, buf, off + 4);
    l2l1_putU32(msg.tdOneWayMax, buf, off + 8);
}

function L1ECpri_decodeAPI2DeleteTransportReq_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "Direction_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.ceAxCId = _decodeArray(offset + 8, l2l1_getU16, 2);

    return result;
}
function L1ECpri_encodeAPI2DeleteTransportReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.eCpriLink, buf, off + 5);
    _encodeArray(msg.ceAxCId, buf, off + 8, l2l1_putU16, 2);
}

function L1ECpri_decodeAPI2DeleteTransportResp_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.eCpriLink = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.direction = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "Direction_t",
    });
    result.state = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });

    return result;
}
function L1ECpri_encodeAPI2DeleteTransportResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.eCpriLink, buf, off + 4);
    l2l1_putU8(msg.direction, buf, off + 5);
    l2l1_putU8(msg.state, buf, off + 6);
}

function L1ECpri_decodeInitialDelayMeasReq_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.samplesPerMeas = l2l1_getU16(offset + 2);
    result.sampleInterval = l2l1_getU32(offset + 4);
    result.measInterval = l2l1_getU32(offset + 8);
    result.changeThreshold = l2l1_getU32(offset + 12);

    return result;
}
function L1ECpri_encodeInitialDelayMeasReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU16(msg.samplesPerMeas, buf, off + 2);
    l2l1_putU32(msg.sampleInterval, buf, off + 4);
    l2l1_putU32(msg.measInterval, buf, off + 8);
    l2l1_putU32(msg.changeThreshold, buf, off + 12);
}

function L1ECpri_decodeInitialDelayMeasResp_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });
    result.tdOneWayMin = l2l1_getU32(offset + 4);
    result.tdOneWayMax = l2l1_getU32(offset + 8);

    return result;
}
function L1ECpri_encodeInitialDelayMeasResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.tdOneWayMin, buf, off + 4);
    l2l1_putU32(msg.tdOneWayMax, buf, off + 8);
}

function L1ECpri_decodeMsgRcvCountersInd_t(offset) {
    const result = {};

    result.numOfItems = l2l1_getU32(offset + 0);
    result.MsgRcvCounters = [];
    const MsgRcvCountersLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < MsgRcvCountersLength && i < 18; i++)
        result.MsgRcvCounters.push(L1ECpri_decodeSMsgRcvCountersItem(offset + 8 + i * 56));

    return result;
}
function L1ECpri_encodeMsgRcvCountersInd_t(msg, buf, off) {
    l2l1_putU32(msg.numOfItems, buf, off + 0);
    l2l1_putU32(msg.MsgRcvCounters.length, buf, off + 4);
    for (let i = 0; i < msg.MsgRcvCounters.length && i < 18; i++)
        L1ECpri_encodeSMsgRcvCountersItem(msg.MsgRcvCounters[i], buf, off + 4 + i * 56);
}

function L1ECpri_decodeSetOutputReq_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.outputState = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "EOutputState_t",
    });

    return result;
}
function L1ECpri_encodeSetOutputReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.outputState, buf, off + 1);
}

function L1ECpri_decodeSetOutputResp_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });
    result.outputState = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "EOutputState_t",
    });

    return result;
}
function L1ECpri_encodeSetOutputResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU8(msg.outputState, buf, off + 2);
}

function L1ECpri_decodeSMsgRcvCountersItem(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.ceAxCId = l2l1_getU32(offset + 4);
    result.msgRcvAll = l2l1_getU64(offset + 8);
    result.msgRcvOnTime = l2l1_getU64(offset + 16);
    result.msgRcvTooEarly = l2l1_getU64(offset + 24);
    result.msgRcvTooLate = l2l1_getU64(offset + 32);
    result.msgRcvCorrupt = l2l1_getU64(offset + 40);
    result.msgRcvDuplicate = l2l1_getU64(offset + 48);

    return result;
}
function L1ECpri_encodeSMsgRcvCountersItem(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.ceAxCId, buf, off + 4);
    l2l1_putU64(msg.msgRcvAll, buf, off + 8);
    l2l1_putU64(msg.msgRcvOnTime, buf, off + 16);
    l2l1_putU64(msg.msgRcvTooEarly, buf, off + 24);
    l2l1_putU64(msg.msgRcvTooLate, buf, off + 32);
    l2l1_putU64(msg.msgRcvCorrupt, buf, off + 40);
    l2l1_putU64(msg.msgRcvDuplicate, buf, off + 48);
}

function L1ECpri_decodeStateInd_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.eCpriState = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_eCpriState", {
        enumerable: false,
        writable: false,
        value: "EOamECpriLinkState_t",
    });

    return result;
}
function L1ECpri_encodeStateInd_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.eCpriState, buf, off + 1);
}

function L1ECpri_decodeSubscribeReq_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1ECpri_encodeSubscribeReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.sicad, buf, off + 4);
}

function L1ECpri_decodeSubscribeResp_t(offset) {
    const result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState_t",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1ECpri_encodeSubscribeResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.sicad, buf, off + 4);
}

function L1Cpri_decodeAlarmInd_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.l1AlarmStates = l2l1_getU32(offset + 4);

    return result;
}
function L1Cpri_encodeAlarmInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.l1AlarmStates, buf, off + 4);
}

function L1Cpri_decodeConfigureAxcInfoReq_t(offset) {
    const result = {};

    result.axcContainers = _decodeArray(offset + 0, L1Cpri_decodeconfigureAxcContainersReq_t, 20);
    result.scs = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });

    return result;
}
function L1Cpri_encodeConfigureAxcInfoReq_t(msg, buf, off) {
    _encodeArray(msg.axcContainers, buf, off + 0, L1Cpri_encodeconfigureAxcContainersReq_t, 20);
    l2l1_putU8(msg.scs, buf, off + 8);
}

function L1Cpri_decodeconfigureAxcContainersReq_t(offset) {
    const result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.cpriLinkId = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_cpriLinkId", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.iqSampleFormat = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_iqSampleFormat", {
        enumerable: false,
        writable: false,
        value: "cpriIqSampleFormat_t",
    });
    result.iqSampleCount = l2l1_getU16(offset + 6);
    result.wCoordinate = l2l1_getU32(offset + 8);
    result.bCoordinate = l2l1_getU32(offset + 12);
    result.direction = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "direction_t",
    });

    return result;
}
function L1Cpri_encodeconfigureAxcContainersReq_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.cpriLinkId, buf, off + 4);
    l2l1_putU8(msg.iqSampleFormat, buf, off + 5);
    l2l1_putU16(msg.iqSampleCount, buf, off + 6);
    l2l1_putU32(msg.wCoordinate, buf, off + 8);
    l2l1_putU32(msg.bCoordinate, buf, off + 12);
    l2l1_putU8(msg.direction, buf, off + 16);
}

function L1Cpri_decodeConfigureAxcInfoResp_t(offset) {
    const result = {};

    result.axcContainers = _decodeArray(offset + 0, L1Cpri_decodeconfigureAxcContainersResp_t, 8);

    return result;
}
function L1Cpri_encodeConfigureAxcInfoResp_t(msg, buf, off) {
    _encodeArray(msg.axcContainers, buf, off + 0, L1Cpri_encodeconfigureAxcContainersResp_t, 8);
}

function L1Cpri_decodeconfigureAxcContainersResp_t(offset) {
    const result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "direction_t",
    });
    result.status = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cpriAxcContainerStatus_t",
    });

    return result;
}
function L1Cpri_encodeconfigureAxcContainersResp_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 5);
}

function L1Cpri_decodeConfigureLinksReq_t(offset) {
    const result = {};

    result.l1_StartupTimer = l2l1_getU32(offset + 0);
    result.numOfItems = l2l1_getU32(offset + 4);
    result.cpriLink = [];
    const cpriLinkLength = l2l1_getU32(offset + 8);
    for (let i = 0; i < cpriLinkLength && i < 16; i++)
        result.cpriLink.push(L1Cpri_decodeSCpriLinkItem(offset + 12 + i * 20));
    result.dlCpriLinkMapConfig = l2l1_getU8(offset + 332);
    Object.defineProperty(result, "__enum_dlCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "ECellMap",
    });
    result.ulCpriLinkMapConfig = l2l1_getU8(offset + 333);
    Object.defineProperty(result, "__enum_ulCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "ECellMap",
    });

    return result;
}
function L1Cpri_encodeConfigureLinksReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1_StartupTimer, buf, off + 0);
    l2l1_putU32(msg.numOfItems, buf, off + 4);
    l2l1_putU32(msg.cpriLink.length, buf, off + 8);
    for (let i = 0; i < msg.cpriLink.length && i < 16; i++)
        L1Cpri_encodeSCpriLinkItem(msg.cpriLink[i], buf, off + 8 + i * 20);
    l2l1_putU8(msg.dlCpriLinkMapConfig, buf, off + 328);
    l2l1_putU8(msg.ulCpriLinkMapConfig, buf, off + 329);
}

function L1Cpri_decodeConfigureLinksResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeConfigureLinksResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function L1Cpri_decodeConfigureVsbReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.xs0 = l2l1_getU8(offset + 8);
    result.ns0 = l2l1_getU8(offset + 9);
    result.xs1 = l2l1_getU8(offset + 10);
    result.ns1 = l2l1_getU8(offset + 11);
    result.index = l2l1_getU8(offset + 12);
    result.modulo = l2l1_getU8(offset + 13);
    result.activeBytes = l2l1_getU8(offset + 14);
    result.bufferLen = l2l1_getU8(offset + 15);

    return result;
}
function L1Cpri_encodeConfigureVsbReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU8(msg.xs0, buf, off + 8);
    l2l1_putU8(msg.ns0, buf, off + 9);
    l2l1_putU8(msg.xs1, buf, off + 10);
    l2l1_putU8(msg.ns1, buf, off + 11);
    l2l1_putU8(msg.index, buf, off + 12);
    l2l1_putU8(msg.modulo, buf, off + 13);
    l2l1_putU8(msg.activeBytes, buf, off + 14);
    l2l1_putU8(msg.bufferLen, buf, off + 15);
}

function L1Cpri_decodeConfigureVsbResp_t(offset) {
    const result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeConfigureVsbResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}

function L1Cpri_decodeDelayConfigReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.dlFiberLengthCompensationOffset = l2l1_getU32(offset + 4);
    result.ulFiberLengthCompensationOffset = l2l1_getU32(offset + 8);
    result.Nul = l2l1_getU16(offset + 12);
    result.Ndl = l2l1_getU16(offset + 14);
    result.ParameterMask = l2l1_getU16(offset + 16);
    result.nTaOffset = l2l1_getU16(offset + 18);
    result.frameStart = l2l1_getI32(offset + 20);
    result.frameStartSub10ms = l2l1_getU32(offset + 24);
    result.frameStartSFN = l2l1_getI32(offset + 28);

    return result;
}
function L1Cpri_encodeDelayConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.dlFiberLengthCompensationOffset, buf, off + 4);
    l2l1_putU32(msg.ulFiberLengthCompensationOffset, buf, off + 8);
    l2l1_putU16(msg.Nul, buf, off + 12);
    l2l1_putU16(msg.Ndl, buf, off + 14);
    l2l1_putU16(msg.ParameterMask, buf, off + 16);
    l2l1_putU16(msg.nTaOffset, buf, off + 18);
    l2l1_putI32(msg.frameStart, buf, off + 20);
    l2l1_putU32(msg.frameStartSub10ms, buf, off + 24);
    l2l1_putI32(msg.frameStartSFN, buf, off + 28);
}

function L1Cpri_decodeDelayConfigResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeDelayConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}

function L1Cpri_decodeDeleteAxcInfoReq_t(offset) {
    const result = {};

    result.axcContainers = _decodeArray(offset + 0, L1Cpri_decodeaxcContainersDeleteReq_t, 8);

    return result;
}
function L1Cpri_encodeDeleteAxcInfoReq_t(msg, buf, off) {
    _encodeArray(msg.axcContainers, buf, off + 0, L1Cpri_encodeaxcContainersDeleteReq_t, 8);
}

function L1Cpri_decodeaxcContainersDeleteReq_t(offset) {
    const result = {};

    result.direction = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);

    return result;
}
function L1Cpri_encodeaxcContainersDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
}

function L1Cpri_decodeDeleteAxcInfoResp_t(offset) {
    const result = {};

    result.axcContainers = _decodeArray(offset + 0, L1Cpri_decodeaxcContainersDeleteResp_t, 12);

    return result;
}
function L1Cpri_encodeDeleteAxcInfoResp_t(msg, buf, off) {
    _encodeArray(msg.axcContainers, buf, off + 0, L1Cpri_encodeaxcContainersDeleteResp_t, 12);
}

function L1Cpri_decodeaxcContainersDeleteResp_t(offset) {
    const result = {};

    result.direction = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cpriAxcContainerStatus_t",
    });

    return result;
}
function L1Cpri_encodeaxcContainersDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
}

function L1Cpri_decodeDiscoveryInd_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.discoveryMessage = [];
    const discoveryMessageLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < discoveryMessageLength && i < 64; i++)
        result.discoveryMessage.push(l2l1_getU8(offset + 8 + i * 1));

    return result;
}
function L1Cpri_encodeDiscoveryInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.discoveryMessage.length, buf, off + 4);
    for (let i = 0; i < msg.discoveryMessage.length && i < 64; i++)
        l2l1_putU8(msg.discoveryMessage[i], buf, off + 4 + i * 1);
}

function L1Cpri_decodeGetLinkParamReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.parameterMask = l2l1_getU16(offset + 2);

    return result;
}
function L1Cpri_encodeGetLinkParamReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
}

function L1Cpri_decodeGetLinkParamResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });
    result.cpriLoopbackDelay = l2l1_getU32(offset + 4);
    result.parameterMask = l2l1_getU16(offset + 8);
    result.LCVErrInWindow = l2l1_getU32(offset + 12);
    result.LCVErrAccumulated = l2l1_getU32(offset + 16);
    result.BERInWindow = l2l1_getF32(offset + 20);
    result.BERAccumulated = l2l1_getF32(offset + 24);

    return result;
}
function L1Cpri_encodeGetLinkParamResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.cpriLoopbackDelay, buf, off + 4);
    l2l1_putU16(msg.parameterMask, buf, off + 8);
    l2l1_putU32(msg.LCVErrInWindow, buf, off + 12);
    l2l1_putU32(msg.LCVErrAccumulated, buf, off + 16);
    l2l1_putF32(msg.BERInWindow, buf, off + 20);
    l2l1_putF32(msg.BERAccumulated, buf, off + 24);
}

function L1Cpri_decodeSendVsbDataReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.repeatOn = l2l1_getU8(offset + 8);
    result.bufferLen = l2l1_getU32(offset + 12);
    result.data = [];
    for (let i = 0; i < 256; i++)
        result.data.push(l2l1_getU8(offset + 16 + i * 1));

    return result;
}
function L1Cpri_encodeSendVsbDataReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU8(msg.repeatOn, buf, off + 8);
    l2l1_putU32(msg.bufferLen, buf, off + 12);
    for (let i = 0; i < 256; i++)
        l2l1_putU8(msg.data[i], buf, off + 16 + i * 1);
}

function L1Cpri_decodeSendVsbDataResp_t(offset) {
    const result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeSendVsbDataResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}

function L1Cpri_decodeSetDiscoveryReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.bufferLen = l2l1_getU8(offset + 1);
    result.discoveryMessage = [];
    const discoveryMessageLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < discoveryMessageLength && i < 64; i++)
        result.discoveryMessage.push(l2l1_getU8(offset + 8 + i * 1));

    return result;
}
function L1Cpri_encodeSetDiscoveryReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.bufferLen, buf, off + 1);
    l2l1_putU32(msg.discoveryMessage.length, buf, off + 4);
    for (let i = 0; i < msg.discoveryMessage.length && i < 64; i++)
        l2l1_putU8(msg.discoveryMessage[i], buf, off + 4 + i * 1);
}

function L1Cpri_decodeSetDiscoveryResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeSetDiscoveryResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}

function L1Cpri_decodeSetLinkPropertiesReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.parameterMask = l2l1_getU16(offset + 2);
    result.LCVWindow = l2l1_getU32(offset + 4);
    result.scramblingSeed = l2l1_getU32(offset + 8);
    result.cpriProtocolVersion = l2l1_getU8(offset + 12);

    return result;
}
function L1Cpri_encodeSetLinkPropertiesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
    l2l1_putU32(msg.LCVWindow, buf, off + 4);
    l2l1_putU32(msg.scramblingSeed, buf, off + 8);
    l2l1_putU8(msg.cpriProtocolVersion, buf, off + 12);
}

function L1Cpri_decodeSetLinkPropertiesResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeSetLinkPropertiesResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}

function L1Cpri_decodeSetOutputReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.outputState = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "EOutputState",
    });

    return result;
}
function L1Cpri_encodeSetOutputReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.outputState, buf, off + 1);
}

function L1Cpri_decodeSetOutputResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });
    result.outputState = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "EOutputState",
    });

    return result;
}
function L1Cpri_encodeSetOutputResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU8(msg.outputState, buf, off + 2);
}

function L1Cpri_decodeStateInd_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.cpriState = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_cpriState", {
        enumerable: false,
        writable: false,
        value: "EOamCpriLinkState",
    });

    return result;
}
function L1Cpri_encodeStateInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.cpriState, buf, off + 1);
}

function L1Cpri_decodeSubscribeReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1Cpri_encodeSubscribeReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.sicad, buf, off + 4);
}

function L1Cpri_decodeSubscribeResp_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1Cpri_encodeSubscribeResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU32(msg.sicad, buf, off + 4);
}

function L1Cpri_decodeSubscribeVsbChangesReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.sicad = l2l1_getU32(offset + 8);
    result.regState = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_regState", {
        enumerable: false,
        writable: false,
        value: "EState",
    });

    return result;
}
function L1Cpri_encodeSubscribeVsbChangesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU32(msg.sicad, buf, off + 8);
    l2l1_putU8(msg.regState, buf, off + 12);
}

function L1Cpri_decodeSubscribeVsbChangesResp_t(offset) {
    const result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EExecutionState",
    });

    return result;
}
function L1Cpri_encodeSubscribeVsbChangesResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}

function L1Cpri_decodeVsbDataInd_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.bufferLen = l2l1_getU32(offset + 8);
    result.data = [];
    for (let i = 0; i < 256; i++)
        result.data.push(l2l1_getU8(offset + 12 + i * 1));

    return result;
}
function L1Cpri_encodeVsbDataInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU32(msg.bufferLen, buf, off + 8);
    for (let i = 0; i < 256; i++)
        l2l1_putU8(msg.data[i], buf, off + 12 + i * 1);
}

function L1Cpri_decodeSCpriLinkItem(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.scramblingSeed = l2l1_getU32(offset + 4);
    result.cpriPointerP = l2l1_getU32(offset + 8);
    result.optLinkLength = l2l1_getU32(offset + 12);
    result.cpriProtocolVersion = l2l1_getU8(offset + 16);

    return result;
}
function L1Cpri_encodeSCpriLinkItem(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.scramblingSeed, buf, off + 4);
    l2l1_putU32(msg.cpriPointerP, buf, off + 8);
    l2l1_putU32(msg.optLinkLength, buf, off + 12);
    l2l1_putU8(msg.cpriProtocolVersion, buf, off + 16);
}

function L1Config_decodeL1Config_SwConfigurationReq_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.isEcpriIqForwardingEnabled = l2l1_getU8(offset + 4);
    result.isCpriIqForwardingEnabled = l2l1_getU8(offset + 5);
    result.l1PoolConfiguration = _decodeArray(offset + 8, L1Config_decodel1PoolConfiguration_t, 12);

    return result;
}
function L1Config_encodeL1Config_SwConfigurationReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.isEcpriIqForwardingEnabled, buf, off + 4);
    l2l1_putU8(msg.isCpriIqForwardingEnabled, buf, off + 5);
    _encodeArray(msg.l1PoolConfiguration, buf, off + 8, L1Config_encodel1PoolConfiguration_t, 12);
}

function L1Config_decodel1PoolConfiguration_t(offset) {
    const result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.l1SubPoolConfiguration = _decodeArray(offset + 4, L1Config_decodel1SubPoolConfiguration_t, 28);

    return result;
}
function L1Config_encodel1PoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    _encodeArray(msg.l1SubPoolConfiguration, buf, off + 4, L1Config_encodel1SubPoolConfiguration_t, 28);
}

function L1Config_decodel1SubPoolConfiguration_t(offset) {
    const result = {};

    result.subpoolId = l2l1_getU32(offset + 0);
    result.ratMode = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_ratMode", {
        enumerable: false,
        writable: false,
        value: "ratMode_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "fronthaulMode_t",
    });
    result.domain = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_domain", {
        enumerable: false,
        writable: false,
        value: "domain_t",
    });
    result.duplexMode = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_duplexMode", {
        enumerable: false,
        writable: false,
        value: "duplexMode_t",
    });
    result.frequencyRange = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_frequencyRange", {
        enumerable: false,
        writable: false,
        value: "frequencyRange_t",
    });
    result.maxNumOfDataStreamsPerCell = l2l1_getU32(offset + 12);
    result.maxNumOfDataLayersPerCell = l2l1_getU32(offset + 16);
    result.cellSlotConfiguration = L1Config_decodecellSlotConfiguration_t(offset + 20);

    return result;
}
function L1Config_encodel1SubPoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.subpoolId, buf, off + 0);
    l2l1_putU8(msg.ratMode, buf, off + 4);
    l2l1_putU8(msg.fronthaulMode, buf, off + 5);
    l2l1_putU8(msg.domain, buf, off + 6);
    l2l1_putU8(msg.duplexMode, buf, off + 7);
    l2l1_putU8(msg.frequencyRange, buf, off + 8);
    l2l1_putU32(msg.maxNumOfDataStreamsPerCell, buf, off + 12);
    l2l1_putU32(msg.maxNumOfDataLayersPerCell, buf, off + 16);
    L1Config_encodecellSlotConfiguration_t(msg.cellSlotConfiguration, buf, off + 20);
}

function L1Config_decodecellSlotConfiguration_t(offset) {
    const result = {};

    result.lowestSlotId = l2l1_getU32(offset + 0);
    result.cellSlotsAmount = l2l1_getU32(offset + 4);

    return result;
}
function L1Config_encodecellSlotConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.lowestSlotId, buf, off + 0);
    l2l1_putU32(msg.cellSlotsAmount, buf, off + 4);
}

function L1Config_decodeL1Config_SwConfigurationResp_t(offset) {
    const result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.l1PoolStatus = _decodeArray(offset + 4, L1Config_decodel1PoolStatus_t, 16);

    return result;
}
function L1Config_encodeL1Config_SwConfigurationResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    _encodeArray(msg.l1PoolStatus, buf, off + 4, L1Config_encodel1PoolStatus_t, 16);
}

function L1Config_decodel1PoolStatus_t(offset) {
    const result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });
    result.l1SubPoolStatus = _decodeArray(offset + 8, L1Config_decodel1SubPoolStatus_t, 8);

    return result;
}
function L1Config_encodel1PoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
    _encodeArray(msg.l1SubPoolStatus, buf, off + 8, L1Config_encodel1SubPoolStatus_t, 8);
}

function L1Config_decodel1SubPoolStatus_t(offset) {
    const result = {};

    result.subPoolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function L1Config_encodel1SubPoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.subPoolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}

function L1ChannelStreamer_decodeDeregisterReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);

    return result;
}
function L1ChannelStreamer_encodeDeregisterReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
}

function L1ChannelStreamer_decodeDeregisterResp_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });

    return result;
}
function L1ChannelStreamer_encodeDeregisterResp_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}

function L1ChannelStreamer_decodeReceiveInd_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.payload = [];
    for (let i = 0; i < 16; i++)
        result.payload.push(l2l1_getU8(offset + 4 + i * 1));

    return result;
}
function L1ChannelStreamer_encodeReceiveInd_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    for (let i = 0; i < 16; i++)
        l2l1_putU8(msg.payload[i], buf, off + 4 + i * 1);
}

function L1ChannelStreamer_decodeRegisterReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.receiverQueueId = l2l1_getU32(offset + 4);

    return result;
}
function L1ChannelStreamer_encodeRegisterReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.receiverQueueId, buf, off + 4);
}

function L1ChannelStreamer_decodeRegisterResp_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.streamerQueueId = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "EStatus_5G",
    });

    return result;
}
function L1ChannelStreamer_encodeRegisterResp_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.streamerQueueId, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
}

function L1ChannelStreamer_decodeSendReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.payload = [];
    for (let i = 0; i < 16; i++)
        result.payload.push(l2l1_getU8(offset + 4 + i * 1));

    return result;
}
function L1ChannelStreamer_encodeSendReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    for (let i = 0; i < 16; i++)
        l2l1_putU8(msg.payload[i], buf, off + 4 + i * 1);
}

function L1Call_decodeNrUlTestReportInd_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rssi = l2l1_getF32(offset + 4);
    result.sinr = [];
    for (let i = 0; i < 2; i++)
        result.sinr.push(l2l1_getF32(offset + 8 + i * 4));
    result.timeOffset = l2l1_getI32(offset + 16);
    result.puschReceivedTbs = l2l1_getU64(offset + 24);
    result.puschUnreceivedTbs = l2l1_getU64(offset + 32);
    result.puschDefectiveTbs = l2l1_getU64(offset + 40);
    result.pucchReceivedTbs = l2l1_getU64(offset + 48);
    result.pucchUnreceivedTbs = l2l1_getU64(offset + 56);
    result.pucchDefectiveTbs = l2l1_getU64(offset + 64);
    result.detectedPa = l2l1_getU64(offset + 72);

    return result;
}
function L1Call_encodeNrUlTestReportInd_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.rssi, buf, off + 4);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.sinr[i], buf, off + 8 + i * 4);
    l2l1_putI32(msg.timeOffset, buf, off + 16);
    l2l1_putU64(msg.puschReceivedTbs, buf, off + 24);
    l2l1_putU64(msg.puschUnreceivedTbs, buf, off + 32);
    l2l1_putU64(msg.puschDefectiveTbs, buf, off + 40);
    l2l1_putU64(msg.pucchReceivedTbs, buf, off + 48);
    l2l1_putU64(msg.pucchUnreceivedTbs, buf, off + 56);
    l2l1_putU64(msg.pucchDefectiveTbs, buf, off + 64);
    l2l1_putU64(msg.detectedPa, buf, off + 72);
}

function L1_decodeDmaEndInd_t(offset) {
    const result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodeDmaEndInd_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}

function L1_decodeDmaStartTestReq_t(offset) {
    const result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodeDmaStartTestReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}

function L1_decodeEchoReq_t(offset) {
    const result = {};

    result.payload = [];
    for (let i = 0; i < 64; i++)
        result.payload.push(l2l1_getU8(offset + 0 + i * 1));

    return result;
}
function L1_encodeEchoReq_t(msg, buf, off) {
    for (let i = 0; i < 64; i++)
        l2l1_putU8(msg.payload[i], buf, off + 0 + i * 1);
}

function L1_decodeEchoResp_t(offset) {
    const result = {};

    result.payload = [];
    for (let i = 0; i < 64; i++)
        result.payload.push(l2l1_getU8(offset + 0 + i * 1));

    return result;
}
function L1_encodeEchoResp_t(msg, buf, off) {
    for (let i = 0; i < 64; i++)
        l2l1_putU8(msg.payload[i], buf, off + 0 + i * 1);
}

function L1_decodeLatencyEventReq_t(offset) {
    const result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodeLatencyEventReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}

function L1_decodeLaWakeupReq_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcell_index = l2l1_getU32(offset + 4);
    result.type_info = l2l1_getU16(offset + 8);
    result.param = l2l1_getU8(offset + 10);

    return result;
}
function L1_encodeLaWakeupReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU32(msg.subcell_index, buf, off + 4);
    l2l1_putU16(msg.type_info, buf, off + 8);
    l2l1_putU8(msg.param, buf, off + 10);
}

function L1_decodeLoopReq_t(offset) {
    const result = {};

    result.next_slot_config_sfn = l2l1_getU16(offset + 0);
    result.next_slot_config_slot = l2l1_getU8(offset + 2);
    result.next_pattern_config_sfn = l2l1_getU16(offset + 4);
    result.next_pattern_config_slot = l2l1_getU8(offset + 6);
    result.next_pbch_sfn = l2l1_getU16(offset + 8);
    result.next_pbch_slot = l2l1_getU8(offset + 10);
    result.next_pucch_sfn = l2l1_getU16(offset + 12);
    result.next_pucch_slot = l2l1_getU8(offset + 14);
    result.next_pusch_sfn = l2l1_getU16(offset + 16);
    result.next_pusch_slot = l2l1_getU8(offset + 18);
    result.next_ul_meas_sfn = l2l1_getU16(offset + 20);
    result.next_ul_meas_slot = l2l1_getU8(offset + 22);

    return result;
}
function L1_encodeLoopReq_t(msg, buf, off) {
    l2l1_putU16(msg.next_slot_config_sfn, buf, off + 0);
    l2l1_putU8(msg.next_slot_config_slot, buf, off + 2);
    l2l1_putU16(msg.next_pattern_config_sfn, buf, off + 4);
    l2l1_putU8(msg.next_pattern_config_slot, buf, off + 6);
    l2l1_putU16(msg.next_pbch_sfn, buf, off + 8);
    l2l1_putU8(msg.next_pbch_slot, buf, off + 10);
    l2l1_putU16(msg.next_pucch_sfn, buf, off + 12);
    l2l1_putU8(msg.next_pucch_slot, buf, off + 14);
    l2l1_putU16(msg.next_pusch_sfn, buf, off + 16);
    l2l1_putU8(msg.next_pusch_slot, buf, off + 18);
    l2l1_putU16(msg.next_ul_meas_sfn, buf, off + 20);
    l2l1_putU8(msg.next_ul_meas_slot, buf, off + 22);
}

function L1_decodeNrtRxSubcellResetReq_t(offset) {
    const result = {};

    result.subcell_id = l2l1_getU8(offset + 0);

    return result;
}
function L1_encodeNrtRxSubcellResetReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcell_id, buf, off + 0);
}

function L1_decodePingPongReq_t(offset) {
    const result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodePingPongReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}

function L1_decodeSnapshotFileCreationReq_t(offset) {
    const result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodeSnapshotFileCreationReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}

function L1_decodeStartupLoopReq_t(offset) {
    const result = {};

    result.state = l2l1_getU32(offset + 0);
    result.count = l2l1_getU32(offset + 4);

    return result;
}
function L1_encodeStartupLoopReq_t(msg, buf, off) {
    l2l1_putU32(msg.state, buf, off + 0);
    l2l1_putU32(msg.count, buf, off + 4);
}

function L1_decodeSyncInd_t(offset) {
    const result = {};

    result.delay_nSec = l2l1_getI32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.subcellId = l2l1_getU8(offset + 6);
    result.slot = l2l1_getU8(offset + 7);

    return result;
}
function L1_encodeSyncInd_t(msg, buf, off) {
    l2l1_putI32(msg.delay_nSec, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 7);
}

function L1_decodeTestModeConfigReq_t(offset) {
    const result = {};

    result.operationType = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_operationType", {
        enumerable: false,
        writable: false,
        value: "operationType_t",
    });

    return result;
}
function L1_encodeTestModeConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.operationType, buf, off + 0);
}

function L1_decodeTestModeConfigResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "status_t",
    });

    return result;
}
function L1_encodeTestModeConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function L1_decodeUlMeasReq_t(offset) {
    const result = {};

    result.subCellIndex = l2l1_getU32(offset + 0);
    result.queueEntry = l2l1_getU32(offset + 4);
    result.measBufType = l2l1_getU32(offset + 8);

    return result;
}
function L1_encodeUlMeasReq_t(msg, buf, off) {
    l2l1_putU32(msg.subCellIndex, buf, off + 0);
    l2l1_putU32(msg.queueEntry, buf, off + 4);
    l2l1_putU32(msg.measBufType, buf, off + 8);
}

function L1_decodeWakeupReq_t(offset) {
    const result = {};

    result.subcell_index = l2l1_getU32(offset + 0);

    return result;
}
function L1_encodeWakeupReq_t(msg, buf, off) {
    l2l1_putU32(msg.subcell_index, buf, off + 0);
}

function DlDataUe_decodeAddressReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.syncIndAddress = l2l1_getU32(offset + 4);

    return result;
}
function DlDataUe_encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU32(msg.syncIndAddress, buf, off + 4);
}

function DlDataUe_decodeAddressResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pdschReceiveReqAddress = l2l1_getU32(offset + 4);
    result.ssBurstReceiveReqAddress = l2l1_getU32(offset + 8);
    result.pdcchReceiveReqAddress = l2l1_getU32(offset + 12);
    result.csiRsReceiveReqAddress = l2l1_getU32(offset + 16);

    return result;
}
function DlDataUe_encodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU32(msg.pdschReceiveReqAddress, buf, off + 4);
    l2l1_putU32(msg.ssBurstReceiveReqAddress, buf, off + 8);
    l2l1_putU32(msg.pdcchReceiveReqAddress, buf, off + 12);
    l2l1_putU32(msg.csiRsReceiveReqAddress, buf, off + 16);
}

function DlDataUe_decodeCsiRsReceiveReq_t(offset) {
    const result = {};

    result.addrCsiRsReceiveResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, DlDataUe_decodecsiRsReceiveReqSubcell_t, 10);

    return result;
}
function DlDataUe_encodeCsiRsReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrCsiRsReceiveResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, DlDataUe_encodecsiRsReceiveReqSubcell_t, 10);
}

function DlDataUe_decodecsiRsReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.csiRsResources = _decodeArray(offset + 4, DlDataUe_decodecsiRsReceiveReqCsiRsResource_t, 20);

    return result;
}
function DlDataUe_encodecsiRsReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.csiRsResources, buf, off + 4, DlDataUe_encodecsiRsReceiveReqCsiRsResource_t, 20);
}

function DlDataUe_decodecsiRsReceiveReqCsiRsResource_t(offset) {
    const result = {};

    result.csiResourceKey = l2l1_getU8(offset + 0);
    result.startSymbol = l2l1_getU8(offset + 1);
    result.csiRsScramblingSequenceInt = l2l1_getU16(offset + 2);
    result.density = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_density", {
        enumerable: false,
        writable: false,
        value: "csiRsDensity_t",
    });
    result.densityDot5PrbLocation = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_densityDot5PrbLocation", {
        enumerable: false,
        writable: false,
        value: "csiRsDensityDot5PrbLocation_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU16(offset + 8);
    result.csiRsConfig = l2l1_getU8(offset + 10);
    result.freqDomainAllocationKi = l2l1_getU16(offset + 12);
    result.trsInfo = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_trsInfo", {
        enumerable: false,
        writable: false,
        value: "csiRsTrsInfo_t",
    });
    result.codebookType = l2l1_getU8(offset + 15);
    Object.defineProperty(result, "__enum_codebookType", {
        enumerable: false,
        writable: false,
        value: "csiRsCodebookType_t",
    });
    result.codebookMode = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_codebookMode", {
        enumerable: false,
        writable: false,
        value: "csiRsCodebookMode_t",
    });
    result.reportQuantity = l2l1_getU8(offset + 17);
    Object.defineProperty(result, "__enum_reportQuantity", {
        enumerable: false,
        writable: false,
        value: "csiRsReportQuantity_t",
    });
    result.riRestriction = l2l1_getU8(offset + 18);
    result.codebookSubsetRestriction = l2l1_getU8(offset + 19);

    return result;
}
function DlDataUe_encodecsiRsReceiveReqCsiRsResource_t(msg, buf, off) {
    l2l1_putU8(msg.csiResourceKey, buf, off + 0);
    l2l1_putU8(msg.startSymbol, buf, off + 1);
    l2l1_putU16(msg.csiRsScramblingSequenceInt, buf, off + 2);
    l2l1_putU8(msg.density, buf, off + 4);
    l2l1_putU8(msg.densityDot5PrbLocation, buf, off + 5);
    l2l1_putU16(msg.startPrb, buf, off + 6);
    l2l1_putU16(msg.numOfPrb, buf, off + 8);
    l2l1_putU8(msg.csiRsConfig, buf, off + 10);
    l2l1_putU16(msg.freqDomainAllocationKi, buf, off + 12);
    l2l1_putU8(msg.trsInfo, buf, off + 14);
    l2l1_putU8(msg.codebookType, buf, off + 15);
    l2l1_putU8(msg.codebookMode, buf, off + 16);
    l2l1_putU8(msg.reportQuantity, buf, off + 17);
    l2l1_putU8(msg.riRestriction, buf, off + 18);
    l2l1_putU8(msg.codebookSubsetRestriction, buf, off + 19);
}

function DlDataUe_decodeCsiRsReceiveResp_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, DlDataUe_decodecsiRsReceiveRespSubcell_t, 12);

    return result;
}
function DlDataUe_encodeCsiRsReceiveResp_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, DlDataUe_encodecsiRsReceiveRespSubcell_t, 12);
}

function DlDataUe_decodecsiRsReceiveRespSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.csiRsResources = _decodeArray(offset + 4, DlDataUe_decodecsiRsReceiveRespCsiRsResource_t, 28);

    return result;
}
function DlDataUe_encodecsiRsReceiveRespSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.csiRsResources, buf, off + 4, DlDataUe_encodecsiRsReceiveRespCsiRsResource_t, 28);
}

function DlDataUe_decodecsiRsReceiveRespCsiRsResource_t(offset) {
    const result = {};

    result.csiResourceKey = l2l1_getU8(offset + 0);
    result.csiRsrp = l2l1_getF32(offset + 4);
    result.csiRsrq = l2l1_getF32(offset + 8);
    result.csiRssi = l2l1_getF32(offset + 12);
    result.csiSinr = l2l1_getF32(offset + 16);
    result.cqiValue = l2l1_getU8(offset + 20);
    result.pmiValue = l2l1_getU8(offset + 21);
    result.riValue = l2l1_getU8(offset + 22);
    result.i1Codebook4AntPorts = [];
    for (let i = 0; i < 3; i++)
        result.i1Codebook4AntPorts.push(l2l1_getU8(offset + 23 + i * 1));
    result.i2Codebook4AntPorts = l2l1_getU8(offset + 26);

    return result;
}
function DlDataUe_encodecsiRsReceiveRespCsiRsResource_t(msg, buf, off) {
    l2l1_putU8(msg.csiResourceKey, buf, off + 0);
    l2l1_putF32(msg.csiRsrp, buf, off + 4);
    l2l1_putF32(msg.csiRsrq, buf, off + 8);
    l2l1_putF32(msg.csiRssi, buf, off + 12);
    l2l1_putF32(msg.csiSinr, buf, off + 16);
    l2l1_putU8(msg.cqiValue, buf, off + 20);
    l2l1_putU8(msg.pmiValue, buf, off + 21);
    l2l1_putU8(msg.riValue, buf, off + 22);
    for (let i = 0; i < 3; i++)
        l2l1_putU8(msg.i1Codebook4AntPorts[i], buf, off + 23 + i * 1);
    l2l1_putU8(msg.i2Codebook4AntPorts, buf, off + 26);
}

function DlDataUe_decodePdcchReceiveReq_t(offset) {
    const result = {};

    result.addrPdcchReceiveResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, DlDataUe_decodepdcchReceiveReqSubcell_t, 16);

    return result;
}
function DlDataUe_encodePdcchReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPdcchReceiveResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, DlDataUe_encodepdcchReceiveReqSubcell_t, 16);
}

function DlDataUe_decodepdcchReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pdcchResources = _decodeArray(offset + 4, DlDataUe_decodepdcchReceiveReqPdcchResource_t, 32);

    return result;
}
function DlDataUe_encodepdcchReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pdcchResources, buf, off + 4, DlDataUe_encodepdcchReceiveReqPdcchResource_t, 32);
}

function DlDataUe_decodepdcchReceiveReqPdcchResource_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.startSymbolNumber = l2l1_getU8(offset + 2);
    result.numOfSymbols = l2l1_getU8(offset + 3);
    result.startCce = l2l1_getU8(offset + 4);
    result.aggregationLevel = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_aggregationLevel", {
        enumerable: false,
        writable: false,
        value: "aggregationLevel_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 6);
    result.dmrsReferencePoint = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_dmrsReferencePoint", {
        enumerable: false,
        writable: false,
        value: "dmrsReferencePoint_t",
    });
    result.dciSize = l2l1_getU8(offset + 9);
    result.coresetFreqDomain = l2l1_getU64(offset + 16);
    result.coresetFreqDomainRbShift = l2l1_getU8(offset + 24);
    result.cceRegMappingType = l2l1_getU8(offset + 25);
    Object.defineProperty(result, "__enum_cceRegMappingType", {
        enumerable: false,
        writable: false,
        value: "cceRegMappingType_t",
    });
    result.nShiftModNumOfRegBundles = l2l1_getU16(offset + 26);
    result.interleaverRows = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_interleaverRows", {
        enumerable: false,
        writable: false,
        value: "coresetInterleaverSize_t",
    });
    result.regBundleSize = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_regBundleSize", {
        enumerable: false,
        writable: false,
        value: "coresetRegBundleSize_t",
    });
    result.precoderGranularity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_precoderGranularity", {
        enumerable: false,
        writable: false,
        value: "precoderGranularity_t",
    });

    return result;
}
function DlDataUe_encodepdcchReceiveReqPdcchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.startSymbolNumber, buf, off + 2);
    l2l1_putU8(msg.numOfSymbols, buf, off + 3);
    l2l1_putU8(msg.startCce, buf, off + 4);
    l2l1_putU8(msg.aggregationLevel, buf, off + 5);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 6);
    l2l1_putU8(msg.dmrsReferencePoint, buf, off + 8);
    l2l1_putU8(msg.dciSize, buf, off + 9);
    l2l1_putU64(msg.coresetFreqDomain, buf, off + 16);
    l2l1_putU8(msg.coresetFreqDomainRbShift, buf, off + 24);
    l2l1_putU8(msg.cceRegMappingType, buf, off + 25);
    l2l1_putU16(msg.nShiftModNumOfRegBundles, buf, off + 26);
    l2l1_putU8(msg.interleaverRows, buf, off + 28);
    l2l1_putU8(msg.regBundleSize, buf, off + 29);
    l2l1_putU8(msg.precoderGranularity, buf, off + 30);
}

function DlDataUe_decodePdcchReceiveResp_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, DlDataUe_decodepdcchReceiveRespSubcell_t, 16);

    return result;
}
function DlDataUe_encodePdcchReceiveResp_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, DlDataUe_encodepdcchReceiveRespSubcell_t, 16);
}

function DlDataUe_decodepdcchReceiveRespSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.pdcchResources = _decodeArray(offset + 8, DlDataUe_decodepdcchReceiveRespPdcchResource_t, 36);

    return result;
}
function DlDataUe_encodepdcchReceiveRespSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    _encodeArray(msg.pdcchResources, buf, off + 8, DlDataUe_encodepdcchReceiveRespPdcchResource_t, 36);
}

function DlDataUe_decodepdcchReceiveRespPdcchResource_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.dciPayload = [];
    for (let i = 0; i < 18; i++)
        result.dciPayload.push(l2l1_getU8(offset + 2 + i * 1));
    result.crc = l2l1_getU8(offset + 20);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.rxPower = l2l1_getF32(offset + 24);
    result.sinr = l2l1_getF32(offset + 28);
    result.rssi = l2l1_getF32(offset + 32);

    return result;
}
function DlDataUe_encodepdcchReceiveRespPdcchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    for (let i = 0; i < 18; i++)
        l2l1_putU8(msg.dciPayload[i], buf, off + 2 + i * 1);
    l2l1_putU8(msg.crc, buf, off + 20);
    l2l1_putF32(msg.rxPower, buf, off + 24);
    l2l1_putF32(msg.sinr, buf, off + 28);
    l2l1_putF32(msg.rssi, buf, off + 32);
}

function DlDataUe_decodePdschReceiveReq_t(offset) {
    const result = {};

    result.addrPdschReceiveRespSmD = l2l1_getU32(offset + 0);
    result.addrPdschReceiveRespLo = l2l1_getU32(offset + 4);
    result.addrPdschReceiveRespHarqD = l2l1_getU32(offset + 8);
    result.sfn = l2l1_getU16(offset + 12);
    result.slot = l2l1_getU8(offset + 14);
    result.subcells = _decodeArray(offset + 16, DlDataUe_decodepdschReceiveReqSubcell_t, 12);

    return result;
}
function DlDataUe_encodePdschReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPdschReceiveRespSmD, buf, off + 0);
    l2l1_putU32(msg.addrPdschReceiveRespLo, buf, off + 4);
    l2l1_putU32(msg.addrPdschReceiveRespHarqD, buf, off + 8);
    l2l1_putU16(msg.sfn, buf, off + 12);
    l2l1_putU8(msg.slot, buf, off + 14);
    _encodeArray(msg.subcells, buf, off + 16, DlDataUe_encodepdschReceiveReqSubcell_t, 12);
}

function DlDataUe_decodepdschReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = _decodeArray(offset + 4, DlDataUe_decodepdschReceiveReqGrant_t, 72);

    return result;
}
function DlDataUe_encodepdschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, DlDataUe_encodepdschReceiveReqGrant_t, 72);
}

function DlDataUe_decodepdschReceiveReqGrant_t(offset) {
    const result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.selfContainedFlag = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "selfContainedFlag",
    });
    result.startSymbol = l2l1_getU8(offset + 7);
    result.numOfPdschSymbols = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_numOfPdschSymbols", {
        enumerable: false,
        writable: false,
        value: "NumOfPdschSymbols",
    });
    result.startPrb = l2l1_getU16(offset + 10);
    result.numOfPrb = l2l1_getU16(offset + 12);
    result.rbgSize = l2l1_getU8(offset + 14);
    result.rbgSizeFirst = l2l1_getU8(offset + 15);
    result.rat0Bitmap = l2l1_getU32(offset + 16);
    result.mcs = l2l1_getU8(offset + 20);
    result.dlMcsTable = l2l1_getU8(offset + 21);
    Object.defineProperty(result, "__enum_dlMcsTable", {
        enumerable: false,
        writable: false,
        value: "mcsTable_t",
    });
    result.antPort = l2l1_getU16(offset + 22);
    result.spatialMode = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "SpatialMode",
    });
    result.nscId = l2l1_getU8(offset + 25);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 26);
    result.dlDmrsConfigType = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 31);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 32);
    result.offsetRbDmrs = l2l1_getU8(offset + 33);
    result.dlPtrsFlag = l2l1_getU8(offset + 34);
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 35);
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 36);
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 37);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 38);
    result.harqProcessIndex = l2l1_getU8(offset + 39);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 40);
    result.freshHarqTrans = l2l1_getU8(offset + 42);
    result.longTermCfoMetric = l1_common_decodelongTermCfoMetric_t(offset + 44);
    result.foeValid = l2l1_getU8(offset + 52);
    result.baseGraph = l2l1_getU8(offset + 53);
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 54);
    result.codeBlockSize = l2l1_getU16(offset + 56);
    result.numOfFillerBits = l2l1_getU16(offset + 58);
    result.liftSize = l2l1_getU16(offset + 60);
    result.liftSizeSetIndex = l2l1_getU8(offset + 62);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 63);
    result.modulationOrder = l2l1_getU8(offset + 64);
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 65);
    result.ncb = l2l1_getU16(offset + 66);
    result.k0divZ = l2l1_getU8(offset + 68);
    result.numOfLayers = l2l1_getU8(offset + 69);

    return result;
}
function DlDataUe_encodepdschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.selfContainedFlag, buf, off + 6);
    l2l1_putU8(msg.startSymbol, buf, off + 7);
    l2l1_putU8(msg.numOfPdschSymbols, buf, off + 8);
    l2l1_putU16(msg.startPrb, buf, off + 10);
    l2l1_putU16(msg.numOfPrb, buf, off + 12);
    l2l1_putU8(msg.rbgSize, buf, off + 14);
    l2l1_putU8(msg.rbgSizeFirst, buf, off + 15);
    l2l1_putU32(msg.rat0Bitmap, buf, off + 16);
    l2l1_putU8(msg.mcs, buf, off + 20);
    l2l1_putU8(msg.dlMcsTable, buf, off + 21);
    l2l1_putU16(msg.antPort, buf, off + 22);
    l2l1_putU8(msg.spatialMode, buf, off + 24);
    l2l1_putU8(msg.nscId, buf, off + 25);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 26);
    l2l1_putU8(msg.dlDmrsConfigType, buf, off + 28);
    l2l1_putU8(msg.dlDmrsLen, buf, off + 29);
    l2l1_putU8(msg.dlDmrsMappingType, buf, off + 30);
    l2l1_putU8(msg.dlDmrsAddPos, buf, off + 31);
    l2l1_putU8(msg.dlDmrsTypeAPos, buf, off + 32);
    l2l1_putU8(msg.offsetRbDmrs, buf, off + 33);
    l2l1_putU8(msg.dlPtrsFlag, buf, off + 34);
    l2l1_putU8(msg.dlPtrsTimeDensity, buf, off + 35);
    l2l1_putU8(msg.dlPtrsFrequencyDensity, buf, off + 36);
    l2l1_putU8(msg.dlPtrsNumOfPorts, buf, off + 37);
    l2l1_putU8(msg.dlPtrsResElemOffset, buf, off + 38);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 39);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 40);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 42);
    l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 44);
    l2l1_putU8(msg.foeValid, buf, off + 52);
    l2l1_putU8(msg.baseGraph, buf, off + 53);
    l2l1_putU8(msg.numOfCodeBlocks, buf, off + 54);
    l2l1_putU16(msg.codeBlockSize, buf, off + 56);
    l2l1_putU16(msg.numOfFillerBits, buf, off + 58);
    l2l1_putU16(msg.liftSize, buf, off + 60);
    l2l1_putU8(msg.liftSizeSetIndex, buf, off + 62);
    l2l1_putU8(msg.liftSizeColumnIndex, buf, off + 63);
    l2l1_putU8(msg.modulationOrder, buf, off + 64);
    l2l1_putU8(msg.rvIndex, buf, off + 65);
    l2l1_putU16(msg.ncb, buf, off + 66);
    l2l1_putU8(msg.k0divZ, buf, off + 68);
    l2l1_putU8(msg.numOfLayers, buf, off + 69);
}

function DlDataUe_decodepdschReceiveRespHarqDSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = _decodeArray(offset + 4, DlDataUe_decodeUePdschReceiveRespHarqD_t, 8);

    return result;
}
function DlDataUe_encodepdschReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, DlDataUe_encodeUePdschReceiveRespHarqD_t, 8);
}

function DlDataUe_decodeUePdschReceiveRespHarqD_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 6);

    return result;
}
function DlDataUe_encodeUePdschReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.crc, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 3);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 4);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 6);
}

function DlDataUe_decodePdschReceiveRespHarqD_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, DlDataUe_decodepdschReceiveRespHarqDSubcell_t, 10);

    return result;
}
function DlDataUe_encodePdschReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, DlDataUe_encodepdschReceiveRespHarqDSubcell_t, 10);
}

function DlDataUe_decodePdschReceiveRespLo_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.rnti = l2l1_getU16(offset + 4);
    result.harqProcessIndex = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 8);
    result.data = _decodeArray(offset + 12, l2l1_getU8, 1);

    return result;
}
function DlDataUe_encodePdschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 8);
    _encodeArray(msg.data, buf, off + 12, l2l1_putU8, 1);
}

function DlDataUe_decodepdschReceiveRespSmDSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.grants = _decodeArray(offset + 8, DlDataUe_decodeUePdschReceiveRespSmD_t, 32);

    return result;
}
function DlDataUe_encodepdschReceiveRespSmDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    _encodeArray(msg.grants, buf, off + 8, DlDataUe_encodeUePdschReceiveRespSmD_t, 32);
}

function DlDataUe_decodeUePdschReceiveRespSmD_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.harqProcessIndex = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.shortTermCfoMetric = l1_common_decodeshortTermCfoMetric_t(offset + 8);
    result.rxPower = l2l1_getF32(offset + 16);
    result.sinr = [];
    for (let i = 0; i < 2; i++)
        result.sinr.push(l2l1_getF32(offset + 20 + i * 4));
    result.rssi = l2l1_getF32(offset + 28);

    return result;
}
function DlDataUe_encodeUePdschReceiveRespSmD_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
    l1_common_encodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 8);
    l2l1_putF32(msg.rxPower, buf, off + 16);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.sinr[i], buf, off + 20 + i * 4);
    l2l1_putF32(msg.rssi, buf, off + 28);
}

function DlDataUe_decodePdschReceiveRespSmD_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, DlDataUe_decodepdschReceiveRespSmDSubcell_t, 16);

    return result;
}
function DlDataUe_encodePdschReceiveRespSmD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, DlDataUe_encodepdschReceiveRespSmDSubcell_t, 16);
}

function DlDataUe_decodeSsBurstReceiveReq_t(offset) {
    const result = {};

    result.addrSsBurstReceiveResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, DlDataUe_decodessBurstReceiveReqSubcell_t, 5);

    return result;
}
function DlDataUe_encodeSsBurstReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrSsBurstReceiveResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, DlDataUe_encodessBurstReceiveReqSubcell_t, 5);
}

function DlDataUe_decodessBurstReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.activeSsBlocks = l2l1_getU8(offset + 1);
    result.threeLsbSsbIndex = l2l1_getU8(offset + 2);
    result.isPbchDmrsUsed = l2l1_getU8(offset + 3);
    result.isDlSynchronized = l2l1_getU8(offset + 4);

    return result;
}
function DlDataUe_encodessBurstReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.activeSsBlocks, buf, off + 1);
    l2l1_putU8(msg.threeLsbSsbIndex, buf, off + 2);
    l2l1_putU8(msg.isPbchDmrsUsed, buf, off + 3);
    l2l1_putU8(msg.isDlSynchronized, buf, off + 4);
}

function DlDataUe_decodeSsBurstReceiveResp_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, DlDataUe_decodessBurstReceiveRespSubcell_t, 16);

    return result;
}
function DlDataUe_encodeSsBurstReceiveResp_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, DlDataUe_encodessBurstReceiveRespSubcell_t, 16);
}

function DlDataUe_decodessBurstReceiveRespSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.ssBlocks = _decodeArray(offset + 8, DlDataUe_decodessBurstReceiveRespSsBlock_t, 32);

    return result;
}
function DlDataUe_encodessBurstReceiveRespSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    _encodeArray(msg.ssBlocks, buf, off + 8, DlDataUe_encodessBurstReceiveRespSsBlock_t, 32);
}

function DlDataUe_decodessBurstReceiveRespSsBlock_t(offset) {
    const result = {};

    result.ssBlockId = l2l1_getU8(offset + 0);
    result.physCellId = l2l1_getU16(offset + 2);
    result.threeLsbSsbIndex = l2l1_getU8(offset + 4);
    result.dataPayload = [];
    for (let i = 0; i < 4; i++)
        result.dataPayload.push(l2l1_getU8(offset + 5 + i * 1));
    result.crc = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "crc_t",
    });
    result.ssRsrp = l2l1_getF32(offset + 12);
    result.ssRsrq = l2l1_getF32(offset + 16);
    result.ssRssi = l2l1_getF32(offset + 20);
    result.ssSinr = l2l1_getF32(offset + 24);
    result.ssNoisePower = l2l1_getF32(offset + 28);

    return result;
}
function DlDataUe_encodessBurstReceiveRespSsBlock_t(msg, buf, off) {
    l2l1_putU8(msg.ssBlockId, buf, off + 0);
    l2l1_putU16(msg.physCellId, buf, off + 2);
    l2l1_putU8(msg.threeLsbSsbIndex, buf, off + 4);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.dataPayload[i], buf, off + 5 + i * 1);
    l2l1_putU8(msg.crc, buf, off + 9);
    l2l1_putF32(msg.ssRsrp, buf, off + 12);
    l2l1_putF32(msg.ssRsrq, buf, off + 16);
    l2l1_putF32(msg.ssRssi, buf, off + 20);
    l2l1_putF32(msg.ssSinr, buf, off + 24);
    l2l1_putF32(msg.ssNoisePower, buf, off + 28);
}

function DlDataUe_decodeSyncInd_t(offset) {
    const result = {};

    result.delay_nSec = l2l1_getI32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.subcellId = l2l1_getU8(offset + 6);
    result.slot = l2l1_getU8(offset + 7);

    return result;
}
function DlDataUe_encodeSyncInd_t(msg, buf, off) {
    l2l1_putI32(msg.delay_nSec, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 7);
}

function DlData_decodeAddressReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlData_encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function DlData_decodeAddressResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l1DlAddresses = l1_common_decodeL1DlAddresses(offset + 4);

    return result;
}
function DlData_encodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_common_encodeL1DlAddresses(msg.l1DlAddresses, buf, off + 4);
}

function DlData_decodeCsiRsResource_t(offset) {
    const result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.csiRsScramblingSequenceInt = l2l1_getU16(offset + 2);
    result.density = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_density", {
        enumerable: false,
        writable: false,
        value: "csiRsDensity_t",
    });
    result.densityDot5PrbLocation = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_densityDot5PrbLocation", {
        enumerable: false,
        writable: false,
        value: "csiRsDensityDot5PrbLocation_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU16(offset + 8);
    result.csiRsConfig = l2l1_getU8(offset + 10);
    result.csiRsPrecodingMatrix = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_csiRsPrecodingMatrix", {
        enumerable: false,
        writable: false,
        value: "csiRsPrecodingMatrix_t",
    });
    result.freqDomainAllocationKi = l2l1_getU16(offset + 12);
    result.csiTransmitPower = l2l1_getI16(offset + 14);
    result.pwrReductionPerCsiRsResource_dB = l2l1_getU8(offset + 16);
    result.antennaStream = l2l1_getU8(offset + 17);
    result.trsInfo = l2l1_getU8(offset + 18);
    Object.defineProperty(result, "__enum_trsInfo", {
        enumerable: false,
        writable: false,
        value: "csiRsTrsInfo_t",
    });
    result.numCeAxCIndex = l2l1_getU8(offset + 19);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 20 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 4; i++)
        result.patternId.push(l2l1_getU16(offset + 24 + i * 2));

    return result;
}
function DlData_encodeCsiRsResource_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU16(msg.csiRsScramblingSequenceInt, buf, off + 2);
    l2l1_putU8(msg.density, buf, off + 4);
    l2l1_putU8(msg.densityDot5PrbLocation, buf, off + 5);
    l2l1_putU16(msg.startPrb, buf, off + 6);
    l2l1_putU16(msg.numOfPrb, buf, off + 8);
    l2l1_putU8(msg.csiRsConfig, buf, off + 10);
    l2l1_putU8(msg.csiRsPrecodingMatrix, buf, off + 11);
    l2l1_putU16(msg.freqDomainAllocationKi, buf, off + 12);
    l2l1_putI16(msg.csiTransmitPower, buf, off + 14);
    l2l1_putU8(msg.pwrReductionPerCsiRsResource_dB, buf, off + 16);
    l2l1_putU8(msg.antennaStream, buf, off + 17);
    l2l1_putU8(msg.trsInfo, buf, off + 18);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 19);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 20 + i * 1);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 24 + i * 2);
}

function DlData_decodeCsiRsSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.csiRsResources = _decodeArray(offset + 8, DlData_decodeCsiRsResource_t, 32);

    return result;
}
function DlData_encodeCsiRsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    _encodeArray(msg.csiRsResources, buf, off + 8, DlData_encodeCsiRsResource_t, 32);
}

function DlData_decodeEmptySendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);

    return result;
}
function DlData_encodeEmptySendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
}

function DlData_decodeFastAntennaSnapshotReq_t(offset) {
    const result = {};

    result.addrDlFastAntennaSnapshotResp = l2l1_getU32(offset + 0);
    result.dlSubCellId = l2l1_getU8(offset + 4);
    result.sfn = l2l1_getU16(offset + 6);
    result.slot = l2l1_getU8(offset + 8);
    result.numOfEvents = l2l1_getU8(offset + 9);
    result.eventsList = [];
    for (let i = 0; i < 8; i++)
        result.eventsList.push(l1_common_decodeFastAntennaSnapshotEventsList_t(offset + 10 + i * 4));

    return result;
}
function DlData_encodeFastAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrDlFastAntennaSnapshotResp, buf, off + 0);
    l2l1_putU8(msg.dlSubCellId, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 8);
    l2l1_putU8(msg.numOfEvents, buf, off + 9);
    for (let i = 0; i < 8; i++)
        l1_common_encodeFastAntennaSnapshotEventsList_t(msg.eventsList[i], buf, off + 10 + i * 4);
}

function DlData_decodeFastAntennaSnapshotResp_t(offset) {
    const result = {};

    result.status = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "statusFastAntennaSnapshotResp_t",
    });

    return result;
}
function DlData_encodeFastAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}

function DlData_decodePatternIdPolListPerSymbol_t(offset) {
    const result = {};

    result.patternIdPolListPerSymbolPerBeam = [];
    for (let i = 0; i < 8; i++)
        result.patternIdPolListPerSymbolPerBeam.push(l2l1_getU16(offset + 0 + i * 2));

    return result;
}
function DlData_encodePatternIdPolListPerSymbol_t(msg, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putU16(msg.patternIdPolListPerSymbolPerBeam[i], buf, off + 0 + i * 2);
}

function DlData_decodePatternConfigReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.txRxBitmapPol = l2l1_getU16(offset + 6);
    result.numOfPatternIdPol = l2l1_getU8(offset + 8);
    result.numOfXpolBeams = l2l1_getU8(offset + 9);
    result.patternIdPolList = [];
    for (let i = 0; i < 14; i++)
        result.patternIdPolList.push(DlData_decodePatternIdPolListPerSymbol_t(offset + 10 + i * 16));
    result.calibrationBitmap = l2l1_getU16(offset + 234);
    result.bfcmOffset = l2l1_getU8(offset + 236);

    return result;
}
function DlData_encodePatternConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.txRxBitmapPol, buf, off + 6);
    l2l1_putU8(msg.numOfPatternIdPol, buf, off + 8);
    l2l1_putU8(msg.numOfXpolBeams, buf, off + 9);
    for (let i = 0; i < 14; i++)
        DlData_encodePatternIdPolListPerSymbol_t(msg.patternIdPolList[i], buf, off + 10 + i * 16);
    l2l1_putU16(msg.calibrationBitmap, buf, off + 234);
    l2l1_putU8(msg.bfcmOffset, buf, off + 236);
}

function DlData_decodePbchSendReq_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.subcellId = l2l1_getU8(offset + 2);
    result.dataPayload = [];
    for (let i = 0; i < 4; i++)
        result.dataPayload.push(l2l1_getU8(offset + 3 + i * 1));

    return result;
}
function DlData_encodePbchSendReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.subcellId, buf, off + 2);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.dataPayload[i], buf, off + 3 + i * 1);
}

function DlData_decodeDciInfo(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.startSymbolNumber = l2l1_getU8(offset + 2);
    result.numOfSymbols = l2l1_getU8(offset + 3);
    result.startCce = l2l1_getU8(offset + 4);
    result.aggregationLevel = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_aggregationLevel", {
        enumerable: false,
        writable: false,
        value: "aggregationLevel_t",
    });
    result.dmrsReferencePoint = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_dmrsReferencePoint", {
        enumerable: false,
        writable: false,
        value: "dmrsReferencePoint_t",
    });
    result.pdcchPrecodingOption4x4 = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_pdcchPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "pdcchPrecodingOption4x4_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.pdcchDciTransmitPower = l2l1_getI16(offset + 10);
    result.dciScramblingSequenceInit = l2l1_getU16(offset + 12);
    result.coresetFreqDomain = l2l1_getU64(offset + 16);
    result.cceRegMappingType = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_cceRegMappingType", {
        enumerable: false,
        writable: false,
        value: "cceRegMappingType_t",
    });
    result.polarizationSelection = l2l1_getU8(offset + 25);
    Object.defineProperty(result, "__enum_polarizationSelection", {
        enumerable: false,
        writable: false,
        value: "polarizationSelection_t",
    });
    result.nShiftModNumOfRegBundles = l2l1_getU16(offset + 26);
    result.interleaverRows = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_interleaverRows", {
        enumerable: false,
        writable: false,
        value: "coresetInterleaverSize_t",
    });
    result.regBundleSize = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_regBundleSize", {
        enumerable: false,
        writable: false,
        value: "coresetRegBundleSize_t",
    });
    result.precoderGranularity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_precoderGranularity", {
        enumerable: false,
        writable: false,
        value: "precoderGranularity_t",
    });
    result.coresetFreqDomainRbShift = l2l1_getU8(offset + 31);
    result.dciSize = l2l1_getU8(offset + 32);
    result.numCeAxCIndex = l2l1_getU8(offset + 33);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ulSubcellIndication = l2l1_getU8(offset + 34);
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 35 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 40 + i * 2));
    result.dciPayload = [];
    for (let i = 0; i < 18; i++)
        result.dciPayload.push(l2l1_getU8(offset + 43 + i * 1));

    return result;
}
function DlData_encodeDciInfo(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.startSymbolNumber, buf, off + 2);
    l2l1_putU8(msg.numOfSymbols, buf, off + 3);
    l2l1_putU8(msg.startCce, buf, off + 4);
    l2l1_putU8(msg.aggregationLevel, buf, off + 5);
    l2l1_putU8(msg.dmrsReferencePoint, buf, off + 6);
    l2l1_putU8(msg.pdcchPrecodingOption4x4, buf, off + 7);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 8);
    l2l1_putI16(msg.pdcchDciTransmitPower, buf, off + 10);
    l2l1_putU16(msg.dciScramblingSequenceInit, buf, off + 12);
    l2l1_putU64(msg.coresetFreqDomain, buf, off + 16);
    l2l1_putU8(msg.cceRegMappingType, buf, off + 24);
    l2l1_putU8(msg.polarizationSelection, buf, off + 25);
    l2l1_putU16(msg.nShiftModNumOfRegBundles, buf, off + 26);
    l2l1_putU8(msg.interleaverRows, buf, off + 28);
    l2l1_putU8(msg.regBundleSize, buf, off + 29);
    l2l1_putU8(msg.precoderGranularity, buf, off + 30);
    l2l1_putU8(msg.coresetFreqDomainRbShift, buf, off + 31);
    l2l1_putU8(msg.dciSize, buf, off + 32);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 33);
    l2l1_putU8(msg.ulSubcellIndication, buf, off + 34);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 35 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 40 + i * 2);
    for (let i = 0; i < 18; i++)
        l2l1_putU8(msg.dciPayload[i], buf, off + 44 + i * 1);
}

function DlData_decodePdcchSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.beamId = l2l1_getU8(offset + 5);
    result.msgCountCtrl = l2l1_getU8(offset + 6);
    result.dciInfo = _decodeArray(offset + 8, DlData_decodeDciInfo, 64);

    return result;
}
function DlData_encodePdcchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.beamId, buf, off + 5);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 6);
    _encodeArray(msg.dciInfo, buf, off + 8, DlData_encodeDciInfo, 64);
}

function DlData_decodePdschPayloadTbSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.tbIndex = l2l1_getU32(offset + 8);
    result.tbFragmentOffset_bits = l2l1_getU32(offset + 12);
    result.payload = _decodeArray(offset + 16, l2l1_getU8, 1);

    return result;
}
function DlData_encodePdschPayloadTbSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU32(msg.tbIndex, buf, off + 8);
    l2l1_putU32(msg.tbFragmentOffset_bits, buf, off + 12);
    _encodeArray(msg.payload, buf, off + 16, l2l1_putU8, 1);
}

function DlData_decodePdschGrant(offset) {
    const result = {};

    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 0);
    result.dlDmrsConfigType = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 5);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 6);
    result.nscId = l2l1_getU8(offset + 7);
    result.startSymbol = l2l1_getU8(offset + 8);
    result.numOfPdschSymbols = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_numOfPdschSymbols", {
        enumerable: false,
        writable: false,
        value: "NumOfPdschSymbols",
    });
    result.antPort = l2l1_getU16(offset + 10);
    result.mcs = l2l1_getU8(offset + 12);
    result.mcsTable = l2l1_getU8(offset + 13);
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "mcsTable_t",
    });
    result.spatialMode = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 15);
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "DlCodebookIndex",
    });
    result.startPrb = l2l1_getU16(offset + 16);
    result.numOfPrb = l2l1_getU16(offset + 18);
    result.dlPtrsFlag = l2l1_getU8(offset + 20);
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 21);
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 23);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 24);
    result.offsetRbDmrs = l2l1_getU8(offset + 25);
    result.pdschTbTransmitPower = l2l1_getI16(offset + 26);
    result.pdschBundleSize = l2l1_getU16(offset + 28);
    result.baseGraph = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 31);
    result.codeBlockSize = l2l1_getU16(offset + 32);
    result.numOfFillerBits = l2l1_getU16(offset + 34);
    result.liftSize = l2l1_getU16(offset + 36);
    result.liftSizeSetIndex = l2l1_getU8(offset + 38);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 39);
    result.modulationOrder = l2l1_getU8(offset + 40);
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 41);
    result.ncb = l2l1_getU16(offset + 42);
    result.k0divZ = l2l1_getU8(offset + 44);
    result.numOfLayers = l2l1_getU8(offset + 45);
    result.rnti = l2l1_getU16(offset + 46);
    result.tbIndex = l2l1_getU32(offset + 48);
    result.tbStartOffset_bits = l2l1_getU32(offset + 52);
    result.tbSize_bits = l2l1_getU32(offset + 56);
    result.numOfDmrsCdmGroupWithoutData = l2l1_getU8(offset + 60);
    result.polarizationSelection = l2l1_getU8(offset + 61);
    Object.defineProperty(result, "__enum_polarizationSelection", {
        enumerable: false,
        writable: false,
        value: "polarizationSelection_t",
    });
    result.rbgSize = l2l1_getU8(offset + 62);
    result.rbgSizeFirst = l2l1_getU8(offset + 63);
    result.rat0Bitmap = l2l1_getU32(offset + 64);
    result.i1Codebook4AntPorts = [];
    for (let i = 0; i < 3; i++)
        result.i1Codebook4AntPorts.push(l2l1_getU8(offset + 68 + i * 1));
    result.i2Codebook4AntPorts = l2l1_getU8(offset + 71);
    result.pdschPrecodingOption4x4 = l2l1_getU8(offset + 72);
    Object.defineProperty(result, "__enum_pdschPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "pdschPrecodingOption4x4_t",
    });
    result.numStreamIndex = l2l1_getU8(offset + 73);
    Object.defineProperty(result, "__enum_numStreamIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.openLoopScheme = l2l1_getU8(offset + 74);
    Object.defineProperty(result, "__enum_openLoopScheme", {
        enumerable: false,
        writable: false,
        value: "openLoopScheme_t",
    });
    result.closedLoop3gppCodebook = l2l1_getU8(offset + 75);
    Object.defineProperty(result, "__enum_closedLoop3gppCodebook", {
        enumerable: false,
        writable: false,
        value: "closedLoop3gppCodebook_t",
    });
    result.streamIndex = [];
    for (let i = 0; i < 4; i++)
        result.streamIndex.push(l2l1_getU8(offset + 76 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 80 + i * 2));
    result.numLteCrsMappingRes = l2l1_getU16(offset + 84);
    result.lteCrsOption = l2l1_getU8(offset + 86);
    result.isCsirsRateMatching = l2l1_getU8(offset + 87);
    result.numCsirsMappingRes = l2l1_getU16(offset + 88);
    result.pdschScramblingSeqInit = l2l1_getU16(offset + 90);
    result.isLowPaprOptimizedPrecoding = l2l1_getU8(offset + 92);

    return result;
}
function DlData_encodePdschGrant(msg, buf, off) {
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 0);
    l2l1_putU8(msg.dlDmrsConfigType, buf, off + 2);
    l2l1_putU8(msg.dlDmrsLen, buf, off + 3);
    l2l1_putU8(msg.dlDmrsMappingType, buf, off + 4);
    l2l1_putU8(msg.dlDmrsAddPos, buf, off + 5);
    l2l1_putU8(msg.dlDmrsTypeAPos, buf, off + 6);
    l2l1_putU8(msg.nscId, buf, off + 7);
    l2l1_putU8(msg.startSymbol, buf, off + 8);
    l2l1_putU8(msg.numOfPdschSymbols, buf, off + 9);
    l2l1_putU16(msg.antPort, buf, off + 10);
    l2l1_putU8(msg.mcs, buf, off + 12);
    l2l1_putU8(msg.mcsTable, buf, off + 13);
    l2l1_putU8(msg.spatialMode, buf, off + 14);
    l2l1_putU8(msg.codebookIndex, buf, off + 15);
    l2l1_putU16(msg.startPrb, buf, off + 16);
    l2l1_putU16(msg.numOfPrb, buf, off + 18);
    l2l1_putU8(msg.dlPtrsFlag, buf, off + 20);
    l2l1_putU8(msg.dlPtrsTimeDensity, buf, off + 21);
    l2l1_putU8(msg.dlPtrsFrequencyDensity, buf, off + 22);
    l2l1_putU8(msg.dlPtrsNumOfPorts, buf, off + 23);
    l2l1_putU8(msg.dlPtrsResElemOffset, buf, off + 24);
    l2l1_putU8(msg.offsetRbDmrs, buf, off + 25);
    l2l1_putI16(msg.pdschTbTransmitPower, buf, off + 26);
    l2l1_putU16(msg.pdschBundleSize, buf, off + 28);
    l2l1_putU8(msg.baseGraph, buf, off + 30);
    l2l1_putU8(msg.numOfCodeBlocks, buf, off + 31);
    l2l1_putU16(msg.codeBlockSize, buf, off + 32);
    l2l1_putU16(msg.numOfFillerBits, buf, off + 34);
    l2l1_putU16(msg.liftSize, buf, off + 36);
    l2l1_putU8(msg.liftSizeSetIndex, buf, off + 38);
    l2l1_putU8(msg.liftSizeColumnIndex, buf, off + 39);
    l2l1_putU8(msg.modulationOrder, buf, off + 40);
    l2l1_putU8(msg.rvIndex, buf, off + 41);
    l2l1_putU16(msg.ncb, buf, off + 42);
    l2l1_putU8(msg.k0divZ, buf, off + 44);
    l2l1_putU8(msg.numOfLayers, buf, off + 45);
    l2l1_putU16(msg.rnti, buf, off + 46);
    l2l1_putU32(msg.tbIndex, buf, off + 48);
    l2l1_putU32(msg.tbStartOffset_bits, buf, off + 52);
    l2l1_putU32(msg.tbSize_bits, buf, off + 56);
    l2l1_putU8(msg.numOfDmrsCdmGroupWithoutData, buf, off + 60);
    l2l1_putU8(msg.polarizationSelection, buf, off + 61);
    l2l1_putU8(msg.rbgSize, buf, off + 62);
    l2l1_putU8(msg.rbgSizeFirst, buf, off + 63);
    l2l1_putU32(msg.rat0Bitmap, buf, off + 64);
    for (let i = 0; i < 3; i++)
        l2l1_putU8(msg.i1Codebook4AntPorts[i], buf, off + 68 + i * 1);
    l2l1_putU8(msg.i2Codebook4AntPorts, buf, off + 71);
    l2l1_putU8(msg.pdschPrecodingOption4x4, buf, off + 72);
    l2l1_putU8(msg.numStreamIndex, buf, off + 73);
    l2l1_putU8(msg.openLoopScheme, buf, off + 74);
    l2l1_putU8(msg.closedLoop3gppCodebook, buf, off + 75);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.streamIndex[i], buf, off + 76 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 80 + i * 2);
    l2l1_putU16(msg.numLteCrsMappingRes, buf, off + 84);
    l2l1_putU8(msg.lteCrsOption, buf, off + 86);
    l2l1_putU8(msg.isCsirsRateMatching, buf, off + 87);
    l2l1_putU16(msg.numCsirsMappingRes, buf, off + 88);
    l2l1_putU16(msg.pdschScramblingSeqInit, buf, off + 90);
    l2l1_putU8(msg.isLowPaprOptimizedPrecoding, buf, off + 92);
}

function DlData_decodePdschSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    const grantsLength = l2l1_getU8(offset + 5);
    const grantsOffset = l2l1_getU8(offset + 6);
    result.grants = [];
    for (let i = 0; i < grantsLength; i++)
        result.grants.push(DlData_decodePdschGrant(offset + 6 + grantsOffset + i * 96));
    result.msgCountCtrl = l2l1_getU8(offset + 7);

    return result;
}
function DlData_encodePdschSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    _encodePackedArray(msg.grants, buf, off + 5, DlData_encodePdschGrant, 96);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 7);
}

function DlData_decodeSlotTypeReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.slotType = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_slotType", {
        enumerable: false,
        writable: false,
        value: "slotType_t",
    });
    result.pwrReductionPerSymb_dB = [];
    for (let i = 0; i < 14; i++)
        result.pwrReductionPerSymb_dB.push(l2l1_getU8(offset + 6 + i * 1));

    return result;
}
function DlData_encodeSlotTypeReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.slotType, buf, off + 5);
    for (let i = 0; i < 14; i++)
        l2l1_putU8(msg.pwrReductionPerSymb_dB[i], buf, off + 6 + i * 1);
}

function DlData_decodeSsBlockSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.activeSsBlocks = l2l1_getU8(offset + 5);
    result.threeLsbSsbIndex = l2l1_getU8(offset + 6);
    result.precodingVectorIndex = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_precodingVectorIndex", {
        enumerable: false,
        writable: false,
        value: "precodingVectorIndex_t",
    });
    result.dataPayload = [];
    for (let i = 0; i < 4; i++)
        result.dataPayload.push(l2l1_getU8(offset + 8 + i * 1));
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 12 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 4; i++)
        result.patternId.push(l2l1_getU16(offset + 16 + i * 2));
    result.numCeAxcIndex = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_numCeAxcIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.msgCountCtrl = l2l1_getU8(offset + 25);

    return result;
}
function DlData_encodeSsBlockSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.activeSsBlocks, buf, off + 5);
    l2l1_putU8(msg.threeLsbSsbIndex, buf, off + 6);
    l2l1_putU8(msg.precodingVectorIndex, buf, off + 7);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.dataPayload[i], buf, off + 8 + i * 1);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 12 + i * 1);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 16 + i * 2);
    l2l1_putU8(msg.numCeAxcIndex, buf, off + 24);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 25);
}

function DlCellUe_decodeDeleteReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCellUe_encodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function DlCellUe_decodeDeleteResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cellDeleteStatus_t",
    });

    return result;
}
function DlCellUe_encodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}

function DlCellUe_decodeSetupReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "dlMimoMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
    Object.defineProperty(result, "__enum_dlBandwidth", {
        enumerable: false,
        writable: false,
        value: "EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.ssBlockPrbOffset = l2l1_getU8(offset + 9);
    result.ssBlockSubcarrierOffset = l2l1_getU8(offset + 10);
    result.ssBlockConfiguration = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_ssBlockConfiguration", {
        enumerable: false,
        writable: false,
        value: "ssBlockConfiguration_t",
    });
    result.pneRbThreshold = [];
    for (let i = 0; i < 29; i++)
        result.pneRbThreshold.push(l2l1_getU16(offset + 12 + i * 2));
    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 70 + i * 2));
    result.ssBlockPhaseCompensationLutIndex = [];
    for (let i = 0; i < 224; i++)
        result.ssBlockPhaseCompensationLutIndex.push(l2l1_getU16(offset + 294 + i * 2));
    result.rxScalingFactor = l2l1_getI16(offset + 742);
    result.dlSubcellPosition = l2l1_getU8(offset + 744);
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });

    return result;
}
function DlCellUe_encodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.dlSubcellType, buf, off + 1);
    l2l1_putU8(msg.dlMimoMode, buf, off + 2);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU16(msg.dlBandwidth, buf, off + 6);
    l2l1_putU8(msg.scs, buf, off + 8);
    l2l1_putU8(msg.ssBlockPrbOffset, buf, off + 9);
    l2l1_putU8(msg.ssBlockSubcarrierOffset, buf, off + 10);
    l2l1_putU8(msg.ssBlockConfiguration, buf, off + 11);
    for (let i = 0; i < 29; i++)
        l2l1_putU16(msg.pneRbThreshold[i], buf, off + 12 + i * 2);
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 70 + i * 2);
    for (let i = 0; i < 224; i++)
        l2l1_putU16(msg.ssBlockPhaseCompensationLutIndex[i], buf, off + 294 + i * 2);
    l2l1_putI16(msg.rxScalingFactor, buf, off + 742);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 744);
}

function DlCellUe_decodeSetupResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCellUe_encodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function DlCell_decodeDeleteReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCell_encodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function DlCell_decodeDeleteResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cellDeleteStatus_t",
    });

    return result;
}
function DlCell_encodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}

function DlCell_decodeSetupReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "dlMimoMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
    Object.defineProperty(result, "__enum_dlBandwidth", {
        enumerable: false,
        writable: false,
        value: "EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "EScs",
    });
    result.ssBlockPower = l2l1_getI16(offset + 10);
    result.ssBlockPrbOffset = l2l1_getU8(offset + 12);
    result.ssBlockSubcarrierOffset = l2l1_getU8(offset + 13);
    result.ssBlockConfiguration = l2l1_getU8(offset + 14);
    Object.defineProperty(result, "__enum_ssBlockConfiguration", {
        enumerable: false,
        writable: false,
        value: "ssBlockConfiguration_t",
    });
    result.phaseCompensationLutIndex = _decodeArray(offset + 16, DlCell_decodephaseCompensationLutIndex_t, 224);
    result.ssBlockPhaseCompensationLutIndex = [];
    for (let i = 0; i < 224; i++)
        result.ssBlockPhaseCompensationLutIndex.push(l2l1_getU16(offset + 24 + i * 2));
    result.dlSubcellPosition = l2l1_getU8(offset + 471);
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 472);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 473);
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCId = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCId.push(l2l1_getU16(offset + 474 + i * 2));
    result.conformanceTestMode = l2l1_getU8(offset + 482);
    result.actBeamforming = l2l1_getU8(offset + 483);
    result.isLteCrsMappingEnable = l2l1_getU8(offset + 484);
    result.numLteCrsPorts = l2l1_getU8(offset + 485);
    Object.defineProperty(result, "__enum_numLteCrsPorts", {
        enumerable: false,
        writable: false,
        value: "numLteCrsPorts_t",
    });
    result.reLteNuShift = l2l1_getU8(offset + 486);
    result.lteDlBandwidth = l2l1_getU8(offset + 487);
    Object.defineProperty(result, "__enum_lteDlBandwidth", {
        enumerable: false,
        writable: false,
        value: "lteDlBandwidth_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 488);
    result.cpriDialectIndication = l2l1_getU8(offset + 489);
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "cpriDialectIndication_t",
    });
    result.axcPosition = [];
    const axcPositionLength = l2l1_getU32(offset + 492);
    for (let i = 0; i < axcPositionLength && i < 16; i++)
        result.axcPosition.push(l2l1_getU32(offset + 496 + i * 4));
    result.dlScPerCarrierPart = _decodeArray(offset + 560, l2l1_getU16, 2);
    result.dlEcpriFdBeamforming = l2l1_getU8(offset + 566);
    result.dlSubcellPoolId = l2l1_getU8(offset + 567);
    result.dlReferenceLevel = l2l1_getU16(offset + 568);
    result.actDlEcpriPhase4 = l2l1_getU8(offset + 570);
    result.actORANstep1 = l2l1_getU8(offset + 571);
    result.mantissaSize = l2l1_getU8(offset + 572);
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "mantissaSize_t",
    });
    result.dlIqCompression = l2l1_getU8(offset + 573);
    result.dlActDownSampling = l2l1_getU8(offset + 574);
    result.actDlEcpriExtType12 = l2l1_getU8(offset + 575);
    result.l1SubpoolId = l2l1_getU16(offset + 576);
    result.firstCellSlotId = l2l1_getU16(offset + 578);
    result.cellSlotLength = l2l1_getU16(offset + 580);

    return result;
}
function DlCell_encodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.dlSubcellType, buf, off + 1);
    l2l1_putU8(msg.dlMimoMode, buf, off + 2);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU16(msg.dlBandwidth, buf, off + 6);
    l2l1_putU8(msg.scs, buf, off + 8);
    l2l1_putI16(msg.ssBlockPower, buf, off + 10);
    l2l1_putU8(msg.ssBlockPrbOffset, buf, off + 12);
    l2l1_putU8(msg.ssBlockSubcarrierOffset, buf, off + 13);
    l2l1_putU8(msg.ssBlockConfiguration, buf, off + 14);
    _encodeArray(msg.phaseCompensationLutIndex, buf, off + 16, DlCell_encodephaseCompensationLutIndex_t, 224);
    for (let i = 0; i < 224; i++)
        l2l1_putU16(msg.ssBlockPhaseCompensationLutIndex[i], buf, off + 24 + i * 2);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 472);
    l2l1_putU8(msg.eCpriLink, buf, off + 473);
    l2l1_putU8(msg.numCeAxCId, buf, off + 474);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.ceAxCId[i], buf, off + 476 + i * 2);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 484);
    l2l1_putU8(msg.actBeamforming, buf, off + 485);
    l2l1_putU8(msg.isLteCrsMappingEnable, buf, off + 486);
    l2l1_putU8(msg.numLteCrsPorts, buf, off + 487);
    l2l1_putU8(msg.reLteNuShift, buf, off + 488);
    l2l1_putU8(msg.lteDlBandwidth, buf, off + 489);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 490);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 491);
    l2l1_putU32(msg.axcPosition.length, buf, off + 492);
    for (let i = 0; i < msg.axcPosition.length && i < 16; i++)
        l2l1_putU32(msg.axcPosition[i], buf, off + 492 + i * 4);
    _encodeArray(msg.dlScPerCarrierPart, buf, off + 556, l2l1_putU16, 2);
    l2l1_putU8(msg.dlEcpriFdBeamforming, buf, off + 564);
    l2l1_putU8(msg.dlSubcellPoolId, buf, off + 565);
    l2l1_putU16(msg.dlReferenceLevel, buf, off + 566);
    l2l1_putU8(msg.actDlEcpriPhase4, buf, off + 568);
    l2l1_putU8(msg.actORANstep1, buf, off + 569);
    l2l1_putU8(msg.mantissaSize, buf, off + 570);
    l2l1_putU8(msg.dlIqCompression, buf, off + 571);
    l2l1_putU8(msg.dlActDownSampling, buf, off + 572);
    l2l1_putU8(msg.actDlEcpriExtType12, buf, off + 573);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 574);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 576);
    l2l1_putU16(msg.cellSlotLength, buf, off + 578);
}

function DlCell_decodephaseCompensationLutIndex_t(offset) {
    const result = {};

    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 0 + i * 2));

    return result;
}
function DlCell_encodephaseCompensationLutIndex_t(msg, buf, off) {
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 0 + i * 2);
}

function DlCell_decodeSetupResp_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCell_encodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}

function _decodeArray(off, element, elementSize) {
    const arrayOff = l2l1_getU32(off);
    const len = l2l1_getU32(off + 4);
    off = arrayOff + off;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(element(off));
        off += elementSize;
    }

    return result;
}

function _encodeArray(arr, buf, off, encoder) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        encoder(elem, dynamic, dynamic.length);
    }
}

function _encodePackedArray(arr, buf, off, encoder) {
    l2l1_putU8(arr.length, buf, off);
    off += 1;
    l2l1_putU8(buf.static.length - off + buf.dynamic.getLength(), buf, off);

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        encoder(elem, dynamic, dynamic.getLength());
    }
}
function l2l1_decode_msg(l2l1) {
    let result;
    switch (l2l1.message) {
    case 0xf204: // UlDataUe::AddressReq_t
        result = UlDataUe_decodeAddressReq_t(0);
        break;
    case 0xf2ff: // UlDataUe::SlotTypeReq_t
        result = UlDataUe_decodeSlotTypeReq_t(0);
        break;
    case 0xf306: // UlDataUe::AddressResp_t
        result = UlDataUe_decodeAddressResp_t(0);
        break;
    case 0xf30f: // UlDataUe::SrsSendReq_t
        result = UlDataUe_decodeSrsSendReq_t(0);
        break;
    case 0xf31a: // UlDataUe::PrachSendReq_t
        result = UlDataUe_decodePrachSendReq_t(0);
        break;
    case 0xf31b: // UlDataUe::PatternConfigReq_t
        result = UlDataUe_decodePatternConfigReq_t(0);
        break;
    case 0xf326: // UlDataUe::PuschSendReq_t
        result = UlDataUe_decodePuschSendReq_t(0);
        break;
    case 0xf33f: // UlDataUe::PucchSendReq_t
        result = UlDataUe_decodePucchSendReq_t(0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        result = UlData_decodePrachReceiveInd_t(0);
        break;
    case 0x0243: // UlData::AddressReq_t
        result = UlData_decodeAddressReq_t(0);
        break;
    case 0xE200: // UlData::PuschReceiveRespHarqD_t
        result = UlData_decodePuschReceiveRespHarqD_t(0);
        break;
    case 0xE205: // UlData::PrachReceiveInd_t
        result = UlData_decodePrachReceiveInd_t(0);
        break;
    case 0xE208: // UlData::PucchReceiveRespHarqD_t
        result = UlData_decodePucchReceiveRespHarqD_t(0);
        break;
    case 0xE20B: // UlData::PuschReceiveRespHarqU_t
        result = UlData_decodePuschReceiveRespHarqU_t(0);
        break;
    case 0xE21C: // UlData::FastAntennaSnapshotResp_t
        result = UlData_decodeFastAntennaSnapshotResp_t(0);
        break;
    case 0xE222: // UlData::PucchReceiveRespPs_t
        result = UlData_decodePucchReceiveRespPs_t(0);
        break;
    case 0xE225: // UlData::PuschReceiveRespPs_t
        result = UlData_decodePuschReceiveRespPs_t(0);
        break;
    case 0xE226: // UlData::PucchReceiveReq_t
        result = UlData_decodePucchReceiveReq_t(0);
        break;
    case 0xE229: // UlData::EmptyReceiveReq_t
        result = UlData_decodeEmptyReceiveReq_t(0);
        break;
    case 0xE230: // UlData::AddressResp_t
        result = UlData_decodeAddressResp_t(0);
        break;
    case 0xE231: // UlData::PrachReceiveReq_t
        result = UlData_decodePrachReceiveReq_t(0);
        break;
    case 0xE235: // UlData::FastAntennaSnapshotReq_t
        result = UlData_decodeFastAntennaSnapshotReq_t(0);
        break;
    case 0xE237: // UlData::SrsReceiveRespPs_t
        result = UlData_decodeSrsReceiveRespPs_t(0);
        break;
    case 0xE243: // UlData::SrsReceiveReq_t
        result = UlData_decodeSrsReceiveReq_t(0);
        break;
    case 0xE244: // UlData::SrsReceiveRespBmPs_t
        result = UlData_decodeSrsReceiveRespBmPs_t(0);
        break;
    case 0xE246: // UlData::PuschReceiveReq_t
        result = UlData_decodePuschReceiveReq_t(0);
        break;
    case 0xf201: // UlCellUe::SetupResp_t
        result = UlCellUe_decodeSetupResp_t(0);
        break;
    case 0xf316: // UlCellUe::DeleteReq_t
        result = UlCellUe_decodeDeleteReq_t(0);
        break;
    case 0xf317: // UlCellUe::DeleteResp_t
        result = UlCellUe_decodeDeleteResp_t(0);
        break;
    case 0xf33e: // UlCellUe::SetupReq_t
        result = UlCellUe_decodeSetupReq_t(0);
        break;
    case 0x0201: // UlCell::SetupResp_t
        result = UlCell_decodeSetupResp_t(0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        result = UlCell_decodeDeleteReq_t(0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        result = UlCell_decodeDeleteResp_t(0);
        break;
    case 0x0a30: // L1ECpri::ConfigureLinksReq_t
        result = L1ECpri_decodeConfigureLinksReq_t(0);
        break;
    case 0x0a31: // L1ECpri::ConfigureLinksResp_t
        result = L1ECpri_decodeConfigureLinksResp_t(0);
        break;
    case 0x0a32: // L1ECpri::SubscribeReq_t
        result = L1ECpri_decodeSubscribeReq_t(0);
        break;
    case 0x0a33: // L1ECpri::SubscribeResp_t
        result = L1ECpri_decodeSubscribeResp_t(0);
        break;
    case 0x0a34: // L1ECpri::SetOutputReq_t
        result = L1ECpri_decodeSetOutputReq_t(0);
        break;
    case 0x0a35: // L1ECpri::SetOutputResp_t
        result = L1ECpri_decodeSetOutputResp_t(0);
        break;
    case 0x0a36: // L1ECpri::StateInd_t
        result = L1ECpri_decodeStateInd_t(0);
        break;
    case 0x0a38: // L1ECpri::DelayConfigResp_t
        result = L1ECpri_decodeDelayConfigResp_t(0);
        break;
    case 0x0a39: // L1ECpri::ConfigureTransportReq_t
        result = L1ECpri_decodeConfigureTransportReq_t(0);
        break;
    case 0x0a3a: // L1ECpri::ConfigureTransportResp_t
        result = L1ECpri_decodeConfigureTransportResp_t(0);
        break;
    case 0x0a3b: // L1ECpri::InitialDelayMeasReq_t
        result = L1ECpri_decodeInitialDelayMeasReq_t(0);
        break;
    case 0x0a3c: // L1ECpri::InitialDelayMeasResp_t
        result = L1ECpri_decodeInitialDelayMeasResp_t(0);
        break;
    case 0x0a3d: // L1ECpri::DelayMeasInd_t
        result = L1ECpri_decodeDelayMeasInd_t(0);
        break;
    case 0x0a3e: // L1ECpri::ConfigureMeasurementsReq_t
        result = L1ECpri_decodeConfigureMeasurementsReq_t(0);
        break;
    case 0x0a3f: // L1ECpri::ConfigureMeasurementsResp_t
        result = L1ECpri_decodeConfigureMeasurementsResp_t(0);
        break;
    case 0x0a40: // L1ECpri::MsgRcvCountersInd_t
        result = L1ECpri_decodeMsgRcvCountersInd_t(0);
        break;
    case 0xe305: // L1ECpri::API2ConfigureTransportReq_t
        result = L1ECpri_decodeAPI2ConfigureTransportReq_t(0);
        break;
    case 0xe306: // L1ECpri::API2ConfigureTransportResp_t
        result = L1ECpri_decodeAPI2ConfigureTransportResp_t(0);
        break;
    case 0xe307: // L1ECpri::API2DeleteTransportReq_t
        result = L1ECpri_decodeAPI2DeleteTransportReq_t(0);
        break;
    case 0xe308: // L1ECpri::API2DeleteTransportResp_t
        result = L1ECpri_decodeAPI2DeleteTransportResp_t(0);
        break;
    case 0xe309: // L1ECpri::DelayConfigReq_t
        result = L1ECpri_decodeDelayConfigReq_t(0);
        break;
    case 0xE247: // UlCell::SetupReq_t
        result = UlCell_decodeSetupReq_t(0);
        break;
    case 0xd220: // SyncM::startPtpReq_t
        result = SyncM_decodestartPtpReq_t(0);
        break;
    case 0xd221: // SyncM::startPtpResp_t
        result = SyncM_decodestartPtpResp_t(0);
        break;
    case 0xd222: // SyncM::updatePtpConfigReq_t
        result = SyncM_decodeupdatePtpConfigReq_t(0);
        break;
    case 0xd223: // SyncM::updatePtpConfigResp_t
        result = SyncM_decodeupdatePtpConfigResp_t(0);
        break;
    case 0xd224: // SyncM::startSyncEReq_t
        result = SyncM_decodestartSyncEReq_t(0);
        break;
    case 0xd225: // SyncM::startSyncEResp_t
        result = SyncM_decodestartSyncEResp_t(0);
        break;
    case 0xd226: // SyncM::updateSyncEConfigReq_t
        result = SyncM_decodeupdateSyncEConfigReq_t(0);
        break;
    case 0xd227: // SyncM::updateSyncEConfigResp_t
        result = SyncM_decodeupdateSyncEConfigResp_t(0);
        break;
    case 0xd228: // SyncM::getSyncEStatusReq_t
        result = SyncM_decodegetSyncEStatusReq_t(0);
        break;
    case 0xd229: // SyncM::getSyncEStatusResp_t
        result = SyncM_decodegetSyncEStatusResp_t(0);
        break;
    case 0xd22a: // SyncM::getPtpStatusReq_t
        result = SyncM_decodegetPtpStatusReq_t(0);
        break;
    case 0xd22b: // SyncM::getPtpStatusResp_t
        result = SyncM_decodegetPtpStatusResp_t(0);
        break;
    case 0xd22c: // SyncM::stopSyncEReq_t
        result = SyncM_decodestopSyncEReq_t(0);
        break;
    case 0xd22d: // SyncM::stopSyncEResp_t
        result = SyncM_decodestopSyncEResp_t(0);
        break;
    case 0xd22e: // SyncM::stopPtpReq_t
        result = SyncM_decodestopPtpReq_t(0);
        break;
    case 0xd22f: // SyncM::stopPtpResp_t
        result = SyncM_decodestopPtpResp_t(0);
        break;
    case 0xd230: // SyncM::statusInd_t
        result = SyncM_decodestatusInd_t(0);
        break;
    case 0x0104: // DlData::AddressReq_t
        result = DlData_decodeAddressReq_t(0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        result = DlData_decodePdschPayloadTbSendReq_t(0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        result = DlData_decodeSlotTypeReq_t(0);
        break;
    case 0xE101: // DlData::PatternConfigReq_t
        result = DlData_decodePatternConfigReq_t(0);
        break;
    case 0xE10C: // DlData::FastAntennaSnapshotResp_t
        result = DlData_decodeFastAntennaSnapshotResp_t(0);
        break;
    case 0xE10F: // DlData::SsBlockSendReq_t
        result = DlData_decodeSsBlockSendReq_t(0);
        break;
    case 0xE110: // DlData::CsiRsSendReq_t
        result = DlData_decodeCsiRsSendReq_t(0);
        break;
    case 0xE111: // DlData::EmptySendReq_t
        result = DlData_decodeEmptySendReq_t(0);
        break;
    case 0xE112: // DlData::AddressResp_t
        result = DlData_decodeAddressResp_t(0);
        break;
    case 0xE113: // DlData::PdcchSendReq_t
        result = DlData_decodePdcchSendReq_t(0);
        break;
    case 0xE115: // DlData::FastAntennaSnapshotReq_t
        result = DlData_decodeFastAntennaSnapshotReq_t(0);
        break;
    case 0xE118: // DlData::PdschSendReq_t
        result = DlData_decodePdschSendReq_t(0);
        break;
    case 0xff03: // SmDataUe::PdcchInd_t
        result = SmDataUe_decodePdcchInd_t(0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        result = L1Log_decodeAntennaSnapshotReq_t(0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        result = L1Log_decodeAntennaSnapshotResp_t(0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        result = L1Log_decodeShowTraceListResp_t(0);
        break;
    case 0x0a63: // L1Log::AntennaSnapshotConfigurationResp_t
        result = L1Log_decodeAntennaSnapshotConfigurationResp_t(0);
        break;
    case 0xe3b0: // L1Log::TraceReq_t
        result = L1Log_decodeTraceReq_t(0);
        break;
    case 0xe3b1: // L1Log::ShowTraceListReq_t
        result = L1Log_decodeShowTraceListReq_t(0);
        break;
    case 0xe3b2: // L1Log::AntennaSnapshotConfigurationReq_t
        result = L1Log_decodeAntennaSnapshotConfigurationReq_t(0);
        break;
    case 0xe3b3: // L1Log::AntennaSnapshotInd_t
        result = L1Log_decodeAntennaSnapshotInd_t(0);
        break;
    case 0xe3b4: // L1Log::TraceInd_t
        result = L1Log_decodeTraceInd_t(0);
        break;
    case 0xe3b5: // L1Log::TraceResp_t
        result = L1Log_decodeTraceResp_t(0);
        break;
    case 0xE387: // L1Fcp::DlUlChannelsReq_t
        result = L1Fcp_decodeDlUlChannelsReq_t(0);
        break;
    case 0x0a00: // L1Cpri::AlarmInd_t
        result = L1Cpri_decodeAlarmInd_t(0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        result = L1Cpri_decodeConfigureLinksReq_t(0);
        break;
    case 0x0a02: // L1Cpri::ConfigureLinksResp_t
        result = L1Cpri_decodeConfigureLinksResp_t(0);
        break;
    case 0x0a05: // L1Cpri::SetOutputReq_t
        result = L1Cpri_decodeSetOutputReq_t(0);
        break;
    case 0x0a06: // L1Cpri::SetOutputResp_t
        result = L1Cpri_decodeSetOutputResp_t(0);
        break;
    case 0x0a07: // L1Cpri::StateInd_t
        result = L1Cpri_decodeStateInd_t(0);
        break;
    case 0x0a08: // L1Cpri::SubscribeReq_t
        result = L1Cpri_decodeSubscribeReq_t(0);
        break;
    case 0x0a09: // L1Cpri::SubscribeResp_t
        result = L1Cpri_decodeSubscribeResp_t(0);
        break;
    case 0x0a0a: // L1Cpri::DiscoveryInd_t
        result = L1Cpri_decodeDiscoveryInd_t(0);
        break;
    case 0x0a0e: // L1Cpri::DelayConfigResp_t
        result = L1Cpri_decodeDelayConfigResp_t(0);
        break;
    case 0x0a0f: // L1Cpri::GetLinkParamReq_t
        result = L1Cpri_decodeGetLinkParamReq_t(0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        result = L1Cpri_decodeSetDiscoveryReq_t(0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        result = L1Cpri_decodeSetDiscoveryResp_t(0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        result = L1Cpri_decodeSetLinkPropertiesResp_t(0);
        break;
    case 0x0A43: // L1Cpri::ConfigureAxcInfoResp_t
        result = L1Cpri_decodeConfigureAxcInfoResp_t(0);
        break;
    case 0x0A44: // L1Cpri::DeleteAxcInfoReq_t
        result = L1Cpri_decodeDeleteAxcInfoReq_t(0);
        break;
    case 0x0A45: // L1Cpri::DeleteAxcInfoResp_t
        result = L1Cpri_decodeDeleteAxcInfoResp_t(0);
        break;
    case 0x0a48: // L1Cpri::ConfigureVsbReq_t
        result = L1Cpri_decodeConfigureVsbReq_t(0);
        break;
    case 0x0a49: // L1Cpri::ConfigureVsbResp_t
        result = L1Cpri_decodeConfigureVsbResp_t(0);
        break;
    case 0x0a4A: // L1Cpri::SubscribeVsbChangesReq_t
        result = L1Cpri_decodeSubscribeVsbChangesReq_t(0);
        break;
    case 0x0a4B: // L1Cpri::SubscribeVsbChangesResp_t
        result = L1Cpri_decodeSubscribeVsbChangesResp_t(0);
        break;
    case 0x0a4C: // L1Cpri::VsbDataInd_t
        result = L1Cpri_decodeVsbDataInd_t(0);
        break;
    case 0x0a4D: // L1Cpri::SendVsbDataReq_t
        result = L1Cpri_decodeSendVsbDataReq_t(0);
        break;
    case 0x0a4E: // L1Cpri::SendVsbDataResp_t
        result = L1Cpri_decodeSendVsbDataResp_t(0);
        break;
    case 0x0a4F: // L1Cpri::SetLinkPropertiesReq_t
        result = L1Cpri_decodeSetLinkPropertiesReq_t(0);
        break;
    case 0xe301: // L1Cpri::ConfigureAxcInfoReq_t
        result = L1Cpri_decodeConfigureAxcInfoReq_t(0);
        break;
    case 0xe311: // L1Cpri::DelayConfigReq_t
        result = L1Cpri_decodeDelayConfigReq_t(0);
        break;
    case 0xe312: // L1Cpri::GetLinkParamResp_t
        result = L1Cpri_decodeGetLinkParamResp_t(0);
        break;
    case 0xe3f0: // L1Config::L1Config_SwConfigurationReq_t
        result = L1Config_decodeL1Config_SwConfigurationReq_t(0);
        break;
    case 0xe3f1: // L1Config::L1Config_SwConfigurationResp_t
        result = L1Config_decodeL1Config_SwConfigurationResp_t(0);
        break;
    case 0xE391: // L1ChannelStreamer::DeregisterReq_t
        result = L1ChannelStreamer_decodeDeregisterReq_t(0);
        break;
    case 0xE392: // L1ChannelStreamer::DeregisterResp_t
        result = L1ChannelStreamer_decodeDeregisterResp_t(0);
        break;
    case 0xE393: // L1ChannelStreamer::RegisterReq_t
        result = L1ChannelStreamer_decodeRegisterReq_t(0);
        break;
    case 0xE394: // L1ChannelStreamer::RegisterResp_t
        result = L1ChannelStreamer_decodeRegisterResp_t(0);
        break;
    case 0xE395: // L1ChannelStreamer::ReceiveInd_t
        result = L1ChannelStreamer_decodeReceiveInd_t(0);
        break;
    case 0xE396: // L1ChannelStreamer::SendReq_t
        result = L1ChannelStreamer_decodeSendReq_t(0);
        break;
    case 0xE3E4: // L1Call::NrUlTestReportInd_t
        result = L1Call_decodeNrUlTestReportInd_t(0);
        break;
    case 0x0001: // L1::PingPongReq_t
        result = L1_decodePingPongReq_t(0);
        break;
    case 0x0002: // L1::EchoReq_t
        result = L1_decodeEchoReq_t(0);
        break;
    case 0x0003: // L1::EchoResp_t
        result = L1_decodeEchoResp_t(0);
        break;
    case 0x0004: // L1::LoopReq_t
        result = L1_decodeLoopReq_t(0);
        break;
    case 0x0005: // L1::UlMeasReq_t
        result = L1_decodeUlMeasReq_t(0);
        break;
    case 0x0006: // L1::WakeupReq_t
        result = L1_decodeWakeupReq_t(0);
        break;
    case 0x0007: // L1::StartupLoopReq_t
        result = L1_decodeStartupLoopReq_t(0);
        break;
    case 0x0008: // L1::SnapshotFileCreationReq_t
        result = L1_decodeSnapshotFileCreationReq_t(0);
        break;
    case 0x0009: // L1::LatencyEventReq_t
        result = L1_decodeLatencyEventReq_t(0);
        break;
    case 0x000A: // L1::DmaEndInd_t
        result = L1_decodeDmaEndInd_t(0);
        break;
    case 0x000B: // L1::LaWakeupReq_t
        result = L1_decodeLaWakeupReq_t(0);
        break;
    case 0x000C: // L1::DmaStartTestReq_t
        result = L1_decodeDmaStartTestReq_t(0);
        break;
    case 0x000D: // L1::NrtRxSubcellResetReq_t
        result = L1_decodeNrtRxSubcellResetReq_t(0);
        break;
    case 0x000E: // L1::SyncInd_t
        result = L1_decodeSyncInd_t(0);
        break;
    case 0xE002: // L1::TestModeConfigReq_t
        result = L1_decodeTestModeConfigReq_t(0);
        break;
    case 0xE003: // L1::TestModeConfigResp_t
        result = L1_decodeTestModeConfigResp_t(0);
        break;
    case 0xf104: // DlDataUe::AddressReq_t
        result = DlDataUe_decodeAddressReq_t(0);
        break;
    case 0xf1ff: // DlDataUe::SyncInd_t
        result = DlDataUe_decodeSyncInd_t(0);
        break;
    case 0xf1fd: // DlDataUe::PdschReceiveRespHarqD_t
        result = DlDataUe_decodePdschReceiveRespHarqD_t(0);
        break;
    case 0xf1fb: // DlDataUe::PdschReceiveRespSmD_t
        result = DlDataUe_decodePdschReceiveRespSmD_t(0);
        break;
    case 0xf301: // DlDataUe::AddressResp_t
        result = DlDataUe_decodeAddressResp_t(0);
        break;
    case 0xf30A: // DlDataUe::PdcchReceiveResp_t
        result = DlDataUe_decodePdcchReceiveResp_t(0);
        break;
    case 0xf31f: // DlDataUe::PdcchReceiveReq_t
        result = DlDataUe_decodePdcchReceiveReq_t(0);
        break;
    case 0xf321: // DlDataUe::SsBurstReceiveReq_t
        result = DlDataUe_decodeSsBurstReceiveReq_t(0);
        break;
    case 0xf322: // DlDataUe::SsBurstReceiveResp_t
        result = DlDataUe_decodeSsBurstReceiveResp_t(0);
        break;
    case 0xf329: // DlDataUe::PdschReceiveReq_t
        result = DlDataUe_decodePdschReceiveReq_t(0);
        break;
    case 0xf336: // DlDataUe::CsiRsReceiveReq_t
        result = DlDataUe_decodeCsiRsReceiveReq_t(0);
        break;
    case 0xf337: // DlDataUe::CsiRsReceiveResp_t
        result = DlDataUe_decodeCsiRsReceiveResp_t(0);
        break;
    case 0xf101: // DlCellUe::SetupResp_t
        result = DlCellUe_decodeSetupResp_t(0);
        break;
    case 0xf31d: // DlCellUe::DeleteReq_t
        result = DlCellUe_decodeDeleteReq_t(0);
        break;
    case 0xf31e: // DlCellUe::DeleteResp_t
        result = DlCellUe_decodeDeleteResp_t(0);
        break;
    case 0xf328: // DlCellUe::SetupReq_t
        result = DlCellUe_decodeSetupReq_t(0);
        break;
    case 0x0101: // DlCell::SetupResp_t
        result = DlCell_decodeSetupResp_t(0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        result = DlCell_decodeDeleteReq_t(0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        result = DlCell_decodeDeleteResp_t(0);
        break;
    case 0xE117: // DlCell::SetupReq_t
        result = DlCell_decodeSetupReq_t(0);
        break;

    default: throw new Error(`Unknown message type ${l2l1.message}`);
    }

    for (const [key, value] of Object.entries(result)) {
        l2l1[key] = value;
    }
}

function l2l1_encode_msg(l2l1) {
    const proxyHandler = {
        get(target, key) {
            if (key in target) {
                return target[key];
            }

            return target.isDynamic ? target.dynamic[key] : target.static[key];
        },

        set(obj, prop, value) {
            if (prop in obj) {
                obj[prop] = value;
                return true;
            }

            const target = obj.isDynamic ? obj.dynamic : obj.static;
            target[prop] = value;
            return true;
        }
    };

    const buf = new Proxy({
        isDynamic: false,
        dynamic: new Proxy({
            buf: new Uint8Array(30),
            length: 0,

            getBuf() {
                return this.buf.slice(0, this.length);
            },

            getLength() {
                return this.length;
            },
        }, {
            get(target, key) {
                if (typeof target[key] === "function") {
                    return target[key].bind(target);
                }

                return target.buf[key];
            },

            set(obj, prop, value) {
                const idx = parseInt(prop);
                if (Number.isNaN(prop)) {
                    obj[prop] = value;
                    return true;
                }

                if (idx >= obj.buf.length) {
                    const biggerBuf = new Uint8Array(obj.buf.length * 2);
                    biggerBuf.set(obj.buf);
                    obj.buf = biggerBuf;
                }

                obj.buf[idx] = value;
                obj.length = idx + 1;
                return true;
            }
        }),
        static: null,

        asDynamic() {
            return new Proxy({
                ...this,
                isDynamic: true,
            }, proxyHandler);
        },
    }, proxyHandler);

    switch (l2l1.message) {
    case 0xf204: // UlDataUe::AddressReq_t
        buf.static = new Uint8Array(1);
        UlDataUe_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xf2ff: // UlDataUe::SlotTypeReq_t
        buf.static = new Uint8Array(20);
        UlDataUe_encodeSlotTypeReq_t(l2l1, buf, 0);
        break;
    case 0xf306: // UlDataUe::AddressResp_t
        buf.static = new Uint8Array(32);
        UlDataUe_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xf30f: // UlDataUe::SrsSendReq_t
        buf.static = new Uint8Array(24);
        UlDataUe_encodeSrsSendReq_t(l2l1, buf, 0);
        break;
    case 0xf31a: // UlDataUe::PrachSendReq_t
        buf.static = new Uint8Array(16);
        UlDataUe_encodePrachSendReq_t(l2l1, buf, 0);
        break;
    case 0xf31b: // UlDataUe::PatternConfigReq_t
        buf.static = new Uint8Array(460);
        UlDataUe_encodePatternConfigReq_t(l2l1, buf, 0);
        break;
    case 0xf326: // UlDataUe::PuschSendReq_t
        buf.static = new Uint8Array(92);
        UlDataUe_encodePuschSendReq_t(l2l1, buf, 0);
        break;
    case 0xf33f: // UlDataUe::PucchSendReq_t
        buf.static = new Uint8Array(14);
        UlDataUe_encodePucchSendReq_t(l2l1, buf, 0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(16);
        UlData_encodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0x0243: // UlData::AddressReq_t
        buf.static = new Uint8Array(8);
        UlData_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xE200: // UlData::PuschReceiveRespHarqD_t
        buf.static = new Uint8Array(16);
        UlData_encodePuschReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0xE205: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(16);
        UlData_encodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0xE208: // UlData::PucchReceiveRespHarqD_t
        buf.static = new Uint8Array(16);
        UlData_encodePucchReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0xE20B: // UlData::PuschReceiveRespHarqU_t
        buf.static = new Uint8Array(16);
        UlData_encodePuschReceiveRespHarqU_t(l2l1, buf, 0);
        break;
    case 0xE21C: // UlData::FastAntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        UlData_encodeFastAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0xE222: // UlData::PucchReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlData_encodePucchReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE225: // UlData::PuschReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlData_encodePuschReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE226: // UlData::PucchReceiveReq_t
        buf.static = new Uint8Array(20);
        UlData_encodePucchReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE229: // UlData::EmptyReceiveReq_t
        buf.static = new Uint8Array(6);
        UlData_encodeEmptyReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE230: // UlData::AddressResp_t
        buf.static = new Uint8Array(28);
        UlData_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE231: // UlData::PrachReceiveReq_t
        buf.static = new Uint8Array(12);
        UlData_encodePrachReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE235: // UlData::FastAntennaSnapshotReq_t
        buf.static = new Uint8Array(44);
        UlData_encodeFastAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0xE237: // UlData::SrsReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlData_encodeSrsReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE243: // UlData::SrsReceiveReq_t
        buf.static = new Uint8Array(20);
        UlData_encodeSrsReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE244: // UlData::SrsReceiveRespBmPs_t
        buf.static = new Uint8Array(16);
        UlData_encodeSrsReceiveRespBmPs_t(l2l1, buf, 0);
        break;
    case 0xE246: // UlData::PuschReceiveReq_t
        buf.static = new Uint8Array(28);
        UlData_encodePuschReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xf201: // UlCellUe::SetupResp_t
        buf.static = new Uint8Array(1);
        UlCellUe_encodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0xf316: // UlCellUe::DeleteReq_t
        buf.static = new Uint8Array(1);
        UlCellUe_encodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0xf317: // UlCellUe::DeleteResp_t
        buf.static = new Uint8Array(2);
        UlCellUe_encodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xf33e: // UlCellUe::SetupReq_t
        buf.static = new Uint8Array(240);
        UlCellUe_encodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0x0201: // UlCell::SetupResp_t
        buf.static = new Uint8Array(1);
        UlCell_encodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        UlCell_encodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        UlCell_encodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0x0a30: // L1ECpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(28);
        L1ECpri_encodeConfigureLinksReq_t(l2l1, buf, 0);
        break;
    case 0x0a31: // L1ECpri::ConfigureLinksResp_t
        buf.static = new Uint8Array(1);
        L1ECpri_encodeConfigureLinksResp_t(l2l1, buf, 0);
        break;
    case 0x0a32: // L1ECpri::SubscribeReq_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0x0a33: // L1ECpri::SubscribeResp_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0x0a34: // L1ECpri::SetOutputReq_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeSetOutputReq_t(l2l1, buf, 0);
        break;
    case 0x0a35: // L1ECpri::SetOutputResp_t
        buf.static = new Uint8Array(3);
        L1ECpri_encodeSetOutputResp_t(l2l1, buf, 0);
        break;
    case 0x0a36: // L1ECpri::StateInd_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeStateInd_t(l2l1, buf, 0);
        break;
    case 0x0a38: // L1ECpri::DelayConfigResp_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeDelayConfigResp_t(l2l1, buf, 0);
        break;
    case 0x0a39: // L1ECpri::ConfigureTransportReq_t
        buf.static = new Uint8Array(14);
        L1ECpri_encodeConfigureTransportReq_t(l2l1, buf, 0);
        break;
    case 0x0a3a: // L1ECpri::ConfigureTransportResp_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeConfigureTransportResp_t(l2l1, buf, 0);
        break;
    case 0x0a3b: // L1ECpri::InitialDelayMeasReq_t
        buf.static = new Uint8Array(16);
        L1ECpri_encodeInitialDelayMeasReq_t(l2l1, buf, 0);
        break;
    case 0x0a3c: // L1ECpri::InitialDelayMeasResp_t
        buf.static = new Uint8Array(12);
        L1ECpri_encodeInitialDelayMeasResp_t(l2l1, buf, 0);
        break;
    case 0x0a3d: // L1ECpri::DelayMeasInd_t
        buf.static = new Uint8Array(12);
        L1ECpri_encodeDelayMeasInd_t(l2l1, buf, 0);
        break;
    case 0x0a3e: // L1ECpri::ConfigureMeasurementsReq_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeConfigureMeasurementsReq_t(l2l1, buf, 0);
        break;
    case 0x0a3f: // L1ECpri::ConfigureMeasurementsResp_t
        buf.static = new Uint8Array(1);
        L1ECpri_encodeConfigureMeasurementsResp_t(l2l1, buf, 0);
        break;
    case 0x0a40: // L1ECpri::MsgRcvCountersInd_t
        buf.static = new Uint8Array(1024);
        L1ECpri_encodeMsgRcvCountersInd_t(l2l1, buf, 0);
        break;
    case 0xe305: // L1ECpri::API2ConfigureTransportReq_t
        buf.static = new Uint8Array(908);
        L1ECpri_encodeAPI2ConfigureTransportReq_t(l2l1, buf, 0);
        break;
    case 0xe306: // L1ECpri::API2ConfigureTransportResp_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeAPI2ConfigureTransportResp_t(l2l1, buf, 0);
        break;
    case 0xe307: // L1ECpri::API2DeleteTransportReq_t
        buf.static = new Uint8Array(16);
        L1ECpri_encodeAPI2DeleteTransportReq_t(l2l1, buf, 0);
        break;
    case 0xe308: // L1ECpri::API2DeleteTransportResp_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeAPI2DeleteTransportResp_t(l2l1, buf, 0);
        break;
    case 0xe309: // L1ECpri::DelayConfigReq_t
        buf.static = new Uint8Array(44);
        L1ECpri_encodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0xE247: // UlCell::SetupReq_t
        buf.static = new Uint8Array(220);
        UlCell_encodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0xd220: // SyncM::startPtpReq_t
        buf.static = new Uint8Array(80);
        SyncM_encodestartPtpReq_t(l2l1, buf, 0);
        break;
    case 0xd221: // SyncM::startPtpResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodestartPtpResp_t(l2l1, buf, 0);
        break;
    case 0xd222: // SyncM::updatePtpConfigReq_t
        buf.static = new Uint8Array(48);
        SyncM_encodeupdatePtpConfigReq_t(l2l1, buf, 0);
        break;
    case 0xd223: // SyncM::updatePtpConfigResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodeupdatePtpConfigResp_t(l2l1, buf, 0);
        break;
    case 0xd224: // SyncM::startSyncEReq_t
        buf.static = new Uint8Array(16);
        SyncM_encodestartSyncEReq_t(l2l1, buf, 0);
        break;
    case 0xd225: // SyncM::startSyncEResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodestartSyncEResp_t(l2l1, buf, 0);
        break;
    case 0xd226: // SyncM::updateSyncEConfigReq_t
        buf.static = new Uint8Array(16);
        SyncM_encodeupdateSyncEConfigReq_t(l2l1, buf, 0);
        break;
    case 0xd227: // SyncM::updateSyncEConfigResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodeupdateSyncEConfigResp_t(l2l1, buf, 0);
        break;
    case 0xd228: // SyncM::getSyncEStatusReq_t
        buf.static = new Uint8Array(1);
        SyncM_encodegetSyncEStatusReq_t(l2l1, buf, 0);
        break;
    case 0xd229: // SyncM::getSyncEStatusResp_t
        buf.static = new Uint8Array(48);
        SyncM_encodegetSyncEStatusResp_t(l2l1, buf, 0);
        break;
    case 0xd22a: // SyncM::getPtpStatusReq_t
        buf.static = new Uint8Array(1);
        SyncM_encodegetPtpStatusReq_t(l2l1, buf, 0);
        break;
    case 0xd22b: // SyncM::getPtpStatusResp_t
        buf.static = new Uint8Array(168);
        SyncM_encodegetPtpStatusResp_t(l2l1, buf, 0);
        break;
    case 0xd22c: // SyncM::stopSyncEReq_t
        buf.static = new Uint8Array(1);
        SyncM_encodestopSyncEReq_t(l2l1, buf, 0);
        break;
    case 0xd22d: // SyncM::stopSyncEResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodestopSyncEResp_t(l2l1, buf, 0);
        break;
    case 0xd22e: // SyncM::stopPtpReq_t
        buf.static = new Uint8Array(1);
        SyncM_encodestopPtpReq_t(l2l1, buf, 0);
        break;
    case 0xd22f: // SyncM::stopPtpResp_t
        buf.static = new Uint8Array(1);
        SyncM_encodestopPtpResp_t(l2l1, buf, 0);
        break;
    case 0xd230: // SyncM::statusInd_t
        buf.static = new Uint8Array(1);
        SyncM_encodestatusInd_t(l2l1, buf, 0);
        break;
    case 0x0104: // DlData::AddressReq_t
        buf.static = new Uint8Array(1);
        DlData_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        buf.static = new Uint8Array(24);
        DlData_encodePdschPayloadTbSendReq_t(l2l1, buf, 0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        buf.static = new Uint8Array(20);
        DlData_encodeSlotTypeReq_t(l2l1, buf, 0);
        break;
    case 0xE101: // DlData::PatternConfigReq_t
        buf.static = new Uint8Array(238);
        DlData_encodePatternConfigReq_t(l2l1, buf, 0);
        break;
    case 0xE10C: // DlData::FastAntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        DlData_encodeFastAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0xE10F: // DlData::SsBlockSendReq_t
        buf.static = new Uint8Array(26);
        DlData_encodeSsBlockSendReq_t(l2l1, buf, 0);
        break;
    case 0xE110: // DlData::CsiRsSendReq_t
        buf.static = new Uint8Array(14);
        DlData_encodeCsiRsSendReq_t(l2l1, buf, 0);
        break;
    case 0xE111: // DlData::EmptySendReq_t
        buf.static = new Uint8Array(6);
        DlData_encodeEmptySendReq_t(l2l1, buf, 0);
        break;
    case 0xE112: // DlData::AddressResp_t
        buf.static = new Uint8Array(40);
        DlData_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE113: // DlData::PdcchSendReq_t
        buf.static = new Uint8Array(16);
        DlData_encodePdcchSendReq_t(l2l1, buf, 0);
        break;
    case 0xE115: // DlData::FastAntennaSnapshotReq_t
        buf.static = new Uint8Array(44);
        DlData_encodeFastAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0xE118: // DlData::PdschSendReq_t
        buf.static = new Uint8Array(12);
        DlData_encodePdschSendReq_t(l2l1, buf, 0);
        break;
    case 0xff03: // SmDataUe::PdcchInd_t
        buf.static = new Uint8Array(8);
        SmDataUe_encodePdcchInd_t(l2l1, buf, 0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        buf.static = new Uint8Array(8);
        L1Log_encodeAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        L1Log_encodeAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        buf.static = new Uint8Array(105);
        L1Log_encodeShowTraceListResp_t(l2l1, buf, 0);
        break;
    case 0x0a63: // L1Log::AntennaSnapshotConfigurationResp_t
        buf.static = new Uint8Array(1);
        L1Log_encodeAntennaSnapshotConfigurationResp_t(l2l1, buf, 0);
        break;
    case 0xe3b0: // L1Log::TraceReq_t
        buf.static = new Uint8Array(80);
        L1Log_encodeTraceReq_t(l2l1, buf, 0);
        break;
    case 0xe3b1: // L1Log::ShowTraceListReq_t
        buf.static = new Uint8Array(8);
        L1Log_encodeShowTraceListReq_t(l2l1, buf, 0);
        break;
    case 0xe3b2: // L1Log::AntennaSnapshotConfigurationReq_t
        buf.static = new Uint8Array(52);
        L1Log_encodeAntennaSnapshotConfigurationReq_t(l2l1, buf, 0);
        break;
    case 0xe3b3: // L1Log::AntennaSnapshotInd_t
        buf.static = new Uint8Array(2960);
        L1Log_encodeAntennaSnapshotInd_t(l2l1, buf, 0);
        break;
    case 0xe3b4: // L1Log::TraceInd_t
        buf.static = new Uint8Array(1416);
        L1Log_encodeTraceInd_t(l2l1, buf, 0);
        break;
    case 0xe3b5: // L1Log::TraceResp_t
        buf.static = new Uint8Array(4);
        L1Log_encodeTraceResp_t(l2l1, buf, 0);
        break;
    case 0xE387: // L1Fcp::DlUlChannelsReq_t
        buf.static = new Uint8Array(24);
        L1Fcp_encodeDlUlChannelsReq_t(l2l1, buf, 0);
        break;
    case 0x0a00: // L1Cpri::AlarmInd_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeAlarmInd_t(l2l1, buf, 0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(336);
        L1Cpri_encodeConfigureLinksReq_t(l2l1, buf, 0);
        break;
    case 0x0a02: // L1Cpri::ConfigureLinksResp_t
        buf.static = new Uint8Array(1);
        L1Cpri_encodeConfigureLinksResp_t(l2l1, buf, 0);
        break;
    case 0x0a05: // L1Cpri::SetOutputReq_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeSetOutputReq_t(l2l1, buf, 0);
        break;
    case 0x0a06: // L1Cpri::SetOutputResp_t
        buf.static = new Uint8Array(3);
        L1Cpri_encodeSetOutputResp_t(l2l1, buf, 0);
        break;
    case 0x0a07: // L1Cpri::StateInd_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeStateInd_t(l2l1, buf, 0);
        break;
    case 0x0a08: // L1Cpri::SubscribeReq_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0x0a09: // L1Cpri::SubscribeResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0x0a0a: // L1Cpri::DiscoveryInd_t
        buf.static = new Uint8Array(69);
        L1Cpri_encodeDiscoveryInd_t(l2l1, buf, 0);
        break;
    case 0x0a0e: // L1Cpri::DelayConfigResp_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeDelayConfigResp_t(l2l1, buf, 0);
        break;
    case 0x0a0f: // L1Cpri::GetLinkParamReq_t
        buf.static = new Uint8Array(4);
        L1Cpri_encodeGetLinkParamReq_t(l2l1, buf, 0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        buf.static = new Uint8Array(70);
        L1Cpri_encodeSetDiscoveryReq_t(l2l1, buf, 0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeSetDiscoveryResp_t(l2l1, buf, 0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeSetLinkPropertiesResp_t(l2l1, buf, 0);
        break;
    case 0x0A43: // L1Cpri::ConfigureAxcInfoResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeConfigureAxcInfoResp_t(l2l1, buf, 0);
        break;
    case 0x0A44: // L1Cpri::DeleteAxcInfoReq_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeDeleteAxcInfoReq_t(l2l1, buf, 0);
        break;
    case 0x0A45: // L1Cpri::DeleteAxcInfoResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeDeleteAxcInfoResp_t(l2l1, buf, 0);
        break;
    case 0x0a48: // L1Cpri::ConfigureVsbReq_t
        buf.static = new Uint8Array(16);
        L1Cpri_encodeConfigureVsbReq_t(l2l1, buf, 0);
        break;
    case 0x0a49: // L1Cpri::ConfigureVsbResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeConfigureVsbResp_t(l2l1, buf, 0);
        break;
    case 0x0a4A: // L1Cpri::SubscribeVsbChangesReq_t
        buf.static = new Uint8Array(16);
        L1Cpri_encodeSubscribeVsbChangesReq_t(l2l1, buf, 0);
        break;
    case 0x0a4B: // L1Cpri::SubscribeVsbChangesResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeSubscribeVsbChangesResp_t(l2l1, buf, 0);
        break;
    case 0x0a4C: // L1Cpri::VsbDataInd_t
        buf.static = new Uint8Array(268);
        L1Cpri_encodeVsbDataInd_t(l2l1, buf, 0);
        break;
    case 0x0a4D: // L1Cpri::SendVsbDataReq_t
        buf.static = new Uint8Array(272);
        L1Cpri_encodeSendVsbDataReq_t(l2l1, buf, 0);
        break;
    case 0x0a4E: // L1Cpri::SendVsbDataResp_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeSendVsbDataResp_t(l2l1, buf, 0);
        break;
    case 0x0a4F: // L1Cpri::SetLinkPropertiesReq_t
        buf.static = new Uint8Array(16);
        L1Cpri_encodeSetLinkPropertiesReq_t(l2l1, buf, 0);
        break;
    case 0xe301: // L1Cpri::ConfigureAxcInfoReq_t
        buf.static = new Uint8Array(12);
        L1Cpri_encodeConfigureAxcInfoReq_t(l2l1, buf, 0);
        break;
    case 0xe311: // L1Cpri::DelayConfigReq_t
        buf.static = new Uint8Array(32);
        L1Cpri_encodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0xe312: // L1Cpri::GetLinkParamResp_t
        buf.static = new Uint8Array(28);
        L1Cpri_encodeGetLinkParamResp_t(l2l1, buf, 0);
        break;
    case 0xe3f0: // L1Config::L1Config_SwConfigurationReq_t
        buf.static = new Uint8Array(16);
        L1Config_encodeL1Config_SwConfigurationReq_t(l2l1, buf, 0);
        break;
    case 0xe3f1: // L1Config::L1Config_SwConfigurationResp_t
        buf.static = new Uint8Array(12);
        L1Config_encodeL1Config_SwConfigurationResp_t(l2l1, buf, 0);
        break;
    case 0xE391: // L1ChannelStreamer::DeregisterReq_t
        buf.static = new Uint8Array(4);
        L1ChannelStreamer_encodeDeregisterReq_t(l2l1, buf, 0);
        break;
    case 0xE392: // L1ChannelStreamer::DeregisterResp_t
        buf.static = new Uint8Array(8);
        L1ChannelStreamer_encodeDeregisterResp_t(l2l1, buf, 0);
        break;
    case 0xE393: // L1ChannelStreamer::RegisterReq_t
        buf.static = new Uint8Array(8);
        L1ChannelStreamer_encodeRegisterReq_t(l2l1, buf, 0);
        break;
    case 0xE394: // L1ChannelStreamer::RegisterResp_t
        buf.static = new Uint8Array(12);
        L1ChannelStreamer_encodeRegisterResp_t(l2l1, buf, 0);
        break;
    case 0xE395: // L1ChannelStreamer::ReceiveInd_t
        buf.static = new Uint8Array(20);
        L1ChannelStreamer_encodeReceiveInd_t(l2l1, buf, 0);
        break;
    case 0xE396: // L1ChannelStreamer::SendReq_t
        buf.static = new Uint8Array(20);
        L1ChannelStreamer_encodeSendReq_t(l2l1, buf, 0);
        break;
    case 0xE3E4: // L1Call::NrUlTestReportInd_t
        buf.static = new Uint8Array(80);
        L1Call_encodeNrUlTestReportInd_t(l2l1, buf, 0);
        break;
    case 0x0001: // L1::PingPongReq_t
        buf.static = new Uint8Array(4);
        L1_encodePingPongReq_t(l2l1, buf, 0);
        break;
    case 0x0002: // L1::EchoReq_t
        buf.static = new Uint8Array(64);
        L1_encodeEchoReq_t(l2l1, buf, 0);
        break;
    case 0x0003: // L1::EchoResp_t
        buf.static = new Uint8Array(64);
        L1_encodeEchoResp_t(l2l1, buf, 0);
        break;
    case 0x0004: // L1::LoopReq_t
        buf.static = new Uint8Array(24);
        L1_encodeLoopReq_t(l2l1, buf, 0);
        break;
    case 0x0005: // L1::UlMeasReq_t
        buf.static = new Uint8Array(12);
        L1_encodeUlMeasReq_t(l2l1, buf, 0);
        break;
    case 0x0006: // L1::WakeupReq_t
        buf.static = new Uint8Array(4);
        L1_encodeWakeupReq_t(l2l1, buf, 0);
        break;
    case 0x0007: // L1::StartupLoopReq_t
        buf.static = new Uint8Array(8);
        L1_encodeStartupLoopReq_t(l2l1, buf, 0);
        break;
    case 0x0008: // L1::SnapshotFileCreationReq_t
        buf.static = new Uint8Array(4);
        L1_encodeSnapshotFileCreationReq_t(l2l1, buf, 0);
        break;
    case 0x0009: // L1::LatencyEventReq_t
        buf.static = new Uint8Array(4);
        L1_encodeLatencyEventReq_t(l2l1, buf, 0);
        break;
    case 0x000A: // L1::DmaEndInd_t
        buf.static = new Uint8Array(4);
        L1_encodeDmaEndInd_t(l2l1, buf, 0);
        break;
    case 0x000B: // L1::LaWakeupReq_t
        buf.static = new Uint8Array(12);
        L1_encodeLaWakeupReq_t(l2l1, buf, 0);
        break;
    case 0x000C: // L1::DmaStartTestReq_t
        buf.static = new Uint8Array(4);
        L1_encodeDmaStartTestReq_t(l2l1, buf, 0);
        break;
    case 0x000D: // L1::NrtRxSubcellResetReq_t
        buf.static = new Uint8Array(1);
        L1_encodeNrtRxSubcellResetReq_t(l2l1, buf, 0);
        break;
    case 0x000E: // L1::SyncInd_t
        buf.static = new Uint8Array(8);
        L1_encodeSyncInd_t(l2l1, buf, 0);
        break;
    case 0xE002: // L1::TestModeConfigReq_t
        buf.static = new Uint8Array(1);
        L1_encodeTestModeConfigReq_t(l2l1, buf, 0);
        break;
    case 0xE003: // L1::TestModeConfigResp_t
        buf.static = new Uint8Array(1);
        L1_encodeTestModeConfigResp_t(l2l1, buf, 0);
        break;
    case 0xf104: // DlDataUe::AddressReq_t
        buf.static = new Uint8Array(8);
        DlDataUe_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xf1ff: // DlDataUe::SyncInd_t
        buf.static = new Uint8Array(8);
        DlDataUe_encodeSyncInd_t(l2l1, buf, 0);
        break;
    case 0xf1fd: // DlDataUe::PdschReceiveRespHarqD_t
        buf.static = new Uint8Array(12);
        DlDataUe_encodePdschReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0xf1fb: // DlDataUe::PdschReceiveRespSmD_t
        buf.static = new Uint8Array(12);
        DlDataUe_encodePdschReceiveRespSmD_t(l2l1, buf, 0);
        break;
    case 0xf301: // DlDataUe::AddressResp_t
        buf.static = new Uint8Array(20);
        DlDataUe_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xf30A: // DlDataUe::PdcchReceiveResp_t
        buf.static = new Uint8Array(12);
        DlDataUe_encodePdcchReceiveResp_t(l2l1, buf, 0);
        break;
    case 0xf31f: // DlDataUe::PdcchReceiveReq_t
        buf.static = new Uint8Array(16);
        DlDataUe_encodePdcchReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xf321: // DlDataUe::SsBurstReceiveReq_t
        buf.static = new Uint8Array(16);
        DlDataUe_encodeSsBurstReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xf322: // DlDataUe::SsBurstReceiveResp_t
        buf.static = new Uint8Array(12);
        DlDataUe_encodeSsBurstReceiveResp_t(l2l1, buf, 0);
        break;
    case 0xf329: // DlDataUe::PdschReceiveReq_t
        buf.static = new Uint8Array(24);
        DlDataUe_encodePdschReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xf336: // DlDataUe::CsiRsReceiveReq_t
        buf.static = new Uint8Array(16);
        DlDataUe_encodeCsiRsReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xf337: // DlDataUe::CsiRsReceiveResp_t
        buf.static = new Uint8Array(12);
        DlDataUe_encodeCsiRsReceiveResp_t(l2l1, buf, 0);
        break;
    case 0xf101: // DlCellUe::SetupResp_t
        buf.static = new Uint8Array(1);
        DlCellUe_encodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0xf31d: // DlCellUe::DeleteReq_t
        buf.static = new Uint8Array(1);
        DlCellUe_encodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0xf31e: // DlCellUe::DeleteResp_t
        buf.static = new Uint8Array(2);
        DlCellUe_encodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xf328: // DlCellUe::SetupReq_t
        buf.static = new Uint8Array(746);
        DlCellUe_encodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0x0101: // DlCell::SetupResp_t
        buf.static = new Uint8Array(1);
        DlCell_encodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        DlCell_encodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        DlCell_encodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xE117: // DlCell::SetupReq_t
        buf.static = new Uint8Array(584);
        DlCell_encodeSetupReq_t(l2l1, buf, 0);
        break;

    default: throw new Error(`Unknown message type ${l2l1.message}`);
    }

    const result = new Uint8Array(buf.static.length + buf.dynamic.getLength());
    result.set(buf.static);
    result.set(buf.dynamic.getBuf(), buf.static.length);

    return result
}

packetPropToStrMap["l2l1.message"] = {
    0xf204: "UlDataUe::AddressReq",
    0xf2ff: "UlDataUe::SlotTypeReq",
    0xf306: "UlDataUe::AddressResp",
    0xf30f: "UlDataUe::SrsSendReq",
    0xf31a: "UlDataUe::PrachSendReq",
    0xf31b: "UlDataUe::PatternConfigReq",
    0xf326: "UlDataUe::PuschSendReq",
    0xf33f: "UlDataUe::PucchSendReq",
    0x0222: "UlData::PrachReceiveInd",
    0x0243: "UlData::AddressReq",
    0xE200: "UlData::PuschReceiveRespHarqD",
    0xE205: "UlData::PrachReceiveInd",
    0xE208: "UlData::PucchReceiveRespHarqD",
    0xE20B: "UlData::PuschReceiveRespHarqU",
    0xE21C: "UlData::FastAntennaSnapshotResp",
    0xE222: "UlData::PucchReceiveRespPs",
    0xE225: "UlData::PuschReceiveRespPs",
    0xE226: "UlData::PucchReceiveReq",
    0xE229: "UlData::EmptyReceiveReq",
    0xE230: "UlData::AddressResp",
    0xE231: "UlData::PrachReceiveReq",
    0xE235: "UlData::FastAntennaSnapshotReq",
    0xE237: "UlData::SrsReceiveRespPs",
    0xE243: "UlData::SrsReceiveReq",
    0xE244: "UlData::SrsReceiveRespBmPs",
    0xE246: "UlData::PuschReceiveReq",
    0xf201: "UlCellUe::SetupResp",
    0xf316: "UlCellUe::DeleteReq",
    0xf317: "UlCellUe::DeleteResp",
    0xf33e: "UlCellUe::SetupReq",
    0x0201: "UlCell::SetupResp",
    0x0202: "UlCell::DeleteReq",
    0x0203: "UlCell::DeleteResp",
    0x0a30: "L1ECpri::ConfigureLinksReq",
    0x0a31: "L1ECpri::ConfigureLinksResp",
    0x0a32: "L1ECpri::SubscribeReq",
    0x0a33: "L1ECpri::SubscribeResp",
    0x0a34: "L1ECpri::SetOutputReq",
    0x0a35: "L1ECpri::SetOutputResp",
    0x0a36: "L1ECpri::StateInd",
    0x0a38: "L1ECpri::DelayConfigResp",
    0x0a39: "L1ECpri::ConfigureTransportReq",
    0x0a3a: "L1ECpri::ConfigureTransportResp",
    0x0a3b: "L1ECpri::InitialDelayMeasReq",
    0x0a3c: "L1ECpri::InitialDelayMeasResp",
    0x0a3d: "L1ECpri::DelayMeasInd",
    0x0a3e: "L1ECpri::ConfigureMeasurementsReq",
    0x0a3f: "L1ECpri::ConfigureMeasurementsResp",
    0x0a40: "L1ECpri::MsgRcvCountersInd",
    0xe305: "L1ECpri::API2ConfigureTransportReq",
    0xe306: "L1ECpri::API2ConfigureTransportResp",
    0xe307: "L1ECpri::API2DeleteTransportReq",
    0xe308: "L1ECpri::API2DeleteTransportResp",
    0xe309: "L1ECpri::DelayConfigReq",
    0xE247: "UlCell::SetupReq",
    0xd220: "SyncM::startPtpReq",
    0xd221: "SyncM::startPtpResp",
    0xd222: "SyncM::updatePtpConfigReq",
    0xd223: "SyncM::updatePtpConfigResp",
    0xd224: "SyncM::startSyncEReq",
    0xd225: "SyncM::startSyncEResp",
    0xd226: "SyncM::updateSyncEConfigReq",
    0xd227: "SyncM::updateSyncEConfigResp",
    0xd228: "SyncM::getSyncEStatusReq",
    0xd229: "SyncM::getSyncEStatusResp",
    0xd22a: "SyncM::getPtpStatusReq",
    0xd22b: "SyncM::getPtpStatusResp",
    0xd22c: "SyncM::stopSyncEReq",
    0xd22d: "SyncM::stopSyncEResp",
    0xd22e: "SyncM::stopPtpReq",
    0xd22f: "SyncM::stopPtpResp",
    0xd230: "SyncM::statusInd",
    0x0104: "DlData::AddressReq",
    0x0108: "DlData::PdschPayloadTbSendReq",
    0x0122: "DlData::SlotTypeReq",
    0xE101: "DlData::PatternConfigReq",
    0xE10C: "DlData::FastAntennaSnapshotResp",
    0xE10F: "DlData::SsBlockSendReq",
    0xE110: "DlData::CsiRsSendReq",
    0xE111: "DlData::EmptySendReq",
    0xE112: "DlData::AddressResp",
    0xE113: "DlData::PdcchSendReq",
    0xE115: "DlData::FastAntennaSnapshotReq",
    0xE118: "DlData::PdschSendReq",
    0xff03: "SmDataUe::PdcchInd",
    0x0a65: "L1Log::AntennaSnapshotReq",
    0x0a5a: "L1Log::AntennaSnapshotResp",
    0x0a61: "L1Log::ShowTraceListResp",
    0x0a63: "L1Log::AntennaSnapshotConfigurationResp",
    0xe3b0: "L1Log::TraceReq",
    0xe3b1: "L1Log::ShowTraceListReq",
    0xe3b2: "L1Log::AntennaSnapshotConfigurationReq",
    0xe3b3: "L1Log::AntennaSnapshotInd",
    0xe3b4: "L1Log::TraceInd",
    0xe3b5: "L1Log::TraceResp",
    0xE387: "L1Fcp::DlUlChannelsReq",
    0x0a00: "L1Cpri::AlarmInd",
    0x0a01: "L1Cpri::ConfigureLinksReq",
    0x0a02: "L1Cpri::ConfigureLinksResp",
    0x0a05: "L1Cpri::SetOutputReq",
    0x0a06: "L1Cpri::SetOutputResp",
    0x0a07: "L1Cpri::StateInd",
    0x0a08: "L1Cpri::SubscribeReq",
    0x0a09: "L1Cpri::SubscribeResp",
    0x0a0a: "L1Cpri::DiscoveryInd",
    0x0a0e: "L1Cpri::DelayConfigResp",
    0x0a0f: "L1Cpri::GetLinkParamReq",
    0x0a12: "L1Cpri::SetDiscoveryReq",
    0x0a13: "L1Cpri::SetDiscoveryResp",
    0x0a15: "L1Cpri::SetLinkPropertiesResp",
    0x0A43: "L1Cpri::ConfigureAxcInfoResp",
    0x0A44: "L1Cpri::DeleteAxcInfoReq",
    0x0A45: "L1Cpri::DeleteAxcInfoResp",
    0x0a48: "L1Cpri::ConfigureVsbReq",
    0x0a49: "L1Cpri::ConfigureVsbResp",
    0x0a4A: "L1Cpri::SubscribeVsbChangesReq",
    0x0a4B: "L1Cpri::SubscribeVsbChangesResp",
    0x0a4C: "L1Cpri::VsbDataInd",
    0x0a4D: "L1Cpri::SendVsbDataReq",
    0x0a4E: "L1Cpri::SendVsbDataResp",
    0x0a4F: "L1Cpri::SetLinkPropertiesReq",
    0xe301: "L1Cpri::ConfigureAxcInfoReq",
    0xe311: "L1Cpri::DelayConfigReq",
    0xe312: "L1Cpri::GetLinkParamResp",
    0xe3f0: "L1Config::L1Config_SwConfigurationReq",
    0xe3f1: "L1Config::L1Config_SwConfigurationResp",
    0xE391: "L1ChannelStreamer::DeregisterReq",
    0xE392: "L1ChannelStreamer::DeregisterResp",
    0xE393: "L1ChannelStreamer::RegisterReq",
    0xE394: "L1ChannelStreamer::RegisterResp",
    0xE395: "L1ChannelStreamer::ReceiveInd",
    0xE396: "L1ChannelStreamer::SendReq",
    0xE3E4: "L1Call::NrUlTestReportInd",
    0x0001: "L1::PingPongReq",
    0x0002: "L1::EchoReq",
    0x0003: "L1::EchoResp",
    0x0004: "L1::LoopReq",
    0x0005: "L1::UlMeasReq",
    0x0006: "L1::WakeupReq",
    0x0007: "L1::StartupLoopReq",
    0x0008: "L1::SnapshotFileCreationReq",
    0x0009: "L1::LatencyEventReq",
    0x000A: "L1::DmaEndInd",
    0x000B: "L1::LaWakeupReq",
    0x000C: "L1::DmaStartTestReq",
    0x000D: "L1::NrtRxSubcellResetReq",
    0x000E: "L1::SyncInd",
    0xE002: "L1::TestModeConfigReq",
    0xE003: "L1::TestModeConfigResp",
    0xf104: "DlDataUe::AddressReq",
    0xf1ff: "DlDataUe::SyncInd",
    0xf1fd: "DlDataUe::PdschReceiveRespHarqD",
    0xf1fb: "DlDataUe::PdschReceiveRespSmD",
    0xf301: "DlDataUe::AddressResp",
    0xf30A: "DlDataUe::PdcchReceiveResp",
    0xf31f: "DlDataUe::PdcchReceiveReq",
    0xf321: "DlDataUe::SsBurstReceiveReq",
    0xf322: "DlDataUe::SsBurstReceiveResp",
    0xf329: "DlDataUe::PdschReceiveReq",
    0xf336: "DlDataUe::CsiRsReceiveReq",
    0xf337: "DlDataUe::CsiRsReceiveResp",
    0xf101: "DlCellUe::SetupResp",
    0xf31d: "DlCellUe::DeleteReq",
    0xf31e: "DlCellUe::DeleteResp",
    0xf328: "DlCellUe::SetupReq",
    0x0101: "DlCell::SetupResp",
    0x0102: "DlCell::DeleteReq",
    0x0103: "DlCell::DeleteResp",
    0xE117: "DlCell::SetupReq",
};

const packetEnumMap = {
    ackNackUci_t: {
        0: "ackNackUci::NACK",
        1: "ackNackUci::ACK",
    },
    ackCrcCheck_t: {
        0: "ackCrcCheck::Fail",
        1: "ackCrcCheck::Pass",
    },
    aggregationLevel_t: {
        1: "aggregationLevel::AL1",
        2: "aggregationLevel::AL2",
        4: "aggregationLevel::AL4",
        8: "aggregationLevel::AL8",
        16: "aggregationLevel::AL16",
    },
    AntPortLayer: {
        0: "AntPortLayer::MAP0",
        1: "AntPortLayer::MAP1",
        2: "AntPortLayer::MAP2",
        3: "AntPortLayer::MAP3",
        4: "AntPortLayer::MAP4",
        5: "AntPortLayer::MAP5",
        6: "AntPortLayer::MAP6",
        7: "AntPortLayer::MAP7",
        8: "AntPortLayer::MAP8",
        9: "AntPortLayer::MAP9",
        10: "AntPortLayer::MAP10",
        11: "AntPortLayer::MAP11",
        12: "AntPortLayer::MAP12",
        13: "AntPortLayer::MAP13",
        14: "AntPortLayer::MAP14",
        15: "AntPortLayer::MAP15",
    },
    bitValue_t: {
        0: "bitValue::BIT_VALUE_0",
        1: "bitValue::BIT_VALUE_1",
        255: "bitValue::BIT_VALUE_INVALID",
    },
    cceRegMappingType_t: {
        0: "cceRegMappingType::INTERLEAVED",
        1: "cceRegMappingType::NON_INTERLEAVED",
    },
    numCeAxC_t: {
        2: "numCeAxC::NUM_C_EAXC_2",
        4: "numCeAxC::NUM_C_EAXC_4",
    },
    numCeAxC_UlCell_Setup_t: {
        2: "numCeAxC_UlCell_Setup::NUM_C_EAXC_2",
        4: "numCeAxC_UlCell_Setup::NUM_C_EAXC_4",
        8: "numCeAxC_UlCell_Setup::NUM_C_EAXC_8",
    },
    cellExtension_t: {
        10: "cellExtension::NORMAL",
        20: "cellExtension::EXTENDED",
        23: "cellExtension::EXTENDED_2_point_3",
        69: "cellExtension::EXTENDED_6_point_9",
        110: "cellExtension::EXTENDED_11_point_0",
    },
    cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
    },
    closedLoop3gppCodebook_t: {
        0: "closedLoop3gppCodebook::TwoportTypeICodebook",
        1: "closedLoop3gppCodebook::FourportTypeICodebook",
        2: "closedLoop3gppCodebook::EightportTypeICodebook",
        255: "closedLoop3gppCodebook::INVALID",
    },
    coresetInterleaverSize_t: {
        0: "coresetInterleaverSize::ROWS_0",
        2: "coresetInterleaverSize::ROWS_2",
        3: "coresetInterleaverSize::ROWS_3",
        6: "coresetInterleaverSize::ROWS_6",
    },
    coresetRegBundleSize_t: {
        2: "coresetRegBundleSize::REGS_2",
        3: "coresetRegBundleSize::REGS_3",
        6: "coresetRegBundleSize::REGS_6",
    },
    cpriDialectIndication_t: {
        0: "cpriDialectIndication::CPRI_N",
        1: "cpriDialectIndication::CPRI_A",
    },
    crc_t: {
        0: "crc::OK",
        1: "crc::NOK",
    },
    csiRsCodebookMode_t: {
        1: "csiRsCodebookMode::Config1",
        2: "csiRsCodebookMode::Config2",
    },
    csiRsCodebookType_t: {
        0: "csiRsCodebookType::TypeI_SinglePanel",
        1: "csiRsCodebookType::TypeI_MultiPanel",
        2: "csiRsCodebookType::TypeII",
        3: "csiRsCodebookType::TypeII_PortSelection",
    },
    csiRsDensity_t: {
        0: "csiRsDensity::dot5",
        1: "csiRsDensity::one",
        3: "csiRsDensity::three",
    },
    csiRsDensityDot5PrbLocation_t: {
        0: "csiRsDensityDot5PrbLocation::evenPrbs",
        1: "csiRsDensityDot5PrbLocation::oddPrbs",
    },
    csiRsPrecodingMatrix_t: {
        0: "csiRsPrecodingMatrix::IDENTITY_MATRIX",
        1: "csiRsPrecodingMatrix::DIAGONAL_PER_BLOCK",
    },
    csiRsReportQuantity_t: {
        0: "csiRsReportQuantity::cri_RP_PMI_CQI",
        1: "csiRsReportQuantity::cri_RI_CQI",
        2: "csiRsReportQuantity::cri_RSRP",
    },
    csiRsTrsInfo_t: {
        0: "csiRsTrsInfo::DISABLED",
        1: "csiRsTrsInfo::ENABLED",
    },
    digitalOutputRate_t: {
        0: "digitalOutputRate::bitrate115dot2k",
        1: "digitalOutputRate::bitrate460dot8k",
        2: "digitalOutputRate::bitrate1dot92M",
    },
    digitalOutputType_t: {
        0: "digitalOutputType::serialKeysight",
        1: "digitalOutputType::serialRs",
    },
    Direction_t: {
        1: "Direction::DL",
        2: "Direction::UL",
    },
    DlCodebookIndex: {
        0: "DlCodebookIndex::VAL_0",
        1: "DlCodebookIndex::VAL_1",
        2: "DlCodebookIndex::VAL_2",
        3: "DlCodebookIndex::VAL_3",
        255: "DlCodebookIndex::VAL_255",
    },
    dlDmrsConfigType_t: {
        1: "dlDmrsConfigType::DMRS_CONFIG_1",
        2: "dlDmrsConfigType::DMRS_CONFIG_2",
    },
    dlMimoMode_t: {
        0: "dlMimoMode::CL_2x2_MIMO",
        1: "dlMimoMode::CL_4x4_or_4x2_MIMO",
        2: "dlMimoMode::OL_2x2_MIMO",
        3: "dlMimoMode::OL_4x4_or_4x2_MIMO",
        4: "dlMimoMode::CL_8x4_MIMO",
    },
    dmrsLen_t: {
        1: "dmrsLen::NR_SYMBOLS_1",
        2: "dmrsLen::NR_SYMBOLS_2",
    },
    dmrsMappingType_t: {
        0: "dmrsMappingType::DMRS_MAPPING_TYPE_A",
        1: "dmrsMappingType::DMRS_MAPPING_TYPE_B",
    },
    dmrsReferencePoint_t: {
        0: "dmrsReferencePoint::CORESET_START_RB",
        1: "dmrsReferencePoint::POINT_A",
    },
    dtx_t: {
        0: "dtx::NON_DTX",
        1: "dtx::DTX",
    },
    EBandwidth: {
        11: "EBandwidth::prbs_11",
        18: "EBandwidth::prbs_18",
        24: "EBandwidth::prbs_24",
        25: "EBandwidth::prbs_25",
        31: "EBandwidth::prbs_31",
        32: "EBandwidth::prbs_32",
        38: "EBandwidth::prbs_38",
        51: "EBandwidth::prbs_51",
        52: "EBandwidth::prbs_52",
        64: "EBandwidth::prbs_64",
        65: "EBandwidth::prbs_65",
        66: "EBandwidth::prbs_66",
        78: "EBandwidth::prbs_78",
        79: "EBandwidth::prbs_79",
        93: "EBandwidth::prbs_93",
        106: "EBandwidth::prbs_106",
        107: "EBandwidth::prbs_107",
        121: "EBandwidth::prbs_121",
        128: "EBandwidth::prbs_128",
        132: "EBandwidth::prbs_132",
        133: "EBandwidth::prbs_133",
        135: "EBandwidth::prbs_135",
        160: "EBandwidth::prbs_160",
        162: "EBandwidth::prbs_162",
        189: "EBandwidth::prbs_189",
        216: "EBandwidth::prbs_216",
        217: "EBandwidth::prbs_217",
        245: "EBandwidth::prbs_245",
        256: "EBandwidth::prbs_256",
        264: "EBandwidth::prbs_264",
        270: "EBandwidth::prbs_270",
        273: "EBandwidth::prbs_273",
    },
    ENumberOfBeams: {
        1: "ENumberOfBeams::beams_1",
        6: "ENumberOfBeams::beams_6",
        9: "ENumberOfBeams::beams_9",
        12: "ENumberOfBeams::beams_12",
        15: "ENumberOfBeams::beams_15",
        18: "ENumberOfBeams::beams_18",
        21: "ENumberOfBeams::beams_21",
        24: "ENumberOfBeams::beams_24",
    },
    EScs: {
        0: "EScs::UNUSED",
        15: "EScs::khz_15",
        30: "EScs::khz_30",
        60: "EScs::khz_60",
        120: "EScs::khz_120",
    },
    EStatus_5G: {
        0: "EStatus_5G::NoError",
        1: "EStatus_5G::UndefinedError",
        2: "EStatus_5G::SyntaxError",
        3: "EStatus_5G::OutOfSequence",
        4: "EStatus_5G::ServiceBusy",
        5: "EStatus_5G::MissingMemory",
        6: "EStatus_5G::DataNotAvailable",
        7: "EStatus_5G::MinTimeRejection",
        8: "EStatus_5G::RxUnderflow",
        9: "EStatus_5G::HwError",
        10: "EStatus_5G::DmaError",
        11: "EStatus_5G::FileError",
        12: "EStatus_5G::HaltOnResourcesLimit",
        13: "EStatus_5G::SubcellNotConfigured",
    },
    tbStatus_t: {
        0: "tbStatus::CRC_PASS",
        1: "tbStatus::CRC_FAIL",
    },
    frequencyHopping_t: {
        0: "frequencyHopping::FREQ_HOPPING_DISABLED",
        1: "frequencyHopping::FREQ_HOPPING_ENABLED",
    },
    harqProcessIndex_t: {
        0: "harqProcessIndex::ID_0",
        1: "harqProcessIndex::ID_1",
        2: "harqProcessIndex::ID_2",
        3: "harqProcessIndex::ID_3",
        4: "harqProcessIndex::ID_4",
        5: "harqProcessIndex::ID_5",
        6: "harqProcessIndex::ID_6",
        7: "harqProcessIndex::ID_7",
        8: "harqProcessIndex::ID_8",
        9: "harqProcessIndex::ID_9",
        10: "harqProcessIndex::ID_10",
        11: "harqProcessIndex::ID_11",
        12: "harqProcessIndex::ID_12",
        13: "harqProcessIndex::ID_13",
        14: "harqProcessIndex::ID_14",
        15: "harqProcessIndex::ID_15",
    },
    ldpcBaseGraph_t: {
        1: "ldpcBaseGraph::BG_1",
        2: "ldpcBaseGraph::BG_2",
    },
    longPucchStartSymbol_t: {
        0: "longPucchStartSymbol::SYMBOL_0",
    },
    numLteCrsPorts_t: {
        1: "numLteCrsPorts::NUM_LTE_CRS_PORTS_1",
        2: "numLteCrsPorts::NUM_LTE_CRS_PORTS_2",
        4: "numLteCrsPorts::NUM_LTE_CRS_PORTS_4",
    },
    lteDlBandwidth_t: {
        25: "lteDlBandwidth::LTE_DL_BW_25",
        50: "lteDlBandwidth::LTE_DL_BW_50",
        75: "lteDlBandwidth::LTE_DL_BW_75",
        100: "lteDlBandwidth::LTE_DL_BW_100",
    },
    mantissaSize_t: {
        9: "mantissaSize::mantissaSize_9",
        14: "mantissaSize::mantissaSize_14",
    },
    mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
    },
    modulationOrder_t: {
        1: "modulationOrder::Order1",
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    numberOfColTRX_t: {
        4: "numberOfColTRX::numberOfColTRX_4",
        8: "numberOfColTRX::numberOfColTRX_8",
    },
    numberOfRowTRX_t: {
        1: "numberOfRowTRX::numberOfRowTRX_1",
        2: "numberOfRowTRX::numberOfRowTRX_2",
        4: "numberOfRowTRX::numberOfRowTRX_4",
    },
    numOfLongPucchSymbols_t: {
        14: "numOfLongPucchSymbols::VAL_14_SYMBOLS",
    },
    NumOfPdschSymbols: {
        2: "NumOfPdschSymbols::VAL_2_SYMBOLS",
        3: "NumOfPdschSymbols::VAL_3_SYMBOLS",
        4: "NumOfPdschSymbols::VAL_4_SYMBOLS",
        5: "NumOfPdschSymbols::VAL_5_SYMBOLS",
        6: "NumOfPdschSymbols::VAL_6_SYMBOLS",
        7: "NumOfPdschSymbols::VAL_7_SYMBOLS",
        8: "NumOfPdschSymbols::VAL_8_SYMBOLS",
        9: "NumOfPdschSymbols::VAL_9_SYMBOLS",
        10: "NumOfPdschSymbols::VAL_10_SYMBOLS",
        11: "NumOfPdschSymbols::VAL_11_SYMBOLS",
        12: "NumOfPdschSymbols::VAL_12_SYMBOLS",
        13: "NumOfPdschSymbols::VAL_13_SYMBOLS",
        14: "NumOfPdschSymbols::VAL_14_SYMBOLS",
    },
    numOfPucchLayers_t: {
        1: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_1",
        2: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_2",
    },
    numOfPucchTxAntennaPorts_t: {
        1: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_1",
        2: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_2",
    },
    numOfPuschSymbols_t: {
        2: "numOfPuschSymbols::PCS2",
        9: "numOfPuschSymbols::PCS9",
        10: "numOfPuschSymbols::PCS10",
        11: "numOfPuschSymbols::PCS11",
        12: "numOfPuschSymbols::PCS12",
        13: "numOfPuschSymbols::PCS13",
        14: "numOfPuschSymbols::PCS14",
    },
    numOfSrsTxAntennaPorts_t: {
        1: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_1",
        2: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_2",
        4: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_4",
    },
    openLoopScheme_t: {
        0: "openLoopScheme::NO_PRECODING_0",
        1: "openLoopScheme::SCDD_1",
        2: "openLoopScheme::LCDD_2",
        255: "openLoopScheme::INVALID_255",
    },
    pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
        3: "pdcchPrecodingOption4x4::repetition2ndXPol",
    },
    pdschPrecodingOption4x4_t: {
        0: "pdschPrecodingOption4x4::NoPortSelection",
        1: "pdschPrecodingOption4x4::PortSelectionUpToRank2",
        2: "pdschPrecodingOption4x4::PortSelectionUpToRank4",
        3: "pdschPrecodingOption4x4::PortSelectionUpToRank1",
        4: "pdschPrecodingOption4x4::NoPortSelectionWcsirsPrecoding",
        5: "pdschPrecodingOption4x4::PortSelectionUpToRank2WcsirsPrecoding",
        6: "pdschPrecodingOption4x4::PortSelectionUpToRank4WcsirsPrecoding",
        7: "pdschPrecodingOption4x4::PortSelectionUpToRank1WcsirsPrecoding",
    },
    polarizationSelection_t: {
        0: "polarizationSelection::firstPolarization",
        1: "polarizationSelection::secondPolarization",
        2: "polarizationSelection::bothPolarizations",
    },
    prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        4: "prachCohCombLen::symbols_4",
        12: "prachCohCombLen::symbols_12",
    },
    prachDtxThresholdSelection_t: {
        2: "prachDtxThresholdSelection::RX_2",
        4: "prachDtxThresholdSelection::RX_4",
    },
    prachFormat_t: {
        0: "prachFormat::FORMAT_0",
        1: "prachFormat::FORMAT_1",
        2: "prachFormat::FORMAT_2",
        3: "prachFormat::FORMAT_3",
        4: "prachFormat::FORMAT_A1",
        5: "prachFormat::FORMAT_A2",
        6: "prachFormat::FORMAT_A3",
        7: "prachFormat::FORMAT_B1",
        8: "prachFormat::FORMAT_B4",
        9: "prachFormat::FORMAT_A1B1",
        10: "prachFormat::FORMAT_A2B2",
        11: "prachFormat::FORMAT_A3B3",
        12: "prachFormat::FORMAT_C0",
        13: "prachFormat::FORMAT_C2",
    },
    prachSequenceType_t: {
        0: "prachSequenceType::UNRESTRICTED",
        1: "prachSequenceType::RESTRICTED_TYPE_A",
        2: "prachSequenceType::RESTRICTED_TYPE_B",
    },
    prachStartSymbol_t: {
        0: "prachStartSymbol::SYMBOL_0",
        2: "prachStartSymbol::SYMBOL_2",
        5: "prachStartSymbol::SYMBOL_5",
        6: "prachStartSymbol::SYMBOL_6",
        7: "prachStartSymbol::SYMBOL_7",
        8: "prachStartSymbol::SYMBOL_8",
        9: "prachStartSymbol::SYMBOL_9",
    },
    precoderGranularity_t: {
        0: "precoderGranularity::REG_BUNDLE_SIZE",
        1: "precoderGranularity::NUM_OF_CONTIG_RB",
    },
    precodingVectorIndex_t: {
        0: "precodingVectorIndex::index_0",
        1: "precodingVectorIndex::index_1",
        2: "precodingVectorIndex::index_2",
        3: "precodingVectorIndex::index_3",
    },
    PtrsFlag: {
        0: "PtrsFlag::PTRS_OFF",
        1: "PtrsFlag::PTRS_ON",
    },
    ptrsFrequencyDensity_t: {
        0: "ptrsFrequencyDensity::K_PTRS_OFF",
        2: "ptrsFrequencyDensity::K_PTRS_2",
        4: "ptrsFrequencyDensity::K_PTRS_4",
    },
    ptrsTimeDensity_t: {
        0: "ptrsTimeDensity::L_PTRS_OFF",
        1: "ptrsTimeDensity::L_PTRS_1",
        2: "ptrsTimeDensity::L_PTRS_2",
        4: "ptrsTimeDensity::L_PTRS_4",
    },
    pucchAdditionalDmrs_t: {
        0: "pucchAdditionalDmrs::ADDITIONAL_DMRS_DISABLED",
        1: "pucchAdditionalDmrs::ADDITIONAL_DMRS_ENABLED",
    },
    pucchFormat_t: {
        0: "pucchFormat::PUCCH_FORMAT_0",
        1: "pucchFormat::PUCCH_FORMAT_1",
        2: "pucchFormat::PUCCH_FORMAT_2",
        3: "pucchFormat::PUCCH_FORMAT_3",
    },
    pucchModulationType_t: {
        0: "pucchModulationType::BPSK",
        1: "pucchModulationType::QPSK",
    },
    puschStartSymbol_t: {
        0: "puschStartSymbol::SYMBOL_0",
        2: "puschStartSymbol::SYMBOL_2",
    },
    puschTransCoherence_t: {
        0: "puschTransCoherence::nonCoherent",
        1: "puschTransCoherence::partialNonCoherent",
        2: "puschTransCoherence::fullCoherent",
    },
    puschTransformPrecoderFlag_t: {
        0: "puschTransformPrecoderFlag::disabled",
        1: "puschTransformPrecoderFlag::enabled",
    },
    dlScPerCarrierPart_t: {
        1296: "dlScPerCarrierPart::DL_BW_PER_CARRIER_1",
        468: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_39PRB",
        636: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_53PRB",
        648: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_54PRB",
        660: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_55PRB",
        792: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_66PRB",
        804: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_67PRB",
    },
    ulScPerCarrierPart_t: {
        1296: "ulScPerCarrierPart::UL_BW_PER_CARRIER_1",
        468: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_39PRB",
        636: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_53PRB",
        648: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_54PRB",
        660: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_55PRB",
        792: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_66PRB",
        804: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_67PRB",
    },
    selfContainedFlag: {
        0: "selfContainedFlag::NON_SELF_CONTAINED",
        1: "selfContainedFlag::SELF_CONTAINED",
    },
    ulDlDataSlotRatio_t: {
        0: "ulDlDataSlotRatio::unavailable",
        1: "ulDlDataSlotRatio::ONE_UL_NINE_DL",
        2: "ulDlDataSlotRatio::TWO_UL_EIGHT_DL",
        3: "ulDlDataSlotRatio::THREE_UL_SEVEN_DL",
        4: "ulDlDataSlotRatio::FIVE_UL_FIVE_DL",
        5: "ulDlDataSlotRatio::ONE_UL_FOUR_DL",
    },
    slotType_t: {
        0: "slotType::SLOT_TYPE_PRACH",
        1: "slotType::SLOT_TYPE_RACH_FORMAT_1",
        2: "slotType::SLOT_TYPE_SSBURST",
        20: "slotType::SLOT_TYPE_C2_TX",
        21: "slotType::SLOT_TYPE_C2",
        22: "slotType::SLOT_TYPE_B1",
        23: "slotType::SLOT_TYPE_B1_CSC",
        24: "slotType::SLOT_TYPE_C2_CSC",
        26: "slotType::SLOT_TYPE_C3",
        27: "slotType::SLOT_TYPE_B0",
        28: "slotType::SLOT_TYPE_B2",
        29: "slotType::SLOT_TYPE_C0",
        30: "slotType::SLOT_TYPE_B3",
        31: "slotType::SLOT_TYPE_C4",
        32: "slotType::SLOT_TYPE_C5",
        33: "slotType::SLOT_TYPE_B4",
        34: "slotType::SLOT_TYPE_B5",
        35: "slotType::SLOT_TYPE_M1",
        36: "slotType::SLOT_TYPE_M2",
        37: "slotType::SLOT_TYPE_M3",
        38: "slotType::SLOT_TYPE_M4",
        39: "slotType::SLOT_TYPE_39",
        40: "slotType::SLOT_TYPE_40",
        41: "slotType::SLOT_TYPE_41",
        43: "slotType::SLOT_TYPE_B1_S",
        44: "slotType::SLOT_TYPE_B3_S",
        45: "slotType::SLOT_TYPE_C2_S",
        46: "slotType::SLOT_TYPE_C3_S",
        50: "slotType::SLOT_TYPE_50",
        51: "slotType::SLOT_TYPE_51",
        52: "slotType::SLOT_TYPE_52",
        53: "slotType::SLOT_TYPE_53",
        54: "slotType::SLOT_TYPE_54",
        55: "slotType::SLOT_TYPE_55",
        56: "slotType::SLOT_TYPE_56",
        57: "slotType::SLOT_TYPE_57",
        58: "slotType::SLOT_TYPE_58",
        61: "slotType::SLOT_TYPE_61",
        62: "slotType::SLOT_TYPE_62",
        63: "slotType::SLOT_TYPE_63",
        64: "slotType::SLOT_TYPE_64",
        65: "slotType::SLOT_TYPE_65",
        66: "slotType::SLOT_TYPE_66",
        67: "slotType::SLOT_TYPE_67",
        68: "slotType::SLOT_TYPE_68",
        69: "slotType::SLOT_TYPE_69",
        70: "slotType::SLOT_TYPE_70",
        71: "slotType::SLOT_TYPE_71",
        72: "slotType::SLOT_TYPE_72",
        73: "slotType::SLOT_TYPE_73",
        74: "slotType::SLOT_TYPE_74",
        75: "slotType::SLOT_TYPE_75",
        76: "slotType::SLOT_TYPE_76",
        77: "slotType::SLOT_TYPE_77",
        78: "slotType::SLOT_TYPE_78",
        79: "slotType::SLOT_TYPE_79",
        80: "slotType::SLOT_TYPE_80",
        81: "slotType::SLOT_TYPE_81",
        82: "slotType::SLOT_TYPE_82",
        83: "slotType::SLOT_TYPE_83",
        84: "slotType::SLOT_TYPE_84",
        85: "slotType::SLOT_TYPE_85",
        86: "slotType::SLOT_TYPE_86",
        87: "slotType::SLOT_TYPE_87",
        88: "slotType::SLOT_TYPE_88",
        89: "slotType::SLOT_TYPE_89",
        90: "slotType::SLOT_TYPE_90",
        91: "slotType::SLOT_TYPE_91",
        92: "slotType::SLOT_TYPE_92",
        93: "slotType::SLOT_TYPE_93",
        94: "slotType::SLOT_TYPE_94",
        95: "slotType::SLOT_TYPE_95",
        96: "slotType::SLOT_TYPE_96",
        97: "slotType::SLOT_TYPE_97",
        98: "slotType::SLOT_TYPE_98",
        99: "slotType::SLOT_TYPE_99",
        100: "slotType::SLOT_TYPE_100",
    },
    SpatialMode: {
        0: "SpatialMode::SINGLE_ANTENNA",
        1: "SpatialMode::TX_DIVERSITY",
        2: "SpatialMode::CL_SPATIAL_MUX",
        3: "SpatialMode::OL_SPATIAL_MUX",
    },
    srBitDetection_t: {
        0: "srBitDetection::SRBIT_DETECTION_DISABLED",
        1: "srBitDetection::SRBIT_DETECTION_ENABLED",
        2: "srBitDetection::SRBIT_DETECTION_INVALID",
    },
    pSRSnumCeAxCId_t: {
        16: "pSRSnumCeAxCId::value1",
        32: "pSRSnumCeAxCId::value2",
        64: "pSRSnumCeAxCId::value3",
    },
    srsTransmissionComb_t: {
        2: "srsTransmissionComb::COMB_2",
        4: "srsTransmissionComb::COMB_4",
    },
    ssBlockConfiguration_t: {
        0: "ssBlockConfiguration::CaseA",
        1: "ssBlockConfiguration::CaseB",
        2: "ssBlockConfiguration::CaseC",
        3: "ssBlockConfiguration::CaseD",
        4: "ssBlockConfiguration::CaseE",
    },
    statusFastAntennaSnapshotResp_t: {
        0: "statusFastAntennaSnapshotResp::status_0_NoError",
        3: "statusFastAntennaSnapshotResp::status_3_OutOfSequence",
        4: "statusFastAntennaSnapshotResp::status_4_ServiceBusy",
        5: "statusFastAntennaSnapshotResp::status_5_MissingMemory",
        6: "statusFastAntennaSnapshotResp::status_6_DataNotAvailable",
        7: "statusFastAntennaSnapshotResp::status_7_MinTimeRejection",
        8: "statusFastAntennaSnapshotResp::status_8_RxUnderflow",
        9: "statusFastAntennaSnapshotResp::status_9_HwError",
        10: "statusFastAntennaSnapshotResp::status_10_DMAError",
        11: "statusFastAntennaSnapshotResp::status_11_FileError",
        12: "statusFastAntennaSnapshotResp::status_12_HaltOnResourcesLimit",
        13: "statusFastAntennaSnapshotResp::status_13_SubcellNotConfigured",
        20: "statusFastAntennaSnapshotResp::status_20_DefaultError",
    },
    subcellPosition_t: {
        0: "subcellPosition::subcell_slot_0",
        1: "subcellPosition::subcell_slot_1",
        2: "subcellPosition::subcell_slot_2",
        3: "subcellPosition::subcell_slot_3",
        4: "subcellPosition::subcell_slot_4",
        5: "subcellPosition::subcell_slot_5",
        6: "subcellPosition::subcell_slot_6",
        7: "subcellPosition::subcell_slot_7",
        8: "subcellPosition::subcell_slot_8",
        9: "subcellPosition::subcell_slot_9",
        10: "subcellPosition::subcell_slot_10",
        11: "subcellPosition::subcell_slot_11",
        12: "subcellPosition::subcell_slot_12",
        13: "subcellPosition::subcell_slot_13",
        14: "subcellPosition::subcell_slot_14",
        15: "subcellPosition::subcell_slot_15",
        16: "subcellPosition::subcell_slot_16",
        17: "subcellPosition::subcell_slot_17",
        18: "subcellPosition::subcell_slot_18",
        19: "subcellPosition::subcell_slot_19",
        20: "subcellPosition::subcell_slot_20",
        21: "subcellPosition::subcell_slot_21",
        22: "subcellPosition::subcell_slot_22",
        23: "subcellPosition::subcell_slot_23",
        24: "subcellPosition::subcell_slot_24",
        25: "subcellPosition::subcell_slot_25",
        26: "subcellPosition::subcell_slot_26",
        27: "subcellPosition::subcell_slot_27",
        28: "subcellPosition::subcell_slot_28",
        29: "subcellPosition::subcell_slot_29",
        30: "subcellPosition::subcell_slot_30",
        31: "subcellPosition::subcell_slot_31",
    },
    SubcellType: {
        0: "SubcellType::C2",
        1: "SubcellType::C4",
        2: "SubcellType::C8",
        3: "SubcellType::D2",
        4: "SubcellType::A2",
        5: "SubcellType::A4",
    },
    ulCodebookIndex_t: {
        0: "ulCodebookIndex::VAL_0",
        1: "ulCodebookIndex::VAL_1",
        2: "ulCodebookIndex::VAL_2",
        3: "ulCodebookIndex::VAL_3",
        4: "ulCodebookIndex::VAL_4",
        5: "ulCodebookIndex::VAL_5",
    },
    ulDmrsConfigType_t: {
        1: "ulDmrsConfigType::DMRS_CONFIG_1",
        2: "ulDmrsConfigType::DMRS_CONFIG_2",
    },
    ulPmiRank1_t: {
        0: "ulPmiRank1::UL_PMI_RANK1_VALUE_0",
        1: "ulPmiRank1::UL_PMI_RANK1_VALUE_1",
        2: "ulPmiRank1::UL_PMI_RANK1_VALUE_2",
        3: "ulPmiRank1::UL_PMI_RANK1_VALUE_3",
        4: "ulPmiRank1::UL_PMI_RANK1_VALUE_4",
        5: "ulPmiRank1::UL_PMI_RANK1_VALUE_5",
        255: "ulPmiRank1::UL_PMI_RANK1_VALUE_INVALID",
    },
    ulPmiRank2_t: {
        0: "ulPmiRank2::UL_PMI_RANK2_VALUE_0",
        1: "ulPmiRank2::UL_PMI_RANK2_VALUE_1",
        2: "ulPmiRank2::UL_PMI_RANK2_VALUE_2",
        255: "ulPmiRank2::UL_PMI_RANK2_VALUE_INVALID",
    },
    ulPtrsNumOfGroups_t: {
        0: "ulPtrsNumOfGroups::Precoder_disabled",
        2: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_1",
        4: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_2",
        8: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_3",
    },
    ulPtrsNumOfSamplesPerGroup_t: {
        0: "ulPtrsNumOfSamplesPerGroup::Precoder_disabled",
        2: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_1",
        4: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_2",
    },
    ulRank_t: {
        1: "ulRank::UL_RANK_1",
        2: "ulRank::UL_RANK_2",
        255: "ulRank::UL_RANK_INVALID",
    },
    EECpriLink_t: {
        0: "EECpriLink::EECpriLink_0",
        1: "EECpriLink::EECpriLink_1",
        2: "EECpriLink::EECpriLink_2",
        3: "EECpriLink::EECpriLink_3",
        4: "EECpriLink::EECpriLink_4",
        5: "EECpriLink::EECpriLink_5",
        6: "EECpriLink::EECpriLink_6",
        7: "EECpriLink::EECpriLink_7",
        8: "EECpriLink::EECpriLink_8",
        9: "EECpriLink::EECpriLink_9",
        10: "EECpriLink::EECpriLink_10",
        11: "EECpriLink::EECpriLink_11",
    },
    EExecutionState_t: {
        0: "EExecutionState::NO_ERROR",
        1: "EExecutionState::UNDEFINED_ERROR",
        2: "EExecutionState::INVALID_PARAM",
    },
    EPerfMeasInterval: {
        0: "EPerfMeasInterval::EPerfMeasInterval_Disabled",
        1: "EPerfMeasInterval::EPerfMeasInterval_5min",
        2: "EPerfMeasInterval::EPerfMeasInterval_15min",
        3: "EPerfMeasInterval::EPerfMeasInterval_30min",
        4: "EPerfMeasInterval::EPerfMeasInterval_60min",
        5: "EPerfMeasInterval::EPerfMeasInterval_360min",
        6: "EPerfMeasInterval::EPerfMeasInterval_720min",
        7: "EPerfMeasInterval::EPerfMeasInterval_1440min",
    },
    EECpriLink_t: {
        0: "EECpriLink::EECpriLink_0",
        1: "EECpriLink::EECpriLink_1",
        2: "EECpriLink::EECpriLink_2",
        3: "EECpriLink::EECpriLink_3",
        4: "EECpriLink::EECpriLink_4",
        5: "EECpriLink::EECpriLink_5",
        6: "EECpriLink::EECpriLink_6",
        7: "EECpriLink::EECpriLink_7",
        8: "EECpriLink::EECpriLink_8",
        9: "EECpriLink::EECpriLink_9",
        10: "EECpriLink::EECpriLink_10",
        11: "EECpriLink::EECpriLink_11",
    },
    EExecutionState_t: {
        0: "EExecutionState::NO_ERROR",
        1: "EExecutionState::UNDEFINED_ERROR",
        2: "EExecutionState::INVALID_PARAM",
    },
    EOutputState_t: {
        0: "EOutputState::ENABLED",
        1: "EOutputState::DISABLED",
    },
    EPerfMeasInterval: {
        0: "EPerfMeasInterval::EPerfMeasInterval_Disabled",
        1: "EPerfMeasInterval::EPerfMeasInterval_5min",
        2: "EPerfMeasInterval::EPerfMeasInterval_15min",
        3: "EPerfMeasInterval::EPerfMeasInterval_30min",
        4: "EPerfMeasInterval::EPerfMeasInterval_60min",
        5: "EPerfMeasInterval::EPerfMeasInterval_360min",
        6: "EPerfMeasInterval::EPerfMeasInterval_720min",
        7: "EPerfMeasInterval::EPerfMeasInterval_1440min",
    },
    EOamECpriLinkState_t: {
        0: "EOamECpriLinkState::DISABLED",
        1: "EOamECpriLinkState::ENABLED",
    },
    EOamECpriLinkState_t: {
        0: "EOamECpriLinkState::DISABLED",
        1: "EOamECpriLinkState::ENABLED",
    },
    clockClass_t: {
        6: "clockClass::CLASS_6",
        7: "clockClass::CLASS_7",
        150: "clockClass::CLASS_150",
    },
    enabledDisabled_t: {
        0: "enabledDisabled::ENABLED",
        1: "enabledDisabled::DISABLED",
    },
    g781NetworkOption_t: {
        1: "g781NetworkOption::OPTION_I",
        2: "g781NetworkOption::OPTION_II",
        3: "g781NetworkOption::OPTION_III",
    },
    status_t: {
        0: "status::EStatus_NoError",
        1: "status::EStatus_UndefinedError",
        2: "status::EStatus_InvalidParam",
        3: "status::EStatus_NotInitialized",
    },
    portMode_t: {
        0: "portMode::DISABLED",
        1: "portMode::MASTER",
        2: "portMode::SLAVE",
    },
    transportMode_t: {
        0: "transportMode::ETH",
        1: "transportMode::IP",
    },
    castMode_t: {
        0: "castMode::MULTICAST",
        1: "castMode::UNICAST",
    },
    ptpEthMulticastAddress_t: {
        1652522221582: "ptpEthMulticastAddress::ADDR_0",
        1215895175168: "ptpEthMulticastAddress::ADDR_1",
    },
    syncmasterStatus_t: {
        0: "syncmasterStatus::Operational",
        1: "syncmasterStatus::Configured",
        2: "syncmasterStatus::Failed",
    },
    ptpEthMulticastAddress_t: {
        1652522221582: "ptpEthMulticastAddress::ADDR_0",
        1215895175168: "ptpEthMulticastAddress::ADDR_1",
    },
    transportMode_t: {
        0: "transportMode::ETH",
        1: "transportMode::IP",
    },
    castMode_t: {
        0: "castMode::MULTICAST",
        1: "castMode::UNICAST",
    },
    status_t: {
        0: "status::EStatus_NoError",
        1: "status::EStatus_UndefinedError",
        2: "status::EStatus_InvalidParam",
        3: "status::EStatus_NotInitialized",
    },
    syncmasterStatus_t: {
        0: "syncmasterStatus::Operational",
        1: "syncmasterStatus::Configured",
        2: "syncmasterStatus::Failed",
    },
    ackNackUci_t: {
        0: "ackNackUci::NACK",
        1: "ackNackUci::ACK",
    },
    ackCrcCheck_t: {
        0: "ackCrcCheck::Fail",
        1: "ackCrcCheck::Pass",
    },
    aggregationLevel_t: {
        1: "aggregationLevel::AL1",
        2: "aggregationLevel::AL2",
        4: "aggregationLevel::AL4",
        8: "aggregationLevel::AL8",
        16: "aggregationLevel::AL16",
    },
    AntPortLayer: {
        0: "AntPortLayer::MAP0",
        1: "AntPortLayer::MAP1",
        2: "AntPortLayer::MAP2",
        3: "AntPortLayer::MAP3",
        4: "AntPortLayer::MAP4",
        5: "AntPortLayer::MAP5",
        6: "AntPortLayer::MAP6",
        7: "AntPortLayer::MAP7",
        8: "AntPortLayer::MAP8",
        9: "AntPortLayer::MAP9",
        10: "AntPortLayer::MAP10",
        11: "AntPortLayer::MAP11",
        12: "AntPortLayer::MAP12",
        13: "AntPortLayer::MAP13",
        14: "AntPortLayer::MAP14",
        15: "AntPortLayer::MAP15",
    },
    bitValue_t: {
        0: "bitValue::BIT_VALUE_0",
        1: "bitValue::BIT_VALUE_1",
        255: "bitValue::BIT_VALUE_INVALID",
    },
    cceRegMappingType_t: {
        0: "cceRegMappingType::INTERLEAVED",
        1: "cceRegMappingType::NON_INTERLEAVED",
    },
    numCeAxC_t: {
        2: "numCeAxC::NUM_C_EAXC_2",
        4: "numCeAxC::NUM_C_EAXC_4",
    },
    numCeAxC_UlCell_Setup_t: {
        2: "numCeAxC_UlCell_Setup::NUM_C_EAXC_2",
        4: "numCeAxC_UlCell_Setup::NUM_C_EAXC_4",
        8: "numCeAxC_UlCell_Setup::NUM_C_EAXC_8",
    },
    cellExtension_t: {
        10: "cellExtension::NORMAL",
        20: "cellExtension::EXTENDED",
        23: "cellExtension::EXTENDED_2_point_3",
        69: "cellExtension::EXTENDED_6_point_9",
        110: "cellExtension::EXTENDED_11_point_0",
    },
    cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
    },
    closedLoop3gppCodebook_t: {
        0: "closedLoop3gppCodebook::TwoportTypeICodebook",
        1: "closedLoop3gppCodebook::FourportTypeICodebook",
        2: "closedLoop3gppCodebook::EightportTypeICodebook",
        255: "closedLoop3gppCodebook::INVALID",
    },
    coresetInterleaverSize_t: {
        0: "coresetInterleaverSize::ROWS_0",
        2: "coresetInterleaverSize::ROWS_2",
        3: "coresetInterleaverSize::ROWS_3",
        6: "coresetInterleaverSize::ROWS_6",
    },
    coresetRegBundleSize_t: {
        2: "coresetRegBundleSize::REGS_2",
        3: "coresetRegBundleSize::REGS_3",
        6: "coresetRegBundleSize::REGS_6",
    },
    cpriDialectIndication_t: {
        0: "cpriDialectIndication::CPRI_N",
        1: "cpriDialectIndication::CPRI_A",
    },
    crc_t: {
        0: "crc::OK",
        1: "crc::NOK",
    },
    csiRsCodebookMode_t: {
        1: "csiRsCodebookMode::Config1",
        2: "csiRsCodebookMode::Config2",
    },
    csiRsCodebookType_t: {
        0: "csiRsCodebookType::TypeI_SinglePanel",
        1: "csiRsCodebookType::TypeI_MultiPanel",
        2: "csiRsCodebookType::TypeII",
        3: "csiRsCodebookType::TypeII_PortSelection",
    },
    csiRsDensity_t: {
        0: "csiRsDensity::dot5",
        1: "csiRsDensity::one",
        3: "csiRsDensity::three",
    },
    csiRsDensityDot5PrbLocation_t: {
        0: "csiRsDensityDot5PrbLocation::evenPrbs",
        1: "csiRsDensityDot5PrbLocation::oddPrbs",
    },
    csiRsPrecodingMatrix_t: {
        0: "csiRsPrecodingMatrix::IDENTITY_MATRIX",
        1: "csiRsPrecodingMatrix::DIAGONAL_PER_BLOCK",
    },
    csiRsReportQuantity_t: {
        0: "csiRsReportQuantity::cri_RP_PMI_CQI",
        1: "csiRsReportQuantity::cri_RI_CQI",
        2: "csiRsReportQuantity::cri_RSRP",
    },
    csiRsTrsInfo_t: {
        0: "csiRsTrsInfo::DISABLED",
        1: "csiRsTrsInfo::ENABLED",
    },
    digitalOutputRate_t: {
        0: "digitalOutputRate::bitrate115dot2k",
        1: "digitalOutputRate::bitrate460dot8k",
        2: "digitalOutputRate::bitrate1dot92M",
    },
    digitalOutputType_t: {
        0: "digitalOutputType::serialKeysight",
        1: "digitalOutputType::serialRs",
    },
    Direction_t: {
        1: "Direction::DL",
        2: "Direction::UL",
    },
    DlCodebookIndex: {
        0: "DlCodebookIndex::VAL_0",
        1: "DlCodebookIndex::VAL_1",
        2: "DlCodebookIndex::VAL_2",
        3: "DlCodebookIndex::VAL_3",
        255: "DlCodebookIndex::VAL_255",
    },
    dlDmrsConfigType_t: {
        1: "dlDmrsConfigType::DMRS_CONFIG_1",
        2: "dlDmrsConfigType::DMRS_CONFIG_2",
    },
    dlMimoMode_t: {
        0: "dlMimoMode::CL_2x2_MIMO",
        1: "dlMimoMode::CL_4x4_or_4x2_MIMO",
        2: "dlMimoMode::OL_2x2_MIMO",
        3: "dlMimoMode::OL_4x4_or_4x2_MIMO",
        4: "dlMimoMode::CL_8x4_MIMO",
    },
    dmrsLen_t: {
        1: "dmrsLen::NR_SYMBOLS_1",
        2: "dmrsLen::NR_SYMBOLS_2",
    },
    dmrsMappingType_t: {
        0: "dmrsMappingType::DMRS_MAPPING_TYPE_A",
        1: "dmrsMappingType::DMRS_MAPPING_TYPE_B",
    },
    dmrsReferencePoint_t: {
        0: "dmrsReferencePoint::CORESET_START_RB",
        1: "dmrsReferencePoint::POINT_A",
    },
    dtx_t: {
        0: "dtx::NON_DTX",
        1: "dtx::DTX",
    },
    EBandwidth: {
        11: "EBandwidth::prbs_11",
        18: "EBandwidth::prbs_18",
        24: "EBandwidth::prbs_24",
        25: "EBandwidth::prbs_25",
        31: "EBandwidth::prbs_31",
        32: "EBandwidth::prbs_32",
        38: "EBandwidth::prbs_38",
        51: "EBandwidth::prbs_51",
        52: "EBandwidth::prbs_52",
        64: "EBandwidth::prbs_64",
        65: "EBandwidth::prbs_65",
        66: "EBandwidth::prbs_66",
        78: "EBandwidth::prbs_78",
        79: "EBandwidth::prbs_79",
        93: "EBandwidth::prbs_93",
        106: "EBandwidth::prbs_106",
        107: "EBandwidth::prbs_107",
        121: "EBandwidth::prbs_121",
        128: "EBandwidth::prbs_128",
        132: "EBandwidth::prbs_132",
        133: "EBandwidth::prbs_133",
        135: "EBandwidth::prbs_135",
        160: "EBandwidth::prbs_160",
        162: "EBandwidth::prbs_162",
        189: "EBandwidth::prbs_189",
        216: "EBandwidth::prbs_216",
        217: "EBandwidth::prbs_217",
        245: "EBandwidth::prbs_245",
        256: "EBandwidth::prbs_256",
        264: "EBandwidth::prbs_264",
        270: "EBandwidth::prbs_270",
        273: "EBandwidth::prbs_273",
    },
    ENumberOfBeams: {
        1: "ENumberOfBeams::beams_1",
        6: "ENumberOfBeams::beams_6",
        9: "ENumberOfBeams::beams_9",
        12: "ENumberOfBeams::beams_12",
        15: "ENumberOfBeams::beams_15",
        18: "ENumberOfBeams::beams_18",
        21: "ENumberOfBeams::beams_21",
        24: "ENumberOfBeams::beams_24",
    },
    EScs: {
        0: "EScs::UNUSED",
        15: "EScs::khz_15",
        30: "EScs::khz_30",
        60: "EScs::khz_60",
        120: "EScs::khz_120",
    },
    EStatus_5G: {
        0: "EStatus_5G::NoError",
        1: "EStatus_5G::UndefinedError",
        2: "EStatus_5G::SyntaxError",
        3: "EStatus_5G::OutOfSequence",
        4: "EStatus_5G::ServiceBusy",
        5: "EStatus_5G::MissingMemory",
        6: "EStatus_5G::DataNotAvailable",
        7: "EStatus_5G::MinTimeRejection",
        8: "EStatus_5G::RxUnderflow",
        9: "EStatus_5G::HwError",
        10: "EStatus_5G::DmaError",
        11: "EStatus_5G::FileError",
        12: "EStatus_5G::HaltOnResourcesLimit",
        13: "EStatus_5G::SubcellNotConfigured",
    },
    tbStatus_t: {
        0: "tbStatus::CRC_PASS",
        1: "tbStatus::CRC_FAIL",
    },
    frequencyHopping_t: {
        0: "frequencyHopping::FREQ_HOPPING_DISABLED",
        1: "frequencyHopping::FREQ_HOPPING_ENABLED",
    },
    harqProcessIndex_t: {
        0: "harqProcessIndex::ID_0",
        1: "harqProcessIndex::ID_1",
        2: "harqProcessIndex::ID_2",
        3: "harqProcessIndex::ID_3",
        4: "harqProcessIndex::ID_4",
        5: "harqProcessIndex::ID_5",
        6: "harqProcessIndex::ID_6",
        7: "harqProcessIndex::ID_7",
        8: "harqProcessIndex::ID_8",
        9: "harqProcessIndex::ID_9",
        10: "harqProcessIndex::ID_10",
        11: "harqProcessIndex::ID_11",
        12: "harqProcessIndex::ID_12",
        13: "harqProcessIndex::ID_13",
        14: "harqProcessIndex::ID_14",
        15: "harqProcessIndex::ID_15",
    },
    ldpcBaseGraph_t: {
        1: "ldpcBaseGraph::BG_1",
        2: "ldpcBaseGraph::BG_2",
    },
    longPucchStartSymbol_t: {
        0: "longPucchStartSymbol::SYMBOL_0",
    },
    numLteCrsPorts_t: {
        1: "numLteCrsPorts::NUM_LTE_CRS_PORTS_1",
        2: "numLteCrsPorts::NUM_LTE_CRS_PORTS_2",
        4: "numLteCrsPorts::NUM_LTE_CRS_PORTS_4",
    },
    lteDlBandwidth_t: {
        25: "lteDlBandwidth::LTE_DL_BW_25",
        50: "lteDlBandwidth::LTE_DL_BW_50",
        75: "lteDlBandwidth::LTE_DL_BW_75",
        100: "lteDlBandwidth::LTE_DL_BW_100",
    },
    mantissaSize_t: {
        9: "mantissaSize::mantissaSize_9",
        14: "mantissaSize::mantissaSize_14",
    },
    mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
    },
    modulationOrder_t: {
        1: "modulationOrder::Order1",
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    numberOfColTRX_t: {
        4: "numberOfColTRX::numberOfColTRX_4",
        8: "numberOfColTRX::numberOfColTRX_8",
    },
    numberOfRowTRX_t: {
        1: "numberOfRowTRX::numberOfRowTRX_1",
        2: "numberOfRowTRX::numberOfRowTRX_2",
        4: "numberOfRowTRX::numberOfRowTRX_4",
    },
    numOfLongPucchSymbols_t: {
        14: "numOfLongPucchSymbols::VAL_14_SYMBOLS",
    },
    NumOfPdschSymbols: {
        2: "NumOfPdschSymbols::VAL_2_SYMBOLS",
        3: "NumOfPdschSymbols::VAL_3_SYMBOLS",
        4: "NumOfPdschSymbols::VAL_4_SYMBOLS",
        5: "NumOfPdschSymbols::VAL_5_SYMBOLS",
        6: "NumOfPdschSymbols::VAL_6_SYMBOLS",
        7: "NumOfPdschSymbols::VAL_7_SYMBOLS",
        8: "NumOfPdschSymbols::VAL_8_SYMBOLS",
        9: "NumOfPdschSymbols::VAL_9_SYMBOLS",
        10: "NumOfPdschSymbols::VAL_10_SYMBOLS",
        11: "NumOfPdschSymbols::VAL_11_SYMBOLS",
        12: "NumOfPdschSymbols::VAL_12_SYMBOLS",
        13: "NumOfPdschSymbols::VAL_13_SYMBOLS",
        14: "NumOfPdschSymbols::VAL_14_SYMBOLS",
    },
    numOfPucchLayers_t: {
        1: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_1",
        2: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_2",
    },
    numOfPucchTxAntennaPorts_t: {
        1: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_1",
        2: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_2",
    },
    numOfPuschSymbols_t: {
        2: "numOfPuschSymbols::PCS2",
        9: "numOfPuschSymbols::PCS9",
        10: "numOfPuschSymbols::PCS10",
        11: "numOfPuschSymbols::PCS11",
        12: "numOfPuschSymbols::PCS12",
        13: "numOfPuschSymbols::PCS13",
        14: "numOfPuschSymbols::PCS14",
    },
    numOfSrsTxAntennaPorts_t: {
        1: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_1",
        2: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_2",
        4: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_4",
    },
    openLoopScheme_t: {
        0: "openLoopScheme::NO_PRECODING_0",
        1: "openLoopScheme::SCDD_1",
        2: "openLoopScheme::LCDD_2",
        255: "openLoopScheme::INVALID_255",
    },
    pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
        3: "pdcchPrecodingOption4x4::repetition2ndXPol",
    },
    pdschPrecodingOption4x4_t: {
        0: "pdschPrecodingOption4x4::NoPortSelection",
        1: "pdschPrecodingOption4x4::PortSelectionUpToRank2",
        2: "pdschPrecodingOption4x4::PortSelectionUpToRank4",
        3: "pdschPrecodingOption4x4::PortSelectionUpToRank1",
        4: "pdschPrecodingOption4x4::NoPortSelectionWcsirsPrecoding",
        5: "pdschPrecodingOption4x4::PortSelectionUpToRank2WcsirsPrecoding",
        6: "pdschPrecodingOption4x4::PortSelectionUpToRank4WcsirsPrecoding",
        7: "pdschPrecodingOption4x4::PortSelectionUpToRank1WcsirsPrecoding",
    },
    polarizationSelection_t: {
        0: "polarizationSelection::firstPolarization",
        1: "polarizationSelection::secondPolarization",
        2: "polarizationSelection::bothPolarizations",
    },
    prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        4: "prachCohCombLen::symbols_4",
        12: "prachCohCombLen::symbols_12",
    },
    prachDtxThresholdSelection_t: {
        2: "prachDtxThresholdSelection::RX_2",
        4: "prachDtxThresholdSelection::RX_4",
    },
    prachFormat_t: {
        0: "prachFormat::FORMAT_0",
        1: "prachFormat::FORMAT_1",
        2: "prachFormat::FORMAT_2",
        3: "prachFormat::FORMAT_3",
        4: "prachFormat::FORMAT_A1",
        5: "prachFormat::FORMAT_A2",
        6: "prachFormat::FORMAT_A3",
        7: "prachFormat::FORMAT_B1",
        8: "prachFormat::FORMAT_B4",
        9: "prachFormat::FORMAT_A1B1",
        10: "prachFormat::FORMAT_A2B2",
        11: "prachFormat::FORMAT_A3B3",
        12: "prachFormat::FORMAT_C0",
        13: "prachFormat::FORMAT_C2",
    },
    prachSequenceType_t: {
        0: "prachSequenceType::UNRESTRICTED",
        1: "prachSequenceType::RESTRICTED_TYPE_A",
        2: "prachSequenceType::RESTRICTED_TYPE_B",
    },
    prachStartSymbol_t: {
        0: "prachStartSymbol::SYMBOL_0",
        2: "prachStartSymbol::SYMBOL_2",
        5: "prachStartSymbol::SYMBOL_5",
        6: "prachStartSymbol::SYMBOL_6",
        7: "prachStartSymbol::SYMBOL_7",
        8: "prachStartSymbol::SYMBOL_8",
        9: "prachStartSymbol::SYMBOL_9",
    },
    precoderGranularity_t: {
        0: "precoderGranularity::REG_BUNDLE_SIZE",
        1: "precoderGranularity::NUM_OF_CONTIG_RB",
    },
    precodingVectorIndex_t: {
        0: "precodingVectorIndex::index_0",
        1: "precodingVectorIndex::index_1",
        2: "precodingVectorIndex::index_2",
        3: "precodingVectorIndex::index_3",
    },
    PtrsFlag: {
        0: "PtrsFlag::PTRS_OFF",
        1: "PtrsFlag::PTRS_ON",
    },
    ptrsFrequencyDensity_t: {
        0: "ptrsFrequencyDensity::K_PTRS_OFF",
        2: "ptrsFrequencyDensity::K_PTRS_2",
        4: "ptrsFrequencyDensity::K_PTRS_4",
    },
    ptrsTimeDensity_t: {
        0: "ptrsTimeDensity::L_PTRS_OFF",
        1: "ptrsTimeDensity::L_PTRS_1",
        2: "ptrsTimeDensity::L_PTRS_2",
        4: "ptrsTimeDensity::L_PTRS_4",
    },
    pucchAdditionalDmrs_t: {
        0: "pucchAdditionalDmrs::ADDITIONAL_DMRS_DISABLED",
        1: "pucchAdditionalDmrs::ADDITIONAL_DMRS_ENABLED",
    },
    pucchFormat_t: {
        0: "pucchFormat::PUCCH_FORMAT_0",
        1: "pucchFormat::PUCCH_FORMAT_1",
        2: "pucchFormat::PUCCH_FORMAT_2",
        3: "pucchFormat::PUCCH_FORMAT_3",
    },
    pucchModulationType_t: {
        0: "pucchModulationType::BPSK",
        1: "pucchModulationType::QPSK",
    },
    puschStartSymbol_t: {
        0: "puschStartSymbol::SYMBOL_0",
        2: "puschStartSymbol::SYMBOL_2",
    },
    puschTransCoherence_t: {
        0: "puschTransCoherence::nonCoherent",
        1: "puschTransCoherence::partialNonCoherent",
        2: "puschTransCoherence::fullCoherent",
    },
    puschTransformPrecoderFlag_t: {
        0: "puschTransformPrecoderFlag::disabled",
        1: "puschTransformPrecoderFlag::enabled",
    },
    dlScPerCarrierPart_t: {
        1296: "dlScPerCarrierPart::DL_BW_PER_CARRIER_1",
        468: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_39PRB",
        636: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_53PRB",
        648: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_54PRB",
        660: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_55PRB",
        792: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_66PRB",
        804: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_67PRB",
    },
    ulScPerCarrierPart_t: {
        1296: "ulScPerCarrierPart::UL_BW_PER_CARRIER_1",
        468: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_39PRB",
        636: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_53PRB",
        648: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_54PRB",
        660: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_55PRB",
        792: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_66PRB",
        804: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_67PRB",
    },
    selfContainedFlag: {
        0: "selfContainedFlag::NON_SELF_CONTAINED",
        1: "selfContainedFlag::SELF_CONTAINED",
    },
    ulDlDataSlotRatio_t: {
        0: "ulDlDataSlotRatio::unavailable",
        1: "ulDlDataSlotRatio::ONE_UL_NINE_DL",
        2: "ulDlDataSlotRatio::TWO_UL_EIGHT_DL",
        3: "ulDlDataSlotRatio::THREE_UL_SEVEN_DL",
        4: "ulDlDataSlotRatio::FIVE_UL_FIVE_DL",
        5: "ulDlDataSlotRatio::ONE_UL_FOUR_DL",
    },
    slotType_t: {
        0: "slotType::SLOT_TYPE_PRACH",
        1: "slotType::SLOT_TYPE_RACH_FORMAT_1",
        2: "slotType::SLOT_TYPE_SSBURST",
        20: "slotType::SLOT_TYPE_C2_TX",
        21: "slotType::SLOT_TYPE_C2",
        22: "slotType::SLOT_TYPE_B1",
        23: "slotType::SLOT_TYPE_B1_CSC",
        24: "slotType::SLOT_TYPE_C2_CSC",
        26: "slotType::SLOT_TYPE_C3",
        27: "slotType::SLOT_TYPE_B0",
        28: "slotType::SLOT_TYPE_B2",
        29: "slotType::SLOT_TYPE_C0",
        30: "slotType::SLOT_TYPE_B3",
        31: "slotType::SLOT_TYPE_C4",
        32: "slotType::SLOT_TYPE_C5",
        33: "slotType::SLOT_TYPE_B4",
        34: "slotType::SLOT_TYPE_B5",
        35: "slotType::SLOT_TYPE_M1",
        36: "slotType::SLOT_TYPE_M2",
        37: "slotType::SLOT_TYPE_M3",
        38: "slotType::SLOT_TYPE_M4",
        39: "slotType::SLOT_TYPE_39",
        40: "slotType::SLOT_TYPE_40",
        41: "slotType::SLOT_TYPE_41",
        43: "slotType::SLOT_TYPE_B1_S",
        44: "slotType::SLOT_TYPE_B3_S",
        45: "slotType::SLOT_TYPE_C2_S",
        46: "slotType::SLOT_TYPE_C3_S",
        50: "slotType::SLOT_TYPE_50",
        51: "slotType::SLOT_TYPE_51",
        52: "slotType::SLOT_TYPE_52",
        53: "slotType::SLOT_TYPE_53",
        54: "slotType::SLOT_TYPE_54",
        55: "slotType::SLOT_TYPE_55",
        56: "slotType::SLOT_TYPE_56",
        57: "slotType::SLOT_TYPE_57",
        58: "slotType::SLOT_TYPE_58",
        61: "slotType::SLOT_TYPE_61",
        62: "slotType::SLOT_TYPE_62",
        63: "slotType::SLOT_TYPE_63",
        64: "slotType::SLOT_TYPE_64",
        65: "slotType::SLOT_TYPE_65",
        66: "slotType::SLOT_TYPE_66",
        67: "slotType::SLOT_TYPE_67",
        68: "slotType::SLOT_TYPE_68",
        69: "slotType::SLOT_TYPE_69",
        70: "slotType::SLOT_TYPE_70",
        71: "slotType::SLOT_TYPE_71",
        72: "slotType::SLOT_TYPE_72",
        73: "slotType::SLOT_TYPE_73",
        74: "slotType::SLOT_TYPE_74",
        75: "slotType::SLOT_TYPE_75",
        76: "slotType::SLOT_TYPE_76",
        77: "slotType::SLOT_TYPE_77",
        78: "slotType::SLOT_TYPE_78",
        79: "slotType::SLOT_TYPE_79",
        80: "slotType::SLOT_TYPE_80",
        81: "slotType::SLOT_TYPE_81",
        82: "slotType::SLOT_TYPE_82",
        83: "slotType::SLOT_TYPE_83",
        84: "slotType::SLOT_TYPE_84",
        85: "slotType::SLOT_TYPE_85",
        86: "slotType::SLOT_TYPE_86",
        87: "slotType::SLOT_TYPE_87",
        88: "slotType::SLOT_TYPE_88",
        89: "slotType::SLOT_TYPE_89",
        90: "slotType::SLOT_TYPE_90",
        91: "slotType::SLOT_TYPE_91",
        92: "slotType::SLOT_TYPE_92",
        93: "slotType::SLOT_TYPE_93",
        94: "slotType::SLOT_TYPE_94",
        95: "slotType::SLOT_TYPE_95",
        96: "slotType::SLOT_TYPE_96",
        97: "slotType::SLOT_TYPE_97",
        98: "slotType::SLOT_TYPE_98",
        99: "slotType::SLOT_TYPE_99",
        100: "slotType::SLOT_TYPE_100",
    },
    SpatialMode: {
        0: "SpatialMode::SINGLE_ANTENNA",
        1: "SpatialMode::TX_DIVERSITY",
        2: "SpatialMode::CL_SPATIAL_MUX",
        3: "SpatialMode::OL_SPATIAL_MUX",
    },
    srBitDetection_t: {
        0: "srBitDetection::SRBIT_DETECTION_DISABLED",
        1: "srBitDetection::SRBIT_DETECTION_ENABLED",
        2: "srBitDetection::SRBIT_DETECTION_INVALID",
    },
    pSRSnumCeAxCId_t: {
        16: "pSRSnumCeAxCId::value1",
        32: "pSRSnumCeAxCId::value2",
        64: "pSRSnumCeAxCId::value3",
    },
    srsTransmissionComb_t: {
        2: "srsTransmissionComb::COMB_2",
        4: "srsTransmissionComb::COMB_4",
    },
    ssBlockConfiguration_t: {
        0: "ssBlockConfiguration::CaseA",
        1: "ssBlockConfiguration::CaseB",
        2: "ssBlockConfiguration::CaseC",
        3: "ssBlockConfiguration::CaseD",
        4: "ssBlockConfiguration::CaseE",
    },
    statusFastAntennaSnapshotResp_t: {
        0: "statusFastAntennaSnapshotResp::status_0_NoError",
        3: "statusFastAntennaSnapshotResp::status_3_OutOfSequence",
        4: "statusFastAntennaSnapshotResp::status_4_ServiceBusy",
        5: "statusFastAntennaSnapshotResp::status_5_MissingMemory",
        6: "statusFastAntennaSnapshotResp::status_6_DataNotAvailable",
        7: "statusFastAntennaSnapshotResp::status_7_MinTimeRejection",
        8: "statusFastAntennaSnapshotResp::status_8_RxUnderflow",
        9: "statusFastAntennaSnapshotResp::status_9_HwError",
        10: "statusFastAntennaSnapshotResp::status_10_DMAError",
        11: "statusFastAntennaSnapshotResp::status_11_FileError",
        12: "statusFastAntennaSnapshotResp::status_12_HaltOnResourcesLimit",
        13: "statusFastAntennaSnapshotResp::status_13_SubcellNotConfigured",
        20: "statusFastAntennaSnapshotResp::status_20_DefaultError",
    },
    subcellPosition_t: {
        0: "subcellPosition::subcell_slot_0",
        1: "subcellPosition::subcell_slot_1",
        2: "subcellPosition::subcell_slot_2",
        3: "subcellPosition::subcell_slot_3",
        4: "subcellPosition::subcell_slot_4",
        5: "subcellPosition::subcell_slot_5",
        6: "subcellPosition::subcell_slot_6",
        7: "subcellPosition::subcell_slot_7",
        8: "subcellPosition::subcell_slot_8",
        9: "subcellPosition::subcell_slot_9",
        10: "subcellPosition::subcell_slot_10",
        11: "subcellPosition::subcell_slot_11",
        12: "subcellPosition::subcell_slot_12",
        13: "subcellPosition::subcell_slot_13",
        14: "subcellPosition::subcell_slot_14",
        15: "subcellPosition::subcell_slot_15",
        16: "subcellPosition::subcell_slot_16",
        17: "subcellPosition::subcell_slot_17",
        18: "subcellPosition::subcell_slot_18",
        19: "subcellPosition::subcell_slot_19",
        20: "subcellPosition::subcell_slot_20",
        21: "subcellPosition::subcell_slot_21",
        22: "subcellPosition::subcell_slot_22",
        23: "subcellPosition::subcell_slot_23",
        24: "subcellPosition::subcell_slot_24",
        25: "subcellPosition::subcell_slot_25",
        26: "subcellPosition::subcell_slot_26",
        27: "subcellPosition::subcell_slot_27",
        28: "subcellPosition::subcell_slot_28",
        29: "subcellPosition::subcell_slot_29",
        30: "subcellPosition::subcell_slot_30",
        31: "subcellPosition::subcell_slot_31",
    },
    SubcellType: {
        0: "SubcellType::C2",
        1: "SubcellType::C4",
        2: "SubcellType::C8",
        3: "SubcellType::D2",
        4: "SubcellType::A2",
        5: "SubcellType::A4",
    },
    ulCodebookIndex_t: {
        0: "ulCodebookIndex::VAL_0",
        1: "ulCodebookIndex::VAL_1",
        2: "ulCodebookIndex::VAL_2",
        3: "ulCodebookIndex::VAL_3",
        4: "ulCodebookIndex::VAL_4",
        5: "ulCodebookIndex::VAL_5",
    },
    ulDmrsConfigType_t: {
        1: "ulDmrsConfigType::DMRS_CONFIG_1",
        2: "ulDmrsConfigType::DMRS_CONFIG_2",
    },
    ulPmiRank1_t: {
        0: "ulPmiRank1::UL_PMI_RANK1_VALUE_0",
        1: "ulPmiRank1::UL_PMI_RANK1_VALUE_1",
        2: "ulPmiRank1::UL_PMI_RANK1_VALUE_2",
        3: "ulPmiRank1::UL_PMI_RANK1_VALUE_3",
        4: "ulPmiRank1::UL_PMI_RANK1_VALUE_4",
        5: "ulPmiRank1::UL_PMI_RANK1_VALUE_5",
        255: "ulPmiRank1::UL_PMI_RANK1_VALUE_INVALID",
    },
    ulPmiRank2_t: {
        0: "ulPmiRank2::UL_PMI_RANK2_VALUE_0",
        1: "ulPmiRank2::UL_PMI_RANK2_VALUE_1",
        2: "ulPmiRank2::UL_PMI_RANK2_VALUE_2",
        255: "ulPmiRank2::UL_PMI_RANK2_VALUE_INVALID",
    },
    ulPtrsNumOfGroups_t: {
        0: "ulPtrsNumOfGroups::Precoder_disabled",
        2: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_1",
        4: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_2",
        8: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_3",
    },
    ulPtrsNumOfSamplesPerGroup_t: {
        0: "ulPtrsNumOfSamplesPerGroup::Precoder_disabled",
        2: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_1",
        4: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_2",
    },
    ulRank_t: {
        1: "ulRank::UL_RANK_1",
        2: "ulRank::UL_RANK_2",
        255: "ulRank::UL_RANK_INVALID",
    },
    EAntennaSnapshotRequestType: {
        0: "EAntennaSnapshotRequestType::LoggingAgent",
        1: "EAntennaSnapshotRequestType::Testport",
        2: "EAntennaSnapshotRequestType::SuspiciousEventL1",
        3: "EAntennaSnapshotRequestType::SuspiciousEventL2",
    },
    EAntennaSnapshotConfigurationStatusType: {
        0: "EAntennaSnapshotConfigurationStatusType::Ok",
        1: "EAntennaSnapshotConfigurationStatusType::Nok",
    },
    EAntennaSnapshotCaptureModeType: {
        0: "EAntennaSnapshotCaptureModeType::StopContinuousCapture",
        1: "EAntennaSnapshotCaptureModeType::StartSingleCapture",
    },
    EAntennaSnapshotFileFormatType: {
        0: "EAntennaSnapshotFileFormatType::TxAfterRxInSameFile",
        1: "EAntennaSnapshotFileFormatType::RxAndTxInSeparateFiles",
    },
    EAntennaSnapshotSendAckType: {
        0: "EAntennaSnapshotSendAckType::SendResponseAck",
        1: "EAntennaSnapshotSendAckType::NoResponseAck",
    },
    EAntennaSnapshotL1EventEnableType: {
        0: "EAntennaSnapshotL1EventEnableType::Enabled",
        1: "EAntennaSnapshotL1EventEnableType::Disabled",
    },
    EReportType: {
        0: "EReportType::STOP",
        1: "EReportType::START",
    },
    EOutputMode: {
        0: "EOutputMode::SNAPSHOT",
        1: "EOutputMode::STREAMING",
    },
    EAntSnapshotL1Enabled: {
        0: "EAntSnapshotL1Enabled::ENABLED",
        1: "EAntSnapshotL1Enabled::DISABLED",
    },
    EAntSnapshotL1Enabled: {
        0: "EAntSnapshotL1Enabled::ENABLED",
        1: "EAntSnapshotL1Enabled::DISABLED",
    },
    EReportType: {
        0: "EReportType::STOP",
        1: "EReportType::START",
    },
    EOutputMode: {
        0: "EOutputMode::SNAPSHOT",
        1: "EOutputMode::STREAMING",
    },
    dataDirection_t: {
        0: "dataDirection::DataDirectionRx",
        1: "dataDirection::DataDirectionTx",
    },
    filterIndex_t: {
        0: "filterIndex::FilterIndex_StandardChannel",
        1: "filterIndex::FilterIndex_PrachPreambleFormats_012",
        2: "filterIndex::FilterIndex_PrachPreambleFormats_3",
        3: "filterIndex::FilterIndex_PrachPreambleFormats_A1_C2",
        4: "filterIndex::FilterIndex_NPrachUl",
    },
    rb_t: {
        0: "rb::RbIndicator_EveryRb",
        1: "rb::RbIndicator_EveryOtherRb",
    },
    filterIndex_t: {
        0: "filterIndex::FilterIndex_StandardChannel",
        1: "filterIndex::FilterIndex_PrachPreambleFormats_012",
        2: "filterIndex::FilterIndex_PrachPreambleFormats_3",
        3: "filterIndex::FilterIndex_PrachPreambleFormats_A1_C2",
        4: "filterIndex::FilterIndex_NPrachUl",
    },
    rb_t: {
        0: "rb::RbIndicator_EveryRb",
        1: "rb::RbIndicator_EveryOtherRb",
    },
    EECpriLink_t: {
        0: "EECpriLink::EECpriLink_0",
        1: "EECpriLink::EECpriLink_1",
        2: "EECpriLink::EECpriLink_2",
        3: "EECpriLink::EECpriLink_3",
        4: "EECpriLink::EECpriLink_4",
        5: "EECpriLink::EECpriLink_5",
        6: "EECpriLink::EECpriLink_6",
        7: "EECpriLink::EECpriLink_7",
        8: "EECpriLink::EECpriLink_8",
        9: "EECpriLink::EECpriLink_9",
        10: "EECpriLink::EECpriLink_10",
        11: "EECpriLink::EECpriLink_11",
    },
    EExecutionState_t: {
        0: "EExecutionState::NO_ERROR",
        1: "EExecutionState::UNDEFINED_ERROR",
        2: "EExecutionState::INVALID_PARAM",
    },
    EOutputState_t: {
        0: "EOutputState::ENABLED",
        1: "EOutputState::DISABLED",
    },
    EPerfMeasInterval: {
        0: "EPerfMeasInterval::EPerfMeasInterval_Disabled",
        1: "EPerfMeasInterval::EPerfMeasInterval_5min",
        2: "EPerfMeasInterval::EPerfMeasInterval_15min",
        3: "EPerfMeasInterval::EPerfMeasInterval_30min",
        4: "EPerfMeasInterval::EPerfMeasInterval_60min",
        5: "EPerfMeasInterval::EPerfMeasInterval_360min",
        6: "EPerfMeasInterval::EPerfMeasInterval_720min",
        7: "EPerfMeasInterval::EPerfMeasInterval_1440min",
    },
    EOamECpriLinkState_t: {
        0: "EOamECpriLinkState::DISABLED",
        1: "EOamECpriLinkState::ENABLED",
    },
    ECpriLink: {
        0: "ECpriLink::ECpriLink_0",
        1: "ECpriLink::ECpriLink_1",
        2: "ECpriLink::ECpriLink_2",
        3: "ECpriLink::ECpriLink_3",
        4: "ECpriLink::ECpriLink_4",
        5: "ECpriLink::ECpriLink_5",
        6: "ECpriLink::ECpriLink_6",
        7: "ECpriLink::ECpriLink_7",
        8: "ECpriLink::ECpriLink_8",
        9: "ECpriLink::ECpriLink_9",
    },
    cpriIqSampleFormat_t: {
        7: "cpriIqSampleFormat::iqSampleFormat_7",
        8: "cpriIqSampleFormat::iqSampleFormat_8",
        9: "cpriIqSampleFormat::iqSampleFormat_9",
        12: "cpriIqSampleFormat::iqSampleFormat_12",
        15: "cpriIqSampleFormat::iqSampleFormat_15",
        16: "cpriIqSampleFormat::iqSampleFormat_16",
    },
    direction_t: {
        0: "direction::Downlink",
        1: "direction::Uplink",
    },
    cpriAxcContainerStatus_t: {
        0: "cpriAxcContainerStatus::OK",
        1: "cpriAxcContainerStatus::NOK",
    },
    ECellMap: {
        0: "ECellMap::ECellMap_0",
        1: "ECellMap::ECellMap_1",
        2: "ECellMap::ECellMap_2",
        3: "ECellMap::ECellMap_3",
        4: "ECellMap::ECellMap_4",
        5: "ECellMap::ECellMap_5",
        6: "ECellMap::ECellMap_6",
        7: "ECellMap::ECellMap_7",
        8: "ECellMap::ECellMap_8",
        9: "ECellMap::ECellMap_9",
        10: "ECellMap::ECellMap_10",
        11: "ECellMap::ECellMap_11",
        12: "ECellMap::ECellMap_12",
        13: "ECellMap::ECellMap_13",
        14: "ECellMap::ECellMap_14",
        32: "ECellMap::ECellMap_32",
        33: "ECellMap::ECellMap_33",
        40: "ECellMap::ECellMap_40",
        41: "ECellMap::ECellMap_41",
    },
    EExecutionState: {
        0: "EExecutionState::EExecutionState_NoError",
        1: "EExecutionState::EExecutionState_InvalidParam",
        2: "EExecutionState::EExecutionState_UndefinedError",
    },
    EOutputState: {
        0: "EOutputState::EOutputState_Enabled",
        1: "EOutputState::EOutputState_Disabled",
    },
    EOamCpriLinkState: {
        0: "EOamCpriLinkState::EOamCpriLinkState_A",
        1: "EOamCpriLinkState::EOamCpriLinkState_B",
        2: "EOamCpriLinkState::EOamCpriLinkState_C",
        3: "EOamCpriLinkState::EOamCpriLinkState_D",
        4: "EOamCpriLinkState::EOamCpriLinkState_E",
        5: "EOamCpriLinkState::EOamCpriLinkState_F",
        6: "EOamCpriLinkState::EOamCpriLinkState_G",
    },
    EState: {
        0: "EState::EState_Enabled",
        1: "EState::EState_Disabled",
    },
    ECellMap: {
        0: "ECellMap::ECellMap_0",
        1: "ECellMap::ECellMap_1",
        2: "ECellMap::ECellMap_2",
        3: "ECellMap::ECellMap_3",
        4: "ECellMap::ECellMap_4",
        5: "ECellMap::ECellMap_5",
        6: "ECellMap::ECellMap_6",
        7: "ECellMap::ECellMap_7",
        8: "ECellMap::ECellMap_8",
        9: "ECellMap::ECellMap_9",
        10: "ECellMap::ECellMap_10",
        11: "ECellMap::ECellMap_11",
        12: "ECellMap::ECellMap_12",
        13: "ECellMap::ECellMap_13",
        14: "ECellMap::ECellMap_14",
        32: "ECellMap::ECellMap_32",
        33: "ECellMap::ECellMap_33",
        40: "ECellMap::ECellMap_40",
        41: "ECellMap::ECellMap_41",
    },
    ECpriLink: {
        0: "ECpriLink::ECpriLink_0",
        1: "ECpriLink::ECpriLink_1",
        2: "ECpriLink::ECpriLink_2",
        3: "ECpriLink::ECpriLink_3",
        4: "ECpriLink::ECpriLink_4",
        5: "ECpriLink::ECpriLink_5",
        6: "ECpriLink::ECpriLink_6",
        7: "ECpriLink::ECpriLink_7",
        8: "ECpriLink::ECpriLink_8",
        9: "ECpriLink::ECpriLink_9",
    },
    direction_t: {
        0: "direction::Downlink",
        1: "direction::Uplink",
    },
    EExecutionState: {
        0: "EExecutionState::EExecutionState_NoError",
        1: "EExecutionState::EExecutionState_InvalidParam",
        2: "EExecutionState::EExecutionState_UndefinedError",
    },
    EOamCpriLinkState: {
        0: "EOamCpriLinkState::EOamCpriLinkState_A",
        1: "EOamCpriLinkState::EOamCpriLinkState_B",
        2: "EOamCpriLinkState::EOamCpriLinkState_C",
        3: "EOamCpriLinkState::EOamCpriLinkState_D",
        4: "EOamCpriLinkState::EOamCpriLinkState_E",
        5: "EOamCpriLinkState::EOamCpriLinkState_F",
        6: "EOamCpriLinkState::EOamCpriLinkState_G",
    },
    EOutputState: {
        0: "EOutputState::EOutputState_Enabled",
        1: "EOutputState::EOutputState_Disabled",
    },
    EState: {
        0: "EState::EState_Enabled",
        1: "EState::EState_Disabled",
    },
    cpriIqSampleFormat_t: {
        7: "cpriIqSampleFormat::iqSampleFormat_7",
        8: "cpriIqSampleFormat::iqSampleFormat_8",
        9: "cpriIqSampleFormat::iqSampleFormat_9",
        12: "cpriIqSampleFormat::iqSampleFormat_12",
        15: "cpriIqSampleFormat::iqSampleFormat_15",
        16: "cpriIqSampleFormat::iqSampleFormat_16",
    },
    cpriAxcContainerStatus_t: {
        0: "cpriAxcContainerStatus::OK",
        1: "cpriAxcContainerStatus::NOK",
    },
    domain_t: {
        0: "domain::UL",
        1: "domain::DL",
        2: "domain::SRS",
    },
    duplexMode_t: {
        0: "duplexMode::FDD",
        1: "duplexMode::TDD",
    },
    frequencyRange_t: {
        0: "frequencyRange::FR1",
        1: "frequencyRange::FR2",
        2: "frequencyRange::FR1_NB",
        3: "frequencyRange::FR1_WB",
    },
    fronthaulMode_t: {
        0: "fronthaulMode::CPRI",
        1: "fronthaulMode::eCPRI",
        2: "fronthaulMode::eCPRI_DCM_ORAN",
        3: "fronthaulMode::OBSAI",
    },
    ratMode_t: {
        0: "ratMode::LTE",
        1: "ratMode::NR",
    },
    status_t: {
        0: "status::Ok",
        1: "status::Error",
        2: "status::IllegalParameter",
        3: "status::ResetNeeded",
    },
    ratMode_t: {
        0: "ratMode::LTE",
        1: "ratMode::NR",
    },
    status_t: {
        0: "status::Ok",
        1: "status::Error",
        2: "status::IllegalParameter",
        3: "status::ResetNeeded",
    },
    operationType_t: {
        0: "operationType::load",
        1: "operationType::cleanup",
    },
    status_t: {
        0: "status::OK",
        1: "status::NOK",
    },
    status_t: {
        0: "status::OK",
        1: "status::NOK",
    },
};
