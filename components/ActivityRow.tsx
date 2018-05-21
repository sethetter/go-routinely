import * as React from 'react'
import * as moment from 'moment'

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
      moment(l.occurredAt).isSame(d, 'day')
    )

    return (
      <ActivityDay
        key={d.valueOf()}
        day={d}
        activityId={activity._id}
        logsForDay={logsForDay}
      />
    )
  })

  const createLogForNow = () => {
    createLog({ activityId: activity._id })
  }

  return (
    <tr key={activity._id} className="ActivityRow">
      <td onClick={createLogForNow} className="activity-name">{activity.name}</td>
      {activityDays}
    </tr>
  )
}

export default ActivityRow
