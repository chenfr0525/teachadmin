<script setup>
import {useStudentStore} from '@/stores'
import {getRecommendorClassic} from '@/api/course'
import { ref,onMounted } from 'vue'

const userStore=useStudentStore()
//学生名字
const studentName = ref('')

// 模拟课程数据
const recomCourses = ref([]);
const selectCourses = ref([])

//获取课程数据
const getCourseData = async() => {
  const res1=await getRecommendorClassic({recommend:1})
  recomCourses.value=res1.data.data.courses
  recomCourses.value.forEach(item => {
    item.image_url = 'http://localhost:3000'+item.image_url
  })
  const res2=await getRecommendorClassic({classic:1})
  selectCourses.value=res2.data.data.courses
  selectCourses.value.forEach(item => {
    item.image_url = 'http://localhost:3000'+item.image_url
  })
};

onMounted(() => {
  getCourseData()
  studentName.value=userStore.user.username
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-link style="width: 100%;"  :underline="false" href="/user/knowledgeintegrate/course">
      <el-card shadow="hover" class="showImg">
        <h1>你好！{{ studentName }}</h1>
        <span>在这个充满挑战与机遇的时代，学习新知识和技能变得比以往任何时候都重要。我们的课程都将为你提供宝贵的学习机会。</span>
        <p>现在开始学习吧</p>
      </el-card>
    </el-link>
    </el-col>
  </el-row>
  <el-row class="main-space" :gutter="20">
    <el-col :span="17">
      <el-card shadow="never">
        <h2 style="margin-bottom: 10px;">推荐</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="course in recomCourses.slice(0, 3)" :key="course.id">
            <router-link :to="`/user/knowledgeintegrate/course/${course.id}`">
              <el-card shadow="hover" class="recom-body">
              <div class="recommand">
                <img :src="course.image_url" alt="">
                <span>{{ course.name }}</span>
              </div>
            </el-card>
            </router-link>
          </el-col>
        </el-row>
        <h2 style="margin-bottom: 10px;">精选</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="course in selectCourses.slice(0, 3)" :key="course.id">
            <router-link :to="`/user/knowledgeintegrate/course/${course.id}`">
              <el-card shadow="hover" class="recom-body">
              <div class="recommand">
                <img :src="course.image_url" alt="">
                <span>{{ course.name }}</span>
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
                  <img src="../../../assets/111.jpg" alt="">
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
                  <img src="../../../assets/222.jpg" alt="">
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
                  <img src="../../../assets/333.jpg" alt="">
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
                  <img src="../../../assets/444.jpg" alt="">
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
  background-color: #5e8d83;

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