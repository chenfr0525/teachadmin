<script setup>
import { ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';

// 模拟课程数据
const courses = ref([
  { id: 1, title: '数据结构与算法', description: '深入学习数据结构与算法的核心知识。', image: 'https://via.placeholder.com/300x200' },
  { id: 2, title: '前端开发入门', description: '从零开始学习 HTML、CSS 和 JavaScript。', image: 'https://via.placeholder.com/300x200' },
  { id: 3, title: 'Vue 3 实战', description: '掌握 Vue 3 的核心概念和实战技巧。', image: 'https://via.placeholder.com/300x200' },
  { id: 4, title: 'Python 编程', description: '学习 Python 基础语法和高级特性。', image: 'https://via.placeholder.com/300x200' },
  { id: 5, title: '机器学习入门', description: '了解机器学习的基本概念和算法。', image: 'https://via.placeholder.com/300x200' },
  { id: 6, title: '数据库设计与优化', description: '学习数据库设计原则和优化技巧。', image: 'https://via.placeholder.com/300x200' },
]);

// 搜索查询
const searchQuery = ref('');

// 分页
const currentPage = ref(1);
const pageSize = 6;

// 过滤课程
const filteredCourses = computed(() => {
  return courses.value.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
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
            <img src="../../../../assets/1.jpg" alt="课程封面" class="course-image" />
            <div class="course-info">
              <h3 class="course-title">{{ course.title }}</h3>
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
      margin-bottom: 20px;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .course-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }

      .course-info {
        padding: 10px;

        .course-title {
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