#version 120

uniform float roundlt; // Радиус округления для левого верхнего угла
uniform float roundrt; // Радиус округления для правого верхнего угла
uniform float roundld; // Радиус округления для левого нижнего угла
uniform float roundrd; // Радиус округления для правого нижнего угла
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 center, float radius) {
    vec2 d = abs(p - center) - radius;
    return length(max(d, 0.0)) - radius;
}

void main() {
    vec2 pos = gl_FragCoord.xy;
    vec2 lt = vec2(roundlt, size.y - roundlt);
    vec2 rt = vec2(size.x - roundrt, size.y - roundrt);
    vec2 ld = vec2(roundld, roundld);
    vec2 rd = vec2(size.x - roundrd, roundrd);

    float a = min(min(alpha(pos, lt, roundlt), alpha(pos, rt, roundrt)), min(alpha(pos, ld, roundld), alpha(pos, rd, roundrd)));

    float finalAlpha = 1.0 - smoothstep(0.0, 1.0, a);
    gl_FragColor = vec4(color.rgb, color.a * finalAlpha);
}
