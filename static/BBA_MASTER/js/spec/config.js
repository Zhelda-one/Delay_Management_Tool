const configSpec = {
    // Generally immutable
    "mtu_size": 1500,
    "transportMaxSize": 1480,
    "eth_type": 0xAEFE,
    "timing_window": 2.56,
    "symbols_in_slot": 14,

    // Apply to both
    "mantissa": 9,
    "numerology": 1,
    "time_density": 2,
    "staticLongPucch": false,

    // Split specific
    "mac_split73": [0, 0, 0, 0, 0, 0],
    "mac_proxy73_72": [0, 0, 0, 0, 0, 1],
    "mac_split72": [0, 0, 0, 0, 0, 2],

    "generate_proxy73_72": true,
    "generate_split72": true,
    "filename_proxy73_72": 'proxy73_72.pcap',
    "filename_split72": 'split72.pcap',

    "useBaseTimestamps": true,
    "cplane_ul_advance72": 336,
    "cplane_dl_advance72": 470,
    "uplane_ul_advance72": 50,
    "uplane_dl_advance72": 345,

    "cplane_ul_advance73": 854,
    "cplane_dl_advance73": 845,
    "uplane_ul_advance73": 600,
    "uplane_dl_advance73": 845,


    "subcells": [
        {
            'numCeAxCId': 2,    // array length can be used instead of this variable
            "ceAxCIdcPlane": 16,    // PUSCH over eCPRI
            "ceAxCIdPuschIq": [16, 17, 18, 19], // first value shared with ceAxCIdcPlane
            "ceAxCIdPuschSINR": [20, 21],
            "ceAxCId72": [0, 128, 1, 129],  //FCPs over 72
            "ceAxCIdPucch73": [0, 128, 1, 129], //FCPs over 73
            "ceAxCIdPrach": [0, 128, 1, 129]    //currently not in use
        },
        {
            'numCeAxCId': 2,
            "ceAxCIdcPlane": 16,
            "ceAxCIdPuschIq": [16, 17, 18, 19],
            "ceAxCIdPuschSINR": [20, 21],
            "ceAxCId72": [0, 128, 1, 129],
            "ceAxCIdPucch73": [0, 128, 1, 129],
            "ceAxCIdPrach": [0, 128, 1, 129]
        },
        {
            'numCeAxCId': 2,
            "ceAxCIdcPlane": 16,
            "ceAxCIdPuschIq": [16, 17, 18, 19],
            "ceAxCIdPuschSINR": [20, 21],
            "ceAxCId72": [0, 128, 1, 129],
            "ceAxCIdPucch73": [0, 128, 1, 129],
            "ceAxCIdPrach": [0, 128, 1, 129]
        },
        {
            'numCeAxCId': 2,
            "ceAxCIdcPlane": 16,
            "ceAxCIdPuschIq": [16, 17, 18, 19],
            "ceAxCIdPuschSINR": [20, 21],
            "ceAxCId72": [0, 128, 1, 129],
            "ceAxCIdPucch73": [0, 128, 1, 129],
            "ceAxCIdPrach": [0, 128, 1, 129]
        }
    ]
};