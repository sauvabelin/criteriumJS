<template>
    <div class="d-flex">
        <sub-menu title="Inscriptions" subtitle="Gérer les participants" icon="user" color="#41a5ff">
            <sub-menu-item :to="{name: 'Inscriptions'}" title="Liste des inscrits" />
            <sub-menu-item :to="{name: 'Importation'}" title="Importer" />
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
};
</script>
