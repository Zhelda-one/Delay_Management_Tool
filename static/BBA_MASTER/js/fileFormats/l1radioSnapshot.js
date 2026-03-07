/**
 * @param {BufferReader} bufferReader
 * @returns {boolean}
 */

class Conf {
	MAX_PACKET_SIZE = 1500;
	ECPRI_PACKET_PADDING = 4;
	ECPRI_COMMON_HEADER_LEN = 4;
	MAGIC_WORD = 0xa1b23c4d;
	VERSION_MAJOR = 2;
	VERSION_MINOR = 4;
	THISZONE = 0;
	SIGFIGS = 0;
	SNAPLEN = 65535;
	NETWORK = "Ethernet";
	ETHER_TYPE = 0xaefe;
	ETHER_FRAME_WRAPPER_LEN = 18; // 14 bytes header + 4 bytes FCS
}

function l1radioSnapshot_decode(bufferReader) {
	const perfNow = performance.now();

	ecpri_prePcapDecode();
	l2l1_prePcapDecode();

	const type = document.getElementById("loadDialog_L1RadioSnapshot_typeDropdown").value;

	switch (type) {
		case "DLRx":
			dl_rx_bin_to_pcap();
			break;
		case "DLTx":
			dl_tx_bin_to_pcap();
			break;
		case "ULRx":
			ul_rx_bin_to_pcap2(bufferReader);
			break;
		case "ULTx":
			const MAX_PACKET_SIZE = 1500;
			const ECPRI_PACKET_PADDING = 4;
			const ECPRI_COMMON_HEADER_LEN = 4;

			const PSW_HEADER_LEN = 64;

			const isTx = true;
			const ECPRI_BUFFER_SIZE = PSW_HEADER_LEN + MAX_PACKET_SIZE + ECPRI_PACKET_PADDING;

			let off = 0;

			let timestamp = 0;

			let pktIdx = 0; // tracks only loaded packets
			let filePktIdx = 0; // tracks all packets inside the file

			const lastPktIdx = config.load.loadLimit
				? packetsLength + config.load.loadLimit
				: 0xffffffff;
			const loadFrom = config.load.loadLimitFrom || 0;

			while (bufferReader.hasCapacity(ECPRI_BUFFER_SIZE)) {
				++timestamp;

				if (filePktIdx++ < loadFrom) {
					bufferReader.offset += ECPRI_BUFFER_SIZE;
					continue;
				}

				const sizeView = bufferReader.createView(4);
				sizeView.offset += 2;
				const packetSize = sizeView.getU16();

				if (packetSize > 0) {
					const pkt = {
						id: pktIdx,
						time: new Time(0, timestamp),
						length: packetSize + ECPRI_COMMON_HEADER_LEN,
						destmac: "11:22:33:44:55:66",
						srcmac: "aa:bb:cc:dd:ee:ff",
						ethertype: 0xaefe,
					};

					ecpri_decode(pkt, bufferReader.createView(ECPRI_BUFFER_SIZE));
					packets_push(pkt, bufferReader.offset, pkt.length);

					if (++pktIdx >= lastPktIdx) break;
				}
				bufferReader.offset += ECPRI_BUFFER_SIZE;
			}

			fillPacketsPayloadBuffer(bufferReader.buffer);

			l2l1_decode(false);
			ecpri_postPcapDecode(false);

			const loadedPackets = packetsLength - packetsLengthOld;
			logInfo(
				"l1radio Snapshot",
				`Decoded ${loadedPackets}/${pktIdx}(${calcPercentFixed2(
					loadedPackets,
					pktIdx
				)}) packets. Took ${perfToMsFrom(perfNow)}`
			);
			break;
	}
	return true;
}

function l1radioSnapshot_getTimestamp(buf, offset) {
	return buf.readUInt32LE(offset);
}

function dl_rx_bin_to_pcap() {
	// no files for this type
	logError("DLRx is not yet supported, please contact us with Your DLRx files via email");
}

function dl_tx_bin_to_pcap() {
	// no files for this type
	logError("DLRx is not yet supported, please contact us with Your DLTx files via email");
}

function ul_rx_bin_to_pcap2(bufferReader) {
	const perfNow = performance.now();

	const MAX_PACKET_SIZE = 6016;
	const ECPRI_PACKET_PADDING = 4;
	const ECPRI_COMMON_HEADER_LEN = 4;
	const PSW_HEADER_LEN = 64;
	const ECPRI_BUFFER_SIZE = 6016;

	let timestamp = 0;

	let pktIdx = 0; // tracks only loaded packets
	let filePktIdx = 0; // tracks all packets inside the file

	const lastPktIdx = config.load.loadLimit ? packetsLength + config.load.loadLimit : 0xffffffff;
	const loadFrom = config.load.loadLimitFrom || 0;

	while (bufferReader.hasCapacity(ECPRI_BUFFER_SIZE)) {

		if (filePktIdx++ < loadFrom) {
			bufferReader.offset += ECPRI_BUFFER_SIZE;
			continue;
		}

		const psw_header = new Array(PSW_HEADER_LEN);
		if (psw_header.length < PSW_HEADER_LEN) break; // Not enought data for a full header, stop procesing

		const sizeView = bufferReader.createView(MAX_PACKET_SIZE);
		sizeView.offset += (PSW_HEADER_LEN + 2);
		const packetSize = sizeView.getU16(); 

		// In Thor the format is: (_,_,_,timeStamp,_,_,_,_) aka 8 x 8 bytes = 64 bytes
		// buffer is expected to be a Uint8Array or Buffer of length 64
		const timeView = bufferReader.createView(32);
		timeView.offset += 24;
		timeView.hasCapacity(32);
		timeView.setByteOrder(true); // .isLittleEndian == true
		timestamp = timeView.getBU64();

		if (packetSize > 0) {
			const packetView = bufferReader.createView(ECPRI_BUFFER_SIZE);
			const pkt = {
				id: pktIdx,
				time: new Time(0, timestamp),
				length: packetSize + ECPRI_COMMON_HEADER_LEN,
				destmac: "11:22:33:44:55:66",
				srcmac: "aa:bb:cc:dd:ee:ff",
				ethertype: 0xaefe,
			};
			packetView.offset += PSW_HEADER_LEN;
			let bufferView = packetView.createView(ECPRI_BUFFER_SIZE - PSW_HEADER_LEN);
			ecpri_decode(pkt, bufferView);
			packets_push(pkt, bufferReader.getGlobalOffset(), pkt.length);

			if (++pktIdx >= lastPktIdx) break;
		}
		bufferReader.offset += (ECPRI_BUFFER_SIZE); 

	}
	
	fillPacketsPayloadBuffer(bufferReader.buffer);

	l2l1_decode(false);
	ecpri_postPcapDecode(false);
	
	const loadedPackets = packetsLength - packetsLengthOld;
	logInfo(
		"l1radio Snapshot",
		`Decoded ${loadedPackets}/${pktIdx}(${calcPercentFixed2(
			loadedPackets,
			pktIdx
		)}) packets. Took ${perfToMsFrom(perfNow)}`
	);
}