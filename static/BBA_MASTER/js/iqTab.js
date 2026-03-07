const iqTab = getElementById( 'iqTab' );
const iqTab_header = getElementById( 'iqTab_header' );

const iqTab_header_antDD_body = getElementById( 'iqTab_header_antDD_body' );
const iqTab_drawFcp = getElementById('iqTab_drawFcp')
const iqTab_toggleSelectMode = getElementById('iqTab_toggleSelectMode');
const iqTab_unifiedFilters = getElementById( 'iqTab_unifiedFilters' );
const iqTab_unifiedView = getElementById( 'iqTab_unifiedView' );
const iqTab_viewportsSplit = document.getElementsByName( 'iqTab_viewportsSplit' );

let canvas_selectedViewportId = 0;

const SPLIT_MODES = {
    SINGLE: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    QUAD: 3
}

const minZoom = 0.0005;

function iqTab_onLoad() {
    canvas_numOfActiveViewports = [1, 2, 2, 4][config.iqTab.viewportsSplit];
    for( let i = 0; i < canvas_maxNumOfViewports; ++i ) {
        const modeText = config.iqTab.viewportsModes[i].split( '_' );
        canvas_viewports[i].mode = parseInt( modeText[0] );
        canvas_viewports[i].submode = parseInt( modeText[1] );
    }

    const mode = parseInt( config.iqTab.viewportsModes[0].split( '_' )[0] );
    const submode = parseInt( config.iqTab.viewportsModes[0].split( '_' )[1] );

    try{
        getElementById('iqTab_mode_' + mode).checked = true;
        document.getElementsByClassName('arrow')[mode].hidden = false;
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.backgroundColor = '#30629c';
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.color = '#ffffff';
    }
    catch (e) {
        console.log(e)
    }

    if(mode != RENDER_MODE.REGRID) iqTab_selectModeButton_hide();
    else iqTab_selectModeButton_enable();

    for( const e of iqTab_viewportsSplit ) {
        e.onchange = function() { iqTab_selectViewportsSplit( parseInt( e.value ) ); }
    }

    set_param_radio_int( iqTab_viewportsSplit, config.iqTab.viewportsSplit );
    setAriaPressed(iqTab_unifiedFilters, config.iqTab.singleFilter);
    setAriaPressed(iqTab_unifiedView, config.iqTab.unitedScaleAndMove);

    iqTabFiltersDialog_hidePacketsWithNoAmplitude.checked = config.iqTab.hidePacketsWithNoAmplitude;
    set_param_radio_int( iqTabDisplaySettingsDialog_constPointSize, config.iqTab.constPointSize );

    iqTabFiltersDialog.setToUI();

    canvas2D.addEventListener( 'wheel', canvas_onWheel, { 'passive': true } );
    canvas2D.addEventListener( 'mousedown', canvas_onMouseDown );
    canvas2D.addEventListener( 'mousemove', canvas_onMouseMove );
    window.addEventListener( 'mouseup', canvas_onMouseUp );
    window.addEventListener( 'keydown', canvas_onKeyDown );
    window.addEventListener( 'keyup', canvas_onKeyUp );

    canvas2D.addEventListener('dblclick', canvas_onDblclick);

    gl_init();

    iqTab_updateGlIqTypeTexture();
}

function iqTab_updateGlIqTypeTexture() {

    if(gl === null){
        alert("Error! Webgl is disabled. Please check your browser settings and try again.");
    }

    let texBuf = new Uint8Array( 256 * 4 );
    for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
        const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : vIdx];
        for(let j = 0; j < channels.length; ++j ) {
            const color = channels[j].color;
            texBuf[4 * j + 0] = color[j];
            texBuf[4 * j + 1] = color[j] >> 8;
            texBuf[4 * j + 2] = color[j] >> 16;
            texBuf[4 * j + 3] = vf.visibleChannels[j] ? 0xFF : 0;
        }
        gl.bindTexture( gl.TEXTURE_2D, canvas_viewports[vIdx].iqTypesTexture );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, texBuf );
    }
}

function iqTab_onResize() {
    setTimeout(()=>{
        canvas_width = iqTab.clientWidth;
        canvas_height = iqTab.clientHeight - iqTab_header.clientHeight;
        canvasWebGL.width = canvas2D.width = canvas_width;
        canvasWebGL.height = canvas2D.height = canvas_height;
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
        if(isFirefox)
            canvas2D.style.top = `${ canvasWebGL.offsetTop+parseInt(getComputedStyle(iqTab_header).padding) }px`; //for some reason firefox needs this
        else
            canvas2D.style.top = `${ canvasWebGL.offsetTop }px`;
        canvas2D.style.left = `${ canvasWebGL.offsetLeft }px`;

        if( ctx2d ) {
            ctx2d.font = '13px Verdana';
            ctx2d.fillStyle = '#FFFFFF';
            ctx2d_imageDataWidth = canvas2D.width + 750;
            if( ctx2d_imageDataPixels.length < ( ctx2d_imageDataWidth * canvas2D.height ) ) ctx2d_imageDataPixels = new Uint32Array( ctx2d_imageDataWidth * canvas2D.height );
            ctx2d_imageData = new ImageData( new Uint8ClampedArray( ctx2d_imageDataPixels.buffer, 0, 4 * ctx2d_imageDataWidth * canvas2D.height ), ctx2d_imageDataWidth, canvas2D.height );
        }

        canvas_setViewportsSplit( config.iqTab.viewportsSplit );
        if( !canvas_renderTimeoutId ) canvas_renderTimeoutId = setTimeout( canvas_renderTick, 1 );
    }, 250);

}

function canvas_setViewportsSplit( splitIdx ) {
    config.iqTab.viewportsSplit = splitIdx;
    canvas_numOfActiveViewports = [1, 2, 2, 4][splitIdx];

    const halfWidth = Math.floor( canvas_width / 2 );
    const halfHeight = Math.floor( canvas_height / 2 );
    switch( splitIdx ) {
        case SPLIT_MODES.SINGLE:
            canvas_viewports[0].x = canvas_viewports[0].y = 0;
            canvas_viewports[0].width = canvas_width;
            canvas_viewports[0].height = canvas_height;
            break;
        case SPLIT_MODES.HORIZONTAL:
            canvas_viewports[0].x = canvas_viewports[1].x = canvas_viewports[0].y = 0;
            canvas_viewports[1].y = halfHeight + 1;
            canvas_viewports[0].width = canvas_viewports[1].width = canvas_width;
            canvas_viewports[0].height = halfHeight - 1;
            canvas_viewports[1].height = canvas_height - halfHeight - 1;
            break;
        case SPLIT_MODES.VERTICAL:
            canvas_viewports[0].x = canvas_viewports[0].y = canvas_viewports[1].y = 0;
            canvas_viewports[1].x = halfWidth + 1;
            canvas_viewports[0].width = halfWidth - 1;
            canvas_viewports[1].width = canvas_width - halfWidth - 1;
            canvas_viewports[0].height = canvas_viewports[1].height = canvas_height;
            break;
        case SPLIT_MODES.QUAD:
            canvas_viewports[0].x = canvas_viewports[2].x = canvas_viewports[0].y = canvas_viewports[1].y = 0;
            canvas_viewports[1].x = canvas_viewports[3].x = halfWidth + 1;
            canvas_viewports[2].y = canvas_viewports[3].y = halfHeight + 1;
            canvas_viewports[0].width = canvas_viewports[2].width = halfWidth - 1;
            canvas_viewports[1].width = canvas_viewports[3].width = canvas_width - halfWidth - 1;
            canvas_viewports[0].height = canvas_viewports[1].height = halfHeight - 1;
            canvas_viewports[2].height = canvas_viewports[3].height = canvas_height - halfHeight - 1;
break;
    }

    for( let i = 0; i < canvas_numOfActiveViewports; ++i ) {
        let v = canvas_viewports[i];
        v.y2d = canvas_height - v.y - v.height;
        v.pixelWidth = 2.0 / v.width;
        v.pixelHeight = 2.0 / v.height;
        v.aspectRatio = v.width / v.height;
        v.isResized = true;
        v.isModeChanged = true;
    }
    if( config.iqTab.unitedScaleAndMove ) canvas_updateUnitedScale = true;
    canvas_isFullRender = true;
    heatmapToolbar_toggle();
}

function shouldPacketBeRendered(active_packets, curPrb){

    if(!iqTabFiltersDialog_usePacketFilter.checked || filteredPacketsIds.length === packets.length)
        return true;

    for(const packetId of active_packets) {
        const ecpri = packets[packetId].ecpri;
        for(const section in ecpri.sections){
            if(ecpri.sections[section].startPrb <= curPrb && curPrb < ecpri.sections[section].startPrb+ecpri.sections[section].numPrb){
                return true;
            }
        }
    }
    return false;
}

