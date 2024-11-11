import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
import { Settings, SettingsKey } from './settings';
import { WakeLockFeature, WakeLockKey } from './features/wakelock';
import { VibrationFeature, VibrationKey } from './features/vibration';

const app = createApp(App);
const settings = new Settings();
app.provide(SettingsKey, settings);
app.provide(VibrationKey, new VibrationFeature(settings));
app.provide(WakeLockKey, new WakeLockFeature());
app.mount('.app');
