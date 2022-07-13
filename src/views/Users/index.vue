<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 -->
    <Card>
      <template #header>
        <el-input
          clearable
          placeholder="请输入内容"
          v-model.trim="input"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </template>
      <template #button>
        <el-button type="primary" @click="add">添加用户</el-button>
      </template>
    </Card>
    <!-- 内容 -->
    <el-card class="box-card">
      <!-- 数据列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        size="mini"
      >
        <el-table-column prop="index" label="#" width="50" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" min-width="258">
        </el-table-column>
        <el-table-column prop="create_time" label="电话" min-width="289">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          min-width="255"
          width="289"
        >
        </el-table-column>
        <el-table-column label="状态" min-width="180">
          <template slot-scope="{ row }">
            <!-- {{ row.mg_state }} -->
            <el-switch v-model="row.mg_state" @change="usersstate(row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="218">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="getusers(row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              circle
              @click="usersrole(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteuser(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增和修改的弹出框 -->
    <el-dialog
      :title="showPasword ? '添加用户对话框' : '编辑用户'"
      :visible.sync="showDolg"
      @close="onCancel"
      width="40%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            :disabled="!showPasword"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="showPasword" label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="addusers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色弹窗 -->
    <el-dialog title="分配角色" :visible.sync="showRole" width="30%">
      <span>
        <p>当前用户：{{ ruleForm.username }}</p>
        <p>当前角色：{{ role_name }}</p>
        <p>
          分配新角色：<el-select v-model="role" placeholder="请选择">
            <el-option
              v-for="item in getrolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isnotOK">取 消</el-button>
        <el-button type="primary" @click="isok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { usersList, usersstate, addusers, deleteusers, getusers, editusers, usersrole } from '@/api/user'
import { mapActions, mapState } from 'vuex'
export default {
  created () {
    this.usersList()
    this.rolesList()
    // console.log(this.getrolesList)
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      input: '',
      showDolg: false, // 新增弹窗
      tableData: [], // 用户数据列表
      pagenum: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: null, // 总条数
      showPasword: false, // 用来判断显示新增还是修改的内容
      id: null, // 修改用户信息的id
      showRole: false, // 分配角色的弹窗
      role: null, // 角色id
      role_name: '' // 用户角色
    }
  },
  methods: {
    ...mapActions(['rolesList']),
    // 获取用户列表
    async usersList () {
      const res = await usersList({
        query: this.input,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // console.log(res)
      this.tableData = res.data.data.users
      this.total = res.data.data.total
    },
    // 搜索
    search () {
      this.usersList()
    },
    // 获取修改的每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.usersList()
    },
    // 获取当前页数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.usersList()
    },
    // 修改用户状态
    async usersstate (row) {
      console.log(row.mg_state)
      await usersstate({
        uId: row.id,
        type: row.mg_state
      })

      this.$message.success('修改状态成功')
    },
    // 添加用户 和修改数据时  弹窗框的 确定事件 同一个弹框 新增和修改公用
    async addusers () {
      if (this.showPasword) {
        // console.log(456)
        // 添加数据
        // 先手动校验表单
        try {
          await this.$refs.ruleForm.validate()
          const res = await addusers(this.ruleForm)
          // console.log(res)
          this.tableData.push(res.data.data)
          this.showDolg = false
          this.$message.success('添加成功')
        } catch (error) {
          console.log(error)
          this.$message.error('添加失败')
        }
      } else {
        // 修改数据
        try {
          await this.$refs.ruleForm.validate()
          await editusers({
            id: this.id,
            email: this.ruleForm.email,
            mobile: this.ruleForm.mobile
          })
          this.usersList()
          this.showDolg = false
          this.$message.success('修改成功')
        } catch (error) {
          console.log(error)
          this.$message.error('修改失败')
        }
      }
    },
    // 取消弹出层
    onCancel () {
      this.showDolg = false
      this.ruleForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.ruleForm.resetFields()
    },
    // 删除员工
    async deleteuser (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用接口
        // 提示消息
        // 重新获取数据渲染页面
        const res = await deleteusers(id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.usersList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 点击添加
    add () {
      this.showPasword = true
      this.showDolg = true
    },
    // 根据id获取用户数据  用于修改时的回显
    async getusers (id) {
      this.showPasword = false
      const res = await getusers(id)
      console.log(res)
      this.showDolg = true
      this.ruleForm.email = res.data.data.email
      this.ruleForm.username = res.data.data.username
      this.ruleForm.mobile = res.data.data.mobile
      this.id = id
    },
    // 分配角色的回显
    async usersrole (row) {
      this.id = row.id
      this.role_name = row.role_name
      this.ruleForm.username = row.username
      this.showRole = true
    },
    // 分配角色的确定按钮
    async isok () {
      try {
        const res = await usersrole({
          id: this.id,
          rid: this.role
        })
        console.log(res)
        this.$message(res.data.meta.msg)
        this.showRole = false
        this.role = null
      } catch (error) {
        console.log(error)
      }
    },
    // 分配角色的取消按钮
    isnotOK () {
      this.showRole = false
      this.role = null
    }

  },
  computed: {
    ...mapState(['getrolesList'])
  },
  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
