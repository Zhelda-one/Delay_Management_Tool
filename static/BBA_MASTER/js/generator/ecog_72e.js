const puschReceiveRespCellPsMsgId = 0xE260;
const puschReceiveRespUePsMsgId = 0xE261;
const srsSuMimoReceiveRespPsMsgId = 0xE263;
const srsBmReceiveRespPsMsgId = 0xE268;
const srsRtBfReceiveRespPsMsgId = 0xE26D;
const rimReceiveRespPsMsgId = 0xE26F;

const commonMsgOffsetSize = 8;
const msgOffsetSizeWithElement = commonMsgOffsetSize + 4;
const msgOffsetSizeWithVersionAndElement = msgOffsetSizeWithElement + 4;
const commonHalfEcpriHeaderSize = 4;
const commonApplicationHeaderSize = 8
const commonHeaderSize = 16;
const commonNumberOfLayersRank2 = 2;

const puschNoisePowerSize = 4;
const puschNoisePerPrbSize = 273 * puschNoisePowerSize;

const puschNumOfGrants = 2;
const puschAntMeasSize = 15;
const puschGrantItemLength = 72;
const puschAntMeasItemLength = 40;
const sizeOfTotalNumOfGrants = 4;

const srsNumOfUes = 4;
const srsAntMeasSize = 16;
const srsReceiveRespPsUesItemLength = 48;
const srsAntMeasItemLength = 16;

const srsNumOfBmResources = 6;
const srsMaxSizeCovHorMatrix = 36;
const srsMaxSizeCovVerMatrix = 10;
const srsMaxNumBmPolarization = 2;
const srsRespBmPsResourcesItemLength = 36;
const srsCovarianceMatrixSrsItemLength = 4;

const srsMaxNumberOfSrsRtBfUes = 10;
const srsMaxNumOfSrsRtBfPorts = 4;
const srsRtBfUesDynItemLength = (4 + 4 + 1 + 4 + 2 + 1 + 1) * srsMaxNumOfSrsRtBfPorts;
const srsRtBfReceiveRespItemLength = 9;
const srsRtBfUeItemLength = 68;

const rimOfdmSymbolsPerSlot = 14;
const rimMaxNumRimRsDetections = 72;
const rimReceiveRespSubcellRssi = 4 * rimOfdmSymbolsPerSlot;
const rimRsDetectionReportItemLength = 16;

function ecog_get_bip_msg_size(messageId) {
    let msg_size = commonHalfEcpriHeaderSize + commonApplicationHeaderSize + commonHeaderSize;
    switch (messageId) {
        case puschReceiveRespCellPsMsgId:
            // msg_size + size of noisePower
            return msg_size + commonMsgOffsetSize + puschNoisePowerSize + puschNoisePerPrbSize;
        case puschReceiveRespUePsMsgId:
            // msg_size + size of totalNumOfGrants + msg.offset + size of grants and antenna measurements
            return msg_size + sizeOfTotalNumOfGrants + msgOffsetSizeWithVersionAndElement + ((puschGrantItemLength + (2 * 4 * commonNumberOfLayersRank2) + puschAntMeasItemLength * puschAntMeasSize) * puschNumOfGrants);
        case srsSuMimoReceiveRespPsMsgId:
            // msg_size + size of static fields + msg.offset + size of ueItems and dynamic data
            return msg_size + 4 + msgOffsetSizeWithVersionAndElement + ((srsReceiveRespPsUesItemLength + (4 * commonNumberOfLayersRank2) +
                srsAntMeasItemLength * srsAntMeasSize) * srsNumOfUes);
        case srsBmReceiveRespPsMsgId:
            // msg_size + size of static fields + msg.offset + size of resources and dynamic data
        return msg_size + 4 + msgOffsetSizeWithVersionAndElement + ((srsRespBmPsResourcesItemLength + srsCovarianceMatrixSrsItemLength *
                (srsMaxSizeCovHorMatrix + srsMaxSizeCovVerMatrix) + 4 * srsMaxNumBmPolarization) * srsNumOfBmResources);
        case srsRtBfReceiveRespPsMsgId:
            // msg_size + size of static fields + size of resources and dynamic data
        return msg_size + 4 + msgOffsetSizeWithVersionAndElement + ((srsRtBfUeItemLength + srsRtBfUesDynItemLength) * srsMaxNumberOfSrsRtBfUes);
        case rimReceiveRespPsMsgId:
            // msg_size + msg.offset + size of resources and dynamic data
        return msg_size + msgOffsetSizeWithVersionAndElement + commonMsgOffsetSize + (rimRsDetectionReportItemLength * rimMaxNumRimRsDetections) + rimReceiveRespSubcellRssi ;
    }
}

