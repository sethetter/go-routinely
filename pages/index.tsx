import * as React from 'react'
import * as moment from 'moment'

import * as api from '../lib/api'

import NavBar from '../components/NavBar'
import WeekTable from '../components/WeekTable'

import './index.scss'

interface AppState { 
  isLoading: boolean
  user?: UserData
  startOfWeek: Date
  activities: Activity[]
  logsForWeek: ActivityLog[]
}

class App extends React.Component<Partial<AppState>, AppState> {

  static async getInitialProps ({ req }: { req: any }) {
    const startOfWeek = moment().startOf('week').toDate()

    let user
    let activities
    let logsForWeek

    const isServer = !!req

    if (isServer) {
      user = req.user
      activities = await api.getActivities()
      logsForWeek = await api.getLogsForWeek(startOfWeek)
    } else {
      user = await api.getUserData()
      activities = await api.getActivities()
      logsForWeek = await api.getLogsForWeek(startOfWeek)
    }

    return { user, startOfWeek, activities, logsForWeek }
  }

  componentWillMount () {
    try {
      this.setState({
        isLoading: false,
        user: this.props.user,
        activities: this.props.activities,
        logsForWeek: this.props.logsForWeek
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return (
      <div className="App">
        <NavBar user={this.state.user} />

        <div className="container">
          <div className="row">
            <div className="col">
              {
                this.state.user ? (
                  <WeekTable
                    startOfWeek={this.state.startOfWeek}
                    activities={this.state.activities}
                    logsForWeek={this.state.logsForWeek}
                  />
                ) : (
                  <h3 className="text-center" >Welcome! Please log in to get started.</h3>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
