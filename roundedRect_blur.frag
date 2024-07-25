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

    // Create a simple blur effect using neighboring pixels
    vec4 blurredColor = vec4(0.0);
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            blurredColor += texture2DRect(gl_TextureRect[0], gl_FragCoord.xy + vec2(x, y));
        }
    }
    blurredColor /= 9.0; // Average of 9 samples

    gl_FragColor = mix(color, blurredColor, smoothstep(0.f, 1.5f, alphaValue));
}
