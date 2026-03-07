function L1CpridecodeAlarmInd_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.scramblingSeed = l2l1_getU32(offset + 4);
    result.cpriPointerP = l2l1_getU32(offset + 8);
    result.optLinkLength = l2l1_getU32(offset + 12);

    return result;
}
function L1CpriencodeSCpriLinkItem(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.scramblingSeed, buf, off + 4);
    l2l1_putU32(msg.cpriPointerP, buf, off + 8);
    l2l1_putU32(msg.optLinkLength, buf, off + 12);
}
function L1CpridecodeConfigureLinksReq_t(offset) {
    let result = {};

    result.l1_StartupTimer = l2l1_getU32(offset + 0);
    result.numOfItems = l2l1_getU32(offset + 4);
    result.cpriLink = decodeStaticVariableSizedArray_SCpriLinkItem_16(offset + 8);
    result.dlCpriLinkMapConfig = l2l1_getU8(offset + 268);
/*    if (!(result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object] || result.dlCpriLinkMapConfig === [object Object]))
        throw new Error(`Value ${result.dlCpriLinkMapConfig} is out of range for enum 'ECellMap'`); */
    Object.defineProperty(result, "__enum_dlCpriLinkMapConfig", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECellMap",
    });
    result.ulCpriLinkMapConfig = l2l1_getU8(offset + 269);
/*    if (!(result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object] || result.ulCpriLinkMapConfig === [object Object]))
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
    l2l1_putU8(msg.dlCpriLinkMapConfig, buf, off + 268);
    l2l1_putU8(msg.ulCpriLinkMapConfig, buf, off + 269);
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.sicad = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeSubscribeReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU32(msg.sicad, buf, off + 4);
}
function L1CpridecodeSubscribeResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
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
function L1CpriencodeDelayConfigReq_t(msg, buf, off) {
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
function L1CpridecodeDelayConfigResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
function L1CpriencodeGetLinkParamResp_t(msg, buf, off) {
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
function L1CpridecodeSetDiscoveryReq_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
        throw new Error(`Value ${result.cpriLink} is out of range for enum 'ECpriLink'`); */
    Object.defineProperty(result, "__enum_cpriLink", {
        enumerable: false,
        writable: false,
        value: "L1Cpri_ECpriLink",
    });
    result.parameterMask = l2l1_getU16(offset + 2);
    result.LCVWindow = l2l1_getU32(offset + 4);

    return result;
}
function L1CpriencodeSetLinkPropertiesReq_t(msg, buf, off) {
    l2l1_putU8(msg.cpriLink, buf, off + 0);
    l2l1_putU16(msg.parameterMask, buf, off + 2);
    l2l1_putU32(msg.LCVWindow, buf, off + 4);
}
function L1CpridecodeSetLinkPropertiesResp_t(offset) {
    let result = {};

    result.cpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object] || result.cpriLink === [object Object]))
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
function DlCelldecodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object]))
        throw new Error(`Value ${result.dlSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
/*    if (!(result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object]))
        throw new Error(`Value ${result.dlMimoMode} is out of range for enum 'dlMimoMode_t'`); */
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlMimoMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
/*    if (!(result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object]))
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
    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 16);
    result.ssBlockPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_224(offset + 240);
    result.dlSubcellPosition = l2l1_getU8(offset + 688);
/*    if (!(result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object]))
        throw new Error(`Value ${result.dlSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 689);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 690);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_4(offset + 692);
    result.conformanceTestMode = l2l1_getU8(offset + 700);

    return result;
}
function DlCellencodeSetupReq_t(msg, buf, off) {
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
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 16);
    encodeStaticFixedSizedArray_uint16_224(msg.ssBlockPhaseCompensationLutIndex, buf, off + 240);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 688);
    l2l1_putU8(msg.eCpriLink, buf, off + 689);
    l2l1_putU8(msg.numCeAxCId, buf, off + 690);
    encodeStaticFixedSizedArray_uint16_4(msg.ceAxCId, buf, off + 692);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 700);
}
function DlCelldecodeSetupResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlCellencodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
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
function decodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.dlSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object] || result.dlSubcellType === [object Object]))
        throw new Error(`Value ${result.dlSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_dlSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.dlMimoMode = l2l1_getU8(offset + 2);
/*    if (!(result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object] || result.dlMimoMode === [object Object]))
        throw new Error(`Value ${result.dlMimoMode} is out of range for enum 'dlMimoMode_t'`); */
    Object.defineProperty(result, "__enum_dlMimoMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlMimoMode_t",
    });
    result.physCellId = l2l1_getU16(offset + 4);
    result.dlBandwidth = l2l1_getU16(offset + 6);
/*    if (!(result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object] || result.dlBandwidth === [object Object]))
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
    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 16);
    result.ssBlockPhaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_224(offset + 240);
    result.dlSubcellPosition = l2l1_getU8(offset + 688);
/*    if (!(result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object] || result.dlSubcellPosition === [object Object]))
        throw new Error(`Value ${result.dlSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_dlSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });
    result.eCpriLink = l2l1_getU8(offset + 689);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
        throw new Error(`Value ${result.eCpriLink} is out of range for enum 'EECpriLink_t'`); */
    Object.defineProperty(result, "__enum_eCpriLink", {
        enumerable: false,
        writable: false,
        value: "L1ECpri_EECpriLink_t",
    });
    result.numCeAxCId = l2l1_getU8(offset + 690);
/*    if (!(result.numCeAxCId === [object Object] || result.numCeAxCId === [object Object]))
        throw new Error(`Value ${result.numCeAxCId} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCId", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCId = decodeStaticFixedSizedArray_uint16_4(offset + 692);
    result.conformanceTestMode = l2l1_getU8(offset + 700);

    return result;
}
function encodeSetupReq_t(msg, buf, off) {
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
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 16);
    encodeStaticFixedSizedArray_uint16_224(msg.ssBlockPhaseCompensationLutIndex, buf, off + 240);
    l2l1_putU8(msg.dlSubcellPosition, buf, off + 688);
    l2l1_putU8(msg.eCpriLink, buf, off + 689);
    l2l1_putU8(msg.numCeAxCId, buf, off + 690);
    encodeStaticFixedSizedArray_uint16_4(msg.ceAxCId, buf, off + 692);
    l2l1_putU8(msg.conformanceTestMode, buf, off + 700);
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
function DlDatadecodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function DlDataencodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
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
/*    if (!(result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object] || result.slotType === [object Object]))
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
/*    if (!(result.pdcchPrecodingOption4x4 === [object Object] || result.pdcchPrecodingOption4x4 === [object Object] || result.pdcchPrecodingOption4x4 === [object Object]))
        throw new Error(`Value ${result.pdcchPrecodingOption4x4} is out of range for enum 'pdcchPrecodingOption4x4_t'`); */
    Object.defineProperty(result, "__enum_pdcchPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "l1_common_pdcchPrecodingOption4x4_t",
    });
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.pdcchDciTransmitPower = l2l1_getI16(offset + 10);
    result.coresetFreqDomain = l2l1_getU64(offset + 16);
    result.cceRegMappingType = l2l1_getU8(offset + 24);
/*    if (!(result.cceRegMappingType === [object Object] || result.cceRegMappingType === [object Object]))
        throw new Error(`Value ${result.cceRegMappingType} is out of range for enum 'cceRegMappingType_t'`); */
    Object.defineProperty(result, "__enum_cceRegMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_cceRegMappingType_t",
    });
    result.nShiftModNumOfRegBundles = l2l1_getU16(offset + 26);
    result.interleaverRows = l2l1_getU8(offset + 28);
/*    if (!(result.interleaverRows === [object Object] || result.interleaverRows === [object Object] || result.interleaverRows === [object Object]))
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
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
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
    l2l1_putU64(msg.coresetFreqDomain, buf, off + 16);
    l2l1_putU8(msg.cceRegMappingType, buf, off + 24);
    l2l1_putU16(msg.nShiftModNumOfRegBundles, buf, off + 26);
    l2l1_putU8(msg.interleaverRows, buf, off + 28);
    l2l1_putU8(msg.regBundleSize, buf, off + 29);
    l2l1_putU8(msg.precoderGranularity, buf, off + 30);
    l2l1_putU8(msg.coresetFreqDomainRbShift, buf, off + 31);
    l2l1_putU8(msg.dciSize, buf, off + 32);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 33);
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
    result.dciInfo = decodeDynamicVariableSizedArray_DciInfo_8(offset + 8);

    return result;
}
function DlDataencodePdcchSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    l2l1_putU8(msg.beamId, buf, off + 5);
    encodeDynamicVariableSizedArray_DciInfo_8(msg.dciInfo, buf, off + 8);
}
function DlDatadecodePdschSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.rnti = l2l1_getU16(offset + 6);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 8);
    result.dlDmrsConfigType = l2l1_getU8(offset + 10);
/*    if (!(result.dlDmrsConfigType === [object Object] || result.dlDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.dlDmrsConfigType} is out of range for enum 'dlDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dlDmrsConfigType_t",
    });
    result.dlDmrsLen = l2l1_getU8(offset + 11);
/*    if (!(result.dlDmrsLen === [object Object] || result.dlDmrsLen === [object Object]))
        throw new Error(`Value ${result.dlDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.dlDmrsMappingType = l2l1_getU8(offset + 12);
/*    if (!(result.dlDmrsMappingType === [object Object] || result.dlDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.dlDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_dlDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.dlDmrsAddPos = l2l1_getU8(offset + 13);
    result.dlDmrsTypeAPos = l2l1_getU8(offset + 14);
    result.nscId = l2l1_getU8(offset + 15);
    result.startSymbol = l2l1_getU8(offset + 16);
    result.numOfPdschSymbols = l2l1_getU8(offset + 17);
/*    if (!(result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object] || result.numOfPdschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPdschSymbols} is out of range for enum 'NumOfPdschSymbols'`); */
    Object.defineProperty(result, "__enum_numOfPdschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_NumOfPdschSymbols",
    });
    result.antPort = l2l1_getU16(offset + 18);
    result.mcs = l2l1_getU8(offset + 20);
    result.mcsTable = l2l1_getU8(offset + 21);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object]))
        throw new Error(`Value ${result.mcsTable} is out of range for enum 'mcsTable_t'`); */
    Object.defineProperty(result, "__enum_mcsTable", {
        enumerable: false,
        writable: false,
        value: "l1_common_mcsTable_t",
    });
    result.spatialMode = l2l1_getU8(offset + 22);
/*    if (!(result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object] || result.spatialMode === [object Object]))
        throw new Error(`Value ${result.spatialMode} is out of range for enum 'SpatialMode'`); */
    Object.defineProperty(result, "__enum_spatialMode", {
        enumerable: false,
        writable: false,
        value: "l1_common_SpatialMode",
    });
    result.codebookIndex = l2l1_getU8(offset + 23);
/*    if (!(result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object] || result.codebookIndex === [object Object]))
        throw new Error(`Value ${result.codebookIndex} is out of range for enum 'DlCodebookIndex'`); */
    Object.defineProperty(result, "__enum_codebookIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_DlCodebookIndex",
    });
    result.startPrb = l2l1_getU16(offset + 24);
    result.numOfPrb = l2l1_getU16(offset + 26);
    result.dlPtrsFlag = l2l1_getU8(offset + 28);
/*    if (!(result.dlPtrsFlag === [object Object] || result.dlPtrsFlag === [object Object]))
        throw new Error(`Value ${result.dlPtrsFlag} is out of range for enum 'PtrsFlag'`); */
    Object.defineProperty(result, "__enum_dlPtrsFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_PtrsFlag",
    });
    result.dlPtrsTimeDensity = l2l1_getU8(offset + 29);
/*    if (!(result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object] || result.dlPtrsTimeDensity === [object Object]))
        throw new Error(`Value ${result.dlPtrsTimeDensity} is out of range for enum 'ptrsTimeDensity_t'`); */
    Object.defineProperty(result, "__enum_dlPtrsTimeDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsTimeDensity_t",
    });
    result.dlPtrsFrequencyDensity = l2l1_getU8(offset + 30);
