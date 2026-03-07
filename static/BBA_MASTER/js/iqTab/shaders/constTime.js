const constTime_vs = `#version 300 es
layout( location = 0 ) in float pos_i;
layout( location = 1 ) in float pos_q;

uniform float uPointSize;
uniform float sampleShift;
uniform vec2 uScale;
uniform vec2 uTrans;
out vec2 vsPos;
uniform float len;

void main() {
    gl_PointSize = uPointSize;
    vec2 pos = vec2( (float(gl_VertexID)+sampleShift) / 1000000.0, sqrt(pos_i*pos_i + pos_q*pos_q) );
    
    gl_Position = vec4( pos*uScale + uTrans, 0, 1.0 );
    vsPos = pos;
    // vsType = inType;
}`;

const constTime_fs = `#version 300 es
precision highp float;
in vec2 vsPos;
// flat in uint vsType;
uniform sampler2D uTexture;
out vec4 outColor;
void main() {
    vec2 pos = clamp( vsPos, -1.0, 1.0 );
    float amp = sqrt( pos.x * pos.x + pos.y * pos.y );
    pos += vec2( 1.0, 1.0 );
    pos /= vec2( 2.0, 2.0 );
    // outColor = vec4( amp, pos.x, pos.y, texelFetch( uTexture, ivec2( 1, 0 ), 0 ).a );
    outColor = vec4(1,1,1,1);
}`;

const constTimeRe_vs = `#version 300 es
layout( location = 0 ) in float pos_i;
layout( location = 1 ) in float pos_q;

uniform float uPointSize;
uniform float sampleShift;
uniform vec2 uScale;
uniform vec2 uTrans;
out vec2 vsPos;
uniform float len;

void main() {
    gl_PointSize = uPointSize;
    vec2 pos = vec2( (float(gl_VertexID)+sampleShift) / 1000000.0, pos_i );
    
    gl_Position = vec4( pos*uScale + uTrans, 0, 1.0 );
    vsPos = pos;
    // vsType = inType;
}`;

const constTimeIm_vs = `#version 300 es
layout( location = 0 ) in float pos_i;
layout( location = 1 ) in float pos_q;

uniform float uPointSize;
uniform float sampleShift;
uniform vec2 uScale;
uniform vec2 uTrans;
out vec2 vsPos;
uniform float len;

void main() {
    gl_PointSize = uPointSize;
    vec2 pos = vec2( (float(gl_VertexID)+sampleShift) / 1000000.0, pos_q );
    
    gl_Position = vec4( pos*uScale + uTrans, 0, 1.0 );
    vsPos = pos;
    // vsType = inType;
}`;

const constTimeAng_vs = `#version 300 es
layout( location = 0 ) in float pos_i;
layout( location = 1 ) in float pos_q;

uniform float uPointSize;
uniform float sampleShift;
uniform vec2 uScale;
uniform vec2 uTrans;
out vec2 vsPos;
uniform float len;

float atan2(in float y, in float x)
{
	if(y < 0.0 && x < 0.0)
		return atan(y/x) - 3.1415;
	else if(y > 0.0 && x < 0.0)
		return atan(y/x) + 3.1415;

	return atan(y/x);
	
	
    // bool s = (abs(x) > abs(y));
    // return mix(3.1415/2.0 - atan(x/y), atan(y/x), s);
}

void main() {
    gl_PointSize = uPointSize;
    vec2 pos = vec2( (float(gl_VertexID)+sampleShift) / 1000000.0, atan2(pos_q, pos_i) );
    
    gl_Position = vec4( pos*uScale + uTrans, 0, 1.0 );
    vsPos = pos;
    // vsType = inType;
}`;

const constTimeConstelation_vs = `#version 300 es
layout( location = 0 ) in float pos_i;
layout( location = 1 ) in float pos_q;
uniform float uPointSize;
uniform vec2 uScale;
uniform vec2 uTrans;
uniform float len;
out vec2 vsPos;

void main() {
    gl_PointSize = uPointSize;
    vec2 pos = vec2( pos_i, pos_q );
    
    gl_Position = vec4( pos*uScale + uTrans, 0, 1.0 );
    vsPos = pos;
}`;

const constTimeAng_fs = `#version 300 es
precision highp float;
in vec2 vsPos;
// flat in uint vsType;
uniform sampler2D uTexture;
out vec4 outColor;
void main() {
    vec2 pos = clamp( vsPos, -1.0, 1.0 );
    float amp = sqrt( pos.x * pos.x + pos.y * pos.y );
    pos += vec2( 1.0, 1.0 );
    pos /= vec2( 2.0, 2.0 );
    outColor = vec4( amp, pos.x, pos.y, texelFetch( uTexture, ivec2( 1, 0 ), 0 ).a );
    // outColor = vec4(1,1,1,1);
}`;