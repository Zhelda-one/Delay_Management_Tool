const iqTabDisplaySettingsDialog = /** @type {IqTabDisplaySettingsDialog} */ getElementById( 'iqTabDisplaySettingsDialog' );
const iqTabDisplaySettingsDialog_constPointSize = document.getElementsByName( 'iqTabDisplaySettingsDialog_constPointSize' );

class IqTabDisplaySettingsDialog extends Dialog {

    constructor(){
        super("IQ Tab Display Settings Dialog");

    }

    getFromUI() {

    }
    setToUI() {

    }
}

function iqTabDisplaySettingsDialog_brighten(value){
    const newBrightness = parseFloat(value);
    if(newBrightness !== canvas_renderResourceGrid_brightenScale){
        canvas_renderResourceGrid_brightenScale = newBrightness;
        canvas_isFullRender = true;
        getElementById("brighten_label").innerHTML = "Current value: " + value + "x";
    }
}

customElements.define('bba-iq-tab-display-settings-dialog', IqTabDisplaySettingsDialog);