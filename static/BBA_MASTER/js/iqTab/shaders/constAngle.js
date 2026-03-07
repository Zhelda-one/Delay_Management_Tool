const constAngle_vs = `#version 300 es
layout( location = 0 ) in vec2 inPos;
layout( location = 1 ) in uint inType;
layout( location = 2) in float drawOrNot;
uniform float uPointSize;
uniform vec2 uScale;
uniform vec2 uTrans;
out vec2 vsPos;
flat out uint vsType;
void main() {
    gl_PointSize = uPointSize;
    if( drawOrNot==1.0 ) gl_Position = vec4( inPos * uScale + uTrans, 0.0, 1.0 );
    else gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
    vsPos = inPos;
    vsType = inType;
}`;

const constAngle_fs = `#version 300 es
precision highp float;
in vec2 vsPos;
flat in uint vsType;
uniform sampler2D uTexture;
out vec4 outColor;
void main() {
    vec2 pos = clamp( vsPos, -1.0, 1.0 );
    float amp = sqrt( pos.x * pos.x + pos.y * pos.y );
    pos += vec2( 1.0, 1.0 );
    pos /= vec2( 2.0, 2.0 );
    outColor = vec4( amp, pos.x, pos.y, texelFetch( uTexture, ivec2( vsType, 0 ), 0 ).a );
}`;