<script setup>
import {useAdminStore} from '@/stores'
import { Management, CaretBottom, User,Crop,EditPen,SwitchButton,UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router=useRouter()
const adminStore=useAdminStore()
adminStore.getUser()
// 下拉菜单
const handleCommand = async (key) =>{
  if(key === 'logout'){
    //退出操作
    await ElMessageBox.confirm('你确认要退出吗？','温馨提示',{
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    adminStore.removeToken()
    adminStore.setUser({})
    router.push('/login')
  }else {
    //跳转操作
    router.push(`/myinfo/${key}`)
  }
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
        <div class="username">管理员：<strong>{{ adminStore.user.username }}</strong></div>
        <!-- 下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户，默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar :src="adminStore.user.avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="updateuser" :icon="EditPen">修改信息</el-dropdown-item>
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
            <el-menu-item index="/myinfo/updateuser">
              <el-icon>
                <Crop />
              </el-icon>
              <span>修改信息</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
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
  padding: 20px;
}
</style>