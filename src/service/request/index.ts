import type { AxiosError, AxiosInstance, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'

import axios from 'axios'
import NProgress from 'nprogress'

const DEFAULT_LOADING = false
class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  showLoading: boolean

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    )

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        this.showLoading && NProgress.start()
        return config
      },
      (err: AxiosError) => {
        return err
      },
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        this.showLoading && NProgress.done()
        const data = res.data
        return data
      },
      (err: AxiosError) => {
        if (err.code !== 'ERR_CANCELED')
          this.showLoading && NProgress.done()

        if (err.response?.status === 404)
          console.log('request 404')

        throw err.response?.data
      },
    )
  }

  async request<T = any>(config: RequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestInterceptor)
      config = config.interceptors.requestInterceptor(<InternalAxiosRequestConfig>config)

    if (config.cancelTokenHook) {
      config.cancelToken = new axios.CancelToken((c: Canceler) => {
        config.cancelTokenHook?.(c)
      })
    }
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    try {
      let res: T = await this.instance.request<any, T>(config)
      if (config.interceptors?.responseInterceptor)
        res = config.interceptors.responseInterceptor(res)

      return res
    }
    catch (err: any) {
      return Promise.reject(err)
    }
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
