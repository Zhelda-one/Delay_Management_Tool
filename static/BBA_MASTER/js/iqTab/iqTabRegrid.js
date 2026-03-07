const canvas_renderResourceGrid_markupLineHeight = 16;
const canvas_renderResourceGrid_markupRbWidth = 28;
const canvas_renderResourceGrid_markupReWidth = 24;

let canvas_renderResourceGrid_whiteLinesList = new Array( 1000 );
let canvas_renderResourceGrid_whiteLinesIdx = 0;
let canvas_renderResourceGrid_grayLinesList = new Array( 1000 );
let canvas_renderResourceGrid_grayLinesIdx = 0;
let canvas_renderResourceGrid_colorFunc = null;

let canvas_renderResourceGrid_brightenScale = 1;

let canvas_renderResourceGrid_selectionStartPos = {};

function canvas_renderResourceGrid_addWhiteLine( x0, y0, x1, y1 ) {
    canvas_renderResourceGrid_whiteLinesList[canvas_renderResourceGrid_whiteLinesIdx++] = x0;
    canvas_renderResourceGrid_whiteLinesList[canvas_renderResourceGrid_whiteLinesIdx++] = y0;
    canvas_renderResourceGrid_whiteLinesList[canvas_renderResourceGrid_whiteLinesIdx++] = x1;
    canvas_renderResourceGrid_whiteLinesList[canvas_renderResourceGrid_whiteLinesIdx++] = y1;
}

function canvas_renderResourceGrid_addGrayLine( x0, y0, x1, y1 ) {
    canvas_renderResourceGrid_grayLinesList[canvas_renderResourceGrid_grayLinesIdx++] = x0;
    canvas_renderResourceGrid_grayLinesList[canvas_renderResourceGrid_grayLinesIdx++] = y0;
    canvas_renderResourceGrid_grayLinesList[canvas_renderResourceGrid_grayLinesIdx++] = x1;
    canvas_renderResourceGrid_grayLinesList[canvas_renderResourceGrid_grayLinesIdx++] = y1;
}

function canvas_renderResourceGrid_colorFunc_white() {
    return 0xFFFFFFFF;
}

function canvas_renderResourceGrid_colorFunc_amplitude( ch, i, q, amp ) {
    const brightness = clamp( amp*canvas_renderResourceGrid_brightenScale/Math.max(0.2, iq_maxAmplitude), 0, 1 );
    // Heatmap: blue (cold) -> cyan -> green -> yellow -> red (hot)
    let r = 0, g = 0, b = 0;
    if (brightness < 0.25) {
        // Blue to Cyan
        r = 0;
        g = 255 * (brightness / 0.25);
        b = 255;
    } else if (brightness < 0.5) {
        // Cyan to Green
        r = 0;
        g = 255;
        b = 255 * (1 - (brightness - 0.25) / 0.25);
    } else if (brightness < 0.75) {
        // Green to Yellow
        r = 255 * ((brightness - 0.5) / 0.25);
        g = 255;
        b = 0;
    } else {
        // Yellow to Red
        r = 255;
        g = 255 * (1 - (brightness - 0.75) / 0.25);
        b = 0;
    }
    const a = Math.max(0.2, brightness);
    r = Math.round(r*a);
    g = Math.round(g*a);
    b = Math.round(b*a);

    return 0xFF000000 | (b << 16) | (g << 8) | r;
}

function canvas_renderResourceGrid_colorFunc_angle( ch, i, q, amp ) {
    const r = Math.min( 255 * amp, 255 );
    const g = clamp( 255 * ( i + 1.0 ) / 2.0, 0, 255 );
    const b = clamp( 255 * ( q + 1.0 ) / 2.0, 0, 255 );
    return 0xFF000000 | b << 16 | g << 8 | r;
}

function canvas_renderResourceGrid_colorFunc_channel( ch ) {
    return 0xFF000000 | channels[ch].color;
}

function canvas_renderResourceGrid_colorFunc_channelAmplitude( ch, i, q, amp ) {
    const col = channels[ch].color;
    let ampMult = 0.1 + clamp( amp*canvas_renderResourceGrid_brightenScale / Math.max(0.2, iq_maxAmplitude), 0, 1 );
    if(ampMult > 1) ampMult = 1;
    const r = ( col >> 16 ) * ampMult;
    const g = ( ( col >> 8 ) & 0xFF ) * ampMult;
    const b = ( col & 0xFF ) * ampMult;
    return 0xFF000000 | ( r | 0 ) << 16 | ( g | 0 ) << 8 | ( b | 0 );
}

