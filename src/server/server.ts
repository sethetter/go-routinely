import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as mongoose from 'mongoose'
import * as createMongoStore from 'connect-mongo'
import * as passport from 'passport'
import * as serve from 'express-static'

import authRoutes, { requireUser } from './routes/auth'
import apiRoutes from './routes/api'

const MongoStore = createMongoStore(session)

export default (): express.Application => {
  const app = express()
  
  mongoose.connect(process.env.MONGO_URL || '')

  /**
   * When deploying with `now`, https is handled by a layer in their control,
   * so we need to set a couple things on the app so it knows we're running
   * with tls enabled.
   */
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', true)
    app.use('*', (req, _res, next) => {
      req.headers['X-Forwarded-Proto'] = 'https'
      return next()
    })
  }

  app.use(cookieParser(process.env.SESSION_SECRET || 'shwat'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const sessionConfig: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'shwat',
    cookie: {
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    },
    resave: false,
    saveUninitialized: false
  }

  if (process.env.NODE_ENV !== 'testing') {
    sessionConfig.store = new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }

  app.use(session(sessionConfig))
  app.use(passport.initialize())
  app.use(passport.session())

  const asyncRouter = require('express-promise-router')()
  app.use(asyncRouter)

  app.use('/auth', authRoutes)
  app.use('/api', requireUser, apiRoutes)

  app.use(serve(path.join(__dirname, '../assets')))

  const errorHandler: express.ErrorRequestHandler =
    (err, _req, res, next) => {
      if (!err) return next()

      if (process.env.NODE_ENV !== 'testing') {
        console.error(err)
      }

      const status = err.status || 500
      return res.status(status).json(
        err.expose || process.env.NODE_ENV === 'development' ? err : {}
      )
    }

  app.use(errorHandler)

  // TODO: serve static files

  return app
}