async function canvas_renderTick() {
    if( gl_sync ) {
        const syncStatus = gl.clientWaitSync( gl_sync, 0, 0 );
        if( syncStatus === gl.TIMEOUT_EXPIRED ) {
            setTimeout( canvas_renderTick, 1 );
            return;
        }
        // console.debug( `GL Rendering took: ${ perfToMsFrom( canvas_renderPerfNow ) }` );
        gl.deleteSync( gl_sync );
        gl_sync = null;
    }

    canvas_renderPerfNow = performance.now();
    const isFullRender = canvas_isFullRender;
    canvas_isFullRender = false;
    let isRendered = false;
    let isGlUsed = false;

    if( isFullRender ) {
        ctx2d.clearRect( 0, 0, canvas_width, canvas_height );
        gl.clear( gl.COLOR_BUFFER_BIT );
        if( config.iqTab.viewportsSplit > 0 ) {
            ctx2d.beginPath();
            ctx2d.lineWidth = 2.0;
            ctx2d.strokeStyle = '#909090';
            if( config.iqTab.viewportsSplit === 2 || config.iqTab.viewportsSplit === 3 ) {
                const w = Math.floor( canvas_width / 2 );
                ctx2d.moveTo( w, 0 );
                ctx2d.lineTo( w, canvas_height );
            }
            if( config.iqTab.viewportsSplit === 1 || config.iqTab.viewportsSplit === 3 ) {
                const h = Math.floor( canvas_height / 2 );
                ctx2d.moveTo( 0, h );
                ctx2d.lineTo( canvas_width, h );
            }
            ctx2d.stroke();
        }
        isGlUsed = true;
    }

    const isGlMode = [ true, false, true, true, true ];
    for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
        const v = canvas_viewports[vIdx];
        if( isFullRender || v.isRender || v.isModeChanged) {
            v.isRender = false;

            ctx2d.save();
            ctx2d.setTransform( 1, 0, 0, 1, v.x, v.y );
            ctx2d.beginPath();
            ctx2d.rect( 0, 0, v.width, v.height );
            ctx2d.clip();

            const glUsedInView = isGlMode[v.mode] || v.isModeChanged;

            if( glUsedInView ) {
                gl.enable( gl.SCISSOR_TEST );

                gl.scissor( v.x, v.y2d, v.width, v.height );
                gl.viewport( v.x, v.y2d, v.width, v.height );
            }

            if( !isFullRender ) {
                if( glUsedInView ) {
                    gl.clear( gl.COLOR_BUFFER_BIT );
                    isGlUsed = true;
                }
                ctx2d.clearRect( 0, 0, v.width, v.height );
            }

            const vf = config.iqTab.singleFilter ? canvas_viewports[0] : canvas_viewports[vIdx];
            const vst = config.iqTab.unitedScaleAndMove ? canvas_viewports[0] : canvas_viewports[vIdx];

            switch( v.mode ) {
                case RENDER_MODE.CONST_IQ: canvas_renderConstellation( v, vf, vst ); break;
                case RENDER_MODE.REGRID: canvas_renderResourceGrid( v, vf, vst ); break;
                case RENDER_MODE.CONST_TIME_IQ: canvas_renderTimeConstellation( v, vf, vst ); break;
                case RENDER_MODE.CONST_FFT: canvas_renderFFT_view( v, vf, vst ); break;
                case RENDER_MODE.CONST_TIME: canvas_renderTime_view(v, vf, vst); break;
            }

            if( glUsedInView ) gl.disable( gl.SCISSOR_TEST );
            ctx2d.restore();

            // if number of activeViewports is larger than 1, draw a highlight rectangle around activeViewport
            if( canvas_numOfActiveViewports > 1 && vIdx === canvas_selectedViewportId ) {
                ctx2d.save();
                ctx2d.setTransform( 1, 0, 0, 1, v.x, v.y );
                ctx2d.beginPath();
                ctx2d.lineWidth = 2.0;
                ctx2d.strokeStyle = '#FF0000';
                ctx2d.rect( 0.5, 0.5, v.width - 1, v.height - 1 );
                ctx2d.stroke();
                ctx2d.restore();
            }

            v.isResized = false;
            v.isModeChanged = false;
            vf.isFiltersUpdated = false;
            vst.isScaleUpdated = false;

            isRendered = true;
            isGlUsed |= glUsedInView;
        }
    }

    if( isRendered ) {
        // console.debug( `2D Rendering took: ${ perfToMsFrom( canvas_renderPerfNow ) }` );
    }

    if( isGlUsed ) {
        gl_sync = gl.fenceSync( gl.SYNC_GPU_COMMANDS_COMPLETE, 0 );
        gl.flush();
    }

    setTimeout( canvas_renderTick, 1 );
}

function iqTab_loadIqBuffer() {
    let perfNow = performance.now();

    reGrid_invalidateCache();
    // TODO: viewport reset should be done on a level of "Viewport" class
    // The class should take responsibiity for resetting it's members
    // Outside users should not have to iterate two arrays by hand
    // and should not have to know the original variable type of member variables
    for( let u = 0; u < NUM_OF_U; ++u ) {
        for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
            const v = canvas_viewports[vIdx];
            v.selectedU = new Array( NUM_OF_U ).fill( false );
            v.selectedAnt = new Array( NUM_OF_U ).fill( null );
        }
    }

    let firstFoundNumerology = 0;
    let alreadySelected1Antenna = false;

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            if( !gl_iqBuffers[u] ) {
                gl_iqBuffers[u] = {};
                gl_iqTypeBuffers[u] = {};
                gl_iqBuffersLength[u] = {};
            }

            for( const antId in iqBuffers[u] ) {
                for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
                    const vf = canvas_viewports[vIdx];

                    if (!alreadySelected1Antenna) {
                        vf.selectedU[u] = true;
                        firstFoundNumerology = u;
                    }

                    if( !vf.selectedAnt[u] ) vf.selectedAnt[u] = {};
                    if(!alreadySelected1Antenna) vf.selectedAnt[u][antId] = true;
                    vf.isFiltersUpdated = true;
                }

                alreadySelected1Antenna = true;

                let buf;
                if( gl_iqBuffers[u][antId] ) {
                    if( gl_iqBuffersLength[u][antId] === iqBuffers[u][antId].length ) continue;
                    buf = gl_iqBuffers[u][antId];
                } else {
                    buf = gl.createBuffer();
                }
                gl.bindBuffer( gl.ARRAY_BUFFER, buf );
                gl.bufferData( gl.ARRAY_BUFFER, iqBuffers[u][antId], gl.STATIC_DRAW );
                gl_iqBuffers[u][antId] = buf;
                gl_iqBuffersLength[u][antId] = iqBuffers[u][antId].length;
            }
            for( const antId in gl_iqBuffers[u] ) {
                if( !iqBuffers[u][antId] ) {
                    gl.deleteBuffer( gl_iqBuffers[u][antId] );
                    gl.deleteBuffer( gl_iqTypeBuffers[u][antId] );
                    delete gl_iqBuffers[u][antId];
                    delete gl_iqTypeBuffers[u][antId];
                    delete gl_iqBuffersLength[u][antId];
                }
            }
        } else if( gl_iqBuffers[u] ) {
            for( const antId in gl_iqBuffers[u] ) {
                gl.deleteBuffer( gl_iqBuffers[u][antId] );
                gl.deleteBuffer( gl_iqTypeBuffers[u][antId] );
            }
            gl_iqBuffers[u] = null;
            gl_iqTypeBuffers[u] = null;
            gl_iqBuffersLength[u] = null;
        }
    }

    iqTab_header_antDropdown_setToUI( canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId] );
    configDialog_initializeNumerology(firstFoundNumerology);
    configDialog_antennas_setToUI();
    configDialog_subcellAntTable_setToUI();
    iqTab_iqTypesUpdated();

    if( config.iqTab.unitedScaleAndMove ) canvas_updateUnitedScale = true;
    canvas_isFullRender = true;
    logDebug( 'UI', `iqTab_loadIqBuffer took ${ perfToMsFrom( perfNow ) }` );
}

