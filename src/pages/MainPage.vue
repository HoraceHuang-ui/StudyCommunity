<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ApiGet } from '../utils/req';
import { Token } from '../utils/storage';
import { Edit } from '@element-plus/icons-vue'

const posts = ref([])

const userInfo = ref({
	username: '',
	name: '',
	clazzId: '',
	schoolId: '',
	sex: '',
	role: '',
	avatar: '',
	cover: ''
})

const roles = ['班主任', '老师', '家长', '学生']

onMounted(async () => {
	const postsResp = await ApiGet('home?token=' + Token.getToken())
	// const resp = await axios.get('/api/home?token=' + data.token)
	console.log(postsResp)
	posts.value = postsResp.obj
	console.log(posts.value)
	
	const userResp = await ApiGet('getUserinfoByToken?token=' + Token.getToken())
	console.log(userResp)
	userInfo.value = userResp.obj
})

const newPostClick = () => {

}
</script>

<template>
	<div class="navbar">
		<el-row>
			<el-col :span="12">
				<div class="header-left">
					<div class="navbar-item">{{ userInfo.schoolId }}</div>
					<div class="navbar-item">{{ userInfo.clazzId }}</div>
					<el-tag class="navbar-item">{{ roles[userInfo.role - 1] }}</el-tag>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="header-right">
					<el-dropdown class="navbar-item">{{ userInfo.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon></el-dropdown>
					<!-- https://avatars.githubusercontent.com/u/67905897?v=4 -->
					<el-avatar :src="userInfo.avatar" size="small"
						class="navbar-item"></el-avatar>
				</div>
			</el-col>
		</el-row>
	</div>
	<el-container class="common-layout">
		<el-main>
			<el-button class="main-width" type="primary" :icon="Edit" plain @click="newPostClick">写一条动态…</el-button>
			<li v-if="posts.length != 0" v-for="post in posts" class="cards-list">
				<MainPostCard :postID="post.postId" class="post-card"></MainPostCard>
			</li>
			<div v-if="posts.length == 0" class="no-post">
				当前班级暂无动态
			</div>
		</el-main>
		<el-backtop :right="50" :bottom="50" />
	</el-container>
</template>

<style scoped>
.navbar {
	position: sticky;
	padding: 10px;
	z-index: 2001;
	top: 0px;
	width: 100%;
	left: 0px;
	background-color: white;
	/* 阴影  水平阴影距离，垂直阴影距离， 模糊尺寸， 阴影尺寸 颜色*/
	box-shadow: 0 2px 4px 0 rgb(0, 0, 0, 10%);
}

.navbar-item {
	margin: 0 5px 0 5px;
}

.main-width {
	width: 50%;
	min-width: 300px;
}

.header-left {
	display: flex;
	flex-direction: row;
	height: 100%;
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
	text-align: center;
}
</style>
