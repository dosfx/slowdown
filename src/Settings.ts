import { InjectionKey, readonly, ref, watch } from "vue";

export const SettingsKey = Symbol() as InjectionKey<Settings>;

const CountdownKey = "countdown";

export class Settings {
    private readonly _countdownRef;

    constructor () {
        this._countdownRef = ref(this.getSetting<number>(CountdownKey, 60));
        watch(this._countdownRef, (value) => this.setSetting(CountdownKey, value));
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

    public get VibrationPattern() {
        return [500];
    }

    private getSetting<T>(key: string, def: T): T {
        const local = localStorage.getItem(key);
        const value = local ? JSON.parse(local) : def;
        return value as T;
    }

    private setSetting(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
