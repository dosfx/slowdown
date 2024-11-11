import { InjectionKey } from "vue";
import { Feature } from "./feature";
import { SignalDispatcher } from "strongly-typed-events";

export const WakeLockKey = Symbol() as InjectionKey<WakeLockFeature>;

export class WakeLockFeature extends Feature {
    private readonly _releaseSignal: SignalDispatcher;
    private readonly ready: Promise<void>;
    private readonly onReleaseBind: () => void;
    private sentinal?: WakeLockSentinel;

    public constructor() {
        super();
        this.ready = this.init();
        this._releaseSignal = new SignalDispatcher();
        this.onReleaseBind = this.onRelease.bind(this);
    }

    public async request() {
        await this.ready;
        if (!this.isSupported) return false;
        if (this.sentinal) return true;
        try {
            this.sentinal = await navigator.wakeLock.request("screen");
            this.sentinal.addEventListener("release", this.onReleaseBind);
            return true;
        } catch (e) {
            console.log(e);
            this.sentinal = undefined;
            return false;
        }
    }

    public async release() {
        if (!this.sentinal) return;
        this.sentinal.removeEventListener("release", this.onReleaseBind);
        await this.sentinal.release();
        this.sentinal = undefined;
    }

    public get releaseSignal() {
        return this._releaseSignal.asEvent();
    }

    private async init() {
        if (!("wakeLock" in navigator)) {
            this.setUnsupported();
            return;
        }
        const status = await navigator.permissions.query({ name: "screen-wake-lock" });
        status.addEventListener("change", () => this.updatePermissionsStatus(status));
        this.updatePermissionsStatus(status);
    }

    private updatePermissionsStatus(status: PermissionStatus) {
        if (status.state === "granted") {
            this.setSupported();
        } else {
            this.setNoPermission();
        }
    }

    private onRelease() {
        this.sentinal = undefined;
        this._releaseSignal.dispatch();
    }
}