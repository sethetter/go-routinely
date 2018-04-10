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

declare interface RootState {
  isFetching: boolean
  activities: EntityStore<Activity>
  logs: EntityStore<ActivityLog>
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
