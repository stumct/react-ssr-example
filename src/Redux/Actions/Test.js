import {TEST_INCREMENT_COUNTER, TEST_DECREMENT_COUNTER} from '../Constants'

export const incrementCounter = () => {
    return {
        type:TEST_INCREMENT_COUNTER,
        payload:null
    }
}
export const decrementCounter = () => {
    return {
        type:TEST_DECREMENT_COUNTER,
        payload:null
    }
}