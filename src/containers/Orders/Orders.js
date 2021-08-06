import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Orders.css'
import Spinner from '../../components/Spinner/Spinner'
import * as actionTypes from '../../store/actionTypes'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Header from '../../components/Header/Header'
import Aux from '../../hoc/Auxi'
import Button from '../../components/Button/Button'

class Orders extends Component {
    componentDidMount () {
        this.onFetchOrders()
    }

    onFetchOrders = () => {
        this.props.onFetchOrdersStart()
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data) {
                    if (res.data[key].contactData.email === this.props.user.email) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        })
                    }  
                }
                this.props.onFetchOrdersSuccess(fetchedOrders)
            })
            .catch(err => {
                this.props.onFetchOrdersFail(err)
            })
    }

    render() {
        let orders = <Redirect to="/login" />
        let orderTitle = null
        if (this.props.user) {
            orders = <Spinner />
            if (!this.props.loading) {
                if (this.props.orders.length === 0) {
                    orders = <div className="order__msg">
                                <p>You haven't placed any order yet!</p>
                                <Button clicked={() => this.props.history.push('/')}>Continue Shopping</Button>
                            </div>
                }
                else {
                    orderTitle = <h1>Your Orders</h1>
                    orders = <div class="orderPage">
                                {orderTitle}
                                {
                                    this.props.orders.map(order => (
                                        <Order 
                                            key={order.id}
                                            items={order.orderedItems}/>))
                                }
                            </div>
                }      
            }
        }
        
        return(
            <Aux>
                <Header/>
                {orders}       
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        user: state.shopping.user
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrdersStart: () => dispatch({type: actionTypes.FETCH_ORDERS_START}),
        onFetchOrdersSuccess: (fetchedOrders) => dispatch({type: actionTypes.FETCH_ORDERS_SUCCESS, orders: fetchedOrders}),
        onFetchOrdersFail: (err) => dispatch({type: actionTypes.FETCH_ORDERS_FAIL, error: err})
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Orders)
