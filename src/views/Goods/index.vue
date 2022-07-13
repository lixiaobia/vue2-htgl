<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
        <el-button type="primary" @click="$router.push('/add')"
          >添加商品</el-button
        >
      </template>
    </Card>
    <!-- 主体 -->
    <el-card>
      <el-table :data="getgoodsList" style="width: 100%" border size="mini">
        <el-table-column label="#" width="50" type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="600">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          min-width="127"
        >
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" min-width="127">
        </el-table-column>
        <el-table-column label="创建时间" min-width="127">
          <template slot-scope="{ row }">
            {{ dayjs.unix(row.upd_time).format("YYYY-MM-DD") }}</template
          >
        </el-table-column>
        <el-table-column prop="level" label="操作" min-width="190">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="edit(row.goods_id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteGood(row.goods_id)"
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
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="dialoggoods" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="ruleForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="goods_price">
            <el-input v-model="ruleForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="goods_number">
            <el-input v-model="ruleForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="goods_weight">
            <el-input v-model="ruleForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="goods_introduce">
            <el-input v-model="ruleForm.goods_introduce"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="center">取 消</el-button>
          <el-button type="primary" @click="onsure">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { goodsList, deleteGood, getGoods, editGood } from '@/api/goods'
//
export default {
  created () {
    this.goodsList()
  },
  data () {
    return {
      input: '',
      getgoodsList: [],
      query: '', // 查询参数
      pagenum: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: null, // 总数
      ruleForm: {
        id: null,
        goods_name: '',
        goods_price: null,
        goods_number: null,
        goods_weight: null,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '价格不能为空', trigger: 'blur' }],
        goods_number: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '重量不能为空', trigger: 'blur' }]

      },
      dialoggoods: false //

    }
  },
  methods: {

    // 获取商品数据列表
    async goodsList () {
      const res = await goodsList({
        query: this.input,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // console.log(res)
      this.getgoodsList = res.data.data.goods
      this.total = res.data.data.total
    },
    // 获取修改的每页条数
    goodsSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.goodsList()
    },
    // 获取当前页数
    goodsCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.goodsList()
    },
    // 搜索
    search () {
      this.goodsList()
    },
    // 修改
    async edit (id) {
      const res = await getGoods(id)
      // console.log(res)
      this.ruleForm = res.data.data
      this.ruleForm.id = id
      this.dialoggoods = true
    },
    // 确定修改
    async onsure () {
      try {
        await this.$refs.ruleForm.validate()
        const res = await editGood(this.ruleForm)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('修改成功')
          this.dialoggoods = false
        }
      } catch (error) {
        this.$message.error('修改失败')
      }
    },
    // 取消修改
    center () {
      this.dialoggoods = false
      this.ruleForm = {
        id: null,
        goods_name: '',
        goods_price: null,
        goods_number: null,
        goods_weight: null,
        goods_introduce: '',
        pics: [],
        attrs: []
      }
      this.$refs.ruleForm.resetFields()
    },
    // 删除
    async deleteGood (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteGood(id)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.goodsList()
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
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
