<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ApiGet } from '../utils/req'
import { useRouter } from 'vue-router'

const props = defineProps({
	postID: String
})

const postInfo = ref({
	username: '',
	postId: '',
	title: '',
	detail: '',
	clazzId: '',
	likes: '',
	image: '',
	video: '',
	postTime: ''
})
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
const tempAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

onMounted(async () => {
	try {
		const postResp = await ApiGet('post/get?postId=' + props.postID)
		// const response = await axios.get('/api/post/get', { postId: props.postID })
		console.log(postResp)
		postInfo.value = postResp.obj

		const userResp = await ApiGet('getUserinfoById?username=' + postInfo.value.username)
		console.log(userResp)
		userInfo.value = userResp.obj
	} catch (error) {
		console.error(error);
	}
})

const router = useRouter()
const cardClick = () => {
	router.push({
		name: 'postinfo',
		query: {
			postId: postInfo.value.postId
		}
	})
}
</script>

<template>
	<el-card class="main-width post-card" @click="cardClick" shadow="hover" :body-style="{ padding: '10px' }">
		<div class="card-header">
			<div class="card-header-left">
				<el-avatar v-if="!userInfo.avatar || userInfo.avatar == ''" size="small" :src="this.tempAvatar"
					style="margin: 5px;"></el-avatar>
				<el-avatar v-else size="small" :src="userInfo.avatar" style="margin: 5px;"></el-avatar>
				<div style="padding-top: 9px; margin-left: 5px; font-size: 10px;">{{ userInfo.name }}</div>
			</div>
			<div style="margin-top: 9px; margin-right: 7px; font-size: 10px;">点赞：{{ postInfo.likes }}</div>
		</div>
		<div class="body-title">
			<div class="info-title">{{ postInfo.title }} 标题省略标题省略标题省略</div>
			<div class="info-time">{{ postInfo.postTime }}</div>
			<div class="separator"></div>
		</div>
		<div class="detail-block"></div>
		<!-- https://avatars.githubusercontent.com/u/67905897?v=4 -->
		<el-image v-if="postInfo.image && postInfo.image != ''" :src="postInfo.image" class="body-image" />
		<div class="body-detail">{{ postInfo.detail }} 正文省略正文省略正文省略正文省略正文省略正文省略正文省略
			正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略正文省略</div>
	</el-card>
</template>

<style scoped>
.main-width {
	width: 50%;
	min-width: 300px;
}

.card-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	max-height: 10px;
}

.card-header-left {
	display: flex;
	flex-direction: row;
	align-content: flex-start;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.post-card {
	display: flex;
	flex-direction: column;
}

.body-title {
	margin-top: 6vh;
}

.info-title {
	font-weight: bold;
	font-size: 20px;
	width: 98%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-left: 6px;
}

.info-time {
	font-size: 8px;
	width: 98%;
	color: #555;
	margin-left: 6px;
}

.separator {
	border-top: 1px solid #ddd;
	margin: 10px 0;
}

.detail-block {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
}

.body-image {
	width: 80%;
	max-width: 30vh;
	max-height: 30vh;
	border-radius: 10%;
}

.body-detail {
	text-align: left;
	font-size: 15px;
	position: relative;
	margin-top: 1vh;
	line-height: 20px;
	height: 60px;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
}
</style>
