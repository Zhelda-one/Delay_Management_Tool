const canvasWebGL = getElementById( 'canvasWebGL' );
const canvas2D = getElementById( 'canvas2D' );

const canvas_maxNumOfViewports = 4;
const canvas_numOfViewportModes = 10;

const RENDER_MODE = Object.freeze({
    CONST_IQ: 0,
    REGRID: 1,
    CONST_TIME_IQ: 2,
    CONST_FFT: 3,
    CONST_TIME: 4
});
const CONST_IQ_SUBMODE = Object.freeze({
    CHANNEL: 0,
    ANGLE: 1,
    HEAT: 3
});
const REGRID_SUBMODE = Object.freeze({
    WHITE: 0,
    AMPLITUDE: 1,
    ANGLE: 2,
    CHANNEL: 3,
    CHANNEL_AMP: 4,
    CHANNEL_PRB: 5
});
const CONST_TIME_IQ_SUBMODE = Object.freeze({
    WHITE: 0,
    ANGLE: 1
});
const CONST_FFT = Object.freeze({
    DEFAULT: 0
});
const RENDER_DEFAULT = RENDER_MODE.CONST_IQ;

let canvas_renderTimeoutId = null;
let canvas_width, canvas_height;
let canvas_isMouseDown = false;
let canvas_mouseDownCordX = 0, canvas_mouseDownCordY = 0;
let canvas_mouseDownViewportIdx = -1;
let canvas_lastMouseCordDiffX = 0, canvas_lastMouseCordDiffY = 0;
let canvas_lastMouseCordX = 0,canvas_lastMouseCordY = 0;
let canvas_oldTransX = 0, canvas_oldTransY = 0;
let canvas_renderPerfNow;
let canvas_updateUnitedScale = false;
let canvas_isFullRender = false;
let canvas_numOfActiveViewports = 4;
let canvas_viewports = [ {
    idx: 0,
    x: 0,
    y: 0,
    y2d: 0,
    width: 1,
    height: 1,
    usedWidth: 1,
    usedHeight: 1,
    pixelWidth: 0,
    pixelHeight: 0,
    aspectRatio: 0,
    mouseShiftX: 0,
    mouseShiftY: 0,
    mode: RENDER_DEFAULT,
    submode: 0,
    isRender: false,
    isResized: true,
    isModeChanged: true,
    // filters
    isFiltersUpdated: true,
    selectedU: new Array( NUM_OF_U ).fill( false ),
    selectedAnt: new Array( NUM_OF_U ).fill( null ),
    visibleChannels: new Array( channels.length ).fill( true ),
    filteredPackets: new Set(),
    // scale & trans
    zoomXonly: false,
    zoomYonly: false,
    isScaleUpdated: true,
    scaleX: new Array( canvas_numOfViewportModes ).fill( 1.0 ),
    scaleY: new Array( canvas_numOfViewportModes ).fill( 1.0 ),
    transX: new Array( canvas_numOfViewportModes ).fill( 0.0 ),
    transY: new Array( canvas_numOfViewportModes ).fill( 0.0 ),

    // constellation
    iqTypesTexture: null,

    // resourceGrid
    uArr: [],
    scalePerUX: new Array( NUM_OF_U ).fill( 0.0 ),
    scalePerUY: new Array( NUM_OF_U ).fill( 0.0 ),
    numOfAntPerU: 0,
    firstFrame: 0,
    firstSubframe: 0,
    lastFrame: 0,
    lastSubframe: 0,

    sizeDefaultX: 0.0,
    sizeDefaultY: 0.0,
    leftMarkupBaseOffX: 0.0,
    leftMarkupOffX: 0.0,
    topMarkupOffY: 0.0,
    reSize: new Array( NUM_OF_U ).fill( 0.0 ),
    reOff: new Array( NUM_OF_U ),
    reInc: new Array( NUM_OF_U ).fill( 1.0 ),
    rbSize: new Array( NUM_OF_U ).fill( 0.0 ),
    rbOff: new Array( NUM_OF_U ),
    rbInc: new Array( NUM_OF_U ).fill( 1.0 ),
    singleSymSize: new Array( NUM_OF_U ).fill( 0.0 ),
    symSize: new Array( NUM_OF_U ).fill( 0.0 ),
    symInc: new Array( NUM_OF_U ).fill( 1.0 ),
    slotSize: new Array( NUM_OF_U ).fill( 0.0 ),
    slotInc: new Array( NUM_OF_U ).fill( 1.0 ),
    subframeSize: 0.0,
    subframeInc: 1.0,
    frameSize: 0.0,
    frameInc: 1.0,

    firstRb: new Array( NUM_OF_U ),
    lastRb: new Array( NUM_OF_U ),

    currentFrame: 0,

    ranges: {
        frame: [-1,-1],
        subframe: [-1,-1],
        slot: [-1,-1],
        symbol: [-1,-1],
        RB: [-1,-1],
    },

    minAmplitude: 0.0001,
} ];
for( let u = 0; u < NUM_OF_U; ++u ) {
    canvas_viewports[0].reOff[u] = new Uint32Array( 12 * 274 );
    canvas_viewports[0].rbOff[u] = new Uint32Array( 274 );
}
for( let i = 1; i < canvas_maxNumOfViewports; ++i ) {
    canvas_viewports.push( copyObject( canvas_viewports[0] ) );
    canvas_viewports[i].idx = i;
}

