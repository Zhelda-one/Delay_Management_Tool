const generateBasicTable = (data) => {
    const table = document.createElement("table")
    generateRowsToTable(data, table);
    document.getElementById("basicStats").appendChild(table);
}



const generatePerformanceTable = (data, sortingKey) => {

    const table = document.createElement('table');
    table.appendChild(generateTableHeader(data));


    for(const [key, value] of Object.entries(data).sort(function(a, b) {
        return b[1][sortingKey] - a[1][sortingKey];
    })){
        const tr = document.createElement("tr");
        const tcBrowser = document.createElement("td");
        tcBrowser.innerHTML = key;
        tr.appendChild(tcBrowser);

        for(const [key2, value2] of Object.entries(value)){
            const tc = document.createElement("td");
            tc.innerHTML = value2;
            tr.appendChild(tc);
        }

        table.appendChild(tr);
    }

    document.getElementById("basicStats").appendChild(table);
}

const generateMuLTITable = (data, sortingKey) => {
    const table = document.createElement('table');
    const trH = document.createElement('tr');

    const th1 = document.createElement('th');
    th1.innerText = "MuLTI version";
    const th2 = document.createElement('th');
    th2.innerText = "Count";
    trH.appendChild(th1);
    trH.appendChild(th2);
    table.appendChild(trH);


    for (const [key, value] of Object.entries(data).sort(function (a, b) {
        return b[1] - a[1];
    })) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML = key;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.innerHTML = value;
        tr.appendChild(td2);


        table.appendChild(tr);
    }

    document.getElementById("basicStats").appendChild(table);
}

const generateTableHeader = (data) => {
    const tr = document.createElement("tr");

    tr.appendChild(document.createElement("th"));


    for(const [key, value] of Object.entries(Object.entries(data)[0][1])){

        const th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    }
    return tr;
}


const generateRowsToTable = (data, table) => {
    const basicStats = document.getElementById("basicStats");

    for (const [key, value] of Object.entries(data)) {

        if(typeof value !== "object"){
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            td1.innerHTML = key;
            td2.innerHTML = value;
            // p.innerHTML = key + ": " + value;
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
        }
        // basicStats.appendChild(p);
    }
}