// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// import { message } from 'ant-design-vue'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 6000, // 定义5秒超时
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // message.error(error.message)
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
