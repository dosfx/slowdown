<script setup lang="ts">
import { inject, ref } from "vue";
import Button from "./components/Button.vue";
import Ring from "./components/Ring.vue";
import { SettingsKey } from "./settings";
import { clamp } from "./util";
import Dialog from "./components/Dialog.vue";
import { WakeLockKey } from "./features/wakelock";
import WakeLockAlert from "./components/WakeLockAlert.vue";

const settings = inject(SettingsKey)!;
const wakelock = inject(WakeLockKey)!;
const play = ref(true);
const current = ref(settings.Countdown);
const percent = ref(1);

let countdownReal = settings.Countdown;
let startMillis: number;
let intervalHandle: number | undefined;

async function onPlayClick() {
    if (play.value) {
        if (await onPlay()) return;
    } else {
        if (onStop()) return;
    }
    play.value = !play.value;
}

async function onPlay() {
    if (intervalHandle) return true;
    if (!await wakelock.request()) {
        return true;
    }
    startMillis = Date.now();
    intervalHandle = setInterval(onTick, settings.Interval);
    return false;
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
    if (!intervalHandle) return true;
    clearInterval(intervalHandle);
    intervalHandle = undefined;
    wakelock.release();
    current.value = settings.Countdown;
    percent.value = 1;
}

function onChange(value: number) {
    if (!play.value) return;
    value *= settings.Sensitivity;
    countdownReal = clamp(settings.Countdown + value, settings.CountdownMin, settings.CountdownMax);
    current.value = settings.Countdown = Math.floor(countdownReal);
}

const testShow = ref(false);

</script>

<template>
    <header>Slow Down!</header>
    <Ring :current :percent @change="onChange" />
    <footer>
        <Button class="play" @click="onPlayClick">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path v-if="play"
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                <path v-else
                    d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
        </Button>
        <Button toggle></Button>
        <Button @click="testShow = !testShow"></Button>
        <Button></Button>
    </footer>
    <WakeLockAlert />
    <Dialog v-model="testShow">
        <section>This is a modal message it has popped up to tell the user something. Tap anywhere to dismiss.</section>
    </Dialog>
</template>
