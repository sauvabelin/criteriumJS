<template>
    <div class="d-flex">
        <sub-menu title="Inscriptions" subtitle="Gérer les participants" icon="user" color="#41a5ff">
            <sub-menu-item :to="{name: 'Inscriptions'}" title="Liste des inscrits" />
            <sub-menu-item :to="{name: 'Importation'}" title="Importer" />
        </sub-menu>
        <div class="list-content">
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
};
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables";

    .list-content {
        width: calc(100% - #{$sub-menu-width});
    }
</style>
