const play = document.querySelector(".play")!;

export function onPlay(handler: () => void) {
    play.addEventListener("click", handler);
}