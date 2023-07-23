import type { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: AxiosError) => AxiosError
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: AxiosError) => AxiosError
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig<T> {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
  cancelTokenHook?: (c: Canceler) => void
}
