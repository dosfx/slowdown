<script setup lang="ts">
import { computed, inject, nextTick, ref, useTemplateRef } from 'vue';
import { SettingsKey } from '../settings';
import { FullscreenKey } from '../features/fullscreen';
import { clamp, fmtMinutes, fmtSeconds } from '../util';

const { current } = defineProps<{ current: number }>();
const emit = defineEmits<{ enter: [], exit: [] }>();
defineExpose({ hide, isVisible, show });

const fullscreen = inject(FullscreenKey)!;
const settings = inject(SettingsKey)!;

const active = ref(false);
const div = useTemplateRef("div");
const showRef = ref(false);
const sliderLeft = ref("0px");
const unlock = useTemplateRef("unlock");

const minFmt = computed(() => fmtMinutes(current));
const secFmt = computed(() => fmtSeconds(current));

async function hide() {
    if (!showRef.value) return;
    await fullscreen.exit();
}

function isVisible() {
    return showRef.value;
}

async function show() {
    if (showRef.value) return;
    if (!settings.Lock) return;
    showRef.value = true;
    await nextTick();
    if (!div.value) {
        showRef.value = false;
        return;
    };
    if (await fullscreen.enter(div.value)) {
        showRef.value = false;
    }
    sliderLeft.value = "0px";
    fullscreen.change.sub(onChange);
}

function onChange(enter: boolean) {
    if (enter) {
        emit("enter");
        return;
    }
    showRef.value = false;
    fullscreen.change.unsub(onChange);
    emit("exit");
}

let slideStart = 0;
let slideLength = 0;
let slidePointer = 0;

function onPointerDown(event: PointerEvent) {
    unlock.value?.addEventListener("pointermove", onPointerMove);
    unlock.value?.addEventListener("lostpointercapture", onPointerUp);
    slidePointer = event.pointerId;
    unlock.value?.setPointerCapture(slidePointer);
    slideLength = unlock.value?.clientWidth! - unlock.value?.clientHeight!;
    slideStart = event.clientX;
    active.value = true;
}

async function onPointerMove(event: PointerEvent) {
    const left = clamp(event.clientX - slideStart, 0, slideLength);
    if (left >= slideLength) {
        onPointerUp();
        await hide();
        return;
    }
    sliderLeft.value = `${left}px`;
}

function onPointerUp() {
    unlock.value?.removeEventListener("pointermove", onPointerMove);
    unlock.value?.removeEventListener("lostpointercapture", onPointerUp);
    unlock.value?.releasePointerCapture(slidePointer);
    sliderLeft.value = "0px";
    active.value = false;
}

</script>

<template>
    <div ref="div" v-if="showRef" :class="$style.lock">
        <span :class="$style.current" style="margin-top: 20vh;">{{ minFmt }}</span>
        <span :class="$style.current">{{ secFmt }}</span>
        <span :class="$style.spacer"></span>
        <div ref="unlock" :class="$style.unlock">
            <button :class="[$style.slider, { [$style.active]: active }]" :style="{ marginLeft: sliderLeft }"
                @pointerdown.left="onPointerDown" @pointerup.left="onPointerUp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style lang="less" module>
.lock {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.current {
    color: var(--mg);
    font-size: 20vmin;
    line-height: 16vmin;
}

.spacer {
    flex: 1;
}

.unlock {
    border-color: var(--bg);
    border-style: solid;
    border-radius: 7.5vmin;
    border-width: 1vmin;
    box-sizing: border-box;
    height: 15vmin;
    margin-bottom: 10vh;
    width: 80vmin;
}

.slider {
    aspect-ratio: 1 / 1;
    background-color: var(--bg);
    border: none;
    border-radius: 50%;
    height: 100%;
    text-align: center;

    &.active {
        background-color: var(--mg);
    }

    svg {
        width: 50%;
    }
}
</style>