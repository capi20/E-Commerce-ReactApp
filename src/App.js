import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Home from './containers/Home/Home'
import Checkout from './containers/Checkout/Checkout'
import Login from './containers/Login/Login'
import Payment from './containers/Payment/Payment'
import Orders from './containers/Orders/Orders'
import { auth } from './firebase'
import * as actionTypes from './store/actionTypes'

function App(props) {
  useEffect(() => {
    // Will only run once when the app component loads...
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        props.userAuth(authUser)
      } else {
        props.userAuth(null)
      }
    })
  }, [])

    return (
        <div className="app">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/payment" component={Payment} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
    );
}

const mapDispatchtoProps = dispatch => {
  return {
      userAuth: (authUser) => dispatch({type: actionTypes.SET_USER, user: authUser})
  }
}

export default connect(null, mapDispatchtoProps)(App);
