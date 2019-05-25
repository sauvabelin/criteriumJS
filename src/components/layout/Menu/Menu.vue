<template>
    <div>
        <div class="menu d-flex flex-column justify-content-between">
            <!-- top items -->
            <div class="d-flex flex-column">
                <div class="menu-logo d-flex justify-content-center pt-2 pb-3">
                    <div class="picto">
                        <img src="../../../assets/images/logo.png" alt="logo" />
                    </div>
                </div>
                <menu-item title="Inscriptions" icon="team" :to="{name: 'Inscriptions'}" />
                <menu-item title="Postes" icon="compass" :to="{name: 'Postes'}" />
                <menu-item title="Courses" icon="flag" :to="{name: 'Courses'}" />
                <menu-item title="Résultats" icon="trophy" :to="{name: 'Résultats'}" />
            </div>
            <!-- bottom items -->
            <div class="d-flex flex-column">
                <menu-item title="Paramètres" icon="setting" :to="{name: 'Paramètres'}" />
            </div>
        </div>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
    components: {
        MenuItem,
    },
};
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/variables";

    .menu {
        width: $menu-width;
        background: $menu-bg;
        position:fixed;
        top:0;
        height:100%;

        .menu-logo {

            .picto {
                width:80%;

                img {
                    width: 100%;
                }
            }
        }
    }
</style>
