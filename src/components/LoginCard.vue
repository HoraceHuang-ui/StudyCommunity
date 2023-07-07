<template>
	<div>
		<el-card class="login-card">
			<el-row>
				<el-col :span="24"><el-input v-model="phone" placeholder="手机号" /></el-col>
			</el-row>
			<div style="height: 20px;" />
			<el-row style="display: flex; justify-content: space-between; align-items: center;">
				<el-col :span="18"><el-input v-model="pwd" placeholder="密码" /></el-col>
				<el-col :span="6" link><el-button @click="forgotPwd">忘记密码</el-button></el-col>
			</el-row>
			<div style="height: 20px;" />
			<el-row style="display: flex; justify-content: center;">
				<el-col :span="6"><el-button @click="regShow = true" type="primary" plain>注册</el-button></el-col>
				<el-col :span="6"><el-button @click="login" type="primary">登录</el-button></el-col>
			</el-row>
		</el-card>
		<el-dialog v-model="regShow" :before-close="handleDialogClose" title="注册账号" width="400px"
			style="max-height: 800px;">
			<div v-if="step == 1">
				<el-row>
					<el-col :span="1">
						<div style="color: red">*</div>
					</el-col>
					<el-col :span="23"><el-input v-model="newUsername" placeholder="姓名"></el-input></el-col>
				</el-row>
				<div style="height: 10px;" />
				<el-row>
					<el-col :span="1"></el-col>
					<el-col :span="23"><el-input v-model="newPhone" placeholder="手机号"></el-input></el-col>
				</el-row>
				<div style="height: 10px;" />
				<el-row>
					<el-col :span="1">
						<div style="color: red">*</div>
					</el-col>
					<el-col :span="23"><el-input v-model="newPwd" placeholder="密码"></el-input></el-col>
				</el-row>
				<div style="height: 10px;" />
				<el-row>
					<el-col :span="1"></el-col>
					<el-col :span="11">
						<el-select v-model="role" value-key="id" placeholder="请选择身份">
							<el-option v-for="item in roles" :value="item" :key="item.id" :label="item.label" />
						</el-select>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="11">
						<el-select v-model="sex" value-key="id" placeholder="请选择性别">
							<el-option v-for="item in sexes" :value="item" :key="item.id" :label="item.label" />
						</el-select>
					</el-col>
				</el-row>
				<div style="height: 10px;" />
				<div>{{ role.desc }}</div>
				<div style="height: 30px;" />
			</div>

			<div v-if="step == 2">
				<el-row>
					<el-col :span="1">
						<div style="color: red">*</div>
					</el-col>
					<el-col :span="23"><el-input v-model="newSchool" placeholder="学校"></el-input></el-col>
				</el-row>
				<div style="height: 10px;" />
				<el-row>
					<el-col :span="1">
						<div style="color: red">*</div>
					</el-col>
					<el-col :span="23"><el-input v-model="newClazz" placeholder="班级"></el-input></el-col>
				</el-row>
				<div v-if="role.id == 1 || role.id == 2">
					<div style="height: 10px;" />
					<el-row>
						<el-col :span="1">
							<div style="color: red">*</div>
						</el-col>
						<el-col :span="23"><el-input v-model="newSubj" placeholder="任教学科"></el-input></el-col>
					</el-row>
				</div>
				<div v-if="role.id == 3">
					<div style="height: 10px;" />
					<el-row>
						<el-col :span="1">
							<div style="color: red">*</div>
						</el-col>
						<el-col :span="23"><el-input v-model="newChildID" placeholder="学生学号"></el-input></el-col>
					</el-row>
					<!-- 查询学号对应的名字显示在下面 -->
					<div v-if="newChildID != ''">success ? 学生姓名为xxx : 未找到学生</div>
				</div>
				<div style="height: 30px;" />
			</div>

			<div v-if="step == 3">
				<!-- <el-upload class="avatar-uploader" action="/api/common/register/upload" :show-file-list="false"
					:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon">
						<Plus />
					</el-icon>
				</el-upload> -->
				<input style="width: 74px;" type="file" id="uFile" name="uFile" @change="upload($event)" />
				<div style="height: 30px;" />
			</div>

			<el-row style="display: flex; justify-content: center;">
				<el-col v-if="step == 1 || step == 3" :span="6"><el-button @click="handleDialogClose"
						plain>取消</el-button></el-col>
				<el-col v-if="step > 1 && step < 3" :span="6"><el-button @click="step--" plain>上一步</el-button></el-col>
				<el-col v-if="step < 2" :span="6"><el-button @click="step++" type="primary">下一步</el-button></el-col>
				<el-col v-if="step == 2" :span="6"><el-button @click="register" type="primary">确认信息</el-button></el-col>
				<el-col v-if="step == 3" :span="6"><el-button @click="handleDialogClose"
						type="primary">完成</el-button></el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script setup >
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ApiPost } from '../utils/req'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Token } from '../utils/storage'

