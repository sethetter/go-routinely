import * as mongoose from 'mongoose'
import Activity from '../Activity';

mongoose.connect(process.env.MONGO_URL)

describe('Activity', () => {
  afterEach(async (done) => {
    await mongoose.connection.dropDatabase()
    return done()
  })

  it('requires a user', async (done) => {
    const activity = new Activity({ name: 'Test', value: 3 })
    try {
      await activity.validate()
    } catch (e) {
      expect(activity.errors['userId']).toHaveLength(1)
    } finally {
      return done()
    }
  })

  it('requires a name', async (done) => {
    const activity = new Activity({ userId: 'abc123', value: 3 })
    try {
      await activity.validate()
    } catch (e) {
      expect(activity.errors['name']).toHaveLength(1)
    } finally {
      return done()
    }
  })

  it('defaults the value to 1', async (done) => {
    const activity = new Activity({ userId: 'abc123', name: 'Test' })
    await activity.save()
    expect(activity.value).toBe(1)
    return done()
  })
})
