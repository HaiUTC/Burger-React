import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../componets/Order/Order';
import Spinner from '../../componets/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
const orders = props => {

    useEffect(() => {
        props.onFetchOrder(props.token, props.userId)
    }, [])

    let orders = <Spinner />
    if (!props.loadding) {
        orders = (
            props.order.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        )
    }
    return (
        <div>
            {orders}
        </div>
    )

}
const mapStateToProps = state => {
    return {
        order: state.order.order,
        loadding: state.order.loadding,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));