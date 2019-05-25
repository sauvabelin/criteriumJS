<template>
    <div class="d-flex">
        <sub-menu title="Résultats" subtitle="Calculateur des résultats" icon="trophy" color="#eadb0e">
            <p>Vous pouvez sélectionner les postes et courses qui doivent entrer en jeu dans le calcul du résultat</p>
            <sub-menu-category title="Courses" />
            <div v-for="course in $store.state.courses" :key="course.id">
                <a-checkbox :default-checked="true" @change="toggleCourse($event, course.id)">{{ course.nom }}</a-checkbox>
            </div>
            <sub-menu-category title="Postes" class="mt-3" />
            <div v-for="poste in $store.state.postes" :key="poste.id">
                <a-checkbox :default-checked="true" @change="togglePoste($event, poste.id)">{{ poste.nom }}</a-checkbox>
            </div>
        </sub-menu>
        <div class="flex-grow-1">
            <div class="p-3">
                <h1>Résultats</h1>
            </div>
            <resultats :postes="postes" :courses="courses" />
        </div>
    </div>
</template>

<script>
import { Checkbox } from 'ant-design-vue';
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';
import SubMenuCategory from '../components/layout/SubMenu/SubMenuCategory.vue';
import Resultats from '../components/Participant/Resultats.vue';

import Poste from '../models/Poste';
import Course from '../models/Course';

export default {
    components: {
        SubMenu,
        SubMenuCategory,
        aCheckbox: Checkbox,
        Resultats,
    },
    async mounted() {
        await Poste.findAll();
        await Course.findAll();
        this.$store.state.postes.forEach((poste) => {
            this.postes.push(poste.id);
        });
        this.$store.state.courses.forEach((course) => {
            this.courses.push(course.id);
        });
    },
    methods: {
        toggleCourse(e, id) {
            const index = this.courses.indexOf(id);
            if (!e.target.checked && index !== -1) this.courses.splice(index, 1);
            if (e.target.checked && index === -1) this.courses.push(id);
        },
        togglePoste(e, id) {
            const index = this.postes.indexOf(id);
            if (!e.target.checked && index !== -1) this.postes.splice(index, 1);
            if (e.target.checked && index === -1) this.postes.push(id);
        },
    },
    data() {
        return {
            courses: [],
            postes: [],
        };
    },
};
</script>
