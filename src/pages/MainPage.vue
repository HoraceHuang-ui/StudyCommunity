<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ApiGet } from '../utils/req';
import { Token } from '../utils/storage';

const props = defineProps({
	a: String
})


onMounted(async () => {
	const data = {
		token: Token.getToken()
	}
	console.log(data.token)
	const resp = await ApiGet('/home?token=' + data.token)
	// const resp = await axios.get('/api/home?token=' + data.token)
	console.log(resp)
	const posts = resp.obj

	// test get posts
	console.log(posts[0].phonenum)
	// TODO: implement MainPostCards

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
			<div>{{ props.a }}</div>
			<!-- <li v-for="post in posts">
				<MainPostCard postID="${post.postid}"></MainPostCard>
			</li> -->
		</el-main>
	</el-container>
</template>

<style>
</style>
