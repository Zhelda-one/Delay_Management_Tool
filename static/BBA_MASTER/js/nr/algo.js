//This file is intended for generic NR functions and procedures (mostly chapters 5 of 38211 and 5 of 38212)

//Table 5.3.1.1-1: Interleaving Pattern PI_IL_max(m)
const t38_212_5_3_1_1_1 = [
    0,2,4,7,9,14,19,20,24,25,26,28,31,34,42,45,49,50,51,53,54,56,58,59,61,62,65,66,
    67,69,70,71,72,76,77,81,82,83,87,88,89,91,93,95,98,101,104,106,108,110,111,113,115,118,119,120,
    122,123,126,127,129,132,134,138,139,140,1,3,5,8,10,15,21,27,29,32,35,43,46,52,55,57,60,63,
    68,73,78,84,90,92,94,96,99,102,105,107,109,112,114,116,121,124,128,130,133,135,141,6,11,16,22,30,
    33,36,44,47,64,74,79,85,97,100,103,117,125,131,136,142,12,17,23,37,48,75,80,86,137,143,13,18,
    38,144,39,145,40,146,41,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163
];

//Table 5.3.1.2-1: Polar sequence Q_0_Nmax-1 and its corresponding reliability W
const t38_212_5_3_1_2_1 = [
    0,    1,    2,    4,    8,   16,   32,    3,    5,   64,    9,    6,   17,   10,   18,  128,
    12,   33,   65,   20,  256,   34,   24,   36,    7,  129,   66,  512,   11,   40,   68,  130,
    19,   13,   48,   14,   72,  257,   21,  132,   35,  258,   26,  513,   80,   37,   25,   22,
    136,  260,  264,   38,  514,   96,   67,   41,  144,   28,   69,   42,  516,   49,   74,  272,
    160,  520,  288,  528,  192,  544,   70,   44,  131,   81,   50,   73,   15,  320,  133,   52,
    23,  134,  384,   76,  137,   82,   56,   27,   97,   39,  259,   84,  138,  145,  261,   29,
    43,   98,  515,   88,  140,   30,  146,   71,  262,  265,  161,  576,   45,  100,  640,   51,
    148,   46,   75,  266,  273,  517,  104,  162,   53,  193,  152,   77,  164,  768,  268,  274,
    518,   54,   83,   57,  521,  112,  135,   78,  289,  194,   85,  276,  522,   58,  168,  139,
    99,   86,   60,  280,   89,  290,  529,  524,  196,  141,  101,  147,  176,  142,  530,  321,
    31,  200,   90,  545,  292,  322,  532,  263,  149,  102,  105,  304,  296,  163,   92,   47,
    267,  385,  546,  324,  208,  386,  150,  153,  165,  106,   55,  328,  536,  577,  548,  113,
    154,   79,  269,  108,  578,  224,  166,  519,  552,  195,  270,  641,  523,  275,  580,  291,
    59,  169,  560,  114,  277,  156,   87,  197,  116,  170,   61,  531,  525,  642,  281,  278,
    526,  177,  293,  388,   91,  584,  769,  198,  172,  120,  201,  336,   62,  282,  143,  103,
    178,  294,   93,  644,  202,  592,  323,  392,  297,  770,  107,  180,  151,  209,  284,  648,
    94,  204,  298,  400,  608,  352,  325,  533,  155,  210,  305,  547,  300,  109,  184,  534,
    537,  115,  167,  225,  326,  306,  772,  157,  656,  329,  110,  117,  212,  171,  776,  330,
    226,  549,  538,  387,  308,  216,  416,  271,  279,  158,  337,  550,  672,  118,  332,  579,
    540,  389,  173,  121,  553,  199,  784,  179,  228,  338,  312,  704,  390,  174,  554,  581,
    393,  283,  122,  448,  353,  561,  203,   63,  340,  394,  527,  582,  556,  181,  295,  285,
    232,  124,  205,  182,  643,  562,  286,  585,  299,  354,  211,  401,  185,  396,  344,  586,
    645,  593,  535,  240,  206,   95,  327,  564,  800,  402,  356,  307,  301,  417,  213,  568,
    832,  588,  186,  646,  404,  227,  896,  594,  418,  302,  649,  771,  360,  539,  111,  331,
    214,  309,  188,  449,  217,  408,  609,  596,  551,  650,  229,  159,  420,  310,  541,  773,
    610,  657,  333,  119,  600,  339,  218,  368,  652,  230,  391,  313,  450,  542,  334,  233,
    555,  774,  175,  123,  658,  612,  341,  777,  220,  314,  424,  395,  673,  583,  355,  287,
    183,  234,  125,  557,  660,  616,  342,  316,  241,  778,  563,  345,  452,  397,  403,  207,
    674,  558,  785,  432,  357,  187,  236,  664,  624,  587,  780,  705,  126,  242,  565,  398,
    346,  456,  358,  405,  303,  569,  244,  595,  189,  566,  676,  361,  706,  589,  215,  786,
    647,  348,  419,  406,  464,  680,  801,  362,  590,  409,  570,  788,  597,  572,  219,  311,
    708,  598,  601,  651,  421,  792,  802,  611,  602,  410,  231,  688,  653,  248,  369,  190,
    364,  654,  659,  335,  480,  315,  221,  370,  613,  422,  425,  451,  614,  543,  235,  412,
    343,  372,  775,  317,  222,  426,  453,  237,  559,  833,  804,  712,  834,  661,  808,  779,
    617,  604,  433,  720,  816,  836,  347,  897,  243,  662,  454,  318,  675,  618,  898,  781,
    376,  428,  665,  736,  567,  840,  625,  238,  359,  457,  399,  787,  591,  678,  434,  677,
    349,  245,  458,  666,  620,  363,  127,  191,  782,  407,  436,  626,  571,  465,  681,  246,
    707,  350,  599,  668,  790,  460,  249,  682,  573,  411,  803,  789,  709,  365,  440,  628,
    689,  374,  423,  466,  793,  250,  371,  481,  574,  413,  603,  366,  468,  655,  900,  805,
    615,  684,  710,  429,  794,  252,  373,  605,  848,  690,  713,  632,  482,  806,  427,  904,
    414,  223,  663,  692,  835,  619,  472,  455,  796,  809,  714,  721,  837,  716,  864,  810,
    606,  912,  722,  696,  377,  435,  817,  319,  621,  812,  484,  430,  838,  667,  488,  239,
    378,  459,  622,  627,  437,  380,  818,  461,  496,  669,  679,  724,  841,  629,  351,  467,
    438,  737,  251,  462,  442,  441,  469,  247,  683,  842,  738,  899,  670,  783,  849,  820,
    728,  928,  791,  367,  901,  630,  685,  844,  633,  711,  253,  691,  824,  902,  686,  740,
    850,  375,  444,  470,  483,  415,  485,  905,  795,  473,  634,  744,  852,  960,  865,  693,
    797,  906,  715,  807,  474,  636,  694,  254,  717,  575,  913,  798,  811,  379,  697,  431,
    607,  489,  866,  723,  486,  908,  718,  813,  476,  856,  839,  725,  698,  914,  752,  868,
    819,  814,  439,  929,  490,  623,  671,  739,  916,  463,  843,  381,  497,  930,  821,  726,
    961,  872,  492,  631,  729,  700,  443,  741,  845,  920,  382,  822,  851,  730,  498,  880,
    742,  445,  471,  635,  932,  687,  903,  825,  500,  846,  745,  826,  732,  446,  962,  936,
    475,  853,  867,  637,  907,  487,  695,  746,  828,  753,  854,  857,  504,  799,  255,  964,
    909,  719,  477,  915,  638,  748,  944,  869,  491,  699,  754,  858,  478,  968,  383,  910,
    815,  976,  870,  917,  727,  493,  873,  701,  931,  756,  860,  499,  731,  823,  922,  874,
    918,  502,  933,  743,  760,  881,  494,  702,  921,  501,  876,  847,  992,  447,  733,  827,
    934,  882,  937,  963,  747,  505,  855,  924,  734,  829,  965,  938,  884,  506,  749,  945,
    966,  755,  859,  940,  830,  911,  871,  639,  888,  479,  946,  750,  969,  508,  861,  757,
    970,  919,  875,  862,  758,  948,  977,  923,  972,  761,  877,  952,  495,  703,  935,  978,
    883,  762,  503,  925,  878,  735,  993,  885,  939,  994,  980,  926,  764,  941,  967,  886,
    831,  947,  507,  889,  984,  751,  942,  996,  971,  890,  509,  949,  973, 1000,  892,  950,
    863,  759, 1008,  510,  979,  953,  763,  974,  954,  879,  981,  982,  927,  995,  765,  956,
    887,  985,  997,  986,  943,  891,  998,  766,  511,  988, 1001,  951, 1002,  893,  975,  894,
    1009,  955, 1004, 1010,  957,  983,  958,  987, 1012,  999, 1016,  767,  989, 1003,  990, 1005,
    959, 1011, 1013,  895, 1006, 1014, 1017, 1018,  991, 1020, 1007, 1015, 1019, 1021, 1022, 1023
];