function iqTab_iqTypesUpdated() {
    let perfNow = performance.now();

    resourceGrid_updateChannelInfo();

    let tempBufferLength = 0;

    for (let u = 0; u < NUM_OF_U; ++u) {
        for (const antId in iqBuffers[u]) {
            const bufferLength = gl_iqBuffersLength[u][antId] / 2;
            if (bufferLength > tempBufferLength) {
                tempBufferLength = bufferLength;
            }
        }
    }

    const iqTypeTempBuf = new Uint8Array(tempBufferLength);
    let prevIqTypeTempBufOff = 0;

    for (let u = 0; u < NUM_OF_U; ++u) {
        if (!iqBuffers[u]) continue;

        for (const antId in iqBuffers[u]) {
            const glBuffer = gl_iqTypeBuffers[u][antId] ? gl_iqTypeBuffers[u][antId] : gl.createBuffer();
            const iqTypeBuf = iqTypeBuffers[u][antId].buffer;
            const iqNumPrb_sf = iqNumPrb[u][antId];
            let iqTypeTempBufOff = 0;

            for (const finalSubframeStr in iqNumPrb_sf) {
                const finalSubframe = Number(finalSubframeStr);
                const iqOffset = iqOffsets[u][antId][finalSubframe];

                const iqNumPrb_sym = iqNumPrb_sf[finalSubframe];
                if( iqNumPrb_sf[finalSubframe] ) {

                    for( let sym = 0; sym < NUM_OF_SYM_IN_SF_PER_U[u]; ++sym ) {
                        const numPrb = iqNumPrb_sym[sym];
                        if( !numPrb ) continue;

                        const iqType = new Uint8Array( iqTypeBuf, iqOffset[sym]/2, 12 * numPrb );
                        iqTypeTempBuf.set(iqType, iqTypeTempBufOff);
                        iqTypeTempBufOff += 12 * numPrb;
                    }
                }
            }

            gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer );
            gl.bufferData( gl.ARRAY_BUFFER, iqTypeTempBuf, gl.STATIC_DRAW );
            gl_iqTypeBuffers[u][antId] = glBuffer;

            for (let i = iqTypeTempBufOff; i < prevIqTypeTempBufOff; ++i) {
                iqTypeTempBuf[i] = 0;
            }

            prevIqTypeTempBufOff = iqTypeTempBufOff;
        }
    }

    for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
        if( ( canvas_viewports[vIdx].mode ) ||
            ( canvas_viewports[vIdx].mode === RENDER_MODE.REGRID && [3, 4, 5].includes( canvas_viewports[vIdx].submode ) ) ) {
            canvas_viewports[vIdx].isRender = true;
        }
    }
    logDebug( 'UI', `iqTab_iqTypesUpdated took ${ perfToMsFrom( perfNow ) }` );
}

function canvas_getViewportIdxFromCord( x, y ) {
    for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
        const v = canvas_viewports[vIdx];
        if( x >= v.x && y >= v.y && x < ( v.x + v.width ) && y < ( v.y + v.height ) ) {
            return vIdx;
        }
    }
    return -1;
}

function canvas_onKeyDown( e ) {
    const vIdx = canvas_getViewportIdxFromCord( canvas_lastMouseCordX, canvas_lastMouseCordY );
    switch( e.code ) {
        case 'KeyZ':
            graph2dZoomXOnly = true;
            canvas_viewports[vIdx].zoomXonly = true;
            break;
        case 'KeyX':
            graph2dZoomYOnly = true;
            canvas_viewports[vIdx].zoomYonly = true;
            break;
        case 'Equal':
            if( vIdx === -1 ) break;
            canvas_modifyScale( canvas_viewports[vIdx], canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : vIdx], true, canvas_lastMouseCordX, canvas_lastMouseCordY );
            break;
        case 'Minus':
            if( vIdx === -1 ) break;
            canvas_modifyScale( canvas_viewports[vIdx], canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : vIdx], false, canvas_lastMouseCordX, canvas_lastMouseCordY );
            break;
        case 'Escape':
        case 'KeyR':
            canvas_viewports[vIdx].scaleX.fill( 1.0 );
            canvas_viewports[vIdx].scaleY.fill( 1.0 );
            canvas_viewports[vIdx].transX.fill( 0.0 );
            canvas_viewports[vIdx].transY.fill( 0.0 );

            if(canvas_mouseDownViewportIdx===-1) return;
            canvas_modifyScale( canvas_viewports[canvas_mouseDownViewportIdx], canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : canvas_mouseDownViewportIdx], true, 0, 0 );
            break;
        case 'KeyC':
            graph2dSampleShift = true;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
            if( vIdx === -1 ) break;
            // TODO: left/right -> -+ sym/slot/subframe
            // up/down -> -+ re/rb
            break;
        default:
            // console.log( e.code );
            break;
    }
}

function canvas_onKeyUp( e ) {
    const vIdx = canvas_getViewportIdxFromCord( canvas_lastMouseCordX, canvas_lastMouseCordY );
    switch( e.code ) {
        case 'KeyZ':
            graph2dZoomXOnly = false;
            canvas_viewports[vIdx].zoomXonly = false;
            break;
        case 'KeyX':
            graph2dZoomYOnly = false;
            canvas_viewports[vIdx].zoomYonly = false;
            break;
        case 'KeyC':
            graph2dSampleShift = false;
            break;
    }
}

function canvas_modifyScale( v, vst, isIncrease, x, y ) {
    x -= v.x;
    y -= v.y;
    const oldScaleX = vst.scaleX[v.mode];
    const oldScaleY = vst.scaleY[v.mode];
    if(v.zoomXonly) {
        if( isIncrease ) {
            if( v.mode === RENDER_MODE.CONST_IQ && oldScaleX > 10000 ) return;
            if( v.mode === RENDER_MODE.REGRID && oldScaleX > 20 ) return;
        }

        isIncrease ? vst.scaleX[v.mode] *= 1.1 : vst.scaleX[v.mode] /= 1.1;
        if( vst.scaleX[v.mode] <= minZoom ) vst.scaleX[v.mode] = minZoom;
    } else if(v.zoomYonly) {
        if( isIncrease ) {
            if( v.mode === RENDER_MODE.CONST_IQ && oldScaleY > 10000 ) return;
            if( v.mode === RENDER_MODE.REGRID && oldScaleY > 20 ) return;
        }

        isIncrease ? vst.scaleY[v.mode] *= 1.1 : vst.scaleY[v.mode] /= 1.1;
        if( vst.scaleY[v.mode] <= minZoom ) vst.scaleY[v.mode] = minZoom;
    } else {
        if( isIncrease ) {
            if( v.mode === RENDER_MODE.CONST_IQ && (oldScaleX > 10000 || oldScaleY > 10000)) return;
            if( v.mode === RENDER_MODE.REGRID && (oldScaleX > 20 || oldScaleY > 20)) return;
        }

        isIncrease ? vst.scaleX[v.mode] *= 1.1 : vst.scaleX[v.mode] /= 1.1;
        isIncrease ? vst.scaleY[v.mode] *= 1.1 : vst.scaleY[v.mode] /= 1.1;
        if( vst.scaleX[v.mode] <= minZoom ) vst.scaleX[v.mode] = minZoom;
        if( vst.scaleY[v.mode] <= minZoom ) vst.scaleY[v.mode] = minZoom;
    }
    const newScaleX = vst.scaleX[v.mode];
    const newScaleY = vst.scaleY[v.mode];


    switch( v.mode ) {
        case RENDER_MODE.CONST_IQ:
        case RENDER_MODE.CONST_TIME_IQ:
        case RENDER_MODE.CONST_FFT:
        case RENDER_MODE.CONST_TIME:
            vst.transX[v.mode] += ( ( x - vst.mouseShiftX ) / v.usedWidth - 0.5 ) * ( v.usedWidth / newScaleX - v.usedWidth / oldScaleX );
            vst.transY[v.mode] += ( ( y - vst.mouseShiftY ) / v.usedHeight - 0.5 ) * ( v.usedHeight / newScaleY - v.usedHeight / oldScaleY );
            break;
        case RENDER_MODE.REGRID:
            if( vst.transX[v.mode] !== 0 || ( x - vst.mouseShiftX ) > 50 ) vst.transX[v.mode] += ( ( x - vst.mouseShiftX ) / v.usedWidth ) * ( v.usedWidth / newScaleX - v.usedWidth / oldScaleX );
            if( vst.transY[v.mode] !== 0 || ( y - vst.mouseShiftY ) > 50 ) vst.transY[v.mode] += ( ( y - vst.mouseShiftY ) / v.usedHeight ) * ( v.usedHeight / newScaleY - v.usedHeight / oldScaleY );
            break;
    }

    vst.isScaleUpdated = true;
    if( config.iqTab.unitedScaleAndMove ) {
        for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
            if( canvas_viewports[vIdx].mode === v.mode ) canvas_viewports[vIdx].isRender = true;
        }
    } else {
        v.isRender = true;
    }
}

function canvas_onWheel( e ) {
    let x = e.clientX - canvasWebGL.offsetLeft;
    let y = e.clientY - canvasWebGL.offsetTop;

    const vIdx = canvas_getViewportIdxFromCord( x, y );
    const vstIdx = config.iqTab.unitedScaleAndMove ? 0 : vIdx;
    if( vIdx !== -1 ) {
        canvas_modifyScale( canvas_viewports[vIdx], canvas_viewports[vstIdx], e.deltaY < 0, x, y );
    }
}

function canvas_onMouseDown( e ) {
    e.preventDefault();
    e.stopPropagation();
    canvas_mouseDownCordX = e.clientX - canvas2D.offsetLeft;
    canvas_mouseDownCordY = e.clientY - canvas2D.offsetTop;
    canvas_mouseDownViewportIdx = canvas_getViewportIdxFromCord( canvas_mouseDownCordX, canvas_mouseDownCordY );
    if( canvas_mouseDownViewportIdx !== -1 ) {
        canvas2D.classList.add( 'moveCursor' );

        canvas_lastMouseCordDiffX = 0;
        canvas_lastMouseCordDiffY = 0;

        const v = canvas_viewports[canvas_mouseDownViewportIdx];
        const vst = canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : canvas_mouseDownViewportIdx];

        if(canvas_mouseDownViewportIdx !== canvas_selectedViewportId ) {
            canvas_selectedViewportId = canvas_mouseDownViewportIdx;
            iqTab_changeViewportMode()
            iqTabFiltersDialog.setToUI();
            canvas_isFullRender = true; // Required to clear the viewport selection box
        }

        if(isSelectModeOn){
            canvas_renderResourceGrid_selectionStartPos = canvas_calculateCurrentlyPointedRegridPos(e);
        }

        canvas_oldTransX = vst.transX[v.mode];
        canvas_oldTransY = vst.transY[v.mode];
        canvas_isMouseDown = true;
    }
}

