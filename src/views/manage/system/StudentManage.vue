<script setup>
import { studentGetAllService,studentGetOneService,studentDeleteService } from '@/api/adminhome'
import {studentUpdateInfoService,studentRegisterService} from '@/api/student'
import { ref, onMounted } from 'vue'
import { Refresh, Plus, Delete, RefreshLeft, Search, Edit } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/index'

//头部查询表
const queryFormRef = ref();
//弹出的表单
const userFormRef = ref();

const queryParams = ref({
  currentPage: 1,
  pageSize: 10,
  createdAt: "",
  username:'',
  phone:'',
  status: ''
});

//查询数据库所得的数据
const pageData = ref();
//数据总数
const total = ref(0);
//加载状态
const loading = ref(false);

//设置弹出层状态
const dialog = ref({
  visible: false,
  title: "新增用户",
});

//弹出层表单数据
const formData = ref({
  status: 1,
  id: '',
  username: '',
  gender: 1,
  phone: '',
  email: '',
  address: '',
  school: '',
  createdAt: ''
});

//设置规则
const rules = {
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 2, max: 10, message: '用户名必须是 2-10位 的字符', trigger: 'blur' }
  ],
  email: [
    { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: "请输入正确的邮箱地址", trigger: "blur", },
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur', },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur", },
  ],
}

// 选中的用户ID
const selectIds = ref([]);

// 查询
const handleQuery = () => {
  loading.value = true;
  studentGetAllService(queryParams.value)
    .then((data) => {
      pageData.value = data.data.data.students
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
  queryParams.value.createdAt = undefined;
  handleQuery();
}

// 选中项发生变化
function handleSelectionChange(selection) {
  selectIds.value = selection.map((item) => item.id);
}

// 重置密码
function hancleResetPassword(row) {
  ElMessageBox.prompt("请输入用户【" + row.username + "】的新密码", "重置密码", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(
    ({ value }) => {
      if (!value || value.length < 6) {
        ElMessage.warning("密码至少需要6位字符，请重新输入");
        return false;
      }
      studentUpdateInfoService(row.id, {password:value}).then((res) => {
        console.log(res.data)
        ElMessage.success("密码重置成功，新密码是：" + value);
      });
    },
    () => {
      ElMessage.info("已取消重置密码");
    }
  );
}

/**
 * 打开弹窗
 *
 * @param id 用户ID
 */
async function handleOpenDialog(id) {

  if (id) {
    dialog.value.title = "修改用户";
    studentGetOneService(id).then((res) => {
      let data=res.data.data.student
      Object.assign(formData.value, { ...data });
    });
  } else {
    dialog.value.title = "新增用户";
  }
  dialog.value.visible = true;
}

// 关闭弹窗
function handleCloseDialog() {
  dialog.value.visible = false;
  userFormRef.value.resetFields();
  userFormRef.value.clearValidate();

  formData.value.id = undefined;
  formData.value.status = 1;
}

// 提交用户表单
const handleSubmit =() => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      const userId = formData.value.id;
      loading.value = true;
      if (userId) {
        const {username,gender,phone,email,address,school}=formData.value
        studentUpdateInfoService(userId, {username,gender,phone,email,address,school})
          .then(() => {
            ElMessage.success("修改用户成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        //新增用户密码初始值为123456
        formData.value.password='123456'
        studentRegisterService(formData.value)
          .then(() => {
            ElMessage.success("新增用户成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
 })
}

/**
 * 删除用户
 *
 * @param id  用户ID
 */
const handleDelete = (id) => {
  const userIds = [id || selectIds.value].join(",");
  if (!userIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除用户?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    function () {
      loading.value = true;
      studentDeleteService(userIds)
        .then(() => {
          ElMessage.success("删除成功")
          handleResetQuery()
          handleQuery()
        })
        .finally(() => (loading.value = false))
    },
    function () {
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
      <el-row :gutter="20">
        <!-- 用户列表 -->
        <el-col>
          <div class="search-bar">
            <el-form ref="queryFormRef" :model="queryParams" :inline="true">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="queryParams.username" placeholder="用户名" clearable style="width: 100px"
                  @keyup.enter="handleQuery" />
              </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="queryParams.phone" placeholder="手机号" clearable style="width: 150px"
                  @keyup.enter="handleQuery" />
              </el-form-item>

              <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 80px">
                  <el-option label="正常" :value="1" />
                  <el-option label="禁用" :value="0" />
                </el-select>
              </el-form-item>

              <el-form-item label="创建时间">
                <el-date-picker v-model="queryParams.createdAt" :editable="false" class="!w-[240px]" type="daterange"
                  range-separator="~" start-placeholder="开始时间" end-placeholder="截止时间" value-format="YYYY-MM-DD" />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                <el-button :icon="Refresh" @click="handleResetQuery">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-card shadow="never">
            <div class="flex-x-between mb-10px">
              <div>
                <el-button type="success" :icon="Plus" @click="handleOpenDialog()">
                  新增
                </el-button>
                <el-button type="danger" :icon="Delete" :disabled="selectIds.length === 0"
                  @click="handleDelete()">
                  删除
                </el-button>
              </div>
            </div>

            <el-table v-loading="loading" :data="pageData" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column label="用户名" prop="username" />
              <el-table-column label="性别" width="100" align="center">
                <template #default="scope">
                  {{ scope.row.gender === 1 ? '男' : '女' }}
                </template>
              </el-table-column>
              <el-table-column label="手机号码" align="center" prop="phone" width="120" />
              <el-table-column label="邮箱" align="center" prop="email" width="200" />
              <el-table-column label="状态" align="center" prop="status" width="80">
                <template #default="scope">
                  <el-tag :type="scope.row.status == 1 ? 'success' : 'info'">
                    {{ scope.row.status == 1 ? "正常" : "禁用" }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" width="150">
                <template #default="scope">
                  {{ formatDate(scope.row.createdAt) }}
                </template>
              </el-table-column>
              <el-table-column label="地址" align="center" prop="address" width="150" />
              <el-table-column label="学校" align="center" prop="school" width="100" />
              <el-table-column label="操作" fixed="right" width="220">
                <template #default="scope">
                  <el-button type="primary" :icon="RefreshLeft" size="small" link
                    @click="hancleResetPassword(scope.row)">
                    重置密码
                  </el-button>
                  <el-button type="primary" :icon="Edit" link size="small"
                    @click="handleOpenDialog(scope.row.id)">
                    编辑
                  </el-button>
                  <el-button type="danger" :icon="Delete" link size="small"
                    @click="handleDelete(scope.row.id)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.currentPage"
              v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- 用户表单 -->
    <el-drawer v-model="dialog.visible" :title="dialog.title" append-to-body @close="handleCloseDialog">
      <el-form ref="userFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" :readonly="!!formData.id" placeholder="请输入用户名" />
        </el-form-item>


        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :value="1" label="男">男</el-radio>
            <el-radio :value="0" label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" maxlength="50" />
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入地址" maxlength="100" />
        </el-form-item>

        <el-form-item label="学校" prop="school">
          <el-input v-model="formData.school" placeholder="请输入学校" maxlength="50" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="formData.status" inline-prompt active-text="正常" inactive-text="禁用" :active-value="1"
            :inactive-value="0" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>



<style></style>
