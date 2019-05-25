<template>
    <div>
        <div class="p-3">
            <h1>Participants</h1>
            <h3>La liste de tous les participants à la course</h3>
        </div>
        <participants-liste :data="data" />
    </div>
</template>

<script>
import ParticipantsListe from '../../components/Participant/ParticipantsListe.vue';
import Participant from '../../models/Participant';
import Course from '../../models/Course';
import Poste from '../../models/Poste';

export default {
    components: {
        ParticipantsListe,
    },
    async mounted() {
        await Course.findAll();
        await Poste.findAll();
        Participant.findAll().then((data) => {
            this.data = data;
        });
    },
    data() {
        return {
            data: [],
            columns: [
                { title: 'Dossard', dataIndex: 'dossard', key: 'dossard' },
                { title: 'Nom', dataIndex: 'nom', key: 'nom' },
                { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
                { title: 'Année', dataIndex: 'naissance', key: 'naissance' },
                { title: 'Unité', dataIndex: null, scopedSlots: { customRender: 'unite' } },
                { title: 'Sous-Unité', dataIndex: null, scopedSlots: { customRender: 'sousunite' } },
            ],
        };
    },
};
</script>
