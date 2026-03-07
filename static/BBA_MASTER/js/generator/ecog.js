// @ts-check
// 'use strict';

const mac_addr_regex_str = '^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$';
const mac_addr_regex = new RegExp(mac_addr_regex_str);

const allowed_u = {
    //      0,1,2,3,4
    'FR1': [1,1,1,0,0],
    'FR2': [0,0,1,1,1] };

const max_prb_per_u = {
    'FR1': [ 270, 273, 135,   0,   0 ],
    'FR2': [   0,   0, 264, 264, 132 ] };

const allowed_pbch_cases = {
    //      A,B,C,D,E
    'FR1': [1,1,1,0,0],
    'FR2': [0,0,0,1,1] };

const pbch_configs = {
    'A': { 'u':0, 'indexes': [2,8],                    'n_step': 14, 'max_n': 4 },
    'B': { 'u':1, 'indexes': [4,8,16,20],              'n_step': 28, 'max_n': 1 },
    'C': { 'u':1, 'indexes': [2,8],                    'n_step': 14, 'max_n': 9 },
    'D': { 'u':3, 'indexes': [4,8,16,20],              'n_step': 28, 'max_n': 18 },
    'E': { 'u':4, 'indexes': [8,12,16,20,32,36,40,44], 'n_step': 56, 'max_n': 8 } };

const prach_preamble_formats = {
    "0"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "Nu":  24576 /* *K / 2^-u */, "N_RA_CP": 3168/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "1"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "Nu":2*24576 /* *K / 2^-u */, "N_RA_CP":21024/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "2"  : { "Lra":839, "Df_RA": 1250 /* *2^u */, "Nu":4*24576 /* *K / 2^-u */, "N_RA_CP": 4688/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "3"  : { "Lra":839, "Df_RA": 5000 /* *2^u */, "Nu": 4*6144 /* *K / 2^-u */, "N_RA_CP": 3168/* *K / 2^-u */, "Restricted_set": [], "duration": 0 },
    "A1" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 2*2048 /* *K / 2^-u */, "N_RA_CP": 288 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "A2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP": 576 /* *K / 2^-u */, "Restricted_set": [], "duration": 4 },
    "A3" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 6*2048 /* *K / 2^-u */, "N_RA_CP": 864 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 },
    "B1" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 2*2048 /* *K / 2^-u */, "N_RA_CP": 216 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "B2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP": 360 /* *K / 2^-u */, "Restricted_set": [], "duration": 4 },
    "B3" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 6*2048 /* *K / 2^-u */, "N_RA_CP": 504 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 },
    "B4" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu":12*2048 /* *K / 2^-u */, "N_RA_CP": 936 /* *K / 2^-u */, "Restricted_set": [], "duration": 12 },
    "C0" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu":   2048 /* *K / 2^-u */, "N_RA_CP":1240 /* *K / 2^-u */, "Restricted_set": [], "duration": 2 },
    "C2" : { "Lra":139, "Df_RA":15000 /* *2^u */, "Nu": 4*2048 /* *K / 2^-u */, "N_RA_CP":2048 /* *K / 2^-u */, "Restricted_set": [], "duration": 6 } };

const prach_configs = {
    'FR1': [ { "format": "0", "x": 16, "y": [1], "sf": [9], "start": 0, "slots_in_sf": NaN, "occasions": NaN, "duration": 0},
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
        { "format": "A3/B3", "x": 1, "y": [0], "sf": [0,1,2,3,4,5,6,7,8,9], "start": 2, "slots_in_sf": 1, "occasions": 2, "duration": 6} ],
    'FR2': [ { "format": "A1", "x": 16, "y": [1], "sf": [4,9,14,19,24,29,34,39], "start": 0, "slots_in_sf": 2, "occasions": 6, "duration": 2},
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
    ]
};

// BB L1 Sync for eCPRI 21A ABIL spec
// eCPRI LL Split U-Plane. Section 5
// T1a_max_up + Tcp_adv_dl; T1a_max_cp_ul; T1a_max_up; Ta3_min
const default_ecpri_advanced = {
    // C-DL C-UL U-DL U-UL
    0: [562, 356, 437, 70],
    1: [470, 336, 345, 50],
    2: [327, 274, 264, 20],
    3: [327, 274, 264, 20],
    4: [327, 274, 264, 20] };

let ecog_config = JSON.parse( JSON.stringify( configDefault.generatorTab ) );

let generated_packets = [];
let iSamples = null;
let qSamples = null;
let iq_5gmax_file = null;

// function isBrowser() {
//     return this.window === this;
// }

function roundTo( num, fix ) { return Number( num.toFixed( fix ) ); }

function clamp( val, min, max ) {
    return val <= min ? min : val >= max ? max : val;
}

function clampArr( val, min, max ) {
    for( let i = 0; i < val.length; ++i ) {
        if( val[i] < min ) val[i] = min;
        if( val[i] > max ) val[i] = max;
    }
}

function pcapSet2( arr, offset, value ) {
    if( ecog_config.pcap_big_endian ) {
        arr[offset]     = value >> 8;
        arr[offset + 1] = value;
    } else {
        arr[offset]     = value;
        arr[offset + 1] = value >> 8;
    }
}

function pcapSet4( arr, offset, value ) {
    if( ecog_config.pcap_big_endian ) {
        arr[offset]     = value >> 24;
        arr[offset + 1] = value >> 16;
        arr[offset + 2] = value >> 8;
        arr[offset + 3] = value;
    } else {
        arr[offset]     = value;
        arr[offset + 1] = value >> 8;
        arr[offset + 2] = value >> 16;
        arr[offset + 3] = value >> 24;
    }
}

let validatePktId = 0;
let validatePktTime = 0;
let validate_error_counter = 0;

function logValidateError( log ) {
    console.log( '[ValidateError][Pkt #' + validatePktId + ' Time: ' + validatePktTime + ']: ' + log );
    ++validate_error_counter;
}

function validate_property( pkt, propName )
{
    if( !pkt.hasOwnProperty( propName ) ) {
        logValidateError( "no property '" + propName + "'" );
        return false;
    }
    return true;
}

function validate_array_property( pkt, propName, minLen, maxLen )
{
    if( validate_property( pkt, propName) ) {
        if( !Array.isArray(pkt[propName]) ) {
            logValidateError( "property '" + propName + "' should be an array" );
        } else if( pkt[propName].length < minLen || pkt[propName].length > maxLen ) {
            logValidateError( "property '" + propName + "' array length should be in range [" + minLen + ', ' + maxLen + '] but given ' + pkt[propName].length );
        }
    }
}

function validate_property_value( pkt, propName, val )
{
    if( validate_property( pkt, propName ) && pkt[propName] !== val ) {
        logValidateError( "property '" + propName + "' should be equal to '" + val + "', but given " + pkt[propName] );
    }
}

function validate_property_array( pkt, propName, arr )
{
    if( validate_property( pkt, propName ) && !arr.includes( pkt[propName] ) ) {
        logValidateError( "property '" + propName + "' should be one of [" + arr + '] but given ' + pkt[propName] );
    }
}

function validate_property_range( pkt, propName, min, max )
{
    if( validate_property( pkt, propName ) && ( pkt[propName] < min || pkt[propName] > max ) ) {
        logValidateError( "property '" + propName + "' should be in range [" + min + ', ' + max + '] but given ' + pkt[propName] );
    }
}

function isBitSet( value, bitIndex )
{
    return (value >> bitIndex) & 1;
}

function is72eStream( eaxcId )
{
    // When 7-2e is enabled certain bits in eaxcId is set for
    // certain type of streams
    if ( isBitSet(eaxcId, 5) || isBitSet(eaxcId, 2) )
    {
        return true;
    }
    return false;
}

