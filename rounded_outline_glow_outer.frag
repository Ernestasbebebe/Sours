#version 120

uniform vec2 size;
uniform float round;
uniform float thickness;
uniform vec4 color;
uniform float glowSize;

void main() {
    vec2 uv = gl_TexCoord[0].st * size;
    float radius = round / 2.0;

    float dist = length(max(abs(uv - vec2(size.x / 2.0, size.y / 2.0)) - vec2(size.x / 2.0 - radius, size.y / 2.0 - radius), 0.0));
    if (dist < radius) {
        gl_FragColor = color;
    } else if (dist < radius + thickness) {
        gl_FragColor = mix(color, vec4(0.0), smoothstep(radius, radius + thickness, dist));
    } else if (dist < radius + thickness + glowSize) {
        gl_FragColor = mix(vec4(0.0), color, smoothstep(radius + thickness, radius + thickness + glowSize, dist));
    } else {
        discard;
    }
}
