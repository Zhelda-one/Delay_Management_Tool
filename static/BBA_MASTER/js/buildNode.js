const source_files = [
    "libs/zip.min.js",
    "libs/pako_inflate.min.js",
    "libs/decimal.js",
    //"libs/plotly-2.32.0.min.js",

    "js/core.js",
    "js/config.js",
    //"js/statistics.js",
    "js/core/buffer.js",

    // UTILITIES
    "js/utils/5GMaxUtils.js",
    "js/utils/arithmeticUtils.js",
    "js/utils/filterUtils.js",
    "js/utils/ecpriUtils.js",
    "js/utils/conversionUtils.js",
    "js/utils/formatUtils.js",
    "js/utils/graph2dUtils.js",
    "js/utils/iqDecoder.js",
    "js/utils/l2l1Utils.js",
    "js/utils/packetsUtils.js",
    "js/utils/tableBuilder.js",

    // eCoG/Generator
    "js/generator/ecog_72e.js",
    "js/generator/ecog.js",

    // PROTOCOLS
    "js/protocols/ecpri/definitions.js",
    "js/ecpri/analyze.js",
    "js/protocols/ecpri/ecpriSectionExtensions.js",
    "js/protocols/ecpri/ecpriSections.js",
    "js/protocols/ecpri/extraInfo.js",
    "js/ecpri/ecpri.js",
    "js/ecpri/pm_file.js",

    "js/beamplotting.js",
    "js/cpri/cpri.js",
    //"js/protocols/ecpri/ecpri.js",
    "js/protocols/ethernet/ethernet.js",
    "js/protocols/bip/analyze.js",
    "js/protocols/bip/bip.js",
    "js/protocols/ip/ipv4.js",
    "js/protocols/ip/ipv6.js",
    "js/protocols/ptp/ptp.js",
    "js/protocols/roe/roe.js",

    "js/l2l1.js",

    // FILE FORMATS
    "js/fileFormats/general.js",

    "js/fileFormats/file_format_info.js",
    "js/fileFormats/json.js",
    "js/fileFormats/loki.js",
    "js/fileFormats/pcap_decode.js",
    "js/fileFormats/pcap_encode.js",
    "js/fileFormats/ims2_decoder.js",
    "js/fileFormats/l1radioSnapshot.js",
    "js/fileFormats/lonerDDR4.js",
    "js/fileFormats/misc_formats.js",
    "js/fileFormats/testForAnia.js",
    "js/fileFormats/file_types.js",

    "js/nr/prach.js",
    "js/nr/pucch.js",
    "js/nr/pdcch.js",
    "js/nr/pdsch.js",
    "js/nr/pusch.js",
    "js/nr/csirs.js",
    "js/nr/srs.js",
    "js/nr/nr.js",
    "js/nr/decode.js",
    "js/nr/analyze.js",
    "js/nr/PBCH.js",
    "js/nr/sib.js",
    "js/nr/dci.js",

    "js/modify.js",

    // LEGACY
    "js/old_BBA/util.js",
    "js/old_BBA/dsp_complex_array.js",
    "js/old_BBA/dsp_fft.js",
    "js/old_BBA/dsp_matlab_vector.js",
    "js/old_BBA/dsp_matlab.js",

    "js/UI/ActionClass.js",
    "js/UI/Actions.js",

    "js/iqTab/iqTabRegridCache.js"
];

const node_files = [
    "./js/node/cli.js",
    "./js/node/mocks.js",
    "./js/node/node.js",
    "./js/node/utils.js",

    "./js/node/analysis/timingStatistics.js",
]

let source= "";

function addSource(data) {
    source+=data + "\r\n";
}

function appendSource( filename ) {
    const fs = require('fs');

    try {
        const data = fs.readFileSync(filename);
        addSource(data);
    } catch (r) {
        console.error(r)
    }
}

const fs = require('fs');
const path = require('path');

function readDirectoryRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            readDirectoryRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function generate_test_suite() {
    source= "/* generated at: "+new Date().toJSON().slice(0,10).replace(/-/g,'/')+"*/\n";

    //appendSource("./test/setupMocha.js");

    for( let i = 0; i < source_files.length; i++)
        appendSource(source_files[i]);

    appendSource("./js/test/setup.js");

    let fileList = readDirectoryRecursively('js/test');
    fileList.forEach(file => {
        if (file.match(/test_.*.js/g)) {
            appendSource(file);
        }
    });

    fs.writeFileSync('./js/test/all.test.js', source);
}

function generate_bba_node() {
    source= "/* generated at: "+new Date().toJSON().slice(0,10).replace(/-/g,'/')+"*/\n";

    for( let i = 0; i < source_files.length; i++)
        appendSource(source_files[i]);

    for( let i = 0; i < node_files.length; i++)
        appendSource(node_files[i]);

    const fs = require('fs');
    fs.writeFileSync('./bba.node.js', source);
}

if((typeof process !== 'undefined')){ // && process?.release?.name === "node"

    let mode = 'test';

    for(let i = 2; i < process.argv.length; ++i){
        const arg = process.argv[i];
        if(arg === 'node'){
            mode = 'node';
        }
    }

    switch(mode){
        case 'test':
            console.log("Generating tests...");
            generate_test_suite();
            break;
        case 'node':
            console.log("Generating BBA Node...");
            generate_bba_node();
            break;
        default:
            console.log(`Unknown mode: ${mode}`);
    }
}
