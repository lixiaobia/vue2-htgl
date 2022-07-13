<template>
  <div class="login_container">
    <div class="form_box">
      <el-form :model="loginForm" :rules="rules" ref="loginFromRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn_item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    // 重置
    reset () {
      this.$refs.loginFromRef.resetFields()
    },
    // 登录
    async login () {
      try {
        // 先进行二次校验
        await this.$refs.loginFromRef.validate()
        try {
          // 调用接口
          const res = await login(this.loginForm)
          // console.log(res)
          // 把token持久化
          this.setToken(res.data.data.token)
          this.$router.push('/home')
          // 提示
          this.$message.success('登录成功')
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
        this.$message.error('登录失败')
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
.login_container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 70px 15px 0;
    .btn_item {
      text-align: right;
    }
  }
}
</style>
