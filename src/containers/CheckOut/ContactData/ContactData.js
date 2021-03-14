import React, { useState } from 'react';
import { connect } from 'react-redux'
import Button from '../../../componets/UI/Button/Button';
import Spinner from '../../../componets/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import './ContactData.css'
import Input from '../../../componets/UI/Input/Input';
import * as actions from '../../../store/actions/index'
import { checkValidity } from '../../../hoc/shared/shared'
import withErrorHander from '../../../hoc/withErrorHandler/withErrorHandler'
const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        customer: {
            name: {
                elementType: 'input',
                elementConfig: {
                    name: 'name',
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
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    name: 'street',
                    type: 'text',
                    placeholder: 'Your Street'
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
                    name: 'zipcode',
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    name: 'contry',
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    name: 'delivery',
                    options: [
                        { value: 'faster', displayValue: 'Faster' },
                        { value: 'cheeper', displayValue: 'Cheeper' }]
                },
                value: '',
                validation: {},
                valid: false
            }

        }
    })
    const [formIsValid, setFormIsValid] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let formEle in orderForm.customer) {
            formData[formEle] = orderForm.customer[formEle].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBugger(order, props.token)
    }

    const inputChangedHandler = (event, id) => {
        const updateOrderForm = {
            ...orderForm
        }
        const updateOrderFormCustomer = {
            ...orderForm.customer
        }
        const updateFormElement = {
            ...updateOrderFormCustomer[id]
        }

        updateFormElement.value = event.target.value
        updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true
        updateOrderFormCustomer[id] = updateFormElement
        updateOrderForm.customer = updateOrderFormCustomer

        let formIsValid = true
        for (let inputID in updateOrderFormCustomer) {
            formIsValid = updateOrderFormCustomer[inputID].valid && formIsValid
        }
        setOrderForm(updateOrderForm)
        setFormIsValid(formIsValid)
    }

    const formElementArray = []
    for (let key in orderForm.customer) {
        formElementArray.push({
            id: key,
            config: orderForm.customer[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(fe => (
                <Input
                    key={fe.id}
                    elementType={fe.config.elementType}
                    elementConfig={fe.config.elementConfig}
                    value={fe.config.value}
                    invalid={!fe.config.valid}
                    shouldValidate={fe.config.validation}
                    touched={fe.config.touched}
                    changed={(event) => inputChangedHandler(event, fe.id)} />
            ))}
            <Button
                btnTypes='Success'
                clicked={orderHandler}
                disabled={!formIsValid}>ORDER</Button>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className='ContactData'>
            <h4>Enter yor Contact Data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        ings: state.buggerBuilder.ingredients,
        price: state.buggerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBugger: (orderData, token) => { dispatch(actions.purchaseBugger(orderData, token)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHander(contactData, axios));