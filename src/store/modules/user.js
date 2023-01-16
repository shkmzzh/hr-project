import { sysLogin } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setUserToken(state, val) {
      state.token = val
    }
  },
  actions: {
    async toLogin({ commit }, val) {
      const res = await sysLogin(val)
      console.log(res)
      commit('setUserToken', res.data)
    }
  }
}
