import { computed, readonly, ref } from "vue";

export enum FeatureStatus {
    Unsupported,
    NoPermission,
    Supported,
}

export class Feature {
    protected readonly _status = ref(FeatureStatus.Unsupported);
    protected readonly _unsupported = computed(() => this._status.value === FeatureStatus.Unsupported);
    protected readonly _noPermission = computed(() => this._status.value === FeatureStatus.NoPermission);
    protected readonly _supported = computed(() => this._status.value === FeatureStatus.Supported);

    public get status() {
        return this._status.value;
    }

    protected set status(value: FeatureStatus) {
        this._status.value = value;
    }

    public get statusRef() {
        return readonly(this._status);
    }

    public get isUnsupported() {
        return this._unsupported.value;
    }

    protected setUnsupported() {
        this.status = FeatureStatus.Unsupported;
    }

    public get isUnsupportedRef() {
        return this._unsupported;
    }

    public get isNoPermission() {
        return this._noPermission.value;
    }

    protected setNoPermission() {
        this.status = FeatureStatus.NoPermission;
    }

    public get isNoPermissionRef() {
        return this._noPermission;
    }

    public get isSupported() {
        return this._supported.value;
    }

    protected setSupported() {
        this.status = FeatureStatus.Supported;
    }

    public get isSupportedRef() {
        return this._supported;
    }
}