<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
const activeName = ref('1')
const router=useRouter()
const handleLogin=()=>{
  router.push('/login')
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-affix>
        <el-header>
          <el-space>
            <div class="log">
              <img src="../assets//智教链logo.png" alt="">
              <h1>智教链</h1>
            </div>
            <div class="nav">
              <el-space>
                <el-link style="color: #fff;font-size: 17px;" :underline="false" @click="handleLogin">登录/注册</el-link>
                <el-link style="color: #fff;font-size: 17px;" :underline="false">关于我们</el-link>
              </el-space>
            </div>
          </el-space>
        </el-header>
      </el-affix>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="img">
              <img src="../assets/preimg.jpg" alt="" style="width:610px;height:430px;">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content">
              <h1 style="color: #4c7273;">智教链</h1>
              <p>智教链是一个基于区块链技术的教育平台，致力于打造一个公平、公正、透明的教育生态。</p>
              <el-space :size="40">
                <el-button @click="handleLogin">学生</el-button>
                <el-button @click="handleLogin">管理员</el-button>
              </el-space>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="demo-collapse">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                  <template #title>
                    <img src="../assets/pre1.jpg" alt="">
                    <h1>个性化多轮回答</h1>
                  </template>
                  <div class="colContent">知识集成</div>
                  <div class="colContent">智能回答</div>
                  <div class="colContent">个性化学习</div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    <img src="../assets/pre2.jpg" alt="">
                    <h1>智能编程教学</h1>
                  </template>
                  <div class="colContent">代码辅导</div>
                  <div class="colContent">代码学习库</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-row :gutter="60">
          <el-col :span="12">
            <div class="footer-title">
              <h1>智教链</h1>
              <p>智教链是一个基于区块链技术的教育平台，致力于打造一个公平、公正、透明的教育生态。</p>
            </div>
          </el-col>
          <el-col :span="7" :offset="5">
            <div class="contact">
              <h1>相关</h1>
              <div class="links">
                <el-link :underline="false">关于我们</el-link>
                <el-link :underline="false">联系我们</el-link>
                <el-link :underline="false">加入我们</el-link>
              </div>
            </div>
          </el-col>
        </el-row>
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
  height: 80px;
  width: 100%;
  background-color: #5e8d83;
  color: #fff;
}

.el-header .el-space {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header .log {
  display: flex;
  align-items: center;
}

.el-header .log img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.el-header .log h1 {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}

.el-header .nav {
  display: flex;
  align-items: center;
}

.el-main {
  width: 90%;
  margin: 0 auto;
}

.el-main .img {
  width: 100%;
  height: 100%;
  border: 2px dashed #5e8d83;
  border-radius: 25px;
  overflow: hidden;
}

.el-main .img img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.el-main .content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-main .content p {
  margin: 30px 0;
}

.el-main .content .el-button {
  height: 40px;
  width: 90px;
  background-color: #198754;
  color: #fff;
}

.el-main .el-row {
  margin-bottom: 40px;
}

.el-main .el-row:last-child {
  margin-bottom: 0;
}

.el-main .demo-collapse {
  width: 100%;
  border: 1px solid #5e8d83;
  border-radius: 15px;
  overflow: hidden;
}

.el-main .demo-collapse .el-collapse {
  --el-collapse-header-height: 85px;
}

.el-main .demo-collapse .el-collapse-item {
  padding: 0 20px;
  border-bottom: 1px solid #5e8d83;
}

.el-main .demo-collapse .el-collapse-item img {
  width: 50px;
  height: 50px;
  border-radius: 20px;
}

.el-main .demo-collapse .el-collapse-item .colContent {
  padding:0 20px ;
  line-height: 50px;
  font-size: 17px;
  height: 50px;
  border-top: 1px solid #198754;
}


.el-footer {
  height: 200px;
  width: 100%;
  background-color: #5e8d83;
  color: #fff;
  padding: 20px 80px;
}

.el-footer .footer-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-footer .contact .links {
  display: flex;
  flex-direction: column;
}

.el-footer .contact .links .el-link {
  display: block;
  margin-bottom: 10px;
  color: #fff;
}
</style>