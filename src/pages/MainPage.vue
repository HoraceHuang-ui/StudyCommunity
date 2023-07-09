<script setup>
import MainPostCard from '../components/MainPostCard.vue'
import TopHeader from '../components/TopHeader.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { ApiGet } from '../utils/req';
import { Token } from '../utils/storage';
import { Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global';

const posts = ref([])

const globalStore = useGlobalStore()

const userInfo = computed(() => globalStore.userInfo)

onMounted(async () => {
	const postsResp = await ApiGet('home?token=' + Token.getToken())
	posts.value = postsResp.obj
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
	<TopHeader />
	<el-container>
		<el-main class="main-width">
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
