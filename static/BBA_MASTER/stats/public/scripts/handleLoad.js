
const clearView = () => {
    document.getElementById("basicStats").innerHTML = "";
    document.getElementById("charts").innerHTML = "";
}

const requestStats = (url, callback) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const data = JSON.parse(this.responseText);
            loadReceivedElements(data);
        }
    };

    xhr.open('get', url, true);
    xhr.setRequestHeader("Content-Type", "application/JSON");
    xhr.send();
}


const loadReceivedElements = (data) => {
    clearView();

    if(data.hasOwnProperty("basicTableData")){
        generateBasicTable(data.basicTableData);
    }
    if(data.hasOwnProperty("browserPieChart")){
        drawPieChart(data["browserPieChart"].data, data["browserPieChart"].labels, "Browser usage");
    }
    if(data.hasOwnProperty("fileTypePieChart")){
        drawPieChart(data["fileTypePieChart"].data, data["fileTypePieChart"].labels, "File formats usage");
    }
    if(data.hasOwnProperty("browserLineChart")){
        generateExtendedCharts(data.browserLineChart, "Usage by browser type", "Months", "Number of usages");
    }
    if(data.hasOwnProperty("fileTypeLineChart")){
        generateUsageCharts(data.fileTypeLineChart);
    }
    if(data.hasOwnProperty("browserPerformanceTable")){
        generatePerformanceTable(data.browserPerformanceTable, "All loaded files");
    }
    if(data.hasOwnProperty("filePerformanceTable")){
        generatePerformanceTable(data.filePerformanceTable, "All loaded files");
    }
    if(data.hasOwnProperty("loadingTimesLineChart")){
        for(const [key, value] of Object.entries(data["loadingTimesLineChart"])){
            const chartValue = Object.keys(value).map((key2) => value[key2]);
            drawBubbleChart(addDataToDrawBubbleChart(chartValue), key, "Time [s]", "File size [mb]");
        }
    }
    if(data.hasOwnProperty("systemPieChart")){
        drawPieChart(data["systemPieChart"].data, data["systemPieChart"].labels, "Operational system usage");
    }
    if(data.hasOwnProperty("windowSizePieChart")){
        drawPieChart(data["windowSizePieChart"].data, data["windowSizePieChart"].labels, "Screen size");
    }
    if(data.hasOwnProperty("browserVersionPieChart")){
        drawPieChart(data["browserVersionPieChart"].data, data["browserVersionPieChart"].labels, "Browser version");
    }
    if(data.hasOwnProperty("memoryUsageLineChart")){
        generateMemoryUsageCharts(data.memoryUsageLineChart);
    }
    if(data.hasOwnProperty("muLTITable")){
        generateMuLTITable(data.muLTITable);
    }
    if (Object.hasOwn(data, "clickedTabLineChart")) {
        generateExtendedCharts(data.clickedTabLineChart, "Clicked tab", "Months", "Number of clicks");
    }
    if (Object.hasOwn(data, "clickedHeaderPieChart")) {
        drawPieChart(data.clickedHeaderPieChart.data, data.clickedHeaderPieChart.labels, "Header buttons clicks");
    }
}

