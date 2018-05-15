import { Document, Schema, model } from 'mongoose'

interface activity extends Document {
  userId: string
  name: string
  value: number
}

const schema = new Schema({
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
})

const Activity = model<activity>('Activity', schema)

export default Activity
