const pdschDecodeResultDialog = /** @type {PdschDecodeResultDialog} */ getElementById('pdschDecodeResultDialog');

let pdschDecodeResultDialog_resultToShow = {};


class PdschDecodeResultDialog extends Dialog {

    constructor(){
        super("PDSCH Decode Result");

    }

    getFromUI() {

    }
    setToUI() {
        const dialogBody = pdschDecodeResultDialog.children[1];
        const bgColors = { //RGB format
            "pdcch-ConfigCommon" : "#66FF66",
            "pucch-ConfigCommon" : "#66FF66",
            "rach-ConfigCommon" : "#FFFFFF",
            "pdsch-ConfigCommon" : "#0080FF",
            "pusch-ConfigCommon" : "#0080FF",

            "pdcch-Config" : "#66FF66",
            "pucch-Config" : "#66FF66",

            "pdsch-Config" : "#0080FF",
            "pusch-Config" : "#0080FF",
            "srs-Config" : "#E4F402",
            "csi-MeasConfig" : "#008833",

            "rrcSetup" : "#FF9999",
            "mac-CellGroupConfig" : "#FF66FF",

            "cellSelectionInfo" : "#E6F98A",
            "cellAccessRelatedInfo" : "#BBF98A",
            "connEstFailureControl" : "#9EFBC9",
            "si-SchedulingInfo" : "#B8F7EE",
            "servingCellConfigCommon" : "#FCA5A5",
            "ims-EmergencySupport" : "#FCCBA5",
            "eCallOverfMS-Support" : "#F0A5FC",
            "ue-TimersAndConstants" : "#A5B8FC",
            "uac-BarringInfo" : "#B8E4F7",
            "useFullResumeID" : "#A5FCCB",

            "sib2" : "#E6F98A",
            "sib3" : "#BBF98A",
            "sib4" : "#9EFBC9",
            "sib5" : "B8F7EE",
            "sib6" : "FCA5A5",

        }
        // const colors = ["#E6F98A", "#BBF98A", "#9EFBC9", "#B8F7EE", "#B8E4F7"]
        dialogBody.innerHTML = "";
        dialogBody.style = "width: auto; min-width: 400px; z-index: 3; overflow-y: auto;";
        pdschPayloadDecodeResultDialog_appendEntries(dialogBody,pdschDecodeResultDialog_resultToShow,0,null,bgColors);
    }
}
customElements.define('bba-pdsch-decode-result-dialog', PdschDecodeResultDialog);

function decode_PDSCH_packet_payload(input_params_PDSCH){
    const PDSCH_channel = 3;
    let params_PDSCH;
    if(!input_params_PDSCH){ //Pdsch params are obtained through (subcell,sfn,slot) of clicked packet
        const pkt = packets[clicked_packet];
        // if(!pkt.l2l1 || !pkt.l2l1.payload) return;
        // payload = pkt.l2l1.payload;
        if(nr_l2l1_packets === null) nr_init_L2L1_interface();
        const params_PDSCH_arr = pdsch_GetParametersArr(null,null,null,null,PDSCH_channel,nr_l2l1_packets,pkt.l2l1.subcellId,pkt.l2l1.sfn,pkt.l2l1.slot);
        params_PDSCH = nr_GetParametersFromParametersArr(params_PDSCH_arr,null,null,pkt.l2l1.rnti);
    }
    else params_PDSCH = input_params_PDSCH; //Pdsch params are provided

    if(!params_PDSCH || !params_PDSCH["payload"]){
        // getElementById("decode_information").innerHTML += createInfoTable({"Error":"Corresponding PdschSendReq could not be obtained"},``).outerHTML;
        pdschDecodeResultDialog_resultToShow = {"Error":"Corresponding PdschSendReq could not be obtained or it contains no payload bits"};
        pdschDecodeResultDialog.setToUI();
        pdschDecodeResultDialog.open();
        return;
    }

    const bits = params_PDSCH["payload"].map(val => val.toString(2).padStart(8,"0")).join("");

    let decoded_payload = {};
    try{
        if(params_PDSCH["n_rnti"] === 0xFFFF) [decoded_payload,] = decode_BCCH_DL_SCH_Message(bits,0);
        else if(params_PDSCH["rachStatus"] === 2) decoded_payload = decode_RAR_PDSCH(bits);
        else if(params_PDSCH["rachStatus"] === 4) decoded_payload = decode_MAC_PDU(bits); //for now only for rachStatus = 4
        else decoded_payload = {"Error":"This payload is not one of {SIB1,OSI,MSG2,MSG4}. It is not yet supported."};

        if(Object.keys(decoded_payload).length === 0){
            decoded_payload = {"Error":"Pdsch could not be decoded"};
        }

        pdschDecodeResultDialog_resultToShow = decoded_payload;
        pdschDecodeResultDialog.setToUI();
        pdschDecodeResultDialog.open();
        if(params_PDSCH["rachStatus"] === 4){  //set dci config from MSG4
            for(let i = 0; i < Object.keys(decoded_payload).length; i++){
                if(decoded_payload[`subPDU#${i}`].payload.CCCH){
                    dci_autodetect_from_RRC(decoded_payload[`subPDU#${i}`].payload.CCCH.message);
                    break;
                }
            }
        }
    }
    catch(e){
        console.log(e.message);
        getElementById("decode_information").innerHTML += createInfoTable({"Error":e.message},'').outerHTML;
    }
}

//Draws properties of object in depth-first manner. Used to draw SIB structures upon pdsch decode
function pdschPayloadDecodeResultDialog_appendEntries(dialogBody,objToAppend,indent,useColor,allBgColors={}){
    let newIndent = indent + 20;
    for(let fieldName in objToAppend){
        if(!objToAppend.hasOwnProperty(fieldName)) continue;
        let fieldValue = objToAppend[fieldName];

        const row = document.createElement('div');
        row.style.marginLeft = indent.toString() + "px";
        row.style.border = "2px solid black";
        row.style.fontWeight = "bold";

        let bgColor = null;
        if(allBgColors[fieldName]){ //color to be enforced on self and all children
            bgColor = allBgColors[fieldName];
        }
        else if(useColor){ //color forced by parents
            bgColor = useColor;
        }
        row.style.backgroundColor = bgColor !== null ? bgColor : "#CECECE";

        if(typeof fieldValue !== 'object' && !Array.isArray(fieldValue) ){
            if(typeof fieldValue === "string" && fieldValue.length > 100) fieldValue = fieldValue.slice(0,100) + "...";
            row.innerText = "<"+fieldName+">"+fieldValue.toString()+"</"+fieldName+">"
            dialogBody.appendChild(row);
        }
        else{
            row.innerText = "<"+fieldName+">";
            dialogBody.appendChild(row); //if parent is Array we dont append rows as their fieldName is 0,1,2...
            pdschPayloadDecodeResultDialog_appendEntries(dialogBody,fieldValue,newIndent,bgColor,allBgColors);

            const closingTag = row.cloneNode(true);
            closingTag.innerText = "</"+fieldName+">";
            dialogBody.appendChild(closingTag);
        }
    }
}