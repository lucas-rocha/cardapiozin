import "reflect-metadata"
import 'express-async-errors'
import './util/module-alias'
import { SetupServer } from "@src/server"

(async () => {
  const server = new SetupServer()
  await server.init()
  server.start()
})()