<template>
  <div class="navbar">
    <div class="icon" @click="$store.commit('app/TOGGLE_SIDEBAR')">
      <i v-if="$store.state.app.sidebar.opened" class="el-icon-s-fold" />
      <i v-else class="el-icon-s-unfold" />
    </div>
    <div class="info">
      <span>生化狂魔渣渣辉科技有限公司 </span>
      <span class="tip">体验版</span>
    </div>
    <el-dropdown @command="handleCommand">
      <div class="userInfo">
        <img class="avatar" :src="userInfo.staffPhoto" alt="" />
        <span class="name">{{ userInfo.username }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="address">项目地址</el-dropdown-item>
          <el-dropdown-item divided command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'home':
          this.$router.push('/')
          break
        case 'address':
          location.href = 'https://github.com/shkmzzh'
          break
        case 'logout':
          this.$confirm('退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$store.commit('user/removeEvent')
              this.$router.push('/login')
              this.$message({
                type: 'success',
                message: '账号已退出'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              })
            })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  color: #fff;
  height: 50px;
  background-color: #4677fa;
  padding: 0 15px;
  .icon {
    i {
      font-size: 26px;
      cursor: pointer;
    }
  }
  .info {
    flex: 1;
    padding-left: 20px;
    .tip {
      margin-left: 20px;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
    }
  }
  .userInfo {
    display: flex;
    align-items: center;
    img {
      object-fit: cover;
    }
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .name {
      padding: 0 10px;
    }
  }
}
</style>
