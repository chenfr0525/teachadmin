<script setup>
import { Management, CaretBottom, User,Crop,EditPen,SwitchButton,UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}

</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh">

    <el-header style="text-align: right; font-size: 12px;height: 70px;">

      <el-space>
        <img src="../../assets/智教链logo.png" alt="" style="width: 60px;border-radius: 50%;">
        <h1>智教链后台</h1>
      </el-space>

      <el-space :size="25">
        <div class="username">管理员：<strong>user</strong></div>
        <!-- 下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户，默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar src="../assets/avatar.jpg" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>

    </el-header>

    <el-container>
      <el-aside width="180px">
        <el-menu text-color="#fff" active-text-color="#ffcc00" background-color="#5e8d83" :default-active="$route.path" router>
          <el-menu-item index="/admin/home">
            <el-icon>
              <Management />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/system/student">
            <el-icon>
              <Management />
            </el-icon>
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item index="/system/role">
            <el-icon>
              <Management />
            </el-icon>
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system/notice">
            <el-icon>
              <Management />
            </el-icon>
            <span>通知公告</span>
          </el-menu-item>
          <el-menu-item index="/system/log">
            <el-icon>
              <Management />
            </el-icon>
            <span>系统日志</span>
          </el-menu-item>
          <!-- 多级菜单的标题 -具名插槽 title-->
          <el-sub-menu index="/myinfo">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个人中心</span>
            </template>
            <!-- 展开的内容 -默认插槽 -->
            <el-menu-item index="/myinfo/profile">
              <el-icon>
                <User />
              </el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="/myinfo/password">
              <el-icon>
                <Crop />
              </el-icon>
              <span>修改密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main style="padding: 20px;">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>

  </el-container>
</template>


<style scoped>
.layout-container-demo .el-header {
  background-color: #5e8d83;
  color: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.layout-container-demo .el-header .username {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.layout-container-demo .el-header .el-dropdown__box:active,
.layout-container-demo .el-header .el-dropdown__box:focus {
  outline: none;
}

.layout-container-demo .el-aside {
  border-right: 1px solid #cccccc;
  background-color: #5e8d83;
}

.layout-container-demo .el-menu {
  border-right: none;
}


.layout-container-demo .el-main {
  padding: 0;
}
</style>