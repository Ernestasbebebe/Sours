#version 120

uniform vec4 roundlt;
uniform vec4 roundrt;
uniform vec4 roundld;
uniform vec4 roundrd;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 d, vec2 d1, vec4 round) {
    vec2 v = abs(d) - d1 + vec2(round.x, round.y);
    return min(max(v.x, v.y), 0.0) + length(max(v, .0f)) - max(round.x, round.y);
}

void main() {
    vec2 coord = gl_TexCoord[0].st * size;
    vec2 centre = .5f * size;
    float alphaValue;

    if (coord.x < centre.x && coord.y < centre.y) {
        // Top-left corner
        alphaValue = alpha(centre - coord, centre - 1.f, roundlt);
    } else if (coord.x >= centre.x && coord.y < centre.y) {
        // Top-right corner
        alphaValue = alpha(coord - centre, centre - 1.f, roundrt);
    } else if (coord.x < centre.x && coord.y >= centre.y) {
        // Bottom-left corner
        alphaValue = alpha(centre - coord, centre - 1.f, roundld);
    } else {
        // Bottom-right corner
        alphaValue = alpha(coord - centre, centre - 1.f, roundrd);
    }

    gl_FragColor = vec4(color.rgb, color.a * (1.f - smoothstep(0.f, 1.5f, alphaValue)));
}
