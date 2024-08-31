#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(void) {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float len = length(uv);

    float angle = atan(uv.y, uv.x) + u_time * 0.2;
    float radius = sin(u_time * 0.1 + len * 10.0) * 0.5 + 0.5;

    vec3 color1 = vec3(1.0, 0.05, 0.43); // #ff0d6e
    vec3 color2 = vec3(0.86, 0.73, 0.58); // #dbba95
    vec3 color3 = vec3(0.82, 0.74, 0.88); // #d0bce1

    vec3 color = mix(color1, color2, radius);
    color = mix(color, color3, len * 0.5);

    gl_FragColor = vec4(color, 1.0);
}
