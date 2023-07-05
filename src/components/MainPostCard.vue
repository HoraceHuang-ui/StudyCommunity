<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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
		const response = await axios.get('/api/post/get', {
			params: {
				post_id: props.postID
			}
		});
		console.log(response);
		const ret = response.data.obj;
		name.value = ret.name;
		phone.value = ret.phonenum;
		// 设置其他属性的值
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
					<!--<el-avatar :size="50" :src="${this.tempAvatar}"></el-avatar>-->
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
	min-width: 480px;
}
</style>
