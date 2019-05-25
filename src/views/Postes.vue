<template>
    <div class="d-flex">
        <sub-menu title="Postes" subtitle="Gestion des postes" icon="compass" color="#f48642">
            <sub-menu-item v-for="poste in $store.state.postes" :to="{name: 'Gestion', params: {id: poste.id}}"
                           :title="poste.nom + ' (max: ' + poste.max + ', coeff: ' + poste.coefficient + ')'" :key="poste.id" />
            <br />
            <sub-menu-item :to="{name: 'Nouveau poste'}" title="Nouveau poste" />
            <sub-menu-item v-if="$store.state.postes.length > 0" :to="{name: 'Importer des scores'}" title="Importer des scores" />
        </sub-menu>
        <div class="flex-grow-1">
            <router-view />
        </div>
    </div>
</template>

<script>
import SubMenu from '../components/layout/SubMenu/SubMenu.vue';
import SubMenuItem from '../components/layout/SubMenu/SubMenuItem.vue';
import Poste from '../models/Poste';
import Course from '../models/Course';

export default {
    components: {
        SubMenu,
        SubMenuItem,
    },
    async mounted() {
        await Poste.findAll();
        await Course.findAll();
    },
};
</script>
