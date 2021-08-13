<template>
	<div id="app">
		<Navigation />
		<router-view />
	</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
	name: 'App',
	components: {
		Navigation
	}
}
</script>


<style>
:root {
	--color-white: #fff;
	--color-offwhite: #f5f5f5;
	--main-background-color: var(--color-white);
	--alt-background-color: var(--color-offwhite);
	--font-size-default: 16px;
}

body {
	position: relative;
	width: 100%;
	min-height: 100vh;
	margin: 0;
	padding: 0;
	font-size: var(--font-size-default);
}
</style>
