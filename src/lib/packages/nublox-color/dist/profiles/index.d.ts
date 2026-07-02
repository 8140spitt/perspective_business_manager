import type { RampProfile } from '../types.js';
export declare const uiProfile: RampProfile;
export declare const paintProfile: RampProfile;
export declare const accessibilityProfile: RampProfile;
export declare const displayProfile: RampProfile;
export declare const profiles: {
    readonly ui: RampProfile;
    readonly paint: RampProfile;
    readonly accessibility: RampProfile;
    readonly display: RampProfile;
};
export declare function resolveProfile(profile?: any): RampProfile;
