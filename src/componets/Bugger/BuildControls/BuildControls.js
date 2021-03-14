import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css'


const controls = [
    { label : 'Salad', type : 'salad'},
    { label : 'Bacon', type : 'bacon'},
    { label : 'Cheese', type : 'cheese'},
    { label : 'Meat', type : 'meat'},
]

const BuildControls = (props) => {
    return (
        <div className='BuildControls'>
            <p>Current Price : <strong>{props.price.toFixed(2)} $</strong></p>
            { controls.map(ctr =>(
                <BuildControl 
                    key = {ctr.label}
                    label = {ctr.label}
                    added = {() => props.ingredientAdded(ctr.type)}
                    removed = {() => props.ingredientRemove(ctr.type)}
                    disabled = {props.disabled[ctr.type]}/>
            ))}
            <button 
                className='OrderButton'
                disabled={!props.purchaseable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Signin to order.'}</button>
        </div>
    );
}

export default BuildControls;