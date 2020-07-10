const hight = parseInt("DD2A42", 16)
const medium = parseInt("2AA2DD", 16)
const low = parseInt("82D873", 16)

export const getColor = (value: number, min: number, max: number) => {
    const valueInBetween = value - min
    const maxInBetween = max - min

    if (maxInBetween <= 0 || value < min) return `#${low.toString(16)}`
    else if (value >= max) return `#${hight.toString(16)}`

    const sectorSize = maxInBetween / 3

    const lowDistance = valueInBetween;
    const midDistance = Math.abs(sectorSize * 1.5 - valueInBetween);
    const highDistance = maxInBetween - valueInBetween;

    let lowProp = Math.abs(lowDistance - maxInBetween) / maxInBetween;
    let minProp = Math.abs(midDistance - maxInBetween) / maxInBetween;
    let highProp = Math.abs(highDistance - maxInBetween) / maxInBetween;

    console.log(lowProp)
    console.log(minProp)
    console.log(highProp)

    const result = Math.round(low * lowProp + medium * minProp + hight * highProp) % parseInt("FFFFFF", 16)

    return `#${result.toString(16)}`
}

function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic

    } else {
        function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

/**
 * Convert a number to a color using hsl, with range definition.
 * Example: if min/max are 0/1, and i is 0.75, the color is closer to green.
 * Example: if min/max are 0.5/1, and i is 0.75, the color is in the middle between red and green.
 * @param i (floating point, range 0 to 1)
 * param min (floating point, range 0 to 1, all i at and below this is red)
 * param max (floating point, range 0 to 1, all i at and above this is green)
 */
export function numberToColorHsl(_value: number, min: number, max: number) {
    let ratio: number;
    let value = Math.abs(_value - max)

    if (value < min) {
        ratio = 0;

    } else if (value > max) {
        ratio = 1;

    } else {
        let range = max - min;
        ratio = ((value - min) / range);
    }


    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = ratio * 1.2 / 3.60;
    //if (minMaxFactor!=1) hue /= minMaxFactor;
    //console.log(hue);

    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, .8, .65);
    // we format to css value and return

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`
}