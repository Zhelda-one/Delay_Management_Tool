let fftView_firstTimeOpening = true;
let fftMeanLineData = new Array(NUM_OF_U);
let blueLineShader = null;
let lineBuffer = null;
let fft_currentBufferInLOG = false;

function canvas_renderFFT_view(v, vf, vst) {

    if(fftView_firstTimeOpening){
        if(!config.load.timeDomain){
            fillFFTfreqDomain();
        }
        setFirstZoomAndTrans();
        fftView_firstTimeOpening = false;
    }

    if(v.submode === 1 && !fft_currentBufferInLOG){
        fft_view_changeLogScale();
    }
    else if(v.submode === 0 && fft_currentBufferInLOG){
        fft_view_changeNormalScale();
    }

    const leftPad = 65,
        rightPad = 0,
        topPad = 0,
        bottomPad = 20;

    const rectBorderThickness = 1.0;
    if (v.isResized || v.isModeChanged) {
        v.mouseShiftX = leftPad + rectBorderThickness;
        v.mouseShiftY = topPad + rectBorderThickness;
        v.usedWidth = v.width - v.mouseShiftX - rightPad - rectBorderThickness;
        v.usedHeight = v.height - v.mouseShiftY - bottomPad - rectBorderThickness;
    }


    const scaleX = (vst.scaleX[v.mode] * v.usedWidth) / v.width;
    const scaleY = (vst.scaleY[v.mode] * v.usedHeight) / v.height;
    const transX = ((vst.transX[v.mode] * vst.scaleX[v.mode]) * 2.0) / v.width;
    const transY = ((vst.transY[v.mode] * vst.scaleY[v.mode]) * 2.0) / -v.height;

    let xStart = (-1-transX)/(scaleX/v.aspectRatio), xEnd = (1-transX)/(scaleX/v.aspectRatio);
    let xSpan = xEnd - xStart;

    let yStart = (-1-transY)/scaleY, yEnd = (1-transY)/scaleY;
    let ySpan = yEnd - yStart;


    drawGuardbandMarkups(v, xStart, xSpan, yEnd, ySpan);
    iqTab_drawVerticalScale(v, xStart, xSpan, yEnd, ySpan);

    iqTab_loadFilterMaskForIqBuffer(v, vf);

    const shader = gl_constProg[0];
    shader.bind();
    shader.uniform1f("uPointSize", config.iqTab.constPointSize);
    shader.uniform2f("uScale", scaleX / v.aspectRatio, scaleY);
    shader.uniform2f("uTrans", transX, transY);

    gl.bindTexture(gl.TEXTURE_2D, v.iqTypesTexture);

    let numOfAnt = 0;
    for (let u = 0; u < NUM_OF_U; ++u) {
        if (gl_fftBuffers && gl_fftBuffers[u] && vf.selectedU[u]) {
            for (const antId in gl_fftBuffers[u]) {
                if (!vf.selectedAnt[u] || !vf.selectedAnt[u][antId]) continue;
                gl.bindBuffer(gl.ARRAY_BUFFER, gl_fftBuffers[u][antId]);
                gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, gl_fftTypeBuffers[u][antId]);
                gl.vertexAttribIPointer(1, 1, gl.UNSIGNED_BYTE, 0, 0);
                gl.drawArrays(gl.POINTS, 0, gl_fftBuffersLength[u][antId] / 2);
                numOfAnt++;
            }
        }
    }

    // FFT Gizmos, FFT Mean Line
    try {
        if(numOfAnt === 1){
            for (let u = 0; u < NUM_OF_U; ++u) {
                for (const antId in gl_fftBuffers[u]) {
                    if (!vf.selectedAnt[u] || !vf.selectedAnt[u][antId] || !vf.selectedU[u]) continue;
                    if(fftMeanLineData[u] && fftMeanLineData[u][antId]){

                        lineBuffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fftMeanLineData[u][antId]), gl.STATIC_DRAW);

                        if (blueLineShader === null) {
                            blueLineShader = new Shader("blue", blue_vs, blue_fs);
                        }

                        gl.lineWidth(3.0);
                        blueLineShader.bind();

                        blueLineShader.uniform2f("uScale", scaleX / v.aspectRatio, scaleY);
                        blueLineShader.uniform2f("uTrans", transX, transY);

                        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
                        gl.drawArrays(gl.LINE_STRIP, 0, fftMeanLineData[u][antId].length / 2);
                        gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    }
                }
            }
        }
    } catch (e) {
        console.error(e);
    }

    shader.unbind();
}

