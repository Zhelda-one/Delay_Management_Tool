// Adding new file formats
// 1. Create a unique identifier (i.e. pcapId = "pcap"). Value will be used in the config
// 2. Add a new entry in the fileFormats object using the FileFormatInfo instance as the value
// 3. Adjust the filePreloadList. Higher items get priority when preloading files.
// 4. Add the new entry to the fileDisplayOptions array.
// 5. TEMPORARY: Update adjust_loadDialog() !!!
// Done!

const pcapId = 'pcap';
const pcapngId = 'pcapng';
const bin_16Id = "bin_16";
const float_32Id = "float_32";
const jsonId = "json";
const hexId = "hex";
const madehexId = "madehex";
const csvId = "csv";
const rtgIphyId = "rtg_iphy";
const iqfpId = "iqfp";
const lokiId = "loki";
const l1radio = "l1radio";
const rawCpriId = "raw_cpri";
const lonerDDR4 = "lonerDDR4";

const testFormatId = "testType";

/** @type {Object.<string, FileFormatInfo>} */
const g_fileFormats = {};

// ----- BINARY FORMATS -----

const format_pcap = g_fileFormats[pcapId] = new FileFormatInfo(pcapId, "PCAP", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY, Enum_FileContents.SAMPLES_AND_PACKETS,
    ["pcap"], pcap_decode, pcap_preload,
    "Packet capture.");

const format_pcapng = g_fileFormats[pcapngId] = new FileFormatInfo(pcapngId, "PCAP NG", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY, Enum_FileContents.SAMPLES_AND_PACKETS,
    ["pcap"], pcapng_decode, pcapng_preload,
    "Packet capture, New Generation.");

const format_bin16 = g_fileFormats[bin_16Id] = new FileFormatInfo(bin_16Id, "Binary 16 bit", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY_AND_TIME, Enum_FileContents.SAMPLES,
    ["bin"], bin_decode, bin_preload,
    "Binary files where each consecutive 2B represent an IQ sample.");

const format_float32 = g_fileFormats[float_32Id] = new FileFormatInfo(float_32Id, "Float 32 bit", Enum_DataFormat.BINARY, Enum_DataDomain.TIME, Enum_FileContents.SAMPLES,
    ["float32"], float_decode, float_preload,
    "Binary files where each consecutive 4B represent an IQ sample. Time Domain with Little Endian"
)

const format_rtgIphy = g_fileFormats[rtgIphyId] = new FileFormatInfo(rtgIphyId, "Rtg/Iphy", Enum_DataFormat.BINARY, Enum_DataDomain.TIME, Enum_FileContents.SAMPLES,
    ["bin"], rtg_iphy_decode, null,
    "Same as Bin 16b with selected options: Swap Iq, Little endian, Time domain.");

const format_iqfp = g_fileFormats[iqfpId] = new FileFormatInfo(iqfpId, "IQFP", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY_AND_TIME, Enum_FileContents.SAMPLES,
    ["bin"], iqfp_decode, null,
    "32 bit samples in IQFP format.");


const format_loki = g_fileFormats[lokiId] = new FileFormatInfo(lokiId, "Loki/Thor", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY, Enum_FileContents.SAMPLES_AND_PACKETS,
    ["bin"], loki_decode, null,
    "ABIO, ABIP snapshot capture. Contains embedded eCpri packets. Based on SnapshotAnalyzer.py.");

const format_l1radio = g_fileFormats[l1radio] = new FileFormatInfo(l1radio, "L1Radio Snapshot", Enum_DataFormat.BINARY, Enum_DataDomain.FREQUENCY, Enum_FileContents.SAMPLES_AND_PACKETS,
    ["bin"], l1radioSnapshot_decode, null,
    "L1Radio snapshot. Contains embedded eCpri packets. Based on Snapshot2Pcap.py from l1sw repository.");

const format_rawCpri = g_fileFormats[rawCpriId] = new FileFormatInfo(rawCpriId, "Raw Cpri (cgen)", Enum_DataFormat.BINARY, Enum_DataDomain.TIME, Enum_FileContents.SAMPLES,
    ["bin"], raw_cpri_decode, cpri_preload,
    "Time domain,9 iqBitWidth, binary format. Produces samples and shows control data (instead of packets)");

