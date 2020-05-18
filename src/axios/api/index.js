/**
 * api接口的统一出口
 * 可以多个模块进行接入，方便多人开发
 */
// 文章模块接口
import modleOne from '@/axios/api/modleOne'
// 其他模块的接口……

// 导出接口
export default {
  modleOne
}
