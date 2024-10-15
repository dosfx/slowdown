import { Settings } from "./Settings";
import { ButtonWrapper } from "./wrappers/ButtonWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

export class Main {
    constructor(
        private play: ButtonWrapper,
        private ring: RingWrapper,
        private settings: Settings,
        private time: TimeWrapper,
    ) {
        play.onClick(this.onPlayClick.bind(this));
        ring.onChange(this.onRingChange.bind(this));
        ring.setPercent(100);
        time.setTime(this.settings.seconds);
    }

    private onPlayClick() {

    }

    private onRingChange(change: number) {
        this.settings.seconds += change;
        this.time.setTime(this.settings.seconds);
    }
}
