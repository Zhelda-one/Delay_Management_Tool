const isBrowser = true;
const isNode = false;

const root_header = getElementById( 'root_header' );
const root_header_menu = document.getElementsByName( 'root_header_menu' );
const root_header_file_name = getElementById( 'root_header_file_name' );
const root_body = getElementById( 'root_body' );

const root_header_logStats = getElementById( 'root_header_logStats' );
const root_header_logStatsSpans = root_header_logStats.getElementsByTagName( 'span' );

const tabs = [
    getElementById( 'mainTab' ),
    getElementById( 'packetsTab' ),
    getElementById( 'iqTab' ),
    getElementById( 'generatorTab' ),
    getElementById( 'tab5GMax' )
];

const mainTab_version = getElementById( 'mainTab_version' );
const mainTab_updatedAt = getElementById( 'mainTab_updatedAt' );
const mainTab_newFeatures = getElementById('newFeatures_list');
const mainTab_bugFixes = getElementById('bugFixes_list');

let activeTab = 0;

let window_onResizeTimeout;
let window_onResize_isTabResized = new Array( tabs.length ).fill( false );

let userId = ( Math.random() * 0xFFFFFFFF ) >>> 0;

const newFeatures = new Set();
const bugFixes = new Set();

let loaded_files_counter = 1;

function getElementById(id){
    const elem = document.getElementById(id);
    if(elem === null){
        throw new Error(`Element with ID "${id}" does not exist in the DOM`);
    }
    return elem;
}

function makeLikeHrefOnClick( text, onClickFunc ) {
    return `<span class="like_href" onclick="${ onClickFunc }">${ text }</span>`
}

function ui_setSelectOptionByValue( select, option ) {
    for( let i = 0; i < select.options.length; ++i ) {
        if( select.options[i].value === option ) {
            select.selectedIndex = i;
            break;
        }
    }
}

function ui_setSelectOptionByText( select, option ) {
    for( let i = 0; i < select.options.length; ++i ) {
        if( select.options[i].text === option ) {
            select.selectedIndex = i;
            break;
        }
    }
}

function get_param_radio( param ) { for( const elem of param ) { if( elem.checked ) return elem.value; } }
function get_param_radio_int( param ) { return parseInt( get_param_radio( param ) ); }
function get_param_radio_float( param ) { return parseFloat( get_param_radio( param ) ); }

function set_param_radio( param, value ) { for( const elem of param ) { if( elem.value === value ) elem.checked = true; } }
function set_param_radio_int( param, value ) { set_param_radio( param, value.toString() ); }

function change_tab( tabIdx ) {
    if( activeTab !== tabIdx ) {
        tabs[activeTab].hidden = true;
        tabs[tabIdx].hidden = false;
        activeTab = parseInt( tabIdx );
        root_header_menu[tabIdx].checked = true;
        tab_onResize();
    }
    heatmapToolbar_toggle();
}

function downloadFile( filename, data ) {
    let a = document.createElement( 'a' );
    a.download = filename;
    a.href = URL.createObjectURL( new Blob( [data], { type:'application/octet-binary' } ) );
    a.style.display = 'none';

    document.body.appendChild( a );
    a.click();
    document.body.removeChild( a );
}

function applySettings() {
    packetsTab_applySettings();
}

function configMerge( target, source ) {
    for( const key in target ) {
        if( !target.hasOwnProperty( key ) ) continue;
        if( source.hasOwnProperty( key ) && typeof target[key] === typeof source[key] ) {
            if( typeof target[key] === 'object' ) {
                if( Array.isArray( target[key] ) ) {
                    if( Array.isArray( source[key] ) ) {
                        if( target[key].length !== 0 && typeof target[key][0] === 'object' ) {
                            for( let i = 0; i < Math.min( target[key].length, source[key].length ); ++i ) {
                                configMerge( target[key][i], source[key][i] );
                            }
                            for( let i = target[key].length; i < source[key].length; ++i ) {
                                target[key].push( source[key][i] );
                            }
                        } else {
                            target[key] = source[key];
                        }
                    }
                } else if( target[key] !== null ) {
                    configMerge( target[key], source[key] );
                } else {
                    target[key] = source[key];
                }
            } else {
                target[key] = source[key];
            }
        }
    }

}

function loadConfigAndUserIdFromLocalStorage() {
    const configStr = localStorage.getItem("config");

    if (configStr) {
        const storedConfig = JSON.parse(configStr);
        if(storedConfig.configVersion === config.configVersion) {
            configMerge(config, storedConfig);
        }
        else {
            localStorage.removeItem("config");
        }
    }

    if(Object.keys(config).includes("configDialog_moreChannels")){
        config["configDialog_moreChannels"] = false;
    }
    if(config.cell && Object.keys(config.cell).includes("appliedArfcn")){
        config.cell["appliedArfcn"] = 0;
    }

    const userIdStr = localStorage.getItem("userId");
    if (userIdStr) {
        userId = parseInt(userIdStr);
    }
}

