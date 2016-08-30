import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getIsAuthenticated} from '../../Redux/Reducers/Session'

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {isAuthenticated, logout} = this.props
        return (<div>
            <h1>React SSR Boilerplate</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Test</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                {isAuthenticated ? <li><Link to="/account">Account</Link></li> : null}
                {isAuthenticated ? <li><a href="#" onClick={logout}>Log Out</a></li> : null}                
            </ul>
            {this.props.children}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsAuthenticated(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout)
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(App)