/*    if (!(result.dlPtrsFrequencyDensity === [object Object] || result.dlPtrsFrequencyDensity === [object Object] || result.dlPtrsFrequencyDensity === [object Object]))
        throw new Error(`Value ${result.dlPtrsFrequencyDensity} is out of range for enum 'ptrsFrequencyDensity_t'`); */
    Object.defineProperty(result, "__enum_dlPtrsFrequencyDensity", {
        enumerable: false,
        writable: false,
        value: "l1_common_ptrsFrequencyDensity_t",
    });
    result.dlPtrsNumOfPorts = l2l1_getU8(offset + 31);
    result.dlPtrsResElemOffset = l2l1_getU8(offset + 32);
    result.offsetRbDmrs = l2l1_getU8(offset + 33);
    result.pdschTbTransmitPower = l2l1_getI16(offset + 34);
    result.pdschBundleSize = l2l1_getU16(offset + 36);
    result.baseGraph = l2l1_getU8(offset + 38);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 39);
    result.codeBlockSize = l2l1_getU16(offset + 40);
    result.numOfFillerBits = l2l1_getU16(offset + 42);
    result.liftSize = l2l1_getU16(offset + 44);
    result.liftSizeSetIndex = l2l1_getU8(offset + 46);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 47);
    result.modulationOrder = l2l1_getU8(offset + 48);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
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
    result.i1Codebook4AntPorts = decodeStaticFixedSizedArray_uint8_3(offset + 76);
    result.i2Codebook4AntPorts = l2l1_getU8(offset + 80);
    result.pdschClPrecodingOption4x4 = l2l1_getU8(offset + 81);
/*    if (!(result.pdschClPrecodingOption4x4 === [object Object] || result.pdschClPrecodingOption4x4 === [object Object] || result.pdschClPrecodingOption4x4 === [object Object]))
        throw new Error(`Value ${result.pdschClPrecodingOption4x4} is out of range for enum 'pdschClPrecodingOption4x4_t'`); */
    Object.defineProperty(result, "__enum_pdschClPrecodingOption4x4", {
        enumerable: false,
        writable: false,
        value: "l1_common_pdschClPrecodingOption4x4_t",
    });
    result.numCeAxCIndex = l2l1_getU8(offset + 82);
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
        throw new Error(`Value ${result.numCeAxCIndex} is out of range for enum 'numCeAxC_t'`); */
    Object.defineProperty(result, "__enum_numCeAxCIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_numCeAxC_t",
    });
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_4(offset + 84);
    result.patternId = decodeStaticFixedSizedArray_uint16_2(offset + 88);

    return result;
}
function DlDataencodePdschSendReq_t(msg, buf, off) {
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
    encodeStaticFixedSizedArray_uint8_3(msg.i1Codebook4AntPorts, buf, off + 76);
    l2l1_putU8(msg.i2Codebook4AntPorts, buf, off + 80);
    l2l1_putU8(msg.pdschClPrecodingOption4x4, buf, off + 81);
    l2l1_putU8(msg.numCeAxCIndex, buf, off + 82);
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 84);
    encodeStaticFixedSizedArray_uint16_2(msg.patternId, buf, off + 88);
}
function DlDatadecodePatternIdPolListPerSymbol_t(offset) {
    let result = {};

    result.patternIdPolListPerSymbol = decodeStaticFixedSizedArray_uint16_8(offset + 0);

    return result;
}
function DlDataencodePatternIdPolListPerSymbol_t(msg, buf, off) {
    encodeStaticFixedSizedArray_uint16_8(msg.patternIdPolListPerSymbol, buf, off + 0);
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
/*    if (!(result.precodingVectorIndex === [object Object] || result.precodingVectorIndex === [object Object]))
        throw new Error(`Value ${result.precodingVectorIndex} is out of range for enum 'precodingVectorIndex_t'`); */
    Object.defineProperty(result, "__enum_precodingVectorIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_precodingVectorIndex_t",
    });
    result.dataPayload = decodeStaticFixedSizedArray_uint8_4(offset + 8);
    result.ceAxCIndex = decodeStaticFixedSizedArray_uint8_2(offset + 12);
    result.patternId = decodeStaticFixedSizedArray_uint16_4(offset + 16);

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
    encodeStaticFixedSizedArray_uint8_2(msg.ceAxCIndex, buf, off + 12);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 16);
}
function DlDatadecodeCsiRsResource_t(offset) {
    let result = {};

    result.startSymbol = l2l1_getU8(offset + 0);
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
/*    if (!(result.numCeAxCIndex === [object Object] || result.numCeAxCIndex === [object Object]))
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
    encodeStaticFixedSizedArray_uint8_4(msg.ceAxCIndex, buf, off + 20);
    encodeStaticFixedSizedArray_uint16_4(msg.patternId, buf, off + 24);
}
function DlDatadecodeCsiRsSendReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.sfn = l2l1_getU16(offset + 2);
    result.slot = l2l1_getU8(offset + 4);
    result.csiRsResources = decodeDynamicVariableSizedArray_CsiRsResource_t_12(offset + 8);

    return result;
}
function DlDataencodeCsiRsSendReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 2);
    l2l1_putU8(msg.slot, buf, off + 4);
    encodeDynamicVariableSizedArray_CsiRsResource_t_12(msg.csiRsResources, buf, off + 8);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
}
function L1ECpridecodeSECpriLinkItem_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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

    return result;
}
function L1ECpriencodeDelayConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.eCpriLink, buf, off + 0);
    l2l1_putU32(msg.tDlAdvanceUp, buf, off + 4);
    l2l1_putU32(msg.tDlAdvanceCp, buf, off + 8);
    l2l1_putU32(msg.tUlAdvanceCp, buf, off + 12);
    l2l1_putU32(msg.receiveWindowOpen, buf, off + 16);
    l2l1_putU32(msg.receiveWindowClose, buf, off + 20);
}
function L1ECpridecodeDelayConfigResp_t(offset) {
    let result = {};

    result.eCpriLink = l2l1_getU8(offset + 0);
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
/*    if (!(result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object] || result.eCpriLink === [object Object]))
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
function L1LogdecodeAntennaSnapshotReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slotNumber = l2l1_getU8(offset + 2);
    result.fileSize64MB = l2l1_getU8(offset + 3);
    result.requestType = l2l1_getU8(offset + 4);
    result.captureMode = l2l1_getU8(offset + 5);
    result.oneFilePerPath = l2l1_getU8(offset + 6);
    result.spare_1 = l2l1_getU8(offset + 7);
    result.spare_2 = l2l1_getU32(offset + 8);

    return result;
}
function L1LogencodeAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slotNumber, buf, off + 2);
    l2l1_putU8(msg.fileSize64MB, buf, off + 3);
    l2l1_putU8(msg.requestType, buf, off + 4);
    l2l1_putU8(msg.captureMode, buf, off + 5);
    l2l1_putU8(msg.oneFilePerPath, buf, off + 6);
    l2l1_putU8(msg.spare_1, buf, off + 7);
    l2l1_putU32(msg.spare_2, buf, off + 8);
}
function L1LogdecodeAntennaSnapshotResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
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
function L1LogdecodeAntennaSnapshotInd_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slotNumber = l2l1_getU8(offset + 2);
    result.fileSize64MB = l2l1_getU8(offset + 3);
    result.fileNameLength = l2l1_getU8(offset + 4);
    result.status = l2l1_getU8(offset + 5);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
        throw new Error(`Value ${result.status} is out of range for enum 'EStatus_5G'`); */
    Object.defineProperty(result, "__enum_status", {
        enumerable: false,
        writable: false,
        value: "l1_common_EStatus_5G",
    });
    result.fileName = decodeStaticVariableSizedArray_uint8_100(offset + 8);

    return result;
}
function L1LogencodeAntennaSnapshotInd_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slotNumber, buf, off + 2);
    l2l1_putU8(msg.fileSize64MB, buf, off + 3);
    l2l1_putU8(msg.fileNameLength, buf, off + 4);
    l2l1_putU8(msg.status, buf, off + 5);
    encodeStaticVariableSizedArray_uint8_100(msg.fileName, buf, off + 8);
}
function L1LogdecodeTraceReqHeader_t(offset) {
    let result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.trswEQID = l2l1_getU16(offset + 2);
    result.startStopReport = l2l1_getU8(offset + 4);
/*    if (!(result.startStopReport === [object Object] || result.startStopReport === [object Object]))
        throw new Error(`Value ${result.startStopReport} is out of range for enum 'EReportType'`); */
    Object.defineProperty(result, "__enum_startStopReport", {
        enumerable: false,
        writable: false,
        value: "L1Log_EReportType",
    });
    result.outputMode = l2l1_getU8(offset + 5);
/*    if (!(result.outputMode === [object Object] || result.outputMode === [object Object]))
        throw new Error(`Value ${result.outputMode} is out of range for enum 'EOutputMode'`); */
    Object.defineProperty(result, "__enum_outputMode", {
        enumerable: false,
        writable: false,
        value: "L1Log_EOutputMode",
    });

    return result;
}
function L1LogencodeTraceReqHeader_t(msg, buf, off) {
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU16(msg.trswEQID, buf, off + 2);
    l2l1_putU8(msg.startStopReport, buf, off + 4);
    l2l1_putU8(msg.outputMode, buf, off + 5);
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
    result.traces = decodeStaticVariableSizedArray_TraceReqEntry_t_10(offset + 8);

    return result;
}
function L1LogencodeTraceReq_t(msg, buf, off) {
    L1LogencodeTraceReqHeader_t(msg.header, buf, off + 0);
    encodeStaticVariableSizedArray_TraceReqEntry_t_10(msg.traces, buf, off + 8);
}
function L1LogdecodeTraceResp_t(offset) {
    let result = {};

    result.physCellId = l2l1_getU16(offset + 0);
    result.status = l2l1_getU8(offset + 2);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
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

    result.physCellId = l2l1_getU16(offset + 0);
    result.antSnapshotL1EventEnabled = l2l1_getU8(offset + 2);
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
    l2l1_putU16(msg.physCellId, buf, off + 0);
    l2l1_putU8(msg.antSnapshotL1EventEnabled, buf, off + 2);
}
function L1LogdecodeShowTraceListResp_t(offset) {
    let result = {};

    result.status = l2l1_getU8(offset + 0);
/*    if (!(result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object] || result.status === [object Object]))
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
function decodeAntennaSnapshotReq_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slotNumber = l2l1_getU8(offset + 2);
    result.fileSize64MB = l2l1_getU8(offset + 3);
    result.requestType = l2l1_getU8(offset + 4);
    result.captureMode = l2l1_getU8(offset + 5);
    result.oneFilePerPath = l2l1_getU8(offset + 6);
    result.spare_1 = l2l1_getU8(offset + 7);
    result.spare_2 = l2l1_getU32(offset + 8);

    return result;
}
function encodeAntennaSnapshotReq_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slotNumber, buf, off + 2);
    l2l1_putU8(msg.fileSize64MB, buf, off + 3);
    l2l1_putU8(msg.requestType, buf, off + 4);
    l2l1_putU8(msg.captureMode, buf, off + 5);
    l2l1_putU8(msg.oneFilePerPath, buf, off + 6);
    l2l1_putU8(msg.spare_1, buf, off + 7);
    l2l1_putU32(msg.spare_2, buf, off + 8);
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
    result.ptpECpriPort = decodeStaticVariableSizedArray_uint8_10(offset + 64);

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
    encodeStaticVariableSizedArray_uint8_10(msg.ptpECpriPort, buf, off + 64);
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
    result.ptpECpriPort = decodeStaticVariableSizedArray_uint8_10(offset + 32);

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
    encodeStaticVariableSizedArray_uint8_10(msg.ptpECpriPort, buf, off + 32);
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
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_uint8_10(offset + 4);

    return result;
}
function SyncMencodestartSyncEReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_10(msg.ssmSendingECpriPort, buf, off + 4);
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
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_uint8_10(offset + 4);

    return result;
}
function SyncMencodeupdateSyncEConfigReq_t(msg, buf, off) {
    l2l1_putU8(msg.g781NetworkOption, buf, off + 0);
    l2l1_putU8(msg.ssmQl, buf, off + 1);
    encodeStaticVariableSizedArray_uint8_10(msg.ssmSendingECpriPort, buf, off + 4);
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
    result.ssmSendingECpriPort = decodeStaticVariableSizedArray_SyncEStatus_10(offset + 4);

    return result;
}
function SyncMencodegetSyncEStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    encodeStaticVariableSizedArray_SyncEStatus_10(msg.ssmSendingECpriPort, buf, off + 4);
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
    result.ptpECpriPort = decodeStaticVariableSizedArray_PtpStatus_10(offset + 4);

    return result;
}
function SyncMencodegetPtpStatusResp_t(msg, buf, off) {
    l2l1_putU8(msg.status, buf, off + 0);
    encodeStaticVariableSizedArray_PtpStatus_10(msg.ptpECpriPort, buf, off + 4);
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
function UlCelldecodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object]))
        throw new Error(`Value ${result.ulSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
/*    if (!(result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object]))
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
/*    if (!(result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object]))
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
    result.dtxThresholdPrachSingleRx = l2l1_getU16(offset + 14);
    result.dtxThresholdPrachTwoRx = l2l1_getU16(offset + 16);
    result.prachCohCombLen = l2l1_getU8(offset + 18);
/*    if (!(result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object]))
        throw new Error(`Value ${result.prachCohCombLen} is out of range for enum 'prachCohCombLen_t'`); */
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 19);
    result.rxScalingFactor = l2l1_getI16(offset + 20);
    result.pneRbThreshold = decodeStaticFixedSizedArray_uint16_29(offset + 24);
    result.dtxThresholdPuschSingleLayerList = decodeStaticFixedSizedArray_uint16_273(offset + 80);
    result.dtxThresholdPuschTwoLayerList = decodeStaticFixedSizedArray_uint16_273(offset + 628);
    result.dtxThresholdPucchFormat0 = decodeStaticFixedSizedArray_uint8_12(offset + 1176);
    result.dtxThresholdPucchSingleLayerList = decodeStaticFixedSizedArray_uint16_22(offset + 1188);
    result.dtxThresholdPucchTwoLayerList = decodeStaticFixedSizedArray_uint16_22(offset + 1232);
    result.dtxThresholdSrsTwoAntennaPorts = l2l1_getU16(offset + 1276);
    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 1280);
    result.ulSubcellPosition = l2l1_getU8(offset + 1504);
