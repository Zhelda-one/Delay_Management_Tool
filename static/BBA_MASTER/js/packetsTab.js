const packetsTab = getElementById( 'packetsTab' );

const packetsTab_header = getElementById( 'packetsTab_header' );
const packetsTab_header_filterInput = getElementById( 'packetsTab_header_filterInput' );
const packetsTab_header_filtersList = getElementById( 'packetsTab_header_filtersList' );
const packetsTab_header_numOfDisplayedPackets = getElementById( 'packetsTab_header_numOfDisplayedPackets' );
const packetsTab_header_numOfTotalPackets = getElementById( 'packetsTab_header_numOfTotalPackets' );

const packetsTab_body = getElementById( 'packetsTab_body' );

const packetTable = getElementById( 'packetTable' );
const packetTable_head = packetTable.tHead;
const packetTable_body = packetTable.tBodies[0];
const packetTable_numOfVisiblePkts = 200;
const packetTable_numOfScrolledPkts = 100;
let packetTable_allColumnNames = [];
let packetTable_filteredColumnNames = null;
let packetTable_visibleColumnNames = null;
let excludedColumnNames = ['l2l1.payload']; // TODO: this is called from loadFile in core.js, but is only available as part of the UI in packetsTab.js
let packetTable_packetStrArr = null;
let packetTable_startPktIdx = 0;
let clicked_packet = 0;
let packetTable_highStartPktIdxLimit = 0;
let packetTable_selectedColumnName = '';
let packetTable_selectedColumnType = '';
let packetTable_selectedRowIdx = -1;
let packetTable_valueCounterSelArr;
let packet_error = false;
let time_format_display = 0;

//Result of typeof function for each column.
let packetTable_columnTypes = {};

let column_details_sortByCount = true;
let column_details_sortAscending = true;

let showAllValuesColName= '';

let comparisionPktIds = [];
let comparisionPktRowIds = [];
let packetsTab_compareButton = getElementById('compare_button');

function packetsTab_filtersList_onMouseDown( e ) {
    packetsTab_header_filterInput.value = e.innerText;
    packetsTab_header_filterInput.style.backgroundColor = 'white';
    packetsTab_header_filtersList.hidden = true;
}

function packetsTab_filtersList_update() {
    let str = '';
    if( config.packetsTab.sortPacketFilters ) config.packetsTab.packetsFilters.sort();
    for( const filter of config.packetsTab.packetsFilters ) {
        str += `<span onMouseDown="packetsTab_filtersList_onMouseDown( this )">${ filter }</span><br>`;
    }
    packetsTab_header_filtersList.innerHTML = str;
}

function packetsTab_filterPackets( filter ) {
    if( arguments.length === 0 ) {
        filter = packetsTab_header_filterInput.value;
    }

    if( filterPackets( filter ) ) {
        packetTable_someFunc();

        if( packetTable_visibleColumnNames.includes( packetTable_selectedColumnName ) ) {
            Action_OnColumnDetailsDialogRefresh.Invoke();
        } else {
            columnDetailsDialog.close();
        }

        const displayFilter = filter.replaceAll('undefined', '""');

        packetsTab_header_filterInput.value = displayFilter;
        packetsTab_header_filterInput.style.backgroundColor = 'White';

        if( displayFilter !== '' ) {
            if( config.packetsTab.packetsFilters.includes( displayFilter ) ) {
                config.packetsTab.packetsFilters.splice( config.packetsTab.packetsFilters.indexOf( displayFilter ), 1 );
            }
            config.packetsTab.packetsFilters.unshift( displayFilter );
            if( config.packetsTab.packetsFilters.length > config.packetsTab.numOfSavedFilters ) config.packetsTab.packetsFilters.length = config.packetsTab.numOfSavedFilters;
            packetsTab_filtersList_update();
        }
    } else {
        // TODO: log wrong filter
        packetsTab_header_filterInput.style.backgroundColor = 'Salmon';
    }
}

function packetTable_scrollToEdge(which){
    packetTable_body.innerHTML = "";

    packetTable_startPktIdx = which == "bottom" ? packetTable_highStartPktIdxLimit : 0;

    for(let i=0; i<Math.min(packetTable_numOfVisiblePkts,sortedPacketsIdsLength);i++){
        packetTable_addPacket( packetTable_startPktIdx + i, -1 );
        packetsTab_colorizePacket(packetTable_body.rows.length-1,packetTable_startPktIdx+i);
    }

    packetsTab_body.scrollTop = which == "bottom" ? packetsTab_body.scrollHeight : 0;
}

