function decode_DL_CCCH_Message(payload,offset){
    let decoded_DL_CCCH_Message = {};
    [decoded_DL_CCCH_Message["message"],offset] = decode_DL_CCCH_MessageType(payload,offset);
    return [decoded_DL_CCCH_Message,offset]
}

function decode_RejectWaitTime(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,16);
}

function decode_RRCReject_IEs(payload,offset){
    let RRCReject_IEs_SEQ_PREAMBLE,decoded_RRCReject_IEs = {};

    [RRCReject_IEs_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(RRCReject_IEs_SEQ_PREAMBLE[0] === "1") [decoded_RRCReject_IEs["waitTime"],offset] = decode_RejectWaitTime(payload,offset);
    if(RRCReject_IEs_SEQ_PREAMBLE[1] === "1") [decoded_RRCReject_IEs["lateNonCriticalExtension"],offset] = parse_ASN_OCTETSTRING(payload,offset);
    if(RRCReject_IEs_SEQ_PREAMBLE[2] === "1") [decoded_RRCReject_IEs["nonCriticalExtension"],offset] = parse_ASN_NULL(payload,offset);

    return [decoded_RRCReject_IEs,offset];
}

function decode_RRCReject(payload,offset){
    let decoded_RRCReject = {};
    [decoded_RRCReject["criticalExtensions"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"rrcReject" : decode_RRCReject_IEs},
        {"criticalExtensionsFuture" : parse_ASN_NULL}
    ]);
    return [decoded_RRCReject,offset];
}

function decode_RRC_TransactionIdentifier(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_RRCSetup_IEs(payload,offset){
    let RRCSetup_IEs_SEQ_PREAMBLE,decoded_RRCSetup_IEs = {};
    [RRCSetup_IEs_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_RRCSetup_IEs["radioBearerConfig"],offset] = decode_RadioBearerConfig(payload,offset);
    [decoded_RRCSetup_IEs["masterCellGroup"],offset] = parse_ASN_OCTETSTRING(payload,offset,decode_CellGroupConfig);
    return [decoded_RRCSetup_IEs,offset];
}

function decode_RRCSetup(payload,offset){
    let decoded_RRCSetup = {};
    [decoded_RRCSetup["rrc-TransactionIdentifier"],offset] = decode_RRC_TransactionIdentifier(payload,offset);
    [decoded_RRCSetup["criticalExtensions"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"rrcSetup" : decode_RRCSetup_IEs},
        {"criticalExtensionsFuture" : parse_ASN_NULL}
    ]);
    return [decoded_RRCSetup,offset];
}

function decode_DL_CCCH_MessageType(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"c1" : (payload,offset)=>{return parse_ASN_CHOICE(payload,offset,[
            {"rrcReject" : decode_RRCReject},
            {"rrcSetup" : decode_RRCSetup},
            {"spare2" : parse_ASN_NULL},
            {"spare1" : parse_ASN_NULL}
        ]);}},
        {"messageClassExtension" : parse_ASN_NULL}
    ]);
}

function decode_RNTI_Value(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,65535);
}

function decode_RateMatchPatternId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_ServCellIndex(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,31);
}

function decode_ZP_CSI_RS_ResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,31);
}

function decode_RadioLinkMonitoringRS_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,9);
}

function decode_SSB_Index(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}

function decode_BWP_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,4);
}

function decode_PUCCH_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_PUCCH_ResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,127);
}

function decode_SchedulingRequestResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,8);
}

function decode_SchedulingRequestId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_PUCCH_SpatialRelationInfoId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,8);
}

function decode_NZP_CSI_RS_ResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,191);
}

function decode_SRS_ResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}   

function decode_PUCCH_PathlossReferenceRS_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_Alpha(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["alpha0", "alpha04", "alpha05", "alpha06", "alpha07", "alpha08", "alpha09", "alpha1"]);
}

function decode_PUSCH_PathlossReferenceRS_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_SRI_PUSCH_PowerControlId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,15);
}

function decode_P0_PUSCH_AlphaSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,29);
}

function decode_LogicalChannelIdentity(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,32);
}

function decode_SRB_Identity(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,3);
}

function decode_DRB_Identity(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,32);
}

function decode_SRB_ToAddModList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,2,decode_SRB_ToAddMod);
}

function decode_DRB_ToAddModList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,29,decode_DRB_ToAddMod);
}

function decode_DRB_ToReleaseList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,29,decode_DRB_Identity);
}

function decode_CipheringAlgorithm(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["nea0", "nea1", "nea2", "nea3", "spare4", "spare3", "spare2", "spare1"]);
}

function decode_IntegrityProtAlgorithm(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["nia0", "nia1", "nia2", "nia3", "spare4", "spare3", "spare2", "spare1"]);
}

function decode_CellGroupId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_SCellIndex(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,31);
}

function decode_TD_UL_DL_SlotIndex(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,319)
}

function decode_SlotFormatCombinationId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,511);
}

function decode_ScramblingId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,1023);
}

function decode_NZP_CSI_RS_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}

function decode_CSI_IM_ResourceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,31);
}

function decode_CSI_IM_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}

function decode_CSI_SSB_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}

function decode_CSI_ResourceConfigId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,111);
}

function decode_P0_PUCCH_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,8);
}

function decode_ZP_CSI_RS_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,15);
}

function decode_TAG_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_SRB_ToAddMod(payload,offset){
    let SRB_ToAddMod_SEQ_PREAMBLE,SRB_ToAddMod_EXT_FLAG,decoded_SRB_ToAddMod = {};

    [SRB_ToAddMod_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRB_ToAddMod_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_SRB_ToAddMod["srb-Identity"],offset] = decode_SRB_Identity(payload,offset);
    if(SRB_ToAddMod_SEQ_PREAMBLE[0] === "1") [decoded_SRB_ToAddMod["reestablishPDCP"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]); 
    if(SRB_ToAddMod_SEQ_PREAMBLE[1] === "1") [decoded_SRB_ToAddMod["discardOnPDCP"],offset] = "true";
    if(SRB_ToAddMod_SEQ_PREAMBLE[2] === "1") [decoded_SRB_ToAddMod["pdcp-Config"],offset] = decode_PDCP_Config(payload,offset);

    if(SRB_ToAddMod_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRB_ToAddMod,offset];
}

