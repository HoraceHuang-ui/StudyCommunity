<script setup>
import TopHeader from '../components/TopHeader.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { ApiGet, ApiPost } from '../utils/req';
import { Token } from '../utils/storage';
import { Edit } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const editTitle = ref('')
const editDetail = ref('')
const editImage = ref('')
const editPostId = ref('')
const globalStore = useGlobalStore()

const userInfo = computed(() => globalStore.userInfo)

const upload = async (e) => {
    var files = document.getElementById('uFile').value;
    if (!/\.(jpg|jpeg|png)$/i.test(files)) {
        ElMessage.warning("图片类型必须是jpeg,jpg,png中的一种,请重新上传")
        return false;
    }
    let file = e.target.files[0]
    let param = new FormData()
    param.append('postId', editPostId.value)
    param.append('file', file)
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: Token.getToken()
        }
    }
    await axios.post(editPostId.value == '' ? "/api/post/file/save" : "/api/post/file/update", param, config).then((res) => {
        if (res.data.code = 200) {
            ElMessage.success("上传成功，请勿继续上传，谢谢配合！")
            editImage.value = res.data.obj[0]
            editPostId.value = res.data.obj[1]
        } else {
            ElMessage.warning("添加失败")
        }
    }).catch(() => {
        ElMessage.warning("图片上传失败，请重新上传!")
    })
}

const router = useRouter()
const sendClick = async () => {
    const timestamp = getTimestamp()
    const data = {
        title: editTitle.value,
        detail: editDetail.value,
        image: editImage.value,
        postId: editPostId.value,
        postTime: timestamp,
        username: userInfo.value.username,
        clazzId: userInfo.value.clazzId,
        likes: 0
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: Token.getToken()
    }

    if (editPostId.value == '') {
        await ApiPost('post/save', data)
    } else {
        // update post
        await axios.put('/api/post/update', data, { headers })
    }
    router.go(-1)
}

const route = useRoute()
onMounted(async () => {
    if (route.query.postId && route.query.postId != '') {
        editPostId.value = route.query.postId
        const postResp = await ApiGet('post/get?postId=' + editPostId.value)

        editPostId.value = postResp.obj.postId
        editTitle.value = postResp.obj.title
        editDetail.value = postResp.obj.detail
        editImage.value = postResp.obj.image
    }
})

const getTimestamp = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" +
        (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes() + ":")
        + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
    const timestamp = date + ' ' + time
    return timestamp
}
</script>

<template>
    <TopHeader :showBackButton="true" />
    <div class="col-container">
        <el-button class="main-width" type="primary" :icon="Promotion" plain @click="sendClick"
            style="margin-top: 20px;">发布</el-button>
        <el-input class="main-width" style="margin-top: 10px;" v-model="editTitle" placeholder="输入标题…" autosize
            type="textarea" />
        <div style="height: 10px;"></div>
        <el-input class="main-width" v-model="editDetail" placeholder="输入正文…" :autosize="{ minRows: 3 }" type="textarea" />
        <div class="main-width word-count-text">字数：{{ editDetail.length }} / 9999</div>
        <div class="main-width" style="margin-top: 10px; text-align: left;">上传图片：</div>
        <input class="main-width" style="margin-top: 10px;" type="file" id="uFile" name="uFile" @change="upload($event)" />
        <el-image v-if="editImage != ''" class="main-width" style="margin-top: 10px; border-radius: 20px;"
            :src="editImage"></el-image>
    </div>
    <el-backtop />
</template>

<style scoped>
.col-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    width: 100%;
}

.word-count-text {
    text-align: right;
    font-size: 12px;
    font-style: italic;
    color: #888888;
}

.main-width {
    width: 50%;
    min-width: 300px;
}
</style>
