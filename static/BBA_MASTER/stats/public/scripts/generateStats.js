const createBasicStats = (data) => {
    return generateStatistics(data, [basicInformationAboutPageUsage, browserPieChart, fileTypePieChart])
}

const createExtendedStats = (data) => {
    return generateStatistics(data, [browserLineChart])
}

const createUsageStats = (data) => {
    return generateStatistics(data, [browserPerformanceTable, fileTypeLineChart, muLTITable]);
}

const createPerformanceStats = (data) => {
    return generateStatistics(data, [filePerformanceTable, loadingTimesLineChart, initialMemoryUsageLineChart]);
}

const createSoftwareStats = (data) => {
    return generateStatistics(data, [systemPieChart, windowSizePieChart, browserVersionPieChart]);
}

const createTelemetryStats = (data) => {
    return generateStatistics(data, [
        clickedTabLineChart,
        clickedHeaderPieChart
    ]);
};

function getTabeNameByIndex(index) {
    switch (index) {
    case 0:
        return "Main";
    case 1:
        return "Packets";
    case 2:
        return "IQ";
    case 3:
        return "Generator";
    default:
        return "";
    }
}

const clickedTabLineChart = {
    initial: (data, summary) => {
        summary.clickedTabLineChart = {};
    },
    innerArray: (data, session, summary) => {
        const date = new Date(data.usageStartTime);
        const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        const month_year = month+"."+date.getFullYear();

        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();

	    if (!session.clickedTab) {
	        return;
	    }

	    const tabName = getTabeNameByIndex(parseInt(session.clickedTab));

        if(date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)){
            summary.clickedTabLineChart[tabName] ??= {};
            summary.clickedTabLineChart[tabName][month_year] ??= 0;

            summary.clickedTabLineChart[tabName][month_year]++;
        }
    },
    array: (data, session, summary) => {},
    end: (data, summary) => {}
}

const clickedHeaderPieChart = {
    initial: (data, summary) => {
        summary.clickedHeaderPieChart = {};
        summary.clickedHeaderData = {};
    },
    array: (data, summary) => {},
    innerArray: (data, session, summary) => {
        if (!session.clickedHeader) {
            return;
        }

        summary.clickedHeaderData[session.clickedHeader] ??= 0;
        summary.clickedHeaderData[session.clickedHeader]++;
    },
    end: (data, summary) => {
        summary.clickedHeaderData = Object.fromEntries(
            Object.entries(summary.clickedHeaderData).sort(([,a],[,b]) => b-a)
        );

        summary.clickedHeaderPieChart.labels = Object.keys(summary.clickedHeaderData);
        summary.clickedHeaderPieChart.data = Object.values(summary.clickedHeaderData);

        delete summary.clickedHeaderData;
    }
}

