const columnDetailsDialog = /** @type {ColumnDetailsDialog} */ getElementById( 'columnDetailsDialog' );
const columnDetailsDialog_columnName = getElementById( 'columnDetailsDialog_columnName' );
const columnDetailsDialog_columnType = getElementById( 'columnDetailsDialog_columnType' );
const columnDetailsDialog_valuesTable_container = getElementById( 'columnDetailsDialog_valuesTable_container' );
const columnDetailsDialog_valuesTable = getElementById( 'columnDetailsDialog_valuesTable' );
const columnDetailsDialog_valuesTable_head = columnDetailsDialog_valuesTable.tHead;
const columnDetailsDialog_valuesTable_body = columnDetailsDialog_valuesTable.tBodies[0];
const columnDetailsDialog_summaryTable = getElementById( 'columnDetailsDialog_summaryTable' );
const columnDetailsDialog_graph = getElementById("columnDetailsDialog_graph");
const columnDetailsDialog_graph_noDataMessage = getElementById('columnDetailsDialog_graph_noDataMessage');

const columnDetailsDialog_dateFormat_div = getElementById("columnDetailsDialog_dateFormat_div");
const columnDetailsDialog_arrayIndex = getElementById('columnDetailsDialog_arrayIndex');
const columnDetailsDialog_arrayIndex_div = getElementById('columnDetailsDialog_arrayIndex_div');
const columnDetailsDialog_totalValues = getElementById( 'columnDetailsDialog_totalValues' );
const columnDetailsDialog_logAvg = getElementById('columnDetailsDialog_logAvg');

const columnDetailsDialog_editAll_input = getElementById("columnDetailsDialog_editAll_input");


class ColumnDetailsDialog extends Dialog {

    constructor(){
        super("Column Details Dialog");

        Action_OnColumnDetailsDialogRefresh.Subscribe(this._handlePacketTableUpdated.bind(this));
    }

    getFromUI() {

    }
    setToUI() {

    }

