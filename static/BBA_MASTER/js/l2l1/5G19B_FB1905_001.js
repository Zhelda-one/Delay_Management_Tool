packetPropToStrMap['l2l1.message'] = {
    0x0001: 'L1::PingPongReq',
    0x0002: 'L1::EchoReq',
    0x0003: 'L1::EchoResp',
    0x0004: 'L1::LoopReq',
    0x0005: 'L1::UlMeasReq',
    0x0006: 'L1::WakeupReq',
    0x0007: 'L1::StartupLoopReq',
    0x0008: 'L1::SnapshotFileCreationReq',
    0x0009: 'L1::LatencyEventReq',
    0x000A: 'L1::DmaEndInd',
    0x000B: 'L1::LaWakeupReq',
    0x000C: 'L1::DmaStartTestReq',
    0x000D: 'L1::NrtRxSubcellResetReq',
    0x000E: 'L1::SyncInd',
    0x0101: 'DlCell::SetupResp',
    0x0102: 'DlCell::DeleteReq',
    0x0103: 'DlCell::DeleteResp',
    0x0104: 'DlData::AddressReq',
    0x0108: 'DlData::PdschPayloadTbSendReq',
    0x0121: 'DlData::AddressResp',
    0x0122: 'DlData::SlotTypeReq',
    0x0127: 'DlData::SsBlockSendReq',
    0x012A: 'DlData::CsiRsSendReq',
    0x012B: 'DlData::PatternConfigReq',
    0x012C: 'DlData::PdcchSendReq',
    0x012D: 'DlCell::SetupReq',
    0x012E: 'DlData::PdschSendReq',
    0x0201: 'UlCell::SetupResp',
    0x0202: 'UlCell::DeleteReq',
    0x0203: 'UlCell::DeleteResp',
    0x0218: 'UlData::PuschReceiveRespHarqU',
    0x0219: 'UlData::PrachReceiveInd',
    0x0222: 'UlData::PrachReceiveIndTst',
    0x022B: 'UlData::AddressResp',
    0x022E: 'UlData::SrsReceiveRespPs',
    0x0235: 'UlData::PuschReceiveRespPs',
    0x023A: 'UlData::PuschReceiveRespLo',
    0x0240: 'UlData::PrachReceiveReq',
    0x0241: 'UlData::SrsReceiveReq',
    0x0243: 'UlData::AddressReq',
    0x0248: 'UlCell::SetupReq',
    0x0249: 'UlData::PuschReceiveReq',
    0x024B: 'UlData::SrsReceiveRespBmPs',
    0x024C: 'UlData::PucchReceiveReq',
    0x024D: 'UlData::PucchReceiveRespHarqD',
    0x024E: 'UlData::PucchReceiveRespPs',
    0x0A00: 'L1Cpri::CpriAlarmInd',
    0x0A01: 'L1Cpri::CpriConfigureLinksReq',
    0x0A02: 'L1Cpri::CpriConfigureLinksResp',
    0x0A05: 'L1Cpri::CpriSetOutputReq',
    0x0A06: 'L1Cpri::CpriSetOutputResp',
    0x0A07: 'L1Cpri::CpriStateInd',
    0x0A08: 'L1Cpri::CpriSubscribeReq',
    0x0A09: 'L1Cpri::CpriSubscribeResp',
    0x0A0A: 'L1Cpri::CpriDiscoveryInd',
    0x0A0E: 'L1Cpri::CpriDelayConfigResp',
    0x0A0F: 'L1Cpri::CpriGetLinkParamReq',
    0x0A11: 'L1Cpri::CpriDelayConfigReq',
    0x0A12: 'L1Cpri::CpriSetDiscoveryReq',
    0x0A13: 'L1Cpri::CpriSetDiscoveryResp',
    0x0A14: 'L1Cpri::SetLinkPropertiesReq',
    0x0A15: 'L1Cpri::SetLinkPropertiesResp',
    0x0A16: 'L1Cpri::CpriGetLinkParamResp',
    0x0A30: 'L1ECpri::ConfigureLinksReq',
    0x0A31: 'L1ECpri::ConfigureLinksResp',
    0x0A32: 'L1ECpri::SubscribeReq',
    0x0A33: 'L1ECpri::SubscribeResp',
    0x0A34: 'L1ECpri::SetOutputReq',
    0x0A35: 'L1ECpri::SetOutputResp',
    0x0A36: 'L1ECpri::StateInd',
    0x0A37: 'L1ECpri::DelayConfigReq',
    0x0A38: 'L1ECpri::DelayConfigResp',
    0x0A39: 'L1ECpri::ConfigureTransportReq',
    0x0A3A: 'L1ECpri::ConfigureTransportResp',
    0x0A3B: 'L1ECpri::InitialDelayMeasReq',
    0x0A3C: 'L1ECpri::InitialDelayMeasResp',
    0x0A3D: 'L1ECpri::DelayMeasInd',
    0x0A3E: 'L1ECpri::ConfigureMeasurementsReq',
    0x0A3F: 'L1ECpri::ConfigureMeasurementsResp',
    0x0A40: 'L1ECpri::MsgRcvCountersInd',
    0x0A5A: 'L1Log::AntennaSnapshotResp',
    0x0A5D: 'L1Log::TraceReq',
    0x0A5E: 'L1Log::TraceResp',
    0x0A5F: 'L1Log::TraceInd',
    0x0A60: 'L1Log::ShowTraceListReq',
    0x0A61: 'L1Log::ShowTraceListResp',
    0x0A62: 'L1Log::AntennaSnapshotConfigurationReq',
    0x0A63: 'L1Log::AntennaSnapshotConfigurationResp',
    0x0A64: 'L1Log::AntennaSnapshotInd',
    0x0A65: 'L1Log::AntennaSnapshotReq',
    0xD220: 'SyncM::StartPtpReq',
    0xD221: 'SyncM::StartPtpResp',
    0xD222: 'SyncM::UpdatePtpConfigReq',
    0xD223: 'SyncM::UpdatePtpConfigResp',
    0xD224: 'SyncM::StartSyncEReq',
    0xD225: 'SyncM::StartSyncEResp',
    0xD226: 'SyncM::UpdateSyncEConfigReq',
    0xD227: 'SyncM::UpdateSyncEConfigResp',
    0xD228: 'SyncM::GetSyncEStatusReq',
    0xD229: 'SyncM::GetSyncEStatusResp',
    0xD22A: 'SyncM::GetPtpStatusReq',
    0xD22B: 'SyncM::GetPtpStatusResp',
    0xD22C: 'SyncM::StopSyncEReq',
    0xD22D: 'SyncM::StopSyncEResp',
    0xD22E: 'SyncM::StopPtpReq',
    0xD22F: 'SyncM::StopPtpResp',
    0xD230: 'SyncM::StatusInd'
};

