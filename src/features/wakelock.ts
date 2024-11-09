import { InjectionKey } from "vue";
import { Feature } from "./feature";

export const WakeLockKey = Symbol() as InjectionKey<WakeLockFeature>;

export class WakeLockFeature extends Feature {
    private readonly ready: Promise<void> = this.init();
    private sentinal?: WakeLockSentinel;

    public async request() {
        await this.ready;
        if (!this.isSupported) return false;
        if (this.sentinal) return true;
        try {
            this.sentinal = await navigator.wakeLock.request("screen");
            this.sentinal.addEventListener("release", this.onRelease.bind(this));
            return true;
        } catch (e) {
            console.log(e);
            this.sentinal = undefined;
            return false;
        }
    }

    public release() {
        if (!this.sentinal) return;
        this.sentinal.release();
        this.sentinal = undefined;
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
    }
}