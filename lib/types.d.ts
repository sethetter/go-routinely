declare interface Activity {
  _id: string
  name: string
  value: number
}

declare interface ActivityLog {
  _id: string
  name: string
  value: number
  activityId: number
  occurredAt: Date
}

declare interface UserData {
  id: string
}

declare module 'passport-auth0'