//Calculates frame,subframe,slots,REs and RBs pointed by mouse on REGRID
function canvas_calculateCurrentlyPointedRegridPos(e){
    let rbArr = new Array( NUM_OF_U ).fill( -1 );
    let reArr = new Array( NUM_OF_U ).fill( -1 );

    let slotArr = new Array( NUM_OF_U ).fill( -1 );
    let symbolArr = new Array( NUM_OF_U ).fill( -1 );

    if(canvas_mouseDownViewportIdx == -1) return null;

    const vst = canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : canvas_mouseDownViewportIdx];

    const cordDiffX = e.clientX - canvasWebGL.offsetLeft - canvas_viewports[canvas_mouseDownViewportIdx].x;
    const cordDiffY = e.clientY - canvasWebGL.offsetTop - canvas_viewports[canvas_mouseDownViewportIdx].y;

    const transX = Math.round( vst.transX[vst.mode]*vst.scaleX[vst.mode]-cordDiffX+vst.leftMarkupOffX - vst.currentFrame*vst.frameSize);
    const transY = Math.round( vst.transY[vst.mode]*vst.scaleY[vst.mode]-cordDiffY+vst.topMarkupOffY );

    const frame = Math.floor( -transX / vst.frameSize );
    const subframe = Math.floor( -transX / vst.subframeSize )%10;

    for(let u = 0; u < NUM_OF_U; u++){
            if( !iqBuffers[u] || !vst.selectedU[u] ) continue;

            rbArr[u] = Math.floor( -transY / vst.rbSize[u] );
            reArr[u] = Math.floor( -transY % vst.rbSize[u] / vst.reSize[u] );
            slotArr[u] = Math.floor( -transX / vst.slotSize[u] ) % NUM_OF_SLOTS_PER_U[u];
            symbolArr[u] = Math.floor(( -transX / vst.slotSize[u] % 1)*NUM_OF_SYM_IN_SLOT_PER_U[u]);
    }

    return {"frame" : frame, "subframe" : subframe, "slotArr" : slotArr, "symbolArr" : symbolArr, "rbArr" : rbArr, "reArr" : reArr};
}

//Returns [I,Q] pointed by mouse, applies to Constellation modes
function canvas_calculateCurrentlyPointedIQ(vst,e){
    const leftPad = 65, rightPad = 10, topPad = 10, bottomPad = 20;

    const cordDiffX = e.clientX - canvasWebGL.offsetLeft - canvas_viewports[canvas_mouseDownViewportIdx].x;
    const cordDiffY = e.clientY - canvasWebGL.offsetTop - canvas_viewports[canvas_mouseDownViewportIdx].y;

    const scaleX = vst.scaleX[vst.mode] * vst.usedWidth / vst.width;
    const scaleY = vst.scaleY[vst.mode] * vst.usedHeight / vst.height;
    const transX = ((vst.transX[vst.mode] * vst.scaleX[vst.mode] + leftPad / 2.0) * 2.0) / vst.width;
    const transY = ((vst.transY[vst.mode] * vst.scaleY[vst.mode] - topPad / 2.0) * 2.0) / -vst.height;

    let xStart = (-1-transX)/(scaleX/vst.aspectRatio), xEnd = (1-transX)/(scaleX/vst.aspectRatio);
    let xSpan = xEnd - xStart;

    let yStart = (-1-transY)/scaleY, yEnd = (1-transY)/scaleY;
    let ySpan = yEnd - yStart;

    const gridVLVal = xStart + cordDiffX*xSpan/vst.width;
    const gridHLVal = yEnd - cordDiffY*ySpan/vst.height;

    return [gridHLVal,gridVLVal];
}

function canvas_onMouseUp(e) {
    if( canvas_isMouseDown ) {
        canvas_isMouseDown = false;
        canvas2D.classList.remove( 'moveCursor' );
    }

    if(!isSelectModeOn) return;

    //Whole code below is responsible for seting filters based on drawn rectangle in select mode
    const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId];

    let u = -1;
    for(let i = 0; i < NUM_OF_U; i++){
        if(vf.selectedU[i]){
            u = i;
            break;
        }
    }

    iqTabFiltersDialog_clearFilters();

    const pos = canvas_calculateCurrentlyPointedRegridPos(e);
    if(pos == null) return;
    if(pos["rbArr"][u] < 0) return; //user clicked above the REGRID

    vf.ranges.RB[0] = Math.min(canvas_renderResourceGrid_selectionStartPos["rbArr"][u],pos["rbArr"][u]);
    vf.ranges.RB[1] = Math.max(canvas_renderResourceGrid_selectionStartPos["rbArr"][u],pos["rbArr"][u]);
    iqTabFiltersDialog_RBFilterCheckbox.checked = true;

    iqTab_toggleSelectMode.click(); //to unclick the button (must be called after we check if user didin't click above the REGRID!)

    const finalSF_start = 10 * canvas_renderResourceGrid_selectionStartPos["frame"] + canvas_renderResourceGrid_selectionStartPos["subframe"];
    const finalSF_end = 10 * pos["frame"] + pos["subframe"];

    const finalSym_start = NUM_OF_SYM_IN_SLOT_PER_U[u] * canvas_renderResourceGrid_selectionStartPos["slotArr"][u] + canvas_renderResourceGrid_selectionStartPos["symbolArr"][u];
    const finalSym_end = NUM_OF_SYM_IN_SLOT_PER_U[u] * pos["slotArr"][u] + pos["symbolArr"][u];

    vf.ranges.subframe[0] = Math.min(finalSF_start,finalSF_end);
    vf.ranges.subframe[1] = Math.max(finalSF_start, finalSF_end);
    if(finalSF_end < finalSF_start || (finalSF_end === finalSF_start && finalSym_end < finalSym_start)){
        vf.ranges.symbol[0] = finalSym_end;
        vf.ranges.symbol[1] = finalSym_start;
    }
    else{
        vf.ranges.symbol[0] = finalSym_start;
        vf.ranges.symbol[1] = finalSym_end;
    }

    iqTabFiltersDialog_subframeFilterCheckbox.checked = true;
    iqTabFiltersDialog_symbolFilterCheckbox.checked = true;
    iqTabFiltersDialog.setToUI();
    iqTabCustomize_apply();
}

function canvas_onMouseMove( e ) {
    canvas_lastMouseCordX = e.clientX - canvasWebGL.offsetLeft;
    canvas_lastMouseCordY = e.clientY - canvasWebGL.offsetTop;
    if( canvas_isMouseDown && !graph2dSampleShift) {
        e.preventDefault();
        e.stopPropagation();

        const cordDiffX = e.clientX - canvasWebGL.offsetLeft - canvas_mouseDownCordX;
        const cordDiffY = e.clientY - canvasWebGL.offsetTop - canvas_mouseDownCordY;
        if( cordDiffX !== canvas_lastMouseCordDiffX || cordDiffY !== canvas_lastMouseCordDiffY ) {
            canvas_lastMouseCordDiffX = cordDiffX;
            canvas_lastMouseCordDiffY = cordDiffY;

            const v = canvas_viewports[canvas_mouseDownViewportIdx];
            const vst = canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : canvas_mouseDownViewportIdx];

            if(!isSelectModeOn){
                vst.transX[v.mode] = canvas_oldTransX + cordDiffX / vst.scaleX[v.mode];
                vst.transY[v.mode] = canvas_oldTransY + cordDiffY / vst.scaleY[v.mode];
            }

            if( config.iqTab.unitedScaleAndMove ) {
                for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
                    if( canvas_viewports[vIdx].mode === v.mode ) canvas_viewports[vIdx].isRender = true;
                }
            } else {
                v.isRender = true;
            }
        }
    }
    else if(canvas_isMouseDown && graph2dSampleShift){
        e.preventDefault();
        e.stopPropagation();
        const cordDiffX = e.clientX - canvas_mouseDownCordX;
        if(cordDiffX !== 0){
            canvas_mouseDownCordX = e.clientX;
            if( e.clientX % 20 === 0){
                config.load.shift_samples += cordDiffX > 0 ? -1 : 1;
            }

            getElementById('loadDialog_shift_samples').value = config.load.shift_samples;
            getElementById('modify_sampleShift').value = config.load.shift_samples;
        }
        canvas_isFullRender = true;
    }
}

