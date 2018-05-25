import * as moment from 'moment'
import * as URI from 'urijs'
import * as fetch from 'isomorphic-fetch'

const defaultFetchOpts: RequestInit = {
  headers: { 'Content-Type': 'application/json '},
  credentials: 'same-origin',
}

const apiUrl = (req: any = {}, path: string): string => {
  if (!req.protocol && !req.headers) return path
  return `${req.protocol}://${req.get('host')}${path}`
}

export async function getActivities (
  req: any = {},
): Promise<Activity[]> {
  const uri = new URI(apiUrl(req, '/api/activities'))
  const headers = req ? req.headers : {}

  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function getLogsForWeek (
  date: Date,
  req: any = {},
): Promise<ActivityLog[]> {
  const uri = new URI(apiUrl(req, '/api/logs'))
  uri.addQuery('week', moment(date).toISOString())
  const headers = req ? req.headers : {}

  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function getUserData (
  req: any = {},
): Promise<UserData | undefined> {
  const uri = new URI(apiUrl(req, '/api/user/me'))
  const headers = req ? req.headers : {}
  return fetch(uri.valueOf(), { ...defaultFetchOpts, headers }).then(r => r.json())
}

export async function createActivity (
  params: Partial<Activity>,
  req: any = {},
): Promise<Activity> {
  const uri = new URI(apiUrl(req, '/api/activities'))
  return fetch(uri.valueOf(), Object.assign({}, defaultFetchOpts, {
    body: JSON.stringify(params),
    method: 'POST',
  })).then(r => r.json())
}

export async function createLog (
  params: Partial<ActivityLog>,
  req: any = {},
): Promise<ActivityLog> {
  const uri = new URI(apiUrl(req, '/api/logs'))
  return fetch(uri.valueOf(), Object.assign({}, defaultFetchOpts, {
    body: JSON.stringify(params),
    method: 'POST',
  })).then(r => r.json())
}

export async function getPoints (
  req: any = {},
): Promise<number> {
  const uri = new URI(apiUrl(req, '/api/points'))
  const headers = req ? req.headers : {}

  const { points } = await fetch(
    uri.valueOf(),
    Object.assign({}, defaultFetchOpts, { headers })
  ).then(r => r.json()) as any

  return points
}
