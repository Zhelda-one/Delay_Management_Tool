const tab5gmax_inputBox = getElementById('tab5gmax_inputBox');
const dropArea5GMax = getElementById("dropArea_5GMax");

const sendFileToServerButton = getElementById("send_file_to_server");
const tab5GMax_expectedFiles = getElementById('tab5GMax_expectedFiles');

const tab5GMax_config_TargetBoard = getElementById('tab5GMax_config_TargetBoard');
const tab5GMax_config_Variant = getElementById('tab5GMax_config_Variant');
const tab5GMax_config_Model = getElementById('tab5GMax_config_Model');

const tab5gmax_version_hash_textbox = getElementById('tab5gmax_version_hash_textbox');
const tab5gmax_api_errors = getElementById('tab5gmax_api_errors');
const tab5gmax_api_errors_box = getElementById('tab5gmax_api_errors_box');

const tab5gmax_configFileContainer = getElementById("tab5gmax_config-file");
const tab5gmax_inputFilesContainer = getElementById("tab5gmax_input-files");

const tab5gmax_version_list = getElementById("tab5gmax_version_list");

const tab5gmax_simulation_list = getElementById("tab5gmax_simulation_list");
const tab5gmax_results_view = getElementById("tab5gmax_results_view");

let config_file5GMax = null;
let input_files5GMax = [];

let expectedRxAntFiles = [];
let expectedEcpriFiles = [];

let configurationOverride = new ConfigurationOverride();
const simulations = [];
let resultsLoopActive = false;

