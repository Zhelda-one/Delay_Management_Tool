const configDialog = /** @type {ConfigDialog} */ getElementById('configDialog');

const configDialog_moreChannels = getElementById("configDialog_moreChannels_cb");
const configDialog_appliedArfcn = getElementById("configureDialog_appliedArfcn");

//PBCH
const configDialog_SSBdetectType = document.getElementsByName('configDialog_SSBdetectType');
const configDialog_antenna = getElementById('configDialog_antenna');
const configDialog_subcellAntTable = getElementById("configDialog_subcellAntTable");
const configDialog_carrierFrequency = document.getElementsByName('configDialog_carrierFrequency');
const configDialog_pci = getElementById('configDialog_pci');

const configDialog_pbchCase = document.getElementsByName('configDialog_pbchCase');
const configDialog_pbchPeriodicity = document.getElementsByName('configDialog_pbchPeriodicity');
const configDialog_pbchNumOfBlocks = getElementById('configDialog_pbchNumOfBlocks');
const configDialog_pbchHalfFrameOffset = getElementById('configDialog_pbchHalfFrameOffset');
const configDialog_pbchPrbOffset = getElementById('configDialog_pbchPrbOffset');
const configDialog_pbchScOffset = getElementById('configDialog_pbchScOffset');
const configDialog_applySSB = getElementById("apply_ssbDetection");

//PRACH
const configDialog_prachCfgIdx = getElementById('configDialog_prachCfgIdx')
const configDialog_prachTable = getElementById("configDialog_prachTable");
const configDialog_prachPrbOffset = getElementById('configDialog_prachPrbOffset');
// const configDialog_csirs = getElementById('configDialog_csirs')
const configDialog_prachRepetitions_cb = getElementById("configDialog_prachRepetitions_cb");
const configDialog_prachAntennaCombining_cb = getElementById("configDialog_prachAntennaCombining_cb");
const configDialog_prachAntennaCombining_input = getElementById("configDialog_prachAntennaCombining_input");
const configDialog_possiblePrachCfgIdx = getElementById("configDialog_possiblePrachCfgIdx");

//PDCCH
const configDialog_numOfPdcchSym = document.getElementsByName('configDialog_numOfPdcchSym');
const configDialog_pdcch_dciSize = document.getElementById('configDialog_pdcch_dciSize');
const configDialog_pdcch_nID = document.getElementById('configDialog_pdcch_nID');
const configDialog_pdcch_nRNTI = document.getElementById('configDialog_pdcch_nRNTI');

//DCI
const configDialog_dci_subcell = getElementById('configDialog_dci_subcell');
const configDialog_dci_RA_RNTIs = getElementById('configDialog_dci_RA_RNTIs');
const configDialog_dci_TC_RNTIs = getElementById('configDialog_dci_TC_RNTIs');
const configDialog_dci_1_1_sizeof_FD_ResAssignment = getElementById('configDialog_dci_1_1_sizeof_FD_ResAssignment');
const configDialog_dci_1_1_sizeof_DAI = getElementById('configDialog_dci_1_1_sizeof_DAI');
const configDialog_dci_1_1_sizeof_AntennaPorts = getElementById('configDialog_dci_1_1_sizeof_AntennaPorts');
const configDialog_dci_1_1_sizeof_BWP_Indicator = getElementById('configDialog_dci_1_1_sizeof_BWP_Indicator');

const configDialog_dci_0_1_sizeof_FD_ResAssignment = getElementById('configDialog_dci_0_1_sizeof_FD_ResAssignment');
const configDialog_dci_0_1_sizeof_TD_ResAssignment = getElementById('configDialog_dci_0_1_sizeof_TD_ResAssignment');
const configDialog_dci_0_1_sizeof_BWP_Indicator = getElementById('configDialog_dci_0_1_sizeof_BWP_Indicator');
const configDialog_dci_0_1_sizeof_AntennaPorts = getElementById('configDialog_dci_0_1_sizeof_AntennaPorts');
const configDialog_dci_0_1_sizeof_PrecodingInfoAndNumOfLayers = getElementById('configDialog_dci_0_1_sizeof_PrecodingInfoAndNumOfLayers');
const configDialog_dci_0_1_sizeof_CsiRequest = getElementById('configDialog_dci_0_1_sizeof_CsiRequest');
const configDialog_dci_0_1_sizeof_PTRS_DMRS_Association = getElementById('configDialog_dci_0_1_sizeof_PTRS_DMRS_Association');
const configDialog_dci_0_1_sizeof_BetaOffsetIndicator = getElementById('configDialog_dci_0_1_sizeof_BetaOffsetIndicator');
const configDialog_dci_0_1_sizeof_DmrsSequenceInit = getElementById('configDialog_dci_0_1_sizeof_DmrsSequenceInit');
const configDialog_dci_0_1_sizeof_UL_SCH_indicator = getElementById('configDialog_dci_0_1_sizeof_UL_SCH_indicator');

