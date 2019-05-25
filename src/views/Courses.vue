<template>
    <div class="d-flex">
        <sub-menu title="Courses" subtitle="Gestion des courses" icon="flag" color="#009900">
            <sub-menu-item v-for="course in $store.state.courses" :to="{name: 'Gestion de course', params: {id: course.id}}"
                           :title="course.nom + ' (coeff: ' + course.coefficient + ')'" :key="course.id" />
            <br />
            <sub-menu-item :to="{name: 'Nouvelle course'}" title="Nouvelle course" />
            <sub-menu-item :to="{name: 'Départ de course'}" title="Départ de course" />
            <sub-menu-item :to="{name: 'Arrivée de course'}" title="Arrivée de course" />
        </sub-menu>
        <div class="flex-grow-1">
            <router-view />
        </div>
    </div>
</template>

<script>
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';
import SubMenuItem from '../components/layout/SubMenu/SubMenuItem.vue';
import Course from '../models/Course';

export default {
    components: {
        SubMenu,
        SubMenuItem,
    },
    async mounted() {
        await Course.findAll();
    },
};
</script>