function encode_common_header(ptr, pkt, msg) {
    let offset = 0;
    let slot_per_subframe = 1 << ecog_config.u;
    msg.messageVersion = 0;
    msg.versionIndicator = 0;
    msg.sfn = pkt.frameId;
    msg.slot = pkt.slotId + pkt.subframeId * slot_per_subframe;
    msg.subcellId = 3;
    pcapSet4(ptr, offset, 8);
    offset += 4;
    pcapSet4(ptr, offset, msg.messageVersion);
    offset += 4;
    pcapSet4(ptr, offset, msg.messageVersion);
    offset += 4;
    pcapSet2(ptr, offset, msg.sfn);
    offset += 2;
    ptr[offset++] = msg.slot;
    ptr[offset++] = msg.subcellId;
    return commonHeaderSize;
}

function get_PuschReceiveRespCellPs(msg) {
    msg.offset = commonMsgOffsetSize;
    msg.length = 273;
    msg.noisePower = 0.5;
    msg.noisePerPrb = [];
    for (let i = 0; i < msg.length; i++) {
        msg.noisePerPrb[i] = i;
    }
}
function encode_PuschReceiveRespCellPs(msg, ptr, dv, start_offset, littleEndian) {
    let offset = start_offset;
    dv.setFloat32(offset, msg.noisePower, littleEndian);
    offset += 4;
    pcapSet4(ptr, offset, msg.offset);
    offset += 4;
    pcapSet4(ptr, offset, msg.length);
    offset += 4;
    for (let i = 0; i < msg.length; i++) {
        pcapSet4(ptr, offset, msg.noisePerPrb[i]);
        offset += 4;
    }
    return offset;
}

function get_PuschReceiveRespUePs(msg) {
    msg.versionIndicator = 0;
    msg.offset = msgOffsetSizeWithElement + sizeOfTotalNumOfGrants;
    msg.length = puschNumOfGrants;
    msg.elementSize = puschGrantItemLength;
    msg.totalNumOfGrants = puschNumOfGrants;
    msg.grants = [];
    for (let i1 = 0; i1 < msg.totalNumOfGrants; ++i1) {
        let grantsItem = {};
        grantsItem.rnti = 0x1000 + i1;
        grantsItem.dtx = 1;
        grantsItem.dtxMetric = 0.13;
        grantsItem.dtxThreshold = 0.14;
        grantsItem.shortTermCfoMetricReal = 0.1234;
        grantsItem.shortTermCfoMetricImag = 0.4321;
        grantsItem.shortTermTaMetric = 0x123;
        grantsItem.shortTermTaPeakAmp = 5.4321;
        grantsItem.rxPower = 90.123;
        grantsItem.rssi = 15.123;
        grantsItem.ulRank = 2;
        grantsItem.ulPmiRank1 = 1;
        grantsItem.ulPmiRank1Sinr = 5.123;
        grantsItem.ulPmiRank2 = 3;
        let ulPmiRank2Sinr = grantsItem.ulPmiRank2Sinr = [];
        ulPmiRank2Sinr.push(4.123, 3.123);
        let suPostCombSinr = grantsItem.suPostCombSinr = [];
        suPostCombSinr.push(4.001, 3.001);
        let puschAntMeas = grantsItem.puschAntMeas = [];
        for (let i2 = 0; i2 < puschAntMeasSize; ++i2) {
            let puschAntMeasItem = {};
            puschAntMeasItem.rxPowerOfAnt = 90.123 + i2;
            puschAntMeasItem.sinrOfAnt = 10.123 - i2;
            puschAntMeasItem.shortTermTaMetricOfAnt = 0x1234 - i1;
            puschAntMeasItem.shortTermTaPeakAmpOfAnt = 80.123;
            let shortTermCfoMetricOfAnt = puschAntMeasItem.shortTermCfoMetricOfAnt = {};
            shortTermCfoMetricOfAnt.I = 2.567;
            shortTermCfoMetricOfAnt.Q = 3.89;
            puschAntMeasItem.linRssiOfAnt = 0x123456789ABCDEF120n;
            puschAntMeasItem.linNoiseOfAnt = 0x87654320 + i2;
            puschAntMeas.push(puschAntMeasItem);
        }
        msg.grants.push(grantsItem);
    }
}