sendFileToServerButton.addEventListener("click", async () => {

    tab5gmax_clearErrors();

    if (config_file5GMax === null) {
        tab5gmax_addError("No config file provided");
        return;
    }
    if (input_files5GMax.length === 0) {
        tab5gmax_addError("No input files provided");
        return;
    }

    // Check if any of the expected files lists are fully satisfied
    const allRxFilesPresent = expectedRxAntFiles.every(file => input_files5GMax.some(inputFile => inputFile.name === file));
    const allEcpriFilesPresent = expectedEcpriFiles.every(file => input_files5GMax.some(inputFile => inputFile.name === file));
    if (!allRxFilesPresent && !allEcpriFilesPresent) {
        tab5gmax_addError("Not all expected input files are present");
        return;
    }

    const hash = tab5gmax_version_list.querySelector('.selected')?.getAttribute('hash');
    if(hash === undefined){
        tab5gmax_addError("Select 5gmax version");
        return;
    }

    const simulationParameters = new SimulationParameters();
    simulationParameters.repositoryHash = hash;
    simulationParameters.configurationOverride = structuredClone(configurationOverride);

    const configText = await config_file5GMax.text();

    const targetBoard = tab5GMax_config_TargetBoard.value, variant = tab5GMax_config_Variant.value, model = tab5GMax_config_Model.value;
    simulationParameters.configurationOverride.configurationFieldOverrides.get('TargerBoard').newValue = targetBoard;
    simulationParameters.configurationOverride.configurationFieldOverrides.get('Variant').newValue = variant;
    simulationParameters.configurationOverride.configurationFieldOverrides.get('Model').newValue = model;

    let modifiedConfigText = configText.replace(/(ParUnit\{\d+\}\.Architecture\.TargetBoard\s*=\s*')[^']+(')/, `$1${targetBoard}$2`);
    modifiedConfigText = modifiedConfigText.replace(/(ParUnit\{\d+\}\.Architecture\.Variant\s*=\s*')[^']+(')/, `$1${variant}$2`);
    modifiedConfigText = modifiedConfigText.replace(/(ParUnit\{\d+\}\.Architecture\.Model\s*=\s*')[^']+(')/, `$1${model}$2`);

    modifiedConfigText = modifiedConfigText.replace(/(ParSim\.DebugLevel\s*=)[^\n]*/g, '$1 200;');
    modifiedConfigText = modifiedConfigText.replace(/(ParSim\.DebugConfig\.SaveFigures\s*=)[^\n]*/g, '$1 1;');
    modifiedConfigText = modifiedConfigText.replace(/(ParSim\.DebugConfig\.HoldSimulation\s*=)[^\n]*/g, '$1 1;');
    modifiedConfigText = modifiedConfigText.replace(/(ParSim\.DebugConfig\.SaveDirectory\s*=)[^\n]*/g, `$1 'Results';`);

    const modifiedConfigBlob = new File([modifiedConfigText], config_file5GMax.name, { type: config_file5GMax.type });

    let req = new XMLHttpRequest();
    req.onerror = function () {
        tab5gmax_addError("Network error: Unable to reach the server.");
    };
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const returnObject = JSON.parse(req.response);

                simulationParameters.simulationId = returnObject.id;
                simulationParameters.requestTimestamp = new Date();

                simulations.push(simulationParameters);

                selectedSimulationId = simulationParameters.simulationId;

                tab5gmax_getResults_loop();
                tab5gmax_simulationResults_refresh();
            } else {
                tab5gmax_addError("Error: " + req.statusText);
            }
        }
    }

    const fileNames = new Set(input_files5GMax.map(file => file.name));
    fileNames.add(config_file5GMax.name);
    if(fileNames.size !== input_files5GMax.length + 1){
        tab5gmax_addError("Files with the same name are not allowed");
        return;
    }

    const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));
    for (const file of input_files5GMax) {
        await zipWriter.add(file.name, new zip.BlobReader(file));
    }
    await zipWriter.add(config_file5GMax.name, new zip.BlobReader(modifiedConfigBlob));
    const zipBlob = await zipWriter.close();

    let formData = new FormData();
    formData.append('zip', zipBlob, 'files.zip');

    //req.open("POST", `http://localhost:3200/simulation_run/${hash}`);
    req.open("POST", `http://bba-5gmax.ans-tools.devops-fwk.dynamic.nsn-net.net/simulation_run/${hash}`);

    req.send(formData);

    if(resultsLoopActive === false){
        resultsLoopActive = true;
        tab5gmax_getResults_loop();
    }
})

function tab5gmax_getResults_loop(){
    const pendingSimulations = simulations.filter(sim => sim.state === SimulationState.PENDING);

    if (pendingSimulations.length === 0) {
        return;
    }

    for (const simulation of pendingSimulations) {
        let req = new XMLHttpRequest();
        req.responseType = "blob";

        req.onerror = function () {
            tab5gmax_addError("Network error: Unable to reach the server.");
        };

        req.onreadystatechange = async function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    try {
                        simulation.zipFile = req.response;

                        const filenameEncoding = "utf-8";
                        const options = { filenameEncoding };
                        simulation.resultFiles = await new zip.ZipReader(new zip.BlobReader(req.response)).getEntries(options);
                        simulation.state = SimulationState.READY;

                        tab5gmax_simulationResults_refresh();
                    } catch (err) {
                        console.log(err);
                    }

                    sendFileToServerButton.disabled = false;
                } else if (req.status === 404) {
                    // Simulation not found or not ready
                    const reader = new FileReader();
                    reader.onload = function () {
                        const responseObject = JSON.parse(reader.result);
                        const oldState = simulation.state;
                        switch (responseObject.state) {
                            case "Pending":
                                break;
                            case "Error":
                                simulation.state = SimulationState.ERROR;
                                simulation.message = responseObject.message;
                                break;
                            case "Unknown":
                                simulation.state = SimulationState.ERROR;
                                break;
                        }

                        if(oldState !== simulation.state){
                            tab5gmax_simulationResults_refresh();
                        }
                    };
                    reader.readAsText(req.response);
                } else {
                    // Handle other status codes
                    tab5gmax_addError(`Unexpected error: ${req.status}`);
                }
            }
        };
        //req.open('GET', `http://localhost:3200/simulation_results/${simulation.simulationId}`);
        req.open('GET', `http://bba-5gmax.ans-tools.devops-fwk.dynamic.nsn-net.net/simulation_results/${simulation.simulationId}`);
        req.send('');
    }

    setTimeout(tab5gmax_getResults_loop, 5000);
}

