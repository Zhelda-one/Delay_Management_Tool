const prachDialog = /** @type {PrachDialog} */ getElementById('prachDialog');

class PrachDialog extends Dialog {

    constructor(){
        super("PRACH");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-prach-dialog', PrachDialog);