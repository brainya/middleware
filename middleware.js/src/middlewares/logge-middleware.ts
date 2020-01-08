import {Middleware, MiddRequest, RequestExecutor} from '~/model'

export const loggerMiddleware: Middleware = async (
  request: MiddRequest,
  executor: RequestExecutor,
) => {
  console.log(`executing request ${JSON.stringify(request)}`)
  try {
    const result = await executor((request))
    const {status, data, headers} = result
    console.log(`request successfully executed ${JSON.stringify({status, data, headers})}`)
    return result
  } catch (error) {
    console.error(`error while executing request`, error)
    throw error
  }
}