function packetsTab_colorizePacket(packetTableIdx,packetIdx){
    let packet = packets[sortedPacketsIds[packetIdx]];
    let packetTableBodyEntry = packetTable_body.rows[packetTableIdx];
    packetTableBodyEntry.style.backgroundColor = "";

    for(let i = cellContextMenuDialog_packet_color_filters.length - 1; i >= 0 ; i--){
        const filterKey = cellContextMenuDialog_packet_color_filters[i];
        const [columnName,value] = filterKey.split("$");
        if(getPacketValue(packet,columnName) !== undefined && getPacketValue(packet,columnName).toString() === value){
            packetTableBodyEntry.style.backgroundColor = cellContextMenuDialog_packet_color_filterColors[filterKey];
            break;
        }
    }
}

function packetTable_column_onClick( e ) {
    const columnName = this.id.slice( 4 );
    const columnType = this.firstElementChild.firstElementChild.innerHTML;
    packetTable_selectedColumnName = columnName;
    packetTable_selectedColumnType = columnType;
    Action_OnColumnDetailsDialogRefresh.Invoke();

    columnDetailsDialog.open();

    const maxLeft = window.innerWidth - columnDetailsDialog.offsetWidth - 1;
    columnDetailsDialog.style.left = `${ e.clientX <= maxLeft ? e.clientX : maxLeft }px`;
    columnDetailsDialog.style.top = `${ e.clientY + 15 }px`;
}

function getColumnValues(columnName){
    let values = new Array( sortedPacketsIdsLength );

    const path = getPathFromFullColName(columnName);
    for( let i = 0; i < sortedPacketsIdsLength; ++i ) {
        const value = getPacketValue(packets[sortedPacketsIds[i]],null,path);
        const type = typeof(value);

        values[i] = type !== 'object' ? value : value instanceof Decimal ? value.toNumber() : value.toString();
    }

    return values;
}

/**
 * Adds new column and renders packets table
 * @param {string} name - Name of new column.
 * @param {array} values - Column values - can be undefined.
 * @param {string} oldName - Used to insert column name in specific place.
 * @param {string} defaultValue - if defined every undefined column value will be set as defaultValue
 */
function packetTable_addColumn(name, values, oldName, defaultValue){
    if(oldName !== undefined){
        packetTable_allColumnNames.splice(packetTable_allColumnNames.indexOf(oldName)+1, 0, name);
        packetTable_visibleColumnNames.splice(packetTable_allColumnNames.indexOf(oldName)+1, 0, name);
        packetTable_filteredColumnNames.splice(packetTable_allColumnNames.indexOf(oldName)+1, 0, name);
    }
    else{
        packetTable_allColumnNames.push(name);
        packetTable_visibleColumnNames.push(name);
        packetTable_filteredColumnNames.push(name);
    }


    for(let i = 0; i < packets.length; i++){
        if(values[i] !== null && values[i] !== undefined){
            setPacketValue(packets[i],name,values[i]);
        }
        else if(defaultValue !== null && defaultValue !== undefined){
            setPacketValue(packets[i],name,defaultValue);
        }
    }

    packetTable_renderColumns();
    packetTable_renderPackets();
}

function packetTable_renderColumns() {
    const perfNow = performance.now();
    packetTable_visibleColumnNames = packetTable_filteredColumnNames.filter(v => !config.packetsTab.hiddenColumnNames.includes( v ) );

    packetTable_packetStrArr = new Array( packetTable_visibleColumnNames.length + 1 );

    const rows = packetTable_head.rows[0];

    rows.innerHTML = '<tr></tr>';

    const showDataType = getElementById("packetsTab_header_showColTypesCB").checked;

    let lastColumnName = '';
    for( let i = 0; i < packetTable_visibleColumnNames.length; ++i ) {
        const columnName = packetTable_visibleColumnNames[i];
        const columnId = packetTable_filteredColumnNames.indexOf(columnName);
        const cell = rows.insertCell();
        cell.id = `col_${ columnName }`;
        cell.classList.add(i%2 === 0 ? "evenOddTable_header_td_even" : "evenOddTable_header_td_odd");
        cell.onclick = packetTable_column_onClick;

        let equalPoint = 0;
        for( let j = 0; j < columnName.length; ++j ) {
            if( j >= lastColumnName.length ) break;
            if( columnName[j] !== lastColumnName[j] ) break;
            if( columnName[j] === '.' ) equalPoint = j;
        }
        lastColumnName = columnName;

        const typeStr = showDataType ? packetTable_columnTypes[columnName] : "";

        if( equalPoint !== 0 ) {
            cell.innerHTML = `<div><div class="evenOddTable_header_colTypes">${typeStr}</div> <div><span class="unaltered">${ columnName.substring( 0, ++equalPoint ) }</span>${ columnName.substring( equalPoint ) } [${ columnId }]</div></div>`;
        } else {
            cell.innerHTML = `<div><div class="evenOddTable_header_colTypes">${typeStr}</div ><div>${ columnName } [${ columnId }]</div> </div>`;
        }
        cell.title = `${columnName}`
    }
    rows.insertCell().style.width = '100%';
    logDebug( 'UI', `packetTable_renderColumns took: ${ perfToMsFrom( perfNow ) }` );
}

