<template>
  <div class="empty-page">
    <div class="empty-content">
      <el-icon :size="100"><User /></el-icon>
      <h2>您尚未设置个性化学习计划</h2>
      <p>请先设置您的学习目标、兴趣领域和当前水平，以便我们为您推荐合适的学习内容。</p>
      <el-button type="primary" @click="showProfileDialog">设置学习计划</el-button>
    </div>

    <!-- 设置学习计划的对话框 -->
    <el-dialog v-model="profileDialogVisible" title="设置学习计划" width="600px">
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

<script setup>
import { ref } from 'vue';
import { User } from '@element-plus/icons-vue';

// 用户画像数据
const profile = ref({
  goal: '',
  interests: [],
  level: '',
});

// 对话框是否可见
const profileDialogVisible = ref(false);

// 显示对话框
const showProfileDialog = () => {
  profileDialogVisible.value = true;
};

// 保存用户画像并触发父组件事件
const emit = defineEmits(['set-profile']);
const saveProfile = () => {
  profileDialogVisible.value = false;
  emit('set-profile', profile.value); // 触发父组件事件
};
</script>

<style scoped lang="scss">
.empty-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 650px;

  .empty-content {
    text-align: center;

    .el-icon {
      color: #5e8d83;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 24px;
      color: #5e8d83;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }
  }
}
</style>