function encode_PuschReceiveRespUePs(msg, ptr, dv, start_offset, littleEndian) {
    let off1 = start_offset;
    let off2 = 0;
    pcapSet4(ptr, off1, msg.versionIndicator);
    off1 += 4;
    pcapSet4(ptr, off1, msg.offset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.length);
    off1 += 4;
    pcapSet4(ptr, off1, msg.elementSize);
    off1 += 4;
    ptr[off1] = msg.totalNumOfGrants;
    off1 += 4;
    let ulPmiRank2Sinr_start_offset = off1 + puschGrantItemLength * msg.totalNumOfGrants;
    let suPostCombSinr_start_offset = ulPmiRank2Sinr_start_offset + (4 * commonNumberOfLayersRank2) * msg.totalNumOfGrants;
    let puschAntMeasItem_start_offset = suPostCombSinr_start_offset + (4 * commonNumberOfLayersRank2) * msg.totalNumOfGrants;
    for (let i1 = 0; i1 < msg.totalNumOfGrants; ++i1) {
        let grantsItem = msg.grants.shift();
        pcapSet2(ptr, off1, grantsItem.rnti);
        pcapSet2(ptr, off1 + 2, grantsItem.shortTermTaMetric);
        dv.setFloat32(off1 + 4, grantsItem.shortTermTaPeakAmp, littleEndian);
        dv.setFloat32(off1 + 8, grantsItem.shortTermCfoMetricReal, littleEndian);
        dv.setFloat32(off1 + 12, grantsItem.shortTermCfoMetricImag, littleEndian);
        dv.setFloat32(off1 + 16, grantsItem.rxPower, littleEndian);
        dv.setFloat32(off1 + 20, grantsItem.rssi, littleEndian);
        ptr[off1 + 24] = grantsItem.dtx;
        ptr[off1 + 25] = grantsItem.ulRank;
        ptr[off1 + 26] = grantsItem.ulPmiRank1;
        ptr[off1 + 27] = grantsItem.ulPmiRank2;
        dv.setFloat32(off1 + 28, grantsItem.ulPmiRank1Sinr, littleEndian);
        off2 = ulPmiRank2Sinr_start_offset + (4 * commonNumberOfLayersRank2) * i1;
        pcapSet4(ptr, off1 + 32, off2 - (off1 + 32));
        pcapSet4(ptr, off1 + 36, commonNumberOfLayersRank2);
        dv.setFloat32(off2, grantsItem.ulPmiRank2Sinr[0], littleEndian);
        dv.setFloat32(off2 + 4, grantsItem.ulPmiRank2Sinr[1], littleEndian);
        dv.setFloat32(off1 + 40, grantsItem.dtxMetric, littleEndian);
        dv.setFloat32(off1 + 44, grantsItem.dtxThreshold, littleEndian);
        off2 = suPostCombSinr_start_offset + (4 * commonNumberOfLayersRank2) * i1;
        pcapSet4(ptr, off1 + 48, off2 - (off1 + 48));
        pcapSet4(ptr, off1 + 52, commonNumberOfLayersRank2);
        dv.setFloat32(off2, grantsItem.suPostCombSinr[0], littleEndian);
        dv.setFloat32(off2 + 4, grantsItem.suPostCombSinr[1], littleEndian);
        off2 = puschAntMeasItem_start_offset + puschAntMeasItemLength * puschAntMeasSize * i1;
        pcapSet4(ptr, off1 + 56, msg.versionIndicator);
        pcapSet4(ptr, off1 + 60, off2 - (off1 + 60));
        pcapSet4(ptr, off1 + 64, puschAntMeasSize);
        pcapSet4(ptr, off1 + 68, puschAntMeasItemLength);
        for (let i2 = 0; i2 < puschAntMeasSize; ++i2) {
            let puschAntMeasItem = grantsItem.puschAntMeas.shift();
            dv.setFloat32(off2, puschAntMeasItem.rxPowerOfAnt, littleEndian);
            dv.setFloat32(off2 + 4, puschAntMeasItem.sinrOfAnt, littleEndian);
            pcapSet2(ptr, off2 + 8, puschAntMeasItem.shortTermTaMetricOfAnt);
            dv.setFloat32(off2 + 12, puschAntMeasItem.shortTermTaPeakAmpOfAnt, littleEndian);
            let shortTermCfoMetricOfAnt = puschAntMeasItem.shortTermCfoMetricOfAnt;
            dv.setFloat32(off2 + 16, shortTermCfoMetricOfAnt.I, littleEndian);
            dv.setFloat32(off2 + 20, shortTermCfoMetricOfAnt.Q, littleEndian);
            dv.setBigUint64(off2 + 24, puschAntMeasItem.linRssiOfAnt, littleEndian);
            pcapSet4(ptr, off2 + 32, puschAntMeasItem.linNoiseOfAnt);
            off2 += puschAntMeasItemLength;
        }
        off1 += puschGrantItemLength;
    }
    return off2;
}

