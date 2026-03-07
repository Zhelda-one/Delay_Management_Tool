const packetDetailsDialog = /** @type {PacketDetailsDialog} */ getElementById('packetDetailsDialog');

const packetDetailsDialog_propTable = getElementById( 'packetDetailsDialog_propTable' );
const packetDetailsDialog_propTable_body = packetDetailsDialog_propTable.tBodies[0];
const packetDetailsDialog_pm_file = getElementById( 'packetDetailsDialog_pm_file' );
const packetDetailsDialog_hacRx_debugTrace = getElementById('packetDetailsDialog_hacRx_debugTrace');
const packetDetailsDialog_noPayload = getElementById( 'packetDetailsDialog_noPayload' );
const packetDetailsDialog_payload = getElementById( 'packetDetailsDialog_payload' );
const packetDetailsDialog_payload_bytes = getElementById( 'packetDetailsDialog_payload_bytes' );
const packetDetailsDialog_linkedPackets = getElementById( 'packetDetailsDialog_linkedPackets' );

const packetDetailsDialog_iq_graph = getElementById('packetDetailsDialog_iq_graph');
const packetDetailsDialog_amp_graph = getElementById('packetDetailsDialog_amp_graph');

class PacketDetailsDialog extends Dialog {

    constructor(){
        super("Packet Details");

    }

    getFromUI() {

    }
    setToUI() {

    }
}
customElements.define('bba-packet-details-dialog', PacketDetailsDialog);

