// OKLCH to RGB conversion utilities

/**
 * Converts OKLCH to RGB
 * L: 0-1 (lightness)
 * C: 0-0.4 (chroma)
 * H: 0-360 (hue in degrees)
 */
export function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  // Convert OKLCH to OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const bLab = c * Math.sin(hRad);

  // Convert OKLab to linear RGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * bLab;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * bLab;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * bLab;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r_linear = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g_linear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b_linear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // Convert linear RGB to sRGB
  const r = gammaCorrection(r_linear);
  const g = gammaCorrection(g_linear);
  const b = gammaCorrection(b_linear);

  return {
    r: Math.max(0, Math.min(255, Math.round(r * 255))),
    g: Math.max(0, Math.min(255, Math.round(g * 255))),
    b: Math.max(0, Math.min(255, Math.round(b * 255)))
  };
}

function gammaCorrection(value: number): number {
  if (value <= 0.0031308) {
    return 12.92 * value;
  } else {
    return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
  }
}

/**
 * Converts RGB to HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts HEX to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Converts RGB to OKLCH
 */
export function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  // Convert sRGB to linear RGB
  const r_linear = inverseGammaCorrection(r / 255);
  const g_linear = inverseGammaCorrection(g / 255);
  const b_linear = inverseGammaCorrection(b / 255);

  // Convert linear RGB to OKLab
  const l_ = 0.4122214708 * r_linear + 0.5363325363 * g_linear + 0.0514459929 * b_linear;
  const m_ = 0.2119034982 * r_linear + 0.6806995451 * g_linear + 0.1073969566 * b_linear;
  const s_ = 0.0883024619 * r_linear + 0.2817188376 * g_linear + 0.6299787005 * b_linear;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const b_ = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  // Convert OKLab to OKLCH
  const C = Math.sqrt(a * a + b_ * b_);
  let H = Math.atan2(b_, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

function inverseGammaCorrection(value: number): number {
  if (value <= 0.04045) {
    return value / 12.92;
  } else {
    return Math.pow((value + 0.055) / 1.055, 2.4);
  }
}

/**
 * Format OKLCH for CSS
 */
export function formatOklch(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}