function canvas_renderResourceGrid_filtersUpdated( v, vf, vst ) {
    vf.uArr = [];
    vf.numOfAntPerU = 0;
    vf.firstSubframe = Number.MAX_SAFE_INTEGER;
    vf.lastSubframe = 0;

    const vFirstIdx = ( config.iqTab.singleFilter || config.iqTab.unitedScaleAndMove ) ? 0 : v.idx;
    const vLastIdx = config.iqTab.singleFilter ? 1 : ( config.iqTab.unitedScaleAndMove ? canvas_numOfActiveViewports : ( v.idx + 1 ) );
    for( let vIdx = vFirstIdx; vIdx < vLastIdx; ++vIdx ) {
        const gvf = canvas_viewports[vIdx];
        if( gvf.mode !== 1 ) continue;
        for( let u = 0; u < NUM_OF_U; ++u ) {
            if( iqBuffers[u] && gvf.selectedU[u] ) {
                vf.uArr.push( u );
                let numOfDlAnt = 0, numOfUlAnt = 0;
                for( const antId in iqBuffers[u] ) {
                    if( gvf.selectedAnt[u][antId] ) {
                        antId >= 0x10000 ? ++numOfDlAnt : ++numOfUlAnt;
                        if( vf.firstSubframe > iqFirstSubframe[u][antId] ) vf.firstSubframe = iqFirstSubframe[u][antId];
                        if( vf.lastSubframe < ( iqNumPrb[u][antId].length - 1 ) ) vf.lastSubframe = iqNumPrb[u][antId].length - 1;
                    }
                }
                if( Math.max( numOfDlAnt, numOfUlAnt ) > vf.numOfAntPerU ) vf.numOfAntPerU = Math.max( numOfDlAnt, numOfUlAnt );
            }
        }
    }

    vf.uArr = vf.uArr.filter( ( v, i, a ) => a.indexOf( v ) === i ).sort();

    let anyAntActive = false;
    for(let u of vf.uArr){
        for(let antId in vf.selectedAnt[u]){
            if(vf.selectedAnt[u][antId]==true){
                anyAntActive = true;
                break;
            }
        }
    }

    if(!anyAntActive){
        vf.firstSubframe = 0;
        vf.uArr = []
        vf.uArr.push( 0 );
        vf.numOfAntPerU = 1;
    }

    vf.firstFrame = Math.floor( vf.firstSubframe / 10 );
    vf.lastFrame = Math.floor( vf.firstSubframe / 10 );
    if( vst.currentFrame < Math.floor( vf.firstSubframe / 10 ) ) vst.currentFrame = Math.floor( vf.firstSubframe / 10 );
    else if( vst.currentFrame > Math.ceil( vf.lastSubframe / 10 ) ) vst.currentFrame = Math.ceil( vf.lastSubframe / 10 );
    const minU = Math.min( ...vf.uArr ), maxU = Math.max( ...vf.uArr );
    for( let u = minU; u <= maxU; ++u ) {
        vf.scalePerUX[u] = 2 ** ( maxU - u );
        vf.scalePerUY[u] = 2 ** ( u - minU );
    }

    if( !config.iqTab.singleFilter && config.iqTab.unitedScaleAndMove ) {
        for( let vIdx = vFirstIdx + 1; vIdx < vLastIdx; ++vIdx ) {
            const gvf = canvas_viewports[vIdx];
            if( gvf.mode !== 1 ) continue;
            gvf.uArr = [ ...vf.uArr ];
            gvf.scalePerUX = [ ...vf.scalePerUX ];
            gvf.scalePerUY = [ ...vf.scalePerUY ];
            gvf.numOfAntPerU = vf.numOfAntPerU;
            gvf.firstFrame = vf.firstFrame;
            gvf.firstSubframe = vf.firstSubframe;
            gvf.lastSubframe = vf.lastSubframe;
            gvf.lastFrame = vf.lastFrame;
        }
    }
}

function canvas_renderResourceGrid_scaleUpdated( v, vf, vst ) {
    const reIncTable = [2, 3, 4, 6, 12];
    const rbIncTable = [2, 2.5, 2];
    const symIncTable = [2, 7, 14];
    const subframeIncTable = [2, 5, 10];
    const frameIncTable = [2, 2.5, 2];

    vst.sizeDefaultX = 50 * vst.scaleX[v.mode];
    vst.sizeDefaultY = 50 * vst.scaleY[v.mode];
    vst.leftMarkupOffX = 0;
    vst.topMarkupOffY = canvas_renderResourceGrid_markupLineHeight;

    for( let i = 0; i < vf.uArr.length; ++i ) {
        const u = vf.uArr[i];

        vst.reSize[u] = vst.sizeDefaultY * vf.scalePerUY[u];
        for( let re = 0; re < 12 * 274; ++re ) vst.reOff[u][re] = Math.floor( vst.reSize[u] * re );
        vst.rbSize[u] = vst.reSize[u] * 12;
        for( let rb = 0; rb < 274; ++rb ) vst.rbOff[u][rb] = vst.reOff[u][rb * 12];
        vst.singleSymSize[u] = vst.sizeDefaultX * vf.scalePerUX[u];
        vst.symSize[u] = vst.singleSymSize[u] * 1/*vf.numOfAntPerU*/;
        vst.slotSize[u] = vst.symSize[u] * NUM_OF_SYM_IN_SLOT_PER_U[u];

        vst.reInc[u] = vst.rbInc[u] = vst.symInc[u] = vst.slotInc[u] = 1.0;
        let reIncIdx = 0, rbIncIdx = 0, symIncIdx = 0;
        while( vst.reSize[u] * vst.reInc[u] < 20 && vst.reInc[u] < 12 ) { vst.reInc[u] = reIncTable[reIncIdx++]; }
        while( vst.rbSize[u] * vst.rbInc[u] < 20 ) { vst.rbInc[u] *= rbIncTable[rbIncIdx++ % 3]; }
        while( vst.symSize[u] * vst.symInc[u] < 20 && vst.symInc[u] < NUM_OF_SYM_IN_SLOT_PER_U[u] ) { vst.symInc[u] = symIncTable[symIncIdx++]; }
        while( vst.slotSize[u] * vst.slotInc[u] < 20 && vst.slotInc[u] <= NUM_OF_SLOTS_PER_U[u] ) { vst.slotInc[u] *= 2; }

        vst.leftMarkupOffX += canvas_renderResourceGrid_markupRbWidth + ( vst.reInc[u] !== 12 ? canvas_renderResourceGrid_markupReWidth : 0 );
        vst.topMarkupOffY += ( vst.symInc[u] !== 14 ? canvas_renderResourceGrid_markupLineHeight : 0 ) + ( vst.slotInc[u] <= NUM_OF_SLOTS_PER_U[u] ? canvas_renderResourceGrid_markupLineHeight : 0 );
    }

    vst.leftMarkupBaseOffX = vst.leftMarkupOffX < 64 ? 64 - vst.leftMarkupOffX : 0;
    if( vst.leftMarkupOffX < 64 ) vst.leftMarkupOffX = 64;
    vst.subframeSize = vst.slotSize[vf.uArr[0]] * NUM_OF_SLOTS_PER_U[vf.uArr[0]];
    vst.frameSize = vst.subframeSize * 10;
    vst.subframeInc = vst.frameInc = 1.0;
    let subframeIncIdx = 0, frameIncIdx = 0;
    while( vst.subframeSize * vst.subframeInc < 20 && vst.subframeInc < 10 ) { vst.subframeInc = subframeIncTable[subframeIncIdx++]; }
    while( vst.frameSize * vst.frameInc < 20 ) { vst.frameInc *= frameIncTable[frameIncIdx++ % 3]; }
    if( vst.subframeInc !== 10 ) vst.topMarkupOffY += canvas_renderResourceGrid_markupLineHeight;
}

