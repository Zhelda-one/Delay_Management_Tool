
const chartColors = ["rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 0, 0)",
    "rgb(255, 255, 0)", "rgb(255, 0, 255)", "rgb(0, 255, 255)",
    "rgb(128, 0, 255)", "rgb(255, 128, 0)", "rgb(128, 0, 128)",
    "rgb(128, 128, 0)", "rgb(0, 128, 128)", "rgb(128, 255, 128)"
];

const generateUsageCharts = (data) => {
    const [firstMonth, lastMonth] = findFirstLastMonth(data);
    const labels = generateMonthLabels(firstMonth, lastMonth);


    drawLineChart(generateDatasetForAllUsages(data, firstMonth, lastMonth), labels, "All page usages", "Months", "Number of usages");
    drawLineChart(generateDatasetsForEachFileType(data, firstMonth, lastMonth), labels, "Usages by file type","Months", "Number of usages");
}

const generateExtendedCharts = (data, title, xLabel, yLabel) => {
    const [firstMonth, lastMonth] = findFirstLastMonth(data);
    const labels = generateMonthLabels(firstMonth, lastMonth);
    drawLineChart(generateDatasetsForEachFileType(data, firstMonth, lastMonth), labels, title, xLabel, yLabel);
}

const generateMemoryUsageCharts = (data) => {
    const [firstDay, lastDay] = findFirstLastDay(data);
    const labels = generateDayLabels(firstDay, lastDay);
    const datasets = generateDatasetsForMemoryUsage(data, firstDay, lastDay);
    drawLineChart(datasets, labels, "Average memory usage","Days", "Used heap size [MB]");
}
