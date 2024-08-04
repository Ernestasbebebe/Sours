#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;
uniform vec4 color;
uniform vec2 direction; // Новая переменная для направления размытия

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

void main() {
    vec2 centre = .5f * size + direction; // Смещаем центр по направлению
    gl_FragColor = vec4(color.rgb, color.a * (1.f - smoothstep(-softness, softness, alpha(centre - (gl_TexCoord[0].st * size), centre - radius - softness))));
}