// const configDialog_dci_FieldSizesMode = document.getElementsByName('configDialog_dci_FieldSizesMode');
// const configDialog_dci_rachStatus = getElementById("configDialog_dci_rachStatus");

//CSI-RS
const configDialog_csirs_startPrb = getElementById('configDialog_csirsStartPrb');
const configDialog_csirs_numOfPrb = getElementById('configDialog_csirsNumOfPrb');
const configDialog_csirs_frequencyDomainAllocation = getElementById('configDialog_csirsFrequencyDomainAllocation');
const configDialog_csirs_startSymbol = getElementById('configDialog_csirsStartSymbol');
const configDialog_csirs_slotPeriodicity = getElementById('configDialog_csirsSlotPeriodicity');
const configDialog_csirs_slotOffset = getElementById('configDialog_csirsSlotOffset');
const configDialog_csirs_density = document.getElementsByName("configDialog_csirsDensity");
const configDialog_csirs_densityDot5 = document.getElementsByName("configDialog_csirsDensityDot5");
const configDialog_csirs_config = getElementById('configDialog_csirsConfig');
const configDialog_csirs_scramblingID = getElementById('configDialog_csirsScramblingID');

// TODO: resolve configureDialog - configDialog inconsistency
const configureDialog_arfcn_row = getElementById( 'configureDialog_arfcn_row' );
const configureDialog_arfcn = getElementById( 'configureDialog_arfcn' );
const configureDialog_nr_frequency = getElementById( 'configureDialog_nr_frequency' );
const configureDialog_appliedArfcn = getElementById( 'configureDialog_appliedArfcn' );

const configureDialog_u = getElementById("configureDialog_u");
const configureDialog_arfcn_row_button = getElementById("configureDialog_arfcn_row_button");

class ConfigDialog extends Dialog {

    constructor(){
        super("Configuration");

    }

