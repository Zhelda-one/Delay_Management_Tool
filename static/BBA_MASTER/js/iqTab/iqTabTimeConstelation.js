function canvas_renderTimeConstellation(v, vf, vst) {
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

    let xStart = (-1-transX)/(scaleX/v.aspectRatio), xEnd = (1-transX)/(scaleX/v.aspectRatio);
    let xSpan = xEnd - xStart;

    let yStart = (-1-transY)/scaleY, yEnd = (1-transY)/scaleY;
    let ySpan = yEnd - yStart;


    iqTab_drawVerticalScale(v, xStart, xSpan, yEnd, ySpan);
    iqTab_drawHorizontalScale(v, xStart, xSpan, yStart, ySpan);

    iqTab_loadFilterMaskForIqBuffer(v, vf);

    const mode = v.submode === 0 ? 8 : 9;

    const shader = gl_constProg[mode];
    shader.bind();
    shader.uniform1f("uPointSize", config.iqTab.constPointSize);
    shader.uniform2f("uScale", scaleX / v.aspectRatio, scaleY);
    shader.uniform2f("uTrans", transX, transY);
    gl.bindTexture(gl.TEXTURE_2D, v.iqTypesTexture);

    for (let u = 0; u < NUM_OF_U; ++u) {
        if (gl_time_I_Buffers && gl_time_I_Buffers[u] && vf.selectedU[u]) {
            for (const antId in gl_time_I_Buffers[u]) {
                if (!vf.selectedAnt[u] || !vf.selectedAnt[u][antId]) continue;
                shader.uniform1f('len', gl_timeBuffersLength[u][antId]);

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
