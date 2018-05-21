declare interface Activity {
  _id: string
  name: string
  value: number
}

declare interface ActivityLog {
  _id: string
  name: string
  value: number
  activityId: string
  occurredAt: Date
}

declare interface UserData {
  id: string
}

declare module 'passport-auth0'