    getFromUI() {
        //SSB/PBCH
        config.cell.SSBdetectType = get_param_radio(configDialog_SSBdetectType)
        config.cell.carrierFrequency = get_param_radio( configDialog_carrierFrequency );
        config.cell.pci = parseInt( configDialog_pci.value );
        config.cell.pbch_case = get_param_radio( configDialog_pbchCase );
        config.cell.pbch_periodicity = get_param_radio_int( configDialog_pbchPeriodicity );
        config.cell.pbch_halfFrameOffset = parseInt( configDialog_pbchHalfFrameOffset.value );
        config.cell.pbch_prbOffset = parseInt( configDialog_pbchPrbOffset.value );
        config.cell.pbch_scOffset = parseInt( configDialog_pbchScOffset.value );

        //PRACH
        config.cell.prach_cfgIdx = parseInt( configDialog_prachCfgIdx.value );
        config.cell.prach_prbOffset = parseInt( configDialog_prachPrbOffset.value );
        config.cell.prachTable = configDialog_prachTable.value;
        config.cell.prachRepetitions = configDialog_prachRepetitions_cb.checked;
        config.cell.prachAntennaCombining = configDialog_prachAntennaCombining_cb.checked;
        config.cell.prachAntennasToCombine = configDialog_prachAntennaCombining_input.value;
        config.cell.u = parseInt(configureDialog_u.value);

        //PDCCH
        config.cell.pbch_numOfBlocks = parseInt( configDialog_pbchNumOfBlocks.value );
        config.cell.numOfPdcchSym = get_param_radio_int( configDialog_numOfPdcchSym );
        config.cell.pdcch_dciSize = parseInt(configDialog_pdcch_dciSize.value);
        config.cell.pdcch_nID = parseInt(configDialog_pdcch_nID.value);
        config.cell.pdcch_nRNTI = parseInt(configDialog_pdcch_nRNTI.value);

        //DCI
        // config.cell.dci_FieldSizesMode = get_param_radio( configDialog_dci_FieldSizesMode );
        // config.cell.dci_rachStatus = parseInt( configDialog_dci_rachStatus.value );
        config.cell.dci_subcell = parseInt( configDialog_dci_subcell.value );
        config.cell.dci_RA_RNTIs = configDialog_dci_RA_RNTIs.value;
        config.cell.dci_TC_RNTIs = configDialog_dci_TC_RNTIs.value;
        config.cell.dci_1_1_sizeof_FD_ResAssignment = parseInt( configDialog_dci_1_1_sizeof_FD_ResAssignment.value);
        config.cell.dci_1_1_sizeof_DAI = parseInt( configDialog_dci_1_1_sizeof_DAI.value );
        config.cell.dci_1_1_sizeof_AntennaPorts = parseInt( configDialog_dci_1_1_sizeof_AntennaPorts.value );
        config.cell.dci_1_1_sizeof_BWP_Indicator = parseInt( configDialog_dci_1_1_sizeof_BWP_Indicator.value );

        config.cell.dci_0_1_sizeof_FD_ResAssignment = parseInt( configDialog_dci_0_1_sizeof_FD_ResAssignment.value);
        config.cell.dci_0_1_sizeof_TD_ResAssignment = parseInt( configDialog_dci_0_1_sizeof_TD_ResAssignment.value );
        config.cell.dci_0_1_sizeof_AntennaPorts = parseInt( configDialog_dci_0_1_sizeof_AntennaPorts.value );
        config.cell.dci_0_1_sizeof_BWP_Indicator = parseInt( configDialog_dci_0_1_sizeof_BWP_Indicator.value );
        config.cell.dci_0_1_sizeof_PrecodingInfoAndNumOfLayers = parseInt( configDialog_dci_0_1_sizeof_PrecodingInfoAndNumOfLayers.value );
        config.cell.dci_0_1_sizeof_CsiRequest = parseInt( configDialog_dci_0_1_sizeof_CsiRequest.value );
        config.cell.dci_0_1_sizeof_PTRS_DMRS_Association = parseInt( configDialog_dci_0_1_sizeof_PTRS_DMRS_Association.value );
        config.cell.dci_0_1_sizeof_BetaOffsetIndicator = parseInt( configDialog_dci_0_1_sizeof_BetaOffsetIndicator.value );
        config.cell.dci_0_1_sizeof_DmrsSequenceInit = parseInt( configDialog_dci_0_1_sizeof_DmrsSequenceInit.value );
        config.cell.dci_0_1_sizeof_UL_SCH_indicator = parseInt( configDialog_dci_0_1_sizeof_UL_SCH_indicator.value );

        //CSI-RS
        config.cell.csirs_startPrb = parseInt( configDialog_csirs_startPrb.value );
        config.cell.csirs_numOfPrb = parseInt( configDialog_csirs_numOfPrb.value );
        config.cell.csirs_frequencyDomainAllocation = configDialog_csirs_frequencyDomainAllocation.value;
        config.cell.csirs_startSymbol = parseInt( configDialog_csirs_startSymbol.value );
        config.cell.csirs_slotPeriodicity = parseInt( configDialog_csirs_slotPeriodicity.value );
        config.cell.csirs_slotOffset = parseInt( configDialog_csirs_slotOffset.value );
        config.cell.csirs_density = get_param_radio_int( configDialog_csirs_density ); //parseInt( configDialog_csirs_density.value );
        config.cell.csirs_densityDot5 = get_param_radio_int(configDialog_csirs_densityDot5 ); //parseInt( configDialog_csirs_densityDot5.value );
        config.cell.csirs_config = parseInt( configDialog_csirs_config.value );
        config.cell.csirs_scramblingID = parseInt( configDialog_csirs_scramblingID.value );

        config.configDialog_moreChannels = configDialog_moreChannels.checked;
        config.cell.appliedArfcn = parseInt( configDialog_appliedArfcn.value );
    }
    setToUI() {
        configDialog_validate();

        //PBCH/SSB
        configureDialog_u.value = config.cell.u.toString();
        configDialog_pbchNumOfBlocks.value = config.cell.pbch_numOfBlocks;
        configDialog_pci.value = config.cell.pci;
        set_param_radio( configDialog_pbchCase, config.cell.pbch_case );
        set_param_radio_int( configDialog_pbchPeriodicity, config.cell.pbch_periodicity );
        configDialog_pbchHalfFrameOffset.value = config.cell.pbch_halfFrameOffset;
        configDialog_pbchPrbOffset.value = config.cell.pbch_prbOffset;
        configDialog_pbchScOffset.value = config.cell.pbch_scOffset;
        set_param_radio( configDialog_SSBdetectType, config.cell.SSBdetectType );
        set_param_radio( configDialog_carrierFrequency, config.cell.carrierFrequency );

        //PRACH
        configDialog_prachTable.value = config.cell.prachTable;
        configDialog_prachCfgIdx.value = config.cell.prach_cfgIdx;
        configDialog_prachPrbOffset.value = config.cell.prach_prbOffset;
        configDialog_prachAntennaCombining_cb.checked = config.cell.prachAntennaCombining;
        configDialog_prachAntennaCombining_input.value = config.cell.prachAntennasToCombine;
        configDialog_prachRepetitions_cb.checked = config.cell.prachRepetitions;

        //PDCCH
        set_param_radio_int( configDialog_numOfPdcchSym , config.cell.numOfPdcchSym);
        configDialog_pdcch_dciSize.value = config.cell.pdcch_dciSize;
        configDialog_pdcch_nID.value = config.cell.pdcch_nID;
        configDialog_pdcch_nRNTI.value = config.cell.pdcch_nRNTI;

        //DCI
        // configDialog_dci_subcell.value = config.cell.
        configDialog_dci_RA_RNTIs.value = config.cell.dci_RA_RNTIs;
        configDialog_dci_TC_RNTIs.value = config.cell.dci_TC_RNTIs;
        configDialog_dci_1_1_sizeof_FD_ResAssignment.value = config.cell.dci_1_1_sizeof_FD_ResAssignment;
        configDialog_dci_1_1_sizeof_DAI.value = config.cell.dci_1_1_sizeof_DAI;
        configDialog_dci_1_1_sizeof_AntennaPorts.value = config.cell.dci_1_1_sizeof_AntennaPorts;
        configDialog_dci_1_1_sizeof_BWP_Indicator.value = config.cell.dci_1_1_sizeof_BWP_Indicator;

        configDialog_dci_0_1_sizeof_BWP_Indicator.value = config.cell.dci_0_1_sizeof_BWP_Indicator;
        configDialog_dci_0_1_sizeof_FD_ResAssignment.value = config.cell.dci_0_1_sizeof_FD_ResAssignment;
        configDialog_dci_0_1_sizeof_TD_ResAssignment.value = config.cell.dci_0_1_sizeof_TD_ResAssignment;
        configDialog_dci_0_1_sizeof_AntennaPorts.value = config.cell.dci_0_1_sizeof_AntennaPorts;
        configDialog_dci_0_1_sizeof_PrecodingInfoAndNumOfLayers.value = config.cell.dci_0_1_sizeof_PrecodingInfoAndNumOfLayers;
        configDialog_dci_0_1_sizeof_CsiRequest.value = config.cell.dci_0_1_sizeof_CsiRequest;
        configDialog_dci_0_1_sizeof_PTRS_DMRS_Association.value = config.cell.dci_0_1_sizeof_PTRS_DMRS_Association;
        configDialog_dci_0_1_sizeof_BetaOffsetIndicator.value = config.cell.dci_0_1_sizeof_BetaOffsetIndicator;
        configDialog_dci_0_1_sizeof_DmrsSequenceInit.value = config.cell.dci_0_1_sizeof_DmrsSequenceInit;
        configDialog_dci_0_1_sizeof_UL_SCH_indicator.value = config.cell.dci_0_1_sizeof_UL_SCH_indicator;
        // configDialog_dci_rachStatus.value = config.cell.dci_rachStatus;
        // set_param_radio( configDialog_dci_FieldSizesMode, config.cell.dci_FieldSizesMode );

        //CSI-RS
        configDialog_csirs_startPrb.value = config.cell.csirs_startPrb;
        configDialog_csirs_numOfPrb.value = config.cell.csirs_numOfPrb;
        configDialog_csirs_frequencyDomainAllocation.value = config.cell.csirs_frequencyDomainAllocation;
        configDialog_csirs_startSymbol.value = config.cell.csirs_startSymbol;
        configDialog_csirs_slotPeriodicity.value = config.cell.csirs_slotPeriodicity;
        configDialog_csirs_slotOffset.value = config.cell.csirs_slotOffset;

        set_param_radio_int( configDialog_csirs_density, config.cell.csirs_density );
        set_param_radio_int( configDialog_csirs_densityDot5, config.cell.csirs_densityDot5 );
        // configDialog_csirs_densityDot5.value = config.cell.csirs_densityDot5;

        configDialog_csirs_config.value = config.cell.csirs_config;
        configDialog_csirs_scramblingID.value = config.cell.csirs_scramblingID;

        //OTHER
        configDialog_moreChannels.checked = config.configDialog_moreChannels;
        configDialog_appliedArfcn.value = config.cell.appliedArfcn;

        configDialog_setCsirsRelatedFieldsAvailability();
        configDialog_setSSBRelatedFieldsAvailability( config.cell.SSBdetectType && config.cell.SSBdetectType === "AUTO");
        // configDialog_setDciRelatedFieldsAvailability( config.cell.dci_FieldSizesMode === "AUTO" ? true : false );
        // configDialog_setPdcchRelatedFieldsAvailability( config.cell.pdcch_decodingMode === "L2L1");
    }

