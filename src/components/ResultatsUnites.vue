<template>
    <div>
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-12 col-md-3">
                    Filtrer par sexe
                    <a-select v-model="sexe" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in ['homme', 'femme']" :key="y" :value="y">{{ y }}</a-select-option>
                    </a-select>
                </div>
            </div>
        </div>
        <a-table :columns="columns" :dataSource="resultatsUnites" rowKey="id" />
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { Table, Select } from 'ant-design-vue';
import { getSeconds } from '../filters/Time';
import Participant from '../models/Participant';
import CourseParticipant from '../models/CourseParticipant';
import PosteParticipant from '../models/PosteParticipant';
import { getUnite as exGetUnite, getSousUnite as exGetSousUnite } from '../unites';

export default {
    components: {
        aTable: Table,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    async mounted() {
        const participants = await Participant.findAll();
        const courseResults = await CourseParticipant.findAll();
        const posteResults = await PosteParticipant.findAll();
        this.participants = participants.map((participant) => {
            participant.courses = courseResults.filter(cr => cr.participantId === participant.id).filter(c => c.debut !== null && c.arrivee !== null);
            participant.postes = posteResults.filter(pr => pr.participantId === participant.id).filter(p => p.points !== null);
            return participant;
        });
    },
    data() {
        return {
            sexe: -1,
            participants: [],
            columns: [
                { title: 'Unité', customRender: item => item.unite.nom },
                { title: 'Participants comptabilisés', dataIndex: 'participants' },
                {
                    title: 'Score final',
                    dataIndex: 'total',
                    sorter: (a, b) => a.total - b.total,
                    sortDirections: ['descend', 'ascend'],
                },
            ],
        };
    },
    props: ['courses', 'postes', 'midcols'],
    methods: {
        getUnite(id) {
            return exGetUnite(id);
        },
        getSousUnite(id) {
            return exGetSousUnite(id);
        },
        diff(course) {
            return getSeconds(course.arrivee) - getSeconds(course.debut);
        },
    },
    computed: {
        unites() {
            const unites = this.sousUnite.map(sid => this.getSousUnite(sid).uid);
            return unites.filter((v, i) => unites.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        sousUnite() {
            let sousUnites = this.resultats.map(p => p.unitId);
            sousUnites = sousUnites.filter((v, i) => sousUnites.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
            if (this.sexe !== -1) sousUnites = sousUnites.filter(id => this.getUnite(this.getSousUnite(id).uid).sexe === this.sexe);
            return sousUnites;
        },
        resultatsUnites() {
            const { resultatsSousUnites } = this;
            return this.unites.map(uid => ({
                unite: this.getUnite(uid),
                sousUnites: resultatsSousUnites.filter(sudata => sudata.unite.uid === uid),
            })).map(rest => ({
                ...rest,
                participants: rest.sousUnites.flatMap(s => s.participants).length,
            })).map(rest2 => ({
                ...rest2,
                total: Math.round(rest2.sousUnites.reduce((acc, su) => acc + su.total, 0) / rest2.participants),
            }))
                .sort((a, b) => a.total > b.total);
        },
        resultatsSousUnites() {
            let data = this.sousUnite;
            if (this.sexe !== -1) data = data.filter(id => this.getUnite(this.getSousUnite(id).uid).sexe === this.sexe);
            return data.map(id => ({
                id,
                sousUnite: this.getSousUnite(id),
                participants: this.resultats.filter(p => p.unitId === id),
            })).map(rest => ({
                ...rest,
                unite: this.getUnite(rest.sousUnite.uid),
                total: rest.participants.reduce((acc, p) => acc + p.total, 0),
            }))
                .sort((a, b) => a.total > b.total);
        },
        resultats() {
            // Filtre selon les courses, seulement les participants qui ont des résultats dans toutes les courses
            const allPostes = this.$store.state.postes;
            const allCourses = this.$store.state.courses;
            const { courses, postes } = this;
            if (courses.length === 0 && postes.length === 0) return [];
            let { participants } = this;
            const maxPoints = postes.map(posteId => allPostes.find(p => p.id === posteId)).reduce((acc, p) => acc + (parseInt(p.max, 10) * parseInt(p.coefficient, 10)), 0);
            participants = participants.filter(p => courses.every(id => p.courses.map(pr => pr.courseId).includes(id)));
            participants = participants.filter(p => postes.every(id => p.postes.map(pr => pr.posteId).includes(id)));
            participants = participants.map((participant) => {
                participant.points = participant.postes.filter(p => postes.includes(p.posteId)).reduce((acc, p) => acc + p.points * (allPostes.find(ap => ap.id === p.posteId)).coefficient, 0);
                participant.temps = participant.courses.filter(c => courses.includes(c.courseId)).reduce((acc, c) => acc + this.diff(c) * (allCourses.find(ac => ac.id === c.courseId)).coefficient, 0);
                participant.total = participant.temps + maxPoints - participant.points;
                return participant;
            });
            return participants.sort((a, b) => a.total > b.total);
        },
    },
};
</script>