function canvas_onDblclick( e ) {
    getElementById("decode_information").innerHTML = ""
    loader_toggle();
    setTimeout(function () {

    const v = canvas_viewports[canvas_mouseDownViewportIdx];
    if(v.mode !== RENDER_MODE.REGRID){

        const vst = canvas_viewports[canvas_mouseDownViewportIdx];

        if(v.mode === RENDER_MODE.CONST_IQ  || v.mode === RENDER_MODE.CONST_TIME_IQ){

            const [gridHLVal,gridVLVal] = canvas_calculateCurrentlyPointedIQ(vst,e);

            const dialog_window_body = iqTabDblClickDialog.body;
            let i_position_paragraph = dialog_window_body.children[0];
            let q_position_paragraph = dialog_window_body.children[1];
            i_position_paragraph.innerText = "I: " + gridVLVal;
            q_position_paragraph.innerText = "Q: " + gridHLVal;
            iqTabDblClickDialog.open();

            loader_toggle();
        }
        else if(v.mode === RENDER_MODE.CONST_FFT){

            const [gridHLVal,gridVLVal] = canvas_calculateCurrentlyPointedIQ(vst,e);

            const dialog_window_body = iqTabDblClickDialog.body;
            let i_position_paragraph = dialog_window_body.children[0];
            let q_position_paragraph = dialog_window_body.children[1];

            q_position_paragraph.innerText = "Value: " + gridHLVal;

            if(0 <= gridVLVal && gridVLVal < config.iqTab.guardband_size/2){
                i_position_paragraph.innerText = "Left guardband sample nr: " + gridVLVal;
            }
            else if(config.iqTab.guardband_size/2 <= gridVLVal && gridVLVal < config.iqTab.fft_size-config.iqTab.guardband_size/2){
                const sample = (gridVLVal-config.iqTab.guardband_size/2);
                i_position_paragraph.innerText = "Sample : " + sample + " PRB: " + parseInt(sample/12) + " RB: " + (sample%12);
            }
            else if(config.iqTab.fft_size-config.iqTab.guardband_size/2 <= gridVLVal && gridVLVal < config.iqTab.fft_size){
                i_position_paragraph.innerText = "Right guardband sample nr: " + (gridVLVal-config.iqTab.fft_size+config.iqTab.guardband_size/2);
            }
            else{
                i_position_paragraph.innerText = "Clicked outside of signal";
            }

            iqTabDblClickDialog.open();
            loader_toggle();
        }
        else if(v.mode === RENDER_MODE.CONST_TIME){

            let [gridHLVal,gridVLVal] = canvas_calculateCurrentlyPointedIQ(vst,e);
            gridVLVal = Math.round(1000000 * gridVLVal);

            const dialog_window_body = iqTabDblClickDialog.body;
            let i_position_paragraph = dialog_window_body.children[0];
            let q_position_paragraph = dialog_window_body.children[1];

            const text = getSymbolNumberFromSampleNumber(gridVLVal)

            q_position_paragraph.innerText = "Value: " + gridHLVal;
            i_position_paragraph.innerText = text;

            iqTabDblClickDialog.open();
            loader_toggle();
        }
        return;
    }
    const vst = canvas_viewports[config.iqTab.unitedScaleAndMove ? 0 : canvas_mouseDownViewportIdx];

    let clicked = new Array( NUM_OF_U ).fill( null );
    let clicked_fcp = new Array( NUM_OF_U ).fill( null );

    const pos = canvas_calculateCurrentlyPointedRegridPos(e);
    const frame = pos["frame"], subframe = pos["subframe"];
    const rb = pos["rbArr"], re = pos["reArr"], slot = pos["slotArr"], symbol = pos["symbolArr"];

    const cordDiffX = e.clientX - canvasWebGL.offsetLeft - canvas_viewports[canvas_mouseDownViewportIdx].x;
    const cordDiffY = e.clientY - canvasWebGL.offsetTop - canvas_viewports[canvas_mouseDownViewportIdx].y;

    document.getElementsByClassName("clicked_fcp")[0].hidden = true;
    for(let u = 0; u < NUM_OF_U; u++){
        if( !iqBuffers[u] || !vst.selectedU[u] ) continue;

        const coordinates = (frame*10+subframe)+":"+(slot[u]*14+symbol[u]);
        const clickedPacket = findClickedPackets(v, vst, u, coordinates, rb[u], cordDiffX, cordDiffY);
        clicked[u] = clickedPacket;
        clicked_fcp[u] = findFCPClickedPackets(v, vst, u, frame, subframe, rb[u], cordDiffX, cordDiffY);

        if(clickedPacket){
            const ecpri = packets[clickedPacket].ecpri;
            const rtcId =  ecpri.rtcId + (ecpri.dataDir === 1 ? 2**16 : 0);
            decodePackets(u, rtcId, frame, subframe, slot[u], symbol[u], rb[u], re[u])
        }
        else{
            let rtcIds_in_place = [];
            for(const rtcId in iqBuffers[u]){
                if(vst.selectedAnt[u][rtcId]){
                    let values_in_place = superselect_and_get(-1, u, rtcId, symbol[u], symbol[u]+1, frame, subframe, slot, rb[u]*12+re[u], rb[u]*12+re[u]+1)
                    if(values_in_place.v_i.length > 0) rtcIds_in_place.push(rtcId);

                    decodePackets(u, rtcId, frame, subframe, slot[u], symbol[u], rb[u], re[u]);
                }
            }
            for(let rtcId of rtcIds_in_place){
                decodePackets(u, rtcId, frame, subframe, slot[u], symbol[u], rb[u], re[u]);
            }
        }
    }

    // Could be bunched together
    create_ANALYSIS_body(frame, subframe, slot, symbol, rb, re, clicked, clicked_fcp);
    analysisDialog.open();

    loader_toggle();
    }, 100);
}

function getSymbolNumberFromSampleNumber(gridVLVal){

    if(gridVLVal < 0) return "Clicked outside of signal";

    const subframeLen = config.load.sampling * 1000;
    let sampleNumber =  gridVLVal % subframeLen;
    const u = config.load.defaultU;
    const normalCyclicPrefixLen = (config.load.sampling / 30.72) * 144*(2**(-u));
    const longerCyclicPrefixLen = (config.load.sampling / 30.72) * (144*(2**(-u)) + 16);
    const slotLen = (config.load.sampling / 30.72) * (2048*(2**(-u)));

    let text = "Frame: " + parseInt(gridVLVal/(subframeLen*10)) + " Subframe: " + parseInt(gridVLVal%(subframeLen*10)/subframeLen);

    let cyclicIter = 0, iterator = 0;

    while(cyclicIter < config.load.sampling * 1000){
        const isLonger = iterator%((2**u)*14) === 0 || iterator%((2**u)*14) === (2**u)*7;
        const cyclicPrefixLen = isLonger ? longerCyclicPrefixLen : normalCyclicPrefixLen;
        if(cyclicIter <= sampleNumber && sampleNumber < cyclicIter + cyclicPrefixLen){
            return text + " slot " + iterator + " cyclic prefix sample " + (sampleNumber-cyclicIter);
        }
        cyclicIter += cyclicPrefixLen;
        if(cyclicIter <= sampleNumber && sampleNumber < cyclicIter + slotLen){
            return text + " slot " + iterator + " sample " + (sampleNumber-cyclicIter);
        }

        cyclicIter += slotLen;
        iterator++;
    }

}

function findClickedPackets(v, vst, selectedU, coordinates, rb, cordDiffX, cordDiffY){
    const possible_clicked = [];
    for (const [antId, isActive] of Object.entries(vst.selectedAnt[selectedU])) {
        if(!isActive || !packet_places[selectedU][antId]) continue;
        const tmp = packet_places[selectedU][antId][coordinates];
        if(tmp){
            for(let packetI of tmp){
                if (!isDeepRx) {
                    for( const sect of packets[packetI].ecpri.sections ) {
                        if(sect.startPrb <= rb && rb < sect.startPrb + sect.numPrb){
                            possible_clicked.push(packetI);
                        }
                    }
                }
            }
        }
    }

    if(possible_clicked && possible_clicked.length > 0){

        const viewportResollution = canvas_renderResourceGrid_getViewResolution(vst);
        const verticalReSpacing = viewportResollution === 1 ? 1 : 0;

        const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
        const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

        const firstSubframe = Math.floor( -transX / vst.subframeSize );
        const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;

        const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
        const reOffset = vst.topMarkupOffY + transY;

        for(const {subframe, u, antId, symbol, resource, resolution} of canvas_renderResourceGrid_getResourcesAll()) {
            // Calculate on-screen position and dimensions
            const baseSym = ( subframe - firstFinalSubframe ) * NUM_OF_SYM_IN_SF_PER_U[u];

            const w = Math.floor( Math.max((vst.singleSymSize[u] - 1) / resource.innerOffsetX, 1) );
            const h = Math.floor( Math.max((vst.reSize[u] * resolution - verticalReSpacing) / resource.innerOffsetY, 1) );
            const x = Math.round((symbol+baseSym) * vst.symSize[u] + symbolOffset + (resource.innerCount%resource.innerOffsetX) * w);
            const y = Math.round(resource.re * vst.reSize[u] + reOffset + Math.floor(resource.innerCount/resource.innerOffsetX) * h);

            if((x <= cordDiffX && cordDiffX <= x+w ) && (y <= cordDiffY && cordDiffY <= y+h ) && (selectedU === u) ){
                for(let j = 0; j < possible_clicked.length; j++){
                    const packetRtcId = packets[possible_clicked[j]].ecpri.rtcId + (packets[possible_clicked[j]].ecpri.dataDir === 1 ? 2**16 : 0);
                    if(vst.selectedAnt[u][packetRtcId] && packetRtcId === parseInt(antId)){
                        return possible_clicked[j];
                    }
                }
            }
        }
    }
    return null;
}

