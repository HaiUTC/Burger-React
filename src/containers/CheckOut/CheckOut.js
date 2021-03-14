import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import CheckOutSummary from '../../componets/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData';
const checkOut = props => {

    const onCheckOutCanceledHandler = () => {
        props.history.goBack()
    }

    const onCheckOutContinueHandler = () => {
        props.history.replace('/check-out/contact-data')
    }

    let summary = <Redirect to='/' />

    if (props.ings) {
        const purchaseRedirect = props.purchase ? <Redirect to='/' /> : null
        summary = (
            <div>
                {purchaseRedirect}
                <CheckOutSummary
                    ingredients={props.ings}
                    onCheckOutCanceled={onCheckOutCanceledHandler}
                    onCheckOutContinue={onCheckOutContinueHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
    return (
        summary
    );

}

const mapStateToProps = (state) => {
    return {
        ings: state.buggerBuilder.ingredients,
        purchase: state.order.purchase
    }
}





export default connect(mapStateToProps)(checkOut)