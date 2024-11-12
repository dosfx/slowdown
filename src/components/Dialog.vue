<script setup lang="ts">
import { ref } from 'vue';

defineExpose({ hide, show });

const showRef = ref(false);

function hide() {
    showRef.value = false;
}

function show() {
    showRef.value = true;
}
</script>

<template>
    <Transition :enter-from-class="$style.hidden" :leave-to-class="$style.hidden"
        :enter-active-class="$style.transitionActive" :leave-active-class="$style.transitionActive">
        <div :class="$style.overlay" v-if="showRef" @click="showRef = false">
            <div :class="$style.dialog">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<style lang="less" module>
.overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}

.dialog {
    background-color: var(--bg);
    border: 1px solid var(--fg);
    border-radius: 2vmin;
    max-width: 80vmin;
    padding: 4vmin;
    z-index: 1;
}

.hidden {
    opacity: 0;

    .dialog {
        transform: translateY(-60%);
    }
}

@duration: 0.5s;
@transition: opacity @duration, transform @duration;

.transitionActive {
    transition: opacity @duration;

    .dialog {
        transition: opacity @duration, transform @duration;
    }
}
</style>