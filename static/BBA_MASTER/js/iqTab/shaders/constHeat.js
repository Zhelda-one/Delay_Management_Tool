/*
THIS FILE CONTAINS TWO SHADERS:
 1. constHeat: for gathering overlapping samples
 2. constHeatPost: post-processing, turns gathered values into a heatmap
 */

const constHeat_vs = `#version 300 es
layout( location = 0 ) in vec2 inPos;
layout( location = 1 ) in uint inType;
layout( location = 2) in float drawOrNot;
uniform float uPointSize;
uniform vec2 uScale;
uniform vec2 uTrans;
flat out uint vsType;
out float pointSize;
void main() {
    gl_PointSize = uPointSize;
    pointSize = uPointSize;
    if( drawOrNot== 1.0 ) gl_Position = vec4( inPos * uScale + uTrans, 0.0, 1.0 );
    else gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
    vsType = inType;
}`;

const constHeat_fs = `#version 300 es
precision highp float;

layout(location = 0) out float outColor;

in float pointSize;
uniform float uPointValue;
void main() {
    vec2 circCoord = 2.0f * gl_PointCoord - 1.0f;
    if(pointSize > 1.0 && dot(circCoord, circCoord) > 1.0){
        discard;
    }

    outColor = uPointValue;
}`;

const constHeatPost_vs = `#version 300 es
layout( location = 0 ) in vec2 inPos;

out vec2 vTexCoords;
const vec2 scale = vec2(0.5, 0.5);

void main() {
    vTexCoords  = inPos * scale + scale; // scale vertex attribute to [0,1] range
    gl_Position = vec4( inPos , 0.0, 1.0 );
}`;

const constHeatPost_fs = `#version 300 es
precision highp float;

uniform sampler2D uTexture;
in vec2 vTexCoords;
out vec4 outColor;
void main() {
    
    float value = texture(uTexture, vTexCoords).x;
    if(value == 0.0f) discard;
    
    float toneMapped = value/(value + 1.0f);
    
    vec3 blue = vec3(0.0f, 0.0f, 1.0f);
    vec3 green = vec3(0.0f, 1.0f, 0.0f);
    vec3 yellow = vec3(1.0f, 1.0f, 0.0f);
    vec3 red = vec3(1.0f, 0.0f, 0.0f);
    float alpha = clamp(toneMapped, 0.2f, 1.0f);
    
    float t = toneMapped;
    vec3 color = vec3(0.0f);
    color = blue*pow(1.0f-t, 3.0f) + 3.0f*green*pow(1.0f-t, 2.0f)*t + 3.0f*yellow*(1.0f-t)*pow(t, 2.0f) + red*pow(t, 3.0f);

    const float gamma = 2.2;
    color = pow(color, vec3(1.0 / gamma));

    outColor = vec4(color, alpha);
}`;