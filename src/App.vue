<script setup lang="ts">
import { inject, ref } from "vue";
import Button from "./components/Button.vue";
import Ring from "./components/Ring.vue";
import { SettingsKey } from "./settings";
import { activeColor, clamp } from "./util";
import Dialog from "./components/Dialog.vue";
import { WakeLockKey } from "./features/wakelock";
import WakeLockAlert from "./components/WakeLockAlert.vue";
import { VibrationKey } from "./features/vibration";

const settings = inject(SettingsKey)!;
const vibration = inject(VibrationKey)!;
const wakelock = inject(WakeLockKey)!;
const lockSetting = settings.LockRef;
const vibrationSetting = settings.VibrationRef;
const play = ref(true);
const current = ref(settings.Countdown);
const percent = ref(1);

const showRequestDialog = ref(false);
const showReleaseDialog = ref(false);

wakelock.releaseSignal.subscribe(onRelease);

let countdownReal = settings.Countdown;
let startMillis: number;
let intervalHandle: number | undefined;

async function onPlayClick() {
    if (play.value) {
        await onPlay();
    } else {
        await onStop();
    }
}

async function onPlay() {
    if (intervalHandle) return;
    if (!await wakelock.request()) {
        showRequestDialog.value = true;
        return;
    }
    startMillis = Date.now();
    intervalHandle = setInterval(onTick, settings.Interval);
    play.value = false;
}

function onTick() {
    const remaining = settings.Countdown - ((Date.now() - startMillis) / 1000);
    if (remaining <= 0) {
        startMillis = Date.now();
        vibration.vibrate();
    }
    current.value = Math.ceil(remaining);
    percent.value = remaining / settings.Countdown;
}

async function onStop() {
    if (!intervalHandle) return;
    clearInterval(intervalHandle);
    intervalHandle = undefined;
    await wakelock.release();
    current.value = settings.Countdown;
    percent.value = 1;
    play.value = true;
}

function onChange(value: number) {
    if (!play.value) return;
    value *= settings.Sensitivity;
    countdownReal = clamp(settings.Countdown + value, settings.CountdownMin, settings.CountdownMax);
    current.value = settings.Countdown = Math.floor(countdownReal);
}

function onRelease() {
    onStop();
    showReleaseDialog.value = true;
}

const vibActive = activeColor(vibrationSetting);
const lockActive = activeColor(lockSetting);
</script>

<template>
    <header>Slow Down!</header>
    <Ring :current :percent @change="onChange" />
    <footer>
        <Button class="play" @click="onPlayClick">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40%">
                <path v-if="play"
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                <path v-else
                    d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
        </Button>
        <Button v-model="vibrationSetting" toggle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%">
                <circle cx="50" cy="50" r="10" :fill="vibActive" />
                <g fill="transparent" stroke-width="8" stroke-linecap="round" :stroke="vibActive">
                    <path d="M 35.8579 35.8579 A 20 20 1.5708 0 0 35.8579 64.1421" />
                    <path d="M 64.1421 35.8579 A 20 20 1.5708 0 1 64.1421 64.1421" />
                    <path d="M 25.2513 25.2513 A 35 35 1.5708 0 0 25.2513 74.7487" />
                    <path d="M 74.7487 25.2513 A 35 35 1.5708 0 1 74.7487 74.7487" />
                </g>
            </svg>
        </Button>
        <Button v-model="lockSetting" toggle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="60%">
                <path :fill="lockActive"
                    d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
            </svg>
        </Button>
    </footer>
    <WakeLockAlert />
    <Dialog v-model="showReleaseDialog">
        <section>Show Down! lost focus. Counter has been reset. Tap anywhere to dismiss.</section>
    </Dialog>
    <Dialog v-model="showRequestDialog">
        <section>Slow Down! cannot obtain a Wake Lock. This prevents your screen from dimming or locking, which would
            stop the countdown.</section>
    </Dialog>
</template>
