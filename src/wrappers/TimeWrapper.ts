import { ElementWrapper } from "./ElementWrapper";

export class TimeWrapper extends ElementWrapper{
    setTime(seconds: number) {
        seconds = Math.min(Math.max(0, seconds), (99 * 60) + 59);
        this.el.textContent =
            Math.floor(seconds / 60).toFixed(0).padStart(2, "0") + ":" +
            Math.floor(seconds % 60).toFixed(0).padStart(2, "0");
    }
}