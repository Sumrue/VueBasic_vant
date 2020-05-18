import axios from 'axios'
import router from '../router'
import store from '../store'
import { Toast } from 'vant'

/**
 * 这里时提前封装好的提示函数，后面需要时可以加入参数后直接调用
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({ // 用的是Vant的提示组件
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 封装的跳转登录页的函数
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 封装定义请求失败或出错时，不是200时的状态处理，方便后面状态拦截器直接使用
 * status 请求失败的状态码
 * 判断返回的状态码，状态码的返回要与后台人员对接好，不同状态码的代表不同的返回信息
 */
const errorHandle = (status, other) => {
  switch (status) {
    // 401: 未登录 ，跳转至登录页。
    case 401:
      toLogin() // 当返回未登录状态即401时，调用之前封装好的去登录页的函数
      break
    // 404：请求资源不存在
    case 404:
      tip('您请求的资源不存在')
      break
    // 403: token失效，需要清除token并且跳转至登录页
    case 403:
      tip('您的登录信息已过期，请重新登录')
      localStorage.removeItem('token') // 清除 localStorage 中的token信息
      store.commit('loginSuccess', null) // 清空存在vuex中的token信息
      // 清空信息，1S后跳转之登录页
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 其他的错误情况
    default:
      Toast({
        message: '未知错误，请联系管理员',
        duration: 1000,
        forbidClick: true
      })
  }
}

// 创建axios实例
var instance = axios.create({timeout: 10000}) // 请求超时时长

// 设置post默认请求消息头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  // 发送请求前，需要做些什么
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    const token = store.state.token // 定义在vuex中的token
    token && (config.headers.Authorization = token) // 如果vuex中和消息头中都存在token
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功时 ,即响应为200时
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败，不是200时的情况
  error => {
    const { response } = error
    if (response) {
      // 下面就用到了，上面封装好的状态请求处理的方法 errorHandle
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        Toast({
          message: '网络好像出错了，哇咔咔',
          duration: 5000,
          forbidClick: true
        })
      } else {
        return Promise.reject(error)
      }
    }
  }
)

// 输出
export default instance
