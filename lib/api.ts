import * as moment from 'moment'
import * as URI from 'urijs'
import * as fetch from 'isomorphic-fetch'

const defaultFetchOpts: RequestInit = {
  credentials: 'same-origin'
}

const apiUrl = (isServer: boolean, path: string): string =>
  isServer ? `http://localhost:3000${path}` : `${path}`

export async function getActivities (
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<Activity[]> {
  const uri = new URI(apiUrl(isServer, '/api/activities'))

  return fetch(uri.valueOf(), { headers, ...defaultFetchOpts }).then(r => r.json())
}

export async function getLogsForWeek (
  date: Date,
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<ActivityLog[]> {
  const uri = new URI(apiUrl(isServer, '/api/logs'))
  uri.addQuery('week', moment(date).toISOString())

  return fetch(uri.valueOf(), { headers, ...defaultFetchOpts }).then(r => r.json())
}

export async function getUserData (
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<UserData | undefined> {
  const uri = new URI(apiUrl(isServer, '/api/user/me'))
  return fetch(uri.valueOf(), { headers, ...defaultFetchOpts }).then(r => r.json())
}

export async function createActivity (
  params: Partial<Activity>,
  isServer: boolean = false,
  headers: { [key: string]: string } = {},
): Promise<Activity> {
  const uri = new URI(apiUrl(isServer, '/api/activities'))
  return fetch(uri.valueOf(), Object.assign({
    body: JSON.stringify(params),
    method: 'post',
  }, { headers, ...defaultFetchOpts })).then(r => r.json())
}
