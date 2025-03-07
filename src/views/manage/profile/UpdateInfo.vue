<script setup>
import { ref } from 'vue'
import { Iphone, Location,Tickets, User } from '@element-plus/icons-vue'

const isEditIntro = ref(true)
const introduce = ref('')
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
              <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size>上传头像</el-button>
            </div>
            <div class="intru">
              <h1>个人简介</h1>
              <p v-if="isEditIntro">这人很懒，还没有写个人介绍！</p>
              <el-input v-else v-model="introduce" maxlength="200" :rows="8" style="width: 200px;;" placeholder="请输入信息"
                show-word-limit type="textarea" />
              <el-button style="margin: 20px 45px;" v-if="isEditIntro" type="primary"
                @click="isEditIntro = false">编辑简介</el-button>
              <div v-else class="introButton" style="margin-top: 20px;display: flex;justify-content: center;">
                <el-button type="primary" @click="isEditIntro = true">取消</el-button>
                <el-button type="primary">确定</el-button>
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
            <el-form size="large">
              <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="phone">
                <el-input :prefix-icon="Iphone" placeholder="请输入电话号码"></el-input>
              </el-form-item>
              <el-form-item prop="address">
                <el-input :prefix-icon="Location" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item prop="remark">
                <el-input :prefix-icon="Tickets" placeholder="请输入标签"></el-input>
              </el-form-item>
              <el-form-item prop="home">
                <el-input :prefix-icon="Location" placeholder="请输入家庭地址"></el-input>
              </el-form-item>
              <el-form-item class="flex-button">
                <el-button type="primary">恢复原样</el-button>
                <el-button type="success">提交修改</el-button>
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