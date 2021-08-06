import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import './Checkout.css'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import CartItem from '../../components/CartItem/CartItem'
import * as actionTypes from '../../store/actionTypes'
import Header from '../../components/Header/Header'
import Aux from '../../hoc/Auxi'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.replace('/')
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        const contactForm = this.props.purchasingState
                            ? <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                            : null
        return (
            <Aux>
                <Header/>
                <div className="checkout">
                    <div className="checkout__left">
                        <img className="checkout__ad"
                            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492688_/jpg"
                            alt="Ad" /> 
        
                        <div>
                            <h2 className="checkout__title">{this.props.purchasingState ? 
                                'Your Shopping Cart' : 
                                'Your Shopping Cart is empty. Please add some items.'}</h2>
                            { this.props.cartItems.map((item, i) => {
                                return <CartItem
                                    key={i}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    clicked={this.props.OnItemRemoved} />
                                }
                            )}
                        </div>
                    </div>
        
                    <div className="checkout__right">
                        <CheckoutSummary
                            totalAmount={this.props.totalAmount}
                            totalItems={this.props.totalItems}
                            purchasingState={this.props.purchasingState}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}/>
                        {contactForm}
                    </div>
                </div> 
            </Aux> 
        )
    }
}

const mapStatetoProps = state => {
    return {
        cartItems: state.shopping.cart,
        user: state.shopping.user,
        totalAmount: state.shopping.amount,
        totalItems: state.shopping.count,
        purchasingState: state.shopping.purchasing
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        OnItemRemoved: (itemRemovedId) => dispatch({type: actionTypes.REMOVE_FROM_CART, itemId: itemRemovedId})
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout)
