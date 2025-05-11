<script setup>
import {useAdminStore} from '@/stores'
import {adminGetInfoService,adminUpdateInfoService, adminUploadAvatarService} from '@/api/admin.js'
import { ref,onMounted } from 'vue'
import { Plus,Iphone, Location,User,Upload } from '@element-plus/icons-vue'
const adminStore=useAdminStore()
//图片Ref
const uploadRef = ref()
const imgUrl = ref()

const formModel=ref({})
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
//管理员信息
const admin=ref({})
//表单数据
const form=ref({})
//个人简介
const isEditIntro = ref(true)
const introduce = ref('')
//获取管理员信息
const getAdminData=async()=>{
  const res=await adminGetInfoService()
  admin.value=res.data.data.admin
  form.value={...admin.value}
  introduce.value=admin.value.bio
}
//修改个人简介
const updateBio=async()=>{
const res=await adminUpdateInfoService(admin.value.id,{bio:introduce.value})
adminStore.getUser()
getAdminData()
isEditIntro.value = true
ElMessage.success('保存成功');
}
// 保存修改
const handleSave = async() => {
  await formModel.value.validate()
  const {username,gender,address,home_address,phone}=form.value
  await adminUpdateInfoService(admin.value.id,{username,gender,address,home_address,phone})
  adminStore.getUser()
getAdminData()
  ElMessage.success('保存成功');
};

// 取消修改
const handleCancel = () => {
  form.value = { ...admin.value };
  ElMessage.info('已取消修改');
};

const fileRaw = ref(null) // 新增一个ref来保存原始文件
const onSelectFile = (file) => {
  fileRaw.value = file.raw // 保存原始文件对象
  //基于 FileReader 读取图片做预览
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
};

// 上传头像成功
const handleAvatarSuccess = async() => {
  if(!fileRaw.value) {
    ElMessage.error('请先选择图片');
    return;
  }
  const formData = new FormData();
  formData.append('file', fileRaw.value); // 字段名必须为 'file'（和后端一致)

   try {
    await adminUploadAvatarService(formData)
    await getAdminData()
    ElMessage.success('头像上传成功');
    fileRaw.value = null // 上传成功后清空
  } catch (error) {
    ElMessage.error('上传失败')
  }
};

onMounted(() => {
  getAdminData()
})
</script>

<template>
  <el-card shadow="always">
    <el-container>
      <el-aside width="300px">
        <el-card shadow="never">
          <div class="info-one">
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
              <el-button @click="handleAvatarSuccess" type="success" :icon="Upload" size>上传头像</el-button>
            </div>
            <div class="intru">
              <h1>个人职责</h1>
              <p v-if="isEditIntro">{{admin.bio||'这人还没有职责！'}}</p>
              <el-input v-else v-model="introduce" maxlength="200" :rows="8" style="width: 240px;;" placeholder="请输入信息"
                show-word-limit type="textarea" />
              <el-button style="margin: 20px 45px;" v-if="isEditIntro" type="primary"
                @click="isEditIntro = false">编辑职责</el-button>
              <div v-else class="introButton" style="margin-top: 20px;display: flex;justify-content: center;">
                <el-button type="primary" @click="isEditIntro = true">取消</el-button>
                <el-button type="primary" @click="updateBio">确定</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="24">
            <h1 style="font-size: 20px;">个人信息</h1>
          </el-col>
        </el-row>
        <el-row style="margin-top: 40px;">
          <el-col :offset="2" :span="22">
            <el-form ref="formModel" :model="form" :rules="rules" size="large" label-width="auto">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :value="1" size="large">男</el-radio>
            <el-radio :value="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone" :prefix-icon="Iphone" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" :prefix-icon="Location" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="家庭地址" prop="home_address">
                <el-input v-model="form.home_address" :prefix-icon="Location" placeholder="请输入家庭地址"></el-input>
              </el-form-item>
              <el-form-item class="flex-button">
                <el-button type="primary" @click="handleCancel">恢复原样</el-button>
                <el-button type="success" @click="handleSave">提交修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-card>
</template>

<style lang="scss" scoped>
.el-aside .el-card {
  .info-one {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
            width: 278px;
            height: 278px;
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

      h1 {
        font-size: 20px;
        margin-bottom: 20px;

        p {
          height: 100px;
          text-align: start;
        }

      }
    }
  }
}

.el-main {
  .el-row .el-col .flex-button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>