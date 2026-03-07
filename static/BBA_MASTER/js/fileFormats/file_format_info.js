// File info
// - id
// - name
// - type: binary, text
// - description
// - components: iq, packets
// - file decode function
// - preload function
// - settings in load diaog?
// - typical extensions?
// - templates?

/** @readonly */
const Enum_DataFormat = {
    BINARY: 0,
    TEXT: 1,
}
/** @param {keyof Enum_DataFormat} dataFormat */
function Enum_DataFormat_toString(dataFormat) {
    switch (dataFormat) {
        case Enum_DataFormat.BINARY:
            return "Binary";
        case Enum_DataFormat.TEXT:
            return "Text";
        default:
            throw new Error("Invalid data format");
    }
}

/** @readonly */
const Enum_DataDomain = {
    FREQUENCY: 0,
    TIME: 1,
    FREQUENCY_AND_TIME: 2,
    NONE: 3,
}
/** @param {keyof Enum_DataDomain} dataDomain */
function Enum_DataDomain_toString(dataDomain) {
    switch (dataDomain) {
        case Enum_DataDomain.FREQUENCY:
            return "Frequency";
        case Enum_DataDomain.TIME:
            return "Time";
        case Enum_DataDomain.FREQUENCY_AND_TIME:
            return "Frequency/Time";
        case Enum_DataDomain.NONE:
            return "None";
        default:
            throw new Error("Invalid data domain");
    }
}

/** @readonly */
const Enum_FileContents = {
    SAMPLES: 0,
    PACKETS: 1,
    SAMPLES_AND_PACKETS: 2,
}

/** @param {keyof Enum_FileContents} fileContents */
function Enum_FileContents_toString(fileContents) {
    switch (fileContents) {
        case Enum_FileContents.SAMPLES:
            return "Samples";
        case Enum_FileContents.PACKETS:
            return "packets";
        case Enum_FileContents.SAMPLES_AND_PACKETS:
            return "Samples/Packets";
        default:
            throw new Error("Invalid file contents");
    }
}


class FileFormatInfo{
    /**
     * @readonly
     * @param {string} id
     * @param {string }name
     * @param {keyof Enum_DataFormat} dataFormat
     * @param {keyof Enum_DataDomain} dataDomain
     * @param {keyof Enum_FileContents} fileContents
     * @param {string[]} expectedFileExtensions
     * @param {function} decodeFn
     * @param {function | null} preloadFn
     * @param {string} description
     */
    constructor(id, name, dataFormat, dataDomain, fileContents, expectedFileExtensions, decodeFn, preloadFn, description) {
        this.id = id;
        this.name = name;
        this.dataFormat = dataFormat;
        this.dataDomain = dataDomain;
        this.fileContents = fileContents;
        this.expectedFileExtensions = expectedFileExtensions
        this.decodeFn = decodeFn;
        this.preloadFn = preloadFn;
        this.description = description;
    }
}