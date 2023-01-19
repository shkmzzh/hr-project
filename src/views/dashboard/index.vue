<template>
  <div class="dashboard">
    <el-card>
      <div class="tip">
        <div class="left">
          <div class="pic">
            <img v-imgerr :src="userInfo.staffPhoto" alt=""/>
          </div>
          <div class="info">
            <div class="upper">
              <span>{{ setTime }} ，</span>
              <span>{{ userInfo.username }} ，</span>
              <span>祝您开心每一天 !</span>
            </div>
            <div class="lower">
              <span>{{ userInfo.username }}</span>
              <span> | 狂魔科技 - </span>
              <span>{{ userInfo.departmentName }}</span>
            </div>
          </div>
        </div>
        <el-button type="primary" plain class="el-icon-date" @click="getClock"> 打卡</el-button>
      </div>
    </el-card>
    <br />
    <el-card>
      <el-calendar v-model="time"> </el-calendar>
    </el-card>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Dialog from '@/views/dashboard/components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      hour: '',
      time: new Date()
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    setTime() {
      if (this.hour >= 0 && this.hour < 9) return '早上好'
      if (this.hour >= 9 && this.hour < 11) return '上午好'
      if (this.hour >= 11 && this.hour < 14) return '中午好'
      if (this.hour >= 14 && this.hour < 18) return '下午好'
      if (this.hour >= 18 && this.hour < 24) return '晚上好'
    }
  },
  created() {
    this.hour = new Date().getHours()
  },
  methods: {
    getClock() {
      this.$refs.dialog.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 15px;
  .tip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
    .pic {
      width: 125px;
      height: 125px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .info {
      padding-left: 35px;
      .upper {
        font-size: 25px;
      }
      .lower {
        padding-top: 10px;
        font-size: 20px;
        color: #7f8c8d;
      }
    }
    ::v-deep .el-button {
      width: 150px;
      margin-right: 20px;
    }
  }
}
</style>