const imageUrl = ref('')
const urlResp = ref('')
const tempAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleAvatarSuccess = (
	response,
	uploadFile
) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw)
	urlResp.value = response.obj
	ElMessage.info("请勿继续上传头像，谢谢配合！")
}
const beforeAvatarUpload = (rawFile) => {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('用户头像需为jpg格式')
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('用户头像不可超过 2MB')
		return false
	}
	return true
}

const router = useRouter()

const step = ref(1)
const regShow = ref(false)
const phone = ref('')
const pwd = ref('')
const newUsername = ref('')
const newPhone = ref('')
const newPwd = ref('')
const newSchool = ref('')
const newClazz = ref('')
const newSubj = ref('')
const newChildID = ref('')
const roles = [
	{ id: 1, label: '班主任', desc: '班主任权限说明' },
	{ id: 2, label: '教师', desc: '教师权限说明' },
	{ id: 3, label: '家长', desc: '家长权限说明' },
	{ id: 4, label: '学生', desc: '学生权限说明' },]
const sexes = [
	{ id: 1, label: "男" },
	{ id: 2, label: "女" },]
const role = ref(roles[0])
const sex = ref(sexes[0])

const forgotPwd = () => {
	ElMessageBox.alert('请联系管理员找回')
}

const handleDialogClose = () => {
	regShow.value = false
	newUsername.value = ''
	step.value = 1
}

const login = async () => {
	try {
		const data = {
			username: phone.value,
			password: pwd.value
		}

		// const _data = await ApiPost('/api/common/login', data)
		const response = await axios.post('/api/common/login', data)
		const _data = response.data

		console.log(_data)

		if (_data.code == 200) {
			const _name = _data.obj.name
			const _token = _data.obj.tokenHead + _data.obj.token
			ElMessage.success(_name + '，您好！')

			localStorage.setItem('token', _token)

			router.push({
				name: 'mainpage'
			})
		} else {
			ElMessage.error(_data.message)
		}
	} catch (resp) {
		console.log(resp)
		ElMessage.error(resp.message || resp.data.message)
	}
}

const register = async () => {
	try {
		const regData = {
			username: newPhone.value,
			name: newUsername.value,
			clazzId: newClazz.value,
			sex: sex.value.id,
			role: role.value.id,
			schoolId: newSchool.value,
			password: newPwd.value,
			// https://avatars.githubusercontent.com/u/67905897?v=4
			avatar: tempAvatar,
			cover: ref('bbb').value,
			code: ref('000000').value
		}

		// const _data = await ApiPost('/common/register', regData)
		const response = await axios.post('/api/common/register', regData)
		console.log(response)
		const _data = response.data

		ElMessage.success(_data.message)
		// const ret = _data.obj
		// phone.value = ret.phonenum
		step.value++
	} catch (error) {
		console.error(error)
		ElMessage.error(error.message || error.data.message)
	}
}

const upload = (e) => {
	var files = document.getElementById('uFile').value;
	if (!/\.(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(files)) {
		ElMessage.warning("图片类型必须是.gif,jpeg,jpg,png中的一种,请重新上传")
		return false;
	}
	let file = e.target.files[0]
	let param = new FormData()
	param.append('username', newPhone.value)
	param.append('file', file)       // 通过append向form对象添加数据
	let config = {
		headers: { 'Content-Type': 'multipart/form-data' }
	}
	axios.post("/api/common/register/upload", param, config).then((res) => {
		if (res.data.code = 200) {
			ElMessage.success("添加成功")  //需要引入element
		} else {
			ElMessage.warning("添加失败")
		}
	}).catch((err) => {
		ElMessage.warning("图片上传失败，请重新上传!")
	})
}
</script>

<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.login-card {
	width: 400px;
	height: 175px;
}

.line {
	width: 100%;
	height: 0;
	border-top: 1px solid lightgray;
}

.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