    onOpen(){
        configDialog_set_DCI_field_sizes();
    }

    onLoad(){
        for( const e of configDialog_SSBdetectType ) e.onchange = configDialog_onChange;
        for( const e of configDialog_pbchCase ) e.onchange = configDialog_onChange;
        for( const e of configDialog_pbchPeriodicity ) e.onchange = configDialog_onChange;
        for( const e of configDialog_numOfPdcchSym ) e.onchange = configDialog_onChange;
        // for( const e of configDialog_dci_FieldSizesMode) e.onchange = configDialog_onChange;
        for( const e of configDialog_numOfPdcchSym ) e.onchange = configDialog_onChange;
        for( const e of configDialog_carrierFrequency ) e.onchange = configDialog_onChange;
        for( const e of configDialog_csirs_density ) e.onchange = configDialog_onChange;
        for( const e of configDialog_csirs_densityDot5 ) e.onchange = configDialog_onChange;

        configureDialog_u.onchange = configDialog_onChange;
        configDialog_antenna.onchange = configDialog_onChange;
        configDialog_prachCfgIdx.onchange = configDialog_onChange;
        configDialog_prachAntennaCombining_input.onchange = configDialog_onChange;

        configDialog.setToUI();
    }
}
customElements.define('bba-config-dialog', ConfigDialog);

