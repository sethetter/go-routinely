import * as moment from 'moment'

interface AppData {
  startOfWeek: Date
  activities: Activity[]
  activityLogs: ActivityLog[]
  weekDays: Date[]
}

const startOfWeek = new Date('03/25/2018')

const WEEKDAYS = [
  moment(startOfWeek).day('Sunday').startOf('day').toDate(),
  moment(startOfWeek).day('Monday').startOf('day').toDate(),
  moment(startOfWeek).day('Tuesday').startOf('day').toDate(),
  moment(startOfWeek).day('Wednesday').startOf('day').toDate(),
  moment(startOfWeek).day('Thursday').startOf('day').toDate(),
  moment(startOfWeek).day('Friday').startOf('day').toDate(),
  moment(startOfWeek).day('Saturday').startOf('day').toDate(),
]

const DATA: AppData = {
  startOfWeek,
  activities: [
    { id: 1, name: 'Brush teeth', value: 1 },
    { id: 2, name: 'Taekwondo', value: 2 },
    { id: 3, name: 'Clean room', value: 3 },
  ],
  activityLogs: [
    { id: 1, name: 'Brush teeth', value: 1, activityId: 1, occurredAt: WEEKDAYS[0] },
    { id: 2, name: 'Brush teeth', value: 1, activityId: 1, occurredAt: WEEKDAYS[0] },
    { id: 3, name: 'Taekwondo', value: 2, activityId: 2, occurredAt: WEEKDAYS[3] },
    { id: 4, name: 'Clean room', value: 3, activityId: 3, occurredAt: WEEKDAYS[2] },
  ],
  weekDays: WEEKDAYS
}

export const getFakeData = (): AppData => Object.assign({}, DATA)