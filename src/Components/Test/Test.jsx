import React from 'react'
import {connect} from 'react-redux'
import {incrementCounter, decrementCounter} from '../../Redux/Actions/Test'
import {getCounter} from '../../Redux/Reducers/Test'

class Test extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <h1>This is the Test!!</h1>
            <h3>{this.props.counter}</h3>
            <button onClick={this.props.increment}>+</button>
            <button onClick={this.props.decrement}>-</button>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        counter: getCounter(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(incrementCounter()),
        decrement: () => dispatch(decrementCounter()),
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(Test)