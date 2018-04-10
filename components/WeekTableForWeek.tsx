// import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { weekDaysFromDate, entityArray } from '../lib/helpers'

import WeekTable, { WeekTableProps } from '../components/WeekTable'

function mapStateToProps(state: RootState): WeekTableProps {
  // TODO: use normalizr, not entityArray
  const logsForWeek = entityArray(state.logs)
  const weekDays = weekDaysFromDate(state.startOfWeek)
  const activities = entityArray(state.activities)

  return { isFetching: false, weekDays, activities, logsForWeek }
}

// function mapDispatchToProps(dispatch: Dispatch)
//
export default connect(mapStateToProps, () => ({}))(WeekTable)
