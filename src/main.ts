import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
import { Settings, SettingsKey } from './settings';
import { WakeLockFeature, WakeLockKey } from './features/wakelock';

const app = createApp(App);
app.provide(SettingsKey, new Settings());
app.provide(WakeLockKey, new WakeLockFeature());
app.mount('.app');
