<template>
    <div class="d-flex">
        <sub-menu title="Postes" subtitle="Les postes enregistrés" icon="compass" color="#f48642">
            <sub-menu-item v-for="poste in $store.state.postes" :to="{name: 'Gestion', params: {id: poste.id}}"
                           :title="poste.nom + ' (max: ' + poste.max + ', coeff: ' + poste.coefficient + ')'" :key="poste.id" />
            <br />
            <sub-menu-item :to="{name: 'Nouveau poste'}" title="Nouveau poste" />
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
import db from '../db';

export default {
    components: {
        SubMenu,
        SubMenuItem,
    },
    async mounted() {
        console.log(db.alasql);
        await Poste.findAll();
    },
    data() {
        return {
        };
    },
};
</script>
