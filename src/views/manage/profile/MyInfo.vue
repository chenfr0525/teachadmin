<script setup>
import {adminGetInfoService} from '@/api/admin.js'
import { Iphone, Location, OfficeBuilding,User } from '@element-plus/icons-vue'
import {ref,onMounted} from 'vue'
//管理员信息
const admin=ref({})

//获取管理员信息
const getAdminData=async()=>{
  const res=await adminGetInfoService()
  admin.value=res.data.data.admin
}

onMounted(()=>{
  getAdminData()
})

</script>

<template>
  <el-card shadow="always">
    <el-container>
      <el-aside width="300px">
        <el-card shadow="never">
          <div class="info-one">
            <el-avatar :size="200" :src="'http://localhost:3000/'+admin.avatar" />
            <div class="intru">
              <h1>个人职责</h1>
              <p>{{admin.bio||'这人还没有职责！'}}</p>
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <el-descriptions title="个人信息" :column="1" size="large" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                用户名
              </div>
            </template>
            {{admin.username}}
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
            {{admin.phone}}
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
            {{admin.address}}
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
            {{admin.home_address}}
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