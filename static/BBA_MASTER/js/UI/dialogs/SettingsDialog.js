const settingsDialog = /** @type {SettingsDialog} */ getElementById('settingsDialog');

const settingsDialog_fileAutoload_enabled = getElementById('settingsDialog_fileAutoload_enabled');
const settingsDialog_fileAutoload_filePath = getElementById('settingsDialog_fileAutoload_filePath');

class SettingsDialog extends Dialog {

    constructor(){
        super("Settings");

    }

    getFromUI() {

    }
    setToUI() {
        settingsDialog_fileAutoload_enabled.checked = config.fileAutoload_enabled;
        settingsDialog_fileAutoload_filePath.value = config.fileAutoload_filePath;
    }

    onLoad(){
        this.setToUI();
    }
}
customElements.define('bba-settings-dialog', SettingsDialog);

function settingsDialog_resetFilters() {
    config.packetsTab.packetsFilters = copyObject( configDefault.packetsTab.packetsFilters );
    packetsTab_filtersList_update();
}

function settingsDialog_apply() {
    config.fileAutoload_enabled = settingsDialog_fileAutoload_enabled.checked;
    config.fileAutoload_filePath = settingsDialog_fileAutoload_filePath.value;

    applySettings();
    location.reload();
}

function settingsDialog_resetToDefault() {
    config = copyObject( configDefault );
    window.location.reload( false );
    settingsDialog.setToUI();
    applySettings();
}