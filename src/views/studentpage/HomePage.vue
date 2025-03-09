<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRandomNum } from '@/utils'
import { Bell } from '@element-plus/icons-vue'
//引入echat
import * as echarts from 'echarts';

//随机选择语句
let sentences = [
  '要偷偷努力，成为别人的遥不可及',
  '世事千帆过，前方终会是温柔和月光。',
  '你要悄悄努力，然后惊艳所有人.',
  '从现在开始努力一切都还来得及',
  '我正在追逐从前那个发光的自己',
  '他们都假装颓废，你可别上当。',
  '你不甘于沉沦，那就放手一搏.',
  '再相逢时，希望我们都在最高处'
]
let sentenceNum = getRandomNum(1, sentences.length - 1)

//本周活跃度
const activity = ref(3.5)
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
  } else {
    type = 'info'
    text = '你这周已经迈出了学习的第一步，非常棒！'
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
        data: [5, 20, 36, 10, 10, 20, 30]
      }
    ]
  });
}

//信息
const infoNum=ref(3)

onMounted(() => {
  createEchat()
})
</script>

<template>
  <el-card shadow="always">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover" class="top-pad">
          <div class="info">
            <el-avatar :size="65" src="../../../assets/1.jpg" />
            <div class="info-title">
              <h1>你好！{{ 'Candy' }}</h1>
              <p>{{ sentences[sentenceNum] }}</p>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 10px;" class="doTime top-pad">
          <h3 class="doTime-title">今日学习时长</h3>
          <div class="doTime-progress">
            <el-progress type="dashboard" :percentage="(6 / 24) * 100">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ '6' }}小时{{ '30' }}分钟</span>
              </template>
            </el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover" class="banner-pad">
          <div class="banner">
            <el-carousel height="400px">
              <el-carousel-item v-for="item in 4" :key="item">
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
            <el-col :span="6">
              <el-card shadow="hover" class="recom-body">
                <div class="recommand">
                  <img src="../../assets/recommand1.jpg" alt="">
                  <span>数据结构与算法</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="recom-body">
                <div class="recommand">
                  <img src="../../assets/recommand1.jpg" alt="">
                  <span>数据结构与算法</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="recom-body">
                <div class="recommand">
                  <img src="../../assets/recommand1.jpg" alt="">
                  <span>数据结构与算法</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="recom-body">
                <div class="recommand">
                  <img src="../../assets/recommand1.jpg" alt="">
                  <span>数据结构与算法</span>
                </div>
              </el-card>
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
            <div v-if="infoNum>0" class="info-content">
              <el-timeline style="max-width: 600px">
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
            <el-empty v-else :image-size="200" />
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