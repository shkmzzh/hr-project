import router from './router'
import store from './store'
const pageList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (to.path.toLowerCase() == '/login') {
      next('/')
    } else {
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (pageList.includes(to.path.toLowerCase())) {
      next()
    } else {
      next('/login')
    }
  }
})
