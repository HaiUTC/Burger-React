import React from 'react';
import './Bugger.css'
import BuggerIngredients from './BuggerIngredients/BuggerIngredients'
const Bugger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BuggerIngredients key={igKey+i} type={igKey}/>
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[])
        if(transformIngredients.length === 0 ){
            transformIngredients = <p>Please start adding ingredients</p>
        }
    return (
        <div className='Bugger'>
            <BuggerIngredients type='bread-top'/>
            {transformIngredients}
            <BuggerIngredients type='bread-bottom'/>
        </div>
    );
}

export default Bugger;