//Performs polynomial division in 2-element Galois Field (only possible coefficients are {0,1})
//inputPoly1 and inputPoly2 are binary arrays representing polynomials
//Returns remainder p = inputPoly1 % inputPoly2
function algo_divPolyInGF2(inputPoly1,inputPoly2){
    let poly1 = inputPoly1.slice(0, inputPoly1.length); //to make a copy
    const poly2 = inputPoly2;
    const poly1Size = poly1.length, poly2Size = poly2.length;

    for(let i = 0; i < poly1Size - poly2Size + 1; i++){
        if(poly1[i] == 0) continue;

        for(let j = 0; j < poly2Size; j++){
            poly1[i + j] ^= poly2[j];
        }
    }

    return poly1.slice(poly1Size - poly2Size + 1,poly1Size);
}

//Based partially on 5.3.1.2 of 38212 (Polar encoding)
function algo_getKroneckerMatrix(N){
    const G2 = [[1,0], [1,1]];
    let GN = [[1,0],[1,1]];

    while(GN.length < N){ //PROD = GN*G2 then GN <- PROD and repeat
        const m = GN.length, n = GN[0].length, p = G2.length, q = G2[0].length;
        const PROD = new Array(m * p);
        for(let i = 0; i < m * p; i++) PROD[i] = new Array(n * q).fill(0);

        for(let i = 0; i < m; i++){
            for(let j = 0; j < n; j++){
                if(GN[i][j] === 0) continue;
                for(let k = 0; k < p; k++){
                    for(let l = 0; l < q; l++){
                        PROD[i*p + k][j * q + l] = GN[i][j] * G2[k][l];
                    }
                }
            }
        }

        GN = PROD;
    }

    return GN;
}

