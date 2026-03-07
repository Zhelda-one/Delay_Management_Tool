const generateDatasetForAllUsages = (data, firstMonth, lastMonth) => {
    let dataset = {
        label: "All files loaded",
        backgroundColor: "blue",
        borderColor: "blue",
        data: []
    }

    for(let year = Number(firstMonth.split(".")[1]); year <= lastMonth.split(".")[1]; year++){
        const endingMonth = firstMonth.split(".")[1] === lastMonth.split(".")[1] ? Number(lastMonth.split(".")[0]):12;
        const startingMonth = year === Number(firstMonth.split(".")[1]) ? Number(firstMonth.split(".")[0]):1;

        for(let month = startingMonth; month <= endingMonth; month++){
            if (month < 10) month = "0"+month;

            let numberOfUsages = 0;

            for (const [fileType, value] of Object.entries(data)) {
                if(value.hasOwnProperty(month+"."+year)){
                    numberOfUsages += value[month+"."+year];
                }
            }
            dataset.data.push(numberOfUsages);
        }
    }
    return [dataset];
}

const generateDatasetsForEachFileType = (data, firstMonth, lastMonth) => {
    let datasets = [];
    let counter = 0;
    for (const [fileType, value] of Object.entries(data)) {
        const color = chartColors[counter % chartColors.length];
        counter++;
        let dataset = {
            label: fileType,
            backgroundColor: color,
            borderColor: color,
            data: []
        }
        for(let year = firstMonth.split(".")[1]; year <= lastMonth.split(".")[1]; year++){
            const startingMonth = year === firstMonth.split(".")[1] ? Number(firstMonth.split(".")[0]):1;
            const endingMonth = firstMonth.split(".")[1] === lastMonth.split(".")[1] ? Number(lastMonth.split(".")[0]):12;
            for(let month = startingMonth; month <= endingMonth; month++){
                if (month < 10) month = "0"+month;

                if(!value.hasOwnProperty(month+"."+year)){
                    dataset.data.push(0);
                }
                else{
                    dataset.data.push(value[month+"."+year]);
                }
            }
        }
        datasets.push(dataset);
    }
    return datasets;
}

const generateDatasetsForMemoryUsage = (data, firstDay, lastDay) => {
    let datasets = [];
    let counter = 0;

    const color = chartColors[counter % chartColors.length];
    counter++;
    let dataset = {
        backgroundColor: color,
        borderColor: color,
        label: "Average used memory",
        data: []
    }

    for(let year = Number(firstDay.split(".")[2]); year <= Number(lastDay.split(".")[2]); year++){
        const endingMonth = year === Number(lastDay.split(".")[2]) ? Number(lastDay.split(".")[1]):12;
        const startingMonth = year === Number(firstDay.split(".")[2]) ? Number(firstDay.split(".")[1]):1;

        for(let month = startingMonth; month <= endingMonth; month++){
            const daysInMonth = new Date(year, month, 0).getDate();
            const endingDay = year === Number(lastDay.split(".")[2]) && month === Number(lastDay.split(".")[1]) ? Number(lastDay.split(".")[0]):daysInMonth;
            const startingDay = year === Number(firstDay.split(".")[2]) && month === Number(firstDay.split(".")[1]) ? Number(firstDay.split(".")[0]):1;

            if (month < 10) month = "0"+month;

            for(let day = startingDay; day <= endingDay; day++) {
                if (day < 10) day = "0"+day;
                if(!data.hasOwnProperty(day+"."+month+"."+year)){
                    dataset.data.push(0);
                }
                else{
                    dataset.data.push(data[day+"."+month+"."+year].average);
                }
            }
        }

        datasets.push(dataset);
    }

    return datasets;
}


const addDataToDrawBubbleChart = (data) => {
    for(let i = 0; i < data.length; i++){
        data[i]["backgroundColor"] = chartColors[i % chartColors.length];
        data[i]["radius"] = 5;
    }
    return data;
}


