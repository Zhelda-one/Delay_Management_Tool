// Copyright 2023 Nokia. All rights reserved.

const fs = require("fs");
const path = require("path");

class Conf {
	static MAX_PACKET_SIZE = 1500;
	static ECPRI_PACKET_PADDING = 4;
	static ECPRI_COMMON_HEADER_LEN = 4;
	static MAGIC_WORD = 0xa1b23c4d;
	static VERSION_MAJOR = 2;
	static VERSION_MINOR = 4;
	static THISZONE = 0;
	static SIGFIGS = 0;
	static SNAPLEN = 65535;
	static NETWORK = 1; // Ethernet
	static ETHER_TYPE = 0xaefe;
	static ETHER_FRAME_WRAPPER_LEN = 18; // 14 bytes header + 4 bytes FCS
}

function fill_pcap_global_header(fd) {
	const buf = Buffer.alloc(24);
	buf.writeUInt32LE(Conf.MAGIC_WORD, 0);
	buf.writeUInt16LE(Conf.VERSION_MAJOR, 4);
	buf.writeUInt16LE(Conf.VERSION_MINOR, 6);
	buf.writeInt32LE(Conf.THISZONE, 8);
	buf.writeUInt32LE(Conf.SIGFIGS, 12);
	buf.writeUInt32LE(Conf.SNAPLEN, 16);
	buf.writeUInt32LE(Conf.NETWORK, 20);
	fs.writeSync(fd, buf);
}

function fill_pcap_packet_header(packets, timestamp, pcap_packet_size = 0) {
	const ts_sec = Math.min(Math.floor(timestamp / 1e9), 4294967295);
	const ts_nsec = Math.min(Math.floor(timestamp % 1e9), 4294967295);
	let pcap_header;
	if (pcap_packet_size) {
		pcap_header = Buffer.alloc(16);
		pcap_header.writeUInt32LE(ts_sec, 0);
		pcap_header.writeUInt32LE(ts_nsec, 4);
		pcap_header.writeUInt32LE(pcap_packet_size, 8);
		pcap_header.writeUInt32LE(pcap_packet_size, 12);
	} else {
		pcap_header = Buffer.alloc(8);
		pcap_header.writeUInt32LE(ts_sec, 0);
		pcap_header.writeUInt32LE(ts_nsec, 4);
	}
	packets[timestamp] = Buffer.concat([packets[timestamp], pcap_header]);
}

function fill_ethernet_frame_header(packets, timestamp) {
	const frame_header = Buffer.alloc(14 + 2);
	frame_header.writeUInt8(0x11, 0);
	frame_header.writeUInt8(0x22, 1);
	frame_header.writeUInt8(0x33, 2);
	frame_header.writeUInt8(0x44, 3);
	frame_header.writeUInt8(0x55, 4);
	frame_header.writeUInt8(0x66, 5);
	frame_header.writeUInt8(0xaa, 6);
	frame_header.writeUInt8(0xbb, 7);
	frame_header.writeUInt8(0xcc, 8);
	frame_header.writeUInt8(0xdd, 9);
	frame_header.writeUInt8(0xee, 10);
	frame_header.writeUInt8(0xff, 11);
	frame_header.writeUInt16BE(Conf.ETHER_TYPE, 12);
	packets[timestamp] = Buffer.concat([packets[timestamp], frame_header]);
}

function get_ecpri_packet_len(ecpri_data, is_fcp = false) {
	if (ecpri_data.length < Conf.ECPRI_COMMON_HEADER_LEN) return 0;
	const ecpri_ver = ecpri_data.readUInt8(0);
	const msg_type = ecpri_data.readUInt8(1);
	const payload_size = ecpri_data.readUInt16BE(2);
	if (ecpri_ver !== 0x10 || ![0, 2].includes(msg_type) || (is_fcp && msg_type !== 2)) return 0;
	if (payload_size === 0 || payload_size > Conf.MAX_PACKET_SIZE - Conf.ECPRI_COMMON_HEADER_LEN)
		return 0;
	return Math.max(Conf.ECPRI_COMMON_HEADER_LEN + payload_size, 46);
}

function get_dl_tx_snapshot_constants() {
	const psw_header_len = 64;
	const ecpri_buffer_size = Conf.MAX_PACKET_SIZE;
	return [psw_header_len, ecpri_buffer_size];
}

