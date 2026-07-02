export function rampToTokens(name, ramp) {
    const out = {};
    for (const stop of Object.values(ramp)) {
        out[`color.${name}.${stop.stop}`] = stop.hex;
        out[`color.${name}.${stop.stop}.foreground`] = stop.metrics.preferredText;
    }
    return out;
}
