//-----------------------------------Precoding options and number of layers tables below--------------------------------------------------

const t38_212_7_3_1_1_2_2 = [ //4 antenna ports, if transform precoder is disabled and maxRank = 2 or 3 or 4
    {"val": 0, "numOfLayers" : 1, "tpmi" : 0},
    {"val": 1, "numOfLayers" : 1, "tpmi" : 1},
    {"val": 2, "numOfLayers" : 1, "tpmi" : 2},
    {"val": 3, "numOfLayers" : 1, "tpmi" : 3},
    {"val": 4, "numOfLayers" : 2, "tpmi" : 0},
    {"val": 5, "numOfLayers" : 2, "tpmi" : 1},
    {"val": 6, "numOfLayers" : 2, "tpmi" : 2},
    {"val": 7, "numOfLayers" : 2, "tpmi" : 3},
    {"val": 8, "numOfLayers" : 2, "tpmi" : 4},
    {"val": 9, "numOfLayers" : 2, "tpmi" : 5},
    {"val": 10, "numOfLayers" : 3, "tpmi" : 0},
    {"val": 11, "numOfLayers" : 4, "tpmi" : 0},
    {"val": 12, "numOfLayers" : 1, "tpmi" : 4},
    {"val": 13, "numOfLayers" : 1, "tpmi" : 5},
    {"val": 14, "numOfLayers" : 1, "tpmi" : 6},
    {"val": 15, "numOfLayers" : 1, "tpmi" : 7},
    {"val": 16, "numOfLayers" : 1, "tpmi" : 8},
    {"val": 17, "numOfLayers" : 1, "tpmi" : 9},
    {"val": 18, "numOfLayers" : 1, "tpmi" : 10},
    {"val": 19, "numOfLayers" : 1, "tpmi" : 11},
    {"val": 20, "numOfLayers" : 2, "tpmi" : 6},
    {"val": 21, "numOfLayers" : 2, "tpmi" : 7},
    {"val": 22, "numOfLayers" : 2, "tpmi" : 8},
    {"val": 23, "numOfLayers" : 2, "tpmi" : 9},
    {"val": 24, "numOfLayers" : 2, "tpmi" : 10},
    {"val": 25, "numOfLayers" : 2, "tpmi" : 11},
    {"val": 26, "numOfLayers" : 2, "tpmi" : 12},
    {"val": 27, "numOfLayers" : 2, "tpmi" : 13},
    {"val": 28, "numOfLayers" : 3, "tpmi" : 1},
    {"val": 29, "numOfLayers" : 3, "tpmi" : 2},
    {"val": 30, "numOfLayers" : 4, "tpmi" : 1},
    {"val": 31, "numOfLayers" : 4, "tpmi" : 2},
    {"val": 32, "numOfLayers" : 1, "tpmi" : 12},
    {"val": 33, "numOfLayers" : 1, "tpmi" : 13},
    {"val": 34, "numOfLayers" : 1, "tpmi" : 14},
    {"val": 35, "numOfLayers" : 1, "tpmi" : 15},
    {"val": 36, "numOfLayers" : 1, "tpmi" : 16},
    {"val": 37, "numOfLayers" : 1, "tpmi" : 17},
    {"val": 38, "numOfLayers" : 1, "tpmi" : 18},
    {"val": 39, "numOfLayers" : 1, "tpmi" : 19},
    {"val": 40, "numOfLayers" : 1, "tpmi" : 20},
    {"val": 41, "numOfLayers" : 1, "tpmi" : 21},
    {"val": 42, "numOfLayers" : 1, "tpmi" : 22},
    {"val": 43, "numOfLayers" : 1, "tpmi" : 23},
    {"val": 44, "numOfLayers" : 1, "tpmi" : 24},
    {"val": 45, "numOfLayers" : 1, "tpmi" : 25},
    {"val": 46, "numOfLayers" : 1, "tpmi" : 26},
    {"val": 47, "numOfLayers" : 1, "tpmi" : 27},
    {"val": 48, "numOfLayers" : 2, "tpmi" : 14},
    {"val": 49, "numOfLayers" : 2, "tpmi" : 15},
    {"val": 50, "numOfLayers" : 2, "tpmi" : 16},
    {"val": 51, "numOfLayers" : 2, "tpmi" : 17},
    {"val": 52, "numOfLayers" : 2, "tpmi" : 18},
    {"val": 53, "numOfLayers" : 2, "tpmi" : 19},
    {"val": 54, "numOfLayers" : 2, "tpmi" : 20},
    {"val": 55, "numOfLayers" : 2, "tpmi" : 21},
    {"val": 56, "numOfLayers" : 3, "tpmi" : 3},
    {"val": 57, "numOfLayers" : 3, "tpmi" : 4},
    {"val": 58, "numOfLayers" : 3, "tpmi" : 5},
    {"val": 59, "numOfLayers" : 3, "tpmi" : 6},
    {"val": 60, "numOfLayers" : 4, "tpmi" : 3},
    {"val": 61, "numOfLayers" : 4, "tpmi" : 4},
    //62 - 63 reserved
]

const t38_212_7_3_1_1_2_3 = [ //4 antenna ports, if transform precoder is enabled, or if transform precoder is disabled and maxRank = 1
    {"val": 0, "numOfLayers" : 1, "tpmi" : 0},
    {"val": 1, "numOfLayers" : 1, "tpmi" : 1},
    {"val": 2, "numOfLayers" : 1, "tpmi" : 2},
    {"val": 3, "numOfLayers" : 1, "tpmi" : 3},
    {"val": 4, "numOfLayers" : 1, "tpmi" : 4},
    {"val": 5, "numOfLayers" : 1, "tpmi" : 5},
    {"val": 6, "numOfLayers" : 1, "tpmi" : 6},
    {"val": 7, "numOfLayers" : 1, "tpmi" : 7},
    {"val": 8, "numOfLayers" : 1, "tpmi" : 8},
    {"val": 9, "numOfLayers" : 1, "tpmi" : 9},
    {"val": 10, "numOfLayers" : 1, "tpmi" : 10},
    {"val": 11, "numOfLayers" : 1, "tpmi" : 11},
    {"val": 12, "numOfLayers" : 1, "tpmi" : 12},
    {"val": 13, "numOfLayers" : 1, "tpmi" : 13},
    {"val": 14, "numOfLayers" : 1, "tpmi" : 14},
    {"val": 15, "numOfLayers" : 1, "tpmi" : 15},
    {"val": 16, "numOfLayers" : 1, "tpmi" : 16},
    {"val": 17, "numOfLayers" : 1, "tpmi" : 17},
    {"val": 18, "numOfLayers" : 1, "tpmi" : 18},
    {"val": 19, "numOfLayers" : 1, "tpmi" : 19},
    {"val": 20, "numOfLayers" : 1, "tpmi" : 20},
    {"val": 21, "numOfLayers" : 1, "tpmi" : 21},
    {"val": 22, "numOfLayers" : 1, "tpmi" : 22},
    {"val": 23, "numOfLayers" : 1, "tpmi" : 23},
    {"val": 24, "numOfLayers" : 1, "tpmi" : 24},
    {"val": 25, "numOfLayers" : 1, "tpmi" : 25},
    {"val": 26, "numOfLayers" : 1, "tpmi" : 26},
    {"val": 27, "numOfLayers" : 1, "tpmi" : 27},
    //28-31 reserved
]

const t38_212_7_3_1_1_2_4 = [ //TransPrec = 0, AntPorts=2, maxRank = 2
    {"val": 0, "numOfLayers" : 1, "tpmi" : 0},
    {"val": 1, "numOfLayers" : 1, "tpmi" : 1},
    {"val": 2, "numOfLayers" : 2, "tpmi" : 0},
    {"val": 3, "numOfLayers" : 1, "tpmi" : 2},
    {"val": 4, "numOfLayers" : 1, "tpmi" : 3},
    {"val": 5, "numOfLayers" : 1, "tpmi" : 4},
    {"val": 6, "numOfLayers" : 1, "tpmi" : 5},
    {"val": 7, "numOfLayers" : 2, "tpmi" : 1},
    {"val": 8, "numOfLayers" : 2, "tpmi" : 2}
    //9-15 reserved
]

//AntPorts=2 AND (TransPrec = 1 OR (TransPrec = 0, maxRank = 1))
const t38_212_7_3_1_1_2_5 = [
    {"val": 0, "numOfLayers" : 1, "tpmi" : 0},
    {"val": 1, "numOfLayers" : 1, "tpmi" : 1},
    {"val": 2, "numOfLayers" : 1, "tpmi" : 2},
    {"val": 3, "numOfLayers" : 1, "tpmi" : 3},
    {"val": 4, "numOfLayers" : 1, "tpmi" : 4},
    {"val": 5, "numOfLayers" : 1, "tpmi" : 5}
    //6-7 reserved
]


//-----------------------------------DCI 0_1 Antenna ports tables below--------------------------------------------------


const t38_212_7_3_1_1_2_6 = [ //TransPrec = 1, dmrsConfType = 1, maxLen=1
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [3]},
];

