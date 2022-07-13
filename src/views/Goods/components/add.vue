<template>
  <el-card class="box-card">
    <!-- 状态栏 -->
    <el-steps :active="active" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-tabs @tab-click="changes" tab-position="left">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息">
        <el-form
          :model="addruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addruleForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addruleForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addruleForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addruleForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="cat_id"
              :options="options"
              :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
              }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 8, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="addruleForm.goods_introduce"
        >
        </el-input>
        <el-button type="primary">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { addgoodsList } from '@/api/goods'// 添加商品
import { categories } from '@/api/categories'// 商品分类接口
export default {
  created () {
    this.categories()
  },
  data () {
    return {
      fileList: [],
      cat_id: [],
      active: 0,
      addruleForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: []

      },
      rules: {
        goods_name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '商品重量不能为空', trigger: 'blur' }],
        goods_number: [{ required: true, message: '商品数量不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '商品数量不能为空', trigger: 'blur' }]
      },
      options: []// 分类商品数据
    }
  },
  methods: {
    // 获取商品分类
    async categories () {
      const res = await categories()
      // console.log(res)
      this.options = res.data.data
    },
    // 添加商品
    async addgoodsList () {
      await addgoodsList(this.addruleForm)
      // console.log(res)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      // console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    changes (el) {
      // console.log(el.index * 1)
      // 字符串*1就是数字型
      this.active = el.index * 1
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.el-steps {
  margin-bottom: 20px;
}
</style>
