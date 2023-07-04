<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import LoginCard from './components/LoginCard.vue'
</script>

<template>
	<div class="container">
		<h1 style="width: 100%;">请登录</h1>
		<LoginCard></LoginCard>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.container {
	display: grid;
	justify-content: center;
}
</style>
