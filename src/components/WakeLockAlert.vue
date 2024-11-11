<script setup lang="ts">
import { inject } from 'vue';
import { WakeLockKey } from '../features/wakelock';

const wakelock = inject(WakeLockKey)!;
const wakelockStatus = wakelock.statusReactive;
</script>

<template>
    <div :class="$style.alert" v-if="!wakelockStatus.isSupported">
        <template v-if="wakelockStatus.isUnsupported">
            Slow Down! is not supported on your device.
        </template>
        <template v-if="wakelockStatus.isNoPermission">
            Slow Down! requires the Wake Lock permission to function.
        </template>
    </div>
</template>

<style lang="css" module>
.alert {
    background-color: darkred;
    position: absolute;
    text-align: center;
    width: 100%;
}
</style>