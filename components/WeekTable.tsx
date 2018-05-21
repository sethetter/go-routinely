import * as React from 'react'

import {
  weekDaysFromDate
} from '../lib/helpers'

import ActivityRow from './ActivityRow'
import WeekTableHead from './WeekTableHead'

interface WeekTableProps { 
  startOfWeek: Date
  activities: Activity[]
  logsForWeek: ActivityLog[]
  createLog: (params: Partial<ActivityLog>) => void
}

const WeekTable = (props: WeekTableProps) => {
  const { startOfWeek, activities, logsForWeek, createLog } = props
  const weekDays = weekDaysFromDate(startOfWeek)
  
  const activityRows = activities.map(a => {
    const logsForActivity = logsForWeek.filter(l => l.activityId === a._id)
    return (
      <ActivityRow
        key={a._id}
        activity={a}
        weekDays={weekDays}
        logsForActivity={logsForActivity}
        createLog={createLog}
      />
    )
  })

  return (
    <table className="table table-bordered WeekTable">
      <WeekTableHead startOfWeek={startOfWeek} />
      <tbody>{activityRows}</tbody>
    </table>
  )
}

export default WeekTable