function packetTable_addPacket( pktIdx, rowIdx ) {
    const pkt = packets[sortedPacketsIds[pktIdx]];

    for (let i = 0; i < packetTable_packetStrArr.length; ++i) {
        const td = document.createElement("td");
        td.classList.add("packetTable_element_td");
        packetTable_packetStrArr[i] = td;
    }

    const colNamesWithVals = getPacketsColumnsWithValues(pkt);

    for( const propName in colNamesWithVals ){
        let propVal = colNamesWithVals[propName];

        const propNameIdx = packetTable_visibleColumnNames.indexOf( propName );
        if( propNameIdx === -1 ) continue;

        if( config.packetsTab.namedRows && packetPropToStrMap.hasOwnProperty( propName ) && packetPropToStrMap[propName].hasOwnProperty( propVal ) ) {
            propVal = packetPropToStrMap[propName][propVal];
        } else if( packetPropToValue.hasOwnProperty( propName ) ) {
            propVal = packetPropToValue[propName]( propVal, true, pkt.id ); //'0x' + prop.toString( 16 ).toUpperCase();
        }

        const targetElement = packetTable_packetStrArr[propNameIdx];

        const extraInfoElem = packetTable_gerPropExtraInfoElem( propName, pkt);

        if (extraInfoElem) {
            const textNode = document.createTextNode(`${propVal} `);
            targetElement.append(textNode, extraInfoElem);
        } else {
            targetElement.textContent = propVal;
        }
    }

    let row = packetTable_body.insertRow( rowIdx );
    row.append(...packetTable_packetStrArr);

    let rowId = row.rowIndex - 1;
    if (validate_packet(sortedPacketsIds[pktIdx])) {
        packetTable_body.rows[rowId].classList.add( 'malformed' );
    }
    if(packet_warnings_list[sortedPacketsIds[pktIdx]]){
        packetTable_body.rows[rowId].classList.add( 'warning' );
    }
}

function packetTable_getPropExtraInfo(propName, pkt){
    switch( propName ){
        case "ecpri.message":
            return ecpri_getPropExtraInfo_message(propName, pkt);
    }
    return null;
}

function packetTable_gerPropExtraInfoElem(propName, pkt) {
    const extraInfo = packetTable_getPropExtraInfo( propName, pkt);

    if (extraInfo === null) return null;

    const icon = document.createElement("i");
    if (extraInfo.status === EXTRA_INFO_STATUS.success) {
        icon.classList.add("fa-solid", "fa-circle-check", "hoverSuccess");
    } else if (extraInfo.status === EXTRA_INFO_STATUS.error) {
        icon.classList.add("fa-solid", "fa-circle-xmark", "hoverError");
    } else {
        icon.classList.add("fa-solid", "fa-circle-exclamation", "hoverWarning");
    }

    const div = document.createElement("div");
    div.classList.add("hoverElement");
    div.dataset.modalContent = extraInfo.text;
    div.addEventListener("mouseenter", showModal);
    div.addEventListener("mouseleave", hideModal);
    div.appendChild(icon);

    return div;
}

function packetTable_gerPropExtraInfoStr(propName, pkt){
    const extraInfo = packetTable_getPropExtraInfo( propName, pkt);

    const extraInfoIconStr = extraInfo === null ? "" :
        extraInfo.status === EXTRA_INFO_STATUS.success ? `<i class="fa-solid fa-circle-check hoverSuccess"></i>` :
            extraInfo.status === EXTRA_INFO_STATUS.error ? `<i class="fa-solid fa-circle-xmark hoverError"></i>` :
                `<i class="fa-solid fa-circle-exclamation hoverWarning"></i>`;

    if(extraInfo === null){
        return "";
    }

    return `<div class="hoverElement" onMouseEnter="showModal(event)" onMouseLeave="hideModal(event)" data-modal-content="${extraInfo.text}">${extraInfoIconStr}</div>`;
}

