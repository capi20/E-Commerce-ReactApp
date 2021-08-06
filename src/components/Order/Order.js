import React from 'react'

import './Order.css'
import { formatNumber } from '../../utility/formatNumber'

function Order(props) {
    
    const orderDisplay = props.items.map(item => {
        return (
            <div className="order__container">
                <img className="order__image" src={item.image} alt="Product"/>
                <div className="order__info">
                    <p className="order__title">{item.title}</p>
                    <p className="order__price">
                        <small>₹</small>
                        {formatNumber(item.price)}</p>
                </div>
            </div>
        )
    })
    return(
        <div className='order'>
            {orderDisplay}
        </div>
    )
}

export default Order
