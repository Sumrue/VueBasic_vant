import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  token: ''
}

const store = new vuex.Store({
  state
})

export default store
