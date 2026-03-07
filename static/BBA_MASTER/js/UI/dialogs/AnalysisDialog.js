const analysisDialog = /** @type {AnalysisDialog} */ getElementById('analysisDialog');

class AnalysisDialog extends Dialog {

    constructor(){
        super("Analysis Dialog");

    }

    getFromUI() {

    }
    setToUI() {

    }

    onLoad(){

    }
}
customElements.define('bba-analysis-dialog', AnalysisDialog);

function create_ANALYSIS_body(frame, subframe, slot, symbol, rb, re, clicked, clicked_fcp){

    const vst = canvas_viewports[canvas_mouseDownViewportIdx];
    const dialog_body = analysisDialog.body.querySelector('.frame_structure');
    dialog_body.innerText = "Frame: "+frame+"\nSubframe: "+subframe;

    const tbody = analysisDialog.body.querySelector("table>tbody");
    tbody.innerHTML = "";

    const fcp_div = analysisDialog.body.querySelector('.clicked_fcp');
    fcp_div.innerHTML="Clicked FCP packets: ";

    for(let u = 0; u < NUM_OF_U; u++) {
        if (!iqBuffers[u] || !vst.selectedU[u]) continue;

        const tr = document.createElement("tr");

        const td_1 = document.createElement("td");
        const td_2 = document.createElement("td");
        const td_3 = document.createElement("td");
        const td_4 = document.createElement("td");
        const td_5 = document.createElement("td");

        const td_6 = document.createElement("td");
        const td_7 = document.createElement("td");

        td_1.innerText = u;
        td_2.innerHTML = slot[u];
        td_3.innerHTML = symbol[u];
        td_4.innerText = rb[u];
        td_5.innerHTML = re[u];

        tr.appendChild(td_1);
        tr.appendChild(td_2);
        tr.appendChild(td_3);
        tr.appendChild(td_4);
        tr.appendChild(td_5);

        tr.appendChild(td_6);
        tr.appendChild(td_7);

        if(clicked[u] !== null){
            const button = document.createElement("button");
            button.innerText = "Packet ID:  "+clicked[u];
            button.addEventListener("click", () => {packetDetailsDialog_showPacketWithId(clicked[u])}, false);

            td_6.innerHTML = "";
            td_6.appendChild(button);
            if(ecpri_pktLinks[clicked[u]] !== -1){
                const button2 = document.createElement("button");
                button2.innerText = "CP details";
                button2.addEventListener("click", () => {packetDetailsDialog_showPacketWithId(ecpri_pktLinks[clicked[u]])}, false);
                td_7.innerHTML = "";
                td_7.appendChild(button2);
            }
        }
        tbody.appendChild(tr);

        if(clicked_fcp[u]){
            for(let i = 0; i < clicked_fcp[u].length; i++){
                const button = document.createElement("button");
                button.innerText = clicked_fcp[u][i];
                button.addEventListener("click", () => {packetDetailsDialog_showPacketWithId(clicked_fcp[u][i])}, false);
                fcp_div.appendChild(button);
            }
        }
    }
}