    refresh(){
        // Update data
        columnDetailsDialog_logAvg.innerHTML = "";
        columnDetailsDialog_valuesTable_container.scrollTop = 0;
        columnDetailsDialog_summaryTable.innerHTML = "";

        columnDetailsDialog_columnName.textContent = `${packetTable_selectedColumnName} [${packetTable_filteredColumnNames.indexOf(packetTable_selectedColumnName)}]`;
        columnDetailsDialog_columnType.textContent = packetTable_selectedColumnType

        let values = getColumnValues(packetTable_selectedColumnName);

        let values_to_plot = values;
        const valueTypes = new Set();
        values.forEach(value => valueTypes.add(typeof value));
        if (valueTypes.has('string') && valueTypes.size === 1 && packetTable_selectedColumnName !== "time") {
            if (columnDetailsDialog_addArrayIndexes(values_to_plot) > 1) {
                //array values to plot
                const index = columnDetailsDialog_arrayIndex.value ? parseInt(columnDetailsDialog_arrayIndex.value) : 0;
                values_to_plot = values.map(x => x ? parseFloat(x.split(',')[index]) : undefined);
                fill_columnDetailsDialog_summaryTable(values_to_plot.toSorted()); //summery table for specific index in array
                columnDetailsDialog_graph_noDataMessage.hidden = true;
                columnDetailsDialog_arrayIndex_div.hidden = false;
                columnDetailsDialog_graph.hidden = false;
            } else {
                //string with no values to plot
                columnDetailsDialog_graph_noDataMessage.hidden = false;
                columnDetailsDialog_arrayIndex_div.hidden = true;
                columnDetailsDialog_graph.hidden = true;
            }
        } else {
            //numbers to plot
            columnDetailsDialog_graph_noDataMessage.hidden = true;
            columnDetailsDialog_arrayIndex_div.hidden = true;
            columnDetailsDialog_graph.hidden = false;
        }

        const ids = Array(values.length).fill(0).map((_, id) => id)
        columnDetailsDialog_graph.graph2d.setZoom(0, 0, 1, 1);
        if (packetTable_selectedColumnName !== "time")
            columnDetailsDialog_graph.graph2d.draw([ids], [values_to_plot.slice()]);
        else
            columnDetailsDialog_graph.graph2d.draw([ids], [values_to_plot.slice().map((x) => Number(x))]);

        if (valueTypes.has('string'))
            values.sort();
        else
            values.sort(function (a, b) {
                return Number(a) - Number(b);
            });


        packetTable_valueCounterSelArr = new Array(sortedPacketsIdsLength);

        let curIdx = -1;
        let lastValue = '~';

        for (let i = column_details_sortAscending ? 0 : values.length - 1; column_details_sortAscending ? i < values.length : i >= 0; column_details_sortAscending ? ++i : --i) {
            if (values[i] !== lastValue) {
                lastValue = values[i];
                packetTable_valueCounterSelArr[++curIdx] = {'v': values[i], 'c': 1, 'selected': true};
            } else {
                packetTable_valueCounterSelArr[curIdx].c++;
            }
        }

        if (!valueTypes.has('string')) //summary only avalible for numerical values
            fill_columnDetailsDialog_summaryTable(values);

        packetTable_valueCounterSelArr.length = curIdx + 1;
        if (column_details_sortByCount && column_details_sortAscending)
            packetTable_valueCounterSelArr.sort(function (a, b) {
                return b.c - a.c;
            });
        else if (column_details_sortByCount && !column_details_sortAscending)
            packetTable_valueCounterSelArr.sort(function (a, b) {
                return a.c - b.c;
            });

        columnDetailsDialog_valuesTable_body.innerHTML = '';
        columnDetailsDialog_valuesTable_head.innerHTML =
            `<tr>
        <td><input type="checkbox" id="columnDetailsDialog_checkAll" onchange="columnDetailsDialog_toggleAllCheckboxes()" checked></td>
        <td style=" color: blue; cursor: pointer;" onclick="columnDetailsDialog_changeSorting(true)">count &#8597;</td>
        <td style=" color: blue; cursor: pointer;" onclick="columnDetailsDialog_changeSorting(false)">value &#8597;</td>
        <td>%</td>
    </tr>`;

        let packetsCount = (showAllValuesColName === packetTable_selectedColumnName)
            ? packetTable_valueCounterSelArr.length
            : Math.min(packetTable_valueCounterSelArr.length, 50);

        for (let i = 0; i < packetsCount; ++i) {
            const obj = packetTable_valueCounterSelArr[i];
            let row = columnDetailsDialog_valuesTable_body.insertRow(-1);
            const value = obj.v;
            let valueStr = value;
            if (value !== undefined) {
                if (packetPropToValue.hasOwnProperty(packetTable_selectedColumnName)) valueStr = packetPropToValue[packetTable_selectedColumnName](value, true, curIdx);
                if (config.packetsTab.namedRows && packetPropToStrMap.hasOwnProperty(packetTable_selectedColumnName) && packetPropToStrMap[packetTable_selectedColumnName].hasOwnProperty(value)) {
                    valueStr += ` - ${packetPropToStrMap[packetTable_selectedColumnName][value]}`;
                }
            } else {
                valueStr = "";
            }
            const checkbox = `<input type="checkbox" checked onclick="columnDetailsDialog_handleCheckboxClick(this, ${i})">`;
            row.innerHTML =
                `<tr>
                <td>${checkbox}</td>
                <td>${obj.c}</td>
                <td>${valueStr}</td>
                <td>${calcPercentFixed2(obj.c, sortedPacketsIdsLength)}</td>
            </tr>`;
        }

        if (showAllValuesColName !== packetTable_selectedColumnName && packetTable_valueCounterSelArr.length > 50) {
            columnDetailsDialog_totalValues.innerHTML = `Unique values (displayed/all): 50/${packetTable_valueCounterSelArr.length}` +
                `<input type='button' id="column-details-show-all-button" value='Show all'  onclick='columnDetailsDialog_triggerShowAll("${packetTable_selectedColumnName}")'>`
            columnDetailsDialog_totalValues.style.display = "block";
        } else
            columnDetailsDialog_totalValues.style.display = "none";

        columnDetailsDialog_dateFormat_div.hidden = packetTable_selectedColumnName !== "time";

        // Below include column specific buttons and functionalities
        if (packetTable_selectedColumnName === 'ecpri.sections[0].rms_dBFS') {
            columnDetailsDialog_logAvg.hidden = false;
            logarithmicMean();
        }

        if (packetTable_selectedColumnName === 'ecpri.sections[0].rms_dBm') {
            getElementById('badSamplesSortButton').hidden = false;
            getElementById('badSamplesSortButtonTT').hidden = false;
        } else {
            getElementById('badSamplesSortButton').hidden = true;
            getElementById('badSamplesSortButtonTT').hidden = true;
        }
    }