function get_dl_rx_snapshot_constants() {
	const psw_header_len = 64;
	const ecpri_buffer_size = psw_header_len + Conf.MAX_PACKET_SIZE + Conf.ECPRI_PACKET_PADDING;
	return [psw_header_len, ecpri_buffer_size];
}

function get_timestamp(buffer) {
	// Buffer is 64 bytes, 8x8 bytes, timestamp is 4th QWORD
	return buffer.readBigUInt64LE(24);
}

function append_ecpri_data(packets, ecpri_data, timestamp, ecpri_packet_size) {
	fill_pcap_packet_header(packets, timestamp, ecpri_packet_size + Conf.ETHER_FRAME_WRAPPER_LEN);
	fill_ethernet_frame_header(packets, timestamp);
	const frame_payload = ecpri_data.slice(0, ecpri_packet_size);
	const fcs = Buffer.alloc(4, 0xff);
	packets[timestamp] = Buffer.concat([packets[timestamp], frame_payload, fcs]);
}

function dl_rx_bin_to_pcap(ecpri_bin_path) {
	const [psw_header_len, ecpri_buffer_size] = get_dl_rx_snapshot_constants();
	const packets = {};
	const stat = fs.statSync(ecpri_bin_path);
	const file_size = stat.size;
	let remaining_size = ecpri_buffer_size * Math.round(file_size / ecpri_buffer_size);
	const fd = fs.openSync(ecpri_bin_path, "r");
	let offset = 0;
	while (remaining_size >= ecpri_buffer_size) {
		remaining_size -= ecpri_buffer_size;
		const headerBuf = Buffer.alloc(psw_header_len);
		fs.readSync(fd, headerBuf, 0, psw_header_len, offset);
		offset += psw_header_len;
		const timestamp = Number(get_timestamp(headerBuf));
		const ecpri_data = Buffer.alloc(Conf.MAX_PACKET_SIZE);
		fs.readSync(fd, ecpri_data, 0, Conf.MAX_PACKET_SIZE, offset);
		offset += Conf.MAX_PACKET_SIZE;
		offset += Conf.ECPRI_PACKET_PADDING;
		const packet_size = get_ecpri_packet_len(ecpri_data);
		if (packet_size) {
			packets[timestamp] = Buffer.alloc(0);
			append_ecpri_data(packets, ecpri_data, timestamp, packet_size);
		}
	}
	fs.closeSync(fd);
	if (Object.keys(packets).length) {
		const outPath = ecpri_bin_path + ".pcap";
		const outFd = fs.openSync(outPath, "w");
		fill_pcap_global_header(outFd);
		for (const key of Object.keys(packets).sort((a, b) => a - b)) {
			fs.writeSync(outFd, packets[key]);
		}
		fs.closeSync(outFd);
	}
}

function dl_tx_bin_to_pcap(ecpri_bin_path) {
	Conf.MAX_PACKET_SIZE = 6016;
	const [psw_header_len, ecpri_buffer_size] = get_dl_tx_snapshot_constants();
	const packets = {};
	const stat = fs.statSync(ecpri_bin_path);
	const file_size = stat.size;
	let remaining_size = ecpri_buffer_size * Math.round(file_size / ecpri_buffer_size);
	const fd = fs.openSync(ecpri_bin_path, "r");
	let offset = 0;
	let timestamp = 0;
	while (remaining_size >= ecpri_buffer_size) {
		remaining_size -= ecpri_buffer_size;
		timestamp += 1;
		const ecpri_data = Buffer.alloc(Conf.MAX_PACKET_SIZE);
		fs.readSync(fd, ecpri_data, 0, Conf.MAX_PACKET_SIZE, offset);
		offset += Conf.MAX_PACKET_SIZE;
		const packet_size = get_ecpri_packet_len(ecpri_data);
		if (packet_size) {
			packets[timestamp] = Buffer.alloc(0);
			append_ecpri_data(packets, ecpri_data, timestamp, packet_size);
		}
	}
	fs.closeSync(fd);
	if (Object.keys(packets).length) {
		const outPath = ecpri_bin_path + ".pcap";
		const outFd = fs.openSync(outPath, "w");
		fill_pcap_global_header(outFd);
		for (const key of Object.keys(packets).sort((a, b) => a - b)) {
			fs.writeSync(outFd, packets[key]);
		}
		fs.closeSync(outFd);
	}
}

