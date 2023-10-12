import { createApp } from 'vue'
import App from './App.vue'
import { Popup } from "vant";
import 'vant/lib/index.css';
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";
import 'default-passive-events';

const app = createApp(App)

app.use(Popup);
app.use(VueDragResizeRotate);
app.mount('#app')