function get_SrsSuMimoReceiveRespPs(msg) {
    let sizeOfStaticFields = 4;
    msg.versionIndicator = 0;
    msg.offset = msgOffsetSizeWithElement + sizeOfStaticFields;
    msg.length = srsNumOfUes;
    msg.elementSize = srsReceiveRespPsUesItemLength;
    msg.symbolPosition = 12;
    msg.totalNumOfUEs = srsNumOfUes;
    msg.srsReceiveRespPsUes = [];
    for (let i1 = 0; i1 < msg.totalNumOfUEs; ++i1) {
        let uesItem = {};
        uesItem.rnti = 0x1000 + i1;
        uesItem.ulRank = 2;
        uesItem.ulPmiRank1 = 1;
        uesItem.ulPmiRank1Sinr = 5.123;
        uesItem.ulPmiRank2 = 3;
        let ulPmiRank2Sinr = uesItem.ulPmiRank2Sinr = [];
        ulPmiRank2Sinr.push(4.123, 3.123);
        uesItem.sinr = -1.234;
        uesItem.dtx = 1;
        uesItem.numOfSrsTxPorts = 4;
        uesItem.shortTermTaMetric = -58;
        uesItem.shortTermTaPeakAmp = 1.4497;
        let srsAntMeas = uesItem.srsAntMeas = [];
        for (let i2 = 0; i2 < srsAntMeasSize; ++i2) {
            let srsAntMeasItem = {};
            srsAntMeasItem.rxPowerOfAnt = 90.123 + i2;
            srsAntMeasItem.sinrOfAnt = 10.123 - i2;
            srsAntMeasItem.shortTermTaMetricOfAnt = 0x1234 - i1;
            srsAntMeasItem.shortTermTaPeakAmpOfAnt = 80.123;
            srsAntMeas.push(srsAntMeasItem);
        }
        msg.srsReceiveRespPsUes.push(uesItem);
    }
}

function encode_SrsSuMimoReceiveRespPs(msg, ptr, dv, start_offset, littleEndian) {
    let off1 = start_offset;
    let off2 = 0;
    pcapSet4(ptr, off1, msg.versionIndicator);
    off1 += 4;
    pcapSet4(ptr, off1, msg.offset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.length);
    off1 += 4;
    pcapSet4(ptr, off1, msg.elementSize);
    off1 += 4;
    ptr[off1++] = msg.symbolPosition;
    ptr[off1++] = msg.totalNumOfUEs;
    off1 += 2; // padding

    let ulPmiRank2Sinr_start_offset = off1 + srsReceiveRespPsUesItemLength * msg.totalNumOfUEs;
    let srsAntMeasItem_start_offset = ulPmiRank2Sinr_start_offset + (4 * commonNumberOfLayersRank2) * msg.totalNumOfUEs;
    for (let i1 = 0; i1 < msg.totalNumOfUEs; ++i1) {
        let uesItem = msg.srsReceiveRespPsUes.shift();
        pcapSet2(ptr, off1, uesItem.rnti);
        pcapSet2(ptr, off1 + 2, uesItem.shortTermTaMetric);
        dv.setFloat32(off1 + 4, uesItem.shortTermTaPeakAmp, littleEndian);
        dv.setFloat32(off1 + 8, uesItem.sinr, littleEndian);
        ptr[off1 + 12] = uesItem.dtx;
        ptr[off1 + 13] = uesItem.ulRank;
        ptr[off1 + 14] = uesItem.ulPmiRank1;
        ptr[off1 + 15] = uesItem.ulPmiRank2;
        dv.setFloat32(off1 + 16, uesItem.ulPmiRank1Sinr, littleEndian);
        off2 = ulPmiRank2Sinr_start_offset + (4 * commonNumberOfLayersRank2) * i1;
        pcapSet4(ptr, off1 + 20, off2 - (off1 + 20));
        pcapSet4(ptr, off1 + 24, commonNumberOfLayersRank2);
        dv.setFloat32(off2, uesItem.ulPmiRank2Sinr[0], littleEndian);
        dv.setFloat32(off2 + 4, uesItem.ulPmiRank2Sinr[1], littleEndian);
        off2 = srsAntMeasItem_start_offset + srsAntMeasItemLength * srsAntMeasSize * i1;
        pcapSet4(ptr, off1 + 28, msg.versionIndicator);
        pcapSet4(ptr, off1 + 32, off2 - (off1 + 32));
        pcapSet4(ptr, off1 + 36, srsAntMeasSize);
        pcapSet4(ptr, off1 + 40, srsAntMeasItemLength);
        for (let i2 = 0; i2 < srsAntMeasSize; ++i2) {
            let srsAntMeasItem = uesItem.srsAntMeas.shift();
            dv.setFloat32(off2, srsAntMeasItem.rxPowerOfAnt, littleEndian);
            dv.setFloat32(off2 + 4, srsAntMeasItem.sinrOfAnt, littleEndian);
            pcapSet2(ptr, off2 + 8, srsAntMeasItem.shortTermTaMetricOfAnt);
            dv.setFloat32(off2 + 12, srsAntMeasItem.shortTermTaPeakAmpOfAnt, littleEndian);
            off2 += srsAntMeasItemLength;
        }
        ptr[off1 + 44] = uesItem.numOfSrsTxPorts;
        off1 += srsReceiveRespPsUesItemLength;
    }
    return off2;
}