function findFCPClickedPackets(v, vst, u, frame, subframe, rb, cordDiffX, cordDiffY){
    const clicked_fcp = [];
    const possible_clicked_fcp = [];

    for (const [antId, isActive] of Object.entries(vst.selectedAnt[u])) {
        if(!isActive || !fcp_places[u][antId]) continue;
        const tmp = fcp_places[u][antId][frame*10+subframe];
        if(tmp){
            for(let packetI in tmp){
                if(tmp[packetI].y0 <= rb && rb <= tmp[packetI].y1){
                    possible_clicked_fcp.push(tmp[packetI].packet);
                }

            }
        }
    }
    if(!possible_clicked_fcp || possible_clicked_fcp.length === 0) return [];

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;

    const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
    const reOffset = vst.topMarkupOffY + transY;

    for (const [subframe, uMap] of fcp_map.entries()) {
        for (const [u, antMap] of uMap.entries()) {
            for (const [antId, resources] of antMap.entries()) {
                for (const resource of resources) {
                    const baseSym = ( subframe - firstFinalSubframe ) * NUM_OF_SYM_IN_SF_PER_U[u];

                    const w = Math.floor( Math.max(vst.singleSymSize[u] * resource.numSymbols - 1, 1) );
                    const h = Math.floor( Math.max(vst.reSize[u] * resource.numRb * 12 - 1, 1) );
                    const x = Math.floor((resource.symbol+baseSym) * vst.symSize[u] + symbolOffset);
                    const y = Math.floor(resource.rb * 12 * vst.reSize[u] + reOffset);

                    const packet_id = resource.packetId;
                    if(clicked_fcp.includes(packet_id)) continue;
                    if((x <= cordDiffX && cordDiffX <= x+w ) && (y <= cordDiffY && cordDiffY <= y+h ) ){
                        for(let j = 0; j < possible_clicked_fcp.length; j++){
                            const packetRtcId = packets[possible_clicked_fcp[j]].ecpri.rtcId + (packets[possible_clicked_fcp[j]].ecpri.dataDir === 1 ? 2**16 : 0);
                            if(vst.selectedAnt[u][packetRtcId] && packet_id === possible_clicked_fcp[j] && !clicked_fcp.includes(possible_clicked_fcp[j])){
                                clicked_fcp.push(possible_clicked_fcp[j]);
                                document.getElementsByClassName("clicked_fcp")[0].hidden = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return clicked_fcp;
}

function iqTab_selectViewportsSplit( split ) {
    canvas_setViewportsSplit( split );

    if(canvas_selectedViewportId >= canvas_numOfActiveViewports){
        canvas_selectedViewportId = 0; //if we have less viewports than before, we need to reset selected viewport
    }
}

function iqTab_header_antDropdown_onClickU( e ) {
    const startId = `selAnt_${ e.id.split( '_' )[1] }`;
    const antInputs = iqTab_header_antDD_body.getElementsByTagName( 'input' );
    for( const selChkBox of antInputs ) {
        if( selChkBox.id.startsWith( startId ) ) {
            selChkBox.checked = e.checked;
            // selChkBox.disabled = !e.checked;
        }
    }

    reGrid_invalidateCache();
    iqTabCustomize_apply();
}

function iqTab_header_antDropdown_onClickAnt( e ){
    const numerology = parseInt( e.id.split( '_' )[1]);
    const uCheckbox = getElementById( `selU_${numerology}`);
    if(uCheckbox) uCheckbox.checked = true;

    reGrid_invalidateCache();
    iqTabCustomize_apply();
}

function iqTab_header_antDropdown_deselectAll(){

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            for( let antId in iqBuffers[u] ) {
                let id = `selAnt_${ u }_${ antId }`;
                getElementById(id).checked = false;
            }
        }
    }
    reGrid_invalidateCache();
    iqTabCustomize_apply();
}

function iqTab_header_antDropdown_setToUI( vf ) {
    const antDD_body = getElementById("iqTab_header_antDD_body")
    const antDD_header = getElementById("iqTab_header_antDD_header")
    antDD_body.innerHTML = "";

    let id = '';
    let exists_iq_data = false;

    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            exists_iq_data = true;
            id = `selU_${ u }`;
            antDD_body.innerHTML += `<div><input type="checkbox" id="${ id }" onclick="iqTab_header_antDropdown_onClickU( this );\
                iqTabCustomize_apply()" ${ vf.selectedU[u] ? 'checked' : '' }> <label for="${ id }">&micro;: ${ u }</label></div>`;

            for( let antId in iqBuffers[u] ) {
                id = `selAnt_${ u }_${ antId }`;
                let dir, rtcId, label;

                if(parseInt(antId) == antId) antId = parseInt(antId);
                if (isDeepRx) {
                    switch (antId) {
                        case 0:
                            label = 'Hraw layer 1 beam 1';
                            break;
                        case 1:
                            label = 'Hraw layer 1 beam 2';
                            break;
                        case 2:
                            label = 'Hraw layer 1 beam 3';
                            break;
                        case 3:
                            label = 'Hraw layer 1 beam 4';
                            break;
                        case 4:
                            label = 'Hraw layer 2 beam 1';
                            break;
                        case 5:
                            label = 'Hraw layer 2 beam 2';
                            break;
                        case 6:
                            label = 'Hraw layer 2 beam 3';
                            break;
                        case 7:
                            label = 'Hraw layer 2 beam 4';
                            break;
                        case 8:
                            label = 'RxData beam 1';
                            break;
                        case 9:
                            label = 'RxData beam 2';
                            break;
                        case 10:
                            label = 'RxData beam 3';
                            break;
                        case 11:
                            label = 'RxData beam 4';
                            break;
                        case 12:
                            label = 'TxPilot layer 1';
                            break;
                        case 13:
                            label = 'TxPilot layer 2';
                            break;
                    }
                }
                else if (Number.isInteger(antId)) {
                    dir = antId >= 0x10000 ? 'DL' : 'UL';
                    rtcId = antId & 0xFFFF;
                } else {
                    dir = config.load.dir;
                    rtcId = antId;
                }

                if (isDeepRx) {
                    antDD_body.innerHTML += `<div>&boxur; <input type="checkbox" onclick="iqTab_header_antDropdown_onClickAnt( this )" id="${ id }" \
                    ${ vf.selectedAnt[u][antId] ? 'checked' : '' } <label for="${ id }">${ label }</label></div>`;
                } else {
                    antDD_body.innerHTML += `<div>&boxur; <input type="checkbox" onclick="iqTab_header_antDropdown_onClickAnt( this )" id="${ id }" \
                    ${ vf.selectedAnt[u][antId] ? 'checked' : '' } <label for="${ id }">${ dir } rtcId ${ rtcId }</label></div>`;
                }
            }
        }
    }

    antDD_body.innerHTML += `<div style="text-align:center; border-top: 1px solid black;"><a style=" color: blue; cursor: pointer;" onclick="iqTab_header_antDropdown_deselectAll()">Deselect all</a></div>`

    if(antDD_header.getAttribute('onclickAttached') !== 'true'){
        antDD_header.addEventListener('click',function(e){
            antDD_body.style.display = antDD_body.style.display === "none" ? "": "none";
        });
        antDD_header.setAttribute('onclickAttached','true')
    }

    if( !exists_iq_data ) {
        antDD_body.innerHTML = '<div>No IQ data</div>';
        getElementById('no_iqData').style.display = 'block';
    } else {
        getElementById('no_iqData').style.display = 'none';
    }

    saveDialog_iqAntenna.innerHTML = "";
    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            for( const antId in iqBuffers[u] ) {
                const dir = antId >= 0x10000 ? 'DL' : 'UL';
                const rtcId = antId & 0xFFFF;
                let id = antId.includes("RoE") ? antId :
                    `u: ${ u }, ${dir}, id: ${ rtcId }`;
                let html = `<div>
                <input id="${id}" type="checkbox" value="${u}_${antId}"> </input>
                <label for="${id}"> ${id} </label>
                </div>`
                saveDialog_iqAntenna.innerHTML += html;
            }
        }
    }

    const checkboxes = saveDialog_iqAntenna.querySelectorAll("input");
    if(checkboxes.length > 0)
        checkboxes[0].checked = true;
}

function setNoDataMessage(mode){
    let exists_iq_data = false;
    for( let u = 0; u < NUM_OF_U; ++u ) {
        if( iqBuffers[u] ) {
            exists_iq_data = true;
        }
    }

    if( !exists_iq_data && [0, 1, 3].includes(mode) || (Object.keys(time_i).length === 0 && (mode === 2 || mode === 4)) ) {
        getElementById('no_iqData').style.display = 'block';
    } else {
        getElementById('no_iqData').style.display = 'none';
    }
}

function iqTab_header_channelsDropdown_input_onClick( e ) {
    e.stopPropagation()
    const channelIdx = e.target.id.split( '_' )[1];
    const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId];
    if( isNaN( channelIdx ) ) {
        for( const channelName of channelGroups[channelIdx] ) {
            const channelId = channels.map(c=>c.name).indexOf( channelName );
            getElementById( `selCh_${ channelId }` ).checked = e.target.checked;
            vf.visibleChannels[channelId] = e.target.checked;
        }
    } else {
        vf.visibleChannels[channelIdx] = e.target.checked;
    }
    iqTab_updateGlIqTypeTexture();
    canvas_isFullRender = true;

    iqTabCustomize_apply();
}

