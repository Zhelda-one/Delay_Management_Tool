const loadDialog = /** @type {LoadDialog} */ getElementById('loadDialog');

const loadDialog_dropArea = getElementById( 'loadDialog_dropArea' );
const loadDialog_dropArea_helperText = getElementById( 'loadDialog_dropArea_helperText' );
const loadDialog_dropArea_fileInfo = getElementById( 'loadDialog_dropArea_fileInfo' );
const loadDialog_dropArea_fileName = getElementById( 'loadDialog_dropArea_fileName' );
const loadDialog_dropArea_pmFile = getElementById( 'loadDialog_dropArea_pmFile' );
const loadDialog_fileType = getElementById( 'loadDialog_fileType' );
const loadDialog_aggregateMode = getElementById( 'loadDialog_aggregateMode' );
const loadDialog_skipIqDecoding = getElementById( 'loadDialog_skipIqDecoding' );
const loadDialog_skipTimingGeneration = getElementById( 'loadDialog_skipTimingGeneration' );
const loadDialog_pcapFilter = getElementById( 'loadDialog_pcapFilter' );
const loadDialog_loadLimitFrom = getElementById('loadDialog_loadLimitFrom')
const loadDialog_loadLimit = getElementById( 'loadDialog_loadLimit' );
const loadDialog_shift_symbols = getElementById('loadDialog_shift_symbols');
const loadDialog_shift_samples = getElementById( 'loadDialog_shift_samples' );
const loadDialog_shift_fraction = getElementById( 'loadDialog_shift_fraction' );
const loadDialog_interfaceResolution = getElementById( 'loadDialog_interfaceResolution' );
const loadDialog_powerScalingMode = document.getElementsByName( 'loadDialog_powerScalingMode' );
const loadDialog_dynamicIqComp = getElementById( 'loadDialog_dynamicIqComp' );
const loadDialog_iqBitWidth = getElementById( 'loadDialog_iqBitWidth' );
const loadDialog_iqCompMethod = getElementById('loadDialog_iqCompMeth') ;
const loadDialog_iqInterfaceResolution = document.getElementById("loadDialog_iqInterfaceResolution")
const loadDialog_swapIq = getElementById( 'loadDialog_swapIq' );
const loadDialog_timeDomain = getElementById( 'loadDialog_timeDomain' );
const loadDialog_littleEndian   = getElementById( 'loadDialog_littleEndian' );
const loadDialog_numerologyAutodetection = getElementById( 'loadDialog_numerologyAutodetection' );
const loadDialog_defaultU = document.getElementsByName( 'loadDialog_defaultU' );
const loadDialog_maxU = document.getElementsByName( 'loadDialog_maxU' );
const loadDialog_sampling = document.getElementsByName( 'loadDialog_sampling' );
const loadDialog_nprb = getElementById( 'loadDialog_nprb' );
const loadDialog_numAnt = getElementById( 'loadDialog_numAnt' );
const loadDialog_dir_row = getElementById( 'loadDialog_dir_row' );
const loadDialog_dir = getElementById( 'loadDialog_dir' );
const loadDialog_sync = document.getElementsByName( 'loadDialog_sync' );
const loadDialog_ignoreFrameId = getElementById( 'loadDialog_ignoreFrameId' );
const loadDialog_timeShift_us = getElementById( 'loadDialog_timeShift_us' );
const loadDialog_timeShift_alfa = getElementById( 'loadDialog_timeShift_alfa' );
const loadDialog_timeShift_beta = getElementById( 'loadDialog_timeShift_beta' );
const loadDialog_ntaOffset_utu = getElementById( 'loadDialog_ntaOffset_utu' );
const loadDialog_ntaOffset_tc = getElementById( 'loadDialog_ntaOffset_tc' );

const loadDialog_l2l1_autodetect = getElementById( 'loadDialog_l2l1_autodetect' );
const loadDialog_l2l1_detailed_autodetect = getElementById( 'loadDialog_l2l1_detailed_autodetect' );
const loadDialog_l2l1_version = getElementById( 'loadDialog_l2l1_version' );

const loadDialog_prachConfigurationIndex = getElementById( 'loadDialog_prachConfigurationIndex' );
const loadDialog_prachStartPrb = getElementById( 'loadDialog_prachStartPrb' );
const loadDialog_advanced_ext11bundleWeights = getElementById('loadDialog_advanced_ext11bundleWeights');

const loadDialog_pm_file_input = getElementById('loadDialog_loadPMfile');

let loadDialog_file = [];