let selectedSimulationId = null;
function tab5gmax_simulationList_select(element){
    const simuationId = element.getAttribute('simulationId');

    const oldSimulationId = selectedSimulationId;
    selectedSimulationId = simuationId;

    if(oldSimulationId !== selectedSimulationId){
        tab5gmax_simulationResults_refresh();
    }
}
async function tab5gmax_simulationResults_refresh() {
    // Refresh simulation list
    tab5gmax_simulation_list.innerHTML = ''; // Clear existing entries

    for (let i = simulations.length - 1; i >= 0; i--) {
        const simulation = simulations[i];

        const listItem = document.createElement('li');
        const formattedTimestamp = new Date(simulation.requestTimestamp).toLocaleString();
        listItem.textContent = `Timestamp: ${formattedTimestamp} `;
        listItem.setAttribute('simulationId', simulation.simulationId);

        if (simulation.simulationId === selectedSimulationId) {
            listItem.classList.add('selected');
        }

        const icon = document.createElement('i');
        switch (simulation.state) {
            case SimulationState.PENDING:
                icon.className = 'fas fa-spinner fa-spin';
                break;
            case SimulationState.READY:
                icon.className = 'fas fa-check-circle text-success';
                break;
            case SimulationState.ERROR:
                icon.className = 'fas fa-exclamation-circle text-danger';
                break;
        }
        listItem.appendChild(icon);

        tab5gmax_simulation_list.appendChild(listItem);
    }

    // Refresh results view
    tab5gmax_results_view.innerHTML = '';

    const simulation = simulations.find(sim => sim.simulationId === selectedSimulationId);
    if (simulation == null) {
        return;
    }

    const simulationIdDiv = document.createElement('div');
    simulationIdDiv.innerHTML = `Simulation ID: <b>${simulation.simulationId}</b>`;
    tab5gmax_results_view.appendChild(simulationIdDiv);

    const simulationHashDiv = document.createElement('div');
    simulationHashDiv.innerHTML = `Simulation Hash: <b>${simulation.repositoryHash}</b>`;
    tab5gmax_results_view.appendChild(simulationHashDiv);

    const overrideParams = [];
    simulation.configurationOverride.configurationFieldOverrides.forEach((override, key) => {
        if (override.originalValue !== override.newValue) {
            overrideParams.push(`${key}: <b>${override.newValue}</b> (original: ${override.originalValue})`);
        } else {
            overrideParams.push(`${key}: <b>${override.originalValue}</b>`);
        }
    });

    const overrideParamsText = overrideParams.join(', ');
    const paramsDiv = document.createElement('div');
    paramsDiv.innerHTML = `Configuration: ${overrideParamsText}`;
    tab5gmax_results_view.appendChild(paramsDiv);

    if(simulation.state !== SimulationState.READY){
        const stateDiv = document.createElement('div');
        stateDiv.textContent = `State: ${Object.keys(SimulationState)[simulation.state]}`;
        tab5gmax_results_view.appendChild(stateDiv);
    }

    if(simulation.state === SimulationState.ERROR){
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.textContent = `Error: ${simulation.message}`;
        tab5gmax_results_view.appendChild(errorMessageDiv);
    }

    if(simulation.state === SimulationState.READY){
        await generateDownloadLinks(simulation);

        await displayImages(simulation);
    }
}

async function generateDownloadLinks(simulation) {
    if (simulation.resultFiles.length > 0) {
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download All Files";
        downloadButton.classList.add("button_5gmax");
        downloadButton.addEventListener("click", () => {
            download("results.zip", simulation.zipFile);
        });
        tab5gmax_results_view.appendChild(downloadButton);
    }
}

async function displayImages(simulation) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('tab5GMax_imageContainer');
    imageContainer.innerHTML = ''; // Clear any existing images

    for (const entry of simulation.resultFiles) {
        const extension = entry.filename.slice(entry.filename.lastIndexOf('.')).toLowerCase();
        if (imageExtensions.includes(extension)) {
            const blob = await entry.getData(new zip.BlobWriter());
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(blob);
            imgElement.alt = entry.filename;
            imgElement.addEventListener('click', () => {
                const newTab = window.open();
                newTab.document.body.innerHTML = `<img src="${imgElement.src}" alt="${entry.filename}">`;
            });

            const imgContainer = document.createElement('div');
            const imgTitle = document.createElement('p');
            imgTitle.textContent = entry.filename;
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(imgTitle);

            imageContainer.appendChild(imgContainer);
        }
    }

    tab5gmax_results_view.appendChild(imageContainer);
}