function calculate_fftMeanLineData(u, antId){
    if(!fftMeanLineData[u])
        fftMeanLineData[u] = {};
    fftMeanLineData[u][antId] = [];

    let fftMeanLineDataMap = new Map();
    for (let i = 0; i < fftBuffers[u][antId].length; i += 2) {
        if(fftBuffers[u][antId][i + 1] === Infinity || fftBuffers[u][antId][i + 1] === -Infinity) continue;

        if (fftMeanLineDataMap.has(fftBuffers[u][antId][i])) {
            fftMeanLineDataMap.get(fftBuffers[u][antId][i]).push(fftBuffers[u][antId][i + 1]);
        } else {
            fftMeanLineDataMap.set(fftBuffers[u][antId][i], [fftBuffers[u][antId][i + 1]]);
        }
    }

    for(let i = 0; ; i++){
        if(!fftMeanLineDataMap.has(i)) break;
        let values = fftMeanLineDataMap.get(i);
        fftMeanLineData[u][antId].push(i);
        fftMeanLineData[u][antId].push(values.reduce((acc, val) => acc + val, 0) / values.length);
    }
}

function drawGuardbandMarkups(v, xStart, xSpan, yStart, ySpan){
    const halfOfGuardband = config.iqTab.guardband_size/2;

    const guardbandWidth = ((halfOfGuardband-1)/xSpan)*v.width;
    const distanceBetweenSamples = v.width/xSpan;

    const guardbandLeftStartX = (-xStart/xSpan)*v.width;
    const leftGuardbandMarkup = config.iqTab.fft_size - halfOfGuardband;
    const guardbandRightStartX = ((leftGuardbandMarkup-xStart) / xSpan)*v.width;
    let guardbandHeight = (yStart / ySpan)*v.height + 20;

    if(guardbandHeight > v.height - 20) guardbandHeight = v.height - 20;

    const prbWidth = (guardbandRightStartX-guardbandLeftStartX-guardbandWidth) / ((config.iqTab.nprb+1)/12);
    const rbWidth = prbWidth/12;

    let opacity = 0;
    if (distanceBetweenSamples > 0.6) opacity = 0.3;
    if(distanceBetweenSamples > 2) opacity = 0.6;
    if(distanceBetweenSamples > 5) opacity = 1;


    for(let i = 0; i < config.iqTab.nprb/12; i++){
        ctx2d.beginPath();
        ctx2d.fillStyle = i%2 ? `rgba(44, 44, 44, ${opacity})` : `rgba(29, 29, 36, ${opacity})`;
        ctx2d.rect(guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + i*prbWidth, guardbandHeight-20, prbWidth, 40);
        ctx2d.fill();
    }

    ctx2d.beginPath();
    ctx2d.strokeStyle = "#FFFFFF";
    ctx2d.fillStyle = "#FFFFFF";
    ctx2d.lineWidth = 1;

    ctx2d.textAlign = "center";
    ctx2d.textBaseline = "top";

    //left guardband markup
    ctx2d.moveTo(guardbandLeftStartX, guardbandHeight);
    ctx2d.lineTo(guardbandLeftStartX + guardbandWidth + distanceBetweenSamples / 2, guardbandHeight);

    //right guardband markup
    ctx2d.moveTo(guardbandRightStartX - distanceBetweenSamples / 2, guardbandHeight);
    ctx2d.lineTo(guardbandRightStartX + guardbandWidth, guardbandHeight);

    ctx2d.moveTo(guardbandLeftStartX, guardbandHeight + 40);
    ctx2d.lineTo(guardbandRightStartX + guardbandWidth, guardbandHeight + 40);
    ctx2d.fillText(`Total ${config.iqTab.fft_size} subcarriers (${config.load.sampling}MHz)`, guardbandLeftStartX + (guardbandRightStartX + guardbandWidth - guardbandLeftStartX) / 2, guardbandHeight + 50)

    if (distanceBetweenSamples > 0.6){
        ctx2d.fillText("Guardband size: " + halfOfGuardband, guardbandLeftStartX + guardbandWidth / 2, guardbandHeight - 15);
        ctx2d.fillText("Guardband size: " + halfOfGuardband, guardbandRightStartX + guardbandWidth / 2, guardbandHeight - 15);
    }

    for(let i = 0; i < config.iqTab.nprb/12; i++){
        if(distanceBetweenSamples > 5)
            ctx2d.fillText("PRB: " + i, guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2+(i+0.5)*prbWidth, guardbandHeight+5);
        else if(distanceBetweenSamples > 2)
            ctx2d.fillText(String(i), guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2+(i+0.5)*prbWidth, guardbandHeight+5);

        if(distanceBetweenSamples > 30){
            for(let j = 0; j < 12; j++){
                ctx2d.moveTo(guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + i*prbWidth + j*rbWidth, guardbandHeight-20);
                ctx2d.lineTo(guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + i*prbWidth + j*rbWidth, guardbandHeight+5);
                if(distanceBetweenSamples > 60)
                    ctx2d.fillText("RE: "+(12*i+j), guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + i*prbWidth + (j+0.5)*rbWidth, guardbandHeight-14);
                else
                    ctx2d.fillText(String(12*i+j), guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + i*prbWidth + (j+0.5)*rbWidth, guardbandHeight-14);
            }
        }
        ctx2d.moveTo(guardbandLeftStartX+guardbandWidth+distanceBetweenSamples/2 + (i+1)*prbWidth, guardbandHeight);
    }

    ctx2d.stroke();
}