const loadDialog_sync_row = getElementById("loadDialog_sync_row");
const loadDialog_ignoreFrameId_row = getElementById("loadDialog_ignoreFrameId_row");
const loadDialog_timeShift_row = getElementById("loadDialog_timeShift_row");
const loadDialog_timeDomain_row = getElementById("loadDialog_timeDomain_row");
const loadDialog_swapIq_row = getElementById("loadDialog_swapIq_row");
const loadDialog_skipIqDecoding_row = getElementById('loadDialog_skipIqDecoding_row');
const loadDialog_skipTimingGeneration_row = getElementById('loadDialog_skipTimingGeneration_row');
const loadDialog_littleEndian_row = getElementById("loadDialog_littleEndian_row");
const loadDialog_ntaOffset_row = getElementById("loadDialog_ntaOffset_row");
const loadDialog_iqBitWidth_row = getElementById("loadDialog_iqBitWidth_row");
const loadDialog_iqCompression_row = getElementById("loadDialog_iqCompression_row");
const loadDialog_powerScaling_row = getElementById("loadDialog_powerScaling_row");
const loadDialog_shiftSamples_row = getElementById("loadDialog_shiftSamples_row");
const loadDialog_dynamicIqComp_row = getElementById("loadDialog_dynamicIqComp_row");
const loadDialog_numerologyAutodetection_row = getElementById("loadDialog_numerologyAutodetection_row");
const loadDialog_advanced_ext11bundleWeights_row = getElementById("loadDialog_advanced_ext11bundleWeights_row");
const loadDialog_interfaceResolution_row = getElementById("loadDialog_interfaceResolution_row");
const loadDialog_l2l1_autodetect_row = getElementById("loadDialog_l2l1_autodetect_row");
const loadDialog_l2l1_detailed_autodetect_row = getElementById("loadDialog_l2l1_detailed_autodetect_row");
const loadDialog_l2l1_version_row = getElementById("loadDialog_l2l1_version_row");
const loadDialog_maxU_row = getElementById("loadDialog_maxU_row");
const loadDialog_pcapFilter_row = getElementById("loadDialog_pcapFilter_row");
const loadDialog_aggregateMode_row = getElementById("loadDialog_aggregateMode_row");
const loadDialog_numAnt_row = getElementById("loadDialog_numAnt_row");

const loadDialog_loki_type_row = getElementById('loadDialog_loki_type_row');
const loadDialog_loki_type = getElementById('loadDialog_loki_type');
const loadDialog_loki_dir_row = getElementById('loadDialog_loki_dir_row');
const loadDialog_loki_dir = getElementById('loadDialog_loki_dir');
const loadDialog_loki_platform_row = getElementById('loadDialog_loki_platform_row');
const loadDialog_loki_platform = getElementById('loadDialog_loki_platform');

const loadDialog_L1RadioSnapshot_type_row = getElementById('loadDialog_L1RadioSnapshot_type_row');

//LONER DDR4
const loadDialog_lonerType_row = getElementById('loadDialog_lonerType_row');
const loadDialog_lonerType = getElementById('loadDialog_lonerType');
const loadDialog_lonerAlignToFrame_row = getElementById('loadDialog_lonerAlignToFrame_row');
const loadDialog_lonerAlignToFrame = getElementById('loadDialog_lonerAlignToFrame');

const loadDialog_prach_time_domain_mode_checkbox = getElementById("loadDialog_prach_time_domain_mode_checkbox");
const loadDialog_prach_time_domain_mode_toHide = getElementById("loadDialog_prach_time_domain_mode_toHide");


class LoadDialog extends Dialog {

    constructor(){
        super("Load");

    }

