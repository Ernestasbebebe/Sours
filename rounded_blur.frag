#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;
uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;
uniform vec4 color4;
uniform vec4 tintColor;
uniform float tintIntensity;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

void main() {
    vec2 coords = gl_TexCoord[0].st;
    vec2 centre = .5f * size;
    vec4 baseColor = mix(mix(color1, color2, coords.y), mix(color3, color4, coords.y), coords.x);
    vec4 tintedColor = mix(baseColor, tintColor, tintIntensity);
    gl_FragColor = vec4(tintedColor.rgb, tintedColor.a * (1.f - smoothstep(-softness, softness, alpha(centre - (gl_TexCoord[0].st * size), centre - vec2(radius + softness)))));
}
