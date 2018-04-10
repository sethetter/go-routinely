import * as React from 'react'
import * as moment from 'moment'

import ActivityDay from './ActivityDay'

export interface ActivityRowProps {
  activity: Activity
  weekDays: Date[]
  logsForActivity: ActivityLog[]
}

const ActivityRow = ({
  activity,
  weekDays,
  logsForActivity
}: ActivityRowProps) => {
  const activityDays = weekDays.map(d => {
    const logsForDay = logsForActivity.filter(l =>
      moment(l.occurredAt).isSame(d, 'day')
    )

    return (
      <ActivityDay
        key={d.valueOf()}
        day={d}
        activityId={activity.id}
        logsForDay={logsForDay}
      />
    )
  })

  return (
    <tr key={activity.id}>
      <td>{activity.name}</td>
      {activityDays}
    </tr>
  )
}

export default ActivityRow