configureDialog_arfcn_row_button.onclick = function(e) {
    const currentlyAppliedArfcn = config.cell.appliedArfcn; //parseInt(configureDialog_appliedArfcn.value);
    const currentlyAppliedFreq = getFreqFromArfcn(currentlyAppliedArfcn) * 1000;
    const newFreq = parseInt(configureDialog_nr_frequency.value) * 1000 || 0;

    phase_distortion(-currentlyAppliedFreq);
    phase_distortion(newFreq);

    const newArfcn = parseInt(configureDialog_arfcn.value) || 0;
    configureDialog_appliedArfcn.value = newArfcn;
    config.cell.appliedArfcn = newArfcn;

    logInfo("Signal","Applied ARFCN phase distortion");
}

configureDialog_nr_frequency.onchange = function (e) {
    let nr_frequency = parseInt(configureDialog_nr_frequency.value) || 0;
    if (nr_frequency < 0) nr_frequency = 0;
    if (nr_frequency > 100000000) nr_frequency = 100000000;
    configureDialog_nr_frequency.value = nr_frequency;
    if (nr_frequency < 3000000) {
        configureDialog_arfcn.value = Math.floor(nr_frequency / 5);
    } else if (3000000 <= nr_frequency < 24250000) {
        configureDialog_arfcn.value = Math.floor(600000 + (nr_frequency - 3000000) / 15);
    } else if (24250000 <= nr_frequency < 100000000) {
        configureDialog_arfcn.value = Math.floor(2016667 + (nr_frequency - 24250080) / 60);
    }
}

configureDialog_arfcn.onchange = configureDialog_arfcn_onchange
function configureDialog_arfcn_onchange() {
    let arfcn = Math.floor(parseInt(configureDialog_arfcn.value)) || 0;
    if (arfcn > 3279165) arfcn = 3279165;
    if (arfcn < 0) arfcn = 0;
    configureDialog_arfcn.value = arfcn;
    configureDialog_nr_frequency.value = getFreqFromArfcn(arfcn);
}

function configureDialog_changeEAxc(){

    const nodes = document.getElementsByClassName('configDialog_eAxc_bar');

    let widthSum = 0;
    for(let i = 0; i < nodes.length; i++){
        const val = parseInt(nodes[i].childNodes[1].value);
        widthSum += val;
    }

    if(widthSum !== 24){
        getElementById("configDialog_eAxc_info").innerText = `WARNiNG! eAxc width == ${widthSum} and its not equal to 16`;
    }
    else {
        getElementById("configDialog_eAxc_info").innerText = '';
    }
}

