const basicStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/basicStats");
}

const extendedStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/extendedStats");
}

const usageStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/usageStats");
}

const performanceStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/performanceStats");
}

const softwareStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/softwareStats");
}

const telemetryStatistics = () => {
    requestStats("http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/telemetryStats");
}
