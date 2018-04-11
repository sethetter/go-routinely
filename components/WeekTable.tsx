import * as React from 'react'

import ActivityRow from './ActivityRow'
import WeekTableHead from './WeekTableHead'

export interface WeekTableProps {
  isFetching: boolean
  weekDays: Date[]
  activities: Activity[]
  logsForWeek: ActivityLog[]
}

const WeekTable = ({
  isFetching,
  weekDays,
  activities,
  logsForWeek
}: WeekTableProps) => {
  if (isFetching) {
    return <p>Loading..</p>
  }

  const activityRows = activities.map(a => {
    const logsForActivity = logsForWeek.filter(l => l.activityId === a.id)
    return (
      <ActivityRow
        key={a.id}
        activity={a}
        weekDays={weekDays}
        logsForActivity={logsForActivity}
      />
    )
  })

  return (
    <table className="table table-bordered WeekTable">
      <WeekTableHead />
      <tbody>{activityRows}</tbody>
    </table>
  )
}

export default WeekTable
