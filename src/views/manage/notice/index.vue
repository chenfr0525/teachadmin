<script setup>
import { InfoGetAllService, InfoGetOneService, InfoPostService, InfoUpdateService, InfoDeleteService } from '@/api/adminInfo'
import { ref, onMounted } from "vue";
import { Refresh, Plus, Delete, Search, Close } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/index'

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const selectIds = ref([]);
const total = ref(0);

const queryParams = ref({
  currentPage: 1,
  pageSize: 10,
  title: '',
  username: '',
  status: ''
});

// 通知公告表格数据
const pageData = ref([]);

// 弹窗
const dialog = ref({
  title: "",
  visible: false,
});

// 通知公告表单数据
const formData = ref({
  id: '',
  title: '',
  content: '',
  status: 0
});

// 通知公告表单校验规则
const rules = ref({
  title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],
  content: [
    {
      required: true,
      message: "请输入通知内容",
      trigger: "blur",
      validator: (rule, value, callback) => {
        if (!value.replace(/<[^>]+>/g, "").trim()) {
          callback(new Error("请输入通知内容"));
        } else {
          callback();
        }
      },
    },
  ]
});

const detailDialog = ref({
  visible: false,
});
const currentNotice = ref({});

// 查询通知公告
function handleQuery() {
  loading.value = true;
  InfoGetAllService(queryParams.value)
    .then((data) => {
      pageData.value = data.data.data.informations;
      total.value = data.data.data.pagination.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 重置查询
function handleResetQuery() {
  queryFormRef.value.resetFields();
  queryParams.value.currentPage = 1;
  handleQuery();
}

// 行复选框选中项变化
function handleSelectionChange(selection) {
  selectIds.value = selection.map((item) => item.id);
}

// 打开通知公告弹窗
function handleOpenDialog(id) {
  dialog.value.visible = true;
  if (id) {
    dialog.value.title = "修改公告";
    InfoGetOneService(id).then((data) => {
      Object.assign(formData.value, data.data.data.information);
    });
  } else {
    Object.assign(formData.value);
    dialog.value.title = "新增公告";
  }
}

// 发布通知公告
function handlePublish(id) {
  InfoUpdateService(id, { status: 1 }).then(() => {
    ElMessage.success("发布成功");
    handleQuery();
  });
}

// 通知公告表单提交
function handleSubmit() {
  dataFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      const id = formData.value.id;
      if (id) {
        InfoUpdateService(id, formData.value)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        InfoPostService(formData.value)
          .then(() => {
            ElMessage.success("新增成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

// 重置表单
function resetForm() {
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.value.id = undefined;
}

// 关闭通知公告弹窗
function handleCloseDialog() {
  dialog.value.visible = false;
  resetForm();
}

// 删除通知公告
function handleDelete(id) {
  const deleteIds = [id || selectIds.value].join(",");
  if (!deleteIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {
      loading.value = true;
      InfoDeleteService(deleteIds)
        .then(() => {
          ElMessage.success("删除成功");
          handleResetQuery();
        })
        .finally(() => (loading.value = false));
    },
    () => {
      ElMessage.info("已取消删除");
    }
  );
}

const closeDetailDialog = () => {
  detailDialog.value.visible = false;
};

const openDetailDialog = async (id) => {
  currentNotice.value = pageData.value.filter((item) => item.id === id)[0]
  console.log(currentNotice.value)
  detailDialog.value.visible = true;
};

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-card shadow="always">
      <div class="search-bar">
        <el-form ref="queryFormRef" :model="queryParams" :inline="true" label-suffix=":">
          <el-form-item label="标题" prop="title">
            <el-input v-model="queryParams.title" placeholder="标题" clearable @keyup.enter="handleQuery()" />
          </el-form-item>
          <el-form-item label="发布人" prop="username">
            <el-input v-model="queryParams.username" placeholder="发布人" clearable @keyup.enter="handleQuery()" />
          </el-form-item>
          <el-form-item label="发布状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 90px">
              <el-option label="已发布" :value="1" />
              <el-option label="未发布" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="handleQuery()">搜索</el-button>
            <el-button :icon="Refresh" @click="handleResetQuery()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-card shadow="never" class="table-wrapper">
        <template #header>
          <el-button type="success" :icon="Plus" @click="handleOpenDialog()">
            新增通知
          </el-button>
          <el-button type="danger" :disabled="selectIds.length === 0" :icon="Delete" @click="handleDelete()">
            删除
          </el-button>
        </template>

        <el-table ref="dataTableRef" v-loading="loading" :data="pageData" highlight-current-row
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column label="通知标题" prop="title" min-width="160" />
          <el-table-column align="center" label="发布人" prop="admin.username" width="150" />
          <el-table-column align="center" label="发布状态" min-width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.status == 0" type="info">未发布</el-tag>
              <el-tag v-if="scope.row.status == 1" type="success">已发布</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" width="200">
            <template #default="scope">
              <div class="flex-x-start">
                <span>创建时间：</span>
                <span>{{ formatDate(scope.row.createdAt) || "-" }}</span>
              </div>

              <div class="flex-x-start" v-if="scope.row.status == 1">
                <span>发布时间：</span>
                <span>{{ formatDate(scope.row.updatedAt) || "-" }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button type="primary" size="small" link @click="openDetailDialog(scope.row.id)">
                查看
              </el-button>
              <el-button v-if="scope.row.status === 0" type="primary" size="small" link
                @click="handlePublish(scope.row.id)">
                发布
              </el-button>
              <el-button v-if="scope.row.status === 0" type="primary" size="small" link
                @click="handleOpenDialog(scope.row.id)">
                编辑
              </el-button>
              <el-button type="danger" size="small" link @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.currentPage"
          v-model:limit="queryParams.pageSize" @pagination="handleQuery()" />
      </el-card>
    </el-card>

    <!-- 通知公告表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" top="3vh" width="80%" @close="handleCloseDialog">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="formData.title" placeholder="通知标题" clearable />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <WangEditor v-model="formData.content" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="formData.status" inline-prompt active-text="已发布" inactive-text="未发布" :active-value="1"
            :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 通知公告详情 -->
    <el-dialog class="dialog-container" v-model="detailDialog.visible" :show-close="false" width="50%" append-to-body @close="closeDetailDialog">
      <template #header>
        <div class="flex-x-between">
          <span>通知公告详情</span>
          <div class="dialog-toolbar">
            <el-button circle @click="closeDetailDialog">
              <template #icon>
                <Close />
              </template>
            </el-button>
          </div>
        </div>
      </template>
      <el-card shadow="always">
        <el-descriptions :column="2" border>
        <el-descriptions-item label="标题：">
          {{ currentNotice.title }}
        </el-descriptions-item>
        <el-descriptions-item label="发布状态：">
          <el-tag v-if="currentNotice.status == 0" type="info">未发布</el-tag>
          <el-tag v-else-if="currentNotice.status == 1" type="success">已发布</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布人：">
          {{ currentNotice.admin.username }}
        </el-descriptions-item>
        <el-descriptions-item  label="创建时间：">
          {{ formatDate(currentNotice.createdAt) }}
        </el-descriptions-item>
        <el-descriptions-item v-if="currentNotice.status === 1" label="发布时间：">
          {{ formatDate(currentNotice.updatedAt) }}
        </el-descriptions-item>
        <el-descriptions-item label="公告内容：">
          <div class="notice-content" v-html="currentNotice.content" />
        </el-descriptions-item>
      </el-descriptions>
      </el-card>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog-container {
  .flex-x-between {
    padding: 5px 20px;
    display: flex;
    height: 35px;
    justify-content: space-between;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .el-card__body {
    padding: 0;
  }
}
</style>