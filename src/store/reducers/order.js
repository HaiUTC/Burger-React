import * as ActionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    order : [],
    loading : false,
    purchase : false
}

const purchaseInit = (state,action)=>{
    return updateObject(state, {purchase : false})
}

const purchaseBuggerStart = (state,action)=>{
    return updateObject(state, {loading : true})
}

const purchaseBuggerSuccess = (state, action) =>{
    const newOrder = {
        ...action.orderData,
        id : action.orderId
    }
    if(state.order===undefined) state.order = []
    return updateObject(state,{
        loading : false,
        purchase : true,
        order : state.order.concat(newOrder)
    })
}

const purchaseBuggerFail = (state, action) =>{
    return updateObject(state, {loading : false})
}

const fetchOrderStart = (state, action)=>{
    return updateObject(state, {loading : true})
}

const fetchOrderSuccess = (state, action)=>{
    return updateObject(state, {order : action.order})
}

const fetchOrderFail = (state, action)=>{
    return updateObject(state, {loading : false}) 
}

const fetchOrderDefault = (state, action)=>{
    return updateObject(state, {})
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case ActionTypes.PURCHASE_INIT: return purchaseInit(state,action)
            

        case ActionTypes.PURCHASE_BUGGER_START: return purchaseBuggerStart(state,action)
           

        case ActionTypes.PURCHASE_BUGGER_SUCCESS: return purchaseBuggerSuccess(state,action)
            
           
        case ActionTypes.PURCHASE_BUGGER_FAIL: return purchaseBuggerFail(state,action)
           

        case ActionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action)
           
            
        case ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
            

        case ActionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action)
            

        default: return fetchOrderDefault(state, action)
            
    }
}

export default reducer