function window_onLoad() {
    redirectToCorrectLink();
    loadConfigAndUserIdFromLocalStorage();

    applySettings();

    for( const e of root_header_menu ) {
        e.onchange = function() { change_tab( parseInt( e.value ) ); }
    }

    mainTab_version.textContent = version;
    mainTab_updatedAt.textContent = updatedAt;

    // tabs[0].addEventListener( 'dragenter', mainTab_dropAreaEventHandler, false );
    // tabs[0].addEventListener( 'dragover', mainTab_dropAreaEventHandler, false );
    // tabs[0].addEventListener( 'dragleave', mainTab_dropAreaEventHandler, false );
    // tabs[0].addEventListener( 'drop', mainTab_dropAreaEventHandler, false );

    // get all Dialog elements and call onLoad
    for(const dialog of g_Dialogs.values()){
        dialog.onLoad();
    }

    packetsTab_onLoad();
    iqTab_onLoad();

    window_onResize();

    loadDialog.open();

    loader_toggle();

    printMemoryStats();

    if( config.fileAutoload_enabled && config.fileAutoload_filePath === "generator" ){
        ui_load_to_BBA();
    }
    else if( config.fileAutoload_enabled && config.fileAutoload_filePath ) {
        getFileFromHttpRequest(config.fileAutoload_filePath);
    }


    const broadcastChannel = new BroadcastChannel("bba_load");
    broadcastChannel.addEventListener("message", e => {
        getFileFromHttpRequest(e.data);
    });

    // if <iframe> cannot load its contents, it will not trigger window's "load" event
    // one way to avoid this is to apply the source URL after the page has loaded
    getElementById("MsFormsQuestionaireIframe").src =
        "https://forms.office.com/Pages/ResponsePage.aspx?id=URdHXXWWjUKRe3D0T5YwsLW4zwJ5GRtHn7KHc_qnbuBURUNWWE9aVkhENjk4NjJIUFRFRDBDWEpXQS4u&embed=true";

    statistics.statistics_save_new_session();
}

function getFileFromHttpRequest(path){
    let req = new XMLHttpRequest();
    req.open( 'GET', path );
    req.responseType = 'arraybuffer';
    req.onload = async function() {
        if (req.status >= 400) {
            return;
        }

        if( req.response ) {
            if(config.load.fileType !== "json"){
                loadDialog_file = [new Blob( [ req.response ], { type: 'application/vnd.tcpdump.pcap' } )];
            }
            else{
                loadDialog_file = [new Blob( [ req.response ], { type: 'application/json' } )];
            }

            loadDialog_file[0].name = path;
            await loadDialog_filePreload();
            await loadDialog_loadFiles();
        }
    };
    req.send();
}

function tab_onResize() {
    if( !window_onResize_isTabResized[activeTab] ) {
        switch( activeTab ) {
            case 1: packetsTab_onResize(); break;
            case 2: iqTab_onResize(); break;
        }
        window_onResize_isTabResized[activeTab] = true;
    }
}

function window_onResize() {
    window_onResizeTimeout = 0;

    root_body.style.maxHeight = `${ window.innerHeight - 10 - root_header.offsetHeight }px`;

    window_onResize_isTabResized.fill( false );
    tab_onResize();
}

function window_onResizeEvent() {
    if( !window_onResizeTimeout ) window_onResizeTimeout = setTimeout( window_onResize, 50 );
}

function window_onUnload() {
    saveConfigToLocalStorage();
    localStorage.setItem("userId", userId.toString());

    resetGlobals();
}

function window_dropAreaEventHandler( e ) {
    e.preventDefault();
    e.stopPropagation();

    switch( e.type ) {
        case 'drop':
            if( e.dataTransfer.files.length ) {
                loadDialog_file.push(...e.dataTransfer.files);
                loadDialog_filePreload();
                loadDialog.open();
            }
            break;
    }
}

window.addEventListener( 'load', window_onLoad );
window.addEventListener( 'resize', window_onResizeEvent );
window.addEventListener( 'unload', window_onUnload );
window.addEventListener( 'dragenter', window_dropAreaEventHandler, false );
window.addEventListener( 'dragover', window_dropAreaEventHandler, false );
window.addEventListener( 'dragleave', window_dropAreaEventHandler, false );

window.addEventListener( 'drop', window_dropAreaEventHandler, false );

