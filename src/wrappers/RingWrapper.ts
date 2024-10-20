import { SimpleEventDispatcher } from "ste-simple-events";
import { ElementWrapper } from "./ElementWrapper";

type Coords = [number, number];

export class RingWrapper extends ElementWrapper {
    private readonly center: number;
    private readonly width: number;
    private readonly radius: number;
    private readonly _onChange = new SimpleEventDispatcher<number>();
    private dragging = false;
    private lastRad = 0;
    private lastNow = 0;

    public constructor(query: string) {
        super(query);
        this.center = 50;
        this.width = parseInt(getComputedStyle(this.el).strokeWidth);
        this.radius = this.center - (this.width / 2) - 1;
        this.on("pointercancel", this.endDrag);
        this.on("pointerdown", this.onPointerDown);
        this.on("pointerup", this.endDrag);
    }

    public get onChange() {
        return this._onChange.asEvent();
    }

    public setPercent(percent: number) {
        percent = Math.min(Math.max(0, percent), 1);
        const d = ["M 50", this.center - this.radius];
        const [x, y] = this.getCoords(this.radius, (percent / 0.5) * Math.PI)
        if (percent <= 0.5) {
            d.push("A", this.radius, this.radius, 0, 0, 1, x, y);
        } else {
            d.push("A", this.radius, this.radius, 0, 0, 1, this.center, this.center + this.radius);
            d.push("A", this.radius, this.radius, 0, 0, 1, x, y);
        }
        this.el.setAttribute("d", d.join(" "));
    }

    private getCoords(r: number, rad: number): Coords {
        return [
            this.center + (r * Math.sin(rad)),
            this.center - (r * Math.cos(rad)),
        ];
    }

    private getRad(x: number, y: number): number {
        return Math.atan2(x - this.center, this.center - y);
    }

    private getScaledCoords(event: MouseEvent): Coords {
        const scale = parseFloat(getComputedStyle(this.el.parentElement!).width) / 100;
        return [event.offsetX / scale, event.offsetY / scale];
    }

    private endDrag(event: PointerEvent) {
        this.off("pointermove", this.onPointerMove);
        this.off("lostpointercapture", this.endDrag);
        this.el.releasePointerCapture(event.pointerId);
        this.dragging = false;
    }

    private onPointerDown(event: PointerEvent) {
        if (this.dragging) return;
        this.dragging = true;
        this.lastRad = this.getRad(...this.getScaledCoords(event));
        this.lastNow = Date.now();
        this.el.setPointerCapture(event.pointerId);
        this.on("pointermove", this.onPointerMove);
        this.on("lostpointercapture", this.endDrag);
    }

    private onPointerMove(event: PointerEvent) {
        if (!this.dragging) return;
        const curNow = Date.now();
        if (curNow - this.lastNow < 100) return;
        const curRad = this.getRad(...this.getScaledCoords(event));
        let diff = curRad - this.lastRad;
        if (Math.abs(diff) > Math.PI) {
            const pi2 = Math.PI * 2;
            diff = ((curRad + pi2) % pi2) - ((this.lastRad + pi2) % pi2);
        }
        this._onChange.dispatch(Math.floor(diff * 30));
        this.lastRad = curRad;
        this.lastNow = curNow;
    }
}
