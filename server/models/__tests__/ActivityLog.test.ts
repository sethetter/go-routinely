import * as mongoose from 'mongoose'
import ActivityLog from '../ActivityLog'
import Activity from '../Activity';

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL))
afterEach(async () => await mongoose.connection.dropDatabase())
afterAll(async () => await mongoose.connection.close())

describe('ActivityLog', () => {
  const params = {
    userId: 'abc123',
    name: 'Test',
    value: 3,
    completedAt: new Date('03/26/2018')
  }

  it('requires a userId', async () => {
    const log = new ActivityLog({ ...params, userId: undefined })

    try {
      await log.validate()
    } catch (e) {
      expect(log.errors['userId'].message).toMatch(/required/)
    }
  })

  it('requires a name', async () => {
    const log = new ActivityLog({ ...params, name: undefined })

    try {
      await log.validate()
    } catch (e) {
      expect(log.errors['name'].message).toMatch(/required/)
    }

  })

  it('fills completedAt on save if missing', async () => {
    let log = await ActivityLog.create({ ...params, completedAt: undefined })

    expect(log.completedAt).toBeInstanceOf(Date)
    expect(log.completedAt).not.toBe(params.completedAt)
  })

  it('fills name and value based on activityId if present', async () => {
    const activityParams = { userId: params.userId, name: 'Test2', value: 10 }
    let activity = await Activity.create(activityParams)

    let log = await ActivityLog.create({ ...params, activityId: activity._id })

    expect(log.name).toBe(activityParams.name)
    expect(log.value).toBe(activityParams.value)
    expect(log._id).toBeTruthy()
  })
})
