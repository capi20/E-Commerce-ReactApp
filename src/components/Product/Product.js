import React from 'react'

import './Product.css'
import StarIcon from '@material-ui/icons/Star';
import Button from '../Button/Button'
import { formatNumber } from '../../utility/formatNumber'

function Product(props) {
        const itemAdded = {
            id: props.id,
            title: props.title,
            image: props.image,
            price: props.price,
            rating: props.rating
        }

        return (
            <div className="product" id={props.id}>
                <div className="product__info">
                    <p>{props.title}</p>
                    <p className="product__price">
                        <small>₹</small>
                        <strong>{formatNumber(props.price)}</strong>
                    </p>
                    <div className="product__rating">
                        {
                            Array(props.rating).fill().map((_, i) => (
                                <p key={i}><StarIcon className="starIcon"/></p>
                            ))
                        }
                    </div>
                </div>
    
                <img src={props.image} alt="The lean start"/>
                
                <Button clicked={() => props.clicked(itemAdded)}>Add to Cart</Button>
            </div>
        )
    }


export default Product