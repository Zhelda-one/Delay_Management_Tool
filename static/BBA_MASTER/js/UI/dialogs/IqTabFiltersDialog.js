const iqTabFiltersDialog = /** @type {IqTabFiltersDialog} */ getElementById( 'iqTabFiltersDialog' );

const iqTabFiltersDialog_hidePacketsWithNoAmplitude = getElementById( 'iqTabFiltersDialog_hidePacketsWithNoAmplitude' );
const iqTabFiltersDialog_usePacketFilter = getElementById( 'iqTabFiltersDialog_usePacketFilter' );

const iqTabFiltersDialog_frameFilterCheckbox = getElementById('iqTabFiltersDialog_frameFilterCheckbox');
const iqTabFiltersDialog_frameFilterFrom = getElementById("iqTabFiltersDialog_frameFilterFrom");
const iqTabFiltersDialog_frameFilterTo = getElementById("iqTabFiltersDialog_frameFilterTo");
const iqTabFiltersDialog_subframeFilterCheckbox = getElementById('iqTabFiltersDialog_subframeFilterCheckbox');
const iqTabFiltersDialog_subframeFilterFrom = getElementById("iqTabFiltersDialog_subframeFilterFrom");
const iqTabFiltersDialog_subframeFilterTo = getElementById("iqTabFiltersDialog_subframeFilterTo");
const iqTabFiltersDialog_slotFilterCheckbox = getElementById('iqTabFiltersDialog_slotFilterCheckbox');
const iqTabFiltersDialog_slotFilterFrom = getElementById("iqTabFiltersDialog_slotFilterFrom");
const iqTabFiltersDialog_slotFilterTo = getElementById("iqTabFiltersDialog_slotFilterTo");
const iqTabFiltersDialog_symbolFilterCheckbox = getElementById('iqTabFiltersDialog_symbolFilterCheckbox');
const iqTabFiltersDialog_symbolFilterFrom = getElementById("iqTabFiltersDialog_symbolFilterFrom");
const iqTabFiltersDialog_symbolFilterTo = getElementById("iqTabFiltersDialog_symbolFilterTo");
const iqTabFiltersDialog_RBFilterCheckbox = getElementById('iqTabFiltersDialog_RBFilterCheckbox');
const iqTabFiltersDialog_RBFilterFrom = getElementById("iqTabFiltersDialog_RBFilterFrom");
const iqTabFiltersDialog_RBFilterTo = getElementById("iqTabFiltersDialog_RBFilterTo");

class IqTabFiltersDialog extends Dialog {

    constructor(){
        super("IQ Tab Filters Dialog");

    }

    getFromUI() {

    }
    setToUI() {
        const v = canvas_viewports[canvas_selectedViewportId];
        const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId];

        iqTab_header_antDropdown_setToUI( vf );
        iqTab_header_channelsDropdown_setToUI( vf );
        iqTabFiltersDialog_RangeFilters_setToUI( vf );

        setAriaPressed(iqTab_drawFcp, config.iqTab.drawFCP);
    }
}

iqTabFiltersDialog_hidePacketsWithNoAmplitude.addEventListener( 'change', function(e) {
    config.iqTab.hidePacketsWithNoAmplitude = iqTabFiltersDialog_hidePacketsWithNoAmplitude.checked;
    canvas_isFullRender = true;
})

function iqTabFiltersDialog_clearFilters(){
    iqTabFiltersDialog_usePacketFilter.checked = false;

    iqTabFiltersDialog_frameFilterCheckbox.checked = false;
    iqTabFiltersDialog_subframeFilterCheckbox.checked = false;
    iqTabFiltersDialog_slotFilterCheckbox.checked = false;
    iqTabFiltersDialog_symbolFilterCheckbox.checked = false;
    iqTabFiltersDialog_RBFilterCheckbox.checked = false;

    iqTab_updateGlIqTypeTexture();
    iqTabCustomize_apply();
    canvas_isFullRender = true;
}

function iqTabFiltersDialog_RangeFilters_setToUI(vf){
    iqTabFiltersDialog_frameFilterFrom.value = vf.ranges.frame[0] === -1 ? "" : vf.ranges.frame[0];
    iqTabFiltersDialog_frameFilterTo.value = vf.ranges.frame[1] === -1 ? "" : vf.ranges.frame[1];

    iqTabFiltersDialog_subframeFilterFrom.value = vf.ranges.subframe[0] === -1 ? "" : vf.ranges.subframe[0];
    iqTabFiltersDialog_subframeFilterTo.value = vf.ranges.subframe[1] === -1 ? "" : vf.ranges.subframe[1];

    iqTabFiltersDialog_slotFilterFrom.value = vf.ranges.slot[0] === -1 ? "" : vf.ranges.slot[0];
    iqTabFiltersDialog_slotFilterTo.value = vf.ranges.slot[1] === -1 ? "" : vf.ranges.slot[1];

    iqTabFiltersDialog_symbolFilterFrom.value = vf.ranges.symbol[0] === -1 ? "" : vf.ranges.symbol[0];
    iqTabFiltersDialog_symbolFilterTo.value = vf.ranges.symbol[1] === -1 ? "" : vf.ranges.symbol[1];

    iqTabFiltersDialog_RBFilterFrom.value = vf.ranges.RB[0] === -1 ? "" : vf.ranges.RB[0];
    iqTabFiltersDialog_RBFilterTo.value = vf.ranges.RB[1] === -1 ? "" : vf.ranges.RB[1];


    iqTabFiltersDialog_frameFilterCheckbox.checked = vf.ranges.frame[0] !== -1 || vf.ranges.frame[1] !== -1;
    iqTabFiltersDialog_subframeFilterCheckbox.checked = vf.ranges.subframe[0] !== -1 || vf.ranges.subframe[1] !== -1;
    iqTabFiltersDialog_slotFilterCheckbox.checked = vf.ranges.slot[0] !== -1 || vf.ranges.slot[1] !== -1;
    iqTabFiltersDialog_symbolFilterCheckbox.checked = vf.ranges.symbol[0] !== -1 || vf.ranges.symbol[1] !== -1;
    iqTabFiltersDialog_RBFilterCheckbox.checked = vf.ranges.RB[0] !== -1 || vf.ranges.RB[1] !== -1;
}

customElements.define('bba-iq-tab-filters-dialog', IqTabFiltersDialog);