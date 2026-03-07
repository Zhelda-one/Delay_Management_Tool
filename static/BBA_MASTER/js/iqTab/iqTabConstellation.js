function iqTab_adjustTextFixed(gridValStep, textFixed) {
	let adjustedTextFixed = textFixed;
	gridValStep *= 10 ** textFixed;
	while (Math.floor(gridValStep) == 0) {
		adjustedTextFixed++;
		gridValStep *= 10;
	}
	return adjustedTextFixed;
}

function iqTab_matchGridValStepLength(gridValStep, textFixed) {
	gridValStep *= 10 ** textFixed;
	gridValStep = Math.floor(gridValStep);
	if (gridValStep % 10 < 5 && (gridValStep - (gridValStep % 10)) / 10 ** textFixed > 0) {
		gridValStep -= gridValStep % 10;
	} else if (gridValStep % 10 > 5) {
		gridValStep += 10 - (gridValStep % 10);
	}
	gridValStep /= 10 ** textFixed;

	return gridValStep;
}

let heatMap_toneMappingShader = null;
let heatMap_framebuffer = null;
let heatMap_fbTexture = null;
let heatMap_fblastWidth = 0;
let heatMap_fblastHeight = 0;
let heatMap_pointValue = 0.01;

let iqTab_previousIqBufferMaskDetails = {
	u: null,
	antennas: null,
	packetsTab_filterValue: "",
	vIdx: null,
};

function iqTab_shouldMaskBeReRendered(vf) {
	const last_selectedU = iqTab_previousIqBufferMaskDetails.u;
	const last_antennas = iqTab_previousIqBufferMaskDetails.antennas;
	const last_packetsFilter = iqTab_previousIqBufferMaskDetails.packetsTab_filterValue;
	const last_vIdx = iqTab_previousIqBufferMaskDetails.vIdx;

	if (last_selectedU === null || last_antennas === null || last_vIdx === null) return true;
	if (vf.isFiltersUpdated) return true;
	if (vf.idx !== last_vIdx) return true;
	if (
		(iqTabFiltersDialog_usePacketFilter.checked &&
			packetsTab_header_filterInput.value !== last_packetsFilter) ||
		(!iqTabFiltersDialog_usePacketFilter.checked && last_packetsFilter !== "")
	)
		return true;

	for (let u = 0; u < NUM_OF_U; u++) {
		if (last_selectedU[u] != vf.selectedU[u]) return true;

		for (let antId in vf.selectedAnt[u])
			if (last_antennas[u] === undefined || vf.selectedAnt[u][antId] != last_antennas[u][antId])
				return true;
	}
	return false;
}

function iqTab_saveCurrentMaskDetails(vf) {
	iqTab_previousIqBufferMaskDetails.u = Array.from(vf.selectedU);
	iqTab_previousIqBufferMaskDetails.antennas = vf.selectedAnt.map((obj) => {
		return obj === null ? null : { ...obj };
	});
	iqTab_previousIqBufferMaskDetails.vIdx = vf.idx;
	iqTab_previousIqBufferMaskDetails.packetsTab_filterValue =
		iqTabFiltersDialog_usePacketFilter.checked ? packetsTab_header_filterInput.value : "";
}