function decode_DRB_ToAddMod(payload,offset){
    let DRB_ToAddMod_SEQ_PREAMBLE,DRB_ToAddMod_EXT_FLAG,decoded_DRB_ToAddMod = {};

    [DRB_ToAddMod_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [DRB_ToAddMod_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    if(DRB_ToAddMod_SEQ_PREAMBLE[0] === 1){
        let cnAssociation_CHOICE_LIST = [{"eps-BearerIdentity" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15);}}, {"sdap-Config" : decode_SDAP_Config}];       
        [decoded_DRB_ToAddMod["cnAssociation"],offset] = parse_ASN_CHOICE(payload,offset,cnAssociation_CHOICE_LIST);
    }
    if(DRB_ToAddMod_SEQ_PREAMBLE[1] === 1) [decoded_DRB_ToAddMod["drb-Identity"],offset] = decode_DRB_Identity(payload,offset);
    if(DRB_ToAddMod_SEQ_PREAMBLE[2] === 1) [decoded_DRB_ToAddMod["reestablishPDCP"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(DRB_ToAddMod_SEQ_PREAMBLE[3] === 1) [decoded_DRB_ToAddMod["recoverPDCP"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(DRB_ToAddMod_SEQ_PREAMBLE[4] === 1) decoded_DRB_ToAddMod["pdcp-Config"],offset = decode_PDCP_Config(payload,offset);

    if(DRB_ToAddMod_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DRB_ToAddMod,offset];
}

function decode_SecurityAlgorithmConfig(payload,offset){
    let SecurityAlgorithmConfig_EXT_FLAG,SecurityAlgorithmConfig_SEQ_PREAMBLE,decoded_SecurityAlgorithmConfig = {};

    [SecurityAlgorithmConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SecurityAlgorithmConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_SecurityAlgorithmConfig["cipheringAlgorithm"],offset] = decode_CipheringAlgorithm(payload,offset);
    if(SecurityAlgorithmConfig_SEQ_PREAMBLE[0] === "1") [decoded_SecurityAlgorithmConfig["integrityProtAlgorithm"],offset] = decode_IntegrityProtAlgorithm(payload,offset);

    if(SecurityAlgorithmConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SecurityAlgorithmConfig,offset];
}

function decode_SecurityConfig(payload,offset){
    let SecurityConfig_EXT_FLAG,SecurityConfig_SEQ_PREAMBLE,decoded_SecurityConfig = {};

    [SecurityConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SecurityConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(SecurityConfig_SEQ_PREAMBLE[0]==="1") [decoded_SecurityConfig["securityAlgorithmConfig"],offset] = decode_SecurityAlgorithmConfig(payload,offset);    
    if(SecurityConfig_SEQ_PREAMBLE[1] === "1") [decoded_SecurityConfig["keyToUse"],offset] = parse_ASN_ENUMERATED(payload,offset,["master","secondary"]);

    if(SecurityConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SecurityConfig,offset];
}

function decode_RadioBearerConfig(payload,offset){
    let RadioBearerConfig_SEQ_PREAMBLE,RadioBearerConfig_EXT_FLAG,decoded_RadioBearerConfig = {};

    [RadioBearerConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RadioBearerConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);
   
    if(RadioBearerConfig_SEQ_PREAMBLE[0] === "1") [decoded_RadioBearerConfig["srb-ToAddModList"],offset] = decode_SRB_ToAddModList(payload,offset);
    if(RadioBearerConfig_SEQ_PREAMBLE[1] === "1") [decoded_RadioBearerConfig["srb3-ToRelease"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(RadioBearerConfig_SEQ_PREAMBLE[2] === "1") [decoded_RadioBearerConfig["drb-ToAddModList"],offset] = decode_DRB_ToAddModList(payload,offset);
    if(RadioBearerConfig_SEQ_PREAMBLE[3] === "1") [decoded_RadioBearerConfig["drb-ToReleaseList"],offset] = decode_DRB_ToReleaseList(payload,offset);
    if(RadioBearerConfig_SEQ_PREAMBLE[4] === "1") [decoded_RadioBearerConfig["securityConfig"],offset] = decode_SecurityConfig(payload,offset);

    return [decoded_RadioBearerConfig,offset];
}

function decode_PhysicalCellGroupConfig(payload,offset){
    let PhysicalCellGroupConfig_SEQ_PREAMBLE,PhysicalCellGroupConfig_EXT_FLAG,decoded_PhysicalCellGroupConfig = {};

    [PhysicalCellGroupConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PhysicalCellGroupConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[0] === "1") [decoded_PhysicalCellGroupConfig["harq-ACK-SpatialBundlingPUCCH"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[1] === "1") [decoded_PhysicalCellGroupConfig["harq-ACK-SpatialBundlingPUSCH"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[2] === "1") [decoded_PhysicalCellGroupConfig["p-NR-FR1"],offset] = decode_P_Max(payload,offset);
    [decoded_PhysicalCellGroupConfig["pdsch-HARQ-ACK-Codebook"],offset] = parse_ASN_ENUMERATED(payload,offset,["semiStatic", "dynamic"]);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[3] === "1") [decoded_PhysicalCellGroupConfig["tpc-SRS-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[4] === "1") [decoded_PhysicalCellGroupConfig["tpc-PUCCH-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[5] === "1") [decoded_PhysicalCellGroupConfig["tpc-PUSCH-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[6] === "1") [decoded_PhysicalCellGroupConfig["sp-CSI-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    if(PhysicalCellGroupConfig_SEQ_PREAMBLE[7] === "1") [decoded_PhysicalCellGroupConfig["cs-RNTI"],offset] = parse_ASN_SETREL(payload,offset,decode_RNTI_Value);

    if(PhysicalCellGroupConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }
    
    return [decoded_PhysicalCellGroupConfig,offset];
}

function decode_SCellConfig(payload,offset){ 
    let SCellConfig_EXT_FLAG,SCellConfig_SEQ_PREAMBLE,decoded_SCellConfig = {};

    [SCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SCellConfig["sCellIndex"],offset] = decode_SCellIndex(payload,offset);
    if(SCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_SCellConfig["sCellConfigCommon"],offset] = decode_ServingCellConfigCommon(payload,offset);
    if(SCellConfig_SEQ_PREAMBLE[1] === "1") [decoded_SCellConfig["sCellConfigDedicated"],offset] = decode_ServingCellConfig(payload,offset);

    if(SCellConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SCellConfig,offset];
}

function decode_CellGroupConfig(payload,offset){
    let CellGroupConfig_EXT_FLAG,CellGroupConfig_SEQ_PREAMBLE,decoded_CellGroupConfig = {};

    [CellGroupConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CellGroupConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,7);
    
    [decoded_CellGroupConfig["cellGroupId"],offset] = decode_CellGroupId(payload,offset);
    if(CellGroupConfig_SEQ_PREAMBLE[0] === "1") [decoded_CellGroupConfig["rlc-BearerToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_RLC_BearerConfig);
    if(CellGroupConfig_SEQ_PREAMBLE[1] === "1") [decoded_CellGroupConfig["rlc-BearerToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_LogicalChannelIdentity);
    if(CellGroupConfig_SEQ_PREAMBLE[2] === "1") [decoded_CellGroupConfig["mac-CellGroupConfig"],offset] = decode_MAC_CellGroupConfig(payload,offset);
    if(CellGroupConfig_SEQ_PREAMBLE[3] === "1") [decoded_CellGroupConfig["physicalCellGroupConfig"],offset] = decode_PhysicalCellGroupConfig(payload,offset);
    if(CellGroupConfig_SEQ_PREAMBLE[4] === "1") [decoded_CellGroupConfig["spCellConfig"],offset] = decode_SpCellConfig(payload,offset);
    if(CellGroupConfig_SEQ_PREAMBLE[5] === "1") [decoded_CellGroupConfig["sCellToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,31,decode_SCellConfig);
    if(CellGroupConfig_SEQ_PREAMBLE[6] === "1") [decoded_CellGroupConfig["sCellToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,31,decode_SCellIndex);

    return [decoded_CellGroupConfig,offset];
}

function decode_RLC_BearerConfig(payload,offset){
    let RLC_BearerConfig_EXT_FLAG,RLC_BearerConfig_SEQ_PREAMBLE, decoded_RLC_BearerConfig = {};

    [RLC_BearerConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RLC_BearerConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    [decoded_RLC_BearerConfig["logicalChannelIdentity"],offset] = decode_LogicalChannelIdentity(payload,offset);    
    if(RLC_BearerConfig_SEQ_PREAMBLE[0] === "1"){
        let servedRadioBearer_CHOICE_LIST = [
            {"srb-Identity" : decode_SRB_Identity},
            {"drb-Identity" : decode_DRB_Identity}
        ];
        [decoded_RLC_BearerConfig["servedRadioBearer"],offset] = parse_ASN_CHOICE(payload,offset,servedRadioBearer_CHOICE_LIST);
    }
    if(RLC_BearerConfig_SEQ_PREAMBLE[1] === "1") [decoded_RLC_BearerConfig["reestablishRLC"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(RLC_BearerConfig_SEQ_PREAMBLE[2] === "1") [decoded_RLC_BearerConfig["rlc-Config"],offset] = decode_RLC_Config(payload,offset);
    if(RLC_BearerConfig_SEQ_PREAMBLE[3] === "1") [decoded_RLC_BearerConfig["mac-LogicalChannelConfig"],offset] = decode_LogicalChannelConfig(payload,offset);

    if(RLC_BearerConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RLC_BearerConfig,offset];
}

function decode_ReconfigurationWithSync(payload,offset){
    let ReconfigurationWithSync_EXT_FLAG,ReconfigurationWithSync_SEQ_PREAMBLE,decoded_ReconfigurationWithSync = {};

    [ReconfigurationWithSync_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ReconfigurationWithSync_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(ReconfigurationWithSync_SEQ_PREAMBLE[0] === "1") [decoded_ReconfigurationWithSync["spCellConfigCommon"],offset] = decode_ServingCellConfigCommon(payload,offset);
    [decoded_ReconfigurationWithSync["newUE-Identity"],offset] = decode_RNTI_Value(payload,offset);
    [decoded_ReconfigurationWithSync["t304"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms50", "ms100", "ms150", "ms200", "ms500", "ms1000", "ms2000", "ms10000"]);
    if(ReconfigurationWithSync_SEQ_PREAMBLE[1] === "1"){
        let rach_ConfigDedicated_CHOICE_LIST = [
            {"uplink" : decode_RACH_ConfigDedicated},
            {"supplementaryUplink" : decode_RACH_ConfigDedicated}
        ];
        [decoded_ReconfigurationWithSync["rach-ConfigDedicated"],offset] = parse_ASN_CHOICE(payload,offset,rach_ConfigDedicated_CHOICE_LIST);
    }

    if(ReconfigurationWithSync_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ReconfigurationWithSync,offset];
}

function decode_SpCellConfig(payload,offset){
    let SpCellConfig_EXT_FLAG,SpCellConfig_SEQ_PREAMBLE,decoded_SpCellConfig = {};

    [SpCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SpCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    if(SpCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_SpCellConfig["servCellIndex"],offset] = decode_ServCellIndex(payload,offset);       
    if(SpCellConfig_SEQ_PREAMBLE[1] === "1") [decoded_SpCellConfig["reconfigurationWithSync"],offset] = decode_ReconfigurationWithSync(payload,offset);
    if(SpCellConfig_SEQ_PREAMBLE[2] === "1") [decoded_SpCellConfig["rlf-TimersAndConstants"],offset] = parse_ASN_SETREL(payload,offset,decode_RLF_TimersAndConstants);
    if(SpCellConfig_SEQ_PREAMBLE[3] === "1") [decoded_SpCellConfig["rlmInSyncOutOfSyncThreshold"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1"]);
    if(SpCellConfig_SEQ_PREAMBLE[4] === "1") [decoded_SpCellConfig["spCellConfigDedicated"],offset] = decode_ServingCellConfig(payload,offset);

    if(SpCellConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SpCellConfig,offset];
}

function decode_TDD_UL_DL_ConfigDedicated(payload,offset){
    let TDD_UL_DL_ConfigDedicated_EXT_FLAG,TDD_UL_DL_ConfigDedicated_SEQ_PREAMBLE,decoded_TDD_UL_DL_ConfigDedicated = {};

    [TDD_UL_DL_ConfigDedicated_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [TDD_UL_DL_ConfigDedicated_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(TDD_UL_DL_ConfigDedicated_SEQ_PREAMBLE[0] === "1") [decoded_TDD_UL_DL_ConfigDedicated["slotSpecificConfigurationsToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,320,decode_TDD_UL_DL_SlotConfig);
    if(TDD_UL_DL_ConfigDedicated_SEQ_PREAMBLE[1] === "1") [decoded_TDD_UL_DL_ConfigDedicated["slotSpecificConfigurationsToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,320,decode_TD_UL_DL_SlotIndex);

    if(TDD_UL_DL_ConfigDedicated_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_TDD_UL_DL_ConfigDedicated,offset];
}

function decode_BWP_Downlink(payload,offset){
    let BWP_Downlink_SEQ_PREAMBLE,BWP_Downlink_EXT_FLAG,decoded_BWP_Downlink = {};

    [BWP_Downlink_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_Downlink_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_BWP_Downlink["bwp-Id"],offset] = decode_BWP_Id(payload,offset);
    if(BWP_Downlink_SEQ_PREAMBLE[0] === "1") [decoded_BWP_Downlink["bwp-Common"],offset] = decode_BWP_DownlinkCommon(payload,offset);
    if(BWP_Downlink_SEQ_PREAMBLE[1] === "1") [decoded_BWP_Downlink["bwp-Dedicated"],offset] = decode_BWP_DownlinkDedicated(payload,offset);

    if(BWP_Downlink_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }
    
    return [decoded_BWP_Downlink,offset];
}

function decode_SlotFormatCombination(payload,offset){
    let decoded_SlotFormatCombination = {};

    [decoded_SlotFormatCombination["slotFormatCombinationId"],offset] = decode_SlotFormatCombinationId(payload,offset);
    [decoded_SlotFormatCombination["slotFormats"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,256,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,255);});

    return [decoded_SlotFormatCombination,offset];
}

function decode_SlotFormatCombinationsPerCell(payload,offset){
    let SlotFormatCombinationsPerCell_EXT_FLAG,SlotFormatCombinationsPerCell_SEQ_PREAMBLE,decoded_SlotFormatCombinationsPerCell = {};

    [SlotFormatCombinationsPerCell_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SlotFormatCombinationsPerCell_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_SlotFormatCombinationsPerCell["servingCellId"],offset] = decode_ServCellIndex(payload,offset);
    [decoded_SlotFormatCombinationsPerCell["subcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    if(SlotFormatCombinationsPerCell_SEQ_PREAMBLE[0] === "1") [decoded_SlotFormatCombinationsPerCell["subcarrierSpacing2"],offset] = decode_SubcarrierSpacing(payload,offset);
    if(SlotFormatCombinationsPerCell_SEQ_PREAMBLE[1] === "1"){
        [decoded_SlotFormatCombinationsPerCell["slotFormatCombinations"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,512,decode_SlotFormatCombination);
    }  
    if(SlotFormatCombinationsPerCell_SEQ_PREAMBLE[2] === "1") [decoded_SlotFormatCombinationsPerCell["positionInDCI"],offset] = parse_ASN_INTEGER(payload,offset,0,127);

    if(SlotFormatCombinationsPerCell_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SlotFormatCombinationsPerCell,offset];
}

function decode_SlotFormatIndicator(payload,offset){
    let SlotFormatIndicator_SEQ_PREAMBLE,SlotFormatIndicator_EXT_FLAG,decoded_SlotFormatIndicator = {};

    [SlotFormatIndicator_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SlotFormatIndicator_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SlotFormatIndicator["sfi-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    [decoded_SlotFormatIndicator["dci-PayloadSize"],offset] = parse_ASN_INTEGER(payload,offset,1,128);
    if(SlotFormatIndicator_SEQ_PREAMBLE[0] === "1") [decoded_SlotFormatIndicator["slotFormatCombToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_SlotFormatCombinationsPerCell);
    if(SlotFormatIndicator_SEQ_PREAMBLE[1] === "1") [decoded_SlotFormatIndicator["slotFormatCombToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ServCellIndex);

    return [decoded_SlotFormatIndicator,offset];    
}

function decode_PDCCH_ServingCellConfig(payload,offset){
    let PDCCH_ServingCellConfig_SEQ_PREAMBLE,PDCCH_ServingCellConfig_EXT_FLAG,decoded_PDCCH_ServingCellConfig = {};

    [PDCCH_ServingCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDCCH_ServingCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(PDCCH_ServingCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_PDCCH_ServingCellConfig["slotFormatIndicator"],offset] = parse_ASN_SETREL(payload,offset,decode_SlotFormatIndicator);

    if(PDCCH_ServingCellConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDCCH_ServingCellConfig,offset];
}

function decode_PDSCH_CodeBlockGroupTransmission(payload,offset){
    let PDSCH_CodeBlockGroupTransmission_EXT_FLAG,decoded_PDSCH_CodeBlockGroupTransmission = {};

    [PDSCH_CodeBlockGroupTransmission_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_PDSCH_CodeBlockGroupTransmission["maxCodeBlockGroupsPerTransportBlock"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4", "n6", "n8"]);
    [decoded_PDSCH_CodeBlockGroupTransmission["codeBlockGroupFlushIndicator"],offset] = parse_ASN_BOOLEAN(payload,offset);

    if(PDSCH_CodeBlockGroupTransmission_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDSCH_CodeBlockGroupTransmission,offset];
}

function decode_PDSCH_ServingCellConfig(payload,offset){
    let PDSCH_ServingCellConfig_SEQ_PREAMBLE,PDSCH_ServingCellConfig_EXT_FLAG,decoded_PDSCH_ServingCellConfig = {};

    [PDSCH_ServingCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDSCH_ServingCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(PDSCH_ServingCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_PDSCH_ServingCellConfig["codeBlockGroupTransmission"],offset] = parse_ASN_SETREL(payload,offset,decode_PDSCH_CodeBlockGroupTransmission);
    if(PDSCH_ServingCellConfig_SEQ_PREAMBLE[1] === "1") [decoded_PDSCH_ServingCellConfig["xOverhead"],offset] = parse_ASN_ENUMERATED(payload,offset,["xOh6", "xOh12", "xOh18"]);
    if(PDSCH_ServingCellConfig_SEQ_PREAMBLE[2] === "1") [decoded_PDSCH_ServingCellConfig["nrofHARQ-ProcessesForPDSCH"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4", "n6", "n10", "n12", "n16"]);
    if(PDSCH_ServingCellConfig_SEQ_PREAMBLE[3] === "1") [decoded_PDSCH_ServingCellConfig["pucch-Cell"],offset] = decode_ServCellIndex(payload,offset);

    if(PDSCH_ServingCellConfig_EXT_FLAG === 1){
        let PDSCH_ServingCellConfig_EXT_PREAMBLE;

        [PDSCH_ServingCellConfig_EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);        

        if(PDSCH_ServingCellConfig_EXT_PREAMBLE.length > 0 && PDSCH_ServingCellConfig_EXT_PREAMBLE[0] === "1"){
            function decode_extensionGroup1(payload,offset){
                let EXT_GROUP_SEQ_PREAMBLE, decoded_extensionGroup = {};
                [EXT_GROUP_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
                if(EXT_GROUP_SEQ_PREAMBLE[0] === "1") [decoded_extensionGroup["maxMIMO-Layers"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
                if(EXT_GROUP_SEQ_PREAMBLE[1] === "1") [decoded_extensionGroup["processingType2Enabled"],offset] = parse_ASN_BOOLEAN(payload,offset);
                return [decoded_extensionGroup,offset];
            }

            let decoded_extensionGroup;
            [decoded_extensionGroup,offset] = parse_ASN_OPENFIELD(payload,offset,decode_extensionGroup1);
            decoded_PDSCH_ServingCellConfig = {...decoded_PDSCH_ServingCellConfig,...decoded_extensionGroup};
        }
    }

    return [decoded_PDSCH_ServingCellConfig,offset];
}

function decode_NZP_CSI_RS_Resource(payload,offset){
    let NZP_CSI_RS_Resource_SEQ_PREAMBLE,NZP_CSI_RS_Resource_EXT_FLAG,decoded_NZP_CSI_RS_Resource = {};

    [NZP_CSI_RS_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [NZP_CSI_RS_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_NZP_CSI_RS_Resource["nzp-CSI-RS-ResourceId"],offset] = decode_NZP_CSI_RS_ResourceId(payload,offset);
    [decoded_NZP_CSI_RS_Resource["resourceMapping"],offset] = decode_CSI_RS_ResourceMapping(payload,offset);
    [decoded_NZP_CSI_RS_Resource["powerControlOffset"],offset] = parse_ASN_INTEGER(payload,offset,-8,15);
    if(NZP_CSI_RS_Resource_SEQ_PREAMBLE[0] === "1") [decoded_NZP_CSI_RS_Resource["powerControlOffsetSS"],offset] = parse_ASN_ENUMERATED(payload,offset,["db-3", "db0", "db3", "db6"]);
    [decoded_NZP_CSI_RS_Resource["scramblingID"],offset] = decode_ScramblingId(payload,offset);
    if(NZP_CSI_RS_Resource_SEQ_PREAMBLE[1] === "1") [decoded_NZP_CSI_RS_Resource["periodicityAndOffset"],offset] = decode_CSI_ResourcePeriodicityAndOffset(payload,offset);
    if(NZP_CSI_RS_Resource_SEQ_PREAMBLE[2] === "1") [decoded_NZP_CSI_RS_Resource["qcl-InfoPeriodicCSI-RS"],offset] = decode_TCI_StateId(payload,offset);

    if(NZP_CSI_RS_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_NZP_CSI_RS_Resource,offset];
}

function decode_NZP_CSI_RS_ResourceSet(payload,offset){
    let NZP_CSI_RS_ResourceSet_EXT_FLAG,NZP_CSI_RS_ResourceSet_SEQ_PREAMBLE,decoded_NZP_CSI_RS_ResourceSet = {};

    [NZP_CSI_RS_ResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [NZP_CSI_RS_ResourceSet_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_NZP_CSI_RS_ResourceSet["nzp-CSI-ResourceSetId"],offset] = decode_NZP_CSI_RS_ResourceSetId(payload,offset);
    [decoded_NZP_CSI_RS_ResourceSet["nzp-CSI-RS-Resources"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_NZP_CSI_RS_ResourceId);
    if(NZP_CSI_RS_ResourceSet_SEQ_PREAMBLE[0] === "1") [decoded_NZP_CSI_RS_ResourceSet["repetition"],offset] = parse_ASN_ENUMERATED(payload,offset,["on","off"]);
    if(NZP_CSI_RS_ResourceSet_SEQ_PREAMBLE[1] === "1") [decoded_NZP_CSI_RS_ResourceSet["aperiodicTriggeringOffset"],offset] = parse_ASN_INTEGER(payload,offset,0,6);
    if(NZP_CSI_RS_ResourceSet_SEQ_PREAMBLE[2] === "1") [decoded_NZP_CSI_RS_ResourceSet["trs-Info"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);

    if(NZP_CSI_RS_ResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_NZP_CSI_RS_ResourceSet,offset];
}

function decode_CSI_FrequencyOccupation(payload,offset){
    let CSI_FrequencyOccupation_EXT_FLAG,decoded_CSI_FrequencyOccupation = {};
    [CSI_FrequencyOccupation_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_CSI_FrequencyOccupation["startingRB"],offset] = parse_ASN_INTEGER(payload,offset,0,274);
    [decoded_CSI_FrequencyOccupation["nrofRBs"],offset] = parse_ASN_INTEGER(payload,offset,24,276);

    if(CSI_FrequencyOccupation_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }
    
    return [decoded_CSI_FrequencyOccupation,offset];
}

function decode_CSI_IM_Resource(payload,offset){
    let CSI_IM_Resource_EXT_FLAG,CSI_IM_Resource_SEQ_PREAMBLE, decoded_CSI_IM_Resource = {};

    [CSI_IM_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CSI_IM_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_CSI_IM_Resource["csi-IM-ResourceId"],offset] = decode_CSI_IM_ResourceId(payload,offset);

    if(CSI_IM_Resource_SEQ_PREAMBLE[0] === "1"){
        function decode_pattern0(payload,offset){
            let decoded_pattern0 = {};
            [decoded_pattern0["subcarrierLocation-p0"],offset] = parse_ASN_ENUMERATED(payload,offset,["s0", "s2", "s4", "s6", "s8", "s10"]);
            [decoded_pattern0["symbolLocation-p0"],offset] = parse_ASN_INTEGER(payload,offset,0,12);
    
            return [decoded_pattern0,offset];
        }
        function decode_pattern1(payload,offset){
            let decoded_pattern1 = {};
            [decoded_pattern1["subcarrierLocation-p1"],offset] = parse_ASN_ENUMERATED(payload,offset,["s0", "s4", "s8"]);
            [decoded_pattern1["symbolLocation-p1"],offset] = parse_ASN_INTEGER(payload,offset,0,13);
    
            return [decoded_pattern1,offset];
        }
        let csi_IM_ResourceElementPattern_CHOICE_LIST = [
            {"pattern0" : decode_pattern0},
            {"pattern1" : decode_pattern1}
        ];
        [decoded_CSI_IM_Resource["csi-IM-ResourceElementPattern"],offset] = parse_ASN_CHOICE(payload,offset,csi_IM_ResourceElementPattern_CHOICE_LIST);
    }
    if(CSI_IM_Resource_SEQ_PREAMBLE[1] === "1") [decoded_CSI_IM_Resource["freqBand"],offset] = decode_CSI_FrequencyOccupation(payload,offset);
    if(CSI_IM_Resource_SEQ_PREAMBLE[2] === "1") [decoded_CSI_IM_Resource["periodicityAndOffset"],offset] = decode_CSI_ResourcePeriodicityAndOffset(payload,offset);

    if(CSI_IM_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_IM_Resource,offset];
}

function decode_CSI_IM_ResourceSet(payload,offset){
    let CSI_IM_ResourceSet_EXT_FLAG,decoded_CSI_IM_ResourceSet = {};

    [CSI_IM_ResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_CSI_IM_ResourceSet["csi-IM-ResourceSetId"],offset] = decode_CSI_IM_ResourceSetId(payload,offset);
    [decoded_CSI_IM_ResourceSet["csi-IM-Resources"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_CSI_IM_ResourceId);

    if(CSI_IM_ResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_IM_ResourceSet,offset];
}

function decode_CSI_SSB_ResourceSet(payload,offset){
    let CSI_SSB_ResourceSet_EXT_FLAG,decoded_CSI_SSB_ResourceSet = {};

    [CSI_SSB_ResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_CSI_SSB_ResourceSet["csi-SSB-ResourceSetId"],offset] = decode_CSI_SSB_ResourceSetId(payload,offset);
    [decoded_CSI_SSB_ResourceSet["csi-SSB-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_SSB_Index);

    if(CSI_SSB_ResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_SSB_ResourceSet,offset];
}

function decode_CSI_ResourceConfig(payload,offset){
    let CSI_ResourceConfig_EXT_FLAG,decoded_CSI_ResourceConfig = {};

    [CSI_ResourceConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_CSI_ResourceConfig["csi-ResourceConfigId"],offset] = decode_CSI_ResourceConfigId(payload,offset);

    function decode_nzp_CSI_RS_SSB(payload,offset){
        let nzp_CSI_RS_SSB_SEQ_PREAMBLE,decoded_nzp_CSI_RS_SSB = {};

        [nzp_CSI_RS_SSB_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
        if(nzp_CSI_RS_SSB_SEQ_PREAMBLE[0] === "1") [decoded_nzp_CSI_RS_SSB["nzp-CSI-RS-ResourceSetList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_NZP_CSI_RS_ResourceSetId);
        if(nzp_CSI_RS_SSB_SEQ_PREAMBLE[1] === "1") [decoded_nzp_CSI_RS_SSB["csi-SSB-ResourceSetList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,1,decode_CSI_SSB_ResourceSetId);

        return [decoded_nzp_CSI_RS_SSB,offset];
    }
    let csi_RS_ResourceSetList_CHOICE_LIST = [
        {"nzp-CSI-RS-SSB" : decode_nzp_CSI_RS_SSB},
        {"csi-IM-ResourceSetList" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_CSI_IM_ResourceSetId);}}
    ];
    [decoded_CSI_ResourceConfig["csi-RS-ResourceSetList"],offset] = parse_ASN_CHOICE(payload,offset,csi_RS_ResourceSetList_CHOICE_LIST);

    [decoded_CSI_ResourceConfig["bwp-Id"],offset] = decode_BWP_Id(payload,offset);
    [decoded_CSI_ResourceConfig["resourceType"],offset] = parse_ASN_ENUMERATED(payload,offset,["aperiodic", "semiPersistent", "periodic"]);

    if(CSI_ResourceConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_ResourceConfig,offset];
}

function decode_CSI_ReportConfigId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,47);
}

function decode_CSI_ReportPeriodicityAndOffset(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"slots4" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,3)}},
        {"slots5" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4)}},
        {"slots8" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,7)}},
        {"slots10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9)}},
        {"slots16" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15)}},
        {"slots20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19)}},
        {"slots40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39)}},
        {"slots80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79)}},
        {"slots160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159)}},
        {"slots320" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,319)}}
    ]);
}

function decode_PUCCH_CSI_Resource(payload,offset){
    let decoded_PUCCH_CSI_Resource = {};

    [decoded_PUCCH_CSI_Resource["uplinkBandwidthPartId"],offset] = decode_BWP_Id(payload,offset);
    [decoded_PUCCH_CSI_Resource["pucch-Resource"],offset] = decode_PUCCH_ResourceId(payload,offset);

    return [decoded_PUCCH_CSI_Resource,offset];
}

function decode_CSI_ReportConfig(payload,offset){
    let CSI_ReportConfig_SEQ_PREAMBLE,CSI_ReportConfig_EXT_FLAG,decoded_CSI_ReportConfig = {};

    [CSI_ReportConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CSI_ReportConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

    [decoded_CSI_ReportConfig["reportConfigId"],offset] = decode_CSI_ReportConfigId(payload,offset);
    if(CSI_ReportConfig_SEQ_PREAMBLE[0] === "1") [decoded_CSI_ReportConfig["carrier"],offset] = decode_ServCellIndex(payload,offset);
    [decoded_CSI_ReportConfig["resourcesForChannelMeasurement"],offset] = decode_CSI_ResourceConfigId(payload,offset);
    if(CSI_ReportConfig_SEQ_PREAMBLE[1] === "1") [decoded_CSI_ReportConfig["csi-IM-ResourcesForInterference"],offset] = decode_CSI_ResourceConfigId(payload,offset);
    if(CSI_ReportConfig_SEQ_PREAMBLE[2] === "1") [decoded_CSI_ReportConfig["nzp-CSI-RS-ResourcesForInterference"],offset] = decode_CSI_ReportConfigId(payload,offset);

    function decode_periodic(payload,offset){
        let decoded_periodic = {};
        [decoded_periodic["reportSlotConfig"],offset] = decode_CSI_ReportPeriodicityAndOffset(payload,offset);
        [decoded_periodic["pucch-CSI-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUCCH_CSI_Resource);
        return [decoded_periodic,offset];
    }
    function decode_semiPersistentOnPUCCH(payload,offset){
        let decoded_semiPersistentOnPUCCH = {};
        [decoded_semiPersistentOnPUCCH["reportSlotConfig"],offset] = decode_CSI_ReportPeriodicityAndOffset(payload,offset);
        [decoded_semiPersistentOnPUCCH["pucch-CSI-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUCCH_CSI_Resource);
        return [decoded_semiPersistentOnPUCCH,offset];
    }
    function decode_semiPersistentOnPUSCH(payload,offset){
        let decoded_semiPersistentOnPUSCH = {};

        [decoded_semiPersistentOnPUSCH["reportSlotConfig"],offset] = parse_ASN_ENUMERATED(payload,offset,["sl5", "sl10", "sl20", "sl40", "sl80", "sl160", "sl320"]);
        [decoded_semiPersistentOnPUSCH["reportSlotOffsetList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,32);});
        [decoded_semiPersistentOnPUSCH["p0alpha"],offset] = decode_P0_PUSCH_AlphaSetId(payload,offset);
        return [decoded_semiPersistentOnPUSCH,offset];
    }
    function decode_aperiodic(payload,offset){
        let decoded_aperiodic = {};
        [decoded_aperiodic["reportSlotOffsetList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,32);});
        return [decoded_aperiodic,offset];
    }
    let reportConfigType_CHOICE_LIST = [
        {"periodic" : decode_periodic},
        {"semiPersistentOnPUCCH" : decode_semiPersistentOnPUCCH},
        {"semiPersistentOnPUSCH" : decode_semiPersistentOnPUSCH},
        {"aperiodic" : decode_aperiodic},
    ];
    [decoded_CSI_ReportConfig["reportConfigType"],offset] = parse_ASN_CHOICE(payload,offset,reportConfigType_CHOICE_LIST);

    function decode_cri_RI_i1_CQI(payload,offset){
        let cri_RI_i1_CQI_SEQ_PREAMBLE,decoded_cri_RI_i1_CQI = {};
        [cri_RI_i1_CQI_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        [decoded_cri_RI_i1_CQI["pdsch-BundleSizeForCSI"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4"]);
        return [decoded_cri_RI_i1_CQI,offset];
    }
    let reportQuantity_CHOICE_LIST = [
        {"none" : parse_ASN_NULL},
        {"cri-RI-PMI-CQI" : parse_ASN_NULL},
        {"cri-RI-i1" : parse_ASN_NULL},
        {"cri-RI-i1-CQI" : decode_cri_RI_i1_CQI},
        {"cri-RI-CQI" : parse_ASN_NULL},
        {"cri-RSRP" : parse_ASN_NULL},
        {"ssb-Index-RSRP" : parse_ASN_NULL},
        {"cri-RI-LI-PMI-CQI" : parse_ASN_NULL}
    ];
    [decoded_CSI_ReportConfig["reportQuantity"],offset] = parse_ASN_CHOICE(payload,offset,reportQuantity_CHOICE_LIST);

    if(CSI_ReportConfig_SEQ_PREAMBLE[3] === "1"){
        let reportFreqConfiguration_SEQ_PREAMBLE,decoded_reportFreqConfiguration = {};

        [reportFreqConfiguration_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

        if(reportFreqConfiguration_SEQ_PREAMBLE[0] === "1") [decoded_reportFreqConfiguration["cqi-FormatIndicator"],offset] = parse_ASN_ENUMERATED(payload,offset,[ "widebandCQI", "subbandCQI"]);
        if(reportFreqConfiguration_SEQ_PREAMBLE[1] === "1") [decoded_reportFreqConfiguration["pmi-FormatIndicator"],offset] = parse_ASN_ENUMERATED(payload,offset,["widebandPMI", "subbandPMI"]);
        if(reportFreqConfiguration_SEQ_PREAMBLE[2] === "1"){
            let csi_ReportingBand_EXT_FLAG
            [csi_ReportingBand_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

            [decoded_reportFreqConfiguration["csi-ReportingBand"],offset] = parse_ASN_CHOICE(payload,offset,[
                {"subbands3" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,3,3);}},
                {"subbands4" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,4,4);}},
                {"subbands5" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,5,5);}},
                {"subbands6" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,6,6);}},
                {"subbands7" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,7,7);}},
                {"subbands8" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
                {"subbands9" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,9,9);}},
                {"subbands10" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,10,10);}},
                {"subbands11" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,11,11);}},
                {"subbands12" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,12,12);}},
                {"subbands13" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,13,13);}},
                {"subbands14" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,14,14);}},
                {"subbands15" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,15,15);}},
                {"subbands16" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,16,16);}},
                {"subbands17" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,17,17);}},
                {"subbands18" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,18,18);}},
            ]);
        } 
        decoded_CSI_ReportConfig["reportFreqConfiguration"] = decoded_reportFreqConfiguration;
    }
    
    [decoded_CSI_ReportConfig["timeRestrictionForChannelMeasurements"],offset] = parse_ASN_ENUMERATED(payload,offset,["configured", "notConfigured"]);
    [decoded_CSI_ReportConfig["timeRestrictionForInterferenceMeasurements"],offset] = parse_ASN_ENUMERATED(payload,offset,["configured", "notConfigured"]);
    if(CSI_ReportConfig_SEQ_PREAMBLE[4] === "1") [decoded_CSI_ReportConfig["codebookConfig"],offset] = decode_CodebookConfig(payload,offset);
    if(CSI_ReportConfig_SEQ_PREAMBLE[5] === "1") [decoded_CSI_ReportConfig["dummy"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1","n2"]);

    function decode_disabled(payload,offset){
        let disabled_SEQ_PREAMBLE,decoded_disabled = {};
        [disabled_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        if(disabled_SEQ_PREAMBLE[0] === "1") [decoded_disabled["nrofReportedRS"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4"]);
        return [decoded_disabled,offset];
    }
    let groupBasedBeamReporting_CHOICE_LIST = [
        {"enabled" : parse_ASN_NULL},
        {"disabled" : decode_disabled}
    ];
    [decoded_CSI_ReportConfig["groupBasedBeamReporting"],offset] = parse_ASN_CHOICE(payload,offset,groupBasedBeamReporting_CHOICE_LIST);

    if(CSI_ReportConfig_SEQ_PREAMBLE[6] === "1") [decoded_CSI_ReportConfig["cqi-Table"],offset] = parse_ASN_ENUMERATED(payload,offset,["table1", "table2", "table3", "table4-r17"]);
    [decoded_CSI_ReportConfig["subbandSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["value1", "value2}"])
    if(CSI_ReportConfig_SEQ_PREAMBLE[7] === "1") [decoded_CSI_ReportConfig["non-PMI-PortIndication"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_PortIndexFor8Ranks);

    if(CSI_ReportConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_ReportConfig,offset];
}

function decode_PortIndex8(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_PortIndex4(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3);
}

function decode_PortIndex2(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,1);
}

function decode_PortIndexFor8Ranks(payload,offset){

    function decode_portIndex8(payload,offset){
        let portIndex8_SEQ_PREAMBLE,decoded_portIndex8 = {};

        [portIndex8_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

        if(portIndex8_SEQ_PREAMBLE[0] === "1") [decoded_portIndex8["rank1-8"],offset] = decode_PortIndex8(payload,offset);
        if(portIndex8_SEQ_PREAMBLE[1] === "1") [decoded_portIndex8["rank2-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,2,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[2] === "1") [decoded_portIndex8["rank3-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,3,3,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[3] === "1") [decoded_portIndex8["rank4-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,4,4,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[4] === "1") [decoded_portIndex8["rank5-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,5,5,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[5] === "1") [decoded_portIndex8["rank6-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,6,6,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[6] === "1") [decoded_portIndex8["rank7-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,7,7,decode_PortIndex8);
        if(portIndex8_SEQ_PREAMBLE[7] === "1") [decoded_portIndex8["rank8-8"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,8,8,decode_PortIndex8);

        return [decoded_portIndex8,offset];
    }

    function decode_portIndex4(payload,offset){
        let portIndex4_SEQ_PREAMBLE,decoded_portIndex4 = {};

        [portIndex4_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

        if(portIndex4_SEQ_PREAMBLE[0] === "1") [decoded_portIndex4["rank1-4"],offset] = decode_PortIndex4(payload,offset);
        if(portIndex4_SEQ_PREAMBLE[1] === "1") [decoded_portIndex4["rank2-4"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,2,decode_PortIndex4);
        if(portIndex4_SEQ_PREAMBLE[2] === "1") [decoded_portIndex4["rank3-4"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,3,3,decode_PortIndex4);
        if(portIndex4_SEQ_PREAMBLE[3] === "1") [decoded_portIndex4["rank3-4"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,4,4,decode_PortIndex4);

        return [decoded_portIndex4,offset];
    }

    function decode_portIndex2(payload,offset){
        let portIndex2_SEQ_PREAMBLE,decoded_portIndex2 = {};

        [portIndex2_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

        if(portIndex2_SEQ_PREAMBLE[0] === "1") [decoded_portIndex2["rank1-2"],offset] = decode_PortIndex2(payload,offset);
        if(portIndex2_SEQ_PREAMBLE[1] === "1") [decoded_portIndex2["rank2-2"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,2,decode_PortIndex2);

        return [decoded_portIndex2,offset];
    }

    return parse_ASN_CHOICE(payload,offset,[
        {"portIndex8" : decode_portIndex8},
        {"portIndex4" : decode_portIndex4},
        {"portIndex2" : decode_portIndex2},
        {"portIndex1" : (payload,offset)=>{return parse_ASN_NULL(payload,offset);}}
    ]);
}

function decode_CodebookConfig(payload,offset){
    let decoded_CodebookConfig = {};

    function decode_moreThanTwo(payload,offset){
        let moreThanTwo_SEQ_PREAMBLE,decoded_moreThanTwo = {};
        [moreThanTwo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        [decoded_moreThanTwo["n1-n2"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"two-one-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
            {"two-two-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}},
            {"four-one-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,16,16);}},
            {"three-two-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,96,96);}},
            {"six-one-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,24,24);}},
            {"four-two-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,128,128);}},
            {"eight-one-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,32,32);}},
            {"four-three-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,192,192);}},
            {"six-two-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,192,192);}},
            {"twelve-one-TypeI-SinglePanel-Restrictionn" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,48,48);}},
            {"four-four-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,256,256);}},
            {"eight-two-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,256,256);}},
            {"sixteen-one-TypeI-SinglePanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}}
        ]);
        if(moreThanTwo_SEQ_PREAMBLE[0]==="1") [decoded_moreThanTwo["typeI-SinglePanel-codebookSubsetRestriction-i2"],offset] = parse_ASN_BITSTRING(payload,offset,16,16);
        return [decoded_moreThanTwo,offset];
    }

    function decode_typeI_SinglePanel(payload,offset){
        let decoded_typeI_SinglePanel = {};
        [decoded_typeI_SinglePanel["nrOfAntennaPorts"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,6,6);}},
            {"moreThanTwo" : decode_moreThanTwo}
        ]);
        [decoded_typeI_SinglePanel["typeI-SinglePanel-ri-Restriction"],offset] = parse_ASN_BITSTRING(payload,offset,8,8);
        return [decoded_typeI_SinglePanel,offset];
    }

    function decode_typeI_MultiPanel(payload,offset){
        let decoded_typeI_MultiPanel = {};
        [decoded_typeI_MultiPanel["ng-n1-n2"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"two-two-one-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
            {"two-four-one-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,16,16);}},
            {"four-two-one-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
            {"two-two-two-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}},
            {"two-eight-one-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,32,32);}},
            {"four-four-one-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,16,16);}},
            {"two-four-two-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,128,128);}},
            {"four-two-two-TypeI-MultiPanel-Restriction" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}}
        ]);
        [decoded_typeI_MultiPanel["ri-Restriction"],offset] = parse_ASN_BITSTRING(payload,offset,4,4);
        return [decoded_typeI_MultiPanel,offset];
    }

    function decode_type1(payload,offset){
        let decoded_type1 = {};
        [decoded_type1["subType"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"typeI-SinglePanel" : decode_typeI_SinglePanel},
            {"typeI-MultiPanel" : decode_typeI_MultiPanel}
        ]);
        [decoded_type1["codebookMode"],offset] = parse_ASN_INTEGER(payload,offset,1,2);

        return [decoded_type1,offset];
    }

    function decode_typeII(payload,offset){
        let decoded_typeII = {};
        [decoded_typeII["n1-n2-codebookSubsetRestriction"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"two-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,16,16);}},
            {"two-two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,43,43);}},
            {"four-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,32,32);}},
            {"three-two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,59,59);}},
            {"six-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,48,48);}},
            {"four-two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,75,75);}},
            {"eight-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}},
            {"four-three" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,107,107);}},
            {"six-two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,107,107);}},
            {"twelve-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,96,96);}},
            {"four-four" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,139,139);}},
            {"eight-two" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,139,139);}},
            {"sixteen-one" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,128,128);}}
        ]);
        [decoded_typeII["typeII-RI-Restriction"],offset] = parse_ASN_BITSTRING(payload,offset,2,2);
        return [decoded_typeII,offset];
    }

    function decode_typeII_PortSelection(payload,offset){
        let typeII_PortSelection_SEQ_PREAMBLE,decoded_typeII_PortSelection = {};

        [typeII_PortSelection_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        if(typeII_PortSelection_SEQ_PREAMBLE[0] === "1") [decoded_typeII_PortSelection["portSelectionSamplingSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4"]);
        [decoded_typeII_PortSelection["typeII-PortSelectionRI-Restriction"],offset] = parse_ASN_BITSTRING(payload,offset,2,2);

        return [decoded_typeII_PortSelection,offset];
    }

    function decode_type2(payload,offset){
        let decoded_type2 = {};
        [decoded_type2["subType"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"typeII" : decode_typeII},
            {"typeII-PortSelection" : decode_typeII_PortSelection}
        ]);
        [decoded_type2["phaseAlphabetSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4","n8"]);
        [decoded_type2["subbandAmplitude"],offset] = parse_ASN_BOOLEAN(payload,offset);
        [decoded_type2["numberOfBeams"],offset] = parse_ASN_ENUMERATED(payload,offset,["two", "three", "four"]);
        
        return [decoded_type2,offset];
    }

    [decoded_CodebookConfig["codebookType"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"type1" : decode_type1},
        {"type2" : decode_type2}
    ]);

    return [decoded_CodebookConfig,offset];
}

function decode_CSI_AperiodicTriggerStateList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_CSI_AperiodicTriggerState);
}

function decode_CSI_AperiodicTriggerState(payload,offset){
    let CSI_AperiodicTriggerState_EXT_FLAG,decoded_CSI_AperiodicTriggerState = {};

    [CSI_AperiodicTriggerState_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_CSI_AperiodicTriggerState["associatedReportConfigInfoList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_CSI_AssociatedReportConfigInfo);

    if(CSI_AperiodicTriggerState_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_AperiodicTriggerState,offset];
}

function decode_CSI_AssociatedReportConfigInfo(payload,offset){
    let CSI_AssociatedReportConfigInfo_EXT_FLAG,CSI_AssociatedReportConfigInfo_SEQ_PREAMBLE,decoded_CSI_AssociatedReportConfigInfo = {};

    [CSI_AssociatedReportConfigInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CSI_AssociatedReportConfigInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
    
    [decoded_CSI_AssociatedReportConfigInfo["reportConfigId"],offset] = decode_CSI_ReportConfigId(payload,offset);

    function decode_nzp_CSI_RS(payload,offset){
        let nzp_CSI_RS_SEQ_PREAMBLE,decoded_nzp_CSI_RS = {};
        [nzp_CSI_RS_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        [decoded_nzp_CSI_RS["resourceSet"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
        if(nzp_CSI_RS_SEQ_PREAMBLE[0]==="1") [decoded_nzp_CSI_RS["qcl-info"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_TCI_StateId);
        return [decoded_nzp_CSI_RS,offset];
    }
    [decoded_CSI_AssociatedReportConfigInfo["resourcesForChannel"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"nzp-CSI-RS" : decode_nzp_CSI_RS},
        {"csi-SSB-ResourceSet" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,1,1);}}
    ]);

    if(CSI_AssociatedReportConfigInfo_SEQ_PREAMBLE[0] === "1") [decoded_CSI_AssociatedReportConfigInfo["csi-IM-ResourcesForInterference"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    if(CSI_AssociatedReportConfigInfo_SEQ_PREAMBLE[1] === "1") [decoded_CSI_AssociatedReportConfigInfo["nzp-CSI-RS-ResourcesForInterference"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    
    if(CSI_AssociatedReportConfigInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_AssociatedReportConfigInfo,offset];
}

function decode_CSI_SemiPersistentOnPUSCH_TriggerStateList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CSI_SemiPersistentOnPUSCH_TriggerState);
}

function decode_CSI_SemiPersistentOnPUSCH_TriggerState(payload,offset){
    let CSI_SemiPersistentOnPUSCH_TriggerState_EXT_FLAG,decoded_CSI_SemiPersistentOnPUSCH_TriggerState = {};

    [CSI_SemiPersistentOnPUSCH_TriggerState_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [decoded_CSI_SemiPersistentOnPUSCH_TriggerState["associatedReportConfigInfo"],offset] = decode_CSI_ReportConfigId(payload,offset);

    if(CSI_SemiPersistentOnPUSCH_TriggerState_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_SemiPersistentOnPUSCH_TriggerState,offset];
}

function decode_CSI_MeasConfig(payload,offset){
    let CSI_MeasConfig_EXT_FLAG,CSI_MeasConfig_SEQ_PREAMBLE,decoded_CSI_MeasConfig = {};

    [CSI_MeasConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CSI_MeasConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,17);

    if(CSI_MeasConfig_SEQ_PREAMBLE[0] === "1") [decoded_CSI_MeasConfig["nzp-CSI-RS-ResourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,192,decode_NZP_CSI_RS_Resource);
    if(CSI_MeasConfig_SEQ_PREAMBLE[1] === "1") [decoded_CSI_MeasConfig["nzp-CSI-RS-ResourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,192,decode_NZP_CSI_RS_ResourceId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[2] === "1") [decoded_CSI_MeasConfig["nzp-CSI-RS-ResourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_NZP_CSI_RS_ResourceSet);
    if(CSI_MeasConfig_SEQ_PREAMBLE[3] === "1") [decoded_CSI_MeasConfig["nzp-CSI-RS-ResourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_NZP_CSI_RS_ResourceSetId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[4] === "1") [decoded_CSI_MeasConfig["csi-IM-ResourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_CSI_IM_Resource);
    if(CSI_MeasConfig_SEQ_PREAMBLE[5] === "1") [decoded_CSI_MeasConfig["csi-IM-ResourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_CSI_IM_ResourceId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[6] === "1") [decoded_CSI_MeasConfig["csi-IM-ResourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CSI_IM_ResourceSet);
    if(CSI_MeasConfig_SEQ_PREAMBLE[7] === "1") [decoded_CSI_MeasConfig["csi-IM-ResourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CSI_IM_ResourceSetId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[8] === "1") [decoded_CSI_MeasConfig["csi-SSB-ResourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CSI_SSB_ResourceSet);
    if(CSI_MeasConfig_SEQ_PREAMBLE[9] === "1") [decoded_CSI_MeasConfig["csi-SSB-ResourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CSI_SSB_ResourceSetId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[10] === "1") [decoded_CSI_MeasConfig["csi-ResourceConfigToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,112,decode_CSI_ResourceConfig);
    if(CSI_MeasConfig_SEQ_PREAMBLE[11] === "1") [decoded_CSI_MeasConfig["csi-ResourceConfigToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,112,decode_CSI_ResourceConfigId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[12] === "1") [decoded_CSI_MeasConfig["csi-ReportConfigToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,48,decode_CSI_ReportConfig);
    if(CSI_MeasConfig_SEQ_PREAMBLE[13] === "1") [decoded_CSI_MeasConfig["csi-ReportConfigToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,48,decode_CSI_ReportConfigId);
    if(CSI_MeasConfig_SEQ_PREAMBLE[14] === "1") [decoded_CSI_MeasConfig["reportTriggerSize"],offset] = parse_ASN_INTEGER(payload,offset,0,6);
    if(CSI_MeasConfig_SEQ_PREAMBLE[15] === "1") [decoded_CSI_MeasConfig["aperiodicTriggerStateList"],offset] = parse_ASN_SETREL(payload,offset,decode_CSI_AperiodicTriggerStateList);
    if(CSI_MeasConfig_SEQ_PREAMBLE[16] === "1") [decoded_CSI_MeasConfig["semiPersistentOnPUSCH-TriggerStateList"],offset] = parse_ASN_SETREL(payload,offset,decode_CSI_SemiPersistentOnPUSCH_TriggerStateList);

    if(CSI_MeasConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_MeasConfig,offset];
}

function decode_CrossCarrierSchedulingConfig(payload,offset){
    let CrossCarrierSchedulingConfig_EXT_FLAG,decoded_CrossCarrierSchedulingConfig = {};

    [CrossCarrierSchedulingConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    function decode_own(payload,offset){
        let decoded_own = {};
        [decoded_own["cif-Presence"],offset] = parse_ASN_BOOLEAN(payload,offset);
        return [decoded_own,offset];
    }
    function decode_other(payload,offset){
        let decoded_other = {};
        [decoded_other["schedulingCellId"],offset] = decode_ServCellIndex(payload,offset);
        [decoded_other["cif-InSchedulingCell"],offset] = parse_ASN_INTEGER(payload,offset,1,7);
        return [decoded_other,offset];
    }

    [decoded_CrossCarrierSchedulingConfig["schedulingCellInfo"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"own" : decode_own},
        {"other" : decode_other}
    ]);

    if(CrossCarrierSchedulingConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CrossCarrierSchedulingConfig,offset];
}

function decode_MeasObjectId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,64);
}

function decode_ServingCellConfig(payload,offset){
    let ServingCellConfig_EXT_FLAG,ServingCellConfig_SEQ_PREAMBLE,decoded_ServingCellConfig = {};

    [ServingCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ServingCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,17);

    if(ServingCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_ServingCellConfig["tdd-UL-DL-ConfigurationDedicated"],offset] = decode_TDD_UL_DL_ConfigDedicated(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[1] === "1") [decoded_ServingCellConfig["initialDownlinkBWP"],offset] = decode_BWP_DownlinkDedicated(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[2] === "1") [decoded_ServingCellConfig["downlinkBWP-ToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_BWP_Id);
    if(ServingCellConfig_SEQ_PREAMBLE[3] === "1") [decoded_ServingCellConfig["downlinkBWP-ToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_BWP_Downlink);
    if(ServingCellConfig_SEQ_PREAMBLE[4] === "1") [decoded_ServingCellConfig["firstActiveDownlinkBWP-Id"],offset] = decode_BWP_Id(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[5] === "1"){
        [decoded_ServingCellConfig["bwp-InactivityTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms2", "ms3", "ms4", "ms5", "ms6", "ms8", "ms10", "ms20", "ms30", "ms40", "ms50", "ms60", "ms80", "ms100", "ms200",
            "ms300", "ms500", "ms750", "ms1280", "ms1920", "ms2560", "spare10", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"])
    }
    if(ServingCellConfig_SEQ_PREAMBLE[6] === "1") [decoded_ServingCellConfig["defaultDownlinkBWP-Id"],offset] = decode_BWP_Id(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[7] === "1") [decoded_ServingCellConfig["uplinkConfig"],offset] = decode_UplinkConfig(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[8] === "1") [decoded_ServingCellConfig["supplementaryUplink"],offset] = decode_UplinkConfig(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[9] === "1") [decoded_ServingCellConfig["pdcch-ServingCellConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_PDCCH_ServingCellConfig);
    if(ServingCellConfig_SEQ_PREAMBLE[10] === "1") [decoded_ServingCellConfig["pdsch-ServingCellConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_PDSCH_ServingCellConfig);
    if(ServingCellConfig_SEQ_PREAMBLE[11] === "1") [decoded_ServingCellConfig["csi-MeasConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_CSI_MeasConfig);
    if(ServingCellConfig_SEQ_PREAMBLE[12] === "1"){
        [decoded_ServingCellConfig["sCellDeactivationTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms20", "ms40", "ms80", "ms160", "ms200", "ms240", "ms320", "ms400",
             "ms480", "ms520", "ms640", "ms720", "ms840", "ms1280", "spare2", "spare1"]);
    } 
    if(ServingCellConfig_SEQ_PREAMBLE[13] === "1") [decoded_ServingCellConfig["crossCarrierSchedulingConfig"],offset] = decode_CrossCarrierSchedulingConfig(payload,offset);
    [decoded_ServingCellConfig["tag-Id"],offset] = decode_TAG_Id(payload,offset);
    if(ServingCellConfig_SEQ_PREAMBLE[14] === "1") [decoded_ServingCellConfig["dummy1"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(ServingCellConfig_SEQ_PREAMBLE[15] === "1") [decoded_ServingCellConfig["pathlossReferenceLinking"],offset] = parse_ASN_ENUMERATED(payload,offset,["spCell", "sCell"]);
    if(ServingCellConfig_SEQ_PREAMBLE[16] === "1") [decoded_ServingCellConfig["servingCellMO"],offset] = decode_MeasObjectId(payload,offset);

    if(ServingCellConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ServingCellConfig,offset];
}

function decode_BWP_Uplink(payload,offset){
    let BWP_Uplink_SEQ_PREAMBLE, BWP_Uplink_EXT_FLAG, decoded_BWP_Uplink = {};

    [BWP_Uplink_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_Uplink_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_BWP_Uplink["bwp-Id"],offset] = decode_BWP_Id(payload,offset);
    if(BWP_Uplink_SEQ_PREAMBLE[0] === "1") [decoded_BWP_Uplink["bwp-Common"],offset] = decode_BWP_UplinkCommon(payload,offset);
    if(BWP_Uplink_SEQ_PREAMBLE[1] === "1") [decoded_BWP_Uplink["bwp-Dedicated"],offset] = decode_BWP_UplinkDedicated(payload,offset);

    if(BWP_Uplink_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BWP_Uplink,offset];
}

function decode_PUSCH_CodeBlockGroupTransmission(payload,offset){
    let PUSCH_CodeBlockGroupTransmission_EXT_FLAG,decoded_PUSCH_CodeBlockGroupTransmission = {};

    [PUSCH_CodeBlockGroupTransmission_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_PUSCH_CodeBlockGroupTransmission["maxCodeBlockGroupsPerTransportBlock"],offset] = parse_ASN_ENUMERATED(payload,offset,"n2", "n4", "n6", "n8");

    if(PUSCH_CodeBlockGroupTransmission_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUSCH_CodeBlockGroupTransmission,offset];
}

function decode_PUSCH_ServingCellConfig(payload,offset){
    let PUSCH_ServingCellConfig_EXT_FLAG,PUSCH_ServingCellConfig_SEQ_PREAMBLE,decoded_PUSCH_ServingCellConfig = {};

    [PUSCH_ServingCellConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUSCH_ServingCellConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(PUSCH_ServingCellConfig_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_ServingCellConfig["codeBlockGroupTransmission"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_CodeBlockGroupTransmission);
    if(PUSCH_ServingCellConfig_SEQ_PREAMBLE[1] === "1") [decoded_PUSCH_ServingCellConfig["rateMatching"],offset] = parse_ASN_ENUMERATED(payload,offset,["limitedBufferRM"]);
    if(PUSCH_ServingCellConfig_SEQ_PREAMBLE[2] === "1") [decoded_PUSCH_ServingCellConfig["xOverhead"],offset] = parse_ASN_ENUMERATED(payload,offset,["xoh6", "xoh12", "xoh18"]);

    if(PUSCH_ServingCellConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUSCH_ServingCellConfig,offset];
}

function decode_SRS_CC_SetIndex(payload,offset){
    let SRS_CC_SetIndex_SEQ_PREAMBLE,decoded_SRS_CC_SetIndex = {};

    [SRS_CC_SetIndex_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(SRS_CC_SetIndex_SEQ_PREAMBLE[0] === "1") [decoded_SRS_CC_SetIndex["cc-SetIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,3);
    if(SRS_CC_SetIndex_SEQ_PREAMBLE[1] === "1") [decoded_SRS_CC_SetIndex["cc-IndexInOneCC-Set"],offset] = parse_ASN_INTEGER(payload,offset,0,7);

    return [decoded_SRS_CC_SetIndex,offset];
}

function decode_SRS_TPC_PDCCH_Config(payload,offset){
    let SRS_TPC_PDCCH_Config_SEQ_PREAMBLE,decoded_SRS_TPC_PDCCH_Config = {};

    [SRS_TPC_PDCCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
    if(SRS_TPC_PDCCH_Config_SEQ_PREAMBLE[0] === "1"){
        [decoded_SRS_TPC_PDCCH_Config["srs-CC-SetIndexlist"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_SRS_CC_SetIndex);
    } 

    return [decoded_SRS_TPC_PDCCH_Config,offset];
}

function decode_SRS_CarrierSwitching(payload,offset){
    let SRS_CarrierSwitching_SEQ_PREAMBLE,SRS_CarrierSwitching_EXT_FLAG,decoded_SRS_CarrierSwitching = {};

    [SRS_CarrierSwitching_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRS_CarrierSwitching_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(SRS_CarrierSwitching_SEQ_PREAMBLE[0] === "1") [decoded_SRS_CarrierSwitching["srs-SwitchFromServCellIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    [decoded_SRS_CarrierSwitching["srs-SwitchFromCarrier"],offset] = parse_ASN_ENUMERATED(payload,offset,["sUL", "nUL"]);
    if(SRS_CarrierSwitching_SEQ_PREAMBLE[1] === "1"){
        [decoded_SRS_CarrierSwitching["srs-TPC-PDCCH-Group"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"typeA" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_SRS_TPC_PDCCH_Config);}},
            {"typeB" : decode_SRS_TPC_PDCCH_Config}
        ]);
    }
    if(SRS_CarrierSwitching_SEQ_PREAMBLE[2] === "1") [decoded_SRS_CarrierSwitching["monitoringCells"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_ServCellIndex);

    if(SRS_CarrierSwitching_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRS_CarrierSwitching,offset];
}

function decode_UplinkConfig(payload,offset){
    let UplinkConfig_SEQ_PREAMBLE,UplinkConfig_EXT_FLAG,decoded_UplinkConfig = {};

    [UplinkConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [UplinkConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);
    
    if(UplinkConfig_SEQ_PREAMBLE[0] === "1") [decoded_UplinkConfig["initialUplinkBWP"],offset] = decode_BWP_UplinkDedicated(payload,offset);
    if(UplinkConfig_SEQ_PREAMBLE[1] === "1") [decoded_UplinkConfig["uplinkBWP-ToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_BWP_Id);
    if(UplinkConfig_SEQ_PREAMBLE[2] === "1") [decoded_UplinkConfig["uplinkBWP-ToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_BWP_Uplink);
    if(UplinkConfig_SEQ_PREAMBLE[3] === "1") [decoded_UplinkConfig["firstActiveUplinkBWP-Id"],offset] = decode_BWP_Id(payload,offset);
    if(UplinkConfig_SEQ_PREAMBLE[4] === "1") [decoded_UplinkConfig["pusch-ServingCellConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_ServingCellConfig);
    if(UplinkConfig_SEQ_PREAMBLE[5] === "1") [decoded_UplinkConfig["carrierSwitching"],offset] = parse_ASN_SETREL(payload,offset,decode_SRS_CarrierSwitching );
    
    if(UplinkConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_UplinkConfig,offset];
}

function decode_SRS_ResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,15);
}

function decode_SRS_ResourceSet(payload,offset){
    let SRS_ResourceSet_SEQ_PREAMBLE,SRS_ResourceSet_EXT_FLAG, decoded_SRS_ResourceSet = {};

    [SRS_ResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRS_ResourceSet_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    [decoded_SRS_ResourceSet["srs-ResourceSetId"],offset] = decode_SRS_ResourceSetId(payload,offset);
    if(SRS_ResourceSet_SEQ_PREAMBLE[0] === "1") [decoded_SRS_ResourceSet["srs-ResourceIdList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_SRS_ResourceId);

    function decode_aperiodic(payload,offset){
        let aperiodic_EXT_FLAG,aperiodic_SEQ_PREAMBLE,decoded_aperiodic = {};

        [aperiodic_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [aperiodic_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

        [decoded_aperiodic["aperiodicSRS-ResourceTrigger"],offset] = parse_ASN_INTEGER(payload,offset,1,3);
        if(aperiodic_SEQ_PREAMBLE[0] === "1") [decoded_aperiodic["csi-RS"],offset] = decode_NZP_CSI_RS_ResourceId(payload,offset);
        if(aperiodic_SEQ_PREAMBLE[1] === "1") [decoded_aperiodic["slotOffset"],offset] = parse_ASN_INTEGER(payload,offset,1,32);
        return [decoded_aperiodic,offset];
    }
    function decode_semi_persistent(payload,offset){
        let semi_persistent_SEQ_PREAMBLE,semi_persistent_EXT_FLAG,decoded_semi_persistent = {};

        [semi_persistent_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [semi_persistent_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        if(semi_persistent_SEQ_PREAMBLE[0] === "1") [decoded_semi_persistent["associatedCSI-RS"],offset] = decode_NZP_CSI_RS_ResourceId(payload,offset);
        return [decoded_semi_persistent,offset];
    }
    function decode_periodic(payload,offset){
        let periodic_SEQ_PREAMBLE,periodic_EXT_FLAG,decoded_periodic = {};

        [periodic_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [periodic_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        if(periodic_SEQ_PREAMBLE[0] === "1") [decoded_periodic["associatedCSI-RS"],offset] = decode_NZP_CSI_RS_ResourceId(payload,offset);
        return [decoded_periodic,offset];
    }
    [decoded_SRS_ResourceSet["resourceType"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"aperiodic" : decode_aperiodic},
        {"semi_persistent" : decode_semi_persistent},
        {"periodic" : decode_periodic}
    ]);

    [decoded_SRS_ResourceSet["usage"],offset] = parse_ASN_ENUMERATED(payload,offset,["beamManagement", "codebook", "nonCodebook", "antennaSwitching"]);
    if(SRS_ResourceSet_SEQ_PREAMBLE[1] === "1") [decoded_SRS_ResourceSet["alpha"],offset] = decode_Alpha(payload,offset);
    if(SRS_ResourceSet_SEQ_PREAMBLE[2] === "1") [decoded_SRS_ResourceSet["p0"],offset] = parse_ASN_INTEGER(payload,offset,-202,24);
    if(SRS_ResourceSet_SEQ_PREAMBLE[3] === "1") [decoded_SRS_ResourceSet["pathlossReferenceRS"],offset] = decode_PathlossReferenceRS_Config(payload,offset);
    if(SRS_ResourceSet_SEQ_PREAMBLE[4] === "1") [decoded_SRS_ResourceSet["srs-PowerControlAdjustmentStates"],offset] = parse_ASN_ENUMERATED(payload,offset,["sameAsFci2", "separateClosedLoop"]);

    if(SRS_ResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRS_ResourceSet,offset];
}

function decode_PathlossReferenceRS_Config(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index": decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId}
    ]);
}

function decode_SRS_Resource(payload,offset){
    let SRS_Resource_EXT_FLAG,SRS_Resource_SEQ_PREAMBLE,decoded_SRS_Resource = {};

    [SRS_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRS_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SRS_Resource["srs-ResourceId"],offset] = decode_SRS_ResourceId(payload,offset);
    [decoded_SRS_Resource["nrofSRS-Ports"],offset] = parse_ASN_ENUMERATED(payload,offset,["port1", "ports2", "ports4"]);
    if(SRS_Resource_SEQ_PREAMBLE[0] === "1") [decoded_SRS_Resource["ptrs-PortIndex"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1" ]);

    function decode_n2(payload,offset){
        let decoded_n2 = {};
        [decoded_n2["combOffset-n2"],offset] = parse_ASN_INTEGER(payload,offset,0,1);
        [decoded_n2["cyclicShift-n2"],offset] = parse_ASN_INTEGER(payload,offset,0,7);
        return [decoded_n2,offset];
    }
    function decode_n4(payload,offset){
        let decoded_n4 = {};
        [decoded_n4["combOffset-n4"],offset] = parse_ASN_INTEGER(payload,offset,0,3);
        [decoded_n4["cyclicShift-n4"],offset] = parse_ASN_INTEGER(payload,offset,0,11);
        return [decoded_n4,offset];
    }
    [decoded_SRS_Resource["transmissionComb"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"n2" : decode_n2},
        {"n4" : decode_n4}
    ]);

    //resourceMapping
        let decoded_resourceMapping = {};
        [decoded_resourceMapping["startPosition"],offset] = parse_ASN_INTEGER(payload,offset,0,5);
        [decoded_resourceMapping["nrofSymbols"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n4"]);
        [decoded_resourceMapping["repetitionFactor"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n4"]);
        decoded_SRS_Resource["resourceMapping"] = decoded_resourceMapping;
    //resourceMapping end

    [decoded_SRS_Resource["freqDomainPosition"],offset] = parse_ASN_INTEGER(payload,offset,0,67);
    [decoded_SRS_Resource["freqDomainShift"],offset] = parse_ASN_INTEGER(payload,offset,0,268);

    //freqHopping
    let decoded_freqHopping = {};
    [decoded_freqHopping["c-SRS"],offset] = parse_ASN_INTEGER(payload,offset,0,63);
    [decoded_freqHopping["b-SRS"],offset] = parse_ASN_INTEGER(payload,offset,0,3);
    [decoded_freqHopping["b-hop"],offset] = parse_ASN_INTEGER(payload,offset,0,3);
    decoded_SRS_Resource["freqHopping"] = decoded_freqHopping;
    //freqHopping end
    
    [decoded_SRS_Resource["groupOrSequenceHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["neither", "groupHopping", "sequenceHopping"]);

    function decode_aperiodic(payload,offset){
        let aperiodic_EXT_FLAG,decoded_aperiodic = {};
        [aperiodic_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        return [decoded_aperiodic,offset];        
    }
    function decode_semi_persistent(payload,offset){
        let semi_persistent_EXT_FLAG,decoded_semi_persistent = {};
        [semi_persistent_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [decoded_semi_persistent["periodicityAndOffset-sp"],offset] = decode_SRS_PeriodicityAndOffset(payload,offset);
        return [decoded_semi_persistent,offset];
    }
    function decode_periodic(payload,offset){
        let periodic_EXT_FLAG,decoded_periodic = {};
        [periodic_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [decoded_periodic["periodicityAndOffset-p"],offset] = decode_SRS_PeriodicityAndOffset(payload,offset);
        return [decoded_periodic,offset];
    }

    [decoded_SRS_Resource["resourceType"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"aperiodic" : decode_aperiodic},
        {"semi-persistent" : decode_semi_persistent},
        {"periodic" : decode_periodic}
    ]);

    [decoded_SRS_Resource["sequenceId"],offset] = parse_ASN_INTEGER(payload,offset,0,1023);
    if(SRS_Resource_SEQ_PREAMBLE[1] === "1") [decoded_SRS_Resource["spatialRelationInfo"],offset] = decode_SRS_SpatialRelationInfo(payload,offset);

    if(SRS_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRS_Resource,offset];
}

function decode_SRS_SpatialRelationInfo(payload,offset){
    let decoded_SRS_SpatialRelationInfo = {}, SRS_SpatialRelationInfo_SEQ_PREAMBLE;

    [SRS_SpatialRelationInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(SRS_SpatialRelationInfo_SEQ_PREAMBLE[0] === "1") [decoded_SRS_SpatialRelationInfo["servingCellId"],offset] = decode_ServCellIndex(payload,offset);

    function decode_srs(payload,offset){
        let decoded_srs = {};
        [decoded_srs["resourceId"],offset] = decode_SRS_ResourceId(payload,offset);
        [decoded_srs["uplinkBWP"],offset] = decode_BWP_Id(payload,offset);
        return [decoded_srs,offset];
    }
    [decoded_SRS_SpatialRelationInfo["referenceSignal"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index" : decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId},
        {"srs" : decode_srs}
    ]);

    return [decoded_SRS_SpatialRelationInfo,offset];
}

function decode_SRS_PeriodicityAndOffset(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"slots1" : parse_ASN_NULL},
        {"slots2" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1);}},
        {"slots4" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,3);}},
        {"slots5" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4);}},
        {"slots8" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,7);}},
        {"slots10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9);}},
        {"slots16" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15);}},
        {"slots20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19);}},
        {"slots32" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,31);}},
        {"slots40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39);}},
        {"slots64" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,63);}},
        {"slots80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79);}},
        {"slots160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159);}},
        {"slots320" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,319);}},
        {"slots640" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,639);}},
        {"slots1280" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1279);}},
        {"slots2560" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,2559);}},
    ]);
}

function decode_SRS_Config(payload,offset){
    let SRS_Config_SEQ_PREAMBLE,SRS_Config_EXT_FLAG,decoded_SRS_Config = {};

    [SRS_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRS_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    if(SRS_Config_SEQ_PREAMBLE[0] === "1") [decoded_SRS_Config["srs-ResourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16, decode_SRS_ResourceSetId);
    if(SRS_Config_SEQ_PREAMBLE[1] === "1") [decoded_SRS_Config["srs-ResourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16, decode_SRS_ResourceSet);
    if(SRS_Config_SEQ_PREAMBLE[2] === "1") [decoded_SRS_Config["srs-ResourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_SRS_ResourceId);
    if(SRS_Config_SEQ_PREAMBLE[3] === "1") [decoded_SRS_Config["srs-ResourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_SRS_Resource);
    if(SRS_Config_SEQ_PREAMBLE[4] === "1") [decoded_SRS_Config["tpc-Accumulation"],offset] = parse_ASN_ENUMERATED(payload,offset,["disabled"]);

    if(SRS_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRS_Config,offset];
}

function decode_BFR_CSIRS_Resource(payload,offset){
    let BFR_CSIRS_Resource_EXT_FLAG,BFR_CSIRS_Resource_SEQ_PREAMBLE,decoded_BFR_CSIRS_Resource = {};

    [BFR_CSIRS_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BFR_CSIRS_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_BFR_CSIRS_Resource["csi-RS"],offset] = decode_NZP_CSI_RS_ResourceId(payload,offset);
    if(BFR_CSIRS_Resource_SEQ_PREAMBLE[0] === "1") [decoded_BFR_CSIRS_Resource["ra-OccasionList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,511);});
    if(BFR_CSIRS_Resource_SEQ_PREAMBLE[1] === "1") [decoded_BFR_CSIRS_Resource["ra-PreambleIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,63);

    if(BFR_CSIRS_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BFR_CSIRS_Resource,offset];
}

function decode_BFR_SSB_Resource(payload,offset){
    let BFR_SSB_Resource_EXT_FLAG,decoded_BFR_SSB_Resource = {};

    [BFR_SSB_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [decoded_BFR_SSB_Resource["ssb"],offset] = decode_SSB_Index(payload,offset);
    [decoded_BFR_SSB_Resource["ra-PreambleIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,63);

    if(BFR_SSB_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BFR_SSB_Resource,offset];
}

function decode_PRACH_ResourceDedicatedBFR(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"ssb" : decode_BFR_SSB_Resource},
        {"csi-RS" : decode_BFR_CSIRS_Resource}
    ]);
}

function decode_BeamFailureRecoveryConfig(payload,offset){
    let BeamFailureRecoveryConfig_SEQ_PREAMBLE,BeamFailureRecoveryConfig_EXT_FLAG,decoded_BeamFailureRecoveryConfig = {};

    [BeamFailureRecoveryConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BeamFailureRecoveryConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,9);

    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[0] === "1") [decoded_BeamFailureRecoveryConfig["rootSequenceIndex-BFR"],offset] = parse_ASN_INTEGER(payload,offset,0,137);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[1] === "1") [decoded_BeamFailureRecoveryConfig["rach-ConfigBFR"],offset] = decode_RACH_ConfigGeneric(payload,offset);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[2] === "1") [decoded_BeamFailureRecoveryConfig["rsrp-ThresholdSSB"],offset] = decode_RSRP_Range(payload,offset);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[3] === "1") [decoded_BeamFailureRecoveryConfig["candidateBeamRSList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_PRACH_ResourceDedicatedBFR);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[4] === "1"){
        [decoded_BeamFailureRecoveryConfig["ssb-perRACH-Occasion"],offset] = parse_ASN_ENUMERATED(payload,offset,["oneEighth", "oneFourth", "oneHalf", "one", "two", "four", "eight", "sixteen"]);
    }
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[5] === "1") [decoded_BeamFailureRecoveryConfig["ra-ssb-OccasionMaskIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[6] === "1") [decoded_BeamFailureRecoveryConfig["recoverySearchSpaceId"],offset] = decode_SearchSpaceId(payload,offset);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[7] === "1") [decoded_BeamFailureRecoveryConfig["ra-Prioritization"],offset] = decode_RA_Prioritization(payload,offset);
    if(BeamFailureRecoveryConfig_SEQ_PREAMBLE[8] === "1") [decoded_BeamFailureRecoveryConfig["beamFailureRecoveryTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms10", "ms20", "ms40", "ms60", "ms80", "ms100", "ms150", "ms200"]);
    
    if(BeamFailureRecoveryConfig_EXT_FLAG=== 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BeamFailureRecoveryConfig,offset];
} 

function decode_BWP_UplinkDedicated(payload,offset){
    let BWP_UplinkDedicated_SEQ_PREAMBLE,BWP_UplinkDedicated_EXT_FLAG,decoded_BWP_UplinkDedicated = {};

    [BWP_UplinkDedicated_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_UplinkDedicated_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    if(BWP_UplinkDedicated_SEQ_PREAMBLE[0] === "1") [decoded_BWP_UplinkDedicated["pucch-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_Config);
    if(BWP_UplinkDedicated_SEQ_PREAMBLE[1] === "1") [decoded_BWP_UplinkDedicated["pusch-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_Config);
    if(BWP_UplinkDedicated_SEQ_PREAMBLE[2] === "1") [decoded_BWP_UplinkDedicated["configuredGrantConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_ConfiguredGrantConfig);
    if(BWP_UplinkDedicated_SEQ_PREAMBLE[3] === "1") [decoded_BWP_UplinkDedicated["srs-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_SRS_Config);
    if(BWP_UplinkDedicated_SEQ_PREAMBLE[4] === "1") [decoded_BWP_UplinkDedicated["beamFailureRecoveryConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_BeamFailureRecoveryConfig);
    
    if(BWP_UplinkDedicated_EXT_FLAG=== 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BWP_UplinkDedicated,offset];
}

function decode_CG_UCI_OnPUSCH(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"dynamic" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_BetaOffsets)}},
        {"semiStatic" : decode_BetaOffsets}
    ])
}

function decode_ConfiguredGrantConfig(payload,offset){
    let ConfiguredGrantConfig_SEQ_PREAMBLE,ConfiguredGrantConfig_EXT_FLAG, decoded_ConfiguredGrantConfig = {};

    [ConfiguredGrantConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ConfiguredGrantConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,9);

    if(ConfiguredGrantConfig_SEQ_PREAMBLE[0] === "1") [decoded_ConfiguredGrantConfig["frequencyHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["intraSlot", "interSlot"]);
    [decoded_ConfiguredGrantConfig["cg-DMRS-Configuration"],offset] = decode_DMRS_UplinkConfig(payload,offset);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[1] === "1") [decoded_ConfiguredGrantConfig["mcs-Table"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam256", "qam64LowSE"]);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[2] === "1") [decoded_ConfiguredGrantConfig["mcs-TableTransformPrecoder"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam256", "qam64LowSE"]);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[3] === "1") [decoded_ConfiguredGrantConfig["uci-OnPUSCH"],offset] = parse_ASN_ENUMERATED(payload,offset,decode_CG_UCI_OnPUSCH);
    [decoded_ConfiguredGrantConfig["resourceAllocation"],offset] = parse_ASN_ENUMERATED(payload,offset,["resourceAllocationType0", "resourceAllocationType1", "dynamicSwitch"]);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[4] === "1") [decoded_ConfiguredGrantConfig["rbg-Size"],offset] = parse_ASN_ENUMERATED(payload,offset,["config2"]);
    [decoded_ConfiguredGrantConfig["powerControlLoopToUse"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1"]);
    [decoded_ConfiguredGrantConfig["p0-PUSCH-Alpha"],offset] = decode_P0_PUSCH_AlphaSetId(payload,offset);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[5] === "1") [decoded_ConfiguredGrantConfig["transformPrecoder"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled", "disabled"]);
    [decoded_ConfiguredGrantConfig["nrofHARQ-Processes"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    [decoded_ConfiguredGrantConfig["repK"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n4", "n8"]);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[6] === "1") [decoded_ConfiguredGrantConfig["repK-RV"],offset] = parse_ASN_ENUMERATED(payload,offset,["s1-0231", "s2-0303", "s3-0000"]);
    
    [decoded_ConfiguredGrantConfig["periodicity"],offset] = parse_ASN_ENUMERATED(payload,offset,["sym2", "sym7", "sym1x14", "sym2x14", "sym4x14", "sym5x14", "sym8x14", "sym10x14", "sym16x14", "sym20x14", "sym32x14", "sym40x14", "sym64x14", "sym80x14", "sym128x14", "sym160x14", "sym256x14", "sym320x14", "sym512x14",
         "sym640x14", "sym1024x14", "sym1280x14", "sym2560x14", "sym5120x14", "sym6", "sym1x12", "sym2x12", "sym4x12", "sym5x12", "sym8x12", "sym10x12", "sym16x12", "sym20x12", "sym32x12", "sym40x12", "sym64x12", "sym80x12", "sym128x12", "sym160x12", "sym256x12", "sym320x12", "sym512x12", "sym640x12", "sym1280x12", "sym2560x12"]);
    
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[7] === "1") [decoded_ConfiguredGrantConfig["configuredGrantTimer"],offset] = parse_ASN_INTEGER(payload,offset,1,64);
    if(ConfiguredGrantConfig_SEQ_PREAMBLE[8] === "1"){
        let rrc_ConfiguredUplinkGrant_EXT_FLAG,rrc_ConfiguredUplinkGrant_SEQ_PREAMBLE,decoded_rrc_ConfiguredUplinkGrant = {};

        [rrc_ConfiguredUplinkGrant_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [rrc_ConfiguredUplinkGrant_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

        [decoded_rrc_ConfiguredUplinkGrant["timeDomainOffset"],offset] = parse_ASN_INTEGER(payload,offset,0,5119);
        [decoded_rrc_ConfiguredUplinkGrant["timeDomainAllocation"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
        [decoded_rrc_ConfiguredUplinkGrant["frequencyDomainAllocation"],offset] = parse_ASN_BITSTRING(payload,offset,18,18);
        [decoded_rrc_ConfiguredUplinkGrant["antennaPort"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
        if(rrc_ConfiguredUplinkGrant_SEQ_PREAMBLE[0] === "1") [decoded_rrc_ConfiguredUplinkGrant["dmrs-SeqInitialization"],offset] = parse_ASN_INTEGER(payload,offset,0,1);
        [decoded_rrc_ConfiguredUplinkGrant["precodingAndNumberOfLayers"],offset] = parse_ASN_INTEGER(payload,offset,0,63);
        if(rrc_ConfiguredUplinkGrant_SEQ_PREAMBLE[1] === "1") [decoded_rrc_ConfiguredUplinkGrant["srs-ResourceIndicator"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
        [decoded_rrc_ConfiguredUplinkGrant["mcsAndTBS"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
        if(rrc_ConfiguredUplinkGrant_SEQ_PREAMBLE[2] === "1") [decoded_rrc_ConfiguredUplinkGrant["frequencyHoppingOffset"],offset] = parse_ASN_INTEGER(payload,offset,1,274);
        [decoded_rrc_ConfiguredUplinkGrant["pathlossReferenceIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,3);

        decoded_ConfiguredGrantConfig["rrc-ConfiguredUplinkGrant"] = decoded_rrc_ConfiguredUplinkGrant;
    }

    if(ConfiguredGrantConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ConfiguredGrantConfig,offset];
}

function decode_BetaOffsets(payload,offset){
    let BetaOffsets_SEQ_PREAMBLE,decoded_BetaOffsets = {};

    [BetaOffsets_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,7);

    if(BetaOffsets_SEQ_PREAMBLE[0] === "1") [decoded_BetaOffsets["betaOffsetACK-Index1"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[1] === "1") [decoded_BetaOffsets["betaOffsetACK-Index2"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[2] === "1") [decoded_BetaOffsets["betaOffsetACK-Index3"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[3] === "1") [decoded_BetaOffsets["betaOffsetCSI-Part1-Index1"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[4] === "1") [decoded_BetaOffsets["betaOffsetCSI-Part1-Index2"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[5] === "1") [decoded_BetaOffsets["betaOffsetCSI-Part2-Index1"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(BetaOffsets_SEQ_PREAMBLE[6] === "1") [decoded_BetaOffsets["betaOffsetCSI-Part2-Index2"],offset] = parse_ASN_INTEGER(payload,offset,0,31);

    return [decoded_BetaOffsets,offset];
}

function decode_UCI_OnPUSCH(payload,offset){
    let UCI_OnPUSCH_SEQ_PREAMBLE,decoded_UCI_OnPUSCH = {};

    [UCI_OnPUSCH_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(UCI_OnPUSCH_SEQ_PREAMBLE[0] === "1"){
        [decoded_UCI_OnPUSCH["betaOffsets"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"dynamic" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,4,4,decode_BetaOffsets);}},
            {"semiStatic" : decode_BetaOffsets}
        ])
    }
    [decoded_UCI_OnPUSCH["scaling"],offset] = parse_ASN_ENUMERATED(payload,offset,["f0p5", "f0p65", "f0p8", "f1"]);

    return [decoded_UCI_OnPUSCH,offset];
}

function decode_PUSCH_Config(payload,offset){
    let PUSCH_Config_EXT_FLAG,PUSCH_Config_SEQ_PREAMBLE,decoded_PUSCH_Config = {};

    [PUSCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUSCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,17);

    if(PUSCH_Config_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_Config["dataScramblingIdentityPUSCH"],offset] = parse_ASN_INTEGER(payload,offset,0,1023);
    if(PUSCH_Config_SEQ_PREAMBLE[1] === "1") [decoded_PUSCH_Config["txConfig"],offset] = parse_ASN_ENUMERATED(payload,offset,["codebook", "nonCodebook"]);    
    if(PUSCH_Config_SEQ_PREAMBLE[2] === "1") [decoded_PUSCH_Config["dmrs-UplinkForPUSCH-MappingTypeA"],offset] = parse_ASN_SETREL(payload,offset,decode_DMRS_UplinkConfig);
    if(PUSCH_Config_SEQ_PREAMBLE[3] === "1") [decoded_PUSCH_Config["dmrs-UplinkForPUSCH-MappingTypeB"],offset] = parse_ASN_SETREL(payload,offset,decode_DMRS_UplinkConfig);
    if(PUSCH_Config_SEQ_PREAMBLE[4] === "1") [decoded_PUSCH_Config["pusch-PowerControl"],offset] = decode_PUSCH_PowerControl(payload,offset);
    if(PUSCH_Config_SEQ_PREAMBLE[5] === "1") [decoded_PUSCH_Config["frequencyHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["intraSlot", "interSlot"]);
    if(PUSCH_Config_SEQ_PREAMBLE[6] === "1"){
        [decoded_PUSCH_Config["frequencyHoppingOffsetLists"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,1,274);});
    }
    [decoded_PUSCH_Config["resourceAllocation"],offset] = parse_ASN_ENUMERATED(payload,offset,["resourceAllocationType0", "resourceAllocationType1", "dynamicSwitch"]);
    if(PUSCH_Config_SEQ_PREAMBLE[7] === "1") [decoded_PUSCH_Config["pusch-TimeDomainAllocationList"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_TimeDomainResourceAllocationList); 
    if(PUSCH_Config_SEQ_PREAMBLE[8] === "1") [decoded_PUSCH_Config["pusch-AggregationFactor"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4", "n8"]);
    if(PUSCH_Config_SEQ_PREAMBLE[9] === "1") [decoded_PUSCH_Config["mcs-Table"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam256", "qam64LowSE"]);
    if(PUSCH_Config_SEQ_PREAMBLE[10] === "1") [decoded_PUSCH_Config["mcs-TableTransformPrecoder"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam256", "qam64LowSE"]);
    if(PUSCH_Config_SEQ_PREAMBLE[11] === "1") [decoded_PUSCH_Config["transformPrecoder"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled", "disabled"]);
    if(PUSCH_Config_SEQ_PREAMBLE[12] === "1") [decoded_PUSCH_Config["codebookSubset"],offset] = parse_ASN_ENUMERATED(payload,offset,["fullyAndPartialAndNonCoherent", "partialAndNonCoherent","nonCoherent"]);
    if(PUSCH_Config_SEQ_PREAMBLE[13] === "1") [decoded_PUSCH_Config["maxRank"],offset] = parse_ASN_INTEGER(payload,offset,1,4);
    if(PUSCH_Config_SEQ_PREAMBLE[14] === "1") [decoded_PUSCH_Config["rbg-Size"],offset] = parse_ASN_ENUMERATED(payload,offset,["config2"]);
    if(PUSCH_Config_SEQ_PREAMBLE[15] === "1") [decoded_PUSCH_Config["uci-OnPUSCH"],offset] = parse_ASN_SETREL(payload,offset,decode_UCI_OnPUSCH);
    if(PUSCH_Config_SEQ_PREAMBLE[16] === "1") [decoded_PUSCH_Config["tp-pi2BPSK"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
       
    if(PUSCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUSCH_Config,offset];
}

function decode_PUSCH_PowerControl(payload,offset){
    let PUSCH_PowerControl_SEQ_PREAMBLE,decoded_PUSCH_PowerControl = {};

    [PUSCH_PowerControl_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,10);

    if(PUSCH_PowerControl_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_PowerControl["tpc-Accumulation"],offset] = parse_ASN_ENUMERATED(payload,offset,"disabled");
    if(PUSCH_PowerControl_SEQ_PREAMBLE[1] === "1") [decoded_PUSCH_PowerControl["msg3-Alpha"],offset] = decode_Alpha(payload,offset);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[2] === "1") [decoded_PUSCH_PowerControl["p0-NominalWithoutGrant"],offset] = parse_ASN_INTEGER(payload,offset,-202,24);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[3] === "1") [decoded_PUSCH_PowerControl["p0-AlphaSets"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,30,decode_P0_PUSCH_AlphaSet);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[4] === "1") [decoded_PUSCH_PowerControl["pathlossReferenceRSToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUSCH_PathlossReferenceRS);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[5] === "1") [decoded_PUSCH_PowerControl["pathlossReferenceRSToReleaseList"],offset] = decode_PUSCH_PathlossReferenceRS_Id;
    if(PUSCH_PowerControl_SEQ_PREAMBLE[6] === "1") [decoded_PUSCH_PowerControl["twoPUSCH-PC-AdjustmentStates"],offset] = parse_ASN_ENUMERATED(payload,offset,["twoStates"]);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[7] === "1") [decoded_PUSCH_PowerControl["deltaMCS"],offset] = parse_ASN_ENUMERATED(payload,offset,"enabled");   
    if(PUSCH_PowerControl_SEQ_PREAMBLE[8] === "1") [decoded_PUSCH_PowerControl["sri-PUSCH-MappingToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_SRI_PUSCH_PowerControl);
    if(PUSCH_PowerControl_SEQ_PREAMBLE[9] === "1") [decoded_PUSCH_PowerControl["sri-PUSCH-MappingToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16, decode_SRI_PUSCH_PowerControlId);

    return [decoded_PUSCH_PowerControl,offset];
}

function decode_SRI_PUSCH_PowerControl(payload,offset){
    let decoded_SRI_PUSCH_PowerControl = {};
    [decoded_SRI_PUSCH_PowerControl["sri-PUSCH-PowerControlId"],offset] = decode_SRI_PUSCH_PowerControlId(payload,offset);
    [decoded_SRI_PUSCH_PowerControl["sri-PUSCH-PathlossReferenceRS-Id"],offset] = decode_PUSCH_PathlossReferenceRS_Id(payload,offset);
    [decoded_SRI_PUSCH_PowerControl["sri-P0-PUSCH-AlphaSetId"],offset] = decode_P0_PUSCH_AlphaSetId(payload,offset);
    [decoded_SRI_PUSCH_PowerControl["sri-PUSCH-ClosedLoopIndex"],offset] = parse_ASN_ENUMERATED(payload,offset,["i0", "i1"]);

    return [decoded_SRI_PUSCH_PowerControl,offset];
}

function decode_PUSCH_PathlossReferenceRS(payload,offset){
    let decoded_PUSCH_PathlossReferenceRS = {};

    [decoded_PUSCH_PathlossReferenceRS["pusch-PathlossReferenceRS-Id"],offset] = decode_PUSCH_PathlossReferenceRS_Id(payload,offset);
    [decoded_PUSCH_PathlossReferenceRS["referenceSignal"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index" : decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId}
    ]);

    return [decoded_PUSCH_PathlossReferenceRS,offset];
}

function decode_P0_PUSCH_AlphaSet(payload,offset){
    let P0_PUSCH_AlphaSet_SEQ_PREAMBLE,decoded_P0_PUSCH_AlphaSet = {};

    [P0_PUSCH_AlphaSet_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_P0_PUSCH_AlphaSet["p0-PUSCH-AlphaSetId"],offset] = decode_P0_PUSCH_AlphaSetId(payload,offset);
    if(P0_PUSCH_AlphaSet_SEQ_PREAMBLE[0] === "1") [decoded_P0_PUSCH_AlphaSet["p0"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(P0_PUSCH_AlphaSet_SEQ_PREAMBLE[1] === "1") [decoded_P0_PUSCH_AlphaSet["alpha"],offset] = decode_Alpha(payload,offset)

    return [decoded_P0_PUSCH_AlphaSet,offset];
}

function decode_DMRS_UplinkConfig(payload,offset){
    let DMRS_UplinkConfig_SEQ_PREAMBLE,DMRS_UplinkConfig_EXT_FLAG,decoded_DMRS_UplinkConfig = {};

    [DMRS_UplinkConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [DMRS_UplinkConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

    if(DMRS_UplinkConfig_SEQ_PREAMBLE[0] === "1") [decoded_DMRS_UplinkConfig["dmrs-Type"],offset] = parse_ASN_ENUMERATED(payload,offset,"type2");
    if(DMRS_UplinkConfig_SEQ_PREAMBLE[1] === "1") [decoded_DMRS_UplinkConfig["dmrs-AdditionalPosition"],offset] = parse_ASN_ENUMERATED(payload,offset,["pos0", "pos1", "pos3"]);
    if(DMRS_UplinkConfig_SEQ_PREAMBLE[2] === "1") [decoded_DMRS_UplinkConfig["phaseTrackingRS"],offset] = parse_ASN_SETREL(payload,offset,decode_PTRS_UplinkConfig);
    if(DMRS_UplinkConfig_SEQ_PREAMBLE[3] === "1") [decoded_DMRS_UplinkConfig["maxLength"],offset] = parse_ASN_ENUMERATED(payload,offset,"len2");
    if(DMRS_UplinkConfig_SEQ_PREAMBLE[4] === "1"){
        let transformPrecodingDisabled_SEQ_PREAMBLE,transformPrecodingDisabled_EXT_FLAG,decoded_transformPrecodingDisabled = {};

        [transformPrecodingDisabled_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [transformPrecodingDisabled_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

        if(transformPrecodingDisabled_SEQ_PREAMBLE[0] === "1") [decoded_transformPrecodingDisabled["scramblingID0"],offset] = parse_ASN_INTEGER(payload,offset,0,65535);
        if(transformPrecodingDisabled_SEQ_PREAMBLE[1] === "1") [decoded_transformPrecodingDisabled["scramblingID1"],offset] = parse_ASN_INTEGER(payload,offset,0,65535);

        decoded_DMRS_UplinkConfig["transformPrecodingDisabled"] = decoded_transformPrecodingDisabled;
    }
    if(DMRS_UplinkConfig_SEQ_PREAMBLE[5] === "1"){
        let transformPrecodingEnabled_SEQ_PREAMBLE,transformPrecodingEnabled_EXT_FLAG,decoded_transformPrecodingEnabled = {};

        [transformPrecodingEnabled_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [transformPrecodingEnabled_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

        if(transformPrecodingEnabled_SEQ_PREAMBLE[0] === "1") [decoded_transformPrecodingEnabled["nPUSCH-Identity"],offset] = parse_ASN_INTEGER(payload,offset,0,1007);
        if(transformPrecodingEnabled_SEQ_PREAMBLE[1] === "1") [decoded_transformPrecodingEnabled["sequenceGroupHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["disabled"]);
        if(transformPrecodingEnabled_EXT_FLAG[2] === "1") [decoded_transformPrecodingEnabled["sequenceHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,"enabled");

        decoded_DMRS_UplinkConfig["transformPrecodingEnabled"] = decoded_transformPrecodingEnabled;
    }

    if(DMRS_UplinkConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DMRS_UplinkConfig,offset]
}

function decode_PTRS_UplinkConfig(payload,offset){
    let PTRS_UplinkConfig_SEQ_PREAMBLE,PTRS_UplinkConfig_EXT_FLAG,decoded_PTRS_UplinkConfig = {};

    [PTRS_UplinkConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PTRS_UplinkConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(PTRS_UplinkConfig_SEQ_PREAMBLE[0] === "1"){
        let transformPrecoderDisabled_SEQ_PREAMBLE,decoded_transformPrecoderDisabled = {};

        [transformPrecoderDisabled_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

        if(transformPrecoderDisabled_SEQ_PREAMBLE[0] === "1"){
             [decoded_transformPrecoderDisabled["frequencyDensity"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,2,(payload,offset)=>{
                return parse_ASN_INTEGER(payload,offset,1,276);
            });
        }
        if(transformPrecoderDisabled_SEQ_PREAMBLE[1] === "1"){
            [decoded_transformPrecoderDisabled["timeDensity"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,3,3,(payload,offset)=>{
                return parse_ASN_INTEGER(payload,offset,0,29);
            });
        }
       
        [decoded_transformPrecoderDisabled["maxNrofPorts"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2"]);       
        if(transformPrecoderDisabled_SEQ_PREAMBLE[2] === "1") [decoded_transformPrecoderDisabled["resourceElementOffset"],offset] = parse_ASN_ENUMERATED(payload,offset,["offset01", "offset10", "offset11"]);
        [decoded_transformPrecoderDisabled["ptrs-Power"],offset] = parse_ASN_ENUMERATED(payload,offset,["p00", "p01", "p10", "p11"]);

        decoded_PTRS_UplinkConfig["transformPrecoderDisabled"] = decoded_transformPrecoderDisabled;
    }
    if(PTRS_UplinkConfig_SEQ_PREAMBLE[1] === "1"){
        let transformPrecoderEnabled_SEQ_PREAMBLE,decoded_transformPrecoderEnabled = {};

        [transformPrecoderEnabled_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

        [decoded_transformPrecoderEnabled["sampleDensity"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,5,5,(payload,offset)=>{
            return parse_ASN_INTEGER(payload,offset,1,276);
        });

        if(transformPrecoderEnabled_SEQ_PREAMBLE[0] === "1") [decoded_transformPrecoderEnabled["timeDensityTransformPrecoding"],offset] = parse_ASN_ENUMERATED(payload,offset,["d2"]);

        decoded_PTRS_UplinkConfig["transformPrecoderEnabled"] = decoded_transformPrecoderEnabled;
    }

    if(PTRS_UplinkConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PTRS_UplinkConfig,offset];
}

function decode_PUCCH_Config(payload,offset){
    let PUCCH_Config_SEQ_PREAMBLE,PUCCH_Config_EXT_FLAG,decoded_PUCCH_Config = {};

    [PUCCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUCCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,15);

    if(PUCCH_Config_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_Config["resourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUCCH_ResourceSet);
    if(PUCCH_Config_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_Config["resourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUCCH_ResourceSetId);
    if(PUCCH_Config_SEQ_PREAMBLE[2] === "1") [decoded_PUCCH_Config["resourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_PUCCH_Resource);
    if(PUCCH_Config_SEQ_PREAMBLE[3] === "1") [decoded_PUCCH_Config["resourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_PUCCH_ResourceId);    
    if(PUCCH_Config_SEQ_PREAMBLE[4] === "1") [decoded_PUCCH_Config["format1"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_FormatConfig);
    if(PUCCH_Config_SEQ_PREAMBLE[5] === "1") [decoded_PUCCH_Config["format2"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_FormatConfig);
    if(PUCCH_Config_SEQ_PREAMBLE[6] === "1") [decoded_PUCCH_Config["format3"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_FormatConfig);
    if(PUCCH_Config_SEQ_PREAMBLE[7] === "1") [decoded_PUCCH_Config["format4"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_FormatConfig);
    if(PUCCH_Config_SEQ_PREAMBLE[8] === "1"){
        [decoded_PUCCH_Config["schedulingRequestResourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_SchedulingRequestResourceConfig);
    }
    if(PUCCH_Config_SEQ_PREAMBLE[9] === "1"){
        [decoded_PUCCH_Config["schedulingRequestResourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_SchedulingRequestResourceId);
    }
    if(PUCCH_Config_SEQ_PREAMBLE[10] === "1"){
        [decoded_PUCCH_Config["multi-CSI-PUCCH-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,2,decode_PUCCH_ResourceId)
    }
    if(PUCCH_Config_SEQ_PREAMBLE[11] === "1"){
        [decoded_PUCCH_Config["dl-DataToUL-ACK"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15);});
    }
    if(PUCCH_Config_SEQ_PREAMBLE[12] === "1"){
        [decoded_PUCCH_Config["spatialRelationInfoToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_PUCCH_SpatialRelationInfo);
    }
    if(PUCCH_Config_SEQ_PREAMBLE[13] === "1"){
        [decoded_PUCCH_Config["spatialRelationInfoToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_PUCCH_SpatialRelationInfoId);
    }
    if(PUCCH_Config_SEQ_PREAMBLE[14] === "1") [decoded_PUCCH_Config["pucch-PowerControl"],offset] = decode_PUCCH_PowerControl(payload,offset)

    if(PUCCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUCCH_Config,offset];
}

function decode_P0_PUCCH(payload,offset){
    let decoded_P0_PUCCH = {};

    [decoded_P0_PUCCH["p0-PUCCH-Id"],offset] = decode_P0_PUCCH_Id(payload,offset);
    [decoded_P0_PUCCH["p0-PUCCH-Value"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);

    return [decoded_P0_PUCCH,offset];
}

function decode_PUCCH_PowerControl(payload,offset){
    let PUCCH_PowerControl_EXT_FLAG,PUCCH_PowerControl_SEQ_PREAMBLE,decoded_PUCCH_PowerControl = {};

    [PUCCH_PowerControl_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUCCH_PowerControl_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

    if(PUCCH_PowerControl_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_PowerControl["deltaF-PUCCH-f0"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(PUCCH_PowerControl_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_PowerControl["deltaF-PUCCH-f1"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(PUCCH_PowerControl_SEQ_PREAMBLE[2] === "1") [decoded_PUCCH_PowerControl["deltaF-PUCCH-f2"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(PUCCH_PowerControl_SEQ_PREAMBLE[3] === "1") [decoded_PUCCH_PowerControl["deltaF-PUCCH-f3"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(PUCCH_PowerControl_SEQ_PREAMBLE[4] === "1") [decoded_PUCCH_PowerControl["deltaF-PUCCH-f4"],offset] = parse_ASN_INTEGER(payload,offset,-16,15);
    if(PUCCH_PowerControl_SEQ_PREAMBLE[5] === "1"){
        [decoded_PUCCH_PowerControl["p0-Set"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_P0_PUCCH);
    }
    if(PUCCH_PowerControl_SEQ_PREAMBLE[6] === "1"){
        [decoded_PUCCH_PowerControl["pathlossReferenceRSs"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_PUCCH_PathlossReferenceRS);
    }
    if(PUCCH_PowerControl_SEQ_PREAMBLE[7] === "1"){
        [decoded_PUCCH_PowerControl["twoPUCCH-PC-AdjustmentStates"],offset] = parse_ASN_ENUMERATED(payload,offset,["twoStates"]);
    }

    if(PUCCH_PowerControl_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUCCH_PowerControl,offset];
}

function decode_PUCCH_PathlossReferenceRS(payload,offset){
    let decoded_PUCCH_PathlossReferenceRS = {};

    [decoded_PUCCH_PathlossReferenceRS["decoded_PUCCH_PathlossReferenceRS"],offset] = decode_PUCCH_PathlossReferenceRS_Id(payload,offset);
    [decoded_PUCCH_PathlossReferenceRS["referenceSignal"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index" : decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId}
    ]);

    return [decoded_PUCCH_PathlossReferenceRS,offset]
}

function decode_PUCCH_SRS(payload,offset){
    let decoded_PUCCH_SRS = {};

    [decoded_PUCCH_SRS["resource"],offset] = decode_SRS_ResourceId(payload,offset);
    [decoded_PUCCH_SRS["uplinkBWP"],offset] = decode_BWP_Id(payload,offset);

    return [decoded_PUCCH_SRS,offset];
}

function decode_PUCCH_SpatialRelationInfo(payload,offset){
    let PUCCH_SpatialRelationInfo_SEQ_PREAMBLE,decoded_PUCCH_SpatialRelationInfo = {};

    [PUCCH_SpatialRelationInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_PUCCH_SpatialRelationInfo["pucch-SpatialRelationInfoId"],offset] = decode_PUCCH_SpatialRelationInfoId(payload,offset);
    if(PUCCH_SpatialRelationInfo_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_SpatialRelationInfo["servingCellId"],offset] = decode_ServCellIndex(payload,offset);
    [decoded_PUCCH_SpatialRelationInfo["referenceSignal"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index" : decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId},
        {"srs" : decode_PUCCH_SRS}
    ]);
    [decoded_PUCCH_SpatialRelationInfo["pucch-PathlossReferenceRS-Id"],offset] = decode_PUCCH_PathlossReferenceRS_Id(payload,offset);
    [decoded_PUCCH_SpatialRelationInfo["p0-PUCCH-Id"],offset] = decode_P0_PUCCH_Id(payload,offset);
    [decoded_PUCCH_SpatialRelationInfo["closedLoopIndex"],offset] = parse_ASN_ENUMERATED(payload,offset,["i0", "i1"]);

    return [decoded_PUCCH_SpatialRelationInfo,offset];
}

function decode_SchedulingRequestResourceConfig(payload,offset){
    let SchedulingRequestResourceConfig_SEQ_PREAMBLE,decoded_SchedulingRequestResourceConfig = {};

    [SchedulingRequestResourceConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
    
    [decoded_SchedulingRequestResourceConfig["schedulingRequestResourceId"],offset] = decode_SchedulingRequestResourceId(payload,offset);
    [decoded_SchedulingRequestResourceConfig["schedulingRequestID"],offset] = decode_SchedulingRequestId(payload,offset);

    if(SchedulingRequestResourceConfig_SEQ_PREAMBLE[0] === "1"){
        [decoded_SchedulingRequestResourceConfig["periodicityAndOffset"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"sym2" : parse_ASN_NULL},
            {"sym6or7" : parse_ASN_NULL},
            {"sl1" : parse_ASN_NULL},
            {"sl2" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1)}},
            {"sl4" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,3)}},
            {"sl5" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4)}},
            {"sl8" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,7)}},
            {"sl10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9)}},
            {"sl16" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15)}},
            {"sl20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19)}},
            {"sl40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39)}},
            {"sl80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79)}},
            {"sl160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159)}},
            {"sl320" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,319)}},
            {"sl640" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,639)}},
        ]);
    }
    if(SchedulingRequestResourceConfig_SEQ_PREAMBLE[1] === "1") [decoded_SchedulingRequestResourceConfig["resource"],offset] = decode_PUCCH_ResourceId(payload,offset);

    return [decoded_SchedulingRequestResourceConfig,offset]
}

function decode_PUCCH_MaxCodeRate(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["zeroDot08", "zeroDot15", "zeroDot25", "zeroDot35", "zeroDot45", "zeroDot60", "zeroDot80"]);
}

function decode_PUCCH_FormatConfig(payload,offset){
    let PUCCH_FormatConfig_SEQ_PREAMBLE,decoded_PUCCH_FormatConfig = {};

    [PUCCH_FormatConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

    if(PUCCH_FormatConfig_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_FormatConfig["interslotFrequencyHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(PUCCH_FormatConfig_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_FormatConfig["additionalDMRS"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(PUCCH_FormatConfig_SEQ_PREAMBLE[2] === "1") [decoded_PUCCH_FormatConfig["maxCodeRate"],offset] = decode_PUCCH_MaxCodeRate(payload,offset)
    if(PUCCH_FormatConfig_SEQ_PREAMBLE[3] === "1") [decoded_PUCCH_FormatConfig["nrofSlots"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2","n4","n8"]);
    if(PUCCH_FormatConfig_SEQ_PREAMBLE[4] === "1") [decoded_PUCCH_FormatConfig["pi2BPSK"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(PUCCH_FormatConfig_SEQ_PREAMBLE[5] === "1") [decoded_PUCCH_FormatConfig["simultaneousHARQ-ACK-CSI"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);

    return [decoded_PUCCH_FormatConfig,offset];
}

function decode_PUCCH_Resource(payload,offset){
    let PUCCH_Resource_SEQ_PREAMBLE,decoded_PUCCH_Resource = {};
    
    [PUCCH_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_PUCCH_Resource["pucch-ResourceId"],offset] = decode_PUCCH_ResourceId(payload,offset);
    [decoded_PUCCH_Resource["startingPRB"],offset] = decode_PRB_Id(payload,offset);
    if(PUCCH_Resource_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_Resource["intraSlotFrequencyHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(PUCCH_Resource_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_Resource["secondHopPRB"],offset] = decode_PRB_Id(payload,offset);
    [decoded_PUCCH_Resource["format"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"format0" : decode_PUCCH_format0},
        {"format1" : decode_PUCCH_format1},
        {"format2" : decode_PUCCH_format2},
        {"format3" : decode_PUCCH_format3},
        {"format4" : decode_PUCCH_format4}
    ]);

    return [decoded_PUCCH_Resource,offset];
}

function decode_PUCCH_format0(payload,offset){
    let decoded_PUCCH_format0 = {};
    [decoded_PUCCH_format0["initialCyclicShift"],offset] = parse_ASN_INTEGER(payload,offset,0,11);
    [decoded_PUCCH_format0["nrofSymbols"],offset] = parse_ASN_INTEGER(payload,offset,1,2);
    [decoded_PUCCH_format0["startingSymbolIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,13);

    return [decoded_PUCCH_format0,offset];
}

function decode_PUCCH_format1(payload,offset){
    let decoded_PUCCH_format1 = {};
    [decoded_PUCCH_format1["initialCyclicShift"],offset] = parse_ASN_INTEGER(payload,offset,0,11);
    [decoded_PUCCH_format1["nrofSymbols"],offset] = parse_ASN_INTEGER(payload,offset,4,14);
    [decoded_PUCCH_format1["startingSymbolIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,10);
    [decoded_PUCCH_format1["timeDomainOCC"],offset] = parse_ASN_INTEGER(payload,offset,0,6);
    return [decoded_PUCCH_format1,offset];
}

function decode_PUCCH_format2(payload,offset){
    let decoded_PUCCH_format2 = {};
    [decoded_PUCCH_format2["nrofPRBs"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    [decoded_PUCCH_format2["nrofSymbols"],offset] = parse_ASN_INTEGER(payload,offset,1,2);
    [decoded_PUCCH_format2["startingSymbolIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,13);
    return [decoded_PUCCH_format2,offset];
}

function decode_PUCCH_format3(payload,offset){
    let decoded_PUCCH_format3 = {};
    [decoded_PUCCH_format3["nrofPRBs"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    [decoded_PUCCH_format3["nrofSymbols"],offset] = parse_ASN_INTEGER(payload,offset,4,14);
    [decoded_PUCCH_format3["startingSymbolIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,10);
    return [decoded_PUCCH_format3,offset];
}

function decode_PUCCH_format4(payload,offset){
    let decoded_PUCCH_format4 = {};
    [decoded_PUCCH_format4["nrofSymbols"],offset] = parse_ASN_INTEGER(payload,offset,4,14);
    [decoded_PUCCH_format4["occ-Length"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2","n4"]);
    [decoded_PUCCH_format4["occ-Index"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0","n1","n2","n3"]);
    [decoded_PUCCH_format4["startingSymbolIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,10);
    return [decoded_PUCCH_format4,offset];
}

function decode_PUCCH_ResourceSet(payload,offset){
    let PUCCH_ResourceSet_SEQ_PREAMBLE,decoded_PUCCH_ResourceSet = {};
    [PUCCH_ResourceSet_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_PUCCH_ResourceSet["pucch-ResourceSetId"],offset] = decode_PUCCH_ResourceSetId(payload,offset);
    [decoded_PUCCH_ResourceSet["resourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_PUCCH_ResourceId);   
    if(PUCCH_ResourceSet_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_ResourceSet["maxPayloadSize"],offset] = parse_ASN_INTEGER(payload,offset,4,256);

    return [decoded_PUCCH_ResourceSet,offset];
}

function decode_BWP_DownlinkDedicated(payload,offset){
    let BWP_DownlinkDedicated_SEQ_PREAMBLE,BWP_DownlinkDedicated_EXT_FLAG,decoded_BWP_DownlinkDedicated = {};

    [BWP_DownlinkDedicated_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_DownlinkDedicated_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(BWP_DownlinkDedicated_SEQ_PREAMBLE[0] === "1") [decoded_BWP_DownlinkDedicated["pdcch-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_PDCCH_Config);
    if(BWP_DownlinkDedicated_SEQ_PREAMBLE[1] === "1") [decoded_BWP_DownlinkDedicated["pdsch-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_PDSCH_Config);
    if(BWP_DownlinkDedicated_SEQ_PREAMBLE[2] === "1") [decoded_BWP_DownlinkDedicated["sps-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_SPS_Config);
    if(BWP_DownlinkDedicated_SEQ_PREAMBLE[3] === "1") [decoded_BWP_DownlinkDedicated["radioLinkMonitoringConfig"],offset] = parse_ASN_SETREL(payload,offset,decode_RadioLinkMonitoringConfig)

    if(BWP_DownlinkDedicated_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BWP_DownlinkDedicated,offset];
}

function decode_RadioLinkMonitoringRS(payload,offset){
    let RadioLinkMonitoringRS_EXT_FLAG, decoded_RadioLinkMonitoringRS = {};

    [RadioLinkMonitoringRS_EXT_FLAG,offset] = parseStringBitsToVal(payload,offset,1);

    [decoded_RadioLinkMonitoringRS["radioLinkMonitoringRS-Id"],offset] = decode_RadioLinkMonitoringRS_Id(payload,offset);
    [decoded_RadioLinkMonitoringRS["purpose"],offset] = parse_ASN_ENUMERATED(payload,offset,["beamFailure", "rlf", "both"]);
    [decoded_RadioLinkMonitoringRS["detectionResource"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb-Index" : decode_SSB_Index},
        {"csi-RS-Index" : decode_NZP_CSI_RS_ResourceId}
    ]);

    if(RadioLinkMonitoringRS_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RadioLinkMonitoringRS,offset];
}

function decode_RadioLinkMonitoringConfig(payload,offset){
    let RadioLinkMonitoringConfig_SEQ_PREAMBLE,RadioLinkMonitoringConfig_EXT_FLAG,decoded_RadioLinkMonitoringConfig = {};

    [RadioLinkMonitoringConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RadioLinkMonitoringConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(RadioLinkMonitoringConfig_SEQ_PREAMBLE[0] === "1"){
        [decoded_RadioLinkMonitoringConfig["failureDetectionResourcesToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,10,decode_RadioLinkMonitoringRS);
    }
    if(RadioLinkMonitoringConfig_SEQ_PREAMBLE[1] === "1"){
        [decoded_RadioLinkMonitoringConfig["failureDetectionResourcesToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,10,decode_RadioLinkMonitoringRS_Id);
    }
    if(RadioLinkMonitoringConfig_SEQ_PREAMBLE[2] === "1"){
        [decoded_RadioLinkMonitoringConfig["beamFailureInstanceMaxCount"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4", "n5", "n6", "n8", "n10"]);
    }
    if(RadioLinkMonitoringConfig_SEQ_PREAMBLE[3] === "1"){
        [decoded_RadioLinkMonitoringConfig["beamFailureDetectionTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["pbfd1", "pbfd2", "pbfd3", "pbfd4", "pbfd5", "pbfd6", "pbfd8", "pbfd10"]);
    }

    if(RadioLinkMonitoringConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RadioLinkMonitoringConfig,offset];
}

function decode_SPS_Config(payload,offset){
    let SPS_Config_SEQ_PREAMBLE,SPS_Config_EXT_FLAG,decoded_SPS_Config = {};

    [SPS_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SPS_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SPS_Config["periodicity"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms10", "ms20", "ms32", "ms40", "ms64", "ms80", "ms128", "ms160", "ms320", "ms640", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
    [decoded_SPS_Config["nrofHARQ-Processes"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(SPS_Config_SEQ_PREAMBLE[0] === "1") [decoded_SPS_Config["n1PUCCH-AN"],offset] = decode_PUCCH_ResourceId(payload,offset);
    if(SPS_Config_SEQ_PREAMBLE[1] === "1") [decoded_SPS_Config["mcs-Table"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam64LowSE"]);

    if(SPS_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SPS_Config,offset];
}

function decode_ZP_CSI_RS_Resource(payload,offset){        
    let ZP_CSI_RS_Resource_SEQ_PREAMBLE,ZP_CSI_RS_Resource_EXT_FLAG,decoded_ZP_CSI_RS_Resource = {};

    [ZP_CSI_RS_Resource_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ZP_CSI_RS_Resource_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_ZP_CSI_RS_Resource["zp-CSI-RS-ResourceId"],offset] = decode_ZP_CSI_RS_ResourceId(payload,offset);
    [decoded_ZP_CSI_RS_Resource["resourceMapping"],offset] = decode_CSI_RS_ResourceMapping(payload,offset);
    if(ZP_CSI_RS_Resource_SEQ_PREAMBLE[0] === "1") [decoded_ZP_CSI_RS_Resource["periodicityAndOffset"],offset] = decode_CSI_ResourcePeriodicityAndOffset(payload,offset);
               
    if(ZP_CSI_RS_Resource_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ZP_CSI_RS_Resource,offset];    
}

function decode_PDSCH_Config(payload,offset){
    let PDSCH_Config_EXT_FLAG,PDSCH_Config_SEQ_PREAMBLE,decoded_PDSCH_Config = {};

    [PDSCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDSCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,21);

    if(PDSCH_Config_SEQ_PREAMBLE[0] === "1") [decoded_PDSCH_Config["dataScramblingIdentityPDSCH"],offset] = parse_ASN_INTEGER(payload,offset,0,1023);
    if(PDSCH_Config_SEQ_PREAMBLE[1] === "1"){
        [decoded_PDSCH_Config["dmrs-DownlinkForPDSCH_MappingTypeA"],offset] = parse_ASN_SETREL(payload,offset,decode_DMRS_DownlinkConfig);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[2] === "1"){
        [decoded_PDSCH_Config["dmrs-DownlinkForPDSCH_MappingTypeB"],offset] = parse_ASN_SETREL(payload,offset,decode_DMRS_DownlinkConfig);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[3] === "1"){
        [decoded_PDSCH_Config["tci-StatesToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_TCI_State);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[4] === "1"){
        [decoded_PDSCH_Config["tci-StatesToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,128,decode_TCI_StateId);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[5] === "1") [decoded_PDSCH_Config["vrb-ToPRB-Interleaver"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4"]);
    [decoded_PDSCH_Config["resourceAllocation"],offset] = parse_ASN_ENUMERATED(payload,offset,["resourceAllocationType0", "resourceAllocationType1", "dynamicSwitch"]);
    if(PDSCH_Config_SEQ_PREAMBLE[6] === "1"){
        [decoded_PDSCH_Config["pdsch-TimeDomainAllocationList"],offset] = parse_ASN_SETREL(payload,offset,decode_PDSCH_TimeDomainResourceAllocationList);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[7] === "1"){
        [decoded_PDSCH_Config["pdsch-AggregationFactor"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4", "n8"]);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[8] === "1"){
        [decoded_PDSCH_Config["rateMatchPatternToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_RateMatchPattern);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[9] === "1"){
        [decoded_PDSCH_Config["rateMatchPatternToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_RateMatchPatternId);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[10] === "1"){
        [decoded_PDSCH_Config["rateMatchPatternGroup1"],offset] = decode_RateMatchPatternGroup(payload,offset);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[11] === "1"){
        [decoded_PDSCH_Config["rateMatchPatternGroup2"],offset] = decode_RateMatchPatternGroup(payload,offset);
    }
    [decoded_PDSCH_Config["rbg-Size"],offset] = parse_ASN_ENUMERATED(payload,offset,["config1", "config2"]);
    if(PDSCH_Config_SEQ_PREAMBLE[12] === "1") [decoded_PDSCH_Config["mcs-Table"],offset] = parse_ASN_ENUMERATED(payload,offset,["qam256", "qam64LowSE"]);
    if(PDSCH_Config_SEQ_PREAMBLE[13] === "1") [decoded_PDSCH_Config["maxNrofCodeWordsScheduledByDCI"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2"]);

    function decode_staticBundling(payload,offset){
        let staticBundling_SEQ_PREAMBLE,decoded_staticBundling = {};
        [staticBundling_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
        if(staticBundling_SEQ_PREAMBLE) [decoded_staticBundling["bundleSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "wideband"]);
        return [decoded_staticBundling,offset];
    }
    function decode_dynamicBundling(payload,offset){
        let dynamicBundling_SEQ_PREAMBLE,decoded_dynamicBundling = {};
        [dynamicBundling_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
        if(dynamicBundling_SEQ_PREAMBLE[0] === "1") [decoded_dynamicBundling["bundleSizeSet1"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "wideband", "n2-wideband", "n4-wideband"]);
        if(dynamicBundling_SEQ_PREAMBLE[1] === "1") [decoded_dynamicBundling["bundleSizeSet2"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "wideband"]);
    }

    [decoded_PDSCH_Config["prb-BundlingType"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"staticBundling" : decode_staticBundling},
        {"dynamicBundling" : decode_dynamicBundling}
    ]);

    if(PDSCH_Config_SEQ_PREAMBLE[14] === "1"){
        [decoded_PDSCH_Config["zp-CSI-RS-ResourceToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_ZP_CSI_RS_Resource);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[15] === "1"){
        [decoded_PDSCH_Config["zp-CSI-RS-ResourceToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_ZP_CSI_RS_ResourceId);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[16] === "1"){
        [decoded_PDSCH_Config["aperiodic-ZP-CSI-RS-ResourceSetsToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ZP_CSI_RS_ResourceSet);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[17] === "1"){
        [decoded_PDSCH_Config["aperiodic-ZP-CSI-RS-ResourceSetsToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ZP_CSI_RS_ResourceSetId);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[18] === "1"){
        [decoded_PDSCH_Config["sp-ZP-CSI-RS-ResourceSetsToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ZP_CSI_RS_ResourceSet);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[19] === "1"){
        [decoded_PDSCH_Config["sp-ZP-CSI-RS-ResourceSetsToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ZP_CSI_RS_ResourceSetId);
    }
    if(PDSCH_Config_SEQ_PREAMBLE[20] === "1"){
        [decoded_PDSCH_Config["p-ZP-CSI-RS-ResourceSet"],offset] = parse_ASN_SETREL(payload,offset,decode_ZP_CSI_RS_ResourceSet);
    }

    if(PDSCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDSCH_Config,offset];
}

function decode_ZP_CSI_RS_ResourceSet(payload,offset){
    let ZP_CSI_RS_ResourceSet_EXT_FLAG,decoded_ZP_CSI_RS_ResourceSet = {};
    [ZP_CSI_RS_ResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_ZP_CSI_RS_ResourceSet["zp-CSI-RS-ResourceSetId"],offset] = decode_ZP_CSI_RS_ResourceSetId(payload,offset);
    [decoded_ZP_CSI_RS_ResourceSet["zp-CSI-RS-ResourceIdList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_ZP_CSI_RS_ResourceId);

    if(ZP_CSI_RS_ResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ZP_CSI_RS_ResourceSet,offset];
}

function decode_CSI_ResourcePeriodicityAndOffset(payload,offset){
    return parse_ASN_CHOICE(payload,offset,[
        {"slots4" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,3);}},
        {"slots5" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4);}},
        {"slots8" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,7);}},
        {"slots10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9);}},
        {"slots16" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,15);}},
        {"slots20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19);}},
        {"slots32" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,31);}},
        {"slots40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39);}},
        {"slots64" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,63);}},
        {"slots80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79);}},
        {"slots160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159);}},
        {"slots320" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,319);}},
        {"slots640" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,639);}},
    ]);
}

function decode_CSI_RS_ResourceMapping(payload,offset){
    let CSI_RS_ResourceMapping_SEQ_PREAMBLE,CSI_RS_ResourceMapping_EXT_FLAG,decoded_CSI_RS_ResourceMapping = {};

    [CSI_RS_ResourceMapping_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CSI_RS_ResourceMapping_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_CSI_RS_ResourceMapping["frequencyDomainAllocation"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"row1" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,4,4);}},
        {"row2" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,12,12);}},
        {"row4" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,3,3);}},
        {"other" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,6,6);}}
    ]);

    [decoded_CSI_RS_ResourceMapping["nrofPorts"],offset] = parse_ASN_ENUMERATED(payload,offset,["p1","p2","p4","p8","p12","p16","p24","p32"]);
    [decoded_CSI_RS_ResourceMapping["firstOFDMSymbolInTimeDomain"],offset] = parse_ASN_INTEGER(payload,offset,0,13);    
    if(CSI_RS_ResourceMapping_SEQ_PREAMBLE[0] === "1") [decoded_CSI_RS_ResourceMapping["firstOFDMSymbolInTimeDomain2"],offset] = parse_ASN_INTEGER(payload,offset,2,14);
    [decoded_CSI_RS_ResourceMapping["cdm-Type"],offset] = parse_ASN_ENUMERATED(payload,offset,["noCDM", "fd-CDM2", "cdm4-FD2-TD2", "cdm8-FD2-TD4"]);

    [decoded_CSI_RS_ResourceMapping["density"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"dot5" : (payload,offset)=>{return parse_ASN_ENUMERATED(payload,offset,["evenPRBs", "oddPRBs"])}},
        {"one" : parse_ASN_NULL},
        {"three" : parse_ASN_NULL},
        {"spare" : parse_ASN_NULL},
    ]);

    [decoded_CSI_RS_ResourceMapping["freqBand"],offset] = decode_CSI_FrequencyOccupation(payload,offset);

    if(CSI_RS_ResourceMapping_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CSI_RS_ResourceMapping,offset];
}

function decode_RateMatchPatternGroup(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,parse_ASN_CHOICE(payload,offset,[
        {"cellLevel" : decode_RateMatchPatternId},
        {"bwpLevel" : decode_RateMatchPatternId},
    ]));
}

function decode_TCI_State(payload,offset){
    let TCI_State_SEQ_PREAMBLE,TCI_State_EXT_FLAG,decoded_TCI_State = {};

    [TCI_State_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [TCI_State_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_TCI_State["tci-StateId"],offset] = decode_TCI_StateId(payload,offset);
    [decoded_TCI_State["qcl-Type1"],offset] = decode_QCL_Info(payload,offset);    
    if(TCI_State_SEQ_PREAMBLE[0] === "1") [decoded_TCI_State["qcl-Typ2"],offset] = decode_QCL_Info(payload,offset);
    
    if(TCI_State_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_TCI_State,offset];
}

function decode_QCL_Info(payload,offset){
    let QCL_Info_EXT_FLAG,QCL_Info_SEQ_PREAMBLE,decoded_QCL_Info = {};

    [QCL_Info_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [QCL_Info_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(QCL_Info_SEQ_PREAMBLE[0] === "1") [decoded_QCL_Info["cell"],offset] = decode_ServCellIndex(payload,offset);
    if(QCL_Info_SEQ_PREAMBLE[1] === "1") [decoded_QCL_Info["bwp-Id"],offset] = decode_BWP_Id(payload,offset);

    [decoded_QCL_Info["referenceSignal"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"csi-rs" : decode_NZP_CSI_RS_ResourceId},
        {"ssb" : decode_SSB_Index}
    ]);

    [decoded_QCL_Info["qcl-Type"],offset] = parse_ASN_ENUMERATED(payload,offset,["typeA", "typeB", "typeC", "typeD"]);

    if(QCL_Info_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_QCL_Info,offset];
}

function decode_DMRS_DownlinkConfig(payload,offset){
    let DMRS_DownlinkConfig_EXT_FLAG,DMRS_DownlinkConfig_SEQ_PREAMBLE,decoded_DMRS_DownlinkConfig = {};

    [DMRS_DownlinkConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [DMRS_DownlinkConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[0] === "1") [decoded_DMRS_DownlinkConfig["dmrs-Type"],offset] = parse_ASN_ENUMERATED(payload,offset,["type2"]);
    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[1] === "1") [decoded_DMRS_DownlinkConfig["dmrs-AdditionalPosition"],offset] = parse_ASN_ENUMERATED(payload,offset,["pos0", "pos1", "pos3"]);
    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[2] === "1") [decoded_DMRS_DownlinkConfig["maxLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["len2"]);
    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[3] === "1") [decoded_DMRS_DownlinkConfig["scramblingID0"],offset] = parse_ASN_INTEGER(payload,offset,0,65535);
    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[4] === "1") [decoded_DMRS_DownlinkConfig["scramblingID1"],offset] = parse_ASN_INTEGER(payload,offset,0,65535);
    if(DMRS_DownlinkConfig_SEQ_PREAMBLE[5] === "1") [decoded_DMRS_DownlinkConfig["phaseTrackingRS"],offset] = parse_ASN_SETREL(payload,offset,decode_PTRS_DownlinkConfig);

    if(DMRS_DownlinkConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DMRS_DownlinkConfig,offset];
}

function decode_PTRS_DownlinkConfig(payload,offset){
    let PTRS_DownlinkConfig_EXT_FLAG,PTRS_DownlinkConfig_SEQ_PREAMBLE,decoded_PTRS_DownlinkConfig = {};

    [PTRS_DownlinkConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PTRS_DownlinkConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(PTRS_DownlinkConfig_SEQ_PREAMBLE[0] === "1"){
        [decoded_PTRS_DownlinkConfig["frequencyDensity"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,2,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,1,276);});
    }
    if(PTRS_DownlinkConfig_SEQ_PREAMBLE[1] === "1"){
        [decoded_PTRS_DownlinkConfig["timeDensity"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,3,3,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,29);});
    }
    if(PTRS_DownlinkConfig_SEQ_PREAMBLE[2] === "1"){
        [decoded_PTRS_DownlinkConfig["epre-Ratio"],offset] = parse_ASN_INTEGER(payload,offset,0,3);
    }
    if(PTRS_DownlinkConfig_SEQ_PREAMBLE[3] === "1"){
        [decoded_PTRS_DownlinkConfig["resourceElementOffset"],offset] = parse_ASN_ENUMERATED(payload,offset,["offset01", "offset10", "offset11"]);
    }

    if(PTRS_DownlinkConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PTRS_DownlinkConfig,offset];
}

function decode_PDCCH_Config(payload,offset){
    let PDCCH_Config_SEQ_PREAMBLE,PDCCH_Config_EXT_FLAG,decoded_PDCCH_Config = {};

    [PDCCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDCCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

    if(PDCCH_Config_SEQ_PREAMBLE[0] === "1"){
        [decoded_PDCCH_Config["controlResourceSetToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,3,decode_ControlResourceSet);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[1] === "1"){
        [decoded_PDCCH_Config["controlResourceSetToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,3,decode_ControlResourceSetId);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[2] === "1"){
        [decoded_PDCCH_Config["searchSpacesToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,10,decode_SearchSpace);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[3] === "1"){
        [decoded_PDCCH_Config["searchSpacesToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,10,decode_SearchSpaceId);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[4] === "1"){
        [decoded_PDCCH_Config["downlinkPreemption"],offset] = parse_ASN_SETREL(payload,offset,decode_DownlinkPreemption);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[5] === "1"){
        [decoded_PDCCH_Config["tpc-PUSCH"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_TPC_CommandConfig);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[6] === "1"){
        [decoded_PDCCH_Config["tpc-PUCCH"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_TPC_CommandConfig);
    }
    if(PDCCH_Config_SEQ_PREAMBLE[7] === "1"){
        [decoded_PDCCH_Config["tpc-SRS"],offset] = parse_ASN_SETREL(payload,offset,decode_SRS_TPC_CommandConfig);
    }

    if(PDCCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDCCH_Config,offset];
}

function decode_SRS_TPC_CommandConfig(payload,offset){
    let SRS_TPC_CommandConfig_SEQ_PREAMBLE,SRS_TPC_CommandConfig_EXT_FLAG,decoded_SRS_TPC_CommandConfig = {};
    
    [SRS_TPC_CommandConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SRS_TPC_CommandConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(SRS_TPC_CommandConfig_SEQ_PREAMBLE[0] === "1") [decoded_SRS_TPC_CommandConfig["startingBitOfFormat2-3"],offset] = parse_ASN_INTEGER(payload,offset,1,31);
    if(SRS_TPC_CommandConfig_SEQ_PREAMBLE[1] === "1") [decoded_SRS_TPC_CommandConfig["fieldTypeFormat2-3"],offset] = parse_ASN_INTEGER(payload,offset,0,1);
    
    if(SRS_TPC_CommandConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SRS_TPC_CommandConfig,offset]
}

function decode_PUCCH_TPC_CommandConfig(payload,offset){
    let PUCCH_TPC_CommandConfig_SEQ_PREAMBLE,PUCCH_TPC_CommandConfig_EXT_FLAG,decoded_PUCCH_TPC_CommandConfig = {};

    [PUCCH_TPC_CommandConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUCCH_TPC_CommandConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(PUCCH_TPC_CommandConfig_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_TPC_CommandConfig["tpc-IndexPCell"],offset] = parse_ASN_INTEGER(payload,offset,1,15);
    if(PUCCH_TPC_CommandConfig_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_TPC_CommandConfig["tpc-IndexPUCCH-SCell"],offset] = parse_ASN_INTEGER(payload,offset,1,15);

    if(PUCCH_TPC_CommandConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUCCH_TPC_CommandConfig,offset];
}

function decode_PUSCH_TPC_CommandConfig(payload,offset){
    let PUSCH_TPC_CommandConfig_EXT_FLAG,PUSCH_TPC_CommandConfig_SEQ_PREAMBLE,decoded_PUSCH_TPC_CommandConfig;

    [PUSCH_TPC_CommandConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUSCH_TPC_CommandConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(PUSCH_TPC_CommandConfig_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_TPC_CommandConfig["tpc-Index"],offset] = parse_ASN_INTEGER(payload,offset);
    if(PUSCH_TPC_CommandConfig_SEQ_PREAMBLE[1] === "1") [decoded_PUSCH_TPC_CommandConfig["tpc-IndexSUL"],offset] = parse_ASN_INTEGER(payload,offset);
    if(PUSCH_TPC_CommandConfig_SEQ_PREAMBLE[2] === "1") [decoded_PUSCH_TPC_CommandConfig,offset] = decode_ServCellIndex(payload,offset);

    if(PUSCH_TPC_CommandConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUSCH_TPC_CommandConfig,offset];
}

function decode_INT_ConfigurationPerServingCell(payload,offset){
    let decoded_INT_ConfigurationPerServingCell = {};
    [decoded_INT_ConfigurationPerServingCell["servingCellId"],offset] = decode_ServCellIndex(payload,offset);
    [decoded_INT_ConfigurationPerServingCell["positionInDCI"],offset] = parse_ASN_INTEGER(payload,offset,0,125);
    return [decoded_INT_ConfigurationPerServingCell,offset];
}

function decode_DownlinkPreemption(payload,offset){
    let DownlinkPreemption_EXT_FLAG,decoded_DownlinkPreemption = {};

    [DownlinkPreemption_EXT_FLAG,offset] = parseStringBitsToVal(payload,offset,1);

    [decoded_DownlinkPreemption["int-RNTI"],offset] = decode_RNTI_Value(payload,offset);
    [decoded_DownlinkPreemption["timeFrequencySet"],offset] = parse_ASN_ENUMERATED(payload,offset,["set0", "set1"]);
    [decoded_DownlinkPreemption["dci-PayloadSize"],offset] = parse_ASN_INTEGER(payload,offset,0,126);
    [decoded_DownlinkPreemption["int-ConfigurationPerServingCell"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_INT_ConfigurationPerServingCell);

    if(DownlinkPreemption_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DownlinkPreemption,offset];
}

function decode_TDD_UL_DL_SlotIndex(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,329);
}

function decode_TDD_UL_DL_SlotConfig(payload,offset){
    let decoded_TDD_UL_DL_SlotConfig = {};

    [decoded_TDD_UL_DL_SlotConfig["slotIndex"],offset] = decode_TDD_UL_DL_SlotIndex(payload,offset);
    
    function decode_explicit(payload,offset){
        let explicit_SEQ_PREAMBLE,decoded_explicit = {};
        [explicit_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
        if(explicit_SEQ_PREAMBLE[0] === "1") [decoded_explicit["nrofDownlinkSymbols"],offset] = parse_ASN_INTEGER(payload,offset,1,13);
        if(explicit_SEQ_PREAMBLE[1] === "1") [decoded_explicit["nrofUplinkSymbols"],offset] = parse_ASN_INTEGER(payload,offset,0,13);
        return [decoded_explicit,offset]
    }
    [decoded_TDD_UL_DL_SlotConfig["symbols"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"allDownlink" : parse_ASN_NULL},
        {"allUplink" : parse_ASN_NULL},
        {"explicit" : decode_explicit}
    ]);

    return [decoded_TDD_UL_DL_SlotConfig,offset];
}   

function decode_RLF_TimersAndConstants(payload,offset){
    let RLF_TimersAndConstant_EXT_FLAG,decoded_RLF_TimersAndConstant = {};

    [RLF_TimersAndConstant_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_RLF_TimersAndConstant["t310"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0", "ms50", "ms100", "ms200", "ms500", "ms1000", "ms2000", "ms4000", "ms6000"]);
    [decoded_RLF_TimersAndConstant["n310"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4", "n6", "n8", "n10", "n20"]);
    [decoded_RLF_TimersAndConstant["n311"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4", "n5", "n6", "n8", "n10"]);

    if(RLF_TimersAndConstant_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return[decoded_RLF_TimersAndConstant,offset];
}

function decode_CFRA_SSB_Resource(payload,offset){
    let decoded_CFRA_SSB_Resource = {};
    [decoded_CFRA_SSB_Resource["ssb"],offset] = decode_SSB_Index(payload,offset);
    [decoded_CFRA_SSB_Resource["ra-PreambleIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,63);

    return [decoded_CFRA_SSB_Resource,offset];
}

function decode_CSI_RS_Index(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,95);
}

function decode_CFRA_CSIRS_Resource(payload,offset){
    let decoded_CFRA_CSIRS_Resource = {};
    [decoded_CFRA_CSIRS_Resource["csi-RS"],offset] = decode_CSI_RS_Index(payload,offset);
    [decoded_CFRA_CSIRS_Resource["ra-OccasionList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,511)});
    [decoded_CFRA_CSIRS_Resource["ra-PreambleIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,63);
    return [decoded_CFRA_CSIRS_Resource,offset];
}

function decode_CFRA(payload,offset){
    let CFRA_SEQ_PREAMBLE,CFRA_EXT_FLAG,decoded_CFRA = {};

    [CFRA_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [CFRA_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(CFRA_SEQ_PREAMBLE[0] === "1"){
        let occasions_SEQ_PREAMBLE,decoded_occasions = {};
        
        [occasions_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

        [decoded_occasions["rach-ConfigGeneric"],offset] = decode_RACH_ConfigGeneric(payload,offset);
        if(occasions_SEQ_PREAMBLE[0] === "1"){
            [decoded_occasions["ssb-perRACH-Occasion"],offset] = parse_ASN_ENUMERATED(payload,offset,["oneEighth", "oneFourth", "oneHalf", "one", "two", "four", "eight", "sixteen"]);
        }
        
        decoded_CFRA["occasions"] = decoded_occasions;
    }

    function decode_ssb(payload,offset){
        let decoded_ssb = {};
        [decoded_ssb["ssb-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_CFRA_SSB_Resource);
        [decoded_ssb["ra-ssb-OccasionMaskIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
        return [decoded_ssb,offset];
    }
    function decode_csirs(payload,offset){
        let decoded_csirs = {};
        [decoded_csirs["csirs-ResourceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,96,decode_CFRA_CSIRS_Resource);
        [decoded_csirs["rsrp-ThresholdCSI-RS"],offset] = decode_RSRP_Range(payload,offset);
        return [decoded_csirs,offset];
    }
    [decoded_CFRA["resources"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ssb" : decode_ssb},
        {"csirs" : decode_csirs}
    ]);

    if(CFRA_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CFRA,offset];
}

function decode_RA_Prioritization(payload,offset){
    let RA_Prioritization_SEQ_PREAMBLE,decoded_RA_Prioritization = {};

    [RA_Prioritization_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_RA_Prioritization["powerRampingStepHighPriority"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB0", "dB2", "dB4", "dB6"]);
    if(RA_Prioritization_SEQ_PREAMBLE[0] === "1") [decoded_RA_Prioritization["scalingFactorBI"],offset] = parse_ASN_ENUMERATED(payload,offset,["zero", "dot25", "dot5", "dot75"]);
    
    return [decoded_RA_Prioritization,offset];
}

function decode_RACH_ConfigDedicated(payload,offset){
    let RACH_ConfigDedicated_SEQ_PREAMBLE,RACH_ConfigDedicated_EXT_FLAG,decoded_RACH_ConfigDedicated = {};

    [RACH_ConfigDedicated_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RACH_ConfigDedicated_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(RACH_ConfigDedicated_SEQ_PREAMBLE[0] === "1") [decoded_RACH_ConfigDedicated["cfra"],offset] = decode_CFRA(payload,offset);
    if(RACH_ConfigDedicated_SEQ_PREAMBLE[1] === "1") [decoded_RACH_ConfigDedicated["ra-Prioritization"],offset] = decode_RA_Prioritization(payload,offset);
    
    if(RACH_ConfigDedicated_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RACH_ConfigDedicated,offset];
}

function decode_ServingCellConfigCommon(payload,offset){
    let ServingCellConfigCommon_EXT_FLAG,ServingCellConfigCommon_SEQ_PREAMBLE,decoded_ServingCellConfigCommon = {};

    [ServingCellConfigCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ServingCellConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,12);

    if(ServingCellConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_ServingCellConfigCommon["physCellId"],offset] = parseStringBitsToVal(payload,offset,10);
    if(ServingCellConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_ServingCellConfigCommon["downlinkConfigCommon"],offset] = decode_DownlinkConfigCommon(payload,offset);
    if(ServingCellConfigCommon_SEQ_PREAMBLE[2] === "1") [decoded_ServingCellConfigCommon["uplinkConfigCommon"],offset] = decode_UplinkConfigCommon(payload,offset);
    if(ServingCellConfigCommon_SEQ_PREAMBLE[3] === "1") [decoded_ServingCellConfigCommon["supplementaryUplinkConfig"],offset] = decode_UplinkConfigCommon(payload,offset);
    if(ServingCellConfigCommon_SEQ_PREAMBLE[4] === "1"){
        [decoded_ServingCellConfigCommon["n-TimingAdvanceOffset"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n25600", "n39936"]);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[5] === "1"){
        [decoded_ServingCellConfigCommon["ssb-PositionsInBurst"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"shortBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,4,4);}},
            {"mediumBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
            {"longBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}},
        ]);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[6] === "1"){
        [decoded_ServingCellConfigCommon["ssb-periodicityServingCell"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms5", "ms10", "ms20", "ms40", "ms80", "ms160", "spare2", "spare1"]);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[7] === "1"){
        [decoded_ServingCellConfigCommon["dmrs-TypeA-Position"],offset] = parse_ASN_ENUMERATED(payload,offset,["pos2", "pos3"]);
    } 
    if(ServingCellConfigCommon_SEQ_PREAMBLE[8] === "1"){
        [decoded_ServingCellConfigCommon["rateMatchPatternLTE-CRS"],offset] = parse_ASN_SETREL(payload,offset,decode_RateMatchPatternLTE_CRS);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[9] === "1"){
        [decoded_ServingCellConfigCommon["rateMatchPatternToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_RateMatchPattern);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[10] === "1"){
        [decoded_ServingCellConfigCommon["rateMatchPatternToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_RateMatchPatternId);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[11] === "1"){
        [decoded_ServingCellConfigCommon["ssbSubcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    }
    if(ServingCellConfigCommon_SEQ_PREAMBLE[12] === "1"){
        [decoded_ServingCellConfigCommon["tdd-UL-DL-ConfigurationCommon"],offset] = decode_TDD_UL_DL_ConfigCommon(payload,offset);
    }
    
    [decoded_ServingCellConfigCommon["ss-PBCH-BlockPower"],offset] = parse_ASN_INTEGER(payload,offset,-60,50);

    if(ServingCellConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ServingCellConfigCommon,offset]
}

function decode_RateMatchPattern(payload,offset){
    let RateMatchPattern_SEQ_PREAMBLE,RateMatchPattern_EXT_FLAG,decoded_RateMatchPattern = {};

    [RateMatchPattern_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RateMatchPattern_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_RateMatchPattern["rateMatchPatternId"],offset] = decode_RateMatchPatternId(payload,offset);

    function decode_bitmaps(payload,offset){
        let bitmaps_SEQ_PREAMBLE,decoded_bitmaps = {};

        [bitmaps_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [bitmaps_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

        [decoded_bitmaps["resourceBlocks"],offset] = parse_ASN_BITSTRING(payload,offset,275,275);
        [decoded_bitmaps["symbolsInResourceBlock"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"oneSlot" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,14,14);}},
            {"twoSlot" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,28,28);}},
        ]);
        if(bitmaps_SEQ_PREAMBLE[0] === "1"){
            [decoded_bitmaps["periodicityAndPattern"],offset] = parse_ASN_CHOICE(payload,offset,[
                {"n2" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,2,2)}},
                {"n4" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,4,4)}},
                {"n5" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,5,5)}},
                {"n8" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8)}},
                {"n10" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,10,10)}},
                {"n20" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,20,20)}},
                {"n40" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,40,40)}},
            ]);
        }
        
        return [decoded_bitmaps,offset];
    }
    [decoded_RateMatchPattern["patternType"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"bitmaps" : decode_bitmaps},
        {"controlResourceSet" : decode_ControlResourceSetId}
    ]);

    if(RateMatchPattern_SEQ_PREAMBLE[0] === "1") [decoded_RateMatchPattern["subcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    [decoded_RateMatchPattern["dummy"],offset] = parse_ASN_ENUMERATED(payload,offset,["dynamic", "semiStatic"]);

    if(RateMatchPattern_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RateMatchPattern,offset];
}

function decode_EUTRA_MBSFN_SubframeConfig(payload,offset){
    let EUTRA_MBSFN_SubframeConfig_SEQ_PREAMBLE,EUTRA_MBSFN_SubframeConfig_EXT_FLAG,decoded_EUTRA_MBSFN_SubframeConfig = {};

    [EUTRA_MBSFN_SubframeConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [EUTRA_MBSFN_SubframeConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_EUTRA_MBSFN_SubframeConfig["radioframeAllocationPeriod"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n4", "n8", "n16", "n32"]);
    [decoded_EUTRA_MBSFN_SubframeConfig["radioframeAllocationOffset"],offset] = parse_ASN_INTEGER(payload,offset,0,7);
    [decoded_EUTRA_MBSFN_SubframeConfig["subframeAllocation1"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"oneFrame" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,6,6);}},
        {"fourFrames" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,24,24);}}
    ]);
    if(EUTRA_MBSFN_SubframeConfig_SEQ_PREAMBLE[0] === "1"){
        [decoded_EUTRA_MBSFN_SubframeConfig["subframeAllocation2"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"oneFrame" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,2,2);}},
            {"fourFrames" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}}
        ]);
    }

    if(EUTRA_MBSFN_SubframeConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_EUTRA_MBSFN_SubframeConfig,offset];
}


function decode_EUTRA_MBSFN_SubframeConfigList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_EUTRA_MBSFN_SubframeConfig);
}

function decode_RateMatchPatternLTE_CRS(payload,offset){
    let RateMatchPatternLTE_CRS_SEQ_PREAMBLE,decoded_RateMatchPatternLTE_CRS = {};

    [RateMatchPatternLTE_CRS_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_RateMatchPatternLTE_CRS["carrierFreqDL"],offset] = parse_ASN_INTEGER(payload,offset,0,16383);    
    [decoded_RateMatchPatternLTE_CRS["carrierBandwidthDL"],offset] = parse_ASN_ENUMERATED(payload,offset,["n6", "n15", "n25", "n50", "n75", "n100", "spare2", "spare1"]);
    [decoded_RateMatchPatternLTE_CRS["mbsfn-SubframeConfigList"],offset] = decode_EUTRA_MBSFN_SubframeConfigList(payload,offset);
    [decoded_RateMatchPatternLTE_CRS["nrofCRS-Ports"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n4"]);
    [decoded_RateMatchPatternLTE_CRS["v-Shift"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5"]);

    return [decoded_RateMatchPatternLTE_CRS,offset];
}

function decode_AdditionalSpectrumEmission(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_FrequencyInfoUL(payload,offset){
    let FrequencyInfoUL_EXT_FLAG, FrequencyInfoUL_SEQ_PREAMBLE, decoded_FrequencyInfoUL = {};

    [FrequencyInfoUL_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [FrequencyInfoUL_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);
    
    if(FrequencyInfoUL_SEQ_PREAMBLE[0] === "1") [decoded_FrequencyInfoUL["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR(payload,offset);
    if(FrequencyInfoUL_SEQ_PREAMBLE[1] === "1") [decoded_FrequencyInfoUL["absoluteFrequencyPointA"],offset] = decode_ARFCN_ValueNR(payload,offset);
    [decoded_FrequencyInfoUL["scs-SpecificCarrierList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,5,decode_SCS_SpecificCarrier);
    [decoded_FrequencyInfoUL["additionalSpectrumEmission"],offset] = decode_AdditionalSpectrumEmission(payload,offset);
    if(FrequencyInfoUL_SEQ_PREAMBLE[2] === "1") [decoded_FrequencyInfoUL["p-Max"],offset] = decode_P_Max(payload,offset);
    if(FrequencyInfoUL_SEQ_PREAMBLE[3] === "1") [decoded_FrequencyInfoUL["frequencyShift7p5khz"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    
    if(FrequencyInfoUL_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_FrequencyInfoUL,offset];
}

function decode_UplinkConfigCommon(payload,offset){
    let UplinkConfigCommon_SEQ_PREAMBLE,decoded_UplinkConfigCommon = {};

    [UplinkConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(UplinkConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_UplinkConfigCommon["frequencyInfoUL"],offset] = decode_FrequencyInfoUL(payload,offset);
    if(UplinkConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_UplinkConfigCommon["initialUplinkBWP"],offset] = decode_BWP_UplinkCommon(payload,offset);    
    [decoded_UplinkConfigCommon["dummy"],offset] = decode_TimeAlignmentTimer(payload,offset);

    return [decoded_UplinkConfigCommon,offset];
}

function decode_FrequencyInfoDL(payload,offset){
    let FrequencyInfoDL_SEQ_PREAMBLE,FrequencyInfoDL_EXT_FLAG,decoded_FrequencyInfoDL = {};

    [FrequencyInfoDL_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [FrequencyInfoDL_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(FrequencyInfoDL_SEQ_PREAMBLE[0] === "1") [decoded_FrequencyInfoDL["absoluteFrequencySSB"],offset] = decode_ARFCN_ValueNR(payload,offset);
    [decoded_FrequencyInfoDL["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR(payload,offset);
    [decoded_FrequencyInfoDL["absoluteFrequencyPointA"],offset] = decode_ARFCN_ValueNR(payload,offset);
    [decoded_FrequencyInfoDL["scs-SpecificCarrierList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,5,decode_SCS_SpecificCarrier);

    if(FrequencyInfoDL_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_FrequencyInfoDL,offset];
}

function decode_DownlinkConfigCommon(payload,offset){
    let DownlinkConfigCommon_EXT_FLAG,DownlinkConfigCommon_SEQ_PREAMBLE,decoded_DownlinkConfigCommon = {};

    [DownlinkConfigCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [DownlinkConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(DownlinkConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_DownlinkConfigCommon["frequencyInfoDL"],offset] = decode_FrequencyInfoDL(payload,offset);
    if(DownlinkConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_DownlinkConfigCommon["initialDownlinkBWP"],offset] = decode_BWP_DownlinkCommon(payload,offset);

    if(DownlinkConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DownlinkConfigCommon,offset];
}

function decode_MultiFrequencyBandListNR(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_FreqBandIndicatorNR);
}

function decode_BSR_Config(payload,offset){
    let BSR_Config_EXT_FLAG, BSR_Config_SEQ_PREAMBLE,decoded_BSR_Config = {}; 

    [BSR_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BSR_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_BSR_Config["periodicBSR-Timer"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf1", "sf5", "sf10", "sf16", "sf20", "sf32", "sf40", "sf64", "sf80", "sf128", "sf160", "sf320", "sf640", "sf1280", "sf2560", "infinity"]);
    [decoded_BSR_Config["retxBSR-Timer"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf10", "sf20", "sf40", "sf80", "sf160", "sf320", "sf640", "sf1280", "sf2560", "sf5120", "sf10240", "spare5","spare4", "spare3", "spare2", "spare1"]);
    if(BSR_Config_SEQ_PREAMBLE[0] === "1") [decoded_BSR_Config["logicalChannelSR-DelayTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf20", "sf40", "sf64", "sf128", "sf512", "sf1024", "sf2560", "spare1"]);

    if(BSR_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BSR_Config,offset];
}

function decode_TAG(payload,offset){
    let TAG_EXT_FLAG,decoded_TAG = {};

    [TAG_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    
    [decoded_TAG["tag-Id"],offset] = decode_TAG_Id(payload,offset);
    [decoded_TAG["timeAlignmentTimer"],offset] = decode_TimeAlignmentTimer(payload,offset);
   
    if(TAG_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_TAG,offset];
}

function decode_TAG_Config(payload,offset){
    let TAG_Config_SEQ_PREAMBLE,decoded_TAG_Config = {};

    [TAG_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(TAG_Config_SEQ_PREAMBLE[0] === "1")  [decoded_TAG_Config["tag-ToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_TAG_Id);
    if(TAG_Config_SEQ_PREAMBLE[1] === "1")  [decoded_TAG_Config["tag-ToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_TAG);
    
    return [decoded_TAG_Config,offset];
}  

function decode_MAC_CellGroupConfig(payload,offset){
    let MAC_CellGroupConfig_SEQ_PREAMBLE,MAC_CellGroupConfig_EXT_FLAG,decoded_MAC_CellGroupConfig = {};

    [MAC_CellGroupConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [MAC_CellGroupConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

    if(MAC_CellGroupConfig_SEQ_PREAMBLE[0] === "1") [decoded_MAC_CellGroupConfig["drx-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_DRX_Config);
    if(MAC_CellGroupConfig_SEQ_PREAMBLE[1] === "1") [decoded_MAC_CellGroupConfig["schedulingRequestConfig"],offset] = decode_SchedulingRequestConfig(payload,offset);
    if(MAC_CellGroupConfig_SEQ_PREAMBLE[2] === "1") [decoded_MAC_CellGroupConfig["bsr-Config"],offset] = decode_BSR_Config(payload,offset);
    if(MAC_CellGroupConfig_SEQ_PREAMBLE[3] === "1") [decoded_MAC_CellGroupConfig["tag-Config"],offset] = decode_TAG_Config(payload,offset);
    if(MAC_CellGroupConfig_SEQ_PREAMBLE[4] === "1") [decoded_MAC_CellGroupConfig["phr-Config"],offset] = parse_ASN_SETREL(payload,offset,decode_PHR_Config);    
    [decoded_MAC_CellGroupConfig["skipUplinkTxDynamic"],offset] = parse_ASN_BOOLEAN(payload,offset);

    if(MAC_CellGroupConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_MAC_CellGroupConfig,offset]
}

function decode_SchedulingRequestToAddMod(payload,offset){
    let SchedulingRequestToAddMod_SEQ_PREAMBLE,decoded_SchedulingRequestToAddMod = {};
    [SchedulingRequestToAddMod_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_SchedulingRequestToAddMod["schedulingRequestId"],offset] = decode_SchedulingRequestId(payload,offset);    
    if(SchedulingRequestToAddMod_SEQ_PREAMBLE[0] === "1"){
        [decoded_SchedulingRequestToAddMod["sr-ProhibitTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms1", "ms2", "ms4", "ms8", "ms16", "ms32", "ms64", "ms128"]);
    }
    [decoded_SchedulingRequestToAddMod["sr-TransMax"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "n8", "n16", "n32", "n64", "spare3", "spare2", "spare1"]);

    return [decoded_SchedulingRequestToAddMod,offset];
}

function decode_SchedulingRequestConfig(payload,offset){
    let SchedulingRequestConfig_SEQ_PREAMBLE,decoded_SchedulingRequestConfig = {};

    [SchedulingRequestConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(SchedulingRequestConfig_SEQ_PREAMBLE[0] === "1"){
        [decoded_SchedulingRequestConfig["schedulingRequestToAddModList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_SchedulingRequestToAddMod);
    }
    if(SchedulingRequestConfig_SEQ_PREAMBLE[1] === "1"){
        [decoded_SchedulingRequestConfig["schedulingRequestToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_SchedulingRequestId);
    }
    return [decoded_SchedulingRequestConfig,offset];
}

function decode_PHR_Config(payload,offset){
    let PHR_Config_EXT_FLAG, decoded_PHR_Config = {};

    [PHR_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_PHR_Config["phr-PeriodicTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf10", "sf20", "sf50", "sf100", "sf200","sf500", "sf1000", "infinity"]);
    [decoded_PHR_Config["phr-ProhibitTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf0", "sf10", "sf20", "sf50", "sf100","sf200", "sf500", "sf1000"]);
    [decoded_PHR_Config["phr-Tx-PowerFactorChange"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB1", "dB3", "dB6", "infinity"]);
    [decoded_PHR_Config["multiplePHR"],offset] = parse_ASN_BOOLEAN(payload,offset);
    [decoded_PHR_Config["dummy"],offset] = parse_ASN_BOOLEAN(payload,offset);
    [decoded_PHR_Config["phr-Type2OtherCell"],offset] = parse_ASN_BOOLEAN(payload,offset);
    [decoded_PHR_Config["phr-ModeOtherCG"],offset] = parse_ASN_ENUMERATED(payload,offset,["real", "virtual"]);

    if(PHR_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PHR_Config,offset]
}

function decode_DRX_Config(payload,offset){
    let DRX_Config_SEQ_PREAMBLE, decoded_DRX_Config = {};

    [DRX_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_DRX_Config["drx-onDurationTimer"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"subMilliSeconds" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,1,31);}},
        {"milliSeconds" : (payload,offset)=>{return parse_ASN_ENUMERATED(payload,offset,["ms1", "ms2", "ms3", "ms4", "ms5", "ms6", "ms8", "ms10", "ms20", "ms30", "ms40", "ms50", "ms60","ms80", "ms100", "ms200",
            "ms300", "ms400", "ms500", "ms600", "ms800", "ms1000", "ms1200", "ms1600", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"])}}
    ]);
    [decoded_DRX_Config["drx-InactivityTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0", "ms1", "ms2", "ms3", "ms4", "ms5", "ms6", "ms8", "ms10", "ms20", "ms30", "ms40", "ms50", "ms60", "ms80", "ms100", "ms200", "ms300", "ms500", "ms750", "ms1280", "ms1920", "ms2560", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
    [decoded_DRX_Config["drx-HARQ-RTT-TimerDL"],offset] = parse_ASN_INTEGER(payload,offset,0,56);
    [decoded_DRX_Config["drx-HARQ-RTT-TimerUL"],offset] = parse_ASN_INTEGER(payload,offset,0,56);    
    [decoded_DRX_Config["drx-RetransmissionTimerDL"],offset] = parse_ASN_ENUMERATED(payload,offset,["sl0", "sl1", "sl2", "sl4", "sl6", "sl8", "sl16", "sl24", "sl33", "sl40", "sl64", "sl80", "sl96", "sl112", "sl128","sl160", "sl320", "spare15", "spare14", "spare13", "spare12", "spare11", "spare10", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
    [decoded_DRX_Config["drx-RetransmissionTimerUL"],offset] = parse_ASN_ENUMERATED(payload,offset,["sl0", "sl1", "sl2", "sl4", "sl6", "sl8", "sl16", "sl24", "sl33", "sl40", "sl64", "sl80", "sl96", "sl112", "sl128","sl160", "sl320", "spare15", "spare14", "spare13", "spare12", "spare11", "spare10", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
    [decoded_DRX_Config["drx-LongCycleStartOffset"],offset] = parse_ASN_CHOICE(payload,offset,[
        {"ms10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9);}},
        {"ms20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19);}},
        {"ms32" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,31);}},
        {"ms40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39);}},
        {"ms60" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,59);}},
        {"ms64" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,63);}},
        {"ms70" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,69);}},
        {"ms80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79);}},
        {"ms128" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,127);}},
        {"ms160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159);}},
        {"ms256" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,255);}},
        {"ms320" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,319);}},
        {"ms512" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,511);}},
        {"ms640" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,639);}},
        {"ms1024" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1023);}},
        {"ms1280" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1279);}},
        {"ms2048" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,2047);}},
        {"ms2560" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,2559);}},
        {"ms5120" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,5119);}},
        {"ms10240" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,10239);}},
    ]);
    if(DRX_Config_SEQ_PREAMBLE[0] === "1"){
        let decoded_shortDRX = {};

        [decoded_shortDRX["drx-ShortCycle"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms2", "ms3", "ms4", "ms5", "ms6", "ms7", "ms8", "ms10", "ms14", "ms16", "ms20", "ms30", "ms32", "ms35", "ms40", "ms64", "ms80", "ms128", "ms160", "ms256", "ms320", "ms512", "ms640", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
        [decoded_shortDRX["drx-ShortCycleTimer"],offset] = parse_ASN_INTEGER(payload,offset,1,16);

        decoded_DRX_Config["shortDRX"] = decoded_shortDRX;
    }    
    [decoded_DRX_Config["drx-SlotOffset"],offset] = parse_ASN_INTEGER(payload,offset,0,31);

    return [decoded_DRX_Config,offset];
}

function decode_LogicalChannelConfig(payload,offset){
    let LogicalChannelConfig_EXT_FLAG,LogicalChannelConfig_SEQ_PREAMBLE, decoded_LogicalChannelConfig = {};

    [LogicalChannelConfig_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [LogicalChannelConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);    

    if(LogicalChannelConfig_SEQ_PREAMBLE[0] === "1"){
        let ul_SpecificParameters_SEQ_PREAMBLE,ul_SpecificParameters_EXT_FLAG,decoded_ul_SpecificParameters = {};

        [ul_SpecificParameters_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [ul_SpecificParameters_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

        [decoded_ul_SpecificParameters["priority"],offset] = parse_ASN_INTEGER(payload,offset,1,16);

        [decoded_ul_SpecificParameters["prioritisedBitRate"],offset] = parse_ASN_ENUMERATED(payload,offset,["kBps0", "kBps8", "kBps16", "kBps32", "kBps64", "kBps128", "kBps256", "kBps512", "kBps1024", "kBps2048", "kBps4096", "kBps8192", "kBps16384", "kBps32768", "kBps65536", "infinity"]);
        [decoded_ul_SpecificParameters["bucketSizeDuration"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms5", "ms10", "ms20", "ms50", "ms100", "ms150", "ms300", "ms500", "ms1000", "spare7", "spare6", "spare5", "spare4", "spare3","spare2", "spare1"]);
        if(ul_SpecificParameters_SEQ_PREAMBLE[0] === "1"){
            [decoded_ul_SpecificParameters["allowedServingCells"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,31,decode_ServCellIndex);
        }
        if(ul_SpecificParameters_SEQ_PREAMBLE[1] === "1"){         
            [decoded_ul_SpecificParameters["allowedSCS-List"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,5,decode_SubcarrierSpacing);
        }
        if(ul_SpecificParameters_SEQ_PREAMBLE[2] === "1"){
            [decoded_ul_SpecificParameters["maxPUSCH-Duration"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0p02", "ms0p04", "ms0p0625", "ms0p125", "ms0p25", "ms0p5", "ms0p01-v1700", "spare1"]);
        }
        if(ul_SpecificParameters_SEQ_PREAMBLE[3] === "1"){
            [decoded_ul_SpecificParameters["configuredGrantType1Allowed"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
        }
        if(ul_SpecificParameters_SEQ_PREAMBLE[4] === "1"){
            [decoded_ul_SpecificParameters["logicalChannelGroup"],offset] = parse_ASN_INTEGER(payload,offset,0,7);
        }
        if(ul_SpecificParameters_SEQ_PREAMBLE[5] === "1"){
            [decoded_ul_SpecificParameters["schedulingRequestID"],offset] = decode_SchedulingRequestId(payload,offset);
        }
        [decoded_ul_SpecificParameters["logicalChannelSR-Mask"],offset] = parse_ASN_BOOLEAN(payload,offset);
        [decoded_ul_SpecificParameters["logicalChannelSR-DelayTimerApplied"],offset] = parse_ASN_BOOLEAN(payload,offset);
       
        decoded_LogicalChannelConfig["ul-SpecificParameters"] = decoded_ul_SpecificParameters;
    }

    if(LogicalChannelConfig_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_LogicalChannelConfig,offset];
}

function decode_RLC_Config(payload,offset){
    let RLC_Config_EXT_FLAG;
    [RLC_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    function decode_am(payload,offset){
        let decoded_am = {};  
        [decoded_am["ul-AM-RLC"],offset] = decode_UL_AM_RLC(payload,offset);
        [decoded_am["dl-AM-RLC"],offset] = decode_DL_AM_RLC(payload,offset);
        return [decoded_am,offset];
    }
    function decode_um_Bi_Directional(payload,offset){
        let decoded_um_Bi_Directional = {};
        [decoded_um_Bi_Directional["ul-UM-RLC"],offset] = decode_UL_UM_RLC(payload,offset);
        [decoded_um_Bi_Directional["dl-UM-RLC"],offset] = decode_DL_UM_RLC(payload,offset);
        return [decoded_um_Bi_Directional,offset];
    }
    function decode_um_Uni_Directional_UL(payload,offset){
        let decoded_um_Uni_Directional_UL = {};
        [decoded_um_Uni_Directional_UL["ul-UM-RLC"],offset] = decode_UL_UM_RLC(payload,offset);
        return [decoded_um_Uni_Directional_UL,offset];
    }
    function decode_um_Uni_Directional_DL(payload,offset){
        let decoded_um_Uni_Directional_DL = {};
        [decoded_um_Uni_Directional_DL["dl-UM-RLC"],offset] = decode_DL_UM_RLC(payload,offset);
        return [decoded_um_Uni_Directional_DL,offset];
    }

    if(RLC_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return parse_ASN_CHOICE(payload,offset,[
        {"am" : decode_am},
        {"um-Bi-Directional" : decode_um_Bi_Directional},
        {"um-Uni-Directional-UL" : decode_um_Uni_Directional_UL},
        {"um-Uni-Directional-DL" : decode_um_Uni_Directional_DL}
    ]);
}

function decode_UL_UM_RLC(payload,offset){
    let decoded_UL_UM_RLC = {};
    [decoded_UL_UM_RLC["sn-FieldLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["size6","size12"]);
    return [decoded_UL_UM_RLC,offset]
}

function decode_DL_UM_RLC(payload,offset){
    let decoded_DL_UM_RLC = {};
    [decoded_DL_UM_RLC["sn-FieldLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["size6","size12"]);
    [decoded_DL_UM_RLC["t-Reassembly"],offset] = decode_T_Reassembly(payload,offset);
    return [decoded_DL_UM_RLC,offset]
}

function decode_DL_AM_RLC(payload,offset){
    let DL_AM_RLC_SEQ_PREAMBLE,decoded_DL_AM_RLC = {};

    [DL_AM_RLC_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(DL_AM_RLC_SEQ_PREAMBLE[0] === "1") [decoded_DL_AM_RLC["sn-FieldLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["size12", "size18"]);
    [decoded_DL_AM_RLC["t-Reassembly"],offset] = decode_T_Reassembly(payload,offset);
    [decoded_DL_AM_RLC["t-StatusProhibit"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0", "ms5", "ms10", "ms15", "ms20", "ms25", "ms30", "ms35", "ms40", "ms45", "ms50", "ms55", "ms60", "ms65", "ms70",
        "ms75", "ms80", "ms85", "ms90", "ms95", "ms100", "ms105", "ms110", "ms115", "ms120", "ms125", "ms130", "ms135", "ms140", "ms145", "ms150", "ms155", "ms160", "ms165",
        "ms170", "ms175", "ms180", "ms185", "ms190", "ms195", "ms200", "ms205", "ms210", "ms215", "ms220", "ms225", "ms230", "ms235", "ms240", "ms245", "ms250", "ms300",
        "ms350", "ms400", "ms450", "ms500", "ms800", "ms1000", "ms1200", "ms1600", "ms2000", "ms2400", "spare2", "spare1"]);

    return [decoded_DL_AM_RLC,offset]
}

function decode_UL_AM_RLC(payload,offset){
    let UL_AM_RLC_SEQ_PREAMBLE,decoded_UL_AM_RLC = {};


    [UL_AM_RLC_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(UL_AM_RLC_SEQ_PREAMBLE[0] === "1") [decoded_UL_AM_RLC["sn-FieldLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["size12", "size18"]);  

    [decoded_UL_AM_RLC["t-PollRetransmit"],offset] = parse_ASN_ENUMERATED(payload,offset, ["ms5", "ms10", "ms15", "ms20", "ms25", "ms30", "ms35", "ms40", "ms45", "ms50", "ms55", "ms60", "ms65", "ms70", "ms75", "ms80", "ms85", "ms90", "ms95", "ms100", "ms105", "ms110", "ms115", "ms120", "ms125", "ms130", "ms135", "ms140", "ms145", "ms150", "ms155", "ms160", "ms165", "ms170", "ms175",
         "ms180", "ms185", "ms190", "ms195", "ms200", "ms205", "ms210", "ms215", "ms220", "ms225", "ms230", "ms235", "ms240", "ms245", "ms250", "ms300", "ms350", "ms400","ms450", "ms500", "ms800", "ms1000", "ms2000", "ms4000", "ms1-v1610", "ms2-v1610", "ms3-v1610", "ms4-v1610", "spare1"]);

    [decoded_UL_AM_RLC["pollPDU"],offset] = parse_ASN_ENUMERATED(payload,offset,["p4", "p8", "p16", "p32", "p64", "p128", "p256", "p512", "p1024", "p2048", "p4096", "p6144", "p8192", "p12288", "p16384","p20480", "p24576", "p28672", "p32768", "p40960", "p49152", "p57344", "p65536", "infinity", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);

    [decoded_UL_AM_RLC["pollByte"],offset] = parse_ASN_ENUMERATED(payload,offset,["kB1", "kB2", "kB5", "kB8", "kB10", "kB15", "kB25", "kB50", "kB75", "kB100", "kB125", "kB250", "kB375", "kB500", "kB750", "kB1000", "kB1250", "kB1500", "kB2000", "kB3000", "kB4000", "kB4500", "kB5000", "kB5500", "kB6000", "kB6500", "kB7000", "kB7500", "mB8", "mB9", "mB10", "mB11", "mB12",
        "mB13", "mB14", "mB15", "mB16", "mB17", "mB18", "mB20", "mB25", "mB30", "mB40", "infinity", "spare20", "spare19", "spare18", "spare17", "spare16", "spare15", "spare14", "spare13", "spare12", "spare11", "spare10", "spare9", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);

    [decoded_UL_AM_RLC["maxRetxThreshold"],offset] = parse_ASN_ENUMERATED(payload,offset,["t1", "t2", "t3", "t4", "t6", "t8", "t16", "t32"]);

    return [decoded_UL_AM_RLC,offset];
}

function decode_T_Reassembly(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["ms0", "ms5", "ms10", "ms15", "ms20", "ms25", "ms30", "ms35", "ms40", "ms45", "ms50", "ms55", "ms60", "ms65", "ms70", "ms75", "ms80", "ms85", "ms90", "ms95", "ms100", "ms110", "ms120", "ms130", "ms140", "ms150", "ms160", "ms170", "ms180", "ms190", "ms200", "spare1"]);
}

function decode_PDU_SessionID(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,255);
}

function decode_QFI(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,63);
}

function decode_SDAP_Config(payload,offset){
    let SDAP_Config_EXT_FLAG, SDAP_Config_SEQ_PREAMBLE,decoded_SDAP_Config = {};

    [SDAP_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SDAP_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SDAP_Config["pdu-Session"],offset] = decode_PDU_SessionID(payload,offset);
    [decoded_SDAP_Config["sdap-HeaderDL"],offset] = parse_ASN_ENUMERATED(payload,offset,["present","absent"]);
    [decoded_SDAP_Config["sdap-HeaderUL"],offset] = parse_ASN_ENUMERATED(payload,offset,["present","absent"]);
    [decoded_SDAP_Config["defaultDRB"],offset] = parse_ASN_BOOLEAN(payload,offset);

    if(SDAP_Config_SEQ_PREAMBLE[0] === "1") [decoded_SDAP_Config["mappedQoS-FlowsToRelease"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_QFI);
    if(SDAP_Config_SEQ_PREAMBLE[1] === "1") [decoded_SDAP_Config["mappedQoS-FlowsToRelease"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_QFI);

    if(SDAP_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SDAP_Config,offset]
}

function decode_PDCP_Config(payload,offset){
    let PDCP_Config_SEQ_PREAMBLE,PDCP_Config_EXT_FLAG,decoded_PDCP_Config = {};

    [PDCP_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDCP_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(PDCP_Config_SEQ_PREAMBLE[0] === "1"){ //drb
        let drb_SEQ_PREAMBLE,decoded_drb = {};

        [drb_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

        if(drb_SEQ_PREAMBLE[0] === "1"){
            [decoded_drb["discardTimer"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms10", "ms20", "ms30", "ms40", "ms50", "ms60", "ms75", "ms100", "ms150", "ms200", "ms250", "ms300", "ms500", "ms750", "ms1500", "infinity"]);      
        }
        if(drb_SEQ_PREAMBLE[1] === "1") [decoded_drb["pdcp-SN-SizeUL"],offset] = parse_ASN_ENUMERATED(payload,offset,["len12bits", "len18bits"]);
        if(drb_SEQ_PREAMBLE[2] === "1") [decoded_drb["pdcp-SN-SizeDL"],offset] = parse_ASN_ENUMERATED(payload,offset,["len12bits", "len18bits"]);
        
        //header compression
        let headerCompression_CHOICE_FLAG,headerCompression_EXT_FLAG,decoded_headerCompression = {};

        [headerCompression_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [headerCompression_CHOICE_FLAG,offset] = parseStringBitsToVal(payload,offset,3);

        function decode_rohc(payload,offset){
            let rohc_SEQ_PREAMBLE,decoded_rohc = {};

            [rohc_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

            if(rohc_SEQ_PREAMBLE[0] === "1") [decoded_rohc["maxCID"],offset] = parse_ASN_INTEGER(payload,offset,1,16383);
            else decoded_rohc["maxCID"] = 15;
            
            let decoded_profiles = {};
            [decoded_profiles["profile0x0001"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0002"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0003"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0004"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0006"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0101"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0102"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0103"],offset] = parse_ASN_BOOLEAN(payload,offset);
            [decoded_profiles["profile0x0104"],offset] = parse_ASN_BOOLEAN(payload,offset);
            decoded_rohc["profiles"] = decoded_profiles;

            if(rohc_SEQ_PREAMBLE[1] === "1") [decoded_rohc["drb-ContinueROHC"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
            return [decoded_rohc,offset];
        }
        function decode_uplinkOnlyROHC(payload,offset){
            let uplinkOnlyROH_SEQ_PREAMBLE,decoded_uplinkOnlyROHC = {};

            [uplinkOnlyROH_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
            
            if(uplinkOnlyROH_SEQ_PREAMBLE[0] === "1") [decoded_uplinkOnlyROHC["maxCID"],offset] = parse_ASN_INTEGER(payload,offset,1,16383);
            else decoded_uplinkOnlyROHC["maxCID"] = 15;

            let decoded_profiles = {};
            [decoded_profiles["profile0x0006"],offset] = parse_ASN_BOOLEAN(payload,offset);
            decoded_uplinkOnlyROHC["profiles"] = decoded_profiles;

            if(uplinkOnlyROH_SEQ_PREAMBLE[1] === "1") [decoded_uplinkOnlyROHC["drb-ContinueROHC"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);

            return [decoded_uplinkOnlyROHC,offset];
        }
       
        [headerCompression_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [decoded_PDCP_Config["headerCompression"],offset] = parse_ASN_CHOICE(payload,offset,[
            {"notUsed" : parse_ASN_NULL},
            {"rohc" : decode_rohc},
            {"uplinkOnlyROHC" : decode_uplinkOnlyROHC}
        ]);
        //end headerCompression

        if(drb_SEQ_PREAMBLE[3] === "1") [decoded_drb["integrityProtection"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
        if(drb_SEQ_PREAMBLE[4] === "1") [decoded_drb["statusReportRequired"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
        if(drb_SEQ_PREAMBLE[5] === "1") [decoded_drb["outOfOrderDelivery"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
        
        decoded_PDCP_Config["drb"] = decoded_drb;
    }
    if(PDCP_Config_SEQ_PREAMBLE[1] === "1"){
        let moreThanOneRLC_SEQ_PREAMBLE,decoded_moreThanOneRLC = {};

        [moreThanOneRLC_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
        
        let primaryPath_SEQ_PREAMBLE,decoded_primaryPath = {};
        [primaryPath_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);
        if(primaryPath_SEQ_PREAMBLE[0] === "1") [decoded_primaryPath["cellGroup"],offset] = decode_CellGroupId(payload,offset);
        if(primaryPath_SEQ_PREAMBLE[1] === "1") [decoded_primaryPath["logicalChannel"],offset] = decode_LogicalChannelIdentity(payload,offset);
        decoded_moreThanOneRLC["primaryPath"] = decoded_primaryPath;

        if(moreThanOneRLC_SEQ_PREAMBLE[0] === 1){
            [decoded_moreThanOneRLC["ul-DataSplitThreshold"],offset] = parse_ASN_ENUMERATED(payload,offset,["b0", "b100", "b200", "b400", "b800", "b1600", "b3200", "b6400", "b12800", "b25600", "b51200", "b102400", "b204800", "b409600", "b819200", "b1228800", "b1638400", "b2457600", "b3276800", "b4096000", "b4915200", "b5734400",
                "b6553600", "infinity", "spare8", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
        }
        if(moreThanOneRLC_SEQ_PREAMBLE[1] === 1){
            [decoded_moreThanOneRLC["pdcp-Duplication"],offset] = parse_ASN_BOOLEAN(payload,offset);
        }
        decoded_PDCP_Config["moreThanOneRLC"] = decoded_moreThanOneRLC;
    }
    if(PDCP_Config_SEQ_PREAMBLE[2] === "1"){
        [decoded_PDCP_Config["t-Reordering"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0", "ms1", "ms2", "ms4", "ms5", "ms8", "ms10", "ms15", "ms20", "ms30", "ms40", "ms50", "ms60", "ms80", "ms100", "ms120", "ms140", "ms160", "ms180", "ms200", "ms220", "ms240", "ms260", "ms280", "ms300", "ms500", "ms750", "ms1000", "ms1250",
             "ms1500", "ms1750", "ms2000", "ms2250", "ms2500", "ms2750", "ms3000", "spare28", "spare27", "spare26", "spare25", "spare24", "spare23", "spare22", "spare21", "spare20", "spare19", "spare18", "spare17", "spare16", "spare15", "spare14", "spare13", "spare12", "spare11", "spare10", "spare09", "spare08", "spare07", "spare06",
            "spare05", "spare04", "spare03", "spare02", "spare01"]);
    }

    if(PDCP_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDCP_Config,offset]   
}