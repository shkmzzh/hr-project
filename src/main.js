import Vue from 'vue'

import 'normalize.css/normalize.css' // 抹平浏览器差异  line-height // 1:安装   yarn add normalize.css   2:导入 import 'normalize.css'

// 移动端：按需要导入  pc:全局导入/按需要导入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' //  全局 css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' //  导入icon
import '@/permission' // 导入守卫

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 生产环境使用mock
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
