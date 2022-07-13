<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12">
          <el-image
            style="width: 65px; height: 60px"
            src="data:image/png;base64,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"
            fit="contain"
          ></el-image>
          <span class="grid-content bg-purple-dark"
            >ERP后台管理系统</span
          ></el-col
        >
        <el-col :span="2">
          <!-- <el-button type="primary" @click="outLogin">退出</el-button> -->
          <el-popconfirm title="确定退出么？" @confirm="outLogin">
            <el-button slot="reference">退出</el-button>
          </el-popconfirm>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px" class="gd" :class="{ asidesmoll: isCollapse }">
        <el-button
          class="gd"
          style="width: 64px; margin-top: 10px"
          @click="isCollapse = false"
          v-if="isCollapse"
          >展开</el-button
        >
        <el-button
          class="gd"
          type="primary"
          @click="isCollapse = true"
          v-else
          style="width: 200px; margin-top: 10px"
          >收起</el-button
        >
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
        >
          <el-submenu
            :index="item.id.toString()"
            v-for="(item, index) in menusList"
            :key="item.id"
          >
            <template #title
              ><i :class="'el-icon-' + icon[index]"></i>
              <span slot="title">{{ item.authName }} </span>
            </template>
            <el-menu-item
              :index="item1.id.toString()"
              v-for="item1 in item.children"
              :key="item1.id"
            >
              <i class="el-icon-menu"></i>
              <span slot="title" @click="$router.push(item1.path)"
                >{{ item1.authName }}
              </span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  created () {
    this.menus()
  },
  data () {
    return {
      menusList: [],
      icon: ['user', 'crop', 'goods', 'tickets', 'monitor'],
      isCollapse: true
    }
  },
  methods: {
    ...mapMutations(['removeToken']),
    // 退出登录
    outLogin () {
      // console.log(111)
      // 清除token
      this.removeToken()
      // 跳转到登录页
      this.$router.push('/login')
      // 提示
      this.$message.success('退出成功')
    },
    // 左侧菜单权限
    async menus () {
      const res = await menus()
      // console.log(res)
      this.menusList = res.data.data
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.asidesmoll {
  width: 64px !important;
}
.gd {
  transition: all 1s;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
  .el-image {
    vertical-align: middle;
    border-radius: 18px;
  }
}
.grid-content {
  color: #fff;
  font-size: 22px;
  margin-left: 10px;
}
</style>