    getFromUI() {
        config.load.fileType = loadDialog_fileType.options[loadDialog_fileType.selectedIndex].value;
        config.load.aggregateMode = loadDialog_aggregateMode.checked;
        config.load.skipIqDecoding = loadDialog_skipIqDecoding.checked;
        config.load.skipTimingGeneration = loadDialog_skipTimingGeneration.checked;
        config.load.pcapFilter = loadDialog_pcapFilter.value;
        config.load.loadLimitFrom = parseInt( loadDialog_loadLimitFrom.value );
        config.load.loadLimit = parseInt( loadDialog_loadLimit.value );
        config.load.shift_symbols = parseInt( loadDialog_shift_symbols.value ? loadDialog_shift_symbols.value : 0 );
        config.load.shift_samples = parseInt( loadDialog_shift_samples.value ? loadDialog_shift_samples.value : 0 );
        config.load.shift_fraction = parseFloat( loadDialog_shift_fraction.value ) || 0;
        getElementById('modify_sampleShift').value = config.load.shift_samples;
        config.load.iqScalingMode = get_param_radio_int( loadDialog_powerScalingMode );
        config.load.dynamicIqComp = loadDialog_dynamicIqComp.checked;
        config.load.iqBitWidth = parseInt( loadDialog_iqBitWidth.value );
        config.load.iqCompMethod = parseInt( loadDialog_iqCompMethod.value );
        config.load.swapIq = loadDialog_swapIq.checked;
        config.load.timeDomain = loadDialog_timeDomain.checked;
        config.load.littleEndian = loadDialog_littleEndian.checked;
        config.load.numerologyAutodetection = loadDialog_numerologyAutodetection.checked;
        config.load.defaultU = get_param_radio_int( loadDialog_defaultU );
        config.load.maxU = get_param_radio_int( loadDialog_maxU );
        config.load.sampling = get_param_radio_float(loadDialog_sampling);
        config.load.nprb = parseInt( loadDialog_nprb.value );
        config.load.numAnt = parseInt( loadDialog_numAnt.value );
        config.load.dir = loadDialog_dir.value;
        config.load.sync = get_param_radio(loadDialog_sync);
        config.load.ignoreFrameId = loadDialog_ignoreFrameId.checked;
        config.load.timeShift_us = parseFloat( loadDialog_timeShift_us.value );
        config.load.timeShift_alfa = parseInt( loadDialog_timeShift_alfa.value );
        config.load.timeShift_beta = parseInt( loadDialog_timeShift_beta.value );
        config.load.ntaOffset_utu = parseInt( loadDialog_ntaOffset_utu.value );
        config.load.ntaOffset_tc = parseInt( loadDialog_ntaOffset_tc.value );
        config.load.prachConfigurationIndex = parseInt( loadDialog_prachConfigurationIndex.value );
        config.load.prachStartPrb = parseInt( loadDialog_prachStartPrb.value );
        config.load.prachTD = loadDialog_prach_time_domain_mode_checkbox.checked;
        config.load.l2l1_versionAutodetect = loadDialog_l2l1_autodetect.checked;
        config.load.l2l1_detailedAutodetect = loadDialog_l2l1_detailed_autodetect.checked

        config.load.l2l1_version = loadDialog_l2l1_version.options[loadDialog_l2l1_version.selectedIndex].text;

        config.load.advanced.ext11bundleWeights = parseInt(loadDialog_advanced_ext11bundleWeights.value);

        config.load.loki.type = loadDialog_loki_type.value;
        config.load.loki.dir = loadDialog_loki_dir.value;
        config.load.loki.platform = loadDialog_loki_platform.value;

        config.load.lonerType = parseInt( loadDialog_lonerType.value );
        config.load.lonerAlignToFrame = loadDialog_lonerAlignToFrame.checked;

        config.load.DU_Port_ID = parseInt(getElementById('configDialog_DU_Port_ID_input').value);
        config.load.BandSector_ID = parseInt(getElementById('configDialog_BandSector_ID_input').value);
        config.load.CC_ID = parseInt(getElementById('configDialog_CC_ID_input').value);
        config.load.RU_Port_ID = parseInt(getElementById('configDialog_RU_Port_ID_input').value);
        config.load.Pol_ID = parseInt(getElementById('configDialog_Pol_ID_input').value);
        config.load.PRACH = parseInt(getElementById('configDialog_PRACH_input').value);
        config.load.AxC = parseInt(getElementById('configDialog_AxC_input').value);
        config.load.BWP = parseInt(getElementById('configDialog_BWP_input').value);
    }
    setToUI() {
        ui_setSelectOptionByValue( loadDialog_fileType, config.load.fileType );
        loadDialog_aggregateMode.checked = config.load.aggregateMode;
        loadDialog_skipIqDecoding.checked = config.load.skipIqDecoding;
        loadDialog_skipTimingGeneration.checked = config.load.skipTimingGeneration;
        loadDialog_pcapFilter.value = config.load.pcapFilter;
        loadDialog_loadLimitFrom.value = config.load.loadLimitFrom;
        loadDialog_loadLimit.value = config.load.loadLimit;
        set_param_radio_int( loadDialog_powerScalingMode, config.load.iqScalingMode );
        loadDialog_dynamicIqComp.checked = config.load.dynamicIqComp;
        loadDialog_iqBitWidth.disabled = config.load.dynamicIqComp;
        loadDialog_iqBitWidth.value = config.load.iqBitWidth;
        loadDialog_iqCompMethod.disabled = config.load.dynamicIqComp;
        loadDialog_iqCompMethod.value = config.load.iqCompMethod;
        loadDialog_iqInterfaceResolution.textContent = loadDialog_setToUI_interfaceResolution();
        loadDialog_numerologyAutodetection.checked = config.load.numerologyAutodetection;
        set_param_radio_int( loadDialog_defaultU, config.load.defaultU );
        set_param_radio_int( loadDialog_maxU, config.load.maxU );
        set_param_radio_int( loadDialog_sampling, config.load.sampling );
        loadDialog_nprb.value = config.load.nprb;
        loadDialog_numAnt.value = config.load.numAnt;
        loadDialog_dir.value = config.load.dir;
        set_param_radio(loadDialog_sync, config.load.sync);
        loadDialog_ignoreFrameId.checked = config.load.ignoreFrameId;
        loadDialog_timeShift_us.value = config.load.timeShift_us;
        loadDialog_timeShift_alfa.value = config.load.timeShift_alfa;
        loadDialog_timeShift_beta.value = config.load.timeShift_beta;
        loadDialog_ntaOffset_utu.value = config.load.ntaOffset_utu;
        loadDialog_ntaOffset_tc.value = config.load.ntaOffset_tc;
        loadDialog_l2l1_autodetect.checked = config.load.l2l1_versionAutodetect;
        loadDialog_l2l1_version.disabled = config.load.l2l1_versionAutodetect;
        loadDialog_l2l1_detailed_autodetect.checked = config.load.l2l1_detailedAutodetect;
        loadDialog_l2l1_detailed_autodetect_row.hidden = !loadDialog_l2l1_autodetect.checked;
        ui_setSelectOptionByValue( loadDialog_l2l1_version, config.load.l2l1_version );

        loadDialog_advanced_ext11bundleWeights.value = config.load.advanced.ext11bundleWeights;

        getElementById('configDialog_DU_Port_ID_input').value = config.load.DU_Port_ID;
        getElementById('configDialog_BandSector_ID_input').value = config.load.BandSector_ID;
        getElementById('configDialog_CC_ID_input').value = config.load.CC_ID;
        getElementById('configDialog_RU_Port_ID_input').value = config.load.RU_Port_ID;

        ui_setSelectOptionByValue( loadDialog_loki_type, config.load.loki.type );
        ui_setSelectOptionByValue( loadDialog_loki_dir, config.load.loki.dir );
        ui_setSelectOptionByValue( loadDialog_loki_platform, config.load.loki.platform );
    }

