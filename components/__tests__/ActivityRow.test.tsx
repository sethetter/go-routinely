import * as React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { weekDaysFromDate } from '../../lib/helpers'
import ActivityRow, { ActivityRowProps } from '../ActivityRow'

import { getFakeData } from '../../lib/fake-data'

const DATA = getFakeData()

const activity = DATA.activities[0]
const props: ActivityRowProps = {
  activity,
  logsForActivity: DATA.activityLogs.filter(l => {
    return l.activityId === activity._id
  }),
  weekDays: weekDaysFromDate(DATA.startOfWeek),
  createLog: jest.fn()
}

describe('<ActivityRow />', () => {
  it('renders successfully', () => {
    const component = shallow(<ActivityRow {...props} />)

    expect(shallowToJson(component)).toMatchSnapshot()
  })

  it('calls the createLog function when activity name clicked', () => {
    const createLog = jest.fn()
    const component = shallow(<ActivityRow {...props} createLog={createLog} />)

    component.find('td.activity-name').simulate('click')

    expect(createLog).toHaveBeenCalledWith(expect.objectContaining({
      activityId: activity._id,
      completedAt: expect.anything(),
    }))
  })
})
