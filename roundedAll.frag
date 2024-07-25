#version 120

uniform vec4 round; // Закругления для четырех углов: левый верхний, правый верхний, правый нижний, левый нижний
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 d, vec2 d1) {
    vec2 v1 = abs(d) - d1 + vec2(round.x, round.y);
    vec2 v2 = abs(d) - d1 + vec2(round.z, round.y);
    vec2 v3 = abs(d) - d1 + vec2(round.z, round.w);
    vec2 v4 = abs(d) - d1 + vec2(round.x, round.w);
    
    float a1 = min(max(v1.x, v1.y), 0.0) + length(max(v1, .0f)) - round.x;
    float a2 = min(max(v2.x, v2.y), 0.0) + length(max(v2, .0f)) - round.z;
    float a3 = min(max(v3.x, v3.y), 0.0) + length(max(v3, .0f)) - round.z;
    float a4 = min(max(v4.x, v4.y), 0.0) + length(max(v4, .0f)) - round.x;
    
    return min(min(a1, a2), min(a3, a4));
}

void main() {
    vec2 centre = .5f * size;
    gl_FragColor = vec4(color.rgb, color.a * (1.f - smoothstep(0.f, 1.5f, alpha(centre - (gl_TexCoord[0].st * size), centre - 1.f))));
}
