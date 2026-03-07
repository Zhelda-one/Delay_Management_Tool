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
    result.pucchResources = _decodeArray(offset + 8, UlDataUe_decodepucchSendReqPucchResource_t, 28);

    return result;
}
function UlDataUe_encodePucchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    _encodeArray(msg.pucchResources, buf, off + 8, UlDataUe_encodepucchSendReqPucchResource_t, 28);
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
    result.initialCyclicShift = l2l1_getU8(offset + 9);
    result.numOfLayers = l2l1_getU8(offset + 10);
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "numOfPucchTxAntennaPorts_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 12);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 14);
    result.uciBits = [];
    for (let i = 0; i < 7; i++)
        result.uciBits.push(l2l1_getU8(offset + 15 + i * 1));
    result.srBit = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "bitValue_t",
    });
    result.pucchTransmitPower = l2l1_getI16(offset + 24);
    result.ulTransmitterTimingDelay = l2l1_getU16(offset + 26);

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
    l2l1_putU8(msg.initialCyclicShift, buf, off + 9);
    l2l1_putU8(msg.numOfLayers, buf, off + 10);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 11);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 12);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 14);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciBits[i], buf, off + 15 + i * 1);
    l2l1_putU8(msg.srBit, buf, off + 22);
    l2l1_putI16(msg.pucchTransmitPower, buf, off + 24);
    l2l1_putU16(msg.ulTransmitterTimingDelay, buf, off + 26);
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
    for (let i = 0; i < 4; i++)
        result.uciCsiPart1Bits.push(l2l1_getU8(offset + 71 + i * 1));
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 75);
    result.uciCsiPart2Bits = [];
    for (let i = 0; i < 2; i++)
        result.uciCsiPart2Bits.push(l2l1_getU8(offset + 76 + i * 1));
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 78);
    result.numOfUciCsiPart2Symbols = l2l1_getU16(offset + 80);

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
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.uciCsiPart1Bits[i], buf, off + 71 + i * 1);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 75);
    for (let i = 0; i < 2; i++)
        l2l1_putU8(msg.uciCsiPart2Bits[i], buf, off + 76 + i * 1);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 78);
    l2l1_putU16(msg.numOfUciCsiPart2Symbols, buf, off + 80);
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

function UlData_decodePrachReceiveInd_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodeprachReceiveIndSubcell_t, 16);

    return result;
}
function UlData_encodePrachReceiveInd_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodeprachReceiveIndSubcell_t, 16);
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
    result.subcells = _decodeArray(offset + 4, UlData_decodeprachReceiveReqSubcell_t, 20);

    return result;
}
function UlData_encodePrachReceiveReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodeprachReceiveReqSubcell_t, 20);
}

function UlData_decodeprachReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.prachPrbOffset = l2l1_getU16(offset + 2);
    result.prachOccasions = [];
    for (let i = 0; i < 8; i++)
        result.prachOccasions.push(l2l1_getU16(offset + 4 + i * 2));

    return result;
}
function UlData_encodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 2);
    for (let i = 0; i < 8; i++)
        l2l1_putU16(msg.prachOccasions[i], buf, off + 4 + i * 2);
}

function UlData_decodepucchReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = _decodeArray(offset + 4, UlData_decodepucchReceiveReqPucchResource_t, 28);

    return result;
}
function UlData_encodepucchReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pucchResources, buf, off + 4, UlData_encodepucchReceiveReqPucchResource_t, 28);
}

function UlData_decodepucchReceiveReqPucchResource_t(offset) {
    const result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.selfContainedFlag = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "selfContainedFlag",
    });
    result.pucchFormat = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 8);
    result.numOfPrb = l2l1_getU8(offset + 10);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 12);
    result.dataScramblingInt = l2l1_getU16(offset + 14);
    result.srBitDetection = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_srBitDetection", {
        enumerable: false,
        writable: false,
        value: "srBitDetection_t",
    });
    result.nANPucch = l2l1_getU8(offset + 17);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 18);
    result.numOfSymbols = l2l1_getU8(offset + 19);
    result.firstSymbol = l2l1_getU8(offset + 20);
    result.frequencyHopping = l2l1_getU8(offset + 21);
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 22);
    result.initialCyclicShift = l2l1_getU8(offset + 24);
    result.additionalDmrs = l2l1_getU8(offset + 25);
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 26);

    return result;
}
function UlData_encodepucchReceiveReqPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.selfContainedFlag, buf, off + 2);
    l2l1_putU8(msg.pucchFormat, buf, off + 3);
    l2l1_putU8(msg.numOfLayers, buf, off + 4);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 5);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.startPrb, buf, off + 8);
    l2l1_putU8(msg.numOfPrb, buf, off + 10);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 12);
    l2l1_putU16(msg.dataScramblingInt, buf, off + 14);
    l2l1_putU8(msg.srBitDetection, buf, off + 16);
    l2l1_putU8(msg.nANPucch, buf, off + 17);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 18);
    l2l1_putU8(msg.numOfSymbols, buf, off + 19);
    l2l1_putU8(msg.firstSymbol, buf, off + 20);
    l2l1_putU8(msg.frequencyHopping, buf, off + 21);
    l2l1_putU16(msg.secondHopPrb, buf, off + 22);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 24);
    l2l1_putU8(msg.additionalDmrs, buf, off + 25);
    l2l1_putU8(msg.timeDomainOcc, buf, off + 26);
}

function UlData_decodePucchReceiveReq_t(offset) {
    const result = {};

    result.addrPucchReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPucchReceiveRespHarqD = l2l1_getU32(offset + 4);
    result.sfn = l2l1_getU16(offset + 8);
    result.slot = l2l1_getU8(offset + 10);
    result.subcells = _decodeArray(offset + 12, UlData_decodepucchReceiveReqSubcell_t, 10);

    return result;
}
function UlData_encodePucchReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPucchReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPucchReceiveRespHarqD, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 8);
    l2l1_putU8(msg.slot, buf, off + 10);
    _encodeArray(msg.subcells, buf, off + 12, UlData_encodepucchReceiveReqSubcell_t, 10);
}

function UlData_decodepucchReceiveRespHarqDSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = _decodeArray(offset + 4, UlData_decodepucchReceiveRespHarqDPucchResource_t, 18);

    return result;
}
function UlData_encodepucchReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pucchResources, buf, off + 4, UlData_encodepucchReceiveRespHarqDPucchResource_t, 18);
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
}

function UlData_decodePucchReceiveRespHarqD_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodepucchReceiveRespHarqDSubcell_t, 10);

    return result;
}
function UlData_encodePucchReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodepucchReceiveRespHarqDSubcell_t, 10);
}

function UlData_decodepucchReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = _decodeArray(offset + 4, UlData_decodepucchReceiveRespPsPucchResource_t, 48);

    return result;
}
function UlData_encodepucchReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.pucchResources, buf, off + 4, UlData_encodepucchReceiveRespPsPucchResource_t, 48);
}

function UlData_decodepucchReceiveRespPsPucchResource_t(offset) {
    const result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.dtx = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 8);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 12);
    result.rxPower = l2l1_getF32(offset + 16);
    result.sinr = [];
    for (let i = 0; i < 2; i++)
        result.sinr.push(l2l1_getF32(offset + 20 + i * 4));
    result.uciBits = [];
    for (let i = 0; i < 7; i++)
        result.uciBits.push(l2l1_getU8(offset + 28 + i * 1));
    result.srBit = l2l1_getU8(offset + 35);
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 36);
    result.rssi = l2l1_getF32(offset + 40);
    result.dtxMetric = l2l1_getU16(offset + 44);
    result.dtxThreshold = l2l1_getU16(offset + 46);

    return result;
}
function UlData_encodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 4);
    l2l1_putU8(msg.pucchFormat, buf, off + 5);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 8);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 12);
    l2l1_putF32(msg.rxPower, buf, off + 16);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.sinr[i], buf, off + 20 + i * 4);
    for (let i = 0; i < 7; i++)
        l2l1_putU8(msg.uciBits[i], buf, off + 28 + i * 1);
    l2l1_putU8(msg.srBit, buf, off + 35);
    l2l1_putF32(msg.noisePower, buf, off + 36);
    l2l1_putF32(msg.rssi, buf, off + 40);
    l2l1_putU16(msg.dtxMetric, buf, off + 44);
    l2l1_putU16(msg.dtxThreshold, buf, off + 46);
}

function UlData_decodePucchReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodepucchReceiveRespPsSubcell_t, 12);

    return result;
}
function UlData_encodePucchReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodepucchReceiveRespPsSubcell_t, 12);
}

function UlData_decodepuschReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = _decodeArray(offset + 4, UlData_decodepuschReceiveReqGrant_t, 72);

    return result;
}
function UlData_encodepuschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, UlData_encodepuschReceiveReqGrant_t, 72);
}

function UlData_decodepuschReceiveReqGrant_t(offset) {
    const result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.selfContainedFlag = l2l1_getU8(offset + 6);
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "selfContainedFlag",
    });
    result.ulDmrsConfigType = l2l1_getU8(offset + 7);
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 8);
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 9);
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 10);
    result.ulDmrsTypeAPos = l2l1_getU8(offset + 11);
    result.startSymbol = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 13);
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
    result.harqProcessIndex = l2l1_getU8(offset + 33);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 34);
    result.freshHarqTrans = l2l1_getU8(offset + 36);
    result.numOfUciCsiPart1Bits = l2l1_getU8(offset + 37);
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 38);
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 40);
    result.numOfUciCsiPart2Symbols = l2l1_getU16(offset + 42);
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
    result.puschTransCoherence = l2l1_getU8(offset + 70);
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "puschTransCoherence_t",
    });

    return result;
}
function UlData_encodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.selfContainedFlag, buf, off + 6);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 7);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 8);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 9);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 10);
    l2l1_putU8(msg.ulDmrsTypeAPos, buf, off + 11);
    l2l1_putU8(msg.startSymbol, buf, off + 12);
    l2l1_putU8(msg.numOfPuschSymbols, buf, off + 13);
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
    l2l1_putU8(msg.harqProcessIndex, buf, off + 33);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 34);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 36);
    l2l1_putU8(msg.numOfUciCsiPart1Bits, buf, off + 37);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 38);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 40);
    l2l1_putU16(msg.numOfUciCsiPart2Symbols, buf, off + 42);
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
    l2l1_putU8(msg.puschTransCoherence, buf, off + 70);
}

function UlData_decodePuschReceiveReq_t(offset) {
    const result = {};

    result.addrPuschReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPuschReceiveRespLo = l2l1_getU32(offset + 4);
    result.addrPuschReceiveRespHarqU = l2l1_getU32(offset + 8);
    result.sfn = l2l1_getU16(offset + 12);
    result.slot = l2l1_getU8(offset + 14);
    result.subcells = _decodeArray(offset + 16, UlData_decodepuschReceiveReqSubcell_t, 12);

    return result;
}
function UlData_encodePuschReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPuschReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPuschReceiveRespLo, buf, off + 4);
    l2l1_putU32(msg.addrPuschReceiveRespHarqU, buf, off + 8);
    l2l1_putU16(msg.sfn, buf, off + 12);
    l2l1_putU8(msg.slot, buf, off + 14);
    _encodeArray(msg.subcells, buf, off + 16, UlData_encodepuschReceiveReqSubcell_t, 12);
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
    result.subcells = _decodeArray(offset + 4, UlData_decodepuschReceiveRespHarqUSubcell_t, 10);

    return result;
}
function UlData_encodePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodepuschReceiveRespHarqUSubcell_t, 10);
}