const t38_212_7_3_1_1_2_7 = [ //TransPrec = 1, dmrsConfType = 1, maxLen=2
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [3], "NumOfFrontLoadedSym" : 1},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [0], "NumOfFrontLoadedSym" : 2},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [1], "NumOfFrontLoadedSym" : 2},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [2], "NumOfFrontLoadedSym" : 2},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [3], "NumOfFrontLoadedSym" : 2},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [4], "NumOfFrontLoadedSym" : 2},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [5], "NumOfFrontLoadedSym" : 2},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [6], "NumOfFrontLoadedSym" : 2},
    {"val": 11, "numOfCdmGroupsWOData": 2, "Ports": [7], "NumOfFrontLoadedSym" : 2},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_8 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=1, rank=1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_9 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=1, rank = 2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0,2]},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_10 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=1, rank = 3
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 1, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 2, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 3, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_11 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=1, rank = 4
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 1, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 2, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 3, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_12 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=2, rank = 1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [2], "NumOfFrontLoadedSym" : 1},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [3], "NumOfFrontLoadedSym" : 1},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [0], "NumOfFrontLoadedSym" : 2},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [1], "NumOfFrontLoadedSym" : 2},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [2], "NumOfFrontLoadedSym" : 2},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [3], "NumOfFrontLoadedSym" : 2},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [4], "NumOfFrontLoadedSym" : 2},
    {"val": 11, "numOfCdmGroupsWOData": 2, "Ports": [5], "NumOfFrontLoadedSym" : 2},
    {"val": 12, "numOfCdmGroupsWOData": 2, "Ports": [6], "NumOfFrontLoadedSym" : 2},
    {"val": 13, "numOfCdmGroupsWOData": 2, "Ports": [7], "NumOfFrontLoadedSym" : 2},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_13 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=2, rank = 2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0,1], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0,2], "NumOfFrontLoadedSym" : 1},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [0,1], "NumOfFrontLoadedSym" : 2},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [2,3], "NumOfFrontLoadedSym" : 2},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [4,5], "NumOfFrontLoadedSym" : 2},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [0,4], "NumOfFrontLoadedSym" : 2},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [2,6], "NumOfFrontLoadedSym" : 2},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_14 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=2, rank = 3,
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1,4], "NumOfFrontLoadedSym" : 2},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3,6], "NumOfFrontLoadedSym" : 2},
    {"val": 3, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_15 = [ //TransPrec = 0, dmrsConfType = 1, maxLen=2, rank = 4
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1,4,5], "NumOfFrontLoadedSym" : 2},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3,6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0,2,4,6], "NumOfFrontLoadedSym" : 2},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_16 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=1, rank = 1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 6, "numOfCdmGroupsWOData": 3, "Ports": [0]},
    {"val": 7, "numOfCdmGroupsWOData": 3, "Ports": [1]},
    {"val": 8, "numOfCdmGroupsWOData": 3, "Ports": [2]},
    {"val": 9, "numOfCdmGroupsWOData": 3, "Ports": [3]},
    {"val": 10, "numOfCdmGroupsWOData": 3, "Ports": [4]},
    {"val": 11, "numOfCdmGroupsWOData": 3, "Ports": [5]},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_17 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=1, rank = 2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 3, "numOfCdmGroupsWOData": 3, "Ports": [0,1]},
    {"val": 4, "numOfCdmGroupsWOData": 3, "Ports": [2,3]},
    {"val": 5, "numOfCdmGroupsWOData": 3, "Ports": [4,5]},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [0,2]},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 16, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_18 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=1, rank = 3
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 1, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2]},
    {"val": 2, "numOfCdmGroupsWOData": 3, "Ports": [3,4,5]},
    {"val": 3, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_19 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=1, rank = 4
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 1, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2,3]},
    {"val": 2, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 3, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 4, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_1_2_20 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=2, rank = 1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [2], "NumOfFrontLoadedSym" : 1},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [3], "NumOfFrontLoadedSym" : 1},
    {"val": 6, "numOfCdmGroupsWOData": 3, "Ports": [0], "NumOfFrontLoadedSym" : 1},
    {"val": 7, "numOfCdmGroupsWOData": 3, "Ports": [1], "NumOfFrontLoadedSym" : 1},
    {"val": 8, "numOfCdmGroupsWOData": 3, "Ports": [2], "NumOfFrontLoadedSym" : 1},
    {"val": 9, "numOfCdmGroupsWOData": 3, "Ports": [3], "NumOfFrontLoadedSym" : 1},
    {"val": 10, "numOfCdmGroupsWOData": 3, "Ports": [4], "NumOfFrontLoadedSym" : 1},
    {"val": 11, "numOfCdmGroupsWOData": 3, "Ports": [5], "NumOfFrontLoadedSym" : 1},
    {"val": 12, "numOfCdmGroupsWOData": 3, "Ports": [0], "NumOfFrontLoadedSym" : 2},
    {"val": 13, "numOfCdmGroupsWOData": 3, "Ports": [1], "NumOfFrontLoadedSym" : 2},
    {"val": 14, "numOfCdmGroupsWOData": 3, "Ports": [2], "NumOfFrontLoadedSym" : 2},
    {"val": 15, "numOfCdmGroupsWOData": 3, "Ports": [3], "NumOfFrontLoadedSym" : 2},
    {"val": 16, "numOfCdmGroupsWOData": 3, "Ports": [4], "NumOfFrontLoadedSym" : 2},
    {"val": 17, "numOfCdmGroupsWOData": 3, "Ports": [5], "NumOfFrontLoadedSym" : 2},
    {"val": 18, "numOfCdmGroupsWOData": 3, "Ports": [6], "NumOfFrontLoadedSym" : 2},
    {"val": 19, "numOfCdmGroupsWOData": 3, "Ports": [7], "NumOfFrontLoadedSym" : 2},
    {"val": 20, "numOfCdmGroupsWOData": 3, "Ports": [8], "NumOfFrontLoadedSym" : 2},
    {"val": 21, "numOfCdmGroupsWOData": 3, "Ports": [9], "NumOfFrontLoadedSym" : 2},
    {"val": 22, "numOfCdmGroupsWOData": 3, "Ports": [10], "NumOfFrontLoadedSym" : 2},
    {"val": 23, "numOfCdmGroupsWOData": 3, "Ports": [11], "NumOfFrontLoadedSym" : 2},
    {"val": 24, "numOfCdmGroupsWOData": 1, "Ports": [0], "NumOfFrontLoadedSym" : 2},
    {"val": 25, "numOfCdmGroupsWOData": 1, "Ports": [1], "NumOfFrontLoadedSym" : 2},
    {"val": 26, "numOfCdmGroupsWOData": 1, "Ports": [6], "NumOfFrontLoadedSym" : 2},
    {"val": 27, "numOfCdmGroupsWOData": 1, "Ports": [7], "NumOfFrontLoadedSym" : 2},
    {"val": 28, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 29, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 30, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_21 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=2, rank = 2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0,1], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 2, "Ports": [0,1], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 2, "Ports": [2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 3, "Ports": [0,1], "NumOfFrontLoadedSym" : 1},
    {"val": 4, "numOfCdmGroupsWOData": 3, "Ports": [2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 5, "numOfCdmGroupsWOData": 3, "Ports": [4,5], "NumOfFrontLoadedSym" : 1},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [0,2], "NumOfFrontLoadedSym" : 1},
    {"val": 7, "numOfCdmGroupsWOData": 3, "Ports": [0,1], "NumOfFrontLoadedSym" : 2},
    {"val": 8, "numOfCdmGroupsWOData": 3, "Ports": [2,3], "NumOfFrontLoadedSym" : 2},
    {"val": 9, "numOfCdmGroupsWOData": 3, "Ports": [4,5], "NumOfFrontLoadedSym" : 2},
    {"val": 10, "numOfCdmGroupsWOData": 3, "Ports": [6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 11, "numOfCdmGroupsWOData": 3, "Ports": [8,9], "NumOfFrontLoadedSym" : 2},
    {"val": 12, "numOfCdmGroupsWOData": 3, "Ports": [10,11], "NumOfFrontLoadedSym" : 2},
    {"val": 13, "numOfCdmGroupsWOData": 1, "Ports": [0,1], "NumOfFrontLoadedSym" : 2},
    {"val": 14, "numOfCdmGroupsWOData": 1, "Ports": [6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 15, "numOfCdmGroupsWOData": 2, "Ports": [0,1], "NumOfFrontLoadedSym" : 2},
    {"val": 16, "numOfCdmGroupsWOData": 2, "Ports": [2,3], "NumOfFrontLoadedSym" : 2},
    {"val": 17, "numOfCdmGroupsWOData": 2, "Ports": [6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 18, "numOfCdmGroupsWOData": 2, "Ports": [8,9], "NumOfFrontLoadedSym" : 2},
    {"val": 19, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 20, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 21, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 22, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 23, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 24, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 25, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 26, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 27, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 28, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 29, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 30, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1}
];

const t38_212_7_3_1_1_2_22 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=2, rank = 3
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 3, "Ports": [3,4,5], "NumOfFrontLoadedSym" : 1},
    {"val": 3, "numOfCdmGroupsWOData": 3, "Ports": [0,1,6], "NumOfFrontLoadedSym" : 2},
    {"val": 4, "numOfCdmGroupsWOData": 3, "Ports": [2,3,8], "NumOfFrontLoadedSym" : 2},
    {"val": 5, "numOfCdmGroupsWOData": 3, "Ports": [4,5,10], "NumOfFrontLoadedSym" : 2},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 16, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 17, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 18, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 19, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 20, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 21, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 22, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 23, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 24, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 25, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 26, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 27, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 28, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 29, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 30, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];

