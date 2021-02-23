import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import Pagination from 'v-pagination-3';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('pagination', Pagination);

store.dispatch('cart/getCart').then((responce) => {});

app.mount('#app');

