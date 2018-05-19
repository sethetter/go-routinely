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

  constructor (args: any) {
    super(args)

    this.state = {
      isLoading: true,
      startOfWeek: this.props.startOfWeek,
      activities: this.props.activities,
      logsForWeek: this.props.logsForWeek,
    }

    this.createActivity = this.createActivity.bind(this)
  }

  static async getInitialProps ({ req }: { req: any }) {
    const isServer = !!req
    const headers: any | undefined = isServer ? req.headers : {}

    const startOfWeek = moment().startOf('week').toDate()

    const user = isServer ? req.user : await api.getUserData(isServer, headers)
    const activities = user ? await api.getActivities(isServer, headers) : []
    const logsForWeek = user ? await api.getLogsForWeek(startOfWeek, isServer, headers) : []

    return { user, startOfWeek, activities, logsForWeek }
  }

  componentWillMount () {
    console.log(this.props)
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
                  <div>
                    <WeekTable
                      startOfWeek={this.state.startOfWeek}
                      activities={this.state.activities}
                      logsForWeek={this.state.logsForWeek}
                    />
                  </div>
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
