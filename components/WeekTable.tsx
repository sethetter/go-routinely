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
}

const WeekTable = (props: WeekTableProps) => {
  const { startOfWeek, activities, logsForWeek } = props
  const weekDays = weekDaysFromDate(startOfWeek)
  
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
      <WeekTableHead startOfWeek={startOfWeek} />
      <tbody>{activityRows}</tbody>
    </table>
  )
}

export default WeekTable
