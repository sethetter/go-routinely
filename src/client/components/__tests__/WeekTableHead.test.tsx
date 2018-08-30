import * as React from 'react'
import * as moment from 'moment'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import WeekTableHead from '../WeekTableHead'

const startOfWeek = moment(new Date('03/25/2018')).startOf('week').toDate()

describe('WeekTableHead', () => {
  it('should match snapshot', () => {
    const output = shallow(<WeekTableHead startOfWeek={startOfWeek} />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should render 8 th elements', () => {
    const output = shallow(<WeekTableHead startOfWeek={startOfWeek} />)
    expect(output.find('th').length).toBe(8)
  })

  it('should have each day of the week rendered', () => {
    const output = shallow(<WeekTableHead startOfWeek={startOfWeek} />)
    const expectedDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    expectedDays.map(d => {
      const thForDay = output.findWhere(n => n.is('th') && n.text() === d)
      expect(thForDay).toHaveLength(1)
    })
  })
  
  it('shows the current week range', () => {
    const output = shallow(<WeekTableHead startOfWeek={startOfWeek} />)

    const sundayR = new RegExp(moment(startOfWeek).format('M/D'))
    const saturdayR = new RegExp(moment(startOfWeek).day('saturday').format('M/D'))

    const weekRangeNode = output.findWhere(n => {
      return n.is('th') && sundayR.test(n.text()) && saturdayR.test(n.text())
    })

    expect(weekRangeNode).toHaveLength(1)
  })
})
