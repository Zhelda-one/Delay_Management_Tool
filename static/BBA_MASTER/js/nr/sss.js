//Based on 7.4.2.3 of 38211 (Secondary synchronization signal)
function sss_encode(N_ID_1, N_ID_2) {
    let d  = new Array(127);
    const m0 = 15*Math.floor(N_ID_1/112)+5*N_ID_2;
    const m1 = N_ID_1%112;

   
    const x0 = [1, 0, 0, 0, 0, 0, 0];
    const x1 = [1, 0, 0, 0, 0, 0, 0];

    for( let i = 0; i<120; i++){
        x0[i+7] = x0[i+4]^x0[i];
        x1[i+7] = x1[i+1]^x1[i];
    }

    for( let n = 0; n<127; n++){
        d[n] = (1-2*x0[(n+m0)%127])*(1-2*x1[(n+m1)%127]);
    }

    return {"v_i": d, "v_q": zeros(127)};
}