export function rampToCssVars(name, ramp) {
    return Object.values(ramp).map(s => `  --${name}-${s.stop}: ${s.hex};`).join('\n');
}
export function themeToCss(theme, selector = ':root') {
    const body = Object.entries(theme.ramps).map(([name, ramp]) => rampToCssVars(name, ramp)).join('\n');
    return `${selector} {\n${body}\n}`;
}
