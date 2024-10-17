import { ElementWrapper } from "./ElementWrapper";

export class ButtonWrapper extends ElementWrapper {
    protected readonly ActiveAttr = "active";
    protected readonly ToggleAttr = "toggle";
    protected state: boolean;
    protected clickHandler?: () => void;
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
