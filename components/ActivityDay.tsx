import * as React from 'react'
import * as moment from 'moment'
import { filter } from 'lodash'

export interface ActivityDayProps {
  activityId: string
  day: Date
  logsForDay: ActivityLog[]
  createLog: (params: Partial<ActivityLog>) => void
}

function logCountForActivityOnDay(
  day: Date,
  activityId: string,
  logs: ActivityLog[]
): number {
  return filter(logs, l => {
    const onSameDay = moment(l.completedAt).isSame(day, 'day')
    return l.activityId === activityId && onSameDay
  }).length
}

const ActivityDay = ({ day, activityId, logsForDay, createLog }: ActivityDayProps) => {
  const stars = []
  const logCount = logCountForActivityOnDay(day, activityId, logsForDay)

  for (let i = 0; i < logCount; i++) {
    stars.push(<i key={i} className="routinely--LogStar fa fa-star" />)
  }

  const createLogForDay = () => {
    createLog({
      activityId,
      completedAt: moment(day).startOf('day').add(12, 'hours').toDate()
    })
  }

  const className = `activity-day routinely--ActivityDayCol-${moment(day).weekday()}`

  return <td onClick={createLogForDay} className={className}>{stars}</td>
}

export default ActivityDay
