import React from 'react';
import './SideDraw.css'
import Aux from '../../../hoc/Auxx/Auxx';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDraw = (props) => {

    let attachedClasses = ['SideDraw','Close']
    if(props.open){
        attachedClasses = ['SideDraw', 'Open']
    }
    return (
       <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className='LogoSideDraw'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
       </Aux>
    );
}

export default SideDraw;