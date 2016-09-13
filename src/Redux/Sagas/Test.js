import { takeEvery, delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import {TEST_INCREMENT_COUNTER, TEST_DECREMENT_COUNTER} from '../Constants'

// Our worker Saga: will perform the async decrement task
export function* decrementAsync() {
  yield delay(1000)
  yield put({ type: TEST_DECREMENT_COUNTER })
}

// Our watcher Saga: spawn a new decrementAsync task on each TEST_INCREMENT_COUNTER
export function* watchIncrementAsync() {
  yield* takeEvery('TEST_INCREMENT_COUNTER', decrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    watchIncrementAsync(),
  ]
}