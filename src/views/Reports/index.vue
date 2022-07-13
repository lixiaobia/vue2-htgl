<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 雷达图  图标必须给个宽和高-->
      <div ref="myDiv" class="radar-echart" />
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { reportsType } from '@/api/reports'
export default {
  created () {

  },
  data () {
    return {
      legend: {},
      series: [],
      xAxis: [],
      yAxis: []
    }
  },
  methods: {
    initChart () {
      console.log(this.xAxis[0].data)
      const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
      myChart.setOption({
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: this.legend,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis[0].data
        },
        yAxis: this.yAxis,
        series: this.series
      })
    }
  },
  async mounted () {
    const res = await reportsType()
    console.log(res)
    this.legend = res.data.data.legend
    this.series = res.data.data.series
    this.xAxis = res.data.data.xAxis
    this.yAxis = res.data.data.yAxis
    this.$nextTick(() => {
      this.initChart()
    })
  }
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 15px;
}
.radar-echart {
  width: 100%;
  height: 400px;
}
</style>
