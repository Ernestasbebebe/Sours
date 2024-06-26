#version 120

uniform vec2 size;
uniform float round;
uniform float thickness;
uniform vec4 colorTL;
uniform vec4 colorTR;
uniform vec4 colorBL;
uniform vec4 colorBR;

void main() {
    vec2 uv = gl_TexCoord[0].st * size;
    float radius = round / 2.0;

    vec4 color;
    if (uv.x < size.x / 2.0 && uv.y < size.y / 2.0) {
        color = colorTL;
    } else if (uv.x >= size.x / 2.0 && uv.y < size.y / 2.0) {
        color = colorTR;
    } else if (uv.x < size.x / 2.0 && uv.y >= size.y / 2.0) {
        color = colorBL;
    } else {
        color = colorBR;
    }

    float dist = length(max(abs(uv - vec2(size.x / 2.0, size.y / 2.0)) - vec2(size.x / 2.0 - radius, size.y / 2.0 - radius), 0.0));
    if (dist < radius) {
        gl_FragColor = color;
    } else if (dist < radius + thickness) {
        gl_FragColor = mix(color, vec4(0.0), smoothstep(radius, radius + thickness, dist));
    } else {
        discard;
    }
}
