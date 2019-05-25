import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import db from './db';
// eslint-disable-next-line
import { printSeconds, printDate, timeDiff } from './filters/Time';
import './registerServiceWorker';
import './assets/scss/main.scss';

Vue.use(Toasted, { duration: 5000, type: 'info' });
Vue.filter('printSeconds', printSeconds);
Vue.filter('printDate', printDate);
Vue.filter('timeDiff', timeDiff);

Vue.config.productionTip = false;

db.init().then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app');
});
