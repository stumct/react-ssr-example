import React from 'react'
import {connect} from 'react-redux'
import {register} from '../../Redux/Actions/Session'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = { email: '', password: '' }
    }
    render() {
        return (<div>
            <h1>This is the Register!!</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handlePasswordChange}/>
                </div>

                <button type="submit" className="btn btn-warning btn-lg">Signup</button>
            </form>

        </div>)
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value.trim() })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value.trim() })
    }
    handleSubmit(e) {
        const {email, password} = this.state;
        e.preventDefault();
        console.log(email, password)
        if (email && password) {
            this.props.register(email, password)
        }
        return false;
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(register(email, password))
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)