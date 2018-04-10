import * as React from 'react'
import * as moment from 'moment'
import { filter } from 'lodash'

export interface ActivityDayProps {
  activityId: number
  day: Date
  logsForDay: ActivityLog[]
}

function logCountForActivityOnDay(
  day: Date,
  activityId: number,
  logs: ActivityLog[]
): number {
  return filter(logs, l => {
    const onSameDay = moment(l.occurredAt).isSame(day, 'day')
    return l.activityId === activityId && onSameDay
  }).length
}

const ActivityDay = ({ day, activityId, logsForDay }: ActivityDayProps) => {
  const stars = []
  const logCount = logCountForActivityOnDay(day, activityId, logsForDay)

  for (let i = 0; i < logCount; i++) {
    stars.push(<i key={i} className="routinely--LogStar fa fa-star" />)
  }

  const className = `routinely--ActivityDayCol-${moment(day).weekday()}`

  return <td className={className}>{stars}</td>
}

export default ActivityDay
