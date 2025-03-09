<script setup>
import { ref } from 'vue';

// 用户画像数据
const profile = ref({
  goal: '掌握前端开发技能',
  interests: ['前端开发', '数据科学'],
  level: '中级',
});

// 推荐内容数据
const recommendations = ref([
  {
    title: 'Vue 3 入门教程',
    description: '学习 Vue 3 的基础知识，掌握核心概念和用法。',
    type: '视频',
    duration: '2小时',
    difficulty: '初级',
  },
  {
    title: 'Python 数据分析',
    description: '使用 Python 进行数据清洗、分析和可视化。',
    type: '文章',
    duration: '1小时',
    difficulty: '中级',
  },
  {
    title: '机器学习实战',
    description: '通过实战项目学习机器学习算法和应用。',
    type: '项目',
    duration: '5小时',
    difficulty: '高级',
  },
]);

// 学习进度数据
const progress = ref([
  { title: 'Vue 3 入门教程', status: '进行中', progress: '50%' },
  { title: 'Python 数据分析', status: '未开始', progress: '0%' },
  { title: '机器学习实战', status: '已完成', progress: '100%' },
]);

// 对话框是否可见
const profileDialogVisible = ref(false);

// 显示对话框
const showProfileDialog = () => {
  profileDialogVisible.value = true;
};

// 保存用户画像
const saveProfile = () => {
  profileDialogVisible.value = false;
  console.log('保存用户画像：', profile.value);
  // 这里可以调用 API 保存用户数据
};

// 开始学习
const startLearning = (item) => {
  console.log('开始学习：', item.title);
  // 这里可以跳转到学习页面
};
</script>

<template>
  <div class="personalized-learning-page">
    <!-- 头部 -->
    <el-header class="header">
      <h1 class="page-title">个性化学习</h1>
      <el-button type="primary" @click="showProfileDialog">重新设置学习计划</el-button>
    </el-header>

    <!-- 用户画像 -->
    <el-main class="profile-section">
      <h2 class="section-title">您的学习画像</h2>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="学习目标">{{ profile.goal }}</el-descriptions-item>
        <el-descriptions-item label="兴趣领域">{{ profile.interests.join(', ') }}</el-descriptions-item>
        <el-descriptions-item label="当前水平">{{ profile.level }}</el-descriptions-item>
      </el-descriptions>
    </el-main>

    <!-- 个性化推荐 -->
    <el-main class="recommendations-section">
      <h2 class="section-title">为您推荐</h2>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in recommendations"
          :key="index"
          :span="8"
        >
          <el-card class="recommendation-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <el-button type="primary" @click="startLearning(item)">开始学习</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- 学习进度 -->
    <el-main class="progress-section">
      <h2 class="section-title">学习进度</h2>
      <el-table :data="progress" style="width: 100%">
        <el-table-column prop="title" label="学习内容" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="progress" label="进度" />
      </el-table>
    </el-main>

    <!-- 重新设置学习计划的对话框 -->
    <el-dialog v-model="profileDialogVisible" title="重新设置学习计划" width="600px">
      <el-form :model="profile" label-width="120px">
        <el-form-item label="学习目标">
          <el-input v-model="profile.goal" placeholder="请输入您的学习目标" />
        </el-form-item>
        <el-form-item label="兴趣领域">
          <el-checkbox-group v-model="profile.interests">
            <el-checkbox label="前端开发" />
            <el-checkbox label="后端开发" />
            <el-checkbox label="数据科学" />
            <el-checkbox label="人工智能" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="当前水平">
          <el-radio-group v-model="profile.level">
            <el-radio label="初级" />
            <el-radio label="中级" />
            <el-radio label="高级" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="profileDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.personalized-learning-page {
  padding: 20px;
  background-color: #f5f5f5;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .page-title {
      font-size: 24px;
      color: #5e8d83;
      margin: 0;
    }
  }

  .profile-section,
  .recommendations-section,
  .progress-section {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;

    .section-title {
      font-size: 20px;
      color: #5e8d83;
      margin-bottom: 20px;
    }
  }

  .recommendation-card {
    margin-bottom: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 18px;
      color: #5e8d83;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
    }
  }
}
</style>