// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 添加全局组件
import Components from '@C'
// Element-UI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入echart
import echarts from 'echarts'
Vue.use(ElementUI)

Vue.use(Components)
// 全局插件
Vue.use({
  install (Vue) {
    // 路由跳转方法
    Vue.prototype.$toPage = function (val, obj) {
      let self = this
      if (typeof val === 'object') {
        obj = val
        val = self.$router.path
      }
      setTimeout(function () {
        self.$router.push({
          path: val,
          query: obj || {}
        })
      }, 0)
    }
    // echart
    Vue.prototype.$echarts = echarts
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
