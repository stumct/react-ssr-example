import React from 'react';
import {Link} from 'react-router';

const Details = (props) => {
    return(
        <div>
            <p>Details for user {props.params.userid}</p>
            <br />
            <p><Link to="/users"> ...Back to Users</Link></p>
        </div>
        )
}

module.exports = Details;