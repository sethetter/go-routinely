import * as request from 'supertest'
import api from '../api'

describe('API routes', () => {
  it('responds', async (done) => {
    const resp = await request(api).get('/api')
    expect(resp.body.message).toMatch('sup')
    return done()
  })
})