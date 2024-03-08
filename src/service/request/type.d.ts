import type { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios'

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: AxiosError) => AxiosError
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: AxiosError) => AxiosError
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
  cancelTokenHook?: (c: Canceler) => void
}