function UlData_decodePuschReceiveRespLo_t(offset) {
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
function UlData_encodePuschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 8);
    _encodeArray(msg.data, buf, off + 12, l2l1_putU8, 1);
}

function UlData_decodepuschReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.grants = _decodeArray(offset + 8, UlData_decodeUePuschReceiveRespPs_t, 76);

    return result;
}
function UlData_encodepuschReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    _encodeArray(msg.grants, buf, off + 8, UlData_encodeUePuschReceiveRespPs_t, 76);
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
    for (let i = 0; i < 4; i++)
        result.uciCsiPart1Bits.push(l2l1_getU8(offset + 66 + i * 1));
    result.uciCsiPart2Bits = [];
    for (let i = 0; i < 2; i++)
        result.uciCsiPart2Bits.push(l2l1_getU8(offset + 70 + i * 1));

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
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.uciCsiPart1Bits[i], buf, off + 69 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU8(msg.uciCsiPart2Bits[i], buf, off + 73 + i * 1);
}

function UlData_decodePuschReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodepuschReceiveRespPsSubcell_t, 16);

    return result;
}
function UlData_encodePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodepuschReceiveRespPsSubcell_t, 16);
}

function UlData_decodeSrsReceiveReq_t(offset) {
    const result = {};

    result.addrSrsReceiveResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = _decodeArray(offset + 8, UlData_decodesrsReceiveReqSubcell_t, 18);

    return result;
}
function UlData_encodeSrsReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrSrsReceiveResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    _encodeArray(msg.subcells, buf, off + 8, UlData_encodesrsReceiveReqSubcell_t, 18);
}

function UlData_decodesrsReceiveReqSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 4);
    result.transmissionComb = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 6);
    result.srsBandwidth = l2l1_getU8(offset + 7);
    result.srsBandwidthConfig = l2l1_getU8(offset + 8);
    result.freqDomainPosition = l2l1_getU8(offset + 9);
    result.freqDomainShift = l2l1_getU16(offset + 10);
    result.sequenceId = l2l1_getU16(offset + 12);
    result.cyclicShift = l2l1_getU8(offset + 14);
    result.numOfSrsPorts = l2l1_getU8(offset + 15);
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "numOfSrsTxAntennaPorts_t",
    });
    result.puschTransCoherence = l2l1_getU8(offset + 16);
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "puschTransCoherence_t",
    });

    return result;
}
function UlData_encodesrsReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.symbolPosition, buf, off + 4);
    l2l1_putU8(msg.transmissionComb, buf, off + 5);
    l2l1_putU8(msg.transmissionCombId, buf, off + 6);
    l2l1_putU8(msg.srsBandwidth, buf, off + 7);
    l2l1_putU8(msg.srsBandwidthConfig, buf, off + 8);
    l2l1_putU8(msg.freqDomainPosition, buf, off + 9);
    l2l1_putU16(msg.freqDomainShift, buf, off + 10);
    l2l1_putU16(msg.sequenceId, buf, off + 12);
    l2l1_putU8(msg.cyclicShift, buf, off + 14);
    l2l1_putU8(msg.numOfSrsPorts, buf, off + 15);
    l2l1_putU8(msg.puschTransCoherence, buf, off + 16);
}

function UlData_decodeSrsReceiveRespPs_t(offset) {
    const result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = _decodeArray(offset + 4, UlData_decodesrsReceiveRespPsSubcell_t, 36);

    return result;
}
function UlData_encodeSrsReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    _encodeArray(msg.subcells, buf, off + 4, UlData_encodesrsReceiveRespPsSubcell_t, 36);
}

function UlData_decodesrsReceiveRespPsSubcell_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.ulRank = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 8);
    result.ulPmiRank2 = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = [];
    for (let i = 0; i < 2; i++)
        result.ulPmiRank2Sinr.push(l2l1_getF32(offset + 16 + i * 4));
    result.snr = l2l1_getF32(offset + 24);
    result.dtx = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 30);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 32);

    return result;
}
function UlData_encodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.ulRank, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 5);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 8);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 12);
    for (let i = 0; i < 2; i++)
        l2l1_putF32(msg.ulPmiRank2Sinr[i], buf, off + 16 + i * 4);
    l2l1_putF32(msg.snr, buf, off + 24);
    l2l1_putU8(msg.dtx, buf, off + 28);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 30);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 32);
}

function UlData_decodeSyncInd_t(offset) {
    const result = {};

    result.delay_nSec = l2l1_getI32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.subcellId = l2l1_getU8(offset + 6);
    result.slot = l2l1_getU8(offset + 7);

    return result;
}
function UlData_encodeSyncInd_t(msg, buf, off) {
    l2l1_putI32(msg.delay_nSec, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 7);
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
    result.dtxThresholdPrachSingleRx = l2l1_getU16(offset + 14);
    result.dtxThresholdPrachTwoRx = l2l1_getU16(offset + 16);
    result.prachCohCombLen = l2l1_getU8(offset + 18);
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 19);
    result.rxScalingFactor = l2l1_getI16(offset + 20);
    result.pneRbThreshold = [];
    for (let i = 0; i < 29; i++)
        result.pneRbThreshold.push(l2l1_getU16(offset + 22 + i * 2));
    result.dtxThresholdPuschSingleLayerList = [];
    for (let i = 0; i < 273; i++)
        result.dtxThresholdPuschSingleLayerList.push(l2l1_getU16(offset + 80 + i * 2));
    result.dtxThresholdPuschTwoLayerList = [];
    for (let i = 0; i < 273; i++)
        result.dtxThresholdPuschTwoLayerList.push(l2l1_getU16(offset + 626 + i * 2));
    result.dtxThresholdPucchFormat0 = [];
    for (let i = 0; i < 12; i++)
        result.dtxThresholdPucchFormat0.push(l2l1_getU8(offset + 1172 + i * 1));
    result.dtxThresholdPucchSingleLayerList = [];
    for (let i = 0; i < 22; i++)
        result.dtxThresholdPucchSingleLayerList.push(l2l1_getU16(offset + 1184 + i * 2));
    result.dtxThresholdPucchTwoLayerList = [];
    for (let i = 0; i < 22; i++)
        result.dtxThresholdPucchTwoLayerList.push(l2l1_getU16(offset + 1228 + i * 2));
    result.dtxThresholdSrsTwoAntennaPorts = l2l1_getU16(offset + 1272);
    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 1274 + i * 2));
    result.ulSubcellPosition = l2l1_getU8(offset + 1498);
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 1499);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 1500);
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCId = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCId.push(l2l1_getU16(offset + 1502 + i * 2));
    result.digitalOutputEnabled = l2l1_getU8(offset + 1509);
    result.digitalOutputType = l2l1_getU8(offset + 1510);
    Object.defineProperty(result, "__enum_digitalOutputType", {
        enumerable: false,
        writable: false,
        value: "digitalOutputType_t",
    });
    result.digitalOutputRate = l2l1_getU8(offset + 1511);
    Object.defineProperty(result, "__enum_digitalOutputRate", {
        enumerable: false,
        writable: false,
        value: "digitalOutputRate_t",
    });
    result.bbSelector = l2l1_getU8(offset + 1512);

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
    l2l1_putU16(msg.dtxThresholdPrachSingleRx, buf, off + 14);
    l2l1_putU16(msg.dtxThresholdPrachTwoRx, buf, off + 16);
    l2l1_putU8(msg.prachCohCombLen, buf, off + 18);
    l2l1_putU8(msg.totalNumberOfRAPreambles, buf, off + 19);
    l2l1_putI16(msg.rxScalingFactor, buf, off + 20);
    for (let i = 0; i < 29; i++)
        l2l1_putU16(msg.pneRbThreshold[i], buf, off + 22 + i * 2);
    for (let i = 0; i < 273; i++)
        l2l1_putU16(msg.dtxThresholdPuschSingleLayerList[i], buf, off + 80 + i * 2);
    for (let i = 0; i < 273; i++)
        l2l1_putU16(msg.dtxThresholdPuschTwoLayerList[i], buf, off + 626 + i * 2);
    for (let i = 0; i < 12; i++)
        l2l1_putU8(msg.dtxThresholdPucchFormat0[i], buf, off + 1172 + i * 1);
    for (let i = 0; i < 22; i++)
        l2l1_putU16(msg.dtxThresholdPucchSingleLayerList[i], buf, off + 1184 + i * 2);
    for (let i = 0; i < 22; i++)
        l2l1_putU16(msg.dtxThresholdPucchTwoLayerList[i], buf, off + 1228 + i * 2);
    l2l1_putU16(msg.dtxThresholdSrsTwoAntennaPorts, buf, off + 1272);
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 1274 + i * 2);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 1498);
    l2l1_putU8(msg.eCpriLink, buf, off + 1499);
    l2l1_putU8(msg.numCeAxCId, buf, off + 1500);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.ceAxCId[i], buf, off + 1502 + i * 2);
    l2l1_putU8(msg.digitalOutputEnabled, buf, off + 1510);
    l2l1_putU8(msg.digitalOutputType, buf, off + 1511);
    l2l1_putU8(msg.digitalOutputRate, buf, off + 1512);
    l2l1_putU8(msg.bbSelector, buf, off + 1513);
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

function lunum_common_decodeeAxcStream_t(offset) {
    const result = {};

    result.eAxcId = l2l1_getU16(offset + 0);
    result.bipId = l2l1_getU16(offset + 2);
    result.phyChannelType = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_phyChannelType", {
        enumerable: false,
        writable: false,
        value: "PhyChannelType__t",
    });
    result.inPortId = l2l1_getU16(offset + 6);
    result.egPortId = l2l1_getU16(offset + 8);

    return result;
}
function lunum_common_encodeeAxcStream_t(msg, buf, off) {
    l2l1_putU16(msg.eAxcId, buf, off + 0);
    l2l1_putU16(msg.bipId, buf, off + 2);
    l2l1_putU8(msg.phyChannelType, buf, off + 4);
    l2l1_putU16(msg.inPortId, buf, off + 6);
    l2l1_putU16(msg.egPortId, buf, off + 8);
}

function lunum_common_decodeeAxcStreamDelayMeasurement_t(offset) {
    const result = {};

    result.eAxcId = l2l1_getU16(offset + 0);
    result.bipId = l2l1_getU16(offset + 2);
    result.tdOneWayMin = l2l1_getU32(offset + 4);
    result.tdOneWayMax = l2l1_getU32(offset + 8);
    result.fcpEventQueueId = l2l1_getU32(offset + 12);

    return result;
}
function lunum_common_encodeeAxcStreamDelayMeasurement_t(msg, buf, off) {
    l2l1_putU16(msg.eAxcId, buf, off + 0);
    l2l1_putU16(msg.bipId, buf, off + 2);
    l2l1_putU32(msg.tdOneWayMin, buf, off + 4);
    l2l1_putU32(msg.tdOneWayMax, buf, off + 8);
    l2l1_putU32(msg.fcpEventQueueId, buf, off + 12);
}