const format_lonerDDR4 = g_fileFormats[lonerDDR4] = new FileFormatInfo(lonerDDR4, "Loner DDR4 snapshot", Enum_DataFormat.BINARY, Enum_DataDomain.TIME, Enum_FileContents.SAMPLES,
    ["bin"], lonerDDR4_decode, lonerDDR4_preload,"");

// ----- TEXT FORMATS -----

const format_hex = g_fileFormats[hexId] = new FileFormatInfo(hexId, "HEX", Enum_DataFormat.TEXT, Enum_DataDomain.FREQUENCY_AND_TIME, Enum_FileContents.SAMPLES,
    ["txt"], hex_decode, hex_preload,
    "Text files where each line describes an IQ pair. Each line is hex value starting with '0x' followed by 2B for I sample and 2B for Q sample. Example line: 0x8000FFFF.");

const format_madehex = g_fileFormats[madehexId] = new FileFormatInfo(madehexId, "Made HEX", Enum_DataFormat.TEXT, Enum_DataDomain.TIME, Enum_FileContents.SAMPLES,
    ["txt"], madehex_decode, hex_preload,
    "Text files where each line describes an IQ pair. Each line is hex value '0xIIIIIIQQQQQQCCCC' where only upper 2B of I and Q are significant");

const format_csv = g_fileFormats[csvId] = new FileFormatInfo(csvId, "CSV", Enum_DataFormat.TEXT, Enum_DataDomain.FREQUENCY_AND_TIME, Enum_FileContents.SAMPLES,
    ["csv"], csv_decode, csv_preload,
    "Text files with 2 decimal values per line separated by semicolon, colon, tab, space or + and - Example lines: 2323;4598 or 32767:32768 or -2566+32654.");


const format_json = g_fileFormats[jsonId] = new FileFormatInfo(jsonId, "JSON Packets", Enum_DataFormat.TEXT, Enum_DataDomain.NONE, Enum_FileContents.PACKETS,
    ["json"], json_decode, json_preload,
    "Packets in JSON format.");

const format_test = g_fileFormats[testFormatId] = new FileFormatInfo(testFormatId, "Test Format", Enum_DataFormat.BINARY,
    Enum_DataDomain.FREQUENCY, Enum_FileContents.SAMPLES_AND_PACKETS, ["bin"], testFormat_decode, null, "Tets format");

/** @type {FileFormatInfo[]} */
const g_filePreloadList = [
    format_pcap,
    format_pcapng,
    format_rawCpri,
    format_lonerDDR4,
    format_bin16,
    format_float32,

    format_hex,
    format_madehex,
    format_csv,
    format_json
]

class OptionSpacing {
    constructor(text) {
        this.text = text;
    }
}

/** @type {(FileFormatInfo | OptionSpacing)[]} */
const g_fileDisplayOptions = [
    format_pcap,
    format_pcapng,
    new OptionSpacing("Packet-based"),
    format_loki,
    format_l1radio,
    new OptionSpacing("Binary"),
    format_rawCpri,
    format_bin16,
    format_float32,
    format_rtgIphy,
    format_iqfp,
    format_lonerDDR4,
    new OptionSpacing("Text-based"),
    format_hex,
    format_madehex,
    format_csv,
    format_json,
    new OptionSpacing("Other"),
    format_test,
]

function validateFileFormats() {
    const ids = Object.keys(g_fileFormats);
    const uniqueIds = new Set(ids);

    // Check if all identifiers are unique
    if (ids.length !== uniqueIds.size) {
        throw new Error("Duplicate identifiers found in g_fileFormats.");
    }

    // Check if every entry in g_fileFormats is present in g_fileDisplayOptions
    const displayOptionsSet = new Set(g_fileDisplayOptions.map(option => option instanceof FileFormatInfo ? option : null));
    const missingEntries = ids.filter(id => !displayOptionsSet.has(g_fileFormats[id]));

    if (missingEntries.length > 0) {
        throw new Error(`The following entries are missing in g_fileDisplayOptions: ${missingEntries.join(", ")}`);
    }
}
validateFileFormats();  // TODO: Code validation. Here? Inside tests? On load?