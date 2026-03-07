const blue_vs = `#version 300 es
layout( location = 0 ) in vec2 inPos;

uniform vec2 uScale;
uniform vec2 uTrans;

void main() {
    gl_Position = vec4( inPos * uScale + uTrans, 0.0, 1.0 );
}`;

const blue_fs = `#version 300 es
precision mediump float;
out vec4 outColor;

void main() {
    outColor = vec4( 0, 0, 1, 1);
}`