function iqTab_header_channelsDropdown_deselectAll(){
    for(let channelGroup in channelGroups){
        let id_group = `selCh_${channelGroup}`;
        let group_cb = getElementById(id_group);
        if(group_cb.checked) group_cb.click();
    }
    if(getElementById("selCh_0").checked) getElementById("selCh_0").click();

    iqTabCustomize_apply();
}

function iqTab_header_channelsDropdown_setToUI( vf ) {
    let channelDD_header = getElementById("iqTab_header_channelDD_header")
    let channelDD_body = getElementById("iqTab_header_channelDD_body")

    if(channelDD_body.innerHTML === ""){
        let channel_idx = 1; //in channels array

        for(let channelGroup in channelGroups){
            let id_prefix = `iqTab_header_channelDD_${channelGroup}`
            channelDD_body.innerHTML += `<div id=${id_prefix}></div>`

            let channelGroup_div = document.getElementById(id_prefix);
            channelGroup_div.innerHTML = `<input type="checkbox" id="selCh_${ channelGroup }" onclick="iqTab_header_channelsDropdown_input_onClick(event)"\
                 ${ vf.visibleChannels[channel_idx] ? 'checked' : '' } > ${ channelGroup }`;

            for(let channelName of channelGroups[channelGroup]){
                const color = channels[channel_idx].color;
                const RGB = [color & 0xFF, color >> 8 & 0xFF, color >> 16 & 0xFF]
                const backgroundColor = `rgb( ${RGB[0]}, ${ RGB[1] }, ${  RGB[2] } )`;

                channelGroup_div.innerHTML += `<div style="background-color: ${ backgroundColor }"> &boxur;\
                    <input type="checkbox" id="selCh_${ channel_idx }" onclick="iqTab_header_channelsDropdown_input_onClick( event )"\
                    ${ vf.visibleChannels[channel_idx] ? 'checked' : '' }> <span>${ channelName }</span></div>`;

                channel_idx++;
            }
        }
        const ch_zero_color = channels[0].color
        const ch_zero_RGB =  [ch_zero_color & 0xFF, ch_zero_color >> 8 & 0xFF, ch_zero_color >> 16 & 0xFF]
        const ch_zero_bgcolor = `rgb( ${ch_zero_RGB[0]}, ${ ch_zero_RGB[1] }, ${  ch_zero_RGB[2] } )`;
        channelDD_body.innerHTML += `<div style="background-color: ${ ch_zero_bgcolor }">\
            <input type="checkbox" id="selCh_0" onclick="iqTab_header_channelsDropdown_input_onClick( event )" ${ vf.visibleChannels[0] ? 'checked' : '' }>\
            <span>ZERO</span></div>`;

        channelDD_body.innerHTML += `<div style="text-align:center; border-top: 1px solid black;"><a style=" color: blue; cursor: pointer;" onclick="iqTab_header_channelsDropdown_deselectAll()">Deselect all</a></div>`
        channelDD_body.innerHTML += `<div style="text-align:center; border-top: 1px solid black;"><a style=" color: blue; cursor: pointer;" onclick= "countChannels()">Count channels</a></div>`
        channelDD_header.addEventListener('click',function(e){
            channelDD_body.style.display = channelDD_body.style.display === "none" ? "": "none";
        });
    }
    else {
        getElementById( `selCh_0` ).checked = vf.visibleChannels[0];
        let channel_idx = 1;
        for(let channelGroup in channelGroups){
            let groupVisible = false;

            for(let channelName of channelGroups[channelGroup]){
                const chan_checkbox = getElementById( `selCh_${ channel_idx }` );
                chan_checkbox.checked = vf.visibleChannels[channel_idx];
                if(chan_checkbox.checked) groupVisible = true;
                channel_idx++;
            }
            getElementById( `selCh_${ channelGroup }` ).checked = groupVisible;

        }
    }
}

function iqTabCustomize_apply() {
    const mode = parseInt( config.iqTab.viewportsModes[canvas_selectedViewportId].split( '_' )[0] );
    const submode = parseInt( config.iqTab.viewportsModes[canvas_selectedViewportId].split( '_' )[1] );
    try{
        getElementById('iqTab_mode_' + mode).checked = true;
        document.getElementsByClassName('arrow')[mode].hidden = false;
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.backgroundColor = '#30629c';
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.color = '#ffffff';
    }
    catch (e) {}


    setNoDataMessage(mode);

    let updateUnitedScale = false;
    let isFullRender = false;
    const singleFilterChecked = getAriaPressed( iqTab_unifiedFilters );
    if( singleFilterChecked !== config.iqTab.singleFilter ) {
        config.iqTab.singleFilter = singleFilterChecked;
        if( !config.iqTab.singleFilter ) {
            for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
                canvas_viewports[vIdx].isFiltersUpdated = true;
            }
        } else {
            canvas_viewports[0].isFiltersUpdated = true;
        }
        if( config.iqTab.unitedScaleAndMove ) updateUnitedScale = true;
        isFullRender = true;
    }
    const unifiedView = getAriaPressed(iqTab_unifiedView);
    if( unifiedView !== config.iqTab.unitedScaleAndMove ) {
        config.iqTab.unitedScaleAndMove = unifiedView;
        if( config.iqTab.unitedScaleAndMove ) {
            for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
                const vst = canvas_viewports[vIdx];
                vst.isScaleUpdated = true;
                vst.scaleX.fill( 1.0 );
                vst.scaleY.fill( 1.0 );
                vst.transX.fill( 0.0 );
                vst.transY.fill( 0.0 );
            }
        }
        updateUnitedScale = true;
        isFullRender = true;
    }
    if( config.iqTab.constPointSize !== get_param_radio_int( iqTabDisplaySettingsDialog_constPointSize ) ) {
        config.iqTab.constPointSize = get_param_radio_int( iqTabDisplaySettingsDialog_constPointSize );
        for( let vIdx = 0; vIdx < canvas_maxNumOfViewports; ++vIdx ) {
            if( canvas_viewports[vIdx].mode === RENDER_MODE.CONST_IQ ) canvas_viewports[vIdx].isRender = true;
        }
    }
    if( config.iqTab.usePacketsFilter !== iqTabFiltersDialog_usePacketFilter.checked){
        config.iqTab.usePacketsFilter = iqTabFiltersDialog_usePacketFilter.checked;
        canvas_isFullRender = true;
    }

    const v = canvas_viewports[canvas_selectedViewportId];
    const vf = canvas_viewports[config.iqTab.singleFilter ? 0 : canvas_selectedViewportId];

    if( config.iqTab.unitedScaleAndMove && v.isModeChanged ) updateUnitedScale = true;

    const antInputs = iqTab_header_antDD_body.getElementsByTagName( 'input' );
    for( const selChkBox of antInputs ) {
        const splitted = selChkBox.id.split( '_' );
        const u = parseInt( splitted[1] );
        if( splitted[0] === 'selU' ) {
            if( vf.selectedU[u] !== selChkBox.checked ) {
                vf.isFiltersUpdated = true;
                vf.selectedU[u] = selChkBox.checked;
                if( config.iqTab.unitedScaleAndMove ) updateUnitedScale = true;
            }
        } else { // selAnt
            const antId = ( splitted[2] );
            if( vf.selectedAnt[u][antId] !== selChkBox.checked ) {
                vf.isFiltersUpdated = true;
                vf.selectedAnt[u][antId] = selChkBox.checked;
                if( config.iqTab.unitedScaleAndMove ) updateUnitedScale = true;
            }
        }
    }


    applyIqTabRanges(v, vf);
    config.iqTab.drawFCP = getAriaPressed(iqTab_drawFcp);
    vf.filteredPackets = new Set(filteredPacketsIds);
    if(config.iqTab.singleFilter) for(let vIdx= 0; vIdx < canvas_numOfActiveViewports; vIdx++) canvas_viewports[vIdx].isRender = true;
    else v.isRender = true;
    canvas_updateUnitedScale = updateUnitedScale;
    if( !canvas_isFullRender && updateUnitedScale ) {
        for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
            if( canvas_viewports[vIdx].mode === RENDER_MODE.REGRID ) canvas_viewports[vIdx].isRender = true;
        }
    }

    canvas_isFullRender = isFullRender;
    heatmapToolbar_toggle();
}

