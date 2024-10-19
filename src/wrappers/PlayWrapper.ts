import { SignalDispatcher } from "ste-signals";
import { ButtonWrapper } from "./ButtonWrapper";
import { ElementWrapper } from "./ElementWrapper";

export class PlayWrapper extends ButtonWrapper {
    private readonly VisibilityAttr = "visibility";
    private readonly Collapse = "collapse";

    private readonly _onPlay = new SignalDispatcher();
    private readonly _onStop = new SignalDispatcher();
    private readonly playIcon: ElementWrapper;
    private readonly stopIcon: ElementWrapper;
    private _play: boolean;

    public constructor(query: string) {
        super(query);
        this.playIcon = this.child(".play-icon");
        this.stopIcon = this.child(".stop-icon");
        this.onClick.sub(this.onToggle.bind(this));
        this.play = true;
    }

    public get onPlay() {
        return this._onPlay.asEvent();
    }

    public get onStop() {
        return this._onStop.asEvent();
    }

    private get play() {
        return this._play;

    }

    private set play(play: boolean) {
        this._play = play;
        if (play) {
            this.playIcon.clearAttr(this.VisibilityAttr);
            this.stopIcon.setAttr(this.VisibilityAttr, this.Collapse);
        } else {
            this.playIcon.setAttr(this.VisibilityAttr, this.Collapse);
            this.stopIcon.clearAttr(this.VisibilityAttr);
        }
    }

    private onToggle() {
        this.play = !this.play;
        if (this.play) {
            this._onStop.dispatch();
        } else {
            this._onPlay.dispatch();
        }
    }
}