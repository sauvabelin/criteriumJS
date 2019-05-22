<template>
    <div>
        <div class="p-3">
            <h1 class="m-0">Importation</h1>
            <h3 class="m-0">Importer de nouveaux participants dans le système, copiez-collez les cellules de votre fichier excel ci-dessous</h3>
            <div class="pt-4 row">
                <div class="col-8">
                    <hot-table ref="tableur" stretchH="all" :colHeaders="headers" licenseKey="non-commercial-and-evaluation" />
                </div>
                <div class="col-4">
                    <a-button @click="importation" type="primary">Importer</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { Button } from 'ant-design-vue';
import 'handsontable/dist/handsontable.full.min.css';
// import db from '../../db';
import Participant from '../../models/Participant';

export default {
    components: {
        HotTable,
        aButton: Button,
    },
    data() {
        return {
            headers: ['Dossard', 'ID sous-unité', 'Nom', 'Prénom', 'Année de naissance'],
        };
    },
    methods: {
        importation() {
            if (this.$refs.tableur.hotInstance) {
                const data = this.$refs.tableur.hotInstance.getSourceData();
                const insert = data.map((item) => {
                    const p = new Participant();
                    const [dossard, uid, nom, prenom, naissance] = item;
                    if (dossard === null) return null;
                    p.dossard = parseInt(dossard, 10);
                    p.unitId = parseInt(uid, 10);
                    p.nom = nom;
                    p.prenom = prenom;
                    p.naissance = parseInt(naissance, 10);
                    return p.insert();
                }).filter(x => x !== null);
                Promise.all(insert).then(() => {
                    console.log(`Inserted ${insert.length} inscriptions`);
                    this.$router.push({ name: 'Inscriptions' });
                });
            }
        },
    },
};
</script>
