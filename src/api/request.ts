/**
 * @file src/api/request.ts
 * @description Axios统一封装
 * - 创建axios实例，配置baseURL和超时时间
 * - 请求拦截器：统一添加token等请求头
 * - 响应拦截器：统一处理错误码、提取data
 * - 导出通用的 get/post/put/del 方法
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

/** 后端接口统一返回格式 */
interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

/**
 * 创建axios实例
 * baseURL: 接口基础路径（开发环境使用/api前缀，配合vite代理或mock）
 * timeout: 请求超时时间10秒
 */
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

/**
 * 请求拦截器
 * 作用：在每个请求发出前统一处理，如添加token
 * 注意：拦截器中不能使用异步操作阻塞请求
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('[请求拦截器错误]', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 作用：统一处理接口返回结果
 * - 2xx状态码：正常返回data
 * - 其他状态码：弹出错误提示
 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data
    // 业务状态码判断（约定code=0为成功）
    if (res.code !== 0) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return response
  },
  (error) => {
    // HTTP错误状态码处理
    const status = error.response?.status
    const errorMap: Record<number, string> = {
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求地址不存在',
      500: '服务器内部错误'
    }
    const message = errorMap[status] || `请求失败(${status || '网络异常'})`
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * 封装GET请求
 * @param url - 请求地址
 * @param params - URL查询参数
 * @param config - 额外axios配置
 */
export function get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return service.get(url, { params, ...config }).then((res) => res.data)
}

/**
 * 封装POST请求
 * @param url - 请求地址
 * @param data - 请求体数据
 * @param config - 额外axios配置
 */
export function post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return service.post(url, data, config).then((res) => res.data)
}

/**
 * 封装PUT请求
 * @param url - 请求地址
 * @param data - 请求体数据
 */
export function put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return service.put(url, data, config).then((res) => res.data)
}

/**
 * 封装DELETE请求
 * @param url - 请求地址
 * @param params - 查询参数
 */
export function del<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return service.delete(url, { params, ...config }).then((res) => res.data)
}

export default service
