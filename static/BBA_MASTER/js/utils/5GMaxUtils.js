class ConfigurationFieldOverride{
    constructor(name, originalValue, newValue) {
        this.name = name;
        this.originalValue = originalValue;
        this.newValue = newValue;
    }
}

class ConfigurationOverride{
    constructor() {
        this.clear();
    }

    addFieldOverride(name, originalValue, newValue) {
        this.configurationFieldOverrides.set(name, new ConfigurationFieldOverride(name, originalValue, newValue));
    }

    clear(){
        this.configurationFieldOverrides = new Map();
    }
}

const SimulationState = {
    PENDING: 0,
    READY: 1,
    ERROR: 2,
}

class SimulationParameters{
    constructor(simulationId, repositoryHash) {
        this.simulationId = simulationId;
        this.repositoryHash = repositoryHash;
        this.configurationOverride = new ConfigurationOverride();
        this.state = SimulationState.PENDING;

        this.requestTimestamp = null;

        this.zipFile = null;
        this.simulationResult = null;
    }
}