function packetDetailsDialog_showPacketWithId( pktId ) {
    clicked_packet = pktId;
    const rawPkt = packets[pktId];

    if(canPacketContainIqData(rawPkt)){
        packetDetailsDialog_iq_graph.show();
        packetDetailsDialog_amp_graph.show();
        packetDetailsDialog_drawIqAmpPlots(pktId);
    } else{
        packetDetailsDialog_iq_graph.hide();
        packetDetailsDialog_amp_graph.hide();
    }

    let propTableStr = '';
    let lastPropName = '~';

    const colNamesWithVals = getPacketsColumnsWithValues(rawPkt);

    for( const propName in colNamesWithVals ) {
        const prop = colNamesWithVals[propName];

        let propStr = packetPropToValue.hasOwnProperty( propName ) ? packetPropToValue[propName]( prop, false, pktId ) : prop;

        if( packetPropToStrMap.hasOwnProperty( propName ) && packetPropToStrMap[propName].hasOwnProperty( prop ) ) {
            propStr += ` - ${ packetPropToStrMap[propName][prop] }`;
        }

        if(Array.isArray(prop) && prop.length === 0){
            propStr += '[empty array]';
        }

        const name = getEnumMemberName(propName, pktId);

        if (name) {
            propStr += ` - ${name}`;
        }

        let periodPos = 0;
        for( let j = 0; j < propName.length; ++j ) {
            if( j >= lastPropName.length ) break;
            if( propName[j] !== lastPropName[j] ) break;
            if( propName[j] === '.' ) periodPos = j;
        }
        const malformedClass = packet_errors_list[pktId] && Object.keys(packet_errors_list[pktId]).length>0 && packet_errors_list[pktId][propName] ? "class = 'malformed'" : "";
        const warningClass = packet_warnings_list[pktId] && Object.keys(packet_warnings_list[pktId]).length>0 && packet_warnings_list[pktId][propName] ? "class = 'warning'" : "";

        const extraInfoStr = packetTable_gerPropExtraInfoStr( propName, rawPkt);

        if( periodPos !== 0 ) {
            propTableStr += `<tr ${malformedClass} ${warningClass}><td><span class="unaltered">${ propName.substring( 0, ++periodPos ) }</span>${ propName.substring( periodPos ) }</td><td>${ propStr } ${extraInfoStr}</td></tr>`;
        } else {
            propTableStr += `<tr ${malformedClass} ${warningClass}><td>${ propName }</td><td>${ propStr } ${extraInfoStr}</td></tr>`;
        }

        lastPropName = propName;
    }
    packetDetailsDialog_propTable_body.innerHTML = propTableStr;

    generate_linked_packet_button(pktId);

    packetDetailsDialog_pm_file.innerHTML = '';
    if (getPacketValue(rawPkt, 'ecpri.pmfile') !== undefined) {
        packetDetailsDialog_pm_file.innerHTML = pm_file_generate_packet_details( getPacketValue(rawPkt, 'ecpri.pmfile') );
    }

    const payloadOffset = packetsPayloadOffset[pktId];

    packetDetailsDialog_hacRx_debugTrace.innerHTML = '';
    if ( ( getPacketValue(rawPkt, 'ecpri.elementId') !== undefined) && ( rawPkt['ecpri.elementId'] === '0x3000' ) ) {
        const pktOff = payloadOffset + 30;
        const pktLength = getPacketValue(rawPkt,'ecpri.dataLength');
        packetDetailsDialog_hacRx_debugTrace.innerHTML = hacRx_generate_packet_details(packetsPayloadBuffer, pktOff, pktLength);
    }

    if( payloadOffset !== -1 ) {
        const pktLen = rawPkt.length;
        const pktPtr = new Uint8Array( packetsPayloadBuffer, payloadOffset, pktLen );

        let str = '';
        for( let i = 0; i < pktLen; i += 16 ) {
            let strBytes = '';
            let strChars = '';

            for( let j = 0; j < 16; ++j ) {
                const offset = i + j;
                if( offset < pktLen ) {
                    const byte = pktPtr[offset];
                    strBytes += ( byte < 0x10 ? '0' : '' ) + byte.toString( 16 ) + ' ';
                    strChars += ( byte >= 0x21 && byte <= 0x7E ) ? byteToAsciiWeb[byte] : '<span>.</span>';
                } else {
                    strBytes += '   ';
                }
                if( j === 7 ) {
                    strBytes += ' ';
                    strChars += ' ';
                }
            }

            let iStr = '';
            if( i < 0x10 ) { iStr += '0x000'; }
            else if( i < 0x100 ) { iStr += '0x00'; }
            else if( i < 0x1000 ) { iStr += '0x0'; }
            else { iStr += '0x'; }

            iStr += i.toString( 16 );

            str += i % 256 === 0 ? `<b>${ iStr }</b>` : iStr;
            str += `: ${ strBytes } ${ strChars }<br>`;
        }
        packetDetailsDialog_payload_bytes.innerHTML = str;
    }

    packetDetailsDialog_noPayload.hidden = payloadOffset !== -1;
    packetDetailsDialog_payload.hidden = payloadOffset === -1;

    if( packetDetailsDialog.hidden ) packetDetailsDialog.open();

    const maxLeft = window.innerWidth - packetDetailsDialog.offsetWidth - 1;
    if( packetDetailsDialog.offsetLeft > maxLeft ) packetDetailsDialog.style.left = `${ maxLeft }px`;

    const maxTop = window.innerHeight - packetDetailsDialog.offsetHeight - 10;
    if( packetDetailsDialog.offsetTop > maxTop ) packetDetailsDialog.style.top = `${ maxTop }px`;

    const section_select = getElementById("section_select");

    if((packets[pktId].ecpri && (packets[pktId].ecpri.message === 0 || packets[pktId].ecpri.message === 2)) && packets[pktId].ecpri.sections){
        getElementById("show_in_iq_mode").hidden = false;
        section_select.innerHTML = "";
        for(let i = 0; i < packets[pktId].ecpri.sections.length; i++){
            const select = document.createElement("option");
            select.value = i;
            select.innerHTML = "Section " + i;
            section_select.appendChild(select);
        }
    }
    else{
        getElementById("show_in_iq_mode").hidden = true;
    }

    getElementById('decode_DCI_payload_decodedInfo').innerHTML = '';
    if(packets[pktId].l2l1 && ["DlData::PdcchSendReq","DlData::PdcchSendReqL1sw"].includes(packetPropToStrMap['l2l1.message'][packets[pktId].l2l1.message])){
        getElementById("decode_DCI_payload").hidden = false;
        const dciInfo_select = getElementById("dciInfo_select");
        dciInfo_select.innerHTML = '';
        for(let i = 0; i < packets[pktId].l2l1.dciInfo.length; i++){
            const select = document.createElement("option");
            select.value = i;
            select.innerHTML = "dciInfo " + i;
            dciInfo_select.appendChild(select);
        }
    }
    else{
        getElementById("decode_DCI_payload").hidden = true;
    }

    if(packets[pktId].l2l1 && ["DlData::PdschPayloadTbSendReq","DlData::PdschPayloadTbSendReqL1sw" ].includes(packetPropToStrMap['l2l1.message'][packets[pktId].l2l1.message])){
        getElementById("decode_PDSCH_payload").hidden = false;
    }
    else{
        getElementById("decode_PDSCH_payload").hidden = true;
    }

    getElementById("edit_packet_accept_button").hidden = true;
    getElementById("edit_packet_discard_button").hidden = true;
    getElementById("edit_packet_edit_button").hidden = false;

    if ( packets[pktId].ecpri !== undefined && [1, 3].includes(packets[pktId].ecpri.filterIndex) ) {
        document.getElementById('prach_decode_packets_tab').hidden = false
        document.getElementById('prach_decode_packets_tab').innerHTML = "<button id='prach_decode_button' onclick='prachDecodePacketsTab("+pktId+")'>Decode PRACH</button>"
        document.getElementById('prach_decode_packets_tab').innerHTML = "<input type='button' id='prachButton' value='Prach'onclick="+"prachDialog.open()"+"></input>"
        document.getElementById('prachButton').addEventListener('click', prachDecodePacketsTab);
        document.getElementById('prachButton').pktId = pktId;
    } else {
        document.getElementById('prach_decode_packets_tab').hidden = true
    }

    document.getElementById("error_dialog").innerHTML = "";
    for(let i in packet_errors_list[pktId]) {
        getElementById("error_dialog").innerHTML += packet_errors_list[pktId][i] + "<br/>";
    }
    for(let i in packet_warnings_list[pktId]) {
        getElementById("error_dialog").innerHTML += packet_warnings_list[pktId][i] + "<br/>";
    }

    appendBeamformingOptions();
}

