import {
  Middleware,
  RequestExecutor,
  reduceMiddleware,
  middlewareToExecutor,
  NoOpMiddleware,
} from '.'
import {MiddRequestConfig} from './model'
import axios from 'axios'

export const axiosRequestExecutor: RequestExecutor = (
  request: MiddRequestConfig,
) => axios(request)

export const clientFactory = (
  midds: Middleware[],
  executor: RequestExecutor,
) => {
  const reduced: Middleware = midds?.reduce(reduceMiddleware)
  return middlewareToExecutor(reduced, executor)
}

export const axiosClientFactory = (midds?: Middleware[]) =>
  clientFactory(midds ?? [NoOpMiddleware], axiosRequestExecutor)
