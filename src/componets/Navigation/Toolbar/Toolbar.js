import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';
import './ToolBar.css'
const Toolbar = (props) => {
    return (
        <header className='ToolBar'>
            <DrawToggle clicked={props.drawToggleClick}/>
            <div className='LogoToolBar'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;