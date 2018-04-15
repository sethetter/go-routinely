import * as React from 'react'
import * as moment from 'moment'
import { render } from 'enzyme'

import { getFakeData } from '../../lib/fake-data'

import ActivityDay, { ActivityDayProps } from '../ActivityDay'

const DATA = getFakeData()

const activityDay = (props: ActivityDayProps) => (
  <table>
    <tbody>
      <tr>
        <ActivityDay {...props} />
      </tr>
    </tbody>
  </table>
)

it('renders without crashing', () => {
  render(activityDay({
    activityId: 1,
    day: new Date(),
    logsForDay: DATA.activityLogs
  }))
})

it('shows a star for each log in logCount', () => {
  const day = moment(DATA.startOfWeek)
    .day('Sunday')
    .startOf('day')
    .toDate()
  const activityId = 1

  const component = render(
    activityDay({
      activityId: activityId,
      day: day,
      logsForDay: DATA.activityLogs
    })
  )

  expect(component).toMatchSnapshot()

  const stars = component.find('.routinely--LogStar')

  const expectedStarCount = DATA.activityLogs.filter(l => {
    const onSameDay = moment(l.occurredAt).isSame(day, 'day')
    return l.activityId === activityId && onSameDay
  }).length

  expect(stars).toHaveLength(expectedStarCount)
})

// TODO
it('creates a log for the specified day and activity', () => {
  // check that a function is called?
})
