,
<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <ul class="banner">
          <li><a href="#">菜单1<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单2<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单3<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单4<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单5<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单6<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单7<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单8<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
          <li><a href="#">菜单9<el-icon size="11px">
                <ArrowRightBold />
              </el-icon></a></li>
        </ul>
      </el-aside>
      <el-main width="800px">
        <el-carousel trigger="click" height="450px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <el-aside width="200px">
        <div class="bgcard">
          <el-card style="max-width: 200px" class="todaytime">
            <template #header>
              <div class="card-header">
                <span>在线时长<el-tag type="success">今日</el-tag></span>
              </div>
            </template>
            <p style="text-align: center;margin: 10px 0;"><strong>3</strong>小时<strong>22</strong>分钟</p>
            <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
            <template #footer>
              <span>连续上线<strong>7</strong>天</span>
            </template>
          </el-card>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 450px;
}

.common-layout .el-main {
  padding: 0;
  background-color: #97d8ca;
}

.banner li {
  height: 50px;
}

.banner li a {
  display: block;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: #5e8d83;
}

.banner li a:hover,
.banner li a:hover .el-icon {
  color: #ffcc00;
}


.banner li a .el-icon {
  color: #fff;
  left: 60px;
}

.el-aside .bgcard {
  margin-top: 130px;
  padding-top: 30px;
  width: 200px;
  height: 290px;
  background-color: #5e8d83;
  border-radius: 20px;
}

.el-aside .todaytime {
  --el-card-padding: 25px;
  --el-card-border-radius: 20px;
}
</style>