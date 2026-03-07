const nr_pbchConfig = {
    'A': { 'u': 0, 'indexes': [ 2, 8, 16, 22, 30, 36, 44, 50 ] },
    'B': { 'u': 1, 'indexes': [ 4, 8, 16, 20, 32, 36, 44, 48 ] },
    'C': { 'u': 1, 'indexes': [ 2, 8, 16, 22, 30, 36, 44, 50 ] },
    'D': { 'u': 3, 'indexes': [ 4, 8, 16, 20, 32, 36, 44, 48, 60, 64, 72, 76, 88, 92, 100, 104, 116, 120, 128, 132, 144, 148, 156, 160, 172, 176, 184, 188, 200, 204, 212, 216, 228, 232, 240, 244, 256, 260, 268, 272, 284, 288, 296, 300, 312, 316, 324, 328, 340, 344, 352, 356, 368, 372, 380, 384, 396, 400, 408, 412, 424, 428, 436, 440, 452, 456, 464, 468, 480, 484, 492, 496, 508, 512, 520, 524 ] },
    'E': { 'u': 4, 'indexes': [ 8, 12, 16, 20, 32, 36, 40, 44, 64, 68, 72, 76, 88, 92, 96, 100, 120, 124, 128, 132, 144, 148, 152, 156, 176, 180, 184, 188, 200, 204, 208, 212, 232, 236, 240, 244, 256, 260, 264, 268, 288, 292, 296, 300, 312, 316, 320, 324, 344, 348, 352, 356, 368, 372, 376, 380, 400, 404, 408, 412, 424, 428, 432, 436, 456, 460, 464, 468, 480, 484, 488, 492 ] },
    'F': { 'u': 5, 'indexes': [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107 , 114, 121 , 128, 135 , 142, 149 , 156, 163 , 170, 177 , 184, 191, 198, 205, 212, 219, 226, 233, 240, 247 ,254, 261, 268, 275, 282, 289, 296, 303, 310, 317 ,324, 331, 338, 345, 352, 359, 366, 373, 380, 387 ,394, 401, 408, 415, 422, 429, 436, 443 ]}
};

const nr_allowedPbchCases = { //numerology -> pbch case
    0 : ['A'],
    1 : ['B','C'],
    3 : ['D'],
    4 : ['E'],
    5 : ['F']
};

const t38_211_6_3_3_1_5 ={ //Ncs for preamble formats with Df ^RA = 1.25kHz
    "unrestricted": [0,13,15,18,22,26,32,38,46,59,76,93,119,167,279,419]
};

const t38_211_6_3_3_1_6 ={ //Ncs for preamble formats with Df ^RA = 5kHz
    "unrestricted": [0,13,26,33,38,41,49,55,64,76,93,119,139,209,279,419]
};

const t38_211_6_3_3_1_7 ={ //Ncs for preamble formats with Df ^RA = 15*2^u kHz where u=0..3
    "unrestricted": [ 0,2,4,6,8,10,12,13,15,17,19,23,27,34,46,69 ]
};

const t38_211_6_3_3_1_3 =[ //Mapping from logical index i to sequence number u for preamble formats with Lra=839
    129,710,140,699,120,719,210,629,168,671,84,755,105,734,93,746,70,769,60,779,
    2,837,1,838,56,783,112,727,148,691,80,759,42,797,40,799,35,804,73,766,
    146,693,31,808,28,811,30,809,27,812,29,810,24,815,48,791,68,771,74,765,
    178,661,136,703,86,753,78,761,43,796,39,800,20,819,21,818,95,744,202,637,
    190,649,181,658,137,702,125,714,151,688,217,622,128,711,142,697,122,717,203,636,
    118,721,110,729,89,750,103,736,61,778,55,784,15,824,14,825,12,827,23,816,
    34,805,37,802,46,793,207,632,179,660,145,694,130,709,223,616,228,611,227,612,
    132,707,133,706,143,696,135,704,161,678,201,638,173,666,106,733,83,756,91,748,
    66,773,53,786,10,829,9,830,7,832,8,831,16,823,47,792,64,775,57,782,
    104,735,101,738,108,731,208,631,184,655,197,642,191,648,121,718,141,698,149,690,
    216,623,218,621,152,687,144,695,134,705,138,701,199,640,162,677,176,663,119,720,
    158,681,164,675,174,665,171,668,170,669,87,752,169,670,88,751,107,732,81,758,
    82,757,100,739,98,741,71,768,59,780,65,774,50,789,49,790,26,813,17,822,
    13,826,6,833,5,834,33,806,51,788,75,764,99,740,96,743,97,742,166,673,
    172,667,175,664,187,652,163,676,185,654,200,639,114,725,189,650,115,724,194,645,
    195,644,192,647,182,657,157,682,156,683,211,628,154,685,123,716,139,700,212,627,
    153,686,213,626,215,624,150,689,225,614,224,615,221,618,220,619,127,712,147,692,
    124,715,193,646,205,634,206,633,116,723,160,679,186,653,167,672,79,760,85,754,
    77,762,92,747,58,781,62,777,69,770,54,785,36,803,32,807,25,814,18,821,
    11,828,4,835,3,836,19,820,22,817,41,798,38,801,44,795,52,787,45,794,
    63,776,67,772,72,767,76,763,94,745,102,737,90,749,109,730,165,674,111,728,
    209,630,204,635,117,722,188,651,159,680,198,641,113,726,183,656,180,659,177,662,
    196,643,155,684,214,625,126,713,131,708,219,620,222,617,226,613,230,609,232,607,
    262,577,252,587,418,421,416,423,413,426,411,428,376,463,395,444,283,556,285,554,
    379,460,390,449,363,476,384,455,388,451,386,453,361,478,387,452,360,479,310,529,
    354,485,328,511,315,524,337,502,349,490,335,504,324,515,323,516,320,519,334,505,
    359,480,295,544,385,454,292,547,291,548,381,458,399,440,380,459,397,442,369,470,
    377,462,410,429,407,432,281,558,414,425,247,592,277,562,271,568,272,567,264,575,
    259,580,237,602,239,600,244,595,243,596,275,564,278,561,250,589,246,593,417,422,
    248,591,394,445,393,446,370,469,365,474,300,539,299,540,364,475,362,477,298,541,
    312,527,313,526,314,525,353,486,352,487,343,496,327,512,350,489,326,513,319,520,
    332,507,333,506,348,491,347,492,322,517,330,509,338,501,341,498,340,499,342,497,
    301,538,366,473,401,438,371,468,408,431,375,464,249,590,269,570,238,601,234,605,
    257,582,273,566,255,584,254,585,245,594,251,588,412,427,372,467,282,557,403,436,
    396,443,392,447,391,448,382,457,389,450,294,545,297,542,311,528,344,495,345,494,
    318,521,331,508,325,514,321,518,346,493,339,500,351,488,306,533,289,550,400,439,
    378,461,374,465,415,424,270,569,241,598,231,608,260,579,268,571,276,563,409,430,
    398,441,290,549,304,535,308,531,358,481,316,523,293,546,288,551,284,555,368,471,
    253,586,256,583,263,576,242,597,274,565,402,437,383,456,357,482,329,510,317,522,
    307,532,286,553,287,552,266,573,261,578,236,603,303,536,356,483,355,484,405,434,
    404,435,406,433,235,604,267,572,302,537,309,530,265,574,233,606,367,472,296,543,
    336,503,305,534,373,466,280,559,279,560,419,420,240,599,258,581,229,610
];

const t38_211_6_3_3_1_4 =[ //Mapping from logical index i to sequence number u for preamble formats with Lra=139
    1, 138,  2, 137,  3, 136,  4, 135,  5, 134,  6, 133,  7, 132,  8, 131,  9, 130, 10, 129,
    11, 128, 12, 127, 13, 126, 14, 125, 15, 124, 16, 123, 17, 122, 18, 121, 19, 120, 20, 119,
    21, 118, 22, 117, 23, 116, 24, 115, 25, 114, 26, 113, 27, 112, 28, 111, 29, 110, 30, 109,
    31, 108, 32, 107, 33, 106, 34, 105, 35, 104, 36, 103, 37, 102, 38, 101, 39, 100, 40,  99,
    41,  98, 42,  97, 43,  96, 44,  95, 45,  94, 46,  93, 47,  92, 48,  91, 49,  90, 50,  89,
    51,  88, 52,  87, 53,  86, 54,  85, 55,  84, 56,  83, 57,  82, 58,  81, 59,  80, 60,  79,
    61,  78, 62,  77, 63,  76, 64,  75, 65,  74, 66,  73, 67,  72, 68,  71, 69,  70
];

const t38_211_6_3_3_1_2 = {//Preamble formats for Lra=139 and Df^RA=15*2^u kHz where u=0..3, duration added based on 6.3.3.2-2,3,4 tables
    "0"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "N_numb":1, "Nu":  24576 /* *K / 2^-u */, "N_RA_CP": 3168/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "1"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "N_numb":2, "Nu":2*24576 /* *K / 2^-u */, "N_RA_CP":21024/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "2"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "N_numb":4, "Nu":4*24576 /* *K / 2^-u */, "N_RA_CP": 4688/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "3"  : { "Lra":839, "Df_RA": 5000 /* *2^u */, "N_numb":4, "Nu": 4*6144 /* *K / 2^-u */, "N_RA_CP": 3168/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "A1" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":2, "Nu": 2*2048 /* *K / 2^-u */, "N_RA_CP": 288 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "A2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":4, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP": 576 /* *K / 2^-u */, "Restricted_set": [], "duration": 4 },
    "A3" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":6, "Nu": 6*2048 /* *K / 2^-u */, "N_RA_CP": 864 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 },
    "B1" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":2, "Nu": 2*2048 /* *K / 2^-u */, "N_RA_CP": 216 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "B2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":4, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP": 360 /* *K / 2^-u */, "Restricted_set": [], "duration": 4 },
    "B3" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":6, "Nu": 6*2048 /* *K / 2^-u */, "N_RA_CP": 504 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 },
    "B4" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":12, "Nu":12*2048 /* *K / 2^-u */, "N_RA_CP": 936 /* *K / 2^-u */, "Restricted_set": [], "duration": 12 },
    "C0" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":1, "Nu": 1*2048 /* *K / 2^-u */, "N_RA_CP":1240 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "C2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "N_numb":4, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP":2048 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 } };

