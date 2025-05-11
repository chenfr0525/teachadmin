<script setup>
import { adminHomeGetService } from '@/api/adminhome'
import { useAdminStore } from '@/stores'
import { ref, computed, onMounted } from "vue";
import {formatDate} from '@/utils/index'
import { User, ChatLineRound, CaretTop,CaretBottom } from '@element-plus/icons-vue'
//引入echat
import * as echarts from 'echarts';

const adminStore = useAdminStore();

const avatar=ref('')

// 当前时间（用于计算问候语）
const currentDate = new Date();
// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  const nickname = adminStore.user.username
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return `上午好，${nickname}！`;
  } else if (hours >= 12 && hours < 18) {
    return `下午好，${nickname}！`;
  } else if (hours >= 18 && hours < 24) {
    return `晚上好，${nickname}！`;
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

// true数据加载状态
const visitStatsLoading = ref(true);


//学生人数
const studentCount = ref({
  total: 0,
  todayOnline: 0,
  yesterdayOnline: 0
})
//学生今日与昨日增长率
const growthCount=computed(()=>{
  return studentCount.value.yesterdayOnline===0? 0:((studentCount.value.todayOnline-studentCount.value.yesterdayOnline)/studentCount.value.yesterdayOnline*100).toFixed(2)
})
//信息数量
const infoCount = ref({
  infoTotal: 0,
  todayInfo: 0,
  yesterday: 0
})
//信息
const infomations=ref([])
//charts图
const weekdata=ref([])
//获取数据
const getData = async () => {
  avatar.value='http://localhost:3000/'+adminStore.user.avatar
  const res = await adminHomeGetService()
  studentCount.value = {
    total: res.data.data.studentTotal,
    todayOnline: res.data.data.todayOnlineCount,
    yesterdayOnline: res.data.data.yesterdayOnlineCount
  }
  infoCount.value={
    infoTotal: res.data.data.informationTotal,
  todayInfo: res.data.data.todayInfoCount,
  yesterday: res.data.data.yesterdayInfoCount
  }
  infomations.value=res.data.data.informations
  weekdata.value=res.data.data.weeklyOnlineCounts
  createEchat()
  visitStatsLoading.value=false
}

//echat图表
function createEchat() {
  let myChart = echarts.init(document.getElementById('datamain'));
  // 绘制图表
  myChart.setOption( {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: weekdata.value.count,
      type: 'line',
      areaStyle: {}
    }
  ]
});
}


onMounted(() => {
  getData()
})
</script>

