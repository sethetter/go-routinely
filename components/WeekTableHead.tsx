import * as React from 'react'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const WeekTableHead = () => {
  return (
    <thead className="thead-light">
      <tr>
        <th />
        {daysOfWeek.map(d => <th key={d}>{d}</th>)}
      </tr>
    </thead>
  )
}

export default WeekTableHead
