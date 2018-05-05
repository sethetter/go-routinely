import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) })

import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

// import authRoutes from './routes/auth'
import userRoutes from './routes/user'

export type NextHandler = (
  req: http.IncomingMessage,
  res: http.OutgoingMessage
) => Promise<void>

export default (nextHandler: NextHandler): express.Application => {
  const app = express()
  const router = require('express-promise-router')()

  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(router)

  // app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)

  const errorHandler: express.ErrorRequestHandler =
    (err, _req, res, next) => {
      if (!err) return next()
      return res.status(err.status).json(err.expose ? err : {})
    }

  app.use(errorHandler)

  // Everything else falls through to next
  app.get('*', async (req, res) => nextHandler(req, res))

  return app
}
