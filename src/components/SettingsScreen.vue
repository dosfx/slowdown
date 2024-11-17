<script setup lang="ts">
import { inject, useTemplateRef } from 'vue';
import Dialog from './Dialog.vue';
import { AnimationSetting, SettingsKey, UnlockMethodSetting, VibrationPatternSetting } from '../settings';

const dialog = useTemplateRef("dialog");
defineExpose({ show });

const settings = inject(SettingsKey)!;
const animationRef = settings.AnimationRef;
const unlockRef = settings.UnlockRef;
const vibrationPatternRef = settings.VibrationPatternRef;

function show() {
    dialog.value?.show();
}

const patternsArray = {
    [VibrationPatternSetting.Long]: "none",
    [VibrationPatternSetting.Double]: "3 2 3",
    [VibrationPatternSetting.Triple]: "1.3 2 1.3 2 1.3",
};

</script>

<template>
    <Dialog :class="$style.dialog" @click.stop="" ref="dialog">
        <header>Settings</header>
        <section>
            <label>Animation</label>
            <button v-for="value in settings.AnimationValues" :class="{ [$style.active]: value == animationRef }"
                @click.left="animationRef = value">{{ AnimationSetting[value] }}</button>
        </section>
        <section>
            <label>Theme</label>
            <button :class="$style.active">Dark</button>
        </section>
        <section>
            <label>Vibration</label>
            <button v-for="value in settings.VibrationPatternValues"
                :class="{ [$style.active]: value == vibrationPatternRef }" @click.left="vibrationPatternRef = value">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 3">
                    <path d="M 1 2 L 9 2" :class="$style.vibration" stroke-width="1" stroke-linecap="round"
                        :stroke-dasharray="patternsArray[value]" />
                </svg>
            </button>
        </section>
        <section>
            <label>Unlock Style</label>
            <button v-for="value in settings.UnlockMethodValues" :class="{ [$style.active]: value == unlockRef }"
                @click.left="unlockRef = value">{{ UnlockMethodSetting[value] }}</button>
        </section>
    </Dialog>
</template>

<style lang="less" module>
.dialog {
    font-size: 4vmin;
    width: 100%;

    header {
        margin-bottom: 4vmin;
        text-align: center;
        width: 100%;
    }

    section {
        align-items: baseline;
        display: flex;
        margin-bottom: 1vmin;

        button {
            background-color: var(--mg);
            border-color: var(--ac);
            border-radius: 1.5vmin;
            border-style: solid;
            border-width: 1px;
            color: var(--ac);
            font-size: inherit;
            user-select: none;

            svg {
                width: 10vmin;
                height: 3vmin;

                .vibration {
                    stroke: var(--ac);
                }
            }
        }

        button.active {
            background-color: var(--ac);
            color: black;

            .vibration {
                stroke: black
            }
        }

        button:first-of-type {
            margin-left: auto;
        }

        button:not(:first-of-type) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: -1px;
        }

        button:not(:last-of-type) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
}
</style>