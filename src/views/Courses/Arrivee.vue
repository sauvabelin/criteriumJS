<template>
    <div>
        <div class="p-3">
            <h1>Arrivée d'une course</h1>
            <h3>Arrivée des participants à la fin d'une course</h3>
            <div class="row">
                <div class="col-12 col-sm-4">
                    <p>
                        Vous pouvez aussi appuyer sur enter pour aller plus vite! Si aucun temps n'est entré, c'est l'heure actuelle
                        qui sera utilisée.
                    </p>
                    <a-form @submit="submit" :form="form" layout="vertical">
                        <a-form-item label="Course">
                            <a-select style="width: 100%" placeholder="Course" @change="setCourse" v-decorator="['course', {rules: [{required: true}]}]">
                                <a-select-option v-for="course in $store.state.courses" :key="course.id" :value="course.id">
                                    {{ course.nom }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Temps (facultatif)">
                            <a-input placeholder="Temps d'arrivée (HH MM [SS])" v-decorator="['temps', {rules: [
                                {pattern: '^([0-9]|)[0-9] ([0-9]|)[0-9]( ([0-9]|)[0-9]|)$', message: 'Format invalide'}
                            ]}]" />
                        </a-form-item>
                        <a-form-item label="Dossard">
                            <a-input placeholder="Numéro de dossard" v-decorator="['dossard', {rules: [{required: true}]}]" />
                        </a-form-item>
                        <a-button type="primary" html-type="submit">valider</a-button>
                    </a-form>
                </div>
                <div class="col-12 col-sm-8">
                    <div v-for="error in errors" :key="error.time.getTime()" class="mb-2">
                        <a-alert :type="error.type" :description="error.message" :message="'dossard: ' + error.dossard + ', temps enregistré: ' + error.time.toLocaleString()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Input, Select, Button, Form, Alert } from 'ant-design-vue';
import Participant from '../../models/Participant';
import CourseParticipant from '../../models/CourseParticipant';
import db from '../../db';

const KEY = `${db.dbname}_arrivee_crit`;

export default {
    components: {
        aInput: Input,
        aAlert: Alert,
        aSelect: Select,
        aFormItem: Form.Item,
        aButton: Button,
        aForm: Form,
        aSelectOption: Select.Option,
    },
    data() {
        return {
            errors: [],
            form: this.$form.createForm(this),
        };
    },
    mounted() {
        this.form.setFieldsValue({ course: localStorage.getItem(KEY) });
    },
    methods: {
        setCourse(id) {
            localStorage.setItem(KEY, id);
        },
        async submit(e) {
            e.preventDefault();
            await this.form.validateFields(async (err, { course, dossard, temps }) => {
                if (!err) {
                    const now = new Date();
                    const timeStr = (temps === undefined || temps === null || temps === '') ? `${now.getHours()} ${now.getMinutes()} ${now.getSeconds()}` : temps;
                    const time = timeStr.split(' ').map(t => parseInt(t, 10));
                    if (time.length === 2) time.push(0);
                    const arrivee = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1], time[2]);

                    const participant = await Participant.findOneBy({ dossard: parseInt(dossard, 10) });
                    if (participant === null) {
                        this.addError(dossard, 'error', arrivee, 'Participant introuvable');
                        return;
                    }
                    const courseData = await CourseParticipant.findOneBy({ participantId: participant.id, courseId: course });
                    let noErrors = true;
                    if (courseData && courseData.arrivee !== null) {
                        this.addError(dossard, 'warning', arrivee, `Ce numéro était déjà arrivé à ${courseData.arrivee.toLocaleString()}, temps écrasé.`);
                        noErrors = false;
                    }
                    await participant.setCourseData(course, arrivee, 'arrivee');
                    if (noErrors) this.$toasted.success(`Participant [${dossard}] ${participant.prenom} ${participant.nom} bien arrivé!`);
                    this.form.setFieldsValue({ temps: null, dossard: null });
                }
            });
        },
        addError(dossard, type, time, message) {
            this.errors.push({ dossard, type, time, message });
        },
    },
};
</script>
