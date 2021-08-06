import React from 'react'

import './Button.css'

function Button(props) {
    return (
        <button
            disabled={props.disabled}
            className='buttonClickable'
            onClick={props.clicked}>{props.children}</button>
    )
}

export default Button
