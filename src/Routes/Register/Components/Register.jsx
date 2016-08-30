import React from 'react'
import RegisterForm from '../../../Components/RegisterForm'

class RegisterRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<RegisterForm/>)
    }
}

module.exports = RegisterRoute