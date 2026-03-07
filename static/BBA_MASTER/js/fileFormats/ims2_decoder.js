let ims2 = {
    definitions: {},
    decoded: {},
    values: {},

    file_getter__ims2: function(data) {
        this.data = data;
        this.index = 0;
        this.version = this.get_bytes(4);
        const header_size = this.get_bytes(4);
        const additional_info_size = this.get_bytes(4);

        this.additional_info = (new TextDecoder("utf-8")).decode(this.get_arrayBuffer(additional_info_size));
        this.decodeNextFrame();
    },

    decodeNextFrame: function(){
        if(this.index < this.data.length){
            let frame = {
                magic_string: this.get_arrayBuffer(12),
                type: this.get_bytes(4),
                compression: this.get_bytes(4),
                size: this.get_bytes(4),
            };

            let payload = this.get_arrayBuffer(frame.size);

            if(frame.compression === 1){
                payload = pako.ungzip(payload);
            }
            frame.payload = payload;

            let isMetaFrame = false;
            let payloadIndex = 0;

            while(payloadIndex < frame.payload.length){
                if(frame.type === 0){
                    let changeset_frame= ims2_decode_changesets_frame(payload, payloadIndex);
                    payloadIndex += changeset_frame.size;
                }
                else if(frame.type === 1){
                    ims2.timestamp = get_bytes(payload, payloadIndex, 8);
                    payloadIndex+=8;
                }
                else if(frame.type === 2){
                    isMetaFrame = true;
                    payloadIndex += frame.size;
                    frame.data = ims2_decode_meta_frame(payload, !(payloadIndex < frame.payload.length));

                }
                else if(frame.type === 3){
                    ims2.instanceId = get_four(payload, payloadIndex);
                    payloadIndex += 4;
                }
            }
            if(!isMetaFrame)
                this.decodeNextFrame();
        }
        else{

            ims2_setValuesToCorrespondingFields();
            logInfo("ims2", "<b>Sucessfully loaded IMS2 file!</b>");
            logInfo("ims2", JSON.stringify(ims2.values));

            logInfo("ims2", "<button onClick='saveIms2FileToJson()'>Save IMS2 file to JSON</button>");
            // $("#layer2").dialog("open");
            delete ims2.data;
            this.definitions = {};
        }

    },


    get_arrayBuffer: get_arrayBuffer_fun,
    get_bytes: get_bytes_fun,
};

function ims2_decode_changesets_frame(payload, index){
    const indexStart = index;
    let frame = {};
    frame.timestamp = get_bytes(payload, index, 8);
    index += 8;
    frame.number_of_changes = get_four(payload, index);

    index += 4;
    frame.changes = [];

    for(let i = 0; i < frame.number_of_changes; i++){
        let changes = {};
        changes.name_size = get_bytes(payload, index, 2);
        index += 2;

        changes.name = (new TextDecoder("utf-8")).decode(payload.slice(index, index+changes.name_size));

        index += changes.name_size;
        changes.change_type = payload[index++];

        if(changes.change_type === 0){
            changes.size = get_four(payload, index);
            index += 4;
            changes.payload = payload.slice(index, index+changes.size);
            index += changes.size;

            // if(changes.name.includes("NRCELL") || changes.name.includes("LNBTS") || changes.name.includes("LNCEL")) {
            read_update(changes);
            // }
        }
    }

    return {frame:frame, size:index - indexStart};
}

async function ims2_decode_meta_frame(payload, isLast){

    let frames = [];
    try {
        const blobPayload = new Blob([payload.buffer]);

        const zipReader = await new zip.ZipReader(new zip.BlobReader(blobPayload));

        zipReader.getEntries().then(function (result) {
            let decodeNext = () => {
                const firstResult = result.shift();
                if (!firstResult) {

                    if(isLast) {
                        ims2.decodeNextFrame();
                    }
                    return;
                }

                const helloWorldWriter = new zip.TextWriter();

                firstResult.getData(helloWorldWriter).then(function (result2) {
                    frames.push(decodeIms2XMLFile(result2));
                    decodeNext();
                });
            };
            decodeNext();
        });
        zipReader.close();
    } catch (err) {
        console.log(err);
    }
    return frames;
}

