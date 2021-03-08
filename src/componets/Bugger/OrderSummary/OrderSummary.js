import React, { Component } from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
                )
            })
        return (
            <div>
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients :</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price : {this.props.price.toFixed(2)} $</strong></p>
                    <p>Continue to CheckOut : </p>
                    <Button btnTypes="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                    <Button btnTypes="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
                </Aux>
            </div>
        );
    }
}

export default OrderSummary;