let ctx2d = null;
let ctx2d_imageData = null;
let ctx2d_imageDataWidth = 0;
let ctx2d_imageDataPixels = null;
let isSelectModeOn = false;

let gl = null;
let gl_sync = null;

const gl_iqBuffers = new Array( NUM_OF_U ).fill( null );
const gl_iqTypeBuffers = new Array( NUM_OF_U ).fill( null );
const gl_iqBuffersLength = new Array( NUM_OF_U ).fill( null );
let gl_iqBuffersMask = new Array(NUM_OF_U).fill(null);
let iqTab_drawAll = 1; // 1 <==> current viewport has no range filters applied

const gl_time_I_Buffers = new Array( NUM_OF_U ).fill( null );
const gl_time_Q_Buffers = new Array( NUM_OF_U ).fill( null );
const gl_timeBuffersLength =  new Array( NUM_OF_U ).fill( null );

const gl_fftBuffers = new Array( NUM_OF_U ).fill( null );
const gl_fftTypeBuffers = new Array( NUM_OF_U ).fill( null );
const gl_fftBuffersLength = new Array( NUM_OF_U ).fill( null );

/** @type {Shader[]} */
let gl_constProg = new Array( canvas_numOfViewportModes );

let gl_screenQuadVBO = null;
function gl_init(){
    ctx2d = canvas2D.getContext( '2d', { desynchronized: false } );
    ctx2d_imageDataWidth = canvas2D.width + 750;
    ctx2d_imageDataPixels = new Uint32Array( ctx2d_imageDataWidth * canvas2D.height );
    ctx2d_imageData = new ImageData( new Uint8ClampedArray( ctx2d_imageDataPixels.buffer ), ctx2d_imageDataWidth, canvas2D.height );

    gl = canvasWebGL.getContext( 'webgl2', { antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance', premultipliedAlpha: false } );
    if( !gl ) {
        logError( 'WebGL', 'Unable to initialize WebGL2' );
        return;
    }

    // gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true );
    gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl_constProg[0] = new Shader( 'constWhite', constWhite_vs, constWhite_fs );
    gl_constProg[1] = new Shader( "constAngle", constAngle_vs, constAngle_fs ) ;
    gl_constProg[2] = new Shader( "constChannel", constChannel_vs, constChannel_fs );
    gl_constProg[3] = new Shader( "constHeat", constHeat_vs, constHeat_fs );
    gl_constProg[4] = new Shader( "constTime", constTime_vs, constTime_fs );
    gl_constProg[5] = new Shader( "constTimeIm", constTimeIm_vs, constTime_fs );
    gl_constProg[6] = new Shader( "constTimeRe", constTimeRe_vs, constTime_fs );
    gl_constProg[7] = new Shader( "constTimeAng", constTimeAng_vs, constTime_fs );
    gl_constProg[8] = new Shader( "constTimeConstelation", constTimeConstelation_vs, constTime_fs );
    gl_constProg[9] = new Shader( "constTimeConstelationAng", constTimeConstelation_vs, constTimeAng_fs );

    for( let i = 0; i < canvas_maxNumOfViewports; ++i ) {
        canvas_viewports[i].iqTypesTexture = gl.createTexture();
    }
    gl.activeTexture( gl.TEXTURE0 );

    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);
}

function gl_createFramebufferFloat() {
    const buffer = gl.createFramebuffer();
    //bind framebuffer to texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    const texture = gl.createTexture();
    //set properties for the texture
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, canvasWebGL.width, canvasWebGL.height, 0, gl.RED, gl.FLOAT, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return {
        texture: texture,
        buffer: buffer
    };
}

function gl_drawFullScreenQuad() {
    // Only created once
    if (gl_screenQuadVBO == null) {
        const verts = [
            // First triangle:
            1.0,  1.0,
            -1.0,  1.0,
            -1.0, -1.0,
            // Second triangle:
            -1.0, -1.0,
            1.0, -1.0,
            1.0,  1.0
        ];
        gl_screenQuadVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl_screenQuadVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl_screenQuadVBO);
    gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}