function packetTable_someFunc() {
    const perfNow = performance.now();
    packetsTab_header_numOfDisplayedPackets.innerHTML = `${ sortedPacketsIdsLength } (${ calcPercentFixed2( sortedPacketsIdsLength, packetsLength ) })`;
    packetsTab_header_numOfTotalPackets.innerHTML = packets.length.toString();

    packetTable_generateColumnNames();
    packetTable_renderPackets();
    packetsTabCustomizeDialog_updateVisibleColumns();

    packetTable_highStartPktIdxLimit = sortedPacketsIdsLength - packetTable_numOfVisiblePkts;
    if( packetTable_highStartPktIdxLimit < 0 ) packetTable_highStartPktIdxLimit = 0;

    packetsTab_body.scrollTop = 0;
    const newWidth = `${ window.innerWidth - 10 - ( packetsTab_body.offsetWidth - packetsTab_body.clientWidth ) }px`;
    if( packetTable.style.width !== newWidth ) packetTable.style.width = newWidth;
    // configureDialog_u.value = ecpri_maxU;

    logDebug( 'UI', `packetTable_someFunc took: ${ perfToMsFrom( perfNow ) }` );
}

function packetsTab_toggleColTypes(){
    const showTypesCB = getElementById("packetsTab_header_showColTypesCB");

    if(showTypesCB.checked){
        packetTable_addDataTypesToColumnNames();
    }

    packetTable_generateColumnNames();
}

function packetTable_addDataTypesToColumnNames(){
    const perfNow = performance.now();

    const columnTypes = {};

    for(let i=0; i < packetsLength; i++){
        let pkt = packets[i];

        const colNamesWithVals = getPacketsColumnsWithValues(pkt);

        for( const propName in colNamesWithVals ){
            let propVal = colNamesWithVals[propName];
            let columnType = typeof propVal;
            if(columnType === "object"){
                if(Array.isArray(pkt[propName])) columnType = "array";
                else if(pkt[propName] instanceof Decimal) columnType = "decimal";
                else columnType = "object";
            }

            if(columnTypes[propName] && columnTypes[propName] !== columnType) columnTypes[propName] = "mix";
            else columnTypes[propName] = columnType;
        }
    }

    for(const [colName, propName] of Object.entries(columnTypes)){
        switch(propName){
            case "number": packetTable_columnTypes[colName] = "num"; break;
            case "string": packetTable_columnTypes[colName] = "str"; break;
            case "boolean": packetTable_columnTypes[colName] = "bool"; break;
            case "mix": break;

            case "array": packetTable_columnTypes[colName] = "arr"; break;
            case "decimal": packetTable_columnTypes[colName] = "dec"; break;
            case "object": packetTable_columnTypes[colName] = "obj"; break;
            case "bigint" : packetTable_columnTypes[colName] = "bigint"; break;
        }
    }

    logDebug( 'UI', `packetTable_addDataTypesToColumnNames took: ${ perfToMsFrom( perfNow ) }` );
}

function packetTable_renderPackets() {
    const perfNow = performance.now();

    packetTable_body.innerHTML = "";

    const numOfPktsToShow = Math.min( packetTable_numOfVisiblePkts, sortedPacketsIdsLength );
    for( let i = 0; i < numOfPktsToShow; ++i ) packetTable_addPacket( i, -1 );

    packetTable_selectedRowIdx = -1;
    packetTable_startPktIdx = 0;

    logDebug( 'UI', `packetTable_renderPackets took: ${ perfToMsFrom( perfNow ) }` );
}

let lastScrollTop = 0;
packetsTab_body.onscroll = function() {
    if (packetsTab_body.scrollTop === lastScrollTop) {
        return; // Skip the rest of the function if scrolling horizontally
    }

    const padding = 10;
    const scrollTop = packetsTab_body.scrollTop;
    lastScrollTop = scrollTop;

    const selectedRowIdCopy = packetTable_selectedRowIdx;
    if( scrollTop === 0 && packetTable_startPktIdx !== 0 ) {
        const pktsToAdd = packetTable_startPktIdx < packetTable_numOfScrolledPkts ? packetTable_startPktIdx : packetTable_numOfScrolledPkts;
        packetTable_startPktIdx -= pktsToAdd;

        for( let i = 0;  i < pktsToAdd; ++i ) {
            packetTable_body.deleteRow( -1 );
            packetTable_addPacket( packetTable_startPktIdx + i, i );
            packetsTab_colorizePacket(i,packetTable_startPktIdx+i);
        }

        // Remove first row to update highlighted fields
        // Add removed packet
        packetTable_body.deleteRow( pktsToAdd );
        packetTable_addPacket( packetTable_startPktIdx + pktsToAdd, pktsToAdd );

        packetTable_selectedRowIdx += pktsToAdd;
        if( selectedRowIdCopy <= 0 && packetTable_selectedRowIdx >= 0 ) {
            packetTable_body.rows[packetTable_selectedRowIdx].classList.add( 'selected' );
        }
        packetsTab_body.scrollTop = 12 * pktsToAdd;
        return;
    }

    let scrollHeight = packetsTab_body.scrollHeight - packetsTab_body.clientHeight;
    if( scrollTop + padding >= scrollHeight && packetTable_startPktIdx !== packetTable_highStartPktIdxLimit ) {

        (async () => {

            let counter = 0;

            for( ; counter < packetTable_numOfScrolledPkts; ++counter ) {
                if( packetTable_startPktIdx === packetTable_highStartPktIdxLimit ) break;
                packetTable_body.deleteRow( 0 );
                packetTable_addPacket( packetTable_startPktIdx++ + packetTable_numOfVisiblePkts, -1 );
                packetsTab_colorizePacket(packetTable_body.rows.length-1,packetTable_startPktIdx+packetTable_numOfVisiblePkts-1);
            }

            // Remove and add first row to update highlights
            packetTable_body.deleteRow( 0 );
            packetTable_addPacket( packetTable_startPktIdx, 0 );

            packetTable_selectedRowIdx -= counter;

            if( selectedRowIdCopy >= packetTable_numOfVisiblePkts && packetTable_selectedRowIdx < packetTable_numOfVisiblePkts ) {
                packetTable_body.rows[packetTable_selectedRowIdx].classList.add( 'selected' );
            }
        })();
    }
};

