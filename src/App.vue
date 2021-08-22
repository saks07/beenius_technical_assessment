<template>
	<div id="app" v-bind:class="{ 'app-navigation-closed': !navigationShow }">
		<Navigation v-if="navigationShow" />
		<main>
			<div v-if="!navigationShow" class="open-navigation-container">
				<button v-bind:class="['open-navigation', 'app-button']" v-on:click="openNavigation"><font-awesome-icon v-bind:icon="['fas', 'bars']" /></button>
			</div>
			<div class="breadcrumbs-contanainer">
				<font-awesome-icon v-bind:icon="['fas', 'bread-slice']" />
				<Breadcrumbs />
			</div>
			<router-view />
		</main>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
	name: 'App',
	components: {
		Navigation
	},
	data() {
		return {
			navigationShow: true
		}
	},
	methods: {
		openNavigation() {
			this.navigationShow = true;
			this.localStorageItem('', 'navigationClosed');
		},
		windowResizeEvent(event) {
			if( window.innerWidth <= 1024 ) {
				if( this.localStorageItem('get', 'navigationClosed') ) return;
				this.navigationShow = false;
				this.localStorageItem('set', 'navigationClosed', true);
			}
		},
		localStorageItem(action, key, value = null) {
			if( action === 'set' ) {
				localStorage.setItem(key, value);
				return;
			}

			if( action === 'get' ) {
				return localStorage.getItem(key);
			}

			localStorage.removeItem(key);
		}
	},
	created() {
		// CHECK IF NAVIGATION IS CLOSED ON APP LOAD
		const checkNavigationDisplay = this.localStorageItem('get', 'navigationClosed');
		this.navigationShow = checkNavigationDisplay && JSON.parse(checkNavigationDisplay) ? false : true;

		// RECEIVE EVENT FROM NAVIGATION COMPONENT FOR CLOSING NAVIGATION
		this.$root.$on('nav', event => {
			this.navigationShow = !event.closed;
			if( event.closed ) this.localStorageItem('set', 'navigationClosed', true);
		});

		// WINDOW RESIZE EVENT
		window.addEventListener('resize', this.windowResizeEvent);
	}
}
</script>


<style>
:root {
	--color-white: #fff;
	--color-offwhite: #f5f5f5;
	--color-dark: #101010;
	--color-grey: #555;
	--color-medium-grey: #757575;
	--color-light-grey: #959595;
	--color-main: #16a085;
	--main-background-color: var(--color-white);
	--alt-background-color: var(--color-offwhite);
	--font-size-default: 16px;
	--breadcrumbs-height: 20px;
}

* {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

body {
	position: relative;
	width: 100%;
	min-height: 100vh;
	margin: 0;
	padding: 0;
	font-size: var(--font-size-default);
	background-color: var(--alt-background-color);
	color: var(--color-grey);
}

a {
	text-decoration: none;
}

ul, ol {
	position: relative;
	padding: 0;
	margin: 0;
	list-style: none;
}

img {
	position: relative;
	width: 100%;
	height: auto;
	display: inline-block;
	vertical-align: bottom;
}

#app {
	--navigation-width: 16%;
}

#app.app-navigation-closed {
	--navigation-width: 0;
}

.app-button {
	position: relative;
	padding: 8px 16px;
	display: inline-block;
	border: 0;
	background-color: var(--color-main);
	color: var(--color-white);
	border-radius: 5px;
	font-size: 24px;
	cursor: pointer;
}

.app-button > * {
	pointer-events: none;
}

.app-button-transparent {
	background-color: rgba(255, 255, 255, 0);
	color: var(--color-main);
}

.container {
	position: relative;
	width: 100%;
	padding: 0 40px 30px;
}

.wrapper {
	position: relative;
	width: 100%;
	margin: 0 auto;
}

main {
	position: relative;
	width: 100%;
	padding: 0 0 0 var(--navigation-width);
}

.breadcrumbs-contanainer {
	position: relative;
	padding: 0 40px;
	margin: 40px 0 30px;
	font-weight: 600;
	display: flex;
	justify-content: flex-start;
	height: var(--breadcrumbs-height);
}

.breadcrumbs-contanainer svg {
	margin: 0 10px 0 0;
}

ol.breadcrumb {
	display: flex;
	justify-content: flex-start;
}

.breadcrumb-item > a {
	color: var(--color-dark);
	text-transform: capitalize;
}

.breadcrumb-item .router-link-exact-active {
	color: var(--color-main);
}

.breadcrumb-item:before {
	position: relative;
	content: '/';
	margin: 0 0 0 5px;
}

.open-navigation-container {
	position: relative;
	width: 100%;
	padding: 20px 40px 0;
}

</style>
