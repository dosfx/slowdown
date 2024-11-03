<script setup lang="ts">
import { ref } from "vue";
const { toggle = false } = defineProps<{ toggle?: boolean }>();
const emit = defineEmits<{ click: [] }>();
const isActive = ref(false);
let state = false;

function mousedown() {
    state = isActive.value;
    isActive.value = true;
}

function mouseup() {
    isActive.value = toggle && !state;
    emit("click");
}
</script>

<template>
    <button :class="[$style.btn, { [$style.active]: isActive }]" @mousedown.left="mousedown" @mouseup.left="mouseup">
        <slot></slot>
    </button>
</template>

<style lang="less" module>
.btn {
    background-color: var(--mg);
    border: 0;
    border-radius: 50%;
    color: var(--fg);
    font-size: 5vmin;
    margin-bottom: 5vmin;
    width: 15vmin;
    height: 15vmin;

    svg {
        width: 40%;
    }
}

.active {
    border: 2px var(--fg) solid;
}
</style>