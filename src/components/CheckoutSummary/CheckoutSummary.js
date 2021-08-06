import React from 'react'

import './CheckoutSummary.css'
import { formatNumber } from '../../utility/formatNumber'
import Button from '../Button/Button'

function CheckoutSummary(props) {
    return (
        <div className="checkoutSummary">
            <p>Subtotal ({ props.totalItems } items): ₹<strong>{formatNumber(props.totalAmount)}</strong></p>
            <small className="checkoutSummary__gift">
                <input type="checkbox"/>This order contains a gift
            </small>

            <Button disabled={!props.purchasingState} clicked={props.checkoutContinued}>Proceed to Checkout</Button>
            <Button clicked={props.checkoutCancelled}>Continue Shopping</Button>
        </div>
    )
}

export default CheckoutSummary
