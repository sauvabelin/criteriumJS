<template>
    <div>
        <div class="p-3" v-if="poste">
            <h1>{{ poste.nom }} {{poste.max}}</h1>
            <h3>Gestion du poste</h3>
            <div class="row">
                <div class="col-12 col-md-4">
                    <a-form :form="form" @submit="submit" layout="vertical">
                        <a-form-item label="Dossard">
                            <a-input placeholder="Dossard" v-decorator="['dossard', {rules: [{required: true}]}]" />
                        </a-form-item>
                        <a-form-item label="Points">
                            <a-input ref="pref" type="number" placeholder="Points réalisés au poste" v-decorator="['points', {rules: [
                            {required: true},
                            {validator: (a,v,c) => {if(v > poste.getMax()) {c('Trop grand, max: ' + poste.max)} else c()}}
                            ]}]"/>
                        </a-form-item>
                        <a-button html-type="submit" type="primary">Valider</a-button>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Button, Form } from 'ant-design-vue';
import Participant from '../../models/Participant';

export default {
    components: {
        aInput: Input,
        aButton: Button,
        aForm: Form,
        aFormItem: Form.Item,
    },
    computed: {
        poste() {
            return this.$store.getters.getPoste(this.$route.params.id);
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { points, dossard }) => {
                if (!err) {
                    const participant = await Participant.findOneBy({ dossard: parseInt(dossard, 10) });
                    if (participant === null) {
                        this.$toasted.error(`Participant avec dossard ${dossard} introuvable`);
                    } else {
                        await participant.setPosteData(this.poste.id, points);
                        this.$toasted.success(`Participant #${dossard} a fait ${points} points au poste ${this.poste.nom}`);
                    }
                    this.form.setFieldsValue({ points: null, dossard: null });
                    this.$nextTick(() => {
                        console.log(this.$refs.pref.$el);
                        this.$refs.pref.$el.focus();
                    });
                }
            });
        },
    },
    data() {
        return {
            form: this.$form.createForm(this),
        };
    },
};
</script>
