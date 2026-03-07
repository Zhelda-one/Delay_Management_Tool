function mergeConfigs(appConfig, fileConfig){
    mergeeRecursive( fileConfig, "config.js", appConfig, "AppConfig");
}

function mergeeRecursive(configA, configAName, configB, configBName, subKey){

    if(configB === undefined){
        console.log(`${configAName}: property: ${subKey} is unused`);
        return;
    }

    for (const key in configA) {
        if (!configA.hasOwnProperty(key))
            continue;

        const longKey = subKey ? `${subKey}.${key}` : key
        if(typeof(configA[key]) === 'object'){
            mergeeRecursive(configA[key], configAName, configB[key], configBName, longKey);
        }

        if (!configB.hasOwnProperty(key)){
            console.log(`${configAName}: property: ${longKey} is unused`);
        } else {
            // Overwrite config A with config B
            configB[key] = configA[key];
        }
    }
}