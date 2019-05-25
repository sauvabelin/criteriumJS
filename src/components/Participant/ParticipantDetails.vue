<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-6">
                <h3>Résultats aux courses</h3>
                <table style="width:100%;background:transparent">
                    <tr>
                        <th>Course</th>
                        <th>Départ</th>
                        <th>Arrivée</th>
                        <th>Temps total</th>
                    </tr>
                    <tr v-for="course in $store.state.courses" :key="course.id">
                        <td><b>{{ course.nom }}</b></td>
                        <td v-if="crs(course.id)">{{ crs(course.id).debut | printDate }}</td>
                        <td v-else>-</td>
                        <td v-if="crs(course.id)">{{ crs(course.id).arrivee | printDate }}</td>
                        <td v-else>-</td>
                        <td>{{ [crs(course.id).arrivee, crs(course.id).debut] | timeDiff }}</td>
                    </tr>
                </table>
            </div>
            <div class="col-12 col-md-6">
                <h3>Résultats aux postes</h3>
                <table style="width:100%;background:transparent">
                    <tr>
                        <th>Poste</th>
                        <th>Nombre de points</th>
                    </tr>
                    <tr v-for="poste in $store.state.postes" :key="poste.id">
                        <td><b>{{ poste.nom }}</b></td>
                        <td>{{ pst(poste.id) ? pst(poste.id).points: 'Rien' }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['participant'],
    async mounted() {
        this.postes = await this.participant.getPostesData();
        this.courses = await this.participant.getCoursesData();
    },
    data() {
        return {
            postes: [],
            courses: [],
        };
    },
    methods: {
        tempsTotal(courseId) {
            const course = this.crs(courseId);
            if (course === null || course.debut === null || course.arrivee === null) return null;
            return (course.arrivee - course.debut);
        },
        pst(id) {
            const poste = this.postes.find(p => p.posteId === id);
            return poste === undefined || poste === null ? { points: null } : poste;
        },
        crs(id) {
            const course = this.courses.find(c => c.courseId === id);
            return course === undefined || course === null ? { debut: null, arrivee: null } : course;
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .fwidth {
        width: calc(100vh - #{$sub-menu-width});
    }
</style>
