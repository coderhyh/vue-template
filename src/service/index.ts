// service统一出口
import Request from './request'

const Request1 = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = '123'
      if (token)
        config.headers.set('Authorization', `Bearer ${token}`)

      return config
    },
  },
  timeout: 10000,
})

export default Request1
