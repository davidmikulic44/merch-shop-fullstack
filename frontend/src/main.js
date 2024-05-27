import { createApp } from 'vue'
import './styles/_main.scss'
import App from './App.vue'
import router from './router/router.js'
import VueSplide from '@splidejs/vue-splide';

const app = createApp(App)
app.use(router)
app.use(VueSplide)
app.mount('#app')
