import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/inscriptions',
            component: () => import(/* webpackChunkName: "inscriptions" */ './views/Inscriptions.vue'),
            children: [
                {
                    path: '',
                    name: 'Inscriptions',
                    component: () => import(/* webpackChunkName: "liste-inscriptions" */ './views/Inscriptions/Liste.vue'),
                },
                {
                    path: 'import',
                    name: 'Importation',
                    component: () => import(/* webpackChunkName: "importation" */ './views/Inscriptions/Importation.vue'),
                },
            ],
        },
        {
            path: '/postes',
            name: 'Postes',
            component: () => import(/* webpackChunkName: "postes" */ './views/Postes.vue'),
            children: [
                {
                    path: 'nouveau',
                    name: 'Nouveau poste',
                    component: () => import(/* webpackChunkName: "nouveau-poste" */ './views/Postes/Nouveau.vue'),
                },
                {
                    path: 'gestion/:id',
                    name: 'Gestion',
                    component: () => import(/* webpackChunkName: "gestion-poste" */ './views/Postes/Gestion.vue'),
                },
            ],
        },
    ],
});
