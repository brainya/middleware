import {Middleware, RequestExecutor, NoOpMiddleware, clientFactory} from './middleware'
import {MiddRequestConfig} from './model'
import axios from 'axios'

export const axiosRequestExecutor: RequestExecutor = (
  request: MiddRequestConfig,
) => axios(request)

export const axiosClientFactory = (midds?: Middleware[]) =>
  clientFactory(midds ?? [NoOpMiddleware], axiosRequestExecutor)
