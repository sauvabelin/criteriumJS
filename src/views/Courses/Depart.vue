<template>
    <div>
        <div class="p-3">
            <h1>Départ</h1>
            <h3>Enregistrer le départ de courses</h3>
            <div class="row">
                <div class="col-12 col-sm-4">
                    <a-form @submit="submit" :form="form" layout="vertical">
                        <p>Vous pouvez aussi appuyer sur ENTER pour valider le départ</p>
                        <a-form-item label="Course">
                            <a-select style="width: 100%" placeholder="Course" v-decorator="['course', {rules: [{required: true}]}]">
                                <a-select-option v-for="course in $store.state.courses" :key="course.id" :value="course.id">
                                    {{ course.nom }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Unité">
                            <a-select style="width: 100%" :filterOption="filter" showSearch placeholder="Sous-unité"
                                      v-decorator="['unite', {rules: [{required: true}]}]">
                                <a-select-option v-for="unite in sousUnites" :key="unite.sid" :value="unite.sid">{{ unite.nom }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Temps">
                            <a-input placeholder="Temps (HH MM [SS])" v-decorator="['temps', {rules: [
                            {required: true},
                            {pattern: '^([0-9]|)[0-9] ([0-9]|)[0-9]( ([0-9]|)[0-9]|)$', message: 'Format invalide'}
                            ]}]" />
                        </a-form-item>
                        <a-button type="primary" html-type="submit">valider</a-button>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Select, Button, Form } from 'ant-design-vue';
import { SousUnites } from '../../unites';
import Participant from '../../models/Participant';

export default {
    components: {
        aInput: Input,
        aSelect: Select,
        aFormItem: Form.Item,
        aButton: Button,
        aForm: Form,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            sousUnites: SousUnites,
            form: this.$form.createForm(this),
        };
    },
    methods: {
        filter(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase());
        },
        async submit(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { unite, course, temps }) => {
                if (!err) {
                    const time = temps.split(' ').map(t => parseInt(t, 10));
                    const now = new Date();
                    if (time.length === 2) time.push(0);
                    const depart = new Date(now.getFullYear(), now.getMonth(), now.getUTCDate(), time[0], time[1], time[2]);
                    const participants = await Participant.findBy({ unitId: unite });
                    // eslint-disable-next-line
                    for (const p of participants) {
                        // eslint-disable-next-line
                        await p.setCourseData(course, depart, 'debut');
                    }
                    this.$toasted.show(`${participants.length} participants partis!`);
                    this.form.setFieldsValue({ temps: null, unite: null });
                }
            });
        },
    },
};
</script>
