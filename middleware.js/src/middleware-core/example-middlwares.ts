import {Middleware, RequestExecutor} from '.'
import {MiddRequestConfig, MiddError} from './model'

export const middleware1: Middleware = (
  request: MiddRequestConfig,
  executor: RequestExecutor,
) => {
  console.log('number 1 executed')
  request.headers = {
    ...request.headers,
    'some-new-header': 'headers-value',
  }
  return executor(request)
}

export const loggerMiddleware: Middleware = async (
  request: MiddRequestConfig,
  executor: RequestExecutor,
) => {
  console.log('number 2 executed')

  try {
    console.log(JSON.stringify(request))
    const response = await executor(request)
    console.log(JSON.stringify(response.data))
    return response
  } catch (error) {
    const middError = error as MiddError
    console.log(JSON.stringify(middError))
    throw error
  }
}