    onLoad(){
        loadDialog_fillFileTypeOptions();

        loadDialog_dropArea.addEventListener( 'click', loadDialog_dropAreaEventHandler, false );
        loadDialog_dropArea.addEventListener( 'dragenter', loadDialog_dropAreaEventHandler, false );
        loadDialog_dropArea.addEventListener( 'dragover', loadDialog_dropAreaEventHandler, false );
        loadDialog_dropArea.addEventListener( 'dragleave', loadDialog_dropAreaEventHandler, false );
        loadDialog_dropArea.addEventListener( 'drop', loadDialog_dropAreaEventHandler, false );
        loadDialog_dynamicIqComp.addEventListener( 'change', function() {
            loadDialog_iqBitWidth.disabled = this.checked;
            loadDialog_iqCompMethod.disabled = this.checked;
        });
        loadDialog_l2l1_autodetect.addEventListener( 'change', function() {
            loadDialog_l2l1_version.disabled = this.checked;
            loadDialog_l2l1_detailed_autodetect_row.hidden = !loadDialog_l2l1_autodetect.checked;
        });
        for( const l2l1_version in l2l1_versions ) {
            let opt = document.createElement( 'option' );
            opt.innerHTML = l2l1_version;
            loadDialog_l2l1_version.appendChild( opt );
        }

        loadDialog.setToUI();
        adjust_loadDialog();
    }
}
customElements.define('bba-load-dialog', LoadDialog);

function loadDialog_refresh() {
    loadDialog.getFromUI();
    loadDialog.setToUI();
}

function loadDialog_setToUI_ecpri( dynamicIqComp, iqBitWidth, iqCompMethod ) {
    loadDialog_dynamicIqComp.checked = dynamicIqComp;
    loadDialog_iqBitWidth.disabled = dynamicIqComp;
    loadDialog_iqCompMethod.disabled = dynamicIqComp;
    if( !dynamicIqComp ) {
        loadDialog_iqBitWidth.value = iqBitWidth;
        loadDialog_iqCompMethod.value = iqCompMethod;
    }
}

function loadDialog_setToUI_interfaceResolution() {
    const maxValsUnits = '[-' + iq_getMaxValue(config.load.iqCompMethod, config.load.iqBitWidth, config.load.iqScalingMode) +
        '; ' + iq_getMaxValue(config.load.iqCompMethod, config.load.iqBitWidth, config.load.iqScalingMode) + ']'
    const maxValsDbfs = '[' + (20*Math.log10(1 / iq_getMaxValue(config.load.iqCompMethod, config.load.iqBitWidth, config.load.iqScalingMode))).toFixed(2) + ' dBFS; 0 dBFS]'
    return maxValsUnits + ' ' + maxValsDbfs;
}

