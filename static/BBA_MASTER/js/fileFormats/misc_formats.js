function bin_decode( bufferReader ){
    let byte = new Uint8Array(bufferReader.buffer);
    byte = byte.slice(config.load.loadLimitFrom * 4); //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : byte.length/4);

    process_decoded_samples(loadBin16Samples(byte, packetsToLoad));
    return true;
}

function float_decode( bufferReader ){
    let byte = new Uint8Array(bufferReader.buffer);
    byte = byte.slice(config.load.loadLimitFrom * 2 * 4);
    config.load.timeDomain = true;
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : byte.length/8);

    process_decoded_samples(loadFloat32Samples(byte, packetsToLoad));
    return true;
}

/**
 * @param {string} fileContents
 * @returns {boolean}
 */
function hex_decode( fileContents ){
    let line_array  = fileContents.split("\n").filter((line) => line.length > 0);
    line_array = line_array.slice(config.load.loadLimitFrom); //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : line_array.length);

    process_decoded_samples(loadHexPackets(line_array, packetsToLoad));
    return true;
}

/**
 * @param {string} fileContents
 * @returns {boolean}
 */
function madehex_decode( fileContents ){
    let line_array  = fileContents.split("\n").filter((line) => line.length > 0);
    line_array = line_array.slice(config.load.loadLimitFrom); //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : line_array.length);

    config.load.timeDomain = true;

    process_decoded_samples(loadMadeHexPackets(line_array, packetsToLoad));
    return true;
}

/**
 * @param {string} fileContents
 * @returns {boolean}
 */
function csv_decode( fileContents ){
    let line_array  = fileContents.split("\n").filter((line) => line.length > 0);
    line_array = line_array.slice(config.load.loadLimitFrom); //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : line_array.length);

    process_decoded_samples(loadCSVPackets(line_array, packetsToLoad));
    return true;
}
function iqfp_decode( bufferReader ){
    let byte = new Uint8Array(bufferReader.buffer);
    byte = byte.slice(config.load.loadLimitFrom * 4);   //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : byte.length/4);

    process_decoded_samples(loadIQFPSamples(byte, packetsToLoad));
    return true;
}
function rtg_iphy_decode( bufferReader ){
    let byte = new Uint8Array(bufferReader.buffer);
    byte = byte.slice(config.load.loadLimitFrom * 4);   //TODO: unnescessary copy, can be a view
    const packetsToLoad = parseInt(config.load.loadLimit > 0 ? config.load.loadLimit : byte.length/4);

    config.load.littleEndian = true;
    config.load.timeDomain = true;
    config.load.swapIq = true;

    process_decoded_samples(loadBin16Samples(byte, packetsToLoad));
    return true;
}

function process_decoded_samples(samples){
    let firstAntId;
    if(!config.load.aggregateMode) {
        firstAntId = (config.load.dir === "UL" ? 0 : 0x10000);
        deleteTimeBuffers();
    }
    else{
        const u = config.load.defaultU;
        let i = (config.load.dir === "UL" ? 0 : 0x10000);
        while(iqBuffers[u] && iqBuffers[u][i]) i++;

        firstAntId = i;
    }


    const numOfAnt = loadDialog_numAnt.value;
    let samplesPerAnt = {};
    for(let i = 0; i < numOfAnt; i++) samplesPerAnt[i] = {"i": [], "q": []}

    for(let sampleId = 0; sampleId < samples.i.length; sampleId++){
        samplesPerAnt[sampleId % numOfAnt]["i"].push(samples["i"][sampleId]);
        samplesPerAnt[sampleId % numOfAnt]["q"].push(samples["q"][sampleId]);
    }

    for(let i = 0; i < numOfAnt; i++){
        const antId = firstAntId + i;

         if(config.load.timeDomain){
            bindTimeBuffers(antId, samplesPerAnt[i]);
            parseTimeIQtoIQ(antId);
        }
        else{
            bindFreqBuffers(samplesPerAnt[i].i, samplesPerAnt[i].q, antId);
        }
    }
    canvas_isFullRender = true
}

function deleteTimeBuffers(){
    for( let u = 0; u < NUM_OF_U; ++u ) {
        if(gl_time_I_Buffers[u]){
            for( const antId in gl_time_I_Buffers[u] ) {
                gl_time_I_Buffers[u][antId] = null;
                gl_time_Q_Buffers[u][antId] = null;
                gl_timeBuffersLength[u][antId] = null;
            }
            gl_time_I_Buffers[u] = null;
            gl_time_Q_Buffers[u] = null;
            gl_timeBuffersLength[u] = null;
        }
    }

}

