import * as mongoose from 'mongoose'
import Activity from '../Activity';

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL))
afterEach(async () => await mongoose.connection.dropDatabase())
afterAll(async () => await mongoose.connection.close())

describe('Activity', () => {
  it('requires a user', async () => {
    const activity = new Activity({ name: 'Test', value: 4 })

    try {
      await activity.validate()
    } catch (e) {
      expect(activity.errors['userId'].message).toMatch(/required/)
    }
  })

  it('requires a name', async () => {
    const activity = new Activity({ userId: 'abc123', value: 3 })

    try {
      await activity.validate()
    } catch (e) {
      expect(activity.errors['name'].message).toMatch(/required/)
    }
  })

  it('defaults the value to 1', async () => {
    const activity = new Activity({ userId: 'abc123', name: 'Test' })
    await activity.save()
    expect(activity.value).toBe(1)
  })
})
