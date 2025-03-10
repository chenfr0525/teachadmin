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
          <el-col v-for="(course, index) in courses" :key="index" :span="8">
            <el-card class="course-card" @click="viewCourse(course)">
              <h3>{{ course.title }}</h3>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CourseItem from '@/components/CourseItem.vue';

const router = useRouter();

console.log(router)

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
const courses = ref([
  {
    title: 'Vue 3 入门教程',
    description: '学习 Vue 3 的基础知识，掌握核心概念和用法。',
    id:1
  },
  {
    title: 'Vue 3 高级实战',
    description: '通过实战项目深入学习 Vue 3 的高级特性。',
    id:2
  },
  {
    title: 'Vue 3 与 TypeScript',
    description: '学习如何在 Vue 3 中使用 TypeScript 进行开发。',
    id:3
  },
]);

// 基础算法集锦数据
const basicAlgorithms = ref([
  {
    title: '快速排序',
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    description: '快速排序是一种分治算法，通过选择一个基准元素将数组分为两部分，然后递归排序。',
  },
  {
    title: '二分查找',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    description: '二分查找是一种高效的查找算法，适用于已排序的数组。',
  },
]);

// 常见错误集锦数据
const errorAlgorithms = ref([
  {
    title: '未定义的变量',
    code: `function add(a, b) {
  return a + b + x; // x 未定义
}`,
    reason: '变量 x 未定义，导致运行时错误。',
    correctCode: `function add(a, b) {
  const x = 0; // 定义 x
  return a + b + x;
}`,
  },
  {
    title: '缺少分号',
    code: `const a = 1
const b = 2
return a + b`,
    reason: 'JavaScript 中分号是可选的，但在某些情况下会导致解析错误。',
    correctCode: `const a = 1;
const b = 2;
return a + b;`,
  },
]);

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
const viewCourse = (course) => {
  courseNum.value=course.id
  isCourse.value=true
};
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