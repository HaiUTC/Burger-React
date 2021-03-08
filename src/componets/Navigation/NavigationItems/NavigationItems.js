import React from 'react';
import NavigationItem from './NavigationItem.js/NavigationItem';
import './NavigationItems.css'
const NavigationItems = (props) =>{
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/' exact>Bugger Bilder</NavigationItem>
            <NavigationItem link='/order'>CheckOut</NavigationItem>
        </ul>
    );
}

export default NavigationItems;