import { ElementWrapper } from "./ElementWrapper";

export class RingWrapper extends ElementWrapper{
    private readonly center: number;
    private readonly width: number;
    private readonly radius: number;

    constructor(query: string) {
        super(query);
        this.center = 50;
        this.width = parseInt(getComputedStyle(this.el).strokeWidth);
        this.radius = this.center - (this.width / 2) - 1;
    }

    getCoords(r: number, rad: number): [number, number] {
        return [
            this.center + (r * Math.sin(rad)),
            this.center - (r * Math.cos(rad)),
        ];
    }

    getRad(x: number, y: number): number {
        return Math.atan2(x - this.center, this.center - y);
    }

    getScaledCoords(event: MouseEvent): [number, number] {
        const scale = parseFloat(getComputedStyle(this.el.parentElement).width) / 100;
        console.log(event.offsetX, scale);
        return [event.offsetX / scale, event.offsetY / scale];
    }

    setPercent(percent: number) {
        percent = Math.min(Math.max(0, percent), 100);
        const d = ["M 50", this.center - this.radius];
        const [x, y] = this.getCoords(this.radius, (percent / 50) * Math.PI)
        if (percent <= 50) {
            d.push("A", this.radius, this.radius, 0, 0, 1, x, y);
        } else {
            d.push("A", this.radius, this.radius, 0, 0, 1, this.center, this.center + this.radius);
            d.push("A", this.radius, this.radius, 0, 0, 1, x, y);
        }
        this.el.setAttribute("d", d.join(" "));
    }
}
