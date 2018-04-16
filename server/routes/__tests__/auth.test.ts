import { RequestHandler } from 'express'
import * as request from 'supertest'
import server, { NextHandler } from '../../server'

const mockAuth0User = {
  extraParams: {
    id_token: 'fakejwtlolololol',
    expiresIn: 1
  }
}

jest.mock('passport', () => {
  const passFunc: RequestHandler = (_req, _res, next) => next()
  return {
    authenticate: (): RequestHandler => (req, _res, next) => {
      req.user = mockAuth0User
      return next()
    },
    initialize: () => passFunc,
    session: () => passFunc,
    use: () => passFunc,
    serializeUser: (): void => {},
    deserializeUser: (): void => {}
  }
})

const nextHandler = jest.fn<NextHandler>()
const app = server(nextHandler)

describe('/auth/callback', () => {
  it('saves the JWT in a session cookie', async (done) => {
    const resp = await request(app).get('/auth/callback')
    expect(resp.header['set-cookie'][0]).toMatch(mockAuth0User.extraParams.id_token)
    return done()
  })
})