function canvas_resourceGrid_detailedRender( v, vst, vf ) {
    ctx2d.lineWidth = 3.0;

    const width = ctx2d_imageDataWidth;
    const height = canvas2D.height;

    const minX = 0, maxX = width, minY = 0, maxY = height;

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;
    const maxFinalSubframe = firstFinalSubframe + Math.ceil( v.usedWidth / vst.subframeSize ) + 1;

    const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
    const reOffset = vst.topMarkupOffY + transY;

    for(const {subframe, u, antId, symbol, resource, resolution} of canvas_renderResourceGrid_getResourcesInView(v, vst, vf)) {
        if( !vf.visibleChannels[resource.ch[0]] ) continue;

        // Calculate on-screen position and dimensions
        const baseSym = (subframe - firstFinalSubframe) * NUM_OF_SYM_IN_SF_PER_U[u];

        const w = Math.floor(Math.max((vst.singleSymSize[u] - 1) / resource.innerOffsetX, 1));
        const h = Math.floor(Math.max((vst.reSize[u] - 1) / resource.innerOffsetY, 1));
        const x = Math.floor((symbol + baseSym) * vst.symSize[u] + symbolOffset + (resource.innerCount % resource.innerOffsetX) * w);
        const y = Math.floor(resource.re * vst.reSize[u] + reOffset + Math.floor(resource.innerCount / resource.innerOffsetX) * h);

        // Skip rectangles completely outside the canvas
        if (x + w <= minX || x >= maxX || y + h <= minY || y >= maxY) continue;

        const amp = Math.sqrt( resource.i[0] * resource.i[0] + resource.q[0] * resource.q[0] );
        if(config.iqTab.hidePacketsWithNoAmplitude && amp < vf.minAmplitude) continue;

        const color = canvas_renderResourceGrid_colorFunc( resource.ch[0], resource.i[0], resource.q[0], amp );
        const r = color & 0xFF;
        const g = ( color >> 8 ) & 0xFF;
        const b = ( color >> 16 ) & 0xFF;
        ctx2d.fillStyle = `rgba(${ r },${ g },${ b },${ Math.max( 1.0 - 0.5 * ( vst.sizeDefaultX - 40 ) / 40, 0.4 ) })`;
        ctx2d.strokeStyle = `rgba(${ r },${ g },${ b },1.0)`;
        ctx2d.fillRect( x + 3, y + 3, w - 7, h - 7 );
        ctx2d.strokeRect( x + 1.5, y + 1.5, w - 4, h - 4 );
    }

    let fontSize = 7;
    if( vst.sizeDefaultX < 95 ) fontSize = 7;
    else if( vst.sizeDefaultX < 110 ) fontSize = 8;
    else if( vst.sizeDefaultX < 135 ) fontSize = 9;
    else if( vst.sizeDefaultX < 160 ) fontSize = 10;
    else if( vst.sizeDefaultX < 190 ) fontSize = 11;
    else fontSize = 12;
    ctx2d.lineWidth = 1.0;
    ctx2d.textAlign = 'left';
    ctx2d.textBaseline = 'top';
    ctx2d.font = `${ fontSize }px Verdana`;
    const textOffY = [ 5, 5 + fontSize, 5 + 2 * fontSize, 5 + 3 * fontSize, 5 + 4 * fontSize, 5 + 5 * fontSize, 5 + 6 * fontSize ];

    ctx2d.strokeStyle = `rgba(255,255,255,${ Math.min( Math.min( 0.5 * ( vst.sizeDefaultX - 40 ) / 25, 1.0 ), 0.4 ) })`;
    ctx2d.fillStyle = `rgba(255,255,255,${ Math.min( 0.5 * ( vst.sizeDefaultX - 40 ) / 25, 1.0 ) })`;
    const scale = iq_maxAmplitude > 0.001 ? iq_maxAmplitude : 1;

    for(const {subframe, u, antId, symbol, resource, resolution} of canvas_renderResourceGrid_getResourcesInView(v, vst, vf)) {
        if( !vf.visibleChannels[resource.ch[0]] ) continue;

        // Calculate on-screen position and dimensions
        const baseSym = (subframe - firstFinalSubframe) * NUM_OF_SYM_IN_SF_PER_U[u];

        const w = Math.floor(Math.max((vst.singleSymSize[u] - 1) / resource.innerOffsetX, 1));
        const h = Math.floor(Math.max((vst.reSize[u] - 1) / resource.innerOffsetY, 1));
        const x = Math.floor((symbol + baseSym) * vst.symSize[u] + symbolOffset + (resource.innerCount % resource.innerOffsetX) * w);
        const y = Math.floor(resource.re * vst.reSize[u] + reOffset + Math.floor(resource.innerCount / resource.innerOffsetX) * h);

        // Skip rectangles completely outside the canvas
        if (x + w <= minX || x >= maxX || y + h <= minY || y >= maxY) continue;

        const i = resource.i[0];
        const q = resource.q[0];
        const amp = Math.sqrt( i * i + q * q );
        if(config.iqTab.hidePacketsWithNoAmplitude && amp < vf.minAmplitude) continue;

        const ch = resource.ch[0];
        const antID = antId & 0xFFFF;

        const angle = iqToAngle( i, q ) | 0;
        const minWH = Math.min( w, h );

        const gridX = x + 3;
        const gridY = y + 3;
        const gridWH = minWH - 7;
        const gridMidX = gridX + Math.floor( gridWH / 2 ) + 0.5 + Math.max((w-h)/2, 0);
        const gridMidY = gridY + Math.floor( gridWH / 2 ) + 0.5 + Math.max((h-w)/2, 0);
        // const gridIqX = gridX + Math.floor( ( i / 2.0 + 0.5 ) * gridWH ) + Math.max((w-h)/2, 0);
        // const gridIqY = gridY + gridWH - Math.floor( ( q / 2.0 + 0.5 ) * gridWH ) + Math.max((h-w)/2, 0);
        const gridIqX = gridMidX+i*minWH/(2*scale);
        const gridIqY = gridMidY-q*minWH/(2*scale);

        ctx2d.beginPath();
        ctx2d.moveTo( gridMidX, gridY + Math.max((h-w)/2, 0) );
        ctx2d.lineTo( gridMidX, gridY + gridWH + Math.max((h-w)/2, 0) );
        ctx2d.moveTo( gridX + Math.max((w-h)/2, 0), gridMidY );
        ctx2d.lineTo( gridX + Math.max((w-h)/2, 0) + gridWH, gridMidY );
        if( vst.sizeDefaultX > 150 && i !== Infinity ) {
            ctx2d.moveTo( gridMidX, gridMidY );
            ctx2d.lineTo( gridIqX, gridIqY );
        }
        ctx2d.stroke();

        if( i !== Infinity ) {
            ctx2d.beginPath();
            ctx2d.rect( gridIqX - 1.5, gridIqY - 1.5, 3, 3 );
            if( vst.sizeDefaultX > 150 && h > 50 ) {
                ctx2d.moveTo( gridMidX, gridY + Math.max((h-w)/2, 0) );
                ctx2d.lineTo( gridMidX + 3, gridY + 6 + Math.max((h-w)/2, 0) );
                ctx2d.lineTo( gridMidX - 3, gridY + 6 + Math.max((h-w)/2, 0) );
                ctx2d.closePath();

                ctx2d.moveTo( gridX + gridWH + Math.max((w-h)/2, 0), gridMidY );
                ctx2d.lineTo( gridX + gridWH - 6 + Math.max((w-h)/2, 0), gridMidY + 3 );
                ctx2d.lineTo( gridX + gridWH - 6 + Math.max((w-h)/2, 0), gridMidY - 3 );
                ctx2d.closePath();

                const angleRad1 = degToRad( angle + 200 );
                const angleRad2 = degToRad( angle + 160 );
                ctx2d.moveTo( gridIqX, gridIqY );
                ctx2d.lineTo( gridIqX + 10 * Math.cos( angleRad1 ), gridIqY - 10 * Math.sin( angleRad1 ) );
                ctx2d.lineTo( gridIqX + 10 * Math.cos( angleRad2 ), gridIqY - 10 * Math.sin( angleRad2 ) );
                ctx2d.closePath();
            }
            ctx2d.fill();
        }

        if( w > 70 && h > 20 ) {
            ctx2d.fillText( channels[ch].name, x + 8, y + textOffY[0] );
            if( h > 105 ) {
                if( i === Infinity ) {
                    ctx2d.fillText( `i:  Unknown`, x + 8, y + textOffY[1] );
                    ctx2d.fillText( `q: Unknown`, x + 8, y + textOffY[2] );
                } else {
                    ctx2d.fillText( `i:   ${ i > 0 ? ' ' : '' }${ i.toFixed( 4 ) }`, x + 8, y + textOffY[1] );
                    ctx2d.fillText( `q:  ${ q > 0 ? ' ' : '' }${ q.toFixed( 4 ) }i`, x + 8, y + textOffY[2] );
                    if( h > 140 ) {
                        ctx2d.fillText( `abs: ${ amp.toFixed( 4 ) }`, x + 8, y + textOffY[3] );
                        ctx2d.fillText( `ang: ${ angle }deg`, x + 8, y + textOffY[4] );
                        if( h > 160 ) {
                            ctx2d.fillText( `RTCID: ${ antID }`, x + 8, y + textOffY[5] );
                            ctx2d.fillText( `U: ${ u }`, x + 8, y + textOffY[6] );
                        }
                    }
                }
            }
        }
    }

    ctx2d.font = '14px serif';
    if(config.iqTab.drawFCP)
        canvas_resourceGrid_detailed_fcpRender(v, vst, vf );
}