//Based on 5.4.1.1 of 38212 (Sub-block interleaving)
//Returns the J pattern used for rate matching after polar coding.
function algo_getInterleaverPattern(N){
    const P = [0, 1, 2, 4, 3, 5, 6, 7, 8, 16, 9, 17, 10, 18, 11, 19, 12, 20, 13, 21, 14, 22, 15, 23, 24, 25, 26, 28, 27, 29, 30, 31];
    const J = new Array(N);
    for(let n = 0; n < N; n++){
        const i = Math.floor(32*n/N);
        J[n] = P[i] * (N / 32) + (n % (N/32));
    }
    return J;
}

//Based on 5.4.1.1 of 38212 (Sub-block interleaving)
function algo_get_Q_bar_I_N(K,N,E,n_PC){
    let Q_bar_F_tmp_N = [];
    const J = algo_getInterleaverPattern(N);
    if(E < N){
        if( K/E <= 7/16){ //puncturing
            for(let n = 0; n < N - E; n++){
                if(!Q_bar_F_tmp_N.includes(J[n])) Q_bar_F_tmp_N.push(J[n]);
            }

            if( E >= 3*N/4){
                for(let i = 0; i <= Math.ceil(3*N/4 - E/2) -1; i++) if(!Q_bar_F_tmp_N.includes(i)) Q_bar_F_tmp_N.push(i);
            }
            else{
                for(let i = 0; i <= Math.ceil(9*N/16 - E/4) -1; i++) if(!Q_bar_F_tmp_N.includes(i)) Q_bar_F_tmp_N.push(i);
            }
        }
        else{ //shortening
            for(let n = E; n < N; n++){
                Q_bar_F_tmp_N.push(J[n]);
            }
        }
    }

    const Q_0_Nmax = t38_212_5_3_1_2_1;
    let Q_0_N = [];
    for( let i = 0; i < Q_0_Nmax.length; i++){
        if (Q_0_Nmax[i]<N){
            Q_0_N.push(Q_0_Nmax[i]);
        }
    }

    const Q_bar_I_tmp_N = Q_0_N.filter(item => !Q_bar_F_tmp_N.includes(item));
    const Q_bar_I_N = Q_bar_I_tmp_N.slice(Q_bar_I_tmp_N.length - (K + n_PC),Q_bar_I_tmp_N.length); //K+n_PC most reliable indices, where reliability defined in 5-3-1-2 by W()
    // const Q_bar_F_N = Q_0_N.filter(item => !Q_bar_I_N.includes(item)); //doesnt seem to useful for pdcch
    return Q_bar_I_N;
}

