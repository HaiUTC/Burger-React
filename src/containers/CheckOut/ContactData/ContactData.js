import React, { Component } from 'react';
import { connect }  from 'react-redux'
import Button from '../../../componets/UI/Button/Button';
import Spinner from '../../../componets/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import './ContactData.css'
import Input from '../../../componets/UI/Input/Input';
import * as actions from '../../../store/actions/index'
import withErrorHander  from '../../../hoc/withErrorHandler/withErrorHandler'
class ContactData extends Component {
    state = {
        orderForm: {
            customer: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        name: 'email',
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation :{
                        required : true,
                        isEmail : true
                    },
                    valid : false,
                    touched : false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        name: 'street',
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        name: 'zipcode',
                        type: 'text',
                        placeholder: 'Your ZipCode'
                    },
                    value: '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        name: 'contry',
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        name: 'delivery',
                        options: [
                            { value: 'faster', displayValue: 'Faster' },
                            { value: 'cheeper', displayValue: 'Cheeper' }]
                    },
                    value : '',
                    validation : {},
                    valid : false
                }

            }
        },
        formIsValid : false
    }
    orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for(let formEle in this.state.orderForm.customer){
            formData[formEle] = this.state.orderForm.customer[formEle].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData : formData
        }
        this.props.onOrderBugger(order)
    }

    checkValidity (value , rules){
        let isValid = true
        let regex = /\S+@\S+\.\S+/

        if(!rules) return true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.isEmail){
            isValid = regex.test(value) && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, id) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateOrderFormCustomer = {
            ...this.state.orderForm.customer
        }
        const updateFormElement = {
            ...updateOrderFormCustomer[id]
        }

        updateFormElement.value = event.target.value
        updateFormElement.valid = this.checkValidity(updateFormElement.value,updateFormElement.validation )
        updateFormElement.touched = true
        updateOrderFormCustomer[id] = updateFormElement      
        updateOrderForm.customer = updateOrderFormCustomer

        let formIsValid = true
        for(let inputID in updateOrderFormCustomer){
            formIsValid = updateOrderFormCustomer[inputID].valid && formIsValid
        }
        this.setState({ orderForm: updateOrderForm , formIsValid : formIsValid})
    }

    render() {
        const formElementArray = []
        for (let key in this.state.orderForm.customer) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm.customer[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(fe => (
                    <Input
                        key={fe.id}
                        elementType={fe.config.elementType}
                        elementConfig={fe.config.elementConfig}
                        value={fe.config.value}
                        invalid={!fe.config.valid}
                        shouldValidate={fe.config.validation}
                        touched={fe.config.touched}
                        changed={(event) => this.inputChangedHandler(event, fe.id)} />
                ))}
                <Button
                    btnTypes='Success'
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.props.loading) form = <Spinner />
        return (
            <div className='ContactData'>
                <h4>Enter yor Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        ings : state.buggerBuilder.ingredients,
        price : state.buggerBuilder.totalPrice,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBugger : (orderData) =>{dispatch(actions.purchaseBugger(orderData))}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHander(ContactData,axios));