async function loadDialog_filePreload() {

    let reader = new FileReader();
    let fileType;
    reader.onload = function( e ) {
        if (loadDialog_file[loadDialog_file.length-1].name.match(/\.ims2$/)) {
            let reader = new FileReader()
            reader.readAsArrayBuffer(loadDialog_file[loadDialog_file.length-1]);
            reader.onload = function (event) {
                ims2.file_getter__ims2(new Uint8Array(e.target.result));
            };
            return;
        }

        if(loadDialog_file.length >= 1){
            if(loadDialog_file.length === 1) config.load.file_index = 0;

            getElementById('loadDialog_filesList_tr').hidden = false;
            let addedOption = false;
            for(let i = 0; i < loadDialog_file.length; i++){
                if(!loadDialog_file[i].isIncluded){
                    getElementById('loadDialog_filesList').innerHTML += `<option>${loadDialog_file[i].name}</option>`;
                    loadDialog_file[i].isIncluded = true;
                    loadDialog_file[i].file = e.target.result;
                    addedOption = true;
                }
            }
            if(addedOption){
                getElementById('loadDialog_filesList').childNodes[getElementById('loadDialog_filesList').childNodes.length-1].selected = true;
                config.load.file_index = loadDialog_file.length-1;
            }
            else{
                for(let i = 0; i < loadDialog_file.length; i++){
                    if(loadDialog_file[i].name === getElementById('loadDialog_filesList').value){
                        config.load.file_index = i;
                    }
                }
            }
        }

        loadDialog_dropArea_helperText.hidden = true;
        loadDialog_dropArea_fileInfo.hidden = false;
        loadDialog_dropArea_fileName.innerHTML =  `File name: ${ loadDialog_file[config.load.file_index].name }<br>Size: ${ formatBytes( loadDialog_file[config.load.file_index].size ) }`;

        fileType = filePreload( loadDialog_file[config.load.file_index].file );
        loadDialog_dropArea_fileName.innerHTML += `<br>File type: ${ fileType }`;
        if( fileType !== null ) ui_setSelectOptionByValue( loadDialog_fileType, fileType );

        const fileFormat = g_fileFormats[fileType];

        if( fileFormat !== undefined && isPacketFileType( fileFormat ) && ecpri_isUPlanePresent ) {
            loadDialog_dropArea_fileName.innerHTML += '<br>eCPRI compression: ';
            if( ecpri_discoveredConfigs.length === 0 ) {
                loadDialog_dropArea_fileName.innerHTML += "can't discover";
            } else if( ecpri_discoveredConfigs.length === 1 ) {
                if( ecpri_discoveredConfigs[0].dynamicIqComp ) {
                    loadDialog_dropArea_fileName.innerHTML += 'dynamic compression';
                } else {
                    loadDialog_dropArea_fileName.innerHTML += `${ ecpri_discoveredConfigs[0].iqBitWidth }-bit `;
                    switch( ecpri_discoveredConfigs[0].iqCompMethod ) {
                        case 0: loadDialog_dropArea_fileName.innerHTML += 'uncompressed'; break;
                        case 1: loadDialog_dropArea_fileName.innerHTML += 'BFP'; break;
                        case 2: loadDialog_dropArea_fileName.innerHTML += 'block scaling'; break;
                        case 3: loadDialog_dropArea_fileName.innerHTML += '&micro;-law'; break;
                        case 4: loadDialog_dropArea_fileName.innerHTML += 'modulation'; break;
                        case 5: loadDialog_dropArea_fileName.innerHTML += 'BFP + selective RE'; break;
                        case 6: loadDialog_dropArea_fileName.innerHTML += 'modulation + selective RE'; break;
                    }
                }
                loadDialog_setToUI_ecpri( ecpri_discoveredConfigs[0].dynamicIqComp, ecpri_discoveredConfigs[0].iqBitWidth, ecpri_discoveredConfigs[0].iqCompMethod );
            } else {
                loadDialog_dropArea_fileName.innerHTML += 'multiple combinations, check logs';
            }
        }
        adjust_loadDialog();
    };

    reader.readAsArrayBuffer( loadDialog_file[loadDialog_file.length-1].size > 1000000 && !(loadDialog_file[loadDialog_file.length-1].name.endsWith('json') || loadDialog_file[loadDialog_file.length-1].name.match(/\.ims2$/)) ? loadDialog_file[loadDialog_file.length-1].slice( 0, 1000000 ) : loadDialog_file[loadDialog_file.length-1] );
    // reader.readAsArrayBuffer( loadDialog_file );
    loadDialog_pm_file_input.disabled = false;
    while( reader.readyState !== FileReader.DONE ) await sleep( 1 );
}

function loadDialog_fileListChange(){
    const selectedFile = getElementById('loadDialog_filesList').value;
    for(let i = 0; i < loadDialog_file.length; i++){
        if(loadDialog_file[i].name === selectedFile){
            config.load.file_index = i;
        }
    }
    loadDialog_filePreload();
}

function loadDialog_dropAreaEventHandler( e ) {
    e.preventDefault();
    e.stopPropagation();

    switch( e.type ) {
        case 'dragenter': loadDialog_dropArea.classList.add( 'highlight' ); break;
        case 'dragover': loadDialog_dropArea.classList.add( 'highlight' ); break;
        case 'dragleave': loadDialog_dropArea.classList.remove( 'highlight' ); break;
        case 'click':
            let input = document.createElement( 'input' );
            input.type = 'file';
            input.onchange = e => {
                if( e.target.files.length ) {
                    loadDialog_file.push(...e.target.files);
                    loadDialog_filePreload();
                }
            }
            input.click();
            break;
        case 'drop':
            loadDialog_dropArea.classList.remove( 'highlight' );
            if( e.dataTransfer.files.length ) {
                loadDialog_file.push(...e.dataTransfer.files);
                loadDialog_filePreload();
            }
            break;
    }
}

