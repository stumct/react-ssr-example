import React from 'react'
import {Link} from 'react-router';

class About extends React.Component {
    constructor(props){
        super(props);
        this.state = {text:'', list:[]}
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    
    componentWillMount() {
        this.setState({text: 'HERE IS SOME TEXT FROM THE SERVER: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'})
    }
    componentDidMount() {
        this.setState({text: 'this is some client text'})
    }   
    
    render(){
    return(
        <div>
        <h1>This is the About component!<Link to="about/foo">Foo</Link> {this.props.children}</h1>
        <p>{this.state.text}</p>
        <button onClick={() => this.handleButtonClick()}>List!</button>
        <ul>
        {this.state.list.map(i => <li key={i}>{i}</li>)}
        </ul>
        </div>
        )
    }
    handleButtonClick(){
        console.log('button click')
        this.setState({list: [0,1,2,3,4,5,6,7,8]})
    }
}

module.exports = About