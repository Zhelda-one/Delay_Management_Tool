const constWhite_vs = `#version 300 es
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

    //
const constWhite_fs = `#version 300 es
precision mediump float;
flat in uint vsType;
uniform sampler2D uTexture;
uniform float uMaxAmplitude;
out vec4 outColor;

const int colorByType[] = int[](
    0x808080, // 0: Unused or zero

    0x00FFFF, // 1: PBCH - Physical Broadcast Channel
    0x00FF00, // 2: PDCCH - Physical Downlink Control Channel
    0xFF0000, // 3: PDSCH - Physical Downlink Shared Channel
    0xFFFF00, // 4: PSS - Primary synchronization signal
    0xFF00FF, // 5: SSS - Secondary synchronization signal
    0x0000C6, // 6:  PBCH DM-RS - Demodulation reference signal
    0x004DFF, // 7: PDCCH DM-RS - Demodulation reference signal
    0x0000FF, // 8: PDSCH DM-RS - Demodulation reference signal
    0x00A5FF, // 9: PDSCH PT-RS - Phase-tracking reference signal
    0xFFFFFF, // 10: PRS - Positioning reference signal
    0x336600, // 11: CSI-RS - Channel-state information reference signal
    0xFFFFFF, // 12: RIM-RS - Remote interference management reference signal

    0xFFFFFF, // 13: PRACH - Physical Random Access Channel
    0x00FF00, // 14: PUCCH - Physical Uplink Control Channel
    0xFF0000, // 15: PUSCH - Physical Uplink Shared Channel
    0x004DFF, // 16: PUCCH DM-RS - Demodulation reference signal
    0x0000FF, // 17: PUSCH DM-RS - Demodulation reference signal
    0x00A5FF, // 18: PUSCH PT-RS - Phase-tracking reference signal
    0x02F4E4, // 19: SRS - Sounding reference signal

    0xFFFFFF, // 20: PSBCH - Physical Sidelink Broadcast Channel
    0xFFFFFF, // 21: PSCCH - Physical Sidelink Control Channel
    0xFFFFFF, // 22: PSSCH - Physical Sidelink Shared Channel
    0xFFFFFF, // 23: PSFCH - Physical Sidelink Feedback Channel
    0xFFFFFF, // 24: S-PSS - Sidelink primary synchronization signal
    0xFFFFFF, // 25: S-SSS - Sidelink secondary synchronization signal
    0xFFFFFF, // 26: PSBCH DM-RS - Demodulation reference signal
    0xFFFFFF, // 27: PSCCH DM-RS - Demodulation reference signal
    0xFFFFFF, // 28: PSSCH DM-RS - Demodulation reference signal
    0xFFFFFF,  // 29: PT-RS - Phase-tracking reference signal
    0xFFFFFF // 30: CSI-RS - Channel-state information reference signal
);

void main() {
    int bgr = vsType < uint(colorByType.length() - 1) ? colorByType[vsType] : 0xFFFFFF;
    vec4 iqColor = vec4(
        float(bgr & 0xFF),
        float(bgr & 0xFF00),
        float(bgr & 0xFF0000),
        1.0
    );
    outColor = vec4( 1, 1, 1, texelFetch( uTexture, ivec2( vsType, 0 ), 0 ).a ) * iqColor;
}`;