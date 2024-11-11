import { InjectionKey } from "vue";
import { Feature } from "./feature";
import { Settings } from "../settings";

export const VibrationKey = Symbol() as InjectionKey<VibrationFeature>;

export class VibrationFeature extends Feature {
    public constructor(private readonly settings: Settings) {
        super();
        if (("vibrate" in navigator)) {
            this.setSupported();
        }
    }

    public vibrate() {
        if (!this.isSupported) return;
        if (!this.settings.Vibration) return;
        navigator.vibrate(this.settings.VibrationPattern);
    }
}