<template>
  <div class="dashboard-container">

    <el-card shadow="always">
      <el-row>
        <el-col :span="18" :xs="24" class="userinfo">
          <img style="width: 80px;height: 80px;border-radius: 50%;" :src="avatar" />
          <div class="info-content">
            <p style="font-size: 20px;font-weight: 700;">{{ greetings }}</p>
            <p class="weather-text">欢迎登录！今天的每一步都在努力为未来创造价值，加油！</p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据统计 -->
    <el-row :gutter="20" class="mt-5">
      <!-- 使用软件的学生数量 -->
      <el-col :span="12">
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <el-skeleton-item variant="circle" style="width: 50px; height: 50px;margin-bottom: 16px;" />
              <el-skeleton-item variant="h3" style="width: 10%;margin:0 0 22px 235px;" />
              <br>
              <el-skeleton-item variant="h1" style="width: 15%;" />
              <el-skeleton-item variant="h1" style="width: 15%;margin: 0 0 0 205px;" />
              <br>
              <el-skeleton-item variant="text" style="width: 15%;" />
              <el-skeleton-item variant="text" style="width: 10%;margin: 20px 0 10px 210px;" />
            </el-card>
          </template>
          <template v-if="!visitStatsLoading">
            <el-card shadow="always" class="state-date">
              <el-space :size="150">
                <div class="title">
                  <el-icon size="40">
                    <User />
                  </el-icon>
                  <el-statistic :value="studentCount.total" class="total" />
                  <p>学生总人数</p>
                </div>
                <div class="num">
                  <div class="statistic-card">
                    <el-statistic :value="studentCount.todayOnline">
                      <template #title>
                        <div style="display: inline-flex; align-items: center">
                          活跃人数
                          <el-tag type="success" style="margin-left: 10px;">今日</el-tag>
                        </div>
                      </template>
                    </el-statistic>
                    <div class="statistic-footer">
                      <div class="footer-item">
                        <span>比昨天</span>
                        <span :class="growthCount>0?'green':'red'">
                          {{ growthCount }}%
                          <el-icon v-if="growthCount>0">
                            <CaretTop />
                          </el-icon>
                          <el-icon v-else>
                            <CaretBottom />
                          </el-icon>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-space>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>

      <!-- 消息数量 -->
      <el-col :span="12">
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <el-skeleton-item variant="circle" style="width: 50px; height: 50px;margin-bottom: 16px;" />
              <el-skeleton-item variant="h3" style="width: 10%;margin:0 0 22px 235px;" />
              <br>
              <el-skeleton-item variant="h1" style="width: 15%;" />
              <el-skeleton-item variant="h1" style="width: 15%;margin: 0 0 0 205px;" />
              <br>
              <el-skeleton-item variant="text" style="width: 15%;" />
              <el-skeleton-item variant="text" style="width: 10%;margin: 20px 0 10px 210px;" />
            </el-card>
          </template>
          <template v-if="!visitStatsLoading">
            <el-card shadow="always" class="state-date">
              <el-space :size="150">
                <div class="title">
                  <el-icon size="40">
                    <ChatLineRound />
                  </el-icon>
                  <el-statistic :value="infoCount.infoTotal" class="total" />
                  <p>消息总数量</p>
                </div>
                <div class="num">
                  <div class="statistic-card">
                    <el-statistic :value="infoCount.todayInfo">
                      <template #title>
                        <div style="display: inline-flex; align-items: center">
                          发布信息
                          <el-tag type="warning" style="margin-left: 10px;">今日</el-tag>
                        </div>
                      </template>
                    </el-statistic>
                    <div class="statistic-footer">
                      <div class="footer-item">
                        <span>昨日信息</span>
                        <span class="yellow">
                          {{infoCount.yesterday}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-space>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-5">
      <!-- Echars统计图 -->
      <el-col :xs="24" :span="16">
        <el-card>
          <template #header>
            <div class="vistor-title">
              <span>上线趋势</span>
            </div>
          </template>
         <div id="datamain" style="width: 600px;height:400px;"></div>
        </el-card>
      </el-col>
      <!-- 最新动态 -->
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <span class="header-title">最新信息</span>
          </template>

          <el-scrollbar height="400px">
            <el-timeline class="p-3">
              <el-timeline-item v-for="(item,index) in infomations" :key="item.id" :timestamp="formatDate(item.createdAt)" placement="top"
                :color="index === 0 ? '#67C23A' : '#909399'" :hollow="index !== 0" size="large">
                <div class="version-item" :class="{ 'latest-item': index === 0 }">
                  <div>
                    <el-text tag="strong">{{ item.title }}</el-text>
                  </div>
                  <el-text class="version-content">{{ item.content }}</el-text>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  .userinfo {
    display: flex;
    align-items: center;

    .info-content {
      margin-left: 45px;

      .weather-text {
        margin-top: 5px;
      }
    }
  }

  .mt-5 {
    margin-top: 30px;

    .data-skele {
      display: flex;

      .left {
        display: flex;
        flex-direction: column;
      }
    }

    .state-date {
      .title {
        margin-left: 45px;

        .el-icon {
          color: var(--el-text-color-regular);
        }

        .total {
          margin: 5px 0;
        }

        p {
          font-size: 12px;
          color: var(--el-text-color-regular);
        }
      }

      .num {

        .el-statistic {
          --el-statistic-content-font-size: 28px;
        }

        .statistic-card {
          height: 100%;
          padding: 20px;
          border-radius: 4px;
          background-color: var(--el-bg-color-overlay);
        }

        .statistic-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--el-text-color-regular);
          margin-top: 16px;
        }

        .statistic-footer .footer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .statistic-footer .footer-item span:last-child {
          display: inline-flex;
          align-items: center;
          margin-left: 4px;
        }

        .green {
          color: var(--el-color-success);
        }

        .red {
          color: var(--el-color-error);
        }

        .yellow {
          color: #e6a23c;
        }
      }
    }

    .vistor-title {
      display: flex;

      span {
        margin-right: 20px;
      }
    }

    .version-item {
      padding: 16px;
      margin-bottom: 12px;
      background: var(--el-fill-color-lighter);
      border-radius: 8px;
      transition: all 0.2s;

      &.latest-item {
        background: var(--el-color-primary-light-9);
        border: 1px solid var(--el-color-primary-light-5);
      }

      &:hover {
        transform: translateX(5px);
      }

      .version-content {
        margin-bottom: 12px;
        font-size: 13px;
        line-height: 1.5;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
