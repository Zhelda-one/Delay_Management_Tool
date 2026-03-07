let regex_saved_columns = {};
function filterPackets( filter ) {
    filter = filter.replaceAll("===","==");
    filter = filter.replaceAll("!==","!=");
    filter = filter.replaceAll('""', "undefined");

    const perfNow = performance.now();
    if( filter === '' ) {
        // currentPacketsFilter = '';
        filteredPacketsIds = new Array(packetsLength);
        for( let i = 0; i < packetsLength; ++i ) {
            filteredPacketsIds[i] = i;
        }
    } else {
        let finalFilter = '';
        let isPropName = false;
        let isRegex = false;
        let isMappedPropValue = false;
        let propName = '', propValue = '';
        regex_saved_columns = {};

        for( let i = 0; i < filter.length; ++i ) {
            const c = filter[i];
            if( c === '@' ) {
                isPropName = true;
                finalFilter += 'getPacketValue( p ,"';
                propName = '';
            } else if(i+11 < filter.length && filter.slice(i, i+11) === "new RegExp("){
                isRegex = true;
                finalFilter += 'getRegexValues( p ,';
                i+=10;
            }
            else if(c === ')' && isRegex){
                isRegex = false;
                finalFilter += `${ c }`;
            }
            else if( isPropName || isRegex) {
                if( ' !&%)*+-/<=>^|'.includes( c ) && !isRegex ) {
                    isPropName = false;
                    finalFilter += `" )${ c }`;
                } else {
                    propName += c;
                    finalFilter += c;
                }
            } else if( c === "'" || c === '"' ) {
                if( !isMappedPropValue ) {
                    propValue = '';
                } else {
                    let found = false;
                    if( packetPropToStrMap.hasOwnProperty( propName ) ) {
                        for( const propMapName in packetPropToStrMap[propName] ) {
                            if( propValue === packetPropToStrMap[propName][propMapName] ) {
                                finalFilter += propMapName;
                                found = true;
                                break;
                            }
                        }
                    }
                    if( !found ) {
                        finalFilter += `'${ propValue }'`;
                    }
                }
                isMappedPropValue = !isMappedPropValue;
            } else if( isMappedPropValue ) {
                propValue += c;
            } else {
                finalFilter += c;
            }
        }
        if( isPropName ) finalFilter += '"]';

        logDebug( 'Core', `Final filter: ${ finalFilter }` );
        let filterFunc;
        try {
            filterFunc = Function( 'p', `if( ${ finalFilter } ) { return true; } return false;` );
        } catch( e ) {
            logError( 'Core', `Wrong filter: '${ finalFilter }'` );
            return false;
        }
        filteredPacketsIds = [];
        for( let i = 0; i < packetsLength; ++i ) {
            if( filterFunc( packets[i] ) ) {
                filteredPacketsIds.push( i );
            }
        }
    }

    filteredPacketsIdsLength = filteredPacketsIds.length;
    logDebug( 'Core', `Packets filtering took ${ perfToMsFrom( perfNow ) }` );

    filteredPacketsIds_set = new Set(filteredPacketsIds);

    if(!getElementById('root_header_menu_2').checked){
        sortPackets( sortColumn, sortMode );
    }

    if(getElementById('iqTabFiltersDialog_usePacketFilter').checked){
        for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
            if( canvas_viewports[vIdx].mode === 1 ) canvas_viewports[vIdx].isRender = true;
        }
    }


    return true;
}

function applyIqTabRanges(v, vf) {
    v.isFiltersUpdated = true;
    if (iqTabFiltersDialog_frameFilterCheckbox.checked) {
        if (iqTabFiltersDialog_frameFilterFrom.value !== '') {
            vf.ranges.frame[0] = parseInt(iqTabFiltersDialog_frameFilterFrom.value);
        }
        if (iqTabFiltersDialog_frameFilterTo.value !== '') {
            vf.ranges.frame[1] = parseInt(iqTabFiltersDialog_frameFilterTo.value);
        }
    } else {
        vf.ranges.frame = [-1,-1];
    }
    if (iqTabFiltersDialog_subframeFilterCheckbox.checked) {

        if (iqTabFiltersDialog_subframeFilterFrom.value !== '') {
            vf.ranges.subframe[0] = parseInt(iqTabFiltersDialog_subframeFilterFrom.value);
        }
        if (iqTabFiltersDialog_subframeFilterTo.value !== '') {
            vf.ranges.subframe[1] = parseInt(iqTabFiltersDialog_subframeFilterTo.value);
        }
    } else {
        vf.ranges.subframe = [-1,-1];
    }
    if (iqTabFiltersDialog_slotFilterCheckbox.checked) {
        if (iqTabFiltersDialog_slotFilterFrom.value !== '') {
            vf.ranges.slot[0] = parseInt(iqTabFiltersDialog_slotFilterFrom.value);
        }
        if (iqTabFiltersDialog_slotFilterTo.value !== '') {
            vf.ranges.slot[1] = parseInt(iqTabFiltersDialog_slotFilterTo.value);
        }
    } else {
        vf.ranges.slot = [-1,-1];
    }
    if (iqTabFiltersDialog_symbolFilterCheckbox.checked) {
        if (iqTabFiltersDialog_symbolFilterFrom.value !== '') {
            vf.ranges.symbol[0] = parseInt(iqTabFiltersDialog_symbolFilterFrom.value);
        }
        if (iqTabFiltersDialog_symbolFilterTo.value !== '') {
            vf.ranges.symbol[1] = parseInt(iqTabFiltersDialog_symbolFilterTo.value);
        }
    } else {
        vf.ranges.symbol = [-1,-1]
    }
    if (iqTabFiltersDialog_RBFilterCheckbox.checked) {
        if (iqTabFiltersDialog_RBFilterFrom.value !== '') {
            vf.ranges.RB[0] = parseInt(iqTabFiltersDialog_RBFilterFrom.value);
        }
        if (iqTabFiltersDialog_RBFilterTo.value !== '') {
            vf.ranges.RB[1] = parseInt(iqTabFiltersDialog_RBFilterTo.value);
        }
    } else {
        vf.ranges.RB = [-1,-1]
    }

}

// function getValue(packet, column){
//     return packet[column];
// }

function getRegexValues(packet, regex_text){

    if(!regex_saved_columns[regex_text]){
        const regex = new RegExp(regex_text);
        regex_saved_columns[regex_text] = packetTable_allColumnNames.filter((col_name) => regex.test(col_name));
    }

    return regex_saved_columns[regex_text].map((column) => packet[column]);
}