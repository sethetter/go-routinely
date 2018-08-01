import { getFakeData } from './fake-data'

const DATA = getFakeData()

export function getActivities (): Activity[] {
  return DATA.activities
}

export function getActivityLogs (): ActivityLog[] {
  return DATA.activityLogs
}

export function saveActivityLog (activityLog: ActivityLog): void {
  DATA.activityLogs.push(activityLog)
}
