import * as ActionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () =>{
    return{
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = (token , userId) =>{
    return{
        type: ActionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}


export const authFail = (error) =>{
    return{
        type: ActionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('exporationDate')
    localStorage.removeItem('userId')
    return {
        type : ActionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (exTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },exTime*1000)
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart())
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLyDgEhNIcmqLCoNBpF6n1CdVcT9Czfqw"
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLyDgEhNIcmqLCoNBpF6n1CdVcT9Czfqw"
        }
        axios.post(url, authData)
        .then(response=>{
            const exporationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('exporationDate',exporationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path) =>{
    return {
        type : ActionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            const exporationDate = new Date(localStorage.getItem('exporationDate'))
            if(exporationDate <= new Date()){
                dispatch(logout())
            }
            else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeOut( (exporationDate.getTime()- new Date().getTime()) / 1000))
            }
            
        }
    }
}