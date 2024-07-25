#version 120

uniform vec4 roundlt;
uniform vec4 roundrt;
uniform vec4 roundld;
uniform vec4 roundrd;
uniform vec2 size;
uniform sampler2D texture;

float alpha(vec2 d, vec2 d1, vec4 round) {
    vec2 v = abs(d) - d1 + vec2(round.x, round.y);
    return min(max(v.x, v.y), 0.0) + length(max(v, .0f)) - max(round.x, round.y);
}

vec4 blur(sampler2D image, vec2 uv) {
    float blurSize = 1.0 / size.x; // Размер размытия
    vec4 sum = vec4(0.0);
    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
            sum += texture2D(image, uv + vec2(x, y) * blurSize);
        }
    }
    return sum / 25.0; // 25 выборок
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

    vec4 color = texture2D(texture, gl_TexCoord[0].st);
    vec4 blurredColor = blur(texture, gl_TexCoord[0].st);
    gl_FragColor = mix(color, blurredColor, smoothstep(0.f, 1.5f, alphaValue));
}
