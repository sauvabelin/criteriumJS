import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import db from './db';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

db.init().then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