function get_SrsBmReceiveRespPs(msg) {
    let sizeOfStaticFields = 4;
    msg.versionIndicator = 0;
    msg.offset = msgOffsetSizeWithElement + sizeOfStaticFields;
    msg.length = srsNumOfBmResources;
    msg.elementSize = srsRespBmPsResourcesItemLength;
    msg.polarization = 0;
    msg.symbolPosition = 12;
    msg.totalNumOfSrsBmResources = srsNumOfBmResources;
    msg.srsRespBmPsResources = [];
    for (let i1 = 0; i1 < msg.totalNumOfSrsBmResources; ++i1) {
        let resourcesItem = {};
        resourcesItem.srsBmSubbandId = 2;
        resourcesItem.transmissionCombId = 1;
        resourcesItem.bmCyclicShift = 5;
        resourcesItem.srsResourceIdentity = 3;
        resourcesItem.rnti = 0x1000 + i1;
        resourcesItem.scalingHorizontal = 2;
        resourcesItem.scalingVertical = 2;
        let covarianceMatrixHorizontal = resourcesItem.covarianceMatrixHorizontal = [];
        for (let i2 = 0; i2 < srsMaxSizeCovHorMatrix; ++i2) {
            let covarianceMatrixHorizontalItem = {};
            covarianceMatrixHorizontalItem.covMatrixReal = i2;
            covarianceMatrixHorizontalItem.covMatrixImag = i2;
            covarianceMatrixHorizontal.push(covarianceMatrixHorizontalItem)
        }
        let covarianceMatrixVertical = resourcesItem.covarianceMatrixVertical = [];
        for (let i2 = 0; i2 < srsMaxSizeCovVerMatrix; ++i2) {
            let covarianceMatrixVerticalItem = {};
            covarianceMatrixVerticalItem.covMatrixReal = i2;
            covarianceMatrixVerticalItem.covMatrixImag = i2;
            covarianceMatrixVertical.push(covarianceMatrixVerticalItem)
        }
        let srsPower = resourcesItem.srsPower = [];
        srsPower.push(90.123, 90.124);
        resourcesItem.dtx = 1;
        msg.srsRespBmPsResources.push(resourcesItem);
    }
}

