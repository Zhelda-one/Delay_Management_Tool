let pmFile = [];
let pmFileRegistersArr = [];
let isPmFileLoaded = false;
let pmFileRegistersPerPacket = [];

let peCodes = [];

let isDeepRx = false;

let pdpNumOfSamples = 0;
let pdpNumOfRoots = 0;
const pdpIfftToNumOfSamples = {
    0: 192,
    1: 256,
    2: 384,
    3: 512,
    4: 768,
    5: 1024,
    6: 1536,
    7: 2048,
    8: 3072,
    9: 4096
};

let isTxStreamRoe = false;

function pm_file_decode(pm_file) {
    pmFile = [];
    pmFileRegistersArr = [];
    peCodes = [];

    let addressBlocks = pm_file.getElementsByTagName("spirit:addressBlock");

    for (let i = 0; i < addressBlocks.length; i++) {
        let addressBlock = {};

        for (let j = 0; j < addressBlocks[i].children.length; j++) {
            if (addressBlocks[i].children[j].nodeName === 'spirit:name') addressBlock.name = addressBlocks[i].children[j].innerHTML;
            if (addressBlocks[i].children[j].nodeName === 'spirit:baseAddress') addressBlock.minAddress = '0x' + BigInt(addressBlocks[i].children[j].innerHTML).toString(16);
            if (addressBlocks[i].children[j].nodeName === 'spirit:range') addressBlock.maxAddress = '0x' + (BigInt(addressBlock.minAddress) + BigInt(addressBlocks[i].children[j].innerHTML)).toString(16);
            if (addressBlocks[i].children[j].nodeName === 'spirit:width') addressBlock.width = addressBlocks[i].children[j].innerHTML;
            if (addressBlocks[i].children[j].nodeName === 'spirit:usage') addressBlock.usage = addressBlocks[i].children[j].innerHTML;
        }

        if (addressBlock.usage !== 'memory') {
            let registerFiles = [];
            let registers = [];

            for (let x = 0; x < addressBlocks[i].children.length; x++) {
                if (addressBlocks[i].children[x].nodeName === 'spirit:registerFile') registerFiles.push(addressBlocks[i].children[x])
                if (addressBlocks[i].children[x].nodeName === 'spirit:register') registers.push(addressBlocks[i].children[x])
            }

            if (registerFiles.length) {
                addressBlock.registerFiles = [];
                for (let y = 0; y < registerFiles.length; y++) {
                    let registerFiles2 = [];
                    let registers2 = [];
                    let registerFile = {};

                    for (let k = 0; k < registerFiles[y].children.length; k++) {
                        if (registerFiles[y].children[k].nodeName === 'spirit:name') registerFile.name = registerFiles[y].children[k].innerHTML;
                        if (registerFiles[y].children[k].nodeName === 'spirit:description') registerFile.description = registerFiles[y].children[k].innerHTML;
                        if (registerFiles[y].children[k].nodeName === 'spirit:dim') registerFile.dim = parseInt(registerFiles[y].children[k].innerHTML);
                        if (registerFiles[y].children[k].nodeName === 'spirit:addressOffset') registerFile.minAddress = '0x' + (BigInt(addressBlock.minAddress) + BigInt(registerFiles[y].children[k].innerHTML)).toString(16);
                        if (registerFiles[y].children[k].nodeName === 'spirit:range') registerFile.maxAddress = '0x' + (BigInt(registerFile.minAddress) + BigInt(registerFiles[y].children[k].innerHTML)).toString(16);
                        if (registerFiles[y].children[k].nodeName === 'spirit:registerFile') registerFiles2.push(registerFiles[y].children[k])
                        if (registerFiles[y].children[k].nodeName === 'spirit:register') registers2.push(registerFiles[y].children[k])
                    }
                    if (registerFiles2.length) {
                        registerFile.registerFiles = [];

                        for (let j = 0; j < registerFiles2.length; j++) {
                            let registers3 = [];
                            let registerFile2 = {};

                            for (let k = 0; k < registerFiles2[j].children.length; k++) {
                                if (registerFiles2[j].children[k].nodeName === 'spirit:name') registerFile2.name = registerFiles2[j].children[k].innerHTML;
                                if (registerFiles2[j].children[k].nodeName === 'spirit:description') registerFile2.description = registerFiles2[j].children[k].innerHTML;
                                if (registerFiles2[j].children[k].nodeName === 'spirit:dim') registerFile2.dim = parseInt(registerFiles2[j].children[k].innerHTML);
                                if (registerFiles2[j].children[k].nodeName === 'spirit:addressOffset') registerFile2.minAddress = '0x' + (BigInt(registerFile.minAddress) + BigInt(registerFiles2[j].children[k].innerHTML)).toString(16);
                                if (registerFiles2[j].children[k].nodeName === 'spirit:range') registerFile2.maxAddress = '0x' + (BigInt(registerFile2.minAddress) + BigInt(registerFiles2[j].children[k].innerHTML)).toString(16);
                                if (registerFiles2[j].children[k].nodeName === 'spirit:register') registers3.push(registerFiles2[j].children[k])
                            }

                            registerFile2.registers = [];

                            for (let k = 0; k < registers3.length; k++) {
                                let register = {};

                                for (let m = 0; m < registers3[k].children.length; m++) {
                                    if (registers3[k].children[m].nodeName === 'spirit:name') register.name = registers3[k].children[m].innerHTML;
                                    if (registers3[k].children[m].nodeName === 'spirit:description') register.description = registers3[k].children[m].innerHTML;
                                    if (registers3[k].children[m].nodeName === 'spirit:dim') register.dim = parseInt(registers3[k].children[m].innerHTML);
                                    if (registers3[k].children[m].nodeName === 'spirit:addressOffset') register.addressStart = '0x' + (BigInt(registerFile2.minAddress) + BigInt(registers3[k].children[m].innerHTML)).toString(16);
                                }

                                let fields = registers3[k].getElementsByTagName("spirit:field");
                                register.fields = [];

                                for (let m = 0; m < fields.length; m++) {
                                    let field = {};

                                    for (let n = 0; n < fields[m].children.length; n++) {
                                        if (fields[m].children[n].nodeName === 'spirit:name') field.name = fields[m].children[n].innerHTML;
                                        if (fields[m].children[n].nodeName === 'spirit:description') field.description = fields[m].children[n].innerHTML;
                                        if (fields[m].children[n].nodeName === 'spirit:bitOffset') field.bitOffset = parseInt(fields[m].children[n].innerHTML);
                                        if (fields[m].children[n].nodeName === 'spirit:bitWidth') field.bitWidth = parseInt(fields[m].children[n].innerHTML);
                                    }

                                    register.fields.push(field);
                                }

                                if (register.dim) {
                                    for (let m = 0; m < register.dim; m++) {
                                        let registerCopy = copyObject(register)
                                        registerCopy.name = register.name + `[${m}]`;
                                        registerCopy.addressStart = '0x' + (BigInt(register.addressStart) + BigInt(m * 8)).toString(16);
                                        registerFile2.registers.push(registerCopy);
                                    }
                                } else {
                                    registerFile2.registers.push(register);
                                }

                            }

                            if (registerFile2.dim) {
                                for (let m = 0; m < registerFile2.dim; m++) {
                                    let registerFileCopy = copyObject(registerFile2)
                                    registerFileCopy.name = registerFile2.name + `[${m}]`;
                                    registerFileCopy.minAddress = '0x' + (BigInt(registerFile2.minAddress) + BigInt(BigInt(m) * (BigInt(registerFile2.maxAddress) - BigInt(registerFile2.minAddress)))).toString(16);
                                    registerFileCopy.maxAddress = '0x' + (BigInt(registerFile2.maxAddress) + BigInt(BigInt(m) * (BigInt(registerFile2.maxAddress) - BigInt(registerFile2.minAddress)))).toString(16);
                                    for (let n = 0; n < registerFile2.registers.length; n++) {
                                        registerFileCopy.registers[n].name = addressBlock.name + '.' + registerFile.name + '.' + registerFileCopy.name + '.' + registerFileCopy.registers[n].name;
                                        registerFileCopy.registers[n].addressStart = '0x' + (BigInt(registerFile2.registers[n].addressStart) + BigInt(BigInt(m) * (BigInt(registerFile2.maxAddress) - BigInt(registerFile2.minAddress)))).toString(16);
                                        pmFileRegistersArr.push(registerFileCopy.registers[n]);
                                    }
                                    registerFile.registerFiles.push(registerFileCopy);
                                }
                            } else {
                                for (let n = 0; n < registerFile2.registers.length; n++) {
                                    registerFile2.registers[n].name = addressBlock.name + '.' + registerFile.name + '.' + registerFile2.name + '.' + registerFile2.registers[n].name;
                                    pmFileRegistersArr.push(registerFile2.registers[n]);
                                }
                                registerFile.registerFiles.push(registerFile2);
                            }

                        }
                    }
                    if (registers2.length) {
                        registerFile.registers = [];

                        for (let k = 0; k < registers2.length; k++) {
                            let register = {};

                            for (let m = 0; m < registers2[k].children.length; m++) {
                                if (registers2[k].children[m].nodeName === 'spirit:name') register.name = registers2[k].children[m].innerHTML;
                                if (registers2[k].children[m].nodeName === 'spirit:description') register.description = registers2[k].children[m].innerHTML;
                                if (registers2[k].children[m].nodeName === 'spirit:dim') register.dim = parseInt(registers2[k].children[m].innerHTML);
                                if (registers2[k].children[m].nodeName === 'spirit:addressOffset') register.addressStart = '0x' + (BigInt(registerFile.minAddress) + BigInt(registers2[k].children[m].innerHTML)).toString(16);
                            }

                            let fields = registers2[k].getElementsByTagName("spirit:field");
                            register.fields = [];

                            for (let m = 0; m < fields.length; m++) {
                                let field = {};

                                for (let n = 0; n < fields[m].children.length; n++) {
                                    if (fields[m].children[n].nodeName === 'spirit:name') field.name = fields[m].children[n].innerHTML;
                                    if (fields[m].children[n].nodeName === 'spirit:description') field.description = fields[m].children[n].innerHTML;
                                    if (fields[m].children[n].nodeName === 'spirit:bitOffset') field.bitOffset = parseInt(fields[m].children[n].innerHTML);
                                    if (fields[m].children[n].nodeName === 'spirit:bitWidth') field.bitWidth = parseInt(fields[m].children[n].innerHTML);
                                }

                                register.fields.push(field);
                            }
                            if (register.dim) {
                                for (let m = 0; m < register.dim; m++) {
                                    let registerCopy = copyObject(register);
                                    registerCopy.name = addressBlock.name + '.' + registerFile.name + '.' + register.name + `[${m}]`;
                                    registerCopy.addressStart = '0x' + (BigInt(register.addressStart) + BigInt(m * 8)).toString(16);
                                    registerFile.registers.push(registerCopy);
                                    pmFileRegistersArr.push(registerCopy);
                                }
                            } else {
                                register.name = addressBlock.name + '.' + registerFile.name + '.' + register.name;
                                registerFile.registers.push(register);
                                pmFileRegistersArr.push(register);
                            }
                        }
                    }
                    addressBlock.registerFiles.push(registerFile);
                }
            }
            if (registers.length) {
                addressBlock.registers = [];

                for (let k = 0; k < registers.length; k++) {
                    let register = {};

                    for (let m = 0; m < registers[k].children.length; m++) {
                        if (registers[k].children[m].nodeName === 'spirit:name') register.name = registers[k].children[m].innerHTML;
                        if (registers[k].children[m].nodeName === 'spirit:description') register.description = registers[k].children[m].innerHTML;
                        if (registers[k].children[m].nodeName === 'spirit:dim') register.dim = parseInt(registers[k].children[m].innerHTML);
                        if (registers[k].children[m].nodeName === 'spirit:addressOffset') register.addressStart = '0x' + (BigInt(addressBlock.minAddress) + BigInt(registers[k].children[m].innerHTML)).toString(16);
                    }

                    let fields = registers[k].getElementsByTagName("spirit:field");
                    register.fields = [];

                    for (let m = 0; m < fields.length; m++) {
                        let field = {};

                        for (let n = 0; n < fields[m].children.length; n++) {
                            if (fields[m].children[n].nodeName === 'spirit:name') field.name = fields[m].children[n].innerHTML;
                            if (fields[m].children[n].nodeName === 'spirit:description') field.description = fields[m].children[n].innerHTML;
                            if (fields[m].children[n].nodeName === 'spirit:bitOffset') field.bitOffset = parseInt(fields[m].children[n].innerHTML);
                            if (fields[m].children[n].nodeName === 'spirit:bitWidth') field.bitWidth = parseInt(fields[m].children[n].innerHTML);
                        }

                        register.fields.push(field);
                    }
                    if (register.dim) {
                        for (let m = 0; m < register.dim; m++) {
                            let registerCopy = copyObject(register)
                            registerCopy.name = addressBlock.name + '.' + register.name + `[${m}]`;
                            registerCopy.addressStart = '0x' + (BigInt(register.addressStart) + BigInt(m * 8)).toString(16);
                            addressBlock.registers.push(registerCopy);
                            pmFileRegistersArr.push(registerCopy);
                        }
                    } else {
                        register.name = addressBlock.name + '.' + register.name;
                        addressBlock.registers.push(register);
                        pmFileRegistersArr.push(register);
                    }
                }
            }
            if (addressBlock.name === 'FPGA_DESCRIPTOR_CFG') {
                for (let j = 0; j < registers.length; j++) {
                    for (let k = 0; k < registers[j].children.length; k++) {
                        if ((registers[j].children[k].nodeName === 'spirit:name') && (registers[j].children[k].innerHTML.startsWith('DESCRIPTOR'))) {
                            let fields = registers[j].getElementsByTagName("spirit:field");

                            for (let m = 0; m < fields.length; m++) {
                                for (let n = 0; n < fields[m].children.length; n++) {
                                    if ((fields[m].children[n].nodeName === 'spirit:name') && (fields[m].children[n].innerHTML === 'PE_CODE')) {
                                        let parameters = fields[m].getElementsByTagName("spirit:parameter");

                                        for (let o = 0; o < parameters.length; o++) {
                                            let parameter = {};

                                            for (let p = 0; p < parameters[o].children.length; p++) {
                                                if (parameters[o].children[p].nodeName === 'spirit:name') parameter.name = parameters[o].children[p].innerHTML;
                                                if (parameters[o].children[p].nodeName === 'spirit:value') parameter.value = parameters[o].children[p].innerHTML;
                                            }
                                            if (parameter.name === '_resetValue_') peCodes.push(parameter.value)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        pmFile.push(addressBlock);
    }
    pmFileRegistersArr.sort((a, b) => parseInt(BigInt(a.addressStart) - BigInt(b.addressStart)))
}

function analyze_pe_codes() {
    for (let i = 0; i < peCodes.length; i++) {
        if (parseInt(peCodes[i]) === 0) continue;
        // DeepRX
        if (parseInt(peCodes[i]) === parseInt('0x0700')) {
            getElementById('iqTab_header_channelDD_header').innerHTML = 'Streams &#x25BC';
            getElementById('iqTab_header_antDD_header').innerHTML = 'Layers / beams &#x25BC';
            getElementById('iqTab_header_channelDD_DL').hidden = true;
            getElementById('iqTab_header_channelDD_UL').hidden = true;
            getElementById('iqTab_header_channelDD_SL').hidden = true;

            Hraw_IQ = [];
            RxData_IQ = [];
            TxPilot_IQ = [];
            Llr_IQ = [];
            isDeepRx = true;
            break;
        }
    }
}

function pm_file_packet_decode(buf, bufferOffset, baseAddress, dataLength) {
    let ptr = new Uint8Array( buf, bufferOffset );
    let off = 0;
    let packetRegistersList = [];
    let isStartRegisterFound = false;
    let unknownRegister = {name: 'UNKNOWN_REGISTER'};

    for (let i = 0; i < pmFileRegistersArr.length; i++) {
        if (pmFileRegistersArr[i].addressStart === baseAddress) {
            isStartRegisterFound = true;
        }

        if (isStartRegisterFound) {
            if (off < dataLength) {

                let register = copyObject(pmFileRegistersArr[i]);

                if ((!isTxStreamRoe) && (register.description === 'ROE_CUSTOM_HEADER_DESC')) isTxStreamRoe = true;

                if ((BigInt(register.addressStart) - BigInt(baseAddress)) !== BigInt(off)) {
                    while (BigInt(0) < ((BigInt(register.addressStart) - BigInt(baseAddress) - BigInt(off)) / BigInt(8))) {
                        if (off < dataLength) {
                            let unknownCopy = copyObject(unknownRegister);
                            unknownCopy.addressStart = '0x' + (BigInt(baseAddress) + BigInt(off)).toString(16);
                            packetRegistersList.push(unknownCopy);
                            off += 8;
                        } else {
                            break;
                        }
                    }
                    if (off < dataLength) {
                        packetRegistersList.push(register);
                        off += 8;
                    }
                } else {
                    packetRegistersList.push(register);
                    off += 8;
                }
            } else {
                break;
            }
        }
    }

    let registerOffset = 0;
    for (let i = 0; i < packetRegistersList.length; i++) {
        let payloadWord = pcap_getU64(ptr, registerOffset);
        packetRegistersList[i].hexDump = '';

        for (let m = 7; m >= 0; m--) {
            const num = ptr[m+registerOffset];
            if (num <= 0xF) packetRegistersList[i].hexDump += '0';
            packetRegistersList[i].hexDump += num.toString(16) + ' ';
        }

        if (packetRegistersList[i].fields) {
            for (let j = 0; j < packetRegistersList[i].fields.length; j++) {
                packetRegistersList[i].fields[j].value = (payloadWord / (BigInt(2) ** BigInt(packetRegistersList[i].fields[j].bitOffset))) &
                    (BigInt(2) ** BigInt(packetRegistersList[i].fields[j].bitWidth) - BigInt(1));

                if (packetRegistersList[i].fields[j].name === 'ROOTSEQCOUNT') pdpNumOfRoots = parseInt(packetRegistersList[i].fields[j].value);
                if (packetRegistersList[i].fields[j].name === 'IFFTSIZE') pdpNumOfSamples = pdpIfftToNumOfSamples[parseInt(packetRegistersList[i].fields[j].value)];
            }
        }
        registerOffset += 8;
    }

    if (packetRegistersList.length !== 0) {
        pmFileRegistersPerPacket.push(packetRegistersList);
        return pmFileRegistersPerPacket.length - 1;
    } else {
        return null;
    }

}

function pm_file_generate_packet_details(pktId) {
    let pmFileRegistersPerPacketHTML = '<div><span class="pm_header" onclick="pm_file_toggle()">' +
        `<span id="pm_header_arrow" class="pm_header_arrow">&rarr;</span>PM File</span>` +
        `<input type="button" value="Expand / hide all registers" onclick="pm_file_all_toggle(${pktId})"><div id='pm_file_registers' hidden>`

    for (let i = 0; i < pmFileRegistersPerPacket[pktId].length; i++) {
        pmFileRegistersPerPacketHTML += `<div><span class="register_header" onclick="pm_file_register_toggle(${i})">` +
            `<span id="register_arrow_${i}" class="pm_header_arrow">&rarr;</span>  ${pmFileRegistersPerPacket[pktId][i].name} - ${pmFileRegistersPerPacket[pktId][i].addressStart}</span>`
        if (pmFileRegistersPerPacket[pktId][i].description) {
            pmFileRegistersPerPacketHTML += '<span class="tooltip">&nbsp;&nbsp;[?] ' +
                `<span class="tooltip_text">${pmFileRegistersPerPacket[pktId][i].description}</span>` +
                '</span>'
        }
        pmFileRegistersPerPacketHTML += `<div id='pm_file_register_${i}_fields' hidden><h2 class="pm_file_hex_dump">${pmFileRegistersPerPacket[pktId][i].hexDump}</h2>`
        if (pmFileRegistersPerPacket[pktId][i].fields) {
            for (let j = 0; j < pmFileRegistersPerPacket[pktId][i].fields.length; j++) {
                pmFileRegistersPerPacketHTML += `<p class="field">${pmFileRegistersPerPacket[pktId][i].fields[j].name} = ${pmFileRegistersPerPacket[pktId][i].fields[j].value}`
                if (pmFileRegistersPerPacket[pktId][i].fields[j].description) {
                    pmFileRegistersPerPacketHTML += '<span class="tooltip">&nbsp;&nbsp;[?] ' +
                        `<span class="tooltip_text">${pmFileRegistersPerPacket[pktId][i].fields[j].description}</span>` +
                        '</span></p>'
                } else {
                    pmFileRegistersPerPacketHTML += '</p>'
                }
            }
        }
        pmFileRegistersPerPacketHTML += '</div></div>'
    }
    pmFileRegistersPerPacketHTML += '</div>'

    return pmFileRegistersPerPacketHTML
}

function pm_file_toggle() {
    if (getElementById('pm_file_registers').hidden) {
        getElementById('pm_file_registers').hidden = false;
        getElementById('pm_header_arrow').innerHTML = '&darr;'
    } else {
        getElementById('pm_file_registers').hidden = true;
        getElementById('pm_header_arrow').innerHTML = '&rarr;'
    }
}

function pm_file_register_toggle(id) {
    if (getElementById(`pm_file_register_${id}_fields`).hidden) {
        getElementById(`pm_file_register_${id}_fields`).hidden = false;
        getElementById(`register_arrow_${id}`).innerHTML = '&darr;'
    } else {
        getElementById(`pm_file_register_${id}_fields`).hidden = true;
        getElementById(`register_arrow_${id}`).innerHTML = '&rarr;'
    }
}

function pm_file_all_toggle(pktId) {
    if (getElementById('pm_file_registers').hidden) {
        getElementById('pm_file_registers').hidden = false;
        getElementById('pm_header_arrow').innerHTML = '&darr;'
        for (let i = 0; i < pmFileRegistersPerPacket[pktId].length; i++) {
            getElementById(`pm_file_register_${i}_fields`).hidden = false;
            getElementById(`register_arrow_${i}`).innerHTML = '&darr;'
        }
    } else {
        getElementById('pm_file_registers').hidden = true;
        getElementById('pm_header_arrow').innerHTML = '&rarr;'
        for (let i = 0; i < pmFileRegistersPerPacket[pktId].length; i++) {
            getElementById(`pm_file_register_${i}_fields`).hidden = true;
            getElementById(`register_arrow_${i}`).innerHTML = '&rarr;'
        }
    }
}

function calculateMsg4Timings(msg4Packets) {
    let responseCounter = 0;

    for (let i = 0; i < msg4Packets.length; i++) {
        if ((msg4Packets[i].ecpri.requestResponse === 0) && (msg4Packets[i].ecpri.readWrite !== 2)) {
            responseCounter = 0;
            for (let j = i + 1; j < msg4Packets.length; j++) {
                if ((msg4Packets[j].ecpri.requestResponse === 0) &&
                    (msg4Packets[i].ecpri.readWrite === msg4Packets[j].ecpri.readWrite) &&
                    (msg4Packets[i].ecpri.elementId === msg4Packets[j].ecpri.elementId) &&
                    (msg4Packets[i].ecpri.address === msg4Packets[j].ecpri.address) &&
                    (msg4Packets[i].ecpri.remoteMemoryAccessId === msg4Packets[j].ecpri.remoteMemoryAccessId)) {
                    break;
                }

                if ((msg4Packets[j].ecpri.requestResponse === 1) &&
                    (msg4Packets[i].ecpri.readWrite === msg4Packets[j].ecpri.readWrite) &&
                    (msg4Packets[i].ecpri.elementId === msg4Packets[j].ecpri.elementId) &&
                    (msg4Packets[i].ecpri.address === msg4Packets[j].ecpri.address) &&
                    (msg4Packets[i].ecpri.remoteMemoryAccessId === msg4Packets[j].ecpri.remoteMemoryAccessId)) {

                    packets[ msg4Packets[j].id ]['responseTime[us]'] = ( packets[msg4Packets[j].id].time - packets[msg4Packets[i].id].time) * 1000000;
                    responseCounter++;
                }
            }
            if (responseCounter === 0) {
                add_packet_malfunction(msg4Packets[i].id, '[Msg4][Pkt #' + msg4Packets[i].id + " response is not existing]", 'ecpri.requestResponse')
            }
            if (responseCounter > 1) {
                add_packet_malfunction(msg4Packets[i].id, '[Msg4][Pkt #' + msg4Packets[i].id + " has more than 1 response]", 'ecpri.requestResponse')
            }
        }
    }
}