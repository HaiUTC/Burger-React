import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders';
import Bugger from '../../componets/Bugger/Bugger';
import BuildControls from '../../componets/Bugger/BuildControls/BuildControls';
import OrderSummary from '../../componets/Bugger/OrderSummary/OrderSummary';
import Modal from '../../componets/UI/Modal/Modal';
import Spinner from '../../componets/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxx/Auxx';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'


class BuggerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredient()
    }
    
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum>0
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/check-out')

    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let bugger = this.props.error ? <p>Ingredients can't be loaded.</p> :<Spinner />
        if (this.props.ings) {
            bugger = (
                <Aux>
                    <Bugger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                price={this.props.price} />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {bugger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        ings : state.buggerBuilder.ingredients,
        price : state.buggerBuilder.totalPrice,
        error : state.error
    }
}

const mapDispathToProps = (dispatch) =>{
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient : () => dispatch(actions.initIngredient()),
        onInitPurchase : () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispathToProps)(withErrorHandler(BuggerBuilder,axios))