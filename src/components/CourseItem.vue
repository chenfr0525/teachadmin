<script setup>
import {getCourseDetail} from '@/api/course'
import { ref,defineProps,onMounted } from 'vue';
//加载
const loading=ref(true)
//课程Id
const props = defineProps(['courseId'])
// 课程数据
const course = ref({
    id: 1,
    name: '',
    description: '',
    image_url: '',
    instructor: {
      name: '',
      bio: '',
      avatar_url: '',
    },
  })

// 获取课程详情
const getCourseContent=async()=>{
  const res=await getCourseDetail(props.courseId)
  course.value=res.data.data.course
}

onMounted(()=>{
  getCourseContent()
  loading.value=false
})

</script>

<template>
  <div class="course-detail" v-loading="loading">
    <!-- 课程封面 -->
    <div class="course-cover">
      <img :src="course.image_url" :alt="course.name" />
    </div>

    <!-- 课程信息 -->
    <div class="course-info">
      <h1 class="course-title">{{ course.name }}</h1>
      <p class="course-description">{{ course.description }}</p>
    </div>

    <!-- 讲师信息 -->
    <div class="instructor-info">
      <h2>讲师介绍</h2>
      <el-card>
        <div class="instructor-details">
          <img :src="course.instructor.avatar_url" :alt="course.instructor.name" class="instructor-avatar" />
          <div class="instructor-text">
            <h3>{{ course.instructor.name }}</h3>
            <p>{{ course.instructor.bio }}</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.course-detail {
  padding-left: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .course-cover {
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .course-info {
    margin: 20px 0;

    .course-title {
      font-size: 28px;
      color: #5e8d83;
    }

    .course-description {
      font-size: 16px;
      color: #666;
    }
  }

  .chapter-list {
    margin: 20px 0;

    h2 {
      font-size: 24px;
      color: #5e8d83;
      margin-bottom: 10px;
    }
  }

  .instructor-info {
    margin: 20px 0;

    h2 {
      font-size: 24px;
      color: #5e8d83;
      margin-bottom: 10px;
    }

    .instructor-details {
      display: flex;
      align-items: center;

      .instructor-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }

      .instructor-text {
        h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        p {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>