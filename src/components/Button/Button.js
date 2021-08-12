import React from 'react'

import './Button.css'

function Button(props) {
    let classes = ['clickable']
    if (props.className) {
        classes.push(props.className)
    } 
    return (
        <button
            type={props.type ? props.type : null}
            disabled={props.disabled}
            className={classes.join(' ')}
            onClick={props.clicked}>{props.children}</button>
    )
}

export default Button
