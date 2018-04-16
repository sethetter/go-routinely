import * as dotenv from 'dotenv'

dotenv.config()

import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'

import passportConfig from './config/passport'

import authRoutes from './routes/auth'
import apiRoutes from './routes/api'

export type NextHandler = (
  req: http.IncomingMessage,
  res: http.OutgoingMessage
) => Promise<void>

export default (nextHandler: NextHandler): express.Application => {
  const app = express()
  const router = require('express-promise-router')()

  app.use(bodyParser.json())
  app.use(router)

  app.use(passportConfig.initialize())
  app.use(passportConfig.session())

  app.use('/auth', authRoutes)
  app.use('/api', apiRoutes)

  // Everything else falls through to next
  app.get('*', async (req, res) => nextHandler(req, res))

  return app
}