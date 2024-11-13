import { computed, Ref } from "vue";

export function activeColor(aRef: Ref<boolean, boolean>) {
    return computed(() => aRef.value ? "var(--fg)" : "black");
}

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(min, num), max);
}

export function fmtTime(seconds: number) {
    return fmtMinutes(seconds) + ":" + fmtSeconds(seconds); 
}

export function fmtMinutes(seconds: number) {
    return Math.floor(seconds / 60).toFixed(0).padStart(2, "0");
}

export function fmtSeconds(seconds: number) {
    return Math.floor(seconds % 60).toFixed(0).padStart(2, "0");
}
