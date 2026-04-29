import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './stores'
import './styles/tailwind.css'

createApp(App).use(pinia).mount('#app')