function packetTable_row_onclick(e) {
    const closestRow = e.target.closest('tr');
    if(closestRow === null) {
        return;
    }

    let rowId = closestRow.rowIndex - 1;

    if( rowId !== packetTable_selectedRowIdx ) {
        if( packetTable_selectedRowIdx >= 0 && packetTable_selectedRowIdx < packetTable_numOfVisiblePkts ) {
            packetTable_body.rows[packetTable_selectedRowIdx].classList.remove( 'selected' );
        }
        packetTable_body.rows[rowId].classList.add( 'selected' );
        packetTable_selectedRowIdx = rowId;
    }

    if (e.ctrlKey) {
        if (!comparisionPktIds.includes(sortedPacketsIds[packetTable_startPktIdx + rowId])) {
            if (comparisionPktIds.length < 4) {
                comparisionPktIds.push(sortedPacketsIds[packetTable_startPktIdx + rowId]);
            } else {
                packetTable_body.rows[comparisionPktRowIds[0]].classList.remove('comparing');
                comparisionPktIds = comparisionPktIds.slice(1);
                comparisionPktRowIds = comparisionPktRowIds.slice(1);
                comparisionPktIds.push(sortedPacketsIds[packetTable_startPktIdx + rowId]);
            }
            comparisionPktRowIds.push(rowId);
            packetTable_body.rows[rowId].classList.add('comparing');
            if (comparisionPktIds.length >= 2) packetsTab_compareButton.disabled = false;
        } else {
            packetTable_body.rows[sortedPacketsIds[packetTable_startPktIdx + rowId]].classList.remove('comparing');
            comparisionPktIds = comparisionPktIds.filter((value) => value !== sortedPacketsIds[packetTable_startPktIdx + rowId]);
            comparisionPktRowIds = comparisionPktRowIds.filter((value) => value !== rowId);
            if (comparisionPktIds.length < 2) packetsTab_compareButton.disabled = true;
        }
        packetsTab_compareButton.value = 'Compare ' + comparisionPktIds.length + '/4';
    } else {
        packetDetailsDialog_showPacketWithId(sortedPacketsIds[packetTable_startPktIdx + rowId]);
    }
}

function packetsTab_onLoad() {
    packetsTab_filtersList_update();

    packetsTab_header_filterInput.addEventListener( 'input', function() { this.style.backgroundColor = 'white'; } )
    packetsTab_header_filterInput.addEventListener( 'keydown', function( e ) { if( e.key === 'Enter' ) packetsTab_filterPackets(); } );
    packetsTab_body.getElementsByTagName('tbody')[0].addEventListener('click', packetTable_row_onclick);
    packetsTab_body.getElementsByTagName('tbody')[0].addEventListener('contextmenu', packetTable_cell_oncontextmenu);

    packetsTab_header_filterInput.onfocus = function() { packetsTab_header_filtersList.hidden = false; }
    packetsTab_header_filterInput.onblur = function() { packetsTab_header_filtersList.hidden = true; }
}

function packetsTab_applySettings() {
    packetsTab_filtersList_update();

    if( packets.length > 0 ) packetTable_someFunc();
}

