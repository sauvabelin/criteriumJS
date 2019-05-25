<template>
    <div>
        <div class="p-3">
            <h1>Importer une feuille de score</h1>
            <h2>Vous pouvez facilement importer une feuille excel de scores</h2>
            <div class="pt-4 row">
                <div class="col-4">
                    <a-form layout="vertical" :form="form" @submit="importation">
                        <a-form-item label="Poste">
                            <a-select v-decorator="['poste', { rules: [{ required: true }]}]">
                                <a-select-option v-for="poste in $store.state.postes" :key="poste.id" :value="poste.id">{{ poste.nom }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <hot-table ref="tableur" stretchH="all" :start-cols="2" :colHeaders="headers" licenseKey="non-commercial-and-evaluation" />
                        <a-button html-type="submit" type="primary" class="mt-3">Importer</a-button>
                    </a-form>
                </div>
                <div class="col-8">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { Button, Form, Select } from 'ant-design-vue';
import 'handsontable/dist/handsontable.full.min.css';
import Participant from '../../models/Participant';

export default {
    components: {
        HotTable,
        aButton: Button,
        aForm: Form,
        aFormItem: Form.Item,
        aSelect: Select,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            headers: ['Dossard', 'Résultat'],
            form: this.$form.createForm(this),
        };
    },
    methods: {
        async importation(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { poste }) => {
                const max = parseInt(this.$store.state.postes.find(p => p.id === poste).max, 10);
                if (!err && this.$refs.tableur.hotInstance) {
                    const data = this.$refs.tableur.hotInstance.getSourceData().filter(([dossard, result]) => dossard !== null && result !== null)
                        .map(([dossard, result]) => [parseInt(dossard, 10), parseInt(result, 10)]);
                    const errors = [];
                    // eslint-disable-next-line
                    for (const item of data) {
                        const [dossard, result] = item;
                        // eslint-disable-next-line
                        const participant = await Participant.findOneBy({ dossard });
                        if (participant === null || result > max) {
                            errors.push([dossard, result]);
                        } else {
                            // eslint-disable-next-line
                            await participant.setPosteData(poste, result);
                        }
                    }
                    if (errors.length > 0) {
                        this.$toasted.info(`${data.length - errors.length} résultats entrés, des erreurs sont survenues`);
                        this.$toasted.error(`${errors.length} erreurs, soit un numéro de dossard incorrect ou un score supérieur au max du poste, vérifiez la table`);
                    } else this.$toasted.success(`${data.length} résultats entrés!`);
                    this.$refs.tableur.hotInstance.updateSettings({ data: errors });
                }
            });
        },
    },
};
</script>
