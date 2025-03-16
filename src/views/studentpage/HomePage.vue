<script setup>
import { studenthomeGetService } from '@/api/home'
import { getInfoService } from '@/api/information'
import { useStudentStore } from '@/stores'
import { ref, computed, onMounted } from 'vue'
import { getRandomNum } from '@/utils'
import { Bell } from '@element-plus/icons-vue'
import { convertTimeToHours, formatDate } from '@/utils'
//引入echat
import * as echarts from 'echarts';
const studentStore = useStudentStore()
//学生名字
const studentName = ref('')
//轮播图
const carousel = ref([])
//激励语句
const quote = ref('')
//推荐
const remend = ref([])
//每周上线时间
const weekList = ref({})
const weektime = ref([0, 0, 0, 0, 0, 0, 0])
//今日学习时间
const todayTime = ref(0)
//信息
const info = ref([])
const infoNum = computed(() => {
  return info.value.reduce((sum, item) => {
    return sum + (item.status === 1 ? 0 : 1)
  }, 0)
})


//获取首页数据信息
const getData = async () => {
  const res = await getInfoService()
  //信息
  info.value = res.data.data.informationstatuses
  const data = await studenthomeGetService()
  console.log(data.data.data)
  //轮播图
  carousel.value = data.data.data.carouselImage
  //语句
  let sentemnces = data.data.data.quote
  let sentenNum = getRandomNum(1, sentemnces.length - 1)
  quote.value = sentemnces[sentenNum].quote
  //推荐
  remend.value = data.data.data.remend
  //今日学习时间
  todayTime.value = convertTimeToHours(data.data.data.studytime[0].duration)
  //每周上线时间
  weekList.value = data.data.data.weektime[0]
  weektime.value = getweektime()
  createEchat()
}

//计算学习时间
const getweektime = () => {
  let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  let list = []
  for (let i = 0; i < week.length; i++) {
    if (weekList.value[week[i]]) {
      list.push(convertTimeToHours(weekList.value[week[i]]))
    }
  }
  return list
}

//本周活跃度
const activity = computed(() => {
  let sum = 0
  for (let i = 0; i < weektime.value.length; i++) {
    sum += weektime.value[i]
  }
  return (sum / 7).toFixed(2)
})
const activityType = computed(() => {
  let type, text
  if (activity.value >= 10) {
    type = 'danger'
    text = '你的学习成果真是太出色了，真是个学霸！'
  } else if (activity.value >= 7.5) {
    type = 'warning'
    text = '你对学习的钻研精神真的很值得学习！'
  } else if (activity.value >= 5) {
    type = 'success'
    text = '这周你真的很努力，为你的学习热情点赞！'
  } else if (activity.value >= 2.5) {
    type = 'primary'
    text = '你的学习进度很稳定，继续保持哦！'
  } else if (activity.value > 0) {
    type = 'info'
    text = '你这周已经迈出了学习的第一步，非常棒！'
  } else {
    type = 'info'
    text = '你这周还没开始行动，赶快动起来吧！'
  }
  return { type, text }
})

//echat图表
function createEchat() {
  let myChart = echarts.init(document.getElementById('datamain'));
  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    },
    yAxis: {},
    series: [
      {
        name: '学习时长',
        type: 'bar',
        data: weektime.value
      }
    ]
  });
}

onMounted(() => {
  getData()
  studentName.value = studentStore.user.username
})
</script>

<template>
  <el-card shadow="always">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover" class="top-pad">
          <div class="info">
            <el-avatar :size="65" src="@/assets/1.jpg" />
            <div class="info-title">
              <h1>你好！{{ studentName }}</h1>
              <p>{{ quote }}</p>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 10px;" class="doTime top-pad">
          <h3 class="doTime-title">今日学习时长</h3>
          <div class="doTime-progress">
            <el-progress type="dashboard" :percentage="(todayTime / 12) * 100">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ todayTime }}小时</span>
              </template>
            </el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover" class="banner-pad">
          <div class="banner">
            <el-carousel height="400px">
              <el-carousel-item v-for="item in carousel" :key="item">
                <img :src="item.image_url" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="main-space">
      <el-col :span="24">
        <el-card shadow="never">
          <h2 style="margin-bottom: 10px;">推荐</h2>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in remend" :key="item.id">
              <el-link :underline="false" :href="`/user/${item.type}`">
                <el-card shadow="hover" class="recom-body">
                  <div class="recommand">
                    <img src="../../assets/recommand1.jpg" alt="">
                    <span>{{ item.name }}</span>
                  </div>
                </el-card>
              </el-link>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="main-space" :gutter="20">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <h2>本周活跃度</h2>
              <p>平均每天<strong>{{ activity }}</strong>h<el-tag :type="activityType.type" effect="light" round> {{
                activityType.text }}</el-tag></p>
            </div>
          </template>
          <div id="datamain" style="width: 720px;height: 350px;">
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-link href="/user/info">
          <el-card shadow="hover">
            <template #header>
              <div class="info-title">
                <h2>信息</h2>
                <el-link :underline="false" href="/user/info">
                  <template #default>
                    <el-badge :value="infoNum">
                      <el-icon :size="20">
                        <Bell />
                      </el-icon>
                    </el-badge>
                  </template>
                </el-link>
              </div>
            </template>
            <div class="info-body">
              <div v-if="infoNum > 0" class="info-content">
                <el-timeline style="max-width: 600px">
                  <el-timeline-item v-for="item in info" :key="item.id" :timestamp="formatDate(item.createdAt)"
                    placement="top">
                    <el-card>
                      <h4>{{ item.information.title }}</h4>
                      <p>{{ item.information.content }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <el-empty v-else :image-size="200" style="width: 328px;" />
            </div>
          </el-card>
        </el-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.el-row .el-col .top-pad {
  --el-card-padding: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;

  .info-title {
    margin-top: 20px;

    h1 {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #333;
    }

    p {
      margin-top: 10px;
      height: 50px;
      line-height: 25px;
    }
  }
}

.doTime {
  .doTime-title {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .doTime-progress {
    margin-top: 10px;
    text-align: center;

    .percentage-value {
      display: block;
      margin-top: 5px;
      font-size: 17px;
    }
  }
}

.banner-pad {
  --el-card-padding: 0;

  .banner {
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
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

  .card-header {
    p {
      margin-top: 10px;
      font-size: 13px;

      strong {
        font-size: 18px;
      }

      .el-tag {
        margin-left: 10px;
      }
    }
  }

  .info-title {
    display: flex;

    .el-badge {
      margin: 7px 10px;
    }
  }

  .info-body {
    width: 100%;
    height: 381px;
  }
}
</style>