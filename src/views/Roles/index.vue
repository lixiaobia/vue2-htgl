<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部 -->
    <Card>
      <template #button>
        <el-button type="primary" @click="add">添加角色</el-button>
      </template>
    </Card>
    <!-- 主体 -->
    <el-card class="box-card">
      <el-table :data="getrolesList" style="width: 100%" border>
        <el-table-column label="#" width="50" type="expand">
          <template slot-scope="{ row }">
            <!-- 第一行 -->
            <el-row
              class="oneRow"
              type="flex"
              justify="center"
              align="middle"
              v-for="item in row.children"
              :key="item.id"
            >
              <!-- 第一列 -->
              <el-col :span="8">
                <el-tag effect="light">{{ item.authName }} </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第二列 -->
              <el-col :span="14">
                <!-- 第二列下面的行 -->
                <el-row
                  type="flex"
                  justify="center"
                  align="middle"
                  v-for="item1 in item.children"
                  :key="item1.id"
                  class="twoRow"
                >
                  <!-- 行里面的第一列 -->
                  <el-col :span="4">
                    <el-tag effect="light">{{ item1.authName }} </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 行里面的第二列 -->
                  <el-col :span="20">
                    <el-tag
                      class="twoCol"
                      @close="delet(row.id, item2.id)"
                      closable
                      effect="dark"
                      v-for="item2 in item1.children"
                      :key="item2.id"
                    >
                      {{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" width="50" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="375">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色名描述" min-width="375">
        </el-table-column>
        <el-table-column label="操作" min-width="375">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="updateRoles(row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              circle
              @click="bution(row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteRoles(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色弹出层 -->
    <el-dialog
      :title="showeditRoles ? '添加角色' : '修改角色'"
      :visible.sync="showaddRoles"
      @close="cancel"
      width="30%"
    >
      <el-form
        :model="rolesForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限弹出框 -->
    <el-dialog title="分配权限" :visible.sync="showdistribution" width="30%">
      <el-tree
        default-expand-all
        :data="addRolesList"
        :props="defaultProps"
        show-checkbox
        @check-change="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isnotOk">取 消</el-button>
        <el-button type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoles, deleteRoles, updateRoles, editRoles, rightsRoles, deletePermissions } from '@/api/roles'
import { rightsList } from '@/api/rights'
import { mapActions, mapState } from 'vuex'
export default {
  created () {
    this.rolesList()
  },
  data () {
    return {
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      showaddRoles: false, // 添加角色弹出层
      showeditRoles: false, // 用来判断是否是修改
      id: null, // 编辑用户需要的ID   角色id
      showdistribution: false, // 分配权限
      rolesForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ message: '请输入角色描述', trigger: 'blur' }]
      },
      addRolesList: [], // 树形结构列表
      permissionList: [], // 权限列表
      rids: ''
    }
  },
  methods: {
    // 获取角色列表
    ...mapActions(['rolesList']),
    add () {
      this.showaddRoles = true
      this.showeditRoles = false
    },
    // 删除标签(角色权限)
    async delet (roleId, rightId) {
      try {
        // console.log(roleId, rightId)
        const res = await deletePermissions({ roleId, rightId })
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('取消权限成功')
          // this.rolesList()
        }
      } catch (error) {
        console.log(error)
        this.$message.success('取消权限失败')
      }
    },
    // 添加角色弹出层确定
    async determine () {
      if (this.showeditRoles) {
        // 如果为true说明是修改角色信息
        try {
          await this.$refs.ruleForm.validate()
          const res = await editRoles({
            id: this.id,
            roleName: this.rolesForm.roleName,
            roleDesc: this.rolesForm.roleDesc
          })
          // console.log(res)
          if (res.data.meta.success === 200) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await this.$refs.ruleForm.validate()
          const res = await addRoles(this.rolesForm)
          // console.log(res)
          if (res.data.meta.success === 200) {
            this.rolesList()
            this.showaddRoles = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        } catch (error) {
          console.log(error)
          this.$message.error('添加失败')
        }
      }
    },
    // 添加角色弹出层取消
    cancel () {
      // 关闭弹窗  还原表单 清除验证
      this.showaddRoles = false
      this.$refs.ruleForm.resetFields()
      this.rolesForm = {
        roleName: '',
        roleDesc: ''
      }
    },
    // 删除角色
    async deleteRoles (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用接口
        // 提示消息
        // 重新获取数据渲染页面
        const res = await deleteRoles(id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolesList()
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
    // 获取角色信息
    async updateRoles (id) {
      this.id = id
      this.showeditRoles = true// 说明是修改
      const res = await updateRoles(id)
      console.log(res)
      this.rolesForm.roleName = res.data.data.roleName
      this.rolesForm.roleDesc = res.data.data.roleDesc
      // 先渲染再弹出框
      this.showaddRoles = true
    },
    // 给角色分配权限
    async bution (id) {
      this.id = id
      this.showdistribution = true
      const res = await rightsList('tree')
      // console.log(res)
      this.addRolesList = res.data.data
    },
    // 节点点击时的回调
    handleNodeClick (val, node, item) {
      // console.log(val)
      let arr = []
      this.permissionList.push(val)
      this.permissionList.forEach(item => {
        // return item.id
        arr.push(item.id)
      })
      arr = arr.join(',')
      console.log(typeof (arr))
      this.rids = arr
    },
    // 给角色分配权限确定按钮
    async isOk () {
      try {
        const res = await rightsRoles({
          roleId: this.id,
          rids: this.rids
        })
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('更新成功')
          this.showdistribution = false
        } else {
          this.$message.error('更新失败')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 给角色分配权限取消按钮
    isnotOk () {
      this.showdistribution = false
    }

  },
  computed: {
    // 角色列表数据
    ...mapState(['getrolesList'])
  },
  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 15px;
}
.oneRow,
.twoRow {
  padding-bottom: 5px;
}
.twoRow {
  border-bottom: 1px solid #ccc;
}
.twoCol {
  margin: 2px 5px;
}
</style>
