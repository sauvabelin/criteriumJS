import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import db from './db';
import './assets/scss/main.scss';

Vue.use(Toasted, { duration: 5000, type: 'info' });
Vue.config.productionTip = false;

db.init().then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
