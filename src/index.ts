import { Main } from "./Main";
import { ButtonWrapper } from "./wrappers/ButtonWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

self.addEventListener("DOMContentLoaded", () => {
    new Main(
        new RingWrapper("svg .ring-fg"),
        new TimeWrapper("svg .time"),
    );
    const play = new ButtonWrapper("button.play");
});