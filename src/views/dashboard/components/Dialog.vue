<template>
  <el-dialog title="你又迟到了 ， 扣你三天工资！！！" :visible.sync="isShow" center>
    <img src="https://zzh-1313186768.cos.ap-guangzhou.myqcloud.com/shkmzzh/Snipaste_2023-01-18_01-31-46.png" />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  img {
    width: 100%;
  }
}
</style>
