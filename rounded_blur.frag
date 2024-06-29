#version 120

uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform vec2 texelSize;
uniform vec2 direction;
uniform float radius;
uniform float kernel[64];
uniform float softness;
uniform float roundRadius;
uniform vec2 size;

float computeAlpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - roundRadius;
}

void main()
{
    vec2 uv = gl_TexCoord[0].st;
    uv.y = 1.0f - uv.y;

    vec2 coords = gl_TexCoord[0].st * size;
    vec2 centre = 0.5 * size;
    float alphaMask = 1.0 - smoothstep(-softness, softness, computeAlpha(centre - coords, centre - vec2(roundRadius + softness)));

    float alpha = texture2D(sampler2, uv).a;
    if (direction.x == 0.0 && alpha == 0.0) {
        discard;
    }

    vec4 pixel_color = texture2D(sampler1, uv) * kernel[0];
    for (float f = 1; f <= radius; f++) {
        vec2 offset = f * texelSize * direction;
        pixel_color += texture2D(sampler1, uv - offset) * kernel[int(f)];
        pixel_color += texture2D(sampler1, uv + offset) * kernel[int(f)];
    }

    gl_FragColor = vec4(pixel_color.rgb, direction.x == 0.0 ? alpha * alphaMask : 1.0 * alphaMask);
}
