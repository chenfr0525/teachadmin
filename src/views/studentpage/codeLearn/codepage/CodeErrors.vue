<script setup>
import { ref, computed } from 'vue';

// 当前展开的错误项
const activeErrors = ref([]);

// 搜索查询
const searchQuery = ref('');

// 分页
const currentPage = ref(1);
const pageSize = 5;

// 常见错误集锦数据
const errors = ref([
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
    title: '123',
    code: `function add(a, b) {
  return a + b + x; // x 未定义
}`,
    reason: '变量 x 未定义，导致运行时错误。',
    correctCode: `function add(a, b) {
  const x = 0; // 定义 x
  return a + b + x;
}`,
  },
  // 其他错误数据...
]);

// 过滤错误
const filteredErrors = computed(() => {
  return errors.value.filter((error) =>
    error.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 分页错误
const paginatedErrors = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredErrors.value.slice(start, end);
});

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
};
</script>

<template>
  <div class="errors-page">
    <!-- 搜索栏 -->
    <el-input v-model="searchQuery" placeholder="搜索错误" class="search-input" @input="handleSearch" />

    <!-- 错误列表 -->
    <el-collapse v-model="activeErrors">
      <el-collapse-item v-for="(error, index) in paginatedErrors" :key="index" :name="index">
        <template #title>
          <div class="error-title">
            {{ error.title }}
          </div>
        </template>
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

    <!-- 分页 -->
    <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="filteredErrors.length"
      layout="prev, pager, next" class="pagination" />
  </div>
</template>

<style scoped lang="scss">
.errors-page {
  padding: 20px;

  .breadcrumb {
    margin-bottom: 20px;
  }

  .search-input {
    margin-bottom: 20px;
  }

  .el-collapse-item {
    margin-bottom: 10px;

    .error-title {
      padding-left: 20px;
      font-size: 20px;
      color: #333;
    }

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

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>