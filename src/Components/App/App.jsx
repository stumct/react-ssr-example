import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render(){
        return(
            <div>
                <h1>React Universal App Example</h1>
                <p>includes: server side rendering, react-router, webpack code splitting</p>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
                {this.props.children}
            </div>)
    }
}

module.exports = App