function lunum_common_decoderawSrsPattern_t(offset) {
    const result = {};

    result.subFrameId = l2l1_getU8(offset + 0);
    result.slotId = l2l1_getU8(offset + 1);
    result.startSymbolId = l2l1_getU8(offset + 2);
    result.numSymbol = l2l1_getU16(offset + 4);
    result.startPrbc = l2l1_getU16(offset + 6);
    result.numPrbc = l2l1_getU8(offset + 8);

    return result;
}
function lunum_common_encoderawSrsPattern_t(msg, buf, off) {
    l2l1_putU8(msg.subFrameId, buf, off + 0);
    l2l1_putU8(msg.slotId, buf, off + 1);
    l2l1_putU8(msg.startSymbolId, buf, off + 2);
    l2l1_putU16(msg.numSymbol, buf, off + 4);
    l2l1_putU16(msg.startPrbc, buf, off + 6);
    l2l1_putU8(msg.numPrbc, buf, off + 8);
}

function LteLunum_DlUlCell_decodeDeleteReq_t(offset) {
    const result = {};

    result.physCellId = l2l1_getU16(offset + 0);

    return result;
}
function LteLunum_DlUlCell_encodeDeleteReq_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
}

function LteLunum_DlUlCell_decodeDeleteResp_t(offset) {
    const result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.status = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "cellDeleteStatus_t",
    });

    return result;
}
function LteLunum_DlUlCell_encodeDeleteResp_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 2);
}

function LteLunum_DlUlCell_decodeSetupReq_t(offset) {
    const result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.dlBandwidth = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_dlBandwidth", {
        enumerable: false,
        writable: false,
        value: "Bandwidth",
    });
    result.ulBandwidth = l2l1_getU8(offset + 3);
    Object.defineProperty(result, "__enum_ulBandwidth", {
        enumerable: false,
        writable: false,
        value: "Bandwidth",
    });
    result.dynamicScalingEnabled = l2l1_getU8(offset + 4);
    result.eAxcStreams = _decodeArray(offset + 8, lunum_common_decodeeAxcStream_t, 10);
    result.rawSrsPatterns = _decodeArray(offset + 16, lunum_common_decoderawSrsPattern_t, 10);

    return result;
}
function LteLunum_DlUlCell_encodeSetupReq_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.dlBandwidth, buf, off + 2);
    l2l1_putU8(msg.ulBandwidth, buf, off + 3);
    l2l1_putU8(msg.dynamicScalingEnabled, buf, off + 4);
    _encodeArray(msg.eAxcStreams, buf, off + 8, lunum_common_encodeeAxcStream_t, 10);
    _encodeArray(msg.rawSrsPatterns, buf, off + 16, lunum_common_encoderawSrsPattern_t, 10);
}

function LteLunum_DlUlCell_decodeSetupResp_t(offset) {
    const result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.eAxcStreamsDelayMeasurements = _decodeArray(offset + 4, lunum_common_decodeeAxcStreamDelayMeasurement_t, 16);

    return result;
}
function LteLunum_DlUlCell_encodeSetupResp_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    _encodeArray(msg.eAxcStreamsDelayMeasurements, buf, off + 4, lunum_common_encodeeAxcStreamDelayMeasurement_t, 16);
}

function LteLunum_DlData_decodedlUlChannelsReq_t(offset) {
    const result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.eNbId = l2l1_getU32(offset + 4);
    result.eAxcId = l2l1_getU16(offset + 8);
    result.commonHeader = LteLunum_DlData_decodedlUlCommonHeader_t(offset + 10);
    result.sections = _decodeArray(offset + 20, LteLunum_DlData_decodedlUlSection_t, 32);

    return result;
}
function LteLunum_DlData_encodedlUlChannelsReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.eNbId, buf, off + 4);
    l2l1_putU16(msg.eAxcId, buf, off + 8);
    LteLunum_DlData_encodedlUlCommonHeader_t(msg.commonHeader, buf, off + 10);
    _encodeArray(msg.sections, buf, off + 20, LteLunum_DlData_encodedlUlSection_t, 32);
}

function LteLunum_DlData_decodedlUlCommonHeader_t(offset) {
    const result = {};

    result.dataDirection = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_dataDirection", {
        enumerable: false,
        writable: false,
        value: "DataDirection",
    });
    result.filterIndex = l2l1_getU8(offset + 1);
    Object.defineProperty(result, "__enum_filterIndex", {
        enumerable: false,
        writable: false,
        value: "FilterIndex",
    });
    result.frameId = l2l1_getU8(offset + 2);
    result.subFrameId = l2l1_getU8(offset + 3);
    result.slotId = l2l1_getU8(offset + 4);
    result.startSymbolId = l2l1_getU8(offset + 5);
    result.numberOfSections = l2l1_getU8(offset + 6);

    return result;
}
function LteLunum_DlData_encodedlUlCommonHeader_t(msg, buf, off) {
    l2l1_putU8(msg.dataDirection, buf, off + 0);
    l2l1_putU8(msg.filterIndex, buf, off + 1);
    l2l1_putU8(msg.frameId, buf, off + 2);
    l2l1_putU8(msg.subFrameId, buf, off + 3);
    l2l1_putU8(msg.slotId, buf, off + 4);
    l2l1_putU8(msg.startSymbolId, buf, off + 5);
    l2l1_putU8(msg.numberOfSections, buf, off + 6);
}

function LteLunum_DlData_decodedlUlSection_t(offset) {
    const result = {};

    result.sectionId = l2l1_getU16(offset + 0);
    result.rb = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_rb", {
        enumerable: false,
        writable: false,
        value: "RbIndicator",
    });
    result.symInc = l2l1_getU8(offset + 3);
    result.startPrbc = l2l1_getU16(offset + 4);
    result.numPrbc = l2l1_getU8(offset + 6);
    result.numSymbol = l2l1_getU16(offset + 8);
    result.reMask = l2l1_getU16(offset + 10);
    result.beamId = l2l1_getU16(offset + 12);
    result.bfwSectionExtensions = _decodeArray(offset + 16, LteLunum_DlData_decodebeamformingWeights_t, 10);
    result.nonContPrbAllocSectionExtensions = _decodeArray(offset + 24, LteLunum_DlData_decodenonContiguousPrbAllocation_t, 12);

    return result;
}
function LteLunum_DlData_encodedlUlSection_t(msg, buf, off) {
    l2l1_putU16(msg.sectionId, buf, off + 0);
    l2l1_putU8(msg.rb, buf, off + 2);
    l2l1_putU8(msg.symInc, buf, off + 3);
    l2l1_putU16(msg.startPrbc, buf, off + 4);
    l2l1_putU8(msg.numPrbc, buf, off + 6);
    l2l1_putU16(msg.numSymbol, buf, off + 8);
    l2l1_putU16(msg.reMask, buf, off + 10);
    l2l1_putU16(msg.beamId, buf, off + 12);
    _encodeArray(msg.bfwSectionExtensions, buf, off + 16, LteLunum_DlData_encodebeamformingWeights_t, 10);
    _encodeArray(msg.nonContPrbAllocSectionExtensions, buf, off + 24, LteLunum_DlData_encodenonContiguousPrbAllocation_t, 12);
}

function LteLunum_DlData_decodebfwWeight_t(offset) {
    const result = {};

    result.bfwI = l2l1_getU16(offset + 0);
    result.bfwQ = l2l1_getU16(offset + 2);

    return result;
}
function LteLunum_DlData_encodebfwWeight_t(msg, buf, off) {
    l2l1_putU16(msg.bfwI, buf, off + 0);
    l2l1_putU16(msg.bfwQ, buf, off + 2);
}

function LteLunum_DlData_decodebeamformingWeights_t(offset) {
    const result = {};

    result.bfwCompHdr = l2l1_getU8(offset + 0);
    result.bfwCompParam = l2l1_getU8(offset + 1);
    result.bfwWeights = _decodeArray(offset + 4, LteLunum_DlData_decodebfwWeight_t, 4);

    return result;
}
function LteLunum_DlData_encodebeamformingWeights_t(msg, buf, off) {
    l2l1_putU8(msg.bfwCompHdr, buf, off + 0);
    l2l1_putU8(msg.bfwCompParam, buf, off + 1);
    _encodeArray(msg.bfwWeights, buf, off + 4, LteLunum_DlData_encodebfwWeight_t, 4);
}

function LteLunum_DlData_decodenonContiguousPrbAllocation_t(offset) {
    const result = {};

    result.rbgMask = l2l1_getU32(offset + 0);
    result.rbgSize = l2l1_getU16(offset + 4);
    result.symbolMask = l2l1_getU16(offset + 6);
    result.priority = l2l1_getI8(offset + 8);

    return result;
}
function LteLunum_DlData_encodenonContiguousPrbAllocation_t(msg, buf, off) {
    l2l1_putU32(msg.rbgMask, buf, off + 0);
    l2l1_putU16(msg.rbgSize, buf, off + 4);
    l2l1_putU16(msg.symbolMask, buf, off + 6);
    l2l1_putI8(msg.priority, buf, off + 8);
}

function l1_common_decodeL1Addresses(offset) {
    const result = {};

    result.dl = l1_common_decodeL1DlAddresses(offset + 0);
    result.ul = l1_common_decodeL1UlAddresses(offset + 28);

    return result;
}
function l1_common_encodeL1Addresses(msg, buf, off) {
    l1_common_encodeL1DlAddresses(msg.dl, buf, off + 0);
    l1_common_encodeL1UlAddresses(msg.ul, buf, off + 28);
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
}

function l1_common_decodeL1UlAddresses(offset) {
    const result = {};

    result.puschReceiveReq = l2l1_getU32(offset + 0);
    result.pucchReceiveReq = l2l1_getU32(offset + 4);
    result.srsReceiveReq = l2l1_getU32(offset + 8);
    result.prachReceiveReq = l2l1_getU32(offset + 12);

    return result;
}
function l1_common_encodeL1UlAddresses(msg, buf, off) {
    l2l1_putU32(msg.puschReceiveReq, buf, off + 0);
    l2l1_putU32(msg.pucchReceiveReq, buf, off + 4);
    l2l1_putU32(msg.srsReceiveReq, buf, off + 8);
    l2l1_putU32(msg.prachReceiveReq, buf, off + 12);
}

