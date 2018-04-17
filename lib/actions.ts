import { Action } from 'redux'
import { Dispatch } from 'react-redux'

// TODO: replace this eventually
import * as api from './fake-api'

export type RoutinelyAction
  = ReceiveUserAction
  | RequestActivitiesAction
  | ReceiveActivitiesAction
  | RequestActivityLogsAction
  | ReceiveActivityLogsAction

export const enum Actions {
  ReceiveUser = 'Routinely/ReceiveUser',
  RequestActivities = 'Routinely/RequestActivities',
  ReceiveActivities = 'Routinely/ReceiveActivities',
  RequestActivityLogs = 'Routinely/RequestActivityLogs',
  ReceiveActivityLogs = 'Routinely/ReceiveActivityLogs'
}

export interface ReceiveUserAction extends Action {
  type: Actions.ReceiveUser
  user: UserData
}

export interface RequestActivityLogsAction extends Action {
  type: Actions.RequestActivityLogs
}

export interface ReceiveActivityLogsAction extends Action {
  type: Actions.ReceiveActivityLogs
  activityLogs: ActivityLog[]
}

export interface RequestActivitiesAction extends Action {
  type: Actions.RequestActivities
}

export interface ReceiveActivitiesAction extends Action {
  type: Actions.ReceiveActivities
  activities: Activity[]
}

/**
 * Action Creators
 */
export const receiveUser = (user: UserData): ReceiveUserAction => ({
  type: Actions.ReceiveUser,
  user
})

export const requestActivities = (): RequestActivitiesAction => ({
  type: Actions.RequestActivities
})

export const receiveActivities = (
  activities: Activity[]
): ReceiveActivitiesAction => ({
  type: Actions.ReceiveActivities,
  activities
})

export const requestActivityLogs = (): RequestActivityLogsAction => ({
  type: Actions.RequestActivityLogs
})

export const receiveActivityLogs = (
  activityLogs: ActivityLog[]
): ReceiveActivityLogsAction => ({
  type: Actions.ReceiveActivityLogs,
  activityLogs
})

export const loadActivities = () => (dispatch: Dispatch<ActivityLog[]>) => {
  dispatch(requestActivities())

  const activities = api.getActivities()
  dispatch(receiveActivities(activities))
}

export const loadActivityLogs = () => (dispatch: Dispatch<ActivityLog[]>) => {
  dispatch(requestActivityLogs())

  const activityLogs = api.getActivityLogs()
  dispatch(receiveActivityLogs(activityLogs))
}

export const createActivityLog = (
  activity: Activity,
  timestamp: Date
) => (
  dispatch: Dispatch<ActivityLog>
) => {
  const activityLogs = api.getActivityLogs()

  const newLog: ActivityLog = {
    id: activityLogs.length,
    name: activity.name,
    value: activity.value,
    activityId: activity.id,
    occurredAt: timestamp
  }

  api.saveActivityLog(newLog)

  dispatch(loadActivityLogs())
}
