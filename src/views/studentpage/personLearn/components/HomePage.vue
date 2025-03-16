<script setup>
import { updatePlanService } from '@/api/plan'
import { getRecommendorClassic } from '@/api/course'
import { useStudentStore } from '@/stores'
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const studentStore = useStudentStore()

//form里的plan计划
const formPlan = ref({
  goal: '',
  interests: [],
  level: '',
})

// 用户画像数据
const plan = ref({
  goal: '',
  interests: '',
  level: '初级',
});

const form = ref()

//设置规则
const rules = {
  goal: [
    { required: true, message: '请输入你的学习目标', trigger: 'blur' },
    { min: 2, max: 30, message: '学习目标必须是 2-30位 的字符', trigger: 'blur' }
  ],
  interests: [
    { type: 'array', required: true, message: '请至少选择一个兴趣', trigger: 'change' }
  ]
}

const getPlanContent = () => {
  plan.value = studentStore.plan
  let planList = studentStore.plan
  planList.interests = typeof planList.interests === 'string'
    ? planList.interests.split(',') // 如果是字符串，用逗号分割成数组
    : Array.isArray(planList.interests)
      ? planList.interests // 如果已经是数组，直接使用
      : []; // 如果不是字符串也不是数组，返回空数组
  formPlan.value = planList
}

// 推荐内容数据
const recommendations = ref([]);
const typeRef = computed(() => {
  let data
  formPlan.value.interests.forEach((item) => {
    if (item === '前端开发') {
      data = '前端'
    } else if (item === '后端开发') {
      data = '后端'
    } else if (item === '数据科学') {
      data = '数据'
    } else {
      data = '智能'
    }
  })
  return data
})

const getCourseContent = async () => {
  let type = typeRef.value
  const res = await getRecommendorClassic({ type })
  recommendations.value = res.data.data.courses
  console.log(recommendations.value)
}

// 学习进度数据
const progress = ref([
  { title: 'Vue 3 入门教程', status: '进行中', progress: '50%' },
  { title: 'Python 数据分析', status: '未开始', progress: '0%' },
  { title: '机器学习实战', status: '已完成', progress: '100%' },
]);

const getProgress = () => {
}

onMounted(() => {
  getPlanContent()
  getCourseContent()
})


// 对话框是否可见
const planDialogVisible = ref(false);

// 显示对话框
const showProfileDialog = () => {
  planDialogVisible.value = true;
};

// 保存用户学习计划
const saveProfile = async () => {
  await form.value.validate()
  const planList = formPlan.value
  planList.interests = planList.interests.join(',')
  await updatePlanService(planList)
  studentStore.setPlan(planList)
  formPlan.value = {
    goal: plan.value.goal,
    interests:[],
    level: plan.value.level,
  }
  ElMessage.success('更新学习计划成功')
  planDialogVisible.value = false
  getCourseContent()
}

// 开始学习
const startLearning = (item) => {
  console.log('开始学习：', item.title);
  // 这里可以跳转到学习页面
  router.push('/user/personlearndetail')
}
</script>

<template>
  <div class="personalized-learning-page">
    <!-- 头部 -->
    <el-header class="header">
      <h1 class="page-title">个性化学习</h1>
      <el-button type="primary" @click="showProfileDialog">重新设置学习计划</el-button>
    </el-header>

    <!-- 用户画像 -->
    <el-main class="plan-section">
      <h2 class="section-title">您的学习画像</h2>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="学习目标">{{ plan.goal }}</el-descriptions-item>
        <el-descriptions-item label="兴趣领域">{{ Array.isArray(plan.interests) ? plan.interests.join(',') :
          plan.interests}}</el-descriptions-item>
        <el-descriptions-item label="当前水平">{{ plan.level }}</el-descriptions-item>
      </el-descriptions>
    </el-main>

    <!-- 个性化推荐 -->
    <el-main class="recommendations-section">
      <h2 class="section-title">为您推荐</h2>
      <el-row :gutter="20">
        <el-col v-for="course in recommendations.splice(0, 3)" :key="course.id" :span="8">
          <el-card class="recommendation-card">
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
            <el-button type="primary" @click="startLearning(course.id)">开始学习</el-button>
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
    <el-dialog v-model="planDialogVisible" title="重新设置学习计划" width="600px">
      <el-form :model="formPlan" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="学习目标" prop="goal">
          <el-input v-model="formPlan.goal" placeholder="请输入您的学习目标" />
        </el-form-item>
        <el-form-item label="兴趣领域" prop="interests">
          <el-checkbox-group v-model="formPlan.interests">
            <el-checkbox label="前端开发" value="前端开发" />
            <el-checkbox label="后端开发" value="后端开发" />
            <el-checkbox label="数据科学" value="数据科学" />
            <el-checkbox label="人工智能" value="人工智能" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="当前水平" prop="level">
          <el-radio-group v-model="formPlan.level">
            <el-radio label="初级" value="初级" />
            <el-radio label="中级" value="中级" />
            <el-radio label="高级" value="高级" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="planDialogVisible = false">取消</el-button>
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

  .plan-section,
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