function encode_SrsBmReceiveRespPs(msg, ptr, dv, start_offset, littleEndian) {
    let off1 = start_offset;
    let off2 = 0;

    pcapSet4(ptr, off1, msg.versionIndicator);
    off1 += 4;
    pcapSet4(ptr, off1, msg.offset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.length);
    off1 += 4;
    pcapSet4(ptr, off1, msg.elementSize);
    off1 += 4;
    ptr[off1++] = msg.polarization;
    ptr[off1++] = msg.symbolPosition;
    pcapSet2(ptr, off1, msg.totalNumOfSrsBmResources);
    off1 += 2;
    let covarianceMatrixHorizontal_start_offset = off1 + srsRespBmPsResourcesItemLength * msg.totalNumOfSrsBmResources;
    let covarianceMatrixVertical_start_offset = covarianceMatrixHorizontal_start_offset +
        srsCovarianceMatrixSrsItemLength * srsMaxSizeCovHorMatrix * msg.totalNumOfSrsBmResources;
    let srsPower_start_offset = covarianceMatrixVertical_start_offset +
        srsCovarianceMatrixSrsItemLength * srsMaxSizeCovVerMatrix * msg.totalNumOfSrsBmResources;
    for (let i1 = 0; i1 < msg.totalNumOfSrsBmResources; ++i1) {
        let resourcesItem = msg.srsRespBmPsResources.shift();
        ptr[off1] = resourcesItem.srsBmSubbandId
        ptr[off1 + 1] = resourcesItem.transmissionCombId;
        ptr[off1 + 2] = resourcesItem.bmCyclicShift;
        ptr[off1 + 3] = resourcesItem.srsResourceIdentity;
        pcapSet2(ptr, off1 + 4, resourcesItem.rnti);
        ptr[off1 + 6] = resourcesItem.scalingHorizontal;
        ptr[off1 + 7] = resourcesItem.scalingVertical;
        off2 = covarianceMatrixHorizontal_start_offset + srsCovarianceMatrixSrsItemLength * srsMaxSizeCovHorMatrix * i1;
        pcapSet4(ptr, off1 + 8, off2 - (off1 + 8));
        pcapSet4(ptr, off1 + 12, srsMaxSizeCovHorMatrix);
        for (let i2 = 0; i2 < srsMaxSizeCovHorMatrix; ++i2) {
            let covarianceMatrixHorizontalItem = resourcesItem.covarianceMatrixHorizontal.shift();
            pcapSet2(ptr, off2, covarianceMatrixHorizontalItem.covMatrixReal);
            pcapSet2(ptr, off2 + 2, covarianceMatrixHorizontalItem.covMatrixImag);
            off2 += srsCovarianceMatrixSrsItemLength;
        }
        off2 = covarianceMatrixVertical_start_offset + srsCovarianceMatrixSrsItemLength * srsMaxSizeCovVerMatrix * i1;
        pcapSet4(ptr, off1 + 16, off2 - (off1 + 16));
        pcapSet4(ptr, off1 + 20, srsMaxSizeCovVerMatrix);
        for (let i2 = 0; i2 < srsMaxSizeCovVerMatrix; ++i2) {
            let covarianceMatrixVerticalItem = resourcesItem.covarianceMatrixVertical.shift();
            pcapSet2(ptr, off2, covarianceMatrixVerticalItem.covMatrixReal);
            pcapSet2(ptr, off2 + 2, covarianceMatrixVerticalItem.covMatrixImag);
            off2 += srsCovarianceMatrixSrsItemLength;
        }
        off2 = srsPower_start_offset + (4 * srsMaxNumBmPolarization) * i1;
        pcapSet4(ptr, off1 + 24, off2 - (off1 + 24));
        pcapSet4(ptr, off1 + 28, srsMaxNumBmPolarization);
        dv.setFloat32(off2, resourcesItem.srsPower[0], littleEndian);
        dv.setFloat32(off2 + 4, resourcesItem.srsPower[1], littleEndian);
        off2 += 4 * srsMaxNumBmPolarization;
        ptr[off1 + 32] = resourcesItem.dtx;
        off1 += srsRespBmPsResourcesItemLength;
    }
    return off2;
}

function get_SrsRtBfReceiveRespPs(msg) {
    let sizeOfStaticFields = 4;
    msg.versionIndicator = 0;
    msg.offset = msgOffsetSizeWithElement + sizeOfStaticFields;
    msg.length = srsMaxNumberOfSrsRtBfUes;
    msg.elementSize = srsRtBfUeItemLength;

    msg.totalNumOfUEs = srsMaxNumberOfSrsRtBfUes;
    msg.srsReceiveRespRtBfPsUes = [];

    for (let i = 0; i < msg.totalNumOfUEs; ++i) {
        let resourcesItem = {};

        resourcesItem.rnti = 0x1010 + i;
        resourcesItem.rtBfUeIndex = i;

        resourcesItem.portPower = [];
        resourcesItem.sinr = [];
        resourcesItem.dtx = [];
        resourcesItem.correlation = [];
        resourcesItem.numInterferedBfSubband = [];
        resourcesItem.interferedSrsSubband = [];
        resourcesItem.portIndex = [];
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            resourcesItem.portPower.push(0.1 + i2);
            resourcesItem.sinr.push(20.0 + i2);
            resourcesItem.dtx.push(i2);
            resourcesItem.correlation.push(1.1 + i2);
            resourcesItem.numInterferedBfSubband.push(0x3030 + i2);
            resourcesItem.interferedSrsSubband.push(0x10 + i2);
            resourcesItem.portIndex.push(i2);
        }

        resourcesItem.symbolPosition = 12;
        resourcesItem.srsResourceIdentity = i;
        resourcesItem.timingOffset = 0x2020 + i;
        resourcesItem.srsSubbandId = i;

        msg.srsReceiveRespRtBfPsUes.push(resourcesItem);
    }
}

