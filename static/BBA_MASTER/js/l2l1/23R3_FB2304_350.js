function L1ConfigdecodecellSlotConfiguration_t(offset) {
    let result = {};

    result.lowestSlotId = l2l1_getU32(offset + 0);
    result.cellSlotsAmount = l2l1_getU32(offset + 4);
    result.unusedSlotsAmount = l2l1_getU32(offset + 8);

    return result;
}
function L1ConfigencodecellSlotConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.lowestSlotId, buf, off + 0);
    l2l1_putU32(msg.cellSlotsAmount, buf, off + 4);
    l2l1_putU32(msg.unusedSlotsAmount, buf, off + 8);
}
function L1Configdecodel1SubPoolConfiguration_t(offset) {
    let result = {};

    result.subpoolId = l2l1_getU32(offset + 0);
    result.ratMode = l2l1_getU8(offset + 4);
/*    if (!(result.ratMode === [object Object] || result.ratMode === [object Object]))
        throw new Error(`Value ${result.ratMode} is out of range for enum 'ratMode_t'`); */
    Object.defineProperty(result, "__enum_ratMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_ratMode_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 5);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_fronthaulMode_t",
    });
    result.domain = l2l1_getU8(offset + 6);
/*    if (!(result.domain === [object Object] || result.domain === [object Object] || result.domain === [object Object]))
        throw new Error(`Value ${result.domain} is out of range for enum 'domain_t'`); */
    Object.defineProperty(result, "__enum_domain", {
        enumerable: false,
        writable: false,
        value: "L1Config_domain_t",
    });
    result.duplexMode = l2l1_getU8(offset + 7);
/*    if (!(result.duplexMode === [object Object] || result.duplexMode === [object Object]))
        throw new Error(`Value ${result.duplexMode} is out of range for enum 'duplexMode_t'`); */
    Object.defineProperty(result, "__enum_duplexMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_duplexMode_t",
    });
    result.frequencyRange = l2l1_getU8(offset + 8);
/*    if (!(result.frequencyRange === [object Object] || result.frequencyRange === [object Object] || result.frequencyRange === [object Object] || result.frequencyRange === [object Object]))
        throw new Error(`Value ${result.frequencyRange} is out of range for enum 'frequencyRange_t'`); */
    Object.defineProperty(result, "__enum_frequencyRange", {
        enumerable: false,
        writable: false,
        value: "L1Config_frequencyRange_t",
    });
    result.maxNumOfDataStreamsPerCell = l2l1_getU32(offset + 12);
    result.maxNumOfDataLayersPerCell = l2l1_getU32(offset + 16);
    result.cellSlotConfiguration = L1ConfigdecodecellSlotConfiguration_t(offset + 20);

    return result;
}
function L1Configencodel1SubPoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.subpoolId, buf, off + 0);
    l2l1_putU8(msg.ratMode, buf, off + 4);
    l2l1_putU8(msg.fronthaulMode, buf, off + 5);
    l2l1_putU8(msg.domain, buf, off + 6);
    l2l1_putU8(msg.duplexMode, buf, off + 7);
    l2l1_putU8(msg.frequencyRange, buf, off + 8);
    l2l1_putU32(msg.maxNumOfDataStreamsPerCell, buf, off + 12);
    l2l1_putU32(msg.maxNumOfDataLayersPerCell, buf, off + 16);
    L1ConfigencodecellSlotConfiguration_t(msg.cellSlotConfiguration, buf, off + 20);
}
function L1Configdecodel1PoolConfiguration_t(offset) {
    let result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.isPrbPoolingEnabled = l2l1_getU8(offset + 4);
    result.l1SubPoolConfiguration = decodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(offset + 8);

    return result;
}
function L1Configencodel1PoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    l2l1_putU8(msg.isPrbPoolingEnabled, buf, off + 4);
    encodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(msg.l1SubPoolConfiguration, buf, off + 8);
}
function L1ConfigdecodeSwConfigurationReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.isEcpriIqForwardingEnabled = l2l1_getU8(offset + 4);
    result.isCpriIqForwardingEnabled = l2l1_getU8(offset + 5);
    result.l1PoolConfiguration = decodeDynamicVariableSizedArray_l1PoolConfiguration_t_2(offset + 8);

    return result;
}
function L1ConfigencodeSwConfigurationReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.isEcpriIqForwardingEnabled, buf, off + 4);
    l2l1_putU8(msg.isCpriIqForwardingEnabled, buf, off + 5);
    encodeDynamicVariableSizedArray_l1PoolConfiguration_t_2(msg.l1PoolConfiguration, buf, off + 8);
}
function L1Configdecodel1PoolConfiguration_t(offset) {
    let result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.isPrbPoolingEnabled = l2l1_getU8(offset + 4);
    result.l1SubPoolConfiguration = decodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(offset + 8);

    return result;
}
function L1Configencodel1PoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    l2l1_putU8(msg.isPrbPoolingEnabled, buf, off + 4);
    encodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(msg.l1SubPoolConfiguration, buf, off + 8);
}
function L1Configdecodel1SubPoolConfiguration_t(offset) {
    let result = {};

    result.subpoolId = l2l1_getU32(offset + 0);
    result.ratMode = l2l1_getU8(offset + 4);
/*    if (!(result.ratMode === [object Object] || result.ratMode === [object Object]))
        throw new Error(`Value ${result.ratMode} is out of range for enum 'ratMode_t'`); */
    Object.defineProperty(result, "__enum_ratMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_ratMode_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 5);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_fronthaulMode_t",
    });
    result.domain = l2l1_getU8(offset + 6);
/*    if (!(result.domain === [object Object] || result.domain === [object Object] || result.domain === [object Object]))
        throw new Error(`Value ${result.domain} is out of range for enum 'domain_t'`); */
    Object.defineProperty(result, "__enum_domain", {
        enumerable: false,
        writable: false,
        value: "L1Config_domain_t",
    });
    result.duplexMode = l2l1_getU8(offset + 7);
/*    if (!(result.duplexMode === [object Object] || result.duplexMode === [object Object]))
        throw new Error(`Value ${result.duplexMode} is out of range for enum 'duplexMode_t'`); */
    Object.defineProperty(result, "__enum_duplexMode", {
        enumerable: false,
        writable: false,
        value: "L1Config_duplexMode_t",
    });
    result.frequencyRange = l2l1_getU8(offset + 8);
/*    if (!(result.frequencyRange === [object Object] || result.frequencyRange === [object Object] || result.frequencyRange === [object Object] || result.frequencyRange === [object Object]))
        throw new Error(`Value ${result.frequencyRange} is out of range for enum 'frequencyRange_t'`); */
    Object.defineProperty(result, "__enum_frequencyRange", {
        enumerable: false,
        writable: false,
        value: "L1Config_frequencyRange_t",
    });
    result.maxNumOfDataStreamsPerCell = l2l1_getU32(offset + 12);
    result.maxNumOfDataLayersPerCell = l2l1_getU32(offset + 16);
    result.cellSlotConfiguration = L1ConfigdecodecellSlotConfiguration_t(offset + 20);

    return result;
}
function L1Configencodel1SubPoolConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.subpoolId, buf, off + 0);
    l2l1_putU8(msg.ratMode, buf, off + 4);
    l2l1_putU8(msg.fronthaulMode, buf, off + 5);
    l2l1_putU8(msg.domain, buf, off + 6);
    l2l1_putU8(msg.duplexMode, buf, off + 7);
    l2l1_putU8(msg.frequencyRange, buf, off + 8);
    l2l1_putU32(msg.maxNumOfDataStreamsPerCell, buf, off + 12);
    l2l1_putU32(msg.maxNumOfDataLayersPerCell, buf, off + 16);
    L1ConfigencodecellSlotConfiguration_t(msg.cellSlotConfiguration, buf, off + 20);
}
function L1ConfigdecodecellSlotConfiguration_t(offset) {
    let result = {};

    result.lowestSlotId = l2l1_getU32(offset + 0);
    result.cellSlotsAmount = l2l1_getU32(offset + 4);
    result.unusedSlotsAmount = l2l1_getU32(offset + 8);

    return result;
}
function L1ConfigencodecellSlotConfiguration_t(msg, buf, off) {
    l2l1_putU32(msg.lowestSlotId, buf, off + 0);
    l2l1_putU32(msg.cellSlotsAmount, buf, off + 4);
    l2l1_putU32(msg.unusedSlotsAmount, buf, off + 8);
}
function L1Configdecodel1SubPoolStatus_t(offset) {
    let result = {};

    result.subPoolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Config_status_t",
    });

    return result;
}
function L1Configencodel1SubPoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.subPoolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1Configdecodel1PoolStatus_t(offset) {
    let result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Config_status_t",
    });
    result.l1SubPoolStatus = decodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(offset + 8);

    return result;
}
function L1Configencodel1PoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
    encodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(msg.l1SubPoolStatus, buf, off + 8);
}
function L1ConfigdecodeSwConfigurationResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.l1PoolStatus = decodeDynamicVariableSizedArray_l1PoolStatus_t_2(offset + 4);

    return result;
}
function L1ConfigencodeSwConfigurationResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    encodeDynamicVariableSizedArray_l1PoolStatus_t_2(msg.l1PoolStatus, buf, off + 4);
}
function L1Configdecodel1PoolStatus_t(offset) {
    let result = {};

    result.poolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Config_status_t",
    });
    result.l1SubPoolStatus = decodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(offset + 8);

    return result;
}
function L1Configencodel1PoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.poolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
    encodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(msg.l1SubPoolStatus, buf, off + 8);
}
function L1Configdecodel1SubPoolStatus_t(offset) {
    let result = {};

    result.subPoolId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Config_status_t",
    });

    return result;
}
function L1Configencodel1SubPoolStatus_t(msg, buf, off) {
    l2l1_putU32(msg.subPoolId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1ConfigdecodeAutohealingActivationReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.isAutohealingEnabled = l2l1_getU8(offset + 4);

    return result;
}
function L1ConfigencodeAutohealingActivationReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.isAutohealingEnabled, buf, off + 4);
}
function L1ConfigdecodeAutohealingActivationResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusAutohealing_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Config_statusAutohealing_t",
    });

    return result;
}
function L1ConfigencodeAutohealingActivationResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1CpridecodeAlarmInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.l1AlarmStates = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeAlarmInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.l1AlarmStates, buf, off + 4);
}
function L1CpridecodeSCpriLinkItem(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.scramblingSeed = l2l1_getU32(offset + 4);
    result.cpriPointerP = l2l1_getU32(offset + 8);
    result.optLinkLength = l2l1_getU32(offset + 12);
    result.cpriProtocolVersion = l2l1_getU8(offset + 16);

    return result;
}
function L1CpriencodeSCpriLinkItem(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.scramblingSeed, buf, off + 4);
    l2l1_putU32(msg.cpriPointerP, buf, off + 8);
    l2l1_putU32(msg.optLinkLength, buf, off + 12);
    l2l1_putU8(msg.cpriProtocolVersion, buf, off + 16);
}
function L1CpridecodeConfigureLinksReq_t(offset) {
    let result = {};

    result.l1_StartupTimer = l2l1_getU32(offset + 0);
    result.numOfItems = l2l1_getU32(offset + 4);
    result.cpriLink = decodeStaticVariableSizedArray_SCpriLinkItem_16(offset + 8);
    result.dlCpriLinkMapConfig = l2l1_getU8(offset + 332);
/*    if (!(result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object]))
        throw new Error(`Value ${result.dlCpriLinkMapConfig} is out of range for enum 'ECellMap'`); */
    Object.defineProperty(result, "__enum_dlCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECellMap",
    });
    result.ulCpriLinkMapConfig = l2l1_getU8(offset + 333);
/*    if (!(result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object]))
        throw new Error(`Value ${result.ulCpriLinkMapConfig} is out of range for enum 'ECellMap'`); */
    Object.defineProperty(result, "__enum_ulCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECellMap",
    });

    return result;
}
function L1CpriencodeConfigureLinksReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1_StartupTimer, buf, off + 0);
    l2l1_putU32(msg.numOfItems, buf, off + 4);
    encodeStaticVariableSizedArray_SCpriLinkItem_16(msg.cpriLink, buf, off + 8);
    l2l1_putU8(msg.dlCpriLinkMapConfig, buf, off + 332);
    l2l1_putU8(msg.ulCpriLinkMapConfig, buf, off + 333);
}
function L1CpridecodeConfigureLinksResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeConfigureLinksResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function L1CpridecodeSetOutputReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.outputState = l2l1_getU8(offset + 1);
/*    if (!(result.outputState === [object Object] || result.outputState === [object Object]))
        throw new Error(`Value ${result.outputState} is out of range for enum 'EOutputState'`); */
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EOutputState",
    });

    return result;
}
function L1CpriencodeSetOutputReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.outputState, buf, off + 1);
}
function L1CpridecodeSetOutputResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });
    result.outputState = l2l1_getU8(offset + 2);
/*    if (!(result.outputState === [object Object] || result.outputState === [object Object]))
        throw new Error(`Value ${result.outputState} is out of range for enum 'EOutputState'`); */
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EOutputState",
    });

    return result;
}
function L1CpriencodeSetOutputResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU8(msg.outputState, buf, off + 2);
}
function L1CpridecodeStateInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.cpriState = l2l1_getU8(offset + 1);
/*    if (!(result.cpriState === [object Object] || result.cpriState === [object Object] || result.cpriState === [object Object] || result.cpriState === [object Object] || result.cpriState === [object Object] || result.cpriState === [object Object] || result.cpriState === [object Object]))
        throw new Error(`Value ${result.cpriState} is out of range for enum 'EOamCpriLinkState'`); */
    Object.defineProperty(result, "__enum_cpriState", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EOamCpriLinkState",
    });

    return result;
}
function L1CpriencodeStateInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.cpriState, buf, off + 1);
}
function L1CpridecodeSubscribeReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.cpriLinkState = l2l1_getU8(offset + 1);
    result.hfnSync = l2l1_getU8(offset + 2);
    result.t14Ind = l2l1_getU8(offset + 3);
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeSubscribeReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.cpriLinkState, buf, off + 1);
    l2l1_putU8(msg.hfnSync, buf, off + 2);
    l2l1_putU8(msg.t14Ind, buf, off + 3);
    l2l1_putU32(msg.sicad, buf, off + 4);
}
function L1CpridecodeSubscribeResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeSubscribeResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU32(msg.sicad, buf, off + 4);
}
function L1CpridecodeDiscoveryInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.discoveryMessage = decodeStaticVariableSizedArray_uint8_64(offset + 4);

    return result;
}
function L1CpriencodeDiscoveryInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_64(msg.discoveryMessage, buf, off + 4);
}
function L1CpridecodeDelayConfigReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
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
function L1CpriencodeDelayConfigReq_t(msg, buf, off) {
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
function L1CpridecodeDelayConfigResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeDelayConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}
function L1CpridecodeGetLinkParamReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.parameterMask = l2l1_getU16(offset + 2);

    return result;
}
function L1CpriencodeGetLinkParamReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
}
function L1CpridecodeGetLinkParamResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });
    result.cpriLoopbackDelay = l2l1_getU32(offset + 4);
    result.parameterMask = l2l1_getU16(offset + 8);
    result.LCVErrInWindow = l2l1_getU32(offset + 12);
    result.LCVErrAccumulated = l2l1_getU32(offset + 16);
    result.BERInWindow = l2l1_getF32(offset + 20);
    result.BERAccumulated = l2l1_getF32(offset + 24);

    return result;
}
function L1CpriencodeGetLinkParamResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.cpriLoopbackDelay, buf, off + 4);
    l2l1_putU16(msg.parameterMask, buf, off + 8);
    l2l1_putU32(msg.LCVErrInWindow, buf, off + 12);
    l2l1_putU32(msg.LCVErrAccumulated, buf, off + 16);
    l2l1_putF32(msg.BERInWindow, buf, off + 20);
    l2l1_putF32(msg.BERAccumulated, buf, off + 24);
}
function L1CpridecodeSetDiscoveryReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.bufferLen = l2l1_getU8(offset + 1);
    result.discoveryMessage = decodeStaticVariableSizedArray_uint8_64(offset + 4);

    return result;
}
function L1CpriencodeSetDiscoveryReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.bufferLen, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_64(msg.discoveryMessage, buf, off + 4);
}
function L1CpridecodeSetDiscoveryResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeSetDiscoveryResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}
function L1CpridecodeSetLinkPropertiesReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.parameterMask = l2l1_getU16(offset + 2);
    result.LCVWindow = l2l1_getU32(offset + 4);
    result.scramblingSeed = l2l1_getU32(offset + 8);
    result.cpriProtocolVersion = l2l1_getU8(offset + 12);

    return result;
}
function L1CpriencodeSetLinkPropertiesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
    l2l1_putU32(msg.LCVWindow, buf, off + 4);
    l2l1_putU32(msg.scramblingSeed, buf, off + 8);
    l2l1_putU8(msg.cpriProtocolVersion, buf, off + 12);
}
function L1CpridecodeSetLinkPropertiesResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeSetLinkPropertiesResp_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}
function L1CpridecodeConfigureVsbReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
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
function L1CpriencodeConfigureVsbReq_t(msg, buf, off) {
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
function L1CpridecodeConfigureVsbResp_t(offset) {
    let result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeConfigureVsbResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1CpridecodeSubscribeVsbChangesReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.sicad = l2l1_getU32(offset + 8);
    result.regState = l2l1_getU8(offset + 12);
/*    if (!(result.regState === [object Object] || result.regState === [object Object]))
        throw new Error(`Value ${result.regState} is out of range for enum 'EState'`); */
    Object.defineProperty(result, "__enum_regState", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EState",
    });

    return result;
}
function L1CpriencodeSubscribeVsbChangesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU32(msg.sicad, buf, off + 8);
    l2l1_putU8(msg.regState, buf, off + 12);
}
function L1CpridecodeSubscribeVsbChangesResp_t(offset) {
    let result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeSubscribeVsbChangesResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1CpridecodeVsbDataInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.bufferLen = l2l1_getU32(offset + 8);
    result.data = decodeStaticFixedSizedArray_uint8_256(offset + 12);

    return result;
}
function L1CpriencodeVsbDataInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU32(msg.bufferLen, buf, off + 8);
    encodeStaticFixedSizedArray_uint8_256(msg.data, buf, off + 12);
}
function L1CpridecodeSendVsbDataReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.refNo = l2l1_getU32(offset + 4);
    result.repeatOn = l2l1_getU8(offset + 8);
    result.bufferLen = l2l1_getU32(offset + 12);
    result.data = decodeStaticFixedSizedArray_uint8_256(offset + 16);

    return result;
}
function L1CpriencodeSendVsbDataReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.refNo, buf, off + 4);
    l2l1_putU8(msg.repeatOn, buf, off + 8);
    l2l1_putU32(msg.bufferLen, buf, off + 12);
    encodeStaticFixedSizedArray_uint8_256(msg.data, buf, off + 16);
}
function L1CpridecodeSendVsbDataResp_t(offset) {
    let result = {};

    result.refNo = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EExecutionState'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_EExecutionState",
    });

    return result;
}
function L1CpriencodeSendVsbDataResp_t(msg, buf, off) {
    l2l1_putU32(msg.refNo, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1CpridecodeconfigureAxcContainersReq_t(offset) {
    let result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.cpriLinkId = l2l1_getU8(offset + 4);
/*    if (!(result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object]))
        throw new Error(`Value ${result.cpriLinkId} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLinkId", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.iqSampleFormat = l2l1_getU8(offset + 5);
/*    if (!(result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object]))
        throw new Error(`Value ${result.iqSampleFormat} is out of range for enum 'cpriIqSampleFormat_t'`); */
    Object.defineProperty(result, "__enum_iqSampleFormat", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriIqSampleFormat_t",
    });
    result.iqSampleCount = l2l1_getU16(offset + 6);
    result.wCoordinate = l2l1_getU32(offset + 8);
    result.bCoordinate = l2l1_getU32(offset + 12);
    result.direction = l2l1_getU8(offset + 16);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });

    return result;
}
function L1CpriencodeconfigureAxcContainersReq_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.cpriLinkId, buf, off + 4);
    l2l1_putU8(msg.iqSampleFormat, buf, off + 5);
    l2l1_putU16(msg.iqSampleCount, buf, off + 6);
    l2l1_putU32(msg.wCoordinate, buf, off + 8);
    l2l1_putU32(msg.bCoordinate, buf, off + 12);
    l2l1_putU8(msg.direction, buf, off + 16);
}
function L1CpridecodeConfigureAxcInfoReq_t(offset) {
    let result = {};

    result.axcContainers = decodeDynamicVariableSizedArray_configureAxcContainersReq_t_64(offset + 0);
    result.scs = l2l1_getU8(offset + 8);
/*    if (!(result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object]))
        throw new Error(`Value ${result.scs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });

    return result;
}
function L1CpriencodeConfigureAxcInfoReq_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_configureAxcContainersReq_t_64(msg.axcContainers, buf, off + 0);
    l2l1_putU8(msg.scs, buf, off + 8);
}
function L1CpridecodeconfigureAxcContainersReq_t(offset) {
    let result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.cpriLinkId = l2l1_getU8(offset + 4);
/*    if (!(result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object] || result.cpriLinkId === [object Object]))
        throw new Error(`Value ${result.cpriLinkId} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLinkId", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.iqSampleFormat = l2l1_getU8(offset + 5);
/*    if (!(result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object] || result.iqSampleFormat === [object Object]))
        throw new Error(`Value ${result.iqSampleFormat} is out of range for enum 'cpriIqSampleFormat_t'`); */
    Object.defineProperty(result, "__enum_iqSampleFormat", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriIqSampleFormat_t",
    });
    result.iqSampleCount = l2l1_getU16(offset + 6);
    result.wCoordinate = l2l1_getU32(offset + 8);
    result.bCoordinate = l2l1_getU32(offset + 12);
    result.direction = l2l1_getU8(offset + 16);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });

    return result;
}
function L1CpriencodeconfigureAxcContainersReq_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.cpriLinkId, buf, off + 4);
    l2l1_putU8(msg.iqSampleFormat, buf, off + 5);
    l2l1_putU16(msg.iqSampleCount, buf, off + 6);
    l2l1_putU32(msg.wCoordinate, buf, off + 8);
    l2l1_putU32(msg.bCoordinate, buf, off + 12);
    l2l1_putU8(msg.direction, buf, off + 16);
}
function L1CpridecodeconfigureAxcContainersResp_t(offset) {
    let result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.status = l2l1_getU8(offset + 5);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cpriAxcContainerStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriAxcContainerStatus_t",
    });

    return result;
}
function L1CpriencodeconfigureAxcContainersResp_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 5);
}
function L1CpridecodeConfigureAxcInfoResp_t(offset) {
    let result = {};

    result.axcContainers = decodeDynamicVariableSizedArray_configureAxcContainersResp_t_64(offset + 0);

    return result;
}
function L1CpriencodeConfigureAxcInfoResp_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_configureAxcContainersResp_t_64(msg.axcContainers, buf, off + 0);
}
function L1CpridecodeconfigureAxcContainersResp_t(offset) {
    let result = {};

    result.axcPosition = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.status = l2l1_getU8(offset + 5);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cpriAxcContainerStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriAxcContainerStatus_t",
    });

    return result;
}
function L1CpriencodeconfigureAxcContainersResp_t(msg, buf, off) {
    l2l1_putU32(msg.axcPosition, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 5);
}
function L1CpridecodeaxcContainersDeleteReq_t(offset) {
    let result = {};

    result.direction = l2l1_getU8(offset + 0);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeaxcContainersDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
}
function L1CpridecodeDeleteAxcInfoReq_t(offset) {
    let result = {};

    result.axcContainers = decodeDynamicVariableSizedArray_axcContainersDeleteReq_t_64(offset + 0);

    return result;
}
function L1CpriencodeDeleteAxcInfoReq_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_axcContainersDeleteReq_t_64(msg.axcContainers, buf, off + 0);
}
function L1CpridecodeaxcContainersDeleteReq_t(offset) {
    let result = {};

    result.direction = l2l1_getU8(offset + 0);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeaxcContainersDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
}
function L1CpridecodeaxcContainersDeleteResp_t(offset) {
    let result = {};

    result.direction = l2l1_getU8(offset + 0);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cpriAxcContainerStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriAxcContainerStatus_t",
    });

    return result;
}
function L1CpriencodeaxcContainersDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
}
function L1CpridecodeDeleteAxcInfoResp_t(offset) {
    let result = {};

    result.axcContainers = decodeDynamicVariableSizedArray_axcContainersDeleteResp_t_64(offset + 0);

    return result;
}
function L1CpriencodeDeleteAxcInfoResp_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_axcContainersDeleteResp_t_64(msg.axcContainers, buf, off + 0);
}
function L1CpridecodeaxcContainersDeleteResp_t(offset) {
    let result = {};

    result.direction = l2l1_getU8(offset + 0);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_direction_t",
    });
    result.axcPosition = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cpriAxcContainerStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_cpriAxcContainerStatus_t",
    });

    return result;
}
function L1CpriencodeaxcContainersDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.direction, buf, off + 0);
    l2l1_putU32(msg.axcPosition, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
}
function L1CpridecodeFrameSyncInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.frameSyncState = l2l1_getU8(offset + 1);

    return result;
}
function L1CpriencodeFrameSyncInd_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU8(msg.frameSyncState, buf, off + 1);
}
function L1CpridecodeT14Ind_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.t14 = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeT14Ind_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.t14, buf, off + 4);
}
function DlPooldecodeAddressReq_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);

    return result;
}
function DlPoolencodeAddressReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
}
function DlPooldecodeAddressResp_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);
    result.dlBbPoolingResourceReconfReqAddress = l2l1_getU32(offset + 4);

    return result;
}
function DlPoolencodeAddressResp_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
    l2l1_putU32(msg.dlBbPoolingResourceReconfReqAddress, buf, off + 4);
}
function DlPooldecodeslowPrbPoolingParameters_t(offset) {
    let result = {};

    result.l1SpMaxNumStreamPrb = l2l1_getU16(offset + 0);
    result.l1SpMaxNumLayerPrb = l2l1_getU16(offset + 2);

    return result;
}
function DlPoolencodeslowPrbPoolingParameters_t(msg, buf, off) {
    l2l1_putU16(msg.l1SpMaxNumStreamPrb, buf, off + 0);
    l2l1_putU16(msg.l1SpMaxNumLayerPrb, buf, off + 2);
}
function DlPooldecodel1SubPool_t(offset) {
    let result = {};

    result.l1SubPoolId = l2l1_getU16(offset + 0);
    result.slowPrbPoolingParameters = DlPooldecodeslowPrbPoolingParameters_t(offset + 2);

    return result;
}
function DlPoolencodel1SubPool_t(msg, buf, off) {
    l2l1_putU16(msg.l1SubPoolId, buf, off + 0);
    DlPoolencodeslowPrbPoolingParameters_t(msg.slowPrbPoolingParameters, buf, off + 2);
}
function DlPooldecodeBbResourceReconfReq_t(offset) {
    let result = {};

    result.addrBbPoolingResourceReconfResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.l1PoolId = l2l1_getU32(offset + 8);
    result.l1SubPool = decodeStaticFixedSizedArray_l1SubPool_t_2(offset + 12);

    return result;
}
function DlPoolencodeBbResourceReconfReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrBbPoolingResourceReconfResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU32(msg.l1PoolId, buf, off + 8);
    encodeStaticFixedSizedArray_l1SubPool_t_2(msg.l1SubPool, buf, off + 12);
}
function DlPooldecodeBbResourceReconfResp_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.l1PoolId = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
    result.cause = l2l1_getU8(offset + 9);
/*    if (!(result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object]))
        throw new Error(`Value ${result.cause} is out of range for enum 'poolCause_t'`); */
    Object.defineProperty(result, "__enum_cause", {
        enumerable: false,
        writable: false,
        value: "l1_common_poolCause_t",
    });

    return result;
}
function DlPoolencodeBbResourceReconfResp_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU32(msg.l1PoolId, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
    l2l1_putU8(msg.cause, buf, off + 9);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
}
function DlCelldecodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);
    result.rimRsPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 224);

    return result;
}
function DlCellencodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationLutIndex, buf, off + 224);
}
function DlCelldecodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object]))
        throw new Error(`Value ${result.dlSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
/*    if (!(result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object]))
        throw new Error(`Value ${result.dlMimoMode} is out of range for enum 'dlMimoMode_t'`); */
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlMimoMode_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 3);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_fronthaulMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
/*    if (!(result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object]))
        throw new Error(`Value ${result.dlBandwidth} is out of range for enum 'EBandwidth'`); */
    Object.defineProperty(result, "__enum_dlBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 8);
/*    if (!(result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object]))
        throw new Error(`Value ${result.scs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.ssBlockPower = l2l1_getI16(offset + 10);
    result.ssBlockPrbOffset = l2l1_getU8(offset + 12);
    result.ssBlockSubcarrierOffset = l2l1_getU8(offset + 13);
    result.ssBlockConfiguration = l2l1_getU8(offset + 14);
/*    if (!(result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object]))
        throw new Error(`Value ${result.ssBlockConfiguration} is out of range for enum 'ssBlockConfiguration_t'`); */
    Object.defineProperty(result, "__enum_ssBlockConfiguration", {
        enumerable: false,
        writable: false,
        value: "l1_common_ssBlockConfiguration_t",
    });
    result.phaseCompensationLutIndex = decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset + 16);
    result.rimRsPhaseCompensationEcpriLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 24);
    result.ssBlockPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_224(offset + 248);
    result.dlSubcellPosition = l2l1_getU8(offset + 696);
/*    if (!(result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object]))
        throw new Error(`Value ${result.dlSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 697);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 698);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_4(offset + 700);
    result.conformanceTestMode = l2l1_getU8(offset + 708);
    result.actBeamforming = l2l1_getU8(offset + 709);
    result.isLteCrsMappingEnable = l2l1_getU8(offset + 710);
    result.numLteCrsPorts = l2l1_getU8(offset + 711);
/*    if (!(result.numLteCrsPorts === [object Object] || result.numLteCrsPorts === [object Object] || result.numLteCrsPorts === [object Object]))
        throw new Error(`Value ${result.numLteCrsPorts} is out of range for enum 'numLteCrsPorts_t'`); */
    Object.defineProperty(result, "__enum_numLteCrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numLteCrsPorts_t",
    });
    result.reLteNuShift = l2l1_getU8(offset + 712);
    result.lteDlBandwidth = l2l1_getU8(offset + 713);
/*    if (!(result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object]))
        throw new Error(`Value ${result.lteDlBandwidth} is out of range for enum 'lteDlBandwidth_t'`); */
    Object.defineProperty(result, "__enum_lteDlBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_lteDlBandwidth_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 714);
    result.cpriDialectIndication = l2l1_getU8(offset + 715);
/*    if (!(result.cpriDialectIndication === [object Object] || result.cpriDialectIndication === [object Object]))
        throw new Error(`Value ${result.cpriDialectIndication} is out of range for enum 'cpriDialectIndication_t'`); */
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "l1_common_cpriDialectIndication_t",
    });
    result.axcPosition = decodeStaticVariableSizedArray_uint32_16(offset + 716);
    result.dlScPerCarrierPart = decodeDynamicVariableSizedArray_uint16_4(offset + 784);
    result.dlEcpriFdBeamforming = l2l1_getU8(offset + 792);
    result.dlSubcellPoolId = l2l1_getU8(offset + 793);
    result.dlReferenceLevel = l2l1_getU16(offset + 794);
    result.actDlEcpriPhase4 = l2l1_getU8(offset + 796);
    result.actORANstep1 = l2l1_getU8(offset + 797);
    result.actOranFDD = l2l1_getU8(offset + 798);
    result.mantissaSize = l2l1_getU8(offset + 799);
/*    if (!(result.mantissaSize === [object Object] || result.mantissaSize === [object Object]))
        throw new Error(`Value ${result.mantissaSize} is out of range for enum 'mantissaSize_t'`); */
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "l1_common_mantissaSize_t",
    });
    result.dlIqCompression = l2l1_getU8(offset + 800);
    result.dlActDownSampling = l2l1_getU8(offset + 801);
    result.actDlEcpriExtType12 = l2l1_getU8(offset + 802);
    result.l1SubpoolId = l2l1_getU16(offset + 804);
    result.firstCellSlotId = l2l1_getU16(offset + 806);
    result.cellSlotLength = l2l1_getU16(offset + 808);
    result.actDlPrbMuting = l2l1_getU8(offset + 810);
    result.numOfLogicalResourceIds = l2l1_getU8(offset + 811);
/*    if (!(result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object]))
        throw new Error(`Value ${result.numOfLogicalResourceIds} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numOfLogicalResourceIds", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.logicalResourceIds = decodeStaticFixedSizedArray_uint32_4(offset + 812);

    return result;
}
function DlCellencodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.dlSubcellType, buf, off + 1);
    l2l1_putU8(msg.dlMimoMode, buf, off + 2);
    l2l1_putU8(msg.fronthaulMode, buf, off + 3);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU16(msg.dlBandwidth, buf, off + 6);
    l2l1_putU8(msg.scs, buf, off + 8);
    l2l1_putI16(msg.ssBlockPower, buf, off + 10);
    l2l1_putU8(msg.ssBlockPrbOffset, buf, off + 12);
    l2l1_putU8(msg.ssBlockSubcarrierOffset, buf, off + 13);
    l2l1_putU8(msg.ssBlockConfiguration, buf, off + 14);
    encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(msg.phaseCompensationLutIndex, buf, off + 16);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationEcpriLutIndex, buf, off + 24);
    encodeStaticFixedSizedArray_uint16_224(msg.ssBlockPhaseCompensationLutIndex, buf, off + 248);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 696);
    l2l1_putU8(msg.eCpriLink, buf, off + 697);
    l2l1_putU8(msg.numCeAxCId, buf, off + 698);
    encodeStaticFixedSizedArray_uint16_4(msg.ceAxCId, buf, off + 700);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 708);
    l2l1_putU8(msg.actBeamforming, buf, off + 709);
    l2l1_putU8(msg.isLteCrsMappingEnable, buf, off + 710);
    l2l1_putU8(msg.numLteCrsPorts, buf, off + 711);
    l2l1_putU8(msg.reLteNuShift, buf, off + 712);
    l2l1_putU8(msg.lteDlBandwidth, buf, off + 713);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 714);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 715);
    encodeStaticVariableSizedArray_uint32_16(msg.axcPosition, buf, off + 716);
    encodeDynamicVariableSizedArray_uint16_4(msg.dlScPerCarrierPart, buf, off + 784);
    l2l1_putU8(msg.dlEcpriFdBeamforming, buf, off + 792);
    l2l1_putU8(msg.dlSubcellPoolId, buf, off + 793);
    l2l1_putU16(msg.dlReferenceLevel, buf, off + 794);
    l2l1_putU8(msg.actDlEcpriPhase4, buf, off + 796);
    l2l1_putU8(msg.actORANstep1, buf, off + 797);
    l2l1_putU8(msg.actOranFDD, buf, off + 798);
    l2l1_putU8(msg.mantissaSize, buf, off + 799);
    l2l1_putU8(msg.dlIqCompression, buf, off + 800);
    l2l1_putU8(msg.dlActDownSampling, buf, off + 801);
    l2l1_putU8(msg.actDlEcpriExtType12, buf, off + 802);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 804);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 806);
    l2l1_putU16(msg.cellSlotLength, buf, off + 808);
    l2l1_putU8(msg.actDlPrbMuting, buf, off + 810);
    l2l1_putU8(msg.numOfLogicalResourceIds, buf, off + 811);
    encodeStaticFixedSizedArray_uint32_4(msg.logicalResourceIds, buf, off + 812);
}
function DlCelldecodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);
    result.rimRsPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 224);

    return result;
}
function DlCellencodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationLutIndex, buf, off + 224);
}
function DlCelldecodeSetupResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_status_t",
    });
    result.cause = l2l1_getU32(offset + 4);
    result.diagnosticInformation = decodeDynamicVariableSizedArray_uint32_14(offset + 8);

    return result;
}
function DlCellencodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU32(msg.cause, buf, off + 4);
    encodeDynamicVariableSizedArray_uint32_14(msg.diagnosticInformation, buf, off + 8);
}
function DlCelldecodeDeleteReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCellencodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}
function DlCelldecodeDeleteResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cellDeleteStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_cellDeleteStatus_t",
    });

    return result;
}
function DlCellencodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}
function decodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);
    result.rimRsPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 224);

    return result;
}
function encodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationLutIndex, buf, off + 224);
}
function decodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object]))
        throw new Error(`Value ${result.dlSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
/*    if (!(result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object]))
        throw new Error(`Value ${result.dlMimoMode} is out of range for enum 'dlMimoMode_t'`); */
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlMimoMode_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 3);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_fronthaulMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
/*    if (!(result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object]))
        throw new Error(`Value ${result.dlBandwidth} is out of range for enum 'EBandwidth'`); */
    Object.defineProperty(result, "__enum_dlBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 8);
/*    if (!(result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object]))
        throw new Error(`Value ${result.scs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.ssBlockPower = l2l1_getI16(offset + 10);
    result.ssBlockPrbOffset = l2l1_getU8(offset + 12);
    result.ssBlockSubcarrierOffset = l2l1_getU8(offset + 13);
    result.ssBlockConfiguration = l2l1_getU8(offset + 14);
/*    if (!(result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object] || result.ssBlockConfiguration === [object Object]))
        throw new Error(`Value ${result.ssBlockConfiguration} is out of range for enum 'ssBlockConfiguration_t'`); */
    Object.defineProperty(result, "__enum_ssBlockConfiguration", {
        enumerable: false,
        writable: false,
        value: "l1_common_ssBlockConfiguration_t",
    });
    result.phaseCompensationLutIndex = decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset + 16);
    result.rimRsPhaseCompensationEcpriLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 24);
    result.ssBlockPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_224(offset + 248);
    result.dlSubcellPosition = l2l1_getU8(offset + 696);
/*    if (!(result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object]))
        throw new Error(`Value ${result.dlSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 697);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 698);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_4(offset + 700);
    result.conformanceTestMode = l2l1_getU8(offset + 708);
    result.actBeamforming = l2l1_getU8(offset + 709);
    result.isLteCrsMappingEnable = l2l1_getU8(offset + 710);
    result.numLteCrsPorts = l2l1_getU8(offset + 711);
/*    if (!(result.numLteCrsPorts === [object Object] || result.numLteCrsPorts === [object Object] || result.numLteCrsPorts === [object Object]))
        throw new Error(`Value ${result.numLteCrsPorts} is out of range for enum 'numLteCrsPorts_t'`); */
    Object.defineProperty(result, "__enum_numLteCrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numLteCrsPorts_t",
    });
    result.reLteNuShift = l2l1_getU8(offset + 712);
    result.lteDlBandwidth = l2l1_getU8(offset + 713);
/*    if (!(result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object] || result.lteDlBandwidth === [object Object]))
        throw new Error(`Value ${result.lteDlBandwidth} is out of range for enum 'lteDlBandwidth_t'`); */
    Object.defineProperty(result, "__enum_lteDlBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_lteDlBandwidth_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 714);
    result.cpriDialectIndication = l2l1_getU8(offset + 715);
/*    if (!(result.cpriDialectIndication === [object Object] || result.cpriDialectIndication === [object Object]))
        throw new Error(`Value ${result.cpriDialectIndication} is out of range for enum 'cpriDialectIndication_t'`); */
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "l1_common_cpriDialectIndication_t",
    });
    result.axcPosition = decodeStaticVariableSizedArray_uint32_16(offset + 716);
    result.dlScPerCarrierPart = decodeDynamicVariableSizedArray_uint16_4(offset + 784);
    result.dlEcpriFdBeamforming = l2l1_getU8(offset + 792);
    result.dlSubcellPoolId = l2l1_getU8(offset + 793);
    result.dlReferenceLevel = l2l1_getU16(offset + 794);
    result.actDlEcpriPhase4 = l2l1_getU8(offset + 796);
    result.actORANstep1 = l2l1_getU8(offset + 797);
    result.actOranFDD = l2l1_getU8(offset + 798);
    result.mantissaSize = l2l1_getU8(offset + 799);
/*    if (!(result.mantissaSize === [object Object] || result.mantissaSize === [object Object]))
        throw new Error(`Value ${result.mantissaSize} is out of range for enum 'mantissaSize_t'`); */
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "l1_common_mantissaSize_t",
    });
    result.dlIqCompression = l2l1_getU8(offset + 800);
    result.dlActDownSampling = l2l1_getU8(offset + 801);
    result.actDlEcpriExtType12 = l2l1_getU8(offset + 802);
    result.l1SubpoolId = l2l1_getU16(offset + 804);
    result.firstCellSlotId = l2l1_getU16(offset + 806);
    result.cellSlotLength = l2l1_getU16(offset + 808);
    result.actDlPrbMuting = l2l1_getU8(offset + 810);
    result.numOfLogicalResourceIds = l2l1_getU8(offset + 811);
/*    if (!(result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object]))
        throw new Error(`Value ${result.numOfLogicalResourceIds} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numOfLogicalResourceIds", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.logicalResourceIds = decodeStaticFixedSizedArray_uint32_4(offset + 812);

    return result;
}
function encodeSetupReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.dlSubcellType, buf, off + 1);
    l2l1_putU8(msg.dlMimoMode, buf, off + 2);
    l2l1_putU8(msg.fronthaulMode, buf, off + 3);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU16(msg.dlBandwidth, buf, off + 6);
    l2l1_putU8(msg.scs, buf, off + 8);
    l2l1_putI16(msg.ssBlockPower, buf, off + 10);
    l2l1_putU8(msg.ssBlockPrbOffset, buf, off + 12);
    l2l1_putU8(msg.ssBlockSubcarrierOffset, buf, off + 13);
    l2l1_putU8(msg.ssBlockConfiguration, buf, off + 14);
    encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(msg.phaseCompensationLutIndex, buf, off + 16);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationEcpriLutIndex, buf, off + 24);
    encodeStaticFixedSizedArray_uint16_224(msg.ssBlockPhaseCompensationLutIndex, buf, off + 248);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 696);
    l2l1_putU8(msg.eCpriLink, buf, off + 697);
    l2l1_putU8(msg.numCeAxCId, buf, off + 698);
    encodeStaticFixedSizedArray_uint16_4(msg.ceAxCId, buf, off + 700);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 708);
    l2l1_putU8(msg.actBeamforming, buf, off + 709);
    l2l1_putU8(msg.isLteCrsMappingEnable, buf, off + 710);
    l2l1_putU8(msg.numLteCrsPorts, buf, off + 711);
    l2l1_putU8(msg.reLteNuShift, buf, off + 712);
    l2l1_putU8(msg.lteDlBandwidth, buf, off + 713);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 714);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 715);
    encodeStaticVariableSizedArray_uint32_16(msg.axcPosition, buf, off + 716);
    encodeDynamicVariableSizedArray_uint16_4(msg.dlScPerCarrierPart, buf, off + 784);
    l2l1_putU8(msg.dlEcpriFdBeamforming, buf, off + 792);
    l2l1_putU8(msg.dlSubcellPoolId, buf, off + 793);
    l2l1_putU16(msg.dlReferenceLevel, buf, off + 794);
    l2l1_putU8(msg.actDlEcpriPhase4, buf, off + 796);
    l2l1_putU8(msg.actORANstep1, buf, off + 797);
    l2l1_putU8(msg.actOranFDD, buf, off + 798);
    l2l1_putU8(msg.mantissaSize, buf, off + 799);
    l2l1_putU8(msg.dlIqCompression, buf, off + 800);
    l2l1_putU8(msg.dlActDownSampling, buf, off + 801);
    l2l1_putU8(msg.actDlEcpriExtType12, buf, off + 802);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 804);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 806);
    l2l1_putU16(msg.cellSlotLength, buf, off + 808);
    l2l1_putU8(msg.actDlPrbMuting, buf, off + 810);
    l2l1_putU8(msg.numOfLogicalResourceIds, buf, off + 811);
    encodeStaticFixedSizedArray_uint32_4(msg.logicalResourceIds, buf, off + 812);
}
function decodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);
    result.rimRsPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 224);

    return result;
}
function encodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint16_112(msg.rimRsPhaseCompensationLutIndex, buf, off + 224);
}
function L1decodeDmaEndInd_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeDmaEndInd_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeDmaStartTestReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeDmaStartTestReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeEchoReq_t(offset) {
    let result = {};

    result.payload = decodeStaticFixedSizedArray_uint8_64(offset + 0);

    return result;
}
function L1encodeEchoReq_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint8_64(msg.payload, buf, off + 0);
}
function L1decodeEchoResp_t(offset) {
    let result = {};

    result.payload = decodeStaticFixedSizedArray_uint8_64(offset + 0);

    return result;
}
function L1encodeEchoResp_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint8_64(msg.payload, buf, off + 0);
}
function L1decodeLatencyEventReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeLatencyEventReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeLaWakeupReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcell_index = l2l1_getU32(offset + 4);
    result.type_info = l2l1_getU16(offset + 8);
    result.param = l2l1_getU8(offset + 10);

    return result;
}
function L1encodeLaWakeupReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU32(msg.subcell_index, buf, off + 4);
    l2l1_putU16(msg.type_info, buf, off + 8);
    l2l1_putU8(msg.param, buf, off + 10);
}
function L1decodeLoopReq_t(offset) {
    let result = {};

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
function L1encodeLoopReq_t(msg, buf, off) {
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
function L1decodePingPongReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodePingPongReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeSnapshotFileCreationReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeSnapshotFileCreationReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeStartupLoopReq_t(offset) {
    let result = {};

    result.state = l2l1_getU32(offset + 0);
    result.count = l2l1_getU32(offset + 4);

    return result;
}
function L1encodeStartupLoopReq_t(msg, buf, off) {
    l2l1_putU32(msg.state, buf, off + 0);
    l2l1_putU32(msg.count, buf, off + 4);
}
function L1decodeUlMeasReq_t(offset) {
    let result = {};

    result.subCellIndex = l2l1_getU32(offset + 0);
    result.queueEntry = l2l1_getU32(offset + 4);
    result.measBufType = l2l1_getU32(offset + 8);

    return result;
}
function L1encodeUlMeasReq_t(msg, buf, off) {
    l2l1_putU32(msg.subCellIndex, buf, off + 0);
    l2l1_putU32(msg.queueEntry, buf, off + 4);
    l2l1_putU32(msg.measBufType, buf, off + 8);
}
function L1decodeWakeupReq_t(offset) {
    let result = {};

    result.subcell_index = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeWakeupReq_t(msg, buf, off) {
    l2l1_putU32(msg.subcell_index, buf, off + 0);
}
function L1decodeNrtRxSubcellResetReq_t(offset) {
    let result = {};

    result.subcell_id = l2l1_getU8(offset + 0);

    return result;
}
function L1encodeNrtRxSubcellResetReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcell_id, buf, off + 0);
}
function L1decodeSyncInd_t(offset) {
    let result = {};

    result.delay_nSec = l2l1_getI32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.subcellId = l2l1_getU8(offset + 6);
    result.slot = l2l1_getU8(offset + 7);

    return result;
}
function L1encodeSyncInd_t(msg, buf, off) {
    l2l1_putI32(msg.delay_nSec, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 7);
}
function L1decodeTestModeConfigReq_t(offset) {
    let result = {};

    result.operationType = l2l1_getU8(offset + 0);
/*    if (!(result.operationType === [object Object] || result.operationType === [object Object]))
        throw new Error(`Value ${result.operationType} is out of range for enum 'operationType_t'`); */
    Object.defineProperty(result, "__enum_operationType", {
        enumerable: false,
        writable: false,
        value: "L1_operationType_t",
    });

    return result;
}
function L1encodeTestModeConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.operationType, buf, off + 0);
}
function L1decodeTestModeConfigResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1_status_t",
    });

    return result;
}
function L1encodeTestModeConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function decodeDmaEndInd_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function encodeDmaEndInd_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function DlDatadecodePdschPayloadTbSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.tbIndex = l2l1_getU32(offset + 8);
    result.tbFragmentOffset_bits = l2l1_getU32(offset + 12);
    result.payload = decodeDynamicVariableSizedArray_uint8_8960(offset + 16);

    return result;
}
function DlDataencodePdschPayloadTbSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU32(msg.tbIndex, buf, off + 8);
    l2l1_putU32(msg.tbFragmentOffset_bits, buf, off + 12);
    encodeDynamicVariableSizedArray_uint8_8960(msg.payload, buf, off + 16);
}
function decodePdschPayloadTbSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.tbIndex = l2l1_getU32(offset + 8);
    result.tbFragmentOffset_bits = l2l1_getU32(offset + 12);
    result.payload = decodeDynamicVariableSizedArray_uint8_8960(offset + 16);

    return result;
}
function encodePdschPayloadTbSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU32(msg.tbIndex, buf, off + 8);
    l2l1_putU32(msg.tbFragmentOffset_bits, buf, off + 12);
    encodeDynamicVariableSizedArray_uint8_8960(msg.payload, buf, off + 16);
}
function l1_commondecodeL2DlAddresses(offset) {
    let result = {};

    result.diagnosticInd = l2l1_getU32(offset + 0);

    return result;
}
function l1_commonencodeL2DlAddresses(msg, buf, off) {
    l2l1_putU32(msg.diagnosticInd, buf, off + 0);
}
function DlDatadecodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2DlAddresses = l1_commondecodeL2DlAddresses(offset + 4);

    return result;
}
function DlDataencodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2DlAddresses(msg.l2DlAddresses, buf, off + 4);
}
function l1_commondecodeL1DlAddresses(offset) {
    let result = {};

    result.ssBlockSendReq = l2l1_getU32(offset + 0);
    result.slotTypeReq = l2l1_getU32(offset + 4);
    result.pdschSendReq = l2l1_getU32(offset + 8);
    result.pdschPayloadTbSendReq = l2l1_getU32(offset + 12);
    result.patternConfigReq = l2l1_getU32(offset + 16);
    result.pdcchSendReq = l2l1_getU32(offset + 20);
    result.csiRsSendReq = l2l1_getU32(offset + 24);
    result.fastAntennaSnapshotReqAddress = l2l1_getU32(offset + 28);
    result.emptySendReqAddress = l2l1_getU32(offset + 32);
    result.rimRsSendReqAddress = l2l1_getU32(offset + 36);

    return result;
}
function l1_commonencodeL1DlAddresses(msg, buf, off) {
    l2l1_putU32(msg.ssBlockSendReq, buf, off + 0);
    l2l1_putU32(msg.slotTypeReq, buf, off + 4);
    l2l1_putU32(msg.pdschSendReq, buf, off + 8);
    l2l1_putU32(msg.pdschPayloadTbSendReq, buf, off + 12);
    l2l1_putU32(msg.patternConfigReq, buf, off + 16);
    l2l1_putU32(msg.pdcchSendReq, buf, off + 20);
    l2l1_putU32(msg.csiRsSendReq, buf, off + 24);
    l2l1_putU32(msg.fastAntennaSnapshotReqAddress, buf, off + 28);
    l2l1_putU32(msg.emptySendReqAddress, buf, off + 32);
    l2l1_putU32(msg.rimRsSendReqAddress, buf, off + 36);
}
function DlDatadecodeAddressResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l1DlAddresses = l1_commondecodeL1DlAddresses(offset + 4);

    return result;
}
function DlDataencodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL1DlAddresses(msg.l1DlAddresses, buf, off + 4);
}
function DlDatadecodeSlotTypeReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.slotType = l2l1_getU8(offset + 5);
/*    if (!(result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object]))
        throw new Error(`Value ${result.slotType} is out of range for enum 'slotType_t'`); */
    Object.defineProperty(result, "__enum_slotType", {
        enumerable: false,
        writable: false,
        value: "l1_common_slotType_t",
    });
    result.pwrReductionPerSymb_dB = decodeStaticFixedSizedArray_uint8_14(offset + 8);

    return result;
}
function DlDataencodeSlotTypeReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.slotType, buf, off + 5);
    encodeStaticFixedSizedArray_uint8_14(msg.pwrReductionPerSymb_dB, buf, off + 8);
}
function DlDatadecodeDciInfo(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.startSymbolNumber = l2l1_getU8(offset + 2);
    result.numOfSymbols = l2l1_getU8(offset + 3);
    result.startCce = l2l1_getU8(offset + 4);
    result.aggregationLevel = l2l1_getU8(offset + 5);
/*    if (!(result.aggregationLevel === [object Object] || result.aggregationLevel === [object Object] || result.aggregationLevel === [object Object] || result.aggregationLevel === [object Object] || result.aggregationLevel === [object Object]))
        throw new Error(`Value ${result.aggregationLevel} is out of range for enum 'aggregationLevel_t'`); */
    Object.defineProperty(result, "__enum_aggregationLevel", {
        enumerable: false,
        writable: false,
        value: "l1_common_aggregationLevel_t",
    });
    result.dmrsReferencePoint = l2l1_getU8(offset + 6);
/*    if (!(result.dmrsReferencePoint === [object Object] || result.dmrsReferencePoint === [object Object]))
        throw new Error(`Value ${result.dmrsReferencePoint} is out of range for enum 'dmrsReferencePoint_t'`); */
    Object.defineProperty(result, "__enum_dmrsReferencePoint", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsReferencePoint_t",
    });
    result.pdcchPrecodingOption4x4 = l2l1_getU8(offset + 7);
/*    if (!(result.pdcchPrecodingOption4x4 === [object Object] || result.pdcchPrecodingOption4x4 === [object Object] || result.pdcchPrecodingOption4x4 === [object Object] || result.pdcchPrecodingOption4x4 === [object Object]))
        throw new Error(`Value ${result.pdcchPrecodingOption4x4} is out of range for enum 'pdcchPrecodingOption4x4_t'`); */
    Object.defineProperty(result, "__enum_pdcchPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "l1_common_pdcchPrecodingOption4x4_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.pdcchDciTransmitPower = l2l1_getI16(offset + 10);
    result.dciScramblingSequenceInit = l2l1_getU16(offset + 12);
    result.rachStatus = l2l1_getU8(offset + 14);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.ulSubcellIndication = l2l1_getU8(offset + 15);
    result.coresetFreqDomain = l2l1_getU64(offset + 16);
    result.cceRegMappingType = l2l1_getU8(offset + 24);
/*    if (!(result.cceRegMappingType === [object Object] || result.cceRegMappingType === [object Object]))
        throw new Error(`Value ${result.cceRegMappingType} is out of range for enum 'cceRegMappingType_t'`); */
    Object.defineProperty(result, "__enum_cceRegMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_cceRegMappingType_t",
    });
    result.polarizationSelection = l2l1_getU8(offset + 25);
/*    if (!(result.polarizationSelection === [object Object] || result.polarizationSelection === [object Object] || result.polarizationSelection === [object Object]))
        throw new Error(`Value ${result.polarizationSelection} is out of range for enum 'polarizationSelection_t'`); */
    Object.defineProperty(result, "__enum_polarizationSelection", {
        enumerable: false,
        writable: false,
        value: "l1_common_polarizationSelection_t",
    });
    result.nShiftModNumOfRegBundles = l2l1_getU16(offset + 26);
    result.interleaverRows = l2l1_getU8(offset + 28);
/*    if (!(result.interleaverRows === [object Object] || result.interleaverRows === [object Object] || result.interleaverRows === [object Object] || result.interleaverRows === [object Object]))
        throw new Error(`Value ${result.interleaverRows} is out of range for enum 'coresetInterleaverSize_t'`); */
    Object.defineProperty(result, "__enum_interleaverRows", {
        enumerable: false,
        writable: false,
        value: "l1_common_coresetInterleaverSize_t",
    });
    result.regBundleSize = l2l1_getU8(offset + 29);
/*    if (!(result.regBundleSize === [object Object] || result.regBundleSize === [object Object] || result.regBundleSize === [object Object]))
        throw new Error(`Value ${result.regBundleSize} is out of range for enum 'coresetRegBundleSize_t'`); */
    Object.defineProperty(result, "__enum_regBundleSize", {
        enumerable: false,
        writable: false,
        value: "l1_common_coresetRegBundleSize_t",
    });
    result.precoderGranularity = l2l1_getU8(offset + 30);
/*    if (!(result.precoderGranularity === [object Object] || result.precoderGranularity === [object Object]))
        throw new Error(`Value ${result.precoderGranularity} is out of range for enum 'precoderGranularity_t'`); */
    Object.defineProperty(result, "__enum_precoderGranularity", {
        enumerable: false,
        writable: false,
        value: "l1_common_precoderGranularity_t",
    });
    result.coresetFreqDomainRbShift = l2l1_getU8(offset + 31);
    result.dciSize = l2l1_getU8(offset + 32);
    result.numCeAxCIndex = l2l1_getU8(offset + 33);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.dciScramblingRnti = l2l1_getU16(offset + 34);
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 36);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 40);
    result.dciPayload = decodeStaticFixedSizedArray_uint8_18(offset + 44);

    return result;
}
function DlDataencodeDciInfo(msg, buf, off) {
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
    l2l1_putU8(msg.rachStatus, buf, off + 14);
    l2l1_putU8(msg.ulSubcellIndication, buf, off + 15);
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
    l2l1_putU16(msg.dciScramblingRnti, buf, off + 34);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 36);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 40);
    encodeStaticFixedSizedArray_uint8_18(msg.dciPayload, buf, off + 44);
}
function DlDatadecodePdcchSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.beamId = l2l1_getU8(offset + 5);
    result.msgCountCtrl = l2l1_getU8(offset + 6);
    result.dciInfo = decodeDynamicVariableSizedArray_DciInfo_16(offset + 8);

    return result;
}
function DlDataencodePdcchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.beamId, buf, off + 5);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 6);
    encodeDynamicVariableSizedArray_DciInfo_16(msg.dciInfo, buf, off + 8);
}
function DlDatadecodePdschGrant(offset) {
    let result = {};

    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 0);
    result.dlDmrsConfigType = l2l1_getU8(offset + 2);
/*    if (!(result.dlDmrsConfigType === [object Object] || result.dlDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.dlDmrsConfigType} is out of range for enum 'dlDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 3);
/*    if (!(result.dlDmrsLen === [object Object] || result.dlDmrsLen === [object Object]))
        throw new Error(`Value ${result.dlDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 4);
/*    if (!(result.dlDmrsMappingType === [object Object] || result.dlDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.dlDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 5);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 6);
    result.nscId = l2l1_getU8(offset + 7);
    result.startSymbol = l2l1_getU8(offset + 8);
    result.numOfPdschSymbols = l2l1_getU8(offset + 9);
/*    if (!(result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPdschSymbols} is out of range for enum 'NumOfPdschSymbols'`); */
    Object.defineProperty(result, "__enum_numOfPdschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_NumOfPdschSymbols",
    });
    result.antPort = l2l1_getU16(offset + 10);
    result.mcs = l2l1_getU8(offset + 12);
    result.mcsTable = l2l1_getU8(offset + 13);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object] || result.mcsTable === [object Object]))
        throw new Error(`Value ${result.mcsTable} is out of range for enum 'mcsTable_t'`); */
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "l1_common_mcsTable_t",
    });
    result.spatialMode = l2l1_getU8(offset + 14);
/*    if (!(result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object]))
        throw new Error(`Value ${result.spatialMode} is out of range for enum 'SpatialMode'`); */
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 15);
/*    if (!(result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object]))
        throw new Error(`Value ${result.codebookIndex} is out of range for enum 'DlCodebookIndex'`); */
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_DlCodebookIndex",
    });
    result.startPrb = l2l1_getU16(offset + 16);
    result.numOfPrb = l2l1_getU16(offset + 18);
    result.dlPtrsFlag = l2l1_getU8(offset + 20);
/*    if (!(result.dlPtrsFlag === [object Object] || result.dlPtrsFlag === [object Object]))
        throw new Error(`Value ${result.dlPtrsFlag} is out of range for enum 'PtrsFlag'`); */
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 21);
/*    if (!(result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object]))
        throw new Error(`Value ${result.dlPtrsTimeDensity} is out of range for enum 'ptrsTimeDensity_t'`); */
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 22);
/*    if (!(result.dlPtrsFrequencyDensity === [object Object] || result.dlPtrsFrequencyDensity === [object Object] || result.dlPtrsFrequencyDensity === [object Object]))
        throw new Error(`Value ${result.dlPtrsFrequencyDensity} is out of range for enum 'ptrsFrequencyDensity_t'`); */
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 23);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 24);
    result.offsetRbDmrs = l2l1_getU8(offset + 25);
    result.pdschTbTransmitPower = l2l1_getI16(offset + 26);
    result.pdschBundleSize = l2l1_getU16(offset + 28);
    result.baseGraph = l2l1_getU8(offset + 30);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 31);
    result.codeBlockSize = l2l1_getU16(offset + 32);
    result.numOfFillerBits = l2l1_getU16(offset + 34);
    result.liftSize = l2l1_getU16(offset + 36);
    result.liftSizeSetIndex = l2l1_getU8(offset + 38);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 39);
    result.modulationOrder = l2l1_getU8(offset + 40);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
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
/*    if (!(result.polarizationSelection === [object Object] || result.polarizationSelection === [object Object] || result.polarizationSelection === [object Object]))
        throw new Error(`Value ${result.polarizationSelection} is out of range for enum 'polarizationSelection_t'`); */
    Object.defineProperty(result, "__enum_polarizationSelection", {
        enumerable: false,
        writable: false,
        value: "l1_common_polarizationSelection_t",
    });
    result.rbgSize = l2l1_getU8(offset + 62);
    result.rbgSizeFirst = l2l1_getU8(offset + 63);
    result.rat0Bitmap = l2l1_getU32(offset + 64);
    result.i1Codebook4AntPorts = decodeStaticFixedSizedArray_uint8_3(offset + 68);
    result.i2Codebook4AntPorts = l2l1_getU8(offset + 72);
    result.pdschPrecodingOption4x4 = l2l1_getU8(offset + 73);
/*    if (!(result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object] || result.pdschPrecodingOption4x4 === [object Object]))
        throw new Error(`Value ${result.pdschPrecodingOption4x4} is out of range for enum 'pdschPrecodingOption4x4_t'`); */
    Object.defineProperty(result, "__enum_pdschPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "l1_common_pdschPrecodingOption4x4_t",
    });
    result.numStreamIndex = l2l1_getU8(offset + 74);
/*    if (!(result.numStreamIndex === [object Object] || result.numStreamIndex === [object Object] || result.numStreamIndex === [object Object] || result.numStreamIndex === [object Object] || result.numStreamIndex === [object Object] || result.numStreamIndex === [object Object]))
        throw new Error(`Value ${result.numStreamIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numStreamIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.openLoopScheme = l2l1_getU8(offset + 75);
/*    if (!(result.openLoopScheme === [object Object] || result.openLoopScheme === [object Object] || result.openLoopScheme === [object Object] || result.openLoopScheme === [object Object]))
        throw new Error(`Value ${result.openLoopScheme} is out of range for enum 'openLoopScheme_t'`); */
    Object.defineProperty(result, "__enum_openLoopScheme", {
        enumerable: false,
        writable: false,
        value: "l1_common_openLoopScheme_t",
    });
    result.streamIndex = decodeStaticFixedSizedArray_uint8_4(offset + 76);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 80);
    result.numLteCrsMappingRes = l2l1_getU16(offset + 84);
    result.lteCrsOption = l2l1_getU8(offset + 86);
    result.isCsirsRateMatching = l2l1_getU8(offset + 87);
    result.numCsirsMappingRes = l2l1_getU16(offset + 88);
    result.pdschScramblingSeqInit = l2l1_getU16(offset + 90);
    result.isLowPaprOptimizedPrecoding = l2l1_getU8(offset + 92);
    result.closedLoop3gppCodebook = l2l1_getU8(offset + 93);
/*    if (!(result.closedLoop3gppCodebook === [object Object] || result.closedLoop3gppCodebook === [object Object] || result.closedLoop3gppCodebook === [object Object] || result.closedLoop3gppCodebook === [object Object] || result.closedLoop3gppCodebook === [object Object]))
        throw new Error(`Value ${result.closedLoop3gppCodebook} is out of range for enum 'closedLoop3gppCodebook_t'`); */
    Object.defineProperty(result, "__enum_closedLoop3gppCodebook", {
        enumerable: false,
        writable: false,
        value: "l1_common_closedLoop3gppCodebook_t",
    });
    result.bestBeamPowerOffset = l2l1_getU8(offset + 94);
    result.rachStatus = l2l1_getU8(offset + 95);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });

    return result;
}
function DlDataencodePdschGrant(msg, buf, off) {
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
    encodeStaticFixedSizedArray_uint8_3(msg.i1Codebook4AntPorts, buf, off + 68);
    l2l1_putU8(msg.i2Codebook4AntPorts, buf, off + 72);
    l2l1_putU8(msg.pdschPrecodingOption4x4, buf, off + 73);
    l2l1_putU8(msg.numStreamIndex, buf, off + 74);
    l2l1_putU8(msg.openLoopScheme, buf, off + 75);
    encodeStaticFixedSizedArray_uint8_4(msg.streamIndex, buf, off + 76);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 80);
    l2l1_putU16(msg.numLteCrsMappingRes, buf, off + 84);
    l2l1_putU8(msg.lteCrsOption, buf, off + 86);
    l2l1_putU8(msg.isCsirsRateMatching, buf, off + 87);
    l2l1_putU16(msg.numCsirsMappingRes, buf, off + 88);
    l2l1_putU16(msg.pdschScramblingSeqInit, buf, off + 90);
    l2l1_putU8(msg.isLowPaprOptimizedPrecoding, buf, off + 92);
    l2l1_putU8(msg.closedLoop3gppCodebook, buf, off + 93);
    l2l1_putU8(msg.bestBeamPowerOffset, buf, off + 94);
    l2l1_putU8(msg.rachStatus, buf, off + 95);
}
function DlDatadecodePdschSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.grants = decodeDynamicPackedArray_PdschGrant_16(offset + 5);
    result.msgCountCtrl = l2l1_getU8(offset + 7);

    return result;
}
function DlDataencodePdschSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    encodeDynamicPackedArray_PdschGrant_16(msg.grants, buf, off + 5);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 7);
}
function DlDatadecodePatternIdPolListPerSymbol_t(offset) {
    let result = {};

    result.patternIdPolListPerSymbolPerBeam = decodeStaticFixedSizedArray_uint16_8(offset + 0);

    return result;
}
function DlDataencodePatternIdPolListPerSymbol_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_8(msg.patternIdPolListPerSymbolPerBeam, buf, off + 0);
}
function DlDatadecodePatternConfigReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.txRxBitmapPol = l2l1_getU16(offset + 6);
    result.numOfPatternIdPol = l2l1_getU8(offset + 8);
    result.numOfXpolBeams = l2l1_getU8(offset + 9);
    result.patternIdPolList = decodeStaticFixedSizedArray_PatternIdPolListPerSymbol_t_14(offset + 12);
    result.calibrationBitmap = l2l1_getU16(offset + 236);
    result.bfcmOffset = l2l1_getU8(offset + 238);

    return result;
}
function DlDataencodePatternConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.txRxBitmapPol, buf, off + 6);
    l2l1_putU8(msg.numOfPatternIdPol, buf, off + 8);
    l2l1_putU8(msg.numOfXpolBeams, buf, off + 9);
    encodeStaticFixedSizedArray_PatternIdPolListPerSymbol_t_14(msg.patternIdPolList, buf, off + 12);
    l2l1_putU16(msg.calibrationBitmap, buf, off + 236);
    l2l1_putU8(msg.bfcmOffset, buf, off + 238);
}
function DlDatadecodePdschPayloadTbSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.tbIndex = l2l1_getU32(offset + 8);
    result.tbFragmentOffset_bits = l2l1_getU32(offset + 12);
    result.payload = decodeDynamicVariableSizedArray_uint8_8960(offset + 16);

    return result;
}
function DlDataencodePdschPayloadTbSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU32(msg.tbIndex, buf, off + 8);
    l2l1_putU32(msg.tbFragmentOffset_bits, buf, off + 12);
    encodeDynamicVariableSizedArray_uint8_8960(msg.payload, buf, off + 16);
}
function DlDatadecodeSsBlockSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.activeSsBlocks = l2l1_getU8(offset + 5);
    result.threeLsbSsbIndex = l2l1_getU8(offset + 6);
    result.precodingVectorIndex = l2l1_getU8(offset + 7);
/*    if (!(result.precodingVectorIndex === [object Object] || result.precodingVectorIndex === [object Object] || result.precodingVectorIndex === [object Object] || result.precodingVectorIndex === [object Object]))
        throw new Error(`Value ${result.precodingVectorIndex} is out of range for enum 'precodingVectorIndex_t'`); */
    Object.defineProperty(result, "__enum_precodingVectorIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_precodingVectorIndex_t",
    });
    result.dataPayload = decodeStaticFixedSizedArray_uint8_4(offset + 8);
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 12);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 16);
    result.numCeAxcIndex = l2l1_getU8(offset + 24);
/*    if (!(result.numCeAxcIndex === [object Object] || result.numCeAxcIndex === [object Object] || result.numCeAxcIndex === [object Object] || result.numCeAxcIndex === [object Object] || result.numCeAxcIndex === [object Object] || result.numCeAxcIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxcIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxcIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.msgCountCtrl = l2l1_getU8(offset + 25);

    return result;
}
function DlDataencodeSsBlockSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.activeSsBlocks, buf, off + 5);
    l2l1_putU8(msg.threeLsbSsbIndex, buf, off + 6);
    l2l1_putU8(msg.precodingVectorIndex, buf, off + 7);
    encodeStaticFixedSizedArray_uint8_4(msg.dataPayload, buf, off + 8);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 12);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 16);
    l2l1_putU8(msg.numCeAxcIndex, buf, off + 24);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 25);
}
function DlDatadecodeCsiRsResource_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.csiBestBeamPowerOffset = l2l1_getU8(offset + 1);
    result.csiRsScramblingSequenceInt = l2l1_getU16(offset + 2);
    result.density = l2l1_getU8(offset + 4);
/*    if (!(result.density === [object Object] || result.density === [object Object] || result.density === [object Object]))
        throw new Error(`Value ${result.density} is out of range for enum 'csiRsDensity_t'`); */
    Object.defineProperty(result, "__enum_density", {
        enumerable: false,
        writable: false,
        value: "l1_common_csiRsDensity_t",
    });
    result.densityDot5PrbLocation = l2l1_getU8(offset + 5);
/*    if (!(result.densityDot5PrbLocation === [object Object] || result.densityDot5PrbLocation === [object Object]))
        throw new Error(`Value ${result.densityDot5PrbLocation} is out of range for enum 'csiRsDensityDot5PrbLocation_t'`); */
    Object.defineProperty(result, "__enum_densityDot5PrbLocation", {
        enumerable: false,
        writable: false,
        value: "l1_common_csiRsDensityDot5PrbLocation_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU16(offset + 8);
    result.csiRsConfig = l2l1_getU8(offset + 10);
    result.csiRsPrecodingMatrix = l2l1_getU8(offset + 11);
/*    if (!(result.csiRsPrecodingMatrix === [object Object] || result.csiRsPrecodingMatrix === [object Object] || result.csiRsPrecodingMatrix === [object Object] || result.csiRsPrecodingMatrix === [object Object]))
        throw new Error(`Value ${result.csiRsPrecodingMatrix} is out of range for enum 'csiRsPrecodingMatrix_t'`); */
    Object.defineProperty(result, "__enum_csiRsPrecodingMatrix", {
        enumerable: false,
        writable: false,
        value: "l1_common_csiRsPrecodingMatrix_t",
    });
    result.freqDomainAllocationKi = l2l1_getU16(offset + 12);
    result.csiTransmitPower = l2l1_getI16(offset + 14);
    result.pwrReductionPerCsiRsResource_dB = l2l1_getU8(offset + 16);
    result.antennaStream = l2l1_getU8(offset + 17);
    result.trsInfo = l2l1_getU8(offset + 18);
/*    if (!(result.trsInfo === [object Object] || result.trsInfo === [object Object]))
        throw new Error(`Value ${result.trsInfo} is out of range for enum 'csiRsTrsInfo_t'`); */
    Object.defineProperty(result, "__enum_trsInfo", {
        enumerable: false,
        writable: false,
        value: "l1_common_csiRsTrsInfo_t",
    });
    result.numCeAxCIndex = l2l1_getU8(offset + 19);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 20);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 24);

    return result;
}
function DlDataencodeCsiRsResource_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU8(msg.csiBestBeamPowerOffset, buf, off + 1);
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
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 20);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 24);
}
function DlDatadecodeCsiRsSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.csiRsResources = decodeDynamicVariableSizedArray_CsiRsResource_t_24(offset + 8);

    return result;
}
function DlDataencodeCsiRsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    encodeDynamicVariableSizedArray_CsiRsResource_t_24(msg.csiRsResources, buf, off + 8);
}
function l1_commondecodeFastAntennaSnapshotEventsList_t(offset) {
    let result = {};

    result.crnti = l2l1_getU16(offset + 0);
    result.eventNb = l2l1_getU8(offset + 2);
    result.eventType = l2l1_getU8(offset + 3);

    return result;
}
function l1_commonencodeFastAntennaSnapshotEventsList_t(msg, buf, off) {
    l2l1_putU16(msg.crnti, buf, off + 0);
    l2l1_putU8(msg.eventNb, buf, off + 2);
    l2l1_putU8(msg.eventType, buf, off + 3);
}
function DlDatadecodeFastAntennaSnapshotReq_t(offset) {
    let result = {};

    result.addrDlFastAntennaSnapshotResp = l2l1_getU32(offset + 0);
    result.dlSubCellId = l2l1_getU8(offset + 4);
    result.sfn = l2l1_getU16(offset + 6);
    result.slot = l2l1_getU8(offset + 8);
    result.numOfEvents = l2l1_getU8(offset + 9);
    result.eventsList = decodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(offset + 12);

    return result;
}
function DlDataencodeFastAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrDlFastAntennaSnapshotResp, buf, off + 0);
    l2l1_putU8(msg.dlSubCellId, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 8);
    l2l1_putU8(msg.numOfEvents, buf, off + 9);
    encodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(msg.eventsList, buf, off + 12);
}
function DlDatadecodeFastAntennaSnapshotResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusFastAntennaSnapshotResp_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_statusFastAntennaSnapshotResp_t",
    });

    return result;
}
function DlDataencodeFastAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function DlDatadecodeEmptySendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);

    return result;
}
function DlDataencodeEmptySendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
}
function DlDatadecodeDiagnosticInd_t(offset) {
    let result = {};

    result.indType = l2l1_getU8(offset + 0);

    return result;
}
function DlDataencodeDiagnosticInd_t(msg, buf, off) {
    l2l1_putU8(msg.indType, buf, off + 0);
}
function DlDatadecodeeCpriConfig_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);

    return result;
}
function DlDataencodeeCpriConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
}
function DlDatadecodeRimRsSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.rimRsScramblingSequenceInit = l2l1_getU32(offset + 8);
    result.nscID = l2l1_getU16(offset + 12);
    result.startSymbol = l2l1_getU8(offset + 14);
    result.startPrb = l2l1_getU16(offset + 16);
    result.numOfPrb = l2l1_getU16(offset + 18);
    result.rimRsTransmitPower = l2l1_getI16(offset + 20);
    result.antennaStream = l2l1_getU8(offset + 22);
    result.eCpriConfig = DlDatadecodeeCpriConfig_t(offset + 24);

    return result;
}
function DlDataencodeRimRsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    l2l1_putU32(msg.rimRsScramblingSequenceInit, buf, off + 8);
    l2l1_putU16(msg.nscID, buf, off + 12);
    l2l1_putU8(msg.startSymbol, buf, off + 14);
    l2l1_putU16(msg.startPrb, buf, off + 16);
    l2l1_putU16(msg.numOfPrb, buf, off + 18);
    l2l1_putI16(msg.rimRsTransmitPower, buf, off + 20);
    l2l1_putU8(msg.antennaStream, buf, off + 22);
    DlDataencodeeCpriConfig_t(msg.eCpriConfig, buf, off + 24);
}
function DlDatadecodeeCpriConfig_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);

    return result;
}
function DlDataencodeeCpriConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2DlAddresses = l1_commondecodeL2DlAddresses(offset + 4);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2DlAddresses(msg.l2DlAddresses, buf, off + 4);
}
function L1ECpridecodeSECpriLinkItem_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });

    return result;
}
function L1ECpriencodeSECpriLinkItem_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
}
function L1ECpridecodeConfigureLinksReq_t(offset) {
    let result = {};

    result.numOfItems = l2l1_getU32(offset + 0);
    result.eCpriLink = decodeStaticVariableSizedArray_SECpriLinkItem_t_16(offset + 4);
    result.scs = l2l1_getU8(offset + 24);

    return result;
}
function L1ECpriencodeConfigureLinksReq_t(msg, buf, off) {
    l2l1_putU32(msg.numOfItems, buf, off + 0);
    encodeStaticVariableSizedArray_SECpriLinkItem_t_16(msg.eCpriLink, buf, off + 4);
    l2l1_putU8(msg.scs, buf, off + 24);
}
function L1ECpridecodeSECpriLinkItem_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });

    return result;
}
function L1ECpriencodeSECpriLinkItem_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
}
function L1ECpridecodeConfigureLinksResp_t(offset) {
    let result = {};

    result.state = l2l1_getU8(offset + 0);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeConfigureLinksResp_t(msg, buf, off) {
    l2l1_putU8(msg.state, buf, off + 0);
}
function L1ECpridecodeSubscribeReq_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1ECpriencodeSubscribeReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.sicad, buf, off + 4);
}
function L1ECpridecodeSubscribeResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1ECpriencodeSubscribeResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.sicad, buf, off + 4);
}
function L1ECpridecodeSetOutputReq_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.outputState = l2l1_getU8(offset + 1);
/*    if (!(result.outputState === [object Object] || result.outputState === [object Object]))
        throw new Error(`Value ${result.outputState} is out of range for enum 'EOutputState_t'`); */
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EOutputState_t",
    });

    return result;
}
function L1ECpriencodeSetOutputReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.outputState, buf, off + 1);
}
function L1ECpridecodeSetOutputResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });
    result.outputState = l2l1_getU8(offset + 2);
/*    if (!(result.outputState === [object Object] || result.outputState === [object Object]))
        throw new Error(`Value ${result.outputState} is out of range for enum 'EOutputState_t'`); */
    Object.defineProperty(result, "__enum_outputState", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EOutputState_t",
    });

    return result;
}
function L1ECpriencodeSetOutputResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU8(msg.outputState, buf, off + 2);
}
function L1ECpridecodeStateInd_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.eCpriState = l2l1_getU8(offset + 1);
/*    if (!(result.eCpriState === [object Object] || result.eCpriState === [object Object]))
        throw new Error(`Value ${result.eCpriState} is out of range for enum 'EOamECpriLinkState_t'`); */
    Object.defineProperty(result, "__enum_eCpriState", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EOamECpriLinkState_t",
    });

    return result;
}
function L1ECpriencodeStateInd_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.eCpriState, buf, off + 1);
}
function L1ECpridecodeDelayConfigReq_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
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
function L1ECpriencodeDelayConfigReq_t(msg, buf, off) {
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
function L1ECpridecodeDelayConfigResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeDelayConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}
function L1ECpridecodeConfigureTransportReq_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.ruMacAddress = decodeStaticVariableSizedArray_uint8_6(offset + 4);
    result.vlanId = l2l1_getU16(offset + 12);

    return result;
}
function L1ECpriencodeConfigureTransportReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_6(msg.ruMacAddress, buf, off + 4);
    l2l1_putU16(msg.vlanId, buf, off + 12);
}
function L1ECpridecodeConfigureTransportResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeConfigureTransportResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
}
function L1ECpridecodeInitialDelayMeasReq_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.samplesPerMeas = l2l1_getU16(offset + 2);
    result.sampleInterval = l2l1_getU32(offset + 4);
    result.measInterval = l2l1_getU32(offset + 8);
    result.changeThreshold = l2l1_getU32(offset + 12);

    return result;
}
function L1ECpriencodeInitialDelayMeasReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU16(msg.samplesPerMeas, buf, off + 2);
    l2l1_putU32(msg.sampleInterval, buf, off + 4);
    l2l1_putU32(msg.measInterval, buf, off + 8);
    l2l1_putU32(msg.changeThreshold, buf, off + 12);
}
function L1ECpridecodeInitialDelayMeasResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.state = l2l1_getU8(offset + 1);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });
    result.tdOneWayMin = l2l1_getU32(offset + 4);
    result.tdOneWayMax = l2l1_getU32(offset + 8);

    return result;
}
function L1ECpriencodeInitialDelayMeasResp_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU8(msg.state, buf, off + 1);
    l2l1_putU32(msg.tdOneWayMin, buf, off + 4);
    l2l1_putU32(msg.tdOneWayMax, buf, off + 8);
}
function L1ECpridecodeDelayMeasInd_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.tdOneWayMin = l2l1_getU32(offset + 4);
    result.tdOneWayMax = l2l1_getU32(offset + 8);

    return result;
}
function L1ECpriencodeDelayMeasInd_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.tdOneWayMin, buf, off + 4);
    l2l1_putU32(msg.tdOneWayMax, buf, off + 8);
}
function L1ECpridecodeConfigureMeasurementsReq_t(offset) {
    let result = {};

    result.sicad = l2l1_getU32(offset + 0);
    result.measIntervalMsgRcv = l2l1_getU8(offset + 4);
/*    if (!(result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object] || result.measIntervalMsgRcv === [object Object]))
        throw new Error(`Value ${result.measIntervalMsgRcv} is out of range for enum 'EPerfMeasInterval'`); */
    Object.defineProperty(result, "__enum_measIntervalMsgRcv", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EPerfMeasInterval",
    });

    return result;
}
function L1ECpriencodeConfigureMeasurementsReq_t(msg, buf, off) {
    l2l1_putU32(msg.sicad, buf, off + 0);
    l2l1_putU8(msg.measIntervalMsgRcv, buf, off + 4);
}
function L1ECpridecodeConfigureMeasurementsResp_t(offset) {
    let result = {};

    result.state = l2l1_getU8(offset + 0);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeConfigureMeasurementsResp_t(msg, buf, off) {
    l2l1_putU8(msg.state, buf, off + 0);
}
function L1ECpridecodeSMsgRcvCountersItem(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
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
function L1ECpriencodeSMsgRcvCountersItem(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.ceAxCId, buf, off + 4);
    l2l1_putU64(msg.msgRcvAll, buf, off + 8);
    l2l1_putU64(msg.msgRcvOnTime, buf, off + 16);
    l2l1_putU64(msg.msgRcvTooEarly, buf, off + 24);
    l2l1_putU64(msg.msgRcvTooLate, buf, off + 32);
    l2l1_putU64(msg.msgRcvCorrupt, buf, off + 40);
    l2l1_putU64(msg.msgRcvDuplicate, buf, off + 48);
}
function L1ECpridecodeMsgRcvCountersInd_t(offset) {
    let result = {};

    result.numOfItems = l2l1_getU32(offset + 0);
    result.MsgRcvCounters = decodeStaticVariableSizedArray_SMsgRcvCountersItem_18(offset + 8);

    return result;
}
function L1ECpriencodeMsgRcvCountersInd_t(msg, buf, off) {
    l2l1_putU32(msg.numOfItems, buf, off + 0);
    encodeStaticVariableSizedArray_SMsgRcvCountersItem_18(msg.MsgRcvCounters, buf, off + 8);
}
function L1ECpridecodeAPI2ceAxCconfig_t(offset) {
    let result = {};

    result.ceAxCId = l2l1_getU16(offset + 0);
    result.ruMacAddress = decodeStaticVariableSizedArray_uint8_6(offset + 4);
    result.vlanId = l2l1_getU16(offset + 12);

    return result;
}
function L1ECpriencodeAPI2ceAxCconfig_t(msg, buf, off) {
    l2l1_putU16(msg.ceAxCId, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_6(msg.ruMacAddress, buf, off + 4);
    l2l1_putU16(msg.vlanId, buf, off + 12);
}
function L1ECpridecodeAPI2ConfigureTransportReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'Direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "l1_common_Direction_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 5);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.ceAxCinfo = decodeStaticVariableSizedArray_API2ceAxCconfig_t_64(offset + 8);

    return result;
}
function L1ECpriencodeAPI2ConfigureTransportReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.eCpriLink, buf, off + 5);
    encodeStaticVariableSizedArray_API2ceAxCconfig_t_64(msg.ceAxCinfo, buf, off + 8);
}
function L1ECpridecodeAPI2ceAxCconfig_t(offset) {
    let result = {};

    result.ceAxCId = l2l1_getU16(offset + 0);
    result.ruMacAddress = decodeStaticVariableSizedArray_uint8_6(offset + 4);
    result.vlanId = l2l1_getU16(offset + 12);

    return result;
}
function L1ECpriencodeAPI2ceAxCconfig_t(msg, buf, off) {
    l2l1_putU16(msg.ceAxCId, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_6(msg.ruMacAddress, buf, off + 4);
    l2l1_putU16(msg.vlanId, buf, off + 12);
}
function L1ECpridecodeAPI2ConfigureTransportResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.eCpriLink = l2l1_getU8(offset + 4);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.direction = l2l1_getU8(offset + 5);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'Direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "l1_common_Direction_t",
    });
    result.state = l2l1_getU8(offset + 6);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeAPI2ConfigureTransportResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.eCpriLink, buf, off + 4);
    l2l1_putU8(msg.direction, buf, off + 5);
    l2l1_putU8(msg.state, buf, off + 6);
}
function L1ECpridecodeAPI2DeleteTransportReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.direction = l2l1_getU8(offset + 4);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'Direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "l1_common_Direction_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 5);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.ceAxCId = decodeDynamicVariableSizedArray_uint16_64(offset + 8);

    return result;
}
function L1ECpriencodeAPI2DeleteTransportReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.direction, buf, off + 4);
    l2l1_putU8(msg.eCpriLink, buf, off + 5);
    encodeDynamicVariableSizedArray_uint16_64(msg.ceAxCId, buf, off + 8);
}
function L1ECpridecodeAPI2DeleteTransportResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.eCpriLink = l2l1_getU8(offset + 4);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.direction = l2l1_getU8(offset + 5);
/*    if (!(result.direction === [object Object] || result.direction === [object Object]))
        throw new Error(`Value ${result.direction} is out of range for enum 'Direction_t'`); */
    Object.defineProperty(result, "__enum_direction", {
        enumerable: false,
        writable: false,
        value: "l1_common_Direction_t",
    });
    result.state = l2l1_getU8(offset + 6);
/*    if (!(result.state === [object Object] || result.state === [object Object] || result.state === [object Object]))
        throw new Error(`Value ${result.state} is out of range for enum 'EExecutionState_t'`); */
    Object.defineProperty(result, "__enum_state", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EExecutionState_t",
    });

    return result;
}
function L1ECpriencodeAPI2DeleteTransportResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.eCpriLink, buf, off + 4);
    l2l1_putU8(msg.direction, buf, off + 5);
    l2l1_putU8(msg.state, buf, off + 6);
}
function L1LogdecodeAntennaSnapshotReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.requestType = l2l1_getU8(offset + 3);
/*    if (!(result.requestType === [object Object] || result.requestType === [object Object] || result.requestType === [object Object] || result.requestType === [object Object]))
        throw new Error(`Value ${result.requestType} is out of range for enum 'EAntennaSnapshotRequestType'`); */
    Object.defineProperty(result, "__enum_requestType", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotRequestType",
    });
    result.captureMode = l2l1_getU8(offset + 4);
/*    if (!(result.captureMode === [object Object] || result.captureMode === [object Object]))
        throw new Error(`Value ${result.captureMode} is out of range for enum 'EAntennaSnapshotCaptureModeType'`); */
    Object.defineProperty(result, "__enum_captureMode", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotCaptureModeType",
    });
    result.oneFilePerPath = l2l1_getU8(offset + 5);
/*    if (!(result.oneFilePerPath === [object Object] || result.oneFilePerPath === [object Object]))
        throw new Error(`Value ${result.oneFilePerPath} is out of range for enum 'EAntennaSnapshotFileFormatType'`); */
    Object.defineProperty(result, "__enum_oneFilePerPath", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotFileFormatType",
    });
    result.responseAck = l2l1_getU8(offset + 6);
/*    if (!(result.responseAck === [object Object] || result.responseAck === [object Object]))
        throw new Error(`Value ${result.responseAck} is out of range for enum 'EAntennaSnapshotSendAckType'`); */
    Object.defineProperty(result, "__enum_responseAck", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotSendAckType",
    });

    return result;
}
function L1LogencodeAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.requestType, buf, off + 3);
    l2l1_putU8(msg.captureMode, buf, off + 4);
    l2l1_putU8(msg.oneFilePerPath, buf, off + 5);
    l2l1_putU8(msg.responseAck, buf, off + 6);
}
function L1LogdecodeAntennaSnapshotResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });

    return result;
}
function L1LogencodeAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function L1LogdecodeantennaSnapshotFile_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });
    result.fileSize = l2l1_getU32(offset + 4);
    result.fileName = decodeStaticVariableSizedArray_uint8_80(offset + 8);

    return result;
}
function L1LogencodeantennaSnapshotFile_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.fileSize, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_80(msg.fileName, buf, off + 8);
}
function L1LogdecodeAntennaSnapshotInd_t(offset) {
    let result = {};

    result.bcnN = l2l1_getU64(offset + 0);
    result.reportType = l2l1_getU8(offset + 8);
/*    if (!(result.reportType === [object Object] || result.reportType === [object Object] || result.reportType === [object Object] || result.reportType === [object Object]))
        throw new Error(`Value ${result.reportType} is out of range for enum 'EAntennaSnapshotRequestType'`); */
    Object.defineProperty(result, "__enum_reportType", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotRequestType",
    });
    result.numberOfFiles = l2l1_getU8(offset + 9);
    result.fileList = decodeStaticVariableSizedArray_antennaSnapshotFile_t_64(offset + 12);

    return result;
}
function L1LogencodeAntennaSnapshotInd_t(msg, buf, off) {
    l2l1_putU64(msg.bcnN, buf, off + 0);
    l2l1_putU8(msg.reportType, buf, off + 8);
    l2l1_putU8(msg.numberOfFiles, buf, off + 9);
    encodeStaticVariableSizedArray_antennaSnapshotFile_t_64(msg.fileList, buf, off + 12);
}
function L1LogdecodeantennaSnapshotFile_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });
    result.fileSize = l2l1_getU32(offset + 4);
    result.fileName = decodeStaticVariableSizedArray_uint8_80(offset + 8);

    return result;
}
function L1LogencodeantennaSnapshotFile_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU32(msg.fileSize, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_80(msg.fileName, buf, off + 8);
}
function L1LogdecodeTraceReqHeader_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.physCellId = l2l1_getU16(offset + 4);
    result.trswEQID = l2l1_getU32(offset + 8);
    result.action = l2l1_getU8(offset + 12);
/*    if (!(result.action === [object Object] || result.action === [object Object] || result.action === [object Object] || result.action === [object Object]))
        throw new Error(`Value ${result.action} is out of range for enum 'EReportType'`); */
    Object.defineProperty(result, "__enum_action", {
        enumerable: false,
        writable: false,
        value: "L1Log_EReportType",
    });
    result.outputMode = l2l1_getU8(offset + 13);
/*    if (!(result.outputMode === [object Object] || result.outputMode === [object Object]))
        throw new Error(`Value ${result.outputMode} is out of range for enum 'EOutputMode'`); */
    Object.defineProperty(result, "__enum_outputMode", {
        enumerable: false,
        writable: false,
        value: "L1Log_EOutputMode",
    });
    result.trswMacAddr = l2l1_getU64(offset + 16);

    return result;
}
function L1LogencodeTraceReqHeader_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU32(msg.trswEQID, buf, off + 8);
    l2l1_putU8(msg.action, buf, off + 12);
    l2l1_putU8(msg.outputMode, buf, off + 13);
    l2l1_putU64(msg.trswMacAddr, buf, off + 16);
}
function L1LogdecodeTraceReqEntry_t(offset) {
    let result = {};

    result.subtype = l2l1_getU16(offset + 0);
    result.traceId = l2l1_getU16(offset + 2);
    result.nbReports = l2l1_getU16(offset + 4);

    return result;
}
function L1LogencodeTraceReqEntry_t(msg, buf, off) {
    l2l1_putU16(msg.subtype, buf, off + 0);
    l2l1_putU16(msg.traceId, buf, off + 2);
    l2l1_putU16(msg.nbReports, buf, off + 4);
}
function L1LogdecodeTraceReq_t(offset) {
    let result = {};

    result.header = L1LogdecodeTraceReqHeader_t(offset + 0);
    result.traces = decodeStaticVariableSizedArray_TraceReqEntry_t_10(offset + 24);

    return result;
}
function L1LogencodeTraceReq_t(msg, buf, off) {
    L1LogencodeTraceReqHeader_t(msg.header, buf, off + 0);
    encodeStaticVariableSizedArray_TraceReqEntry_t_10(msg.traces, buf, off + 24);
}
function L1LogdecodeTraceResp_t(offset) {
    let result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.status = l2l1_getU8(offset + 2);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });

    return result;
}
function L1LogencodeTraceResp_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 2);
}
function L1LogdecodeTraceInd_t(offset) {
    let result = {};

    result.bcn = l2l1_getU64(offset + 0);
    result.msgSeqNum = l2l1_getU16(offset + 8);
    result.tracePayload = decodeStaticVariableSizedArray_uint8_1400(offset + 12);

    return result;
}
function L1LogencodeTraceInd_t(msg, buf, off) {
    l2l1_putU64(msg.bcn, buf, off + 0);
    l2l1_putU16(msg.msgSeqNum, buf, off + 8);
    encodeStaticVariableSizedArray_uint8_1400(msg.tracePayload, buf, off + 12);
}
function L1LogdecodeShowTraceListReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.physCellId = l2l1_getU16(offset + 4);
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 6);
/*    if (!(result.antSnapshotL1EventEnabled === [object Object] || result.antSnapshotL1EventEnabled === [object Object]))
        throw new Error(`Value ${result.antSnapshotL1EventEnabled} is out of range for enum 'EAntSnapshotL1Enabled'`); */
    Object.defineProperty(result, "__enum_antSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntSnapshotL1Enabled",
    });

    return result;
}
function L1LogencodeShowTraceListReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU16(msg.physCellId, buf, off + 4);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 6);
}
function L1LogdecodeShowTraceListResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });
    result.traceList = decodeStaticVariableSizedArray_uint8_100(offset + 4);

    return result;
}
function L1LogencodeShowTraceListResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_100(msg.traceList, buf, off + 4);
}
function L1LogdecodeAntennaSnapshotConfigurationReq_t(offset) {
    let result = {};

    result.numDlCellId = l2l1_getU8(offset + 0);
    result.dlCellId = decodeStaticFixedSizedArray_uint32_4(offset + 4);
    result.numUlCellId = l2l1_getU8(offset + 20);
    result.ulCellId = decodeStaticFixedSizedArray_uint32_4(offset + 24);
    result.numUlSubCellId = l2l1_getU8(offset + 40);
    result.ulSubcellId = decodeStaticFixedSizedArray_uint8_4(offset + 44);
    result.ulSubCellCarrierFreq = decodeStaticFixedSizedArray_uint64_4(offset + 48);
    result.numDlSubCellId = l2l1_getU8(offset + 80);
    result.dlSubcellId = decodeStaticFixedSizedArray_uint8_4(offset + 84);
    result.dlSubCellCarrierFreq = decodeStaticFixedSizedArray_uint64_4(offset + 88);
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 120);
/*    if (!(result.antSnapshotL1EventEnabled === [object Object] || result.antSnapshotL1EventEnabled === [object Object]))
        throw new Error(`Value ${result.antSnapshotL1EventEnabled} is out of range for enum 'EAntennaSnapshotL1EventEnableType'`); */
    Object.defineProperty(result, "__enum_antSnapshotL1EventEnabled", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotL1EventEnableType",
    });
    result.reason = l2l1_getU8(offset + 121);
/*    if (!(result.reason === [object Object] || result.reason === [object Object] || result.reason === [object Object] || result.reason === [object Object] || result.reason === [object Object]))
        throw new Error(`Value ${result.reason} is out of range for enum 'EAntennaSnapshotConfigurationRequestReason'`); */
    Object.defineProperty(result, "__enum_reason", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotConfigurationRequestReason",
    });
    result.captureType = l2l1_getU8(offset + 122);
/*    if (!(result.captureType === [object Object] || result.captureType === [object Object]))
        throw new Error(`Value ${result.captureType} is out of range for enum 'EAntennaSnapshotCaptureType'`); */
    Object.defineProperty(result, "__enum_captureType", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotCaptureType",
    });
    result.bufferCycle = l2l1_getU16(offset + 124);
/*    if (!(result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object] || result.bufferCycle === [object Object]))
        throw new Error(`Value ${result.bufferCycle} is out of range for enum 'EAntennaSnapshotBufferCycle'`); */
    Object.defineProperty(result, "__enum_bufferCycle", {
        enumerable: false,
        writable: false,
        value: "L1Log_EAntennaSnapshotBufferCycle",
    });
    result.captureFrameOffset = l2l1_getU16(offset + 126);

    return result;
}
function L1LogencodeAntennaSnapshotConfigurationReq_t(msg, buf, off) {
    l2l1_putU8(msg.numDlCellId, buf, off + 0);
    encodeStaticFixedSizedArray_uint32_4(msg.dlCellId, buf, off + 4);
    l2l1_putU8(msg.numUlCellId, buf, off + 20);
    encodeStaticFixedSizedArray_uint32_4(msg.ulCellId, buf, off + 24);
    l2l1_putU8(msg.numUlSubCellId, buf, off + 40);
    encodeStaticFixedSizedArray_uint8_4(msg.ulSubcellId, buf, off + 44);
    encodeStaticFixedSizedArray_uint64_4(msg.ulSubCellCarrierFreq, buf, off + 48);
    l2l1_putU8(msg.numDlSubCellId, buf, off + 80);
    encodeStaticFixedSizedArray_uint8_4(msg.dlSubcellId, buf, off + 84);
    encodeStaticFixedSizedArray_uint64_4(msg.dlSubCellCarrierFreq, buf, off + 88);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 120);
    l2l1_putU8(msg.reason, buf, off + 121);
    l2l1_putU8(msg.captureType, buf, off + 122);
    l2l1_putU16(msg.bufferCycle, buf, off + 124);
    l2l1_putU16(msg.captureFrameOffset, buf, off + 126);
}
function L1LogdecodeAntennaSnapshotConfigurationResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });

    return result;
}
function L1LogencodeAntennaSnapshotConfigurationResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function L1LogdecodeSuspiciousEventInd_t(offset) {
    let result = {};

    result.indType = l2l1_getU8(offset + 0);
/*    if (!(result.indType === [object Object] || result.indType === [object Object] || result.indType === [object Object] || result.indType === [object Object]))
        throw new Error(`Value ${result.indType} is out of range for enum 'indType_t'`); */
    Object.defineProperty(result, "__enum_indType", {
        enumerable: false,
        writable: false,
        value: "l1_common_indType_t",
    });
    result.eventType = l2l1_getU8(offset + 1);
/*    if (!(result.eventType === [object Object] || result.eventType === [object Object] || result.eventType === [object Object] || result.eventType === [object Object]))
        throw new Error(`Value ${result.eventType} is out of range for enum 'eventType_t'`); */
    Object.defineProperty(result, "__enum_eventType", {
        enumerable: false,
        writable: false,
        value: "l1_common_eventType_t",
    });
    result.cancelScenario = l2l1_getU8(offset + 2);
/*    if (!(result.cancelScenario === [object Object] || result.cancelScenario === [object Object] || result.cancelScenario === [object Object] || result.cancelScenario === [object Object]))
        throw new Error(`Value ${result.cancelScenario} is out of range for enum 'cancelScenario_t'`); */
    Object.defineProperty(result, "__enum_cancelScenario", {
        enumerable: false,
        writable: false,
        value: "l1_common_cancelScenario_t",
    });
    result.cellId = decodeDynamicVariableSizedArray_uint32_2(offset + 4);

    return result;
}
function L1LogencodeSuspiciousEventInd_t(msg, buf, off) {
    l2l1_putU8(msg.indType, buf, off + 0);
    l2l1_putU8(msg.eventType, buf, off + 1);
    l2l1_putU8(msg.cancelScenario, buf, off + 2);
    encodeDynamicVariableSizedArray_uint32_2(msg.cellId, buf, off + 4);
}
function L1LogdecodeOverloadStatusInd_t(offset) {
    let result = {};

    result.nodeId = l2l1_getU16(offset + 0);
    result.overloadStatus = l2l1_getU8(offset + 2);
/*    if (!(result.overloadStatus === [object Object] || result.overloadStatus === [object Object]))
        throw new Error(`Value ${result.overloadStatus} is out of range for enum 'overloadStatus_t'`); */
    Object.defineProperty(result, "__enum_overloadStatus", {
        enumerable: false,
        writable: false,
        value: "L1Log_overloadStatus_t",
    });

    return result;
}
function L1LogencodeOverloadStatusInd_t(msg, buf, off) {
    l2l1_putU16(msg.nodeId, buf, off + 0);
    l2l1_putU8(msg.overloadStatus, buf, off + 2);
}
function L1LogdecodeActTraceOverloadReq_t(offset) {
    let result = {};

    result.actTraceOvlProt = l2l1_getU8(offset + 0);

    return result;
}
function L1LogencodeActTraceOverloadReq_t(msg, buf, off) {
    l2l1_putU8(msg.actTraceOvlProt, buf, off + 0);
}
function L1LogdecodeActTraceOverloadResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'actTraceStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Log_actTraceStatus_t",
    });

    return result;
}
function L1LogencodeActTraceOverloadResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function L1LogdecodeAntennaSnapshotStopInd_t(offset) {
    let result = {};

    result.numDlCellId = l2l1_getU8(offset + 0);
    result.dlCellId = decodeStaticFixedSizedArray_uint32_4(offset + 4);
    result.numUlCellId = l2l1_getU8(offset + 20);
    result.ulCellId = decodeStaticFixedSizedArray_uint32_4(offset + 24);
    result.numDlSubCellId = l2l1_getU8(offset + 40);
    result.dlSubcellId = decodeStaticFixedSizedArray_uint8_4(offset + 44);
    result.numUlSubCellId = l2l1_getU8(offset + 48);
    result.ulSubcellId = decodeStaticFixedSizedArray_uint8_4(offset + 52);

    return result;
}
function L1LogencodeAntennaSnapshotStopInd_t(msg, buf, off) {
    l2l1_putU8(msg.numDlCellId, buf, off + 0);
    encodeStaticFixedSizedArray_uint32_4(msg.dlCellId, buf, off + 4);
    l2l1_putU8(msg.numUlCellId, buf, off + 20);
    encodeStaticFixedSizedArray_uint32_4(msg.ulCellId, buf, off + 24);
    l2l1_putU8(msg.numDlSubCellId, buf, off + 40);
    encodeStaticFixedSizedArray_uint8_4(msg.dlSubcellId, buf, off + 44);
    l2l1_putU8(msg.numUlSubCellId, buf, off + 48);
    encodeStaticFixedSizedArray_uint8_4(msg.ulSubcellId, buf, off + 52);
}
function L1decodeDmaEndInd_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeDmaEndInd_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeDmaStartTestReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeDmaStartTestReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeEchoReq_t(offset) {
    let result = {};

    result.payload = decodeStaticFixedSizedArray_uint8_64(offset + 0);

    return result;
}
function L1encodeEchoReq_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint8_64(msg.payload, buf, off + 0);
}
function L1decodeEchoResp_t(offset) {
    let result = {};

    result.payload = decodeStaticFixedSizedArray_uint8_64(offset + 0);

    return result;
}
function L1encodeEchoResp_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint8_64(msg.payload, buf, off + 0);
}
function L1decodeLatencyEventReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeLatencyEventReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeLaWakeupReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcell_index = l2l1_getU32(offset + 4);
    result.type_info = l2l1_getU16(offset + 8);
    result.param = l2l1_getU8(offset + 10);

    return result;
}
function L1encodeLaWakeupReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU32(msg.subcell_index, buf, off + 4);
    l2l1_putU16(msg.type_info, buf, off + 8);
    l2l1_putU8(msg.param, buf, off + 10);
}
function L1decodeLoopReq_t(offset) {
    let result = {};

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
function L1encodeLoopReq_t(msg, buf, off) {
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
function L1decodePingPongReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodePingPongReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeSnapshotFileCreationReq_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeSnapshotFileCreationReq_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1decodeStartupLoopReq_t(offset) {
    let result = {};

    result.state = l2l1_getU32(offset + 0);
    result.count = l2l1_getU32(offset + 4);

    return result;
}
function L1encodeStartupLoopReq_t(msg, buf, off) {
    l2l1_putU32(msg.state, buf, off + 0);
    l2l1_putU32(msg.count, buf, off + 4);
}
function L1decodeUlMeasReq_t(offset) {
    let result = {};

    result.subCellIndex = l2l1_getU32(offset + 0);
    result.queueEntry = l2l1_getU32(offset + 4);
    result.measBufType = l2l1_getU32(offset + 8);

    return result;
}
function L1encodeUlMeasReq_t(msg, buf, off) {
    l2l1_putU32(msg.subCellIndex, buf, off + 0);
    l2l1_putU32(msg.queueEntry, buf, off + 4);
    l2l1_putU32(msg.measBufType, buf, off + 8);
}
function L1decodeWakeupReq_t(offset) {
    let result = {};

    result.subcell_index = l2l1_getU32(offset + 0);

    return result;
}
function L1encodeWakeupReq_t(msg, buf, off) {
    l2l1_putU32(msg.subcell_index, buf, off + 0);
}
function L1decodeNrtRxSubcellResetReq_t(offset) {
    let result = {};

    result.subcell_id = l2l1_getU8(offset + 0);

    return result;
}
function L1encodeNrtRxSubcellResetReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcell_id, buf, off + 0);
}
function L1decodeSyncInd_t(offset) {
    let result = {};

    result.delay_nSec = l2l1_getI32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.subcellId = l2l1_getU8(offset + 6);
    result.slot = l2l1_getU8(offset + 7);

    return result;
}
function L1encodeSyncInd_t(msg, buf, off) {
    l2l1_putI32(msg.delay_nSec, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 7);
}
function L1decodeTestModeConfigReq_t(offset) {
    let result = {};

    result.operationType = l2l1_getU8(offset + 0);
/*    if (!(result.operationType === [object Object] || result.operationType === [object Object]))
        throw new Error(`Value ${result.operationType} is out of range for enum 'operationType_t'`); */
    Object.defineProperty(result, "__enum_operationType", {
        enumerable: false,
        writable: false,
        value: "L1_operationType_t",
    });

    return result;
}
function L1encodeTestModeConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.operationType, buf, off + 0);
}
function L1decodeTestModeConfigResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1_status_t",
    });

    return result;
}
function L1encodeTestModeConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function decodeDmaEndInd_t(offset) {
    let result = {};

    result.data = l2l1_getU32(offset + 0);

    return result;
}
function encodeDmaEndInd_t(msg, buf, off) {
    l2l1_putU32(msg.data, buf, off + 0);
}
function L1StatusdecodeAutohealingSubscribeReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.address = l2l1_getU32(offset + 4);

    return result;
}
function L1StatusencodeAutohealingSubscribeReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU32(msg.address, buf, off + 4);
}
function L1StatusdecodeAutohealingSubscribeResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Status_status_t",
    });

    return result;
}
function L1StatusencodeAutohealingSubscribeResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1StatusdecodeAutohealingStatusInd_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusInd_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1Status_statusInd_t",
    });
    result.acceleratorType = l2l1_getU8(offset + 5);
/*    if (!(result.acceleratorType === [object Object] || result.acceleratorType === [object Object]))
        throw new Error(`Value ${result.acceleratorType} is out of range for enum 'acceleratorType_t'`); */
    Object.defineProperty(result, "__enum_acceleratorType", {
        enumerable: false,
        writable: false,
        value: "L1Status_acceleratorType_t",
    });
    result.acceleratorId = l2l1_getU8(offset + 6);
    result.acceleratorGroupType = l2l1_getU8(offset + 7);
/*    if (!(result.acceleratorGroupType === [object Object] || result.acceleratorGroupType === [object Object] || result.acceleratorGroupType === [object Object] || result.acceleratorGroupType === [object Object]))
        throw new Error(`Value ${result.acceleratorGroupType} is out of range for enum 'acceleratorGroupType_t'`); */
    Object.defineProperty(result, "__enum_acceleratorGroupType", {
        enumerable: false,
        writable: false,
        value: "L1Status_acceleratorGroupType_t",
    });
    result.crashType = l2l1_getU8(offset + 8);
/*    if (!(result.crashType === [object Object] || result.crashType === [object Object]))
        throw new Error(`Value ${result.crashType} is out of range for enum 'crashType_t'`); */
    Object.defineProperty(result, "__enum_crashType", {
        enumerable: false,
        writable: false,
        value: "L1Status_crashType_t",
    });
    result.poolId = decodeStaticVariableSizedArray_uint32_4(offset + 12);
    result.cause = l2l1_getU8(offset + 32);
/*    if (!(result.cause === [object Object] || result.cause === [object Object]))
        throw new Error(`Value ${result.cause} is out of range for enum 'causeType_t'`); */
    Object.defineProperty(result, "__enum_cause", {
        enumerable: false,
        writable: false,
        value: "L1Status_causeType_t",
    });

    return result;
}
function L1StatusencodeAutohealingStatusInd_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
    l2l1_putU8(msg.acceleratorType, buf, off + 5);
    l2l1_putU8(msg.acceleratorId, buf, off + 6);
    l2l1_putU8(msg.acceleratorGroupType, buf, off + 7);
    l2l1_putU8(msg.crashType, buf, off + 8);
    encodeStaticVariableSizedArray_uint32_4(msg.poolId, buf, off + 12);
    l2l1_putU8(msg.cause, buf, off + 32);
}
function decodeAutohealingSubscribeReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.address = l2l1_getU32(offset + 4);

    return result;
}
function encodeAutohealingSubscribeReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU32(msg.address, buf, off + 4);
}
function SyncMdecodestartPtpReq_t(offset) {
    let result = {};

    result.defaultDsPriority1 = l2l1_getU8(offset + 0);
    result.defaultDsPriority2 = l2l1_getU8(offset + 1);
    result.defaultDsDomainNumber = l2l1_getU8(offset + 2);
    result.stepsRemoved = l2l1_getU8(offset + 3);
    result.logMinDelayReqInterval = l2l1_getI32(offset + 4);
    result.logSyncInterval = l2l1_getI32(offset + 8);
    result.logAnnounceInterval = l2l1_getI32(offset + 12);
    result.transportMode = l2l1_getU8(offset + 16);
/*    if (!(result.transportMode === [object Object] || result.transportMode === [object Object]))
        throw new Error(`Value ${result.transportMode} is out of range for enum 'transportMode_t'`); */
    Object.defineProperty(result, "__enum_transportMode", {
        enumerable: false,
        writable: false,
        value: "SyncM_transportMode_t",
    });
    result.castMode = l2l1_getU8(offset + 17);
/*    if (!(result.castMode === [object Object] || result.castMode === [object Object]))
        throw new Error(`Value ${result.castMode} is out of range for enum 'castMode_t'`); */
    Object.defineProperty(result, "__enum_castMode", {
        enumerable: false,
        writable: false,
        value: "SyncM_castMode_t",
    });
    result.ptpEthMulticastAddress = l2l1_getU64(offset + 24);
/*    if (!(result.ptpEthMulticastAddress === [object Object] || result.ptpEthMulticastAddress === [object Object]))
        throw new Error(`Value ${result.ptpEthMulticastAddress} is out of range for enum 'ptpEthMulticastAddress_t'`); */
    Object.defineProperty(result, "__enum_ptpEthMulticastAddress", {
        enumerable: false,
        writable: false,
        value: "SyncM_ptpEthMulticastAddress_t",
    });
    result.clockIdentity = l2l1_getU64(offset + 32);
    result.portNumberOffset = l2l1_getU8(offset + 40);
    result.secondaryBcnOffset = l2l1_getI32(offset + 44);
    result.clockClass = l2l1_getU8(offset + 48);
/*    if (!(result.clockClass === [object Object] || result.clockClass === [object Object] || result.clockClass === [object Object]))
        throw new Error(`Value ${result.clockClass} is out of range for enum 'clockClass_t'`); */
    Object.defineProperty(result, "__enum_clockClass", {
        enumerable: false,
        writable: false,
        value: "SyncM_clockClass_t",
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
    result.ptpECpriPort = decodeStaticVariableSizedArray_uint8_12(offset + 64);

    return result;
}
function SyncMencodestartPtpReq_t(msg, buf, off) {
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
    encodeStaticVariableSizedArray_uint8_12(msg.ptpECpriPort, buf, off + 64);
}
function SyncMdecodestartPtpResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodestartPtpResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodeupdatePtpConfigReq_t(offset) {
    let result = {};

    result.defaultDsDomainNumber = l2l1_getU8(offset + 0);
    result.ptpEthMulticastAddress = l2l1_getU64(offset + 8);
/*    if (!(result.ptpEthMulticastAddress === [object Object] || result.ptpEthMulticastAddress === [object Object]))
        throw new Error(`Value ${result.ptpEthMulticastAddress} is out of range for enum 'ptpEthMulticastAddress_t'`); */
    Object.defineProperty(result, "__enum_ptpEthMulticastAddress", {
        enumerable: false,
        writable: false,
        value: "SyncM_ptpEthMulticastAddress_t",
    });
    result.clockClass = l2l1_getU8(offset + 16);
/*    if (!(result.clockClass === [object Object] || result.clockClass === [object Object] || result.clockClass === [object Object]))
        throw new Error(`Value ${result.clockClass} is out of range for enum 'clockClass_t'`); */
    Object.defineProperty(result, "__enum_clockClass", {
        enumerable: false,
        writable: false,
        value: "SyncM_clockClass_t",
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
    result.ptpECpriPort = decodeStaticVariableSizedArray_uint8_12(offset + 32);

    return result;
}
function SyncMencodeupdatePtpConfigReq_t(msg, buf, off) {
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
    encodeStaticVariableSizedArray_uint8_12(msg.ptpECpriPort, buf, off + 32);
}
function SyncMdecodeupdatePtpConfigResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodeupdatePtpConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodestartSyncEReq_t(offset) {
    let result = {};

    result.g781NetworkOption = l2l1_getU8(offset + 0);
/*    if (!(result.g781NetworkOption === [object Object] || result.g781NetworkOption === [object Object] || result.g781NetworkOption === [object Object]))
        throw new Error(`Value ${result.g781NetworkOption} is out of range for enum 'g781NetworkOption_t'`); */
    Object.defineProperty(result, "__enum_g781NetworkOption", {
        enumerable: false,
        writable: false,
        value: "SyncM_g781NetworkOption_t",
    });
    result.ssmQl = l2l1_getU8(offset + 1);
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_uint8_12(offset + 4);

    return result;
}
function SyncMencodestartSyncEReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_12(msg.ssmSendingECpriPort, buf, off + 4);
}
function SyncMdecodestartSyncEResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodestartSyncEResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodeupdateSyncEConfigReq_t(offset) {
    let result = {};

    result.g781NetworkOption = l2l1_getU8(offset + 0);
/*    if (!(result.g781NetworkOption === [object Object] || result.g781NetworkOption === [object Object] || result.g781NetworkOption === [object Object]))
        throw new Error(`Value ${result.g781NetworkOption} is out of range for enum 'g781NetworkOption_t'`); */
    Object.defineProperty(result, "__enum_g781NetworkOption", {
        enumerable: false,
        writable: false,
        value: "SyncM_g781NetworkOption_t",
    });
    result.ssmQl = l2l1_getU8(offset + 1);
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_uint8_12(offset + 4);

    return result;
}
function SyncMencodeupdateSyncEConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_12(msg.ssmSendingECpriPort, buf, off + 4);
}
function SyncMdecodeupdateSyncEConfigResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodeupdateSyncEConfigResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodegetSyncEStatusReq_t(offset) {
    let result = {};

    result.resetCounters = l2l1_getU8(offset + 0);

    return result;
}
function SyncMencodegetSyncEStatusReq_t(msg, buf, off) {
    l2l1_putU8(msg.resetCounters, buf, off + 0);
}
function SyncMdecodeSyncEStatus(offset) {
    let result = {};

    result.transmittedEsmcPackets = l2l1_getU32(offset + 0);

    return result;
}
function SyncMencodeSyncEStatus(msg, buf, off) {
    l2l1_putU32(msg.transmittedEsmcPackets, buf, off + 0);
}
function SyncMdecodegetSyncEStatusResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_SyncEStatus_12(offset + 4);

    return result;
}
function SyncMencodegetSyncEStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    encodeStaticVariableSizedArray_SyncEStatus_12(msg.ssmSendingECpriPort, buf, off + 4);
}
function SyncMdecodegetPtpStatusReq_t(offset) {
    let result = {};

    result.resetCounters = l2l1_getU8(offset + 0);

    return result;
}
function SyncMencodegetPtpStatusReq_t(msg, buf, off) {
    l2l1_putU8(msg.resetCounters, buf, off + 0);
}
function SyncMdecodePtpStatus(offset) {
    let result = {};

    result.transmittedAnnouncePackets = l2l1_getU32(offset + 0);
    result.transmittedSyncPackets = l2l1_getU32(offset + 4);
    result.transmittedDelayRespPackets = l2l1_getU32(offset + 8);
    result.receivedDelayReqPackets = l2l1_getU32(offset + 12);

    return result;
}
function SyncMencodePtpStatus(msg, buf, off) {
    l2l1_putU32(msg.transmittedAnnouncePackets, buf, off + 0);
    l2l1_putU32(msg.transmittedSyncPackets, buf, off + 4);
    l2l1_putU32(msg.transmittedDelayRespPackets, buf, off + 8);
    l2l1_putU32(msg.receivedDelayReqPackets, buf, off + 12);
}
function SyncMdecodegetPtpStatusResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });
    result.ptpECpriPort = decodeStaticVariableSizedArray_PtpStatus_12(offset + 4);

    return result;
}
function SyncMencodegetPtpStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    encodeStaticVariableSizedArray_PtpStatus_12(msg.ptpECpriPort, buf, off + 4);
}
function SyncMdecodestopSyncEReq_t(offset) {
    let result = {};

    result.dummy = l2l1_getI8(offset + 0);

    return result;
}
function SyncMencodestopSyncEReq_t(msg, buf, off) {
    l2l1_putI8(msg.dummy, buf, off + 0);
}
function SyncMdecodestopSyncEResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodestopSyncEResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodestopPtpReq_t(offset) {
    let result = {};

    result.dummy = l2l1_getI8(offset + 0);

    return result;
}
function SyncMencodestopPtpReq_t(msg, buf, off) {
    l2l1_putI8(msg.dummy, buf, off + 0);
}
function SyncMdecodestopPtpResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "SyncM_status_t",
    });

    return result;
}
function SyncMencodestopPtpResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function SyncMdecodestatusInd_t(offset) {
    let result = {};

    result.syncmasterStatus = l2l1_getU8(offset + 0);
/*    if (!(result.syncmasterStatus === [object Object] || result.syncmasterStatus === [object Object] || result.syncmasterStatus === [object Object]))
        throw new Error(`Value ${result.syncmasterStatus} is out of range for enum 'syncmasterStatus_t'`); */
    Object.defineProperty(result, "__enum_syncmasterStatus", {
        enumerable: false,
        writable: false,
        value: "SyncM_syncmasterStatus_t",
    });

    return result;
}
function SyncMencodestatusInd_t(msg, buf, off) {
    l2l1_putU8(msg.syncmasterStatus, buf, off + 0);
}
function L1SyncSlavedecodestartPtpSlaveReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.defaultDsDomainNumber = l2l1_getU8(offset + 4);
    result.castMode = l2l1_getU8(offset + 5);
/*    if (!(result.castMode === [object Object] || result.castMode === [object Object]))
        throw new Error(`Value ${result.castMode} is out of range for enum 'castMode_t'`); */
    Object.defineProperty(result, "__enum_castMode", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_castMode_t",
    });
    result.delayReqInterval = l2l1_getU8(offset + 6);
/*    if (!(result.delayReqInterval === [object Object] || result.delayReqInterval === [object Object]))
        throw new Error(`Value ${result.delayReqInterval} is out of range for enum 'delayReqInterval_t'`); */
    Object.defineProperty(result, "__enum_delayReqInterval", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_delayReqInterval_t",
    });
    result.ptpProfile = l2l1_getU8(offset + 7);
/*    if (!(result.ptpProfile === [object Object] || result.ptpProfile === [object Object]))
        throw new Error(`Value ${result.ptpProfile} is out of range for enum 'ptpProfile_t'`); */
    Object.defineProperty(result, "__enum_ptpProfile", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_ptpProfile_t",
    });
    result.ptpEthMulticastAddress = l2l1_getU64(offset + 8);
/*    if (!(result.ptpEthMulticastAddress === [object Object] || result.ptpEthMulticastAddress === [object Object]))
        throw new Error(`Value ${result.ptpEthMulticastAddress} is out of range for enum 'ptpEthMulticastAddress_t'`); */
    Object.defineProperty(result, "__enum_ptpEthMulticastAddress", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_ptpEthMulticastAddress_t",
    });
    result.secondaryBcnOffset = l2l1_getI32(offset + 16);
    result.clockIdentity = l2l1_getU64(offset + 24);
    result.transportMode = l2l1_getU8(offset + 32);
/*    if (!(result.transportMode === [object Object] || result.transportMode === [object Object]))
        throw new Error(`Value ${result.transportMode} is out of range for enum 'transportMode_t'`); */
    Object.defineProperty(result, "__enum_transportMode", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_transportMode_t",
    });
    result.portNumberOffset = l2l1_getU8(offset + 33);
    result.ptpECpriPort = decodeStaticVariableSizedArray_uint8_12(offset + 36);

    return result;
}
function L1SyncSlaveencodestartPtpSlaveReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.defaultDsDomainNumber, buf, off + 4);
    l2l1_putU8(msg.castMode, buf, off + 5);
    l2l1_putU8(msg.delayReqInterval, buf, off + 6);
    l2l1_putU8(msg.ptpProfile, buf, off + 7);
    l2l1_putU64(msg.ptpEthMulticastAddress, buf, off + 8);
    l2l1_putI32(msg.secondaryBcnOffset, buf, off + 16);
    l2l1_putU64(msg.clockIdentity, buf, off + 24);
    l2l1_putU8(msg.transportMode, buf, off + 32);
    l2l1_putU8(msg.portNumberOffset, buf, off + 33);
    encodeStaticVariableSizedArray_uint8_12(msg.ptpECpriPort, buf, off + 36);
}
function L1SyncSlavedecodestartPtpSlaveResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_status_t",
    });

    return result;
}
function L1SyncSlaveencodestartPtpSlaveResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1SyncSlavedecodesyncSlaveStatusInd_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusInd_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_statusInd_t",
    });
    result.clockClass = l2l1_getU8(offset + 1);

    return result;
}
function L1SyncSlaveencodesyncSlaveStatusInd_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    l2l1_putU8(msg.clockClass, buf, off + 1);
}
function L1SyncSlavedecodegetPtpSlaveStatusReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.resetCounters = l2l1_getU8(offset + 4);

    return result;
}
function L1SyncSlaveencodegetPtpSlaveStatusReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.resetCounters, buf, off + 4);
}
function L1SyncSlavedecodeptpSlaveStatus_t(offset) {
    let result = {};

    result.offsetFromMaster = l2l1_getI64(offset + 0);

    return result;
}
function L1SyncSlaveencodeptpSlaveStatus_t(msg, buf, off) {
    l2l1_putI64(msg.offsetFromMaster, buf, off + 0);
}
function L1SyncSlavedecodegetPtpSlaveStatusResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1SyncSlave_status_t",
    });
    result.ptpSlaveStatus = decodeStaticVariableSizedArray_ptpSlaveStatus_t_12(offset + 8);

    return result;
}
function L1SyncSlaveencodegetPtpSlaveStatusResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
    encodeStaticVariableSizedArray_ptpSlaveStatus_t_12(msg.ptpSlaveStatus, buf, off + 8);
}
function L1SyncSlavedecodeptpSlaveStatus_t(offset) {
    let result = {};

    result.offsetFromMaster = l2l1_getI64(offset + 0);

    return result;
}
function L1SyncSlaveencodeptpSlaveStatus_t(msg, buf, off) {
    l2l1_putI64(msg.offsetFromMaster, buf, off + 0);
}
function UlPooldecodeAddressReq_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);

    return result;
}
function UlPoolencodeAddressReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
}
function UlPooldecodeAddressResp_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);
    result.ulBbPoolingResourceReconfReqAddress = l2l1_getU32(offset + 4);

    return result;
}
function UlPoolencodeAddressResp_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
    l2l1_putU32(msg.ulBbPoolingResourceReconfReqAddress, buf, off + 4);
}
function UlPooldecodeslowPrbPoolingParameters_t(offset) {
    let result = {};

    result.l1SpMaxNumStreamPrb = l2l1_getU16(offset + 0);
    result.l1SpMaxNumLayerPrb = l2l1_getU16(offset + 2);

    return result;
}
function UlPoolencodeslowPrbPoolingParameters_t(msg, buf, off) {
    l2l1_putU16(msg.l1SpMaxNumStreamPrb, buf, off + 0);
    l2l1_putU16(msg.l1SpMaxNumLayerPrb, buf, off + 2);
}
function UlPooldecodel1SubPool_t(offset) {
    let result = {};

    result.l1SubPoolId = l2l1_getU16(offset + 0);
    result.slowPrbPoolingParameters = UlPooldecodeslowPrbPoolingParameters_t(offset + 2);

    return result;
}
function UlPoolencodel1SubPool_t(msg, buf, off) {
    l2l1_putU16(msg.l1SubPoolId, buf, off + 0);
    UlPoolencodeslowPrbPoolingParameters_t(msg.slowPrbPoolingParameters, buf, off + 2);
}
function UlPooldecodeBbResourceReconfReq_t(offset) {
    let result = {};

    result.addrBbPoolingResourceReconfResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.l1PoolId = l2l1_getU32(offset + 8);
    result.l1SubPool = decodeStaticFixedSizedArray_l1SubPool_t_2(offset + 12);

    return result;
}
function UlPoolencodeBbResourceReconfReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrBbPoolingResourceReconfResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU32(msg.l1PoolId, buf, off + 8);
    encodeStaticFixedSizedArray_l1SubPool_t_2(msg.l1SubPool, buf, off + 12);
}
function UlPooldecodeBbResourceReconfResp_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.l1PoolId = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
    result.cause = l2l1_getU8(offset + 9);
/*    if (!(result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object] || result.cause === [object Object]))
        throw new Error(`Value ${result.cause} is out of range for enum 'poolCause_t'`); */
    Object.defineProperty(result, "__enum_cause", {
        enumerable: false,
        writable: false,
        value: "l1_common_poolCause_t",
    });

    return result;
}
function UlPoolencodeBbResourceReconfResp_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU32(msg.l1PoolId, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
    l2l1_putU8(msg.cause, buf, off + 9);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.l1PoolId = l2l1_getU32(offset + 0);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU32(msg.l1PoolId, buf, off + 0);
}
function UlCelldecodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);

    return result;
}
function UlCellencodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
}
function UlCelldecodepSRSBwvConfig_t(offset) {
    let result = {};

    result.bwvSubbandSize = l2l1_getU16(offset + 0);
    result.method = l2l1_getU8(offset + 2);
/*    if (!(result.method === [object Object] || result.method === [object Object]))
        throw new Error(`Value ${result.method} is out of range for enum 'srsBwvMethod_t'`); */
    Object.defineProperty(result, "__enum_method", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvMethod_t",
    });

    return result;
}
function UlCellencodepSRSBwvConfig_t(msg, buf, off) {
    l2l1_putU16(msg.bwvSubbandSize, buf, off + 0);
    l2l1_putU8(msg.method, buf, off + 2);
}
function UlCelldecodepreCombinerBeamsRow_t(offset) {
    let result = {};

    result.realPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function UlCellencodepreCombinerBeamsRow_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerRows, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerRows, buf, off + 8);
}
function UlCelldecodepreCombinerBeamsColumn_t(offset) {
    let result = {};

    result.realPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function UlCellencodepreCombinerBeamsColumn_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerColumns, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerColumns, buf, off + 8);
}
function UlCelldecodeulBeams_t(offset) {
    let result = {};

    result.patternId = l2l1_getU16(offset + 0);
    result.realPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 4);
    result.imagPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 12);

    return result;
}
function UlCellencodeulBeams_t(msg, buf, off) {
    l2l1_putU16(msg.patternId, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfWeight, buf, off + 4);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfWeight, buf, off + 12);
}
function UlCelldecodepSRSconfig_t(offset) {
    let result = {};

    result.pSRSnumCeAxCId = l2l1_getU8(offset + 0);
/*    if (!(result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object]))
        throw new Error(`Value ${result.pSRSnumCeAxCId} is out of range for enum 'pSRSnumCeAxCId_t'`); */
    Object.defineProperty(result, "__enum_pSRSnumCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_pSRSnumCeAxCId_t",
    });
    result.numberOfColTRX = l2l1_getU8(offset + 1);
/*    if (!(result.numberOfColTRX === [object Object] || result.numberOfColTRX === [object Object]))
        throw new Error(`Value ${result.numberOfColTRX} is out of range for enum 'numberOfColTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfColTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfColTRX_t",
    });
    result.numberOfRowTRX = l2l1_getU8(offset + 2);
/*    if (!(result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object]))
        throw new Error(`Value ${result.numberOfRowTRX} is out of range for enum 'numberOfRowTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfRowTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfRowTRX_t",
    });
    result.preCombinerBeamsRow = UlCelldecodepreCombinerBeamsRow_t(offset + 4);
    result.preCombinerBeamsColumn = UlCelldecodepreCombinerBeamsColumn_t(offset + 20);
    result.ulBeams = decodeDynamicVariableSizedArray_ulBeams_t_420(offset + 36);

    return result;
}
function UlCellencodepSRSconfig_t(msg, buf, off) {
    l2l1_putU8(msg.pSRSnumCeAxCId, buf, off + 0);
    l2l1_putU8(msg.numberOfColTRX, buf, off + 1);
    l2l1_putU8(msg.numberOfRowTRX, buf, off + 2);
    UlCellencodepreCombinerBeamsRow_t(msg.preCombinerBeamsRow, buf, off + 4);
    UlCellencodepreCombinerBeamsColumn_t(msg.preCombinerBeamsColumn, buf, off + 20);
    encodeDynamicVariableSizedArray_ulBeams_t_420(msg.ulBeams, buf, off + 36);
}
function UlCelldecodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object]))
        throw new Error(`Value ${result.ulSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
/*    if (!(result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object]))
        throw new Error(`Value ${result.ulBandwidth} is out of range for enum 'EBandwidth'`); */
    Object.defineProperty(result, "__enum_ulBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 6);
/*    if (!(result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object]))
        throw new Error(`Value ${result.scs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.prachFormat = l2l1_getU8(offset + 7);
/*    if (!(result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object]))
        throw new Error(`Value ${result.prachFormat} is out of range for enum 'prachFormat_t'`); */
    Object.defineProperty(result, "__enum_prachFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachFormat_t",
    });
    result.prachStartSymbol = l2l1_getU8(offset + 8);
/*    if (!(result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object]))
        throw new Error(`Value ${result.prachStartSymbol} is out of range for enum 'prachStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_prachStartSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachStartSymbol_t",
    });
    result.prachScs = l2l1_getU8(offset + 9);
/*    if (!(result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object]))
        throw new Error(`Value ${result.prachScs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_prachScs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.firstPrachRootSeqIndex = l2l1_getU16(offset + 10);
    result.prachZeroCorrelationZoneConfig = l2l1_getU8(offset + 12);
    result.prachSequenceType = l2l1_getU8(offset + 13);
/*    if (!(result.prachSequenceType === [object Object] || result.prachSequenceType === [object Object] || result.prachSequenceType === [object Object]))
        throw new Error(`Value ${result.prachSequenceType} is out of range for enum 'prachSequenceType_t'`); */
    Object.defineProperty(result, "__enum_prachSequenceType", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachSequenceType_t",
    });
    result.prachCohCombLen = l2l1_getU8(offset + 14);
/*    if (!(result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object]))
        throw new Error(`Value ${result.prachCohCombLen} is out of range for enum 'prachCohCombLen_t'`); */
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 15);
    result.rxScalingFactor = l2l1_getI16(offset + 16);
    result.pucchHoppingId = l2l1_getU16(offset + 18);
    result.phaseCompensationLutIndex = decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset + 20);
    result.ulSubcellPosition = l2l1_getU8(offset + 28);
/*    if (!(result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object]))
        throw new Error(`Value ${result.ulSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 29);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 30);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_UlCell_Setup_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_UlCell_Setup_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 31);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_fronthaulMode_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_12(offset + 32);
    result.digitalOutputEnabled = l2l1_getU8(offset + 56);
    result.digitalOutputType = l2l1_getU8(offset + 57);
/*    if (!(result.digitalOutputType === [object Object] || result.digitalOutputType === [object Object]))
        throw new Error(`Value ${result.digitalOutputType} is out of range for enum 'digitalOutputType_t'`); */
    Object.defineProperty(result, "__enum_digitalOutputType", {
        enumerable: false,
        writable: false,
        value: "l1_common_digitalOutputType_t",
    });
    result.digitalOutputRate = l2l1_getU8(offset + 58);
/*    if (!(result.digitalOutputRate === [object Object] || result.digitalOutputRate === [object Object] || result.digitalOutputRate === [object Object]))
        throw new Error(`Value ${result.digitalOutputRate} is out of range for enum 'digitalOutputRate_t'`); */
    Object.defineProperty(result, "__enum_digitalOutputRate", {
        enumerable: false,
        writable: false,
        value: "l1_common_digitalOutputRate_t",
    });
    result.bbSelector = l2l1_getU8(offset + 59);
    result.harqFeedbackQueueID = l2l1_getU32(offset + 60);
    result.frequencyShift7pt5khz = l2l1_getU8(offset + 64);
    result.pfaTargetPrachId = l2l1_getU8(offset + 65);
    result.cellExtension = l2l1_getU8(offset + 66);
/*    if (!(result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object]))
        throw new Error(`Value ${result.cellExtension} is out of range for enum 'cellExtension_t'`); */
    Object.defineProperty(result, "__enum_cellExtension", {
        enumerable: false,
        writable: false,
        value: "l1_common_cellExtension_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 67);
    result.cpriDialectIndication = l2l1_getU8(offset + 68);
/*    if (!(result.cpriDialectIndication === [object Object] || result.cpriDialectIndication === [object Object]))
        throw new Error(`Value ${result.cpriDialectIndication} is out of range for enum 'cpriDialectIndication_t'`); */
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "l1_common_cpriDialectIndication_t",
    });
    result.axcPosition = decodeStaticVariableSizedArray_uint32_16(offset + 72);
    result.prachConfigurationIndex = l2l1_getU8(offset + 140);
    result.prachPrbOffset = l2l1_getU16(offset + 142);
    result.adjustPrachThresholdOffsetDb = l2l1_getU16(offset + 144);
    result.ulDlDataSlotRatio = l2l1_getU8(offset + 146);
/*    if (!(result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object]))
        throw new Error(`Value ${result.ulDlDataSlotRatio} is out of range for enum 'ulDlDataSlotRatio_t'`); */
    Object.defineProperty(result, "__enum_ulDlDataSlotRatio", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDlDataSlotRatio_t",
    });
    result.l1SubpoolId = l2l1_getU16(offset + 148);
    result.firstCellSlotId = l2l1_getU16(offset + 150);
    result.cellSlotLength = l2l1_getU16(offset + 152);
    result.ulEcpriFdBeamforming = l2l1_getU8(offset + 154);
    result.actUlEcpriExtType12 = l2l1_getU8(offset + 155);
    result.ulSubcellPoolId = l2l1_getU8(offset + 156);
    result.gainCorrection = l2l1_getI16(offset + 158);
    result.gainCorrectionForPrach = l2l1_getI16(offset + 160);
    result.ulScPerCarrierPart = decodeDynamicVariableSizedArray_uint16_4(offset + 164);
    result.actUlEcpriPhase4 = l2l1_getU8(offset + 172);
    result.prachDtxThresholdSelection = l2l1_getU8(offset + 173);
/*    if (!(result.prachDtxThresholdSelection === [object Object] || result.prachDtxThresholdSelection === [object Object]))
        throw new Error(`Value ${result.prachDtxThresholdSelection} is out of range for enum 'prachDtxThresholdSelection_t'`); */
    Object.defineProperty(result, "__enum_prachDtxThresholdSelection", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachDtxThresholdSelection_t",
    });
    result.actORANstep1 = l2l1_getU8(offset + 174);
    result.actOranFDD = l2l1_getU8(offset + 175);
    result.ORANprachNumerology = l2l1_getU8(offset + 176);
    result.ulIqCompression = l2l1_getU8(offset + 177);
    result.ulActDownSampling = l2l1_getU8(offset + 178);
    result.mantissaSize = l2l1_getU8(offset + 179);
/*    if (!(result.mantissaSize === [object Object] || result.mantissaSize === [object Object]))
        throw new Error(`Value ${result.mantissaSize} is out of range for enum 'mantissaSize_t'`); */
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "l1_common_mantissaSize_t",
    });
    result.staticLongPucch = l2l1_getU8(offset + 180);
    result.actAdaptiveReTxResMcsEnh = l2l1_getU8(offset + 181);
    result.localCellResId = l2l1_getU32(offset + 184);
    result.pSRSact = l2l1_getU8(offset + 188);
    result.pSRSBwvAct = l2l1_getU8(offset + 189);
    result.pSRSBwvConfig = UlCelldecodepSRSBwvConfig_t(offset + 190);
    result.pSRSconfig = UlCelldecodepSRSconfig_t(offset + 196);
    result.actHighSpeedCell = l2l1_getU8(offset + 240);
    result.actUlMuMimo = l2l1_getU8(offset + 241);
    result.ulMaxUplaneSectionsPerSym = l2l1_getU8(offset + 242);
    result.actUlPrbMuting = l2l1_getU8(offset + 243);
    result.ulSubCellCaps = l2l1_getU32(offset + 244);
    result.numOfLogicalResourceIds = l2l1_getU8(offset + 248);
/*    if (!(result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object]))
        throw new Error(`Value ${result.numOfLogicalResourceIds} is out of range for enum 'numCeAxC_UlCell_Setup_t'`); */
    Object.defineProperty(result, "__enum_numOfLogicalResourceIds", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_UlCell_Setup_t",
    });
    result.logicalResourceIds = decodeStaticFixedSizedArray_uint32_12(offset + 252);

    return result;
}
function UlCellencodeSetupReq_t(msg, buf, off) {
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
    encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(msg.phaseCompensationLutIndex, buf, off + 20);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 28);
    l2l1_putU8(msg.eCpriLink, buf, off + 29);
    l2l1_putU8(msg.numCeAxCId, buf, off + 30);
    l2l1_putU8(msg.fronthaulMode, buf, off + 31);
    encodeStaticFixedSizedArray_uint16_12(msg.ceAxCId, buf, off + 32);
    l2l1_putU8(msg.digitalOutputEnabled, buf, off + 56);
    l2l1_putU8(msg.digitalOutputType, buf, off + 57);
    l2l1_putU8(msg.digitalOutputRate, buf, off + 58);
    l2l1_putU8(msg.bbSelector, buf, off + 59);
    l2l1_putU32(msg.harqFeedbackQueueID, buf, off + 60);
    l2l1_putU8(msg.frequencyShift7pt5khz, buf, off + 64);
    l2l1_putU8(msg.pfaTargetPrachId, buf, off + 65);
    l2l1_putU8(msg.cellExtension, buf, off + 66);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 67);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 68);
    encodeStaticVariableSizedArray_uint32_16(msg.axcPosition, buf, off + 72);
    l2l1_putU8(msg.prachConfigurationIndex, buf, off + 140);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 142);
    l2l1_putU16(msg.adjustPrachThresholdOffsetDb, buf, off + 144);
    l2l1_putU8(msg.ulDlDataSlotRatio, buf, off + 146);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 148);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 150);
    l2l1_putU16(msg.cellSlotLength, buf, off + 152);
    l2l1_putU8(msg.ulEcpriFdBeamforming, buf, off + 154);
    l2l1_putU8(msg.actUlEcpriExtType12, buf, off + 155);
    l2l1_putU8(msg.ulSubcellPoolId, buf, off + 156);
    l2l1_putI16(msg.gainCorrection, buf, off + 158);
    l2l1_putI16(msg.gainCorrectionForPrach, buf, off + 160);
    encodeDynamicVariableSizedArray_uint16_4(msg.ulScPerCarrierPart, buf, off + 164);
    l2l1_putU8(msg.actUlEcpriPhase4, buf, off + 172);
    l2l1_putU8(msg.prachDtxThresholdSelection, buf, off + 173);
    l2l1_putU8(msg.actORANstep1, buf, off + 174);
    l2l1_putU8(msg.actOranFDD, buf, off + 175);
    l2l1_putU8(msg.ORANprachNumerology, buf, off + 176);
    l2l1_putU8(msg.ulIqCompression, buf, off + 177);
    l2l1_putU8(msg.ulActDownSampling, buf, off + 178);
    l2l1_putU8(msg.mantissaSize, buf, off + 179);
    l2l1_putU8(msg.staticLongPucch, buf, off + 180);
    l2l1_putU8(msg.actAdaptiveReTxResMcsEnh, buf, off + 181);
    l2l1_putU32(msg.localCellResId, buf, off + 184);
    l2l1_putU8(msg.pSRSact, buf, off + 188);
    l2l1_putU8(msg.pSRSBwvAct, buf, off + 189);
    UlCellencodepSRSBwvConfig_t(msg.pSRSBwvConfig, buf, off + 190);
    UlCellencodepSRSconfig_t(msg.pSRSconfig, buf, off + 196);
    l2l1_putU8(msg.actHighSpeedCell, buf, off + 240);
    l2l1_putU8(msg.actUlMuMimo, buf, off + 241);
    l2l1_putU8(msg.ulMaxUplaneSectionsPerSym, buf, off + 242);
    l2l1_putU8(msg.actUlPrbMuting, buf, off + 243);
    l2l1_putU32(msg.ulSubCellCaps, buf, off + 244);
    l2l1_putU8(msg.numOfLogicalResourceIds, buf, off + 248);
    encodeStaticFixedSizedArray_uint32_12(msg.logicalResourceIds, buf, off + 252);
}
function UlCelldecodeulBeams_t(offset) {
    let result = {};

    result.patternId = l2l1_getU16(offset + 0);
    result.realPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 4);
    result.imagPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 12);

    return result;
}
function UlCellencodeulBeams_t(msg, buf, off) {
    l2l1_putU16(msg.patternId, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfWeight, buf, off + 4);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfWeight, buf, off + 12);
}
function UlCelldecodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);

    return result;
}
function UlCellencodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
}
function UlCelldecodepSRSconfig_t(offset) {
    let result = {};

    result.pSRSnumCeAxCId = l2l1_getU8(offset + 0);
/*    if (!(result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object]))
        throw new Error(`Value ${result.pSRSnumCeAxCId} is out of range for enum 'pSRSnumCeAxCId_t'`); */
    Object.defineProperty(result, "__enum_pSRSnumCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_pSRSnumCeAxCId_t",
    });
    result.numberOfColTRX = l2l1_getU8(offset + 1);
/*    if (!(result.numberOfColTRX === [object Object] || result.numberOfColTRX === [object Object]))
        throw new Error(`Value ${result.numberOfColTRX} is out of range for enum 'numberOfColTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfColTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfColTRX_t",
    });
    result.numberOfRowTRX = l2l1_getU8(offset + 2);
/*    if (!(result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object]))
        throw new Error(`Value ${result.numberOfRowTRX} is out of range for enum 'numberOfRowTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfRowTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfRowTRX_t",
    });
    result.preCombinerBeamsRow = UlCelldecodepreCombinerBeamsRow_t(offset + 4);
    result.preCombinerBeamsColumn = UlCelldecodepreCombinerBeamsColumn_t(offset + 20);
    result.ulBeams = decodeDynamicVariableSizedArray_ulBeams_t_420(offset + 36);

    return result;
}
function UlCellencodepSRSconfig_t(msg, buf, off) {
    l2l1_putU8(msg.pSRSnumCeAxCId, buf, off + 0);
    l2l1_putU8(msg.numberOfColTRX, buf, off + 1);
    l2l1_putU8(msg.numberOfRowTRX, buf, off + 2);
    UlCellencodepreCombinerBeamsRow_t(msg.preCombinerBeamsRow, buf, off + 4);
    UlCellencodepreCombinerBeamsColumn_t(msg.preCombinerBeamsColumn, buf, off + 20);
    encodeDynamicVariableSizedArray_ulBeams_t_420(msg.ulBeams, buf, off + 36);
}
function UlCelldecodepSRSBwvConfig_t(offset) {
    let result = {};

    result.bwvSubbandSize = l2l1_getU16(offset + 0);
    result.method = l2l1_getU8(offset + 2);
/*    if (!(result.method === [object Object] || result.method === [object Object]))
        throw new Error(`Value ${result.method} is out of range for enum 'srsBwvMethod_t'`); */
    Object.defineProperty(result, "__enum_method", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvMethod_t",
    });

    return result;
}
function UlCellencodepSRSBwvConfig_t(msg, buf, off) {
    l2l1_putU16(msg.bwvSubbandSize, buf, off + 0);
    l2l1_putU8(msg.method, buf, off + 2);
}
function UlCelldecodepreCombinerBeamsRow_t(offset) {
    let result = {};

    result.realPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function UlCellencodepreCombinerBeamsRow_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerRows, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerRows, buf, off + 8);
}
function UlCelldecodepreCombinerBeamsColumn_t(offset) {
    let result = {};

    result.realPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function UlCellencodepreCombinerBeamsColumn_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerColumns, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerColumns, buf, off + 8);
}
function UlCelldecodeSetupResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_status_t",
    });
    result.cause = l2l1_getU32(offset + 4);
    result.diagnosticInformation = decodeDynamicVariableSizedArray_uint32_14(offset + 8);

    return result;
}
function UlCellencodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
    l2l1_putU32(msg.cause, buf, off + 4);
    encodeDynamicVariableSizedArray_uint32_14(msg.diagnosticInformation, buf, off + 8);
}
function UlCelldecodeDeleteReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCellencodeDeleteReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}
function UlCelldecodeDeleteResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.status = l2l1_getU8(offset + 1);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'cellDeleteStatus_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_cellDeleteStatus_t",
    });

    return result;
}
function UlCellencodeDeleteResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 1);
}
function decodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);

    return result;
}
function encodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
}
function decodepSRSBwvConfig_t(offset) {
    let result = {};

    result.bwvSubbandSize = l2l1_getU16(offset + 0);
    result.method = l2l1_getU8(offset + 2);
/*    if (!(result.method === [object Object] || result.method === [object Object]))
        throw new Error(`Value ${result.method} is out of range for enum 'srsBwvMethod_t'`); */
    Object.defineProperty(result, "__enum_method", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvMethod_t",
    });

    return result;
}
function encodepSRSBwvConfig_t(msg, buf, off) {
    l2l1_putU16(msg.bwvSubbandSize, buf, off + 0);
    l2l1_putU8(msg.method, buf, off + 2);
}
function decodepreCombinerBeamsRow_t(offset) {
    let result = {};

    result.realPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function encodepreCombinerBeamsRow_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerRows, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerRows, buf, off + 8);
}
function decodepreCombinerBeamsColumn_t(offset) {
    let result = {};

    result.realPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function encodepreCombinerBeamsColumn_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerColumns, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerColumns, buf, off + 8);
}
function decodeulBeams_t(offset) {
    let result = {};

    result.patternId = l2l1_getU16(offset + 0);
    result.realPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 4);
    result.imagPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 12);

    return result;
}
function encodeulBeams_t(msg, buf, off) {
    l2l1_putU16(msg.patternId, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfWeight, buf, off + 4);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfWeight, buf, off + 12);
}
function decodepSRSconfig_t(offset) {
    let result = {};

    result.pSRSnumCeAxCId = l2l1_getU8(offset + 0);
/*    if (!(result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object]))
        throw new Error(`Value ${result.pSRSnumCeAxCId} is out of range for enum 'pSRSnumCeAxCId_t'`); */
    Object.defineProperty(result, "__enum_pSRSnumCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_pSRSnumCeAxCId_t",
    });
    result.numberOfColTRX = l2l1_getU8(offset + 1);
/*    if (!(result.numberOfColTRX === [object Object] || result.numberOfColTRX === [object Object]))
        throw new Error(`Value ${result.numberOfColTRX} is out of range for enum 'numberOfColTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfColTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfColTRX_t",
    });
    result.numberOfRowTRX = l2l1_getU8(offset + 2);
/*    if (!(result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object]))
        throw new Error(`Value ${result.numberOfRowTRX} is out of range for enum 'numberOfRowTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfRowTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfRowTRX_t",
    });
    result.preCombinerBeamsRow = decodepreCombinerBeamsRow_t(offset + 4);
    result.preCombinerBeamsColumn = decodepreCombinerBeamsColumn_t(offset + 20);
    result.ulBeams = decodeDynamicVariableSizedArray_ulBeams_t_420(offset + 36);

    return result;
}
function encodepSRSconfig_t(msg, buf, off) {
    l2l1_putU8(msg.pSRSnumCeAxCId, buf, off + 0);
    l2l1_putU8(msg.numberOfColTRX, buf, off + 1);
    l2l1_putU8(msg.numberOfRowTRX, buf, off + 2);
    encodepreCombinerBeamsRow_t(msg.preCombinerBeamsRow, buf, off + 4);
    encodepreCombinerBeamsColumn_t(msg.preCombinerBeamsColumn, buf, off + 20);
    encodeDynamicVariableSizedArray_ulBeams_t_420(msg.ulBeams, buf, off + 36);
}
function decodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object]))
        throw new Error(`Value ${result.ulSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
/*    if (!(result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object]))
        throw new Error(`Value ${result.ulBandwidth} is out of range for enum 'EBandwidth'`); */
    Object.defineProperty(result, "__enum_ulBandwidth", {
        enumerable: false,
        writable: false,
        value: "l1_common_EBandwidth",
    });
    result.scs = l2l1_getU8(offset + 6);
/*    if (!(result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object] || result.scs === [object Object]))
        throw new Error(`Value ${result.scs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_scs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.prachFormat = l2l1_getU8(offset + 7);
/*    if (!(result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object] || result.prachFormat === [object Object]))
        throw new Error(`Value ${result.prachFormat} is out of range for enum 'prachFormat_t'`); */
    Object.defineProperty(result, "__enum_prachFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachFormat_t",
    });
    result.prachStartSymbol = l2l1_getU8(offset + 8);
/*    if (!(result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object]))
        throw new Error(`Value ${result.prachStartSymbol} is out of range for enum 'prachStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_prachStartSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachStartSymbol_t",
    });
    result.prachScs = l2l1_getU8(offset + 9);
/*    if (!(result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object] || result.prachScs === [object Object]))
        throw new Error(`Value ${result.prachScs} is out of range for enum 'EScs'`); */
    Object.defineProperty(result, "__enum_prachScs", {
        enumerable: false,
        writable: false,
        value: "l1_common_EScs",
    });
    result.firstPrachRootSeqIndex = l2l1_getU16(offset + 10);
    result.prachZeroCorrelationZoneConfig = l2l1_getU8(offset + 12);
    result.prachSequenceType = l2l1_getU8(offset + 13);
/*    if (!(result.prachSequenceType === [object Object] || result.prachSequenceType === [object Object] || result.prachSequenceType === [object Object]))
        throw new Error(`Value ${result.prachSequenceType} is out of range for enum 'prachSequenceType_t'`); */
    Object.defineProperty(result, "__enum_prachSequenceType", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachSequenceType_t",
    });
    result.prachCohCombLen = l2l1_getU8(offset + 14);
/*    if (!(result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object]))
        throw new Error(`Value ${result.prachCohCombLen} is out of range for enum 'prachCohCombLen_t'`); */
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 15);
    result.rxScalingFactor = l2l1_getI16(offset + 16);
    result.pucchHoppingId = l2l1_getU16(offset + 18);
    result.phaseCompensationLutIndex = decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset + 20);
    result.ulSubcellPosition = l2l1_getU8(offset + 28);
/*    if (!(result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object]))
        throw new Error(`Value ${result.ulSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 29);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 30);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_UlCell_Setup_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_UlCell_Setup_t",
    });
    result.fronthaulMode = l2l1_getU8(offset + 31);
/*    if (!(result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object] || result.fronthaulMode === [object Object]))
        throw new Error(`Value ${result.fronthaulMode} is out of range for enum 'fronthaulMode_t'`); */
    Object.defineProperty(result, "__enum_fronthaulMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_fronthaulMode_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_12(offset + 32);
    result.digitalOutputEnabled = l2l1_getU8(offset + 56);
    result.digitalOutputType = l2l1_getU8(offset + 57);
/*    if (!(result.digitalOutputType === [object Object] || result.digitalOutputType === [object Object]))
        throw new Error(`Value ${result.digitalOutputType} is out of range for enum 'digitalOutputType_t'`); */
    Object.defineProperty(result, "__enum_digitalOutputType", {
        enumerable: false,
        writable: false,
        value: "l1_common_digitalOutputType_t",
    });
    result.digitalOutputRate = l2l1_getU8(offset + 58);
/*    if (!(result.digitalOutputRate === [object Object] || result.digitalOutputRate === [object Object] || result.digitalOutputRate === [object Object]))
        throw new Error(`Value ${result.digitalOutputRate} is out of range for enum 'digitalOutputRate_t'`); */
    Object.defineProperty(result, "__enum_digitalOutputRate", {
        enumerable: false,
        writable: false,
        value: "l1_common_digitalOutputRate_t",
    });
    result.bbSelector = l2l1_getU8(offset + 59);
    result.harqFeedbackQueueID = l2l1_getU32(offset + 60);
    result.frequencyShift7pt5khz = l2l1_getU8(offset + 64);
    result.pfaTargetPrachId = l2l1_getU8(offset + 65);
    result.cellExtension = l2l1_getU8(offset + 66);
/*    if (!(result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object] || result.cellExtension === [object Object]))
        throw new Error(`Value ${result.cellExtension} is out of range for enum 'cellExtension_t'`); */
    Object.defineProperty(result, "__enum_cellExtension", {
        enumerable: false,
        writable: false,
        value: "l1_common_cellExtension_t",
    });
    result.actEcpriPhase2 = l2l1_getU8(offset + 67);
    result.cpriDialectIndication = l2l1_getU8(offset + 68);
/*    if (!(result.cpriDialectIndication === [object Object] || result.cpriDialectIndication === [object Object]))
        throw new Error(`Value ${result.cpriDialectIndication} is out of range for enum 'cpriDialectIndication_t'`); */
    Object.defineProperty(result, "__enum_cpriDialectIndication", {
        enumerable: false,
        writable: false,
        value: "l1_common_cpriDialectIndication_t",
    });
    result.axcPosition = decodeStaticVariableSizedArray_uint32_16(offset + 72);
    result.prachConfigurationIndex = l2l1_getU8(offset + 140);
    result.prachPrbOffset = l2l1_getU16(offset + 142);
    result.adjustPrachThresholdOffsetDb = l2l1_getU16(offset + 144);
    result.ulDlDataSlotRatio = l2l1_getU8(offset + 146);
/*    if (!(result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object] || result.ulDlDataSlotRatio === [object Object]))
        throw new Error(`Value ${result.ulDlDataSlotRatio} is out of range for enum 'ulDlDataSlotRatio_t'`); */
    Object.defineProperty(result, "__enum_ulDlDataSlotRatio", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDlDataSlotRatio_t",
    });
    result.l1SubpoolId = l2l1_getU16(offset + 148);
    result.firstCellSlotId = l2l1_getU16(offset + 150);
    result.cellSlotLength = l2l1_getU16(offset + 152);
    result.ulEcpriFdBeamforming = l2l1_getU8(offset + 154);
    result.actUlEcpriExtType12 = l2l1_getU8(offset + 155);
    result.ulSubcellPoolId = l2l1_getU8(offset + 156);
    result.gainCorrection = l2l1_getI16(offset + 158);
    result.gainCorrectionForPrach = l2l1_getI16(offset + 160);
    result.ulScPerCarrierPart = decodeDynamicVariableSizedArray_uint16_4(offset + 164);
    result.actUlEcpriPhase4 = l2l1_getU8(offset + 172);
    result.prachDtxThresholdSelection = l2l1_getU8(offset + 173);
/*    if (!(result.prachDtxThresholdSelection === [object Object] || result.prachDtxThresholdSelection === [object Object]))
        throw new Error(`Value ${result.prachDtxThresholdSelection} is out of range for enum 'prachDtxThresholdSelection_t'`); */
    Object.defineProperty(result, "__enum_prachDtxThresholdSelection", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachDtxThresholdSelection_t",
    });
    result.actORANstep1 = l2l1_getU8(offset + 174);
    result.actOranFDD = l2l1_getU8(offset + 175);
    result.ORANprachNumerology = l2l1_getU8(offset + 176);
    result.ulIqCompression = l2l1_getU8(offset + 177);
    result.ulActDownSampling = l2l1_getU8(offset + 178);
    result.mantissaSize = l2l1_getU8(offset + 179);
/*    if (!(result.mantissaSize === [object Object] || result.mantissaSize === [object Object]))
        throw new Error(`Value ${result.mantissaSize} is out of range for enum 'mantissaSize_t'`); */
    Object.defineProperty(result, "__enum_mantissaSize", {
        enumerable: false,
        writable: false,
        value: "l1_common_mantissaSize_t",
    });
    result.staticLongPucch = l2l1_getU8(offset + 180);
    result.actAdaptiveReTxResMcsEnh = l2l1_getU8(offset + 181);
    result.localCellResId = l2l1_getU32(offset + 184);
    result.pSRSact = l2l1_getU8(offset + 188);
    result.pSRSBwvAct = l2l1_getU8(offset + 189);
    result.pSRSBwvConfig = decodepSRSBwvConfig_t(offset + 190);
    result.pSRSconfig = decodepSRSconfig_t(offset + 196);
    result.actHighSpeedCell = l2l1_getU8(offset + 240);
    result.actUlMuMimo = l2l1_getU8(offset + 241);
    result.ulMaxUplaneSectionsPerSym = l2l1_getU8(offset + 242);
    result.actUlPrbMuting = l2l1_getU8(offset + 243);
    result.ulSubCellCaps = l2l1_getU32(offset + 244);
    result.numOfLogicalResourceIds = l2l1_getU8(offset + 248);
/*    if (!(result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object] || result.numOfLogicalResourceIds === [object Object]))
        throw new Error(`Value ${result.numOfLogicalResourceIds} is out of range for enum 'numCeAxC_UlCell_Setup_t'`); */
    Object.defineProperty(result, "__enum_numOfLogicalResourceIds", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_UlCell_Setup_t",
    });
    result.logicalResourceIds = decodeStaticFixedSizedArray_uint32_12(offset + 252);

    return result;
}
function encodeSetupReq_t(msg, buf, off) {
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
    encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(msg.phaseCompensationLutIndex, buf, off + 20);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 28);
    l2l1_putU8(msg.eCpriLink, buf, off + 29);
    l2l1_putU8(msg.numCeAxCId, buf, off + 30);
    l2l1_putU8(msg.fronthaulMode, buf, off + 31);
    encodeStaticFixedSizedArray_uint16_12(msg.ceAxCId, buf, off + 32);
    l2l1_putU8(msg.digitalOutputEnabled, buf, off + 56);
    l2l1_putU8(msg.digitalOutputType, buf, off + 57);
    l2l1_putU8(msg.digitalOutputRate, buf, off + 58);
    l2l1_putU8(msg.bbSelector, buf, off + 59);
    l2l1_putU32(msg.harqFeedbackQueueID, buf, off + 60);
    l2l1_putU8(msg.frequencyShift7pt5khz, buf, off + 64);
    l2l1_putU8(msg.pfaTargetPrachId, buf, off + 65);
    l2l1_putU8(msg.cellExtension, buf, off + 66);
    l2l1_putU8(msg.actEcpriPhase2, buf, off + 67);
    l2l1_putU8(msg.cpriDialectIndication, buf, off + 68);
    encodeStaticVariableSizedArray_uint32_16(msg.axcPosition, buf, off + 72);
    l2l1_putU8(msg.prachConfigurationIndex, buf, off + 140);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 142);
    l2l1_putU16(msg.adjustPrachThresholdOffsetDb, buf, off + 144);
    l2l1_putU8(msg.ulDlDataSlotRatio, buf, off + 146);
    l2l1_putU16(msg.l1SubpoolId, buf, off + 148);
    l2l1_putU16(msg.firstCellSlotId, buf, off + 150);
    l2l1_putU16(msg.cellSlotLength, buf, off + 152);
    l2l1_putU8(msg.ulEcpriFdBeamforming, buf, off + 154);
    l2l1_putU8(msg.actUlEcpriExtType12, buf, off + 155);
    l2l1_putU8(msg.ulSubcellPoolId, buf, off + 156);
    l2l1_putI16(msg.gainCorrection, buf, off + 158);
    l2l1_putI16(msg.gainCorrectionForPrach, buf, off + 160);
    encodeDynamicVariableSizedArray_uint16_4(msg.ulScPerCarrierPart, buf, off + 164);
    l2l1_putU8(msg.actUlEcpriPhase4, buf, off + 172);
    l2l1_putU8(msg.prachDtxThresholdSelection, buf, off + 173);
    l2l1_putU8(msg.actORANstep1, buf, off + 174);
    l2l1_putU8(msg.actOranFDD, buf, off + 175);
    l2l1_putU8(msg.ORANprachNumerology, buf, off + 176);
    l2l1_putU8(msg.ulIqCompression, buf, off + 177);
    l2l1_putU8(msg.ulActDownSampling, buf, off + 178);
    l2l1_putU8(msg.mantissaSize, buf, off + 179);
    l2l1_putU8(msg.staticLongPucch, buf, off + 180);
    l2l1_putU8(msg.actAdaptiveReTxResMcsEnh, buf, off + 181);
    l2l1_putU32(msg.localCellResId, buf, off + 184);
    l2l1_putU8(msg.pSRSact, buf, off + 188);
    l2l1_putU8(msg.pSRSBwvAct, buf, off + 189);
    encodepSRSBwvConfig_t(msg.pSRSBwvConfig, buf, off + 190);
    encodepSRSconfig_t(msg.pSRSconfig, buf, off + 196);
    l2l1_putU8(msg.actHighSpeedCell, buf, off + 240);
    l2l1_putU8(msg.actUlMuMimo, buf, off + 241);
    l2l1_putU8(msg.ulMaxUplaneSectionsPerSym, buf, off + 242);
    l2l1_putU8(msg.actUlPrbMuting, buf, off + 243);
    l2l1_putU32(msg.ulSubCellCaps, buf, off + 244);
    l2l1_putU8(msg.numOfLogicalResourceIds, buf, off + 248);
    encodeStaticFixedSizedArray_uint32_12(msg.logicalResourceIds, buf, off + 252);
}
function decodeulBeams_t(offset) {
    let result = {};

    result.patternId = l2l1_getU16(offset + 0);
    result.realPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 4);
    result.imagPartOfWeight = decodeDynamicVariableSizedArray_int16_32(offset + 12);

    return result;
}
function encodeulBeams_t(msg, buf, off) {
    l2l1_putU16(msg.patternId, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfWeight, buf, off + 4);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfWeight, buf, off + 12);
}
function decodephaseCompensationLutIndex_t(offset) {
    let result = {};

    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 0);

    return result;
}
function encodephaseCompensationLutIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 0);
}
function decodepSRSconfig_t(offset) {
    let result = {};

    result.pSRSnumCeAxCId = l2l1_getU8(offset + 0);
/*    if (!(result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object] || result.pSRSnumCeAxCId === [object Object]))
        throw new Error(`Value ${result.pSRSnumCeAxCId} is out of range for enum 'pSRSnumCeAxCId_t'`); */
    Object.defineProperty(result, "__enum_pSRSnumCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_pSRSnumCeAxCId_t",
    });
    result.numberOfColTRX = l2l1_getU8(offset + 1);
/*    if (!(result.numberOfColTRX === [object Object] || result.numberOfColTRX === [object Object]))
        throw new Error(`Value ${result.numberOfColTRX} is out of range for enum 'numberOfColTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfColTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfColTRX_t",
    });
    result.numberOfRowTRX = l2l1_getU8(offset + 2);
/*    if (!(result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object] || result.numberOfRowTRX === [object Object]))
        throw new Error(`Value ${result.numberOfRowTRX} is out of range for enum 'numberOfRowTRX_t'`); */
    Object.defineProperty(result, "__enum_numberOfRowTRX", {
        enumerable: false,
        writable: false,
        value: "l1_common_numberOfRowTRX_t",
    });
    result.preCombinerBeamsRow = decodepreCombinerBeamsRow_t(offset + 4);
    result.preCombinerBeamsColumn = decodepreCombinerBeamsColumn_t(offset + 20);
    result.ulBeams = decodeDynamicVariableSizedArray_ulBeams_t_420(offset + 36);

    return result;
}
function encodepSRSconfig_t(msg, buf, off) {
    l2l1_putU8(msg.pSRSnumCeAxCId, buf, off + 0);
    l2l1_putU8(msg.numberOfColTRX, buf, off + 1);
    l2l1_putU8(msg.numberOfRowTRX, buf, off + 2);
    encodepreCombinerBeamsRow_t(msg.preCombinerBeamsRow, buf, off + 4);
    encodepreCombinerBeamsColumn_t(msg.preCombinerBeamsColumn, buf, off + 20);
    encodeDynamicVariableSizedArray_ulBeams_t_420(msg.ulBeams, buf, off + 36);
}
function decodepSRSBwvConfig_t(offset) {
    let result = {};

    result.bwvSubbandSize = l2l1_getU16(offset + 0);
    result.method = l2l1_getU8(offset + 2);
/*    if (!(result.method === [object Object] || result.method === [object Object]))
        throw new Error(`Value ${result.method} is out of range for enum 'srsBwvMethod_t'`); */
    Object.defineProperty(result, "__enum_method", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvMethod_t",
    });

    return result;
}
function encodepSRSBwvConfig_t(msg, buf, off) {
    l2l1_putU16(msg.bwvSubbandSize, buf, off + 0);
    l2l1_putU8(msg.method, buf, off + 2);
}
function decodepreCombinerBeamsRow_t(offset) {
    let result = {};

    result.realPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerRows = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function encodepreCombinerBeamsRow_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerRows, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerRows, buf, off + 8);
}
function decodepreCombinerBeamsColumn_t(offset) {
    let result = {};

    result.realPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 0);
    result.imagPartOfPrecombinerColumns = decodeDynamicVariableSizedArray_int16_32(offset + 8);

    return result;
}
function encodepreCombinerBeamsColumn_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_int16_32(msg.realPartOfPrecombinerColumns, buf, off + 0);
    encodeDynamicVariableSizedArray_int16_32(msg.imagPartOfPrecombinerColumns, buf, off + 8);
}
function UlDatadecodePuschReceiveRespLo_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.processInRealTime = l2l1_getU8(offset + 4);
    result.tbStatus = l2l1_getU8(offset + 5);
/*    if (!(result.tbStatus === [object Object] || result.tbStatus === [object Object]))
        throw new Error(`Value ${result.tbStatus} is out of range for enum 'tbStatus_t'`); */
    Object.defineProperty(result, "__enum_tbStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_tbStatus_t",
    });
    result.sfnForProcessing = l2l1_getU16(offset + 6);
    result.slotForProcessing = l2l1_getU8(offset + 8);
    result.totalFragmentNum = l2l1_getU8(offset + 9);
    result.rnti = l2l1_getU16(offset + 10);
    result.harqProcessIndex = l2l1_getU8(offset + 12);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.fragmentIndex = l2l1_getU8(offset + 13);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 14);
    result.totalTbSizeBytes = l2l1_getU32(offset + 16);
    result.paddingByte = l2l1_getU8(offset + 20);
    result.data = decodeDynamicVariableSizedArray_uint8_64000(offset + 24);

    return result;
}
function UlDataencodePuschReceiveRespLo_t(msg, buf, off) {
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
    encodeDynamicVariableSizedArray_uint8_64000(msg.data, buf, off + 24);
}
function decodePuschReceiveRespLo_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.processInRealTime = l2l1_getU8(offset + 4);
    result.tbStatus = l2l1_getU8(offset + 5);
/*    if (!(result.tbStatus === [object Object] || result.tbStatus === [object Object]))
        throw new Error(`Value ${result.tbStatus} is out of range for enum 'tbStatus_t'`); */
    Object.defineProperty(result, "__enum_tbStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_tbStatus_t",
    });
    result.sfnForProcessing = l2l1_getU16(offset + 6);
    result.slotForProcessing = l2l1_getU8(offset + 8);
    result.totalFragmentNum = l2l1_getU8(offset + 9);
    result.rnti = l2l1_getU16(offset + 10);
    result.harqProcessIndex = l2l1_getU8(offset + 12);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.fragmentIndex = l2l1_getU8(offset + 13);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 14);
    result.totalTbSizeBytes = l2l1_getU32(offset + 16);
    result.paddingByte = l2l1_getU8(offset + 20);
    result.data = decodeDynamicVariableSizedArray_uint8_64000(offset + 24);

    return result;
}
function encodePuschReceiveRespLo_t(msg, buf, off) {
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
    encodeDynamicVariableSizedArray_uint8_64000(msg.data, buf, off + 24);
}
function l1_commondecodeL2UlAddresses(offset) {
    let result = {};

    result.prachReceiveInd = l2l1_getU32(offset + 0);
    result.diagnosticInd = l2l1_getU32(offset + 4);

    return result;
}
function l1_commonencodeL2UlAddresses(msg, buf, off) {
    l2l1_putU32(msg.prachReceiveInd, buf, off + 0);
    l2l1_putU32(msg.diagnosticInd, buf, off + 4);
}
function UlDatadecodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2UlAddresses = l1_commondecodeL2UlAddresses(offset + 4);

    return result;
}
function UlDataencodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2UlAddresses(msg.l2UlAddresses, buf, off + 4);
}
function l1_commondecodeL1UlAddresses(offset) {
    let result = {};

    result.puschReceiveReq = l2l1_getU32(offset + 0);
    result.pucchReceiveReq = l2l1_getU32(offset + 4);
    result.srsReceiveReq = l2l1_getU32(offset + 8);
    result.prachReceiveReq = l2l1_getU32(offset + 12);
    result.fastAntennaSnapshotReqAddress = l2l1_getU32(offset + 16);
    result.emptyReceiveReqAddress = l2l1_getU32(offset + 20);
    result.rimReceiveReqAddress = l2l1_getU32(offset + 24);

    return result;
}
function l1_commonencodeL1UlAddresses(msg, buf, off) {
    l2l1_putU32(msg.puschReceiveReq, buf, off + 0);
    l2l1_putU32(msg.pucchReceiveReq, buf, off + 4);
    l2l1_putU32(msg.srsReceiveReq, buf, off + 8);
    l2l1_putU32(msg.prachReceiveReq, buf, off + 12);
    l2l1_putU32(msg.fastAntennaSnapshotReqAddress, buf, off + 16);
    l2l1_putU32(msg.emptyReceiveReqAddress, buf, off + 20);
    l2l1_putU32(msg.rimReceiveReqAddress, buf, off + 24);
}
function UlDatadecodeAddressResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l1UlAddresses = l1_commondecodeL1UlAddresses(offset + 4);

    return result;
}
function UlDataencodeAddressResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL1UlAddresses(msg.l1UlAddresses, buf, off + 4);
}
function UlDatadecodePuschReceiveRespLo_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.processInRealTime = l2l1_getU8(offset + 4);
    result.tbStatus = l2l1_getU8(offset + 5);
/*    if (!(result.tbStatus === [object Object] || result.tbStatus === [object Object]))
        throw new Error(`Value ${result.tbStatus} is out of range for enum 'tbStatus_t'`); */
    Object.defineProperty(result, "__enum_tbStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_tbStatus_t",
    });
    result.sfnForProcessing = l2l1_getU16(offset + 6);
    result.slotForProcessing = l2l1_getU8(offset + 8);
    result.totalFragmentNum = l2l1_getU8(offset + 9);
    result.rnti = l2l1_getU16(offset + 10);
    result.harqProcessIndex = l2l1_getU8(offset + 12);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.fragmentIndex = l2l1_getU8(offset + 13);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 14);
    result.totalTbSizeBytes = l2l1_getU32(offset + 16);
    result.paddingByte = l2l1_getU8(offset + 20);
    result.data = decodeDynamicVariableSizedArray_uint8_64000(offset + 24);

    return result;
}
function UlDataencodePuschReceiveRespLo_t(msg, buf, off) {
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
    encodeDynamicVariableSizedArray_uint8_64000(msg.data, buf, off + 24);
}
function l1_commondecodeshortTermCfoMetric_t(offset) {
    let result = {};

    result.I = l2l1_getF32(offset + 0);
    result.Q = l2l1_getF32(offset + 4);

    return result;
}
function l1_commonencodeshortTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.I, buf, off + 0);
    l2l1_putF32(msg.Q, buf, off + 4);
}
function UlDatadecodeUePuschReceiveRespPs_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.harqProcessIndex = l2l1_getU8(offset + 2);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.fakeUe = l2l1_getU8(offset + 3);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.slotAggregationCountDown = l2l1_getU8(offset + 7);
    result.shortTermCfoMetric = l1_commondecodeshortTermCfoMetric_t(offset + 8);
    result.shortTermTaMetric = l2l1_getI16(offset + 16);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 20);
    result.rxPower = l2l1_getF32(offset + 24);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 28);
    result.rssi = l2l1_getF32(offset + 36);
    result.ulPmiRank1 = l2l1_getU8(offset + 40);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 44);
    result.ulPmiRank2 = l2l1_getU8(offset + 48);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 52);
    result.channelCorrMetric = decodeStaticFixedSizedArray_float32_2(offset + 60);
    result.ulRank = l2l1_getU8(offset + 68);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.rachStatus = l2l1_getU8(offset + 69);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.uciCsiPart1Bits = decodeStaticFixedSizedArray_uint8_7(offset + 72);
    result.csiPart1CrcCheck = l2l1_getU8(offset + 80);
/*    if (!(result.csiPart1CrcCheck === [object Object] || result.csiPart1CrcCheck === [object Object] || result.csiPart1CrcCheck === [object Object]))
        throw new Error(`Value ${result.csiPart1CrcCheck} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_csiPart1CrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 81);
    result.uciCsiPart2Bits = decodeStaticFixedSizedArray_uint8_7(offset + 84);
    result.csiPart2CrcCheck = l2l1_getU8(offset + 92);
/*    if (!(result.csiPart2CrcCheck === [object Object] || result.csiPart2CrcCheck === [object Object] || result.csiPart2CrcCheck === [object Object]))
        throw new Error(`Value ${result.csiPart2CrcCheck} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_csiPart2CrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtxCsiPart1 = l2l1_getU8(offset + 93);
    result.dtxMetricCsiPart1 = l2l1_getU16(offset + 94);
    result.dtxThresholdCsiPart1 = l2l1_getU16(offset + 96);
    result.dtxCsiPart2 = l2l1_getU8(offset + 98);
    result.dtxMetricCsiPart2 = l2l1_getU16(offset + 100);
    result.dtxThresholdCsiPart2 = l2l1_getU16(offset + 102);
    result.rssiOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 104);
    result.rxPowerOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 136);
    result.sinrOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 168);
    result.shortTermTaMetricOfAnt = decodeStaticFixedSizedArray_int16_8(offset + 200);
    result.shortTermTaPeakAmpOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 216);
    result.shortTermCfoMetricOfAnt = decodeStaticFixedSizedArray_shortTermCfoMetric_t_8(offset + 248);
    result.linRssiOfAnt = decodeStaticFixedSizedArray_uint64_8(offset + 312);
    result.linNoiseOfAnt = decodeStaticFixedSizedArray_uint32_8(offset + 376);

    return result;
}
function UlDataencodeUePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU8(msg.fakeUe, buf, off + 3);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
    l2l1_putU8(msg.slotAggregationCountDown, buf, off + 7);
    l1_commonencodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 8);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 16);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 20);
    l2l1_putF32(msg.rxPower, buf, off + 24);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 28);
    l2l1_putF32(msg.rssi, buf, off + 36);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 40);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 44);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 48);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 52);
    encodeStaticFixedSizedArray_float32_2(msg.channelCorrMetric, buf, off + 60);
    l2l1_putU8(msg.ulRank, buf, off + 68);
    l2l1_putU8(msg.rachStatus, buf, off + 69);
    encodeStaticFixedSizedArray_uint8_7(msg.uciCsiPart1Bits, buf, off + 72);
    l2l1_putU8(msg.csiPart1CrcCheck, buf, off + 80);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 81);
    encodeStaticFixedSizedArray_uint8_7(msg.uciCsiPart2Bits, buf, off + 84);
    l2l1_putU8(msg.csiPart2CrcCheck, buf, off + 92);
    l2l1_putU8(msg.dtxCsiPart1, buf, off + 93);
    l2l1_putU16(msg.dtxMetricCsiPart1, buf, off + 94);
    l2l1_putU16(msg.dtxThresholdCsiPart1, buf, off + 96);
    l2l1_putU8(msg.dtxCsiPart2, buf, off + 98);
    l2l1_putU16(msg.dtxMetricCsiPart2, buf, off + 100);
    l2l1_putU16(msg.dtxThresholdCsiPart2, buf, off + 102);
    encodeStaticFixedSizedArray_float32_8(msg.rssiOfAnt, buf, off + 104);
    encodeStaticFixedSizedArray_float32_8(msg.rxPowerOfAnt, buf, off + 136);
    encodeStaticFixedSizedArray_float32_8(msg.sinrOfAnt, buf, off + 168);
    encodeStaticFixedSizedArray_int16_8(msg.shortTermTaMetricOfAnt, buf, off + 200);
    encodeStaticFixedSizedArray_float32_8(msg.shortTermTaPeakAmpOfAnt, buf, off + 216);
    encodeStaticFixedSizedArray_shortTermCfoMetric_t_8(msg.shortTermCfoMetricOfAnt, buf, off + 248);
    encodeStaticFixedSizedArray_uint64_8(msg.linRssiOfAnt, buf, off + 312);
    encodeStaticFixedSizedArray_uint32_8(msg.linNoiseOfAnt, buf, off + 376);
}
function UlDatadecodepuschReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.rtwpOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 8);
    result.noisePerPrb = decodeDynamicVariableSizedArray_uint32_273(offset + 40);
    result.grants = decodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_16(offset + 48);

    return result;
}
function UlDataencodepuschReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    encodeStaticFixedSizedArray_float32_8(msg.rtwpOfAnt, buf, off + 8);
    encodeDynamicVariableSizedArray_uint32_273(msg.noisePerPrb, buf, off + 40);
    encodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_16(msg.grants, buf, off + 48);
}
function UlDatadecodeUePuschReceiveRespPs_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.harqProcessIndex = l2l1_getU8(offset + 2);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.fakeUe = l2l1_getU8(offset + 3);
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.slotAggregationCountDown = l2l1_getU8(offset + 7);
    result.shortTermCfoMetric = l1_commondecodeshortTermCfoMetric_t(offset + 8);
    result.shortTermTaMetric = l2l1_getI16(offset + 16);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 20);
    result.rxPower = l2l1_getF32(offset + 24);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 28);
    result.rssi = l2l1_getF32(offset + 36);
    result.ulPmiRank1 = l2l1_getU8(offset + 40);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 44);
    result.ulPmiRank2 = l2l1_getU8(offset + 48);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 52);
    result.channelCorrMetric = decodeStaticFixedSizedArray_float32_2(offset + 60);
    result.ulRank = l2l1_getU8(offset + 68);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.rachStatus = l2l1_getU8(offset + 69);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.uciCsiPart1Bits = decodeStaticFixedSizedArray_uint8_7(offset + 72);
    result.csiPart1CrcCheck = l2l1_getU8(offset + 80);
/*    if (!(result.csiPart1CrcCheck === [object Object] || result.csiPart1CrcCheck === [object Object] || result.csiPart1CrcCheck === [object Object]))
        throw new Error(`Value ${result.csiPart1CrcCheck} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_csiPart1CrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 81);
    result.uciCsiPart2Bits = decodeStaticFixedSizedArray_uint8_7(offset + 84);
    result.csiPart2CrcCheck = l2l1_getU8(offset + 92);
/*    if (!(result.csiPart2CrcCheck === [object Object] || result.csiPart2CrcCheck === [object Object] || result.csiPart2CrcCheck === [object Object]))
        throw new Error(`Value ${result.csiPart2CrcCheck} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_csiPart2CrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtxCsiPart1 = l2l1_getU8(offset + 93);
    result.dtxMetricCsiPart1 = l2l1_getU16(offset + 94);
    result.dtxThresholdCsiPart1 = l2l1_getU16(offset + 96);
    result.dtxCsiPart2 = l2l1_getU8(offset + 98);
    result.dtxMetricCsiPart2 = l2l1_getU16(offset + 100);
    result.dtxThresholdCsiPart2 = l2l1_getU16(offset + 102);
    result.rssiOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 104);
    result.rxPowerOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 136);
    result.sinrOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 168);
    result.shortTermTaMetricOfAnt = decodeStaticFixedSizedArray_int16_8(offset + 200);
    result.shortTermTaPeakAmpOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 216);
    result.shortTermCfoMetricOfAnt = decodeStaticFixedSizedArray_shortTermCfoMetric_t_8(offset + 248);
    result.linRssiOfAnt = decodeStaticFixedSizedArray_uint64_8(offset + 312);
    result.linNoiseOfAnt = decodeStaticFixedSizedArray_uint32_8(offset + 376);

    return result;
}
function UlDataencodeUePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU8(msg.fakeUe, buf, off + 3);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
    l2l1_putU8(msg.slotAggregationCountDown, buf, off + 7);
    l1_commonencodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 8);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 16);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 20);
    l2l1_putF32(msg.rxPower, buf, off + 24);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 28);
    l2l1_putF32(msg.rssi, buf, off + 36);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 40);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 44);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 48);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 52);
    encodeStaticFixedSizedArray_float32_2(msg.channelCorrMetric, buf, off + 60);
    l2l1_putU8(msg.ulRank, buf, off + 68);
    l2l1_putU8(msg.rachStatus, buf, off + 69);
    encodeStaticFixedSizedArray_uint8_7(msg.uciCsiPart1Bits, buf, off + 72);
    l2l1_putU8(msg.csiPart1CrcCheck, buf, off + 80);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 81);
    encodeStaticFixedSizedArray_uint8_7(msg.uciCsiPart2Bits, buf, off + 84);
    l2l1_putU8(msg.csiPart2CrcCheck, buf, off + 92);
    l2l1_putU8(msg.dtxCsiPart1, buf, off + 93);
    l2l1_putU16(msg.dtxMetricCsiPart1, buf, off + 94);
    l2l1_putU16(msg.dtxThresholdCsiPart1, buf, off + 96);
    l2l1_putU8(msg.dtxCsiPart2, buf, off + 98);
    l2l1_putU16(msg.dtxMetricCsiPart2, buf, off + 100);
    l2l1_putU16(msg.dtxThresholdCsiPart2, buf, off + 102);
    encodeStaticFixedSizedArray_float32_8(msg.rssiOfAnt, buf, off + 104);
    encodeStaticFixedSizedArray_float32_8(msg.rxPowerOfAnt, buf, off + 136);
    encodeStaticFixedSizedArray_float32_8(msg.sinrOfAnt, buf, off + 168);
    encodeStaticFixedSizedArray_int16_8(msg.shortTermTaMetricOfAnt, buf, off + 200);
    encodeStaticFixedSizedArray_float32_8(msg.shortTermTaPeakAmpOfAnt, buf, off + 216);
    encodeStaticFixedSizedArray_shortTermCfoMetric_t_8(msg.shortTermCfoMetricOfAnt, buf, off + 248);
    encodeStaticFixedSizedArray_uint64_8(msg.linRssiOfAnt, buf, off + 312);
    encodeStaticFixedSizedArray_uint32_8(msg.linNoiseOfAnt, buf, off + 376);
}
function UlDatadecodePuschReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.bcn_reservation_for_debug = l2l1_getU8(offset + 7);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    l2l1_putU8(msg.bcn_reservation_for_debug, buf, off + 7);
    encodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(msg.subcells, buf, off + 8);
}
function l1_commondecodelongTermCfoMetric_t(offset) {
    let result = {};

    result.Re = l2l1_getF32(offset + 0);
    result.Im = l2l1_getF32(offset + 4);

    return result;
}
function l1_commonencodelongTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.Re, buf, off + 0);
    l2l1_putF32(msg.Im, buf, off + 4);
}
function UlDatadecodecsiReportStruct_t(offset) {
    let result = {};

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
function UlDataencodecsiReportStruct_t(msg, buf, off) {
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
function UlDatadecodeeCpriConfigStruct_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);

    return result;
}
function UlDataencodeeCpriConfigStruct_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
}
function UlDatadecodeeCpriFcpSectionConfig_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);
    result.fcpAddSectionEnable = l2l1_getU8(offset + 4);
    result.fcpAddSectionId = l2l1_getU16(offset + 6);
    result.fcpAddStartPrbc = l2l1_getU16(offset + 8);
    result.fcpAddNumPrbc = l2l1_getU16(offset + 10);
    result.fcpAddPatternId = decodeStaticFixedSizedArray_uint16_2(offset + 12);

    return result;
}
function UlDataencodeeCpriFcpSectionConfig_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
    l2l1_putU8(msg.fcpAddSectionEnable, buf, off + 4);
    l2l1_putU16(msg.fcpAddSectionId, buf, off + 6);
    l2l1_putU16(msg.fcpAddStartPrbc, buf, off + 8);
    l2l1_putU16(msg.fcpAddNumPrbc, buf, off + 10);
    encodeStaticFixedSizedArray_uint16_2(msg.fcpAddPatternId, buf, off + 12);
}
function UlDatadecodepuschReceiveReqGrant_t(offset) {
    let result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.ulDmrsConfigType = l2l1_getU8(offset + 6);
/*    if (!(result.ulDmrsConfigType === [object Object] || result.ulDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.ulDmrsConfigType} is out of range for enum 'ulDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 7);
/*    if (!(result.ulDmrsLen === [object Object] || result.ulDmrsLen === [object Object]))
        throw new Error(`Value ${result.ulDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 8);
/*    if (!(result.ulDmrsMappingType === [object Object] || result.ulDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.ulDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 9);
    result.ulDmrsTypeAPos = l2l1_getU8(offset + 10);
    result.startSymbol = l2l1_getU8(offset + 11);
/*    if (!(result.startSymbol === [object Object] || result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'puschStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 12);
/*    if (!(result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPuschSymbols} is out of range for enum 'numOfPuschSymbols_t'`); */
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPuschSymbols_t",
    });
    result.rachStatus = l2l1_getU8(offset + 13);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.startPrb = l2l1_getU16(offset + 14);
    result.numOfPrb = l2l1_getU16(offset + 16);
    result.mcs = l2l1_getU8(offset + 18);
    result.mcsTable = l2l1_getU8(offset + 19);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object] || result.mcsTable === [object Object]))
        throw new Error(`Value ${result.mcsTable} is out of range for enum 'mcsTable_t'`); */
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "l1_common_mcsTable_t",
    });
    result.antPort = l2l1_getU16(offset + 20);
    result.spatialMode = l2l1_getU8(offset + 22);
/*    if (!(result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object]))
        throw new Error(`Value ${result.spatialMode} is out of range for enum 'SpatialMode'`); */
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 23);
/*    if (!(result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object]))
        throw new Error(`Value ${result.codebookIndex} is out of range for enum 'ulCodebookIndex_t'`); */
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulCodebookIndex_t",
    });
    result.nscId = l2l1_getU8(offset + 24);
    result.fakeUe = l2l1_getU8(offset + 25);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 26);
    result.ulPtrsFlag = l2l1_getU8(offset + 28);
/*    if (!(result.ulPtrsFlag === [object Object] || result.ulPtrsFlag === [object Object]))
        throw new Error(`Value ${result.ulPtrsFlag} is out of range for enum 'PtrsFlag'`); */
    Object.defineProperty(result, "__enum_ulPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_PtrsFlag",
    });
    result.ulPtrsTimeDensity = l2l1_getU8(offset + 29);
/*    if (!(result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object]))
        throw new Error(`Value ${result.ulPtrsTimeDensity} is out of range for enum 'ptrsTimeDensity_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsTimeDensity_t",
    });
    result.ulPtrsFrequencyDensity = l2l1_getU8(offset + 30);
/*    if (!(result.ulPtrsFrequencyDensity === [object Object] || result.ulPtrsFrequencyDensity === [object Object] || result.ulPtrsFrequencyDensity === [object Object]))
        throw new Error(`Value ${result.ulPtrsFrequencyDensity} is out of range for enum 'ptrsFrequencyDensity_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsFrequencyDensity_t",
    });
    result.ulPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.ulPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.ulPtrsNumOfGroups = l2l1_getU8(offset + 33);
/*    if (!(result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object]))
        throw new Error(`Value ${result.ulPtrsNumOfGroups} is out of range for enum 'ulPtrsNumOfGroups_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsNumOfGroups", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPtrsNumOfGroups_t",
    });
    result.ulPtrsNumOfSamplesPerGroup = l2l1_getU8(offset + 34);
/*    if (!(result.ulPtrsNumOfSamplesPerGroup === [object Object] || result.ulPtrsNumOfSamplesPerGroup === [object Object] || result.ulPtrsNumOfSamplesPerGroup === [object Object]))
        throw new Error(`Value ${result.ulPtrsNumOfSamplesPerGroup} is out of range for enum 'ulPtrsNumOfSamplesPerGroup_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsNumOfSamplesPerGroup", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPtrsNumOfSamplesPerGroup_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 35);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
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
    result.csiReportStruct = decodeDynamicVariableSizedArray_csiReportStruct_t_8(offset + 68);
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 76);
    result.foeValid = l2l1_getU8(offset + 84);
    result.baseGraph = l2l1_getU8(offset + 85);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 86);
    result.codeBlockSize = l2l1_getU16(offset + 88);
    result.numOfFillerBits = l2l1_getU16(offset + 90);
    result.liftSize = l2l1_getU16(offset + 92);
    result.liftSizeSetIndex = l2l1_getU8(offset + 94);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 95);
    result.modulationOrder = l2l1_getU8(offset + 96);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 97);
    result.ncb = l2l1_getU16(offset + 98);
    result.k0divZ = l2l1_getU8(offset + 100);
    result.numOfLayers = l2l1_getU8(offset + 101);
    result.puschTransCoherence = l2l1_getU8(offset + 102);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });
    result.puschTransformPrecoderFlag = l2l1_getU8(offset + 103);
/*    if (!(result.puschTransformPrecoderFlag === [object Object] || result.puschTransformPrecoderFlag === [object Object]))
        throw new Error(`Value ${result.puschTransformPrecoderFlag} is out of range for enum 'puschTransformPrecoderFlag_t'`); */
    Object.defineProperty(result, "__enum_puschTransformPrecoderFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransformPrecoderFlag_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 104);
    result.blerTarget = l2l1_getU8(offset + 105);
/*    if (!(result.blerTarget === [object Object] || result.blerTarget === [object Object]))
        throw new Error(`Value ${result.blerTarget} is out of range for enum 'blerTarget_t'`); */
    Object.defineProperty(result, "__enum_blerTarget", {
        enumerable: false,
        writable: false,
        value: "l1_common_blerTarget_t",
    });
    result.eCpriConfigStruct = UlDatadecodeeCpriConfigStruct_t(offset + 108);
    result.numOfDmrsCdmGroupWithoutData = l2l1_getU8(offset + 128);
    result.slotAggregationCountDown = l2l1_getU8(offset + 129);
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 132);
    result.eCpriSectionId = l2l1_getU16(offset + 140);
    result.cRnti = l2l1_getU16(offset + 142);
    result.longTermCfoMetricOfAnt = decodeStaticFixedSizedArray_longTermCfoMetric_t_8(offset + 144);
    result.eCpriFcpSectionConfig = UlDatadecodeeCpriFcpSectionConfig_t(offset + 208);
    result.prachPeakMetric = l2l1_getF32(offset + 224);
    result.ext = decodeStaticVariableSizedArray_uint32_2(offset + 228);
    result.pairedUe = l2l1_getU16(offset + 240);

    return result;
}
function UlDataencodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 6);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 7);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 8);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 9);
    l2l1_putU8(msg.ulDmrsTypeAPos, buf, off + 10);
    l2l1_putU8(msg.startSymbol, buf, off + 11);
    l2l1_putU8(msg.numOfPuschSymbols, buf, off + 12);
    l2l1_putU8(msg.rachStatus, buf, off + 13);
    l2l1_putU16(msg.startPrb, buf, off + 14);
    l2l1_putU16(msg.numOfPrb, buf, off + 16);
    l2l1_putU8(msg.mcs, buf, off + 18);
    l2l1_putU8(msg.mcsTable, buf, off + 19);
    l2l1_putU16(msg.antPort, buf, off + 20);
    l2l1_putU8(msg.spatialMode, buf, off + 22);
    l2l1_putU8(msg.codebookIndex, buf, off + 23);
    l2l1_putU8(msg.nscId, buf, off + 24);
    l2l1_putU8(msg.fakeUe, buf, off + 25);
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
    encodeDynamicVariableSizedArray_csiReportStruct_t_8(msg.csiReportStruct, buf, off + 68);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 76);
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
    l2l1_putU8(msg.blerTarget, buf, off + 105);
    UlDataencodeeCpriConfigStruct_t(msg.eCpriConfigStruct, buf, off + 108);
    l2l1_putU8(msg.numOfDmrsCdmGroupWithoutData, buf, off + 128);
    l2l1_putU8(msg.slotAggregationCountDown, buf, off + 129);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 132);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 140);
    l2l1_putU16(msg.cRnti, buf, off + 142);
    encodeStaticFixedSizedArray_longTermCfoMetric_t_8(msg.longTermCfoMetricOfAnt, buf, off + 144);
    UlDataencodeeCpriFcpSectionConfig_t(msg.eCpriFcpSectionConfig, buf, off + 208);
    l2l1_putF32(msg.prachPeakMetric, buf, off + 224);
    encodeStaticVariableSizedArray_uint32_2(msg.ext, buf, off + 228);
    l2l1_putU16(msg.pairedUe, buf, off + 240);
}
function UlDatadecodepuschReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.grants = decodeDynamicVariableSizedArray_puschReceiveReqGrant_t_16(offset + 8);

    return result;
}
function UlDataencodepuschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    encodeDynamicVariableSizedArray_puschReceiveReqGrant_t_16(msg.grants, buf, off + 8);
}
function UlDatadecodepuschReceiveReqGrant_t(offset) {
    let result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.ulDmrsConfigType = l2l1_getU8(offset + 6);
/*    if (!(result.ulDmrsConfigType === [object Object] || result.ulDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.ulDmrsConfigType} is out of range for enum 'ulDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 7);
/*    if (!(result.ulDmrsLen === [object Object] || result.ulDmrsLen === [object Object]))
        throw new Error(`Value ${result.ulDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 8);
/*    if (!(result.ulDmrsMappingType === [object Object] || result.ulDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.ulDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 9);
    result.ulDmrsTypeAPos = l2l1_getU8(offset + 10);
    result.startSymbol = l2l1_getU8(offset + 11);
/*    if (!(result.startSymbol === [object Object] || result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'puschStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 12);
/*    if (!(result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPuschSymbols} is out of range for enum 'numOfPuschSymbols_t'`); */
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPuschSymbols_t",
    });
    result.rachStatus = l2l1_getU8(offset + 13);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.startPrb = l2l1_getU16(offset + 14);
    result.numOfPrb = l2l1_getU16(offset + 16);
    result.mcs = l2l1_getU8(offset + 18);
    result.mcsTable = l2l1_getU8(offset + 19);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object] || result.mcsTable === [object Object]))
        throw new Error(`Value ${result.mcsTable} is out of range for enum 'mcsTable_t'`); */
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "l1_common_mcsTable_t",
    });
    result.antPort = l2l1_getU16(offset + 20);
    result.spatialMode = l2l1_getU8(offset + 22);
/*    if (!(result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object]))
        throw new Error(`Value ${result.spatialMode} is out of range for enum 'SpatialMode'`); */
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 23);
/*    if (!(result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object]))
        throw new Error(`Value ${result.codebookIndex} is out of range for enum 'ulCodebookIndex_t'`); */
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulCodebookIndex_t",
    });
    result.nscId = l2l1_getU8(offset + 24);
    result.fakeUe = l2l1_getU8(offset + 25);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 26);
    result.ulPtrsFlag = l2l1_getU8(offset + 28);
/*    if (!(result.ulPtrsFlag === [object Object] || result.ulPtrsFlag === [object Object]))
        throw new Error(`Value ${result.ulPtrsFlag} is out of range for enum 'PtrsFlag'`); */
    Object.defineProperty(result, "__enum_ulPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_PtrsFlag",
    });
    result.ulPtrsTimeDensity = l2l1_getU8(offset + 29);
/*    if (!(result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object] || result.ulPtrsTimeDensity === [object Object]))
        throw new Error(`Value ${result.ulPtrsTimeDensity} is out of range for enum 'ptrsTimeDensity_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsTimeDensity_t",
    });
    result.ulPtrsFrequencyDensity = l2l1_getU8(offset + 30);
/*    if (!(result.ulPtrsFrequencyDensity === [object Object] || result.ulPtrsFrequencyDensity === [object Object] || result.ulPtrsFrequencyDensity === [object Object]))
        throw new Error(`Value ${result.ulPtrsFrequencyDensity} is out of range for enum 'ptrsFrequencyDensity_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsFrequencyDensity_t",
    });
    result.ulPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.ulPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.ulPtrsNumOfGroups = l2l1_getU8(offset + 33);
/*    if (!(result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object] || result.ulPtrsNumOfGroups === [object Object]))
        throw new Error(`Value ${result.ulPtrsNumOfGroups} is out of range for enum 'ulPtrsNumOfGroups_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsNumOfGroups", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPtrsNumOfGroups_t",
    });
    result.ulPtrsNumOfSamplesPerGroup = l2l1_getU8(offset + 34);
/*    if (!(result.ulPtrsNumOfSamplesPerGroup === [object Object] || result.ulPtrsNumOfSamplesPerGroup === [object Object] || result.ulPtrsNumOfSamplesPerGroup === [object Object]))
        throw new Error(`Value ${result.ulPtrsNumOfSamplesPerGroup} is out of range for enum 'ulPtrsNumOfSamplesPerGroup_t'`); */
    Object.defineProperty(result, "__enum_ulPtrsNumOfSamplesPerGroup", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPtrsNumOfSamplesPerGroup_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 35);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
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
    result.csiReportStruct = decodeDynamicVariableSizedArray_csiReportStruct_t_8(offset + 68);
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 76);
    result.foeValid = l2l1_getU8(offset + 84);
    result.baseGraph = l2l1_getU8(offset + 85);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 86);
    result.codeBlockSize = l2l1_getU16(offset + 88);
    result.numOfFillerBits = l2l1_getU16(offset + 90);
    result.liftSize = l2l1_getU16(offset + 92);
    result.liftSizeSetIndex = l2l1_getU8(offset + 94);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 95);
    result.modulationOrder = l2l1_getU8(offset + 96);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 97);
    result.ncb = l2l1_getU16(offset + 98);
    result.k0divZ = l2l1_getU8(offset + 100);
    result.numOfLayers = l2l1_getU8(offset + 101);
    result.puschTransCoherence = l2l1_getU8(offset + 102);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });
    result.puschTransformPrecoderFlag = l2l1_getU8(offset + 103);
/*    if (!(result.puschTransformPrecoderFlag === [object Object] || result.puschTransformPrecoderFlag === [object Object]))
        throw new Error(`Value ${result.puschTransformPrecoderFlag} is out of range for enum 'puschTransformPrecoderFlag_t'`); */
    Object.defineProperty(result, "__enum_puschTransformPrecoderFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransformPrecoderFlag_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 104);
    result.blerTarget = l2l1_getU8(offset + 105);
/*    if (!(result.blerTarget === [object Object] || result.blerTarget === [object Object]))
        throw new Error(`Value ${result.blerTarget} is out of range for enum 'blerTarget_t'`); */
    Object.defineProperty(result, "__enum_blerTarget", {
        enumerable: false,
        writable: false,
        value: "l1_common_blerTarget_t",
    });
    result.eCpriConfigStruct = UlDatadecodeeCpriConfigStruct_t(offset + 108);
    result.numOfDmrsCdmGroupWithoutData = l2l1_getU8(offset + 128);
    result.slotAggregationCountDown = l2l1_getU8(offset + 129);
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 132);
    result.eCpriSectionId = l2l1_getU16(offset + 140);
    result.cRnti = l2l1_getU16(offset + 142);
    result.longTermCfoMetricOfAnt = decodeStaticFixedSizedArray_longTermCfoMetric_t_8(offset + 144);
    result.eCpriFcpSectionConfig = UlDatadecodeeCpriFcpSectionConfig_t(offset + 208);
    result.prachPeakMetric = l2l1_getF32(offset + 224);
    result.ext = decodeStaticVariableSizedArray_uint32_2(offset + 228);
    result.pairedUe = l2l1_getU16(offset + 240);

    return result;
}
function UlDataencodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 6);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 7);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 8);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 9);
    l2l1_putU8(msg.ulDmrsTypeAPos, buf, off + 10);
    l2l1_putU8(msg.startSymbol, buf, off + 11);
    l2l1_putU8(msg.numOfPuschSymbols, buf, off + 12);
    l2l1_putU8(msg.rachStatus, buf, off + 13);
    l2l1_putU16(msg.startPrb, buf, off + 14);
    l2l1_putU16(msg.numOfPrb, buf, off + 16);
    l2l1_putU8(msg.mcs, buf, off + 18);
    l2l1_putU8(msg.mcsTable, buf, off + 19);
    l2l1_putU16(msg.antPort, buf, off + 20);
    l2l1_putU8(msg.spatialMode, buf, off + 22);
    l2l1_putU8(msg.codebookIndex, buf, off + 23);
    l2l1_putU8(msg.nscId, buf, off + 24);
    l2l1_putU8(msg.fakeUe, buf, off + 25);
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
    encodeDynamicVariableSizedArray_csiReportStruct_t_8(msg.csiReportStruct, buf, off + 68);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 76);
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
    l2l1_putU8(msg.blerTarget, buf, off + 105);
    UlDataencodeeCpriConfigStruct_t(msg.eCpriConfigStruct, buf, off + 108);
    l2l1_putU8(msg.numOfDmrsCdmGroupWithoutData, buf, off + 128);
    l2l1_putU8(msg.slotAggregationCountDown, buf, off + 129);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 132);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 140);
    l2l1_putU16(msg.cRnti, buf, off + 142);
    encodeStaticFixedSizedArray_longTermCfoMetric_t_8(msg.longTermCfoMetricOfAnt, buf, off + 144);
    UlDataencodeeCpriFcpSectionConfig_t(msg.eCpriFcpSectionConfig, buf, off + 208);
    l2l1_putF32(msg.prachPeakMetric, buf, off + 224);
    encodeStaticVariableSizedArray_uint32_2(msg.ext, buf, off + 228);
    l2l1_putU16(msg.pairedUe, buf, off + 240);
}
function UlDatadecodecsiReportStruct_t(offset) {
    let result = {};

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
function UlDataencodecsiReportStruct_t(msg, buf, off) {
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
function UlDatadecodeeCpriFcpSectionConfig_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);
    result.fcpAddSectionEnable = l2l1_getU8(offset + 4);
    result.fcpAddSectionId = l2l1_getU16(offset + 6);
    result.fcpAddStartPrbc = l2l1_getU16(offset + 8);
    result.fcpAddNumPrbc = l2l1_getU16(offset + 10);
    result.fcpAddPatternId = decodeStaticFixedSizedArray_uint16_2(offset + 12);

    return result;
}
function UlDataencodeeCpriFcpSectionConfig_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
    l2l1_putU8(msg.fcpAddSectionEnable, buf, off + 4);
    l2l1_putU16(msg.fcpAddSectionId, buf, off + 6);
    l2l1_putU16(msg.fcpAddStartPrbc, buf, off + 8);
    l2l1_putU16(msg.fcpAddNumPrbc, buf, off + 10);
    encodeStaticFixedSizedArray_uint16_2(msg.fcpAddPatternId, buf, off + 12);
}
function UlDatadecodeeCpriConfigStruct_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);

    return result;
}
function UlDataencodeeCpriConfigStruct_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
}
function UlDatadecodePuschReceiveReq_t(offset) {
    let result = {};

    result.addrPuschReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPuschReceiveRespLo = l2l1_getU32(offset + 4);
    result.addrPuschReceiveRespHarqU = l2l1_getU32(offset + 8);
    result.addrPuschReceiveRespHarqD = l2l1_getU32(offset + 12);
    result.sfn = l2l1_getU16(offset + 16);
    result.slot = l2l1_getU8(offset + 18);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(offset + 20);

    return result;
}
function UlDataencodePuschReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPuschReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPuschReceiveRespLo, buf, off + 4);
    l2l1_putU32(msg.addrPuschReceiveRespHarqU, buf, off + 8);
    l2l1_putU32(msg.addrPuschReceiveRespHarqD, buf, off + 12);
    l2l1_putU16(msg.sfn, buf, off + 16);
    l2l1_putU8(msg.slot, buf, off + 18);
    encodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(msg.subcells, buf, off + 20);
}
function UlDatadecodepuschReceiveRespHarqDGrants_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ackNack1BitUci = l2l1_getU8(offset + 2);
/*    if (!(result.ackNack1BitUci === [object Object] || result.ackNack1BitUci === [object Object]))
        throw new Error(`Value ${result.ackNack1BitUci} is out of range for enum 'ackNackUci_t'`); */
    Object.defineProperty(result, "__enum_ackNack1BitUci", {
        enumerable: false,
        writable: false,
        value: "l1_common_ackNackUci_t",
    });
    result.dtxAck1Bit = l2l1_getU8(offset + 3);
    result.dtxMetricAck1Bit = l2l1_getU16(offset + 4);
    result.dtxThresholdAck1Bit = l2l1_getU16(offset + 6);
    result.ackNackUciMoreThan1Bit = decodeStaticFixedSizedArray_uint8_7(offset + 8);
    result.dtxAckMoreThan1Bit = l2l1_getU8(offset + 16);
    result.dtxMetricAckMoreThan1Bit = l2l1_getU16(offset + 18);
    result.dtxThresholdAckMoreThan1Bit = l2l1_getU16(offset + 20);
    result.ackCrcCheck = l2l1_getU8(offset + 22);
/*    if (!(result.ackCrcCheck === [object Object] || result.ackCrcCheck === [object Object]))
        throw new Error(`Value ${result.ackCrcCheck} is out of range for enum 'ackCrcCheck_t'`); */
    Object.defineProperty(result, "__enum_ackCrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_ackCrcCheck_t",
    });
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 24);

    return result;
}
function UlDataencodepuschReceiveRespHarqDGrants_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ackNack1BitUci, buf, off + 2);
    l2l1_putU8(msg.dtxAck1Bit, buf, off + 3);
    l2l1_putU16(msg.dtxMetricAck1Bit, buf, off + 4);
    l2l1_putU16(msg.dtxThresholdAck1Bit, buf, off + 6);
    encodeStaticFixedSizedArray_uint8_7(msg.ackNackUciMoreThan1Bit, buf, off + 8);
    l2l1_putU8(msg.dtxAckMoreThan1Bit, buf, off + 16);
    l2l1_putU16(msg.dtxMetricAckMoreThan1Bit, buf, off + 18);
    l2l1_putU16(msg.dtxThresholdAckMoreThan1Bit, buf, off + 20);
    l2l1_putU8(msg.ackCrcCheck, buf, off + 22);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 24);
}
function UlDatadecodepuschReceiveRespHarqDSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = decodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(offset + 4);

    return result;
}
function UlDataencodepuschReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(msg.grants, buf, off + 4);
}
function UlDatadecodePuschReceiveRespHarqD_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveRespHarqDSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodePuschReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    encodeDynamicVariableSizedArray_puschReceiveRespHarqDSubcell_t_4(msg.subcells, buf, off + 8);
}
function UlDatadecodepuschReceiveRespHarqDSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = decodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(offset + 4);

    return result;
}
function UlDataencodepuschReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(msg.grants, buf, off + 4);
}
function UlDatadecodepuschReceiveRespHarqDGrants_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ackNack1BitUci = l2l1_getU8(offset + 2);
/*    if (!(result.ackNack1BitUci === [object Object] || result.ackNack1BitUci === [object Object]))
        throw new Error(`Value ${result.ackNack1BitUci} is out of range for enum 'ackNackUci_t'`); */
    Object.defineProperty(result, "__enum_ackNack1BitUci", {
        enumerable: false,
        writable: false,
        value: "l1_common_ackNackUci_t",
    });
    result.dtxAck1Bit = l2l1_getU8(offset + 3);
    result.dtxMetricAck1Bit = l2l1_getU16(offset + 4);
    result.dtxThresholdAck1Bit = l2l1_getU16(offset + 6);
    result.ackNackUciMoreThan1Bit = decodeStaticFixedSizedArray_uint8_7(offset + 8);
    result.dtxAckMoreThan1Bit = l2l1_getU8(offset + 16);
    result.dtxMetricAckMoreThan1Bit = l2l1_getU16(offset + 18);
    result.dtxThresholdAckMoreThan1Bit = l2l1_getU16(offset + 20);
    result.ackCrcCheck = l2l1_getU8(offset + 22);
/*    if (!(result.ackCrcCheck === [object Object] || result.ackCrcCheck === [object Object]))
        throw new Error(`Value ${result.ackCrcCheck} is out of range for enum 'ackCrcCheck_t'`); */
    Object.defineProperty(result, "__enum_ackCrcCheck", {
        enumerable: false,
        writable: false,
        value: "l1_common_ackCrcCheck_t",
    });
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 24);

    return result;
}
function UlDataencodepuschReceiveRespHarqDGrants_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ackNack1BitUci, buf, off + 2);
    l2l1_putU8(msg.dtxAck1Bit, buf, off + 3);
    l2l1_putU16(msg.dtxMetricAck1Bit, buf, off + 4);
    l2l1_putU16(msg.dtxThresholdAck1Bit, buf, off + 6);
    encodeStaticFixedSizedArray_uint8_7(msg.ackNackUciMoreThan1Bit, buf, off + 8);
    l2l1_putU8(msg.dtxAckMoreThan1Bit, buf, off + 16);
    l2l1_putU16(msg.dtxMetricAckMoreThan1Bit, buf, off + 18);
    l2l1_putU16(msg.dtxThresholdAckMoreThan1Bit, buf, off + 20);
    l2l1_putU8(msg.ackCrcCheck, buf, off + 22);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 24);
}
function UlDatadecodeUePuschReceiveRespHarqU_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 6);

    return result;
}
function UlDataencodeUePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.crc, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 3);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 4);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 6);
}
function UlDatadecodepuschReceiveRespHarqUSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = decodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_16(offset + 4);

    return result;
}
function UlDataencodepuschReceiveRespHarqUSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_16(msg.grants, buf, off + 4);
}
function UlDatadecodeUePuschReceiveRespHarqU_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 6);

    return result;
}
function UlDataencodeUePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.crc, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 3);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 4);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 6);
}
function UlDatadecodePuschReceiveRespHarqU_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    encodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(msg.subcells, buf, off + 8);
}
function UlDatadecodedetectedPrachPreambles_t(offset) {
    let result = {};

    result.prachPreambleIndex = l2l1_getU8(offset + 0);
    result.prachPreambleTimeOccasion = l2l1_getU8(offset + 1);
    result.prachPreambleFreqOccasion = l2l1_getU8(offset + 2);
    result.initialTa = l2l1_getU16(offset + 4);
    result.peakMetric = l2l1_getF32(offset + 8);

    return result;
}
function UlDataencodedetectedPrachPreambles_t(msg, buf, off) {
    l2l1_putU8(msg.prachPreambleIndex, buf, off + 0);
    l2l1_putU8(msg.prachPreambleTimeOccasion, buf, off + 1);
    l2l1_putU8(msg.prachPreambleFreqOccasion, buf, off + 2);
    l2l1_putU16(msg.initialTa, buf, off + 4);
    l2l1_putF32(msg.peakMetric, buf, off + 8);
}
function UlDatadecodeprachReceiveIndSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.noisePowerLinear = l2l1_getU32(offset + 8);
    result.detectedPrachPreambles = decodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(offset + 12);

    return result;
}
function UlDataencodeprachReceiveIndSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    l2l1_putU32(msg.noisePowerLinear, buf, off + 8);
    encodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(msg.detectedPrachPreambles, buf, off + 12);
}
function UlDatadecodePrachReceiveInd_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodePrachReceiveInd_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    encodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(msg.subcells, buf, off + 8);
}
function UlDatadecodeprachReceiveIndSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.noisePowerLinear = l2l1_getU32(offset + 8);
    result.detectedPrachPreambles = decodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(offset + 12);

    return result;
}
function UlDataencodeprachReceiveIndSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    l2l1_putU32(msg.noisePowerLinear, buf, off + 8);
    encodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(msg.detectedPrachPreambles, buf, off + 12);
}
function UlDatadecodedetectedPrachPreambles_t(offset) {
    let result = {};

    result.prachPreambleIndex = l2l1_getU8(offset + 0);
    result.prachPreambleTimeOccasion = l2l1_getU8(offset + 1);
    result.prachPreambleFreqOccasion = l2l1_getU8(offset + 2);
    result.initialTa = l2l1_getU16(offset + 4);
    result.peakMetric = l2l1_getF32(offset + 8);

    return result;
}
function UlDataencodedetectedPrachPreambles_t(msg, buf, off) {
    l2l1_putU8(msg.prachPreambleIndex, buf, off + 0);
    l2l1_putU8(msg.prachPreambleTimeOccasion, buf, off + 1);
    l2l1_putU8(msg.prachPreambleFreqOccasion, buf, off + 2);
    l2l1_putU16(msg.initialTa, buf, off + 4);
    l2l1_putF32(msg.peakMetric, buf, off + 8);
}
function l1_commondecodelongTermCfoMetric_t(offset) {
    let result = {};

    result.Re = l2l1_getF32(offset + 0);
    result.Im = l2l1_getF32(offset + 4);

    return result;
}
function l1_commonencodelongTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.Re, buf, off + 0);
    l2l1_putF32(msg.Im, buf, off + 4);
}
function UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numPrb = l2l1_getU16(offset + 2);
    result.eCpriSectionId = l2l1_getU16(offset + 4);

    return result;
}
function UlDataencodeeCpriPucchResourceAllocationStructure_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numPrb, buf, off + 2);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 4);
}
function UlDatadecodestaticLongPucchConfigEcpri_t(offset) {
    let result = {};

    result.eCpriPucchResourceAllocationLowerDedicated = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 0);
    result.eCpriPucchResourceAllocationUpperDedicated = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 6);
    result.eCpriPucchResourceAllocationLowerCommon = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 12);
    result.eCpriPucchResourceAllocationUpperCommon = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 18);
    result.numCeAxCIndex = l2l1_getU8(offset + 24);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 28);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 36);
    result.startSymbol = l2l1_getU8(offset + 44);
/*    if (!(result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'longPucchStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_longPucchStartSymbol_t",
    });
    result.numSymbols = l2l1_getU8(offset + 45);
/*    if (!(result.numSymbols === [object Object]))
        throw new Error(`Value ${result.numSymbols} is out of range for enum 'numOfLongPucchSymbols_t'`); */
    Object.defineProperty(result, "__enum_numSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfLongPucchSymbols_t",
    });

    return result;
}
function UlDataencodestaticLongPucchConfigEcpri_t(msg, buf, off) {
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerDedicated, buf, off + 0);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperDedicated, buf, off + 6);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerCommon, buf, off + 12);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperCommon, buf, off + 18);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 24);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 28);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 36);
    l2l1_putU8(msg.startSymbol, buf, off + 44);
    l2l1_putU8(msg.numSymbols, buf, off + 45);
}
function UlDatadecodepucchBoundary_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numOfPrb = l2l1_getU16(offset + 2);
    result.startSymbol = l2l1_getU8(offset + 4);
    result.numOfSymbol = l2l1_getU8(offset + 5);

    return result;
}
function UlDataencodepucchBoundary_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numOfPrb, buf, off + 2);
    l2l1_putU8(msg.startSymbol, buf, off + 4);
    l2l1_putU8(msg.numOfSymbol, buf, off + 5);
}
function UlDatadecodeeCpriConfigPucch_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);

    return result;
}
function UlDataencodeeCpriConfigPucch_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
}
function UlDatadecodepucchAreaBoundaries_t(offset) {
    let result = {};

    result.numPucchBoundaries = l2l1_getU8(offset + 0);
    result.pucchBoundary = decodeStaticFixedSizedArray_pucchBoundary_t_8(offset + 4);
    result.eCpriConfig = UlDatadecodeeCpriConfigPucch_t(offset + 52);

    return result;
}
function UlDataencodepucchAreaBoundaries_t(msg, buf, off) {
    l2l1_putU8(msg.numPucchBoundaries, buf, off + 0);
    encodeStaticFixedSizedArray_pucchBoundary_t_8(msg.pucchBoundary, buf, off + 4);
    UlDataencodeeCpriConfigPucch_t(msg.eCpriConfig, buf, off + 52);
}
function UlDatadecodeeCpriPucchFcpAllocConf_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);
    result.secondHopStartPrbc = l2l1_getU16(offset + 4);
    result.secondHopNumPrbc = l2l1_getU16(offset + 6);

    return result;
}
function UlDataencodeeCpriPucchFcpAllocConf_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
    l2l1_putU16(msg.secondHopStartPrbc, buf, off + 4);
    l2l1_putU16(msg.secondHopNumPrbc, buf, off + 6);
}
function UlDatadecodepucchReceiveReqPucchResource_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 3);
/*    if (!(result.numOfLayers === [object Object] || result.numOfLayers === [object Object]))
        throw new Error(`Value ${result.numOfLayers} is out of range for enum 'numOfPucchLayers_t'`); */
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 4);
/*    if (!(result.numOfAntennaPorts === [object Object] || result.numOfAntennaPorts === [object Object]))
        throw new Error(`Value ${result.numOfAntennaPorts} is out of range for enum 'numOfPucchTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 5);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU8(offset + 8);
    result.rachStatus = l2l1_getU8(offset + 9);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 10);
    result.dataScramblingInt = l2l1_getU16(offset + 12);
    result.srBitDetection = l2l1_getU8(offset + 14);
/*    if (!(result.srBitDetection === [object Object] || result.srBitDetection === [object Object] || result.srBitDetection === [object Object]))
        throw new Error(`Value ${result.srBitDetection} is out of range for enum 'srBitDetection_t'`); */
    Object.defineProperty(result, "__enum_srBitDetection", {
        enumerable: false,
        writable: false,
        value: "l1_common_srBitDetection_t",
    });
    result.nANPucch = l2l1_getU8(offset + 15);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 16);
    result.numOfSymbols = l2l1_getU8(offset + 17);
    result.firstSymbol = l2l1_getU8(offset + 18);
    result.frequencyHopping = l2l1_getU8(offset + 19);
/*    if (!(result.frequencyHopping === [object Object] || result.frequencyHopping === [object Object]))
        throw new Error(`Value ${result.frequencyHopping} is out of range for enum 'frequencyHopping_t'`); */
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "l1_common_frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 20);
    result.initialCyclicShift = l2l1_getU8(offset + 22);
    result.additionalDmrs = l2l1_getU8(offset + 23);
/*    if (!(result.additionalDmrs === [object Object] || result.additionalDmrs === [object Object]))
        throw new Error(`Value ${result.additionalDmrs} is out of range for enum 'pucchAdditionalDmrs_t'`); */
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 24);
    result.numCeAxCIndex = l2l1_getU8(offset + 25);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 28);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 36);
    result.modulationType = l2l1_getU8(offset + 44);
/*    if (!(result.modulationType === [object Object] || result.modulationType === [object Object]))
        throw new Error(`Value ${result.modulationType} is out of range for enum 'pucchModulationType_t'`); */
    Object.defineProperty(result, "__enum_modulationType", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchModulationType_t",
    });
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 48);
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 56);
    result.eCpriSectionId = decodeStaticFixedSizedArray_uint16_2(offset + 64);
    result.longTermCfoMetricOfAnt = decodeStaticFixedSizedArray_longTermCfoMetric_t_8(offset + 68);
    result.eCpriPucchFcpAllocConf = UlDatadecodeeCpriPucchFcpAllocConf_t(offset + 132);

    return result;
}
function UlDataencodepucchReceiveReqPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.numOfLayers, buf, off + 3);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 5);
    l2l1_putU16(msg.startPrb, buf, off + 6);
    l2l1_putU8(msg.numOfPrb, buf, off + 8);
    l2l1_putU8(msg.rachStatus, buf, off + 9);
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
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 28);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 36);
    l2l1_putU8(msg.modulationType, buf, off + 44);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 48);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 56);
    encodeStaticFixedSizedArray_uint16_2(msg.eCpriSectionId, buf, off + 64);
    encodeStaticFixedSizedArray_longTermCfoMetric_t_8(msg.longTermCfoMetricOfAnt, buf, off + 68);
    UlDataencodeeCpriPucchFcpAllocConf_t(msg.eCpriPucchFcpAllocConf, buf, off + 132);
}
function UlDatadecodepucchReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.staticLongPucchConfigEcpri = UlDatadecodestaticLongPucchConfigEcpri_t(offset + 8);
    result.pucchAreaBoundaries = UlDatadecodepucchAreaBoundaries_t(offset + 56);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_252(offset + 128);

    return result;
}
function UlDataencodepucchReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    UlDataencodestaticLongPucchConfigEcpri_t(msg.staticLongPucchConfigEcpri, buf, off + 8);
    UlDataencodepucchAreaBoundaries_t(msg.pucchAreaBoundaries, buf, off + 56);
    encodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_252(msg.pucchResources, buf, off + 128);
}
function UlDatadecodepucchReceiveReqPucchResource_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 3);
/*    if (!(result.numOfLayers === [object Object] || result.numOfLayers === [object Object]))
        throw new Error(`Value ${result.numOfLayers} is out of range for enum 'numOfPucchLayers_t'`); */
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 4);
/*    if (!(result.numOfAntennaPorts === [object Object] || result.numOfAntennaPorts === [object Object]))
        throw new Error(`Value ${result.numOfAntennaPorts} is out of range for enum 'numOfPucchTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 5);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 6);
    result.numOfPrb = l2l1_getU8(offset + 8);
    result.rachStatus = l2l1_getU8(offset + 9);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 10);
    result.dataScramblingInt = l2l1_getU16(offset + 12);
    result.srBitDetection = l2l1_getU8(offset + 14);
/*    if (!(result.srBitDetection === [object Object] || result.srBitDetection === [object Object] || result.srBitDetection === [object Object]))
        throw new Error(`Value ${result.srBitDetection} is out of range for enum 'srBitDetection_t'`); */
    Object.defineProperty(result, "__enum_srBitDetection", {
        enumerable: false,
        writable: false,
        value: "l1_common_srBitDetection_t",
    });
    result.nANPucch = l2l1_getU8(offset + 15);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 16);
    result.numOfSymbols = l2l1_getU8(offset + 17);
    result.firstSymbol = l2l1_getU8(offset + 18);
    result.frequencyHopping = l2l1_getU8(offset + 19);
/*    if (!(result.frequencyHopping === [object Object] || result.frequencyHopping === [object Object]))
        throw new Error(`Value ${result.frequencyHopping} is out of range for enum 'frequencyHopping_t'`); */
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "l1_common_frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 20);
    result.initialCyclicShift = l2l1_getU8(offset + 22);
    result.additionalDmrs = l2l1_getU8(offset + 23);
/*    if (!(result.additionalDmrs === [object Object] || result.additionalDmrs === [object Object]))
        throw new Error(`Value ${result.additionalDmrs} is out of range for enum 'pucchAdditionalDmrs_t'`); */
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 24);
    result.numCeAxCIndex = l2l1_getU8(offset + 25);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 28);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 36);
    result.modulationType = l2l1_getU8(offset + 44);
/*    if (!(result.modulationType === [object Object] || result.modulationType === [object Object]))
        throw new Error(`Value ${result.modulationType} is out of range for enum 'pucchModulationType_t'`); */
    Object.defineProperty(result, "__enum_modulationType", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchModulationType_t",
    });
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 48);
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 56);
    result.eCpriSectionId = decodeStaticFixedSizedArray_uint16_2(offset + 64);
    result.longTermCfoMetricOfAnt = decodeStaticFixedSizedArray_longTermCfoMetric_t_8(offset + 68);
    result.eCpriPucchFcpAllocConf = UlDatadecodeeCpriPucchFcpAllocConf_t(offset + 132);

    return result;
}
function UlDataencodepucchReceiveReqPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.numOfLayers, buf, off + 3);
    l2l1_putU8(msg.numOfAntennaPorts, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 5);
    l2l1_putU16(msg.startPrb, buf, off + 6);
    l2l1_putU8(msg.numOfPrb, buf, off + 8);
    l2l1_putU8(msg.rachStatus, buf, off + 9);
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
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 28);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 36);
    l2l1_putU8(msg.modulationType, buf, off + 44);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 48);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 56);
    encodeStaticFixedSizedArray_uint16_2(msg.eCpriSectionId, buf, off + 64);
    encodeStaticFixedSizedArray_longTermCfoMetric_t_8(msg.longTermCfoMetricOfAnt, buf, off + 68);
    UlDataencodeeCpriPucchFcpAllocConf_t(msg.eCpriPucchFcpAllocConf, buf, off + 132);
}
function UlDatadecodeeCpriPucchFcpAllocConf_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);
    result.secondHopStartPrbc = l2l1_getU16(offset + 4);
    result.secondHopNumPrbc = l2l1_getU16(offset + 6);

    return result;
}
function UlDataencodeeCpriPucchFcpAllocConf_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
    l2l1_putU16(msg.secondHopStartPrbc, buf, off + 4);
    l2l1_putU16(msg.secondHopNumPrbc, buf, off + 6);
}
function UlDatadecodestaticLongPucchConfigEcpri_t(offset) {
    let result = {};

    result.eCpriPucchResourceAllocationLowerDedicated = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 0);
    result.eCpriPucchResourceAllocationUpperDedicated = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 6);
    result.eCpriPucchResourceAllocationLowerCommon = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 12);
    result.eCpriPucchResourceAllocationUpperCommon = UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset + 18);
    result.numCeAxCIndex = l2l1_getU8(offset + 24);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 28);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 36);
    result.startSymbol = l2l1_getU8(offset + 44);
/*    if (!(result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'longPucchStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_longPucchStartSymbol_t",
    });
    result.numSymbols = l2l1_getU8(offset + 45);
/*    if (!(result.numSymbols === [object Object]))
        throw new Error(`Value ${result.numSymbols} is out of range for enum 'numOfLongPucchSymbols_t'`); */
    Object.defineProperty(result, "__enum_numSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfLongPucchSymbols_t",
    });

    return result;
}
function UlDataencodestaticLongPucchConfigEcpri_t(msg, buf, off) {
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerDedicated, buf, off + 0);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperDedicated, buf, off + 6);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationLowerCommon, buf, off + 12);
    UlDataencodeeCpriPucchResourceAllocationStructure_t(msg.eCpriPucchResourceAllocationUpperCommon, buf, off + 18);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 24);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 28);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 36);
    l2l1_putU8(msg.startSymbol, buf, off + 44);
    l2l1_putU8(msg.numSymbols, buf, off + 45);
}
function UlDatadecodeeCpriPucchResourceAllocationStructure_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numPrb = l2l1_getU16(offset + 2);
    result.eCpriSectionId = l2l1_getU16(offset + 4);

    return result;
}
function UlDataencodeeCpriPucchResourceAllocationStructure_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numPrb, buf, off + 2);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 4);
}
function UlDatadecodepucchAreaBoundaries_t(offset) {
    let result = {};

    result.numPucchBoundaries = l2l1_getU8(offset + 0);
    result.pucchBoundary = decodeStaticFixedSizedArray_pucchBoundary_t_8(offset + 4);
    result.eCpriConfig = UlDatadecodeeCpriConfigPucch_t(offset + 52);

    return result;
}
function UlDataencodepucchAreaBoundaries_t(msg, buf, off) {
    l2l1_putU8(msg.numPucchBoundaries, buf, off + 0);
    encodeStaticFixedSizedArray_pucchBoundary_t_8(msg.pucchBoundary, buf, off + 4);
    UlDataencodeeCpriConfigPucch_t(msg.eCpriConfig, buf, off + 52);
}
function UlDatadecodepucchBoundary_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numOfPrb = l2l1_getU16(offset + 2);
    result.startSymbol = l2l1_getU8(offset + 4);
    result.numOfSymbol = l2l1_getU8(offset + 5);

    return result;
}
function UlDataencodepucchBoundary_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numOfPrb, buf, off + 2);
    l2l1_putU8(msg.startSymbol, buf, off + 4);
    l2l1_putU8(msg.numOfSymbol, buf, off + 5);
}
function UlDatadecodeeCpriConfigPucch_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);

    return result;
}
function UlDataencodeeCpriConfigPucch_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
}
function UlDatadecodePucchReceiveReq_t(offset) {
    let result = {};

    result.addrPucchReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPucchReceiveRespHarqD = l2l1_getU32(offset + 4);
    result.sfn = l2l1_getU16(offset + 8);
    result.slot = l2l1_getU8(offset + 10);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_1(offset + 12);

    return result;
}
function UlDataencodePucchReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPucchReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPucchReceiveRespHarqD, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 8);
    l2l1_putU8(msg.slot, buf, off + 10);
    encodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_1(msg.subcells, buf, off + 12);
}
function l1_commondecodeshortTermCfoMetric_t(offset) {
    let result = {};

    result.I = l2l1_getF32(offset + 0);
    result.Q = l2l1_getF32(offset + 4);

    return result;
}
function l1_commonencodeshortTermCfoMetric_t(msg, buf, off) {
    l2l1_putF32(msg.I, buf, off + 0);
    l2l1_putF32(msg.Q, buf, off + 4);
}
function UlDatadecodeextendedParameters_t(offset) {
    let result = {};

    result.shortTermCfoMetricOfAnt = decodeStaticFixedSizedArray_shortTermCfoMetric_t_8(offset + 0);

    return result;
}
function UlDataencodeextendedParameters_t(msg, buf, off) {
    encodeStaticFixedSizedArray_shortTermCfoMetric_t_8(msg.shortTermCfoMetricOfAnt, buf, off + 0);
}
function UlDatadecodepucchReceiveRespPsPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.secondHopPrb = l2l1_getU16(offset + 2);
    result.numOfPrb = l2l1_getU8(offset + 4);
    result.initialCyclicShift = l2l1_getU8(offset + 5);
    result.rnti = l2l1_getU16(offset + 6);
    result.crc = l2l1_getU8(offset + 8);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 9);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 10);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 11);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 12);
    result.rachStatus = l2l1_getU8(offset + 14);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 16);
    result.rxPower = l2l1_getF32(offset + 20);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 24);
    result.uciBits = decodeStaticFixedSizedArray_uint8_8(offset + 32);
    result.srBit = l2l1_getU8(offset + 40);
/*    if (!(result.srBit === [object Object] || result.srBit === [object Object] || result.srBit === [object Object]))
        throw new Error(`Value ${result.srBit} is out of range for enum 'bitValue_t'`); */
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "l1_common_bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 44);
    result.rssi = l2l1_getF32(offset + 48);
    result.dtxMetric = l2l1_getU32(offset + 52);
    result.dtxThreshold = l2l1_getU32(offset + 56);
    result.shortTermCfoMetric = l1_commondecodeshortTermCfoMetric_t(offset + 60);
    result.extendedParameters = decodeDynamicVariableSizedArray_extendedParameters_t_1(offset + 68);

    return result;
}
function UlDataencodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.secondHopPrb, buf, off + 2);
    l2l1_putU8(msg.numOfPrb, buf, off + 4);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 5);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU8(msg.crc, buf, off + 8);
    l2l1_putU8(msg.dtx, buf, off + 9);
    l2l1_putU8(msg.pucchFormat, buf, off + 10);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 11);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 12);
    l2l1_putU8(msg.rachStatus, buf, off + 14);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 16);
    l2l1_putF32(msg.rxPower, buf, off + 20);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 24);
    encodeStaticFixedSizedArray_uint8_8(msg.uciBits, buf, off + 32);
    l2l1_putU8(msg.srBit, buf, off + 40);
    l2l1_putF32(msg.noisePower, buf, off + 44);
    l2l1_putF32(msg.rssi, buf, off + 48);
    l2l1_putU32(msg.dtxMetric, buf, off + 52);
    l2l1_putU32(msg.dtxThreshold, buf, off + 56);
    l1_commonencodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 60);
    encodeDynamicVariableSizedArray_extendedParameters_t_1(msg.extendedParameters, buf, off + 68);
}
function UlDatadecodepucchReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePerPrb = decodeDynamicVariableSizedArray_uint32_273(offset + 4);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_252(offset + 12);

    return result;
}
function UlDataencodepucchReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_uint32_273(msg.noisePerPrb, buf, off + 4);
    encodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_252(msg.pucchResources, buf, off + 12);
}
function UlDatadecodepucchReceiveRespPsPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.secondHopPrb = l2l1_getU16(offset + 2);
    result.numOfPrb = l2l1_getU8(offset + 4);
    result.initialCyclicShift = l2l1_getU8(offset + 5);
    result.rnti = l2l1_getU16(offset + 6);
    result.crc = l2l1_getU8(offset + 8);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 9);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 10);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 11);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 12);
    result.rachStatus = l2l1_getU8(offset + 14);
/*    if (!(result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object] || result.rachStatus === [object Object]))
        throw new Error(`Value ${result.rachStatus} is out of range for enum 'rachStatus_t'`); */
    Object.defineProperty(result, "__enum_rachStatus", {
        enumerable: false,
        writable: false,
        value: "l1_common_rachStatus_t",
    });
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 16);
    result.rxPower = l2l1_getF32(offset + 20);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 24);
    result.uciBits = decodeStaticFixedSizedArray_uint8_8(offset + 32);
    result.srBit = l2l1_getU8(offset + 40);
/*    if (!(result.srBit === [object Object] || result.srBit === [object Object] || result.srBit === [object Object]))
        throw new Error(`Value ${result.srBit} is out of range for enum 'bitValue_t'`); */
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "l1_common_bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 44);
    result.rssi = l2l1_getF32(offset + 48);
    result.dtxMetric = l2l1_getU32(offset + 52);
    result.dtxThreshold = l2l1_getU32(offset + 56);
    result.shortTermCfoMetric = l1_commondecodeshortTermCfoMetric_t(offset + 60);
    result.extendedParameters = decodeDynamicVariableSizedArray_extendedParameters_t_1(offset + 68);

    return result;
}
function UlDataencodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.secondHopPrb, buf, off + 2);
    l2l1_putU8(msg.numOfPrb, buf, off + 4);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 5);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putU8(msg.crc, buf, off + 8);
    l2l1_putU8(msg.dtx, buf, off + 9);
    l2l1_putU8(msg.pucchFormat, buf, off + 10);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 11);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 12);
    l2l1_putU8(msg.rachStatus, buf, off + 14);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 16);
    l2l1_putF32(msg.rxPower, buf, off + 20);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 24);
    encodeStaticFixedSizedArray_uint8_8(msg.uciBits, buf, off + 32);
    l2l1_putU8(msg.srBit, buf, off + 40);
    l2l1_putF32(msg.noisePower, buf, off + 44);
    l2l1_putF32(msg.rssi, buf, off + 48);
    l2l1_putU32(msg.dtxMetric, buf, off + 52);
    l2l1_putU32(msg.dtxThreshold, buf, off + 56);
    l1_commonencodeshortTermCfoMetric_t(msg.shortTermCfoMetric, buf, off + 60);
    encodeDynamicVariableSizedArray_extendedParameters_t_1(msg.extendedParameters, buf, off + 68);
}
function UlDatadecodeextendedParameters_t(offset) {
    let result = {};

    result.shortTermCfoMetricOfAnt = decodeStaticFixedSizedArray_shortTermCfoMetric_t_8(offset + 0);

    return result;
}
function UlDataencodeextendedParameters_t(msg, buf, off) {
    encodeStaticFixedSizedArray_shortTermCfoMetric_t_8(msg.shortTermCfoMetricOfAnt, buf, off + 0);
}
function UlDatadecodePucchReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.bcn_reservation_for_debug = l2l1_getU8(offset + 7);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_1(offset + 8);

    return result;
}
function UlDataencodePucchReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    l2l1_putU8(msg.bcn_reservation_for_debug, buf, off + 7);
    encodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_1(msg.subcells, buf, off + 8);
}
function UlDatadecodepucchReceiveRespHarqDPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 3);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.ackNack = decodeStaticFixedSizedArray_uint8_7(offset + 8);
    result.dtxMetric = l2l1_getU16(offset + 12);
    result.dtxThreshold = l2l1_getU16(offset + 14);
    result.rnti = l2l1_getU16(offset + 16);
    result.crc = l2l1_getU8(offset + 18);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 20);

    return result;
}
function UlDataencodepucchReceiveRespHarqDPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 3);
    l2l1_putU8(msg.dtx, buf, off + 4);
    encodeStaticFixedSizedArray_uint8_7(msg.ackNack, buf, off + 8);
    l2l1_putU16(msg.dtxMetric, buf, off + 12);
    l2l1_putU16(msg.dtxThreshold, buf, off + 14);
    l2l1_putU16(msg.rnti, buf, off + 16);
    l2l1_putU8(msg.crc, buf, off + 18);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 20);
}
function UlDatadecodepucchReceiveRespHarqDSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_252(offset + 4);

    return result;
}
function UlDataencodepucchReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_252(msg.pucchResources, buf, off + 4);
}
function UlDatadecodepucchReceiveRespHarqDPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.pucchFormat = l2l1_getU8(offset + 2);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 3);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.ackNack = decodeStaticFixedSizedArray_uint8_7(offset + 8);
    result.dtxMetric = l2l1_getU16(offset + 12);
    result.dtxThreshold = l2l1_getU16(offset + 14);
    result.rnti = l2l1_getU16(offset + 16);
    result.crc = l2l1_getU8(offset + 18);
/*    if (!(result.crc === [object Object] || result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.l2CtxtAnMgt = decodeStaticFixedSizedArray_uint8_8(offset + 20);

    return result;
}
function UlDataencodepucchReceiveRespHarqDPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU8(msg.pucchFormat, buf, off + 2);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 3);
    l2l1_putU8(msg.dtx, buf, off + 4);
    encodeStaticFixedSizedArray_uint8_7(msg.ackNack, buf, off + 8);
    l2l1_putU16(msg.dtxMetric, buf, off + 12);
    l2l1_putU16(msg.dtxThreshold, buf, off + 14);
    l2l1_putU16(msg.rnti, buf, off + 16);
    l2l1_putU8(msg.crc, buf, off + 18);
    encodeStaticFixedSizedArray_uint8_8(msg.l2CtxtAnMgt, buf, off + 20);
}
function UlDatadecodePucchReceiveRespHarqD_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_1(offset + 8);

    return result;
}
function UlDataencodePucchReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    encodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_1(msg.subcells, buf, off + 8);
}
function UlDatadecodeprachReceiveReqOccasion_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);
    result.eCpriSectionId = l2l1_getU16(offset + 12);

    return result;
}
function UlDataencodeprachReceiveReqOccasion_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 12);
}
function UlDatadecodeprachReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.prachPrbOffset = l2l1_getU16(offset + 6);
    result.prachOccasions = decodeStaticFixedSizedArray_uint16_8(offset + 8);
    result.occasions = decodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(offset + 24);

    return result;
}
function UlDataencodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 6);
    encodeStaticFixedSizedArray_uint16_8(msg.prachOccasions, buf, off + 8);
    encodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(msg.occasions, buf, off + 24);
}
function UlDatadecodePrachReceiveReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_prachReceiveReqSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePrachReceiveReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_prachReceiveReqSubcell_t_4(msg.subcells, buf, off + 4);
}
function UlDatadecodeprachReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.processInRealTime = l2l1_getU8(offset + 1);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);
    result.prachPrbOffset = l2l1_getU16(offset + 6);
    result.prachOccasions = decodeStaticFixedSizedArray_uint16_8(offset + 8);
    result.occasions = decodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(offset + 24);

    return result;
}
function UlDataencodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.processInRealTime, buf, off + 1);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 6);
    encodeStaticFixedSizedArray_uint16_8(msg.prachOccasions, buf, off + 8);
    encodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(msg.occasions, buf, off + 24);
}
function UlDatadecodeprachReceiveReqOccasion_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);
    result.eCpriSectionId = l2l1_getU16(offset + 12);

    return result;
}
function UlDataencodeprachReceiveReqOccasion_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 12);
}
function UlDatadecodeeCpriSrsFcpAllocConf_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeeCpriSrsFcpAllocConf_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
}
function UlDatadecodesrsReceiveReqUes_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 2);
    result.transmissionComb = l2l1_getU8(offset + 3);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 4);
    result.srsBandwidth = l2l1_getU8(offset + 5);
    result.srsBandwidthConfig = l2l1_getU8(offset + 6);
    result.freqDomainPosition = l2l1_getU8(offset + 7);
    result.freqDomainShift = l2l1_getU16(offset + 8);
    result.cyclicShift = l2l1_getU8(offset + 10);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);
    result.eCpriSectionId = l2l1_getU16(offset + 20);
    result.numRbgPerSubband = l2l1_getU8(offset + 22);
    result.numOfSrsPorts = l2l1_getU8(offset + 23);
/*    if (!(result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object]))
        throw new Error(`Value ${result.numOfSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.startPrb = l2l1_getU16(offset + 24);
    result.puschTransCoherence = l2l1_getU8(offset + 26);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 27);
    result.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32(offset + 28);
    result.legacySRS = l2l1_getU8(offset + 32);
    result.numCeAxCIndex = l2l1_getU8(offset + 33);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 36);
    result.eCpriSrsFcpAllocConf = UlDatadecodeeCpriSrsFcpAllocConf_t(offset + 44);

    return result;
}
function UlDataencodesrsReceiveReqUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 2);
    l2l1_putU8(msg.transmissionComb, buf, off + 3);
    l2l1_putU8(msg.transmissionCombId, buf, off + 4);
    l2l1_putU8(msg.srsBandwidth, buf, off + 5);
    l2l1_putU8(msg.srsBandwidthConfig, buf, off + 6);
    l2l1_putU8(msg.freqDomainPosition, buf, off + 7);
    l2l1_putU16(msg.freqDomainShift, buf, off + 8);
    l2l1_putU8(msg.cyclicShift, buf, off + 10);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 20);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 22);
    l2l1_putU8(msg.numOfSrsPorts, buf, off + 23);
    l2l1_putU16(msg.startPrb, buf, off + 24);
    l2l1_putU8(msg.puschTransCoherence, buf, off + 26);
    l2l1_putU8(msg.fullPowerPuschPowerScalingRatio, buf, off + 27);
    l2l1_putF32(msg.powerOffsetSrsToPuschPerAllocatedRe, buf, off + 28);
    l2l1_putU8(msg.legacySRS, buf, off + 32);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 33);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 36);
    UlDataencodeeCpriSrsFcpAllocConf_t(msg.eCpriSrsFcpAllocConf, buf, off + 44);
}
function UlDatadecodesrsSuMimoStruct_t(offset) {
    let result = {};

    result.processInRealTime = l2l1_getU8(offset + 0);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.sequenceId = l2l1_getU16(offset + 6);
    result.srsReceiveReqUes = decodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(offset + 8);

    return result;
}
function UlDataencodesrsSuMimoStruct_t(msg, buf, off) {
    l2l1_putU8(msg.processInRealTime, buf, off + 0);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU16(msg.sequenceId, buf, off + 6);
    encodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(msg.srsReceiveReqUes, buf, off + 8);
}
function UlDatadecodesrsBmCsInfo_t(offset) {
    let result = {};

    result.bmCyclicShift = l2l1_getU8(offset + 0);
    result.srsResourceIdentity = l2l1_getU8(offset + 1);
    result.rnti = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodesrsBmCsInfo_t(msg, buf, off) {
    l2l1_putU8(msg.bmCyclicShift, buf, off + 0);
    l2l1_putU8(msg.srsResourceIdentity, buf, off + 1);
    l2l1_putU16(msg.rnti, buf, off + 2);
}
function UlDatadecodesrsBmCombShiftPairs_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShiftList = decodeDynamicVariableSizedArray_srsBmCsInfo_t_4(offset + 4);

    return result;
}
function UlDataencodesrsBmCombShiftPairs_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    encodeDynamicVariableSizedArray_srsBmCsInfo_t_4(msg.bmCyclicShiftList, buf, off + 4);
}
function UlDatadecodesrsBmSubbands_t(offset) {
    let result = {};

    result.srsBmCombsShifts = decodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(offset + 0);
    result.srsBmSubbandId = l2l1_getU8(offset + 8);
    result.startPrb = l2l1_getU16(offset + 10);

    return result;
}
function UlDataencodesrsBmSubbands_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(msg.srsBmCombsShifts, buf, off + 0);
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 8);
    l2l1_putU16(msg.startPrb, buf, off + 10);
}
function UlDatadecodesrsBmStruct_t(offset) {
    let result = {};

    result.symbolPosition = l2l1_getU8(offset + 0);
    result.transmissionComb = l2l1_getU8(offset + 1);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.sequenceId = l2l1_getU16(offset + 2);
    result.numRbgPerSubband = l2l1_getU8(offset + 4);
    result.bmSubbands = decodeDynamicVariableSizedArray_srsBmSubbands_t_68(offset + 8);

    return result;
}
function UlDataencodesrsBmStruct_t(msg, buf, off) {
    l2l1_putU8(msg.symbolPosition, buf, off + 0);
    l2l1_putU8(msg.transmissionComb, buf, off + 1);
    l2l1_putU16(msg.sequenceId, buf, off + 2);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 4);
    encodeDynamicVariableSizedArray_srsBmSubbands_t_68(msg.bmSubbands, buf, off + 8);
}
function UlDatadecodesrsCyclicShifts_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.cyclicShift = l2l1_getU8(offset + 1);
    result.portIndex = l2l1_getU8(offset + 2);

    return result;
}
function UlDataencodesrsCyclicShifts_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    l2l1_putU8(msg.cyclicShift, buf, off + 1);
    l2l1_putU8(msg.portIndex, buf, off + 2);
}
function UlDatadecodesrsBwvReportRequest_t(offset) {
    let result = {};

    result.bwvReportId = l2l1_getU16(offset + 0);
    result.numBwvPerSubband = l2l1_getU8(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 3);
    result.operation = l2l1_getU16(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.sinr = l2l1_getF32(offset + 8);
    result.numSrsPorts = l2l1_getU8(offset + 12);
/*    if (!(result.numSrsPorts === [object Object] || result.numSrsPorts === [object Object] || result.numSrsPorts === [object Object]))
        throw new Error(`Value ${result.numSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.startPatternId = l2l1_getU16(offset + 14);
    result.numPatternId = l2l1_getU16(offset + 16);
    result.startPrb = l2l1_getU16(offset + 18);
    result.numRbgPerSubband = l2l1_getU8(offset + 20);
    result.srsCyclicShifts = decodeDynamicVariableSizedArray_srsCyclicShifts_t_4(offset + 24);

    return result;
}
function UlDataencodesrsBwvReportRequest_t(msg, buf, off) {
    l2l1_putU16(msg.bwvReportId, buf, off + 0);
    l2l1_putU8(msg.numBwvPerSubband, buf, off + 2);
    l2l1_putU8(msg.symbolPosition, buf, off + 3);
    l2l1_putU16(msg.operation, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putF32(msg.sinr, buf, off + 8);
    l2l1_putU8(msg.numSrsPorts, buf, off + 12);
    l2l1_putU16(msg.startPatternId, buf, off + 14);
    l2l1_putU16(msg.numPatternId, buf, off + 16);
    l2l1_putU16(msg.startPrb, buf, off + 18);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 20);
    encodeDynamicVariableSizedArray_srsCyclicShifts_t_4(msg.srsCyclicShifts, buf, off + 24);
}
function UlDatadecodesrsBwvStruct_t(offset) {
    let result = {};

    result.transmissionComb = l2l1_getU8(offset + 0);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.sequenceId = l2l1_getU16(offset + 2);
    result.srsBwvReportRequests = decodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(offset + 4);

    return result;
}
function UlDataencodesrsBwvStruct_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionComb, buf, off + 0);
    l2l1_putU16(msg.sequenceId, buf, off + 2);
    encodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(msg.srsBwvReportRequests, buf, off + 4);
}
function UlDatadecodesrsReceiveReqSubcell_t(offset) {
    let result = {};

    result.msgCountCtrl = l2l1_getU8(offset + 0);
    result.subcellId = l2l1_getU8(offset + 1);
    result.srsSuMimoEnable = l2l1_getU8(offset + 2);
    result.srsBmEnable = l2l1_getU8(offset + 3);
    result.srsBwvEnable = l2l1_getU8(offset + 4);
    result.srsSuMimoStruct = UlDatadecodesrsSuMimoStruct_t(offset + 8);
    result.srsBmStruct = UlDatadecodesrsBmStruct_t(offset + 24);
    result.srsBwvStruct = UlDatadecodesrsBwvStruct_t(offset + 40);

    return result;
}
function UlDataencodesrsReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.msgCountCtrl, buf, off + 0);
    l2l1_putU8(msg.subcellId, buf, off + 1);
    l2l1_putU8(msg.srsSuMimoEnable, buf, off + 2);
    l2l1_putU8(msg.srsBmEnable, buf, off + 3);
    l2l1_putU8(msg.srsBwvEnable, buf, off + 4);
    UlDataencodesrsSuMimoStruct_t(msg.srsSuMimoStruct, buf, off + 8);
    UlDataencodesrsBmStruct_t(msg.srsBmStruct, buf, off + 24);
    UlDataencodesrsBwvStruct_t(msg.srsBwvStruct, buf, off + 40);
}
function UlDatadecodeSrsReceiveReq_t(offset) {
    let result = {};

    result.addrSrsReceiveResp = l2l1_getU32(offset + 0);
    result.addrSrsReceiveRespBm = l2l1_getU32(offset + 4);
    result.addrSrsReceiveRespBwv = l2l1_getU32(offset + 8);
    result.sfn = l2l1_getU16(offset + 12);
    result.slot = l2l1_getU8(offset + 14);
    result.subcells = decodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(offset + 16);

    return result;
}
function UlDataencodeSrsReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrSrsReceiveResp, buf, off + 0);
    l2l1_putU32(msg.addrSrsReceiveRespBm, buf, off + 4);
    l2l1_putU32(msg.addrSrsReceiveRespBwv, buf, off + 8);
    l2l1_putU16(msg.sfn, buf, off + 12);
    l2l1_putU8(msg.slot, buf, off + 14);
    encodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(msg.subcells, buf, off + 16);
}
function UlDatadecodesrsReceiveReqSubcell_t(offset) {
    let result = {};

    result.msgCountCtrl = l2l1_getU8(offset + 0);
    result.subcellId = l2l1_getU8(offset + 1);
    result.srsSuMimoEnable = l2l1_getU8(offset + 2);
    result.srsBmEnable = l2l1_getU8(offset + 3);
    result.srsBwvEnable = l2l1_getU8(offset + 4);
    result.srsSuMimoStruct = UlDatadecodesrsSuMimoStruct_t(offset + 8);
    result.srsBmStruct = UlDatadecodesrsBmStruct_t(offset + 24);
    result.srsBwvStruct = UlDatadecodesrsBwvStruct_t(offset + 40);

    return result;
}
function UlDataencodesrsReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.msgCountCtrl, buf, off + 0);
    l2l1_putU8(msg.subcellId, buf, off + 1);
    l2l1_putU8(msg.srsSuMimoEnable, buf, off + 2);
    l2l1_putU8(msg.srsBmEnable, buf, off + 3);
    l2l1_putU8(msg.srsBwvEnable, buf, off + 4);
    UlDataencodesrsSuMimoStruct_t(msg.srsSuMimoStruct, buf, off + 8);
    UlDataencodesrsBmStruct_t(msg.srsBmStruct, buf, off + 24);
    UlDataencodesrsBwvStruct_t(msg.srsBwvStruct, buf, off + 40);
}
function UlDatadecodesrsSuMimoStruct_t(offset) {
    let result = {};

    result.processInRealTime = l2l1_getU8(offset + 0);
    result.sfnForProcessing = l2l1_getU16(offset + 2);
    result.slotForProcessing = l2l1_getU8(offset + 4);
    result.sequenceId = l2l1_getU16(offset + 6);
    result.srsReceiveReqUes = decodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(offset + 8);

    return result;
}
function UlDataencodesrsSuMimoStruct_t(msg, buf, off) {
    l2l1_putU8(msg.processInRealTime, buf, off + 0);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 2);
    l2l1_putU8(msg.slotForProcessing, buf, off + 4);
    l2l1_putU16(msg.sequenceId, buf, off + 6);
    encodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(msg.srsReceiveReqUes, buf, off + 8);
}
function UlDatadecodesrsReceiveReqUes_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 2);
    result.transmissionComb = l2l1_getU8(offset + 3);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 4);
    result.srsBandwidth = l2l1_getU8(offset + 5);
    result.srsBandwidthConfig = l2l1_getU8(offset + 6);
    result.freqDomainPosition = l2l1_getU8(offset + 7);
    result.freqDomainShift = l2l1_getU16(offset + 8);
    result.cyclicShift = l2l1_getU8(offset + 10);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 12);
    result.eCpriSectionId = l2l1_getU16(offset + 20);
    result.numRbgPerSubband = l2l1_getU8(offset + 22);
    result.numOfSrsPorts = l2l1_getU8(offset + 23);
/*    if (!(result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object]))
        throw new Error(`Value ${result.numOfSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.startPrb = l2l1_getU16(offset + 24);
    result.puschTransCoherence = l2l1_getU8(offset + 26);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });
    result.fullPowerPuschPowerScalingRatio = l2l1_getU8(offset + 27);
    result.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32(offset + 28);
    result.legacySRS = l2l1_getU8(offset + 32);
    result.numCeAxCIndex = l2l1_getU8(offset + 33);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_8(offset + 36);
    result.eCpriSrsFcpAllocConf = UlDatadecodeeCpriSrsFcpAllocConf_t(offset + 44);

    return result;
}
function UlDataencodesrsReceiveReqUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 2);
    l2l1_putU8(msg.transmissionComb, buf, off + 3);
    l2l1_putU8(msg.transmissionCombId, buf, off + 4);
    l2l1_putU8(msg.srsBandwidth, buf, off + 5);
    l2l1_putU8(msg.srsBandwidthConfig, buf, off + 6);
    l2l1_putU8(msg.freqDomainPosition, buf, off + 7);
    l2l1_putU16(msg.freqDomainShift, buf, off + 8);
    l2l1_putU8(msg.cyclicShift, buf, off + 10);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 12);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 20);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 22);
    l2l1_putU8(msg.numOfSrsPorts, buf, off + 23);
    l2l1_putU16(msg.startPrb, buf, off + 24);
    l2l1_putU8(msg.puschTransCoherence, buf, off + 26);
    l2l1_putU8(msg.fullPowerPuschPowerScalingRatio, buf, off + 27);
    l2l1_putF32(msg.powerOffsetSrsToPuschPerAllocatedRe, buf, off + 28);
    l2l1_putU8(msg.legacySRS, buf, off + 32);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 33);
    encodeStaticFixedSizedArray_uint8_8(msg.ceAxCIndex, buf, off + 36);
    UlDataencodeeCpriSrsFcpAllocConf_t(msg.eCpriSrsFcpAllocConf, buf, off + 44);
}
function UlDatadecodeeCpriSrsFcpAllocConf_t(offset) {
    let result = {};

    result.fcpStartPrbc = l2l1_getU16(offset + 0);
    result.fcpNumPrbc = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeeCpriSrsFcpAllocConf_t(msg, buf, off) {
    l2l1_putU16(msg.fcpStartPrbc, buf, off + 0);
    l2l1_putU16(msg.fcpNumPrbc, buf, off + 2);
}
function UlDatadecodesrsBmStruct_t(offset) {
    let result = {};

    result.symbolPosition = l2l1_getU8(offset + 0);
    result.transmissionComb = l2l1_getU8(offset + 1);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.sequenceId = l2l1_getU16(offset + 2);
    result.numRbgPerSubband = l2l1_getU8(offset + 4);
    result.bmSubbands = decodeDynamicVariableSizedArray_srsBmSubbands_t_68(offset + 8);

    return result;
}
function UlDataencodesrsBmStruct_t(msg, buf, off) {
    l2l1_putU8(msg.symbolPosition, buf, off + 0);
    l2l1_putU8(msg.transmissionComb, buf, off + 1);
    l2l1_putU16(msg.sequenceId, buf, off + 2);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 4);
    encodeDynamicVariableSizedArray_srsBmSubbands_t_68(msg.bmSubbands, buf, off + 8);
}
function UlDatadecodesrsBmSubbands_t(offset) {
    let result = {};

    result.srsBmCombsShifts = decodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(offset + 0);
    result.srsBmSubbandId = l2l1_getU8(offset + 8);
    result.startPrb = l2l1_getU16(offset + 10);

    return result;
}
function UlDataencodesrsBmSubbands_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(msg.srsBmCombsShifts, buf, off + 0);
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 8);
    l2l1_putU16(msg.startPrb, buf, off + 10);
}
function UlDatadecodesrsBmCsInfo_t(offset) {
    let result = {};

    result.bmCyclicShift = l2l1_getU8(offset + 0);
    result.srsResourceIdentity = l2l1_getU8(offset + 1);
    result.rnti = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodesrsBmCsInfo_t(msg, buf, off) {
    l2l1_putU8(msg.bmCyclicShift, buf, off + 0);
    l2l1_putU8(msg.srsResourceIdentity, buf, off + 1);
    l2l1_putU16(msg.rnti, buf, off + 2);
}
function UlDatadecodesrsBmCombShiftPairs_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShiftList = decodeDynamicVariableSizedArray_srsBmCsInfo_t_4(offset + 4);

    return result;
}
function UlDataencodesrsBmCombShiftPairs_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    encodeDynamicVariableSizedArray_srsBmCsInfo_t_4(msg.bmCyclicShiftList, buf, off + 4);
}
function UlDatadecodesrsBwvStruct_t(offset) {
    let result = {};

    result.transmissionComb = l2l1_getU8(offset + 0);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.sequenceId = l2l1_getU16(offset + 2);
    result.srsBwvReportRequests = decodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(offset + 4);

    return result;
}
function UlDataencodesrsBwvStruct_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionComb, buf, off + 0);
    l2l1_putU16(msg.sequenceId, buf, off + 2);
    encodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(msg.srsBwvReportRequests, buf, off + 4);
}
function UlDatadecodesrsBwvReportRequest_t(offset) {
    let result = {};

    result.bwvReportId = l2l1_getU16(offset + 0);
    result.numBwvPerSubband = l2l1_getU8(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 3);
    result.operation = l2l1_getU16(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.sinr = l2l1_getF32(offset + 8);
    result.numSrsPorts = l2l1_getU8(offset + 12);
/*    if (!(result.numSrsPorts === [object Object] || result.numSrsPorts === [object Object] || result.numSrsPorts === [object Object]))
        throw new Error(`Value ${result.numSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.startPatternId = l2l1_getU16(offset + 14);
    result.numPatternId = l2l1_getU16(offset + 16);
    result.startPrb = l2l1_getU16(offset + 18);
    result.numRbgPerSubband = l2l1_getU8(offset + 20);
    result.srsCyclicShifts = decodeDynamicVariableSizedArray_srsCyclicShifts_t_4(offset + 24);

    return result;
}
function UlDataencodesrsBwvReportRequest_t(msg, buf, off) {
    l2l1_putU16(msg.bwvReportId, buf, off + 0);
    l2l1_putU8(msg.numBwvPerSubband, buf, off + 2);
    l2l1_putU8(msg.symbolPosition, buf, off + 3);
    l2l1_putU16(msg.operation, buf, off + 4);
    l2l1_putU16(msg.rnti, buf, off + 6);
    l2l1_putF32(msg.sinr, buf, off + 8);
    l2l1_putU8(msg.numSrsPorts, buf, off + 12);
    l2l1_putU16(msg.startPatternId, buf, off + 14);
    l2l1_putU16(msg.numPatternId, buf, off + 16);
    l2l1_putU16(msg.startPrb, buf, off + 18);
    l2l1_putU8(msg.numRbgPerSubband, buf, off + 20);
    encodeDynamicVariableSizedArray_srsCyclicShifts_t_4(msg.srsCyclicShifts, buf, off + 24);
}
function UlDatadecodesrsCyclicShifts_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.cyclicShift = l2l1_getU8(offset + 1);
    result.portIndex = l2l1_getU8(offset + 2);

    return result;
}
function UlDataencodesrsCyclicShifts_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    l2l1_putU8(msg.cyclicShift, buf, off + 1);
    l2l1_putU8(msg.portIndex, buf, off + 2);
}
function UlDatadecodesrsReceiveRespPsUes_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ulRank = l2l1_getU8(offset + 2);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 3);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 4);
    result.ulPmiRank2 = l2l1_getU8(offset + 8);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 12);
    result.snr = l2l1_getF32(offset + 20);
    result.dtx = l2l1_getU8(offset + 24);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 26);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 28);
    result.numOfSrsTxPorts = l2l1_getU8(offset + 32);
    result.rxPowerOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 36);
    result.sinrOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 68);
    result.shortTermTaMetricOfAnt = decodeStaticFixedSizedArray_int16_8(offset + 100);
    result.shortTermTaPeakAmpOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 116);

    return result;
}
function UlDataencodesrsReceiveRespPsUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ulRank, buf, off + 2);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 3);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 8);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 12);
    l2l1_putF32(msg.snr, buf, off + 20);
    l2l1_putU8(msg.dtx, buf, off + 24);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 26);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 28);
    l2l1_putU8(msg.numOfSrsTxPorts, buf, off + 32);
    encodeStaticFixedSizedArray_float32_8(msg.rxPowerOfAnt, buf, off + 36);
    encodeStaticFixedSizedArray_float32_8(msg.sinrOfAnt, buf, off + 68);
    encodeStaticFixedSizedArray_int16_8(msg.shortTermTaMetricOfAnt, buf, off + 100);
    encodeStaticFixedSizedArray_float32_8(msg.shortTermTaPeakAmpOfAnt, buf, off + 116);
}
function UlDatadecodesrsReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 1);
    result.srsReceiveRespPsUes = decodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(offset + 4);

    return result;
}
function UlDataencodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 1);
    encodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(msg.srsReceiveRespPsUes, buf, off + 4);
}
function UlDatadecodeSrsReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.processInRealTime = l2l1_getU8(offset + 3);
    result.sfnForProcessing = l2l1_getU16(offset + 4);
    result.slotForProcessing = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodeSrsReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.processInRealTime, buf, off + 3);
    l2l1_putU16(msg.sfnForProcessing, buf, off + 4);
    l2l1_putU8(msg.slotForProcessing, buf, off + 6);
    encodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(msg.subcells, buf, off + 8);
}
function UlDatadecodesrsReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.symbolPosition = l2l1_getU8(offset + 1);
    result.srsReceiveRespPsUes = decodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(offset + 4);

    return result;
}
function UlDataencodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.symbolPosition, buf, off + 1);
    encodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(msg.srsReceiveRespPsUes, buf, off + 4);
}
function UlDatadecodesrsReceiveRespPsUes_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.ulRank = l2l1_getU8(offset + 2);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 3);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 4);
    result.ulPmiRank2 = l2l1_getU8(offset + 8);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 12);
    result.snr = l2l1_getF32(offset + 20);
    result.dtx = l2l1_getU8(offset + 24);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 26);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 28);
    result.numOfSrsTxPorts = l2l1_getU8(offset + 32);
    result.rxPowerOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 36);
    result.sinrOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 68);
    result.shortTermTaMetricOfAnt = decodeStaticFixedSizedArray_int16_8(offset + 100);
    result.shortTermTaPeakAmpOfAnt = decodeStaticFixedSizedArray_float32_8(offset + 116);

    return result;
}
function UlDataencodesrsReceiveRespPsUes_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.ulRank, buf, off + 2);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 3);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 8);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 12);
    l2l1_putF32(msg.snr, buf, off + 20);
    l2l1_putU8(msg.dtx, buf, off + 24);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 26);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 28);
    l2l1_putU8(msg.numOfSrsTxPorts, buf, off + 32);
    encodeStaticFixedSizedArray_float32_8(msg.rxPowerOfAnt, buf, off + 36);
    encodeStaticFixedSizedArray_float32_8(msg.sinrOfAnt, buf, off + 68);
    encodeStaticFixedSizedArray_int16_8(msg.shortTermTaMetricOfAnt, buf, off + 100);
    encodeStaticFixedSizedArray_float32_8(msg.shortTermTaPeakAmpOfAnt, buf, off + 116);
}
function UlDatadecodecovarianceMatrixSrs_t(offset) {
    let result = {};

    result.covMatrixReal = l2l1_getI16(offset + 0);
    result.covMatrixImag = l2l1_getI16(offset + 2);

    return result;
}
function UlDataencodecovarianceMatrixSrs_t(msg, buf, off) {
    l2l1_putI16(msg.covMatrixReal, buf, off + 0);
    l2l1_putI16(msg.covMatrixImag, buf, off + 2);
}
function UlDatadecodedata_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShift = l2l1_getU8(offset + 1);
    result.rnti = l2l1_getU16(offset + 2);
    result.srsResourceIdentity = l2l1_getU8(offset + 4);
    result.scalingHorizontal = l2l1_getI8(offset + 5);
    result.scalingVertical = l2l1_getI8(offset + 6);
    result.covarianceMatrixHorizontal = decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(offset + 8);
    result.covarianceMatrixVertical = decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(offset + 16);

    return result;
}
function UlDataencodedata_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    l2l1_putU8(msg.bmCyclicShift, buf, off + 1);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.srsResourceIdentity, buf, off + 4);
    l2l1_putI8(msg.scalingHorizontal, buf, off + 5);
    l2l1_putI8(msg.scalingVertical, buf, off + 6);
    encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(msg.covarianceMatrixHorizontal, buf, off + 8);
    encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(msg.covarianceMatrixVertical, buf, off + 16);
}
function UlDatadecodesrsRespBmPsSubbands_t(offset) {
    let result = {};

    result.srsBmSubbandId = l2l1_getU8(offset + 0);
    result.data = decodeDynamicVariableSizedArray_data_t_8(offset + 4);
    result.PaddingBytes = decodeStaticFixedSizedArray_uint8_8(offset + 12);

    return result;
}
function UlDataencodesrsRespBmPsSubbands_t(msg, buf, off) {
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 0);
    encodeDynamicVariableSizedArray_data_t_8(msg.data, buf, off + 4);
    encodeStaticFixedSizedArray_uint8_8(msg.PaddingBytes, buf, off + 12);
}
function UlDatadecodeSrsReceiveRespBmPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.fragmentIndex = l2l1_getU8(offset + 3);
    result.totalFragmentNum = l2l1_getU8(offset + 4);
    result.polarization = l2l1_getU8(offset + 5);
    result.subcellId = l2l1_getU8(offset + 6);
    result.symbolPosition = l2l1_getU8(offset + 7);
    result.srsRespBmPsSubbands = decodeDynamicVariableSizedArray_srsRespBmPsSubbands_t_38(offset + 8);

    return result;
}
function UlDataencodeSrsReceiveRespBmPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.fragmentIndex, buf, off + 3);
    l2l1_putU8(msg.totalFragmentNum, buf, off + 4);
    l2l1_putU8(msg.polarization, buf, off + 5);
    l2l1_putU8(msg.subcellId, buf, off + 6);
    l2l1_putU8(msg.symbolPosition, buf, off + 7);
    encodeDynamicVariableSizedArray_srsRespBmPsSubbands_t_38(msg.srsRespBmPsSubbands, buf, off + 8);
}
function UlDatadecodesrsRespBmPsSubbands_t(offset) {
    let result = {};

    result.srsBmSubbandId = l2l1_getU8(offset + 0);
    result.data = decodeDynamicVariableSizedArray_data_t_8(offset + 4);
    result.PaddingBytes = decodeStaticFixedSizedArray_uint8_8(offset + 12);

    return result;
}
function UlDataencodesrsRespBmPsSubbands_t(msg, buf, off) {
    l2l1_putU8(msg.srsBmSubbandId, buf, off + 0);
    encodeDynamicVariableSizedArray_data_t_8(msg.data, buf, off + 4);
    encodeStaticFixedSizedArray_uint8_8(msg.PaddingBytes, buf, off + 12);
}
function UlDatadecodedata_t(offset) {
    let result = {};

    result.transmissionCombId = l2l1_getU8(offset + 0);
    result.bmCyclicShift = l2l1_getU8(offset + 1);
    result.rnti = l2l1_getU16(offset + 2);
    result.srsResourceIdentity = l2l1_getU8(offset + 4);
    result.scalingHorizontal = l2l1_getI8(offset + 5);
    result.scalingVertical = l2l1_getI8(offset + 6);
    result.covarianceMatrixHorizontal = decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(offset + 8);
    result.covarianceMatrixVertical = decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(offset + 16);

    return result;
}
function UlDataencodedata_t(msg, buf, off) {
    l2l1_putU8(msg.transmissionCombId, buf, off + 0);
    l2l1_putU8(msg.bmCyclicShift, buf, off + 1);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.srsResourceIdentity, buf, off + 4);
    l2l1_putI8(msg.scalingHorizontal, buf, off + 5);
    l2l1_putI8(msg.scalingVertical, buf, off + 6);
    encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(msg.covarianceMatrixHorizontal, buf, off + 8);
    encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(msg.covarianceMatrixVertical, buf, off + 16);
}
function UlDatadecodecovarianceMatrixSrs_t(offset) {
    let result = {};

    result.covMatrixReal = l2l1_getI16(offset + 0);
    result.covMatrixImag = l2l1_getI16(offset + 2);

    return result;
}
function UlDataencodecovarianceMatrixSrs_t(msg, buf, off) {
    l2l1_putI16(msg.covMatrixReal, buf, off + 0);
    l2l1_putI16(msg.covMatrixImag, buf, off + 2);
}
function l1_commondecodeFastAntennaSnapshotEventsList_t(offset) {
    let result = {};

    result.crnti = l2l1_getU16(offset + 0);
    result.eventNb = l2l1_getU8(offset + 2);
    result.eventType = l2l1_getU8(offset + 3);

    return result;
}
function l1_commonencodeFastAntennaSnapshotEventsList_t(msg, buf, off) {
    l2l1_putU16(msg.crnti, buf, off + 0);
    l2l1_putU8(msg.eventNb, buf, off + 2);
    l2l1_putU8(msg.eventType, buf, off + 3);
}
function UlDatadecodeFastAntennaSnapshotReq_t(offset) {
    let result = {};

    result.addrUlFastAntennaSnapshotResp = l2l1_getU32(offset + 0);
    result.ulSubCellId = l2l1_getU8(offset + 4);
    result.sfn = l2l1_getU16(offset + 6);
    result.slot = l2l1_getU8(offset + 8);
    result.numOfEvents = l2l1_getU8(offset + 9);
    result.eventsList = decodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(offset + 12);

    return result;
}
function UlDataencodeFastAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrUlFastAntennaSnapshotResp, buf, off + 0);
    l2l1_putU8(msg.ulSubCellId, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 6);
    l2l1_putU8(msg.slot, buf, off + 8);
    l2l1_putU8(msg.numOfEvents, buf, off + 9);
    encodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(msg.eventsList, buf, off + 12);
}
function UlDatadecodeFastAntennaSnapshotResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusFastAntennaSnapshotResp_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_statusFastAntennaSnapshotResp_t",
    });

    return result;
}
function UlDataencodeFastAntennaSnapshotResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
}
function UlDatadecodeEmptyReceiveReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.msgCountCtrl = l2l1_getU8(offset + 5);

    return result;
}
function UlDataencodeEmptyReceiveReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 5);
}
function UlDatadecoderimAllocationConfig_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.numOfSymbols = l2l1_getU8(offset + 1);
    result.numOfSubBands = l2l1_getU8(offset + 2);
    result.numOfPrbPerSubBand = l2l1_getU8(offset + 3);
    result.startPrbPerSubBand = decodeStaticFixedSizedArray_uint16_5(offset + 4);

    return result;
}
function UlDataencoderimAllocationConfig_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU8(msg.numOfSymbols, buf, off + 1);
    l2l1_putU8(msg.numOfSubBands, buf, off + 2);
    l2l1_putU8(msg.numOfPrbPerSubBand, buf, off + 3);
    encodeStaticFixedSizedArray_uint16_5(msg.startPrbPerSubBand, buf, off + 4);
}
function UlDatadecodedetectionResUnitsReq_t(offset) {
    let result = {};

    result.symbolIndex = l2l1_getU8(offset + 0);
    result.freqResIndex = l2l1_getU8(offset + 1);

    return result;
}
function UlDataencodedetectionResUnitsReq_t(msg, buf, off) {
    l2l1_putU8(msg.symbolIndex, buf, off + 0);
    l2l1_putU8(msg.freqResIndex, buf, off + 1);
}
function UlDatadecoderimRsSeq_t(offset) {
    let result = {};

    result.seqInit = l2l1_getU32(offset + 0);
    result.nScid = l2l1_getU16(offset + 4);
    result.detectionResUnits = decodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(offset + 8);

    return result;
}
function UlDataencoderimRsSeq_t(msg, buf, off) {
    l2l1_putU32(msg.seqInit, buf, off + 0);
    l2l1_putU16(msg.nScid, buf, off + 4);
    encodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(msg.detectionResUnits, buf, off + 8);
}
function UlDatadecodeblankedRegion_t(offset) {
    let result = {};

    result.blankStartPrb = l2l1_getU16(offset + 0);
    result.blankNumOfPrb = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeblankedRegion_t(msg, buf, off) {
    l2l1_putU16(msg.blankStartPrb, buf, off + 0);
    l2l1_putU16(msg.blankNumOfPrb, buf, off + 2);
}
function UlDatadecoderimRsDetectionConfig_t(offset) {
    let result = {};

    result.numPrb = l2l1_getU8(offset + 0);
    result.numOfFreqResources = l2l1_getU8(offset + 1);
    result.startPrb = decodeStaticFixedSizedArray_uint16_4(offset + 4);
    result.rimRsSeq = decodeDynamicVariableSizedArray_rimRsSeq_t_8(offset + 12);
    result.blankedRegion = decodeDynamicVariableSizedArray_blankedRegion_t_5(offset + 20);

    return result;
}
function UlDataencoderimRsDetectionConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numPrb, buf, off + 0);
    l2l1_putU8(msg.numOfFreqResources, buf, off + 1);
    encodeStaticFixedSizedArray_uint16_4(msg.startPrb, buf, off + 4);
    encodeDynamicVariableSizedArray_rimRsSeq_t_8(msg.rimRsSeq, buf, off + 12);
    encodeDynamicVariableSizedArray_blankedRegion_t_5(msg.blankedRegion, buf, off + 20);
}
function UlDatadecodeeCpriConfig_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);

    return result;
}
function UlDataencodeeCpriConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
}
function UlDatadecodeunscheduledPrbRange_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numOfPrb = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeunscheduledPrbRange_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numOfPrb, buf, off + 2);
}
function UlDatadecodeunscheduledRegionInfo_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.numOfSymbols = l2l1_getU8(offset + 1);
    result.eCpriSectionId = l2l1_getU16(offset + 2);
    result.unscheduledPrbRanges = decodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(offset + 4);

    return result;
}
function UlDataencodeunscheduledRegionInfo_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU8(msg.numOfSymbols, buf, off + 1);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 2);
    encodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(msg.unscheduledPrbRanges, buf, off + 4);
}
function UlDatadecoderimReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.msgCountCtrl = l2l1_getU8(offset + 1);
    result.rimRssiRequest = l2l1_getU8(offset + 2);
    result.rimRsDetectionRequest = l2l1_getU8(offset + 3);
    result.rimAllocationConfig = UlDatadecoderimAllocationConfig_t(offset + 4);
    result.rimRsDetectionConfig = UlDatadecoderimRsDetectionConfig_t(offset + 20);
    result.eCpriConfig = UlDatadecodeeCpriConfig_t(offset + 48);
    result.unscheduledRegionInfo = decodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(offset + 60);

    return result;
}
function UlDataencoderimReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 1);
    l2l1_putU8(msg.rimRssiRequest, buf, off + 2);
    l2l1_putU8(msg.rimRsDetectionRequest, buf, off + 3);
    UlDataencoderimAllocationConfig_t(msg.rimAllocationConfig, buf, off + 4);
    UlDataencoderimRsDetectionConfig_t(msg.rimRsDetectionConfig, buf, off + 20);
    UlDataencodeeCpriConfig_t(msg.eCpriConfig, buf, off + 48);
    encodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(msg.unscheduledRegionInfo, buf, off + 60);
}
function UlDatadecodeRimReceiveReq_t(offset) {
    let result = {};

    result.addrRimReceiveRespPs = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_rimReceiveReqSubcell_t_1(offset + 8);

    return result;
}
function UlDataencodeRimReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrRimReceiveRespPs, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    encodeDynamicVariableSizedArray_rimReceiveReqSubcell_t_1(msg.subcells, buf, off + 8);
}
function UlDatadecoderimReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.msgCountCtrl = l2l1_getU8(offset + 1);
    result.rimRssiRequest = l2l1_getU8(offset + 2);
    result.rimRsDetectionRequest = l2l1_getU8(offset + 3);
    result.rimAllocationConfig = UlDatadecoderimAllocationConfig_t(offset + 4);
    result.rimRsDetectionConfig = UlDatadecoderimRsDetectionConfig_t(offset + 20);
    result.eCpriConfig = UlDatadecodeeCpriConfig_t(offset + 48);
    result.unscheduledRegionInfo = decodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(offset + 60);

    return result;
}
function UlDataencoderimReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.msgCountCtrl, buf, off + 1);
    l2l1_putU8(msg.rimRssiRequest, buf, off + 2);
    l2l1_putU8(msg.rimRsDetectionRequest, buf, off + 3);
    UlDataencoderimAllocationConfig_t(msg.rimAllocationConfig, buf, off + 4);
    UlDataencoderimRsDetectionConfig_t(msg.rimRsDetectionConfig, buf, off + 20);
    UlDataencodeeCpriConfig_t(msg.eCpriConfig, buf, off + 48);
    encodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(msg.unscheduledRegionInfo, buf, off + 60);
}
function UlDatadecoderimAllocationConfig_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.numOfSymbols = l2l1_getU8(offset + 1);
    result.numOfSubBands = l2l1_getU8(offset + 2);
    result.numOfPrbPerSubBand = l2l1_getU8(offset + 3);
    result.startPrbPerSubBand = decodeStaticFixedSizedArray_uint16_5(offset + 4);

    return result;
}
function UlDataencoderimAllocationConfig_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU8(msg.numOfSymbols, buf, off + 1);
    l2l1_putU8(msg.numOfSubBands, buf, off + 2);
    l2l1_putU8(msg.numOfPrbPerSubBand, buf, off + 3);
    encodeStaticFixedSizedArray_uint16_5(msg.startPrbPerSubBand, buf, off + 4);
}
function UlDatadecoderimRsDetectionConfig_t(offset) {
    let result = {};

    result.numPrb = l2l1_getU8(offset + 0);
    result.numOfFreqResources = l2l1_getU8(offset + 1);
    result.startPrb = decodeStaticFixedSizedArray_uint16_4(offset + 4);
    result.rimRsSeq = decodeDynamicVariableSizedArray_rimRsSeq_t_8(offset + 12);
    result.blankedRegion = decodeDynamicVariableSizedArray_blankedRegion_t_5(offset + 20);

    return result;
}
function UlDataencoderimRsDetectionConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numPrb, buf, off + 0);
    l2l1_putU8(msg.numOfFreqResources, buf, off + 1);
    encodeStaticFixedSizedArray_uint16_4(msg.startPrb, buf, off + 4);
    encodeDynamicVariableSizedArray_rimRsSeq_t_8(msg.rimRsSeq, buf, off + 12);
    encodeDynamicVariableSizedArray_blankedRegion_t_5(msg.blankedRegion, buf, off + 20);
}
function UlDatadecoderimRsSeq_t(offset) {
    let result = {};

    result.seqInit = l2l1_getU32(offset + 0);
    result.nScid = l2l1_getU16(offset + 4);
    result.detectionResUnits = decodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(offset + 8);

    return result;
}
function UlDataencoderimRsSeq_t(msg, buf, off) {
    l2l1_putU32(msg.seqInit, buf, off + 0);
    l2l1_putU16(msg.nScid, buf, off + 4);
    encodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(msg.detectionResUnits, buf, off + 8);
}
function UlDatadecodedetectionResUnitsReq_t(offset) {
    let result = {};

    result.symbolIndex = l2l1_getU8(offset + 0);
    result.freqResIndex = l2l1_getU8(offset + 1);

    return result;
}
function UlDataencodedetectionResUnitsReq_t(msg, buf, off) {
    l2l1_putU8(msg.symbolIndex, buf, off + 0);
    l2l1_putU8(msg.freqResIndex, buf, off + 1);
}
function UlDatadecodeblankedRegion_t(offset) {
    let result = {};

    result.blankStartPrb = l2l1_getU16(offset + 0);
    result.blankNumOfPrb = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeblankedRegion_t(msg, buf, off) {
    l2l1_putU16(msg.blankStartPrb, buf, off + 0);
    l2l1_putU16(msg.blankNumOfPrb, buf, off + 2);
}
function UlDatadecodeeCpriConfig_t(offset) {
    let result = {};

    result.numCeAxCIndex = l2l1_getU8(offset + 0);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 4);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 8);

    return result;
}
function UlDataencodeeCpriConfig_t(msg, buf, off) {
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 4);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 8);
}
function UlDatadecodeunscheduledPrbRange_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.numOfPrb = l2l1_getU16(offset + 2);

    return result;
}
function UlDataencodeunscheduledPrbRange_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.numOfPrb, buf, off + 2);
}
function UlDatadecodeunscheduledRegionInfo_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
    result.numOfSymbols = l2l1_getU8(offset + 1);
    result.eCpriSectionId = l2l1_getU16(offset + 2);
    result.unscheduledPrbRanges = decodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(offset + 4);

    return result;
}
function UlDataencodeunscheduledRegionInfo_t(msg, buf, off) {
    l2l1_putU8(msg.startSymbol, buf, off + 0);
    l2l1_putU8(msg.numOfSymbols, buf, off + 1);
    l2l1_putU16(msg.eCpriSectionId, buf, off + 2);
    encodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(msg.unscheduledPrbRanges, buf, off + 4);
}
function UlDatadecoderimRssiIndex_t(offset) {
    let result = {};

    result.rimRssi = decodeStaticFixedSizedArray_float32_5(offset + 0);

    return result;
}
function UlDataencoderimRssiIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_float32_5(msg.rimRssi, buf, off + 0);
}
function UlDatadecodedetectionResUnitsResp_t(offset) {
    let result = {};

    result.symbolIndex = l2l1_getU8(offset + 0);
    result.startPrb = l2l1_getU16(offset + 2);
    result.rimRsSignalPower = l2l1_getF32(offset + 4);
    result.rimRsPeakValue = l2l1_getF32(offset + 8);
    result.rimRsPeakPosition = l2l1_getI16(offset + 12);

    return result;
}
function UlDataencodedetectionResUnitsResp_t(msg, buf, off) {
    l2l1_putU8(msg.symbolIndex, buf, off + 0);
    l2l1_putU16(msg.startPrb, buf, off + 2);
    l2l1_putF32(msg.rimRsSignalPower, buf, off + 4);
    l2l1_putF32(msg.rimRsPeakValue, buf, off + 8);
    l2l1_putI16(msg.rimRsPeakPosition, buf, off + 12);
}
function UlDatadecoderimRsDetectionReport_t(offset) {
    let result = {};

    result.nScid = l2l1_getU16(offset + 0);
    result.detectionResUnits = decodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(offset + 4);

    return result;
}
function UlDataencoderimRsDetectionReport_t(msg, buf, off) {
    l2l1_putU16(msg.nScid, buf, off + 0);
    encodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(msg.detectionResUnits, buf, off + 4);
}
function UlDatadecoderimReceiveRespSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rimRssiValid = l2l1_getU8(offset + 1);
    result.rimRssi = decodeStaticFixedSizedArray_rimRssiIndex_t_14(offset + 4);
    result.rimRsDetectionReport = decodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(offset + 284);

    return result;
}
function UlDataencoderimReceiveRespSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.rimRssiValid, buf, off + 1);
    encodeStaticFixedSizedArray_rimRssiIndex_t_14(msg.rimRssi, buf, off + 4);
    encodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(msg.rimRsDetectionReport, buf, off + 284);
}
function UlDatadecodeRimReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_rimReceiveRespSubcell_t_1(offset + 4);

    return result;
}
function UlDataencodeRimReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_rimReceiveRespSubcell_t_1(msg.subcells, buf, off + 4);
}
function UlDatadecoderimReceiveRespSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rimRssiValid = l2l1_getU8(offset + 1);
    result.rimRssi = decodeStaticFixedSizedArray_rimRssiIndex_t_14(offset + 4);
    result.rimRsDetectionReport = decodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(offset + 284);

    return result;
}
function UlDataencoderimReceiveRespSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU8(msg.rimRssiValid, buf, off + 1);
    encodeStaticFixedSizedArray_rimRssiIndex_t_14(msg.rimRssi, buf, off + 4);
    encodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(msg.rimRsDetectionReport, buf, off + 284);
}
function UlDatadecoderimRssiIndex_t(offset) {
    let result = {};

    result.rimRssi = decodeStaticFixedSizedArray_float32_5(offset + 0);

    return result;
}
function UlDataencoderimRssiIndex_t(msg, buf, off) {
    encodeStaticFixedSizedArray_float32_5(msg.rimRssi, buf, off + 0);
}
function UlDatadecoderimRsDetectionReport_t(offset) {
    let result = {};

    result.nScid = l2l1_getU16(offset + 0);
    result.detectionResUnits = decodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(offset + 4);

    return result;
}
function UlDataencoderimRsDetectionReport_t(msg, buf, off) {
    l2l1_putU16(msg.nScid, buf, off + 0);
    encodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(msg.detectionResUnits, buf, off + 4);
}
function UlDatadecodedetectionResUnitsResp_t(offset) {
    let result = {};

    result.symbolIndex = l2l1_getU8(offset + 0);
    result.startPrb = l2l1_getU16(offset + 2);
    result.rimRsSignalPower = l2l1_getF32(offset + 4);
    result.rimRsPeakValue = l2l1_getF32(offset + 8);
    result.rimRsPeakPosition = l2l1_getI16(offset + 12);

    return result;
}
function UlDataencodedetectionResUnitsResp_t(msg, buf, off) {
    l2l1_putU8(msg.symbolIndex, buf, off + 0);
    l2l1_putU16(msg.startPrb, buf, off + 2);
    l2l1_putF32(msg.rimRsSignalPower, buf, off + 4);
    l2l1_putF32(msg.rimRsPeakValue, buf, off + 8);
    l2l1_putI16(msg.rimRsPeakPosition, buf, off + 12);
}
function UlDatadecodeDiagnosticInd_t(offset) {
    let result = {};

    result.indType = l2l1_getU8(offset + 0);

    return result;
}
function UlDataencodeDiagnosticInd_t(msg, buf, off) {
    l2l1_putU8(msg.indType, buf, off + 0);
}
function UlDatadecodesrsBwvReport_t(offset) {
    let result = {};

    result.bwvReportId = l2l1_getU16(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 4);
    result.result = l2l1_getU8(offset + 5);
/*    if (!(result.result === [object Object] || result.result === [object Object] || result.result === [object Object]))
        throw new Error(`Value ${result.result} is out of range for enum 'srsBwvResult_t'`); */
    Object.defineProperty(result, "__enum_result", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvResult_t",
    });
    result.portPower = decodeStaticFixedSizedArray_float32_4(offset + 8);
    result.numBwvPerSubband = l2l1_getU8(offset + 24);
    result.numSubband = l2l1_getU16(offset + 26);
    result.startPatternId = l2l1_getU16(offset + 28);

    return result;
}
function UlDataencodesrsBwvReport_t(msg, buf, off) {
    l2l1_putU16(msg.bwvReportId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.symbolPosition, buf, off + 4);
    l2l1_putU8(msg.result, buf, off + 5);
    encodeStaticFixedSizedArray_float32_4(msg.portPower, buf, off + 8);
    l2l1_putU8(msg.numBwvPerSubband, buf, off + 24);
    l2l1_putU16(msg.numSubband, buf, off + 26);
    l2l1_putU16(msg.startPatternId, buf, off + 28);
}
function UlDatadecodesrsReceiveRespBwvPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.srsBwvReports = decodeDynamicVariableSizedArray_srsBwvReport_t_2(offset + 8);

    return result;
}
function UlDataencodesrsReceiveRespBwvPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    encodeDynamicVariableSizedArray_srsBwvReport_t_2(msg.srsBwvReports, buf, off + 8);
}
function UlDatadecodeSrsReceiveRespBwvPs_t(offset) {
    let result = {};

    result.subcells = decodeDynamicVariableSizedArray_srsReceiveRespBwvPsSubcell_t_1(offset + 0);

    return result;
}
function UlDataencodeSrsReceiveRespBwvPs_t(msg, buf, off) {
    encodeDynamicVariableSizedArray_srsReceiveRespBwvPsSubcell_t_1(msg.subcells, buf, off + 0);
}
function UlDatadecodesrsReceiveRespBwvPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.srsBwvReports = decodeDynamicVariableSizedArray_srsBwvReport_t_2(offset + 8);

    return result;
}
function UlDataencodesrsReceiveRespBwvPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    encodeDynamicVariableSizedArray_srsBwvReport_t_2(msg.srsBwvReports, buf, off + 8);
}
function UlDatadecodesrsBwvReport_t(offset) {
    let result = {};

    result.bwvReportId = l2l1_getU16(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 4);
    result.result = l2l1_getU8(offset + 5);
/*    if (!(result.result === [object Object] || result.result === [object Object] || result.result === [object Object]))
        throw new Error(`Value ${result.result} is out of range for enum 'srsBwvResult_t'`); */
    Object.defineProperty(result, "__enum_result", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsBwvResult_t",
    });
    result.portPower = decodeStaticFixedSizedArray_float32_4(offset + 8);
    result.numBwvPerSubband = l2l1_getU8(offset + 24);
    result.numSubband = l2l1_getU16(offset + 26);
    result.startPatternId = l2l1_getU16(offset + 28);

    return result;
}
function UlDataencodesrsBwvReport_t(msg, buf, off) {
    l2l1_putU16(msg.bwvReportId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.symbolPosition, buf, off + 4);
    l2l1_putU8(msg.result, buf, off + 5);
    encodeStaticFixedSizedArray_float32_4(msg.portPower, buf, off + 8);
    l2l1_putU8(msg.numBwvPerSubband, buf, off + 24);
    l2l1_putU16(msg.numSubband, buf, off + 26);
    l2l1_putU16(msg.startPatternId, buf, off + 28);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2UlAddresses = l1_commondecodeL2UlAddresses(offset + 4);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2UlAddresses(msg.l2UlAddresses, buf, off + 4);
}
function L1FcpdecodedlUlCommonHeader_t(offset) {
    let result = {};

    result.dataDirection = l2l1_getU8(offset + 0);
/*    if (!(result.dataDirection === [object Object] || result.dataDirection === [object Object]))
        throw new Error(`Value ${result.dataDirection} is out of range for enum 'DataDirection'`); */
    Object.defineProperty(result, "__enum_dataDirection", {
        enumerable: false,
        writable: false,
        value: "L1Fcp_DataDirection",
    });
    result.filterIndex = l2l1_getU8(offset + 1);
/*    if (!(result.filterIndex === [object Object] || result.filterIndex === [object Object] || result.filterIndex === [object Object] || result.filterIndex === [object Object] || result.filterIndex === [object Object]))
        throw new Error(`Value ${result.filterIndex} is out of range for enum 'FilterIndex'`); */
    Object.defineProperty(result, "__enum_filterIndex", {
        enumerable: false,
        writable: false,
        value: "L1Fcp_FilterIndex",
    });
    result.frameId = l2l1_getU8(offset + 2);
    result.subFrameId = l2l1_getU8(offset + 3);
    result.slotId = l2l1_getU8(offset + 4);
    result.startSymbolId = l2l1_getU8(offset + 5);
    result.numberOfSections = l2l1_getU8(offset + 6);

    return result;
}
function L1FcpencodedlUlCommonHeader_t(msg, buf, off) {
    l2l1_putU8(msg.dataDirection, buf, off + 0);
    l2l1_putU8(msg.filterIndex, buf, off + 1);
    l2l1_putU8(msg.frameId, buf, off + 2);
    l2l1_putU8(msg.subFrameId, buf, off + 3);
    l2l1_putU8(msg.slotId, buf, off + 4);
    l2l1_putU8(msg.startSymbolId, buf, off + 5);
    l2l1_putU8(msg.numberOfSections, buf, off + 6);
}
function L1FcpdecodebfwWeight_t(offset) {
    let result = {};

    result.bfwI = l2l1_getU16(offset + 0);
    result.bfwQ = l2l1_getU16(offset + 2);

    return result;
}
function L1FcpencodebfwWeight_t(msg, buf, off) {
    l2l1_putU16(msg.bfwI, buf, off + 0);
    l2l1_putU16(msg.bfwQ, buf, off + 2);
}
function L1FcpdecodebeamformingWeights_t(offset) {
    let result = {};

    result.bfwCompHdr = l2l1_getU8(offset + 0);
    result.bfwCompParam = l2l1_getU8(offset + 1);
    result.bfwWeights = decodeDynamicVariableSizedArray_bfwWeight_t_64(offset + 4);

    return result;
}
function L1FcpencodebeamformingWeights_t(msg, buf, off) {
    l2l1_putU8(msg.bfwCompHdr, buf, off + 0);
    l2l1_putU8(msg.bfwCompParam, buf, off + 1);
    encodeDynamicVariableSizedArray_bfwWeight_t_64(msg.bfwWeights, buf, off + 4);
}
function L1FcpdecodenonContiguousPrbAllocation_t(offset) {
    let result = {};

    result.rbgMask = l2l1_getU32(offset + 0);
    result.rbgSize = l2l1_getU16(offset + 4);
    result.symbolMask = l2l1_getU16(offset + 6);
    result.priority = l2l1_getI8(offset + 8);

    return result;
}
function L1FcpencodenonContiguousPrbAllocation_t(msg, buf, off) {
    l2l1_putU32(msg.rbgMask, buf, off + 0);
    l2l1_putU16(msg.rbgSize, buf, off + 4);
    l2l1_putU16(msg.symbolMask, buf, off + 6);
    l2l1_putI8(msg.priority, buf, off + 8);
}
function L1FcpdecodedlUlSection_t(offset) {
    let result = {};

    result.sectionId = l2l1_getU16(offset + 0);
    result.rb = l2l1_getU8(offset + 2);
/*    if (!(result.rb === [object Object] || result.rb === [object Object]))
        throw new Error(`Value ${result.rb} is out of range for enum 'RbIndicator'`); */
    Object.defineProperty(result, "__enum_rb", {
        enumerable: false,
        writable: false,
        value: "L1Fcp_RbIndicator",
    });
    result.symInc = l2l1_getU8(offset + 3);
    result.startPrbc = l2l1_getU16(offset + 4);
    result.numPrbc = l2l1_getU8(offset + 6);
    result.numSymbol = l2l1_getU16(offset + 8);
    result.reMask = l2l1_getU16(offset + 10);
    result.beamId = l2l1_getU16(offset + 12);
    result.bfwSectionExtensions = decodeDynamicVariableSizedArray_beamformingWeights_t_1(offset + 16);
    result.nonContPrbAllocSectionExtensions = decodeDynamicVariableSizedArray_nonContiguousPrbAllocation_t_1(offset + 24);

    return result;
}
function L1FcpencodedlUlSection_t(msg, buf, off) {
    l2l1_putU16(msg.sectionId, buf, off + 0);
    l2l1_putU8(msg.rb, buf, off + 2);
    l2l1_putU8(msg.symInc, buf, off + 3);
    l2l1_putU16(msg.startPrbc, buf, off + 4);
    l2l1_putU8(msg.numPrbc, buf, off + 6);
    l2l1_putU16(msg.numSymbol, buf, off + 8);
    l2l1_putU16(msg.reMask, buf, off + 10);
    l2l1_putU16(msg.beamId, buf, off + 12);
    encodeDynamicVariableSizedArray_beamformingWeights_t_1(msg.bfwSectionExtensions, buf, off + 16);
    encodeDynamicVariableSizedArray_nonContiguousPrbAllocation_t_1(msg.nonContPrbAllocSectionExtensions, buf, off + 24);
}
function L1FcpdecodeDlUlChannelsReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.eNbId = l2l1_getU32(offset + 4);
    result.eAxcId = l2l1_getU16(offset + 8);
    result.commonHeader = L1FcpdecodedlUlCommonHeader_t(offset + 10);
    result.sections = decodeDynamicVariableSizedArray_dlUlSection_t_210(offset + 20);

    return result;
}
function L1FcpencodeDlUlChannelsReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.eNbId, buf, off + 4);
    l2l1_putU16(msg.eAxcId, buf, off + 8);
    L1FcpencodedlUlCommonHeader_t(msg.commonHeader, buf, off + 10);
    encodeDynamicVariableSizedArray_dlUlSection_t_210(msg.sections, buf, off + 20);
}
function L1ChannelStreamerdecodeDeregisterReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);

    return result;
}
function L1ChannelStreamerencodeDeregisterReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
}
function L1ChannelStreamerdecodeDeregisterResp_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });

    return result;
}
function L1ChannelStreamerencodeDeregisterResp_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1ChannelStreamerdecodeReceiveInd_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.payload = decodeStaticFixedSizedArray_uint8_16(offset + 4);

    return result;
}
function L1ChannelStreamerencodeReceiveInd_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_16(msg.payload, buf, off + 4);
}
function L1ChannelStreamerdecodeRegisterReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.receiverQueueId = l2l1_getU32(offset + 4);

    return result;
}
function L1ChannelStreamerencodeRegisterReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.receiverQueueId, buf, off + 4);
}
function L1ChannelStreamerdecodeRegisterResp_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.streamerQueueId = l2l1_getU32(offset + 4);
    result.status = l2l1_getU8(offset + 8);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });

    return result;
}
function L1ChannelStreamerencodeRegisterResp_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    l2l1_putU32(msg.streamerQueueId, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 8);
}
function L1ChannelStreamerdecodeSendReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.payload = decodeStaticFixedSizedArray_uint8_16(offset + 4);

    return result;
}
function L1ChannelStreamerencodeSendReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    encodeStaticFixedSizedArray_uint8_16(msg.payload, buf, off + 4);
}
function decodeDeregisterReq_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);

    return result;
}
function encodeDeregisterReq_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
}
function L1CalldecodeNrUlTestReportInd_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rssi = l2l1_getF32(offset + 4);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 8);
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
function L1CallencodeNrUlTestReportInd_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.rssi, buf, off + 4);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 8);
    l2l1_putI32(msg.timeOffset, buf, off + 16);
    l2l1_putU64(msg.puschReceivedTbs, buf, off + 24);
    l2l1_putU64(msg.puschUnreceivedTbs, buf, off + 32);
    l2l1_putU64(msg.puschDefectiveTbs, buf, off + 40);
    l2l1_putU64(msg.pucchReceivedTbs, buf, off + 48);
    l2l1_putU64(msg.pucchUnreceivedTbs, buf, off + 56);
    l2l1_putU64(msg.pucchDefectiveTbs, buf, off + 64);
    l2l1_putU64(msg.detectedPa, buf, off + 72);
}
function L1CalldecodeSUlTmTputResult_t(offset) {
    let result = {};

    result.tput = l2l1_getI32(offset + 0);
    result.rssi = l2l1_getI32(offset + 4);
    result.sinr = l2l1_getI32(offset + 8);
    result.timeOffset = l2l1_getI32(offset + 12);
    result.receivedTbs = l2l1_getU32(offset + 16);
    result.failedTbs = l2l1_getU32(offset + 20);

    return result;
}
function L1CallencodeSUlTmTputResult_t(msg, buf, off) {
    l2l1_putI32(msg.tput, buf, off + 0);
    l2l1_putI32(msg.rssi, buf, off + 4);
    l2l1_putI32(msg.sinr, buf, off + 8);
    l2l1_putI32(msg.timeOffset, buf, off + 12);
    l2l1_putU32(msg.receivedTbs, buf, off + 16);
    l2l1_putU32(msg.failedTbs, buf, off + 20);
}
function L1CalldecodeSUlTmPrachResult_t(offset) {
    let result = {};

    result.detectedPa = l2l1_getU32(offset + 0);

    return result;
}
function L1CallencodeSUlTmPrachResult_t(msg, buf, off) {
    l2l1_putU32(msg.detectedPa, buf, off + 0);
}
function L1CalldecodeLTEUlTestReportInd_t(offset) {
    let result = {};

    result.lnCelId = l2l1_getU32(offset + 0);
    result.tputResult = L1CalldecodeSUlTmTputResult_t(offset + 4);
    result.prachResult = L1CalldecodeSUlTmPrachResult_t(offset + 28);

    return result;
}
function L1CallencodeLTEUlTestReportInd_t(msg, buf, off) {
    l2l1_putU32(msg.lnCelId, buf, off + 0);
    L1CallencodeSUlTmTputResult_t(msg.tputResult, buf, off + 4);
    L1CallencodeSUlTmPrachResult_t(msg.prachResult, buf, off + 28);
}
function L1CalldecodeSUlTmTputResult_t(offset) {
    let result = {};

    result.tput = l2l1_getI32(offset + 0);
    result.rssi = l2l1_getI32(offset + 4);
    result.sinr = l2l1_getI32(offset + 8);
    result.timeOffset = l2l1_getI32(offset + 12);
    result.receivedTbs = l2l1_getU32(offset + 16);
    result.failedTbs = l2l1_getU32(offset + 20);

    return result;
}
function L1CallencodeSUlTmTputResult_t(msg, buf, off) {
    l2l1_putI32(msg.tput, buf, off + 0);
    l2l1_putI32(msg.rssi, buf, off + 4);
    l2l1_putI32(msg.sinr, buf, off + 8);
    l2l1_putI32(msg.timeOffset, buf, off + 12);
    l2l1_putU32(msg.receivedTbs, buf, off + 16);
    l2l1_putU32(msg.failedTbs, buf, off + 20);
}
function L1CalldecodeSUlTmPrachResult_t(offset) {
    let result = {};

    result.detectedPa = l2l1_getU32(offset + 0);

    return result;
}
function L1CallencodeSUlTmPrachResult_t(msg, buf, off) {
    l2l1_putU32(msg.detectedPa, buf, off + 0);
}
function decodeNrUlTestReportInd_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rssi = l2l1_getF32(offset + 4);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 8);
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
function encodeNrUlTestReportInd_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.rssi, buf, off + 4);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 8);
    l2l1_putI32(msg.timeOffset, buf, off + 16);
    l2l1_putU64(msg.puschReceivedTbs, buf, off + 24);
    l2l1_putU64(msg.puschUnreceivedTbs, buf, off + 32);
    l2l1_putU64(msg.puschDefectiveTbs, buf, off + 40);
    l2l1_putU64(msg.pucchReceivedTbs, buf, off + 48);
    l2l1_putU64(msg.pucchUnreceivedTbs, buf, off + 56);
    l2l1_putU64(msg.pucchDefectiveTbs, buf, off + 64);
    l2l1_putU64(msg.detectedPa, buf, off + 72);
}
function L1MacSecdecodemkaProfile_t(offset) {
    let result = {};

    result.mkaHelloTime = l2l1_getF32(offset + 0);
    result.mkaLifeTime = l2l1_getU8(offset + 4);
    result.rootKeyLifeTime = l2l1_getU16(offset + 6);

    return result;
}
function L1MacSecencodemkaProfile_t(msg, buf, off) {
    l2l1_putF32(msg.mkaHelloTime, buf, off + 0);
    l2l1_putU8(msg.mkaLifeTime, buf, off + 4);
    l2l1_putU16(msg.rootKeyLifeTime, buf, off + 6);
}
function L1MacSecdecodemacSecProfile_t(offset) {
    let result = {};

    result.macSecTraPolId = l2l1_getU8(offset + 0);
    result.policyType = l2l1_getU8(offset + 1);
/*    if (!(result.policyType === [object Object] || result.policyType === [object Object]))
        throw new Error(`Value ${result.policyType} is out of range for enum 'policyType_t'`); */
    Object.defineProperty(result, "__enum_policyType", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_policyType_t",
    });
    result.macSecCipherSuite = l2l1_getU8(offset + 2);
/*    if (!(result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object]))
        throw new Error(`Value ${result.macSecCipherSuite} is out of range for enum 'macSecCipherSuite_t'`); */
    Object.defineProperty(result, "__enum_macSecCipherSuite", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_macSecCipherSuite_t",
    });
    result.macSecProtectionMode = l2l1_getU8(offset + 3);
/*    if (!(result.macSecProtectionMode === [object Object] || result.macSecProtectionMode === [object Object]))
        throw new Error(`Value ${result.macSecProtectionMode} is out of range for enum 'macSecProtectionMode_t'`); */
    Object.defineProperty(result, "__enum_macSecProtectionMode", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_macSecProtectionMode_t",
    });
    result.replayProtectionEnabled = l2l1_getU8(offset + 4);
    result.replayProtectionWindowSize = l2l1_getU32(offset + 8);

    return result;
}
function L1MacSecencodemacSecProfile_t(msg, buf, off) {
    l2l1_putU8(msg.macSecTraPolId, buf, off + 0);
    l2l1_putU8(msg.policyType, buf, off + 1);
    l2l1_putU8(msg.macSecCipherSuite, buf, off + 2);
    l2l1_putU8(msg.macSecProtectionMode, buf, off + 3);
    l2l1_putU8(msg.replayProtectionEnabled, buf, off + 4);
    l2l1_putU32(msg.replayProtectionWindowSize, buf, off + 8);
}
function L1MacSecdecodetrafficRuleSet_t(offset) {
    let result = {};

    result.macSecTraPolId = l2l1_getU8(offset + 0);
    result.ruleSetAction = l2l1_getU8(offset + 1);
/*    if (!(result.ruleSetAction === [object Object] || result.ruleSetAction === [object Object]))
        throw new Error(`Value ${result.ruleSetAction} is out of range for enum 'ruleSetAction_t'`); */
    Object.defineProperty(result, "__enum_ruleSetAction", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_ruleSetAction_t",
    });
    result.dstMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 4);
    result.etherType = l2l1_getU16(offset + 28);
    result.duPortId = l2l1_getU32(offset + 32);
    result.ruPortId = l2l1_getU32(offset + 36);
    result.srcMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 40);
    result.vlanId = l2l1_getU32(offset + 64);
    result.trafficRuleOrderNumber = l2l1_getU32(offset + 68);

    return result;
}
function L1MacSecencodetrafficRuleSet_t(msg, buf, off) {
    l2l1_putU8(msg.macSecTraPolId, buf, off + 0);
    l2l1_putU8(msg.ruleSetAction, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_20(msg.dstMacAddr, buf, off + 4);
    l2l1_putU16(msg.etherType, buf, off + 28);
    l2l1_putU32(msg.duPortId, buf, off + 32);
    l2l1_putU32(msg.ruPortId, buf, off + 36);
    encodeStaticVariableSizedArray_uint8_20(msg.srcMacAddr, buf, off + 40);
    l2l1_putU32(msg.vlanId, buf, off + 64);
    l2l1_putU32(msg.trafficRuleOrderNumber, buf, off + 68);
}
function L1MacSecdecodecreateConfigurationProfileReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.mkaProfile = L1MacSecdecodemkaProfile_t(offset + 4);
    result.macSecProfile = decodeStaticFixedSizedArray_macSecProfile_t_2(offset + 12);
    result.trafficRuleSet = decodeDynamicVariableSizedArray_trafficRuleSet_t_8(offset + 36);

    return result;
}
function L1MacSecencodecreateConfigurationProfileReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    L1MacSecencodemkaProfile_t(msg.mkaProfile, buf, off + 4);
    encodeStaticFixedSizedArray_macSecProfile_t_2(msg.macSecProfile, buf, off + 12);
    encodeDynamicVariableSizedArray_trafficRuleSet_t_8(msg.trafficRuleSet, buf, off + 36);
}
function L1MacSecdecodemkaProfile_t(offset) {
    let result = {};

    result.mkaHelloTime = l2l1_getF32(offset + 0);
    result.mkaLifeTime = l2l1_getU8(offset + 4);
    result.rootKeyLifeTime = l2l1_getU16(offset + 6);

    return result;
}
function L1MacSecencodemkaProfile_t(msg, buf, off) {
    l2l1_putF32(msg.mkaHelloTime, buf, off + 0);
    l2l1_putU8(msg.mkaLifeTime, buf, off + 4);
    l2l1_putU16(msg.rootKeyLifeTime, buf, off + 6);
}
function L1MacSecdecodemacSecProfile_t(offset) {
    let result = {};

    result.macSecTraPolId = l2l1_getU8(offset + 0);
    result.policyType = l2l1_getU8(offset + 1);
/*    if (!(result.policyType === [object Object] || result.policyType === [object Object]))
        throw new Error(`Value ${result.policyType} is out of range for enum 'policyType_t'`); */
    Object.defineProperty(result, "__enum_policyType", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_policyType_t",
    });
    result.macSecCipherSuite = l2l1_getU8(offset + 2);
/*    if (!(result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object] || result.macSecCipherSuite === [object Object]))
        throw new Error(`Value ${result.macSecCipherSuite} is out of range for enum 'macSecCipherSuite_t'`); */
    Object.defineProperty(result, "__enum_macSecCipherSuite", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_macSecCipherSuite_t",
    });
    result.macSecProtectionMode = l2l1_getU8(offset + 3);
/*    if (!(result.macSecProtectionMode === [object Object] || result.macSecProtectionMode === [object Object]))
        throw new Error(`Value ${result.macSecProtectionMode} is out of range for enum 'macSecProtectionMode_t'`); */
    Object.defineProperty(result, "__enum_macSecProtectionMode", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_macSecProtectionMode_t",
    });
    result.replayProtectionEnabled = l2l1_getU8(offset + 4);
    result.replayProtectionWindowSize = l2l1_getU32(offset + 8);

    return result;
}
function L1MacSecencodemacSecProfile_t(msg, buf, off) {
    l2l1_putU8(msg.macSecTraPolId, buf, off + 0);
    l2l1_putU8(msg.policyType, buf, off + 1);
    l2l1_putU8(msg.macSecCipherSuite, buf, off + 2);
    l2l1_putU8(msg.macSecProtectionMode, buf, off + 3);
    l2l1_putU8(msg.replayProtectionEnabled, buf, off + 4);
    l2l1_putU32(msg.replayProtectionWindowSize, buf, off + 8);
}
function L1MacSecdecodetrafficRuleSet_t(offset) {
    let result = {};

    result.macSecTraPolId = l2l1_getU8(offset + 0);
    result.ruleSetAction = l2l1_getU8(offset + 1);
/*    if (!(result.ruleSetAction === [object Object] || result.ruleSetAction === [object Object]))
        throw new Error(`Value ${result.ruleSetAction} is out of range for enum 'ruleSetAction_t'`); */
    Object.defineProperty(result, "__enum_ruleSetAction", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_ruleSetAction_t",
    });
    result.dstMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 4);
    result.etherType = l2l1_getU16(offset + 28);
    result.duPortId = l2l1_getU32(offset + 32);
    result.ruPortId = l2l1_getU32(offset + 36);
    result.srcMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 40);
    result.vlanId = l2l1_getU32(offset + 64);
    result.trafficRuleOrderNumber = l2l1_getU32(offset + 68);

    return result;
}
function L1MacSecencodetrafficRuleSet_t(msg, buf, off) {
    l2l1_putU8(msg.macSecTraPolId, buf, off + 0);
    l2l1_putU8(msg.ruleSetAction, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_20(msg.dstMacAddr, buf, off + 4);
    l2l1_putU16(msg.etherType, buf, off + 28);
    l2l1_putU32(msg.duPortId, buf, off + 32);
    l2l1_putU32(msg.ruPortId, buf, off + 36);
    encodeStaticVariableSizedArray_uint8_20(msg.srcMacAddr, buf, off + 40);
    l2l1_putU32(msg.vlanId, buf, off + 64);
    l2l1_putU32(msg.trafficRuleOrderNumber, buf, off + 68);
}
function L1MacSecdecodecreateConfigurationProfileResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusMacSecConfigProfileResp_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_statusMacSecConfigProfileResp_t",
    });

    return result;
}
function L1MacSecencodecreateConfigurationProfileResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1MacSecdecodeconnectionSetupReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.trafficMode = l2l1_getU8(offset + 4);
/*    if (!(result.trafficMode === [object Object] || result.trafficMode === [object Object] || result.trafficMode === [object Object]))
        throw new Error(`Value ${result.trafficMode} is out of range for enum 'trafficMode_t'`); */
    Object.defineProperty(result, "__enum_trafficMode", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_trafficMode_t",
    });
    result.duPortInfo = decodeStaticVariableSizedArray_uint8_20(offset + 8);
    result.ruPortInfo = decodeStaticVariableSizedArray_uint8_20(offset + 32);
    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 56);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 80);
    result.ruCapability = l2l1_getU8(offset + 104);
    result.trafficMacSecProtection = l2l1_getU8(offset + 105);
/*    if (!(result.trafficMacSecProtection === [object Object] || result.trafficMacSecProtection === [object Object]))
        throw new Error(`Value ${result.trafficMacSecProtection} is out of range for enum 'trafficMacSecProtection_t'`); */
    Object.defineProperty(result, "__enum_trafficMacSecProtection", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_trafficMacSecProtection_t",
    });

    return result;
}
function L1MacSecencodeconnectionSetupReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.trafficMode, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_20(msg.duPortInfo, buf, off + 8);
    encodeStaticVariableSizedArray_uint8_20(msg.ruPortInfo, buf, off + 32);
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 56);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 80);
    l2l1_putU8(msg.ruCapability, buf, off + 104);
    l2l1_putU8(msg.trafficMacSecProtection, buf, off + 105);
}
function L1MacSecdecodeconnectionSetupResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 4);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 28);
    result.cak = decodeStaticVariableSizedArray_uint8_32(offset + 52);
    result.ckn = decodeStaticVariableSizedArray_uint8_32(offset + 88);
    result.status = l2l1_getU8(offset + 124);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusMacSecSetup_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_statusMacSecSetup_t",
    });

    return result;
}
function L1MacSecencodeconnectionSetupResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 28);
    encodeStaticVariableSizedArray_uint8_32(msg.cak, buf, off + 52);
    encodeStaticVariableSizedArray_uint8_32(msg.ckn, buf, off + 88);
    l2l1_putU8(msg.status, buf, off + 124);
}
function L1MacSecdecodedeleteRuleReq_t(offset) {
    let result = {};

    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 0);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 24);
    result.ruCapability = l2l1_getU8(offset + 48);

    return result;
}
function L1MacSecencodedeleteRuleReq_t(msg, buf, off) {
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 24);
    l2l1_putU8(msg.ruCapability, buf, off + 48);
}
function L1MacSecdecodeconnectionDeleteReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.deleteRule = decodeDynamicVariableSizedArray_deleteRuleReq_t_384(offset + 4);

    return result;
}
function L1MacSecencodeconnectionDeleteReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    encodeDynamicVariableSizedArray_deleteRuleReq_t_384(msg.deleteRule, buf, off + 4);
}
function L1MacSecdecodedeleteRuleReq_t(offset) {
    let result = {};

    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 0);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 24);
    result.ruCapability = l2l1_getU8(offset + 48);

    return result;
}
function L1MacSecencodedeleteRuleReq_t(msg, buf, off) {
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 24);
    l2l1_putU8(msg.ruCapability, buf, off + 48);
}
function L1MacSecdecodedeleteRuleResp_t(offset) {
    let result = {};

    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 0);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 24);
    result.ruCapability = l2l1_getU8(offset + 48);
    result.status = l2l1_getU8(offset + 49);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusMacSecDelete_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_statusMacSecDelete_t",
    });

    return result;
}
function L1MacSecencodedeleteRuleResp_t(msg, buf, off) {
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 24);
    l2l1_putU8(msg.ruCapability, buf, off + 48);
    l2l1_putU8(msg.status, buf, off + 49);
}
function L1MacSecdecodeconnectionDeleteResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.deleteRule = decodeDynamicVariableSizedArray_deleteRuleResp_t_384(offset + 4);

    return result;
}
function L1MacSecencodeconnectionDeleteResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    encodeDynamicVariableSizedArray_deleteRuleResp_t_384(msg.deleteRule, buf, off + 4);
}
function L1MacSecdecodedeleteRuleResp_t(offset) {
    let result = {};

    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 0);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 24);
    result.ruCapability = l2l1_getU8(offset + 48);
    result.status = l2l1_getU8(offset + 49);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusMacSecDelete_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_statusMacSecDelete_t",
    });

    return result;
}
function L1MacSecencodedeleteRuleResp_t(msg, buf, off) {
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 24);
    l2l1_putU8(msg.ruCapability, buf, off + 48);
    l2l1_putU8(msg.status, buf, off + 49);
}
function L1MacSecdecodeconnectionStatusInd_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.duPortInfo = decodeStaticVariableSizedArray_uint8_20(offset + 4);
    result.ruPortInfo = decodeStaticVariableSizedArray_uint8_20(offset + 28);
    result.localMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 52);
    result.remoteMacAddr = decodeStaticVariableSizedArray_uint8_20(offset + 76);
    result.status = l2l1_getU8(offset + 100);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'statusMacSecConn_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_statusMacSecConn_t",
    });

    return result;
}
function L1MacSecencodeconnectionStatusInd_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    encodeStaticVariableSizedArray_uint8_20(msg.duPortInfo, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_20(msg.ruPortInfo, buf, off + 28);
    encodeStaticVariableSizedArray_uint8_20(msg.localMacAddr, buf, off + 52);
    encodeStaticVariableSizedArray_uint8_20(msg.remoteMacAddr, buf, off + 76);
    l2l1_putU8(msg.status, buf, off + 100);
}
function L1MacSecdecodecounterSubscribeReq_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.intervalInMin = l2l1_getU8(offset + 4);
/*    if (!(result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object] || result.intervalInMin === [object Object]))
        throw new Error(`Value ${result.intervalInMin} is out of range for enum 'PerfMeasInterval_t'`); */
    Object.defineProperty(result, "__enum_intervalInMin", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_PerfMeasInterval_t",
    });
    result.portItems = decodeStaticVariableSizedArray_uint8_20(offset + 8);

    return result;
}
function L1MacSecencodecounterSubscribeReq_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.intervalInMin, buf, off + 4);
    encodeStaticVariableSizedArray_uint8_20(msg.portItems, buf, off + 8);
}
function L1MacSecdecodecounterSubscribeResp_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.status = l2l1_getU8(offset + 4);
/*    if (!(result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'status_t'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "L1MacSec_status_t",
    });

    return result;
}
function L1MacSecencodecounterSubscribeResp_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU8(msg.status, buf, off + 4);
}
function L1MacSecdecodeportCounterItems_t(offset) {
    let result = {};

    result.duPortId = l2l1_getU32(offset + 0);
    result.inPktsUntagged = l2l1_getU64(offset + 8);
    result.inPktsNoTag = l2l1_getU64(offset + 16);
    result.inPktsBadTag = l2l1_getU64(offset + 24);
    result.inPktsNoSA = l2l1_getU64(offset + 32);
    result.inPktsNoSAError = l2l1_getU64(offset + 40);
    result.inPktsOverrun = l2l1_getU64(offset + 48);
    result.inPktsOK = l2l1_getU64(offset + 56);
    result.inPktsUnchecked = l2l1_getU64(offset + 64);
    result.inPktsInvalid = l2l1_getU64(offset + 72);
    result.inPktsNotValid = l2l1_getU64(offset + 80);
    result.inPktsDelayed = l2l1_getU64(offset + 88);
    result.inPktsLate = l2l1_getU64(offset + 96);
    result.inOctetsValidated = l2l1_getU64(offset + 104);
    result.inOctetsDecrypted = l2l1_getU64(offset + 112);
    result.outPktsUntagged = l2l1_getU64(offset + 120);
    result.outPktsTooLong = l2l1_getU64(offset + 128);
    result.outPktsProtected = l2l1_getU64(offset + 136);
    result.outPktsEncrypted = l2l1_getU64(offset + 144);
    result.outOctetsProtected = l2l1_getU64(offset + 152);
    result.outOctetsEncrypted = l2l1_getU64(offset + 160);

    return result;
}
function L1MacSecencodeportCounterItems_t(msg, buf, off) {
    l2l1_putU32(msg.duPortId, buf, off + 0);
    l2l1_putU64(msg.inPktsUntagged, buf, off + 8);
    l2l1_putU64(msg.inPktsNoTag, buf, off + 16);
    l2l1_putU64(msg.inPktsBadTag, buf, off + 24);
    l2l1_putU64(msg.inPktsNoSA, buf, off + 32);
    l2l1_putU64(msg.inPktsNoSAError, buf, off + 40);
    l2l1_putU64(msg.inPktsOverrun, buf, off + 48);
    l2l1_putU64(msg.inPktsOK, buf, off + 56);
    l2l1_putU64(msg.inPktsUnchecked, buf, off + 64);
    l2l1_putU64(msg.inPktsInvalid, buf, off + 72);
    l2l1_putU64(msg.inPktsNotValid, buf, off + 80);
    l2l1_putU64(msg.inPktsDelayed, buf, off + 88);
    l2l1_putU64(msg.inPktsLate, buf, off + 96);
    l2l1_putU64(msg.inOctetsValidated, buf, off + 104);
    l2l1_putU64(msg.inOctetsDecrypted, buf, off + 112);
    l2l1_putU64(msg.outPktsUntagged, buf, off + 120);
    l2l1_putU64(msg.outPktsTooLong, buf, off + 128);
    l2l1_putU64(msg.outPktsProtected, buf, off + 136);
    l2l1_putU64(msg.outPktsEncrypted, buf, off + 144);
    l2l1_putU64(msg.outOctetsProtected, buf, off + 152);
    l2l1_putU64(msg.outOctetsEncrypted, buf, off + 160);
}
function L1MacSecdecodecounterInd_t(offset) {
    let result = {};

    result.transactionId = l2l1_getU32(offset + 0);
    result.padding = l2l1_getU32(offset + 4);
    result.portCounterItems = decodeDynamicVariableSizedArray_portCounterItems_t_20(offset + 8);

    return result;
}
function L1MacSecencodecounterInd_t(msg, buf, off) {
    l2l1_putU32(msg.transactionId, buf, off + 0);
    l2l1_putU32(msg.padding, buf, off + 4);
    encodeDynamicVariableSizedArray_portCounterItems_t_20(msg.portCounterItems, buf, off + 8);
}
function L1MacSecdecodeportCounterItems_t(offset) {
    let result = {};

    result.duPortId = l2l1_getU32(offset + 0);
    result.inPktsUntagged = l2l1_getU64(offset + 8);
    result.inPktsNoTag = l2l1_getU64(offset + 16);
    result.inPktsBadTag = l2l1_getU64(offset + 24);
    result.inPktsNoSA = l2l1_getU64(offset + 32);
    result.inPktsNoSAError = l2l1_getU64(offset + 40);
    result.inPktsOverrun = l2l1_getU64(offset + 48);
    result.inPktsOK = l2l1_getU64(offset + 56);
    result.inPktsUnchecked = l2l1_getU64(offset + 64);
    result.inPktsInvalid = l2l1_getU64(offset + 72);
    result.inPktsNotValid = l2l1_getU64(offset + 80);
    result.inPktsDelayed = l2l1_getU64(offset + 88);
    result.inPktsLate = l2l1_getU64(offset + 96);
    result.inOctetsValidated = l2l1_getU64(offset + 104);
    result.inOctetsDecrypted = l2l1_getU64(offset + 112);
    result.outPktsUntagged = l2l1_getU64(offset + 120);
    result.outPktsTooLong = l2l1_getU64(offset + 128);
    result.outPktsProtected = l2l1_getU64(offset + 136);
    result.outPktsEncrypted = l2l1_getU64(offset + 144);
    result.outOctetsProtected = l2l1_getU64(offset + 152);
    result.outOctetsEncrypted = l2l1_getU64(offset + 160);

    return result;
}
function L1MacSecencodeportCounterItems_t(msg, buf, off) {
    l2l1_putU32(msg.duPortId, buf, off + 0);
    l2l1_putU64(msg.inPktsUntagged, buf, off + 8);
    l2l1_putU64(msg.inPktsNoTag, buf, off + 16);
    l2l1_putU64(msg.inPktsBadTag, buf, off + 24);
    l2l1_putU64(msg.inPktsNoSA, buf, off + 32);
    l2l1_putU64(msg.inPktsNoSAError, buf, off + 40);
    l2l1_putU64(msg.inPktsOverrun, buf, off + 48);
    l2l1_putU64(msg.inPktsOK, buf, off + 56);
    l2l1_putU64(msg.inPktsUnchecked, buf, off + 64);
    l2l1_putU64(msg.inPktsInvalid, buf, off + 72);
    l2l1_putU64(msg.inPktsNotValid, buf, off + 80);
    l2l1_putU64(msg.inPktsDelayed, buf, off + 88);
    l2l1_putU64(msg.inPktsLate, buf, off + 96);
    l2l1_putU64(msg.inOctetsValidated, buf, off + 104);
    l2l1_putU64(msg.inOctetsDecrypted, buf, off + 112);
    l2l1_putU64(msg.outPktsUntagged, buf, off + 120);
    l2l1_putU64(msg.outPktsTooLong, buf, off + 128);
    l2l1_putU64(msg.outPktsProtected, buf, off + 136);
    l2l1_putU64(msg.outPktsEncrypted, buf, off + 144);
    l2l1_putU64(msg.outOctetsProtected, buf, off + 152);
    l2l1_putU64(msg.outOctetsEncrypted, buf, off + 160);
}
function l2l1_decode_msg(l2l1) {
    let result;
    switch (l2l1.message) {
    case 0xe3f0: // L1Config::SwConfigurationReq_t
        result = L1ConfigdecodeSwConfigurationReq_t(0);
        break;
    case 0xe3f1: // L1Config::SwConfigurationResp_t
        result = L1ConfigdecodeSwConfigurationResp_t(0);
        break;
    case 0xe3f2: // L1Config::AutohealingActivationReq_t
        result = L1ConfigdecodeAutohealingActivationReq_t(0);
        break;
    case 0xe3f3: // L1Config::AutohealingActivationResp_t
        result = L1ConfigdecodeAutohealingActivationResp_t(0);
        break;
    case 0x0a00: // L1Cpri::AlarmInd_t
        result = L1CpridecodeAlarmInd_t(0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        result = L1CpridecodeConfigureLinksReq_t(0);
        break;
    case 0x0a02: // L1Cpri::ConfigureLinksResp_t
        result = L1CpridecodeConfigureLinksResp_t(0);
        break;
    case 0x0a05: // L1Cpri::SetOutputReq_t
        result = L1CpridecodeSetOutputReq_t(0);
        break;
    case 0x0a06: // L1Cpri::SetOutputResp_t
        result = L1CpridecodeSetOutputResp_t(0);
        break;
    case 0x0a07: // L1Cpri::StateInd_t
        result = L1CpridecodeStateInd_t(0);
        break;
    case 0x0a08: // L1Cpri::SubscribeReq_t
        result = L1CpridecodeSubscribeReq_t(0);
        break;
    case 0x0a09: // L1Cpri::SubscribeResp_t
        result = L1CpridecodeSubscribeResp_t(0);
        break;
    case 0x0a0a: // L1Cpri::DiscoveryInd_t
        result = L1CpridecodeDiscoveryInd_t(0);
        break;
    case 0x0a0e: // L1Cpri::DelayConfigResp_t
        result = L1CpridecodeDelayConfigResp_t(0);
        break;
    case 0x0a0f: // L1Cpri::GetLinkParamReq_t
        result = L1CpridecodeGetLinkParamReq_t(0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        result = L1CpridecodeSetDiscoveryReq_t(0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        result = L1CpridecodeSetDiscoveryResp_t(0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        result = L1CpridecodeSetLinkPropertiesResp_t(0);
        break;
    case 0x0A43: // L1Cpri::ConfigureAxcInfoResp_t
        result = L1CpridecodeConfigureAxcInfoResp_t(0);
        break;
    case 0x0A44: // L1Cpri::DeleteAxcInfoReq_t
        result = L1CpridecodeDeleteAxcInfoReq_t(0);
        break;
    case 0x0A45: // L1Cpri::DeleteAxcInfoResp_t
        result = L1CpridecodeDeleteAxcInfoResp_t(0);
        break;
    case 0x0a48: // L1Cpri::ConfigureVsbReq_t
        result = L1CpridecodeConfigureVsbReq_t(0);
        break;
    case 0x0a49: // L1Cpri::ConfigureVsbResp_t
        result = L1CpridecodeConfigureVsbResp_t(0);
        break;
    case 0x0a4A: // L1Cpri::SubscribeVsbChangesReq_t
        result = L1CpridecodeSubscribeVsbChangesReq_t(0);
        break;
    case 0x0a4B: // L1Cpri::SubscribeVsbChangesResp_t
        result = L1CpridecodeSubscribeVsbChangesResp_t(0);
        break;
    case 0x0a4C: // L1Cpri::VsbDataInd_t
        result = L1CpridecodeVsbDataInd_t(0);
        break;
    case 0x0a4D: // L1Cpri::SendVsbDataReq_t
        result = L1CpridecodeSendVsbDataReq_t(0);
        break;
    case 0x0a4E: // L1Cpri::SendVsbDataResp_t
        result = L1CpridecodeSendVsbDataResp_t(0);
        break;
    case 0x0a4F: // L1Cpri::SetLinkPropertiesReq_t
        result = L1CpridecodeSetLinkPropertiesReq_t(0);
        break;
    case 0xe301: // L1Cpri::ConfigureAxcInfoReq_t
        result = L1CpridecodeConfigureAxcInfoReq_t(0);
        break;
    case 0xe311: // L1Cpri::DelayConfigReq_t
        result = L1CpridecodeDelayConfigReq_t(0);
        break;
    case 0xe312: // L1Cpri::GetLinkParamResp_t
        result = L1CpridecodeGetLinkParamResp_t(0);
        break;
    case 0xe313: // L1Cpri::FrameSyncInd_t
        result = L1CpridecodeFrameSyncInd_t(0);
        break;
    case 0xe314: // L1Cpri::T14Ind_t
        result = L1CpridecodeT14Ind_t(0);
        break;
    case 0xE11C: // DlPool::AddressReq_t
        result = DlPooldecodeAddressReq_t(0);
        break;
    case 0xE11D: // DlPool::AddressResp_t
        result = DlPooldecodeAddressResp_t(0);
        break;
    case 0xE11E: // DlPool::BbResourceReconfReq_t
        result = DlPooldecodeBbResourceReconfReq_t(0);
        break;
    case 0xE11F: // DlPool::BbResourceReconfResp_t
        result = DlPooldecodeBbResourceReconfResp_t(0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        result = DlCelldecodeDeleteReq_t(0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        result = DlCelldecodeDeleteResp_t(0);
        break;
    case 0xE117: // DlCell::SetupReq_t
        result = DlCelldecodeSetupReq_t(0);
        break;
    case 0xE119: // DlCell::SetupResp_t
        result = DlCelldecodeSetupResp_t(0);
        break;
    case 0x0001: // L1::PingPongReq_t
        result = L1decodePingPongReq_t(0);
        break;
    case 0x0002: // L1::EchoReq_t
        result = L1decodeEchoReq_t(0);
        break;
    case 0x0003: // L1::EchoResp_t
        result = L1decodeEchoResp_t(0);
        break;
    case 0x0004: // L1::LoopReq_t
        result = L1decodeLoopReq_t(0);
        break;
    case 0x0005: // L1::UlMeasReq_t
        result = L1decodeUlMeasReq_t(0);
        break;
    case 0x0006: // L1::WakeupReq_t
        result = L1decodeWakeupReq_t(0);
        break;
    case 0x0007: // L1::StartupLoopReq_t
        result = L1decodeStartupLoopReq_t(0);
        break;
    case 0x0008: // L1::SnapshotFileCreationReq_t
        result = L1decodeSnapshotFileCreationReq_t(0);
        break;
    case 0x0009: // L1::LatencyEventReq_t
        result = L1decodeLatencyEventReq_t(0);
        break;
    case 0x000A: // L1::DmaEndInd_t
        result = L1decodeDmaEndInd_t(0);
        break;
    case 0x000B: // L1::LaWakeupReq_t
        result = L1decodeLaWakeupReq_t(0);
        break;
    case 0x000C: // L1::DmaStartTestReq_t
        result = L1decodeDmaStartTestReq_t(0);
        break;
    case 0x000D: // L1::NrtRxSubcellResetReq_t
        result = L1decodeNrtRxSubcellResetReq_t(0);
        break;
    case 0x000E: // L1::SyncInd_t
        result = L1decodeSyncInd_t(0);
        break;
    case 0xE002: // L1::TestModeConfigReq_t
        result = L1decodeTestModeConfigReq_t(0);
        break;
    case 0xE003: // L1::TestModeConfigResp_t
        result = L1decodeTestModeConfigResp_t(0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        result = DlDatadecodePdschPayloadTbSendReq_t(0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        result = DlDatadecodeSlotTypeReq_t(0);
        break;
    case 0xE101: // DlData::PatternConfigReq_t
        result = DlDatadecodePatternConfigReq_t(0);
        break;
    case 0xE10C: // DlData::FastAntennaSnapshotResp_t
        result = DlDatadecodeFastAntennaSnapshotResp_t(0);
        break;
    case 0xE10F: // DlData::SsBlockSendReq_t
        result = DlDatadecodeSsBlockSendReq_t(0);
        break;
    case 0xE110: // DlData::CsiRsSendReq_t
        result = DlDatadecodeCsiRsSendReq_t(0);
        break;
    case 0xE111: // DlData::EmptySendReq_t
        result = DlDatadecodeEmptySendReq_t(0);
        break;
    case 0xE112: // DlData::AddressResp_t
        result = DlDatadecodeAddressResp_t(0);
        break;
    case 0xE113: // DlData::PdcchSendReq_t
        result = DlDatadecodePdcchSendReq_t(0);
        break;
    case 0xE115: // DlData::FastAntennaSnapshotReq_t
        result = DlDatadecodeFastAntennaSnapshotReq_t(0);
        break;
    case 0xE118: // DlData::PdschSendReq_t
        result = DlDatadecodePdschSendReq_t(0);
        break;
    case 0xE11A: // DlData::AddressReq_t
        result = DlDatadecodeAddressReq_t(0);
        break;
    case 0xE11B: // DlData::DiagnosticInd_t
        result = DlDatadecodeDiagnosticInd_t(0);
        break;
    case 0xE120: // DlData::RimRsSendReq_t
        result = DlDatadecodeRimRsSendReq_t(0);
        break;
    case 0x0a30: // L1ECpri::ConfigureLinksReq_t
        result = L1ECpridecodeConfigureLinksReq_t(0);
        break;
    case 0x0a31: // L1ECpri::ConfigureLinksResp_t
        result = L1ECpridecodeConfigureLinksResp_t(0);
        break;
    case 0x0a32: // L1ECpri::SubscribeReq_t
        result = L1ECpridecodeSubscribeReq_t(0);
        break;
    case 0x0a33: // L1ECpri::SubscribeResp_t
        result = L1ECpridecodeSubscribeResp_t(0);
        break;
    case 0x0a34: // L1ECpri::SetOutputReq_t
        result = L1ECpridecodeSetOutputReq_t(0);
        break;
    case 0x0a35: // L1ECpri::SetOutputResp_t
        result = L1ECpridecodeSetOutputResp_t(0);
        break;
    case 0x0a36: // L1ECpri::StateInd_t
        result = L1ECpridecodeStateInd_t(0);
        break;
    case 0x0a38: // L1ECpri::DelayConfigResp_t
        result = L1ECpridecodeDelayConfigResp_t(0);
        break;
    case 0x0a39: // L1ECpri::ConfigureTransportReq_t
        result = L1ECpridecodeConfigureTransportReq_t(0);
        break;
    case 0x0a3a: // L1ECpri::ConfigureTransportResp_t
        result = L1ECpridecodeConfigureTransportResp_t(0);
        break;
    case 0x0a3b: // L1ECpri::InitialDelayMeasReq_t
        result = L1ECpridecodeInitialDelayMeasReq_t(0);
        break;
    case 0x0a3c: // L1ECpri::InitialDelayMeasResp_t
        result = L1ECpridecodeInitialDelayMeasResp_t(0);
        break;
    case 0x0a3d: // L1ECpri::DelayMeasInd_t
        result = L1ECpridecodeDelayMeasInd_t(0);
        break;
    case 0x0a3e: // L1ECpri::ConfigureMeasurementsReq_t
        result = L1ECpridecodeConfigureMeasurementsReq_t(0);
        break;
    case 0x0a3f: // L1ECpri::ConfigureMeasurementsResp_t
        result = L1ECpridecodeConfigureMeasurementsResp_t(0);
        break;
    case 0x0a40: // L1ECpri::MsgRcvCountersInd_t
        result = L1ECpridecodeMsgRcvCountersInd_t(0);
        break;
    case 0xe305: // L1ECpri::API2ConfigureTransportReq_t
        result = L1ECpridecodeAPI2ConfigureTransportReq_t(0);
        break;
    case 0xe306: // L1ECpri::API2ConfigureTransportResp_t
        result = L1ECpridecodeAPI2ConfigureTransportResp_t(0);
        break;
    case 0xe307: // L1ECpri::API2DeleteTransportReq_t
        result = L1ECpridecodeAPI2DeleteTransportReq_t(0);
        break;
    case 0xe308: // L1ECpri::API2DeleteTransportResp_t
        result = L1ECpridecodeAPI2DeleteTransportResp_t(0);
        break;
    case 0xe309: // L1ECpri::DelayConfigReq_t
        result = L1ECpridecodeDelayConfigReq_t(0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        result = L1LogdecodeAntennaSnapshotReq_t(0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        result = L1LogdecodeAntennaSnapshotResp_t(0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        result = L1LogdecodeShowTraceListResp_t(0);
        break;
    case 0xe3b0: // L1Log::TraceReq_t
        result = L1LogdecodeTraceReq_t(0);
        break;
    case 0xe3b1: // L1Log::ShowTraceListReq_t
        result = L1LogdecodeShowTraceListReq_t(0);
        break;
    case 0xe3b3: // L1Log::AntennaSnapshotInd_t
        result = L1LogdecodeAntennaSnapshotInd_t(0);
        break;
    case 0xe3b4: // L1Log::TraceInd_t
        result = L1LogdecodeTraceInd_t(0);
        break;
    case 0xe3b5: // L1Log::TraceResp_t
        result = L1LogdecodeTraceResp_t(0);
        break;
    case 0xe3b6: // L1Log::SuspiciousEventInd_t
        result = L1LogdecodeSuspiciousEventInd_t(0);
        break;
    case 0xe3b7: // L1Log::AntennaSnapshotConfigurationResp_t
        result = L1LogdecodeAntennaSnapshotConfigurationResp_t(0);
        break;
    case 0xe3b8: // L1Log::AntennaSnapshotConfigurationReq_t
        result = L1LogdecodeAntennaSnapshotConfigurationReq_t(0);
        break;
    case 0xe3bf: // L1Log::OverloadStatusInd_t
        result = L1LogdecodeOverloadStatusInd_t(0);
        break;
    case 0xe3c0: // L1Log::ActTraceOverloadReq_t
        result = L1LogdecodeActTraceOverloadReq_t(0);
        break;
    case 0xe3c1: // L1Log::ActTraceOverloadResp_t
        result = L1LogdecodeActTraceOverloadResp_t(0);
        break;
    case 0xe3c2: // L1Log::AntennaSnapshotStopInd_t
        result = L1LogdecodeAntennaSnapshotStopInd_t(0);
        break;
    case 0xE3B9: // L1Status::AutohealingSubscribeReq_t
        result = L1StatusdecodeAutohealingSubscribeReq_t(0);
        break;
    case 0xE3BA: // L1Status::AutohealingSubscribeResp_t
        result = L1StatusdecodeAutohealingSubscribeResp_t(0);
        break;
    case 0xE3BB: // L1Status::AutohealingStatusInd_t
        result = L1StatusdecodeAutohealingStatusInd_t(0);
        break;
    case 0xd220: // SyncM::startPtpReq_t
        result = SyncMdecodestartPtpReq_t(0);
        break;
    case 0xd221: // SyncM::startPtpResp_t
        result = SyncMdecodestartPtpResp_t(0);
        break;
    case 0xd222: // SyncM::updatePtpConfigReq_t
        result = SyncMdecodeupdatePtpConfigReq_t(0);
        break;
    case 0xd223: // SyncM::updatePtpConfigResp_t
        result = SyncMdecodeupdatePtpConfigResp_t(0);
        break;
    case 0xd224: // SyncM::startSyncEReq_t
        result = SyncMdecodestartSyncEReq_t(0);
        break;
    case 0xd225: // SyncM::startSyncEResp_t
        result = SyncMdecodestartSyncEResp_t(0);
        break;
    case 0xd226: // SyncM::updateSyncEConfigReq_t
        result = SyncMdecodeupdateSyncEConfigReq_t(0);
        break;
    case 0xd227: // SyncM::updateSyncEConfigResp_t
        result = SyncMdecodeupdateSyncEConfigResp_t(0);
        break;
    case 0xd228: // SyncM::getSyncEStatusReq_t
        result = SyncMdecodegetSyncEStatusReq_t(0);
        break;
    case 0xd229: // SyncM::getSyncEStatusResp_t
        result = SyncMdecodegetSyncEStatusResp_t(0);
        break;
    case 0xd22a: // SyncM::getPtpStatusReq_t
        result = SyncMdecodegetPtpStatusReq_t(0);
        break;
    case 0xd22b: // SyncM::getPtpStatusResp_t
        result = SyncMdecodegetPtpStatusResp_t(0);
        break;
    case 0xd22c: // SyncM::stopSyncEReq_t
        result = SyncMdecodestopSyncEReq_t(0);
        break;
    case 0xd22d: // SyncM::stopSyncEResp_t
        result = SyncMdecodestopSyncEResp_t(0);
        break;
    case 0xd22e: // SyncM::stopPtpReq_t
        result = SyncMdecodestopPtpReq_t(0);
        break;
    case 0xd22f: // SyncM::stopPtpResp_t
        result = SyncMdecodestopPtpResp_t(0);
        break;
    case 0xd230: // SyncM::statusInd_t
        result = SyncMdecodestatusInd_t(0);
        break;
    case 0xe3bc: // L1SyncSlave::startPtpSlaveReq_t
        result = L1SyncSlavedecodestartPtpSlaveReq_t(0);
        break;
    case 0xe3bd: // L1SyncSlave::startPtpSlaveResp_t
        result = L1SyncSlavedecodestartPtpSlaveResp_t(0);
        break;
    case 0xe3be: // L1SyncSlave::syncSlaveStatusInd_t
        result = L1SyncSlavedecodesyncSlaveStatusInd_t(0);
        break;
    case 0xe3ca: // L1SyncSlave::getPtpSlaveStatusReq_t
        result = L1SyncSlavedecodegetPtpSlaveStatusReq_t(0);
        break;
    case 0xe3cb: // L1SyncSlave::getPtpSlaveStatusResp_t
        result = L1SyncSlavedecodegetPtpSlaveStatusResp_t(0);
        break;
    case 0xE259: // UlPool::AddressReq_t
        result = UlPooldecodeAddressReq_t(0);
        break;
    case 0xE25A: // UlPool::AddressResp_t
        result = UlPooldecodeAddressResp_t(0);
        break;
    case 0xE25B: // UlPool::BbResourceReconfReq_t
        result = UlPooldecodeBbResourceReconfReq_t(0);
        break;
    case 0xE25C: // UlPool::BbResourceReconfResp_t
        result = UlPooldecodeBbResourceReconfResp_t(0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        result = UlCelldecodeDeleteReq_t(0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        result = UlCelldecodeDeleteResp_t(0);
        break;
    case 0xE253: // UlCell::SetupReq_t
        result = UlCelldecodeSetupReq_t(0);
        break;
    case 0xE254: // UlCell::SetupResp_t
        result = UlCelldecodeSetupResp_t(0);
        break;
    case 0xE239: // UlData::PuschReceiveRespLo_t
        result = UlDatadecodePuschReceiveRespLo_t(0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        result = UlDatadecodePrachReceiveInd_t(0);
        break;
    case 0xE200: // UlData::PuschReceiveRespHarqD_t
        result = UlDatadecodePuschReceiveRespHarqD_t(0);
        break;
    case 0xE208: // UlData::PucchReceiveRespHarqD_t
        result = UlDatadecodePucchReceiveRespHarqD_t(0);
        break;
    case 0xE20B: // UlData::PuschReceiveRespHarqU_t
        result = UlDatadecodePuschReceiveRespHarqU_t(0);
        break;
    case 0xE21C: // UlData::FastAntennaSnapshotResp_t
        result = UlDatadecodeFastAntennaSnapshotResp_t(0);
        break;
    case 0xE226: // UlData::PucchReceiveReq_t
        result = UlDatadecodePucchReceiveReq_t(0);
        break;
    case 0xE229: // UlData::EmptyReceiveReq_t
        result = UlDatadecodeEmptyReceiveReq_t(0);
        break;
    case 0xE231: // UlData::PrachReceiveReq_t
        result = UlDatadecodePrachReceiveReq_t(0);
        break;
    case 0xE235: // UlData::FastAntennaSnapshotReq_t
        result = UlDatadecodeFastAntennaSnapshotReq_t(0);
        break;
    case 0xE237: // UlData::SrsReceiveRespPs_t
        result = UlDatadecodeSrsReceiveRespPs_t(0);
        break;
    case 0xE24B: // UlData::PuschReceiveRespPs_t
        result = UlDatadecodePuschReceiveRespPs_t(0);
        break;
    case 0xE24C: // UlData::PucchReceiveRespPs_t
        result = UlDatadecodePucchReceiveRespPs_t(0);
        break;
    case 0xE24D: // UlData::PrachReceiveInd_t
        result = UlDatadecodePrachReceiveInd_t(0);
        break;
    case 0xE24E: // UlData::RimReceiveReq_t
        result = UlDatadecodeRimReceiveReq_t(0);
        break;
    case 0xE24F: // UlData::RimReceiveRespPs_t
        result = UlDatadecodeRimReceiveRespPs_t(0);
        break;
    case 0xE250: // UlData::AddressResp_t
        result = UlDatadecodeAddressResp_t(0);
        break;
    case 0xE251: // UlData::PuschReceiveReq_t
        result = UlDatadecodePuschReceiveReq_t(0);
        break;
    case 0xE255: // UlData::SrsReceiveReq_t
        result = UlDatadecodeSrsReceiveReq_t(0);
        break;
    case 0xE256: // UlData::SrsReceiveRespBmPs_t
        result = UlDatadecodeSrsReceiveRespBmPs_t(0);
        break;
    case 0xE257: // UlData::AddressReq_t
        result = UlDatadecodeAddressReq_t(0);
        break;
    case 0xE258: // UlData::DiagnosticInd_t
        result = UlDatadecodeDiagnosticInd_t(0);
        break;
    case 0xE25D: // UlData::SrsReceiveRespBwvPs_t
        result = UlDatadecodeSrsReceiveRespBwvPs_t(0);
        break;
    case 0xE387: // L1Fcp::DlUlChannelsReq_t
        result = L1FcpdecodeDlUlChannelsReq_t(0);
        break;
    case 0xE391: // L1ChannelStreamer::DeregisterReq_t
        result = L1ChannelStreamerdecodeDeregisterReq_t(0);
        break;
    case 0xE392: // L1ChannelStreamer::DeregisterResp_t
        result = L1ChannelStreamerdecodeDeregisterResp_t(0);
        break;
    case 0xE393: // L1ChannelStreamer::RegisterReq_t
        result = L1ChannelStreamerdecodeRegisterReq_t(0);
        break;
    case 0xE394: // L1ChannelStreamer::RegisterResp_t
        result = L1ChannelStreamerdecodeRegisterResp_t(0);
        break;
    case 0xE395: // L1ChannelStreamer::ReceiveInd_t
        result = L1ChannelStreamerdecodeReceiveInd_t(0);
        break;
    case 0xE396: // L1ChannelStreamer::SendReq_t
        result = L1ChannelStreamerdecodeSendReq_t(0);
        break;
    case 0xE3E4: // L1Call::NrUlTestReportInd_t
        result = L1CalldecodeNrUlTestReportInd_t(0);
        break;
    case 0xE3E5: // L1Call::LTEUlTestReportInd_t
        result = L1CalldecodeLTEUlTestReportInd_t(0);
        break;
    case 0xe3c3: // L1MacSec::createConfigurationProfileReq_t
        result = L1MacSecdecodecreateConfigurationProfileReq_t(0);
        break;
    case 0xe3c4: // L1MacSec::createConfigurationProfileResp_t
        result = L1MacSecdecodecreateConfigurationProfileResp_t(0);
        break;
    case 0xe3c5: // L1MacSec::connectionSetupReq_t
        result = L1MacSecdecodeconnectionSetupReq_t(0);
        break;
    case 0xe3c6: // L1MacSec::connectionSetupResp_t
        result = L1MacSecdecodeconnectionSetupResp_t(0);
        break;
    case 0xe3c7: // L1MacSec::connectionDeleteReq_t
        result = L1MacSecdecodeconnectionDeleteReq_t(0);
        break;
    case 0xe3c8: // L1MacSec::connectionDeleteResp_t
        result = L1MacSecdecodeconnectionDeleteResp_t(0);
        break;
    case 0xe3c9: // L1MacSec::connectionStatusInd_t
        result = L1MacSecdecodeconnectionStatusInd_t(0);
        break;
    case 0xe3cc: // L1MacSec::counterSubscribeReq_t
        result = L1MacSecdecodecounterSubscribeReq_t(0);
        break;
    case 0xe3cd: // L1MacSec::counterSubscribeResp_t
        result = L1MacSecdecodecounterSubscribeResp_t(0);
        break;
    case 0xe3ce: // L1MacSec::counterInd_t
        result = L1MacSecdecodecounterInd_t(0);
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
    case 0xe3f0: // L1Config::SwConfigurationReq_t
        buf.static = new Uint8Array(16);
        L1ConfigencodeSwConfigurationReq_t(l2l1, buf, 0);
        break;
    case 0xe3f1: // L1Config::SwConfigurationResp_t
        buf.static = new Uint8Array(12);
        L1ConfigencodeSwConfigurationResp_t(l2l1, buf, 0);
        break;
    case 0xe3f2: // L1Config::AutohealingActivationReq_t
        buf.static = new Uint8Array(8);
        L1ConfigencodeAutohealingActivationReq_t(l2l1, buf, 0);
        break;
    case 0xe3f3: // L1Config::AutohealingActivationResp_t
        buf.static = new Uint8Array(8);
        L1ConfigencodeAutohealingActivationResp_t(l2l1, buf, 0);
        break;
    case 0x0a00: // L1Cpri::AlarmInd_t
        buf.static = new Uint8Array(8);
        L1CpriencodeAlarmInd_t(l2l1, buf, 0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(336);
        L1CpriencodeConfigureLinksReq_t(l2l1, buf, 0);
        break;
    case 0x0a02: // L1Cpri::ConfigureLinksResp_t
        buf.static = new Uint8Array(1);
        L1CpriencodeConfigureLinksResp_t(l2l1, buf, 0);
        break;
    case 0x0a05: // L1Cpri::SetOutputReq_t
        buf.static = new Uint8Array(2);
        L1CpriencodeSetOutputReq_t(l2l1, buf, 0);
        break;
    case 0x0a06: // L1Cpri::SetOutputResp_t
        buf.static = new Uint8Array(3);
        L1CpriencodeSetOutputResp_t(l2l1, buf, 0);
        break;
    case 0x0a07: // L1Cpri::StateInd_t
        buf.static = new Uint8Array(2);
        L1CpriencodeStateInd_t(l2l1, buf, 0);
        break;
    case 0x0a08: // L1Cpri::SubscribeReq_t
        buf.static = new Uint8Array(8);
        L1CpriencodeSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0x0a09: // L1Cpri::SubscribeResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0x0a0a: // L1Cpri::DiscoveryInd_t
        buf.static = new Uint8Array(72);
        L1CpriencodeDiscoveryInd_t(l2l1, buf, 0);
        break;
    case 0x0a0e: // L1Cpri::DelayConfigResp_t
        buf.static = new Uint8Array(2);
        L1CpriencodeDelayConfigResp_t(l2l1, buf, 0);
        break;
    case 0x0a0f: // L1Cpri::GetLinkParamReq_t
        buf.static = new Uint8Array(4);
        L1CpriencodeGetLinkParamReq_t(l2l1, buf, 0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        buf.static = new Uint8Array(72);
        L1CpriencodeSetDiscoveryReq_t(l2l1, buf, 0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        buf.static = new Uint8Array(2);
        L1CpriencodeSetDiscoveryResp_t(l2l1, buf, 0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        buf.static = new Uint8Array(2);
        L1CpriencodeSetLinkPropertiesResp_t(l2l1, buf, 0);
        break;
    case 0x0A43: // L1Cpri::ConfigureAxcInfoResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeConfigureAxcInfoResp_t(l2l1, buf, 0);
        break;
    case 0x0A44: // L1Cpri::DeleteAxcInfoReq_t
        buf.static = new Uint8Array(8);
        L1CpriencodeDeleteAxcInfoReq_t(l2l1, buf, 0);
        break;
    case 0x0A45: // L1Cpri::DeleteAxcInfoResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeDeleteAxcInfoResp_t(l2l1, buf, 0);
        break;
    case 0x0a48: // L1Cpri::ConfigureVsbReq_t
        buf.static = new Uint8Array(16);
        L1CpriencodeConfigureVsbReq_t(l2l1, buf, 0);
        break;
    case 0x0a49: // L1Cpri::ConfigureVsbResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeConfigureVsbResp_t(l2l1, buf, 0);
        break;
    case 0x0a4A: // L1Cpri::SubscribeVsbChangesReq_t
        buf.static = new Uint8Array(16);
        L1CpriencodeSubscribeVsbChangesReq_t(l2l1, buf, 0);
        break;
    case 0x0a4B: // L1Cpri::SubscribeVsbChangesResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeSubscribeVsbChangesResp_t(l2l1, buf, 0);
        break;
    case 0x0a4C: // L1Cpri::VsbDataInd_t
        buf.static = new Uint8Array(268);
        L1CpriencodeVsbDataInd_t(l2l1, buf, 0);
        break;
    case 0x0a4D: // L1Cpri::SendVsbDataReq_t
        buf.static = new Uint8Array(272);
        L1CpriencodeSendVsbDataReq_t(l2l1, buf, 0);
        break;
    case 0x0a4E: // L1Cpri::SendVsbDataResp_t
        buf.static = new Uint8Array(8);
        L1CpriencodeSendVsbDataResp_t(l2l1, buf, 0);
        break;
    case 0x0a4F: // L1Cpri::SetLinkPropertiesReq_t
        buf.static = new Uint8Array(16);
        L1CpriencodeSetLinkPropertiesReq_t(l2l1, buf, 0);
        break;
    case 0xe301: // L1Cpri::ConfigureAxcInfoReq_t
        buf.static = new Uint8Array(12);
        L1CpriencodeConfigureAxcInfoReq_t(l2l1, buf, 0);
        break;
    case 0xe311: // L1Cpri::DelayConfigReq_t
        buf.static = new Uint8Array(32);
        L1CpriencodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0xe312: // L1Cpri::GetLinkParamResp_t
        buf.static = new Uint8Array(28);
        L1CpriencodeGetLinkParamResp_t(l2l1, buf, 0);
        break;
    case 0xe313: // L1Cpri::FrameSyncInd_t
        buf.static = new Uint8Array(2);
        L1CpriencodeFrameSyncInd_t(l2l1, buf, 0);
        break;
    case 0xe314: // L1Cpri::T14Ind_t
        buf.static = new Uint8Array(8);
        L1CpriencodeT14Ind_t(l2l1, buf, 0);
        break;
    case 0xE11C: // DlPool::AddressReq_t
        buf.static = new Uint8Array(4);
        DlPoolencodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xE11D: // DlPool::AddressResp_t
        buf.static = new Uint8Array(8);
        DlPoolencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE11E: // DlPool::BbResourceReconfReq_t
        buf.static = new Uint8Array(24);
        DlPoolencodeBbResourceReconfReq_t(l2l1, buf, 0);
        break;
    case 0xE11F: // DlPool::BbResourceReconfResp_t
        buf.static = new Uint8Array(12);
        DlPoolencodeBbResourceReconfResp_t(l2l1, buf, 0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        DlCellencodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        DlCellencodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xE117: // DlCell::SetupReq_t
        buf.static = new Uint8Array(828);
        DlCellencodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0xE119: // DlCell::SetupResp_t
        buf.static = new Uint8Array(16);
        DlCellencodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x0001: // L1::PingPongReq_t
        buf.static = new Uint8Array(4);
        L1encodePingPongReq_t(l2l1, buf, 0);
        break;
    case 0x0002: // L1::EchoReq_t
        buf.static = new Uint8Array(64);
        L1encodeEchoReq_t(l2l1, buf, 0);
        break;
    case 0x0003: // L1::EchoResp_t
        buf.static = new Uint8Array(64);
        L1encodeEchoResp_t(l2l1, buf, 0);
        break;
    case 0x0004: // L1::LoopReq_t
        buf.static = new Uint8Array(24);
        L1encodeLoopReq_t(l2l1, buf, 0);
        break;
    case 0x0005: // L1::UlMeasReq_t
        buf.static = new Uint8Array(12);
        L1encodeUlMeasReq_t(l2l1, buf, 0);
        break;
    case 0x0006: // L1::WakeupReq_t
        buf.static = new Uint8Array(4);
        L1encodeWakeupReq_t(l2l1, buf, 0);
        break;
    case 0x0007: // L1::StartupLoopReq_t
        buf.static = new Uint8Array(8);
        L1encodeStartupLoopReq_t(l2l1, buf, 0);
        break;
    case 0x0008: // L1::SnapshotFileCreationReq_t
        buf.static = new Uint8Array(4);
        L1encodeSnapshotFileCreationReq_t(l2l1, buf, 0);
        break;
    case 0x0009: // L1::LatencyEventReq_t
        buf.static = new Uint8Array(4);
        L1encodeLatencyEventReq_t(l2l1, buf, 0);
        break;
    case 0x000A: // L1::DmaEndInd_t
        buf.static = new Uint8Array(4);
        L1encodeDmaEndInd_t(l2l1, buf, 0);
        break;
    case 0x000B: // L1::LaWakeupReq_t
        buf.static = new Uint8Array(12);
        L1encodeLaWakeupReq_t(l2l1, buf, 0);
        break;
    case 0x000C: // L1::DmaStartTestReq_t
        buf.static = new Uint8Array(4);
        L1encodeDmaStartTestReq_t(l2l1, buf, 0);
        break;
    case 0x000D: // L1::NrtRxSubcellResetReq_t
        buf.static = new Uint8Array(1);
        L1encodeNrtRxSubcellResetReq_t(l2l1, buf, 0);
        break;
    case 0x000E: // L1::SyncInd_t
        buf.static = new Uint8Array(8);
        L1encodeSyncInd_t(l2l1, buf, 0);
        break;
    case 0xE002: // L1::TestModeConfigReq_t
        buf.static = new Uint8Array(1);
        L1encodeTestModeConfigReq_t(l2l1, buf, 0);
        break;
    case 0xE003: // L1::TestModeConfigResp_t
        buf.static = new Uint8Array(1);
        L1encodeTestModeConfigResp_t(l2l1, buf, 0);
        break;
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        buf.static = new Uint8Array(24);
        DlDataencodePdschPayloadTbSendReq_t(l2l1, buf, 0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        buf.static = new Uint8Array(20);
        DlDataencodeSlotTypeReq_t(l2l1, buf, 0);
        break;
    case 0xE101: // DlData::PatternConfigReq_t
        buf.static = new Uint8Array(240);
        DlDataencodePatternConfigReq_t(l2l1, buf, 0);
        break;
    case 0xE10C: // DlData::FastAntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        DlDataencodeFastAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0xE10F: // DlData::SsBlockSendReq_t
        buf.static = new Uint8Array(28);
        DlDataencodeSsBlockSendReq_t(l2l1, buf, 0);
        break;
    case 0xE110: // DlData::CsiRsSendReq_t
        buf.static = new Uint8Array(16);
        DlDataencodeCsiRsSendReq_t(l2l1, buf, 0);
        break;
    case 0xE111: // DlData::EmptySendReq_t
        buf.static = new Uint8Array(6);
        DlDataencodeEmptySendReq_t(l2l1, buf, 0);
        break;
    case 0xE112: // DlData::AddressResp_t
        buf.static = new Uint8Array(44);
        DlDataencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE113: // DlData::PdcchSendReq_t
        buf.static = new Uint8Array(16);
        DlDataencodePdcchSendReq_t(l2l1, buf, 0);
        break;
    case 0xE115: // DlData::FastAntennaSnapshotReq_t
        buf.static = new Uint8Array(44);
        DlDataencodeFastAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0xE118: // DlData::PdschSendReq_t
        buf.static = new Uint8Array(8);
        DlDataencodePdschSendReq_t(l2l1, buf, 0);
        break;
    case 0xE11A: // DlData::AddressReq_t
        buf.static = new Uint8Array(8);
        DlDataencodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xE11B: // DlData::DiagnosticInd_t
        buf.static = new Uint8Array(1);
        DlDataencodeDiagnosticInd_t(l2l1, buf, 0);
        break;
    case 0xE120: // DlData::RimRsSendReq_t
        buf.static = new Uint8Array(36);
        DlDataencodeRimRsSendReq_t(l2l1, buf, 0);
        break;
    case 0x0a30: // L1ECpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(28);
        L1ECpriencodeConfigureLinksReq_t(l2l1, buf, 0);
        break;
    case 0x0a31: // L1ECpri::ConfigureLinksResp_t
        buf.static = new Uint8Array(1);
        L1ECpriencodeConfigureLinksResp_t(l2l1, buf, 0);
        break;
    case 0x0a32: // L1ECpri::SubscribeReq_t
        buf.static = new Uint8Array(8);
        L1ECpriencodeSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0x0a33: // L1ECpri::SubscribeResp_t
        buf.static = new Uint8Array(8);
        L1ECpriencodeSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0x0a34: // L1ECpri::SetOutputReq_t
        buf.static = new Uint8Array(2);
        L1ECpriencodeSetOutputReq_t(l2l1, buf, 0);
        break;
    case 0x0a35: // L1ECpri::SetOutputResp_t
        buf.static = new Uint8Array(3);
        L1ECpriencodeSetOutputResp_t(l2l1, buf, 0);
        break;
    case 0x0a36: // L1ECpri::StateInd_t
        buf.static = new Uint8Array(2);
        L1ECpriencodeStateInd_t(l2l1, buf, 0);
        break;
    case 0x0a38: // L1ECpri::DelayConfigResp_t
        buf.static = new Uint8Array(2);
        L1ECpriencodeDelayConfigResp_t(l2l1, buf, 0);
        break;
    case 0x0a39: // L1ECpri::ConfigureTransportReq_t
        buf.static = new Uint8Array(16);
        L1ECpriencodeConfigureTransportReq_t(l2l1, buf, 0);
        break;
    case 0x0a3a: // L1ECpri::ConfigureTransportResp_t
        buf.static = new Uint8Array(2);
        L1ECpriencodeConfigureTransportResp_t(l2l1, buf, 0);
        break;
    case 0x0a3b: // L1ECpri::InitialDelayMeasReq_t
        buf.static = new Uint8Array(16);
        L1ECpriencodeInitialDelayMeasReq_t(l2l1, buf, 0);
        break;
    case 0x0a3c: // L1ECpri::InitialDelayMeasResp_t
        buf.static = new Uint8Array(12);
        L1ECpriencodeInitialDelayMeasResp_t(l2l1, buf, 0);
        break;
    case 0x0a3d: // L1ECpri::DelayMeasInd_t
        buf.static = new Uint8Array(12);
        L1ECpriencodeDelayMeasInd_t(l2l1, buf, 0);
        break;
    case 0x0a3e: // L1ECpri::ConfigureMeasurementsReq_t
        buf.static = new Uint8Array(8);
        L1ECpriencodeConfigureMeasurementsReq_t(l2l1, buf, 0);
        break;
    case 0x0a3f: // L1ECpri::ConfigureMeasurementsResp_t
        buf.static = new Uint8Array(1);
        L1ECpriencodeConfigureMeasurementsResp_t(l2l1, buf, 0);
        break;
    case 0x0a40: // L1ECpri::MsgRcvCountersInd_t
        buf.static = new Uint8Array(1016);
        L1ECpriencodeMsgRcvCountersInd_t(l2l1, buf, 0);
        break;
    case 0xe305: // L1ECpri::API2ConfigureTransportReq_t
        buf.static = new Uint8Array(1036);
        L1ECpriencodeAPI2ConfigureTransportReq_t(l2l1, buf, 0);
        break;
    case 0xe306: // L1ECpri::API2ConfigureTransportResp_t
        buf.static = new Uint8Array(8);
        L1ECpriencodeAPI2ConfigureTransportResp_t(l2l1, buf, 0);
        break;
    case 0xe307: // L1ECpri::API2DeleteTransportReq_t
        buf.static = new Uint8Array(16);
        L1ECpriencodeAPI2DeleteTransportReq_t(l2l1, buf, 0);
        break;
    case 0xe308: // L1ECpri::API2DeleteTransportResp_t
        buf.static = new Uint8Array(8);
        L1ECpriencodeAPI2DeleteTransportResp_t(l2l1, buf, 0);
        break;
    case 0xe309: // L1ECpri::DelayConfigReq_t
        buf.static = new Uint8Array(44);
        L1ECpriencodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0x0a65: // L1Log::AntennaSnapshotReq_t
        buf.static = new Uint8Array(8);
        L1LogencodeAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        L1LogencodeAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        buf.static = new Uint8Array(108);
        L1LogencodeShowTraceListResp_t(l2l1, buf, 0);
        break;
    case 0xe3b0: // L1Log::TraceReq_t
        buf.static = new Uint8Array(88);
        L1LogencodeTraceReq_t(l2l1, buf, 0);
        break;
    case 0xe3b1: // L1Log::ShowTraceListReq_t
        buf.static = new Uint8Array(8);
        L1LogencodeShowTraceListReq_t(l2l1, buf, 0);
        break;
    case 0xe3b3: // L1Log::AntennaSnapshotInd_t
        buf.static = new Uint8Array(5904);
        L1LogencodeAntennaSnapshotInd_t(l2l1, buf, 0);
        break;
    case 0xe3b4: // L1Log::TraceInd_t
        buf.static = new Uint8Array(1416);
        L1LogencodeTraceInd_t(l2l1, buf, 0);
        break;
    case 0xe3b5: // L1Log::TraceResp_t
        buf.static = new Uint8Array(4);
        L1LogencodeTraceResp_t(l2l1, buf, 0);
        break;
    case 0xe3b6: // L1Log::SuspiciousEventInd_t
        buf.static = new Uint8Array(12);
        L1LogencodeSuspiciousEventInd_t(l2l1, buf, 0);
        break;
    case 0xe3b7: // L1Log::AntennaSnapshotConfigurationResp_t
        buf.static = new Uint8Array(1);
        L1LogencodeAntennaSnapshotConfigurationResp_t(l2l1, buf, 0);
        break;
    case 0xe3b8: // L1Log::AntennaSnapshotConfigurationReq_t
        buf.static = new Uint8Array(128);
        L1LogencodeAntennaSnapshotConfigurationReq_t(l2l1, buf, 0);
        break;
    case 0xe3bf: // L1Log::OverloadStatusInd_t
        buf.static = new Uint8Array(4);
        L1LogencodeOverloadStatusInd_t(l2l1, buf, 0);
        break;
    case 0xe3c0: // L1Log::ActTraceOverloadReq_t
        buf.static = new Uint8Array(1);
        L1LogencodeActTraceOverloadReq_t(l2l1, buf, 0);
        break;
    case 0xe3c1: // L1Log::ActTraceOverloadResp_t
        buf.static = new Uint8Array(1);
        L1LogencodeActTraceOverloadResp_t(l2l1, buf, 0);
        break;
    case 0xe3c2: // L1Log::AntennaSnapshotStopInd_t
        buf.static = new Uint8Array(56);
        L1LogencodeAntennaSnapshotStopInd_t(l2l1, buf, 0);
        break;
    case 0xE3B9: // L1Status::AutohealingSubscribeReq_t
        buf.static = new Uint8Array(8);
        L1StatusencodeAutohealingSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0xE3BA: // L1Status::AutohealingSubscribeResp_t
        buf.static = new Uint8Array(8);
        L1StatusencodeAutohealingSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0xE3BB: // L1Status::AutohealingStatusInd_t
        buf.static = new Uint8Array(36);
        L1StatusencodeAutohealingStatusInd_t(l2l1, buf, 0);
        break;
    case 0xd220: // SyncM::startPtpReq_t
        buf.static = new Uint8Array(80);
        SyncMencodestartPtpReq_t(l2l1, buf, 0);
        break;
    case 0xd221: // SyncM::startPtpResp_t
        buf.static = new Uint8Array(1);
        SyncMencodestartPtpResp_t(l2l1, buf, 0);
        break;
    case 0xd222: // SyncM::updatePtpConfigReq_t
        buf.static = new Uint8Array(48);
        SyncMencodeupdatePtpConfigReq_t(l2l1, buf, 0);
        break;
    case 0xd223: // SyncM::updatePtpConfigResp_t
        buf.static = new Uint8Array(1);
        SyncMencodeupdatePtpConfigResp_t(l2l1, buf, 0);
        break;
    case 0xd224: // SyncM::startSyncEReq_t
        buf.static = new Uint8Array(20);
        SyncMencodestartSyncEReq_t(l2l1, buf, 0);
        break;
    case 0xd225: // SyncM::startSyncEResp_t
        buf.static = new Uint8Array(1);
        SyncMencodestartSyncEResp_t(l2l1, buf, 0);
        break;
    case 0xd226: // SyncM::updateSyncEConfigReq_t
        buf.static = new Uint8Array(20);
        SyncMencodeupdateSyncEConfigReq_t(l2l1, buf, 0);
        break;
    case 0xd227: // SyncM::updateSyncEConfigResp_t
        buf.static = new Uint8Array(1);
        SyncMencodeupdateSyncEConfigResp_t(l2l1, buf, 0);
        break;
    case 0xd228: // SyncM::getSyncEStatusReq_t
        buf.static = new Uint8Array(1);
        SyncMencodegetSyncEStatusReq_t(l2l1, buf, 0);
        break;
    case 0xd229: // SyncM::getSyncEStatusResp_t
        buf.static = new Uint8Array(56);
        SyncMencodegetSyncEStatusResp_t(l2l1, buf, 0);
        break;
    case 0xd22a: // SyncM::getPtpStatusReq_t
        buf.static = new Uint8Array(1);
        SyncMencodegetPtpStatusReq_t(l2l1, buf, 0);
        break;
    case 0xd22b: // SyncM::getPtpStatusResp_t
        buf.static = new Uint8Array(200);
        SyncMencodegetPtpStatusResp_t(l2l1, buf, 0);
        break;
    case 0xd22c: // SyncM::stopSyncEReq_t
        buf.static = new Uint8Array(1);
        SyncMencodestopSyncEReq_t(l2l1, buf, 0);
        break;
    case 0xd22d: // SyncM::stopSyncEResp_t
        buf.static = new Uint8Array(1);
        SyncMencodestopSyncEResp_t(l2l1, buf, 0);
        break;
    case 0xd22e: // SyncM::stopPtpReq_t
        buf.static = new Uint8Array(1);
        SyncMencodestopPtpReq_t(l2l1, buf, 0);
        break;
    case 0xd22f: // SyncM::stopPtpResp_t
        buf.static = new Uint8Array(1);
        SyncMencodestopPtpResp_t(l2l1, buf, 0);
        break;
    case 0xd230: // SyncM::statusInd_t
        buf.static = new Uint8Array(1);
        SyncMencodestatusInd_t(l2l1, buf, 0);
        break;
    case 0xe3bc: // L1SyncSlave::startPtpSlaveReq_t
        buf.static = new Uint8Array(56);
        L1SyncSlaveencodestartPtpSlaveReq_t(l2l1, buf, 0);
        break;
    case 0xe3bd: // L1SyncSlave::startPtpSlaveResp_t
        buf.static = new Uint8Array(8);
        L1SyncSlaveencodestartPtpSlaveResp_t(l2l1, buf, 0);
        break;
    case 0xe3be: // L1SyncSlave::syncSlaveStatusInd_t
        buf.static = new Uint8Array(2);
        L1SyncSlaveencodesyncSlaveStatusInd_t(l2l1, buf, 0);
        break;
    case 0xe3ca: // L1SyncSlave::getPtpSlaveStatusReq_t
        buf.static = new Uint8Array(8);
        L1SyncSlaveencodegetPtpSlaveStatusReq_t(l2l1, buf, 0);
        break;
    case 0xe3cb: // L1SyncSlave::getPtpSlaveStatusResp_t
        buf.static = new Uint8Array(112);
        L1SyncSlaveencodegetPtpSlaveStatusResp_t(l2l1, buf, 0);
        break;
    case 0xE259: // UlPool::AddressReq_t
        buf.static = new Uint8Array(4);
        UlPoolencodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xE25A: // UlPool::AddressResp_t
        buf.static = new Uint8Array(8);
        UlPoolencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE25B: // UlPool::BbResourceReconfReq_t
        buf.static = new Uint8Array(24);
        UlPoolencodeBbResourceReconfReq_t(l2l1, buf, 0);
        break;
    case 0xE25C: // UlPool::BbResourceReconfResp_t
        buf.static = new Uint8Array(12);
        UlPoolencodeBbResourceReconfResp_t(l2l1, buf, 0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        UlCellencodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        UlCellencodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xE253: // UlCell::SetupReq_t
        buf.static = new Uint8Array(300);
        UlCellencodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0xE254: // UlCell::SetupResp_t
        buf.static = new Uint8Array(16);
        UlCellencodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0xE239: // UlData::PuschReceiveRespLo_t
        buf.static = new Uint8Array(32);
        UlDataencodePuschReceiveRespLo_t(l2l1, buf, 0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(16);
        UlDataencodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0xE200: // UlData::PuschReceiveRespHarqD_t
        buf.static = new Uint8Array(16);
        UlDataencodePuschReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0xE208: // UlData::PucchReceiveRespHarqD_t
        buf.static = new Uint8Array(16);
        UlDataencodePucchReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0xE20B: // UlData::PuschReceiveRespHarqU_t
        buf.static = new Uint8Array(16);
        UlDataencodePuschReceiveRespHarqU_t(l2l1, buf, 0);
        break;
    case 0xE21C: // UlData::FastAntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        UlDataencodeFastAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0xE226: // UlData::PucchReceiveReq_t
        buf.static = new Uint8Array(20);
        UlDataencodePucchReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE229: // UlData::EmptyReceiveReq_t
        buf.static = new Uint8Array(6);
        UlDataencodeEmptyReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE231: // UlData::PrachReceiveReq_t
        buf.static = new Uint8Array(12);
        UlDataencodePrachReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE235: // UlData::FastAntennaSnapshotReq_t
        buf.static = new Uint8Array(44);
        UlDataencodeFastAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0xE237: // UlData::SrsReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlDataencodeSrsReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE24B: // UlData::PuschReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlDataencodePuschReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE24C: // UlData::PucchReceiveRespPs_t
        buf.static = new Uint8Array(16);
        UlDataencodePucchReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE24D: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(16);
        UlDataencodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0xE24E: // UlData::RimReceiveReq_t
        buf.static = new Uint8Array(16);
        UlDataencodeRimReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE24F: // UlData::RimReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlDataencodeRimReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0xE250: // UlData::AddressResp_t
        buf.static = new Uint8Array(32);
        UlDataencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0xE251: // UlData::PuschReceiveReq_t
        buf.static = new Uint8Array(28);
        UlDataencodePuschReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE255: // UlData::SrsReceiveReq_t
        buf.static = new Uint8Array(24);
        UlDataencodeSrsReceiveReq_t(l2l1, buf, 0);
        break;
    case 0xE256: // UlData::SrsReceiveRespBmPs_t
        buf.static = new Uint8Array(16);
        UlDataencodeSrsReceiveRespBmPs_t(l2l1, buf, 0);
        break;
    case 0xE257: // UlData::AddressReq_t
        buf.static = new Uint8Array(12);
        UlDataencodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0xE258: // UlData::DiagnosticInd_t
        buf.static = new Uint8Array(1);
        UlDataencodeDiagnosticInd_t(l2l1, buf, 0);
        break;
    case 0xE25D: // UlData::SrsReceiveRespBwvPs_t
        buf.static = new Uint8Array(8);
        UlDataencodeSrsReceiveRespBwvPs_t(l2l1, buf, 0);
        break;
    case 0xE387: // L1Fcp::DlUlChannelsReq_t
        buf.static = new Uint8Array(28);
        L1FcpencodeDlUlChannelsReq_t(l2l1, buf, 0);
        break;
    case 0xE391: // L1ChannelStreamer::DeregisterReq_t
        buf.static = new Uint8Array(4);
        L1ChannelStreamerencodeDeregisterReq_t(l2l1, buf, 0);
        break;
    case 0xE392: // L1ChannelStreamer::DeregisterResp_t
        buf.static = new Uint8Array(8);
        L1ChannelStreamerencodeDeregisterResp_t(l2l1, buf, 0);
        break;
    case 0xE393: // L1ChannelStreamer::RegisterReq_t
        buf.static = new Uint8Array(8);
        L1ChannelStreamerencodeRegisterReq_t(l2l1, buf, 0);
        break;
    case 0xE394: // L1ChannelStreamer::RegisterResp_t
        buf.static = new Uint8Array(12);
        L1ChannelStreamerencodeRegisterResp_t(l2l1, buf, 0);
        break;
    case 0xE395: // L1ChannelStreamer::ReceiveInd_t
        buf.static = new Uint8Array(20);
        L1ChannelStreamerencodeReceiveInd_t(l2l1, buf, 0);
        break;
    case 0xE396: // L1ChannelStreamer::SendReq_t
        buf.static = new Uint8Array(20);
        L1ChannelStreamerencodeSendReq_t(l2l1, buf, 0);
        break;
    case 0xE3E4: // L1Call::NrUlTestReportInd_t
        buf.static = new Uint8Array(80);
        L1CallencodeNrUlTestReportInd_t(l2l1, buf, 0);
        break;
    case 0xE3E5: // L1Call::LTEUlTestReportInd_t
        buf.static = new Uint8Array(32);
        L1CallencodeLTEUlTestReportInd_t(l2l1, buf, 0);
        break;
    case 0xe3c3: // L1MacSec::createConfigurationProfileReq_t
        buf.static = new Uint8Array(44);
        L1MacSecencodecreateConfigurationProfileReq_t(l2l1, buf, 0);
        break;
    case 0xe3c4: // L1MacSec::createConfigurationProfileResp_t
        buf.static = new Uint8Array(8);
        L1MacSecencodecreateConfigurationProfileResp_t(l2l1, buf, 0);
        break;
    case 0xe3c5: // L1MacSec::connectionSetupReq_t
        buf.static = new Uint8Array(108);
        L1MacSecencodeconnectionSetupReq_t(l2l1, buf, 0);
        break;
    case 0xe3c6: // L1MacSec::connectionSetupResp_t
        buf.static = new Uint8Array(128);
        L1MacSecencodeconnectionSetupResp_t(l2l1, buf, 0);
        break;
    case 0xe3c7: // L1MacSec::connectionDeleteReq_t
        buf.static = new Uint8Array(12);
        L1MacSecencodeconnectionDeleteReq_t(l2l1, buf, 0);
        break;
    case 0xe3c8: // L1MacSec::connectionDeleteResp_t
        buf.static = new Uint8Array(12);
        L1MacSecencodeconnectionDeleteResp_t(l2l1, buf, 0);
        break;
    case 0xe3c9: // L1MacSec::connectionStatusInd_t
        buf.static = new Uint8Array(104);
        L1MacSecencodeconnectionStatusInd_t(l2l1, buf, 0);
        break;
    case 0xe3cc: // L1MacSec::counterSubscribeReq_t
        buf.static = new Uint8Array(32);
        L1MacSecencodecounterSubscribeReq_t(l2l1, buf, 0);
        break;
    case 0xe3cd: // L1MacSec::counterSubscribeResp_t
        buf.static = new Uint8Array(8);
        L1MacSecencodecounterSubscribeResp_t(l2l1, buf, 0);
        break;
    case 0xe3ce: // L1MacSec::counterInd_t
        buf.static = new Uint8Array(16);
        L1MacSecencodecounterInd_t(l2l1, buf, 0);
        break;

    default: throw new Error(`Unknown message type ${l2l1.message}`);
    }

    const result = new Uint8Array(buf.static.length + buf.dynamic.getLength());
    result.set(buf.static);
    result.set(buf.dynamic.getBuf(), buf.static.length);

    return result
}

// array types encoders/decoders
function encodeStaticFixedSizedArray_uint8_256(arr, buf, off) {
    for (let i = 0; i < 256; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_256(offset) {
    const result = [];
    for (let i = 0; i < 256; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_64(arr, buf, off) {
    for (let i = 0; i < 64; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_64(offset) {
    const result = [];
    for (let i = 0; i < 64; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_14(arr, buf, off) {
    for (let i = 0; i < 14; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_14(offset) {
    const result = [];
    for (let i = 0; i < 14; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_4(arr, buf, off) {
    for (let i = 0; i < 4; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_4(offset) {
    const result = [];
    for (let i = 0; i < 4; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_18(arr, buf, off) {
    for (let i = 0; i < 18; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_18(offset) {
    const result = [];
    for (let i = 0; i < 18; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_3(arr, buf, off) {
    for (let i = 0; i < 3; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_3(offset) {
    const result = [];
    for (let i = 0; i < 3; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_7(arr, buf, off) {
    for (let i = 0; i < 7; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_7(offset) {
    const result = [];
    for (let i = 0; i < 7; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_16(arr, buf, off) {
    for (let i = 0; i < 16; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_16(offset) {
    const result = [];
    for (let i = 0; i < 16; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_l1SubPool_t_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        DlPoolencodel1SubPool_t(arr[i], buf, off + i * 6);
}
function decodeStaticFixedSizedArray_l1SubPool_t_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(DlPooldecodel1SubPool_t(offset + i * 6));
    return result;
}
function encodeStaticFixedSizedArray_uint16_112(arr, buf, off) {
    for (let i = 0; i < 112; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_112(offset) {
    const result = [];
    for (let i = 0; i < 112; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_224(arr, buf, off) {
    for (let i = 0; i < 224; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_224(offset) {
    const result = [];
    for (let i = 0; i < 224; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_4(arr, buf, off) {
    for (let i = 0; i < 4; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_4(offset) {
    const result = [];
    for (let i = 0; i < 4; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_12(arr, buf, off) {
    for (let i = 0; i < 12; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_12(offset) {
    const result = [];
    for (let i = 0; i < 12; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_5(arr, buf, off) {
    for (let i = 0; i < 5; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_5(offset) {
    const result = [];
    for (let i = 0; i < 5; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint32_4(arr, buf, off) {
    for (let i = 0; i < 4; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_uint32_4(offset) {
    const result = [];
    for (let i = 0; i < 4; i++)
        result.push(l2l1_getU32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_uint32_12(arr, buf, off) {
    for (let i = 0; i < 12; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_uint32_12(offset) {
    const result = [];
    for (let i = 0; i < 12; i++)
        result.push(l2l1_getU32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_uint32_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_uint32_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getU32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_PatternIdPolListPerSymbol_t_14(arr, buf, off) {
    for (let i = 0; i < 14; i++)
        DlDataencodePatternIdPolListPerSymbol_t(arr[i], buf, off + i * 16);
}
function decodeStaticFixedSizedArray_PatternIdPolListPerSymbol_t_14(offset) {
    const result = [];
    for (let i = 0; i < 14; i++)
        result.push(DlDatadecodePatternIdPolListPerSymbol_t(offset + i * 16));
    return result;
}
function encodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l1_commonencodeFastAntennaSnapshotEventsList_t(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l1_commondecodeFastAntennaSnapshotEventsList_t(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_uint64_4(arr, buf, off) {
    for (let i = 0; i < 4; i++)
        l2l1_putU64(arr[i], buf, off + i * 8);
}
function decodeStaticFixedSizedArray_uint64_4(offset) {
    const result = [];
    for (let i = 0; i < 4; i++)
        result.push(l2l1_getU64(offset + i * 8));
    return result;
}
function encodeStaticFixedSizedArray_uint64_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putU64(arr[i], buf, off + i * 8);
}
function decodeStaticFixedSizedArray_uint64_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getU64(offset + i * 8));
    return result;
}
function encodeStaticFixedSizedArray_l1SubPool_t_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        UlPoolencodel1SubPool_t(arr[i], buf, off + i * 6);
}
function decodeStaticFixedSizedArray_l1SubPool_t_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(UlPooldecodel1SubPool_t(offset + i * 6));
    return result;
}
function encodeStaticFixedSizedArray_float32_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        l2l1_putF32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_float32_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(l2l1_getF32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_float32_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putF32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_float32_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getF32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_float32_5(arr, buf, off) {
    for (let i = 0; i < 5; i++)
        l2l1_putF32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_float32_5(offset) {
    const result = [];
    for (let i = 0; i < 5; i++)
        result.push(l2l1_getF32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_float32_4(arr, buf, off) {
    for (let i = 0; i < 4; i++)
        l2l1_putF32(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_float32_4(offset) {
    const result = [];
    for (let i = 0; i < 4; i++)
        result.push(l2l1_getF32(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_int16_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l2l1_putI16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_int16_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l2l1_getI16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_shortTermCfoMetric_t_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l1_commonencodeshortTermCfoMetric_t(arr[i], buf, off + i * 8);
}
function decodeStaticFixedSizedArray_shortTermCfoMetric_t_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l1_commondecodeshortTermCfoMetric_t(offset + i * 8));
    return result;
}
function encodeStaticFixedSizedArray_longTermCfoMetric_t_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l1_commonencodelongTermCfoMetric_t(arr[i], buf, off + i * 8);
}
function decodeStaticFixedSizedArray_longTermCfoMetric_t_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l1_commondecodelongTermCfoMetric_t(offset + i * 8));
    return result;
}
function encodeStaticFixedSizedArray_pucchBoundary_t_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        UlDataencodepucchBoundary_t(arr[i], buf, off + i * 6);
}
function decodeStaticFixedSizedArray_pucchBoundary_t_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(UlDatadecodepucchBoundary_t(offset + i * 6));
    return result;
}
function encodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(arr, buf, off) {
    for (let i = 0; i < 8; i++)
        l1_commonencodeFastAntennaSnapshotEventsList_t(arr[i], buf, off + i * 4);
}
function decodeStaticFixedSizedArray_FastAntennaSnapshotEventsList_t_8(offset) {
    const result = [];
    for (let i = 0; i < 8; i++)
        result.push(l1_commondecodeFastAntennaSnapshotEventsList_t(offset + i * 4));
    return result;
}
function encodeStaticFixedSizedArray_rimRssiIndex_t_14(arr, buf, off) {
    for (let i = 0; i < 14; i++)
        UlDataencoderimRssiIndex_t(arr[i], buf, off + i * 20);
}
function decodeStaticFixedSizedArray_rimRssiIndex_t_14(offset) {
    const result = [];
    for (let i = 0; i < 14; i++)
        result.push(UlDatadecoderimRssiIndex_t(offset + i * 20));
    return result;
}
function encodeStaticFixedSizedArray_macSecProfile_t_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        L1MacSecencodemacSecProfile_t(arr[i], buf, off + i * 12);
}
function decodeStaticFixedSizedArray_macSecProfile_t_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(L1MacSecdecodemacSecProfile_t(offset + i * 12));
    return result;
}
function encodeStaticVariableSizedArray_SCpriLinkItem_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 16; i++)
        L1CpriencodeSCpriLinkItem(arr[i], buf, off + i * 20);
}
function decodeStaticVariableSizedArray_SCpriLinkItem_16(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 16; i++)
        result.push(L1CpridecodeSCpriLinkItem(offset + 4 + i * 20));
    return result;
}
function encodeStaticVariableSizedArray_uint8_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 64; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_64(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 64; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_6(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 6; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_6(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 6; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_80(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 80; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_80(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 80; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_1400(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 1400; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_1400(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 1400; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_100(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 100; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_100(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 100; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_20(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 20; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_20(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 20; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint8_32(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 32; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_32(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 32; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_uint32_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 16; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticVariableSizedArray_uint32_16(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 16; i++)
        result.push(l2l1_getU32(offset + 4 + i * 4));
    return result;
}
function encodeStaticVariableSizedArray_uint32_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 4; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticVariableSizedArray_uint32_4(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 4; i++)
        result.push(l2l1_getU32(offset + 4 + i * 4));
    return result;
}
function encodeStaticVariableSizedArray_uint32_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 2; i++)
        l2l1_putU32(arr[i], buf, off + i * 4);
}
function decodeStaticVariableSizedArray_uint32_2(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 2; i++)
        result.push(l2l1_getU32(offset + 4 + i * 4));
    return result;
}
function encodeStaticVariableSizedArray_SECpriLinkItem_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 16; i++)
        L1ECpriencodeSECpriLinkItem_t(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_SECpriLinkItem_t_16(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 16; i++)
        result.push(L1ECpridecodeSECpriLinkItem_t(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_SMsgRcvCountersItem_18(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 18; i++)
        L1ECpriencodeSMsgRcvCountersItem(arr[i], buf, off + i * 56);
}
function decodeStaticVariableSizedArray_SMsgRcvCountersItem_18(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 18; i++)
        result.push(L1ECpridecodeSMsgRcvCountersItem(offset + 4 + i * 56));
    return result;
}
function encodeStaticVariableSizedArray_API2ceAxCconfig_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 64; i++)
        L1ECpriencodeAPI2ceAxCconfig_t(arr[i], buf, off + i * 16);
}
function decodeStaticVariableSizedArray_API2ceAxCconfig_t_64(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 64; i++)
        result.push(L1ECpridecodeAPI2ceAxCconfig_t(offset + 4 + i * 16));
    return result;
}
function encodeStaticVariableSizedArray_antennaSnapshotFile_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 64; i++)
        L1LogencodeantennaSnapshotFile_t(arr[i], buf, off + i * 92);
}
function decodeStaticVariableSizedArray_antennaSnapshotFile_t_64(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 64; i++)
        result.push(L1LogdecodeantennaSnapshotFile_t(offset + 4 + i * 92));
    return result;
}
function encodeStaticVariableSizedArray_TraceReqEntry_t_10(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 10; i++)
        L1LogencodeTraceReqEntry_t(arr[i], buf, off + i * 6);
}
function decodeStaticVariableSizedArray_TraceReqEntry_t_10(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 10; i++)
        result.push(L1LogdecodeTraceReqEntry_t(offset + 4 + i * 6));
    return result;
}
function encodeStaticVariableSizedArray_uint8_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 12; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_12(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 12; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_SyncEStatus_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 12; i++)
        SyncMencodeSyncEStatus(arr[i], buf, off + i * 4);
}
function decodeStaticVariableSizedArray_SyncEStatus_12(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 12; i++)
        result.push(SyncMdecodeSyncEStatus(offset + 4 + i * 4));
    return result;
}
function encodeStaticVariableSizedArray_PtpStatus_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 12; i++)
        SyncMencodePtpStatus(arr[i], buf, off + i * 16);
}
function decodeStaticVariableSizedArray_PtpStatus_12(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 12; i++)
        result.push(SyncMdecodePtpStatus(offset + 4 + i * 16));
    return result;
}
function encodeStaticVariableSizedArray_uint8_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 12; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_12(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 12; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_ptpSlaveStatus_t_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 12; i++)
        L1SyncSlaveencodeptpSlaveStatus_t(arr[i], buf, off + i * 8);
}
function decodeStaticVariableSizedArray_ptpSlaveStatus_t_12(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 12; i++)
        result.push(L1SyncSlavedecodeptpSlaveStatus_t(offset + 4 + i * 8));
    return result;
}
function encodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1Configencodel1SubPoolConfiguration_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_l1SubPoolConfiguration_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1Configdecodel1SubPoolConfiguration_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_l1PoolConfiguration_t_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1Configencodel1PoolConfiguration_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_l1PoolConfiguration_t_2(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1Configdecodel1PoolConfiguration_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1Configencodel1SubPoolStatus_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_l1SubPoolStatus_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1Configdecodel1SubPoolStatus_t(offset));
        offset += 8;
    }

    return result;
}
function encodeDynamicVariableSizedArray_l1PoolStatus_t_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1Configencodel1PoolStatus_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_l1PoolStatus_t_2(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1Configdecodel1PoolStatus_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_configureAxcContainersReq_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1CpriencodeconfigureAxcContainersReq_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_configureAxcContainersReq_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1CpridecodeconfigureAxcContainersReq_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_configureAxcContainersResp_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1CpriencodeconfigureAxcContainersResp_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_configureAxcContainersResp_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1CpridecodeconfigureAxcContainersResp_t(offset));
        offset += 8;
    }

    return result;
}
function encodeDynamicVariableSizedArray_axcContainersDeleteReq_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1CpriencodeaxcContainersDeleteReq_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_axcContainersDeleteReq_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1CpridecodeaxcContainersDeleteReq_t(offset));
        offset += 8;
    }

    return result;
}
function encodeDynamicVariableSizedArray_axcContainersDeleteResp_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1CpriencodeaxcContainersDeleteResp_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_axcContainersDeleteResp_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1CpridecodeaxcContainersDeleteResp_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlCellencodephaseCompensationLutIndex_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(DlCelldecodephaseCompensationLutIndex_t(offset));
        offset += 448;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint16_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU16(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint16_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU16(offset));
        offset += 2;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint32_14(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU32(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint32_14(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU32(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint32_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU32(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint32_2(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU32(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint32_273(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU32(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint32_273(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU32(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        encodephaseCompensationLutIndex_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(decodephaseCompensationLutIndex_t(offset));
        offset += 448;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint8_8960(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU8(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint8_8960(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU8(offset));
        offset += 1;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint8_64000(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU8(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint8_64000(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU8(offset));
        offset += 1;
    }

    return result;
}
function encodeDynamicVariableSizedArray_DciInfo_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlDataencodeDciInfo(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_DciInfo_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(DlDatadecodeDciInfo(offset));
        offset += 64;
    }

    return result;
}
function encodeDynamicVariableSizedArray_CsiRsResource_t_24(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlDataencodeCsiRsResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_CsiRsResource_t_24(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(DlDatadecodeCsiRsResource_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint16_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU16(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint16_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU16(offset));
        offset += 2;
    }

    return result;
}
function encodeDynamicVariableSizedArray_int16_32(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putI16(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_int16_32(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getI16(offset));
        offset += 2;
    }

    return result;
}
function encodeDynamicVariableSizedArray_ulBeams_t_420(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlCellencodeulBeams_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_ulBeams_t_420(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlCelldecodeulBeams_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlCellencodephaseCompensationLutIndex_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlCelldecodephaseCompensationLutIndex_t(offset));
        offset += 224;
    }

    return result;
}
function encodeDynamicVariableSizedArray_uint16_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU16(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint16_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(l2l1_getU16(offset));
        offset += 2;
    }

    return result;
}
function encodeDynamicVariableSizedArray_ulBeams_t_420(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        encodeulBeams_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_ulBeams_t_420(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(decodeulBeams_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        encodephaseCompensationLutIndex_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_phaseCompensationLutIndex_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(decodephaseCompensationLutIndex_t(offset));
        offset += 224;
    }

    return result;
}
function encodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeUePuschReceiveRespPs_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeUePuschReceiveRespPs_t(offset));
        offset += 408;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveRespPsSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveRespPsSubcell_t(offset));
        offset += 56;
    }

    return result;
}
function encodeDynamicVariableSizedArray_csiReportStruct_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodecsiReportStruct_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_csiReportStruct_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodecsiReportStruct_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveReqGrant_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveReqGrant_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveReqGrant_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveReqGrant_t(offset));
        offset += 244;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveReqSubcell_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveRespHarqDGrants_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveRespHarqDGrants_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveRespHarqDGrants_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveRespHarqDSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveRespHarqDSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveRespHarqDSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveRespHarqDSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeUePuschReceiveRespHarqU_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeUePuschReceiveRespHarqU_t(offset));
        offset += 8;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveRespHarqUSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveRespHarqUSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodedetectedPrachPreambles_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodedetectedPrachPreambles_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeprachReceiveIndSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeprachReceiveIndSubcell_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_252(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveReqPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_252(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveReqPucchResource_t(offset));
        offset += 140;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveReqSubcell_t(offset));
        offset += 136;
    }

    return result;
}
function encodeDynamicVariableSizedArray_extendedParameters_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeextendedParameters_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_extendedParameters_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeextendedParameters_t(offset));
        offset += 64;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_252(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespPsPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_252(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespPsPucchResource_t(offset));
        offset += 76;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespPsSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespPsSubcell_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_252(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespHarqDPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_252(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespHarqDPucchResource_t(offset));
        offset += 28;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespHarqDSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespHarqDSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeprachReceiveReqOccasion_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_prachReceiveReqOccasion_t_24(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeprachReceiveReqOccasion_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_prachReceiveReqSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeprachReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_prachReceiveReqSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeprachReceiveReqSubcell_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsReceiveReqUes_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsReceiveReqUes_t_40(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsReceiveReqUes_t(offset));
        offset += 48;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsBmCsInfo_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsBmCsInfo_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsBmCsInfo_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsBmCsInfo_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsBmCombShiftPairs_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsBmCombShiftPairs_t_2(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsBmCombShiftPairs_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsBmSubbands_t_68(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsBmSubbands_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsBmSubbands_t_68(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsBmSubbands_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsCyclicShifts_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsCyclicShifts_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsCyclicShifts_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsCyclicShifts_t(offset));
        offset += 3;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsBwvReportRequest_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsBwvReportRequest_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsBwvReportRequest_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsReceiveReqSubcell_t(offset));
        offset += 52;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsReceiveRespPsUes_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsReceiveRespPsUes_t_40(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsReceiveRespPsUes_t(offset));
        offset += 148;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsReceiveRespPsSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsReceiveRespPsSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodecovarianceMatrixSrs_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_36(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodecovarianceMatrixSrs_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodecovarianceMatrixSrs_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_covarianceMatrixSrs_t_10(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodecovarianceMatrixSrs_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_data_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodedata_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_data_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodedata_t(offset));
        offset += 24;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsRespBmPsSubbands_t_38(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsRespBmPsSubbands_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsRespBmPsSubbands_t_38(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsRespBmPsSubbands_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodedetectionResUnitsReq_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_detectionResUnitsReq_t_56(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodedetectionResUnitsReq_t(offset));
        offset += 2;
    }

    return result;
}
function encodeDynamicVariableSizedArray_rimRsSeq_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencoderimRsSeq_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_rimRsSeq_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecoderimRsSeq_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_blankedRegion_t_5(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeblankedRegion_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_blankedRegion_t_5(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeblankedRegion_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeunscheduledPrbRange_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_unscheduledPrbRange_t_15(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeunscheduledPrbRange_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeunscheduledRegionInfo_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_unscheduledRegionInfo_t_14(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeunscheduledRegionInfo_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_rimReceiveReqSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencoderimReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_rimReceiveReqSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecoderimReceiveReqSubcell_t(offset));
        offset += 68;
    }

    return result;
}
function encodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodedetectionResUnitsResp_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_detectionResUnitsResp_t_56(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodedetectionResUnitsResp_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencoderimRsDetectionReport_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_rimRsDetectionReport_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecoderimRsDetectionReport_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_rimReceiveRespSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencoderimReceiveRespSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_rimReceiveRespSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecoderimReceiveRespSubcell_t(offset));
        offset += 292;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsBwvReport_t_2(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsBwvReport_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsBwvReport_t_2(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsBwvReport_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_srsReceiveRespBwvPsSubcell_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodesrsReceiveRespBwvPsSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_srsReceiveRespBwvPsSubcell_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodesrsReceiveRespBwvPsSubcell_t(offset));
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_bfwWeight_t_64(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1FcpencodebfwWeight_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_bfwWeight_t_64(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1FcpdecodebfwWeight_t(offset));
        offset += 4;
    }

    return result;
}
function encodeDynamicVariableSizedArray_beamformingWeights_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1FcpencodebeamformingWeights_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_beamformingWeights_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1FcpdecodebeamformingWeights_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_nonContiguousPrbAllocation_t_1(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1FcpencodenonContiguousPrbAllocation_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_nonContiguousPrbAllocation_t_1(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1FcpdecodenonContiguousPrbAllocation_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_dlUlSection_t_210(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1FcpencodedlUlSection_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_dlUlSection_t_210(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1FcpdecodedlUlSection_t(offset));
        offset += 32;
    }

    return result;
}
function encodeDynamicVariableSizedArray_trafficRuleSet_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1MacSecencodetrafficRuleSet_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_trafficRuleSet_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1MacSecdecodetrafficRuleSet_t(offset));
        offset += 72;
    }

    return result;
}
function encodeDynamicVariableSizedArray_deleteRuleReq_t_384(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1MacSecencodedeleteRuleReq_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_deleteRuleReq_t_384(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1MacSecdecodedeleteRuleReq_t(offset));
        offset += 52;
    }

    return result;
}
function encodeDynamicVariableSizedArray_deleteRuleResp_t_384(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1MacSecencodedeleteRuleResp_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_deleteRuleResp_t_384(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1MacSecdecodedeleteRuleResp_t(offset));
        offset += 52;
    }

    return result;
}
function encodeDynamicVariableSizedArray_portCounterItems_t_20(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        L1MacSecencodeportCounterItems_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_portCounterItems_t_20(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(L1MacSecdecodeportCounterItems_t(offset));
        offset += 168;
    }

    return result;
}
function encodeDynamicPackedArray_PdschGrant_16(arr, buf, off) {
    l2l1_putU8(arr.length, buf, off);
    off += 1;
    l2l1_putU8(buf.static.length - off + buf.dynamic.getLength(), buf, off);

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlDataencodePdschGrant(elem, dynamic, dynamic.getLength());
    }
}
function decodeDynamicPackedArray_PdschGrant_16(offset) {
    const length = l2l1_getU8(offset);
    const arrOffset = l2l1_getU8(offset + 1);
    const result = []
    for (let i = 0; i < length; i++)
        result.push(DlDatadecodePdschGrant(offset + 1 + arrOffset + i * 96));
    return result;
}


packetPropToStrMap["l2l1.message"] = {
    0xe3f0: "L1Config::SwConfigurationReq",
    0xe3f1: "L1Config::SwConfigurationResp",
    0xe3f2: "L1Config::AutohealingActivationReq",
    0xe3f3: "L1Config::AutohealingActivationResp",
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
    0xe313: "L1Cpri::FrameSyncInd",
    0xe314: "L1Cpri::T14Ind",
    0xE11C: "DlPool::AddressReq",
    0xE11D: "DlPool::AddressResp",
    0xE11E: "DlPool::BbResourceReconfReq",
    0xE11F: "DlPool::BbResourceReconfResp",
    0x0102: "DlCell::DeleteReq",
    0x0103: "DlCell::DeleteResp",
    0xE117: "DlCell::SetupReq",
    0xE119: "DlCell::SetupResp",
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
    0xE11A: "DlData::AddressReq",
    0xE11B: "DlData::DiagnosticInd",
    0xE120: "DlData::RimRsSendReq",
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
    0x0a65: "L1Log::AntennaSnapshotReq",
    0x0a5a: "L1Log::AntennaSnapshotResp",
    0x0a61: "L1Log::ShowTraceListResp",
    0xe3b0: "L1Log::TraceReq",
    0xe3b1: "L1Log::ShowTraceListReq",
    0xe3b3: "L1Log::AntennaSnapshotInd",
    0xe3b4: "L1Log::TraceInd",
    0xe3b5: "L1Log::TraceResp",
    0xe3b6: "L1Log::SuspiciousEventInd",
    0xe3b7: "L1Log::AntennaSnapshotConfigurationResp",
    0xe3b8: "L1Log::AntennaSnapshotConfigurationReq",
    0xe3bf: "L1Log::OverloadStatusInd",
    0xe3c0: "L1Log::ActTraceOverloadReq",
    0xe3c1: "L1Log::ActTraceOverloadResp",
    0xe3c2: "L1Log::AntennaSnapshotStopInd",
    0xE3B9: "L1Status::AutohealingSubscribeReq",
    0xE3BA: "L1Status::AutohealingSubscribeResp",
    0xE3BB: "L1Status::AutohealingStatusInd",
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
    0xe3bc: "L1SyncSlave::startPtpSlaveReq",
    0xe3bd: "L1SyncSlave::startPtpSlaveResp",
    0xe3be: "L1SyncSlave::syncSlaveStatusInd",
    0xe3ca: "L1SyncSlave::getPtpSlaveStatusReq",
    0xe3cb: "L1SyncSlave::getPtpSlaveStatusResp",
    0xE259: "UlPool::AddressReq",
    0xE25A: "UlPool::AddressResp",
    0xE25B: "UlPool::BbResourceReconfReq",
    0xE25C: "UlPool::BbResourceReconfResp",
    0x0202: "UlCell::DeleteReq",
    0x0203: "UlCell::DeleteResp",
    0xE253: "UlCell::SetupReq",
    0xE254: "UlCell::SetupResp",
    0xE239: "UlData::PuschReceiveRespLo",
    0x0222: "UlData::PrachReceiveInd",
    0xE200: "UlData::PuschReceiveRespHarqD",
    0xE208: "UlData::PucchReceiveRespHarqD",
    0xE20B: "UlData::PuschReceiveRespHarqU",
    0xE21C: "UlData::FastAntennaSnapshotResp",
    0xE226: "UlData::PucchReceiveReq",
    0xE229: "UlData::EmptyReceiveReq",
    0xE231: "UlData::PrachReceiveReq",
    0xE235: "UlData::FastAntennaSnapshotReq",
    0xE237: "UlData::SrsReceiveRespPs",
    0xE24B: "UlData::PuschReceiveRespPs",
    0xE24C: "UlData::PucchReceiveRespPs",
    0xE24D: "UlData::PrachReceiveInd",
    0xE24E: "UlData::RimReceiveReq",
    0xE24F: "UlData::RimReceiveRespPs",
    0xE250: "UlData::AddressResp",
    0xE251: "UlData::PuschReceiveReq",
    0xE255: "UlData::SrsReceiveReq",
    0xE256: "UlData::SrsReceiveRespBmPs",
    0xE257: "UlData::AddressReq",
    0xE258: "UlData::DiagnosticInd",
    0xE25D: "UlData::SrsReceiveRespBwvPs",
    0xE387: "L1Fcp::DlUlChannelsReq",
    0xE391: "L1ChannelStreamer::DeregisterReq",
    0xE392: "L1ChannelStreamer::DeregisterResp",
    0xE393: "L1ChannelStreamer::RegisterReq",
    0xE394: "L1ChannelStreamer::RegisterResp",
    0xE395: "L1ChannelStreamer::ReceiveInd",
    0xE396: "L1ChannelStreamer::SendReq",
    0xE3E4: "L1Call::NrUlTestReportInd",
    0xE3E5: "L1Call::LTEUlTestReportInd",
    0xe3c3: "L1MacSec::createConfigurationProfileReq",
    0xe3c4: "L1MacSec::createConfigurationProfileResp",
    0xe3c5: "L1MacSec::connectionSetupReq",
    0xe3c6: "L1MacSec::connectionSetupResp",
    0xe3c7: "L1MacSec::connectionDeleteReq",
    0xe3c8: "L1MacSec::connectionDeleteResp",
    0xe3c9: "L1MacSec::connectionStatusInd",
    0xe3cc: "L1MacSec::counterSubscribeReq",
    0xe3cd: "L1MacSec::counterSubscribeResp",
    0xe3ce: "L1MacSec::counterInd",
};

packetEnumMap = {
    L1Config_ratMode_t: {
        0: "ratMode::LTE",
        1: "ratMode::NR",
    },
    L1Config_fronthaulMode_t: {
        0: "fronthaulMode::CPRI",
        1: "fronthaulMode::eCPRI",
        2: "fronthaulMode::eCPRI_DCM_ORAN",
        3: "fronthaulMode::OBSAI",
        4: "fronthaulMode::eCPRI_WMP_ORAN",
        5: "fronthaulMode::CPRI_OR_OBSAI",
    },
    L1Config_domain_t: {
        0: "domain::UL",
        1: "domain::DL",
        2: "domain::SRS",
    },
    L1Config_duplexMode_t: {
        0: "duplexMode::FDD",
        1: "duplexMode::TDD",
    },
    L1Config_frequencyRange_t: {
        0: "frequencyRange::FR1",
        1: "frequencyRange::FR2",
        2: "frequencyRange::FR1_NB",
        3: "frequencyRange::FR1_WB",
    },
    L1Config_status_t: {
        0: "status::Ok",
        1: "status::Error",
        2: "status::IllegalParameter",
        3: "status::ResetNeeded",
    },
    L1Config_statusAutohealing_t: {
        0: "statusAutohealing::OK",
    },
    _ratMode_t: {
        0: "ratMode::LTE",
        1: "ratMode::NR",
    },
    L1Cpri_ECpriLink: {
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
    L1Cpri_ECellMap: {
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
    L1Cpri_EExecutionState: {
        0: "EExecutionState::EExecutionState_NoError",
        1: "EExecutionState::EExecutionState_InvalidParam",
        2: "EExecutionState::EExecutionState_UndefinedError",
    },
    L1Cpri_EOutputState: {
        0: "EOutputState::EOutputState_Enabled",
        1: "EOutputState::EOutputState_Disabled",
    },
    L1Cpri_EOamCpriLinkState: {
        0: "EOamCpriLinkState::EOamCpriLinkState_A",
        1: "EOamCpriLinkState::EOamCpriLinkState_B",
        2: "EOamCpriLinkState::EOamCpriLinkState_C",
        3: "EOamCpriLinkState::EOamCpriLinkState_D",
        4: "EOamCpriLinkState::EOamCpriLinkState_E",
        5: "EOamCpriLinkState::EOamCpriLinkState_F",
        6: "EOamCpriLinkState::EOamCpriLinkState_G",
    },
    L1Cpri_EState: {
        0: "EState::EState_Enabled",
        1: "EState::EState_Disabled",
    },
    L1Cpri_cpriIqSampleFormat_t: {
        7: "cpriIqSampleFormat::iqSampleFormat_7",
        8: "cpriIqSampleFormat::iqSampleFormat_8",
        9: "cpriIqSampleFormat::iqSampleFormat_9",
        12: "cpriIqSampleFormat::iqSampleFormat_12",
        15: "cpriIqSampleFormat::iqSampleFormat_15",
        16: "cpriIqSampleFormat::iqSampleFormat_16",
    },
    L1Cpri_cpriAxcContainerStatus_t: {
        0: "cpriAxcContainerStatus::OK",
        1: "cpriAxcContainerStatus::NOK",
    },
    L1Cpri_direction_t: {
        0: "direction::Downlink",
        1: "direction::Uplink",
    },
    l1_common_EScs: {
        0: "EScs::UNUSED",
        15: "EScs::khz_15",
        30: "EScs::khz_30",
        60: "EScs::khz_60",
        120: "EScs::khz_120",
    },
    _ECpriLink: {
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
    l1_common_poolCause_t: {
        0: "poolCause::OverCapacity",
        1: "poolCause::TooFrequentReconfRequest",
        2: "poolCause::InvalidSFN",
        3: "poolCause::PrbPoolingIsDisabled",
        4: "poolCause::UnknownL1PoolId",
        5: "poolCause::UnknownL1SubPoolId",
        6: "poolCause::UknownIssue",
    },
    l1_common_cellExtension_t: {
        10: "cellExtension::NORMAL",
        20: "cellExtension::EXTENDED",
        23: "cellExtension::EXTENDED_2_point_3",
        69: "cellExtension::EXTENDED_6_point_9",
        110: "cellExtension::EXTENDED_11_point_0",
    },
    l1_common_EBandwidth: {
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
    l1_common_SubcellType: {
        0: "SubcellType::C2",
        1: "SubcellType::C4",
        2: "SubcellType::C8",
        3: "SubcellType::D2",
        4: "SubcellType::A2",
        5: "SubcellType::A4",
        6: "SubcellType::A1",
    },
    l1_common_dlMimoMode_t: {
        0: "dlMimoMode::CL_2x2_MIMO",
        1: "dlMimoMode::CL_4x4_or_4x2_MIMO",
        2: "dlMimoMode::OL_2x2_MIMO",
        3: "dlMimoMode::OL_4x4_or_4x2_MIMO",
        4: "dlMimoMode::CL_8x4_MIMO",
        5: "dlMimoMode::SAT_1x1_MIMO",
    },
    l1_common_ssBlockConfiguration_t: {
        0: "ssBlockConfiguration::CaseA",
        1: "ssBlockConfiguration::CaseB",
        2: "ssBlockConfiguration::CaseC",
        3: "ssBlockConfiguration::CaseD",
        4: "ssBlockConfiguration::CaseE",
    },
    l1_common_subcellPosition_t: {
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
    L1ECpri_EECpriLink_t: {
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
    l1_common_numCeAxC_t: {
        0: "numCeAxC::NUM_C_EAXC_0",
        1: "numCeAxC::NUM_C_EAXC_1",
        2: "numCeAxC::NUM_C_EAXC_2",
        3: "numCeAxC::NUM_C_EAXC_3",
        4: "numCeAxC::NUM_C_EAXC_4",
        8: "numCeAxC::NUM_C_EAXC_8",
    },
    l1_common_numCeAxC_UlCell_Setup_t: {
        0: "numCeAxC_UlCell_Setup::NUM_C_EAXC_0",
        2: "numCeAxC_UlCell_Setup::NUM_C_EAXC_2",
        4: "numCeAxC_UlCell_Setup::NUM_C_EAXC_4",
        8: "numCeAxC_UlCell_Setup::NUM_C_EAXC_8",
        12: "numCeAxC_UlCell_Setup::NUM_C_EAXC_12",
    },
    l1_common_numLteCrsPorts_t: {
        1: "numLteCrsPorts::NUM_LTE_CRS_PORTS_1",
        2: "numLteCrsPorts::NUM_LTE_CRS_PORTS_2",
        4: "numLteCrsPorts::NUM_LTE_CRS_PORTS_4",
    },
    l1_common_lteDlBandwidth_t: {
        25: "lteDlBandwidth::LTE_DL_BW_25",
        50: "lteDlBandwidth::LTE_DL_BW_50",
        75: "lteDlBandwidth::LTE_DL_BW_75",
        100: "lteDlBandwidth::LTE_DL_BW_100",
    },
    l1_common_cpriDialectIndication_t: {
        0: "cpriDialectIndication::CPRI_N",
        1: "cpriDialectIndication::CPRI_A",
    },
    l1_common_mantissaSize_t: {
        9: "mantissaSize::mantissaSize_9",
        14: "mantissaSize::mantissaSize_14",
    },
    l1_common_dlScPerCarrierPart_t: {
        1296: "dlScPerCarrierPart::DL_BW_PER_CARRIER_1",
        468: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_39PRB",
        636: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_53PRB",
        648: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_54PRB",
        660: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_55PRB",
        792: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_66PRB",
        804: "dlScPerCarrierPart::DL_BW_PER_CARRIER_30KHz_67PRB",
        960: "dlScPerCarrierPart::DL_BW_PER_CARRIER_15KHz_80PRB",
    },
    l1_common_ulScPerCarrierPart_t: {
        1296: "ulScPerCarrierPart::UL_BW_PER_CARRIER_1",
        468: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_39PRB",
        636: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_53PRB",
        648: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_54PRB",
        660: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_55PRB",
        792: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_66PRB",
        804: "ulScPerCarrierPart::UL_BW_PER_CARRIER_30KHz_67PRB",
        960: "ulScPerCarrierPart::UL_BW_PER_CARRIER_15KHz_80PRB",
    },
    l1_common_fronthaulMode_t: {
        0: "fronthaulMode::CPRI",
        1: "fronthaulMode::OBSAI",
        2: "fronthaulMode::eCPRI",
    },
    l1_common_status_t: {
        0: "status::EStatus5G_Ok",
        1: "status::EStatus5G_NotOk",
    },
    l1_common_cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
    },
    _cellExtension_t: {
        10: "cellExtension::NORMAL",
        20: "cellExtension::EXTENDED",
        23: "cellExtension::EXTENDED_2_point_3",
        69: "cellExtension::EXTENDED_6_point_9",
        110: "cellExtension::EXTENDED_11_point_0",
    },
    _EECpriLink_t: {
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
    L1_operationType_t: {
        0: "operationType::load",
        1: "operationType::cleanup",
    },
    L1_status_t: {
        0: "status::OK",
        1: "status::NOK",
    },
    l1_common_slotType_t: {
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
    l1_common_aggregationLevel_t: {
        1: "aggregationLevel::AL1",
        2: "aggregationLevel::AL2",
        4: "aggregationLevel::AL4",
        8: "aggregationLevel::AL8",
        16: "aggregationLevel::AL16",
    },
    l1_common_dmrsReferencePoint_t: {
        0: "dmrsReferencePoint::CORESET_START_RB",
        1: "dmrsReferencePoint::POINT_A",
    },
    l1_common_polarizationSelection_t: {
        0: "polarizationSelection::firstPolarization",
        1: "polarizationSelection::secondPolarization",
        2: "polarizationSelection::bothPolarizations",
    },
    l1_common_pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
        3: "pdcchPrecodingOption4x4::repetition2ndXPol",
    },
    l1_common_cceRegMappingType_t: {
        0: "cceRegMappingType::INTERLEAVED",
        1: "cceRegMappingType::NON_INTERLEAVED",
    },
    l1_common_coresetInterleaverSize_t: {
        0: "coresetInterleaverSize::ROWS_0",
        2: "coresetInterleaverSize::ROWS_2",
        3: "coresetInterleaverSize::ROWS_3",
        6: "coresetInterleaverSize::ROWS_6",
    },
    l1_common_coresetRegBundleSize_t: {
        2: "coresetRegBundleSize::REGS_2",
        3: "coresetRegBundleSize::REGS_3",
        6: "coresetRegBundleSize::REGS_6",
    },
    l1_common_precoderGranularity_t: {
        0: "precoderGranularity::REG_BUNDLE_SIZE",
        1: "precoderGranularity::NUM_OF_CONTIG_RB",
    },
    l1_common_rachStatus_t: {
        0: "rachStatus::OTHER",
        2: "rachStatus::MSG2",
        3: "rachStatus::MSG3",
        4: "rachStatus::MSG4",
        5: "rachStatus::MSG5",
    },
    l1_common_dlDmrsConfigType_t: {
        1: "dlDmrsConfigType::DMRS_CONFIG_1",
        2: "dlDmrsConfigType::DMRS_CONFIG_2",
    },
    l1_common_dmrsLen_t: {
        1: "dmrsLen::NR_SYMBOLS_1",
        2: "dmrsLen::NR_SYMBOLS_2",
    },
    l1_common_dmrsMappingType_t: {
        0: "dmrsMappingType::DMRS_MAPPING_TYPE_A",
        1: "dmrsMappingType::DMRS_MAPPING_TYPE_B",
    },
    l1_common_NumOfPdschSymbols: {
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
    l1_common_mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
        2: "mcsTable::qam64LowSE",
    },
    l1_common_SpatialMode: {
        0: "SpatialMode::SINGLE_ANTENNA",
        1: "SpatialMode::TX_DIVERSITY",
        2: "SpatialMode::CL_SPATIAL_MUX",
        3: "SpatialMode::OL_SPATIAL_MUX",
    },
    l1_common_DlCodebookIndex: {
        0: "DlCodebookIndex::VAL_0",
        1: "DlCodebookIndex::VAL_1",
        2: "DlCodebookIndex::VAL_2",
        3: "DlCodebookIndex::VAL_3",
        255: "DlCodebookIndex::VAL_255",
    },
    l1_common_PtrsFlag: {
        0: "PtrsFlag::PTRS_OFF",
        1: "PtrsFlag::PTRS_ON",
    },
    l1_common_ptrsTimeDensity_t: {
        0: "ptrsTimeDensity::L_PTRS_OFF",
        1: "ptrsTimeDensity::L_PTRS_1",
        2: "ptrsTimeDensity::L_PTRS_2",
        4: "ptrsTimeDensity::L_PTRS_4",
    },
    l1_common_ptrsFrequencyDensity_t: {
        0: "ptrsFrequencyDensity::K_PTRS_OFF",
        2: "ptrsFrequencyDensity::K_PTRS_2",
        4: "ptrsFrequencyDensity::K_PTRS_4",
    },
    l1_common_ldpcBaseGraph_t: {
        1: "ldpcBaseGraph::BG_1",
        2: "ldpcBaseGraph::BG_2",
    },
    l1_common_modulationOrder_t: {
        1: "modulationOrder::Order1",
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    l1_common_pdschPrecodingOption4x4_t: {
        0: "pdschPrecodingOption4x4::NoPortSelection",
        1: "pdschPrecodingOption4x4::PortSelectionUpToRank2",
        2: "pdschPrecodingOption4x4::PortSelectionUpToRank4",
        3: "pdschPrecodingOption4x4::PortSelectionUpToRank1",
        4: "pdschPrecodingOption4x4::NoPortSelectionWcsirsPrecoding",
        5: "pdschPrecodingOption4x4::PortSelectionUpToRank2WcsirsPrecoding",
        6: "pdschPrecodingOption4x4::PortSelectionUpToRank4WcsirsPrecoding",
        7: "pdschPrecodingOption4x4::PortSelectionUpToRank1WcsirsPrecoding",
    },
    l1_common_openLoopScheme_t: {
        0: "openLoopScheme::NO_PRECODING_0",
        1: "openLoopScheme::SCDD_1",
        2: "openLoopScheme::LCDD_2",
        255: "openLoopScheme::INVALID_255",
    },
    l1_common_closedLoop3gppCodebook_t: {
        0: "closedLoop3gppCodebook::TwoportTypeICodebook",
        1: "closedLoop3gppCodebook::FourportTypeICodebook",
        2: "closedLoop3gppCodebook::EightportTypeICodebook",
        254: "closedLoop3gppCodebook::IdentityCodebook",
        255: "closedLoop3gppCodebook::INVALID",
    },
    l1_common_precodingVectorIndex_t: {
        0: "precodingVectorIndex::index_0",
        1: "precodingVectorIndex::index_1",
        2: "precodingVectorIndex::index_2",
        3: "precodingVectorIndex::index_3",
    },
    l1_common_csiRsDensity_t: {
        0: "csiRsDensity::dot5",
        1: "csiRsDensity::one",
        3: "csiRsDensity::three",
    },
    l1_common_csiRsDensityDot5PrbLocation_t: {
        0: "csiRsDensityDot5PrbLocation::evenPrbs",
        1: "csiRsDensityDot5PrbLocation::oddPrbs",
    },
    l1_common_csiRsTrsInfo_t: {
        0: "csiRsTrsInfo::DISABLED",
        1: "csiRsTrsInfo::ENABLED",
    },
    l1_common_csiRsPrecodingMatrix_t: {
        0: "csiRsPrecodingMatrix::IDENTITY_MATRIX",
        1: "csiRsPrecodingMatrix::DIAGONAL_PER_BLOCK",
        2: "csiRsPrecodingMatrix::WCSIRS_ROW8_FIRST",
        3: "csiRsPrecodingMatrix::WCSIRS_ROW8_SECOND",
    },
    l1_common_statusFastAntennaSnapshotResp_t: {
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
    L1ECpri_EExecutionState_t: {
        0: "EExecutionState::NO_ERROR",
        1: "EExecutionState::UNDEFINED_ERROR",
        2: "EExecutionState::INVALID_PARAM",
    },
    L1ECpri_EOutputState_t: {
        0: "EOutputState::ENABLED",
        1: "EOutputState::DISABLED",
    },
    L1ECpri_EOamECpriLinkState_t: {
        0: "EOamECpriLinkState::DISABLED",
        1: "EOamECpriLinkState::ENABLED",
    },
    L1ECpri_EPerfMeasInterval: {
        0: "EPerfMeasInterval::EPerfMeasInterval_Disabled",
        1: "EPerfMeasInterval::EPerfMeasInterval_5min",
        2: "EPerfMeasInterval::EPerfMeasInterval_15min",
        3: "EPerfMeasInterval::EPerfMeasInterval_30min",
        4: "EPerfMeasInterval::EPerfMeasInterval_60min",
        5: "EPerfMeasInterval::EPerfMeasInterval_360min",
        6: "EPerfMeasInterval::EPerfMeasInterval_720min",
        7: "EPerfMeasInterval::EPerfMeasInterval_1440min",
        8: "EPerfMeasInterval::EPerfMeasInterval_1min",
    },
    l1_common_Direction_t: {
        1: "Direction::DL",
        2: "Direction::UL",
    },
    L1Log_EAntennaSnapshotRequestType: {
        0: "EAntennaSnapshotRequestType::LoggingAgent",
        1: "EAntennaSnapshotRequestType::Testport",
        2: "EAntennaSnapshotRequestType::SuspiciousEventL1",
        3: "EAntennaSnapshotRequestType::SuspiciousEventL2",
    },
    L1Log_EAntennaSnapshotConfigurationStatusType: {
        0: "EAntennaSnapshotConfigurationStatusType::Ok",
        1: "EAntennaSnapshotConfigurationStatusType::Nok",
    },
    L1Log_EAntennaSnapshotCaptureModeType: {
        0: "EAntennaSnapshotCaptureModeType::StopContinuousCapture",
        1: "EAntennaSnapshotCaptureModeType::StartSingleCapture",
    },
    L1Log_EAntennaSnapshotFileFormatType: {
        0: "EAntennaSnapshotFileFormatType::TxAfterRxInSameFile",
        1: "EAntennaSnapshotFileFormatType::RxAndTxInSeparateFiles",
    },
    L1Log_EAntennaSnapshotSendAckType: {
        0: "EAntennaSnapshotSendAckType::SendResponseAck",
        1: "EAntennaSnapshotSendAckType::NoResponseAck",
    },
    L1Log_EAntennaSnapshotL1EventEnableType: {
        0: "EAntennaSnapshotL1EventEnableType::Enabled",
        1: "EAntennaSnapshotL1EventEnableType::Disabled",
    },
    L1Log_EAntennaSnapshotConfigurationRequestReason: {
        0: "EAntennaSnapshotConfigurationRequestReason::NOT_SET",
        1: "EAntennaSnapshotConfigurationRequestReason::TX_POWER_FAILURE_SLEEPING_CELL",
        2: "EAntennaSnapshotConfigurationRequestReason::MSG3_FAILURE_SLEEPING_CELL",
        3: "EAntennaSnapshotConfigurationRequestReason::MSG4_MSG5_FAILURE_SLEEPING_CELL",
        4: "EAntennaSnapshotConfigurationRequestReason::RESERVED",
    },
    L1Log_EAntennaSnapshotCaptureType: {
        0: "EAntennaSnapshotCaptureType::BBU",
        1: "EAntennaSnapshotCaptureType::BBURU",
    },
    L1Log_EAntennaSnapshotBufferCycle: {
        2: "EAntennaSnapshotBufferCycle::Frames_2",
        4: "EAntennaSnapshotBufferCycle::Frames_4",
        8: "EAntennaSnapshotBufferCycle::Frames_8",
        16: "EAntennaSnapshotBufferCycle::Frames_16",
        32: "EAntennaSnapshotBufferCycle::Frames_32",
        64: "EAntennaSnapshotBufferCycle::Frames_64",
        128: "EAntennaSnapshotBufferCycle::Frames_128",
        256: "EAntennaSnapshotBufferCycle::Frames_256",
        512: "EAntennaSnapshotBufferCycle::Frames_512",
        1024: "EAntennaSnapshotBufferCycle::Frames_1024",
    },
    l1_common_EStatus_5G: {
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
        14: "EStatus_5G::NrtRtCommunicationError",
        15: "EStatus_5G::RtInternalError",
        16: "EStatus_5G::CellNumberOutOfRange",
        17: "EStatus_5G::CellWith8ULNeedsTwoSubcells",
    },
    L1Log_EReportType: {
        0: "EReportType::STOP",
        1: "EReportType::START",
        2: "EReportType::SUSPEND",
        3: "EReportType::RESUME",
    },
    L1Log_EOutputMode: {
        0: "EOutputMode::SNAPSHOT",
        1: "EOutputMode::STREAMING",
    },
    L1Log_EAntSnapshotL1Enabled: {
        0: "EAntSnapshotL1Enabled::ENABLED",
        1: "EAntSnapshotL1Enabled::DISABLED",
    },
    l1_common_indType_t: {
        0: "indType::AntennaSnapshotTrigger",
        1: "indType::AlarmCancel",
        2: "indType::ASTriggerSleepingCell",
        3: "indType::AlarmCancelSleepingCell",
    },
    l1_common_eventType_t: {
        0: "eventType::NRUL",
        1: "eventType::NRDL",
        2: "eventType::LTEUL",
        3: "eventType::LTEDL",
    },
    l1_common_cancelScenario_t: {
        0: "cancelScenario::AntennaSnapshotCollected",
        1: "cancelScenario::Timeout",
        2: "cancelScenario::AntennaSnapshotReconfiguration",
        3: "cancelScenario::CellDeletion",
    },
    L1Log_overloadStatus_t: {
        0: "overloadStatus::No",
        1: "overloadStatus::Yes",
    },
    L1Log_actTraceStatus_t: {
        0: "actTraceStatus::OK",
        1: "actTraceStatus::NOK",
    },
    _EAntennaSnapshotRequestType: {
        0: "EAntennaSnapshotRequestType::LoggingAgent",
        1: "EAntennaSnapshotRequestType::Testport",
        2: "EAntennaSnapshotRequestType::SuspiciousEventL1",
        3: "EAntennaSnapshotRequestType::SuspiciousEventL2",
    },
    _EAntennaSnapshotConfigurationStatusType: {
        0: "EAntennaSnapshotConfigurationStatusType::Ok",
        1: "EAntennaSnapshotConfigurationStatusType::Nok",
    },
    _EAntennaSnapshotCaptureModeType: {
        0: "EAntennaSnapshotCaptureModeType::StopContinuousCapture",
        1: "EAntennaSnapshotCaptureModeType::StartSingleCapture",
    },
    _EAntennaSnapshotFileFormatType: {
        0: "EAntennaSnapshotFileFormatType::TxAfterRxInSameFile",
        1: "EAntennaSnapshotFileFormatType::RxAndTxInSeparateFiles",
    },
    _EAntennaSnapshotSendAckType: {
        0: "EAntennaSnapshotSendAckType::SendResponseAck",
        1: "EAntennaSnapshotSendAckType::NoResponseAck",
    },
    _EAntennaSnapshotL1EventEnableType: {
        0: "EAntennaSnapshotL1EventEnableType::Enabled",
        1: "EAntennaSnapshotL1EventEnableType::Disabled",
    },
    _EAntennaSnapshotConfigurationRequestReason: {
        0: "EAntennaSnapshotConfigurationRequestReason::NOT_SET",
        1: "EAntennaSnapshotConfigurationRequestReason::TX_POWER_FAILURE_SLEEPING_CELL",
        2: "EAntennaSnapshotConfigurationRequestReason::MSG3_FAILURE_SLEEPING_CELL",
        3: "EAntennaSnapshotConfigurationRequestReason::MSG4_MSG5_FAILURE_SLEEPING_CELL",
        4: "EAntennaSnapshotConfigurationRequestReason::RESERVED",
    },
    _EAntennaSnapshotCaptureType: {
        0: "EAntennaSnapshotCaptureType::BBU",
        1: "EAntennaSnapshotCaptureType::BBURU",
    },
    _EAntennaSnapshotBufferCycle: {
        2: "EAntennaSnapshotBufferCycle::Frames_2",
        4: "EAntennaSnapshotBufferCycle::Frames_4",
        8: "EAntennaSnapshotBufferCycle::Frames_8",
        16: "EAntennaSnapshotBufferCycle::Frames_16",
        32: "EAntennaSnapshotBufferCycle::Frames_32",
        64: "EAntennaSnapshotBufferCycle::Frames_64",
        128: "EAntennaSnapshotBufferCycle::Frames_128",
        256: "EAntennaSnapshotBufferCycle::Frames_256",
        512: "EAntennaSnapshotBufferCycle::Frames_512",
        1024: "EAntennaSnapshotBufferCycle::Frames_1024",
    },
    L1Status_status_t: {
        0: "status::OK",
    },
    L1Status_statusInd_t: {
        0: "statusInd::SuccessfulRecovery",
        1: "statusInd::UnsuccessfulRecovery",
    },
    L1Status_acceleratorGroupType_t: {
        0: "acceleratorGroupType::NR_UL",
        1: "acceleratorGroupType::NR_DL",
        2: "acceleratorGroupType::LTE_UL",
        3: "acceleratorGroupType::LTE_DL",
    },
    L1Status_acceleratorType_t: {
        0: "acceleratorType::DspAccelerator",
        1: "acceleratorType::HwAccelerator",
    },
    L1Status_crashType_t: {
        0: "crashType::NMI_INTERRUPT",
        1: "crashType::FATAL_ERROR",
    },
    L1Status_causeType_t: {
        0: "causeType::RecoveryFailure",
        1: "causeType::ResetLoopDetection",
    },
    SyncM_ptpEthMulticastAddress_t: {
        1652522221582: "ptpEthMulticastAddress::ADDR_0",
        1215895175168: "ptpEthMulticastAddress::ADDR_1",
    },
    SyncM_clockClass_t: {
        6: "clockClass::CLASS_6",
        7: "clockClass::CLASS_7",
        150: "clockClass::CLASS_150",
    },
    SyncM_portMode_t: {
        0: "portMode::DISABLED",
        1: "portMode::MASTER",
        2: "portMode::SLAVE",
    },
    SyncM_transportMode_t: {
        0: "transportMode::ETH",
        1: "transportMode::IP",
    },
    SyncM_castMode_t: {
        0: "castMode::MULTICAST",
        1: "castMode::UNICAST",
    },
    SyncM_status_t: {
        0: "status::EStatus_NoError",
        1: "status::EStatus_UndefinedError",
        2: "status::EStatus_InvalidParam",
        3: "status::EStatus_NotInitialized",
    },
    SyncM_g781NetworkOption_t: {
        1: "g781NetworkOption::OPTION_I",
        2: "g781NetworkOption::OPTION_II",
        3: "g781NetworkOption::OPTION_III",
    },
    SyncM_enabledDisabled_t: {
        0: "enabledDisabled::ENABLED",
        1: "enabledDisabled::DISABLED",
    },
    SyncM_syncmasterStatus_t: {
        0: "syncmasterStatus::Operational",
        1: "syncmasterStatus::Configured",
        2: "syncmasterStatus::Failed",
    },
    _ptpEthMulticastAddress_t: {
        1652522221582: "ptpEthMulticastAddress::ADDR_0",
        1215895175168: "ptpEthMulticastAddress::ADDR_1",
    },
    L1SyncSlave_delayReqInterval_t: {
        0: "delayReqInterval::RANDOM",
        1: "delayReqInterval::ONE_PER_SYNC",
    },
    L1SyncSlave_castMode_t: {
        0: "castMode::MULTICAST",
        1: "castMode::UNICAST",
    },
    L1SyncSlave_ptpEthMulticastAddress_t: {
        1215895175168: "ptpEthMulticastAddress::ADDR_0",
        1652522221582: "ptpEthMulticastAddress::ADDR_1",
    },
    L1SyncSlave_transportMode_t: {
        0: "transportMode::ETH",
        1: "transportMode::IP",
    },
    L1SyncSlave_portMode_t: {
        0: "portMode::DISABLED",
        1: "portMode::MASTER",
        2: "portMode::SLAVE",
    },
    L1SyncSlave_ptpProfile_t: {
        0: "ptpProfile::G8275_1",
        1: "ptpProfile::G8275_2",
    },
    L1SyncSlave_status_t: {
        0: "status::EStatus_NoError",
        1: "status::EStatus_UndefinedError",
        2: "status::EStatus_InvalidParam",
        3: "status::EStatus_NotInitialized",
    },
    L1SyncSlave_statusInd_t: {
        0: "statusInd::Locked",
        1: "statusInd::Holdover",
        2: "statusInd::Freerun",
    },
    _delayReqInterval_t: {
        0: "delayReqInterval::RANDOM",
        1: "delayReqInterval::ONE_PER_SYNC",
    },
    l1_common_prachFormat_t: {
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
    l1_common_prachStartSymbol_t: {
        0: "prachStartSymbol::SYMBOL_0",
        2: "prachStartSymbol::SYMBOL_2",
        5: "prachStartSymbol::SYMBOL_5",
        6: "prachStartSymbol::SYMBOL_6",
        7: "prachStartSymbol::SYMBOL_7",
        8: "prachStartSymbol::SYMBOL_8",
        9: "prachStartSymbol::SYMBOL_9",
    },
    l1_common_prachSequenceType_t: {
        0: "prachSequenceType::UNRESTRICTED",
        1: "prachSequenceType::RESTRICTED_TYPE_A",
        2: "prachSequenceType::RESTRICTED_TYPE_B",
    },
    l1_common_prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        2: "prachCohCombLen::symbols_2",
        4: "prachCohCombLen::symbols_4",
        12: "prachCohCombLen::symbols_12",
    },
    l1_common_digitalOutputType_t: {
        0: "digitalOutputType::serialKeysight",
        1: "digitalOutputType::serialRs",
    },
    l1_common_digitalOutputRate_t: {
        0: "digitalOutputRate::bitrate115dot2k",
        1: "digitalOutputRate::bitrate460dot8k",
        2: "digitalOutputRate::bitrate1dot92M",
    },
    l1_common_numberOfColTRX_t: {
        4: "numberOfColTRX::numberOfColTRX_4",
        8: "numberOfColTRX::numberOfColTRX_8",
    },
    l1_common_numberOfRowTRX_t: {
        1: "numberOfRowTRX::numberOfRowTRX_1",
        2: "numberOfRowTRX::numberOfRowTRX_2",
        4: "numberOfRowTRX::numberOfRowTRX_4",
    },
    l1_common_prachDtxThresholdSelection_t: {
        2: "prachDtxThresholdSelection::RX_2",
        4: "prachDtxThresholdSelection::RX_4",
    },
    l1_common_ulDlDataSlotRatio_t: {
        0: "ulDlDataSlotRatio::unavailable",
        1: "ulDlDataSlotRatio::ONE_UL_NINE_DL",
        2: "ulDlDataSlotRatio::TWO_UL_EIGHT_DL",
        3: "ulDlDataSlotRatio::THREE_UL_SEVEN_DL",
        4: "ulDlDataSlotRatio::FIVE_UL_FIVE_DL",
        5: "ulDlDataSlotRatio::ONE_UL_FOUR_DL",
        6: "ulDlDataSlotRatio::FOUR_UL_SIX_DL",
    },
    l1_common_pSRSnumCeAxCId_t: {
        16: "pSRSnumCeAxCId::value1",
        32: "pSRSnumCeAxCId::value2",
        64: "pSRSnumCeAxCId::value3",
    },
    l1_common_srsBwvResult_t: {
        0: "srsBwvResult::OK",
        1: "srsBwvResult::Failure",
        3: "srsBwvResult::DtxOfPorts",
    },
    l1_common_srsBwvMethod_t: {
        0: "srsBwvMethod::MMSE",
        1: "srsBwvMethod::FEBF",
    },
    l1_common_harqProcessIndex_t: {
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
        100: "harqProcessIndex::ID_100",
    },
    l1_common_tbStatus_t: {
        0: "tbStatus::CRC_PASS",
        1: "tbStatus::CRC_FAIL",
    },
    l1_common_dtx_t: {
        0: "dtx::NON_DTX",
        1: "dtx::DTX",
        254: "dtx::INVALID_NON_DTX",
        255: "dtx::INVALID_DTX",
    },
    l1_common_ulPmiRank1_t: {
        0: "ulPmiRank1::UL_PMI_RANK1_VALUE_0",
        1: "ulPmiRank1::UL_PMI_RANK1_VALUE_1",
        2: "ulPmiRank1::UL_PMI_RANK1_VALUE_2",
        3: "ulPmiRank1::UL_PMI_RANK1_VALUE_3",
        4: "ulPmiRank1::UL_PMI_RANK1_VALUE_4",
        5: "ulPmiRank1::UL_PMI_RANK1_VALUE_5",
        255: "ulPmiRank1::UL_PMI_RANK1_VALUE_INVALID",
    },
    l1_common_ulPmiRank2_t: {
        0: "ulPmiRank2::UL_PMI_RANK2_VALUE_0",
        1: "ulPmiRank2::UL_PMI_RANK2_VALUE_1",
        2: "ulPmiRank2::UL_PMI_RANK2_VALUE_2",
        255: "ulPmiRank2::UL_PMI_RANK2_VALUE_INVALID",
    },
    l1_common_ulRank_t: {
        1: "ulRank::UL_RANK_1",
        2: "ulRank::UL_RANK_2",
        255: "ulRank::UL_RANK_INVALID",
    },
    l1_common_crc_t: {
        0: "crc::OK",
        1: "crc::NOK",
        255: "crc::INVALID",
    },
    l1_common_ulDmrsConfigType_t: {
        1: "ulDmrsConfigType::DMRS_CONFIG_1",
        2: "ulDmrsConfigType::DMRS_CONFIG_2",
    },
    l1_common_puschStartSymbol_t: {
        0: "puschStartSymbol::SYMBOL_0",
        2: "puschStartSymbol::SYMBOL_2",
    },
    l1_common_numOfPuschSymbols_t: {
        2: "numOfPuschSymbols::PCS2",
        9: "numOfPuschSymbols::PCS9",
        10: "numOfPuschSymbols::PCS10",
        11: "numOfPuschSymbols::PCS11",
        12: "numOfPuschSymbols::PCS12",
        13: "numOfPuschSymbols::PCS13",
        14: "numOfPuschSymbols::PCS14",
    },
    l1_common_ulCodebookIndex_t: {
        0: "ulCodebookIndex::VAL_0",
        1: "ulCodebookIndex::VAL_1",
        2: "ulCodebookIndex::VAL_2",
        3: "ulCodebookIndex::VAL_3",
        4: "ulCodebookIndex::VAL_4",
        5: "ulCodebookIndex::VAL_5",
    },
    l1_common_puschTransCoherence_t: {
        0: "puschTransCoherence::nonCoherent",
        1: "puschTransCoherence::partialNonCoherent",
        2: "puschTransCoherence::fullCoherent",
    },
    l1_common_puschTransformPrecoderFlag_t: {
        0: "puschTransformPrecoderFlag::disabled",
        1: "puschTransformPrecoderFlag::enabled",
    },
    l1_common_ulPtrsNumOfGroups_t: {
        0: "ulPtrsNumOfGroups::Precoder_disabled",
        2: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_1",
        4: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_2",
        8: "ulPtrsNumOfGroups::UL_PTRS_NUM_VALUE_3",
    },
    l1_common_ulPtrsNumOfSamplesPerGroup_t: {
        0: "ulPtrsNumOfSamplesPerGroup::Precoder_disabled",
        2: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_1",
        4: "ulPtrsNumOfSamplesPerGroup::UL_PTRS_NUM_SAMPLES_2",
    },
    l1_common_blerTarget_t: {
        0: "blerTarget::blerTarget_0_point_1",
        1: "blerTarget::blerTarget_0_point_01",
    },
    l1_common_ackNackUci_t: {
        0: "ackNackUci::NACK",
        1: "ackNackUci::ACK",
    },
    l1_common_ackCrcCheck_t: {
        0: "ackCrcCheck::Pass",
        1: "ackCrcCheck::Fail",
    },
    l1_common_pucchFormat_t: {
        0: "pucchFormat::PUCCH_FORMAT_0",
        1: "pucchFormat::PUCCH_FORMAT_1",
        2: "pucchFormat::PUCCH_FORMAT_2",
        3: "pucchFormat::PUCCH_FORMAT_3",
    },
    l1_common_numOfPucchLayers_t: {
        1: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_1",
        2: "numOfPucchLayers::NUM_OF_PUCCH_LAYERS_VAL_2",
    },
    l1_common_numOfPucchTxAntennaPorts_t: {
        1: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_1",
        2: "numOfPucchTxAntennaPorts::NUM_OF_PUCCH_TX_ANT_VAL_2",
    },
    l1_common_srBitDetection_t: {
        0: "srBitDetection::SRBIT_DETECTION_DISABLED",
        1: "srBitDetection::SRBIT_DETECTION_ENABLED",
        2: "srBitDetection::SRBIT_DETECTION_INVALID",
    },
    l1_common_frequencyHopping_t: {
        0: "frequencyHopping::FREQ_HOPPING_DISABLED",
        1: "frequencyHopping::FREQ_HOPPING_ENABLED",
    },
    l1_common_pucchAdditionalDmrs_t: {
        0: "pucchAdditionalDmrs::ADDITIONAL_DMRS_DISABLED",
        1: "pucchAdditionalDmrs::ADDITIONAL_DMRS_ENABLED",
    },
    l1_common_pucchModulationType_t: {
        0: "pucchModulationType::BPSK",
        1: "pucchModulationType::QPSK",
    },
    l1_common_longPucchStartSymbol_t: {
        0: "longPucchStartSymbol::SYMBOL_0",
    },
    l1_common_numOfLongPucchSymbols_t: {
        14: "numOfLongPucchSymbols::VAL_14_SYMBOLS",
    },
    l1_common_bitValue_t: {
        0: "bitValue::BIT_VALUE_0",
        1: "bitValue::BIT_VALUE_1",
        255: "bitValue::BIT_VALUE_INVALID",
    },
    l1_common_srsTransmissionComb_t: {
        2: "srsTransmissionComb::COMB_2",
        4: "srsTransmissionComb::COMB_4",
    },
    l1_common_numOfSrsTxAntennaPorts_t: {
        1: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_1",
        2: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_2",
        4: "numOfSrsTxAntennaPorts::NUM_OF_SRS_TX_ANT_VAL_4",
    },
    L1Fcp_DataDirection: {
        0: "DataDirection::DATADIRECTION_RX",
        1: "DataDirection::DATADIRECTION_TX",
    },
    L1Fcp_FilterIndex: {
        0: "FilterIndex::FILTERINDEX_STANDARDCHANNEL",
        1: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_012",
        2: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_3",
        3: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_A1_C2",
        4: "FilterIndex::FILTERINDEX_NPRACHUL",
    },
    L1Fcp_SectionType: {
        0: "SectionType::SECTIONTYPE_IDLEORGUARDPERIOD",
        1: "SectionType::SECTIONTYPE_DLORULRADIOCHANNEL",
        3: "SectionType::SECTIONTYPE_PRACHANDMIXEDNUMEROLOGYCHANNEL",
        5: "SectionType::SERCTIONTYPE_UESCHEDULINGINFORMATION",
        6: "SectionType::SECTIONTYPE_UECHANNELINFORMATION",
        7: "SectionType::SECTIONTYPE_LAA",
        240: "SectionType::SECTIONTYPE_TRIGGERIQSNAPSHOT",
    },
    L1Fcp_RbIndicator: {
        0: "RbIndicator::RBINDICATOR_EVERYRB",
        1: "RbIndicator::RBINDICATOR_EVERYOTHERRB",
    },
    L1Fcp_ExtType: {
        0: "ExtType::EXTTYPE_RESERVED",
        1: "ExtType::EXTTYPE_BEAMFORMINGWEIGHTS",
        2: "ExtType::EXTTYPE_BEAMFORMINGATTRIBUTES",
        3: "ExtType::EXTTYPE_DLPRECODINGCONFIGURATION",
        4: "ExtType::EXTTYPE_MODULATIONCOMPRESSIONPARAMS",
        5: "ExtType::EXTTYPE_MODULATIONCOMPRESSIONADDSCALING",
        6: "ExtType::EXTTYPE_NONCONTIGUOUSPRBALLOCATION",
    },
    L1Fcp_CompressionMethod: {
        0: "CompressionMethod::COMPRESSIONMETHOD_NOCOMPRESSION",
        1: "CompressionMethod::COMPRESSIONMETHOD_BLOCKFLOATPOINT",
        2: "CompressionMethod::COMPRESSIONMETHOD_BLOCKSCALING",
        3: "CompressionMethod::COMPRESSIONMETHOD_ULAW",
        4: "CompressionMethod::COMPRESSIONMETHOD_MODULATIONCOMPRESSION",
    },
    _DataDirection: {
        0: "DataDirection::DATADIRECTION_RX",
        1: "DataDirection::DATADIRECTION_TX",
    },
    _FilterIndex: {
        0: "FilterIndex::FILTERINDEX_STANDARDCHANNEL",
        1: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_012",
        2: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_3",
        3: "FilterIndex::FILTERINDEX_PRACHPREAMBLEFORMATS_A1_C2",
        4: "FilterIndex::FILTERINDEX_NPRACHUL",
    },
    _SectionType: {
        0: "SectionType::SECTIONTYPE_IDLEORGUARDPERIOD",
        1: "SectionType::SECTIONTYPE_DLORULRADIOCHANNEL",
        3: "SectionType::SECTIONTYPE_PRACHANDMIXEDNUMEROLOGYCHANNEL",
        5: "SectionType::SERCTIONTYPE_UESCHEDULINGINFORMATION",
        6: "SectionType::SECTIONTYPE_UECHANNELINFORMATION",
        7: "SectionType::SECTIONTYPE_LAA",
        240: "SectionType::SECTIONTYPE_TRIGGERIQSNAPSHOT",
    },
    _RbIndicator: {
        0: "RbIndicator::RBINDICATOR_EVERYRB",
        1: "RbIndicator::RBINDICATOR_EVERYOTHERRB",
    },
    _ExtType: {
        0: "ExtType::EXTTYPE_RESERVED",
        1: "ExtType::EXTTYPE_BEAMFORMINGWEIGHTS",
        2: "ExtType::EXTTYPE_BEAMFORMINGATTRIBUTES",
        3: "ExtType::EXTTYPE_DLPRECODINGCONFIGURATION",
        4: "ExtType::EXTTYPE_MODULATIONCOMPRESSIONPARAMS",
        5: "ExtType::EXTTYPE_MODULATIONCOMPRESSIONADDSCALING",
        6: "ExtType::EXTTYPE_NONCONTIGUOUSPRBALLOCATION",
    },
    _CompressionMethod: {
        0: "CompressionMethod::COMPRESSIONMETHOD_NOCOMPRESSION",
        1: "CompressionMethod::COMPRESSIONMETHOD_BLOCKFLOATPOINT",
        2: "CompressionMethod::COMPRESSIONMETHOD_BLOCKSCALING",
        3: "CompressionMethod::COMPRESSIONMETHOD_ULAW",
        4: "CompressionMethod::COMPRESSIONMETHOD_MODULATIONCOMPRESSION",
    },
    _EStatus_5G: {
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
        14: "EStatus_5G::NrtRtCommunicationError",
        15: "EStatus_5G::RtInternalError",
        16: "EStatus_5G::CellNumberOutOfRange",
        17: "EStatus_5G::CellWith8ULNeedsTwoSubcells",
    },
    L1MacSec_policyType_t: {
        0: "policyType::E2E_CU_Plane",
        1: "policyType::E2E_M_Plane",
    },
    L1MacSec_macSecCipherSuite_t: {
        0: "macSecCipherSuite::GCM_AES_128",
        1: "macSecCipherSuite::GCM_AES_256",
        2: "macSecCipherSuite::GCM_AES_XPN_128",
        3: "macSecCipherSuite::GCM_AES_XPN_256",
    },
    L1MacSec_macSecProtectionMode_t: {
        0: "macSecProtectionMode::Integrity",
        1: "macSecProtectionMode::Integrity_and_confidentiality",
    },
    L1MacSec_ruleSetAction_t: {
        0: "ruleSetAction::PROTECT",
        1: "ruleSetAction::BYPASS",
    },
    L1MacSec_trafficMode_t: {
        0: "trafficMode::CUM_Plane",
        1: "trafficMode::CU_Plane",
        2: "trafficMode::M_Plane",
    },
    L1MacSec_trafficMacSecProtection_t: {
        0: "trafficMacSecProtection::CUplaneProtection",
        1: "trafficMacSecProtection::CUMplaneProtection",
    },
    L1MacSec_statusMacSecConfigProfileResp_t: {
        0: "statusMacSecConfigProfileResp::SConfigurationStorage_Success",
        1: "statusMacSecConfigProfileResp::SConfigurationStorage_Failure",
    },
    L1MacSec_statusMacSecSetup_t: {
        0: "statusMacSecSetup::SMacSecConnSetup_Success",
        1: "statusMacSecSetup::SMacSecConnSetup_Failure",
    },
    L1MacSec_statusMacSecDelete_t: {
        0: "statusMacSecDelete::SMacSecConnDel_Success",
        1: "statusMacSecDelete::SMacSecConnDel_Failure",
    },
    L1MacSec_statusMacSecConn_t: {
        0: "statusMacSecConn::SMacSecConn_Success",
        1: "statusMacSecConn::SMacSecConn_MKASetupFailure",
        2: "statusMacSecConn::SMacSecConn_MKAPacketsExchangeFailure",
    },
    L1MacSec_status_t: {
        0: "status::Status_Success",
        1: "status::Status_Failure",
    },
    L1MacSec_PerfMeasInterval_t: {
        0: "PerfMeasInterval::PerfMeasInterval_Disabled",
        1: "PerfMeasInterval::PerfMeasInterval_1min",
        2: "PerfMeasInterval::PerfMeasInterval_5min",
        3: "PerfMeasInterval::PerfMeasInterval_15min",
        4: "PerfMeasInterval::PerfMeasInterval_30min",
        5: "PerfMeasInterval::PerfMeasInterval_60min",
        6: "PerfMeasInterval::PerfMeasInterval_360min",
        7: "PerfMeasInterval::PerfMeasInterval_720min",
        8: "PerfMeasInterval::PerfMeasInterval_1440min",
    },
    _policyType_t: {
        0: "policyType::E2E_CU_Plane",
        1: "policyType::E2E_M_Plane",
    },
    _macSecCipherSuite_t: {
        0: "macSecCipherSuite::GCM_AES_128",
        1: "macSecCipherSuite::GCM_AES_256",
        2: "macSecCipherSuite::GCM_AES_XPN_128",
        3: "macSecCipherSuite::GCM_AES_XPN_256",
    },
    _macSecProtectionMode_t: {
        0: "macSecProtectionMode::Integrity",
        1: "macSecProtectionMode::Integrity_and_confidentiality",
    },
    _ruleSetAction_t: {
        0: "ruleSetAction::PROTECT",
        1: "ruleSetAction::BYPASS",
    },
    _trafficMode_t: {
        0: "trafficMode::CUM_Plane",
        1: "trafficMode::CU_Plane",
        2: "trafficMode::M_Plane",
    },
    _trafficMacSecProtection_t: {
        0: "trafficMacSecProtection::CUplaneProtection",
        1: "trafficMacSecProtection::CUMplaneProtection",
    },
};
