const isBrowser = false;
const isNode = true;

let packetTable_allColumnNames;
let packetTable_filteredColumnNames;

// Imports
const fs = require('fs');
const Decimal = module.exports.Decimal; // Import module without installing with NPM. No double install
//--------------Process args---------------
const [params, positionalArgs] = parseArgs(process.argv);
PrintParamsInfo();

const pcapFile = positionalArgs[0];
const optionArg = positionalArgs[1];
for(let i = 0; i < positionalArgs.length; ++i){
    if(positionalArgs[i] ==="--help"){
        printHelp();
        process.exit();
    }
    else if( i >= 2){
        console.log(`Unused positional argument: ${positionalArgs[i]}`);
    }
}

if (!pcapFile || !optionArg) {
    console.log("Usage:\n");
    console.log(" node "+process.argv[1]+" <pcap_file> <option>");
    console.log(" node "+process.argv[1]+" <pcap_file> <analysis_script>");
    console.log("use --help option for a more detailed description");
    process.exit(1);
}

// Loads into global 'config'
LoadConfig();

config.configDialog_moreChannels = false;   //TODO: remove

if(fs.existsSync(node_params.outDir) === false){
    logInfo(`Creating output directory: ${node_params.outDir}`);
    fs.mkdirSync(node_params.outDir, {recursive: true});
}

// Open input file

// Preload
let inputBuffer = fs.readFileSync(pcapFile).buffer;
config.load.fileType = filePreload(inputBuffer);
if(config.load.fileType === null)
    throw new Error("Cannot determine input file type");

logInfo('Detect', `File type: ${config.load.fileType}`);

// Auto-detected settings
logInfo('Detect', `Dynamic IQ compression detected: ${config.load.dynamicIqComp}`);
logInfo('Detect', `IQ bit width detected: ${config.load.iqBitWidth}`);
logInfo('Detect', `Compression method detected: ${configPropToStrMap['iqCompMethod'][config.load.iqCompMethod]}`);

// Run
const fileFormat = g_fileFormats[config.load.fileType];
if(fileFormat === undefined) throw new Error("Unknown file format");

if(fileFormat.dataFormat === Enum_DataFormat.TEXT)
    inputBuffer = fs.readFileSync(pcapFile, 'utf8');

const ERROR_CODE_LOAD = 1;
const ERROR_CODE_CONFIG = 2;
const ERROR_CODE_ANALYSIS = 3;

try{
    loadFile( inputBuffer, fileFormat );
} catch(err){
    console.log(err);
    process.exit(ERROR_CODE_LOAD);
}

if( config.load.numerologyAutodetection && Object.keys(ecpri_defaultU).length === 0 ){
    logError('Detect', `Couldn't detect numerology. Not enough data.`);
    process.exit(ERROR_CODE_CONFIG);
}

console.log("Decoded");
const option = optionArg.toLowerCase().split('-');
const firstArg = option[0];
const parameters = option.slice(1);

try{
    if(firstArg.endsWith(".js")) {
        const data = fs.readFileSync(firstArg).toString();
        eval(data);
        return;
    }

    switch(firstArg){
        case "none":
            break;
        case "deep":
            break;
        case "bip":
            break;
        case "l1":
            const results = check_l1_allocations();
            console.log(results);
            break;
        case "timing":
            nodeAnalysis_timingStatistics(option[1]);
            break;
        case "save":
            packetTable_generateColumnNames();
            csv_encode();
            break;
    }
} catch(err){
    console.log(err);
    process.exit(ERROR_CODE_ANALYSIS);
}

process.exit(0);