function packetsTab_onResize() {
    packetsTab_body.style.maxHeight = packetsTab_body.style.height = `${ window.innerHeight - 10 - root_header.offsetHeight - packetsTab_header.offsetHeight }px`;
    // packetTable.style.minHeight = ( window.innerHeight - 10 - root_header.offsetHeight - packetsTab_header.offsetHeight ) + 'px';
    packetTable.style.width = `${ window.innerWidth - 10 - ( packetsTab_body.offsetWidth - packetsTab_body.clientWidth ) }px`;

    const filterPos = packetsTab_header_filterInput.getBoundingClientRect();
    packetsTab_header_filtersList.style.left = `${ filterPos.left }px`;
    packetsTab_header_filtersList.style.top = `${ filterPos.top + packetsTab_header_filterInput.offsetHeight }px`;
    packetsTab_header_filtersList.style.width = `${ packetsTab_header_filterInput.offsetWidth - 2 }px`;
}

function packetsTab_disableConstCols(){
    const columns = packetsTabCustomizeDialog_visibleColumnsTable.tBodies[0].getElementsByTagName( 'input' );
    for(let i=0; i<columns.length;i++){
        if(!columns[i].id.startsWith(`selCol_`)) continue;
        const colName = columns[i].id.slice( 7 );

        if(filteredPacketsIdsLength == 0) break;
        const firstPacket = packets[filteredPacketsIds[0]];
        const firstPacketPropVal = getPacketValue(firstPacket,colName);
        let hide = true;
        const path = getPathFromFullColName(colName);
        for(let j=1; j<filteredPacketsIdsLength;j++){
            const curPacket =  packets[filteredPacketsIds[j]];
            const curPacketPropVal = getPacketValue(curPacket,null,path);

            if(Array.isArray( curPacketPropVal )){
                if(!Array.isArray( firstPacketPropVal ) || firstPacketPropVal.length != curPacketPropVal.length){
                    hide=false;
                    break;
                }
                for(let k = 0; k < firstPacketPropVal.length ; k++){
                    if(firstPacketPropVal[k] != curPacketPropVal[k]){
                        hide=false;
                        break;
                    }
                }
            }
            else if(getPacketValue(curPacket,null,path) !== getPacketValue(firstPacket,null,path)){
                hide = false;
                break;
            }
        }
        if(hide) columns[i].checked = "";
    }

    packetsTabCustomizeDialog_apply();
}

function getEnumMemberName(propName, pktId) {
    if (!propName.includes("l2l1")) {
        return undefined;
    }

    const dotIdx = propName.lastIndexOf(".");
    const parentName = propName.substring(0, dotIdx);
    const metaName = `${parentName}.__enum_${propName.substring(dotIdx + 1)}`;

    // this binding is needed for the eval later
    const l2l1 = packets[pktId].l2l1;

    try{
        const enumName = eval(metaName); // this works because `metaName` is of form `l2l1.*`
        if (!enumName) {
            return undefined;
        }
        const enumValue = getPacketValue(packets[pktId], propName);

        return packetEnumMap[enumName][enumValue];
    } catch (e) {
        return undefined;
    }



}

function get_linked_packets(packetId){
    const LinkedStruct = (linkedCP, linkedIQs) => {return {linkedCP: linkedCP, linkedIQs: linkedIQs};};
    const linkedCP = ecpri_pktLinks[packetId];

    if(linkedCP !== -1){
        return LinkedStruct(linkedCP, null);
    }

    const linkedIQs = []
    for(let i = 0; i < ecpri_pktLinks.length; i++){
        if(ecpri_pktLinks[i] === packetId){
            linkedIQs.push(i);
        }
    }
    return LinkedStruct(null, linkedIQs.length > 0 ? linkedIQs : null);
}

