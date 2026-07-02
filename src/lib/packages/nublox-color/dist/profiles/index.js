const uiLightness = { 50: .975, 100: .945, 200: .890, 300: .815, 400: .705, 500: .600, 600: .515, 700: .420, 800: .325, 900: .245, 950: .180 };
export const uiProfile = {
    name: 'ui', description: 'Balanced digital interface ramp: smooth stops, strong contrast, conservative gamut.',
    lightness: uiLightness,
    chromaBias: .92, hueFreedom: .45, contrastPriority: .8,
    weights: { deltaE: 1.2, hue: .7, chroma: .8, smoothness: 1, gamut: 5, contrast: 1.2, brand: 1 }
};
export const paintProfile = {
    name: 'paint', description: 'Mimics pigment-like tints and shades with more hue travel and softer chroma retention.',
    lightness: uiLightness,
    chromaBias: .78, hueFreedom: 1.0, contrastPriority: .45,
    weights: { deltaE: 1, hue: .35, chroma: .7, smoothness: 1.2, gamut: 4, contrast: .5, brand: 1.3 }
};
export const accessibilityProfile = {
    name: 'accessibility', description: 'Prioritises reliable foreground/background contrast over saturation.',
    lightness: { 50: .985, 100: .955, 200: .900, 300: .800, 400: .675, 500: .560, 600: .465, 700: .365, 800: .275, 900: .205, 950: .145 },
    chromaBias: .72, hueFreedom: .25, contrastPriority: 1.5,
    weights: { deltaE: .9, hue: 1, chroma: .5, smoothness: 1, gamut: 6, contrast: 2.5, brand: .8 }
};
export const displayProfile = {
    name: 'display', description: 'Preserves more chroma for saturated display-forward palettes while still fitting sRGB output.',
    lightness: uiLightness,
    chromaBias: 1.05, hueFreedom: .55, contrastPriority: .55,
    weights: { deltaE: 1, hue: .6, chroma: 1.2, smoothness: .8, gamut: 4, contrast: .6, brand: 1.1 }
};
export const profiles = { ui: uiProfile, paint: paintProfile, accessibility: accessibilityProfile, display: displayProfile };
export function resolveProfile(profile = 'ui') {
    if (typeof profile === 'string')
        return profiles[profile] ?? uiProfile;
    return profile;
}
