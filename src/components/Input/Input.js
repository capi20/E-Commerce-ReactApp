import React from 'react'

import './Input.css'

const input = (props) => {
    let inputElement = null
    const inputClasses = ['input__Element']

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid')
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>
            break
        case ('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>
            break
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = <input className='input__Element' {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className='input'>
            <label className='input__label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input