const t38_212_7_3_1_1_2_23 = [ //TransPrec = 0, dmrsConfType = 2, maxLen=2, rank = 4
    {"val": 0, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 1, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2,3], "NumOfFrontLoadedSym" : 1},
    {"val": 2, "numOfCdmGroupsWOData": 3, "Ports": [0,1,6,7], "NumOfFrontLoadedSym" : 2},
    {"val": 3, "numOfCdmGroupsWOData": 3, "Ports": [2,3,8,9], "NumOfFrontLoadedSym" : 2},
    {"val": 4, "numOfCdmGroupsWOData": 3, "Ports": [4,5,10,11], "NumOfFrontLoadedSym" : 2},
    {"val": 5, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 6, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 7, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 8, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 9, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 10, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 11, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 16, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 17, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 18, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 19, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 20, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 21, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 22, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 23, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 24, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 25, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 26, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 27, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 28, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 29, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 30, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": [], "NumOfFrontLoadedSym" : -1},
];


//-----------------------------------DCI 1_1 Antenna ports tables below--------------------------------------------------


const t38_212_7_3_1_2_2_1 = [ //dmrs-Type=1, maxLength=1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 11, "numOfCdmGroupsWOData": 2, "Ports": [0,2]},
    {"val": 12, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 13, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 14, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 15, "numOfCdmGroupsWOData": -1, "Ports": []}
];

const t38_212_7_3_1_2_2_2 = [ //dmrs-Type=1, maxLength=2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 11, "numOfCdmGroupsWOData": 2, "Ports": [0,2]},
    {"val": 12, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 13, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 14, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 15, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 16, "numOfCdmGroupsWOData": 2, "Ports": [4]},
    {"val": 17, "numOfCdmGroupsWOData": 2, "Ports": [5]},
    {"val": 18, "numOfCdmGroupsWOData": 2, "Ports": [6]},
    {"val": 19, "numOfCdmGroupsWOData": 2, "Ports": [7]},
    {"val": 20, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 21, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 22, "numOfCdmGroupsWOData": 2, "Ports": [4,5]},
    {"val": 23, "numOfCdmGroupsWOData": 2, "Ports": [6,7]},
    {"val": 24, "numOfCdmGroupsWOData": 2, "Ports": [0,4]},
    {"val": 25, "numOfCdmGroupsWOData": 2, "Ports": [2,6]},
    {"val": 26, "numOfCdmGroupsWOData": 2, "Ports": [0,1,4]},
    {"val": 27, "numOfCdmGroupsWOData": 2, "Ports": [2,3,6]},
    {"val": 28, "numOfCdmGroupsWOData": 2, "Ports": [0,1,4,5]},
    {"val": 29, "numOfCdmGroupsWOData": 2, "Ports": [2,3,6,7]},
    {"val": 30, "numOfCdmGroupsWOData": 2, "Ports": [0,2,4,6]},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_2_2_3 = [ //dmrs-Type=2, maxLength=1
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 11, "numOfCdmGroupsWOData": 3, "Ports": [0]},
    {"val": 12, "numOfCdmGroupsWOData": 3, "Ports": [1]},
    {"val": 13, "numOfCdmGroupsWOData": 3, "Ports": [2]},
    {"val": 14, "numOfCdmGroupsWOData": 3, "Ports": [3]},
    {"val": 15, "numOfCdmGroupsWOData": 3, "Ports": [4]},
    {"val": 16, "numOfCdmGroupsWOData": 3, "Ports": [5]},
    {"val": 17, "numOfCdmGroupsWOData": 3, "Ports": [0,1]},
    {"val": 18, "numOfCdmGroupsWOData": 3, "Ports": [2,3]},
    {"val": 19, "numOfCdmGroupsWOData": 3, "Ports": [4,5]},
    {"val": 20, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2]},
    {"val": 21, "numOfCdmGroupsWOData": 3, "Ports": [3,4,5]},
    {"val": 22, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2,3]},
    {"val": 23, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 24, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 25, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 26, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 27, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 28, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 29, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 30, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 31, "numOfCdmGroupsWOData": -1, "Ports": []},
];

const t38_212_7_3_1_2_2_4 = [ //dmrs-Type=2, maxLength=2
    {"val": 0, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 1, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 2, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 3, "numOfCdmGroupsWOData": 2, "Ports": [0]},
    {"val": 4, "numOfCdmGroupsWOData": 2, "Ports": [1]},
    {"val": 5, "numOfCdmGroupsWOData": 2, "Ports": [2]},
    {"val": 6, "numOfCdmGroupsWOData": 2, "Ports": [3]},
    {"val": 7, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 8, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 9, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2]},
    {"val": 10, "numOfCdmGroupsWOData": 2, "Ports": [0,1,2,3]},
    {"val": 11, "numOfCdmGroupsWOData": 3, "Ports": [0]},
    {"val": 12, "numOfCdmGroupsWOData": 3, "Ports": [1]},
    {"val": 13, "numOfCdmGroupsWOData": 3, "Ports": [2]},
    {"val": 14, "numOfCdmGroupsWOData": 3, "Ports": [3]},
    {"val": 15, "numOfCdmGroupsWOData": 3, "Ports": [4]},
    {"val": 16, "numOfCdmGroupsWOData": 3, "Ports": [5]},
    {"val": 17, "numOfCdmGroupsWOData": 3, "Ports": [0,1]},
    {"val": 18, "numOfCdmGroupsWOData": 3, "Ports": [2,3]},
    {"val": 19, "numOfCdmGroupsWOData": 3, "Ports": [4,5]},
    {"val": 20, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2]},
    {"val": 21, "numOfCdmGroupsWOData": 3, "Ports": [3,4,5]},
    {"val": 22, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2,3]},
    {"val": 23, "numOfCdmGroupsWOData": 3, "Ports": [0,1,2]},
    {"val": 24, "numOfCdmGroupsWOData": 3, "Ports": [0]},
    {"val": 25, "numOfCdmGroupsWOData": 3, "Ports": [1]},
    {"val": 26, "numOfCdmGroupsWOData": 3, "Ports": [2]},
    {"val": 27, "numOfCdmGroupsWOData": 3, "Ports": [3]},
    {"val": 28, "numOfCdmGroupsWOData": 3, "Ports": [4]},
    {"val": 29, "numOfCdmGroupsWOData": 3, "Ports": [5]},
    {"val": 30, "numOfCdmGroupsWOData": 3, "Ports": [6]},
    {"val": 31, "numOfCdmGroupsWOData": 3, "Ports": [7]},
    {"val": 32, "numOfCdmGroupsWOData": 3, "Ports": [8]},
    {"val": 33, "numOfCdmGroupsWOData": 3, "Ports": [9]},
    {"val": 34, "numOfCdmGroupsWOData": 3, "Ports": [10]},
    {"val": 35, "numOfCdmGroupsWOData": 3, "Ports": [11]},
    {"val": 36, "numOfCdmGroupsWOData": 3, "Ports": [0,1]},
    {"val": 37, "numOfCdmGroupsWOData": 3, "Ports": [2,3]},
    {"val": 38, "numOfCdmGroupsWOData": 3, "Ports": [4,5]},
    {"val": 39, "numOfCdmGroupsWOData": 3, "Ports": [6,7]},
    {"val": 40, "numOfCdmGroupsWOData": 3, "Ports": [8,9]},
    {"val": 41, "numOfCdmGroupsWOData": 3, "Ports": [10,11]},
    {"val": 42, "numOfCdmGroupsWOData": 3, "Ports": [0,1,6]},
    {"val": 43, "numOfCdmGroupsWOData": 3, "Ports": [2,3,8]},
    {"val": 44, "numOfCdmGroupsWOData": 3, "Ports": [4,5,10]},
    {"val": 45, "numOfCdmGroupsWOData": 3, "Ports": [0,1,6,7]},
    {"val": 46, "numOfCdmGroupsWOData": 3, "Ports": [2,3,8,9]},
    {"val": 47, "numOfCdmGroupsWOData": 3, "Ports": [4,5,10,11]},
    {"val": 48, "numOfCdmGroupsWOData": 1, "Ports": [0]},
    {"val": 49, "numOfCdmGroupsWOData": 1, "Ports": [1]},
    {"val": 50, "numOfCdmGroupsWOData": 1, "Ports": [6]},
    {"val": 51, "numOfCdmGroupsWOData": 1, "Ports": [7]},
    {"val": 52, "numOfCdmGroupsWOData": 1, "Ports": [0,1]},
    {"val": 53, "numOfCdmGroupsWOData": 1, "Ports": [6,7]},
    {"val": 54, "numOfCdmGroupsWOData": 2, "Ports": [0,1]},
    {"val": 55, "numOfCdmGroupsWOData": 2, "Ports": [2,3]},
    {"val": 56, "numOfCdmGroupsWOData": 2, "Ports": [6,7]},
    {"val": 57, "numOfCdmGroupsWOData": 2, "Ports": [8,9]},
    {"val": 58, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 59, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 60, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 61, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 62, "numOfCdmGroupsWOData": -1, "Ports": []},
    {"val": 63, "numOfCdmGroupsWOData": -1, "Ports": []},
];


