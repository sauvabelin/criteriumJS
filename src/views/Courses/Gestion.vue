<template>
    <div v-if="course">
        <div class="p-3 d-flex justify-content-between align-items-center">
            <div>
                <h1>{{ course.nom }}</h1>
                <h2>Résultats pour cette course</h2>
            </div>
            <a-button type="dashed" @click="modalCoeff = true">Changer le coefficient</a-button>
        </div>
        <participants-liste :data="resultats" :details="false" :columns="[{title: 'Temps', dataIndex: 'temps'}]" />
        <div class="p-3">
            <h2>Participants n'ayant pas encore de temps de départ et/ou d'arrivée</h2>
        </div>
        <participants-liste :data="notFinishedParticipants" />
        <set-property property="coefficient" :show="modalCoeff" :item="course" @close="modalCoeff = false" />
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import ParticipantsListe from '../../components/Participant/ParticipantsListe.vue';
import SetProperty from '../../components/SetProperty.vue';

export default {
    components: {
        ParticipantsListe,
        SetProperty,
        aButton: Button,
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
            modalCoeff: false,
        };
    },
    computed: {
        course() {
            return this.$store.getters.getCourse(this.$route.params.id);
        },
    },
};
</script>
