'use strict';

// let ui_version = getElementById('ui_version');

let ui_filename = getElementById('ui_filename');
let ui_mode = document.getElementsByName('ui_mode');
let ui_timing_mode = document.getElementsByName('ui_timing_mode');
let ui_sort_packets = getElementById('ui_sort_packets');
let ui_mtu = getElementById('ui_mtu');
let ui_out_json = getElementById('ui_out_json');
let ui_out_pcap = getElementById('ui_out_pcap');

let ui_pcap_big_endian = getElementById('ui_pcap_big_endian');
let ui_src_mac_addr = getElementById('ui_src_mac_addr');
let ui_dest_mac_addr = getElementById('ui_dest_mac_addr');
let ui_vlan_enable = getElementById('ui_vlan_enable');
let ui_vlan_id = getElementById('ui_vlan_id');
let ui_min_pkt_len = getElementById('ui_min_pkt_len');

let ui_max_u = document.getElementsByName('ui_max_u');
let ui_dynamic_delay = getElementById('ui_dynamic_delay');
let ui_type65_enable = getElementById('ui_type65_enable');
let ui_xirc_beta_enable = getElementById('ui_xirc_beta_enable');
let ui_type65_delay = getElementById('ui_type65_delay');
let ui_xirc_beta_delay = getElementById('ui_xirc_beta_delay');
let ui_srs_su_mimo_num = getElementById('ui_srs_su_mimo_num');
let ui_srs_bm_num = getElementById('ui_srs_bm_num');
let ui_pusch_cell_ps_num = getElementById('ui_pusch_cell_ps_num');
let ui_pusch_ue_num = getElementById('ui_pusch_ue_num');
let ui_srs_rt_bf_num = getElementById('ui_srs_rt_bf_num');
let ui_rim_num = getElementById('ui_rim_num');

let ui_cplane_dl_enable = getElementById('ui_cplane_dl_enable');
let ui_cplane_ul_enable = getElementById('ui_cplane_ul_enable');
let ui_cplane_dl_advance = getElementById('ui_cplane_dl_advance');
let ui_cplane_ul_advance = getElementById('ui_cplane_ul_advance');

let ui_uplane_dl_enable = getElementById('ui_uplane_dl_enable');
let ui_uplane_ul_enable = getElementById('ui_uplane_ul_enable');
let ui_dynamic_iq_comp = getElementById('ui_dynamic_iq_comp');
let ui_iq_scaling_mode = document.getElementsByName('ui_iq_scaling_mode');
let ui_iq_bit_width = getElementById('ui_iq_bit_width');
let ui_iq_comp_method = document.getElementsByName('ui_iq_comp_method');
let ui_interface_resolution = getElementById('ui_interface_resolution');
let ui_uplane_dl_advance = getElementById('ui_uplane_dl_advance');
let ui_uplane_ul_delay = getElementById('ui_uplane_ul_delay');
let ui_iq_fill_method = document.getElementsByName('ui_iq_fill_method');

let ui_modulation_type = getElementById('ui_modulation_type');
let ui_modulation_power = getElementById('ui_modulation_power');
let ui_gauss_dl_power = getElementById('ui_gauss_dl_power');
let ui_gauss_dl_power_unit = getElementById('ui_gauss_dl_power_unit');
let ui_gauss_ul_power = getElementById('ui_gauss_ul_power');
let ui_gauss_ul_power_unit = getElementById('ui_gauss_ul_power_unit');
let ui_5gmax_input_file = getElementById('ui_5gmax_input_file');

const ui_num_of_mtz_sections = getElementById('ui_num_of_mtz_sections');
// let ui_extType1_enable = getElementById('ui_extType1_enable');
// let ui_extType1_bfwIqBitWidth = getElementById('ui_extType1_bfwIqBitWidth');
// let ui_extType1_bfwCompMeth = document.getElementsByName('ui_extType1_bfwCompMeth');
// let ui_extType1_bfwIqWeights = getElementById('ui_extType1_bfwIqWeights');
//
// let ui_extType6_enable = getElementById('ui_extType6_enable');
//
// let ui_extType9_enable = getElementById('ui_extType9_enable');
// let ui_extType9_technology = document.getElementsByName('ui_extType9_technology');