function iqTab_loadFilterMaskForIqBuffer(v, vf) {
	if (!iqTab_shouldMaskBeReRendered(vf)) return;
	iqTab_saveCurrentMaskDetails(vf);

	iqTab_drawnForVIdx = v.idx;
	iqTab_drawAll = 0;
	if (
		vf.ranges.frame[0] === -1 &&
		vf.ranges.subframe[0] === -1 &&
		vf.ranges.slot[0] === -1 &&
		vf.ranges.symbol[0] === -1 &&
		vf.ranges.RB[0] === -1 &&
		!iqTabFiltersDialog_usePacketFilter.checked
	)
		iqTab_drawAll = 1;

	let iqBuffersMask = new Array(NUM_OF_U);

	for (let u = 0; u < NUM_OF_U; u++) {
		//Clears unused gl_buffers and allocates space for used ones
		if (!vf.selectedU[u] || !iqBuffers[u]) {
			if (gl_iqBuffersMask[u])
				for (let antId in iqBuffers[u]) gl.deleteBuffer(gl_iqBuffersMask[u][antId]);
			gl_iqBuffersMask[u] = null;
			continue;
		}
		iqBuffersMask[u] = {};
		if (gl_iqBuffersMask[u] === null) gl_iqBuffersMask[u] = {};

		for (let antId in iqBuffers[u]) {
			if (!vf.selectedAnt[u][antId] || !iqBuffers[u][antId]) {
				gl.deleteBuffer(gl_iqBuffersMask[u][antId]);
				delete gl_iqBuffersMask[u][antId];
				continue;
			}

			if (iqTab_drawAll !== 1)
				iqBuffersMask[u][antId] = new Float32Array(
					Math.floor(iqBuffers[u][antId].length / 2)
				).fill(0.0);
		}
	}

	if (iqTab_drawAll === 1){
		gl.vertexAttrib1f(2, 1.0);
		gl.disableVertexAttribArray(2);
		return;
	}
	gl.enableVertexAttribArray(2);

	for (let u = 0; u < NUM_OF_U; u++) {
		if (!vf.selectedU[u] || !iqBuffers[u]) continue;

		const specialFilteringON = vf.ranges.subframe[1] >= 10 || vf.ranges.symbol[1] >= NUM_OF_SYM_IN_SLOT_PER_U[u]; //Filtering for select mode

		for (let antId in iqOffsets[u]) {
			if (!vf.selectedAnt[u][antId] || !iqBuffers[u][antId]) continue;

			for (let entry in iqOffsets[u][antId]) {
				const frame_nr = Math.floor(entry / 10);
				if (isNaN(frame_nr)) break;

				const subframe_nr = Math.floor(entry % 10);
				if (
					vf.ranges.frame[0] !== -1 &&
					(frame_nr < vf.ranges.frame[0] || vf.ranges.frame[1] < frame_nr)
				)
					continue;

				if(vf.ranges.subframe[0] !== -1){
					const finalSF_nr = 10 * frame_nr + subframe_nr;
					if(!specialFilteringON && (subframe_nr < vf.ranges.subframe[0] || vf.ranges.subframe[1] < subframe_nr)) continue;
					else if(specialFilteringON && (finalSF_nr < vf.ranges.subframe[0] || vf.ranges.subframe[1] < finalSF_nr) ) continue;
				}

				let min_sym_nr = 0,
					max_sym_nr = NUM_OF_SYM_IN_SF_PER_U[u];

				if (vf.ranges.slot[0] !== -1) {
					min_sym_nr = Math.max(min_sym_nr, NUM_OF_SYM_IN_SLOT_PER_U[u] * vf.ranges.slot[0]);
					max_sym_nr = Math.min(
						max_sym_nr,
						NUM_OF_SYM_IN_SLOT_PER_U[u] * (vf.ranges.slot[1] + 1)
					);
				}

				const subframe_nr_absolute = frame_nr * 10 + subframe_nr;

				for (let sym_nr = min_sym_nr; sym_nr < max_sym_nr; sym_nr++) {
					if( vf.ranges.symbol[0] !== -1 ){
						if(!specialFilteringON && (sym_nr % NUM_OF_SYM_IN_SLOT_PER_U[u] < vf.ranges.symbol[0] || vf.ranges.symbol[1] < sym_nr % NUM_OF_SYM_IN_SLOT_PER_U[u])){
							continue;
						}
						else if(specialFilteringON &&
							((sym_nr < vf.ranges.symbol[0] && subframe_nr === vf.ranges.subframe[0]) ||
							(vf.ranges.symbol[1] < sym_nr && subframe_nr === vf.ranges.subframe[1]))){
							continue;
						}
					}

					let min_index_for_col = iqOffsets[u][antId][entry][sym_nr];
					const nr_of_re_in_col = iqNumPrb[u][antId][entry][sym_nr] * NUM_OF_RE_IN_RB * 2;
					let max_index_for_col = min_index_for_col + nr_of_re_in_col;

					let min_index_in_range =
						vf.ranges.RB[0] !== -1
							? min_index_for_col + vf.ranges.RB[0] * NUM_OF_RE_IN_RB * 2
							: min_index_for_col;
					let max_index_in_range =
						vf.ranges.RB[1] !== -1
							? min_index_for_col + (vf.ranges.RB[1] + 1) * NUM_OF_RE_IN_RB * 2
							: max_index_for_col;

					const packets_in_place =
						packet_places[u][antId][subframe_nr_absolute + ":" + sym_nr];

					if (iqTabFiltersDialog_usePacketFilter.checked) {
						if (packets_in_place === undefined) continue;

						for (let j = 0; j < packets_in_place.length; j++) {
							if (!filteredPacketsIds_set.has(packets_in_place[j])) continue;
							const packet_id = packets_in_place[j];
							let min_index_for_packet =
								min_index_for_col +
								packets[packet_id].ecpri.sections[0].startPrb * NUM_OF_RE_IN_RB * 2;
							let max_index_for_packet =
								min_index_for_packet +
								packets[packet_id].ecpri.sections[0].numPrb * NUM_OF_RE_IN_RB * 2;

							let min_index_combined = Math.max(min_index_for_packet, min_index_in_range);
							let max_index_combined = Math.min(max_index_for_packet, max_index_in_range);

							for (let i = min_index_combined; i < max_index_combined; i++)
								iqBuffersMask[u][antId][i / 2] = 1.0;
						}
					} else
						for (let i = min_index_in_range; i < max_index_in_range; i++)
							iqBuffersMask[u][antId][i / 2] = 1.0;
				}
			}
			let buf = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.bufferData(gl.ARRAY_BUFFER, iqBuffersMask[u][antId], gl.STATIC_DRAW);
			gl_iqBuffersMask[u][antId] = buf;
		}
	}
}

