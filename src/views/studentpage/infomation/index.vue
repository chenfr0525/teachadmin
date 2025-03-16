<script setup>
import {getInfoService,updateInfoService,deleteInfoService} from '@/api/information'
import { ref, computed } from 'vue';
import { ArrowLeft, ArrowRight, ChatLineRound } from '@element-plus/icons-vue';
const info = ref([])
const getData=async()=>{
  const res=await getInfoService()
  //信息
  info.value = res.data.data.informationstatuses
}
getData()

// 左侧菜单栏是否折叠
const isCollapsed = ref(false);

// 当前选中的信息
const selectedMessage = ref(null);

// 未读信息数量
const unreadCount = computed(() => {
  return info.value.reduce((sum, item) => {
    return sum + (item.status===1?0:1)
  }, 0)
});

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 标记单条信息为已读
const markAsRead = async (id) => {
  const res =await updateInfoService(id)
  getData()
};

// 一键阅读所有信息
const markAllAsRead = () => {
  info.value.forEach((message) => {
    
    console.log(message);
    if (!message.status) {
      markAsRead(message.id);
    }
  });
};

// 清空所有已读信息
const clearAllRead = async() => {
  info.value.forEach(async (message) => {
    if (message.status) {
      await deleteInfoService(message.id)
    }
  })
  getData()
};

// 选择信息
const selectMessage = (message) => {
  selectedMessage.value = message;
  if (!message.read) {
    markAsRead(message.id); // 标记为已读
  }
};

// 切换左侧菜单栏折叠状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div class="message-page">
    <!-- 头部 -->
    <el-header class="header">
      <div class="header-content">
        <h2 class="section-title">
          全部信息
          <el-tag type="danger" class="unread-count">{{ unreadCount }}</el-tag>
        </h2>
        <div class="header-buttons">
          <el-button type="primary" @click="markAllAsRead">一键阅读所有信息</el-button>
          <el-button type="danger" @click="clearAllRead">清空所有已读信息</el-button>
        </div>
      </div>
    </el-header>
    <!-- 主内容区域 -->
    <el-container class="main-container">
        <!-- 左侧信息列表 -->
      <el-aside :width="isCollapsed ? '30px' : '300px'" class="message-list-container">
        <div class="collapse-button" @click="toggleCollapse">
          <el-icon :size="20">
            <ArrowRight v-if="isCollapsed"/>
            <ArrowLeft v-else/>
          </el-icon>
        </div>
        <div v-if="!isCollapsed">
          <!-- 信息列表 -->
          <el-card
            v-for="message in info"
            :key="message.id"
            class="message-card"
            @click="selectMessage(message)"
          >
            <div class="message-content">
              <span class="message-text">{{ message.information.title }}</span>
              <span class="message-time">{{ formatTime(message.createdAt) }}</span>
              <!-- 未读信息右上角显示红色小点 -->
              <span v-if="!message.status" class="unread-dot"></span>
            </div>
          </el-card>
        </div>
      </el-aside>

      <!-- 右侧信息详情 -->
      <el-main class="message-detail">
        <div v-if="selectedMessage" class="detail-content">
          <h2 class="detail-title">{{ selectedMessage.information.title}}</h2>
          <p class="detail-time">{{ formatTime(selectedMessage.createdAt) }}</p>
          <p class="detail-text">
            {{ selectedMessage.information.content || '暂无详细信息' }}
          </p>
        </div>
        <div v-else class="empty-state">
          <el-icon :size="50"><ChatLineRound /></el-icon>
          <p>请从左侧选择一条信息</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.message-page {
  display: flex;
  flex-direction: column;
  height: 650px;
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;

  .header {
    background-color: #5e8d83;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-content {
      display: flex;
      align-items: center;
      width: 100%;

      .section-title {
        font-size: 20px;
        color: white;
        margin: 0;
        display: flex;
        align-items: center;

        .unread-count {
          margin-left: 10px;
        }
      }

      .header-buttons {
        margin-left: auto;
      }
    }
  }

  .main-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 0 0 10px 10px;

    .message-list-container {
      position: relative;
      background-color: white;
      border-right: 1px solid #ddd;
      transition: width 0.3s;

      .collapse-button {
        position: absolute;
        top: 0px;
        right: 0px;
        cursor: pointer;
        z-index: 1;
        padding: 5px;
        background-color: #f5f5f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #e0f2f1;
        }
      }

      .message-card:nth-child(1) {
        margin-top: 30px;
      }

      .message-card {
        margin: 10px;
        transition: transform 0.3s;
        position: relative;

        &:hover {
          transform: translateY(-3px);
        }

        .message-content {
          display: flex;
          flex-direction: column;

          .message-text {
            font-size: 16px;
            color: #333;
          }

          .message-time {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
          }

          .unread-dot {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 8px;
            height: 8px;
            background-color: red;
            border-radius: 50%;
          }
        }
      }
    }

    .message-detail {
      padding: 20px;
      background-color: white;

      .detail-content {
        .detail-title {
          font-size: 24px;
          color: #5e8d83;
          margin-bottom: 10px;
        }

        .detail-time {
          font-size: 14px;
          color: #999;
          margin-bottom: 20px;
        }

        .detail-text {
          font-size: 16px;
          color: #666;
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #999;

        p {
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>