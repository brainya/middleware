import {MiddResponse, MiddRequestConfig} from './model'

export type RequestExecutor = (
  request: MiddRequestConfig,
) => Promise<MiddResponse>

export type Middleware = (
  request: MiddRequestConfig,
  executor: RequestExecutor,
) => Promise<MiddResponse>

export const NoOpMiddleware: Middleware = (
  request: MiddRequestConfig,
  executor: RequestExecutor,
) => executor(request)

export function reduceMiddleware(
  middleware1: Middleware,
  middleware2: Middleware,
): Middleware {
  return (request: MiddRequestConfig, executor: RequestExecutor) =>
    middleware1(request, middlewareToExecutor(middleware2, executor))
}

export function middlewareToExecutor(
  middleware: Middleware,
  executor: RequestExecutor,
): RequestExecutor {
  return (request: MiddRequestConfig) => middleware(request, executor)
}

export const clientFactory = (
  midds: Middleware[],
  executor: RequestExecutor,
) => {
  const reduced: Middleware = midds?.reduce(reduceMiddleware)
  return middlewareToExecutor(reduced, executor)
}

