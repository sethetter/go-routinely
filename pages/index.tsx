import * as React from 'react'
import { Provider } from 'react-redux'
import Cookies from 'universal-cookie'

import './index.scss'

import NavBarForUser from '../components/NavBarForUser'
import WeekTableForWeek from '../components/WeekTableForWeek'

import {
  receiveUser,
  loadActivities,
  loadActivityLogs
} from '../lib/actions'

import store from '../lib/store'

const cookies = new Cookies()

const userToken = cookies.get('_routinely_token')
const userID = cookies.get('_routinely_user')

if (!userToken || !userID) {
  store.dispatch(receiveUser({
    id: userID,
    token: userToken
  }))

  store.dispatch(loadActivities())
  store.dispatch(loadActivityLogs())
}

const App = () => (
  <Provider store={store}>
    <div className="App">
      <NavBarForUser />
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