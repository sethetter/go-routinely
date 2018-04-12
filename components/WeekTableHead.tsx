import * as React from 'react'
import * as moment from 'moment'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export interface WeekTableHeadProps {
  startOfWeek: Date
}

const WeekTableHead = ({ startOfWeek }: WeekTableHeadProps) => {
  const sunday = moment(startOfWeek).format('M/D')
  const saturday = moment(startOfWeek).day('saturday').format('M/D')
  const weekRange = `${sunday} - ${saturday}`

  return (
    <thead className="thead-light">
      <tr>
        <th>{weekRange}</th>
        {daysOfWeek.map(d => <th key={d}>{d}</th>)}
      </tr>
    </thead>
  )
}

export default WeekTableHead