function canvas_resourceGrid_simpleRender(v, vst, vf) {
    ctx2d_imageDataPixels.fill(0xFF000000);
    const width = ctx2d_imageDataWidth;
    const height = canvas2D.height;

    const viewportResollution = canvas_renderResourceGrid_getViewResolution(vst);
    const verticalReSpacing = viewportResollution === 1 ? 1 : 0;

    const minX = 0, maxX = width, minY = 0, maxY = height;

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;

    const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
    const reOffset = vst.topMarkupOffY + transY;

    for(const {subframe, u, antId, symbol, resource, resolution} of canvas_renderResourceGrid_getResourcesInView(v, vst, vf)){
        // Calculate on-screen position and dimensions
        const baseSym = ( subframe - firstFinalSubframe ) * NUM_OF_SYM_IN_SF_PER_U[u];

        const w = Math.floor( Math.max((vst.singleSymSize[u] - 1) / resource.innerOffsetX, 1) );
        const h = Math.floor( Math.max((vst.reSize[u] * resolution - verticalReSpacing) / resource.innerOffsetY, 1) );
        const baseX = Math.round((symbol+baseSym) * vst.symSize[u] + symbolOffset + (resource.innerCount%resource.innerOffsetX) * w);
        const baseY = Math.round(resource.re * vst.reSize[u] + reOffset + Math.floor(resource.innerCount/resource.innerOffsetX) * h);

        // Skip rectangles completely outside the canvas
        if (baseX + w <= minX || baseX >= maxX || baseY + h <= minY || baseY >= maxY) continue;

        // Clamp rectangle to canvas bounds
        const clampedX = Math.max(baseX, minX);
        const clampedY = Math.max(baseY, minY);
        const clampedW = Math.min(baseX + w, maxX) - clampedX;
        const clampedH = Math.min(baseY + h, maxY) - clampedY;

        const colors = calculateAverageColor(resource, vf.visibleChannels, vf.minAmplitude);

        const channelPixelHeight = Math.max(Math.ceil(h/colors.length), 1);
        for (let colorIdx = 0; colorIdx < colors.length; colorIdx++) {
            const color = colors[colorIdx];
            if(color === 0xFF000000) continue; // Skip invisible resources

            const rowStart = Math.floor(colorIdx * h / colors.length);
            const rowEnd = Math.min(rowStart + channelPixelHeight, clampedH);

            for (let row = rowStart; row < rowEnd; row++) {
                let i = (clampedY + row) * width + clampedX;
                for (let col = 0; col < clampedW; col++) {
                    ctx2d_imageDataPixels[i++] = color;
                }
            }
        }
    }

    if(config.iqTab.drawFCP)
        canvas_resourceGrid_simple_fcpRender(v, vst, vf );
    ctx2d.putImageData( ctx2d_imageData, v.x, v.y, vst.leftMarkupOffX + 1, vst.topMarkupOffY + 1, v.width - vst.leftMarkupOffX - 1, v.height - vst.topMarkupOffY - 1 );
}

