import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import CheckOutSummary from '../../componets/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData';
class CheckOut extends Component {
    state = {
        ingredients : {
            salad : 1,
            meat : 1,
            bacon : 1,
            cheese : 1
        },
        totalPrices : 0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1]
            }
            else{
                ingredients[param[0]] = +param[1]
            }
            
        }
        this.setState({ingredients : ingredients, totalPrices: price})
    }
    

    onCheckOutCanceledHandler = () =>{
        this.props.history.goBack()
    }

    onCheckOutContinueHandler = () =>{
        this.props.history.replace('/check-out/contact-data')
    }
    render() {
        return (
            <div>
                <CheckOutSummary 
                    ingredients={this.state.ingredients}
                    onCheckOutCanceled={this.onCheckOutCanceledHandler}
                    onCheckOutContinue={this.onCheckOutContinueHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props)=> ( <ContactData ingredients={this.state.ingredients} price={this.state.totalPrices} {...props}/>)}/>
            </div>
        );
    }
}

export default CheckOut;