function encode_SrsRtBfReceiveRespPs(msg, ptr, dv, start_offset, littleEndian) {
    let off1 = start_offset;
    let off2 = 0;
    let size_float = 4;
    let size_8 = 1;
    let size_16 = 2;

    pcapSet4(ptr, off1, msg.versionIndicator);
    off1 += 4;
    pcapSet4(ptr, off1, msg.offset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.length);
    off1 += 4;
    pcapSet4(ptr, off1, msg.elementSize);
    off1 += 4;
    pcapSet4(ptr, off1, msg.totalNumOfUEs);
    off1 += 4;

    let portPower_start_offset = off1 + srsRtBfUeItemLength * msg.totalNumOfUEs;
    let sinr_start_offset = portPower_start_offset + size_float * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;
    let dtx_start_offset = sinr_start_offset + size_8 * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;
    let correlation_start_offset = dtx_start_offset + size_float * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;
    let numIntBfSubBand_start_offset = correlation_start_offset + size_16 * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;
    let intSrsSubBand_start_offset = numIntBfSubBand_start_offset + size_8 * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;
    let portIdx_start_offset = intSrsSubBand_start_offset + size_float + size_8 * srsMaxNumOfSrsRtBfPorts * msg.totalNumOfUEs;

    for (let i1 = 0; i1 < msg.totalNumOfUEs; ++i1) {
        let resourcesItem = msg.srsReceiveRespRtBfPsUes.shift();

        pcapSet2(ptr, off1, resourcesItem.rnti);
        pcapSet2(ptr, off1 + 2, resourcesItem.rtBfUeIndex);

        off2 = portPower_start_offset + size_float * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 4, off2 - (off1 + 4));
        pcapSet4(ptr, off1 + 8, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            dv.setFloat32(off2, resourcesItem.portPower[i2], littleEndian);
            off2 += size_float;
        }

        off2 = sinr_start_offset + size_float * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 12, off2 - (off1 + 12));
        pcapSet4(ptr, off1 + 16, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            dv.setFloat32(off2, resourcesItem.sinr[i2], littleEndian);
            off2 += size_float;
        }

        off2 = dtx_start_offset + size_8 * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 20, off2 - (off1 + 20));
        pcapSet4(ptr, off1 + 24, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            ptr[off2] = resourcesItem.dtx[i2];
            off2 += size_8;
        }

        off2 = correlation_start_offset + size_float * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 28, off2 - (off1 + 28));
        pcapSet4(ptr, off1 + 32, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            dv.setFloat32(off2, resourcesItem.correlation[i2], littleEndian);
            off2 += size_float;
        }

        off2 = numIntBfSubBand_start_offset + size_16 * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 36, off2 - (off1 + 36));
        pcapSet4(ptr, off1 + 40, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            pcapSet2(ptr, off2, resourcesItem.numInterferedBfSubband[i2]);
            off2 += size_16;
        }

        off2 = intSrsSubBand_start_offset + size_8 * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 44, off2 - (off1 + 44));
        pcapSet4(ptr, off1 + 48, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            ptr[off2] = resourcesItem.interferedSrsSubband[i2];
            off2 += size_8;
        }

        ptr[off1 + 52] = resourcesItem.symbolPosition;
        ptr[off1 + 53] = resourcesItem.srsResourceIdentity;
        pcapSet2(ptr, off1 + 54, resourcesItem.timingOffset);

        off2 = portIdx_start_offset + size_8 * srsMaxNumOfSrsRtBfPorts * i1;
        pcapSet4(ptr, off1 + 56, off2 - (off1 + 56));
        pcapSet4(ptr, off1 + 60, srsMaxNumOfSrsRtBfPorts);
        for (let i2 = 0; i2 < srsMaxNumOfSrsRtBfPorts; ++i2) {
            ptr[off2] = resourcesItem.portIndex[i2];
            off2 += size_8;
        }

        ptr[off1 + 64] = resourcesItem.srsSubbandId;
        off1 += srsRtBfUeItemLength;
    }

    return off2;
}

