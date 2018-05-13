import {
  Document,
  Schema,
  model
} from 'mongoose'

interface Activity extends Document {
  userId: string
  name: string
  value: number
}

export default model<Activity>('Activity', new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1
  }
}))