function getSSB_from_arfcn(){
    const arfcn = parseFloat(configureDialog_arfcn.value);
    const carrier_frequency_in_khz = parseFloat(configureDialog_nr_frequency.value); //frequency of central subcarrier
    const u = parseFloat(configureDialog_u.value);
    const scs = 15*2**u;

    let F_global; //global channel raster (frequency difference between each next arfcn value within frequency range)
    let ssblock_freq; //freq of subcarrier 0 of 10th RB of SSB, it is selected as synchronisation raster freq that is closest to center freq of carrier (carrier_freq_in_hz)
    if (carrier_frequency_in_khz < 3000000) {
        F_global = 5;
        const N = Math.floor((carrier_frequency_in_khz - 150) / 1200)
        ssblock_freq = (N * 1200) + 150
    } else if (3000000 <= carrier_frequency_in_khz < 24250000) {
        F_global = 15;
        const N = Math.floor((carrier_frequency_in_khz - 3000000) / 1440)
        ssblock_freq = (N * 1440) + 3000000
    } else if (24250000 <= carrier_frequency_in_khz < 100000000) {
        F_global = 60;
        const N = Math.floor((carrier_frequency_in_khz - 24250080) / 17280)
        ssblock_freq = (N * 17280) + 24250080
    }

    const numPrb = findMaxPRBPerU()[u];

    const freqPointA = F_global * arfcn - (12 * Math.floor(numPrb/2) + 6 * numPrb%2) * scs; //frequency of subcarrier 0 of RB 0
    const lowSSBFreq = ssblock_freq - 120*scs; //freq of subcarrier 0 of SSB

    let totalSubcarrierOffset = (lowSSBFreq - freqPointA)/scs; //number of subcarriers between Point A and subcarrier 0 of SSB

    const ssbREOffset = totalSubcarrierOffset % 12;
    const ssbRBOffset = Math.floor( totalSubcarrierOffset / 12);

    config.cell.pbch_scOffset = !isNaN(ssbREOffset) ? ssbREOffset : 0;
    config.cell.pbch_prbOffset = !isNaN(ssbRBOffset) ? ssbRBOffset : 0;

    configDialog.setToUI();
    configDialog_apply();
}

function configDialog_setSSBRelatedFieldsAvailability(disableSSBFields){ //grays out fields related to ssb/pbch detection (or reverts this effect)
    for(let i = 0; i<configDialog_pbchPeriodicity.length; i++){
        configDialog_pbchPeriodicity[i].disabled = disableSSBFields && parseInt(configDialog_pbchPeriodicity[i].value) !== get_param_radio_int( configDialog_pbchPeriodicity )
    }
    configDialog_pci.disabled = disableSSBFields;
    configDialog_pbchPrbOffset.disabled = disableSSBFields;
    configDialog_pbchHalfFrameOffset.disabled = disableSSBFields;
    configDialog_pbchScOffset.disabled = disableSSBFields;
    configDialog_pbchNumOfBlocks.disabled = disableSSBFields;

    //In auto mode disables all but one (nr_autodetect.. might change B->C later on), in manual mode leaves 2 options for u==1 (both B and C)
    for( let i = 0; i < configDialog_pbchCase.length; ++i ){
        const value = get_param_radio(configDialog_pbchCase);
        configDialog_pbchCase[i].disabled = disableSSBFields && value!==configDialog_pbchCase[i].value ||
            !disableSSBFields && !nr_allowedPbchCases[parseInt(config.cell.u)].includes(configDialog_pbchCase[i].value);
    }

    for(let i = 0; i < configDialog_carrierFrequency.length; i++){
        configDialog_carrierFrequency[i].disabled = disableSSBFields && configDialog_carrierFrequency[i].value !== config.cell.carrierFrequency;
    }

    configDialog_applySSB.disabled = !disableSSBFields; //It should be shown when other fields are disabled
}

function configDialog_setPdcchRelatedFieldsAvailability(disablePdcchFields){
    configDialog_pdcch_dciSize.disabled = disablePdcchFields;
    configDialog_pdcch_nID.disabled = disablePdcchFields;
    configDialog_pdcch_nRNTI.disabled = disablePdcchFields;
}

function configDialog_setCsirsRelatedFieldsAvailability(){
    if(config.cell.csirs_density != 0){ //0.5
        configDialog_csirs_densityDot5[0].disabled = true;
        configDialog_csirs_densityDot5[1].disabled = true;
    }
    else{
        configDialog_csirs_densityDot5[0].disabled = false;
        configDialog_csirs_densityDot5[1].disabled = false;
    }

    if(config.cell.csirs_config == 1){ //row 1
        configDialog_csirs_density[0].disabled = true;
        configDialog_csirs_density[1].disabled = true;
        configDialog_csirs_density[2].disabled = false;
    }
    else{ //rows 2 and 3
        configDialog_csirs_density[0].disabled = false;
        configDialog_csirs_density[1].disabled = false;
        configDialog_csirs_density[2].disabled = true;
    }
}

