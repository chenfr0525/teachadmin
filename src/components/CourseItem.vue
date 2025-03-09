<template>
  <div class="course-detail">
    <!-- 课程封面 -->
    <div class="course-cover">
      <img :src="course.image" alt="课程封面" />
    </div>

    <!-- 课程信息 -->
    <div class="course-info">
      <h1 class="course-title">{{ course.title }}</h1>
      <p class="course-description">{{ course.description }}</p>
    </div>

    <!-- 章节列表 -->
    <div class="chapter-list">
      <h2>课程章节</h2>
      <el-collapse v-model="activeChapter">
        <el-collapse-item
          v-for="(chapter, index) in course.chapters"
          :key="index"
          :title="`第 ${index + 1} 章：${chapter.title}`"
          :name="index"
        >
          <p>{{ chapter.content }}</p>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 讲师信息 -->
    <div class="instructor-info">
      <h2>讲师介绍</h2>
      <el-card>
        <div class="instructor-details">
          <img :src="course.instructor.avatar" alt="讲师头像" class="instructor-avatar" />
          <div class="instructor-text">
            <h3>{{ course.instructor.name }}</h3>
            <p>{{ course.instructor.bio }}</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,defineProps  } from 'vue';

const props = defineProps(['courseId'])

// 模拟课程数据
const courses = [
  {
    id: 1,
    title: '数据结构与算法',
    description: '深入学习数据结构与算法的核心知识。',
    image: 'https://via.placeholder.com/800x400',
    chapters: [
      { title: '数组与链表', content: '介绍数组和链表的基本概念和操作。' },
      { title: '栈与队列', content: '学习栈和队列的实现和应用场景。' },
      { title: '树与图', content: '深入理解树和图的结构及其算法。' },
    ],
    instructor: {
      name: '张老师',
      bio: '资深算法工程师，拥有 10 年教学经验。',
      avatar: 'https://via.placeholder.com/100x100',
    },
  }
  // 其他课程数据...
];

// 查找当前课程
const course = computed(() => {
  return courses.find((c) => c.id === props.courseId);
});

// 当前展开的章节
const activeChapter = ref(0);
</script>

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