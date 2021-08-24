<template>
	<div id="app" v-bind:class="{ 'app-navigation-closed': !navigationShow }">
		<main>
			<div v-if="!navigationShow" class="open-navigation-container">
				<button v-bind:class="['open-navigation', 'app-button']" v-on:click="openHideNavigation('show')"><font-awesome-icon v-bind:icon="['fas', 'bars']" /></button>
			</div>
			<div class="breadcrumbs-contanainer">
				<div class="left">
					<font-awesome-icon v-bind:icon="['fas', 'bread-slice']" />
					<Breadcrumbs />
				</div>
				<div v-if="$route.name !== 'UsersView' && $route.name !== 'PhotoView'" class="right">
					<button class="app-button" v-on:click="closeCurrentRoute"><font-awesome-icon v-bind:icon="['fas', 'times']" /></button>
				</div>
			</div>
			<router-view />
		</main>
		<div v-if="navigationShow && isMobile" class="navigation-overlay" v-on:click="openHideNavigation('hide')"></div>
		<Navigation v-if="navigationShow" />
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
			navigationShow: true,
			isMobile: false
		}
	},
	methods: {
		openHideNavigation(action) {
			if( action === 'hide' ) {
				this.navigationShow = false;
				this.localStorageItem('set', 'navigationClosed', true);
				return;
			}

			this.navigationShow = true;
			this.localStorageItem('', 'navigationClosed');
		},
		windowResizeEvent(event) {
			this.isMobile = window.innerWidth <= 1024;
			if( !this.isMobile ) return; 
			if( this.localStorageItem('get', 'navigationClosed') ) return;
			this.navigationShow = false;
			this.localStorageItem('set', 'navigationClosed', true);
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
		},
		closeCurrentRoute() {
			this.$router.go(-1);
		}
	},
	created() {
		this.windowResizeEvent();

		// CHECK IF NAVIGATION IS CLOSED ON APP LOAD
		const checkNavigationDisplay = this.localStorageItem('get', 'navigationClosed');
		this.navigationShow = checkNavigationDisplay && JSON.parse(checkNavigationDisplay) ? false : true;

		// RECEIVE EVENT FROM NAVIGATION COMPONENT FOR CLOSING NAVIGATION
		this.$root.$on('navigationMessage', message => {
			if( message ) {
				this.navigationShow = !message.closed;
				if( message.closed ) this.localStorageItem('set', 'navigationClosed', true);
			}
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
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.left,
.right
{
	display: flex;
}

.right {
	justify-content: flex-end;
}

.breadcrumbs-contanainer .left svg {
	margin: 0 5px 0 0;
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

.navigation-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
}

@media ( max-width: 1024px ) {
    #app {
		--navigation-width: 0;
	}
}

</style>
