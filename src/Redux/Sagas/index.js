import RootTestSaga from './Test'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    RootTestSaga(),
  ]
}