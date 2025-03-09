<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user/knowledgeintegrate' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/user/knowledgeintegrate/course">全部课程</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path !== '/user/knowledgeintegrate/course'&& $route.path !== '/user/knowledgeintegrate/home'">
          课程
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  --el-header-height:30px;
}

.el-main {
  --el-main-padding:0px;
}
</style>