<template>
    <div>
        <div class="p-3">
            <h1>{{ course.nom }}</h1>
            <h3>Gestion de course</h3>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        course() {
            return this.$store.getters.getCourse(this.$route.params.id);
        },
    },
};
</script>
