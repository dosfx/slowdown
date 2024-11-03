import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { Settings, SettingsKey } from './settings'

const app = createApp(App);
app.provide(SettingsKey, new Settings());
app.mount('.app')
