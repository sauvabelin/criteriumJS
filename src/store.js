/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        postes: [],
        courses: [],
    },
    getters: {
        getPoste: state => id => state.postes.find(p => p.id === id),
        getCourse: state => id => state.courses.find(c => c.id === id),
    },
    mutations: {
        addPoste: (state, poste) => {
            state.postes.push(poste);
        },
        cleanPostes: (state) => {
            state.postes.splice(0);
        },
        updatePoste: (state, poste) => {
            state.postes[state.postes.findIndex(p => p.id === poste.id)] = poste;
        },
    },
});
