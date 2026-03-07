function printHelp(){
    console.log("Usage:\n");
    console.log(" node "+process.argv[1]+" <pcap_file> <option>");
    console.log("\n");
    console.log(`Runs predetermined set of checks based on "option"`);
    console.log(`Options:
 l1     : checks l1 allocations
 timing : timing analysis
   timing-all   : all timing analysis (same as 'timing')
   timing-bip   : bip timing analysis
   timing-ecpri : ecpri streams analysis
   timing-seq   : sequences analysis
 save               : save file content to CSV file
 path_to_script.js  : execution of user made script
`);
    console.log(`Flags:\n
 [ -o DIRECTORY ]       : set an output directory (default: ./Results)
`);
}

const node_params = {
    outDir: "Results",
    iqDataAutodetection: true
}

function PrintParamsInfo(){
    logInfo('Params', `Output directory set to: ${node_params.outDir}`);
    //logInfo('Params', `IqData Settings Auto-detection set to: ${node_params.iqDataAutodetection}`);
}

const flags = {
    o: {
        required: false,
        arg: true,
        set: false,
        fn(dir) {
            this.set = true;
            node_params.outDir = dir;
        }
    },
    u: {
        required: false,
        arg: true,
        set: false,
        fn(num) {
            this.set = true;
            num = parseInt(num);
            if([0, 1, 2, 3, 4, 5].includes(num)) node_params.defaultU = num;
            else {
                console.log(`${num} is not a valid numerology!`);
                console.log("Valid numerologies: 0, 1, 2, 3, 4, 5");
                process.exit(1);
            }
        }
    },
    c: {
        required: false,
        arg: true,
        set: false,
        fn(compression) {
            this.set = true;
            const compressionFound = ["BFP", "BFP_dec", "uncompressed"]
                .find(elem => elem.toLowerCase().localeCompare(compression) === 0);
            if(compressionFound !== undefined) node_params.compression_method = compressionFound;
            else {
                console.log(`${compression} is not a valid compression method!`);
                console.log("Valid values: BFP, BFP_dec, uncompressed");
                process.exit(1);
            }
        }
    },
    m: {
        required: false,
        arg: true,
        set: false,
        fn(multi) {
            this.set = true;
            node_params.multiVer = multi;
        }
    }
}

function parseArgs(argv){
    let lastFlag = null;
    let positionalArgs = [];
    for(let i = 2; i < argv.length; ++i){
        const arg = argv[i].toLowerCase();
        const shortSwitch = arg.startsWith('-') && !arg.startsWith('--');

        if(lastFlag !== null){
            flags[lastFlag].fn(argv[i]);
            lastFlag = null;
        }
        else if(shortSwitch) {
            const options = arg.slice(1);
            const passoverFlag = parseArg(options);
            if(passoverFlag !== null) {
                lastFlag = passoverFlag;
            }
        }
        else{
            positionalArgs.push(arg);
        }
    }

    if(lastFlag){
        console.log(`Flag [ -${lastFlag} ] requires an argument!`);
        process.exit(1);
    }

    return [node_params, positionalArgs];
}

const parseArg = (arg)=>{
    if (arg.length === 0) return null;
    const flag = arg.slice(0,1);

    if(!(flag in flags)) {
        console.log(`Unknown flag: "${flag}"`);
    }
    else if(flags[flag].arg === false){
        flags[flag].fn();
    }
    else if(arg.length > 1){
        flags[flag].fn(arg.slice(1));
        return null;
    }
    else{
        return flag;
    }
    return parseArg(arg.slice(1));
}

function LoadConfig() {
    // Read config file
    const configFilename = fs.existsSync("config.js") ? "config.js" : "./js/config.js";
    let configString = "";
    try {
        configString = fs.readFileSync(configFilename, "utf8");
    } catch(err) {
        logError("FileConfig", `Couldn't load file ${configFilename}: ${err.message}`);
    }

    let fileConfig = null;
    if (configString !== "") {
        try {
            fileConfig = eval(configString).config;
        } catch(err) {
            logError("FileConfig", `Couldn't parse JSON file ${configFilename}: ${err.message}`);
        }
    }

    if (fileConfig !== null) {
        mergeConfigs(config, fileConfig);
    }
}
