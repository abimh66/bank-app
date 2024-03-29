import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);
const pinia = createPinia();

app.use(VueApexCharts);
app.use(router);
app.use(pinia);
app.mount('#app');
