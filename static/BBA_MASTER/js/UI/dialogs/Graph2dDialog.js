const graph2dDialog = /** @type {Graph2dDialog} */ getElementById( 'graph2dDialog' );

const graph2dDialog_setMode = document.getElementsByName( 'graph2dDialog_setMode' );
const graph2dDialog_trendlineCheckbox = getElementById( 'graph2dDialog_trendlineCheckbox' );

let graph2d_selected = null;

class Graph2dDialog extends Dialog {

    constructor(){
        super("Graph settings");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-graph2d-dialog', Graph2dDialog);

function graph2dDialog_refreshView(){
    set_param_radio_int( graph2dDialog_setMode, graph2d_selected.mode );
    graph2dDialog_trendlineCheckbox.checked = graph2d_selected.drawTrendline;
}

function graph2dDialog_setModePoint(){graph2d_selected?.setModePoint();}
function graph2dDialog_setModeLine(){graph2d_selected?.setModeLine();}
function graph2dDialog_setModeBar(){graph2d_selected?.setModeBar();}
function graph2dDialog_setModeThickbar(){graph2d_selected?.setModeThickbar();}

function graph2dDialog_fullscreen(){graph2d_selected?.fullscreen();}
function graph2dDialog_normalscreen(){graph2d_selected?.normalscreen();}

function graph2dDialog_trendlineHandler(checkbox){graph2d_selected?.setTrendline(checkbox.checked);}
function graph2dDialog_trendRemove(){graph2d_selected?.trendRemove();}
function graph2dDialog_differential(){graph2d_selected?.differential();}
function graph2dDialog_zoomReset(){graph2d_selected?.zoomReset();}

function graph2dDialog_sortData(){graph2d_selected?.sortData();}
function graph2dDialog_downloadData(){graph2d_selected?.downloadData();}