import 'jest'
import {  createRequestExecutor, NoOpMiddleware } from "~/model";
import axios from 'axios'
import { loggerMiddleware } from '~/middlewares/logge-middleware';


const axiosClient = createRequestExecutor([loggerMiddleware],axios)

test('test simple request',async () => {
  const res = await axiosClient({
    url: 'https://httpbin.org/get',
    attributes:{
      requestId:123
    },
    requestId:123
  })
  expect(res.status).toBeDefined()
  expect(res.data).toBeDefined()
  console.error(res.config)
})