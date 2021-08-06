import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Product.css'
import * as actionTypes from '../../store/actionTypes'
import StarIcon from '@material-ui/icons/Star';
import Button from '../Button/Button'

class Product extends Component {

    render () {
        const itemAdded = {
            id: this.props.id,
            title: this.props.title,
            image: this.props.image,
            price: this.props.price,
            rating: this.props.rating
        }

        return (
            <div className="product" id={this.props.id}>
                <div className="product__info">
                    <p>{this.props.title}</p>
                    <p className="product__price">
                        <small>₹</small>
                        <strong>{this.props.price.toFixed(2)}</strong>
                    </p>
                    <div className="product__rating">
                        {
                            Array(this.props.rating).fill().map((_, i) => (
                                <p key={i}><StarIcon className="starIcon"/></p>
                            ))
                        }
                    </div>
                </div>
    
                <img src={this.props.image} alt="The lean start"/>
                
                <Button clicked={() => this.props.onItemAdded(itemAdded)}>Add to Cart</Button>
            </div>
        )
    }
    
}

// const mapStatetoProps = state => {
//     return {
//         cartItems: state.cart
//     }
// }

const mapDispatchtoProps = dispatch => {
    return {
        onItemAdded: (itemAdded) => dispatch({type: actionTypes.ADD_TO_CART, item: itemAdded})
    }
}

export default connect(null, mapDispatchtoProps)(Product)