////////////////////UTILITY FUNCTIONS BELOW//////////////////////////////

// function dci_update_values(){
    // for(let i = 0; i < packets.length; i++){
    //     if(packets[i].l2l1 && packets[i].l2l1.dciInfo){
    //         decode_DCI_onLoad(packets[i]);
    //     }
    // }
//     packetTable_renderPackets();
// }

//Based on 5.1.2.2.2 of 38214 (Downlink resource allocation type 1)
function dci_parseFreqDomainResAssignment(RIV,N_BWP_size){
    let RB_start = RIV % N_BWP_size;
    let L_RB = (RIV - RB_start)/N_BWP_size + 1;

    if(L_RB > N_BWP_size - RB_start){ //Second formula must be applied if this condition is met
        RB_start = RIV % N_BWP_size - N_BWP_size + 1
        L_RB = -((RIV - N_BWP_size + 1 + RB_start) / N_BWP_size - 1 - N_BWP_size);
    }

    return [RB_start,L_RB];
}

//Based on 7.3.1.2.2 of 38212 (Format 1_1)
//Returns Frequency Domain Resource Assignment dci field size and optionally the value of the field
function dci_getFreqDomainResAssignmentFieldAndSize(resourceAllocation,startPrb,numOfPrb,N_BWP_size,N_BWP_start,rbgSize,resAllocType0Bitmap,isFromRRC){
    let dciFieldLength = -1;
    let dciFieldValue = "";
    if( resourceAllocation === "resourceAllocationType0" ){ //Based on 5.1.2.2.1 of 38214 (Downlink resource allocation type 0)
        const t38_214_5_1_2_2_1_1 = {
            1 : [2,4,8,16],
            2 : [4,8,16,16]
        };

        let P = null;
        if(isFromRRC){
            if(N_BWP_size < 37) P = t38_214_5_1_2_2_1_1[rbgSize][0];
            else if(N_BWP_size < 73) P = t38_214_5_1_2_2_1_1[rbgSize][1];
            else if(N_BWP_size < 145) P = t38_214_5_1_2_2_1_1[rbgSize][2];
            else P = t38_214_5_1_2_2_1_1[rbgSize][3];
        }
        else P = rbgSize; //isFromBIP

        dciFieldLength = Math.ceil( (N_BWP_size + (N_BWP_start % P)) / P );
        if(resAllocType0Bitmap != null && resAllocType0Bitmap != undefined){
            dciFieldValue = resAllocType0Bitmap.toString(2).padStart(32,"0").substring(0,dciFieldLength);
        }
    }
    else if( resourceAllocation === "resourceAllocationType1"){ //Based on 5.1.2.2.2 of 38214 (Downlink resource allocation type 1)
        dciFieldLength = Math.ceil(Math.log2(N_BWP_size * (N_BWP_size + 1)/2));

        if(numOfPrb != null && numOfPrb != undefined && startPrb != null && startPrb != undefined){
            const L = numOfPrb;
            const RB_start = startPrb;

            if(L - 1 < Math.floor( N_BWP_size/2 )){
                dciFieldValue = (N_BWP_size * (L - 1) + RB_start).toString(2).padStart(dciFieldLength,"0");
            }
            else{
                dciFieldValue = ( N_BWP_size * (N_BWP_size - L + 1) + (N_BWP_size - 1 - RB_start) ).toString(2).padStart(dciFieldLength,"0");
            }
        }
    }
    else{ //dynamicSwitch
        console.log("Error: Dynamic switch is not yet supported");
        return [null,null];
    }

    return [dciFieldLength,dciFieldValue];
}

//Based on 7.3.1.1.2 of 38212 (Format 0_1)
function dci_0_1_getPrecodingInfoAndNumOfLayersFieldAndSize(transformPrecoder,maxRank,numAntennaPorts,codebookSubset,tpmi,rank){
    let dciFieldLength = -1;

    let precodingInformationTable = null;
    if(numAntennaPorts === 1){
        return [0,""];
    }
    if(numAntennaPorts === 2){
        if(transformPrecoder === 0 && maxRank === 2){
            precodingInformationTable = t38_212_7_3_1_1_2_4;
            dciFieldLength = codebookSubset == "nonCoherent" ? 2 : 4;
        }
        else if(transformPrecoder === 1 || (transformPrecoder === 0 && maxRank === 1)){
            precodingInformationTable = t38_212_7_3_1_1_2_5;
            dciFieldLength = codebookSubset == "nonCoherent" ? 1 : 3;
        }
    }
    else if(numAntennaPorts === 4){
        if(transPrec === 0 && maxRank > 1){
            precodingInformationTable = t38_212_7_3_1_1_2_2;
            dciFieldLength = codebookSubset == "nonCoherent" ? 4 : 6;
        }
        else{
            precodingInformationTable = t38_212_7_3_1_1_2_3;
            dciFieldLength = codebookSubset == "nonCoherent" ? 2 : 5;
        }
    }

    if(precodingInformationTable === null){ //Error
        console.log("Error: TransPrecTable is null",transformPrecoder,maxRank,numAntennaPorts);
        return [null,null];
    }

    let dciFieldValue = "";

    for(let row = 0; row < 2**dciFieldLength; row++){
        if(precodingInformationTable[row] && precodingInformationTable[row]["numOfLayers"] === rank &&
            precodingInformationTable[row]["tpmi"] === tpmi
        ){
            dciFieldValue = row.toString(2).padStart( dciFieldLength , "0");
            break;
        }
    }

    return [dciFieldLength,dciFieldValue];
}

//Based on 7.3.1.1.2 of 38212 (Format 0_1)
function dci_0_1_getAntennaPortsFieldAndSize(dmrsType,maxLength,numOfCdmGroupsWOData,dmrsPorts,rank,transformPrecoder){
    let antPortTable = null;
    if(dmrsType === 1){
        if(transformPrecoder === 1){
            antPortTable = maxLength === 1 ? t38_212_7_3_1_1_2_6 : t38_212_7_3_1_1_2_7;
        }
        else{
            if( maxLength === 1 && rank === 1) antPortTable = t38_212_7_3_1_1_2_8;
            else if( maxLength === 1 && rank === 2 ) antPortTable = t38_212_7_3_1_1_2_9;
            else if( maxLength === 1 && rank === 3 ) antPortTable = t38_212_7_3_1_1_2_10;
            else if( maxLength === 1 && rank === 4) antPortTable = t38_212_7_3_1_1_2_11;
            else if( maxLength === 2 && rank === 1) antPortTable = t38_212_7_3_1_1_2_12;
            else if( maxLength === 2 && rank === 2) antPortTable = t38_212_7_3_1_1_2_13;
            else if( maxLength === 2 && rank === 3) antPortTable = t38_212_7_3_1_1_2_14;
            else if( maxLength === 2 && rank === 4) antPortTable = t38_212_7_3_1_1_2_15;
        }
    }
    else{
        if( maxLength === 1 && rank === 1) antPortTable = t38_212_7_3_1_1_2_16;
        else if( maxLength === 1 && rank === 2 ) antPortTable = t38_212_7_3_1_1_2_17;
        else if( maxLength === 1 && rank === 3 ) antPortTable = t38_212_7_3_1_1_2_18;
        else if( maxLength === 1 && rank === 4) antPortTable = t38_212_7_3_1_1_2_19;
        else if( maxLength === 2 && rank === 1) antPortTable = t38_212_7_3_1_1_2_20;
        else if( maxLength === 2 && rank === 2) antPortTable = t38_212_7_3_1_1_2_21;
        else if( maxLength === 2 && rank === 3) antPortTable = t38_212_7_3_1_1_2_22;
        else if( maxLength === 2 && rank === 4) antPortTable = t38_212_7_3_1_1_2_23;
    }
    if(!antPortTable){
        console.log("Error, Cant find corresponding AntennaPorts table",dmrsType,maxLength,numOfCdmGroupsWOData,dmrsPorts,rank,transformPrecoder);
        return [null,null];
    } 

    const dciFieldLength = Math.ceil( Math.log2(antPortTable.length));
    let dciFieldValue = "";

    if(numOfCdmGroupsWOData != null && numOfCdmGroupsWOData != undefined && dmrsPorts != null && dmrsPorts != undefined){
        for(let row = 0; row < 2**dciFieldLength; row++){
            if(antPortTable[row] && antPortTable[row]["numOfCdmGroupsWOData"] === numOfCdmGroupsWOData &&
                JSON.stringify(antPortTable[row]["Ports"]) === JSON.stringify( dmrsPorts ) 
            ){
                    dciFieldValue = row.toString(2).padStart( dciFieldLength , "0");
                    break;
            }
        }
    }

    return [dciFieldLength,dciFieldValue];
}