function setFirstZoomAndTrans(){
    for(let i = 0; i < 4; i++){
        canvas_viewports[i].transX[3] = -1000000;
        canvas_viewports[i].transY[3] = 2000;
        canvas_viewports[i].scaleX[3] = 0.001;
        canvas_viewports[i].scaleY[3] = 0.3;
    }

}

function fillFFTfreqDomain(){

    config.iqTab.guardband_size = 0;
    config.iqTab.nprb = 273 * 12;
    config.iqTab.fft_size = 273 * 12;

    fillFFT_buffers();
}


function fillFFT_buffers(){
    for(let u in iqBuffers){
        if(!iqBuffers[u]) continue;
        if(!fftBuffers[u]) fftBuffers[u] = {};

        for(let antId in iqNumPrb[u]){
            fftBuffers[u][antId] = new Float32Array(iqBuffers[u][antId].length*2);
            let j = 0;
            for(let sf in iqNumPrb[u][antId]){
                sf = parseInt(sf);
                if(sf !== undefined){
                    for(let sym in iqNumPrb[u][antId][sf]){
                        sym = parseInt(sym);

                        for(let rb = 0; rb < iqNumPrb[u][antId][sf][sym]*12; rb++){
                            const offset = iqOffsets[u][antId][sf][sym];
                            let real = iqBuffers[u][antId][offset+rb*2];
                            let imag = iqBuffers[u][antId][offset+rb*2 + 1];

                            if(real**2 + imag**2 === Infinity) continue;
                            let b = Math.sqrt(real**2 + imag**2);

                            fftBuffers[u][antId][j++] = rb;
                            fftBuffers[u][antId][j++] = b;
                        }
                    }
                }

            }
            bindFFT_buffers(u, antId);
            calculate_fftMeanLineData(u, antId);
        }
    }
}

function fft_view_changeLogScale(){
    for(let u in fftBuffers){
        for(let antId in fftBuffers[u]){
            for(let i = 1; i < fftBuffers[u][antId].length; i+=2){
                fftBuffers[u][antId][i] = Math.log(fftBuffers[u][antId][i]);
            }
            bindFFT_buffers(u, antId);
            calculate_fftMeanLineData(u, antId);
        }
    }
    fft_currentBufferInLOG = true;
    canvas_isFullRender = true;
}

function fft_view_changeNormalScale(){
    for(let u in fftBuffers){
        for(let antId in fftBuffers[u]){
            for(let i = 1; i < fftBuffers[u][antId].length; i+=2){
                fftBuffers[u][antId][i] = Math.E**fftBuffers[u][antId][i];
            }
            bindFFT_buffers(u, antId);
            calculate_fftMeanLineData(u, antId);
        }
    }
    fft_currentBufferInLOG = false;
    canvas_isFullRender = true;
}

function bindFFT_buffers(u, antId){
    if(!gl_fftBuffers[u]) gl_fftBuffers[u] = {};
    gl_fftBuffers[u][antId] = gl.createBuffer();
    if(!gl_fftTypeBuffers[u]) gl_fftTypeBuffers[u] = {};
    gl_fftTypeBuffers[u][antId] = gl.createBuffer();
    if(!gl_fftBuffersLength[u]) gl_fftBuffersLength[u]={};
    gl_fftBuffersLength[u][antId] = fftBuffers[u][antId].length;

    gl.bindBuffer( gl.ARRAY_BUFFER, gl_fftBuffers[u][antId] );
    gl.bufferData( gl.ARRAY_BUFFER, fftBuffers[u][antId], gl.STATIC_DRAW );
}