async function download5gmaxResults(entry) {
    if (entry) {
        download(entry.filename, await getFileData(entry))
    } else {
        download(result_file_name + '.zip', result_5GMax_zip)
    }
}

async function getFileData(entry) {
    const entryWriter = new zip.BlobWriter();
    return await entry.getData(entryWriter)
}

async function dropAreaEventHandler_5GMax(e) {
    e.preventDefault();
    e.stopPropagation();

    switch (e.type) {
        case 'dragenter':
            dropArea5GMax.classList.add('highlight');
            break;
        case 'dragover':
            dropArea5GMax.classList.add('highlight');
            break;
        case 'dragleave':
            dropArea5GMax.classList.remove('highlight');
            break;
        case 'click':
            let input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = async e => {
                if (e.target.files.length) {
                    tab5gmax_appendFiles(e.target.files);
                    await discoverConfigParameters();
                    renderFileList();
                }
            }
            input.click();
            break;
        case 'drop':
            dropArea5GMax.classList.remove('highlight');
            if (e.dataTransfer.files.length) {
                tab5gmax_appendFiles(e.dataTransfer.files);
                await discoverConfigParameters();
                renderFileList();
            }
            break;
    }
}

function tab5gmax_appendFiles(files){
    for(const file of files){
        if(file.name.endsWith('.m')){
            config_file5GMax = file;
        } else {
            input_files5GMax.push(file);
        }
    }

    input_files5GMax.sort((a, b) => a.name.localeCompare(b.name));
}

function tab5gmax_clearInputFiles(){
    input_files5GMax = [];
    renderFileList();
}

