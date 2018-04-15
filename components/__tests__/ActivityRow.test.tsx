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
    return l.activityId === activity.id
  }),
  weekDays: weekDaysFromDate(DATA.startOfWeek)
}

describe('<ActivityRow />', () => {
  it('renders successfully', () => {
    const component = shallow(<ActivityRow {...props} />)

    expect(shallowToJson(component)).toMatchSnapshot()
  })
})
