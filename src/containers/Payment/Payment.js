import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import './Payment.css'
import Header from '../../components/Header/Header'
import Aux from '../../hoc/Auxi'
import * as actionTypes from '../../store/actionTypes'
import { formatNumber } from '../../utility/formatNumber'
import Button from '../../components/Button/Button'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import Product from '../../components/Product/Product'

class Payment extends Component {
    orderHandler = (event) => {
        event.preventDefault()

        const orderData = {
            contactData: this.props.contact,
            amount: this.props.totalAmount,
            orderedItems: this.props.cartItems,
            totalItems: this.props.totalItems
        }

        this.props.onPurchaseStart()
        axios.post('/orders.json', orderData)
            .then(response => {
                this.props.onPurchaseSuccess(response.data.name, orderData)
            })
            .catch(error => {
                this.props.onPurchaseFail(error)
            })
    }

    render () {
        let summary = <Redirect to="/" />

        if (this.props.totalItems > 0) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div className="payment">
                {purchasedRedirect}
                    <div className="payment__container">
                        <h1>
                            Checkout (
                                <Link to='/checkout' style={{textDecoration: 'none'}}>{this.props.cartItems.length} items</Link>
                            )
                        </h1>

                        <div className="payment__section">
                            <div className="payment__title">
                                <h3>Delivery Address</h3>
                            </div>
                            <div className="payment__address">
                                {
                                    Object.entries(this.props.contact).map(obj => {
                                        let key   = obj[0];
                                        key = key.substr(0,1).toUpperCase() + key.substr(1,)
                                        const value = obj[1];
                                        return <p className="payment__addressField">{key}: {value}</p>
                                    })
                                }
                            </div>
                        </div>
        
                        <div className="payment__section">
                            <div className="payment__title">
                                <h3>Review items and delivery</h3>
                            </div>
                            <div className="payment__items">
                                { this.props.cartItems.map((item, i) => {
                                    return <Product 
                                            key={i}
                                            id={item.id}
                                            title={item.title}
                                            image={item.image}
                                            price={item.price}
                                            rating={item.rating}
                                            clicked={this.props.onItemRemoved}
                                            btnType="remove"/>
                                    }
                                )}
                            </div>
                        </div>
                        <div className="payment__section">
                            <div className="payment__title">
                                <h3>Total Payment</h3>
                            </div>
                            <div className="payment__total">
                                <p>
                                    <small>₹</small>
                                    <strong>{formatNumber(this.props.totalAmount)}</strong>
                                </p>
                                <Button clicked={this.orderHandler} disabled={false}>Order</Button>
                            </div>
                        </div>
                    </div>            
                </div>
            )

            if (this.props.loading) {
                summary = <Spinner/>
            }
        }
        

        return (
            <Aux>
                <Header totalItems={this.props.totalItems} user={this.props.user}/>
                {summary}
            </Aux>
        )
    }
    
}

const mapStatetoProps = state => {
    return {
        cartItems: state.shopping.cart,
        user: state.shopping.user,
        contact: state.shopping.contactData,
        totalAmount: state.shopping.amount,
        totalItems: state.shopping.count,
        purchased: state.order.purchased,
        loading: state.order.loading
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onItemRemoved: (itemRemovedId) => dispatch({type: actionTypes.REMOVE_FROM_CART, itemId: itemRemovedId}),
        onPurchaseStart: () => dispatch({type: actionTypes.PLACE_ORDER_START}),
        onPurchaseSuccess: (id, orderData) => dispatch({type: actionTypes.PLACE_ORDER_SUCCESS,  orderId: id, orderData: orderData}),
        onPurchaseFail: (error) => dispatch({type: actionTypes.PLACE_ORDER_FAIL, error: error})
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Payment)