async function discoverConfigParameters(){
    if(config_file5GMax === null) return;

    const configText = await config_file5GMax.text();

    let targetBoard = null, variant = null, model = null;
    {
        const regex = /ParUnit\{\d+\}\.Architecture\.TargetBoard\s*=\s*'([^']+)'/;
        const match = configText.match(regex);
        targetBoard = match ? match[1] : null;
    }
    {
        const regex = /ParUnit\{\d+\}\.Architecture\.Variant\s*=\s*'([^']+)'/;
        const match = configText.match(regex);
         variant = match ? match[1] : null;
    }
    {
        const regex = /ParUnit\{\d+\}\.Architecture\.Model\s*=\s*'([^']+)'/;
        const match = configText.match(regex);
        model = match ? match[1] : null;
    }

    expectedRxAntFiles = []; expectedEcpriFiles = [];
    {
        // Find list of files based on: RxAntIfPart.CaptureFiles = {'ant0', 'ant1', 'ant2', 'ant3'};
        const regex = /RxAntIfPart\.CaptureFiles\s*=\s*{([^}]+)}/;
        const match = configText.match(regex);
        if(match)
            expectedRxAntFiles = match[1].split(',').map(file => file.trim().replace(/'/g, ''));
    }
    {
        // Find list of files based on: ParUnit{1}.RX.Ecpri.CaptureFiles = {'ecpri.bin'};
        const regex = /ParUnit\{\d+\}\.RX\.Ecpri\.CaptureFiles\s*=\s*{([^}]+)}/;
        const match = configText.match(regex);
        if(match)
            expectedEcpriFiles = match[1].split(',').map(file => file.trim().replace(/'/g, ''));
    }

    configurationOverride.clear();
    configurationOverride.addFieldOverride('TargerBoard', targetBoard, null);
    configurationOverride.addFieldOverride('Variant', variant, null);
    configurationOverride.addFieldOverride('Model', model, null);

    setSelectValue(tab5GMax_config_TargetBoard, targetBoard);
    setSelectValue(tab5GMax_config_Variant, variant);
    setSelectValue(tab5GMax_config_Model, model);
}

function setSelectValue(selectElement, value) {
    if (value === null) {
        selectElement.value = "None";
        return;
    }

    let optionExists = Array.from(selectElement.options).some(option => option.value === value);

    if (!optionExists) {
        const newOption = document.createElement("option");
        newOption.value = value;
        newOption.text = `${value} (Unknown option)`;
        selectElement.add(newOption);
    }

    selectElement.value = value;
}

function tab5gmax_addError(message) {
    tab5gmax_api_errors.innerHTML += `<p>${message}</p>`;
    tab5gmax_api_errors_box.hidden = false;
}

function tab5gmax_clearErrors() {
    tab5gmax_api_errors.innerHTML = '';
    tab5gmax_api_errors_box.hidden = true;
}

let _tab5gmax_version_oldResponse = '';
let _tab5gmax_version_pending = false;
function tab5gmax_version_refresh(){
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if(req.responseText === _tab5gmax_version_oldResponse){
                    if(_tab5gmax_version_pending)
                        setTimeout(tab5gmax_version_refresh, 5000);
                    return;
                }
                _tab5gmax_version_oldResponse = req.responseText;

                tab5gmax_version_list.innerHTML = '';
                tab5gmax_clearErrors();

                _tab5gmax_version_pending = false;

                const versions = JSON.parse(req.responseText);
                versions.sort((a, b) => new Date(b.commit_date) - new Date(a.commit_date));
                versions.forEach(version => {
                    const item = document.createElement('li');
                    const date = new Date(version.commit_date);
                    const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');
                    item.setAttribute('hash', version.hash);

                    let iconHTML = '';
                    let iconElem = document.createElement('i');
                    switch(version.state){
                        case "Pending":
                            iconElem.className = 'fas fa-spinner fa-spin loading-icon';
                            _tab5gmax_version_pending = true;
                            break;
                        case "Error":
                            iconElem.className = 'fas fa-exclamation-circle';
                            iconElem.addEventListener('click', () => {
                                logError(version.message);
                                logDialog.open();
                            });
                            break;
                        case "Ready":
                            iconElem.className = 'fas fa-check-circle text-success';
                            break;
                    }
                    item.appendChild(iconElem);
                    const textNode = document.createTextNode(`${iconHTML} (${formattedDate}) ${version.hash}`)
                    item.appendChild(textNode);
                    tab5gmax_version_list.appendChild(item);
                });

                if(_tab5gmax_version_pending)
                    setTimeout(tab5gmax_version_refresh, 5000);

            } else {
                tab5gmax_addError("Error fetching version list: " + req.statusText);
            }
        }
    }

    //req.open("GET", 'http://localhost:3200/version_list');
    req.open("GET", 'http://bba-5gmax.ans-tools.devops-fwk.dynamic.nsn-net.net/version_list');
    req.send();
}
function tab5gmax_version_hash_request() {
    tab5gmax_clearErrors();

    const requestedHash = tab5gmax_version_hash_textbox.value;

    if(requestedHash === ''){
        tab5gmax_addError("Commit hash cannot be empty");
        return;
    }

    tab5gmax_version_hash_textbox.value = "";

    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const response = JSON.parse(req.responseText);
                if (response.state === "Pending") {
                    tab5gmax_version_refresh();
                } else if (response.state === "Error") {
                    tab5gmax_addError("Error processing version: " + response.error);
                } else if (response.state === "Ready") {
                    tab5gmax_version_refresh();
                } else {
                    tab5gmax_addError("Error requesting version: " + req.statusText);
                }
            } else{
                const response = JSON.parse(req.responseText);
                if (response.state === "Error") {
                    tab5gmax_addError("Error requesting version: " + response.message);
                } else{
                    tab5gmax_addError("Unknown error: " + req.statusText);
                }
            }
        }
    }

    //req.open("POST", `http://localhost:3200/version_request/${requestedHash}`);
    req.open("POST", `http://bba-5gmax.ans-tools.devops-fwk.dynamic.nsn-net.net/version_request/${requestedHash}`);
    req.send();
}

document.addEventListener("DOMContentLoaded", function() {
    const statusText = getElementById("status-text");
    const statusIcon = getElementById("status-icon");

    function updateStatus(text, iconClass) {
        statusText.textContent = text;
        statusIcon.className = iconClass;
    }

    function checkServerStatus() {
        fetch("http://bba-5gmax.ans-tools.devops-fwk.dynamic.nsn-net.net/status")
            .then(response => {
                if (response.ok) {
                    updateStatus("Online", "online");
                } else {
                    updateStatus("Offline", "offline");
                }
            })
            .catch(error => {
                updateStatus("Offline", "offline");
            });
    }

    updateStatus("Connecting...", "loading");
    checkServerStatus();
    setInterval(checkServerStatus, 30000);

    tab5gmax_version_refresh();
});

