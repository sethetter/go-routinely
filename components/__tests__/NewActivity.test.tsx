import * as React from 'react'
import { render, shallow } from 'enzyme'

import NewActivity from '../NewActivity'

it('renders without crashing', () => {
  const mockFn = jest.fn()
  render(<NewActivity onSubmitNewActivity={mockFn} />)
})

it('clicking the New Activity button toggles state.modalOpen', () => {
  const mockFn = jest.fn()
  const component = shallow(<NewActivity onSubmitNewActivity={mockFn} />)

  expect(component.instance().state.modalOpen).toBe(false)
  component.find('button.new-activity').simulate('click')
  expect(component.instance().state.modalOpen).toBe(true)
})

it('submits the activity in state to the provided function', () => {
  const mockFn = jest.fn()
  const component = shallow(<NewActivity onSubmitNewActivity={mockFn} />)

  component.find('button.new-activity').simulate('click')
  component.find('button.submit-new-activity').simulate('click')
  expect(mockFn).toHaveBeenCalled()
})
