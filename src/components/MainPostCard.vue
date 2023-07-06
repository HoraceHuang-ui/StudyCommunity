<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ApiGet } from '../utils/req'

const props = defineProps({
	postID: String
})

const name = ref('');
const phone = ref('');
const title = ref('');
const timestamp = ref(new Date());
const detail = ref('');
const image = ref('');
const likes = ref(0);
const tempAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

onMounted(async () => {
	try {
		const response = await ApiGet('post/get?postId=' + props.postID)
		// const response = await axios.get('/api/post/get', { postId: props.postID })
		console.log(response)
		const ret = response.obj
		name.value = ret.name
		phone.value = ret.phonenum
		title.value = ret.title
		timestamp.value = ret.timestamp
		detail.value = ret.detail
		image.value = ret.image
	} catch (error) {
		console.error(error);
	}
});
</script>

<template>
	<el-card class="post-card">
		<template #header>
			<div class="card-header">
				<div>
					<el-avatar :size="30" :src="this.tempAvatar"></el-avatar>
					<div>{{ name }}</div>
				</div>
				<div>
					likes: {{ likes }}
				</div>
			</div>
		</template>
		<h1>{{ title }}</h1>
		<div>{{ detail }}</div>
	</el-card>
</template>

<style scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.post-card {
	width: 50%;
	min-width: 340px;
}
</style>
