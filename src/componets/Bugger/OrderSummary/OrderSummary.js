import React, { Component } from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = props =>{
        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}</li>
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
                    <p><strong>Total Price : {props.price.toFixed(2)} $</strong></p>
                    <p>Continue to CheckOut : </p>
                    <Button btnTypes="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
                    <Button btnTypes="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
                </Aux>
            </div>
        );
    
}

export default orderSummary;