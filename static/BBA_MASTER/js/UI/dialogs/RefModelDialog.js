const refModelDialog = /** @type {RefModelDialog} */ getElementById('refModelDialog');

const refModelDialog_mantissa = getElementById('refModelDialog_mantissa');
const refModelDialog_timingWindow = getElementById('refModelDialog_timingWindow');
const refModelDialog_numerology = getElementById('refModelDialog_numerology');
const refModelDialog_staticLongPucch = getElementById('refModelDialog_staticLongPucch');
const refModelDialog_timeDensity = getElementById('refModelDialog_timeDensity');
const refModelDialog_mac73 = getElementById('refModelDialog_mac73');
const refModelDialog_mac72 = getElementById('refModelDialog_mac72');
const refModelDialog_mac_proxy73_72 = getElementById('refModelDialog_mac_proxy73_72');
const refModelDialog_timestamps = document.getElementsByName( 'refModelDialog_timestamps' );
const refModelDialog_genSplit72 = getElementById('refModelDialog_genSplit72');
const refModelDialog_genProxy73_72 = getElementById('refModelDialog_genProxy73_72');

const refModelDialog_cplane_ul_advance72 = getElementById('refModelDialog_cplane_ul_advance72');
const refModelDialog_cplane_dl_advance72 = getElementById('refModelDialog_cplane_dl_advance72');
const refModelDialog_uplane_ul_advance72 = getElementById('refModelDialog_uplane_ul_advance72');
const refModelDialog_uplane_dl_advance72 = getElementById('refModelDialog_uplane_dl_advance72');

const refModelDialog_cplane_ul_advance73 = getElementById('refModelDialog_cplane_ul_advance73');
const refModelDialog_cplane_dl_advance73 = getElementById('refModelDialog_cplane_dl_advance73');
const refModelDialog_uplane_ul_advance73 = getElementById('refModelDialog_uplane_ul_advance73');
const refModelDialog_uplane_dl_advance73 = getElementById('refModelDialog_uplane_dl_advance73');

const refModelDialog_subcells_count = getElementById('refModelDialog_subcells_count');
const refModelDialog_subcells_table = getElementById('refModelDialog_subcells_table');

let subcellsCount = 0;
let subcellsCache = [];

class RefModelDialog extends Dialog {

    constructor(){
        super("Reference Model");

    }