function loadDialog_saveConfig() {
    // TODO: get All
    loadDialog.getFromUI();
    configDialog.getFromUI();
    saveDialog.getFromUI();
    analyzeDialog.getFromUI();
    let date = new Date();
    download('bba_cfg_' +
        date.getFullYear() + '_' +
        (date.getMonth() + 1) + '_' +
        date.getDate() +
        '.json', JSON.stringify(config, null, 2));
}

function loadDialog_loadConfig() {
    let input = document.createElement( 'input' );
    input.type = 'file';
    input.addEventListener( 'change', function(e) {
        let file = e.target.files[0];
        if( !file ) { return; }
        let reader = new FileReader();
        reader.onload = function( event ) {
            try {
                config = { ...config, ...JSON.parse( event.target.result ) };
                // TODO: set All
                loadDialog.setToUI()
                configDialog.setToUI()
                saveDialog.setToUI()
                analyzeDialog.setToUI();
            } catch( e ) {
                logError( 'Load', e );
                const posArr = e.toString().match( /\d+/g );
                if( posArr.length ) {
                    const pos = parseInt( posArr[posArr.length - 1] );
                    let lineNum = 1;
                    for( let i = 0; i < pos; ++i ) {
                        if( event.target.result[i] === '\n' ) {
                            ++lineNum;
                        }
                    }
                    logError( 'Load', `JSON.parse failed at line: ${lineNum}` );
                }
            }
        };
        reader.readAsText( file );
    });
    input.dispatchEvent( new MouseEvent('click') );
}

function loadDialog_loadPmFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml'
    input.addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            try {
                loadDialog_dropArea_pmFile.innerHTML = '';
                let xmlString = event.target.result;
                let parser = new DOMParser();
                let pm_file = parser.parseFromString(xmlString, "text/xml");

                pm_file_decode(pm_file);
                analyze_pe_codes();
                isPmFileLoaded = true;
                loadDialog_dropArea_pmFile.innerHTML = `<br><br>PM file name: ${ file.name }<br>Size: ${formatBytes(file.size)}<br>File type: ${ file.type }`;
            } catch (e) {
                logError('Load', e);
                const posArr = e.toString().match(/\d+/g);
                if (posArr.length) {
                    const pos = parseInt(posArr[posArr.length - 1]);
                    let lineNum = 1;
                    for (let i = 0; i < pos; ++i) {
                        if (event.target.result[i] === '\n') {
                            ++lineNum;
                        }
                    }
                    logError('Load', `PM file parsing failed at line: ${lineNum}`);
                }
            }
        };
        reader.readAsText(file);
    });
    input.dispatchEvent(new MouseEvent('click'));
}
async function loadDialog_loadFiles() {
    loadDialog.getFromUI();
    if(config.load.aggregateMode){
        for( let i = 0; i < loadDialog_file.length; i++ ) {
            if(loadDialog_file[i].isLoaded !== undefined && loadDialog_file.length > 1) continue;
            loadDialog_file[i].isLoaded = true;
            loadDialog_loadFile(loadDialog_file[i]);
        }
    }
    else if(!config.load.aggregateMode && loadDialog_file.length > 0){
        loadDialog_loadFile(loadDialog_file[config.load.file_index]);
        loadDialog_file[0].isLoaded = true;
    }

    if(loadDialog_file.length === 0) {
        document.getElementById("loadDialog_dropArea").style.backgroundColor = "#f8f87c";
        setTimeout(function () {
            document.getElementById("loadDialog_dropArea").style.backgroundColor = "#feffec";
        }, 200);
    }

    if(config.cell.appliedArfcn != 0){ //Next file is loaded without reloading BBA, arfcn must be set to 0 to avoid malfunctions
        config.cell.appliedArfcn = 0;
        configDialog.setToUI();
    }

}

