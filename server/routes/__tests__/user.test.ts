import * as request from 'supertest'
import server, { NextHandler } from '../../server'
import * as User from '../../models/user'

const nextHandler = jest.fn<NextHandler>()
const app = server(nextHandler)

afterEach(async (done) => {
  const users = await User.getCollection()
  await users.deleteMany({})
  return done()
})

describe('POST /api/user', () => {
  it('creates a user and returns the id', async (done) => {
    const createParams = { email: 'email@example.com' }
    const resp = await request(app).post('/api/user').send(createParams)

    expect(resp.body.id).toBeTruthy()

    return done()
  })

  it('returns a 400 if the email is taken', async (done) => {
    const createParams = { email: 'email@example.com' }

    // Create the first record, then send it again
    await request(app).post('/api/user').send(createParams)
    const resp = await request(app).post('/api/user').send(createParams)

    expect(resp.status).toBe(400)
    expect(resp.body.message).toMatch(/email/i)

    return done()
  })
})
