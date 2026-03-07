const packetsTabCompareDialog = /** @type {PacketsTabCompareDialog} */ getElementById('packetsTabCompareDialog');

const packetsTabCompareDialog_propertiesNotCompared = getElementById('packetsTabCompareDialog_propertiesNotCompared');
const comparePacketsDialog_propTable = getElementById('comparePacketsDialog_propTable');
const comparePacketsDialog_propTable_body = comparePacketsDialog_propTable.tBodies[0];
const comparePacketsDialog_propTable_column1 = getElementById('compare_1');
const comparePacketsDialog_propTable_column2 = getElementById('compare_2');
const comparePacketsDialog_propTable_column3 = getElementById('compare_3');
const comparePacketsDialog_propTable_column4 = getElementById('compare_4');

class PacketsTabCompareDialog extends Dialog {

    constructor(){
        super("Compare packets");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-packets-tab-compare-dialog', PacketsTabCompareDialog);

function packetsTab_comparePackets() {
    comparePacketsDialog_propTable_column1.hidden = true;
    comparePacketsDialog_propTable_column2.hidden = true;
    comparePacketsDialog_propTable_column3.hidden = true;
    comparePacketsDialog_propTable_column4.hidden = true;
    let propTableStr = '';

    let propertiesWithValues = {};

    // get all unique properties
    let uniqueProps = new Set();
    for (const pktId of comparisionPktIds) {
        const pkt = packets[pktId];
        const colNamesWithVals = getPacketsColumnsWithValues(pkt);
        propertiesWithValues[pktId] = colNamesWithVals;
        for (const propName in colNamesWithVals) {
            uniqueProps.add(propName);
        }
    }
    let uniquePropsArr = Array.from(uniqueProps);
    uniquePropsArr.sort((a, b) => packetTable_allColumnNames.indexOf(a) - packetTable_allColumnNames.indexOf(b));

    // loop through all properties and create rows in table
    for (const propName of uniquePropsArr) {
        let diffValClass = '';
        let propVals = [];
        let uniquePropVals = new Set();

        // check if there are differences in property
        for (const pktId of comparisionPktIds) {
            if (propertiesWithValues[pktId].hasOwnProperty(propName)) {
                propVals.push( propertiesWithValues[pktId][propName] );

                if(Array.isArray( propertiesWithValues[pktId][propName] )){
                    uniquePropVals.add( JSON.stringify( propertiesWithValues[pktId][propName] ) )
                }
                else{
                    uniquePropVals.add( propertiesWithValues[pktId][propName] );
                }
            }
            else {
                propVals.push('');
                uniquePropVals.add('');
            }
        }

        const columnsNotCompared = ['id', 'responseTime[us]'];
        packetsTabCompareDialog_propertiesNotCompared.innerHTML = '<h3>Columns not compared: ' + columnsNotCompared.join(', ') + '</h3>';
        if ((uniquePropVals.size !== 1) && (!columnsNotCompared.includes(propName))) diffValClass = 'class = "different"'

        propTableStr += `<tr ${diffValClass}><td>${propName}</td>`;

        // loop through values to create columns in row
        for (let i = 0; i < propVals.length; i++) {
            const pktId = comparisionPktIds[i];
            const prop = propVals[i];

            let propStr = packetPropToValue.hasOwnProperty(propName) ? packetPropToValue[propName](prop, false, pktId) : prop;

            if (packetPropToStrMap.hasOwnProperty(propName) && packetPropToStrMap[propName].hasOwnProperty(prop)) {
                propStr += ` - ${packetPropToStrMap[propName][prop]}`;
            }

            if (Array.isArray(prop) && prop.length === 0) {
                propStr += '[empty array]';
            }

            const name = getEnumMemberName(propName, pktId);
            if (name) {
                propStr += ` - ${name}`;
            }
            if (propStr !== '') {
                propTableStr += `<td>${propStr}</td>`;
            } else {
                propTableStr += `<td class="empty_val">${propStr}</td>`;
            }
        }

        propTableStr += '</tr>';
    }
    comparePacketsDialog_propTable_body.innerHTML = propTableStr;

    for (let i = 0; i < comparisionPktIds.length; i++) {
        getElementById(`compare_${i + 1}`).hidden = false;
    }

    packetsTabCompareDialog.open();
}