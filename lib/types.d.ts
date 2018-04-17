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
  token: string
}

declare interface RootState {
  isFetching: boolean
  activities: EntityStore<Activity>
  logs: EntityStore<ActivityLog>
  user?: UserData
  startOfWeek: Date
  lastUpdated: Date
}

interface Entity {
  id: number
}

declare interface EntityStore<T extends Entity> {
  byId: { [key: number]: T }
  allIds: number[]
}

declare module 'passport-auth0'
declare module 'universal-cookie'