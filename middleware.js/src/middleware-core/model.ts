export interface MiddTransformer {
  (data: any, headers?: any): any
}

export interface MiddAdapter {
  (config: MiddRequestConfig): MiddPromise<any>
}

export interface MiddBasicCredentials {
  username: string
  password: string
}

export interface MiddProxyConfig {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
  protocol?: string
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export type MiddResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export interface MiddRequestConfig {
  url?: string
  method?: Method
  baseURL?: string
  transformRequest?: MiddTransformer | MiddTransformer[]
  transformResponse?: MiddTransformer | MiddTransformer[]
  headers?: any
  params?: any
  paramsSerializer?: (params: any) => string
  data?: any
  timeout?: number
  withCredentials?: boolean
  adapter?: MiddAdapter
  auth?: MiddBasicCredentials
  responseType?: MiddResponseType
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: any) => void
  onDownloadProgress?: (progressEvent: any) => void
  maxContentLength?: number
  validateStatus?: (status: number) => boolean
  maxRedirects?: number
  socketPath?: string | null
  httpAgent?: any
  httpsAgent?: any
  proxy?: MiddProxyConfig | false
  cancelToken?: CancelToken
}

export interface MiddResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: MiddRequestConfig
  request?: any
}

export interface MiddError<T = any> extends Error {
  config: MiddRequestConfig
  code?: string
  request?: any
  response?: MiddResponse<T>
  isMiddError: boolean
}

export interface MiddPromise<T = any> extends Promise<MiddResponse<T>> {}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface Cancel {
  message: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken
  source(): CancelTokenSource
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
