import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'
import { auth } from '../../firebase'
import Button from '../../components/Button/Button'

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
                    this.props.history.goBack()
                }
            })
            .catch(error => alert(error.message))
    }

    signUpHandler = event => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((auth) => {
                if ( auth ) {
                    this.props.history.goBack()
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
    
                        <Button type="submit" className="login__signInButton" clicked={this.signInHandler}>Sign In</Button>
                    </form>
                    <p>
                        By signing-in you agree to our Conditions of Use & Sale.
                        Please see our Privacy Notice, our Cookies Notice and our Internet-Based Ads Notice.
                    </p>
                    <Button className="login__signUpButton" clicked={this.signUpHandler}>Create your account</Button>
                </div>    
            </div>
        )
    }    
}

export default Login
