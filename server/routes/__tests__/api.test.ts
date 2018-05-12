import * as express from 'express'
import * as session from 'express-session'
import * as request from 'supertest'
import server, { NextHandler } from '../../server'

const authenticated = (app: express.Application) => {
  const authenticatedApp = express()
  authenticatedApp.use(session({
    secret: process.env.SESSION_SECRET || 'shwat',
    resave: false,
    saveUninitialized: false
  }))
  authenticatedApp.use((req, _res, next) => {
    req.user = { id: 'abc123' }
    return next()
  })
  authenticatedApp.use(app)
  return authenticatedApp
}

jest.mock('passport', (): any => ({
  authenticate: () => (_req: any, _res: any, next: express.NextFunction) => next(),
  initialize: () => (_req: any, _res: any, next: express.NextFunction) => next(),
  session: () => (_req: any, _res: any, next: express.NextFunction) => next(),
  use: () => ({}),
  serializeUser: () => ({}),
  deserializeUser: () => ({})
}))

jest.mock('passport-auth0')

const nextHandler = jest.fn<NextHandler>()
const app = server(nextHandler)

describe('/api/user/me', () => {
  it('responds with 403 if not logged in', async (done) => {
    const resp = await request(app).get('/api/user/me')
    expect(resp.status).toBe(401)
    return done()
  })

  it('returns user profile data if logged in', async (done) => {
    const resp = await request(authenticated(app)).get('/api/user/me')
    expect(resp.status).toBe(200)
    expect(resp.body.id).toBe('abc123')
    return done()
  })
})