//Based on 5.3.1.1 of 38212 (Interleaving)
function algo_getPolarCRCInterleaverPattern(K,I_IL) {
    const Pi = new Array(K);
    if(I_IL == 0){
        for(let k = 0; k < K; k++) PI[k] = k;
    }
    else{
        const K_IL_max = 164;
        const Pi_IL_max = t38_212_5_3_1_1_1;
        let k=0;
        for( let m=0; m < K_IL_max; m++){
            if ( Pi_IL_max[m] >= K_IL_max - K ){
                Pi[k++] = Pi_IL_max[m]-(K_IL_max - K);
            }
        }
    }

    return Pi;
}

//Based on 5.3.1 of 38212 (Polar coding)
function algo_get_N(K,E,n_max){
    let n1, n2;

    if(E <= (9/8) * 2**( Math.ceil(Math.log2(E) ) - 1) && K/E < 9/16){
        n1 = Math.ceil(Math.log2(E)) - 1;
    }
    else {
        n1 = Math.ceil(Math.log2(E))
    }
    const R_min = 1/8;
    n2 = Math.ceil(Math.log2(K/R_min));
    const n_min = 5;
    const n = Math.max(Math.min(n1, n2, n_max), n_min);
    return 2**n; //N
}

//Based on 5.1 of 38212 (CRC calculation)
function algo_attachCRC(a,g_CRC){
    const padded = a.concat( new Array(g_CRC.length - 1).fill(0) );
    const p = algo_divPolyInGF2(padded,g_CRC);
    return p;
}

//Reverses the effect of algo_attachCRC
//Returns bits without CRC and error (no error when all bits set to 0)
function algo_detachCRC(b,g_CRC){
    const error = algo_divPolyInGF2(b,g_CRC);
    const L = g_CRC.length - 1;

    const a = b.slice(0,b.length - L);
    return [a,error];
}

//Based on 5.3.1 of 38212 (Polar coding)
function algo_polarCoding(c,E,n_max,I_IL,n_PC,n_PC_wm){
    //5.3.1.1 Interleaving
    const K = c.length;
    const PI = algo_getPolarCRCInterleaverPattern(K,I_IL);
    let c_prim = new Array(K);
    for(let k = 0; k < K; k++) c_prim[k] = c[PI[k]];

    //5.3.1.2 Polar encoding
    const N = algo_get_N(K,E,n_max);
    const Q_bar_I_N = algo_get_Q_bar_I_N(K,N,E,n_PC);

    let u = new Array(N);
    let k = 0;
    if(n_PC > 0){
        console.log("Error: n_PC > 0 is not supported in algo_polarCoding");
        return null;
    }
    else{
        for(let n = 0; n < N; n++){
            if(Q_bar_I_N.includes(n)){
                u[n] = c_prim[k];
                k++;
            }
            else u[n] = 0;
        }
    }

    const G = algo_getKroneckerMatrix(N);
    let d = new Array(N).fill(0);
    for(let col = 0; col < N; col++){
        for(let row = 0; row < N; row++){
            d[col] += u[row] * G[row][col];
        }
        d[col] %= 2; //Galois Field(2)
    }

    return d;

}

