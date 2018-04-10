import * as moment from 'moment'
import { toEntityStore } from './helpers'

import {
  RoutinelyAction,
  Actions
} from './actions'

export const initialState: RootState = {
  activities: {
    allIds: [],
    byId: {}
  },
  logs: {
    allIds: [],
    byId: {}
  },
  isFetching: false,
  startOfWeek: moment().startOf('week').toDate(),
  lastUpdated: moment().toDate()
}

// TODO: Rewrite this things!
function rootReducer (state: RootState = initialState, action: RoutinelyAction) {
  switch (action.type) {

    case Actions.RequestActivities:
      return Object.assign({}, {
        ...state,
        isFetching: true
      })

    case Actions.ReceiveActivities:
      return Object.assign({}, {
        ...state,
        isFetching: false,
        activities: toEntityStore(action.activities)
      })

    case Actions.RequestActivityLogs:
      return Object.assign({}, {
        ...state,
        isFetching: true
      })

    case Actions.ReceiveActivityLogs:
      return Object.assign({}, {
        ...state,
        isFetching: false,
        logs: toEntityStore(action.activityLogs)
      })

    default:
      return state
  }
}

export default rootReducer