function loadHexPackets(csv_array, packetsToLoad){
    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }

    for (let n = 0; n < packetsToLoad; n++) {
        let [_s_i, _s_q] = load_Hex_bytes(csv_array[n], config.load.littleEndian);

        samples.i[n] = ctoi_16bit_signed(_s_i);
        samples.q[n] = ctoi_16bit_signed(_s_q);
    }
    if(config.load.swapIq) [samples.i, samples.q] = [samples.q, samples.i];

    return samples;
}

function loadMadeHexPackets(hex_array, packetsToLoad){
    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }

    for (let n = 0; n < packetsToLoad; n++) {
        let i_sample = hex_array[n].slice(2, 6);
        let q_sample = hex_array[n].slice(8,12);

        samples.i[n] = ctoi_16bit_signed(i_sample);
        samples.q[n] = ctoi_16bit_signed(q_sample);
    }

    return samples;
}


function loadCSVPackets(csv_array, packetsToLoad){
    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }

    let startline=0;

    while ( (csv_array[startline] === '#') || (csv_array[startline] === '#\r') || (csv_array[startline].charAt(0) === '#') ) startline++;

    let separator;

    if (csv_array[startline].indexOf(";" )>=0)
        separator=";";
    else if (csv_array[startline].indexOf("\t")>=0)
        separator="\t";
    else if(csv_array[startline].indexOf(" ")>=0 && (csv_array[startline].indexOf(" ") !== csv_array[startline].length-1))
        separator=" ";
    else if(csv_array[startline].indexOf("," )>=0)
        separator=",";
    else if(csv_array[startline].match(/[+|-]/g) && csv_array[startline].match(/[+|-]/g).length >= 0){
        separator='+-';
    }
    else{
        logError("CSV","This is not a proper CSV file!");
        return {"i" : [], "q" : []};
    }

    for (let n = 0; n < packetsToLoad; n++) {
        let [_s_i, _s_q] = load_Csv_bytes(csv_array[n], separator);

        samples.i[n] = _s_i;
        samples.q[n] = _s_q;
    }

    if ( v_max(samples.i)[0]>1 ){
        samples.i = v_dot_mul_const( samples.i, 1/32768 );
        samples.q = v_dot_mul_const( samples.q, 1/32768 );
    }

    if(config.load.swapIq) [samples.i, samples.q] = [samples.q, samples.i];

    return samples;
}
function loadBin16Samples(byte, packetsToLoad){

    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }
    for (let n = 0; n < packetsToLoad; n++) {
        let [_c_i, _c_q] = load_Bin_bytes(byte, n, config.load.littleEndian);

        samples.i[n] = itoi_16bit_signed(_c_i);
        samples.q[n] = itoi_16bit_signed(_c_q);
    }
    if(config.load.swapIq) [samples.i, samples.q] = [samples.q, samples.i];

    return samples;
}

function loadFloat32Samples(byte, packetsToLoad){
    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }

    let floatBuff = new Float32Array(byte.buffer);

    for(let n = 0; n < packetsToLoad; n++){
        samples.i[n] = floatBuff[2*n];
        samples.q[n] = floatBuff[2*n + 1]
    }

    return samples;
}

function loadIQFPSamples(byte, packetsToLoad){
    let samples = {
        i: new Array(packetsToLoad),
        q: new Array(packetsToLoad),
    }
    for (let n = 0; n < packetsToLoad; n++) {

        const val = byte[n*4] * 2**24 + (byte[n*4 + 1] * 2**16) + (byte[n*4 + 2] * 2**8) + (byte[n*4 + 3]);
        const iq = IQFP_to_iq(val);

        samples.i[n] = iq.i;
        samples.q[n] = iq.q;
    }
    if(config.load.swapIq) [samples.i, samples.q] = [samples.q, samples.i];

    return samples;
}

function load_Bin_bytes(byte, ptr, littleEndian){
    let _c_i, _c_q;
    if(!littleEndian) {
        _c_i=byte[ptr*4  ]*256+byte[ptr*4+1];
        _c_q=byte[ptr*4+2]*256+byte[ptr*4+3];
    }
    else {
        _c_i=byte[ptr*4+1]*256+byte[ptr*4];
        _c_q=byte[ptr*4+3]*256+byte[ptr*4+2];
    }

    return [_c_i, _c_q];
}

function load_Hex_bytes(str, littleEndian){
    let _s_i = str.slice(2, 6);
    let _s_q = str.slice(6, 10);

    if(littleEndian) {
        _s_i = reverseString(_s_i);
        _s_q = reverseString(_s_q);
    }

    return [_s_i, _s_q];
}