//Reverses the effect of algo_polarCoding
function algo_polarDecoding(d,K,E,n_max,I_IL,n_PC,n_PC_wm){
    //5.3.1.2 Polar encoding
    const N = d.length;
    const G = algo_getKroneckerMatrix(N);

    let u = new Array(N).fill(0);
    for(let col = 0; col < N; col++){
        for(let row = 0; row < N; row++){
            u[col] += d[row] * G[row][col];
        }
        u[col] %= 2; //Galois Field(2)
    }

    const Q_bar_I_N = algo_get_Q_bar_I_N(K,N,E,n_PC);
    let c_prim = new Array(K);
    let k = 0;
    if(n_PC > 0){
        console.log("Error: n_PC > 0 is not supported in algo_polarDecoding");
        return null;
    }
    else{
        for(let n = 0; n < N; n++){
            if(Q_bar_I_N.includes(n)){
                c_prim[k++] = u[n];
            }
        }
    }

    //5.3.1.1 Interleaving
    const PI = algo_getPolarCRCInterleaverPattern(K,I_IL);
    let c = new Array(K);
    for(let k = 0; k < K; k++) c[PI[k]] = c_prim[k];

    return c;
}

//Based on 7.3.4 and 5.4.1 of 38212 (Rate matching for Polar Code)
function algo_matchRateForPolarCode(d,K,E,I_BIL){

    const N = d.length;

    //5.4.1.1 Sub-block interleaving
    const J = algo_getInterleaverPattern(N);
    const y = new Array(N);
    for(let n = 0; n < N; n++){
        y[n] = d[ J[n] ];
    }

    //5.4.1.2 Bit selection
    let e = new Array(E);
    if(E >= N){ //repetition
        for(let k = 0; k < E; k++) e[k] = y[k % N];
    }
    else{
        if( K/E <= 7/16){ //puncturing
            for(let k = 0; k < E; k++) e[k] = y[k + N - E];
        }
        else{ //shortening
            for(let k = 0; k < E;k++) e[k] = y[k];
        }
    }

    //5.4.1.3 Interleaving of coded bits
    let f;
    if(I_BIL === 1){
        console.log("Error: Interleaving is not yet supported");
        return null;
    }
    else{
        f = e;
    }

    return f;
}

//Reverses the effect of algo_matchRateForPolarCode
function algo_deMatchRateForPolarCode(f,K,n_max,I_BIL){
    const E = f.length;

    //5.4.1.3 Interleaving of coded bits
    let e;
    if(I_BIL === 1){
        console.log("Error: deinterleaving is not yet supported");
        return null;
    }
    else{
        e = f;
    }

    //5.4.1.2 Bit selection
    const N = algo_get_N(K,E,n_max);
    let y = new Array(N);
    if(E >= N){ //undo repetition
        y = e.slice(0,N);
    }
    else{
        if( K/E <= 7/16){ //undo puncturing
            for(let k = 0; k < N - E; k++) y[k] = 0;
            for(let k = 0; k < E; k++) y[k + N - E] = e[k];
        }
        else{ //undo shortening
            //not supported
            console.log("Error: deShortening is not supported");
        }
    }

    //5.4.1.1 Sub-block interleaving
    const J = algo_getInterleaverPattern(N);
    let d = new Array(N);
    for(let n = 0; n < N; n++){
        d[J[n]] = y[n];
    }

    return d;
}

//Based on 5.1.3 of 38211 (QPSK)
function algo_modulateQPSK(b){
    let d = {"v_i" : [], "v_q" : []};

    const sqrtInv = Math.pow(2,-1/2);

    for(let i = 0; i < b.length; i+=2){
        d.v_i.push( sqrtInv * (1 - 2*b[i]) );
        d.v_q.push( sqrtInv * (1 - 2*b[i + 1]) );
    }

    return d;
}

//Reverses the effect of algo_modulateQPSK
function algo_demodulateQPSK(real, imag){
    /* Hard QPSK demodulator. */
    /*         |
     *   * 10  |   * 00
     *         |
     * --------+---------
     *         |
     *   * 11  |   * 01
     *         |
     */

    let b = []
    for(let i = 0; i < real.length; i++){
        if(real[i] >= 0) b.push(0);
        else b.push(1);

        if(imag[i] >= 0) b.push(0);
        else b.push(1);
    }
    return b;
}