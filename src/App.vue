<template>
    <div id="app">
        <c-menu />
        <div class="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Menu from './components/layout/Menu/Menu.vue';

export default {
    components: {
        cMenu: Menu,
    },
};
</script>

<style lang="scss" scoped>
    @import "./assets/scss/variables";

    .main-content {
        min-height: 100%;
        padding-left: $menu-width;
        width:100%;
    }
</style>
