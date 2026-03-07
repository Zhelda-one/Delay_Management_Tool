const generatorPBCHDialog = /** @type {GeneratorPBCHDialog} */ getElementById( 'generatorPBCHDialog' );

const generator_PCI_value = getElementById( 'generator_PCI_value' );
const generator_PBCH_half_frame_bit = document.getElementsByName( 'generator_PBCH_half_frame_bit' );
const generator_SS_PBCH_block_index = getElementById( 'generator_SS_PBCH_block_index' );
const generator_SFN_value = getElementById( 'generator_SFN_value' );
const generator_PBCH_dialog_SCS = document.getElementsByName( 'generator_PBCH_dialog_SCS' );
const generator_SSB_subcarrier_offset = getElementById( 'generator_SSB_subcarrier_offset' );
const generator_PBCH_dialog_DMRS_typeA_position = document.getElementsByName( 'generator_PBCH_dialog_DMRS_typeA_position' );
const generator_SSB_PDCCH_config_SIB1 = getElementById( 'generator_SSB_PDCCH_config_SIB1' );
const generator_PBCH_dialog_cell_barred = document.getElementsByName( 'generator_PBCH_dialog_cell_barred' );
const generator_PBCH_dialog_intra_freq_reselection = document.getElementsByName( 'generator_PBCH_dialog_intra_freq_reselection' );
const generator_PBCH_dialog_carrier_frequency = document.getElementsByName( 'generator_PBCH_dialog_carrier_frequency' );

class GeneratorPBCHDialog extends Dialog {

    constructor(){
        super("PBCH Details");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-generator-pbch-dialog', GeneratorPBCHDialog);

// This should be GetFromUI function, but this functionality currently does not go through config
function get_SSB_configuration(){

    let configuration = {
        PCI: parseInt(generator_PCI_value.value),
        half_frame_bit: get_param_radio(generator_PBCH_half_frame_bit) === '0' ? 0 : 1,
        ssbIndex: parseInt(generator_SS_PBCH_block_index.value),

        systemFrameNumber: parseInt(generator_SFN_value.value),
        subCarrierSpacingCommon: get_param_radio(generator_PBCH_dialog_SCS) === 'scs15or60' ? 0 : 1,
        ssb_SubcarrierOffset: parseInt(generator_SSB_subcarrier_offset.value),
        dmrs_TypeA_Position: get_param_radio(generator_PBCH_dialog_DMRS_typeA_position) === 'pos2' ? 0 : 1,
        pdcch_ConfigSIB1: parseInt(generator_SSB_PDCCH_config_SIB1.value),
        cellBarred: get_param_radio(generator_PBCH_dialog_cell_barred) === 'barred' ? 0 : 1,
        intraFreqReselection: get_param_radio(generator_PBCH_dialog_intra_freq_reselection) === 'allowed' ? 0 : 1,
    };

    const PBCH_dialog_carrier_frequency_value = get_param_radio(generator_PBCH_dialog_carrier_frequency);
    if ( PBCH_dialog_carrier_frequency_value === "<3" ) configuration.L_max =  4;
    else if ( PBCH_dialog_carrier_frequency_value === "3_6" ) configuration.L_max =  8;
    else if ( PBCH_dialog_carrier_frequency_value === "6<" ) configuration.L_max = 64;

    return configuration;
}