function decodeStructDefinition(doc) {

    let managedObjects = {};

    for(let i = 0; i < doc.childNodes.length; i++){
        if(!doc.childNodes[i].attributes || !doc.childNodes[i].attributes.name) continue;

        const name = doc.childNodes[i].attributes.name.textContent;
        switch (doc.childNodes[i].nodeName){
            case "enumeration":
                managedObjects[name] = decodeEnumDefinition(doc.childNodes[i]);
                break;
            case "struct":
                managedObjects[name] = decodeStructDefinition(doc.childNodes[i]);
                break;
            case "p":
                managedObjects[name] = decodePDefinition(doc.childNodes[i]);
                break;
            case "action":
                managedObjects[name] = decodeActionDefinition(doc.childNodes[i]);
                break;
        }

        if(managedObjects[name].index){
            managedObjects[name].name = name;
            managedObjects[managedObjects[name].index] = managedObjects[name];
        }
    }
    return managedObjects;
}

function decodePDefinition(element){
    let p = {};

    if(element.attributes && element.attributes.type){
        p.type = element.attributes.type.value;
    }

    for(let i = 0; i < element.childNodes.length; i++){
        if(element.childNodes[i].nodeName === "proto"){
            if(element.childNodes[i].attributes && element.childNodes[i].attributes.index){
                p.index = parseInt(element.childNodes[i].attributes.index.value);
            }
            if(element.childNodes[i].attributes && element.childNodes[i].attributes.type){
                p.type = element.childNodes[i].attributes.type.value;
            }

        }
        if(element.childNodes[i].nodeName === "recurrence"){
            p.reccurence = element.childNodes[i];
        }

        // if(element.childNodes[i].nodeName === "struct"){
        //     const name = element.childNodes[i].attributes.name.textContent;
        //     p[name] = decodeStructDefinition(element.childNodes[i]);
        // }
        if(element.childNodes[i].nodeName === "range" && element.childNodes[i].attributes.min && element.childNodes[i].attributes.max){
            p.range = {};
            p.range.min = parseFloat(element.childNodes[i].attributes.min.value);
            p.range.max = parseFloat(element.childNodes[i].attributes.max.value);
        }
    }
    return p;
}
function decodeEnumDefinition(element){
    let val = {};

    for(let i = 0; i < element.childNodes.length; i++){
        if(element.childNodes[i].attributes && element.childNodes[i].attributes.name && element.childNodes[i].attributes.value){
            const name = element.childNodes[i].attributes.name.textContent;
            const value = element.childNodes[i].attributes.value.textContent;
            val[name] = value;
            val[value] = name;
        }
    }
    return val;
}
function decodeActionDefinition(action){
    let val = {};

    const decoded = decodeStructDefinition(action);
    val[action.attributes.name.value] = decoded;
    val[action.id] = decoded;
    return val;
}

function decodeIms2XMLFile(xmlStr){
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlStr, "application/xml");
    const errorNode = doc.querySelector("parsererror");

    let decoded = {};
    if (!errorNode) {
        for(let i = 0; i < doc.childNodes.length; i++){
            for(let j = 0; j < doc.childNodes[i].childNodes.length; j++){

                const className = doc.childNodes[i].childNodes[j].className;

                // if(className && (className.includes("NRCELL") || className.includes("LNCEL") || className.includes("LNBTS")))
                    ims2.definitions[className] = decodeStructDefinition(doc.childNodes[i].childNodes[j]);
            }
        }
    }
    return decoded;

}

