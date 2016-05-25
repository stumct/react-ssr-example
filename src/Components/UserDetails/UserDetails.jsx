import React from 'react';
import {Link} from 'react-router';

const UserDetails = (props) => {
    return(
        <div>
            <p>UserDetails for user {props.params.userid}</p>
        </div>
        )
}

module.exports = UserDetails;