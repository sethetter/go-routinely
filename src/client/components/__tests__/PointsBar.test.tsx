import * as React from 'react'
import { shallow } from 'enzyme'

import PointsBar from '../PointsBar'

describe('<PointsBar />', () => {
  it('renders successfully', () => {
    shallow(<PointsBar points={0} />)
  })

  it('shows a reward for every 50 points', () => {
    const component = shallow(<PointsBar points={165} />)
    const rewards = component.find('.reward')
    expect(rewards).toHaveLength(3)
  })

  // it('shows a progress bar with % to next 50 points', () => {
  //   const component = shallow(<PointsBar points={175} />)

  // })
})
