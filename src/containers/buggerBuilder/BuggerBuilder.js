import React, { Component } from 'react';
import axios from '../../axios-orders';
import Bugger from '../../componets/Bugger/Bugger';
import BuildControls from '../../componets/Bugger/BuildControls/BuildControls';
import OrderSummary from '../../componets/Bugger/OrderSummary/OrderSummary';
import Modal from '../../componets/UI/Modal/Modal';
import Spinner from '../../componets/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxx/Auxx';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 2.0
}

class BuggerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error : false
    }

    componentDidMount() {
        axios.get('https://my-app-ec6b3-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({error : true})
            })
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        this.setState({
            purchaseable: sum > 0
        })
    }

    addingIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrices = this.state.totalPrice
        const newPrices = oldPrices + priceAddition
        this.setState({
            totalPrice: newPrices,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)

    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) return
        const removeCount = oldCount - 1
        const removeIngredients = {
            ...this.state.ingredients
        }
        removeIngredients[type] = removeCount
        const priceRemoving = INGREDIENT_PRICES[type]
        const oldPrices = this.state.totalPrice
        const newPrices = oldPrices - priceRemoving
        this.setState({
            totalPrice: newPrices,
            ingredients: removeIngredients
        })
        this.updatePurchaseState(removeIngredients)
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
        // alert('Continue')
       
        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname : '/check-out',
            search : '?' + queryString
        })

    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let bugger = this.state.error ? <p>Ingredients can't be loaded.</p> :<Spinner />
        if (this.state.ingredients) {
            bugger = (
                <Aux>
                    <Bugger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addingIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default BuggerBuilder