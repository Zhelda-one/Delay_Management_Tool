const packetsTabCustomizeDialog = /** @type {PacketsTabCustomizeDialog} */ getElementById('packetsTabCustomizeDialog');

const packetsTabCustomizeDialog_visibleColumnsTable = getElementById( 'packetsTabCustomizeDialog_visibleColumnsTable' );

class PacketsTabCustomizeDialog extends Dialog {

    constructor(){
        super("Customize");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-packets-tab-customize-dialog', PacketsTabCustomizeDialog);

function packetsTabCustomizeDialog_visibleColumnsTable_onClick( e ) {
    const parName = e.id.slice( 10 );
    const colStart = `selCol_${ parName }`;
    const parentColStart = `selColPar_${ parName }.`
    const columns = packetsTabCustomizeDialog_visibleColumnsTable.tBodies[0].getElementsByTagName( 'input' );
    for( const column of columns ) {
        if( column.id.startsWith( colStart ) || column.id.startsWith( parentColStart ) ) column.checked = e.checked;
    }
}

function packetsTabCustomizeDialog_updateVisibleColumns() {
    const perfNow = performance.now();
    const tBody = packetsTabCustomizeDialog_visibleColumnsTable.tBodies[0];
    const rowCount = tBody.rows.length;
    for( let i = 0; i < rowCount; ++i ) tBody.deleteRow( -1 );

    let lastColSplit = [];
    let innerHtml = '';
    for(let i = 0; i < packetTable_filteredColumnNames.length; ++i ) {
        const colName = packetTable_filteredColumnNames[i];
        const isChecked = !config.packetsTab.hiddenColumnNames.includes( colName );
        const colSplit = colName.split( '.' );

        for( let j = 0; j < colSplit.length - 1; ++j ) {
            if( lastColSplit.length < j || lastColSplit[j] !== colSplit[j] ) {
                const parentName = colSplit.slice( 0, j + 1 ).join( '.' );
                innerHtml += `<tr><td><input type="checkbox" id="selColPar_${ parentName }" onclick="packetsTabCustomizeDialog_visibleColumnsTable_onClick( this )"></td><td>${ '&boxv;&nbsp;'.repeat( Math.max( 0, j ) ) }&boxvr;&nbsp;&nbsp;${ parentName }</td></tr>`;
            }
        }
        lastColSplit = colSplit;

        innerHtml += `<tr><td><input type="checkbox" id="selCol_${ colName }" ${ isChecked ? 'checked' : '' }></td><td>${ '&boxv;&nbsp;'.repeat( Math.max( 0, colSplit.length ) ) }${ colSplit.length >= 0 ? '&boxvr;&nbsp;&nbsp;' : '' }${ colName } [${i}] </td></tr>`;
    }
    tBody.innerHTML = innerHtml;

    const columns = packetsTabCustomizeDialog_visibleColumnsTable.tBodies[0].getElementsByTagName( 'input' );
    for( const column of columns ) {
        if( column.id.startsWith( 'selColPar_' ) ) {
            const colStart = `selCol_${ column.id.substr( 10 ) }`;
            let isChecked = false;
            for( const column of columns ) {
                if( column.id.startsWith( colStart ) && column.checked ) isChecked = true;
            }
            column.checked = isChecked;
        }
    }

    if( tBody.rows.length === 0 ) tBody.innerHTML = '<tr><td>No visible packets</td></tr>';

    logDebug( 'UI', `packetsTabCustomizeDialog_updateVisibleColumns took: ${ perfToMsFrom( perfNow ) }` );
}

function packetsTabCustomizeDialog_apply() {
    let isHiddenColumnNamesUpdated = false;
    const columns = packetsTabCustomizeDialog_visibleColumnsTable.tBodies[0].getElementsByTagName( 'input' );
    for( const column of columns ) {
        if( column.id.startsWith( 'selCol_' ) ) {
            const colName = column.id.slice( 7 );
            if( !column.checked && !config.packetsTab.hiddenColumnNames.includes( colName ) ) {
                isHiddenColumnNamesUpdated = true;
                config.packetsTab.hiddenColumnNames.push( colName );
            } else if( column.checked && config.packetsTab.hiddenColumnNames.includes( colName ) ) {
                isHiddenColumnNamesUpdated = true;
                config.packetsTab.hiddenColumnNames = config.packetsTab.hiddenColumnNames.filter( v => v !== colName );
            }
        }
    }
    config.packetsTab.hiddenColumnNames = config.packetsTab.hiddenColumnNames.sort();
    if( isHiddenColumnNamesUpdated ) {
        packetTable_renderColumns();
        packetTable_renderPackets();
    }
}