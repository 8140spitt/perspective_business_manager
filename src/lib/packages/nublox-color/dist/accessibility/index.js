import { hexToRgb } from '../math/srgb.js';
import { contrastRatio } from '../math/contrast.js';
export function isWcagAA(foreground, background, largeText = false) {
    return contrastRatio(hexToRgb(foreground), hexToRgb(background)) >= (largeText ? 3 : 4.5);
}
export function contrast(foreground, background) {
    return contrastRatio(hexToRgb(foreground), hexToRgb(background));
}
