
const fs = require('fs')

function logInfo(_, msg) {
    console.log(msg);
}
logWarning = logInfo;
logError = logInfo;
logDebug = logInfo;

function download(filename, data) {
    fs.writeFileSync(filename, data);
}

function printHelp() {
    console.log('Usage: node ./ecog-engine.js');
    console.log('Options:');
    console.log('  --print-config');
    console.log('      Print current config');
    console.log('  --config <*.json>');
    console.log('      Load config from file');
    console.log('  --json-to-pcap <*.json>');
    console.log('      JSON to PCAP');
    console.log('  --generate');
}

let argv = process.argv.slice(2);

if( argv.length === 0 ) {
    console.log('eCoG - eCPRI Content Generator, updated ' + latestUpdate);
    printHelp();
}

for( let argvIdx = 0; argvIdx < argv.length; ++argvIdx ) {
    switch( argv[argvIdx] ) {
        case '--print-config':
            console.log( ecog_config );
            break;

        case '--config':
            const cfgFile = argv[++argvIdx];
            try {
                const cfgData = fs.readFileSync( cfgFile, 'utf8' );
                ecog_config = { ...ecog_config, ...JSON.parse( cfgData ) };
                generate().then(generated => download(ecog_config.filename + '.pcap', generated))
            } catch( err ) {
                console.log( "Error: Can't read file" );
            }
            break;

        case '--json-to-pcap':
            const jsonFile = argv[++argvIdx];
            try {
                const jsonData = fs.readFileSync( jsonFile, 'utf8' );
                generated_packets = { ...generated_packets, ...JSON.parse( jsonData ) };
                ecog_config.mode = 'json';
                generate().then(generated => download(ecog_config.filename + '.pcap', generated))
            } catch( err ) {
                console.log( "Error: Can't read file" );
            }
            break;

        case '--generate':
            generate().then(generated => download(ecog_config.filename + '.pcap', generated))
            break;

        case '-h':
        case '--help':
        default:
            printHelp();
            break;
    }
}