function jump_to_IQ_view(){
    change_tab( 2 );
    const id = clicked_packet;
    const packet = packets[id];
    const ecpri = packet.ecpri;
    const packet_rtcId = packet.ecpri.rtcId + (packet.ecpri.dataDir==1 ? 2**16 : 0);
    const u_inPkt = ecpri_uInPkt[id];
    const section = ecpri.sections[Number(getElementById("section_select").value)];

    getElementById("iqTab_viewportsSplit_0").checked = true;
    iqTab_selectViewportsSplit(0)
    const vst = canvas_viewports[0];    //TODO: "canvas_selectedViewportId" might be more correct than "0", after the selectViewportSplit fn, not sure

    for(let u in vst.selectedU){
        if(!getElementById("selU_"+u)) continue;

        if(u == u_inPkt) {
            getElementById("selU_"+u).checked = true;
            iqTab_header_antDropdown_onClickU(getElementById("selU_" + u));
        }
        else {
            getElementById("selU_"+u).checked = false;
            iqTab_header_antDropdown_onClickU(getElementById("selU_" + u));
        }
    }
    iqTabCustomize_apply();
    for(const antId in vst.visibleChannels){
        vst.visibleChannels[antId] = true;
    }

    iqTabFiltersDialog_frameFilterCheckbox.checked = false;
    iqTabFiltersDialog_subframeFilterCheckbox.checked = false;
    iqTabFiltersDialog_slotFilterCheckbox.checked = false;
    iqTabFiltersDialog_symbolFilterCheckbox.checked = false;
    iqTabFiltersDialog_RBFilterCheckbox.checked = false;

    iqTab_changeMode(getElementById('iqTab_mode_1'));

    vst.scaleX[1] = 1;
    vst.scaleY[1] = 1;

    canvas_modifyScale( vst, vst, true, 0, 0 );


    iqTab_selectViewportsSplit("0");
    // canvas_isFullRender = true;
    iqTabCustomize_apply();
    canvas_renderTick();

    if(ecpri.message == 2){
        const frameId = ecpri.frameId + ecpri.hfn*256;
        const possible_fcps = fcp_places[u_inPkt][packet_rtcId][frameId*10+ecpri.subframeId];
        for(let i in possible_fcps){
            if(possible_fcps[i].packet == id && possible_fcps[i].sect == Number(getElementById("section_select").value)){
                vst.transX[1] = -(vst.frameSize * (frameId - vst.currentFrame) + vst.subframeSize * ecpri.subframeId + vst.symSize[u_inPkt]*possible_fcps[i].x0) / vst.scaleX[1];
                vst.transY[1] = -(possible_fcps[i].y0 * vst.rbSize[u_inPkt] / vst.scaleY[1]);
            }
        }

    }
    else {
        const finalSymbol = ( ecpri.slotId >> ( u_inPkt <= 5 ? ecpri_maxU - u_inPkt : 0 ) ) * 14 + ecpri.startSymbolId;

        vst.transX[1] = -(vst.frameSize * ((ecpri.frameId + ecpri.hfn*256) - vst.currentFrame) + vst.subframeSize * ecpri.subframeId + vst.symSize[u_inPkt]*finalSymbol) / vst.scaleX[1];
        vst.transY[1] = -(section.startPrb * vst.rbSize[u_inPkt] / vst.scaleY[1]);
    }

    canvas_renderTick();
    canvas_isFullRender = true;
}

function prachDecodePacketsTab(packetId) {
    const pktId = packetId.currentTarget.pktId;
    let i_samples = packetDetailsDialog_iq_graph.graph2d.labels[0];
    let q_samples = packetDetailsDialog_iq_graph.graph2d.series_data[0];
    const filterIndex = packets[pktId].ecpri.filterIndex;

    if (filterIndex === 1 && i_samples.length !== 839) {
        let currentPacket = packets[pktId]
        currentPacket.i_samples = i_samples
        currentPacket.q_samples = q_samples

        let packetsInds = [pktId]
        let packetsPrach = [currentPacket]
        let foundPartPrachPacketIndex = -1;

        for (let i=0; i<packets.length; i++) {
            if (i !== pktId && Math.abs(parseFloat(packets[i].time) - parseFloat(packets[pktId].time)) <= 0.001) {
                let nextPacket = packets[i]
                if (nextPacket.ecpri.message === 0 && nextPacket.ecpri.filterIndex === 1 &&
                    nextPacket.ecpri.rtcId === packets[pktId].ecpri.rtcId &&
                    nextPacket.ecpri.frameId === packets[pktId].ecpri.frameId &&
                    nextPacket.ecpri.subframeId === packets[pktId].ecpri.subframeId &&
                    nextPacket.ecpri.slotId === packets[pktId].ecpri.slotId &&
                    nextPacket.ecpri.startSymbolId === packets[pktId].ecpri.startSymbolId) {

                    foundPartPrachPacketIndex = i;

                    // create function to get iq samples for packet
                    const u = ecpri_uInPkt[i];
                    const ecpri = nextPacket.ecpri;
                    const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;
                    const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10 + ecpri.subframeId;
                    const finalSymbol = ( ecpri.slotId >> ( u <= 5 ? ecpri_maxU - u : 0 ) ) * 14 + ecpri.startSymbolId;

                    const iqBuf = iqBuffers[u][antId];
                    const iqBufOff = iqOffsets[u][antId][finalSubframe][finalSymbol];
                    const iq = new Float32Array( iqBuf.buffer, iqBufOff * 4, iqNumPrb[u][antId][finalSubframe][finalSymbol] * 24 );

                    let i_samples_next = [];
                    let q_samples_next = [];

                    for(let i = 0; i < ecpri.sections.length; ++i){
                        const startPrb = ecpri.sections[i].startPrb * 24;
                        const endPrb = ecpri.sections[i].numPrb * 24 + startPrb;

                        let i_filtered = iq.filter((_, id) => id >= startPrb && id < endPrb && id % 2 === 0);
                        let q_filtered = iq.filter((_, id) => id >= startPrb && id < endPrb && id % 2 === 1);
                        i_samples_next = i_samples_next.concat(Array.from(i_filtered));
                        q_samples_next = q_samples_next.concat(Array.from(q_filtered));
                    }
                    // end of this function
                    nextPacket.i_samples = i_samples_next
                    nextPacket.q_samples = q_samples_next
                    packetsInds.push(i)
                    packetsPrach.push(nextPacket)
                }
            }
        }

        packetsInds.sort(function (a, b) {
            return a - b
        })

        const sortedPacketsPrach = packetsPrach.sort(function (a, b) {
            return a.ecpri.sections[0].startPrb - b.ecpri.sections[0].startPrb;
        });

        let i_samplesCombined = currentPacket.i_samples;
        let q_samplesCombined = currentPacket.q_samples;

        for (let r = 1; r < sortedPacketsPrach.length; r++) {
            if (parseInt(sortedPacketsPrach[r - 1].ecpri.sections[0].startPrb) + parseInt(sortedPacketsPrach[r - 1].ecpri.sections[0].numPrb) !== parseInt(sortedPacketsPrach[r].ecpri.sections[0].startPrb)) {
                alert("Cannot decode PRACH");
                return 0;
            }
        }

        for (let r = 1; r < sortedPacketsPrach.length; r++) {
            i_samplesCombined = i_samplesCombined.concat(sortedPacketsPrach[r].i_samples);
            q_samplesCombined = q_samplesCombined.concat(sortedPacketsPrach[r].q_samples);
        }

        i_samples = i_samplesCombined.slice(1, 840);
        q_samples = q_samplesCombined.slice(1, 840);

    } else if (filterIndex === 3 && i_samples.length !== 139) {
        i_samples = i_samples.slice(2,141);
        q_samples = q_samples.slice(2,141);
    }

    ecpri_decodePrach(new M(i_samples, q_samples),null);
}

