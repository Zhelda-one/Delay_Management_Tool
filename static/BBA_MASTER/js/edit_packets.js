const modifiedPackets = new Set();

function clicked_edit_packet_button(){
    getElementById("edit_packet_edit_button").hidden = true;

    for(let tr of packetDetailsDialog_propTable_body.childNodes){

        const name = tr.childNodes[0].innerText;
        const value = tr.childNodes[1].innerText;

        if(isRowEditable(name)){
            if(!Object.keys(packetPropToStrMap).includes(name)){
                const input = document.createElement("input");
                input.value = value;
                input.type = "text";
                input.style.textAlign = "right";
                input.typeof = typeof getPacketValue(packets[clicked_packet], name);
                tr.childNodes[1].innerHTML = "";
                tr.childNodes[1].appendChild(input);

                tr.childNodes[1] = input;
            }
            else{
                const select = document.createElement("select");
                select.typeof = "select";

                for(let i in packetPropToStrMap[name]){
                    const option = document.createElement("option");
                    option.value = option.innerText = packetPropToStrMap[name][i];
                    select.appendChild(option);
                }

                let j = 0;
                for(let i in packetPropToStrMap[name]) {
                    if (value.includes(packetPropToStrMap[name][i])) {
                        select.selectedIndex = j;
                    }
                    j++;
                }

                tr.childNodes[1].innerHTML = "";
                tr.childNodes[1].appendChild(select);
                tr.childNodes[1] = select;
            }


        }
    }

    getElementById("edit_packet_accept_button").hidden = false;
    getElementById("edit_packet_discard_button").hidden = false;
    getElementById("edit_packet_edit_button").hidden = true;

}

function isRowEditable(name){
    return (!Object.keys(packetPropToStrMap).includes(name) && name != 'PtpTime') || name === "ecpri.dataDir";
}

function edit_packet_accept_changes(){

    getElementById("edit_packet_accept_button").hidden = true;
    getElementById("edit_packet_discard_button").hidden = true;
    getElementById("edit_packet_edit_button").hidden = false;

    for(let tr of packetDetailsDialog_propTable_body.childNodes){

        const name = tr.childNodes[0].innerText;
        const value = tr.childNodes[1].firstChild.value;
        if(value === undefined) continue;

        changePacketValue(clicked_packet, name, value, tr.childNodes[1].firstChild.typeof);

        tr.childNodes[1].innerHTML = value;
    }
    modifiedPackets.add(clicked_packet);
    packetTable_renderPackets();
}

function edit_packet_discard_changes(){

    getElementById("edit_packet_accept_button").hidden = true;
    getElementById("edit_packet_discard_button").hidden = true;
    getElementById("edit_packet_edit_button").hidden = false;

    packetDetailsDialog_showPacketWithId(clicked_packet)
}
function changePacketValue(id, name, value, type){
    if(name === 'time'){
        packets[id].time = strToTime(value);
        return;
    }

    if(type === "number"){
        setPacketValue(packets[id],name,Number(value));
    }
    else if(type === "object"){
        setPacketValue(packets[id], name, value.split(",").map((a) => Number(a)) );
    }
    else if(type === "select"){
        const key = Object.keys(packetPropToStrMap[name]).find(key => packetPropToStrMap[name][key] === value);
        setPacketValue(packets[id],name,Number(key));
    }
    else{
        setPacketValue(packets[id],name,value);
    }
}