function l1_common_decodeL2Addresses(offset) {
    const result = {};

    result.syncInd = l2l1_getU32(offset + 0);
    result.prachReceiveInd = l2l1_getU32(offset + 4);

    return result;
}
function l1_common_encodeL2Addresses(msg, buf, off) {
    l2l1_putU32(msg.syncInd, buf, off + 0);
    l2l1_putU32(msg.prachReceiveInd, buf, off + 4);
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

    result.numUlSubCellId = l2l1_getU8(offset + 0);
    result.ulSubcellId = [];
    const ulSubcellIdLength = l2l1_getU32(offset + 4);
    for (let i = 0; i < ulSubcellIdLength && i < 4; i++)
        result.ulSubcellId.push(l2l1_getU8(offset + 8 + i * 1));
    result.numDlSubCellId = l2l1_getU8(offset + 9);
    result.dlSubcellId = [];
    const dlSubcellIdLength = l2l1_getU32(offset + 12);
    for (let i = 0; i < dlSubcellIdLength && i < 4; i++)
        result.dlSubcellId.push(l2l1_getU8(offset + 16 + i * 1));
    result.AntSnapshotL1EventEnabled = l2l1_getU8(offset + 18);
    Object.defineProperty(result, "__enum_AntSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "EAntennaSnapshotL1EventEnableType",
    });

    return result;
}
function L1Log_encodeAntennaSnapshotConfigurationReq_t(msg, buf, off) {
    l2l1_putU8(msg.numUlSubCellId, buf, off + 0);
    l2l1_putU32(msg.ulSubcellId.length, buf, off + 4);
    for (let i = 0; i < msg.ulSubcellId.length && i < 4; i++)
        l2l1_putU8(msg.ulSubcellId[i], buf, off + 4 + i * 1);
    l2l1_putU8(msg.numDlSubCellId, buf, off + 8);
    l2l1_putU32(msg.dlSubcellId.length, buf, off + 12);
    for (let i = 0; i < msg.dlSubcellId.length && i < 4; i++)
        l2l1_putU8(msg.dlSubcellId[i], buf, off + 12 + i * 1);
    l2l1_putU8(msg.AntSnapshotL1EventEnabled, buf, off + 16);
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
    for (let i = 0; i < fileListLength && i < 2; i++)
        result.fileList.push(L1Log_decodeantennaSnapshotFile_t(offset + 16 + i * 92));

    return result;
}
function L1Log_encodeAntennaSnapshotInd_t(msg, buf, off) {
    l2l1_putU64(msg.bcnN, buf, off + 0);
    l2l1_putU8(msg.reportType, buf, off + 8);
    l2l1_putU8(msg.numberOfFiles, buf, off + 9);
    l2l1_putU32(msg.fileList.length, buf, off + 12);
    for (let i = 0; i < msg.fileList.length && i < 2; i++)
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

    result.physCellId = l2l1_getU16(offset + 0);
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 2);
    Object.defineProperty(result, "__enum_antSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "EAntSnapshotL1Enabled",
    });

    return result;
}
function L1Log_encodeShowTraceListReq_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 2);
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

    result.physCellId = l2l1_getU16(offset + 0);
    result.trswEQID = l2l1_getU16(offset + 2);
    result.startStopReport = l2l1_getU8(offset + 4);
    Object.defineProperty(result, "__enum_startStopReport", {
        enumerable: false,
        writable: false,
        value: "EReportType",
    });
    result.outputMode = l2l1_getU8(offset + 5);
    Object.defineProperty(result, "__enum_outputMode", {
        enumerable: false,
        writable: false,
        value: "EOutputMode",
    });

    return result;
}
function L1Log_encodeTraceReqHeader_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU16(msg.trswEQID, buf, off + 2);
    l2l1_putU8(msg.startStopReport, buf, off + 4);
    l2l1_putU8(msg.outputMode, buf, off + 5);
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
    const tracesLength = l2l1_getU32(offset + 8);
    for (let i = 0; i < tracesLength && i < 10; i++)
        result.traces.push(L1Log_decodeTraceReqEntry_t(offset + 12 + i * 6));

    return result;
}
function L1Log_encodeTraceReq_t(msg, buf, off) {
    L1Log_encodeTraceReqHeader_t(msg.header, buf, off + 0);
    l2l1_putU32(msg.traces.length, buf, off + 8);
    for (let i = 0; i < msg.traces.length && i < 10; i++)
        L1Log_encodeTraceReqEntry_t(msg.traces[i], buf, off + 8 + i * 6);
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
    for (let i = 0; i < MsgRcvCountersLength && i < 80; i++)
        result.MsgRcvCounters.push(L1ECpri_decodeSMsgRcvCountersItem(offset + 8 + i * 56));

    return result;
}
function L1ECpri_encodeMsgRcvCountersInd_t(msg, buf, off) {
    l2l1_putU32(msg.numOfItems, buf, off + 0);
    l2l1_putU32(msg.MsgRcvCounters.length, buf, off + 4);
    for (let i = 0; i < msg.MsgRcvCounters.length && i < 80; i++)
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

function L1Cpri_decodeConfigureLinksReq_t(offset) {
    const result = {};

    result.l1_StartupTimer = l2l1_getU32(offset + 0);
    result.numOfItems = l2l1_getU32(offset + 4);
    result.cpriLink = [];
    const cpriLinkLength = l2l1_getU32(offset + 8);
    for (let i = 0; i < cpriLinkLength && i < 16; i++)
        result.cpriLink.push(L1Cpri_decodeSCpriLinkItem(offset + 12 + i * 16));
    result.dlCpriLinkMapConfig = l2l1_getU8(offset + 268);
    Object.defineProperty(result, "__enum_dlCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "ECellMap",
    });
    result.ulCpriLinkMapConfig = l2l1_getU8(offset + 269);
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
        L1Cpri_encodeSCpriLinkItem(msg.cpriLink[i], buf, off + 8 + i * 16);
    l2l1_putU8(msg.dlCpriLinkMapConfig, buf, off + 264);
    l2l1_putU8(msg.ulCpriLinkMapConfig, buf, off + 265);
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

function L1Cpri_decodeDelayConfigReq_t(offset) {
    const result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "ECpriLink",
    });
    result.downlinkFixedDelay = l2l1_getU32(offset + 4);
    result.uplinkFixedDelay = l2l1_getU32(offset + 8);
    result.dlFiberLengthCompensationOffset = l2l1_getU32(offset + 12);
    result.ulFiberLengthCompensationOffset = l2l1_getU32(offset + 16);
    result.fiberDelay = l2l1_getU32(offset + 20);
    result.Nul = l2l1_getU16(offset + 24);
    result.ParameterMask = l2l1_getU16(offset + 26);
    result.nTaOffset = l2l1_getU16(offset + 28);

    return result;
}
function L1Cpri_encodeDelayConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.downlinkFixedDelay, buf, off + 4);
    l2l1_putU32(msg.uplinkFixedDelay, buf, off + 8);
    l2l1_putU32(msg.dlFiberLengthCompensationOffset, buf, off + 12);
    l2l1_putU32(msg.ulFiberLengthCompensationOffset, buf, off + 16);
    l2l1_putU32(msg.fiberDelay, buf, off + 20);
    l2l1_putU16(msg.Nul, buf, off + 24);
    l2l1_putU16(msg.ParameterMask, buf, off + 26);
    l2l1_putU16(msg.nTaOffset, buf, off + 28);
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
    result.Ndl = l2l1_getU16(offset + 2);
    result.uplinkOffset = l2l1_getI32(offset + 4);
    result.downlinkOffset = l2l1_getI32(offset + 8);
    result.cpriLoopbackDelay = l2l1_getU32(offset + 12);
    result.parameterMask = l2l1_getU16(offset + 16);
    result.LCVErrInWindow = l2l1_getU32(offset + 20);
    result.LCVErrAccumulated = l2l1_getU32(offset + 24);
    result.BERInWindow = l2l1_getF32(offset + 28);
    result.BERAccumulated = l2l1_getF32(offset + 32);

    return result;
}
function L1Cpri_encodeGetLinkParamResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU16(msg.Ndl, buf, off + 2);
    l2l1_putI32(msg.uplinkOffset, buf, off + 4);
    l2l1_putI32(msg.downlinkOffset, buf, off + 8);
    l2l1_putU32(msg.cpriLoopbackDelay, buf, off + 12);
    l2l1_putU16(msg.parameterMask, buf, off + 16);
    l2l1_putU32(msg.LCVErrInWindow, buf, off + 20);
    l2l1_putU32(msg.LCVErrAccumulated, buf, off + 24);
    l2l1_putF32(msg.BERInWindow, buf, off + 28);
    l2l1_putF32(msg.BERAccumulated, buf, off + 32);
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

    return result;
}
function L1Cpri_encodeSetLinkPropertiesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
    l2l1_putU32(msg.LCVWindow, buf, off + 4);
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

    return result;
}
function L1Cpri_encodeSCpriLinkItem(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.scramblingSeed, buf, off + 4);
    l2l1_putU32(msg.cpriPointerP, buf, off + 8);
    l2l1_putU32(msg.optLinkLength, buf, off + 12);
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
    result.grants = _decodeArray(offset + 4, DlDataUe_decodepdschReceiveReqGrant_t, 68);

    return result;
}
function DlDataUe_encodepdschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    _encodeArray(msg.grants, buf, off + 4, DlDataUe_encodepdschReceiveReqGrant_t, 68);
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
    result.mcs = l2l1_getU8(offset + 14);
    result.dlMcsTable = l2l1_getU8(offset + 15);
    Object.defineProperty(result, "__enum_dlMcsTable", {
        enumerable: false,
        writable: false,
        value: "mcsTable_t",
    });
    result.antPort = l2l1_getU16(offset + 16);
    result.spatialMode = l2l1_getU8(offset + 18);
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "SpatialMode",
    });
    result.nscId = l2l1_getU8(offset + 19);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 20);
    result.dlDmrsConfigType = l2l1_getU8(offset + 22);
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 23);
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 25);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 26);
    result.offsetRbDmrs = l2l1_getU8(offset + 27);
    result.dlPtrsFlag = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.harqProcessIndex = l2l1_getU8(offset + 33);
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 34);
    result.freshHarqTrans = l2l1_getU8(offset + 36);
    result.longTermCfoMetric = l1_common_decodelongTermCfoMetric_t(offset + 40);
    result.foeValid = l2l1_getU8(offset + 48);
    result.baseGraph = l2l1_getU8(offset + 49);
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 50);
    result.codeBlockSize = l2l1_getU16(offset + 52);
    result.numOfFillerBits = l2l1_getU16(offset + 54);
    result.liftSize = l2l1_getU16(offset + 56);
    result.liftSizeSetIndex = l2l1_getU8(offset + 58);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 59);
    result.modulationOrder = l2l1_getU8(offset + 60);
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 61);
    result.ncb = l2l1_getU16(offset + 62);
    result.k0divZ = l2l1_getU8(offset + 64);
    result.numOfLayers = l2l1_getU8(offset + 65);

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
    l2l1_putU8(msg.mcs, buf, off + 14);
    l2l1_putU8(msg.dlMcsTable, buf, off + 15);
    l2l1_putU16(msg.antPort, buf, off + 16);
    l2l1_putU8(msg.spatialMode, buf, off + 18);
    l2l1_putU8(msg.nscId, buf, off + 19);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 20);
    l2l1_putU8(msg.dlDmrsConfigType, buf, off + 22);
    l2l1_putU8(msg.dlDmrsLen, buf, off + 23);
    l2l1_putU8(msg.dlDmrsMappingType, buf, off + 24);
    l2l1_putU8(msg.dlDmrsAddPos, buf, off + 25);
    l2l1_putU8(msg.dlDmrsTypeAPos, buf, off + 26);
    l2l1_putU8(msg.offsetRbDmrs, buf, off + 27);
    l2l1_putU8(msg.dlPtrsFlag, buf, off + 28);
    l2l1_putU8(msg.dlPtrsTimeDensity, buf, off + 29);
    l2l1_putU8(msg.dlPtrsFrequencyDensity, buf, off + 30);
    l2l1_putU8(msg.dlPtrsNumOfPorts, buf, off + 31);
    l2l1_putU8(msg.dlPtrsResElemOffset, buf, off + 32);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 33);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 34);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 36);
    l1_common_encodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 40);
    l2l1_putU8(msg.foeValid, buf, off + 48);
    l2l1_putU8(msg.baseGraph, buf, off + 49);
    l2l1_putU8(msg.numOfCodeBlocks, buf, off + 50);
    l2l1_putU16(msg.codeBlockSize, buf, off + 52);
    l2l1_putU16(msg.numOfFillerBits, buf, off + 54);
    l2l1_putU16(msg.liftSize, buf, off + 56);
    l2l1_putU8(msg.liftSizeSetIndex, buf, off + 58);
    l2l1_putU8(msg.liftSizeColumnIndex, buf, off + 59);
    l2l1_putU8(msg.modulationOrder, buf, off + 60);
    l2l1_putU8(msg.rvIndex, buf, off + 61);
    l2l1_putU16(msg.ncb, buf, off + 62);
    l2l1_putU8(msg.k0divZ, buf, off + 64);
    l2l1_putU8(msg.numOfLayers, buf, off + 65);
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
    result.csiRsResources = _decodeArray(offset + 8, DlData_decodeCsiRsResource_t, 32);

    return result;
}
function DlData_encodeCsiRsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    _encodeArray(msg.csiRsResources, buf, off + 8, DlData_encodeCsiRsResource_t, 32);
}

