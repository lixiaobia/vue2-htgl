<template>
  <div>
    <el-card class="box-card">
      <el-table :data="getRightList" style="width: 100%" border>
        <el-table-column label="#" width="50" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" min-width="375">
        </el-table-column>
        <el-table-column prop="path" label="路径" min-width="375">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" min-width="375">
          <template slot-scope="{ row }">
            <el-tag :type="tags[row.level].type">{{
              tags[row.level].name
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rightsList } from '@/api/rights'
export default {
  created () {
    this.rightsList()
  },
  data () {
    return {
      getRightList: [],
      tags: [
        { name: '等级一', type: '' },
        { name: '等级二', type: 'success' },
        { name: '等级三', type: 'warning' }
      ]
    }
  },
  methods: {
    async rightsList () {
      const res = await rightsList('list')
      console.log(res)
      this.getRightList = res.data.data
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
