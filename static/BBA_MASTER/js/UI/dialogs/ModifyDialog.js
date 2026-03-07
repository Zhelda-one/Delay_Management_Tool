const modifyDialog = /** @type {ModifyDialog} */ getElementById('modifyDialog');

class ModifyDialog extends Dialog {

    constructor(){
        super("Modify");

    }

    getFromUI() {

    }
    setToUI() {

    }

}
customElements.define('bba-modify-dialog', ModifyDialog);