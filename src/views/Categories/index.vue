<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <Card>
      <template #button>
        <el-button type="primary" @click="addcategories = true"
          >添加分类</el-button
        >
      </template>
    </Card>
    <el-card>
      <el-alert
        title="食物分类的id是1985，服装的id1988 ，电器的id1990"
        type="info"
        :closable="false"
      >
      </el-alert>
      <el-table
        :data="getcategList"
        style="width: 100%"
        border
        size="mini"
        row-key="cat_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column label="#" width="50" type="index"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" min-width="292">
        </el-table-column>
        <el-table-column prop="goods_name" label="是否有效" min-width="292">
          <template>
            <i class="el-icon-success" style="color: green"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序" min-width="292">
          <template slot-scope="{ row }">
            <el-tag :type="tags[row.cat_level].type">{{
              tags[row.cat_level].name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="292">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="edit(row.cat_id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteCategorie(row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="goodsSizeChange"
        @current-change="goodsCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 4, 6, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 修改分类弹出框 -->
      <el-dialog title="编辑分类" :visible.sync="showcategories" width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="form.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="isok">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加分类弹出框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addcategories"
        width="40%"
        @close="cancel"
      >
        <el-form
          ref="form"
          :model="addform"
          :rules="addrules"
          label-width="100px"
        >
          <el-form-item label="分类上级id" prop="cat_pid">
            <el-input
              v-model.number="addform.cat_pid"
              placeholder="如果要添加 1 级分类，则父分类 Id 应该设置为 0"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addform.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="分类层级id" prop="cat_level">
            <el-input
              v-model.number="addform.cat_level"
              placeholder=" 0表示一级分类；1表示二级分类；2表示三级分类"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="issure">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { categories, deleteCategorie, updateCategorie, editCategorie, addCategorie } from '@/api/categories'
export default {
  created () {
    this.categories()
  },
  data () {
    return {
      form: {
        cat_name: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      },
      id: null,
      showcategories: false, // 修改分类
      getcategList: [],
      pagenum: 1, // 当前页码
      pagesize: 6, // 每页显示条数
      total: null,
      tags: [
        { name: '一级', type: '' },
        { name: '二级', type: 'success' },
        { name: '三级', type: 'warning' }
      ],
      addcategories: false, // 添加分类
      addform: {
        cat_pid: null,
        cat_name: '',
        cat_level: null
      },
      addrules: {
        cat_pid: [{ required: true, message: '分类父级ID补不能为空', trigger: 'blur' }
        ],
        cat_name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        cat_level: [{ required: true, message: '分类层级不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    async categories () {
      const res = await categories({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // console.log(res)
      this.total = res.data.data.total
      this.getcategList = res.data.data.result
    },
    // 获取修改的每页条数
    goodsSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    // 获取当前页数
    goodsCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
    },
    // 删除
    // 删除员工
    async deleteCategorie (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用接口
        // 提示消息
        // 重新获取数据渲染页面
        const res = await deleteCategorie(id)
        if (res.data.meta.status === 200) {
          this.categories()
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
    async edit (id) {
      const res = await updateCategorie(id)
      // console.log(res)
      this.form = res.data.data
      this.id = res.data.data.cat_id
      this.showcategories = true
    },
    async isok () {
      try {
        const res = await editCategorie({
          id: this.id,
          catname: this.form.cat_name
        })
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('更新成功')
          this.showcategories = false
          this.categories()
        }
      } catch (error) {
        this.$message.error('更新失败')
      }
    },

    //  添加分类
    async issure () {
      try {
        await this.$refs.form.validate()
        const res = await addCategorie(this.addform)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('添加成功')
          this.addcategories = false
          this.categories()
        }
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    cancel () {
      this.addcategories = false
      this.$refs.form.resetFields()
      this.addform = {
        cat_pid: null,
        cat_name: '',
        cat_level: null
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
