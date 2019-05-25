<template>
    <div v-if="course">
        <div class="p-3">
            <h1>{{ course.nom }}</h1>
            <h2>Résultats pour cette course</h2>
        </div>
        <participants-liste :data="resultats" :details="false" :columns="[{title: 'Temps', dataIndex: 'temps'}]" />
        <div class="p-3">
            <h2>Participants n'ayant pas encore de temps de départ et/ou d'arrivée</h2>
        </div>
        <participants-liste :data="notFinishedParticipants" />
    </div>
</template>

<script>
import ParticipantsListe from '../../components/Participant/ParticipantsListe.vue';

export default {
    components: {
        ParticipantsListe,
    },
    mounted() {
        this.refresh();
    },
    watch: {
        $route() {
            this.refresh();
        },
    },
    methods: {
        async refresh() {
            setTimeout(() => {
                this.course.participantsPasFini().then((data) => {
                    this.notFinishedParticipants = data;
                    this.course.getResultats().then((results) => {
                        console.log(results);
                        this.resultats = results;
                    });
                });
            }, 200);
        },
    },
    data() {
        return {
            notFinishedParticipants: [],
            resultats: [],
        };
    },
    computed: {
        course() {
            return this.$store.getters.getCourse(this.$route.params.id);
        },
    },
};
</script>
