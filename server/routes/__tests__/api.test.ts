import * as express from 'express'
import * as mongoose from 'mongoose'
import * as session from 'express-session'
import * as request from 'supertest'
import * as moment from 'moment'

import server, { NextHandler } from '../../server'

import Activity from '../../models/Activity'
import ActivityLog, { IActivityLog } from '../../models/ActivityLog'

const USER_ID = 'abc123'

const authenticated = (app: express.Application) => {
  const authenticatedApp = express()
  authenticatedApp.use(session({
    secret: process.env.SESSION_SECRET || 'shwat',
    resave: false,
    saveUninitialized: false
  }))
  authenticatedApp.use((req, _res, next) => {
    req.user = { id: USER_ID }
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

afterEach(async () => await mongoose.connection.dropDatabase())

describe('GET /api/user/me', () => {
  it('responds with 401 if not logged in', async (done) => {
    const resp = await request(app).get('/api/user/me')
    expect(resp.status).toBe(401)
    return done()
  })

  it('returns user profile data if logged in', async (done) => {
    const resp = await request(authenticated(app)).get('/api/user/me')
    expect(resp.status).toBe(200)
    expect(resp.body.id).toBe(USER_ID)
    return done()
  })
})

describe('GET /api/activities', () => {
  it('returns a 401 if not logged in', async (done) => {
    const resp = await request(app).get('/api/activities')
    expect(resp.status).toBe(401)
    return done()
  })

  it('returns a list of activities for the logged in user', async (done) => {
    await seedActivitiesForUser(USER_ID)
    await seedActivitiesForUser('anotheruser')

    const resp = await request(authenticated(app)).get('/api/activities')
    expect(resp.body).toHaveLength(3)

    return done()
  })
})

describe('POST /api/activities', () => {
  const activityParams = { name: 'Test', value: 3 }

  it('returns a 401 if not logged in', async (done) => {
    const resp = await request(app).post('/api/activities').send(activityParams)
    expect(resp.status).toBe(401)
    return done()
  })

  it('creates an activity belonging to the logged in user', async (done) => {
    const resp = await request(authenticated(app)).post('/api/activities').send(activityParams)

    const activity = await Activity.findOne({
      userId: USER_ID,
      name: activityParams.name
    })

    expect(resp.body._id).toBe(activity._id.toString())
    expect(resp.body.name).toBe(activityParams.name)
    expect(resp.body.value).toBe(activityParams.value)
    expect(resp.body.userId).toBe(USER_ID)

    return done()
  })

  it('returns a 400 if name is missing', async (done) => {
    const resp = await request(authenticated(app)).post('/api/activities').send({
      ...activityParams,
      name: undefined
    })
    expect(resp.status).toBe(400)
    return done()
  })

  it('defaults the value to 1', async (done) => {
    const resp = await request(authenticated(app)).post('/api/activities').send({
      ...activityParams,
      value: undefined
    })
    expect(resp.body.value).toBe(1)
    return done()
  })
})

describe('GET /api/logs', () => {
  it('returns a 401 if not logged in', async (done) => {
    const resp = await request(app).get('/api/logs')
    expect(resp.status).toBe(401)
    return done()
  })

  it('returns a list of activity logs for the user', async (done) => {
    await seedActivityLogsForUser(USER_ID)
    await seedActivityLogsForUser('anotheruser')

    const resp = await request(authenticated(app)).get('/api/logs')
    expect(resp.body).toHaveLength(3)

    return done()
  })

  it('accepts a week param', async (done) => {
    const date = moment('2018-03-26T12:00:00.000Z')

    await seedActivityLogsForUser(USER_ID, { completedAt: date.toDate() })
    await seedActivityLogsForUser(USER_ID, { completedAt: date.add(1, 'week').toDate() })

    const resp = await request(authenticated(app))
      .get(`/api/logs?week=${date.toISOString()}`)

    expect(resp.body).toHaveLength(3)

    return done()
  })
})

describe('POST /api/logs', () => {
  const logParams: Partial<IActivityLog> = {
    name: 'Test Log',
    value: 2,
    completedAt: moment('2018-03-01T12:00:00.000Z').toDate()
  }

  it('returns a 401 if not logged in', async (done) => {
    const resp = await request(app).post('/api/logs').send(logParams)
    expect(resp.status).toBe(401)
    return done()
  })

  it('creates given log for logged in user, returns it', async (done) => {
    const resp = await request(authenticated(app)).post('/api/logs').send(logParams)

    expect(resp.body.userId).toBe(USER_ID)
    expect(resp.body.name).toBe(logParams.name)
    expect(resp.body.value).toBe(logParams.value)
    expect(resp.body.completedAt).toEqual(logParams.completedAt.toISOString())

    return done()
  })

  it('fills in name and value if activityId provided', async (done) => {
    let activity = new Activity({
      name: 'Teeest',
      value: 5,
      userId: USER_ID,
    })

    activity = await activity.save()

    const resp = await request(authenticated(app)).post('/api/logs').send({
      activityId: activity._id
    })

    expect(resp.body.name).toBe(activity.name)
    expect(resp.body.value).toBe(activity.value)

    return done()
  })

  // TODO: ...
  // it('requires that activityId belong to the current user', async (done) => {})
})

async function seedActivitiesForUser (userId: string): Promise<void> {
  for (let i = 0; i < 3; ++i) {
    const params = { name: `Activity ${i}`, value: i, userId }
    await Activity.create(params)
  }
}

async function seedActivityLogsForUser (
  userId: string,
  params: Partial<IActivityLog> = {}
): Promise<void> {
  for (let i = 0; i < 3; ++i) {
    await ActivityLog.create({
      name: `Activity ${i}`,
      value: i,
      userId,
      ...params
    })
  }
}