function load_Csv_bytes(str, separator){
    if(separator === '+-'){
        const splitted = str.split(/[+|-]/g);

        const firstNumber = splitted[0] === '' ? splitted[1] : splitted[0];
        const secondNumber = splitted[0] === '' ? splitted[2] : splitted[1];

        const firstSign = str[0];
        const secondSign = str.slice(1).includes('+') ? '+' : '-';
        return [parseFloat(firstSign+firstNumber), parseFloat(secondSign+secondNumber)];
    }

    const splitted = str.split(separator);
    return splitted[0] === '' ? [parseFloat(splitted[1]), parseFloat(splitted[2])] : [parseFloat(splitted[0]), parseFloat(splitted[1])]
}

function bindTimeBuffers(antId, samples){
    const u = config.load.defaultU;

    time_i[antId] = new Float32Array(samples.i);
    time_q[antId] = new Float32Array(samples.q);


    for(let i = 0; i < 4; i++){
        canvas_viewports[i].selectedAnt[u] = {[antId]: true};
        canvas_viewports[i].selectedU[u] = true;
    }

    if(!gl_time_I_Buffers[u]) gl_time_I_Buffers[u] = {};
    gl_time_I_Buffers[u][antId] = gl.createBuffer();
    if(!gl_time_Q_Buffers[u]) gl_time_Q_Buffers[u] = {};
    gl_time_Q_Buffers[u][antId] = gl.createBuffer();
    if(!gl_timeBuffersLength[u]) gl_timeBuffersLength[u] = {};
    gl_timeBuffersLength[u][antId] = time_i[antId].length;

    gl.bindBuffer( gl.ARRAY_BUFFER, gl_time_I_Buffers[u][antId] );
    gl.bufferData( gl.ARRAY_BUFFER, time_i[antId], gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, gl_time_Q_Buffers[u][antId] );
    gl.bufferData( gl.ARRAY_BUFFER, time_q[antId], gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, null);
}

function parseTimeIQtoIQ(antId){
    const u = config.load.defaultU;

    const {v_i, v_q} = !config.load.prachTD ? time_to_freq(antId) : time_to_freq_PRACH(antId);
    bindFFT_buffers(u, antId);
    bindFreqBuffers(v_i, v_q, antId);
}

function bindFreqBuffers(v_i, v_q, antId){
    const u = config.load.defaultU;
    const sampling = config.load.sampling * 1000000;
    const nprb = get_nPrb(u, sampling);

    if(!iqBuffers[u])
        iqBuffers[u]={};

    iqBuffers[u][antId] = new Float32Array( v_i.length*2 + config.load.shift_symbols * nprb * 24 );
    for(let i = 0; i < config.load.shift_symbols * nprb * 24; i++) iqBuffers[u][antId][i] = 0;

    for(let i = 0; i < v_i.length; i++){
        iqBuffers[u][antId][i*2 + config.load.shift_symbols * nprb * 24] = v_i[i];
        iqBuffers[u][antId][i*2+1 + config.load.shift_symbols * nprb * 24] = v_q[i];
    }

    if(!gl_iqBuffers[u]) gl_iqBuffers[u] = {};
    gl_iqBuffers[u][antId] = gl.createBuffer();
    if(!gl_iqTypeBuffers[u]) gl_iqTypeBuffers[u] = {};
    gl_iqTypeBuffers[u][antId] = gl.createBuffer();
    if(!gl_iqBuffersLength[u]) gl_iqBuffersLength[u] = {};
    gl_iqBuffersLength[u][antId] = v_i.length + v_q.length;

    gl.bindBuffer( gl.ARRAY_BUFFER, gl_iqBuffers[u][antId] );
    gl.bufferData( gl.ARRAY_BUFFER, iqBuffers[u][antId], gl.STATIC_DRAW );

    if(!iqNumPrb[u]) iqNumPrb[u] = {};
    if(!iqStartPrb[u]) iqStartPrb[u] = {};
    if(!iqFirstSubframe[u]) iqFirstSubframe[u] = {};
    if(!iqOffsets[u]) iqOffsets[u] = {};
    if(!packet_places[u]) packet_places[u] = {};
    if(!fcp_places[u]) fcp_places[u] = {};

    const slotNum = Math.ceil(v_i.length/(nprb * 12));
    const arrLength = Math.ceil(v_i.length/(nprb * NUM_OF_SLOTS_PER_U[u] * 14 * 12));
    iqNumPrb[u][antId] = new Array(arrLength);
    iqStartPrb[u][antId] = new Array(arrLength);
    iqFirstSubframe[u][antId] = 0;
    iqOffsets[u][antId] = new Array(arrLength);
    packet_places[u][antId] = {};
    fcp_places[u][antId] = {};

    for(let i = 0, j = 0, k = 0; i < v_i.length; i+= nprb * NUM_OF_SLOTS_PER_U[u] * 14 * 12, j++){
        iqOffsets[u][antId][j] = new Uint32Array(NUM_OF_SLOTS_PER_U[u] * 14);
        iqNumPrb[u][antId][j] = new Uint32Array(NUM_OF_SLOTS_PER_U[u] * 14).fill(nprb);
        iqStartPrb[u][antId][j] = new Uint32Array(NUM_OF_SLOTS_PER_U[u] * 14).fill(0);
        for(let h = 0; h < NUM_OF_SLOTS_PER_U[u] * 14; h++){
            if(j*NUM_OF_SLOTS_PER_U[u] * 14 + h >= slotNum){
                iqNumPrb[u][antId][j][h] = 0;
            }
            else if(j*NUM_OF_SLOTS_PER_U[u] * 14 + h + 1 === slotNum){
                iqNumPrb[u][antId][j][h] = (iqBuffers[u][antId].length/24) % (nprb)
            }
        }
        const k_copy = k;
        for(; k < k_copy+iqOffsets[u][antId][j].length && k < slotNum; k++)
            iqOffsets[u][antId][j][k-k_copy] = (k+1)*2*nprb*12 <= v_i.length*2 ? k*2*nprb*12 : null;
    }
    iq_maxAmplitude = findMaxAmplitude();

    if(!iqTypeBuffers[u]) iqTypeBuffers[u] = {};
    nr_fillIqTypes();
}

