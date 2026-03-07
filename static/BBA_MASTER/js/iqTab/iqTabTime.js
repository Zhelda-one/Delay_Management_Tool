function canvas_renderTime_view(v, vf, vst) {
    const leftPad = 65,
        rightPad = 10,
        topPad = 10,
        bottomPad = 20;
    const rectWidth = Math.max(v.width - leftPad - rightPad, 10),
        rectHeight = Math.max(v.height - topPad - bottomPad, 10);
    const rectBorderThickness = 2.0;
    if (v.isResized || v.isModeChanged) {
        v.mouseShiftX = leftPad + rectBorderThickness;
        v.mouseShiftY = topPad + rectBorderThickness;
        v.usedWidth = v.width - v.mouseShiftX - rightPad - rectBorderThickness;
        v.usedHeight = v.height - v.mouseShiftY - bottomPad - rectBorderThickness;
    }
    ctx2d.strokeStyle = "#FFFFFF";

    const scaleX = (vst.scaleX[v.mode] * v.usedWidth) / v.width;
    const scaleY = (vst.scaleY[v.mode] * v.usedHeight) / v.height;
    const transX = ((vst.transX[v.mode] * vst.scaleX[v.mode] + leftPad / 2.0) * 2.0) / v.width;
    const transY = ((vst.transY[v.mode] * vst.scaleY[v.mode] - topPad / 2.0) * 2.0) / -v.height;

    let xStart = (-1-transX)/(scaleX/v.aspectRatio)*1000000, xEnd = (1-transX)/(scaleX/v.aspectRatio)*1000000;
    let xSpan = xEnd - xStart;

    let yStart = (-1-transY)/scaleY, yEnd = (1-transY)/scaleY;
    let ySpan = yEnd - yStart;


    drawCyclicPrefix(v, xStart, xSpan, yStart, ySpan);
    iqTab_drawVerticalScale(v, xStart, xSpan, yEnd, ySpan);

    iqTab_loadFilterMaskForIqBuffer(v, vf);

    let mode = v.mode;
    if(v.submode === 1) mode = 5;
    if(v.submode === 2) mode = 6;
    if(v.submode === 3) mode = 7;

    const shader = gl_constProg[mode];
    shader.bind();
    shader.uniform1f("uPointSize", config.iqTab.constPointSize);
    shader.uniform2f("uScale", scaleX / v.aspectRatio, scaleY);
    shader.uniform2f("uTrans", transX, transY);

    shader.uniform1f("sampleShift", config.load.shift_samples);

    gl.bindTexture(gl.TEXTURE_2D, v.iqTypesTexture);

    for (let u = 0; u < NUM_OF_U; ++u) {
        if (gl_time_I_Buffers && gl_time_I_Buffers[u] && vf.selectedU[u]) {
            for (const antId in gl_time_I_Buffers[u]) {
                shader.uniform1f("len", gl_timeBuffersLength[u][antId]);

                gl.bindBuffer(gl.ARRAY_BUFFER, gl_time_I_Buffers[u][antId]);
                gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, gl_time_Q_Buffers[u][antId]);
                gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 0, 0);
                gl.drawArrays(gl.POINTS, 0, gl_timeBuffersLength[u][antId]);

            }
        }
    }
    shader.unbind();
}