/*    if (!(result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object]))
        throw new Error(`Value ${result.ulSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });

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
    l2l1_putU16(msg.dtxThresholdPrachSingleRx, buf, off + 14);
    l2l1_putU16(msg.dtxThresholdPrachTwoRx, buf, off + 16);
    l2l1_putU8(msg.prachCohCombLen, buf, off + 18);
    l2l1_putU8(msg.totalNumberOfRAPreambles, buf, off + 19);
    l2l1_putI16(msg.rxScalingFactor, buf, off + 20);
    encodeStaticFixedSizedArray_uint16_29(msg.pneRbThreshold, buf, off + 24);
    encodeStaticFixedSizedArray_uint16_273(msg.dtxThresholdPuschSingleLayerList, buf, off + 80);
    encodeStaticFixedSizedArray_uint16_273(msg.dtxThresholdPuschTwoLayerList, buf, off + 628);
    encodeStaticFixedSizedArray_uint8_12(msg.dtxThresholdPucchFormat0, buf, off + 1176);
    encodeStaticFixedSizedArray_uint16_22(msg.dtxThresholdPucchSingleLayerList, buf, off + 1188);
    encodeStaticFixedSizedArray_uint16_22(msg.dtxThresholdPucchTwoLayerList, buf, off + 1232);
    l2l1_putU16(msg.dtxThresholdSrsTwoAntennaPorts, buf, off + 1276);
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 1280);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 1504);
}
function UlCelldecodeSetupResp_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);

    return result;
}
function UlCellencodeSetupResp_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
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
function decodeSetupReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.ulSubcellType = l2l1_getU8(offset + 1);
/*    if (!(result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object] || result.ulSubcellType === [object Object]))
        throw new Error(`Value ${result.ulSubcellType} is out of range for enum 'SubcellType'`); */
    Object.defineProperty(result, "__enum_ulSubcellType", {
        enumerable: false,
        writable: false,
        value: "l1_common_SubcellType",
    });
    result.physCellId = l2l1_getU16(offset + 2);
    result.ulBandwidth = l2l1_getU16(offset + 4);
/*    if (!(result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object] || result.ulBandwidth === [object Object]))
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
/*    if (!(result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object] || result.prachStartSymbol === [object Object]))
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
    result.dtxThresholdPrachSingleRx = l2l1_getU16(offset + 14);
    result.dtxThresholdPrachTwoRx = l2l1_getU16(offset + 16);
    result.prachCohCombLen = l2l1_getU8(offset + 18);
/*    if (!(result.prachCohCombLen === [object Object] || result.prachCohCombLen === [object Object]))
        throw new Error(`Value ${result.prachCohCombLen} is out of range for enum 'prachCohCombLen_t'`); */
    Object.defineProperty(result, "__enum_prachCohCombLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_prachCohCombLen_t",
    });
    result.totalNumberOfRAPreambles = l2l1_getU8(offset + 19);
    result.rxScalingFactor = l2l1_getI16(offset + 20);
    result.pneRbThreshold = decodeStaticFixedSizedArray_uint16_29(offset + 24);
    result.dtxThresholdPuschSingleLayerList = decodeStaticFixedSizedArray_uint16_273(offset + 80);
    result.dtxThresholdPuschTwoLayerList = decodeStaticFixedSizedArray_uint16_273(offset + 628);
    result.dtxThresholdPucchFormat0 = decodeStaticFixedSizedArray_uint8_12(offset + 1176);
    result.dtxThresholdPucchSingleLayerList = decodeStaticFixedSizedArray_uint16_22(offset + 1188);
    result.dtxThresholdPucchTwoLayerList = decodeStaticFixedSizedArray_uint16_22(offset + 1232);
    result.dtxThresholdSrsTwoAntennaPorts = l2l1_getU16(offset + 1276);
    result.phaseCompensationLutIndex = decodeStaticFixedSizedArray_uint16_112(offset + 1280);
    result.ulSubcellPosition = l2l1_getU8(offset + 1504);
/*    if (!(result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object] || result.ulSubcellPosition === [object Object]))
        throw new Error(`Value ${result.ulSubcellPosition} is out of range for enum 'subcellPosition_t'`); */
    Object.defineProperty(result, "__enum_ulSubcellPosition", {
        enumerable: false,
        writable: false,
        value: "l1_common_subcellPosition_t",
    });

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
    l2l1_putU16(msg.dtxThresholdPrachSingleRx, buf, off + 14);
    l2l1_putU16(msg.dtxThresholdPrachTwoRx, buf, off + 16);
    l2l1_putU8(msg.prachCohCombLen, buf, off + 18);
    l2l1_putU8(msg.totalNumberOfRAPreambles, buf, off + 19);
    l2l1_putI16(msg.rxScalingFactor, buf, off + 20);
    encodeStaticFixedSizedArray_uint16_29(msg.pneRbThreshold, buf, off + 24);
    encodeStaticFixedSizedArray_uint16_273(msg.dtxThresholdPuschSingleLayerList, buf, off + 80);
    encodeStaticFixedSizedArray_uint16_273(msg.dtxThresholdPuschTwoLayerList, buf, off + 628);
    encodeStaticFixedSizedArray_uint8_12(msg.dtxThresholdPucchFormat0, buf, off + 1176);
    encodeStaticFixedSizedArray_uint16_22(msg.dtxThresholdPucchSingleLayerList, buf, off + 1188);
    encodeStaticFixedSizedArray_uint16_22(msg.dtxThresholdPucchTwoLayerList, buf, off + 1232);
    l2l1_putU16(msg.dtxThresholdSrsTwoAntennaPorts, buf, off + 1276);
    encodeStaticFixedSizedArray_uint16_112(msg.phaseCompensationLutIndex, buf, off + 1280);
    l2l1_putU8(msg.ulSubcellPosition, buf, off + 1504);
}
function UlDatadecodePuschReceiveRespLo_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.rnti = l2l1_getU16(offset + 4);
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 8);
    result.data = decodeDynamicVariableSizedArray_uint8_50205(offset + 12);

    return result;
}
function UlDataencodePuschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 8);
    encodeDynamicVariableSizedArray_uint8_50205(msg.data, buf, off + 12);
}
function decodePuschReceiveRespLo_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcellId = l2l1_getU8(offset + 3);
    result.rnti = l2l1_getU16(offset + 4);
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 8);
    result.data = decodeDynamicVariableSizedArray_uint8_50205(offset + 12);

    return result;
}
function encodePuschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 8);
    encodeDynamicVariableSizedArray_uint8_50205(msg.data, buf, off + 12);
}
function l1_commondecodeL2Addresses(offset) {
    let result = {};

    result.prachReceiveInd = l2l1_getU32(offset + 0);

    return result;
}
function l1_commonencodeL2Addresses(msg, buf, off) {
    l2l1_putU32(msg.prachReceiveInd, buf, off + 0);
}
function UlDatadecodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2Addresses = l1_commondecodeL2Addresses(offset + 4);

    return result;
}
function UlDataencodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2Addresses(msg.l2Addresses, buf, off + 4);
}
function l1_commondecodeL1UlAddresses(offset) {
    let result = {};

    result.puschReceiveReq = l2l1_getU32(offset + 0);
    result.pucchReceiveReq = l2l1_getU32(offset + 4);
    result.srsReceiveReq = l2l1_getU32(offset + 8);
    result.prachReceiveReq = l2l1_getU32(offset + 12);

    return result;
}
function l1_commonencodeL1UlAddresses(msg, buf, off) {
    l2l1_putU32(msg.puschReceiveReq, buf, off + 0);
    l2l1_putU32(msg.pucchReceiveReq, buf, off + 4);
    l2l1_putU32(msg.srsReceiveReq, buf, off + 8);
    l2l1_putU32(msg.prachReceiveReq, buf, off + 12);
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
    result.rnti = l2l1_getU16(offset + 4);
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 8);
    result.data = decodeDynamicVariableSizedArray_uint8_50205(offset + 12);

    return result;
}
function UlDataencodePuschReceiveRespLo_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    l2l1_putU8(msg.subcellId, buf, off + 3);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 8);
    encodeDynamicVariableSizedArray_uint8_50205(msg.data, buf, off + 12);
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
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
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
    result.uciCsiPart1Bits = decodeStaticFixedSizedArray_uint8_4(offset + 72);
    result.uciCsiPart2Bits = decodeStaticFixedSizedArray_uint8_2(offset + 76);

    return result;
}
function UlDataencodeUePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
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
    encodeStaticFixedSizedArray_uint8_4(msg.uciCsiPart1Bits, buf, off + 72);
    encodeStaticFixedSizedArray_uint8_2(msg.uciCsiPart2Bits, buf, off + 76);
}
function UlDatadecodepuschReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.grants = decodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_8(offset + 8);

    return result;
}
function UlDataencodepuschReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    encodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_8(msg.grants, buf, off + 8);
}
function UlDatadecodeUePuschReceiveRespPs_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.harqProcessIndex = l2l1_getU8(offset + 2);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 4);
    result.dtx = l2l1_getU8(offset + 6);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
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
    result.uciCsiPart1Bits = decodeStaticFixedSizedArray_uint8_4(offset + 72);
    result.uciCsiPart2Bits = decodeStaticFixedSizedArray_uint8_2(offset + 76);

    return result;
}
function UlDataencodeUePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.rnti, buf, off + 0);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 2);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 4);
    l2l1_putU8(msg.dtx, buf, off + 6);
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
    encodeStaticFixedSizedArray_uint8_4(msg.uciCsiPart1Bits, buf, off + 72);
    encodeStaticFixedSizedArray_uint8_2(msg.uciCsiPart2Bits, buf, off + 76);
}
function UlDatadecodePuschReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePuschReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_puschReceiveRespPsSubcell_t_4(msg.subcells, buf, off + 4);
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
function UlDatadecodepuschReceiveReqGrant_t(offset) {
    let result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.selfContainedFlag = l2l1_getU8(offset + 6);
/*    if (!(result.selfContainedFlag === [object Object] || result.selfContainedFlag === [object Object]))
        throw new Error(`Value ${result.selfContainedFlag} is out of range for enum 'selfContainedFlag'`); */
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_selfContainedFlag",
    });
    result.ulDmrsConfigType = l2l1_getU8(offset + 7);
