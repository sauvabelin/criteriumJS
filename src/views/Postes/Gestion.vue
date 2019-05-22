<template>
    <div>
        <div class="p-3">
            <h1>{{ poste.nom }}</h1>
            <h3>Gestion du poste</h3>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        poste() {
            return this.$store.getters.getPoste(this.$route.params.id);
        },
    },
};
</script>
