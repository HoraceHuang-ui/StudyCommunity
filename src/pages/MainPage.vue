<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import TopHeader from '../components/TopHeader.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ApiGet } from '../utils/req';
import { Token } from '../utils/storage';
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
const newPostClick = () => {
	router.push({
		name: 'postedit',
		query: {
			userId: userInfo.value.username
		}
	})
}
</script>

<template>
	<TopHeader :userInfo="userInfo" />
	<el-container>
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
.main-width {
	width: 50%;
	min-width: 300px;
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
	text-align: center;
	margin-top: 20px;
}
</style>
