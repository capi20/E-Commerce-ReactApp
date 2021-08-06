import React from 'react'
import './CartItem.css'
import StarIcon from '@material-ui/icons/Star';
import Button from '../Button/Button'
 
function CartItem(props) {
    return (
        <div className="cartItem">
            <img className="cartItem__image" src={props.image} alt="Product" />

            <div className="cartItem__info">
                <p className="cartItem__title">{props.title}</p>
                <p className="cartItem__price">
                    <small>₹</small>
                    <strong>{props.price}</strong>
                </p>
                <div className="cartItem__rating">
                    {
                        Array(props.rating).fill().map((_, i) => (
                            <p key={i}><StarIcon className="starIcon"/></p>
                        ))
                    }
                </div>
                <Button clicked={() => props.clicked(props.id)}>Remove from Cart</Button>
            </div>
        </div>
    )
}

export default CartItem
