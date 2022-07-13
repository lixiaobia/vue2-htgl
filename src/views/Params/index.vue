<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片面板 -->
    <el-card>
      <!-- 提示 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- 选择 -->
      <div class="goods">
        选择商品分类：
        <el-cascader
          @change="getCheckedNodes"
          v-model="cat_id"
          :leaf="true"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
          }"
        >
        </el-cascader>
      </div>
      <el-tabs v-model="sel" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="success" size="small">添加参数</el-button>
          <el-table border :data="listjintai">
            <el-table-column
              width="50"
              label=""
              type="expand"
            ></el-table-column>
            <el-table-column
              width="50"
              label="#"
              type="index"
            ></el-table-column>
            <el-table-column
              label="分类名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作" prop="date">
              <template>
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="success" size="small">添加属性</el-button>
          <el-table border :data="list">
            <el-table-column width="50" type="expand"></el-table-column>
            <el-table-column
              width="50"
              label="#"
              type="index"
            ></el-table-column>
            <el-table-column
              label="分类名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作" prop="date">
              <template>
                <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { categories } from '@/api/categories'// 商品分类接口
import { categoriesList } from '@/api/params'
export default {
  created () {
    this.categories()
    // console.log(this.options)
  },
  data () {
    return {
      cat_id: [],
      options: [], // 分类商品数据
      id: null,
      sel: 'many',
      list: [], // 动态参数
      listjintai: [] // 静态属性
    }
  },
  methods: {
    // 获取商品分类
    async categories () {
      const res = await categories()
      // console.log(res)
      this.options = res.data.data
    },
    // 获取数据
    async categoriesList () {
      const res = await categoriesList({
        id: this.id,
        sel: this.sel
      })
      // console.log(res)
      if (this.sel === 'only') {
        this.list = res.data.data
      } else {
        this.listjintai = res.data.data
      }
    },
    handleClick (val) {
      console.log(val.name)
      this.sel = val.name
      this.categoriesList()
    },
    getCheckedNodes () {
      this.id = this.cat_id[this.cat_id.length - 1]
      console.log(this.id)
      this.categoriesList()
    }
  },
  computed: {
    // ...mapState(['options'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
.goods {
  margin: 15px 0;
}
.el-table {
  margin: 15px 0;
}
</style>
