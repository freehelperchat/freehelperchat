import { DEFAULT_LANGUAGE } from 'constants/translation';

/**
 * Converts a timestamp into a time string
 * @param timestamp The timestamp
 * @returns Time string contaning the day, month, full year, hours, minutes and seconds
 */
export function getMessageTime(timestamp: number): string {
  const date = new Date(timestamp);
  const locale = localStorage.getItem('lang');
  return date.toLocaleDateString(locale || DEFAULT_LANGUAGE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

/**
 * Converts a HSV color to hexadecimal format
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns Color in hexadecimal format, e.g. #123ABC
 */
export function HSVtoHex(h: number, s: number, v: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    let u = t;
    if (t < 0) u += 1;
    if (t > 1) u -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * u;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - u) * 6;
    return p;
  };
  const q = v < 0.5 ? v * (1 + s) : v + s - v * s;
  const p = 2 * v - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Gets a pseudo-random color from a string
 * @param text String used as seed
 * @returns Pseudo-color in HSL CSS format.
 */
export function getColorByText(text: string): string {
  const steps = 10;
  const offset = 1;
  let hash = text.length;
  text.split('').forEach((letter, i) => {
    hash ^= +letter * (i + 1);
  });
  const h = (1 / (steps + offset)) * ((hash % steps) + offset);
  const s = 0.6;
  const v = 0.4;
  return `hsl(${h * 360}, ${s * 100}%, ${v * 100}%)`;
}