function packetDetailsDialog_drawIqAmpPlots(pktId){

    try{
        const u = ecpri_uInPkt[pktId];
        const ecpri = packets[pktId].ecpri;
        const antId = ( ecpri.dataDir ? 0x10000 : 0 ) + ecpri.rtcId;
        const finalSubframe = ecpri.hfn * 2560 + ecpri.frameId * 10 + ecpri.subframeId;
        const finalSymbol = ( ecpri.slotId >> ( u <= 5 ? ecpri_maxU - u : 0 ) ) * 14 + ecpri.startSymbolId;

        const iqBuf = iqBuffers[u][antId];
        const iqBufOff = iqOffsets[u][antId][finalSubframe][finalSymbol];
        const iq = new Float32Array( iqBuf.buffer, iqBufOff * 4, iqNumPrb[u][antId][finalSubframe][finalSymbol] * 24 );

        let i_samples = [];
        let q_samples = [];

        for(let i = 0; i < ecpri.sections.length; ++i){
            const startPrb = ecpri.sections[i].startPrb * 24;
            const endPrb = ecpri.sections[i].numPrb * 24 + startPrb;

            let i_filtered = iq.filter((_, id) => id >= startPrb && id < endPrb && id % 2 === 0);
            let q_filtered = iq.filter((_, id) => id >= startPrb && id < endPrb && id % 2 === 1);
            i_samples = i_samples.concat(Array.from(i_filtered));
            q_samples = q_samples.concat(Array.from(q_filtered));
        }
        const amp_samples = [];
        for(let i = 0; i < i_samples.length; ++i){
            amp_samples.push(Math.sqrt(i_samples[i]*i_samples[i] + q_samples[i]*q_samples[i]));
        }

        packetDetailsDialog_iq_graph.graph2d.draw([i_samples], [q_samples]);
        packetDetailsDialog_amp_graph.graph2d.draw([], [amp_samples]);

        return;
    }
    catch(e){
        //console.log("No IQ Samples");
        packetDetailsDialog_iq_graph.graph2d.draw([], []);
        packetDetailsDialog_amp_graph.graph2d.draw([], []);
    }

    if ((packets[pktId].roe) && (packets[pktId].roe.subtype !== 252)) {
        const roe = packets[pktId].roe;
        const amp_samples = [];
        for(let i = 0; i < roe.time_i[roe.flow_mac].length; ++i){
            amp_samples.push(Math.sqrt(roe.time_i[roe.flow_mac][i]*roe.time_i[roe.flow_mac][i] + roe.time_q[roe.flow_mac][i]*roe.time_q[roe.flow_mac][i]));
        }

        packetDetailsDialog_iq_graph.graph2d.draw([ Array.from( roe.time_i[roe.flow_mac].slice(roe.start,roe.end)) ], [ Array.from(roe.time_q[roe.flow_mac].slice(roe.start,roe.end)) ]);
        packetDetailsDialog_amp_graph.graph2d.draw([], [amp_samples]);

        return;
    }

    packetDetailsDialog_iq_graph.graph2d.draw([], []);
    packetDetailsDialog_amp_graph.graph2d.draw([], []);
}

function generate_linked_packet_button(packetId){
    packetDetailsDialog_linkedPackets.innerHTML = "";

    const linkedPackets = get_linked_packets(packetId)

    if(linkedPackets.linkedCP !== null){
        const button = document.createElement("button");
        button.innerText = "Linked CP packet: " + linkedPackets.linkedCP;

        button.addEventListener("click", () => {
            packetDetailsDialog_showPacketWithId(linkedPackets.linkedCP);
        })
        packetDetailsDialog_linkedPackets.appendChild(button);
    }

    if(linkedPackets.linkedIQs !== null && linkedPackets.linkedIQs.length > 0){
        packetDetailsDialog_linkedPackets.innerText += "Linked UP packets: ";

        for(let i = 0; i < linkedPackets.linkedIQs.length; i++){
            const button = document.createElement("button");
            button.innerText = "Packet " + linkedPackets.linkedIQs[i];

            button.addEventListener("click", () => {
                packetDetailsDialog_showPacketWithId(linkedPackets.linkedIQs[i]);
            })
            packetDetailsDialog_linkedPackets.appendChild(button);
        }
    }
}