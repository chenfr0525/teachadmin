<script setup>
import {User,Search,CaretBottom,SwitchButton} from '@element-plus/icons-vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <!-- head -->
      <el-affix>
        <el-header>
          <el-row>
            <!-- log -->
            <el-col class="log" :span="4" :offset="1">
              <img src="" alt="">
              <h1>智教链</h1>
            </el-col>
            <!-- nav -->
            <el-col class="nav" :span="7">
              <el-space>
                <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#5e8d83"
                  text-color="#fff" active-text-color="#ffcc00" @select="handleSelect" style="height: 100%;" router>
                  <el-menu-item index="/user/home">主页</el-menu-item>
                  <el-sub-menu index="2">
                    <template #title>Workspace</template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                    <el-sub-menu index="2-4">
                      <template #title>item four</template>
                      <el-menu-item index="2-4-1">item one</el-menu-item>
                      <el-menu-item index="2-4-2">item two</el-menu-item>
                      <el-menu-item index="2-4-3">item three</el-menu-item>
                    </el-sub-menu>
                  </el-sub-menu>
                  <el-menu-item index="3">Orders</el-menu-item>
                </el-menu>
              </el-space>
            </el-col>
            <!-- search -->
            <el-col class="search" :span="7">
              <el-input v-model="input" style="width: 265px;" size="large" placeholder="请输入内容"
                :prefix-icon="Search">
                <template #append>
                  <el-button>搜索</el-button>
                </template>
              </el-input>
            </el-col>
            <!-- user -->
            <el-col class="user" :span="5">
              <div class="username">管理员：<strong>user</strong></div>
              <!-- 下拉菜单 -->
              <el-dropdown placement="bottom-end" @command="handleCommand">
                <!-- 展示给用户，默认看到的 -->
                <span class="el-dropdown__box">
                  <el-avatar src="../../assets/1.jpg" />
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
                <!-- 折叠的下拉部分 -->
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                    <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
      </el-affix>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
      <el-footer>
        footer
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  margin: 0;
  padding: 0;
}

.el-header {
  height: 65px;
  width: 100%;
  background-color: #5e8d83;
  color: #fff;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.3);
}

.el-header .el-col{
  align-content: center;
}

.el-menu--horizontal>.el-menu-item {
  height: 65px;
}

.el-header .log {
  display: flex;
  align-items: center;
}

.el-header .log img {
  width: 40px;
  height: 40px;
}

.el-header .log h1 {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}

.el-header .search .el-button{
  width: 75px;
  height: 40px;
  background: #198754;
  color: #fff;
}

.el-header .user{
  display: flex;
  align-items: center;
}

.el-header .user .username{
  margin-right: 20px;
}

.el-main {
  padding: 0;
  width: 1200px;
  margin: 0 auto;
}
</style>