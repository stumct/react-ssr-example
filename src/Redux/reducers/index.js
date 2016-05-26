import { combineReducers } from 'redux'
import { TEST } from '../actions'

function test(state = [], action) {
  switch (action.type) {
    case TEST:
      return state
    default:
    return state
  }
}

const reducers = combineReducers({
  test
})

export default reducers