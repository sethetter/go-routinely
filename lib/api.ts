import * as URI from 'urijs'
import * as fetch from 'isomorphic-fetch'
import { getFakeData } from './fake-data'

const fakeData = getFakeData()

export async function getActivities (): Promise<Activity[]> {
  // const uri = new URI('/api/activities')

  // const response = await fetch(uri.valueOf(), { credentials: 'same-origin' })
  // const { activities } = await response.json()

  // return activities
  return fakeData.activities
}

export async function getLogsForWeek (_startOfWeek: Date): Promise<ActivityLog[]> {
  // const uri = new URI('/api/logs')
  // uri.addQuery('week', startOfWeek.toISOString())

  // const response = await fetch(uri.valueOf(), { credentials: 'same-origin' })
  // const { logs } = await response.json()

  // return logs
  return fakeData.activityLogs
}

export async function getUserData (): Promise<UserData> {
  const uri = new URI('http://localhost:3000/api/user/me')
  return fetch(uri.valueOf(), { credentials: 'same-origin' }).then(r => r.json())
}
