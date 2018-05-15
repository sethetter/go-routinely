import { Document, Schema, model } from 'mongoose'
import { ObjectId } from 'mongodb'

import Activity from './Activity'

interface activityLog extends Document {
  userId: string
  name: string
  value: number
  activityId: string
  completedAt: Date
}

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  activityId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
})

schema.post('save', async function () {
  if (this.activityId) {
    console.log(this.activityId)
    const activity = await Activity.findOne({
      _id: this.activityId,
      userId: this.userId
    }, 'name value')

    if (activity) {
      this.name = activity.name
      this.value = activity.value
    }
  }
})

const ActivityLog = model<activityLog>('ActivityLog', schema)

export default ActivityLog
