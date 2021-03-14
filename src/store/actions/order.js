import * as ActionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBuggerSuccess = (id, orderData) => {
    return {
        type : ActionTypes.PURCHASE_BUGGER_SUCCESS,
        orderData : orderData,
        orderId : id 
    }
}

export const purchaseBuggerFail = (err) => {
    return {
        type : ActionTypes.PURCHASE_BUGGER_FAIL,
        err
    }
}

export const purchaseBuggerStart = () =>{
    return {
        type : ActionTypes.PURCHASE_BUGGER_START
    }
}


export const purchaseInit = () =>{
    return {
        type : ActionTypes.PURCHASE_INIT
    }
}

export const purchaseBugger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBuggerStart())
        axios.post('/order.json?auth=' + token,orderData)
        .then(res=>{
            console.log(res.data)
            dispatch(purchaseBuggerSuccess(res.data,orderData))
        })
        .catch(err=>{
            dispatch(purchaseBuggerFail(err))
        })
    }
}


export const fetchOrderSuccess = (order) =>{
    return {
        type : ActionTypes.FETCH_ORDERS_SUCCESS,
        order : order
    }
}

export const fetchOrderFail = (error) =>{
    return {
        type : ActionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fetchOrderStart = () =>{
    return {
        type : ActionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrder = (token,userId) =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        const queryString = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/order.json'+ queryString)
        .then(res =>{
            const fetchOrders = []
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders))
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err))
        })
    }
}