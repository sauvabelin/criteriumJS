import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/Settings.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Paramètres',
            component: Settings,
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
            path: '/resultats',
            name: 'Résultats',
            component: () => import(/* webpackChunkName: "resultats" */ './views/Resultats.vue'),
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
                {
                    path: 'importer-scores',
                    name: 'Importer des scores',
                    component: () => import(/* webpackChunkName: "importer-scores" */ './views/Postes/ImporterScores.vue'),
                },
            ],
        },
        {
            path: '/courses',
            name: 'Courses',
            component: () => import(/* webpackChunkName: "courses" */ './views/Courses.vue'),
            children: [
                {
                    path: 'nouveau',
                    name: 'Nouvelle course',
                    component: () => import(/* webpackChunkName: "nouvelle-course" */ './views/Courses/Nouvelle.vue'),
                },
                {
                    path: 'gestion/:id',
                    name: 'Gestion de course',
                    component: () => import(/* webpackChunkName: "gestion-course" */ './views/Courses/Gestion.vue'),
                },
                {
                    path: 'depart',
                    name: 'Départ de course',
                    component: () => import(/* webpackChunkName: "depart-course" */ './views/Courses/Depart.vue'),
                },
                {
                    path: 'arrivee',
                    name: 'Arrivée de course',
                    // eslint-disable-next-line
                    component: () => import(/* webpackChunkName: "arrivee-course" */ './views/Courses/Arrivee.vue'),
                },
            ],
        },

    ],
});

router.afterEach((to) => {
    document.title = `Criterium | ${to.name}`;
});

export default router;
