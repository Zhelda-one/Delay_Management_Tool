/**
 * @param {string} fileContents
 * @returns {boolean}
 */
function json_decode( fileContents ){
    let packetsTmp = JSON.parse(fileContents);
    packetsTmp = packetsTmp.slice(config.load.loadLimitFrom);

    let filterFunc = null;
    if( config.load.pcapFilter ) {
        const finalFilter = config.load.pcapFilter.replaceAll( '@', 'p.' );
        try {
            filterFunc = Function( 'p', `if( ${ finalFilter } ) { return true; } return false;` );
        } catch( e ) {
            logError( 'PCAP', `Wrong PCAP filter '${ finalFilter }'` );
            return false;
        }
    }

    for(let i = 0; i < packetsTmp.length; i++){
        if( !filterFunc || filterFunc( packetsTmp[i] ) ) {
            if(config.load.loadLimit === 0 || config.load.loadLimit > packets.length)
                packets.push(packetsTmp[i]);
            else
                break;
        }
    }

    packetsLength = packets.length;
    for(let i = 0; i < packetsLength; i++){
        packets[i].id = i;
        if(packets[i].sections && packets[i].sections[0].iSample){
            packetsPayloadOffset[i] = packets[i].sections[0].iSample.length;
        }
        else{
            packetsPayloadOffset[i] = -1;
        }
    }

    return true;
}
/**
 * @param {ArrayBuffer} buf
 * @returns {boolean}
 */
function json_preload( buf ){
    return loadDialog_file[loadDialog_file.length-1].name.endsWith('json');
}