<template>
    <div>
        <div class="p-3 d-flex justify-content-between align-items-center">
            <div>
                <h1>Criterium</h1>
                <h3>Système de gestion de courses</h3>
            </div>
            <a-button type="primary" @click="creating = true">Nouvelle base de données</a-button>
        </div>
        <a-table :dataSource="databases" :columns="columns" rowKey="name">
            <div slot="actions" slot-scope="item">
                <a-button type="primary" @click="swap(item.name)" :disabled="`${dbname}` === `${item.name}`" class="mr-2">Utiliser</a-button>
            </div>
        </a-table>
        <a-modal title="Nouvelle base de données" :visible="creating" @ok="create" @cancel="creating = false" :confirm-loading="working">
            <a-form :form="form" layout="vertical">
                <a-form-item label="Nom de la base de données">
                    <a-input v-decorator="['nom', { rules: [{ required: true }]}]" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import { Table, Button, Modal, Form, Input } from 'ant-design-vue';
import db from '../db';

export default {
    components: {
        aTable: Table,
        aButton: Button,
        aModal: Modal,
        aForm: Form,
        aFormItem: Form.Item,
        aInput: Input,
    },
    mounted() {
        this.refreshDbs();
    },
    data() {
        return {
            databases: [],
            form: this.$form.createForm(this),
            creating: false,
            working: false,
            dbname: null,
            columns: [
                { title: 'Bases de données disponibles', dataIndex: 'name' },
                { title: 'Actions', dataIndex: null, scopedSlots: { customRender: 'actions' } },
            ],
        };
    },
    methods: {
        swap(dbname) {
            db.swap(dbname).then(() => {
                this.dbname = dbname;
            });
        },
        refreshDbs() {
            this.databases = db.getDatabaseNames().map(name => ({ name }));
            this.dbname = db.dbname;
        },
        create() {
            this.form.validateFields((err, { nom }) => {
                if (!err) {
                    this.working = true;
                    db.install(nom).then(() => {
                        this.refreshDbs();
                        this.working = false;
                        this.creating = false;
                    });
                }
            });
        },
    },
};
</script>