function configDialog_adjustFrequenciesAndCase(){
    const autoDetectionOn = config.cell.SSBdetectType === 'AUTO';

    if( nr_allowedPbchCases[config.cell.u] ){
        if(config.cell.u != 1 || !nr_allowedPbchCases[1].includes(config.cell.pbch_case)){
            config.cell.pbch_case = nr_allowedPbchCases[config.cell.u][0];
        }
    }
    set_param_radio( configDialog_pbchCase, config.cell.pbch_case );

    //Adjust Carrier Frequency (Enforce one on AUTO or allow all on MANUAL, nr_autodetect_SSB can later adjust it as there are 2 possible options for FR1)
    if(autoDetectionOn){
        config.cell.carrierFrequency = config.cell.u < 3 ? "<3" : "6<"; //The ,6<' applies to FR2 (u={3,4})
        set_param_radio( configDialog_carrierFrequency, config.cell.carrierFrequency );
    }
}

function configDialog_antennas_setToUI(){
    configDialog_antenna.innerHTML = "";
    for( const antId in iqBuffers[ config.cell.u ]){
        if( antId.indexOf("RoE") === -1 && parseInt(antId) < 65536) continue;
        const optionElement = document.createElement("option");
        optionElement.innerText = antId.indexOf("RoE") === -1 ? parseInt(antId) - 65536 : antId
        configDialog_antenna.appendChild(optionElement);
    }
}

function configDialog_subcellAntTable_setToUI(){
    configDialog_subcellAntTable.innerHTML = "<tr><td>u</td><td>Dir</td><td>Antenna</td><td>SubcellId</td></tr>";
    for( let u = 0; u < 6; u++){
        let count = 0;
        for( const antId in iqBuffers[u]){
            if(isNaN( parseInt(antId) )) continue;
            const trElem = document.createElement("tr");

            const tdElem_u = document.createElement("td");
            tdElem_u.innerText = u;

            const tdElem_dir = document.createElement("td");
            tdElem_dir.innerText = antId < 65536 ? "UL" : "DL";

            const tdElem_antenna = document.createElement("td");
            tdElem_antenna.innerText = antId < 65536 ? antId : antId - 65536;

            const tdElem_subcell = document.createElement("td");
            const inputElem_subcell = document.createElement("input");
            inputElem_subcell.type = "number";
            inputElem_subcell.value = antId > 65536 ? Math.floor( count/2 ) : 0; //some default values
            tdElem_subcell.appendChild(inputElem_subcell);

            trElem.appendChild(tdElem_u);
            trElem.appendChild(tdElem_dir);
            trElem.appendChild(tdElem_antenna);
            trElem.appendChild(tdElem_subcell);
            configDialog_subcellAntTable.firstChild.appendChild(trElem);
            if(antId >= 65536 ) count++;
        }
    }
}

function configDialog_initializeNumerology(u){ //Meant to set numerology to the first one found in the file
    configureDialog_u.value = u;
    configureDialog_u.dispatchEvent(new Event('change'));
}

function configDialog_onChange() {
    switch( this.name ) {
        case 'configureDialog_u':
            config.cell.u = parseInt( this.value );

            configDialog_adjustFrequenciesAndCase()
            configDialog_setSSBRelatedFieldsAvailability(config.cell.SSBdetectType === "AUTO");
            configDialog_antennas_setToUI();
            configDialog_apply();
            break;
        case 'configDialog_antenna':
            configDialog_apply();
            break;

        case 'configDialog_pbchPeriodicity':
            config.cell.pbch_periodicity = parseInt( this.value );
            configDialog_apply();
            break;
        case 'configDialog_SSBdetectType':
            const disable_fields = this.value === "AUTO" ? true : false;
            config.cell.SSBdetectType = this.value;

            configDialog_adjustFrequenciesAndCase();
            configDialog_setSSBRelatedFieldsAvailability(disable_fields);
            // configDialog_antennas_setToUI();

            break;
        case 'configDialog_pbchCase' :
            config.cell.pbch_case = configDialog_pbchCase.value;
            configDialog_apply();
            break;
        case 'configDialog_carrierFrequency':
            config.cell.carrierFrequency = this.value;
            break;
        case 'configDialog_csirsDensity' :
            config.cell.csirs_density = this.value;

            configDialog_setCsirsRelatedFieldsAvailability();
            configDialog_apply();
            break;
        case 'configDialog_csirsDensityDot5':
            config.cell.csirs_densityDot5 = this.value;
            configDialog_apply();
            break;

        case 'configDialog_prachCfgIdx':
            config.cell.prach_cfgIdx = this.value;
            break;
        case 'configDialog_prachAntennaCombining_input':
            config.cell.prachAntennasToCombine = this.value;
            break;
        case 'configDialog_moreChannels_cb':
            configDialog_setPdcchRelatedFieldsAvailability(config.configDialog_moreChannels);
            break;
        case 'configDialog_numOfPdcchSym':
            configDialog_apply();
            break;

        case 'configDialog_csirsConfig':
            config.cell.csirs_config = parseInt(this.value);

            if(config.cell.csirs_config == 1){
                set_param_radio_int(configDialog_csirs_density,3);
            }
            else set_param_radio_int(configDialog_csirs_density,1);


            configDialog_setCsirsRelatedFieldsAvailability();
            configDialog_apply();
            break;
    }
    configDialog_validate();
}

