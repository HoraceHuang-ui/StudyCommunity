<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ApiPost } from '../utils/req';

const props = defineProps({
	token: String
})

const posts = ref([])

onMounted(async () => {
	const resp = await ApiPost('/api/home', props.token)
	console.log(resp)
	posts.value = resp.obj

	// axios.get('/api/home', {
	// 	params: {
	// 		clazz_id: props.clazz_id
	// 	}
	// }).then(response => {
	// 	console.log(response)
	// 	posts.value = response.data.obj
	// }).catch(error => {
	// 	console.error(error)
	// })
})
</script>

<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="12">
					<div class="header-left">
						<div>logo</div>
						<div>学校</div>
						<div>班级</div>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="header-right">

					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<div>{{ token }}</div>
			<!-- <li v-for="post in posts">
				<MainPostCard postID="${post.postid}"></MainPostCard>
			</li> -->
		</el-main>
	</el-container>
</template>

<style>
</style>
