<script setup>
import { ref } from 'vue';
import { Promotion } from '@element-plus/icons-vue';

// 消息列表
const messages = ref([
  { sender: 'ai', text: '您好！我是 AI 助手，可以回答数据结构和算法相关的问题。', time: new Date().toLocaleTimeString() },
]);

// 用户输入
const userInput = ref('');

// 发送消息
const sendMessage = () => {
  if (userInput.value.trim() === '') return;

  // 添加用户消息
  messages.value.push({
    sender: 'user',
    text: userInput.value,
    time: new Date().toLocaleTimeString(),
  });

  // 添加到历史记录
  searchHistory.value.push(userInput.value);

  // 模拟 AI 回复
  setTimeout(() => {
    const aiResponse = getAIResponse(userInput.value);
    messages.value.push({
      sender: 'ai',
      text: aiResponse,
      time: new Date().toLocaleTimeString(),
    });
  }, 1000);

  // 清空输入框
  userInput.value = '';
};

// 模拟 AI 回答
const getAIResponse = (question) => {
  const responses = {
    '什么是二叉树？': '二叉树是一种树形数据结构，每个节点最多有两个子节点，分别称为左子节点和右子节点。',
    '什么是哈希表？': '哈希表是一种通过哈希函数将键映射到值的数据结构，支持快速查找、插入和删除。',
    '什么是快速排序？': '快速排序是一种分治算法，通过选择一个基准元素将数组分为两部分，然后递归排序。',
    '什么是动态规划？': '动态规划是一种解决复杂问题的方法，通过将问题分解为子问题并存储子问题的解来避免重复计算。',
  };
  return responses[question] || '抱歉，我暂时无法回答这个问题。';
};

// 推荐问题
const suggestedQuestions = ref([
  '什么是二叉树？',
  '什么是哈希表？',
  '什么是快速排序？',
  '什么是动态规划？',
]);

// 历史记录
const searchHistory = ref([]);

const clearHistory=()=>{
  searchHistory.value=[]
}

// 发送推荐问题
const sendSuggestedQuestion = (question) => {
  userInput.value = question;
  sendMessage();
};
</script>

<template>
  <el-card shadow="never">
    <el-container>
    <el-container class="ai-chat-container">
      <!-- 顶部标题 -->
      <el-header class="header">
        <h1>AI 智能回答小助手</h1>
      </el-header>

      <!-- 聊天区域 -->
      <el-main class="chat-area">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          <div class="message-content">
            <span class="message-text">{{ message.text }}</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
        </div>
      </el-main>

      <!-- 输入区域 -->
      <el-footer class="input-area">
        <el-input v-model="userInput" placeholder="请输入您的问题，例如：什么是二叉树？" @keyup.enter="sendMessage"></el-input>
        <el-button type="primary" @click="sendMessage" :icon="Promotion">发送</el-button>
      </el-footer>
    </el-container>
    <el-aside width="380px">
      <div class="sidebar-section">
          <h3>你可以试着这么问</h3>
          <el-button
            v-for="(question, index) in suggestedQuestions"
            :key="index"
            class="suggested-question"
            @click="sendSuggestedQuestion(question)"
          >
            {{ question }}
          </el-button>
        </div>

        <div class="sidebar-section">
          <h3>历史检索<el-button type="success" style="margin-left: 20px;" @click="clearHistory">清空</el-button></h3>
          <el-button
            v-for="(history, index) in searchHistory"
            :key="index"
            class="history-item"
            @click="sendSuggestedQuestion(history)"
          >
            {{ history }}
          </el-button>
        </div>
    </el-aside>
  </el-container>
  </el-card>
</template>

<style scoped lang="scss">
.el-card {
  --el-card-padding:0px;
  border-radius: 15px;
  .ai-chat-container {
    display: flex;
    flex-direction: column;
    height: 650px;
    background-color: #f5f5f5;

    .header {
      background-color: #5e8d83;
      color: white;
      text-align: center;
      padding: 20px;
    }

    .chat-area {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: white;

      .message {
        display: flex;
        margin-bottom: 15px;

        &.user {
          justify-content: flex-end;

          .message-content {
            background-color: #5e8d83;
            color: white;
          }
        }

        &.ai {
          justify-content: flex-start;

          .message-content {
            background-color: #e0f2f1;
          }
        }

        .message-content {
          max-width: 70%;
          padding: 10px;
          border-radius: 10px;
          position: relative;

          .message-time {
            display: block;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
        }
      }
    }

    .input-area {
      display: flex;
      padding: 10px;
      background-color: white;
      border-top: 1px solid #ddd;

      .el-input {
        flex: 1;
        margin-right: 10px;
      }
    }
  }

  .el-aside{
    height: 650px;
    background-color: #fafafa;
      border-left: 1px solid #ddd;
      padding: 20px;

      .sidebar-section {
        margin-bottom: 20px;

        h3 {
          margin-bottom: 10px;
          color: #5e8d83;
        }

        .suggested-question,
        .history-item {
          display: block;
          width: 100%;
          margin-bottom: 10px;
          text-align: left;
          white-space: normal;
          margin-left: 12px;
        }
      }
  }
}
</style>