import 'jest'
import {axiosClientFactory} from '~/factory'
import {
  middleware1,
  loggerMiddleware,
} from '~/example-middlwares'

test('simple', async () => {
  const resp = await axiosClientFactory([middleware1, loggerMiddleware])({
    baseURL: 'http://www.mocky.io',
    url: '/v2/5e1274723100005a3759405e',
    params: {param1: "1"},
  })
  console.log(resp)
})
