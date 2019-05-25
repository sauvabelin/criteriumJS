<template>
    <div>
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-12 col-md-3">
                    Filtrer par année
                    <a-select v-model="year" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in annees" :key="y" :value="y">{{ y }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-3">
                    Filtrer par unité
                    <a-select v-model="unit" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in unites" :key="y" :value="y">{{ getUnite(y).nom }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-3">
                    Filtrer par sous-unité
                    <a-select v-model="subUnit" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in sousUnite" :key="y" :value="y">{{ getSousUnite(y).nom }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-3">
                    Filtrer par sexe
                    <a-select v-model="xxx" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in sexe" :key="y" :value="y">{{ y }}</a-select-option>
                    </a-select>
                </div>
            </div>
        </div>
        <div :class="{bordered: border}">
            <a-table :dataSource="participants" :columns="cls" rowKey="dossard">
                <span slot="moment" slot-scope="date">({{ date }})</span>
                <div slot="unite" slot-scope="item">{{ item.unite().nom }}</div>
                <div slot="sousunite" slot-scope="item">{{ item.sousUnite().nom }}</div>
                <div v-if="details" slot="expandedRowRender" slot-scope="item">
                    <participant-details :participant="item" />
                </div>
            </a-table>
        </div>
    </div>
</template>

<script>
import { Table, Select } from 'ant-design-vue';
import ParticipantDetails from './ParticipantDetails.vue';
import { getUnite as exGetUnite, getSousUnite as exGetSousUnite } from '../../unites';

export default {
    components: {
        aTable: Table,
        ParticipantDetails,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    methods: {
        getUnite(id) {
            return exGetUnite(id);
        },
        getSousUnite(id) {
            return exGetSousUnite(id);
        },
    },
    computed: {
        annees() {
            const years = this.data.map(p => p.naissance);
            return years.filter((v, i) => years.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        unites() {
            const unites = this.sousUnite.map(sid => this.getSousUnite(sid).uid);
            return unites.filter((v, i) => unites.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        sousUnite() {
            const sousUnites = this.data.map(p => p.unitId);
            return sousUnites.filter((v, i) => sousUnites.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        sexe() {
            const sexe = this.unites.map(u => this.getUnite(u).sexe);
            console.log(sexe);
            return sexe.filter((v, i) => sexe.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        participants() {
            let { data } = this;
            if (this.year !== -1) data = data.filter(p => p.naissance === this.year);
            if (this.subUnit !== -1) data = data.filter(p => p.unitId === this.subUnit);
            if (this.unit !== -1) data = data.filter(p => this.getSousUnite(p.unitId).uid === this.unit);
            if (this.xxx !== -1) data = data.filter(p => this.getUnite(this.getSousUnite(p.unitId).uid).sexe === this.xxx);
            return data;
        },
        cls() {
            return [
                { title: 'Dossard', dataIndex: 'dossard', key: 'dossard' },
                { title: 'Nom', dataIndex: 'nom', key: 'nom' },
                { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
                { title: 'Année', dataIndex: 'naissance', key: 'naissance' },
                { title: 'Unité', dataIndex: null, scopedSlots: { customRender: 'unite' } },
                { title: 'Sous-Unité', dataIndex: null, scopedSlots: { customRender: 'sousunite' } },
            ].concat(this.columns);
        },
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
        details: {
            type: Boolean,
            default: () => true,
        },
        border: {
            type: Boolean,
            default: () => true,
        },
        columns: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            year: -1,
            subUnit: -1,
            unit: -1,
            xxx: -1,
        };
    },
};
</script>

<style scoped lang="scss">
    .bordered {
        border: 1px solid #eee;
    }
</style>
