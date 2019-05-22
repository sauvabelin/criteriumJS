<template>
    <div>
        <div class="p-3">
            <h1>Nouveau poste</h1>
            <h3>Enregistrer un nouveau poste sur la course</h3>
            <div class="row">
                <div class="col-12 col-md-5 col-lg-2">
                    <a-form layout="vertical" :form="form" @submit="addPoste">
                        <a-form-item label="Nom">
                            <a-input v-decorator="['nom', {rules: [{ required: true}]}]" />
                        </a-form-item>
                        <a-form-item label="Max de points">
                            <a-input type="number" v-decorator="['max', {rules: [{ required: true}]}]" />
                        </a-form-item>
                        <a-form-item label="Coefficient">
                            <a-input type="number" v-decorator="['coefficient', {rules: [{ required: true}]}]" />
                        </a-form-item>
                        <a-button type="primary" html-type="submit">Ajouter le poste</a-button>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Form, Button } from 'ant-design-vue';
import Poste from '../../models/Poste';

export default {
    components: {
        aInput: Input,
        aForm: Form,
        aButton: Button,
        aFormItem: Form.Item,
    },
    data() {
        return {
            form: this.$form.createForm(this),
        };
    },
    methods: {
        async addPoste(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { nom, coefficient, max }) => {
                const poste = new Poste();
                poste.nom = nom;
                poste.coefficient = coefficient;
                poste.max = max;
                await poste.insert();
            });
        },
    },
};
</script>
