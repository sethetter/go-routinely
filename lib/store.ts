import {
  createStore,
  applyMiddleware,
  Middleware
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

let middleware: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, createLogger()]
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

export default store