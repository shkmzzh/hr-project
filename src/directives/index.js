import Vue from 'vue'
const directiveObj = {
  imgerr: {
    inserted(dom, obj) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
      dom.onerror = () => {
        dom.src = obj.value || require('@/assets/common/head.jpg')
      }
    },
    componentUpdated(dom, obj) {
      dom.src = dom.src || obj.value || require('@/assets/common/head.jpg')
    }
  }
}
// 统一挂载到全局
for (let [key, value] of Object.entries(directiveObj)) {
  Vue.directive(key, value)
}
