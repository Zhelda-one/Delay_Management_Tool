const configDefault = {
    'configVersion': '1.2',
    'fileAutoload_enabled': false,
    'fileAutoload_filePath': '',
    'configDialog_moreChannels': false,
    'load': {
        'littleEndian': false,
        'fileType': 'pcap',
        'aggregateMode': false,
        'skipIqDecoding': false,
        'skipTimingGeneration' : false,
        'pcapFilter': '',
        'loadLimitFrom': 0,
        'loadLimit': 0,
        'shift_symbols': 0,
        'shift_samples': 0,
        'shift_fraction': 0,
        'iqScalingMode': 1, // 1 - 2
        'dynamicIqComp': false,
        'iqBitWidth': 9, // 1 - 16
        'iqCompMethod': 1,
        'swapIq': false,
        'timeDomain': false,
        'numerologyAutodetection': true,
        'defaultU': 0,
        'maxU': -1,
        'sampling': 30.72,
        'nprb': 273,
        'numAnt' : 1,
        'dir': 'DL',    // [ 'DL', 'UL' ]
        'sync': 'auto',
        'ignoreFrameId': true,
        'timeShift_us': 0,
        'timeShift_alfa': 0,
        'timeShift_beta': 0,
        'ntaOffset_utu': 0,
        'ntaOffset_tc': 0,
        'prachConfigurationIndex': 0,
        'prachStartPrb': 0,
        'prachTD': false,
        'l2l1_versionAutodetect': true,
        'l2l1_detailedAutodetect': false,
        'l2l1_version': 'autodetect',
        // 'l2l1_DCI_payload_decoding': false,
        'advanced': {
            'ext11bundleWeights': 32
        },
        'loki':{
            'type': 'IQ',           // [ 'FCP', 'IQ' ]
            'dir': 'Mix',           // [ 'Mix', 'UL', 'DL' ]
            'platform' : 'loki',    // [ 'loki', 'thor' ]
        },
        'lonerType' : 0,
        'lonerAlignToFrame' : true,
        'DU_Port_ID': 2,
        'BandSector_ID': 3,
        'CC_ID': 3,
        'RU_Port_ID': 8,
        'Pol_ID': 1,
        'PRACH': 1,
        'AxC': 4,
        'BWP': 2
    },
    'save': {
        'filename': 'ecpri',
        'packetsFileType': 'pcap', // [ pcap, pcapng, csv ]
        'packetsRange': 'all', // [ all, filtered, filtered_sorted ]
        'pcapEndian': 'little', // [ little, big ]
        'pcapTsPrecision': 'ns', // [ ms, ns ]
        'timestampColumn': 'time', // [time, PtpTime]
        'iqFileType': '',
        'csvAddExcelSeparator': true
    },
    'cell': {
        'appliedArfcn' : 0,
        'frequencyRange': 'FR1', // [ FR1, FR2 ]
        'u': 0,
        'carrierFrequency': '<3', // [ <3, 3_6, 6< ]
        'pci': 0, // 0 - 1007
        'cyclicPrefix': 'normal', // [ normal, extended ]
        'pbch_case': 'A', // [ A, B, C, D, E, F ]
        'pbch_periodicity': 10, // [ 5, 10, 20, 40, 80, 160 ]
        'pbch_numOfBlocks': 64,
        'pbch_halfFrameOffset' : 0, //0 - inf
        'pbch_prbOffset': 0, // 0 - 253
        'pbch_scOffset': 0, // 0 - 11
        "prachRepetitions" : false,
        "prachAntennaCombining" : false,
        "prachAntennasToCombine" : "",
        'prach_cfgIdx': 0,
        'prach_prbOffset': 0, // 0 - 270
        'prachTable' : "FR1_FDD", //["FR1_FDD","FR1_TDD","FR2"]
        // 'csirs': [{symbols: [6,10], startSlot: 0, slotStep: 10, startPrb: 0, numPrb: 173, reMask: 0xFFF}],
        'zeroCorrelationZoneConfig': 12,
        'SSBdetectType' : "MANUAL", // [MANUAL, AUTO]

        'numOfPdcchSym': 3, // 1 - 3
        'pdcch_dciSize' : 39,
        'pdcch_nRNTI' : 38134,
        'pdcch_nID' : 181,
        // 'dci_rachStatus' : 0,

        "dci_subcell" : 0,
        'dci_RA_RNTIs' : "",
        "dci_TC_RNTIs" : "",

        'dci_1_1_sizeof_FD_ResAssignment' : 11,
        'dci_1_1_sizeof_BWP_Indicator' : 1,
        'dci_1_1_sizeof_DAI' : 2,
        'dci_1_1_sizeof_AntennaPorts' : 4,

        'dci_0_1_sizeof_FD_ResAssignment' : 11,
        'dci_0_1_sizeof_TD_ResAssignment' : 3,
        'dci_0_1_sizeof_BWP_Indicator' : 1,
        'dci_0_1_sizeof_TD_ResAssignment' : 4,
        'dci_0_1_sizeof_AntennaPorts' : 4,
        'dci_0_1_sizeof_PrecodingInfoAndNumOfLayers' : 2,
        'dci_0_1_sizeof_CsiRequest' : 1,
        'dci_0_1_sizeof_PTRS_DMRS_Association' : 2,
        'dci_0_1_sizeof_BetaOffsetIndicator' : 0,
        'dci_0_1_sizeof_DmrsSequenceInit' : 0,
        'dci_0_1_sizeof_UL_SCH_indicator' : 0,
        // 'dci_FieldSizesMode' : "AUTO", //[MANUAL, AUTO]

        'csirs_startPrb' : 0,
        'csirs_numOfPrb' : 0,
        'csirs_frequencyDomainAllocation' : "0001",
        'csirs_startSymbol' : 12,
        'csirs_slotPeriodicity' : 4, //CSI-ResourcePeriodicityAndOffset IE from 38.331
        'csirs_slotOffset' : 0,  //Must be less than csirs_slotPeriodicity
        'csirs_density' : 1, //[0.5,1,3]
        'csirs_densityDot5' : 0, //[0,1] meaning ["even prbs","odd prbs"]
        'csirs_config' : 1, // [1,2,3]
        'csirs_scramblingID' : 41,

    },
    'packetsTab': {
        'sortPacketFilters': true,
        'numOfSavedFilters': 20,
        'packetsFilters': [
            '@ethertype==="eCPRI"',
            '@ethertype==="BIP"',
            '@ecpri.message==="IQ Data"',
            '@ecpri.message==="IQ Data" && @ecpri.dataDir==="DL"',
            '@ecpri.message==="IQ Data" && @ecpri.dataDir==="UL"',
            '@ecpri.message==="Real-time control data"',
            '@ecpri.message==="Real-time control data" && @ecpri.dataDir==="DL"',
            '@ecpri.message==="Real-time control data" && @ecpri.dataDir==="UL"',
            '@ecpri.dataDir==="DL"',
            '@ecpri.dataDir==="UL"'
        ],
        'numOfVisiblePkts': 150,
        'numOfScrolledPkts': 50,
        'hiddenColumnNames': [],
        'namedRows': true,
    },
    'iqTab': {
        'viewportsSplit': 0,
        'singleFilter': false,
        'unitedScaleAndMove': false,
        'hidePacketsWithNoAmplitude': false,
        'constPointSize': 1.0,
        'viewportsModes': ['0_0', '0_1', '0_0', '0_1'],
        'usePacketsFilter' : false,
        'drawFCP': true,
        'guardband_size': 0,
        'fft_size': 0,
        'previous_modes': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    },
    'analyze':{
        'useFilteredPkts': false,
        'timingAnalysis':{
            'noPacketsIgnore': 1000,
        }
    },
    'generatorTab': {
        'filename': 'ecpri',
        'mode': 'generator',
        'timing_mode': 'standard',
        'sort_packets': true,
        'mtu': 1500,
        'output_json': false,
        'output_pcap': true,
        'pcap_big_endian': false,
        'src_mac_addr': '00:00:00:00:00:00',
        'dest_mac_addr': '01:01:01:01:01:01',
        'vlan_enable' : false,
        'vlan_id': 0,
        'min_pkt_len': 60,
        'max_u': 1,
        'dynamic_delay': true,
        'type65_enable': false,
        'xirc_beta_enable': false,
        'type65_delay': 600,
        'xirc_beta_delay': 600,
        'pusch_cell_ps_num': 1,
        'pusch_ue_num': 1,
        'srs_su_mimo_num': 1,
        'srs_bm_num': 1,
        'srs_rt_bf_num': 1,
        'rim_num': 1,
        'cplane_dl_enable': true,
        'cplane_ul_enable': true,
        'cplane_dl_advance': 470,
        'cplane_ul_advance': 336,
        'uplane_dl_enable': true,
        'uplane_ul_enable': true,
        'dynamic_iq_comp': false,
        'iq_scaling_mode': 1,
        'iq_bit_width': 9,
        'iq_comp_method': 1,
        'uplane_dl_advance': 331,
        'uplane_ul_delay': 50,
        'iq_fill_method': 0,
        'modulation_type': 'qpsk',
        'modulation_power': -10.0,
        'gauss_dl_power': -13.8,
        'gauss_dl_power_unit': 'dBFS',
        'gauss_ul_power': -94,
        'gauss_ul_power_unit': 'dBFS',
        'num_of_mtz_sections': 1,

        // 'extType1_enable': 0,
        // 'extType1_bfwIqBitWidth': 16,
        // 'extType1_bfwCompMeth': 0,
        // 'extType1_bfwIqWeights': [-32768, 32767],
        //
        // 'extType6_enable': 0,
        //
        // 'extType9_enable': 0,
        // 'extType9_technology': 1,

        'band': 'FR1',
        'u': 1,
        'num_of_antennas_dl': 1,
        'num_of_antennas_ul': 1,
        'dl_rtc_ids': [0, 8, 1, 9, 2, 10, 3, 11],
        'ul_rtc_ids': [0, 8, 1, 9, 2, 10, 3, 11],
        'start_prb': 0,
        'num_of_prb': 273,

        'pbch_num_of_antennas': 1,
        'pbch_rtc_ids': [0, 8, 1, 9, 2, 10, 3, 11],
        'pbch_case': 'B',
        'pbch_num_of_blocks': 1,
        'pbch_prb_offset': 12,
        'pbch_sc_offset': 0,

        'prach_num_of_antennas': 1,
        'prach_rtc_ids': [7, 15],
        'prach_cfg_idx': 160,
        'prach_prb_offset': 12,

        'type65_rtc_ids': [4],
        'xirc_rtc_ids': [4, 132],
        'beta_rtc_ids': [36, 164],
        'xirc_beta_num_of_prb': 273,
        'beta_remask': default_beta_factor_re_mask,

        'frame_structure': default_frame_structure['FR1']
    },
};

if (globalThis.module) {
    module.exports = {
        config: structuredClone(configDefault),
    }
} else {
    globalThis.config = structuredClone(configDefault);
}