function validate_packets()
{
    validate_error_counter = 0;

    for( validatePktId = 0; validatePktId < generated_packets.length; ++validatePktId )
    {
        let is72ePkt = false;
        let pkt = generated_packets[validatePktId];
        let ecpriPayload = 4 + 4;

        validate_property( pkt, 'time' );
        validate_property_value( pkt, 'ecpriVersion', 1 );
        validate_property_value( pkt, 'ecpriConcat', 0 );
        validate_property_array( pkt, 'ecpriMessage', [0, 2, 5, 65] );
        validate_property_range( pkt, 'ecpriPayload', 0, ecog_config.mtu - 4 );

        if( pkt.ecpriMessage !== 5){
            validate_property_range( pkt, 'ecpriRtcid', 0, 0xFFFF );
            validate_property_range( pkt, 'ecpriSeqid', 0, 0xFFFF );
            validate_property_range( pkt, 'dataDirection', 0, 1 );
            validate_property_value( pkt, 'payloadVersion', 1 );
            validate_property_range( pkt, 'frameId', 0, 255 );
            validate_property_range( pkt, 'subframeId', 0, 9 );
            validate_property_range( pkt, 'slotId', 0, 15 );
            validate_property_range( pkt, 'startSymbolId', 0, 13 );
        }

        if (pkt.ecpriMessage !== 65 && pkt.ecpriMessage !== 5)
        {
            validate_property_range( pkt, 'filterIndex', 0, 5 );
            validate_array_property( pkt, 'sections', 1, 255 );
        }

        if ( ecog_config.xirc_beta_enable && is72eStream(pkt.ecpriRtcid) ) {
            is72ePkt = true;
        }

        if( pkt.hasOwnProperty('ecpriMessage') && pkt.hasOwnProperty('ecpriPayload') && pkt.hasOwnProperty('sections') )
        {
            if( pkt.ecpriMessage === 0 ) // IQ data message
            {
                for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
                {
                    ecpriPayload += 4;
                    let pktSect = pkt.sections[sectIdx];

                    validate_property_range( pktSect, 'sectionId', 0, 4095 );
                    validate_property_range( pktSect, 'rb', 0, 1 );
                    validate_property_range( pktSect, 'symInc', 0, 1 );
                    validate_property_range( pktSect, 'startPrbu', 0, 1023 );
                    validate_property_range( pktSect, 'numPrbu', 0, 273 );

                    if( pktSect.hasOwnProperty('startPrbu') && pktSect.hasOwnProperty('numPrbu') )
                    {
                        let iq_bit_width = ecog_config.iq_bit_width;
                        let iq_comp_method = ecog_config.iq_comp_method;
                        let prbNum = pktSect.numPrbu;

                        validate_array_property( pktSect, 'iSample', prbNum * 12, prbNum * 12 );
                        validate_array_property( pktSect, 'qSample', prbNum * 12, prbNum * 12 );

                        if( ecog_config.dynamic_iq_comp ) {
                            ecpriPayload += 2;
                            validate_property_range( pktSect, 'udCompHdr', 0, 255 );
                            if( pktSect.hasOwnProperty('udCompHdr') ) {
                                iq_bit_width = pktSect.udCompHdr >> 4;
                                if( iq_bit_width === 0 ) iq_bit_width = 16;
                                iq_comp_method = pktSect.udCompHdr & 0xF;
                            }
                        }

                        ecpriPayload += [0, 1, 1, 1, 0, 2, 2][iq_comp_method] * prbNum;

                        switch( iq_comp_method )
                        {
                            case 0:
                            case 1:
                            case 2:
                                ecpriPayload += 3 * iq_bit_width * prbNum;
                                break;
                            // TODO
                        }
                    }
                }
            }
            else if( pkt.ecpriMessage === 2 ) // Real-time control data message
            {
                ecpriPayload += 4;
                validate_property_range( pkt, 'numberOfSections', 1, 255 );
                validate_property_array( pkt, 'sectionType', [0, 1, 3, 5, 6, 7] );

                if( pkt.hasOwnProperty('numberOfSections') && pkt.hasOwnProperty('sectionType') )
                {
                    if( pkt.sectionType === 0 || pkt.sectionType === 3 ) {
                        ecpriPayload += 4;
                        validate_property_range( pkt, 'timeOffset', 0, 65535 );
                        validate_property_range( pkt, 'frameStructure', 0, 255 );
                        validate_property_range( pkt, 'cpLength', 0, 65535 );
                        if( pkt.sectionType === 3 ) validate_property_range( pkt, 'udCompHdr', 0, 255 );
                    }
                    else if( pkt.sectionType === 1 || pkt.sectionType === 5 ) {
                        validate_property_range( pkt, 'udCompHdr', 0, 255 );
                    }
                    else if( pkt.sectionType === 6 ) {
                        validate_property_range( pkt, 'numberOfUEs', 0, 255 );
                    }

                    for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
                    {
                        let pktSect = pkt.sections[sectIdx];
                        if( [0, 1, 3, 5].includes( pkt.sectionType ) )
                        {
                            ecpriPayload += 8;
                            validate_property_range( pktSect, 'sectionId', 0, 4095 );
                            validate_property_range( pktSect, 'rb', 0, 1 );
                            validate_property_range( pktSect, 'symInc', 0, 1 );
                            validate_property_range( pktSect, 'startPrbc', 0, 1023 );
                            validate_property_range( pktSect, 'numPrbc', 0, 255 );
                            validate_property_range( pktSect, 'reMask', 0, 4095 );
                            validate_property_range( pktSect, 'numSymbol', 1, 14 );
                            validate_property_range( pktSect, 'ef', 0, 1 );

                            if( pkt.sectionType === 1 || pkt.sectionType === 3 )
                            {
                                validate_property_range( pktSect, 'beamId', 0, 32767 );
                                if( pkt.sectionType === 3 )
                                {
                                    ecpriPayload += 4;
                                    validate_property_range( pktSect, 'freqOffset', -8388608, 8388607 );
                                }
                            }
                            else if( pkt.sectionType === 5 )
                            {
                                validate_property_range( pktSect, 'ueId', 0, 0x7FFF );
                            }
                        }
                        else if( pkt.sectionType === 6 )
                        {
                            ecpriPayload += 8;
                            validate_property_range( pktSect, 'ef', 0, 1 );
                            validate_property_range( pktSect, 'ueId', 0, 0x7FFF );
                            validate_property_range( pktSect, 'regularizationFactor', 0, 0xFFFF );
                            validate_property_range( pktSect, 'rb', 0, 1 );
                            validate_property_range( pktSect, 'symInc', 0, 1 );
                            validate_property_range( pktSect, 'startPrbc', 0, 1023 );
                            validate_property_range( pktSect, 'numPrbc', 0, 255 );
                            validate_array_property( pktSect, 'ciIsample', 0,  );
                            validate_array_property( pktSect, 'ciQsample' );
                            if( pktSect.hasOwnProperty('ciIsample') && pktSect.hasOwnProperty('ciQsample') && pktSect.ciIsample.length !== pktSect.ciQsample.length ) {
                                logValidateError('sectIdx: ' + sectIdx + ' ciIsample.length(' + pktSect.ciIsample.length + ') != ciQsample.length(' + pktSect.ciQsample.length + ')');
                            }
                            // TODO: ci(I/Q)sample
                        }
                        else if( pkt.sectionType === 7 )
                        {
                            validate_property_range( pktSect, 'laaMsgType', 0, 6 );
                            validate_property_range( pktSect, 'lbtHandle', 0, 0xFFFF );

                            if( pktSect.hasOwnProperty('laaMsgType') && pktSect.laaMsgType >= 0 && pktSect.laaMsgType <= 6 )
                            {
                                const laaMsgLenArr = [2, 2, 2, 1, 1, 2, 1];
                                ecpriPayload += 4 * laaMsgLenArr[pktSect.laaMsgType];
                                validate_property_value( pktSect, 'laaMsgLen', laaMsgLenArr[pktSect.laaMsgType] );
                                switch( pktSect.laaMsgType )
                                {
                                    case 0: // LBT_PDSCH_REQ
                                        validate_property_range( pktSect, 'lbtOffset', 0, 999 );
                                        validate_property_range( pktSect, 'lbtMode', 0, 3 );
                                        validate_property_array( pktSect, 'lbtDeferFactor', [1, 3, 74] );
                                        validate_property_range( pktSect, 'lbtBckoffCounter', 0, 1023 );
                                        validate_property_range( pktSect, 'MCOT', 0, 10 );
                                        break;
                                    case 1: // LBT_DRS_REQ
                                        validate_property_range( pktSect, 'lbtOffset', 0, 999 );
                                        validate_property_range( pktSect, 'lbtMode', 0, 3 );
                                        break;
                                    case 2: // LBT_PDSCH_RSP
                                        validate_property_range( pktSect, 'lbtPdschRes', 0, 3 );
                                        validate_property_range( pktSect, 'inParSF', 0, 1 );
                                        validate_property_range( pktSect, 'sfStatus', 0, 1 );
                                        validate_property_range( pktSect, 'sfnSf', 0, 255 );
                                        break;
                                    case 3: // LBT_DRS_RSP
                                        validate_property_range( pktSect, 'lbtDrsRes', 0, 1 );
                                        break;
                                    case 4: // LBT_Buffer_Error
                                        validate_property_range( pktSect, 'lbtBufErr', 0, 1 );
                                        break;
                                    case 5: // LBT_CWCONFIG_REQ
                                        validate_property_range( pktSect, 'lbtCWConfig_H', 0, 255 );
                                        validate_property_range( pktSect, 'lbtCWConfig_T', 0, 255 );
                                        validate_property_range( pktSect, 'lbtMode', 0, 3 );
                                        validate_property_range( pktSect, 'lbtTrafficClass', 0, 7 );
                                        break;
                                    case 6: // LBT_CWCONFIG_RSP
                                        validate_property_range( pktSect, 'lbtCWR_Rst', 0, 1 );
                                        break;
                                }
                            }
                        }

                        // isExtTypeAllowed[sectionType][extType]
                        const isExtTypeAllowed = {
                            //  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17
                            0: [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                            1: [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                            3: [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                            5: [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                            6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]
                        };

                        if( pktSect.hasOwnProperty('ef') && pktSect.ef === 1 && [0, 1, 3, 5, 6].includes( pkt.sectionType ) )
                        {
                            validate_property( pktSect, 'extensions' );
                            if( pktSect.hasOwnProperty('extensions') )
                            {
                                for( let sectExtIdx = 0; sectExtIdx < pktSect.extensions.length; ++sectExtIdx )
                                {
                                    let sectExt = pktSect.extensions[sectExtIdx];

                                    validate_property_range( sectExt, 'ef', 0, 1 );
                                    validate_property_range( sectExt, 'extType', 1, 17 );

                                    if( sectExt.hasOwnProperty('extType') && sectExt.extType >= 1 || sectExt.extType <= 17 )
                                    {
                                        if( !isExtTypeAllowed[pkt.sectionType][sectExt.extType] ) {
                                            logValidateError('extType: ' + sectExt.extType + ' not allowed for sectionType: ' + pkt.sectionType);
                                            ++validate_error_counter;
                                            continue;
                                        }

                                        validate_property_range( sectExt, 'extLen', 1, sectExt.extType === 11 ? 65535 : 255 );

                                        //               0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
                                        ecpriPayload += [0, 4, 8, 4, 4, 8, 8, 4, 4, 4,  4,  8,  4,  4,  4,  8,  4,  4][sectExt.extType];
                                        switch( sectExt.extType )
                                        {
                                            case 1:
                                                validate_property_range( sectExt, 'bfwCompHdr', 0, 1 );
                                                if( sectExt.hasOwnProperty('bfwCompHdr') ) {
                                                    let bfwIqWidth = sectExt.bfwCompHdr >> 4;
                                                    let bfwCompMeth = sectExt.bfwCompHdr & 0xF;

                                                    if( bfwCompMeth !== 0 ) {
                                                        validate_property_range( sectExt, 'bfwCompParam', 0, 1 );
                                                    }

                                                    if( sectExt.hasOwnProperty('bfwI') && Array.isArray( sectExt['bfwI'] ) ) {
                                                        let totalLength = 3 + ( bfwCompMeth === 0 ? 0 : 1 ) + Math.trunc( ( bfwIqWidth * sectExt.bfwI.length + 7 ) / 8 );
                                                        let extLen = Math.trunc( ( totalLength + 3 ) / 4 );
                                                        validate_property_value( sectExt, 'extLen', extLen );
                                                        ecpriPayload += (extLen - 1) * 4;
                                                    }
                                                }
                                                validate_array_property( sectExt, 'bfwI', 1, 64 );
                                                validate_array_property( sectExt, 'bfwQ', 1, 64  );

                                                break;
                                            case 2:
                                                validate_property_range( sectExt, 'bfaCompHdr', 0, 0xFFFF );
                                                if( sectExt.hasOwnProperty('bfaCompHdr') )
                                                {
                                                    let bfAzPtWidth = ( sectExt.bfaCompHdr >> 11 ) & 0x7;
                                                    let bfZePtWidth = ( sectExt.bfaCompHdr >> 8 ) & 0x7;
                                                    let bfAz3ddWidth = ( sectExt.bfaCompHdr >> 3 ) & 0x7;
                                                    let bfZe3ddWidth = sectExt.bfaCompHdr & 0x7;

                                                    if( bfAzPtWidth ) validate_property_range( sectExt, 'bfAzPt', 0, ( 1 << ( ++bfAzPtWidth ) ) - 1 );
                                                    if( bfZePtWidth ) validate_property_range( sectExt, 'bfZePt', 0, ( 1 << ( ++bfZePtWidth ) ) - 1 );
                                                    if( bfAz3ddWidth ) validate_property_range( sectExt, 'bfAz3dd', 0, ( 1 << ( ++bfAz3ddWidth ) ) - 1 );
                                                    if( bfZe3ddWidth ) validate_property_range( sectExt, 'bfZe3dd', 0, ( 1 << ( ++bfZe3ddWidth ) ) - 1 );

                                                    let bfSumWidth = bfAzPtWidth + bfZePtWidth + bfAz3ddWidth + bfZe3ddWidth;
                                                    if( bfSumWidth > 24 ) {
                                                        validate_property_value( sectExt, 'extLen', 3 );
                                                        ecpriPayload += 4;
                                                    }
                                                    else {
                                                        validate_property_value( sectExt, 'extLen', 2 );
                                                    }
                                                }
                                                validate_property_range( sectExt, 'bfAzSl', 0, 7 );
                                                validate_property_range( sectExt, 'bfZeSl', 0, 7 );
                                                break;
                                            case 3:
                                                validate_property_array( sectExt, 'extLen', [1, 4] );
                                                validate_property_range( sectExt, 'codebookIndex', 0, 0xFF );
                                                validate_property_range( sectExt, 'layerId', 0, 15 );
                                                validate_property_range( sectExt, 'numLayers', 0, 15 );
                                                if( sectExt.hasOwnProperty( 'extLen' ) && sectExt.extLen === 4 )
                                                {
                                                    validate_property_value( sectExt, 'extLen', 4 );
                                                    validate_property_range( sectExt, 'txScheme', 0, 2 );
                                                    validate_property_range( sectExt, 'crsReMask', 0, 0xFFF );
                                                    validate_property_range( sectExt, 'crsShift', 0, 1 );
                                                    validate_property_range( sectExt, 'crsSymNum', 0, 13 );
                                                    validate_property_range( sectExt, 'beamIdAP1', 0, 0xFFFF );
                                                    validate_property_range( sectExt, 'beamIdAP2', 0, 0xFFFF );
                                                    validate_property_range( sectExt, 'beamIdAP3', 0, 0xFFFF );
                                                }
                                                else
                                                {
                                                    validate_property_value( sectExt, 'extLen', 1 );
                                                }
                                                break;
                                            case 4:
                                                validate_property_value( sectExt, 'extLen', 1 );
                                                validate_property_range( sectExt, 'csf', 0, 1 );
                                                validate_property_range( sectExt, 'modCompScaler', 0, 0x7FFF );
                                                break;
                                            case 5:
                                                //TODO:
                                                //validate_property_value( sectExt, 'extLen', 2 );
                                                // validate_property_value( sectExt, 'mcScaleReMask', 2 );
                                                // validate_property_value( sectExt, 'csf' );
                                                // validate_property_value( sectExt, 'mcScaleOffset' );
                                                break;
                                            case 6:
                                                validate_property_value( sectExt, 'extLen', 2 );
                                                validate_property_range( sectExt, 'repetition', 0, 1 );
                                                validate_property_range( sectExt, 'rbgSize', 1, 7 );
                                                validate_property_range( sectExt, 'rbgMask', 0, 0xFFFFFFF );
                                                validate_property_range( sectExt, 'priority', 0, 3 );
                                                validate_property_range( sectExt, 'symbolMask', 0, 0x3FFF );
                                                ecpriPayload += (sectExt.extLen - 1) * 4;
                                                break;
                                            case 7:
                                                validate_property_value( sectExt, 'extLen', 1 );
                                                validate_property_range( sectExt, 'eAxCmask', 0, 0xFFFF );
                                                break;
                                            case 8:
                                                validate_property_value( sectExt, 'extLen', 1 );
                                                validate_property_range( sectExt, 'regularizationFactor', 0, 0xFFFF );
                                                break;
                                            case 9:
                                                validate_property_value( sectExt, 'extLen', 1 );
                                                validate_property_range( sectExt, 'technology', 0, 1 );
                                                break;
                                            case 10:
                                                validate_property_range( sectExt, 'beamGroupType', 0, 2 );
                                                validate_property_range( sectExt, 'numPortc', 0, 63 );
                                                if( sectExt.hasOwnProperty('beamGroupType') )
                                                {
                                                    if( sectExt.beamGroupType === 2 ) {
                                                        validate_property_value( sectExt, 'extLen', 3 );
                                                        if( sectExt.hasOwnProperty('beamID') ) { validate_array_property( sectExt, 'beamID', 3, 3 ); }
                                                        else if( sectExt.hasOwnProperty('ueID') ) { validate_array_property( sectExt, 'ueID', 3, 3 ); }
                                                        else { logValidateError('sectExt 10 should include beamID or ueID array'); }
                                                    }
                                                    else {
                                                        validate_property_value( sectExt, 'extLen', 1 );
                                                    }
                                                }
                                                break;
                                            case 11:
                                                ecpriPayload += (sectExt.extLen - 2) * 4;
                                                break;
                                            case 12:
                                                let offStartPrbLen = sectExt.offStartPrb.length * 2;
                                                ecpriPayload += offStartPrbLen + ( offStartPrbLen % 4 ? 4 - offStartPrbLen % 4 : 0 );
                                                break;
                                            case 14:
                                                validate_property_value( sectExt, 'extLen', 1 );
                                                validate_property_range( sectExt, 'nullLayerInd', 0, 1 );
                                                break;
                                            case 15:
                                                validate_property_value( sectExt, 'extLen', 2 );
                                                validate_property_range( sectExt, 'frameStructure', 0, 0xFF );
                                                validate_property_range( sectExt, 'freqOffset', 0, 0xFFFFFF );
                                                validate_property_range( sectExt, 'cpLength', 0, 0xFFFF );
                                                break;
                                            // TODO:
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if( pkt.ecpriPayload !== ecpriPayload && ![5, 65].includes(pkt.ecpriMessage) && !is72ePkt ) {
            logInfo('eCoG', `ecpriPayload fix: ${pkt.ecpriPayload} -> ${ecpriPayload}`);
            pkt.ecpriPayload = ecpriPayload;
        }
    }
    if( validate_error_counter !== 0 ) {
        logInfo( 'eCoG', 'Validation failed, total validation errors: ' + validate_error_counter + ', check console logs' );
    }
    return validate_error_counter === 0;
}

function validate_config()
{
    if( ecog_config.filename === '' ) { logWarning( 'eCoG', "Filename can't be empty" ); return false; }
    if( !['generator', 'json'].includes( ecog_config.mode ) ) { logWarning( 'eCoG', 'Filename should be one of [generator, json]' ); return false; }
    if( !['standard', 'xstep', 'egen'].includes( ecog_config.timing_mode ) ) { logWarning( 'eCoG', 'Filename should be one of [standard, xstep, egen]' ); return false; }

    if( ecog_config.iq_bit_width < 1 || ecog_config.iq_bit_width > 16 ) { logWarning( 'eCoG', 'iq_bit_width should be within range[1, 16]' ); return false; }
    if( ecog_config.iq_comp_method < 0 || ecog_config.iq_comp_method > 1 ) { logWarning( 'eCoG', 'iq_comp_method should be within range[0, 1]' ); return false; }

    if( ecog_config.iq_fill_method === 3 && !iq_5gmax_file ) { logWarning( 'eCoG', 'You should choose 5GMax tv before generation' ); return false; }

    if( !['FR1', 'FR2'].includes( ecog_config.band ) ) { logWarning( 'eCoG', 'Band should be one of [FR1, FR2]' ); return false; }
    if( ecog_config.u < 0 || ecog_config.u > 4 ) { logWarning( 'eCoG', 'u should be within range[0, 4]' ); return false; }
    if( ecog_config.num_of_antennas_dl < 1 ) { logWarning( 'eCoG', 'num_of_antennas_dl should be greater than 0' ); return false; }
    if( ecog_config.num_of_antennas_ul < 1 ) { logWarning( 'eCoG', 'num_of_antennas_ul should be greater than 0' ); return false; }
    if( ecog_config.num_of_prb > max_prb_per_u[ecog_config.band][ecog_config.u] ) { logWarning( 'eCoG', 'Maximal num_of_prb for present configuration is: ' + max_prb_per_u[ecog_config.band][ecog_config.u] ); }

    if( ecog_config.dl_rtc_ids.length < ecog_config.num_of_antennas_dl ) { logWarning( 'eCoG', 'dl_rtc_ids.length should be >= than num_of_antennas_dl' ); return false;}
    if( ecog_config.ul_rtc_ids.length < ecog_config.num_of_antennas_ul ) { logWarning( 'eCoG', 'ul_rtc_ids.length should be >= than num_of_antennas_ul' ); return false;}
    if( ecog_config.pbch_rtc_ids.length < ecog_config.pbch_num_of_antennas ) { logWarning( 'eCoG', 'pbch_rtc_ids.length should be >= than pbch_num_of_antennas' ); return false; }
    if( ecog_config.prach_rtc_ids.length < ecog_config.prach_num_of_antennas ) { logWarning( 'eCoG', 'prach_rtc_ids.length should be >= than prach_num_of_antennas' ); return false; }
    if( ecog_config.xirc_beta_enable && (ecog_config.xirc_rtc_ids.length + ecog_config.beta_rtc_ids.length) < ecog_config.num_of_antennas_ul ) { logWarning( 'eCoG', 'Inconsistent number of rtc ids between uplink and xirc/beta' ); return false;}
    if ( ecog_config.xirc_beta_enable && ecog_config.frame_structure.length !== ecog_config.beta_remask.length ) { logWarning( 'eCoG', 'Mismatch in number of slots in frame structure and beta_remask' ); return false;}
    if( ecog_config.xirc_beta_num_of_prb > 273 ) { logWarning( 'eCoG', 'Maximal num_of_prb for present configuration is: 273' ); }

    return true;
}

// 0 - GP
// 1 - DL
// 2 - UL
const slottypes_ratio = {
    21: [ 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    22: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2 ],
    26: [ 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    27: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    28: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2 ],
    29: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    30: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2 ],
    31: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    32: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    33: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    39: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    40: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    41: [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2 ],
    50: [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2 ],
    55: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    56: [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
    57: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    61: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    62: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    64: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0 ] };

/* Return a number from normal distribution with stddev=1, using box-muller transform to generate */
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

// dir: 0 - UL, 1 - DL
// unit: dBFS, dBm, dec
function power_unit_conv( dir, power, unit ) {
    const max_exponent = ecog_config.iq_scaling_mode === 1 ? 15 : ( 16 - ecog_config.iq_bit_width );
    const max_i = 1 << ( ecog_config.iq_bit_width - 1 + ( ecog_config.iq_comp_method === 1 ? max_exponent : 0 ) );

    const interfaceResolution = roundTo( -10 * Math.log10( Math.pow( 2, 2 * ( ecog_config.iq_bit_width - 1 + ( ecog_config.iq_comp_method === 1 ? max_exponent : 0 ) ) ) ), 1 );

    const dlPowerBoostingMargin = 15.8 // dB
    // const dlReferenceLevel = config.iq_scaling_mode === 1 ? 0 : roundTo( 10 * Math.log10( config.num_of_prb * 12 ) - dlPowerBoostingMargin, 0 ); // dB
    const dlReferenceLevel = 0;

    if( unit === 'dBFS' ) {
        if( dir === 0 ) {
            return Math.pow( 10, ( -interfaceResolution + power ) / 20 );
        } else {
            return Math.pow( 10, ( -interfaceResolution + power - dlReferenceLevel ) / 20 );
        }
    } else if( unit === 'dBm' ) {
        if( dir === 0 ) { // UL
            const ulRefLevel = -152; // dBm
            const ulGainCorrection = ecog_config.iq_scaling_mode === 1 ? 0 : roundTo( -10 * Math.log10( 15 * ( 1 << ecog_config.u ) / 1.25 ), 1 ); // dB
            console.log( 'ulGainCorrection: ' + ulGainCorrection );
            const ulGain = roundTo( interfaceResolution - ulRefLevel + ulGainCorrection, 1 ); // dB
            console.log( 'ulGain: ' + ulGain );
            const ulMinPowerDbm = interfaceResolution - ulGain; // dBm, negative
            console.log( 'ulMinPowerDbm: ' + ulMinPowerDbm );
            return Math.pow( 10, ( power - 10 * Math.log10( 12 ) - ulMinPowerDbm ) / 20 );
        }
    }

    return power;
}

let gen = {
    'cplane_enable': [true, true],
    'uplane_enable': [true, true],
    'type65_enable': false,
    'xirc_beta_enable': false,
    'baseUplaneMsgPayload': 0,
    'sectionHeaderSize': 0,
    'prbSize': 0,
    'maxPrbPerPacket': 0,
    'numOfRtcIds': 32,
    'seqIDs': null,
    'frame': 0,
    'subframe': 0,
    'slot': 0,
    'udCompHdr': 0,
    'ef_dl': 0,
    'ef_ul': 0,
    'exts_dl': [],
    'exts_ul': []
};

function generate_ecpri_cplane_f1( time, rtcId, dataDir, startSym, sectId, startPrb, numPrb, numSym )
{
    if( gen.cplane_enable[dataDir] )
    {
        generated_packets.push({
            "time": time,
            "ecpriVersion": 1,
            "ecpriConcat": 0,
            "ecpriMessage": 2,
            "ecpriPayload": 0,
            "ecpriRtcid": rtcId,
            "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * dataDir + rtcId]++) << 8 | (1 << 7),
            "dataDirection": dataDir,
            "payloadVersion": 1,
            "filterIndex": 0,
            "frameId": gen.frame,
            "subframeId": gen.subframe,
            "slotId": gen.slot,
            "startSymbolId": startSym,
            "numberOfSections": 1,
            "sectionType": 1,
            "udCompHdr": dataDir === 0 ? gen.udCompHdr : 0,
            "sections": [
                {
                    "sectionId": sectId,
                    "rb": 0,
                    "symInc": 0,
                    "startPrbc": startPrb,
                    "numPrbc": numPrb,
                    "reMask": 0xFFF,
                    "numSymbol": numSym,
                    "ef": dataDir ? gen.ef_dl : gen.ef_ul,
                    "beamId": 0,
                    'extensions': dataDir ? gen.exts_dl : gen.exts_ul
                }
            ]
        });
    }
}

function generate_ecpri_cplane_f3( time, rtcId, dataDir, filterIdx, startSym, timeOffset, frameStructure, cpLength, sectId, startPrb, numPrb, numSym, freqOffset )
{
    if( gen.cplane_enable[dataDir] )
    {
        generated_packets.push({
            "time": time,
            "ecpriVersion": 1,
            "ecpriConcat": 0,
            "ecpriMessage": 2,
            "ecpriPayload": 0,
            "ecpriRtcid": rtcId,
            "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * dataDir + rtcId]++) << 8 | (1 << 7),
            "dataDirection": dataDir,
            "payloadVersion": 1,
            "filterIndex": filterIdx,
            "frameId": gen.frame,
            "subframeId": gen.subframe,
            "slotId": gen.slot,
            "startSymbolId": startSym,
            "numberOfSections": 1,
            "sectionType": 3,
            "timeOffset": timeOffset,
            "frameStructure": frameStructure,
            "cpLength": cpLength,
            "udCompHdr": dataDir === 0 ? gen.udCompHdr : 0,
            "sections": [
                {
                    "sectionId": sectId,
                    "rb": 0,
                    "symInc": 0,
                    "startPrbc": startPrb,
                    "numPrbc": numPrb,
                    "reMask": 0xFFF,
                    "numSymbol": numSym,
                    "ef": dataDir ? gen.ef_dl : gen.ef_ul,
                    "beamId": 0,
                    "freqOffset": freqOffset,
                    'extensions': dataDir ? gen.exts_dl : gen.exts_ul
                }
            ]
        });
    }
}

function generate_ecpri_type_65_msg( time, rtcId, messageId)
{
    generated_packets.push({
        "time": time,
        "ecpriVersion": 1,
        "ecpriConcat": 0,
        "ecpriMessage": 65,
        "ecpriPayload": ecog_get_bip_msg_size(messageId),
        "ecpriRtcid": rtcId,
        "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * 4 + rtcId]++) << 8 | (1 << 7),
        "dataDirection": 0,
        "payloadVersion": 1,
        "channelType": 0,
        "frameId": gen.frame,
        "subframeId": gen.subframe,
        "slotId": gen.slot,
        "startSymbolId": 0,
        "messageId": messageId,
    });
}

function generate_regular_fragmentation( numPrb, maxPrbPerFragment )
{
    const number_of_fragments = Math.ceil( numPrb / maxPrbPerFragment );
    const prb_per_fragment = Math.floor( numPrb / number_of_fragments );
    const n_longer = numPrb - prb_per_fragment * number_of_fragments;
    let regular_fragmentation = new Array(number_of_fragments);
    regular_fragmentation.fill( prb_per_fragment + 1, 0, n_longer );
    regular_fragmentation.fill( prb_per_fragment, n_longer );
    return regular_fragmentation;
}

function generate_ecpri_uplane( time, rtcId, dataDir, filterIndex, startSym, sectId, startPrb, numPrb )
{
    const generate_uplane = gen.uplane_enable[dataDir] || gen.xirc_beta_enable;
    if( !generate_uplane )
    {
        return;
    };

    const get_target_number_of_sections = () => {
        if( ecog_config.prach_rtc_ids.includes(rtcId) ) return 1;
        return ( ecog_config.num_of_mtz_sections );
    }
    const target_number_of_sections = get_target_number_of_sections();

    if( target_number_of_sections === 1 )
    {
        let uplane_regular_fragmentation = generate_regular_fragmentation( numPrb, gen.maxPrbPerPacket );

        let startPrbIdx = startPrb;
        for( let i = 0; i < uplane_regular_fragmentation.length; ++i )
        {
            const numPrbInPacket = uplane_regular_fragmentation[i];
            generated_packets.push({
                "time": time + ( ecog_config.dynamic_delay ? 0.000002 * i : 0 ),
                "ecpriVersion": 1,
                "ecpriConcat": 0,
                "ecpriMessage": 0,
                "ecpriPayload": gen.baseUplaneMsgPayload + gen.prbSize * numPrbInPacket,
                "ecpriRtcid": rtcId,
                "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * (2 + dataDir) + rtcId]++) << 8 | (1 << 7),
                "dataDirection": dataDir,
                "payloadVersion": 1,
                "filterIndex": filterIndex,
                "frameId": gen.frame,
                "subframeId": gen.subframe,
                "slotId": gen.slot,
                "startSymbolId": startSym,
                "sections": [
                    {
                        "sectionId": sectId,
                        "rb": 0,
                        "symInc": 0,
                        "startPrbu": startPrbIdx,
                        "numPrbu": numPrbInPacket,
                        "udCompHdr": gen.udCompHdr,
                        "iSample": new Array( 12 * numPrbInPacket ),
                        "qSample": new Array( 12 * numPrbInPacket )
                    }
                ]
            });

            startPrbIdx += numPrbInPacket;
        }
    }
    else
    {
        generate_ecpri_uplane_multisection( time, rtcId, dataDir, filterIndex, startSym, sectId, startPrb, numPrb, target_number_of_sections);
    }
}

function generate_ecpri_uplane_multisection( time, rtcId, dataDir, filterIndex, startSym, sectId, startPrb, numPrb, targetNumSections )
{
    const multisection_base_msg_payload = 8;
    const section_hdr_size = 4 + ( ecog_config.dynamic_iq_comp ? 2 : 0 );
    const max_prb_per_multisection_packet = ( ( ecog_config.mtu - 4 - section_hdr_size * targetNumSections - multisection_base_msg_payload ) / gen.prbSize ) | 0;

    let uplane_regular_fragmentation = generate_regular_fragmentation( numPrb, max_prb_per_multisection_packet );

    let packet_prb_offset = startPrb;
    for( let i = 0; i < uplane_regular_fragmentation.length; ++i )
    {
        let num_prb_in_packet = uplane_regular_fragmentation[i];
        const num_sections_in_packet = Math.min( num_prb_in_packet, targetNumSections );
        const prb_per_section = Math.floor( num_prb_in_packet / num_sections_in_packet );
        const prb_remainder = num_prb_in_packet % num_sections_in_packet;
        let section_fragmentation = new Array(num_sections_in_packet).fill(prb_per_section);
        section_fragmentation.fill( prb_per_section + 1, 0, prb_remainder );

        let sections = [];
        let section_prb_offset = 0;

        for (const num_prb_in_section of section_fragmentation)
        {
            let section = {
                "sectionId": sectId,
                "rb": 0,
                "symInc": 0,
                "startPrbu": packet_prb_offset + section_prb_offset,
                "numPrbu": num_prb_in_section,
                "udCompHdr": gen.udCompHdr,
                "iSample": new Array( 12 * num_prb_in_section ),
                "qSample": new Array( 12 * num_prb_in_section )
            }
            sections.push(section);
            section_prb_offset += num_prb_in_section;
        }

        generated_packets.push({
            "time": time + ( ecog_config.dynamic_delay ? 0.000002 * i : 0 ),
            "ecpriVersion": 1,
            "ecpriConcat": 0,
            "ecpriMessage": 0,
            "ecpriPayload": multisection_base_msg_payload + section_hdr_size * sections.length + gen.prbSize * num_prb_in_packet,
            "ecpriRtcid": rtcId,
            "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * (2 + dataDir) + rtcId]++) << 8 | (1 << 7),
            "dataDirection": dataDir,
            "payloadVersion": 1,
            "filterIndex": filterIndex,
            "frameId": gen.frame,
            "subframeId": gen.subframe,
            "slotId": gen.slot,
            "startSymbolId": startSym,
            "sections": sections
        });
        packet_prb_offset += num_prb_in_packet;
    }
}

function get_prbsize_by_recount( iqBitWidth, reCount )
{
    reMaskHdrSize = 2;
    return Math.ceil(((reCount * iqBitWidth * 2) / 8)) + reMaskHdrSize;
}

function get_num_of_bit_set( value )
{
    return value.toString(2).split('').filter(x => x == '1').length;
}

function generate_ecpri_beta_factor_uplane( time, rtcId, dataDir, filterIndex, startSym, sectId, startPrb, numPrb, reMask )
{
    let localBaseUplaneMsgPayload = 12;
    let reCount = get_num_of_bit_set(reMask);
    let localPrbSize = get_prbsize_by_recount(14, reCount);
    let localMaxPrbPerPacket = ( ( ecog_config.mtu - 4 - localBaseUplaneMsgPayload ) / localPrbSize ) | 0;

    let uplane_regular_fragmentation = generate_regular_fragmentation( numPrb, localMaxPrbPerPacket );

    let startPrbIdx = startPrb;
    for( let i = 0; i < uplane_regular_fragmentation.length; ++i )
    {
        const numPrbInPacket = uplane_regular_fragmentation[i];

        generated_packets.push({
            "time": time + ( ecog_config.dynamic_delay ? 0.000002 * i : 0 ),
            "ecpriVersion": 1,
            "ecpriConcat": 0,
            "ecpriMessage": 0,
            "ecpriPayload": localBaseUplaneMsgPayload + localPrbSize * numPrbInPacket,
            "ecpriRtcid": rtcId,
            "ecpriSeqid": (gen.seqIDs[gen.numOfRtcIds * (2 + dataDir) + rtcId]++) << 8 | (1 << 7),
            "dataDirection": dataDir,
            "payloadVersion": 1,
            "filterIndex": filterIndex,
            "frameId": gen.frame,
            "subframeId": gen.subframe,
            "slotId": gen.slot,
            "startSymbolId": startSym,
            "sections": [
                {
                    "sectionId": sectId,
                    "rb": 0,
                    "symInc": 0,
                    "startPrbu": startPrbIdx,
                    "numPrbu": numPrbInPacket,
                    "udCompHdr": (reMask << 4 | 5),
                    "iSample": new Array( 12 * numPrbInPacket ),
                    "qSample": new Array( 12 * numPrbInPacket )
                }
            ]
        });

        startPrbIdx += numPrbInPacket;
    }
}

function SyncFileReader(file) {
    let self = this;
    let ready = false;
    let result = '';

    const sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    self.readAsText = async function() {
        while (ready === false) {
            await sleep(100);
        }
        return result;
    }

    const reader = new FileReader();
    reader.onloadend = function(evt) {
        result = evt.target.result;
        ready = true;
    };
    reader.readAsText(file);
}

async function generate_packets()
{
    generated_packets = [];

    gen.cplane_enable = [ecog_config.cplane_ul_enable, ecog_config.cplane_dl_enable];
    gen.uplane_enable = [ecog_config.uplane_ul_enable, ecog_config.uplane_dl_enable];
    gen.type65_enable = ecog_config.type65_enable;
    gen.xirc_beta_enable = ecog_config.xirc_beta_enable;

    gen.baseUplaneMsgPayload = 12 + ( ecog_config.dynamic_iq_comp ? 2 : 0 );
    gen.prbSize = 3 * ecog_config.iq_bit_width + ( ecog_config.iq_comp_method === 1 ? 1 : 0 );
    gen.maxPrbPerPacket = ( ( ecog_config.mtu - 4 - gen.baseUplaneMsgPayload ) / gen.prbSize ) | 0;

    gen.udCompHdr = 0;
    if( ecog_config.dynamic_iq_comp ) {
        gen.udCompHdr = ( ecog_config.iq_bit_width === 16 ? 0 : ecog_config.iq_bit_width ) << 4 | ecog_config.iq_comp_method;
    }

    // if( config.extType1_enable ) {
    //     const ext = {
    //         'ef': config.extType9_enable,
    //         'extType': 1,
    //         'extLen': 0,
    //         'bfwIqWidth': config.extType1_bfwIqBitWidth,
    //         'bfwCompMeth': config.extType1_bfwCompMeth,
    //         'bfwCompHdr': config.extType1_bfwCompMeth
    //     }
    // }
    //
    // if( config.extType9_enable ) {
    //     const ext = {
    //         'ef': 0,
    //         'extType': 9,
    //         'extLen': 1,
    //         'technology': config.extType9_technology
    //     };
    //
    //     gen.exts_dl.push( ext );
    //     gen.exts_ul.push( ext );
    // }
    //
    // gen.ef_dl = gen.exts_dl.length > 0 ? 1 : 0;
    // gen.ef_ul = gen.exts_ul.length > 0 ? 1 : 0;

    let maxRtcId = 0;
    for( const rtcId of ecog_config.dl_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.ul_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.pbch_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.prach_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.type65_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.xirc_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }
    for( const rtcId of ecog_config.beta_rtc_ids ) { if( rtcId > maxRtcId ) maxRtcId = rtcId; }

    gen.numOfRtcIds = maxRtcId + 1;
    gen.seqIDs = new Uint8Array( 7 * gen.numOfRtcIds ).fill( 0 );

    let sectionIds = new Uint8Array( 2 * gen.numOfRtcIds ).fill( 0 );

    const symTimeOffset = [0, 141312, 281600, 421888, 562176, 702464, 842752, 983040, 1124352, 1264640, 1404928, 1545216, 1685504, 1825792];

    const cplane_time_correction = [-ecog_config.cplane_ul_advance / 1000000, -ecog_config.cplane_dl_advance / 1000000];
    const uplane_time_correction = [ecog_config.uplane_ul_delay / 1000000, -ecog_config.uplane_dl_advance / 1000000];

    const fftSizes = [ 128, 256, 512, 1024, 2048, 4096 ];
    const fftSizesToFrameStructure = [ 0x70, 0x80, 0x90, 0xA0, 0xB0, 0xC0 ];
    const regularFftSizeIdx = fftSizes.findIndex( function(num) { return num > (ecog_config.num_of_prb * 12); });

    const pbch_config = pbch_configs[ecog_config.pbch_case];
    const pbch_timeOffsetBase = ( ( 144 + 2048 ) >> pbch_config.u );
    const pbch_fftSizeIdx = clamp( regularFftSizeIdx + ( ecog_config.u - pbch_config.u ), 0, fftSizes.length - 1 );
    const pbch_frameStructure = fftSizesToFrameStructure[pbch_fftSizeIdx] | pbch_config.u;
    const pbch_cpLength = 144 >> pbch_config.u;
    const pbch_startPrb = ecog_config.pbch_prb_offset;
    const pbch_numPrb = 20 + ( ecog_config.pbch_sc_offset > 0 ? 1 : 0 );
    const pbch_freqOffset = ( -ecog_config.num_of_prb / 2 + pbch_startPrb ) * 24;
    const pbch_slotInc = 1 << ( ecog_config.max_u - pbch_config.u );

    const prach_config = prach_configs[ecog_config.band][ecog_config.prach_cfg_idx];
    const prach_preamble_format = prach_config.format.split('/')[0];
    const prach_preamble_config = prach_preamble_formats[prach_preamble_format];
    const prach_isLongSeq = isNaN( prach_config.occasions );
    const prach_occasions = prach_isLongSeq ? 1 : prach_config.occasions;
    const prach_cp = prach_preamble_config.N_RA_CP / ( prach_isLongSeq ? 1 : ( 1 << ecog_config.u ) );
    const prach_filterIndex = prach_isLongSeq ? ( prach_preamble_format === 3 ? 2 : 1 ) : 3;
    const prach_frameStructure = prach_isLongSeq ? ( prach_preamble_format === 3 ? 0xAC : 0xAE ) : ( fftSizesToFrameStructure[regularFftSizeIdx] | ecog_config.u );
    const prach_startPrb = 0;
    const prach_numPrb = prach_isLongSeq ? 70 : 12;
    const prach_numSym = prach_isLongSeq ? [1, 2, 4, 4][prach_preamble_format] : ( prach_preamble_config.Nu / 2048 );
    const prach_freqOffsetMultiplier = 12 * 2 * ( prach_isLongSeq ? ( prach_preamble_format === 3 ? 3 : 12 ) : 1 );
    const prach_freqOffset = ( -ecog_config.num_of_prb / 2 + ecog_config.prach_prb_offset ) * prach_freqOffsetMultiplier;
    const prach_sym_dur = prach_isLongSeq ? ( prach_preamble_format === 3 ? 6144 : 24576 ) : ( 2048 >> ecog_config.u );

    const real_num_of_prb = ecog_config.num_of_prb - ecog_config.start_prb;
    const cplane_numPrb = ecog_config.num_of_prb > 255 ? 0 : ecog_config.num_of_prb;

    gen.frame = 0;
    gen.subframe = 0;
    gen.slot = 0;
    const maxSlots = 1 << ecog_config.max_u;
    const middleSlot = maxSlots / 2;
    const slotInc = 1 << ( ecog_config.max_u - ecog_config.u );

    for(let slotIdx = 0; slotIdx < ecog_config.frame_structure.length; ++slotIdx )
    {
        let isFirstCpLonger = ( gen.slot === 0 ) | ( gen.slot === middleSlot );
        let slotTime = gen.frame * 0.01 + gen.subframe * 0.001 + ( ( 1966080 * gen.slot ) >> ecog_config.max_u ) / 1966080000;

        sectionIds.fill( 0 );

        const slotType = ecog_config.frame_structure[slotIdx];
        switch ( slotType )
        {
            case 0: // PRACH
                let prach_startSym = prach_config.start;
                const dataDir = 0;
                // if( !prach_config.sf.includes( gen.subframe ) ) {
                //     logInfo('Warning: Wrong PRACH allocation, subframe should be one of: ' + prach_config.sf + ', but given in subframe: ' + gen.subframe );
                // }
                for( let occ = 0; occ < prach_occasions; ++occ )
                {
                    let prach_timeOffset = ( isFirstCpLonger ? 16 : 0 ) + ( ( 144 + 2048 ) >> ecog_config.u ) * prach_startSym + prach_cp;
                    let prachStartTime = slotTime + prach_timeOffset / 30720000;
                    const sectionId = 0x100 + occ;
                    for(let ant = 0; ant < ecog_config.prach_num_of_antennas; ++ant )
                    {
                        const rtcId = ecog_config.prach_rtc_ids[ant];
                        generate_ecpri_cplane_f3( prachStartTime + cplane_time_correction[dataDir], rtcId, dataDir, prach_filterIndex, prach_startSym, prach_timeOffset, prach_frameStructure, 0, sectionId, prach_startPrb, prach_numPrb, prach_numSym, prach_freqOffset );

                        for( let sym = 0; sym < prach_numSym; ++sym )
                        {
                            let uplane_time = prachStartTime + ( prach_sym_dur * sym ) / 30720000;
                            generate_ecpri_uplane( uplane_time + uplane_time_correction[dataDir], rtcId, dataDir, prach_filterIndex, prach_startSym + sym, sectionId, prach_startPrb, prach_numPrb );
                        }
                    }
                    prach_startSym += prach_config.duration;
                }
                break;
            case 2: // SSB
                const subframeBackup = gen.subframe;
                const slotBackup = gen.slot;
                let ssbSlotsInSlotStructure = 1;
                while( ( slotIdx + ssbSlotsInSlotStructure ) < ecog_config.frame_structure.length && ecog_config.frame_structure[slotIdx + ssbSlotsInSlotStructure] === 2 ) {
                    ++ssbSlotsInSlotStructure;
                }
                let ssbSlots = ssbSlotsInSlotStructure;
                if( pbch_config.u > ecog_config.u ) ssbSlots <<= ( pbch_config.u - ecog_config.u );
                if( pbch_config.u < ecog_config.u ) ssbSlots >>= ( ecog_config.u - pbch_config.u );

                // One DL symbol
                for(let ant = 0; ant < ecog_config.num_of_antennas_dl; ++ant ) {
                    const rtcId = ecog_config.dl_rtc_ids[ant];
                    const dataDir = 1;
                    const sectionId = sectionIds[gen.numOfRtcIds * dataDir + rtcId]++;
                    generate_ecpri_cplane_f1( slotTime + cplane_time_correction[dataDir] + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, 0, sectionId, ecog_config.start_prb, cplane_numPrb, 1 );
                    generate_ecpri_uplane( slotTime + uplane_time_correction[dataDir] + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, 0, 0, sectionId, ecog_config.start_prb, ecog_config.num_of_prb );
                }

                let latestSlot = gen.slot;
                for(let blockIdx = 0; blockIdx < ecog_config.pbch_num_of_blocks; ++blockIdx )
                {
                    const dataDir = 1;
                    let startSym = pbch_config.indexes[blockIdx % pbch_config.indexes.length] + pbch_config.n_step * Math.floor( blockIdx / pbch_config.indexes.length );
                    let pbchSlot = Math.floor( startSym / 14 );
                    let timeOffset = pbch_timeOffsetBase * startSym;
                    startSym %= 14;
                    if( pbchSlot >= ssbSlots || ( startSym > 10 && ( ( pbchSlot + 1 ) >= ssbSlots ) ) ) {
                        logWarning( 'eCoG', 'Num of SSB blocks started at slot ' + slotIdx + ' limited to ' + blockIdx + ' due to slot structure' );
                        break;
                    }
                    gen.slot = slotBackup + pbchSlot * pbch_slotInc;
                    if( gen.slot >= maxSlots ) {
                        gen.subframe = subframeBackup + gen.slot / maxSlots;
                        gen.slot %= maxSlots;
                    }
                    if( gen.slot === 0 || gen.slot === middleSlot ) timeOffset += 16;
                    if( latestSlot !== gen.slot ) {
                        latestSlot = gen.slot;
                        sectionIds.fill( 0 );
                    }

                    let pbchSlotTime = gen.frame * 0.01 + gen.subframe * 0.001 + ( ( 1966080 * gen.slot ) >> ecog_config.max_u ) / 1966080000;
                    let cplaneTime = pbchSlotTime + ( symTimeOffset[startSym] >> pbch_config.u ) / 1966080000 + cplane_time_correction[dataDir];
                    let uplaneBaseTime = pbchSlotTime + uplane_time_correction[dataDir];

                    const partSymNum = startSym > 10 ? 14 - startSym : 4;

                    for(let ant = 0; ant < ecog_config.pbch_num_of_antennas; ++ant ) {
                        const rtcId = ecog_config.pbch_rtc_ids[ant];
                        const sectionId = sectionIds[gen.numOfRtcIds * dataDir + rtcId]++;

                        if( pbch_config.u !== ecog_config.u ) {
                            generate_ecpri_cplane_f3( cplaneTime, rtcId, dataDir, 0, startSym, timeOffset, pbch_frameStructure, pbch_cpLength, sectionId, pbch_startPrb, pbch_numPrb, partSymNum, pbch_freqOffset );
                        } else {
                            generate_ecpri_cplane_f1( cplaneTime, rtcId, dataDir, startSym, sectionId, pbch_startPrb, pbch_numPrb, partSymNum );
                        }

                        for( let uplane_sym = 0; uplane_sym < partSymNum; ++uplane_sym ) {
                            const uplane_time = uplaneBaseTime + ( symTimeOffset[startSym + uplane_sym] >> pbch_config.u ) / 1966080000;
                            generate_ecpri_uplane( uplane_time, rtcId, dataDir, 0, startSym + uplane_sym, sectionId, pbch_startPrb, pbch_numPrb );
                            generated_packets[generated_packets.length-1].SSB = true;
                            generated_packets[generated_packets.length-1].SSB_slot = uplane_sym;
                        }
                    }

                    if( startSym > 10 )
                    {
                        gen.slot += pbch_slotInc;
                        if( gen.slot >= maxSlots ) {
                            gen.subframe = subframeBackup + gen.slot / maxSlots;
                            gen.slot %= maxSlots;
                        }
                        latestSlot = gen.slot;
                        sectionIds.fill( 0 );

                        pbchSlotTime = gen.frame * 0.01 + gen.subframe * 0.001 + ( ( 1966080 * gen.slot ) >> ecog_config.max_u ) / 1966080000;
                        cplaneTime = pbchSlotTime + cplane_time_correction[dataDir];  // time for first symbol of next slot(in case if startSym > 10)
                        uplaneBaseTime = pbchSlotTime + uplane_time_correction[dataDir];

                        const restSym = 4 - ( 14 - startSym );

                        for(let ant = 0; ant < ecog_config.pbch_num_of_antennas; ++ant ) {
                            const rtcId = ecog_config.pbch_rtc_ids[ant];
                            const sectionId = sectionIds[gen.numOfRtcIds * dataDir + rtcId]++;

                            if( pbch_config.u !== ecog_config.u ) {
                                generate_ecpri_cplane_f3( cplaneTime, rtcId, dataDir, 0, 0, 0, pbch_frameStructure, pbch_cpLength, sectionId, pbch_startPrb, pbch_numPrb, restSym, pbch_freqOffset );
                            } else {
                                generate_ecpri_cplane_f1( cplaneTime, rtcId, dataDir, 0, 0, pbch_startPrb, pbch_numPrb, restSym );
                            }

                            for( let uplane_sym = 0; uplane_sym < restSym; ++uplane_sym ) {
                                const uplane_time = uplaneBaseTime + ( symTimeOffset[uplane_sym] >> pbch_config.u ) / 1966080000;
                                generate_ecpri_uplane( uplane_time, rtcId, dataDir, 0, uplane_sym, sectionId, pbch_startPrb, pbch_numPrb );
                            }
                        }
                    }
                }

                gen.slot = slotBackup + ( ssbSlotsInSlotStructure - 1 ) * slotInc;
                if( gen.slot >= maxSlots ) {
                    gen.subframe = subframeBackup + gen.slot / maxSlots;
                    gen.slot %= maxSlots;
                }

                // One UL symbol
                let ulTime = gen.frame * 0.01 + gen.subframe * 0.001 + ( ( 1966080 * gen.slot ) >> ecog_config.max_u ) / 1966080000 + ( symTimeOffset[13] >> ecog_config.u ) / 1966080000;
                for(let ant = 0; ant < ecog_config.num_of_antennas_ul; ++ant ) {
                    const rtcId = ecog_config.ul_rtc_ids[ant];
                    const dataDir = 0;
                    const sectionId = 0;
                    generate_ecpri_cplane_f1( ulTime + cplane_time_correction[dataDir] + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, 13, sectionId, ecog_config.start_prb, cplane_numPrb, 1 );
                    generate_ecpri_uplane( ulTime + uplane_time_correction[dataDir] + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, 0, 13, sectionId, ecog_config.start_prb, ecog_config.num_of_prb );
                }

                gen.slot = slotBackup + ssbSlotsInSlotStructure * slotInc;
                if( gen.slot >= maxSlots ) {
                    gen.subframe = subframeBackup + gen.slot / maxSlots;
                    gen.slot %= maxSlots;
                }

                slotIdx += ssbSlotsInSlotStructure - 1;

                break;
            default:
                if( slottypes_ratio.hasOwnProperty( slotType ) )
                {
                    const slotTypeRatio = slottypes_ratio[slotType];
                    const len_xirc = ecog_config.xirc_rtc_ids.length;
                    let numOfAggSyms;
                    for( let sym = 0 ; sym < 14; sym += numOfAggSyms )
                    {
                        numOfAggSyms = 1;
                        const symType = slotTypeRatio[sym];
                        if( symType === 0 ) continue;
                        while( ( sym + numOfAggSyms ) < 14 && slotTypeRatio[sym + numOfAggSyms] === symType ) ++numOfAggSyms;

                        const dataDir = symType === 1 ? 1 : 0;
                        const time = slotTime + ( symTimeOffset[sym] >> ecog_config.u ) / 1966080000;
                        const cplane_time = time + cplane_time_correction[dataDir];
                        const numOfAntennas = dataDir ? ecog_config.num_of_antennas_dl : ecog_config.num_of_antennas_ul;
                        for( let ant = 0; ant < numOfAntennas; ++ant )
                        {
                            const rtcId = dataDir ? ecog_config.dl_rtc_ids[ant] : ecog_config.ul_rtc_ids[ant];
                            const sectionId = sectionIds[gen.numOfRtcIds * dataDir + rtcId]++;
                            generate_ecpri_cplane_f1( cplane_time + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, sym, sectionId, ecog_config.start_prb, cplane_numPrb, numOfAggSyms );
                            for( let uplane_sym = 0; uplane_sym < numOfAggSyms; ++uplane_sym )
                            {
                                const uplane_time = slotTime + ( symTimeOffset[sym + uplane_sym] >> ecog_config.u ) / 1966080000 + uplane_time_correction[dataDir];
                                generate_ecpri_uplane( uplane_time + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), rtcId, dataDir, 0, sym + uplane_sym, sectionId, ecog_config.start_prb, ecog_config.num_of_prb );
                                if (gen.xirc_beta_enable && dataDir == 0 && (ant < len_xirc) )
                                {
                                    const uplane_xirc_beta_time = slotTime + ( symTimeOffset[sym + uplane_sym] >> ecog_config.u ) / 1966080000 + ecog_config.xirc_beta_delay / 1000000;
                                    generate_ecpri_uplane( uplane_xirc_beta_time + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), ecog_config.xirc_rtc_ids[ant % len_xirc], dataDir, 0, sym + uplane_sym, sectionId, ecog_config.start_prb, ecog_config.xirc_beta_num_of_prb );

                                    if ((sym + uplane_sym) == 0 || (sym + uplane_sym) == 7)
                                    {
                                        const len_beta = ecog_config.beta_rtc_ids.length;
                                        generate_ecpri_beta_factor_uplane( uplane_xirc_beta_time + ( ecog_config.dynamic_delay ? 0.000001 * ant : 0 ), ecog_config.beta_rtc_ids[ant % len_beta], dataDir, 0, sym + uplane_sym, sectionId, ecog_config.start_prb, ecog_config.xirc_beta_num_of_prb, ecog_config.beta_remask[slotIdx]);
                                    }
                                }
                            }
                        }

                        if( gen.type65_enable &&  dataDir === 0)
                        {
                            const type65Time = slotTime + ( symTimeOffset[13] >> ecog_config.u ) / 1966080000 + ecog_config.type65_delay / 1000000;
                            for( let rtcId of ecog_config.type65_rtc_ids )
                            {
                                for( let idx = 0; idx < ecog_config.pusch_cell_ps_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, puschReceiveRespCellPsMsgId);
                                }
                                for( let idx = 0; idx < ecog_config.pusch_ue_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, puschReceiveRespUePsMsgId);
                                }
                                for( let idx = 0; idx < ecog_config.srs_su_mimo_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, srsSuMimoReceiveRespPsMsgId);
                                }
                                for( let idx = 0; idx < ecog_config.srs_bm_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, srsBmReceiveRespPsMsgId);
                                }
                                for( let idx = 0; idx < ecog_config.srs_rt_bf_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, srsRtBfReceiveRespPsMsgId);
                                }
                                for( let idx = 0; idx < ecog_config.rim_num; ++idx ) {
                                    generate_ecpri_type_65_msg( type65Time, rtcId, rimReceiveRespPsMsgId);
                                }
                            }
                        }
                    }
                }
                else
                {
                    logError( 'eCoG', 'Unknown slot type: ' + slotType );
                    return false;
                }
                break;
        }

        if( slotType !== 2 ) gen.slot += slotInc;

        if( gen.slot >= maxSlots ) {
            gen.slot = 0;
            if( ++gen.subframe > 9 ) {
                gen.subframe = 0;
                if( ++gen.frame > 255 ) gen.frame = 0;
            }
        }
    }

    const samples_per_symbol = ecog_config.num_of_prb * 12;
    const samples_per_slot = 14 * samples_per_symbol;
    const samples_len = ecog_config.frame_structure.length * samples_per_slot;

    let modulation_iq;
    let modulation_length;
    let gauss_stddev_dl, gauss_stddev_ul;
    let fileISamples, fileQSamples;
    switch( ecog_config.iq_fill_method ) {
        case 1:
            const stddev = power_unit_conv( 1, ecog_config.modulation_power, 'dBFS' );
            switch( ecog_config.modulation_type ) {
                case 'qpsk': modulation_iq = [-1, 1]; break;
                case '16qam': modulation_iq = [-3, -1, 1, 3]; break;
                case '64qam': modulation_iq = [-7, -5, -3, -1, 1, 3, 5, 7]; break;
                case '256qam': modulation_iq = [-15, -13, -11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11, 13, 15]; break;
            }
            modulation_length = modulation_iq.length;
            const mult = stddev / ( modulation_iq.length - 1 );
            for( let i = 0; i < modulation_length; ++i ) {
                modulation_iq[i] *= mult;
            }
            break;
        case 2:
            gauss_stddev_dl = power_unit_conv( 1, ecog_config.gauss_dl_power, ecog_config.gauss_dl_power_unit ) / Math.sqrt( 2 );
            gauss_stddev_ul = power_unit_conv( 0, ecog_config.gauss_ul_power, ecog_config.gauss_ul_power_unit ) / Math.sqrt( 2 );
            break;
        case 3:
            let reader = new SyncFileReader( iq_5gmax_file );
            let text = await reader.readAsText();
            let lines = text.split(/[\r\n]+/g);

            let sample = 0;

            const max_exponent = ecog_config.iq_scaling_mode === 1 ? 15 : ( 16 - ecog_config.iq_bit_width );
            const max_i = 1 << ( ecog_config.iq_bit_width - 1 + ( ecog_config.iq_comp_method === 1 ? max_exponent : 0 ) );
            const multiplier = Math.pow( 10, Math.log10( ( max_i * max_i ) / samples_per_symbol ) / 2 ) / Math.sqrt( 2 ) / 0.049194;

            fileISamples = new Array( samples_len ).fill( 0 );
            fileQSamples = new Array( samples_len ).fill( 0 );

            for( let i = 0; i < lines.length; ++i ) {
                if( lines[i][0] === '#' ) continue;
                if( sample >= samples_len ) {
                    break;
                }
                let iqStr = lines[i].split(' ');
                fileISamples[sample] = Number( iqStr[0] ) * multiplier;
                fileQSamples[sample] = Number( iqStr[1] ) * multiplier;
                ++sample;
            }

            if( sample < samples_len ) {
                logWarning( 'eCoG', 'Number of samples in 5gmax tv less then needed: ' + sample + ' vs ' + samples_len );
                logInfo( 'eCoG', 'The remaining samples will be filled with zeros')
            }

            break;
    }

    const SSB_config = get_SSB_configuration();
    const PBCH = pbch_encode(SSB_config);
    const PBCH_DMRS = pbch_encode_dmrs(SSB_config.PCI,SSB_config.half_frame_bit,SSB_config.L_max,SSB_config.ssbIndex);

    const N_ID_1 = parseInt(SSB_config.PCI/3);
    const N_ID_2 = parseInt(SSB_config.PCI%3);
    const PSS_values = pss_encode(N_ID_2);
    const SSS_values = sss_encode(N_ID_1, N_ID_2);

    const slot_shift = ( ecog_config.max_u - ecog_config.u );
    const slot_per_subframe = 1 << ecog_config.u;

    for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx ) {
        let pkt = generated_packets[pktIdx];
        if( pkt.ecpriMessage === 0 ) {
            pkt.sections.forEach(pktSect => {
                let iSample = pktSect.iSample;
                let qSample = pktSect.qSample;

                let is_SSB = generated_packets[pktIdx].SSB;
                if(is_SSB){
                    generate_SSB_samples(iSample, qSample, generated_packets[pktIdx].SSB_slot, PSS_values, SSS_values, PBCH, PBCH_DMRS, SSB_config);
                }
                else {
                    switch (ecog_config.iq_fill_method) {
                        case 0:
                            iSample.fill(0);
                            qSample.fill(0);
                            break;
                        case 1:
                            for (let i = 0; i < iSample.length; ++i) {
                                iSample[i] = modulation_iq[Math.floor(Math.random() * modulation_length)];
                                qSample[i] = modulation_iq[Math.floor(Math.random() * modulation_length)];
                            }
                            break;
                        case 2:
                            const stddev = pkt.dataDirection ? gauss_stddev_dl : gauss_stddev_ul;
                            for (let i = 0; i < iSample.length; ++i) {
                                iSample[i] = randn_bm() * stddev;
                                qSample[i] = randn_bm() * stddev;
                            }
                            break;
                        case 3:
                            const samplesStart = ((10 * pkt.frameId + pkt.subframeId) * slot_per_subframe + (pkt.slotId >> slot_shift)) * samples_per_slot + pkt.startSymbolId * samples_per_symbol + pktSect.startPrbu * 12;
                            const samplesEnd = samplesStart + 12 * pktSect.numPrbu;
                            pktSect.iSample = fileISamples.slice(samplesStart, samplesEnd);
                            pktSect.qSample = fileQSamples.slice(samplesStart, samplesEnd);
                            break;
                    }
                }
            });
        }
    }

    logInfo( 'eCoG', 'Generated ' + generated_packets.length + ' packets' );
    return true;
}

function generate_SSB_samples(iSample, qSample, SSB_slot, PSS_values, SSS_values, PBCH, PBCH_DMRS, config){

    const multiplier = 1000000;

    if(SSB_slot === 0){
        for(let i = 0; i < 56; i++){
            iSample[i] = 0;
            qSample[i] = 0;
        }
        for(let i = 0; i < 127; i++){
            iSample[i+56] = PSS_values.v_i[i]*multiplier;
            qSample[i+56] = PSS_values.v_q[i]*multiplier;
        }
        for(let i = 0; i < 53; i++){
            iSample[i+56+127] = 0;
            qSample[i+56+127] = 0;
        }
    }
    else if(SSB_slot === 1){
        iSample.fill( 0 );
        qSample.fill( 0 );

        let PBCH_DMRS_index = 0;
        let PBCH_index = 0;

        for( let i = 0; i<240; i++){
            if((i-config.PCI) % 4 === 0){
                iSample[i] = PBCH_DMRS.v_i[PBCH_DMRS_index]*multiplier;
                qSample[i] = PBCH_DMRS.v_q[PBCH_DMRS_index]*multiplier;
                PBCH_DMRS_index++;
            }
            else{
                iSample[i] = PBCH.v_i[PBCH_index]*multiplier;
                qSample[i] = PBCH.v_q[PBCH_index]*multiplier;
                PBCH_index++;
            }
        }
    }
    else if(SSB_slot === 2){
        iSample.fill( 0 );
        qSample.fill( 0 );

        let PBCH_DMRS_index = Number(240/4);
        let PBCH_index = Number(240*3/4);

        for(let i = 0; i < 48; i++){
            if((i-config.PCI) % 4 === 0){
                iSample[i] = PBCH_DMRS.v_i[PBCH_DMRS_index]*multiplier;
                qSample[i] = PBCH_DMRS.v_q[PBCH_DMRS_index]*multiplier;
                PBCH_DMRS_index++;
            }
            else{
                iSample[i] = PBCH.v_i[PBCH_index]*multiplier;
                qSample[i] = PBCH.v_q[PBCH_index]*multiplier;
                PBCH_index++;
            }
        }
        for(let i = 0; i < 8; i++){
            iSample[i+48] = 0;
            qSample[i+48] = 0;
        }
        for(let i = 0; i < 127; i++){
            iSample[i+56] = SSS_values.v_i[i]*multiplier;
            qSample[i+56] = SSS_values.v_q[i]*multiplier;
        }
        for(let i = 0; i < 48; i++){
            if((i-config.PCI) % 4 === 0){
                iSample[i+56+127+9] = PBCH_DMRS.v_i[PBCH_DMRS_index]*multiplier;
                qSample[i+56+127+9] = PBCH_DMRS.v_q[PBCH_DMRS_index]*multiplier;
                PBCH_DMRS_index++;
            }
            else{
                iSample[i+56+127+9] = PBCH.v_i[PBCH_index]*multiplier;
                qSample[i+56+127+9] = PBCH.v_q[PBCH_index]*multiplier;
                PBCH_index++;
            }
        }
    }
    else if(SSB_slot === 3){
        iSample.fill( 0 );
        qSample.fill( 0 );

        let PBCH_DMRS_index = Number((240+48+48)/4);
        let PBCH_index = Number((240+48+48)*3/4);

        for( let i = 0; i<240; i++){
            if((i-config.PCI) % 4 === 0){
                iSample[i] = PBCH_DMRS.v_i[PBCH_DMRS_index]*multiplier;
                qSample[i] = PBCH_DMRS.v_q[PBCH_DMRS_index]*multiplier;
                PBCH_DMRS_index++;
            }
            else{
                iSample[i] = PBCH.v_i[PBCH_index]*multiplier;
                qSample[i] = PBCH.v_q[PBCH_index]*multiplier;
                PBCH_index++;
            }
        }
    }
}


function generate_pcap()
{
    const vlanHdrLen = ecog_config.vlan_enable ? 4 : 0;

    let pcapEthHdr = new Uint8Array( 14 + vlanHdrLen );
    let destMacAddrStrArr = ecog_config.dest_mac_addr.split(':');
    let srcMacAddrStrArr = ecog_config.src_mac_addr.split(':');
    for( let i = 0; i < 6; ++i ) {
        pcapEthHdr[i] = parseInt( destMacAddrStrArr[i], 16 );
        pcapEthHdr[6 + i] = parseInt( srcMacAddrStrArr[i], 16 );
    }
    if( ecog_config.vlan_enable ) {
        pcapEthHdr[12] = 0x81;
        pcapEthHdr[13] = 0x00;
        pcapEthHdr[14] = ( ecog_config.vlan_id & 0xFFF ) >> 8;
        pcapEthHdr[15] = ecog_config.vlan_id;
    }
    pcapEthHdr[12 + vlanHdrLen] = 0xAE;
    pcapEthHdr[13 + vlanHdrLen] = 0xFE;

    let pcapSize = 24 + 16 * generated_packets.length;
    for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx ) {
        let pktLen = 14 + vlanHdrLen + 4 + generated_packets[pktIdx].ecpriPayload;
        if( pktLen < ecog_config.min_pkt_len ) pktLen = ecog_config.min_pkt_len;
        pcapSize += pktLen;
    }

    let pcapBuffer = new ArrayBuffer( pcapSize );
    let pcapPtr = new Uint8Array( pcapBuffer );
    let pcapPktOffset = 24;
    let pcapPtrOffset = 24;

    // Fill pcap global header
    pcapSet4( pcapPtr, 0, 0xA1B2C3D4 ); // magic number
    pcapSet2( pcapPtr, 4, 2 );          // version major
    pcapSet2( pcapPtr, 6, 4 );          // version minor
    pcapSet4( pcapPtr, 16, 65535 );     // snaplen
    pcapSet4( pcapPtr, 20, 1 );         // network: 1 - Ethernet

    for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx )
    {
        let isBetaPkt = false;
        let totalPrbSize = 0;
        let pkt = generated_packets[pktIdx];
        let pktLen = 14 + vlanHdrLen + 4 + pkt.ecpriPayload;
        if( pktLen < ecog_config.min_pkt_len ) pktLen = ecog_config.min_pkt_len;

        // pcap packet header
        pcapPtr = new Uint8Array( pcapBuffer, pcapPktOffset );
        pcapPtrOffset = pcapPktOffset + 16;
        pcapSet4( pcapPtr, 0, pkt.time | 0 ); // ts_sec
        pcapSet4( pcapPtr, 4, ( pkt.time % 1 ) * 1000000 ); // ts_usec
        pcapSet4( pcapPtr, 8, pktLen ); // incl_len
        pcapSet4( pcapPtr, 12, pktLen ); // orig_len
        pktLenPtrOffset = pcapPktOffset + 8;

        // Ethernet
        pcapPtr = new Uint8Array( pcapBuffer, pcapPtrOffset ).set( pcapEthHdr, 0 );
        pcapPtrOffset += 14 + vlanHdrLen;

        // eCPRI common
        pcapPtr = new Uint8Array( pcapBuffer, pcapPtrOffset );
        ecpriPayloadPtrOffset = pcapPtrOffset + 2;
        pcapPtrOffset += 4;
        pcapPtr[0]  = ( pkt.ecpriVersion & 0xF ) << 4 | ( pkt.ecpriConcat & 0x1 );
        pcapPtr[1]  = pkt.ecpriMessage;
        pcapPtr[2]  = pkt.ecpriPayload >> 8;
        pcapPtr[3]  = pkt.ecpriPayload;

        if([0, 2, 65].includes(pkt.ecpriMessage)){
            pcapPtrOffset += 8;
            pcapPtr[4]  = pkt.ecpriRtcid >> 8;
            pcapPtr[5]  = pkt.ecpriRtcid;
            pcapPtr[6]  = pkt.ecpriSeqid >> 8;
            pcapPtr[7]  = pkt.ecpriSeqid;
            pcapPtr[8]  = pkt.dataDirection << 7 | ( pkt.payloadVersion & 0x7 ) << 4 | ( pkt.filterIndex & 0xF );
            pcapPtr[9]  = pkt.frameId;
            pcapPtr[10] = pkt.subframeId << 4 | ( pkt.slotId & 0x3F ) >> 2;
            pcapPtr[11] = pkt.slotId << 6 | ( pkt.startSymbolId & 0x3F );

            if( pkt.ecpriMessage === 0 ) // IQ data message
            {
                for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
                {
                    let pktSect = pkt.sections[sectIdx];

                    pcapPtr = new Uint8Array( pcapBuffer, pcapPtrOffset );
                    pcapPtrOffset += 4;
                    pcapPtr[0] = pktSect.sectionId >> 4;
                    pcapPtr[1] = pktSect.sectionId << 4 | ( pktSect.rb & 0x1 ) << 3 | ( pktSect.symInc & 0x1 ) << 2 | pktSect.startPrbu >> 8;
                    pcapPtr[2] = pktSect.numPrbu > 255 ? 0 : pktSect.startPrbu;
                    pcapPtr[3] = pktSect.numPrbu > 255 ? 0 : pktSect.numPrbu;

                    let iq_bit_width = ecog_config.iq_bit_width;
                    let iq_comp_method = ecog_config.iq_comp_method;
                    let confBetaReMask = 0;

                    if( ecog_config.dynamic_iq_comp ) {
                        pcapPtrOffset += 2;
                        pcapPtr[4] = pktSect.udCompHdr;
                        const udIqWidth = pktSect.udCompHdr >> 4;
                        iq_bit_width = ( udIqWidth === 0 ) ? 16 : udIqWidth;
                        iq_comp_method = pktSect.udCompHdr & 0xF;
                    }

                    if ( ecog_config.xirc_beta_enable && ((pktSect.udCompHdr & 0xF) === 5) )
                    {
                        iq_bit_width = 14;
                        iq_comp_method = pktSect.udCompHdr & 0xF;
                        confBetaReMask = (pktSect.udCompHdr >> 4) & 0xFFF;
                        isBetaPkt = true;
                    }

                    const sampleMin = -( 1 << ( iq_bit_width - 1 ) );
                    const sampleMax = ( 1 << ( iq_bit_width - 1 ) ) - 1;
                    const signAdder = 1 << iq_bit_width;

                    let iqSamples = [];
                    iqSamples.length = 24;

                    for( let prbIdx = 0; prbIdx < pktSect.numPrbu; ++prbIdx )
                    {
                        pcapPtr = new Uint8Array(pcapBuffer, pcapPtrOffset);

                        for( let i = 0; i < 12; ++i ) {
                            iqSamples[2 * i] = pktSect.iSample[12 * prbIdx + i];
                            iqSamples[2 * i + 1] = pktSect.qSample[12 * prbIdx + i];
                        }

                        let udCompParam = 0;

                        switch( iq_comp_method )
                        {
                            case 1: // BFP
                            case 5: // BFP + selective RE sending
                                const minV = Math.min( ...iqSamples );
                                const maxV = Math.max( ...iqSamples );
                                const maxValue = Math.max( maxV, Math.abs( minV ) - 1 );
                                let raw_exp = Math.floor( Math.log2( maxValue ) + 1 );
                                if( !isFinite( raw_exp ) ) raw_exp = 0;
                                const exponent = Math.max( raw_exp - iq_bit_width + 1, 0 );
                                udCompParam = exponent;
                                // console.log("minV: " + minV + " maxV: " + maxV + " maxValue: " + maxValue + " raw_exp: " + raw_exp + " exponent: " + exponent );
                                for( let i = 0; i < 24; ++i ) {
                                    iqSamples[i] = Math.round( iqSamples[i] >> exponent );
                                }
                                break;
                            case 2: // Block scaling
                                break;
                            case 3: // u-law
                                break;
                            case 4: // modulation comp.
                            case 6: // modulation comp. + selective RE sending
                                break;
                        }

                        let iqDataLength = 24;
                        let iqDataOffset = 0;

                        if( iq_comp_method === 1 || iq_comp_method === 2 || iq_comp_method === 3 ) {
                            iqDataOffset = 1;
                            pcapPtr[0] = udCompParam;
                        }
                        else if( iq_comp_method === 5 || iq_comp_method === 6 ) { // Selective RE sending
                            iqDataOffset = 2;
                            iqDataLength = 0;
                            let j = 0, sReSMask = 0;
                            for( let i = 0; i < 12; ++i ) {
                                // Change iq sample to 0 depending on configured reMask for beta packets
                                if (isBetaPkt && !((confBetaReMask >> i) & 1)) {
                                    iqSamples[2 * i] = 0;
                                    iqSamples[2 * i + 1] = 0;
                                }
                                if( iqSamples[2 * i] !== 0 || iqSamples[2 * i + 1] !== 0 ) {
                                    iqSamples[2 * j] = iqSamples[2 * i];
                                    iqSamples[2 * j + 1] = iqSamples[2 * i + 1];
                                    ++j;
                                    sReSMask |= 1 << i;
                                    iqDataLength += 2;
                                }
                            }
                            totalPrbSize += get_prbsize_by_recount( iq_bit_width, iqDataLength / 2 )
                            pcapPtr[0] = ( sReSMask >> 8 ) << 4 | udCompParam;
                            pcapPtr[1] = sReSMask;
                        }

                        for( let i = 0; i < iqDataLength; ++i ) {
                            let sample = iqSamples[i];
                            if( sample < sampleMin ) sample = sampleMin;
                            if( sample > sampleMax ) sample = sampleMax;
                            if( sample < 0 ) sample += signAdder;
                            iqSamples[i] = sample;
                        }

                        let freeBits = 8;
                        for( let i = 0; i < iqDataLength; ++i )
                        {
                            let neededBits = iq_bit_width;
                            while( freeBits <= neededBits )
                            {
                                neededBits -= freeBits;
                                pcapPtr[iqDataOffset++] |= iqSamples[i] >> neededBits;
                                freeBits = 8;
                            }
                            if( neededBits ) {
                                freeBits -= neededBits;
                                pcapPtr[iqDataOffset] |= iqSamples[i] << freeBits;
                            }
                        }
                        if( freeBits !== 8 ) ++iqDataOffset;

                        pcapPtrOffset += iqDataOffset;
                    }
                }
            }
            else if( pkt.ecpriMessage === 2 ) // Real-time control data message
            {
                pcapPtrOffset += 4;
                pcapPtr[12] = pkt.numberOfSections;
                pcapPtr[13] = pkt.sectionType;

                if( pkt.sectionType === 0 || pkt.sectionType === 3 ) {
                    pcapPtrOffset += 4;
                    pcapPtr[14] = pkt.timeOffset >> 8;
                    pcapPtr[15] = pkt.timeOffset;
                    pcapPtr[16] = pkt.frameStructure;
                    pcapPtr[17] = pkt.cpLength >> 8;
                    pcapPtr[18] = pkt.cpLength;
                    if( pkt.sectionType === 3 ) pcapPtr[19] = pkt.udCompHdr;
                }
                else if( pkt.sectionType === 1 || pkt.sectionType === 5 ) {
                    pcapPtr[14] = pkt.udCompHdr;
                }
                else if( pkt.sectionType === 6 ) {
                    pcapPtr[14] = pkt.numberOfUEs;
                }
                else if (pkt. sectionType === 255){
                    pcapPtrOffset -= 2; //is different to other sectionTypes, there is only one section
                    pcapPtrOffset += ecpri_encodeSection255(pkt, pcapBuffer, pcapPtrOffset);
                    return new Uint8Array(pcapBuffer); // early return, no more sections
                }
                for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
                {
                    let pktSect = pkt.sections[sectIdx];
                    pcapPtr = new Uint8Array(pcapBuffer, pcapPtrOffset);
                    pcapPtrOffset += [8, 8, 0, 12, 0, 8, 8, 4][pkt.sectionType];
                    if( pkt.sectionType === 0 || pkt.sectionType === 1 || pkt.sectionType === 3 || pkt.sectionType === 5 )
                    {
                        pcapPtr[0] = pktSect.sectionId >> 4;
                        pcapPtr[1] = pktSect.sectionId << 4 | ( pktSect.rb & 0x1 ) << 3 | ( pktSect.symInc & 0x1 ) << 2 | ( pktSect.startPrbc & 0x3FF ) >> 8;
                        pcapPtr[2] = pktSect.startPrbc;
                        pcapPtr[3] = pktSect.numPrbc;
                        pcapPtr[4] = pktSect.reMask >> 4;
                        pcapPtr[5] = pktSect.reMask << 4 | ( pktSect.numSymbol & 0xF );
                        pcapPtr[6] = pktSect.ef << 7;
                        if( pkt.sectionType === 1 || pkt.sectionType === 3 )
                        {
                            pcapPtr[6] |= ( pktSect.beamId & 0x7FFF ) >> 8;
                            pcapPtr[7] = pktSect.beamId;
                            if( pkt.sectionType === 3 )
                            {
                                const freqOffsetRaw = ToUnsigned_24Bit(pkt.freqOffset);
                                pcapPtr[8]  = freqOffsetRaw >> 16;
                                pcapPtr[9]  = freqOffsetRaw >> 8;
                                pcapPtr[10] = freqOffsetRaw;
                            }
                        }
                        else if( pkt.sectionType === 5 )
                        {
                            pcapPtr[6] |= ( pktSect.ueId & 0x7FFF ) >> 8;
                            pcapPtr[7] = pktSect.ueId;
                        }
                    }
                    else if( pkt.sectionType === 6 )
                    {
                        pcapPtr[0] = pktSect.ef << 7 | ( pktSect.ueId & 0x7FFF ) >> 8;
                        pcapPtr[1] = pktSect.ueId;
                        pcapPtr[2] = pktSect.regularizationFactor >> 8;
                        pcapPtr[3] = pktSect.regularizationFactor;
                        pcapPtr[4] = ( pktSect.rb & 0x1 ) << 3 | ( pktSect.symInc & 0x1 ) << 2 | ( pktSect.startPrbc & 0x3FF ) >> 8;
                        pcapPtr[5] = pktSect.startPrbc;
                        pcapPtr[6] = pktSect.numPrbc;
                        pcapPtrOffset += ( ecog_config.iq_bit_width * 2 * pktSect.numPrbc * ecog_config.num_of_antennas_dl + 7 ) / 8;

                        const iq_bit_width = ecog_config.iq_bit_width;
                        const sampleMin = -( 1 << ( iq_bit_width - 1 ) );
                        const sampleMax = ( 1 << ( iq_bit_width - 1 ) ) - 1;
                        const signAdder = 1 << iq_bit_width;

                        let ciSamples = [];
                        ciSamples.length = pktSect.ciIsample.length + pktSect.ciQsample.length;

                        for( let i = 0; i < pktSect.ciIsample.length; ++i ) {
                            ciSamples[2 * i] = pktSect.ciIsample[i];
                            ciSamples[2 * i + 1] = pktSect.ciQsample[i];
                        }

                        for( let i = 0; i < ciSamples.length; ++i ) {
                            let sample = ciSamples[i];
                            if( sample < sampleMin ) sample = sampleMin;
                            if( sample > sampleMax ) sample = sampleMax;
                            if( sample < 0 ) sample += signAdder;
                            ciSamples[i] = sample;
                        }

                        let iqDataOffset = 7;

                        let freeBits = 8;
                        for( let i = 0; i < ciSamples.length; ++i )
                        {
                            let neededBits = iq_bit_width;
                            while( freeBits <= neededBits )
                            {
                                neededBits -= freeBits;
                                pcapPtr[iqDataOffset++] |= iqData[i] >> neededBits;
                                freeBits = 8;
                            }
                            if( neededBits ) {
                                freeBits -= neededBits;
                                pcapPtr[iqDataOffset] |= iqData[i] << freeBits;
                            }
                        }
                        if( freeBits !== 8 ) ++iqDataOffset;

                        pcapPtrOffset += iqDataOffset;
                    }
                    else if( pkt.sectionType === 7 )
                    {
                        pcapPtrOffset += [4, 4, 4, 0, 0, 4, 0][pktSect.laaMsgType];
                        pcapPtr[0] = pktSect.laaMsgType << 4 | ( pktSect.laaMsgLen & 0xF );
                        pcapPtr[1] = pktSect.lbtHandle >> 8;
                        pcapPtr[2] = pktSect.lbtHandle;

                        switch( pktSect.laaMsgType )
                        {
                            case 0:
                                pcapPtr[3] = pktSect.lbtOffset >> 2;
                                pcapPtr[4] = pktSect.lbtOffset << 6 | ( pktSect.lbtMode & 0x3 ) << 4 | ( pktSect.lbtDeferFactor & 0x7 );
                                pcapPtr[5] = pktSect.lbtBckoffCounter >> 2;
                                pcapPtr[6] = pktSect.lbtBckoffCounter << 6 | ( pktSect.MCOT & 0xF ) << 2;
                                break;
                            case 1:
                                pcapPtr[3] = pktSect.lbtOffset >> 2;
                                pcapPtr[4] = pktSect.lbtOffset << 6 | ( pktSect.lbtMode & 0x3 ) << 4;
                                break;
                            case 2:
                                pcapPtr[3] = pktSect.lbtPdschRes << 6 | ( pktSect.inParSF & 0x1 ) << 5 | ( pktSect.sfStatus & 0x1 ) << 4 | ( pktSect.sfnSf & 0xFFF ) >> 8;
                                pcapPtr[4] = pktSect.sfnSf;
                                break;
                            case 3:
                                pcapPtr[3] = pktSect.lbtDrsRes << 7;
                                break;
                            case 4:
                                pcapPtr[3] = pktSect.lbtBufErr << 7;
                                break;
                            case 5:
                                pcapPtr[3] = pktSect.lbtCWConfig_H;
                                pcapPtr[4] = pktSect.lbtCWConfig_T;
                                pcapPtr[5] = pktSect.lbtMode << 6 | ( pktSect.lbtTrafficClass & 0x7 ) << 3;
                                break;
                            case 6:
                                pcapPtr[3] = pktSect.lbtCWR_Rst << 7;
                                break;
                        }
                    }

                    if( [0, 1, 3, 5, 6].includes( pkt.sectionType ) && pktSect.ef )
                    {
                        for( let sectExtIdx = 0; sectExtIdx < pktSect.extensions.length; ++sectExtIdx )
                        {
                            let pktSectExt = pktSect.extensions[sectExtIdx];
                            pcapPtr = new Uint8Array(pcapBuffer, pcapPtrOffset);

                            let ef = ( sectExtIdx !== pktSect.extensions.length - 1 ) ? 1 : 0;
                            pcapPtr[0] = ef << 7 | ( pktSectExt.extType & 0x7F );
                            if( pktSectExt.extType === 11 ) {
                                pcapPtr[1] = pktSectExt.extLen >> 8;
                                pcapPtr[2] = pktSectExt.extLen;
                            } else {
                                pcapPtr[1] = pktSectExt.extLen;
                            }

                            switch( pktSectExt.extType )
                            {
                                case 1: // Beamforming Weights Extension Type

                                    let bfwIqWidth = 0, bfwCompMeth = 0;

                                    if( pktSectExt.hasOwnProperty('bfwIqWidth') && pktSectExt.hasOwnProperty('bfwCompMeth') ) {
                                        let bfwCompHdr = ( pktSectExt.bfwIqWidth === 16 ? 0 : pktSectExt.bfwIqWidth )
                                        pcapPtr[2] = pktSectExt.bfwCompHdr;

                                        bfwIqWidth = pktSectExt.bfwIqWidth;
                                        bfwCompMeth = pktSectExt.bfwCompMeth;
                                    } else {
                                        pcapPtr[2] = pktSectExt.bfwCompHdr;
                                        bfwIqWidth = pktSectExt.bfwCompHdr >> 4;
                                        if( bfwIqWidth === 0 ) bfwIqWidth = 16;
                                        bfwCompMeth = pktSectExt.bfwCompHdr & 0xF;
                                    }

                                    let bfwIQ = [];
                                    bfwIQ.length = 2 * pktSectExt.bfwI.length;
                                    for( let i = 0; i < pktSectExt.bfwI.length; ++i ) {
                                        bfwIQ[2 * i] = pktSectExt.bfwI[i];
                                        bfwIQ[2 * i + 1] = pktSectExt.bfwQ[i];
                                    }

                                    const sampleMin = -( 1 << ( bfwIqWidth - 1 ) );
                                    const sampleMax = ( 1 << ( bfwIqWidth - 1 ) ) -1;
                                    const signAdder = 1 << bfwIqWidth;

                                    for( let i = 0; i < iqDataLength; ++i ) {
                                        let sample = iqSamples[i];
                                        if( sample < sampleMin ) sample = sampleMin;
                                        if( sample > sampleMax ) sample = sampleMax;
                                        if( sample < 0 ) sample += signAdder;
                                        iqSamples[i] = sample;
                                    }

                                    clampArr( bfwIQ, sampleMin, sampleMax );

                                    let iqByteOffset = 0;
                                    let iqBitOffset = 0;
                                    for( let ii = 0; ii < bfwIQ.length; ++ii ) {
                                        iqBitOffset += bfwIqWidth;
                                        while( iqBitOffset >= 8 ) {
                                            ++iqByteOffset;
                                            iqBitOffset -= 8;
                                        }
                                    }


                                    switch( bfwCompMeth )
                                    {
                                        case 0:

                                            break;
                                    }
                                    // TODO:
                                    break;
                                case 2: // Beamforming Attributes Extension Type
                                    pcapPtr[2] = pktSectExt.bfaCompHdr >> 8;
                                    pcapPtr[3] = pktSectExt.bfaCompHdr;
                                    let bfAzPtWidth  = ( pktSectExt.bfaCompHdr >> 11 ) & 0x7;
                                    let bfZePtWidth  = ( pktSectExt.bfaCompHdr >> 8 ) & 0x7;
                                    let bfAz3ddWidth = ( pktSectExt.bfaCompHdr >> 3 ) & 0x7;
                                    let bfZe3ddWidth =   pktSectExt.bfaCompHdr & 0x7;

                                    let comp = 0;
                                    if( bfAzPtWidth )  { ++bfAzPtWidth;  comp |= pktSectExt.bfAzPt  << ( 32 - bfAzPtWidth ); }
                                    if( bfZePtWidth )  { ++bfZePtWidth;  comp |= pktSectExt.bfZePt  << ( 32 - bfAzPtWidth - bfZePtWidth ); }
                                    if( bfAz3ddWidth ) { ++bfAz3ddWidth; comp |= pktSectExt.bfAz3dd << ( 32 - bfAzPtWidth - bfZePtWidth - bfAz3ddWidth ); }
                                    if( bfZe3ddWidth ) { ++bfZe3ddWidth; comp |= pktSectExt.bfZe3dd << ( 32 - bfAzPtWidth - bfZePtWidth - bfAz3ddWidth - bfZe3ddWidth ); }

                                    let bfTotalSize = bfAzPtWidth + bfZePtWidth + bfAz3ddWidth + bfZe3ddWidth;
                                    if( bfTotalSize > 0  ) pcapPtr[4] = comp >> 24;
                                    if( bfTotalSize > 8  ) pcapPtr[5] = comp >> 16;
                                    if( bfTotalSize > 16 ) pcapPtr[6] = comp >> 8;
                                    if( bfTotalSize > 24 ) pcapPtr[7] = comp;

                                    pcapPtr[4 + Math.ceil(bfTotalSize / 8)] = pktSectExt.bfAzSl << 3 | pktSectExt.bfZeSl;

                                    break;
                                case 3: // DL Precoding Extension Type
                                    pcapPtr[2] = pktSectExt.codebookIndex;
                                    pcapPtr[3] = pktSectExt.layerId << 4 | pktSectExt.numLayers;
                                    if( pktSectExt.extLen === 4 ) {
                                        pcapPtr[4] = pktSectExt.txScheme << 4 | pktSectExt.crsReMask >> 8;
                                        pcapPtr[5] = pktSectExt.crsReMask >> 8;
                                        pcapPtr[6] = pktSectExt.crsShift << 7 | pktSectExt.crsSymNum;
                                        pcapPtr[10] = pktSectExt.beamIdAP1 >> 8;
                                        pcapPtr[11] = pktSectExt.beamIdAP1;
                                        pcapPtr[12] = pktSectExt.beamIdAP2 >> 8;
                                        pcapPtr[13] = pktSectExt.beamIdAP2;
                                        pcapPtr[14] = pktSectExt.beamIdAP3 >> 8;
                                        pcapPtr[15] = pktSectExt.beamIdAP3;
                                    }
                                    break;
                                case 4: // Modulation Compression Parameters Extension Type
                                    pcapPtr[2] = pktSectExt.csf << 7 | pktSectExt.modCompScaler >> 8;
                                    pcapPtr[3] = pktSectExt.modCompScaler;
                                    break;
                                case 5: // Modulation Compression Additional Parameters Extension Type
                                    // TODO
                                    break;
                                case 6: // Non-contiguous PRB allocation in time and frequency domain
                                    pcapPtr[2] = pktSectExt.repetition << 7 | ( pktSectExt.rbgSize & 0x7 ) << 4 | pktSectExt.rbgMask >> 24;
                                    pcapPtr[3] = pktSectExt.rbgMask >> 16;
                                    pcapPtr[4] = pktSectExt.rbgMask >> 8;
                                    pcapPtr[5] = pktSectExt.rbgMask;
                                    pcapPtr[6] = pktSectExt.priority << 6 | pktSectExt.symbolMask >> 8;
                                    pcapPtr[7] = pktSectExt.symbolMask;
                                    break;
                                case 7: // eAxC Mask Section Extension
                                    pcapPtr[2] = pktSectExt.eAxCmask >> 8;
                                    pcapPtr[3] = pktSectExt.eAxCmask;
                                    break;
                                case 8: // Regularization factor
                                    pcapPtr[2] = pktSectExt.regularizationFactor >> 8;
                                    pcapPtr[3] = pktSectExt.regularizationFactor;
                                    break;
                                case 9: // Dynamic Spectrum Sharing parameters
                                    pcapPtr[2] = pktSectExt.technology;
                                    break;
                                case 10: // Section description for group configuration of multiple ports
                                    pcapPtr[2] = pktSectExt.beamGroupType << 6 | pktSectExt.numPortc;
                                    if( pktSectExt.beamGroupType === 2 )
                                    {
                                        // TODO
                                    }
                                    break;
                                case 11: // Flexible Beamforming Weights Extension Type
                                    pcapPtr[3] = (pktSectExt.disableBFWs << 7) | (pktSectExt.RAD << 6);
                                    pcapPtr[4] = pktSectExt.numBundPrb;

                                    let bfwBundleDataOffset = 5;
                                    if(pktSectExt.disableBFWs === 0){
                                        pcapPtr[5] = (pktSectExt.bfwIqWidth << 4) | pktSectExt.bfwCompMeth;
                                        ++bfwBundleDataOffset;
                                    }

                                    for(const bundle of pktSectExt.bundles){
                                        if(pktSectExt.disableBFWs === 0){
                                            switch(pktSectExt.bfwCompMeth){
                                                case 0: // No compression
                                                    break;
                                                case 1: // Block floaitng point
                                                case 2: // Block scaling
                                                case 3: // u-law
                                                    pcapPtr[bfwBundleDataOffset++] = pktSectExt.bfwCompParam;
                                                    break;
                                                case 4: // Beamspace
                                                    logError("eCPRI", `SectExt11, Beamspace compression (${pktSectExt.bfwCompMeth}) unsupported`);
                                                    break;
                                            }
                                        }

                                        // pcapPtr[bfwBundleDataOffset] = pktSectExt.reserved << 7;
                                        pcapPtr[bfwBundleDataOffset] = bundle.beamId >> 8;
                                        pcapPtr[bfwBundleDataOffset + 1] = bundle.beamId & 0xFF;
                                        bfwBundleDataOffset+=2;

                                        if(pktSectExt.disableBFWs === 0){
                                            const iqBitWidth = pktSectExt.bfwIqWidth === 0 ? 16 : pktSectExt.bfwIqWidth;

                                            for(const sample of bundle.TRXs.flat()) {

                                                let freeBits = 8;

                                                let neededBits = iqBitWidth;
                                                while( freeBits <= neededBits ) {
                                                    neededBits -= freeBits;
                                                    pcapPtr[bfwBundleDataOffset++] |= sample >> neededBits;
                                                    freeBits = 8;
                                                }
                                                if( neededBits ) {
                                                    freeBits -= neededBits;
                                                    pcapPtr[bfwBundleDataOffset] |= sample << freeBits;
                                                }

                                                if( freeBits !== 8 ) ++bfwBundleDataOffset;
                                            }
                                        }
                                    }
                                    break;
                                case 12: // Non-contiguous PRB allocation with frequency ranges
                                    pcapPtr[2] = pktSectExt.priority | pktSectExt.symbolMask >> 8;
                                    pcapPtr[3] = pktSectExt.symbolMask;
                                    let extOff = 4;
                                    for( let i = 0; i < pktSectExt.offStartPrb.length; ++i ) {
                                        pcapPtr[extOff] = pktSectExt.offStartPrb[i];
                                        pcapPtr[extOff + 1] = pktSectExt.numPrb[i];
                                        extOff += 2;
                                    }
                                    break;
                                case 13: // Frequency hopping
                                    // TODO
                                    break;
                                case 14: // Null-layer Info. for ueId-based beamforming
                                    pcapPtr[2] = pktSectExt.nullLayerInd;
                                    break;
                                case 15: // Mixed-numerology Info. for ueId-based beamforming
                                    pcapPtr[2] = pktSectExt.frameStructure;
                                    pcapPtr[3] = pktSectExt.freqOffset >> 16;
                                    pcapPtr[4] = pktSectExt.freqOffset >> 8;
                                    pcapPtr[5] = pktSectExt.freqOffset;
                                    pcapPtr[6] = pktSectExt.cpLength >> 8;
                                    pcapPtr[7] = pktSectExt.cpLength;
                                    break;
                                case 16: // Antenna mapping for UE channel Info based UL beamforming
                                    // TODO
                                    break;
                                case 17: // User port group indication
                                    // TODO
                                    break;
                            }
                            pcapPtrOffset += pktSectExt.extLen * 4;
                        }
                    }
                }
            }
            else if( pkt.ecpriMessage === 65 ) // eCPRI 7-2e control data message
            {
                pcapPtrOffset += 4;
                pcapPtr[12] = pkt.messageId >> 8;
                pcapPtr[13] = pkt.messageId;
                pcapPtr[14] = 0; // Reserved
                pcapPtr[15] = 0; // Reserved
                pcapPtrOffset += ecog_encode_bip_msg(pcapBuffer, pcapPtrOffset, pkt, !ecog_config.pcap_big_endian);
            }
        }
        else if( pkt.ecpriMessage === 5 ) // One-Way Delay Measuremen
        {
            pcapPtrOffset+=20;
            pcapPtr[4] = pkt.measurementId;
            pcapPtr[5] = pkt.actionType;

            pcapPtr[6] = (pkt.timestampSec / 0x10000000000) & 0xFF;
            pcapPtr[7] = (pkt.timestampSec / 0x100000000) & 0xFF;
            pcapPtr[8] = (pkt.timestampSec / 0x1000000) & 0xFF;
            pcapPtr[9] = (pkt.timestampSec / 0x10000) & 0xFF;
            pcapPtr[10] = (pkt.timestampSec / 0x100) & 0xFF;
            pcapPtr[11] = pkt.timestampSec & 0xFF;

            pcapPtr[12] = (pkt.timestampNs / 2**24) & 0xFF;
            pcapPtr[13] = (pkt.timestampNs / 2**16) & 0xFF;
            pcapPtr[14] = (pkt.timestampNs / 2**8) & 0xFF;
            pcapPtr[15] = pkt.timestampNs & 0xFF;

            pcapPtr[16] = (pkt.compensation / 0x100000000000000) & 0xFF;
            pcapPtr[17] = (pkt.compensation / 0x1000000000000) & 0xFF;
            pcapPtr[18] = (pkt.compensation / 0x10000000000) & 0xFF;
            pcapPtr[19] = (pkt.compensation / 0x100000000) & 0xFF;
            pcapPtr[20] = (pkt.compensation / 0x1000000) & 0xFF;
            pcapPtr[21] = (pkt.compensation / 0x10000) & 0xFF;
            pcapPtr[22] = (pkt.compensation / 0x100) & 0xFF;
            pcapPtr[23] = pkt.compensation & 0xFF;
        }
        else
        {
            alert("Unsupported ecpriMessage: " + pkt.ecpriMessage);
        }

        let pcapPtrDiff = pcapPtrOffset - pcapPktOffset - 16 - 14 - vlanHdrLen - 4;
        let localPayloadSize = pkt.ecpriPayload;
        let localPktLen = pktLen;

        if ( isBetaPkt )
        {
            uplaneBaseMsgPayload = 12;
            localPayloadSize = uplaneBaseMsgPayload + totalPrbSize;
            if ( localPayloadSize !== pkt.ecpriPayload )
            {
                pcapPtr = new Uint8Array( pcapBuffer, ecpriPayloadPtrOffset );
                pcapPtr[0] = localPayloadSize >> 8;
                pcapPtr[1] = localPayloadSize;
                localPktLen = pktLen - pkt.ecpriPayload + localPayloadSize;
                pcapPtr = new Uint8Array( pcapBuffer, pktLenPtrOffset );
                pcapSet4( pcapPtr, 0, localPktLen );
                pcapSet4( pcapPtr, 4, localPktLen );
                pkt.ecpriPayload = localPayloadSize;
            }
        }

        if( pcapPtrDiff !== pkt.ecpriPayload ) {
            console.log("pkt #" + pktIdx + " pcapPtrDiff(" + pcapPtrDiff + ") != pkt.ecpriPayload(" + pkt.ecpriPayload + ")");
        }
        pcapPktOffset += 16 + localPktLen;
    }
    logInfo( 'eCoG', 'PCAP size: ' + pcapSize + ' bytes or ' + formatBytes( pcapSize ) );

    return new Uint8Array(pcapBuffer);
    // download( ecog_config.filename + '.pcap', new Uint8Array(pcapBuffer) );
}

function generate_and_download_pcap(result){

    if(getElementById('ui_out_pcap').checked){
        const generated =  generate_pcap();
        download( ecog_config.filename + '.pcap', generated);
    }
    else if(getElementById('ui_out_json').checked){
        download( ecog_config.filename + '.json', result);
    }

}

async function generate()
{
    let perfNow = performance.now();

    if( !validate_config() ) {
        logWarning( 'eCoG', 'Config validation failed');
        return false;
    }

    if( ecog_config.mode === 'generator' ) {
        if( !await generate_packets() ) {
            return false;
        }
    }

    if( ecog_config.timing_mode === 'xstep' )
    {
        const numSlots = ecog_config.frame_structure.length;
        const maxTime = numSlots * 0.001 / ( 1 << ecog_config.u );
        for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx ) {
            generated_packets[pktIdx].time = ( generated_packets[pktIdx].time + maxTime ) % maxTime;
        }
    }
    else if( ecog_config.timing_mode === 'egen' )
    {
        const numSlots = ecog_config.frame_structure.length;
        const numOfSubframes = Math.ceil( numSlots / ( 1 << ecog_config.u ) );
        const maxTime = 0.001 * numOfSubframes;
        logInfo( 'eCoG', 'eGen mode: packets aligned to numOfSubframes: ' + numOfSubframes + ', maxTime: ' + maxTime * 1000 + ' ms' );
        for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx ) {
            let pkt = generated_packets[pktIdx];
            let pktTime = pkt.time;
            let pktFinalSf = pkt.frameId * 10 + pkt.subframeId;

            if( pkt.time < 0 ) {
                pktTime += maxTime;
                pktFinalSf += numOfSubframes;
            } else if( pkt.time >= maxTime ) {
                pktTime -= maxTime;
                pktFinalSf -= numOfSubframes;
                if( pktFinalSf < 0 ) pktFinalSf += 256 * 10;
            }
            pkt.time = pktTime;
            pkt.frameId = Math.floor( pktFinalSf / 10 );
            pkt.subframeId = pktFinalSf % 10;
        }
    }

    // Sort packets by time. If time equal than C-Plane msgs should be first
    if( ecog_config.sort_packets )
    {
        generated_packets.sort( function( a, b ) {
            let timeDiff = a.time - b.time;
            if (timeDiff !== 0) return timeDiff;
            return b.ecpriMessage - a.ecpriMessage;
        });
    }

    if( !validate_packets() ) return;

    let pktStats = [0, 0, 0, 0];
    let tputStats = [0, 0];
    let minTime = generated_packets.length > 0 ? generated_packets[0].time : 0;
    let maxTime = generated_packets.length > 0 ? generated_packets[0].time : 0;
    for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx )
    {
        const pkt = generated_packets[pktIdx];
        ++pktStats[pkt.ecpriMessage + pkt.dataDirection];
        tputStats[pkt.dataDirection] += 14 + ( ecog_config.vlan_enable ? 4 : 0 ) + 4 + pkt.ecpriPayload;
        if( pkt.time > maxTime ) maxTime = pkt.time;
        if( pkt.time < minTime ) minTime = pkt.time;
    }
    const deltaTime = Math.round( ( maxTime - minTime ) * 1000 ) / 1000;
    for( let i = 0; i < 2; ++i ) { tputStats[i] = ( tputStats[i] / deltaTime ) * 8 / 1024 / 1024; }

    logInfo( 'eCoG', 'C-Plane (DL/UL) packets: ' + pktStats[3] + '/' + pktStats[2] );
    logInfo( 'eCoG', 'U-Plane (DL/UL) packets: ' + pktStats[1] + '/' + pktStats[0] );
    logInfo( 'eCoG', 'Time: ' + Math.round( minTime * 1000000 ) / 1000 + '...' + Math.round( maxTime * 1000000 ) / 1000 + ' ms' );
    logInfo( 'eCoG', 'Estimate tput DL: ' + tputStats[1].toFixed(2) + ' Mbits/s, UL: ' + tputStats[0].toFixed(2) + ' Mbits/s, total: ' + ( tputStats[0] + tputStats[1] ).toFixed(2) + 'Mbits/s' );

    if( ecog_config.output_json ) { return generate_json(); }
    if( ecog_config.output_pcap ) { return generate_pcap(); }

    logDebug( 'eCoG', `Generation took ${( performance.now() - perfNow ).toFixed(2)} ms` );
}

