<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ApiGet } from '../utils/req'
import { ref, onMounted } from 'vue'
const props = defineProps({
    userInfo: {
        username: String,
        name: String,
        clazzId: String,
        schoolId: String,
        sex: String,
        role: String,
        avatar: String,
        cover: String
    },
    showBackButton: Boolean
})

const roles = ['班主任', '老师', '家长', '学生']

const router = useRouter()

const backClick = () => {
    router.go(-1)
}
</script>

<template>
    <div class="navbar">
        <el-row v-if="props.userInfo != null">
            <el-col :span="12">
                <div class="navbar-left">
                    <button class="navbar-item navbar-button" v-if="showBackButton" @click="backClick">
                        <el-icon>
                            <ArrowLeftBold />
                        </el-icon>
                    </button>
                    <div class="navbar-item">{{ props.userInfo.schoolId }}</div>
                    <div class="navbar-item">{{ props.userInfo.clazzId }}</div>
                    <el-tag class="navbar-item">{{ roles[props.userInfo.role - 1] }}</el-tag>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="navbar-right">
                    <el-dropdown class="navbar-item">{{ props.userInfo.name }}<el-icon
                            class="el-icon--right"><arrow-down /></el-icon></el-dropdown>
                    <!-- https://avatars.githubusercontent.com/u/67905897?v=4 -->
                    <el-avatar :src="props.userInfo.avatar" size="small" class="navbar-item"></el-avatar>
                </div>
            </el-col>
        </el-row>
        <div v-else style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: red;">
            No userInfo passed
        </div>
    </div>
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

.navbar-button {
    border-color: #409eff;
    background-color: aliceblue;
    border-radius: 10%;
}

.navbar-left {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.navbar-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
