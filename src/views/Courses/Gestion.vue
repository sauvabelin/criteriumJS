<template>
    <div v-if="course">
        <div class="p-3 d-flex justify-content-between align-items-center">
            <div>
                <h1>{{ course.nom }}</h1>
                <h2>Résultats pour cette course</h2>
            </div>
            <div class="d-flex">
                <a-button type="dashed" class="mr-2" @click="exportDeparts">Exporter les départs</a-button>
                <a-button type="dashed" @click="modalCoeff = true">Changer le coefficient</a-button>
            </div>
        </div>
        <participants-liste :data="resultats" :columns="[{title: 'Temps', dataIndex: 'temps'}]" />
        <div class="p-3">
            <h2>Participants n'ayant pas encore de temps de départ et/ou d'arrivée</h2>
        </div>
        <participants-liste :data="notFinishedParticipants" />
        <set-property property="coefficient" :show="modalCoeff" :item="course" @close="modalCoeff = false" />
    </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { getSousUnite } from '../../unites';
import ParticipantsListe from '../../components/Participant/ParticipantsListe.vue';
import SetProperty from '../../components/SetProperty.vue';
import CourseParticipant from '../../models/CourseParticipant';
import Participant from '../../models/Participant';

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
        exportDeparts() {
            Participant.findAll().then((participants) => {
                CourseParticipant.findAll().then((courseParticipants) => {
                    const items = courseParticipants.filter(i => i.courseId === this.course.id);
                    const reduced = items.reduce((acc, item) => {
                        const participant = participants.find(p => p.id === item.participantId);
                        const { uid } = getSousUnite(participant.unitId);
                        if (!acc.has(uid)) acc.set(uid, item.arrivee);
                        return acc;
                    }, new Map());
                    let csv = 'data:text/csv;charset=utf-8,';
                    reduced.forEach((value, key) => {
                        const val = `${value.getHours()} ${value.getMinutes()} ${value.getSeconds()}`;
                        csv += `${key},${val}\n`;
                    });
                    const encodedUri = encodeURI(csv);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', 'export.csv');
                    document.body.appendChild(link);
                    link.click();
                });
            });
        },
        async refresh() {
            setTimeout(() => {
                this.course.participantsPasFini().then((data) => {
                    this.notFinishedParticipants = data;
                    this.course.getResultats().then((results) => {
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