function DlData_decodePatternConfigReq_t(offset) {
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
function DlData_encodePatternConfigReq_t(msg, buf, off) {
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
    result.coresetFreqDomain = l2l1_getU64(offset + 16);
    result.cceRegMappingType = l2l1_getU8(offset + 24);
    Object.defineProperty(result, "__enum_cceRegMappingType", {
        enumerable: false,
        writable: false,
        value: "cceRegMappingType_t",
    });
    result.pdcchPrecodingOption2x2 = l2l1_getU8(offset + 25);
    Object.defineProperty(result, "__enum_pdcchPrecodingOption2x2", {
        enumerable: false,
        writable: false,
        value: "pdcchPrecodingOption2x2_t",
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
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 34 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 38 + i * 2));
    result.dciPayload = [];
    for (let i = 0; i < 18; i++)
        result.dciPayload.push(l2l1_getU8(offset + 42 + i * 1));

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
    l2l1_putU64(msg.coresetFreqDomain, buf, off + 16);
    l2l1_putU8(msg.cceRegMappingType, buf, off + 24);
    l2l1_putU8(msg.pdcchPrecodingOption2x2, buf, off + 25);
    l2l1_putU16(msg.nShiftModNumOfRegBundles, buf, off + 26);
    l2l1_putU8(msg.interleaverRows, buf, off + 28);
    l2l1_putU8(msg.regBundleSize, buf, off + 29);
    l2l1_putU8(msg.precoderGranularity, buf, off + 30);
    l2l1_putU8(msg.coresetFreqDomainRbShift, buf, off + 31);
    l2l1_putU8(msg.dciSize, buf, off + 32);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 33);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 34 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 38 + i * 2);
    for (let i = 0; i < 18; i++)
        l2l1_putU8(msg.dciPayload[i], buf, off + 42 + i * 1);
}

function DlData_decodePdcchSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.beamId = l2l1_getU8(offset + 5);
    result.dciInfo = _decodeArray(offset + 8, DlData_decodeDciInfo, 64);

    return result;
}
function DlData_encodePdcchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.beamId, buf, off + 5);
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