/*    if (!(result.ulDmrsConfigType === [object Object] || result.ulDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.ulDmrsConfigType} is out of range for enum 'ulDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 8);
/*    if (!(result.ulDmrsLen === [object Object] || result.ulDmrsLen === [object Object]))
        throw new Error(`Value ${result.ulDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 9);
/*    if (!(result.ulDmrsMappingType === [object Object] || result.ulDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.ulDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 10);
    result.startSymbol = l2l1_getU8(offset + 11);
/*    if (!(result.startSymbol === [object Object] || result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'puschStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 12);
/*    if (!(result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPuschSymbols} is out of range for enum 'numOfPuschSymbols_t'`); */
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPuschSymbols_t",
    });
    result.startPrb = l2l1_getU16(offset + 14);
    result.numOfPrb = l2l1_getU16(offset + 16);
    result.mcs = l2l1_getU8(offset + 18);
    result.mcsTable = l2l1_getU8(offset + 19);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object]))
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
    result.harqProcessIndex = l2l1_getU8(offset + 33);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 34);
    result.freshHarqTrans = l2l1_getU8(offset + 36);
    result.numOfUciCsiPart1Bits = l2l1_getU8(offset + 37);
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 38);
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 40);
    result.numOfUciCsiPart2Symbols = l2l1_getU16(offset + 42);
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 44);
    result.foeValid = l2l1_getU8(offset + 52);
    result.baseGraph = l2l1_getU8(offset + 53);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 54);
    result.codeBlockSize = l2l1_getU16(offset + 56);
    result.numOfFillerBits = l2l1_getU16(offset + 58);
    result.liftSize = l2l1_getU16(offset + 60);
    result.liftSizeSetIndex = l2l1_getU8(offset + 62);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 63);
    result.modulationOrder = l2l1_getU8(offset + 64);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 65);
    result.ncb = l2l1_getU16(offset + 66);
    result.k0divZ = l2l1_getU8(offset + 68);
    result.numOfLayers = l2l1_getU8(offset + 69);
    result.puschTransCoherence = l2l1_getU8(offset + 70);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });

    return result;
}
function UlDataencodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.selfContainedFlag, buf, off + 6);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 7);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 8);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 9);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 10);
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
    l2l1_putU8(msg.harqProcessIndex, buf, off + 33);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 34);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 36);
    l2l1_putU8(msg.numOfUciCsiPart1Bits, buf, off + 37);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 38);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 40);
    l2l1_putU16(msg.numOfUciCsiPart2Symbols, buf, off + 42);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 44);
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
function UlDatadecodepuschReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.grants = decodeDynamicVariableSizedArray_puschReceiveReqGrant_t_8(offset + 4);

    return result;
}
function UlDataencodepuschReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_puschReceiveReqGrant_t_8(msg.grants, buf, off + 4);
}
function UlDatadecodepuschReceiveReqGrant_t(offset) {
    let result = {};

    result.tbSize_bits = l2l1_getU32(offset + 0);
    result.rnti = l2l1_getU16(offset + 4);
    result.selfContainedFlag = l2l1_getU8(offset + 6);
/*    if (!(result.selfContainedFlag === [object Object] || result.selfContainedFlag === [object Object]))
        throw new Error(`Value ${result.selfContainedFlag} is out of range for enum 'selfContainedFlag'`); */
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_selfContainedFlag",
    });
    result.ulDmrsConfigType = l2l1_getU8(offset + 7);
/*    if (!(result.ulDmrsConfigType === [object Object] || result.ulDmrsConfigType === [object Object]))
        throw new Error(`Value ${result.ulDmrsConfigType} is out of range for enum 'ulDmrsConfigType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsConfigType", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulDmrsConfigType_t",
    });
    result.ulDmrsLen = l2l1_getU8(offset + 8);
/*    if (!(result.ulDmrsLen === [object Object] || result.ulDmrsLen === [object Object]))
        throw new Error(`Value ${result.ulDmrsLen} is out of range for enum 'dmrsLen_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsLen", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsLen_t",
    });
    result.ulDmrsMappingType = l2l1_getU8(offset + 9);
/*    if (!(result.ulDmrsMappingType === [object Object] || result.ulDmrsMappingType === [object Object]))
        throw new Error(`Value ${result.ulDmrsMappingType} is out of range for enum 'dmrsMappingType_t'`); */
    Object.defineProperty(result, "__enum_ulDmrsMappingType", {
        enumerable: false,
        writable: false,
        value: "l1_common_dmrsMappingType_t",
    });
    result.ulDmrsAddPos = l2l1_getU8(offset + 10);
    result.startSymbol = l2l1_getU8(offset + 11);
/*    if (!(result.startSymbol === [object Object] || result.startSymbol === [object Object]))
        throw new Error(`Value ${result.startSymbol} is out of range for enum 'puschStartSymbol_t'`); */
    Object.defineProperty(result, "__enum_startSymbol", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschStartSymbol_t",
    });
    result.numOfPuschSymbols = l2l1_getU8(offset + 12);
/*    if (!(result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object] || result.numOfPuschSymbols === [object Object]))
        throw new Error(`Value ${result.numOfPuschSymbols} is out of range for enum 'numOfPuschSymbols_t'`); */
    Object.defineProperty(result, "__enum_numOfPuschSymbols", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPuschSymbols_t",
    });
    result.startPrb = l2l1_getU16(offset + 14);
    result.numOfPrb = l2l1_getU16(offset + 16);
    result.mcs = l2l1_getU8(offset + 18);
    result.mcsTable = l2l1_getU8(offset + 19);
/*    if (!(result.mcsTable === [object Object] || result.mcsTable === [object Object]))
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
    result.harqProcessIndex = l2l1_getU8(offset + 33);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.absoluteHarqProcessIndex = l2l1_getU16(offset + 34);
    result.freshHarqTrans = l2l1_getU8(offset + 36);
    result.numOfUciCsiPart1Bits = l2l1_getU8(offset + 37);
    result.numOfUciCsiPart1Symbols = l2l1_getU16(offset + 38);
    result.numOfUciCsiPart2Bits = l2l1_getU8(offset + 40);
    result.numOfUciCsiPart2Symbols = l2l1_getU16(offset + 42);
    result.longTermCfoMetric = l1_commondecodelongTermCfoMetric_t(offset + 44);
    result.foeValid = l2l1_getU8(offset + 52);
    result.baseGraph = l2l1_getU8(offset + 53);
/*    if (!(result.baseGraph === [object Object] || result.baseGraph === [object Object]))
        throw new Error(`Value ${result.baseGraph} is out of range for enum 'ldpcBaseGraph_t'`); */
    Object.defineProperty(result, "__enum_baseGraph", {
        enumerable: false,
        writable: false,
        value: "l1_common_ldpcBaseGraph_t",
    });
    result.numOfCodeBlocks = l2l1_getU8(offset + 54);
    result.codeBlockSize = l2l1_getU16(offset + 56);
    result.numOfFillerBits = l2l1_getU16(offset + 58);
    result.liftSize = l2l1_getU16(offset + 60);
    result.liftSizeSetIndex = l2l1_getU8(offset + 62);
    result.liftSizeColumnIndex = l2l1_getU8(offset + 63);
    result.modulationOrder = l2l1_getU8(offset + 64);
/*    if (!(result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object] || result.modulationOrder === [object Object]))
        throw new Error(`Value ${result.modulationOrder} is out of range for enum 'modulationOrder_t'`); */
    Object.defineProperty(result, "__enum_modulationOrder", {
        enumerable: false,
        writable: false,
        value: "l1_common_modulationOrder_t",
    });
    result.rvIndex = l2l1_getU8(offset + 65);
    result.ncb = l2l1_getU16(offset + 66);
    result.k0divZ = l2l1_getU8(offset + 68);
    result.numOfLayers = l2l1_getU8(offset + 69);
    result.puschTransCoherence = l2l1_getU8(offset + 70);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });

    return result;
}
function UlDataencodepuschReceiveReqGrant_t(msg, buf, off) {
    l2l1_putU32(msg.tbSize_bits, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 4);
    l2l1_putU8(msg.selfContainedFlag, buf, off + 6);
    l2l1_putU8(msg.ulDmrsConfigType, buf, off + 7);
    l2l1_putU8(msg.ulDmrsLen, buf, off + 8);
    l2l1_putU8(msg.ulDmrsMappingType, buf, off + 9);
    l2l1_putU8(msg.ulDmrsAddPos, buf, off + 10);
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
    l2l1_putU8(msg.harqProcessIndex, buf, off + 33);
    l2l1_putU16(msg.absoluteHarqProcessIndex, buf, off + 34);
    l2l1_putU8(msg.freshHarqTrans, buf, off + 36);
    l2l1_putU8(msg.numOfUciCsiPart1Bits, buf, off + 37);
    l2l1_putU16(msg.numOfUciCsiPart1Symbols, buf, off + 38);
    l2l1_putU8(msg.numOfUciCsiPart2Bits, buf, off + 40);
    l2l1_putU16(msg.numOfUciCsiPart2Symbols, buf, off + 42);
    l1_commonencodelongTermCfoMetric_t(msg.longTermCfoMetric, buf, off + 44);
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
function UlDatadecodePuschReceiveReq_t(offset) {
    let result = {};

    result.addrPuschReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPuschReceiveRespLo = l2l1_getU32(offset + 4);
    result.addrPuschReceiveRespHarqU = l2l1_getU32(offset + 8);
    result.sfn = l2l1_getU16(offset + 12);
    result.slot = l2l1_getU8(offset + 14);
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(offset + 16);

    return result;
}
function UlDataencodePuschReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPuschReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPuschReceiveRespLo, buf, off + 4);
    l2l1_putU32(msg.addrPuschReceiveRespHarqU, buf, off + 8);
    l2l1_putU16(msg.sfn, buf, off + 12);
    l2l1_putU8(msg.slot, buf, off + 14);
    encodeDynamicVariableSizedArray_puschReceiveReqSubcell_t_4(msg.subcells, buf, off + 16);
}
function UlDatadecodeUePuschReceiveRespHarqU_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
/*    if (!(result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
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
    result.grants = decodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_8(offset + 4);

    return result;
}
function UlDataencodepuschReceiveRespHarqUSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_8(msg.grants, buf, off + 4);
}
function UlDatadecodeUePuschReceiveRespHarqU_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.crc = l2l1_getU8(offset + 2);
/*    if (!(result.crc === [object Object] || result.crc === [object Object]))
        throw new Error(`Value ${result.crc} is out of range for enum 'crc_t'`); */
    Object.defineProperty(result, "__enum_crc", {
        enumerable: false,
        writable: false,
        value: "l1_common_crc_t",
    });
    result.dtx = l2l1_getU8(offset + 3);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 4);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
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
    result.subcells = decodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePuschReceiveRespHarqU_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_puschReceiveRespHarqUSubcell_t_4(msg.subcells, buf, off + 4);
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
    result.detectedPrachPreambles = decodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(offset + 8);

    return result;
}
function UlDataencodeprachReceiveIndSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    encodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(msg.detectedPrachPreambles, buf, off + 8);
}
function UlDatadecodePrachReceiveInd_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePrachReceiveInd_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_prachReceiveIndSubcell_t_4(msg.subcells, buf, off + 4);
}
function UlDatadecodeprachReceiveIndSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.noisePower = l2l1_getF32(offset + 4);
    result.detectedPrachPreambles = decodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(offset + 8);

    return result;
}
function UlDataencodeprachReceiveIndSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putF32(msg.noisePower, buf, off + 4);
    encodeDynamicVariableSizedArray_detectedPrachPreambles_t_64(msg.detectedPrachPreambles, buf, off + 8);
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
function UlDatadecodepucchReceiveReqPucchResource_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.selfContainedFlag = l2l1_getU8(offset + 2);
/*    if (!(result.selfContainedFlag === [object Object] || result.selfContainedFlag === [object Object]))
        throw new Error(`Value ${result.selfContainedFlag} is out of range for enum 'selfContainedFlag'`); */
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_selfContainedFlag",
    });
    result.pucchFormat = l2l1_getU8(offset + 3);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 4);
