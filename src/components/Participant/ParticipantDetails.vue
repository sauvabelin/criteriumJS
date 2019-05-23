<template>
    <div>
        <div class="row fwidth">
            <div class="col-12 col-md-6">
                <h3>Résultats aux courses</h3>
                <table style="width:100%;background:transparent">
                    <tr>
                        <th>Course</th>
                        <th>Départ</th>
                        <th>Arrivée</th>
                    </tr>
                    <tr v-for="course in $store.state.courses" :key="course.id">
                        <td><b>{{ course.nom }}</b></td>
                        <td>{{ exist(course.id) ? prt(exist(course.id).debut) : 'Rien' }}</td>
                        <td>{{ exist(course.id) ? prt(exist(course.id).arrivee) : 'Rien' }}</td>
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
        this.courses = await this.participant.getCoursesData();
    },
    data() {
        return {
            courses: [],
        };
    },
    methods: {
        exist(id) {
            return this.courses.find(c => c.courseId === id);
        },
        prt(date) {
            return date === null ? 'Rien' : date.toLocaleString();
        },
    },
};
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .fwidth {
        width: 1180px;
    }
</style>
