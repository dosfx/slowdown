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

    setPercent(percent: number) {
        percent = Math.min(Math.max(0, percent), 100);
        const d = ["M 50", this.center - this.radius];
        const rad = (percent / 50) * Math.PI;
        if (percent <= 50) {
            d.push("A", this.radius, this.radius, 0, 0, 1, this.center + (this.radius * Math.sin(rad)), this.center - (this.radius * Math.cos(rad)));
        } else {
            d.push("A", this.radius, this.radius, 0, 0, 1, this.center, this.center + this.radius);
            d.push("A", this.radius, this.radius, 0, 0, 1, this.center + (this.radius * Math.sin(rad)), this.center - (this.radius * Math.cos(rad)));
        }
        this.el.setAttribute("d", d.join(" "));
    }
}
