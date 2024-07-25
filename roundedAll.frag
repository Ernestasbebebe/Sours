#version 120

uniform vec4 roundlt; // Радиус округления для левого верхнего угла
uniform vec4 roundrt; // Радиус округления для правого верхнего угла
uniform vec4 roundld; // Радиус округления для левого нижнего угла
uniform vec4 roundrd; // Радиус округления для правого нижнего угла
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 d, vec2 d1, vec4 round) {
    vec2 v = abs(d) - d1 + round.xy;  // Используем только x и y компоненты для округления
    return min(max(v.x, v.y), 0.0) + length(max(v, vec2(0.0))) - round.x; // Используем только x компоненту для округления
}

void main() {
    vec2 centre = 0.5 * size;
    vec2 pos = gl_TexCoord[0].st * size - centre; // Позиция фрагмента относительно центра

    // Расстояния до углов
    vec2 distLT = abs(pos - vec2(-centre.x, centre.y)); // Левый верхний угол
    vec2 distRT = abs(pos - vec2(centre.x, centre.y));  // Правый верхний угол
    vec2 distLD = abs(pos - vec2(-centre.x, -centre.y)); // Левый нижний угол
    vec2 distRD = abs(pos - vec2(centre.x, -centre.y));  // Правый нижний угол

    // Вычисление альфы для каждого угла
    float alphaLT = alpha(distLT, roundlt.xy, roundlt); 
    float alphaRT = alpha(distRT, roundrt.xy, roundrt);
    float alphaLD = alpha(distLD, roundld.xy, roundld);
    float alphaRD = alpha(distRD, roundrd.xy, roundrd);

    // Выбор наименьшего значения из альф для конечного результата
    float finalAlpha = min(min(alphaLT, alphaRT), min(alphaLD, alphaRD));

    // Цвет с учётом альфы
    gl_FragColor = vec4(color.rgb, color.a * (1.0 - smoothstep(0.0, 1.5, finalAlpha)));
}
