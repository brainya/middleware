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

export interface MiddRequest {
  url?: string
  method?: Method
  baseURL?: string
  headers?: any
  params?: any
  paramsSerializer?: (params: any) => string
  data?: any
  timeout?: number
  withCredentials?: boolean
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
  attributes?:{
    requestId?: string | number
  }
}

export interface MiddResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: MiddRequest
  request?: any
  attributes?:{
    requestId?: string | number
  }
}

export interface MiddError<T = any> extends Error {
  config: MiddRequest
  code?: string
  request?: any
  response?: MiddResponse<T>
  isClientError: boolean
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

export type RequestExecutor = (request: MiddRequest) => Promise<MiddResponse>

export type Middleware = (
  request: MiddRequest,
  executor: RequestExecutor,
) => Promise<MiddResponse>

export const NoOpMiddleware: Middleware = (
  request: MiddRequest,
  executor: RequestExecutor,
) => executor(request)

export function reduceMiddleware(
  middleware1: Middleware,
  middleware2: Middleware,
): Middleware {
  return (request: MiddRequest, executor: RequestExecutor) =>
    middleware1(request, middlewareToExecutor(middleware2, executor))
}

export function middlewareToExecutor(
  middleware: Middleware,
  executor: RequestExecutor,
): RequestExecutor {
  return (request: MiddRequest) => middleware(request, executor)
}

export const createRequestExecutor = (
  midds: Middleware[],
  executor: RequestExecutor,
) => {
  const reduced: Middleware = midds?.reduce(reduceMiddleware)
  return middlewareToExecutor(reduced, executor)
}
