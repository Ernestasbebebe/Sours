#version 120

uniform float round;
uniform float thickness;
uniform vec2 size;
uniform vec4 colorTopLeft;
uniform vec4 colorTopRight;
uniform vec4 colorBottomLeft;
uniform vec4 colorBottomRight;

float alpha(vec2 d, vec2 d1) {
    vec2 v = abs(d) - d1 + round;
    return min(max(v.x, v.y), 0.0) + length(max(v, .0f)) - round;
}

vec4 gradient(vec2 coord, vec2 size, vec4 colorTL, vec4 colorTR, vec4 colorBL, vec4 colorBR) {
    float tX = coord.x / size.x;
    float tY = coord.y / size.y;

    vec4 topColor = mix(colorTL, colorTR, tX);
    vec4 bottomColor = mix(colorBL, colorBR, tX);
    return mix(bottomColor, topColor, tY);
}

void main() {
    vec2 centre = .5f * size;
    vec2 smoothness = vec2(thickness - 1.5f, thickness);
    float alphaValue = 1.0 - smoothstep(smoothness.x, smoothness.y, abs(alpha(centre - (gl_TexCoord[0].st * size), centre - thickness)));
    vec4 gradientColor = gradient(gl_TexCoord[0].st * size, size, colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
    gl_FragColor = vec4(gradientColor.rgb, gradientColor.a * alphaValue);
}
