<template>
  <div class="learning-plan-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item @click="isCourse = false">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="courseNum" @click="isCourse = true">课程</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="personalized-learning-page" v-if="!isCourse">
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
            plan.interests }}</el-descriptions-item>
          <el-descriptions-item label="当前水平">{{ plan.level }}</el-descriptions-item>
        </el-descriptions>
      </el-main>

      <!-- 推荐课程 -->
      <el-main class="courses-section">
        <h2 class="section-title">推荐课程</h2>
        <el-row :gutter="20">
          <el-col v-for="course in courses" :key="course.id" :span="8">
            <el-card class="course-card" @click="viewCourse(course.id)">
              <h3>{{ course.name }}</h3>
              <p class="course_desdescription">{{ course.description }}</p>
              <el-button type="primary" @click="viewCourse(course.id)">开始学习</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <!-- 算法知识 -->
      <el-main class="algorithms-section">
        <h2 class="section-title">算法知识</h2>
        <!-- 搜索栏 -->
        <el-input v-model="searchQuery" placeholder="搜索算法或错误" class="search-input" />
        <el-tabs v-model="activeAlgorithmTab">
          <!-- 基础算法集锦 -->
          <el-tab-pane label="基础算法集锦" name="basic">
            <el-collapse v-model="activeBasicAlgorithms">
              <el-collapse-item v-for="(algorithm, index) in filteredBasicAlgorithms" :key="index"
                :title="algorithm.title" :name="index">
                <div class="algorithm-content">
                  <h3>代码实现：</h3>
                  <pre>{{ algorithm.code }}</pre>
                  <h3>算法描述：</h3>
                  <p>{{ algorithm.description }}</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>

          <!-- 常见错误集锦 -->
          <el-tab-pane label="常见错误集锦" name="errors">
            <el-collapse v-model="activeErrorAlgorithms">
              <el-collapse-item v-for="(error, index) in filteredErrorAlgorithms" :key="index" :title="error.title"
                :name="index">
                <div class="error-content">
                  <h3>错误代码：</h3>
                  <pre>{{ error.code }}</pre>
                  <h3>错误原因：</h3>
                  <p>{{ error.reason }}</p>
                  <h3>正确写法：</h3>
                  <pre>{{ error.correctCode }}</pre>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
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

    <div v-else class="detail-course">
      <CourseItem :courseId="courseNum" />
    </div>
  </div>
</template>

<script setup>
import {getCommonErrorService} from '@/api/codelearn'
import {getAlgorithmService} from '@/api/codelearn'
import { updatePlanService } from '@/api/plan'
import { getRecommendorClassic } from '@/api/course'
import { useStudentStore } from '@/stores'
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import CourseItem from '@/components/CourseItem.vue';
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
const courses = ref([]);
const isCourse=ref(false)
const courseNum=ref()
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
  courses.value = res.data.data.courses
  console.log(courses.value)
}

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
    interests: [],
    level: plan.value.level,
  }
  ElMessage.success('更新学习计划成功')
  planDialogVisible.value = false
  getCourseContent()
}

// 当前选中的算法标签页
const activeAlgorithmTab = ref('basic');

// 当前展开的基础算法项
const activeBasicAlgorithms = ref([]);

// 当前展开的错误算法项
const activeErrorAlgorithms = ref([]);

// 搜索查询
const searchQuery = ref('');

// 基础算法集锦数据
const basicAlgorithms = ref([]);

//获取算法集锦
const getAlgorithms = async () => {
  const res = await getAlgorithmService();
  basicAlgorithms.value = res.data.data.basicalgorithms;
};


// 常见错误集锦数据
const errorAlgorithms = ref([]);

//获取错误集锦
const getCommonError = async () => {
  const res = await getCommonErrorService();
  errorAlgorithms.value = res.data.data.commonerrors;
};

// 过滤基础算法
const filteredBasicAlgorithms = computed(() => {
  return basicAlgorithms.value.filter((algorithm) =>
    algorithm.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 过滤常见错误
const filteredErrorAlgorithms = computed(() => {
  return errorAlgorithms.value.filter((error) =>
    error.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 查看课程详情
const viewCourse = (id) => {
  courseNum.value=id
  isCourse.value=true
};

onMounted(() => {
  getPlanContent()
  getCourseContent()
  getAlgorithms()
  getCommonError()
})

</script>

<style scoped lang="scss">
.learning-plan-page {
  padding: 20px;
  background-color: #f5f5f5;

  .personalized-learning-page {
    padding: 10px 20px;
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
    .courses-section,
    .courses-section,
    .algorithms-section {
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

    .search-input {
    margin-bottom: 20px;
  }

  .course-card {
    margin-bottom: 20px;
    transition: transform 0.3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 18px;
      color: #5e8d83;
      margin-bottom: 10px;
    }

    p {
      height: 40px;
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
    }
  }

  .algorithm-content,
  .error-content {
    padding: 10px;

    h3 {
      font-size: 16px;
      color: #5e8d83;
      margin-bottom: 10px;
    }

    pre {
      white-space: pre-wrap;
      font-family: monospace;
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 4px;
    }

    p {
      font-size: 14px;
      color: #666;
    }
  }

  }

  .detail-course{
    margin-top: 20px;
  }
}
</style>