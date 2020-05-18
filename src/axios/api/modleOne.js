import base from './base' // 导入默认请求网址接口列表
import axios from '@/axios/http' // 导入http中的axios实例
// import qs from 'qs'

// 创建请求实例 然后就可以在index文件即api接口统一管理出口文件中引入了
const modleOne = {
  // ************** get请求列表 **************

  // 第一个get请求
  firstGetRequest () {
    return axios.get(`${base.book}/book?joson`) // 注意此处是`不是 '
  },

  // ************** post请求列表 **************

  // 第一个post请求
  firstPostRequest (msg) {
    return axios.post(`${base.video}/boring`, msg)
  }
}

// 输出
export default modleOne