let ui_band = document.getElementsByName('ui_band');
let ui_u = document.getElementsByName('ui_u');
let ui_num_of_antennas_dl = getElementById('ui_num_of_antennas_dl');
let ui_num_of_antennas_ul = getElementById('ui_num_of_antennas_ul');
let ui_dl_rtc_ids = getElementById('ui_dl_rtc_ids');
let ui_ul_rtc_ids = getElementById('ui_ul_rtc_ids');
let ui_start_prb = getElementById('ui_start_prb');
let ui_num_of_prb = getElementById('ui_num_of_prb');

let ui_pbch_num_of_antennas = getElementById('ui_pbch_num_of_antennas');
let ui_pbch_rtc_ids = getElementById('ui_pbch_rtc_ids');
let ui_pbch_case = document.getElementsByName('ui_pbch_case');
let ui_pbch_num_of_blocks = getElementById('ui_pbch_num_of_blocks');
let ui_pbch_prb_offset = getElementById('ui_pbch_prb_offset');
let ui_pbch_sc_offset = getElementById('ui_pbch_sc_offset');

let ui_prach_num_of_antennas = getElementById('ui_prach_num_of_antennas');
let ui_prach_rtc_ids = getElementById('ui_prach_rtc_ids');
let ui_prach_cfg_idx = getElementById('ui_prach_cfg_idx');
let ui_prach_prb_offset = getElementById('ui_prach_prb_offset');

let ui_type65_rtc_ids = getElementById('ui_type65_rtc_ids');
let ui_xirc_rtc_ids = getElementById('ui_xirc_rtc_ids');
let ui_beta_rtc_ids = getElementById('ui_beta_rtc_ids');
let ui_xirc_beta_num_of_prb = getElementById('ui_xirc_beta_num_of_prb');
let ui_beta_remask = getElementById('ui_beta_remask');

let ui_frame_structure = getElementById('ui_frame_structure');

