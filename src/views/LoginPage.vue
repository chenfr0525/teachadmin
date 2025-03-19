<script setup>
import { studentLoginService, studentRegisterService } from '@/api/student'
import { adminRegisterService, adminLoginService } from '@/api/admin'
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useStudentStore, useAdminStore } from '@/stores'

import { useRouter } from 'vue-router'
const isRegister = ref(false)

const form = ref()
//注册
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
  gender: 'man',
  phone: '',
  role: 'student'
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是 2-10位 的字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur', },
    { len: 11, message: '电话号码必须是 11 位数字', trigger: 'blur', },
    { pattern: /^[0-9]+$/, message: '电话号码必须由数字组成', trigger: 'blur', },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        //判断value 和 当前 form中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

//注册
const register = async () => {
  await form.value.validate()
  if (formModel.value.role === 'student') {
    await studentRegisterService(formModel.value)
  } else if (formModel.value.role === 'admin') {
    await adminRegisterService(formModel.value)
  }

  ElMessage.success('注册成功')
  isRegister.value = false
}

const studentStore = useStudentStore()
const adminStore = useAdminStore()
const router = useRouter()
//登录
const login = async () => {
  await form.value.validate()
  if (formModel.value.role === 'student') {
    const res = await studentLoginService(formModel.value)
    studentStore.setToken(res.data.data.token)
    ElMessage.success(res.data.message || '登陆成功')
    router.push('/')
  } else if (formModel.value.role === 'admin') {
    const res = await adminLoginService(formModel.value)
    adminStore.setToken(res.data.data.token)
    ElMessage.success(res.data.message || '登陆成功')
    router.push('/admin')
  }
}

//切换时重置表单
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: '',
    gender: 'man',
    phone: '',
    role: 'student'
  }
})

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1 class="title">注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="gender">
          <el-radio-group v-model="formModel.gender">
            <el-radio label="man" value="1">男</el-radio>
            <el-radio label="woman" value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="formModel.phone" :prefix-icon="Lock" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-radio-group v-model="formModel.role">
            <el-radio label="student" value="student">学生端</el-radio>
            <el-radio label="admin" value="admin">管理员端</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1 class="title">登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-radio-group v-model="formModel.role">
            <el-radio value="student" label="student">学生端</el-radio>
            <el-radio value="admin" label="admin">管理员端</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" auto-insert-space>
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
}

.login-page .bg {
  background-color: #5e8d83;
  border-radius: 0 20px 20px 0;
}

.login-page .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-page .form .title {
  margin: 0 auto;
}

.login-page .form .button {
  width: 100%;
  color: #fff;
  background-color: #198754;
}

.login-page .form .flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>