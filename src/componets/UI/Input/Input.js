import React from 'react';
import './Input.css'
const Input = (props) =>{
    let inputElement = null
    let inputArray = []

    if(props.invalid && props.shouldValidate && props.touched){
        inputArray.push('Invalid')
    }

    switch(props.elementType){
        case ('input') :
            inputElement = <input 
                                className={inputArray.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>
            break
        case ('textarea') :
            inputElement = <textarea 
                                className={inputArray.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>
            break
        case ('select') :
            inputElement = (
                <select 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>(
                        <option 
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default :
            inputElement = <input 
                                className={inputArray.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>
    }   

    let inputElementErr = null
    if(props.invalid && props.touched){
        inputElementErr = <p style={{margin:'0',color:'red',fontSize:'14px'}}>Please enter a valid {props.elementConfig.name}</p>
    }
    return (
        <div className='Input'>
            <label>{props.label}</label>
            {inputElement}
            {inputElementErr}
        </div>
    );
}

export default Input;