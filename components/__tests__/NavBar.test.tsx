import * as React from 'react'
import { render, shallow } from 'enzyme'

import { getFakeData } from '../../lib/fake-data'

import NavBar from '../NavBar'

const DATA = getFakeData()

it('renders without crashing', () => {
  render(<NavBar user={DATA.user} />)
})

it('shows a login link if no user data', () => {
  const component = shallow(<NavBar user={undefined} />)

  const hasLoginLink = component.find('a')
    .someWhere(n => !!n.text().match(/Login/))

  expect(hasLoginLink).toBe(true)
})

it('shows a logout link if user data passed', () => {
  const component = shallow(<NavBar user={DATA.user} />)

  const hasLogoutLink = component.find('a')
    .someWhere(n => !!n.text().match(/Logout/))

  expect(hasLogoutLink).toBe(true)
})