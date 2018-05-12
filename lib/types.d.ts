declare interface Activity {
  id: number
  name: string
  value: number
}

declare interface ActivityLog {
  id: number
  name: string
  value: number
  activityId: number
  occurredAt: Date
}

declare interface UserData {
  id: string
}

declare module 'passport-auth0'
