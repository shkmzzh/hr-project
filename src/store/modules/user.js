import { sysLogin, sysProfile, sysUser } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    setUserToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    removeEvent(state) {
      state.userInfo = ''
      state.token = ''
    }
  },
  actions: {
    // 登录
    async toLogin({ commit }, val) {
      const res = await sysLogin(val)
      console.log(res)
      commit('setUserToken', res.data)
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      // 员工资料
      const res = await sysProfile()
      // 员工基本信息
      const res2 = await sysUser(res.data.userId)
      commit('setUserInfo', { ...res.data, ...res2.data })
    }
  }
}
