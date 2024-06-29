#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

void main() {
    vec2 centre = .5f * size;
    float a = 1.f - smoothstep(-softness, softness, alpha(centre - (gl_TexCoord[0].st * size), centre - vec2(radius + softness)));
    gl_FragColor = vec4(0.0, 0.0, 0.0, a); // Используем альфа-канал для размытия
}
