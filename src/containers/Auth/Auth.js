import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';
import Spinner from '../../componets/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import './Auth.css';

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                name: 'email',
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                name: 'password',
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }
    })
    const [isSignUp, setIsSignUp] = useState(true)

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            props.onSetRedirectPath()
        }
    }, [])



    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const checkValidity = (value, rules) => {
        let isValid = true
        let regex = /\S+@\S+\.\S+/

        if (!rules) return true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.isEmail) {
            isValid = regex.test(value) && isValid
        }
        return isValid
    }

    const inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updateControls)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }


    const formElementArray = []
    for (let key in controls) {
        formElementArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />


    ))
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>)
    }
    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className='Auth'>
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                {errorMessage}
                <Button btnTypes='Success'>SUBMIT</Button>
                <Button
                    clicked={switchAuthModeHandler}
                    btnTypes='Danger'>SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </form>

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.buggerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);