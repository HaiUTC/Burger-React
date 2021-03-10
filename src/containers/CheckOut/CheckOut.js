import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import CheckOutSummary from '../../componets/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData';
class CheckOut extends Component {
    componentDidMount() {
     
    }


    onCheckOutCanceledHandler = () => {
        this.props.history.goBack()
    }

    onCheckOutContinueHandler = () => {
        this.props.history.replace('/check-out/contact-data')
    }

    render() {
        let summary = <Redirect to='/' />

        if (this.props.ings) {
            console.log(this.props.purchase)
            const purchaseRedirect = this.props.purchase ? <Redirect to='/'/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ings}
                        onCheckOutCanceled={this.onCheckOutCanceledHandler}
                        onCheckOutContinue={this.onCheckOutContinueHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return (
            summary
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.buggerBuilder.ingredients,
        purchase : state.order.purchase
    }
}





export default connect(mapStateToProps)(CheckOut)