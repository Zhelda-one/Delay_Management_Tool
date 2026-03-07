const getErrors = (callback) => {
    const url = "http://localhost:3001/getErrors";
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const data = JSON.parse(this.responseText);
            callback(data);
        }
    };

    xhr.open('get', url, true);
    xhr.setRequestHeader("Content-Type", "application/JSON");
    xhr.send();
}

window.onload = () => {
    getErrors((data)=>{
        console.log(data);


        const table = document.createElement('table');
        table.appendChild(generateTableHeader());


        for(const value of data){
            const tr = document.createElement("tr");

            for(const key of ["message", "source", "line", "count", "browserStr", "time", "userId"]){
                const td = document.createElement("td");
                td.innerHTML = value[key];
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        document.getElementById("errors").appendChild(table);


    });
}

const generateTableHeader = () => {
    const tr = document.createElement("tr");

    for(const key of ["Message", "Source", "Lines", "Count", "Browsers", "Last occurence", "Number of users"]){
        const th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    }
    return tr;
}