function drawCyclicPrefix(v, xStart, xSpan, yStart, ySpan){
    //config.load.shift_samples
    const distanceBetweenSamples = v.width/xSpan;

    const u = config.load.defaultU;
    const normalCyclicPrefixLen = (config.load.sampling / 30.72) * 144*(2**(-u));
    const longerCyclicPrefixLen = (config.load.sampling / 30.72) * (144*(2**(-u)) + 16);
    const slotLen = (config.load.sampling / 30.72) * (2048*(2**(-u)));
    const subframeLen = config.load.sampling * 1000;


    let scaleHeight = ((yStart+ySpan) / ySpan)*v.height + 20;
    if(scaleHeight > v.height - 40) scaleHeight = v.height - 40;

    let opacity = 1;

    const amplitudesChart = document.createElement('bba-graph2d');
    amplitudesChart.caption = "Amplitudes";

    const absChart = document.createElement('bba-graph2d');
    absChart.caption = "Error";

    const amplitudesSortedChart = document.createElement('bba-graph2d');
    amplitudesSortedChart.caption = "Sorted amplitudes";

    ctx2d.textAlign = 'center';
    if(Object.keys(time_i)[0]){

        let cyclicIter = parseInt((xStart >= 0 ? xStart:0)/subframeLen)*subframeLen;
        let i = 0;
        let currentSubframe = parseInt(xStart < 0 ? 0:xStart/subframeLen);

        while(cyclicIter < xStart+xSpan){

            const isLonger = i%((2**u)*14) === 0 || i%((2**u)*14) === (2**u)*7;
            const cyclicPrefixLen = isLonger ? longerCyclicPrefixLen : normalCyclicPrefixLen;

            const startText = 25, lineDistance = 15;
            let info;

            if(distanceBetweenSamples*normalCyclicPrefixLen >= 50 && cyclicIter + config.load.shift_samples >= 0){
                //Cyclic prefix text
                ctx2d.beginPath();
                ctx2d.fillStyle = "rgb(255, 255, 255)";
                info = calculateCyclicPrefixCorrelation(Object.keys(time_i)[0], cyclicIter + config.load.shift_samples, cyclicPrefixLen);


                ctx2d.fillText("Cyclic prefix ", ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText);
                ctx2d.fillText("Length "+cyclicPrefixLen, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + lineDistance);
                ctx2d.fillText("Start "+(cyclicIter+config.load.shift_samples), ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 2*lineDistance);
                ctx2d.fillText("Correlation " +info.corr, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 3*lineDistance);
                ctx2d.fillText('CP RMS: ' + info.cp_rms, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 4*lineDistance);
                ctx2d.fillText('Symbol RMS: ' + info.symbol_rms, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 5*lineDistance);
                ctx2d.fillText('Peak: ' + info.maxAmplitude, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 6*lineDistance);
                ctx2d.fillText('Peak pos: ' + (info.maxAmplitudePos+config.load.shift_samples), ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 7*lineDistance);

            }

            if(distanceBetweenSamples*normalCyclicPrefixLen >= 2){
                //cyclic prefix
                ctx2d.beginPath();
                ctx2d.fillStyle = "rgba(0, 255, 0, 0.2)";
                ctx2d.rect(((cyclicIter-xStart) / xSpan)*v.width, 0, distanceBetweenSamples*cyclicPrefixLen, v.height);
                ctx2d.fill();

                ctx2d.beginPath();
                ctx2d.fillStyle = i%2 ? `rgba(44, 44, 44, ${opacity})` : `rgba(29, 29, 36, ${opacity})`;
                ctx2d.rect(((cyclicIter-xStart) / xSpan)*v.width, scaleHeight-20, (cyclicPrefixLen+slotLen)*distanceBetweenSamples, 30);
                ctx2d.fill();
            }

            if(i % (14 * 2**u) === 0){
                //Frame, subframe, slot text
                ctx2d.beginPath();
                ctx2d.fillStyle = currentSubframe % 2 === 0 ? `rgba(44, 44, 44, ${opacity})` : `rgba(29, 29, 36, ${opacity})`;
                ctx2d.rect(((cyclicIter-xStart) / xSpan)*v.width, scaleHeight-20, subframeLen*distanceBetweenSamples, 60);
                ctx2d.fill();

                if(distanceBetweenSamples*normalCyclicPrefixLen > 0.35){
                    ctx2d.beginPath();
                    ctx2d.fillStyle = "rgb(255, 255, 255)";
                    ctx2d.fillText("F: " +parseInt(currentSubframe/10)+ ", SF: " + (currentSubframe%10), ((cyclicIter-xStart) / xSpan)*v.width + distanceBetweenSamples*subframeLen/2, scaleHeight+30);
                    ctx2d.fill();
                }
                currentSubframe++;
            }

            if(distanceBetweenSamples*normalCyclicPrefixLen >= 3) {
                ctx2d.beginPath();
                ctx2d.fillStyle = "rgb(255, 255, 255)";
                ctx2d.fillText("Sym " + (i % (14 * (2 ** u))), ((cyclicIter - xStart + slotLen / 2) / xSpan) * v.width, scaleHeight);
                ctx2d.fill();
            }

            if(distanceBetweenSamples*normalCyclicPrefixLen >= 50 && cyclicIter + config.load.shift_samples >= 0){
                ctx2d.fillText('Amplitudes (black: CP, blue: sym)', ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 9*lineDistance);

                amplitudesChart.graph2d.draw([],[info.end_amplitudes, info.cp_amplitudes]);
                absChart.graph2d.draw([],[info.abs_error]);
                amplitudesSortedChart.graph2d.draw([],[info.amplitudes_sorted]);

                ctx2d.drawImage( amplitudesChart.webWrapper.canvas, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width - amplitudesChart.webWrapper.canvas.width/2, startText + 9.5*lineDistance);

                const chartHeight = amplitudesChart.webWrapper.canvas.height;
                ctx2d.fillText('Absolute error', ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 11.5*lineDistance + chartHeight);


                ctx2d.drawImage( absChart.webWrapper.canvas, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width - amplitudesChart.webWrapper.canvas.width/2, startText + 12*lineDistance + chartHeight);


                ctx2d.fillText('Sorted amplitudes', ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width, startText + 13.5*lineDistance + 2*chartHeight);
                ctx2d.drawImage( amplitudesSortedChart.webWrapper.canvas, ((cyclicIter-xStart+cyclicPrefixLen/2) / xSpan)*v.width - amplitudesChart.webWrapper.canvas.width/2, startText + 14   *lineDistance + 2*chartHeight);


                ctx2d.fill();

            }

            cyclicIter += cyclicPrefixLen + slotLen;
            i++;
        }
    }
}