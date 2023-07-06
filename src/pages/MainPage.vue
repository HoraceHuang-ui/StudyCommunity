<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ApiGet } from '../utils/req';
import { Token } from '../utils/storage';

const posts = ref([])

onMounted(async () => {
	const postsResp = await ApiGet('home?token=' + Token.getToken())
	// const resp = await axios.get('/api/home?token=' + data.token)
	console.log(postsResp)
	posts.value = postsResp.obj
	console.log(posts.value)

})
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<el-row style="width: 100%;">
					<el-col :span="12">
						<div class="header-left">
							<div>logo</div>
							<div>学校</div>
							<div>班级</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="header-right">
							<div>姓名</div>
							<div>头像</div>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<li v-if="posts.length != 0" v-for="post in posts" class="cards-list">
					<MainPostCard :postID="post.postId" class="post-card"></MainPostCard>
				</li>
				<div v-if="posts.length == 0" class="no-post">
					当前班级暂无动态
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<style>
.common-layout {
	display: flex;
	width: 100%;
}

.header-left {
	display: flex;
	flex-direction: row;
}

.header-right {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.cards-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
}

.post-card {
	margin: 5px;
}

.no-post {
	display: flex;
	justify-self: center;
	align-self: center;
}
</style>
