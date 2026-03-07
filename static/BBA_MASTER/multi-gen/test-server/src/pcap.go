package main

import (
	"encoding/binary"
	"errors"
	"fmt"
	"log/slog"
	"slices"
)

type PcapPacket struct {
	timestamp     uint32
	timestampFrac uint32
	capLen        uint32
	origLen       uint32
	data          []byte
}

type Pcap struct {
	snapLen  uint32
	linkType uint16
	flags    uint8
	packets  []PcapPacket
	raw      []byte
}

var magicMap = map[uint32]uint8{
	0xA1B2C3D4: 0x00, // little endian
	0xA1B23C4D: 0x02, // little endian and nanosecond timestamp
	0xD4C3B2A1: 0x01, // big endian
	0x4D3CB2A1: 0x03, // big endian and nanosecond timestamp
}

const supportedMajor = 2
const supportedMinor = 4

const pcapHeaderLength = 24

func parsePcap(data []byte) (pcap Pcap, err error) {
	if len(data) < pcapHeaderLength {
		err = errors.New("data is too smol")
		return
	}

	pcap.raw = data

	magic := binary.LittleEndian.Uint32(data)
	flags, ok := magicMap[magic]
	if !ok {
		err = fmt.Errorf("invalid magic number: %x", magic)
		return
	}

	decoder := pcap.decoder()

	major := decoder.Uint16(data[4:])
	if major != supportedMajor {
		err = fmt.Errorf("unsupported major version: %x", major)
		return
	}

	minor := decoder.Uint16(data[6:])
	if minor != supportedMinor {
		err = fmt.Errorf("unsupported minor version: %x", minor)
		return
	}

	// skip reserved bytes
	data = data[16:]

	pcap.snapLen = decoder.Uint32(data)
	pcap.flags = flags | data[4]
	pcap.linkType = decoder.Uint16(data[6:])

	data = data[8:]

	pcap.packets = make([]PcapPacket, 0, 30)

	for len(data) != 0 {
		var packet PcapPacket

		packet.timestamp = decoder.Uint32(data)
		packet.timestampFrac = decoder.Uint32(data[4:])
		packet.capLen = decoder.Uint32(data[8:])
		packet.origLen = decoder.Uint32(data[12:])
		packet.data = data[16 : 16+packet.capLen]

		pcap.packets = append(pcap.packets, packet)
		data = data[16+packet.capLen:]
	}

	slog.Info("Successfully parsed PCAP", "flags", pcap.flags)

	return
}

type BipPacket struct {
	Rbip             bool
	Type             uint8
	StreamId         uint16
	PayloadSize      uint16
	EventSeqNum      uint8
	FragmentIndex    uint8
	LocalQueueId     uint16
	Version          uint8
	ProtocolSpecific uint8
	DestDevId        uint16
	SrcDevId         uint16
	// 0-2  idk
	// 2-4  message id
	// 4-8  idk2
	// 8-.. payload
	Data []byte
}

func parseBip(data []byte) (bip BipPacket, err error) {
	if len(data) == 0 {
		err = errors.New("bip buffer too smol")
		return
	}

	bip.Rbip = data[0]&0x80 != 0
	bip.Type = data[0] >> 4 & 0x07

	dataOffset := 0

	if bip.Rbip {
		bip.Version = data[0] & 0x0F
		bip.ProtocolSpecific = data[1]
		bip.PayloadSize = binary.BigEndian.Uint16(data[2:])
		bip.DestDevId = binary.BigEndian.Uint16(data[4:])
		bip.SrcDevId = binary.BigEndian.Uint16(data[6:])

		if bip.Type == 2 {
			bip.LocalQueueId = binary.BigEndian.Uint16(data[8:])
			bip.EventSeqNum = data[10]
		}

		dataOffset = 16
	} else {
		bip.StreamId = uint16(data[0]&0xF)<<8 | uint16(data[1])
		bip.PayloadSize = binary.BigEndian.Uint16(data[2:])

		if bip.Type == 2 {
			bip.EventSeqNum = data[4]
			bip.FragmentIndex = data[5]
			bip.LocalQueueId = binary.LittleEndian.Uint16(data[6:])
		}

		dataOffset = 8
	}

	bip.Data = data[dataOffset:]

	return
}

func (p *Pcap) decoder() binary.ByteOrder {
	if p.flags&1 == 1 {
		return binary.BigEndian
	}

	return binary.LittleEndian
}

// NOTE: this was taken from the source code of BBA, i don't really know why
// these ethertypes are special

// from `app_file_pcap_ecpri` in old BBA:
// 0x8100         - VLAN
// 0x88E5         - MACSEC (unused here)
// 0x88A8, 0x9100 - QinQ
var goofyEthertypes = []uint16{0x8100, 0x88A8, 0x9100}

const bipEthertype = 0x8951

func (p *Pcap) filterBIPs() []BipPacket {
	decoder := p.decoder()

	bips := make([]BipPacket, 0, len(p.packets))

	for id, packet := range p.packets {
		// 0-6  - destination mac address
		// 6-12 - source mac address
		ethertype := decoder.Uint16(packet.data[12:])

		dataOff := 16

		if slices.Contains(goofyEthertypes, ethertype) {
			ethertype = decoder.Uint16(packet.data[16:])
			dataOff += 2
		}

		if ethertype != bipEthertype {
			continue
		}

		bip, err := parseBip(packet.data[dataOff:])
		if err != nil {
			slog.Error("Failed to parse bip packet", "id", id, "reason", err)
			continue
		}

		bips = append(bips, bip)
	}

	slog.Info("Filtered out BIP packets", "count", len(bips))

	return bips
}
