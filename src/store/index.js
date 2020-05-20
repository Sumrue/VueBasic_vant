import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  token: '',
  fullPath: '/'
}

const mutation = {
  // 路由导航的方法
  ChangeFullPath (state, msg) {
    state.fullPath = msg
  }
}

const store = new vuex.Store({
  state
})

export default store
