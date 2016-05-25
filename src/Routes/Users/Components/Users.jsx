import React from 'react'
import {Link} from 'react-router';
import UserDetails from './Details.jsx'

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {users:[{
            username: "john23",
            name: "John",
            gender: "male",
            address: "123 Fake St.",
            
        },{
            username: "jill66",
            name: "Jill",
            gender: "female",
            address: "99 Happy Road.",
            
        },{
            username: "billy56",
            name: "William",
            gender: "male",
            address: "117 Country Road.",
            
        },{
            username: "david555",
            name: "David",
            gender: "male",
            address: "55 Cool Place.",
            
        }]}
    }
    render(){
        return(
            <div>
            <h1>This is the Users component!</h1>
            <ul> {this.state.users.map(u => <li key={u.username}><Link to={`/users/${u.username}`}>{u.name}</Link></li> )} </ul>
            {this.props.params.userid ? this.props.params.userid : null}
            {this.props.children}
            </div>
            )
    }

}

module.exports = Users