
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入发起网络请求的包
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$http = $http
$http.baseUrl = 'https://api-ugo-web.itheima.net'

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '加载中...'
  })
}
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装弹窗
uni.$showMsg = function(title="网络有延迟，请稍后重试", duraction = 1500) {
  uni.showToast({
    title,
    duraction,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif