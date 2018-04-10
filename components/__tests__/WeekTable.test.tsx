import * as React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { getFakeData } from '../fake-data'

import WeekTable from './WeekTable'

const DATA = getFakeData()

describe('<WeekTable />', () => {
  it('should render correctly', () => {
    const component = shallow(
      <WeekTable
        isFetching={false}
        weekDays={DATA.weekDays}
        activities={DATA.activities}
        logsForWeek={DATA.activityLogs}
      />
    )

    expect(shallowToJson(component)).toMatchSnapshot()
  })

  // it('shows "loading" when fetching', () => {})
  // it('renders a row for each activity', () => {})
  // it('filters logs for each activity', () => {})
})
