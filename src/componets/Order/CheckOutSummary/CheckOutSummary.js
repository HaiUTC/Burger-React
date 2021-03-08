import React from 'react'
import Bugger from '../../Bugger/Bugger'
import Button from '../../UI/Button/Button'
import './CheckOutSummary.css'

const CheckOutSummary = (props) =>{
    return (
        <div className='CheckOutSummary'>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Bugger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnTypes='Danger'
                clicked={props.onCheckOutCanceled}>CANCEL</Button>
            <Button 
                btnTypes='Success'
                clicked={props.onCheckOutContinue}>CONTINUE</Button>
        </div>
    )
}

export default CheckOutSummary

