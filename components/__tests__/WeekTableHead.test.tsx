import * as React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import WeekTableHead from '../WeekTableHead'

describe('WeekTableHead', () => {
  it('should match snapshot', () => {
    const output = shallow(<WeekTableHead />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should render 8 th elements', () => {
    const output = shallow(<WeekTableHead />)
    expect(output.find('th').length).toBe(8)
  })

  it('should have each day of the week rendered', () => {
    const output = shallow(<WeekTableHead />)
    const expectedDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    expectedDays.map(d => {
      const thForDay = output.findWhere(n => n.is('th') && n.text() === d)
      expect(thForDay).toHaveLength(1)
    })
  })
})
