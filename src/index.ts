import { ButtonWrapper } from "./wrappers/ButtonWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

self.addEventListener("DOMContentLoaded", () => {
    const ringBg = new RingWrapper("svg .ring-bg");
    const ring = new RingWrapper("svg .ring-fg");
    const time = new TimeWrapper("svg .time");
    const play = new ButtonWrapper("button.play");
    let running: number | null;
    let startTime = 0;
    let seconds = 60;
    ringBg.setPercent(100);
    ring.setPercent(40);
    time.setTime(seconds);
    play.onClick(() => {
        if (running) {
            clearInterval(running);
            running = null;
        } else {
            startTime = Date.now();
            running = setInterval(() => {
                const duration = Date.now() - startTime;
                time.setTime(duration / 1000);
            }, 500);
        }
    });
});