function get_four( data, index ){
    return (data[index+0]*(1<<24)) + (data[index+1]<<16) + (data[index+2]<<8) + (data[index+3]<<0);
}

function get_bytes(data, index, len){
    let numb = 0;
    for(let i = 0; i < len; i++) numb += data[index + i] * 2**((len-i-1)*8);
    return numb;
}


function read_update(change){
    const split_text = change.name.split("/");
    const name = split_text[split_text.length - 1].split("-")[0];
    const id = split_text[split_text.length - 1].split("-")[1];

    const split_name = split_text[split_text.length-1];

    // if((split_name.includes("NRCELL") || split_name.includes("LNCEL") || split_name.includes("LNBTS")) && ims2.definitions[name]){
        ims2.decoded[name] = dissectChange(change.payload, ims2.definitions[name]);
        ims2_setValues(ims2.decoded[name]);
    // }
}

function dissectChange(payload, definition){

    let pos = 0;
    let dump = {};

    while(pos < payload.length){
        const tag = _decode_varint(payload, pos);

        pos = tag.pos;

        const param_id = tag.result >> 3;
        const protobuf_type_id = tag.result & 0x7;

        let raw_value;
        if(protobuf_type_id === 0){
            raw_value  =_decode_varint(payload, pos);
            pos = raw_value.pos;
            raw_value = raw_value.result;
        }
        else if(protobuf_type_id === 1){
            raw_value = payload.slice(pos, pos+8);
            pos += 8;
        }
        else if(protobuf_type_id === 5){
            raw_value = payload.slice(pos, pos+4);
            pos += 4;
        }
        else if(protobuf_type_id === 2){
            const size = _decode_varint(payload, pos);
            pos = size.pos;

            raw_value = payload.slice(pos, pos+size.result);
            pos += size.result;
        }

        decodeChangeValue(dump, definition, param_id, raw_value);

    }

    return dump;
}

function decodeChangeValue(dump, definition, param_id, raw_value){
    if(!definition[param_id]) return;
    const capitalized = capitalizeFirstLetter(definition[param_id].name);
    const enumName = 'E'+capitalized;

    switch (definition[param_id].type) {
        case 'sint32':
            dump[definition[param_id].name] = (raw_value >> 1) ^ -(raw_value & 1);
            break;
        case 'uint32':
        case 'uint64':
        case 'integer':
            dump[definition[param_id].name] = raw_value;
            break;
        case 'double':
            dump[definition[param_id].name] = new DataView(raw_value.buffer).getFloat64();
            break;
        case 'string':
            dump[definition[param_id].name] = (new TextDecoder("utf-8")).decode(raw_value);
            break;
        case 'boolean':
        case 'bool':
            dump[definition[param_id].name] = raw_value === 1;
            break;
        default:
            if(definition[enumName]) {
                dump[definition[param_id].name] = definition[enumName][String(raw_value)];
            }
            else if(definition[capitalized]) {
                dump[definition[param_id].name] = dissectChange(raw_value, definition[capitalized]);
            }
            else{
                dump[definition[param_id].name] = raw_value;
            }
            break;
    }
}

function _decode_varint(buffer, pos){

    const bits = 64;
    const signbit = BigInt(2**(bits - 1));
    const mask = BigInt((2**bits)) - BigInt(1);

    let result = BigInt(0);
    let shift = 0;

    while(true){
        let b = buffer[pos];
        result |= BigInt(b & 0x7f) * BigInt(2**shift);
        pos += 1;

        if((b & 0x80) === 0){
            result &= mask;
            result = (result ^ signbit) - signbit;
            result = Number(result);
            return {result:result, pos:pos}
        }

        shift += 7;
        if (shift >= 64){
            return {result:0, pos:pos}
        }
    }
}