function loadDialog_loadFile(file){
    loader_toggle();
    let reader = new FileReader();
    display_file_name();

    const fileFormat = g_fileFormats[config.load.fileType];
    if(fileFormat === undefined) throw new Error("Unknown file format");

    if (file.size < 10_000_000 || fileFormat.dataFormat === Enum_DataFormat.TEXT) {
        reader.onload = async function (e) {
            captureFileContents = new Uint8Array(e.target.result);
            if (loadFile(e.target.result, fileFormat)) {
                openLoadedFileInPacketsTab()
            }
        };

        if(fileFormat.dataFormat === Enum_DataFormat.BINARY)
            reader.readAsArrayBuffer( file );
        else
            reader.readAsText( file );

    }
    else{
        const totalFileSize = file.size;
        const chunkSize = 50_000_000; // 50MB
        let currentOffset = 0;

        const fileData = new Uint8Array(totalFileSize);

        reader.onload = async function (e) {
            const result = new Uint8Array(e.target.result);
            fileData.set(result, currentOffset);
            currentOffset += result.length;

            if (currentOffset >= totalFileSize) {
                captureFileContents = new Uint8Array(fileData.buffer);

                if (loadFile(fileData.buffer, fileFormat)) {
                    openLoadedFileInPacketsTab();
                }

                return;
            }

            const bytesLeft = totalFileSize - currentOffset;
            const numToRead = Math.min(chunkSize, bytesLeft);

            readOneChunk(numToRead);
        };

        function readOneChunk(size) {
            const blob = file.slice(currentOffset, currentOffset + size);
            reader.readAsArrayBuffer(blob);
        }

        readOneChunk(chunkSize);
    }
}

function openLoadedFileInPacketsTab() {
    loadDialog.close();
    loader_toggle();
    if (packetsLength === 0) {
        getElementById('no_packets').style.display = 'block';
    } else {
        getElementById('no_packets').style.display = 'none';
    }
    //if( packetsLength !== packetsLengthOld ) packetTable_someFunc(); //[Watch out] packetsLengthOld seems to always be zero
    packetTable_someFunc();
    iqTab_loadIqBuffer();
    if (activeTab === 0 || activeTab === 3) change_tab(packetsLength === packetsLengthOld ? 2 : 1);
    logDialog_add_current_file();
}

function loadDialog_fillFileTypeOptions(){
    let appendParent = loadDialog_fileType;
    for(const displayOption of g_fileDisplayOptions){
        if(displayOption instanceof FileFormatInfo){
            const option = document.createElement("option");
            option.value = displayOption.id;
            option.textContent = displayOption.name;

            appendParent.appendChild(option);
        } else if(displayOption instanceof OptionSpacing){
            const optgroup = document.createElement("optgroup");
            optgroup.label = displayOption.text;

            loadDialog_fileType.appendChild(optgroup);
            appendParent = optgroup;
        }
    }
}