function calculateSingleColor(resource, visibleChannels, minAmplitude) {
    if( visibleChannels[resource.ch] === false ) return 0xFF000000;
    const amp = Math.sqrt( resource.i * resource.i + resource.q * resource.q );
    if(config.iqTab.hidePacketsWithNoAmplitude && (amp < minAmplitude)) return 0xFF000000;

    return [canvas_renderResourceGrid_colorFunc(resource.ch, resource.i, resource.q, amp)];
}

function calculateAverageColor(resource, visibleChannels, minAmplitude) {
    const colors = []
    for(let id = 0 ;id < resource.ch.length; ++id){
        const ch = resource.ch[id];
        if( visibleChannels[ch] === false ){
            colors.push(0xFF000000);
            continue;
        }

        const i = resource.i[id];
        const q = resource.q[id];
        const amp = Math.sqrt( i * i + q * q );

        if(config.iqTab.hidePacketsWithNoAmplitude && (amp < minAmplitude)) colors.push(0xFF000000);
        else colors.push(canvas_renderResourceGrid_colorFunc(ch, i, q, amp));
    }
    return colors;
}

function canvas_resourceGrid_simple_fcpRender( v, vst, vf ) {

    const width = ctx2d_imageDataWidth;
    const height = canvas2D.height;
    const minX = 0, maxX = width, minY = 0, maxY = height;

    let lineWidth = 3;
    if(vst.sizeDefaultX <= 8) lineWidth = 2;
    if(vst.sizeDefaultX <= 3) lineWidth = 1;
    if(vst.sizeDefaultX <= 2) lineWidth = 1;

    let color = 0xEEFFFFFF;

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;

    const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
    const reOffset = vst.topMarkupOffY + transY;

    for(const {subframe, u, antId, fcp} of canvas_renderResourceGrid_getFcpInView(v, vst, vf)){
        // Calculate on-screen position and dimensions
        const baseSym = ( subframe - firstFinalSubframe ) * NUM_OF_SYM_IN_SF_PER_U[u];

        const w = Math.floor( Math.max(vst.singleSymSize[u] * fcp.numSymbols - 1, 1) );
        const h = Math.floor( Math.max(vst.reSize[u] * fcp.numRb * 12 - 1, 1) );
        const baseX = Math.floor((fcp.symbol+baseSym) * vst.symSize[u] + symbolOffset);
        const baseY = Math.floor(fcp.rb * 12 * vst.reSize[u] + reOffset);

        // Skip rectangles completely outside the canvas
        if (baseX + w <= minX || baseX >= maxX || baseY + h <= minY || baseY >= maxY) continue;

        // Clamp rectangle to canvas bounds
        const clampedX = Math.max(baseX, minX);
        const clampedY = Math.max(baseY, minY);
        const clampedW = Math.min(baseX + w, maxX) - clampedX;
        const clampedH = Math.min(baseY + h, maxY) - clampedY;

        let iStart = clampedY * width + clampedX;
        for(let i = 0; i <= clampedW; i++){
            for(let j = 0; j < lineWidth; j++){
                ctx2d_imageDataPixels[iStart + i + j*width] = color;
                ctx2d_imageDataPixels[iStart + i + (clampedH-j)*width] = color;
            }
        }

        for(let i = 0; i <= clampedH; i++){
            for(let j = 0; j < lineWidth; j++){
                ctx2d_imageDataPixels[iStart + i*width + j] = color;
                ctx2d_imageDataPixels[iStart + i*width + clampedW-j] = color;
            }
        }
    }
}

function canvas_resourceGrid_detailed_fcpRender( v, vst, vf ) {
    ctx2d.lineWidth = 8;
    ctx2d.strokeStyle = "#CCCCCCCC";
    ctx2d.fontWeight = "bold";
    ctx2d.font = `20px Verdana`;

    const width = ctx2d_imageDataWidth;
    const height = canvas2D.height;
    const minX = 0, maxX = width, minY = 0, maxY = height;

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;

    const symbolOffset = vst.leftMarkupOffX + transX + Math.floor( firstSubframe * vst.subframeSize );
    const reOffset = vst.topMarkupOffY + transY;

    let textShift = {};

    for(const {subframe, u, antId, fcp} of canvas_renderResourceGrid_getFcpInView(v, vst, vf)){
        // Calculate on-screen position and dimensions
        const baseSym = ( subframe - firstFinalSubframe ) * NUM_OF_SYM_IN_SF_PER_U[u];

        const w = Math.floor( Math.max(vst.singleSymSize[u] * fcp.numSymbols - 1, 1) );
        const h = Math.floor( Math.max(vst.reSize[u] * fcp.numRb * 12 - 1, 1) );
        const baseX = Math.floor((fcp.symbol+baseSym) * vst.symSize[u] + symbolOffset);
        const baseY = Math.floor(fcp.rb * 12 * vst.reSize[u] + reOffset);

        // Skip rectangles completely outside the canvas
        if (baseX + w <= minX || baseX >= maxX || baseY + h <= minY || baseY >= maxY) continue;

        // Clamp rectangle to canvas bounds
        const clampedX = Math.max(baseX, minX);
        const clampedY = Math.max(baseY, minY);

        const coordinate = fcp.symbol+":"+fcp.rb;
        textShift[coordinate] = textShift[coordinate] ? textShift[coordinate]+25 : 25;

        ctx2d.strokeRect( baseX, baseY, w, h );

        const text = "FCP: "+fcp.packetId+" sect: "+fcp.sectionId;
        ctx2d.fillText( text, clampedX + 10, clampedY+textShift[coordinate]-15);
    }
}

