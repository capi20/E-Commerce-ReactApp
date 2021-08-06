import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'
import { auth } from '../../firebase'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    inputChangedHandler = (event, identifier) => {
        if (identifier === 'email'){
            this.setState({email: event.target.value})
        } else if (identifier === 'password'){
            this.setState({password: event.target.value})
        }  
    }
    
    signInHandler = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((auth) => {
                if ( auth ) {
                    this.props.history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    signUpHandler = event => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((auth) => {
                if ( auth ) {
                    this.props.history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    render () {
        return (
            <div className="login">
                <Link to="/">
                    <img 
                        className="login__logo" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                        alt="Amazon Logo"/>
                </Link>
                <div className="login__container">
                    <h1>Sign-in</h1>
    
                    <form>
                        <h5>E-mail</h5>
                        <input 
                            type="text" 
                            value={this.state.email} 
                            onChange={(event) => this.inputChangedHandler(event, 'email')}/>
    
                        <h5>Password</h5>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            onChange={(event) => this.inputChangedHandler(event, 'password')}/>
    
                        <button type="submit" className="login__signInButton" onClick={this.signInHandler}>Sign In</button>
                    </form>
                    <p>
                        By signing-in you agree to Amazon's Conditions of Use & Sale.
                        Please see our Privacy Notice, our Cookies Notice and our Internet-Based Ads Notice.
                    </p>
                    <button className="login__signUpButton" onClick={this.signUpHandler}>Create your Amazon account</button>
                </div>    
            </div>
        )
    }    
}

export default Login