function adjust_loadDialog(){

    //Table of ids that we want to hide/show while selecting various file types
    const allIds = [
        loadDialog_sync_row, loadDialog_ignoreFrameId_row, loadDialog_timeShift_row, loadDialog_dir_row,
        loadDialog_timeDomain_row, loadDialog_swapIq_row, loadDialog_skipIqDecoding_row, loadDialog_skipTimingGeneration_row, loadDialog_littleEndian_row, loadDialog_ntaOffset_row,
        loadDialog_iqBitWidth_row, loadDialog_iqCompression_row, loadDialog_powerScaling_row, loadDialog_dynamicIqComp_row,
        loadDialog_numerologyAutodetection_row, loadDialog_advanced_ext11bundleWeights_row,
        loadDialog_interfaceResolution_row,loadDialog_l2l1_autodetect_row,loadDialog_l2l1_version_row, loadDialog_maxU_row, loadDialog_pcapFilter_row,
        loadDialog_loki_type_row, loadDialog_loki_dir_row, loadDialog_loki_platform_row, loadDialog_shiftSamples_row, loadDialog_aggregateMode_row, loadDialog_numAnt_row, loadDialog_L1RadioSnapshot_type_row,
        loadDialog_lonerType_row,loadDialog_lonerAlignToFrame_row];


    //The ids that we want to show while selecting file types
    const visible = {
        pcap: [loadDialog_sync_row, loadDialog_ignoreFrameId_row, loadDialog_timeShift_row, loadDialog_skipIqDecoding_row, loadDialog_skipTimingGeneration_row, loadDialog_ntaOffset_row, loadDialog_iqBitWidth_row, loadDialog_iqCompression_row, loadDialog_powerScaling_row, loadDialog_dynamicIqComp_row,loadDialog_numerologyAutodetection_row, loadDialog_advanced_ext11bundleWeights_row,loadDialog_interfaceResolution_row,loadDialog_l2l1_autodetect_row,loadDialog_l2l1_version_row, loadDialog_maxU_row, loadDialog_pcapFilter_row,loadDialog_aggregateMode_row],
        pcapng: [loadDialog_sync_row, loadDialog_ignoreFrameId_row, loadDialog_timeShift_row, loadDialog_skipIqDecoding_row, loadDialog_skipTimingGeneration_row, loadDialog_ntaOffset_row, loadDialog_iqBitWidth_row, loadDialog_iqCompression_row, loadDialog_powerScaling_row, loadDialog_dynamicIqComp_row,loadDialog_numerologyAutodetection_row, loadDialog_advanced_ext11bundleWeights_row,loadDialog_interfaceResolution_row,loadDialog_l2l1_autodetect_row,loadDialog_l2l1_version_row, loadDialog_maxU_row, loadDialog_pcapFilter_row,loadDialog_aggregateMode_row],
        json: [loadDialog_sync_row, loadDialog_ignoreFrameId_row, loadDialog_timeShift_row, loadDialog_dir_row, loadDialog_ntaOffset_row, loadDialog_numerologyAutodetection_row, loadDialog_advanced_ext11bundleWeights_row,loadDialog_interfaceResolution_row,loadDialog_l2l1_autodetect_row,loadDialog_l2l1_version_row, loadDialog_maxU_row, loadDialog_pcapFilter_row],
        bin_16: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_swapIq_row, loadDialog_littleEndian_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row, loadDialog_numAnt_row],
        float_32: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_shiftSamples_row, loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        csv: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_swapIq_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        rtg_iphy: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        iqfp: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_swapIq_row, loadDialog_littleEndian_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        hex: [loadDialog_dir_row, loadDialog_timeDomain_row, loadDialog_swapIq_row, loadDialog_littleEndian_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        madehex : [loadDialog_dir_row, loadDialog_shiftSamples_row,loadDialog_aggregateMode_row,loadDialog_numAnt_row],
        loki: [loadDialog_iqBitWidth_row, loadDialog_iqCompression_row, loadDialog_loki_type_row, loadDialog_loki_dir_row, loadDialog_loki_platform_row,loadDialog_skipIqDecoding_row, loadDialog_skipTimingGeneration_row,loadDialog_powerScaling_row, loadDialog_numerologyAutodetection_row,loadDialog_aggregateMode_row],
        raw_cpri: [loadDialog_dir_row],
        l1radio: [loadDialog_L1RadioSnapshot_type_row],
        lonerDDR4 : [loadDialog_lonerType_row, loadDialog_lonerAlignToFrame_row],
        testType: [loadDialog_sync_row, loadDialog_ignoreFrameId_row, loadDialog_timeShift_row, loadDialog_dir_row, loadDialog_skipIqDecoding_row, loadDialog_skipTimingGeneration_row, loadDialog_ntaOffset_row, loadDialog_iqBitWidth_row, loadDialog_iqCompression_row, loadDialog_powerScaling_row, loadDialog_dynamicIqComp_row,loadDialog_numerologyAutodetection_row, loadDialog_advanced_ext11bundleWeights_row,loadDialog_interfaceResolution_row,loadDialog_l2l1_autodetect_row,loadDialog_l2l1_version_row, loadDialog_maxU_row, loadDialog_pcapFilter_row,loadDialog_aggregateMode_row],
    }

    for(let i = 0; i < allIds.length; i++){
        allIds[i].hidden = !visible[loadDialog_fileType.value].includes(allIds[i]);
    }
}

function adjust_loadDialog_timeShift() {
    let alpha = parseInt(loadDialog_timeShift_alfa.value) || 0
    let beta = parseInt(loadDialog_timeShift_beta.value) || 0
    if (alpha < 0) alpha = 0
    if (alpha > 12287999) alpha = 12287999
    if (beta < -32768) beta = -32768
    if (beta > 32767) beta = 32767
    loadDialog_timeShift_alfa.value = alpha
    loadDialog_timeShift_beta.value = beta
    loadDialog_timeShift_us.value = alpha / 1228.8 + beta * 10000
}

loadDialog_timeShift_us.onchange = function (e) {
    let v = parseFloat(e.target.value) || 0
    if (v > 32767999) v = 32767999
    if (v < -32768000) v = -32768000
    loadDialog_timeShift_alfa.value = Math.floor((((v % 10000) + 10000) % 10000) * 1228.8);
    loadDialog_timeShift_beta.value = Math.floor((v / 10000))
}
loadDialog_timeShift_alfa.onchange = adjust_loadDialog_timeShift
loadDialog_timeShift_beta.onchange = adjust_loadDialog_timeShift

function adjust_loadDialog_ntaOffset(u) {
    switch (u) {
        case 1:
            loadDialog_ntaOffset_utu.value = 16000
            loadDialog_ntaOffset_tc.value = 25600
            break;
        case 3:
            loadDialog_ntaOffset_utu.value = 8620
            loadDialog_ntaOffset_tc.value = 13792
            break;
        case 0:
        case 2:
        case 4:
        case -1:
            loadDialog_ntaOffset_utu.value = 0
            loadDialog_ntaOffset_tc.value = 0
            break;
    }
}

loadDialog_ntaOffset_utu.onchange = function (e) {
    loadDialog_ntaOffset_tc.value = loadDialog_ntaOffset_utu.value * 8 / 5
}

loadDialog_ntaOffset_tc.onchange = function (e) {
    loadDialog_ntaOffset_utu.value = loadDialog_ntaOffset_tc.value * 5 / 8
}