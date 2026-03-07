function ethernetV2_decode(pkt, bufferView){
    bufferView.setByteOrder(C_BYTE_ORDER.NETWORK);

    pkt.destmac = bufferView.getMac();
    pkt.srcmac = bufferView.getMac();
    let ethertype = bufferView.getU16();

    while( ethertype === 0x8100 || ethertype === 0x88A8 || ethertype === 0x9100) {
        if( !pkt.vlan ) pkt.vlan = [];
        const vlan0 = bufferView.getU8();
        const vlan1 = bufferView.getU8();
        pkt.vlan.push( {
            'priority':  vlan0 >> 5,
            'dei': ( vlan0 >> 4 ) & 0x1,
            'vid': ( vlan0 & 0xF ) << 8 | vlan1,
            'tpidStr' : "0x" + ethertype.toString(16)
        } );

        ethertype = bufferView.getU16();
    }
    pkt.ethertype = ethertype;

    const bufferSubView = bufferView.createView();

    switch( ethertype ) {
        case 0xAEFE: ecpri_decode( pkt, bufferSubView); break;
        case 0x8951: bip_decode( pkt, bufferSubView ); break;
        case 0x88F7: ptp_decode( pkt, bufferSubView ); break;
        case 0xFC3D: roe_decode( pkt, bufferSubView ); break;
        case 0x0800: ipv4_decode( pkt, bufferSubView ); break;
        case 0x86DD: ipv6_decode( pkt, bufferSubView ); break;
        case 0x88B5: // eGen
            logInfo( 'eGen', String.fromCharCode.apply( null, bufferView.getU8Array(pkt.length - bufferView.offset) ) + '<br>' );
            break;
    }
}