function canvas_renderResourceGrid_renderSelection(v,transX,transY){
    if(!canvas_isMouseDown) return;

    ctx2d.strokeStyle = 'red';
    ctx2d.setLineDash([4]);
    ctx2d.strokeRect(
        canvas_mouseDownCordX,
        canvas_mouseDownCordY,
        canvas_lastMouseCordDiffX,
        canvas_lastMouseCordDiffY
    );
    ctx2d.setLineDash([]);
}

function canvas_renderResourceGrid_renderGrid( v, vf, vst, transX, transY ) { //rysowanie
    canvas_renderResourceGrid_whiteLinesIdx = 0;
    canvas_renderResourceGrid_grayLinesIdx = 0;

    canvas_renderResourceGrid_addWhiteLine( vst.leftMarkupOffX + 0.5, 0, vst.leftMarkupOffX + 0.5, vst.topMarkupOffY );
    canvas_renderResourceGrid_addWhiteLine( 0, vst.topMarkupOffY + 0.5, vst.leftMarkupOffX, vst.topMarkupOffY + 0.5 );

    ctx2d.fillStyle = '#FFFFFF';
    ctx2d.lineWidth = 1.0;
    ctx2d.textAlign = 'right';
    ctx2d.textBaseline = 'middle';

    let startX = 0;
    let leftMarkupBaseOffX = vst.leftMarkupBaseOffX;
    const baseOffY = vst.topMarkupOffY + transY + 1;
    const textMinY = vst.topMarkupOffY + 16;
    const textMaxY = v.height - 16;
    for( let i = 0; i < vf.uArr.length; ++i ) {
        const u = vf.uArr[vf.uArr.length - 1 - i];

        // RB markup drawing
        const endX = startX + vst.leftMarkupBaseOffX + canvas_renderResourceGrid_markupRbWidth + ( vst.reInc[u] !== 12 ? canvas_renderResourceGrid_markupReWidth : 0 );
        const textX = startX + vst.leftMarkupBaseOffX + canvas_renderResourceGrid_markupRbWidth - 4;
        canvas_renderResourceGrid_addWhiteLine( endX + 0.5, vst.topMarkupOffY, endX + 0.5, v.height );
        for( let rb = vst.firstRb[u] - vst.firstRb[u] % vst.rbInc[u]; rb < vst.lastRb[u]; rb += vst.rbInc[u] ) {
            const startRbOffY = baseOffY + vst.rbOff[u][rb];
            const endRbOffY = baseOffY + vst.rbOff[u][rb + vst.rbInc[u]];
            if( startRbOffY < textMaxY && endRbOffY > textMinY ) ctx2d.fillText( rb.toString(), textX, ( Math.max( startRbOffY, vst.topMarkupOffY ) + Math.min( endRbOffY, v.height ) + 4 ) / 2.0 );
            if( endRbOffY >= v.height ) break;
            canvas_renderResourceGrid_addWhiteLine( startX, endRbOffY + 0.5, endX, endRbOffY + 0.5 );
        }
        startX += canvas_renderResourceGrid_markupRbWidth + vst.leftMarkupBaseOffX;
        leftMarkupBaseOffX = 0;

        // RE markup drawing
        if( vst.reInc[u] !== 12 ) {
            const firstRe = Math.floor( -transY / vst.reSize[u] );
            const lastRe = Math.floor( -transY / vst.reSize[u] + v.usedHeight / vst.reSize[u] ) + 1;
            const endX = startX + canvas_renderResourceGrid_markupReWidth;
            canvas_renderResourceGrid_addGrayLine( startX + 0.5, vst.topMarkupOffY, startX + 0.5, v.height );
            for( let re = firstRe - firstRe % vst.reInc[u]; re < lastRe; re += vst.reInc[u] ) {
                const startReOffY = baseOffY + vst.reOff[u][re];
                const endReOffY = baseOffY + vst.reOff[u][re + vst.reInc[u]]; Math.max( startReOffY, vst.topMarkupOffY )
                if( startReOffY < textMaxY && endReOffY > textMinY ) ctx2d.fillText( ( re % 12 ).toString(), endX - 4, ( Math.max( startReOffY, vst.topMarkupOffY ) + Math.min( endReOffY, v.height ) + 4 ) / 2.0 );
                if( endReOffY >= v.height ) break;
                canvas_renderResourceGrid_addGrayLine( startX, endReOffY + 0.5, endX, endReOffY + 0.5 );
            }
            startX += canvas_renderResourceGrid_markupReWidth;
        }
    }

    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'bottom';

    const firstFrame = vst.currentFrame;
    
    const firstSubframe = Math.floor( -transX / vst.subframeSize );

    let startY = 0;

    // Frame markup drawing
    let frame = firstFrame - firstFrame % vst.frameInc;
    let frameOffX = vst.leftMarkupOffX + transX + 1;
    const aggFrameSize = vst.frameSize * vst.frameInc;
    const endY = startY + canvas_renderResourceGrid_markupLineHeight;
    ctx2d.fillText( 'Frame', vst.leftMarkupOffX / 2, endY + 0.5 );
    canvas_renderResourceGrid_addWhiteLine( 0, endY + 0.5, v.width, endY + 0.5 );
    while( frameOffX < v.width ) {
        const textStartX = frameOffX < vst.leftMarkupOffX ? vst.leftMarkupOffX : frameOffX;
        frameOffX += aggFrameSize;
        const textEndX = frameOffX > v.width ? v.width : frameOffX;
        if( ( textEndX - textStartX ) > 20 ) ctx2d.fillText( frame.toString(), ( textStartX + textEndX ) / 2.0, endY );
        if( frameOffX > v.width ) break;
        frame += vst.frameInc;
        const x = Math.floor( frameOffX ) + 0.5;
        canvas_renderResourceGrid_addWhiteLine( x, startY, x, endY );
    }
    startY += canvas_renderResourceGrid_markupLineHeight;

    // Subframe markup drawing
    if( vst.subframeInc !== 10 ) {
        let subframe = firstSubframe - firstSubframe % vst.subframeInc;
        let subframeOffX = vst.leftMarkupOffX + subframe * vst.subframeSize + transX + 1;
        subframe %= 10;
        const aggSubframeSizePx = vst.subframeSize * vst.subframeInc;
        const endY = startY + canvas_renderResourceGrid_markupLineHeight;
        ctx2d.fillText( 'Subframe', vst.leftMarkupOffX / 2, endY + 0.5 );
        canvas_renderResourceGrid_addWhiteLine( 0, endY + 0.5, v.width, endY + 0.5 );
        while( subframeOffX < v.width ) {
            const textStartX = subframeOffX < vst.leftMarkupOffX ? vst.leftMarkupOffX : subframeOffX;
            subframeOffX += aggSubframeSizePx;
            const textEndX = subframeOffX > v.width ? v.width : subframeOffX;
            if( ( textEndX - textStartX ) > 20 ) ctx2d.fillText( subframe.toString(), ( textStartX + textEndX ) / 2.0, endY );
            if( subframeOffX > v.width ) break;
            subframe += vst.subframeInc;
            subframe %= 10;
            const x = Math.floor( subframeOffX ) + 0.5;
            canvas_renderResourceGrid_addWhiteLine( x, startY, x, endY );
        }
        startY += canvas_renderResourceGrid_markupLineHeight;

        for( let i = 0; i < vf.uArr.length; ++i ) {
            const u = vf.uArr[i];
            if( vst.slotInc[u] > NUM_OF_SLOTS_PER_U[u] ) continue;
            let sym = Math.floor( -transX / vst.symSize[u] ) % 14;
            let slot = Math.floor( -transX / vst.slotSize[u] );

            sym -= sym % vst.symInc[u];
            let symOffX = vst.leftMarkupOffX + sym * vst.symSize[u] + slot * vst.slotSize[u] + transX + 1;
            slot -= slot % vst.slotInc[u];
            let slotOffX = vst.leftMarkupOffX + slot * vst.slotSize[u] + transX + 1;
            slot %= NUM_OF_SLOTS_PER_U[u];

            // Slot markup drawing
            const aggSlotSize = vst.slotSize[u] * vst.slotInc[u];
            const endY = startY + canvas_renderResourceGrid_markupLineHeight + ( vst.symInc[u] !== 14 ? canvas_renderResourceGrid_markupLineHeight : 0 );
            const textY = startY + canvas_renderResourceGrid_markupLineHeight;
            canvas_renderResourceGrid_addWhiteLine( vst.leftMarkupOffX, endY + 0.5, v.width, endY + 0.5 );
            while( slotOffX < v.width ) {
                const textStartX = slotOffX < vst.leftMarkupOffX ? vst.leftMarkupOffX : slotOffX;
                slotOffX += aggSlotSize;
                const textEndX = slotOffX > v.width ? v.width : slotOffX;
                if( ( textEndX - textStartX ) > 20 ) ctx2d.fillText( slot.toString(), ( textStartX + textEndX ) / 2.0, textY );
                if( slotOffX > v.width ) break;
                slot += vst.slotInc[u];
                slot %= NUM_OF_SLOTS_PER_U[u];
                const x = Math.floor( slotOffX ) + 0.5;
                canvas_renderResourceGrid_addWhiteLine( x, startY, x, endY );
            }
            startY += canvas_renderResourceGrid_markupLineHeight;

            // Symbol markup drawing
            if( vst.symInc[u] !== 14 ) {
                const aggSymSize = vst.symSize[u] * vst.symInc[u];
                const endY = startY + canvas_renderResourceGrid_markupLineHeight;
                canvas_renderResourceGrid_addGrayLine( vst.leftMarkupOffX + 1, startY + 0.5, v.width, startY + 0.5 );
                while( symOffX < v.width ) {
                    const textStartX = symOffX < vst.leftMarkupOffX ? vst.leftMarkupOffX : symOffX;
                    symOffX += aggSymSize;
                    const textEndX = symOffX > v.width ? v.width : symOffX;
                    if( ( textEndX - textStartX ) > 20 ) ctx2d.fillText( sym.toString(), ( textStartX + textEndX ) / 2.0, endY );
                    if( symOffX > v.width ) break;
                    sym += vst.symInc[u];
                    sym %= 14;
                    const x = Math.floor( symOffX ) + 0.5;
                    canvas_renderResourceGrid_addGrayLine( x, startY, x, endY );
                }
                startY += canvas_renderResourceGrid_markupLineHeight;
            }
        }
    }

    ctx2d.strokeStyle = '#808080';
    ctx2d.beginPath();
    for( let i = 0; i < canvas_renderResourceGrid_grayLinesIdx; ) {
        ctx2d.moveTo( canvas_renderResourceGrid_grayLinesList[i++], canvas_renderResourceGrid_grayLinesList[i++] );
        ctx2d.lineTo( canvas_renderResourceGrid_grayLinesList[i++], canvas_renderResourceGrid_grayLinesList[i++] );
    }
    ctx2d.stroke();

    ctx2d.strokeStyle = '#FFFFFF';
    ctx2d.beginPath();
    for( let i = 0; i < canvas_renderResourceGrid_whiteLinesIdx; ) {
        ctx2d.moveTo( canvas_renderResourceGrid_whiteLinesList[i++], canvas_renderResourceGrid_whiteLinesList[i++] );
        ctx2d.lineTo( canvas_renderResourceGrid_whiteLinesList[i++], canvas_renderResourceGrid_whiteLinesList[i++] );
    }
    ctx2d.stroke();
}

