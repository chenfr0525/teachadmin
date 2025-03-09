<template>
  <div class="home-page">
    <h1 class="page-title">欢迎来到代码学习库</h1>
    <el-row>
      <el-col :span="24">
        <el-card class="card" @click="$router.push('/user/codelearn/algorithms')">
          <h2>基础算法集锦</h2>
          <p>学习常用算法，提升编程能力。</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="card" @click="$router.push('/user/codelearn/codeerrors')">
          <h2>常见错误集锦</h2>
          <p>了解常见错误，避免编程陷阱。</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  padding: 20px;

  .page-title {
    font-size: 24px;
    color: #5e8d83;
    margin-bottom: 20px;
  }

  .card {
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    h2 {
      font-size: 20px;
      color: #5e8d83;
    }

    p {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>