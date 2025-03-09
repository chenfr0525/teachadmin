<script setup>
import { ref } from 'vue'

// 模拟课程数据
const recomCourses = ref([
  { id: 1, title: '数据结构与算法', description: '深入学习数据结构与算法的核心知识。', image: 'https://via.placeholder.com/300x200' },
  { id: 2, title: '前端开发入门', description: '从零开始学习 HTML、CSS 和 JavaScript。', image: 'https://via.placeholder.com/300x200' },
  { id: 3, title: 'Vue 3 实战', description: '掌握 Vue 3 的核心概念和实战技巧。', image: 'https://via.placeholder.com/300x200' },
]);
const selectCourses = ref([
  { id: 4, title: 'Python 编程', description: '学习 Python 基础语法和高级特性。', image: 'https://via.placeholder.com/300x200' },
  { id: 5, title: '机器学习入门', description: '了解机器学习的基本概念和算法。', image: 'https://via.placeholder.com/300x200' },
  { id: 6, title: '数据库设计与优化', description: '学习数据库设计原则和优化技巧。', image: 'https://via.placeholder.com/300x200' },

])
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="hover" class="showImg">
        <h1>你好！{{ 'Candy' }}</h1>
        <span>在这个充满挑战与机遇的时代，学习新知识和技能变得比以往任何时候都重要。我们的课程都将为你提供宝贵的学习机会。</span>
        <p>现在开始学习吧</p>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="main-space" :gutter="20">
    <el-col :span="17">
      <el-card shadow="never">
        <h2 style="margin-bottom: 10px;">推荐</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="course in recomCourses" :key="course.id">
            <router-link :to="`/user/knowledgeintegrate/course/${course.id}`">
              <el-card shadow="hover" class="recom-body">
              <div class="recommand">
                <img src="../../../assets/recommand1.jpg" alt="">
                <span>{{ course.title }}</span>
              </div>
            </el-card>
            </router-link>
          </el-col>
        </el-row>
        <h2 style="margin-bottom: 10px;">精选</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="course in selectCourses" :key="course.id">
            <router-link :to="`/user/knowledgeintegrate/course/${course.id}`">
              <el-card shadow="hover" class="recom-body">
              <div class="recommand">
                <img src="../../../assets/recommand1.jpg" alt="">
                <span>{{ course.title }}</span>
              </div>
            </el-card>
            </router-link>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card shadow="never" class="banner">
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="8">
                  <img src="../../../assets/1.jpg" alt="">
                </el-col>
                <el-col :span="16">
                  <div class="img-text">
                    <p>资深专家</p>
                    <p> 亲传授课</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="8">
                  <img src="../../../assets/1.jpg" alt="">
                </el-col>
                <el-col :span="16">
                  <div class="img-text">
                    <p>独家教程</p>
                    <p>学习高效</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="8">
                  <img src="../../../assets/1.jpg" alt="">
                </el-col>
                <el-col :span="16">
                  <div class="img-text">
                    <p>陪伴式教学</p>
                    <p>时间自由安排</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="8">
                  <img src="../../../assets/1.jpg" alt="">
                </el-col>
                <el-col :span="16">
                  <div class="img-text">
                    <p>陪伴式教学</p>
                    <p>时间自由安排</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.showImg {
  width: 100%;
  height: 250px;
  background-color: #99cc99;

  .el-card__body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;

    span {
      font-size: 17px;
    }
  }
}

.main-space {
  margin-top: 20px;

  .recom-body {
    --el-card-padding: 0;
    border-radius: 10px 10px 5px 5px;

    .recommand {
      width: 100%;
      height: 235px;

      img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      span {
        display: block;
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
      }
    }
  }

  .banner {
    .el-row {
      margin-top: 20px;

      .el-card {
        img {
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }

        .img-text {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .el-row:nth-child(1) {
      margin: 0;
    }
  }
}
</style>