<script setup>
import {getRecommendorClassic} from '@/api/course'
import { ref, computed,onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';

// 模拟课程数据
const courses = ref([]);

//获取课程列表
const getCourseList=async()=>{
  const res=await getRecommendorClassic()
  courses.value=res.data.data.courses
  courses.value.forEach(item => {
    item.image_url = 'http://localhost:3000'+item.image_url
  })
}

onMounted(()=>{
  getCourseList()
})

// 搜索查询
const searchQuery = ref('');

// 分页
const currentPage = ref(1);
const pageSize = 8;

// 过滤课程
const filteredCourses = computed(() => {
  return courses.value.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 分页课程
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredCourses.value.slice(start, end);
});

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
};

// 处理分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="course-page">
    <!-- 顶部搜索栏 -->
    <el-header class="header">
      <el-input
        v-model="searchQuery"
        placeholder="搜索课程..."
        class="search-input"
        @input="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </el-header>

    <!-- 课程展示区域 -->
    <el-main class="course-list">
      <el-row :gutter="20">
        <el-col
          v-for="course in paginatedCourses"
          :key="course.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
        <router-link :to="`/user/knowledgeintegrate/course/${course.id}`">
          <el-card class="course-card">
            <img :src="course.image_url" :alt="course.name" class="course-image_url" />
            <div class="course-info">
              <h3 class="course-name">{{ course.name }}</h3>
              <p class="course-description">{{ course.description }}</p>
            </div>
          </el-card>
        </router-link>
        </el-col>
      </el-row>
    </el-main>

    <!-- 分页 -->
    <el-footer class="pagination-footer">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredCourses.length"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </el-footer>
  </div>
</template>

<style scoped lang="scss">
.course-page {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  .header {
    background-color: #5e8d83;
    padding: 10px;
    display: flex;
    justify-content: center;

    .search-input {
      width: 50%;
      min-width: 300px;
    }
  }

  .course-list {
    padding: 20px;

    .course-card {
      height: 95%;
      margin-bottom: 20px;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .course-image_url {
        width: 235px;
        height: 150px;
        object-fit: cover;
      }

      .course-info {
        padding: 10px;

        .course-name {
          font-size: 18px;
          margin-bottom: 10px;
          color: #5e8d83;
        }

        .course-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }

        .course-button {
          width: 100%;
          background-color: #5e8d83;
          border: none;

          &:hover {
            background-color: #3f5c56;
          }
        }
      }
    }
  }

  .pagination-footer {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: white;
    border-top: 1px solid #ddd;
  }
}
</style>