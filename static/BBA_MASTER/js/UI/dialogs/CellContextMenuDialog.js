const cellContextMenuDialog = /** @type {CellContextMenuDialog} */ getElementById('cellContextMenuDialog');

const cellContextMenuDialog_columnName = getElementById('cellContextMenuDialog_columnName');
const cellContextMenuDialog_cellValue = getElementById('cellContextMenuDialog_cellValue');
const cellContextMenuDialog_hideButton = getElementById('cellContextMenuDialog_hideButton');

let cellContextMenuDialog_selectedColumnName = '';
let cellContextMenuDialog_selectedCellValue = null;
let cellContextMenuDialog_filterTab_optAnd = true;  //if true, && filters, || otherwise

let cellContextMenuDialog_packet_color_filters = []; //unique strings columnName$columnValue where last one is most important (newest) and first one is least important
let cellContextMenuDialog_packet_color_filterColors = {}; //colors corresponding to unique strings from above array


class CellContextMenuDialog extends Dialog {

    constructor(){
        super("Cell Context Menu");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-cell-context-menu-dialog', CellContextMenuDialog);

function packetTable_cell_oncontextmenu(e){
    e.preventDefault();

    const clickedCell = e.target.closest('td');
    if(clickedCell === null){
        return;
    }
    const parentRow = clickedCell.closest('tr');
    if(parentRow === null){
        return;
    }

    const maxLeft = window.innerWidth - cellContextMenuDialog.offsetWidth - 1;
    cellContextMenuDialog.style.left = `${ e.clientX <= maxLeft ? e.clientX : maxLeft }px`;
    cellContextMenuDialog.style.top = `${ e.clientY + 15 }px`;

    const packetId = sortedPacketsIds[packetTable_startPktIdx + parentRow.rowIndex - 1]; //rowIndex starts from 1
    const columnName = packetTable_visibleColumnNames[clickedCell.cellIndex];

    cellContextMenuDialog_selectedColumnName = columnName;
    cellContextMenuDialog_selectedCellValue = getPacketValue(packets[packetId],columnName);

    cellContextMenuDialog_updateUI();

    cellContextMenuDialog.open();
}

function cellContextMenuDialog_updateUI(){

    const columnName = `@${cellContextMenuDialog_selectedColumnName}`;

    cellContextMenuDialog_hideButton.value = `Hide column ${columnName}`;

    cellContextMenuDialog_columnName.textContent = columnName;
    cellContextMenuDialog_cellValue.textContent = cellContextMenuDialog_selectedCellValue;

}

function cellContextMenuDialog_hideColumn(){

    if( !config.packetsTab.hiddenColumnNames.includes( cellContextMenuDialog_selectedColumnName ) ) {
        config.packetsTab.hiddenColumnNames.push(cellContextMenuDialog_selectedColumnName);
    }

    config.packetsTab.hiddenColumnNames = config.packetsTab.hiddenColumnNames.sort();

    cellContextMenuDialog.close();

    packetsTabCustomizeDialog_updateVisibleColumns();
    packetTable_renderColumns();
    packetTable_renderPackets();

}

function cellContextMenuDialog_filterTab_setOptAnd(){
    cellContextMenuDialog_filterTab_optAnd = true;
}
function cellContextMenuDialog_filterTab_setOptOr(){
    cellContextMenuDialog_filterTab_optAnd = false;
}

function cellContextMenuDialog_filterTab_filter(option){
    const columnName = `@${cellContextMenuDialog_selectedColumnName}`;
    const type = typeof(cellContextMenuDialog_selectedCellValue);
    const value = (type === 'number' || type === 'undefined' || type == "boolean") ? cellContextMenuDialog_selectedCellValue : `"${cellContextMenuDialog_selectedCellValue}"`;

    let filter = `${columnName} ${option} ${value}`;

    const oldFilter = packetsTab_header_filterInput.value;
    const link = cellContextMenuDialog_filterTab_optAnd ? '&&': '||';
    if(oldFilter.length > 0){
        filter = `(${oldFilter}) ${link} ${filter}`;
    }

    packetsTab_header_filterInput.value = filter;
    packetsTab_filterPackets(filter);
}


function cellContextMenuDialog_get_color_filter_key(columnName, columnValue){
    return columnValue!=undefined ? columnName + "$" + columnValue.toString() :  columnName + "$";
}

function cellContextMenuDialog_set_color_filter(color){
    const columnName = `${cellContextMenuDialog_selectedColumnName}`;
    const value =  cellContextMenuDialog_selectedCellValue
    const filterKey = cellContextMenuDialog_get_color_filter_key(columnName,value);

    if (color === "clear all") {
        cellContextMenuDialog_packet_color_filters = [];
        cellContextMenuDialog_packet_color_filterColors = {};
    }
    else if (color === "") {
        for(let i = 0; i<cellContextMenuDialog_packet_color_filters.length; i++){
            if(cellContextMenuDialog_packet_color_filters[i] === filterKey){
                cellContextMenuDialog_packet_color_filters.splice(i,1);
                delete cellContextMenuDialog_packet_color_filterColors[filterKey];
                break;
            }
        }
    }
    else {
        let already_exists = false;
        for(let i = 0; i<cellContextMenuDialog_packet_color_filters.length; i++){
            if(cellContextMenuDialog_packet_color_filters[i] === filterKey){
                cellContextMenuDialog_packet_color_filterColors[filterKey] = color;
                already_exists = true;
                break;
            }
        }
        if(!already_exists){
            cellContextMenuDialog_packet_color_filters.push(filterKey);
            cellContextMenuDialog_packet_color_filterColors[filterKey] = color;
        }

    }

    for(let i=0; i<packetTable_body.rows.length; i++){
        if(packetTable_body.rows[i] == undefined) break;
        packetsTab_colorizePacket(i,i + packetTable_startPktIdx);

    }
}