function ims2_setValues(params){
    const keys = Object.keys(params);
    for(let i = 0; i < keys.length; i++){
        if(["nrarfcn", "technology", "prachConfigurationIndex", "prachRootSequenceIndex", "prachConfIndex", "rootSeqIndex", "zeroCorrelationZoneConfig", "prachCS",
            "prachSequenceType", "prachHsFlag", "msg1FrequencyStart", "prachFreqOff", "ulChBw", "dlChBw", "scs", "physCellId"].includes(keys[i])) {
            ims2.values[keys[i]] = params[keys[i]];
        }
    }
}

function ims2_setValuesToCorrespondingFields(){
    const correspontingIDs = {
        "nrarfcn": ["configureDialog_arfcn"],

        "prachConfigurationIndex": ["configDialog_prachCfgIdx"],
        "prachConfIndex": ["configDialog_prachCfgIdx"],

        "msg1FrequencyStart": ["configDialog_prachPrbOffset"],
        "prachFreqOff": ["configDialog_prachPrbOffset"],

        "physCellId": ["configDialog_pci"],

    }
    const keys_id = Object.keys(correspontingIDs);
    for(let i = 0; i < keys_id.length; i++){
        if(ims2.values[keys_id[i]] !== undefined){
            for(let j = 0; j < correspontingIDs[keys_id[i]].length; j++){

                if(document.getElementById(correspontingIDs[keys_id[i]][j]))
                    document.getElementById(correspontingIDs[keys_id[i]][j]).value = ims2.values[keys_id[i]];
            }
        }
    }
    if(ims2.values.scs){
        if(ims2.values.scs.includes("15")){
            document.getElementById("loadDialog_defaultU_0").checked = "checked";
            document.getElementById("loadDialog_maxU_0").checked = "checked";

        }
        else if( ims2.values.scs.includes("30")){
            document.getElementById("loadDialog_defaultU_1").checked = "checked";
            document.getElementById("loadDialog_maxU_1").checked = "checked";
        }
        else if( ims2.values.scs.includes("60")){
            document.getElementById("loadDialog_defaultU_2").checked = "checked";
            document.getElementById("loadDialog_maxU_2").checked = "checked";
        }
        else if( ims2.values.scs.includes("120")){
            document.getElementById("loadDialog_defaultU_3").checked = "checked";
            document.getElementById("loadDialog_maxU_3").checked = "checked";
        }
        else if(ims2.values.scs.includes("240")){
            document.getElementById("loadDialog_defaultU_4").checked = "checked";
            document.getElementById("loadDialog_maxU_4").checked = "checked";
        }
    }
    if(ims2.values.dlChBw || ims2.values.ulChBw){
        const bw = ims2.values.dlChBw ? ims2.values.dlChBw : ims2.values.ulChBw;

        const bandwith_to_id = {
            "5MHz": "loadDialog_sampling_0",
            "10MHz": "loadDialog_sampling_1",
            "15MHz": "loadDialog_sampling_2",
            "20MHz": "loadDialog_sampling_3",
            "30MHz": "loadDialog_sampling_4",
            "50MHz": "loadDialog_sampling_5",
            "100MHz": "loadDialog_sampling_6",
            "200MHz": "loadDialog_sampling_7",
            "400MHz": "loadDialog_sampling_8",
            "800MHz": "loadDialog_sampling_9",
        }
        document.getElementById(bandwith_to_id[bw]).checked = "checked";
    }
    if(ims2.values.nrarfcn){
        configureDialog_arfcn_onchange();
        set_arfcn();    // TODO: What's that?
    }
}

function saveIms2FileToJson() {
    const data = JSON.stringify(ims2.decoded);
    download("ims2.json", JSON.stringify(ims2.decoded));
}
function get_arrayBuffer_fun(len){
    this.index += len;
    return this.data.slice(this.index-len, this.index);
}
function get_bytes_fun(len){
    let numb = 0;
    for(let i = 0; i < len; i++) numb += this.data[this.index + i] * 2**((len-i-1)*8);
    this.index += len;
    return numb;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}