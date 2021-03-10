import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../componets/Order/Order';
import Spinner from '../../componets/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder()
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loadding) {
            orders = (
                this.props.order.map(order => (
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
        );
    }
}
const mapStateToProps = state => {
    return {
        order: state.order.order,
        loadding: state.order.loadding
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));