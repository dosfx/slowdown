import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

export class Main {
    private seconds: number = 10;

    constructor(
        private ring: RingWrapper,
        private time: TimeWrapper,
    ) {
        ring.onChange(this.onRingChange.bind(this));
        ring.setPercent(100);
        time.setTime(this.seconds);
    }

    private onRingChange(change: number) {
        this.seconds += change;
        this.time.setTime(this.seconds);
    }
}