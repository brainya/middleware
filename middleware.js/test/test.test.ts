import 'jest'
import {axiosClientFactory} from '~/middleware-core/factory'
import {
  middleware1,
  loggerMiddleware,
} from '~/middleware-core/example-middlwares'

test('simple', async () => {
  const test = await axiosClientFactory([middleware1, loggerMiddleware])({
    baseURL: 'http://www.mocky.io',
    url: '/v2/5e1274723100005a3759405ek',
    params: {param1: "1"},
  })
  console.log(test.statusText)
})
