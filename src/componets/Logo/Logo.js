import React from 'react';
import buggerLogo from '../../assets/image/burger-logo.png.png'
import './Logo.css'
const Logo = (props) =>{
    return (
        <div className='Logo'>
            <img src={buggerLogo} alt="My Logo"/>
        </div>
    );
}

export default Logo;