    getFromUI() {
        configSpec.mantissa = parseInt(refModelDialog_mantissa.value);
        configSpec.timing_window = parseFloat(refModelDialog_timingWindow.value);
        configSpec.numerology = parseInt(refModelDialog_numerology.value);
        configSpec.staticLongPucch = refModelDialog_staticLongPucch.checked;
        configSpec.time_density = parseInt(refModelDialog_timeDensity.value);

        configSpec.mac_split73 = strToMac(refModelDialog_mac73.value);
        configSpec.mac_split72 = strToMac(refModelDialog_mac72.value);
        configSpec.mac_proxy73_72 = strToMac(refModelDialog_mac_proxy73_72.value);

        const timestampMethod = get_param_radio_int(refModelDialog_timestamps);
        configSpec.useBaseTimestamps = timestampMethod === 0;

        configSpec.generate_split72 = refModelDialog_genSplit72.checked;
        configSpec.generate_proxy73_72 = refModelDialog_genProxy73_72.checked;

        configSpec.cplane_ul_advance72 = parseInt(refModelDialog_cplane_ul_advance72.value);
        configSpec.cplane_dl_advance72 = parseInt(refModelDialog_cplane_dl_advance72.value);
        configSpec.uplane_ul_advance72 = parseInt(refModelDialog_uplane_ul_advance72.value);
        configSpec.uplane_dl_advance72 = parseInt(refModelDialog_uplane_dl_advance72.value);
        configSpec.cplane_ul_advance73 = parseInt(refModelDialog_cplane_ul_advance73.value);
        configSpec.cplane_dl_advance73 = parseInt(refModelDialog_cplane_dl_advance73.value);
        configSpec.uplane_ul_advance73 = parseInt(refModelDialog_uplane_ul_advance73.value);
        configSpec.uplane_dl_advance73 = parseInt(refModelDialog_uplane_dl_advance73.value);

        refModelDialog_getFromUI_subcells();
    }
    setToUI() {
        refModelDialog_mantissa.value = configSpec.mantissa;
        refModelDialog_timingWindow.value = configSpec.timing_window;
        refModelDialog_numerology.value =  configSpec.numerology;
        refModelDialog_staticLongPucch.checked = configSpec.staticLongPucch;
        refModelDialog_timeDensity.value = configSpec.time_density;

        refModelDialog_mac73.value = macToStr( configSpec.mac_split73);
        refModelDialog_mac72.value = macToStr( configSpec.mac_split72);
        refModelDialog_mac_proxy73_72.value = macToStr( configSpec.mac_proxy73_72);

        const timestampMethod = configSpec.useBaseTimestamps ? 0 : 1;
        set_param_radio_int(refModelDialog_timestamps, timestampMethod);

        refModelDialog_genSplit72.checked = configSpec.generate_split72;
        refModelDialog_genProxy73_72.checked = configSpec.generate_proxy73_72;

        refModelDialog_cplane_ul_advance72.value = configSpec.cplane_ul_advance72;
        refModelDialog_cplane_dl_advance72.value = configSpec.cplane_dl_advance72;
        refModelDialog_uplane_ul_advance72.value = configSpec.uplane_ul_advance72;
        refModelDialog_uplane_dl_advance72.value = configSpec.uplane_dl_advance72;
        refModelDialog_cplane_ul_advance73.value = configSpec.cplane_ul_advance73;
        refModelDialog_cplane_dl_advance73.value = configSpec.cplane_dl_advance73;
        refModelDialog_uplane_ul_advance73.value = configSpec.uplane_ul_advance73;
        refModelDialog_uplane_dl_advance73.value = configSpec.uplane_dl_advance73;

        refModelDialog_setToUI_subcells();
    }

    onLoad(){
        subcellsCache = copyObject(configSpec.subcells);
        subcellsCount = subcellsCache.length;
        this.setToUI();
    }
}
customElements.define('bba-ref-model-dialog', RefModelDialog);

function refModelDialog_setToUI_subcells(){
    // Reads from subcellsCache, not config
    refModelDialog_subcells_count.value = subcellsCount;

    refModelDialog_subcells_table.innerHTML = '';

    for(let i = 0; i < subcellsCount; ++i){
        refModelDialog_subcells_table.innerHTML +=
            `<tr>\n` +
            `<td><b>Subcell ${i}</b></td>\n` +
            `</tr>\n` +
            '<tr>\n' +
            `<td><label for="refModelDialog_subcells_numCeAxCId${i}">Valid CeAxC IDs</label></td>\n` +
            `<td><input type="number" id="refModelDialog_subcells_numCeAxCId${i}" style="width: 35px" min="1" max="8" value="${subcellsCache[i].numCeAxCId}" onchange="refModelDialog_subcells_updateCeAxCs(${i})" ></td>\n` +
            `</tr>\n` +
            `<tr>\n` +
            `<td>L2L1 over eCPRI:</td>\n` +
            `<td><input id="refModelDialog_subcells_ceAxCIdcPlane${i}" style="font-size:9px; width: 35px" type="number" value="${subcellsCache[i]['ceAxCIdcPlane']}"/></td>\n` +
            `</tr>` +
            `<tr id="refModelDialog_subcells_ceAxCIdPuschIq${i}">\n` +
            `</tr>` +
            `<tr id="refModelDialog_subcells_ceAxCIdPuschSINR${i}">\n` +
            `</tr>` +
            `<tr id="refModelDialog_subcells_ceAxCId72${i}">\n` +
            `</tr>` +
            `<tr id="refModelDialog_subcells_ceAxCIdPucch73${i}">\n` +
            `</tr>` +
            `<tr id="refModelDialog_subcells_ceAxCIdPrach${i}">\n` +
            `</tr>`
        ;
    }

    refModelDialog_setToUI_subcells_fillCeAxCsAll();
}

