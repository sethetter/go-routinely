import * as React from 'react'
import * as moment from 'moment'

import * as api from '../lib/api'

import NavBar from '../components/NavBar'
import WeekTable from '../components/WeekTable'
import NewActivity from '../components/NewActivity'
import PointsBar from '../components/PointsBar'

import './index.scss'

interface IndexState { 
  isLoading: boolean
  user?: UserData
  startOfWeek: Date
  activities: Activity[]
  logsForWeek: ActivityLog[]
  points: number
}

class Index extends React.Component<Partial<IndexState>, IndexState> {

  constructor (args: any) {
    super(args)

    this.state = {
      isLoading: true,
      startOfWeek: this.props.startOfWeek,
      activities: this.props.activities,
      logsForWeek: this.props.logsForWeek,
      points: this.props.points,
    }

    this.createActivity = this.createActivity.bind(this)
    this.createLog = this.createLog.bind(this)
    this.getPoints = this.getPoints.bind(this)
  }

  static async getInitialProps ({ req }: { req: any }) {
    const isServer = !!req
    const headers: any | undefined = isServer ? req.headers : {}

    const startOfWeek = moment().startOf('week').toDate()

    const user = isServer ? req.user : await api.getUserData(isServer, headers)
    const activities = user ? await api.getActivities(isServer, headers) : []
    const logsForWeek = user ? await api.getLogsForWeek(startOfWeek, isServer, headers) : []
    const points = user ? await api.getPoints(isServer, headers) : 0

    return { user, startOfWeek, activities, logsForWeek, points }
  }

  componentWillMount () {
    try {
      this.setState({
        isLoading: false,
        user: this.props.user,
        activities: this.props.activities,
        logsForWeek: this.props.logsForWeek,
        points: this.props.points,
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
    console.log(this.state.points)
    return (
      <div className="Index">
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

export default Index
