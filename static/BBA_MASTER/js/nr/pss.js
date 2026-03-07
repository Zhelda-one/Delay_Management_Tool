//Based on 7.4.2.2 of 38211 (Primary synchronization signal)
function pss_encode(N_ID_2){
    const d = new Array(127);
    let x = [ 0,1,1,0,1,1,1 ];

    for( let i = 0; i<120; i++)
        x[i+7] = x[i+4]^x[i];

    for( let n = 0; n<127; n++){
        const m = ( n+43*N_ID_2 )%127;
        d[n] = 1-2*x[m];
    }

    return {"v_i": d, "v_q": zeros(127)};
}