function canvas_renderResourceGrid( v, vf, vst ) {
    const sizeDefault = 50 * vst.scaleX[v.mode];

    if( ( config.iqTab.unitedScaleAndMove && canvas_updateUnitedScale ) ||
        ( !config.iqTab.unitedScaleAndMove && ( v.isModeChanged || vf.isFiltersUpdated ) ) ) {
        canvas_updateUnitedScale = false;
        canvas_renderResourceGrid_filtersUpdated( v, vf, vst );
        vst.isScaleUpdated = true;
    }

    if( v.isModeChanged || vst.isScaleUpdated ) canvas_renderResourceGrid_scaleUpdated( v, vf, vst );

    if( v.isResized || v.isModeChanged || vst.isScaleUpdated ) {
        v.mouseShiftX = vst.leftMarkupOffX + 1;
        v.mouseShiftY = vst.topMarkupOffY + 1;
        v.usedWidth = v.width - vst.mouseShiftX;
        v.usedHeight = v.height - vst.mouseShiftY;
    }

    const scaledFrameSize = vst.frameSize / vst.scaleX[v.mode];
    while( vst.transX[v.mode] > 0 ) {
        if( vst.currentFrame <= vf.firstFrame ) {
            vst.transX[v.mode] = 0;
        } else {
            vst.transX[v.mode] -= scaledFrameSize;
            canvas_oldTransX -= scaledFrameSize;
            --vst.currentFrame;
        }
    }
    while( vst.transX[v.mode] < -scaledFrameSize ) {
        vst.transX[v.mode] += scaledFrameSize;
        canvas_oldTransX += scaledFrameSize;
        ++vst.currentFrame;
    }

    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
    if( vst.transY[v.mode] > 0 ) vst.transY[v.mode] = 0;
    const transYMin = Math.min( ( v.height - vst.topMarkupOffY - vst.rbSize[vf.uArr[0]] * 273 ) / vst.scaleY[v.mode], 0 );
    if( vst.transY[v.mode] < transYMin ) vst.transY[v.mode] = transYMin;
    const transY = Math.round( vst.transY[v.mode] * vst.scaleY[v.mode] );

    for( let i = 0; i < vf.uArr.length; ++i ) {
        const u = vf.uArr[i];
        vst.firstRb[u] = Math.floor( -transY / vst.rbSize[u] );
        vst.lastRb[u] = Math.floor( -transY / vst.rbSize[u] + v.usedHeight / vst.rbSize[u] ) + 1;
    }

    const prbArea = vst.sizeDefaultX * vst.sizeDefaultY;
    const prbResolution = canvas_renderResourceGrid_getViewResolution(vst);

    switch( v.submode ) {
        case 0: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_white; break;
        case 1: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_amplitude; break;
        case 2: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_angle; break;
        case 3: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_channel; break;
        case 4: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_channelAmplitude; break;
        case 5: canvas_renderResourceGrid_colorFunc = canvas_renderResourceGrid_colorFunc_channel; break;
    }

    canvas_resourceGrid_gatherResources(v, vst, vf, transX, prbResolution);

    ctx2d.save();
    ctx2d.beginPath();
    ctx2d.rect( vst.leftMarkupOffX, vst.topMarkupOffY, v.width - vst.leftMarkupOffX, v.height - vst.topMarkupOffY );
    ctx2d.clip();

    if( prbArea >= 1350) {
        canvas_resourceGrid_detailedRender( v, vst, vf );
    } else {
        canvas_resourceGrid_simpleRender( v, vst, vf );
    }

    ctx2d.restore();

    canvas_renderResourceGrid_renderGrid( v, vf, vst, transX, transY );

    if(isSelectModeOn) canvas_renderResourceGrid_renderSelection(v,vf,vst,transX,transY);

    canvas_renderResourceGrid_trimCache();
}

