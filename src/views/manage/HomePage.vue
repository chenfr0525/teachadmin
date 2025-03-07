<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { dayjs } from "element-plus";
// import LogAPI from "@/api/system/log";
// import { useUserStore } from "@/store/modules/user";
import { formatGrowthRate } from "@/utils";
import { User,ChatLineRound,CaretTop,TopRight } from '@element-plus/icons-vue'

// const userStore = useUserStore();

// 当前通知公告列表
const vesionList = ref([
  {
    id: "1",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑",
  },
  {
    id: "1",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑",
  },
  {
    id: "1",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑",
  },
]);

// 当前时间（用于计算问候语）
const currentDate = new Date();

// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  // const nickname = userStore.userInfo.nickname;
  const nickname = "user";
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

// 访客统计数据加载状态
const visitStatsLoading = ref(false);
// 访客统计数据
const visitStatsData = ref({
  todayUvCount: 123,
  uvGrowthRate: 12,
  totalUvCount: 12,
  todayPvCount: 12,
  pvGrowthRate: 12,
  totalPvCount: 11,
});

// 访问趋势日期范围（单位：天）
const visitTrendDateRange = ref(7);
// 访问趋势图表配置
const visitTrendChartOptions = ref();

/**
 * 获取访客统计数据
 */
// const fetchVisitStatsData = () => {
//   LogAPI.getVisitStats()
//     .then((data) => {
//       visitStatsData.value = data;
//     })
//     .finally(() => {
//       visitStatsLoading.value = false;
//     });
// };

/**
 * 获取访问趋势数据，并更新图表配置
 */
// const fetchVisitTrendData = () => {
//   const startDate = dayjs()
//     .subtract(visitTrendDateRange.value - 1, "day")
//     .toDate();
//   const endDate = new Date();

//   LogAPI.getVisitTrend({
//     startDate: dayjs(startDate).format("YYYY-MM-DD"),
//     endDate: dayjs(endDate).format("YYYY-MM-DD"),
//   }).then((data) => {
//     updateVisitTrendChartOptions(data);
//   });
// };

/**
 * 更新访问趋势图表的配置项
 *
 * @param data - 访问趋势数据
 */
const updateVisitTrendChartOptions = (data) => {
  console.log("Updating visit trend chart options");

  visitTrendChartOptions.value = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["浏览量(PV)", "访客数(UV)"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.dates,
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "浏览量(PV)",
        type: "line",
        data: data.pvList,
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#4080FF",
        },
        lineStyle: {
          color: "#4080FF",
        },
      },
      {
        name: "访客数(UV)",
        type: "line",
        data: data.ipList,
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          color: "#67C23A",
        },
      },
    ],
  };
};

/**
 * 根据增长率计算对应的 CSS 类名
 *
 * @param growthRate - 增长率数值
 */
const computeGrowthRateClass = (growthRate) => {
  if (!growthRate) {
    return "color-[--el-color-info]";
  }
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};

// 监听访问趋势日期范围的变化，重新获取趋势数据
watch(
  () => visitTrendDateRange.value,
  (newVal) => {
    console.log("Visit trend date range changed:", newVal);
    // fetchVisitTrendData();
  },
  { immediate: true }
);

// 组件挂载后加载访客统计数据和通知公告数据
// onMounted(() => {
//   fetchVisitStatsData();
// });
</script>

<template>
  <div class="dashboard-container">

    <el-card shadow="always">
      <el-row>
        <el-col :span="18" :xs="24" class="userinfo">
          <img style="width: 80px;height: 80px;border-radius: 50%;" src="../../assets/1.jpg" />
          <div class="info-content">
            <p style="font-size: 20px;font-weight: 700;">{{ greetings }}</p>
            <p class="weather-text">今日天气晴朗，气温在15℃至25℃之间，东南风。</p>
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
                  <el-statistic :value="268500" class="total" />
                  <p>学生总人数</p>
                </div>
                <div class="num">
                  <div class="statistic-card">
                    <el-statistic :value="98500">
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
                        <span class="green">
                          24%
                          <el-icon>
                            <CaretTop />
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
                  <el-statistic :value="123521" class="total" />
                  <p>消息总数量</p>
                </div>
                <div class="num">
                  <div class="statistic-card">
                    <el-statistic :value="98500">
                      <template #title>
                        <div style="display: inline-flex; align-items: center">
                          未读信息
                          <el-tag type="warning" style="margin-left: 10px;">今日</el-tag>
                        </div>
                      </template>
                    </el-statistic>
                    <div class="statistic-footer">
                      <div class="footer-item">
                        <span>昨日信息</span>
                        <span class="yellow">
                          3342
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
      <!-- 访问趋势统计图 -->
      <el-col :xs="24" :span="16">
        <el-card>
          <template #header>
            <div class="vistor-title">
              <span>访问趋势</span>
              <el-radio-group v-model="visitTrendDateRange" size="small">
                <el-radio-button label="近7天" :value="7" />
                <el-radio-button label="近30天" :value="30" />
              </el-radio-group>
            </div>
          </template>
          <ECharts :options="visitTrendChartOptions" height="400px" />
        </el-card>
      </el-col>
      <!-- 最新动态 -->
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
              <span class="header-title">最新动态</span>
          </template>

          <el-scrollbar height="400px">
            <el-timeline class="p-3">
              <el-timeline-item v-for="(item, index) in vesionList" :key="index" :timestamp="item.date" placement="top"
                :color="index === 0 ? '#67C23A' : '#909399'" :hollow="index !== 0" size="large">
                <div class="version-item" :class="{ 'latest-item': index === 0 }">
                  <div>
                    <el-text tag="strong">{{ item.title }}</el-text>
                    <el-tag v-if="item.tag" :type="index === 0 ? 'success' : 'info'" size="small">
                      {{ item.tag }}
                    </el-tag>
                  </div>

                  <el-text class="version-content">{{ item.content }}</el-text>

                  <div v-if="item.link">
                    <el-link :type="index === 0 ? 'primary' : 'info'" :href="item.link" target="_blank"
                      :underline="false">
                      详情
                      <el-icon class="link-icon">
                        <TopRight />
                      </el-icon>
                    </el-link>
                  </div>
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
        .yellow{
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
