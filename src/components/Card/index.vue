<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="6">
          <slot name="header"></slot>
        </el-col>
        <el-col :span="2" :offset="1">
          <slot name="button"></slot>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
