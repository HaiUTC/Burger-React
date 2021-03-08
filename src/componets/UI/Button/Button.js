import React from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import './Button.css'
const Button = (props) =>{
    return (
        <Aux>
            <button 
                disabled={props.disabled}
                className = {('Button ' + props.btnTypes )}
                onClick={props.clicked}>{props.children}</button>
        </Aux>
    );
}

export default Button;