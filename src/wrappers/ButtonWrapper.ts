import { SignalDispatcher } from "ste-signals";
import { ElementWrapper } from "./ElementWrapper";

export class ButtonWrapper extends ElementWrapper {
    protected readonly ActiveAttr = "active";
    protected readonly ToggleAttr = "toggle";
    protected state: boolean;
    protected readonly _onClick = new SignalDispatcher();
    public readonly toggle: boolean;

    constructor(query: string) {
        super(query);
        this.toggle = this.hasAttr(this.ToggleAttr);
        this.on("mousedown", this.onDown);
        this.on("mouseup", this.onUp);
    }

    public get active(): boolean {
        return this.hasAttr(this.ActiveAttr);
    }

    public set active(a: boolean) {
        if (a) {
            this.setAttr(this.ActiveAttr);
        } else {
            this.clearAttr(this.ActiveAttr);
        }
    }

    public get onClick() {
        return this._onClick.asEvent();
    }

    protected onDown() {
        this.state = this.active;
        this.active = true;
    }

    protected onUp() {
        this.active = this.toggle && !this.state;
        this._onClick.dispatch();
    }
}
