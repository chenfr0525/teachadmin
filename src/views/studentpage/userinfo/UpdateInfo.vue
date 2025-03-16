<script setup>
import {useStudentStore} from '@/stores'
import { ref, onMounted} from 'vue';
import { Plus, Upload } from '@element-plus/icons-vue'
import { studentGetInfoService,studentUpdateInfoService } from '@/api/student'

const studentStore=useStudentStore()

const formModel=ref()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是 2-10位 的字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur', },
    { len: 11, message: '电话号码必须是 11 位数字', trigger: 'blur', },
    { pattern: /^[0-9]+$/, message: '电话号码必须由数字组成', trigger: 'blur', },
  ]
}

// 模拟学生数据
const student = ref({});

// 表单数据
const form = ref({});

//个人简介
const isEditIntro = ref(true)
const introduce = ref('')

//获取学生信息
const getStudentData=async()=>{
  const res = await studentGetInfoService()
  student.value=res.data.data.student
  form.value={...student.value}
  introduce.value=student.value.bio
}

onMounted(() => {
  getStudentData()
})



// 上传头像成功
const handleAvatarSuccess = (response, file) => {
  student.value.avatar = URL.createObjectURL(file.raw);
  ElMessage.success('头像上传成功');
};

//修改简介
const updateBio=async()=>{
const res=await studentUpdateInfoService(student.value.id,{bio:introduce.value})
studentStore.getUser()
getStudentData()
isEditIntro.value = true
ElMessage.success('保存成功');
}

// 保存修改
const handleSave = async() => {
  await formModel.value.validate()
  const {username,gender,birthdate,phone,email,address,school}=form.value
  await studentUpdateInfoService(student.value.id,{username,gender,birthdate,phone,email,address,school})
  studentStore.getUser()
  getStudentData()
  ElMessage.success('保存成功');
};

// 取消修改
const handleCancel = () => {
  form.value = { ...student.value };
  ElMessage.info('已取消修改');
};
</script>

<template>
  <div class="student-profile">
    <!-- 左侧 Aside 区域 -->
    <el-aside class="aside">
      <div class="aside-content">
        <!-- 头像 -->
        <div class="update-avatar">
          <el-upload ref="uploadRef" :on-change="onSelectFile" :auto-upload="false" class="avatar-uploader"
            :show-file-list="false">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus"
            size>选择图片</el-button>
          <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size>上传头像</el-button>
        </div>
        <!-- 个人介绍 -->
        <div class="intru">
          <h1>个人简介</h1>
          <p v-if="isEditIntro">{{ introduce||'这人很懒，还没有写个人介绍！'}}</p>
          <el-input v-else v-model="introduce" maxlength="200" :rows="8" style="width: 245px;;" placeholder="请输入信息"
            show-word-limit type="textarea" />
          <el-button style="margin: 20px 45px;" v-if="isEditIntro" type="primary"
            @click="isEditIntro = false">编辑简介</el-button>
          <div v-else class="introButton" style="margin-top: 20px;display: flex;justify-content: center;">
            <el-button type="primary" @click="isEditIntro = true">取消</el-button>
            <el-button type="primary" @click="updateBio">确定</el-button>
          </div>
        </div>
      </div>
    </el-aside>

    <!-- 右侧 Main 区域 -->
    <el-main class="main">
      <h1 class="main-title">修改个人资料</h1>
      <!-- 编辑表单 -->
      <el-form ref="formModel" :model="form" :rules="rules" label-width="100px" class="edit-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :value="1" size="large">男</el-radio>
            <el-radio :value="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birthdate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="form.school" />
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<style scoped lang="scss">
.student-profile {
  display: flex;
  height: 600px;
  background-color: #f5f5f5;

  .aside {
    width: 300px;
    background-color: #5e8d83;
    display: flex;
    justify-content: center;
    align-items: center;

    .aside-content {
      text-align: center;

      .update-avatar {
        .avatar-uploader {
          :deep() {
            .avatar {
              width: 180px;
              height: 180px;
              display: block;
            }

            .el-upload {
              border: 1px dashed var(--el-border-color);
              width: 220px;
              height: 220px;
              border-radius: 50%;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              transition: var(--el-transition-duration-fast);
            }

            .el-upload:hover {
              border-color: var(--el-color-primary);
            }

            .el-icon.avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 200px;
              height: 200px;
              text-align: center;
            }
          }
        }

        .el-button {
          margin: 20px 10px;
        }
      }


      .intru {
        display: flex;
        flex-direction: column;
        color: #fff;

        h1 {
          font-size: 20px;
          margin-bottom: 10px;

          p {
            height: 100px;
          }

        }
      }
    }
  }

  .main {
    flex: 1;
    padding: 20px;
    background-color: white;

    .main-title {
      font-size: 24px;
      color: #5e8d83;
      margin-bottom: 20px;
    }

    .edit-form {
      max-width: 600px;
      margin-top: 20px;

      .el-form-item {
        margin-bottom: 20px;
      }
    }
  }
}
</style>