packetPropToStrMap['l2l1.message'] = {
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
    0xD230: 'SyncM::StatusInd',
    0xE002: 'L1::TestModeConfigReq',
    0xE003: 'L1::TestModeConfigResp',
    0xE004: 'L1::PingPongReq',
    0xE005: 'L1::EchoReq',
    0xE006: 'L1::EchoResp',
    0xE007: 'L1::LoopReq',
    0xE008: 'L1::UlMeasReq',
    0xE009: 'L1::WakeupReq',
    0xE00A: 'L1::StartupLoopReq',
    0xE00B: 'L1::SnapshotFileCreationReq',
    0xE00C: 'L1::LatencyEventReq',
    0xE00D: 'L1::DmaEndInd',
    0xE00E: 'L1::LaWakeupReq',
    0xE00F: 'L1::DmaStartTestReq',
    0xE010: 'L1::NrtRxSubcellResetReq',
    0xE011: 'L1::SyncInd',
    0xE101: 'DlData::PatternConfigReq',
    0xE10C: 'DlData::FastAntennaSnapshotResp',
    0xE10F: 'DlData::SsBlockSendReq',
    0xE110: 'DlData::CsiRsSendReq',
    0xE112: 'DlData::AddressResp',
    0xE113: 'DlData::PdcchSendReq',
    0xE115: 'DlData::FastAntennaSnapshotReq',
    0xE117: 'DlCell::SetupReq',
    0xE118: 'DlData::PdschSendReq',
    0xE119: 'DlCell::SetupResp',
    0xE11A: 'DlData::AddressReq',
    0xE11B: 'DlData::DiagnosticInd',
    0xE11C: 'DlPool::AddressReq',
    0xE11D: 'DlPool::AddressResp',
    0xE11E: 'DlPool::BbResourceReconfReq',
    0xE11F: 'DlPool::BbResourceReconfResp',
    0xE120: 'DlData::RimRsSendReq',
    0xE121: 'DlDataFH::PdcchSendReq',
    0xE122: 'DlDataFH::CsiRsSendReq',
    0xE123: 'DlDataFH::SsBlockSendReq',
    0xE124: 'DlCell::DeleteReq',
    0xE125: 'DlCell::DeleteResp',
    0xE126: 'DlData::PdschPayloadTbSendReq',
    0xE127: 'DlData::SlotTypeReq',
    0xE128: 'DlDataFH::PdschSendReq',
    0xE129: 'DlCell::ParameterReconfigurationReq',
    0xE12A: 'DlCell::ParameterReconfigurationResp',
    0xE12B: 'DlDataFH::SlotTypeReq',
    0xE12C: 'DlDataFH::RimRsSendReq',
    0xE12D: 'DlDataFH::PdschSendRespPs',
    0xE12E: 'DlData::PdschSendRespPs',
    0xE200: 'UlData::PuschReceiveRespHarqD',
    0xE208: 'UlData::PucchReceiveRespHarqD',
    0xE20B: 'UlData::PuschReceiveRespHarqU',
    0xE21C: 'UlData::FastAntennaSnapshotResp',
    0xE226: 'UlData::PucchReceiveReq',
    0xE231: 'UlData::PrachReceiveReq',
    0xE235: 'UlData::FastAntennaSnapshotReq',
    0xE237: 'UlData::SrsReceiveRespPs',
    0xE239: 'UlData::PuschReceiveRespLo',
    0xE24B: 'UlData::PuschReceiveRespPs',
    0xE24C: 'UlData::PucchReceiveRespPs',
    0xE24D: 'UlData::PrachReceiveInd',
    0xE24E: 'UlData::RimReceiveReq',
    0xE24F: 'UlData::RimReceiveRespPs',
    0xE250: 'UlData::AddressResp',
    0xE251: 'UlData::PuschReceiveReq',
    0xE253: 'UlCell::SetupReq',
    0xE254: 'UlCell::SetupResp',
    0xE255: 'UlData::SrsReceiveReq',
    0xE256: 'UlData::SrsReceiveRespBmPs',
    0xE257: 'UlData::AddressReq',
    0xE258: 'UlData::DiagnosticInd',
    0xE259: 'UlPool::AddressReq',
    0xE25A: 'UlPool::AddressResp',
    0xE25B: 'UlPool::BbResourceReconfReq',
    0xE25C: 'UlPool::BbResourceReconfResp',
    0xE25D: 'UlData::SrsReceiveRespBwvPs',
    0xE25E: 'UlData::PuschReceiveReqL1ru',
    0xE25F: 'UlDataFH::PuschReceiveReq',
    0xE260: 'UlDataFH::PuschReceiveRespCellPs',
    0xE261: 'UlDataFH::PuschReceiveRespUePs',
    0xE262: 'UlDataFH::SrsSuMimoReceiveReq',
    0xE263: 'UlDataFH::SrsSuMimoReceiveRespPs',
    0xE264: 'UlCell::DeleteReq',
    0xE265: 'UlCell::DeleteResp',
    0xE266: 'UlData::PrachReceiveIndTst',
    0xE267: 'UlDataFH::SrsBmReceiveReq',
    0xE268: 'UlDataFH::SrsBmReceiveRespPs',
    0xE269: 'UlData::SrsPosReceiveReq',
    0xE26A: 'UlData::SrsPosReceiveRespPs',
    0xE26B: 'UlData::SrsReceiveRespRtBfPs',
    0xE26C: 'UlDataFH::SrsRtBfReceiveReq',
    0xE26D: 'UlDataFH::SrsRtBfReceiveRespPs',
    0xE26E: 'UlDataFH::RimReceiveReq',
    0xE26F: 'UlDataFH::RimReceiveRespPs',
    0xE270: 'UlCell::ParameterReconfigurationReq',
    0xE271: 'UlCell::ParameterReconfigurationResp',
    0xE301: 'L1Cpri::CpriConfigureAxCInfoReq',
    0xE305: 'L1ECpri::API2ConfigureTransportReq',
    0xE306: 'L1ECpri::API2ConfigureTransportResp',
    0xE307: 'L1ECpri::DeleteTransportReq',
    0xE308: 'L1ECpri::DeleteTransportResp',
    0xE309: 'L1ECpri::DelayConfigReq',
    0xE30A: 'L1ECpri::ConfigureLinksReq',
    0xE30B: 'L1ECpri::ConfigureLinksResp',
    0xE30C: 'L1ECpri::SubscribeReq',
    0xE30D: 'L1ECpri::SubscribeResp',
    0xE30E: 'L1ECpri::SetOutputReq',
    0xE30F: 'L1ECpri::SetOutputResp',
    0xE311: 'L1Cpri::CpriDelayConfigReq',
    0xE312: 'L1Cpri::CpriGetLinkParamResp',
    0xE313: 'L1Cpri::CpriFrameSyncInd',
    0xE314: 'L1Cpri::CpriT14Ind',
    0xE315: 'L1ECpri::StateInd',
    0xE316: 'L1ECpri::DelayConfigResp',
    0xE317: 'L1ECpri::ConfigureTransportReq',
    0xE318: 'L1ECpri::ConfigureTransportResp',
    0xE319: 'L1ECpri::InitialDelayMeasReq',
    0xE31A: 'L1ECpri::InitialDelayMeasResp',
    0xE31B: 'L1ECpri::DelayMeasInd',
    0xE31C: 'L1ECpri::ConfigureMeasurementsReq',
    0xE31D: 'L1ECpri::ConfigureMeasurementsResp',
    0xE31E: 'L1ECpri::MsgRcvCountersInd',
    0xE31F: 'L1Cpri::CpriAlarmInd',
    0xE320: 'L1Cpri::CpriConfigureLinksReq',
    0xE321: 'L1Cpri::CpriConfigureLinksResp',
    0xE322: 'L1Cpri::CpriSetOutputReq',
    0xE323: 'L1Cpri::CpriSetOutputResp',
    0xE324: 'L1Cpri::CpriStateInd',
    0xE325: 'L1Cpri::CpriSubscribeReq',
    0xE326: 'L1Cpri::CpriSubscribeResp',
    0xE327: 'L1Cpri::CpriDiscoveryInd',
    0xE328: 'L1Cpri::CpriDelayConfigResp',
    0xE329: 'L1Cpri::CpriGetLinkParamReq',
    0xE32A: 'L1Cpri::CpriSetDiscoveryReq',
    0xE32B: 'L1Cpri::CpriSetDiscoveryResp',
    0xE32C: 'L1Cpri::SetLinkPropertiesResp',
    0xE32D: 'L1Cpri::CpriConfigureAxCInfoResp',
    0xE32E: 'L1Cpri::CpriDeleteAxCInfoReq',
    0xE32F: 'L1Cpri::CpriDeleteAxCInfoResp',
    0xE330: 'L1Cpri::CpriConfigureVsbReq',
    0xE331: 'L1Cpri::CpriConfigureVsbResp',
    0xE332: 'L1Cpri::CpriSubscribeVsbChangesReq',
    0xE333: 'L1Cpri::CpriSubscribeVsbChangesResp',
    0xE334: 'L1Cpri::CpriVsbDataInd',
    0xE335: 'L1Cpri::CpriSendVsbDataReq',
    0xE336: 'L1Cpri::CpriSendVsbDataResp',
    0xE337: 'L1Cpri::SetLinkPropertiesReq',
    0xE338: 'L1Cpri::CpriPortEthernetPointerInd',
    0xE339: 'L1Cpri::CpriFrameOffsetInd',
    0xE387: 'L1Fcp::DlUlChannelsReq',
    0xE391: 'L1ChannelStreamer::DeregisterReq',
    0xE392: 'L1ChannelStreamer::DeregisterResp',
    0xE393: 'L1ChannelStreamer::RegisterReq',
    0xE394: 'L1ChannelStreamer::RegisterResp',
    0xE395: 'L1ChannelStreamer::ReceiveInd',
    0xE396: 'L1ChannelStreamer::SendReq',
    0xE3B0: 'L1Log::TraceReq',
    0xE3B1: 'L1Log::ShowTraceListReq',
    0xE3B3: 'L1Log::AntennaSnapshotInd',
    0xE3B4: 'L1Log::TraceInd',
    0xE3B5: 'L1Log::TraceResp',
    0xE3B6: 'L1Log::SuspiciousEventInd',
    0xE3B7: 'L1Log::AntennaSnapshotConfigurationResp',
    0xE3B8: 'L1Log::AntennaSnapshotConfigurationReq',
    0xE3B9: 'L1Status::AutohealingSubscribeReq',
    0xE3BA: 'L1Status::AutohealingSubscribeResp',
    0xE3BB: 'L1Status::AutohealingStatusInd',
    0xE3BC: 'L1SyncSlave::StartPtpSlaveReq',
    0xE3BD: 'L1SyncSlave::StartPtpSlaveResp',
    0xE3BE: 'L1SyncSlave::SyncSlaveStatusInd',
    0xE3BF: 'L1Log::OverloadStatusInd',
    0xE3C0: 'L1Log::ActTraceOverloadReq',
    0xE3C1: 'L1Log::ActTraceOverloadResp',
    0xE3C2: 'L1Log::AntennaSnapshotStopInd',
    0xE3C3: 'L1MacSec::CreateConfigurationProfileReq',
    0xE3C4: 'L1MacSec::CreateConfigurationProfileResp',
    0xE3C5: 'L1MacSec::ConnectionSetupReq',
    0xE3C6: 'L1MacSec::ConnectionSetupResp',
    0xE3C7: 'L1MacSec::ConnectionDeleteReq',
    0xE3C8: 'L1MacSec::ConnectionDeleteResp',
    0xE3C9: 'L1MacSec::ConnectionStatusInd',
    0xE3CA: 'L1SyncSlave::GetPtpSlaveStatusReq',
    0xE3CB: 'L1SyncSlave::GetPtpSlaveStatusResp',
    0xE3CC: 'L1MacSec::CounterSubscribeReq',
    0xE3CD: 'L1MacSec::CounterSubscribeResp',
    0xE3CE: 'L1MacSec::CounterInd',
    0xE3CF: 'L1MacSec::CakRekeyInd',
    0xE3D0: 'L1MacSec::CakGenerationReq',
    0xE3D1: 'L1MacSec::CakGenerationResp',
    0xE3D2: 'L1PoolMgmt::L1PoolCleanupReq',
    0xE3D3: 'L1PoolMgmt::L1PoolCleanupResp',
    0xE3D4: 'L1Log::AntennaSnapshotReq',
    0xE3D5: 'L1Log::AntennaSnapshotResp',
    0xE3D6: 'L1Log::ShowTraceListResp',
    0xE3D7: 'L1Log::SuspiciousEventSicadReq',
    0xE3E4: 'L1Call::NrUlTestReportInd',
    0xE3E5: 'L1Call::LTEUlTestReportInd',
    0xE3F0: 'L1Config::SwConfigurationReq',
    0xE3F1: 'L1Config::SwConfigurationResp',
    0xE3F2: 'L1Config::AutohealingActivationReq',
    0xE3F3: 'L1Config::AutohealingActivationResp'
};