/*    if (!(result.numOfLayers === [object Object] || result.numOfLayers === [object Object]))
        throw new Error(`Value ${result.numOfLayers} is out of range for enum 'numOfPucchLayers_t'`); */
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 5);
/*    if (!(result.numOfAntennaPorts === [object Object] || result.numOfAntennaPorts === [object Object]))
        throw new Error(`Value ${result.numOfAntennaPorts} is out of range for enum 'numOfPucchTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 8);
    result.numOfPrb = l2l1_getU8(offset + 10);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 12);
    result.dataScramblingInt = l2l1_getU16(offset + 14);
    result.nANPucch = l2l1_getU8(offset + 16);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 17);
    result.numOfSymbols = l2l1_getU8(offset + 18);
    result.firstSymbol = l2l1_getU8(offset + 19);
    result.frequencyHopping = l2l1_getU8(offset + 20);
/*    if (!(result.frequencyHopping === [object Object] || result.frequencyHopping === [object Object]))
        throw new Error(`Value ${result.frequencyHopping} is out of range for enum 'frequencyHopping_t'`); */
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "l1_common_frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 22);
    result.initialCyclicShift = l2l1_getU8(offset + 24);
    result.additionalDmrs = l2l1_getU8(offset + 25);
/*    if (!(result.additionalDmrs === [object Object] || result.additionalDmrs === [object Object]))
        throw new Error(`Value ${result.additionalDmrs} is out of range for enum 'pucchAdditionalDmrs_t'`); */
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 26);

    return result;
}
function UlDataencodepucchReceiveReqPucchResource_t(msg, buf, off) {
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
    l2l1_putU8(msg.nANPucch, buf, off + 16);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 17);
    l2l1_putU8(msg.numOfSymbols, buf, off + 18);
    l2l1_putU8(msg.firstSymbol, buf, off + 19);
    l2l1_putU8(msg.frequencyHopping, buf, off + 20);
    l2l1_putU16(msg.secondHopPrb, buf, off + 22);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 24);
    l2l1_putU8(msg.additionalDmrs, buf, off + 25);
    l2l1_putU8(msg.timeDomainOcc, buf, off + 26);
}
function UlDatadecodepucchReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_16(offset + 4);

    return result;
}
function UlDataencodepucchReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_16(msg.pucchResources, buf, off + 4);
}
function UlDatadecodepucchReceiveReqPucchResource_t(offset) {
    let result = {};

    result.rnti = l2l1_getU16(offset + 0);
    result.selfContainedFlag = l2l1_getU8(offset + 2);
/*    if (!(result.selfContainedFlag === [object Object] || result.selfContainedFlag === [object Object]))
        throw new Error(`Value ${result.selfContainedFlag} is out of range for enum 'selfContainedFlag'`); */
    Object.defineProperty(result, "__enum_selfContainedFlag", {
        enumerable: false,
        writable: false,
        value: "l1_common_selfContainedFlag",
    });
    result.pucchFormat = l2l1_getU8(offset + 3);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.numOfLayers = l2l1_getU8(offset + 4);
/*    if (!(result.numOfLayers === [object Object] || result.numOfLayers === [object Object]))
        throw new Error(`Value ${result.numOfLayers} is out of range for enum 'numOfPucchLayers_t'`); */
    Object.defineProperty(result, "__enum_numOfLayers", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchLayers_t",
    });
    result.numOfAntennaPorts = l2l1_getU8(offset + 5);
/*    if (!(result.numOfAntennaPorts === [object Object] || result.numOfAntennaPorts === [object Object]))
        throw new Error(`Value ${result.numOfAntennaPorts} is out of range for enum 'numOfPucchTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfAntennaPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfPucchTxAntennaPorts_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.startPrb = l2l1_getU16(offset + 8);
    result.numOfPrb = l2l1_getU8(offset + 10);
    result.dmrsScramblingSequenceInt = l2l1_getU16(offset + 12);
    result.dataScramblingInt = l2l1_getU16(offset + 14);
    result.nANPucch = l2l1_getU8(offset + 16);
    result.numOfBitsOfUciInformation = l2l1_getU8(offset + 17);
    result.numOfSymbols = l2l1_getU8(offset + 18);
    result.firstSymbol = l2l1_getU8(offset + 19);
    result.frequencyHopping = l2l1_getU8(offset + 20);
/*    if (!(result.frequencyHopping === [object Object] || result.frequencyHopping === [object Object]))
        throw new Error(`Value ${result.frequencyHopping} is out of range for enum 'frequencyHopping_t'`); */
    Object.defineProperty(result, "__enum_frequencyHopping", {
        enumerable: false,
        writable: false,
        value: "l1_common_frequencyHopping_t",
    });
    result.secondHopPrb = l2l1_getU16(offset + 22);
    result.initialCyclicShift = l2l1_getU8(offset + 24);
    result.additionalDmrs = l2l1_getU8(offset + 25);
/*    if (!(result.additionalDmrs === [object Object] || result.additionalDmrs === [object Object]))
        throw new Error(`Value ${result.additionalDmrs} is out of range for enum 'pucchAdditionalDmrs_t'`); */
    Object.defineProperty(result, "__enum_additionalDmrs", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchAdditionalDmrs_t",
    });
    result.timeDomainOcc = l2l1_getU8(offset + 26);

    return result;
}
function UlDataencodepucchReceiveReqPucchResource_t(msg, buf, off) {
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
    l2l1_putU8(msg.nANPucch, buf, off + 16);
    l2l1_putU8(msg.numOfBitsOfUciInformation, buf, off + 17);
    l2l1_putU8(msg.numOfSymbols, buf, off + 18);
    l2l1_putU8(msg.firstSymbol, buf, off + 19);
    l2l1_putU8(msg.frequencyHopping, buf, off + 20);
    l2l1_putU16(msg.secondHopPrb, buf, off + 22);
    l2l1_putU8(msg.initialCyclicShift, buf, off + 24);
    l2l1_putU8(msg.additionalDmrs, buf, off + 25);
    l2l1_putU8(msg.timeDomainOcc, buf, off + 26);
}
function UlDatadecodePucchReceiveReq_t(offset) {
    let result = {};

    result.addrPucchReceiveRespPs = l2l1_getU32(offset + 0);
    result.addrPucchReceiveRespHarqD = l2l1_getU32(offset + 4);
    result.sfn = l2l1_getU16(offset + 8);
    result.slot = l2l1_getU8(offset + 10);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_4(offset + 12);

    return result;
}
function UlDataencodePucchReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrPucchReceiveRespPs, buf, off + 0);
    l2l1_putU32(msg.addrPucchReceiveRespHarqD, buf, off + 4);
    l2l1_putU16(msg.sfn, buf, off + 8);
    l2l1_putU8(msg.slot, buf, off + 10);
    encodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_4(msg.subcells, buf, off + 12);
}
function UlDatadecodepucchReceiveRespPsPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 5);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 8);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 12);
    result.rxPower = l2l1_getF32(offset + 16);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 20);
    result.uciBits = decodeStaticFixedSizedArray_uint8_7(offset + 28);
    result.srBit = l2l1_getU8(offset + 36);
/*    if (!(result.srBit === [object Object] || result.srBit === [object Object] || result.srBit === [object Object]))
        throw new Error(`Value ${result.srBit} is out of range for enum 'bitValue_t'`); */
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "l1_common_bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 40);
    result.rssi = l2l1_getF32(offset + 44);
    result.dtxMetric = l2l1_getU16(offset + 48);
    result.dtxThreshold = l2l1_getU16(offset + 50);

    return result;
}
function UlDataencodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 4);
    l2l1_putU8(msg.pucchFormat, buf, off + 5);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 8);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 12);
    l2l1_putF32(msg.rxPower, buf, off + 16);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 20);
    encodeStaticFixedSizedArray_uint8_7(msg.uciBits, buf, off + 28);
    l2l1_putU8(msg.srBit, buf, off + 36);
    l2l1_putF32(msg.noisePower, buf, off + 40);
    l2l1_putF32(msg.rssi, buf, off + 44);
    l2l1_putU16(msg.dtxMetric, buf, off + 48);
    l2l1_putU16(msg.dtxThreshold, buf, off + 50);
}
function UlDatadecodepucchReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_16(offset + 4);

    return result;
}
function UlDataencodepucchReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_16(msg.pucchResources, buf, off + 4);
}
function UlDatadecodepucchReceiveRespPsPucchResource_t(offset) {
    let result = {};

    result.startPrb = l2l1_getU16(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.pucchFormat = l2l1_getU8(offset + 5);
/*    if (!(result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object] || result.pucchFormat === [object Object]))
        throw new Error(`Value ${result.pucchFormat} is out of range for enum 'pucchFormat_t'`); */
    Object.defineProperty(result, "__enum_pucchFormat", {
        enumerable: false,
        writable: false,
        value: "l1_common_pucchFormat_t",
    });
    result.harqProcessIndex = l2l1_getU8(offset + 6);
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 8);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 12);
    result.rxPower = l2l1_getF32(offset + 16);
    result.sinr = decodeStaticFixedSizedArray_float32_2(offset + 20);
    result.uciBits = decodeStaticFixedSizedArray_uint8_7(offset + 28);
    result.srBit = l2l1_getU8(offset + 36);
/*    if (!(result.srBit === [object Object] || result.srBit === [object Object] || result.srBit === [object Object]))
        throw new Error(`Value ${result.srBit} is out of range for enum 'bitValue_t'`); */
    Object.defineProperty(result, "__enum_srBit", {
        enumerable: false,
        writable: false,
        value: "l1_common_bitValue_t",
    });
    result.noisePower = l2l1_getF32(offset + 40);
    result.rssi = l2l1_getF32(offset + 44);
    result.dtxMetric = l2l1_getU16(offset + 48);
    result.dtxThreshold = l2l1_getU16(offset + 50);

    return result;
}
function UlDataencodepucchReceiveRespPsPucchResource_t(msg, buf, off) {
    l2l1_putU16(msg.startPrb, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.dtx, buf, off + 4);
    l2l1_putU8(msg.pucchFormat, buf, off + 5);
    l2l1_putU8(msg.harqProcessIndex, buf, off + 6);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 8);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 12);
    l2l1_putF32(msg.rxPower, buf, off + 16);
    encodeStaticFixedSizedArray_float32_2(msg.sinr, buf, off + 20);
    encodeStaticFixedSizedArray_uint8_7(msg.uciBits, buf, off + 28);
    l2l1_putU8(msg.srBit, buf, off + 36);
    l2l1_putF32(msg.noisePower, buf, off + 40);
    l2l1_putF32(msg.rssi, buf, off + 44);
    l2l1_putU16(msg.dtxMetric, buf, off + 48);
    l2l1_putU16(msg.dtxThreshold, buf, off + 50);
}
function UlDatadecodePucchReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePucchReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_4(msg.subcells, buf, off + 4);
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
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
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
}
function UlDatadecodepucchReceiveRespHarqDSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.pucchResources = decodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_16(offset + 4);

    return result;
}
function UlDataencodepucchReceiveRespHarqDSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    encodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_16(msg.pucchResources, buf, off + 4);
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
/*    if (!(result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object] || result.harqProcessIndex === [object Object]))
        throw new Error(`Value ${result.harqProcessIndex} is out of range for enum 'harqProcessIndex_t'`); */
    Object.defineProperty(result, "__enum_harqProcessIndex", {
        enumerable: false,
        writable: false,
        value: "l1_common_harqProcessIndex_t",
    });
    result.dtx = l2l1_getU8(offset + 4);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
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
}
function UlDatadecodePucchReceiveRespHarqD_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodePucchReceiveRespHarqD_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_4(msg.subcells, buf, off + 4);
}
function UlDatadecodeprachReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.prachPrbOffset = l2l1_getU16(offset + 2);
    result.prachOccasions = decodeStaticFixedSizedArray_uint16_8(offset + 4);

    return result;
}
function UlDataencodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 2);
    encodeStaticFixedSizedArray_uint16_8(msg.prachOccasions, buf, off + 4);
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
    result.prachPrbOffset = l2l1_getU16(offset + 2);
    result.prachOccasions = decodeStaticFixedSizedArray_uint16_8(offset + 4);

    return result;
}
function UlDataencodeprachReceiveReqSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.prachPrbOffset, buf, off + 2);
    encodeStaticFixedSizedArray_uint16_8(msg.prachOccasions, buf, off + 4);
}
function UlDatadecodesrsReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 4);
    result.transmissionComb = l2l1_getU8(offset + 5);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 6);
    result.srsBandwidth = l2l1_getU8(offset + 7);
    result.srsBandwidthConfig = l2l1_getU8(offset + 8);
    result.freqDomainPosition = l2l1_getU8(offset + 9);
    result.freqDomainShift = l2l1_getU16(offset + 10);
    result.sequenceId = l2l1_getU16(offset + 12);
    result.cyclicShift = l2l1_getU8(offset + 14);
    result.numOfSrsPorts = l2l1_getU8(offset + 15);
