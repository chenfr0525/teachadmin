<script setup>
import { ref, computed } from 'vue'

//信息数据
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: '信息一',
    time: '2025-1-1',
    name: '1',
    content: '不想学习',
    type: 'done'
  },
  {
    title: '信息二',
    time: '2022-4-1',
    name: '2',
    content: '没钱了',
    type: 'none'
  },
  {
    title: '好消息',
    time: '2024-12-1',
    name: '3',
    content: '今天周末',
    type: 'none'
  },
  {
    title: '坏消息',
    time: '2024-5-30',
    name: '4',
    content: '找不到工作',
    type: 'done'
  }
])

const infoNumNone = computed(() => {
  return editableTabs.value.reduce((sum, item) => {
    return sum + (item.type === 'none' ? 1 : 0)
  }, 0)
})

//删除信息
const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}

//读取所有信息
const readAll = () => {
  editableTabs.value.forEach((item) => {
    item.type = 'done'
  })
}
</script>

<template>
  <el-card shadow="always">
    <template #header>
      <el-row>
        <el-col :span="17">
          <el-badge :value="infoNumNone" :max="99">
            <h1 style="font-size: 20px;">我的信息</h1>
          </el-badge>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="readAll">读取所有信息</el-button>
          <el-button type="success">删除已读信息</el-button>
        </el-col>
      </el-row>
    </template>
    <el-card shadow="never" class="info-content">
      <el-tabs tab-position="left" v-model="editableTabsValue" type="card" class="demo-tabs" closable
        @tab-remove="removeTab" >
        <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
          <template #label>
            <p v-if="item.type === 'done'">{{ item.title }}</p>
            <el-badge v-else is-dot @click="item.type = 'done'">{{ item.title }}</el-badge>
          </template>
          <template #default>
            <div class="info">
              <h1>{{ item.title }}</h1>
              <span>{{ item.time }}</span>
              <p>{{ item.content }}</p>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-card>
</template>

<style lang="scss">
.info-content {
  --el-card-padding: 0;

  .demo-tabs {
    .el-tabs__item {
      height: 50px;
      width: 200px;
      justify-content: center;
    }

    .el-tabs__content {
      padding: 20px;

      .info {
        .el-row {
          h1 {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
          }
        }

        span {
          display: block;
          color: #525252;
          margin: 5px 0 10px 2px;
        }

        p {
          margin-left: 15px;
          font-size: 17px;
        }
      }
    }
  }
}
</style>