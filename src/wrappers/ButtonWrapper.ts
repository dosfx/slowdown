import { ElementWrapper } from "./ElementWrapper";

export class ButtonWrapper extends ElementWrapper {
    protected static readonly ActiveAttr = "active";
    protected static readonly ToggleAttr = "toggle";
    protected state: boolean;
    protected clickHandler?: () => void;
    public readonly toggle: boolean;

    constructor(query: string) {
        super(query);
        this.toggle = this.el.hasAttribute(ButtonWrapper.ToggleAttr);
        this.on("mousedown", this.onDown);
        this.on("mouseup", this.onUp);
    }

    public get active(): boolean {
        return this.el.hasAttribute(ButtonWrapper.ActiveAttr);
    }

    public set active(a: boolean) {
        if (a) {
            this.el.setAttribute(ButtonWrapper.ActiveAttr, "");
        } else {
            this.el.removeAttribute(ButtonWrapper.ActiveAttr);
        }
    }

    public onClick(handler: () => void) {
        if (this.clickHandler) {
            throw new Error("Cannot register multiple click handlers");
        }
        this.clickHandler = handler;
    }

    protected onDown() {
        this.state = this.active;
        this.active = true;
    }

    protected onUp() {
        this.active = this.toggle && !this.state;
        if (this.clickHandler) {
            this.clickHandler();
        }
    }
}
