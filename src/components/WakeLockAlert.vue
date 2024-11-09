<script setup lang="ts">
import { inject } from 'vue';
import { WakeLockKey } from '../features/wakelock';

const wakelock = inject(WakeLockKey)!;
const supported = wakelock.isSupportedRef;
const noPermission = wakelock.isNoPermissionRef;
const unsupported = wakelock.isUnsupportedRef;
</script>

<template>
    <div :class="$style.alert" v-if="!supported">
        <template v-if="unsupported">
            Slow Down! is not supported on your device.
        </template>
        <template v-if="noPermission">
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