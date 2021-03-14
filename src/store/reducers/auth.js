import * as ActionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectPath : '/'
}

const authStart = (state, action) =>{
    return updateObject(state,{error: null, loading : true})
}

const authSuccess = (state, action) =>{
    return updateObject(state,{
        token : action.idToken,
        userId : action.userId,
        error : null,
        loading : false
    })
}

const authFail = (state, action) =>{
    return updateObject(state, {
        error : action.error,
        loading : false
    })
}

const authLogout = (state, action) =>{
    return updateObject(state, {
        token : null,
        userId : null
    })
}

const authRedirectPath = (state, action) =>{
    return updateObject(state, {authRedirectPath : action.path})
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case ActionTypes.AUTH_START: return authStart(state,action)
        case ActionTypes.AUTH_SUCCESS: return authSuccess(state,action)
        case ActionTypes.AUTH_FAIL: return authFail(state,action)
        case ActionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case ActionTypes.SET_AUTH_REDIRECT_PATH: return authRedirectPath(state,action)
        default : return state
    }
}

export default reducer