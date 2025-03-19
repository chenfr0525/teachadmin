<script setup>
import { adminGetAllService, adminUpdateInfoService, adminGetOneService, adminRegisterService,adminDeleteService } from '@/api/admin.js'
import { ref, onMounted } from 'vue';
import { Refresh, Plus, Delete, Search, Edit } from '@element-plus/icons-vue'

//头部查询表
const queryFormRef = ref();
//弹出的表单
const roleFormRef = ref();
const loading = ref(false);
const ids = ref([]);
const total = ref(0);

const queryParams = ref({
  currentPage: 1,
  pageSize: 10,
  bio: '',
  username: ''
});

// 管理员表格数据
const roleList = ref();
// 弹窗
const dialog = ref({
  title: "",
  visible: false,
});
// 管理员表单
const formData = ref({
  id:'',
  username: '',
  gender: 1,
  phone: '',
  address: '',
  bio: ''
});
//规则
const rules = ref({
  username: [
    { required: true, message: "管理员名称不能为空", trigger: "blur" },
    { min: 2, max: 10, message: '名称必须是 2-10位 的字符', trigger: 'blur' }

  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur', },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur", },
  ],
  bio: [
    { required: true, message: "职责内容不能为空", trigger: "blur" },
  ]
});

// 查询
function handleQuery() {
  loading.value = true;
  adminGetAllService(queryParams.value)
    .then((data) => {
      roleList.value = data.data.data.admins
      total.value = data.data.data.pagination.total
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

// 行复选框选中
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id);
}

// 打开管理员弹窗
function handleOpenDialog(roleId) {
  dialog.value.visible = true;
  if (roleId) {
    dialog.value.title = "修改管理员";
    adminGetOneService(roleId).then((data) => {
      const { username, gender, phone, address, bio,id } = data.data.data.admin
      Object.assign(formData.value, { username, gender, phone, address, bio,id });
    });
  } else {
    dialog.value.title = "新增管理员";
  }
}

// 提交管理员表单
function handleSubmit() {
  roleFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      const roleId = formData.value.id;
      const { username, gender, phone, bio, address } = formData.value
      if (roleId) {
        adminUpdateInfoService(roleId, { username, gender, phone, bio, address })
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        //新增用户密码初始值为123456
        formData.value.password='123456'
        adminRegisterService(formData.value)
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

// 关闭弹窗
function handleCloseDialog() {
  dialog.value.visible = false;

  roleFormRef.value.resetFields();
  roleFormRef.value.clearValidate();

  formData.value.id = undefined;
}

// 删除管理员
function handleDelete(roleId) {
  const roleIds = [roleId || ids.value].join(",");
  if (!roleIds) {
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
      adminDeleteService(roleIds)
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

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-card shadow="always">
      <div class="search-bar">
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item prop="username" label="名称">
            <el-input v-model="queryParams.username" placeholder="管理员名称" clearable @keyup.enter="handleQuery" />
          </el-form-item>

          <el-form-item prop="bio" label="职责">
            <el-input v-model="queryParams.bio" placeholder="管理员职责" clearable @keyup.enter="handleQuery" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
            <el-button :icon="Refresh" @click="handleResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-card shadow="never">
        <div class="mb-10px">
          <el-button type="success" :icon="Plus" @click="handleOpenDialog()">新增</el-button>
          <el-button type="danger" :disabled="ids.length === 0" :icon="Delete" @click="handleDelete()">
            删除
          </el-button>
        </div>

        <el-table ref="dataTableRef" v-loading="loading" :data="roleList" highlight-current-row border
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="编码" prop="id" width="80" align="center" />
          <el-table-column label="管理员名称" prop="username" min-width="100" />
          <el-table-column label="性别" width="100" align="center">
            <template #default="scope">
              {{ scope.row.gender === 1 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column label="电话号码" prop="phone" min-width="100" />
          <el-table-column label="职责" prop="bio" min-width="100" />
          <el-table-column label="地址" prop="address" min-width="100" />
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button type="primary" size="small" link :icon="Edit" @click="handleOpenDialog(scope.row.id)">
                编辑
              </el-button>
              <el-button type="danger" size="small" link :icon="Delete" @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.currentPage"
          v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
      </el-card>
    </el-card>

    <!-- 管理员表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" @close="handleCloseDialog">


      <el-form ref="roleFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="formData.username" placeholder="请输入管理员名称" />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :value="1" label="男">男</el-radio>
            <el-radio :value="0" label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入电话" maxlength="11" />
        </el-form-item>

        <el-form-item label="职责" prop="bio">
          <el-input v-model="formData.bio" placeholder="请输入职责" />
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入地址" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>