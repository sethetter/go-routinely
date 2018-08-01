import * as React from 'react'
import moment from 'moment'

import { middleOfDay } from '../lib/helpers'

import ActivityDay from './ActivityDay'

export interface ActivityRowProps {
  activity: Activity
  weekDays: Date[]
  logsForActivity: ActivityLog[]
  createLog: (params: Partial<ActivityLog>) => void
}

const ActivityRow = ({
  activity,
  weekDays,
  logsForActivity,
  createLog,
}: ActivityRowProps) => {
  const activityDays = weekDays.map(d => {
    const logsForDay = logsForActivity.filter(l =>
      moment.utc(l.completedAt).isSame(d, 'day')
    )

    return (
      <ActivityDay
        key={d.valueOf()}
        day={d}
        activityId={activity._id}
        logsForDay={logsForDay}
        createLog={createLog}
      />
    )
  })

  const createLogForNow = () => {
    createLog({
      activityId: activity._id,
      completedAt: middleOfDay(new Date()),
    })
  }

  return (
    <tr key={activity._id} className="ActivityRow">
      <td onClick={createLogForNow} className="activity-name">{activity.name}</td>
      {activityDays}
    </tr>
  )
}

export default ActivityRow
