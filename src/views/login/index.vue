<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item>
        <div class="img">
          <img src="@/assets/common/login-logo.png" alt="IHMR后台管理系统" />
        </div>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input prefix-icon="el-icon-user-solid" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="form.password" :type="show ? 'password' : 'text'">
          <template slot="suffix">
            <svg-icon @click="show = !show" :icon-class="show ? 'eye' : 'eye-open'"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="submit" v-loading="loading">登录</el-button>
      </el-form-item>
      <el-form-item>
        <p>还没有账号?找管理员要去注册不了！</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      show: true,
      form: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (result) => {
        if (result) {
          this.loading = true
          // 考虑到登录接口可能多个页面要用到，所以放到vuex中管理
          // const res = await sysLogin(this.form)
          // this.$store.commit('user/setUserToken', res.data)
          console.log(1)
          try {
            await this.$store.dispatch('user/toLogin', this.form)
            console.log(2)
            this.$message.success('登录成功')
            this.$router.push('/dashboard')
          } catch (error) {
            this.loading = false
            this.$message.error('失败')
            console.log(error)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-image: url('~@/assets/common/login.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 100%;
    height: 60px;
    background-color: #417ffe;
    font-size: 22px;
  }
  ::v-deep .el-input__inner {
    height: 45px;
  }
  p {
    color: #fff;
    text-align: center;
  }
}
</style>
