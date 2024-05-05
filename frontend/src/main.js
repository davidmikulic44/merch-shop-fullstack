import { createApp } from 'vue'
import './styles/_main.scss'
import App from './App.vue'
import router from './router/router.js'

const app = createApp(App)

app.use(router)
app.mount('#app')
