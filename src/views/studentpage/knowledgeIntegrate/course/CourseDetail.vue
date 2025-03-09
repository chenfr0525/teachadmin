<template>
  <div class="course-detail">
    <!-- 返回按钮 -->
    <el-button type="text" @click="goBack" class="back-button">
      <el-icon>
        <ArrowLeft />
      </el-icon> 返回课程列表
    </el-button>
    <CourseItem :courseId="courseId"/>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import CourseItem from '@/components/CourseItem.vue';
const route = useRoute();
const router = useRouter();

// 获取课程 ID
const courseId = parseInt(route.params.id);

// 返回课程列表
const goBack = () => {
  router.push('/user/knowledgeintegrate/course');
};

</script>

<style scoped lang="scss">
.course-detail {
  padding-left: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .back-button {
    margin-bottom: 20px;
  }
}
</style>