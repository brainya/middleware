import {Middleware, MiddRequest, RequestExecutor} from '~/model'

export type RateLimiterConfig = {}

export function rateLimiterMiddleware(
  rateLimiterConfig: RateLimiterConfig,
): Middleware {
  return (request: MiddRequest, executor: RequestExecutor) => {
    return executor(request)
  }
}