function ul_rx_bin_to_pcap(ecpri_bin_path) {
	Conf.MAX_PACKET_SIZE = 6016;
	const [psw_header_len, ecpri_buffer_size] = get_dl_tx_snapshot_constants();
	const packets = {};
	const stat = fs.statSync(ecpri_bin_path);
	const file_size = stat.size;
	let remaining_size = ecpri_buffer_size * Math.round(file_size / ecpri_buffer_size);
	const fd = fs.openSync(ecpri_bin_path, "r");
	let offset = 0;
	while (remaining_size >= ecpri_buffer_size) {
		remaining_size -= ecpri_buffer_size;
		const psw_header = Buffer.alloc(psw_header_len);
		fs.readSync(fd, psw_header, 0, psw_header_len, offset);
		offset += psw_header_len;
		if (psw_header.length < psw_header_len) break;
		const timestamp = Number(get_timestamp(psw_header));
		const ecpri_data = Buffer.alloc(Conf.MAX_PACKET_SIZE - psw_header_len);
		fs.readSync(fd, ecpri_data, 0, Conf.MAX_PACKET_SIZE - psw_header_len, offset);
		offset += Conf.MAX_PACKET_SIZE - psw_header_len;
		const packet_size = get_ecpri_packet_len(ecpri_data);
		if (packet_size) {
			packets[timestamp] = Buffer.alloc(0);
			append_ecpri_data(packets, ecpri_data, timestamp, packet_size);
		}
	}
	fs.closeSync(fd);
	if (Object.keys(packets).length) {
		const outPath = ecpri_bin_path + ".pcap";
		const outFd = fs.openSync(outPath, "w");
		fill_pcap_global_header(outFd);
		for (const key of Object.keys(packets).sort((a, b) => a - b)) {
			fs.writeSync(outFd, packets[key]);
		}
		fs.closeSync(outFd);
	}
}

function ul_tx_bin_to_pcap(ecpri_bin_path) {
	const [psw_header_len, ecpri_buffer_size] = get_dl_rx_snapshot_constants();
	const packets = {};
	const stat = fs.statSync(ecpri_bin_path);
	const file_size = stat.size;
	let remaining_size = ecpri_buffer_size * Math.round(file_size / ecpri_buffer_size);
	const fd = fs.openSync(ecpri_bin_path, "r");
	let offset = 0;
	let timestamp = 0;
	while (remaining_size >= ecpri_buffer_size) {
		remaining_size -= ecpri_buffer_size;
		timestamp += 1;
		const ecpri_data = Buffer.alloc(Conf.MAX_PACKET_SIZE);
		fs.readSync(fd, ecpri_data, 0, Conf.MAX_PACKET_SIZE, offset);
		offset += Conf.MAX_PACKET_SIZE;
		const packet_size = get_ecpri_packet_len(ecpri_data);
		if (packet_size) {
			packets[timestamp] = Buffer.alloc(0);
			append_ecpri_data(packets, ecpri_data, timestamp, packet_size);
		}
	}
	fs.closeSync(fd);
	if (Object.keys(packets).length) {
		const outPath = ecpri_bin_path + ".pcap";
		const outFd = fs.openSync(outPath, "w");
		fill_pcap_global_header(outFd);
		for (const key of Object.keys(packets).sort((a, b) => a - b)) {
			fs.writeSync(outFd, packets[key]);
		}
		fs.closeSync(outFd);
	}
}

// CLI argument parsing
function get_args() {
	const args = process.argv.slice(2);
	const result = {
		input: "./",
		isDLRx: false,
		isDLTx: false,
		isULRx: false,
		isULTx: false,
	};
	for (let i = 0; i < args.length; ++i) {
		if (args[i] === "--input") result.input = args[++i];
		else if (args[i] === "--isDLRx") result.isDLRx = true;
		else if (args[i] === "--isDLTx") result.isDLTx = true;
		else if (args[i] === "--isULRx") result.isULRx = true;
		else if (args[i] === "--isULTx") result.isULTx = true;
	}
	return result;
}

// Main
if (require.main === module) {
	const args = get_args();
	const inputDir = args.input;
	if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
		throw new Error(`Input path '${inputDir}' is not a directory.`);
	}
	const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".bin"));
	for (const filename of files) {
		const fullPath = path.join(inputDir, filename);
		console.log(fullPath);
		if (args.isDLRx) dl_rx_bin_to_pcap(fullPath);
		else if (args.isDLTx) dl_tx_bin_to_pcap(fullPath);
		else if (args.isULRx) ul_rx_bin_to_pcap(fullPath);
		else if (args.isULTx) ul_tx_bin_to_pcap(fullPath);
	}
}