document.addEventListener( 'visibilitychange', function() {
    if( document.visibilityState === 'hidden' ) {
        const statsData = {
            userId: userId,
            userAgent: navigator.userAgent,
            screen: `${ window.screen.width }x${ window.screen.height }`
        };
        // if( location.hostname !== 'localhost' ) navigator.sendBeacon( '/bba/stats', JSON.stringify( statsData ));
    }
} );

function getFreqFromArfcn(arfcn){
    let nr_frequency = 0;
    if (arfcn < 600000) {
        nr_frequency = Math.floor(5 * arfcn);
    } else if (600000 <= arfcn < 2016667) {
        nr_frequency = Math.floor(3000000 + 15 * (arfcn - 600000))
    } else if (2016667 <= arfcn < 3279165) {
        nr_frequency = Math.floor(24250080 + 60 * (arfcn - 2016667))
    }
    return nr_frequency;
}

function phase_distortion(carrier_freq){
    const sampling =config.load.sampling*1000000;
    for(let u in iqBuffers){
        for(let antId in iqBuffers[u]){
            const nprb = 12*get_nPrb(u, sampling);
            const num_sym = (iqBuffers[u][antId].length/2) / nprb;

            const scaling = 64/(1<<u);
            const Ncp      =  (144*scaling)/16;
            const sr_factor = Math.round( sampling/7680000 );
            const cp_map = ones( 7*(1<<u), Ncp * sr_factor/16  );
            cp_map[0] = (Ncp+64) * sr_factor/16;
            const fft_size = Math.round(8192/(1<<u)* sr_factor/16);

            const rot_per_sample_in_rad = 2*Math.PI*carrier_freq/(15000*(1<<u)*fft_size);

            let ticks  = [];   /* store ticks position for debug use */
            let phases = [];
            let t0     = cp_map[0];

            for( let i= 0; i<cp_map.length; i++) {
                ticks[i] = t0;
                phases[i]= t0*rot_per_sample_in_rad;
                t0      += cp_map[i+1] + fft_size; /* phase is aligned with first symbol AFTER its CP */
            }

            /* Apply adjustement to frequency domain data */
            for( let sym=0; sym<num_sym; sym++) {
                const phase = phases[sym%phases.length]; /* Todo: add support to symbol_shift */
                const ai = Math.cos(phase), aq=Math.sin(phase);
                let index = sym*nprb * 2;

                for( let i=0; i<nprb; i++) {
                    const vi = iqBuffers[u][antId][index];
                    const vq = iqBuffers[u][antId][index+1];
                    iqBuffers[u][antId][index] = vi*ai - vq*aq;
                    iqBuffers[u][antId][index+1] = vi*aq + vq*ai;
                    index+=2;
                }
            }

            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];
        }
    }

    iqTab_loadIqBuffer();
}

function saveConfigToLocalStorage() {
    localStorage.setItem("config", JSON.stringify(config));
}

function l2l1_loadScript(version) {
    const l2l1script = document.getElementById('l2l1script');
    if (l2l1script) {
        document.body.removeChild(l2l1script);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `js/l2l1/${version}.js`, false); // Synchronous request
    xhr.send();

    if (xhr.status === 200) {
        const script = document.createElement('script');
        script.id = 'l2l1script';
        script.async = false;
        script.textContent = xhr.responseText;
        document.body.appendChild(script);

        logInfo('L2L1', `Loaded ${version} version`);
        ui_setSelectOptionByValue(loadDialog_l2l1_version, config.load.l2l1_version);
    } else {
        logError('L2L1', `Failed to load ${version} version`);
    }
}

// function mainTab_dropAreaEventHandler( e ) {
//     console.log("mainTab_dropAreaEventHandler");
//     e.preventDefault();
//     e.stopPropagation();

//     switch( e.type ) {
//         // case 'dragenter': tabs[0].classList.add( 'dropFile' ); break;
//         // case 'dragover': tabs[0].classList.add( 'dropFile' ); break;
//         // case 'dragleave': tabs[0].classList.remove( 'dropFile' ); break;
//         case 'drop':
//             // tabs[0].classList.remove( 'dropFile' );
//             loadDialog.open();
//             if( e.dataTransfer.files.length ) {
//                 loadDialog_file = e.dataTransfer.files[0];
//                 loadDialog_filePreload();
//             }
//             break;
//     }
// }

function openWhatsNewDialog() {
    if(newFeatures.size === 0 || bugFixes.size === 0) {
        getWhatsNewInfo()
    }
    getElementById('hide_foreground').classList.toggle('show');
    getElementById('whatsNewPopup').classList.toggle('show');
}

