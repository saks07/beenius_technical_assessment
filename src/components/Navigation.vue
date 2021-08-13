<template>
    <nav id="navigation" class="navigation">
        <ul class="navigation-list">
            <li v-for="item in navigation" v-bind:key="item.name" class="navigation-item">
                <router-link class="navigation-link" v-bind:to="item.path">{{ item.meta.navigation_label }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            navigation: []
        }
    },
    created() {
        this.navigation = this.$router.options.routes;
    }
}
</script>

<style scoped>
</style>