/*    if (!(result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object]))
        throw new Error(`Value ${result.numOfSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.puschTransCoherence = l2l1_getU8(offset + 16);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });

    return result;
}
function UlDataencodesrsReceiveReqSubcell_t(msg, buf, off) {
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
function UlDatadecodeSrsReceiveReq_t(offset) {
    let result = {};

    result.addrSrsReceiveResp = l2l1_getU32(offset + 0);
    result.sfn = l2l1_getU16(offset + 4);
    result.slot = l2l1_getU8(offset + 6);
    result.subcells = decodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(offset + 8);

    return result;
}
function UlDataencodeSrsReceiveReq_t(msg, buf, off) {
    l2l1_putU32(msg.addrSrsReceiveResp, buf, off + 0);
    l2l1_putU16(msg.sfn, buf, off + 4);
    l2l1_putU8(msg.slot, buf, off + 6);
    encodeDynamicVariableSizedArray_srsReceiveReqSubcell_t_4(msg.subcells, buf, off + 8);
}
function UlDatadecodesrsReceiveReqSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.symbolPosition = l2l1_getU8(offset + 4);
    result.transmissionComb = l2l1_getU8(offset + 5);
/*    if (!(result.transmissionComb === [object Object] || result.transmissionComb === [object Object]))
        throw new Error(`Value ${result.transmissionComb} is out of range for enum 'srsTransmissionComb_t'`); */
    Object.defineProperty(result, "__enum_transmissionComb", {
        enumerable: false,
        writable: false,
        value: "l1_common_srsTransmissionComb_t",
    });
    result.transmissionCombId = l2l1_getU8(offset + 6);
    result.srsBandwidth = l2l1_getU8(offset + 7);
    result.srsBandwidthConfig = l2l1_getU8(offset + 8);
    result.freqDomainPosition = l2l1_getU8(offset + 9);
    result.freqDomainShift = l2l1_getU16(offset + 10);
    result.sequenceId = l2l1_getU16(offset + 12);
    result.cyclicShift = l2l1_getU8(offset + 14);
    result.numOfSrsPorts = l2l1_getU8(offset + 15);
/*    if (!(result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object] || result.numOfSrsPorts === [object Object]))
        throw new Error(`Value ${result.numOfSrsPorts} is out of range for enum 'numOfSrsTxAntennaPorts_t'`); */
    Object.defineProperty(result, "__enum_numOfSrsPorts", {
        enumerable: false,
        writable: false,
        value: "l1_common_numOfSrsTxAntennaPorts_t",
    });
    result.puschTransCoherence = l2l1_getU8(offset + 16);
/*    if (!(result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object] || result.puschTransCoherence === [object Object]))
        throw new Error(`Value ${result.puschTransCoherence} is out of range for enum 'puschTransCoherence_t'`); */
    Object.defineProperty(result, "__enum_puschTransCoherence", {
        enumerable: false,
        writable: false,
        value: "l1_common_puschTransCoherence_t",
    });

    return result;
}
function UlDataencodesrsReceiveReqSubcell_t(msg, buf, off) {
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
function UlDatadecodesrsReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.ulRank = l2l1_getU8(offset + 4);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 5);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 8);
    result.ulPmiRank2 = l2l1_getU8(offset + 12);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 16);
    result.snr = l2l1_getF32(offset + 24);
    result.dtx = l2l1_getU8(offset + 28);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 30);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 32);

    return result;
}
function UlDataencodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.ulRank, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 5);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 8);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 12);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 16);
    l2l1_putF32(msg.snr, buf, off + 24);
    l2l1_putU8(msg.dtx, buf, off + 28);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 30);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 32);
}
function UlDatadecodeSrsReceiveRespPs_t(offset) {
    let result = {};

    result.sfn = l2l1_getU16(offset + 0);
    result.slot = l2l1_getU8(offset + 2);
    result.subcells = decodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(offset + 4);

    return result;
}
function UlDataencodeSrsReceiveRespPs_t(msg, buf, off) {
    l2l1_putU16(msg.sfn, buf, off + 0);
    l2l1_putU8(msg.slot, buf, off + 2);
    encodeDynamicVariableSizedArray_srsReceiveRespPsSubcell_t_4(msg.subcells, buf, off + 4);
}
function UlDatadecodesrsReceiveRespPsSubcell_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.rnti = l2l1_getU16(offset + 2);
    result.ulRank = l2l1_getU8(offset + 4);
/*    if (!(result.ulRank === [object Object] || result.ulRank === [object Object] || result.ulRank === [object Object]))
        throw new Error(`Value ${result.ulRank} is out of range for enum 'ulRank_t'`); */
    Object.defineProperty(result, "__enum_ulRank", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulRank_t",
    });
    result.ulPmiRank1 = l2l1_getU8(offset + 5);
/*    if (!(result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object] || result.ulPmiRank1 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank1} is out of range for enum 'ulPmiRank1_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank1", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank1_t",
    });
    result.ulPmiRank1Sinr = l2l1_getF32(offset + 8);
    result.ulPmiRank2 = l2l1_getU8(offset + 12);
/*    if (!(result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object] || result.ulPmiRank2 === [object Object]))
        throw new Error(`Value ${result.ulPmiRank2} is out of range for enum 'ulPmiRank2_t'`); */
    Object.defineProperty(result, "__enum_ulPmiRank2", {
        enumerable: false,
        writable: false,
        value: "l1_common_ulPmiRank2_t",
    });
    result.ulPmiRank2Sinr = decodeStaticFixedSizedArray_float32_2(offset + 16);
    result.snr = l2l1_getF32(offset + 24);
    result.dtx = l2l1_getU8(offset + 28);
