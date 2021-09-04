import React from 'react'

import './Order.css'
import Product from '../Product/Product'

function Order(props) {
    
    const orderDisplay = props.items.map((item, i) => {
        return <Product 
                    key={i}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}/>
    })
    return(
        <div className='order'>
            {orderDisplay}
        </div>
    )
}

export default Order
