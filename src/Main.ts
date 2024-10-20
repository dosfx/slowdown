import { Settings } from "./Settings";
import { PlayWrapper } from "./wrappers/PlayWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

export class Main {
    private intervalHandle?: number;
    private startMillis: number;

    public constructor(
        private play: PlayWrapper,
        private ring: RingWrapper,
        private settings: Settings,
        private time: TimeWrapper,
    ) {
        this.play.onPlay.sub(this.onPlay.bind(this));
        this.play.onStop.sub(this.onStop.bind(this));
        this.ring.onChange.sub(this.onRingChange.bind(this));
        this.reset();
    }

    private get ticking() {
        return this.intervalHandle !== undefined;
    }

    private reset() {
        this.ring.setPercent(1);
        this.time.setTime(this.settings.Countdown);
    }

    private onPlay() {
        if (this.ticking) return;
        this.startMillis = Date.now();
        this.intervalHandle = setInterval(this.onTick.bind(this), this.settings.Interval);
    }

    private onTick() {
        const remaining = this.settings.Countdown - ((Date.now() - this.startMillis) / 1000);
        if (remaining <= 0) {
            this.startMillis = Date.now();
            navigator.vibrate(this.settings.VibrationPattern);
        }
        this.time.setTime(Math.ceil(remaining));
        this.ring.setPercent(remaining / this.settings.Countdown);
    }

    private onStop() {
        if (!this.ticking) return;
        clearInterval(this.intervalHandle);
        this.intervalHandle = undefined;
        this.reset();
    }

    private onRingChange(change: number) {
        if (this.ticking) return;
        let countdown = this.settings.Countdown + change;
        countdown = Math.min(Math.max(this.settings.CountdownMin, countdown), this.settings.CountdownMax);
        this.settings.Countdown = countdown;
        this.time.setTime(this.settings.Countdown);
    }
}