function findPacketWithValue(column, value){
    const path = getPathFromFullColName(column);
    for(let i = 0; i < filteredPacketsIdsLength; i++) {
        if( getPacketValue( packets[filteredPacketsIds[i]],null,path) == value) return i;
    }
    return -1;
}

function vertHorViewToggle(){
    let packetTableObject = document.querySelector("#packetTable");
    if (packetTableObject.classList.contains("viewToggle")) {
        packetTableObject.classList.remove("viewToggle"); // changing to horizntal view
        }
    else{
        packetTableObject.classList.add("viewToggle");
    }

}

function hacRx_generate_packet_details(pktBuffer, pktOff, pktLength) {
    let data = [];
    for (let i = 0; i < (pktLength / 16); i++) {
        const ptr = new Uint8Array( pktBuffer, pktOff );

        let debugTrace = {};

        debugTrace.errorCode = (ptr[0] + (ptr[1] * 2 ** 8) + (ptr[2] * 2 ** 16) + (ptr[3] * 2 ** 24) + (ptr[4] * 2 ** 32) + (ptr[5] * 2 ** 40) + (ptr[6] * 2 ** 48)) & 0x3FFFFFFFFFFFFF;
        debugTrace.eventType = (ptr[6] >> 6) | (ptr[7] & 0x3);
        debugTrace.severity = `${(ptr[7] >> 2) & 0x3}` + ' - ' + `${packetPropToStrMap['hacrx.severity'][((ptr[7] >> 2) & 0x3)]}`;
        debugTrace.taskTag = ptr[7] >> 4;
        debugTrace.timestamp = (ptr[8] | ptr[9] << 8 | ptr[10] << 16 | ptr[11] << 24) & 0x7FFFFFF;
        debugTrace.sourceId = `${ptr[11] >> 3}` + ' - ' + `${packetPropToStrMap['hacrx.sourceId'][ptr[11] >> 3]}`;
        debugTrace.taskId = numToHex4Upper(ptr[12] | ptr[13] << 8 | ptr[14] << 16 | ptr[15] << 24);

        data.push(debugTrace)

        pktOff += 16;
    }

    return new TableBuilder().ColumnsFromObject(data[0]).SetData(data).BuildHTML()
}

function compare_delete (id) {
    const rowId = comparisionPktRowIds[id];

    packetTable_body.rows[sortedPacketsIds[packetTable_startPktIdx + rowId]].classList.remove('comparing');
    comparisionPktIds = comparisionPktIds.filter((value) => value !== sortedPacketsIds[packetTable_startPktIdx + rowId]);
    comparisionPktRowIds = comparisionPktRowIds.filter((value) => value !== rowId);
    if (comparisionPktIds.length < 2) packetsTab_compareButton.disabled = true;
    packetsTab_compareButton.value = 'Compare ' + comparisionPktIds.length + '/4';

    packetsTab_comparePackets();
}
