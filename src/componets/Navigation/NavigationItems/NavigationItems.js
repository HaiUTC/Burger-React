import React from 'react';
import NavigationItem from './NavigationItem.js/NavigationItem';
import './NavigationItems.css'
const NavigationItems = (props) =>{
    return (
        <ul className='NavigationItems'>
            
            <NavigationItem link='/' exact>Bugger Bilder</NavigationItem>
            {props.isAuthenticated 
                ? <NavigationItem link='/order'>CheckOut</NavigationItem>
                : null}
            {!props.isAuthenticated 
                ? <NavigationItem link='/auth'>Login</NavigationItem>
                : <NavigationItem link='/logout'>Logout</NavigationItem>}
        </ul>
    );
}

export default NavigationItems;