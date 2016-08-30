import { combineReducers } from 'redux';
import {TEST, TEST_INCREMENT_COUNTER, TEST_DECREMENT_COUNTER} from '../Constants'

const test1 = (state = [], action) => {
    switch (action.type) {
        case TEST:
            return [...state, action.payload]
        default:
            return state
    }
}
const counter = (state = 0, action) => {
    switch (action.type) {
        case TEST_INCREMENT_COUNTER:
            return state + 1;
        case TEST_DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}

export const getCounter = (state) => state.Test.counter

/* Combine the Reducers into a single Reducer and Export the Reducer Module */
export default combineReducers({
    test1,
    counter
})