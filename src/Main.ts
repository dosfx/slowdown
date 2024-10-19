import { Settings } from "./Settings";
import { PlayWrapper } from "./wrappers/PlayWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

export class Main {
    public constructor(
        private play: PlayWrapper,
        private ring: RingWrapper,
        private settings: Settings,
        private time: TimeWrapper,
    ) {
        this.play.onPlay.sub(this.onPlay.bind(this));
        this.play.onStop.sub(this.onStop.bind(this));
        this.ring.onChange.sub(this.onRingChange.bind(this));
        this.ring.setPercent(100);
        this.time.setTime(this.settings.seconds);
    }

    private onPlay() {
        console.log("PLAY");
    }

    private onStop(){
        console.log("STOP");
    }

    private onRingChange(change: number) {
        this.settings.seconds += change;
        this.time.setTime(this.settings.seconds);
    }
}