/*    if (!(result.dtx === [object Object] || result.dtx === [object Object]))
        throw new Error(`Value ${result.dtx} is out of range for enum 'dtx_t'`); */
    Object.defineProperty(result, "__enum_dtx", {
        enumerable: false,
        writable: false,
        value: "l1_common_dtx_t",
    });
    result.shortTermTaMetric = l2l1_getI16(offset + 30);
    result.shortTermTaPeakAmp = l2l1_getF32(offset + 32);

    return result;
}
function UlDataencodesrsReceiveRespPsSubcell_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l2l1_putU16(msg.rnti, buf, off + 2);
    l2l1_putU8(msg.ulRank, buf, off + 4);
    l2l1_putU8(msg.ulPmiRank1, buf, off + 5);
    l2l1_putF32(msg.ulPmiRank1Sinr, buf, off + 8);
    l2l1_putU8(msg.ulPmiRank2, buf, off + 12);
    encodeStaticFixedSizedArray_float32_2(msg.ulPmiRank2Sinr, buf, off + 16);
    l2l1_putF32(msg.snr, buf, off + 24);
    l2l1_putU8(msg.dtx, buf, off + 28);
    l2l1_putI16(msg.shortTermTaMetric, buf, off + 30);
    l2l1_putF32(msg.shortTermTaPeakAmp, buf, off + 32);
}
function decodeAddressReq_t(offset) {
    let result = {};

    result.subcellId = l2l1_getU8(offset + 0);
    result.l2Addresses = l1_commondecodeL2Addresses(offset + 4);

    return result;
}
function encodeAddressReq_t(msg, buf, off) {
    l2l1_putU8(msg.subcellId, buf, off + 0);
    l1_commonencodeL2Addresses(msg.l2Addresses, buf, off + 4);
}
function l2l1_decode_msg(l2l1) {
    let result;
    switch (l2l1.message) {
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
    case 0x0a11: // L1Cpri::DelayConfigReq_t
        result = L1CpridecodeDelayConfigReq_t(0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        result = L1CpridecodeSetDiscoveryReq_t(0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        result = L1CpridecodeSetDiscoveryResp_t(0);
        break;
    case 0x0a14: // L1Cpri::SetLinkPropertiesReq_t
        result = L1CpridecodeSetLinkPropertiesReq_t(0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        result = L1CpridecodeSetLinkPropertiesResp_t(0);
        break;
    case 0x0a16: // L1Cpri::GetLinkParamResp_t
        result = L1CpridecodeGetLinkParamResp_t(0);
        break;
    case 0x0101: // DlCell::SetupResp_t
        result = DlCelldecodeSetupResp_t(0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        result = DlCelldecodeDeleteReq_t(0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        result = DlCelldecodeDeleteResp_t(0);
        break;
    case 0x0126: // DlCell::SetupReq_t
        result = DlCelldecodeSetupReq_t(0);
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
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        result = DlDatadecodePdschPayloadTbSendReq_t(0);
        break;
    case 0x0104: // DlData::AddressReq_t
        result = DlDatadecodeAddressReq_t(0);
        break;
    case 0x0121: // DlData::AddressResp_t
        result = DlDatadecodeAddressResp_t(0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        result = DlDatadecodeSlotTypeReq_t(0);
        break;
    case 0x0127: // DlData::SsBlockSendReq_t
        result = DlDatadecodeSsBlockSendReq_t(0);
        break;
    case 0x0128: // DlData::PdcchSendReq_t
        result = DlDatadecodePdcchSendReq_t(0);
        break;
    case 0x0129: // DlData::PdschSendReq_t
        result = DlDatadecodePdschSendReq_t(0);
        break;
    case 0x012A: // DlData::CsiRsSendReq_t
        result = DlDatadecodeCsiRsSendReq_t(0);
        break;
    case 0x012B: // DlData::PatternConfigReq_t
        result = DlDatadecodePatternConfigReq_t(0);
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
    case 0x0a37: // L1ECpri::DelayConfigReq_t
        result = L1ECpridecodeDelayConfigReq_t(0);
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
    case 0x0a58: // L1Log::AntennaSnapshotInd_t
        result = L1LogdecodeAntennaSnapshotInd_t(0);
        break;
    case 0x0a59: // L1Log::AntennaSnapshotReq_t
        result = L1LogdecodeAntennaSnapshotReq_t(0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        result = L1LogdecodeAntennaSnapshotResp_t(0);
        break;
    case 0x0a5d: // L1Log::TraceReq_t
        result = L1LogdecodeTraceReq_t(0);
        break;
    case 0x0a5e: // L1Log::TraceResp_t
        result = L1LogdecodeTraceResp_t(0);
        break;
    case 0x0a5f: // L1Log::TraceInd_t
        result = L1LogdecodeTraceInd_t(0);
        break;
    case 0x0a60: // L1Log::ShowTraceListReq_t
        result = L1LogdecodeShowTraceListReq_t(0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        result = L1LogdecodeShowTraceListResp_t(0);
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
    case 0x0201: // UlCell::SetupResp_t
        result = UlCelldecodeSetupResp_t(0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        result = UlCelldecodeDeleteReq_t(0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        result = UlCelldecodeDeleteResp_t(0);
        break;
    case 0x0244: // UlCell::SetupReq_t
        result = UlCelldecodeSetupReq_t(0);
        break;
    case 0x023A: // UlData::PuschReceiveRespLo_t
        result = UlDatadecodePuschReceiveRespLo_t(0);
        break;
    case 0x0218: // UlData::PuschReceiveRespHarqU_t
        result = UlDatadecodePuschReceiveRespHarqU_t(0);
        break;
    case 0x0219: // UlData::PrachReceiveInd_t
        result = UlDatadecodePrachReceiveInd_t(0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        result = UlDatadecodePrachReceiveInd_t(0);
        break;
    case 0x022B: // UlData::AddressResp_t
        result = UlDatadecodeAddressResp_t(0);
        break;
    case 0x022E: // UlData::SrsReceiveRespPs_t
        result = UlDatadecodeSrsReceiveRespPs_t(0);
        break;
    case 0x0233: // UlData::PrachReceiveReq_t
        result = UlDatadecodePrachReceiveReq_t(0);
        break;
    case 0x0235: // UlData::PuschReceiveRespPs_t
        result = UlDatadecodePuschReceiveRespPs_t(0);
        break;
    case 0x0237: // UlData::PucchReceiveRespHarqD_t
        result = UlDatadecodePucchReceiveRespHarqD_t(0);
        break;
    case 0x0238: // UlData::PucchReceiveRespPs_t
        result = UlDatadecodePucchReceiveRespPs_t(0);
        break;
    case 0x0239: // UlData::PucchReceiveReq_t
        result = UlDatadecodePucchReceiveReq_t(0);
        break;
    case 0x023B: // UlData::PuschReceiveReq_t
        result = UlDatadecodePuschReceiveReq_t(0);
        break;
    case 0x023C: // UlData::SrsReceiveReq_t
        result = UlDatadecodeSrsReceiveReq_t(0);
        break;
    case 0x0243: // UlData::AddressReq_t
        result = UlDatadecodeAddressReq_t(0);
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
    case 0x0a00: // L1Cpri::AlarmInd_t
        buf.static = new Uint8Array(8);
        L1CpriencodeAlarmInd_t(l2l1, buf, 0);
        break;
    case 0x0a01: // L1Cpri::ConfigureLinksReq_t
        buf.static = new Uint8Array(272);
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
    case 0x0a11: // L1Cpri::DelayConfigReq_t
        buf.static = new Uint8Array(32);
        L1CpriencodeDelayConfigReq_t(l2l1, buf, 0);
        break;
    case 0x0a12: // L1Cpri::SetDiscoveryReq_t
        buf.static = new Uint8Array(72);
        L1CpriencodeSetDiscoveryReq_t(l2l1, buf, 0);
        break;
    case 0x0a13: // L1Cpri::SetDiscoveryResp_t
        buf.static = new Uint8Array(2);
        L1CpriencodeSetDiscoveryResp_t(l2l1, buf, 0);
        break;
    case 0x0a14: // L1Cpri::SetLinkPropertiesReq_t
        buf.static = new Uint8Array(8);
        L1CpriencodeSetLinkPropertiesReq_t(l2l1, buf, 0);
        break;
    case 0x0a15: // L1Cpri::SetLinkPropertiesResp_t
        buf.static = new Uint8Array(2);
        L1CpriencodeSetLinkPropertiesResp_t(l2l1, buf, 0);
        break;
    case 0x0a16: // L1Cpri::GetLinkParamResp_t
        buf.static = new Uint8Array(36);
        L1CpriencodeGetLinkParamResp_t(l2l1, buf, 0);
        break;
    case 0x0101: // DlCell::SetupResp_t
        buf.static = new Uint8Array(1);
        DlCellencodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x0102: // DlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        DlCellencodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0103: // DlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        DlCellencodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0x0126: // DlCell::SetupReq_t
        buf.static = new Uint8Array(704);
        DlCellencodeSetupReq_t(l2l1, buf, 0);
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
    case 0x0108: // DlData::PdschPayloadTbSendReq_t
        buf.static = new Uint8Array(24);
        DlDataencodePdschPayloadTbSendReq_t(l2l1, buf, 0);
        break;
    case 0x0104: // DlData::AddressReq_t
        buf.static = new Uint8Array(1);
        DlDataencodeAddressReq_t(l2l1, buf, 0);
        break;
    case 0x0121: // DlData::AddressResp_t
        buf.static = new Uint8Array(32);
        DlDataencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0x0122: // DlData::SlotTypeReq_t
        buf.static = new Uint8Array(20);
        DlDataencodeSlotTypeReq_t(l2l1, buf, 0);
        break;
    case 0x0127: // DlData::SsBlockSendReq_t
        buf.static = new Uint8Array(24);
        DlDataencodeSsBlockSendReq_t(l2l1, buf, 0);
        break;
    case 0x0128: // DlData::PdcchSendReq_t
        buf.static = new Uint8Array(16);
        DlDataencodePdcchSendReq_t(l2l1, buf, 0);
        break;
    case 0x0129: // DlData::PdschSendReq_t
        buf.static = new Uint8Array(92);
        DlDataencodePdschSendReq_t(l2l1, buf, 0);
        break;
    case 0x012A: // DlData::CsiRsSendReq_t
        buf.static = new Uint8Array(16);
        DlDataencodeCsiRsSendReq_t(l2l1, buf, 0);
        break;
    case 0x012B: // DlData::PatternConfigReq_t
        buf.static = new Uint8Array(240);
        DlDataencodePatternConfigReq_t(l2l1, buf, 0);
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
    case 0x0a37: // L1ECpri::DelayConfigReq_t
        buf.static = new Uint8Array(24);
        L1ECpriencodeDelayConfigReq_t(l2l1, buf, 0);
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
    case 0x0a58: // L1Log::AntennaSnapshotInd_t
        buf.static = new Uint8Array(112);
        L1LogencodeAntennaSnapshotInd_t(l2l1, buf, 0);
        break;
    case 0x0a59: // L1Log::AntennaSnapshotReq_t
        buf.static = new Uint8Array(12);
        L1LogencodeAntennaSnapshotReq_t(l2l1, buf, 0);
        break;
    case 0x0a5a: // L1Log::AntennaSnapshotResp_t
        buf.static = new Uint8Array(1);
        L1LogencodeAntennaSnapshotResp_t(l2l1, buf, 0);
        break;
    case 0x0a5d: // L1Log::TraceReq_t
        buf.static = new Uint8Array(72);
        L1LogencodeTraceReq_t(l2l1, buf, 0);
        break;
    case 0x0a5e: // L1Log::TraceResp_t
        buf.static = new Uint8Array(4);
        L1LogencodeTraceResp_t(l2l1, buf, 0);
        break;
    case 0x0a5f: // L1Log::TraceInd_t
        buf.static = new Uint8Array(1416);
        L1LogencodeTraceInd_t(l2l1, buf, 0);
        break;
    case 0x0a60: // L1Log::ShowTraceListReq_t
        buf.static = new Uint8Array(4);
        L1LogencodeShowTraceListReq_t(l2l1, buf, 0);
        break;
    case 0x0a61: // L1Log::ShowTraceListResp_t
        buf.static = new Uint8Array(108);
        L1LogencodeShowTraceListResp_t(l2l1, buf, 0);
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
        buf.static = new Uint8Array(16);
        SyncMencodestartSyncEReq_t(l2l1, buf, 0);
        break;
    case 0xd225: // SyncM::startSyncEResp_t
        buf.static = new Uint8Array(1);
        SyncMencodestartSyncEResp_t(l2l1, buf, 0);
        break;
    case 0xd226: // SyncM::updateSyncEConfigReq_t
        buf.static = new Uint8Array(16);
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
        buf.static = new Uint8Array(48);
        SyncMencodegetSyncEStatusResp_t(l2l1, buf, 0);
        break;
    case 0xd22a: // SyncM::getPtpStatusReq_t
        buf.static = new Uint8Array(1);
        SyncMencodegetPtpStatusReq_t(l2l1, buf, 0);
        break;
    case 0xd22b: // SyncM::getPtpStatusResp_t
        buf.static = new Uint8Array(168);
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
    case 0x0201: // UlCell::SetupResp_t
        buf.static = new Uint8Array(1);
        UlCellencodeSetupResp_t(l2l1, buf, 0);
        break;
    case 0x0202: // UlCell::DeleteReq_t
        buf.static = new Uint8Array(1);
        UlCellencodeDeleteReq_t(l2l1, buf, 0);
        break;
    case 0x0203: // UlCell::DeleteResp_t
        buf.static = new Uint8Array(2);
        UlCellencodeDeleteResp_t(l2l1, buf, 0);
        break;
    case 0x0244: // UlCell::SetupReq_t
        buf.static = new Uint8Array(1508);
        UlCellencodeSetupReq_t(l2l1, buf, 0);
        break;
    case 0x023A: // UlData::PuschReceiveRespLo_t
        buf.static = new Uint8Array(20);
        UlDataencodePuschReceiveRespLo_t(l2l1, buf, 0);
        break;
    case 0x0218: // UlData::PuschReceiveRespHarqU_t
        buf.static = new Uint8Array(12);
        UlDataencodePuschReceiveRespHarqU_t(l2l1, buf, 0);
        break;
    case 0x0219: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(12);
        UlDataencodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0x0222: // UlData::PrachReceiveInd_t
        buf.static = new Uint8Array(12);
        UlDataencodePrachReceiveInd_t(l2l1, buf, 0);
        break;
    case 0x022B: // UlData::AddressResp_t
        buf.static = new Uint8Array(20);
        UlDataencodeAddressResp_t(l2l1, buf, 0);
        break;
    case 0x022E: // UlData::SrsReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlDataencodeSrsReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x0233: // UlData::PrachReceiveReq_t
        buf.static = new Uint8Array(12);
        UlDataencodePrachReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x0235: // UlData::PuschReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlDataencodePuschReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x0237: // UlData::PucchReceiveRespHarqD_t
        buf.static = new Uint8Array(12);
        UlDataencodePucchReceiveRespHarqD_t(l2l1, buf, 0);
        break;
    case 0x0238: // UlData::PucchReceiveRespPs_t
        buf.static = new Uint8Array(12);
        UlDataencodePucchReceiveRespPs_t(l2l1, buf, 0);
        break;
    case 0x0239: // UlData::PucchReceiveReq_t
        buf.static = new Uint8Array(20);
        UlDataencodePucchReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x023B: // UlData::PuschReceiveReq_t
        buf.static = new Uint8Array(24);
        UlDataencodePuschReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x023C: // UlData::SrsReceiveReq_t
        buf.static = new Uint8Array(16);
        UlDataencodeSrsReceiveReq_t(l2l1, buf, 0);
        break;
    case 0x0243: // UlData::AddressReq_t
        buf.static = new Uint8Array(8);
        UlDataencodeAddressReq_t(l2l1, buf, 0);
        break;

    default: throw new Error(`Unknown message type ${l2l1.message}`);
    }

    const result = new Uint8Array(buf.static.length + buf.dynamic.getLength());
    result.set(buf.static);
    result.set(buf.dynamic.getBuf(), buf.static.length);

    return result
}

// array types encoders/decoders
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
function encodeStaticFixedSizedArray_uint16_29(arr, buf, off) {
    for (let i = 0; i < 29; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_29(offset) {
    const result = [];
    for (let i = 0; i < 29; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_273(arr, buf, off) {
    for (let i = 0; i < 273; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_273(offset) {
    const result = [];
    for (let i = 0; i < 273; i++)
        result.push(l2l1_getU16(offset + i * 2));
    return result;
}
function encodeStaticFixedSizedArray_uint16_22(arr, buf, off) {
    for (let i = 0; i < 22; i++)
        l2l1_putU16(arr[i], buf, off + i * 2);
}
function decodeStaticFixedSizedArray_uint16_22(offset) {
    const result = [];
    for (let i = 0; i < 22; i++)
        result.push(l2l1_getU16(offset + i * 2));
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
function encodeStaticFixedSizedArray_uint8_2(arr, buf, off) {
    for (let i = 0; i < 2; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_2(offset) {
    const result = [];
    for (let i = 0; i < 2; i++)
        result.push(l2l1_getU8(offset + i * 1));
    return result;
}
function encodeStaticFixedSizedArray_uint8_12(arr, buf, off) {
    for (let i = 0; i < 12; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticFixedSizedArray_uint8_12(offset) {
    const result = [];
    for (let i = 0; i < 12; i++)
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
function encodeStaticVariableSizedArray_SCpriLinkItem_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 16; i++)
        L1CpriencodeSCpriLinkItem(arr[i], buf, off + i * 16);
}
function decodeStaticVariableSizedArray_SCpriLinkItem_16(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 16; i++)
        result.push(L1CpridecodeSCpriLinkItem(offset + 4 + i * 16));
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
function encodeStaticVariableSizedArray_uint8_10(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 10; i++)
        l2l1_putU8(arr[i], buf, off + i * 1);
}
function decodeStaticVariableSizedArray_uint8_10(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 10; i++)
        result.push(l2l1_getU8(offset + 4 + i * 1));
    return result;
}
function encodeStaticVariableSizedArray_SyncEStatus_10(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 10; i++)
        SyncMencodeSyncEStatus(arr[i], buf, off + i * 4);
}
function decodeStaticVariableSizedArray_SyncEStatus_10(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 10; i++)
        result.push(SyncMdecodeSyncEStatus(offset + 4 + i * 4));
    return result;
}
function encodeStaticVariableSizedArray_PtpStatus_10(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off);
    for (let i = 0; i < arr.length && i < 10; i++)
        SyncMencodePtpStatus(arr[i], buf, off + i * 16);
}
function decodeStaticVariableSizedArray_PtpStatus_10(offset) {
    const result = [];
    const length = l2l1_getU32(offset);
    for (let i = 0; i < length && i < 10; i++)
        result.push(SyncMdecodePtpStatus(offset + 4 + i * 16));
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
function encodeDynamicVariableSizedArray_uint8_50205(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        l2l1_putU8(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_uint8_50205(offset) {
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
function encodeDynamicVariableSizedArray_DciInfo_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlDataencodeDciInfo(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_DciInfo_8(offset) {
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
function encodeDynamicVariableSizedArray_CsiRsResource_t_12(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        DlDataencodeCsiRsResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_CsiRsResource_t_12(offset) {
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
function encodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeUePuschReceiveRespPs_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_UePuschReceiveRespPs_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodeUePuschReceiveRespPs_t(offset));
        offset += 80;
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
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_puschReceiveReqGrant_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepuschReceiveReqGrant_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_puschReceiveReqGrant_t_8(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepuschReceiveReqGrant_t(offset));
        offset += 72;
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
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_8(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodeUePuschReceiveRespHarqU_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_UePuschReceiveRespHarqU_t_8(offset) {
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
        offset += 16;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveReqPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveReqPucchResource_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveReqPucchResource_t(offset));
        offset += 28;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveReqSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveReqSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveReqSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespPsPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespPsPucchResource_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespPsPucchResource_t(offset));
        offset += 52;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespPsSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespPsSubcell_t_4(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespPsSubcell_t(offset));
        offset += 12;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_16(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespHarqDPucchResource_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespHarqDPucchResource_t_16(offset) {
    const arrayOff = l2l1_getU32(offset);
    const len = l2l1_getU32(offset + 4);
    offset = arrayOff + offset;

    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(UlDatadecodepucchReceiveRespHarqDPucchResource_t(offset));
        offset += 20;
    }

    return result;
}
function encodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_4(arr, buf, off) {
    l2l1_putU32(arr.length, buf, off); // length
    off += 4;
    l2l1_putU32(buf.static.length - off + buf.dynamic.getLength(), buf, off); // relative offset forward

    const dynamic = buf.asDynamic();
    for (const elem of arr) {
        UlDataencodepucchReceiveRespHarqDSubcell_t(elem, dynamic, dynamic.length);
    }
}
function decodeDynamicVariableSizedArray_pucchReceiveRespHarqDSubcell_t_4(offset) {
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
        offset += 20;
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
        offset += 18;
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
        offset += 36;
    }

    return result;
}


packetPropToStrMap["l2l1.message"] = {
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
    0x0101: "DlCell::SetupResp",
    0x0102: "DlCell::DeleteReq",
    0x0103: "DlCell::DeleteResp",
    0x0126: "DlCell::SetupReq",
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
    0x0108: "DlData::PdschPayloadTbSendReq",
    0x0104: "DlData::AddressReq",
    0x0121: "DlData::AddressResp",
    0x0122: "DlData::SlotTypeReq",
    0x0127: "DlData::SsBlockSendReq",
    0x0128: "DlData::PdcchSendReq",
    0x0129: "DlData::PdschSendReq",
    0x012A: "DlData::CsiRsSendReq",
    0x012B: "DlData::PatternConfigReq",
    0x0a30: "L1ECpri::ConfigureLinksReq",
    0x0a31: "L1ECpri::ConfigureLinksResp",
    0x0a32: "L1ECpri::SubscribeReq",
    0x0a33: "L1ECpri::SubscribeResp",
    0x0a34: "L1ECpri::SetOutputReq",
    0x0a35: "L1ECpri::SetOutputResp",
    0x0a36: "L1ECpri::StateInd",
    0x0a37: "L1ECpri::DelayConfigReq",
    0x0a38: "L1ECpri::DelayConfigResp",
    0x0a39: "L1ECpri::ConfigureTransportReq",
    0x0a3a: "L1ECpri::ConfigureTransportResp",
    0x0a3b: "L1ECpri::InitialDelayMeasReq",
    0x0a3c: "L1ECpri::InitialDelayMeasResp",
    0x0a3d: "L1ECpri::DelayMeasInd",
    0x0a58: "L1Log::AntennaSnapshotInd",
    0x0a59: "L1Log::AntennaSnapshotReq",
    0x0a5a: "L1Log::AntennaSnapshotResp",
    0x0a5d: "L1Log::TraceReq",
    0x0a5e: "L1Log::TraceResp",
    0x0a5f: "L1Log::TraceInd",
    0x0a60: "L1Log::ShowTraceListReq",
    0x0a61: "L1Log::ShowTraceListResp",
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
    0x0201: "UlCell::SetupResp",
    0x0202: "UlCell::DeleteReq",
    0x0203: "UlCell::DeleteResp",
    0x0244: "UlCell::SetupReq",
    0x023A: "UlData::PuschReceiveRespLo",
    0x0218: "UlData::PuschReceiveRespHarqU",
    0x0219: "UlData::PrachReceiveInd",
    0x0222: "UlData::PrachReceiveInd",
    0x022B: "UlData::AddressResp",
    0x022E: "UlData::SrsReceiveRespPs",
    0x0233: "UlData::PrachReceiveReq",
    0x0235: "UlData::PuschReceiveRespPs",
    0x0237: "UlData::PucchReceiveRespHarqD",
    0x0238: "UlData::PucchReceiveRespPs",
    0x0239: "UlData::PucchReceiveReq",
    0x023B: "UlData::PuschReceiveReq",
    0x023C: "UlData::SrsReceiveReq",
    0x0243: "UlData::AddressReq",
};

packetEnumMap = {
    L1Cpri_ECpriLink: {
        0: "ECpriLink::ECpriLink_0",
        1: "ECpriLink::ECpriLink_1",
        2: "ECpriLink::ECpriLink_2",
        3: "ECpriLink::ECpriLink_3",
        4: "ECpriLink::ECpriLink_4",
        5: "ECpriLink::ECpriLink_5",
        6: "ECpriLink::ECpriLink_6",
        7: "ECpriLink::ECpriLink_7",
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
    _ECpriLink: {
        0: "ECpriLink::ECpriLink_0",
        1: "ECpriLink::ECpriLink_1",
        2: "ECpriLink::ECpriLink_2",
        3: "ECpriLink::ECpriLink_3",
        4: "ECpriLink::ECpriLink_4",
        5: "ECpriLink::ECpriLink_5",
        6: "ECpriLink::ECpriLink_6",
        7: "ECpriLink::ECpriLink_7",
    },
    l1_common_EBandwidth: {
        25: "EBandwidth::prbs_25",
        32: "EBandwidth::prbs_32",
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
    l1_common_EScs: {
        0: "EScs::UNUSED",
        15: "EScs::khz_15",
        30: "EScs::khz_30",
        60: "EScs::khz_60",
        120: "EScs::khz_120",
    },
    l1_common_SubcellType: {
        0: "SubcellType::C2",
        1: "SubcellType::C4",
        2: "SubcellType::C8",
        3: "SubcellType::D2",
        4: "SubcellType::A2",
        5: "SubcellType::A4",
    },
    l1_common_dlMimoMode_t: {
        0: "dlMimoMode::CL_2x2_MIMO",
        1: "dlMimoMode::CL_4x4_or_4x2_MIMO",
        2: "dlMimoMode::OL_2x2_MIMO",
        3: "dlMimoMode::OL_4x4_or_4x2_MIMO",
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
        6: "subcellPosition::subcell_slot_6",
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
    },
    l1_common_numCeAxC_t: {
        2: "numCeAxC::NUM_C_EAXC_2",
        4: "numCeAxC::NUM_C_EAXC_4",
    },
    l1_common_cellDeleteStatus_t: {
        0: "cellDeleteStatus::NoError",
        1: "cellDeleteStatus::SubcellNotExists",
        2: "cellDeleteStatus::OtherError",
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
    l1_common_pdcchPrecodingOption4x4_t: {
        0: "pdcchPrecodingOption4x4::repetitionTwoXPolBeams",
        1: "pdcchPrecodingOption4x4::scdd",
        2: "pdcchPrecodingOption4x4::repetitionOneXPolBeam",
    },
    l1_common_cceRegMappingType_t: {
        0: "cceRegMappingType::INTERLEAVED",
        1: "cceRegMappingType::NON_INTERLEAVED",
    },
    l1_common_coresetInterleaverSize_t: {
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
        4: "NumOfPdschSymbols::VAL_4_SYMBOLS",
        7: "NumOfPdschSymbols::VAL_7_SYMBOLS",
        8: "NumOfPdschSymbols::VAL_8_SYMBOLS",
        10: "NumOfPdschSymbols::VAL_10_SYMBOLS",
        11: "NumOfPdschSymbols::VAL_11_SYMBOLS",
        12: "NumOfPdschSymbols::VAL_12_SYMBOLS",
        13: "NumOfPdschSymbols::VAL_13_SYMBOLS",
    },
    l1_common_mcsTable_t: {
        0: "mcsTable::max64QAM",
        1: "mcsTable::max256QAM",
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
        2: "modulationOrder::QPSK",
        4: "modulationOrder::QAM16",
        6: "modulationOrder::QAM64",
        8: "modulationOrder::QAM256",
    },
    l1_common_pdschClPrecodingOption4x4_t: {
        0: "pdschClPrecodingOption4x4::typeI3Gpp",
        1: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank2",
        2: "pdschClPrecodingOption4x4::typeIPortSelectionUpToRank4",
    },
    l1_common_precodingVectorIndex_t: {
        0: "precodingVectorIndex::index_0",
        1: "precodingVectorIndex::index_1",
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
    },
    L1Log_EReportType: {
        0: "EReportType::STOP",
        1: "EReportType::START",
    },
    L1Log_EOutputMode: {
        0: "EOutputMode::SNAPSHOT",
        1: "EOutputMode::STREAMING",
    },
    L1Log_EAntSnapshotL1Enabled: {
        0: "EAntSnapshotL1Enabled::ENABLED",
        1: "EAntSnapshotL1Enabled::DISABLED",
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
        9: "prachStartSymbol::SYMBOL_9",
    },
    l1_common_prachSequenceType_t: {
        0: "prachSequenceType::UNRESTRICTED",
        1: "prachSequenceType::RESTRICTED_TYPE_A",
        2: "prachSequenceType::RESTRICTED_TYPE_B",
    },
    l1_common_prachCohCombLen_t: {
        1: "prachCohCombLen::symbols_1",
        4: "prachCohCombLen::symbols_4",
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
    },
    l1_common_dtx_t: {
        0: "dtx::NON_DTX",
        1: "dtx::DTX",
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
    l1_common_selfContainedFlag: {
        0: "selfContainedFlag::NON_SELF_CONTAINED",
        1: "selfContainedFlag::SELF_CONTAINED",
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
        10: "numOfPuschSymbols::PCS10",
        11: "numOfPuschSymbols::PCS11",
        12: "numOfPuschSymbols::PCS12",
        13: "numOfPuschSymbols::PCS13",
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
    l1_common_crc_t: {
        0: "crc::OK",
        1: "crc::NOK",
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
    l1_common_frequencyHopping_t: {
        0: "frequencyHopping::FREQ_HOPPING_DISABLED",
        1: "frequencyHopping::FREQ_HOPPING_ENABLED",
    },
    l1_common_pucchAdditionalDmrs_t: {
        0: "pucchAdditionalDmrs::ADDITIONAL_DMRS_DISABLED",
        1: "pucchAdditionalDmrs::ADDITIONAL_DMRS_ENABLED",
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
};
