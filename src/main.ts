import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(store)

app.use(router)

app.use(Toast)

app.mount('#app')