    _handlePacketTableUpdated(){
        this.refresh();
    }
}

function columnDetailsDialog_editAll(){
    const value = columnDetailsDialog_editAll_input.value;

    const pathArr = packetTable_selectedColumnName
        .replace(/\[(\w+)\]/g, '.$1')  //[0] -> .0
        .split('.')
        .filter(Boolean)

    const pathStr = pathArr.map(key => `["${key}"]`).join(''); //[ecpri,sections,0] -> ["ecpri"]["sections"]["0"]

    for(let i = 0; i < sortedPacketsIds.length; i++){
        const packetId = sortedPacketsIds[i];

        if(getPacketValue(packets[packetId],packetTable_selectedColumnName) !== undefined){
            const equation = value.replaceAll("value", `packets[${packetId}]${pathStr}`);
            eval(equation);
            // copyTracedValueToPacket(packetId, packetTable_selectedColumnName);
            modifiedPackets.add(packetId);
        }
    }

    packetTable_renderPackets();
    columnDetailsDialog.refresh();
}

function columnDetailsDialog_changeSorting(sortByCount){
    if(column_details_sortByCount === sortByCount)
        column_details_sortAscending = !column_details_sortAscending;
    else
        column_details_sortByCount = sortByCount;

    columnDetailsDialog.refresh();
}


function columnDetailsDialog_logarithmicMean(){
    if (columnDetailsDialog_columnName.textContent === 'ecpri.sections[0].rms_dBFS') {
        let values = getColumnValues(columnDetailsDialog_columnName.textContent).filter((x) => x !== undefined);
        const logVals = values.map(val=>Math.pow(10, (val - ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][config.load.iqCompMethod][config.load.iqBitWidth])/20)).map(val=>val === 1 ? 0 : val);
        const logSum = logVals.reduce((a, b) => a+b, 0);
        const logMean = logSum / logVals.length;
        const logAvg = logMean <= 0 ? 0 : 20*Math.log10(logMean)
        const logAvgAdjusted = logAvg + ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][config.load.iqCompMethod][config.load.iqBitWidth];
        columnDetailsDialog_logAvg.innerHTML = "<div style = overflow: visible, class='tooltip'>[?]<span class='tooltip_text'>Formula:<br>-Conversion from dBFS to linear scale<br>-Linear avarage<br>-Conversion from linear to dBFS scale:<br>20 * Math.log10(logMean) + ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][config.load.iqCompMethod][config.load.iqBitWidth]<br> <br>Real values:<br>20 *"+Math.log10(logMean)+" + "+ecpri_dBFS_interfaceResolution[config.load.iqScalingMode][config.load.iqCompMethod][config.load.iqBitWidth]+"</span>  </div>";
        columnDetailsDialog_logAvg.innerHTML += "dBFS Avg: " ;
        columnDetailsDialog_logAvg.innerHTML += logAvgAdjusted.toFixed(2);
    }
    else
        columnDetailsDialog_logAvg.innerHTML = "Aviable for dBFS column only";
}

