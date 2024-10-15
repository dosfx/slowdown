import { Main } from "./Main";
import { Settings } from "./Settings";
import { ButtonWrapper } from "./wrappers/ButtonWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

self.addEventListener("DOMContentLoaded", () => {
    new Main(
        new ButtonWrapper("button.play"),
        new RingWrapper("svg .ring-fg"),
        new Settings(),
        new TimeWrapper("svg .time"),
    );
});