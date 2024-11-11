import { reactive, readonly, ref } from "vue";

export enum FeatureStatus {
    Unsupported,
    NoPermission,
    Supported,
}

export class Feature {
    private readonly _status;
    private readonly _reactive;

    public constructor() {
        this._status = ref(FeatureStatus.Unsupported);
        this._reactive = reactive({
            isUnsupported: true,
            isNoPermission: false,
            isSupported: false,
        });
    }

    public get status() {
        return this._status.value;
    }

    protected set status(value: FeatureStatus) {
        this._status.value = value;
        this._reactive.isUnsupported = value === FeatureStatus.Unsupported;
        this._reactive.isNoPermission = value === FeatureStatus.NoPermission;
        this._reactive.isSupported = value === FeatureStatus.Supported;
    }

    public get statusRef() {
        return readonly(this._status);
    }

    public get statusReactive() {
        return readonly(this._reactive);
    }

    public get isUnsupported() {
        return this._reactive.isUnsupported;
    }

    protected setUnsupported() {
        this.status = FeatureStatus.Unsupported;
    }

    public get isNoPermission() {
        return this._reactive.isNoPermission;
    }

    protected setNoPermission() {
        this.status = FeatureStatus.NoPermission;
    }

    public get isSupported() {
        return this._reactive.isSupported;
    }

    protected setSupported() {
        this.status = FeatureStatus.Supported;
    }
}