<template>
    <nav id="navigation" class="navigation">
        <div class="close-navigation-container">
            <button class="app-button close-navigation" v-on:click="closeNavigation"><font-awesome-icon v-bind:icon="['fas', 'times']" /></button>
        </div>
        <ul class="navigation-list">
            <li v-for="item in navigation" v-bind:key="item.key" class="navigation-item">
                <router-link class="navigation-link" v-bind:to="item.path">
                    <font-awesome-icon v-bind:icon="['fas', item.icon]" />{{ item.label }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import appConfig from '@/app_config/index.js'

export default {
    name: 'Navigation',
    data() {
        return {
            navigation: []
        }
    },
    methods: {
        closeNavigation() {
            this.$root.$emit('navigationMessage', { closed: true });
        }
    },
    created() {
        this.navigation = appConfig.navigation;
    }
}
</script>

<style scoped>

.navigation {
	position: fixed;
	top: 0;
	left: 0;
	background-color: var(--color-white);
	width: var(--navigation-width);
	height: 100%;
	z-index: 9999;
    overflow: hidden;
}

.close-navigation-container {
    position: relative;
    width: 100%;
    padding: 20px 20px 0;
}

.navigation-list {
    padding: 20px;
}

.navigation-item {
    position: relative;
    width: 100%;
}

.navigation-link {
    position: relative;
    width: 100%;
    padding: 8px 0;
    display: inline-block;
    color: var(--color-grey);
    text-transform: uppercase;
    font-weight: 600;
}

.navigation-link svg {
    color: var(--color-main);
    min-width: 24px;
    display: inline-block;
    margin: 0 5px 0 0;
}

@media ( max-width: 1024px ) {
    .navigation {
        min-width: 250px;
        max-width: 250px;
    }
}

</style>