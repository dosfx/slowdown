import { ElementWrapper } from "./ElementWrapper";

export class TimeWrapper extends ElementWrapper{
    setTime(seconds: number) {
        this.el.textContent =
            (seconds / 60).toFixed(0).padStart(2, "0") + ":" +
            (seconds % 60).toFixed(0).padStart(2, "0");
    }
}