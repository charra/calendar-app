import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'
import { getStorage } from '../utils/storage'

export const history = createHistory()

const stateObj = {
  loading: false,
  modal: { 
      show: false,
      message: ''
    },
  places: {},
  events: {}
}
const initialState = getStorage('places') ? getStorage('places') : stateObj
initialState.modal = { 
  show: false,
  message: ''
}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

/* if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
} */

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store

