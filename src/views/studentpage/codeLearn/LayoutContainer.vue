<template>
  <div class="demo-main">
    <!-- 面包屑导航 -->
    <el-header class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user/codelearn/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path === '/user/codelearn/algorithms'">
          基础算法集锦
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="$route.path === '/user/codelearn/codeerrors'">
          常见错误集锦
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 路由视图 -->
    <el-card shadow="never">
      <router-view />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.demo-main {
  display: flex;
  flex-direction: column;
  height: 650px;
  border-radius: 20px;
  overflow: hidden;

  .header {
    background-color: #5e8d83;
    padding: 20px;
    display: flex;
    align-items: center;

    .el-breadcrumb {
      font-size: 16px;

      :deep(.el-breadcrumb__inner) {
        color: white;

        &.is-link {
          font-weight: bold;
        }
      }
    }
  }
}
</style>