function download(filename, data) {
    let blob = new Blob([data], {type:'application/octet-binary'});

    let a = document.createElement('a')
    a.download = filename
    a.href = URL.createObjectURL(blob)
    a.style.display = 'none'

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function get_param_radio( param ) {
    for( let i = 0; i < param.length; ++i ) {
        if( param[i].checked ) return param[i].value;
    }
}

function parseArray( value ) {
    return JSON.parse( '[' + value + ']' );
}

function convert_hex_string_to_int_array( hex_string ) {
    let hex_string_no_line_break = hex_string.split("\n").join(" ");
    let hex_array = hex_string_no_line_break.split(", ");

    for( let i = 0; i < hex_array.length; ++i ) {
        hex_array[i] = parseInt('0x' + hex_array[i]);
    }

    return hex_array;
}

function get_params_from_page() {
    ecog_config.filename = ui_filename.value;
    ecog_config.mode = get_param_radio( ui_mode );
    ecog_config.timing_mode = get_param_radio( ui_timing_mode );
    ecog_config.sort_packets = ui_sort_packets.checked;
    ecog_config.mtu = parseInt( ui_mtu.value );
    ecog_config.output_json = ui_out_json.checked;
    ecog_config.output_pcap = ui_out_pcap.checked;

    ecog_config.pcap_big_endian = ui_pcap_big_endian.checked;
    ecog_config.src_mac_addr = ui_src_mac_addr.value;
    ecog_config.dest_mac_addr = ui_dest_mac_addr.value;
    ecog_config.vlan_enable = ui_vlan_enable.checked;
    ecog_config.vlan_id     = parseInt( ui_vlan_id.value );
    ecog_config.min_pkt_len = parseInt( ui_min_pkt_len.value );

    ecog_config.max_u = parseInt( get_param_radio( ui_max_u ) );
    ecog_config.dynamic_delay = ui_dynamic_delay.checked;
    ecog_config.type65_enable = ui_type65_enable.checked;
    ecog_config.xirc_beta_enable = ui_xirc_beta_enable.checked;
    ecog_config.type65_delay = parseInt( ui_type65_delay.value );
    ecog_config.xirc_beta_delay = parseInt( ui_xirc_beta_delay.value );
    ecog_config.srs_su_mimo_num = parseInt( ui_srs_su_mimo_num.value );
    ecog_config.srs_bm_num = parseInt( ui_srs_bm_num.value );
    ecog_config.pusch_cell_ps_num = parseInt( ui_pusch_cell_ps_num.value );
    ecog_config.pusch_ue_num = parseInt( ui_pusch_ue_num.value );
    ecog_config.srs_rt_bf_num = parseInt( ui_srs_rt_bf_num.value );
    ecog_config.rim_num = parseInt( ui_rim_num.value );

    ecog_config.cplane_dl_enable = ui_cplane_dl_enable.checked;
    ecog_config.cplane_ul_enable = ui_cplane_ul_enable.checked;
    ecog_config.cplane_dl_advance = parseInt( ui_cplane_dl_advance.value );
    ecog_config.cplane_ul_advance = parseInt( ui_cplane_ul_advance.value );

    ecog_config.uplane_dl_enable = ui_uplane_dl_enable.checked;
    ecog_config.uplane_ul_enable = ui_uplane_ul_enable.checked;
    ecog_config.dynamic_iq_comp = ui_dynamic_iq_comp.checked;
    ecog_config.iq_scaling_mode = parseInt( get_param_radio( ui_iq_scaling_mode ) );
    ecog_config.iq_bit_width = parseInt( ui_iq_bit_width.value );
    ecog_config.iq_comp_method = parseInt( get_param_radio( ui_iq_comp_method ) );
    ecog_config.uplane_dl_advance = parseInt( ui_uplane_dl_advance.value );
    ecog_config.uplane_ul_delay = parseInt( ui_uplane_ul_delay.value );
    ecog_config.iq_fill_method = parseInt( get_param_radio( ui_iq_fill_method ) );

    ecog_config.modulation_type = ui_modulation_type.value;
    ecog_config.modulation_power = parseFloat( ui_modulation_power.value );
    ecog_config.gauss_dl_power = parseFloat( ui_gauss_dl_power.value );
    ecog_config.gauss_dl_power_unit = ui_gauss_dl_power_unit.value;
    ecog_config.gauss_ul_power = parseFloat( ui_gauss_ul_power.value );
    ecog_config.gauss_ul_power_unit = ui_gauss_ul_power_unit.value;
    ecog_config.num_of_mtz_sections = parseInt( ui_num_of_mtz_sections.value );

    // config.extType1_enable = ui_extType1_enable.checked;
    // config.extType1_bfwIqBitWidth = parseInt( ui_extType1_bfwIqBitWidth.value );
    // config.extType1_bfwCompMeth = parseInt( get_param_radio( ui_extType1_bfwCompMeth ) );
    // config.extType1_bfwIqWeights = parseArray( ui_extType1_bfwIqWeights.value );
    //
    // config.extType6_enable = ui_extType6_enable.checked;
    //
    // config.extType9_enable = ui_extType9_enable.checked;
    // config.extType9_technology = parseInt( get_param_radio( ui_extType9_technology ) );

    ecog_config.band = get_param_radio( ui_band );
    ecog_config.u = parseInt( get_param_radio( ui_u ) );
    ecog_config.num_of_antennas_dl = parseInt( ui_num_of_antennas_dl.value );
    ecog_config.num_of_antennas_ul = parseInt( ui_num_of_antennas_ul.value );
    ecog_config.dl_rtc_ids = parseArray( ui_dl_rtc_ids.value );
    ecog_config.ul_rtc_ids = parseArray( ui_ul_rtc_ids.value );
    ecog_config.start_prb = parseInt( ui_start_prb.value );
    ecog_config.num_of_prb = parseInt( ui_num_of_prb.value );

    ecog_config.pbch_num_of_antennas = parseInt( ui_pbch_num_of_antennas.value );
    ecog_config.pbch_rtc_ids = parseArray( ui_pbch_rtc_ids.value );
    ecog_config.pbch_case = get_param_radio( ui_pbch_case );
    ecog_config.pbch_num_of_blocks = parseInt( ui_pbch_num_of_blocks.value );
    ecog_config.pbch_prb_offset = parseInt( ui_pbch_prb_offset.value );
    ecog_config.pbch_sc_offset = parseInt( ui_pbch_sc_offset.value );

    ecog_config.prach_num_of_antennas = parseInt( ui_prach_num_of_antennas.value );
    ecog_config.prach_rtc_ids = parseArray( ui_prach_rtc_ids.value );
    ecog_config.prach_cfg_idx = parseInt( ui_prach_cfg_idx.value );
    ecog_config.prach_prb_offset = parseInt( ui_prach_prb_offset.value );

    ecog_config.type65_rtc_ids = parseArray( ui_type65_rtc_ids.value );
    ecog_config.xirc_rtc_ids = parseArray( ui_xirc_rtc_ids.value );
    ecog_config.beta_rtc_ids = parseArray( ui_beta_rtc_ids.value );
    ecog_config.xirc_beta_num_of_prb = parseInt( ui_xirc_beta_num_of_prb.value );
    ecog_config.beta_remask = parseArray(convert_hex_string_to_int_array(ui_beta_remask.value));

    ecog_config.frame_structure = parseArray( ui_frame_structure.value );

    return true;
}

function ui_load_config() {
    let input = document.createElement( 'input' );
    input.type = 'file';
    input.addEventListener( 'change', function(e) {
        let file = e.target.files[0];
        if( !file ) { return; }
        let reader = new FileReader();
        reader.onload = function( event ) {
            try {
                ecog_config = { ...ecog_config, ...JSON.parse( event.target.result ) };
                set_params_from_config();
            } catch( e ) {
                logError( 'eCoG', e );
                const posArr = e.toString().match( /\d+/g );
                if( posArr.length ) {
                    const pos = parseInt( posArr[posArr.length - 1] );
                    let lineNum = 1;
                    for( let i = 0; i < pos; ++i ) {
                        if( event.target.result[i] === '\n' ) {
                            ++lineNum;
                        }
                    }
                    logError( 'eCoG', `JSON.parse failed at line: ${lineNum}` );
                }
            }
        };
        reader.readAsText( file );
    });
    input.dispatchEvent( new MouseEvent('click') );
}

function ui_save_config() {
    get_params_from_page();
    let date = new Date();
    download('ecog_cfg_' +
        date.getFullYear() + '_' +
        (date.getMonth() + 1) + '_' +
        date.getDate() + '_' +
        date.getHours() + '_' +
        date.getMinutes() + '_' +
        date.getSeconds() +
        '.json', JSON.stringify(ecog_config, null, 2));
}

function update_cell_limits() {
    let band = get_param_radio( ui_band );
    let u = parseInt( get_param_radio( ui_u ) );
    let max_u = parseInt( get_param_radio( ui_max_u ) );

    for( let i = 0; i < ui_u.length; ++i ) {
        ui_u[i].disabled = !allowed_u[band][i];
    }

    if( ui_u[u].disabled ){
        ui_u[2].checked = true; u = 2;
    }

    for( let i = 0; i < ui_pbch_case.length; ++i ) {
        ui_pbch_case[i].disabled = !allowed_pbch_cases[band][i];
        if( ui_pbch_case[i].checked && !allowed_pbch_cases[band][i] ) {
            ui_pbch_case[band === 'FR1' ? 1 : 4].checked = true;
        }
    }

    let pbch_u = pbch_configs[ get_param_radio( ui_pbch_case ) ].u;
    let min_max_u = pbch_u > u ? pbch_u : u;

    for( let i = 0; i < ui_max_u.length; ++i ) {
        ui_max_u[i].disabled = i < min_max_u;
    }

    ui_max_u[min_max_u].checked = true;

    if( band !== ecog_config.band ) {
        ecog_config.frame_structure = default_frame_structure[band];
        ui_frame_structure_update();
        ecog_config.band = band;
    }

    // config.frame_structure = default_frame_structure[band];
    // ui_frame_structure_update();

    if( u !== ecog_config.u ) {
        ui_num_of_prb.value = max_prb_per_u[band][u];
        ecog_config.u = u;
    }

    // TODO: if( config.u !== u )
    ui_cplane_dl_advance.value = default_ecpri_advanced[u][0];
    ui_cplane_ul_advance.value = default_ecpri_advanced[u][1];
    ui_uplane_dl_advance.value = default_ecpri_advanced[u][2];
    ui_uplane_ul_delay.value = default_ecpri_advanced[u][3];
}

function set_param_radio( param, value ) {
    param.forEach(function (i) {
        if( i.value === value ) i.checked = true;
    });
}

function ui_beta_remask_update()
{
    let local_beta_remask = ecog_config.beta_remask;
    let beta_remask_text = '';


    for(let i = 0; i < ecog_config.beta_remask.length; ++i ) {
        local_beta_remask[i] = local_beta_remask[i].toString(16);
    }

    for(let i = 0; i < ecog_config.beta_remask.length; ++i ) {

        beta_remask_text += local_beta_remask[i];

        if( i !== ecog_config.beta_remask.length - 1 ) {
            if (i > 0 && ( i % 10 === 9 ) ) {
                beta_remask_text += ',\n';
            }
            else {
                beta_remask_text += ', ';
            }
        }
    }

    ui_beta_remask.value = beta_remask_text;
}

function ui_frame_structure_update()
{
    let frame_structure_text = '';

    for(let i = 0; i < ecog_config.frame_structure.length; ++i ) {
        if( ecog_config.frame_structure[i] < 10 ) {
            frame_structure_text += ' ';
        }

        frame_structure_text += ecog_config.frame_structure[i];

        if( i !== ecog_config.frame_structure.length - 1 ) {
            if (i > 0 && ( i % 10 === 9 ) ) {
                frame_structure_text += ',\n';
            }
            else {
                frame_structure_text += ', ';
            }
        }
    }

    ui_frame_structure.value = frame_structure_text;
    ui_beta_remask_update();
}

function ui_interface_resolution_update() {
    ecog_config.iq_scaling_mode = parseInt( get_param_radio( ui_iq_scaling_mode ) );
    ecog_config.iq_bit_width = parseInt( ui_iq_bit_width.value );
    ecog_config.iq_comp_method = parseInt( get_param_radio( ui_iq_comp_method ) );
    const max_exponent = ecog_config.iq_scaling_mode === 1 ? 15 : ( 16 - ecog_config.iq_bit_width );
    ui_interface_resolution.textContent = ( -10 * Math.log10( Math.pow( 2, 2 * ( ecog_config.iq_bit_width - 1 + ( ecog_config.iq_comp_method === 1 ? max_exponent : 0 ) ) ) ) ).toFixed( 2 );
}

function type65_update( checked ) {
    ui_srs_su_mimo_num.disabled = !checked;
    ui_srs_bm_num.disabled = !checked;
    ui_type65_rtc_ids.disabled = !checked;
    ui_type65_delay.disabled = !checked;
    ui_pusch_cell_ps_num.disabled = !checked;
    ui_pusch_ue_num.disabled = !checked;
    ui_srs_rt_bf_num.disabled = !checked;
    ui_rim_num.disabled = !checked;
}

function xirc_beta_update( checked ) {
    ui_xirc_beta_delay.disabled = !checked;
    ui_xirc_rtc_ids.disabled = !checked;
    ui_beta_rtc_ids.disabled = !checked;
    ui_beta_remask.disabled = !checked;
    ui_xirc_beta_num_of_prb.disabled = !checked;
}

function set_params_from_config() {
    ui_filename.value = ecog_config.filename;
    set_param_radio( ui_mode, ecog_config.mode );
    set_param_radio( ui_timing_mode, ecog_config.timing_mode );
    ui_sort_packets.checked = ecog_config.sort_packets;
    ui_mtu.value = ecog_config.mtu;
    ui_out_json.checked = ecog_config.output_json;
    ui_out_pcap.checked = ecog_config.output_pcap;

    ui_pcap_big_endian.checked = ecog_config.pcap_big_endian;
    ui_src_mac_addr.value = ecog_config.src_mac_addr;
    ui_dest_mac_addr.value = ecog_config.dest_mac_addr;
    ui_vlan_enable.checked = ecog_config.vlan_enable;
    ui_vlan_id.disabled = !ecog_config.vlan_enable;
    ui_vlan_id.value = ecog_config.vlan_id;
    ui_min_pkt_len.value = ecog_config.min_pkt_len;

    set_param_radio( ui_max_u, ecog_config.max_u.toString() );
    ui_dynamic_delay.checked = ecog_config.dynamic_delay;
    ui_type65_enable.checked = ecog_config.type65_enable;
    ui_xirc_beta_enable.checked = ecog_config.xirc_beta_enable;
    ui_type65_delay.disabled = !ecog_config.type65_enable;
    ui_type65_delay.value = ecog_config.type65_delay;
    ui_xirc_beta_delay.disabled = !ecog_config.xirc_beta_enable;
    ui_xirc_beta_delay.value = ecog_config.xirc_beta_delay;
    ui_srs_su_mimo_num.disabled = !ecog_config.type65_enable;
    ui_srs_su_mimo_num.value = ecog_config.srs_su_mimo_num;
    ui_srs_bm_num.disabled = !ecog_config.type65_enable;
    ui_srs_bm_num.value = ecog_config.srs_bm_num;
    ui_pusch_cell_ps_num.disabled = !ecog_config.type65_enable;
    ui_pusch_cell_ps_num.value = ecog_config.pusch_cell_ps_num;
    ui_pusch_ue_num.disabled = !ecog_config.type65_enable;
    ui_pusch_ue_num.value = ecog_config.pusch_ue_num;
    ui_srs_rt_bf_num.disabled = !ecog_config.type65_enable;
    ui_srs_rt_bf_num.value = ecog_config.srs_rt_bf_num;
    ui_rim_num.disabled = !ecog_config.type65_enable;
    ui_rim_num.value = ecog_config.rim_num;

    ui_cplane_dl_enable.checked = ecog_config.cplane_dl_enable;
    ui_cplane_ul_enable.checked = ecog_config.cplane_ul_enable;
    ui_cplane_dl_advance.value = ecog_config.cplane_dl_advance;
    ui_cplane_ul_advance.value = ecog_config.cplane_ul_advance;

    ui_uplane_dl_enable.checked = ecog_config.uplane_dl_enable;
    ui_uplane_ul_enable.checked = ecog_config.uplane_ul_enable;
    ui_dynamic_iq_comp.checked = ecog_config.dynamic_iq_comp;
    set_param_radio( ui_iq_scaling_mode, ecog_config.iq_scaling_mode.toString() );
    ui_iq_bit_width.value = ecog_config.iq_bit_width;
    set_param_radio( ui_iq_comp_method, ecog_config.iq_comp_method.toString() );
    ui_uplane_dl_advance.value = ecog_config.uplane_dl_advance;
    ui_uplane_ul_delay.value = ecog_config.uplane_ul_delay;
    set_param_radio( ui_iq_fill_method, ecog_config.iq_fill_method.toString() );

    ui_modulation_power.value = ecog_config.modulation_power;
    ui_modulation_type.value = ecog_config.modulation_type;
    ui_gauss_dl_power.value = ecog_config.gauss_dl_power;
    ui_gauss_dl_power_unit.value = ecog_config.gauss_dl_power_unit;
    ui_gauss_ul_power.value = ecog_config.gauss_ul_power;
    ui_gauss_ul_power_unit.value = ecog_config.gauss_ul_power_unit;
    ui_num_of_mtz_sections.value = ecog_config.num_of_mtz_sections;

    // ui_extType1_enable.checked = config.extType1_enable;
    // ui_extType1_bfwIqBitWidth.value = config.extType1_bfwIqBitWidth;
    // set_param_radio( ui_extType1_bfwCompMeth, config.extType1_bfwCompMeth.toString() );
    // ui_extType1_bfwIqWeights.value = config.extType1_bfwIqWeights.join(', ');
    //
    // ui_extType6_enable.checked = config.extType6_enable;
    //
    // ui_extType9_enable.checked = config.extType9_enable;
    // set_param_radio( ui_extType9_technology, config.extType9_technology.toString() );

    set_param_radio( ui_band, ecog_config.band );
    set_param_radio( ui_u, ecog_config.u.toString() );
    ui_num_of_antennas_dl.value = ecog_config.num_of_antennas_dl;
    ui_num_of_antennas_ul.value = ecog_config.num_of_antennas_ul;
    ui_dl_rtc_ids.value = ecog_config.dl_rtc_ids.join(', ');
    ui_ul_rtc_ids.value = ecog_config.ul_rtc_ids.join(', ');
    ui_start_prb.value = ecog_config.start_prb;
    ui_num_of_prb.value = ecog_config.num_of_prb;

    ui_pbch_num_of_antennas.value = ecog_config.pbch_num_of_antennas;
    ui_pbch_rtc_ids.value = ecog_config.pbch_rtc_ids.join(', ');
    set_param_radio( ui_pbch_case, ecog_config.pbch_case );
    ui_pbch_num_of_blocks.value = ecog_config.pbch_num_of_blocks;
    ui_pbch_prb_offset.value = ecog_config.pbch_prb_offset;
    ui_pbch_sc_offset.value = ecog_config.pbch_sc_offset;

    ui_prach_num_of_antennas.value = ecog_config.prach_num_of_antennas;
    ui_prach_rtc_ids.value = ecog_config.prach_rtc_ids.join(', ');
    ui_prach_cfg_idx.value = ecog_config.prach_cfg_idx;
    ui_prach_prb_offset.value = ecog_config.prach_prb_offset;

    ui_type65_rtc_ids.disabled = !ecog_config.type65_enable;
    ui_type65_rtc_ids.value = ecog_config.type65_rtc_ids.join(', ');
    ui_xirc_rtc_ids.disabled = !ecog_config.xirc_beta_enable;
    ui_xirc_rtc_ids.value = ecog_config.xirc_rtc_ids.join(', ');
    ui_beta_rtc_ids.disabled = !ecog_config.xirc_beta_enable;
    ui_beta_rtc_ids.value = ecog_config.beta_rtc_ids.join(', ');
    ui_xirc_beta_num_of_prb.value = ecog_config.xirc_beta_num_of_prb;
    ui_xirc_beta_num_of_prb.disabled = !ecog_config.xirc_beta_enable;
    ui_beta_remask.disabled = !ecog_config.xirc_beta_enable;


    ui_frame_structure_update();

    update_cell_limits();
    ui_interface_resolution_update();
}

function ui_gen_frame_structure_72e() {
    let xirc_beta_enable_checkbox = getElementById('ui_xirc_beta_enable');
    if (xirc_beta_enable_checkbox.checked == true)
    {
        const u = parseInt( get_param_radio( ui_u ) );
        ecog_config.frame_structure = new Array( 10 << u ).fill( 31 );
        ecog_config.beta_remask = new Array( 10 << u ).fill( 0xFFF );
    }
    else
    {
        ecog_config.frame_structure = default_frame_structure['FR1'];
        ecog_config.beta_remask = default_beta_factor_re_mask;
    }
    ui_frame_structure_update();
}

function ui_gen_frame_structure( dir ) {
    const u = parseInt( get_param_radio( ui_u ) );
    ecog_config.frame_structure = new Array( 10 << u ).fill( dir === 0 ? 29 : 27 );
    ui_frame_structure_update();
}

function ui_reset_to_defaults() {
    ecog_config = JSON.parse( JSON.stringify( configDefault.generatorTab ) );
    set_params_from_config();
}

async function ui_generate()
{
    get_params_from_page();

    return new Promise(async (resolve, reject)=>{
        if( ecog_config.mode === 'generator' )
        {
            const result = await generate();
            if(result !== false){
                resolve(result);
            }
            reject('Generator Mode: generate() error');
        }
        else if( ecog_config.mode === 'json' )
        {
            let input = document.createElement( 'input' );
            input.type = 'file';
            //input.multiple = true;
            input.addEventListener( 'change', function(e) {
                let file = e.target.files[0];
                if( !file ) { reject("ui_generate: no file provided."); }
                let reader = new FileReader();
                reader.onload = async function( event ) {
                    try {
                        generated_packets = JSON.parse( event.target.result );
                        const result = await generate();
                        if(result !== false){
                            resolve(result);
                        }
                        reject("JSON mode: generate() error")
                    } catch( e ) {
                        logError( 'eCoG', e );
                        const posArr = e.toString().match( /\d+/g );
                        if( posArr.length ) {
                            const pos = parseInt( posArr[posArr.length - 1] );
                            let lineNum = 1;
                            for( let i = 0; i < pos; ++i ) {
                                if( event.target.result[i] === '\n' ) {
                                    ++lineNum;
                                }
                            }
                            logError( 'eCoG', 'JSON.parse failed at line: ' + lineNum );
                        }
                        reject("JSON mode: JSON.parse() error")
                    }
                };
                reader.readAsText( file );
            });
            input.dispatchEvent( new MouseEvent('click') );
        }
    })
}
function ui_generate_and_download_pcap(){
    ui_generate()
        .then(result=>generate_and_download_pcap(result))
        .catch(msg=>logError('eCoG', msg));
}
function ui_load_to_BBA(){
    // ui_generate();
    // const generated =  generate_pcap();

    if(getElementById('ui_out_pcap').checked){
        getElementById('loadDialog_fileType').value = "pcap";
    }
    else if(getElementById('ui_out_json').checked){
        getElementById('loadDialog_fileType').value = "json";
    }

    getElementById('loadDialog_iqBitWidth').innerText = getElementById('ui_iq_bit_width').innerText;


    if(getElementById('ui_iq_comp_method_0').checked){
        getElementById('loadDialog_iqCompMeth_1').checked = true;
    }
    else if(getElementById('ui_iq_comp_method_1').checked){
        getElementById('loadDialog_iqCompMeth_2').checked = true;
    }

    for(let i = 0; i < 5; i++){
        if(getElementById('ui_max_u_'+i).checked){
            getElementById('loadDialog_maxU_'+i).checked = true;
        }
    }

    for(let i = 0; i < 5; i++){
        if(getElementById('ui_u_'+i).checked){
            getElementById('loadDialog_defaultU_'+i).checked = true;
        }
    }



    // loadDialog_file = new Blob([generated], { type: 'application/vnd.tcpdump.pcap' });
    // loadDialog_file.name = "Generated.pcap";
    // loadDialog_filePreload();
    // loadDialog_loadFile();

     ui_generate().then((result)=>{
         if(getElementById('ui_out_pcap').checked){
             loadDialog_file = [new Blob([result], { type: 'application/vnd.tcpdump.pcap' })];
             loadDialog_file[0].name = getElementById("ui_filename").value + '.pcap';
         }
         else if(getElementById('ui_out_json').checked){
             loadDialog_file = [new Blob([(new TextEncoder()).encode(result)], { type: 'application/json' })];
             loadDialog_file[0].name = getElementById("ui_filename").value + '.json';
         }
         // loadDialog_file = new Blob([result], { type: 'application/vnd.tcpdump.pcap' });
         // loadDialog_file = new Blob([result], { type: 'application/json' });
         // loadDialog_file.name = getElementById("ui_filename").value;

         loadDialog_filePreload();
         loadDialog_loadFiles();
    });

}

function SyncXMLHttpRequest(file) {
    let self = this;
    let ready = false;
    let result = '';

    const sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    self.send = async function() {
        while (ready === false) {
            await sleep(100);
        }
        return result;
    }

    let req = new XMLHttpRequest();
    req.open('GET', file);
    req.responseType = 'text';
    req.onload = function() {
        result = req.response;
        ready = true;
    }
    req.send();
}

async function ui_download_ecog() {
    let req = new XMLHttpRequest();
    req.open('GET', 'js/ecog.js');
    req.responseType = 'text';

    let source = '';
    source += 'configDefault = {generatorTab:\n' + JSON.stringify(configDefault.generatorTab) + '}\n\n';
    source += "function formatBytes(bytes) {"+
        "if (bytes === 0) return '0 Bytes';"+
        "const k = 1024;"+
        "const sizes = ['Bytes', 'KB', 'MB', 'GB'];"+
        "const i = Math.floor(Math.log(bytes) / Math.log(k));"+
        "return parseFloat((bytes / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i];}"
    let files = [ 'js/generator/ecog.js', 'js/generator/ecog_node.js' ];
    for( let i = 0; i < files.length; ++i ) {
        let req = new SyncXMLHttpRequest( files[i] );
        source += await req.send();
    }

    download( 'ecog-engine.js', source );
}

set_params_from_config();

window.onbeforeunload = function( e ) {
    get_params_from_page();
}

// ui_version.textContent = 'Version: ' + version;

ui_vlan_enable.addEventListener('click', function() { ui_vlan_id.disabled = !ui_vlan_enable.checked; });
ui_vlan_id.addEventListener('input', function() {
    ui_vlan_id.style.backgroundColor = isNaN(parseInt(ui_vlan_id.value)) ? 'red' : '';
});

ui_band.forEach(function(input) {
    input.addEventListener('change', function (e) { update_cell_limits(); });
});

ui_u.forEach(function(input) {
    input.addEventListener('change', function (e) { update_cell_limits(); });
});

ui_pbch_case.forEach(function(input) {
    input.addEventListener('change', function (e) { update_cell_limits(); });
});

ui_iq_scaling_mode.forEach( function(input) { input.addEventListener('change', ui_interface_resolution_update); } );
ui_iq_bit_width.addEventListener( 'input', ui_interface_resolution_update );
ui_iq_comp_method.forEach( function(input) { input.addEventListener('change', ui_interface_resolution_update); } );

ui_5gmax_input_file.addEventListener( 'change', function(e) {
    let file = e.target.files[0];
    if( !file ) return;
    iq_5gmax_file = file;
})

ui_type65_enable.addEventListener('click', function() { type65_update(ui_type65_enable.checked); });
ui_xirc_beta_enable.addEventListener('click', function() { xirc_beta_update(ui_xirc_beta_enable.checked); });
