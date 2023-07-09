<script setup>
import { ref, onMounted } from 'vue'
import PostInfoCard from '../components/PostInfoCard.vue'
import TopHeader from '../components/TopHeader.vue'
import { useRoute, useRouter } from 'vue-router'
import { Token } from '../utils/storage';
import { ApiGet, ApiPost } from '../utils/req'

const route = useRoute()
const postID = route.query.postId
const comments = ref([])
const commentSenders = ref([])

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
const commentToSend = ref({
    commentId: '',
    postId: '',
    username: '',
    detail: '',
    postTime: ''
})
const roles = ['班主任', '老师', '家长', '学生']
const commentText = ref('')
const commentToId = ref('')  // empty: to post

onMounted(async () => {
    try {
        const userResp = await ApiGet('getUserinfoByToken?token=' + Token.getToken())
        console.log(userResp)
        userInfo.value = userResp.obj

        const commsResp = await ApiGet('comment/get?postId=' + postID)
        console.log(commsResp)
        comments.value = commsResp.obj

        for (let i = 0; i < comments.value.length; i++) {
            const comment = comments.value[i]
            const commUserResp = await ApiGet('getUserinfoById?username=' + comment.username)
            commentSenders.value.push(commUserResp.obj)
        }
    } catch (error) {
        console.error(error);
    }
})

const sendComment = async () => {
    commentToSend.value.detail = commentText.value
    commentToSend.value.postId = postID
    console.log('comment on ' + postID)
    commentToSend.value.username = userInfo.value.username
    if (commentToId.value != '') commentToSend.value.commentId = commentToId.value
    else commentToSend.value.commentId = null
    commentToSend.value.postTime = getTimestamp()

    const commResp = await ApiPost('comment/save', commentToSend.value)
    console.log(commResp)

    commentToId.value = ''
    location.reload()
}

// let curComment = 0
// const initComment = async (comment) => {
//     console.log('comment init' + comment.username)
//     const userResp = await ApiGet('getUserinfoById?username=' + comment.username)
//     curComment++
//     console.log(userResp)
//     commentSenders.value.push(userResp.obj)
//     console.log(userResp.obj)
// }

const getTimestamp = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" +
        (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes() + ":")
        + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
    const timestamp = date + ' ' + time;
    return timestamp;
}
</script>

<template>
    <TopHeader :userInfo="userInfo" :showBackButton="true" />
    <el-row>
        <el-col :span="12">
            <PostInfoCard :postId="postID"></PostInfoCard>
        </el-col>
        <el-col :span="12" class="comments-area">
            <el-scrollbar height="95vh">
                <li v-for="(comment, index) in comments" style="list-style-type: none;">
                    <el-row class="comment-block">
                        <el-col :span="5">
                            <div class="comment-block-left">
                                <el-avatar v-if="commentSenders[index]" size="large" :src="commentSenders[index].avatar" />
                            </div>
                        </el-col>
                        <el-col :span="19" style="comment-block-right">
                            <div style="padding-top: 7px;">
                                <div style="comment-right-header">
                                    <div style="display: flex; flex-direction: row;">
                                        <div v-if="commentSenders[index]" style="font-weight: bold;">{{
                                            commentSenders[index].name }}</div>
                                        <el-tag v-if="commentSenders[index]" style="margin-left: 5px;">{{
                                            roles[commentSenders[index].role - 1]
                                        }}</el-tag>
                                        <el-text style="margin-left: 5px;" size="small" type="info">{{ comment.postTime
                                        }}</el-text>
                                    </div>
                                </div>
                                <div style="text-align: left;">{{ comment.detail }}</div>
                            </div>
                        </el-col>
                    </el-row>
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
.main-width {
    width: 50%;
    min-width: 300px;
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

.bottom-block {
    width: 100%;
    padding: 5px;
}

.comment-block {
    display: flex;
    flex-direction: row;
    margin-bottom: 2vh;
}

.comment-block-left {
    display: grid;
}

.comment-block-right {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
}

.comment-right-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: left;
    text-align: left;
}
</style>