function heatmapToolbar_toggle() {
    if (!getElementById("root_header_menu_2").checked) {
        getElementById("heatmap_toolbar").hidden = true;
    } else {
        const splitIdx = config.iqTab.viewportsSplit;
        const cv = canvas_viewports;
        switch (splitIdx) {
            case 0:
                getElementById("heatmap_toolbar").hidden = !(
                    cv[0].mode === 0 && cv[0].submode === 3
                );
                break;
            case 1:
            case 2:
                getElementById("heatmap_toolbar").hidden = !(
                    (cv[0].mode === 0 && cv[0].submode === 3) ||
                    (cv[1].mode === 0 && cv[1].submode === 3)
                );
                break;
            case 3:
                getElementById("heatmap_toolbar").hidden = !(
                    (cv[0].mode === 0 && cv[0].submode === 3) ||
                    (cv[1].mode === 0 && cv[1].submode === 3) ||
                    (cv[2].mode === 0 && cv[2].submode === 3) ||
                    (cv[3].mode === 0 && cv[3].submode === 3)
                );
                break;
        }
    }
}

function iqTab_drawVerticalScale(v, xStart, xSpan, yStart, ySpan){
    const distance = ySpan/12;
    const markStart = parseInt(yStart/distance)*distance;
    ctx2d.beginPath();
    ctx2d.fillStyle = "#000000";
    ctx2d.strokeStyle = "#FFFFFF";
    ctx2d.fillRect(0, 0, 70, v.height);
    ctx2d.fill();

    ctx2d.beginPath();
    ctx2d.lineWidth = 2;
    ctx2d.moveTo(70, 0);
    ctx2d.lineTo(70, v.height);
    ctx2d.stroke();

    ctx2d.fillStyle = "#FFFFFF";

    ctx2d.textAlign = "left";
    ctx2d.lineWidth = 0.4;

    ctx2d.beginPath();
    for(let i = 0; i < 12; i++){
        let yMark = markStart - i*distance;
        ctx2d.moveTo(72, v.height*(yStart-yMark)/ySpan);
        ctx2d.lineTo(v.width, v.height*(yStart-yMark)/ySpan);
        ctx2d.fillText(yMark.toFixed(4), 5, v.height*(yStart-yMark)/ySpan + 2);
    }
    ctx2d.stroke();
}


function iqTab_drawHorizontalScale(v, xStart, xSpan, yStart, ySpan){
    const distance = xSpan/12;
    const markStart = parseInt(xStart/distance)*distance;
    ctx2d.beginPath();
    ctx2d.fillStyle = "#000000";
    ctx2d.strokeStyle = "#FFFFFF";
    ctx2d.fillRect(0, v.height-30, v.width, 30);
    ctx2d.fill();

    ctx2d.beginPath();
    ctx2d.lineWidth = 2;
    ctx2d.moveTo(70, v.height-30);
    ctx2d.lineTo(v.width, v.height-30);
    ctx2d.stroke();

    ctx2d.fillStyle = "#FFFFFF";

    ctx2d.textAlign = "center";
    ctx2d.lineWidth = 0.4;

    ctx2d.beginPath();



    for(let i = 0; i < 12; i++){

        let xMark = markStart + i*distance;
        if(v.width*(xMark - xStart)/xSpan < 65 ) continue;

        ctx2d.moveTo(v.width*(xMark - xStart)/xSpan, 0);
        ctx2d.lineTo(v.width*(xMark - xStart)/xSpan, v.height-30);
        ctx2d.fillText(xMark.toFixed(4), v.width*(xMark - xStart)/xSpan, v.height-10);
    }
    ctx2d.stroke();

    ctx2d.beginPath();
    ctx2d.fillStyle = "#000000";
    ctx2d.strokeStyle = "#FFFFFF";
    ctx2d.fillRect(0, v.height-30, 70, 30);
    ctx2d.fill();
}


function iqTab_changeViewportMode(){

    const mode = canvas_viewports[canvas_selectedViewportId].mode;
    const submode = canvas_viewports[canvas_selectedViewportId].submode;

    for(let i = 0; i < 5; i++){
        getElementById('iqTab_mode_'+i)
        document.getElementsByClassName('arrow')[i].hidden = true;

        let j = 0;

        while(document.getElementById('iqTab_subMode_'+i+'_'+j)){
            getElementById('iqTab_subMode_'+i+'_'+j).style.color = '#000000';
            getElementById('iqTab_subMode_'+i+'_'+j).style.backgroundColor = '#ffffff';
            j++;
        }
    }

    try{
        getElementById('iqTab_mode_' + mode).checked = true;
        document.getElementsByClassName('arrow')[mode].hidden = false;
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.backgroundColor = '#30629c';
        getElementById("iqTab_subMode_" + mode + "_" + submode).style.color = '#ffffff';
    }
    catch (e) {
        console.log(e)
    }

}

function iqTab_changeMode(a){
    const v = canvas_viewports[canvas_selectedViewportId];
    const prev_mode = parseInt(config.iqTab.viewportsModes[canvas_selectedViewportId].split('_')[0]);
    a.checked = true;

    if(parseInt(a.id.split('_')[2]) === prev_mode){
        //list
        const prev_state = a.labels[0].getElementsByClassName("iqTab_submodeList")[0].hidden;

        const iqTab_submodeList = document.getElementsByClassName("iqTab_submodeList");
        for(let i = 0; i < iqTab_submodeList.length; i++){
            iqTab_submodeList[i].hidden = true;
        }

        getElementById("iqTab_subMode_" + v.mode + "_" + v.submode).style.backgroundColor = '#30629c';
        getElementById("iqTab_subMode_" + v.mode + "_" + v.submode).style.color = '#ffffff';

        a.labels[0].getElementsByClassName("iqTab_submodeList")[0].hidden = !prev_state;
    }
    else{
        for(let i of document.getElementsByClassName('arrow')){
            i.hidden = true;
        }
        document.getElementsByClassName('arrow')[a.value].hidden = false;

        const iqTab_submodeList = document.getElementsByClassName("iqTab_submodeList");
        for(let i = 0; i < iqTab_submodeList.length; i++){
            iqTab_submodeList[i].hidden = true;
        }
    }

    const mode = parseInt(a.value);
    if( mode !== v.mode) v.isModeChanged = true;

    v.mode = mode;
    v.submode = parseInt( config.iqTab.previous_modes[canvas_selectedViewportId][v.mode] );
    config.iqTab.viewportsModes[canvas_selectedViewportId] = v.mode + '_' + v.submode;

    if(mode != RENDER_MODE.REGRID) iqTab_selectModeButton_hide();
    else iqTab_selectModeButton_enable();

    iqTabCustomize_apply();
}

function iqTab_changeSubMode(a, value){
    const parentElement = a.parentElement;
    for(let childElement of parentElement.childNodes){
        if(childElement.style){
            childElement.style.backgroundColor = "#ffffff";
            childElement.style.color = "#000000";
        }
    }


    a.style.backgroundColor = "#30629c";
    a.style.color = "#ffffff";

    const v = canvas_viewports[canvas_selectedViewportId];

    config.iqTab.viewportsModes[canvas_selectedViewportId] = value;

    const modeSplit = value.split( '_' );
    const mode = parseInt( modeSplit[0] );
    const submode = parseInt( modeSplit[1] );
    v.isModeChanged = v.mode !== mode || v.submode !== submode;

    v.mode = mode;
    v.submode = submode;

    config.iqTab.previous_modes[canvas_selectedViewportId][v.mode] = v.submode;

    iqTabCustomize_apply();
}

function iqTab_selectModeButton_enable(){
    // isSelectModeOn = true;
    iqTab_toggleSelectMode.hidden = false;
}

function iqTab_selectModeButton_hide(){
    isSelectModeOn = false;
    iqTab_toggleSelectMode.classList.remove("iqTab_toggleSelectMode_enabled");
    iqTab_toggleSelectMode.hidden = true;
}

iqTab_toggleSelectMode.addEventListener('click',() => {
    isSelectModeOn = !isSelectModeOn;

    if(isSelectModeOn){
        iqTab_toggleSelectMode.classList.add("iqTab_toggleSelectMode_enabled");
    }
    else iqTab_toggleSelectMode.classList.remove("iqTab_toggleSelectMode_enabled");

});

function countChannels(){
    let perfNow = performance.now();
    let usedChannels = new Array(channels.length).fill(0);
    for(let u = 0 ; u < iqTypeBuffers.length; u++){
        if (iqTypeBuffers[u] != null){
            for ( let [antIdC,channelType] of Object.entries(iqTypeBuffers[u]) ){
                channelType.forEach(element => {
                    usedChannels[element] += 1;
                });
            }
        }
    } 
    for (let i = 0 ; i < channels.length ; i++){
        let elementId = "selCh_" + i;
        document.getElementById(`${elementId}`).insertAdjacentHTML(`afterend` , `<span>[${usedChannels[i]}]</span>`);
    }
    logDebug(`UI` , `function: countChannels took ${perfToMsFrom( perfNow )}`);
}