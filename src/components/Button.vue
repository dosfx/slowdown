<script setup lang="ts">
const { toggle = false } = defineProps<{ toggle?: boolean }>();
const isActive = defineModel<boolean>({ default: false });
const emit = defineEmits<{ click: [] }>();
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

<style lang="css" module>
.btn {
    background-color: var(--mg);
    border: 0;
    border-radius: 50%;
    color: var(--fg);
    margin-bottom: 5vmin;
    width: 15vmin;
    height: 15vmin;
}

.active {
    border: 2px var(--fg) solid;
}
</style>