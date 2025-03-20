<script setup>
import {useStudentStore} from '@/stores'
import { Management, CaretBottom, User, Crop, EditPen, SwitchButton, UserFilled } from '@element-plus/icons-vue'
import { onMounted,ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const avatar = ref('')
const router = useRouter()
const studentStore=useStudentStore()

onMounted(() => {
  studentStore.getUser()
  username.value = studentStore.user.username
  avatar.value = studentStore.user.avatar
})


// 下拉菜单
const handleCommand = async (key) => {
  if (key === 'logout') {
    //退出操作
    await ElMessageBox.confirm('你确认要退出吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    studentStore.removeToken()
    studentStore.setUser({})
    router.push('/login')
  } else {
    //跳转操作
    router.push(`/user/${key}`)
  }
}

</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh">

    <el-header style="text-align: right; font-size: 12px;height: 70px;">

      <el-space>
        <img src="../../assets/智教链logo.png" alt="" style="width: 60px;border-radius: 50%;">
        <h1>智教链</h1>
      </el-space>

      <el-space :size="25">
        <div class="username">学生：<strong>{{username}}</strong></div>
        <!-- 下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户，默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar src="http://localhost:3000/uploads/emo.jpg" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userprofile" :icon="User">个人信息</el-dropdown-item>
              <el-dropdown-item command="updateInfo" :icon="EditPen">修改信息</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>

    </el-header>

    <el-container>
      <el-aside width="180px">
        <el-menu text-color="#fff" active-text-color="#ffcc00" background-color="#5e8d83" :default-active="$route.path"
          router>
          <el-menu-item index="/user/home">
            <el-icon>
              <Management />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/user/info">
            <el-icon>
              <Management />
            </el-icon>
            <span>信息</span>
          </el-menu-item>
          <!-- 多级菜单的标题 -具名插槽 title-->
          <el-sub-menu index="/user">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>智能编程教学</span>
            </template>
            <!-- 展开的内容 -默认插槽 -->
            <el-menu-item index="/user/codeteach">
              <el-icon>
                <User />
              </el-icon>
              <span>代码辅导</span>
            </el-menu-item>
            <el-menu-item index="/user/codelearn">
              <el-icon>
                <Crop />
              </el-icon>
              <span>代码学习</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 多级菜单的标题 -具名插槽 title-->
          <el-sub-menu index="/user">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个性化多轮回答</span>
            </template>
            <!-- 展开的内容 -默认插槽 -->
            <el-menu-item index="/user/knowledgeintegrate">
              <el-icon>
                <User />
              </el-icon>
              <span>知识集成</span>
            </el-menu-item>
            <el-menu-item index="/user/smartanswer">
              <el-icon>
                <Crop />
              </el-icon>
              <span>智能回答</span>
            </el-menu-item>
            <el-menu-item index="/user/personlearn">
              <el-icon>
                <Crop />
              </el-icon>
              <span>个性化学习</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 多级菜单的标题 -具名插槽 title-->
          <el-sub-menu index="/myinfo">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个人中心</span>
            </template>
            <!-- 展开的内容 -默认插槽 -->
            <el-menu-item index="/user/userprofile">
              <el-icon>
                <User />
              </el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="/user/updateInfo">
              <el-icon>
                <Crop />
              </el-icon>
              <span>修改信息</span>
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