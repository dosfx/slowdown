<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { clamp, fmtTime } from '../util';

const center = 50;

const props = defineProps<{ current: number, percent: number }>();
const emit = defineEmits<{ change: [value: number] }>();
const ringPath = useTemplateRef("ringPath");
const svg = useTemplateRef("svg");

const timeFmt = computed(() => fmtTime(props.current));

const dash = computed(() => {
    if (!ringPath.value) return "none";
    const clamped = clamp(props.percent, 0, 1);
    const width = parseInt(getComputedStyle(ringPath.value).strokeWidth);
    const circ = 2 * (center - (width / 2) - 1) * Math.PI;
    return `${clamped * circ}, ${circ}`;
});

let drag = {
    ing: false,
    rad: 0,
    now: 0,
}

function calcRad(event: PointerEvent) {
    const scale = parseFloat(getComputedStyle(svg.value!).width) / 100;
    return Math.atan2((event.offsetX / scale) - center, center - (event.offsetY / scale));
}

function endDrag(event: PointerEvent) {
    ringPath.value?.removeEventListener("pointermove", onPointerMove);
    ringPath.value?.removeEventListener("lostpointercapture", endDrag);
    ringPath.value?.releasePointerCapture(event.pointerId);
    drag.ing = false;
}

function onPointerDown(event: PointerEvent) {
    if (drag.ing) return;
    drag.ing = true;
    drag.now = Date.now();
    drag.rad = calcRad(event);
    ringPath.value?.setPointerCapture(event.pointerId);
    ringPath.value?.addEventListener("pointermove", onPointerMove);
    ringPath.value?.addEventListener("lostpointercapture", endDrag);
}

function onPointerMove(event: PointerEvent) {
    if (!drag.ing) return;
    const curNow = Date.now();
    if (curNow - drag.now < 100) return;
    const curRad = calcRad(event);
    let diff = curRad - drag.rad;
    if (Math.abs(diff) > Math.PI) {
        const pi2 = Math.PI * 2;
        diff = ((curRad + pi2) % pi2) - ((drag.rad + pi2) % pi2);
    }
    emit("change", diff);
    drag.now = curNow;
    drag.rad = curRad;
}

</script>

<template>
    <svg :class="$style.main" viewBox="0 0 100 100" ref="svg">
        <path :class="[$style.ring, $style.bg]" d="M 50 5 A 45 45 0 0 1 50 95 A 45 45 0 0 1 50 5" />
        <path :class="[$style.ring, $style.fg]" d="M 50 5 A 45 45 0 0 1 50 95 A 45 45 0 0 1 50 5" ref="ringPath"
            :stroke-dasharray="dash" @pointercancel="endDrag" @pointerdown.left="onPointerDown" />
        <text :class="$style.time" x="50" y="50" text-anchor="middle" alignment-baseline="middle">{{ timeFmt }}</text>
    </svg>
</template>

<style lang="css" module>
.main {
    width: 50vmin;
    height: 50vmin;
}

.time {
    fill: var(--fg);
}

.ring {
    fill: transparent;
    stroke-linecap: round;
    stroke-width: 8px;
}

.bg {
    stroke: var(--mg);
}

.fg {
    stroke: var(--ac);
}
</style>