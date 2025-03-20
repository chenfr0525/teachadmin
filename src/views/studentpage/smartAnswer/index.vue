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
  return `快速排序（Quick Sort）是一种高效的排序算法，采用分治法策略。它的基本思想是通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，然后分别对这两部分记录继续进行排序，以达到整个序列有序。

快速排序的步骤如下：

选择基准值：从数列中挑出一个元素，称为“基准”（pivot）。

分区操作：重新排列数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。

递归排序：递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

递归的最底部情形，是数列的大小是零或一，也就是已经有序。虽然一直递归下去，但是这个算法总会退出，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。

快速排序的最坏情况时间复杂度为O(n^2)，但平均时间复杂度为O(n log n)，且它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。快速排序通常比其他O(n log n)算法更快，因为它的内部循环可以在大部分架构上很有效率地实现。

快速排序是不稳定的排序算法，因为在分区过程中，相等元素的相对位置可能会改变。`;
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