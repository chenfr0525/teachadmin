<script setup>
import { ref, computed } from 'vue';
import { ArrowLeft, ArrowRight, ChatLineRound } from '@element-plus/icons-vue';

// 模拟信息数据
const messages = ref([
  { id: 1, text: '您有一条新的系统通知', read: false, details: '系统将于今晚 10 点进行维护，请提前保存数据。', time: '2023-10-01 09:00' },
  { id: 2, text: '您的订单已发货', read: false, details: '您的订单 #123456 已发货，预计 3 天内送达。', time: '2023-10-02 14:30' },
  { id: 3, text: '您的好友发来一条消息', read: false, details: '好友小明发来一条消息：“晚上一起吃饭吗？”', time: '2023-10-03 18:15' },
  { id: 4, text: '您有一条未读邮件', read: false, details: '您收到一封来自 support@example.com 的邮件。', time: '2023-10-04 11:45' },
  { id: 5, text: '您的账户已成功注册', read: true, details: '您的账户已成功注册，欢迎使用我们的服务。', time: '2023-10-05 08:00' },
  { id: 6, text: '您的订阅已续费', read: true, details: '您的订阅已成功续费，有效期至 2024 年 12 月 31 日。', time: '2023-10-06 16:20' },
]);

// 左侧菜单栏是否折叠
const isCollapsed = ref(false);

// 当前选中的信息
const selectedMessage = ref(null);

// 未读信息数量
const unreadCount = computed(() => {
  return messages.value.filter((message) => !message.read).length;
});

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 标记单条信息为已读
const markAsRead = (id) => {
  const message = messages.value.find((msg) => msg.id === id);
  if (message) {
    message.read = true;
  }
};

// 一键阅读所有信息
const markAllAsRead = () => {
  messages.value.forEach((message) => {
    if (!message.read) {
      message.read = true;
    }
  });
};

// 清空所有已读信息
const clearAllRead = () => {
  messages.value = messages.value.filter((message) => !message.read);
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
            v-for="message in messages"
            :key="message.id"
            class="message-card"
            @click="selectMessage(message)"
          >
            <div class="message-content">
              <span class="message-text">{{ message.text }}</span>
              <span class="message-time">{{ formatTime(message.time) }}</span>
              <!-- 未读信息右上角显示红色小点 -->
              <span v-if="!message.read" class="unread-dot"></span>
            </div>
          </el-card>
        </div>
      </el-aside>

      <!-- 右侧信息详情 -->
      <el-main class="message-detail">
        <div v-if="selectedMessage" class="detail-content">
          <h2 class="detail-title">{{ selectedMessage.text }}</h2>
          <p class="detail-time">{{ formatTime(selectedMessage.time) }}</p>
          <p class="detail-text">
            {{ selectedMessage.details || '暂无详细信息' }}
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