//Based on 7.3.1.2.2 of 38212 (Format 1_1)
//Returns AntennaPorts field size and optionally the value of the field if last 2 arguments are provided
function dci_1_1_getAntennaPortsFieldAndSize(dmrsType,maxLength,numOfCdmGroupsWOData,dmrsPorts){
    let antPortTable = null;

    if( dmrsType === 1 && maxLength === 1) antPortTable = t38_212_7_3_1_2_2_1;
    else if( dmrsType === 1 && maxLength === 2) antPortTable = t38_212_7_3_1_2_2_2;
    else if( dmrsType === 2 && maxLength === 1) antPortTable = t38_212_7_3_1_2_2_3;
    else if( dmrsType === 2 && maxLength === 2) antPortTable = t38_212_7_3_1_2_2_4;
    if(!antPortTable) return [null,null];

    const dciFieldLength = Math.ceil( Math.log2(antPortTable.length));
    let dciFieldValue = "";

    if(numOfCdmGroupsWOData != null && numOfCdmGroupsWOData != undefined && dmrsPorts != null && dmrsPorts != undefined){
        for(let row = 0; row < 2**dciFieldLength; row++){
            if(antPortTable[row] && antPortTable[row]["numOfCdmGroupsWOData"] === numOfCdmGroupsWOData &&
                JSON.stringify(antPortTable[row]["Ports"]) === JSON.stringify( dmrsPorts )
            ){
                    dciFieldValue = row.toString(2).padStart( dciFieldLength , "0");
                    break;
            }
        }
    }

    return [dciFieldLength,dciFieldValue];
}


////////////////////DECODING FUNCTIONS BELOW//////////////////////////////

//Temporarily turned off
// function decode_DCI_onLoad(pkt){
//     if(config.load.l2l1_DCI_payload_decoding && pkt.l2l1.dciInfo && pkt.l2l1.dciInfo[0].dciPayload){
//         for(let i = 0; i < pkt.l2l1.dciInfo.length; i++){
//             try{
//                 // const slot = pkt.l2l1.slot, sfn = pkt.l2l1.sfn, subcell = pkt.l2l1.subcellId;

//                 const dciPayload = pkt.l2l1.dciInfo[i].dciPayload.map(val => val.toString(2).padStart(8,"0")).join("");
//                 pkt.l2l1.dciInfo[i].decodedPayload = decode_DCI(dciPayload, pkt.l2l1.dciInfo[i].rnti, pkt.l2l1.dciInfo[i].dciSize,pkt.l2l1.dciInfo[i].rachStatus);

//                 if(pkt.l2l1.dciInfo[i].decodedPayload && pkt.l2l1.dciInfo[i].decodedPayload.decodedSize){
//                     if(pkt.l2l1.dciInfo[i].decodedPayload.decodedSize !== pkt.l2l1.dciInfo[i].dciSize){
//                         add_packet_warning(pkt.id, `Configured DCI size (${pkt.l2l1.dciInfo[i].decodedPayload.decodedSize}) is different to dciSize field in packet (${pkt.l2l1.dciInfo[i].dciSize})`, "l2l1");
//                     }
//                     delete pkt.l2l1.dciInfo[i].decodedPayload.decodedSize;
//                 }
//                 else if(!pkt.l2l1.dciInfo[i].decodedPayload){
//                     add_packet_warning(pkt.id, "DCI decoding failed", "l2l1");
//                 }

//             } catch (e) {
//                 add_packet_malfunction(pkt.id, "Error while decoding DCI payload. " + e, "l2l1");
//             }

//         }
//     }
// }

function decode_DCI_clickedPacket(){
    const pkt = packets[clicked_packet];
    if(!pkt.l2l1 || !pkt.l2l1.dciInfo) return;

    const dciId = parseInt( dciInfo_select.value );
    try{
        const dciPayload = pkt.l2l1.dciInfo[dciId].dciPayload.map(val => val.toString(2).padStart(8,"0")).join("");
        const decoded = decode_DCI(dciPayload, pkt.l2l1.dciInfo[dciId].rnti , pkt.l2l1.dciInfo[dciId].dciSize);

        getElementById("decode_DCI_payload_decodedInfo").innerHTML = createInfoTable(decoded,'DCI').outerHTML;
    } catch (e) {
        add_packet_malfunction(pkt.id, "Error while decoding DCI payload. " + e, "l2l1");
        packetDetailsDialog_showPacketWithId(clicked_packet); //To refresh view so that warning or error appears
    }
}

function decode_DCI(bits,rnti,dciSize){
    let dciConfig = getDCIConfig();

    //Nokia restricts fallback dci formats to sizes 39 or 37.
    if( dciSize === 39 || dciSize === 37 ){
        const RA_RNTIs = config.cell.dci_RA_RNTIs.split(",").map(Number);
        const TC_RNTIs = config.cell.dci_TC_RNTIs.split(",").map(Number);

        if( rnti === 0xFFFF) return decode_DCI_1_0_SI_RNTI(bits,dciSize);
        else if( rnti === 0xFFFE) return decode_DCI_1_0_P_RNTI(bits,dciSize);
        else if( RA_RNTIs.includes(rnti) ) return decode_DCI_1_0_RA_RNTI(bits,rnti,dciSize); //RAR PDSCH Scheduling
        else if( TC_RNTIs.includes(rnti) ) return decode_DCI_1_0_C_RNTI_or_TC_RNTI(bits,rnti,true,dciSize); //Msg4 scheduling
        else if(bits[0] === "1"){ //DL DCI Format
            return decode_DCI_1_0_C_RNTI_or_TC_RNTI(bits,rnti,false,dciSize);
        }
        else{
            return decode_DCI_0_0_C_RNTI(bits,rnti,dciSize);
        }
    }
    else{
        if(bits[0] === "1"){
            return decode_DCI_1_1(bits,rnti,dciSize,dciConfig);
        }
        else{
            return decode_DCI_0_1(bits,rnti,dciSize,dciConfig);
        }
    }
}

