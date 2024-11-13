import { InjectionKey } from "vue";
import { Feature } from "./feature";
import { SimpleEventDispatcher } from "strongly-typed-events";

export const FullscreenKey = Symbol() as InjectionKey<Fullscreen>;

export class Fullscreen extends Feature {
    private readonly _change;
    public constructor() {
        super();
        this._change = new SimpleEventDispatcher<boolean>();
        if (!("fullscreenEnabled" in document)) return;
        if (!document.fullscreenEnabled) return;
        this.setSupported();
        document.addEventListener("fullscreenchange", this.onChange.bind(this));
    }

    public async enter(el: Element) {
        if (this.isNotSupported) return true;
        if (document.fullscreenElement !== null) return true;
        try {
            await el.requestFullscreen();
        } catch (e) {
            console.log(e);
            return true;
        }
        return false;
    }

    public async exit() {
        if (this.isNotSupported) return;
        await document.exitFullscreen();
    }

    public get change() {
        return this._change.asEvent();
    }

    private onChange() {
        this._change.dispatch(!!document.fullscreenElement);
    }
}