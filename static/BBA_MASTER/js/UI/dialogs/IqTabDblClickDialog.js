const iqTabDblClickDialog = /** @type {IqTabDblClickDialog} */ getElementById('iqTabDblClickDialog');

class IqTabDblClickDialog extends Dialog {

    constructor(){
        super("Position");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-iq-tab-dbl-click-dialog', IqTabDblClickDialog);