function renderFileList() {
    // Render config file
    tab5gmax_configFileContainer.innerHTML = '';
    if (config_file5GMax) {
        const configFileElement = document.createElement('div');
        configFileElement.textContent = config_file5GMax.name;
        const removeButton = document.createElement('button');
        removeButton.classList.add('button_5gmax');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            config_file5GMax = null;
            renderFileList();
        };
        configFileElement.appendChild(removeButton);
        tab5gmax_configFileContainer.appendChild(configFileElement);
    }

    // Render expected files based on expectedFiles arrays. Display them inline with an OR when both are non-empty
    // Display a message "check configuration" when both are empty.
    // When a list matches input files fully, change the background to green, red otherwise
    // Do not join lists together. Display them separately, with an OR when both are non empty
    tab5GMax_expectedFiles.innerHTML = '';
    tab5GMax_expectedFiles.textContent = 'Expected input files: ';
    const ecpriFilesElement = document.createElement('div');
    ecpriFilesElement.classList.add('text_highlight');
    ecpriFilesElement.textContent = expectedEcpriFiles.join(', ');
    const allEcpriFilesPresent = expectedEcpriFiles.every(file => input_files5GMax.some(inputFile => inputFile.name === file));
    ecpriFilesElement.style.backgroundColor = allEcpriFilesPresent ? 'lightgreen' : 'lightcoral';

    const rxAntFilesElement = document.createElement('div');
    rxAntFilesElement.classList.add('text_highlight');
    rxAntFilesElement.textContent = expectedRxAntFiles.join(', ');
    const allRxFilesPresent = expectedRxAntFiles.every(file => input_files5GMax.some(inputFile => inputFile.name === file));
    rxAntFilesElement.style.backgroundColor = allRxFilesPresent ? 'lightgreen' : 'lightcoral';

    if(expectedEcpriFiles.length === 0 && expectedRxAntFiles.length === 0){
        tab5GMax_expectedFiles.textContent = 'Check configuration, no input files expected.';
    } else{
        if(expectedEcpriFiles.length > 0 && expectedRxAntFiles.length > 0){
            tab5GMax_expectedFiles.appendChild(ecpriFilesElement);
            const boldOrText = document.createElement('b');
            boldOrText.textContent = ' OR ';
            tab5GMax_expectedFiles.appendChild(boldOrText);
            tab5GMax_expectedFiles.appendChild(rxAntFilesElement);
        } else if(expectedEcpriFiles.length > 0){
            tab5GMax_expectedFiles.appendChild(ecpriFilesElement);
        } else{
            tab5GMax_expectedFiles.appendChild(rxAntFilesElement);
        }
    }

    // Render input files
    tab5gmax_inputFilesContainer.innerHTML = '';

    input_files5GMax.forEach((file, index) => {
        const fileElement = document.createElement('li');
        fileElement.style.margin = '2px';

        const fileNameDiv = document.createElement('div');
        fileNameDiv.classList.add('text_highlight');
        fileNameDiv.textContent = file.name;

        const isFileInExpectedLists = expectedRxAntFiles.includes(file.name) || expectedEcpriFiles.includes(file.name);
        fileNameDiv.style.backgroundColor = isFileInExpectedLists ? 'lightgreen' : 'lightcoral';

        const removeButton = document.createElement('button');
        removeButton.classList.add('button_5gmax');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            input_files5GMax.splice(index, 1);
            renderFileList();
        };
        fileElement.appendChild(fileNameDiv);
        fileElement.appendChild(removeButton);
        tab5gmax_inputFilesContainer.appendChild(fileElement);
    });
}

dropArea5GMax.addEventListener('click', dropAreaEventHandler_5GMax, false);
tab5gmax_inputBox.addEventListener('dragenter', dropAreaEventHandler_5GMax, false);
tab5gmax_inputBox.addEventListener('dragover', dropAreaEventHandler_5GMax, false);
tab5gmax_inputBox.addEventListener('dragleave', dropAreaEventHandler_5GMax, false);
tab5gmax_inputBox.addEventListener('drop', dropAreaEventHandler_5GMax, false);

