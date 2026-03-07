

function TableBuilder(){

    this.columns = [];
    this.data = [];
    this.lineSeparator = '\r\n';

    this.ColumnsFromObject = function(obj){
        if(obj === undefined) return [];

        this.columns = Object.keys(obj);
        return this;
    }

    this.SetData = function(data){
        this.data = data;
        return this;
    }

    this.BuildCsv = function(delimiter = ',', csvAddExcelSeparator= false){
        const header = this.columns.join(delimiter);

        let csvString = "";
        if(csvAddExcelSeparator) csvString += `sep=${delimiter}${this.lineSeparator}`;
        csvString += header + this.lineSeparator;

        for(let i = 0; i < this.data.length; ++i){
            const row = this.columns.map(col => this.data[i][col]).join(delimiter);

            csvString += row + this.lineSeparator;
        }

        return csvString;
    }

    this.BuildHTML = function() {
        let htmlString = "";
        this.columns.forEach(col=> {htmlString += `<th>${col}</th>`});

        htmlString = `<thead><tr>${htmlString}</tr></thead>`;

        for(let i = 0; i < this.data.length; ++i){
            let row = "";
            this.columns.forEach(col=> {row += `<td>${this.data[i][col]}</td>`});
            row = `<tr>${row}</tr>`;

            htmlString += row;
        }

        htmlString = `<table class="evenOddTable">${htmlString}</table>`;

        return htmlString;
    }
}