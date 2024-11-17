import { InjectionKey, readonly, ref, watch } from "vue";

export const SettingsKey = Symbol() as InjectionKey<Settings>;

export class Settings {
    private readonly _animation;
    private readonly _countdown;
    private readonly _lock;
    private readonly _vibration;
    private readonly _vibrationPattern;
    private readonly _unlock;

    constructor() {
        this._animation = this.setup("animation", AnimationSetting.Smooth);
        this._countdown = this.setup("countdown", 60);
        this._lock = this.setup("lock", false);
        this._vibration = this.setup("vibration", true);
        this._vibrationPattern = this.setup("vibrationPattern", VibrationPatternSetting.Long);
        this._unlock = this.setup("unlock", UnlockMethodSetting.Slider);
    }

    public get Animation() {
        return this._animation.value;
    }

    public get AnimationRef() {
        return this._animation;
    }

    public get AnimationValues() {
        return this.enumValues(AnimationSetting) as AnimationSetting[];
    }

    public readonly CountdownMax = 60 * 10;

    public readonly CountdownMin = 5;

    public get Countdown() {
        return this._countdown.value;
    }

    public set Countdown(value: number) {
        this._countdown.value = value;
    }

    public get CountdownRef() {
        return readonly(this._countdown);
    }

    public get Interval() {
        return 1000 / {
            [AnimationSetting.Smooth]: 60,
            [AnimationSetting.Medium]: 30,
            [AnimationSetting.Slow]: 1,
        }[this.Animation];
    }

    public get Lock() {
        return this._lock.value;
    }

    public get LockRef() {
        return this._lock;
    }

    public readonly Sensitivity = 10;

    public get Unlock() {
        return this._unlock.value;
    }

    public get UnlockRef() {
        return this._unlock;
    }

    public get UnlockMethodValues() {
        return this.enumValues(UnlockMethodSetting) as UnlockMethodSetting[];
    }

    public get Vibration() {
        return this._vibration.value;
    }

    public get VibrationRef() {
        return this._vibration;
    }

    public get VibrationPattern() {
        return this._vibrationPattern.value;
    }

    public get VibrationPatternRef() {
        return this._vibrationPattern;
    }

    public get VibrationPatternValues() {
        return this.enumValues(VibrationPatternSetting) as VibrationPatternSetting[];
    }

    public get VibrationPatternArray() {
        return {
            [VibrationPatternSetting.Long]: [500],
            [VibrationPatternSetting.Double]: [200, 100, 200],
            [VibrationPatternSetting.Triple]: [100, 100, 100, 100, 100],
        }[this.VibrationPattern];
    }

    private setup<T>(key: string, initial: T) {
        const ret = ref(this.getSetting(key, initial));
        watch(ret, (value) => this.setSetting(key, value));
        return ret;
    }

    private enumValues<T extends {}>(e: T) {
        return Object.values(e).filter(i => isFinite(Number(i)));
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

export enum AnimationSetting {
    Slow,
    Medium,
    Smooth,
}

export enum UnlockMethodSetting {
    Button,
    Slider,
}

export enum VibrationPatternSetting {
    Long,
    Double,
    Triple,
}