function hideMainTabPopup() {
    if(getElementById('whatsNewPopup').classList.contains('show')) {
        getElementById('whatsNewPopup').classList.toggle('show');
    }
    if(getElementById('changelogPopup').classList.contains('show')) {
        getElementById('changelogPopup').classList.toggle('show');
    }
    getElementById('hide_foreground').classList.toggle('show');
}

function getWhatsNewInfo() {
    let featureMessages = commitsMessages;
    let bugsMessages = commitsMessages;

    if(newFeatures.size === 0) {
        while (featureMessages.includes('[F]')) {
            let featureMessage = '';

            const featureStart = featureMessages.indexOf('[F]') + 3;
            featureMessage = featureMessages.substring(featureMessages.indexOf('[F]'));
            const featureEnd = featureMessages.indexOf('[F]') + featureMessage.indexOf('.');

            newFeatures.add(featureMessages.substring(featureStart, featureEnd).trim())
            featureMessages = featureMessages.substring(featureEnd+1);
        }

        for (let feature of newFeatures) {
            mainTab_newFeatures.innerHTML += '<li class="change">' +feature+ '</li>'
        }
    }
    if(bugFixes.size === 0) {
        while(bugsMessages.includes('[BF]')) {
            let bugFixMessage = '';

            const bugFixStart = bugsMessages.indexOf('[BF]') + 4;
            bugFixMessage = bugsMessages.substring(bugsMessages.indexOf('[BF]'));
            const bugFixEnd = bugsMessages.indexOf('[BF]') + bugFixMessage.indexOf('.');

            bugFixes.add(bugsMessages.substring(bugFixStart, bugFixEnd).trim())
            bugsMessages = bugsMessages.substring(bugFixEnd+1);
        }

        for (let fix of bugFixes) {
            mainTab_bugFixes.innerHTML += '<li class="change">' +fix+ '</li>'
        }
    }
}

loadDialog_prach_time_domain_mode_checkbox.addEventListener("change", (p) => {
    loadDialog_prach_time_domain_mode_toHide.hidden = !loadDialog_prach_time_domain_mode_checkbox.checked;
})

function loader_toggle() {
    if (getElementById("loader_bgr").style.visibility !== "hidden") {
        getElementById("loader_bgr").style.visibility = "hidden";
        getElementById("loader").style.visibility = "hidden";
    } else {
        getElementById("loader_bgr").style.visibility = "visible";
        getElementById("loader").style.visibility = "visible";
    }
}

function display_file_name() {

    root_header_file_name.title += `\u000d${loaded_files_counter}. ${loadDialog_file[loadDialog_file.length-1].name}`;

    if (config.load.aggregateMode) {
        if (loaded_files_counter <= 3)
            root_header_file_name.innerHTML += `${loaded_files_counter}. ${loadDialog_file[loadDialog_file.length-1].name}<br>`;
        else if (loaded_files_counter === 4) {
            root_header_file_name.innerHTML += `Hover over to see more...`;
        }
    } else {
        loaded_files_counter = 1;
        root_header_file_name.title = `Loaded files:\u000d${loaded_files_counter}. ${loadDialog_file[loadDialog_file.length-1].name}`;
        root_header_file_name.innerHTML = `${loaded_files_counter}. ${loadDialog_file[loadDialog_file.length-1].name}<br>`;
    }

    document.title = (loaded_files_counter === 1) ? loadDialog_file[loadDialog_file.length-1].name : `${document.title}, ${loadDialog_file[loadDialog_file.length-1].name}`;

    loaded_files_counter++;
}

function recalculate_eAxc_values(){
    loadDialog.getFromUI();
    ecpri_dissect_eAxc_values();
    packetTable_renderPackets();
}

// For buttons acting as checkboxes
function toggleAriaPressed(btn) {
    btn.classList.toggle('on');
    btn.setAttribute('aria-pressed', btn.classList.contains('on'));
}

// Returns the aria-pressed value ('true', 'false', or null)
function getAriaPressed(element) {
    return element.getAttribute('aria-pressed') === 'true';
}

// Sets the aria-pressed value ('true', 'false', or 'mixed')
function setAriaPressed(element, value) {
    element.setAttribute('aria-pressed', value ? 'true' : 'false');
    element.classList.toggle('on', value);
}

function redirectToCorrectLink() {
    const currentUrl = window.location.href;
    if (currentUrl === "http://bba.soccloud.dyn.nesc.nokia.net/bba/") {
        if (window.confirm(`Please use http://nok.it/bba link
(http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/) 
instead of the one you are currently using, as it may become unavailable on 1.11.2025.
    Clicking OK will redirect you to the correct link.
    Please save it in your browser bookmarks.`)) {
            window.location.href = 'http://nok.it/bba';
        }
    }
}
