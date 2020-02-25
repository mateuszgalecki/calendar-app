import React, { Component } from 'react';
import './accountForms.scss';


class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createANewAccount(this.state.email, this.state.password);
        // this.props.showCalendar();
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
            <section className={this.props.showMe === 'signIn' ? 'onTheLeft fullScreen primaryView slideLeft' : 'onTheLeft fullScreen primaryView hideMe'}>
                <form className='primaryView' onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleEmailChange} value={this.state.email} type='email' placeholder='email'></input>
                    <input onChange={this.handlePasswordChange} value={this.state.password} type='text' placeholder='password' className='pushUp'></input>
                    <input type='submit' value='create a new account' className='pushUp add_res_button'></input>
                </form>
                <button className='back_button' onClick={this.props.goBack}>back</button>
            </section>
        )
    }
}

export default CreateAccount;