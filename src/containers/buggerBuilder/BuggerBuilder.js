import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Bugger from '../../componets/Bugger/Bugger';
import BuildControls from '../../componets/Bugger/BuildControls/BuildControls';
import OrderSummary from '../../componets/Bugger/OrderSummary/OrderSummary';
import Modal from '../../componets/UI/Modal/Modal';
import Spinner from '../../componets/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxx/Auxx';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


const buggerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredient()
    }, [])

    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum > 0
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        }
        else {
            props.onSetRedirectPath('/check-out')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/check-out')

    }

    const disableInfo = {
        ...props.ings
    }
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null
    let bugger = props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
    if (props.ings) {
        bugger = (
            <Aux>
                <Bugger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemove={props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchaseable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    price={props.price}
                    isAuth={props.isAuthenticated} />

            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseContinue={purchaseContinueHandler}
            purchaseCancel={purchaseCancelHandler}
            price={props.price} />
    }

    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {bugger}
        </Aux>
    );

}

const mapStateToProps = (state) => {
    return {
        ings: state.buggerBuilder.ingredients,
        price: state.buggerBuilder.totalPrice,
        error: state.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(buggerBuilder, axios))