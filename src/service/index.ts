// service统一出口
import Request from './request'

const Request1 = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = '123'
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default Request1
