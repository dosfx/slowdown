import { Main } from "./Main";
import { Settings } from "./Settings";
import { ButtonWrapper } from "./wrappers/ButtonWrapper";
import { PlayWrapper } from "./wrappers/PlayWrapper";
import { RingWrapper } from "./wrappers/RingWrapper";
import { TimeWrapper } from "./wrappers/TimeWrapper";

self.addEventListener("DOMContentLoaded", () => {
    new Main(
        new PlayWrapper("button.play"),
        new RingWrapper("svg .ring-fg"),
        new Settings(),
        new TimeWrapper("svg .time"),
    );
});