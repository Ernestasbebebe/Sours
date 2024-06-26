#version 120

uniform float round;
uniform float thickness;
uniform float glowSize;
uniform vec2 size;
uniform vec4 color;
uniform vec4 glowColor;

float alpha(vec2 d, vec2 d1) {
    vec2 v = abs(d) - d1 + round;
    return min(max(v.x, v.y), 0.0) + length(max(v, .0f)) - round;
}

void main() {
    vec2 centre = .5f * size;
    vec2 smoothnessOutline = vec2(thickness - 1.5f, thickness);
    vec2 smoothnessGlow = vec2(thickness + glowSize - 1.5f, thickness + glowSize);
    float distance = abs(alpha(centre - (gl_TexCoord[0].st * size), centre - thickness));

    // Calculate glow alpha
    float glow = smoothstep(smoothnessGlow.x, smoothnessGlow.y, distance);
    float outlineAlpha = (1.f - smoothstep(smoothnessOutline.x, smoothnessOutline.y, distance));
    
    vec4 glowEffect = vec4(glowColor.rgb, glowColor.a * glow);
    vec4 outlineEffect = vec4(color.rgb, color.a * outlineAlpha);

    gl_FragColor = mix(glowEffect, outlineEffect, outlineAlpha / (outlineAlpha + glow));
}
