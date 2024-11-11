import { InjectionKey, readonly, ref, watch } from "vue";

export const SettingsKey = Symbol() as InjectionKey<Settings>;

const CountdownKey = "countdown";
const VibrationKey = "vibration";

export class Settings {
    private readonly _countdownRef;
    private readonly _vibrationRef;

    constructor () {
        this._countdownRef = this.setup(CountdownKey, 60);
        this._vibrationRef = this.setup(VibrationKey, true);
    }

    public readonly CountdownMax = 60 * 10;

    public readonly CountdownMin = 5;

    public get Countdown() {
        return this._countdownRef.value;
    }

    public set Countdown(value: number) {
        this._countdownRef.value = value;
    }

    public get CountdownRef() {
        return readonly(this._countdownRef);
    }

    public readonly Interval = 30 / 1000;

    public readonly Sensitivity = 10;

    public get Vibration() {
        return this._vibrationRef.value;
    }

    public get VibrationRef() {
        return this._vibrationRef;
    }

    public get VibrationPattern() {
        return [500];
    }

    private setup<T>(key: string, initial: T) {
        const ret = ref(this.getSetting(key, initial));
        watch(ret, (value) => this.setSetting(key, value));
        return ret;
    }

    private getSetting<T>(key: string, def: T) {
        const local = localStorage.getItem(key);
        if (local !== null) {
            return JSON.parse(local) as T;
        }
        return def;
    }

    private setSetting<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