const t38_211_6_3_3_2_2 = [//Random access configurations for FR1 and paired spectrum/supplementary uplink. FDD (u===0)
    { "format": "0", "x": 16, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 16, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 8, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 8, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 4, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 4, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 4, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [2,5,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3,6,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 16, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 16, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 8, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 8, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 4, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 4, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 4, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [3,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [2,5,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [3,6,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 16, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 8, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 4, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 2, "y": [0], "sf": [5], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 1, "y": [0], "sf": [5], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 16, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 16, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 8, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 8, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 4, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 4, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 4, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [2,5,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3,6,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "A1", "x": 16, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "A2", "x": 16, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [0], "sf": [2,6,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A3", "x": 16, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "B1", "x": 16, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 8, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 4, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 4, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 2, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "B4", "x": 16, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "C0", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 4, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C2", "x": 16, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 16, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [2,6,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1,4,7], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [0,2,4,6,8], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6}
];
const t38_211_6_3_3_2_3 = [//Random access configurations for FR1 and unpaired spectrum  TDD?
    { "format": "0", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [0], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 2, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [5], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [2], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,6], "start": 7, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [4,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3,4,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [7,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [6,7,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,4,6,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "0", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 16, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 8, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 4, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 2, "y": [1], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "1", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 16, "y": [1], "sf": [6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 8, "y": [1], "sf": [6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 4, "y": [1], "sf": [6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 2, "y": [0], "sf": [6], "start": 7, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 2, "y": [1], "sf": [6], "start": 7, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "2", "x": 1, "y": [0], "sf": [6], "start": 7, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [0], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 2, "y": [1], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [5], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [2], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,6], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,6], "start": 7, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3,8], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [4,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3,4,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [7,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,4,6,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "3", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
    { "format": "A1", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [4,9], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [7,9], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [7,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [2,3,4,7,8,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [9], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [7,9], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A2", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [7,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [7,9], "start": 9, "slots_in_sf": 1, "occasions": 1, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [4,9], "start": 9, "slots_in_sf": 1, "occasions": 1, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 16, "y": [1], "sf": [2,3,4,7,8,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [2], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [9], "start": 9, "slots_in_sf": 1, "occasions": 1, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [7,9], "start": 9, "slots_in_sf": 1, "occasions": 1, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 9, "slots_in_sf": 1, "occasions": 1, "duration": 4},
    { "format": "A3", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [4,9], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [7,9], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [7,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [2,3,4,7,8,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [2], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [2,7], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [7,9], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "B1", "x": 4, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [4,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B4", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [2,3,4,7,8,9], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [2], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [7], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "C0", "x": 16, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 8, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 4, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [4,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [2,3,4,7,8,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C2", "x": 16, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [4,9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [2,3,4,7,8,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [9], "start": 8, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 4, "y": [1], "sf": [9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 8, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [4,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [7,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [4,9], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [7,9], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [9], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [7,9], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [4,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [7,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [4,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [4,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [7,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [3,4,8,9], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [1,3,5,7,9], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6}
];

const t38_211_6_3_3_2_4 = [//Random access configurations for FR2 and unpaired spectrum TDD?
    { "format": "A1", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [19,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,5,7], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 7, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 7, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 7, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A2", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [19,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,5,7], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 5, "slots_in_sf": 2, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 5, "slots_in_sf": 2, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 5, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A3", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [19,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,5,7], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9,11,13], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "B1", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [19,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [3,5,7], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 8, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 8, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "B1", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "B4", "x": 16, "y": [1,2], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 16, "y": [1,2], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [1,2], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [1,2], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 4, "y": [1,2], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [19,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [9,11,13,15,17,19], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 2, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,5,7,9,11,13,15,17,19,21,23,25], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [3,5,7,9,11,13,15,17,19,21,23,25], "start": 0, "slots_in_sf": 2, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "B4", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 2, "slots_in_sf": 1, "occasions": 1, "duration": 12},
    { "format": "C0", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [19,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,5,7], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 8, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 8, "slots_in_sf": 2, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 7, "duration": 2},
    { "format": "C0", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "C2", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 8, "y": [1,2], "sf": [9,19,29,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 2, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [19,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,5,7], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [24,29,34,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,5,7,9,11,13], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [13,14,15,29,30,31,37,38,39], "start": 7, "slots_in_sf": 2, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 0, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "C2", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39], "start": 7, "slots_in_sf": 1, "occasions": 1, "duration": 6},
    { "format": "A1/B1", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [19,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 8, "slots_in_sf": 1, "occasions": 3, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A1/B1", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 2, "slots_in_sf": 1, "occasions": 6, "duration": 2},
    { "format": "A2/B2", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [19,39], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 6, "slots_in_sf": 1, "occasions": 2, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A2/B2", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 2, "slots_in_sf": 1, "occasions": 3, "duration": 4},
    { "format": "A3/B3", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 16, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 8, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 8, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 4, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 4, "y": [1], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 2, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [19,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [17,19,37,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [9,19,29,39], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [7,15,23,31,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [23,27,31,35,39], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [4,9,14,19,24,29,34,39], "start": 2, "slots_in_sf": 2, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [3,7,11,15,19,23,27,31,35,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6},
    { "format": "A3/B3", "x": 1, "y": [0], "sf": [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6}
];

const t38_104_5_3_2 = {
    "0" : [25,52,79,106,133,160,188,216,242,270],
    "1" : [11,24,38,51,65,78,92,106,119,133,162,189,217,245,273],
    "2" : [11,18,24,31,38,44,51,58,65,79,93,107,121,135], //Nokia doesnt use u=2 anyways
    "3" : [32,66,132,264],
    "5" : [66,124,248]
}

//All global variables below are loaded on call of nr_init_L2L1_interface
let nr_l2l1_packets = null;  //holds all BIP and msg type 64,65 packets, structured as [subcell][frame][slot][message],
let nr_l2l1_packets_u = 0; //numerology used for slot index in nr_l2l1_packets
let nr_antenna_to_subcell_mappings = {}; //Used by msg type 64 and 65, for BIP user shall use table in CONFIGURE tab
let nr_sfnToFrameDiff = {}; //difference between systemFrameNr and ecpri.frameId+ecpri.hfnId, its constant per cell and equals 0 or 256 or 512 or 768. Applies only to msg type 64 & 65
let nr_N_BWP_start_DL = {}, nr_N_BWP_end_DL = {}, nr_N_BWP_start_UL = {}, nr_N_BWP_end_UL = {}; //indexed by subcellId, they hold prb boundaries of bandwidth part.
let nr_N_BWP_size_UL = {}, nr_N_BWP_size_DL = {}; //indexed by subcellId,


function nr_fillIqTypes() {
    const perfNow = performance.now();

    // Indexes of channels in 'channels' array
    const ZERO = 0;
    const PBCH = 1;
    const PDCCH = 2;
    const PDSCH = 3;
    const PSS = 4;
    const SSS = 5;

    const PBCH_DMRS = 6;
    const PDCCH_DMRS = 7;
    const PDSCH_DMRS = 8;
    const PDSCH_PTRS = 9;

    const CSIRS = 11;
    const RIMRS = 12;
    const PRACH = 13;
    const PUCCH = 14;
    const PUSCH = 15;
    const PUCCH_DMRS = 16;
    const PUSCH_DMRS = 17;
    const PUSCH_PTRS = 18;
    const SRS = 19;

    const HRAW = 31;
    const RXDATA = 32;
    const TXPILOT = 33;

    if(config.cell.SSBdetectType === undefined) config.cell.SSBdetectType = get_param_radio(configDialog_SSBdetectType) ;

    const drawMoreChannels = config.configDialog_moreChannels;

    if( drawMoreChannels ) nr_init_L2L1_interface();

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            for( const antId in iqBuffers[u] ) {
                if(!iqTypeBuffers[u][antId]) {
                    iqTypeBuffers[u][antId] = new Uint8Array(iqBuffers[u][antId].length / 2);
                }
                const iqTypeBuf = iqTypeBuffers[u][antId].buffer;

                if ( isDeepRx ) {
                    if (antId < 8) {
                        iqTypeBuffers[u][antId].fill(HRAW);
                    } else if (antId < 12) {
                        iqTypeBuffers[u][antId].fill(RXDATA);
                    } else {
                        iqTypeBuffers[u][antId].fill(TXPILOT);
                    }
                }
                else if( antId >= 0x10000 || antId.includes("RoE")) { // DL
                    iqTypeBuffers[u][antId].fill(PDSCH);
                    for (let sf = iqFirstSubframe[u][antId]; sf < iqNumPrb[u][antId].length; ++sf) {

                        const iqBuffIdx = iqOffsets[u][antId][sf];
                        if (iqBuffIdx === undefined) continue;

                        if (!drawMoreChannels) { //Old (manual) pdcch drawing mode
                            for (let sym = 0; sym < NUM_OF_SYM_IN_SF_PER_U[u];) {
                                const symInSlot = sym % 14;

                                if (symInSlot >= config.cell.numOfPdcchSym) {
                                    sym += 14 - config.cell.numOfPdcchSym;
                                    continue;
                                }

                                if(iqNumPrb[u][antId][sf][sym] === 0) {
                                    ++sym; continue;
                                }

                                const iqType = new Uint8Array(iqTypeBuf, iqBuffIdx[sym]/2, iqNumPrb[u][antId][sf][sym]*12);
                                iqType.fill(PDCCH);

                                for (let re = 1; re < iqNumPrb[u][antId][sf][sym]*12; re += 4) {
                                    iqType[re] = PDCCH_DMRS;
                                }
                                ++sym;
                            }
                        }

                    }

                    nr_mark_CSIRS(iqTypeBuf, u, antId, CSIRS, nr_l2l1_packets,drawMoreChannels);
                    if (drawMoreChannels && nr_l2l1_packets !== null) {
                        nr_mark_PDCCH_and_PDCCH_DMRS(iqTypeBuf, u, antId, PDCCH, PDCCH_DMRS, nr_l2l1_packets);
                        nr_mark_PSCH_DMRS(iqTypeBuf, u, antId, PDSCH, PDSCH_DMRS, nr_l2l1_packets, true);
                        nr_mark_PSCH_PTRS(iqTypeBuf, u, antId, PDSCH, PDSCH_DMRS, PDSCH_PTRS, nr_l2l1_packets, true);
                    }

                    const antForSSB = configDialog_antenna.value.indexOf("RoE") === -1 ? (parseInt(configDialog_antenna.value) + 65536).toString() : configDialog_antenna.value; //ant for which ssb is drawn
                    if (u === parseInt(configureDialog_u.value) && antId === antForSSB) {
                        const pbchCfg = nr_pbchConfig[config.cell.pbch_case];
                        const firstHalfFrame = Math.max( Math.floor( iqFirstSubframe[u][antId] / 5 ), config.cell.pbch_halfFrameOffset);
                        for (let halfFrame = firstHalfFrame; halfFrame < Math.ceil(iqNumPrb[u][antId].length / 5); halfFrame += Math.floor(config.cell.pbch_periodicity / 5)) { //hf=half_frame
                            for (let block = 0; block < config.cell.pbch_numOfBlocks; ++block) {
                                const firstSym_absolute = 5 * NUM_OF_SYM_IN_SF_PER_U[u] * halfFrame + pbchCfg.indexes[block];
                                const firstSym = firstSym_absolute % NUM_OF_SYM_IN_SF_PER_U[u];
                                const sf = Math.floor( firstSym_absolute / NUM_OF_SYM_IN_SF_PER_U[u] );
                                if(!iqNumPrb[u][antId][sf] || !iqNumPrb[u][antId][sf][firstSym] || iqNumPrb[u][antId][sf][firstSym] < 20) continue;
                                nr_mark_SSB(u, antId, iqTypeBuf, sf, firstSym, ZERO, PSS, SSS, PBCH, PBCH_DMRS);
                            }
                        }
                    }
                }
                else { // UL
                    iqTypeBuffers[u][antId].fill( PUSCH ); // by default all is PUSCH
                    if (drawMoreChannels && nr_l2l1_packets !== null) {
                        nr_mark_PUCCH_and_PUCCH_DMRS(iqTypeBuf,u,antId,PUCCH,PUCCH_DMRS,nr_l2l1_packets);
                        nr_mark_PSCH_DMRS(iqTypeBuf,u,antId,PUSCH,PUSCH_DMRS,nr_l2l1_packets,false);
                        nr_mark_PSCH_PTRS(iqTypeBuf,u,antId,PUSCH,PUSCH_DMRS,PUSCH_PTRS,nr_l2l1_packets,false);
                        // nr_mark_SRS(iqTypeBuf,u,antId,SRS,nr_l2l1_packets);
                    }
                }
            }
        }
    }

    for(let i = 0; i < packets.length; i++){
        const ecpri = packets[i].ecpri;
        if(!ecpri || !(ecpri.message === 0 && ecpri.payloadVer !== 7) || !(ecpri.filterIndex === 3 || ecpri.filterIndex === 1) ) continue;
        if(ecpri.sections === undefined || ecpri.sections.length === undefined) continue;

        for(let j = 0; j < ecpri.sections.length; j++){
            try{
                const u = ecpri_uInPkt[i];
                const sym = ( ecpri.slotId >> ( u <= 5 ? ecpri_maxU - u : 0 ) ) * 14 + ecpri.startSymbolId;
                const antId = ecpri.rtcId + (ecpri.dataDir===1 ? 2**16 : 0);
                const place = iqOffsets[u][antId][ (ecpri.hfn*256 + ecpri.frameId) * 10 + ecpri.subframeId][sym]/2;
                iqTypeBuffers[u][antId].fill( PRACH, place + ecpri.sections[j].startPrb*12, place + (ecpri.sections[j].startPrb + ecpri.sections[j].numPrb)*12 );
            } catch (e) {}
        }
    }

    if(config.load.prachTD){
        for( let u = 0; u < NUM_OF_U; ++u ) {
            for( const antId in iqBuffers[u] ) {
                iqTypeBuffers[u][antId].fill( PRACH );
            }
        }
    }

    logDebug( 'NR', `nr_fillIqTypes took ${ perfToMsFrom( perfNow ) }` );
}


function nr_get_subcell_from_antenna(u,antId){
    if(Object.keys(nr_antenna_to_subcell_mappings).length > 0){
        antId = parseInt(antId);
        let dataDir = 0;
        if(antId >= 65536){
            dataDir = 1;
            antId -= 65536;
        }

        if(nr_antenna_to_subcell_mappings && nr_antenna_to_subcell_mappings[u] &&
            nr_antenna_to_subcell_mappings[u][dataDir] && nr_antenna_to_subcell_mappings[u][dataDir][antId] !== undefined
        ){
            return nr_antenna_to_subcell_mappings[u][dataDir][antId];
        }
        return null;

    }
    else{
        const subcellAntTableTBody = getElementById("configDialog_subcellAntTable").firstElementChild;
        for(let i = 1; i < subcellAntTableTBody.children.length; i++){
            const antTable_row = subcellAntTableTBody.children[i];
            const antTable_subcell = parseInt(antTable_row.children[3].firstElementChild.value);
            const antTable_u = parseInt(antTable_row.children[0].innerText), antTable_dir = antTable_row.children[1].innerText;
            const antTable_antId = antTable_dir === 'DL' ? parseInt(antTable_row.children[2].innerText) + 65536 : parseInt(antTable_row.children[2].innerText);
            if( antTable_u === u && antTable_antId == antId) return antTable_subcell;
        }
    }


    return null;
}

//Returns frame corresponding to provided sfn (System Frame number). For ecpri msg type 64 & 65 also uses nr_sfnToFrameDiff global var to improve precision
function nr_get_frame_from_sfn(subcell,sfn){
    if(nr_sfnToFrameDiff[subcell]===undefined){
        return sfn % 256; //use safe formula that works ok with smaller files
    }
    else if(sfn - nr_sfnToFrameDiff[subcell] >= 0) return sfn - nr_sfnToFrameDiff[subcell];
    else return sfn - nr_sfnToFrameDiff[subcell] + 1024;
}

function nr_GetClosest3gppBandwidth(bandwidth){
    for(let i = 0; i < t38_104_5_3_2[nr_l2l1_packets_u].length; i++){
        if(t38_104_5_3_2[nr_l2l1_packets_u][i] >= bandwidth){
            return t38_104_5_3_2[nr_l2l1_packets_u][i];
        }
    }
    return null;
}

//Sets all nr_... global variables
function nr_init_L2L1_interface(){
    const l2l1_messages_for_BWP_calculation = {
        "UL" : ['UlData::PuschReceiveReq','UlDataFH::PuschReceiveReq', 'UlData::PucchReceiveReq', 'UlData::PucchReceiveReqL1sw'],
        "DL" : ['DlData::PdschSendReq','DlData::PdschSendReqL1sw','DlData::CsiRsSendReq','DlData::CsiRsSendReqL1sw']
    }
    let l2l1_packets = {};
    let antennaToSubcellMapping = {}; //Relevant for 7-2e which contains both subcellId and antId and can automatically set it in CONFIGURE
    let type;
    let maxSlot = 0;
    for(let i=0; i<packets.length; i++){
        const packet = packets[i];
        if(packet.ethertype !== 0x8951 && (packet.ethertype === 0xAEFE && ![64,65].includes(packet.ecpri.message))) continue; //not L2L1
        if(packet.l2l1 === undefined || packet.l2l1.sfn === undefined || packet.l2l1.slot === undefined) continue;
        const l2l1_msg = packetPropToStrMap["l2l1.message"][packet.l2l1.message];
        type = packet.ethertype === 0xAEFE ? "7-2e" : "BIP";

        let subcell;
        if(packet.l2l1.subcellId !== undefined)
            subcell = packet.l2l1.subcellId;
        else if(packet.l2l1.subcells && packet.l2l1.subcells[0])
            subcell = packet.l2l1.subcells[0].subcellId;
        else
            continue;

        const sfn = packet.l2l1.sfn;

        if( type === "7-2e" && nr_sfnToFrameDiff[subcell] === undefined){
            //In 7-2e (ecpri msg 64 and 65) we are not only provided subcell,sfn and slot but also numerology and antenna. It will be used to autofill
            //antenna to subcell table in CONFIGURE tab and sync sfn from l2l1 with frames in bba

            const u = ecpri_uInPkt[i];
            const antId = packet.ecpri.rtcId;
            const dataDir = packet.ecpri.dataDir;
            const frameInPacket = 256*packet.ecpri.hfn + packet.ecpri.frameId;
            nr_sfnToFrameDiff[subcell] = sfn - frameInPacket;
            if(!antennaToSubcellMapping[u]) antennaToSubcellMapping[u] = {};
            if(!antennaToSubcellMapping[u][dataDir]) antennaToSubcellMapping[u][dataDir] = {};
            if(!antennaToSubcellMapping[u][dataDir][antId]) antennaToSubcellMapping[u][dataDir][antId] = subcell;
        }

        const frame = nr_get_frame_from_sfn(subcell,sfn);
        const slot = packet.l2l1.slot; //slot within frame

        maxSlot = Math.max(slot,maxSlot); //for u calculation

        if(!l2l1_packets[subcell]) l2l1_packets[subcell] = {};
        if(!l2l1_packets[subcell][frame]) l2l1_packets[subcell][frame] = {};
        if(!l2l1_packets[subcell][frame][slot]) l2l1_packets[subcell][frame][slot] = {};
        if(!l2l1_packets[subcell][frame][slot][l2l1_msg]) l2l1_packets[subcell][frame][slot][l2l1_msg] = []
        l2l1_packets[subcell][frame][slot][l2l1_msg].push(packet);

        //This part is for calculating bandwidth part boundaries
        if( l2l1_messages_for_BWP_calculation["UL"].concat( l2l1_messages_for_BWP_calculation["DL"] ).includes(l2l1_msg) ){
            let l2l1_data_arr = nr_get_data_from_provided_packet_array([packet],l2l1_msg);
            for(let l2l1_data of l2l1_data_arr){
                const startPrb = l2l1_data.startPrb, endPrb = l2l1_data.startPrb + l2l1_data.numOfPrb;
                if(l2l1_messages_for_BWP_calculation["DL"].includes(l2l1_msg)){
                    nr_N_BWP_start_DL[subcell] = nr_N_BWP_start_DL[subcell] !== undefined ? Math.min(nr_N_BWP_start_DL[subcell], startPrb) : startPrb;
                    nr_N_BWP_end_DL[subcell] = nr_N_BWP_end_DL[subcell] !== undefined ? Math.max(nr_N_BWP_end_DL[subcell],endPrb) : endPrb;
                }
                else{
                    nr_N_BWP_start_UL[subcell] = nr_N_BWP_start_UL[subcell] !== undefined ? Math.min(nr_N_BWP_start_UL[subcell], startPrb) : startPrb;

                    if(endPrb > 273) continue; //Avoids faulty packets
                    nr_N_BWP_end_UL[subcell] = nr_N_BWP_end_UL[subcell] !== undefined ? Math.max(nr_N_BWP_end_UL[subcell],endPrb) : endPrb;
                }
            }
        }
    }
    nr_l2l1_packets = l2l1_packets;
    if( type === "7-2e") nr_antenna_to_subcell_mappings = antennaToSubcellMapping;

    //Numerology in l2l1 is assumed based on maxSlot
    //This part sets nr_l2l1_packets_u global variable
    for(let numerology = 0; numerology < 6; numerology++){
        if(maxSlot < 10 * 2**numerology) {nr_l2l1_packets_u = numerology; break;}
    }

    if(nr_l2l1_packets_u == 0) nr_l2l1_packets_u = 1; //patch

    //BWP per subcell calculation, must be done after nr_l2l1_packet_u is calculated as nr_GetClosest3gppBandwidth uses it
    for(let subcell of Object.keys(nr_l2l1_packets)){
        if(nr_N_BWP_start_DL[subcell] !== undefined) nr_N_BWP_size_DL[subcell] = nr_GetClosest3gppBandwidth( nr_N_BWP_end_DL[subcell] - nr_N_BWP_start_DL[subcell]);
        if(nr_N_BWP_start_UL[subcell] !== undefined) nr_N_BWP_size_UL[subcell] = nr_GetClosest3gppBandwidth( nr_N_BWP_end_UL[subcell] - nr_N_BWP_start_UL[subcell] );
    }
}

//All packets in 'packets' array must contain this same l2l1_message
function nr_get_data_from_provided_packet_array(packets,l2l1_message){
    let res = [];
    try{
        for(let i = 0; i < packets.length; i++){
            if( ["DlData::PdschSendReq", "DlData::PdschSendReqL1sw"].includes(l2l1_message) ) res = res.concat(packets[i].l2l1.grants);
            else if( ["DlData::PdschPayloadTbSendReq", "DlData::PdschPayloadTbSendReqL1sw"].includes(l2l1_message) ) res = res.concat(packets[i].l2l1);
            else if(["DlData::CsiRsSendReq","DlData::CsiRsSendReqL1sw"].includes( l2l1_message ) ) res = res.concat( packets[i].l2l1.csiRsResources );
            else if(["DlData::PdcchSendReq","DlData::PdcchSendReqL1sw"].includes(l2l1_message) ) res = res.concat( packets[i].l2l1.dciInfo )
            else if(l2l1_message === 'UlData::PuschReceiveReq') res = res.concat( packets[i].l2l1.subcells[0].grants )
            else if(l2l1_message === 'UlDataFH::PuschReceiveReq') res = res.concat( packets[i].l2l1.grants )
            else if(["UlData::PucchReceiveReq", "UlData::PucchReceiveReqL1sw"].includes( l2l1_message ) ) res = res.concat( packets[i].l2l1.subcells[0].pucchResources )
            else if(l2l1_message === 'UlDataFH::SrsSuMimoReceiveReq') res = res.concat( packets[i].l2l1.srsReceiveReqUes )
        }

        for(let i = 0; i < res.length; i++){ //Adds additional property
            res[i].slot = packets[0].l2l1.slot;
        }
    }
    catch(e){
        console.log("Error:",e.message);
        return null;
    }
    return res;
}

//Returns data from BIP/7-2e packet on given position
//Position is specified as one of below
//  - (u,antId,subframe,bba_slot), where bba_slot means slot within subframe
//  - (subcell,sfn,l2l1_slot), where l2l1_slot means slot within sfn (system frame number)
//Warning: Most of the time there will be just one adequate packet in specified position however for multi user scenarios there might be
//multiple PdschSendReq packets within each slot (with different rnti!), this is not yet fully supported however
//rntiToMatch (if not undefined) chooses which of those packets shall be used
function nr_get_l2l1_data_from_packets(channel,bba_sf,bba_slot,u,antId,l2l1_packets,givePayloadForPDSCH,subcell,sfn,l2l1_slot){
    //First part selects l2l1 message based on provided channel
    let l2l1_msg_arr;
    if([3,8,9].includes(channel)){
        if(givePayloadForPDSCH === false) l2l1_msg_arr = ["DlData::PdschSendReq","DlData::PdschSendReqL1sw"]; //PDSCH,PDSCH DMRS & PTRS
        else l2l1_msg_arr = ["DlData::PdschPayloadTbSendReq", "DlData::PdschPayloadTbSendReqL1sw"];
    }
    else if([15,17,18].includes(channel)) l2l1_msg_arr = ['UlData::PuschReceiveReq','UlDataFH::PuschReceiveReq'] //PUSCH DMRS & PTRS
    else if([11].includes(channel)) l2l1_msg_arr = ["DlData::CsiRsSendReq","DlData::CsiRsSendReqL1sw"]; //CSIRS
    else if([2,7].includes(channel)) l2l1_msg_arr = ["DlData::PdcchSendReq","DlData::PdcchSendReqL1sw"]; //PDCCH and its DMRS
    else if([14,16].includes(channel)) l2l1_msg_arr = ['UlData::PucchReceiveReq','UlData::PucchReceiveReqL1sw']; //PUCCH and its DMRS
    else if([19].includes(channel)) l2l1_msg_arr = ["UlDataFH::SrsSuMimoReceiveReq"]; //SRS
    else return null; //Not supported

    //This part below finds l2l1 packet based on (u,antId,subframe,bba_slot) or (subcell,sfn,l2l1_slot) within nr_l2l1_packets object
    let l2l1_frame;
    if(subcell !== undefined && subcell !== null && sfn !== undefined && sfn !== null){ //Packet is searched based on (subcell,sfn,l2l1_slot)
        l2l1_frame = nr_get_frame_from_sfn(subcell,sfn);
        if( !l2l1_packets || !l2l1_packets[subcell] || !l2l1_packets[subcell][l2l1_frame] || !l2l1_packets[subcell][l2l1_frame][l2l1_slot]) return null;
    }
    else{ //Packet is searched based on (u,antId,subframe,bba_slot), this requires translating bba_slot into proper numerology used by l2l1
        subcell = nr_get_subcell_from_antenna(u,antId);
        if(subcell === null) return null;
        l2l1_frame = Math.floor(bba_sf / 10);

        if(nr_l2l1_packets_u < u){ //l2l1 uses smaller numerology => has longer slots => we just need to divide our bba_slotId by 2**(u - nr_l2l1_packet_u)
            l2l1_slot = Math.floor( ((bba_sf % 10) * NUM_OF_SLOTS_PER_U[u] + bba_slot ) / 2**(u - nr_l2l1_packets_u) );
            if( !l2l1_packets || !l2l1_packets[subcell] || !l2l1_packets[subcell][l2l1_frame] || !l2l1_packets[subcell][l2l1_frame][l2l1_slot]) return null;
        }
        else{ //l2l1 uses shorter slots => our slot covers multiple l2l1 slots => we need to check all of them for match
            let success = false;
            for(let i = 0; i < 2**(nr_l2l1_packets_u - u); i++){
                l2l1_slot = ((bba_sf % 10) * NUM_OF_SLOTS_PER_U[u] + bba_slot ) * 2**(nr_l2l1_packets_u - u) + i;
                if( l2l1_packets && l2l1_packets[subcell] && l2l1_packets[subcell][l2l1_frame] && l2l1_packets[subcell][l2l1_frame][l2l1_slot]){
                    success = true; //We found the corresponding l2l1 slot.
                    break;
                }
            }
            if(!success) return null;
        }
    }

    let packets = null,l2l1_msg = null;
    for(let message of l2l1_msg_arr){
        if(!l2l1_packets[subcell][l2l1_frame][l2l1_slot][message]) continue;
        packets = l2l1_packets[subcell][l2l1_frame][l2l1_slot][message];
        l2l1_msg = message;
        break;
    }
    if(!packets) return null;

    let l2l1_data_arr = nr_get_data_from_provided_packet_array(packets,l2l1_msg);
    return l2l1_data_arr;
}

 //extracts single set of parameters from array of parameters sets.
 //If rnti === undefined -> Objects in params_arr are required to have "startPrb" and "numOfPrb" fields and correct set is selected based on frequency position
 //Otherwise set of parameters is selected based on matching rnti instead of frequency position.
function nr_GetParametersFromParametersArr(params_arr,rb,re,rnti){
    if(!params_arr) return null;
    if(rnti === undefined || rnti === null){
        const sc = rb*12 + re;
        for(let i = 0; i< params_arr.length;i++){
            const params = params_arr[i];
            if(params["startPrb"]===undefined || params["numOfPrb"]===undefined) continue; //Important field is missing, this is an error.

            if(sc >= 12*params["startPrb"] && sc < 12*(params["startPrb"] + params["numOfPrb"])){
                return params;
            }
            else if(params["channelId"] !== undefined && params["channelId"] === 14 && params["frequencyHopping"] === 1){ //Additional scenario for PUCCH DMRS
                if(sc >= 12*params["secondHopPrb"] && sc < 12*(params["secondHopPrb"] + params["numOfPrb"])){ //Symbol might also need to be taken into consideration
                    return params;
                }
            }
        }
    }
    else{
        for(let i = 0; i < params_arr.length; i++){
            const params = params_arr[i];
            if(params["n_rnti"] === rnti || params["rnti"] === rnti) return params;
        }
    }

    return null;
}



function nr_mark_PSCH_DMRS(iqTypeBuff,u,antId,PSCH, PSCH_DMRS,l2l1_packets,isChannelDL){ //Used for PDSCH or PUSCH based on isChannelDL argument
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return

    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;
    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){
        if(!iqNumPrb[u][antId][sf]) continue;
        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){
            const params_RS_arr = isChannelDL ? pdsch_GetParametersArr(u,antId,sf,slot,PSCH,l2l1_packets) : pusch_GetParametersArr(u,antId,sf,slot,PSCH,l2l1_packets);
            if(params_RS_arr === null) continue;

            for(let i = 0; i < params_RS_arr.length; i++){
                const params_RS = params_RS_arr[i];
                if(!params_RS) continue;

                for(const l_bar of params_RS["dmrs_sym_positions"]){
                    const symbol = l_bar + params_RS["sym_ref_dmrs"];
                    if(symbol >= 14) break;

                    let start = iqOffsets[u][antId][sf][slot*14+symbol]/2;
                    let length = iqNumPrb[u][antId][sf][slot*14+symbol]*12;
                    if(length === 0) continue;

                    let iqTypeSlot = new Uint8Array( iqTypeBuff, start,length);
                        for(let j = 0; j < params_RS["dmrs_AntPorts"].length; j++){
                            for(let rb = params_RS["startPrb"]; rb < params_RS["startPrb"] + params_RS["numOfPrb"]; rb++){

                            for(let sc = params_RS["delta"][j]; sc < 12; sc+= params_RS["sc_increment"]){
                                const typeOffset = 12*rb + sc - iqStartPrb[u][antId][sf][slot*14+symbol]*12;
                                if(iqTypeSlot[typeOffset] === PSCH && typeOffset < length) iqTypeSlot[typeOffset] = PSCH_DMRS;
                                if(sc < 11 && params_RS["dmrs_ConfigType"] === 2 && iqTypeSlot[typeOffset+1] === PSCH && typeOffset+1 < length)
                                    iqTypeSlot[typeOffset+1] = PSCH_DMRS;

                                if(params_RS["dmrs_MaxLen"] === 2 && symbol < 13){
                                    let start2 = iqOffsets[u][antId][sf][slot*14+symbol+1]/2;
                                    let length2 = iqNumPrb[u][antId][sf][slot*14+symbol+1]*12;
                                    let iqTypeSlot2 = new Uint8Array( iqTypeBuff, start2,length2);
                                    if(length2 === 0) continue;

                                    if(iqTypeSlot2[typeOffset] === PSCH && typeOffset < length2 ) iqTypeSlot2[typeOffset] = PSCH_DMRS;
                                    if(sc < 11 && params_RS["dmrs_ConfigType"] === 2 && iqTypeSlot2[typeOffset + 1] === PSCH && typeOffset+1 < length2){
                                        iqTypeSlot2[typeOffset + 1] = PSCH_DMRS;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function nr_mark_PSCH_PTRS(iqTypeBuff,u,antId,PSCH, PSCH_DMRS, PSCH_PTRS,l2l1_packets, isChannelDL){
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return;

    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;
    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){
        if(!iqNumPrb[u][antId][sf]) continue;
        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){
            const params_RS_arr = isChannelDL ? pdsch_GetParametersArr(u,antId,sf,slot,PSCH,l2l1_packets) : pusch_GetParametersArr(u,antId,sf,slot,PSCH,l2l1_packets);
            if(params_RS_arr === null) continue;
            for(let j = 0; j < params_RS_arr.length; j++){
                const params_RS = params_RS_arr[j];
                if(params_RS === null || params_RS["ptrs_present"] === 0) continue;

                const k_ref = params_RS["k_ref_RE"][0];
                if(k_ref === -1) continue;

                let i = 0;
                while(true){ ///!
                    const k = k_ref + (i*params_RS["ptrs_FreqDensity"] + params_RS["k_ref_RB"])*12; //k is relative to start of alloc
                    if(Math.floor(k / 12) < params_RS["startPrb"]){i++; continue;}
                    if(Math.floor(k / 12) >= params_RS["startPrb"] + params_RS["numOfPrb"]) break;

                    let l = 0; //relative to start of PDSCH within slot
                    let steps_done = params_RS["ptrs_TimeDensity"];
                    while(l + params_RS["sym_ref_ptrs"] < 14){
                        const typeOffset = k + params_RS["re_ref_ptrs"];
                        const iqOffset = 2*(k + params_RS["re_ref_ptrs"]) + iqOffsets[u][antId][sf][slot * 14 + l + params_RS["sym_ref_ptrs"]];
                        let start = iqOffsets[u][antId][sf][slot*14+(l + params_RS["sym_ref_ptrs"])]/2;
                        let length = iqNumPrb[u][antId][sf][slot*14+(l + params_RS["sym_ref_ptrs"])]*12;

                        if(length > 0 && typeOffset < length) {
                            let iqTypeSlot =  new Uint8Array( iqTypeBuff,start,length);

                            if(isFinite(iqBuffers[u][antId][iqOffset]) && iqTypeSlot[typeOffset] === PSCH_DMRS)  steps_done = 0;
                            if(steps_done === params_RS["ptrs_TimeDensity"]){
                                iqTypeSlot[typeOffset] = PSCH_PTRS;
                                steps_done = 0;
                            }
                        }

                        l++;
                        steps_done++;
                    }
                    i++;
                }
            }
        }
    }
}

function nr_mark_PDCCH_and_PDCCH_DMRS(iqTypeBuff,u,antId,PDCCH, PDCCH_DMRS,l2l1_packets){
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return;

    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;

    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){
        if(!iqNumPrb[u][antId][sf]) continue;
        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){

            const params_PDCCH_arr = pdcch_GetParametersArr(u,antId,sf,slot,PDCCH,l2l1_packets);
            if(params_PDCCH_arr === null) continue;

            for(let i = 0; i < params_PDCCH_arr.length; i++){
                const params_PDCCH = params_PDCCH_arr[i];
                if(params_PDCCH === null) continue;

                let pdcchAllocations = pdcch_getPdcchFreqAllocations(params_PDCCH);

                for(let symbol = params_PDCCH["symbolOffset"]; symbol < params_PDCCH["symbolOffset"] + params_PDCCH["numOfSymbols"]; symbol++){
                    if(!iqNumPrb[u][antId][sf][slot*14 + symbol]) continue;
                    const iqOffsetCoreset = iqOffsets[u][antId][sf][slot*14+symbol]/2 + params_PDCCH["startPrb"]*12 - 12*iqStartPrb[u][antId][sf][slot*14 + symbol];

                    for(let [pdcchStartPrb,pdcchNumOfPrb] of pdcchAllocations){ //startPrb within CORESET!
                        const iqTypePart = new Uint8Array(iqTypeBuff, iqOffsetCoreset + 12*pdcchStartPrb, 12*pdcchNumOfPrb);
                        iqTypePart.fill(PDCCH);

                        for(let re = 1; re < 12*pdcchNumOfPrb ; re+=4){ //draws DMRS within Pdcch allocation
                            iqTypePart[re] = PDCCH_DMRS;
                        }
                    }
                }
            }
        }
    }
}

function nr_mark_PUCCH_and_PUCCH_DMRS(iqTypeBuff,u,antId,PUCCH,PUCCH_DMRS,l2l1_packets){
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return;

    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;
    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){
        if(!iqNumPrb[u][antId][sf]) continue;
        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){

            const params_PUCCH_arr = pucch_GetParametersArr(u,antId,sf,slot,PUCCH,l2l1_packets);
            if(params_PUCCH_arr === null) continue;

            for(let i = 0; i < params_PUCCH_arr.length; i++){
                const params_PUCCH = params_PUCCH_arr[i];
                if(params_PUCCH === null) continue;

                for(let symbol = params_PUCCH["firstSymbol"]; symbol < params_PUCCH["firstSymbol"] + params_PUCCH["numOfSymbols"]; symbol++){
                    let start = iqOffsets[u][antId][sf][slot*14+symbol]/2;
                    let length = iqNumPrb[u][antId][sf][slot*14+symbol]*12;
                    if(length === 0) continue;
                    let iqTypeSymbol =  new Uint8Array( iqTypeBuff, start, length );

                    let low_re_bound,high_re_bound,trueStartPrb;
                    if(params_PUCCH["frequencyHopping"] === 1){
                        if(params_PUCCH["numOfSymbols"] === 2){
                            if(symbol === params_PUCCH["firstSymbol"]) trueStartPrb = params_PUCCH["startPrb"];
                            else trueStartPrb = params_PUCCH["secondHopPrb"];
                        }
                        else{
                            if(symbol-params_PUCCH["firstSymbol"] <= Math.floor(params_PUCCH["numOfSymbols"]/2)) trueStartPrb = params_PUCCH["startPrb"];
                            else trueStartPrb = params_PUCCH["secondHopPrb"];
                        }
                    }
                    else trueStartPrb = params_PUCCH["startPrb"];

                    low_re_bound = 12 * trueStartPrb;
                    high_re_bound = Math.min( 12*(trueStartPrb + params_PUCCH["numOfPrb"]), length );

                    if(low_re_bound < length) iqTypeSymbol.fill(PUCCH, low_re_bound, high_re_bound ); //PUCCH marking

                    //Below is DMRS marking based on PUCCH format according to 6.4.1.3 of 38.211 i-30
                    if( params_PUCCH["format"] === 1 && ((symbol - params_PUCCH["firstSymbol"]) % 2 === 0) ){
                        iqTypeSymbol.fill(PUCCH_DMRS, low_re_bound, high_re_bound ); //every second symbol, whole freq of PUCCH
                    }
                    else if(params_PUCCH["format"] === 2){
                        let low_re_bound_for_dmrs = low_re_bound;
                        switch(low_re_bound_for_dmrs % 3){ //Dmrs is present if re % 3 === 1
                            case 0: low_re_bound_for_dmrs+=1; break;
                            case 2: low_re_bound_for_dmrs+=2; break;
                        }
                        for(let re = low_re_bound_for_dmrs; re < high_re_bound; re += 3) {
                            if(re < length)
                                iqTypeSymbol[re] = PUCCH_DMRS;
                        }
                    }
                    else if(params_PUCCH["format"] === 3){
                        const symbols = t38_211_6_4_1_3_3_2_1[params_PUCCH["numOfSymbols"]][params_PUCCH["additionalDmrs"]][params_PUCCH["frequencyHopping"]];
                        if(low_re_bound < length && symbols.includes(symbol - params_PUCCH["firstSymbol"])) iqTypeSymbol.fill(PUCCH_DMRS, low_re_bound, high_re_bound );
                    }
                }
            }
        }
    }
}

//channelsFromL2L1Packets (boolean) -> should l2l1_packets or config.cell be used for parameter calculations
function nr_mark_CSIRS(iqTypeBuff,u,antId,CSIRS,l2l1_packets,channelsFromL2L1Packets){
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return
    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;
    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){
        if(!iqNumPrb[u][antId][sf]) continue;
        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){
            let maxPrbInSlot = Math.max(...iqNumPrb[u][antId][sf].slice(slot*14, (slot+1)*14));

            //In manual mode CSI-RS is drawn periodically
            if(!channelsFromL2L1Packets && (NUM_OF_SLOTS_PER_U[u] * sf + slot - config.cell.csirs_slotOffset) % config.cell.csirs_slotPeriodicity != 0) continue;

            const params_CSIRS_arr = csirs_GetParametersArr(u,antId,sf,slot,CSIRS,l2l1_packets,channelsFromL2L1Packets);
            if(params_CSIRS_arr === null) continue;

            for(let i = 0; i < params_CSIRS_arr.length; i++){
                const params_CSIRS = params_CSIRS_arr[i];
                if(params_CSIRS[i] === null) continue;

                const high_rb_bound = Math.min(params_CSIRS["startPrb"] + params_CSIRS["numOfPrb"], maxPrbInSlot);
                for(let rb = params_CSIRS["startPrb"]; rb < high_rb_bound; rb+=Math.ceil(1/params_CSIRS["density"])){
                    const row = t38_211_7_4_1_5_3_1[ params_CSIRS["row_id"] ];

                    for(let index = 0; index < row["indexes"].length; index++){
                        let k_bar = params_CSIRS["k_bar_values"][index];
                        let l_bar = params_CSIRS["l_bar_values"][index];

                        for(let k_prim of row["k_prim"]){
                            for(let l_prim of row["l_prim"]){
                                let k = k_bar + k_prim;
                                let l = l_bar + l_prim;
                                if(l >= 14 || k >= iqNumPrb[u][antId][sf][slot*NUM_OF_SYM_IN_SLOT_PER_U[u] + l]*12) continue;
                                let start = iqOffsets[u][antId][sf][slot*14+l]/2;
                                let length = iqNumPrb[u][antId][sf][slot*14+l]*12;
                                if(length === 0) continue;
                                let iqTypeSymbol =  new Uint8Array( iqTypeBuff, start, length );
                                const typeOffset = 12*rb + k - 12*iqStartPrb[u][antId][sf][l];
                                if(typeOffset < length)
                                    iqTypeSymbol[typeOffset] = CSIRS;
                            }
                        }
                    }
                }
            }
        }
    }
}

function nr_mark_SRS(iqTypeBuff,u,antId,SRS,l2l1_packets){
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId] || parseInt(u) > 5) return

    const low_sf_bound = iqFirstSubframe[u][antId];
    const high_sf_bound = iqNumPrb[u][antId].length;
    let params_SRS_arr = null;
    for(let sf = low_sf_bound; sf < high_sf_bound; sf++){

        for(let slot = 0; slot < NUM_OF_SLOTS_PER_U[u]; slot++){
            const temp_params_SRS_arr = srs_GetParametersArr(u,antId,sf,slot,SRS,l2l1_packets);
            if(temp_params_SRS_arr) params_SRS_arr = temp_params_SRS_arr
            if(!params_SRS_arr) continue;
            // params_SRS_arr = srs_GetParametersArr(u,antId,sf,slot,SRS,l2l1_packets);
            // if(!params_SRS_arr) continue;


            for(let i = 0; i < params_SRS_arr.length; i++){
                const params_SRS = params_SRS_arr[i];
                if(params_SRS[i] === null) continue;
                // if(sf === 2282) console.log("Params:",params_SRS);

                for(let l_prim = 0; l_prim < params_SRS["N_symb_SRS"]; l_prim++){
                    for(let k_prim = 0; k_prim < params_SRS["M_sc_b_SRS"]; k_prim++){
                        const symbol = l_prim + params_SRS["l0"];
                        const re = params_SRS["K_TC"] * k_prim + 12*params_SRS["startPrb"]; //startPrb is k0 in RB

                        let start = iqOffsets[u][antId][sf][slot*14+symbol]/2;
                        let length = iqNumPrb[u][antId][sf][slot*14+symbol]*12;
                        if(length === 0) continue;
                        let iqTypeSlot =  new Uint8Array( iqTypeBuff,start,length);

                        if(re < length)
                            iqTypeSlot[re] = SRS;
                    }
                }
            }
        }
    }
}

function nr_mark_SSB(u, antId, iqTypeBuf,sf,firstSym,ZERO,PSS,SSS,PBCH,PBCH_DMRS){
    const pbch_firstRe = 12 * config.cell.pbch_prbOffset + config.cell.pbch_scOffset - 12*iqStartPrb[u][antId][sf][firstSym];
    const pbch_dmrsFirstReSym1_3 = pbch_firstRe + config.cell.pci % 4;
    const pbch_dmrsLastReSym1_3 = pbch_dmrsFirstReSym1_3 + 236;
    const pbch_dmrsFirstReSym2Top = pbch_firstRe + config.cell.pci % 4;
    const pbch_dmrsLastReSym2Top = pbch_dmrsFirstReSym2Top + 44;
    const pbch_dmrsFirstReSym2Bottom = pbch_dmrsFirstReSym2Top + 192;
    const pbch_dmrsLastReSym2Bottom = pbch_dmrsFirstReSym2Top + 236;

    const iqTypeSym0 = new Uint8Array( iqTypeBuf, iqOffsets[u][antId][sf][firstSym]/2, iqNumPrb[u][antId][sf][firstSym]*12 );
    const iqTypeSym1 = new Uint8Array( iqTypeBuf, iqOffsets[u][antId][sf][firstSym+1]/2, iqNumPrb[u][antId][sf][firstSym+1]*12 );
    const iqTypeSym2 = new Uint8Array( iqTypeBuf, iqOffsets[u][antId][sf][firstSym+2]/2, iqNumPrb[u][antId][sf][firstSym+2]*12 );
    const iqTypeSym3 = new Uint8Array( iqTypeBuf, iqOffsets[u][antId][sf][firstSym+3]/2, iqNumPrb[u][antId][sf][firstSym+3]*12 );

    iqTypeSym0.fill( ZERO, pbch_firstRe, pbch_firstRe + 56 );
    iqTypeSym0.fill( PSS, pbch_firstRe + 56, pbch_firstRe + 183 );
    iqTypeSym0.fill( ZERO, pbch_firstRe + 183, pbch_firstRe + 240 );

    iqTypeSym1.fill( PBCH, pbch_firstRe, pbch_firstRe + 240 );

    iqTypeSym2.fill( PBCH, pbch_firstRe, pbch_firstRe + 48 );
    iqTypeSym2.fill( ZERO, pbch_firstRe + 48, pbch_firstRe + 56 );
    iqTypeSym2.fill( SSS, pbch_firstRe + 56, pbch_firstRe + 183 );
    iqTypeSym2.fill( ZERO, pbch_firstRe + 183, pbch_firstRe + 192 );
    iqTypeSym2.fill( PBCH, pbch_firstRe + 192, pbch_firstRe + 240 );

    iqTypeSym3.fill( PBCH, pbch_firstRe, pbch_firstRe + 240 );

    for( let k = pbch_dmrsFirstReSym1_3; k <= pbch_dmrsLastReSym1_3; k += 4 ) iqTypeSym1[k] = iqTypeSym3[k] = PBCH_DMRS;
    for( let k = pbch_dmrsFirstReSym2Top; k <= pbch_dmrsLastReSym2Top; k += 4 ) iqTypeSym2[k] = PBCH_DMRS;
    for( let k = pbch_dmrsFirstReSym2Bottom; k <= pbch_dmrsLastReSym2Bottom; k += 4 ) iqTypeSym2[k] = PBCH_DMRS;
}

function nr_validate_is_SSB(PSS_iq,ZERO_iq){
    const MIN_ACCEPTABLE_CORRELATION = 0.8;
    const MIN_ACCEPTABLE_PSS_ZERO_AMP_RATIO = 12; //lowest PSS must have x times higher amp than highest ZERO

    //1.Validate PSS correlation
    let res = decode_PSS(PSS_iq);
    const correls = res.N_ID_2_corr.split(",").map( corr => parseFloat(corr));
    const best_correl = Math.max(...correls);

    if(isNaN(best_correl) || best_correl < MIN_ACCEPTABLE_CORRELATION) return false;

    //2.Validate ZERO channel amplitude
    let lowest_PSS_amp = 90000;
    let highest_ZERO_amp = -1;
    for(let i = 0; i < PSS_iq.v_i.length; i++){
        let amp = Math.sqrt( PSS_iq.v_q[i] ** 2 + PSS_iq.v_i[i] ** 2 );
        lowest_PSS_amp = Math.min(amp,lowest_PSS_amp);
    }

    for(let i = 0; i < ZERO_iq.v_i.length; i++){
        let amp = Math.sqrt( ZERO_iq.v_q[i] ** 2 + ZERO_iq.v_i[i] ** 2 );
        highest_ZERO_amp = Math.max(amp,highest_ZERO_amp);
    }

    if(lowest_PSS_amp / MIN_ACCEPTABLE_PSS_ZERO_AMP_RATIO <= highest_ZERO_amp) return false;

    return true;
}

function nr_autodetect_SSB_and_adjust_config(){
    const antId = configDialog_antenna.value.indexOf("RoE") === -1  ? (parseInt(configDialog_antenna.value) + 65536).toString() :  configDialog_antenna.value; //Roe antId works different
    const u = parseInt(configureDialog_u.value);
    if(iqNumPrb[u] === null || !iqNumPrb[u][antId]) return false;
    let ssbStartIndexes;
    if(u !== 1){
        ssbStartIndexes = nr_pbchConfig[ config.cell.pbch_case].indexes.map((val,idx) => [idx,val]);
    }
    else{
        //We have to memorize indexes in nr_pbchConfig to show proper 
        const indexesForB = nr_pbchConfig["B"].indexes.map((val,idx) => [idx,val]);
        const indexesForC = nr_pbchConfig["C"].indexes.map((val,idx) => [idx,val]).filter((valArr,idx) => indexesForB[idx][1] != valArr[1]);
        ssbStartIndexes = indexesForB.concat(indexesForC);
        ssbStartIndexes = ssbStartIndexes.sort((a, b) => a[1] - b[1]);
    }
    const manyPossibleCases = u === 1; //Case B or Case C for u=1

    const SSB_SIZE = 240;
    const PSS_SIZE = SSS_SIZE = 127;
    const PSS_OFFSET = SSS_OFFSET = 56;

    let symbols_with_pss = [];
    let firstSSBAlreadyFound = false;
    const low_sf_bound = 10*Math.floor( iqFirstSubframe[u][antId] / 10 ); //align with frame
    const high_sf_bound = Math.min(iqFirstSubframe[u][antId] + 32, iqNumPrb[u][antId].length); //Limited to 32 subframes, so that algorithm doesn't check 200 subframes
    let highestIndex = -1;
    for(let firstSF = low_sf_bound; firstSF < high_sf_bound; firstSF+=5){ //jump by half-frame
        for(let [index,symbolInHF] of ssbStartIndexes){ //index is index in nr_pbchConfig
            const sf = Math.floor(firstSF + symbolInHF / NUM_OF_SYM_IN_SF_PER_U[u]);
            const symbol = symbolInHF % NUM_OF_SYM_IN_SF_PER_U[u];

            if(!iqNumPrb[u][antId][sf] || !iqNumPrb[u][antId][sf][symbol] || iqNumPrb[u][antId][sf][symbol] < 20) continue;
            let firstSC = firstSSBAlreadyFound ? config.cell.pbch_prbOffset * 12 + config.cell.pbch_scOffset : 12*iqStartPrb[u][antId][sf][symbol];
            let lastSC = firstSSBAlreadyFound ? firstSC+1 : (iqStartPrb[u][antId][sf][symbol] + iqNumPrb[u][antId][sf][symbol])*12 - SSB_SIZE + 1;

            for(let sc = firstSC; sc < lastSC; sc+=1){
                let PSS_iq = superselect_and_get(-1, u, parseInt(antId), symbol % 14, (symbol+1) % 14, Math.floor(sf/10), sf % 10, Math.floor(symbol/14), sc + PSS_OFFSET, sc + PSS_SIZE + PSS_OFFSET );
                let ZERO_iq = superselect_and_get(-1, u, parseInt(antId), symbol % 14, (symbol+1) % 14, Math.floor(sf/10), sf % 10, Math.floor(symbol/14), sc , sc + PSS_OFFSET );

                if(!nr_validate_is_SSB(PSS_iq,ZERO_iq)) continue;

                if(!firstSSBAlreadyFound){
                    const decoded_pss = decode_PSS(PSS_iq);

                    const sss_slot = Math.floor((symbol + 2) / 14);
                    const SSS_iq = superselect_and_get(-1, u, parseInt(antId), (symbol+2)%14, (symbol+3)%14, Math.floor(sf/10), sf % 10, sss_slot, sc + SSS_OFFSET, sc + SSS_SIZE + SSS_OFFSET )
                    const decoded_sss = decode_SSS(SSS_iq,decoded_pss.N_ID_2);

                    config.cell.pci = 3*decoded_sss.N_ID_1 + decoded_pss.N_ID_2;
                    config.cell.pdcch_nID = config.cell.pci;
                    config.cell.csirs_scramblingID = config.cell.pci;

                    config.cell.pbch_halfFrameOffset = Math.floor(firstSF / 5);
                    config.cell.pbch_prbOffset = Math.floor(sc/12);
                    config.cell.pbch_scOffset = sc % 12;

                    firstSSBAlreadyFound = true;
                }
                symbols_with_pss.push( (symbol + sf*NUM_OF_SYM_IN_SF_PER_U[u]) );
                highestIndex = Math.max(index,highestIndex);
                if(index >= 4 && u < 3) config.cell.carrierFrequency = "3_6";
                break;
            }
        }
    }

    if(symbols_with_pss.length === 0){
        config.cell.pci = 0;
        config.cell.pbch_halfFrameOffset = 0;
        config.cell.pbch_prbOffset = 0;
        config.cell.pbch_numOfBlocks = 0;
        config.cell.pbch_scOffset = 0;
        configDialog.setToUI();
        return false;
    }

    if(manyPossibleCases){ //There are 2 possible SSB cases for u=1 -> B and C, this ambiguity is solved based on indexes of found ssbs
        let true_case = "B";
        for(let symbol_absolute of symbols_with_pss){
            const symbol =  Math.floor(symbol_absolute % NUM_OF_SYM_IN_SF_PER_U[u]);
            if( !nr_pbchConfig["B"].indexes.includes(symbol) ){
                true_case = "C";
                break;
            }
            else if(!nr_pbchConfig["C"].indexes.includes(symbol)){
                true_case = "B";
                break;
            }
        }
        config.cell.pbch_case = true_case;
    }

    //This part adjusts the periodicity field based on indexes
    let least_hf_period = 32;
    let worthFurtherChecking = true; //to escape loop early
    let foundAtLeastOne = false; //if no repetition is found, the default will be set
    symbols_with_pss.sort((a, b) => a - b);
    for(let symbol of symbols_with_pss){
        for(let hf_period of [1,2,4,8,16,32]){
            const next_symbol = symbol + NUM_OF_SYM_IN_SF_PER_U[u] * 5 * hf_period;
            if(symbols_with_pss.includes(next_symbol)){
                foundAtLeastOne = true;
                least_hf_period = Math.min(hf_period,least_hf_period);
                if(hf_period === 1) worthFurtherChecking = false;
                break;
            }
        }
        if(!worthFurtherChecking) break;
    }

    if(!foundAtLeastOne){
        least_hf_period = 4; //4.1 of 38213 says that the default is 4 half-frames
    }

    config.cell.pbch_periodicity = least_hf_period * 5;
    config.cell.pbch_numOfBlocks = highestIndex + 1; //nr_pbchConfig[ config.cell.pbch_case].indexes.length;
    configDialog.setToUI();
    return true;
}

//Assumptions:
//- only 1 prach configuration exists in the file
//Important Notes:
//1. Long prach in ecpri can be only on u=6 (1.25KHz), it might be FDD or TDD, this is determined by numerology of non-prach iq, by default TDD is assumed.
//2. Only u={1,3,5} carries short prach, u = 0 is FDD and other ones are TDD
//3. Long prach format (0vs1) is determined based on ecpri msg2 packets that carry cpLength field as described in ORAN WG4.CUS.0-R003, if absent format 0 is assumed.
//4. Number of equal sectionId in consecutive symbols in slot indicates short prach duration (based on Adam's knowledge)
//5. Each used short format in Nokia has different symbol duration, therefore duration determines short format
//6. prach_on_first_set_of_allowed_slots indicates whether at least one prach packet occured within slots permitted by 'slots in sf' = 1 for F1 or 'slots in 60khz slot' = 1 for FR2
//7. prach_on_other_slots === true after for loop indicates that returned cfg indices must have: 'slots in sf' = 2 for F1 or 'slots in 60khz slot' = 2 for FR2
//8. Two previous rows don't apply if prach is on u=6 or u=0 (u=0 has 1 slot per subframe) and those variables should be ignored
function nr_autodetect_prach_cfg_idx() {
    let prach_locations = {}; //["rtcId"]["frame+subframe*10"]["slot"]["sectionId"] for short prach and unused for long prach
    const prach_table_types = ["NONE","FR1_FDD", "FR1_TDD","FR2"];
    const short_prach_formats_from_duration = {2 : "C0", 4 : "A2", 6 : "C2", 12 : "B4"}
    let prach_table_type = prach_table_types[0], isLongPrach = false, prach_duration = -1, prach_preamble_format = "", prach_table = null;
    let prach_slots = new Set(), prach_frames = new Set(), prach_subframes = new Set(), prach_symbols = new Set(); //Slots only applicable to FR2, subframes applicable only to FR1
    let prach_antennas = new Set(); //strings "(u:rtcId)" of antennas with prach. Used for non-coherent combining

    //first set of slots are slots allowed by 5.3.2 of 38211 when 'slots in sf' = 1 for F1 or 'slots in 60khz slot' = 1 for FR2
    let prach_on_first_set_of_allowed_slots = false, prach_on_other_slots = false;
    let prach_allowed_cfg = { //cfg indexes allowed by Gates
        "FR1_FDD" : {
            "0" : [8,9,10,11,12,13,14,15],
            "1" : [36,37,38,39,40,41,42,43]
        },
        "FR1_TDD" : {
            "A2" : [87,88,89,90,92,93,94,96,97,98,100,101,102,104],
            "B4" : [145,146,147,148,149,150,151,152,156,157,158,159,160,161,162],
            "C2" : [189,190,191,192,194,195,196,197,198,201,202,203,205,206],
            "0" : [0,1,2,3,4,5,6,7,9,12,14,17],
        },
        "FR2" : {
            "A2" : [31,34,38,41,43,52,53],
            "C2" : [175,177,178,182,185,187,196],
            "C0" : [146,149,153,156,158,166,167],
            "B4" : [114,117,118,121,122,124,125,126,127,128,133,135,136]
        }
    }

    for (let i = 0; i < packetsLength; i++) {
        let packet = packets[i].ecpri;
        if(packet === undefined || ![1,3].includes(packet.filterIndex)) continue;

        if(packet.message === 2 && packet.filterIndex === 1){ //Long prach 0 vs 1 is determined based on cyclic prefix length, if no such packet is found, 0 will be assumed
            const cpLengthInPacket = packet.cpLength;
            if(!cpLengthInPacket) continue;
            const trueCpLength = cpLengthInPacket * 1/(30.72 * 10**6); //in microseconds
            if(Math.abs(trueCpLength - 103.13) < Math.abs(trueCpLength - 684.38)) prach_preamble_format = "0";
            else prach_preamble_format = "1";
        }
        if(packet === undefined || packet.message !== 0  || !packet.sections) continue;

        const u = ecpri_uInPkt[i], rtcId = packet.rtcId, frame = packet.frameId + packet.hfn*256, subframe = packet.subframeId, subframe_absolute = frame*10 + packet.subframeId;
        const slot = packet.slotId >> (ecpri_maxU - ecpri_uInPkt[i]), sectionId = packet.sections[0].sectionId;

        prach_antennas.add("(" + u + ":" + rtcId+")");

        if(prach_table_type === "NONE"){ //Prach table selection and prach length is determined upon detection of first iqData packet carrying prach, this 'if' executes only once
            isLongPrach = packet.filterIndex === 1;
            if(isLongPrach){
                if(iqBuffers[0]) {prach_table = t38_211_6_3_3_2_2; prach_table_type = prach_table_types[1]} //FDD is assumed if non-prach iq is on u=0, this might be incorrect!
                else {prach_table = t38_211_6_3_3_2_3; prach_table_type = prach_table_types[2] }
            }
            else{
                if(u === 0) {prach_table = t38_211_6_3_3_2_2; prach_table_type = prach_table_types[1]}
                else if(u === 1) {prach_table = t38_211_6_3_3_2_3; prach_table_type = prach_table_types[2] }
                else {prach_table =  t38_211_6_3_3_2_4; prach_table_type = prach_table_types[3] }
            }
        }

        if(!isLongPrach){ //number of equal sectionId per slot indicates short prach duration (based on Adam's knowledge)
            if(!prach_locations[rtcId]) prach_locations[rtcId] = {};
            if(!prach_locations[rtcId][subframe_absolute]) prach_locations[rtcId][subframe_absolute] = {};
            if(!prach_locations[rtcId][subframe_absolute][slot]) prach_locations[rtcId][subframe_absolute][slot] = {};
            if(!prach_locations[rtcId][subframe_absolute][slot][sectionId]) prach_locations[rtcId][subframe_absolute][slot][sectionId] = 1;
            else prach_locations[rtcId][subframe_absolute][slot][sectionId] = prach_locations[rtcId][subframe_absolute][slot][sectionId] + 1;

            prach_duration = Math.max(prach_duration, prach_locations[rtcId][subframe_absolute][slot][sectionId]);
            if([1,3].includes(u)){
                if(slot % 2 === 1) prach_on_first_set_of_allowed_slots = true; //5.3.2 of 38211
                else prach_on_other_slots = true;
            }
            else if([5].includes(u)){
                if(slot % 7 === 0) prach_on_first_set_of_allowed_slots = true;
                else prach_on_other_slots = true;
            }

            prach_symbols.add(packet.startSymbolId)
        }

        if(prach_table_type === "FR2") prach_slots.add(NUM_OF_SLOTS_PER_U[2]*subframe + Math.floor(slot /( 2 ** (u - 2)))); //slot numering in 3gpp for FR2 is in 60kHz
        else prach_subframes.add(subframe);

        prach_frames.add(frame)
    }

    if(!isLongPrach) prach_preamble_format = short_prach_formats_from_duration[prach_duration];
    else if(prach_preamble_format === "") prach_preamble_format = "0"; //If no ecpri.message type 2 for prach was encountered, long prach type 0 is assumed

    const lowestSymbol = Array.from(prach_symbols).sort((a, b) => a - b)[0]; //ignore for long prach

    if(!prach_preamble_format) return -1;
    if(!prach_allowed_cfg[prach_table_type][prach_preamble_format]) return -1;

    let all_valid_cfgs = [], limited_valid_cfgs = []; //limited_valid_cfgs is a subset of all_valid_cfg
    for(let cfgIndex of prach_allowed_cfg[prach_table_type][prach_preamble_format]){
        const config = prach_table[cfgIndex];
        let cfgIndexIsGood = true;

        if(!isLongPrach && lowestSymbol < config.start) continue;
        if(!isLongPrach && prach_on_other_slots && config.slots_in_sf === 1) continue; //for FR2 table's field should be called slots_in_60kHz_slot!

        for(let frame of prach_frames) {
            let found_y = false;
            for(let y of config.y) if(frame % config.x === y) {found_y=true; break;}
            if(!found_y) {cfgIndexIsGood = false; break;}
        }
        if(!cfgIndexIsGood) continue;

        if(prach_table_type === "FR2"){ //Note that table t38_211_6_3_3_2_4 in bba has field called ,,sf" but it should be called slot!
            for(let slot of prach_slots) if(!config.sf.includes(slot)){ cfgIndexIsGood = false; break; }
        }
        else{
            for(let subframe of prach_subframes) if(!config.sf.includes(subframe)){ cfgIndexIsGood = false; break; }
        }
        if(!cfgIndexIsGood) continue;

        all_valid_cfgs.push(cfgIndex);
        if(!isLongPrach && ((prach_on_first_set_of_allowed_slots && prach_on_other_slots) === false && config.slots_in_sf === 2)) continue; //This might be too strict
        limited_valid_cfgs.push(cfgIndex);
    }

    config.cell.prachAntennasToCombine = Array.from(prach_antennas.values()).join(",");
    configDialog.setToUI();
    if(all_valid_cfgs.length === 0){
        configDialog_setPrachCfgIdx_help(undefined);
        return -1;
    }
    config.cell.prachTable = prach_table_type;
    configDialog_setPrachCfgIdx_help(all_valid_cfgs) //Displays all valid cfgs for the user
    if(limited_valid_cfgs.length > 0) return limited_valid_cfgs[0]; //First one is returned as it has the most strict frameId limitations
    return all_valid_cfgs[0];
}
