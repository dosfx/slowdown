export class Settings {
    private readonly SecondsKey = "seconds";

    public readonly CountdownMax = 60 * 10;

    public readonly CountdownMin = 5;

    public get Countdown() {
        return this.getSetting<number>(this.SecondsKey, 60);
    }

    public set Countdown(value: number) {
        this.setSetting(this.SecondsKey, value);
    }

    public readonly Interval = 30 / 1000;

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
