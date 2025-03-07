<script setup>
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'

</script>

<template>
  <el-card shadow="always">
    <el-container>
      <el-aside width="300px">
        <el-card shadow="never">
          <div class="info-one">
            <el-avatar :size="200" src="../../../assets/1.jpg" />
            <div class="intru">
              <h1>个人简介</h1>
              <p>这人很懒，还没有些个人介绍！</p>
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <el-descriptions title="个人信息" :column="2" size="large" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                用户名
              </div>
            </template>
            user
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <iphone />
                </el-icon>
                电话
              </div>
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <location />
                </el-icon>
                地址
              </div>
            </template>
            北京
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <tickets />
                </el-icon>
                标签
              </div>
            </template>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <office-building />
                </el-icon>
                家庭住址
              </div>
            </template>
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-main>
    </el-container>
  </el-card>
</template>

<style scoped lang="scss">
.el-aside .el-card {
  .info-one {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .intru {
      margin-top: 40px;

      h1 {
        font-size: 20px;
        margin-bottom: 20px;

        p {
          height: 100px;
        }
      }
    }
  }
}
</style>