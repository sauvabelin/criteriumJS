<template>
    <div>
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-12 col-md-2">
                    Filtrer par année
                    <a-select v-model="year" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in annees" :key="y" :value="y">{{ y }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-2">
                    Filtrer par unité
                    <a-select v-model="unit" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in unites" :key="y" :value="y">{{ getUnite(y).nom }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-2">
                    Filtrer par sous-unité
                    <a-select v-model="subUnit" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in sousUnite" :key="y" :value="y">{{ getSousUnite(y).nom }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-2">
                    Filtrer par branche
                    <a-select v-model="branche" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in branches" :key="y.nom" :value="y.bid">{{y.nom}}</a-select-option>
                        <a-select-option :value="10">éclaireurs-euses</a-select-option>
                        <a-select-option :value="11">louveteaux-ettes</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-1">
                    Filtrer par sexe
                    <a-select v-model="xxx" style="width:100%">
                        <a-select-option :value="-1">Ne pas filtrer</a-select-option>
                        <a-select-option v-for="y in sexe" :key="y" :value="y">{{ y }}</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-1">
                    Trier par
                    <a-select v-model="tri" style="width:100%">
                        <a-select-option :value="1">Dossard</a-select-option>
                        <a-select-option :value="2">Temps</a-select-option>
                        <a-select-option :value="3">Score final</a-select-option>
                    </a-select>
                </div>
                <div class="col-12 col-md-2">
                    Rechercher
                    <a-input v-model="search" placeholder="Rechercher" />
                </div>
            </div>
        </div>
        <div :class="{bordered: border}">
            <a-table :dataSource="participants" :columns="cls" rowKey="dossard" :scroll="scroll">
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
import { Table, Select, Input } from 'ant-design-vue';
import ParticipantDetails from './ParticipantDetails.vue';
import { getUnite as exGetUnite, getSousUnite as exGetSousUnite, branches as exBranches } from '../../unites';

export default {
    components: {
        aTable: Table,
        aInput: Input,
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
        branches() {
            return exBranches;
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
            return sexe.filter((v, i) => sexe.indexOf(v) === i).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
        },
        participants() {
            let { data } = this;
            if (this.year !== -1) data = data.filter(p => p.naissance === this.year);
            if (this.subUnit !== -1) data = data.filter(p => p.unitId === this.subUnit);
            if (this.unit !== -1) data = data.filter(p => this.getSousUnite(p.unitId).uid === this.unit);
            if (this.xxx !== -1) data = data.filter(p => this.getUnite(this.getSousUnite(p.unitId).uid).sexe === this.xxx);
            if (this.branche !== -1) {
                data = data.filter((p) => {
                    if (this.branche === 10) return [1, 2].includes(this.getUnite(this.getSousUnite(p.unitId).uid).bid);
                    if (this.branche === 11) return [3, 4].includes(this.getUnite(this.getSousUnite(p.unitId).uid).bid);
                    return this.getUnite(this.getSousUnite(p.unitId).uid).bid === this.branche;
                });
            }
            if (this.search.length > 0) {
                data = data.filter(i => i.prenom.toLowerCase().includes(this.search)
                    || i.nom.toLowerCase().includes(this.search)
                    || `${i.dossard}`.includes(this.search));
            }
            return data.sort((a, b) => {
                switch (this.tri) {
                case 1:
                    return a.dossard > b.dossard ? 1 : -1;
                case 2:
                    return a.temps > b.temps ? 1 : -1;
                case 3:
                    return a.total > b.total ? 1 : -1;
                default:
                    return data;
                }
            });
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
        scroll: {
            default: () => ({}),
        },
    },
    data() {
        return {
            year: -1,
            subUnit: -1,
            unit: -1,
            xxx: -1,
            branche: -1,
            search: '',
            tri: 3,
        };
    },
};
</script>

<style scoped lang="scss">
    .bordered {
        border: 1px solid #eee;
    }
</style>
