import * as React from 'react'
import * as moment from 'moment'

import * as api from '../lib/api'

import NavBar from './NavBar'
import WeekTable from './WeekTable'
import NewActivity from './NewActivity'
import PointsBar from './PointsBar'

interface AppState { 
  isLoading: boolean
  user?: UserData
  startOfWeek: Date
  activities: Activity[]
  logsForWeek: ActivityLog[]
  points: number
}

class App extends React.Component<Partial<AppState>, AppState> {

  constructor (args: any) {
    super(args)

    const startOfWeek = moment.utc().startOf('week').add(12, 'hours').toDate()

    this.state = {
      isLoading: true,
      user: undefined,
      startOfWeek: startOfWeek,
      activities: [],
      logsForWeek: [],
      points: 0,
    }

    this.createActivity = this.createActivity.bind(this)
    this.createLog = this.createLog.bind(this)
    this.getPoints = this.getPoints.bind(this)
  }

  async componentWillMount () {
    const user = await api.getUserData()
    const activities = user ? await api.getActivities() : []
    const logsForWeek = user ? await api.getLogsForWeek(this.state.startOfWeek) : []
    const points = user ? await api.getPoints() : 0

    try {
      this.setState({
        isLoading: false,
        user: user,
        activities: activities,
        logsForWeek: logsForWeek,
        points: points,
      })
    } catch (e) {
      console.error(e)
    }
  }

  async getPoints () {
    try {
      const points = await api.getPoints()
      this.setState({ points })
    } catch (e) {
      console.error(e)
    }
  }

  async createActivity (params: Partial<Activity>) {
    if (!confirm('Are you sure?')) return
    try {
      const activity = await api.createActivity(params)

      this.setState({
        activities: [...this.state.activities, activity]
      })
    } catch (e) {
      console.error(e)
    }
  }

  async createLog (params: Partial<ActivityLog>) {
    if (!confirm('Are you sure?')) return
    try {
      const log = await api.createLog(params)

      this.setState({
        logsForWeek: [...this.state.logsForWeek, log]
      })

      await this.getPoints()
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
                      createLog={this.createLog}
                    />
                    <NewActivity onSubmitNewActivity={this.createActivity} />
                    <hr />
                    <div className="row">
                      <div className="col">
                        <PointsBar points={this.state.points} createLog={this.createLog} />
                      </div>
                    </div>
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