const findFirstLastMonth = (data) => {
    let firstMonth = "12.9999";
    let lastMonth = "01.2000";

    for (const [fileType, value] of Object.entries(data)) {
        for (const [monthYear, numberOfUsages] of Object.entries(value)) {
            const [month, year] = monthYear.split(".").map(x=>Number(x));

            const [f_month, f_year] = firstMonth.split(".").map(x=>Number(x));
            const [l_month, l_year] = lastMonth.split(".").map(x=>Number(x));

            if(f_year > year || (f_year === year && f_month > month)){
                firstMonth = monthYear;
            }
            if(l_year < year || (l_year === year && l_month < month)){
                lastMonth = monthYear;
            }
        }
    }
    return [firstMonth, lastMonth];
}

const findFirstLastDay = (data) => {
    let firstDay = "31.12.9999";
    let lastDay = "01.01.2000";

    for (const [dayMonthYear, value] of Object.entries(data)) {
        const [day, month, year] = dayMonthYear.split(".").map(x=>Number(x));

        const [f_day, f_month, f_year] = firstDay.split(".").map(x=>Number(x));
        const [l_day, l_month, l_year] = lastDay.split(".").map(x=>Number(x));

        if(f_year > year || (f_year === year && f_month > month) || (f_year === year && f_month === month && f_day > day)){
            firstDay = dayMonthYear;
        }
        if(l_year < year || (l_year === year && l_month < month) || (l_year === year && l_month === month && l_day < day)){
            lastDay = dayMonthYear;
        }

    }
    return [firstDay, lastDay];
}

const generateDayLabels = (firstDay, lastDay) => {
    let labels = []
    for(let year = Number(firstDay.split(".")[2]); year <= Number(lastDay.split(".")[2]); year++){
        const endingMonth = year === Number(lastDay.split(".")[2]) ? Number(lastDay.split(".")[1]):12;
        const startingMonth = year === Number(firstDay.split(".")[2]) ? Number(firstDay.split(".")[1]):1;

        for(let month = startingMonth; month <= endingMonth; month++){

            const daysInMonth = new Date(year, month, 0).getDate();
            const endingDay = year === Number(lastDay.split(".")[2]) && month === Number(lastDay.split(".")[1]) ? Number(lastDay.split(".")[0]):daysInMonth;
            const startingDay = year === Number(firstDay.split(".")[2]) && month === Number(firstDay.split(".")[1]) ? Number(firstDay.split(".")[0]):1;
            if (month < 10) month = "0"+month;

            for(let day = startingDay; day <= endingDay; day++) {

                if (day < 10) day = "0"+day;
                labels.push(day + "." + month + "." + year);
            }
        }
    }
    return labels;
}

const generateMonthLabels = (firstMonth, lastMonth) => {
    let labels = []
    for(let year = Number(firstMonth.split(".")[1]); year <= Number(lastMonth.split(".")[1]); year++){
        const endingMonth = year === Number(lastMonth.split(".")[1]) ? Number(lastMonth.split(".")[0]):12;
        const startingMonth = year === Number(firstMonth.split(".")[1]) ? Number(firstMonth.split(".")[0]):1;

        for(let month = startingMonth; month <= endingMonth; month++){
            if (month < 10) month = "0"+month;
            labels.push(month+"."+year);
        }
    }
    return labels;
}


const trimIfMoreThanNumberOfElementsInPieChart = (data, labels, numberOf) => {
    if(labels.length <= numberOf) return;

    let restOfData = data.splice(numberOf);
    labels.splice(numberOf);

    let othersData = 0;

    for(let i = 0; i < restOfData.length; i++) othersData += restOfData[i];

    labels.push("Others");
    data.push(othersData);
}

const trimIfMoreThanNumberOfElementsInLineChart = (datasets, numberOf) => {

    if(datasets.length <= numberOf) return;

    let restOfData = datasets.splice(numberOf);

    let othersData = {
        label: "Others",
        backgroundColor: restOfData[0].backgroundColor,
        borderColor: restOfData[0].borderColor,
        data: [],

    };

    for(let j = 0; j < restOfData[0].data.length; j++) {
        othersData.data.push(0);
        for(let i = 0; i < restOfData.length; i++) {
            othersData.data[j] += parseFloat(restOfData[i].data[j]);
        }
    }

    datasets.push(othersData);
}