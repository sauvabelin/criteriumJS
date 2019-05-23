<template>
    <div>
        <div class="p-3">
            <h1>Participants</h1>
            <h3>La liste de tous les participants à la course</h3>
        </div>
        <a-table :dataSource="data" :columns="columns" rowKey="dossard">
            <span slot="moment" slot-scope="date">({{ date }})</span>
            <div slot="unite" slot-scope="item">{{ item.unite().nom }}</div>
            <div slot="sousunite" slot-scope="item">{{ item.sousUnite().nom }}</div>
            <div slot="expandedRowRender" slot-scope="item">
                <participant-details :participant="item" />
            </div>
        </a-table>
    </div>
</template>

<script>
import { Table } from 'ant-design-vue';
import ParticipantDetails from '../../components/Participant/ParticipantDetails.vue';
import Participant from '../../models/Participant';
import Course from '../../models/Course';
import Poste from '../../models/Poste';

export default {
    components: {
        aTable: Table,
        ParticipantDetails,
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
                { title: 'Dossard', dataIndex: 'dossard', fixed: 'left', key: 'dossard' },
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
