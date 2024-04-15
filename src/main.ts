import { createApp } from 'vue';
import '@/assets/reset.css';
import App from '@/App.vue';
import pinia from '@/store';
import router from '@/router'

createApp(App).use(pinia).use(router).mount('#app')
