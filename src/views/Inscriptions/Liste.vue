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
        </a-table>
    </div>
</template>

<script>
import { Table } from 'ant-design-vue';
import Participant from '../../models/Participant';

export default {
    components: {
        aTable: Table,
    },
    mounted() {
        Participant.findAll().then((data) => {
            this.data = data;
        });
    },
    data() {
        return {
            data: [],
            columns: [
                { title: 'ID', dataIndex: 'id' },
                { title: 'Dossard', dataIndex: 'dossard' },
                { title: 'Nom', dataIndex: 'nom' },
                { title: 'Prénom', dataIndex: 'prenom' },
                { title: 'Année', dataIndex: 'naissance' },
                { title: 'Unité', dataIndex: null, scopedSlots: { customRender: 'unite' } },
                { title: 'Sous-Unité', dataIndex: null, scopedSlots: { customRender: 'sousunite' } },
            ],
        };
    },
};
</script>
