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

describe('GET /api/user/me', () => {
  it('responds with 401 if not logged in', async (done) => {
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

// describe('GET /api/activities', () => {
//   it('returns a 401 if not logged in', async (done) => {
//     const resp = await request(app).get('/api/activities')
//     expect(resp.status).toBe(401)
//     return done()
//   })
//   it('returns a list of activities for the logged in user', async (done) => {
//     // TODO: seed some activities
//     // const resp = await request(authenticated(app)).get('/api/activities')
//     return done()
//   })
// })

// describe('POST /api/activities', () => {
//   it('returns a 401 if not logged in', async (done) => {
//     const activity = { name: 'Test', value: 3 }
//     const resp = await request(app).post('/api/activities').send(activity)
//     expect(resp.status).toBe(401)
//     return done()
//   })
//   it('creates an activity belonging to the logged in user', () => {})
//   it('returns a 400 if name is missing', () => {})
//   it('defaults the value to 1', () => {})
// })
