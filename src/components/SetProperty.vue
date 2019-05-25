<template>
    <div>
        <a-modal :visible="show" :title="'Changer la valeur de ' + property" @ok="handleOk" @cancel="$emit('close')">
            <a-input v-model="value" :placeholder="property" />
        </a-modal>
    </div>
</template>

<script>
import { Modal, Input } from 'ant-design-vue';

export default {
    components: {
        aModal: Modal,
        aInput: Input,
    },
    props: ['show', 'item', 'property'],
    mounted() {
        this.value = this.item[this.property];
    },
    data() {
        return {
            value: null,
        };
    },
    methods: {
        async handleOk() {
            const prp = parseInt(this.value, 10);
            await this.item.update(this.property, prp);
            this.$emit('close');
        },
    },
};
</script>
