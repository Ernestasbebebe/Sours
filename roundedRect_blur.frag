#version 120

uniform vec4 roundlt;
uniform vec4 roundrt;
uniform vec4 roundld;
uniform vec4 roundrd;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 d, vec2 d1, float round) {
    vec2 v = abs(d) - d1 + vec2(round, round);
    return min(max(v.x, v.y), 0.0) + length(max(v, vec2(0.0))) - round;
}

vec4 blur(vec2 uv) {
    float blurSize = 1.0 / size.x; // Размер размытия
    vec4 sum = vec4(0.0);
    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
            sum += texture2DRect(gl_TextureRect[0], uv + vec2(x, y) * blurSize);
        }
    }
    return sum / 25.0; // 25 выборок
}

void main() {
    vec2 coord = gl_FragCoord.xy;
    vec2 centre = .5f * size;
    float alphaValue;

    if (coord.x < centre.x && coord.y < centre.y) {
        // Top-left corner
        alphaValue = alpha(centre - coord, centre - 1.f, roundlt.x);
    } else if (coord.x >= centre.x && coord.y < centre.y) {
        // Top-right corner
        alphaValue = alpha(coord - centre, centre - 1.f, roundrt.x);
    } else if (coord.x < centre.x && coord.y >= centre.y) {
        // Bottom-left corner
        alphaValue = alpha(centre - coord, centre - 1.f, roundld.x);
    } else {
        // Bottom-right corner
        alphaValue = alpha(coord - centre, centre - 1.f, roundrd.x);
    }

    vec4 blurredColor = blur(coord);
    gl_FragColor = mix(color, blurredColor, smoothstep(0.f, 1.5f, alphaValue));
}
