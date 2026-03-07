let beamPatterns = [];

function draw_beam_pattern(beamPattern, lambda){

    let x = [];
    let y = [];

    let min_amp = 999999;
    let max_amp = -999999, max_ang = -1;
    let amplitudes = [];

    for(let ang = 0; ang < 180; ang+=0.05){
        const amp_db = Math.log10((calculate_beam_pattern(beamPattern, ang*Math.PI / 180, lambda)));
        amplitudes.push({ang: ang,amp_db:amp_db});
        if(min_amp > amp_db) min_amp = amp_db;
        if(max_amp < amp_db) {
            max_amp = amp_db;
            max_ang = ang;
        }
    }

    for(let i = 0; i < amplitudes.length; i++){
        amplitudes[i].amp_db -= min_amp;
        y.push(Math.sin(amplitudes[i].ang*Math.PI / 180) * amplitudes[i].amp_db);
        x.push(Math.cos(amplitudes[i].ang*Math.PI / 180) * amplitudes[i].amp_db);
    }

    return {x:x, y:y, max_amp:max_amp, min_amp:min_amp, max_ang:max_ang.toFixed(2)};
}

function draw_beam_pattern_2D(beamPattern, lambda){

    let x = [], y = [], z = [];

    let min_amp = 999999, max_amp = -999999, max_ang = -1;
    let amplitudes = [];

    for(let theta = 0; theta < 360; theta+=4){
        for(let phi = 0; phi < 360; phi+=4) {
            // for(let theta = -90; theta < 90; theta+=1){
            //     for(let phi = -90; phi < 90; phi+=1) {

            const theta_converted = theta * Math.PI / 180;
            const phi_converted = phi * Math.PI / 180;
            const amp_db = ((calculate_beam_pattern_2D(beamPattern, theta_converted, phi_converted, lambda)));
            amplitudes.push((amp_db));

            // if (min_amp > amp_db) min_amp = amp_db;
            // if (max_amp < amp_db) {
            //     max_amp = amp_db;
            // }
        }
    }


    let i = 0;
    for(let theta = 0; theta < 360; theta+=4){
        for(let phi = 0; phi < 360; phi+=4) {

            const theta_converted = theta * Math.PI / 180;
            const phi_converted = phi * Math.PI / 180;

            const amp_db = amplitudes[i++] ;
            // x.push(Math.sin(theta_converted) * Math.cos(phi_converted) * amp_db);
            // y.push(Math.sin(theta_converted) * Math.sin(phi_converted) * amp_db);
            // z.push(Math.cos(theta_converted) * amp_db);

            x.push(Math.sin(theta_converted) * Math.cos(phi_converted));
            y.push(Math.sin(theta_converted) * Math.sin(phi_converted));
            z.push(amp_db);

        }
    }

    const data = [{
        z: z,
        x: x,
        y: y,
        type: 'scatter3d',

        marker: {
            color: 'rgb(127, 127, 127)',
            size: 1,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1},
            opacity: 0.8},
    }];
    const layout = {
        title: '3D beamplotting',
        autosize: true,
        showlegend: false,

        width: 500,
        height: 500,
        margin: {
            l: 65,
            r: 50,
            b: 65,
            t: 90,
        }
    };

    Plotly.newPlot('packetDetailsDialog_beamplotting_options_2D', data, layout);



    return {x:x, y:y, max_amp:max_amp, min_amp:min_amp, max_ang:max_ang.toFixed(2)};
}

function calculate_beam_pattern(beamPattern, theta, lambda){

    const N = beamPattern.length;
    let d = lambda/2; //distance between sensors
    let real = 0, imag = 0;

    for(let m = 0; m < N; m++){
        const tmp_real = Math.cos(2*Math.PI*d*m*Math.cos(theta)/lambda);
        const tmp_imag = Math.sin(2*Math.PI*d*m*Math.cos(theta)/lambda);

        real += beamPattern[m].re * tmp_real - beamPattern[m].im * tmp_imag;
        imag += beamPattern[m].im * tmp_real + beamPattern[m].re * tmp_imag;
    }

    return real**2 + imag**2;
}

function calculate_beam_pattern_2D(beamPattern, theta, phi, lambda) {

    const M = 4;
    const N = 8;
    let h = lambda/2; //distance between sensors
    let v = lambda/2; //distance between sensors
    let real = 0, imag = 0;

    const psi_x = 2*Math.PI*h*Math.sin(theta)*Math.cos(phi)/lambda;
    const psi_y = 2*Math.PI*v*Math.sin(theta)*Math.sin(phi)/lambda;

    for(let n = 0; n < N; n++) {
        for(let m = 0; m < M; m++) {

            const tmp_real = Math.cos(n*psi_x+m*psi_y);
            const tmp_imag = Math.sin(n*psi_x+m*psi_y);

            // const tmp_real = Math.cos(2*Math.PI * (h*n*Math.sin(theta)*Math.sin(phi) + v*m*Math.cos(phi)) / lambda);
            // const tmp_imag = Math.sin(2*Math.PI * (h*n*Math.sin(theta)*Math.sin(phi) + v*m*Math.cos(phi)) / lambda);

            real += beamPattern[n*4 + m].re * tmp_real - beamPattern[n*4 + m].im * tmp_imag;
            imag += beamPattern[n*4 + m].im * tmp_real + beamPattern[n*4 + m].re * tmp_imag;
        }
    }

    return real**2 + imag**2;
}

function drawBeamformingWeights(){

    const beam_index = parseInt(getElementById('packetDetailsDialog_beamplotting_select').value);
    const beam_lambda = parseFloat(getElementById('packetDetailsDialog_beamplotting_lambda').value);

    if(packetHasBeamformingWeights(clicked_packet)){
        const values = draw_beam_pattern(beamPatterns[clicked_packet][beam_index], beam_lambda);
        const values2 = draw_beam_pattern_2D(beamPatterns[clicked_packet][beam_index], beam_lambda);

        const packetDetailsDialog_beam_graph = getElementById('packetDetailsDialog_beam_graph');
        packetDetailsDialog_beam_graph.caption = `Best angle: ${values.max_ang}&deg;`;
        packetDetailsDialog_beam_graph.graph2d.setRadianMode(true);
        packetDetailsDialog_beam_graph.graph2d.setModeLine();
        packetDetailsDialog_beam_graph.graph2d.draw([values.x, [0, (values.max_amp - values.min_amp) * Math.cos(Math.PI * values.max_ang / 180)]], [values.y, [0, (values.max_amp - values.min_amp) * Math.sin(Math.PI * values.max_ang / 180)]]);
    }
}

function appendBeamformingOptions(){
    getElementById('packetDetailsDialog_beamplotting_select').innerHTML = '';

    if(!beamPatterns[clicked_packet]){
        getElementById('packetDetailsDialog_beamplotting_options').hidden = true;
        return;
    }

    getElementById('packetDetailsDialog_beamplotting_options').hidden = false;

    for(let i = 0; i < beamPatterns[clicked_packet].length; i++){
        const select = document.createElement('option');
        select.value = String(i);
        select.innerText = String(i);
        getElementById('packetDetailsDialog_beamplotting_select').appendChild(select);
    }
}

function packetHasBeamformingWeights(pktId){
    return beamPatterns[pktId] && beamPatterns[pktId].length;
}