function fill_columnDetailsDialog_summaryTable(values){
    columnDetailsDialog_summaryTable.innerHTML = "";
    if(typeof(values[0]) === "number"){
        const values_without_undefined = values.filter((x) => x !== undefined);
        const minVal = toFixed(values_without_undefined[0], 4);
        const maxVal = toFixed(values_without_undefined[values_without_undefined.length-1], 4);
        const sum = toFixed(values_without_undefined.reduce((a, b) => a+b, 0), 2);
        const avg = toFixed((sum/values_without_undefined.length), 2);
        const median = toFixed(calculate_median(values_without_undefined), 2);

        columnDetailsDialog_summaryTable.innerHTML += "Min: " + minVal + ", max: " + maxVal + "</br>";
        columnDetailsDialog_summaryTable.innerHTML += "Sum: " + sum+"</br>";
        columnDetailsDialog_summaryTable.innerHTML += "Lin Avg: " + avg+"</br>";
        columnDetailsDialog_summaryTable.innerHTML += "Median: " + median+"</br>";
        columnDetailsDialog_summaryTable.innerHTML += "Count: " + values_without_undefined.length+"</br>";
    }
}

function columnDetailsDialog_addArrayIndexes(values){
    let len = 0;
    for(let i = 0; i < values.length && len < 20; i++){
        if(values[i]){
            let splited = values[i].split(',');
            if(splited && splited.length && splited.length > len)
                len = splited.length;
        }
    }
    if(len >= 20) return 0;
    let elements = ''
    for(let i = 0; i < len; i++){
        elements += '<option value="'+i+'">'+i+'</option>';
    }
    columnDetailsDialog_arrayIndex.innerHTML = elements;
    return len;
}

function columnDetailsDialog_changeArrayIndexes(){
    let values_to_plot = getColumnValues(packetTable_selectedColumnName);
    const valueTypes = new Set();
    values_to_plot.forEach(value => valueTypes.add(typeof value));
    if(valueTypes.has('string')){
        const index = columnDetailsDialog_arrayIndex.value ? parseInt(columnDetailsDialog_arrayIndex.value) : 0;
        values_to_plot = values_to_plot.map(x => x && x.split(',').length>index ? parseFloat(x.split(',')[index]) : undefined);
    }

    fill_columnDetailsDialog_summaryTable(values_to_plot.toSorted());

    const ids = Array(values_to_plot.length).fill(0).map((_, id) => id)
    columnDetailsDialog_graph.graph2d.setZoom(0, 0, 1, 1);
    if(packetTable_selectedColumnName !== "time")
        columnDetailsDialog_graph.graph2d.draw([ids], [values_to_plot.slice()]);
    else
        columnDetailsDialog_graph.graph2d.draw([ids], [values_to_plot.slice().map((x) => Number(x))]);
}

columnDetailsDialog_valuesTable_container.onscroll = function() {
    // scrollHeight = packetsTab_body.scrollHeight - packetsTab_body.clientHeight;

    const scrollTop = packetsTab_body.scrollTop;
}

function columnDetailsDialog_dateFormat( val ){
    if(time_format_display === val) return;

    time_format_display = val;
    packetTable_renderPackets();

}

function columnDetailsDialog_handleCheckboxClick(event, index){
    packetTable_valueCounterSelArr[index].selected = event.checked;
    columnDetailsDialog_updateCheckAllState();
}

function columnDetailsDialog_updateCheckAllState() {
    const checkAll = getElementById("columnDetailsDialog_checkAll");
    const checkboxes = columnDetailsDialog_valuesTable_body.getElementsByTagName('input');
    checkAll.checked = Array.from(checkboxes).every(checkbox => checkbox.checked);
}