function canvas_renderResourceGrid_getViewResolution(v){
    const prbArea = v.sizeDefaultX * v.sizeDefaultY;
    return  prbArea > 100 ? 1 :
            prbArea > 10 ? 2 :
            12;
}

function getActiveAntIdsFromViewports(vf) {
    const activeAntIds = new Set();
    for (let u = 0; u < NUM_OF_U; ++u) {
        if (vf.selectedU[u] && iqBuffers[u]) {
            for (const [antId, isActive] of Object.entries(vf.selectedAnt[u])) {
                if (isActive) {
                    activeAntIds.add(`${u}:${antId}`);
                }
            }
        }
    }

    return Array.from(activeAntIds).map(entry => {
        const colonIdx = entry.indexOf(':');
        const u = entry.slice(0, colonIdx);
        const antId = entry.slice(colonIdx + 1);
        return { u: Number(u), antId };
    });
}

function resourceGrid_updateChannelInfo(){
    for(const {subframe, u, antId, symbol, resource} of canvas_renderResourceGrid_getResourcesAll()) {
        const iqType = new Uint8Array(
            iqTypeBuffers[u][antId].buffer,
            iqOffsets[u][antId][subframe][symbol] / 2
        );
        const prb = Math.floor(resource.re / 12);
        const reInPrb = resource.re % 12;

        const idx = (prb - iqStartPrb[u][antId][subframe][symbol])* 12 + reInPrb;
        // Update channel from buffer
        resource.ch = [iqType[idx]];
    }
}