const basicInformationAboutPageUsage = {
    initial: (data, summary) => {
        summary.basicTableData = {};
        summary.basicTableData["Total visits"] = data.length;
        summary.basicTableData["Total files loaded"] = 0;
        summary.basicTableData["Average number of loaded files"] = 0;

        summary.basicTableData["uniqueIPSet"] = new Set();
        summary.basicTableData["uniqueUserSet"] = new Set();
    },
    array: (data, summary) => {
        summary.basicTableData["uniqueIPSet"].add(data.ip);
        summary.basicTableData["uniqueUserSet"].add(data.userId);
        summary.basicTableData["Total files loaded"] += data.sessions.length;
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {
        summary.basicTableData["Unique IPs"] = summary.basicTableData["uniqueIPSet"].size;
        summary.basicTableData["Unique users"] = summary.basicTableData["uniqueUserSet"].size;
        summary.basicTableData["Average number of loaded files"] = (summary.basicTableData["Total files loaded"]/summary.basicTableData["Total visits"]).toFixed(2);

        delete summary.basicTableData["uniqueIPSet"];
        delete summary.basicTableData["uniqueUserSet"];
    }
}

const browserPieChart = {
    initial: (data, summary) => {
        summary.browserPieChartTemp = {};
        summary.browserPieChart = {};
    },
    array: (data, summary) => {
        if(!summary.browserPieChartTemp.hasOwnProperty(data.system.browser.name))
            summary.browserPieChartTemp[data.system.browser.name] = 0;

        summary.browserPieChartTemp[data.system.browser.name]++;
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {
        summary.browserPieChartTemp = Object.fromEntries(
            Object.entries(summary.browserPieChartTemp).sort(([,a],[,b]) => b-a)
        );

        summary["browserPieChart"].labels = Object.keys(summary.browserPieChartTemp);
        summary["browserPieChart"].data = Object.values(summary.browserPieChartTemp);

        delete summary.browserPieChartTemp;
    }
}

const systemPieChart = {
    initial: (data, summary) => {
        summary.systemPieChartTemp = {};
        summary.systemPieChart = {};
    },
    array: (data, summary) => {
        if(!summary.systemPieChartTemp.hasOwnProperty(data.system.os.name))
            summary.systemPieChartTemp[data.system.os.name] = 0;

        summary.systemPieChartTemp[data.system.os.name]++;
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {
        summary.systemPieChartTemp = Object.fromEntries(
            Object.entries(summary.systemPieChartTemp).sort(([,a],[,b]) => b-a)
        );

        summary["systemPieChart"].labels = Object.keys(summary.systemPieChartTemp);
        summary["systemPieChart"].data = Object.values(summary.systemPieChartTemp);

        delete summary.systemPieChartTemp;
    }
}

const windowSizePieChart = {
    initial: (data, summary) => {
        summary.windowSizePieChartTemp = {};
        summary.windowSizePieChart = {};
    },
    array: (data, summary) => {
	if (!data.screen) {
	    return;
	}

        const windowSize = data.screen.window.width+':'+data.screen.window.height;
        if(!summary.windowSizePieChartTemp.hasOwnProperty(windowSize))
            summary.windowSizePieChartTemp[windowSize] = 0;

        summary.windowSizePieChartTemp[windowSize]++;
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {
        summary.windowSizePieChartTemp = Object.fromEntries(
            Object.entries(summary.windowSizePieChartTemp).sort(([,a],[,b]) => b-a)
        );

        summary["windowSizePieChart"].labels = Object.keys(summary.windowSizePieChartTemp);
        summary["windowSizePieChart"].data = Object.values(summary.windowSizePieChartTemp);

        delete summary.windowSizePieChartTemp;
    }
}

const tabLineChart ={
    initial: (data, summary) => {
        summary.tabLineChart = {};
    },
    array: (data, summary) => {
        const date = new Date(data.usageStartTime);
        const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        const month_year = month+"."+date.getFullYear();

        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();

        if(date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)){
            if(!summary.tabLineChart.hasOwnProperty(data.clickedTab))
                summary.tabLineChart[data.clickedTab] = {};

            if(!summary.tabLineChart[data.clickedTab].hasOwnProperty(month_year))
                summary.tabLineChart[data.clickedTab][month_year]=0;

            summary.tabLineChart[data.clickedTab][month_year]++;
        }
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {}
}

const browserLineChart = {
    initial: (data, summary) => {
        summary.browserLineChart = {};
    },
    array: (data, summary) => {
        const date = new Date(data.usageStartTime);
        const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        const month_year = month+"."+date.getFullYear();

        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();

        if(date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)){
            if(!summary.browserLineChart.hasOwnProperty(data.system.browser.name))
                summary.browserLineChart[data.system.browser.name] = {};

            if(!summary.browserLineChart[data.system.browser.name].hasOwnProperty(month_year))
                summary.browserLineChart[data.system.browser.name][month_year]=0;

            summary.browserLineChart[data.system.browser.name][month_year]++;
        }
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {}
}

const fileTypePieChart = {
    initial: (data, summary) => {
        summary.fileTypePieChartTemp = {};
        summary.fileTypePieChart = {};
    },
    array: (data, summary) => {},
    innerArray: (data, session, summary) => {
        const fileDesc = changeFileNameToDescriptiveName(session.type);

        if(!summary.fileTypePieChartTemp.hasOwnProperty(fileDesc))
            summary.fileTypePieChartTemp[fileDesc] = 0;

        summary.fileTypePieChartTemp[fileDesc]++;
    },
    end: (data, summary) => {
        summary.fileTypePieChartTemp = Object.fromEntries(
            Object.entries(summary.fileTypePieChartTemp).sort(([,a],[,b]) => b-a)
        );
        summary["fileTypePieChart"].labels = Object.keys(summary.fileTypePieChartTemp);
        summary["fileTypePieChart"].data = Object.values(summary.fileTypePieChartTemp);

        delete summary.fileTypePieChartTemp;
    }
}

const fileTypeLineChart = {
    initial: (data, summary) => {
        summary.fileTypeLineChart = {};
    },
    array: (data, summary) => {},
    innerArray: (data, session, summary) => {
        const date = new Date(session.loading_start_time);
        const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        const month_year = month+"."+date.getFullYear();
        const fileDesc = changeFileNameToDescriptiveName(session.type);

        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();

        if(date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)){
            if(!summary.fileTypeLineChart.hasOwnProperty(fileDesc)) summary.fileTypeLineChart[fileDesc] = {};

            if(!summary.fileTypeLineChart[fileDesc].hasOwnProperty(month_year)) summary.fileTypeLineChart[fileDesc][month_year]=0;
            summary.fileTypeLineChart[fileDesc][month_year]++;
        }
    },
    end: (data, summary) => {}
}

const initialMemoryUsageLineChart = {
    initial: (data, summary) => {
        summary.memoryUsageLineChart = {};
    },
    array: (data, summary) => {},
    innerArray: (data, session, summary) => {
        if(!session.hasOwnProperty("currentMemory") || !data.hasOwnProperty("currentMemory")) return;

        const date = new Date(session.loading_start_time);
        const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        const day_month_year = day+"."+month+"."+date.getFullYear();

        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();

        if(date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)){
            if(!summary.memoryUsageLineChart.hasOwnProperty(day_month_year))
                summary.memoryUsageLineChart[day_month_year] = {memory:(data.currentMemory.usedJSHeapSize/1024)/1024, size: 1};

            summary.memoryUsageLineChart[day_month_year].memory += (session.currentMemory.usedJSHeapSize/1024)/1024;
            summary.memoryUsageLineChart[day_month_year].size++;
        }
    },
    end: (data, summary) => {
        for (const [key, value] of Object.entries(summary.memoryUsageLineChart)) {

            value.average = (value.memory / value.size).toFixed(2);
        }
    }
}

const filePerformanceTable = {
    initial: (data, summary) => {
        summary.filePerformanceTable = {General: {"All loaded files": 0, "All memory": 0, "All time": 0}};
    },
    array: (data, summary) => {
    },
    innerArray: (data, session, summary) => {
        if(!session.hasOwnProperty("size")) return;
        const fileDesc = changeFileNameToDescriptiveName(session.type);


        if(!summary.filePerformanceTable.hasOwnProperty(fileDesc))
            summary.filePerformanceTable[fileDesc] = {"All loaded files": 0, "All memory": 0, "All time": 0}

        summary.filePerformanceTable.General["All loaded files"]++;
        summary.filePerformanceTable.General["All memory"] += (session.size/1024)/1024;
        summary.filePerformanceTable.General["All time"] += (session.loading_end_time-session.loading_start_time)/1000;

        summary.filePerformanceTable[fileDesc]["All loaded files"]++;
        summary.filePerformanceTable[fileDesc]["All memory"] += (session.size/1024)/1024;
        summary.filePerformanceTable[fileDesc]["All time"] += (session.loading_end_time-session.loading_start_time)/1000;

    },
    end: (data, summary) => {
        for (const [key, value] of Object.entries(summary.filePerformanceTable)) {
            value["Average loading time [s]"] = value["All time"] / value["All loaded files"];
            value["Average file size [MB]"] = value["All memory"] / value["All loaded files"];

            value["Average loading time [s]"] = value["Average loading time [s]"].toFixed(2);
            value["Average file size [MB]"] = value["Average file size [MB]"].toFixed(2);

            delete value["All time"];
            delete value["All memory"];
        }
    }
}

const browserPerformanceTable = {
    initial: (data, summary) => {
        summary.browserPerformanceTable = {General: {"All loaded files": 0, "All memory": 0, "All time": 0}};
    },
    array: (data, summary) => {
    },
    innerArray: (data, session, summary) => {
        if(!session.hasOwnProperty("size")) return;

        if(!summary.browserPerformanceTable.hasOwnProperty(data.system.browser.name))
            summary.browserPerformanceTable[data.system.browser.name] = {"All loaded files": 0, "All memory": 0, "All time": 0}

        summary.browserPerformanceTable.General["All loaded files"]++;
        summary.browserPerformanceTable.General["All memory"] += session.size/1000000;
        summary.browserPerformanceTable.General["All time"] += (session.loading_end_time-session.loading_start_time)/1000;

        summary.browserPerformanceTable[data.system.browser.name]["All loaded files"]++;
        summary.browserPerformanceTable[data.system.browser.name]["All memory"] += session.size/1000000;
        summary.browserPerformanceTable[data.system.browser.name]["All time"] += (session.loading_end_time-session.loading_start_time)/1000;

    },
    end: (data, summary) => {
        for (const [key, value] of Object.entries(summary.browserPerformanceTable)) {
            value["Average loading time [s]"] = value["All time"] / value["All loaded files"];
            value["Average file size [MB]"] = value["All memory"] / value["All loaded files"];

            value["Average loading time [s]"] = value["Average loading time [s]"].toFixed(2);
            value["Average file size [MB]"] = value["Average file size [MB]"].toFixed(2);

            delete value["All time"];
            delete value["All memory"];
        }
    }
}

const muLTITable = {
    initial: (data, summary) => {
        summary.muLTITable = {};
    },
    array: (data, summary) => {
    },
    innerArray: (data, session, summary) => {
        if(!session.hasOwnProperty("multi")) return;

        if(!summary.muLTITable.hasOwnProperty(session.multi))
            summary.muLTITable[session.multi] = 0;

        summary.muLTITable[session.multi]++;

    },
    end: (data, summary) => {

    }
}

const loadingTimesLineChart = {
    initial: (data, summary) => {
        summary.loadingTimesLineChart = {};
    },
    array: (data, summary) => {},
    innerArray: (data, session, summary) => {
        if(!session.hasOwnProperty("size")) return;

        const fileDesc = changeFileNameToDescriptiveName(session.type);

        if(!summary.loadingTimesLineChart.hasOwnProperty(data.system.browser.name))
            summary.loadingTimesLineChart[data.system.browser.name] = {};

        if(!summary.loadingTimesLineChart[data.system.browser.name].hasOwnProperty(fileDesc))
            summary.loadingTimesLineChart[data.system.browser.name][fileDesc] = {data: [], label: fileDesc};

        summary.loadingTimesLineChart[data.system.browser.name][fileDesc].data.push({x: (session.loading_end_time-session.loading_start_time)/1000, y:session.size/1000000})
    },
    end: (data, summary) => {}
}

const browserVersionPieChart = {
    initial: (data, summary) => {
        summary.browserVersionPieChart = {};
        summary.browserVersionPieChartTemp = {};
    },
    array: (data, summary) => {
        const browserVersion = data.system.browser.name +' '+ data.system.browser.major;
        if(!summary.browserVersionPieChartTemp.hasOwnProperty(browserVersion))
            summary.browserVersionPieChartTemp[browserVersion] = 0;

        summary.browserVersionPieChartTemp[browserVersion]++;
    },
    innerArray: (data, session, summary) => {},
    end: (data, summary) => {
        summary.browserVersionPieChartTemp = Object.fromEntries(
            Object.entries(summary.browserVersionPieChartTemp).sort(([,a],[,b]) => b-a)
        );
        summary["browserVersionPieChart"].labels = Object.keys(summary.browserVersionPieChartTemp);
        summary["browserVersionPieChart"].data = Object.values(summary.browserVersionPieChartTemp);

        delete summary.browserVersionPieChartTemp;
    }
}

const generateStatistics = (data, functionArray) => {
    const summary = {};

    for(let j = 0; j < functionArray.length; j++){
        functionArray[j].initial(data, summary);
    }

    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < functionArray.length; j++){
            functionArray[j].array(data[i], summary);

            for(let k = 0; k < data[i].sessions.length; k++){
                functionArray[j].innerArray(data[i], data[i].sessions[k], summary);
            }
        }
    }

    for(let j = 0; j < functionArray.length; j++){
        functionArray[j].end(data, summary);
    }

    return summary;
}

const changeFileNameToDescriptiveName = (name) => {
    const names = {
        ecpri_trace: "Pcap file in trace view",
        ecpri: "eCPRI (IQ view)",
        iphy: "IPHY (binary 16-bit swapped IQ)",
        lmts: "Binary 16b IQ",
        bip: "BIP",
        csv: "CSV IQ",
        flexi: "Flexi hex",
        roe: "ROE",
        time_bin_rev: "Binary 16b IQ, LE",
        raw_cpri: "cGen capture",
        loner_cpri_legacy: "Loner DDR capture (OLD)",
        loner_cpri: "Loner DDR capture",
        frequency_hex: "Frequency domain hex IQ",
        float32: "Float32",
        freq_bin: "Frequency domain 16b IQ",
        vsa: "VSA txt (wavejudge)",
    }
    if(names.hasOwnProperty(name)) return names[name];
    if(!name) return "";
    name.replace("_", " ");
    return name.charAt(0).toUpperCase() + name.slice(1);

}

module.exports = {
    createBasicStats: createBasicStats,
    createExtendedStats: createExtendedStats,
    createUsageStats: createUsageStats,
    createPerformanceStats: createPerformanceStats,
    createSoftwareStats: createSoftwareStats,
    createTelemetryStats,
}
