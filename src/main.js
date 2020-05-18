import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './axios/api' // 引入封装好的axiosAPI接口
import '@/assets/css/rest.css' // 样式重置
import '@/assets/plugins/vant' // vant 按需引入文件夹
import MetaInfo from 'vue-meta-info' // 全局配置TDK

Vue.use(MetaInfo)

Vue.prototype.$api = api // 将封装好的axios的api挂载到原型
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
