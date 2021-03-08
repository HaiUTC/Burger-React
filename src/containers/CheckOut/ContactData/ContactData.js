import React, { Component } from 'react';
import Button from '../../../componets/UI/Button/Button';
import Spinner from '../../../componets/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import './ContactData.css'
import Input from '../../../componets/UI/Input/Input';
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
        formIsValid : false,
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault()
        // console.log(this.props.ingredients)
        this.setState({ loading: true })
        const formData = {}
        for(let formEle in this.state.orderForm.customer){
            formData[formEle] = this.state.orderForm.customer[formEle].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData
        }
        axios.post('/orders.json', order)
            .then(resposive => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false })
            })
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
        if (this.state.loading) form = <Spinner />
        return (
            <div className='ContactData'>
                <h4>Enter yor Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;