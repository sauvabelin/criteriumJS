<template>
    <div class="d-flex">
        <sub-menu title="Postes" subtitle="Les postes enregistrés" icon="compass" color="#f48642">
            <sub-menu-item v-for="course in $store.state.courses" :to="{name: 'Course', params: {id: course.id}}"
                           :title="course.nom" :key="course.id" />
            <br />
            <sub-menu-item :to="{name: 'Nouvelle course'}" title="Nouvelle course" />
        </sub-menu>
        <div class="flex-grow-1">
            <router-view />
        </div>
    </div>
</template>

<script>
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';
import SubMenuItem from '../components/layout/SubMenu/SubMenuItem.vue';

export default {
    components: {
        SubMenu,
        SubMenuItem,
    },
    async mounted() {
    },
    data() {
        return {
        };
    },
};
</script>
