<script setup lang="ts">
import { inject, ref } from "vue";
import Button from "./components/Button.vue";
import PlayButton from "./components/PlayButton.vue";
import Ring from "./components/Ring.vue";
import { SettingsKey } from "./settings";
import { clamp } from "./util";

const settings = inject(SettingsKey)!;
const current = ref(settings.Countdown);
const percent = ref(1);

let startMillis: number;
let intervalHandle: number | undefined;

function onPlay() {
    if (intervalHandle) return;
    startMillis = Date.now();
    intervalHandle = setInterval(onTick, settings.Interval);
}

function onTick() {
    const remaining = settings.Countdown - ((Date.now() - startMillis) / 1000);
    if (remaining <= 0) {
        startMillis = Date.now();
    }
    current.value = Math.ceil(remaining);
    percent.value = remaining / settings.Countdown;
}

function onStop() {
    if (!intervalHandle) return;
    clearInterval(intervalHandle);
    intervalHandle = undefined;
    current.value = settings.Countdown;
    percent.value = 1;
}

function onChange(value: number) {
    if (intervalHandle) return;
    value *= settings.Sensitivity;
    current.value = settings.Countdown = clamp(settings.Countdown + value, settings.CountdownMin, settings.CountdownMax);
}

</script>

<template>
    <header>Slow Down!</header>
    <Ring :current :percent @change="onChange"></Ring>
    <footer>
        <PlayButton @play="onPlay" @stop="onStop" />
        <Button toggle></Button>
        <Button></Button>
        <Button></Button>
    </footer>
</template>
