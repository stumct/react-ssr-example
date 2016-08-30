import React from 'react'
import LoginForm from '../../../Components/LoginForm'

class LoginRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<LoginForm/>)
    }
}

module.exports = LoginRoute