function convSame(x, h) {
    // Flip the filter (kernel)
    const hFlipped = h.slice().reverse();
    const N = x.length;
    const M = hFlipped.length;
    const fullLen = N + M - 1;
    const yFull = new Float32Array(fullLen);

    // Full convolution
    for (let n = 0; n < fullLen; n++) {
        for (let k = 0; k < M; k++) {
            if (n - k >= 0 && n - k < N) {
                yFull[n] += x[n - k] * hFlipped[k];
            }
        }
    }

    // Center and trim to 'same' length
    const start = Math.floor((M - 1) / 2);
    return yFull.slice(start, start + N);
}

function lagrange_interpolate(x, D, N) {
    if (N % 2 === 0) throw new Error('Filter length N must be odd');
    const M = (N - 1) / 2;
    const n = new Int32Array(N);
    for (let i = 0; i < N; i++) n[i] = i - M;

    // Compute Lagrange FIR coefficients
    const h = new Float32Array(N).fill(1);
    for (let k = 0; k < N; k++) {
        for (let m = 0; m < N; m++) {
            if (m !== k) {
                h[k] *= (D - n[m]) / (n[k] - n[m]);
            }
        }
    }

    return convSame(x, h);
}

function time_to_freq(antId){
    let fft_IQ = [];
    const u = config.load.defaultU;
    const sampling =config.load.sampling*1000000;   // TODO: explain conversion
    let nprb = 12*get_nPrb(u, sampling);

    const scaling = 64/(1<<u);
    const Ncp      =  (144*scaling)/16;
    const sr_factor = Math.round( sampling/7680000 );
    const cp_map = ones( 7*(1<<u), Ncp * sr_factor/16  );
    cp_map[0] = (Ncp+64) * sr_factor/16;
    let fft_size = Math.round(8192/(1<<u)* sr_factor/16);
    if(nprb>fft_size) nprb = 12*Math.floor(fft_size/12);

    const shift_symbols = config.load.shift_symbols ? config.load.shift_symbols : 0;
    let offset = config.load.shift_samples, symbol = 0;

    const fractional_shift = -config.load.shift_fraction;   // To keep compliance with Matlab convolution, flip the sign
                                                                    // I don't know why though
    if (fractional_shift !== undefined) {
        time_i[antId] = lagrange_interpolate(time_i[antId], fractional_shift, 21);
        time_q[antId] = lagrange_interpolate(time_q[antId], fractional_shift, 21);
    }

    while( offset+fft_size+1 < time_i[antId].length ){
        const cplen = cp_map[(symbol+shift_symbols)%cp_map.length];
        if ( cplen<0 ) { offset +=-cplen; symbol++; continue; }
        offset += cplen;

        const sig_real = time_i[antId].slice(offset, offset+fft_size);
        const sig_imag = time_q[antId].slice(offset, offset+fft_size);
        const tmp = fft(sig_real, sig_imag);
        fft_IQ.push({v_i: tmp.v_i, v_q: tmp.v_q});

        symbol++;
        offset += fft_size;
    }

    config.iqTab.guardband_size = fft_size-nprb;
    config.iqTab.fft_size = fft_size;
    config.iqTab.nprb = nprb;

    const v_i = new Float32Array( (fft_IQ.length+1)*nprb );
    const v_q = new Float32Array( (fft_IQ.length+1)*nprb );

    let len = 0;
    for(let i = 0; i < fft_IQ.length; i++){
        fft_shift_and_guardband_removal_set( v_i, fft_IQ[i].v_i, fft_size, nprb, i*nprb);
        fft_shift_and_guardband_removal_set( v_q, fft_IQ[i].v_q, fft_size, nprb, i*nprb);
        len += fft_IQ[i].v_q.length*2;
    }

    if(!iqBuffers[u]) iqBuffers[u]={};
    iqBuffers[u][antId] = new Float32Array( v_i.length*2 );
    for(let i = 0; i < v_i.length; i++){
        iqBuffers[u][antId][i*2] = v_i[i];
        iqBuffers[u][antId][i*2+1] = v_q[i];
    }

    if(!fftBuffers[u]) fftBuffers[u]={};
    fftBuffers[u][antId] = new Float32Array( len );

    if(!fftTypeBuffers[u]) fftTypeBuffers[u]={};
    fftTypeBuffers[u][antId] = new Float32Array( len/2 ).fill(1);
    let k = 0;
    for(let i = 0; i < fft_IQ.length; i++){
        for(let j = 0; j < fft_size; j++){
            fftBuffers[u][antId][k++] = ((j + fft_size/2)%fft_size);
            fftBuffers[u][antId][k++] = Math.sqrt(fft_IQ[i].v_i[j]*fft_IQ[i].v_i[j] + fft_IQ[i].v_q[j]*fft_IQ[i].v_q[j]);
        }
    }

    calculate_fftMeanLineData(u, antId);

    return {v_i, v_q};
}

