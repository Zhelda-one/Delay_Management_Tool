const drawPieChart = (data, labels, title) => {

    trimIfMoreThanNumberOfElementsInPieChart(data, labels, 8);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    let chartData = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: chartColors
            }]
        },
        options: {
            plugins: {
                title: { display: true, text: title }
            }
        }
    }

    const chart = new Chart(ctx, chartData);
    document.getElementById("charts").appendChild(canvas);
}

const drawLineChart = (dataSets, labels, title, xLabel, yLabel) => {

    trimIfMoreThanNumberOfElementsInLineChart(dataSets, 8);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');

    let chartData = {
        type: "line",
        data: {
            labels: labels,
            datasets: dataSets
        },
        options: {
            scales: {
                x: { title: { display: true, text: xLabel} },
                y: { title: { display: true, text: yLabel} }
            },
            plugins: {
                title: { display: true, text: title }
            }
        }

    }

    const chart = new Chart(ctx, chartData);
    document.getElementById("charts").appendChild(canvas);
}

const drawBubbleChart = (datasets, title, xLabel, yLabel) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');

    let chartData = {
        type: "bubble",
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: { title: { display: true, text: xLabel} },
                y: { title: { display: true, text: yLabel} }
            },
            plugins: {
                title: {text: title, display: true}
            }
        }
    }
    const chart = new Chart(ctx, chartData);
    document.getElementById("charts").appendChild(canvas);
}