function canvas_renderConstellation(v, vf, vst) {
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

	const shader = gl_constProg[v.submode];
	shader.bind();
	shader.uniform1f("uPointSize", config.iqTab.constPointSize);
	shader.uniform2f("uScale", scaleX / v.aspectRatio, scaleY);
	shader.uniform2f("uTrans", transX, transY);

	gl.bindTexture(gl.TEXTURE_2D, v.iqTypesTexture);

	// Heat-map preparation
	if (v.submode === CONST_IQ_SUBMODE.HEAT) {
		if (heatMap_framebuffer === null) {
			const ext = gl.getExtension("EXT_color_buffer_float");
			if (!ext) {
				throw new Error(
					"Rendering to floating point textures is not supported on this platform"
				);
			}
			const temp = gl_createFramebufferFloat();

			heatMap_framebuffer = temp.buffer;
			heatMap_fbTexture = temp.texture;
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, heatMap_framebuffer);
		gl.bindTexture(gl.TEXTURE_2D, heatMap_fbTexture);
		if (
			heatMap_fblastWidth !== canvasWebGL.width ||
			heatMap_fblastHeight !== canvasWebGL.height
		) {
			heatMap_fblastWidth = canvasWebGL.width;
			heatMap_fblastHeight = canvasWebGL.height;
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.R32F,
				heatMap_fblastWidth,
				heatMap_fblastHeight,
				0,
				gl.RED,
				gl.FLOAT,
				null
			);
		}
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.blendFunc(gl.ONE, gl.ONE);

		shader.uniform1f("uPointValue", heatMap_pointValue);
	}

	let gl_Buffers, gl_TypeBuffers, gl_BuffersLength;
	if (vf.mode === RENDER_MODE.CONST_IQ) {
		gl_Buffers = gl_iqBuffers;
		gl_TypeBuffers = gl_iqTypeBuffers;
		gl_BuffersLength = gl_iqBuffersLength;
	} else if (vf.mode === RENDER_MODE.CONST_FFT) {
		gl_Buffers = gl_fftBuffers;
		gl_TypeBuffers = gl_fftTypeBuffers;
		gl_BuffersLength = gl_fftBuffersLength;
	}

	for (let u = 0; u < NUM_OF_U; ++u) {
		if (gl_Buffers && gl_Buffers[u] && vf.selectedU[u]) {
			for (const antId in gl_Buffers[u]) {
				if (!vf.selectedAnt[u] || !vf.selectedAnt[u][antId]) continue;
				gl.bindBuffer(gl.ARRAY_BUFFER, gl_Buffers[u][antId]);
				gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, gl_TypeBuffers[u][antId]);
				gl.vertexAttribIPointer(1, 1, gl.UNSIGNED_BYTE, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, gl_iqBuffersMask[u][antId]);
				gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0);
				gl.drawArrays(gl.POINTS, 0, gl_BuffersLength[u][antId] / 2);
			}
		}
	}

	// Heat-map post-processing
	if (v.submode === CONST_IQ_SUBMODE.HEAT) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		gl.viewport(0, 0, canvasWebGL.width, canvasWebGL.height);

		if (heatMap_toneMappingShader === null) {
			heatMap_toneMappingShader = new Shader("constHeatPost", constHeatPost_vs, constHeatPost_fs);
		}
		heatMap_toneMappingShader.bind();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, heatMap_fbTexture);
		heatMap_toneMappingShader.uniform1i("uTexture", 0);

		gl_drawFullScreenQuad();
	}

	shader.unbind();
}