function configDialog_decInc( isInc, paramName ) {
    configDialog.getFromUI();
    config.cell[paramName] += isInc ? 1 : -1;
    configDialog.setToUI();
    nr_fillIqTypes();
    iqTab_iqTypesUpdated();
}

function configDialog_add_csirs_resource() {
    config.cell.csirs.push(Object.assign({},config.cell.csirs[0]))
    configDialog.setToUI();
}
function configDialog_remove_csirs_resource(idx) {
    config.cell.csirs = config.cell.csirs.filter((_,i) => i != idx)
    configDialog.setToUI();
}

function configDialog_validate() {
    config.cell.pci = clamp( config.cell.pci, 0, 1007 );
    config.cell.pbch_numOfBlocks = clamp( config.cell.pbch_numOfBlocks, 0, nr_pbchConfig[config.cell.pbch_case].indexes.length );
    config.cell.pbch_prbOffset = clamp( config.cell.pbch_prbOffset, 0, 253 );
    config.cell.pbch_scOffset = clamp( config.cell.pbch_scOffset, 0, 11 );
}

function configDialog_apply() {
    configDialog.getFromUI();
    nr_fillIqTypes();

    iqTab_iqTypesUpdated();
    // if(config.load.l2l1_DCI_payload_decoding)
    //     dci_update_values();
}

function configDialog_detectPrachCfgIdx(){
    for (let i = 0; i < packetsLength; i++) {
        if (packets[i].ecpri !== undefined) {
            if (packets[i].ecpri.filterIndex === 1 || packets[i].ecpri.filterIndex === 3) {
                config.cell.prach_cfgIdx = nr_autodetect_prach_cfg_idx();
                configDialog.setToUI();
                break;
            }
        }
    }
}

function configDialog_detectSSB(){
    configDialog.getFromUI();
    if(config.cell.SSBdetectType === "AUTO") nr_autodetect_SSB_and_adjust_config();
    configDialog_apply(); //to call nr_fillIqTypes
}

function configDialog_setPrachCfgIdx_help(prachCfgIdxs) {
    configDialog_possiblePrachCfgIdx.value = ''
    if (prachCfgIdxs === undefined) {
        configDialog_possiblePrachCfgIdx.value = 'No PRACH cfg idx fits criteria.'
    } else {
        for (idx of prachCfgIdxs) {
            configDialog_possiblePrachCfgIdx.value += idx + ', '
        }
    }
}

function configDialog_set_DCI_field_sizes(){
    configDialog.getFromUI();
    const c = config.cell;

    let sizeof_DCI_1_1 = 1+c.dci_1_1_sizeof_BWP_Indicator+c.dci_1_1_sizeof_FD_ResAssignment+4+5+1+2+4+c.dci_1_1_sizeof_DAI+2+3+3+c.dci_1_1_sizeof_AntennaPorts+2+1;
    getElementById('configDialog_dci_sizeof_1_1').innerText = String(sizeof_DCI_1_1);

    let sizeof_DCI_0_1 = 1+c.dci_0_1_sizeof_BWP_Indicator+c.dci_0_1_sizeof_FD_ResAssignment+c.dci_0_1_sizeof_TD_ResAssignment+5+1+2+4+2+2+c.dci_0_1_sizeof_PrecodingInfoAndNumOfLayers+c.dci_0_1_sizeof_AntennaPorts+2+c.dci_0_1_sizeof_CsiRequest+c.dci_0_1_sizeof_PTRS_DMRS_Association+c.dci_0_1_sizeof_BetaOffsetIndicator+c.dci_0_1_sizeof_DmrsSequenceInit+c.dci_0_1_sizeof_UL_SCH_indicator;
    getElementById('configDialog_dci_sizeof_0_1').innerText = String(sizeof_DCI_0_1);
}