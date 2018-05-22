import * as moment from 'moment'
import * as URI from 'urijs'
import * as fetch from 'isomorphic-fetch'

const defaultFetchOpts: RequestInit = {
  headers: { 'Content-Type': 'application/json '},
  credentials: 'same-origin',
}

const apiUrl = (isServer: boolean, path: string): string =>
  isServer ? `http://localhost:3000${path}` : path

export async function getActivities (
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<Activity[]> {
  const uri = new URI(apiUrl(isServer, '/api/activities'))

  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function getLogsForWeek (
  date: Date,
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<ActivityLog[]> {
  const uri = new URI(apiUrl(isServer, '/api/logs'))
  uri.addQuery('week', moment(date).toISOString())

  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function getUserData (
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<UserData | undefined> {
  const uri = new URI(apiUrl(isServer, '/api/user/me'))
  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function createActivity (
  params: Partial<Activity>,
  isServer: boolean = false,
): Promise<Activity> {
  const uri = new URI(apiUrl(isServer, '/api/activities'))
  return fetch(uri.valueOf(), Object.assign({}, defaultFetchOpts, {
    body: JSON.stringify(params),
    method: 'POST',
  })).then(r => r.json())
}

export async function createLog (
  params: Partial<ActivityLog>,
  isServer: boolean = false,
): Promise<ActivityLog> {
  const uri = new URI(apiUrl(isServer, '/api/logs'))
  return fetch(uri.valueOf(), Object.assign({}, defaultFetchOpts, {
    body: JSON.stringify(params),
    method: 'POST',
  })).then(r => r.json())
}

export async function getPoints (
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<number> {
  const uri = new URI(apiUrl(isServer, '/api/points'))

  const { points } = await fetch(
    uri.valueOf(),
    Object.assign({}, defaultFetchOpts, { headers })
  ).then(r => r.json()) as any

  return points
}