function l2l1_decode_msg( l2l1, pktEnd ) {
    let off1 = 0, off2 = 0, off3 = 0, off4 = 0, off5 = 0, off6 = 0;
    let len1 = 0, len2 = 0, len3 = 0, len4 = 0, len5 = 0, len6 = 0;
    let discriminator1 = 0, discriminator2 = 0, discriminator3 = 0, discriminator4 = 0, discriminator5 = 0, discriminator6 = 0;
    let version_offset1 = 0, version_offset2 = 0, version_offset3 = 0, version_offset4 = 0, version_offset5 = 0, version_offset6 = 0;
    let version_indicator1 = 0, version_indicator2 = 0, version_indicator3 = 0, version_indicator4 = 0, version_indicator5 = 0, version_indicator6 = 0;
    let element_size1 = 0, element_size2 = 0, element_size3 = 0, element_size4 = 0, element_size5 = 0, element_size6 = 0;
    switch( l2l1.message ) {
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
                off1 += 4;
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
                off1 += 16;
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
        case 0xE002: { // L1::TestModeConfigReq
            l2l1.operationType = l2l1_getU8( 0 );
        }
        break;
        case 0xE003: { // L1::TestModeConfigResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE004: { // L1::PingPongReq
            l2l1.data = l2l1_getU32( 0 );
        }
        break;
        case 0xE005: { // L1::EchoReq
            l2l1.payload = l2l1_getU8Array( 0, 64 );
        }
        break;
        case 0xE006: { // L1::EchoResp
            l2l1.payload = l2l1_getU8Array( 0, 64 );
        }
        break;
        case 0xE007: { // L1::LoopReq
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
        case 0xE008: { // L1::UlMeasReq
            l2l1.subCellIndex = l2l1_getU32( 0 );
            l2l1.queueEntry = l2l1_getU32( 4 );
            l2l1.measBufType = l2l1_getU32( 8 );
        }
        break;
        case 0xE009: { // L1::WakeupReq
            l2l1.subcell_index = l2l1_getU32( 0 );
        }
        break;
        case 0xE00A: { // L1::StartupLoopReq
            l2l1.state = l2l1_getU32( 0 );
            l2l1.count = l2l1_getU32( 4 );
        }
        break;
        case 0xE00B: { // L1::SnapshotFileCreationReq
            l2l1.data = l2l1_getU32( 0 );
        }
        break;
        case 0xE00C: { // L1::LatencyEventReq
            l2l1.data = l2l1_getU32( 0 );
        }
        break;
        case 0xE00D: { // L1::DmaEndInd
            l2l1.data = l2l1_getU32( 0 );
        }
        break;
        case 0xE00E: { // L1::LaWakeupReq
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.subcell_index = l2l1_getU32( 4 );
            l2l1.type_info = l2l1_getU16( 8 );
            l2l1.param = l2l1_getU8( 10 );
        }
        break;
        case 0xE00F: { // L1::DmaStartTestReq
            l2l1.data = l2l1_getU32( 0 );
        }
        break;
        case 0xE010: { // L1::NrtRxSubcellResetReq
            l2l1.subcell_id = l2l1_getU8( 0 );
        }
        break;
        case 0xE011: { // L1::SyncInd
            l2l1.delay_nSec = l2l1_getI32( 0 );
            l2l1.sfn = l2l1_getU16( 4 );
            l2l1.subcellId = l2l1_getU8( 6 );
            l2l1.slot = l2l1_getU8( 7 );
        }
        break;
        case 0xE101: { // DlData::PatternConfigReq
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
                off1 += 16;
                patternIdPolList.push( patternIdPolListItem );
            }
            l2l1.calibrationBitmap = l2l1_getU16( 236 );
            l2l1.bfcmOffset = l2l1_getU8( 238 );
        }
        break;
        case 0xE10C: { // DlData::FastAntennaSnapshotResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE10F: { // DlData::SsBlockSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            l2l1.activeSsBlocks = l2l1_getU8( 5 );
            l2l1.threeLsbSsbIndex = l2l1_getU8( 6 );
            l2l1.precodingVectorIndex = l2l1_getU8( 7 );
            l2l1.dataPayload = l2l1_getU8Array( 8, 4 );
            l2l1.ceAxCIndex = l2l1_getU8Array( 12, 4 );
            l2l1.patternId = l2l1_getU16Array( 16, 4 );
            l2l1.numCeAxcIndex = l2l1_getU8( 24 );
        }
        break;
        case 0xE110: { // DlData::CsiRsSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let csiRsResources = l2l1.csiRsResources = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let csiRsResourcesItem = {};
                csiRsResourcesItem.startSymbol = l2l1_getU8( off1 );
                csiRsResourcesItem.csiBestBeamPowerOffset = l2l1_getU8( off1 + 1 );
                csiRsResourcesItem.csiRsScramblingSequenceInt = l2l1_getU16( off1 + 2 );
                csiRsResourcesItem.density = l2l1_getU8( off1 + 4 );
                csiRsResourcesItem.densityDot5PrbLocation = l2l1_getU8( off1 + 5 );
                csiRsResourcesItem.startPrb = l2l1_getU16( off1 + 6 );
                csiRsResourcesItem.numOfPrb = l2l1_getU16( off1 + 8 );
                csiRsResourcesItem.csiRsConfig = l2l1_getU8( off1 + 10 );
                csiRsResourcesItem.csiRsPrecodingMatrix = l2l1_getU8( off1 + 11 );
                csiRsResourcesItem.freqDomainAllocationKi = l2l1_getU16( off1 + 12 );
                csiRsResourcesItem.csiTransmitPower = l2l1_getI16( off1 + 14 );
                csiRsResourcesItem.pwrReductionPerCsiRsResource_dB = l2l1_getU8( off1 + 16 );
                csiRsResourcesItem.antennaStream = l2l1_getU8( off1 + 17 );
                csiRsResourcesItem.trsInfo = l2l1_getU8( off1 + 18 );
                csiRsResourcesItem.numCeAxCIndex = l2l1_getU8( off1 + 19 );
                csiRsResourcesItem.ceAxCIndex = l2l1_getU8Array( off1 + 20, 4 );
                csiRsResourcesItem.patternId = l2l1_getU16Array( off1 + 24, 4 );
                off1 += 32;
                csiRsResources.push( csiRsResourcesItem );
            }
        }
        break;
        case 0xE112: { // DlData::AddressResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU8( 2 );
            l2l1.maxPdschPayloadSize = l2l1_getU8( 3 );
            let l1DlAddresses = l2l1.l1DlAddresses = {};
            l1DlAddresses.ssBlockSendReq = l2l1_getU32( 4 );
            l1DlAddresses.slotTypeReq = l2l1_getU32( 8 );
            l1DlAddresses.pdschSendReq = l2l1_getU32( 12 );
            l1DlAddresses.pdschPayloadTbSendReq = l2l1_getU32( 16 );
            l1DlAddresses.patternConfigReq = l2l1_getU32( 20 );
            l1DlAddresses.pdcchSendReq = l2l1_getU32( 24 );
            l1DlAddresses.csiRsSendReq = l2l1_getU32( 28 );
            l1DlAddresses.fastAntennaSnapshotReqAddress = l2l1_getU32( 32 );
            l1DlAddresses.rimRsSendReqAddress = l2l1_getU32( 36 );
        }
        break;
        case 0xE113: { // DlData::PdcchSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            l2l1.beamId = l2l1_getU8( 5 );
            l2l1.startDciIndex = l2l1_getU8( 6 );
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
                dciInfoItem.dciScramblingSequenceInit = l2l1_getU16( off1 + 12 );
                dciInfoItem.rachStatus = l2l1_getU8( off1 + 14 );
                dciInfoItem.dciBitset = l2l1_getU8( off1 + 15 );
                dciInfoItem.coresetFreqDomain = l2l1_getU64( off1 + 16 );
                dciInfoItem.cceRegMappingType = l2l1_getU8( off1 + 24 );
                dciInfoItem.polarizationSelection = l2l1_getU8( off1 + 25 );
                dciInfoItem.nShiftModNumOfRegBundles = l2l1_getU16( off1 + 26 );
                dciInfoItem.interleaverRows = l2l1_getU8( off1 + 28 );
                dciInfoItem.regBundleSize = l2l1_getU8( off1 + 29 );
                dciInfoItem.precoderGranularity = l2l1_getU8( off1 + 30 );
                dciInfoItem.coresetFreqDomainRbShift = l2l1_getU8( off1 + 31 );
                dciInfoItem.dciSize = l2l1_getU8( off1 + 32 );
                dciInfoItem.numCeAxCIndex = l2l1_getU8( off1 + 33 );
                dciInfoItem.dciScramblingRnti = l2l1_getU16( off1 + 34 );
                dciInfoItem.ceAxCIndex = l2l1_getU8Array( off1 + 36, 4 );
                dciInfoItem.patternId = l2l1_getU16Array( off1 + 40, 2 );
                dciInfoItem.dciPayload = l2l1_getU8Array( off1 + 44, 18 );
                off1 += 64;
                dciInfo.push( dciInfoItem );
            }
        }
        break;
        case 0xE115: { // DlData::FastAntennaSnapshotReq
            l2l1.addrDlFastAntennaSnapshotResp = l2l1_getU32( 0 );
            l2l1.dlSubCellId = l2l1_getU8( 4 );
            l2l1.sfn = l2l1_getU16( 6 );
            l2l1.slot = l2l1_getU8( 8 );
            l2l1.numOfEvents = l2l1_getU8( 9 );
            off1 = 12;
            let eventsList = l2l1.eventsList = [];
            for( let i1 = 0; i1 < 8; ++i1 ) {
                let eventsListItem = {};
                eventsListItem.crnti = l2l1_getU16( off1 );
                eventsListItem.eventNb = l2l1_getU8( off1 + 2 );
                eventsListItem.eventType = l2l1_getU8( off1 + 3 );
                off1 += 4;
                eventsList.push( eventsListItem );
            }
        }
        break;
        case 0xE117: { // DlCell::SetupReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.dlSubcellType = l2l1_getU8( 1 );
            l2l1.dlMimoMode = l2l1_getU8( 2 );
            l2l1.fronthaulMode = l2l1_getU8( 3 );
            l2l1.physCellId = l2l1_getU16( 4 );
            l2l1.dlBandwidth = l2l1_getU16( 6 );
            l2l1.scs = l2l1_getU8( 8 );
            l2l1.actReducedSsbSize = l2l1_getU8( 9 );
            l2l1.ssBlockPower = l2l1_getI16( 10 );
            l2l1.ssBlockPrbOffset = l2l1_getU8( 12 );
            l2l1.ssBlockSubcarrierOffset = l2l1_getU8( 13 );
            l2l1.ssBlockConfiguration = l2l1_getU8( 14 );
            off1 = 16 + l2l1_getU32( 16 );
            len1 = l2l1_getU32( 20 );
            let phaseCompensationLutIndex = l2l1.phaseCompensationLutIndex = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let phaseCompensationLutIndexItem = {};
                phaseCompensationLutIndexItem.phaseCompensationLutIndex = l2l1_getU16Array( off1, 112 );
                phaseCompensationLutIndexItem.rimRsPhaseCompensationLutIndex = l2l1_getU16Array( off1 + 224, 112 );
                off1 += 448;
                phaseCompensationLutIndex.push( phaseCompensationLutIndexItem );
            }
            l2l1.rimRsPhaseCompensationEcpriLutIndex = l2l1_getU16Array( 24, 112 );
            l2l1.ssBlockPhaseCompensationLutIndex = l2l1_getU16Array( 248, 224 );
            l2l1.dlSubcellPosition = l2l1_getU8( 696 );
            l2l1.eCpriLink = l2l1_getU8( 697 );
            l2l1.numCeAxCId = l2l1_getU8( 698 );
            l2l1.ceAxCId = l2l1_getU16Array( 700, 4 );
            l2l1.conformanceTestMode = l2l1_getU8( 708 );
            l2l1.actBeamforming = l2l1_getU8( 709 );
            l2l1.isLteCrsMappingEnable = l2l1_getU8( 710 );
            l2l1.numLteCrsPorts = l2l1_getU8( 711 );
            l2l1.reLteNuShift = l2l1_getU8( 712 );
            l2l1.lteDlBandwidth = l2l1_getU8( 713 );
            l2l1.actEcpriPhase2 = l2l1_getU8( 714 );
            l2l1.cpriDialectIndication = l2l1_getU8( 715 );
            l2l1.axcPosition = l2l1_getU32Array( 720, l2l1_getU32( 716 ) );
            l2l1.dlScPerCarrierPart = l2l1_getU16Array( 784 + l2l1_getU32( 784 ), l2l1_getU32( 788 ) );
            l2l1.dlEcpriFdBeamforming = l2l1_getU8( 792 );
            l2l1.dlSubcellPoolId = l2l1_getU8( 793 );
            l2l1.dlReferenceLevel = l2l1_getU16( 794 );
            l2l1.actDlEcpriPhase4 = l2l1_getU8( 796 );
            l2l1.actORANstep1 = l2l1_getU8( 797 );
            l2l1.actOranFDD = l2l1_getU8( 798 );
            l2l1.mantissaSize = l2l1_getU8( 799 );
            l2l1.dlIqCompression = l2l1_getU8( 800 );
            l2l1.dlActDownSampling = l2l1_getU8( 801 );
            l2l1.actDlEcpriExtType12 = l2l1_getU8( 802 );
            l2l1.actEcpri72eDl = l2l1_getU8( 803 );
            l2l1.l1SubpoolId = l2l1_getU16( 804 );
            l2l1.firstCellSlotId = l2l1_getU16( 806 );
            l2l1.cellSlotLength = l2l1_getU16( 808 );
            l2l1.actDlPrbMuting = l2l1_getU8( 810 );
            l2l1.numOfLogicalResourceIds = l2l1_getU8( 811 );
            l2l1.logicalResourceIds = l2l1_getU32Array( 812, 4 );
            l2l1.multiPurposeField = l2l1_getU16( 828 );
            l2l1.explicitPadding = l2l1_getU16( 830 );
        }
        break;
        case 0xE118: { // DlData::PdschSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            len1 = l2l1_getU8( 5 );
            off1 = 6 + l2l1_getU8( 6 );
            let grants = l2l1.grants = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let grantsItem = {};
                grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off1 );
                grantsItem.dlDmrsConfigType = l2l1_getU8( off1 + 2 );
                grantsItem.dlDmrsLen = l2l1_getU8( off1 + 3 );
                grantsItem.dlDmrsMappingType = l2l1_getU8( off1 + 4 );
                grantsItem.dlDmrsAddPos = l2l1_getU8( off1 + 5 );
                grantsItem.dlDmrsTypeAPos = l2l1_getU8( off1 + 6 );
                grantsItem.nscId = l2l1_getU8( off1 + 7 );
                grantsItem.startSymbol = l2l1_getU8( off1 + 8 );
                grantsItem.numOfPdschSymbols = l2l1_getU8( off1 + 9 );
                grantsItem.antPort = l2l1_getU16( off1 + 10 );
                grantsItem.mcs = l2l1_getU8( off1 + 12 );
                grantsItem.mcsTable = l2l1_getU8( off1 + 13 );
                grantsItem.spatialMode = l2l1_getU8( off1 + 14 );
                grantsItem.codebookIndex = l2l1_getU8( off1 + 15 );
                grantsItem.startPrb = l2l1_getU16( off1 + 16 );
                grantsItem.numOfPrb = l2l1_getU16( off1 + 18 );
                grantsItem.dlPtrsFlag = l2l1_getU8( off1 + 20 );
                grantsItem.dlPtrsTimeDensity = l2l1_getU8( off1 + 21 );
                grantsItem.dlPtrsFrequencyDensity = l2l1_getU8( off1 + 22 );
                grantsItem.dlPtrsNumOfPorts = l2l1_getU8( off1 + 23 );
                grantsItem.dlPtrsResElemOffset = l2l1_getU8( off1 + 24 );
                grantsItem.offsetRbDmrs = l2l1_getU8( off1 + 25 );
                grantsItem.pdschTbTransmitPower = l2l1_getI16( off1 + 26 );
                grantsItem.pdschBundleSize = l2l1_getU16( off1 + 28 );
                grantsItem.baseGraph = l2l1_getU8( off1 + 30 );
                grantsItem.numOfCodeBlocks = l2l1_getU8( off1 + 31 );
                grantsItem.codeBlockSize = l2l1_getU16( off1 + 32 );
                grantsItem.numOfFillerBits = l2l1_getU16( off1 + 34 );
                grantsItem.liftSize = l2l1_getU16( off1 + 36 );
                grantsItem.liftSizeSetIndex = l2l1_getU8( off1 + 38 );
                grantsItem.liftSizeColumnIndex = l2l1_getU8( off1 + 39 );
                grantsItem.modulationOrder = l2l1_getU8( off1 + 40 );
                grantsItem.rvIndex = l2l1_getU8( off1 + 41 );
                grantsItem.ncb = l2l1_getU16( off1 + 42 );
                grantsItem.k0divZ = l2l1_getU8( off1 + 44 );
                grantsItem.numOfLayers = l2l1_getU8( off1 + 45 );
                grantsItem.rnti = l2l1_getU16( off1 + 46 );
                grantsItem.tbIndex = l2l1_getU32( off1 + 48 );
                grantsItem.tbStartOffset_bits = l2l1_getU32( off1 + 52 );
                grantsItem.tbSize_bits = l2l1_getU32( off1 + 56 );
                grantsItem.numOfDmrsCdmGroupWithoutData = l2l1_getU8( off1 + 60 );
                grantsItem.polarizationSelection = l2l1_getU8( off1 + 61 );
                grantsItem.rbgSize = l2l1_getU8( off1 + 62 );
                grantsItem.rbgSizeFirst = l2l1_getU8( off1 + 63 );
                grantsItem.rat0Bitmap = l2l1_getU32( off1 + 64 );
                grantsItem.i1Codebook4AntPorts = l2l1_getU8Array( off1 + 68, 3 );
                grantsItem.i2Codebook4AntPorts = l2l1_getU8( off1 + 72 );
                grantsItem.pdschPrecodingOption4x4 = l2l1_getU8( off1 + 73 );
                grantsItem.numStreamIndex = l2l1_getU8( off1 + 74 );
                grantsItem.openLoopScheme = l2l1_getU8( off1 + 75 );
                grantsItem.streamIndex = l2l1_getU8Array( off1 + 76, 4 );
                grantsItem.patternId = l2l1_getU16Array( off1 + 80, 2 );
                grantsItem.numLteCrsMappingRes = l2l1_getU16( off1 + 84 );
                grantsItem.lteCrsOption = l2l1_getU8( off1 + 86 );
                grantsItem.rateMatchingOption = l2l1_getU8( off1 + 87 );
                grantsItem.numRateMatchingRes = l2l1_getU16( off1 + 88 );
                grantsItem.pdschScramblingSeqInit = l2l1_getU16( off1 + 90 );
                grantsItem.isLowPaprOptimizedPrecoding = l2l1_getU8( off1 + 92 );
                grantsItem.closedLoop3gppCodebook = l2l1_getU8( off1 + 93 );
                grantsItem.bestBeamPowerOffset = l2l1_getU8( off1 + 94 );
                grantsItem.rachStatus = l2l1_getU8( off1 + 95 );
                grantsItem.unscheduledAreaStartPrb = l2l1_getU16( off1 + 96 );
                grantsItem.unscheduledAreaNumOfPrb = l2l1_getU16( off1 + 98 );
                grantsItem.unscheduledAreaStartSymbol = l2l1_getU8( off1 + 100 );
                grantsItem.unscheduledAreaNumOfSymbols = l2l1_getU8( off1 + 101 );
                grantsItem.symbolRateMatchingPositions = l2l1_getU16( off1 + 102 );
                grantsItem.rtBfUeIndex = l2l1_getU16( off1 + 104 );
                grantsItem.eirpEnable = l2l1_getU8( off1 + 106 );
                grantsItem.bwvDumpGranularityInSubbands = l2l1_getU8( off1 + 107 );
                grantsItem.placeholder = l2l1_getU8Array( off1 + 108, 4 );
                off1 += 112;
                grants.push( grantsItem );
            }
        }
        break;
        case 0xE119: { // DlCell::SetupResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU32( 4 );
            l2l1.diagnosticInformation = l2l1_getU32Array( 8 + l2l1_getU32( 8 ), l2l1_getU32( 12 ) );
        }
        break;
        case 0xE11A: { // DlData::AddressReq
            l2l1.subcellId = l2l1_getU8( 0 );
            let l2DlAddresses = l2l1.l2DlAddresses = {};
            l2DlAddresses.diagnosticInd = l2l1_getU32( 4 );
            l2DlAddresses.pdschSendRespPs = l2l1_getU32( 8 );
        }
        break;
        case 0xE11B: { // DlData::DiagnosticInd
            l2l1.indType = l2l1_getU8( 0 );
        }
        break;
        case 0xE11C: { // DlPool::AddressReq
            l2l1.l1PoolId = l2l1_getU32( 0 );
        }
        break;
        case 0xE11D: { // DlPool::AddressResp
            l2l1.l1PoolId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
            l2l1.cause = l2l1_getU8( 5 );
            l2l1.dlBbPoolingResourceReconfReqAddress = l2l1_getU32( 8 );
        }
        break;
        case 0xE11E: { // DlPool::BbResourceReconfReq
            l2l1.addrBbPoolingResourceReconfResp = l2l1_getU32( 0 );
            l2l1.sfn = l2l1_getU16( 4 );
            l2l1.l1PoolId = l2l1_getU32( 8 );
            off1 = 12;
            let l1SubPool = l2l1.l1SubPool = [];
            for( let i1 = 0; i1 < 4; ++i1 ) {
                let l1SubPoolItem = {};
                l1SubPoolItem.l1SubPoolId = l2l1_getU16( off1 );
                let slowPrbPoolingParameters = l1SubPoolItem.slowPrbPoolingParameters = {};
                slowPrbPoolingParameters.l1SpMaxNumStreamPrb = l2l1_getU16( off1 + 4 );
                slowPrbPoolingParameters.l1SpMaxNumLayerPrb = l2l1_getU16( off1 + 6 );
                off1 += 8;
                l1SubPool.push( l1SubPoolItem );
            }
        }
        break;
        case 0xE11F: { // DlPool::BbResourceReconfResp
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.l1PoolId = l2l1_getU32( 4 );
            l2l1.status = l2l1_getU8( 8 );
            l2l1.cause = l2l1_getU8( 9 );
        }
        break;
        case 0xE120: { // DlData::RimRsSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            l2l1.rimRsScramblingSequenceInit = l2l1_getU32( 8 );
            l2l1.nscID = l2l1_getU16( 12 );
            l2l1.startSymbol = l2l1_getU8( 14 );
            l2l1.startPrb = l2l1_getU16( 16 );
            l2l1.numOfPrb = l2l1_getU16( 18 );
            l2l1.rimRsTransmitPower = l2l1_getI16( 20 );
            l2l1.antennaStream = l2l1_getU8( 22 );
            l2l1.subCarrierOffset = l2l1_getU8( 23 );
            let eCpriConfig = l2l1.eCpriConfig = {};
            eCpriConfig.numCeAxCIndex = l2l1_getU8( 24 );
            eCpriConfig.ceAxCIndex = l2l1_getU8Array( 28, 4 );
            eCpriConfig.patternId = l2l1_getU16Array( 32, 2 );
        }
        break;
        case 0xE121: { // DlDataFH::PdcchSendReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    l2l1.beamId = l2l1_getU8( off1 + 9 );
                    l2l1.startDciIndex = l2l1_getU8( off1 + 10 );
                    version_indicator2 = l2l1_getU32( off1 + 12 );
                    off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                    len2 = l2l1_getU32( off1 + 20 );
                    element_size2 = l2l1_getU32( off1 + 24 );
                    let dciInfo = l2l1.dciInfo = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let dciInfoItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                dciInfoItem.rnti = l2l1_getU16( off2 );
                                dciInfoItem.startSymbolNumber = l2l1_getU8( off2 + 2 );
                                dciInfoItem.numOfSymbols = l2l1_getU8( off2 + 3 );
                                dciInfoItem.startCce = l2l1_getU8( off2 + 4 );
                                dciInfoItem.aggregationLevel = l2l1_getU8( off2 + 5 );
                                dciInfoItem.dmrsReferencePoint = l2l1_getU8( off2 + 6 );
                                dciInfoItem.pdcchPrecodingOption4x4 = l2l1_getU8( off2 + 7 );
                                dciInfoItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 + 8 );
                                dciInfoItem.pdcchDciTransmitPower = l2l1_getI16( off2 + 10 );
                                dciInfoItem.dciScramblingSequenceInit = l2l1_getU16( off2 + 12 );
                                dciInfoItem.rachStatus = l2l1_getU8( off2 + 14 );
                                dciInfoItem.dciBitset = l2l1_getU8( off2 + 15 );
                                dciInfoItem.coresetFreqDomain = l2l1_getU64( off2 + 16 );
                                dciInfoItem.cceRegMappingType = l2l1_getU8( off2 + 24 );
                                dciInfoItem.polarizationSelection = l2l1_getU8( off2 + 25 );
                                dciInfoItem.nShiftModNumOfRegBundles = l2l1_getU16( off2 + 26 );
                                dciInfoItem.interleaverRows = l2l1_getU8( off2 + 28 );
                                dciInfoItem.regBundleSize = l2l1_getU8( off2 + 29 );
                                dciInfoItem.precoderGranularity = l2l1_getU8( off2 + 30 );
                                dciInfoItem.coresetFreqDomainRbShift = l2l1_getU8( off2 + 31 );
                                dciInfoItem.dciSize = l2l1_getU8( off2 + 32 );
                                dciInfoItem.numCeAxCIndex = l2l1_getU8( off2 + 33 );
                                dciInfoItem.dciScramblingRnti = l2l1_getU16( off2 + 34 );
                                dciInfoItem.dciIndex = l2l1_getU8( off2 + 36 );
                                dciInfoItem.ceAxCIndex = l2l1_getU8Array( off2 + 40 + l2l1_getU32( off2 + 40 ), l2l1_getU32( off2 + 44 ) );
                                dciInfoItem.patternId = l2l1_getU16Array( off2 + 48 + l2l1_getU32( off2 + 48 ), l2l1_getU32( off2 + 52 ) );
                            }
                            break;
                        }
                        off2 += element_size2;
                        dciInfo.push( dciInfoItem );
                    }
                }
                break;
            }
        }
        break;
        case 0xE122: { // DlDataFH::CsiRsSendReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    version_indicator2 = l2l1_getU32( off1 + 12 );
                    off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                    len2 = l2l1_getU32( off1 + 20 );
                    element_size2 = l2l1_getU32( off1 + 24 );
                    let csiRsResources = l2l1.csiRsResources = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let csiRsResourcesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                csiRsResourcesItem.startSymbol = l2l1_getU8( off2 );
                                csiRsResourcesItem.csiBestBeamPowerOffset = l2l1_getU8( off2 + 1 );
                                csiRsResourcesItem.csiRsScramblingSequenceInt = l2l1_getU16( off2 + 2 );
                                csiRsResourcesItem.density = l2l1_getU8( off2 + 4 );
                                csiRsResourcesItem.densityDot5PrbLocation = l2l1_getU8( off2 + 5 );
                                csiRsResourcesItem.startPrb = l2l1_getU16( off2 + 6 );
                                csiRsResourcesItem.numOfPrb = l2l1_getU16( off2 + 8 );
                                csiRsResourcesItem.csiRsConfig = l2l1_getU8( off2 + 10 );
                                csiRsResourcesItem.csiRsPrecodingMatrix = l2l1_getU8( off2 + 11 );
                                csiRsResourcesItem.freqDomainAllocationKi = l2l1_getU16( off2 + 12 );
                                csiRsResourcesItem.csiTransmitPower = l2l1_getI16( off2 + 14 );
                                csiRsResourcesItem.pwrReductionPerCsiRsResource_dB = l2l1_getU8( off2 + 16 );
                                csiRsResourcesItem.antennaStream = l2l1_getU8( off2 + 17 );
                                csiRsResourcesItem.trsInfo = l2l1_getU8( off2 + 18 );
                                csiRsResourcesItem.numCeAxCIndex = l2l1_getU8( off2 + 19 );
                                csiRsResourcesItem.ceAxCIndex = l2l1_getU8Array( off2 + 20 + l2l1_getU32( off2 + 20 ), l2l1_getU32( off2 + 24 ) );
                                csiRsResourcesItem.patternId = l2l1_getU16Array( off2 + 28 + l2l1_getU32( off2 + 28 ), l2l1_getU32( off2 + 32 ) );
                            }
                            break;
                        }
                        off2 += element_size2;
                        csiRsResources.push( csiRsResourcesItem );
                    }
                }
                break;
            }
        }
        break;
        case 0xE123: { // DlDataFH::SsBlockSendReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    l2l1.activeSsBlocks = l2l1_getU8( off1 + 9 );
                    l2l1.threeLsbSsbIndex = l2l1_getU8( off1 + 10 );
                    l2l1.precodingVectorIndex = l2l1_getU8( off1 + 11 );
                    l2l1.dataPayload = l2l1_getU8Array( off1 + 12, 4 );
                    l2l1.ceAxCIndex = l2l1_getU8Array( off1 + 16 + l2l1_getU32( off1 + 16 ), l2l1_getU32( off1 + 20 ) );
                    l2l1.patternId = l2l1_getU16Array( off1 + 24 + l2l1_getU32( off1 + 24 ), l2l1_getU32( off1 + 28 ) );
                    l2l1.numCeAxcIndex = l2l1_getU8( off1 + 32 );
                }
                break;
            }
        }
        break;
        case 0xE124: { // DlCell::DeleteReq
            l2l1.subcellId = l2l1_getU8( 0 );
        }
        break;
        case 0xE125: { // DlCell::DeleteResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU8( 2 );
        }
        break;
        case 0xE126: { // DlData::PdschPayloadTbSendReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            l2l1.rnti = l2l1_getU16( 6 );
            l2l1.tbIndex = l2l1_getU32( 8 );
            l2l1.tbFragmentOffset_bits = l2l1_getU32( 12 );
            l2l1.payload = l2l1_getU8Array( 16 + l2l1_getU32( 16 ), l2l1_getU32( 20 ) );
        }
        break;
        case 0xE127: { // DlData::SlotTypeReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            l2l1.slotType = l2l1_getU8( 5 );
            l2l1.pwrReductionPerSymb_dB = l2l1_getU8Array( 8, 14 );
        }
        break;
        case 0xE128: { // DlDataFH::PdschSendReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    version_indicator2 = l2l1_getU32( off1 + 12 );
                    off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                    len2 = l2l1_getU32( off1 + 20 );
                    element_size2 = l2l1_getU32( off1 + 24 );
                    let grants = l2l1.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 );
                                grantsItem.dlDmrsConfigType = l2l1_getU8( off2 + 2 );
                                grantsItem.dlDmrsLen = l2l1_getU8( off2 + 3 );
                                grantsItem.dlDmrsMappingType = l2l1_getU8( off2 + 4 );
                                grantsItem.dlDmrsAddPos = l2l1_getU8( off2 + 5 );
                                grantsItem.dlDmrsTypeAPos = l2l1_getU8( off2 + 6 );
                                grantsItem.nscId = l2l1_getU8( off2 + 7 );
                                grantsItem.startSymbol = l2l1_getU8( off2 + 8 );
                                grantsItem.numOfPdschSymbols = l2l1_getU8( off2 + 9 );
                                grantsItem.antPort = l2l1_getU16( off2 + 10 );
                                grantsItem.mcs = l2l1_getU8( off2 + 12 );
                                grantsItem.mcsTable = l2l1_getU8( off2 + 13 );
                                grantsItem.spatialMode = l2l1_getU8( off2 + 14 );
                                grantsItem.codebookIndex = l2l1_getU8( off2 + 15 );
                                grantsItem.startPrb = l2l1_getU16( off2 + 16 );
                                grantsItem.numOfPrb = l2l1_getU16( off2 + 18 );
                                grantsItem.dlPtrsFlag = l2l1_getU8( off2 + 20 );
                                grantsItem.dlPtrsTimeDensity = l2l1_getU8( off2 + 21 );
                                grantsItem.dlPtrsFrequencyDensity = l2l1_getU8( off2 + 22 );
                                grantsItem.dlPtrsNumOfPorts = l2l1_getU8( off2 + 23 );
                                grantsItem.dlPtrsResElemOffset = l2l1_getU8( off2 + 24 );
                                grantsItem.offsetRbDmrs = l2l1_getU8( off2 + 25 );
                                grantsItem.pdschTbTransmitPower = l2l1_getI16( off2 + 26 );
                                grantsItem.pdschBundleSize = l2l1_getU16( off2 + 28 );
                                grantsItem.baseGraph = l2l1_getU8( off2 + 30 );
                                grantsItem.modulationOrder = l2l1_getU8( off2 + 31 );
                                grantsItem.rvIndex = l2l1_getU8( off2 + 32 );
                                grantsItem.ncb = l2l1_getU16( off2 + 34 );
                                grantsItem.k0divZ = l2l1_getU8( off2 + 36 );
                                grantsItem.numOfLayers = l2l1_getU8( off2 + 37 );
                                grantsItem.rnti = l2l1_getU16( off2 + 38 );
                                grantsItem.tbSize_bits = l2l1_getU32( off2 + 40 );
                                grantsItem.numOfDmrsCdmGroupWithoutData = l2l1_getU8( off2 + 44 );
                                grantsItem.polarizationSelection = l2l1_getU8( off2 + 45 );
                                grantsItem.rbgSize = l2l1_getU8( off2 + 46 );
                                grantsItem.rbgSizeFirst = l2l1_getU8( off2 + 47 );
                                grantsItem.rat0Bitmap = l2l1_getU32( off2 + 48 );
                                grantsItem.i1Codebook4AntPorts = l2l1_getU8Array( off2 + 52 + l2l1_getU32( off2 + 52 ), l2l1_getU32( off2 + 56 ) );
                                grantsItem.i2Codebook4AntPorts = l2l1_getU8( off2 + 60 );
                                grantsItem.pdschPrecodingOption4x4 = l2l1_getU8( off2 + 61 );
                                grantsItem.numStreamIndex = l2l1_getU8( off2 + 62 );
                                grantsItem.openLoopScheme = l2l1_getU8( off2 + 63 );
                                grantsItem.streamIndex = l2l1_getU8Array( off2 + 64 + l2l1_getU32( off2 + 64 ), l2l1_getU32( off2 + 68 ) );
                                grantsItem.patternId = l2l1_getU16Array( off2 + 72 + l2l1_getU32( off2 + 72 ), l2l1_getU32( off2 + 76 ) );
                                grantsItem.numLteCrsMappingRes = l2l1_getU16( off2 + 80 );
                                grantsItem.lteCrsOption = l2l1_getU8( off2 + 82 );
                                grantsItem.rateMatchingOption = l2l1_getU8( off2 + 83 );
                                grantsItem.numRateMatchingRes = l2l1_getU16( off2 + 84 );
                                grantsItem.pdschScramblingSeqInit = l2l1_getU16( off2 + 86 );
                                grantsItem.isLowPaprOptimizedPrecoding = l2l1_getU8( off2 + 88 );
                                grantsItem.closedLoop3gppCodebook = l2l1_getU8( off2 + 89 );
                                grantsItem.bestBeamPowerOffset = l2l1_getU8( off2 + 90 );
                                grantsItem.rachStatus = l2l1_getU8( off2 + 91 );
                                grantsItem.unscheduledAreaStartPrb = l2l1_getU16( off2 + 92 );
                                grantsItem.unscheduledAreaNumOfPrb = l2l1_getU16( off2 + 94 );
                                grantsItem.unscheduledAreaStartSymbol = l2l1_getU8( off2 + 96 );
                                grantsItem.unscheduledAreaNumOfSymbols = l2l1_getU8( off2 + 97 );
                                grantsItem.symbolRateMatchingPositions = l2l1_getU16( off2 + 98 );
                                grantsItem.rtBfUeIndex = l2l1_getU16( off2 + 100 );
                                grantsItem.eirpEnable = l2l1_getU8( off2 + 102 );
                                grantsItem.bwvDumpGranularityInSubbands = l2l1_getU8( off2 + 103 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        grants.push( grantsItem );
                    }
                }
                break;
            }
        }
        break;
        case 0xE129: { // DlCell::ParameterReconfigurationReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.ssBlockPower = l2l1_getI16( 2 );
        }
        break;
        case 0xE12A: { // DlCell::ParameterReconfigurationResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU32( 4 );
            l2l1.diagnosticInformation = l2l1_getU32Array( 8 + l2l1_getU32( 8 ), l2l1_getU32( 12 ) );
        }
        break;
        case 0xE12B: { // DlDataFH::SlotTypeReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    l2l1.slotType = l2l1_getU8( off1 + 9 );
                    l2l1.pwrReductionPerSymb_dB = l2l1_getU8Array( off1 + 12 + l2l1_getU32( off1 + 12 ), l2l1_getU32( off1 + 16 ) );
                }
                break;
            }
        }
        break;
        case 0xE12C: { // DlDataFH::RimRsSendReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    l2l1.rimRsScramblingSequenceInit = l2l1_getU32( off1 + 12 );
                    l2l1.rimRsTransmitPower = l2l1_getI16( off1 + 16 );
                    l2l1.nscID = l2l1_getU16( off1 + 18 );
                    l2l1.startPrb = l2l1_getU16( off1 + 20 );
                    l2l1.numOfPrb = l2l1_getU8( off1 + 22 );
                    l2l1.startSymbol = l2l1_getU8( off1 + 23 );
                    l2l1.streamIndex = l2l1_getU8Array( off1 + 24 + l2l1_getU32( off1 + 24 ), l2l1_getU32( off1 + 28 ) );
                    l2l1.patternId = l2l1_getU16Array( off1 + 32 + l2l1_getU32( off1 + 32 ), l2l1_getU32( off1 + 36 ) );
                    l2l1.antennaStream = l2l1_getU8( off1 + 40 );
                    l2l1.subCarrierOffset = l2l1_getU8( off1 + 41 );
                }
                break;
            }
        }
        break;
        case 0xE12D: { // DlDataFH::PdschSendRespPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.subcellId = l2l1_getU8( off1 + 4 );
                    l2l1.sfn = l2l1_getU16( off1 + 6 );
                    l2l1.slot = l2l1_getU8( off1 + 8 );
                    version_indicator2 = l2l1_getU32( off1 + 12 );
                    off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                    len2 = l2l1_getU32( off1 + 20 );
                    element_size2 = l2l1_getU32( off1 + 24 );
                    let grants = l2l1.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                grantsItem.rtBfUeIndex = l2l1_getU16( off2 );
                                grantsItem.rnti = l2l1_getU16( off2 + 2 );
                                off3 = off2 + 4 + l2l1_getU32( off2 + 4 );
                                len3 = l2l1_getU32( off2 + 8 );
                                let eirpCoefficients = grantsItem.eirpCoefficients = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let eirpCoefficientsItem = {};
                                    eirpCoefficientsItem.Re = l2l1_getI16( off3 );
                                    eirpCoefficientsItem.Im = l2l1_getI16( off3 + 2 );
                                    off3 += 4;
                                    eirpCoefficients.push( eirpCoefficientsItem );
                                }
                                grantsItem.numOfLayers = l2l1_getU8( off2 + 12 );
                                grantsItem.layerIndex = l2l1_getU8( off2 + 13 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        grants.push( grantsItem );
                    }
                }
                break;
            }
        }
        break;
        case 0xE12E: { // DlData::PdschSendRespPs
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.sfn = l2l1_getU16( 2 );
            l2l1.slot = l2l1_getU8( 4 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let grants = l2l1.grants = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let grantsItem = {};
                grantsItem.rtBfUeIndex = l2l1_getU16( off1 );
                grantsItem.rnti = l2l1_getU16( off1 + 2 );
                off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                len2 = l2l1_getU32( off1 + 8 );
                let eirpCoefficients = grantsItem.eirpCoefficients = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let eirpCoefficientsItem = {};
                    eirpCoefficientsItem.Re = l2l1_getI16( off2 );
                    eirpCoefficientsItem.Im = l2l1_getI16( off2 + 2 );
                    off2 += 4;
                    eirpCoefficients.push( eirpCoefficientsItem );
                }
                grantsItem.numOfLayers = l2l1_getU8( off1 + 12 );
                off1 += 16;
                grants.push( grantsItem );
            }
        }
        break;
        case 0xE200: { // UlData::PuschReceiveRespHarqD
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
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
                    grantsItem.ackNack1BitUci = l2l1_getU8( off2 + 2 );
                    grantsItem.dtxAck1Bit = l2l1_getU8( off2 + 3 );
                    grantsItem.dtxMetricAck1Bit = l2l1_getU16( off2 + 4 );
                    grantsItem.dtxThresholdAck1Bit = l2l1_getU16( off2 + 6 );
                    grantsItem.ackNackUciMoreThan1Bit = l2l1_getU8Array( off2 + 8, 7 );
                    grantsItem.dtxAckMoreThan1Bit = l2l1_getU8( off2 + 16 );
                    grantsItem.dtxMetricAckMoreThan1Bit = l2l1_getU16( off2 + 18 );
                    grantsItem.dtxThresholdAckMoreThan1Bit = l2l1_getU16( off2 + 20 );
                    grantsItem.ackCrcCheck = l2l1_getU8( off2 + 22 );
                    grantsItem.l2CtxtAnMgt = l2l1_getU8Array( off2 + 24, 8 );
                    off2 += 32;
                    grants.push( grantsItem );
                }
                off1 += 12;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE208: { // UlData::PucchReceiveRespHarqD
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
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
                    pucchResourcesItem.crc = l2l1_getU8( off2 + 5 );
                    pucchResourcesItem.rnti = l2l1_getU16( off2 + 6 );
                    pucchResourcesItem.ackNack = l2l1_getU8Array( off2 + 8, 7 );
                    pucchResourcesItem.dtxMetric = l2l1_getU32( off2 + 16 );
                    pucchResourcesItem.dtxThreshold = l2l1_getU32( off2 + 20 );
                    pucchResourcesItem.l2CtxtAnMgt = l2l1_getU8Array( off2 + 24, 8 );
                    off2 += 32;
                    pucchResources.push( pucchResourcesItem );
                }
                off1 += 12;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE20B: { // UlData::PuschReceiveRespHarqU
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
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
                    off2 += 8;
                    grants.push( grantsItem );
                }
                off1 += 12;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE21C: { // UlData::FastAntennaSnapshotResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE226: { // UlData::PucchReceiveReq
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
                subcellsItem.processInRealTime = l2l1_getU8( off1 + 1 );
                subcellsItem.sfnForProcessing = l2l1_getU16( off1 + 2 );
                subcellsItem.slotForProcessing = l2l1_getU8( off1 + 4 );
                let staticLongPucchConfigEcpri = subcellsItem.staticLongPucchConfigEcpri = {};
                let eCpriPucchResourceAllocationLowerDedicated = staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerDedicated = {};
                eCpriPucchResourceAllocationLowerDedicated.startPrb = l2l1_getU16( off1 + 8 );
                eCpriPucchResourceAllocationLowerDedicated.numPrb = l2l1_getU16( off1 + 10 );
                eCpriPucchResourceAllocationLowerDedicated.eCpriSectionId = l2l1_getU16( off1 + 12 );
                let eCpriPucchResourceAllocationUpperDedicated = staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperDedicated = {};
                eCpriPucchResourceAllocationUpperDedicated.startPrb = l2l1_getU16( off1 + 16 );
                eCpriPucchResourceAllocationUpperDedicated.numPrb = l2l1_getU16( off1 + 18 );
                eCpriPucchResourceAllocationUpperDedicated.eCpriSectionId = l2l1_getU16( off1 + 20 );
                let eCpriPucchResourceAllocationLowerCommon = staticLongPucchConfigEcpri.eCpriPucchResourceAllocationLowerCommon = {};
                eCpriPucchResourceAllocationLowerCommon.startPrb = l2l1_getU16( off1 + 24 );
                eCpriPucchResourceAllocationLowerCommon.numPrb = l2l1_getU16( off1 + 26 );
                eCpriPucchResourceAllocationLowerCommon.eCpriSectionId = l2l1_getU16( off1 + 28 );
                let eCpriPucchResourceAllocationUpperCommon = staticLongPucchConfigEcpri.eCpriPucchResourceAllocationUpperCommon = {};
                eCpriPucchResourceAllocationUpperCommon.startPrb = l2l1_getU16( off1 + 32 );
                eCpriPucchResourceAllocationUpperCommon.numPrb = l2l1_getU16( off1 + 34 );
                eCpriPucchResourceAllocationUpperCommon.eCpriSectionId = l2l1_getU16( off1 + 36 );
                staticLongPucchConfigEcpri.numCeAxCIndex = l2l1_getU8( off1 + 40 );
                staticLongPucchConfigEcpri.ceAxCIndex = l2l1_getU8Array( off1 + 44, 8 );
                staticLongPucchConfigEcpri.patternId = l2l1_getU16Array( off1 + 52, 4 );
                staticLongPucchConfigEcpri.startSymbol = l2l1_getU8( off1 + 60 );
                staticLongPucchConfigEcpri.numSymbols = l2l1_getU8( off1 + 61 );
                let pucchAreaBoundaries = subcellsItem.pucchAreaBoundaries = {};
                pucchAreaBoundaries.numPucchBoundaries = l2l1_getU8( off1 + 64 );
                off2 = off1 + 68;
                let pucchBoundary = pucchAreaBoundaries.pucchBoundary = [];
                for( let i2 = 0; i2 < 8; ++i2 ) {
                    let pucchBoundaryItem = {};
                    pucchBoundaryItem.startPrb = l2l1_getU16( off2 );
                    pucchBoundaryItem.numOfPrb = l2l1_getU16( off2 + 2 );
                    pucchBoundaryItem.startSymbol = l2l1_getU8( off2 + 4 );
                    pucchBoundaryItem.numOfSymbol = l2l1_getU8( off2 + 5 );
                    off2 += 8;
                    pucchBoundary.push( pucchBoundaryItem );
                }
                let eCpriConfig = pucchAreaBoundaries.eCpriConfig = {};
                eCpriConfig.numCeAxCIndex = l2l1_getU8( off1 + 132 );
                eCpriConfig.ceAxCIndex = l2l1_getU8Array( off1 + 136, 8 );
                eCpriConfig.patternId = l2l1_getU16Array( off1 + 144, 4 );
                off2 = off1 + 152 + l2l1_getU32( off1 + 152 );
                len2 = l2l1_getU32( off1 + 156 );
                let pucchResources = subcellsItem.pucchResources = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let pucchResourcesItem = {};
                    pucchResourcesItem.rnti = l2l1_getU16( off2 );
                    pucchResourcesItem.pucchFormat = l2l1_getU8( off2 + 2 );
                    pucchResourcesItem.numOfLayers = l2l1_getU8( off2 + 3 );
                    pucchResourcesItem.dmrsSequenceType = l2l1_getU8( off2 + 4 );
                    pucchResourcesItem.harqProcessIndex = l2l1_getU8( off2 + 5 );
                    pucchResourcesItem.startPrb = l2l1_getU16( off2 + 6 );
                    pucchResourcesItem.numOfPrb = l2l1_getU8( off2 + 8 );
                    pucchResourcesItem.rachStatus = l2l1_getU8( off2 + 9 );
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
                    pucchResourcesItem.modulationType = l2l1_getU8( off2 + 25 );
                    pucchResourcesItem.numCeAxCIndex = l2l1_getU8( off2 + 26 );
                    pucchResourcesItem.foeGapLargest = l2l1_getU8( off2 + 27 );
                    pucchResourcesItem.ceAxCIndex = l2l1_getU8Array( off2 + 28, 8 );
                    pucchResourcesItem.patternId = l2l1_getU16Array( off2 + 36, 4 );
                    let longTermCfoMetric = pucchResourcesItem.longTermCfoMetric = {};
                    longTermCfoMetric.Re = l2l1_getF32( off2 + 44 );
                    longTermCfoMetric.Im = l2l1_getF32( off2 + 48 );
                    pucchResourcesItem.l2CtxtAnMgt = l2l1_getU8Array( off2 + 52, 8 );
                    pucchResourcesItem.eCpriSectionId = l2l1_getU16Array( off2 + 60, 2 );
                    off3 = off2 + 64;
                    let longTermCfoMetricOfBeam = pucchResourcesItem.longTermCfoMetricOfBeam = [];
                    for( let i3 = 0; i3 < 4; ++i3 ) {
                        let longTermCfoMetricOfBeamItem = {};
                        longTermCfoMetricOfBeamItem.Re = l2l1_getF32( off3 );
                        longTermCfoMetricOfBeamItem.Im = l2l1_getF32( off3 + 4 );
                        off3 += 8;
                        longTermCfoMetricOfBeam.push( longTermCfoMetricOfBeamItem );
                    }
                    off2 += 96;
                    pucchResources.push( pucchResourcesItem );
                }
                off1 += 160;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE231: { // UlData::PrachReceiveReq
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.processInRealTime = l2l1_getU8( off1 + 1 );
                subcellsItem.sfnForProcessing = l2l1_getU16( off1 + 2 );
                subcellsItem.slotForProcessing = l2l1_getU8( off1 + 4 );
                subcellsItem.prachPrbOffset = l2l1_getU16( off1 + 6 );
                subcellsItem.prachOccasions = l2l1_getU16Array( off1 + 8, 8 );
                off2 = off1 + 24 + l2l1_getU32( off1 + 24 );
                len2 = l2l1_getU32( off1 + 28 );
                let occasions = subcellsItem.occasions = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let occasionsItem = {};
                    occasionsItem.numCeAxCIndex = l2l1_getU8( off2 );
                    occasionsItem.ceAxCIndex = l2l1_getU8Array( off2 + 4, 8 );
                    occasionsItem.patternId = l2l1_getU16Array( off2 + 12, 4 );
                    occasionsItem.eCpriSectionId = l2l1_getU16( off2 + 20 );
                    off2 += 24;
                    occasions.push( occasionsItem );
                }
                off1 += 32;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE235: { // UlData::FastAntennaSnapshotReq
            l2l1.addrUlFastAntennaSnapshotResp = l2l1_getU32( 0 );
            l2l1.ulSubCellId = l2l1_getU8( 4 );
            l2l1.sfn = l2l1_getU16( 6 );
            l2l1.slot = l2l1_getU8( 8 );
            l2l1.numOfEvents = l2l1_getU8( 9 );
            off1 = 12;
            let eventsList = l2l1.eventsList = [];
            for( let i1 = 0; i1 < 8; ++i1 ) {
                let eventsListItem = {};
                eventsListItem.crnti = l2l1_getU16( off1 );
                eventsListItem.eventNb = l2l1_getU8( off1 + 2 );
                eventsListItem.eventType = l2l1_getU8( off1 + 3 );
                off1 += 4;
                eventsList.push( eventsListItem );
            }
        }
        break;
        case 0xE237: { // UlData::SrsReceiveRespPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.symbolPosition = l2l1_getU8( off1 + 1 );
                off2 = off1 + 4 + l2l1_getU32( off1 + 4 );
                len2 = l2l1_getU32( off1 + 8 );
                let srsReceiveRespPsUes = subcellsItem.srsReceiveRespPsUes = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsReceiveRespPsUesItem = {};
                    srsReceiveRespPsUesItem.rnti = l2l1_getU16( off2 );
                    srsReceiveRespPsUesItem.ulRank = l2l1_getU8( off2 + 2 );
                    srsReceiveRespPsUesItem.ulPmiRank1 = l2l1_getU8( off2 + 3 );
                    srsReceiveRespPsUesItem.ulPmiRank1Sinr = l2l1_getF32( off2 + 4 );
                    srsReceiveRespPsUesItem.ulPmiRank2 = l2l1_getU8( off2 + 8 );
                    srsReceiveRespPsUesItem.ulPmiRank2Sinr = l2l1_getF32Array( off2 + 12, 2 );
                    srsReceiveRespPsUesItem.snr = l2l1_getF32( off2 + 20 );
                    srsReceiveRespPsUesItem.dtx = l2l1_getU8( off2 + 24 );
                    srsReceiveRespPsUesItem.numOfSrsTxPorts = l2l1_getU8( off2 + 25 );
                    srsReceiveRespPsUesItem.shortTermTaMetric = l2l1_getI16( off2 + 26 );
                    srsReceiveRespPsUesItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 28 );
                    off3 = off2 + 32 + l2l1_getU32( off2 + 32 );
                    len3 = l2l1_getU32( off2 + 36 );
                    let srsAntMeas = srsReceiveRespPsUesItem.srsAntMeas = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let srsAntMeasItem = {};
                        srsAntMeasItem.rxPowerOfAnt = l2l1_getF32( off3 );
                        srsAntMeasItem.sinrOfAnt = l2l1_getF32( off3 + 4 );
                        srsAntMeasItem.shortTermTaMetricOfAnt = l2l1_getI16( off3 + 8 );
                        srsAntMeasItem.shortTermTaPeakAmpOfAnt = l2l1_getF32( off3 + 12 );
                        off3 += 16;
                        srsAntMeas.push( srsAntMeasItem );
                    }
                    off2 += 40;
                    srsReceiveRespPsUes.push( srsReceiveRespPsUesItem );
                }
                off1 += 12;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE239: { // UlData::PuschReceiveRespLo
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.subcellId = l2l1_getU8( 3 );
            l2l1.processInRealTime = l2l1_getU8( 4 );
            l2l1.tbStatus = l2l1_getU8( 5 );
            l2l1.sfnForProcessing = l2l1_getU16( 6 );
            l2l1.slotForProcessing = l2l1_getU8( 8 );
            l2l1.totalFragmentNum = l2l1_getU8( 9 );
            l2l1.rnti = l2l1_getU16( 10 );
            l2l1.harqProcessIndex = l2l1_getU8( 12 );
            l2l1.fragmentIndex = l2l1_getU8( 13 );
            l2l1.absoluteHarqProcessIndex = l2l1_getU16( 14 );
            l2l1.totalTbSizeBytes = l2l1_getU32( 16 );
            l2l1.paddingByte = l2l1_getU8( 20 );
            l2l1.k2 = l2l1_getU8( 21 );
            l2l1.data = l2l1_getU8Array( 24 + l2l1_getU32( 24 ), l2l1_getU32( 28 ) );
        }
        break;
        case 0xE24B: { // UlData::PuschReceiveRespPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            l2l1.bcn_reservation_for_debug = l2l1_getU8( 7 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                subcellsItem.noisePerPrb = l2l1_getU32Array( off1 + 8 + l2l1_getU32( off1 + 8 ), l2l1_getU32( off1 + 12 ) );
                subcellsItem.rtwpOfAnt = l2l1_getF32Array( off1 + 16 + l2l1_getU32( off1 + 16 ), l2l1_getU32( off1 + 20 ) );
                off2 = off1 + 24 + l2l1_getU32( off1 + 24 );
                len2 = l2l1_getU32( off1 + 28 );
                let grants = subcellsItem.grants = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let grantsItem = {};
                    grantsItem.rnti = l2l1_getU16( off2 );
                    grantsItem.dtx = l2l1_getU8( off2 + 2 );
                    let shortTermCfoMetric = grantsItem.shortTermCfoMetric = {};
                    shortTermCfoMetric.I = l2l1_getF32( off2 + 4 );
                    shortTermCfoMetric.Q = l2l1_getF32( off2 + 8 );
                    grantsItem.shortTermTaMetric = l2l1_getI16( off2 + 12 );
                    grantsItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 16 );
                    grantsItem.rxPower = l2l1_getF32( off2 + 20 );
                    grantsItem.rssi = l2l1_getF32( off2 + 24 );
                    grantsItem.ulRank = l2l1_getU8( off2 + 28 );
                    grantsItem.ulPmiRank1 = l2l1_getU8( off2 + 29 );
                    grantsItem.ulPmiRank1Sinr = l2l1_getF32( off2 + 32 );
                    grantsItem.ulPmiRank2 = l2l1_getU8( off2 + 36 );
                    grantsItem.ulPmiRank2Sinr = l2l1_getF32Array( off2 + 40, 2 );
                    off3 = off2 + 48 + l2l1_getU32( off2 + 48 );
                    len3 = l2l1_getU32( off2 + 52 );
                    let puschAntMeas = grantsItem.puschAntMeas = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let puschAntMeasItem = {};
                        puschAntMeasItem.rxPowerOfAnt = l2l1_getF32( off3 );
                        puschAntMeasItem.sinrOfAnt = l2l1_getF32( off3 + 4 );
                        puschAntMeasItem.shortTermTaMetricOfAnt = l2l1_getI16( off3 + 8 );
                        puschAntMeasItem.shortTermTaPeakAmpOfAnt = l2l1_getF32( off3 + 12 );
                        let shortTermCfoMetricOfAnt = puschAntMeasItem.shortTermCfoMetricOfAnt = {};
                        shortTermCfoMetricOfAnt.I = l2l1_getF32( off3 + 16 );
                        shortTermCfoMetricOfAnt.Q = l2l1_getF32( off3 + 20 );
                        puschAntMeasItem.linRssiOfAnt = l2l1_getU64( off3 + 24 );
                        puschAntMeasItem.linNoiseOfAnt = l2l1_getU32( off3 + 32 );
                        off3 += 40;
                        puschAntMeas.push( puschAntMeasItem );
                    }
                    grantsItem.harqProcessIndex = l2l1_getU8( off2 + 56 );
                    grantsItem.fakeUe = l2l1_getU8( off2 + 57 );
                    grantsItem.absoluteHarqProcessIndex = l2l1_getU16( off2 + 58 );
                    grantsItem.sinr = l2l1_getF32Array( off2 + 60, 2 );
                    grantsItem.suPostCombSinr = l2l1_getF32Array( off2 + 68, 2 );
                    grantsItem.channelCorrMetric = l2l1_getF32Array( off2 + 76, 2 );
                    grantsItem.crc = l2l1_getU8( off2 + 84 );
                    grantsItem.dtxCsiPart1 = l2l1_getU8( off2 + 85 );
                    grantsItem.dtxMetricCsiPart1 = l2l1_getU16( off2 + 86 );
                    grantsItem.dtxThresholdCsiPart1 = l2l1_getU16( off2 + 88 );
                    grantsItem.dtxCsiPart2 = l2l1_getU8( off2 + 90 );
                    grantsItem.dtxMetricCsiPart2 = l2l1_getU16( off2 + 92 );
                    grantsItem.dtxThresholdCsiPart2 = l2l1_getU16( off2 + 94 );
                    grantsItem.uciCsiPart1Bits = l2l1_getU8Array( off2 + 96, 7 );
                    grantsItem.csiPart1CrcCheck = l2l1_getU8( off2 + 104 );
                    grantsItem.numOfUciCsiPart2Bits = l2l1_getU8( off2 + 105 );
                    grantsItem.uciCsiPart2Bits = l2l1_getU8Array( off2 + 108, 7 );
                    grantsItem.csiPart2CrcCheck = l2l1_getU8( off2 + 116 );
                    grantsItem.rachStatus = l2l1_getU8( off2 + 117 );
                    grantsItem.slotAggregationCountDown = l2l1_getU8( off2 + 118 );
                    grantsItem.dmrsSequenceType = l2l1_getU8( off2 + 119 );
                    off2 += 120;
                    grants.push( grantsItem );
                }
                off1 += 32;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE24C: { // UlData::PucchReceiveRespPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            l2l1.bcn_reservation_for_debug = l2l1_getU8( 7 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.noisePerPrb = l2l1_getU32Array( off1 + 4 + l2l1_getU32( off1 + 4 ), l2l1_getU32( off1 + 8 ) );
                off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                len2 = l2l1_getU32( off1 + 16 );
                let pucchResources = subcellsItem.pucchResources = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let pucchResourcesItem = {};
                    pucchResourcesItem.startPrb = l2l1_getU16( off2 );
                    pucchResourcesItem.secondHopPrb = l2l1_getU16( off2 + 2 );
                    pucchResourcesItem.numOfPrb = l2l1_getU8( off2 + 4 );
                    pucchResourcesItem.initialCyclicShift = l2l1_getU8( off2 + 5 );
                    pucchResourcesItem.rnti = l2l1_getU16( off2 + 6 );
                    pucchResourcesItem.crc = l2l1_getU8( off2 + 8 );
                    pucchResourcesItem.dtx = l2l1_getU8( off2 + 9 );
                    pucchResourcesItem.pucchFormat = l2l1_getU8( off2 + 10 );
                    pucchResourcesItem.harqProcessIndex = l2l1_getU8( off2 + 11 );
                    pucchResourcesItem.shortTermTaMetric = l2l1_getI16( off2 + 12 );
                    pucchResourcesItem.rachStatus = l2l1_getU8( off2 + 14 );
                    pucchResourcesItem.dmrsSequenceType = l2l1_getU8( off2 + 15 );
                    pucchResourcesItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 16 );
                    pucchResourcesItem.rxPower = l2l1_getF32( off2 + 20 );
                    pucchResourcesItem.sinr = l2l1_getF32Array( off2 + 24, 2 );
                    pucchResourcesItem.uciBits = l2l1_getU8Array( off2 + 32, 10 );
                    pucchResourcesItem.numOfBitsOfUciInformation = l2l1_getU8( off2 + 44 );
                    pucchResourcesItem.srBit = l2l1_getU8( off2 + 45 );
                    pucchResourcesItem.noisePower = l2l1_getF32( off2 + 48 );
                    pucchResourcesItem.rssi = l2l1_getF32( off2 + 52 );
                    pucchResourcesItem.dtxMetric = l2l1_getU32( off2 + 56 );
                    pucchResourcesItem.dtxThreshold = l2l1_getU32( off2 + 60 );
                    let shortTermCfoMetric = pucchResourcesItem.shortTermCfoMetric = {};
                    shortTermCfoMetric.I = l2l1_getF32( off2 + 64 );
                    shortTermCfoMetric.Q = l2l1_getF32( off2 + 68 );
                    off3 = off2 + 72 + l2l1_getU32( off2 + 72 );
                    len3 = l2l1_getU32( off2 + 76 );
                    let extendedParameters = pucchResourcesItem.extendedParameters = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let extendedParametersItem = {};
                        off4 = off3 + l2l1_getU32( off3 );
                        len4 = l2l1_getU32( off3 + 4 );
                        let shortTermCfoMetricOfAnt = extendedParametersItem.shortTermCfoMetricOfAnt = [];
                        for( let i4 = 0; i4 < len4; ++i4 ) {
                            let shortTermCfoMetricOfAntItem = {};
                            shortTermCfoMetricOfAntItem.I = l2l1_getF32( off4 );
                            shortTermCfoMetricOfAntItem.Q = l2l1_getF32( off4 + 4 );
                            off4 += 8;
                            shortTermCfoMetricOfAnt.push( shortTermCfoMetricOfAntItem );
                        }
                        off3 += 8;
                        extendedParameters.push( extendedParametersItem );
                    }
                    off2 += 80;
                    pucchResources.push( pucchResourcesItem );
                }
                off1 += 20;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE24D: { // UlData::PrachReceiveInd
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                subcellsItem.noisePowerLinear = l2l1_getU32( off1 + 8 );
                off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                len2 = l2l1_getU32( off1 + 16 );
                let detectedPrachPreambles = subcellsItem.detectedPrachPreambles = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let detectedPrachPreamblesItem = {};
                    detectedPrachPreamblesItem.prachPreambleIndex = l2l1_getU8( off2 );
                    detectedPrachPreamblesItem.prachPreambleTimeOccasion = l2l1_getU8( off2 + 1 );
                    detectedPrachPreamblesItem.prachPreambleFreqOccasion = l2l1_getU8( off2 + 2 );
                    detectedPrachPreamblesItem.initialTa = l2l1_getU16( off2 + 4 );
                    detectedPrachPreamblesItem.peakMetric = l2l1_getF32( off2 + 8 );
                    off2 += 12;
                    detectedPrachPreambles.push( detectedPrachPreamblesItem );
                }
                off1 += 20;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE24E: { // UlData::RimReceiveReq
            l2l1.addrRimReceiveRespPs = l2l1_getU32( 0 );
            l2l1.sfn = l2l1_getU16( 4 );
            l2l1.slot = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.rimRssiRequest = l2l1_getU8( off1 + 1 );
                subcellsItem.rimRsDetectionRequest = l2l1_getU8( off1 + 2 );
                let rimAllocationConfig = subcellsItem.rimAllocationConfig = {};
                rimAllocationConfig.startSymbol = l2l1_getU8( off1 + 4 );
                rimAllocationConfig.numOfSymbols = l2l1_getU8( off1 + 5 );
                rimAllocationConfig.numOfSubBands = l2l1_getU8( off1 + 6 );
                rimAllocationConfig.numOfPrbPerSubBand = l2l1_getU8( off1 + 7 );
                rimAllocationConfig.startPrbPerSubBand = l2l1_getU16Array( off1 + 8, 5 );
                let rimRsDetectionConfig = subcellsItem.rimRsDetectionConfig = {};
                rimRsDetectionConfig.numPrb = l2l1_getU8( off1 + 20 );
                rimRsDetectionConfig.numOfFreqResources = l2l1_getU8( off1 + 21 );
                rimRsDetectionConfig.subCarrierOffset = l2l1_getU8( off1 + 22 );
                rimRsDetectionConfig.startPrb = l2l1_getU16Array( off1 + 24, 4 );
                off2 = off1 + 32 + l2l1_getU32( off1 + 32 );
                len2 = l2l1_getU32( off1 + 36 );
                let rimRsSeq = rimRsDetectionConfig.rimRsSeq = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let rimRsSeqItem = {};
                    rimRsSeqItem.seqInit = l2l1_getU32( off2 );
                    rimRsSeqItem.nScid = l2l1_getU16( off2 + 4 );
                    off3 = off2 + 8 + l2l1_getU32( off2 + 8 );
                    len3 = l2l1_getU32( off2 + 12 );
                    let detectionResUnits = rimRsSeqItem.detectionResUnits = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let detectionResUnitsItem = {};
                        detectionResUnitsItem.symbolIndex = l2l1_getU8( off3 );
                        detectionResUnitsItem.freqResIndex = l2l1_getU8( off3 + 1 );
                        off3 += 4;
                        detectionResUnits.push( detectionResUnitsItem );
                    }
                    off2 += 16;
                    rimRsSeq.push( rimRsSeqItem );
                }
                off2 = off1 + 40 + l2l1_getU32( off1 + 40 );
                len2 = l2l1_getU32( off1 + 44 );
                let blankedRegion = rimRsDetectionConfig.blankedRegion = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let blankedRegionItem = {};
                    blankedRegionItem.blankStartPrb = l2l1_getU16( off2 );
                    blankedRegionItem.blankNumOfPrb = l2l1_getU16( off2 + 2 );
                    off2 += 4;
                    blankedRegion.push( blankedRegionItem );
                }
                let eCpriConfig = subcellsItem.eCpriConfig = {};
                eCpriConfig.numCeAxCIndex = l2l1_getU8( off1 + 48 );
                eCpriConfig.ceAxCIndex = l2l1_getU8Array( off1 + 52, 4 );
                eCpriConfig.patternId = l2l1_getU16Array( off1 + 56, 2 );
                off2 = off1 + 60 + l2l1_getU32( off1 + 60 );
                len2 = l2l1_getU32( off1 + 64 );
                let unscheduledRegionInfo = subcellsItem.unscheduledRegionInfo = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let unscheduledRegionInfoItem = {};
                    unscheduledRegionInfoItem.startSymbol = l2l1_getU8( off2 );
                    unscheduledRegionInfoItem.numOfSymbols = l2l1_getU8( off2 + 1 );
                    unscheduledRegionInfoItem.eCpriSectionId = l2l1_getU16( off2 + 2 );
                    off3 = off2 + 4 + l2l1_getU32( off2 + 4 );
                    len3 = l2l1_getU32( off2 + 8 );
                    let unscheduledPrbRanges = unscheduledRegionInfoItem.unscheduledPrbRanges = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let unscheduledPrbRangesItem = {};
                        unscheduledPrbRangesItem.startPrb = l2l1_getU16( off3 );
                        unscheduledPrbRangesItem.numOfPrb = l2l1_getU16( off3 + 2 );
                        off3 += 4;
                        unscheduledPrbRanges.push( unscheduledPrbRangesItem );
                    }
                    off2 += 12;
                    unscheduledRegionInfo.push( unscheduledRegionInfoItem );
                }
                off1 += 68;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE24F: { // UlData::RimReceiveRespPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.rimRssiValid = l2l1_getU8( off1 + 1 );
                off2 = off1 + 4;
                let rimRssi = subcellsItem.rimRssi = [];
                for( let i2 = 0; i2 < 14; ++i2 ) {
                    let rimRssiItem = {};
                    rimRssiItem.rimRssi = l2l1_getF32Array( off2, 5 );
                    off2 += 20;
                    rimRssi.push( rimRssiItem );
                }
                off2 = off1 + 284 + l2l1_getU32( off1 + 284 );
                len2 = l2l1_getU32( off1 + 288 );
                let rimRsDetectionReport = subcellsItem.rimRsDetectionReport = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let rimRsDetectionReportItem = {};
                    rimRsDetectionReportItem.nScid = l2l1_getU16( off2 );
                    off3 = off2 + 4 + l2l1_getU32( off2 + 4 );
                    len3 = l2l1_getU32( off2 + 8 );
                    let detectionResUnits = rimRsDetectionReportItem.detectionResUnits = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let detectionResUnitsItem = {};
                        detectionResUnitsItem.symbolIndex = l2l1_getU8( off3 );
                        detectionResUnitsItem.startPrb = l2l1_getU16( off3 + 2 );
                        detectionResUnitsItem.rimRsSignalPower = l2l1_getF32( off3 + 4 );
                        detectionResUnitsItem.rimRsPeakValue = l2l1_getF32( off3 + 8 );
                        detectionResUnitsItem.rimRsPeakPosition = l2l1_getI16( off3 + 12 );
                        off3 += 16;
                        detectionResUnits.push( detectionResUnitsItem );
                    }
                    off2 += 12;
                    rimRsDetectionReport.push( rimRsDetectionReportItem );
                }
                off1 += 292;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE250: { // UlData::AddressResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU8( 2 );
            let l1UlAddresses = l2l1.l1UlAddresses = {};
            l1UlAddresses.puschReceiveReq = l2l1_getU32( 4 );
            l1UlAddresses.puschReceiveReqL1ruAddress = l2l1_getU32( 8 );
            l1UlAddresses.pucchReceiveReq = l2l1_getU32( 12 );
            l1UlAddresses.srsReceiveReq = l2l1_getU32( 16 );
            l1UlAddresses.prachReceiveReq = l2l1_getU32( 20 );
            l1UlAddresses.fastAntennaSnapshotReqAddress = l2l1_getU32( 24 );
            l1UlAddresses.rimReceiveReqAddress = l2l1_getU32( 28 );
            l1UlAddresses.srsPosReceiveReqAddress = l2l1_getU32( 32 );
        }
        break;
        case 0xE251: { // UlData::PuschReceiveReq
            l2l1.addrPuschReceiveRespPs = l2l1_getU32( 0 );
            l2l1.addrPuschReceiveRespLo = l2l1_getU32( 4 );
            l2l1.addrPuschReceiveRespHarqU = l2l1_getU32( 8 );
            l2l1.addrPuschReceiveRespHarqD = l2l1_getU32( 12 );
            l2l1.sfn = l2l1_getU16( 16 );
            l2l1.slot = l2l1_getU8( 18 );
            off1 = 20 + l2l1_getU32( 20 );
            len1 = l2l1_getU32( 24 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.processInRealTime = l2l1_getU8( off1 + 1 );
                subcellsItem.sfnForProcessing = l2l1_getU16( off1 + 2 );
                subcellsItem.slotForProcessing = l2l1_getU8( off1 + 4 );
                subcellsItem.postSuSinr = l2l1_getU8( off1 + 5 );
                off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                len2 = l2l1_getU32( off1 + 12 );
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
                    grantsItem.rachStatus = l2l1_getU8( off2 + 13 );
                    grantsItem.startPrb = l2l1_getU16( off2 + 14 );
                    grantsItem.numOfPrb = l2l1_getU16( off2 + 16 );
                    grantsItem.mcs = l2l1_getU8( off2 + 18 );
                    grantsItem.mcsTable = l2l1_getU8( off2 + 19 );
                    grantsItem.antPort = l2l1_getU16( off2 + 20 );
                    grantsItem.spatialMode = l2l1_getU8( off2 + 22 );
                    grantsItem.codebookIndex = l2l1_getU8( off2 + 23 );
                    grantsItem.nscId = l2l1_getU8( off2 + 24 );
                    grantsItem.fakeUe = l2l1_getU8( off2 + 25 );
                    grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 + 26 );
                    grantsItem.ulPtrsFlag = l2l1_getU8( off2 + 28 );
                    grantsItem.ulPtrsTimeDensity = l2l1_getU8( off2 + 29 );
                    grantsItem.ulPtrsFrequencyDensity = l2l1_getU8( off2 + 30 );
                    grantsItem.ulPtrsNumOfPorts = l2l1_getU8( off2 + 31 );
                    grantsItem.ulPtrsResElemOffset = l2l1_getU8( off2 + 32 );
                    grantsItem.ulPtrsNumOfGroups = l2l1_getU8( off2 + 33 );
                    grantsItem.ulPtrsNumOfSamplesPerGroup = l2l1_getU8( off2 + 34 );
                    grantsItem.harqProcessIndex = l2l1_getU8( off2 + 35 );
                    grantsItem.absoluteHarqProcessIndex = l2l1_getU16( off2 + 36 );
                    grantsItem.freshHarqTrans = l2l1_getU8( off2 + 38 );
                    grantsItem.numOfUciCsiPart1Bits = l2l1_getU8( off2 + 39 );
                    grantsItem.numOfUciCsiPart1Symbols = l2l1_getU16( off2 + 40 );
                    grantsItem.maxNumOfUciCsiPart2Symbols = l2l1_getU16( off2 + 42 );
                    grantsItem.maxNumOfUciCsiPart2BitsPlusCrcUpTo11Bits = l2l1_getU16( off2 + 44 );
                    grantsItem.maxNumOfUciCsiPart2BitsPlusCrcMoreThan11Bits = l2l1_getU16( off2 + 46 );
                    grantsItem.numOfUciAckBits = l2l1_getU8( off2 + 48 );
                    grantsItem.dmrsSequenceType = l2l1_getU8( off2 + 49 );
                    grantsItem.numOfUciAckSymbols = l2l1_getU16( off2 + 50 );
                    grantsItem.numOfUciAckSymbols1bit = l2l1_getU16( off2 + 52 );
                    grantsItem.uciOnly = l2l1_getU8( off2 + 54 );
                    grantsItem.k2 = l2l1_getU8( off2 + 55 );
                    grantsItem.csiPart2CodeRateUpTo11Bits = l2l1_getF32( off2 + 56 );
                    grantsItem.csiPart2CodeRateMoreThan11Bits = l2l1_getF32( off2 + 60 );
                    grantsItem.csiPart2BetaOffsetUpTo11Bits = l2l1_getU8( off2 + 64 );
                    grantsItem.csiPart2BetaOffsetMoreThan11Bits = l2l1_getU8( off2 + 65 );
                    grantsItem.numOfUciRes = l2l1_getU16( off2 + 66 );
                    off3 = off2 + 68 + l2l1_getU32( off2 + 68 );
                    len3 = l2l1_getU32( off2 + 72 );
                    let csiReportStruct = grantsItem.csiReportStruct = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let csiReportStructItem = {};
                        csiReportStructItem.riStartPos = l2l1_getU8( off3 );
                        csiReportStructItem.numOfRiBits = l2l1_getU8( off3 + 1 );
                        csiReportStructItem.csiPart1Only = l2l1_getU8( off3 + 2 );
                        csiReportStructItem.numOfWidebandCsiPart2BitsRi0 = l2l1_getU8( off3 + 3 );
                        csiReportStructItem.numOfWidebandCsiPart2BitsRi1 = l2l1_getU8( off3 + 4 );
                        csiReportStructItem.numOfWidebandCsiPart2BitsRi2 = l2l1_getU8( off3 + 5 );
                        csiReportStructItem.numOfWidebandCsiPart2BitsRi3 = l2l1_getU8( off3 + 6 );
                        csiReportStructItem.numOfCsiPart2Subbands = l2l1_getU8( off3 + 7 );
                        csiReportStructItem.numOfBitsPerSubbandRi1 = l2l1_getU8( off3 + 8 );
                        csiReportStructItem.numOfBitsPerSubbandRi2 = l2l1_getU8( off3 + 9 );
                        csiReportStructItem.numOfBitsPerSubbandRi3 = l2l1_getU8( off3 + 10 );
                        csiReportStructItem.numOfBitsPerSubbandRi4 = l2l1_getU8( off3 + 11 );
                        off3 += 12;
                        csiReportStruct.push( csiReportStructItem );
                    }
                    let longTermCfoMetric = grantsItem.longTermCfoMetric = {};
                    longTermCfoMetric.Re = l2l1_getF32( off2 + 76 );
                    longTermCfoMetric.Im = l2l1_getF32( off2 + 80 );
                    grantsItem.foeValid = l2l1_getU8( off2 + 84 );
                    grantsItem.baseGraph = l2l1_getU8( off2 + 85 );
                    grantsItem.numOfCodeBlocks = l2l1_getU8( off2 + 86 );
                    grantsItem.absoluteTxCount = l2l1_getU8( off2 + 87 );
                    grantsItem.codeBlockSize = l2l1_getU16( off2 + 88 );
                    grantsItem.numOfFillerBits = l2l1_getU16( off2 + 90 );
                    grantsItem.liftSize = l2l1_getU16( off2 + 92 );
                    grantsItem.liftSizeSetIndex = l2l1_getU8( off2 + 94 );
                    grantsItem.liftSizeColumnIndex = l2l1_getU8( off2 + 95 );
                    grantsItem.modulationOrder = l2l1_getU8( off2 + 96 );
                    grantsItem.rvIndex = l2l1_getU8( off2 + 97 );
                    grantsItem.ncb = l2l1_getU16( off2 + 98 );
                    grantsItem.k0divZ = l2l1_getU8( off2 + 100 );
                    grantsItem.numOfLayers = l2l1_getU8( off2 + 101 );
                    grantsItem.puschTransCoherence = l2l1_getU8( off2 + 102 );
                    grantsItem.puschTransformPrecoderFlag = l2l1_getU8( off2 + 103 );
                    grantsItem.fullPowerPuschPowerScalingRatio = l2l1_getU8( off2 + 104 );
                    grantsItem.blerTarget = l2l1_getU8( off2 + 105 );
                    grantsItem.firstLayerIndex = l2l1_getU8( off2 + 106 );
                    grantsItem.foeGapLargest = l2l1_getU8( off2 + 107 );
                    let eCpriConfigStruct = grantsItem.eCpriConfigStruct = {};
                    eCpriConfigStruct.numCeAxCIndex = l2l1_getU8( off2 + 108 );
                    eCpriConfigStruct.ceAxCIndex = l2l1_getU8Array( off2 + 112, 8 );
                    eCpriConfigStruct.patternId = l2l1_getU16Array( off2 + 120, 4 );
                    grantsItem.numOfDmrsCdmGroupWithoutData = l2l1_getU8( off2 + 128 );
                    grantsItem.slotAggregationCountDown = l2l1_getU8( off2 + 129 );
                    grantsItem.l2CtxtAnMgt = l2l1_getU8Array( off2 + 132, 8 );
                    grantsItem.eCpriSectionId = l2l1_getU16( off2 + 140 );
                    grantsItem.cRnti = l2l1_getU16( off2 + 142 );
                    off3 = off2 + 144;
                    let longTermCfoMetricOfBeam = grantsItem.longTermCfoMetricOfBeam = [];
                    for( let i3 = 0; i3 < 4; ++i3 ) {
                        let longTermCfoMetricOfBeamItem = {};
                        longTermCfoMetricOfBeamItem.Re = l2l1_getF32( off3 );
                        longTermCfoMetricOfBeamItem.Im = l2l1_getF32( off3 + 4 );
                        off3 += 8;
                        longTermCfoMetricOfBeam.push( longTermCfoMetricOfBeamItem );
                    }
                    let eCpriFcpSectionConfig = grantsItem.eCpriFcpSectionConfig = {};
                    eCpriFcpSectionConfig.fcpStartPrbc = l2l1_getU16( off2 + 176 );
                    eCpriFcpSectionConfig.fcpNumPrbc = l2l1_getU16( off2 + 178 );
                    eCpriFcpSectionConfig.fcpAddSectionEnable = l2l1_getU8( off2 + 180 );
                    eCpriFcpSectionConfig.fcpAddSectionId = l2l1_getU16( off2 + 182 );
                    eCpriFcpSectionConfig.fcpAddStartPrbc = l2l1_getU16( off2 + 184 );
                    eCpriFcpSectionConfig.fcpAddNumPrbc = l2l1_getU16( off2 + 186 );
                    eCpriFcpSectionConfig.fcpAddPatternId = l2l1_getU16Array( off2 + 188, 2 );
                    grantsItem.prachPeakMetric = l2l1_getF32( off2 + 192 );
                    grantsItem.ulRiSelectionThreshold = l2l1_getF32( off2 + 196 );
                    grantsItem.pBoost = l2l1_getF32( off2 + 200 );
                    let ext = grantsItem.ext = {};
                    off3 = off2 + 204 + l2l1_getU32( off2 + 204 );
                    len3 = l2l1_getU32( off2 + 208 );
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        off4 = off3 + l2l1_getU32( off3 );
                        discriminator4 = l2l1_getU32( off3 + 4 );
                        switch( discriminator4 ) {
                            case 1: {
                                ext.taMacCeValueTM = l2l1_getU8( off4 );
                            }
                            break;
                            default: {
                            }
                        }
                        off3 += 8;
                    }
                    grantsItem.pairedUe = l2l1_getU16( off2 + 212 );
                    off2 += 216;
                    grants.push( grantsItem );
                }
                off1 += 16;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE253: { // UlCell::SetupReq
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
            l2l1.prachCohCombLen = l2l1_getU8( 14 );
            l2l1.totalNumberOfRAPreambles = l2l1_getU8( 15 );
            l2l1.rxScalingFactor = l2l1_getI16( 16 );
            l2l1.pucchHoppingId = l2l1_getU16( 18 );
            off1 = 20 + l2l1_getU32( 20 );
            len1 = l2l1_getU32( 24 );
            let phaseCompensationLutIndex = l2l1.phaseCompensationLutIndex = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let phaseCompensationLutIndexItem = {};
                phaseCompensationLutIndexItem.phaseCompensationLutIndex = l2l1_getU16Array( off1, 112 );
                off1 += 224;
                phaseCompensationLutIndex.push( phaseCompensationLutIndexItem );
            }
            l2l1.ulSubcellPosition = l2l1_getU8( 28 );
            l2l1.eCpriLink = l2l1_getU8( 29 );
            l2l1.numCeAxCId = l2l1_getU8( 30 );
            l2l1.fronthaulMode = l2l1_getU8( 31 );
            l2l1.ceAxCId = l2l1_getU16Array( 32, 28 );
            l2l1.digitalOutputEnabled = l2l1_getU8( 88 );
            l2l1.digitalOutputType = l2l1_getU8( 89 );
            l2l1.digitalOutputRate = l2l1_getU8( 90 );
            l2l1.bbSelector = l2l1_getU8( 91 );
            l2l1.harqFeedbackQueueID = l2l1_getU32( 92 );
            l2l1.isConformanceTestEnabled = l2l1_getU8( 96 );
            l2l1.pfaTargetPrachId = l2l1_getU8( 97 );
            l2l1.addExtDelayCompensation = l2l1_getU16( 98 );
            l2l1.cellExtension = l2l1_getU8( 100 );
            l2l1.frequencyShift7pt5khz = l2l1_getU8( 101 );
            l2l1.actEcpriPhase2 = l2l1_getU8( 102 );
            l2l1.cpriDialectIndication = l2l1_getU8( 103 );
            l2l1.axcPosition = l2l1_getU32Array( 108, l2l1_getU32( 104 ) );
            l2l1.prachConfigurationIndex = l2l1_getU8( 172 );
            l2l1.prachPrbOffset = l2l1_getU16( 174 );
            l2l1.adjustPrachThresholdOffsetDb = l2l1_getU16( 176 );
            l2l1.ulDlDataSlotRatio = l2l1_getU8( 178 );
            l2l1.ulSubcellPoolId = l2l1_getU8( 179 );
            l2l1.l1SubpoolId = l2l1_getU16( 180 );
            l2l1.firstCellSlotId = l2l1_getU16( 182 );
            l2l1.cellSlotLength = l2l1_getU16( 184 );
            l2l1.ulEcpriFdBeamforming = l2l1_getU8( 186 );
            l2l1.actUlEcpriExtType12 = l2l1_getU8( 187 );
            l2l1.gainCorrection = l2l1_getI16( 188 );
            l2l1.gainCorrectionForNdmSrs = l2l1_getI16( 190 );
            l2l1.gainCorrectionForPrach = l2l1_getI16( 192 );
            l2l1.ulScPerCarrierPart = l2l1_getU16Array( 196 + l2l1_getU32( 196 ), l2l1_getU32( 200 ) );
            l2l1.actUlEcpriPhase4 = l2l1_getU8( 204 );
            l2l1.prachDtxThresholdSelection = l2l1_getU8( 205 );
            l2l1.actORANstep1 = l2l1_getU8( 206 );
            l2l1.actOranFDD = l2l1_getU8( 207 );
            l2l1.ORANprachNumerology = l2l1_getU8( 208 );
            l2l1.ulIqCompression = l2l1_getU8( 209 );
            l2l1.ulActDownSampling = l2l1_getU8( 210 );
            l2l1.mantissaSize = l2l1_getU8( 211 );
            l2l1.localCellResId = l2l1_getU32( 212 );
            l2l1.staticLongPucch = l2l1_getU8( 216 );
            l2l1.actAdaptiveReTxResMcsEnh = l2l1_getU8( 217 );
            l2l1.actPucchF3MethodDtx = l2l1_getU8( 218 );
            l2l1.actPrachNoPreambleNoisePowerEst = l2l1_getU8( 219 );
            l2l1.actPrachMultiplexingLevel = l2l1_getU8( 220 );
            l2l1.actPuschACSIPart2ThrAdj = l2l1_getU8( 221 );
            l2l1.pSRSact = l2l1_getU8( 222 );
            l2l1.pSRSBwvAct = l2l1_getU8( 223 );
            let pSRSBwvConfig = l2l1.pSRSBwvConfig = {};
            pSRSBwvConfig.bwvSubbandSize = l2l1_getU16( 224 );
            pSRSBwvConfig.numPrbPerWideband = l2l1_getU16( 226 );
            pSRSBwvConfig.method = l2l1_getU8( 228 );
            pSRSBwvConfig.compressedBwv = l2l1_getU8( 229 );
            pSRSBwvConfig.srsSinrThreshold = l2l1_getI16( 230 );
            pSRSBwvConfig.srsPortPowerThreshold = l2l1_getI16( 232 );
            pSRSBwvConfig.maxRtBwvDownloadPerSlot = l2l1_getU16( 234 );
            pSRSBwvConfig.maxRtBwvMessagesPerSymbol = l2l1_getU16( 236 );
            let pSRSconfig = l2l1.pSRSconfig = {};
            pSRSconfig.numPrbPerSubband = l2l1_getU16( 240 );
            pSRSconfig.pSRSnumCeAxCId = l2l1_getU8( 242 );
            pSRSconfig.numberOfColTRX = l2l1_getU8( 243 );
            pSRSconfig.numberOfRowTRX = l2l1_getU8( 244 );
            let preCombinerBeamsRow = pSRSconfig.preCombinerBeamsRow = {};
            preCombinerBeamsRow.realPartOfPrecombinerRows = l2l1_getI16Array( 248 + l2l1_getU32( 248 ), l2l1_getU32( 252 ) );
            preCombinerBeamsRow.imagPartOfPrecombinerRows = l2l1_getI16Array( 256 + l2l1_getU32( 256 ), l2l1_getU32( 260 ) );
            let preCombinerBeamsColumn = pSRSconfig.preCombinerBeamsColumn = {};
            preCombinerBeamsColumn.realPartOfPrecombinerColumns = l2l1_getI16Array( 264 + l2l1_getU32( 264 ), l2l1_getU32( 268 ) );
            preCombinerBeamsColumn.imagPartOfPrecombinerColumns = l2l1_getI16Array( 272 + l2l1_getU32( 272 ), l2l1_getU32( 276 ) );
            off1 = 280 + l2l1_getU32( 280 );
            len1 = l2l1_getU32( 284 );
            let ulBeams = pSRSconfig.ulBeams = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let ulBeamsItem = {};
                ulBeamsItem.patternId = l2l1_getU16( off1 );
                ulBeamsItem.realPartOfWeight = l2l1_getI16Array( off1 + 4, 32 );
                ulBeamsItem.imagPartOfWeight = l2l1_getI16Array( off1 + 68, 32 );
                off1 += 132;
                ulBeams.push( ulBeamsItem );
            }
            let SRSconfig = l2l1.SRSconfig = {};
            SRSconfig.srsPosAct = l2l1_getU8( 288 );
            SRSconfig.transmissionComb = l2l1_getU8( 289 );
            SRSconfig.sequenceId = l2l1_getU16( 290 );
            l2l1.actHighSpeedCell = l2l1_getU8( 292 );
            l2l1.actUlMuMimo = l2l1_getU8( 293 );
            l2l1.ulMaxUplaneSectionsPerSym = l2l1_getU8( 294 );
            l2l1.actUlPrbMuting = l2l1_getU8( 295 );
            l2l1.ulSubCellCaps = l2l1_getU32( 296 );
            l2l1.mantissaSizePuschBeta = l2l1_getU8( 300 );
            l2l1.xEc = l2l1_getU8( 301 );
            l2l1.betaEc = l2l1_getU8( 302 );
            l2l1.numOfLogicalResourceIds = l2l1_getU8( 303 );
            l2l1.logicalResourceIds = l2l1_getU32Array( 304, 28 );
            l2l1.numOfUlBlankedPrbs = l2l1_getU16( 416 );
            l2l1.numOfUlBlankedPrbsLowEdge = l2l1_getU16( 418 );
            l2l1.multiPurposeField = l2l1_getU16( 420 );
            l2l1.explicitPadding = l2l1_getU16( 422 );
            l2l1.nbrOfSsbPerRachOccasion = l2l1_getU8( 424 );
            l2l1.actIrcRddDebiasing = l2l1_getU8( 425 );
        }
        break;
        case 0xE254: { // UlCell::SetupResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU32( 4 );
            l2l1.diagnosticInformation = l2l1_getU32Array( 8 + l2l1_getU32( 8 ), l2l1_getU32( 12 ) );
        }
        break;
        case 0xE255: { // UlData::SrsReceiveReq
            l2l1.addrSrsReceiveResp = l2l1_getU32( 0 );
            l2l1.addrSrsReceiveRespBm = l2l1_getU32( 4 );
            l2l1.addrSrsReceiveRespBwv = l2l1_getU32( 8 );
            l2l1.sfn = l2l1_getU16( 12 );
            l2l1.slot = l2l1_getU8( 14 );
            off1 = 16 + l2l1_getU32( 16 );
            len1 = l2l1_getU32( 20 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.srsSuMimoEnable = l2l1_getU8( off1 + 1 );
                subcellsItem.srsBmEnable = l2l1_getU8( off1 + 2 );
                subcellsItem.srsBwvEnable = l2l1_getU8( off1 + 3 );
                subcellsItem.srsRtBfEnable = l2l1_getU8( off1 + 4 );
                subcellsItem.brokenAntBitmask = l2l1_getU64( off1 + 8 );
                let srsSuMimoStruct = subcellsItem.srsSuMimoStruct = {};
                srsSuMimoStruct.processInRealTime = l2l1_getU8( off1 + 16 );
                srsSuMimoStruct.sfnForProcessing = l2l1_getU16( off1 + 18 );
                srsSuMimoStruct.slotForProcessing = l2l1_getU8( off1 + 20 );
                off2 = off1 + 24 + l2l1_getU32( off1 + 24 );
                len2 = l2l1_getU32( off1 + 28 );
                let srsReceiveReqUes = srsSuMimoStruct.srsReceiveReqUes = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsReceiveReqUesItem = {};
                    srsReceiveReqUesItem.rnti = l2l1_getU16( off2 );
                    srsReceiveReqUesItem.symbolPosition = l2l1_getU8( off2 + 2 );
                    srsReceiveReqUesItem.transmissionCombId = l2l1_getU8( off2 + 3 );
                    srsReceiveReqUesItem.srsBandwidth = l2l1_getU8( off2 + 4 );
                    srsReceiveReqUesItem.srsBandwidthConfig = l2l1_getU8( off2 + 5 );
                    srsReceiveReqUesItem.freqDomainPosition = l2l1_getU8( off2 + 6 );
                    srsReceiveReqUesItem.freqDomainShift = l2l1_getU16( off2 + 8 );
                    srsReceiveReqUesItem.cyclicShift = l2l1_getU8( off2 + 10 );
                    srsReceiveReqUesItem.patternId = l2l1_getU16Array( off2 + 12, 8 );
                    srsReceiveReqUesItem.eCpriSectionId = l2l1_getU16( off2 + 28 );
                    srsReceiveReqUesItem.numOfSrsPorts = l2l1_getU8( off2 + 30 );
                    srsReceiveReqUesItem.ueReceiverSize = l2l1_getU8( off2 + 31 );
                    srsReceiveReqUesItem.startPrb = l2l1_getU16( off2 + 32 );
                    srsReceiveReqUesItem.puschTransCoherence = l2l1_getU8( off2 + 34 );
                    srsReceiveReqUesItem.fullPowerPuschPowerScalingRatio = l2l1_getU8( off2 + 35 );
                    srsReceiveReqUesItem.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32( off2 + 36 );
                    srsReceiveReqUesItem.ulRiSelectionThreshold = l2l1_getF32( off2 + 40 );
                    srsReceiveReqUesItem.ueType = l2l1_getU8( off2 + 44 );
                    srsReceiveReqUesItem.numCeAxCIndex = l2l1_getU8( off2 + 45 );
                    srsReceiveReqUesItem.ceAxCIndex = l2l1_getU8Array( off2 + 48, 8 );
                    off2 += 56;
                    srsReceiveReqUes.push( srsReceiveReqUesItem );
                }
                let srsBmStruct = subcellsItem.srsBmStruct = {};
                srsBmStruct.numSrsSymbols = l2l1_getU8( off1 + 32 );
                off2 = off1 + 36 + l2l1_getU32( off1 + 36 );
                len2 = l2l1_getU32( off1 + 40 );
                let srsBmResource = srsBmStruct.srsBmResource = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsBmResourceItem = {};
                    srsBmResourceItem.rnti = l2l1_getU16( off2 );
                    srsBmResourceItem.srsBmSubbandId = l2l1_getU8( off2 + 2 );
                    srsBmResourceItem.transmissionCombId = l2l1_getU8( off2 + 3 );
                    srsBmResourceItem.bmCyclicShift = l2l1_getU8( off2 + 4 );
                    srsBmResourceItem.srsResourceIdentity = l2l1_getU8( off2 + 5 );
                    srsBmResourceItem.startPrb = l2l1_getU16( off2 + 6 );
                    srsBmResourceItem.symbolPosition = l2l1_getU8( off2 + 8 );
                    off2 += 12;
                    srsBmResource.push( srsBmResourceItem );
                }
                let srsBwvStruct = subcellsItem.srsBwvStruct = {};
                off2 = off1 + 44 + l2l1_getU32( off1 + 44 );
                len2 = l2l1_getU32( off1 + 48 );
                let srsBwvReportRequests = srsBwvStruct.srsBwvReportRequests = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsBwvReportRequestsItem = {};
                    srsBwvReportRequestsItem.bwvReportId = l2l1_getU16( off2 );
                    srsBwvReportRequestsItem.numBwvPerSubband = l2l1_getU8( off2 + 2 );
                    srsBwvReportRequestsItem.symbolPosition = l2l1_getU8( off2 + 3 );
                    srsBwvReportRequestsItem.operation = l2l1_getU16( off2 + 4 );
                    srsBwvReportRequestsItem.rnti = l2l1_getU16( off2 + 6 );
                    srsBwvReportRequestsItem.sinr = l2l1_getF32( off2 + 8 );
                    srsBwvReportRequestsItem.rho = l2l1_getF32( off2 + 12 );
                    srsBwvReportRequestsItem.bfSubbandId = l2l1_getU8Array( off2 + 16, 2 );
                    srsBwvReportRequestsItem.numSrsPorts = l2l1_getU8( off2 + 20 );
                    srsBwvReportRequestsItem.srsBmSubbandIdLtCoMa = l2l1_getU8( off2 + 21 );
                    srsBwvReportRequestsItem.startPrbLtCoMa = l2l1_getU16( off2 + 22 );
                    srsBwvReportRequestsItem.srsResourceIdentity = l2l1_getU8( off2 + 24 );
                    srsBwvReportRequestsItem.startPatternId = l2l1_getU16( off2 + 26 );
                    srsBwvReportRequestsItem.startPrb = l2l1_getU16( off2 + 28 );
                    off3 = off2 + 32 + l2l1_getU32( off2 + 32 );
                    len3 = l2l1_getU32( off2 + 36 );
                    let srsCyclicShifts = srsBwvReportRequestsItem.srsCyclicShifts = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let srsCyclicShiftsItem = {};
                        srsCyclicShiftsItem.transmissionCombId = l2l1_getU8( off3 );
                        srsCyclicShiftsItem.cyclicShift = l2l1_getU8( off3 + 1 );
                        srsCyclicShiftsItem.portIndex = l2l1_getU8( off3 + 2 );
                        off3 += 4;
                        srsCyclicShifts.push( srsCyclicShiftsItem );
                    }
                    off2 += 40;
                    srsBwvReportRequests.push( srsBwvReportRequestsItem );
                }
                let srsRtBfStruct = subcellsItem.srsRtBfStruct = {};
                srsRtBfStruct.ceDumpGranularityInSubbands = l2l1_getU8( off1 + 52 );
                off2 = off1 + 56 + l2l1_getU32( off1 + 56 );
                len2 = l2l1_getU32( off1 + 60 );
                let srsRtBfReceiveReqUes = srsRtBfStruct.srsRtBfReceiveReqUes = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsRtBfReceiveReqUesItem = {};
                    srsRtBfReceiveReqUesItem.rtBfUeIndex = l2l1_getU16( off2 );
                    srsRtBfReceiveReqUesItem.rnti = l2l1_getU16( off2 + 2 );
                    srsRtBfReceiveReqUesItem.symbolPosition = l2l1_getU8( off2 + 4 );
                    srsRtBfReceiveReqUesItem.numSrsPorts = l2l1_getU8( off2 + 5 );
                    srsRtBfReceiveReqUesItem.ceOperation = l2l1_getU8( off2 + 6 );
                    srsRtBfReceiveReqUesItem.srsBmSubbandIdLtCoMa = l2l1_getU8( off2 + 7 );
                    srsRtBfReceiveReqUesItem.startPrbltCoMa = l2l1_getU16( off2 + 8 );
                    srsRtBfReceiveReqUesItem.startPrb = l2l1_getU16( off2 + 10 );
                    srsRtBfReceiveReqUesItem.srsResourceIdentity = l2l1_getU8( off2 + 12 );
                    srsRtBfReceiveReqUesItem.srsSubbandId = l2l1_getU8( off2 + 13 );
                    off3 = off2 + 16 + l2l1_getU32( off2 + 16 );
                    len3 = l2l1_getU32( off2 + 20 );
                    let srsRtBfCyclicShifts = srsRtBfReceiveReqUesItem.srsRtBfCyclicShifts = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let srsRtBfCyclicShiftsItem = {};
                        srsRtBfCyclicShiftsItem.transmissionCombId = l2l1_getU8( off3 );
                        srsRtBfCyclicShiftsItem.cyclicShift = l2l1_getU8( off3 + 1 );
                        srsRtBfCyclicShiftsItem.portIndex = l2l1_getU8( off3 + 2 );
                        off3 += 4;
                        srsRtBfCyclicShifts.push( srsRtBfCyclicShiftsItem );
                    }
                    off2 += 24;
                    srsRtBfReceiveReqUes.push( srsRtBfReceiveReqUesItem );
                }
                subcellsItem.srsPowerThreshold = l2l1_getI16( off1 + 64 );
                subcellsItem.srsPowerThresholdDl = l2l1_getI16( off1 + 66 );
                off1 += 72;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE256: { // UlData::SrsReceiveRespBmPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.fragmentIndex = l2l1_getU8( 3 );
            l2l1.totalFragmentNum = l2l1_getU8( 4 );
            l2l1.polarization = l2l1_getU8( 5 );
            l2l1.subcellId = l2l1_getU8( 6 );
            l2l1.symbolPosition = l2l1_getU8( 7 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let srsRespBmPsResources = l2l1.srsRespBmPsResources = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let srsRespBmPsResourcesItem = {};
                srsRespBmPsResourcesItem.srsBmSubbandId = l2l1_getU8( off1 );
                srsRespBmPsResourcesItem.transmissionCombId = l2l1_getU8( off1 + 1 );
                srsRespBmPsResourcesItem.bmCyclicShift = l2l1_getU8( off1 + 2 );
                srsRespBmPsResourcesItem.srsResourceIdentity = l2l1_getU8( off1 + 3 );
                srsRespBmPsResourcesItem.rnti = l2l1_getU16( off1 + 4 );
                srsRespBmPsResourcesItem.scalingHorizontal = l2l1_getI8( off1 + 6 );
                srsRespBmPsResourcesItem.scalingVertical = l2l1_getI8( off1 + 7 );
                off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                len2 = l2l1_getU32( off1 + 12 );
                let covarianceMatrixHorizontal = srsRespBmPsResourcesItem.covarianceMatrixHorizontal = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let covarianceMatrixHorizontalItem = {};
                    covarianceMatrixHorizontalItem.covMatrixReal = l2l1_getI16( off2 );
                    covarianceMatrixHorizontalItem.covMatrixImag = l2l1_getI16( off2 + 2 );
                    off2 += 4;
                    covarianceMatrixHorizontal.push( covarianceMatrixHorizontalItem );
                }
                off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                len2 = l2l1_getU32( off1 + 20 );
                let covarianceMatrixVertical = srsRespBmPsResourcesItem.covarianceMatrixVertical = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let covarianceMatrixVerticalItem = {};
                    covarianceMatrixVerticalItem.covMatrixReal = l2l1_getI16( off2 );
                    covarianceMatrixVerticalItem.covMatrixImag = l2l1_getI16( off2 + 2 );
                    off2 += 4;
                    covarianceMatrixVertical.push( covarianceMatrixVerticalItem );
                }
                srsRespBmPsResourcesItem.srsPower = l2l1_getF32Array( off1 + 24, 2 );
                srsRespBmPsResourcesItem.dtx = l2l1_getU8( off1 + 32 );
                srsRespBmPsResourcesItem.dtxDl = l2l1_getU8( off1 + 33 );
                off1 += 36;
                srsRespBmPsResources.push( srsRespBmPsResourcesItem );
            }
        }
        break;
        case 0xE257: { // UlData::AddressReq
            l2l1.subcellId = l2l1_getU8( 0 );
            let l2UlAddresses = l2l1.l2UlAddresses = {};
            l2UlAddresses.prachReceiveInd = l2l1_getU32( 4 );
            l2UlAddresses.diagnosticInd = l2l1_getU32( 8 );
        }
        break;
        case 0xE258: { // UlData::DiagnosticInd
            l2l1.indType = l2l1_getU8( 0 );
        }
        break;
        case 0xE259: { // UlPool::AddressReq
            l2l1.l1PoolId = l2l1_getU32( 0 );
        }
        break;
        case 0xE25A: { // UlPool::AddressResp
            l2l1.l1PoolId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
            l2l1.cause = l2l1_getU8( 5 );
            l2l1.ulBbPoolingResourceReconfReqAddress = l2l1_getU32( 8 );
        }
        break;
        case 0xE25B: { // UlPool::BbResourceReconfReq
            l2l1.addrBbPoolingResourceReconfResp = l2l1_getU32( 0 );
            l2l1.sfn = l2l1_getU16( 4 );
            l2l1.l1PoolId = l2l1_getU32( 8 );
            off1 = 12;
            let l1SubPool = l2l1.l1SubPool = [];
            for( let i1 = 0; i1 < 4; ++i1 ) {
                let l1SubPoolItem = {};
                l1SubPoolItem.l1SubPoolId = l2l1_getU16( off1 );
                let slowPrbPoolingParameters = l1SubPoolItem.slowPrbPoolingParameters = {};
                slowPrbPoolingParameters.l1SpMaxNumStreamPrb = l2l1_getU16( off1 + 4 );
                slowPrbPoolingParameters.l1SpMaxNumLayerPrb = l2l1_getU16( off1 + 6 );
                off1 += 8;
                l1SubPool.push( l1SubPoolItem );
            }
        }
        break;
        case 0xE25C: { // UlPool::BbResourceReconfResp
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.l1PoolId = l2l1_getU32( 4 );
            l2l1.status = l2l1_getU8( 8 );
            l2l1.cause = l2l1_getU8( 9 );
        }
        break;
        case 0xE25D: { // UlData::SrsReceiveRespBwvPs
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.fhTransDelay = l2l1_getU8( off1 + 1 );
                subcellsItem.sfn = l2l1_getU16( off1 + 2 );
                subcellsItem.slot = l2l1_getU8( off1 + 4 );
                off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                len2 = l2l1_getU32( off1 + 12 );
                let srsBwvReports = subcellsItem.srsBwvReports = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let srsBwvReportsItem = {};
                    srsBwvReportsItem.bwvReportId = l2l1_getU16( off2 );
                    srsBwvReportsItem.rnti = l2l1_getU16( off2 + 2 );
                    srsBwvReportsItem.portPower = l2l1_getF32Array( off2 + 4, 4 );
                    srsBwvReportsItem.sinr = l2l1_getF32Array( off2 + 20, 4 );
                    off3 = off2 + 36 + l2l1_getU32( off2 + 36 );
                    len3 = l2l1_getU32( off2 + 40 );
                    let eirpCoefficients = srsBwvReportsItem.eirpCoefficients = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let eirpCoefficientsItem = {};
                        eirpCoefficientsItem.Re = l2l1_getF32( off3 );
                        eirpCoefficientsItem.Im = l2l1_getF32( off3 + 4 );
                        off3 += 8;
                        eirpCoefficients.push( eirpCoefficientsItem );
                    }
                    srsBwvReportsItem.portPowerCsiRsSubband = l2l1_getF32Array( off2 + 44, 4 );
                    srsBwvReportsItem.timingOffset = l2l1_getI16( off2 + 60 );
                    srsBwvReportsItem.result = l2l1_getU8( off2 + 62 );
                    srsBwvReportsItem.numBwvPerSubband = l2l1_getU8( off2 + 63 );
                    srsBwvReportsItem.startPatternId = l2l1_getU16( off2 + 64 );
                    srsBwvReportsItem.correlation = l2l1_getF32Array( off2 + 68 + l2l1_getU32( off2 + 68 ), l2l1_getU32( off2 + 72 ) );
                    off2 += 76;
                    srsBwvReports.push( srsBwvReportsItem );
                }
                off1 += 16;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE25E: { // UlData::PuschReceiveReqL1ru
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.subcellId = l2l1_getU8( 3 );
            l2l1.postSuSinr = l2l1_getU8( 4 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let grants = l2l1.grants = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let grantsItem = {};
                grantsItem.rnti = l2l1_getU16( off1 );
                grantsItem.ulDmrsConfigType = l2l1_getU8( off1 + 2 );
                grantsItem.ulDmrsLen = l2l1_getU8( off1 + 3 );
                grantsItem.ulDmrsMappingType = l2l1_getU8( off1 + 4 );
                grantsItem.ulDmrsAddPos = l2l1_getU8( off1 + 5 );
                grantsItem.ulDmrsTypeAPos = l2l1_getU8( off1 + 6 );
                grantsItem.startSymbol = l2l1_getU8( off1 + 7 );
                grantsItem.numOfPuschSymbols = l2l1_getU8( off1 + 8 );
                grantsItem.startPrb = l2l1_getU16( off1 + 10 );
                grantsItem.numOfPrb = l2l1_getU16( off1 + 12 );
                grantsItem.antPort = l2l1_getU16( off1 + 14 );
                grantsItem.spatialMode = l2l1_getU8( off1 + 16 );
                grantsItem.codebookIndex = l2l1_getU8( off1 + 17 );
                grantsItem.nscId = l2l1_getU8( off1 + 18 );
                grantsItem.fakeUe = l2l1_getU8( off1 + 19 );
                grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off1 + 20 );
                grantsItem.dmrsSequenceType = l2l1_getU8( off1 + 22 );
                grantsItem.longTermCfoMetricReal = l2l1_getF32( off1 + 24 );
                grantsItem.longTermCfoMetricImag = l2l1_getF32( off1 + 28 );
                grantsItem.foeValid = l2l1_getU8( off1 + 32 );
                grantsItem.numOfLayers = l2l1_getU8( off1 + 33 );
                grantsItem.puschTransCoherence = l2l1_getU8( off1 + 34 );
                grantsItem.puschTransformPrecoderFlag = l2l1_getU8( off1 + 35 );
                grantsItem.fullPowerPuschPowerScalingRatio = l2l1_getU8( off1 + 36 );
                grantsItem.firstLayerIndex = l2l1_getU8( off1 + 37 );
                grantsItem.patternId = l2l1_getU16Array( off1 + 40 + l2l1_getU32( off1 + 40 ), l2l1_getU32( off1 + 44 ) );
                grantsItem.numOfDmrsCdmGroupWithoutData = l2l1_getU8( off1 + 48 );
                off2 = off1 + 52 + l2l1_getU32( off1 + 52 );
                len2 = l2l1_getU32( off1 + 56 );
                let longTermCfoMetricOfBeam = grantsItem.longTermCfoMetricOfBeam = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let longTermCfoMetricOfBeamItem = {};
                    longTermCfoMetricOfBeamItem.Re = l2l1_getF32( off2 );
                    longTermCfoMetricOfBeamItem.Im = l2l1_getF32( off2 + 4 );
                    off2 += 8;
                    longTermCfoMetricOfBeam.push( longTermCfoMetricOfBeamItem );
                }
                grantsItem.ulRiSelectionThreshold = l2l1_getF32( off1 + 60 );
                grantsItem.pBoost = l2l1_getF32( off1 + 64 );
                grantsItem.pairedUe = l2l1_getU16( off1 + 68 );
                grantsItem.numOfPrbExtra = l2l1_getU16( off1 + 70 );
                grantsItem.startAntIndex = l2l1_getU8( off1 + 72 );
                grantsItem.ueReceiverSize = l2l1_getU8( off1 + 73 );
                off1 += 76;
                grants.push( grantsItem );
            }
        }
        break;
        case 0xE25F: { // UlDataFH::PuschReceiveReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let grants = l2l1.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                grantsItem.rnti = l2l1_getU16( off2 );
                                grantsItem.numOfLayers = l2l1_getU8( off2 + 2 );
                                grantsItem.firstLayerIndex = l2l1_getU8( off2 + 3 );
                                grantsItem.ulDmrsConfigType = l2l1_getU8( off2 + 4 );
                                grantsItem.ulDmrsLen = l2l1_getU8( off2 + 5 );
                                grantsItem.ulDmrsMappingType = l2l1_getU8( off2 + 6 );
                                grantsItem.ulDmrsAddPos = l2l1_getU8( off2 + 7 );
                                grantsItem.ulDmrsTypeAPos = l2l1_getU8( off2 + 8 );
                                grantsItem.numOfDmrsCdmGroupWithoutData = l2l1_getU8( off2 + 9 );
                                grantsItem.nscId = l2l1_getU8( off2 + 10 );
                                grantsItem.dmrsSequenceType = l2l1_getU8( off2 + 11 );
                                grantsItem.dmrsScramblingSequenceInt = l2l1_getU16( off2 + 12 );
                                grantsItem.startSymbol = l2l1_getU8( off2 + 14 );
                                grantsItem.numOfPuschSymbols = l2l1_getU8( off2 + 15 );
                                grantsItem.startPrb = l2l1_getU16( off2 + 16 );
                                grantsItem.numOfPrb = l2l1_getU16( off2 + 18 );
                                grantsItem.longTermCfoMetricReal = l2l1_getF32( off2 + 20 );
                                grantsItem.longTermCfoMetricImag = l2l1_getF32( off2 + 24 );
                                off3 = off2 + 28 + l2l1_getU32( off2 + 28 );
                                len3 = l2l1_getU32( off2 + 32 );
                                let longTermCfoMetricOfBeam = grantsItem.longTermCfoMetricOfBeam = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let longTermCfoMetricOfBeamItem = {};
                                    longTermCfoMetricOfBeamItem.Re = l2l1_getF32( off3 );
                                    longTermCfoMetricOfBeamItem.Im = l2l1_getF32( off3 + 4 );
                                    off3 += 8;
                                    longTermCfoMetricOfBeam.push( longTermCfoMetricOfBeamItem );
                                }
                                grantsItem.pairedUe = l2l1_getU16( off2 + 36 );
                                grantsItem.fakeUe = l2l1_getU8( off2 + 38 );
                                grantsItem.foeValid = l2l1_getU8( off2 + 39 );
                                grantsItem.codebookIndex = l2l1_getU8( off2 + 40 );
                                grantsItem.puschTransCoherence = l2l1_getU8( off2 + 41 );
                                grantsItem.puschTransformPrecoderFlag = l2l1_getU8( off2 + 42 );
                                grantsItem.fullPowerPuschPowerScalingRatio = l2l1_getU8( off2 + 43 );
                                grantsItem.patternId = l2l1_getU16Array( off2 + 44 + l2l1_getU32( off2 + 44 ), l2l1_getU32( off2 + 48 ) );
                                grantsItem.antPort = l2l1_getU16( off2 + 52 );
                                grantsItem.spatialMode = l2l1_getU8( off2 + 54 );
                                grantsItem.startAntIndex = l2l1_getU8( off2 + 55 );
                                grantsItem.ulRiSelectionThreshold = l2l1_getF32( off2 + 56 );
                                grantsItem.pBoost = l2l1_getF32( off2 + 60 );
                                grantsItem.numOfPrbExtra = l2l1_getU16( off2 + 64 );
                                grantsItem.ueReceiverSize = l2l1_getU8( off2 + 66 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        grants.push( grantsItem );
                    }
                    l2l1.postSuSinr = l2l1_getU8( off1 + 24 );
                    l2l1.totalNumOfGrants = l2l1_getU8( off1 + 25 );
                }
                break;
            }
        }
        break;
        case 0xE260: { // UlDataFH::PuschReceiveRespCellPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    l2l1.noisePower = l2l1_getF32( off1 + 8 );
                    l2l1.noisePerPrb = l2l1_getU32Array( off1 + 12 + l2l1_getU32( off1 + 12 ), l2l1_getU32( off1 + 16 ) );
                }
                break;
            }
        }
        break;
        case 0xE261: { // UlDataFH::PuschReceiveRespUePs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let grants = l2l1.grants = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let grantsItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                grantsItem.rnti = l2l1_getU16( off2 );
                                grantsItem.shortTermTaMetric = l2l1_getI16( off2 + 2 );
                                grantsItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 4 );
                                grantsItem.shortTermCfoMetricReal = l2l1_getF32( off2 + 8 );
                                grantsItem.shortTermCfoMetricImag = l2l1_getF32( off2 + 12 );
                                grantsItem.rxPower = l2l1_getF32( off2 + 16 );
                                grantsItem.rssi = l2l1_getF32( off2 + 20 );
                                grantsItem.dtx = l2l1_getU8( off2 + 24 );
                                grantsItem.ulRank = l2l1_getU8( off2 + 25 );
                                grantsItem.ulPmiRank1 = l2l1_getU8( off2 + 26 );
                                grantsItem.ulPmiRank2 = l2l1_getU8( off2 + 27 );
                                grantsItem.ulPmiRank1Sinr = l2l1_getF32( off2 + 28 );
                                grantsItem.ulPmiRank2Sinr = l2l1_getF32Array( off2 + 32 + l2l1_getU32( off2 + 32 ), l2l1_getU32( off2 + 36 ) );
                                grantsItem.dtxMetric = l2l1_getF32( off2 + 40 );
                                grantsItem.dtxThreshold = l2l1_getF32( off2 + 44 );
                                grantsItem.suPostCombSinr = l2l1_getF32Array( off2 + 48 + l2l1_getU32( off2 + 48 ), l2l1_getU32( off2 + 52 ) );
                                version_indicator3 = l2l1_getU32( off2 + 56 );
                                off3 = off2 + 60 + l2l1_getU32( off2 + 60 );
                                len3 = l2l1_getU32( off2 + 64 );
                                element_size3 = l2l1_getU32( off2 + 68 );
                                let puschAntMeas = grantsItem.puschAntMeas = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let puschAntMeasItem = {};
                                    switch (version_indicator3) {
                                        default:
                                        case 0: {
                                            puschAntMeasItem.rxPowerOfAnt = l2l1_getF32( off3 );
                                            puschAntMeasItem.sinrOfAnt = l2l1_getF32( off3 + 4 );
                                            puschAntMeasItem.linRssiOfAnt = l2l1_getU64( off3 + 8 );
                                            puschAntMeasItem.shortTermTaPeakAmpOfAnt = l2l1_getF32( off3 + 16 );
                                            puschAntMeasItem.shortTermCfoMetricRealOfAnt = l2l1_getF32( off3 + 20 );
                                            puschAntMeasItem.shortTermCfoMetricImagOfAnt = l2l1_getF32( off3 + 24 );
                                            puschAntMeasItem.linNoiseOfAnt = l2l1_getU32( off3 + 28 );
                                            puschAntMeasItem.shortTermTaMetricOfAnt = l2l1_getI16( off3 + 32 );
                                        }
                                        break;
                                    }
                                    off3 += element_size3;
                                    puschAntMeas.push( puschAntMeasItem );
                                }
                            }
                            break;
                        }
                        off2 += element_size2;
                        grants.push( grantsItem );
                    }
                    l2l1.totalNumOfGrants = l2l1_getU8( off1 + 24 );
                }
                break;
            }
        }
        break;
        case 0xE262: { // UlDataFH::SrsSuMimoReceiveReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsReceiveReqUes = l2l1.srsReceiveReqUes = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsReceiveReqUesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsReceiveReqUesItem.rnti = l2l1_getU16( off2 );
                                srsReceiveReqUesItem.symbolPosition = l2l1_getU8( off2 + 2 );
                                srsReceiveReqUesItem.transmissionCombId = l2l1_getU8( off2 + 3 );
                                srsReceiveReqUesItem.srsBandwidth = l2l1_getU8( off2 + 4 );
                                srsReceiveReqUesItem.srsBandwidthConfig = l2l1_getU8( off2 + 5 );
                                srsReceiveReqUesItem.freqDomainPosition = l2l1_getU8( off2 + 6 );
                                srsReceiveReqUesItem.cyclicShift = l2l1_getU8( off2 + 7 );
                                srsReceiveReqUesItem.patternId = l2l1_getU16Array( off2 + 8 + l2l1_getU32( off2 + 8 ), l2l1_getU32( off2 + 12 ) );
                                srsReceiveReqUesItem.freqDomainShift = l2l1_getU16( off2 + 16 );
                                srsReceiveReqUesItem.startPrb = l2l1_getU16( off2 + 18 );
                                srsReceiveReqUesItem.powerOffsetSrsToPuschPerAllocatedRe = l2l1_getF32( off2 + 20 );
                                srsReceiveReqUesItem.puschTransCoherence = l2l1_getU8( off2 + 24 );
                                srsReceiveReqUesItem.fullPowerPuschPowerScalingRatio = l2l1_getU8( off2 + 25 );
                                srsReceiveReqUesItem.numOfSrsPorts = l2l1_getU8( off2 + 26 );
                                srsReceiveReqUesItem.ueType = l2l1_getU8( off2 + 27 );
                                srsReceiveReqUesItem.ulRiSelectionThreshold = l2l1_getF32( off2 + 28 );
                                srsReceiveReqUesItem.multiUeMode = l2l1_getU8( off2 + 32 );
                                srsReceiveReqUesItem.ueReceiverSize = l2l1_getU8( off2 + 33 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsReceiveReqUes.push( srsReceiveReqUesItem );
                    }
                    l2l1.totalNumOfUEs = l2l1_getU8( off1 + 24 );
                }
                break;
            }
        }
        break;
        case 0xE263: { // UlDataFH::SrsSuMimoReceiveRespPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsReceiveRespPsUes = l2l1.srsReceiveRespPsUes = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsReceiveRespPsUesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsReceiveRespPsUesItem.rnti = l2l1_getU16( off2 );
                                srsReceiveRespPsUesItem.shortTermTaMetric = l2l1_getI16( off2 + 2 );
                                srsReceiveRespPsUesItem.shortTermTaPeakAmp = l2l1_getF32( off2 + 4 );
                                srsReceiveRespPsUesItem.sinr = l2l1_getF32( off2 + 8 );
                                srsReceiveRespPsUesItem.dtx = l2l1_getU8( off2 + 12 );
                                srsReceiveRespPsUesItem.ulRank = l2l1_getU8( off2 + 13 );
                                srsReceiveRespPsUesItem.ulPmiRank1 = l2l1_getU8( off2 + 14 );
                                srsReceiveRespPsUesItem.ulPmiRank2 = l2l1_getU8( off2 + 15 );
                                srsReceiveRespPsUesItem.ulPmiRank1Sinr = l2l1_getF32( off2 + 16 );
                                srsReceiveRespPsUesItem.ulPmiRank2Sinr = l2l1_getF32Array( off2 + 20 + l2l1_getU32( off2 + 20 ), l2l1_getU32( off2 + 24 ) );
                                version_indicator3 = l2l1_getU32( off2 + 28 );
                                off3 = off2 + 32 + l2l1_getU32( off2 + 32 );
                                len3 = l2l1_getU32( off2 + 36 );
                                element_size3 = l2l1_getU32( off2 + 40 );
                                let srsAntMeas = srsReceiveRespPsUesItem.srsAntMeas = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let srsAntMeasItem = {};
                                    switch (version_indicator3) {
                                        default:
                                        case 0: {
                                            srsAntMeasItem.rxPowerOfAnt = l2l1_getF32( off3 );
                                            srsAntMeasItem.sinrOfAnt = l2l1_getF32( off3 + 4 );
                                            srsAntMeasItem.shortTermTaPeakAmpOfAnt = l2l1_getF32( off3 + 8 );
                                            srsAntMeasItem.shortTermTaMetricOfAnt = l2l1_getI16( off3 + 12 );
                                        }
                                        break;
                                    }
                                    off3 += element_size3;
                                    srsAntMeas.push( srsAntMeasItem );
                                }
                                srsReceiveRespPsUesItem.numOfSrsTxPorts = l2l1_getU8( off2 + 44 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsReceiveRespPsUes.push( srsReceiveRespPsUesItem );
                    }
                    l2l1.symbolPosition = l2l1_getU8( off1 + 24 );
                    l2l1.totalNumOfUEs = l2l1_getU8( off1 + 25 );
                }
                break;
            }
        }
        break;
        case 0xE264: { // UlCell::DeleteReq
            l2l1.subcellId = l2l1_getU8( 0 );
        }
        break;
        case 0xE265: { // UlCell::DeleteResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU8( 2 );
        }
        break;
        case 0xE266: { // UlData::PrachReceiveIndTst
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.processInRealTime = l2l1_getU8( 3 );
            l2l1.sfnForProcessing = l2l1_getU16( 4 );
            l2l1.slotForProcessing = l2l1_getU8( 6 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let subcells = l2l1.subcells = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let subcellsItem = {};
                subcellsItem.subcellId = l2l1_getU8( off1 );
                subcellsItem.noisePower = l2l1_getF32( off1 + 4 );
                subcellsItem.noisePowerLinear = l2l1_getU32( off1 + 8 );
                off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                len2 = l2l1_getU32( off1 + 16 );
                let detectedPrachPreambles = subcellsItem.detectedPrachPreambles = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let detectedPrachPreamblesItem = {};
                    detectedPrachPreamblesItem.prachPreambleIndex = l2l1_getU8( off2 );
                    detectedPrachPreamblesItem.prachPreambleTimeOccasion = l2l1_getU8( off2 + 1 );
                    detectedPrachPreamblesItem.prachPreambleFreqOccasion = l2l1_getU8( off2 + 2 );
                    detectedPrachPreamblesItem.initialTa = l2l1_getU16( off2 + 4 );
                    detectedPrachPreamblesItem.peakMetric = l2l1_getF32( off2 + 8 );
                    off2 += 12;
                    detectedPrachPreambles.push( detectedPrachPreamblesItem );
                }
                off1 += 20;
                subcells.push( subcellsItem );
            }
        }
        break;
        case 0xE267: { // UlDataFH::SrsBmReceiveReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsBmResource = l2l1.srsBmResource = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsBmResourceItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsBmResourceItem.rnti = l2l1_getU16( off2 );
                                srsBmResourceItem.startPrb = l2l1_getU16( off2 + 2 );
                                srsBmResourceItem.srsBmSubbandId = l2l1_getU8( off2 + 4 );
                                srsBmResourceItem.transmissionCombId = l2l1_getU8( off2 + 5 );
                                srsBmResourceItem.bmCyclicShift = l2l1_getU8( off2 + 6 );
                                srsBmResourceItem.srsResourceIdentity = l2l1_getU8( off2 + 7 );
                                srsBmResourceItem.symbolPosition = l2l1_getU8( off2 + 8 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsBmResource.push( srsBmResourceItem );
                    }
                    l2l1.srsPowerThreshold = l2l1_getI16( off1 + 24 );
                    l2l1.srsPowerThresholdDl = l2l1_getI16( off1 + 26 );
                    l2l1.totalNumOfSrsBmResources = l2l1_getU16( off1 + 28 );
                    l2l1.totalNumOfSrsSymbols = l2l1_getU8( off1 + 30 );
                }
                break;
            }
        }
        break;
        case 0xE268: { // UlDataFH::SrsBmReceiveRespPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsRespBmPsResources = l2l1.srsRespBmPsResources = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsRespBmPsResourcesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsRespBmPsResourcesItem.srsBmSubbandId = l2l1_getU8( off2 );
                                srsRespBmPsResourcesItem.transmissionCombId = l2l1_getU8( off2 + 1 );
                                srsRespBmPsResourcesItem.bmCyclicShift = l2l1_getU8( off2 + 2 );
                                srsRespBmPsResourcesItem.srsResourceIdentity = l2l1_getU8( off2 + 3 );
                                srsRespBmPsResourcesItem.rnti = l2l1_getU16( off2 + 4 );
                                srsRespBmPsResourcesItem.scalingHorizontal = l2l1_getI8( off2 + 6 );
                                srsRespBmPsResourcesItem.scalingVertical = l2l1_getI8( off2 + 7 );
                                off3 = off2 + 8 + l2l1_getU32( off2 + 8 );
                                len3 = l2l1_getU32( off2 + 12 );
                                let covarianceMatrixHorizontal = srsRespBmPsResourcesItem.covarianceMatrixHorizontal = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let covarianceMatrixHorizontalItem = {};
                                    covarianceMatrixHorizontalItem.covMatrixReal = l2l1_getI16( off3 );
                                    covarianceMatrixHorizontalItem.covMatrixImag = l2l1_getI16( off3 + 2 );
                                    off3 += 4;
                                    covarianceMatrixHorizontal.push( covarianceMatrixHorizontalItem );
                                }
                                off3 = off2 + 16 + l2l1_getU32( off2 + 16 );
                                len3 = l2l1_getU32( off2 + 20 );
                                let covarianceMatrixVertical = srsRespBmPsResourcesItem.covarianceMatrixVertical = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let covarianceMatrixVerticalItem = {};
                                    covarianceMatrixVerticalItem.covMatrixReal = l2l1_getI16( off3 );
                                    covarianceMatrixVerticalItem.covMatrixImag = l2l1_getI16( off3 + 2 );
                                    off3 += 4;
                                    covarianceMatrixVertical.push( covarianceMatrixVerticalItem );
                                }
                                srsRespBmPsResourcesItem.srsPower = l2l1_getF32Array( off2 + 24 + l2l1_getU32( off2 + 24 ), l2l1_getU32( off2 + 28 ) );
                                srsRespBmPsResourcesItem.dtx = l2l1_getU8( off2 + 32 );
                                srsRespBmPsResourcesItem.dtxDl = l2l1_getU8( off2 + 33 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsRespBmPsResources.push( srsRespBmPsResourcesItem );
                    }
                    l2l1.polarization = l2l1_getU8( off1 + 24 );
                    l2l1.symbolPosition = l2l1_getU8( off1 + 25 );
                    l2l1.totalNumOfSrsBmResources = l2l1_getU16( off1 + 26 );
                }
                break;
            }
        }
        break;
        case 0xE269: { // UlData::SrsPosReceiveReq
            l2l1.srsReceiveRespPosClientAddress = l2l1_getU32( 0 );
            l2l1.sfn = l2l1_getU16( 4 );
            l2l1.slot = l2l1_getU8( 6 );
            l2l1.subcellId = l2l1_getU8( 7 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let srsPosReportRequests = l2l1.srsPosReportRequests = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let srsPosReportRequestsItem = {};
                srsPosReportRequestsItem.rnti = l2l1_getU16( off1 );
                srsPosReportRequestsItem.sequenceId = l2l1_getU16( off1 + 2 );
                srsPosReportRequestsItem.startPrb = l2l1_getU16( off1 + 4 );
                srsPosReportRequestsItem.numOfPrb = l2l1_getU16( off1 + 6 );
                srsPosReportRequestsItem.symbolPosition = l2l1_getU8( off1 + 8 );
                srsPosReportRequestsItem.transmissionComb = l2l1_getU8( off1 + 9 );
                srsPosReportRequestsItem.transmissionCombId = l2l1_getU8( off1 + 10 );
                srsPosReportRequestsItem.cyclicShift = l2l1_getU8( off1 + 11 );
                srsPosReportRequestsItem.numOfSrsPorts = l2l1_getU8( off1 + 12 );
                srsPosReportRequestsItem.measurements = l2l1_getU8( off1 + 13 );
                off1 += 16;
                srsPosReportRequests.push( srsPosReportRequestsItem );
            }
        }
        break;
        case 0xE26A: { // UlData::SrsPosReceiveRespPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.subcellId = l2l1_getU8( 3 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let srsPosReports = l2l1.srsPosReports = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let srsPosReportsItem = {};
                srsPosReportsItem.rnti = l2l1_getU16( off1 );
                srsPosReportsItem.sequenceId = l2l1_getU16( off1 + 2 );
                srsPosReportsItem.symbolPosition = l2l1_getU8( off1 + 4 );
                srsPosReportsItem.result = l2l1_getU8( off1 + 5 );
                srsPosReportsItem.timeOffsetPos = l2l1_getF32( off1 + 8 );
                srsPosReportsItem.rsrp = l2l1_getF32( off1 + 12 );
                off1 += 16;
                srsPosReports.push( srsPosReportsItem );
            }
        }
        break;
        case 0xE26B: { // UlData::SrsReceiveRespRtBfPs
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.subcellId = l2l1_getU8( 3 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let srsReceiveRespRtBfPsUes = l2l1.srsReceiveRespRtBfPsUes = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let srsReceiveRespRtBfPsUesItem = {};
                srsReceiveRespRtBfPsUesItem.rnti = l2l1_getU16( off1 );
                srsReceiveRespRtBfPsUesItem.rtBfUeIndex = l2l1_getU16( off1 + 2 );
                srsReceiveRespRtBfPsUesItem.symbolPosition = l2l1_getU8( off1 + 4 );
                srsReceiveRespRtBfPsUesItem.srsResourceIdentity = l2l1_getU8( off1 + 5 );
                srsReceiveRespRtBfPsUesItem.timingOffset = l2l1_getI16( off1 + 6 );
                srsReceiveRespRtBfPsUesItem.portPower = l2l1_getF32Array( off1 + 8 + l2l1_getU32( off1 + 8 ), l2l1_getU32( off1 + 12 ) );
                srsReceiveRespRtBfPsUesItem.sinr = l2l1_getF32Array( off1 + 16 + l2l1_getU32( off1 + 16 ), l2l1_getU32( off1 + 20 ) );
                srsReceiveRespRtBfPsUesItem.correlation = l2l1_getF32Array( off1 + 24 + l2l1_getU32( off1 + 24 ), l2l1_getU32( off1 + 28 ) );
                srsReceiveRespRtBfPsUesItem.dtx = l2l1_getU8Array( off1 + 32 + l2l1_getU32( off1 + 32 ), l2l1_getU32( off1 + 36 ) );
                srsReceiveRespRtBfPsUesItem.numInterferedBfSubband = l2l1_getU16Array( off1 + 40 + l2l1_getU32( off1 + 40 ), l2l1_getU32( off1 + 44 ) );
                srsReceiveRespRtBfPsUesItem.interferedSrsSubband = l2l1_getU8Array( off1 + 48 + l2l1_getU32( off1 + 48 ), l2l1_getU32( off1 + 52 ) );
                srsReceiveRespRtBfPsUesItem.portIndex = l2l1_getU8Array( off1 + 56 + l2l1_getU32( off1 + 56 ), l2l1_getU32( off1 + 60 ) );
                srsReceiveRespRtBfPsUesItem.srsSubbandId = l2l1_getU8( off1 + 64 );
                off1 += 68;
                srsReceiveRespRtBfPsUes.push( srsReceiveRespRtBfPsUesItem );
            }
        }
        break;
        case 0xE26C: { // UlDataFH::SrsRtBfReceiveReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsRtBfReceiveReqUes = l2l1.srsRtBfReceiveReqUes = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsRtBfReceiveReqUesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsRtBfReceiveReqUesItem.rtBfUeIndex = l2l1_getU16( off2 );
                                srsRtBfReceiveReqUesItem.rnti = l2l1_getU16( off2 + 2 );
                                srsRtBfReceiveReqUesItem.symbolPosition = l2l1_getU8( off2 + 4 );
                                srsRtBfReceiveReqUesItem.numSrsPorts = l2l1_getU8( off2 + 5 );
                                srsRtBfReceiveReqUesItem.ceOperation = l2l1_getU8( off2 + 6 );
                                srsRtBfReceiveReqUesItem.srsBmSubbandIdLtCoMa = l2l1_getU8( off2 + 7 );
                                srsRtBfReceiveReqUesItem.startPrbltCoMa = l2l1_getU16( off2 + 8 );
                                srsRtBfReceiveReqUesItem.startPrb = l2l1_getU16( off2 + 10 );
                                version_indicator3 = l2l1_getU32( off2 + 12 );
                                off3 = off2 + 16 + l2l1_getU32( off2 + 16 );
                                len3 = l2l1_getU32( off2 + 20 );
                                element_size3 = l2l1_getU32( off2 + 24 );
                                let srsRtBfCyclicShifts = srsRtBfReceiveReqUesItem.srsRtBfCyclicShifts = [];
                                for( let i3 = 0; i3 < len3; ++i3 ) {
                                    let srsRtBfCyclicShiftsItem = {};
                                    switch (version_indicator3) {
                                        default:
                                        case 0: {
                                            srsRtBfCyclicShiftsItem.transmissionCombId = l2l1_getU8( off3 );
                                            srsRtBfCyclicShiftsItem.cyclicShift = l2l1_getU8( off3 + 1 );
                                            srsRtBfCyclicShiftsItem.portIndex = l2l1_getU8( off3 + 2 );
                                        }
                                        break;
                                    }
                                    off3 += element_size3;
                                    srsRtBfCyclicShifts.push( srsRtBfCyclicShiftsItem );
                                }
                                srsRtBfReceiveReqUesItem.srsResourceIdentity = l2l1_getU8( off2 + 28 );
                                srsRtBfReceiveReqUesItem.srsSubbandId = l2l1_getU8( off2 + 29 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsRtBfReceiveReqUes.push( srsRtBfReceiveReqUesItem );
                    }
                    l2l1.srsPowerThreshold = l2l1_getI16( off1 + 24 );
                    l2l1.srsPowerThresholdDl = l2l1_getI16( off1 + 26 );
                    l2l1.ceDumpGranularityInSubbands = l2l1_getU8( off1 + 28 );
                    l2l1.totalNumOfUEs = l2l1_getU8( off1 + 29 );
                }
                break;
            }
        }
        break;
        case 0xE26D: { // UlDataFH::SrsRtBfReceiveRespPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let srsReceiveRespRtBfPsUes = l2l1.srsReceiveRespRtBfPsUes = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let srsReceiveRespRtBfPsUesItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                srsReceiveRespRtBfPsUesItem.rnti = l2l1_getU16( off2 );
                                srsReceiveRespRtBfPsUesItem.rtBfUeIndex = l2l1_getU16( off2 + 2 );
                                srsReceiveRespRtBfPsUesItem.portPower = l2l1_getF32Array( off2 + 4 + l2l1_getU32( off2 + 4 ), l2l1_getU32( off2 + 8 ) );
                                srsReceiveRespRtBfPsUesItem.sinr = l2l1_getF32Array( off2 + 12 + l2l1_getU32( off2 + 12 ), l2l1_getU32( off2 + 16 ) );
                                srsReceiveRespRtBfPsUesItem.dtx = l2l1_getU8Array( off2 + 20 + l2l1_getU32( off2 + 20 ), l2l1_getU32( off2 + 24 ) );
                                srsReceiveRespRtBfPsUesItem.correlation = l2l1_getF32Array( off2 + 28 + l2l1_getU32( off2 + 28 ), l2l1_getU32( off2 + 32 ) );
                                srsReceiveRespRtBfPsUesItem.numInterferedBfSubband = l2l1_getU16Array( off2 + 36 + l2l1_getU32( off2 + 36 ), l2l1_getU32( off2 + 40 ) );
                                srsReceiveRespRtBfPsUesItem.interferedSrsSubband = l2l1_getU8Array( off2 + 44 + l2l1_getU32( off2 + 44 ), l2l1_getU32( off2 + 48 ) );
                                srsReceiveRespRtBfPsUesItem.symbolPosition = l2l1_getU8( off2 + 52 );
                                srsReceiveRespRtBfPsUesItem.srsResourceIdentity = l2l1_getU8( off2 + 53 );
                                srsReceiveRespRtBfPsUesItem.timingOffset = l2l1_getI16( off2 + 54 );
                                srsReceiveRespRtBfPsUesItem.portIndex = l2l1_getU8Array( off2 + 56 + l2l1_getU32( off2 + 56 ), l2l1_getU32( off2 + 60 ) );
                                srsReceiveRespRtBfPsUesItem.srsSubbandId = l2l1_getU8( off2 + 64 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        srsReceiveRespRtBfPsUes.push( srsReceiveRespRtBfPsUesItem );
                    }
                    l2l1.totalNumOfUEs = l2l1_getU8( off1 + 24 );
                }
                break;
            }
        }
        break;
        case 0xE26E: { // UlDataFH::RimReceiveReq
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let rimRsSeq = l2l1.rimRsSeq = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let rimRsSeqItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                rimRsSeqItem.detectionResUnits = l2l1_getU8Array( off2 + l2l1_getU32( off2 ), l2l1_getU32( off2 + 4 ) );
                                rimRsSeqItem.seqInit = l2l1_getU32( off2 + 8 );
                                rimRsSeqItem.nScid = l2l1_getU16( off2 + 12 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        rimRsSeq.push( rimRsSeqItem );
                    }
                    l2l1.rimRssiRequest = l2l1_getU8( off1 + 24 );
                    l2l1.rimRsDetectionRequest = l2l1_getU8( off1 + 25 );
                    l2l1.patternId = l2l1_getU16( off1 + 26 );
                    l2l1.rimRsNumPrb = l2l1_getU8( off1 + 28 );
                    l2l1.riStartSymbol = l2l1_getU8( off1 + 29 );
                    l2l1.riNumOfSymbols = l2l1_getU8( off1 + 30 );
                    l2l1.riNumOfPrbPerSubBand = l2l1_getU8( off1 + 31 );
                    l2l1.riStartPrbPerSubBand = l2l1_getU16Array( off1 + 32 + l2l1_getU32( off1 + 32 ), l2l1_getU32( off1 + 36 ) );
                    l2l1.rimRsStartPrb = l2l1_getU16Array( off1 + 40 + l2l1_getU32( off1 + 40 ), l2l1_getU32( off1 + 44 ) );
                    off2 = off1 + 48 + l2l1_getU32( off1 + 48 );
                    len2 = l2l1_getU32( off1 + 52 );
                    let blankedRegion = l2l1.blankedRegion = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let blankedRegionItem = {};
                        blankedRegionItem.blankStartPrb = l2l1_getU16( off2 );
                        blankedRegionItem.blankNumOfPrb = l2l1_getU16( off2 + 2 );
                        off2 += 4;
                        blankedRegion.push( blankedRegionItem );
                    }
                    l2l1.rimRsSubCarrierOffset = l2l1_getU8( off1 + 56 );
                }
                break;
            }
        }
        break;
        case 0xE26F: { // UlDataFH::RimReceiveRespPs
            version_offset1 = 0 + l2l1_getU32( 0 )
            version_indicator1 = l2l1_getU32( 4 )
            off1 = version_offset1;
            switch (version_indicator1) {
                default:
                case 0: {
                    l2l1.messageVersion = l2l1_getU32( off1 );
                    l2l1.sfn = l2l1_getU16( off1 + 4 );
                    l2l1.slot = l2l1_getU8( off1 + 6 );
                    l2l1.subcellId = l2l1_getU8( off1 + 7 );
                    version_indicator2 = l2l1_getU32( off1 + 8 );
                    off2 = off1 + 12 + l2l1_getU32( off1 + 12 );
                    len2 = l2l1_getU32( off1 + 16 );
                    element_size2 = l2l1_getU32( off1 + 20 );
                    let rimRsDetectionReport = l2l1.rimRsDetectionReport = [];
                    for( let i2 = 0; i2 < len2; ++i2 ) {
                        let rimRsDetectionReportItem = {};
                        switch (version_indicator2) {
                            default:
                            case 0: {
                                rimRsDetectionReportItem.nScid = l2l1_getU16( off2 );
                                rimRsDetectionReportItem.startPrb = l2l1_getU16( off2 + 2 );
                                rimRsDetectionReportItem.rimRsSignalPower = l2l1_getF32( off2 + 4 );
                                rimRsDetectionReportItem.rimRsPeakValue = l2l1_getF32( off2 + 8 );
                                rimRsDetectionReportItem.rimRsPeakPosition = l2l1_getI16( off2 + 12 );
                                rimRsDetectionReportItem.symbolIndex = l2l1_getU8( off2 + 14 );
                            }
                            break;
                        }
                        off2 += element_size2;
                        rimRsDetectionReport.push( rimRsDetectionReportItem );
                    }
                    l2l1.rimRssi = l2l1_getF32Array( off1 + 24 + l2l1_getU32( off1 + 24 ), l2l1_getU32( off1 + 28 ) );
                }
                break;
            }
        }
        break;
        case 0xE270: { // UlCell::ParameterReconfigurationReq
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.rxScalingFactor = l2l1_getI16( 2 );
        }
        break;
        case 0xE271: { // UlCell::ParameterReconfigurationResp
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.cause = l2l1_getU32( 4 );
            l2l1.diagnosticInformation = l2l1_getU32Array( 8 + l2l1_getU32( 8 ), l2l1_getU32( 12 ) );
        }
        break;
        case 0xE301: { // L1Cpri::CpriConfigureAxCInfoReq
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let axcContainers = l2l1.axcContainers = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let axcContainersItem = {};
                axcContainersItem.axcPosition = l2l1_getU32( off1 );
                axcContainersItem.cpriLinkId = l2l1_getU8( off1 + 4 );
                axcContainersItem.iqSampleFormat = l2l1_getU8( off1 + 5 );
                axcContainersItem.iqSampleCount = l2l1_getU16( off1 + 6 );
                axcContainersItem.wCoordinate = l2l1_getU32( off1 + 8 );
                axcContainersItem.bCoordinate = l2l1_getU32( off1 + 12 );
                axcContainersItem.direction = l2l1_getU8( off1 + 16 );
                off1 += 20;
                axcContainers.push( axcContainersItem );
            }
            l2l1.scs = l2l1_getU8( 8 );
        }
        break;
        case 0xE305: { // L1ECpri::API2ConfigureTransportReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.direction = l2l1_getU8( 4 );
            l2l1.eCpriLink = l2l1_getU8( 5 );
            off1 = 12;
            len1 = l2l1_getU32( 8 );
            let ceAxCinfo = l2l1.ceAxCinfo = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let ceAxCinfoItem = {};
                ceAxCinfoItem.ceAxCId = l2l1_getU16( off1 );
                ceAxCinfoItem.ruMacAddress = l2l1_getU8Array( off1 + 8, l2l1_getU32( off1 + 4 ) );
                ceAxCinfoItem.vlanId = l2l1_getU16( off1 + 16 );
                off1 += 20;
                ceAxCinfo.push( ceAxCinfoItem );
            }
        }
        break;
        case 0xE306: { // L1ECpri::API2ConfigureTransportResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.eCpriLink = l2l1_getU8( 4 );
            l2l1.direction = l2l1_getU8( 5 );
            l2l1.state = l2l1_getU8( 6 );
        }
        break;
        case 0xE307: { // L1ECpri::DeleteTransportReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.direction = l2l1_getU8( 4 );
            l2l1.eCpriLink = l2l1_getU8( 5 );
            l2l1.ceAxCId = l2l1_getU16Array( 8 + l2l1_getU32( 8 ), l2l1_getU32( 12 ) );
        }
        break;
        case 0xE308: { // L1ECpri::DeleteTransportResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.eCpriLink = l2l1_getU8( 4 );
            l2l1.direction = l2l1_getU8( 5 );
            l2l1.state = l2l1_getU8( 6 );
        }
        break;
        case 0xE309: { // L1ECpri::DelayConfigReq
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.tDlAdvanceUp = l2l1_getU32( 4 );
            l2l1.tDlAdvanceCp = l2l1_getU32( 8 );
            l2l1.tUlAdvanceCp = l2l1_getU32( 12 );
            l2l1.receiveWindowOpen = l2l1_getU32( 16 );
            l2l1.receiveWindowClose = l2l1_getU32( 20 );
            l2l1.nTaOffset = l2l1_getU16( 24 );
            l2l1.receiveWindowOpen_prach = l2l1_getU32( 28 );
            l2l1.receiveWindowClose_prach = l2l1_getU32( 32 );
            l2l1.frameStartSub10ms = l2l1_getU32( 36 );
            l2l1.frameStartSFN = l2l1_getI32( 40 );
        }
        break;
        case 0xE30A: { // L1ECpri::ConfigureLinksReq
            l2l1.numOfItems = l2l1_getU32( 0 );
            off1 = 8;
            len1 = l2l1_getU32( 4 );
            let eCpriLink = l2l1.eCpriLink = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let eCpriLinkItem = {};
                eCpriLinkItem.eCpriLink = l2l1_getU8( off1 );
                off1 += 4;
                eCpriLink.push( eCpriLinkItem );
            }
            l2l1.scs = l2l1_getU8( 72 );
        }
        break;
        case 0xE30B: { // L1ECpri::ConfigureLinksResp
            l2l1.state = l2l1_getU8( 0 );
        }
        break;
        case 0xE30C: { // L1ECpri::SubscribeReq
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.sicad = l2l1_getU32( 4 );
        }
        break;
        case 0xE30D: { // L1ECpri::SubscribeResp
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
            l2l1.sicad = l2l1_getU32( 4 );
        }
        break;
        case 0xE30E: { // L1ECpri::SetOutputReq
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.outputState = l2l1_getU8( 1 );
        }
        break;
        case 0xE30F: { // L1ECpri::SetOutputResp
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
            l2l1.outputState = l2l1_getU8( 2 );
        }
        break;
        case 0xE311: { // L1Cpri::CpriDelayConfigReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.dlFiberLengthCompensationOffset = l2l1_getU32( 4 );
            l2l1.ulFiberLengthCompensationOffset = l2l1_getU32( 8 );
            l2l1.Nul = l2l1_getU16( 12 );
            l2l1.Ndl = l2l1_getU16( 14 );
            l2l1.ParameterMask = l2l1_getU16( 16 );
            l2l1.nTaOffset = l2l1_getU16( 18 );
            l2l1.frameStart = l2l1_getI32( 20 );
            l2l1.frameStartSub10ms = l2l1_getU32( 24 );
            l2l1.frameStartSFN = l2l1_getI32( 28 );
        }
        break;
        case 0xE312: { // L1Cpri::CpriGetLinkParamResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
            l2l1.cpriLoopbackDelay = l2l1_getU32( 4 );
            l2l1.parameterMask = l2l1_getU16( 8 );
            l2l1.LCVErrInWindow = l2l1_getU32( 12 );
            l2l1.LCVErrAccumulated = l2l1_getU32( 16 );
            l2l1.BERInWindow = l2l1_getF32( 20 );
            l2l1.BERAccumulated = l2l1_getF32( 24 );
        }
        break;
        case 0xE313: { // L1Cpri::CpriFrameSyncInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.frameSyncState = l2l1_getU8( 1 );
        }
        break;
        case 0xE314: { // L1Cpri::CpriT14Ind
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.t14 = l2l1_getU32( 4 );
        }
        break;
        case 0xE315: { // L1ECpri::StateInd
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.eCpriState = l2l1_getU8( 1 );
        }
        break;
        case 0xE316: { // L1ECpri::DelayConfigResp
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
        }
        break;
        case 0xE317: { // L1ECpri::ConfigureTransportReq
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.ruMacAddress = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            l2l1.vlanId = l2l1_getU16( 16 );
        }
        break;
        case 0xE318: { // L1ECpri::ConfigureTransportResp
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
        }
        break;
        case 0xE319: { // L1ECpri::InitialDelayMeasReq
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.samplesPerMeas = l2l1_getU16( 2 );
            l2l1.sampleInterval = l2l1_getU32( 4 );
            l2l1.measInterval = l2l1_getU32( 8 );
            l2l1.changeThreshold = l2l1_getU32( 12 );
        }
        break;
        case 0xE31A: { // L1ECpri::InitialDelayMeasResp
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
            l2l1.tdOneWayMin = l2l1_getU32( 4 );
            l2l1.tdOneWayMax = l2l1_getU32( 8 );
        }
        break;
        case 0xE31B: { // L1ECpri::DelayMeasInd
            l2l1.eCpriLink = l2l1_getU8( 0 );
            l2l1.tdOneWayMin = l2l1_getU32( 4 );
            l2l1.tdOneWayMax = l2l1_getU32( 8 );
        }
        break;
        case 0xE31C: { // L1ECpri::ConfigureMeasurementsReq
            l2l1.sicad = l2l1_getU32( 0 );
            l2l1.measIntervalMsgRcv = l2l1_getU8( 4 );
        }
        break;
        case 0xE31D: { // L1ECpri::ConfigureMeasurementsResp
            l2l1.state = l2l1_getU8( 0 );
        }
        break;
        case 0xE31E: { // L1ECpri::MsgRcvCountersInd
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
                off1 += 56;
                MsgRcvCounters.push( MsgRcvCountersItem );
            }
        }
        break;
        case 0xE31F: { // L1Cpri::CpriAlarmInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.l1AlarmStates = l2l1_getU32( 4 );
        }
        break;
        case 0xE320: { // L1Cpri::CpriConfigureLinksReq
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
                cpriLinkItem.cpriProtocolVersion = l2l1_getU8( off1 + 16 );
                off1 += 20;
                cpriLink.push( cpriLinkItem );
            }
            l2l1.dlCpriLinkMapConfig = l2l1_getU8( 332 );
            l2l1.ulCpriLinkMapConfig = l2l1_getU8( 333 );
            l2l1.txCorrection = l2l1_getI32( 336 );
            l2l1.rxCorrection = l2l1_getI32( 340 );
        }
        break;
        case 0xE321: { // L1Cpri::CpriConfigureLinksResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE322: { // L1Cpri::CpriSetOutputReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.outputState = l2l1_getU8( 1 );
        }
        break;
        case 0xE323: { // L1Cpri::CpriSetOutputResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.outputState = l2l1_getU8( 2 );
        }
        break;
        case 0xE324: { // L1Cpri::CpriStateInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.cpriState = l2l1_getU8( 1 );
        }
        break;
        case 0xE325: { // L1Cpri::CpriSubscribeReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.cpriLinkState = l2l1_getU8( 1 );
            l2l1.hfnSync = l2l1_getU8( 2 );
            l2l1.t14Ind = l2l1_getU8( 3 );
            l2l1.ethernetPointer = l2l1_getU8( 4 );
            l2l1.cpriOffsetInd = l2l1_getU8( 5 );
            l2l1.sicad = l2l1_getU32( 8 );
        }
        break;
        case 0xE326: { // L1Cpri::CpriSubscribeResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
            l2l1.sicad = l2l1_getU32( 4 );
        }
        break;
        case 0xE327: { // L1Cpri::CpriDiscoveryInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.discoveryMessage = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
        }
        break;
        case 0xE328: { // L1Cpri::CpriDelayConfigResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
        }
        break;
        case 0xE329: { // L1Cpri::CpriGetLinkParamReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.parameterMask = l2l1_getU16( 2 );
        }
        break;
        case 0xE32A: { // L1Cpri::CpriSetDiscoveryReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.bufferLen = l2l1_getU8( 1 );
            l2l1.discoveryMessage = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
        }
        break;
        case 0xE32B: { // L1Cpri::CpriSetDiscoveryResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.status = l2l1_getU8( 1 );
        }
        break;
        case 0xE32C: { // L1Cpri::SetLinkPropertiesResp
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.state = l2l1_getU8( 1 );
        }
        break;
        case 0xE32D: { // L1Cpri::CpriConfigureAxCInfoResp
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let axcContainers = l2l1.axcContainers = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let axcContainersItem = {};
                axcContainersItem.axcPosition = l2l1_getU32( off1 );
                axcContainersItem.direction = l2l1_getU8( off1 + 4 );
                axcContainersItem.status = l2l1_getU8( off1 + 5 );
                off1 += 8;
                axcContainers.push( axcContainersItem );
            }
        }
        break;
        case 0xE32E: { // L1Cpri::CpriDeleteAxCInfoReq
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let axcContainers = l2l1.axcContainers = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let axcContainersItem = {};
                axcContainersItem.direction = l2l1_getU8( off1 );
                axcContainersItem.axcPosition = l2l1_getU32( off1 + 4 );
                off1 += 8;
                axcContainers.push( axcContainersItem );
            }
        }
        break;
        case 0xE32F: { // L1Cpri::CpriDeleteAxCInfoResp
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let axcContainers = l2l1.axcContainers = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let axcContainersItem = {};
                axcContainersItem.direction = l2l1_getU8( off1 );
                axcContainersItem.axcPosition = l2l1_getU32( off1 + 4 );
                axcContainersItem.status = l2l1_getU8( off1 + 8 );
                off1 += 12;
                axcContainers.push( axcContainersItem );
            }
        }
        break;
        case 0xE330: { // L1Cpri::CpriConfigureVsbReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.refNo = l2l1_getU32( 4 );
            l2l1.xs0 = l2l1_getU8( 8 );
            l2l1.ns0 = l2l1_getU8( 9 );
            l2l1.xs1 = l2l1_getU8( 10 );
            l2l1.ns1 = l2l1_getU8( 11 );
            l2l1.index = l2l1_getU8( 12 );
            l2l1.modulo = l2l1_getU8( 13 );
            l2l1.activeBytes = l2l1_getU8( 14 );
            l2l1.bufferLen = l2l1_getU8( 15 );
        }
        break;
        case 0xE331: { // L1Cpri::CpriConfigureVsbResp
            l2l1.refNo = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE332: { // L1Cpri::CpriSubscribeVsbChangesReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.refNo = l2l1_getU32( 4 );
            l2l1.sicad = l2l1_getU32( 8 );
            l2l1.regState = l2l1_getU8( 12 );
        }
        break;
        case 0xE333: { // L1Cpri::CpriSubscribeVsbChangesResp
            l2l1.refNo = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE334: { // L1Cpri::CpriVsbDataInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.refNo = l2l1_getU32( 4 );
            l2l1.bufferLen = l2l1_getU32( 8 );
            l2l1.data = l2l1_getU8Array( 12, 256 );
        }
        break;
        case 0xE335: { // L1Cpri::CpriSendVsbDataReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.refNo = l2l1_getU32( 4 );
            l2l1.repeatOn = l2l1_getU8( 8 );
            l2l1.bufferLen = l2l1_getU32( 12 );
            l2l1.data = l2l1_getU8Array( 16, 256 );
        }
        break;
        case 0xE336: { // L1Cpri::CpriSendVsbDataResp
            l2l1.refNo = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE337: { // L1Cpri::SetLinkPropertiesReq
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.parameterMask = l2l1_getU16( 2 );
            l2l1.LCVWindow = l2l1_getU32( 4 );
            l2l1.scramblingSeed = l2l1_getU32( 8 );
            l2l1.cpriProtocolVersion = l2l1_getU8( 12 );
        }
        break;
        case 0xE338: { // L1Cpri::CpriPortEthernetPointerInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.ethernetPointer = l2l1_getU32( 4 );
        }
        break;
        case 0xE339: { // L1Cpri::CpriFrameOffsetInd
            l2l1.cpriLink = l2l1_getU8( 0 );
            l2l1.cpriOffset = l2l1_getU32( 4 );
        }
        break;
        case 0xE387: { // L1Fcp::DlUlChannelsReq
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.eNbId = l2l1_getU32( 4 );
            l2l1.eAxcId = l2l1_getU16( 8 );
            let commonHeader = l2l1.commonHeader = {};
            commonHeader.dataDirection = l2l1_getU8( 12 );
            commonHeader.filterIndex = l2l1_getU8( 13 );
            commonHeader.frameId = l2l1_getU8( 14 );
            commonHeader.subFrameId = l2l1_getU8( 15 );
            commonHeader.slotId = l2l1_getU8( 16 );
            commonHeader.startSymbolId = l2l1_getU8( 17 );
            commonHeader.numberOfSections = l2l1_getU8( 18 );
            off1 = 20 + l2l1_getU32( 20 );
            len1 = l2l1_getU32( 24 );
            let sections = l2l1.sections = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let sectionsItem = {};
                sectionsItem.sectionId = l2l1_getU16( off1 );
                sectionsItem.rb = l2l1_getU8( off1 + 2 );
                sectionsItem.symInc = l2l1_getU8( off1 + 3 );
                sectionsItem.startPrbc = l2l1_getU16( off1 + 4 );
                sectionsItem.numPrbc = l2l1_getU8( off1 + 6 );
                sectionsItem.numSymbol = l2l1_getU16( off1 + 8 );
                sectionsItem.reMask = l2l1_getU16( off1 + 10 );
                sectionsItem.beamId = l2l1_getU16( off1 + 12 );
                off2 = off1 + 16 + l2l1_getU32( off1 + 16 );
                len2 = l2l1_getU32( off1 + 20 );
                let bfwSectionExtensions = sectionsItem.bfwSectionExtensions = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let bfwSectionExtensionsItem = {};
                    bfwSectionExtensionsItem.bfwCompHdr = l2l1_getU8( off2 );
                    bfwSectionExtensionsItem.bfwCompParam = l2l1_getU8( off2 + 1 );
                    off3 = off2 + 4 + l2l1_getU32( off2 + 4 );
                    len3 = l2l1_getU32( off2 + 8 );
                    let bfwWeights = bfwSectionExtensionsItem.bfwWeights = [];
                    for( let i3 = 0; i3 < len3; ++i3 ) {
                        let bfwWeightsItem = {};
                        bfwWeightsItem.bfwI = l2l1_getU16( off3 );
                        bfwWeightsItem.bfwQ = l2l1_getU16( off3 + 2 );
                        off3 += 4;
                        bfwWeights.push( bfwWeightsItem );
                    }
                    off2 += 12;
                    bfwSectionExtensions.push( bfwSectionExtensionsItem );
                }
                off2 = off1 + 24 + l2l1_getU32( off1 + 24 );
                len2 = l2l1_getU32( off1 + 28 );
                let nonContPrbAllocSectionExtensions = sectionsItem.nonContPrbAllocSectionExtensions = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let nonContPrbAllocSectionExtensionsItem = {};
                    nonContPrbAllocSectionExtensionsItem.rbgMask = l2l1_getU32( off2 );
                    nonContPrbAllocSectionExtensionsItem.rbgSize = l2l1_getU16( off2 + 4 );
                    nonContPrbAllocSectionExtensionsItem.symbolMask = l2l1_getU16( off2 + 6 );
                    nonContPrbAllocSectionExtensionsItem.priority = l2l1_getI8( off2 + 8 );
                    off2 += 12;
                    nonContPrbAllocSectionExtensions.push( nonContPrbAllocSectionExtensionsItem );
                }
                off1 += 32;
                sections.push( sectionsItem );
            }
        }
        break;
        case 0xE391: { // L1ChannelStreamer::DeregisterReq
            l2l1.lnCelId = l2l1_getU32( 0 );
        }
        break;
        case 0xE392: { // L1ChannelStreamer::DeregisterResp
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE393: { // L1ChannelStreamer::RegisterReq
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.receiverQueueId = l2l1_getU32( 4 );
        }
        break;
        case 0xE394: { // L1ChannelStreamer::RegisterResp
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.streamerQueueId = l2l1_getU32( 4 );
            l2l1.status = l2l1_getU8( 8 );
        }
        break;
        case 0xE395: { // L1ChannelStreamer::ReceiveInd
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.payload = l2l1_getU8Array( 4, 16 );
        }
        break;
        case 0xE396: { // L1ChannelStreamer::SendReq
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.payload = l2l1_getU8Array( 4, 16 );
        }
        break;
        case 0xE3B0: { // L1Log::TraceReq
            let header = l2l1.header = {};
            header.lnCelId = l2l1_getU32( 0 );
            header.physCellId = l2l1_getU16( 4 );
            header.trswEQID = l2l1_getU32( 8 );
            header.action = l2l1_getU8( 12 );
            header.outputMode = l2l1_getU8( 13 );
            header.trswMacAddr = l2l1_getU64( 16 );
            off1 = 28;
            len1 = l2l1_getU32( 24 );
            let traces = l2l1.traces = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let tracesItem = {};
                tracesItem.subtype = l2l1_getU16( off1 );
                tracesItem.traceId = l2l1_getU16( off1 + 2 );
                tracesItem.nbReports = l2l1_getU16( off1 + 4 );
                off1 += 8;
                traces.push( tracesItem );
            }
        }
        break;
        case 0xE3B1: { // L1Log::ShowTraceListReq
            l2l1.lnCelId = l2l1_getU32( 0 );
            l2l1.physCellId = l2l1_getU16( 4 );
            l2l1.antSnapshotL1EventEnabled = l2l1_getU8( 6 );
        }
        break;
        case 0xE3B3: { // L1Log::AntennaSnapshotInd
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
                off1 += 92;
                fileList.push( fileListItem );
            }
        }
        break;
        case 0xE3B4: { // L1Log::TraceInd
            l2l1.bcn = l2l1_getU64( 0 );
            l2l1.msgSeqNum = l2l1_getU16( 8 );
            l2l1.tracePayload = l2l1_getU8( 10 );
        }
        break;
        case 0xE3B5: { // L1Log::TraceResp
            l2l1.physCellId = l2l1_getU16( 0 );
            l2l1.status = l2l1_getU8( 2 );
        }
        break;
        case 0xE3B6: { // L1Log::SuspiciousEventInd
            l2l1.indType = l2l1_getU8( 0 );
            l2l1.eventType = l2l1_getU8( 1 );
            l2l1.cancelScenario = l2l1_getU8( 2 );
            l2l1.cellId = l2l1_getU32Array( 4 + l2l1_getU32( 4 ), l2l1_getU32( 8 ) );
        }
        break;
        case 0xE3B7: { // L1Log::AntennaSnapshotConfigurationResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE3B8: { // L1Log::AntennaSnapshotConfigurationReq
            l2l1.numDlCellId = l2l1_getU8( 0 );
            l2l1.dlCellId = l2l1_getU32Array( 4, 4 );
            l2l1.numUlCellId = l2l1_getU8( 20 );
            l2l1.ulCellId = l2l1_getU32Array( 24, 4 );
            l2l1.numUlSubCellId = l2l1_getU8( 40 );
            l2l1.ulSubcellId = l2l1_getU8Array( 44, 4 );
            l2l1.ulSubCellCarrierFreq = l2l1_getU64Array( 48, 4 );
            l2l1.numDlSubCellId = l2l1_getU8( 80 );
            l2l1.dlSubcellId = l2l1_getU8Array( 84, 4 );
            l2l1.dlSubCellCarrierFreq = l2l1_getU64Array( 88, 4 );
            l2l1.antSnapshotL1EventEnabled = l2l1_getU8( 120 );
            l2l1.reason = l2l1_getU8( 121 );
            l2l1.captureType = l2l1_getU8( 122 );
            l2l1.bufferCycle = l2l1_getU16( 124 );
            l2l1.captureFrameOffset = l2l1_getU16( 126 );
        }
        break;
        case 0xE3B9: { // L1Status::AutohealingSubscribeReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.address = l2l1_getU32( 4 );
        }
        break;
        case 0xE3BA: { // L1Status::AutohealingSubscribeResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3BB: { // L1Status::AutohealingStatusInd
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
            l2l1.acceleratorType = l2l1_getU8( 5 );
            l2l1.acceleratorId = l2l1_getU8( 6 );
            l2l1.acceleratorGroupType = l2l1_getU8( 7 );
            l2l1.crashType = l2l1_getU8( 8 );
            l2l1.poolId = l2l1_getU32Array( 16, l2l1_getU32( 12 ) );
            l2l1.cause = l2l1_getU8( 32 );
        }
        break;
        case 0xE3BC: { // L1SyncSlave::StartPtpSlaveReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.defaultDsDomainNumber = l2l1_getU8( 4 );
            l2l1.castMode = l2l1_getU8( 5 );
            l2l1.delayReqInterval = l2l1_getU8( 6 );
            l2l1.ptpProfile = l2l1_getU8( 7 );
            l2l1.ptpEthMulticastAddress = l2l1_getU64( 8 );
            l2l1.secondaryBcnOffset = l2l1_getI32( 16 );
            l2l1.clockIdentity = l2l1_getU64( 24 );
            l2l1.transportMode = l2l1_getU8( 32 );
            l2l1.portNumberOffset = l2l1_getU8( 33 );
            l2l1.ptpECpriPort = l2l1_getU8Array( 40, l2l1_getU32( 36 ) );
        }
        break;
        case 0xE3BD: { // L1SyncSlave::StartPtpSlaveResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3BE: { // L1SyncSlave::SyncSlaveStatusInd
            l2l1.status = l2l1_getU8( 0 );
            l2l1.clockClass = l2l1_getU8( 1 );
        }
        break;
        case 0xE3BF: { // L1Log::OverloadStatusInd
            l2l1.nodeId = l2l1_getU16( 0 );
            l2l1.overloadStatus = l2l1_getU8( 2 );
        }
        break;
        case 0xE3C0: { // L1Log::ActTraceOverloadReq
            l2l1.actTraceOvlProt = l2l1_getU8( 0 );
        }
        break;
        case 0xE3C1: { // L1Log::ActTraceOverloadResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE3C2: { // L1Log::AntennaSnapshotStopInd
            l2l1.numDlCellId = l2l1_getU8( 0 );
            l2l1.dlCellId = l2l1_getU32Array( 4, 4 );
            l2l1.numUlCellId = l2l1_getU8( 20 );
            l2l1.ulCellId = l2l1_getU32Array( 24, 4 );
            l2l1.numDlSubCellId = l2l1_getU8( 40 );
            l2l1.dlSubcellId = l2l1_getU8Array( 44, 4 );
            l2l1.numUlSubCellId = l2l1_getU8( 48 );
            l2l1.ulSubcellId = l2l1_getU8Array( 52, 4 );
        }
        break;
        case 0xE3C3: { // L1MacSec::CreateConfigurationProfileReq
            l2l1.transactionId = l2l1_getU32( 0 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let mkaProfile = l2l1.mkaProfile = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let mkaProfileItem = {};
                mkaProfileItem.mkaProfileId = l2l1_getU8( off1 );
                mkaProfileItem.mkaHelloTime = l2l1_getF32( off1 + 4 );
                mkaProfileItem.rootKeyLifeTime = l2l1_getU16( off1 + 8 );
                mkaProfileItem.sakRekeying = l2l1_getU8( off1 + 10 );
                mkaProfileItem.cakRekeyingTime = l2l1_getU16( off1 + 12 );
                off1 += 16;
                mkaProfile.push( mkaProfileItem );
            }
            off1 = 12 + l2l1_getU32( 12 );
            len1 = l2l1_getU32( 16 );
            let macSecProfile = l2l1.macSecProfile = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let macSecProfileItem = {};
                macSecProfileItem.macSecProfileId = l2l1_getU8( off1 );
                macSecProfileItem.macSecCipherSuite = l2l1_getU8( off1 + 1 );
                macSecProfileItem.macSecProtectionMode = l2l1_getU8( off1 + 2 );
                macSecProfileItem.replayProtectionEnabled = l2l1_getU8( off1 + 3 );
                macSecProfileItem.replayProtectionWindowSize = l2l1_getU32( off1 + 4 );
                off1 += 8;
                macSecProfile.push( macSecProfileItem );
            }
        }
        break;
        case 0xE3C4: { // L1MacSec::CreateConfigurationProfileResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3C5: { // L1MacSec::ConnectionSetupReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.trafficProtection = l2l1_getU8( 4 );
            l2l1.duMacAddr = l2l1_getU8Array( 12, l2l1_getU32( 8 ) );
            l2l1.cellSiteSwitchMacAddr = l2l1_getU8Array( 36, l2l1_getU32( 32 ) );
            l2l1.ruMacAddr = l2l1_getU8Array( 60, l2l1_getU32( 56 ) );
            l2l1.ruCapability = l2l1_getU8( 80 );
            l2l1.cak = l2l1_getU8Array( 88, l2l1_getU32( 84 ) );
            l2l1.ckn = l2l1_getU8Array( 124, l2l1_getU32( 120 ) );
            l2l1.macSecProfileId = l2l1_getU8( 156 );
            l2l1.mkaProfileId = l2l1_getU8( 157 );
        }
        break;
        case 0xE3C6: { // L1MacSec::ConnectionSetupResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3C7: { // L1MacSec::ConnectionDeleteReq
            l2l1.transactionId = l2l1_getU32( 0 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let deleteRule = l2l1.deleteRule = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let deleteRuleItem = {};
                deleteRuleItem.duMacAddr = l2l1_getU8Array( off1 + 4, l2l1_getU32( off1 + 0 ) );
                deleteRuleItem.ruMacAddr = l2l1_getU8Array( off1 + 28, l2l1_getU32( off1 + 24 ) );
                deleteRuleItem.ruCapability = l2l1_getU8( off1 + 48 );
                off1 += 52;
                deleteRule.push( deleteRuleItem );
            }
        }
        break;
        case 0xE3C8: { // L1MacSec::ConnectionDeleteResp
            l2l1.transactionId = l2l1_getU32( 0 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let deleteRule = l2l1.deleteRule = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let deleteRuleItem = {};
                deleteRuleItem.duMacAddr = l2l1_getU8Array( off1 + 4, l2l1_getU32( off1 + 0 ) );
                deleteRuleItem.ruMacAddr = l2l1_getU8Array( off1 + 28, l2l1_getU32( off1 + 24 ) );
                deleteRuleItem.ruCapability = l2l1_getU8( off1 + 48 );
                deleteRuleItem.status = l2l1_getU8( off1 + 49 );
                off1 += 52;
                deleteRule.push( deleteRuleItem );
            }
        }
        break;
        case 0xE3C9: { // L1MacSec::ConnectionStatusInd
            l2l1.trafficModeInfo = l2l1_getU8Array( 4, l2l1_getU32( 0 ) );
            l2l1.duMacAddr = l2l1_getU8Array( 20, l2l1_getU32( 16 ) );
            l2l1.ruMacAddr = l2l1_getU8Array( 44, l2l1_getU32( 40 ) );
            l2l1.cellSiteSwitchMacAddr = l2l1_getU8Array( 68, l2l1_getU32( 64 ) );
            l2l1.status = l2l1_getU8( 88 );
        }
        break;
        case 0xE3CA: { // L1SyncSlave::GetPtpSlaveStatusReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.resetCounters = l2l1_getU8( 4 );
        }
        break;
        case 0xE3CB: { // L1SyncSlave::GetPtpSlaveStatusResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
            off1 = 16;
            len1 = l2l1_getU32( 8 );
            let ptpSlaveStatus = l2l1.ptpSlaveStatus = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let ptpSlaveStatusItem = {};
                ptpSlaveStatusItem.offsetFromMaster = l2l1_getI64( off1 );
                off1 += 8;
                ptpSlaveStatus.push( ptpSlaveStatusItem );
            }
        }
        break;
        case 0xE3CC: { // L1MacSec::CounterSubscribeReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.intervalInMin = l2l1_getU8( 4 );
            l2l1.portItems = l2l1_getU8Array( 12, l2l1_getU32( 8 ) );
        }
        break;
        case 0xE3CD: { // L1MacSec::CounterSubscribeResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3CE: { // L1MacSec::CounterInd
            off1 = l2l1_getU32( 0 );
            len1 = l2l1_getU32( 4 );
            let portCounterItems = l2l1.portCounterItems = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let portCounterItemsItem = {};
                portCounterItemsItem.duPortId = l2l1_getU32( off1 );
                portCounterItemsItem.inPktsUntagged = l2l1_getU64( off1 + 8 );
                portCounterItemsItem.inPktsNoTag = l2l1_getU64( off1 + 16 );
                portCounterItemsItem.inPktsBadTag = l2l1_getU64( off1 + 24 );
                portCounterItemsItem.inPktsNoSA = l2l1_getU64( off1 + 32 );
                portCounterItemsItem.inPktsNoSAError = l2l1_getU64( off1 + 40 );
                portCounterItemsItem.inPktsOverrun = l2l1_getU64( off1 + 48 );
                portCounterItemsItem.inPktsOK = l2l1_getU64( off1 + 56 );
                portCounterItemsItem.inPktsUnchecked = l2l1_getU64( off1 + 64 );
                portCounterItemsItem.inPktsInvalid = l2l1_getU64( off1 + 72 );
                portCounterItemsItem.inPktsNotValid = l2l1_getU64( off1 + 80 );
                portCounterItemsItem.inPktsDelayed = l2l1_getU64( off1 + 88 );
                portCounterItemsItem.inPktsLate = l2l1_getU64( off1 + 96 );
                portCounterItemsItem.inOctetsValidated = l2l1_getU64( off1 + 104 );
                portCounterItemsItem.inOctetsDecrypted = l2l1_getU64( off1 + 112 );
                portCounterItemsItem.outPktsUntagged = l2l1_getU64( off1 + 120 );
                portCounterItemsItem.outPktsTooLong = l2l1_getU64( off1 + 128 );
                portCounterItemsItem.outPktsProtected = l2l1_getU64( off1 + 136 );
                portCounterItemsItem.outPktsEncrypted = l2l1_getU64( off1 + 144 );
                portCounterItemsItem.outOctetsProtected = l2l1_getU64( off1 + 152 );
                portCounterItemsItem.outOctetsEncrypted = l2l1_getU64( off1 + 160 );
                portCounterItemsItem.eapolMKnoCKN = l2l1_getU64( off1 + 168 );
                portCounterItemsItem.eapolMKinvalidRx = l2l1_getU64( off1 + 176 );
                portCounterItemsItem.eapolMKAFramesTx = l2l1_getU64( off1 + 184 );
                portCounterItemsItem.eapolMKAFramesDropRx = l2l1_getU64( off1 + 192 );
                off1 += 200;
                portCounterItems.push( portCounterItemsItem );
            }
        }
        break;
        case 0xE3CF: { // L1MacSec::CakRekeyInd
            l2l1.duMacAddr = l2l1_getU8Array( 4, l2l1_getU32( 0 ) );
            l2l1.ruMacAddr = l2l1_getU8Array( 28, l2l1_getU32( 24 ) );
        }
        break;
        case 0xE3D0: { // L1MacSec::CakGenerationReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.duMacAddr = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            l2l1.ruMacAddr = l2l1_getU8Array( 32, l2l1_getU32( 28 ) );
            l2l1.macSecProfileId = l2l1_getU8( 52 );
        }
        break;
        case 0xE3D1: { // L1MacSec::CakGenerationResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.cak = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
            l2l1.ckn = l2l1_getU8Array( 44, l2l1_getU32( 40 ) );
            l2l1.status = l2l1_getU8( 76 );
        }
        break;
        case 0xE3D2: { // L1PoolMgmt::L1PoolCleanupReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.poolIds = l2l1_getU32Array( 4 + l2l1_getU32( 4 ), l2l1_getU32( 8 ) );
        }
        break;
        case 0xE3D3: { // L1PoolMgmt::L1PoolCleanupResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
        case 0xE3D4: { // L1Log::AntennaSnapshotReq
            l2l1.sfn = l2l1_getU16( 0 );
            l2l1.slot = l2l1_getU8( 2 );
            l2l1.requestType = l2l1_getU8( 3 );
            l2l1.captureMode = l2l1_getU8( 4 );
            l2l1.oneFilePerPath = l2l1_getU8( 5 );
            l2l1.responseAck = l2l1_getU8( 6 );
        }
        break;
        case 0xE3D5: { // L1Log::AntennaSnapshotResp
            l2l1.status = l2l1_getU8( 0 );
        }
        break;
        case 0xE3D6: { // L1Log::ShowTraceListResp
            l2l1.status = l2l1_getU8( 0 );
            l2l1.traceList = l2l1_getU8Array( 8, l2l1_getU32( 4 ) );
        }
        break;
        case 0xE3D7: { // L1Log::SuspiciousEventSicadReq
            l2l1.serverSicad = l2l1_getU32( 0 );
        }
        break;
        case 0xE3E4: { // L1Call::NrUlTestReportInd
            l2l1.subcellId = l2l1_getU8( 0 );
            l2l1.rssi = l2l1_getF32( 4 );
            l2l1.sinr = l2l1_getF32Array( 8, 2 );
            l2l1.timeOffset = l2l1_getI32( 16 );
            l2l1.puschReceivedTbs = l2l1_getU64( 24 );
            l2l1.puschUnreceivedTbs = l2l1_getU64( 32 );
            l2l1.puschDefectiveTbs = l2l1_getU64( 40 );
            l2l1.pucchReceivedTbs = l2l1_getU64( 48 );
            l2l1.pucchUnreceivedTbs = l2l1_getU64( 56 );
            l2l1.pucchDefectiveTbs = l2l1_getU64( 64 );
            l2l1.detectedPa = l2l1_getU64( 72 );
        }
        break;
        case 0xE3E5: { // L1Call::LTEUlTestReportInd
            l2l1.lnCelId = l2l1_getU32( 0 );
            let tputResult = l2l1.tputResult = {};
            tputResult.tput = l2l1_getI32( 4 );
            tputResult.rssi = l2l1_getI32( 8 );
            tputResult.sinr = l2l1_getI32( 12 );
            tputResult.timeOffset = l2l1_getI32( 16 );
            tputResult.receivedTbs = l2l1_getU32( 20 );
            tputResult.failedTbs = l2l1_getU32( 24 );
            let prachResult = l2l1.prachResult = {};
            prachResult.detectedPa = l2l1_getU32( 28 );
        }
        break;
        case 0xE3F0: { // L1Config::SwConfigurationReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.isEcpriIqForwardingEnabled = l2l1_getU8( 4 );
            l2l1.isCpriIqForwardingEnabled = l2l1_getU8( 5 );
            off1 = 8 + l2l1_getU32( 8 );
            len1 = l2l1_getU32( 12 );
            let l1PoolConfiguration = l2l1.l1PoolConfiguration = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let l1PoolConfigurationItem = {};
                l1PoolConfigurationItem.poolId = l2l1_getU32( off1 );
                l1PoolConfigurationItem.isPrbPoolingEnabled = l2l1_getU8( off1 + 4 );
                off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                len2 = l2l1_getU32( off1 + 12 );
                let l1SubPoolConfiguration = l1PoolConfigurationItem.l1SubPoolConfiguration = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let l1SubPoolConfigurationItem = {};
                    l1SubPoolConfigurationItem.subpoolId = l2l1_getU32( off2 );
                    l1SubPoolConfigurationItem.subpoolType = l2l1_getU8( off2 + 4 );
                    l1SubPoolConfigurationItem.ratMode = l2l1_getU8( off2 + 5 );
                    l1SubPoolConfigurationItem.fronthaulMode = l2l1_getU8( off2 + 6 );
                    l1SubPoolConfigurationItem.domain = l2l1_getU8( off2 + 7 );
                    l1SubPoolConfigurationItem.duplexMode = l2l1_getU8( off2 + 8 );
                    l1SubPoolConfigurationItem.frequencyRange = l2l1_getU8( off2 + 9 );
                    l1SubPoolConfigurationItem.maxNumOfDataStreamsPerCell = l2l1_getU32( off2 + 12 );
                    l1SubPoolConfigurationItem.maxNumOfDataLayersPerCell = l2l1_getU32( off2 + 16 );
                    let cellSlotConfiguration = l1SubPoolConfigurationItem.cellSlotConfiguration = {};
                    cellSlotConfiguration.lowestSlotId = l2l1_getU32( off2 + 20 );
                    cellSlotConfiguration.cellSlotsAmount = l2l1_getU32( off2 + 24 );
                    cellSlotConfiguration.unusedSlotsAmount = l2l1_getU32( off2 + 28 );
                    off2 += 32;
                    l1SubPoolConfiguration.push( l1SubPoolConfigurationItem );
                }
                off1 += 16;
                l1PoolConfiguration.push( l1PoolConfigurationItem );
            }
        }
        break;
        case 0xE3F1: { // L1Config::SwConfigurationResp
            l2l1.transactionId = l2l1_getU32( 0 );
            off1 = 4 + l2l1_getU32( 4 );
            len1 = l2l1_getU32( 8 );
            let l1PoolStatus = l2l1.l1PoolStatus = [];
            for( let i1 = 0; i1 < len1; ++i1 ) {
                let l1PoolStatusItem = {};
                l1PoolStatusItem.poolId = l2l1_getU32( off1 );
                l1PoolStatusItem.status = l2l1_getU8( off1 + 4 );
                off2 = off1 + 8 + l2l1_getU32( off1 + 8 );
                len2 = l2l1_getU32( off1 + 12 );
                let l1SubPoolStatus = l1PoolStatusItem.l1SubPoolStatus = [];
                for( let i2 = 0; i2 < len2; ++i2 ) {
                    let l1SubPoolStatusItem = {};
                    l1SubPoolStatusItem.subPoolId = l2l1_getU32( off2 );
                    l1SubPoolStatusItem.status = l2l1_getU8( off2 + 4 );
                    off2 += 8;
                    l1SubPoolStatus.push( l1SubPoolStatusItem );
                }
                off1 += 16;
                l1PoolStatus.push( l1PoolStatusItem );
            }
        }
        break;
        case 0xE3F2: { // L1Config::AutohealingActivationReq
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.isAutohealingEnabled = l2l1_getU8( 4 );
        }
        break;
        case 0xE3F3: { // L1Config::AutohealingActivationResp
            l2l1.transactionId = l2l1_getU32( 0 );
            l2l1.status = l2l1_getU8( 4 );
        }
        break;
    }
}
