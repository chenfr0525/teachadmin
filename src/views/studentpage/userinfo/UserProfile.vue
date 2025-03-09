<template>
  <div class="student-profile">
    <!-- 左侧 Aside 区域 -->
    <el-aside class="aside">
      <div class="aside-content">
        <!-- 头像 -->
        <el-avatar :size="180" :src="student.avatar" class="avatar" />
        <!-- 个人介绍 -->
        <div class="student-bio">
          <h1>个人简介</h1>
          <p>{{ student.bio }}</p>
        </div>
      </div>
    </el-aside>

    <!-- 右侧 Main 区域 -->
    <el-main class="main">
      <h1 class="main-title">个人资料</h1>
      <!-- 个人资料信息 -->
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ student.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ student.gender }}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{ student.birthdate }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ student.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ student.email }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ student.address }}</el-descriptions-item>
        <el-descriptions-item label="学校">{{ student.school }}</el-descriptions-item>
      </el-descriptions>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟学生数据
const student = ref({
  name: '张三',
  gender: '男',
  birthdate: '2000-01-01',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  address: '北京市海淀区',
  school: '清华大学',
  bio: '热爱编程，喜欢挑战新技术，积极参与开源项目。',
  avatar: 'https://via.placeholder.com/120',
});
</script>

<style scoped lang="scss">
.student-profile {
  display: flex;
  height: 600px;
  background-color: #f5f5f5;

  .aside {
    width: 300px;
    background-color: #5e8d83;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .aside-content {
      text-align: center;
      .avatar {
        margin-bottom: 50px;
      }

      .student-bio {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 14px;
        color: white;
        text-align: start;
        h1 {
          font-size: 20px;
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

    .el-descriptions {
      margin-top: 20px;

      :deep(.el-descriptions__label) {
        width: 100px;
        font-weight: bold;
      }
    }
  }
}
</style>