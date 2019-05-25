<template>
    <div>
        <participants-liste :data="resultats" :columns="columns" />
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { timeDiff, getSeconds, printSeconds } from '../../filters/Time';
import ParticipantsListe from './ParticipantsListe.vue';
import Participant from '../../models/Participant';
import CourseParticipant from '../../models/CourseParticipant';
import PosteParticipant from '../../models/PosteParticipant';

export default {
    components: {
        ParticipantsListe,
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
            participants: [],
        };
    },
    props: ['courses', 'postes', 'midcols'],
    methods: {
        diff(course) {
            return getSeconds(course.arrivee) - getSeconds(course.debut);
        },
    },
    computed: {
        columns() {
            // all courses and postes
            let columns = [];
            if (this.midcols) {
                const { courses, postes } = this.$store.state;
                const courseColumns = this.courses.map(id => ({
                    title: `Course ${courses.find(c => c.id === id).nom} (coeff: ${courses.find(c => c.id === id).coefficient})`,
                    customRender: (participant) => {
                        const course = participant.courses.find(c => c.courseId === id);
                        return course ? timeDiff([course.arrivee, course.debut]) : '-';
                    },
                }));
                const posteColumns = this.postes.map(id => ({
                    title: `Poste ${postes.find(p => p.id === id).nom} (coeff: ${postes.find(p => p.id === id).coefficient})`,
                    customRender: (participant) => {
                        const poste = participant.postes.find(p => p.posteId === id);
                        return poste ? poste.points : '-';
                    },
                }));
                columns = columns.concat(courseColumns).concat(posteColumns);
            }
            if (this.postes.length > 0) columns.push({ title: 'Points pondérés', customRender: participant => participant.points });
            if (this.courses.length > 0) columns.push({ title: 'Temps pondéré', customRender: participant => printSeconds(participant.temps) });
            if (this.courses.length > 0 || this.postes.length > 0) columns.push({ title: 'Score final', customRender: participant => participant.total });
            return columns;
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