let json_ind;
let json_str;

function json_helper( name, str, isLast = false ) {
    json_str += json_ind + '"' + name + '": ' + str + ( isLast ? '\n' : ',\n' );
}

function json_helper_arr( name, arr, isLast = false ) {
    json_str += json_ind + '"' + name + '": [ ';
    if( arr.length > 0 ) {
        for (let i = 0; i < arr.length - 1; ++i) {
            json_str += arr[i] + ', ';
        }
        json_str += arr[arr.length - 1];
    }
    json_str += (isLast ? ' ]\n' : ' ],\n');
}

function generate_json()
{
    json_str = '[\n';

    for( let pktIdx = 0; pktIdx < generated_packets.length; ++pktIdx )
    {
        let pkt = generated_packets[pktIdx];
        json_ind = '    ';
        json_str += '  {\n';
        json_helper( 'time', pkt.time );
        json_helper( 'ecpriVersion', pkt.ecpriVersion );
        json_helper( 'ecpriConcat', pkt.ecpriConcat );
        json_helper( 'ecpriMessage', pkt.ecpriMessage );
        json_helper( 'ecpriPayload', pkt.ecpriPayload );
        json_helper( 'ecpriRtcid', pkt.ecpriRtcid );
        json_helper( 'ecpriSeqid', pkt.ecpriSeqid );
        json_helper( 'dataDirection', pkt.dataDirection );
        json_helper( 'payloadVersion', pkt.payloadVersion );
        json_helper( 'filterIndex', pkt.filterIndex );
        json_helper( 'frameId', pkt.frameId );
        json_helper( 'subframeId', pkt.subframeId );
        json_helper( 'slotId', pkt.slotId );
        json_helper( 'startSymbolId', pkt.startSymbolId );

        if( pkt.ecpriMessage === 0 )
        {
            json_str += '    "sections": [\n';
            for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
            {
                let pktSect = pkt.sections[sectIdx];
                json_str += '      {\n';
                json_ind = '        ';
                json_helper( 'sectionId', pktSect.sectionId );
                json_helper( 'rb', pktSect.rb );
                json_helper( 'symInc', pktSect.symInc );
                json_helper( 'startPrbu', pktSect.startPrbu );
                json_helper( 'numPrbu', pktSect.numPrbu );

                if( ecog_config.dynamic_iq_comp ) {
                    json_helper( 'udCompHdr', pktSect.udCompHdr );
                }

                json_helper_arr( 'iSample', pktSect.iSample );
                json_helper_arr( 'qSample', pktSect.qSample, true );

                json_str += ( sectIdx !== ( pkt.sections.length - 1 ) ) ? '      },\n' : '      }\n';
            }
            json_str += '    ]\n';
        }
        else if( pkt.ecpriMessage === 2 )
        {
            json_helper( 'numberOfSections', pkt.numberOfSections );
            json_helper( 'sectionType', pkt.sectionType );

            if( pkt.sectionType === 0 || pkt.sectionType === 3 ) {
                json_helper( 'timeOffset', pkt.timeOffset );
                json_helper( 'frameStructure', pkt.frameStructure );
                json_helper( 'cpLength', pkt.cpLength );
                if( pkt.sectionType === 3 ) json_helper( 'udCompHdr', pkt.udCompHdr );
            }
            else if( pkt.sectionType === 1 || pkt.sectionType === 5 ) {
                json_helper( 'udCompHdr', pkt.udCompHdr );
            }
            else if( pkt.sectionType === 6 ) {
                json_helper( 'numberOfUEs', pkt.numberOfUEs );
            }

            json_str += '    "sections": [\n';
            for( let sectIdx = 0; sectIdx < pkt.sections.length; ++sectIdx )
            {
                let pktSect = pkt.sections[sectIdx];
                json_str += '      {\n';
                json_ind = '        ';

                if( pkt.sectionType === 0 || pkt.sectionType === 1 || pkt.sectionType === 3 || pkt.sectionType === 5 )
                {
                    json_helper( 'sectionId', pktSect.sectionId );
                    json_helper( 'rb', pktSect.rb );
                    json_helper( 'symInc', pktSect.symInc );
                    json_helper( 'startPrbc', pktSect.startPrbc );
                    json_helper( 'numPrbc', pktSect.numPrbc );
                    json_helper( 'reMask', pktSect.reMask );
                    json_helper( 'numSymbol', pktSect.numSymbol );
                    json_helper( 'ef', pktSect.ef, pkt.sectionType === 0 && !pktSect.ef );

                    if( pkt.sectionType === 1 || pkt.sectionType === 3 ) {
                        json_helper( 'beamId', pktSect.beamId, pkt.sectionType === 1 && !pktSect.ef );
                        if( pkt.sectionType === 3 ) {
                            json_helper( 'freqOffset', pktSect.freqOffset, !pktSect.ef );   // TODO: should freqOffset be transformed into Unsigned Num??
                        }
                    }
                    else if( pkt.sectionType === 5 ) {
                        json_helper( 'ueId', pktSect.ueId, !pktSect.ef );
                    }
                }
                else if( pkt.sectionType === 6 )
                {
                    json_helper( 'ef', pktSect.ef );
                    json_helper( 'ueId', pktSect.ueId );
                    json_helper( 'regularizationFactor', pktSect.regularizationFactor );
                    json_helper( 'rb', pktSect.rb );
                    json_helper( 'symInc', pktSect.symInc );
                    json_helper( 'startPrbc', pktSect.startPrbc );
                    json_helper( 'numPrbc', pktSect.numPrbc );
                    json_helper_arr( 'ciIsample', pktSect.ciIsample );
                    json_helper_arr( 'ciQsample', pktSect.ciQsample, !pktSect.ef );
                }
                else if( pkt.sectionType === 7 )
                {
                    json_helper( 'laaMsgType', pktSect.laaMsgType );
                    json_helper( 'laaMsgLen', pktSect.laaMsgLen );
                    json_helper( 'lbtHandle', pktSect.lbtHandle );
                    switch( pktSect.laaMsgType )
                    {
                        case 0:
                            json_helper( 'lbtOffset', pktSect.lbtOffset );
                            json_helper( 'lbtMode', pktSect.lbtMode );
                            json_helper( 'lbtDeferFactor', pktSect.lbtDeferFactor );
                            json_helper( 'lbtBckoffCounter', pktSect.lbtBckoffCounter );
                            json_helper( 'MCOT', pktSect.MCOT, true );
                            break;
                        case 1:
                            json_helper( 'lbtOffset', pktSect.lbtOffset );
                            json_helper( 'lbtMode', pktSect.lbtMode, true );
                            break;
                        case 2:
                            json_helper( 'lbtPdschRes', pktSect.lbtPdschRes );
                            json_helper( 'inParSF', pktSect.inParSF );
                            json_helper( 'sfStatus', pktSect.sfStatus );
                            json_helper( 'sfnSf', pktSect.sfnSf, true );
                            break;
                        case 3:
                            json_helper( 'lbtDrsRes', pktSect.lbtDrsRes, true );
                            break;
                        case 4:
                            json_helper( 'lbtBufErr', pktSect.lbtBufErr, true );
                            break;
                        case 5:
                            json_helper( 'lbtCWConfig_H', pktSect.lbtCWConfig_H );
                            json_helper( 'lbtCWConfig_T', pktSect.lbtCWConfig_T );
                            json_helper( 'lbtMode', pktSect.lbtMode );
                            json_helper( 'lbtTrafficClass', pktSect.lbtTrafficClass, true );
                            break;
                        case 6:
                            json_helper( 'lbtCWR_Rst', pktSect.lbtCWR_Rst, true );
                            break;
                    }
                }

                if( pktSect.ef )
                {
                    json_str += '        "extensions": [\n';
                    for( let sectExtIdx = 0; sectExtIdx < pktSect.extensions.length; ++sectExtIdx )
                    {
                        let pktSectExt = pktSect.extensions[sectExtIdx];
                        json_str += '          {\n';
                        json_ind = '            ';
                        json_helper( 'ef', pktSectExt.ef );
                        json_helper( 'extType', pktSectExt.extType );
                        json_helper( 'extLen', pktSectExt.extLen );
                        switch( pktSectExt.extType )
                        {
                            case 1:
                                json_helper( 'bfwCompHdr', pktSectExt.bfwCompHdr );
                                // json_helper( 'bfwCompParam', pktSectExt.bfwCompParam );
                                json_helper_arr( 'bfwI', pktSectExt.bfwI );
                                json_helper_arr( 'bfwQ', pktSectExt.bfwQ, true );
                                break;
                            case 3:
                                json_helper( 'codebookIndex', pktSectExt.codebookIndex );
                                json_helper( 'layerId', pktSectExt.layerId );
                                json_helper( 'numLayers', pktSectExt.numLayers, pktSectExt.extLen === 1 );
                                if( pktSectExt.extLen === 4 ) {
                                    json_helper( 'txScheme', pktSectExt.txScheme );
                                    json_helper( 'crsReMask', pktSectExt.crsReMask );
                                    json_helper( 'crsShift', pktSectExt.crsShift );
                                    json_helper( 'crsSymNum', pktSectExt.crsSymNum );
                                    json_helper( 'beamIdAP1', pktSectExt.beamIdAP1 );
                                    json_helper( 'beamIdAP2', pktSectExt.beamIdAP2 );
                                    json_helper( 'beamIdAP3', pktSectExt.beamIdAP3, true );
                                }
                                break;
                            case 4:
                                json_helper( 'csf', pktSectExt.csf );
                                json_helper( 'modCompScaler', pktSectExt.modCompScaler, true );
                                break;
                            case 5:
                                break;
                            case 6:
                                json_helper( 'repetition', pktSectExt.repetition );
                                json_helper( 'rbgSize', pktSectExt.rbgSize );
                                json_helper( 'rbgMask', pktSectExt.rbgMask );
                                json_helper( 'priority', pktSectExt.priority );
                                json_helper( 'symbolMask', pktSectExt.symbolMask, true );
                                break;
                            case 7:
                                json_helper( 'eAxCmask', pktSectExt.eAxCmask, true );
                                break;
                            case 8:
                                json_helper( 'regularizationFactor', pktSectExt.regularizationFactor, true );
                                break;
                            case 9:
                                json_helper( 'technology', pktSectExt.technology, true );
                                break;
                            case 14:
                                json_helper( 'nullLayerInd', pktSectExt.nullLayerInd, true );
                                break;
                            case 15:
                                json_helper( 'frameStructure', pktSectExt.frameStructure );
                                json_helper( 'freqOffset', pktSectExt.freqOffset );
                                json_helper( 'cpLength', pktSectExt.cpLength, true );
                                break;
                        }
                        json_str += ( sectExtIdx !== ( pktSect.extensions.length - 1 ) ) ? '          },\n' : '          }\n';
                    }
                    json_str += '        ]\n';
                }
                json_str += ( sectIdx !== ( pkt.sections.length - 1 ) ) ? '      },\n' : '      }\n';
            }
            json_str += '    ]\n';
        }
        json_str += ( pktIdx !== ( generated_packets.length - 1 ) ) ? '  },\n' : '  }\n';
    }

    json_str += ']';

    return json_str;
    // return json_str;
    // download( ecog_config.filename + '.json', json_str );
}