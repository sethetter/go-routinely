import * as React from 'react'
import { Provider } from 'react-redux'

import './index.scss'

import NavBar from '../components/NavBar'
import WeekTableForWeek from '../components/WeekTableForWeek'

import {
  loadActivities,
  loadActivityLogs
} from '../lib/actions'

import store from '../lib/store'

store.dispatch(loadActivities())
store.dispatch(loadActivityLogs())

const App = () => (
  <Provider store={store}>
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col">
            <WeekTableForWeek />
          </div>
        </div>
      </div>
    </div>
  </Provider>
)

export default App