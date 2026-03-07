function l2l1Utils_getAllRnti(){
    let rntiColumnNames = packetTable_allColumnNames.filter(name => name.endsWith('.rnti'));
    let values = new Set()

    if(rntiColumnNames.length === 0) return [];

    for(const packet of packets){
        for(const col of rntiColumnNames){
            const rnti = getPacketValue(packet,col);
            if(rnti === undefined) continue;

            values.add(rnti);
        }
    }

    return [...values].sort((x, y) => x - y)
}

function l2l1Utils_getCfoFactor(u){
    return (15000 << u) / 2 / 4 / Math.PI; // div 4 (ltv from 5GMAX)
}

function l2l1Utils_getCfoFactorDescription(){
    return `(15000 << u) / 2 / 4 / PI`;
}