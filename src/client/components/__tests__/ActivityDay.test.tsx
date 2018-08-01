import * as React from 'react'
import * as moment from 'moment'

import { shallow } from 'enzyme'

import { middleOfDay } from '../../lib/helpers'
import { getFakeData } from '../../lib/fake-data'

import ActivityDay, { ActivityDayProps } from '../ActivityDay'

const DATA = getFakeData()

const props: ActivityDayProps = {
  activityId: '1',
  day: new Date('2018-03-26'),
  logsForDay: DATA.activityLogs,
  createLog: jest.fn()
}

describe('<ActivityDay />', () => {
  it('renders without crashing', () => {
    shallow(<ActivityDay {...props} />)
  })

  it('shows a star for each log in logCount', () => {
    const day = moment(DATA.startOfWeek)
      .day('Sunday')
      .startOf('day')
      .toDate()

    const component = shallow(<ActivityDay {...props} day={day} />)

    expect(component).toMatchSnapshot()

    const stars = component.find('.routinely--LogStar')

    const expectedStarCount = DATA.activityLogs.filter(l => {
      const onSameDay = moment(l.completedAt).isSame(day, 'day')
      return l.activityId === props.activityId && onSameDay
    }).length

    expect(stars).toHaveLength(expectedStarCount)
  })

  it('creates a log for the specified day and activity', () => {
    const createLog = jest.fn()
    const component = shallow(<ActivityDay {...props} createLog={createLog} />)

    component.find('.activity-day').simulate('click')

    expect(createLog).toHaveBeenCalledWith({
      activityId: props.activityId,
      completedAt: middleOfDay(props.day),
    })
  })
})
