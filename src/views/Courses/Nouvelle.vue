<template>
    <div>
        <div class="p-3">
            <h1>Nouvelle course</h1>
            <h3>Enregistrer une nouvelle course</h3>
            <div class="row">
                <div class="col-12 col-md-5 col-lg-2">
                    <a-form layout="vertical" :form="form" @submit="addCourse">
                        <a-form-item label="Nom">
                            <a-input v-decorator="['nom', {rules: [{ required: true}]}]" />
                        </a-form-item>
                        <a-button type="primary" html-type="submit">Ajouter la course</a-button>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Form, Button } from 'ant-design-vue';
import Course from '../../models/Course';

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
        async addCourse(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { nom }) => {
                if (!err) {
                    const course = new Course();
                    course.nom = nom;
                    await course.insert();
                }
            });
        },
    },
};
</script>
