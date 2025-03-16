<template>
  <div class="learning-plan-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item @click="isCourse=false">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="courseNum" @click="isCourse=true">课程</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-if="!isCourse" class="detail-main">
      <!-- 推荐课程 -->
      <el-main class="courses-section">
        <h2 class="section-title">推荐课程</h2>
        <el-row :gutter="20">
          <el-col v-for="course in courses" :key="course.id" :span="8">
            <el-card class="course-card" @click="viewCourse(course.id)">
              <h3>{{ course.name }}</h3>
              <p>{{ course.description }}</p>
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
    </div>
    <div v-else class="detail-course">
       <CourseItem :courseId="courseNum"/>
    </div>
  </div>
</template>

<script setup>
import {getCommonErrorService} from '@/api/codelearn'
import {getAlgorithmService} from '@/api/codelearn'
import {getRecommendorClassic} from '@/api/course'
import {useStudentStore} from '@/stores'
import { ref, computed, onMounted } from 'vue';
import CourseItem from '@/components/CourseItem.vue';

const studentStore=useStudentStore()
// 当前选中的算法标签页
const activeAlgorithmTab = ref('basic');

// 当前展开的基础算法项
const activeBasicAlgorithms = ref([]);

// 当前展开的错误算法项
const activeErrorAlgorithms = ref([]);

// 搜索查询
const searchQuery = ref('');

// 推荐课程数据
const isCourse=ref(false)
const courseNum=ref()
const courses = ref([]);

const getCourseContent = async () => {
  const str=studentStore.plan.interests.split(',')
  let type
  str.forEach((item) => {
    if (item === '前端开发') {
      type = '前端'
    } else if (item === '后端开发') {
      type = '后端'
    } else if (item === '数据科学') {
      type = '数据'
    } else {
      type = '智能'
    }
  })
  const res = await getRecommendorClassic({type})
  courses.value=res.data.data.courses
}


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
  getCourseContent()
  getAlgorithms()
  getCommonError()
})
</script>

<style scoped lang="scss">
.learning-plan-page {
  padding: 20px;
  background-color: #f5f5f5;

  .breadcrumb {
    margin-bottom: 20px;
  }

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
</style>