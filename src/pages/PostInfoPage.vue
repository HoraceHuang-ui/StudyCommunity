<script setup>
import { ref, onMounted } from 'vue'
import PostInfoCard from '../components/PostInfoCard.vue'
import { useRoute } from 'vue-router'
import { Token } from '../utils/storage';
import { ApiGet } from '../utils/req'

const route = useRoute()
const postID = route.query.postId

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
const commentText = ref('')
const commentToId = ref('')  // empty: to post

onMounted(async () => {
    try {
        const userResp = await ApiGet('getUserinfoByToken?token=' + Token.getToken())
        console.log(userResp)
        userInfo.value = userResp.obj
    } catch (error) {
        console.error(error);
    }
})

const sendComment = () => {
    console.log('hit send' + commentToId.value)
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
                    <el-dropdown class="navbar-item">{{ userInfo.name }}<el-icon
                            class="el-icon--right"><arrow-down /></el-icon></el-dropdown>
                    <!-- https://avatars.githubusercontent.com/u/67905897?v=4 -->
                    <el-avatar :src="userInfo.avatar" size="small" class="navbar-item"></el-avatar>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-row>
        <el-col :span="12">
            <PostInfoCard :postId="postID"></PostInfoCard>
        </el-col>
        <el-col :span="12" class="comments-area">
            <el-scrollbar height="95vh">
                <li v-for="o in 100">
                    <div>comment item {{ o }}</div>
                </li>
                <div style="height: 15.5vh;"></div>
            </el-scrollbar>
            <div class="bottom-input-container">
                <el-input placeholder="写评论…" v-model="commentText" class="bottom-input">
                    <template #append>
                        <el-button @click="sendComment">发送</el-button>
                    </template>
                </el-input>
            </div>
        </el-col>
    </el-row>
</template>

<style>
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

.comments-area {
    height: 85vh;
    padding: 2vh;
}

.bottom-input-container {
    height: 9vh;
    padding-top: 2vh;
}

.bottom-input {
    height: 100%;
    width: 100%;
}
</style>
