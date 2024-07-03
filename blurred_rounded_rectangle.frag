// blurred_rounded_rectangle.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 size;   // Размеры прямоугольника
uniform float round;  // Радиус закругления углов
uniform float blur;   // Сила размытия

void main() {
    vec2 uv = gl_FragCoord.xy / size;
    vec2 center = vec2(0.5);

    // Рассчитываем расстояние от текущей точки до центра прямоугольника
    float distToCenter = distance(uv, center);

    // Функция для создания закругленных углов
    float roundedEdges = smoothstep(round, round + blur, distToCenter);

    // Возвращаем цвет с альфа-каналом для размытого прямоугольника
    gl_FragColor = vec4(1.0, 1.0, 1.0, roundedEdges);
}
