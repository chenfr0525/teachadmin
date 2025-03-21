<script setup>
import {getAlgorithmService} from '@/api/codelearn'
import { ref, computed,onMounted } from 'vue';

// 基础算法集锦数据
const algorithms = ref([]);

// 分页
const currentPage = ref(1);
const pageSize = 5;

//获取算法集锦
const getAlgorithms = async () => {
  const res = await getAlgorithmService();
  algorithms.value = res.data.data.basicalgorithms;
};

onMounted(() => {
  getAlgorithms()
})

// 当前展开的算法项
const activeAlgorithms = ref([]);

// 搜索查询
const searchQuery = ref('');

// 过滤算法
const filteredAlgorithms = computed(() => {
  return algorithms.value.filter((algorithm) =>
    algorithm.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 分页算法
const paginatedAlgorithms = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredAlgorithms.value.slice(start, end);
});

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
};
</script>

<template>
  <div class="algorithms-page">
    <!-- 搜索栏 -->
    <el-input
      v-model="searchQuery"
      placeholder="搜索算法"
      class="search-input"
      @input="handleSearch"
    />

    <!-- 算法列表 -->
    <el-collapse v-model="activeAlgorithms">
      <el-collapse-item
        v-for="algorithm in paginatedAlgorithms"
        :key="algorithm.id"
        :name="algorithm.id"
      >
      <template #title>
        <div class="algorithm-title">
          {{ algorithm.title }}
        </div>
      </template>
        <div class="algorithm-content">
          <h3>代码实现：</h3>
          <pre>{{ algorithm.code }}</pre>
          <h3>算法描述：</h3>
          <p>{{ algorithm.description }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredAlgorithms.length"
      layout="prev, pager, next"
      class="pagination"
    />
  </div>
</template>

<style scoped lang="scss">
.algorithms-page {
  padding: 20px;

  .breadcrumb {
    margin-bottom: 20px;
  }

  .search-input {
    margin-bottom: 20px;
  }

  .el-collapse-item {
    margin-bottom: 10px;

    .algorithm-title {
      padding-left: 20px;
      font-size: 17px;
      color: #333;
    }

    .algorithm-content {
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