function columnDetailsDialog_toggleAllCheckboxes() {
    const checkAll = getElementById("columnDetailsDialog_checkAll");
    const value = checkAll.checked;
    const checkboxes = columnDetailsDialog_valuesTable_body.getElementsByTagName('input');
    for(let i = 0; i < checkboxes.length; ++i) {
        checkboxes[i].checked = value;
    }
    packetTable_valueCounterSelArr = packetTable_valueCounterSelArr.map(o => {o.selected = value; return o});
}


function columnDetailsDialog_filterChecked(andSet = false){
    if(packetTable_valueCounterSelArr.every(elem=>elem.selected === false)) return;

    if(packetTable_valueCounterSelArr.every(elem=>elem.selected === true) && andSet) return;

    const filters = [];
    for(let i = 0; i < packetTable_valueCounterSelArr.length; ++i){
        let obj = packetTable_valueCounterSelArr[i];
        if(obj.selected === false) continue;

        let v = obj.v;

        if(Number(v) != v && v !== undefined) v = `"${ v }"`;
        // filters.push(`@${packetTable_selectedColumnName}===${ obj.v !== '' ? obj.v:'\"\"' }`);
        filters.push(`@${packetTable_selectedColumnName} == ${ v }`);
    }
    let filter = filters.join(' || ');

    const oldFilter = packetsTab_header_filterInput.value;
    if(andSet && oldFilter.length > 0){
        filter = `(${oldFilter}) && (${filter})`;
    }

    packetsTab_filterPackets(filter);
}

function columnDetailsDialog_sortPackets( mode ) {
    sortPackets( columnDetailsDialog_columnName.textContent, mode );
    packetTable_renderPackets();
}

function columnDetailsDialog_triggerShowAll( colName ) {
    showAllValuesColName = colName;
    columnDetailsDialog.refresh();
}

function columnDetailsDialog_arrayToMultipleColumns(name = packetTable_selectedColumnName){
    let values = getColumnValues(name);

    let columnSize = 0;
    for(let value of values){
        if(typeof value === "string"){
            const arr = value.split(',');
            if(arr.length > 1 && arr.length > columnSize) columnSize = arr.length;
        }
    }

    for(let i = columnSize-1; i >= 0 ; i--){
        let newColumnValues = [];
        for(let j = 0; j < values.length; j++){
            let value = values[j];
            if(typeof value === "string"){
                const arr = value.split(',');
                if(i < arr.length)
                    newColumnValues[j] = parseFloat(arr[i]);
            }
        }

        packetTable_addColumn(name + '['+i+']', newColumnValues, name, null);
    }
}

function columnDetailsDialog_find(){
    const value = getElementById("columnDetailsDialog_findInput").value;
    const id = findPacketWithValue(packetTable_selectedColumnName, value);

    if(id === -1) {
        logError( 'Filer', 'No packet with that value found! Try to clear filters and try again!' );
        return;
    }
    const idStart = sortedPacketsIds.findIndex((x) => x === id);

    const rows_to_delete_and_add = packetTable_body.rows.length; //In case there are less than 200 packets rendered
    const start_render = sortedPacketsIds.length - idStart < rows_to_delete_and_add ? sortedPacketsIds.length-rows_to_delete_and_add : idStart;

    packetTable_selectedRowIdx = idStart - start_render;
    packetTable_startPktIdx = start_render;
    packetsTab_body.scrollTop = 1 + 13*(idStart-start_render);

    for(let i = 0; i < rows_to_delete_and_add; i++) packetTable_body.deleteRow( 0 );

    for(let i = start_render; i < Math.min(idStart+rows_to_delete_and_add, sortedPacketsIds.length); i++) {
        packetTable_addPacket( i );
    }

    packetTable_body.rows[packetTable_selectedRowIdx].classList.add( 'selected' );
}

customElements.define('bba-column-details-dialog', ColumnDetailsDialog);