function get_RimReceiveRespPs(msg) {
    msg.versionIndicator = 0;
    msg.reportOffset = msgOffsetSizeWithElement + commonMsgOffsetSize;
    msg.reportLength = rimMaxNumRimRsDetections;
    msg.elementSize = rimRsDetectionReportItemLength;
    msg.rssiOffset = commonMsgOffsetSize;
    msg.rssiLength = rimOfdmSymbolsPerSlot;

    msg.rimRsDetectionReport = [];
    msg.rimRssi = [];

    for (let i1 = 0; i1 < rimMaxNumRimRsDetections; ++i1) {
        let detectionResUnit = {};
        detectionResUnit.nScid = 0x5050 + 0x10 * i1;
        detectionResUnit.symbolIndex = 13;
        detectionResUnit.startPrb = 100 + i1;
        detectionResUnit.rimRsSignalPower = 0.3414;
        detectionResUnit.rimRsPeakValue = 0.994;
        detectionResUnit.rimRsPeakPosition = 0x6060 + i1;
        msg.rimRsDetectionReport.push(detectionResUnit);
    }

    for (let i1 = 0; i1 < rimOfdmSymbolsPerSlot; ++i1) {
            msg.rimRssi.push(1.2 * i1);
    }

}

function encode_RimReceiveRespPs(msg, ptr, dv, start_offset, littleEndian) {
    let off1 = start_offset;
    pcapSet4(ptr, off1, msg.versionIndicator);
    off1 += 4;
    pcapSet4(ptr, off1, msg.reportOffset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.reportLength);
    off1 += 4;
    pcapSet4(ptr, off1, msg.elementSize);
    off1 += 4;
    pcapSet4(ptr, off1, msg.rssiOffset);
    off1 += 4;
    pcapSet4(ptr, off1, msg.rssiLength);
    off1 += 4;

    for (let i2 = 0; i2 < rimMaxNumRimRsDetections; ++i2) {
        pcapSet2(ptr, off1, msg.rimRsDetectionReport[i2].nScid);
        pcapSet2(ptr, off1 + 2, msg.rimRsDetectionReport[i2].startPrb);
        dv.setFloat32(off1 + 4, msg.rimRsDetectionReport[i2].rimRsSignalPower, littleEndian);
        dv.setFloat32(off1 + 8, msg.rimRsDetectionReport[i2].rimRsPeakValue, littleEndian);
        pcapSet2(ptr, off1 + 12, msg.rimRsDetectionReport[i2].rimRsPeakPosition);
        ptr[off1 + 16] = msg.rimRsDetectionReport[i2].symbolIndex;
        off1 += rimRsDetectionReportItemLength;
    }

    pcapSet4(ptr, off1, msg.rssiOffset);
    pcapSet4(ptr, off1 + 4, msg.rssiLength);
    off1 += commonMsgOffsetSize;

    for (let i2 = 0; i2 < rimOfdmSymbolsPerSlot; ++i2) {
        pcapSet4(ptr, off1, msg.rimRssi[i2]);
        off1 += 4;
    }

    return off1;
}

function ecog_encode_bip_msg(pcapBuffer, pcapPtrOffset, pkt, littleEndian) {
    let ptr = new Uint8Array(pcapBuffer, pcapPtrOffset);
    let dv = new DataView(pcapBuffer, pcapPtrOffset);
    let msg = {};
    let start_offset = encode_common_header(ptr, pkt, msg);
    switch (pkt.messageId) {
        case puschReceiveRespCellPsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/24R2_FB2324_460#L5398
            get_PuschReceiveRespCellPs(msg);
            return encode_PuschReceiveRespCellPs(msg, ptr, dv, start_offset, littleEndian);
        }
        case puschReceiveRespUePsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/24R2_FB2324_460#L5405
            get_PuschReceiveRespUePs(msg);
            return encode_PuschReceiveRespUePs(msg, ptr, dv, start_offset, littleEndian);
        }
        case srsSuMimoReceiveRespPsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/24R2_FB2324_460#L5544
            get_SrsSuMimoReceiveRespPs(msg);
            return encode_SrsSuMimoReceiveRespPs(msg, ptr, dv, start_offset, littleEndian);
        }
        case srsBmReceiveRespPsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/24R2_FB2324_460#L5473
            get_SrsBmReceiveRespPs(msg);
            return encode_SrsBmReceiveRespPs(msg, ptr, dv, start_offset, littleEndian);
        }
        case srsRtBfReceiveRespPsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/25R2_FB2419_599#L6024
            get_SrsRtBfReceiveRespPs(msg);
            return encode_SrsRtBfReceiveRespPs(msg, ptr, dv, start_offset, littleEndian);
        }
        case rimReceiveRespPsMsgId: {
            // Based upon https://wrgitlab.int.net.nokia.com/bbanalyzer/bba/-/blob/master/multi/25R2_FB2419_599#L5132
            get_RimReceiveRespPs(msg);
            return encode_RimReceiveRespPs(msg, ptr, dv, start_offset, littleEndian);
        }
    }
}
