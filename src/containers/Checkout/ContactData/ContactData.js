import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/Button/Button'
import './ContactData.css'
import Input from '../../../components/Input/Input'
import * as actionTypes from '../../../store/actionTypes'

class ContactData extends Component {
    state = {
        contactForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    contactDataHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let formElementIndentifier in this.state.contactForm) {
            formData[formElementIndentifier] = this.state.contactForm[formElementIndentifier].value
        }

        this.props.onAddedData(formData)
        this.props.orderInit()
        this.props.history.push('/payment')
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.contactForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({contactForm: updatedOrderForm, formIsValid: formIsValid})
    }
    render() { 
        const formElementsArray = []
        for (let key in this.state.contactForm) {
            formElementsArray.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }
        let form = (
            <form onSubmit={this.contactDataHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.formIsValid} clicked={this.contactDataHandler}>Continue</Button>
            </form>
        )
        // if (this.props.loading) {
        //     form = <Spinner/>
        // }
        return (
            <div className='contactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onAddedData: (formData) => dispatch({type: actionTypes.SET_CONTACT_DATA, data: formData}),
        orderInit: () => dispatch({type: actionTypes.ORDER_INIT})
    }
}

export default connect(null, mapDispatchtoProps)(ContactData)