import * as dotenv from 'dotenv'

dotenv.config()

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import auth from './auth'

const app = express()
const router = require('express-promise-router')()

app.use(bodyParser.json())
app.use(router)

app.use(auth.initialize())
app.use(auth.session())

app.get(
  '/api/callback',
  passport.authenticate('auth0', {}),
  (req, res) => {
    if (!req.user) throw new Error('No user!')
    res.redirect('/')
  }
)

app.get(
  '/api/login',
  passport.authenticate('auth0', {}),
  (_req, res) => res.redirect('/')
)

app.get('/api', async (_req, res) => {
  res.json({ message: 'sup' })
})

export default app 