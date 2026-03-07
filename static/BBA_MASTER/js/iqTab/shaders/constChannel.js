const constChannel_vs = `#version 300 es
layout( location = 0 ) in vec2 inPos;
layout( location = 1 ) in uint inType;
layout( location = 2) in float drawOrNot;
uniform float uPointSize;
uniform vec2 uScale;
uniform vec2 uTrans;
flat out uint vsType;
void main() {
    gl_PointSize = uPointSize;
    if( drawOrNot==1.0 ) gl_Position = vec4( inPos * uScale + uTrans, 0.0, 1.0 );
    else gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
    vsType = inType;
}`;

const constChannel_fs = `#version 300 es
precision highp float;
flat in uint vsType;
uniform sampler2D uTexture;
out vec4 outColor;
void main() {
    outColor = texelFetch( uTexture, ivec2( vsType, 0 ), 0 );
}`;