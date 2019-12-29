import React, { Component } from 'react';
import './accountForms.scss';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.email, this.state.password)
        this.props.createANewAccount(this.state.email, this.state.password);
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return(
            <section className='onTheRight fullScreen primaryView'>
                <form className='primaryView' onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleEmailChange} value={this.state.email} type='email' placeholder='email'></input>
                    <input onChange={this.handlePasswordChange} value={this.state.password} type='text' placeholder='password' className='pushUp'></input>
                    <input type='submit' value='log in' className='pushUp'></input>
                </form>
                <p></p>
            </section>
        )
    }
}

export default LogIn;