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
                <img src={props.image} alt={props.title}/>
                <div className="product__right">
                    <div className="product__info">
                        <p>{props.title}</p>
                        <p className="product__price">
                            <small>₹</small>
                            <strong>{formatNumber(props.price)}</strong>
                        </p>
                        <div className="product__rating">
                            {
                                Array(props.rating).fill().map((_, i) => (
                                    <span key={i}><StarIcon className="starIcon"/></span>
                                ))
                            }
                        </div>
                    </div>
                    {
                        props.btnType === 'add' 
                        ? <Button clicked={() => props.clicked(itemAdded)}>Add to Cart</Button>
                        : null
                    }
                    {
                        props.btnType === 'remove' 
                        ? <Button clicked={() => props.clicked(props.id)}>Remove from Cart</Button>
                        : null
                    }
                    
                </div>
            </div>
        )
    }


export default Product