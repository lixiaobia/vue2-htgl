<template>
  <div>
    <!-- 头部搜索 -->
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
    </Card>
    <el-card class="box-card">
      <!-- 数据列表 -->
      <el-table
        :data="ordersdata"
        style="width: 100%"
        :border="true"
        size="mini"
      >
        <el-table-column prop="index" label="#" width="50" type="index">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" min-width="195">
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格(￥/元)"
          min-width="195"
        >
        </el-table-column>
        <el-table-column label="是否付款" min-width="195">
          <template v-slot="{ row }">
            <el-tag :type="row.pay_status === '0' ? 'danger' : 'success'">
              {{ row.pay_status === "0" ? "未付款" : "已付款" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" min-width="195">
        </el-table-column>
        <el-table-column label="下单时间" min-width="195">
          <template slot-scope="{ row }">
            {{ dayjs.unix(row.create_time).format("YYYY-MM-DD") }}</template
          >
        </el-table-column>

        <el-table-column label="操作" min-width="218">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit"
            ></el-button>
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
    </el-card>
    <!-- 修改地址弹出层 -->
    <el-dialog title="提示" :visible.sync="showorders" width="30%">
      <el-cascader :options="cityOptions" :value="city" change-on-select>
      </el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入
import cityOptions from '@/js/city_data2017_element'
import { ordersList } from '@/api/orders'
export default {
  created () {
    this.ordersList()
  },
  data () {
    return {
      showorders: false,
      ordersdata: [],
      input: '', // 查询参数
      pagenum: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: null, // 总数
      cityOptions: cityOptions,
      city: ''
    }
  },
  methods: {
    async ordersList () {
      const res = await ordersList({
        query: this.input, // 查询参数
        pagenum: this.pagenum, // 当前页码
        pagesize: this.pagesize // 每页显示条数
      })
      // console.log(res)
      this.ordersdata = res.data.data.goods
      this.total = res.data.data.total
    },
    // 获取修改的每页条数
    goodsSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.ordersList()
    },
    // 获取当前页数
    goodsCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.ordersList()
    },
    search () {
      this.ordersList()
    },
    edit () {
      this.showorders = true
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