function decode_DCI_0_0_C_RNTI(payload,rnti,dciSize){
    let offset = 0;
    let decoded_dci = {"rnti" : rnti, "format" : "0_0"};

    [decoded_dci["idForDCI"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciSize - 28);
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);
    [decoded_dci["FreqHoppingFlag"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["NewDataIndicator"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["RedundancyVersion"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["HARQ_ProcessNumber"],offset] = parseStringBitsToVal(payload,offset,4);
    [decoded_dci["TPC_CmdForPUSCH"],offset] = parseStringBitsToVal(payload,offset,2);

    decoded_dci.decodedSize = offset;
    return decoded_dci;
}

function decode_DCI_1_0_SI_RNTI(payload,dciSize){
    let offset = 0;
    let decoded_dci = {"rnti" : 0xFFFF, "format" : "1_0_SI_RNTI"};

    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciSize - 28);
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);
    [decoded_dci["VRB_to_PRB"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["RedundancyVersion"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["SystemInformationIndicator"],offset] = getStringBits(payload,offset,1);
    [decoded_dci["Reserved"],offset] = getStringBits(payload,offset,15); //In Nokia there is no SystemInformationIndicator

    decoded_dci.decodedSize = offset;
    return decoded_dci;
}

function decode_DCI_1_0_P_RNTI(payload,dciSize){
    let offset = 0;
    let decoded_dci = {"rnti" : 0xFFFE, "format" : "1_0_P_RNTI"};

    [decoded_dci["ShortMsgIndicator"],offset] = parseStringBitsToVal(payload,offset,2);
    [decoded_dci["ShortMessages"],offset] = parseStringBitsToVal(payload,offset,8);
    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciSize - 28);
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);
    [decoded_dci["VRB_to_PRB"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["TB_Scaling"],offset] = parseStringBitsToVal(payload,offset,2);
    [decoded_dci["Reserved"],offset] = getStringBits(payload,offset,6);

    decoded_dci.decodedSize = offset;
    return decoded_dci;
}

function decode_DCI_1_0_RA_RNTI(payload,rnti,dciSize){
    let offset = 0;
    let decoded_dci = {"rnti" : rnti, "format" : "1_0_RA_RNTI"};

    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciSize - 28 );
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);
    [decoded_dci["VRB_to_PRB"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["TB_Scaling"],offset] = parseStringBitsToVal(payload,offset,2);
    [decoded_dci["Reserved"],offset] = getStringBits(payload,offset,16);

    decoded_dci.decodedSize = offset;
    return decoded_dci;
}

function decode_DCI_1_0_C_RNTI_or_TC_RNTI(payload,rnti,isTCrnti,dciSize){
    let offset = 0;
    const formatString = isTCrnti ? "1_0_TC_RNTI" : "1_0_C_RNTI"
    let decoded_dci = {"rnti" : rnti, "format" : formatString};

    [decoded_dci["idForDCI"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciSize - 28 );
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);
    [decoded_dci["VRB_to_PRB"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["NewDataIndicator"],offset] = parseStringBitsToVal(payload,offset,1);
    [decoded_dci["RedundancyVersion"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["HARQ_ProcessNumber"],offset] = parseStringBitsToVal(payload,offset,4);
    [decoded_dci["DL_AssignmentIndex"],offset] = parseStringBitsToVal(payload,offset,2);
    [decoded_dci["TPC_CmdForPUSCH"],offset] = parseStringBitsToVal(payload,offset,2);
    [decoded_dci["PUCCH_ResourceIndicator"],offset] = parseStringBitsToVal(payload,offset,3);
    [decoded_dci["PDSCH_to_HARQ_FeedbackTimingIndicator"],offset] = parseStringBitsToVal(payload,offset,3);

    decoded_dci.decodedSize = offset;

    return decoded_dci;
}

function decode_DCI_0_1(payload,rnti,dciSize,dciConfig){
    let offset = 0;
    let decoded_dci = {"rnti" : rnti, "format" : "0_1"};

    [decoded_dci["idForDCI"],offset] = getStringBits(payload,offset,1);
    [decoded_dci["BWP_Indicator"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_BWP_Indicator"]);
    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciConfig["dci_0_1_sizeof_FD_ResAssignment"] );
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset, dciConfig["dci_0_1_sizeof_TD_ResAssignment"]);
    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["NewDataIndicator"],offset] = getStringBits(payload,offset,1);
    [decoded_dci["RedundancyVersion"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["HARQ_ProcessNumber"],offset] = parseStringBitsToVal(payload,offset,4);
    [decoded_dci["1st_DL_AssignmentIndex"],offset] = getStringBits(payload,offset,2); //const for UL, variable for DL
    [decoded_dci["TPC_CmdForPUSCH"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["PrecodingInfoAndNumOfLayers"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_PrecodingInfoAndNumOfLayers"]);
    [decoded_dci["AntennaPorts"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_AntennaPorts"]);
    [decoded_dci["SrsRequest"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["CsiRequest"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_CsiRequest"]);
    [decoded_dci["PTRS_DMRS_Association"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_PTRS_DMRS_Association"]);
    [decoded_dci["BetaOffsetIndicator"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_BetaOffsetIndicator"]);
    [decoded_dci["DMRS_SequenceInit"],offset] = parseStringBitsToVal(payload,offset,dciConfig["dci_0_1_sizeof_DmrsSequenceInit"]);
    [decoded_dci["UL_SCH_Indicator"],offset] = getStringBits(payload,offset,dciConfig["dci_0_1_sizeof_UL_SCH_indicator"]);

    decoded_dci.decodedSize = offset;

    if(offset !== dciSize){
        throw(`Error: Combined size of fields in CONFIGURE panel for DCI format 0_1 (${offset}) doesn't match this DCIs size: ${dciSize} `);
    }

    return decoded_dci;
}

function decode_DCI_1_1(payload,rnti,dciSize,dciConfig){
    let offset = 0;
    let decoded_dci = {"rnti" : rnti, "format" : "1_1"};

    [decoded_dci["idForDCI"],offset] = getStringBits(payload,offset,1);
    [decoded_dci["BWP_Indicator"],offset] = getStringBits(payload,offset,dciConfig["dci_1_1_sizeof_BWP_Indicator"]); //0-2
    [decoded_dci["FreqDomainResAssignment"],offset] = getStringBits(payload,offset, dciConfig["dci_1_1_sizeof_FD_ResAssignment"]);
    [decoded_dci["TimeDomainResAssignment"],offset] = getStringBits(payload,offset,4);

    [decoded_dci["Mcs"],offset] = parseStringBitsToVal(payload,offset,5);
    [decoded_dci["NewDataIndicator"],offset] = getStringBits(payload,offset,1);
    [decoded_dci["RedundancyVersion"],offset] = getStringBits(payload,offset,2);

    [decoded_dci["HARQ_ProcessNumber"],offset] = parseStringBitsToVal(payload,offset,4);
    [decoded_dci["DL_AssignmentIndex"],offset] = getStringBits(payload,offset, dciConfig["dci_1_1_sizeof_DAI"]); //2 or 4
    [decoded_dci["TPC_CmdForPUCCH"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["PUCCH_ResourceIndicator"],offset] = getStringBits(payload,offset,3);
    [decoded_dci["PDSCH_to_HARQ_FeedbackTimingIndicator"],offset] = getStringBits(payload,offset,3);
    [decoded_dci["AntennaPorts"],offset] = getStringBits(payload,offset, dciConfig["dci_1_1_sizeof_AntennaPorts"]); //4 or 5
    [decoded_dci["SRS_Request"],offset] = getStringBits(payload,offset,2);
    [decoded_dci["DMRS_SequenceInit"],offset] = parseStringBitsToVal(payload,offset,1);

    decoded_dci.decodedSize = offset;

    if(offset !== dciSize){
        throw(`Error: Combined size of fields in CONFIGURE panel for DCI format 0_1 (${offset}) doesn't match this DCIs size: ${dciSize} `);
    }

    return decoded_dci;
}

////////////////////AUTODETECTION FUNCTIONS BELOW//////////////////////////////

function dci_autodetect_from_RRC(message){
    const rrcSetup = message.c1.rrcSetup.criticalExtensions.rrcSetup;
    const spCellConfigDedicated = rrcSetup.masterCellGroup.spCellConfig.spCellConfigDedicated;

    //DL
    const n_BWP_RRC_DL = spCellConfigDedicated["downlinkBWP-ToAddModList"].length;
    const downlinkBWP = spCellConfigDedicated["downlinkBWP-ToAddModList"][0]; //TODO: which?
    const pdschConfig = downlinkBWP["bwp-Dedicated"]["pdsch-Config"];

    const n_BWP_DL = n_BWP_RRC_DL <= 3 ? n_BWP_RRC_DL + 1 : n_BWP_RRC_DL;
    config.cell.dci_1_1_sizeof_BWP_Indicator = Math.ceil(Math.log2(n_BWP_DL));

    const RIV_DL = downlinkBWP["bwp-Common"]["genericParameters"]["locationAndBandwidth"];
    const [startPrb_BWP_DL,numPrb_BWP_DL] = dci_parseFreqDomainResAssignment(RIV_DL,275);

    const pdschRbgSizeEnum = pdschConfig["rbg-Size"];
    const pdschRbgSize = pdschRbgSizeEnum != undefined ? Number(pdschRbgSizeEnum.slice(-1)) : null;
    [config.cell.dci_1_1_sizeof_FD_ResAssignment,_] = dci_getFreqDomainResAssignmentFieldAndSize(pdschConfig["resourceAllocation"],null,null,numPrb_BWP_DL,startPrb_BWP_DL,pdschRbgSize,null,true);

    config.cell.dci_1_1_sizeof_DAI = 2; //?

    const pdschDmrsConfig = pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeA"] != undefined ? pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeA"] : pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeB"];
    const pdschDmrsType = pdschDmrsConfig["dmrs-Type"] !== undefined ? 2 : 1;
    const pdschDmrsMaxLength = pdschDmrsConfig["MaxLength"] !== undefined ? 2 : 1;
    [config.cell.dci_1_1_sizeof_AntennaPorts,_] = dci_1_1_getAntennaPortsFieldAndSize(pdschDmrsType,pdschDmrsMaxLength,null,null);

    //UL
    const n_BWP_RRC_UL = spCellConfigDedicated["uplinkConfig"]["uplinkBWP-ToAddModList"].length;
    const uplinkBWP = spCellConfigDedicated["uplinkConfig"]["uplinkBWP-ToAddModList"][0];
    const srsConfig = uplinkBWP["bwp-Dedicated"]["srs-Config"];
    const nrofSRSPortsEnum = srsConfig["srs-ResourceToAddModList"][0]["nrofSRS-Ports"];
    const nrofSRSPorts = Number(nrofSRSPortsEnum.slice(-1));
    const puschConfig = uplinkBWP["bwp-Dedicated"]["pusch-Config"];

    const n_BWP_UL = n_BWP_RRC_UL <= 3 ? n_BWP_RRC_UL + 1 : n_BWP_RRC_UL;
    config.cell.dci_0_1_sizeof_BWP_Indicator = Math.ceil(Math.log2(n_BWP_UL));

    const RIV_UL = uplinkBWP["bwp-Common"]["genericParameters"]["locationAndBandwidth"];
    const [startPrb_BWP_UL,numPrb_BWP_UL] = dci_parseFreqDomainResAssignment(RIV_UL,275);

    const puschRbgSize = puschConfig["rbg-Size"] === "config2" ? 2 : 1;
    [config.cell.dci_0_1_sizeof_FD_ResAssignment,_] = dci_getFreqDomainResAssignmentFieldAndSize(puschConfig["resourceAllocation"],null,null,numPrb_BWP_UL,startPrb_BWP_UL,puschRbgSize,null,true);

    config.cell.dci_0_1_sizeof_TD_ResAssignment = Math.ceil(Math.log2(puschConfig["pusch-TimeDomainAllocationList"].length));

    const transformPrecoder = puschConfig["transformPrecoder"] === "disabled" ? 0 : 1;
    const maxRank = puschConfig["maxRank"];
    const codebookSubset = puschConfig["codebookSubset"];
    const numOfAntennaPorts = nrofSRSPorts;
    [config.cell.dci_0_1_sizeof_PrecodingInfoAndNumOfLayers,_] = dci_0_1_getPrecodingInfoAndNumOfLayersFieldAndSize(transformPrecoder,maxRank,numOfAntennaPorts,codebookSubset,null,null);

    const puschDmrsConfig = pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeA"] != undefined ? pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeA"] : pdschConfig["dmrs-DownlinkForPDSCH_MappingTypeB"];
    const puschDmrsType = puschDmrsConfig["dmrs-Type"] !== undefined ? 2 : 1;
    const puschDmrsMaxLength = puschDmrsConfig["MaxLength"] !== undefined ? 2 : 1;
    const rank = maxRank; //This is not a problem as fieldSize is independent from rank.
    [config.cell.dci_0_1_sizeof_AntennaPorts,_] = dci_0_1_getAntennaPortsFieldAndSize(puschDmrsType,puschDmrsMaxLength,null,null,rank,transformPrecoder);

    const csi_MeasConfig = spCellConfigDedicated["csi-MeasConfig"];
    config.cell.dci_0_1_sizeof_CsiRequest = csi_MeasConfig && csi_MeasConfig["reportTriggerSize"] != undefined ? csi_MeasConfig["reportTriggerSize"] : 0;

    const dmrsUplinkConfig = puschConfig["dmrs-UplinkForPUSCH-MappingTypeA"] != undefined ? puschConfig["dmrs-UplinkForPUSCH-MappingTypeA"] : puschConfig["dmrs-UplinkForPUSCH-MappingTypeB"];
    const ptrsUplinkConfig = dmrsUplinkConfig["phaseTrackingRS"];
    config.cell.dci_0_1_sizeof_PTRS_DMRS_Association = (!ptrsUplinkConfig && !transformPrecoder) || (transformPrecoder && maxRank == 1) ? 0 : 2;

    const betaOffsets = puschConfig["uci-OnPUSCH"]["betaOffsets"]["semiStatic"] != undefined ? "semiStatic" : "dynamic";
    config.cell.dci_0_1_sizeof_BetaOffsetIndicator = betaOffsets == "semiStatic" ? 0 : 2;

    config.cell.dci_0_1_sizeof_DmrsSequenceInit = transformPrecoder ? 0 : 1;

    config.cell.dci_0_1_sizeof_UL_SCH_indicator = 1;

    configDialog.setToUI();
    configDialog_set_DCI_field_sizes();
}

function dci_autodetect_from_L2L1(){
    configDialog.getFromUI();
    const subcell = config.cell.dci_subcell;

    let total_fallbackDCIs = 0;
    let RA_RNTIs = [], TC_RNTIs = [];
    let total_0_1_DCIs = 0; numDecoded_0_1_DCIs = 0, config_0_1 = null;
    let total_1_1_DCIs = 0; numDecoded_1_1_DCIs = 0, config_1_1 = null;

    count_not_found_1_1 = 0; count_not_found_0_1 = 0; count_cant_decode_1_1 = 0; count_cant_decode_0_1 = 0;

    for(let packetId = 0; packetId < packetsLength; packetId++){
        const pkt = packets[packetId];
        if(!pkt.l2l1 || !pkt.l2l1.dciInfo || !pkt.l2l1.dciInfo[0].dciPayload) continue;

        for(let i = 0; i < pkt.l2l1.dciInfo.length; i++){
            const l2l1_slot = pkt.l2l1.slot, sfn = pkt.l2l1.sfn;
            if(subcell != pkt.l2l1.subcellId) continue;

            const bits = pkt.l2l1.dciInfo[i].dciPayload.map(val => val.toString(2).padStart(8,"0")).join("");
            const dciSize = pkt.l2l1.dciInfo[i].dciSize;
            const rnti = pkt.l2l1.dciInfo[i].rnti;
            const rachStatus = pkt.l2l1.dciInfo[i].rachStatus;

            if([37,39].includes(dciSize)){ //Fallback format (1_0 || 0_0)
                total_fallbackDCIs+=1;
                if(rachStatus == 2 && !RA_RNTIs.includes(rnti)) RA_RNTIs.push(rnti);
                else if(rachStatus == 4 && !TC_RNTIs.includes(rnti)) TC_RNTIs.push(rnti);
                continue; //Doesn't need any autodetection
            }
            else{
                if(bits[0] == "0"){
                    total_0_1_DCIs+=1;
                    const config_0_1_tmp = dci_autodetect_sizeof_DCI_0_1_fields(bits,rnti,dciSize,subcell, sfn,l2l1_slot);
                    if(config_0_1_tmp){
                        numDecoded_0_1_DCIs+=1;
                        config_0_1 = config_0_1_tmp;
                    }
                }
                else{
                    total_1_1_DCIs+=1;
                    const config_1_1_tmp = dci_autodetect_sizeof_DCI_1_1_fields(bits,rnti,dciSize,subcell, sfn,l2l1_slot);
                    if(config_1_1_tmp){
                        numDecoded_1_1_DCIs+=1;
                        config_1_1 = config_1_1_tmp;
                    }
                }
            }
        }
    }

    if(total_fallbackDCIs > 0){
        config.cell.dci_RA_RNTIs = RA_RNTIs.join(",");
        config.cell.dci_TC_RNTIs = TC_RNTIs.join(",");
    }
    else{
        config.cell.dci_RA_RNTIs = "";
        config.cell.dci_TC_RNTIs = "";
    }

    if(config_0_1){
        for(const key in config_0_1){
            config.cell[key] = config_0_1[key];
        }
    }
    else{
        for(const key in config.cell){
            if(key.includes("dci_0_1_sizeof")) config.cell[key] = -1;
        }
    }

    if(config_1_1){
        for(const key in config_1_1){
            config.cell[key] = config_1_1[key];
        }
    }
    else{
        for(const key in config.cell){
            if(key.includes("dci_1_1_sizeof")) config.cell[key] = -1;
        }
    }

    // console.log(`0_1: ${numDecoded_0_1_DCIs}/${total_0_1_DCIs}`);
    // console.log("count_not_found_0_1 -> ",count_not_found_0_1);
    // console.log("count_cant_decode_0_1 -> ",count_cant_decode_0_1);
    // console.log(`1_1: ${numDecoded_1_1_DCIs}/${total_1_1_DCIs}`);
    // console.log("count_not_found_1_1 -> ",count_not_found_1_1);
    // console.log("count_cant_decode_1_1 -> ",count_cant_decode_1_1);


    configDialog.setToUI();
    configDialog_set_DCI_field_sizes();
}

let count_not_found_0_1 = 0;
let count_cant_decode_0_1 = 0;
let count_not_found_1_1 = 0;
let count_cant_decode_1_1 = 0;

function dci_autodetect_sizeof_DCI_0_1_fields(bits,rnti,actualDciSize,subcell,sfn,l2l1_slot){
    if(nr_l2l1_packets === null) nr_init_L2L1_interface();
    const PUSCH = 15;

    let found_PUSCH = false;
    for(let i = 0; i < 7; i++){ //Searches for PUSCH scheduled by this dci
        const new_temp_slot = l2l1_slot + i;
        const new_slot = new_temp_slot % (10 * 2**(nr_l2l1_packets_u)); //slot within frame !
        const new_sfn = sfn + Math.floor( new_temp_slot/(10 * 2**(nr_l2l1_packets_u) ));

        const params_arr_PUSCH = pusch_GetParametersArr(null,null,null,null,PUSCH,nr_l2l1_packets,subcell,new_sfn,new_slot);
        if(!params_arr_PUSCH) continue;
        const params_PUSCH = nr_GetParametersFromParametersArr(params_arr_PUSCH,null,null,rnti);
        if(!params_PUSCH){
            continue;
        }
        else found_PUSCH = true;

        let dciConfig = {};
        dciConfig["dci_0_1_sizeof_FD_ResAssignment"] = params_PUSCH["dciField_freqDomainResAssignment"].length; //assuming resourceAllocType1
        dciConfig["dci_0_1_sizeof_PrecodingInfoAndNumOfLayers"] = params_PUSCH["dciField_PrecInfoAndNumOfLayers"].length;
        dciConfig["dci_0_1_sizeof_AntennaPorts"] = params_PUSCH["dciField_AntennaPorts"].length;
        dciConfig["dci_0_1_sizeof_PTRS_DMRS_Association"] = (!params_PUSCH["ptrs_present"] && !params_PUSCH["transformPrecoding"]) || params_PUSCH["transformPrecoding"] || params_PUSCH["rank"] === 1 ? 0 : 2;
        dciConfig["dci_0_1_sizeof_DmrsSequenceInit"] = params_PUSCH["transformPrecoding"] === 1 ? 0 : 1; //OK
        dciConfig["dci_0_1_sizeof_CsiRequest"] = params_PUSCH["csiReportStruct"].length === 0 ? 0 : 1; //L2 param ,reportTriggerSize'

        for(let sizeof_UL_SCH_indicator of [1,0]) {
            dciConfig["dci_0_1_sizeof_UL_SCH_indicator"] = sizeof_UL_SCH_indicator;

            for (let sizeof_BWP_Indicator of [0,1,2]) {
                dciConfig["dci_0_1_sizeof_BWP_Indicator"] = sizeof_BWP_Indicator;

                for (let sizeof_TD_ResAssignment of [4,2,3]) { //first searches the option from gates
                    dciConfig["dci_0_1_sizeof_TD_ResAssignment"] = sizeof_TD_ResAssignment;

                    for (let sizeof_BetaOffsetIndicator of [0,2]) {
                        dciConfig["dci_0_1_sizeof_BetaOffsetIndicator"] = sizeof_BetaOffsetIndicator;

                        const currentDciSize = dciConfig["dci_0_1_sizeof_BWP_Indicator"] + dciConfig["dci_0_1_sizeof_FD_ResAssignment"] + dciConfig["dci_0_1_sizeof_TD_ResAssignment"] +
                            dciConfig["dci_0_1_sizeof_PrecodingInfoAndNumOfLayers"] + dciConfig["dci_0_1_sizeof_AntennaPorts"] + dciConfig["dci_0_1_sizeof_CsiRequest"] +
                            dciConfig["dci_0_1_sizeof_PTRS_DMRS_Association"] + dciConfig["dci_0_1_sizeof_BetaOffsetIndicator"] + dciConfig["dci_0_1_sizeof_DmrsSequenceInit"] +
                            dciConfig["dci_0_1_sizeof_UL_SCH_indicator"] + 19;
                        if (currentDciSize !== actualDciSize){
                            // if( subcell == 1 && sfn == 934 && l2l1_slot == 3 ){
                            //     console.log(currentDciSize,actualDciSize);
                            //     console.log("dci_0_1_sizeof_AntennaPorts",params_PUSCH["dciField_AntennaPorts"].length);
                            //     console.log("dci_0_1_sizeof_PrecodingInfoAndNumOfLayers",params_PUSCH["dciField_PrecInfoAndNumOfLayers"].length);
                            // }
                            continue;
                        }

                        const decoded_dci = decode_DCI_0_1(bits, rnti,actualDciSize, dciConfig);

                        if (decoded_dci !== null &&
                            decoded_dci["FreqDomainResAssignment"] === params_PUSCH["dciField_freqDomainResAssignment"] &&
                            decoded_dci["Mcs"] === params_PUSCH["Mcs"] &&
                            decoded_dci["RedundancyVersion"] === params_PUSCH["RedundancyVersion"] &&
                            decoded_dci["HARQ_ProcessNumber"] === params_PUSCH["HarqProcessNr"] &&
                            decoded_dci["PrecodingInfoAndNumOfLayers"] === params_PUSCH["dciField_PrecInfoAndNumOfLayers"] &&
                            decoded_dci["AntennaPorts"] === params_PUSCH["dciField_AntennaPorts"] &&
                            (decoded_dci["DMRS_SequenceInit"] === -1 || decoded_dci["DMRS_SequenceInit"] == params_PUSCH["n_scid"])
                        ) {
                            return dciConfig;
                        }
                    }
                }
            }
        }
    }

    if(!found_PUSCH) count_not_found_0_1+=1;
    count_cant_decode_0_1+=1;

    return null;
}

function dci_autodetect_sizeof_DCI_1_1_fields(bits,rnti,actualDciSize,subcell,sfn,l2l1_slot){
    if(nr_l2l1_packets === null) nr_init_L2L1_interface(); //loads l2l1 packets to global variable
    const PDSCH = 3;

    let found_PDSCH = false;
    for(let i = 0; i < 4; i++){ //Searches for PDSCH scheduled by this dci up to 3 slots ahead
        let new_temp_slot = l2l1_slot + i;
        const new_slot = new_temp_slot % (10 * 2**(nr_l2l1_packets_u)); //slot within frame !
        const new_sfn = sfn + Math.floor( new_temp_slot/(10 * 2**(nr_l2l1_packets_u) ));

        const params_arr_PDSCH = pdsch_GetParametersArr(null,null,null,null,PDSCH,nr_l2l1_packets,subcell,new_sfn,new_slot);
        if(!params_arr_PDSCH) continue;
        const params_PDSCH = nr_GetParametersFromParametersArr(params_arr_PDSCH,null,null,rnti);
        if(!params_PDSCH){
            continue;
        }
        else found_PDSCH = true;

        let dciConfig = {};
        dciConfig["dci_1_1_sizeof_FD_ResAssignment"] = params_PDSCH["dciField_freqDomainResAssignment"].length //resAllocType0 or resAllocType1 is used for PDSCH.
        dciConfig["dci_1_1_sizeof_AntennaPorts"] = params_PDSCH["dciField_AntennaPorts"].length;

        for(let sizeof_BWP_Indicator of [1,0,2]){
            dciConfig["dci_1_1_sizeof_BWP_Indicator"] = sizeof_BWP_Indicator;

            for(let sizeof_DAI of [2,4]){
                dciConfig["dci_1_1_sizeof_DAI"] = sizeof_DAI;

                const currentDciSize = dciConfig["dci_1_1_sizeof_BWP_Indicator"] + dciConfig["dci_1_1_sizeof_FD_ResAssignment"] +
                    + dciConfig["dci_1_1_sizeof_DAI"] + dciConfig["dci_1_1_sizeof_AntennaPorts"] + 28;
                if(currentDciSize !== actualDciSize){
                    if( subcell == 0 && sfn == 501 && l2l1_slot == 17 ) console.log(currentDciSize,actualDciSize);
                    continue;
                }

                const decoded_dci = decode_DCI_1_1(bits,rnti,actualDciSize,dciConfig);

                if(decoded_dci !== null &&
                    decoded_dci["Mcs"] === params_PDSCH["Mcs"] &&
                    decoded_dci["RedundancyVersion"] === params_PDSCH["RedundancyVersion"] &&
                    decoded_dci["AntennaPorts"] === params_PDSCH["dciField_AntennaPorts"] &&
                    decoded_dci["DMRS_SequenceInit"] === params_PDSCH["n_scid"] &&
                    decoded_dci["FreqDomainResAssignment"] === params_PDSCH["dciField_freqDomainResAssignment"]
                ){
                    return dciConfig;
                }
            }
        }
    }

    if(!found_PDSCH) count_not_found_1_1+=1;
    count_cant_decode_1_1+=1;
    return null;
}

function getDCIConfig(){
    return {
        dci_1_1_sizeof_BWP_Indicator : config.cell.dci_1_1_sizeof_BWP_Indicator,
        dci_1_1_sizeof_FD_ResAssignment : config.cell.dci_1_1_sizeof_FD_ResAssignment,
        dci_1_1_sizeof_DAI : config.cell.dci_1_1_sizeof_DAI,
        dci_1_1_sizeof_AntennaPorts : config.cell.dci_1_1_sizeof_AntennaPorts,

        dci_0_1_sizeof_BWP_Indicator : config.cell.dci_0_1_sizeof_BWP_Indicator,
        dci_0_1_sizeof_FD_ResAssignment : config.cell.dci_0_1_sizeof_FD_ResAssignment,
        dci_0_1_sizeof_TD_ResAssignment : config.cell.dci_0_1_sizeof_TD_ResAssignment,
        dci_0_1_sizeof_AntennaPorts : config.cell.dci_0_1_sizeof_AntennaPorts,
        dci_0_1_sizeof_PrecodingInfoAndNumOfLayers : config.cell.dci_0_1_sizeof_PrecodingInfoAndNumOfLayers,
        dci_0_1_sizeof_CsiRequest : config.cell.dci_0_1_sizeof_CsiRequest,
        dci_0_1_sizeof_PTRS_DMRS_Association : config.cell.dci_0_1_sizeof_PTRS_DMRS_Association,
        dci_0_1_sizeof_BetaOffsetIndicator : config.cell.dci_0_1_sizeof_BetaOffsetIndicator,
        dci_0_1_sizeof_DmrsSequenceInit : config.cell.dci_0_1_sizeof_DmrsSequenceInit,
        dci_0_1_sizeof_UL_SCH_indicator : config.cell.dci_0_1_sizeof_UL_SCH_indicator
    }
}