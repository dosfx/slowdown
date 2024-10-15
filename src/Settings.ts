export class Settings {
    private readonly SecondsKey = "seconds";

    get seconds() {
        return this.getSetting<number>(this.SecondsKey, 60);
    }

    set seconds(value: number) {
        this.setSetting(this.SecondsKey, value);
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
