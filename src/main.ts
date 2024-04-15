import { createApp } from 'vue';
import '@/assets/reset.css';
import App from '@/App.vue';
import pinia from '@/store';
import router from '@/router';
import Antd from 'ant-design-vue';

createApp(App).use(pinia).use(router).use(Antd).mount('#app')
