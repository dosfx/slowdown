import { computed, Ref } from "vue";

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(min, num), max);
}

export function activeColor(aRef: Ref<boolean, boolean>) {
    return computed(() => aRef.value ? "var(--fg)" : "black");
}