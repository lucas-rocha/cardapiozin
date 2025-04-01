import { SetupServer } from '@src/server'
import supertest from 'supertest'

let server: SetupServer

// jest.setTimeout(30000);

beforeAll(async () => {
  server = new SetupServer();
  await server.init();
  global.testRequest = supertest(server.getApp())
})

afterAll(async () => {
  return await server.close()
})