function l2l1_decode_msg( l2l1, pktEnd ) {
    let off1 = 0, off2 = 0, off3 = 0, off4 = 0;
    let len1 = 0, len2 = 0, len3 = 0, len4 = 0;
    switch( l2l1.message ) {
        case 0x0001: { // L1::PingPongReq
                l2l1.data = l2l1_getU32( 0 );
            }
            break;
        case 0x0002: { // L1::EchoReq
                l2l1.payload = l2l1_getU8Array( 0, 64 );
            }
            break;
        case 0x0003: { // L1::EchoResp
                l2l1.payload = l2l1_getU8Array( 0, 64 );
            }
            break;
        case 0x0004: { // L1::LoopReq
                l2l1.next_slot_config_sfn = l2l1_getU16( 0 );
                l2l1.next_slot_config_slot = l2l1_getU8( 2 );
                l2l1.next_pattern_config_sfn = l2l1_getU16( 4 );
                l2l1.next_pattern_config_slot = l2l1_getU8( 6 );
                l2l1.next_pbch_sfn = l2l1_getU16( 8 );
                l2l1.next_pbch_slot = l2l1_getU8( 10 );
                l2l1.next_pucch_sfn = l2l1_getU16( 12 );
                l2l1.next_pucch_slot = l2l1_getU8( 14 );
                l2l1.next_pusch_sfn = l2l1_getU16( 16 );
                l2l1.next_pusch_slot = l2l1_getU8( 18 );
                l2l1.next_ul_meas_sfn = l2l1_getU16( 20 );
                l2l1.next_ul_meas_slot = l2l1_getU8( 22 );
            }
            break;
        case 0x0005: { // L1::UlMeasReq
                l2l1.subCellIndex = l2l1_getU32( 0 );
                l2l1.queueEntry = l2l1_getU32( 4 );
                l2l1.measBufType = l2l1_getU32( 8 );
            }
            break;
        case 0x0006: { // L1::WakeupReq
                l2l1.subcell_index = l2l1_getU32( 0 );
            }
            break;
        case 0x0007: { // L1::StartupLoopReq
                l2l1.state = l2l1_getU32( 0 );
                l2l1.count = l2l1_getU32( 4 );
            }
            break;
        case 0x0008: { // L1::SnapshotFileCreationReq
                l2l1.data = l2l1_getU32( 0 );
            }
            break;
        case 0x0009: { // L1::LatencyEventReq
                l2l1.data = l2l1_getU32( 0 );
            }
            break;
        case 0x000A: { // L1::DmaEndInd
                l2l1.data = l2l1_getU32( 0 );
            }
            break;
        case 0x000B: { // L1::LaWakeupReq
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                l2l1.subcell_index = l2l1_getU32( 4 );
                l2l1.type_info = l2l1_getU16( 8 );
                l2l1.param = l2l1_getU8( 10 );
            }
            break;
        case 0x000C: { // L1::DmaStartTestReq
                l2l1.data = l2l1_getU32( 0 );
            }
            break;
        case 0x000D: { // L1::NrtRxSubcellResetReq
                l2l1.subcell_id = l2l1_getU8( 0 );
            }
            break;
        case 0x000E: { // L1::SyncInd
                l2l1.delay_nSec = l2l1_getI32( 0 );
                l2l1.sfn = l2l1_getU16( 4 );
                l2l1.subcellId = l2l1_getU8( 6 );
                l2l1.slot = l2l1_getU8( 7 );
            }
            break;
        case 0x0101: { // DlCell::SetupResp
                l2l1.subcellId = l2l1_getU8( 0 );
            }
            break;
        case 0x0102: { // DlCell::DeleteReq
                l2l1.subcellId = l2l1_getU8( 0 );
            }
            break;
        case 0x0103: { // DlCell::DeleteResp
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.status = l2l1_getU8( 1 );
            }
            break;
        case 0x0104: { // DlData::AddressReq
                l2l1.subcellId = l2l1_getU8( 0 );
            }
            break;
        case 0x0108: { // DlData::PdschPayloadTbSendReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.rnti = l2l1_getU16( 6 );
                l2l1.tbIndex = l2l1_getU32( 8 );
                l2l1.tbFragmentOffset_bits = l2l1_getU32( 12 );
                l2l1.payload = l2l1_getU8Array( 16 + l2l1_getU32( 16 ), l2l1_getU32( 20 ) );
            }
            break;
        case 0x0121: { // DlData::AddressResp
                l2l1.subcellId = l2l1_getU8( 0 );
                let l1DlAddresses = l2l1.l1DlAddresses = {};
                l1DlAddresses.ssBlockSendReq = l2l1_getU32( 4 );
                l1DlAddresses.slotTypeReq = l2l1_getU32( 8 );
                l1DlAddresses.pdschSendReq = l2l1_getU32( 12 );
                l1DlAddresses.pdschPayloadTbSendReq = l2l1_getU32( 16 );
                l1DlAddresses.patternConfigReq = l2l1_getU32( 20 );
                l1DlAddresses.pdcchSendReq = l2l1_getU32( 24 );
                l1DlAddresses.csiRsSendReq = l2l1_getU32( 28 );
            }
            break;
        case 0x0122: { // DlData::SlotTypeReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.slotType = l2l1_getU8( 5 );
                l2l1.pwrReductionPerSymb_dB = l2l1_getU8Array( 8, 14 );
            }
            break;
        case 0x0127: { // DlData::SsBlockSendReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.activeSsBlocks = l2l1_getU8( 5 );
                l2l1.threeLsbSsbIndex = l2l1_getU8( 6 );
                l2l1.precodingVectorIndex = l2l1_getU8( 7 );
                l2l1.dataPayload = l2l1_getU8Array( 8, 4 );
                l2l1.ceAxCIndex = l2l1_getU8Array( 12, 2 );
                l2l1.patternId = l2l1_getU16Array( 16, 4 );
            }
            break;
        case 0x012A: { // DlData::CsiRsSendReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                off1 = 8 + l2l1_getU32( 8 );
                len1 = l2l1_getU32( 12 );
                let csiRsResources = l2l1.csiRsResources = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let csiRsResourcesItem = {};
                    csiRsResourcesItem.startSymbol = l2l1_getU8( off1 );
                    csiRsResourcesItem.csiRsScramblingSequenceInt = l2l1_getU16( off1 + 2 );
                    csiRsResourcesItem.density = l2l1_getU8( off1 + 4 );
                    csiRsResourcesItem.densityDot5PrbLocation = l2l1_getU8( off1 + 5 );
                    csiRsResourcesItem.startPrb = l2l1_getU16( off1 + 6 );
                    csiRsResourcesItem.numOfPrb = l2l1_getU16( off1 + 8 );
                    csiRsResourcesItem.csiRsConfig = l2l1_getU8( off1 + 10 );
                    csiRsResourcesItem.freqDomainAllocationKi = l2l1_getU16( off1 + 12 );
                    csiRsResourcesItem.csiTransmitPower = l2l1_getI16( off1 + 14 );
                    csiRsResourcesItem.pwrReductionPerCsiRsResource_dB = l2l1_getU8( off1 + 16 );
                    csiRsResourcesItem.antennaStream = l2l1_getU8( off1 + 17 );
                    csiRsResourcesItem.trsInfo = l2l1_getU8( off1 + 18 );
                    csiRsResourcesItem.numCeAxCIndex = l2l1_getU8( off1 + 19 );
                    csiRsResourcesItem.ceAxCIndex = l2l1_getU8Array( off1 + 20, 4 );
                    csiRsResourcesItem.patternId = l2l1_getU16Array( off1 + 24, 4 );
                    off1 += 32
                    csiRsResources.push( csiRsResourcesItem );
                }
            }
            break;
        case 0x012B: { // DlData::PatternConfigReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.txRxBitmapPol = l2l1_getU16( 6 );
                l2l1.numOfPatternIdPol = l2l1_getU8( 8 );
                l2l1.numOfXpolBeams = l2l1_getU8( 9 );
                off1 = 12;
                let patternIdPolList = l2l1.patternIdPolList = [];
                for( let i1 = 0; i1 < 14; ++i1 ) {
                    let patternIdPolListItem = {};
                    patternIdPolListItem.patternIdPolListPerSymbolPerBeam = l2l1_getU16Array( off1, 8 );
                    off1 += 16
                    patternIdPolList.push( patternIdPolListItem );
                }
                l2l1.calibrationBitmap = l2l1_getU16( 236 );
            }
            break;
        case 0x012C: { // DlData::PdcchSendReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.beamId = l2l1_getU8( 5 );
                off1 = 8 + l2l1_getU32( 8 );
                len1 = l2l1_getU32( 12 );
                let dciInfo = l2l1.dciInfo = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let dciInfoItem = {};
                    dciInfoItem.rnti = l2l1_getU16( off1 );
                    dciInfoItem.startSymbolNumber = l2l1_getU8( off1 + 2 );
                    dciInfoItem.numOfSymbols = l2l1_getU8( off1 + 3 );
                    dciInfoItem.startCce = l2l1_getU8( off1 + 4 );
                    dciInfoItem.aggregationLevel = l2l1_getU8( off1 + 5 );
                    dciInfoItem.dmrsReferencePoint = l2l1_getU8( off1 + 6 );
                    dciInfoItem.pdcchPrecodingOption4x4 = l2l1_getU8( off1 + 7 );
                    dciInfoItem.dmrsScramblingSequenceInt = l2l1_getU16( off1 + 8 );
                    dciInfoItem.pdcchDciTransmitPower = l2l1_getI16( off1 + 10 );
                    dciInfoItem.coresetFreqDomain = l2l1_getU64( off1 + 16 );
                    dciInfoItem.cceRegMappingType = l2l1_getU8( off1 + 24 );
                    dciInfoItem.pdcchPrecodingOption2x2 = l2l1_getU8( off1 + 25 );
                    dciInfoItem.nShiftModNumOfRegBundles = l2l1_getU16( off1 + 26 );
                    dciInfoItem.interleaverRows = l2l1_getU8( off1 + 28 );
                    dciInfoItem.regBundleSize = l2l1_getU8( off1 + 29 );
                    dciInfoItem.precoderGranularity = l2l1_getU8( off1 + 30 );
                    dciInfoItem.coresetFreqDomainRbShift = l2l1_getU8( off1 + 31 );
                    dciInfoItem.dciSize = l2l1_getU8( off1 + 32 );
                    dciInfoItem.numCeAxCIndex = l2l1_getU8( off1 + 33 );
                    dciInfoItem.ceAxCIndex = l2l1_getU8Array( off1 + 36, 4 );
                    dciInfoItem.patternId = l2l1_getU16Array( off1 + 40, 2 );
                    dciInfoItem.dciPayload = l2l1_getU8Array( off1 + 44, 18 );
                    off1 += 64
                    dciInfo.push( dciInfoItem );
                }
            }
            break;
        case 0x012D: { // DlCell::SetupReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.dlSubcellType = l2l1_getU8( 1 );
                l2l1.dlMimoMode = l2l1_getU8( 2 );
                l2l1.physCellId = l2l1_getU16( 4 );
                l2l1.dlBandwidth = l2l1_getU16( 6 );
                l2l1.scs = l2l1_getU8( 8 );
                l2l1.ssBlockPower = l2l1_getI16( 10 );
                l2l1.ssBlockPrbOffset = l2l1_getU8( 12 );
                l2l1.ssBlockSubcarrierOffset = l2l1_getU8( 13 );
                l2l1.ssBlockConfiguration = l2l1_getU8( 14 );
                l2l1.phaseCompensationLutIndex = l2l1_getU16Array( 16, 112 );
                l2l1.ssBlockPhaseCompensationLutIndex = l2l1_getU16Array( 240, 224 );
                l2l1.dlSubcellPosition = l2l1_getU8( 688 );
                l2l1.eCpriLink = l2l1_getU8( 689 );
                l2l1.numCeAxCId = l2l1_getU8( 690 );
                l2l1.ceAxCId = l2l1_getU16Array( 692, 4 );
                l2l1.conformanceTestMode = l2l1_getU8( 700 );
                l2l1.actBeamforming = l2l1_getU8( 701 );
            }
            break;
        case 0x012E: { // DlData::PdschSendReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.sfn = l2l1_getU16( 2 );
                l2l1.slot = l2l1_getU8( 4 );
                l2l1.rnti = l2l1_getU16( 6 );
                l2l1.dmrsScramblingSequenceInt = l2l1_getU16( 8 );
                l2l1.dlDmrsConfigType = l2l1_getU8( 10 );
                l2l1.dlDmrsLen = l2l1_getU8( 11 );
                l2l1.dlDmrsMappingType = l2l1_getU8( 12 );
                l2l1.dlDmrsAddPos = l2l1_getU8( 13 );
                l2l1.dlDmrsTypeAPos = l2l1_getU8( 14 );
                l2l1.nscId = l2l1_getU8( 15 );
                l2l1.startSymbol = l2l1_getU8( 16 );
                l2l1.numOfPdschSymbols = l2l1_getU8( 17 );
                l2l1.antPort = l2l1_getU16( 18 );
                l2l1.mcs = l2l1_getU8( 20 );
                l2l1.mcsTable = l2l1_getU8( 21 );
                l2l1.spatialMode = l2l1_getU8( 22 );
                l2l1.codebookIndex = l2l1_getU8( 23 );
                l2l1.startPrb = l2l1_getU16( 24 );
                l2l1.numOfPrb = l2l1_getU16( 26 );
                l2l1.dlPtrsFlag = l2l1_getU8( 28 );
                l2l1.dlPtrsTimeDensity = l2l1_getU8( 29 );
                l2l1.dlPtrsFrequencyDensity = l2l1_getU8( 30 );
                l2l1.dlPtrsNumOfPorts = l2l1_getU8( 31 );
                l2l1.dlPtrsResElemOffset = l2l1_getU8( 32 );
                l2l1.offsetRbDmrs = l2l1_getU8( 33 );
                l2l1.pdschTbTransmitPower = l2l1_getI16( 34 );
                l2l1.pdschBundleSize = l2l1_getU16( 36 );
                l2l1.baseGraph = l2l1_getU8( 38 );
                l2l1.numOfCodeBlocks = l2l1_getU8( 39 );
                l2l1.codeBlockSize = l2l1_getU16( 40 );
                l2l1.numOfFillerBits = l2l1_getU16( 42 );
                l2l1.liftSize = l2l1_getU16( 44 );
                l2l1.liftSizeSetIndex = l2l1_getU8( 46 );
                l2l1.liftSizeColumnIndex = l2l1_getU8( 47 );
                l2l1.modulationOrder = l2l1_getU8( 48 );
                l2l1.rvIndex = l2l1_getU8( 49 );
                l2l1.ncb = l2l1_getU16( 50 );
                l2l1.k0divZ = l2l1_getU8( 52 );
                l2l1.numOfLayers = l2l1_getU8( 53 );
                l2l1.tbIndex = l2l1_getU32( 56 );
                l2l1.tbStartOffset_bits = l2l1_getU32( 60 );
                l2l1.tbSize_bits = l2l1_getU32( 64 );
                l2l1.numOfDmrsCdmGroupWithoutData = l2l1_getU8( 68 );
                l2l1.rbgSize = l2l1_getU8( 69 );
                l2l1.rbgSizeFirst = l2l1_getU8( 70 );
                l2l1.rat0Bitmap = l2l1_getU32( 72 );
                l2l1.i1Codebook4AntPorts = l2l1_getU8Array( 76, 3 );
                l2l1.i2Codebook4AntPorts = l2l1_getU8( 80 );
                l2l1.pdschClPrecodingOption4x4 = l2l1_getU8( 81 );
                l2l1.numCeAxCIndex = l2l1_getU8( 82 );
                l2l1.ceAxCIndex = l2l1_getU8Array( 84, 4 );
                l2l1.patternId = l2l1_getU16Array( 88, 2 );
            }
            break;
        case 0x0201: { // UlCell::SetupResp
                l2l1.subcellId = l2l1_getU8( 0 );
            }
            break;
        case 0x0202: { // UlCell::DeleteReq
                l2l1.subcellId = l2l1_getU8( 0 );
            }
            break;
        case 0x0203: { // UlCell::DeleteResp
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.status = l2l1_getU8( 1 );
            }
            break;
        case 0x0218: { // UlData::PuschReceiveRespHarqU
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                    len2 = l2l1_getU32( off1 + 8 );
                    let grants = subcellsItem.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        grantsItem.rnti = l2l1_getU16( off2 );
                        grantsItem.crc = l2l1_getU8( off2 + 2 );
                        grantsItem.dtx = l2l1_getU8( off2 + 3 );
                        grantsItem.harqProcessIndex = l2l1_getU8( off2 + 4 );
                        grantsItem.absoluteHarqProcessIndex = l2l1_getU16( off2 + 6 );
                        off2 += 8
                        grants.push( grantsItem );
                    }
                    off1 += 12
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0219: { // UlData::PrachReceiveInd
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                    off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                    len2 = l2l1_getU32( off1 + 12 );
                    let detectedPrachPreambles = subcellsItem.detectedPrachPreambles = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let detectedPrachPreamblesItem = {};
                        detectedPrachPreamblesItem.prachPreambleIndex = l2l1_getU8( off2 );
                        detectedPrachPreamblesItem.prachPreambleTimeOccasion = l2l1_getU8( off2 + 1 );
                        detectedPrachPreamblesItem.prachPreambleFreqOccasion = l2l1_getU8( off2 + 2 );
                        detectedPrachPreamblesItem.initialTa = l2l1_getU16( off2 + 4 );
                        detectedPrachPreamblesItem.peakMetric = l2l1_getF32( off2 + 8 );
                        off2 += 12
                        detectedPrachPreambles.push( detectedPrachPreamblesItem );
                    }
                    off1 += 16
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0222: { // UlData::PrachReceiveIndTst
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                    off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                    len2 = l2l1_getU32( off1 + 12 );
                    let detectedPrachPreambles = subcellsItem.detectedPrachPreambles = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let detectedPrachPreamblesItem = {};
                        detectedPrachPreamblesItem.prachPreambleIndex = l2l1_getU8( off2 );
                        detectedPrachPreamblesItem.prachPreambleTimeOccasion = l2l1_getU8( off2 + 1 );
                        detectedPrachPreamblesItem.prachPreambleFreqOccasion = l2l1_getU8( off2 + 2 );
                        detectedPrachPreamblesItem.initialTa = l2l1_getU16( off2 + 4 );
                        detectedPrachPreamblesItem.peakMetric = l2l1_getF32( off2 + 8 );
                        off2 += 12
                        detectedPrachPreambles.push( detectedPrachPreamblesItem );
                    }
                    off1 += 16
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x022B: { // UlData::AddressResp
                l2l1.subcellId = l2l1_getU8( 0 );
                let l1UlAddresses = l2l1.l1UlAddresses = {};
                l1UlAddresses.puschReceiveReq = l2l1_getU32( 4 );
                l1UlAddresses.pucchReceiveReq = l2l1_getU32( 8 );
                l1UlAddresses.srsReceiveReq = l2l1_getU32( 12 );
                l1UlAddresses.prachReceiveReq = l2l1_getU32( 16 );
            }
            break;
        case 0x022E: { // UlData::SrsReceiveRespPs
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.rnti = l2l1_getU16( off1 + 2 );
                    subcellsItem.ulRank = l2l1_getU8( off1 + 4 );
                    subcellsItem.ulPmiRank1 = l2l1_getU8( off1 + 5 );
                    subcellsItem.ulPmiRank1Sinr = l2l1_getF32( off1 + 8 );
                    subcellsItem.ulPmiRank2 = l2l1_getU8( off1 + 12 );
                    subcellsItem.ulPmiRank2Sinr = l2l1_getF32Array( off1 + 16, 2 );
                    subcellsItem.snr = l2l1_getF32( off1 + 24 );
                    subcellsItem.dtx = l2l1_getU8( off1 + 28 );
                    subcellsItem.shortTermTaMetric = l2l1_getI16( off1 + 30 );
                    subcellsItem.shortTermTaPeakAmp = l2l1_getF32( off1 + 32 );
                    off1 += 36
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0235: { // UlData::PuschReceiveRespPs
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                    off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                    len2 = l2l1_getU32( off1 + 12 );
                    let grants = subcellsItem.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        grantsItem.rnti = l2l1_getU16( off2 );
                        grantsItem.harqProcessIndex = l2l1_getU8( off2 + 2 );
                        grantsItem.absoluteHarqProcessIndex = l2l1_getU16( off2 + 4 );
                        grantsItem.dtx = l2l1_getU8( off2 + 6 );
                        let shortTermCfoMetric = grantsItem.shortTermCfoMetric = {};
                        shortTermCfoMetric.I = l2l1_getF32( off2 + 8 );
                        shortTermCfoMetric.Q = l2l1_getF32( off2 + 12 );
                        grantsItem.shortTermTaMetric = l2l1_getI16( off2 + 16 );
                        grantsItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 20 );
                        grantsItem.rxPower = l2l1_getF32( off2 + 24 );
                        grantsItem.sinr = l2l1_getF32Array( off2 + 28, 2 );
                        grantsItem.rssi = l2l1_getF32( off2 + 36 );
                        grantsItem.ulPmiRank1 = l2l1_getU8( off2 + 40 );
                        grantsItem.ulPmiRank1Sinr = l2l1_getF32( off2 + 44 );
                        grantsItem.ulPmiRank2 = l2l1_getU8( off2 + 48 );
                        grantsItem.ulPmiRank2Sinr = l2l1_getF32Array( off2 + 52, 2 );
                        grantsItem.channelCorrMetric = l2l1_getF32Array( off2 + 60, 2 );
                        grantsItem.ulRank = l2l1_getU8( off2 + 68 );
                        grantsItem.uciCsiPart1Bits = l2l1_getU8Array( off2 + 72, 4 );
                        grantsItem.uciCsiPart2Bits = l2l1_getU8Array( off2 + 76, 2 );
                        off2 += 80
                        grants.push( grantsItem );
                    }
                    off1 += 16
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x023A: { // UlData::PuschReceiveRespLo
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                l2l1.subcellId = l2l1_getU8( 3 );
                l2l1.rnti = l2l1_getU16( 4 );
                l2l1.harqProcessIndex = l2l1_getU8( 6 );
                l2l1.absoluteHarqProcessIndex = l2l1_getU16( 8 );
                l2l1.data = l2l1_getU8Array( 12 + l2l1_getU32( 12 ), l2l1_getU32( 16 ) );
            }
            break;
        case 0x0240: { // UlData::PrachReceiveReq
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.prachPrbOffset = l2l1_getU16( off1 + 2 );
                    subcellsItem.prachOccasions = l2l1_getU16Array( off1 + 4, 8 );
                    off2 = off1 + 20 + l2l1_getU32( off1 + 20 );
                    len2 = l2l1_getU32( off1 + 24 );
                    let occasions = subcellsItem.occasions = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let occasionsItem = {};
                        occasionsItem.numCeAxCIndex = l2l1_getU8( off2 );
                        occasionsItem.ceAxCIndex = l2l1_getU8Array( off2 + 4, 4 );
                        occasionsItem.patternId = l2l1_getU16Array( off2 + 8, 2 );
                        off2 += 12
                        occasions.push( occasionsItem );
                    }
                    off1 += 28
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0241: { // UlData::SrsReceiveReq
                l2l1.addrSrsReceiveResp = l2l1_getU32( 0 );
                l2l1.sfn = l2l1_getU16( 4 );
                l2l1.slot = l2l1_getU8( 6 );
                off1 = 8 + l2l1_getU32( 8 );
                len1 = l2l1_getU32( 12 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    subcellsItem.srsSuMimoEnable = l2l1_getU8( off1 + 1 );
                    subcellsItem.srsBmEnable = l2l1_getU8( off1 + 2 );
                    let srsBmStruct = subcellsItem.srsBmStruct = {};
                    srsBmStruct.symbolPosition = l2l1_getU8( off1 + 4 );
                    srsBmStruct.sequenceId = l2l1_getU16( off1 + 6 );
                    srsBmStruct.numRbgPerSubband = l2l1_getU8( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    let bmSubbands = srsBmStruct.bmSubbands = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let bmSubbandsItem = {};
                        off3 = off2 + l2l1_getU32( off2 );
                        len3 = l2l1_getU32( off2 + 4 );
                        let srsBmCombsShifts = bmSubbandsItem.srsBmCombsShifts = [];
                        for( let i3 = 0; i3 < len3; ++i3 ) {
                            let srsBmCombsShiftsItem = {};
                            srsBmCombsShiftsItem.bmComb = l2l1_getU8( off3 );
                            srsBmCombsShiftsItem.bmCyclicShift = l2l1_getU8( off3 );
                            off3 += 4
                            srsBmCombsShifts.push( srsBmCombsShiftsItem );
                        }
                        bmSubbandsItem.srsBmSubbandId = l2l1_getU8( off2 + 8 );
                        bmSubbandsItem.patternId = l2l1_getU16Array( off2 + 12, 2 );
                        bmSubbandsItem.startPrb = l2l1_getU16( off2 + 16 );
                        off2 += 20
                        bmSubbands.push( bmSubbandsItem );
                    }
                    off2 = off1 + 20 + l2l1_getU32( off1 + 20 );
                    len2 = l2l1_getU32( off1 + 24 );
                    let srsBands = subcellsItem.srsBands = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsBandsItem = {};
                        let eCpriConfigStruct = srsBandsItem.eCpriConfigStruct = {};
                        eCpriConfigStruct.numCeAxCIndex = l2l1_getU8( off2 );
                        eCpriConfigStruct.ceAxCIndex = l2l1_getU8Array( off2 + 4, 4 );
                        eCpriConfigStruct.patternId = l2l1_getU16Array( off2 + 8, 2 );
                        let srsSuMimoStruct = srsBandsItem.srsSuMimoStruct = {};
                        srsSuMimoStruct.rnti = l2l1_getU16( off2 + 12 );
                        srsSuMimoStruct.symbolPosition = l2l1_getU8( off2 + 14 );
                        srsSuMimoStruct.transmissionComb = l2l1_getU8( off2 + 15 );
                        srsSuMimoStruct.transmissionCombId = l2l1_getU8( off2 + 16 );
                        srsSuMimoStruct.srsBandwidth = l2l1_getU8( off2 + 17 );
                        srsSuMimoStruct.srsBandwidthConfig = l2l1_getU8( off2 + 18 );
                        srsSuMimoStruct.freqDomainPosition = l2l1_getU8( off2 + 19 );
                        srsSuMimoStruct.freqDomainShift = l2l1_getU16( off2 + 20 );
                        srsSuMimoStruct.sequenceId = l2l1_getU16( off2 + 22 );
                        srsSuMimoStruct.cyclicShift = l2l1_getU8( off2 + 24 );
                        srsSuMimoStruct.numOfSrsPorts = l2l1_getU8( off2 + 25 );
                        srsSuMimoStruct.patternId = l2l1_getU16Array( off2 + 28, 2 );
                        srsSuMimoStruct.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32( off2 + 32 );
                        srsSuMimoStruct.puschTransCoherence = l2l1_getU8( off2 + 36 );
                        off2 += 40
                        srsBands.push( srsBandsItem );
                    }
                    off1 += 28
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0243: { // UlData::AddressReq
                l2l1.subcellId = l2l1_getU8( 0 );
                let l2Addresses = l2l1.l2Addresses = {};
                l2Addresses.prachReceiveInd = l2l1_getU32( 4 );
            }
            break;
        case 0x0248: { // UlCell::SetupReq
                l2l1.subcellId = l2l1_getU8( 0 );
                l2l1.ulSubcellType = l2l1_getU8( 1 );
                l2l1.physCellId = l2l1_getU16( 2 );
                l2l1.ulBandwidth = l2l1_getU16( 4 );
                l2l1.scs = l2l1_getU8( 6 );
                l2l1.prachFormat = l2l1_getU8( 7 );
                l2l1.prachStartSymbol = l2l1_getU8( 8 );
                l2l1.prachScs = l2l1_getU8( 9 );
                l2l1.firstPrachRootSeqIndex = l2l1_getU16( 10 );
                l2l1.prachZeroCorrelationZoneConfig = l2l1_getU8( 12 );
                l2l1.prachSequenceType = l2l1_getU8( 13 );
                l2l1.dtxThresholdPrachSingleRx = l2l1_getU16( 14 );
                l2l1.dtxThresholdPrachTwoRx = l2l1_getU16( 16 );
                l2l1.prachCohCombLen = l2l1_getU8( 18 );
                l2l1.totalNumberOfRAPreambles = l2l1_getU8( 19 );
                l2l1.rxScalingFactor = l2l1_getI16( 20 );
                l2l1.pneRbThreshold = l2l1_getU16Array( 24, 29 );
                l2l1.dtxThresholdPuschSingleLayerList = l2l1_getU16Array( 84, 273 );
                l2l1.dtxThresholdPuschTwoLayerList = l2l1_getU16Array( 632, 273 );
                l2l1.dtxThresholdPucchFormat0 = l2l1_getU8Array( 1180, 12 );
                l2l1.dtxThresholdPucchSingleLayerList = l2l1_getU16Array( 1192, 22 );
                l2l1.dtxThresholdPucchTwoLayerList = l2l1_getU16Array( 1236, 22 );
                l2l1.pucchHoppingId = l2l1_getU16( 1280 );
                l2l1.dtxThresholdSrsTwoAntennaPorts = l2l1_getU16( 1282 );
                l2l1.phaseCompensationLutIndex = l2l1_getU16Array( 1284, 112 );
                l2l1.ulSubcellPosition = l2l1_getU8( 1508 );
                l2l1.eCpriLink = l2l1_getU8( 1509 );
                l2l1.numCeAxCId = l2l1_getU8( 1510 );
                l2l1.ceAxCId = l2l1_getU16Array( 1512, 4 );
                l2l1.digitalOutputEnabled = l2l1_getU8( 1520 );
                l2l1.digitalOutputType = l2l1_getU8( 1521 );
                l2l1.digitalOutputRate = l2l1_getU8( 1522 );
                l2l1.bbSelector = l2l1_getU8( 1523 );
                l2l1.frequencyShift7pt5khz = l2l1_getU8( 1524 );
            }
            break;
        case 0x0249: { // UlData::PuschReceiveReq
                l2l1.addrPuschReceiveRespPs = l2l1_getU32( 0 );
                l2l1.addrPuschReceiveRespLo = l2l1_getU32( 4 );
                l2l1.addrPuschReceiveRespHarqU = l2l1_getU32( 8 );
                l2l1.sfn = l2l1_getU16( 12 );
                l2l1.slot = l2l1_getU8( 14 );
                off1 = 16 + l2l1_getU32( 16 );
                len1 = l2l1_getU32( 20 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                    len2 = l2l1_getU32( off1 + 8 );
                    let grants = subcellsItem.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        grantsItem.tbSize_bits = l2l1_getU32( off2 );
                        grantsItem.rnti = l2l1_getU16( off2 + 4 );
                        grantsItem.ulDmrsConfigType = l2l1_getU8( off2 + 6 );
                        grantsItem.ulDmrsLen = l2l1_getU8( off2 + 7 );
                        grantsItem.ulDmrsMappingType = l2l1_getU8( off2 + 8 );
                        grantsItem.ulDmrsAddPos = l2l1_getU8( off2 + 9 );
                        grantsItem.ulDmrsTypeAPos = l2l1_getU8( off2 + 10 );
                        grantsItem.startSymbol = l2l1_getU8( off2 + 11 );
                        grantsItem.numOfPuschSymbols = l2l1_getU8( off2 + 12 );
                        grantsItem.startPrb = l2l1_getU16( off2 + 14 );
                        grantsItem.numOfPrb = l2l1_getU16( off2 + 16 );
                        grantsItem.mcs = l2l1_getU8( off2 + 18 );
                        grantsItem.mcsTable = l2l1_getU8( off2 + 19 );
                        grantsItem.antPort = l2l1_getU16( off2 + 20 );
                        grantsItem.spatialMode = l2l1_getU8( off2 + 22 );
                        grantsItem.codebookIndex = l2l1_getU8( off2 + 23 );
                        grantsItem.nscId = l2l1_getU8( off2 + 24 );
                        grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 + 26 );
                        grantsItem.ulPtrsFlag = l2l1_getU8( off2 + 28 );
                        grantsItem.ulPtrsTimeDensity = l2l1_getU8( off2 + 29 );
                        grantsItem.ulPtrsFrequencyDensity = l2l1_getU8( off2 + 30 );
                        grantsItem.ulPtrsNumOfPorts = l2l1_getU8( off2 + 31 );
                        grantsItem.ulPtrsResElemOffset = l2l1_getU8( off2 + 32 );
                        grantsItem.harqProcessIndex = l2l1_getU8( off2 + 33 );
                        grantsItem.absoluteHarqProcessIndex = l2l1_getU16( off2 + 34 );
                        grantsItem.freshHarqTrans = l2l1_getU8( off2 + 36 );
                        grantsItem.numOfUciCsiPart1Bits = l2l1_getU8( off2 + 37 );
                        grantsItem.numOfUciCsiPart1Symbols = l2l1_getU16( off2 + 38 );
                        grantsItem.numOfUciCsiPart2Bits = l2l1_getU8( off2 + 40 );
                        grantsItem.numOfUciCsiPart2Symbols = l2l1_getU16( off2 + 42 );
                        let longTermCfoMetric = grantsItem.longTermCfoMetric = {};
                        longTermCfoMetric.Re = l2l1_getF32( off2 + 44 );
                        longTermCfoMetric.Im = l2l1_getF32( off2 + 48 );
                        grantsItem.foeValid = l2l1_getU8( off2 + 52 );
                        grantsItem.baseGraph = l2l1_getU8( off2 + 53 );
                        grantsItem.numOfCodeBlocks = l2l1_getU8( off2 + 54 );
                        grantsItem.codeBlockSize = l2l1_getU16( off2 + 56 );
                        grantsItem.numOfFillerBits = l2l1_getU16( off2 + 58 );
                        grantsItem.liftSize = l2l1_getU16( off2 + 60 );
                        grantsItem.liftSizeSetIndex = l2l1_getU8( off2 + 62 );
                        grantsItem.liftSizeColumnIndex = l2l1_getU8( off2 + 63 );
                        grantsItem.modulationOrder = l2l1_getU8( off2 + 64 );
                        grantsItem.rvIndex = l2l1_getU8( off2 + 65 );
                        grantsItem.ncb = l2l1_getU16( off2 + 66 );
                        grantsItem.k0divZ = l2l1_getU8( off2 + 68 );
                        grantsItem.numOfLayers = l2l1_getU8( off2 + 69 );
                        grantsItem.puschTransCoherence = l2l1_getU8( off2 + 70 );
                        let eCpriConfigStruct = grantsItem.eCpriConfigStruct = {};
                        eCpriConfigStruct.numCeAxCIndex = l2l1_getU8( off2 + 72 );
                        eCpriConfigStruct.ceAxCIndex = l2l1_getU8Array( off2 + 76, 4 );
                        eCpriConfigStruct.patternId = l2l1_getU16Array( off2 + 80, 2 );
                        off2 += 84
                        grants.push( grantsItem );
                    }
                    off1 += 12
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x024B: { // UlData::SrsReceiveRespBmPs
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                l2l1.symbolPosition = l2l1_getU8( 3 );
                l2l1.subcellId = l2l1_getU8( 4 );
                l2l1.feScalingFactor = l2l1_getU32Array( 8, 8 );
                l2l1.data = l2l1_getU8Array( 40 + l2l1_getU32( 40 ), l2l1_getU32( 44 ) );
                l2l1.PaddingBytes = l2l1_getU8Array( 48, 8 );
            }
            break;
        case 0x024C: { // UlData::PucchReceiveReq
                l2l1.addrPucchReceiveRespPs = l2l1_getU32( 0 );
                l2l1.addrPucchReceiveRespHarqD = l2l1_getU32( 4 );
                l2l1.sfn = l2l1_getU16( 8 );
                l2l1.slot = l2l1_getU8( 10 );
                off1 = 12 + l2l1_getU32( 12 );
                len1 = l2l1_getU32( 16 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                    len2 = l2l1_getU32( off1 + 8 );
                    let pucchResources = subcellsItem.pucchResources = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let pucchResourcesItem = {};
                        pucchResourcesItem.rnti = l2l1_getU16( off2 );
                        pucchResourcesItem.pucchFormat = l2l1_getU8( off2 + 2 );
                        pucchResourcesItem.numOfLayers = l2l1_getU8( off2 + 3 );
                        pucchResourcesItem.numOfAntennaPorts = l2l1_getU8( off2 + 4 );
                        pucchResourcesItem.harqProcessIndex = l2l1_getU8( off2 + 5 );
                        pucchResourcesItem.startPrb = l2l1_getU16( off2 + 6 );
                        pucchResourcesItem.numOfPrb = l2l1_getU8( off2 + 8 );
                        pucchResourcesItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 + 10 );
                        pucchResourcesItem.dataScramblingInt = l2l1_getU16( off2 + 12 );
                        pucchResourcesItem.srBitDetection = l2l1_getU8( off2 + 14 );
                        pucchResourcesItem.nANPucch = l2l1_getU8( off2 + 15 );
                        pucchResourcesItem.numOfBitsOfUciInformation = l2l1_getU8( off2 + 16 );
                        pucchResourcesItem.numOfSymbols = l2l1_getU8( off2 + 17 );
                        pucchResourcesItem.firstSymbol = l2l1_getU8( off2 + 18 );
                        pucchResourcesItem.frequencyHopping = l2l1_getU8( off2 + 19 );
                        pucchResourcesItem.secondHopPrb = l2l1_getU16( off2 + 20 );
                        pucchResourcesItem.initialCyclicShift = l2l1_getU8( off2 + 22 );
                        pucchResourcesItem.additionalDmrs = l2l1_getU8( off2 + 23 );
                        pucchResourcesItem.timeDomainOcc = l2l1_getU8( off2 + 24 );
                        pucchResourcesItem.numCeAxCIndex = l2l1_getU8( off2 + 25 );
                        pucchResourcesItem.ceAxCIndex = l2l1_getU8Array( off2 + 28, 4 );
                        pucchResourcesItem.patternId = l2l1_getU16Array( off2 + 32, 2 );
                        off2 += 36
                        pucchResources.push( pucchResourcesItem );
                    }
                    off1 += 12
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x024D: { // UlData::PucchReceiveRespHarqD
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                    len2 = l2l1_getU32( off1 + 8 );
                    let pucchResources = subcellsItem.pucchResources = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let pucchResourcesItem = {};
                        pucchResourcesItem.startPrb = l2l1_getU16( off2 );
                        pucchResourcesItem.pucchFormat = l2l1_getU8( off2 + 2 );
                        pucchResourcesItem.harqProcessIndex = l2l1_getU8( off2 + 3 );
                        pucchResourcesItem.dtx = l2l1_getU8( off2 + 4 );
                        pucchResourcesItem.ackNack = l2l1_getU8Array( off2 + 8, 7 );
                        pucchResourcesItem.dtxMetric = l2l1_getU16( off2 + 16 );
                        pucchResourcesItem.dtxThreshold = l2l1_getU16( off2 + 18 );
                        pucchResourcesItem.rnti = l2l1_getU16( off2 + 20 );
                        pucchResourcesItem.crc = l2l1_getU8( off2 + 22 );
                        off2 += 24
                        pucchResources.push( pucchResourcesItem );
                    }
                    off1 += 12
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x024E: { // UlData::PucchReceiveRespPs
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                off1 = 4 + l2l1_getU32( 4 );
                len1 = l2l1_getU32( 8 );
                let subcells = l2l1.subcells = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let subcellsItem = {};
                    subcellsItem.subcellId = l2l1_getU8( off1 );
                    off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                    len2 = l2l1_getU32( off1 + 8 );
                    let pucchResources = subcellsItem.pucchResources = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let pucchResourcesItem = {};
                        pucchResourcesItem.startPrb = l2l1_getU16( off2 );
                        pucchResourcesItem.rnti = l2l1_getU16( off2 + 2 );
                        pucchResourcesItem.crc = l2l1_getU8( off2 + 4 );
                        pucchResourcesItem.dtx = l2l1_getU8( off2 + 5 );
                        pucchResourcesItem.pucchFormat = l2l1_getU8( off2 + 6 );
                        pucchResourcesItem.harqProcessIndex = l2l1_getU8( off2 + 7 );
                        pucchResourcesItem.shortTermTaMetric = l2l1_getI16( off2 + 8 );
                        pucchResourcesItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 12 );
                        pucchResourcesItem.rxPower = l2l1_getF32( off2 + 16 );
                        pucchResourcesItem.sinr = l2l1_getF32Array( off2 + 20, 2 );
                        pucchResourcesItem.uciBits = l2l1_getU8Array( off2 + 28, 7 );
                        pucchResourcesItem.srBit = l2l1_getU8( off2 + 36 );
                        pucchResourcesItem.noisePower = l2l1_getF32( off2 + 40 );
                        pucchResourcesItem.rssi = l2l1_getF32( off2 + 44 );
                        pucchResourcesItem.dtxMetric = l2l1_getU16( off2 + 48 );
                        pucchResourcesItem.dtxThreshold = l2l1_getU16( off2 + 50 );
                        off2 += 52
                        pucchResources.push( pucchResourcesItem );
                    }
                    off1 += 12
                    subcells.push( subcellsItem );
                }
            }
            break;
        case 0x0A00: { // L1Cpri::CpriAlarmInd
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.l1AlarmStates = l2l1_getU32( 4 );
            }
            break;
        case 0x0A01: { // L1Cpri::CpriConfigureLinksReq
                l2l1.l1_StartupTimer = l2l1_getU32( 0 );
                l2l1.numOfItems = l2l1_getU32( 4 );
                off1 = 12;
                len1 = l2l1_getU32( 8 );
                let cpriLink = l2l1.cpriLink = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let cpriLinkItem = {};
                    cpriLinkItem.cpriLink = l2l1_getU8( off1 );
                    cpriLinkItem.scramblingSeed = l2l1_getU32( off1 + 4 );
                    cpriLinkItem.cpriPointerP = l2l1_getU32( off1 + 8 );
                    cpriLinkItem.optLinkLength = l2l1_getU32( off1 + 12 );
                    off1 += 16
                    cpriLink.push( cpriLinkItem );
                }
                l2l1.dlCpriLinkMapConfig = l2l1_getU8( 268 );
                l2l1.ulCpriLinkMapConfig = l2l1_getU8( 269 );
            }
            break;
        case 0x0A02: { // L1Cpri::CpriConfigureLinksResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0x0A05: { // L1Cpri::CpriSetOutputReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.outputState = l2l1_getU8( 1 );
            }
            break;
        case 0x0A06: { // L1Cpri::CpriSetOutputResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.status = l2l1_getU8( 1 );
                l2l1.outputState = l2l1_getU8( 2 );
            }
            break;
        case 0x0A07: { // L1Cpri::CpriStateInd
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.cpriState = l2l1_getU8( 1 );
            }
            break;
        case 0x0A08: { // L1Cpri::CpriSubscribeReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.sicad = l2l1_getU32( 4 );
            }
            break;
        case 0x0A09: { // L1Cpri::CpriSubscribeResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.status = l2l1_getU8( 1 );
                l2l1.sicad = l2l1_getU32( 4 );
            }
            break;
        case 0x0A0A: { // L1Cpri::CpriDiscoveryInd
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.discoveryMessage = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            }
            break;
        case 0x0A0E: { // L1Cpri::CpriDelayConfigResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
            }
            break;
        case 0x0A0F: { // L1Cpri::CpriGetLinkParamReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.parameterMask = l2l1_getU16( 2 );
            }
            break;
        case 0x0A11: { // L1Cpri::CpriDelayConfigReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.downlinkFixedDelay = l2l1_getU32( 4 );
                l2l1.uplinkFixedDelay = l2l1_getU32( 8 );
                l2l1.dlFiberLengthCompensationOffset = l2l1_getU32( 12 );
                l2l1.ulFiberLengthCompensationOffset = l2l1_getU32( 16 );
                l2l1.fiberDelay = l2l1_getU32( 20 );
                l2l1.Nul = l2l1_getU16( 24 );
                l2l1.ParameterMask = l2l1_getU16( 26 );
                l2l1.nTaOffset = l2l1_getU16( 28 );
            }
            break;
        case 0x0A12: { // L1Cpri::CpriSetDiscoveryReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.bufferLen = l2l1_getU8( 1 );
                l2l1.discoveryMessage = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            }
            break;
        case 0x0A13: { // L1Cpri::CpriSetDiscoveryResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.status = l2l1_getU8( 1 );
            }
            break;
        case 0x0A14: { // L1Cpri::SetLinkPropertiesReq
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.parameterMask = l2l1_getU16( 2 );
                l2l1.LCVWindow = l2l1_getU32( 4 );
            }
            break;
        case 0x0A15: { // L1Cpri::SetLinkPropertiesResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
            }
            break;
        case 0x0A16: { // L1Cpri::CpriGetLinkParamResp
                l2l1.cpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
                l2l1.Ndl = l2l1_getU16( 2 );
                l2l1.uplinkOffset = l2l1_getI32( 4 );
                l2l1.downlinkOffset = l2l1_getI32( 8 );
                l2l1.cpriLoopbackDelay = l2l1_getU32( 12 );
                l2l1.parameterMask = l2l1_getU16( 16 );
                l2l1.LCVErrInWindow = l2l1_getU32( 20 );
                l2l1.LCVErrAccumulated = l2l1_getU32( 24 );
                l2l1.BERInWindow = l2l1_getF32( 28 );
                l2l1.BERAccumulated = l2l1_getF32( 32 );
            }
            break;
        case 0x0A30: { // L1ECpri::ConfigureLinksReq
                l2l1.numOfItems = l2l1_getU32( 0 );
                off1 = 8;
                len1 = l2l1_getU32( 4 );
                let eCpriLink = l2l1.eCpriLink = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let eCpriLinkItem = {};
                    eCpriLinkItem.eCpriLink = l2l1_getU8( off1 );
                    off1 += 4
                    eCpriLink.push( eCpriLinkItem );
                }
                l2l1.scs = l2l1_getU8( 72 );
            }
            break;
        case 0x0A31: { // L1ECpri::ConfigureLinksResp
                l2l1.state = l2l1_getU8( 0 );
            }
            break;
        case 0x0A32: { // L1ECpri::SubscribeReq
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.sicad = l2l1_getU32( 4 );
            }
            break;
        case 0x0A33: { // L1ECpri::SubscribeResp
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
                l2l1.sicad = l2l1_getU32( 4 );
            }
            break;
        case 0x0A34: { // L1ECpri::SetOutputReq
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.outputState = l2l1_getU8( 1 );
            }
            break;
        case 0x0A35: { // L1ECpri::SetOutputResp
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
                l2l1.outputState = l2l1_getU8( 2 );
            }
            break;
        case 0x0A36: { // L1ECpri::StateInd
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.eCpriState = l2l1_getU8( 1 );
            }
            break;
        case 0x0A37: { // L1ECpri::DelayConfigReq
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.tDlAdvanceUp = l2l1_getU32( 4 );
                l2l1.tDlAdvanceCp = l2l1_getU32( 8 );
                l2l1.tUlAdvanceCp = l2l1_getU32( 12 );
                l2l1.receiveWindowOpen = l2l1_getU32( 16 );
                l2l1.receiveWindowClose = l2l1_getU32( 20 );
                l2l1.nTaOffset = l2l1_getU16( 24 );
            }
            break;
        case 0x0A38: { // L1ECpri::DelayConfigResp
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
            }
            break;
        case 0x0A39: { // L1ECpri::ConfigureTransportReq
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.ruMacAddress = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
                l2l1.vlanId = l2l1_getU16( 16 );
            }
            break;
        case 0x0A3A: { // L1ECpri::ConfigureTransportResp
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
            }
            break;
        case 0x0A3B: { // L1ECpri::InitialDelayMeasReq
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.samplesPerMeas = l2l1_getU16( 2 );
                l2l1.sampleInterval = l2l1_getU32( 4 );
                l2l1.measInterval = l2l1_getU32( 8 );
                l2l1.changeThreshold = l2l1_getU32( 12 );
            }
            break;
        case 0x0A3C: { // L1ECpri::InitialDelayMeasResp
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.state = l2l1_getU8( 1 );
                l2l1.tdOneWayMin = l2l1_getU32( 4 );
                l2l1.tdOneWayMax = l2l1_getU32( 8 );
            }
            break;
        case 0x0A3D: { // L1ECpri::DelayMeasInd
                l2l1.eCpriLink = l2l1_getU8( 0 );
                l2l1.tdOneWayMin = l2l1_getU32( 4 );
                l2l1.tdOneWayMax = l2l1_getU32( 8 );
            }
            break;
        case 0x0A3E: { // L1ECpri::ConfigureMeasurementsReq
                l2l1.sicad = l2l1_getU32( 0 );
                l2l1.measIntervalMsgRcv = l2l1_getU8( 4 );
            }
            break;
        case 0x0A3F: { // L1ECpri::ConfigureMeasurementsResp
                l2l1.state = l2l1_getU8( 0 );
            }
            break;
        case 0x0A40: { // L1ECpri::MsgRcvCountersInd
                l2l1.numOfItems = l2l1_getU32( 0 );
                off1 = 8;
                len1 = l2l1_getU32( 4 );
                let MsgRcvCounters = l2l1.MsgRcvCounters = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let MsgRcvCountersItem = {};
                    MsgRcvCountersItem.eCpriLink = l2l1_getU8( off1 );
                    MsgRcvCountersItem.ceAxCId = l2l1_getU32( off1 + 4 );
                    MsgRcvCountersItem.msgRcvAll = l2l1_getU64( off1 + 8 );
                    MsgRcvCountersItem.msgRcvOnTime = l2l1_getU64( off1 + 16 );
                    MsgRcvCountersItem.msgRcvTooEarly = l2l1_getU64( off1 + 24 );
                    MsgRcvCountersItem.msgRcvTooLate = l2l1_getU64( off1 + 32 );
                    MsgRcvCountersItem.msgRcvCorrupt = l2l1_getU64( off1 + 40 );
                    MsgRcvCountersItem.msgRcvDuplicate = l2l1_getU64( off1 + 48 );
                    off1 += 56
                    MsgRcvCounters.push( MsgRcvCountersItem );
                }
            }
            break;
        case 0x0A5A: { // L1Log::AntennaSnapshotResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0x0A5D: { // L1Log::TraceReq
                let header = l2l1.header = {};
                header.physCellId = l2l1_getU16( 0 );
                header.trswEQID = l2l1_getU16( 2 );
                header.startStopReport = l2l1_getU8( 4 );
                header.outputMode = l2l1_getU8( 5 );
                off1 = 12;
                len1 = l2l1_getU32( 8 );
                let traces = l2l1.traces = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let tracesItem = {};
                    tracesItem.subtype = l2l1_getU16( off1 );
                    tracesItem.traceId = l2l1_getU16( off1 + 2 );
                    tracesItem.nbReports = l2l1_getU16( off1 + 4 );
                    off1 += 8
                    traces.push( tracesItem );
                }
            }
            break;
        case 0x0A5E: { // L1Log::TraceResp
                l2l1.physCellId = l2l1_getU16( 0 );
                l2l1.status = l2l1_getU8( 2 );
            }
            break;
        case 0x0A5F: { // L1Log::TraceInd
                l2l1.bcn = l2l1_getU64( 0 );
                l2l1.msgSeqNum = l2l1_getU16( 8 );
                l2l1.tracePayload = l2l1_getU8( 10 );
            }
            break;
        case 0x0A60: { // L1Log::ShowTraceListReq
                l2l1.physCellId = l2l1_getU16( 0 );
                l2l1.antSnapshotL1EventEnabled = l2l1_getU8( 2 );
            }
            break;
        case 0x0A61: { // L1Log::ShowTraceListResp
                l2l1.status = l2l1_getU8( 0 );
                l2l1.traceList = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            }
            break;
        case 0x0A62: { // L1Log::AntennaSnapshotConfigurationReq
                l2l1.numUlSubCellId = l2l1_getU8( 0 );
                l2l1.ulSubcellId = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
                l2l1.numDlSubCellId = l2l1_getU8( 12 );
                l2l1.dlSubcellId = l2l1_getU8Array( 20, l2l1_getU32( 16 ) );
                l2l1.AntSnapshotL1EventEnabled = l2l1_getU8( 24 );
            }
            break;
        case 0x0A63: { // L1Log::AntennaSnapshotConfigurationResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0x0A64: { // L1Log::AntennaSnapshotInd
                l2l1.bcnN = l2l1_getU64( 0 );
                l2l1.reportType = l2l1_getU8( 8 );
                l2l1.numberOfFiles = l2l1_getU8( 9 );
                off1 = 16;
                len1 = l2l1_getU32( 12 );
                let fileList = l2l1.fileList = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let fileListItem = {};
                    fileListItem.status = l2l1_getU8( off1 );
                    fileListItem.fileSize = l2l1_getU32( off1 + 4 );
                    fileListItem.fileName = l2l1_getU8Array( off1 + 12, l2l1_getU32( off1 + 8 ) );
                    off1 += 92
                    fileList.push( fileListItem );
                }
            }
            break;
        case 0x0A65: { // L1Log::AntennaSnapshotReq
                l2l1.sfn = l2l1_getU16( 0 );
                l2l1.slot = l2l1_getU8( 2 );
                l2l1.requestType = l2l1_getU8( 3 );
                l2l1.captureMode = l2l1_getU8( 4 );
                l2l1.oneFilePerPath = l2l1_getU8( 5 );
                l2l1.responseAck = l2l1_getU8( 6 );
            }
            break;
        case 0xD220: { // SyncM::StartPtpReq
                l2l1.defaultDsPriority1 = l2l1_getU8( 0 );
                l2l1.defaultDsPriority2 = l2l1_getU8( 1 );
                l2l1.defaultDsDomainNumber = l2l1_getU8( 2 );
                l2l1.stepsRemoved = l2l1_getU8( 3 );
                l2l1.logMinDelayReqInterval = l2l1_getI32( 4 );
                l2l1.logSyncInterval = l2l1_getI32( 8 );
                l2l1.logAnnounceInterval = l2l1_getI32( 12 );
                l2l1.transportMode = l2l1_getU8( 16 );
                l2l1.castMode = l2l1_getU8( 17 );
                l2l1.ptpEthMulticastAddress = l2l1_getU64( 24 );
                l2l1.clockIdentity = l2l1_getU64( 32 );
                l2l1.portNumberOffset = l2l1_getU8( 40 );
                l2l1.secondaryBcnOffset = l2l1_getI32( 44 );
                l2l1.clockClass = l2l1_getU8( 48 );
                l2l1.clockAccuracy = l2l1_getU8( 49 );
                l2l1.offsetScaledLogVariance = l2l1_getU16( 50 );
                l2l1.currentUtcOffset = l2l1_getI32( 52 );
                l2l1.currentUtcOffsetValid = l2l1_getU8( 56 );
                l2l1.leap59 = l2l1_getU8( 57 );
                l2l1.leap61 = l2l1_getU8( 58 );
                l2l1.timeTraceable = l2l1_getU8( 59 );
                l2l1.frequencyTraceable = l2l1_getU8( 60 );
                l2l1.ptpTimescale = l2l1_getU8( 61 );
                l2l1.timeSource = l2l1_getU8( 62 );
                l2l1.ptpECpriPort = l2l1_getU8Array( 68, l2l1_getU32( 64 ) );
            }
            break;
        case 0xD221: { // SyncM::StartPtpResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD222: { // SyncM::UpdatePtpConfigReq
                l2l1.defaultDsDomainNumber = l2l1_getU8( 0 );
                l2l1.ptpEthMulticastAddress = l2l1_getU64( 8 );
                l2l1.clockClass = l2l1_getU8( 16 );
                l2l1.clockAccuracy = l2l1_getU8( 17 );
                l2l1.offsetScaledLogVariance = l2l1_getU16( 18 );
                l2l1.currentUtcOffset = l2l1_getU32( 20 );
                l2l1.currentUtcOffsetValid = l2l1_getU8( 24 );
                l2l1.leap59 = l2l1_getU8( 25 );
                l2l1.leap61 = l2l1_getU8( 26 );
                l2l1.timeTraceable = l2l1_getU8( 27 );
                l2l1.frequencyTraceable = l2l1_getU8( 28 );
                l2l1.ptpTimescale = l2l1_getU8( 29 );
                l2l1.timeSource = l2l1_getU8( 30 );
                l2l1.ptpECpriPort = l2l1_getU8Array( 36, l2l1_getU32( 32 ) );
            }
            break;
        case 0xD223: { // SyncM::UpdatePtpConfigResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD224: { // SyncM::StartSyncEReq
                l2l1.g781NetworkOption = l2l1_getU8( 0 );
                l2l1.ssmQl = l2l1_getU8( 1 );
                l2l1.ssmSendingECpriPort = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            }
            break;
        case 0xD225: { // SyncM::StartSyncEResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD226: { // SyncM::UpdateSyncEConfigReq
                l2l1.g781NetworkOption = l2l1_getU8( 0 );
                l2l1.ssmQl = l2l1_getU8( 1 );
                l2l1.ssmSendingECpriPort = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            }
            break;
        case 0xD227: { // SyncM::UpdateSyncEConfigResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD228: { // SyncM::GetSyncEStatusReq
                l2l1.resetCounters = l2l1_getU8( 0 );
            }
            break;
        case 0xD229: { // SyncM::GetSyncEStatusResp
                l2l1.status = l2l1_getU8( 0 );
                off1 = 8;
                len1 = l2l1_getU32( 4 );
                let ssmSendingECpriPort = l2l1.ssmSendingECpriPort = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let ssmSendingECpriPortItem = {};
                    ssmSendingECpriPortItem.transmittedEsmcPackets = l2l1_getU32( off1 );
                    off1 += 4
                    ssmSendingECpriPort.push( ssmSendingECpriPortItem );
                }
            }
            break;
        case 0xD22A: { // SyncM::GetPtpStatusReq
                l2l1.resetCounters = l2l1_getU8( 0 );
            }
            break;
        case 0xD22B: { // SyncM::GetPtpStatusResp
                l2l1.status = l2l1_getU8( 0 );
                off1 = 8;
                len1 = l2l1_getU32( 4 );
                let ptpECpriPort = l2l1.ptpECpriPort = [];
                for( let i1 = 0; i1 < len1; ++i1 ) {
                    let ptpECpriPortItem = {};
                    ptpECpriPortItem.transmittedAnnouncePackets = l2l1_getU32( off1 );
                    ptpECpriPortItem.transmittedSyncPackets = l2l1_getU32( off1 + 4 );
                    ptpECpriPortItem.transmittedDelayRespPackets = l2l1_getU32( off1 + 8 );
                    ptpECpriPortItem.receivedDelayReqPackets = l2l1_getU32( off1 + 12 );
                    off1 += 16
                    ptpECpriPort.push( ptpECpriPortItem );
                }
            }
            break;
        case 0xD22C: { // SyncM::StopSyncEReq
                l2l1.dummy = l2l1_getI8( 0 );
            }
            break;
        case 0xD22D: { // SyncM::StopSyncEResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD22E: { // SyncM::StopPtpReq
                l2l1.dummy = l2l1_getI8( 0 );
            }
            break;
        case 0xD22F: { // SyncM::StopPtpResp
                l2l1.status = l2l1_getU8( 0 );
            }
            break;
        case 0xD230: { // SyncM::StatusInd
                l2l1.syncmasterStatus = l2l1_getU8( 0 );
            }
            break;
    }
}