const refModelDialog_subcells_namePropertyMap = [
    {name: 'PUSCH IQ',      property: 'ceAxCIdPuschIq'},
    {name: 'PUSCH SINR',    property: 'ceAxCIdPuschSINR'},
    {name: '7-2',           property: 'ceAxCId72'},
    {name: 'PUCCH 7-3',     property: 'ceAxCIdPucch73'},
    {name: 'PRACH',         property: 'ceAxCIdPrach'}
];

function refModelDialog_setToUI_subcells_fillCeAxCsAll() {
    refModelDialog_subcells_namePropertyMap.forEach(pair=>refModelDialog_setToUI_subcells_fillCeAxCs(pair.name, pair.property));
}

function refModelDialog_setToUI_subcells_fillCeAxCs(name, property){

    for(let i = 0; i < subcellsCount; ++i){
        const elem = getElementById(`refModelDialog_subcells_${property}${i}`);
        elem.innerHTML = `<td>${name}</td>\n`;

        const numCeAxCs = subcellsCache[i].numCeAxCId;
        for(let j = 0; j < numCeAxCs; ++j){
            elem.innerHTML +=
                `<td><input id="refModelDialog_subcells_${property}${i}_${j}" style="font-size:9px; width: 35px" type="number" min="0" value="${subcellsCache[i][property][j]}"/></td>\n`
        }
    }
}

function refModelDialog_getFromUI_subcells(){

    // update cache
    for(let i = 0; i < subcellsCount; ++i){
        const subcell = subcellsCache[i];

        subcell.ceAxCIdcPlane = parseInt(getElementById(`refModelDialog_subcells_ceAxCIdcPlane${i}`).value);

        refModelDialog_subcells_namePropertyMap.forEach(pair=>{
            const values = refModelDialog_getFromUI_subcells_CeAxCs(i, pair.property, subcell.numCeAxCId);
            for(let j = 0; j < values.length; ++j){
                subcell[pair.property][j] = values[j];
            }
        })
    }

    // truncate cache into config
    configSpec.subcells = [];
    for(let i = 0; i < subcellsCount; ++i){
        const cached = subcellsCache[i];
        const subcell = {
            numCeAxCId: cached.numCeAxCId,
            ceAxCIdcPlane: cached.ceAxCIdcPlane,
        };

        refModelDialog_subcells_namePropertyMap.forEach(pair=>{
            subcell[pair.property] = cached[pair.property].slice(0, subcell.numCeAxCId);
        })

        configSpec.subcells.push(subcell);
    }
}

function refModelDialog_getFromUI_subcells_CeAxCs(subcellId, property, count){

    const values = [];
    for(let i = 0; i < count; ++i){
        const value = parseInt(getElementById(`refModelDialog_subcells_${property}${subcellId}_${i}`).value);
        values.push(value);
    }

    return values;
}

function refModelDialog_subcells_updateCount(){
    refModelDialog_getFromUI_subcells();

    let count = parseInt(refModelDialog_subcells_count.value);
    if(count < 1) count = 1;
    if(count > 16) count = 16;

    const lastEntry = subcellsCache[subcellsCount-1];

    for(let i = subcellsCache.length; i < count; ++i){
        subcellsCache.push(copyObject(lastEntry));
    }

    subcellsCount = count;

    refModelDialog_setToUI_subcells();
}

function refModelDialog_subcells_updateCeAxCs(id){
    refModelDialog_getFromUI_subcells();

    const elem = getElementById(`refModelDialog_subcells_numCeAxCId${id}`);
    let count = parseInt(elem.value);
    if(count < 1) count = 1;
    if(count > 8) count = 8;

    for(let i = subcellsCache[id].numCeAxCId; i < count; ++i){
        subcellsCache[id]["ceAxCIdPuschIq"].push(0);
        subcellsCache[id]["ceAxCIdPuschSINR"].push(0);
        subcellsCache[id]["ceAxCId72"].push(0);
        subcellsCache[id]["ceAxCIdPucch73"].push(0);
        subcellsCache[id]["ceAxCIdPrach"].push(0);
    }

    subcellsCache[id].numCeAxCId = count;
    refModelDialog_setToUI_subcells_fillCeAxCsAll();
}

function refModelDialog_generate(){
    refModelDialog.getFromUI();
    test_73_split_model_bip();
}