<template>
  <div class="code-tutor-page">
    <!-- 页面标题 -->
    <h1 class="page-title">代码辅导</h1>

    <!-- 选项卡 -->
    <el-tabs v-model="activeTab" class="tabs">
      <!-- 代码纠错 -->
      <el-tab-pane label="代码纠错" name="code-check">
        <div class="code-check">
          <el-input
            v-model="code"
            type="textarea"
            :rows="10"
            placeholder="请输入您的代码"
            class="code-input"
          />
          <el-button type="primary" @click="handleCodeCheck">提交检测</el-button>
          <div v-if="error" class="error-message">
            <h3>错误提示：</h3>
            <pre>{{ error }}</pre>
          </div>
        </div>
      </el-tab-pane>

      <!-- 代码解读 -->
      <el-tab-pane label="代码解读" name="code-explain">
        <div class="code-explain">
          <el-input
            v-model="code"
            type="textarea"
            :rows="10"
            placeholder="请输入您的代码"
            class="code-input"
          />
          <el-button type="primary" @click="handleCodeExplain">提交解读</el-button>
          <div v-if="explanation" class="explanation">
            <h3>代码解读：</h3>
            <pre>{{ explanation }}</pre>
          </div>
        </div>
      </el-tab-pane>

      <!-- 编程回答 -->
      <el-tab-pane label="编程回答" name="code-answer">
        <div class="code-answer">
          <el-input
            v-model="question"
            type="textarea"
            :rows="5"
            placeholder="请输入您的编程问题"
            class="question-input"
          />
          <el-button type="primary" @click="handleCodeAnswer">提交问题</el-button>
          <div v-if="answer" class="answer">
            <h3>回答：</h3>
            <pre>{{ answer }}</pre>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 当前选中的选项卡
const activeTab = ref('code-check');

// 代码纠错
const code = ref('');
const error = ref('');

// 代码解读
const explanation = ref('');

// 编程回答
const question = ref('');
const answer = ref('');

// 提交代码纠错
const handleCodeCheck = () => {
  // 模拟代码纠错逻辑
  error.value = '第 5 行：未定义的变量 "x"。\n第 10 行：缺少分号。';
};

// 提交代码解读
const handleCodeExplain = () => {
  // 模拟代码解读逻辑
  explanation.value = `
    这段代码实现了一个简单的加法函数：
    1. 第 1 行：定义了一个函数 add，接收两个参数 a 和 b。
    2. 第 2 行：返回 a 和 b 的和。
  `;
};

// 提交编程回答
const handleCodeAnswer = () => {
  // 模拟编程回答逻辑
  answer.value = `
    在 JavaScript 中，可以使用以下方法实现数组去重：
    \`\`\`javascript
    const uniqueArray = [...new Set(array)];
    \`\`\`
  `;
};
</script>

<style scoped lang="scss">
.code-tutor-page {
  padding: 20px;
  background-color: #5e8d83;
  height: 650px;
  border-radius: 10px;

  .page-title {
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
  }

  .tabs {
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    .code-input,
    .question-input {
      margin-bottom: 20px;
    }

    .error-message,
    .explanation,
    .answer {
      margin-top: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 4px;

      h3 {
        font-size: 18px;
        color: #5e8d83;
        margin-bottom: 10px;
      }

      pre {
        white-space: pre-wrap;
        font-family: monospace;
      }
    }
  }
}
</style>