function DlData_decodePdschSendReq_t(offset) {
    const result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.dlDmrsConfigType = l2l1_getU8(offset + 10);
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 11);
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 12);
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 13);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 14);
    result.nscId = l2l1_getU8(offset + 15);
    result.startSymbol = l2l1_getU8(offset + 16);
    result.numOfPdschSymbols = l2l1_getU8(offset + 17);
    Object.defineProperty(result, "__enum_numOfPdschSymbols", {
        enumerable: false,
        writable: false,
        value: "NumOfPdschSymbols",
    });
    result.antPort = l2l1_getU16(offset + 18);
    result.mcs = l2l1_getU8(offset + 20);
    result.mcsTable = l2l1_getU8(offset + 21);
    Object.defineProperty(result, "__enum_mcsTable", {
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
        value: "DlCodebookIndex",
    });
    result.startPrb = l2l1_getU16(offset + 24);
    result.numOfPrb = l2l1_getU16(offset + 26);
    result.dlPtrsFlag = l2l1_getU8(offset + 28);
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 29);
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 30);
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.offsetRbDmrs = l2l1_getU8(offset + 33);
    result.pdschTbTransmitPower = l2l1_getI16(offset + 34);
    result.pdschBundleSize = l2l1_getU16(offset + 36);
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
    result.numOfDmrsCdmGroupWithoutData = l2l1_getU8(offset + 68);
    result.rat0Bitmap = l2l1_getU32(offset + 72);
    result.i1Codebook4AntPorts = [];
    for (let i = 0; i < 3; i++)
        result.i1Codebook4AntPorts.push(l2l1_getU8(offset + 76 + i * 1));
    result.i2Codebook4AntPorts = l2l1_getU8(offset + 79);
    result.pdschClPrecodingOption4x4 = l2l1_getU8(offset + 80);
    Object.defineProperty(result, "__enum_pdschClPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "pdschClPrecodingOption4x4_t",
    });
    result.numCeAxCIndex = l2l1_getU8(offset + 81);
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCIndex = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 82 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 2; i++)
        result.patternId.push(l2l1_getU16(offset + 86 + i * 2));

    return result;
}
function DlData_encodePdschSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU16(msg.dmrsScramblingSequenceInt, buf, off + 8);
    l2l1_putU8(msg.dlDmrsConfigType, buf, off + 10);
    l2l1_putU8(msg.dlDmrsLen, buf, off + 11);
    l2l1_putU8(msg.dlDmrsMappingType, buf, off + 12);
    l2l1_putU8(msg.dlDmrsAddPos, buf, off + 13);
    l2l1_putU8(msg.dlDmrsTypeAPos, buf, off + 14);
    l2l1_putU8(msg.nscId, buf, off + 15);
    l2l1_putU8(msg.startSymbol, buf, off + 16);
    l2l1_putU8(msg.numOfPdschSymbols, buf, off + 17);
    l2l1_putU16(msg.antPort, buf, off + 18);
    l2l1_putU8(msg.mcs, buf, off + 20);
    l2l1_putU8(msg.mcsTable, buf, off + 21);
    l2l1_putU8(msg.spatialMode, buf, off + 22);
    l2l1_putU8(msg.codebookIndex, buf, off + 23);
    l2l1_putU16(msg.startPrb, buf, off + 24);
    l2l1_putU16(msg.numOfPrb, buf, off + 26);
    l2l1_putU8(msg.dlPtrsFlag, buf, off + 28);
    l2l1_putU8(msg.dlPtrsTimeDensity, buf, off + 29);
    l2l1_putU8(msg.dlPtrsFrequencyDensity, buf, off + 30);
    l2l1_putU8(msg.dlPtrsNumOfPorts, buf, off + 31);
    l2l1_putU8(msg.dlPtrsResElemOffset, buf, off + 32);
    l2l1_putU8(msg.offsetRbDmrs, buf, off + 33);
    l2l1_putI16(msg.pdschTbTransmitPower, buf, off + 34);
    l2l1_putU16(msg.pdschBundleSize, buf, off + 36);
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
    l2l1_putU8(msg.numOfDmrsCdmGroupWithoutData, buf, off + 68);
    l2l1_putU32(msg.rat0Bitmap, buf, off + 72);
    for (let i = 0; i < 3; i++)
        l2l1_putU8(msg.i1Codebook4AntPorts[i], buf, off + 76 + i * 1);
    l2l1_putU8(msg.i2Codebook4AntPorts, buf, off + 79);
    l2l1_putU8(msg.pdschClPrecodingOption4x4, buf, off + 80);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 81);
    for (let i = 0; i < 4; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 82 + i * 1);
    for (let i = 0; i < 2; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 86 + i * 2);
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
    for (let i = 0; i < 2; i++)
        result.ceAxCIndex.push(l2l1_getU8(offset + 12 + i * 1));
    result.patternId = [];
    for (let i = 0; i < 4; i++)
        result.patternId.push(l2l1_getU16(offset + 14 + i * 2));

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
    for (let i = 0; i < 2; i++)
        l2l1_putU8(msg.ceAxCIndex[i], buf, off + 12 + i * 1);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.patternId[i], buf, off + 14 + i * 2);
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
    result.phaseCompensationLutIndex = [];
    for (let i = 0; i < 112; i++)
        result.phaseCompensationLutIndex.push(l2l1_getU16(offset + 16 + i * 2));
    result.ssBlockPhaseCompensationLutIndex = [];
    for (let i = 0; i < 224; i++)
        result.ssBlockPhaseCompensationLutIndex.push(l2l1_getU16(offset + 240 + i * 2));
    result.dlSubcellPosition = l2l1_getU8(offset + 687);
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 688);
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 689);
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "numCeAxC_t",
    });
    result.ceAxCId = [];
    for (let i = 0; i < 4; i++)
        result.ceAxCId.push(l2l1_getU16(offset + 690 + i * 2));
    result.conformanceTestMode = l2l1_getU8(offset + 698);
    result.actBeamforming = l2l1_getU8(offset + 699);

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
    for (let i = 0; i < 112; i++)
        l2l1_putU16(msg.phaseCompensationLutIndex[i], buf, off + 16 + i * 2);
    for (let i = 0; i < 224; i++)
        l2l1_putU16(msg.ssBlockPhaseCompensationLutIndex[i], buf, off + 240 + i * 2);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 688);
    l2l1_putU8(msg.eCpriLink, buf, off + 689);
    l2l1_putU8(msg.numCeAxCId, buf, off + 690);
    for (let i = 0; i < 4; i++)
        l2l1_putU16(msg.ceAxCId[i], buf, off + 692 + i * 2);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 700);
    l2l1_putU8(msg.actBeamforming, buf, off + 701);
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
    case 0xf319: // UlDataUe::PucchSendReq_t
        result = UlDataUe_decodePucchSendReq_t(0);
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
    case 0x0204: // UlData::AddressReq_t
        result = UlData_decodeAddressReq_t(0);
        break;
    case 0x0206: // UlData::SyncInd_t
        result = UlData_decodeSyncInd_t(0);
        break;
    case 0x0218: // UlData::PuschReceiveRespHarqU_t
        result = UlData_decodePuschReceiveRespHarqU_t(0);
        break;
    case 0x0219: // UlData::PrachReceiveInd_t
        result = UlData_decodePrachReceiveInd_t(0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        result = UlData_decodePrachReceiveInd_t(0);
        break;
    case 0x022B: // UlData::AddressResp_t
        result = UlData_decodeAddressResp_t(0);
        break;
    case 0x022E: // UlData::SrsReceiveRespPs_t
        result = UlData_decodeSrsReceiveRespPs_t(0);
        break;
    case 0x0233: // UlData::PrachReceiveReq_t
        result = UlData_decodePrachReceiveReq_t(0);
        break;
    case 0x0235: // UlData::PuschReceiveRespPs_t
        result = UlData_decodePuschReceiveRespPs_t(0);
        break;
    case 0x0237: // UlData::PucchReceiveRespHarqD_t
        result = UlData_decodePucchReceiveRespHarqD_t(0);
        break;
    case 0x0238: // UlData::PucchReceiveRespPs_t
        result = UlData_decodePucchReceiveRespPs_t(0);
        break;
    case 0x023C: // UlData::SrsReceiveReq_t
        result = UlData_decodeSrsReceiveReq_t(0);
        break;
    case 0x0246: // UlData::PuschReceiveReq_t
        result = UlData_decodePuschReceiveReq_t(0);
        break;
    case 0x024A: // UlData::PucchReceiveReq_t
        result = UlData_decodePucchReceiveReq_t(0);
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
    case 0xf330: // UlCellUe::SetupReq_t
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
    case 0x1625: // L1ECpri::ConfigureLinksReq_t
        result = L1ECpri_decodeConfigureLinksReq_t(0);
        break;
    case 0x1626: // L1ECpri::ConfigureLinksResp_t
        result = L1ECpri_decodeConfigureLinksResp_t(0);
        break;
    case 0x1627: // L1ECpri::ConfigureMeasurementsReq_t
        result = L1ECpri_decodeConfigureMeasurementsReq_t(0);
        break;
    case 0x1628: // L1ECpri::ConfigureMeasurementsResp_t
        result = L1ECpri_decodeConfigureMeasurementsResp_t(0);
        break;
    case 0x1629: // L1ECpri::ConfigureTransportReq_t
        result = L1ECpri_decodeConfigureTransportReq_t(0);
        break;
    case 0x162a: // L1ECpri::ConfigureTransportResp_t
        result = L1ECpri_decodeConfigureTransportResp_t(0);
        break;
    case 0x162b: // L1ECpri::DelayConfigReq_t
        result = L1ECpri_decodeDelayConfigReq_t(0);
        break;
    case 0x162c: // L1ECpri::DelayConfigResp_t
        result = L1ECpri_decodeDelayConfigResp_t(0);
        break;
    case 0x162d: // L1ECpri::DelayMeasInd_t
        result = L1ECpri_decodeDelayMeasInd_t(0);
        break;
    case 0x162e: // L1ECpri::InitialDelayMeasReq_t
        result = L1ECpri_decodeInitialDelayMeasReq_t(0);
        break;
    case 0x162f: // L1ECpri::InitialDelayMeasResp_t
        result = L1ECpri_decodeInitialDelayMeasResp_t(0);
        break;
    case 0x1630: // L1ECpri::MsgRcvCountersInd_t
        result = L1ECpri_decodeMsgRcvCountersInd_t(0);
        break;
    case 0x1631: // L1ECpri::SetOutputReq_t
        result = L1ECpri_decodeSetOutputReq_t(0);
        break;
    case 0x1632: // L1ECpri::SetOutputResp_t
        result = L1ECpri_decodeSetOutputResp_t(0);
        break;
    case 0x1633: // L1ECpri::StateInd_t
        result = L1ECpri_decodeStateInd_t(0);
        break;
    case 0x1634: // L1ECpri::SubscribeReq_t
        result = L1ECpri_decodeSubscribeReq_t(0);
        break;
    case 0x1635: // L1ECpri::SubscribeResp_t
        result = L1ECpri_decodeSubscribeResp_t(0);
        break;
    case 0x0247: // UlCell::SetupReq_t
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
    case 0xd260: // LteLunum_DlData::dlUlChannelsReq_t
        result = LteLunum_DlData_decodedlUlChannelsReq_t(0);
        break;
    case 0x1636: // LteLunum_DlUlCell::SetupReq_t
        result = LteLunum_DlUlCell_decodeSetupReq_t(0);
        break;
    case 0x1637: // LteLunum_DlUlCell::SetupResp_t
        result = LteLunum_DlUlCell_decodeSetupResp_t(0);
        break;
    case 0x1638: // LteLunum_DlUlCell::DeleteReq_t
        result = LteLunum_DlUlCell_decodeDeleteReq_t(0);
        break;
    case 0x1639: // LteLunum_DlUlCell::DeleteResp_t
        result = LteLunum_DlUlCell_decodeDeleteResp_t(0);
        break;
    case 0x0a64: // L1Log::AntennaSnapshotInd_t
        result = L1Log_decodeAntennaSnapshotInd_t(0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        result = L1Log_decodeAntennaSnapshotReq_t(0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        result = L1Log_decodeAntennaSnapshotResp_t(0);
        break;
    case 0x0a5d: // L1Log::TraceReq_t
        result = L1Log_decodeTraceReq_t(0);
        break;
    case 0x0a5e: // L1Log::TraceResp_t
        result = L1Log_decodeTraceResp_t(0);
        break;
    case 0x0a5f: // L1Log::TraceInd_t
        result = L1Log_decodeTraceInd_t(0);
        break;
    case 0x0a60: // L1Log::ShowTraceListReq_t
        result = L1Log_decodeShowTraceListReq_t(0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        result = L1Log_decodeShowTraceListResp_t(0);
        break;
    case 0x0a62: // L1Log::AntennaSnapshotConfigurationReq_t
        result = L1Log_decodeAntennaSnapshotConfigurationReq_t(0);
        break;
    case 0x0a63: // L1Log::AntennaSnapshotConfigurationResp_t
        result = L1Log_decodeAntennaSnapshotConfigurationResp_t(0);
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
    case 0x0a11: // L1Cpri::DelayConfigReq_t
        result = L1Cpri_decodeDelayConfigReq_t(0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        result = L1Cpri_decodeSetDiscoveryReq_t(0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        result = L1Cpri_decodeSetDiscoveryResp_t(0);
        break;
    case 0x0a14: // L1Cpri::SetLinkPropertiesReq_t
        result = L1Cpri_decodeSetLinkPropertiesReq_t(0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        result = L1Cpri_decodeSetLinkPropertiesResp_t(0);
        break;
    case 0x0a16: // L1Cpri::GetLinkParamResp_t
        result = L1Cpri_decodeGetLinkParamResp_t(0);
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
    case 0x0104: // DlData::AddressReq_t
        result = DlData_decodeAddressReq_t(0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        result = DlData_decodePdschPayloadTbSendReq_t(0);
        break;
    case 0x0116: // DlData::PatternConfigReq_t
        result = DlData_decodePatternConfigReq_t(0);
        break;
    case 0x0121: // DlData::AddressResp_t
        result = DlData_decodeAddressResp_t(0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        result = DlData_decodeSlotTypeReq_t(0);
        break;
    case 0x0127: // DlData::SsBlockSendReq_t
        result = DlData_decodeSsBlockSendReq_t(0);
        break;
    case 0x0129: // DlData::PdschSendReq_t
        result = DlData_decodePdschSendReq_t(0);
        break;
    case 0x012A: // DlData::CsiRsSendReq_t
        result = DlData_decodeCsiRsSendReq_t(0);
        break;
    case 0x012C: // DlData::PdcchSendReq_t
        result = DlData_decodePdcchSendReq_t(0);
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
    case 0x012D: // DlCell::SetupReq_t
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
    case 0xf319: // UlDataUe::PucchSendReq_t
        buf.static = new Uint8Array(14);
        UlDataUe_encodePucchSendReq_t(l2l1, buf, 0);
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
        buf.static = new Uint8Array(84);
        UlDataUe_encodePuschSendReq_t(l2l1, buf, 0);
        break;
    case 0x0204: // UlData::AddressReq_t
        buf.static = new Uint8Array(12);
        UlData_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0x0206: // UlData::SyncInd_t
        buf.static = new Uint8Array(8);
        UlData_encodeSyncInd_t(l2l1, buf, 0);
        break;
    case 0x0218: // UlData::PuschReceiveRespHarqU_t
        buf.static = new Uint8Array(12);
        UlData_encodePuschReceiveRespHarqU_t(l2l1, buf, 0);
        break;
    case 0x0219: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(12);
        UlData_encodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(12);
        UlData_encodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0x022B: // UlData::AddressResp_t
        buf.static = new Uint8Array(20);
        UlData_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0x022E: // UlData::SrsReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlData_encodeSrsReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x0233: // UlData::PrachReceiveReq_t
        buf.static = new Uint8Array(12);
        UlData_encodePrachReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x0235: // UlData::PuschReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlData_encodePuschReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x0237: // UlData::PucchReceiveRespHarqD_t
        buf.static = new Uint8Array(12);
        UlData_encodePucchReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0x0238: // UlData::PucchReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlData_encodePucchReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x023C: // UlData::SrsReceiveReq_t
        buf.static = new Uint8Array(16);
        UlData_encodeSrsReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x0246: // UlData::PuschReceiveReq_t
        buf.static = new Uint8Array(24);
        UlData_encodePuschReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x024A: // UlData::PucchReceiveReq_t
        buf.static = new Uint8Array(20);
        UlData_encodePucchReceiveReq_t(l2l1, buf, 0);
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
    case 0xf330: // UlCellUe::SetupReq_t
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
    case 0x1625: // L1ECpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(28);
        L1ECpri_encodeConfigureLinksReq_t(l2l1, buf, 0);
        break;
    case 0x1626: // L1ECpri::ConfigureLinksResp_t
        buf.static = new Uint8Array(1);
        L1ECpri_encodeConfigureLinksResp_t(l2l1, buf, 0);
        break;
    case 0x1627: // L1ECpri::ConfigureMeasurementsReq_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeConfigureMeasurementsReq_t(l2l1, buf, 0);
        break;
    case 0x1628: // L1ECpri::ConfigureMeasurementsResp_t
        buf.static = new Uint8Array(1);
        L1ECpri_encodeConfigureMeasurementsResp_t(l2l1, buf, 0);
        break;
    case 0x1629: // L1ECpri::ConfigureTransportReq_t
        buf.static = new Uint8Array(14);
        L1ECpri_encodeConfigureTransportReq_t(l2l1, buf, 0);
        break;
    case 0x162a: // L1ECpri::ConfigureTransportResp_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeConfigureTransportResp_t(l2l1, buf, 0);
        break;
    case 0x162b: // L1ECpri::DelayConfigReq_t
        buf.static = new Uint8Array(28);
        L1ECpri_encodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0x162c: // L1ECpri::DelayConfigResp_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeDelayConfigResp_t(l2l1, buf, 0);
        break;
    case 0x162d: // L1ECpri::DelayMeasInd_t
        buf.static = new Uint8Array(12);
        L1ECpri_encodeDelayMeasInd_t(l2l1, buf, 0);
        break;
    case 0x162e: // L1ECpri::InitialDelayMeasReq_t
        buf.static = new Uint8Array(16);
        L1ECpri_encodeInitialDelayMeasReq_t(l2l1, buf, 0);
        break;
    case 0x162f: // L1ECpri::InitialDelayMeasResp_t
        buf.static = new Uint8Array(12);
        L1ECpri_encodeInitialDelayMeasResp_t(l2l1, buf, 0);
        break;
    case 0x1630: // L1ECpri::MsgRcvCountersInd_t
        buf.static = new Uint8Array(4496);
        L1ECpri_encodeMsgRcvCountersInd_t(l2l1, buf, 0);
        break;
    case 0x1631: // L1ECpri::SetOutputReq_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeSetOutputReq_t(l2l1, buf, 0);
        break;
    case 0x1632: // L1ECpri::SetOutputResp_t
        buf.static = new Uint8Array(3);
        L1ECpri_encodeSetOutputResp_t(l2l1, buf, 0);
        break;
    case 0x1633: // L1ECpri::StateInd_t
        buf.static = new Uint8Array(2);
        L1ECpri_encodeStateInd_t(l2l1, buf, 0);
        break;
    case 0x1634: // L1ECpri::SubscribeReq_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0x1635: // L1ECpri::SubscribeResp_t
        buf.static = new Uint8Array(8);
        L1ECpri_encodeSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0x0247: // UlCell::SetupReq_t
        buf.static = new Uint8Array(1514);
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
    case 0xd260: // LteLunum_DlData::dlUlChannelsReq_t
        buf.static = new Uint8Array(28);
        LteLunum_DlData_encodedlUlChannelsReq_t(l2l1, buf, 0);
        break;
    case 0x1636: // LteLunum_DlUlCell::SetupReq_t
        buf.static = new Uint8Array(22);
        LteLunum_DlUlCell_encodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0x1637: // LteLunum_DlUlCell::SetupResp_t
        buf.static = new Uint8Array(12);
        LteLunum_DlUlCell_encodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x1638: // LteLunum_DlUlCell::DeleteReq_t
        buf.static = new Uint8Array(2);
        LteLunum_DlUlCell_encodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x1639: // LteLunum_DlUlCell::DeleteResp_t
        buf.static = new Uint8Array(4);
        LteLunum_DlUlCell_encodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0x0a64: // L1Log::AntennaSnapshotInd_t
        buf.static = new Uint8Array(200);
        L1Log_encodeAntennaSnapshotInd_t(l2l1, buf, 0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        buf.static = new Uint8Array(8);
        L1Log_encodeAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        L1Log_encodeAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0x0a5d: // L1Log::TraceReq_t
        buf.static = new Uint8Array(70);
        L1Log_encodeTraceReq_t(l2l1, buf, 0);
        break;
    case 0x0a5e: // L1Log::TraceResp_t
        buf.static = new Uint8Array(4);
        L1Log_encodeTraceResp_t(l2l1, buf, 0);
        break;
    case 0x0a5f: // L1Log::TraceInd_t
        buf.static = new Uint8Array(1416);
        L1Log_encodeTraceInd_t(l2l1, buf, 0);
        break;
    case 0x0a60: // L1Log::ShowTraceListReq_t
        buf.static = new Uint8Array(4);
        L1Log_encodeShowTraceListReq_t(l2l1, buf, 0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        buf.static = new Uint8Array(105);
        L1Log_encodeShowTraceListResp_t(l2l1, buf, 0);
        break;
    case 0x0a62: // L1Log::AntennaSnapshotConfigurationReq_t
        buf.static = new Uint8Array(19);
        L1Log_encodeAntennaSnapshotConfigurationReq_t(l2l1, buf, 0);
        break;
    case 0x0a63: // L1Log::AntennaSnapshotConfigurationResp_t
        buf.static = new Uint8Array(1);
        L1Log_encodeAntennaSnapshotConfigurationResp_t(l2l1, buf, 0);
        break;
    case 0x0a00: // L1Cpri::AlarmInd_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeAlarmInd_t(l2l1, buf, 0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(272);
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
    case 0x0a11: // L1Cpri::DelayConfigReq_t
        buf.static = new Uint8Array(32);
        L1Cpri_encodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        buf.static = new Uint8Array(70);
        L1Cpri_encodeSetDiscoveryReq_t(l2l1, buf, 0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeSetDiscoveryResp_t(l2l1, buf, 0);
        break;
    case 0x0a14: // L1Cpri::SetLinkPropertiesReq_t
        buf.static = new Uint8Array(8);
        L1Cpri_encodeSetLinkPropertiesReq_t(l2l1, buf, 0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        buf.static = new Uint8Array(2);
        L1Cpri_encodeSetLinkPropertiesResp_t(l2l1, buf, 0);
        break;
    case 0x0a16: // L1Cpri::GetLinkParamResp_t
        buf.static = new Uint8Array(36);
        L1Cpri_encodeGetLinkParamResp_t(l2l1, buf, 0);
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
    case 0x0104: // DlData::AddressReq_t
        buf.static = new Uint8Array(1);
        DlData_encodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        buf.static = new Uint8Array(24);
        DlData_encodePdschPayloadTbSendReq_t(l2l1, buf, 0);
        break;
    case 0x0116: // DlData::PatternConfigReq_t
        buf.static = new Uint8Array(460);
        DlData_encodePatternConfigReq_t(l2l1, buf, 0);
        break;
    case 0x0121: // DlData::AddressResp_t
        buf.static = new Uint8Array(32);
        DlData_encodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        buf.static = new Uint8Array(20);
        DlData_encodeSlotTypeReq_t(l2l1, buf, 0);
        break;
    case 0x0127: // DlData::SsBlockSendReq_t
        buf.static = new Uint8Array(22);
        DlData_encodeSsBlockSendReq_t(l2l1, buf, 0);
        break;
    case 0x0129: // DlData::PdschSendReq_t
        buf.static = new Uint8Array(92);
        DlData_encodePdschSendReq_t(l2l1, buf, 0);
        break;
    case 0x012A: // DlData::CsiRsSendReq_t
        buf.static = new Uint8Array(14);
        DlData_encodeCsiRsSendReq_t(l2l1, buf, 0);
        break;
    case 0x012C: // DlData::PdcchSendReq_t
        buf.static = new Uint8Array(16);
        DlData_encodePdcchSendReq_t(l2l1, buf, 0);
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
    case 0x012D: // DlCell::SetupReq_t
        buf.static = new Uint8Array(702);
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
    0xf319: "UlDataUe::PucchSendReq",
    0xf31a: "UlDataUe::PrachSendReq",
    0xf31b: "UlDataUe::PatternConfigReq",
    0xf326: "UlDataUe::PuschSendReq",
    0x0204: "UlData::AddressReq",
    0x0206: "UlData::SyncInd",
    0x0218: "UlData::PuschReceiveRespHarqU",
    0x0219: "UlData::PrachReceiveInd",
    0x0222: "UlData::PrachReceiveInd",
    0x022B: "UlData::AddressResp",
    0x022E: "UlData::SrsReceiveRespPs",
    0x0233: "UlData::PrachReceiveReq",
    0x0235: "UlData::PuschReceiveRespPs",
    0x0237: "UlData::PucchReceiveRespHarqD",
    0x0238: "UlData::PucchReceiveRespPs",
    0x023C: "UlData::SrsReceiveReq",
    0x0246: "UlData::PuschReceiveReq",
    0x024A: "UlData::PucchReceiveReq",
    0xf201: "UlCellUe::SetupResp",
    0xf316: "UlCellUe::DeleteReq",
    0xf317: "UlCellUe::DeleteResp",
    0xf330: "UlCellUe::SetupReq",
    0x0201: "UlCell::SetupResp",
    0x0202: "UlCell::DeleteReq",
    0x0203: "UlCell::DeleteResp",
    0x1625: "L1ECpri::ConfigureLinksReq",
    0x1626: "L1ECpri::ConfigureLinksResp",
    0x1627: "L1ECpri::ConfigureMeasurementsReq",
    0x1628: "L1ECpri::ConfigureMeasurementsResp",
    0x1629: "L1ECpri::ConfigureTransportReq",
    0x162a: "L1ECpri::ConfigureTransportResp",
    0x162b: "L1ECpri::DelayConfigReq",
    0x162c: "L1ECpri::DelayConfigResp",
    0x162d: "L1ECpri::DelayMeasInd",
    0x162e: "L1ECpri::InitialDelayMeasReq",
    0x162f: "L1ECpri::InitialDelayMeasResp",
    0x1630: "L1ECpri::MsgRcvCountersInd",
    0x1631: "L1ECpri::SetOutputReq",
    0x1632: "L1ECpri::SetOutputResp",
    0x1633: "L1ECpri::StateInd",
    0x1634: "L1ECpri::SubscribeReq",
    0x1635: "L1ECpri::SubscribeResp",
    0x0247: "UlCell::SetupReq",
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
    0xd260: "LteLunum_DlData::dlUlChannelsReq",
    0x1636: "LteLunum_DlUlCell::SetupReq",
    0x1637: "LteLunum_DlUlCell::SetupResp",
    0x1638: "LteLunum_DlUlCell::DeleteReq",
    0x1639: "LteLunum_DlUlCell::DeleteResp",
    0x0a64: "L1Log::AntennaSnapshotInd",
    0x0a65: "L1Log::AntennaSnapshotReq",
    0x0a5a: "L1Log::AntennaSnapshotResp",
    0x0a5d: "L1Log::TraceReq",
    0x0a5e: "L1Log::TraceResp",
    0x0a5f: "L1Log::TraceInd",
    0x0a60: "L1Log::ShowTraceListReq",
    0x0a61: "L1Log::ShowTraceListResp",
    0x0a62: "L1Log::AntennaSnapshotConfigurationReq",
    0x0a63: "L1Log::AntennaSnapshotConfigurationResp",
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
    0x0a11: "L1Cpri::DelayConfigReq",
    0x0a12: "L1Cpri::SetDiscoveryReq",
    0x0a13: "L1Cpri::SetDiscoveryResp",
    0x0a14: "L1Cpri::SetLinkPropertiesReq",
    0x0a15: "L1Cpri::SetLinkPropertiesResp",
    0x0a16: "L1Cpri::GetLinkParamResp",
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
    0x0104: "DlData::AddressReq",
    0x0108: "DlData::PdschPayloadTbSendReq",
    0x0116: "DlData::PatternConfigReq",
    0x0121: "DlData::AddressResp",
    0x0122: "DlData::SlotTypeReq",
    0x0127: "DlData::SsBlockSendReq",
    0x0129: "DlData::PdschSendReq",
    0x012A: "DlData::CsiRsSendReq",
    0x012C: "DlData::PdcchSendReq",
    0xf101: "DlCellUe::SetupResp",
    0xf31d: "DlCellUe::DeleteReq",
    0xf31e: "DlCellUe::DeleteResp",
    0xf328: "DlCellUe::SetupReq",
    0x0101: "DlCell::SetupResp",
    0x0102: "DlCell::DeleteReq",
    0x0103: "DlCell::DeleteResp",
    0x012D: "DlCell::SetupReq",
};

const packetEnumMap = {
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
    cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
    },
    coresetInterleaverSize_t: {
        2: "coresetInterleaverSize::ROWS_2",
        3: "coresetInterleaverSize::ROWS_3",
        6: "coresetInterleaverSize::ROWS_6",
    },
    coresetRegBundleSize_t: {
        2: "coresetRegBundleSize::REGS_2",
        3: "coresetRegBundleSize::REGS_3",
        6: "coresetRegBundleSize::REGS_6",
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
    DlCodebookIndex: {
        0: "DlCodebookIndex::VAL_0",
        1: "DlCodebookIndex::VAL_1",
        2: "DlCodebookIndex::VAL_2",
        3: "DlCodebookIndex::VAL_3",
        4: "DlCodebookIndex::VAL_4",
        5: "DlCodebookIndex::VAL_5",
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
        25: "EBandwidth::prbs_25",
        32: "EBandwidth::prbs_32",
        51: "EBandwidth::prbs_51",
        52: "EBandwidth::prbs_52",
        64: "EBandwidth::prbs_64",
        66: "EBandwidth::prbs_66",
        79: "EBandwidth::prbs_79",
        106: "EBandwidth::prbs_106",
        128: "EBandwidth::prbs_128",
        162: "EBandwidth::prbs_162",
        217: "EBandwidth::prbs_217",
        256: "EBandwidth::prbs_256",
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
    mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
    },
    modulationOrder_t: {
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    NumOfPdschSymbols: {
        4: "NumOfPdschSymbols::VAL_4_SYMBOLS",
        7: "NumOfPdschSymbols::VAL_7_SYMBOLS",
        8: "NumOfPdschSymbols::VAL_8_SYMBOLS",
        10: "NumOfPdschSymbols::VAL_10_SYMBOLS",
        11: "NumOfPdschSymbols::VAL_11_SYMBOLS",
        12: "NumOfPdschSymbols::VAL_12_SYMBOLS",
        13: "NumOfPdschSymbols::VAL_13_SYMBOLS",
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
    pdcchPrecodingOption2x2_t: {
        0: "pdcchPrecodingOption2x2::firstPolarization",
        1: "pdcchPrecodingOption2x2::secondPolarization",
        2: "pdcchPrecodingOption2x2::bothPolarizations",
    },
    pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
    },
    pdschClPrecodingOption4x4_t: {
        0: "pdschClPrecodingOption4x4::typeI3Gpp",
        1: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank2",
        2: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank4",
    },
    prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        4: "prachCohCombLen::symbols_4",
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
    puschStartSymbol_t: {
        0: "puschStartSymbol::SYMBOL_0",
        2: "puschStartSymbol::SYMBOL_2",
    },
    puschTransCoherence_t: {
        0: "puschTransCoherence::nonCoherent",
        1: "puschTransCoherence::partialNonCoherent",
        2: "puschTransCoherence::fullCoherent",
    },
    selfContainedFlag: {
        0: "selfContainedFlag::NON_SELF_CONTAINED",
        1: "selfContainedFlag::SELF_CONTAINED",
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
    subcellPosition_t: {
        0: "subcellPosition::subcell_slot_0",
        1: "subcellPosition::subcell_slot_1",
        2: "subcellPosition::subcell_slot_2",
        3: "subcellPosition::subcell_slot_3",
        4: "subcellPosition::subcell_slot_4",
        6: "subcellPosition::subcell_slot_6",
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
    Bandwidth: {
        6: "Bandwidth::prbs_6",
        15: "Bandwidth::prbs_15",
        25: "Bandwidth::prbs_25",
        50: "Bandwidth::prbs_50",
        75: "Bandwidth::prbs_75",
        100: "Bandwidth::prbs_100",
    },
    PhyChannelType__t: {
        0: "PhyChannelType_::PUxCH",
        1: "PhyChannelType_::PDxCH",
        2: "PhyChannelType_::PRACH",
        3: "PhyChannelType_::SRS",
    },
    DataDirection: {
        0: "DataDirection::DataDirection_Rx",
        1: "DataDirection::DataDirection_Tx",
    },
    FilterIndex: {
        0: "FilterIndex::FilterIndex_StandardChannel",
        1: "FilterIndex::FilterIndex_PrachPreambleFormats_012",
        2: "FilterIndex::FilterIndex_PrachPreambleFormats_3",
        3: "FilterIndex::FilterIndex_PrachPreambleFormats_A1_C2",
        4: "FilterIndex::FilterINdex_NPrachUl",
    },
    SectionType: {
        0: "SectionType::SectionType_IdleOrGuardPeriod",
        1: "SectionType::SectionType_DlOrUlRadioChannel",
        3: "SectionType::SectionType_PrachAndMixedNumerologyChannel",
        5: "SectionType::SerctionType_UeSchedulingInformation",
        6: "SectionType::SectionType_UeChannelInformation",
        7: "SectionType::SectionType_LAA",
    },
    RbIndicator: {
        0: "RbIndicator::RbIndicator_EveryRb",
        1: "RbIndicator::RbIndicator_EveryOtherRb",
    },
    ExtType: {
        0: "ExtType::ExtType_Reserved",
        1: "ExtType::ExtType_BeamFormingWeights",
        2: "ExtType::ExtType_BeamformingAttributes",
        3: "ExtType::ExtType_DlPrecodingConfiguration",
        4: "ExtType::ExtType_ModulationCompressionParams",
        5: "ExtType::ExtType_ModulationCompressionAddScaling",
        6: "ExtType::ExtType_NonContiguousPrbAllocation",
    },
    CompressionMethod: {
        0: "CompressionMethod::CompressionMethod_NoCompression",
        1: "CompressionMethod::CompressionMethod_BlockFloatPoint",
        2: "CompressionMethod::CompressionMethod_BlockScaling",
        3: "CompressionMethod::CompressionMethod_ULaw",
        4: "CompressionMethod::CompressionMethod_ModulationCompression",
    },
    DataDirection: {
        0: "DataDirection::DataDirection_Rx",
        1: "DataDirection::DataDirection_Tx",
    },
    FilterIndex: {
        0: "FilterIndex::FilterIndex_StandardChannel",
        1: "FilterIndex::FilterIndex_PrachPreambleFormats_012",
        2: "FilterIndex::FilterIndex_PrachPreambleFormats_3",
        3: "FilterIndex::FilterIndex_PrachPreambleFormats_A1_C2",
        4: "FilterIndex::FilterINdex_NPrachUl",
    },
    SectionType: {
        0: "SectionType::SectionType_IdleOrGuardPeriod",
        1: "SectionType::SectionType_DlOrUlRadioChannel",
        3: "SectionType::SectionType_PrachAndMixedNumerologyChannel",
        5: "SectionType::SerctionType_UeSchedulingInformation",
        6: "SectionType::SectionType_UeChannelInformation",
        7: "SectionType::SectionType_LAA",
    },
    RbIndicator: {
        0: "RbIndicator::RbIndicator_EveryRb",
        1: "RbIndicator::RbIndicator_EveryOtherRb",
    },
    ExtType: {
        0: "ExtType::ExtType_Reserved",
        1: "ExtType::ExtType_BeamFormingWeights",
        2: "ExtType::ExtType_BeamformingAttributes",
        3: "ExtType::ExtType_DlPrecodingConfiguration",
        4: "ExtType::ExtType_ModulationCompressionParams",
        5: "ExtType::ExtType_ModulationCompressionAddScaling",
        6: "ExtType::ExtType_NonContiguousPrbAllocation",
    },
    CompressionMethod: {
        0: "CompressionMethod::CompressionMethod_NoCompression",
        1: "CompressionMethod::CompressionMethod_BlockFloatPoint",
        2: "CompressionMethod::CompressionMethod_BlockScaling",
        3: "CompressionMethod::CompressionMethod_ULaw",
        4: "CompressionMethod::CompressionMethod_ModulationCompression",
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
    cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
    },
    coresetInterleaverSize_t: {
        2: "coresetInterleaverSize::ROWS_2",
        3: "coresetInterleaverSize::ROWS_3",
        6: "coresetInterleaverSize::ROWS_6",
    },
    coresetRegBundleSize_t: {
        2: "coresetRegBundleSize::REGS_2",
        3: "coresetRegBundleSize::REGS_3",
        6: "coresetRegBundleSize::REGS_6",
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
    DlCodebookIndex: {
        0: "DlCodebookIndex::VAL_0",
        1: "DlCodebookIndex::VAL_1",
        2: "DlCodebookIndex::VAL_2",
        3: "DlCodebookIndex::VAL_3",
        4: "DlCodebookIndex::VAL_4",
        5: "DlCodebookIndex::VAL_5",
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
        25: "EBandwidth::prbs_25",
        32: "EBandwidth::prbs_32",
        51: "EBandwidth::prbs_51",
        52: "EBandwidth::prbs_52",
        64: "EBandwidth::prbs_64",
        66: "EBandwidth::prbs_66",
        79: "EBandwidth::prbs_79",
        106: "EBandwidth::prbs_106",
        128: "EBandwidth::prbs_128",
        162: "EBandwidth::prbs_162",
        217: "EBandwidth::prbs_217",
        256: "EBandwidth::prbs_256",
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
    mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
    },
    modulationOrder_t: {
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    NumOfPdschSymbols: {
        4: "NumOfPdschSymbols::VAL_4_SYMBOLS",
        7: "NumOfPdschSymbols::VAL_7_SYMBOLS",
        8: "NumOfPdschSymbols::VAL_8_SYMBOLS",
        10: "NumOfPdschSymbols::VAL_10_SYMBOLS",
        11: "NumOfPdschSymbols::VAL_11_SYMBOLS",
        12: "NumOfPdschSymbols::VAL_12_SYMBOLS",
        13: "NumOfPdschSymbols::VAL_13_SYMBOLS",
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
    pdcchPrecodingOption2x2_t: {
        0: "pdcchPrecodingOption2x2::firstPolarization",
        1: "pdcchPrecodingOption2x2::secondPolarization",
        2: "pdcchPrecodingOption2x2::bothPolarizations",
    },
    pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
    },
    pdschClPrecodingOption4x4_t: {
        0: "pdschClPrecodingOption4x4::typeI3Gpp",
        1: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank2",
        2: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank4",
    },
    prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        4: "prachCohCombLen::symbols_4",
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
    puschStartSymbol_t: {
        0: "puschStartSymbol::SYMBOL_0",
        2: "puschStartSymbol::SYMBOL_2",
    },
    puschTransCoherence_t: {
        0: "puschTransCoherence::nonCoherent",
        1: "puschTransCoherence::partialNonCoherent",
        2: "puschTransCoherence::fullCoherent",
    },
    selfContainedFlag: {
        0: "selfContainedFlag::NON_SELF_CONTAINED",
        1: "selfContainedFlag::SELF_CONTAINED",
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
    subcellPosition_t: {
        0: "subcellPosition::subcell_slot_0",
        1: "subcellPosition::subcell_slot_1",
        2: "subcellPosition::subcell_slot_2",
        3: "subcellPosition::subcell_slot_3",
        4: "subcellPosition::subcell_slot_4",
        6: "subcellPosition::subcell_slot_6",
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
};