function fft_shift_and_guardband_removal_set( out, v, fft_size, num_sc, out_pos)
/* Float32Array implementation */
{
    var d = fft_size- num_sc/2;
    out.set( v.subarray( d, fft_size ), out_pos );
    out.set( v.subarray( 0, num_sc/2) , out_pos+fft_size-d );
}

function guess_ecpri_nPRB(u){
    if(config.load.nprb) return config.load.nprb;
    const nPRB = get_nPrb(u, config.load.sampling * 1000000);
    const MaxPRB = findMaxPRBPerU()[u];
    return MaxPRB <= nPRB ? nPRB : 273;

}

function get_nPrb(u, sampling) {
    if(config.load.nprb) return config.load.nprb;
    u = parseInt(u);
    let maxPrbTable;
    switch (u) {
        //38.101-1, 38.101-2: table 5.3.2-1
        case 0: maxPrbTable = [270, 216, 160, 133, 106, 79, 52, 25]; break
        case 1: maxPrbTable = [273, 245, 217, 162, 133, 106, 78, 65, 51, 38, 24, 11]; break
        case 3: maxPrbTable = [264, 132, 66, 32]; break
        default: maxPrbTable = []
    }

    let prbLimit = sampling / (15000 << u) / 12 * 4/5;  // TODO: explain magic numbers and conversion
    let maxPrb = maxPrbTable.find(prb => prb <= prbLimit);

    if (!maxPrb) {
        maxPrb = 273;
    }
    return maxPrb
}

/**
 * @param {ArrayBuffer} buf
 * @returns {boolean}
 */
function bin_preload( buf ){
    return loadDialog_file[loadDialog_file.length-1].name.endsWith('bin');
}
/**
 * @param {ArrayBuffer} buf
 * @returns {boolean}
 */
function float_preload( buf ){
    return loadDialog_file[loadDialog_file.length-1].name.endsWith('float32');
}
/**
 * @param {ArrayBuffer} buf
 * @returns {boolean}
 */
function hex_preload( buf ){
    return loadDialog_file[loadDialog_file.length-1].name.endsWith('txt');
}
/**
 * @param {ArrayBuffer} buf
 * @returns {boolean}
 */
function csv_preload( buf ){
    return loadDialog_file[loadDialog_file.length-1].name.endsWith('csv');
}